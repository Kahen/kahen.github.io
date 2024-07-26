import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-8nJ1rqSf.js";const e={},p=t('<h1 id="使用kafka消费者api从开始读取数据" tabindex="-1"><a class="header-anchor" href="#使用kafka消费者api从开始读取数据"><span>使用Kafka消费者API从开始读取数据</span></a></h1><p>Apache Kafka是一个开源的分布式事件流处理系统。它基本上是一个事件流平台，可以发布、订阅、存储和处理记录流。</p><p>Kafka为实时数据处理提供了一个高吞吐量和低延迟的平台。基本上，<strong>Kafka实现了发布-订阅模型，生产者应用程序将事件发布到Kafka，而消费者应用程序订阅这些事件。</strong></p><p>在本教程中，我们将学习如何使用Kafka消费者API从Kafka主题的开始读取数据。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>在我们开始之前，让我们首先设置依赖项，初始化Kafka集群连接，并在Kafka中发布一些消息。</p><p>Kafka提供了一个方便的Java客户端库，我们可以使用它来执行Kafka集群的各种操作。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>首先，让我们将Kafka客户端Java库的Maven依赖项添加到我们项目的_pom.xml_文件中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>`org.apache.kafka`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>`kafka-clients`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>`3.4.0`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-集群和主题初始化" tabindex="-1"><a class="header-anchor" href="#_2-2-集群和主题初始化"><span>2.2. 集群和主题初始化</span></a></h3><p>在整个指南中，我们将假设Kafka集群正在我们的本地系统上运行，并使用默认配置。</p><p>其次，我们需要创建一个Kafka主题，我们可以用来发布和消费消息。让我们通过参考我们的Kafka主题建指南创建一个名为“<em>baeldung</em>”的Kafka主题。</p><p>现在我们已经启动了Kafka集群并创建了一个主题，让我们发布一些消息到Kafka。</p><h3 id="_2-3-发布消息" tabindex="-1"><a class="header-anchor" href="#_2-3-发布消息"><span>2.3. 发布消息</span></a></h3><p>最后，让我们向Kafka主题“<em>baeldung</em>”发布一些虚拟消息。</p><p>要发布消息，让我们创建一个_Properties_实例定义的基本配置的_KafkaProducer_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Properties</span> producerProperties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">BOOTSTRAP_SERVERS_CONFIG</span><span class="token punctuation">,</span> <span class="token constant">KAFKA_CONTAINER</span><span class="token punctuation">.</span><span class="token function">getBootstrapServers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">KEY_SERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">StringSerializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">VALUE_SERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">StringSerializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">KafkaProducer</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` producer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaProducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>producerProperties<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_KafkaProducer.send(ProducerRecord)_方法将消息发布到Kafka主题“<em>baeldung</em>”：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ProducerRecord</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` record <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProducerRecord</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    producer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>record<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们向我们的Kafka集群发布了十条消息。我们将使用这些来演示我们的消费者实现。</p><h2 id="_3-从开始消费消息" tabindex="-1"><a class="header-anchor" href="#_3-从开始消费消息"><span>3. 从开始消费消息</span></a></h2><p>到目前为止，我们已经初始化了我们的Kafka集群，并发布了一些样本消息到Kafka主题。接下来，让我们看看我们如何从开始读取消息。</p><p>为了演示这一点，我们首先使用_Properties_实例定义的特定消费者属性集初始化_KafkaConsumer_的一个实例。然后，我们使用创建的_KafkaConsumer_实例来消费消息，并将偏移量重新定位到分区偏移量的开始。</p><p>让我们详细看看这些步骤。</p><h3 id="_3-1-消费者属性" tabindex="-1"><a class="header-anchor" href="#_3-1-消费者属性"><span>3.1. 消费者属性</span></a></h3><p>要从Kafka主题的开始消费消息，我们使用随机生成的消费者组ID创建_KafkaConsumer_的一个实例。我们通过将消费者的“<em>group.id</em>”属性设置为随机生成的UUID来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Properties</span> consumerProperties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">BOOTSTRAP_SERVERS_CONFIG</span><span class="token punctuation">,</span> <span class="token string">&quot;localhost:9092&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">KEY_DESERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">StringDeserializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">VALUE_DESERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">StringDeserializer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">GROUP_ID_CONFIG</span><span class="token punctuation">,</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们为消费者生成新的消费者组ID时，消费者将始终属于由“<em>group.id</em>”属性标识的新消费者组。新的消费者组不会有任何与之关联的偏移量。在这种情况下，<strong>Kafka提供了一个属性“<em>auto.offset.reset</em>”，它指示当Kafka中没有初始偏移量或如果当前偏移量不再存在于服务器上时应该做什么。</strong></p><p>“<em>auto.offset.reset</em>”属性接受以下值：</p><ul><li><em>earliest</em>: 此值自动将偏移量重置为最早的偏移量</li><li><em>latest</em>: 此值自动将偏移量重置为最新的偏移量</li><li><em>none</em>: 如果没有为消费者组找到先前的偏移量，则此值向消费者抛出异常</li><li>其他: 如果设置的值不是前三个值中的任何一个，则向消费者抛出异常</li></ul><p>由于我们想要<strong>从Kafka主题的开始读取，我们将“<em>auto.offset.reset</em>”属性的值设置为“_earliest”：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>consumerProperties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">AUTO_OFFSET_RESET_CONFIG</span><span class="token punctuation">,</span> <span class="token string">&quot;earliest&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们使用消费者属性创建_KafkaConsumer_的一个实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">KafkaConsumer</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaConsumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>consumerProperties<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们使用这个_KafkaConsumer_实例从主题的开始消费消息。</p><h3 id="_3-2-消费消息" tabindex="-1"><a class="header-anchor" href="#_3-2-消费消息"><span>3.2. 消费消息</span></a></h3><p>要消费消息，我们首先订阅我们的消费者以从主题“<em>baeldung</em>”消费消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>consumer<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;baeldung&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们<strong>使用_KafkaConsumer.poll(Duration duration)_方法从主题“<em>baeldung</em>”轮询新消息，直到由_Duration_参数指定的时间：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ConsumerRecords</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` records <span class="token operator">=</span> consumer<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ConsumerRecord</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` record <span class="token operator">:</span> records<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>record<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们就从“<em>baeldung</em>”主题的开始读取了所有消息。</p><p>此外，<strong>要将现有消费者重置为从主题的开始读取，我们使用_KafkaConsumer.seekToBeginning(Collection<code>&lt;TopicPartition&gt;</code> partitions)_方法。</strong> 此方法接受_TopicPartition_的集合，并将消费者的偏移量指向分区的开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>consumer<span class="token punctuation">.</span><span class="token function">seekToBeginning</span><span class="token punctuation">(</span>consumer<span class="token punctuation">.</span><span class="token function">assignment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们将_KafkaConsumer.assignment()_方法的值传递给_seekToBeginning()_方法。_KafkaConsumer.assignment()_方法返回当前分配给消费者的分区集。</p><p>最后，再次为消息轮询相同的消费者现在从分区的开始读取所有消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ConsumerRecords</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` records <span class="token operator">=</span> consumer<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ConsumerRecord</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`````` record <span class="token operator">:</span> records<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>record<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何使用Kafka消费者API从Kafka主题的开始读取消息。</p><p>我们首先查看了新消费者如何从Kafka主题的开始读取消息，以及其实现方式。然后，我们看到了已经消费的消费者如何将其偏移量定位到从开始读取消息。</p><p>像往常一样，所有示例的完整代码可以在GitHub上找到。</p>',51),o=[p];function c(l,i){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-04-Read Data From the Beginning Using Kafka Consumer API.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Read%20Data%20From%20the%20Beginning%20Using%20Kafka%20Consumer%20API.html","title":"使用Kafka消费者API从开始读取数据","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Kafka"],"tag":["Kafka Consumer API","Real-time data processing"],"head":[["meta",{"name":"keywords","content":"Kafka, Java, Consumer API, Event streaming, Real-time data processing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Read%20Data%20From%20the%20Beginning%20Using%20Kafka%20Consumer%20API.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Kafka消费者API从开始读取数据"}],["meta",{"property":"og:description","content":"使用Kafka消费者API从开始读取数据 Apache Kafka是一个开源的分布式事件流处理系统。它基本上是一个事件流平台，可以发布、订阅、存储和处理记录流。 Kafka为实时数据处理提供了一个高吞吐量和低延迟的平台。基本上，Kafka实现了发布-订阅模型，生产者应用程序将事件发布到Kafka，而消费者应用程序订阅这些事件。 在本教程中，我们将学习如..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T21:56:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka Consumer API"}],["meta",{"property":"article:tag","content":"Real-time data processing"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T21:56:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Kafka消费者API从开始读取数据\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T21:56:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Kafka消费者API从开始读取数据 Apache Kafka是一个开源的分布式事件流处理系统。它基本上是一个事件流平台，可以发布、订阅、存储和处理记录流。 Kafka为实时数据处理提供了一个高吞吐量和低延迟的平台。基本上，Kafka实现了发布-订阅模型，生产者应用程序将事件发布到Kafka，而消费者应用程序订阅这些事件。 在本教程中，我们将学习如..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 集群和主题初始化","slug":"_2-2-集群和主题初始化","link":"#_2-2-集群和主题初始化","children":[]},{"level":3,"title":"2.3. 发布消息","slug":"_2-3-发布消息","link":"#_2-3-发布消息","children":[]}]},{"level":2,"title":"3. 从开始消费消息","slug":"_3-从开始消费消息","link":"#_3-从开始消费消息","children":[{"level":3,"title":"3.1. 消费者属性","slug":"_3-1-消费者属性","link":"#_3-1-消费者属性","children":[]},{"level":3,"title":"3.2. 消费消息","slug":"_3-2-消费消息","link":"#_3-2-消费消息","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720130209000,"updatedTime":1720130209000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.82,"words":1445},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Read Data From the Beginning Using Kafka Consumer API.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Apache Kafka是一个开源的分布式事件流处理系统。它基本上是一个事件流平台，可以发布、订阅、存储和处理记录流。</p>\\n<p>Kafka为实时数据处理提供了一个高吞吐量和低延迟的平台。基本上，<strong>Kafka实现了发布-订阅模型，生产者应用程序将事件发布到Kafka，而消费者应用程序订阅这些事件。</strong></p>\\n<p>在本教程中，我们将学习如何使用Kafka消费者API从Kafka主题的开始读取数据。</p>\\n<h2>2. 设置</h2>\\n<p>在我们开始之前，让我们首先设置依赖项，初始化Kafka集群连接，并在Kafka中发布一些消息。</p>\\n<p>Kafka提供了一个方便的Java客户端库，我们可以使用它来执行Kafka集群的各种操作。</p>","autoDesc":true}');export{k as comp,d as data};
