import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-c243dxVF.js";const e={},p=t(`<hr><h1 id="使用java-httpclient添加自定义http头" tabindex="-1"><a class="header-anchor" href="#使用java-httpclient添加自定义http头"><span>使用Java HttpClient添加自定义HTTP头</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Java 11 正式引入了 Java HttpClient。在此之前，当我们需要使用 HTTP 客户端时，通常会使用像 Apache HttpClient 这样的第三方库。</p><p>在这个简短的教程中，我们将看到如何使用 Java HttpClient <strong>添加自定义 HTTP 头</strong>。</p><p>我们可以使用 <em>HttpRequest.Builder</em> 对象的三种方法之一轻松添加自定义头：<em>header</em>、<em>headers</em> 或 <em>setHeader</em>。让我们看看它们的实际应用。</p><p><em>header()</em> 方法允许我们一次添加一个头。</p><p>我们可以像下面的例子一样多次添加相同的头名，它们都会被发送：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpClient</span> httpClient <span class="token operator">=</span> <span class="token class-name">HttpClient</span><span class="token punctuation">.</span><span class="token function">newHttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">HttpRequest</span> request <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;X-Our-Header-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value1&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;X-Our-Header-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;X-Our-Header-2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> httpClient<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token class-name">HttpResponse<span class="token punctuation">.</span>BodyHandlers</span><span class="token punctuation">.</span><span class="token function">ofString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想同时添加多个头，我们可以使用 <em>headers()</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpRequest</span> request <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">headers</span><span class="token punctuation">(</span><span class="token string">&quot;X-Our-Header-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;X-Our-Header-2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法还允许我们为一个头名添加多个值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpRequest</span> request <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">headers</span><span class="token punctuation">(</span><span class="token string">&quot;X-Our-Header-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;X-Our-Header-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以使用 <em>setHeader()</em> 方法添加一个头。但是，与 <em>header()</em> 方法不同，<strong>如果我们多次使用相同的头名，它将覆盖我们之前用该名称设置的任何先前头</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpRequest</span> request <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;X-Our-Header-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value1&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;X-Our-Header-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value2&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们的头的值将是“value2”。</p><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>总之，我们学习了使用 Java HttpClient 添加自定义 HTTP 头的不同方法。</p><p>一如既往，本文的示例代码可以在 GitHub 上找到。</p>`,19),o=[p];function c(u,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-18-Custom HTTP Header With the Java HttpClient.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Custom%20HTTP%20Header%20With%20the%20Java%20HttpClient.html","title":"使用Java HttpClient添加自定义HTTP头","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","HTTP Client"],"tag":["Java","HttpClient","Custom Header"],"head":[["meta",{"name":"keywords","content":"Java HttpClient, Custom HTTP Header"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Custom%20HTTP%20Header%20With%20the%20Java%20HttpClient.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java HttpClient添加自定义HTTP头"}],["meta",{"property":"og:description","content":"使用Java HttpClient添加自定义HTTP头 1. 概述 Java 11 正式引入了 Java HttpClient。在此之前，当我们需要使用 HTTP 客户端时，通常会使用像 Apache HttpClient 这样的第三方库。 在这个简短的教程中，我们将看到如何使用 Java HttpClient 添加自定义 HTTP 头。 我们可以使用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T00:30:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"HttpClient"}],["meta",{"property":"article:tag","content":"Custom Header"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T00:30:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java HttpClient添加自定义HTTP头\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T00:30:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java HttpClient添加自定义HTTP头 1. 概述 Java 11 正式引入了 Java HttpClient。在此之前，当我们需要使用 HTTP 客户端时，通常会使用像 Apache HttpClient 这样的第三方库。 在这个简短的教程中，我们将看到如何使用 Java HttpClient 添加自定义 HTTP 头。 我们可以使用..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721262603000,"updatedTime":1721262603000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.47,"words":442},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Custom HTTP Header With the Java HttpClient.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Java HttpClient添加自定义HTTP头</h1>\\n<h2>1. 概述</h2>\\n<p>Java 11 正式引入了 Java HttpClient。在此之前，当我们需要使用 HTTP 客户端时，通常会使用像 Apache HttpClient 这样的第三方库。</p>\\n<p>在这个简短的教程中，我们将看到如何使用 Java HttpClient <strong>添加自定义 HTTP 头</strong>。</p>\\n<p>我们可以使用 <em>HttpRequest.Builder</em> 对象的三种方法之一轻松添加自定义头：<em>header</em>、<em>headers</em> 或 <em>setHeader</em>。让我们看看它们的实际应用。</p>","autoDesc":true}');export{d as comp,k as data};
