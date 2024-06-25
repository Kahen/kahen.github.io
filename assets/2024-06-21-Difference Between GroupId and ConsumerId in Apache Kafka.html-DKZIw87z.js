import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as s}from"./app-CSWuVURq.js";const t={},o=s(`<h1 id="apache-kafka中groupid和consumerid的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#apache-kafka中groupid和consumerid的区别-baeldung"><span>Apache Kafka中GroupId和ConsumerId的区别 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将阐明Apache Kafka中GroupId和ConsumerId的区别，这对于正确设置消费者至关重要。此外，我们还将讨论ClientId与ConsumerId的区别以及它们之间的关联。</p><h2 id="_2-消费者组" tabindex="-1"><a class="header-anchor" href="#_2-消费者组"><span>2. 消费者组</span></a></h2><p>在探讨Apache Kafka中标识符类型的区别之前，让我们先了解消费者组。</p><p><strong>消费者组由多个协同工作以从一个或多个主题中消费消息的消费者组成</strong>，实现并行消息处理。它们在分布式Kafka环境中实现了可扩展性、容错性和高效的消息并行处理。</p><p>关键的是，<strong>组内的每个消费者只负责处理其主题的一个子集</strong>，即分区。</p><h2 id="_3-理解标识符" tabindex="-1"><a class="header-anchor" href="#_3-理解标识符"><span>3. 理解标识符</span></a></h2><p>接下来，让我们在本教程中定义我们考虑的所有标识符：</p><ul><li>GroupId唯一标识一个消费者组。</li><li>ClientId唯一标识传递到服务器的请求。</li><li>ConsumerId分配给消费者组内的个别消费者，是_client.id_消费者属性和消费者的唯一标识符的组合。</li></ul><h2 id="_4-标识符的目的" tabindex="-1"><a class="header-anchor" href="#_4-标识符的目的"><span>4. 标识符的目的</span></a></h2><p>接下来，让我们理解每个标识符的目的。</p><p><strong>GroupId是负载均衡机制的核心，使分区能够在消费者之间分配。</strong> 消费者组管理同一组内消费者之间的协调、负载均衡和分区分配。Kafka确保在任何给定时间只有一个消费者可以访问每个分区。如果组内的消费者失败，Kafka会无缝地将分区重新分配给其他消费者，以维持消息处理的连续性。</p><p><strong>Kafka使用ConsumerIds确保组内每个消费者在与Kafka代理交互时都是唯一可识别的。</strong> 这个由Kafka完全管理的标识符用于管理消费者偏移量和跟踪从分区处理消息的进度。</p><p><strong>最后，ClientId通过允许开发者配置一个将在服务器端请求日志中包含的逻辑应用程序名称，来跟踪请求的来源，超出了仅仅是IP/端口。</strong> 因为我们可以控制这个值，我们可以创建两个具有相同ClientId的不同的客户端。然而，在这种情况下，由Kafka生成的ConsumerId将是不同的。</p><h2 id="_5-配置groupid和consumerid" tabindex="-1"><a class="header-anchor" href="#_5-配置groupid和consumerid"><span>5. 配置GroupId和ConsumerId</span></a></h2><h3 id="_5-1-使用spring-kafka" tabindex="-1"><a class="header-anchor" href="#_5-1-使用spring-kafka"><span>5.1. 使用Spring Kafka</span></a></h3><p>让我们在Spring Kafka中为我们的消费者定义GroupId和ConsumerId。我们将通过使用@KafkaListener注解来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>topics <span class="token operator">=</span> <span class="token string">&quot;\${kafka.topic.name:test-topic}&quot;</span><span class="token punctuation">,</span> clientIdPrefix <span class="token operator">=</span> <span class="token string">&quot;neo&quot;</span><span class="token punctuation">,</span> groupId <span class="token operator">=</span> <span class="token string">&quot;\${kafka.consumer.groupId:test-consumer-group}&quot;</span><span class="token punctuation">,</span> concurrency <span class="token operator">=</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">receive</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Payload</span> <span class="token class-name">String</span> payload<span class="token punctuation">,</span> <span class="token class-name">Consumer</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` consumer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Consumer=&#39;{}&#39; received payload=&#39;{}&#39;&quot;</span><span class="token punctuation">,</span> consumer<span class="token punctuation">.</span><span class="token function">groupMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">memberId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> payload<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>payload <span class="token operator">=</span> payload<span class="token punctuation">;</span>

    latch<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们如何将_groupId_属性指定为我们选择的任意值。</p><p>此外，我们设置了_clientIdPrefix_属性以包含自定义前缀。让我们检查应用程序日志以验证ConsumerId是否包含此前缀：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>c.b.s.kafka.groupId.MyKafkaConsumer      : Consumer=&#39;neo-1-bae916e4-eacb-485a-9c58-bc22a0eb6187&#39; received payload=&#39;Test 123...&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>value of <em>consumerId,</em> also known as <em>memberId,</em> follows a specific pattern. It starts with the <em>clientIdPrefix</em>, followed by a counter based on the number of consumers in the group, and finally, a <em>UUID</em>. <em>consumerId_的值，也称为_memberId</em>，遵循特定模式。它以_clientIdPrefix_开头，然后是根据组内消费者数量的计数器，最后是一个_UUID</em>。</p><h3 id="_5-2-使用kafka-cli" tabindex="-1"><a class="header-anchor" href="#_5-2-使用kafka-cli"><span>5.2. 使用Kafka CLI</span></a></h3><p>我们还可以通过CLI配置GroupId和ConsumerId。我们将使用_kafka-console-consumer.sh_脚本。让我们启动一个控制台消费者，将_group.id_设置为_test-consumer-group_，并将_client.id_属性设置为_neo-<code>&lt;sequence_number&gt;</code>_：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ kafka-console-consumer.sh --bootstrap-server localhost:9092 <span class="token parameter variable">--topic</span> Test <span class="token parameter variable">--group</span> test-consumer-group --consumer-property <span class="token string">&quot;client.id=neo-1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这种情况下，我们必须确保每个客户端都被分配一个唯一的_client.id_。这与Spring Kafka的行为不同，在那里我们设置_clientIdPrefix_，然后框架在其后添加序列号。如果我们_describe_消费者组，我们将看到Kafka为每个消费者生成的ConsumerId：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>kafka-consumer-groups.sh --bootstrap-server localhost:9092 <span class="token parameter variable">--group</span> test-consumer-group <span class="token parameter variable">--describe</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结"><span>6. 总结</span></a></h2><p>让我们总结一下我们讨论的三个标识符之间的主要区别：</p><table><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td><strong>维度</strong></td><td><strong>GroupId</strong></td><td><strong>ConsumerId</strong></td></tr><tr><td><strong>它识别什么？</strong></td><td>消费者组</td><td>消费者组内的个别消费者</td></tr><tr><td><strong>它的值来自哪里？</strong></td><td>开发者设置GroupId</td><td>Kafka基于_client.id_消费者属性生成ConsumerId</td></tr><tr><td><strong>它是唯一的吗？</strong></td><td>如果两个消费者组有相同的GroupId，它们实际上是一个</td><td>Kafka确保每个消费者有一个唯一值</td></tr></tbody></table><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们查看了与Kafka消费者相关的一些关键标识符：GroupId、ClientId和ConsumerId。我们现在理解了它们的目的以及如何配置它们。</p><p>如常，完整的源代码可在GitHub上找到。翻译已经完成，以下是剩余部分：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>GROUP               TOPIC           PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG             CONSUMER-ID                                HOST            CLIENT-ID
test-consumer-group Test            <span class="token number">0</span>          <span class="token number">0</span>               <span class="token number">0</span>               <span class="token number">0</span>               neo-1-975feb3f-9e5a-424b-9da3-c2ec3bc475d6 /127.0.0.1      neo-1
test-consumer-group Test            <span class="token number">1</span>          <span class="token number">0</span>               <span class="token number">0</span>               <span class="token number">0</span>               neo-1-975feb3f-9e5a-424b-9da3-c2ec3bc475d6 /127.0.0.1      neo-1
test-consumer-group Test            <span class="token number">2</span>          <span class="token number">0</span>               <span class="token number">0</span>               <span class="token number">0</span>               neo-1-975feb3f-9e5a-424b-9da3-c2ec3bc475d6 /127.0.0.1      neo-1
test-consumer-group Test            <span class="token number">3</span>          <span class="token number">0</span>               <span class="token number">0</span>               <span class="token number">0</span>               neo-1-975feb3f-9e5a-424b-9da3-c2ec3bc475d6 /127.0.0.1      neo-1
test-consumer-group Test            <span class="token number">7</span>          <span class="token number">0</span>               <span class="token number">0</span>               <span class="token number">0</span>               neo-3-09b8d4ee-5f03-4386-94b1-e068320b5e6a /127.0.0.1      neo-3
test-consumer-group Test            <span class="token number">8</span>          <span class="token number">0</span>               <span class="token number">0</span>               <span class="token number">0</span>               neo-3-09b8d4ee-5f03-4386-94b1-e068320b5e6a /127.0.0.1      neo-3
test-consumer-group Test            <span class="token number">9</span>          <span class="token number">0</span>               <span class="token number">0</span>               <span class="token number">0</span>               neo-3-09b8d4ee-5f03-4386-94b1-e068320b5e6a /127.0.0.1      neo-3
test-consumer-group Test            <span class="token number">4</span>          <span class="token number">0</span>               <span class="token number">0</span>               <span class="token number">0</span>               neo-2-6a39714e-4bdd-4ab8-bc8c-5463d78032ec /127.0.0.1      neo-2
test-consumer-group Test            <span class="token number">5</span>          <span class="token number">0</span>               <span class="token number">0</span>               <span class="token number">0</span>               neo-2-6a39714e-4bdd-4ab8-bc8c-5463d78032ec /127.0.0.1      neo-2
test-consumer-group Test            <span class="token number">6</span>          <span class="token number">0</span>               <span class="token number">0</span>               <span class="token number">0</span>               neo-2-6a39714e-4bdd-4ab8-bc8c-5463d78032ec /127.0.0.1      neo-2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OK</p>`,36),p=[o];function r(c,l){return e(),a("div",null,p)}const u=n(t,[["render",r],["__file","2024-06-21-Difference Between GroupId and ConsumerId in Apache Kafka.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Difference%20Between%20GroupId%20and%20ConsumerId%20in%20Apache%20Kafka.html","title":"Apache Kafka中GroupId和ConsumerId的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Apache Kafka","GroupId vs ConsumerId"],"tag":["GroupId","ConsumerId"],"head":[["meta",{"name":"keywords","content":"Apache Kafka, GroupId, ConsumerId, 消费者组, 消费者标识"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Difference%20Between%20GroupId%20and%20ConsumerId%20in%20Apache%20Kafka.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Kafka中GroupId和ConsumerId的区别 | Baeldung"}],["meta",{"property":"og:description","content":"Apache Kafka中GroupId和ConsumerId的区别 | Baeldung 1. 引言 在本教程中，我们将阐明Apache Kafka中GroupId和ConsumerId的区别，这对于正确设置消费者至关重要。此外，我们还将讨论ClientId与ConsumerId的区别以及它们之间的关联。 2. 消费者组 在探讨Apache Kafk..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T20:49:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"GroupId"}],["meta",{"property":"article:tag","content":"ConsumerId"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T20:49:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Kafka中GroupId和ConsumerId的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T20:49:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Kafka中GroupId和ConsumerId的区别 | Baeldung 1. 引言 在本教程中，我们将阐明Apache Kafka中GroupId和ConsumerId的区别，这对于正确设置消费者至关重要。此外，我们还将讨论ClientId与ConsumerId的区别以及它们之间的关联。 2. 消费者组 在探讨Apache Kafk..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 消费者组","slug":"_2-消费者组","link":"#_2-消费者组","children":[]},{"level":2,"title":"3. 理解标识符","slug":"_3-理解标识符","link":"#_3-理解标识符","children":[]},{"level":2,"title":"4. 标识符的目的","slug":"_4-标识符的目的","link":"#_4-标识符的目的","children":[]},{"level":2,"title":"5. 配置GroupId和ConsumerId","slug":"_5-配置groupid和consumerid","link":"#_5-配置groupid和consumerid","children":[{"level":3,"title":"5.1. 使用Spring Kafka","slug":"_5-1-使用spring-kafka","link":"#_5-1-使用spring-kafka","children":[]},{"level":3,"title":"5.2. 使用Kafka CLI","slug":"_5-2-使用kafka-cli","link":"#_5-2-使用kafka-cli","children":[]}]},{"level":2,"title":"6. 总结","slug":"_6-总结","link":"#_6-总结","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1719002963000,"updatedTime":1719002963000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.9,"words":1470},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Difference Between GroupId and ConsumerId in Apache Kafka.md","localizedDate":"2024年6月22日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将阐明Apache Kafka中GroupId和ConsumerId的区别，这对于正确设置消费者至关重要。此外，我们还将讨论ClientId与ConsumerId的区别以及它们之间的关联。</p>\\n<h2>2. 消费者组</h2>\\n<p>在探讨Apache Kafka中标识符类型的区别之前，让我们先了解消费者组。</p>\\n<p><strong>消费者组由多个协同工作以从一个或多个主题中消费消息的消费者组成</strong>，实现并行消息处理。它们在分布式Kafka环境中实现了可扩展性、容错性和高效的消息并行处理。</p>\\n<p>关键的是，<strong>组内的每个消费者只负责处理其主题的一个子集</strong>，即分区。</p>","autoDesc":true}');export{u as comp,m as data};
