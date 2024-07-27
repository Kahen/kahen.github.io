import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CJGTm_7y.js";const e={},p=t('<h1 id="如何解决spring-boot-post请求中的403错误-baeldung" tabindex="-1"><a class="header-anchor" href="#如何解决spring-boot-post请求中的403错误-baeldung"><span>如何解决Spring Boot POST请求中的403错误 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在Web开发中，遇到错误是常有的事。其中一种错误是HTTP 403禁止错误。</p><p>在本教程中，我们将学习如何在Spring Boot POST请求中解决403错误。我们将从理解403错误的含义开始，然后探索在Spring Boot应用程序中解决它的步骤。</p><h2 id="_2-什么是错误403" tabindex="-1"><a class="header-anchor" href="#_2-什么是错误403"><span>2. 什么是错误403？</span></a></h2><p><strong>HTTP 403错误，通常被称为“禁止”错误，是一个状态码，表示服务器理解了请求，但选择不授权它</strong>。这通常意味着客户端缺乏访问所请求资源的权限。</p><p>需要注意的是，这个错误与401错误不同，401错误表示服务器需要对客户端进行身份验证，但尚未收到有效的凭据。</p><h2 id="_3-错误403的原因" tabindex="-1"><a class="header-anchor" href="#_3-错误403的原因"><span>3. 错误403的原因</span></a></h2><p>有几个因素可能在Spring Boot应用程序中触发403错误。其中之一是当<strong>客户端未能提供认证凭据</strong>。在这种情况下，服务器无法验证客户端的权限，拒绝请求，导致403错误。</p><p>另一个可能的原因在服务器配置中。例如，服务器可能配置为出于安全考虑拒绝来自特定IP地址或用户代理的请求。如果请求来自这些被阻止的实体，服务器会响应403错误。</p><p>此外，Spring Security默认启用跨站请求伪造（CSRF）保护。CSRF是一种攻击，它诱使受害者提交恶意请求，并使用受害者的身份来代表他们执行不希望的功能。<strong>如果用于防止这种攻击的CSRF令牌缺失或不正确，服务器也可能响应错误403</strong>。</p><h2 id="_4-项目设置" tabindex="-1"><a class="header-anchor" href="#_4-项目设置"><span>4. 项目设置</span></a></h2><p>为了演示如何解决403错误，我们将创建一个Spring Boot项目，包含spring-boot-starter-web和spring-boot-starter-security依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``org.springframework.boot``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``spring-boot-starter-security``&lt;/artifactId&gt;``\n``&lt;/dependency&gt;``\n``&lt;dependency&gt;``\n    ``&lt;groupId&gt;``org.springframework.boot``&lt;/groupId&gt;``\n    ``&lt;artifactId&gt;``spring-boot-starter-web``&lt;/artifactId&gt;``\n``&lt;/dependency&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将创建一个控制器类来处理POST请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/test-request&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>` <span class="token function">testPostRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">&quot;POST request successful&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述方法具有@PostMapping注释，这意味着它可以处理服务器的POST请求。一个成功的POST请求返回“POST request successful”作为响应。</p><p>接下来，我们将通过添加内存用户来配置Spring Security：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>\n<span class="token keyword">public</span> <span class="token class-name">InMemoryUserDetailsManager</span> <span class="token function">userDetailsService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">UserDetails</span> user <span class="token operator">=</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token function">withUsername</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span><span class="token function">encoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span><span class="token string">&quot;userPass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">&quot;USER&quot;</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">InMemoryUserDetailsManager</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token annotation punctuation">@Bean</span>\n<span class="token keyword">public</span> <span class="token class-name">PasswordEncoder</span> <span class="token function">encoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BCryptPasswordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们配置应用程序使用内存用户进行请求认证。使用BCryptPasswordEncoder对用户密码进行编码，以增强安全性。</p><p>最后，我们将配置SecurityFilterChain接受所有传入请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>\n<span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    http<span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span>authorizeRequests <span class="token operator">-&gt;</span> authorizeRequests<span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们配置应用程序在不需要任何形式的身份验证的情况下允许所有传入请求。</p><p>在这一部分，我们将探讨可能导致403错误的几个因素，并讨论可能的解决方案。</p><h3 id="_5-1-跨站请求伪造-csrf-保护" tabindex="-1"><a class="header-anchor" href="#_5-1-跨站请求伪造-csrf-保护"><span>5.1. 跨站请求伪造（CSRF）保护</span></a></h3><p>默认情况下，Spring Security启用了CSRF保护。如果请求头中缺少CSRF令牌，服务器会响应403错误。这种行为不特定于任何服务器环境，包括本地主机、暂存或生产环境。</p><p>让我们尝试进行POST请求：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> http://localhost:8080/test-request\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述请求导致禁止错误：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">&quot;timestamp&quot;</span><span class="token operator">:</span><span class="token string">&quot;2023-06-24T16:52:05.397+00:00&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;status&quot;</span><span class="token operator">:</span><span class="token number">403</span><span class="token punctuation">,</span><span class="token property">&quot;error&quot;</span><span class="token operator">:</span><span class="token string">&quot;Forbidden&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;path&quot;</span><span class="token operator">:</span><span class="token string">&quot;/test-request&quot;</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以通过禁用CSRF保护来解决此错误：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>\n<span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    http<span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span>authorizeRequests <span class="token operator">-&gt;</span> authorizeRequests<span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们通过调用disable()方法禁用了CSRF保护。</p><p>让我们对“/test-request”端点进行POST请求：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-H</span> <span class="token string">&quot;Content-Type: application/json&quot;</span> http://localhost:8080/test-request\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>禁用CSRF后，我们进行POST请求，服务器响应预期的HTTP响应“POST request successful”。</p><p>然而，<strong>值得注意的是，在生产环境中的应用程序中禁用CSRF保护通常不推荐。CSRF保护是防止跨站伪造攻击的关键安全措施。因此，建议在状态更改操作的请求头中包含CSRF令牌</strong>。</p><h3 id="_5-2-认证凭据" tabindex="-1"><a class="header-anchor" href="#_5-2-认证凭据"><span>5.2. 认证凭据</span></a></h3><p><strong>向安全端点提供不正确的认证凭据，或不提供认证凭据，可能导致Spring Boot应用程序中的403错误</strong>。</p><p>让我们修改SecurityFilterChain以对服务器的所有请求进行身份验证：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>\n<span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n    http<span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span>authorizeRequests <span class="token operator">-&gt;</span> authorizeRequests<span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，我们配置应用程序在授予访问权限之前对每个请求进行身份验证。如果我们在没有提供正确认证凭据的情况下向端点进行POST请求，服务器会响应403错误。</p><p>让我们使用我们创建的内存用户的凭据向“/test-request”端点进行POST请求：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/07/basic_authentication_to_avoid_error_403-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>上图显示，当我们提供正确的认证时，服务器响应200 OK状态码。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何通过禁用CSRF保护和提供正确的认证凭据来解决Spring Boot中的403错误。我们还演示了如何配置Spring Security以接受经过身份验证和未经身份验证的请求。此外，我们强调了Spring Boot应用程序中403错误的不同原因。</p><p>如往常一样，示例的完整源代码可在GitHub上找到。</p>',48),o=[p];function c(i,l){return a(),s("div",null,o)}const d=n(e,[["render",c],["__file","2024-07-03-How to Solve 403 Error in Spring Boot POST Request.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-03/2024-07-03-How%20to%20Solve%20403%20Error%20in%20Spring%20Boot%20POST%20Request.html","title":"如何解决Spring Boot POST请求中的403错误 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-07-03T00:00:00.000Z","category":["Spring Boot","403 Error"],"tag":["Spring Security","CSRF"],"head":[["meta",{"name":"keywords","content":"Spring Boot, 403 Error, Spring Security, CSRF"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-03/2024-07-03-How%20to%20Solve%20403%20Error%20in%20Spring%20Boot%20POST%20Request.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何解决Spring Boot POST请求中的403错误 | Baeldung"}],["meta",{"property":"og:description","content":"如何解决Spring Boot POST请求中的403错误 | Baeldung 1. 概述 在Web开发中，遇到错误是常有的事。其中一种错误是HTTP 403禁止错误。 在本教程中，我们将学习如何在Spring Boot POST请求中解决403错误。我们将从理解403错误的含义开始，然后探索在Spring Boot应用程序中解决它的步骤。 2. 什..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/07/basic_authentication_to_avoid_error_403-2.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T11:55:20.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"CSRF"}],["meta",{"property":"article:published_time","content":"2023-07-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T11:55:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何解决Spring Boot POST请求中的403错误 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/07/basic_authentication_to_avoid_error_403-2.png\\"],\\"datePublished\\":\\"2023-07-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T11:55:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何解决Spring Boot POST请求中的403错误 | Baeldung 1. 概述 在Web开发中，遇到错误是常有的事。其中一种错误是HTTP 403禁止错误。 在本教程中，我们将学习如何在Spring Boot POST请求中解决403错误。我们将从理解403错误的含义开始，然后探索在Spring Boot应用程序中解决它的步骤。 2. 什..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 什么是错误403？","slug":"_2-什么是错误403","link":"#_2-什么是错误403","children":[]},{"level":2,"title":"3. 错误403的原因","slug":"_3-错误403的原因","link":"#_3-错误403的原因","children":[]},{"level":2,"title":"4. 项目设置","slug":"_4-项目设置","link":"#_4-项目设置","children":[{"level":3,"title":"5.1. 跨站请求伪造（CSRF）保护","slug":"_5-1-跨站请求伪造-csrf-保护","link":"#_5-1-跨站请求伪造-csrf-保护","children":[]},{"level":3,"title":"5.2. 认证凭据","slug":"_5-2-认证凭据","link":"#_5-2-认证凭据","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720007720000,"updatedTime":1720007720000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.72,"words":1417},"filePathRelative":"posts/baeldung/2024-07-03/2024-07-03-How to Solve 403 Error in Spring Boot POST Request.md","localizedDate":"2023年7月3日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在Web开发中，遇到错误是常有的事。其中一种错误是HTTP 403禁止错误。</p>\\n<p>在本教程中，我们将学习如何在Spring Boot POST请求中解决403错误。我们将从理解403错误的含义开始，然后探索在Spring Boot应用程序中解决它的步骤。</p>\\n<h2>2. 什么是错误403？</h2>\\n<p><strong>HTTP 403错误，通常被称为“禁止”错误，是一个状态码，表示服务器理解了请求，但选择不授权它</strong>。这通常意味着客户端缺乏访问所请求资源的权限。</p>\\n<p>需要注意的是，这个错误与401错误不同，401错误表示服务器需要对客户端进行身份验证，但尚未收到有效的凭据。</p>","autoDesc":true}');export{d as comp,k as data};
