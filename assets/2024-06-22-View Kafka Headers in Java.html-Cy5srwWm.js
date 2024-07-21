import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-CtR6X2Br.js";const t={},p=e(`<h1 id="kafka消息头在java中的查看" tabindex="-1"><a class="header-anchor" href="#kafka消息头在java中的查看"><span>Kafka消息头在Java中的查看</span></a></h1><p>Apache Kafka是一个分布式流处理平台，允许我们发布和订阅记录流，通常被称为消息。此外，Kafka消息头提供了一种将元数据附加到Kafka消息的方式，使得在消息处理中增加了额外的上下文和灵活性。</p><p>在本教程中，我们将深入探讨常用的Kafka消息头，并学习如何使用Java查看和提取它们。</p><p>Kafka消息头表示附加到Kafka消息的键值对，提供了一种在主要消息内容旁边包含补充元数据的方式。</p><p>例如，Kafka消息头通过提供数据来促进消息路由，将消息定向到特定的处理管道或消费者。此外，消息头在携带定制的应用程序元数据方面非常灵活，这些元数据适合应用程序的处理逻辑。</p><p>Kafka自动在Kafka生产者发送的消息中包含几个默认消息头。此外，这些消息头提供了关于消息的关键元数据和上下文。在本节中，我们将深入探讨一些常用的头部及其在Kafka消息处理领域的重要性。</p><p>当在Kafka中生成消息时，生产者会自动包含几个默认消息头，例如：</p><ul><li>KafkaHeaders.TOPIC - 这个头部包含消息所属主题的名称。</li><li>KafkaHeaders.KEY - 如果消息带有键，Kafka会自动包含一个名为“<em>key</em>”的头部，包含序列化的键字节。</li><li>KafkaHeaders.PARTITION - Kafka添加了一个名为“<em>partition</em>”的头部，以指示消息所属的分区ID。</li><li>KafkaHeaders.TIMESTAMP - Kafka为每条消息附加了一个名为“<em>timestamp</em>”的头部，指示生产者生成消息的时间戳。</li></ul><p>以_RECEIVED__为前缀的头部由Kafka消费者在消息消费时添加，以提供关于消息接收过程的元数据：</p><ul><li>KafkaHeaders.RECEIVED_TOPIC - 这个头部包含消息接收来源主题的名称。</li><li>KafkaHeaders.RECEIVED_KEY - 这个头部允许消费者访问与消息关联的键。</li><li>KafkaHeaders.RECEIVED_PARTITION - Kafka添加这个头部以指示消息分配到的分区ID。</li><li>KafkaHeaders.RECEIVED_TIMESTAMP - 这个头部反映了消费者接收消息的时间。</li><li>KafkaHeaders.OFFSET - 偏移量指示消息在分区日志中的位置。</li></ul><p>首先，我们实例化一个_KafkaConsumer_对象。_KafkaConsumer_负责订阅Kafka主题并从中获取消息。实例化_KafkaConsumer_后，我们订阅我们想要消费消息的Kafka主题。通过订阅主题，消费者可以接收在该主题上发布的消息。</p><p>一旦消费者订阅了主题，我们继续从Kafka获取记录。在这个过程中，_KafkaConsumer_从订阅的主题检索消息及其相关头部。</p><p>以下是一个演示如何使用头部消费消息的代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>topics <span class="token operator">=</span> <span class="token string">&quot;my-topic&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">listen</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">,</span> <span class="token annotation punctuation">@Headers</span> <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\` headers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Received message: &quot;</span> <span class="token operator">+</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Headers:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    headers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>key <span class="token operator">+</span> <span class="token string">&quot; : &quot;</span> <span class="token operator">+</span> value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Kafka监听器容器在从指定主题（例如“<em>my-topic</em>”）接收消息时调用_listen()_方法。<strong>@Headers注解表示该参数应该用接收到的消息的头部填充。</strong></p><p>以下是示例输：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Received message: Hello Baeldung!
Headers:
kafka_receivedMessageKey: null
kafka_receivedPartitionId: 0
kafka_receivedTopic: my-topic
kafka_offset: 123
... // 其他头部
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要访问特定的头部，我们可以使用头部映射的_get()_方法，提供所需头部的键。以下是一个访问主题名称的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> topicName <span class="token operator">=</span> headers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">KafkaHeaders</span><span class="token punctuation">.</span><span class="token constant">TOPIC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>topicName应该返回_my-topic_。</p><p>此外，**在消费消息时，如果我们已经知道需要处理的头部，我们可以直接将它们作为方法参数提取。**这种方法提供了一种更简洁和有针对性的方式来访问特定的头部值，而无需遍历所有头部。</p><p>以下是一个演示如何使用头部消费消息，直接将特定头部作为方法参数提取的代码示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>topics <span class="token operator">=</span> <span class="token string">&quot;my-topic&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">listen</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">,</span> <span class="token annotation punctuation">@Header</span><span class="token punctuation">(</span><span class="token class-name">KafkaHeaders</span><span class="token punctuation">.</span><span class="token constant">RECEIVED_PARTITION_ID</span><span class="token punctuation">)</span> <span class="token keyword">int</span> partition<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Received message: &quot;</span> <span class="token operator">+</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Partition: &quot;</span> <span class="token operator">+</span> partition<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在_listen()_方法中，我们使用@Header注解直接提取_RECEIVED_PARTITION_头部。这个注解允许我们指定我们想要提取的头部及其对应的类型。<strong>将头部的值直接注入到方法参数中（在这种情况下，分区）可以在方法体内部直接访问。</strong></p><p>以下是输出：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Received message: Hello Baeldung!
Partition: 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了Apache Kafka中Kafka头部在消息处理中的重要性。我们探讨了生产者和消费者自动包含的默认头部。此外，我们还学习了如何提取和使用这些头部。</p><p>如常，示例代码可在GitHub上找到。</p><p>OK</p>`,30),o=[p];function i(c,l){return s(),n("div",null,o)}const k=a(t,[["render",i],["__file","2024-06-22-View Kafka Headers in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-View%20Kafka%20Headers%20in%20Java.html","title":"Kafka消息头在Java中的查看","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Java","Kafka"],"tag":["Apache Kafka","Kafka Headers","Java"],"head":[["meta",{"name":"keywords","content":"Java, Kafka, Kafka Headers, Metadata, Message Processing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-View%20Kafka%20Headers%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kafka消息头在Java中的查看"}],["meta",{"property":"og:description","content":"Kafka消息头在Java中的查看 Apache Kafka是一个分布式流处理平台，允许我们发布和订阅记录流，通常被称为消息。此外，Kafka消息头提供了一种将元数据附加到Kafka消息的方式，使得在消息处理中增加了额外的上下文和灵活性。 在本教程中，我们将深入探讨常用的Kafka消息头，并学习如何使用Java查看和提取它们。 Kafka消息头表示附加..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T09:28:14.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Apache Kafka"}],["meta",{"property":"article:tag","content":"Kafka Headers"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T09:28:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kafka消息头在Java中的查看\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T09:28:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kafka消息头在Java中的查看 Apache Kafka是一个分布式流处理平台，允许我们发布和订阅记录流，通常被称为消息。此外，Kafka消息头提供了一种将元数据附加到Kafka消息的方式，使得在消息处理中增加了额外的上下文和灵活性。 在本教程中，我们将深入探讨常用的Kafka消息头，并学习如何使用Java查看和提取它们。 Kafka消息头表示附加..."},"headers":[{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719048494000,"updatedTime":1719048494000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.01,"words":1203},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-View Kafka Headers in Java.md","localizedDate":"2024年6月22日","excerpt":"\\n<p>Apache Kafka是一个分布式流处理平台，允许我们发布和订阅记录流，通常被称为消息。此外，Kafka消息头提供了一种将元数据附加到Kafka消息的方式，使得在消息处理中增加了额外的上下文和灵活性。</p>\\n<p>在本教程中，我们将深入探讨常用的Kafka消息头，并学习如何使用Java查看和提取它们。</p>\\n<p>Kafka消息头表示附加到Kafka消息的键值对，提供了一种在主要消息内容旁边包含补充元数据的方式。</p>\\n<p>例如，Kafka消息头通过提供数据来促进消息路由，将消息定向到特定的处理管道或消费者。此外，消息头在携带定制的应用程序元数据方面非常灵活，这些元数据适合应用程序的处理逻辑。</p>","autoDesc":true}');export{k as comp,d as data};
