import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-DRFG6C5y.js";const e={},p=t(`<h1 id="spring-security-中-permitall-和-anonymous-的区别" tabindex="-1"><a class="header-anchor" href="#spring-security-中-permitall-和-anonymous-的区别"><span>Spring Security 中 permitAll() 和 anonymous() 的区别</span></a></h1><p>如果你正在处理 Spring Security（特别是 OAuth）实现，一定要看看《Learn Spring Security》课程。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>本教程我们将学习 Spring Security 框架中 HttpSecurity 类的 permitAll() 和 anonymous() 方法。Spring Security 框架有助于防止漏洞攻击，并启用 Web 应用程序的认证和授权。利用它，Web 应用程序可以控制对服务器资源的访问，例如 HTML 表单、CSS 文件、JS 文件、Web 服务端点等。它还有助于启用基于角色的访问控制（RBAC）来访问服务器资源。</p><h2 id="_2-安全需求" tabindex="-1"><a class="header-anchor" href="#_2-安全需求"><span>2. 安全需求</span></a></h2><p>在我们继续之前，让我们想象一个电子商务网站，有以下需求：</p><ul><li>匿名用户和认证用户都可以查看网站上的产品</li><li>为匿名和认证用户请求创建审计条目</li><li>匿名用户可以访问用户注册表单，而认证用户则不可以</li><li>只有认证用户可以查看他们的购物车</li></ul><h2 id="_3-控制器和-websecurity-配置" tabindex="-1"><a class="header-anchor" href="#_3-控制器和-websecurity-配置"><span>3. 控制器和 WebSecurity 配置</span></a></h2><p>首先，让我们定义我们的控制器类，它有电子商务网站的端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EcommerceController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/private/showCart&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token annotation punctuation">@ResponseBody</span> <span class="token class-name">String</span> <span class="token function">showCart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Show Cart&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/public/showProducts&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token annotation punctuation">@ResponseBody</span> <span class="token class-name">String</span> <span class="token function">listProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;List Products&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/public/registerUser&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token annotation punctuation">@ResponseBody</span> <span class="token class-name">String</span> <span class="token function">registerUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Register User&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-httpsecurity-中的-permitall-方法" tabindex="-1"><a class="header-anchor" href="#_4-httpsecurity-中的-permitall-方法"><span>4. HttpSecurity 中的 permitAll() 方法</span></a></h2><p>基本上，在 EcommerceWebSecurityConfig 类中，我们使用 permitAll() 向所有人开放了 /public/showProducts 端点。现在，让我们看看它是否有效：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@WithMockUser</span><span class="token punctuation">(</span>username <span class="token operator">=</span> <span class="token string">&quot;spring&quot;</span><span class="token punctuation">,</span> password <span class="token operator">=</span> <span class="token string">&quot;secret&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAuthenticatedUser_whenAccessToProductLinePage_thenAllowAccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token class-name">MockMvcRequestBuilders</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/public/showProducts&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token class-name">MockMvcResultMatchers</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token class-name">MockMvcResultMatchers</span><span class="token punctuation">.</span><span class="token function">content</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token string">&quot;List Products&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@WithAnonymousUser</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenAnonymousUser_whenAccessToProductLinePage_thenAllowAccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    mockMvc<span class="token punctuation">.</span><span class="token function">perform</span><span class="token punctuation">(</span><span class="token class-name">MockMvcRequestBuilders</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/public/showProducts&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token class-name">MockMvcResultMatchers</span><span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">andExpect</span><span class="token punctuation">(</span><span class="token class-name">MockMvcResultMatchers</span><span class="token punctuation">.</span><span class="token function">content</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token string">&quot;List Products&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，匿名用户和认证用户都可以访问页面。</p><h2 id="_5-httpsecurity-中的-anonymous-方法" tabindex="-1"><a class="header-anchor" href="#_5-httpsecurity-中的-anonymous-方法"><span>5. HttpSecurity 中的 anonymous() 方法</span></a></h2><p>在我们开始实现电子商务网站的需求之前，理解 anonymous() 表达式背后的想法很重要。</p><h3 id="_5-1-实现-auditinterceptor" tabindex="-1"><a class="header-anchor" href="#_5-1-实现-auditinterceptor"><span>5.1. 实现 AuditInterceptor</span></a></h3><p>Spring Security 在 AnonymousAuthenticationFilter 中填充了匿名用户的 Authentication 对象。这有助于通过电子商务网站上的拦截器审计匿名和注册用户执行的操作。</p><h3 id="_5-2-拒绝认证用户访问注册用户屏幕" tabindex="-1"><a class="header-anchor" href="#_5-2-拒绝认证用户访问注册用户屏幕"><span>5.2. 拒绝认证用户访问注册用户屏幕</span></a></h3><p>在 EcommerceWebSecurityConfig 类中，通过 anonymous() 表达式，我们确保只有匿名用户可以访问 public/registerUser 端点。而认证用户则不能访问。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>通过本教程中的示例，我们展示了 permitAll() 和 anonymous() 方法之间的区别。</p><p>anonymous() 用于我们有公共内容，应该只对匿名用户开放。相比之下，permitAll() 用于我们想要允许所有用户访问特定 URL，而不考虑他们的认证状态。</p><p>最后，示例可以在 GitHub 上找到。</p>`,24),o=[p];function c(i,u){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-06-30-Difference Between permitAll   and anonymous   in Spring Security.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-30/2024-06-30-Difference%20Between%20permitAll%20%20%20and%20anonymous%20%20%20in%20Spring%20Security.html","title":"Spring Security 中 permitAll() 和 anonymous() 的区别","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security"],"tag":["permitAll()","anonymous()"],"head":[["meta",{"name":"keywords","content":"Spring Security, permitAll(), anonymous(), security, web application"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-30/2024-06-30-Difference%20Between%20permitAll%20%20%20and%20anonymous%20%20%20in%20Spring%20Security.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Security 中 permitAll() 和 anonymous() 的区别"}],["meta",{"property":"og:description","content":"Spring Security 中 permitAll() 和 anonymous() 的区别 如果你正在处理 Spring Security（特别是 OAuth）实现，一定要看看《Learn Spring Security》课程。 1. 概述 本教程我们将学习 Spring Security 框架中 HttpSecurity 类的 permitAll..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-30T04:52:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"permitAll()"}],["meta",{"property":"article:tag","content":"anonymous()"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-30T04:52:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Security 中 permitAll() 和 anonymous() 的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-30T04:52:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Security 中 permitAll() 和 anonymous() 的区别 如果你正在处理 Spring Security（特别是 OAuth）实现，一定要看看《Learn Spring Security》课程。 1. 概述 本教程我们将学习 Spring Security 框架中 HttpSecurity 类的 permitAll..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 安全需求","slug":"_2-安全需求","link":"#_2-安全需求","children":[]},{"level":2,"title":"3. 控制器和 WebSecurity 配置","slug":"_3-控制器和-websecurity-配置","link":"#_3-控制器和-websecurity-配置","children":[]},{"level":2,"title":"4. HttpSecurity 中的 permitAll() 方法","slug":"_4-httpsecurity-中的-permitall-方法","link":"#_4-httpsecurity-中的-permitall-方法","children":[]},{"level":2,"title":"5. HttpSecurity 中的 anonymous() 方法","slug":"_5-httpsecurity-中的-anonymous-方法","link":"#_5-httpsecurity-中的-anonymous-方法","children":[{"level":3,"title":"5.1. 实现 AuditInterceptor","slug":"_5-1-实现-auditinterceptor","link":"#_5-1-实现-auditinterceptor","children":[]},{"level":3,"title":"5.2. 拒绝认证用户访问注册用户屏幕","slug":"_5-2-拒绝认证用户访问注册用户屏幕","link":"#_5-2-拒绝认证用户访问注册用户屏幕","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719723169000,"updatedTime":1719723169000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.26,"words":678},"filePathRelative":"posts/baeldung/2024-06-30/2024-06-30-Difference Between permitAll   and anonymous   in Spring Security.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>如果你正在处理 Spring Security（特别是 OAuth）实现，一定要看看《Learn Spring Security》课程。</p>\\n<h2>1. 概述</h2>\\n<p>本教程我们将学习 Spring Security 框架中 HttpSecurity 类的 permitAll() 和 anonymous() 方法。Spring Security 框架有助于防止漏洞攻击，并启用 Web 应用程序的认证和授权。利用它，Web 应用程序可以控制对服务器资源的访问，例如 HTML 表单、CSS 文件、JS 文件、Web 服务端点等。它还有助于启用基于角色的访问控制（RBAC）来访问服务器资源。</p>","autoDesc":true}');export{d as comp,k as data};
