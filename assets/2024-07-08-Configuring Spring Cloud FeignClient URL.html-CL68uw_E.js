import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-Ckd2YV4o.js";const t={},p=e(`<h1 id="配置spring-cloud-feignclient的url" tabindex="-1"><a class="header-anchor" href="#配置spring-cloud-feignclient的url"><span>配置Spring Cloud FeignClient的URL</span></a></h1><p>在本文中，我们将探讨如何为Feign客户端接口提供目标URL。</p><h2 id="_2-概览" tabindex="-1"><a class="header-anchor" href="#_2-概览"><span>2. 概览</span></a></h2><p>为了快速开始，我们将使用JSONPlaceholder网站提供的_Albums, Posts_和_Todos_对象的模拟响应。</p><p>让我们看看_Album_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Album</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>

    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以及_Post_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Post</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> body<span class="token punctuation">;</span>

    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后是_Todo_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Todo</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> completed<span class="token punctuation">;</span>

    <span class="token comment">// 标准getter和setter</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-在注解中添加基础url" tabindex="-1"><a class="header-anchor" href="#_3-在注解中添加基础url"><span>3. 在注解中添加基础URL</span></a></h2><p><strong>我们可以在客户端接口上的_@FeignClient_注解的_url_属性中设置基础URL</strong>。然后，我们将使用相关的HTTP动词注解方法，并添加所需的端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;albumClient&quot;</span><span class="token punctuation">,</span> url <span class="token operator">=</span> <span class="token string">&quot;https://jsonplaceholder.typicode.com/albums/&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AlbumClient</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">Album</span> <span class="token function">getAlbumById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们添加一个REST控制器来测试我们的客户端：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigureFeignUrlController</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">AlbumClient</span> albumClient<span class="token punctuation">;</span>
    <span class="token comment">// 标准构造函数</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;albums/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Album</span> <span class="token function">getAlbumById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> albumClient<span class="token punctuation">.</span><span class="token function">getAlbumById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其他控制器方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当应用程序生命周期内的目标URL是静态的时候，这个选项很有用。</p><h2 id="_4-使用配置属性" tabindex="-1"><a class="header-anchor" href="#_4-使用配置属性"><span>4. 使用配置属性</span></a></h2><p>或者，<strong>对于Spring Cloud 2022.0.1或更高版本，我们可以使用_application.properties_来为Feign客户端接口提供URL</strong>。属性_spring.cloud.openfeign.client.config.<code>&lt;interface-name&gt;</code>.url_用于此目的。这里的_<code>&lt;interface-name&gt;</code><em>是我们在</em>@FeignClient_注解中提供的_name_属性的值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;postClient&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PostClient</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">Post</span> <span class="token function">getPostById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将在application.properties中添加基础URL：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">spring.cloud.openfeign.client.config.postClient.url</span><span class="token punctuation">=</span><span class="token value attr-value">https://jsonplaceholder.typicode.com/posts/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>对于低于2022.0.1版本的Spring Cloud，我们可以将_@FeignClient_的_url_属性设置为从_application.properties_读取值</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;postClient&quot;</span><span class="token punctuation">,</span> url <span class="token operator">=</span> <span class="token string">&quot;\${spring.cloud.openfeign.client.config.postClient.url}&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们将此客户端注入到我们之前创建的控制器中：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignClientController</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">PostClient</span> postClient<span class="token punctuation">;</span>

    <span class="token comment">// 其他属性和标准构造函数</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;posts/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Post</span> <span class="token function">getPostById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> postClient<span class="token punctuation">.</span><span class="token function">getPostById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其他控制器方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果目标URL根据应用程序的环境而变化，这个选项可能很有用。例如，我们可能在开发环境中使用模拟服务器，在生产环境中使用实际服务器。</p><h2 id="_5-使用-requestline" tabindex="-1"><a class="header-anchor" href="#_5-使用-requestline"><span>5. 使用_RequestLine_</span></a></h2><p>Spring Cloud提供了一个特性，我们可以在运行时覆盖目标URL或直接提供URL。这是通过<strong>使用_@RequestLine_注解并手动使用Feign Builder API创建Feign客户端以注册客户端</strong>来实现的：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;todoClient&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">TodoClient</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestLine</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">Todo</span> <span class="token function">getTodoById</span><span class="token punctuation">(</span><span class="token class-name">URI</span> uri<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要在我们的控制器中手动创建这个Feign客户端：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">FeignClientsConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignClientController</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">TodoClient</span> todoClient<span class="token punctuation">;</span>

    <span class="token comment">// 其他变量</span>

    <span class="token keyword">public</span> <span class="token class-name">FeignClientController</span><span class="token punctuation">(</span><span class="token class-name">Decoder</span> decoder<span class="token punctuation">,</span> <span class="token class-name">Encoder</span> encoder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>todoClient <span class="token operator">=</span> <span class="token class-name">Feign</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encoder</span><span class="token punctuation">(</span>encoder<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decoder</span><span class="token punctuation">(</span>decoder<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">target</span><span class="token punctuation">(</span><span class="token class-name">Target<span class="token punctuation">.</span>EmptyTarget</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">TodoClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 其他初始化</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;todo/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Todo</span> <span class="token function">getTodoById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> todoClient<span class="token punctuation">.</span><span class="token function">getTodoById</span><span class="token punctuation">(</span><span class="token constant">URI</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">&quot;https://jsonplaceholder.typicode.com/todos/&quot;</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 其他控制器方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们首先通过_FeignClientsConfiguration.class_导入了默认的Feign客户端配置。<em>Feign.Builder_用于为API接口自定义这些属性。我们可以配置属性，如_encoder</em>, <em>decoder</em>, <em>connectTimeout</em>, <em>readTimeout</em>, 认证等。</p><p><em>target_属性定义了这些属性将应用于哪个接口。这个接口有两种实现：<em>EmptyTarget</em>，我们这里使用了，以及_HardCodedTarget</em>。_EmptyTarget_类在编译时不需要URL，而_HardCodedTarget_需要。</p><p>值得注意的是，作为参数提供的URI将覆盖在_@FeignClient_注解中提供的URL和配置属性中的URL。同样，_@FeignClient_注解中提供的URL将覆盖配置属性中提供的URL。</p><h2 id="_6-使用-requestinterceptor" tabindex="-1"><a class="header-anchor" href="#_6-使用-requestinterceptor"><span>6. 使用_RequestInterceptor_</span></a></h2><p>另外一种在运行时提供目标URL的方式是向_Feign.Builder_提供一个自定义的_RequestInterceptor_。这里，我们将覆盖_RestTemplate_的_target_属性，以更新URL为通过_requestInterceptor_提供给_Feign.Builder_的URL：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DynamicUrlInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">RequestInterceptor</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Supplier</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\` urlSupplier<span class="token punctuation">;</span>
    <span class="token comment">// 标准构造函数</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">RequestTemplate</span> template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> url <span class="token operator">=</span> urlSupplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>url <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            template<span class="token punctuation">.</span><span class="token function">target</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们在_AlbumClient.java_中添加另一个方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
<span class="token class-name">Album</span> <span class="token function">getAlbumByIdAndDynamicUrl</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将不在构造函数中使用Builder，而是在_ConfigureFeignUrlController_的方法中使用它来创建_AlbumClient_的实例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">FeignClientsConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigureFeignUrlController</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ObjectFactory</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HttpMessageConverters</span><span class="token punctuation">&gt;</span></span>\` messageConverters<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ObjectProvider</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HttpMessageConverterCustomizer</span><span class="token punctuation">&gt;</span></span>\` customizers<span class="token punctuation">;</span>

    <span class="token comment">// 其他变量，标准构造函数和其他API</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/dynamicAlbums/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Album</span> <span class="token function">getAlbumByIdAndDynamicUrl</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">AlbumClient</span> client <span class="token operator">=</span> <span class="token class-name">Feign</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">requestInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">DynamicUrlInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token string">&quot;https://jsonplaceholder.typicode.com/albums/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">contract</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SpringMvcContract</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">encoder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SpringEncoder</span><span class="token punctuation">(</span>messageConverters<span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">decoder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SpringDecoder</span><span class="token punctuation">(</span>messageConverters<span class="token punctuation">,</span> customizers<span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">target</span><span class="token punctuation">(</span><span class="token class-name">Target<span class="token punctuation">.</span>EmptyTarget</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">AlbumClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> client<span class="token punctuation">.</span><span class="token function">getAlbumByIdAndDynamicUrl</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们添加了上面创建的_DynamicUrlInterceptor_，它接受一个URL来覆盖_AlbumClient_的默认URL。我们还配置了客户端使用_SpringMvcContract, SpringEncoder_和_SpringDecoder_。</p><p>最后两个选项将在我们需要为我们的应用程序提供webhook支持时非常有用，因为每个客户端的目标URL将有所不同。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们看到了如何以不同的方式为Feign客户端接口配置目标URL。像往常一样，完整的实现可以在GitHub上找到。</p>`,45),o=[p];function l(c,i){return a(),s("div",null,o)}const d=n(t,[["render",l],["__file","2024-07-08-Configuring Spring Cloud FeignClient URL.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Configuring%20Spring%20Cloud%20FeignClient%20URL.html","title":"配置Spring Cloud FeignClient的URL","lang":"zh-CN","frontmatter":{"date":"2024-07-08T00:00:00.000Z","category":["Spring Cloud","Feign Client"],"tag":["Spring Cloud","Feign Client","Configuration"],"head":[["meta",{"name":"keywords","content":"Spring Cloud, Feign Client, Configuration, URL"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Configuring%20Spring%20Cloud%20FeignClient%20URL.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"配置Spring Cloud FeignClient的URL"}],["meta",{"property":"og:description","content":"配置Spring Cloud FeignClient的URL 在本文中，我们将探讨如何为Feign客户端接口提供目标URL。 2. 概览 为了快速开始，我们将使用JSONPlaceholder网站提供的_Albums, Posts_和_Todos_对象的模拟响应。 让我们看看_Album_类： 以及_Post_类： 最后是_Todo_类： 3. 在注解..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T07:34:52.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Cloud"}],["meta",{"property":"article:tag","content":"Feign Client"}],["meta",{"property":"article:tag","content":"Configuration"}],["meta",{"property":"article:published_time","content":"2024-07-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T07:34:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"配置Spring Cloud FeignClient的URL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T07:34:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"配置Spring Cloud FeignClient的URL 在本文中，我们将探讨如何为Feign客户端接口提供目标URL。 2. 概览 为了快速开始，我们将使用JSONPlaceholder网站提供的_Albums, Posts_和_Todos_对象的模拟响应。 让我们看看_Album_类： 以及_Post_类： 最后是_Todo_类： 3. 在注解..."},"headers":[{"level":2,"title":"2. 概览","slug":"_2-概览","link":"#_2-概览","children":[]},{"level":2,"title":"3. 在注解中添加基础URL","slug":"_3-在注解中添加基础url","link":"#_3-在注解中添加基础url","children":[]},{"level":2,"title":"4. 使用配置属性","slug":"_4-使用配置属性","link":"#_4-使用配置属性","children":[]},{"level":2,"title":"5. 使用_RequestLine_","slug":"_5-使用-requestline","link":"#_5-使用-requestline","children":[]},{"level":2,"title":"6. 使用_RequestInterceptor_","slug":"_6-使用-requestinterceptor","link":"#_6-使用-requestinterceptor","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720424092000,"updatedTime":1720424092000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.25,"words":1274},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Configuring Spring Cloud FeignClient URL.md","localizedDate":"2024年7月8日","excerpt":"\\n<p>在本文中，我们将探讨如何为Feign客户端接口提供目标URL。</p>\\n<h2>2. 概览</h2>\\n<p>为了快速开始，我们将使用JSONPlaceholder网站提供的_Albums, Posts_和_Todos_对象的模拟响应。</p>\\n<p>让我们看看_Album_类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Album</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Integer</span> id<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">Integer</span> userId<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">String</span> title<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 标准getter和setter</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};
