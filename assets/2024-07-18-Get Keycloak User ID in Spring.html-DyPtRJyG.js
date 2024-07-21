import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as e}from"./app-CXN34Kw1.js";const t={},o=e(`<h1 id="在spring中获取keycloak用户id" tabindex="-1"><a class="header-anchor" href="#在spring中获取keycloak用户id"><span>在Spring中获取Keycloak用户ID</span></a></h1><p>Keycloak是一个开源的身份和访问管理（IAM）系统，与Spring Boot应用程序集成良好。在本教程中，我们将描述如何在Spring Boot应用程序中获取Keycloak用户ID。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Keycloak提供了诸如保护REST API、用户联合、细粒度授权、社交登录、双因素认证（2FA）等功能。此外，我们可以使用它来使用OpenID Connect（OIDC）实现单点登录（SSO）。<strong>假设我们有一个使用Keycloak通过OIDC保护的Spring Boot应用程序，我们想要在Spring Boot应用程序中获取用户ID。在这种情况下，我们需要在Spring Boot应用程序中获取访问令牌或安全上下文。</strong></p><p>为了简化事情，我们将使用在Spring Boot应用程序中嵌入的Keycloak。假设我们正在使用在GitHub上可用的授权服务器项目。首先，我们将在嵌入的Keycloak服务器中定义领域_baeldung_中的_customerClient_客户端：<img src="https://www.baeldung.com/wp-content/uploads/2022/05/keycloak-spring-boot-1024x680.png" alt="img" loading="lazy">然后，我们将领域详细信息导出为_customer-realm.json_，并在_我们的_application-customer.yml_中设置领域文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>keycloak:
  server:
    contextPath: /auth
    adminUser:
      username: bael-admin
      password: pass
    realmImportFile: customer-realm.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们可以使用_–spring.profiles.active=customer_选项运行应用程序。现在，授权服务器已经准备好。运行服务器后，我们可以在_http://localhost:8083/auth/_访问授权服务器的欢迎页面。</p><h3 id="_2-2-资源服务器" tabindex="-1"><a class="header-anchor" href="#_2-2-资源服务器"><span>2.2. 资源服务器</span></a></h3><p>现在我们已经配置了授权服务器，让我们设置资源服务器。为此，我们将使用在GitHub上可用的资源服务器项目。首先，让我们将_application-embedded.properties_文件作为资源添加：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>keycloak.auth-server-url=http://localhost:8083/auth
keycloak.realm=baeldung
keycloak.resource=customerClient
keycloak.public-client=true
keycloak.principal-attribute=preferred_username
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，资源服务器使用OAuth2授权服务器进行安全保护，我们必须登录到SSO服务器才能访问资源。我们可以运行应用程序，使用_–spring.profiles.active=embedded_选项。</p><p>从Keycloak获取用户ID可以通过使用客户端映射器来完成。</p><h3 id="_3-1-客户端映射器" tabindex="-1"><a class="header-anchor" href="#_3-1-客户端映射器"><span>3.1. 客户端映射器</span></a></h3><p>我们可以在客户端映射器中添加用户ID，并在Spring Boot应用程序中获取它。首先，在_customerClient_客户端中定义一个客户端映射器：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/userId.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后，在_CustomUserAttrController_类中获取用户ID：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomUserAttrController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>path <span class="token operator">=</span> <span class="token string">&quot;/users&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getUserInfo</span><span class="token punctuation">(</span><span class="token class-name">Model</span> model<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">final</span> <span class="token class-name">DefaultOidcUser</span> user <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">DefaultOidcUser</span><span class="token punctuation">)</span> <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">getAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">getPrincipal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> userId <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

        <span class="token class-name">OidcIdToken</span> token <span class="token operator">=</span> user<span class="token punctuation">.</span><span class="token function">getIdToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Map</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span>\` customClaims <span class="token operator">=</span> token<span class="token punctuation">.</span><span class="token function">getClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>customClaims<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token string">&quot;user_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            userId <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>customClaims<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;user_id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        model<span class="token punctuation">.</span><span class="token function">addAttribute</span><span class="token punctuation">(</span><span class="token string">&quot;userID&quot;</span><span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">&quot;userInfo&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_IDToken_的_getClaims()_方法来获取映射器。然后，我们将用户ID添加到模型属性中。</p><h3 id="_3-2-thymeleaf" tabindex="-1"><a class="header-anchor" href="#_3-2-thymeleaf"><span>3.2. Thymeleaf</span></a></h3><p>我们将修改_userInfo.html_模板以显示用户ID信息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;div id=&quot;container&quot;&gt;\`
    \`&lt;h1&gt;\`
        User ID : \`&lt;span th:text=&quot;\${userID}&quot;&gt;\`--userID--\`&lt;/span&gt;\`.
    \`&lt;/h1&gt;\`
\`&lt;/div&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-测试" tabindex="-1"><a class="header-anchor" href="#_3-3-测试"><span>3.3. 测试</span></a></h3><p>运行应用程序后，我们可以导航到_http://localhost:8081/users_。输入_baeldung:baeldung_作为凭据，将返回以下内容：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/message.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们研究了如何在Spring Boot应用程序中从Keycloak获取用户ID。我们首先设置了调用安全应用程序所需的环境。然后，我们描述了使用_IDToken_和客户端映射器在Spring Boot应用程序中获取Keycloak用户ID。像往常一样，本教程的完整源代码可在GitHub上找到。此外，授权服务器的源代码也在GitHub上可用。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/f8c1b0c85cc5a76816f5c788ded4f148?s=50&amp;r=g" alt="img" loading="lazy"></p>`,27),p=[o];function i(l,c){return s(),a("div",null,p)}const d=n(t,[["render",i],["__file","2024-07-18-Get Keycloak User ID in Spring.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-18/2024-07-18-Get%20Keycloak%20User%20ID%20in%20Spring.html","title":"在Spring中获取Keycloak用户ID","lang":"zh-CN","frontmatter":{"date":"2023-08-01T00:00:00.000Z","category":["Spring Security","Keycloak"],"tag":["Spring Boot","OAuth","SSO","OpenID Connect"],"head":[["meta",{"name":"keywords","content":"Spring Security, Keycloak, Spring Boot, OAuth, SSO, OpenID Connect"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-18/2024-07-18-Get%20Keycloak%20User%20ID%20in%20Spring.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Spring中获取Keycloak用户ID"}],["meta",{"property":"og:description","content":"在Spring中获取Keycloak用户ID Keycloak是一个开源的身份和访问管理（IAM）系统，与Spring Boot应用程序集成良好。在本教程中，我们将描述如何在Spring Boot应用程序中获取Keycloak用户ID。 1. 概述 Keycloak提供了诸如保护REST API、用户联合、细粒度授权、社交登录、双因素认证（2FA）等功..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/05/keycloak-spring-boot-1024x680.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-18T17:09:24.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"OAuth"}],["meta",{"property":"article:tag","content":"SSO"}],["meta",{"property":"article:tag","content":"OpenID Connect"}],["meta",{"property":"article:published_time","content":"2023-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-18T17:09:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Spring中获取Keycloak用户ID\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/05/keycloak-spring-boot-1024x680.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/userId.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/message.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/f8c1b0c85cc5a76816f5c788ded4f148?s=50&r=g\\"],\\"datePublished\\":\\"2023-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-18T17:09:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Spring中获取Keycloak用户ID Keycloak是一个开源的身份和访问管理（IAM）系统，与Spring Boot应用程序集成良好。在本教程中，我们将描述如何在Spring Boot应用程序中获取Keycloak用户ID。 1. 概述 Keycloak提供了诸如保护REST API、用户联合、细粒度授权、社交登录、双因素认证（2FA）等功..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.2. 资源服务器","slug":"_2-2-资源服务器","link":"#_2-2-资源服务器","children":[]},{"level":3,"title":"3.1. 客户端映射器","slug":"_3-1-客户端映射器","link":"#_3-1-客户端映射器","children":[]},{"level":3,"title":"3.2. Thymeleaf","slug":"_3-2-thymeleaf","link":"#_3-2-thymeleaf","children":[]},{"level":3,"title":"3.3. 测试","slug":"_3-3-测试","link":"#_3-3-测试","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721322564000,"updatedTime":1721322564000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3,"words":900},"filePathRelative":"posts/baeldung/2024-07-18/2024-07-18-Get Keycloak User ID in Spring.md","localizedDate":"2023年8月1日","excerpt":"\\n<p>Keycloak是一个开源的身份和访问管理（IAM）系统，与Spring Boot应用程序集成良好。在本教程中，我们将描述如何在Spring Boot应用程序中获取Keycloak用户ID。</p>\\n<h2>1. 概述</h2>\\n<p>Keycloak提供了诸如保护REST API、用户联合、细粒度授权、社交登录、双因素认证（2FA）等功能。此外，我们可以使用它来使用OpenID Connect（OIDC）实现单点登录（SSO）。<strong>假设我们有一个使用Keycloak通过OIDC保护的Spring Boot应用程序，我们想要在Spring Boot应用程序中获取用户ID。在这种情况下，我们需要在Spring Boot应用程序中获取访问令牌或安全上下文。</strong></p>","autoDesc":true}');export{d as comp,m as data};
