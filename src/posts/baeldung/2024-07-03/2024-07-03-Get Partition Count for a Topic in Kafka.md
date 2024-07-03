---
date: 2022-04-01
category:
  - Java
  - Kafka
tag:
  - Kafka
  - Partitions
head:
  - - meta
    - name: keywords
      content: Java, Kafka, Partitions
---
# 获取Kafka主题的分区数量

## 1. 引言

在本教程中，我们将探讨检索Kafka主题总分区数的不同方法。在简要介绍Kafka分区是什么以及我们为什么可能需要检索这些信息之后，我们将编写Java代码来执行此操作。然后，我们将看到如何使用命令行界面（CLI）获取这些信息。

Kafka主题可以被划分为多个分区。拥有多个分区的目标是能够同时从同一主题消费消息。因为拥有比现有分区更多的消费者是没有用的，**主题中的Kafka分区数量代表了消费的最大并行级别**。因此，事先知道给定主题有多少分区对于正确地调整相应消费者的规模是有用的。

## 3. 使用Java检索分区数量

要使用Java检索特定主题的分区数量，我们可以依赖于_KafkaProducer.partitionFor(topic)_方法。此方法将返回给定主题的分区元数据：

```
Properties producerProperties = new Properties();
// producerProperties.put("key","value") ...
KafkaProducer`<String, String>` producer = new KafkaProducer<>(producerProperties);
List`<PartitionInfo>` info = producer.partitionsFor(TOPIC);
Assertions.assertEquals(3, info.size());
```

此方法返回的_PartitionInfo_列表的大小将完全等于为特定主题配置的分区数量。

如果我们无法访问_Producer_，我们可以使用Kafka_AdminClient_以稍微复杂的方式实现相同的结果：

```
Properties props = new Properties();
// props.put("key","value") ...
AdminClient client = AdminClient.create(props);
DescribeTopicsResult describeTopicsResult = client.describeTopics(Collections.singletonList(TOPIC));
Map`<String, KafkaFuture>` values = describeTopicsResult.values();
KafkaFuture topicDescription = values.get(TOPIC);
Assertions.assertEquals(3, topicDescription.get().partitions().size());
```

在这种情况下，我们依赖于_KafkaClient.describeTopic(topic)_方法，该方法返回一个_DescribeTopicsResult_对象，其中包含一个待执行的未来任务的_Map_。这里我们只检索我们需要的_Topic_的_TopicDescription_，最后检索分区数量。

## 4. 使用CLI检索分区数量

我们有几种选项可以使用CLI检索给定主题的分区数量。

首先，我们可以依赖于每个Kafka安装附带的shell脚本并运行：

```
$ kafka-topics --describe --bootstrap-server localhost:9092 --topic topic_name
```

此命令将输出指定主题的完整描述：

```
Topic:topic_name        PartitionCount:3        ReplicationFactor:1     Configs: ...
```

另一个选项是使用Kafkacat，这是一个非JVM的Kafka消费者和生产者。使用元数据列表模式（-L），这个shell实用程序显示了Kafka集群的当前状态，包括其所有主题和分区。要显示特定主题的元数据信息，我们可以运行以下命令：

```
$ kafkacat -L -b localhost:9092 -t topic_name
```

此命令的输出将是：

```
Metadata for topic topic_name (from broker 1: mybroker:9092/1):
  topic "topic_name" with 3 partitions:
    partition 0, leader 3, replicas: 1,2,3, isrs: 1,2,3
    partition 1, leader 1, replicas: 1,2,3, isrs: 1,2,3
    partition 2, leader 1, replicas: 1,2, isrs: 1,2
```

我们可以看到，这个shell实用程序命令还显示了有关特定主题及其分区的有用详细信息。

## 5. 结论

在这个简短的教程中，我们已经看到了如何使用Java和CLI检索特定Kafka主题的总分区数。

我们首先看到了检索这些信息的用途，然后使用了_KafkaProducer_和_KafkaAdmin_。最后，我们使用了Kafka脚本实用程序和KafkaCat的shell命令。

一如既往，文章的完整源代码可以在GitHub上找到。