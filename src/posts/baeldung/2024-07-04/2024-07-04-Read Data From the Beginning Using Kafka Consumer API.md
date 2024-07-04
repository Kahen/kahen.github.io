---
date: 2022-04-01
category:
  - Java
  - Kafka
tag:
  - Kafka Consumer API
  - Real-time data processing
head:
  - - meta
    - name: keywords
      content: Kafka, Java, Consumer API, Event streaming, Real-time data processing
---
# 使用Kafka消费者API从开始读取数据

Apache Kafka是一个开源的分布式事件流处理系统。它基本上是一个事件流平台，可以发布、订阅、存储和处理记录流。

Kafka为实时数据处理提供了一个高吞吐量和低延迟的平台。基本上，**Kafka实现了发布-订阅模型，生产者应用程序将事件发布到Kafka，而消费者应用程序订阅这些事件。**

在本教程中，我们将学习如何使用Kafka消费者API从Kafka主题的开始读取数据。

## 2. 设置

在我们开始之前，让我们首先设置依赖项，初始化Kafka集群连接，并在Kafka中发布一些消息。

Kafka提供了一个方便的Java客户端库，我们可以使用它来执行Kafka集群的各种操作。

### 2.1. 依赖项

首先，让我们将Kafka客户端Java库的Maven依赖项添加到我们项目的_pom.xml_文件中：

```xml
`<dependency>`
    `<groupId>`org.apache.kafka`</groupId>`
    `<artifactId>`kafka-clients`</artifactId>`
    `<version>`3.4.0`</version>`
`</dependency>`
```

### 2.2. 集群和主题初始化

在整个指南中，我们将假设Kafka集群正在我们的本地系统上运行，并使用默认配置。

其次，我们需要创建一个Kafka主题，我们可以用来发布和消费消息。让我们通过参考我们的Kafka主题建指南创建一个名为“_baeldung_”的Kafka主题。

现在我们已经启动了Kafka集群并创建了一个主题，让我们发布一些消息到Kafka。

### 2.3. 发布消息

最后，让我们向Kafka主题“_baeldung_”发布一些虚拟消息。

要发布消息，让我们创建一个_Properties_实例定义的基本配置的_KafkaProducer_实例：

```java
Properties producerProperties = new Properties();
producerProperties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA_CONTAINER.getBootstrapServers());
producerProperties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
producerProperties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

KafkaProducer``````<String, String>`````` producer = new KafkaProducer<>(producerProperties);
```

我们使用_KafkaProducer.send(ProducerRecord)_方法将消息发布到Kafka主题“_baeldung_”：

```java
for (int i = 1; i <= 10; i++) {
    ProducerRecord``````<String, String>`````` record = new ProducerRecord<>("baeldung", String.valueOf(i));
    producer.send(record);
}
```

在这里，我们向我们的Kafka集群发布了十条消息。我们将使用这些来演示我们的消费者实现。

## 3. 从开始消费消息

到目前为止，我们已经初始化了我们的Kafka集群，并发布了一些样本消息到Kafka主题。接下来，让我们看看我们如何从开始读取消息。

为了演示这一点，我们首先使用_Properties_实例定义的特定消费者属性集初始化_KafkaConsumer_的一个实例。然后，我们使用创建的_KafkaConsumer_实例来消费消息，并将偏移量重新定位到分区偏移量的开始。

让我们详细看看这些步骤。

### 3.1. 消费者属性

要从Kafka主题的开始消费消息，我们使用随机生成的消费者组ID创建_KafkaConsumer_的一个实例。我们通过将消费者的“_group.id_”属性设置为随机生成的UUID来实现这一点：

```java
Properties consumerProperties = new Properties();
consumerProperties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
consumerProperties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
consumerProperties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
consumerProperties.put(ConsumerConfig.GROUP_ID_CONFIG, UUID.randomUUID().toString());
```

当我们为消费者生成新的消费者组ID时，消费者将始终属于由“_group.id_”属性标识的新消费者组。新的消费者组不会有任何与之关联的偏移量。在这种情况下，**Kafka提供了一个属性“_auto.offset.reset_”，它指示当Kafka中没有初始偏移量或如果当前偏移量不再存在于服务器上时应该做什么。**

“_auto.offset.reset_”属性接受以下值：

- _earliest_: 此值自动将偏移量重置为最早的偏移量
- _latest_: 此值自动将偏移量重置为最新的偏移量
- _none_: 如果没有为消费者组找到先前的偏移量，则此值向消费者抛出异常
- 其他: 如果设置的值不是前三个值中的任何一个，则向消费者抛出异常

由于我们想要**从Kafka主题的开始读取，我们将“_auto.offset.reset_”属性的值设置为“_earliest”：**

```java
consumerProperties.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
```

现在，让我们使用消费者属性创建_KafkaConsumer_的一个实例：

```java
KafkaConsumer``````<String, String>`````` consumer = new KafkaConsumer<>(consumerProperties);
```

我们使用这个_KafkaConsumer_实例从主题的开始消费消息。

### 3.2. 消费消息

要消费消息，我们首先订阅我们的消费者以从主题“_baeldung_”消费消息：

```java
consumer.subscribe(Arrays.asList("baeldung"));
```

接下来，我们**使用_KafkaConsumer.poll(Duration duration)_方法从主题“_baeldung_”轮询新消息，直到由_Duration_参数指定的时间：**

```java
ConsumerRecords``````<String, String>`````` records = consumer.poll(Duration.ofSeconds(10));

for (ConsumerRecord``````<String, String>`````` record : records) {
    logger.info(record.value());
}
```

这样，我们就从“_baeldung_”主题的开始读取了所有消息。

此外，**要将现有消费者重置为从主题的开始读取，我们使用_KafkaConsumer.seekToBeginning(Collection`<TopicPartition>` partitions)_方法。** 此方法接受_TopicPartition_的集合，并将消费者的偏移量指向分区的开始：

```java
consumer.seekToBeginning(consumer.assignment());
```

在这里，我们将_KafkaConsumer.assignment()_方法的值传递给_seekToBeginning()_方法。_KafkaConsumer.assignment()_方法返回当前分配给消费者的分区集。

最后，再次为消息轮询相同的消费者现在从分区的开始读取所有消息：

```java
ConsumerRecords``````<String, String>`````` records = consumer.poll(Duration.ofSeconds(10));

for (ConsumerRecord``````<String, String>`````` record : records) {
    logger.info(record.value());
}
```

## 4. 结论

在本文中，我们学习了如何使用Kafka消费者API从Kafka主题的开始读取消息。

我们首先查看了新消费者如何从Kafka主题的开始读取消息，以及其实现方式。然后，我们看到了已经消费的消费者如何将其偏移量定位到从开始读取消息。

像往常一样，所有示例的完整代码可以在GitHub上找到。