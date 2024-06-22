---
date: 2024-06-22
category:
  - Java
  - Kafka
tag:
  - Apache Kafka
  - Kafka Headers
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Kafka, Kafka Headers, Metadata, Message Processing
---

# Kafka消息头在Java中的查看

Apache Kafka是一个分布式流处理平台，允许我们发布和订阅记录流，通常被称为消息。此外，Kafka消息头提供了一种将元数据附加到Kafka消息的方式，使得在消息处理中增加了额外的上下文和灵活性。

在本教程中，我们将深入探讨常用的Kafka消息头，并学习如何使用Java查看和提取它们。

Kafka消息头表示附加到Kafka消息的键值对，提供了一种在主要消息内容旁边包含补充元数据的方式。

例如，Kafka消息头通过提供数据来促进消息路由，将消息定向到特定的处理管道或消费者。此外，消息头在携带定制的应用程序元数据方面非常灵活，这些元数据适合应用程序的处理逻辑。

Kafka自动在Kafka生产者发送的消息中包含几个默认消息头。此外，这些消息头提供了关于消息的关键元数据和上下文。在本节中，我们将深入探讨一些常用的头部及其在Kafka消息处理领域的重要性。

当在Kafka中生成消息时，生产者会自动包含几个默认消息头，例如：

- KafkaHeaders.TOPIC - 这个头部包含消息所属主题的名称。
- KafkaHeaders.KEY - 如果消息带有键，Kafka会自动包含一个名为“_key_”的头部，包含序列化的键字节。
- KafkaHeaders.PARTITION - Kafka添加了一个名为“_partition_”的头部，以指示消息所属的分区ID。
- KafkaHeaders.TIMESTAMP - Kafka为每条消息附加了一个名为“_timestamp_”的头部，指示生产者生成消息的时间戳。

以_RECEIVED__为前缀的头部由Kafka消费者在消息消费时添加，以提供关于消息接收过程的元数据：

- KafkaHeaders.RECEIVED_TOPIC - 这个头部包含消息接收来源主题的名称。
- KafkaHeaders.RECEIVED_KEY - 这个头部允许消费者访问与消息关联的键。
- KafkaHeaders.RECEIVED_PARTITION - Kafka添加这个头部以指示消息分配到的分区ID。
- KafkaHeaders.RECEIVED_TIMESTAMP - 这个头部反映了消费者接收消息的时间。
- KafkaHeaders.OFFSET - 偏移量指示消息在分区日志中的位置。

首先，我们实例化一个_KafkaConsumer_对象。_KafkaConsumer_负责订阅Kafka主题并从中获取消息。实例化_KafkaConsumer_后，我们订阅我们想要消费消息的Kafka主题。通过订阅主题，消费者可以接收在该主题上发布的消息。

一旦消费者订阅了主题，我们继续从Kafka获取记录。在这个过程中，_KafkaConsumer_从订阅的主题检索消息及其相关头部。

以下是一个演示如何使用头部消费消息的代码示例：

```java
@KafkaListener(topics = "my-topic")
public void listen(String message, @Headers Map`<String, Object>` headers) {
    System.out.println("Received message: " + message);
    System.out.println("Headers:");
    headers.forEach((key, value) -> System.out.println(key + " : " + value));
}
```

Kafka监听器容器在从指定主题（例如“_my-topic_”）接收消息时调用_listen()_方法。**@Headers注解表示该参数应该用接收到的消息的头部填充。**

以下是示例输：

```plaintext
Received message: Hello Baeldung!
Headers:
kafka_receivedMessageKey: null
kafka_receivedPartitionId: 0
kafka_receivedTopic: my-topic
kafka_offset: 123
... // 其他头部
```

要访问特定的头部，我们可以使用头部映射的_get()_方法，提供所需头部的键。以下是一个访问主题名称的示例：

```java
String topicName = headers.get(KafkaHeaders.TOPIC);
```

topicName应该返回_my-topic_。

此外，**在消费消息时，如果我们已经知道需要处理的头部，我们可以直接将它们作为方法参数提取。**这种方法提供了一种更简洁和有针对性的方式来访问特定的头部值，而无需遍历所有头部。

以下是一个演示如何使用头部消费消息，直接将特定头部作为方法参数提取的代码示例：

```java
@KafkaListener(topics = "my-topic")
public void listen(String message, @Header(KafkaHeaders.RECEIVED_PARTITION_ID) int partition) {
    System.out.println("Received message: " + message);
    System.out.println("Partition: " + partition);
}
```

在_listen()_方法中，我们使用@Header注解直接提取_RECEIVED_PARTITION_头部。这个注解允许我们指定我们想要提取的头部及其对应的类型。**将头部的值直接注入到方法参数中（在这种情况下，分区）可以在方法体内部直接访问。**

以下是输出：

```plaintext
Received message: Hello Baeldung!
Partition: 0
```

## 5. 结论

在本文中，我们探讨了Apache Kafka中Kafka头部在消息处理中的重要性。我们探讨了生产者和消费者自动包含的默认头部。此外，我们还学习了如何提取和使用这些头部。

如常，示例代码可在GitHub上找到。

OK