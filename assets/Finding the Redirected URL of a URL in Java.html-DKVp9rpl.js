import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CZdUP17Q.js";const e={},p=t(`<h1 id="在java中查找url重定向后的url" tabindex="-1"><a class="header-anchor" href="#在java中查找url重定向后的url"><span>在Java中查找URL重定向后的URL</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>理解URL是如何重定向的对于网络开发和网络编程任务至关重要，例如处理HTTP重定向、验证URL重定向或提取最终目的地URL。在Java中，我们可以使用_HttpURLConnection_或_HttpClient_库来实现这一功能。</p><p><strong>在本教程中，我们将探讨在Java中查找给定URL重定向后的URL的不同方法。</strong></p><h2 id="_2-使用-httpurlconnection" tabindex="-1"><a class="header-anchor" href="#_2-使用-httpurlconnection"><span>2. 使用_HttpURLConnection_</span></a></h2><p>Java提供了_HttpURLConnection_类，它允许我们发出HTTP请求并处理响应。此外，我们可以使用_HttpURLConnection_来查找给定URL的重定向后的URL。以下是如何操作的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> canonicalUrl <span class="token operator">=</span> <span class="token string">&quot;http://www.baeldung.com/&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> expectedRedirectedUrl <span class="token operator">=</span> <span class="token string">&quot;https://www.baeldung.com/&quot;</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOriginalUrl_whenFindRedirectUrlUsingHttpURLConnection_thenCorrectRedirectedUrlReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">URL</span> url <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span>canonicalUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">HttpURLConnection</span> connection <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpURLConnection</span><span class="token punctuation">)</span> url<span class="token punctuation">.</span><span class="token function">openConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    connection<span class="token punctuation">.</span><span class="token function">setInstanceFollowRedirects</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> status <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">getResponseCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> redirectedUrl <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">==</span> <span class="token class-name">HttpURLConnection</span><span class="token punctuation">.</span><span class="token constant">HTTP_MOVED_PERM</span> <span class="token operator">||</span> status <span class="token operator">==</span> <span class="token class-name">HttpURLConnection</span><span class="token punctuation">.</span><span class="token constant">HTTP_MOVED_TEMP</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redirectedUrl <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">getHeaderField</span><span class="token punctuation">(</span><span class="token string">&quot;Location&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    connection<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedRedirectedUrl<span class="token punctuation">,</span> redirectedUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了原始URL字符串( <em>canonicalUrl</em>)和重定向后的URL( <em>expectedRedirectedUrl</em>)。然后，我们创建了一个_HttpURLConnection_对象并打开到原始URL的连接。</p><p>之后，我们将_instanceFollowRedirects_属性设置为_true_以启用自动重定向。<strong>接收到响应后，我们检查状态码以确定是否发生了重定向。如果发生了重定向，我们从“<em>Location</em>”头字段中检索重定向后的_URL_。</strong></p><p>最后，我们断开连接并断言检索到的重定向后的_URL_与预期的匹配。</p><h2 id="_3-使用apache-httpclient" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-httpclient"><span>3. 使用Apache <em>HttpClient</em></span></a></h2><p>另外，我们可以使用Apache <em>HttpClient</em>，这是一个更通用的Java HTTP客户端库。Apache _HttpClient_提供了更高级的功能和更好的支持来处理HTTP请求和响应。以下是我们如何使用Apache _HttpClient_来查找重定向后的URL：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenOriginalUrl_whenFindRedirectUrlUsingHttpClient_thenCorrectRedirectedUrlReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">RequestConfig</span> config <span class="token operator">=</span> <span class="token class-name">RequestConfig</span><span class="token punctuation">.</span><span class="token function">custom</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setRedirectsEnabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">CloseableHttpClient</span> httpClient <span class="token operator">=</span> <span class="token class-name">HttpClients</span><span class="token punctuation">.</span><span class="token function">custom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setDefaultRequestConfig</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">HttpGet</span> httpGet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpGet</span><span class="token punctuation">(</span>canonicalUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">CloseableHttpResponse</span> response <span class="token operator">=</span> httpClient<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>httpGet<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> statusCode <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getStatusLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> redirectedUrl <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>statusCode <span class="token operator">==</span> <span class="token class-name">HttpURLConnection</span><span class="token punctuation">.</span><span class="token constant">HTTP_MOVED_PERM</span> <span class="token operator">||</span> statusCode <span class="token operator">==</span> <span class="token class-name">HttpURLConnection</span><span class="token punctuation">.</span><span class="token constant">HTTP_MOVED_TEMP</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span>Header</span><span class="token punctuation">[</span><span class="token punctuation">]</span> headers <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getHeaders</span><span class="token punctuation">(</span><span class="token string">&quot;Location&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>headers<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    redirectedUrl <span class="token operator">=</span> headers<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token function">assertEquals</span><span class="token punctuation">(</span>expectedRedirectedUrl<span class="token punctuation">,</span> redirectedUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们首先配置请求以禁用自动重定向。随后，我们实例化一个_CloseableHttpClient_并发出到原始URL的_HttpGet_请求。</p><p>获取到响应后，我们分析状态码和头字段以确定是否发生了重定向。如果发生重定向，我们从_Location_头字段中提取重定向后的URL。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了正确处理重定向对于构建与外部资源交互的强大Web应用程序的重要性。我们已经探讨了如何使用_HttpURLConnection_和Apache _HttpClient_来查找给定URL的重定向后的URL。</p><p>如常，相关的源代码可以在GitHub上找到。</p><p>文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。</p>`,19),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","Finding the Redirected URL of a URL in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Finding%20the%20Redirected%20URL%20of%20a%20URL%20in%20Java.html","title":"在Java中查找URL重定向后的URL","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","Web Development"],"tag":["URL Redirection","Java","HttpURLConnection","HttpClient"],"head":[["meta",{"name":"keywords","content":"Java, URL Redirection, HttpURLConnection, HttpClient, Web Development"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Finding%20the%20Redirected%20URL%20of%20a%20URL%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中查找URL重定向后的URL"}],["meta",{"property":"og:description","content":"在Java中查找URL重定向后的URL 1. 引言 理解URL是如何重定向的对于网络开发和网络编程任务至关重要，例如处理HTTP重定向、验证URL重定向或提取最终目的地URL。在Java中，我们可以使用_HttpURLConnection_或_HttpClient_库来实现这一功能。 在本教程中，我们将探讨在Java中查找给定URL重定向后的URL的不..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"URL Redirection"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"HttpURLConnection"}],["meta",{"property":"article:tag","content":"HttpClient"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中查找URL重定向后的URL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中查找URL重定向后的URL 1. 引言 理解URL是如何重定向的对于网络开发和网络编程任务至关重要，例如处理HTTP重定向、验证URL重定向或提取最终目的地URL。在Java中，我们可以使用_HttpURLConnection_或_HttpClient_库来实现这一功能。 在本教程中，我们将探讨在Java中查找给定URL重定向后的URL的不..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用_HttpURLConnection_","slug":"_2-使用-httpurlconnection","link":"#_2-使用-httpurlconnection","children":[]},{"level":2,"title":"3. 使用Apache HttpClient","slug":"_3-使用apache-httpclient","link":"#_3-使用apache-httpclient","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.42,"words":726},"filePathRelative":"posts/baeldung/Archive/Finding the Redirected URL of a URL in Java.md","localizedDate":"2024年6月18日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>理解URL是如何重定向的对于网络开发和网络编程任务至关重要，例如处理HTTP重定向、验证URL重定向或提取最终目的地URL。在Java中，我们可以使用_HttpURLConnection_或_HttpClient_库来实现这一功能。</p>\\n<p><strong>在本教程中，我们将探讨在Java中查找给定URL重定向后的URL的不同方法。</strong></p>\\n<h2>2. 使用_HttpURLConnection_</h2>\\n<p>Java提供了_HttpURLConnection_类，它允许我们发出HTTP请求并处理响应。此外，我们可以使用_HttpURLConnection_来查找给定URL的重定向后的URL。以下是如何操作的示例：</p>","autoDesc":true}');export{d as comp,k as data};
