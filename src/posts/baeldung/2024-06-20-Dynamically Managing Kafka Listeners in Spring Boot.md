---
date: 2024-06-21
category:
  - Spring Boot
  - Apache Kafka
tag:
  - Spring Kafka
  - Kafka Listeners
head:
  - - meta
    - name: keywords
      content: Spring Boot, Apache Kafka, Kafka Listeners, Dynamic Listener Management
  - - meta
    - name: description
      content: Learn how to dynamically manage Kafka listeners in Spring Boot applications to adapt to changing workloads and for feature toggling.
------
# 在Spring Boot中动态管理Kafka侦听器

无论你是刚开始还是拥有多年经验，**Spring Boot**显然是构建Web应用程序的不错选择。

Jmix建立在这个非常强大和成熟的Boot堆栈之上，允许开发人员构建并交付**全栈Web****应用程序**，而无需编写前端代码。也非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。

具体来说，**Jmix平台**包括一个构建在**Spring Boot, JPA和Vaadin**之上的框架，并附带Jmix Studio，这是一个**IntelliJ IDEA插件**，配备了一套开发人员生产力工具。

该平台提供了相互连接的**现成****插件**，用于报告生成、BPM、地图、从数据库即时生成Web应用程序：

**>> 成为高效的全栈开发人员使用Jmix**

既然新版的_REST With Spring -_ **“REST With Spring Boot”** 终于发布了，当前价格将在6月22日之前有效，之后将永久增加50美元。

**>> 立即获取访问权限**

## 1. 概述

在当今的事件驱动架构中，有效管理数据流至关重要。Apache Kafka是这方面的一个受欢迎的选择，但将其集成到我们的应用程序中也有其挑战，尽管有Spring Kafka等辅助框架。一个主要的挑战是实现适当的动态侦听器管理，这为我们的应用程序提供了适应变化的工作负载和维护的关键灵活性和控制。

在本教程中，我们将学习**如何在Spring Boot应用程序中动态启动和停止Kafka侦听器**。

## 2. 先决条件

首先，让我们将_spring-kafka_依赖项导入我们的项目：

```xml
`<dependency>`
    `<groupId>`org.springframework.kafka`</groupId>`
    `<artifactId>`spring-kafka`</artifactId>`
    `<version>`3.1.2`</version>`
`</dependency>`
```

## 3. 配置Kafka消费者

生产者是将（写入）事件发布到Kafka主题的应用程序。

在整个教程中，我们将使用单元测试来模拟生产者向Kafka主题发送事件。消费者是订阅主题并处理事件流的侦听器，在我们的应用程序中由侦听器表示。此侦听器配置为处理来自Kafka的传入消息。

让我们通过_KafkaConsumerConfig_类配置我们的Kafka消费者，其中包含Kafka代理的地址、消费者组ID以及键和值的反序列化器：

```java
@Bean
public DefaultKafkaConsumerFactory`<String, UserEvent>` consumerFactory() {
    Map`<String, Object>` props = new HashMap<>();
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
    props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
    props.put(JsonDeserializer.TRUSTED_PACKAGES, "com.baeldung.spring.kafka.start.stop.consumer");
    return new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), new JsonDeserializer<>(UserEvent.class));
}
```

## 4. 配置Kafka侦听器

**在Spring Kafka中，**使用**@KafkaListener**注解的方法创建一个侦听器，该侦听器从指定主题消费消息。为了定义它，让我们声明一个_UserEventListener_类：

```java
@KafkaListener(id = Constants.LISTENER_ID, topics = Constants.MULTI_PARTITION_TOPIC, groupId = "test-group",
  containerFactory = "kafkaListenerContainerFactory", autoStartup = "false")
public void processUserEvent(UserEvent userEvent) {
    logger.info("Received UserEvent: " + userEvent.getUserEventId());
    userEventStore.addUserEvent(userEvent);
}
```

上述侦听器等待来自_multi_partition_topic_主题的消息，并使用_processUserEvent()_方法处理它们。我们将_groupId_指定为_test-group_，确保消费者成为更广泛组的一部分，从而促进跨多个实例的分布式处理。

我们使用_id_属性为每个侦听器分配一个唯一标识符。在这个例子中，分配的侦听器ID是_listener-id-1_。

**autoStartup属性让我们控制侦听器是否在应用程序初始化时启动**。在我们的示例中，我们将它设置为_false_，这意味着当应用程序启动时，侦听器不会自动启动。此配置为我们提供了手动启动侦听器的灵活性。

这种手动启动可以由各种事件触发，例如新用户注册、应用程序内的特定条件，例如达到某个数据量阈值，或管理操作，例如通过管理界面手动启动侦听器。例如，如果一个在线零售应用程序在限时销售期间检测到流量激增，它可以自动启动额外的侦听器来处理增加的负载，优化性能。

_UserEventStore_作为侦听器接收事件的临时存储：

```java
@Component
public class UserEventStore {

    private final List``<UserEvent>`` userEvents = new ArrayList<>();
    
    public void addUserEvent(UserEvent userEvent) {
        userEvents.add(userEvent);
    }
    
    public List``<UserEvent>`` getUserEvents() {
        return userEvents;
    }
    
    public void clearUserEvents() {
        this.userEvents.clear();
    }
}
```

## **5. 动态控制侦听器**

让我们创建一个_KafkaListenerControlService_，使用_KafkaListenerEndpointRegistry_动态启动和停止Kafka侦听器：

```java
@Service
public class KafkaListenerControlService {

    @Autowired
    private KafkaListenerEndpointRegistry registry;

    public void startListener(String listenerId) {
        MessageListenerContainer listenerContainer = registry.getListenerContainer(listenerId);
        if (listenerContainer != null && !listenerContainer.isRunning()) {
            listenerContainer.start();
        }
    }

    public void stopListener(String listenerId) {
        MessageListenerContainer listenerContainer = registry.getListenerContainer(listenerId);
        if (listenerContainer != null && listenerContainer.isRunning()) {
            listenerContainer.stop();
        }
    }
}
```

**_KafkaListenerControlService_可以精确地根据分配的ID管理单个侦听器实例**。_startListener()_和_stopListener()_方法都使用_listenerId_作为参数，允许我们根据需要启动和停止来自主题的消息消费。

**_KafkaListenerEndpointRegistry_作为Spring应用程序上下文中定义的所有Kafka侦听器端点的中央存储库**。它监视这些侦听器容器，从而允许对它们的状态进行程序控制，无论是启动、停止还是暂停。这种能力对于需要实时调整其消息处理活动而无需重新启动整个应用程序的应用程序至关重要。

## 6. 验证动态侦听器控制

接下来，让我们专注于测试Spring Boot应用程序中Kafka侦听器的动态启动和停止能力。首先，让我们启动侦听器：

```java
kafkaListenerControlService.startListener(Constants.LISTENER_ID);
```

然后我们通过发送然后处理一个测试事件来验证侦听器是否被激活：

```java
UserEvent startUserEventTest = new UserEvent(UUID.randomUUID().toString());
producer.send(new ProducerRecord<>(Constants.MULTI_PARTITION_TOPIC, startUserEventTest));
await().untilAsserted(() -> assertEquals(1, this.userEventStore.getUserEvents().size()));
this.userEventStore.clearUserEvents();
```

现在侦听器已经激活，我们将发送一批十条消息进行处理。在发送四条消息后，我们将停止侦听器，然后发送剩余的消息到Kafka主题：

```java
for (long count = 1; count `<= 10; count++) {
    UserEvent userEvent = new UserEvent(UUID.randomUUID().toString());
    Future<RecordMetadata>` future = producer.send(new ProducerRecord<>(Constants.MULTI_PARTITION_TOPIC, userEvent));
    RecordMetadata metadata = future.get();
    if (count == 4) {
        await().untilAsserted(() -> assertEquals(4, this.userEventStore.getUserEvents().size()));
        this.kafkaListenerControlService.stopListener(Constants.LISTENER_ID);
        this.userEventStore.clearUserEvents();
    }
    logger.info("User Event ID: " + userEvent.getUserEventId() + ", Partition : " + metadata.partition());
}
```

在启动侦听器之前，我们将验证事件存储中没有消息：

```java
assertEquals(0, this.userEventStore.getUserEvents().size());
kafkaListenerControlService.startListener(Constants.LISTENER_ID);
await().untilAsserted(() -> assertEquals(6, this.userEventStore.getUserEvents().size()));
kafkaListenerControlService.stopListener(Constants.LISTENER_ID);
```

一旦侦听器再次启动，它将处理我们在侦听器停止后发送到Kafka主题的剩余六条消息。这个测试展示了Spring Boot应用程序动态管理Kafka侦听器的能力。

## 7. 使用案例

动态侦听器管理在需要高度适应性的场景中表现出色。例如，在高峰负载时段，我们可以动态启动额外的侦听器来提高吞吐量并减少处理时间。相反，在维护或低流量期间，我们可以停止侦听器以节省资源。这种灵活性也有助于在特性标志后面部署新功能，允许无缝的即时调整，而不影响整个系统。

让我们考虑一个场景，其中电子商务平台引入了一个新的推荐引擎，旨在通过根据浏览历史和购买模式推荐产品来增强用户体验。在全面推出之前，我们决定在其后部署特性标志以验证此功能的有效性。

激活此特性标志将启动Kafka侦听器。当最终用户与平台交互时，由Kafka侦听器驱动的推荐引擎处理传入的用户活动数据流，以生成个性化的产品推荐。

当我们停用特性标志时，我们将停止Kafka侦听器，平台将默认回退到其现有的推荐引擎。这确保了无论新引擎的测试阶段如何，都能提供无缝的用户体验。

在功能处于活动状态时，我们积极收集数据，监控性能指标，并对推荐引擎进行调整。我们重复进行多次功能测试，直到达到期望的结果。

通过这个迭代过程，动态侦听器管理被证明是一个有价值的工具。它允许无缝引入新功能。

## 8. 结论

在本文中，我们讨论了Spring Boot与Kafka的集成，重点关注动态管理Kafka侦听器。**这种能力对于管理波动的工作负载和执行常规维护至关重要**。此外，它还支持特性切换，根据流量模式扩展服务，并管理具有特定触发器的事件驱动工作流。

如往常一样，示例的源代码可在GitHub上找到。
--- 

OK