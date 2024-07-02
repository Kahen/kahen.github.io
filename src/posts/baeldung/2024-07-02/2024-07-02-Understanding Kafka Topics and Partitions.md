---
date: 2022-04-01
category:
  - Kafka
  - 分布式系统
tag:
  - Kafka
  - 主题
  - 分区
head:
  - - meta
    - name: keywords
      content: Kafka, 主题, 分区, 分布式消息系统
---
# Kafka主题和分区的理解

在本教程中，我们将探讨Kafka主题和分区以及它们之间的关联。

## 1. 引言
在本教程中，我们将探讨Kafka主题和分区以及它们是如何相互关联的。

## 2. Kafka主题是什么
**主题是一个存储事件序列的机制。** 从根本上说，主题是持久的日志文件，它们按照事件发生的时间顺序保持事件的顺序。因此，每个新事件总是被添加到日志的末尾。此外，**事件是不可变的**。因此，一旦事件被添加到主题中，我们就不能更改它们。

Kafka主题的一个示例用例是记录一个房间的温度测量序列。一旦记录了温度值，比如下午5:02的25摄氏度，它就不能被改变，因为它已经发生了。此外，下午5:06的温度值不能早于在下午5:02记录的温度值。因此，通过将每个温度测量视为一个事件，Kafka主题将是存储该数据的合适选择。

## 3. Kafka分区是什么
Kafka使用主题分区来提高可扩展性。在分区主题时，Kafka将其分解为小部分，并将其存储在分布式系统的不同节点中。这些部分的数量由我们或集群的默认配置确定。

**Kafka保证同一主题分区内的事件顺序。** 然而，默认情况下，它不保证所有分区中事件的顺序。

例如，为了提高性能，我们可以将主题分成两个不同的分区，并在消费者端从它们中读取。在这种情况下，消费者以相同的顺序读取到达同一分区的事件。相比之下，如果Kafka将两个事件发送到不同的分区，我们就不能保证消费者以它们产生的顺序读取事件。

为了改善事件的排序，我们可以为事件对象设置事件键。通过这样做，具有相同键的事件被分配到同一个分区，该分区是有序的。因此，具有相同键的事件将以它们产生的顺序到达消费者端。

## 4. 消费者组
消费者组是一组从主题中读取的消费者。Kafka将所有分区分配给组中的消费者，其中任何给定的分区总是由组中的一个成员消费一次。然而，这种分配可能是不平衡的，这意味着一个消费者可以被分配多个分区。

例如，让我们设想一个有三个分区的主题，应该由两个消费者的消费者组来读取。因此，一种可能的分配是第一个消费者获得第一和第二分区，第二个消费者只获得第三分区。

**在KIP-500更新中，Kafka引入了一种名为KRaft的新共识算法。当我们向组中添加消费者或从组中移除消费者时，KRaft会在剩余的消费者之间按比例重新平衡分区**。因此，它保证没有没有消费者分配的分区。

## 5. 配置应用程序
在这一部分，我们将创建用于配置主题、消费者和生产者服务的类。

### 5.1. 主题配置
首先，让我们为我们的主题创建配置类：

```java
@Configuration
public class KafkaTopicConfig {

    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;

    public KafkaAdmin kafkaAdmin() {
        Map``<String, Object>`` configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        return new KafkaAdmin(configs);
    }

    public NewTopic celciusTopic() {
        return TopicBuilder.name("celcius-scale-topic")
                .partitions(2)
                .build();
    }
}
```

_KafkaTopicConfig_类注入了两个Spring beans。_KafkaAdmin_ bean使用它应该运行的网络地址初始化Kafka集群，而_NewTopic_ bean创建了一个名为_celcius-scale-topic_的主题，它有一个分区。

### 5.2. 消费者和生产者配置
我们需要必要的类来注入我们主题的消费者和生产者配置。

首先，让我们创建生产者配置类：

```java
public class KafkaProducerConfig {

    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapAddress;

    @Bean
    public ProducerFactory````<String, Double>```` producerFactory() {
        Map``<String, Object>`` configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, DoubleSerializer.class);
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate````<String, Double>```` kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}
```

_KafkaProducerConfig_注入了两个Spring beans。_ProducerFactory_告诉Kafka应该如何序列化事件以及生产者应该监听哪个服务器。_KafkaTemplate_将在消费者服务类中使用，以创建事件。

### 5.3. Kafka生产者服务
最后，在初始配置之后，我们可以创建驱动应用程序。让我们首先创建生产者应用程序：

```java
public class ThermostatService {

    private final KafkaTemplate````<String, Double>```` kafkaTemplate;

    public ThermostatService(KafkaTemplate````<String, Double>```` kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void measureCelsiusAndPublish(int numMeasurements) {
        new Random().doubles(25, 35)
                .limit(numMeasurements)
                .forEach(tmp -> {
                    kafkaTemplate.send("celcius-scale-topic", tmp);
                });
    }
}
```

_ThermostatService_包含一个名为_measureCelsiusAndPublish_的单个方法。此方法生成25到35范围内的随机温度测量值，并将它们发布到_celcius-scale-topic_ Kafka主题。为此，我们使用_Random_类的_doubles()_方法创建一个随机数流。然后，我们使用_kafkaTemplate_的_send_ _()_方法发布事件。

## 6. 生产和消费事件
在这一部分，我们将看到如何使用嵌入式Kafka代理配置Kafka消费者从主题中读取事件。

### 6.1. 创建消费者服务
要消费事件，我们需要一个或多个消费者类。让我们创建一个_celcius-scale-topic_的消费者：

```java
@Service
public class TemperatureConsumer {
    Map`<String, Set<String>`> consumedRecords = new ConcurrentHashMap<>();

    @KafkaListener(topics = "celcius-scale-topic", groupId = "group-1")
    public void consumer1(ConsumerRecord`<?, ?>` consumerRecord) {
        trackConsumedPartitions("consumer-1", consumerRecord.partition());
    }

    private void trackConsumedPartitions(String consumerName, int partitionNumber) {
        consumedRecords.computeIfAbsent(consumerName, k -> new HashSet<>());
        consumedRecords.computeIfPresent(consumerName, (k, v) -> {
            v.add(String.valueOf(partitionNumber));
            return v;
        });
    }
}
```

我们的_consumer1()_方法使用@KafkaListener注释来启动消费者。_topics_参数是要消费的主题列表，而_groupId_参数标识消费者所属的消费者组。

为了稍后可视化结果，我们使用_ConcurrentHashMap_来存储消费的事件。_key_对应于消费者的名字，而_value_包含它消费的分区。

### 6.2. 创建测试类
现在，让我们创建我们的集成测试类：

```java
@SpringBootTest(classes = ThermostatApplicationKafkaApp.class)
@EmbeddedKafka(partitions = 2, brokerProperties = {"listeners=PLAINTEXT://localhost:9092", "port=9092"})
public class KafkaTopicsAndPartitionsIntegrationTest {
    @ClassRule
    public static EmbeddedKafkaBroker embeddedKafka = new EmbeddedKafkaBroker(1, true, "multitype");

    @Autowired
    private ThermostatService service;

    @Autowired
    private TemperatureConsumer consumer;

    @Test
    public void givenTopic_andConsumerGroup_whenConsumersListenToEvents_thenConsumeItCorrectly() throws Exception {
        service.measureCelsiusAndPublish(10000);
        Thread.sleep(1000);
        System.out.println(consumer.consumedRecords);
    }
}
```

我们使用嵌入式Kafka代理来运行带有Kafka的测试。@EmbeddedKafka注释使用_brokerProperties_参数配置代理将运行的URL和端口。然后，我们使用_EmbeddedKafkaBroker_字段中的JUnit规则启动嵌入式代理。

最后，在测试方法中，我们调用我们的恒温器服务来产生10,000个事件。

我们将使用_Thread.sleep()_在产生事件后等待1秒钟。这确保了消费者在代理中正确设置，开始处理消息。

让我们看看当我们运行测试时会得到什么样的输出示例：

```java
{consumer-1=[0, 1]}
```

这意味着同一个消费者处理了0和1分区中的所有事件，因为我们只有一个消费者和一个消费者组。如果有不同消费者组中的更多消费者，结果可能会有所不同。

## 7. 结论
在本文中，我们查看了Kafka主题和分区的定义以及它们是如何相互关联的。

我们还展示了一个消费者使用嵌入式Kafka代理从主题的两个分区中读取事件的场景。

如往常一样，示例代码在GitHub上可用。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/9dcd3e9d44594a3dd06700c725c7d9d9?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/brandon_ward_headshot-150x150.jpeg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK