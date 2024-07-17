import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as r}from"./app-YddbDb53.js";const n={},a=r(`<h1 id="spring-security中的httpsecurity与websecurity-baeldung" tabindex="-1"><a class="header-anchor" href="#spring-security中的httpsecurity与websecurity-baeldung"><span>Spring Security中的HttpSecurity与WebSecurity | Baeldung</span></a></h1><p>如果你正在处理Spring Security（尤其是OAuth）的实现，一定要看看《学习Spring Security》课程。</p><h2 id="_1-概览" tabindex="-1"><a class="header-anchor" href="#_1-概览"><span>1. 概览</span></a></h2><p>Spring Security框架提供了_WebSecurity_和_HttpSecurity_类，以提供对API和资源的全局和资源特定的访问限制机制。_WebSecurity_类有助于在全局级别配置安全性，而_HttpSecurity_提供了为特定资源配置安全性的方法。</p><p>在本教程中，我们将详细查看_HttpSecurity_和_WebSecurity_的关键用途。我们还将看到这两个类之间的区别。</p><p>_HttpSecurity_类有助于为特定的HTTP请求配置安全性。 它还允许使用_requestMatcher()_方法将安全配置限制为特定的HTTP端点。 此外，它提供了灵活性，以配置特定HTTP请求的授权。我们可以使用_hasRole()_方法创建基于角色的认证。</p><p>以下是使用_HttpSecurity_类的示例代码，以限制对“/admin/**”的访问：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests((authorize) -&gt; authorize.requestMatchers(&quot;/admin/**&quot;)
      .authenticated()
      .anyRequest()
      .permitAll())
      .formLogin(withDefaults());
    return http.build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用_HttpSecurity_类来限制对“/admin/**”端点的访问。任何对该端点的请求都需要在授予访问权限之前进行身份验证。</p><p>此外，《HttpSecurity》类提供了一种方法，用于为受限端点配置授权。让我们修改我们的示例代码，以允许只有管理员角色的用户访问“/admin/**”端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// ...
http.authorizeHttpRequests((authorize) -&gt; authorize.requestMatchers(&quot;/admin/**&quot;).hasRole(&quot;ADMIN&quot;)
// ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们通过允许只有“ADMIN”角色的用户访问端点，为请求提供了更多的安全层。</p><p>此外，《HttpSecurity》类还有助于在Spring Security中配置CORS和CSRF保护。</p><h2 id="_3-websecurity" tabindex="-1"><a class="header-anchor" href="#_3-websecurity"><span>3. <em>WebSecurity</em></span></a></h2><p><em>WebSecurity_类有助于在Spring应用程序中全局配置安全性。我们可以通过暴露_WebSecurityCustomizer</em> bean来自定义_WebSecurity_。</p><p>与_HttpSecurity_类不同，后者有助于为特定的URL模式或单个资源配置安全规则，《WebSecurity_配置适用于所有请求和资源。</p><p>此外，它提供了调试Spring Security过滤器的方法，忽略某些请求和资源的安全检查，或为Spring应用程序配置防火墙。</p><h3 id="_3-1-ignoring-方法" tabindex="-1"><a class="header-anchor" href="#_3-1-ignoring-方法"><span>3.1. <em>ignoring()</em> 方法</span></a></h3><p>此外，《WebSecurity_类提供了一个名为_ignoring()_的方法。_ignoring()_方法有助于Spring Security忽略一个_RequestMatcher_的实例。建议只为静态资源注册请求。</p><p>以下是使用_ignoring()_方法在Spring应用程序中忽略静态资源的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
WebSecurityCustomizer ignoringCustomizer() {
    return (web) -&gt; web.ignoring().requestMatchers(&quot;/resources/**&quot;, &quot;/static/**&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_ignoring()_方法绕过静态资源的安全检查。</p><p>值得注意的是，Spring建议_ignoring()_方法不应用于动态请求，而只应用于静态资源，因为它绕过了Spring Security过滤器链。这对于CSS、图像等静态资源是推荐的。</p><p>然而，动态请求需要通过身份验证和授权来提供不同的访问规则，因为它们携带敏感数据。此外，如果我们完全忽略动态端点，我们将失去完全的安全控制。这可能会使应用程序面临各种攻击，如CSRF攻击或SQL注入。</p><h3 id="_3-2-debug-方法" tabindex="-1"><a class="header-anchor" href="#_3-2-debug-方法"><span>3.2. <em>debug()</em> 方法</span></a></h3><p>此外，《debug()_方法启用了Spring Security内部的日志记录，以帮助调试配置或请求失败。这在诊断安全规则时可能很有帮助，无需使用调试器。</p><p>让我们看看使用_debug()_方法调试安全的示例代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
WebSecurityCustomizer debugSecurity() {
    return (web) -&gt; web.debug(true);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们在_WebSecurity_实例上调用_debug()<em>并将其设置为_true</em>。这在全球范围内启用了所有安全过滤器的调试日志记录。</p><h3 id="_3-3-httpfirewall-方法" tabindex="-1"><a class="header-anchor" href="#_3-3-httpfirewall-方法"><span>3.3. <em>httpFirewall()</em> 方法</span></a></h3><p>此外，《WebSecurity_类提供了_httpFirewall()_方法，用于为Spring应用程序配置防火墙。它有助于设置规则，以在全局级别允许某些操作。</p><p>让我们使用_httpFirewall()_方法来确定我们的应用程序应该允许哪些HTTP方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
HttpFirewall allowHttpMethod() {
    List\`\`&lt;String&gt;\`\` allowedMethods = new ArrayList\`\`&lt;String&gt;\`\`();
    allowedMethods.add(&quot;GET&quot;);
    allowedMethods.add(&quot;POST&quot;);
    StrictHttpFirewall firewall = new StrictHttpFirewall();
    firewall.setAllowedHttpMethods(allowedMethods);
    return firewall;
}

@Bean
WebSecurityCustomizer fireWall() {
    return (web) -&gt; web.httpFirewall(allowHttpMethod());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们暴露了_HttpFirewall_ bean来配置HTTP方法的防火墙。默认情况下，允许DELETE、GET、HEAD、OPTIONS、PATCH、POST和PUT方法。然而，在我们的示例中，我们将应用程序配置为只使用GET和POST方法。</p><p>我们创建了一个_StrictHttpFirewall_对象，并在其上调用_setAllowedHttpMethods()_方法。该方法接受一个允许的HTTP方法列表作为参数。</p><p>最后，我们通过将_allowHttpMethod()_方法传递给_httpFirewall()<em>方法，暴露了一个_WebSecurityCustomizer</em> bean，以全局配置防火墙。任何不是GET或POST的请求都将因为防火墙而返回HTTP错误。</p><h2 id="_4-关键差异" tabindex="-1"><a class="header-anchor" href="#_4-关键差异"><span>4. 关键差异</span></a></h2><p>_HttpSecurity_和_WebSecurity_配置不是相互冲突的，而是可以一起工作，以提供全局和资源特定的安全规则。</p><p>然而，如果在两者中都配置了相似的安全规则，_WebSecurity_配置具有最高的优先级：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
WebSecurityCustomizer ignoringCustomizer() {
    return (web) -&gt; web.ignoring().antMatchers(&quot;/admin/**&quot;);
}

// ...
http.authorizeHttpRequests((authorize) -&gt; authorize.antMatchers(&quot;/admin/**&quot;).hasRole(&quot;ADMIN&quot;)
// ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们在_WebSecurity_配置中全局忽略了“/admin/<strong>”路径，但也在_HttpSecurity_中为“/admin/</strong>”路径配置了访问规则。</p><p>在这种情况下，WebSecurity _ignoring()_配置将覆盖_HttpSecurity_对“/admin/**”的授权。</p><p>此外，在_SecurityFilterChain_中，_WebSecurity_配置是在构建过滤器链时首先执行的。接下来评估_HttpSecurity_规则。</p><p>以下是显示_HttpSecurity_和_WebSecurity_类关键差异的表格：</p><table><thead><tr><th>特性</th><th>WebSecurity</th><th>HttpSecurity</th></tr></thead><tbody><tr><td>范围</td><td>全局默认安全规则</td><td>资源特定的安全规则</td></tr><tr><td>示例</td><td>防火墙配置，路径忽略，调试模式</td><td>URL规则，授权，CORS，CSRF</td></tr><tr><td>配置方法</td><td>按资源条件配置</td><td>全局可重用的安全配置</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了_HttpSecurity_和_WebSecurity_的关键用法和示例代码。我们还看到了_HttpSecurity_如何允许为特定资源配置安全规则，而_WebSecurity_设置全局默认规则。</p><p>将它们一起使用提供了在全局和资源特定级别保护Spring应用程序的灵活性。</p><p>如常，示例的完整代码可在GitHub上找到。</p>`,49),u=[a];function l(c,d){return i(),t("div",null,u)}const o=e(n,[["render",l],["__file","2024-06-28-HttpSecurity vs. WebSecurity in Spring Security.html.vue"]]),S=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-HttpSecurity%20vs.%20WebSecurity%20in%20Spring%20Security.html","title":"Spring Security中的HttpSecurity与WebSecurity | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","OAuth"],"tag":["HttpSecurity","WebSecurity"],"head":[["meta",{"name":"keywords","content":"Spring Security, HttpSecurity, WebSecurity, Security, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-HttpSecurity%20vs.%20WebSecurity%20in%20Spring%20Security.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Security中的HttpSecurity与WebSecurity | Baeldung"}],["meta",{"property":"og:description","content":"Spring Security中的HttpSecurity与WebSecurity | Baeldung 如果你正在处理Spring Security（尤其是OAuth）的实现，一定要看看《学习Spring Security》课程。 1. 概览 Spring Security框架提供了_WebSecurity_和_HttpSecurity_类，以提供对..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T17:32:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"HttpSecurity"}],["meta",{"property":"article:tag","content":"WebSecurity"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T17:32:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Security中的HttpSecurity与WebSecurity | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T17:32:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Security中的HttpSecurity与WebSecurity | Baeldung 如果你正在处理Spring Security（尤其是OAuth）的实现，一定要看看《学习Spring Security》课程。 1. 概览 Spring Security框架提供了_WebSecurity_和_HttpSecurity_类，以提供对..."},"headers":[{"level":2,"title":"1. 概览","slug":"_1-概览","link":"#_1-概览","children":[]},{"level":2,"title":"3. WebSecurity","slug":"_3-websecurity","link":"#_3-websecurity","children":[{"level":3,"title":"3.1. ignoring() 方法","slug":"_3-1-ignoring-方法","link":"#_3-1-ignoring-方法","children":[]},{"level":3,"title":"3.2. debug() 方法","slug":"_3-2-debug-方法","link":"#_3-2-debug-方法","children":[]},{"level":3,"title":"3.3. httpFirewall() 方法","slug":"_3-3-httpfirewall-方法","link":"#_3-3-httpfirewall-方法","children":[]}]},{"level":2,"title":"4. 关键差异","slug":"_4-关键差异","link":"#_4-关键差异","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719595941000,"updatedTime":1719595941000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.22,"words":1566},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-HttpSecurity vs. WebSecurity in Spring Security.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>如果你正在处理Spring Security（尤其是OAuth）的实现，一定要看看《学习Spring Security》课程。</p>\\n<h2>1. 概览</h2>\\n<p>Spring Security框架提供了_WebSecurity_和_HttpSecurity_类，以提供对API和资源的全局和资源特定的访问限制机制。_WebSecurity_类有助于在全局级别配置安全性，而_HttpSecurity_提供了为特定资源配置安全性的方法。</p>\\n<p>在本教程中，我们将详细查看_HttpSecurity_和_WebSecurity_的关键用途。我们还将看到这两个类之间的区别。</p>","autoDesc":true}');export{o as comp,S as data};
