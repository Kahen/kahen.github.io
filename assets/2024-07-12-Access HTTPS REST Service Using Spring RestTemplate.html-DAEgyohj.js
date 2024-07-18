import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-c243dxVF.js";const e={},p=t(`<h1 id="使用spring-resttemplate访问https-rest服务" tabindex="-1"><a class="header-anchor" href="#使用spring-resttemplate访问https-rest服务"><span>使用Spring RestTemplate访问HTTPS REST服务</span></a></h1><p>如果你正在研究Spring Security（特别是OAuth）的实现，一定要看看《学习Spring安全》课程。</p><p><strong>&gt;&gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将看到如何使用Spring的RestTemplate来消费一个使用HTTPS保护的REST服务。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p><strong>我们知道要保护REST服务，我们需要一个证书和一个从证书生成的密钥库。</strong> 我们可以从证书颁发机构（CA）获取证书，以确保应用程序在生产级应用中是安全和受信任的。</p><p>对于本文的目的，我们将在我们的示例应用程序中使用自签名证书。</p><p>我们将使用Spring的RestTemplate来消费HTTPS REST服务。</p><p><strong>首先，让我们创建一个控制器类_WelcomeController_，以及一个返回简单_String_响应的_/welcome_端点：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WelcomeController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/welcome&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">welcome</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token string">&quot;欢迎使用安全REST服务&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然后，让我们将密钥库添加到_src/main/resources_文件夹：</strong></p><p><strong>接下来，让我们将与密钥库相关的属性添加到我们的_application.properties_文件中：</strong></p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">server.port</span><span class="token punctuation">=</span><span class="token value attr-value">8443</span>
<span class="token key attr-name">server.servlet.context-path</span><span class="token punctuation">=</span><span class="token value attr-value">/</span>
<span class="token comment"># 密钥库使用的格式</span>
<span class="token key attr-name">server.ssl.key-store-type</span><span class="token punctuation">=</span><span class="token value attr-value">PKCS12</span>
<span class="token comment"># 包含证书的密钥库路径</span>
<span class="token key attr-name">server.ssl.key-store</span><span class="token punctuation">=</span><span class="token value attr-value">classpath:keystore/baeldung.p12</span>
<span class="token comment"># 生成证书时使用的密码</span>
<span class="token key attr-name">server.ssl.key-store-password</span><span class="token punctuation">=</span><span class="token value attr-value">password</span>
<span class="token comment"># 映射到证书的别名</span>
<span class="token key attr-name">server.ssl.key-alias</span><span class="token punctuation">=</span><span class="token value attr-value">baeldung</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以通过这个端点访问REST服务：<em>https://localhost:8443/welcome</em></p><h2 id="_3-消费安全rest服务" tabindex="-1"><a class="header-anchor" href="#_3-消费安全rest服务"><span>3. 消费安全REST服务</span></a></h2><p>Spring提供了一个方便的RestTemplate类来消费REST服务。</p><p>虽然消费一个简单的REST服务很直接，但当我们消费一个受保护的服务时，我们需要使用服务使用的证书/密钥库来定制RestTemplate。</p><p>接下来，让我们创建一个简单的RestTemplate对象，并通过添加所需的证书/密钥库来定制它。</p><h3 id="_3-1-创建resttemplate客户端" tabindex="-1"><a class="header-anchor" href="#_3-1-创建resttemplate客户端"><span>3.1. 创建RestTemplate客户端</span></a></h3><p><strong>让我们编写一个简单的控制器，使用RestTemplate来消费我们的REST服务：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RestTemplateClientController</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">WELCOME_URL</span> <span class="token operator">=</span> <span class="token string">&quot;https://localhost:8443/welcome&quot;</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/welcomeclient&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">greetMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> response <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span><span class="token constant">WELCOME_URL</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> response<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果我们运行我们的代码并访问_/welcomeclient_端点，我们会得到一个错误，因为没有找到访问受保护REST服务的有效证书：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">javax<span class="token punctuation">.</span>net<span class="token punctuation">.</span>ssl<span class="token punctuation">.</span></span>SSLHandshakeException</span><span class="token operator">:</span> <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>security<span class="token punctuation">.</span>validator<span class="token punctuation">.</span></span>ValidatorException</span><span class="token operator">:</span> <span class="token constant">PKIX</span> 路径构建失败<span class="token operator">:</span>
<span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>security<span class="token punctuation">.</span>provider<span class="token punctuation">.</span>certpath<span class="token punctuation">.</span></span>SunCertPathBuilderException</span><span class="token operator">:</span> 无法找到到请求目标的有效证书路径在 <span class="token class-name"><span class="token namespace">sun<span class="token punctuation">.</span>security<span class="token punctuation">.</span>ssl<span class="token punctuation">.</span></span>Alerts</span><span class="token punctuation">.</span><span class="token function">getSSLException</span><span class="token punctuation">(</span><span class="token class-name">Alerts</span><span class="token punctuation">.</span>java<span class="token operator">:</span><span class="token number">192</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将看到如何解决这个错误。</p><h3 id="_3-2-为https访问配置resttemplate" tabindex="-1"><a class="header-anchor" href="#_3-2-为https访问配置resttemplate"><span>3.2. 为HTTPS访问配置RestTemplate</span></a></h3><p>访问受保护REST服务的客户端应用程序应该在其_resources_文件夹中包含一个安全的密钥库。此外，RestTemplate本身需要被配置。</p><p><strong>首先，让我们将之前提到的密钥库_baeldung.p12_作为信任库添加到_/src/main/resources_文件夹中：</strong></p><p><strong>接下来，我们需要在_application.properties_文件中添加信任库的详细信息：</strong></p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">server.port</span><span class="token punctuation">=</span><span class="token value attr-value">8082</span>
<span class="token comment">#信任库位置</span>
<span class="token key attr-name">trust.store</span><span class="token punctuation">=</span><span class="token value attr-value">classpath:keystore/baeldung.p12</span>
<span class="token comment">#信任库密码</span>
<span class="token key attr-name">trust.store.password</span><span class="token punctuation">=</span><span class="token value attr-value">password</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最后，让我们通过添加信任库来定制RestTemplate：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomRestTemplateConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${trust.store}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Resource</span> trustStore<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${trust.store.password}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> trustStorePassword<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">KeyManagementException</span><span class="token punctuation">,</span> <span class="token class-name">NoSuchAlgorithmException</span><span class="token punctuation">,</span> <span class="token class-name">KeyStoreException</span><span class="token punctuation">,</span> <span class="token class-name">CertificateException</span><span class="token punctuation">,</span> <span class="token class-name">MalformedURLException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token class-name">SSLContext</span> sslContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SSLContextBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
         <span class="token punctuation">.</span><span class="token function">loadTrustMaterial</span><span class="token punctuation">(</span>trustStore<span class="token punctuation">.</span><span class="token function">getURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> trustStorePassword<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">SSLConnectionSocketFactory</span> sslConFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SSLConnectionSocketFactory</span><span class="token punctuation">(</span>sslContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">HttpClientConnectionManager</span> cm <span class="token operator">=</span> <span class="token class-name">PoolingHttpClientConnectionManagerBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setSSLSocketFactory</span><span class="token punctuation">(</span>sslConFactory<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">CloseableHttpClient</span> httpClient <span class="token operator">=</span> <span class="token class-name">HttpClients</span><span class="token punctuation">.</span><span class="token function">custom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setConnectionManager</span><span class="token punctuation">(</span>cm<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ClientHttpRequestFactory</span> requestFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpComponentsClientHttpRequestFactory</span><span class="token punctuation">(</span>httpClient<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span>requestFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们详细了解上述_restTemplate()_方法中的重要步骤。</p><p>首先，我们创建一个代表安全套接字协议实现的_SSLContext_对象。我们使用_SSLContextBuilder_类的_build()_方法来创建它。</p><p>我们使用_SSLContextBuilder_的_loadTrustMaterial_()方法将密钥库文件和凭据加载到_SSLContext_对象中。</p><p>然后，我们通过加载_SSLContext_来创建_SSLConnectionSocketFactory_，这是一个用于TSL和SSL连接的分层套接字工厂。这一步的目的是验证服务器是否在使用我们在前一步加载的受信任证书列表，即验证服务器。</p><p>现在，我们可以使用我们定制的RestTemplate来消费端点：<em>http://localhost:8082/welcomeclient</em></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. <strong>结论</strong></span></a></h2><p>在本文中，我们讨论了如何使用定制的RestTemplate来消费一个受保护的REST服务。</p><p>如往常一样，源代码可在GitHub上获取。</p>`,40),o=[p];function c(l,i){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-12-Access HTTPS REST Service Using Spring RestTemplate.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-12/2024-07-12-Access%20HTTPS%20REST%20Service%20Using%20Spring%20RestTemplate.html","title":"使用Spring RestTemplate访问HTTPS REST服务","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","OAuth"],"tag":["RestTemplate","HTTPS","SSL"],"head":[["meta",{"name":"keywords","content":"Spring, RestTemplate, HTTPS, SSL, 安全性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-12/2024-07-12-Access%20HTTPS%20REST%20Service%20Using%20Spring%20RestTemplate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring RestTemplate访问HTTPS REST服务"}],["meta",{"property":"og:description","content":"使用Spring RestTemplate访问HTTPS REST服务 如果你正在研究Spring Security（特别是OAuth）的实现，一定要看看《学习Spring安全》课程。 >> 学习Spring 安全 1. 概述 在本教程中，我们将看到如何使用Spring的RestTemplate来消费一个使用HTTPS保护的REST服务。 2. 设置 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-12T09:41:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"RestTemplate"}],["meta",{"property":"article:tag","content":"HTTPS"}],["meta",{"property":"article:tag","content":"SSL"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-12T09:41:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring RestTemplate访问HTTPS REST服务\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-12T09:41:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring RestTemplate访问HTTPS REST服务 如果你正在研究Spring Security（特别是OAuth）的实现，一定要看看《学习Spring安全》课程。 >> 学习Spring 安全 1. 概述 在本教程中，我们将看到如何使用Spring的RestTemplate来消费一个使用HTTPS保护的REST服务。 2. 设置 ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 消费安全REST服务","slug":"_3-消费安全rest服务","link":"#_3-消费安全rest服务","children":[{"level":3,"title":"3.1. 创建RestTemplate客户端","slug":"_3-1-创建resttemplate客户端","link":"#_3-1-创建resttemplate客户端","children":[]},{"level":3,"title":"3.2. 为HTTPS访问配置RestTemplate","slug":"_3-2-为https访问配置resttemplate","link":"#_3-2-为https访问配置resttemplate","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720777316000,"updatedTime":1720777316000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.55,"words":1065},"filePathRelative":"posts/baeldung/2024-07-12/2024-07-12-Access HTTPS REST Service Using Spring RestTemplate.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>如果你正在研究Spring Security（特别是OAuth）的实现，一定要看看《学习Spring安全》课程。</p>\\n<p><strong>&gt;&gt; 学习Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将看到如何使用Spring的RestTemplate来消费一个使用HTTPS保护的REST服务。</p>\\n<h2>2. 设置</h2>\\n<p><strong>我们知道要保护REST服务，我们需要一个证书和一个从证书生成的密钥库。</strong> 我们可以从证书颁发机构（CA）获取证书，以确保应用程序在生产级应用中是安全和受信任的。</p>","autoDesc":true}');export{d as comp,k as data};
