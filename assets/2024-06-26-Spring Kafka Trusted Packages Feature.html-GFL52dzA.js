import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-B5SPsEv6.js";const e={},p=t(`<h1 id="spring-kafka可信包特性-baeldung" tabindex="-1"><a class="header-anchor" href="#spring-kafka可信包特性-baeldung"><span>Spring Kafka可信包特性 | Baeldung</span></a></h1><p>寻找理想的Linux发行版，用于在云中运行现代Spring应用程序？</p><p><strong>遇见Alpaquita Linux</strong>：轻量级、安全且功能强大，足以处理重负荷工作负载。</p><p>这个发行版是<strong>专门为运行Java应用程序而设计的</strong>。它基于Alpine，具有显著的增强功能，在高密度容器环境中表现出色，同时满足企业级安全标准。</p><p>具体来说，容器镜像大小比标准选项小约<strong>30%</strong>，并且消耗的RAM少至<strong>30%</strong>：</p><p><strong>&gt;&gt; 立即尝试Alpaquita容器。</strong></p><h3 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h3><p>在本教程中，我们将回顾Spring Kafka可信包特性。我们将看到它背后的动机以及它的用法。像往常一样，都有实际的例子。</p><h3 id="_2-先决条件" tabindex="-1"><a class="header-anchor" href="#_2-先决条件"><span>2. 先决条件</span></a></h3><p>通常，Spring Kafka模块允许我们作为用户指定一些关于我们发送的POJO的元数据。它通常以Kafka消息头的形式出现。例如，如果我们这样配置_ProducerFactory_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">ProducerFactory</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">SomeData</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">producerFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">JsonSerializer</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SomeData</span><span class="token punctuation">&gt;</span></span>\`\`\` jsonSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JsonSerializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    jsonSerializer<span class="token punctuation">.</span><span class="token function">setAddTypeInfo</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DefaultKafkaProducerFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>
      <span class="token function">producerFactoryConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token keyword">new</span> <span class="token class-name">StringOrBytesSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      jsonSerializer
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SomeData</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> type<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> status<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Instant</span> timestamp<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将使用上述配置的_kafkaTemplate_将新消息发送到一个主题：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendDataIntoKafka</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SomeData</span> someData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SomeData</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;active&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;sent&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    kafkaTemplate<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ProducerRecord</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&quot;sourceTopic&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> someData<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们将在Kafka消费者的控制台中看到以下消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CreateTime:1701021806470 __TypeId__:com.baeldung.example.SomeData null {&quot;id&quot;:&quot;1&quot;,&quot;type&quot;:&quot;active&quot;,&quot;status&quot;:&quot;sent&quot;,&quot;timestamp&quot;:1701021806.153965150}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所看到的，消息中POJO的类型信息在头文件中。这当然是Spring Kafka特性，Spring只识别。这意味着，从Kafka或其他框架的角度来看，这些头文件只是元数据。因此，我们可以假设这里的消费者和生产者都使用Spring来处理Kafka消息。</p><p>话虽如此，我们可以说，在某些情况下，这是一个相当有用的特性。当主题中的消息具有不同的负载架构时，为消费者提供负载类型的提示将是很好的。</p><p>然而，通常我们知道主题中可能出现的消息类型及其架构。因此，限制消费者将接受的可能的负载架构可能是一个好主意。这就是Spring Kafka可信包特性的用途。</p><h3 id="_4-使用示例" tabindex="-1"><a class="header-anchor" href="#_4-使用示例"><span>4. 使用示例</span></a></h3><p>可信包Spring Kafka特性在反序列化器级别上配置。如果配置了可信包，那么Spring将查找传入消息的类型头文件。然后，它将检查消息中提供的所有类型（键和值）是否受信任。</p><p>这基本上意味着键和值的Java类，指定在相应的头文件中，必须位于可信包内。如果一切正常，那么Spring将消息传递给进一步的反序列化。如果头文件不存在，那么Spring只会反序列化对象，而不会检查可信包：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">ConsumerFactory</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">SomeData</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">someDataConsumerFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">JsonDeserializer</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SomeData</span><span class="token punctuation">&gt;</span></span>\`\`\` payloadJsonDeserializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JsonDeserializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    payloadJsonDeserializer<span class="token punctuation">.</span><span class="token function">addTrustedPackages</span><span class="token punctuation">(</span><span class="token string">&quot;com.baeldung.example&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DefaultKafkaConsumerFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>
      <span class="token function">consumerConfigs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token keyword">new</span> <span class="token class-name">StringDeserializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      payloadJsonDeserializer
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还值得一提的是，如果用星号(*)替换具体包，Spring可以信任所有包：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">JsonDeserializer</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SomeData</span><span class="token punctuation">&gt;</span></span>\`\`\` payloadJsonDeserializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JsonDeserializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
payloadJsonDeserializer<span class="token punctuation">.</span><span class="token function">trustedPackages</span><span class="token punctuation">(</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，在这种情况下，使用可信包不会做任何事情，只会增加额外的开销。现在让我们跳到我们刚刚看到的特性背后的动机。</p><h3 id="_5-1-第一个动机-一致性" tabindex="-1"><a class="header-anchor" href="#_5-1-第一个动机-一致性"><span>5.1. 第一个动机：一致性</span></a></h3><p>这个特性很棒，有两个主要原因。首先，如果集群中出现问题，我们可以快速失败。想象一下，如果一个特定的生产者不小心在主题中发布了他不应该发布的消息。这可能会引起很多问题，特别是如果我们成功地反序列化了传入的消息。在这种情况下，整个系统的行为可能是未定义的。</p><p>因此，如果生产者发布包含类型信息的消息，并且消费者知道它信任哪些类型，那么所有这些都可以避免。当然，这假设生产者的消息类型与消费者期望的不同。但这个假设相当合理，因为生产者根本不应该在这个主题中发布消息。</p><h3 id="_5-2-第二个动机-安全" tabindex="-1"><a class="header-anchor" href="#_5-2-第二个动机-安全"><span>5.2. 第二个动机：安全</span></a></h3><p>但最重要的是安全问题。在我们之前的例子中，我们强调生产者无意中在主题中发布了消息。<strong>但那也可能是故意的攻击</strong>。恶意生产者可能会故意在特定主题中发布消息，以利用反序列化漏洞。因此，通过防止不需要的消息的反序列化，Spring提供了额外的安全措施来降低安全风险。</p><p><strong>真正重要的是要理解，可信包特性不是“头文件伪造”攻击的解决方案</strong>。在这种情况下，攻击者操纵消息的头文件，欺骗收件人相信消息是合的，并且来自可信来源。因此，通过提供正确的类型头文件，攻击者可能会欺骗Spring，后者将继续消息反序列化。但这个问题相当复杂，不是讨论的主题。总的来说，Spring只是提供了一个额外的安全措施，以最小化黑客成功的风险。</p><h3 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h3><p>在本文中，我们探讨了Spring Kafka可信包特性。这个特性为我们的分布式消息系统提供了额外的一致性和安全性。然而，至关重要的是要记住，可信包仍然容易受到头文件伪造攻击的威胁。尽管如此，Spring Kafka在提供额外的安全措施方面做得非常出色。</p><p>像往常一样，本文的源代码可以在GitHub上找到。</p>`,34),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-06-26-Spring Kafka Trusted Packages Feature.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-26/2024-06-26-Spring%20Kafka%20Trusted%20Packages%20Feature.html","title":"Spring Kafka可信包特性 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-26T00:00:00.000Z","category":["Spring Kafka","Trusted Packages"],"tag":["Alpaquita Linux","Java apps","Kafka message headers"],"head":[["meta",{"name":"keywords","content":"Spring Kafka, Trusted Packages, Alpaquita Linux, Java apps, Kafka message headers"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-26/2024-06-26-Spring%20Kafka%20Trusted%20Packages%20Feature.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Kafka可信包特性 | Baeldung"}],["meta",{"property":"og:description","content":"Spring Kafka可信包特性 | Baeldung 寻找理想的Linux发行版，用于在云中运行现代Spring应用程序？ 遇见Alpaquita Linux：轻量级、安全且功能强大，足以处理重负荷工作负载。 这个发行版是专门为运行Java应用程序而设计的。它基于Alpine，具有显著的增强功能，在高密度容器环境中表现出色，同时满足企业级安全标准。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-26T08:51:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Alpaquita Linux"}],["meta",{"property":"article:tag","content":"Java apps"}],["meta",{"property":"article:tag","content":"Kafka message headers"}],["meta",{"property":"article:published_time","content":"2024-06-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-26T08:51:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Kafka可信包特性 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-26T08:51:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Kafka可信包特性 | Baeldung 寻找理想的Linux发行版，用于在云中运行现代Spring应用程序？ 遇见Alpaquita Linux：轻量级、安全且功能强大，足以处理重负荷工作负载。 这个发行版是专门为运行Java应用程序而设计的。它基于Alpine，具有显著的增强功能，在高密度容器环境中表现出色，同时满足企业级安全标准。..."},"headers":[{"level":3,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":3,"title":"2. 先决条件","slug":"_2-先决条件","link":"#_2-先决条件","children":[]},{"level":3,"title":"4. 使用示例","slug":"_4-使用示例","link":"#_4-使用示例","children":[]},{"level":3,"title":"5.1. 第一个动机：一致性","slug":"_5-1-第一个动机-一致性","link":"#_5-1-第一个动机-一致性","children":[]},{"level":3,"title":"5.2. 第二个动机：安全","slug":"_5-2-第二个动机-安全","link":"#_5-2-第二个动机-安全","children":[]},{"level":3,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719391889000,"updatedTime":1719391889000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.92,"words":1476},"filePathRelative":"posts/baeldung/2024-06-26/2024-06-26-Spring Kafka Trusted Packages Feature.md","localizedDate":"2024年6月26日","excerpt":"\\n<p>寻找理想的Linux发行版，用于在云中运行现代Spring应用程序？</p>\\n<p><strong>遇见Alpaquita Linux</strong>：轻量级、安全且功能强大，足以处理重负荷工作负载。</p>\\n<p>这个发行版是<strong>专门为运行Java应用程序而设计的</strong>。它基于Alpine，具有显著的增强功能，在高密度容器环境中表现出色，同时满足企业级安全标准。</p>\\n<p>具体来说，容器镜像大小比标准选项小约<strong>30%</strong>，并且消耗的RAM少至<strong>30%</strong>：</p>\\n<p><strong>&gt;&gt; 立即尝试Alpaquita容器。</strong></p>","autoDesc":true}');export{k as comp,d as data};
