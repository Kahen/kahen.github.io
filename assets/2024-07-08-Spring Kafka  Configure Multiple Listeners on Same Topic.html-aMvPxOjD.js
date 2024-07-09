import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-COaDJFIk.js";const e={},p=t(`<h1 id="spring-kafka-在同一主题上配置多个监听器" tabindex="-1"><a class="header-anchor" href="#spring-kafka-在同一主题上配置多个监听器"><span>Spring Kafka：在同一主题上配置多个监听器</span></a></h1><p>在本文中，我们将通过一个实际示例学习如何为同一个Kafka主题配置多个监听器。</p><p>如果这是您第一次在Spring上配置Kafka，最好从我们的Apache Kafka与Spring入门开始。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>让我们构建一个书籍消费者服务，监听图书馆内新到的书籍，并为不同目的消费它们，如全文内容搜索、价格索引或用户通知。</p><p>首先，让我们创建一个Spring Boot服务，并使用<code>spring-kafka</code>依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.kafka\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-kafka\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，让我们定义监听器将消费的<code>BookEvent</code>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookEvent</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> description<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Double</span> price<span class="token punctuation">;</span>

    <span class="token comment">// 标准构造函数，getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-生产消息" tabindex="-1"><a class="header-anchor" href="#_3-生产消息"><span>3. 生产消息</span></a></h2><p>Kafka生产者对生态系统至关重要，因为生产者将消息写入Kafka集群。考虑到这一点，我们首先需要定义一个生产者，将消息写入稍后由消费者应用程序消费的主题。</p><p>以我们的示例为例，让我们编写一个简单的Kafka生产者函数，将新的<code>BookEvent</code>对象写入“books”主题。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">TOPIC</span> <span class="token operator">=</span> <span class="token string">&quot;books&quot;</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">KafkaTemplate</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">BookEvent</span><span class="token punctuation">&gt;</span></span>\`\`\`\` bookEventKafkaTemplate<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sentBookEvent</span><span class="token punctuation">(</span><span class="token class-name">BookEvent</span> book<span class="token punctuation">)</span><span class="token punctuation">{</span>
    bookEventKafkaTemplate<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token constant">TOPIC</span><span class="token punctuation">,</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> book<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-从多个监听器消费相同的kafka主题" tabindex="-1"><a class="header-anchor" href="#_4-从多个监听器消费相同的kafka主题"><span>4. 从多个监听器消费相同的Kafka主题</span></a></h2><p>Kafka消费者是订阅Kafka集群一个或多个主题的客户端应用程序。稍后，我们将看到如何在同一个主题上设置多个监听器。</p><h3 id="_4-1-消费者配置" tabindex="-1"><a class="header-anchor" href="#_4-1-消费者配置"><span>4.1. 消费者配置</span></a></h3><p>首先，要配置一个消费者，我们需要定义监听器将需要的<code>ConcurrentKafkaListenerContainerFactory</code> Bean。</p><p>现在，让我们定义我们将用于消费<code>BookEvent</code>对象的容器工厂：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableKafka</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KafkaConsumerConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">ConcurrentKafkaListenerContainerFactory</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">BookEvent</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">kafkaListenerContainerFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ConcurrentKafkaListenerContainerFactory</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">BookEvent</span><span class="token punctuation">&gt;</span></span>\`\`\`\` factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentKafkaListenerContainerFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        factory<span class="token punctuation">.</span><span class="token function">setConsumerFactory</span><span class="token punctuation">(</span><span class="token function">consumerFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> factory<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">ConsumerFactory</span>\`\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">BookEvent</span><span class="token punctuation">&gt;</span></span>\`\`\`\` <span class="token function">consumerFactory</span><span class="token punctuation">(</span><span class="token class-name">String</span> groupId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\` props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 所需的消费者工厂属性</span>

        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DefaultKafkaConsumerFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将查看收听传入消息的不同策略。</p><h3 id="_4-2-同一消费者组中的多个监听器" tabindex="-1"><a class="header-anchor" href="#_4-2-同一消费者组中的多个监听器"><span>4.2. 同一消费者组中的多个监听器</span></a></h3><p>将多个监听器添加到同一消费者组的策略之一是增加同一消费者组中的并发级别。因此，我们可以在<code>@KafkaListener</code>注解中简单地指定这一点。</p><p>为了理解这是如何工作的，让我们为我们的图书馆定义一个通知监听器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>topics <span class="token operator">=</span> <span class="token string">&quot;books&quot;</span><span class="token punctuation">,</span> groupId <span class="token operator">=</span> <span class="token string">&quot;book-notification-consumer&quot;</span><span class="token punctuation">,</span> concurrency <span class="token operator">=</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">bookNotificationConsumer</span><span class="token punctuation">(</span><span class="token class-name">BookEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Books event received for notification =&gt; {}&quot;</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看看发布三条消息后的控制台输出。此外，让我们理解为什么消息只消费一次：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Books event received for notification =&gt; BookEvent(title=book 1, description=description 1, price=1.0)
Books event received for notification =&gt; BookEvent(title=book 2, description=description 2, price=2.0)
Books event received for notification =&gt; BookEvent(title=book 3, description=description 3, price=3.0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为，内部地，<strong>对于每个并发级别，Kafka在同一个消费者组内实例化一个新的监听器</strong>。此外，同一消费者组内所有监听器实例的范围是将消息分配给彼此，以更快地完成工作并提高吞吐量。</p><h3 id="_4-3-不同消费者组中的多个监听器" tabindex="-1"><a class="header-anchor" href="#_4-3-不同消费者组中的多个监听器"><span>4.3. 不同消费者组中的多个监听器</span></a></h3><p>如果我们需要多次消费相同的消息并为每个监听器应用不同的处理逻辑，我们必须配置<code>@KafkaListener</code>以具有不同的组ID。通过这样做，<strong>Kafka将为每个监听器创建专用的消费者组，并将所有发布的消息推送到每个监听器</strong>。</p><p>让我们通过定义一个用于全文搜索索引的监听器和一个负责价格索引的监听器来看到这种策略的实际应用。两者都将监听相同的“books”主题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>topics <span class="token operator">=</span> <span class="token string">&quot;books&quot;</span><span class="token punctuation">,</span> groupId <span class="token operator">=</span> <span class="token string">&quot;books-content-search&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">bookContentSearchConsumer</span><span class="token punctuation">(</span><span class="token class-name">BookEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Books event received for full-text search indexing =&gt; {}&quot;</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>topics <span class="token operator">=</span> <span class="token string">&quot;books&quot;</span><span class="token punctuation">,</span> groupId <span class="token operator">=</span> <span class="token string">&quot;books-price-index&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">bookPriceIndexerConsumer</span><span class="token punctuation">(</span><span class="token class-name">BookEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Books event received for price indexing =&gt; {}&quot;</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们运行上述代码并分析输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Books event received for price indexing =&gt; BookEvent(title=book 1, description=description 1, price=1.0)
Books event received for full-text search indexing =&gt; BookEvent(title=book 1, description=description 1, price=1.0)
Books event received for full-text search indexing =&gt; BookEvent(title=book 2, description=description 2, price=2.0)
Books event received for price indexing =&gt; BookEvent(title=book 2, description=description 2, price=2.0)
Books event received for full-text search indexing =&gt; BookEvent(title=book 3, description=description 3, price=3.0)
Books event received for price indexing =&gt; BookEvent(title=book 3, description=description 3, price=3.0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，两个监听器都接收每个<code>BookEvent</code>，并可以为所有传入的消息应用独立的处理逻辑。</p><h2 id="_5-使用不同的监听器策略" tabindex="-1"><a class="header-anchor" href="#_5-使用不同的监听器策略"><span>5. 使用不同的监听器策略</span></a></h2><p>正如我们已经学到的，我们可以通过配置<code>@KafkaListener</code>注解的并发属性大于一，或者通过定义多个监听相同Kafka主题并具有不同消费者ID的<code>@KafkaListener</code>方法来设置多个监听器。</p><p>选择一种策略或另一种取决于我们想要实现的目标。只要我们解决性能问题以通过更快地处理消息来增加吞吐量，正确的策略就是增加同一消费者组中的监听器数量。</p><p>然而，为了多次处理相同的消息以满足不同的要求，我们应该定义专用的监听器，这些监听器具有不同的消费者组，并且监听相同的主题。</p><p>作为一般规则，我们应该为我们需要满足的每个要求使用一个消费者组，如果我们需要使该监听器更快，我们可以增加同一消费者组中的监听器数量。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何使用Spring Kafka库为同一主题配置多个监听器，通过一个实际的图书馆示例。我们从生产者和消费者配置开始，并继续探讨了为同一主题添加多个监听器的不同方式。</p><p>如往常一样，示例的完整源代码可以在GitHub上找到。</p>`,42),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-08-Spring Kafka  Configure Multiple Listeners on Same Topic.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Spring%20Kafka%20%20Configure%20Multiple%20Listeners%20on%20Same%20Topic.html","title":"Spring Kafka：在同一主题上配置多个监听器","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Kafka","Kafka Listener"],"tag":["Kafka","Spring Boot","Listeners"],"head":[["meta",{"name":"keywords","content":"Spring Kafka, Kafka Listener, Multiple Listeners, Same Topic, Configuration"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Spring%20Kafka%20%20Configure%20Multiple%20Listeners%20on%20Same%20Topic.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Kafka：在同一主题上配置多个监听器"}],["meta",{"property":"og:description","content":"Spring Kafka：在同一主题上配置多个监听器 在本文中，我们将通过一个实际示例学习如何为同一个Kafka主题配置多个监听器。 如果这是您第一次在Spring上配置Kafka，最好从我们的Apache Kafka与Spring入门开始。 2. 项目设置 让我们构建一个书籍消费者服务，监听图书馆内新到的书籍，并为不同目的消费它们，如全文内容搜索、价..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T03:59:39.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Listeners"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T03:59:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Kafka：在同一主题上配置多个监听器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T03:59:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Kafka：在同一主题上配置多个监听器 在本文中，我们将通过一个实际示例学习如何为同一个Kafka主题配置多个监听器。 如果这是您第一次在Spring上配置Kafka，最好从我们的Apache Kafka与Spring入门开始。 2. 项目设置 让我们构建一个书籍消费者服务，监听图书馆内新到的书籍，并为不同目的消费它们，如全文内容搜索、价..."},"headers":[{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[]},{"level":2,"title":"3. 生产消息","slug":"_3-生产消息","link":"#_3-生产消息","children":[]},{"level":2,"title":"4. 从多个监听器消费相同的Kafka主题","slug":"_4-从多个监听器消费相同的kafka主题","link":"#_4-从多个监听器消费相同的kafka主题","children":[{"level":3,"title":"4.1. 消费者配置","slug":"_4-1-消费者配置","link":"#_4-1-消费者配置","children":[]},{"level":3,"title":"4.2. 同一消费者组中的多个监听器","slug":"_4-2-同一消费者组中的多个监听器","link":"#_4-2-同一消费者组中的多个监听器","children":[]},{"level":3,"title":"4.3. 不同消费者组中的多个监听器","slug":"_4-3-不同消费者组中的多个监听器","link":"#_4-3-不同消费者组中的多个监听器","children":[]}]},{"level":2,"title":"5. 使用不同的监听器策略","slug":"_5-使用不同的监听器策略","link":"#_5-使用不同的监听器策略","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720411179000,"updatedTime":1720411179000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.11,"words":1533},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Spring Kafka  Configure Multiple Listeners on Same Topic.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本文中，我们将通过一个实际示例学习如何为同一个Kafka主题配置多个监听器。</p>\\n<p>如果这是您第一次在Spring上配置Kafka，最好从我们的Apache Kafka与Spring入门开始。</p>\\n<h2>2. 项目设置</h2>\\n<p>让我们构建一个书籍消费者服务，监听图书馆内新到的书籍，并为不同目的消费它们，如全文内容搜索、价格索引或用户通知。</p>\\n<p>首先，让我们创建一个Spring Boot服务，并使用<code>spring-kafka</code>依赖项：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.springframework.kafka`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`spring-kafka`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
