import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BMOUrRO4.js";const t={},i=e(`<h1 id="如何解决spring-webflux中的databufferlimitexception" tabindex="-1"><a class="header-anchor" href="#如何解决spring-webflux中的databufferlimitexception"><span>如何解决Spring Webflux中的DataBufferLimitException</span></a></h1><p>在本教程中，我们将探讨为什么在Spring Webflux应用程序中可能会出现_DataBufferLimitException_，并查看解决此问题的不同方法。</p><h3 id="_2-1-什么是-databufferlimitexception" tabindex="-1"><a class="header-anchor" href="#_2-1-什么是-databufferlimitexception"><span>2.1. 什么是_DataBufferLimitException?_</span></a></h3><p>Spring WebFlux限制了在编解码器中的内存缓冲数据量，以避免应用程序内存问题。<strong>默认情况下，这个配置设置为262,144字节</strong>。当这不足以满足我们的用例时，我们将遇到_DataBufferLimitException_。</p><h3 id="_2-2-什么是-编解码器-codec" tabindex="-1"><a class="header-anchor" href="#_2-2-什么是-编解码器-codec"><span>2.2. 什么是_编解码器（Codec）?_</span></a></h3><p>_spring-web_和_spring-core_模块通过非阻塞I/O和反应式流背压提供了将字节内容序列化和反序列化为更高级对象的支持。<em>编解码器_提供了Java序列化的一种替代方案。一个优点是，通常对象不需要实现_Serializable</em>。</p><h3 id="_3-1-重现问题" tabindex="-1"><a class="header-anchor" href="#_3-1-重现问题"><span>3.1. 重现问题</span></a></h3><p>让我们尝试向我们的Spring Webflux服务器应用程序发送一个390KB大小的JSON负载来创建异常。我们将使用_curl_命令向服务器发送_POST_请求：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">--location</span> <span class="token parameter variable">--request</span> POST <span class="token string">&#39;http://localhost:8080/1.0/process&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--header</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token punctuation">\\</span>
  --data-binary <span class="token string">&#39;@/tmp/390KB.json&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，抛出了_DataBufferLimitException_：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>org.springframework.core.io.buffer.DataBufferLimitException: Exceeded limit on max bytes to buffer : 262144
  at org.springframework.core.io.buffer.LimitedDataBufferList.raiseLimitException(LimitedDataBufferList.java:99) ~[spring-core-5.3.23.jar:5.3.23]
  Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException:
Error has been observed at the following site(s):
  *__checkpoint ⇢ HTTP POST &quot;/1.0/process&quot; [ExceptionHandlingWebHandler]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-解决方案" tabindex="-1"><a class="header-anchor" href="#_3-2-解决方案"><span>3.2. 解决方案</span></a></h3><p>我们可以使用_WebFluxConfigurer_接口来配置这些阈值。为此，我们将添加一个新的配置类，<em>WebFluxConfiguration</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebFluxConfiguration</span> <span class="token keyword">implements</span> <span class="token class-name">WebFluxConfigurer</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configureHttpMessageCodecs</span><span class="token punctuation">(</span><span class="token class-name">ServerCodecConfigurer</span> configurer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        configurer<span class="token punctuation">.</span><span class="token function">defaultCodecs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">maxInMemorySize</span><span class="token punctuation">(</span><span class="token number">500</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还需要更新我们的应用程序属性：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring</span><span class="token punctuation">:</span>
<span class="token key attr-name">  codec</span><span class="token punctuation">:</span>
<span class="token key attr-name">    max-in-memory-size</span><span class="token punctuation">:</span> <span class="token value attr-value">500KB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-重现问题" tabindex="-1"><a class="header-anchor" href="#_4-1-重现问题"><span>4.1. 重现问题</span></a></h3><p>现在让我们使用Webflux的_WebClient_来重现相同的行为。让我们创建一个处理器，它使用390KB的负载调用服务器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Mono</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Users</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> webClient
      <span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">&quot;/1.0/process&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token class-name">BodyInserters</span><span class="token punctuation">.</span><span class="token function">fromPublisher</span><span class="token punctuation">(</span><span class="token function">readRequestBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Users</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">exchangeToMono</span><span class="token punctuation">(</span>clientResponse <span class="token operator">-&gt;</span> clientResponse<span class="token punctuation">.</span><span class="token function">bodyToMono</span><span class="token punctuation">(</span><span class="token class-name">Users</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再次看到抛出了相同的异常，但这次是因为_webClient_尝试发送的负载超过了允许的大小：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>org.springframework.core.io.buffer.DataBufferLimitException: Exceeded limit on max bytes to buffer : 262144
  at org.springframework.core.io.buffer.LimitedDataBufferList.raiseLimitException(LimitedDataBufferList.java:99) ~[spring-core-5.3.23.jar:5.3.23]
  Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException:
Error has been observed at the following site(s):
    *__checkpoint ⇢ Body from POST http://localhost:8080/1.0/process [DefaultClientResponse]
    *__checkpoint ⇢ Handler com.baeldung.spring.reactive.springreactiveexceptions.handler.TriggerHandler@428eedd9 [DispatcherHandler]
    *__checkpoint ⇢ HTTP POST &quot;/1.0/trigger&quot; [ExceptionHandlingWebHandler]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-解决方案" tabindex="-1"><a class="header-anchor" href="#_4-2-解决方案"><span>4.2. 解决方案</span></a></h3><p>我们也有程序化的方式来配置web客户端以实现这个目标。让我们创建一个具有以下配置的_WebClient_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">&quot;progWebClient&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">WebClient</span> <span class="token function">getProgSelfWebClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">WebClient</span>
      <span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">baseUrl</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">exchangeStrategies</span><span class="token punctuation">(</span><span class="token class-name">ExchangeStrategies</span>
        <span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">codecs</span><span class="token punctuation">(</span>codecs <span class="token operator">-&gt;</span> codecs
          <span class="token punctuation">.</span><span class="token function">defaultCodecs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">maxInMemorySize</span><span class="token punctuation">(</span><span class="token number">500</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还需要更新我们的应用程序属性：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring</span><span class="token punctuation">:</span>
<span class="token key attr-name">  codec</span><span class="token punctuation">:</span>
<span class="token key attr-name">    max-in-memory-size</span><span class="token punctuation">:</span> <span class="token value attr-value">500KB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这些配置，我们现在应该能够从应用程序发送大于500KB的有效负载。值得注意的是，此配置应用于整个应用程序，这意味着对所有web客户端和服务器本身都有效。</p><p>因此，如果我们只想为特定的web客户端配置此限制，那么这并不是一个理想的解决方案。此外，这种方法有一个缺点。用于创建WebClients的构建器必须像下面这样由Spring自动装配：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token string">&quot;webClient&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">WebClient</span> <span class="token function">getSelfWebClient</span><span class="token punctuation">(</span><span class="token class-name">WebClient<span class="token punctuation">.</span>Builder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> builder<span class="token punctuation">.</span><span class="token function">baseUrl</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们了解了_DataBufferLimitException_是什么，并查看了如何在服务器和客户端两侧修复它们。我们查看了两种方法，基于属性配置和程序化配置。我们希望这个异常再也不会给你带来麻烦。</p><p>如常，完整的代码可以在GitHub上找到。</p>`,32),p=[i];function o(c,l){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","2024-07-13-How to Resolve Spring Webflux DataBufferLimitException.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-How%20to%20Resolve%20Spring%20Webflux%20DataBufferLimitException.html","title":"如何解决Spring Webflux中的DataBufferLimitException","lang":"zh-CN","frontmatter":{"date":"2024-07-13T00:00:00.000Z","category":["Spring Webflux","DataBufferLimitException"],"tag":["WebFlux","Reactive Programming"],"head":[["meta",{"name":"keywords","content":"Spring Webflux, Reactive Programming, DataBufferLimitException, Configuration, WebFluxConfigurer"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-How%20to%20Resolve%20Spring%20Webflux%20DataBufferLimitException.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何解决Spring Webflux中的DataBufferLimitException"}],["meta",{"property":"og:description","content":"如何解决Spring Webflux中的DataBufferLimitException 在本教程中，我们将探讨为什么在Spring Webflux应用程序中可能会出现_DataBufferLimitException_，并查看解决此问题的不同方法。 2.1. 什么是_DataBufferLimitException?_ Spring WebFlux限..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T14:04:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"WebFlux"}],["meta",{"property":"article:tag","content":"Reactive Programming"}],["meta",{"property":"article:published_time","content":"2024-07-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T14:04:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何解决Spring Webflux中的DataBufferLimitException\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T14:04:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何解决Spring Webflux中的DataBufferLimitException 在本教程中，我们将探讨为什么在Spring Webflux应用程序中可能会出现_DataBufferLimitException_，并查看解决此问题的不同方法。 2.1. 什么是_DataBufferLimitException?_ Spring WebFlux限..."},"headers":[{"level":3,"title":"2.1. 什么是_DataBufferLimitException?_","slug":"_2-1-什么是-databufferlimitexception","link":"#_2-1-什么是-databufferlimitexception","children":[]},{"level":3,"title":"2.2. 什么是_编解码器（Codec）?_","slug":"_2-2-什么是-编解码器-codec","link":"#_2-2-什么是-编解码器-codec","children":[]},{"level":3,"title":"3.1. 重现问题","slug":"_3-1-重现问题","link":"#_3-1-重现问题","children":[]},{"level":3,"title":"3.2. 解决方案","slug":"_3-2-解决方案","link":"#_3-2-解决方案","children":[]},{"level":3,"title":"4.1. 重现问题","slug":"_4-1-重现问题","link":"#_4-1-重现问题","children":[]},{"level":3,"title":"4.2. 解决方案","slug":"_4-2-解决方案","link":"#_4-2-解决方案","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720879483000,"updatedTime":1720879483000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3,"words":901},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-How to Resolve Spring Webflux DataBufferLimitException.md","localizedDate":"2024年7月13日","excerpt":"\\n<p>在本教程中，我们将探讨为什么在Spring Webflux应用程序中可能会出现_DataBufferLimitException_，并查看解决此问题的不同方法。</p>\\n<h3>2.1. 什么是_DataBufferLimitException?_</h3>\\n<p>Spring WebFlux限制了在编解码器中的内存缓冲数据量，以避免应用程序内存问题。<strong>默认情况下，这个配置设置为262,144字节</strong>。当这不足以满足我们的用例时，我们将遇到_DataBufferLimitException_。</p>\\n<h3>2.2. 什么是_编解码器（Codec）?_</h3>","autoDesc":true}');export{d as comp,m as data};
