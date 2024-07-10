---
date: 2022-04-21
category:
  - Spring
  - Kafka
tag:
  - Retry
  - Kafka Consumer
head:
  - - meta
    - name: keywords
      content: Spring, Kafka, Retry, Consumer
---
# 在Kafka消费者中实现重试

在本教程中，我们将讨论在Kafka中实现重试的重要性。我们将探索在Spring Boot上实现它的各种选项，并学习最佳实践，以最大化Kafka消费者的可靠性和弹性。

如果我们是第一次在Spring上配置Kafka，并想学习更多，我们可以从Spring和Kafka的介绍文章开始。

## 2. 项目设置

让我们创建一个新的Spring Boot项目，并添加_spring-kafka_依赖：

```xml
`<dependency>`
    `<groupId>`org.springframework.kafka`</groupId>`
    `<artifactId>`spring-kafka`</artifactId>`
    `<version>`3.1.2`</version>`
`</dependency>`
```

现在让我们创建一个对象：

```java
public class Greeting {
    private String msg;
    private String name;

    // 标准构造数，getter和setter
}
```

Kafka消费者是一个从Kafka集群读取数据的客户端应用程序。它订阅一个或多个主题，并消费发布的消息。生产者向主题发送消息，主题是一个存储和发布记录的类别名称。主题被划分为多个分区以允许它们水平扩展。每个分区是消息的不可变序列。

消费者可以通过指定偏移量从特定分区读取消息，偏移量是消息在分区中的位置。ack（确认）是消费者发送给Kafka代理的消息，表示它已成功处理记录。**一旦发送ack，消费者偏移量将被更新。**

这确保了消息被消费，并且不会被再次传递给当前的监听器。

### 3.1. 确认模式

**确认模式决定了代理何时更新消费者的偏移量。**

有三种确认模式：

1. 自动提交：消费者一收到消息就向代理发送确认
2. 处理后提交：消费者只有在成功处理消息后才向代理发送确认
3. 手动提交：消费者在收到特定指令后才向代理发送确认

确认模式决定了消费者如何处理它从Kafka集群读取的消息。

让我们创建一个新的bean，它创建一个新的_ConcurrentKafkaListenerContainerFactory_：

```java
@Bean
public ConcurrentKafkaListenerContainerFactory````<String, Object>```` greetingKafkaListenerContainerFactory() {
    ConcurrentKafkaListenerContainerFactory````<String, Object>```` factory = new ConcurrentKafkaListenerContainerFactory<>();
    // 其他配置
    factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.RECORD);
    factory.afterPropertiesSet();
    return factory;
}
```

我们有几种确认模式可以配置：

1. _AckMode.RECORD_: 在这种处理后模式中，消费者为它处理的每条消息发送确认。
2. _AckMode.BATCH_: 在这种手动模式中，消费者为一批消息发送确认，而不是每条消息。
3. _AckMode.COUNT_: 在这种手动模式中，消费者在处理特定数量的消息后发送确认。
4. _AckMode.MANUAL_: 在这种手动模式中，消费者不为其处理的消息发送确认。
5. _AckMode.TIME_: 在这种手动模式中，消费者在经过一定时间后发送确认。

要在Kafka中实现消息处理的重试逻辑，我们需要选择一个_AckMode_。

**这个_AckMode_应该允许消费者向代理指示哪些特定消息已成功处理。**这样，代理就可以将任何未确认的消息重新传递给另一个消费者。

这可能是阻塞重试的情况下的_RECORD_或_MANUAL_模式。

## 4. 阻塞重试

阻塞重试允许消费者在由于临时错误导致初次尝试失败时再次尝试消费消息。消费者在尝试再次消费消息之前等待一定的时间，称为重试退避期。

此外，消费者可以使用固定延迟或指数退避策略自定义重试退避期。它还可以在放弃并将消息标记为失败之前设置最大重试次数。

### 4.1. 错误处理程序

让我们在Kafka配置类上定义两个属性：

```java
@Value(value = "${kafka.backoff.interval}")
private Long interval;

@Value(value = "${kafka.backoff.max_failure}")
private Long maxAttempts;
```

为了处理在消费过程中抛出的所有异常，我们将定义一个新的错误处理程序：

```java
@Bean
public DefaultErrorHandler errorHandler() {
    BackOff fixedBackOff = new FixedBackOff(interval, maxAttempts);
    DefaultErrorHandler errorHandler = new DefaultErrorHandler((consumerRecord, exception) -> {
        // 当所有重试尝试都耗尽时执行的逻辑
    }, fixedBackOff);
    return errorHandler;
}
```

_FixedBackOff_类接受两个参数：

- _interval_: 重试之间等待的时间（毫秒）
- _maxAttempts_: 在放弃之前重试操作的最大次数

在这种策略中，消费者在重试消息消费之前等待固定时间。

_DefaultErrorHandler_正在使用一个lambda函数进行初始化，该lambda函数表示当所有重试尝试都耗尽时执行的逻辑。

lambda函数接受两个参数：

- _consumerRecord_: 表示引起错误的Kafka记录
- _exception_: 表示抛出的异常

### 4.2. 容器工厂

让我们向错误处理程序添加一个容器工厂bean：

```java
@Bean
public ConcurrentKafkaListenerContainerFactory````<String, Object>```` greetingKafkaListenerContainerFactory() {
    ConcurrentKafkaListenerContainerFactory````<String, Object>```` factory = new ConcurrentKafkaListenerContainerFactory<>();
    // 其他配置
    factory.setCommonErrorHandler(errorHandler());
    factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.RECORD);
    factory.afterPropertiesSet();
    return factory;
}
```

如果存在重试策略，我们将将确认模式设置为_AckMode.RECORD_，以确保如果处理过程中发生错误，消费者将重新传递消息。

我们不应该将确认模式设置为_AckMode.BATCH_或_AckMode.TIME_，因为消费者将一次性确认多条消息。这是因为如果处理消息时发生错误，消费者不会将自己一次性或时间窗口中的所有消息重新传递给自己。

因此，重试策略将无法正确处理错误。

### 4.3. 可重试异常和不可重试异常

我们可以指定哪些异常是可重试的，哪些是不可重试的。

让我们修改_ErrorHandler_：

```java
@Bean
public DefaultErrorHandler errorHandler() {
    BackOff fixedBackOff = new FixedBackOff(interval, maxAttempts);
    DefaultErrorHandler errorHandler = new DefaultErrorHandler((consumerRecord, e) -> {
        // 当所有重试尝试都耗尽时执行的逻辑
    }, fixedBackOff);
    errorHandler.addRetryableExceptions(SocketTimeoutException.class);
    errorHandler.addNotRetryableExceptions(NullPointerException.class);
    return errorHandler;
}
```

在这里，我们指定了哪些异常类型应该触发消费者的重试策略。

_SocketTimeoutException_被认为是可重试的，而_NullPointerException_被认为是不可重试的。

如果我们没有设置任何可重试的异常，将使用默认的可重试异常集：

- _MessagingException_
- _RetryableException_
- _ListenerExecutionFailedException_

### 4.4. 优点和缺点

在阻塞重试中，如果消息处理失败，消费者会阻塞，直到重试机制完成重试，或直到达到最大重试次数。

使用阻塞重试有几个优点和缺点。

**阻塞重试可以通过允许消费者在发生错误时重试消息消费，从而提高消息处理管道的可靠性。这可以帮助确保即使发生瞬时错误，消息也能成功处理。**

阻塞重试可以通过抽象重试机制来简化消息处理逻辑的实现。消费者可以专注于处理消息，并将错误处理留给重试机制。

最后，如果消费者需要等待重试机制完成其重试，阻塞重试可能会在消息处理管道中引入延迟。这可能会影响系统的整体性能。阻塞重试也可能使消费者消耗更多资源，如CPU和内存，因为它等待重试机制完成其重试。这可能会影响系统的整体可扩展性。

## 5. 非阻塞重试

非阻塞重试允许消费者在不阻塞消息侦听器方法的执行的情况下异步重试消息消费。

### 5.1. @RetryableTopic

让我们向_KafkaListener_添加_@RetryableTopic_注解：

```java
@Component
@KafkaListener(id = "multiGroup", topics = "greeting")
public class MultiTypeKafkaListener {

    @KafkaHandler
    @RetryableTopic(
      backoff = @Backoff(value = 3000L),
      attempts = "5",
      autoCreateTopics = "false",
      include = SocketTimeoutException.class,
      exclude = NullPointerException.class)
    public void handleGreeting(Greeting greeting) {
        System.out.println("Greeting received: " + greeting);
    }
}
```

我们通过修改几个属性来自定义重试行为，例如：

- _backoff_: 这个属性指定了在重试失败消息时使用的退避策略。
- _attempts_: 这个属性指定了在放弃之前消息应该重试的最大次数。
- _autoCreateTopics_: 这个属性指定了是否在重试主题和DLT（死信主题）不存在时自动创建它们。
-include: 这个属性指定了应该触发重试的异常类型。
- exclude: 这个属性指定了不应该触发重试的异常类型。

当消息未能成功传递到其预期主题时，它将自动发送到重试主题进行重试。
如果消息在最大尝试次数之后仍然无法传递，它将被发送到DLT进行进一步处理。

### 5.2. 优点和缺点

实现非阻塞重试有几个优点：

- 性能提升：非阻塞重试允许在不阻塞调用线程的情况下重试失败的消息，这可以提高应用程序的整体性能。
- 可靠性增强：非阻塞重试可以帮助应用程序从故障中恢复并继续处理消息，即使某些消息无法成功传递。

然而，在实现非阻塞重试时也需要考虑一些潜在的缺点：

- 复杂性增加：非阻塞重试可能会给应用程序增加额外的复杂性，因为我们需要处理重试逻辑和DLT。
- 消息重复的风险：如果消息在重试后成功传递，并且原始传递和重试都成功了，消息可能会被多次传递。我们需要考虑这种风险，并在消息重复是一个问题时实施措施以防止消息重复。
- 消息顺序：重试的消息被异步发送到重试主题，并且可能比未重试的消息更晚地传递到原始主题。

## 6. 结论

在本文中，我们分析了如何在Kafka主题上实现重试逻辑，包括阻塞和非阻塞方法。

如常，示例的完整源代码可以在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

OK