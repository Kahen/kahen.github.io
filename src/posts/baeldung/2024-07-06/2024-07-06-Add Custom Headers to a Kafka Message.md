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
      content: Kafka, Java, 自定义消息头, 事件流, 消息系统
---
# 在Kafka消息中添加自定义消息头

Apache Kafka是一个开源的分布式事件存储和容错的流处理系统。**Kafka基本上是一个事件流平台，客户端可以发布和订阅事件流。** 通常，生产者应用程序将事件发布到Kafka，而消费者订阅这些事件，从而实现发布-订阅模型。

在本教程中，我们将学习如何使用Kafka生产者向Kafka消息添加自定义头。

### 2.1. 依赖项
首先，让我们将Kafka客户端Java库的Maven依赖项添加到我们项目的_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`org.apache.kafka`</groupId>`
    `<artifactId>`kafka-clients`</artifactId>`
    `<version>`3.4.0`</version>`
`</dependency>`
```

### 2.2. 连接初始化
本指南假设我们的本地系统上运行着一个Kafka集群。此外，我们需要创建一个主题并与Kafka集群建立连接。

首先，让我们在集群中创建一个Kafka主题。我们可以通过参考我们的Kafka主题创建指南来创建一个名为“_baeldung_”的主题。

其次，让我们创建一个新的_Properties_实例，该实例具有连接生产者到我们本地代理所需的最低配置：

```
Properties producerProperties = new Properties();
producerProperties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
producerProperties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
producerProperties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
```

最后，让我们创建一个_KafkaProducer_的实例，我们将用它来发布消息：

```
KafkaProducer``````<String, String>`````` producer = new KafkaProducer<>（producerProperties）;
```

_KafkaProducer_类的构造函数接受一个_Properties_对象（或一个_Map_）与_bootstrap.servers_属性，并返回一个_KafkaProducer_的实例。

以类似的方式，让我们创建一个_KafkaConsumer_的实例，我们将用它来消费消息：

```
Properties consumerProperties = new Properties();
consumerProperties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA_CONTAINER.getBootstrapServers());
consumerProperties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
consumerProperties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
consumerProperties.put(ConsumerConfig.GROUP_ID_CONFIG, "ConsumerGroup1");

KafkaConsumer``````<String, String>`````` consumer = new KafkaConsumer<>(consumerProperties);
```

我们将使用这些生产者和消费者实例来演示我们所有的编码示例。

现在我们已经配置了所有必要的依赖项和连接，我们可以编写一个简单的应用程序来向Kafka消息添加自定义头。

**Kafka消息的自定义头支持是在Kafka版本0.11.0.0中添加的。** 要创建一个Kafka消息（Record），我们创建一个_ProducerRecord`<K,V>`_的实例。_ProducerRecord_基本上确定了要发布的消息值和主题，以及其他元数据。

**_ProducerRecord_类提供了多种构造函数，可以向Kafka消息添加自定义头。** 让我们看看我们可以使用的一些构造函数：

- _ProducerRecord(String topic, Integer partition, K key, V value, Iterable`````<Header>````` headers)_
- _ProducerRecord(String topic, Integer partition, Long timestamp, K key, V value, Iterable`````<Header>````` headers)_

两个**_ProducerRecord_类构造函数都接受自定义头，形式为_Iterable`````<Header>`````_类型**。

为了理解，让我们创建一个_ProducerRecord_，将消息发布到“baeldung”主题以及一些自定义头：

```
List`````<Header>````` headers = new ArrayList<>();
headers.add(new RecordHeader("website", "baeldung.com".getBytes()));
ProducerRecord``````<String, String>`````` record = new ProducerRecord<>("baeldung", null, "message", "Hello World", headers);

producer.send(record);
```

在这里，我们创建了一个_Header_类型的_List_，作为头传递给构造函数。每个头表示一个_Header_实例_RecordHeader(String key, byte[] value)_，它接受一个头键作为_String_和头值作为_byte_数组。

同样，我们可以使用第二个构造函数，它还接受正在发布记录的时间戳：

```
List`````<Header>````` headers = new ArrayList<>();
headers.add(new RecordHeader("website", "baeldung.com".getBytes()));
ProducerRecord``````<String, String>`````` record = new ProducerRecord<>("baeldung", null, System.currentTimeMillis(), "message", "Hello World", headers);

producer.send(record);
```

到目前为止，我们已经创建了一个带有自定义头的消息，并将其发布到Kafka。

接下来，让我们实现消费者代码来消费消息并验证其自定义头。

首先，让我们将我们的消费者实例订阅到Kafka主题“baeldung”以消费消息：

```
consumer.subscribe(Arrays.asList("baeldung"));
```

其次，我们使用轮询机制从Kafka轮询新消息：

```
ConsumerRecords``````<String, String>`````` records = consumer.poll(Duration.ofMinutes(1));
```

_KafkaConsumer.poll(Duration duration)_方法在指定的_Duration_参数时间范围内轮询Kafka主题中的新消息。该方法返回一个_ConsumerRecords_实例，其中包含获取到的消息。_ConsumerRecords_基本上是_ConsumerRecord_类型的_Iterable_实例。

最后，我们循环遍历获取到的记录，并获取每个消息的自定义头：

```
for (ConsumerRecord``````<String, String>`````` record : records) {
    System.out.println(record.key());
    System.out.println(record.value());

    Headers consumedHeaders = record.headers();
    for (Header header : consumedHeaders) {
        System.out.println(header.key());
        System.out.println(new String(header.value()));
    }
}
```

在这里，我们使用_ConsumerRecord_类的各种getter方法来获取消息键、值和自定义头。**_ConsumerRecord.headers()_方法返回一个包含自定义头的_Headers_实例**。_Headers_基本上是_Header_类型的_Iterable_实例。然后我们循环遍历每个_Header_实例，并使用_Header.key()_和_Header.value()_方法分别获取头键和值。

## 5. 结论
在本文中，我们学习了如何向Kafka消息添加自定义头。我们查看了接受自定义头的不同构造函数及其相应的实现。

然后我们看到如何消费带有自定义头的消息并验证它们。

如往常一样，所有示例的完整代码都可以在GitHub上找到。