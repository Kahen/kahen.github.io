import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,a}from"./app-CBerKIce.js";const t={},p=a(`<hr><h1 id="onceperrequestfilter-是什么" tabindex="-1"><a class="header-anchor" href="#onceperrequestfilter-是什么"><span>OncePerRequestFilter 是什么？</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习 Spring 中的一种特殊类型的过滤器 <em>OncePerRequestFilter</em>。我们将看到它解决了什么问题，并通过一个快速示例了解如何使用它。</p><p>首先让我们理解过滤器是如何工作的。一个 <em>Filter</em> 可以在 servlet 执行之前或之后被调用。当一个请求被派发到一个 servlet 时，<em>RequestDispatcher</em> 可能会将其转发到另一个 servlet。在这种情况下，另一个 servlet 也可能有相同的过滤器。在这种情况下，<strong>同一个过滤器可能会被多次调用。</strong></p><p>但是，我们可能希望确保一个特定的过滤器每个请求只被调用一次。一个常见的用例是在使用 Spring Security 时。当一个请求通过过滤器链时，我们可能希望一些认证操作只对请求发生一次。</p><p>在这种情况下，我们可以扩展 <em>OncePerRequestFilter</em>。<strong>Spring 保证 <em>OncePerRequestFilter</em> 对于给定的请求只执行一次。</strong></p><h2 id="_3-对同步请求使用-onceperrequestfilter" tabindex="-1"><a class="header-anchor" href="#_3-对同步请求使用-onceperrequestfilter"><span>3. 对同步请求使用 <em>OncePerRequestFilter</em></span></a></h2><p>让我们通过一个示例来理解如何使用这个过滤器。我们将定义一个扩展 <em>OncePerRequestFilter</em> 的类 <em>AuthenticationFilter</em>，并重写 <em>doFilterInternal()</em> 方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AuthenticationFilter</span> <span class="token keyword">extends</span> <span class="token class-name">OncePerRequestFilter</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doFilterInternal</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span>
      <span class="token class-name">FilterChain</span> filterChain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> usrName <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span>“userName”<span class="token punctuation">)</span><span class="token punctuation">;</span>
        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>“成功认证用户 ” <span class="token operator">+</span> usrName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 <em>OncePerRequestFilter</em> 仅支持 HTTP 请求，<strong>因此无需像实现 <em>Filter</em> 接口时那样对 <em>request</em> 和 <em>response</em> 对象进行强制转换。</strong></p><h2 id="_4-对异步请求使用-onceperrequestfilter" tabindex="-1"><a class="header-anchor" href="#_4-对异步请求使用-onceperrequestfilter"><span>4. 对异步请求使用 <em>OncePerRequestFilter</em></span></a></h2><p>对于异步请求，默认情况下 <em>OncePerRequestFilter</em> 不会被应用。我们需要重写 <em>shouldNotFilterAsyncDispatch()</em> 和 <em>shouldNotFilterErrorDispatch()</em> 方法来支持这一点。</p><p>有时，我们需要过滤器仅在初始请求线程中应用，而不是在异步调度中创建的额外线程中应用。其他时候，我们可能需要在每个额外线程中至少调用一次过滤器。在这种情况下，我们需要重写 <em>shouldNotFilterAsyncDispatch()</em> 方法。</p><p>如果 <em>shouldNotFilterAsyncDispatch()</em> 方法返回 <em>true</em>，则过滤器将不会被调用用于后续的异步调度。然而，如果它返回 <em>false</em>，则过滤器将为每个异步调度调用一次，每个线程精确调用一次。</p><p>同样，<strong>我们会重写 <em>shouldNotFilterErrorDispatch()</em> 方法并返回 <em>true</em> 或 <em>false</em>，取决于我们是否希望过滤错误调度：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AuthenticationFilter</span> <span class="token keyword">extends</span> <span class="token class-name">OncePerRequestFilter</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doFilterInternal</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span>
      <span class="token class-name">FilterChain</span> filterChain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> usrName <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token string">&quot;userName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;成功认证用户 &quot;</span> <span class="token operator">+</span> usrName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">shouldNotFilterAsyncDispatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">shouldNotFilterErrorDispatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-有条件地跳过请求" tabindex="-1"><a class="header-anchor" href="#_5-有条件地跳过请求"><span>5. 有条件地跳过请求</span></a></h2><p>我们可以通过重写 <em>shouldNotFilter()</em> 方法，仅对某些特定请求应用过滤器，并跳过其他请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">shouldNotFilter</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token constant">SHOULD_NOT_FILTER</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-快速示例" tabindex="-1"><a class="header-anchor" href="#_6-快速示例"><span>6. 快速示例</span></a></h2><p>让我们通过一个快速示例来理解 <em>OncePerRequestFilter</em> 的行为。</p><p>首先，我们将定义一个使用 Spring 的 <em>DeferredResult</em> 异步处理请求的 <em>Controller</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloController</span>  <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>path <span class="token operator">=</span> <span class="token string">&quot;/greeting&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DeferredResult</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token function">hello</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">DeferredResult</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` deferredResult <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DeferredResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">perform</span><span class="token punctuation">(</span>deferredResult<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> deferredResult<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">perform</span><span class="token punctuation">(</span><span class="token class-name">DeferredResult</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\`\` dr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 一些处理</span>
        dr<span class="token punctuation">.</span><span class="token function">setResult</span><span class="token punctuation">(</span><span class="token string">&quot;OK&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在异步处理请求时，两个线程都会通过相同的过滤器链。因此，过滤器会被调用两次：第一次是在容器线程处理请求时，第二次是在异步调度器完成后。一旦异步处理完成，响应将返回给客户端。</p><p>现在，让我们定义一个实现 <em>OncePerRequestFilter</em> 的 <em>Filter</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyOncePerRequestFilter</span> <span class="token keyword">extends</span> <span class="token class-name">OncePerRequestFilter</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doFilterInternal</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span>
      <span class="token class-name">FilterChain</span> filterChain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Inside Once Per Request Filter originated by request {}&quot;</span><span class="token punctuation">,</span> request<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">shouldNotFilterAsyncDispatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们故意从 <em>shouldNotFilterAsyncDispatch()</em> 方法返回 <em>true</em>。这是为了演示我们的过滤器仅对容器线程调用一次，而不是对后续的异步线程调用。</p><p>让我们调用我们的端点来演示这一点：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET http://localhost:8082/greeting
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>输出：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>10:23:24.175 [http-nio-8082-exec-1] INFO  o.a.c.c.C.[Tomcat].[localhost].[/] - Initializing Spring DispatcherServlet &#39;dispatcherServlet&#39;
10:23:24.175 [http-nio-8082-exec-1] INFO  o.s.web.servlet.DispatcherServlet - Initializing Servlet &#39;dispatcherServlet&#39;
10:23:24.176 [http-nio-8082-exec-1] INFO  o.s.web.servlet.DispatcherServlet - Completed initialization in 1 ms
10:23:26.814 [http-nio-8082-exec-1] INFO  c.b.O.MyOncePerRequestFilter - Inside Once Per Request Filter originated by request /greeting
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看我们希望请求和异步调度都调用我们的过滤器的情况。我们只需要重写 <em>shouldNotFilterAsyncDispatch()</em> 并返回 <em>false</em> 即可实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">shouldNotFilterAsyncDispatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输出：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>2:53.616 [http-nio-8082-exec-1] INFO  o.a.c.c.C.[Tomcat].[localhost].[/] - Initializing Spring DispatcherServlet &#39;dispatcherServlet&#39;
10:32:53.616 [http-nio-8082-exec-1] INFO  o.s.web.servlet.DispatcherServlet - Initializing Servlet &#39;dispatcherServlet&#39;
10:32:53.617 [http-nio-8082-exec-1] INFO  o.s.web.servlet.DispatcherServlet - Completed initialization in 1 ms
10:32:53.633 [http-nio-8082-exec-1] INFO  c.b.O.MyOncePerRequestFilter - Inside OncePer Request Filter originated by request /greeting
10:32:53.663 [http-nio-8082-exec-2] INFO  c.b.O.MyOncePerRequestFilter - Inside OncePer Request Filter originated by request /greeting
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们从上面的输出可以看到，我们的过滤器被调用了两次——第一次由容器线程调用，第二次由另一个线程调用。</p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们查看了 <em>OncePerRequestFilter</em>，它解决了什么问题，以及如何通过一些实际示例来实现它。</p>`,39),l=[p];function o(c,i){return e(),s("div",null,l)}const d=n(t,[["render",o],["__file","2024-07-24-What Is OncePerRequestFilter .html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-What%20Is%20OncePerRequestFilter%20.html","title":"OncePerRequestFilter 是什么？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Framework"],"tag":["Spring","Java","OncePerRequestFilter"],"head":[["meta",{"name":"keywords","content":"Spring, Java, OncePerRequestFilter"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-What%20Is%20OncePerRequestFilter%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"OncePerRequestFilter 是什么？"}],["meta",{"property":"og:description","content":"OncePerRequestFilter 是什么？ 1. 概述 在本教程中，我们将学习 Spring 中的一种特殊类型的过滤器 OncePerRequestFilter。我们将看到它解决了什么问题，并通过一个快速示例了解如何使用它。 首先让我们理解过滤器是如何工作的。一个 Filter 可以在 servlet 执行之前或之后被调用。当一个请求被派发到一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T11:49:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"OncePerRequestFilter"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T11:49:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OncePerRequestFilter 是什么？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T11:49:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"OncePerRequestFilter 是什么？ 1. 概述 在本教程中，我们将学习 Spring 中的一种特殊类型的过滤器 OncePerRequestFilter。我们将看到它解决了什么问题，并通过一个快速示例了解如何使用它。 首先让我们理解过滤器是如何工作的。一个 Filter 可以在 servlet 执行之前或之后被调用。当一个请求被派发到一..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 对同步请求使用 OncePerRequestFilter","slug":"_3-对同步请求使用-onceperrequestfilter","link":"#_3-对同步请求使用-onceperrequestfilter","children":[]},{"level":2,"title":"4. 对异步请求使用 OncePerRequestFilter","slug":"_4-对异步请求使用-onceperrequestfilter","link":"#_4-对异步请求使用-onceperrequestfilter","children":[]},{"level":2,"title":"5. 有条件地跳过请求","slug":"_5-有条件地跳过请求","link":"#_5-有条件地跳过请求","children":[]},{"level":2,"title":"6. 快速示例","slug":"_6-快速示例","link":"#_6-快速示例","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1721821769000,"updatedTime":1721821769000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.35,"words":1304},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-What Is OncePerRequestFilter .md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>OncePerRequestFilter 是什么？</h1>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习 Spring 中的一种特殊类型的过滤器 <em>OncePerRequestFilter</em>。我们将看到它解决了什么问题，并通过一个快速示例了解如何使用它。</p>\\n<p>首先让我们理解过滤器是如何工作的。一个 <em>Filter</em> 可以在 servlet 执行之前或之后被调用。当一个请求被派发到一个 servlet 时，<em>RequestDispatcher</em> 可能会将其转发到另一个 servlet。在这种情况下，另一个 servlet 也可能有相同的过滤器。在这种情况下，<strong>同一个过滤器可能会被多次调用。</strong></p>","autoDesc":true}');export{d as comp,k as data};
