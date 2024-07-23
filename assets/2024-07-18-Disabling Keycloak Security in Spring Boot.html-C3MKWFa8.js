import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-LwwahXlT.js";const e={},p=t('<hr><h1 id="在spring-boot中禁用keycloak安全功能" tabindex="-1"><a class="header-anchor" href="#在spring-boot中禁用keycloak安全功能"><span>在Spring Boot中禁用Keycloak安全功能</span></a></h1><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如果你正在使用Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程：</p><p><strong>&gt;&gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Keycloak是一个免费且开源的身份和访问管理程序，通常用于我们今天的软件栈中。在测试阶段，禁用它可能很有用，以便专注于业务测试。我们也可能在测试环境中没有Keycloak服务器。</p><p>在本教程中，<strong>我们将禁用由Keycloak启动器设置的配置</strong>。我们还将查看在项目中启用时如何修改Spring Security。</p><h2 id="_2-在非spring-security环境中禁用keycloak" tabindex="-1"><a class="header-anchor" href="#_2-在非spring-security环境中禁用keycloak"><span>2. 在非Spring-Security环境中禁用Keycloak</span></a></h2><p>我们首先看看如何在不使用Spring Security的应用程序中禁用Keycloak。</p><h3 id="_2-1-应用程序设置" tabindex="-1"><a class="header-anchor" href="#_2-1-应用程序设置"><span>2.1. 应用程序设置</span></a></h3><p>让我们从向项目添加_spring-boot-starter-oauth2-client_依赖开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.springframework.boot```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```spring-boot-starter-oauth2-client```&lt;/artifactId&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们需要添加_spring-boot-starter-oauth2-resource-server_依赖。它将允许我们使用Keycloak服务器验证JWT令牌。因此，让我们将其添加到我们的pom中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n     ```&lt;groupId&gt;```org.springframework.boot```&lt;/groupId&gt;```\n     ```&lt;artifactId&gt;```spring-boot-starter-oauth2-resource-server```&lt;/artifactId&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将在_application.properties_中添加Keycloak服务器的配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.security.oauth2.client.registration.keycloak.client-id=login-app\nspring.security.oauth2.client.registration.keycloak.authorization-grant-type=authorization_code\nspring.security.oauth2.client.registration.keycloak.scope=openid\nspring.security.oauth2.client.provider.keycloak.issuer-uri=\n    http://localhost:8080/realms/SpringBootKeycloak\nspring.security.oauth2.client.provider.keycloak.user-name-attribute=preferred_username\n\nspring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/realms/SpringBootKeycloak\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们添加一个_UserController_来获取一个_User_：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>\n<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/users&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/{userId}&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;userId&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span>userId<span class="token punctuation">,</span> <span class="token string">&quot;John&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Doe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-禁用keycloak" tabindex="-1"><a class="header-anchor" href="#_2-2-禁用keycloak"><span>2.2. 禁用Keycloak</span></a></h3><p>现在我们的应用程序已经就绪，让我们编写一个简单的测试来获取一个用户：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">givenUnauthenticated_whenGettingUser_shouldReturnUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">ResponseEntity</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">&gt;</span></span>` responseEntity <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForEntity</span><span class="token punctuation">(</span><span class="token string">&quot;/users/1&quot;</span><span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">SC_OK</span><span class="token punctuation">,</span> responseEntity<span class="token punctuation">.</span><span class="token function">getStatusCodeValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>responseEntity<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">getFirstname</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这个测试将会失败，因为我们没有向_restTemplate_提供任何身份验证</strong>，或者因为Keycloak服务器不可用。</p><p>Keycloak适配器实现了Keycloak安全的Spring自动配置。自动配置依赖于类路径中类的存在或属性的值。具体来说，_@ConditionalOnProperty_注解对于这个特定需求非常有用。</p><p><strong>要禁用Keycloak安全，我们需要告知适配器它不应该加载相应的配置</strong>。我们可以通过如下方式设置属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>keycloak.enabled=false\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们再次运行我们的测试，它现在将成功，而无需任何身份验证。</p><h2 id="_3-在spring-security环境中禁用keycloak" tabindex="-1"><a class="header-anchor" href="#_3-在spring-security环境中禁用keycloak"><span>3. 在Spring Security环境中禁用Keycloak</span></a></h2><p>我们经常将Keycloak与Spring Security结合使用。<strong>在这种情况下，仅仅禁用Keycloak配置是不够的，我们还需要修改Spring Security配置</strong>以允许匿名请求到达控制器。</p><h3 id="_3-1-应用程序设置" tabindex="-1"><a class="header-anchor" href="#_3-1-应用程序设置"><span>3.1. 应用程序设置</span></a></h3><p>让我们从向项目添加_spring-boot-starter-security_依赖开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;dependency&gt;```\n    ```&lt;groupId&gt;```org.springframework.boot```&lt;/groupId&gt;```\n    ```&lt;artifactId&gt;```spring-boot-starter-security```&lt;/artifactId&gt;```\n```&lt;/dependency&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们创建一个_SecurityFilterChain_ bean来定义Spring Security所需的配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@EnableWebSecurity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KeycloakSecurityConfig</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">protected</span> <span class="token class-name">SessionAuthenticationStrategy</span> <span class="token function">sessionAuthenticationStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RegisterSessionAuthenticationStrategy</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SessionRegistryImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">securityFilterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n        http<span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>auth <span class="token operator">-&gt;</span> auth<span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">oauth2Login</span><span class="token punctuation">(</span><span class="token class-name">Customizer</span><span class="token punctuation">.</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">oauth2ResourceServer</span><span class="token punctuation">(</span>httpSecurityOAuth2ResourceServerConfigurer <span class="token operator">-&gt;</span>\n                httpSecurityOAuth2ResourceServerConfigurer<span class="token punctuation">.</span><span class="token function">jwt</span><span class="token punctuation">(</span><span class="token class-name">Customizer</span><span class="token punctuation">.</span><span class="token function">withDefaults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们配置Spring Security仅允许来自已认证用户的请求。</p><h3 id="_3-2-禁用keycloak" tabindex="-1"><a class="header-anchor" href="#_3-2-禁用keycloak"><span>3.2. 禁用Keycloak</span></a></h3><p>除了像我们之前那样禁用Keycloak之外，<strong>我们现在还需要禁用Spring Security</strong>。</p><p>我们可以使用配置文件来告诉Spring在测试期间是否激活Keycloak配置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@EnableWebSecurity</span>\n<span class="token annotation punctuation">@Profile</span><span class="token punctuation">(</span><span class="token string">&quot;tests&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KeycloakSecurityConfig</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然而，更优雅的方式是重用_keycloak.enable_属性</strong>，类似于Keycloak适配器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@EnableWebSecurity</span>\n<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;keycloak.enabled&quot;</span><span class="token punctuation">,</span> havingValue <span class="token operator">=</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">,</span> matchIfMissing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KeycloakSecurityConfig</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，只有当_keycloak.enable_属性为_true_时，Spring才会启用Keycloak配置。如果属性缺失，_matchIfMissing_默认启用它。</p><p>由于我们正在使用Spring Security启动器，仅禁用我们的Spring Security配置是不够的。实际上，根据Spring的默认配置原则，<strong>启动器将创建一个默认的安全层</strong>。</p><p>让我们创建一个配置类来禁用它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;keycloak.enabled&quot;</span><span class="token punctuation">,</span> havingValue <span class="token operator">=</span> <span class="token string">&quot;false&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DisableSecurityConfiguration</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">public</span> <span class="token class-name">SecurityFilterChain</span> <span class="token function">filterChain</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>\n        http<span class="token punctuation">.</span><span class="token function">csrf</span><span class="token punctuation">(</span><span class="token class-name">AbstractHttpConfigurer</span><span class="token operator">::</span><span class="token function">disable</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">authorizeHttpRequests</span><span class="token punctuation">(</span>request <span class="token operator">-&gt;</span> request<span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n                <span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们仍然使用我们的_keycloak.enable_属性，但这次<strong>如果其值设置为_false_，Spring将启用配置</strong>。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们探讨了如何在有或没有Spring Security的Spring环境中禁用Keycloak安全功能。</p><p>像往常一样，本文中使用的所有代码示例都可以在GitHub上找到。</p>',49),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-07-18-Disabling Keycloak Security in Spring Boot.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Disabling%20Keycloak%20Security%20in%20Spring%20Boot.html","title":"在Spring Boot中禁用Keycloak安全功能","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","Keycloak"],"tag":["Spring Boot","Security","OAuth"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Keycloak, Security, OAuth"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Disabling%20Keycloak%20Security%20in%20Spring%20Boot.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring Boot中禁用Keycloak安全功能"}],["meta",{"property":"og:description","content":"在Spring Boot中禁用Keycloak安全功能 imgimg 如果你正在使用Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程： >> 学习Spring 安全 1. 概述 Keycloak是一个免费且开源的身份和访问管理程序，通常用于我们今天的软件栈中。在测试阶段，禁用它可能很有用，以便专注于业务测试..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T02:32:51.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Security"}],["meta",{"property":"article:tag","content":"OAuth"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T02:32:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring Boot中禁用Keycloak安全功能\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T02:32:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring Boot中禁用Keycloak安全功能 imgimg 如果你正在使用Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程： >> 学习Spring 安全 1. 概述 Keycloak是一个免费且开源的身份和访问管理程序，通常用于我们今天的软件栈中。在测试阶段，禁用它可能很有用，以便专注于业务测试..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 在非Spring-Security环境中禁用Keycloak","slug":"_2-在非spring-security环境中禁用keycloak","link":"#_2-在非spring-security环境中禁用keycloak","children":[{"level":3,"title":"2.1. 应用程序设置","slug":"_2-1-应用程序设置","link":"#_2-1-应用程序设置","children":[]},{"level":3,"title":"2.2. 禁用Keycloak","slug":"_2-2-禁用keycloak","link":"#_2-2-禁用keycloak","children":[]}]},{"level":2,"title":"3. 在Spring Security环境中禁用Keycloak","slug":"_3-在spring-security环境中禁用keycloak","link":"#_3-在spring-security环境中禁用keycloak","children":[{"level":3,"title":"3.1. 应用程序设置","slug":"_3-1-应用程序设置","link":"#_3-1-应用程序设置","children":[]},{"level":3,"title":"3.2. 禁用Keycloak","slug":"_3-2-禁用keycloak","link":"#_3-2-禁用keycloak","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721269971000,"updatedTime":1721269971000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.68,"words":1103},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Disabling Keycloak Security in Spring Boot.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>在Spring Boot中禁用Keycloak安全功能</h1>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>\\n<p>如果你正在使用Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程：</p>\\n<p><strong>&gt;&gt; 学习Spring</strong>\\n<strong>安全</strong></p>","autoDesc":true}');export{d as comp,k as data};
