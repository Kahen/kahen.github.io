import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as i,a}from"./app-DtXEV2Vi.js";const n={},r=a('<h1 id="spring-security-授权管理器" tabindex="-1"><a class="header-anchor" href="#spring-security-授权管理器"><span>Spring Security 授权管理器</span></a></h1><p>如果你正在开发Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程：</p><p><strong>&gt;&gt; 学习 Spring</strong><strong>安全</strong></p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Spring Security是Spring框架的一个扩展，它使我们能够轻松地将常见的安全实践集成到我们的应用程序中。这包括用户认证和授权、API保护等。</p><p>在本教程中，我们将查看Spring Security内部的许多部分之一：<em>AuthorizationManager</em>。我们将看到它如何适应更大的Spring Security生态系统，以及它如何帮助保护我们的应用程序的各种用例。</p><p><strong>Spring _AuthorizationManager_是一个接口，允许我们检查经过身份验证的实体是否有权访问受保护的资源。</strong>_AuthorizationManager_实例由Spring Security用于对基于请求的、基于方法的和基于消息的组件做出最终的访问控制决定。</p><p>作为背景，Spring Security有一些关键概念，在我们查看_AuthorizationManager_的具体角色之前，了解这些概念很有帮助：</p><ul><li>实体：任何可以向系统发出请求的实体。例如，这可以是人类用户或远程Web服务。</li><li>认证：验证实体是他们所说的人的过程。这可以通过用户名/密码、令牌或许多其他方法来完成。</li><li>授权：验证实体有权访问资源的过程</li><li>资源：系统提供访问的任何信息——例如，URL或文档</li><li>权限：通常被称为角色，这是一个逻辑名称，代表实体拥有的权限。一个实体可能有零个或多个被授予的权限。</li></ul><p>有了这些概念，我们可以更深入地了解_AuthorizationManager_接口。</p><h3 id="_2-1-如何使用-authorizationmanager" tabindex="-1"><a class="header-anchor" href="#_2-1-如何使用-authorizationmanager"><span>2.1. 如何使用_AuthorizationManager_</span></a></h3><p>_AuthorizationManager_是一个简单的接口，只包含两个方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AuthorizationDecision check(Supplier```&lt;Authentication&gt;``` authentication, T object);\n\nvoid verify(Supplier```&lt;Authentication&gt;``` authentication, T object);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两种方法看起来相似，因为它们接受相同的参数：</p><ul><li><em>authentication</em>：一个_Supplier_，提供代表发出请求的实体的_Authentication_对象。</li><li><em>object</em>：被请求的安全对象（将根据请求的性质而变化）</li></ul><p>然而，每个方法都有不同的目的。第一个方法返回一个_AuthorizationDecision_，这是一个简单的包装器，包装了一个布尔值，指示实体是否可以访问安全对象。</p><p>第二个方法不返回任何内容。<strong>相反，它只是执行授权检查，并在实体未被授权访问安全对象时抛出一个_AccessDeniedException_。</strong></p><h3 id="_2-2-spring-security的旧版本" tabindex="-1"><a class="header-anchor" href="#_2-2-spring-security的旧版本"><span>2.2. Spring Security的旧版本</span></a></h3><p>值得注意的是，_AuthorizationManager_接口是在Spring Security 5.0中引入的。在此接口之前，授权的主要方法是通过_AccessDecisionManager_接口。<strong>虽然_AccessDecisionManager_接口仍然存在于Spring Security的最新版本中，但它已被弃用，应该避免使用，而应该使用</strong><em>AuthorizationManager</em>。</p><h2 id="_3-authorizationmanager-的实现" tabindex="-1"><a class="header-anchor" href="#_3-authorizationmanager-的实现"><span>3. _AuthorizationManager_的实现</span></a></h2><p>Spring提供了几种_AuthorizationManager_接口的实现。在接下来的部分中，我们将看看其中的几个。</p><h3 id="_3-1-authenticatedauthorizationmanager" tabindex="-1"><a class="header-anchor" href="#_3-1-authenticatedauthorizationmanager"><span>3.1. <em>AuthenticatedAuthorizationManager</em></span></a></h3><p>我们将看到的第一个实现是_AuthenticatedAuthorizationManager_。简单来说，<strong>这个类仅基于实体是否经过身份验证来返回积极的授权决定</strong>。此外，它支持三种级别的认证：</p><ul><li>匿名：实体未经过身份验证</li><li>记住我：实体已通过身份验证并使用记住的凭据</li><li>完全认证：实体已通过身份验证且不使用记住的凭据</li></ul><p>请注意，这是Spring Boot为基于Web的应用程序创建的默认_AuthorizationManager_。默认情况下，所有端点都将允许访问，无论角色或权限如何，只要它来自经过身份验证的实体。</p><h3 id="_3-2-authoritiesauthorizationmanager" tabindex="-1"><a class="header-anchor" href="#_3-2-authoritiesauthorizationmanager"><span>3.2. <em>AuthoritiesAuthorizationManager</em></span></a></h3><p>这个实现的工作原理与前一个类似，<strong>除了它可以基于多个权限做出决定</strong>。这更适合于复杂应用程序，其中资源可能需要多个权限才能访问。</p><p>考虑一个使用不同角色来管理发布过程的博客系统。创建和保存文章的资源可能对_Author_和_Editor_角色都是可访问的。然而，发布资源仅对_Editor_角色可用。</p><h3 id="_3-3-authorityauthorizationmanager" tabindex="-1"><a class="header-anchor" href="#_3-3-authorityauthorizationmanager"><span>3.3. <em>AuthorityAuthorizationManager</em></span></a></h3><p>这个实现相当直接。<strong>它所有的授权决定都是基于实体是否具有特定角色</strong>。</p><p>这个实现适用于简单的应用程序，其中每个资源都需要单一角色或权限。例如，它可以很好地保护一组特定的URL，只允许具有_Administrator_角色的实体访问。</p><p>请注意，这个实现将其决策委托给_AuthoritiesAuthorizationManager_的一个实例。这也是Spring在我们自定义_SecurityFilterChain_时调用_hasRole()_或_hasAuthorities()_时使用的实现。</p><h3 id="_3-4-requestmatcherdelegatingauthorizationmanager" tabindex="-1"><a class="header-anchor" href="#_3-4-requestmatcherdelegatingauthorizationmanager"><span>3.4. <em>RequestMatcherDelegatingAuthorizationManager</em></span></a></h3><p>这个实现实际上并不做出授权决定。相反，<strong>它根据URL模式委托给另一个实现</strong>，通常是上述管理器类之一。</p><p>例如，如果我们有一些对任何人都可用的公共URL，我们可以将这些URL委托给一个总是返回积极授权的无操作实现。然后，我们可以将安全请求委托给一个处理角色检查的_AuthoritiesAuthorizationManager_。</p><p>事实上，<strong>这正是我们在向_SecurityFilterChain_添加新的请求匹配器时Spring所做的事情</strong>。每次我们配置一个新的请求匹配器并指定一个或多个所需的角色或权限时，Spring只是创建了这个类的一个新实例以及一个适当的委托。</p><h3 id="_3-5-observationauthorizationmanager" tabindex="-1"><a class="header-anchor" href="#_3-5-observationauthorizationmanager"><span>3.5. <em>ObservationAuthorizationManager</em></span></a></h3><p>我们将看到的最后一个实现是_ObservationAuthorizationManager_。这个类只是一个包装器，它包装了另一个实现，并增加了记录与授权决定相关的指标的能力。Spring将在应用程序中有有效的_ObservationRegistry_时自动使用这个实现。</p><h3 id="_3-6-其他实现" tabindex="-1"><a class="header-anchor" href="#_3-6-其他实现"><span>3.6. 其他实现</span></a></h3><p>值得一提的是，Spring Security中还存在其他一些实现。它们大多数与用于保护方法的各种Spring Security注释有关：</p><ul><li><em>SecuredAuthorizationManager -&gt; @Secured</em></li><li><em>PreAuthorizeAuthorizationManager -&gt; @PreAuthorize</em></li><li><em>PostAuthorizeAuthorizationManager -&gt; @PostAuthorize</em></li></ul><p><strong>基本上，我们可以使用任何Spring Security注释来保护资源，都有一个相应的_AuthorityManager_实现。</strong></p><h3 id="_3-7-使用多个-authorizationmanagers" tabindex="-1"><a class="header-anchor" href="#_3-7-使用多个-authorizationmanagers"><span>3.7. 使用多个_AuthorizationManagers_</span></a></h3><p>在实践中，我们很少只使用一个_AuthorizationManager_实例。让我们来看一个示例_SecurityFilterChain_ bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\nSecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {\n    http.authorizeHttpRequests((authorize) -&gt;\n            authorize.requestMatchers(&quot;/posts/publish/**&quot;).hasRole(&quot;EDITOR&quot;)\n            .requestMatchers(&quot;/posts/create/**&quot;).hasAnyRole(&quot;EDITOR&quot;, &quot;AUTHOR&quot;)\n            .anyRequest().permitAll());\n    return http.build();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个示例使用了五个不同的_AuthorizationManager_实例：</p><ul><li>_hasRole()_调用创建了一个_AuthorityAuthorizationManager_实例，该实例又委托给一个新的_AuthoritiesAuthorizationManager_实例。</li><li>_hasAnyRole()_调用也创建了一个_AuthorityAuthorizationManager_实例，该实例又委托给一个新的_AuthoritiesAuthorizationManager_实例。</li><li>_permitAll()<em>调用使用了Spring Security提供的静态无操作_AuthorizationManager</em>，它总是提供积极的授权决定。</li></ul><p>附加的请求匹配器及其自己的角色，以及任何基于方法的注释，都会创建额外的_AuthorizationManager_实例。</p><h2 id="_4-使用自定义-authorizationmanager" tabindex="-1"><a class="header-anchor" href="#_4-使用自定义-authorizationmanager"><span>4. 使用自定义_AuthorizationManager_</span></a></h2><p>上述提供的实现对于许多应用程序来说已经足够了。然而，正如Spring中的许多接口一样，完全可以创建自定义_AuthorizationManager_以满足我们的任何需求。</p><p>让我们定义一个自定义_AuthorizationManager_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AuthorizationManager``&lt;RequestAuthorizationContext&gt;`` customAuthManager() {\n    return new AuthorizationManager``&lt;RequestAuthorizationContext&gt;``() {\n        @Override\n        public AuthorizationDecision check(Supplier```&lt;Authentication&gt;``` authentication, RequestAuthorizationContext object) {\n            // 做出授权决定\n        }\n    };\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们将这个实例传递给自定义的_SecurityFilterChain_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {\n    http.authorizeHttpRequests((authorize) -&gt;\n            authorize.requestMatchers(&quot;/custom/**&quot;).access(customAuthManager())\n    return http.build();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们使用_RequestAuthorizationContext_做出授权决定。这个类提供了对底层HTTP请求的访问，这意味着我们可以根据诸如cookies、headers等做出决定。我们还可以委托给第三方服务、数据库或缓存等，以做出我们想要的任何类型的授权决定。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们仔细研究了Spring Security如何处理授权。我们看到了通用的_AuthorizationManager_接口以及它的两个方法如何做出授权决定。</p><p>我们还看到了这种实现的各种版本，以及它们如何在Spring Security框架的各个地方使用。</p><p>最后，我们创建了一个简单的自定义实现，可以用于在我们的应用程序中做出我们需要的任何类型的授权决定。</p><p>如常，本文的代码示例可在GitHub上找到。</p>',60),o=[r];function u(s,h){return i(),e("div",null,o)}const p=t(n,[["render",u],["__file","2024-06-21-Spring Security AuthorizationManager.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-21-Spring%20Security%20AuthorizationManager.html","title":"Spring Security 授权管理器","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Spring Security","Authorization"],"tag":["Spring Security","AuthorizationManager"],"head":[["meta",{"name":"keywords","content":"Spring Security, Authorization, AuthorizationManager, 认证, 授权, 安全性"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-21-Spring%20Security%20AuthorizationManager.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Security 授权管理器"}],["meta",{"property":"og:description","content":"Spring Security 授权管理器 如果你正在开发Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程： >> 学习 Spring 安全 1. 引言 Spring Security是Spring框架的一个扩展，它使我们能够轻松地将常见的安全实践集成到我们的应用程序中。这包括用户认证和授权、API保护等。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"AuthorizationManager"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Security 授权管理器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Security 授权管理器 如果你正在开发Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程： >> 学习 Spring 安全 1. 引言 Spring Security是Spring框架的一个扩展，它使我们能够轻松地将常见的安全实践集成到我们的应用程序中。这包括用户认证和授权、API保护等。..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[{"level":3,"title":"2.1. 如何使用_AuthorizationManager_","slug":"_2-1-如何使用-authorizationmanager","link":"#_2-1-如何使用-authorizationmanager","children":[]},{"level":3,"title":"2.2. Spring Security的旧版本","slug":"_2-2-spring-security的旧版本","link":"#_2-2-spring-security的旧版本","children":[]}]},{"level":2,"title":"3. _AuthorizationManager_的实现","slug":"_3-authorizationmanager-的实现","link":"#_3-authorizationmanager-的实现","children":[{"level":3,"title":"3.1. AuthenticatedAuthorizationManager","slug":"_3-1-authenticatedauthorizationmanager","link":"#_3-1-authenticatedauthorizationmanager","children":[]},{"level":3,"title":"3.2. AuthoritiesAuthorizationManager","slug":"_3-2-authoritiesauthorizationmanager","link":"#_3-2-authoritiesauthorizationmanager","children":[]},{"level":3,"title":"3.3. AuthorityAuthorizationManager","slug":"_3-3-authorityauthorizationmanager","link":"#_3-3-authorityauthorizationmanager","children":[]},{"level":3,"title":"3.4. RequestMatcherDelegatingAuthorizationManager","slug":"_3-4-requestmatcherdelegatingauthorizationmanager","link":"#_3-4-requestmatcherdelegatingauthorizationmanager","children":[]},{"level":3,"title":"3.5. ObservationAuthorizationManager","slug":"_3-5-observationauthorizationmanager","link":"#_3-5-observationauthorizationmanager","children":[]},{"level":3,"title":"3.6. 其他实现","slug":"_3-6-其他实现","link":"#_3-6-其他实现","children":[]},{"level":3,"title":"3.7. 使用多个_AuthorizationManagers_","slug":"_3-7-使用多个-authorizationmanagers","link":"#_3-7-使用多个-authorizationmanagers","children":[]}]},{"level":2,"title":"4. 使用自定义_AuthorizationManager_","slug":"_4-使用自定义-authorizationmanager","link":"#_4-使用自定义-authorizationmanager","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718962792000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.98,"words":2094},"filePathRelative":"posts/baeldung/Archive/2024-06-21-Spring Security AuthorizationManager.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>如果你正在开发Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程：</p>\\n<p><strong>&gt;&gt; 学习 Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 引言</h2>\\n<p>Spring Security是Spring框架的一个扩展，它使我们能够轻松地将常见的安全实践集成到我们的应用程序中。这包括用户认证和授权、API保护等。</p>\\n<p>在本教程中，我们将查看Spring Security内部的许多部分之一：<em>AuthorizationManager</em>。我们将看到它如何适应更大的Spring Security生态系统，以及它如何帮助保护我们的应用程序的各种用例。</p>","autoDesc":true}');export{p as comp,c as data};
