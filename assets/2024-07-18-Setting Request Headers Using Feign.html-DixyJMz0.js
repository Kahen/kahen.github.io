import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const e={},p=t(`<hr><h1 id="使用feign设置请求头" tabindex="-1"><a class="header-anchor" href="#使用feign设置请求头"><span>使用Feign设置请求头</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>有时在使用Feign时，我们需要在HTTP调用中设置请求头。Feign允许我们通过声明性语法简单地构建HTTP客户端。</p><p>在这个简短的教程中，我们将看到如何使用注解配置请求头。我们还将看到如何通过使用拦截器包含常见的请求头。</p><h2 id="_2-示例" tabindex="-1"><a class="header-anchor" href="#_2-示例"><span>2. 示例</span></a></h2><p>在整个教程中，我们将使用一个暴露REST API端点的书店应用程序作为示例。</p><p>我们可以轻松地克隆项目并在本地运行：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn <span class="token function">install</span> spring-boot:run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们深入了解客户端实现。</p><p>让我们考虑一个场景，特定的API调用应始终包含一个静态头。在这种情况下，我们可能会将该请求头作为客户端的一部分进行配置。一个典型的例子是包含一个_Content-Type_头。</p><p>使用_@Header_注解，我们可以轻松配置一个静态请求头。我们可以静态或动态地定义此头的值。</p><p>让我们在_BookClient_中配置两个静态头，即_Accept-Language_和_Content-Type_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Headers</span><span class="token punctuation">(</span><span class="token string">&quot;Accept-Language: en-US&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookClient</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestLine</span><span class="token punctuation">(</span><span class="token string">&quot;GET /{isbn}&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">BookResource</span> <span class="token function">findByIsbn</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;isbn&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> isbn<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestLine</span><span class="token punctuation">(</span><span class="token string">&quot;POST&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Headers</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type: application/json&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Book</span> book<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，由于_Accept-Language_头应用于_BookClient_，因此该头包含在所有API中。然而，_create_方法有额外的_Content-Type_头。</p><p>接下来，让我们看看如何使用Feign的_Builder_方法创建_BookClient_并传递_HEADERS_日志级别：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Feign</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">encoder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">GsonEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">decoder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">GsonDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">logger</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Slf4jLogger</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">logLevel</span><span class="token punctuation">(</span><span class="token class-name">Logger<span class="token punctuation">.</span>Level</span><span class="token punctuation">.</span><span class="token constant">HEADERS</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">target</span><span class="token punctuation">(</span><span class="token class-name">BookClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;http://localhost:8081/api/books&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们测试_create_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> isbn <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Book</span> book <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span>isbn<span class="token punctuation">,</span> <span class="token string">&quot;Me&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;It&#39;s me!&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

bookClient<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>book<span class="token punctuation">)</span><span class="token punctuation">;</span>

book <span class="token operator">=</span> bookClient<span class="token punctuation">.</span><span class="token function">findByIsbn</span><span class="token punctuation">(</span>isbn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们在输出日志中验证头：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">18</span>:01:15.039 <span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG c.b.f.c.h.staticheader.BookClient - <span class="token punctuation">[</span>BookClient<span class="token comment">#create] Accept-Language: en-US</span>
<span class="token number">18</span>:01:15.039 <span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG c.b.f.c.h.staticheader.BookClient - <span class="token punctuation">[</span>BookClient<span class="token comment">#create] Content-Type: application/json</span>
<span class="token number">18</span>:01:15.096 <span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG c.b.f.c.h.staticheader.BookClient - <span class="token punctuation">[</span>BookClient<span class="token comment">#findByIsbn] Accept-Language: en-US</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意，如果<strong>客户端接口和API方法中的头名称相同</strong>，它们不会相互覆盖。相反，请求将包含所有这些值。</p><p>使用_@Header_注解，我们还可以设置一个动态头值。为此，我们需要将值表示为占位符。</p><p>让我们将_x-requester-id_头包含到_BookClient_中，占位符为_requester_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Headers</span><span class="token punctuation">(</span><span class="token string">&quot;x-requester-id: {requester}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookClient</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestLine</span><span class="token punctuation">(</span><span class="token string">&quot;GET /{isbn}&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">BookResource</span> <span class="token function">findByIsbn</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;requester&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> requester<span class="token punctuation">,</span> <span class="token annotation punctuation">@Param</span><span class="token punctuation">(</span><span class="token string">&quot;isbn&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> isbn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使_x-requester-id_成为一个变量，该变量被传递到每个方法中。我们使用**<em>@Param_注解来匹配变量的名称**。它在运行时扩展以满足由</em>@Headers_注解指定的头。</p><p>现在，让我们用_x-requester-id_头调用_BookClient_ API：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> requester <span class="token operator">=</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">;</span>
book <span class="token operator">=</span> bookClient<span class="token punctuation">.</span><span class="token function">findByIsbn</span><span class="token punctuation">(</span>requester<span class="token punctuation">,</span> isbn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们在输出日志中验证请求头：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">18</span>:04:27.515 <span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG c.b.f.c.h.s.parameterized.BookClient - <span class="token punctuation">[</span>BookClient<span class="token comment">#findByIsbn] x-requester-id: test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们想象一个场景，头键和值都是动态的。在这种情况下，可能的键的范围事先未知。此外，同一客户端上的不同方法调用之间的头可能会有所不同。一个典型的例子是设置某些元数据头。</p><p>使用带有_@HeaderMap_注解的_Map_参数设置动态头：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RequestLine</span><span class="token punctuation">(</span><span class="token string">&quot;POST&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">void</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token annotation punctuation">@HeaderMap</span> <span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` headers<span class="token punctuation">,</span> <span class="token class-name">Book</span> book<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们尝试使用头映射测试_create_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Map</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\`\` headerMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
headerMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;metadata-key1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;metadata-value1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
headerMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;metadata-key2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;metadata-value2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

bookClient<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>headerMap<span class="token punctuation">,</span> book<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们在输出日志中验证头：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">18</span>:05:03.202 <span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG c.b.f.c.h.dynamicheader.BookClient - <span class="token punctuation">[</span>BookClient<span class="token comment">#create] metadata-key1: metadata-value1</span>
<span class="token number">18</span>:05:03.202 <span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG c.b.f.c.h.dynamicheader.BookClient - <span class="token punctuation">[</span>BookClient<span class="token comment">#create] metadata-key2: metadata-value2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-请求拦截器" tabindex="-1"><a class="header-anchor" href="#_5-请求拦截器"><span>5. 请求拦截器</span></a></h2><p>拦截器可以执行各种隐式任务，如记录或为每个请求或响应进行身份验证。</p><p>Feign提供了一个_RequestInterceptor_接口。通过这个接口，我们可以添加请求头。</p><p>当知道应该在每个调用中包含头时，添加请求拦截器是有意义的。这种模式消除了调用代码实现非功能性需求（如身份验证或跟踪）的依赖。</p><p>让我们通过实现一个_AuthorisationService_来生成授权令牌来尝试这个：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApiAuthorisationService</span> <span class="token keyword">implements</span> <span class="token class-name">AuthorisationService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAuthToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Bearer &quot;</span> <span class="token operator">+</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让们实现我们的自定义请求拦截器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AuthRequestInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">RequestInterceptor</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">AuthorisationService</span> authTokenService<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">AuthRequestInterceptor</span><span class="token punctuation">(</span><span class="token class-name">AuthorisationService</span> authTokenService<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>authTokenService <span class="token operator">=</span> authTokenService<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">RequestTemplate</span> template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        template<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">&quot;Authorisation&quot;</span><span class="token punctuation">,</span> authTokenService<span class="token punctuation">.</span><span class="token function">getAuthToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到<strong>请求拦截器可以读取、删除或更改请求模板的任何部分</strong>。</p><p>现在，让我们使用_builder_方法将_AuthInterceptor_添加到_BookClient_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Feign</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">requestInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AuthInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ApiAuthorisationService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">encoder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">GsonEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">decoder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">GsonDecoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">logger</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Slf4jLogger</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">logLevel</span><span class="token punctuation">(</span><span class="token class-name">Logger<span class="token punctuation">.</span>Level</span><span class="token punctuation">.</span><span class="token constant">HEADERS</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">target</span><span class="token punctuation">(</span><span class="token class-name">BookClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">&quot;http://localhost:8081/api/books&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们用_Authorisation_头测试_BookClient_ API：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>bookClient<span class="token punctuation">.</span><span class="token function">findByIsbn</span><span class="token punctuation">(</span><span class="token string">&quot;0151072558&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们在输出日志中验证头：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">18</span>:06:06.135 <span class="token punctuation">[</span>main<span class="token punctuation">]</span> DEBUG c.b.f.c.h.staticheader.BookClient - <span class="token punctuation">[</span>BookClient<span class="token comment">#findByIsbn] Authorisation: Bearer 629e0af7-513d-4385-a5ef-cb9b341cedb5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>多个请求拦截器也可以应用于Feign客户端</strong>。尽管没有保证它们被应用的顺序。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们讨论了Feign客户端如何支持设置请求头。我们使用_@Headers_、_@HeaderMaps_注解和请求拦截器实现了这一点。</p><p>一如既往，本教程中展示的所有代码示例都可以在GitHub上找到。</p>`,56),o=[p];function c(i,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-18-Setting Request Headers Using Feign.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Setting%20Request%20Headers%20Using%20Feign.html","title":"使用Feign设置请求头","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Spring"],"tag":["Feign","HTTP","REST"],"head":[["meta",{"name":"keywords","content":"Java, Feign, HTTP, REST"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Setting%20Request%20Headers%20Using%20Feign.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Feign设置请求头"}],["meta",{"property":"og:description","content":"使用Feign设置请求头 1. 概述 有时在使用Feign时，我们需要在HTTP调用中设置请求头。Feign允许我们通过声明性语法简单地构建HTTP客户端。 在这个简短的教程中，我们将看到如何使用注解配置请求头。我们还将看到如何通过使用拦截器包含常见的请求头。 2. 示例 在整个教程中，我们将使用一个暴露REST API端点的书店应用程序作为示例。 我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T12:09:48.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Feign"}],["meta",{"property":"article:tag","content":"HTTP"}],["meta",{"property":"article:tag","content":"REST"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T12:09:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Feign设置请求头\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T12:09:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Feign设置请求头 1. 概述 有时在使用Feign时，我们需要在HTTP调用中设置请求头。Feign允许我们通过声明性语法简单地构建HTTP客户端。 在这个简短的教程中，我们将看到如何使用注解配置请求头。我们还将看到如何通过使用拦截器包含常见的请求头。 2. 示例 在整个教程中，我们将使用一个暴露REST API端点的书店应用程序作为示例。 我..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 示例","slug":"_2-示例","link":"#_2-示例","children":[]},{"level":2,"title":"5. 请求拦截器","slug":"_5-请求拦截器","link":"#_5-请求拦截器","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721304588000,"updatedTime":1721304588000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.43,"words":1330},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Setting Request Headers Using Feign.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Feign设置请求头</h1>\\n<h2>1. 概述</h2>\\n<p>有时在使用Feign时，我们需要在HTTP调用中设置请求头。Feign允许我们通过声明性语法简单地构建HTTP客户端。</p>\\n<p>在这个简短的教程中，我们将看到如何使用注解配置请求头。我们还将看到如何通过使用拦截器包含常见的请求头。</p>\\n<h2>2. 示例</h2>\\n<p>在整个教程中，我们将使用一个暴露REST API端点的书店应用程序作为示例。</p>\\n<p>我们可以轻松地克隆项目并在本地运行：</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>$ mvn <span class=\\"token function\\">install</span> spring-boot:run\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
