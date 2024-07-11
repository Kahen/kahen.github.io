import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-uizvaz9h.js";const e={},p=t(`<hr><h1 id="使用api密钥和密钥保护spring-boot-api" tabindex="-1"><a class="header-anchor" href="#使用api密钥和密钥保护spring-boot-api"><span>使用API密钥和密钥保护Spring Boot API</span></a></h1><p>如果你正在使用Spring Security（特别是OAuth）实现，请务必查看《学习Spring安全》课程。</p><p><strong>&gt; &gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>安全在REST API开发中扮演着至关重要的角色。一个不安全的REST API可以直接访问后端系统的敏感数据。因此，组织需要关注API安全。</p><p>Spring Security提供了多种机制来保护我们的REST API。其中之一是API密钥。API密钥是一个令牌，客户端在调用API时提供。</p><p>在本教程中，我们将讨论在Spring Security中实现基于API密钥的认证。</p><h2 id="_2-rest-api安全" tabindex="-1"><a class="header-anchor" href="#_2-rest-api安全"><span>2. REST API安全</span></a></h2><p>Spring Security可以用来保护REST API。<strong>REST API是无状态的。因此，它们不应该使用会话或cookies。相反，这些应该使用基础认证、API密钥、JWT或基于OAuth2的令牌来确保安全。</strong></p><h3 id="_2-1-基础认证" tabindex="-1"><a class="header-anchor" href="#_2-1-基础认证"><span>2.1. 基础认证</span></a></h3><p>基础认证是一个简单的认证方案。客户端发送HTTP请求，其中包含一个_Authorization_头，后面跟着单词_Basic_，一个空格和一个Base64编码的字符串_username_:<em>password</em>。只有在HTTPS/SSL等其他安全机制下，基础认证才被认为是安全的。</p><h3 id="_2-2-oauth2" tabindex="-1"><a class="header-anchor" href="#_2-2-oauth2"><span>2.2. OAuth2</span></a></h3><p>OAuth2是REST API安全的事实上的标准。它是一个开放的认证和授权标准，允许资源所有者通过访问令牌给客户端委托访问私有数据。</p><h3 id="_2-3-api密钥" tabindex="-1"><a class="header-anchor" href="#_2-3-api密钥"><span>2.3. API密钥</span></a></h3><p>一些REST API使用API密钥进行认证。API密钥是一个令牌，它标识API客户端到API，而不引用实际的用户。令牌可以在查询字符串中发送或作为请求头。像基础认证一样，可以使用SSL隐藏密钥。</p><p>本教程重点介绍如何使用Spring Security实现API密钥认证。</p><h2 id="_3-使用api密钥保护rest-api" tabindex="-1"><a class="header-anchor" href="#_3-使用api密钥保护rest-api"><span>3. 使用API密钥保护REST API</span></a></h2><p>在这一部分，我们将创建一个Spring Boot应用程序，并使用基于API密钥的认证来保护它。</p><h3 id="_3-1-maven依赖项" tabindex="-1"><a class="header-anchor" href="#_3-1-maven依赖项"><span>3.1. Maven依赖项</span></a></h3><p>让我们从在我们的_pom.xml_中声明_spring-boot-starter-security_依赖项开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.boot\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-boot-starter-security\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-创建自定义过滤器" tabindex="-1"><a class="header-anchor" href="#_3-2-创建自定义过滤器"><span>3.2. 创建自定义过滤器</span></a></h3><p><strong>想法是从请求中获取HTTP API密钥头，然后检查与我们配置的秘密。</strong> <strong>在这种情况下，我们需要在Spring Security配置类中添加一个自定义过滤器。</strong></p><p>我们将从实现_GenericFilterBean_开始。_GenericFilterBean_是一个简单的_javax.servlet.Filter_实现，它是Spring感知的。</p><p>让我们创建_AuthenticationFilter_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AuthenticationFilter</span> <span class="token keyword">extends</span> <span class="token class-name">GenericFilterBean</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> filterChain<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Authentication</span> authentication <span class="token operator">=</span> <span class="token class-name">AuthenticationService</span><span class="token punctuation">.</span><span class="token function">getAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">)</span> request<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAuthentication</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> exp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">HttpServletResponse</span> httpResponse <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">)</span> response<span class="token punctuation">;</span>
            httpResponse<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">.</span><span class="token constant">SC_UNAUTHORIZED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            httpResponse<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">PrintWriter</span> writer <span class="token operator">=</span> httpResponse<span class="token punctuation">.</span><span class="token function">getWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            writer<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>exp<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            writer<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            writer<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们只需要实现一个_doFilter()_方法。在这个方法中，我们评估API密钥头，并将结果_Authentication_对象设置到当前_SecurityContext_实例中。</p><p>然后，请求被传递到其余的过滤器进行处理，然后路由到_DispatcherServlet_，最后到我们的控制器。</p><p>我们将评估API密钥和构建_Authentication_对象的任务委托给_AuthenticationService_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AuthenticationService</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">AUTH_TOKEN_HEADER_NAME</span> <span class="token operator">=</span> <span class="token string">&quot;X-API-KEY&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">AUTH_TOKEN</span> <span class="token operator">=</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Authentication</span> <span class="token function">getAuthentication</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> apiKey <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token constant">AUTH_TOKEN_HEADER_NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>apiKey <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>apiKey<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token constant">AUTH_TOKEN</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BadCredentialsException</span><span class="token punctuation">(</span><span class="token string">&quot;Invalid API Key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ApiKeyAuthentication</span><span class="token punctuation">(</span>apiKey<span class="token punctuation">,</span> <span class="token class-name">AuthorityUtils</span><span class="token punctuation">.</span><span class="token constant">NO_AUTHORITIES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们检查请求是否包含带有密钥的API密钥头。如果头部是_null_或者不等于密钥，我们抛出一个_BadCredentialsException_。如果请求有头部，它执行认证，将密钥添加到安全上下文，然后将调用传递到下一个安全过滤器。我们的_getAuthentication_方法非常简单——我们只是比较API密钥头和密钥与静态值。</p><p>要构建_Authentication_对象，我们必须使用Spring Security通常用于构建标准认证的对象的方法。所以，让我们扩展_AbstractAuthenticationToken_类并手动触发认证。</p><h3 id="_3-3-扩展-abstractauthenticationtoken" tabindex="-1"><a class="header-anchor" href="#_3-3-扩展-abstractauthenticationtoken"><span>3.3. 扩展_AbstractAuthenticationToken_</span></a></h3><p><strong>为了成功实现我们应用程序的认证，我们需要将传入的API密钥转换为一个_Authentication_对象，例如一个_AbstractAuthenticationToken_。</strong> _AbstractAuthenticationToken_类实现了_Authentication_接口，表示已认证请求的秘密/主体。</p><p>让我们创建_ApiKeyAuthentication_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApiKeyAuthentication</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractAuthenticationToken</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> apiKey<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ApiKeyAuthentication</span><span class="token punctuation">(</span><span class="token class-name">String</span> apiKey<span class="token punctuation">,</span> <span class="token class-name">Collection</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">GrantedAuthority</span><span class="token punctuation">&gt;</span></span>\` authorities<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>authorities<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>apiKey <span class="token operator">=</span> apiKey<span class="token punctuation">;</span>
        <span class="token function">setAuthenticated</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getCredentials</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getPrincipal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> apiKey<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_ApiKeyAuthentication_类是一种_AbstractAuthenticationToken_对象，其中_apiKey_信息是从HTTP请求中获取的。我们在构造函数中使用_setAuthenticated(true)_方法。结果，_Authentication_对象包含_apiKey_和_authenticated_字段：</p><h3 id="_3-4-安全配置" tabindex="-1"><a class="header-anchor" href="#_3-4-安全配置"><span>3.4. 安全配置</span></a></h3><p>我们可以通过创建一个_SecurityFilterChain_ bean来以编程方式注册我们的自定义过滤器。在这种情况下，<strong>我们需要在_HttpSecurity_实例上使用_addFilterBefore()_方法将_AuthenticationFilter_添加到_UsernamePasswordAuthenticationFilter_类之前。</strong></p><p>让我们创建_SecurityConfig_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableWebSecurity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">filterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        http<span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>authorizationManagerRequestMatcherRegistry <span class="token operator">-&gt;</span> authorizationManagerRequestMatcherRegistry<span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token class-name">Customizer</span><span class="token punctuation">.</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">sessionManagement</span><span class="token punctuation">(</span>httpSecuritySessionManagementConfigurer <span class="token operator">-&gt;</span> httpSecuritySessionManagementConfigurer<span class="token punctuation">.</span><span class="token function">sessionCreationPolicy</span><span class="token punctuation">(</span><span class="token class-name">SessionCreationPolicy</span><span class="token punctuation">.</span><span class="token constant">STATELESS</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">addFilterBefore</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AuthenticationFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">UsernamePasswordAuthenticationFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，会话策略设置为_STATELESS_，因为我们将使用REST端点。</p><h3 id="_3-5-resourcecontroller" tabindex="-1"><a class="header-anchor" href="#_3-5-resourcecontroller"><span>3.5. <em>ResourceController</em></span></a></h3><p>最后，我们将创建一个带有_/home_映射的_ResourceController_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ResourceController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/home&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">homeEndpoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Baeldung !&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-禁用默认自动配置" tabindex="-1"><a class="header-anchor" href="#_3-6-禁用默认自动配置"><span>3.6. 禁用默认自动配置</span></a></h3><p>我们需要丢弃安全自动配置。为此，我们排除_SecurityAutoConfiguration_和_UserDetailsServiceAutoConfiguration_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span><span class="token punctuation">(</span>exclude <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token class-name">SecurityAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">UserDetailsServiceAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApiKeySecretAuthApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ApiKeySecretAuthApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，应用程序已经准备好进行测试。</p><h2 id="_4-测试" tabindex="-1"><a class="header-anchor" href="#_4-测试"><span>4. 测试</span></a></h2><p>我们可以使用curl命令来使用受保护的应用程序。</p><p>首先，让我们尝试请求_/home_而不提供任何安全凭证：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">--location</span> <span class="token parameter variable">--request</span> GET <span class="token string">&#39;http://localhost:8080/home&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们得到预期的_401 Unauthorized_。</p><p>现在让我们请求相同的资源，但提供API密钥和密钥以访问它：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">--location</span> <span class="token parameter variable">--request</span> GET <span class="token string">&#39;http://localhost:8080/home&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">--header</span> <span class="token string">&#39;X-API-KEY: Baeldung&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>结果，服务器的响应是_200 OK_。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们讨论了REST API安全机制。然后，我们在Spring Boot应用程序中实现了Spring Security，使用API密钥认证机制来保护我们的REST API。</p><p>像往常一样，代码示例可以在GitHub上找到。</p>`,61),o=[p];function c(i,l){return a(),s("div",null,o)}const k=n(e,[["render",c],["__file","2024-07-05-Securing Spring Boot API With API Key and Secret.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Securing%20Spring%20Boot%20API%20With%20API%20Key%20and%20Secret.html","title":"使用API密钥和密钥保护Spring Boot API","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","API Key"],"tag":["Spring Boot","Security","API Key"],"head":[["meta",{"name":"keywords","content":"Spring Boot, API Key, Security"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Securing%20Spring%20Boot%20API%20With%20API%20Key%20and%20Secret.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用API密钥和密钥保护Spring Boot API"}],["meta",{"property":"og:description","content":"使用API密钥和密钥保护Spring Boot API 如果你正在使用Spring Security（特别是OAuth）实现，请务必查看《学习Spring安全》课程。 > > 学习Spring 安全 1. 概述 安全在REST API开发中扮演着至关重要的角色。一个不安全的REST API可以直接访问后端系统的敏感数据。因此，组织需要关注API安全。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T04:57:09.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Security"}],["meta",{"property":"article:tag","content":"API Key"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T04:57:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用API密钥和密钥保护Spring Boot API\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T04:57:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用API密钥和密钥保护Spring Boot API 如果你正在使用Spring Security（特别是OAuth）实现，请务必查看《学习Spring安全》课程。 > > 学习Spring 安全 1. 概述 安全在REST API开发中扮演着至关重要的角色。一个不安全的REST API可以直接访问后端系统的敏感数据。因此，组织需要关注API安全。 ..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. REST API安全","slug":"_2-rest-api安全","link":"#_2-rest-api安全","children":[{"level":3,"title":"2.1. 基础认证","slug":"_2-1-基础认证","link":"#_2-1-基础认证","children":[]},{"level":3,"title":"2.2. OAuth2","slug":"_2-2-oauth2","link":"#_2-2-oauth2","children":[]},{"level":3,"title":"2.3. API密钥","slug":"_2-3-api密钥","link":"#_2-3-api密钥","children":[]}]},{"level":2,"title":"3. 使用API密钥保护REST API","slug":"_3-使用api密钥保护rest-api","link":"#_3-使用api密钥保护rest-api","children":[{"level":3,"title":"3.1. Maven依赖项","slug":"_3-1-maven依赖项","link":"#_3-1-maven依赖项","children":[]},{"level":3,"title":"3.2. 创建自定义过滤器","slug":"_3-2-创建自定义过滤器","link":"#_3-2-创建自定义过滤器","children":[]},{"level":3,"title":"3.3. 扩展_AbstractAuthenticationToken_","slug":"_3-3-扩展-abstractauthenticationtoken","link":"#_3-3-扩展-abstractauthenticationtoken","children":[]},{"level":3,"title":"3.4. 安全配置","slug":"_3-4-安全配置","link":"#_3-4-安全配置","children":[]},{"level":3,"title":"3.5. ResourceController","slug":"_3-5-resourcecontroller","link":"#_3-5-resourcecontroller","children":[]},{"level":3,"title":"3.6. 禁用默认自动配置","slug":"_3-6-禁用默认自动配置","link":"#_3-6-禁用默认自动配置","children":[]}]},{"level":2,"title":"4. 测试","slug":"_4-测试","link":"#_4-测试","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720155429000,"updatedTime":1720155429000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.2,"words":1561},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Securing Spring Boot API With API Key and Secret.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用API密钥和密钥保护Spring Boot API</h1>\\n<p>如果你正在使用Spring Security（特别是OAuth）实现，请务必查看《学习Spring安全》课程。</p>\\n<p><strong>&gt; &gt; 学习Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 概述</h2>\\n<p>安全在REST API开发中扮演着至关重要的角色。一个不安全的REST API可以直接访问后端系统的敏感数据。因此，组织需要关注API安全。</p>\\n<p>Spring Security提供了多种机制来保护我们的REST API。其中之一是API密钥。API密钥是一个令牌，客户端在调用API时提供。</p>","autoDesc":true}');export{k as comp,d as data};
