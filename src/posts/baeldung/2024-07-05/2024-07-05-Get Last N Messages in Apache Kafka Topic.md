---
date: 2022-04-01
category:
  - Java
  - Apache Kafka
tag:
  - Kafka
  - Java
  - Tutorial
head:
  - - meta
    - name: keywords
      content: Apache Kafka, Java, Tutorial, Last N Messages
------
# 如何在Apache Kafka主题中获取最后N条消息

1. 引言

在本简短教程中，我们将看到如何从Apache Kafka主题中检索最后N条消息。

在文章的第一部分，我们将关注执行此操作所需的先决条件。在第二部分，我们将使用Kafka Java API库构建一个小型实用程序来使用Java读取消息。最后，我们将提供简短的指导，以使用KafkaCat从命令行实现相同的结果。

2. 先决条件

**从Kafka主题检索最后N条消息就像从明确定义的偏移量开始消费消息一样简单。** Kafka主题中的偏移量表示消费者的当前位置。在之前的文章中，我们已经看到如何利用_consumer.seekToEnd()_方法从一个Apache Kafka主题中获取特定数量的消息。

考虑到相同的功能，我们可以通过执行简单的减法来计算正确的偏移量：offset = lastOffset – N。然后我们可以从这个位置开始轮询N条消息。

然而，如果我们使用_事务生产者_生产记录，这种方法将不起作用。在这种情况下，偏移量将跳过一些数字以适应Kafka主题事务记录（提交/回滚等）。事务生产者的一个常见用例是我们需要精确一次处理Kafka消息。简单来说，如果我们从（lastOffset – N）开始读取消息，我们可能会消费少于N条消息，因为一些偏移数字被事务记录消耗了。

3. 使用Java在Kafka主题中获取最后N条消息

首先，我们需要创建一个_生产者_和一个_消费者_：

```java
Properties producerProperties = new Properties();
producerProperties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA_CONTAINER.getBootstrapServers());
producerProperties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
producerProperties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

Properties consumerProperties = new Properties();
consumerProperties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA_CONTAINER.getBootstrapServers());
consumerProperties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
consumerProperties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
consumerProperties.put(ConsumerConfig.GROUP_ID_CONFIG, "ConsumerGroup1");

KafkaProducer````<String, String>```` producer = new KafkaProducer<> (producerProperties);
KafkaConsumer````<String, String>```` consumer = new KafkaConsumer<> (consumerProperties);
```

现在让我产生一些消息：

```java
final String TOPIC1 = "baeldung-topic";
int messagesInTopic = 100;
for (int i = 0; i `< messagesInTopic; i++) {
    producer.send(new ProducerRecord(TOPIC1, null, MESSAGE_KEY, String.valueOf(i))).get();
}
```

为了清晰和简单，让我们假设我们的消费者只需要注册一个分区：

```java
TopicPartition partition = new TopicPartition(TOPIC1, 0);
List<TopicPartition>` partitions = new ArrayList<>();
partitions.add(partition);
consumer.assign(partitions);
```

正如我们之前提到的，我们需要将偏移量定位在正确的位置，然后我们可以开始轮询：

```java
int messagesToRetrieve = 10;
consumer.seekToEnd(partitions);
long startIndex = consumer.position(partition) - messagesToRetrieve;
consumer.seek(partition, startIndex);
ConsumerRecords````<String, String>```` records = consumer.poll(Duration.ofMinutes(1));
```

**如果网络特别慢，或者要检索的消息数量特别大，我们可能需要增加轮询持续时间。** 在这种情况下，我们需要考虑在内存中拥有大量记录可能会导致资源短缺问题。

现在让我们最后检查一下我们是否确实检索到了正确数量的消息：

```java
for (ConsumerRecord````<String, String>```` record : records) {
    assertEquals(MESSAGE_KEY, record.key());
    assertTrue(Integer.parseInt(record.value()) >= (messagesInTopic - messagesToRetrieve));
    recordsReceived++;
}
assertEquals(messagesToRetrieve, recordsReceived);
```

4. 使用KafkaCat在Kafka主题中获取最后N条消息

KafkaCat（kcat）是一个命令行工具，我们可以用它来测试和调试Kafka主题。Kafka本身提供了很多脚本和shell工具来执行相同的操作。尽管如此，_KafkaCat_的简单性和易用性使其成为执行如在Apache Kafka主题中检索最后N条消息等操作的事实标准。安装后，可以通过运行这个简单命令来检索Kafka主题中最新产生的N条消息：

```bash
$ kafkacat -C -b localhost:9092 -t topic-name -o -`<N>` -e
```

- _-C_ 表示我们需要消费消息
- _-b_ 表示Kafka代理的位置
- _-t_ 表示主题名称
- _-o_ 表示我们需要从这个偏移量开始读取。负号意味着我们需要从末尾读取N条消息。
- _-e_ 选项在读取最后一条消息后退出

与我们之前讨论的案例相联系，检索名为_“baeldung-topic”_的主题的_最后10条消息_的命令是：

```bash
$ kafkacat -C -b localhost:9092 -t baeldung-topic -o -10 -e
```

5. 结论

在本简短教程中，我们看到了如何消费Kafka主题中的最新N条消息。在第一部分，我们使用了Java Kafka API库。在第二部分，我们使用了一个名为KafkaCat的命令行实用程序。

如常，代码可在GitHub上找到。