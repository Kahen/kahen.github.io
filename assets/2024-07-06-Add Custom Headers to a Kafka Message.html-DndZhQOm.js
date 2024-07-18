import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as r}from"./app-C6rqSDgP.js";const n={},d=r('<h1 id="在kafka消息中添加自定义消息头" tabindex="-1"><a class="header-anchor" href="#在kafka消息中添加自定义消息头"><span>在Kafka消息中添加自定义消息头</span></a></h1><p>Apache Kafka是一个开源的分布式事件存储和容错的流处理系统。<strong>Kafka基本上是一个事件流平台，客户端可以发布和订阅事件流。</strong> 通常，生产者应用程序将事件发布到Kafka，而消费者订阅这些事件，从而实现发布-订阅模型。</p><p>在本教程中，我们将学习如何使用Kafka生产者向Kafka消息添加自定义头。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>首先，让我们将Kafka客户端Java库的Maven依赖项添加到我们项目的_pom.xml_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`org.apache.kafka`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`kafka-clients`&lt;/artifactId&gt;`\n    `&lt;version&gt;`3.4.0`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-连接初始化" tabindex="-1"><a class="header-anchor" href="#_2-2-连接初始化"><span>2.2. 连接初始化</span></a></h3><p>本指南假设我们的本地系统上运行着一个Kafka集群。此外，我们需要创建一个主题并与Kafka集群建立连接。</p><p>首先，让我们在集群中创建一个Kafka主题。我们可以通过参考我们的Kafka主题创建指南来创建一个名为“<em>baeldung</em>”的主题。</p><p>其次，让我们创建一个新的_Properties_实例，该实例具有连接生产者到我们本地代理所需的最低配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Properties producerProperties = new Properties();\nproducerProperties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, &quot;localhost:9092&quot;);\nproducerProperties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());\nproducerProperties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们创建一个_KafkaProducer_的实例，我们将用它来发布消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>KafkaProducer``````&lt;String, String&gt;`````` producer = new KafkaProducer&lt;&gt;（producerProperties）;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>KafkaProducer_类的构造函数接受一个_Properties_对象（或一个_Map</em>）与_bootstrap.servers_属性，并返回一个_KafkaProducer_的实例。</p><p>以类似的方式，让我们创建一个_KafkaConsumer_的实例，我们将用它来消费消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Properties consumerProperties = new Properties();\nconsumerProperties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA_CONTAINER.getBootstrapServers());\nconsumerProperties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());\nconsumerProperties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());\nconsumerProperties.put(ConsumerConfig.GROUP_ID_CONFIG, &quot;ConsumerGroup1&quot;);\n\nKafkaConsumer``````&lt;String, String&gt;`````` consumer = new KafkaConsumer&lt;&gt;(consumerProperties);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将使用这些生产者和消费者实例来演示我们所有的编码示例。</p><p>现在我们已经配置了所有必要的依赖项和连接，我们可以编写一个简单的应用程序来向Kafka消息添加自定义头。</p><p><strong>Kafka消息的自定义头支持是在Kafka版本0.11.0.0中添加的。</strong> 要创建一个Kafka消息（Record），我们创建一个_ProducerRecord<code>&lt;K,V&gt;</code>_的实例。_ProducerRecord_基本上确定了要发布的消息值和主题，以及其他元数据。</p><p><strong>_ProducerRecord_类提供了多种构造函数，可以向Kafka消息添加自定义头。</strong> 让我们看看我们可以使用的一些构造函数：</p><ul><li><em>ProducerRecord(String topic, Integer partition, K key, V value, Iterable<code>&lt;Header&gt;</code> headers)</em></li><li><em>ProducerRecord(String topic, Integer partition, Long timestamp, K key, V value, Iterable<code>&lt;Header&gt;</code> headers)</em></li></ul><p>两个**_ProducerRecord_类构造函数都接受自定义头，形式为_Iterable<code>&lt;Header&gt;</code>_类型**。</p><p>为了理解，让我们创建一个_ProducerRecord_，将消息发布到“baeldung”主题以及一些自定义头：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List`````&lt;Header&gt;````` headers = new ArrayList&lt;&gt;();\nheaders.add(new RecordHeader(&quot;website&quot;, &quot;baeldung.com&quot;.getBytes()));\nProducerRecord``````&lt;String, String&gt;`````` record = new ProducerRecord&lt;&gt;(&quot;baeldung&quot;, null, &quot;message&quot;, &quot;Hello World&quot;, headers);\n\nproducer.send(record);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个_Header_类型的_List_，作为头传递给构造函数。每个头表示一个_Header_实例_RecordHeader(String key, byte[] value)_，它接受一个头键作为_String_和头值作为_byte_数组。</p><p>同样，我们可以使用第二个构造函数，它还接受正在发布记录的时间戳：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List`````&lt;Header&gt;````` headers = new ArrayList&lt;&gt;();\nheaders.add(new RecordHeader(&quot;website&quot;, &quot;baeldung.com&quot;.getBytes()));\nProducerRecord``````&lt;String, String&gt;`````` record = new ProducerRecord&lt;&gt;(&quot;baeldung&quot;, null, System.currentTimeMillis(), &quot;message&quot;, &quot;Hello World&quot;, headers);\n\nproducer.send(record);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到目前为止，我们已经创建了一个带有自定义头的消息，并将其发布到Kafka。</p><p>接下来，让我们实现消费者代码来消费消息并验证其自定义头。</p><p>首先，让我们将我们的消费者实例订阅到Kafka主题“baeldung”以消费消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>consumer.subscribe(Arrays.asList(&quot;baeldung&quot;));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其次，我们使用轮询机制从Kafka轮询新消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ConsumerRecords``````&lt;String, String&gt;`````` records = consumer.poll(Duration.ofMinutes(1));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_KafkaConsumer.poll(Duration duration)_方法在指定的_Duration_参数时间范围内轮询Kafka主题中的新消息。该方法返回一个_ConsumerRecords_实例，其中包含获取到的消息。_ConsumerRecords_基本上是_ConsumerRecord_类型的_Iterable_实例。</p><p>最后，我们循环遍历获取到的记录，并获取每个消息的自定义头：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (ConsumerRecord``````&lt;String, String&gt;`````` record : records) {\n    System.out.println(record.key());\n    System.out.println(record.value());\n\n    Headers consumedHeaders = record.headers();\n    for (Header header : consumedHeaders) {\n        System.out.println(header.key());\n        System.out.println(new String(header.value()));\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_ConsumerRecord_类的各种getter方法来获取消息键、值和自定义头。<strong>_ConsumerRecord.headers()_方法返回一个包含自定义头的_Headers_实例</strong>。_Headers_基本上是_Header_类型的_Iterable_实例。然后我们循环遍历每个_Header_实例，并使用_Header.key()_和_Header.value()_方法分别获取头键和值。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何向Kafka消息添加自定义头。我们查看了接受自定义头的不同构造函数及其相应的实现。</p><p>然后我们看到如何消费带有自定义头的消息并验证它们。</p><p>如往常一样，所有示例的完整代码都可以在GitHub上找到。</p>',41),i=[d];function s(o,l){return t(),a("div",null,i)}const p=e(n,[["render",s],["__file","2024-07-06-Add Custom Headers to a Kafka Message.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Add%20Custom%20Headers%20to%20a%20Kafka%20Message.html","title":"在Kafka消息中添加自定义消息头","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Kafka"],"tag":["Kafka","Java"],"head":[["meta",{"name":"keywords","content":"Kafka, Java, 自定义消息头, 事件流, 消息系统"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Add%20Custom%20Headers%20to%20a%20Kafka%20Message.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Kafka消息中添加自定义消息头"}],["meta",{"property":"og:description","content":"在Kafka消息中添加自定义消息头 Apache Kafka是一个开源的分布式事件存储和容错的流处理系统。Kafka基本上是一个事件流平台，客户端可以发布和订阅事件流。 通常，生产者应用程序将事件发布到Kafka，而消费者订阅这些事件，从而实现发布-订阅模型。 在本教程中，我们将学习如何使用Kafka生产者向Kafka消息添加自定义头。 2.1. 依赖..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T05:57:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T05:57:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Kafka消息中添加自定义消息头\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T05:57:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Kafka消息中添加自定义消息头 Apache Kafka是一个开源的分布式事件存储和容错的流处理系统。Kafka基本上是一个事件流平台，客户端可以发布和订阅事件流。 通常，生产者应用程序将事件发布到Kafka，而消费者订阅这些事件，从而实现发布-订阅模型。 在本教程中，我们将学习如何使用Kafka生产者向Kafka消息添加自定义头。 2.1. 依赖..."},"headers":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 连接初始化","slug":"_2-2-连接初始化","link":"#_2-2-连接初始化","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720245464000,"updatedTime":1720245464000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.19,"words":1258},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Add Custom Headers to a Kafka Message.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Apache Kafka是一个开源的分布式事件存储和容错的流处理系统。<strong>Kafka基本上是一个事件流平台，客户端可以发布和订阅事件流。</strong> 通常，生产者应用程序将事件发布到Kafka，而消费者订阅这些事件，从而实现发布-订阅模型。</p>\\n<p>在本教程中，我们将学习如何使用Kafka生产者向Kafka消息添加自定义头。</p>\\n<h3>2.1. 依赖项</h3>\\n<p>首先，让我们将Kafka客户端Java库的Maven依赖项添加到我们项目的_pom.xml_文件中：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>`&lt;dependency&gt;`\\n    `&lt;groupId&gt;`org.apache.kafka`&lt;/groupId&gt;`\\n    `&lt;artifactId&gt;`kafka-clients`&lt;/artifactId&gt;`\\n    `&lt;version&gt;`3.4.0`&lt;/version&gt;`\\n`&lt;/dependency&gt;`\\n</code></pre></div>","autoDesc":true}');export{p as comp,m as data};
