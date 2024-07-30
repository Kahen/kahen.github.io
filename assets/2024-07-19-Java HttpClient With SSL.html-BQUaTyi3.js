import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CbPcg273.js";const e={},p=t(`<hr><h1 id="java-httpclient-与-ssl" tabindex="-1"><a class="header-anchor" href="#java-httpclient-与-ssl"><span>Java HttpClient 与 SSL</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨如何使用 Java HttpClient 连接到 HTTPS URL。我们还将学习如何使用客户端连接到没有有效 SSL 证书的 URL。</p><p>在 Java 的旧版本中，我们更倾向于使用像 Apache HTTPClient 和 OkHttp 这样的库来连接服务器。在 Java 11 中，JDK 添加了一个改进的 HttpClient 库。</p><p>让我们探索如何使用它通过 SSL 调用服务。</p><h2 id="_2-使用-java-httpclient-调用-https-url" tabindex="-1"><a class="header-anchor" href="#_2-使用-java-httpclient-调用-https-url"><span>2. 使用 Java HttpClient 调用 HTTPS URL</span></a></h2><p>我们将使用测试用例来运行客户端代码。为了测试目的，我们将使用一个运行在 HTTPS 上的现有 URL。</p><p>让我们编写代码来设置客户端并调用服务：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpClient</span> httpClient <span class="token operator">=</span> <span class="token class-name">HttpClient</span><span class="token punctuation">.</span><span class="token function">newHttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">HttpRequest</span> request <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.google.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">HttpResponse</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` response <span class="token operator">=</span> httpClient<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token class-name">HttpResponse<span class="token punctuation">.</span>BodyHandlers</span><span class="token punctuation">.</span><span class="token function">ofString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们首先使用 <em>HttpClient.newHttpClient()</em> 方法创建了一个客户端。然后，我们创建了一个请求并设置了我们要访问的服务的 URL。最后，我们使用 <em>HttpClient.send()</em> 方法发送请求并收集响应——一个包含响应体的 <em>HttpResponse</em> 对象作为 <em>String</em>。</p><p>当我们将上述代码放入测试用例并执行以下断言时，我们将观察到它通过了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> response<span class="token punctuation">.</span><span class="token function">statusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-调用无效的-https-url" tabindex="-1"><a class="header-anchor" href="#_3-调用无效的-https-url"><span>3. 调用无效的 HTTPS URL</span></a></h2><p>现在，让我们将 URL 更改为另一个没有有效 SSL 证书的 URL。我们可以通过更改请求对象来实现：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpRequest</span> request <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span><span class="token string">&quot;https://wrong.host.badssl.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们再次运行测试时，我们得到以下错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Caused</span> by<span class="token operator">:</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>security<span class="token punctuation">.</span>cert<span class="token punctuation">.</span></span>CertificateException</span><span class="token operator">:</span> <span class="token class-name">No</span> subject alternative <span class="token constant">DNS</span> name matching wrong<span class="token punctuation">.</span>host<span class="token punctuation">.</span>badssl<span class="token punctuation">.</span>com found<span class="token punctuation">.</span>
  at java<span class="token punctuation">.</span>base<span class="token operator">/</span><span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>security<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>HostnameChecker</span><span class="token punctuation">.</span><span class="token function">matchDNS</span><span class="token punctuation">(</span><span class="token class-name">HostnameChecker</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">212</span><span class="token punctuation">)</span>
  at java<span class="token punctuation">.</span>base<span class="token operator">/</span><span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>security<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>HostnameChecker</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token class-name">HostnameChecker</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">103</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为 URL 没有有效的 SSL 证书。</p><h2 id="_4-绕过-ssl-证书验证" tabindex="-1"><a class="header-anchor" href="#_4-绕过-ssl-证书验证"><span>4. 绕过 SSL 证书验证</span></a></h2><h3 id="_4-1-使用模拟信任管理器" tabindex="-1"><a class="header-anchor" href="#_4-1-使用模拟信任管理器"><span>4.1. 使用模拟信任管理器</span></a></h3><p><strong>为了跳过 <em>HttpClient</em> 自动执行的验证，我们可以扩展默认的 <em>X509ExtendedTrustManager</em> 对象</strong>，这是负责检查 SSL 证书有效性的类，<strong>通过覆盖默认的业务逻辑为空方法</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">TrustManager</span> <span class="token constant">MOCK_TRUST_MANAGER</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">X509ExtendedTrustManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>security<span class="token punctuation">.</span>cert<span class="token punctuation">.</span></span>X509Certificate</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getAcceptedIssuers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>security<span class="token punctuation">.</span>cert<span class="token punctuation">.</span></span>X509Certificate</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkServerTrusted</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>security<span class="token punctuation">.</span>cert<span class="token punctuation">.</span></span>X509Certificate</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chain<span class="token punctuation">,</span> <span class="token class-name">String</span> authType<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CertificateException</span> <span class="token punctuation">{</span>
       <span class="token comment">// 空方法</span>
   <span class="token punctuation">}</span>
   <span class="token comment">// ... 其他 void 方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还需要将新的 <em>TrustManager</em> 实现提供给我们的 <em>HttpClient</em> 实例。为此，我们首先创建一个新的 <em>SSLContext</em> 实例，然后我们通过传递 <em>null</em> 作为 <em>KeyManager</em> 列表，刚刚创建的 <em>TrustManager</em> 数组，以及 <em>SecureRandom</em> 类的新实例（一个随机数生成器）来初始化对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">SSLContext</span> sslContext <span class="token operator">=</span> <span class="token class-name">SSLContext</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">&quot;SSL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// OR TLS</span>
sslContext<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">TrustManager</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token constant">DUMMY_TRUST_MANAGER</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">SecureRandom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们使用这个更新的 <em>SSLContext</em> 来构建我们现在表现良好的 <em>HttpClient</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpClient</span> httpClient <span class="token operator">=</span> <span class="token class-name">HttpClient</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sslContext</span><span class="token punctuation">(</span>sslContext<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在我们可以调用任何没有有效证书的 URL 以获得成功的响应：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">HttpRequest</span> request <span class="token operator">=</span> <span class="token class-name">HttpRequest</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URI</span><span class="token punctuation">(</span><span class="token string">&quot;https://wrong.host.badssl.com/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">HttpResponse</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` response <span class="token operator">=</span> httpClient<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> <span class="token class-name">HttpResponse<span class="token punctuation">.</span>BodyHandlers</span><span class="token punctuation">.</span><span class="token function">ofString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> response<span class="token punctuation">.</span><span class="token function">statusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在下一段中，我们将看到另一种方法，我们可以使用 JVM 标志禁用所有 HttpClient 请求的证书验证。</p><h3 id="_4-2-使用-jvm-禁用主机名验证标志" tabindex="-1"><a class="header-anchor" href="#_4-2-使用-jvm-禁用主机名验证标志"><span>4.2. 使用 JVM 禁用主机名验证标志</span></a></h3><p>作为解决我们上面得到的错误的最后选项，让我们看看绕过 SSL 证书验证的解决方案。</p><p>在 Apache HttpClient 中，我们可以修改客户端以绕过证书验证。然而，我们不能使用 Java HttpClient 这样做。<strong>我们必须依靠对 JVM 进行更改来禁用主机名验证。</strong></p><p>一种方法是将网站的证书导入到 Java KeyStore 中。这是一种常见的做法，如果只有少量内部可信网站，这是一个不错的选择。</p><p>然而，如果有很多网站或需要管理的环境太多，这可能会变得繁琐。在这种情况下，我们可以使用属性 <em>jdk.internal.httpclient.disableHostnameVerification</em> 来禁用主机名验证。</p><p>我们可以在运行应用程序时作为命令行参数设置此属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>java <span class="token operator">-</span><span class="token class-name">Djdk</span><span class="token punctuation">.</span>internal<span class="token punctuation">.</span>httpclient<span class="token punctuation">.</span>disableHostnameVerification<span class="token operator">=</span><span class="token boolean">true</span> <span class="token operator">-</span>jar target<span class="token operator">/</span>java<span class="token operator">-</span>httpclient<span class="token operator">-</span>ssl<span class="token operator">-</span><span class="token number">0.0</span><span class="token number">.1</span><span class="token operator">-</span><span class="token constant">SNAPSHOT</span><span class="token punctuation">.</span>jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>或者，我们可以</strong> <strong>在创建客户端之前以编程方式设置此属性</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Properties</span> props <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
props<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;jdk.internal.httpclient.disableHostnameVerification&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">HttpClient</span> httpClient <span class="token operator">=</span> <span class="token class-name">HttpClient</span><span class="token punctuation">.</span><span class="token function">newHttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在运行测试，我们将看到它通过了。</p><p><strong>我们应该注意到更改属性意味着所有请求都将禁用证书验证。</strong> <strong>这可能不是理想的，特别是在生产环境中。</strong> 然而，通常在非生产环境中引入此属性。</p><h2 id="_5-我们可以使用-java-httpclient-与-spring-一起使用吗" tabindex="-1"><a class="header-anchor" href="#_5-我们可以使用-java-httpclient-与-spring-一起使用吗"><span>5. 我们可以使用 Java HttpClient 与 Spring 一起使用吗？</span></a></h2><p>Spring 提供了两个流行的接口来发送 HTTP 请求：</p><ul><li><em>RestTemplate</em> 用于同步请求</li><li><em>WebClient</em> 用于同步和异步请求</li></ul><p>两者都可以与流行的 HTTP 客户端如 Apache HttpClient、OkHttp 和旧的 <em>HttpURLConnection</em> 一起使用。然而，<strong>我们不能将 Java HttpClient 插入这两个接口中</strong>。<strong>它被视为它们的替代品。</strong></p><p>我们可以使用 Java HttpClient 直接进行同步和异步请求，转换请求和响应，添加超时等。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了如何使用 Java HTTP 客户端连接到需要 SSL 的服务器。我们还查看了如何使用客户端连接到没有有效证书的 URL。</p><p>一如既往，这些示例的代码可以在 GitHub 上找到。</p>`,49),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","2024-07-19-Java HttpClient With SSL.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Java%20HttpClient%20With%20SSL.html","title":"Java HttpClient 与 SSL","lang":"zh-CN","frontmatter":{"date":"2024-07-19T00:00:00.000Z","category":["Java","HttpClient"],"tag":["SSL","HTTPS"],"head":[["meta",{"name":"keywords","content":"Java HttpClient, SSL, HTTPS"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Java%20HttpClient%20With%20SSL.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java HttpClient 与 SSL"}],["meta",{"property":"og:description","content":"Java HttpClient 与 SSL 1. 概述 在本教程中，我们将探讨如何使用 Java HttpClient 连接到 HTTPS URL。我们还将学习如何使用客户端连接到没有有效 SSL 证书的 URL。 在 Java 的旧版本中，我们更倾向于使用像 Apache HTTPClient 和 OkHttp 这样的库来连接服务器。在 Java 1..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T02:34:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"SSL"}],["meta",{"property":"article:tag","content":"HTTPS"}],["meta",{"property":"article:published_time","content":"2024-07-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T02:34:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java HttpClient 与 SSL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T02:34:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java HttpClient 与 SSL 1. 概述 在本教程中，我们将探讨如何使用 Java HttpClient 连接到 HTTPS URL。我们还将学习如何使用客户端连接到没有有效 SSL 证书的 URL。 在 Java 的旧版本中，我们更倾向于使用像 Apache HTTPClient 和 OkHttp 这样的库来连接服务器。在 Java 1..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 使用 Java HttpClient 调用 HTTPS URL","slug":"_2-使用-java-httpclient-调用-https-url","link":"#_2-使用-java-httpclient-调用-https-url","children":[]},{"level":2,"title":"3. 调用无效的 HTTPS URL","slug":"_3-调用无效的-https-url","link":"#_3-调用无效的-https-url","children":[]},{"level":2,"title":"4. 绕过 SSL 证书验证","slug":"_4-绕过-ssl-证书验证","link":"#_4-绕过-ssl-证书验证","children":[{"level":3,"title":"4.1. 使用模拟信任管理器","slug":"_4-1-使用模拟信任管理器","link":"#_4-1-使用模拟信任管理器","children":[]},{"level":3,"title":"4.2. 使用 JVM 禁用主机名验证标志","slug":"_4-2-使用-jvm-禁用主机名验证标志","link":"#_4-2-使用-jvm-禁用主机名验证标志","children":[]}]},{"level":2,"title":"5. 我们可以使用 Java HttpClient 与 Spring 一起使用吗？","slug":"_5-我们可以使用-java-httpclient-与-spring-一起使用吗","link":"#_5-我们可以使用-java-httpclient-与-spring-一起使用吗","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721356448000,"updatedTime":1721356448000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.33,"words":1300},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Java HttpClient With SSL.md","localizedDate":"2024年7月19日","excerpt":"<hr>\\n<h1>Java HttpClient 与 SSL</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨如何使用 Java HttpClient 连接到 HTTPS URL。我们还将学习如何使用客户端连接到没有有效 SSL 证书的 URL。</p>\\n<p>在 Java 的旧版本中，我们更倾向于使用像 Apache HTTPClient 和 OkHttp 这样的库来连接服务器。在 Java 11 中，JDK 添加了一个改进的 HttpClient 库。</p>\\n<p>让我们探索如何使用它通过 SSL 调用服务。</p>\\n<h2>2. 使用 Java HttpClient 调用 HTTPS URL</h2>","autoDesc":true}');export{k as comp,d as data};
