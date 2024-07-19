import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a as t}from"./app-BK0B2whz.js";const a={},s=t(`<hr><h1 id="如何将spring-security的授权决策外包给opa" tabindex="-1"><a class="header-anchor" href="#如何将spring-security的授权决策外包给opa"><span>如何将Spring Security的授权决策外包给OPA</span></a></h1><p>如果你正在处理Spring Security（特别是OAuth）的实现，一定要看看《学习Spring安全》课程： <strong>&gt;&gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将展示如何将Spring Security的授权决策外包给OPA——开放策略代理。</p><h2 id="_2-前言-外包授权的理由" tabindex="-1"><a class="header-anchor" href="#_2-前言-外包授权的理由"><span>2. 前言：外包授权的理由</span></a></h2><p><strong>跨应用程序的常见需求是能够基于策略做出某些决策</strong>。当这个策略足够简单且不太可能改变时，我们可以直接在代码中实现这个策略，这是最常见的情况。</p><p>然而，还有其他情况我们需要更多的灵活性。访问控制决策是典型的：随着应用程序复杂性的增加，授予对某个功能的访问权限可能不仅取决于你是谁，还取决于请求的其他上下文方面。这些方面可能包括IP地址、一天中的时间、登录认证方法（例如：“记住我”，一次性密码），等等。</p><p>此外，将上下文信息与用户身份结合的规则应该易于更改，最好在不停机的情况下进行更改。这种需求自然导致了一种架构，其中有一个专门的服务处理策略评估请求。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/05/bael-5584-spring-opa-Page-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这里，这种灵活性的权衡是增加了复杂性和对外部服务调用的性能惩罚。另一方面，我们可以完全发展甚至替换授权服务，而不影响应用程序。此外，我们可以与多个应用程序共享此服务，从而允许跨应用程序的一致授权模型。</p><h2 id="_3-opa是什么" tabindex="-1"><a class="header-anchor" href="#_3-opa是什么"><span>3. OPA是什么？</span></a></h2><p><strong>开放策略代理，简称OPA，是一个用Go实现的开源策略评估引擎</strong>。Styra最初开发了这个项目，但现在它是一个CNCF毕业项目。以下是这个工具的一些典型用途：</p><ul><li>Envoy授权过滤器</li><li>Kubernetes准入控制器</li><li>Terraform计划评估</li></ul><p>安装OPA非常简单：请参阅他们的官方文档以获取最新版本。此外，我们可以通过将其放在操作系统的PATH变量中使其可用。我们可以使用一个简单的命令验证它是否正确安装：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ opa version
版本：0.39.0
构建提交：cc965f6
构建时间戳：2022-03-31T12:34:56Z
构建主机名：5aba1d393f31
Go版本：go1.18
平台：windows/amd64
WebAssembly：可用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OPA评估用REGO编写的策略，REGO是一种声明性语言，优化了在复杂对象结构上运行查询。客户端应用程序然后根据特定用例使用这些查询的结果。在我们的情况下，对象结构是一个授权请求，我们将使用策略查询结果以授予对某个功能的访问权限。</p><p><strong>重要的是要注意，OPA的策略是通用的，并不以任何方式表达授权决策</strong>。实际上，我们可以使用它在其他传统上由规则引擎如Drools等主导的场景中。</p><h2 id="_4-编写策略" tabindex="-1"><a class="header-anchor" href="#_4-编写策略"><span>4. 编写策略</span></a></h2><p>这是一个用REGO编写的简单授权策略的样子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>package baeldung.auth.account

# 默认不授权
default authorized = false

authorized = true {
    count(deny) == 0
    count(allow) &gt; 0
}

# 允许访问 /public
allow[&quot;public&quot;] {
    regex.match(&quot;^/public/.*&quot;,input.uri)
}

# 账户API需要经过身份验证的用户
deny[&quot;account_api_authenticated&quot;] {
    regex.match(&quot;^/account/.*&quot;,input.uri)
    regex.match(&quot;ANONYMOUS&quot;,input.principal)
}

# 授权访问账户
allow[&quot;account_api_authorized&quot;] {
    regex.match(&quot;^/account/.+&quot;,input.uri)
    parts := split(input.uri,&quot;/&quot;)
    account := parts[2]
    role := concat(&quot;:&quot;,[ &quot;ROLE_account&quot;, &quot;read&quot;, account] )
    role == input.authorities[i]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先要注意的是包声明。OPA策略使用包来组织规则，它们在评估传入请求时也起着关键作用，稍后我们将展示。我们可以跨多个目录组织策略文件。</p><p>接下来，我们定义实际的策略规则：</p><ul><li>一个 <em>default</em> 规则，以确保我们总是得到 <em>authorized</em> 变量的值</li><li>主要聚合规则，我们可以将其读作“当没有规则拒绝访问且至少有一个规则允许访问时，<em>authorized</em> 是 <em>true</em>”</li><li>允许和拒绝规则，每个规则都表达一个条件，如果匹配，则将一个条目添加到 <em>allow</em> 或 <em>deny</em> 数组中</li></ul><p>完整描述OPA的策略语言超出了本文的范围，但规则本身并不难读。在查看它们时需要注意几件事：</p><ul><li>形式为 <em>a := b</em> 或 <em>a=b</em> 的语句是简单的赋值（它们不一样）</li><li>形式为 <em>a = b { … 条件 }</em> 或 <em>a { …条件 }</em> 的语句意味着“如果 <em>条件</em> 为真，则将 <em>b</em> 赋值给 <em>a</em>”</li><li>策略文档中出现的顺序是不相关的</li></ul><p>除此之外，OPA还带有一个丰富的内置函数库，优化了查询深层嵌套的数据结构，以及更熟悉的功能，如字符串操作、集合等。</p><h2 id="_5-评估策略" tabindex="-1"><a class="header-anchor" href="#_5-评估策略"><span>5. 评估策略</span></a></h2><p>让我们使用上一节中定义的策略来评估一个授权请求。在我们的情况下，我们将使用包含一些来自传入请求的部分的JSON结构构建这个授权请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
    &quot;input&quot;: {
        &quot;principal&quot;: &quot;user1&quot;,
        &quot;authorities&quot;: [&quot;ROLE_account:read:0001&quot;],
        &quot;uri&quot;: &quot;/account/0001&quot;,
        &quot;headers&quot;: {
            &quot;WebTestClient-Request-Id&quot;: &quot;1&quot;,
            &quot;Accept&quot;: &quot;application/json&quot;
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们已经将请求属性包装在一个单独的 <em>input</em> 对象中。这个对象在策略评估期间成为 <em>input</em> 变量，我们可以使用类似JavaScript的语法访问其属性。</p><p>为了测试我们的策略是否按预期工作，让我们在服务器模式下本地运行OPA并手动提交一些测试请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ opa run  -w -s src/test/rego
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>选项 <em>-s</em> 启用服务器模式，而 <em>-w</em> 启用自动规则文件重新加载。 <em>src/test/rego</em> 是包含我们示例代码策略文件的文件夹。一旦运行，OPA将在本地端口8181上监听API请求。如果需要，我们可以使用 <em>-a</em> 选项更改默认端口。</p><p>现在，我们可以使用 <em>curl</em> 或其他工具发送请求：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ curl --location --request POST &#39;http://localhost:8181/v1/data/baeldung/auth/account&#39; \\
--header &#39;Content-Type: application/json&#39; \\
--data-raw &#39;{
    &quot;input&quot;: {
        &quot;principal&quot;: &quot;user1&quot;,
        &quot;authorities&quot;: [],
        &quot;uri&quot;: &quot;/account/0001&quot;,
        &quot;headers&quot;: {
            &quot;WebTestClient-Request-Id&quot;: &quot;1&quot;,
            &quot;Accept&quot;: &quot;application/json&quot;
        }
    }
}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意 /v1/data 前缀后的路径部分：它对应策略的包名，点号被替换为正斜杠</strong>。</p><p>响应将是一个包含通过输入数据评估策略产生的所有结果的JSON对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;result&quot;: {
    &quot;allow&quot;: [],
    &quot;authorized&quot;: false,
    &quot;deny&quot;: []
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>result</em> 属性是一个对象，包含策略引擎产生的结果。我们可以看到，在这种情况下，<em>authorized</em> 属性是 <em>false</em>。我们还可以看到 <em>allow</em> 和 <em>deny</em> 是空数组。<strong>这意味着没有特定的规则匹配输入。因此，主要的授权规则也没有匹配</strong>。</p><p>现在我们已经看到了OPA的工作原理，我们可以继续将其集成到Spring授权框架中。<strong>在这里，我们将专注于其响应式Web变体，但一般思路也适用于常规的MVC应用程序</strong>。</p><p>首先，我们需要实现一个使用OPA作为后端的 <em>ReactiveAuthorizationManager</em> bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public ReactiveAuthorizationManager\`&lt;AuthorizationContext&gt;\` opaAuthManager(WebClient opaWebClient) {
    return (auth, context) -&gt; {
        return opaWebClient.post()
          .accept(MediaType.APPLICATION_JSON)
          .contentType(MediaType.APPLICATION_JSON)
          .body(toAuthorizationPayload(auth,context), Map.class)
          .exchangeToMono(this::toDecision);
    };
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，注入的 <em>WebClient</em> 来自另一个bean，我们从 <em>@ConfigurationPropreties</em> 类中预先初始化其属性。</p><p>处理管道将从当前 <em>Authentication</em> 和 <em>AuthorizationContext</em> 收集信息并构建授权请求负载的任务委托给 <em>toAuthorizationRequest</em> 方法。同样，<em>toAuthorizationDecision</em> 接受授权响应并将其映射到 <em>AuthorizationDecision</em>。</p><p>现在，我们使用这个bean来构建 <em>SecurityWebFilterChain</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public SecurityWebFilterChain accountAuthorization(ServerHttpSecurity http, @Qualifier(&quot;opaWebClient&quot;) WebClient opaWebClient) {
    return http.httpBasic(Customizer.withDefaults())
      .authorizeExchange(exchanges -&gt; exchanges\`\`\`
      .pathMatchers(&quot;/account/*&quot;)
        .access(opaAuthManager(opaWebClient)))
      .build();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们只将我们自定义的 <em>AuthorizationManager</em> 应用于 <em>/account</em> API。这种方法的原因是我们可以轻松地扩展这种逻辑，以支持多个策略文档，从而使它们更易于维护。例如，我们可以有一个配置，使用请求URI选择适当的规则包，并使用此信息构建授权请求。</p><p>在我们的情况下，<em>account</em> API本身只是一个简单的控制器/服务对，返回一个填充了假余额的 <em>Account</em> 对象。</p><h2 id="_7-测试" tabindex="-1"><a class="header-anchor" href="#_7-测试"><span>7. 测试</span></a></h2><p>最后但同样重要的是，让我们构建一个集成测试来将所有内容整合在一起。首先，让我们确保“快乐路径”工作。这意味着经过身份验证的用户能够访问他们的账户：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@WithMockUser(username = &quot;user1&quot;, roles = { &quot;account:read:0001&quot; })
void testGivenValidUser_thenSuccess() {
    rest.get()
     .uri(&quot;/account/0001&quot;)
      .accept(MediaType.APPLICATION_JSON)
      .exchange()
      .expectStatus()
      .is2xxSuccessful();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，我们还必须验证经过身份验证的用户只能访问他们的账户：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@WithMockUser(username = &quot;user1&quot;, roles = { &quot;account:read:0002&quot; })
void testGivenValidUser_thenUnauthorized() {
    rest.get()
     .uri(&quot;/account/0001&quot;)
      .accept(MediaType.APPLICATION_JSON)
      .exchange()
      .expectStatus()
      .isForbidden();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们也测试一下经过身份验证的用户没有权限的情况：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@WithMockUser(username = &quot;user1&quot;, roles = {})
void testGivenNoAuthorities_thenForbidden() {
    rest.get()
      .uri(&quot;/account/0001&quot;)
      .accept(MediaType.APPLICATION_JSON)
      .exchange()
      .expectStatus()
      .isForbidden();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以从IDE或命令行运行这些测试。<strong>请注意，在任何情况下，我们都必须首先启动指向包含我们授权策略文件的文件夹的OPA服务器</strong>。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们已经展示了如何使用OPA来外包基于Spring Security的应用程序的授权决策。像往常一样，完整的代码可以在GitHub上找到。 OK</p>`,59),l=[s];function r(d,u){return n(),i("div",null,l)}const v=e(a,[["render",r],["__file","2024-07-19-Spring Security Authorization with OPA.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Spring%20Security%20Authorization%20with%20OPA.html","title":"如何将Spring Security的授权决策外包给OPA","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","OAuth"],"tag":["Spring Security","OPA","Authorization","Policy"],"head":[["meta",{"name":"keywords","content":"Spring Security, OPA, Authorization, Policy"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Spring%20Security%20Authorization%20with%20OPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何将Spring Security的授权决策外包给OPA"}],["meta",{"property":"og:description","content":"如何将Spring Security的授权决策外包给OPA 如果你正在处理Spring Security（特别是OAuth）的实现，一定要看看《学习Spring安全》课程： >> 学习Spring 安全 1. 引言 在本教程中，我们将展示如何将Spring Security的授权决策外包给OPA——开放策略代理。 2. 前言：外包授权的理由 跨应用程序..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/05/bael-5584-spring-opa-Page-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T04:34:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"OPA"}],["meta",{"property":"article:tag","content":"Authorization"}],["meta",{"property":"article:tag","content":"Policy"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T04:34:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何将Spring Security的授权决策外包给OPA\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/05/bael-5584-spring-opa-Page-1.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T04:34:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何将Spring Security的授权决策外包给OPA 如果你正在处理Spring Security（特别是OAuth）的实现，一定要看看《学习Spring安全》课程： >> 学习Spring 安全 1. 引言 在本教程中，我们将展示如何将Spring Security的授权决策外包给OPA——开放策略代理。 2. 前言：外包授权的理由 跨应用程序..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 前言：外包授权的理由","slug":"_2-前言-外包授权的理由","link":"#_2-前言-外包授权的理由","children":[]},{"level":2,"title":"3. OPA是什么？","slug":"_3-opa是什么","link":"#_3-opa是什么","children":[]},{"level":2,"title":"4. 编写策略","slug":"_4-编写策略","link":"#_4-编写策略","children":[]},{"level":2,"title":"5. 评估策略","slug":"_5-评估策略","link":"#_5-评估策略","children":[]},{"level":2,"title":"7. 测试","slug":"_7-测试","link":"#_7-测试","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721363648000,"updatedTime":1721363648000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.73,"words":2318},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Spring Security Authorization with OPA.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>如何将Spring Security的授权决策外包给OPA</h1>\\n<p>如果你正在处理Spring Security（特别是OAuth）的实现，一定要看看《学习Spring安全》课程：\\n<strong>&gt;&gt; 学习Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将展示如何将Spring Security的授权决策外包给OPA——开放策略代理。</p>\\n<h2>2. 前言：外包授权的理由</h2>\\n<p><strong>跨应用程序的常见需求是能够基于策略做出某些决策</strong>。当这个策略足够简单且不太可能改变时，我们可以直接在代码中实现这个策略，这是最常见的情况。</p>","autoDesc":true}');export{v as comp,p as data};
