---
date: 2024-06-24
category:
  - Spring Boot
  - Kafka
tag:
  - Spring-Kafka
  - Deserialization
head:
  - - meta
    - name: keywords
      content: Spring-Kafka, Deserialization, Error Handling
---
# 如何在Spring-Kafka中捕获反序列化错误？

无论你是刚开始学习还是拥有多年的经验，Spring Boot显然是构建Web应用程序的绝佳选择。Jmix建立在这个功能强大且成熟的Boot堆栈之上，允许开发人员构建并交付全栈Web应用程序，而无需编写前端代码。非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。

具体来说，Jmix平台包括一个构建在Spring Boot、JPA和Vaadin之上的框架，并附带Jmix Studio，这是一个IntelliJ IDEA插件，配备了一套开发人员生产力工具。

平台提供了相互连接的即用型插件，用于报告生成、BPM、地图、从数据库即时生成Web应用程序等： 

> 成为一个高效的全栈开发人员与Jmix

现在，随着新版本的《REST With Spring - "REST With Spring Boot"》终于发布，当前价格将在本周五之前可用，之后将永久增加50美元。

> 立即获取访问权限

## 1. 概述

在本文中，我们将学习Spring-Kafka的_RecordDeserializationException_。之后，我们将创建一个自定义错误处理程序来捕获此异常，并跳过无效消息，允许消费者继续处理下一个事件。

本文依赖于Spring Boot的Kafka模块，这些模块提供了与代理交互的便捷工具。为了更深入地理解Kafka的内部结构，我们可以回顾平台的基本概念。

## 2. 创建Kafka监听器

**对于本文中的代码示例，我们将使用一个小型应用程序，它监听主题“baeldung.articles.published”并处理传入的消息。为了展示自定义错误处理，我们的应用程序在遇到反序列化异常后应该继续消费消息。**

Spring-Kafka的版本将由父Spring Boot pom自动解析。因此，我们只需要添加模块依赖项：

```
`<dependency>`
    `<groupId>`org.springframework.kafka`</groupId>`
    `<artifactId>`spring-kafka`</artifactId>`
`</dependency>`
```

这个模块使我们能够使用@KafkaListener注解，这是Kafka的Consumer API的抽象。让我们利用这个注解来创建ArticlesPublishedListener组件。此外，我们将引入另一个组件EmailService，它将为每个传入的消息执行操作：

```
@Component
class ArticlesPublishedListener {
    private final EmailService emailService;

    // 构造函数

    @KafkaListener(topics = "baeldung.articles.published")
    public void onArticlePublished(ArticlePublishedEvent event) {
        emailService.sendNewsletter(event.article());
    }
}

record ArticlePublishedEvent(String article) { }
```

对于消费者配置，我们将只关注对我们示例至关重要的属性。当我们开发生产应用程序时，我们可以调整这些属性以适应我们的特定需求或将它们外部化到单独的配置文件中：

```
@Bean
ConsumerFactory```````<String, ArticlePublishedEvent>``````` consumerFactory(
  @Value("${spring.kafka.bootstrap-servers}") String bootstrapServers
) {
    Map`<String, Object>` props = new HashMap<>();
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
    props.put(ConsumerConfig.GROUP_ID_CONFIG, "baeldung-app-1");
    props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
    return new DefaultKafkaConsumerFactory<>(
      props,
      new StringDeserializer(),
      new JsonDeserializer<>(ArticlePublishedEvent.class)
    );
}

@Bean
KafkaListenerContainerFactory```````<String, ArticlePublishedEvent>``````` kafkaListenerContainerFactory(
  ConsumerFactory```````<String, ArticlePublishedEvent>``````` consumerFactory
) {
    var factory = new ConcurrentKafkaListenerContainerFactory```````<String, ArticlePublishedEvent>```````();
    factory.setConsumerFactory(consumerFactory);
    return factory;
}
```

## 3. 设置测试环境

**要设置我们的测试环境，我们可以利用Kafka Testcontainer，它将无缝启动一个Kafka Docker容器进行测试：**

```
@Testcontainers
@SpringBootTest(classes = Application.class)
class DeserializationExceptionLiveTest {

    @Container
    private static KafkaContainer KAFKA = new KafkaContainer(DockerImageName.parse("confluentinc/cp-kafka:latest"));

    @DynamicPropertySource
    static void setProps(DynamicPropertyRegistry registry) {
        registry.add("spring.kafka.bootstrap-servers", KAFKA::getBootstrapServers);
    }

    // ...
}
```

**除此之外，我们将需要一个_KafkaProducer_和一个_EmailService_来验证我们的监听器的功能。这些组件将向我们的监听器发送消息并验证它们的准确处理。** 为了简化测试并避免模拟，让我们将所有传入的文章保留在内存中的列表中，并稍后使用getter访问它们：

```
@Service
class EmailService {
    private final List`<String>` articles = new ArrayList<>();

    // logger, getter

    public void sendNewsletter(String article) {
        log.info("Sending newsletter for article: " + article);
        articles.add(article);
    }
}
```

结果，我们只需要将_EmailService_注入到我们的测试类中。让我们继续创建_testKafkaProducer_：

```
@Autowired
EmailService emailService;

static KafkaProducer`<String, String>` testKafkaProducer;

@BeforeAll
static void beforeAll() {
    Properties props = new Properties();
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA.getBootstrapServers());
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
    testKafkaProducer = new KafkaProducer<>(props);
}
```

有了这个设置，我们已经可以测试快乐流程。让我们发布两篇带有有效JSON的文章，并验证我们的应用程序是否成功调用了_emailService_：

```
@Test
void whenPublishingValidArticleEvent_thenProcessWithoutErrors() {
    publishArticle("{ \"article\": \"Kotlin for Java Developers\" }");
    publishArticle("{ \"article\": \"The S.O.L.I.D. Principles\" }");

    await().untilAsserted(() ->
      assertThat(emailService.getArticles())
        .containsExactlyInAnyOrder(
          "Kotlin for Java Developers",
          "The S.O.L.I.D. Principles"
        ));
}
```

## 4. 引发_RecordDeserializationException_

**如果配置的反序列化器不能正确解析消息的键或值，Kafka就会抛出_RecordDeserializationException_。为了重现这个错误，我们只需要发布一个包含无效JSON体的消息：**

```
@Test
void whenPublishingInvalidArticleEvent_thenCatchExceptionAndContinueProcessing() {
    publishArticle("{ \"article\": \"Introduction to Kafka\" }");
    publishArticle(" !! Invalid JSON !! ");
    publishArticle("{ \"article\": \"Kafka Streams Tutorial\" }");

    await().untilAsserted(() ->
      assertThat(emailService.getArticles())
        .containsExactlyInAnyOrder(
          "Kotlin for Java Developers",
          "The S.O.L.I.D. Principles"
        ));
}
```

如果我们运行这个测试并检查控制台，我们会观察到一个重复出现的错误被记录：

```
ERROR 7716 --- [ntainer#0-0-C-1] o.s.k.l.KafkaMessageListenerContainer    : Consumer exception

java.lang.IllegalStateException: This error handler cannot process 'SerializationException's directly; please consider configuring an 'ErrorHandlingDeserializer' in the value and/or key deserializer
   at org.springframework.kafka.listener.DefaultErrorHandler.handleOtherException(DefaultErrorHandler.java:151) ~[spring-kafka-2.8.11.jar:2.8.11]
   at org.springframework.kafka.listener.KafkaMessageListenerContainer$ListenerConsumer.handleConsumerException(KafkaMessageListenerContainer.java:1815) ~[spring-kafka-2.8.11.jar:2.8.11]
   ...
Caused by: org.apache.kafka.common.errors.RecordDeserializationException: Error deserializing key/value for partition baeldung.articles.published-0 at offset 1. If needed, please seek past the record to continue consumption.
   at org.apache.kafka.clients.consumer.internals.Fetcher.parseRecord(Fetcher.java:1448) ~[kafka-clients-3.1.2.jar:na]
   ...
Caused by: org.apache.kafka.common.errors.SerializationException: Can't deserialize data [[32, 33, 33, 32, 73, 110, 118, 97, 108, 105, 100, 32, 74, 83, 79, 78, 32, 33, 33, 32]] from topic [baeldung.articles.published]
   at org.springframework.kafka.support.serializer.JsonDeserializer.deserialize(JsonDeserializer.java:588) ~[spring-kafka-2.8.11.jar:2.8.11]
   ...
Caused by: com.fasterxml.jackson.core.JsonParseException: Unexpected character ('!' (code 33)): expected a valid value (JSON String, Number, Array, Object or token 'null', 'true' or 'false')
   at[Source: (byte[])" !! Invalid JSON !! "; line: 1, column: 3]
at com.fasterxml.jackson.core.JsonParser._constructError(JsonParser.java:2391) ~[jackson-core-2.13.5.jar:2.13.5]
...

```

然后，测试最终会超时并失败。如果我们检查断言错误，我们会注意到只有第一个消息被成功处理：

```
org.awaitility.core.ConditionTimeoutException: Assertion condition
Expecting actual:
  ["Introduction to Kafka"]
to contain exactly in any order:
  ["Introduction to Kafka", "Kafka Streams Tutorial"]
but could not find the following elements:
  ["Kafka Streams Tutorial"]
 within 5 seconds.
```

正如预期的那样，第二个消息的反序列化失败了。因此，监听器继续尝试消费相同的消息，导致错误重复发生。

## 5. 创建错误处理程序

如果我们仔细分析失败日志，我们会注意到两个建议：

- 考虑配置一个‘_ErrorHandlingDeserializer_’；
- 如果需要，请寻求记录以继续消费；

**换句话说，我们可以创建一个自定义错误处理程序，它将处理反序列化异常并增加消费者偏移量。这将允许我们跳过无效消息并继续消费。**

### 5.1. 实现_CommonErrorHandler_

要实现_CommonErrorHandler_接口，我们必须覆盖两个没有默认实现的公共方法：

- _handleOne()_ - 被调用以处理单个失败的记录；
- _handleOtherException()_ - 当抛出异常时被调用，但不是针对特定记录；

我们可以使用类似的方法处理这两种情况。让我们首先捕获异常并记录错误消息：

```
class KafkaErrorHandler implements CommonErrorHandler {

    @Override
    public void handleOne(Exception exception, ConsumerRecord`````<?, ?>````` record, Consumer`````<?, ?>````` consumer, MessageListenerContainer container) {
        handle(exception, consumer);
    }

    @Override
    public void handleOtherException(Exception exception, Consumer`````<?, ?>````` consumer, MessageListenerContainer container, boolean batchListener) {
        handle(exception, consumer);
    }

    private void handle(Exception exception, Consumer`````<?, ?>````` consumer) {
        log.error("Exception thrown", exception);
        // ...
    }
}
```

### 5.2. Kafka消费者的_seek()和_commitSync()

**我们可以使用_Consumer_接口中的_seek()_方法手动更改特定主题中特定分区的当前偏移位置。** 简单来说，我们可以根据需要基于它们的偏移量重新处理或跳过消息。

在我们的情况下，如果异常是_RecordDeserializationException_的实例，我们将使用主题分区和下一个偏移量调用_seek()_方法：

```
void handle(Exception exception, Consumer`````<?, ?>````` consumer) {
    log.error("Exception thrown", exception);
    if (exception instanceof RecordDeserializationException ex) {
        consumer.seek(ex.topicPartition(), ex.offset() + 1L);
        consumer.commitSync();
    } else {
        log.error("Exception not handled", exception);
    }
}
```

**正如我们所注意到的，我们需要调用_Consumer_接口中的_commitSync()_。这将提交偏移量，并确保新位置被Kafka代理确认并持久化。** 这一步至关重要，因为它更新了消费者组提交的偏移量，表明直到调整位置的消息已成功处理。

### 5.3. 更新配置

**最后，我们需要将自定义错误处理程序添加到我们的消费者配置中。** 让我们首先将其声明为_@Bean_：

```
@Bean
CommonErrorHandler commonErrorHandler() {
    return new KafkaErrorHandler();
}
```

之后，我们将使用其专用的setter将新bean添加到_ConcurrentKafkaListenerContainerFactory_：

```
@Bean
ConcurrentKafkaListenerContainerFactory```````<String, ArticlePublishedEvent>``````` kafkaListenerContainerFactory(
  ConsumerFactory```````<String, ArticlePublishedEvent>``````` consumerFactory,
  CommonErrorHandler commonErrorHandler
) {
    var factory = new ConcurrentKafkaListenerContainerFactory```````<String, ArticlePublishedEvent>```````();
    factory.setConsumerFactory(consumerFactory);
    factory.setCommonErrorHandler(commonErrorHandler);
    return factory;
}
```

就是这样！我们现在可以重新运行测试，并期望监听器跳过无效消息并继续消费消息。

## 6. 结论

在本文中，我们讨论了Spring Kafka的_RecordDeserializationException_，并发现，如果不正确处理，它可以阻止给定分区的消费者组。

随后，我们深入研究了Kafka的_CommonErrorHandler_接口，并实现了它，使我们的监听器能够在继续处理消息的同时处理反序列化失败。我们利用了消费者API的方法，即_seek()_和_commitSync()_，通过相应地调整消费者偏移量来绕过无效消息。

如往常一样，本文的源代码可在GitHub上获得。
```

OK