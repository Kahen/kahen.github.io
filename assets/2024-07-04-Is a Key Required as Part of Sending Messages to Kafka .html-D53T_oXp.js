import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-BkL9UgS7.js";const i={},r=n('<h1 id="apache-kafka中发送消息是否需要键" tabindex="-1"><a class="header-anchor" href="#apache-kafka中发送消息是否需要键"><span>Apache Kafka中发送消息是否需要键？</span></a></h1><p>Apache Kafka是一个开源的、分布式的流处理系统，具有容错性并且提供高吞吐量。Kafka基本上是一个实现了发布-订阅模型的消息系统。Kafka的消息、存储和流处理能力使我们能够大规模地存储和分析实时数据流。</p><p>在本教程中，我们首先将探讨Kafka消息中键的重要性。然后，我们将学习如何将带键的消息发布到Kafka主题。</p><h2 id="_2-kafka消息中键的重要性" tabindex="-1"><a class="header-anchor" href="#_2-kafka消息中键的重要性"><span>2. Kafka消息中键的重要性</span></a></h2><p>我们知道，Kafka有效地按照我们生成记录的顺序存储记录流。</p><p>当我们向Kafka主题发布消息时，它以轮询的方式在可用分区中分配。因此，在Kafka主题内，消息的顺序在分区内是保证的，但在分区之间则不是。</p><p>当我们向Kafka主题发布带键的消息时，所有具有相同键的消息都保证被Kafka存储在同一个分区中。因此，如果我们要维持具有相同键的消息的顺序，Kafka消息中的键是有用的。</p><p><strong>总结来说，键不是发送消息到Kafka的必需部分。基本上，如果我们希望维持具有相同键的消息的严格顺序，那么我们绝对应该使用消息中的键。对于所有其他情况，拥有空键将提供更好的消息在分区之间的分布。</strong></p><p>接下来，让我们直接深入一些带有键的Kafka消息的实现代码。</p><h2 id="_3-设置" tabindex="-1"><a class="header-anchor" href="#_3-设置"><span>3. 设置</span></a></h2><p>在我们开始之前，让我们首先初始化一个Kafka集群，设置依赖项，并与Kafka集群建立连接。</p><p>Kafka的Java库提供了易于使用的Producer和Consumer API，我们可以使用它们来发布和消费Kafka中的消息。</p><h3 id="_3-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖项"><span>3.1. 依赖项</span></a></h3><p>首先，让我们将Kafka Clients Java库的Maven依赖项添加到我们项目的_pom.xml_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`org.apache.kafka`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`kafka-clients`&lt;/artifactId&gt;`\n    `&lt;version&gt;`3.4.0`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-集群和主题初始化" tabindex="-1"><a class="header-anchor" href="#_3-2-集群和主题初始化"><span>3.2. 集群和主题初始化</span></a></h3><p>其次，我们需要一个运行中的Kafka集群，我们可以连接到它并执行各种Kafka操作。本指南假设Kafka集群在我们的本地系统上运行，使用默认配置。</p><p>最后，我们将创建一个具有多个分区的Kafka主题，我们可以用来发布和消费消息。参考我们的Kafka主题创建指南，让我们创建一个名为“<em>baeldung</em>”的主题：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Properties adminProperties = new Properties();\nadminProperties.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, &quot;localhost:9092&quot;);\n\nAdmin admin = Admin.create(adminProperties);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用由_Properties_实例定义的基本配置创建了一个Kafka _Admin_的实例。接下来，我们将使用这个_Admin_实例来创建一个名为“<em>baeldung</em>”的主题，它有五个分区：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>admin.createTopics(Collections.singleton(new NewTopic(&quot;baeldung&quot;, 5, (short) 1)));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我们已经使用主题初始化了Kafka集群设置，让我们发布一些带键的消息。</p><h2 id="_4-带键发布消息" tabindex="-1"><a class="header-anchor" href="#_4-带键发布消息"><span>4. 带键发布消息</span></a></h2><p>为了演示我们的编码示例，我们首先将创建一个带有一些基本生产者属性的_KafkaProducer_实例。接下来，我们将使用创建的_KafkaProducer_实例发布带键的消息并验证主题分区。</p><p>让我们详细深入这些步骤的每一个。</p><h3 id="_4-1-初始化生产者" tabindex="-1"><a class="header-anchor" href="#_4-1-初始化生产者"><span>4.1. 初始化生产者</span></a></h3><p>首先，让我们创建一个新的_Properties_实例，其中包含连接到我们本地代理的生产者的属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Properties producerProperties = new Properties();\nproducerProperties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, &quot;localhost:9092&quot;);\nproducerProperties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());\nproducerProperties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进一步，让我们使用创建的生产者_Properties_实例创建一个_KafkaProducer_实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>KafkaProducer```&lt;String, String&gt;``` producer = new KafkaProducer&lt;&gt;(producerProperties);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>_KafkaProducer_类的构造函数接受一个_Properties_对象（或一个_Map）并返回一个_KafkaProducer_的实例。</p><h3 id="_4-2-发布消息" tabindex="-1"><a class="header-anchor" href="#_4-2-发布消息"><span>4.2. 发布消息</span></a></h3><p>Kafka发布者API提供了多个构造函数来创建带键的_ProducerRecord_实例。我们使用_ProducerRecord<code>&lt;K,V&gt;</code>(String topic, K key, V value)_构造函数来创建一个带键的消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ProducerRecord```&lt;String, String&gt;``` record = new ProducerRecord&lt;&gt;(&quot;baeldung&quot;, &quot;message-key&quot;, &quot;Hello World&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们为“<em>baeldung</em>”主题创建了一个带键的_ProducerRecord_实例。</p><p>现在，让我们向Kafka主题发布一些消息并验证分区：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (int i = 1; i &lt;= 10; i++) {\n    ProducerRecord```&lt;String, String&gt;``` record = new ProducerRecord&lt;&gt;(&quot;baeldung&quot;, &quot;message-key&quot;, String.valueOf(i));\n    Future``&lt;RecordMetadata&gt;`` future = producer.send(record);\n    RecordMetadata metadata = future.get();\n\n    logger.info(String.valueOf(metadata.partition()));\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_KafkaProducer.send(ProducerRecord<code>&lt;String, String&gt;</code> record)_方法向Kafka发布消息。该方法返回一个类型为_RecordMetadata_的_Future_实例。然后我们使用阻塞调用_Future<code>&lt;RecordMetadata&gt;</code>.get()_方法，当消息发布时返回一个_RecordMetadata_实例。</p><p>接下来，我们使用_RecordMetadata.partition()_方法并获取消息的分区。</p><p>上述代码片段产生了以下记录结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个，我们验证了我们发布的具有相同键的消息被发布到了同一个分区。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了Kafka消息中键的重要性。</p><p>我们首先看到了如何将带键的消息发布到主题。然后我们讨论了如何验证具有相同键的消息被发布到同一个分区。</p><p>一如既往，所有示例的完整代码都可以在GitHub上找到。</p>',46),d=[r];function s(l,o){return t(),a("div",null,d)}const u=e(i,[["render",s],["__file","2024-07-04-Is a Key Required as Part of Sending Messages to Kafka .html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Is%20a%20Key%20Required%20as%20Part%20of%20Sending%20Messages%20to%20Kafka%20.html","title":"Apache Kafka中发送消息是否需要键？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Kafka"],"tag":["Kafka","Java"],"head":[["meta",{"name":"keywords","content":"Kafka, Java, 消息, 键"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Is%20a%20Key%20Required%20as%20Part%20of%20Sending%20Messages%20to%20Kafka%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Kafka中发送消息是否需要键？"}],["meta",{"property":"og:description","content":"Apache Kafka中发送消息是否需要键？ Apache Kafka是一个开源的、分布式的流处理系统，具有容错性并且提供高吞吐量。Kafka基本上是一个实现了发布-订阅模型的消息系统。Kafka的消息、存储和流处理能力使我们能够大规模地存储和分析实时数据流。 在本教程中，我们首先将探讨Kafka消息中键的重要性。然后，我们将学习如何将带键的消息发布..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T22:36:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T22:36:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Kafka中发送消息是否需要键？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T22:36:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Kafka中发送消息是否需要键？ Apache Kafka是一个开源的、分布式的流处理系统，具有容错性并且提供高吞吐量。Kafka基本上是一个实现了发布-订阅模型的消息系统。Kafka的消息、存储和流处理能力使我们能够大规模地存储和分析实时数据流。 在本教程中，我们首先将探讨Kafka消息中键的重要性。然后，我们将学习如何将带键的消息发布..."},"headers":[{"level":2,"title":"2. Kafka消息中键的重要性","slug":"_2-kafka消息中键的重要性","link":"#_2-kafka消息中键的重要性","children":[]},{"level":2,"title":"3. 设置","slug":"_3-设置","link":"#_3-设置","children":[{"level":3,"title":"3.1. 依赖项","slug":"_3-1-依赖项","link":"#_3-1-依赖项","children":[]},{"level":3,"title":"3.2. 集群和主题初始化","slug":"_3-2-集群和主题初始化","link":"#_3-2-集群和主题初始化","children":[]}]},{"level":2,"title":"4. 带键发布消息","slug":"_4-带键发布消息","link":"#_4-带键发布消息","children":[{"level":3,"title":"4.1. 初始化生产者","slug":"_4-1-初始化生产者","link":"#_4-1-初始化生产者","children":[]},{"level":3,"title":"4.2. 发布消息","slug":"_4-2-发布消息","link":"#_4-2-发布消息","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720132596000,"updatedTime":1720132596000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.44,"words":1332},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Is a Key Required as Part of Sending Messages to Kafka .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Apache Kafka是一个开源的、分布式的流处理系统，具有容错性并且提供高吞吐量。Kafka基本上是一个实现了发布-订阅模型的消息系统。Kafka的消息、存储和流处理能力使我们能够大规模地存储和分析实时数据流。</p>\\n<p>在本教程中，我们首先将探讨Kafka消息中键的重要性。然后，我们将学习如何将带键的消息发布到Kafka主题。</p>\\n<h2>2. Kafka消息中键的重要性</h2>\\n<p>我们知道，Kafka有效地按照我们生成记录的顺序存储记录流。</p>\\n<p>当我们向Kafka主题发布消息时，它以轮询的方式在可用分区中分配。因此，在Kafka主题内，消息的顺序在分区内是保证的，但在分区之间则不是。</p>","autoDesc":true}');export{u as comp,g as data};
