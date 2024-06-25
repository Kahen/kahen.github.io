import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as e}from"./app-DpEqAHhK.js";const t={},p=e(`<h1 id="在apache-camel中记录日志" tabindex="-1"><a class="header-anchor" href="#在apache-camel中记录日志"><span>在Apache Camel中记录日志</span></a></h1><p>记录日志在软件开发中至关重要，它有助于记录应用程序的每一个足迹。它有助于跟踪应用程序的活动和状态。基本上，它对于调试非常有用。</p><p>Apache Camel提供了一个组件、接口和拦截器来记录消息和交换。它通过为各种日志框架提供一层抽象来简化记录日志。</p><p>在本教程中，我们将探讨在Camel应用程序中记录消息和交换的四种方式。</p><h2 id="_2-使用log-eip" tabindex="-1"><a class="header-anchor" href="#_2-使用log-eip"><span>2. 使用Log EIP</span></a></h2><p>Apache Camel 2.2提供了一个轻量级的_log()_ DSL，用于从路由中记录人类可读的消息。其主要用途是快速将消息输出到日志控制台。此外，我们还可以与Camel Simple表达式语言一起使用，以进一步将路由中的细节记录到日志控制台。</p><p>让我们看一个示例，它从一个文件夹复制文件到另一个文件夹：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">FileCopierCamelRoute</span> <span class="token keyword">extends</span> <span class="token class-name">RouteBuilder</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;file:data/inbox?noop=true&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;We got an incoming file \${file:name} containing: \${body}&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;file:data/outbox&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Successfully transfer file: \${file:name}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们配置了一个_RouteBuilder_，它将文件从_inbox_传输到_outbox_文件夹。首先，我们定义了传入文件的位置。接下来，我们使用_log()_ DSL输出有关传入文件及其内容的人类可读日志。我们还使用Simple表达式语言获取文件名和文件内容作为日志消息的一部分。</p><p>这里是日志输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>14:39:23.389 [Camel (camel-1) thread #1 - file://data/inbox] INFO  route1 - We got an incoming file welcome.txt containing: Welcome to Baeldung
14:39:23.423 [Camel (camel-1) thread #1 - file://data/inbox] INFO  route1 - Successfully transfer file: welcome.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><em>log()</em> DSL与Log组件和_Tracer_拦截器相比是轻量级的。</p><p>此外，我们可以明确指定日志级别和名称：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// ...</span>
<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">LoggingLevel</span><span class="token punctuation">.</span><span class="token constant">DEBUG</span><span class="token punctuation">,</span><span class="token string">&quot;Output Process&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;The Process \${id}&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们在传递日志消息之前指定了日志级别和名称。我们还拥有WARN、TRACE和OFF作为日志级别选项。<strong>当未指定调试级别时，<em>log()</em> DSL使用INFO</strong>。</p><h2 id="_3-使用-processor-接口" tabindex="-1"><a class="header-anchor" href="#_3-使用-processor-接口"><span>3. 使用_Processor_接口</span></a></h2><p>_Processor_是Apache Camel中的一个重要接口，它提供了对交换的访问，以便进一步操作。它使我们能够灵活地更改交换体。然而，我们也可以使用它来输出人类可读的日志消息。</p><p>首先，_Processor_不是日志工具。因此，我们需要创建一个_Logger_实例来使用它。Apache Camel默认使用SLF4J库。让我们创建一个_Logger_实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> <span class="token constant">LOGGER</span> <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">FileCopierCamelRoute</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们看一个示例，它将消息传递给bean进行进一步操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;file:data/inbox?noop=true&quot;</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;log:com.baeldung.apachecamellogging?level=INFO&quot;</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">process</span><span class="token punctuation">(</span>process <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
         <span class="token constant">LOGGER</span><span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;We are passing the message to a FileProcessor bean to capitalize the message body&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token function">bean</span><span class="token punctuation">(</span><span class="token class-name">FileProcessor</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
     <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;file:data/outbox&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将传入的消息传递给_FileProcessor_ bean，以将文件内容转换为大写。然而，在将消息传递给bean进行处理之前，我们通过创建_Processor_的实例来记录一条信息。</p><p>最后，让我们看看日志输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>14:50:47.048 [Camel (camel-1) thread #1 - file://data/inbox] INFO  c.b.a.FileCopierCamelRoute - We are passing the message to a FileProcessor to Capitalize the message body
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从上面的输出中，自定义日志消息被输出到控制台。</p><h2 id="_4-使用log组件" tabindex="-1"><a class="header-anchor" href="#_4-使用log组件"><span>4. 使用Log组件</span></a></h2><p>Apache Camel提供了一个Log组件，帮助将Camel _Message_记录到控制台输出。<strong>要使用Log组件，我们可以将消息路由到它</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;file:data/inbox?noop=true&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;log:com.baeldung.apachecamellogging?level=INFO&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">bean</span><span class="token punctuation">(</span><span class="token class-name">FileProcessor</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;file:data/outbox&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;log:com.baeldung.apachecamellogging&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们在两个地方使用了Log组件。首先，我们通过使用_level_选项以INFO日志级别记录消息体。此外，我们在操作文件后记录了消息体，但我们没有指定日志级别。</p><p><strong>值得注意的是，在未指定日志级别的情况下，Log组件使用INFO级别作为默认</strong>。</p><p>这里是日志输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>09:36:32.432 [Camel (camel-1) thread #1 - file://data/inbox] INFO  com.baeldung.apachecamellogging - Exchange[ExchangePattern: InOnly, BodyType: org.apache.camel.component.file.GenericFile, Body: [Body is file based: GenericFile[welcome.txt]]]
09:36:32.454 [Camel (camel-1) thread #1 - file://data/inbox] INFO  com.baeldung.apachecamellogging - Exchange[ExchangePattern: InOnly, BodyType: String, Body: WELCOME TO BAELDUNG]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们可以通过添加_showBodyType_和_maxChars_选项来使输出不那么冗长：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;log:com.baeldung.apachecamellogging?showBodyType=false&amp;maxChars=20&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的代码中，我们忽略了消息体的时间，并将体字符流线化到20。</p><h2 id="_5-使用-tracer" tabindex="-1"><a class="header-anchor" href="#_5-使用-tracer"><span>5. 使用_Tracer_</span></a></h2><p>_Tracer_是Apache Camel架构的一部分，它有助于记录消息在运行时是如何路由的。<strong>它在路由过程中跟踪交换的快照</strong>。它可以拦截消息从一个节点移动到另一个节点。</p><p>要使用_Tracer_，我们必须在路由配置方法中启用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setTracing</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将启用_Tracer_拦截器，拦截所有交换过程并将它们记录到日志控制台。</p><p>让我们看一个启用_Tracer_以跟踪交换过程的示例代码：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setTracing</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;file:data/json?noop=true&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">unmarshal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token class-name">JsonLibrary<span class="token punctuation">.</span>Jackson</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">bean</span><span class="token punctuation">(</span><span class="token class-name">FileProcessor</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;transform&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">marshal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token class-name">JsonLibrary<span class="token punctuation">.</span>Jackson</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;file:data/output&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们从源复制一个JSON文件并将其转换为Camel可以操作的数据结构。我们将内容传递给一个bean以更改文件内容。接下来，我们将消息转换为JSON并将其发送到预期的目的地。</p><p>这是从_Tracer_拦截器的日志：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// ...
09:23:10.767 [Camel (camel-1) thread #1 - file://data/json] INFO  FileCopierTracerCamelRoute:14 - *--&gt; [route1      ] [from[file:data/json?noop=true]   ]
09:23:10.768 [Camel (camel-1) thread #1 - file://data/json] INFO  FileCopierTracerCamelRoute:14 -      [route1      ] [log:input?level=INFO             ]
// ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的输出中，_Tracer_记录了从生产者到消费者的每一个过程和交换。这对于调试非常有用。</p><p>值得注意的是，日志输出很详细，但为了简单起见，我们展示了基本的日志消息。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了在Apache Camel中记录日志的四种方式。此外，我们看到了使用_log()_ DSL、<em>Tracer</em>、_Processor_和Log组件将消息记录到控制台的示例。<em>log()</em> DSL和_Processor_接口非常适合人类可读的日志，而Log组件和_Tracer_适用于调试中使用的更复杂的日志。</p><p>如常，示例的源代码可在GitHub上获取。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,51),o=[p];function c(l,i){return s(),n("div",null,o)}const d=a(t,[["render",c],["__file","2024-06-19-Logging in Apache Camel.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-19-Logging%20in%20Apache%20Camel.html","title":"在Apache Camel中记录日志","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Apache Camel","Logging"],"tag":["Java","Apache Camel","Logging"],"head":[["meta",{"name":"keywords","content":"Apache Camel, Logging, Java, Software Development, Debugging"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-19-Logging%20in%20Apache%20Camel.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Apache Camel中记录日志"}],["meta",{"property":"og:description","content":"在Apache Camel中记录日志 记录日志在软件开发中至关重要，它有助于记录应用程序的每一个足迹。它有助于跟踪应用程序的活动和状态。基本上，它对于调试非常有用。 Apache Camel提供了一个组件、接口和拦截器来记录消息和交换。它通过为各种日志框架提供一层抽象来简化记录日志。 在本教程中，我们将探讨在Camel应用程序中记录消息和交换的四种方式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Apache Camel"}],["meta",{"property":"article:tag","content":"Logging"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Apache Camel中记录日志\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Apache Camel中记录日志 记录日志在软件开发中至关重要，它有助于记录应用程序的每一个足迹。它有助于跟踪应用程序的活动和状态。基本上，它对于调试非常有用。 Apache Camel提供了一个组件、接口和拦截器来记录消息和交换。它通过为各种日志框架提供一层抽象来简化记录日志。 在本教程中，我们将探讨在Camel应用程序中记录消息和交换的四种方式..."},"headers":[{"level":2,"title":"2. 使用Log EIP","slug":"_2-使用log-eip","link":"#_2-使用log-eip","children":[]},{"level":2,"title":"3. 使用_Processor_接口","slug":"_3-使用-processor-接口","link":"#_3-使用-processor-接口","children":[]},{"level":2,"title":"4. 使用Log组件","slug":"_4-使用log组件","link":"#_4-使用log组件","children":[]},{"level":2,"title":"5. 使用_Tracer_","slug":"_5-使用-tracer","link":"#_5-使用-tracer","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":5.47,"words":1642},"filePathRelative":"posts/baeldung/Archive/2024-06-19-Logging in Apache Camel.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>记录日志在软件开发中至关重要，它有助于记录应用程序的每一个足迹。它有助于跟踪应用程序的活动和状态。基本上，它对于调试非常有用。</p>\\n<p>Apache Camel提供了一个组件、接口和拦截器来记录消息和交换。它通过为各种日志框架提供一层抽象来简化记录日志。</p>\\n<p>在本教程中，我们将探讨在Camel应用程序中记录消息和交换的四种方式。</p>\\n<h2>2. 使用Log EIP</h2>\\n<p>Apache Camel 2.2提供了一个轻量级的_log()_ DSL，用于从路由中记录人类可读的消息。其主要用途是快速将消息输出到日志控制台。此外，我们还可以与Camel Simple表达式语言一起使用，以进一步将路由中的细节记录到日志控制台。</p>","autoDesc":true}');export{d as comp,m as data};
