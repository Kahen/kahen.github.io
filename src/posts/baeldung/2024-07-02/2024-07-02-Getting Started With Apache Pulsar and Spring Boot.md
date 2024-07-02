---
date: 2024-07-02
category:
  - Spring Boot
  - Apache Pulsar
tag:
  - Spring Boot
  - Apache Pulsar
  - Messaging System
head:
  - - meta
    - name: keywords
      content: Spring Boot, Apache Pulsar, PulsarTemplate, PulsarListener, Publisher-Subscriber
------
# 入门指南：Apache Pulsar 与 Spring Boot 集成

Apache Pulsar 是一个分布式发布-订阅消息系统。虽然 Apache Pulsar 提供的功能与 Apache Kafka 类似，但 Pulsar 旨在克服 Kafka 在高延迟、低吞吐量、扩展和地理复制等方面的限制，并且更多。当处理需要实时处理的大量数据时，Apache Pulsar 是一个很好的选择。

在本教程中，我们将看到如何将 Apache Pulsar 与我们的 Spring Boot 应用程序集成。我们将利用 Pulsar 的 Spring Boot Starter 配置的 _PulsarTemplate_ 和 _PulsarListener_。我们还将看到如何根据我们的要求修改它们的默认配置。

## 2. Maven 依赖
我们首先按照 Apache Pulsar 简介中描述的运行一个独立的 Apache Pulsar 服务器。

接下来，让我们将 _spring-pulsar-spring-boot-starter_ 库添加到我们的项目中：

```
`<dependency>`
    `<groupId>`org.springframework.pulsar`</groupId>`
    `<artifactId>`spring-pulsar-spring-boot-starter`</artifactId>`
    `<version>`0.2.0`</version>`
`</dependency>`
```

## 3. _PulsarClient_
为了与 Pulsar 服务器交互，我们需要配置一个 _PulsarClient_。默认情况下，**Spring 会自动配置一个连接到 localhost:6650 上 Pulsar 服务器的 _PulsarClient_**：

```properties
spring:
  pulsar:
    client:
      service-url: pulsar://localhost:6650
```

我们可以更改此配置以在不同的地址上建立连接。

**要连接到安全服务器，我们可以使用 _pulsar+ssl_ 而不是 _pulsar_。** 我们还可以通过向 _application.yml_ 添加 _spring.pulsar.client._ 属性来配置诸如连接超时、认证和内存限制等属性。

## 4. 为自定义对象指定模式
我们将使用一个简单的 _User_ 类作为我们的应用程序：

```java
public class User {
    private String email;
    private String firstName;

    // 标准构造函数，getter 和 setter
}
```

Spring-Pulsar 自动检测原始数据类型并生成相关的模式。但是，**如果我们需要使用自定义的 JSON 对象，我们将不得不为 _PulsarClient_ 配置其模式信息**：

```properties
spring:
  pulsar:
    defaults:
      type-mappings:
        - message-type: com.baeldung.springpulsar.User
          schema-info:
            schema-type: JSON
```

在这里，_message-type_ 属性接受消息类的完全限定名，_schema-type_ 提供要使用的模式类型的信息。对于复杂对象，_schema-type_ 属性接受 _AVRO_ 或 _JSON_ 值。

尽管使用属性文件指定模式是首选方法，我们也可以通过 bean 提供此模式：

```java
@Bean
public SchemaResolverCustomizer`<DefaultSchemaResolver>` schemaResolverCustomizer() {
    return (schemaResolver) -> {
        schemaResolver.addCustomSchemaMapping(User.class, Schema.JSON(User.class));
    };
}
```

此配置应该同时添加到生产者和监听器应用程序中。

## 5. 发布者
要发布 Pulsar 主题上的消息，我们将使用 _PulsarTemplate_。_PulsarTemplate_ 实现了 _PulsarOperations_ 接口，并提供了同步和异步形式发布记录的方法。**_send_ 方法阻塞调用以提供同步操作能力，而 _sendAsync_ 方法提供非阻塞的异步操作。**

在本教程中，我们将使用同步操作发布记录。

### 5.1. 发布消息
Spring Boot 自动配置了一个现成的 _PulsarTemplate_，用于向指定主题发布记录。

让我们创建一个生产者，将 _String_ 消息发布到队列：

```java
@Component
public class PulsarProducer {
    @Autowired
    private PulsarTemplate`<String>` stringTemplate;

    private static final String STRING_TOPIC = "string-topic";

    public void sendStringMessageToPulsarTopic(String str) throws PulsarClientException {
        stringTemplate.send(STRING_TOPIC, str);
    }
}
```

现在，让我们尝试将一个 _User_ 对象发送到一个新的队列：

```java
@Autowired
private PulsarTemplate`<User>` template;

private static final String USER_TOPIC = "user-topic";

public void sendMessageToPulsarTopic(User user) throws PulsarClientException {
    template.send(USER_TOPIC, user);
}
```

在上面的代码片段中，我们使用 _PulsarTemplate_ 将 _User_ 类的对象发送到名为 _user-topic_ 的 Apache Pulsar 主题。

### 5.2. 生产者端自定义
_PulsarTemplate_ 接受 _TypedMessageBuilderCustomizer_ 来配置传出消息和 _ProducerBuilderCustomizer_ 来自定义生产者的属性。

我们可以使用 _TypedMessageBuilderCustomizer_ 来配置消息延迟、在特定时间发送、禁用复制并提供额外的属性：

```java
public void sendMessageToPulsarTopic(User user) throws PulsarClientException {
    template.newMessage(user)
      .withMessageCustomizer(mc -> {
        mc.deliverAfter(10L, TimeUnit.SECONDS);
      })
      .send();
}
```

_ProducerBuilderCustomizer_ 可以用来添加访问模式、自定义消息路由器和拦截器，并启用或禁用分块和批处理：

```java
public void sendMessageToPulsarTopic(User user) throws PulsarClientException {
    template.newMessage(user)
      .withProducerCustomizer(pc -> {
        pc.accessMode(ProducerAccessMode.Shared);
      })
      .send();
}
```

## 6. 消费者
发布消息到我们的主题后，我们现在将为同一主题建立一个监听器。**要启用对主题的监听，我们需要用 _@PulsarListener_ 注解装饰监听方法。**

Spring Boot 为监听方法配置了所有必要的组件。

**我们还需要使用 _@EnablePulsar_ 来使用 _PulsarListener_。**

### 6.1. 接收消息
我们将首先为前面部分创建的 _string-topic_ 创建一个监听方法：

```java
@Service
public class PulsarConsumer {
    private static final String STRING_TOPIC = "string-topic";

    @PulsarListener(
      subscriptionName = "string-topic-subscription",
      topics = STRING_TOPIC,
      subscriptionType = SubscriptionType.Shared
    )
    public void stringTopicListener(String str) {
        LOGGER.info("Received String message: {}", str);
    }
}
```

在这里，《PulsarListener》注解中，我们已经配置了这个方法将监听的 _topicName_ 在 _topicName_ 属性中，并在 _subscriptionName_ 属性中给出了一个订阅名称。

现在，让我们为 _User_ 类使用的 _user-topic_ 创建一个监听方法：

```java
private static final String USER_TOPIC = "user-topic";

@PulsarListener(
    subscriptionName = "user-topic-subscription",
    topics = USER_TOPIC,
    schemaType = SchemaType.JSON
)
public void userTopicListener(User user) {
    LOGGER.info("Received user object with email: {}", user.getEmail());
}
```

除了前面 _Listener_ 方法中提供的属性外，我们还添加了一个 _schemaType_ 属性，其值与生产者中的相同。

我们还将 _@EnablePulsar_ 注解添加到我们的主类中：

```java
@EnablePulsar
@SpringBootApplication
public class SpringPulsarApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringPulsarApplication.class, args);
    }
}
```

### 6.2. 消费者端自定义
除了订阅名称和模式类型外，《PulsarListener》还可以用来配置诸如自动启动、批处理和确认模式等属性：

```java
@PulsarListener(
  subscriptionName = "user-topic-subscription",
  topics = USER_TOPIC,
  subscriptionType = SubscriptionType.Shared,
  schemaType = SchemaType.JSON,
  ackMode = AckMode.RECORD,
  properties = {"ackTimeout=60s"}
)
public void userTopicListener(User user) {
    LOGGER.info("Received user object with email: {}", user.getEmail());
}
```

在这里，我们将确认模式设置为 _Record_ 并将确认超时设置为 60 秒。

## 7. 使用死信主题
如果消息确认超时或服务器收到 _nack_，Pulsar 会尝试重新交付消息一定次数。这些重试用尽后，**这些未交付的消息可以发送到称为 _死信队列_ (DLQ) 的队列中。**

此选项仅用于 _Shared_ 订阅类型。为了为我们的 _user-topic_ 队列配置 DLQ，我们首先将创建一个 _DeadLetterPolicy_ bean，它将定义重新交付尝试的次数以及用作 DLQ 的队列名称：

```java
private static final String USER_DEAD_LETTER_TOPIC = "user-dead-letter-topic";

@Bean
DeadLetterPolicy deadLetterPolicy() {
    return DeadLetterPolicy.builder()
      .maxRedeliverCount(10)
      .deadLetterTopic(USER_DEAD_LETTER_TOPIC)
      .build();
}
```

现在，我们将此策略添加到我们之前创建的 _PulsarListener_ 中：

```java
@PulsarListener(
  subscriptionName = "user-topic-subscription",
  topics = USER_TOPIC,
  subscriptionType = SubscriptionType.Shared,
  schemaType = SchemaType.JSON,
  deadLetterPolicy = "deadLetterPolicy",
  properties = {"ackTimeout=60s"}
)
public void userTopicListener(User user) {
    LOGGER.info("Received user object with email: {}", user.getEmail());
}
```

在这里，我们已经配置了 _userTopicListener_ 使用我们之前创建的 _deadLetterPolicy_，并且我们已经配置了 60 秒的确认时间。

我们可以创建一个单独的 _Listener_ 来处理 DQL 中的消息：

```java
@PulsarListener(
  subscriptionName = "dead-letter-topic-subscription",
  topics = USER_DEAD_LETTER_TOPIC,
  subscriptionType = SubscriptionType.Shared
)
public void userDlqTopicListener(User user) {
    LOGGER.info("Received user object in user-DLQ with email: {}", user.getEmail());
}
```

## 8. 结论
在本教程中，我们看到了如何使用 Apache Pulsar 与我们的 Spring Boot 应用程序以及一些改变默认配置的方法。

正如往常一样，示例实现可以在 GitHub 上找到。

[Baeldung 官网](https://www.baeldung.com/)

OK