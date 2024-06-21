---
date: 2024-06-21
category:
  - Kafka
  - Commit Offsets
tag:
  - Kafka
  - Offsets
  - Commit
head:
  - - meta
    - name: keywords
      content: Kafka, Commit Offsets, Message Consumption, Data Loss, Duplicate Processing
---
# Kafka中的提交偏移量

在Kafka中，消费者从分区中读取消息。在读取消息时，需要考虑一些问题，比如确定从分区中读取哪些消息，或者防止在故障情况下重复读取消息或消息丢失。解决这些问题的方案是使用偏移量。

在本教程中，我们将学习Kafka中的偏移量。我们将看到如何提交偏移量来管理消息消费，并讨论其方法和缺点。

## 2. 什么是偏移量？

我们知道Kafka将消息存储在主题中，每个主题可以有多个分区。每个消费者从一个主题的分区中读取消息。在这里，**Kafka通过偏移量来跟踪消费者读取的消息。** 偏移量是从零开始的整数，随着消息的存储而递增。

假设一个消费者从一个分区中读取了五条消息。然后，根据配置，Kafka将偏移量标记为提交状态，直到_4_（基于零的序列）。下次消费者尝试读取消息时，它将从偏移量_5_开始消费消息。

**没有偏移量，就没有办法避免重复处理或数据丢失。这就是为什么它如此关键。**

我们可以将其与数据库存储进行类比。在数据库中，我们在执行SQL语句后提交以持久化更改。同样，在从分区读取后，我们提交偏移量以标记处理过的消息的位置。

## 3. 提交偏移量的方式

**有四种提交偏移量的方式。** 我们将详细查看每种方式，并讨论它们的用例、优点和缺点。

让我们首先在_pom.xml_中添加Kafka客户端API依赖项：

```xml
`<dependency>`
    `<groupId>`org.apache.kafka`</groupId>`
    `<artifactId>`kafka-clients`</artifactId>`
    `<version>`3.6.1`</version>`
`</dependency>`
```

### 3.1. 自动提交

这是提交偏移量的最简单方式。**Kafka默认使用自动提交——** **每五秒钟提交一次_poll()_方法返回的最大偏移量**。_poll()_返回一组消息，超时时间为_10_秒，正如我们在代码中看到的：

```java
KafkaConsumer``````````<Long, String>`````````` consumer = new KafkaConsumer<>(props);
consumer.subscribe(KafkaConfigProperties.getTopic());
ConsumerRecords``````````<Long, String>`````````` messages = consumer.poll(Duration.ofSeconds(10));
for (ConsumerRecord``````````<Long, String>`````````` message : messages) {
  // 处理消息
}
```

自动提交的问题在于，如果应用程序失败，数据丢失的可能性非常高。当_poll()_返回消息时，**Kafka可能会在处理消息之前提交最大的偏移量**。

假设_poll()_返回了100条消息，消费者在自动提交发生时处理了60条消息。然后，由于某种故障，消费者崩溃了。当新的消费者上线读取消息时，它从偏移量101开始读取，导致61到100之间的消息丢失。

因此，我们需要其他方式来避免这个缺点。答案是手动提交。

### 3.2. 手动同步提交

在手动提交中，无论是同步还是异步，**需要通过设置默认属性（_enabled.auto.commit_属性）为_false_来禁用自动提交**：

```java
Properties props = new Properties();
props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "false");
```

禁用手动提交后，**现在让我们了解_commitSync()_的使用**：

```java
KafkaConsumer``````````<Long, String>`````````` consumer = new KafkaConsumer<>(props);
consumer.subscribe(KafkaConfigProperties.getTopic());
ConsumerRecords``````````<Long, String>`````````` messages = consumer.poll(Duration.ofSeconds(10));
  // 处理消息
consumer.commitSync();
```

**这种方法通过在处理完消息后才提交偏移量来防止数据丢失**。然而，如果消费者在提交偏移量之前崩溃，它并不能防止重复读取。此外，它还会影响应用程序的性能。

_commitSync()_会阻塞代码直到完成。另外，在出现错误的情况下，它会不断重试。这降低了应用程序的吞吐量，这是我们不希望看到的。因此，Kafka提供了另一种解决方案，异步提交，以解决这些缺点。

### 3.3. 手动异步提交

Kafka提供了_commitAsync()_来异步提交偏移量。**它通过在不同的线程中提交偏移量来克服手动同步提交的性能开销**。让我们实现一个异步提交来理解这一点：

```java
KafkaConsumer``````````<Long, String>`````````` consumer = new KafkaConsumer<>(props);
consumer.subscribe(KafkaConfigProperties.getTopic());
ConsumerRecords``````````<Long, String>`````````` messages = consumer.poll(Duration.ofSeconds(10));
  // 处理消息
consumer.commitAsync();
```

异步提交的问题在于，如果失败，它不会重试。它依赖于下一次_commitAsync()_调用，这将提交最新的偏移量。

假设300是我们想要提交的最大偏移量，但我们的_commitAsync()_由于某些问题失败了。在它重试之前，可能另一个_commitAsync()_调用已经提交了400作为最大偏移量，因为它是异步的。当失败的_commitAsync()_重试并且如果它成功提交了300的偏移量，它将覆盖之前400的提交，导致重复读取。这就是为什么_commitAsync()_不重试的原因。

### 3.4. 提交特定偏移量

有时，我们需要对偏移量有更多的控制。假设我们正在以小批量处理消息，并希望在处理完消息后立即提交偏移量。**我们可以使用_commitSync()_和_commitAsync()_的重载方法，该方法接受一个映射参数来提交特定的偏移量**：

```java
KafkaConsumer``````````<Long, String>`````````` consumer = new KafkaConsumer<>(props);
consumer.subscribe(KafkaConfigProperties.getTopic());
Map`<TopicPartition, OffsetAndMetadata>` currentOffsets = new HashMap<>();
int messageProcessed = 0;
  while (true) {
    ConsumerRecords``````````<Long, String>`````````` messages = consumer.poll(Duration.ofSeconds(10));
    for (ConsumerRecord``````````<Long, String>`````````` message : messages) {
        // 处理一条消息
      messageProcessed++;
      currentOffsets.put(
          new TopicPartition(message.topic(), message.partition()),
          new OffsetAndMetadata(message.offset() + 1));
      if (messageProcessed % 50 == 0){
        consumer.commitSync(currentOffsets);
      }
    }
  }
```

在这段代码中，我们管理一个currentOffsets映射，它以_TopicPartition_作为键，_OffsetAndMetadata_作为值。我们在消息处理期间将处理过的消息的_TopicPartition_和_OffsetAndMetadata_插入到_currentOffsets_映射中。当处理的消息数量达到五十时，我们使用_currentOffsets_映射调用_commitSync()_来标记这些消息为已提交。

这种方法的行为与同步和异步提交相同。唯一的区别是我们在这里决定提交的偏移量，而不是Kafka。

## 4. 结论

在本文中，我们学习了偏移量及其在Kafka中的重要性。此外，我们探讨了提交偏移量的四种方式，包括手动和自动。最后，我们分析了它们各自的优缺点。我们可以得出结论，Kafka中没有明确的最佳提交方式；相反，这取决于特定的用例。

本文中使用的所有代码示例都可以在GitHub上找到。