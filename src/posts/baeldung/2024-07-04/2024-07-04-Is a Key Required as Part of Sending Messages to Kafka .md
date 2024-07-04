---
date: 2022-04-01
category:
  - Java
  - Kafka
tag:
  - Kafka
  - Java
head:
  - - meta
    - name: keywords
      content: Kafka, Java, 消息, 键
---

# Apache Kafka中发送消息是否需要键？

Apache Kafka是一个开源的、分布式的流处理系统，具有容错性并且提供高吞吐量。Kafka基本上是一个实现了发布-订阅模型的消息系统。Kafka的消息、存储和流处理能力使我们能够大规模地存储和分析实时数据流。

在本教程中，我们首先将探讨Kafka消息中键的重要性。然后，我们将学习如何将带键的消息发布到Kafka主题。

## 2. Kafka消息中键的重要性

我们知道，Kafka有效地按照我们生成记录的顺序存储记录流。

当我们向Kafka主题发布消息时，它以轮询的方式在可用分区中分配。因此，在Kafka主题内，消息的顺序在分区内是保证的，但在分区之间则不是。

当我们向Kafka主题发布带键的消息时，所有具有相同键的消息都保证被Kafka存储在同一个分区中。因此，如果我们要维持具有相同键的消息的顺序，Kafka消息中的键是有用的。

**总结来说，键不是发送消息到Kafka的必需部分。基本上，如果我们希望维持具有相同键的消息的严格顺序，那么我们绝对应该使用消息中的键。对于所有其他情况，拥有空键将提供更好的消息在分区之间的分布。**

接下来，让我们直接深入一些带有键的Kafka消息的实现代码。

## 3. 设置

在我们开始之前，让我们首先初始化一个Kafka集群，设置依赖项，并与Kafka集群建立连接。

Kafka的Java库提供了易于使用的Producer和Consumer API，我们可以使用它们来发布和消费Kafka中的消息。

### 3.1. 依赖项

首先，让我们将Kafka Clients Java库的Maven依赖项添加到我们项目的_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`org.apache.kafka`</groupId>`
    `<artifactId>`kafka-clients`</artifactId>`
    `<version>`3.4.0`</version>`
`</dependency>`
```

### 3.2. 集群和主题初始化

其次，我们需要一个运行中的Kafka集群，我们可以连接到它并执行各种Kafka操作。本指南假设Kafka集群在我们的本地系统上运行，使用默认配置。

最后，我们将创建一个具有多个分区的Kafka主题，我们可以用来发布和消费消息。参考我们的Kafka主题创建指南，让我们创建一个名为“_baeldung_”的主题：

```
Properties adminProperties = new Properties();
adminProperties.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");

Admin admin = Admin.create(adminProperties);
```

在这里，我们使用由_Properties_实例定义的基本配置创建了一个Kafka _Admin_的实例。接下来，我们将使用这个_Admin_实例来创建一个名为“_baeldung_”的主题，它有五个分区：

```
admin.createTopics(Collections.singleton(new NewTopic("baeldung", 5, (short) 1)));
```

现在我们已经使用主题初始化了Kafka集群设置，让我们发布一些带键的消息。

## 4. 带键发布消息

为了演示我们的编码示例，我们首先将创建一个带有一些基本生产者属性的_KafkaProducer_实例。接下来，我们将使用创建的_KafkaProducer_实例发布带键的消息并验证主题分区。

让我们详细深入这些步骤的每一个。

### 4.1. 初始化生产者

首先，让我们创建一个新的_Properties_实例，其中包含连接到我们本地代理的生产者的属性：

```
Properties producerProperties = new Properties();
producerProperties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
producerProperties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
producerProperties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
```

进一步，让我们使用创建的生产者_Properties_实例创建一个_KafkaProducer_实例：

```
KafkaProducer```<String, String>``` producer = new KafkaProducer<>(producerProperties);
```

_KafkaProducer_类的构造函数接受一个_Properties_对象（或一个_Map）并返回一个_KafkaProducer_的实例。

### 4.2. 发布消息

Kafka发布者API提供了多个构造函数来创建带键的_ProducerRecord_实例。我们使用_ProducerRecord`<K,V>`(String topic, K key, V value)_构造函数来创建一个带键的消息：

```
ProducerRecord```<String, String>``` record = new ProducerRecord<>("baeldung", "message-key", "Hello World");
```

在这里，我们为“_baeldung_”主题创建了一个带键的_ProducerRecord_实例。

现在，让我们向Kafka主题发布一些消息并验证分区：

```
for (int i = 1; i <= 10; i++) {
    ProducerRecord```<String, String>``` record = new ProducerRecord<>("baeldung", "message-key", String.valueOf(i));
    Future``<RecordMetadata>`` future = producer.send(record);
    RecordMetadata metadata = future.get();

    logger.info(String.valueOf(metadata.partition()));
}
```

我们使用_KafkaProducer.send(ProducerRecord```<String, String>``` record)_方法向Kafka发布消息。该方法返回一个类型为_RecordMetadata_的_Future_实例。然后我们使用阻塞调用_Future``<RecordMetadata>``.get()_方法，当消息发布时返回一个_RecordMetadata_实例。

接下来，我们使用_RecordMetadata.partition()_方法并获取消息的分区。

上述代码片段产生了以下记录结果：

```
1
1
1
1
1
1
1
1
1
1
```

通过这个，我们验证了我们发布的具有相同键的消息被发布到了同一个分区。

## 5. 结论

在本文中，我们学习了Kafka消息中键的重要性。

我们首先看到了如何将带键的消息发布到主题。然后我们讨论了如何验证具有相同键的消息被发布到同一个分区。

一如既往，所有示例的完整代码都可以在GitHub上找到。