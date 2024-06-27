---
date: 2024-06-27
category:
  - Kafka
  - Consumer Groups
tag:
  - Kafka
  - Consumer Group
  - Partition Rebalancing
head:
  - - meta
    - name: keywords
      content: Kafka, Consumer Groups, Partition Rebalancing, Scalability
---

# Kafka消费者组管理

## 1. 引言

消费者组有助于通过允许多个消费者从同一主题读取，来创建更可扩展的Kafka应用程序。

在本教程中，我们将了解消费者组以及它们如何在消费者之间重新平衡分区。

## 2. 什么是消费者组？

消费者组是与一个或多个主题相关联的一组独特的消费者。每个消费者可以读取零个、一个或多个分区。此外，每个分区在给定时间只能分配给一个消费者。当组成员变化时，分区分配会发生变化。这被称为组重新平衡。

消费者组是Kafka应用程序的关键部分。这允许将类似的消费者分组，并使它们能够并行地从分区主题中读取。因此，它提高了Kafka应用程序的性能和可扩展性。

### 2.1. 组协调器和组领导者

当我们实例化一个消费者组时，Kafka也会创建组协调器。组协调器定期从消费者那里接收请求，称为心跳。如果消费者停止发送心跳，协调器就假定消费者已经离开了组或崩溃了。这是触发分区重新平衡的一个可能的原因。

请求加入组的第一个消费者成为组领导者。当出于任何原因发生重新平衡时，组领导者从组协调器那里接收组成员列表。然后，**组领导者使用在_partition.assignment.strategy_配置中设置的可定制策略，在列表中的消费者之间重新分配分区**。

### 2.2. 提交的偏移量

Kafka使用提交的偏移量来跟踪从主题读取的最后位置。**提交的偏移量是消费者确认已成功处理的主题位置**。换句话说，它是它和其他消费者在后续轮次中读取事件的起始点。

Kafka在名为__consumer_offsets_的内部主题中存储所有分区的提交偏移量。我们可以安全地信任其信息，因为主题对于复制的代理是持久和容错的。

### 2.3. 分区重新平衡

分区重新平衡会将分区所有权从一个消费者转移到另一个消费者。当组中的新消费者加入或组中的消费者崩溃或取消订阅时，Kafka会自动执行重新平衡。

为了提高可扩展性，当新消费者加入组时，Kafka公平地与其他消费者共享分区。此外，**当消费者崩溃时，其分区必须分配给组中的其余消费者，以避免丢失任何未处理的消息**。

分区重新平衡使用__consumer_offsets_主题，使消费者从正确的位置开始读取重新分配的分区。

在重新平衡期间，消费者无法消费消息。换句话说，直到重新平衡完成，代理对消费者不可用。此外，消费者会丢失其状态并需要重新计算其缓存的值。分区重新平衡期间的不可用性和缓存重新计算使事件消费变慢。

## 3. 设置应用程序

在这一部分，我们将配置基本设置以启动并运行Spring Kafka应用程序。

### 3.1. 创建基本配置

首先，让我们配置主题及其分区：

```java
@Configuration
public class KafkaTopicConfiguration {

    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;

    public KafkaAdmin kafkaAdmin() {
        Map```<String, Object>``` configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        return new KafkaAdmin(configs);
    }

    public NewTopic celciusTopic() {
        return TopicBuilder.name("topic-1")
            .partitions(2)
            .build();
    }
}
```

上述配置非常简单。我们只是配置了一个名为_topic-1_的新主题，它有两个分区。

现在，让我们配置生产者：

```java
@Configuration
public class KafkaProducerConfiguration {

    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;

    @Bean
    public ProducerFactory``````<String, Double>`````` kafkaProducer() {
        Map```<String, Object>``` configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, DoubleSerializer.class);
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate``````<String, Double>`````` kafkaProducerTemplate() {
        return new KafkaTemplate<>(kafkaProducer());
    }
}
```

在上面的Kafka生产者配置中，我们设置了代理地址以及它们用于写消息的序列化器。

最后，让我们配置消费者：

```java
@Configuration
public class KafkaConsumerConfiguration {

    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;

    @Bean
    public ConsumerFactory``````<String, Double>`````` kafkaConsumer() {
        Map```<String, Object>``` props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, DoubleDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(props);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory``````<String, Double>`````` kafkaConsumerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory``````<String, Double>`````` factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(kafkaConsumer());
        return factory;
    }
}
```

### 3.2. 设置消费者

在我们的演示应用程序中，我们将从属于_group-1_组的两个消费者开始，它们监听来自_topic-1_的消息：

```java
@Service
public class MessageConsumerService {
    @KafkaListener(topics = "topic-1", groupId = "group-1")
    public void consumer0(ConsumerRecord```<?, ?>``` consumerRecord) {
        trackConsumedPartitions("consumer-0", consumerRecord);
    }

    @KafkaListener(topics = "topic-1", groupId = "group-1")
    public void consumer1(ConsumerRecord```<?, ?>``` consumerRecord) {
        trackConsumedPartitions("consumer-1", consumerRecord);
    }
}
```

_MessageConsumerService_类使用_@KafkaListener_注解注册了两个消费者，监听_group-1_中的_topic-1_。

现在，让我们在_MessageConsumerService_类中定义一个字段和方法，以跟踪消费的分区：

```java
Map`<String, Set<Integer>`> consumedPartitions = new ConcurrentHashMap<>();
private void trackConsumedPartitions(String key, ConsumerRecord```<?, ?>``` record) {
    consumedPartitions.computeIfAbsent(key, k -> new HashSet<>());
    consumedPartitions.computeIfPresent(key, (k, v) -> {
        v.add(record.partition());
        return v;
    });
}
```

在上面的代码中，我们使用_ConcurrentHashMap_将每个消费者名称映射到一个由该消费者消费的所有分区的_HashSet_。

## 4. 当消费者离开时可视化分区重新平衡

现在我们已经设置了所有配置并注册了消费者，我们可以可视化Kafka在_group-1_中的一个消费者离开时所做的事情。为了做到这一点，让我们定义一个使用嵌入式代理的Kafka集成测试的框架：

```java
@SpringBootTest(classes = ManagingConsumerGroupsApplicationKafkaApp.class)
@EmbeddedKafka(partitions = 2, brokerProperties = {"listeners=PLAINTEXT://localhost:9092", "port=9092"})
public class ManagingConsumerGroupsIntegrationTest {

    private static final String CONSUMER_1_IDENTIFIER = "org.springframework.kafka.KafkaListenerEndpointContainer#1";
    private static final int TOTAL_PRODUCED_MESSAGES = 50000;
    private static final int MESSAGE_WHERE_CONSUMER_1_LEAVES_GROUP = 10000;

    @Autowired
    KafkaTemplate``````<String, Double>`````` kafkaTemplate;

    @Autowired
    KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry;

    @Autowired
    MessageConsumerService consumerService;
}
```

在上面的代码中，我们注入了生产和消费消息所需的bean：_kafkaTemplate_和_consumerService_。我们还注入了bean _kafkaListenerEndpointRegistry_来操作注册的消费者。

最后，我们定义了将在测试用例中使用的三个常量。

现在，让我们定义测试用例方法：

```java
@Test
public void givenContinuousMessageFlow_whenAConsumerLeavesTheGroup_thenKafkaTriggersPartitionRebalance() throws InterruptedException {
    int currentMessage = 0;

    do {
        kafkaTemplate.send("topic-1", RandomUtils.nextDouble(10.0, 20.0));
        Thread.sleep(0,100);
        currentMessage++;

        if (currentMessage == MESSAGE_WHERE_CONSUMER_1_LEAVES_GROUP) {
            String containerId = kafkaListenerEndpointRegistry.getListenerContainerIds()
                .stream()
                .filter(a -> a.equals(CONSUMER_1_IDENTIFIER))
                .findFirst()
                .orElse("");
            MessageListenerContainer container = kafkaListenerEndpointRegistry.getListenerContainer(containerId);
            Objects.requireNonNull(container).stop();
            kafkaListenerEndpointRegistry.unregisterListenerContainer(containerId);
            if(currentMessage % 1000 == 0){
                log.info("Processed {} of {}", currentMessage, TOTAL_PRODUCED_MESSAGES);
            }
        }
    } while (currentMessage