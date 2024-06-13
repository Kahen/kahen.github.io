---
date: 2024-06-13
category:
  - Kafka
  - Spring
tag:
  - Kafka
  - Consumer
  - Delay
  - Spring Kafka
---
# Apache Kafka消费者延迟处理消息概述

Apache Kafka是一个事件流平台，用于大规模地收集、处理、存储和集成数据。有时，我们可能希望延迟从Kafka处理消息。例如，一个客户订单处理系统设计为在X秒的延迟后处理订单，以适应这个时间框架内的取消。

在本文中，我们将使用Spring Kafka探索Kafka消息的延迟消费者处理。尽管Kafka没有提供开箱即用的延迟消费消息支持，但我们将查看实现的替代选项。

## 2. 应用上下文

**Kafka提供了多种方式来在错误时重试。我们将使用这种重试机制来延迟消费者处理消息。因此，了解Kafka重试的工作方式是值得的。**

让我们考虑一个订单处理应用程序，客户可以在UI上下单。用户可以在10秒内取消错误下的订单。这些订单进入Kafka主题_web.orders_，我们的应用程序在那里处理它们。

一个外部服务公开了最新的订单状态(_CREATED, ORDER_CONFIRMED, ORDER_PROCESSED, DELETED_)。我们的应用程序需要接收消息，等待10秒钟，并与外部服务检查订单是否处于_CONFIRMED_状态，即用户在10秒内没有取消它。

对于测试，从_web.orders.internal_接收的内部订单不应延迟。

让我们添加一个简单的_Order_模型，该模型具有由生产者填充的_orderGeneratedDateTime_和由消费者在延迟持续时间后填充的_orderProcessedTime_：

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private UUID orderId;

    private LocalDateTime orderGeneratedDateTime;

    private LocalDateTime orderProcessedTime;

    private List<String> address;

    private double price;
}
```

## 3. Kafka监听器和外部服务

接下来，**我们将添加一个用于主题消费的监听器和一个公开订单状态的服务。**

让我们添加一个_KafkaListener_，它从_web.orders_和_web.internal.orders_主题读取和处理消息：

```java
@RetryableTopic(attempts = "1", include = KafkaBackoffException.class, dltStrategy = DltStrategy.NO_DLT)
@KafkaListener(topics = { "web.orders", "web.internal.orders" }, groupId = "orders")
public void handleOrders(String order) throws JsonProcessingException {
    Order orderDetails = objectMapper.readValue(order, Order.class);
    OrderService.Status orderStatus = orderService.findStatusById(orderDetails.getOrderId());
    if (orderStatus.equals(OrderService.Status.ORDER_CONFIRMED)) {
        orderService.processOrder(orderDetails);
    }
}
```

重要的是要包括_KafkaBackoffException_，以便监听器允许重试。为了简单起见，让我们假设外部_OrderService_始终将订单状态返回为_CONFIRMED_。另外，_processOrder()_方法将订单处理时间设置为当前时间，并将订单保存到_HashMap_中：

```java
@Service
public class OrderService {
    HashMap<UUID, Order> orders = new HashMap<>();

    public Status findStatusById(UUID orderId) {
        return Status.ORDER_CONFIRMED;
    }

    public void processOrder(Order order) {
        order.setOrderProcessedTime(LocalDateTime.now());
        orders.put(order.getOrderId(), order);
    }
}
```

## 4. 自定义延迟消息监听器

Spring-Kafka提供了_KafkaBackoffAwareMessageListenerAdapter_，它扩展了_AbstractAdaptableMessageListener_并实现了_AcknowledgingConsumerAwareMessageListener_。**这个适配器检查由于Timestamp头的延迟，并要么通过调用_KafkaConsumerBackoffManager_延迟消息，要么重试处理。**

现在让我们实现类似于_KafkaBackoffAwareMessageListenerAdapter_的_DelayedMessageListenerAdapter_。这个适配器应该提供灵活性，以按主题配置延迟，以及默认延迟_0_秒：

```java
public class DelayedMessageListenerAdapter<K, V> extends AbstractDelegatingMessageListenerAdapter<MessageListener<K, V>>
  implements AcknowledgingConsumerAwareMessageListener<K, V> {

    // 字段声明和构造函数

    public void setDelayForTopic(String topic, Duration delay) {
        Objects.requireNonNull(topic, "Topic cannot be null");
        Objects.requireNonNull(delay, "Delay cannot be null");
        this.logger.debug(() -> String.format("Setting delay %s for listener id %s", delay, this.listenerId));
        this.delaysPerTopic.put(topic, delay);
    }

    public void setDefaultDelay(Duration delay) {
        Objects.requireNonNull(delay, "Delay cannot be null");
        this.logger.debug(() -> String.format("Setting delay %s for listener id %s", delay, this.listenerId));
        this.defaultDelay = delay;
    }

    @Override
    public void onMessage(ConsumerRecord<K, V> consumerRecord, Acknowledgment acknowledgment, Consumer<?, ?> consumer) throws KafkaBackoffException {
        this.kafkaConsumerBackoffManager.backOffIfNecessary(createContext(consumerRecord,
          consumerRecord.timestamp() + delaysPerTopic.getOrDefault(consumerRecord.topic(), this.defaultDelay)
          .toMillis(), consumer));
        invokeDelegateOnMessage(consumerRecord, acknowledgment, consumer);
    }

    private KafkaConsumerBackoffManager.Context createContext(ConsumerRecord<K, V> data, long nextExecutionTimestamp, Consumer<?, ?> consumer) {
        return this.kafkaConsumerBackoffManager.createContext(nextExecutionTimestamp,
          this.listenerId,
          new TopicPartition(data.topic(), data.partition()), consumer);
    }
}
```

对于每个传入的消息，这个适配器首先接收记录并检查为该主题设置的延迟。这将在配置中设置，如果没有设置，则使用默认延迟。

现有的_KafkaConsumerBackoffManager#backOffIfNecessary_方法的实现检查上下文记录的时间戳和当前时间戳之间的差异。如果差异是正的，表明没有消费到期，分区暂停并引发_KafkaBackoffException_。否则，它将记录发送到_KafkaListener_方法进行消费。

## 5. 监听器配置

**_ConcurrentKafkaListenerContainerFactory_是Spring Kafka的默认实现，负责构建_KafkaListener_的容器。**它允许我们配置并发_KafkaListener_实例的数量。每个容器可以被视为一个逻辑线程池，其中每个线程负责监听来自一个或多个Kafka主题的消息。

_DelayedMessageListenerAdapter_需要通过声明自定义_ConcurrentKafkaListenerContainerFactory_与监听器一起配置。我们可以为特定主题如_web.orders_设置延迟，并为任何其他主题设置默认延迟_0_：

```java
@Bean
public ConcurrentKafkaListenerContainerFactory<Object, Object> kafkaListenerContainerFactory(ConsumerFactory<Object, Object> consumerFactory,
  ListenerContainerRegistry registry, TaskScheduler scheduler) {
    ConcurrentKafkaListenerContainerFactory<Object, Object> factory = new ConcurrentKafkaListenerContainerFactory<>();
    factory.setConsumerFactory(consumerFactory);
    KafkaConsumerBackoffManager backOffManager = createBackOffManager(registry, scheduler);
    factory.getContainerProperties()
      .setAckMode(ContainerProperties.AckMode.RECORD);
    factory.setContainerCustomizer(container -> {
        DelayedMessageListenerAdapter<Object, Object> delayedAdapter = wrapWithDelayedMessageListenerAdapter(backOffManager, container);
        delayedAdapter.setDelayForTopic("web.orders", Duration.ofSeconds(10));
        delayedAdapter.setDefaultDelay(Duration.ZERO);
        container.setupMessageListener(delayedAdapter);
    });
    return factory;
}

@SuppressWarnings("unchecked")
private DelayedMessageListenerAdapter<Object, Object> wrapWithDelayedMessageListenerAdapter(KafkaConsumerBackoffManager backOffManager,
  ConcurrentMessageListenerContainer<Object, Object> container) {
    return new DelayedMessageListenerAdapter<>((MessageListener<Object, Object>) container.getContainerProperties()
      .getMessageListener(), backOffManager, container.getListenerId());
}

private ContainerPartitionPausingBackOffManager createBackOffManager(ListenerContainerRegistry registry, TaskScheduler scheduler) {
    return new ContainerPartitionPausingBackOffManager(registry,
      new ContainerPausingBackOffHandler(new ListenerContainerPauseService(registry, scheduler)));
}
```

值得注意的是，将确认模式设置在_RECORD_级别是至关重要的，以确保如果处理过程中发生错误，消费者将重新传递消息。

最后，我们需要定义一个_TaskScheduler_ bean，以在延迟持续时间后恢复暂停的分区，并且这个调度器需要注入到_BackOffManager_中，后者将被_DelayedMessageListenerAdapter_使用：

```java
@Bean
public TaskScheduler taskScheduler() {
    return new ThreadPoolTaskScheduler();
}
```

## 6. 测试

让我们确保_web.orders_主题上的订单在处理前经过10秒的延迟：

```java
@Test
void givenKafkaBrokerExists_whenCreateOrderIsReceived_thenMessageShouldBeDelayed() throws Exception {
    // Given
    var orderId = UUID.randomUUID();
    Order order = Order.builder()
      .orderId(orderId)
      .price(1.0)
      .orderGeneratedDateTime(LocalDateTime.now())
      .address(List.of("41 Felix Avenue, Luton"))
      .build();

    String orderString = objectMapper.writeValueAsString(order);
    ProducerRecord<String, String> record = new ProducerRecord<>("web.orders", orderString);

    // When
    testKafkaProducer.send(record)
      .get();
    await().atMost(Duration.ofSeconds(1800))
      .until(() -> {
          // then
          Map<UUID, Order> orders = orderService.getOrder继续翻译：

```java
      .getOrders();
          return orders != null && orders.get(orderId) != null && Duration.between(orders.get(orderId)
              .getOrderGeneratedDateTime(), orders.get(orderId)
              .getOrderProcessedTime())
            .getSeconds() >= 10;
      });
}
```

接下来，我们将测试任何发送到_web.internal.orders_的订单遵循默认的0秒延迟：

```java
@Test
void givenKafkaBrokerExists_whenCreateOrderIsReceivedForOtherTopics_thenMessageShouldNotBeDelayed() throws Exception {
    // Given
    var orderId = UUID.randomUUID();
    Order order = Order.builder()
      .orderId(orderId)
      .price(1.0)
      .orderGeneratedDateTime(LocalDateTime.now())
      .address(List.of("41 Felix Avenue, Luton"))
      .build();

    String orderString = objectMapper.writeValueAsString(order);
    ProducerRecord<String, String> record = new ProducerRecord<>("web.internal.orders", orderString);

    // When
    testKafkaProducer.send(record)
      .get();
    await().atMost(Duration.ofSeconds(1800))
      .until(() -> {
          // Then
          Map<UUID, Order> orders = orderService.getOrders();
          System.out.println("Time...." + Duration.between(orders.get(orderId)
              .getOrderGeneratedDateTime(), orders.get(orderId)
              .getOrderProcessedTime())
            .getSeconds());
          return orders != null && orders.get(orderId) != null && Duration.between(orders.get(orderId)
              .getOrderGeneratedDateTime(), orders.get(orderId)
              .getOrderProcessedTime())
            .getSeconds() <= 1;
      });
}
```

## 7. 结论

在本教程中，我们探讨了Kafka消费者如何通过固定间隔延迟处理消息。

我们可以通过使用消息中嵌入的消息持续时间来动态设置处理延迟来修改实现。

如常，示例的源代码可在GitHub上找到。
OK