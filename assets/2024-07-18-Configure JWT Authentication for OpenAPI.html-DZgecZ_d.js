import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-BkL9UgS7.js";const t={},p=e(`<hr><h1 id="如何为spring-boot应用中的openapi配置jwt认证" tabindex="-1"><a class="header-anchor" href="#如何为spring-boot应用中的openapi配置jwt认证"><span>如何为Spring Boot应用中的OpenAPI配置JWT认证</span></a></h1><p>如果你正在处理Spring Security（尤其是OAuth）实现，一定要看看《Learn Spring Security》课程：</p><p><strong>&gt; &gt; LEARN SPRING</strong><strong>SECURITY</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>OpenAPI 是一种语言无关且平台独立的规范，它标准化了REST API。OpenAPI 使用户能够轻松理解API而无需深入代码。Swagger-UI 基于这个OpenAPI规范生成一个用户界面，帮助可视化和测试REST API。</p><p>在本教程中，我们将学习如何生成OpenAPI文档，测试REST API，并使用Springdoc-OpenAPI在Spring Boot应用程序中为我们的OpenAPI配置JWT认证。</p><h2 id="_2-swagger-ui" tabindex="-1"><a class="header-anchor" href="#_2-swagger-ui"><span>2. Swagger-UI</span></a></h2><p>Swagger-UI 是一系列HTML、Javascript和CSS文件的集合，它基于OpenAPI规范生成用户界面。<strong>让我们使用Springdoc-OpenAPI库来自动化生成REST API的OpenAPI文档</strong>，并使用Swagger-UI来可视化这些API。</p><p>当应用程序中的API数量不断增加时，编写OpenAPI文档规范可能会变得具有挑战性。Springdoc-OpenAPI帮助我们自动生成OpenAPI文档。进一步地，让我们尝试使用这个库并生成OpenAPI文档。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>首先，让我们通过添加Springdoc-OpenAPI依赖项开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springdoc\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`springdoc-openapi-ui\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`1.7.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个依赖项还会将Swagger-UI web-jars添加到我们的Spring Boot应用程序中。</p><h3 id="_2-2-配置" tabindex="-1"><a class="header-anchor" href="#_2-2-配置"><span>2.2. 配置</span></a></h3><p>接下来，让我们启动应用程序并在浏览器中访问URL <em>http://localhost:8080/swagger-ui.html</em>。</p><p>结果，我们得到了Swagger-UI页面：</p><h3 id="" tabindex="-1"><a class="header-anchor" href="#"><span><img src="https://www.baeldung.com/wp-content/uploads/2022/06/swagger-1-1-1024x264.png" alt="img" loading="lazy"></span></a></h3><p><strong>同样，_OpenAPI v3.0_文档将在_http://localhost:8080/v3/api-docs_中可用。</strong></p><p>此外，让我们使用 <em>@OpenAPIDefinition</em> 为我们的 <em>User</em> API添加描述、服务条款和其他元信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@OpenAPIDefinition</span><span class="token punctuation">(</span>
  info <span class="token operator">=</span><span class="token annotation punctuation">@Info</span><span class="token punctuation">(</span>
    title <span class="token operator">=</span> <span class="token string">&quot;User API&quot;</span><span class="token punctuation">,</span>
    version <span class="token operator">=</span> <span class="token string">&quot;\${api.version}&quot;</span><span class="token punctuation">,</span>
    contact <span class="token operator">=</span> <span class="token annotation punctuation">@Contact</span><span class="token punctuation">(</span>
      name <span class="token operator">=</span> <span class="token string">&quot;Baeldung&quot;</span><span class="token punctuation">,</span> email <span class="token operator">=</span> <span class="token string">&quot;user-apis@baeldung.com&quot;</span><span class="token punctuation">,</span> url <span class="token operator">=</span> <span class="token string">&quot;https://www.baeldung.com&quot;</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
    license <span class="token operator">=</span> <span class="token annotation punctuation">@License</span><span class="token punctuation">(</span>
      name <span class="token operator">=</span> <span class="token string">&quot;Apache 2.0&quot;</span><span class="token punctuation">,</span> url <span class="token operator">=</span> <span class="token string">&quot;https://www.apache.org/licenses/LICENSE-2.0&quot;</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
    termsOfService <span class="token operator">=</span> <span class="token string">&quot;\${tos.uri}&quot;</span><span class="token punctuation">,</span>
    description <span class="token operator">=</span> <span class="token string">&quot;\${api.description}&quot;</span>
  <span class="token punctuation">)</span><span class="token punctuation">,</span>
  servers <span class="token operator">=</span> <span class="token annotation punctuation">@Server</span><span class="token punctuation">(</span>
    url <span class="token operator">=</span> <span class="token string">&quot;\${api.server.url}&quot;</span><span class="token punctuation">,</span>
    description <span class="token operator">=</span> <span class="token string">&quot;Production&quot;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OpenAPISecurityConfiguration</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以外部化配置和元信息。例如，在 <em>application.properties</em> 或 <em>application.yaml</em> 文件中定义 <em>api.version</em>、<em>tos.uri</em> 和 <em>api.description</em>。</p><h3 id="_2-3-测试" tabindex="-1"><a class="header-anchor" href="#_2-3-测试"><span>2.3. 测试</span></a></h3><p>最后，让我们测试Swagger-UI并检查OpenAPI文档。</p><p>为此，启动应用程序并打开URL <em>http://localhost:8080/swagger-ui/index.html</em> 以查看Swagger-UI：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/06/swagger-config-1024x230.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>同样，OpenAPI文档将在 <em>http://localhost:8080/v3/api-docs</em> 可用：</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;openapi&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3.0.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;info&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;User API&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;termsOfService&quot;</span><span class="token operator">:</span> <span class="token string">&quot;terms-of-service&quot;</span><span class="token punctuation">,</span>
     ...
     ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Springdoc-OpenAPI根据我们的应用程序REST API生成文档。此外，可以使用Springdoc-OpenAPI注解自定义此文档。</p><p>在本节中，让我们学习如何为我们的OpenAPI配置基于JWT的认证。</p><p>我们可以按操作、类或全局级别为OpenAPI配置JWT认证。</p><h3 id="_3-1-按操作配置" tabindex="-1"><a class="header-anchor" href="#_3-1-按操作配置"><span>3.1. 按操作配置</span></a></h3><p>首先，让我们只对特定操作声明JWT认证。让我们定义此配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@SecurityScheme</span><span class="token punctuation">(</span>
  name <span class="token operator">=</span> <span class="token string">&quot;Bearer Authentication&quot;</span><span class="token punctuation">,</span>
  type <span class="token operator">=</span> <span class="token class-name">SecuritySchemeType</span><span class="token punctuation">.</span><span class="token constant">HTTP</span><span class="token punctuation">,</span>
  bearerFormat <span class="token operator">=</span> <span class="token string">&quot;JWT&quot;</span><span class="token punctuation">,</span>
  scheme <span class="token operator">=</span> <span class="token string">&quot;bearer&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OpenAPI30Configuration</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>@SecurityScheme</em> 注解将 <em>securitySchemes</em> 添加到OneAPI规范的 <em>components</em> 部分。<em>@SecurityScheme</em> 定义了我们的API可以使用的安全机制。<strong>支持的安全方案是 <em>APIKey</em>、<em>HTTP认证（基本和承载）</em>、<em>OAuth2</em> 和 <em>OpenID Connect</em></strong>。在这种情况下，让我们使用 <em>HTTP承载认证</em> 作为我们的安全方案。</p><p><strong>对于基于HTTP承载令牌的认证，我们需要选择安全方案为 <em>bearerAuth</em> 并承载格式为 <em>JWT</em>。</strong></p><p>由于我们只想保护特定的操作，我们需要指定需要认证的操作。对于操作级认证，我们应该在操作上使用 <em>@SecurityRequirement</em> 注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>summary <span class="token operator">=</span> <span class="token string">&quot;Delete user&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;Delete user&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@SecurityRequirement</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;Bearer Authentication&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@DeleteMapping</span>
description <span class="token operator">=</span> <span class="token string">&quot;A JWT token is required to access this API...&quot;</span><span class="token punctuation">,</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">deleteUser</span><span class="token punctuation">(</span><span class="token class-name">Authentication</span> authentication<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这些配置，让我们重新部署应用程序并访问URL <em>http://localhost:8080/swagger-ui.html</em>：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/06/operation-1024x239.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>点击 <img src="https://www.baeldung.com/wp-content/uploads/2022/06/lock.png" alt="img" loading="lazy"> 图标会打开一个登录对话框，用户可以提供访问令牌以调用操作：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/06/auth-modal.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>对于这个示例，可以通过向 <em>authentication</em> API 提供 <em>john/password</em> 或 <em>jane/password</em> 来获取JWT令牌。一旦我们获得JWT令牌，我们可以将其输入到 <em>value</em> 文本框中，然后点击 <em>Authorize</em> 按钮和 <em>Close</em> 按钮：</p><p>有了JWT令牌，让我们调用 <em>deleteUser</em> API：</p><p>结果，我们看到操作将提供JWT令牌，如图标所示，Swagger-UI将此令牌作为HTTP承载在 <em>Authorization</em> 头中提供。最后，有了这些配置，我们可以成功调用受保护的 <em>deleteUser</em> API。</p><p>到目前为止，我们已经配置了操作级安全配置。同样，让我们检查OpenAPI JWT安全类和全局配置。</p><h3 id="_3-2-类级别配置" tabindex="-1"><a class="header-anchor" href="#_3-2-类级别配置"><span>3.2. 类级别配置</span></a></h3><p>同样，我们可以为包含所有API的类提供OpenAPI认证。通过在包含所有API的类上声明 <em>@SecurityRequirement</em> 注解。这样做将为该特定类中的所有API提供认证：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/api/user&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@SecurityRequirement</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;bearerAuth&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Tag</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;User&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;The User API. Contains all the operations that can be performed on a user.&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserApi</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，此配置启用了类 <em>UserApi</em> 中所有操作的安全性。结果，假设该类有两个操作，Swagger-UI看起来像这样：</p><h3 id="_3-3-全局配置" tabindex="-1"><a class="header-anchor" href="#_3-3-全局配置"><span>3.3. 全局配置</span></a></h3><p>通常，我们更喜欢将OpenAPI认证应用于应用程序中的所有API。<strong>在这些情况下，我们可以使用Spring <em>@Bean</em> 注解在全局级别声明安全性</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OpenAPI30Configuration</span> <span class="token punctuation">{</span>
<span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">OpenAPI</span> <span class="token function">customizeOpenAPI</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> securitySchemeName <span class="token operator">=</span> <span class="token string">&quot;bearerAuth&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">OpenAPI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">addSecurityItem</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SecurityRequirement</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">addList</span><span class="token punctuation">(</span>securitySchemeName<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">components</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Components</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">addSecuritySchemes</span><span class="token punctuation">(</span>securitySchemeName<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">SecurityScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span>securitySchemeName<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token class-name">SecurityScheme<span class="token punctuation">.</span>Type</span><span class="token punctuation">.</span><span class="token constant">HTTP</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">scheme</span><span class="token punctuation">(</span><span class="token string">&quot;bearer&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">bearerFormat</span><span class="token punctuation">(</span><span class="token string">&quot;JWT&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个全局配置，Springdoc-OpenAPI将为应用程序中的所有OpenAPI配置JWT认证：</p><p>让我们尝试调用GET API：</p><p>最终，我们得到 <em>HTTP 401 Unauthorized.</em> API是安全的，我们还没有提供JWT令牌。接下来，让我们提供JWT令牌并检查行为。</p><p>点击 <em>Authorize</em> 按钮并提供JWT令牌以调用操作。我们可以从Swagger控制台中提供的认证API获取承载令牌：</p><p>最后，有了JWT令牌配置，让我们重新调用API：</p><p>在这一点上，有了正确的JWT令牌，我们可以成功调用我们的安全API。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们学习了如何为我们的OpenAPI配置JWT认证。Swagger-UI提供了一个工具，根据OneAPI规范来记录和测试REST API。Swaggerdoc-OpenAPI工具帮助我们根据我们Spring Boot应用程序中的REST API生成此规范。</p><p>如往常一样，完整的源代码可以在GitHub上找到。</p>`,62),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(t,[["render",i],["__file","2024-07-18-Configure JWT Authentication for OpenAPI.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Configure%20JWT%20Authentication%20for%20OpenAPI.html","title":"如何为Spring Boot应用中的OpenAPI配置JWT认证","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","OAuth"],"tag":["OpenAPI","JWT","Springdoc-OpenAPI","Swagger-UI"],"head":[["meta",{"name":"keywords","content":"OpenAPI, JWT, Spring Boot, Springdoc-OpenAPI, Swagger-UI"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Configure%20JWT%20Authentication%20for%20OpenAPI.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何为Spring Boot应用中的OpenAPI配置JWT认证"}],["meta",{"property":"og:description","content":"如何为Spring Boot应用中的OpenAPI配置JWT认证 如果你正在处理Spring Security（尤其是OAuth）实现，一定要看看《Learn Spring Security》课程： > > LEARN SPRING SECURITY 1. 概述 OpenAPI 是一种语言无关且平台独立的规范，它标准化了REST API。OpenAPI..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/06/swagger-1-1-1024x264.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T03:13:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"OpenAPI"}],["meta",{"property":"article:tag","content":"JWT"}],["meta",{"property":"article:tag","content":"Springdoc-OpenAPI"}],["meta",{"property":"article:tag","content":"Swagger-UI"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T03:13:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何为Spring Boot应用中的OpenAPI配置JWT认证\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/06/swagger-1-1-1024x264.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/swagger-config-1024x230.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/operation-1024x239.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/lock.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/06/auth-modal.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T03:13:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何为Spring Boot应用中的OpenAPI配置JWT认证 如果你正在处理Spring Security（尤其是OAuth）实现，一定要看看《Learn Spring Security》课程： > > LEARN SPRING SECURITY 1. 概述 OpenAPI 是一种语言无关且平台独立的规范，它标准化了REST API。OpenAPI..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Swagger-UI","slug":"_2-swagger-ui","link":"#_2-swagger-ui","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 配置","slug":"_2-2-配置","link":"#_2-2-配置","children":[]},{"level":3,"title":"","slug":"","link":"#","children":[]},{"level":3,"title":"2.3. 测试","slug":"_2-3-测试","link":"#_2-3-测试","children":[]},{"level":3,"title":"3.1. 按操作配置","slug":"_3-1-按操作配置","link":"#_3-1-按操作配置","children":[]},{"level":3,"title":"3.2. 类级别配置","slug":"_3-2-类级别配置","link":"#_3-2-类级别配置","children":[]},{"level":3,"title":"3.3. 全局配置","slug":"_3-3-全局配置","link":"#_3-3-全局配置","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721272427000,"updatedTime":1721272427000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.35,"words":1606},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Configure JWT Authentication for OpenAPI.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何为Spring Boot应用中的OpenAPI配置JWT认证</h1>\\n<p>如果你正在处理Spring Security（尤其是OAuth）实现，一定要看看《Learn Spring Security》课程：</p>\\n<p><strong>&gt; &gt; LEARN SPRING</strong>\\n<strong>SECURITY</strong></p>\\n<h2>1. 概述</h2>\\n<p>OpenAPI 是一种语言无关且平台独立的规范，它标准化了REST API。OpenAPI 使用户能够轻松理解API而无需深入代码。Swagger-UI 基于这个OpenAPI规范生成一个用户界面，帮助可视化和测试REST API。</p>","autoDesc":true}');export{d as comp,g as data};
