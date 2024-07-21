import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-CtR6X2Br.js";const a={},r=i(`<h1 id="使用spring-cloud-gateway和oauth2实现后端前端分离模式" tabindex="-1"><a class="header-anchor" href="#使用spring-cloud-gateway和oauth2实现后端前端分离模式"><span>使用Spring Cloud Gateway和OAuth2实现后端前端分离模式</span></a></h1><p>如果您正在研究Spring Security（特别是OAuth）的实现，一定要看看《Learn Spring Security》课程。</p><p><strong>&gt;&gt; 点击这里学习 Spring</strong><strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将使用Spring Cloud Gateway和spring-addons实现OAuth2后端前端分离（BFF）模式，以从三个不同的单页应用程序（Angular、React和Vue）消费无状态REST API。</p><p>使用调试工具检查时，我们不会在以使用OAuth2而闻名的任何主要网站上找到任何_Bearer_令牌（例如Google、Facebook、Github或LinkedIn）。为什么会这样？</p><p>根据安全专家的说法，我们不应该将运行在用户设备上的应用程序配置为“公共”OAuth2客户端，即使使用了PKCE。推荐的替代方案是<strong>使用我们信任的服务器上运行的BFF对移动和Web应用程序进行会话授权</strong>。</p><p>我们将在这里看到单页应用程序（SPA）如何轻松地通过OAuth2 BFF消费REST API。我们还将了解到，现有的资源服务器（使用_Bearer_访问令牌授权的无状态REST API）不需要进行任何修改。</p><p>在深入实现之前，让我们先探索一下OAuth2 BFF是什么，它带来了什么好处，以及它的成本是什么。</p><h3 id="_2-1-定义" tabindex="-1"><a class="header-anchor" href="#_2-1-定义"><span>2.1. 定义</span></a></h3><p>后端前端分离是前端和REST API之间的中间件，它可以有不同的目的。这里，我们关注的是OAuth2 BFF，它<strong>在前端使用会话cookie进行请求授权和资源服务器预期的Bearer令牌授权之间架起了桥梁</strong>。它的职责包括：</p><ul><li>使用“机密”OAuth2客户端驱动授权和刷新令牌流程</li><li>维护会话并在其中存储令牌</li><li>在将前端的请求转发到资源服务器之前，用会话中的访问令牌替换会话cookie</li></ul><h3 id="_2-2-相对于公共oauth2客户端的优势" tabindex="-1"><a class="header-anchor" href="#_2-2-相对于公共oauth2客户端的优势"><span>2.2. 相对于公共OAuth2客户端的优势</span></a></h3><p>主要增加的价值是安全性：</p><ul><li>由于BFF运行在我们信任的服务器上，<strong>授权服务器令牌端点可以用密钥和防火墙规则进行保护，只允许来自我们后端的请求</strong>。这大大减少了令牌被恶意客户端颁发给的风险。</li><li><strong>令牌保留在服务器上（在会话中），这防止了它们被恶意程序在最终用户设备上窃取</strong>。使用会话cookie需要防止CSRF攻击，但是cookie可以标记为_HttpOnly_、<em>Secure_和_SameSite</em>，在这种情况下，cookie在设备上的保护由浏览器本身强制执行。相比之下，配置为公共客户端的SPA需要访问令牌，我们必须非常小心地存储这些令牌：<strong>如果恶意程序设法读取访问令牌，对用户的后果可能是灾难性的</strong>。如果涉及到刷新令牌，情况会更糟，因为身份盗用可能会持续很长时间。</li></ul><p>另一个好处是它对用户会话的完全控制以及立即撤销访问的能力。作为提醒，JSON Web Tokens（JWT）不能被使无效，我们几乎不能在服务器上终止会话时删除存储在最终用户设备上的令牌。如果我们通过网络发送JWT访问令牌，我们所能做的就是等待它过期，因为对资源服务器的访问将继续被授权，直到过期。但是，<strong>如果令牌从未离开后端，那么我们可以与BFF上的用户会话一起删除它们，立即撤销对资源的访问</strong>。</p><h3 id="_2-3-成本" tabindex="-1"><a class="header-anchor" href="#_2-3-成本"><span>2.3. 成本</span></a></h3><p><strong>BFF是系统中的额外一层，并且它在关键路径上</strong>。在生产环境中，这意味着需要更多的资源和更多的延迟。它还需要一些监控。</p><p>此外，BFF后面的资源服务器可以（并且应该是）无状态的，但OAuth2 BFF本身需要会话，这需要特定的操作使其可扩展和容错。</p><p>我们可以轻松地将Spring Cloud Gateway打包成原生映像。这使它超级轻量级，可以在几秒钟内启动，但总有单个实例可以吸收的流量限制。<strong>当流量增加时，我们将不得不在BFF实例之间共享会话</strong>。Spring Session项目在这方面将非常有帮助。另一个选择是使用智能代理将来自给定设备的所有请求路由到同一个BFF实例。</p><h3 id="_2-4-实现选择" tabindex="-1"><a class="header-anchor" href="#_2-4-实现选择"><span>2.4. 实现选择</span></a></h3><p>一些框架实现了OAuth2 BFF模式，但没有明确地交流或以这种方式称呼它。例如，使用服务器组件实现OAuth2的_NextAuth_库（在服务器上的Node实例中的机密客户端）。这足以从OAuth2 BFF模式的安全性中受益。</p><p>但由于Spring生态系统，很少有像Spring Cloud Gateway这样方便的解决方案，当涉及到监控、可扩展性和容错性时：</p><ul><li>_spring-boot-starter-actuator_依赖项提供了强大的审计功能。</li><li>Spring Session是分布式会话的相当简单的解决方案。</li><li>_spring-boot-starter-oauth2-client_和_oauth2Login()_处理授权码和刷新令牌流程。它还在会话中存储令牌。</li><li>_TokenRelay=_过滤器在将请求从前端转发到资源服务器时，用会话中的访问令牌替换会话cookie。</li></ul><h2 id="_3-架构" tabindex="-1"><a class="header-anchor" href="#_3-架构"><span>3. 架构</span></a></h2><p>到目前为止，我们列出了很多服务：前端（SPAs）、REST API、BFF和授权服务器。让我们看看这些如何构成一个连贯的系统。</p><h3 id="_3-1-系统概述" tabindex="-1"><a class="header-anchor" href="#_3-1-系统概述"><span>3.1. 系统概述</span></a></h3><p>这是一个表示服务、端口和路径前缀的图，我们将使用主要配置文件：</p><p>两个要点需要注意：</p><ul><li>从最终用户设备的角度看，<strong>至少BFF和SPA资源有一个单一的接触点：反向代理</strong>。</li><li>资源服务器通过BFF访问。</li></ul><p>正如我们稍后将看到的，通过反向代理提供授权服务器是可选的。</p><p>当进入类似生产环境时，我们可以使用（子）域而不是路径前缀来区分SPAs。</p><h3 id="_3-2-快速开始" tabindex="-1"><a class="header-anchor" href="#_3-2-快速开始"><span>3.2. 快速开始</span></a></h3><p>配套仓库包含一个构建脚本，用于构建并启动上述服务的docker镜像。</p><p>要让一切运行起来，我们应该确保：</p><ul><li>JDK 17到21在路径上。我们可以运行_java –version_来检查这一点。</li><li>Docker Desktop已安装并运行。</li><li>最新的Node LTS在路径上（_nvm_或_nvm-windows_在这方面可以提供很大帮助）。</li></ul><p>然后，我们可以运行以下shell脚本（在Windows上，我们可能使用Git bash）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>git clone https://github.com/eugenp/tutorials.git
cd tutorials/spring-security-modules/spring-security-oauth2-bff/
sh ./build.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在接下来的部分中，我们将看到如何用手头的东西替换每一个容器。</p><h2 id="_4-使用spring-cloud-gateway和-spring-addons-starter-oidc-实现bff" tabindex="-1"><a class="header-anchor" href="#_4-使用spring-cloud-gateway和-spring-addons-starter-oidc-实现bff"><span>4. 使用Spring Cloud Gateway和_spring-addons-starter-oidc_实现BFF</span></a></h2><p>首先，使用我们的IDE或_https://start.spring.io/<em>，我们创建一个名为_bff_的新Spring Boot项目，依赖项为_Reactive Gateway_和_OAuth2 client</em>。</p><p>然后，我们将_src/main/resources/application.properties_重命名为_src/main/resources/application.yml_。</p><p>最后，我们将添加_spring-addons-starter-oidc_到我们的依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
  \`&lt;groupId&gt;\`com.c4-soft.springaddons\`&lt;/groupId&gt;\`
  \`&lt;artifactId&gt;\`spring-addons-starter-oidc\`&lt;/artifactId&gt;\`
  \`&lt;version&gt;\`7.7.0\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-重用属性" tabindex="-1"><a class="header-anchor" href="#_4-1-重用属性"><span>4.1. 重用属性</span></a></h3><p>让我们从_application.yml_中的一些常量开始，这将有助于我们在其他部分中使用，以及在需要在命令行或IDE启动配置中覆盖一些值时：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>scheme: http
hostname: localhost
reverse-proxy-port: 7080
reverse-proxy-uri: \${scheme}://\${hostname}:\${reverse-proxy-port}
authorization-server-prefix: /auth
issuer: \${reverse-proxy-uri}\${authorization-server-prefix}/realms/baeldung
client-id: baeldung-confidential
client-secret: secret
username-claim-json-path: $.preferred_username
authorities-json-path: $.realm_access.roles
bff-port: 7081
bff-prefix: /bff
resource-server-port: 7084
audience:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们必须用环境变量、命令行参数或IDE启动配置来覆盖_client-secret_的值。</p><h3 id="_4-2-服务器属性" tabindex="-1"><a class="header-anchor" href="#_4-2-服务器属性"><span>4.2. 服务器属性</span></a></h3><p>现在来一些通常的服务器属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>server:
  port: \${bff-port}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-spring-cloud-gateway路由" tabindex="-1"><a class="header-anchor" href="#_4-3-spring-cloud-gateway路由"><span>4.3. Spring Cloud Gateway路由</span></a></h3><p>由于我们网关后面有一个单一的资源服务器，我们只需要一个路由定义：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring:
  cloud:
    gateway:
      routes:
      - id: bff
        uri: \${scheme}://\${hostname}:\${resource-server-port}
        predicates:
        - Path=/api/**
        filters:
        - DedupeResponseHeader=Access-Control-Allow-Credentials Access-Control-Allow-Origin
        - TokenRelay=
        - SaveSession
        - StripPrefix=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最重要的部分是_SaveSession_和_TokenRelay=_，它们是实现OAuth2 BFF模式的基石</strong>。第一个确保会话被持久化，通过_oauth2Login()_获取的令牌</p>`,55),s=[r];function l(d,o){return n(),t("div",null,s)}const u=e(a,[["render",l],["__file","2024-06-22-OAuth2 Backend for Frontend With Spring Cloud Gateway.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-OAuth2%20Backend%20for%20Frontend%20With%20Spring%20Cloud%20Gateway.html","title":"使用Spring Cloud Gateway和OAuth2实现后端前端分离模式","lang":"zh-CN","frontmatter":{"date":"2023-10-10T00:00:00.000Z","category":["Spring Cloud","OAuth2"],"tag":["Spring Security","Backend for Frontend"],"head":[["meta",{"name":"keywords","content":"Spring Cloud Gateway, OAuth2, BFF, Spring Security, REST API, Single Page Application"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-OAuth2%20Backend%20for%20Frontend%20With%20Spring%20Cloud%20Gateway.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Cloud Gateway和OAuth2实现后端前端分离模式"}],["meta",{"property":"og:description","content":"使用Spring Cloud Gateway和OAuth2实现后端前端分离模式 如果您正在研究Spring Security（特别是OAuth）的实现，一定要看看《Learn Spring Security》课程。 >> 点击这里学习 Spring 安全 1. 概述 在本教程中，我们将使用Spring Cloud Gateway和spring-addo..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T02:23:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"Backend for Frontend"}],["meta",{"property":"article:published_time","content":"2023-10-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T02:23:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Cloud Gateway和OAuth2实现后端前端分离模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-10T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T02:23:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Cloud Gateway和OAuth2实现后端前端分离模式 如果您正在研究Spring Security（特别是OAuth）的实现，一定要看看《Learn Spring Security》课程。 >> 点击这里学习 Spring 安全 1. 概述 在本教程中，我们将使用Spring Cloud Gateway和spring-addo..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. 定义","slug":"_2-1-定义","link":"#_2-1-定义","children":[]},{"level":3,"title":"2.2. 相对于公共OAuth2客户端的优势","slug":"_2-2-相对于公共oauth2客户端的优势","link":"#_2-2-相对于公共oauth2客户端的优势","children":[]},{"level":3,"title":"2.3. 成本","slug":"_2-3-成本","link":"#_2-3-成本","children":[]},{"level":3,"title":"2.4. 实现选择","slug":"_2-4-实现选择","link":"#_2-4-实现选择","children":[]}]},{"level":2,"title":"3. 架构","slug":"_3-架构","link":"#_3-架构","children":[{"level":3,"title":"3.1. 系统概述","slug":"_3-1-系统概述","link":"#_3-1-系统概述","children":[]},{"level":3,"title":"3.2. 快速开始","slug":"_3-2-快速开始","link":"#_3-2-快速开始","children":[]}]},{"level":2,"title":"4. 使用Spring Cloud Gateway和_spring-addons-starter-oidc_实现BFF","slug":"_4-使用spring-cloud-gateway和-spring-addons-starter-oidc-实现bff","link":"#_4-使用spring-cloud-gateway和-spring-addons-starter-oidc-实现bff","children":[{"level":3,"title":"4.1. 重用属性","slug":"_4-1-重用属性","link":"#_4-1-重用属性","children":[]},{"level":3,"title":"4.2. 服务器属性","slug":"_4-2-服务器属性","link":"#_4-2-服务器属性","children":[]},{"level":3,"title":"4.3. Spring Cloud Gateway路由","slug":"_4-3-spring-cloud-gateway路由","link":"#_4-3-spring-cloud-gateway路由","children":[]}]}],"git":{"createdTime":1719022992000,"updatedTime":1719022992000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.01,"words":2102},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-OAuth2 Backend for Frontend With Spring Cloud Gateway.md","localizedDate":"2023年10月10日","excerpt":"\\n<p>如果您正在研究Spring Security（特别是OAuth）的实现，一定要看看《Learn Spring Security》课程。</p>\\n<p><strong>&gt;&gt; 点击这里学习 Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将使用Spring Cloud Gateway和spring-addons实现OAuth2后端前端分离（BFF）模式，以从三个不同的单页应用程序（Angular、React和Vue）消费无状态REST API。</p>\\n<p>使用调试工具检查时，我们不会在以使用OAuth2而闻名的任何主要网站上找到任何_Bearer_令牌（例如Google、Facebook、Github或LinkedIn）。为什么会这样？</p>","autoDesc":true}');export{u as comp,g as data};
