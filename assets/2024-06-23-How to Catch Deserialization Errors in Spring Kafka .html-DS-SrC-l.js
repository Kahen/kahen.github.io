import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a}from"./app-BwPf26Y_.js";const r={},t=a(`<h1 id="如何在spring-kafka中捕获反序列化错误" tabindex="-1"><a class="header-anchor" href="#如何在spring-kafka中捕获反序列化错误"><span>如何在Spring-Kafka中捕获反序列化错误？</span></a></h1><p>无论你是刚开始学习还是拥有多年的经验，Spring Boot显然是构建Web应用程序的绝佳选择。Jmix建立在这个功能强大且成熟的Boot堆栈之上，允许开发人员构建并交付全栈Web应用程序，而无需编写前端代码。非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。</p><p>具体来说，Jmix平台包括一个构建在Spring Boot、JPA和Vaadin之上的框架，并附带Jmix Studio，这是一个IntelliJ IDEA插件，配备了一套开发人员生产力工具。</p><p>平台提供了相互连接的即用型插件，用于报告生成、BPM、地图、从数据库即时生成Web应用程序等：</p><blockquote><p>成为一个高效的全栈开发人员与Jmix</p></blockquote><p>现在，随着新版本的《REST With Spring - &quot;REST With Spring Boot&quot;》终于发布，当前价格将在本周五之前可用，之后将永久增加50美元。</p><blockquote><p>立即获取访问权限</p></blockquote><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本文中，我们将学习Spring-Kafka的_RecordDeserializationException_。之后，我们将创建一个自定义错误处理程序来捕获此异常，并跳过无效消息，允许消费者继续处理下一个事件。</p><p>本文依赖于Spring Boot的Kafka模块，这些模块提供了与代理交互的便捷工具。为了更深入地理解Kafka的内部结构，我们可以回顾平台的基本概念。</p><h2 id="_2-创建kafka监听器" tabindex="-1"><a class="header-anchor" href="#_2-创建kafka监听器"><span>2. 创建Kafka监听器</span></a></h2><p><strong>对于本文中的代码示例，我们将使用一个小型应用程序，它监听主题“baeldung.articles.published”并处理传入的消息。为了展示自定义错误处理，我们的应用程序在遇到反序列化异常后应该继续消费消息。</strong></p><p>Spring-Kafka的版本将由父Spring Boot pom自动解析。因此，我们只需要添加模块依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.springframework.kafka\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`spring-kafka\`&lt;/artifactId&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个模块使我们能够使用@KafkaListener注解，这是Kafka的Consumer API的抽象。让我们利用这个注解来创建ArticlesPublishedListener组件。此外，我们将引入另一个组件EmailService，它将为每个传入的消息执行操作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Component
class ArticlesPublishedListener {
    private final EmailService emailService;

    // 构造函数

    @KafkaListener(topics = &quot;baeldung.articles.published&quot;)
    public void onArticlePublished(ArticlePublishedEvent event) {
        emailService.sendNewsletter(event.article());
    }
}

record ArticlePublishedEvent(String article) { }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于消费者配置，我们将只关注对我们示例至关重要的属性。当我们开发生产应用程序时，我们可以调整这些属性以适应我们的特定需求或将它们外部化到单独的配置文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
ConsumerFactory\`\`\`\`\`\`\`&lt;String, ArticlePublishedEvent&gt;\`\`\`\`\`\`\` consumerFactory(
  @Value(&quot;\${spring.kafka.bootstrap-servers}&quot;) String bootstrapServers
) {
    Map\`&lt;String, Object&gt;\` props = new HashMap&lt;&gt;();
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
    props.put(ConsumerConfig.GROUP_ID_CONFIG, &quot;baeldung-app-1&quot;);
    props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, &quot;earliest&quot;);
    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
    return new DefaultKafkaConsumerFactory&lt;&gt;(
      props,
      new StringDeserializer(),
      new JsonDeserializer&lt;&gt;(ArticlePublishedEvent.class)
    );
}

@Bean
KafkaListenerContainerFactory\`\`\`\`\`\`\`&lt;String, ArticlePublishedEvent&gt;\`\`\`\`\`\`\` kafkaListenerContainerFactory(
  ConsumerFactory\`\`\`\`\`\`\`&lt;String, ArticlePublishedEvent&gt;\`\`\`\`\`\`\` consumerFactory
) {
    var factory = new ConcurrentKafkaListenerContainerFactory\`\`\`\`\`\`\`&lt;String, ArticlePublishedEvent&gt;\`\`\`\`\`\`\`();
    factory.setConsumerFactory(consumerFactory);
    return factory;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-设置测试环境" tabindex="-1"><a class="header-anchor" href="#_3-设置测试环境"><span>3. 设置测试环境</span></a></h2><p><strong>要设置我们的测试环境，我们可以利用Kafka Testcontainer，它将无缝启动一个Kafka Docker容器进行测试：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Testcontainers
@SpringBootTest(classes = Application.class)
class DeserializationExceptionLiveTest {

    @Container
    private static KafkaContainer KAFKA = new KafkaContainer(DockerImageName.parse(&quot;confluentinc/cp-kafka:latest&quot;));

    @DynamicPropertySource
    static void setProps(DynamicPropertyRegistry registry) {
        registry.add(&quot;spring.kafka.bootstrap-servers&quot;, KAFKA::getBootstrapServers);
    }

    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>除此之外，我们将需要一个_KafkaProducer_和一个_EmailService_来验证我们的监听器的功能。这些组件将向我们的监听器发送消息并验证它们的准确处理。</strong> 为了简化测试并避免模拟，让我们将所有传入的文章保留在内存中的列表中，并稍后使用getter访问它们：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Service
class EmailService {
    private final List\`&lt;String&gt;\` articles = new ArrayList&lt;&gt;();

    // logger, getter

    public void sendNewsletter(String article) {
        log.info(&quot;Sending newsletter for article: &quot; + article);
        articles.add(article);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，我们只需要将_EmailService_注入到我们的测试类中。让我们继续创建_testKafkaProducer_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Autowired
EmailService emailService;

static KafkaProducer\`&lt;String, String&gt;\` testKafkaProducer;

@BeforeAll
static void beforeAll() {
    Properties props = new Properties();
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA.getBootstrapServers());
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
    testKafkaProducer = new KafkaProducer&lt;&gt;(props);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个设置，我们已经可以测试快乐流程。让我们发布两篇带有有效JSON的文章，并验证我们的应用程序是否成功调用了_emailService_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenPublishingValidArticleEvent_thenProcessWithoutErrors() {
    publishArticle(&quot;{ \\&quot;article\\&quot;: \\&quot;Kotlin for Java Developers\\&quot; }&quot;);
    publishArticle(&quot;{ \\&quot;article\\&quot;: \\&quot;The S.O.L.I.D. Principles\\&quot; }&quot;);

    await().untilAsserted(() -&gt;
      assertThat(emailService.getArticles())
        .containsExactlyInAnyOrder(
          &quot;Kotlin for Java Developers&quot;,
          &quot;The S.O.L.I.D. Principles&quot;
        ));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-引发-recorddeserializationexception" tabindex="-1"><a class="header-anchor" href="#_4-引发-recorddeserializationexception"><span>4. 引发_RecordDeserializationException_</span></a></h2><p><strong>如果配置的反序列化器不能正确解析消息的键或值，Kafka就会抛出_RecordDeserializationException_。为了重现这个错误，我们只需要发布一个包含无效JSON体的消息：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void whenPublishingInvalidArticleEvent_thenCatchExceptionAndContinueProcessing() {
    publishArticle(&quot;{ \\&quot;article\\&quot;: \\&quot;Introduction to Kafka\\&quot; }&quot;);
    publishArticle(&quot; !! Invalid JSON !! &quot;);
    publishArticle(&quot;{ \\&quot;article\\&quot;: \\&quot;Kafka Streams Tutorial\\&quot; }&quot;);

    await().untilAsserted(() -&gt;
      assertThat(emailService.getArticles())
        .containsExactlyInAnyOrder(
          &quot;Kotlin for Java Developers&quot;,
          &quot;The S.O.L.I.D. Principles&quot;
        ));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行这个测试并检查控制台，我们会观察到一个重复出现的错误被记录：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ERROR 7716 --- [ntainer#0-0-C-1] o.s.k.l.KafkaMessageListenerContainer    : Consumer exception

java.lang.IllegalStateException: This error handler cannot process &#39;SerializationException&#39;s directly; please consider configuring an &#39;ErrorHandlingDeserializer&#39; in the value and/or key deserializer
   at org.springframework.kafka.listener.DefaultErrorHandler.handleOtherException(DefaultErrorHandler.java:151) ~[spring-kafka-2.8.11.jar:2.8.11]
   at org.springframework.kafka.listener.KafkaMessageListenerContainer$ListenerConsumer.handleConsumerException(KafkaMessageListenerContainer.java:1815) ~[spring-kafka-2.8.11.jar:2.8.11]
   ...
Caused by: org.apache.kafka.common.errors.RecordDeserializationException: Error deserializing key/value for partition baeldung.articles.published-0 at offset 1. If needed, please seek past the record to continue consumption.
   at org.apache.kafka.clients.consumer.internals.Fetcher.parseRecord(Fetcher.java:1448) ~[kafka-clients-3.1.2.jar:na]
   ...
Caused by: org.apache.kafka.common.errors.SerializationException: Can&#39;t deserialize data [[32, 33, 33, 32, 73, 110, 118, 97, 108, 105, 100, 32, 74, 83, 79, 78, 32, 33, 33, 32]] from topic [baeldung.articles.published]
   at org.springframework.kafka.support.serializer.JsonDeserializer.deserialize(JsonDeserializer.java:588) ~[spring-kafka-2.8.11.jar:2.8.11]
   ...
Caused by: com.fasterxml.jackson.core.JsonParseException: Unexpected character (&#39;!&#39; (code 33)): expected a valid value (JSON String, Number, Array, Object or token &#39;null&#39;, &#39;true&#39; or &#39;false&#39;)
   at[Source: (byte[])&quot; !! Invalid JSON !! &quot;; line: 1, column: 3]
at com.fasterxml.jackson.core.JsonParser._constructError(JsonParser.java:2391) ~[jackson-core-2.13.5.jar:2.13.5]
...

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，测试最终会超时并失败。如果我们检查断言错误，我们会注意到只有第一个消息被成功处理：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>org.awaitility.core.ConditionTimeoutException: Assertion condition
Expecting actual:
  [&quot;Introduction to Kafka&quot;]
to contain exactly in any order:
  [&quot;Introduction to Kafka&quot;, &quot;Kafka Streams Tutorial&quot;]
but could not find the following elements:
  [&quot;Kafka Streams Tutorial&quot;]
 within 5 seconds.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，第二个消息的反序列化失败了。因此，监听器继续尝试消费相同的消息，导致错误重复发生。</p><h2 id="_5-创建错误处理程序" tabindex="-1"><a class="header-anchor" href="#_5-创建错误处理程序"><span>5. 创建错误处理程序</span></a></h2><p>如果我们仔细分析失败日志，我们会注意到两个建议：</p><ul><li>考虑配置一个‘<em>ErrorHandlingDeserializer</em>’；</li><li>如果需要，请寻求记录以继续消费；</li></ul><p><strong>换句话说，我们可以创建一个自定义错误处理程序，它将处理反序列化异常并增加消费者偏移量。这将允许我们跳过无效消息并继续消费。</strong></p><h3 id="_5-1-实现-commonerrorhandler" tabindex="-1"><a class="header-anchor" href="#_5-1-实现-commonerrorhandler"><span>5.1. 实现_CommonErrorHandler_</span></a></h3><p>要实现_CommonErrorHandler_接口，我们必须覆盖两个没有默认实现的公共方法：</p><ul><li><em>handleOne()</em> - 被调用以处理单个失败的记录；</li><li><em>handleOtherException()</em> - 当抛出异常时被调用，但不是针对特定记录；</li></ul><p>我们可以使用类似的方法处理这两种情况。让我们首先捕获异常并记录错误消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class KafkaErrorHandler implements CommonErrorHandler {

    @Override
    public void handleOne(Exception exception, ConsumerRecord\`\`\`\`\`&lt;?, ?&gt;\`\`\`\`\` record, Consumer\`\`\`\`\`&lt;?, ?&gt;\`\`\`\`\` consumer, MessageListenerContainer container) {
        handle(exception, consumer);
    }

    @Override
    public void handleOtherException(Exception exception, Consumer\`\`\`\`\`&lt;?, ?&gt;\`\`\`\`\` consumer, MessageListenerContainer container, boolean batchListener) {
        handle(exception, consumer);
    }

    private void handle(Exception exception, Consumer\`\`\`\`\`&lt;?, ?&gt;\`\`\`\`\` consumer) {
        log.error(&quot;Exception thrown&quot;, exception);
        // ...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-kafka消费者的-seek-和-commitsync" tabindex="-1"><a class="header-anchor" href="#_5-2-kafka消费者的-seek-和-commitsync"><span>5.2. Kafka消费者的_seek()和_commitSync()</span></a></h3><p><strong>我们可以使用_Consumer_接口中的_seek()_方法手动更改特定主题中特定分区的当前偏移位置。</strong> 简单来说，我们可以根据需要基于它们的偏移量重新处理或跳过消息。</p><p>在我们的情况下，如果异常是_RecordDeserializationException_的实例，我们将使用主题分区和下一个偏移量调用_seek()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void handle(Exception exception, Consumer\`\`\`\`\`&lt;?, ?&gt;\`\`\`\`\` consumer) {
    log.error(&quot;Exception thrown&quot;, exception);
    if (exception instanceof RecordDeserializationException ex) {
        consumer.seek(ex.topicPartition(), ex.offset() + 1L);
        consumer.commitSync();
    } else {
        log.error(&quot;Exception not handled&quot;, exception);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正如我们所注意到的，我们需要调用_Consumer_接口中的_commitSync()_。这将提交偏移量，并确保新位置被Kafka代理确认并持久化。</strong> 这一步至关重要，因为它更新了消费者组提交的偏移量，表明直到调整位置的消息已成功处理。</p><h3 id="_5-3-更新配置" tabindex="-1"><a class="header-anchor" href="#_5-3-更新配置"><span>5.3. 更新配置</span></a></h3><p><strong>最后，我们需要将自定义错误处理程序添加到我们的消费者配置中。</strong> 让我们首先将其声明为_@Bean_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
CommonErrorHandler commonErrorHandler() {
    return new KafkaErrorHandler();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们将使用其专用的setter将新bean添加到_ConcurrentKafkaListenerContainerFactory_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
ConcurrentKafkaListenerContainerFactory\`\`\`\`\`\`\`&lt;String, ArticlePublishedEvent&gt;\`\`\`\`\`\`\` kafkaListenerContainerFactory(
  ConsumerFactory\`\`\`\`\`\`\`&lt;String, ArticlePublishedEvent&gt;\`\`\`\`\`\`\` consumerFactory,
  CommonErrorHandler commonErrorHandler
) {
    var factory = new ConcurrentKafkaListenerContainerFactory\`\`\`\`\`\`\`&lt;String, ArticlePublishedEvent&gt;\`\`\`\`\`\`\`();
    factory.setConsumerFactory(consumerFactory);
    factory.setCommonErrorHandler(commonErrorHandler);
    return factory;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就是这样！我们现在可以重新运行测试，并期望监听器跳过无效消息并继续消费消息。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了Spring Kafka的_RecordDeserializationException_，并发现，如果不正确处理，它可以阻止给定分区的消费者组。</p><p>随后，我们深入研究了Kafka的_CommonErrorHandler_接口，并实现了它，使我们的监听器能够在继续处理消息的同时处理反序列化失败。我们利用了消费者API的方法，即_seek()<em>和_commitSync()</em>，通过相应地调整消费者偏移量来绕过无效消息。</p><p>如往常一样，本文的源代码可在GitHub上获得。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
OK</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,60),s=[t];function l(d,o){return n(),i("div",null,s)}const v=e(r,[["render",l],["__file","2024-06-23-How to Catch Deserialization Errors in Spring Kafka .html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-23/2024-06-23-How%20to%20Catch%20Deserialization%20Errors%20in%20Spring%20Kafka%20.html","title":"如何在Spring-Kafka中捕获反序列化错误？","lang":"zh-CN","frontmatter":{"date":"2024-06-24T00:00:00.000Z","category":["Spring Boot","Kafka"],"tag":["Spring-Kafka","Deserialization"],"head":[["meta",{"name":"keywords","content":"Spring-Kafka, Deserialization, Error Handling"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-23/2024-06-23-How%20to%20Catch%20Deserialization%20Errors%20in%20Spring%20Kafka%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Spring-Kafka中捕获反序列化错误？"}],["meta",{"property":"og:description","content":"如何在Spring-Kafka中捕获反序列化错误？ 无论你是刚开始学习还是拥有多年的经验，Spring Boot显然是构建Web应用程序的绝佳选择。Jmix建立在这个功能强大且成熟的Boot堆栈之上，允许开发人员构建并交付全栈Web应用程序，而无需编写前端代码。非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。 具体来说，Jmix..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-23T19:51:35.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring-Kafka"}],["meta",{"property":"article:tag","content":"Deserialization"}],["meta",{"property":"article:published_time","content":"2024-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-23T19:51:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Spring-Kafka中捕获反序列化错误？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-23T19:51:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Spring-Kafka中捕获反序列化错误？ 无论你是刚开始学习还是拥有多年的经验，Spring Boot显然是构建Web应用程序的绝佳选择。Jmix建立在这个功能强大且成熟的Boot堆栈之上，允许开发人员构建并交付全栈Web应用程序，而无需编写前端代码。非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。 具体来说，Jmix..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 创建Kafka监听器","slug":"_2-创建kafka监听器","link":"#_2-创建kafka监听器","children":[]},{"level":2,"title":"3. 设置测试环境","slug":"_3-设置测试环境","link":"#_3-设置测试环境","children":[]},{"level":2,"title":"4. 引发_RecordDeserializationException_","slug":"_4-引发-recorddeserializationexception","link":"#_4-引发-recorddeserializationexception","children":[]},{"level":2,"title":"5. 创建错误处理程序","slug":"_5-创建错误处理程序","link":"#_5-创建错误处理程序","children":[{"level":3,"title":"5.1. 实现_CommonErrorHandler_","slug":"_5-1-实现-commonerrorhandler","link":"#_5-1-实现-commonerrorhandler","children":[]},{"level":3,"title":"5.2. Kafka消费者的_seek()和_commitSync()","slug":"_5-2-kafka消费者的-seek-和-commitsync","link":"#_5-2-kafka消费者的-seek-和-commitsync","children":[]},{"level":3,"title":"5.3. 更新配置","slug":"_5-3-更新配置","link":"#_5-3-更新配置","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719172295000,"updatedTime":1719172295000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.4,"words":2221},"filePathRelative":"posts/baeldung/2024-06-23/2024-06-23-How to Catch Deserialization Errors in Spring Kafka .md","localizedDate":"2024年6月24日","excerpt":"\\n<p>无论你是刚开始学习还是拥有多年的经验，Spring Boot显然是构建Web应用程序的绝佳选择。Jmix建立在这个功能强大且成熟的Boot堆栈之上，允许开发人员构建并交付全栈Web应用程序，而无需编写前端代码。非常灵活，从简单的Web GUI CRUD应用程序到复杂的企业解决方案。</p>\\n<p>具体来说，Jmix平台包括一个构建在Spring Boot、JPA和Vaadin之上的框架，并附带Jmix Studio，这是一个IntelliJ IDEA插件，配备了一套开发人员生产力工具。</p>\\n<p>平台提供了相互连接的即用型插件，用于报告生成、BPM、地图、从数据库即时生成Web应用程序等：</p>","autoDesc":true}');export{v as comp,m as data};
