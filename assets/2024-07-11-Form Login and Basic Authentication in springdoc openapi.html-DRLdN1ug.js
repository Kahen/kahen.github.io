import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-D4B8YWfq.js";const p={},e=t(`<h1 id="springdoc-openapi-中的表单登录和基本认证" tabindex="-1"><a class="header-anchor" href="#springdoc-openapi-中的表单登录和基本认证"><span>Springdoc-OpenAPI 中的表单登录和基本认证</span></a></h1><p>如果您正在使用 Spring Security（特别是 OAuth）实现，请务必查看《学习 Spring 安全》课程。</p><p><strong>&gt;&gt; 学习 Spring 安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Springdoc-OpenAPI 是一个库，它基于 OpenAPI 3 规范自动化生成 Spring Boot 应用程序的服务文档。</p><p>通过用户界面与我们的 API 交互而无需实现用户界面可能会很方便。因此，让我们看看如果涉及授权，我们如何使用端点。</p><p>在本教程中，我们将学习<strong>如何在 Springdoc 中使用 Spring Security 管理表单登录和基本认证来安全访问端点</strong>。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>我们将设置一个由 Spring Security 保护的 Spring Boot Web 应用程序，并使用 Springdoc 生成文档。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>让我们为我们的项目声明所需的 Maven 依赖项。我们将添加 <code>springdoc-openapi-starter-webmvc-ui</code>，负责与 Swagger-UI 集成，并默认提供可通过以下地址访问的可视化工具：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>http://localhost:8080/swagger-ui.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
     \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springdoc\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
     \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`springdoc-openapi-starter-webmvc-ui\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
     \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`2.5.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-示例-api" tabindex="-1"><a class="header-anchor" href="#_2-2-示例-api"><span>2.2. 示例 API</span></a></h3><p>对于本文，我们将实现一个虚拟的 REST 控制器，作为使用 Springdoc 生成文档的来源。此外，我们将举例说明如何通过 Swagger-UI 通过身份验证与 <code>FooController</code> 的受保护端点交互。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;foos&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON_VALUE</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@OpenAPIDefinition</span><span class="token punctuation">(</span>info <span class="token operator">=</span> <span class="token annotation punctuation">@Info</span><span class="token punctuation">(</span>title <span class="token operator">=</span> <span class="token string">&quot;Foos API&quot;</span><span class="token punctuation">,</span> version <span class="token operator">=</span> <span class="token string">&quot;v1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FooController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">FooDTO</span> <span class="token function">findById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token keyword">final</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FooDTO</span><span class="token punctuation">(</span><span class="token function">randomAlphabetic</span><span class="token punctuation">(</span><span class="token constant">STRING_LENGTH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">FooDTO</span><span class="token punctuation">&gt;</span></span>\` <span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Lists</span><span class="token punctuation">.</span><span class="token function">newArrayList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FooDTO</span><span class="token punctuation">(</span><span class="token function">randomAlphabetic</span><span class="token punctuation">(</span><span class="token constant">STRING_LENGTH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token keyword">new</span> <span class="token class-name">FooDTO</span><span class="token punctuation">(</span><span class="token function">randomAlphabetic</span><span class="token punctuation">(</span><span class="token constant">STRING_LENGTH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">FooDTO</span><span class="token punctuation">(</span><span class="token function">randomAlphabetic</span><span class="token punctuation">(</span><span class="token constant">STRING_LENGTH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PostMapping</span>
    <span class="token annotation punctuation">@ResponseStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">CREATED</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">FooDTO</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token keyword">final</span> <span class="token class-name">FooDTO</span> fooDTO<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> fooDTO<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-用户凭据" tabindex="-1"><a class="header-anchor" href="#_2-3-用户凭据"><span>2.3. 用户凭据</span></a></h3><p>我们将使用 Spring Security 的内存认证来注册我们的测试用户凭据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configureGlobal</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">,</span> <span class="token class-name">PasswordEncoder</span> passwordEncoder<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    auth<span class="token punctuation">.</span><span class="token function">inMemoryAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">password</span><span class="token punctuation">(</span>passwordEncoder<span class="token punctuation">.</span><span class="token function">encode</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">roles</span><span class="token punctuation">(</span><span class="token string">&quot;USER&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看看我们如何通过身份验证与我们基于表单登录保护的文档化端点交互。</p><h3 id="_3-1-安全配置" tabindex="-1"><a class="header-anchor" href="#_3-1-安全配置"><span>3.1. 安全配置</span></a></h3><p>在这里，我们定义了使用表单登录授权请求的安全配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">filterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    http<span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>auth <span class="token operator">-&gt;</span> auth<span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/v3/api-docs/**&quot;</span><span class="token punctuation">,</span>
                 <span class="token string">&quot;/swagger-ui/**&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/swagger-ui.html&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">formLogin</span><span class="token punctuation">(</span>formLogin <span class="token operator">-&gt;</span> formLogin<span class="token punctuation">.</span><span class="token function">defaultSuccessUrl</span><span class="token punctuation">(</span><span class="token string">&quot;/foos&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-登录文档" tabindex="-1"><a class="header-anchor" href="#_3-2-登录文档"><span>3.2. 登录文档</span></a></h3><p>默认情况下，框架提供的登录端点没有被记录。因此，我们需要通过设置相应的配置属性使其可见。此外，可以在库的文档中找到有用的配置属性：</p><div class="language-properties line-numbers-mode" data-ext="properties" data-title="properties"><pre class="language-properties"><code><span class="token key attr-name">springdoc.show-login-endpoint</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后，<strong>Springdoc 将检测配置的 Spring Security 的表单登录，并在 Swagger-UI 中生成文档</strong>。因此，它将添加带有用户名和密码请求参数以及特定的 <code>application/x-www-form-urlencoded</code> 请求正文类型的 <code>/login</code> 端点：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/2_login-endpoint-swagger-ui.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>认证后，我们可以调用受保护的 <code>FooController</code> 端点。此外，由于安全配置的 <code>defaultSucccesfulUrl</code>，我们还将获得来自 <code>/foos</code> 端点的响应，因为登录成功：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/2_successful-login-swagger.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-3-注销文档" tabindex="-1"><a class="header-anchor" href="#_3-3-注销文档"><span>3.3. 注销文档</span></a></h3><p>能够在 Swagger-UI 中注销有助于用户切换，这可能很有帮助。例如，当应用基于角色的 API 授权时。</p><p><strong>Springdoc 不像登录那样提供自动检测注销端点的方式</strong>。在这种情况下，我们需要定义一个虚拟的 REST 控制器，公开一个 post 请求映射到 <code>/logout</code> 路径。然而，我们不需要添加实现，因为 Spring Security 将拦截并处理请求：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LogoutController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;logout&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过添加 <code>LogoutController</code>，库将生成文档并使注销在 Swagger-UI 中可用：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/2_logout-controller-endpoint-swagger-ui.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_4-基本认证" tabindex="-1"><a class="header-anchor" href="#_4-基本认证"><span>4. 基本认证</span></a></h2><p>当处理使用基本认证保护的端点时，我们不需要直接调用登录。另一方面，OpenAPI 支持一组标准安全方案，包括基本认证，我们可以相应地配置 Springdoc。</p><h3 id="_4-1-安全配置" tabindex="-1"><a class="header-anchor" href="#_4-1-安全配置"><span>4.1. 安全配置</span></a></h3><p>使用基本认证保护端点的简单安全配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">filterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    http<span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>auth <span class="token operator">-&gt;</span> auth<span class="token punctuation">.</span><span class="token function">requestMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/v3/api-docs/**&quot;</span><span class="token punctuation">,</span>
                 <span class="token string">&quot;/swagger-ui/**&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/swagger-ui.html&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">httpBasic</span><span class="token punctuation">(</span><span class="token class-name">Customizer</span><span class="token punctuation">.</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-springdoc-安全方案" tabindex="-1"><a class="header-anchor" href="#_4-2-springdoc-安全方案"><span>4.2. Springdoc 安全方案</span></a></h3><p>要配置 OpenAPI 安全方案，我们需要提供基于 <code>@SecurityScheme</code> 注解的配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@SecurityScheme</span><span class="token punctuation">(</span>
  type <span class="token operator">=</span> <span class="token class-name">SecuritySchemeType</span><span class="token punctuation">.</span><span class="token constant">HTTP</span><span class="token punctuation">,</span>
  name <span class="token operator">=</span> <span class="token string">&quot;basicAuth&quot;</span><span class="token punctuation">,</span>
  scheme <span class="token operator">=</span> <span class="token string">&quot;basic&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringdocConfig</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们还需要使用 <code>@SecurityRequirement(name = “basicAuth”)</code> 注解我们的 <code>FooController</code>。如果我们只想保护某些端点或使用不同的方案，我们可以在方法级别应用此注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@OpenAPIDefinition</span><span class="token punctuation">(</span>info <span class="token operator">=</span> <span class="token annotation punctuation">@Info</span><span class="token punctuation">(</span>title <span class="token operator">=</span> <span class="token string">&quot;Foos API&quot;</span><span class="token punctuation">,</span> version <span class="token operator">=</span> <span class="token string">&quot;v1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@SecurityRequirement</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;basicAuth&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;foos&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token class-name">MediaType</span><span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON_VALUE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FooController</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，Swagger-UI 中将提供授权按钮：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/2_authorize-button-swagger-ui.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后，我们可以在表单中提供我们的用户凭据：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/12/2_basic-authentication-form-swagger.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>随后，<strong>在调用任何 <code>FooController</code> 端点时，请求中将包含带有凭据的授权标头</strong>，如生成的 curl 命令所示。因此，我们将被授权执行请求：</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何配置 Springdoc 的身份验证，以便通过在 Swagger-UI 中生成的文档访问受保护的端点。起初，我们经历了基于表单的登录设置。然后，我们为基本认证配置了安全方案。</p><p>本教程的项目实现可在 GitHub 上找到。</p>`,54),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","2024-07-11-Form Login and Basic Authentication in springdoc openapi.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Form%20Login%20and%20Basic%20Authentication%20in%20springdoc%20openapi.html","title":"Springdoc-OpenAPI 中的表单登录和基本认证","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","Springdoc-OpenAPI"],"tag":["Form Login","Basic Authentication"],"head":[["meta",{"name":"keywords","content":"Spring Security, Springdoc-OpenAPI, Form Login, Basic Authentication"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Form%20Login%20and%20Basic%20Authentication%20in%20springdoc%20openapi.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Springdoc-OpenAPI 中的表单登录和基本认证"}],["meta",{"property":"og:description","content":"Springdoc-OpenAPI 中的表单登录和基本认证 如果您正在使用 Spring Security（特别是 OAuth）实现，请务必查看《学习 Spring 安全》课程。 >> 学习 Spring 安全 1. 概述 Springdoc-OpenAPI 是一个库，它基于 OpenAPI 3 规范自动化生成 Spring Boot 应用程序的服务文..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/12/2_login-endpoint-swagger-ui.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T12:02:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Form Login"}],["meta",{"property":"article:tag","content":"Basic Authentication"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T12:02:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Springdoc-OpenAPI 中的表单登录和基本认证\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/12/2_login-endpoint-swagger-ui.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/2_successful-login-swagger.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/2_logout-controller-endpoint-swagger-ui.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/2_authorize-button-swagger-ui.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/12/2_basic-authentication-form-swagger.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T12:02:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Springdoc-OpenAPI 中的表单登录和基本认证 如果您正在使用 Spring Security（特别是 OAuth）实现，请务必查看《学习 Spring 安全》课程。 >> 学习 Spring 安全 1. 概述 Springdoc-OpenAPI 是一个库，它基于 OpenAPI 3 规范自动化生成 Spring Boot 应用程序的服务文..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 示例 API","slug":"_2-2-示例-api","link":"#_2-2-示例-api","children":[]},{"level":3,"title":"2.3. 用户凭据","slug":"_2-3-用户凭据","link":"#_2-3-用户凭据","children":[]},{"level":3,"title":"3.1. 安全配置","slug":"_3-1-安全配置","link":"#_3-1-安全配置","children":[]},{"level":3,"title":"3.2. 登录文档","slug":"_3-2-登录文档","link":"#_3-2-登录文档","children":[]},{"level":3,"title":"3.3. 注销文档","slug":"_3-3-注销文档","link":"#_3-3-注销文档","children":[]}]},{"level":2,"title":"4. 基本认证","slug":"_4-基本认证","link":"#_4-基本认证","children":[{"level":3,"title":"4.1. 安全配置","slug":"_4-1-安全配置","link":"#_4-1-安全配置","children":[]},{"level":3,"title":"4.2. Springdoc 安全方案","slug":"_4-2-springdoc-安全方案","link":"#_4-2-springdoc-安全方案","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720699360000,"updatedTime":1720699360000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.42,"words":1327},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Form Login and Basic Authentication in springdoc openapi.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>如果您正在使用 Spring Security（特别是 OAuth）实现，请务必查看《学习 Spring 安全》课程。</p>\\n<p><strong>&gt;&gt; 学习 Spring 安全</strong></p>\\n<h2>1. 概述</h2>\\n<p>Springdoc-OpenAPI 是一个库，它基于 OpenAPI 3 规范自动化生成 Spring Boot 应用程序的服务文档。</p>\\n<p>通过用户界面与我们的 API 交互而无需实现用户界面可能会很方便。因此，让我们看看如果涉及授权，我们如何使用端点。</p>\\n<p>在本教程中，我们将学习<strong>如何在 Springdoc 中使用 Spring Security 管理表单登录和基本认证来安全访问端点</strong>。</p>","autoDesc":true}');export{d as comp,k as data};
