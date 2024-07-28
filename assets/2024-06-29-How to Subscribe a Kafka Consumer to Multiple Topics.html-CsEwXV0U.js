import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-D4B8YWfq.js";const i={},s=n('<h1 id="如何订阅kafka消费者到多个主题-baeldung" tabindex="-1"><a class="header-anchor" href="#如何订阅kafka消费者到多个主题-baeldung"><span>如何订阅Kafka消费者到多个主题 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习如何订阅Kafka消费者到多个主题。当相同的业务逻辑用于不同的主题时，这是一个常见的需求。</p><h2 id="_2-创建模型类" tabindex="-1"><a class="header-anchor" href="#_2-创建模型类"><span>2. 创建模型类</span></a></h2><p>我们将考虑一个简单的支付系统，有两个Kafka主题，一个用于信用卡支付，另一个用于银行转账。让我们创建模型类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class PaymentData {\n    private String paymentReference;\n    private String type;\n    private BigDecimal amount;\n    private Currency currency;\n\n    // 标准getter和setter\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将讨论的第一种方法使用Kafka消费者API。让我们添加所需的Maven依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.apache.kafka```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```kafka-clients```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```3.5.1```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们也配置Kafka消费者：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Properties properties = new Properties();\nproperties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA_CONTAINER.getBootstrapServers());\nproperties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());\nproperties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());\nproperties.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, &quot;earliest&quot;);\nproperties.put(ConsumerConfig.GROUP_ID_CONFIG, &quot;payments&quot;);\nkafkaConsumer = new KafkaConsumer&lt;&gt;(properties);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在消费消息之前，我们需要使用_subscribe()_方法订阅_kafkaConsumer_到两个主题：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>kafkaConsumer.subscribe(Arrays.asList(&quot;card-payments&quot;, &quot;bank-transfers&quot;));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们现在准备好测试我们的配置。让我们在每个主题上发布一条消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void publishMessages() throws Exception {\n    ProducerRecord```&lt;String, String&gt;``` cardPayment = new ProducerRecord&lt;&gt;(&quot;card-payments&quot;,\n      &quot;{\\&quot;paymentReference\\&quot;:\\&quot;A184028KM0013790\\&quot;, \\&quot;type\\&quot;:\\&quot;card\\&quot;, \\&quot;amount\\&quot;:\\&quot;275\\&quot;, \\&quot;currency\\&quot;:\\&quot;GBP\\&quot;}&quot;);\n    kafkaProducer.send(cardPayment).get();\n\n    ProducerRecord```&lt;String, String&gt;``` bankTransfer = new ProducerRecord&lt;&gt;(&quot;bank-transfers&quot;,\n      &quot;{\\&quot;paymentReference\\&quot;:\\&quot;19ae2-18mk73-009\\&quot;, \\&quot;type\\&quot;:\\&quot;bank\\&quot;, \\&quot;amount\\&quot;:\\&quot;150\\&quot;, \\&quot;currency\\&quot;:\\&quot;EUR\\&quot;}&quot;);\n    kafkaProducer.send(bankTransfer).get();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以编写集成测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\nvoid whenSendingMessagesOnTwoTopics_thenConsumerReceivesMessages() throws Exception {\n    publishMessages();\n    kafkaConsumer.subscribe(Arrays.asList(&quot;card-payments&quot;, &quot;bank-transfers&quot;));\n\n    int eventsProcessed = 0;\n    for (ConsumerRecord```&lt;String, String&gt;``` record : kafkaConsumer.poll(Duration.ofSeconds(10))) {\n        log.info(&quot;Event on topic={}, payload={}&quot;, record.topic(), record.value());\n        eventsProcessed++;\n    }\n    assertThat(eventsProcessed).isEqualTo(2);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用spring-kafka订阅多个主题" tabindex="-1"><a class="header-anchor" href="#_4-使用spring-kafka订阅多个主题"><span>4. 使用Spring Kafka订阅多个主题</span></a></h2><p>我们将讨论的第二种方法使用Spring Kafka。</p><p>让我们将_spring-kafka_和_jackson-databind_依赖项添加到我们的_pom.xml_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.springframework.kafka```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```spring-kafka```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```3.1.2```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```com.fasterxml.jackson.core```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```jackson-databind```&lt;/artifactId&gt;```\n    ```&lt;version&gt;```2.15.2```&lt;/version&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们还定义_ConsumerFactory_和_ConcurrentKafkaListenerContainerFactory_ beans：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\npublic ConsumerFactory```&lt;String, PaymentData&gt;``` consumerFactory() {\n    Map`&lt;String, Object&gt;` config = new HashMap&lt;&gt;();\n    config.put(BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);\n    config.put(VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);\n\n    return new DefaultKafkaConsumerFactory&lt;&gt;(\n      config, new StringDeserializer(), new JsonDeserializer&lt;&gt;(PaymentData.class));\n}\n\n@Bean\npublic ConcurrentKafkaListenerContainerFactory```&lt;String, PaymentData&gt;``` containerFactory() {\n    ConcurrentKafkaListenerContainerFactory```&lt;String, PaymentData&gt;``` factory =\n      new ConcurrentKafkaListenerContainerFactory&lt;&gt;();\n    factory.setConsumerFactory(consumerFactory());\n    return factory;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们需要使用_@KafkaListener_注解的_topics_属性订阅两个主题：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@KafkaListener(topics = { &quot;card-payments&quot;, &quot;bank-transfers&quot; }, groupId = &quot;payments&quot;)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们可以创建消费者。此外，我们还包括了Kafka头信息以识别接收到消息的主题：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@KafkaListener(topics = { &quot;card-payments&quot;, &quot;bank-transfers&quot; }, groupId = &quot;payments&quot;)\npublic void handlePaymentEvents(\n  PaymentData paymentData, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {\n    log.info(&quot;Event on topic={}, payload={}&quot;, topic, paymentData);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们验证我们的配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test\npublic void whenSendingMessagesOnTwoTopics_thenConsumerReceivesMessages() throws Exception {\n    CountDownLatch countDownLatch = new CountDownLatch(2);\n    doAnswer(invocation -&gt; {\n        countDownLatch.countDown();\n        return null;\n    }).when(paymentsConsumer)\n      .handlePaymentEvents(any(), any());\n\n    kafkaTemplate.send(&quot;card-payments&quot;, createCardPayment());\n    kafkaTemplate.send(&quot;bank-transfers&quot;, createBankTransfer());\n\n    assertThat(countDownLatch.await(5, TimeUnit.SECONDS)).isTrue();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用kafka-cli订阅多个主题" tabindex="-1"><a class="header-anchor" href="#_5-使用kafka-cli订阅多个主题"><span>5. 使用Kafka CLI订阅多个主题</span></a></h2><p>我们将讨论的最后方法是Kafka CLI。</p><p>首先，让我们在每个主题上发送一条消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic card-payments\n&gt;{&quot;paymentReference&quot;:&quot;A184028KM0013790&quot;, &quot;type&quot;:&quot;card&quot;, &quot;amount&quot;:&quot;275&quot;, &quot;currency&quot;:&quot;GBP&quot;}\n\n$ bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic bank-transfers\n&gt;{&quot;paymentReference&quot;:&quot;19ae2-18mk73-009&quot;, &quot;type&quot;:&quot;bank&quot;, &quot;amount&quot;:&quot;150&quot;, &quot;currency&quot;:&quot;EUR&quot;}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以启动Kafka CLI消费者。<strong>_include_选项允许我们指定要包含的消息消费主题列表：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ bin/kafka-console-consumer.sh --from-beginning --bootstrap-server localhost:9092 --include &quot;card-payments|bank-transfers&quot;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是我们运行上一个命令时的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{&quot;paymentReference&quot;:&quot;A184028KM0013790&quot;, &quot;type&quot;:&quot;card&quot;, &quot;amount&quot;:&quot;275&quot;, &quot;currency&quot;:&quot;GBP&quot;}\n{&quot;paymentReference&quot;:&quot;19ae2-18mk73-009&quot;, &quot;type&quot;:&quot;bank&quot;, &quot;amount&quot;:&quot;150&quot;, &quot;currency&quot;:&quot;EUR&quot;}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了三种不同的方法来订阅Kafka消费者到多个主题。这在为多个主题实现相同的功能时非常有用。</p><p>前两种方法基于Kafka消费者API和Spring Kafka，可以集成到现有应用程序中。最后一种使用Kafka CLI，可以用来快速验证多个主题。</p><p>如往常一样，完整的代码可以在GitHub上找到。</p>',40),r=[s];function d(l,o){return a(),t("div",null,r)}const v=e(i,[["render",d],["__file","2024-06-29-How to Subscribe a Kafka Consumer to Multiple Topics.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-06-29/2024-06-29-How%20to%20Subscribe%20a%20Kafka%20Consumer%20to%20Multiple%20Topics.html","title":"如何订阅Kafka消费者到多个主题 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Kafka","Java"],"tag":["Kafka","Consumer","Java"],"head":[["meta",{"name":"keywords","content":"Kafka, Consumer, Java, Subscription, Multiple Topics"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-29/2024-06-29-How%20to%20Subscribe%20a%20Kafka%20Consumer%20to%20Multiple%20Topics.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何订阅Kafka消费者到多个主题 | Baeldung"}],["meta",{"property":"og:description","content":"如何订阅Kafka消费者到多个主题 | Baeldung 1. 概述 在本教程中，我们将学习如何订阅Kafka消费者到多个主题。当相同的业务逻辑用于不同的主题时，这是一个常见的需求。 2. 创建模型类 我们将考虑一个简单的支付系统，有两个Kafka主题，一个用于信用卡支付，另一个用于银行转账。让我们创建模型类： 我们将讨论的第一种方法使用Kafka消费..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-29T10:52:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"Consumer"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-29T10:52:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何订阅Kafka消费者到多个主题 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-29T10:52:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何订阅Kafka消费者到多个主题 | Baeldung 1. 概述 在本教程中，我们将学习如何订阅Kafka消费者到多个主题。当相同的业务逻辑用于不同的主题时，这是一个常见的需求。 2. 创建模型类 我们将考虑一个简单的支付系统，有两个Kafka主题，一个用于信用卡支付，另一个用于银行转账。让我们创建模型类： 我们将讨论的第一种方法使用Kafka消费..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 创建模型类","slug":"_2-创建模型类","link":"#_2-创建模型类","children":[]},{"level":2,"title":"4. 使用Spring Kafka订阅多个主题","slug":"_4-使用spring-kafka订阅多个主题","link":"#_4-使用spring-kafka订阅多个主题","children":[]},{"level":2,"title":"5. 使用Kafka CLI订阅多个主题","slug":"_5-使用kafka-cli订阅多个主题","link":"#_5-使用kafka-cli订阅多个主题","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719658374000,"updatedTime":1719658374000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.04,"words":911},"filePathRelative":"posts/baeldung/2024-06-29/2024-06-29-How to Subscribe a Kafka Consumer to Multiple Topics.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习如何订阅Kafka消费者到多个主题。当相同的业务逻辑用于不同的主题时，这是一个常见的需求。</p>\\n<h2>2. 创建模型类</h2>\\n<p>我们将考虑一个简单的支付系统，有两个Kafka主题，一个用于信用卡支付，另一个用于银行转账。让我们创建模型类：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>public class PaymentData {\\n    private String paymentReference;\\n    private String type;\\n    private BigDecimal amount;\\n    private Currency currency;\\n\\n    // 标准getter和setter\\n}\\n</code></pre></div>","autoDesc":true}');export{v as comp,p as data};
