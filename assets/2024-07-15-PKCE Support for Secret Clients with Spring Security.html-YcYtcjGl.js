import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as n}from"./app-8nJ1rqSf.js";const r={},a=n('<hr><h1 id="使用spring-security为有密钥客户端支持pkce" tabindex="-1"><a class="header-anchor" href="#使用spring-security为有密钥客户端支持pkce"><span>使用Spring Security为有密钥客户端支持PKCE</span></a></h1><p>如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将展示如何在Spring Boot有密钥客户端应用程序中使用PKCE。</p><h2 id="_2-背景" tabindex="-1"><a class="header-anchor" href="#_2-背景"><span>2. 背景</span></a></h2><p>代码交换证明密钥（PKCE）是针对公共客户端（通常是SPA Web应用程序或移动应用程序）的OAuth协议的扩展。<strong>它作为授权码授权流程的一部分，并有助于减轻恶意第三方的一些攻击</strong>。</p><p>这些攻击的主要途径是在提供者已经确定用户身份并使用HTTP重定向发送授权码的步骤。根据场景，这个授权码可能会泄露和/或被拦截，允许攻击者使用它来获取有效的访问令牌。</p><p>一旦攻击者拥有此访问令牌，他们就可以使用它来访问受保护的资源，并像合法所有者一样使用它。例如，如果这个访问令牌与银行账户相关联，他们随后可以访问报表、投资组合价值或其他敏感信息。</p><h2 id="_3-pkce对oauth的修改" tabindex="-1"><a class="header-anchor" href="#_3-pkce对oauth的修改"><span>3. PKCE对OAuth的修改</span></a></h2><p>PKCE机制在标准授权码流程中增加了一些调整：</p><ul><li>客户端在初始授权请求中发送两个额外的参数：<em>code_challenge_和_code_challenge_method</em></li><li>在最后一步，当客户端交换授权码以获取访问令牌时，还有一个新参数：<em>code_verifier</em></li></ul><p>启用PKCE的客户端执行以下步骤来实现此机制： <strong>首先，它生成一个随机字符串用作_code_verifier_参数</strong>。根据RFC 7636，这个字符串的长度必须至少为43个八位位组，但不超过128个八位位组。关键点是使用安全的随机生成器，如JVM的_SecureRandom_或等效的。</p><p>除了长度外，还有对允许字符范围的限制：仅支持字母数字ASCII字符和一些符号。</p><p><strong>接下来，客户端使用生成的值并使用支持的方法将其转换为_code_challenge_参数</strong>。目前，规范仅提到两种转换方法：<em>plain_和_S256</em>。</p><ul><li>_plain_只是一个无操作转换，所以转换后的值与_code_verifier_相同</li><li>_S256_对应于SHA-256哈希算法，其结果以BASE64编码</li></ul><p>然后客户端使用常规参数（<em>client_id</em>、<em>scope</em>、<em>state_等）构建OAuth授权URL，并添加生成的_code_challenge_和_code_challenge_method</em>。</p><h3 id="_3-1-代码挑战验证" tabindex="-1"><a class="header-anchor" href="#_3-1-代码挑战验证"><span>3.1. 代码挑战验证</span></a></h3><p>在OAuth授权码流程的最后一步，客户端将原始_code_verifier_值与此流程定义的常规值一起发送。然后服务器根据挑战的方法验证_code_verifier_：</p><ul><li>对于_plain_方法，_code_verifier_和挑战必须相同</li><li>对于_S256_方法，服务器计算所提供值的SHA-256并将其编码为BASE64，然后与原始挑战进行比较。</li></ul><p>那么，为什么PKCE对授权码攻击有效呢？正如我们之前提到的，这些攻击通常针对授权服务器发送的重定向，其中包含授权码，以起作用。然而，有了PKCE，这些信息就不再足够完成流程，至少对于_S256_方法是这样。<strong>只有当客户端同时提供授权码和验证器时，才会发生代码对令牌的交换，这在重定向中从未出现过。</strong></p><p>当然，当使用_plain_方法时，验证器和挑战是相同的，所以在现实世界的应用中使用这种方法没有意义。</p><h3 id="_3-2-有密钥客户端的pkce" tabindex="-1"><a class="header-anchor" href="#_3-2-有密钥客户端的pkce"><span>3.2. 有密钥客户端的PKCE</span></a></h3><p>在OAuth 2.0中，PKCE是可选的，主要用于移动和Web应用程序。<strong>然而，即将到来的OAuth 2.1版本使PKCE不仅对公共客户端，而且对有密钥的客户端也成为强制性的。</strong></p><p>只需记住，有密钥的客户端通常是在云或本地服务器上运行的托管应用程序。这些客户端也使用授权码流程，但由于最终的代码交换步骤发生在后端和授权服务器之间，<strong>用户代理（Web或移动）从未“看到”访问令牌。</strong></p><p>除此之外，步骤与公共客户端的情况完全相同。</p><p><strong>从Spring Security 5.7开始，PKCE完全支持servlet和响应式风格的Web应用程序</strong>。然而，此功能默认未启用，因为并非所有身份提供者都支持此扩展。Spring Boot应用程序必须使用2.7或更高版本的框架，并依赖于标准依赖管理。这确保项目选择了正确的Spring Security版本及其传递依赖项。</p><p>PKCE支持位于_spring-security-oauth2-client_模块中。对于Spring Boot应用程序，引入此依赖项的最简单方法是使用相应的启动模块：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.boot````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-boot-starter-webflux````&lt;/artifactId&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.boot````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-boot-starter-oauth2-client````&lt;/artifactId&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以从Maven Central下载这些依赖项的最新版本。</p><p>有了依赖项，我们现在需要自定义OAuth 2.0登录过程以支持PKCE。对于响应式应用程序，这意味着添加一个SecurityWebFilterChain bean，应用此设置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\npublic SecurityWebFilterChain pkceFilterChain(ServerHttpSecurity http,\n  ServerOAuth2AuthorizationRequestResolver resolver) {\n    http.authorizeExchange(r -&gt; r.anyExchange().authenticated());\n    http.oauth2Login(auth -&gt; auth.authorizationRequestResolver(resolver));\n    return http.build();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关键步骤是在登录规范中设置自定义_ServerOAuth2AuthorizationRequestResolver_。</strong> Spring Security使用此接口的实现来为给定的客户端注册构建OAuth授权请求。</p><p>幸运的是，我们不必实现这个接口。相反，我们可以使用现成的_DefaultServerOAuth2AuthorizationRequestResolver_类，它允许我们应用进一步的自定义：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\npublic ServerOAuth2AuthorizationRequestResolver pkceResolver(ReactiveClientRegistrationRepository repo) {\n    var resolver = new DefaultServerOAuth2AuthorizationRequestResolver(repo);\n    resolver.setAuthorizationRequestCustomizer(OAuth2AuthorizationRequestCustomizers.withPkce());\n    return resolver;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们实例化请求解析器，传递一个_ReactiveClientRegistrationRepository_实例。然后，我们使用_OAuth2AuthorizationRequestCustomizers.withPkce()_，它提供了将额外的PKCE参数添加到授权请求URL所需的逻辑。</p><h2 id="_5-测试" tabindex="-1"><a class="header-anchor" href="#_5-测试"><span>5. 测试</span></a></h2><p>要测试我们的PKCE启用应用程序，我们需要一个支持此扩展的授权服务器。在本教程中，我们将使用Spring Authorization Server为此目的。这个项目是Spring家族的一个新成员，允许我们快速构建符合OAuth 2.1/OIDC的授权服务器。</p><p>在我们的实时测试环境中，授权服务器作为客户端的单独进程运行。该项目是一个标准的Spring Boot Web应用程序，我们已添加了相关的maven依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.boot````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-boot-starter-web````&lt;/artifactId&gt;````\n````&lt;/dependency&gt;````\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.security````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-security-oauth2-authorization-server````&lt;/artifactId&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最新版本的启动器和Spring Authorization Server可以从Maven Central下载。</p><p>为了正常工作，授权服务器要求我们提供一些配置beans，包括_RegisteredClientRepository_和_UserDetailsService_。对于我们的测试目的，我们可以使用两者的内存实现，包含一组固定的测试值。对于本教程，前者更相关：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\npublic RegisteredClientRepository registeredClientRepository() {\n    var pkceClient = RegisteredClient\n      .withId(UUID.randomUUID().toString())\n      .clientId(&quot;pkce-client&quot;)\n      .clientSecret(&quot;{noop}obscura&quot;)\n      .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)\n      .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)\n      .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)\n      .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)\n      .scope(OidcScopes.OPENID)\n      .scope(OidcScopes.EMAIL)\n      .scope(OidcScopes.PROFILE)\n      .clientSettings(ClientSettings.builder()\n        .requireAuthorizationConsent(false)\n        .requireProofKey(true)\n        .build())\n      .redirectUri(&quot;http://127.0.0.1:8080/login/oauth2/code/pkce&quot;)\n      .build();\n\n    return new InMemoryRegisteredClientRepository(pkceClient);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关键点是使用_clientSettings()_方法强制使用PKCE特定客户端</strong>。我们通过传递一个设置_requireProofKey()_为true的_ClientSettings_对象来实现这一点。</p><p>在我们的测试设置中，客户端将与授权服务器在同一主机上运行，因此我们使用127.0.0.1作为重定向URL的主机名部分。值得注意的是，这里不允许使用“localhost”，因此使用了等效的IP地址。</p><p>为了完成设置，我们还需要修改应用程序属性文件中的默认端口设置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server.port=8085\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-2-运行实时测试" tabindex="-1"><a class="header-anchor" href="#_5-2-运行实时测试"><span>5.2. 运行实时测试</span></a></h3><p>现在，让我们运行实时测试以验证一切是否按预期工作。我们可以直接从IDE运行两个项目，或者打开两个shell窗口，为每个模块发出命令_mvn spring-boot:run_。</p>',49),l=[a];function s(o,d){return i(),t("div",null,l)}const u=e(r,[["render",s],["__file","2024-07-15-PKCE Support for Secret Clients with Spring Security.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-PKCE%20Support%20for%20Secret%20Clients%20with%20Spring%20Security.html","title":"使用Spring Security为有密钥客户端支持PKCE","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","OAuth"],"tag":["PKCE","Secret Clients"],"head":[["meta",{"name":"keywords","content":"Spring Security, OAuth, PKCE, Secret Clients"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-PKCE%20Support%20for%20Secret%20Clients%20with%20Spring%20Security.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Security为有密钥客户端支持PKCE"}],["meta",{"property":"og:description","content":"使用Spring Security为有密钥客户端支持PKCE 如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。 1. 引言 在本教程中，我们将展示如何在Spring Boot有密钥客户端应用程序中使用PKCE。 2. 背景 代码交换证明密钥（PKCE）是针对公共客户端（通常是SPA Web应..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T17:06:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"PKCE"}],["meta",{"property":"article:tag","content":"Secret Clients"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T17:06:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Security为有密钥客户端支持PKCE\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T17:06:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Security为有密钥客户端支持PKCE 如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。 1. 引言 在本教程中，我们将展示如何在Spring Boot有密钥客户端应用程序中使用PKCE。 2. 背景 代码交换证明密钥（PKCE）是针对公共客户端（通常是SPA Web应..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 背景","slug":"_2-背景","link":"#_2-背景","children":[]},{"level":2,"title":"3. PKCE对OAuth的修改","slug":"_3-pkce对oauth的修改","link":"#_3-pkce对oauth的修改","children":[{"level":3,"title":"3.1. 代码挑战验证","slug":"_3-1-代码挑战验证","link":"#_3-1-代码挑战验证","children":[]},{"level":3,"title":"3.2. 有密钥客户端的PKCE","slug":"_3-2-有密钥客户端的pkce","link":"#_3-2-有密钥客户端的pkce","children":[]}]},{"level":2,"title":"5. 测试","slug":"_5-测试","link":"#_5-测试","children":[{"level":3,"title":"5.2. 运行实时测试","slug":"_5-2-运行实时测试","link":"#_5-2-运行实时测试","children":[]}]}],"git":{"createdTime":1721063203000,"updatedTime":1721063203000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.63,"words":1990},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-PKCE Support for Secret Clients with Spring Security.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Spring Security为有密钥客户端支持PKCE</h1>\\n<p>如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。</p>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将展示如何在Spring Boot有密钥客户端应用程序中使用PKCE。</p>\\n<h2>2. 背景</h2>\\n<p>代码交换证明密钥（PKCE）是针对公共客户端（通常是SPA Web应用程序或移动应用程序）的OAuth协议的扩展。<strong>它作为授权码授权流程的一部分，并有助于减轻恶意第三方的一些攻击</strong>。</p>","autoDesc":true}');export{u as comp,g as data};
