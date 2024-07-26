import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DpYLEM_u.js";const e={},p=t(`<hr><h1 id="spring-security-–-不同url的配置" tabindex="-1"><a class="header-anchor" href="#spring-security-–-不同url的配置"><span>Spring Security – 不同URL的配置</span></a></h1><p>如果你正在实施Spring Security（特别是OAuth），一定要看看《学习Spring Security》课程：</p><p><strong>&gt;&gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨如何配置Spring Security以使用不同的安全配置来处理不同的URL模式。</p><p>当应用程序需要对某些操作进行更高级别的安全保护，而其他操作则允许所有用户访问时，这将非常有用。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>让我们开始设置应用程序。</p><p>我们需要Web和Security依赖项来创建此服务。让我们首先向<code>pom.xml</code>文件中添加以下依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter-web\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`org.springframework.boot\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`\`
    \`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`spring-boot-starter-security\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`\`
\`\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-创建api" tabindex="-1"><a class="header-anchor" href="#_3-创建api"><span>3. 创建API</span></a></h2><p>我们将创建一个具有两个API的RESTful Web服务：一个产品API和一个客户API。为此，我们将设置两个控制器。</p><h3 id="_3-1-产品api" tabindex="-1"><a class="header-anchor" href="#_3-1-产品api"><span>3.1. 产品API</span></a></h3><p>让我们创建_ProductController_。它包含一个方法，<em>getProducts</em>，返回产品列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span><span class="token punctuation">(</span><span class="token string">&quot;/products&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProductController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Product</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">getProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>
          <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;产品 1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;描述 1&quot;</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token keyword">new</span> <span class="token class-name">Product</span><span class="token punctuation">(</span><span class="token string">&quot;产品 2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;描述 2&quot;</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-客户api" tabindex="-1"><a class="header-anchor" href="#_3-2-客户api"><span>3.2. 客户API</span></a></h3><p>类似地，让我们定义_CustomerController_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span><span class="token punctuation">(</span><span class="token string">&quot;/customers&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomerController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Customer</span> <span class="token function">getCustomerById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Customer</span><span class="token punctuation">(</span><span class="token string">&quot;客户 1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;地址 1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;电话 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在典型的Web应用程序中，包括访客用户在内的所有用户都可以获取产品列表。</p><p>然而，通过他们的ID获取客户的详细信息似乎只有管理员才能做到。因此，我们将以一种方式定义我们的安全配置，使其能够实现这一点。</p><h2 id="_4-设置安全配置" tabindex="-1"><a class="header-anchor" href="#_4-设置安全配置"><span>4. 设置安全配置</span></a></h2><p>当我们将Spring Security添加到项目中时，它将默认禁用对所有API的访问。因此，我们需要配置Spring Security以允许访问API。</p><p>让我们创建_SecurityConfiguration_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfiguration</span> <span class="token punctuation">{</span>

     <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">filterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>request <span class="token operator">-&gt;</span> request<span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AntPathRequestMatcher</span><span class="token punctuation">(</span><span class="token string">&quot;/products/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>request <span class="token operator">-&gt;</span> request<span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AntPathRequestMatcher</span><span class="token punctuation">(</span><span class="token string">&quot;/customers/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">hasRole</span><span class="token punctuation">(</span><span class="token string">&quot;ADMIN&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token class-name">Customizer</span><span class="token punctuation">.</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个_SecurityFilterChain_ bean来配置应用程序的安全。</p><p>此外，为了准备基本认证，我们需要为我们的应用程序配置用户。</p><p>我们将阅读代码的每一部分以更好地理解它。</p><h3 id="_4-1-允许对产品api的请求" tabindex="-1"><a class="header-anchor" href="#_4-1-允许对产品api的请求"><span>4.1. 允许对产品API的请求</span></a></h3><ul><li><em>authorizeRequests():</em> 此方法告诉Spring在授权请求时使用以下规则。</li><li><em>antMatchers(“/products/**”):</em> 这指定了安全配置适用的URL模式。我们将其与_permitAll()_操作链接。如果请求的路径包含“/products”，则允许其进入控制器。</li><li>我们可以使用_and()_方法向我们的配置中添加更多规则。</li></ul><p>这标志着一条规则链的结束。随后的其他规则也将应用于请求。因此，我们需要确保我们的规则不会相互冲突。一个好的做法是在顶部定义通用规则，在底部定义更具体的规则。</p><h3 id="_4-2-仅允许管理员访问客户api" tabindex="-1"><a class="header-anchor" href="#_4-2-仅允许管理员访问客户api"><span>4.2. 仅允许管理员访问客户API</span></a></h3><p>现在让我们看看配置的第二部分：</p><ul><li>要开始新规则，我们可以再次使用_authorizeRequests()_方法。</li><li><em>antMatchers(“/customers/**”).hasRole(“ADMIN”):</em> 如果URL的路径包含“/customers”，我们将检查发出请求的用户是否具有管理员角色。</li></ul><p>如果用户未经过身份验证，这将导致“401 未授权”错误。如果用户没有正确的角色，这将导致“403 禁止”错误。</p><h3 id="_4-3-默认规则" tabindex="-1"><a class="header-anchor" href="#_4-3-默认规则"><span>4.3. 默认规则</span></a></h3><p>我们已经添加了匹配特定请求的匹配项。现在我们需要为其余请求定义一些默认行为。</p><p><em>anyRequest().authenticated()</em> – <strong>_anyRequest()_定义了一个规则链，用于任何未匹配前一个规则的请求</strong>。在我们的情况下，只要这些请求经过身份验证，就会通过。</p><p>请注意，<strong>配置中只能有一个默认规则，并且它需要在最后</strong>。如果我们在添加默认规则后尝试添加一个规则，我们会得到一个错误——“在anyRequest之后不能配置antMatchers”。</p><h2 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试"><span>5. 测试</span></a></h2><p>让我们使用cURL测试两个API。</p><h3 id="_5-1-测试产品api" tabindex="-1"><a class="header-anchor" href="#_5-1-测试产品api"><span>5.1. 测试产品API</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-i</span> http://localhost:8080/products
<span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;产品 1&quot;</span>,
    <span class="token string">&quot;description&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;描述 1&quot;</span>,
    <span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1.0</span>
  <span class="token punctuation">}</span>,
  <span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;产品 2&quot;</span>,
    <span class="token string">&quot;description&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;描述 2&quot;</span>,
    <span class="token string">&quot;price&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2.0</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们按预期获得了两个产品作为响应。</p><h3 id="_5-2-测试客户api" tabindex="-1"><a class="header-anchor" href="#_5-2-测试客户api"><span>5.2. 测试客户API</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-i</span> http://localhost:8080/customers/1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>响应体为空。</p><p><strong>如果我们检查头部，我们会看到“401 未授权”状态。这是因为只有经过身份验证且具有管理员角色的用户才能访问客户API。</strong></p><p>现在让我们在请求中添加认证信息后再次尝试：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-u</span> admin:password <span class="token parameter variable">-i</span> http://localhost:8080/customers/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;客户 1&quot;</span>,
  <span class="token string">&quot;address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;地址 1&quot;</span>,
  <span class="token string">&quot;phone&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;电话 1&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>太好了！我们现在可以访问客户API了。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，我们学习了如何在Spring Boot应用程序中设置Spring Security。我们还涵盖了使用_antMatchers()_方法配置特定于URL模式的访问。</p>`,54),i=[p];function c(o,l){return a(),s("div",null,i)}const d=n(e,[["render",c],["__file","2024-07-21-Spring Security   Configuring Different URLs.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-Spring%20Security%20%20%20Configuring%20Different%20URLs.html","title":"Spring Security – 不同URL的配置","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","OAuth"],"tag":["Spring Security","URL配置","安全配置"],"head":[["meta",{"name":"keywords","content":"Spring Security, URL配置, 安全配置"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-Spring%20Security%20%20%20Configuring%20Different%20URLs.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Security – 不同URL的配置"}],["meta",{"property":"og:description","content":"Spring Security – 不同URL的配置 如果你正在实施Spring Security（特别是OAuth），一定要看看《学习Spring Security》课程： >> 学习Spring 安全 1. 概述 在本教程中，我们将探讨如何配置Spring Security以使用不同的安全配置来处理不同的URL模式。 当应用程序需要对某些操作进行更..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T16:41:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"URL配置"}],["meta",{"property":"article:tag","content":"安全配置"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T16:41:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Security – 不同URL的配置\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T16:41:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Security – 不同URL的配置 如果你正在实施Spring Security（特别是OAuth），一定要看看《学习Spring Security》课程： >> 学习Spring 安全 1. 概述 在本教程中，我们将探讨如何配置Spring Security以使用不同的安全配置来处理不同的URL模式。 当应用程序需要对某些操作进行更..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 创建API","slug":"_3-创建api","link":"#_3-创建api","children":[{"level":3,"title":"3.1. 产品API","slug":"_3-1-产品api","link":"#_3-1-产品api","children":[]},{"level":3,"title":"3.2. 客户API","slug":"_3-2-客户api","link":"#_3-2-客户api","children":[]}]},{"level":2,"title":"4. 设置安全配置","slug":"_4-设置安全配置","link":"#_4-设置安全配置","children":[{"level":3,"title":"4.1. 允许对产品API的请求","slug":"_4-1-允许对产品api的请求","link":"#_4-1-允许对产品api的请求","children":[]},{"level":3,"title":"4.2. 仅允许管理员访问客户API","slug":"_4-2-仅允许管理员访问客户api","link":"#_4-2-仅允许管理员访问客户api","children":[]},{"level":3,"title":"4.3. 默认规则","slug":"_4-3-默认规则","link":"#_4-3-默认规则","children":[]}]},{"level":2,"title":"5. 测试","slug":"_5-测试","link":"#_5-测试","children":[{"level":3,"title":"5.1. 测试产品API","slug":"_5-1-测试产品api","link":"#_5-1-测试产品api","children":[]},{"level":3,"title":"5.2. 测试客户API","slug":"_5-2-测试客户api","link":"#_5-2-测试客户api","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721580094000,"updatedTime":1721580094000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.29,"words":1288},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-Spring Security   Configuring Different URLs.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Spring Security – 不同URL的配置</h1>\\n<p>如果你正在实施Spring Security（特别是OAuth），一定要看看《学习Spring Security》课程：</p>\\n<p><strong>&gt;&gt; 学习Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨如何配置Spring Security以使用不同的安全配置来处理不同的URL模式。</p>\\n<p>当应用程序需要对某些操作进行更高级别的安全保护，而其他操作则允许所有用户访问时，这将非常有用。</p>","autoDesc":true}');export{d as comp,k as data};
