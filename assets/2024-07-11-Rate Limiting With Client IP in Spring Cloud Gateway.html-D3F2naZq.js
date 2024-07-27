import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as e}from"./app-CJGTm_7y.js";const t={},p=e(`<h1 id="spring-cloud-gateway基于客户端ip的速率限制" tabindex="-1"><a class="header-anchor" href="#spring-cloud-gateway基于客户端ip的速率限制"><span>Spring Cloud Gateway基于客户端IP的速率限制</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在这个快速教程中，我们将看到如何基于客户端的实际IP地址限制Spring Cloud Gateway的传入请求速率。</p><p>简而言之，我们将在路由上设置_RequestRateLimiter_过滤器，然后<strong>我们将配置网关使用IP地址限制不同客户端的请求</strong>。</p><h2 id="_2-路由配置" tabindex="-1"><a class="header-anchor" href="#_2-路由配置"><span>2. 路由配置</span></a></h2><p>首先，我们需要配置Spring Cloud Gateway对特定路由进行速率限制。为此，我们将使用由_spring-boot-starter-data-redis-reactive_实现的经典令牌桶速率限制器。简而言之，<strong>速率限制器创建一个桶，该桶具有与之关联的键，用于标识自身，并具有固定的初始令牌容量，这些令牌会随时间补充</strong>。然后，对于每个请求，速率限制器检查其相关桶，并在可能的情况下减少一个令牌。否则，它将拒绝传入请求。</p><p>由于我们正在使用分布式系统，我们可能希望跟踪跨应用程序所有实例的所有传入请求。因此，拥有一个分布式缓存系统来存储桶的信息是方便的。在这种情况下，我们预先配置了一个Redis实例来模拟现实世界的应用。</p><p>接下来，我们将配置一个带有速率限制器的路由。我们将监听_/example_端点，并将请求转发到_http://example.org_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">RouteLocator</span> <span class="token function">myRoutes</span><span class="token punctuation">(</span><span class="token class-name">RouteLocatorBuilder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> builder<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">&quot;requestratelimiter_route&quot;</span><span class="token punctuation">,</span> p <span class="token operator">-&gt;</span> p
            <span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span><span class="token string">&quot;/example&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">filters</span><span class="token punctuation">(</span>f <span class="token operator">-&gt;</span> f<span class="token punctuation">.</span><span class="token function">requestRateLimiter</span><span class="token punctuation">(</span>r <span class="token operator">-&gt;</span> r<span class="token punctuation">.</span><span class="token function">setRateLimiter</span><span class="token punctuation">(</span><span class="token function">redisRateLimiter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">&quot;http://example.org&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面，我们通过使用_.setRateLimiter()_方法配置了带有_RequestRateLimiter_的路由。特别是，我们通过_redisRatelimiter()<em>方法定义了_RedisRateLimiter</em> bean来管理我们的速率限制器的状态：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">RedisRateLimiter</span> <span class="token function">redisRateLimiter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RedisRateLimiter</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为示例，我们将速率限制配置为所有_replenishRate_、<em>burstCapacity_和_requestedToken_属性都设置为1。这使得多次调用</em>/example_端点并返回HTTP 429响应代码变得容易。</p><h2 id="_3-keyresolver-bean" tabindex="-1"><a class="header-anchor" href="#_3-keyresolver-bean"><span>3. <em>KeyResolver</em> Bean</span></a></h2><p>为了正确工作，<strong>速率限制器必须通过一个键来识别每个击中端点的客户端</strong>。在底层，该键标识速率限制器将用于为每个请求消耗令牌的桶。因此，我们希望该键对于每个客户端都是唯一的。在这种情况下，我们将使用客户端的IP地址来监控他们的请求，并在他们发出太多请求时限制他们。</p><p>因此，我们之前配置的_RequestRateLimiter_将使用一个_KeyResolver_ bean，该bean允许可插拔的策略来派生用于限制请求的键。这意味着<strong>我们可以配置如何从每个请求中提取键</strong>。</p><h2 id="_4-keyresolver-中的客户端ip地址" tabindex="-1"><a class="header-anchor" href="#_4-keyresolver-中的客户端ip地址"><span>4. _KeyResolver_中的客户端IP地址</span></a></h2><p>目前，这个接口没有默认实现，所以我们必须定义一个，记住我们想要的是客户端的IP地址：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleClientAddressResolver</span> <span class="token keyword">implements</span> <span class="token class-name">KeyResolver</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Mono</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token class-name">ServerWebExchange</span> exchange<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>exchange<span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRemoteAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">InetSocketAddress</span><span class="token operator">::</span><span class="token function">getAddress</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">InetAddress</span><span class="token operator">::</span><span class="token function">getHostAddress</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Mono</span><span class="token operator">::</span><span class="token function">just</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_ServerWebExchange_对象来提取客户端的IP地址。如果我们无法获取IP地址，我们将返回_Mono.empty()<em>以向速率限制器发出信号，并默认拒绝请求。然而，我们可以通过将</em>.setDenyEmptyKey()<em>设置为_false_来配置速率限制器，在_KeyResolver_返回空键时允许请求。此外，我们还可以通过向</em>.setKeyResolver()<em>方法提供自定义_KeyResolver_实现，为每个不同的路由提供不同的_KeyResolver</em>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>builder<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">route</span><span class="token punctuation">(</span><span class="token string">&quot;ipaddress_route&quot;</span><span class="token punctuation">,</span> p <span class="token operator">-&gt;</span> p
        <span class="token punctuation">.</span><span class="token function">path</span><span class="token punctuation">(</span><span class="token string">&quot;/example2&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">filters</span><span class="token punctuation">(</span>f <span class="token operator">-&gt;</span> f<span class="token punctuation">.</span><span class="token function">requestRateLimiter</span><span class="token punctuation">(</span>r <span class="token operator">-&gt;</span> r<span class="token punctuation">.</span><span class="token function">setRateLimiter</span><span class="token punctuation">(</span><span class="token function">redisRateLimiter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setDenyEmptyKey</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setKeyResolver</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SimpleClientAddressResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span><span class="token string">&quot;http://example.org&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-通过代理时的原始ip地址" tabindex="-1"><a class="header-anchor" href="#_4-1-通过代理时的原始ip地址"><span>4.1. 通过代理时的原始IP地址</span></a></h3><p>先前定义的实现适用于Spring Cloud Gateway直接监听客户端请求的情况。然而，如果我们在代理服务器后面部署应用程序，所有的主机地址都将是相同的。因此，速率限制器将看到所有请求都来自同一个客户端，并限制它可以处理的请求数量。</p><p>为了解决这个问题，<strong>我们依赖_X-Forwarded-For_头来识别通过代理服务器连接的客户端的原始IP地址</strong>。例如，让我们配置_KeyResolver_以便它可以读取原始IP地址：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Primary</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProxyClientAddressResolver</span> <span class="token keyword">implements</span> <span class="token class-name">KeyResolver</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Mono</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>\`\` <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token class-name">ServerWebExchange</span> exchange<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">XForwardedRemoteAddressResolver</span> resolver <span class="token operator">=</span> <span class="token class-name">XForwardedRemoteAddressResolver</span><span class="token punctuation">.</span><span class="token function">maxTrustedIndex</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">InetSocketAddress</span> inetSocketAddress <span class="token operator">=</span> resolver<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>exchange<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Mono</span><span class="token punctuation">.</span><span class="token function">just</span><span class="token punctuation">(</span>inetSocketAddress<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getHostAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将值1传递给_maxTrustedIndex()<em>，假设我们只有一个代理服务器。否则，必须相应地设置该值。此外，我们用</em>@Primary_注解这个_KeyResolver_，以使其优先于先前的实现。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们配置了基于客户端IP地址的API速率限制器。首先，我们配置了一个带有令牌桶速率限制器的路由。然后，我们探讨了_KeyResolver_如何识别每个请求使用的桶。最后，我们探讨了在直接访问API或在代理后部署时，通过_KeyResolver_分配客户端IP地址的策略。</p><p>这些示例的实现可以在GitHub上找到。</p>`,28),o=[p];function c(i,l){return a(),s("div",null,o)}const d=n(t,[["render",c],["__file","2024-07-11-Rate Limiting With Client IP in Spring Cloud Gateway.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Rate%20Limiting%20With%20Client%20IP%20in%20Spring%20Cloud%20Gateway.html","title":"Spring Cloud Gateway基于客户端IP的速率限制","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Cloud Gateway","Rate Limiting"],"tag":["Spring Cloud Gateway","Rate Limiting","Client IP"],"head":[["meta",{"name":"keywords","content":"Spring Cloud Gateway, Rate Limiting, Client IP"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Rate%20Limiting%20With%20Client%20IP%20in%20Spring%20Cloud%20Gateway.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Cloud Gateway基于客户端IP的速率限制"}],["meta",{"property":"og:description","content":"Spring Cloud Gateway基于客户端IP的速率限制 1. 引言 在这个快速教程中，我们将看到如何基于客户端的实际IP地址限制Spring Cloud Gateway的传入请求速率。 简而言之，我们将在路由上设置_RequestRateLimiter_过滤器，然后我们将配置网关使用IP地址限制不同客户端的请求。 2. 路由配置 首先，我们需..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T17:02:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Cloud Gateway"}],["meta",{"property":"article:tag","content":"Rate Limiting"}],["meta",{"property":"article:tag","content":"Client IP"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T17:02:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Cloud Gateway基于客户端IP的速率限制\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T17:02:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Cloud Gateway基于客户端IP的速率限制 1. 引言 在这个快速教程中，我们将看到如何基于客户端的实际IP地址限制Spring Cloud Gateway的传入请求速率。 简而言之，我们将在路由上设置_RequestRateLimiter_过滤器，然后我们将配置网关使用IP地址限制不同客户端的请求。 2. 路由配置 首先，我们需..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 路由配置","slug":"_2-路由配置","link":"#_2-路由配置","children":[]},{"level":2,"title":"3. KeyResolver Bean","slug":"_3-keyresolver-bean","link":"#_3-keyresolver-bean","children":[]},{"level":2,"title":"4. _KeyResolver_中的客户端IP地址","slug":"_4-keyresolver-中的客户端ip地址","link":"#_4-keyresolver-中的客户端ip地址","children":[{"level":3,"title":"4.1. 通过代理时的原始IP地址","slug":"_4-1-通过代理时的原始ip地址","link":"#_4-1-通过代理时的原始ip地址","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720717350000,"updatedTime":1720717350000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.35,"words":1306},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Rate Limiting With Client IP in Spring Cloud Gateway.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在这个快速教程中，我们将看到如何基于客户端的实际IP地址限制Spring Cloud Gateway的传入请求速率。</p>\\n<p>简而言之，我们将在路由上设置_RequestRateLimiter_过滤器，然后<strong>我们将配置网关使用IP地址限制不同客户端的请求</strong>。</p>\\n<h2>2. 路由配置</h2>\\n<p>首先，我们需要配置Spring Cloud Gateway对特定路由进行速率限制。为此，我们将使用由_spring-boot-starter-data-redis-reactive_实现的经典令牌桶速率限制器。简而言之，<strong>速率限制器创建一个桶，该桶具有与之关联的键，用于标识自身，并具有固定的初始令牌容量，这些令牌会随时间补充</strong>。然后，对于每个请求，速率限制器检查其相关桶，并在可能的情况下减少一个令牌。否则，它将拒绝传入请求。</p>","autoDesc":true}');export{d as comp,k as data};
