---
date: 2024-07-28
category:
  - Java
  - Kafka
tag:
  - Consumer Lag
  - Monitoring
head:
  - - meta
    - name: keywords
      content: Kafka, Consumer Lag, Monitoring, Java
------
# 监控Apache Kafka中的消费者滞后

Kafka消费者组滞后是任何基于Kafka的事件驱动系统的关键性能指标。

在本教程中，我们将构建一个分析应用程序来监控Kafka消费者滞后。

消费者滞后简单地说是消费者最后提交的偏移量与生产者在日志中的结束偏移量之间的差值。换句话说，消费者滞后度量了在任何生产者-消费者系统中生产和消费消息之间的延迟。

在本节中，让我们了解如何确定偏移量值。

### 2.1. Kafka AdminClient

**为了检查消费者组的偏移量值**，**我们需要管理Kafka客户端**。因此，让我们在_LagAnalyzerService_类中编写一个方法来创建_AdminClient_类的实例：

```java
private AdminClient getAdminClient(String bootstrapServerConfig) {
    Properties config = new Properties();
    config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServerConfig);
    return AdminClient.create(config);
}
```

我们必须注意使用_@Value_注解从属性文件中检索引导服务器列表。同样，我们将使用此注解获取其他值，如_groupId和topicName_。

### 2.2. 消费者组偏移量

首先，我们可以**使用_AdminClient_类的_listConsumerGroupOffsets()_方法获取特定消费者组ID的偏移信息**。

接下来，我们主要关注偏移值，因此我们可以调用_partitionsToOffsetAndMetadata()_方法获取TopicPartition与_OffsetAndMetadata_值的映射：

```java
private Map``````````````<TopicPartition, Long>`````````````` getConsumerGrpOffsets(String groupId)
  throws ExecutionException, InterruptedException {
    ListConsumerGroupOffsetsResult info = adminClient.listConsumerGroupOffsets(groupId);
    Map``<TopicPartition, OffsetAndMetadata>`` topicPartitionOffsetAndMetadataMap = info.partitionsToOffsetAndMetadata().get();

    Map``````````````<TopicPartition, Long>`````````````` groupOffset = new HashMap<>();
    for (Map.Entry``<TopicPartition, OffsetAndMetadata>`` entry : topicPartitionOffsetAndMetadataMap.entrySet()) {
        TopicPartition key = entry.getKey();
        OffsetAndMetadata metadata = entry.getValue();
        groupOffset.putIfAbsent(new TopicPartition(key.topic(), key.partition()), metadata.offset());
    }
    return groupOffset;
}
```

最后，我们可以注意到对_topicPartitionOffsetAndMetadataMap_的迭代，以限制我们获取的结果仅为每个主题和分区的偏移值。

### 2.3. 生产者偏移量

找到消费者组滞后的唯一事情是获取结束偏移值的方法。为此，我们可以使用_KafkaConsumer_类的_endOffsets()_方法。

让我们首先在_LagAnalyzerService_类中创建_KafkaConsumer_类的实例：

```java
private KafkaConsumer```````````<String, String>``````````` getKafkaConsumer(String bootstrapServerConfig) {
    Properties properties = new Properties();
    properties.setProperty(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServerConfig);
    properties.setProperty(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
    properties.setProperty(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
    return new KafkaConsumer<>();
}
```

接下来，让我们聚合所有相关的TopicPartition值，这些值需要计算滞后，以便将其作为参数提供给_endOffsets()_方法：

```java
private Map``````````````<TopicPartition, Long>`````````````` getProducerOffsets(Map``````````````<TopicPartition, Long>`````````````` consumerGrpOffset) {
    List`<TopicPartition>` topicPartitions = new LinkedList<>();
    for (Map.Entry``````````````<TopicPartition, Long>`````````````` entry : consumerGrpOffset.entrySet()) {
        TopicPartition key = entry.getKey();
        topicPartitions.add(new TopicPartition(key.topic(), key.partition()));
    }
    return kafkaConsumer.endOffsets(topicPartitions);
}
```

最后，让我们编写一个方法，使用消费者偏移量和生产者的_endoffsets_来生成每个_TopicPartition_的滞后：

```java
private Map``````````````<TopicPartition, Long>`````````````` computeLags(
  Map``````````````<TopicPartition, Long>`````````````` consumerGrpOffsets,
  Map``````````````<TopicPartition, Long>`````````````` producerOffsets) {
    Map``````````````<TopicPartition, Long>`````````````` lags = new HashMap<>();
    for (Map.Entry``````````````<TopicPartition, Long>`````````````` entry : consumerGrpOffsets.entrySet()) {
        Long producerOffset = producerOffsets.get(entry.getKey());
        Long consumerOffset = consumerGrpOffsets.get(entry.getKey());
        long lag = Math.abs(producerOffset - consumerOffset);
        lags.putIfAbsent(entry.getKey(), lag);
    }
    return lags;
}
```

## 3. 滞后分析器

现在，让我们通过在_LagAnalyzerService_类中编写_analyzeLag()_方法来协调滞后分析：

```java
public void analyzeLag(String groupId) throws ExecutionException, InterruptedException {
    Map``````````````<TopicPartition, Long>`````````````` consumerGrpOffsets = getConsumerGrpOffsets(groupId);
    Map``````````````<TopicPartition, Long>`````````````` producerOffsets = getProducerOffsets(consumerGrpOffsets);
    Map``````````````<TopicPartition, Long>`````````````` lags = computeLags(consumerGrpOffsets, producerOffsets);
    for (Map.Entry``````````````<TopicPartition, Long>`````````````` lagEntry : lags.entrySet()) {
        String topic = lagEntry.getKey().topic();
        int partition = lagEntry.getKey().partition();
        Long lag = lagEntry.getValue();
        LOGGER.info("Time={} | Lag for topic = {}, partition = {}, groupId = {} is {}",
          MonitoringUtil.time(),
          topic,
          partition,
          lag);
    }
}
```

然而，当涉及到监控滞后指标时，我们需要滞后的**几乎实时值**，以便我们可以采取任何管理行动以恢复系统性能。

实现这一点的一个直接方法是通过**定期的时间间隔轮询滞后值**。因此，让我们创建一个_LiveLagAnalyzerService_服务，该服务将调用_LagAnalyzerService_的_analyzeLag()_方法：

```java
@Scheduled(fixedDelay = 5000L)
public void liveLagAnalysis() throws ExecutionException, InterruptedException {
    lagAnalyzerService.analyzeLag(groupId);
}
```

为了我们的目的，我们使用_@Scheduled_注解将轮询频率设置为_5秒_。然而，对于实时监控，我们可能需要通过JMX使其可访问。

## 4. 模拟

在本节中，我们将**模拟Kafka生产者和消费者以进行本地Kafka设置**，这样我们就可以看到_LagAnalyzer_在不依赖外部Kafka生产者和消费者的情况下的运行情况。

### 4.1. 模拟模式

由于**模拟模式仅用于演示目的**，我们应该有一种机制，在我们需要为真实场景运行Lag Analyzer应用程序时可以关闭它。

我们可以在_application.properties_资源文件中将其作为可配置属性：

```properties
monitor.producer.simulate=true
monitor.consumer.simulate=true
```

我们将这些属性插入到Kafka生产者和消费者中，并控制它们的行为。

此外，让我们定义生产者_startTime_、_endTime_和一个辅助方法_time()_以在监控期间获取当前时间：

```java
public static final Date startTime = new Date();
public static final Date endTime = new Date(startTime.getTime() + 30 * 1000);

public static String time() {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    String date = dtf.format(now);
    return date;
}
```

### 4.2. 生产者-消费者配置

我们需要定义一些核心配置值以实例化我们的Kafka消费者和生产者模拟器的实例。

首先，让我们在_KafkaConsumerConfig_类中定义消费者模拟器的配置：

```java
@Bean
public ConsumerFactory```````````<String, String>``````````` consumerFactory() {
    Map```<String, Object>``` props = new HashMap<>();
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
    props.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, 0);
    props.put(ConsumerConfig.GROUP_ID_CONFIG, this.groupId);
    return new DefaultKafkaConsumerFactory<>(props);
}

@Bean
public ConcurrentKafkaListenerContainerFactory```````````<String, String>``````````` kafkaListenerContainerFactory(
  @Qualifier("consumerFactory") ConsumerFactory```````````<String, String>``````````` consumerFactory) {
    ConcurrentKafkaListenerContainerFactory```````````<String, String>``````````` listenerContainerFactory =
      new ConcurrentKafkaListenerContainerFactory<>();
    listenerContainerFactory.setConsumerFactory(consumerFactory);
    return listenerContainerFactory;
}
```

接下来，我们可以在_KafkaProducerConfig_类中定义生产者模拟器的配置：

```java
@Bean
public ProducerFactory```````````<String, String>``````````` producerFactory() {
    Map```<String, Object>``` configProps = new HashMap<>();
    configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
    configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    return new DefaultKafkaProducerFactory<>(configProps);
}

@Bean
public KafkaTemplate```````````<String, String>``````````` kafkaTemplate()```java
@Bean
public KafkaTemplate```````````<String, String>``````````` kafkaTemplate() {
    return new KafkaTemplate<>(producerFactory());
}
```

进一步地，让我们使用_@KafkaListener_注解来指定目标监听器，当然，这只在_monitor.consumer.simulate_设置为_true_时启用：

```java
@KafkaListener(
  topics = "${monitor.topic.name}",
  containerFactory = "kafkaListenerContainerFactory",
  autoStartup = "${monitor.consumer.simulate}")
public void listen(String message) throws InterruptedException {
    Thread.sleep(10L);
}
```

如上所述，我们增加了10毫秒的睡眠时间，以创建人工消费者滞后。

最后，让我们编写一个_sendMessage()_方法来模拟生产者：

```java
@Scheduled(fixedDelay = 1L, initialDelay = 5L)
public void sendMessage() throws ExecutionException, InterruptedException {
    if (enabled) {
        if (endTime.after(new Date())) {
            String message = "msg-" + time();
            SendResult```````````<String, String>``````````` result = kafkaTemplate.send(topicName, message).get();
        }
    }
}
```

我们可以注意到，生产者将以每毫秒1条消息的速率生成消息。此外，它将在模拟开始后30秒的_endTime_停止生成消息。

### 4.3. 实时监控

现在，让我们运行我们的_LagAnalyzerApplication_的主方法：

```java
public static void main(String[] args) {
    SpringApplication.run(LagAnalyzerApplication.class, args);
    while (true) ;
}
```

我们将在每30秒后看到每个主题分区的当前滞后：

```
Time=2021/06/06 11:07:24 | Lag for topic = baeldungTopic, partition = 0, groupId =baeldungGrp is 93
Time=2021/06/06 11:07:29 | Lag for topic = baeldungTopic, partition = 0, groupId =baeldungGrp is 290
Time=2021/06/06 11:07:34 | Lag for topic = baeldungTopic, partition = 0, groupId =baeldungGrp is 776
Time=2021/06/06 11:07:39 | Lag for topic = baeldungTopic, partition = 0, groupId =baeldungGrp is 1159
Time=2021/06/06 11:07:44 | Lag for topic = baeldungTopic, partition = 0, groupId =baeldungGrp is 1559
Time=2021/06/06 11:07:49 | Lag for topic = baeldungTopic, partition = 0, groupId =baeldungGrp is 2015
Time=2021/06/06 11:07:54 | Lag for topic = baeldungTopic, partition = 0, groupId =baeldungGrp is 1231
Time=2021/06/06 11:07:59 | Lag for topic = baeldungTopic, partition = 0, groupId =baeldungGrp is 731
Time=2021/06/06 11:08:04 | Lag for topic = baeldungTopic, partition = 0, groupId =baeldungGrp is 231
Time=2021/06/06 11:08:09 | Lag for topic = baeldungTopic, partition = 0, groupId =baeldungGrp is 0
```

如上所述，生产者生成消息的速率为每毫秒1条消息，这高于消费者消费消息的速率。因此，**在前30秒内，滞后将开始累积，之后生产者停止生产，因此滞后将逐渐减少到0**。

## 5. 通过Actuator端点监控消费者滞后

对于具有Kafka消费者的Spring Boot应用程序，我们可以使用Micrometer获取消费者滞后指标，并通过actuator端点公开它们。让我们看看如何做到这一点。

### 5.1. 启用Actuator端点

首先，我们需要在项目的_pom.xml_文件中添加_spring-boot-starter-actuator_依赖项：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-actuator``</artifactId>``
    ``<version>``3.2.2.``</version>``
``</dependency>``
```

现在，让我们通过配置_application.properties_文件**启用_/actuator_端点**：

```properties
management.endpoints.web.base-path=/actuator
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=always
```

最后，让我们还设置应用程序的端口为不同于_8080_：

```properties
server.port=8081
```

我们必须注意，Zookeeper进程在端口_8080_上运行一个控制台。因此，如果我们在本地机器上运行Zookeeper，我们必须使用不同的端口为我们的Spring Boot应用程序。

### 5.2. 使用Micrometer配置指标

我们可以使用Micrometer库获取Kafka消费者指标。在本节中，**我们将为Prometheus监控系统公开消费者指标**。

首先，我们必须在项目的_pom.xml_文件中添加_micrometer-registry-prometheus_依赖项：

```xml
``<dependency>``
    ``<groupId>``io.micrometer``</groupId>``
    ``<artifactId>``micrometer-registry-prometheus``</artifactId>``
    ``<version>``1.12.2``</version>``
``</dependency>``
```

接下来，让我们为我们的应用程序启用JMX和_/actuator/prometheus_端点：

```properties
management.endpoint.prometheus.enabled=true
spring.jmx.enabled=false
```

继续，让我们将_MeterRegistry_类的实例作为成员添加到_KafkaConsumerConfig_类中：

```java
@Autowired
private MeterRegistry meterRegistry;
```

最后，我们准备**将_MicrometerConsumerListener_添加到_consumerFactory_ bean中**：

```java
@Bean
public ConsumerFactory```````````<String, String>``````````` consumerFactory() {
    Map```<String, Object>``` props = getConsumerConfig(this.groupId);
    DefaultKafkaConsumerFactory```````````<String, String>``````````` consumerFactory = new DefaultKafkaConsumerFactory<>(props);
    consumerFactory.addListener(new MicrometerConsumerListener<>(this.meterRegistry));
    return consumerFactory;
}
```

就是这样！我们准备好运行应用程序并监控Kafka消费者指标。

### 5.3. 监控消费者滞后指标

我们可以启动应用程序并访问_/actuator/prometheus_端点，以查看_kafka\_consumer\_\*_指标。在其他指标中，**_kafka\_consumer\_fetch\_manager\_records\_lag_指标显示当前的滞后信息**：

```
kafka_consumer_fetch_manager_records_lag{client_id="consumer-baeldungGrp-2",kafka_version="3.3.1",partition="0",spring_id="consumerFactory.consumer-baeldungGrp-2",topic="baeldung",} 21447.0
```

进一步地，让我们编写一个脚本来定期获取滞后并以几乎实时的方式显示当前滞后：

```bash
$ while true; do
curl --silent -XGET http://localhost:8081/actuator/prometheus | \
awk '/kafka_consumer_fetch_manager_records_lag{/{print "Current lag is:",$2}';
sleep 5;
done
Current lag is: 11375.0
Current lag is: 10875.0
Current lag is: 10375.0
Current lag is: 9875.0
```

太好了！我们已成功集成了Kafka消费者指标，并通过actuator端点公开了它们。

## 6. 结论

在本教程中，我们开发了如何查找Kafka主题上消费者滞后的理解。此外，我们利用这些知识创建了一个**_LagAnalyzer_应用程序，几乎实时显示滞后**。

如常，教程的完整源代码可在GitHub上获取。
OK