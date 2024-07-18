import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as e}from"./app-c243dxVF.js";const s={},p=e(`<hr><h1 id="java-httpclient-请求参数的添加" tabindex="-1"><a class="header-anchor" href="#java-httpclient-请求参数的添加"><span>Java HttpClient 请求参数的添加</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将讨论如何向 Java <em>HttpClient</em> 请求添加参数。</p><p>从 Java 11 开始，Java <em>HTTPClient</em> 作为内置功能提供。因此，我们可以在不使用像 Apache HttpClient 和 OkHttp 这样的第三方库的情况下发送 HTTP 请求。</p><p><em>HttpRequest.Builder</em> 通过构建器模式帮助我们轻松创建 HTTP 请求并添加参数。</p><p><strong>Java <em>HttpClient</em> API 没有提供任何方法来添加查询参数</strong>。尽管我们可以利用 Apache HttpClient 中的 <em>URIBuilder</em> 这样的第三方库来构建请求 URI 字符串。让我们看看仅使用 Java 11 中添加的功能会是什么样子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpRequest</span> request <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token class-name">HttpClient<span class="token punctuation">.</span>Version</span><span class="token punctuation">.</span><span class="token constant">HTTP_2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&quot;https://postman-echo.com/get?param1=value1&amp;param2=value2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们设置了 <em>version()</em> 方法以使用 HTTP 版本 2。Java <em>HTTPClient</em> 默认使用 HTTP 2。但是，如果服务器不支持使用 HTTP 2 的请求，版本将自动降级到 HTTP 1.1。</p><p>此外，我们使用了 <em>GET()</em> 作为 HTTP 请求方法，这是默认的。如果我们不指定 HTTP 请求方法，默认方法 GET 将被使用。</p><p>最后，我们还可以以默认配置的简洁形式编写相同的请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpRequest</span> request <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&quot;https://postman-echo.com/get?param1=value1&amp;param2=value2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在这个例子中，我们涵盖了如何向 Java <em>HTTPClient</em> 请求添加参数。所有这些示例和代码片段的实现都可以在 GitHub 上找到。</p><p>在示例中，我们使用了由 <em>https://postman-echo.com</em> 提供的示例 REST 端点。</p>`,15),o=[p];function i(c,l){return n(),t("div",null,o)}const m=a(s,[["render",i],["__file","2024-07-18-Adding Parameters to Java HttpClient Requests.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Adding%20Parameters%20to%20Java%20HttpClient%20Requests.html","title":"Java HttpClient 请求参数的添加","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Java","HttpClient"],"tag":["Java","HttpClient","参数"],"head":[["meta",{"name":"keywords","content":"Java HttpClient 请求参数"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Adding%20Parameters%20to%20Java%20HttpClient%20Requests.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java HttpClient 请求参数的添加"}],["meta",{"property":"og:description","content":"Java HttpClient 请求参数的添加 1. 引言 在本教程中，我们将讨论如何向 Java HttpClient 请求添加参数。 从 Java 11 开始，Java HTTPClient 作为内置功能提供。因此，我们可以在不使用像 Apache HttpClient 和 OkHttp 这样的第三方库的情况下发送 HTTP 请求。 HttpReq..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T02:08:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"HttpClient"}],["meta",{"property":"article:tag","content":"参数"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T02:08:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java HttpClient 请求参数的添加\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T02:08:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java HttpClient 请求参数的添加 1. 引言 在本教程中，我们将讨论如何向 Java HttpClient 请求添加参数。 从 Java 11 开始，Java HTTPClient 作为内置功能提供。因此，我们可以在不使用像 Apache HttpClient 和 OkHttp 这样的第三方库的情况下发送 HTTP 请求。 HttpReq..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721268505000,"updatedTime":1721268505000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.38,"words":413},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Adding Parameters to Java HttpClient Requests.md","localizedDate":"2022年11月1日","excerpt":"<hr>\\n<h1>Java HttpClient 请求参数的添加</h1>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将讨论如何向 Java <em>HttpClient</em> 请求添加参数。</p>\\n<p>从 Java 11 开始，Java <em>HTTPClient</em> 作为内置功能提供。因此，我们可以在不使用像 Apache HttpClient 和 OkHttp 这样的第三方库的情况下发送 HTTP 请求。</p>\\n<p><em>HttpRequest.Builder</em> 通过构建器模式帮助我们轻松创建 HTTP 请求并添加参数。</p>\\n<p><strong>Java <em>HttpClient</em> API 没有提供任何方法来添加查询参数</strong>。尽管我们可以利用 Apache HttpClient 中的 <em>URIBuilder</em> 这样的第三方库来构建请求 URI 字符串。让我们看看仅使用 Java 11 中添加的功能会是什么样子：</p>","autoDesc":true}');export{m as comp,d as data};
