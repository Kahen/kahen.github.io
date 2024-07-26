import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-C4eFoh0f.js";const i={},l=a(`<hr><h1 id="使用-spring-cloud-gateway-实现-oauth-2-0-模式" tabindex="-1"><a class="header-anchor" href="#使用-spring-cloud-gateway-实现-oauth-2-0-模式"><span>使用 Spring Cloud Gateway 实现 OAuth 2.0 模式</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>Spring Cloud Gateway 是一个库，允许我们基于 Spring Boot 快速创建轻量级的 API 网关，我们之前的文章中已经介绍过。</p><p><strong>这次，我们将展示如何在其上快速实现 OAuth 2.0 模式。</strong></p><h2 id="_2-oauth-2-0-快速回顾" tabindex="-1"><a class="header-anchor" href="#_2-oauth-2-0-快速回顾"><span>2. OAuth 2.0 快速回顾</span></a></h2><p>OAuth 2.0 标准是一个在互联网上广泛使用的标准，作为安全机制，允许用户和应用程序安全地访问资源。</p><p>尽管详细描述这个标准超出了本文的范围，但让我们从几个关键术语开始快速回顾：</p><ul><li><strong>资源</strong>：只能由授权客户端检索的任何类型的信息</li><li><strong>客户端</strong>：消耗资源的应用程序，通常通过 REST API</li><li><strong>资源服务器</strong>：负责向授权客户端提供资源的服务</li><li><strong>资源所有者</strong>：拥有资源的实体（人类或应用程序），最终负责授予客户端访问权限</li><li><strong>令牌</strong>：客户端获取并作为请求的一部分发送给资源服务器以进行身份验证的信息片段</li><li><strong>身份提供者 (IdP)</strong>：验证用户凭据并向客户端发放访问令牌</li><li><strong>认证流程</strong>：客户端必须经历的一系列步骤以获取有效令牌</li></ul><p>要全面了解该标准，一个好的起点是 Auth0 关于此主题的文档。</p><p>Spring Cloud Gateway 主要用于以下角色之一：</p><ul><li><strong>OAuth 客户端</strong></li><li><strong>OAuth 资源服务器</strong></li></ul><p>让我们更详细地讨论每种情况。</p><h3 id="_3-1-spring-cloud-gateway-作为-oauth-2-0-客户端" tabindex="-1"><a class="header-anchor" href="#_3-1-spring-cloud-gateway-作为-oauth-2-0-客户端"><span>3.1. Spring Cloud Gateway 作为 OAuth 2.0 客户端</span></a></h3><p><strong>在这种情况下，任何未经身份验证的传入请求都将启动授权码流程</strong>。一旦网关获取到令牌，它就会在向后端服务发送请求时使用它：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/01/oauth2_authorization_flow.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这种模式的一个典型例子是社交网络聚合应用程序：对于每个支持的网络，网关将充当 OAuth 2.0 客户端。</p><p>结果，前端——通常是一个使用 Angular、React 或类似 UI 框架构建的 SPA 应用程序——可以无缝地代表最终用户访问这些网络上的数据。<strong>更重要的是：它可以做到这一点，而无需让用户向聚合器透露他们的凭据</strong>。</p><h3 id="_3-2-spring-cloud-gateway-作为-oauth-2-0-资源服务器" tabindex="-1"><a class="header-anchor" href="#_3-2-spring-cloud-gateway-作为-oauth-2-0-资源服务器"><span>3.2. Spring Cloud Gateway 作为 OAuth 2.0 资源服务器</span></a></h3><p><strong>在这里，网关充当看门人，强制执行每个请求在发送到后端服务之前都必须有一个有效的访问令牌</strong>。此外，它还可以检查令牌是否具有访问给定资源的适当权限，基于相关的范围：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/01/spring_gateway_resource_server.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>需要注意的是，这种权限检查主要在粗粒度级别上操作。细粒度访问控制（例如，对象/字段级权限）通常在后端使用领域逻辑实现。</p><p>在这种模式中需要考虑的一件事是后端服务如何对任何转发的请求进行身份验证和授权。有两种主要情况：</p><ul><li><strong>令牌传播</strong>：API 网关将接收到的令牌原样转发到后端</li><li><strong>令牌替换</strong>：API 网关在发送请求之前用另一个令牌替换传入的令牌</li></ul><p><strong>在本教程中，我们将只涵盖令牌传播案例，因为它是最常见的场景</strong>。第二种情况也是可能的，但需要额外的设置和编码，这会让我们从我们想要展示的主要点上分心。</p><h2 id="_4-示例项目概述" tabindex="-1"><a class="header-anchor" href="#_4-示例项目概述"><span>4. 示例项目概述</span></a></h2><p>为了展示如何使用我们迄今为止描述的 OAuth 模式使用 Spring Gateway，让我们构建一个示例项目，该项目公开了一个单一端点：<em>/quotes/{symbol}</em>。<strong>访问此端点需要由配置的身份提供者发放的有效访问令牌</strong>。</p><p>在我们的例子中，我们将使用嵌入式 Keycloak 身份提供者。唯一需要更改的是添加一个新的客户端应用程序和一些用于测试的用户。</p><p>为了让事情更有趣，我们的后端服务将根据与请求相关联的用户返回不同的报价。拥有 gold 角色的用户将获得较低的价格，而其他人则获得常规价格（毕竟生活是不公平的；^））。</p><p>我们将通过 Spring Cloud Gateway 来前置此服务，并通过更改几行配置，能够将其角色从 OAuth 客户端切换到资源服务器。</p><h2 id="_5-项目设置" tabindex="-1"><a class="header-anchor" href="#_5-项目设置"><span>5. 项目设置</span></a></h2><h3 id="_5-1-keycloak-idp" tabindex="-1"><a class="header-anchor" href="#_5-1-keycloak-idp"><span>5.1. Keycloak IdP</span></a></h3><p>我们将在本教程中使用的嵌入式 Keycloak 只是一个常规的 SpringBoot 应用程序，我们可以从 GitHub 克隆并使用 Maven 构建：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ git clone https://github.com/Baeldung/spring-security-oauth
$ cd oauth-rest/oauth-authorization/server
$ mvn install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：此项目目前针对 Java 13+，但也可以与 Java 11 一起构建和运行。我们只需要在 Maven 命令中添加 <em>-Djava.version=11</em>。</p><p>接下来，我们将替换 <em>src/main/resources/baeldung-domain.json</em> 为此版本。修改后的版本具有原始版本中可用的相同配置，另外还增加了一个客户端应用程序（<em>quotes-client</em>），两个用户组（<em>golden</em>_ 和 <em>silver_customers</em>）以及两个角色（<em>gold</em> 和 <em>silver</em>）。</p><p>我们现在可以使用 <em>spring-boot:run</em> Maven 插件启动服务器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ mvn spring-boot:run
... many, many log messages omitted
2022-01-16 10:23:20.318
  INFO 8108 --- [           main] c.baeldung.auth.AuthorizationServerApp   : Started AuthorizationServerApp in 23.815 seconds (JVM running for 24.488)
2022-01-16 10:23:20.334
  INFO 8108 --- [           main] c.baeldung.auth.AuthorizationServerApp   : Embedded Keycloak started: http://localhost:8083/auth to use keycloak
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦服务器启动，我们可以通过将浏览器指向 <em>http://localhost:8083/auth/admin/master/console/#/realms/baeldung</em> 来访问它。一旦我们使用管理员凭据（<em>bael-admin/pass</em>）登录，我们将获得领域管理屏幕：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/01/keycloak-baeldung-realm.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>要完成 IdP 设置，让我们添加几个用户。第一个将是 Maxwell Smart，他是 <em>golden_customer</em> 组的成员。第二个将是 John Snow，我们不会将他添加到任何组。</p><p><strong>使用提供的配置，<em>golden_customers</em> 组的成员将自动承担 <em>gold</em> 角色。</strong></p><h3 id="_5-2-后端服务" tabindex="-1"><a class="header-anchor" href="#_5-2-后端服务"><span>5.2. 后端服务</span></a></h3><p>报价后端需要常规的 Spring Boot Reactive MVC 依赖项，加上资源服务器启动器依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`org.springframework.boot\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`spring-boot-starter-oauth2-resource-server\`&lt;/artifactId&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们故意省略了依赖项的版本。这是使用 SpringBoot 的父 POM 或依赖管理部分中相应的 BOM 时推荐的做法。</p><p>在主应用程序类中，我们必须使用 <em>@EnableWebFluxSecurity</em> 启用 Web Flux 安全性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@SpringBootApplication
@EnableWebFluxSecurity
public class QuotesApplication {
    public static void main(String[] args) {
        SpringApplication.run(QuotesApplication.class);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>端点实现使用提供的 <em>BearerAuthenticationToken</em> 来检查当前用户是否具有 <em>gold</em> 角色：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestController
public class QuoteApi {
    private static final GrantedAuthority GOLD_CUSTOMER = new SimpleGrantedAuthority(&quot;gold&quot;);

    @GetMapping(&quot;/quotes/{symbol}&quot;)
    public Mono\`&lt;Quote&gt;\` getQuote(@PathVariable(&quot;symbol&quot;) String symbol,
      BearerTokenAuthentication auth ) {

        Quote q = new Quote();
        q.setSymbol(symbol);
        if ( auth.getAuthorities().contains(GOLD_CUSTOMER)) {
            q.setPrice(10.0);
        }
        else {
            q.setPrice(12.0);
        }
        return Mono.just(q);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，Spring 如何获取用户角色呢？毕竟，这不是像 <em>scopes</em> 或 <em>email</em> 这样的标准声明。<strong>实际上，这里没有魔法：我们必须提供一个自定义的 <em>ReactiveOpaqueTokenIntrospection</em>，从 Keycloak 返回的自定义字段中提取这些角色</strong>。这个 bean 在线可用，基本上与 Spring 文档中显示的内容相同，只是有一些针对我们自定义字段的微小更改。</p><p>我们还必须提供访问我们身份提供者所需的配置属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.security.oauth2.resourceserver.opaquetoken.introspection-uri=http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/token/introspect
spring.security.oauth2.resourceserver.opaquetoken.client-id=quotes-client
spring.security.oauth2.resourceserver.opaquetoken.client-secret=\`&lt;CLIENT SECRET&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，要运行我们的应用程序，我们可以将其导入 IDE 或从 Maven 运行。项目的 POM 包含一个为此目的的配置文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ mv</code></pre><div class="line-numbers" aria-hidden="true"></div></div>`,55),r=[l];function o(s,d){return n(),t("div",null,r)}const c=e(i,[["render",o],["__file","2024-07-22-Using Spring Cloud Gateway with OAuth 2.0 Patterns.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Using%20Spring%20Cloud%20Gateway%20with%20OAuth%202.0%20Patterns.html","title":"使用 Spring Cloud Gateway 实现 OAuth 2.0 模式","lang":"zh-CN","frontmatter":{"date":"2022-01-16T00:00:00.000Z","category":["Spring Cloud Gateway","OAuth 2.0"],"tag":["Spring Cloud Gateway","OAuth 2.0"],"head":[["meta",{"name":"keywords","content":"Spring Cloud Gateway, OAuth 2.0, API Gateway, Security"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Using%20Spring%20Cloud%20Gateway%20with%20OAuth%202.0%20Patterns.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用 Spring Cloud Gateway 实现 OAuth 2.0 模式"}],["meta",{"property":"og:description","content":"使用 Spring Cloud Gateway 实现 OAuth 2.0 模式 1. 引言 Spring Cloud Gateway 是一个库，允许我们基于 Spring Boot 快速创建轻量级的 API 网关，我们之前的文章中已经介绍过。 这次，我们将展示如何在其上快速实现 OAuth 2.0 模式。 2. OAuth 2.0 快速回顾 OAuth..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/01/oauth2_authorization_flow.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T08:14:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Cloud Gateway"}],["meta",{"property":"article:tag","content":"OAuth 2.0"}],["meta",{"property":"article:published_time","content":"2022-01-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T08:14:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用 Spring Cloud Gateway 实现 OAuth 2.0 模式\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/01/oauth2_authorization_flow.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/01/spring_gateway_resource_server.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/01/keycloak-baeldung-realm.png\\"],\\"datePublished\\":\\"2022-01-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T08:14:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用 Spring Cloud Gateway 实现 OAuth 2.0 模式 1. 引言 Spring Cloud Gateway 是一个库，允许我们基于 Spring Boot 快速创建轻量级的 API 网关，我们之前的文章中已经介绍过。 这次，我们将展示如何在其上快速实现 OAuth 2.0 模式。 2. OAuth 2.0 快速回顾 OAuth..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. OAuth 2.0 快速回顾","slug":"_2-oauth-2-0-快速回顾","link":"#_2-oauth-2-0-快速回顾","children":[{"level":3,"title":"3.1. Spring Cloud Gateway 作为 OAuth 2.0 客户端","slug":"_3-1-spring-cloud-gateway-作为-oauth-2-0-客户端","link":"#_3-1-spring-cloud-gateway-作为-oauth-2-0-客户端","children":[]},{"level":3,"title":"3.2. Spring Cloud Gateway 作为 OAuth 2.0 资源服务器","slug":"_3-2-spring-cloud-gateway-作为-oauth-2-0-资源服务器","link":"#_3-2-spring-cloud-gateway-作为-oauth-2-0-资源服务器","children":[]}]},{"level":2,"title":"4. 示例项目概述","slug":"_4-示例项目概述","link":"#_4-示例项目概述","children":[]},{"level":2,"title":"5. 项目设置","slug":"_5-项目设置","link":"#_5-项目设置","children":[{"level":3,"title":"5.1. Keycloak IdP","slug":"_5-1-keycloak-idp","link":"#_5-1-keycloak-idp","children":[]},{"level":3,"title":"5.2. 后端服务","slug":"_5-2-后端服务","link":"#_5-2-后端服务","children":[]}]}],"git":{"createdTime":1721636081000,"updatedTime":1721636081000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.32,"words":1897},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Using Spring Cloud Gateway with OAuth 2.0 Patterns.md","localizedDate":"2022年1月16日","excerpt":"<hr>\\n<h1>使用 Spring Cloud Gateway 实现 OAuth 2.0 模式</h1>\\n<h2>1. 引言</h2>\\n<p>Spring Cloud Gateway 是一个库，允许我们基于 Spring Boot 快速创建轻量级的 API 网关，我们之前的文章中已经介绍过。</p>\\n<p><strong>这次，我们将展示如何在其上快速实现 OAuth 2.0 模式。</strong></p>\\n<h2>2. OAuth 2.0 快速回顾</h2>\\n<p>OAuth 2.0 标准是一个在互联网上广泛使用的标准，作为安全机制，允许用户和应用程序安全地访问资源。</p>\\n<p>尽管详细描述这个标准超出了本文的范围，但让我们从几个关键术语开始快速回顾：</p>","autoDesc":true}');export{c as comp,g as data};
