import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-LwwahXlT.js";const e={},p=t(`<hr><h1 id="spring的resttemplate中的uri变量编码" tabindex="-1"><a class="header-anchor" href="#spring的resttemplate中的uri变量编码"><span>Spring的RestTemplate中的URI变量编码</span></a></h1><p>在本教程中，我们将学习如何在Spring的RestTemplate上对URI变量进行编码。</p><p>我们面临的一个常见编码问题就是当我们有一个包含加号（+）的URI变量时。例如，如果我们有一个值为_http://localhost:8080/api/v1/plus+sign_的URI变量，加号将被编码为一个空格，这可能导致服务器响应意外。</p><p>让我们看看几种解决这个问题的方法。</p><h3 id="_2-1-spring-web依赖性" tabindex="-1"><a class="header-anchor" href="#_2-1-spring-web依赖性"><span>2.1. Spring Web依赖性</span></a></h3><p>首先，让我们将Spring Web Starter依赖性添加到我们的_pom.xml_中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.boot\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-boot-starter-web\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以使用Spring Initializr生成项目并添加依赖性。</p><h3 id="_2-2-resttemplate-bean" tabindex="-1"><a class="header-anchor" href="#_2-2-resttemplate-bean"><span>2.2. RestTemplate Bean</span></a></h3><p>接下来，我们将创建一个RestTemplate Bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RestTemplateConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-api调用" tabindex="-1"><a class="header-anchor" href="#_3-api调用"><span>3. API调用</span></a></h2><p>让我们创建一个服务类，调用公共API <em>http://httpbin.org/get</em>。</p><p>该API返回一个JSON响应，其中包含请求参数。例如，如果我们在浏览器中调用URL <em>https://httpbin.org/get?parameter=springboot</em>，我们会得到这样的响应：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;args&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;parameter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;springboot&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;headers&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;origin&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，_args_对象包含请求参数。其他值为了简洁起见省略了。</p><h3 id="_3-1-服务类" tabindex="-1"><a class="header-anchor" href="#_3-1-服务类"><span>3.1. 服务类</span></a></h3><p>让我们创建一个服务类，调用API并返回_parameter_键的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HttpBinService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">HttpBinService</span><span class="token punctuation">(</span><span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>restTemplate <span class="token operator">=</span> restTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> parameter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">&quot;http://httpbin.org/get?parameter={parameter}&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">ResponseEntity</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&gt;</span></span>\` response <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForEntity</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> parameter<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` args <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">)</span> response<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;args&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> args<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;parameter&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_get()<em>方法调用指定的URL，将响应解析为_Map</em>，并检索_args_对象中_field_参数的值。</p><h3 id="_3-2-测试" tabindex="-1"><a class="header-anchor" href="#_3-2-测试"><span>3.2. 测试</span></a></h3><p>让我们用两个参数——<em>springboot_和_spring+boot</em>——测试我们的服务类，并检查响应是否符合预期：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">HttpBinServiceTest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">HttpBinService</span> httpBinService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenWithoutPlusSign_whenGet_thenSameValueReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> parameterWithoutPlusSign <span class="token operator">=</span> <span class="token string">&quot;springboot&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> responseWithoutPlusSign <span class="token operator">=</span> httpBinService<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>parameterWithoutPlusSign<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span>parameterWithoutPlusSign<span class="token punctuation">,</span> responseWithoutPlusSign<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">givenWithPlusSign_whenGet_thenSameValueReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> parameterWithPlusSign <span class="token operator">=</span> <span class="token string">&quot;spring+boot&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> responseWithPlusSign <span class="token operator">=</span> httpBinService<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>parameterWithPlusSign<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span>parameterWithPlusSign<span class="token punctuation">,</span> responseWithPlusSign<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，我们将看到第二个测试失败。响应是_spring boot_而不是_spring+boot_。</p><h2 id="_4-使用resttemplate的interceptors" tabindex="-1"><a class="header-anchor" href="#_4-使用resttemplate的interceptors"><span>4. 使用RestTemplate的Interceptors</span></a></h2><p>我们可以使用拦截器对URI变量进行编码。</p><p>让我们创建一个实现_ClientHttpRequestInterceptor_接口的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UriEncodingInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">ClientHttpRequestInterceptor</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">ClientHttpResponse</span> <span class="token function">intercept</span><span class="token punctuation">(</span><span class="token class-name">HttpRequest</span> request<span class="token punctuation">,</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> body<span class="token punctuation">,</span> <span class="token class-name">ClientHttpRequestExecution</span> execution<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">HttpRequest</span> encodedRequest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpRequestWrapper</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">URI</span> <span class="token function">getURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">URI</span> uri <span class="token operator">=</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> escapedQuery <span class="token operator">=</span> uri<span class="token punctuation">.</span><span class="token function">getRawQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">&quot;+&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;%2B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token class-name">UriComponentsBuilder</span><span class="token punctuation">.</span><span class="token function">fromUri</span><span class="token punctuation">(</span>uri<span class="token punctuation">)</span>
                  <span class="token punctuation">.</span><span class="token function">replaceQuery</span><span class="token punctuation">(</span>escapedQuery<span class="token punctuation">)</span>
                  <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> execution<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>encodedRequest<span class="token punctuation">,</span> body<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们已经实现了_intercept()_方法。这个方法将在RestTemplate发出每个请求之前执行。</p><p>让我们分解代码：</p><ul><li>我们创建了一个新的_HttpRequest_对象，它包装了原始请求。</li><li>对于这个包装器，我们重写了_getURI()<em>方法以对URI变量进行编码。在这种情况下，我们在查询字符串中将加号替换为</em>%2B_。</li><li>使用_UriComponentsBuilder_，我们创建了一个新的_URI_并将查询字符串替换为编码后的查询字符串。</li><li>我们从_intercept()_方法返回编码后的请求，这将替换原始请求。</li></ul><h3 id="_4-1-添加拦截器" tabindex="-1"><a class="header-anchor" href="#_4-1-添加拦截器"><span>4.1. 添加拦截器</span></a></h3><p>接下来，我们需要将拦截器添加到RestTemplate Bean中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RestTemplateConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RestTemplate</span> restTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        restTemplate<span class="token punctuation">.</span><span class="token function">setInterceptors</span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">UriEncodingInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们再次运行测试，我们将看到它通过了。</p><p>**拦截器提供了改变我们想要的请求任何部分的灵活性。**它们对于添加额外的头或对请求中的字段进行更改等复杂场景可能很有帮助。</p><p>对于像我们的例子这样的简单任务，我们还可以使用_DefaultUriBuilderFactory_来改变编码。让我们看看如何做到这一点。</p><h2 id="_5-使用-defaulturibuilderfactory" tabindex="-1"><a class="header-anchor" href="#_5-使用-defaulturibuilderfactory"><span>5. 使用_DefaultUriBuilderFactory_</span></a></h2><p>另一种对URI变量进行编码的方法是通过改变RestTemplate内部使用的_DefaultUriBuilderFactory_对象。</p><p>默认情况下，URI构建器首先对整个URL进行编码，然后单独对值进行编码。我们将<strong>创建一个新的_DefaultUriBuilderFactory_对象，并将编码模式设置为_VALUES_ONLY._这限制了仅对值进行编码。</strong></p><p><strong>然后，我们可以使用_setUriTemplateHandler()_方法将新的_DefaultUriBuilderFactory_对象设置为我们的RestTemplate Bean。</strong></p><p>让我们使用这个来创建一个新的RestTemplate Bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RestTemplateConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">restTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RestTemplate</span> restTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">DefaultUriBuilderFactory</span> defaultUriBuilderFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultUriBuilderFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        defaultUriBuilderFactory<span class="token punctuation">.</span><span class="token function">setEncodingMode</span><span class="token punctuation">(</span><span class="token class-name">DefaultUriBuilderFactory<span class="token punctuation">.</span>EncodingMode</span><span class="token punctuation">.</span><span class="token constant">VALUES_ONLY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        restTemplate<span class="token punctuation">.</span><span class="token function">setUriTemplateHandler</span><span class="token punctuation">(</span>defaultUriBuilderFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是对URI变量进行编码的另一种选择。同样，如果我们再次运行测试，我们将看到它通过了。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们看到了如何在RestTemplate请求中对URI变量进行编码。我们看到了两种方法——使用拦截器和改变_DefaultUriBuilderFactory_对象。</p><p>正如往常一样，本文中使用的所有代码示例都可以在GitHub上找到。</p>`,48),o=[p];function l(c,i){return a(),s("div",null,o)}const d=n(e,[["render",l],["__file","2024-07-10-Encoding of URI Variables on RestTemplate.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Encoding%20of%20URI%20Variables%20on%20RestTemplate.html","title":"Spring的RestTemplate中的URI变量编码","lang":"zh-CN","frontmatter":{"date":"2024-07-11T00:00:00.000Z","category":["Spring","RestTemplate"],"tag":["URI编码","RestTemplate"],"head":[["meta",{"name":"keywords","content":"Spring RestTemplate URI编码"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Encoding%20of%20URI%20Variables%20on%20RestTemplate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring的RestTemplate中的URI变量编码"}],["meta",{"property":"og:description","content":"Spring的RestTemplate中的URI变量编码 在本教程中，我们将学习如何在Spring的RestTemplate上对URI变量进行编码。 我们面临的一个常见编码问题就是当我们有一个包含加号（+）的URI变量时。例如，如果我们有一个值为_http://localhost:8080/api/v1/plus+sign_的URI变量，加号将被编码为..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T20:40:23.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"URI编码"}],["meta",{"property":"article:tag","content":"RestTemplate"}],["meta",{"property":"article:published_time","content":"2024-07-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T20:40:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring的RestTemplate中的URI变量编码\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T20:40:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring的RestTemplate中的URI变量编码 在本教程中，我们将学习如何在Spring的RestTemplate上对URI变量进行编码。 我们面临的一个常见编码问题就是当我们有一个包含加号（+）的URI变量时。例如，如果我们有一个值为_http://localhost:8080/api/v1/plus+sign_的URI变量，加号将被编码为..."},"headers":[{"level":3,"title":"2.1. Spring Web依赖性","slug":"_2-1-spring-web依赖性","link":"#_2-1-spring-web依赖性","children":[]},{"level":3,"title":"2.2. RestTemplate Bean","slug":"_2-2-resttemplate-bean","link":"#_2-2-resttemplate-bean","children":[]},{"level":2,"title":"3. API调用","slug":"_3-api调用","link":"#_3-api调用","children":[{"level":3,"title":"3.1. 服务类","slug":"_3-1-服务类","link":"#_3-1-服务类","children":[]},{"level":3,"title":"3.2. 测试","slug":"_3-2-测试","link":"#_3-2-测试","children":[]}]},{"level":2,"title":"4. 使用RestTemplate的Interceptors","slug":"_4-使用resttemplate的interceptors","link":"#_4-使用resttemplate的interceptors","children":[{"level":3,"title":"4.1. 添加拦截器","slug":"_4-1-添加拦截器","link":"#_4-1-添加拦截器","children":[]}]},{"level":2,"title":"5. 使用_DefaultUriBuilderFactory_","slug":"_5-使用-defaulturibuilderfactory","link":"#_5-使用-defaulturibuilderfactory","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720644023000,"updatedTime":1720644023000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.99,"words":1196},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Encoding of URI Variables on RestTemplate.md","localizedDate":"2024年7月11日","excerpt":"<hr>\\n<h1>Spring的RestTemplate中的URI变量编码</h1>\\n<p>在本教程中，我们将学习如何在Spring的RestTemplate上对URI变量进行编码。</p>\\n<p>我们面临的一个常见编码问题就是当我们有一个包含加号（+）的URI变量时。例如，如果我们有一个值为_http://localhost:8080/api/v1/plus+sign_的URI变量，加号将被编码为一个空格，这可能导致服务器响应意外。</p>\\n<p>让我们看看几种解决这个问题的方法。</p>\\n<h3>2.1. Spring Web依赖性</h3>\\n<p>首先，让我们将Spring Web Starter依赖性添加到我们的_pom.xml_中：</p>","autoDesc":true}');export{d as comp,k as data};
