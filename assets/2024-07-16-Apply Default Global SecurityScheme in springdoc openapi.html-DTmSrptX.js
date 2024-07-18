import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-c243dxVF.js";const p={},e=t('<h1 id="在springdoc-openapi中应用默认全局安全方案" tabindex="-1"><a class="header-anchor" href="#在springdoc-openapi中应用默认全局安全方案"><span>在springdoc-openapi中应用默认全局安全方案</span></a></h1><p>在本教程中，我们将学习如何使用springdoc-openapi库在Spring MVC Web应用程序中配置默认的全局安全方案，并将其应用为API的默认安全需求。此外，我们将讨论如何覆盖这些默认的安全需求。</p><p>OpenAPI规范允许我们为API定义一组安全方案。我们可以全局配置API的安全需求，或者按端点应用/移除它们。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>由于我们正在使用Spring Boot构建Maven项目，让我们探索项目的设置。在本节结束时，我们将拥有一个简单的Web应用程序。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>示例有两个依赖项。第一个依赖项是spring-boot-starter-web。这是构建Web应用程序的主要依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springframework.boot``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``spring-boot-starter-web``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``3.1.5``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个依赖项是springdoc-openapi-ui，这是将API文档以HTML、JSON或YAML格式呈现的库：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.springdoc``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``springdoc-openapi-ui``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``1.7.0``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-应用程序入口点" tabindex="-1"><a class="header-anchor" href="#_2-2-应用程序入口点"><span>2.2. 应用程序入口点</span></a></h3><p>一旦依赖项准备就绪，让我们定义应用程序的入口点。</p><p>我们将使用@SpringBootApplication注解来引导应用程序，并使用SpringApplication帮助类来启动它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DefaultGlobalSecuritySchemeApplication</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">DefaultGlobalSecuritySchemeApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-springdoc-openapi基础配置" tabindex="-1"><a class="header-anchor" href="#_3-springdoc-openapi基础配置"><span>3. springdoc-openapi基础配置</span></a></h2><p>一旦我们配置了Spring MVC，让我们看看API的语义信息。</p><p>我们将通过向DefaultGlobalSecuritySchemeApplication类添加springdoc-openapi注解来定义默认的全局安全方案和API元数据。要定义全局安全方案，我们将使用@SecurityScheme注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@SecurityScheme</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">SecuritySchemeType</span><span class="token punctuation">.</span><span class="token constant">APIKEY</span><span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">&quot;api_key&quot;</span><span class="token punctuation">,</span> in <span class="token operator">=</span> <span class="token class-name">SecuritySchemeIn</span><span class="token punctuation">.</span><span class="token constant">HEADER</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们选择了APIKEY安全方案类型，但我们也可以配置其他安全方案，例如JWT。在定义安全方案之后，我们将添加元数据并建立API的默认安全需求。我们使用@OpenApiDefinition注解来完成这个操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@OpenAPIDefinition</span><span class="token punctuation">(</span>info <span class="token operator">=</span> <span class="token annotation punctuation">@Info</span><span class="token punctuation">(</span>title <span class="token operator">=</span> <span class="token string">&quot;在springdoc-openapi中应用默认全局安全方案&quot;</span><span class="token punctuation">,</span> version <span class="token operator">=</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> security <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@SecurityRequirement</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;api_key&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，_info_属性定义了API元数据。此外，_security_属性确定了默认的全局安全需求。</p><p>让我们看看带有注解的HTML文档是什么样子。我们将看到元数据和将适用于整个API的安全按钮：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/07/default_global_security_requirement.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_4-控制器" tabindex="-1"><a class="header-anchor" href="#_4-控制器"><span>4. 控制器</span></a></h2><p>现在我们已经配置了Spring框架和springdoc-openapi库，让我们向上下文基础路径添加一个REST控制器。为此，我们将使用@RestController和@RequestMapping注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>\n<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DefaultGlobalSecuritySchemeOpenApiController</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，我们将定义两个端点或路径。</p><p>第一个端点将是/login端点。它将接收用户凭据并验证用户身份。如果身份验证成功，端点将返回一个令牌。</p><p>API的另一个端点是/ping端点，它需要由/login方法生成的令牌。在执行请求之前，方法验证令牌并检查用户是否被授权。</p><p>总结来说，/login端点验证用户身份并提供令牌。/ping端点接收由/login端点返回的令牌，并检查它是否有效以及用户是否可以执行操作。</p><h3 id="_4-1-login-方法" tabindex="-1"><a class="header-anchor" href="#_4-1-login-方法"><span>4.1. login()方法</span></a></h3><p>这个方法没有任何安全需求。因此，我们需要覆盖默认的安全需求配置。</p><p>首先，我们需要告诉Spring这是我们API的一个端点，所以我们将添加@RequestMapping注解来配置端点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;/login&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;application/json&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> consumes <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;application/json&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后，我们需要向端点添加语义信息。因此，我们将使用@Operation和@SecurityRequirements注解。@Operation将定义端点，而@SecurityRequirements将定义适用于端点的特定安全需求集：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>operationId <span class="token operator">=</span> <span class="token string">&quot;login&quot;</span><span class="token punctuation">,</span> responses <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;200&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;在受保护的ping端点中使用的api_key&quot;</span><span class="token punctuation">,</span> content <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@Content</span><span class="token punctuation">(</span>mediaType <span class="token operator">=</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span> schema <span class="token operator">=</span> <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>implementation <span class="token operator">=</span> <span class="token class-name">TokenDto</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;401&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;未授权请求&quot;</span><span class="token punctuation">,</span> content <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@Content</span><span class="token punctuation">(</span>mediaType <span class="token operator">=</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span> schema <span class="token operator">=</span> <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>implementation <span class="token operator">=</span> <span class="token class-name">ApplicationExceptionDto</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@SecurityRequirements</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，这是状态码为200的响应的HTML文档：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/07/login_response_status_code_200.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>最后，让我们看看login()方法的签名：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Parameter</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;LoginDto&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;登录&quot;</span><span class="token punctuation">)</span> <span class="token annotation punctuation">@Valid</span> <span class="token annotation punctuation">@RequestBody</span><span class="token punctuation">(</span>required <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token class-name">LoginDto</span> loginDto<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，API请求的正文接收一个LoginDto实例。我们还需要用语义信息装饰DTOs，以便在文档中显示信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginDto</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> user<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> pass<span class="token punctuation">;</span>\n\n    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n\n    <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;user&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> user<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;pass&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> pass<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我们可以看到/login端点HTML文档的样子：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/07/login_execute.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_4-2-ping-方法" tabindex="-1"><a class="header-anchor" href="#_4-2-ping-方法"><span>4.2. ping()方法</span></a></h3><p>此时，我们将定义ping()方法。ping()方法将使用默认的全局安全方案：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Operation</span><span class="token punctuation">(</span>operationId <span class="token operator">=</span> <span class="token string">&quot;ping&quot;</span><span class="token punctuation">,</span> responses <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;200&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;需要在头部包含api_key属性的Ping&quot;</span><span class="token punctuation">,</span> content <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token annotation punctuation">@Content</span><span class="token punctuation">(</span>mediaType <span class="token operator">=</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span> schema <span class="token operator">=</span> <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>implementation <span class="token operator">=</span> <span class="token class-name">PingResponseDto</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span> examples <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@ExampleObject</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;{ pong: &#39;2022-06-17T18:30:33.465+02:00&#39; }&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;401&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;未授权请求&quot;</span><span class="token punctuation">,</span> content <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@Content</span><span class="token punctuation">(</span>mediaType <span class="token operator">=</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span> schema <span class="token operator">=</span> <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>implementation <span class="token operator">=</span> <span class="token class-name">ApplicationExceptionDto</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token annotation punctuation">@ApiResponse</span><span class="token punctuation">(</span>responseCode <span class="token operator">=</span> <span class="token string">&quot;403&quot;</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">&quot;禁止请求&quot;</span><span class="token punctuation">,</span> content <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token annotation punctuation">@Content</span><span class="token punctuation">(</span>mediaType <span class="token operator">=</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span> schema <span class="token operator">=</span> <span class="token annotation punctuation">@Schema</span><span class="token punctuation">(</span>implementation <span class="token operator">=</span> <span class="token class-name">ApplicationExceptionDto</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token string">&quot;/ping&quot;</span><span class="token punctuation">,</span> produces <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;application/json&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span> <span class="token function">ping</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestHeader</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;api_key&quot;</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> api_key<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>login()和ping()方法之间的主要区别在于将应用的安全需求。login()根本没有安全需求，但ping()方法将具有在API级别定义的安全。因此，HTML文档将只对/ping端点显示锁：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/07/ping_endpoint.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-rest-api文档url" tabindex="-1"><a class="header-anchor" href="#_5-rest-api文档url"><span>5. REST API文档URL</span></a></h2><p>此时，我们的Spring MVC Web应用程序已经准备好，我们可以启动服务器：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>mvn spring-boot:run -Dstart-class<span class="token operator">=</span><span class="token string">&quot;com.baeldung.defaultglobalsecurityscheme.DefaultGlobalSecuritySchemeApplication&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦服务器准备好，我们就可以在之前示例中显示的URL http://localhost:8080/swagger-ui-custom.html 上看到HTML文档。</p><p>API定义的JSON版本可以在 http://localhost:8080/api-docs 找到，YAML版本在 http://localhost:8080/api-docs.yaml。</p><p><strong>这些输出可以用来使用swagger-codegen-maven-plugin在不同语言中构建API的客户端或服务器。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们学习了如何使用springdoc-openapi库定义默认的全局安全方案。我们还看到了如何将其作为API的默认安全需求应用。此外，我们学习了如何为特定端点更改默认安全需求。</p><p>我们还发现，我们可以使用springdoc-openapi的JSON和YAML输出来自动化代码生成。</p><p>像往常一样，本文的完整源代码可在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy">![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?</p>',60),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-16-Apply Default Global SecurityScheme in springdoc openapi.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Apply%20Default%20Global%20SecurityScheme%20in%20springdoc%20openapi.html","title":"在springdoc-openapi中应用默认全局安全方案","lang":"zh-CN","frontmatter":{"date":"2022-07-01T00:00:00.000Z","category":["Spring","Spring Boot"],"tag":["springdoc-openapi","API Security"],"head":[["meta",{"name":"keywords","content":"Spring, Spring Boot, springdoc-openapi, API Security, Global Security Scheme"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Apply%20Default%20Global%20SecurityScheme%20in%20springdoc%20openapi.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在springdoc-openapi中应用默认全局安全方案"}],["meta",{"property":"og:description","content":"在springdoc-openapi中应用默认全局安全方案 在本教程中，我们将学习如何使用springdoc-openapi库在Spring MVC Web应用程序中配置默认的全局安全方案，并将其应用为API的默认安全需求。此外，我们将讨论如何覆盖这些默认的安全需求。 OpenAPI规范允许我们为API定义一组安全方案。我们可以全局配置API的安全需求..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/07/default_global_security_requirement.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T22:28:55.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"springdoc-openapi"}],["meta",{"property":"article:tag","content":"API Security"}],["meta",{"property":"article:published_time","content":"2022-07-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T22:28:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在springdoc-openapi中应用默认全局安全方案\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/07/default_global_security_requirement.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/07/login_response_status_code_200.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/07/login_execute.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/07/ping_endpoint.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\"],\\"datePublished\\":\\"2022-07-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T22:28:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在springdoc-openapi中应用默认全局安全方案 在本教程中，我们将学习如何使用springdoc-openapi库在Spring MVC Web应用程序中配置默认的全局安全方案，并将其应用为API的默认安全需求。此外，我们将讨论如何覆盖这些默认的安全需求。 OpenAPI规范允许我们为API定义一组安全方案。我们可以全局配置API的安全需求..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]},{"level":3,"title":"2.2. 应用程序入口点","slug":"_2-2-应用程序入口点","link":"#_2-2-应用程序入口点","children":[]}]},{"level":2,"title":"3. springdoc-openapi基础配置","slug":"_3-springdoc-openapi基础配置","link":"#_3-springdoc-openapi基础配置","children":[]},{"level":2,"title":"4. 控制器","slug":"_4-控制器","link":"#_4-控制器","children":[{"level":3,"title":"4.1. login()方法","slug":"_4-1-login-方法","link":"#_4-1-login-方法","children":[]},{"level":3,"title":"4.2. ping()方法","slug":"_4-2-ping-方法","link":"#_4-2-ping-方法","children":[]}]},{"level":2,"title":"5. REST API文档URL","slug":"_5-rest-api文档url","link":"#_5-rest-api文档url","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721168935000,"updatedTime":1721168935000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.33,"words":1598},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Apply Default Global SecurityScheme in springdoc openapi.md","localizedDate":"2022年7月1日","excerpt":"\\n<p>在本教程中，我们将学习如何使用springdoc-openapi库在Spring MVC Web应用程序中配置默认的全局安全方案，并将其应用为API的默认安全需求。此外，我们将讨论如何覆盖这些默认的安全需求。</p>\\n<p>OpenAPI规范允许我们为API定义一组安全方案。我们可以全局配置API的安全需求，或者按端点应用/移除它们。</p>\\n<h2>2. 设置</h2>\\n<p>由于我们正在使用Spring Boot构建Maven项目，让我们探索项目的设置。在本节结束时，我们将拥有一个简单的Web应用程序。</p>\\n<h3>2.1. 依赖项</h3>\\n<p>示例有两个依赖项。第一个依赖项是spring-boot-starter-web。这是构建Web应用程序的主要依赖项：</p>","autoDesc":true}');export{k as comp,d as data};
