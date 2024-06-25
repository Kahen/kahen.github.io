---
date: 2024-06-25
category:
  - Kafka
  - 分区
tag:
  - 分布式系统
  - 消息队列
head:
  - - meta
    - name: keywords
      content: Kafka, 分区, 消息队列, 分布式系统
---

# Apache Kafka中将数据发送到特定分区的技巧

## 1. 引言

Apache Kafka是一个分布式流处理平台，擅长处理大规模的实时数据流。Kafka将数据组织成主题(topic)，并将主题进一步划分为分区(partition)。**每个分区充当一个独立的通道，实现并行处理和容错。**

本教程深入探讨了在Kafka中将数据发送到特定分区的技术。我们将探索这种方法的好处、实现方式以及潜在的挑战。

## 2. Kafka分区的理解

现在，让我们探索Kafka分区的基本概念。

### 2.1 Kafka分区是什么

当生产者将消息发送到Kafka主题时，Kafka使用指定的分区策略将这些消息组织成分区。分区是表示消息线性有序序列的基本单元。一旦消息被生产，它将根据所选的分区策略被分配到特定的分区。**随后，该消息被追加到该分区的日志末尾。**

### 2.2 并行性和消费者组

一个Kafka主题可以被划分为多个分区，消费者组可以被分配这些分区的一个子集。组内的每个消费者独立地从其分配的分区处理消息。这种并行处理机制提高了整体吞吐量和可扩展性，使Kafka能够有效地处理大量数据。

### 2.3 顺序和处理保证

**在单个分区内，Kafka确保消息按照接收的顺序进行处理。**这保证了像金融交易或事件日志这样依赖消息顺序的应用程序的顺序处理。但请注意，由于网络延迟和其他运营考虑，接收到的消息顺序可能与它们最初发送的顺序不同。

**跨不同分区，Kafka不保证有保证的顺序。**来自不同分区的消息可能会同时被处理，引入了事件顺序变化的可能性。在设计依赖消息严格顺序的应用程序时，这一特性是必须考虑的。

### 2.4 容错和高可用性

分区还有助于Kafka的卓越容错性。每个分区可以在多个代理(broker)上复制。在代理失败的情况下，复制的分区仍然可以被访问，确保数据的连续访问。

Kafka集群可以无缝地将消费者重定向到健康的代理，维持数据的可用性和系统的高可靠性。

## 3. 为什么要将数据发送到特定分区

在这一部分，我们探讨将数据发送到特定分区的原因。

### 3.1 数据亲和性

数据亲和性指的是**有意将相关数据分组在同一个分区内**。通过将相关数据发送到特定的分区，我们确保它一起被处理，从而提高处理效率。

例如，考虑一个场景，我们可能希望确保一个客户的所有订单都位于同一个分区，以便进行订单跟踪和分析。保证来自特定客户的所有订单最终都进入同一个分区，简化了跟踪和分析过程。

### 3.2 负载均衡

此外，将数据均匀地分布在各个分区上，可以帮助确保**资源的最优利用**。将数据均匀地分布在分区上有助于优化Kafka集群内的资源利用。通过根据负载考虑将数据发送到分区，我们可以防止资源瓶颈，并确保每个分区接收到一个可管理且平衡的工作负载。

### 3.3 优先级

在某些情况下，并非所有数据都具有相同的优先级或紧急性。Kafka的分区能力使得通过将关键数据引导到专用分区进行加速处理，从而实现数据的优先级排序。这种优先级排序确保了高优先级消息比不太关键的消息更快地得到处理和关注。

## 4. 发送到特定分区的方法

Kafka提供了多种将消息分配到分区的策略，提供了数据分布和处理的灵活性。以下是一些常用的将消息发送到特定分区的方法。

### 4.1 粘性分区器

**在Kafka版本2.4及以上中，粘性分区器旨在将没有键的消息保持在同一分区中。**然而，这种行为并非绝对，并且与批处理设置如_batch.size_和_linger.ms_相互作用。

为了优化消息传递，Kafka在将消息发送到代理之前将消息分组到批处理中。_batch.size_设置（默认16,384字节）控制最大批处理大小，影响在粘性分区器下消息在同一分区中停留的时间。

_linger.ms_配置（默认：0毫秒）在发送批处理之前引入延迟，可能延长无键消息的粘性行为。

在以下测试案例中，假设默认的批处理配置保持不变。我们将发送三条没有明确分配键的消息。我们应该期望它们最初被分配到同一个分区：

```java
kafkaProducer.send("default-topic", "message1");
kafkaProducer.send("default-topic", "message2");
kafkaProducer.send("default-topic", "message3");

await().atMost(2, SECONDS)
  .until(() -> kafkaMessageConsumer.getReceivedMessages()
    .size() >= 3);

List```<ReceivedMessage>``` records = kafkaMessageConsumer.getReceivedMessages();

Set`<Integer>` uniquePartitions = records.stream()
  .map(ReceivedMessage::getPartition)
  .collect(Collectors.toSet());

Assert.assertEquals(1, uniquePartitions.size());
```

### 4.2 基于键的方法

在基于键的方法中，**Kafka将具有相同键的消息导向同一个分区，优化了相关数据的处理**。这是通过哈希函数实现的，确保了消息键到分区的确定性映射。

在这个测试案例中，具有相同键_partitionA_的消息应该始终落在同一个分区。让我们用以下代码片段来说明基于键的分区：

```java
kafkaProducer.send("order-topic", "partitionA", "critical data");
kafkaProducer.send("order-topic", "partitionA", "more critical data");
kafkaProducer.send("order-topic", "partitionB", "another critical message");
kafkaProducer.send("order-topic", "partitionA", "another more critical data");

await().atMost(2, SECONDS)
  .until(() -> kafkaMessageConsumer.getReceivedMessages()
    .size() >= 4);

List```<ReceivedMessage>``` records = kafkaMessageConsumer.getReceivedMessages();
Map<String, List```<ReceivedMessage>```> messagesByKey = groupMessagesByKey(records);

messagesByKey.forEach((key, messages) -> {
    int expectedPartition = messages.get(0)
      .getPartition();
    for (ReceivedMessage message : messages) {
        assertEquals("Messages with key '" + key + "' should be in the same partition", message.getPartition(), expectedPartition);
    }
});
```

此外，在使用基于键的方法时，共享相同键的消息在特定分区内按照它们生产的顺序一致地接收。**这保证了在分区内，特别是对于相关消息，消息顺序的保持。**

在这个测试案例中，我们以特定的顺序生产具有键_partitionA_的消息，测试积极验证这些消息在分区内以相同的顺序接收：

```java
kafkaProducer.send("order-topic", "partitionA", "message1");
kafkaProducer.send("order-topic", "partitionA", "message3");
kafkaProducer.send("order-topic", "partitionA", "message4");

await().atMost(2, SECONDS)
  .until(() -> kafkaMessageConsumer.getReceivedMessages()
    .size() >= 3);

List```<ReceivedMessage>``` records = kafkaMessageConsumer.getReceivedMessages();

StringBuilder resultMessage = new StringBuilder();
records.forEach(record -> resultMessage.append(record.getMessage()));
String expectedMessage = "message1message3message4";

assertEquals("Messages with the same key should be received in the order they were produced within a partition",
  expectedMessage, resultMessage.toString());
```

### 4.3 自定义分区

对于细粒度控制，Kafka允许定义自定义分区器。这些类实现_Partitioner_接口，使我们能够根据消息内容、元数据或其他因素编写逻辑，以确定每个消息的目标分区。

在这一部分，我们将创建一个基于客户类型在向Kafka主题分发订单时的自定义分区逻辑。具体来说，高级客户订单将被引导到一个分区，而普通客户订单将被引导到另一个分区。

首先，**我们创建一个名为_CustomPartitioner_的类，继承自Kafka的_Partitioner_接口**。在这个类中，我们用自定义逻辑重写_partition()_方法，以确定每条消息的目标分区：

```java
public class CustomPartitioner implements Partitioner {
    private static final int PREMIUM_PARTITION = 0;
    private static final int NORMAL_PARTITION = 1;

    @Override
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
        String customerType = extractCustomerType(key.toString());
        return "premium".equalsIgnoreCase(customerType) ? PREMIUM_PARTITION : NORMAL_PARTITION;
    }

    private String extractCustomerType(String key) {
        String[] parts = key.split("_");
        return parts.length > 1 ? parts[1] : "normal";
    }

    // 更多方法
}
```

接下来，为了在Kafka中应用这个自定义分区