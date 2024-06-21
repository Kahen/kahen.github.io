---
date: 2024-06-22
category:
  - Apache Kafka
  - GroupId vs ConsumerId
tag:
  - GroupId
  - ConsumerId
head:
  - - meta
    - name: keywords
      content: Apache Kafka, GroupId, ConsumerId, 消费者组, 消费者标识
---

# Apache Kafka中GroupId和ConsumerId的区别 | Baeldung

## 1. 引言

在本教程中，我们将阐明Apache Kafka中GroupId和ConsumerId的区别，这对于正确设置消费者至关重要。此外，我们还将讨论ClientId与ConsumerId的区别以及它们之间的关联。

## 2. 消费者组

在探讨Apache Kafka中标识符类型的区别之前，让我们先了解消费者组。

**消费者组由多个协同工作以从一个或多个主题中消费消息的消费者组成**，实现并行消息处理。它们在分布式Kafka环境中实现了可扩展性、容错性和高效的消息并行处理。

关键的是，**组内的每个消费者只负责处理其主题的一个子集**，即分区。

## 3. 理解标识符

接下来，让我们在本教程中定义我们考虑的所有标识符：

- GroupId唯一标识一个消费者组。
- ClientId唯一标识传递到服务器的请求。
- ConsumerId分配给消费者组内的个别消费者，是_client.id_消费者属性和消费者的唯一标识符的组合。

## 4. 标识符的目的

接下来，让我们理解每个标识符的目的。

**GroupId是负载均衡机制的核心，使分区能够在消费者之间分配。** 消费者组管理同一组内消费者之间的协调、负载均衡和分区分配。Kafka确保在任何给定时间只有一个消费者可以访问每个分区。如果组内的消费者失败，Kafka会无缝地将分区重新分配给其他消费者，以维持消息处理的连续性。

**Kafka使用ConsumerIds确保组内每个消费者在与Kafka代理交互时都是唯一可识别的。** 这个由Kafka完全管理的标识符用于管理消费者偏移量和跟踪从分区处理消息的进度。

**最后，ClientId通过允许开发者配置一个将在服务器端请求日志中包含的逻辑应用程序名称，来跟踪请求的来源，超出了仅仅是IP/端口。** 因为我们可以控制这个值，我们可以创建两个具有相同ClientId的不同的客户端。然而，在这种情况下，由Kafka生成的ConsumerId将是不同的。

## 5. 配置GroupId和ConsumerId

### 5.1. 使用Spring Kafka

让我们在Spring Kafka中为我们的消费者定义GroupId和ConsumerId。我们将通过使用@KafkaListener注解来实现这一点：

```java
@KafkaListener(topics = "${kafka.topic.name:test-topic}", clientIdPrefix = "neo", groupId = "${kafka.consumer.groupId:test-consumer-group}", concurrency = "4")
public void receive(@Payload String payload, Consumer`<String, String>` consumer) {
    LOGGER.info("Consumer='{}' received payload='{}'", consumer.groupMetadata()
      .memberId(), payload);
    this.payload = payload;

    latch.countDown();
}
```

注意我们如何将_groupId_属性指定为我们选择的任意值。

此外，我们设置了_clientIdPrefix_属性以包含自定义前缀。让我们检查应用程序日志以验证ConsumerId是否包含此前缀：

```
c.b.s.kafka.groupId.MyKafkaConsumer      : Consumer='neo-1-bae916e4-eacb-485a-9c58-bc22a0eb6187' received payload='Test 123...'
```

_value of _consumerId,_ also known as _memberId,_ follows a specific pattern. It starts with the _clientIdPrefix_, followed by a counter based on the number of consumers in the group, and finally, a _UUID_.
_consumerId_的值，也称为_memberId_，遵循特定模式。它以_clientIdPrefix_开头，然后是根据组内消费者数量的计数器，最后是一个_UUID_。

### 5.2. 使用Kafka CLI

我们还可以通过CLI配置GroupId和ConsumerId。我们将使用_kafka-console-consumer.sh_脚本。让我们启动一个控制台消费者，将_group.id_设置为_test-consumer-group_，并将_client.id_属性设置为_neo-`<sequence_number>`_：

```shell
$ kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic Test --group test-consumer-group --consumer-property "client.id=neo-1"
```

在这种情况下，我们必须确保每个客户端都被分配一个唯一的_client.id_。这与Spring Kafka的行为不同，在那里我们设置_clientIdPrefix_，然后框架在其后添加序列号。如果我们_describe_消费者组，我们将看到Kafka为每个消费者生成的ConsumerId：

```shell
kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group test-consumer-group --describe
```

## 6. 总结

让我们总结一下我们讨论的三个标识符之间的主要区别：

| | | |
|---|---|---|
| **维度** | **GroupId** | **ConsumerId** | **ClientId** |
| **它识别什么？** | 消费者组 | 消费者组内的个别消费者 | 消费者组内的个别消费者 |
| **它的值来自哪里？** | 开发者设置GroupId | Kafka基于_client.id_消费者属性生成ConsumerId | 开发者设置_client.id_消费者属性 |
| **它是唯一的吗？** | 如果两个消费者组有相同的GroupId，它们实际上是一个 | Kafka确保每个消费者有一个唯一值 | 它不必是唯一的。根据用例，两个消费者可以被赋予相同的_client.id_消费者属性值 |

## 7. 结论

在本文中，我们查看了与Kafka消费者相关的一些关键标识符：GroupId、ClientId和ConsumerId。我们现在理解了它们的目的以及如何配置它们。

如常，完整的源代码可在GitHub上找到。翻译已经完成，以下是剩余部分：

```shell
GROUP               TOPIC           PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG             CONSUMER-ID                                HOST            CLIENT-ID
test-consumer-group Test            0          0               0               0               neo-1-975feb3f-9e5a-424b-9da3-c2ec3bc475d6 /127.0.0.1      neo-1
test-consumer-group Test            1          0               0               0               neo-1-975feb3f-9e5a-424b-9da3-c2ec3bc475d6 /127.0.0.1      neo-1
test-consumer-group Test            2          0               0               0               neo-1-975feb3f-9e5a-424b-9da3-c2ec3bc475d6 /127.0.0.1      neo-1
test-consumer-group Test            3          0               0               0               neo-1-975feb3f-9e5a-424b-9da3-c2ec3bc475d6 /127.0.0.1      neo-1
test-consumer-group Test            7          0               0               0               neo-3-09b8d4ee-5f03-4386-94b1-e068320b5e6a /127.0.0.1      neo-3
test-consumer-group Test            8          0               0               0               neo-3-09b8d4ee-5f03-4386-94b1-e068320b5e6a /127.0.0.1      neo-3
test-consumer-group Test            9          0               0               0               neo-3-09b8d4ee-5f03-4386-94b1-e068320b5e6a /127.0.0.1      neo-3
test-consumer-group Test            4          0               0               0               neo-2-6a39714e-4bdd-4ab8-bc8c-5463d78032ec /127.0.0.1      neo-2
test-consumer-group Test            5          0               0               0               neo-2-6a39714e-4bdd-4ab8-bc8c-5463d78032ec /127.0.0.1      neo-2
test-consumer-group Test            6          0               0               0               neo-2-6a39714e-4bdd-4ab8-bc8c-5463d78032ec /127.0.0.1      neo-2
```

OK