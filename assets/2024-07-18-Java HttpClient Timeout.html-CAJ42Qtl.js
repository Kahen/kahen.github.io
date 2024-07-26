import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-DpYLEM_u.js";const e={},p=t(`<hr><h1 id="java-httpclient-超时设置" tabindex="-1"><a class="header-anchor" href="#java-httpclient-超时设置"><span>Java HttpClient 超时设置</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将展示如何使用从 Java 11 开始提供的新的 Java HTTP 客户端设置超时。</p><p>如果我们需要刷新我们的知识，我们可以从 Java HTTP 客户端的教程开始。</p><p>另一方面，要学习如何使用旧库设置超时，请参见 <em>HttpUrlConnection</em>。</p><h2 id="_2-配置超时" tabindex="-1"><a class="header-anchor" href="#_2-配置超时"><span>2. 配置超时</span></a></h2><p>首先，我们需要设置一个 HttpClient 以便能够进行 HTTP 请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">HttpClient</span> <span class="token function">getHttpClientWithTimeout</span><span class="token punctuation">(</span><span class="token keyword">int</span> seconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">HttpClient</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">connectTimeout</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span>seconds<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中，我们创建了一个方法，返回一个配置了超时参数的 <em>HttpClient</em>。简单来说，<strong>我们使用建造者设计模式实例化一个 <em>HttpClient</em> 并使用 <em>connectTimeout</em> 方法配置超时</strong>。此外，使用静态方法 <em>ofSeconds</em>，我们创建了一个定义我们超时时间（以秒为单位）的 <em>Duration</em> 对象实例。</p><p>之后，我们检查 <em>HttpClient</em> 超时是否配置正确：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>httpClient<span class="token punctuation">.</span><span class="token function">connectTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token operator">::</span><span class="token function">toSeconds</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">ifPresent</span><span class="token punctuation">(</span>sec <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Timeout in seconds: &quot;</span> <span class="token operator">+</span> sec<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们使用 <em>connectTimeout</em> 方法获取超时时间。结果，它返回一个 <em>Duration</em> 的 <em>Optional</em>，我们将其映射到秒。</p><h2 id="_3-处理超时" tabindex="-1"><a class="header-anchor" href="#_3-处理超时"><span>3. 处理超时</span></a></h2><p>进一步，我们需要创建一个 <em>HttpRequest</em> 对象，我们的客户端将使用它来进行 HTTP 请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpRequest</span> httpRequest <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&quot;http://10.255.255.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为了模拟超时，我们向一个不可路由的 IP 地址发起调用。换句话说，所有的 TCP 数据包都会丢失，并在预定义的持续时间后强制超时。</p><p>现在，让我们更深入地了解如何处理超时。</p><h3 id="_3-1-处理同步调用超时" tabindex="-1"><a class="header-anchor" href="#_3-1-处理同步调用超时"><span>3.1. 处理同步调用超时</span></a></h3><p>例如，要使同步调用使用 <em>send</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpConnectTimeoutException</span> thrown <span class="token operator">=</span> <span class="token function">assertThrows</span><span class="token punctuation">(</span>
  <span class="token class-name">HttpConnectTimeoutException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> httpClient<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>httpRequest<span class="token punctuation">,</span> <span class="token class-name">HttpResponse<span class="token punctuation">.</span>BodyHandlers</span><span class="token punctuation">.</span><span class="token function">ofString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string">&quot;Expected send() to throw HttpConnectTimeoutException, but it didn&#39;t&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>thrown<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;timed out&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>同步调用强制捕获 <em>IOException</em>，而 <em>HttpConnectTimeoutException</em> 扩展了它</strong>。因此，在上述测试中，我们期望 <em>HttpConnectTimeoutException</em> 带有错误消息。</p><h3 id="_3-2-处理异步调用超时" tabindex="-1"><a class="header-anchor" href="#_3-2-处理异步调用超时"><span>3.2. 处理异步调用超时</span></a></h3><p>类似地，要使异步调用使用 <em>sendAsync</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` completableFuture <span class="token operator">=</span> httpClient<span class="token punctuation">.</span><span class="token function">sendAsync</span><span class="token punctuation">(</span>httpRequest<span class="token punctuation">,</span> <span class="token class-name">HttpResponse<span class="token punctuation">.</span>BodyHandlers</span><span class="token punctuation">.</span><span class="token function">ofString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">thenApply</span><span class="token punctuation">(</span><span class="token class-name">HttpResponse</span><span class="token operator">::</span><span class="token function">body</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">exceptionally</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span><span class="token operator">::</span><span class="token function">getMessage</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> response <span class="token operator">=</span> completableFuture<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">assertTrue</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;timed out&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述对 <em>sendAsync</em> 的调用返回了一个 <em>CompletableFuture<code>&lt;String&gt;</code></em>。因此，我们需要定义如何处理响应函数。具体来说，当没有发生错误时，我们从响应中获取正文。否则，我们从可抛出对象中获取错误消息。最后，我们通过等待最多 5 秒来从 <em>CompletableFuture</em> 获取结果。同样，这个请求在 3 秒后抛出我们期望的 <em>HttpConnectTimeoutException</em>。</p><h2 id="_4-在请求级别配置超时" tabindex="-1"><a class="header-anchor" href="#_4-在请求级别配置超时"><span>4. 在请求级别配置超时</span></a></h2><p>上述，我们为 <em>sync</em> 和 <em>async</em> 调用重用了同一个客户端实例。然而，我们可能希望为每个请求分别处理超时。同样，我们可以为单个请求设置超时：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpRequest</span> httpRequest <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&quot;http://10.255.255.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">timeout</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，我们使用 <em>timeout</em> 方法为这个请求设置超时。在这里，我们为这个请求配置了 1 秒的超时时间。</p><p><strong>客户端和请求之间的最小持续时间设置了请求的超时时间。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们成功地使用新的 Java HTTP 客户端配置了超时，并在超时溢出时优雅地处理了请求。</p><p>一如既往，示例的源代码可以在 GitHub 上找到。</p>`,34),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-18-Java HttpClient Timeout.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Java%20HttpClient%20Timeout.html","title":"Java HttpClient 超时设置","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","HTTP Client"],"tag":["Java","HttpClient","Timeout"],"head":[["meta",{"name":"keywords","content":"Java HttpClient, HTTP Client, Timeout"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Java%20HttpClient%20Timeout.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java HttpClient 超时设置"}],["meta",{"property":"og:description","content":"Java HttpClient 超时设置 1. 概述 在本教程中，我们将展示如何使用从 Java 11 开始提供的新的 Java HTTP 客户端设置超时。 如果我们需要刷新我们的知识，我们可以从 Java HTTP 客户端的教程开始。 另一方面，要学习如何使用旧库设置超时，请参见 HttpUrlConnection。 2. 配置超时 首先，我们需要设..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T13:20:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"HttpClient"}],["meta",{"property":"article:tag","content":"Timeout"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T13:20:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java HttpClient 超时设置\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T13:20:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java HttpClient 超时设置 1. 概述 在本教程中，我们将展示如何使用从 Java 11 开始提供的新的 Java HTTP 客户端设置超时。 如果我们需要刷新我们的知识，我们可以从 Java HTTP 客户端的教程开始。 另一方面，要学习如何使用旧库设置超时，请参见 HttpUrlConnection。 2. 配置超时 首先，我们需要设..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 配置超时","slug":"_2-配置超时","link":"#_2-配置超时","children":[]},{"level":2,"title":"3. 处理超时","slug":"_3-处理超时","link":"#_3-处理超时","children":[{"level":3,"title":"3.1. 处理同步调用超时","slug":"_3-1-处理同步调用超时","link":"#_3-1-处理同步调用超时","children":[]},{"level":3,"title":"3.2. 处理异步调用超时","slug":"_3-2-处理异步调用超时","link":"#_3-2-处理异步调用超时","children":[]}]},{"level":2,"title":"4. 在请求级别配置超时","slug":"_4-在请求级别配置超时","link":"#_4-在请求级别配置超时","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721308848000,"updatedTime":1721308848000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.83,"words":848},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Java HttpClient Timeout.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java HttpClient 超时设置</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将展示如何使用从 Java 11 开始提供的新的 Java HTTP 客户端设置超时。</p>\\n<p>如果我们需要刷新我们的知识，我们可以从 Java HTTP 客户端的教程开始。</p>\\n<p>另一方面，要学习如何使用旧库设置超时，请参见 <em>HttpUrlConnection</em>。</p>\\n<h2>2. 配置超时</h2>\\n<p>首先，我们需要设置一个 HttpClient 以便能够进行 HTTP 请求：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token class-name\\">HttpClient</span> <span class=\\"token function\\">getHttpClientWithTimeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> seconds<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token class-name\\">HttpClient</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">newBuilder</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">connectTimeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Duration</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">ofSeconds</span><span class=\\"token punctuation\\">(</span>seconds<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n      <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">build</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
