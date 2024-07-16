---
date: 2024-07-16
category:
  - Apache Kafka
  - 消息计数
tag:
  - Kafka
  - 消息数量
  - 编程技巧
head:
  - - meta
    - name: keywords
      content: Apache Kafka, 消息计数, Kafka主题, 编程技巧
------
# 在Apache Kafka主题中获取消息数量

Apache Kafka是一个开源的分布式事件流平台。

在这个快速教程中，我们将学习获取Kafka主题中消息数量的技术。**我们将展示程序化以及原生命令技术。**

### 2. 程序化技术

Kafka主题可能有多个分区。**我们的技术应该确保我们计算了每个分区中的消息数量。**

**我们必须逐个检查每个分区的最新偏移量。**为此，我们将引入一个消费者：

```
KafkaConsumer``<String, String>`` consumer = new KafkaConsumer``<String, String>``(props);
```

第二步是**从这个消费者获取所有分区**：

```
List`<TopicPartition>` partitions = consumer.partitionsFor(topic).stream().map(p -> new TopicPartition(topic, p.partition()))
    .collect(Collectors.toList());
```

第三步是**在每个分区的末尾对消费者进行偏移，并在分区映射中记录结果**：

```
consumer.assign(partitions);
consumer.seekToEnd(Collections.emptySet());
Map`<TopicPartition, Long>` endPartitions = partitions.stream().collect(Collectors.toMap(Function.identity(), consumer::position));
```

最后一步是**获取每个分区中的最后位置并将结果相加以获取主题中的消息数量**：

```
numberOfMessages = partitions.stream().mapToLong(p -> endPartitions.get(p)).sum();
```

### 3. Kafka原生命令

程序化技术对于我们想要对Kafka主题中的消息数量执行一些自动化任务时非常有用。**然而，如果只是为了分析目的，创建这些服务并在机器上运行它们将是一个负担。**一个直接的选择是利用Kafka的原生命令。它将提供快速的结果。

#### 3.1. 使用GetoffsetShell命令

在执行原生命令之前，我们必须导航到机器上的Kafka根文件夹。以下命令返回了主题_baeldung_上发布的消息数量：

```
$ bin/kafka-run-class.sh kafka.tools.GetOffsetShell --broker-list localhost:9092 --topic baeldung | awk -F ":" '{sum += $3} END {print "Result: "sum}'
Result: 3
```

#### 3.2. 使用消费者控制台

如前所述，我们将在执行任何命令之前导航到Kafka的根文件夹。以下命令返回了主题_baeldung_上发布的消息数量：

```
$ bin/kafka-console-consumer.sh --from-beginning --bootstrap-server localhost:9092 --property print.key=true --property print.value=false --property print.partition --topic baeldung --timeout-ms 5000 | tail -n 10|grep "Processed a total of"
Processed a total of 3 messages
```

### 4. 结论

在本文中，我们探讨了获取Kafka主题中消息数量的技术。我们学习了一种程序化技术，它将所有分区分配给一个消费者并检查最新的偏移量。

我们还看到了两种Kafka原生命令技术。一种是Kafka工具中的_GetoffsetShell_命令。另一种是在控制台上运行消费者并打印从开始的消息数量。

如往常一样，本文的源代码可以在GitHub上找到。