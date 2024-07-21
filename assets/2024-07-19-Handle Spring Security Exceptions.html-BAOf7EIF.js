import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-Cen3CZk3.js";const r={},s=t(`<h1 id="处理spring-security异常" tabindex="-1"><a class="header-anchor" href="#处理spring-security异常"><span>处理Spring Security异常</span></a></h1><p>如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring》的<strong>安全课程</strong>。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本文中，我们将看看如何<strong>处理由我们的Spring Security资源服务器产生的Spring Security异常</strong>。为此，我们还将使用一个实际的例子，其中将解释所有必要的配置。首先，让我们简短地介绍一下Spring Security。</p><p>Spring Security是Spring项目的一部分库。<strong>它试图将Spring项目中用户访问控制的所有功能集中起来</strong>。访问控制允许限制应用程序中特定用户组或角色可以执行的选项。在这个方向上，<strong>Spring Security控制对业务逻辑的调用或限制对某些URL的HTTP请求的访问</strong>。考虑到这一点，我们必须通过告诉Spring Security安全层应该如何表现来配置应用程序。</p><p>在我们的例子中，我们将专注于异常处理程序的配置。<strong>Spring Security提供了三个不同的接口来实现这个目的并控制产生的事件：</strong></p><ul><li>认证成功处理器</li><li>认证失败处理器</li><li>访问拒绝处理器</li></ul><p>首先，让我们仔细看看配置。</p><h2 id="_3-安全配置" tabindex="-1"><a class="header-anchor" href="#_3-安全配置"><span>3. 安全配置</span></a></h2><p>首先，我们有配置类，它必须创建一个_SecurityFilterChain_ bean。<strong>这将负责管理应用程序的所有安全配置</strong>。所以，这就是我们必须引入我们的处理器的地方。</p><p>一方面，我们将定义所需的配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
        .httpBasic(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth -&gt; auth
        .requestMatchers(&quot;/login&quot;)
        .permitAll()
        .requestMatchers(&quot;/customError&quot;)
        .permitAll()
        .requestMatchers(&quot;/access-denied&quot;)
        .permitAll()
        .requestMatchers(&quot;/secured&quot;)
        .hasRole(&quot;ADMIN&quot;)
        .anyRequest()
        .authenticated())
        .formLogin(form -&gt; form.failureHandler(authenticationFailureHandler())
                        .successHandler(authenticationSuccessHandler()))
                        .exceptionHandling(ex -&gt; ex.accessDeniedHandler(accessDeniedHandler()))
        .logout(Customizer.withDefaults());
    return http.build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，重定向URL，如&quot;/login&quot;、&quot;/customError&quot;和&quot;/access-denied&quot;不需要任何类型的访问限制。所以我们将它们标注为_permitAll()_。</p><p>另一方面，我们必须定义定义我们可以处理的异常类型的Beans：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public AuthenticationFailureHandler authenticationFailureHandler() {
    return new CustomAuthenticationFailureHandler();
}

@Bean
public AuthenticationSuccessHandler authenticationSuccessHandler() {
   return new CustomAuthenticationSuccessHandler();
}

@Bean
public AccessDeniedHandler accessDeniedHandler() {
   return new CustomAccessDeniedHandler();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于_AuthenticationSuccessHandler_处理成功路径，我们将为异常情况定义剩余的两个bean。<strong>这两个处理器是我们现在必须适应和实现以满足我们的需求的</strong>。所以，让我们继续实现每一个。</p><h2 id="_4-认证失败处理器" tabindex="-1"><a class="header-anchor" href="#_4-认证失败处理器"><span>4. 认证失败处理器</span></a></h2><p>一方面，我们有_AuthenticationFailureHandler_接口。它负责<strong>管理用户登录失败时产生的异常</strong>。这个接口为我们提供了_onAuthenticationFailure()_方法来自定义处理器逻辑。<strong>它将在Spring Security登录失败时被调用</strong>。考虑到这一点，让我们定义我们的异常处理器，当登录失败时重定向到错误页面：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
      throws IOException {
        response.sendRedirect(&quot;/customError&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-访问拒绝处理器" tabindex="-1"><a class="header-anchor" href="#_5-访问拒绝处理器"><span>5. 访问拒绝处理器</span></a></h2><p>另一方面，当未经授权的用户试图访问安全或受保护的页面时，<strong>Spring Security将抛出访问拒绝异常</strong>。Spring Security有一个默认的403访问拒绝页面，我们可以自定义。这由_AccessDeniedHandler_接口管理。<strong>此外，它提供了_handle()_方法，用于在重定向用户到403页面之前自定义逻辑</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException exc) throws IOException {
        response.sendRedirect(&quot;/access-denied&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇简短的文章中，<strong>我们学习了如何处理Spring Security异常以及如何通过创建和自定义我们的类来控制它们</strong>。此外，我们创建了一个完全功能的例子，帮助我们理解所解释的概念。</p><p>文章的完整源代码可以在GitHub上找到。</p>`,25),a=[s];function l(c,d){return i(),n("div",null,a)}const p=e(r,[["render",l],["__file","2024-07-19-Handle Spring Security Exceptions.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Handle%20Spring%20Security%20Exceptions.html","title":"处理Spring Security异常","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security"],"tag":["异常处理","资源服务器"],"head":[["meta",{"name":"keywords","content":"Spring Security, 异常处理, 资源服务器"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Handle%20Spring%20Security%20Exceptions.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"处理Spring Security异常"}],["meta",{"property":"og:description","content":"处理Spring Security异常 如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring》的安全课程。 1. 概述 在本文中，我们将看看如何处理由我们的Spring Security资源服务器产生的Spring Security异常。为此，我们还将使用一个实际的例子，其中将解释所有必要的配置。首先，让我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T13:44:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"异常处理"}],["meta",{"property":"article:tag","content":"资源服务器"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T13:44:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"处理Spring Security异常\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T13:44:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"处理Spring Security异常 如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring》的安全课程。 1. 概述 在本文中，我们将看看如何处理由我们的Spring Security资源服务器产生的Spring Security异常。为此，我们还将使用一个实际的例子，其中将解释所有必要的配置。首先，让我..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 安全配置","slug":"_3-安全配置","link":"#_3-安全配置","children":[]},{"level":2,"title":"4. 认证失败处理器","slug":"_4-认证失败处理器","link":"#_4-认证失败处理器","children":[]},{"level":2,"title":"5. 访问拒绝处理器","slug":"_5-访问拒绝处理器","link":"#_5-访问拒绝处理器","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721396687000,"updatedTime":1721396687000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.17,"words":952},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Handle Spring Security Exceptions.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring》的<strong>安全课程</strong>。</p>\\n<h2>1. 概述</h2>\\n<p>在本文中，我们将看看如何<strong>处理由我们的Spring Security资源服务器产生的Spring Security异常</strong>。为此，我们还将使用一个实际的例子，其中将解释所有必要的配置。首先，让我们简短地介绍一下Spring Security。</p>\\n<p>Spring Security是Spring项目的一部分库。<strong>它试图将Spring项目中用户访问控制的所有功能集中起来</strong>。访问控制允许限制应用程序中特定用户组或角色可以执行的选项。在这个方向上，<strong>Spring Security控制对业务逻辑的调用或限制对某些URL的HTTP请求的访问</strong>。考虑到这一点，我们必须通过告诉Spring Security安全层应该如何表现来配置应用程序。</p>","autoDesc":true}');export{p as comp,g as data};
