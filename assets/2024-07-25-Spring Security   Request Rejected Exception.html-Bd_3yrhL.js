import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as n}from"./app-DzJ3ruqA.js";const a={},s=n(`<h1 id="spring-security-–-请求被拒绝异常-baeldung" tabindex="-1"><a class="header-anchor" href="#spring-security-–-请求被拒绝异常-baeldung"><span>Spring Security – 请求被拒绝异常 | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span><strong>1. 引言</strong></span></a></h2><p>Spring Framework 的 5.0 至 5.0.4 版本，以及 4.3 至 4.3.14 和其他旧版本，在 Windows 系统上存在目录或路径遍历安全漏洞。</p><p>错误配置静态资源可能会允许恶意用户访问服务器的文件系统。例如，在 Windows 上使用 file: 协议提供静态资源会提供对文件系统的非法访问。</p><p>Spring Framework 承认了这个漏洞，并在后续版本中进行了修复。</p><p>因此，这个修复保护应用程序免受路径遍历攻击。然而，由于这个修复，一些早期的 URL 现在会抛出 <em>org.springframework.security.web.firewall.RequestRejectedException</em> 异常。</p><p>最后，在本教程中，让我们了解在路径遍历攻击背景下的 <em>org.springframework.security.web.firewall.RequestRejectedException</em> 和 <em>StrictHttpFirewall</em>。</p><h2 id="_2-路径遍历漏洞" tabindex="-1"><a class="header-anchor" href="#_2-路径遍历漏洞"><span><strong>2. 路径遍历漏洞</strong></span></a></h2><p>路径遍历或目录遍历漏洞允许非法访问 web 文档根目录之外的访问。例如，通过操作 URL 可以提供对文档根目录之外文件的未授权访问。</p><p>尽管大多数最新和流行的 web 服务器可以抵消这些攻击，但攻击者仍然可以使用特殊字符如 “./”，“../” 的 URL 编码来绕过 web 服务器安全并获得非法访问。</p><p>此外，OWASP 讨论了路径遍历漏洞以及解决它们的方法。</p><h2 id="_3-spring-framework-漏洞" tabindex="-1"><a class="header-anchor" href="#_3-spring-framework-漏洞"><span><strong>3. Spring Framework 漏洞</strong></span></a></h2><p>现在，让我们在了解如何修复它之前尝试复制这个漏洞。</p><p>首先，让我们克隆 Spring Framework MVC 示例。然后，让我们修改 <em>pom.xml</em> 并将现有的 Spring Framework 版本替换为易受攻击的版本。</p><p>克隆仓库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>git clone git@github.com:spring-projects/spring-mvc-showcase.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在克隆的目录中，编辑 <em>pom.xml</em> 以包括 <em>5.0.0.RELEASE</em> 作为 Spring Framework 版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;org.springframework-version&gt;\`5.0.0.RELEASE\`&lt;/org.springframework-version&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，编辑 web 配置类 <em>WebMvcConfig</em> 并修改 <em>addResourceHandlers</em> 方法，以使用 <em>file:</em> 将资源映射到本地文件目录：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
      .addResourceHandler(&quot;/resources/**&quot;)
      .addResourceLocations(&quot;file:./src/&quot;, &quot;/resources/&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，构建工件并运行我们的 web 应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn jetty:run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，当服务器启动时，调用 URL：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl &#39;http://localhost:8080/spring-mvc-showcase/resources/%255c%255c%252e%252e%255c/%252e%252e%255c/%252e%252e%255c/%252e%252e%255c/%252e%252e%255c/windows/system.ini&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>%252e%252e%255c</em> 是 ..\\ 的双重编码形式，而 <em>%255c%255c</em> 是 \\\\ 的双重编码形式。</p><p><strong>危险地，响应将是 Windows 系统文件 <em>system.ini</em> 的内容。</strong></p><h2 id="_4-spring-security-httpfirewall-接口" tabindex="-1"><a class="header-anchor" href="#_4-spring-security-httpfirewall-接口"><span><strong>4. Spring Security <em>HttpFirewall</em> 接口</strong></span></a></h2><p>Servlet 规范没有精确定义 <em>servletPath</em> 和 <em>pathInfo</em> 之间的区别。因此，在 Servlet 容器中对这些值的转换存在不一致性。</p><p>例如，在 <em>Tomcat 9</em> 上，对于 URL <em>http://localhost:8080/api/v1/users/1</em>，URI <em>/1</em> 应该是一个路径变量。</p><p>另一方面，以下命令返回 <em>/api/v1/users/1</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>request.getServletPath()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，下面的命令返回 <em>null</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>request.getPathInfo()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>无法区分 URI 中的路径变量可能导致潜在的攻击，如路径遍历 / 目录遍历攻击。例如，用户可以通过在 URL 中包含 <em>_、</em>/../、._._ 来利用服务器上的系统文件。不幸的是，只有一些 Servlet 容器会规范化这些 URL。</p><p>Spring Security 来救援。Spring Security 在容器之间保持一致的行为，并使用 <em>HttpFirewall</em> 接口规范化这些恶意 URL。这个接口有两种实现：</p><h3 id="_4-1-defaulthttpfirewall" tabindex="-1"><a class="header-anchor" href="#_4-1-defaulthttpfirewall"><span>4.1. <em>DefaultHttpFirewall</em></span></a></h3><p><strong>首先，不要被实现类的名称混淆。换句话说，这不是默认的 <em>HttpFirewall</em> 实现。</strong></p><p>防火墙尝试清理或规范化 URL，并在容器中标准化 <em>servletPath</em> 和 <em>pathInfo</em>。此外，我们可以通过显式声明一个 <em>@Bean</em> 来覆盖默认的 <em>HttpFirewall</em> 行为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public HttpFirewall getHttpFirewall() {
    return new DefaultHttpFirewall();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，<em>StrictHttpFirewall</em> 提供了一个更加健壮和安全的实现，并且是推荐的实现。</p><h3 id="_4-2-stricthttpfirewall" tabindex="-1"><a class="header-anchor" href="#_4-2-stricthttpfirewall"><span>4.2. <em>StrictHttpFirewall</em></span></a></h3><p>**<em>StrictHttpFirewall</em> 是 <em>HttpFirewall</em> 的默认和更严格的实现。**与 <em>DefaultHttpFirewall</em> 不同，<em>StrictHttpFirewall</em> 拒绝任何未规范化的 URL，提供更严格的保护。此外，这个实现保护应用程序免受其他几种攻击，如跨站追踪 (XST) 和 HTTP 动词篡改。</p><p>此外，这个实现是可定制的，并且具有合理的默认设置。换句话说，我们可以禁用（不推荐）一些功能，例如允许分号作为 URI 的一部分：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public HttpFirewall getHttpFirewall() {
    StrictHttpFirewall strictHttpFirewall = new StrictHttpFirewall();
    strictHttpFirewall.setAllowSemicolon(true);
    return strictHttpFirewall;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简而言之，<em>StrictHttpFirewall</em> 以 <em>org.springframework.security.web.firewall.RequestRejectedException</em> 拒绝可疑请求。</p><p><strong>最后，让我们使用 Spring REST 和 Spring Security 开发一个具有用户 CRUD 操作的用户管理应用程序</strong>，并看到 <em>StrictHttpFirewall</em> 在行动中。</p><h2 id="_5-依赖项" tabindex="-1"><a class="header-anchor" href="#_5-依赖项"><span><strong>5. 依赖项</strong></span></a></h2><p>让我们声明 Spring Security 和 Spring Web 的依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.springframework.boot\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`spring-boot-starter-security\`\`&lt;/artifactId&gt;\`\`
    \`\`&lt;version&gt;\`\`3.1.5\`\`&lt;/version&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`org.springframework.boot\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`spring-boot-starter-web\`\`&lt;/artifactId&gt;\`\`
    \`\`&lt;version&gt;\`\`3.1.5\`\`&lt;/version&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-spring-security-配置" tabindex="-1"><a class="header-anchor" href="#_6-spring-security-配置"><span><strong>6. Spring Security 配置</strong></span></a></h2><p>接下来，让我们通过创建一个配置类来使用基本认证保护我们的应用程序，该类创建了一个 <em>SecurityFilterChain</em> bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
public class HttpFirewallConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -&gt;
                    authorizationManagerRequestMatcherRegistry.requestMatchers(&quot;/error&quot;).permitAll().anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，Spring Security 提供了一个每次重启都会更改的默认密码。因此，让我们在 <em>application.properties</em> 中创建一个默认的用户名和密码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.security.user.name=user
spring.security.user.password=password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>从此以后，我们将使用这些凭据访问我们的安全 REST API。</p><h2 id="_7-构建安全-rest-api" tabindex="-1"><a class="header-anchor" href="#_7-构建安全-rest-api"><span><strong>7. 构建安全 REST API</strong></span></a></h2><p>现在，让我们构建我们的用户管理 REST API：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@PostMapping
public ResponseEntity\`\`&lt;Response&gt;\`\` createUser(@RequestBody User user) {
    userService.saveUser(user);
    Response response = new Response()
      .withTimestamp(System.currentTimeMillis())
      .withCode(HttpStatus.CREATED.value())
      .withMessage(&quot;User created successfully&quot;);
    URI location = URI.create(&quot;/users/&quot; + user.getId());
    return ResponseEntity.created(location).body(response);
}

@DeleteMapping(&quot;/{userId}&quot;)
public ResponseEntity\`\`&lt;Response&gt;\`\` deleteUser(@PathVariable(&quot;userId&quot;) String userId) {
    userService.deleteUser(userId);
    return ResponseEntity.ok(new Response(200,
      &quot;The user has been deleted successfully&quot;, System.currentTimeMillis()));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们构建并运行应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mvn spring-boot:run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_8-测试-api" tabindex="-1"><a class="header-anchor" href="#_8-测试-api"><span><strong>8. 测试 API</strong></span></a></h2><p>现在，让我们从使用 cURL 创建一个 <em>User</em> 开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl -i --user user:password -d @request.json -H &quot;Content-Type: application/json&quot;
     -H &quot;Accept: application/json&quot; http://localhost:8080/api/v1/users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是一个 <em>request.json</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;id&quot;:&quot;1&quot;,
    &quot;username&quot;:&quot;navuluri&quot;,
    &quot;email&quot;:&quot;bhaskara.navuluri@mail.com&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相应的响应是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HTTP/1.1 201
Location: /users/1
Content-Type: application/json
{
  &quot;code&quot;:201,
  &quot;message&quot;:&quot;User created successfully&quot;,
  &quot;timestamp&quot;:1632808055618
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们配置我们的 <em>StrictHttpFirewall</em> 拒绝所有请求的 HTTP 方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public HttpFirewall configureFirewall() {
    StrictHttpFirewall strictHttpFirewall = new StrictHttpFirewall();
    strictHttpFirewall
      .setAllowedHttpMethods(Collections.emptyList());
    return strictHttpFirewall;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，再次调用 API。由于我们配置 <em>StrictHttpFirewall</em> 来限制所有 HTTP 方法，这次我们会得到一个错误。</p><p>在日志中，我们有这个异常：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>org.springframework.security.web.firewall.RequestRejectedException:
The request was rejected because the HTTP method &quot;POST&quot; was not included
within the list of allowed HTTP methods []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自 <em>Spring Security v6.1.5</em> 起，我们可以使用 <em>RequestRejectedHandler</em> 来自定义当出现 <em>RequestRejectedException</em> 时的 <em>HTTP 状态</em>：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public RequestRejectedHandler requestRejectedHandler() {
   return new HttpStatusRequestRejectedHandler();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，默认情况下使用 <em>HttpStatusRequestRejectedHandler</em> 的 HTTP 状态码是 <em>400</em>。然而，我们可以通过在 <em>HttpStatusRequestRejectedHandler</em> 类的构造函数中传递一个状态码来自定义这个状态码。</p><p>现在，让我们重新配置 <em>StrictHttpFirewall</em> 以允许 URL 中的 <em>_ 和 HTTP GET</em>、<em>POST</em>、<em>DELETE</em> 以及 <em>OPTIONS</em> 方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>strictHttpFirewall.setAllowBackSlash(true);
strictHttpFirewall.setAllowedHttpMethods(Arrays.asList(&quot;GET&quot;,&quot;POST&quot;,&quot;DELETE&quot;, &quot;OPTIONS&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，调用 API：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl -i --user user:password -d @request.json -H &quot;Content-Type: application/json&quot;
     -H &quot;Accept: application/json&quot; http://localhost:8080/api\\v1/users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们得到响应：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;code&quot;:201,
  &quot;message&quot;:&quot;User created successfully&quot;,
  &quot;timestamp&quot;:1632812660569
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，通过删除 <em>@Bean</em> 声明，让我们恢复到 <em>StrictHttpFirewall</em> 的原始严格功能。</p><p>接下来，让我们尝试使用可疑的 URL 调用我们的 API：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl -i --user user:password -d @request.json -H &quot;Content-Type: application/json&quot;
      -H &quot;Accept: application/json&quot; http://localhost:8080/api/v1//users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl -i --user user:password -d @request.json -H &quot;Content-Type: application/json&quot;
      -H &quot;Accept: application/json&quot; http://localhost:8080/api/v1\\users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>立刻，上述所有请求都因错误日志而失败：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>org.springframework.security.web.firewall.RequestRejectedException:
The request was rejected because the URL contained a potentially malicious String &quot;//&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span><strong>9. 结论</strong></span></a></h2><p><strong>本文解释了 Spring Security 对可能引起路径遍历/目录遍历攻击的恶意 URL 的保护。</strong></p><p><em>DefaultHttpFirewall</em> 尝试规范化恶意 URL。然而，<em>StrictHttpFirewall</em> 以 <em>RequestRejectedException</em> 拒绝请求。除了路径遍历攻击之外，《StrictHttpFirewall》还保护我们免受其他几种攻击。因此，强烈建议使用 <em>StrictHttpFirewall</em> 及其默认配置。</p><p>像往常一样，完整的源代码可以在 Github 上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-lightbox-icn-1.0.0-1.png" alt="img" loading="lazy"></p><p>OK</p>`,93),r=[s];function l(d,c){return i(),t("div",null,r)}const o=e(a,[["render",l],["__file","2024-07-25-Spring Security   Request Rejected Exception.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-25/2024-07-25-Spring%20Security%20%20%20Request%20Rejected%20Exception.html","title":"Spring Security – 请求被拒绝异常 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-26T00:00:00.000Z","category":["Spring Security","Web Security"],"tag":["Request Rejected Exception","Path Traversal"],"head":[["meta",{"name":"keywords","content":"Spring Security, Path Traversal, Request Rejected Exception, Web Security"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-25/2024-07-25-Spring%20Security%20%20%20Request%20Rejected%20Exception.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Security – 请求被拒绝异常 | Baeldung"}],["meta",{"property":"og:description","content":"Spring Security – 请求被拒绝异常 | Baeldung 1. 引言 Spring Framework 的 5.0 至 5.0.4 版本，以及 4.3 至 4.3.14 和其他旧版本，在 Windows 系统上存在目录或路径遍历安全漏洞。 错误配置静态资源可能会允许恶意用户访问服务器的文件系统。例如，在 Windows 上使用 file..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-25T17:57:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Request Rejected Exception"}],["meta",{"property":"article:tag","content":"Path Traversal"}],["meta",{"property":"article:published_time","content":"2024-07-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-25T17:57:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Security – 请求被拒绝异常 | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-security-lightbox-icn-1.0.0-1.png\\"],\\"datePublished\\":\\"2024-07-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-25T17:57:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Security – 请求被拒绝异常 | Baeldung 1. 引言 Spring Framework 的 5.0 至 5.0.4 版本，以及 4.3 至 4.3.14 和其他旧版本，在 Windows 系统上存在目录或路径遍历安全漏洞。 错误配置静态资源可能会允许恶意用户访问服务器的文件系统。例如，在 Windows 上使用 file..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 路径遍历漏洞","slug":"_2-路径遍历漏洞","link":"#_2-路径遍历漏洞","children":[]},{"level":2,"title":"3. Spring Framework 漏洞","slug":"_3-spring-framework-漏洞","link":"#_3-spring-framework-漏洞","children":[]},{"level":2,"title":"4. Spring Security HttpFirewall 接口","slug":"_4-spring-security-httpfirewall-接口","link":"#_4-spring-security-httpfirewall-接口","children":[{"level":3,"title":"4.1. DefaultHttpFirewall","slug":"_4-1-defaulthttpfirewall","link":"#_4-1-defaulthttpfirewall","children":[]},{"level":3,"title":"4.2. StrictHttpFirewall","slug":"_4-2-stricthttpfirewall","link":"#_4-2-stricthttpfirewall","children":[]}]},{"level":2,"title":"5. 依赖项","slug":"_5-依赖项","link":"#_5-依赖项","children":[]},{"level":2,"title":"6. Spring Security 配置","slug":"_6-spring-security-配置","link":"#_6-spring-security-配置","children":[]},{"level":2,"title":"7. 构建安全 REST API","slug":"_7-构建安全-rest-api","link":"#_7-构建安全-rest-api","children":[]},{"level":2,"title":"8. 测试 API","slug":"_8-测试-api","link":"#_8-测试-api","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1721930273000,"updatedTime":1721930273000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.64,"words":1993},"filePathRelative":"posts/baeldung/2024-07-25/2024-07-25-Spring Security   Request Rejected Exception.md","localizedDate":"2024年7月26日","excerpt":"\\n<h2><strong>1. 引言</strong></h2>\\n<p>Spring Framework 的 5.0 至 5.0.4 版本，以及 4.3 至 4.3.14 和其他旧版本，在 Windows 系统上存在目录或路径遍历安全漏洞。</p>\\n<p>错误配置静态资源可能会允许恶意用户访问服务器的文件系统。例如，在 Windows 上使用 file: 协议提供静态资源会提供对文件系统的非法访问。</p>\\n<p>Spring Framework 承认了这个漏洞，并在后续版本中进行了修复。</p>\\n<p>因此，这个修复保护应用程序免受路径遍历攻击。然而，由于这个修复，一些早期的 URL 现在会抛出 <em>org.springframework.security.web.firewall.RequestRejectedException</em> 异常。</p>","autoDesc":true}');export{o as comp,m as data};
