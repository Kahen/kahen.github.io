import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-on0L14Tx.js";const t={},p=e(`<hr><h1 id="为所有spring-boot控制器添加前缀-baeldung" tabindex="-1"><a class="header-anchor" href="#为所有spring-boot控制器添加前缀-baeldung"><span>为所有Spring Boot控制器添加前缀 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Spring Boot应用程序中，每个控制器都可以有自己的URL映射。这使得一个应用程序可以在多个位置提供Web端点。例如，我们可以将API端点分组为内部和外部等逻辑分组。</p><p>然而，有时我们可能希望将所有端点都放在一个共同的前缀下。在本教程中，我们将探讨为所有Spring Boot控制器使用共同前缀的不同方法。</p><h2 id="_2-servlet上下文" tabindex="-1"><a class="header-anchor" href="#_2-servlet上下文"><span>2. Servlet上下文</span></a></h2><p>在Spring应用程序中处理Web请求的主要组件是_DispatcherServlet_。通过自定义此组件，我们可以在很大程度上控制请求的路由方式。</p><p>让我们看看两种不同的自定义_DispatcherServlet_的方法，这将使我们的所有应用程序端点都可以在共同的URL前缀下使用。</p><h3 id="_2-1-spring-bean" tabindex="-1"><a class="header-anchor" href="#_2-1-spring-bean"><span>2.1. Spring Bean</span></a></h3><p>第一种方法是通过引入一个新的Spring bean：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DispatcherServletCustomConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DispatcherServlet</span> <span class="token function">dispatcherServlet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DispatcherServlet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">ServletRegistrationBean</span> <span class="token function">dispatcherServletRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ServletRegistrationBean</span> registration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServletRegistrationBean</span><span class="token punctuation">(</span><span class="token function">dispatcherServlet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;/api/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        registration<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">DispatcherServletAutoConfiguration</span><span class="token punctuation">.</span><span class="token constant">DEFAULT_DISPATCHER_SERVLET_REGISTRATION_BEAN_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> registration<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个_ServletRegistrationBean_，它包装了_DispatcherServlet_ bean。注意我们提供了一个明确的基URL <em>/api/</em>。<strong>这意味着所有端点都必须在该基URL前缀下访问</strong>。</p><h3 id="_2-2-应用程序属性" tabindex="-1"><a class="header-anchor" href="#_2-2-应用程序属性"><span>2.2. 应用程序属性</span></a></h3><p>我们还可以通过使用应用程序属性来实现相同的结果。在Spring Boot 2.0.0之后的版本中，我们将以下内容添加到我们的_application.properties_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server.servlet.contextPath=/api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在此版本之前，属性名称略有不同：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server.contextPath=/api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方法的一个好处是它只使用标准的Spring属性。<strong>这意味着我们可以很容易地使用像配置文件或外部属性绑定这样的标准机制来更改或覆盖我们的共同前缀</strong>。</p><h3 id="_2-3-优点和缺点" tabindex="-1"><a class="header-anchor" href="#_2-3-优点和缺点"><span>2.3. 优点和缺点</span></a></h3><p>这两种方法的主要优点也是主要缺点：它们影响应用程序中的每个端点。</p><p>对于一些应用程序来说，这可能完全没问题。然而，有些应用程序可能需要使用标准端点映射来与第三方服务交互——例如，OAuth交换。在这些情况下，像这样的全局解决方案可能不是一个好的选择。</p><h2 id="_3-注解" tabindex="-1"><a class="header-anchor" href="#_3-注解"><span>3. 注解</span></a></h2><p>我们可以通过使用注解来为Spring应用程序中的所有控制器添加前缀。下面，我们将看两种不同的方法。</p><h3 id="_3-1-spel" tabindex="-1"><a class="header-anchor" href="#_3-1-spel"><span>3.1. SpEL</span></a></h3><p>第一种方法涉及使用Spring表达式语言（SpEL）与标准的_@RequestMapping注解_。通过这种方法，我们只需向我们想要添加前缀的每个控制器添加一个属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>path <span class="token operator">=</span> <span class="token string">&quot;\${apiPrefix}/users&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们只需在_application.properties_中指定属性值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>apiPrefix=/api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-自定义注解" tabindex="-1"><a class="header-anchor" href="#_3-2-自定义注解"><span>3.2. 自定义注解</span></a></h3><p>另一种实现方法是通过创建我们自己的注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">ApiPrefixController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@AliasFor</span><span class="token punctuation">(</span>annotation <span class="token operator">=</span> <span class="token class-name">Component</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们只需要将注解应用到我们想要添加前缀的每个控制器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token annotation punctuation">@ApiPrefixController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SomeController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/users&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ResponseBody</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-优点和缺点" tabindex="-1"><a class="header-anchor" href="#_3-3-优点和缺点"><span>3.3. 优点和缺点</span></a></h3><p>这两种方法解决了前一种方法的主要问题：<strong>它们都提供了对哪些控制器获得前缀的细粒度控制</strong>。我们可以只将注解应用于特定的控制器，而不是影响应用程序中的所有端点。</p><h2 id="_4-服务器端转发" tabindex="-1"><a class="header-anchor" href="#_4-服务器端转发"><span>4. 服务器端转发</span></a></h2><p>我们将要探讨的最后一种方法是使用服务器端转发。<strong>与重定向不同，转发不涉及向客户端返回响应</strong>。这意味着我们的应用程序可以在不影响客户端的情况下在端点之间传递请求。</p><p>让我们从编写一个带有两个端点的简单控制器开始：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token keyword">class</span> <span class="token class-name">EndpointController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/endpoint1&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ResponseBody</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">endpoint1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Hello from endpoint 1&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/endpoint2&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ResponseBody</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">endpoint2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Hello from endpoint 2&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们创建一个新的控制器，它基于我们想要的前缀：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/endpoint&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApiPrefixController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">ModelAndView</span> <span class="token function">route</span><span class="token punctuation">(</span><span class="token class-name">ModelMap</span> model<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextBoolean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ModelAndView</span><span class="token punctuation">(</span><span class="token string">&quot;forward:/endpoint1&quot;</span><span class="token punctuation">,</span> model<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ModelAndView</span><span class="token punctuation">(</span><span class="token string">&quot;forward:/endpoint2&quot;</span><span class="token punctuation">,</span> model<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**这个控制器有一个单一的端点，充当路由器。**在这种情况下，它本质上是抛硬币来转发原始请求到我们的其他两个端点之一。</p><p>我们可以通过发送几个连续的请求来验证它是否有效：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; curl http://localhost:8080/api/endpoint
Hello from endpoint 2
&gt; curl http://localhost:8080/api/endpoint
Hello from endpoint 1
&gt; curl http://localhost:8080/api/endpoint
Hello from endpoint 1
&gt; curl http://localhost:8080/api/endpoint
Hello from endpoint 2
&gt; curl http://localhost:8080/api/endpoint
Hello from endpoint 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法的主要好处是它非常强大。我们可以应用任何我们想要的逻辑来决定如何转发请求：URL路径、HTTP方法、HTTP头等。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了在Spring应用程序中为每个控制器应用共同前缀的几种方法。与大多数决策一样，每种方法都有其优缺点，应该在实施前仔细考虑。</p><p>如常，本教程的代码示例可以在GitHub上找到。</p>`,48),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(t,[["render",i],["__file","2024-07-20-Add Prefix to All Spring Boot Controllers.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Add%20Prefix%20to%20All%20Spring%20Boot%20Controllers.html","title":"为所有Spring Boot控制器添加前缀 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Boot","Web Development"],"tag":["Spring Boot","Servlet","Annotations"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Servlet, Annotations, URL Mapping"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Add%20Prefix%20to%20All%20Spring%20Boot%20Controllers.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"为所有Spring Boot控制器添加前缀 | Baeldung"}],["meta",{"property":"og:description","content":"为所有Spring Boot控制器添加前缀 | Baeldung 1. 引言 在Spring Boot应用程序中，每个控制器都可以有自己的URL映射。这使得一个应用程序可以在多个位置提供Web端点。例如，我们可以将API端点分组为内部和外部等逻辑分组。 然而，有时我们可能希望将所有端点都放在一个共同的前缀下。在本教程中，我们将探讨为所有Spring B..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T09:11:45.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Servlet"}],["meta",{"property":"article:tag","content":"Annotations"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T09:11:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"为所有Spring Boot控制器添加前缀 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T09:11:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"为所有Spring Boot控制器添加前缀 | Baeldung 1. 引言 在Spring Boot应用程序中，每个控制器都可以有自己的URL映射。这使得一个应用程序可以在多个位置提供Web端点。例如，我们可以将API端点分组为内部和外部等逻辑分组。 然而，有时我们可能希望将所有端点都放在一个共同的前缀下。在本教程中，我们将探讨为所有Spring B..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Servlet上下文","slug":"_2-servlet上下文","link":"#_2-servlet上下文","children":[{"level":3,"title":"2.1. Spring Bean","slug":"_2-1-spring-bean","link":"#_2-1-spring-bean","children":[]},{"level":3,"title":"2.2. 应用程序属性","slug":"_2-2-应用程序属性","link":"#_2-2-应用程序属性","children":[]},{"level":3,"title":"2.3. 优点和缺点","slug":"_2-3-优点和缺点","link":"#_2-3-优点和缺点","children":[]}]},{"level":2,"title":"3. 注解","slug":"_3-注解","link":"#_3-注解","children":[{"level":3,"title":"3.1. SpEL","slug":"_3-1-spel","link":"#_3-1-spel","children":[]},{"level":3,"title":"3.2. 自定义注解","slug":"_3-2-自定义注解","link":"#_3-2-自定义注解","children":[]},{"level":3,"title":"3.3. 优点和缺点","slug":"_3-3-优点和缺点","link":"#_3-3-优点和缺点","children":[]}]},{"level":2,"title":"4. 服务器端转发","slug":"_4-服务器端转发","link":"#_4-服务器端转发","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721466705000,"updatedTime":1721466705000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.41,"words":1324},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Add Prefix to All Spring Boot Controllers.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>为所有Spring Boot控制器添加前缀 | Baeldung</h1>\\n<h2>1. 引言</h2>\\n<p>在Spring Boot应用程序中，每个控制器都可以有自己的URL映射。这使得一个应用程序可以在多个位置提供Web端点。例如，我们可以将API端点分组为内部和外部等逻辑分组。</p>\\n<p>然而，有时我们可能希望将所有端点都放在一个共同的前缀下。在本教程中，我们将探讨为所有Spring Boot控制器使用共同前缀的不同方法。</p>\\n<h2>2. Servlet上下文</h2>\\n<p>在Spring应用程序中处理Web请求的主要组件是_DispatcherServlet_。通过自定义此组件，我们可以在很大程度上控制请求的路由方式。</p>","autoDesc":true}');export{d as comp,v as data};
