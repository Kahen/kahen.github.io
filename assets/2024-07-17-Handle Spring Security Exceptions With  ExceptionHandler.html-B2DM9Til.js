import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-BCpzTr_e.js";const s={},r=t(`<hr><h1 id="使用-exceptionhandler-处理-spring-security-异常" tabindex="-1"><a class="header-anchor" href="#使用-exceptionhandler-处理-spring-security-异常"><span>使用 @ExceptionHandler 处理 Spring Security 异常</span></a></h1><p>如果你正在处理 Spring Security（特别是 OAuth）的实现，一定要看看《学习 Spring 安全》课程：</p><p><strong>&gt;</strong> <strong>学习 Spring 安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将学习如何使用 <em>@ExceptionHandler</em> 和 <em>@ControllerAdvice</em> 全局处理 Spring 安全异常。控制器建议是一个拦截器，允许我们在应用程序中使用相同的异常处理。</p><p>Spring 安全核心异常如 <em>AuthenticationException</em> 和 <em>AccessDeniedException</em> 是运行时异常。由于这些异常是由 <em>DispatcherServlet</em> 背后的认证过滤器抛出的，并且在调用控制器方法之前，<em>ControllerAdvice</em> 无法捕获这些异常。</p><p>我们可以通过添加自定义过滤器并构建响应体来直接处理 Spring 安全异常。要通过 <em>@ExceptionHandler</em> 和 <em>@ControllerAdvice</em> 在全局级别处理这些异常，我们需要自定义实现 <em>AuthenticationEntryPoint</em>。<strong><em>AuthenticationEntryPoint</em> 用于发送一个 HTTP 响应，请求客户端提供凭据</strong>。虽然有多个内置的安全性入口点实现，但我们需要编写一个自定义实现以发送自定义响应消息。</p><p>首先，让我们看看如何在不使用 <em>@ExceptionHandler</em> 的情况下全局处理安全异常。</p><h2 id="_3-没有-exceptionhandler" tabindex="-1"><a class="header-anchor" href="#_3-没有-exceptionhandler"><span>3. 没有 <em>@ExceptionHandler</em></span></a></h2><p>Spring 安全异常从 <em>AuthenticationEntryPoint</em> 开始。让我们编写一个实现 <em>AuthenticationEntryPoint</em> 并重写 <em>commence()</em> 方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Component(&quot;customAuthenticationEntryPoint&quot;)
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
      throws IOException, ServletException {

        RestError re = new RestError(HttpStatus.UNAUTHORIZED.toString(), &quot;认证失败&quot;);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        OutputStream responseStream = response.getOutputStream();
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(responseStream, re);
        responseStream.flush();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用 <em>ObjectMapper</em> 作为响应体的消息转换器。</p><h3 id="_3-2-配置-securityconfig" tabindex="-1"><a class="header-anchor" href="#_3-2-配置-securityconfig"><span>3.2. 配置 <em>SecurityConfig</em></span></a></h3><p>接下来，让我们配置 <em>SecurityConfig</em> 以拦截认证路径。这里我们将配置 ‘/login’ 为上述实现的路径。此外，我们将配置用户名为 ‘admin’ 的用户，角色为 ‘ADMIN’：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
@EnableWebSecurity
public class CustomSecurityConfig {

    @Autowired
    @Qualifier(&quot;customAuthenticationEntryPoint&quot;)
    AuthenticationEntryPoint authEntryPoint;

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.withUsername(&quot;admin&quot;)
            .password(&quot;password&quot;)
            .roles(&quot;ADMIN&quot;)
            .build();
        InMemoryUserDetailsManager userDetailsManager = new InMemoryUserDetailsManager();
        userDetailsManager.createUser(admin);
        return userDetailsManager;
    }

   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http.authorizeHttpRequests(auth -&gt; auth
            .requestMatchers(&quot;/login&quot;)
            .authenticated()
            .anyRequest()
            .hasRole(&quot;ADMIN&quot;))
            .httpBasic(basic -&gt; basic.authenticationEntryPoint(authEntryPoint))
            .exceptionHandling(Customizer.withDefaults());
      return http.build();
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-配置-rest-控制器" tabindex="-1"><a class="header-anchor" href="#_3-3-配置-rest-控制器"><span>3.3. 配置 Rest 控制器</span></a></h3><p>现在，让我们编写一个监听此端点 ‘/login’ 的 rest 控制器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@PostMapping(value = &quot;/login&quot;, produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity\`\`&lt;RestResponse&gt;\`\` login() {
    return ResponseEntity.ok(new RestResponse(&quot;成功&quot;));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-测试" tabindex="-1"><a class="header-anchor" href="#_3-4-测试"><span>3.4. 测试</span></a></h3><p>最后，让我们使用模拟测试来测试这个端点。</p><p>首先，让我们编写一个成功认证的测试用例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@WithMockUser(username = &quot;admin&quot;, roles = { &quot;ADMIN&quot; })
public void whenUserAccessLogin_shouldSucceed() throws Exception {
    mvc.perform(formLogin(&quot;/login&quot;).user(&quot;username&quot;, &quot;admin&quot;)
      .password(&quot;password&quot;, &quot;password&quot;)
      .acceptMediaType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们看看认证失败的场景：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void whenUserAccessWithWrongCredentialsWithDelegatedEntryPoint_shouldFail() throws Exception {
    RestError re = new RestError(HttpStatus.UNAUTHORIZED.toString(), &quot;认证失败&quot;);
    mvc.perform(formLogin(&quot;/login&quot;).user(&quot;username&quot;, &quot;admin&quot;)
      .password(&quot;password&quot;, &quot;wrong&quot;)
      .acceptMediaType(MediaType.APPLICATION_JSON))
      .andExpect(status().isUnauthorized())
      .andExpect(jsonPath(&quot;$.errorMessage&quot;, is(re.getErrorMessage())));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们看看如何使用 <em>@ControllerAdvice</em> 和 <em>@ExceptionHandler</em> 达到同样的效果。</p><h2 id="_4-使用-exceptionhandler" tabindex="-1"><a class="header-anchor" href="#_4-使用-exceptionhandler"><span>4. 使用 <em>@ExceptionHandler</em></span></a></h2><p>这种方法允许我们使用完全相同的异常处理技术，但在控制器建议中以更清晰、更好的方式使用带有 <em>@ExceptionHandler</em> 注解的方法。</p><h3 id="_4-1-配置-authenticationentrypoint" tabindex="-1"><a class="header-anchor" href="#_4-1-配置-authenticationentrypoint"><span>4.1. 配置 <em>AuthenticationEntryPoint</em></span></a></h3><p>类似于上述方法，我们将实现 <em>AuthenticationEntryPoint</em>，然后将异常处理器委托给 <em>HandlerExceptionResolver</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Component(&quot;delegatedAuthenticationEntryPoint&quot;)
public class DelegatedAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    @Qualifier(&quot;handlerExceptionResolver&quot;)
    private HandlerExceptionResolver resolver;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
      throws IOException, ServletException {
        resolver.resolveException(request, response, null, authException);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们注入了 <em>DefaultHandlerExceptionResolver</em> 并将处理器委托给这个解析器。现在这个安全异常可以通过带有异常处理方法的控制器建议来处理。</p><h3 id="_4-2-配置-exceptionhandler" tabindex="-1"><a class="header-anchor" href="#_4-2-配置-exceptionhandler"><span>4.2. 配置 <em>ExceptionHandler</em></span></a></h3><p>现在，对于异常处理器的主要配置，我们将扩展 <em>ResponseEntityExceptionHandler</em> 并使用 <em>@ControllerAdvice</em> 注解这个类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ AuthenticationException.class })
    @ResponseBody
    public ResponseEntity\`&lt;RestError&gt;\` handleAuthenticationException(Exception ex) {

        RestError re = new RestError(HttpStatus.UNAUTHORIZED.toString(),
          &quot;在控制器建议中认证失败&quot;);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(re);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-配置-securityconfig" tabindex="-1"><a class="header-anchor" href="#_4-3-配置-securityconfig"><span>4.3. 配置 <em>SecurityConfig</em></span></a></h3><p>现在，让我们编写一个安全配置，用于这个委托认证入口点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
@EnableWebSecurity
public class DelegatedSecurityConfig {

    @Autowired
    @Qualifier(&quot;delegatedAuthenticationEntryPoint&quot;)
    AuthenticationEntryPoint authEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.requestMatchers()
            .antMatchers(&quot;/login-handler&quot;)
            .and()
            .authorizeRequests()
            .anyRequest()
            .hasRole(&quot;ADMIN&quot;)
            .and()
            .httpBasic()
            .and()
            .exceptionHandling()
            .authenticationEntryPoint(authEntryPoint);
        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails admin = User.withUsername(&quot;admin&quot;)
            .password(&quot;password&quot;)
            .roles(&quot;ADMIN&quot;)
            .build();
        return new InMemoryUserDetailsManager(admin);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 ‘/login-handler’ 端点，我们已经使用上述实现的 <em>DelegatedAuthenticationEntryPoint</em> 配置了异常处理器。</p><h3 id="_4-4-配置-rest-控制器" tabindex="-1"><a class="header-anchor" href="#_4-4-配置-rest-控制器"><span>4.4. 配置 Rest 控制器</span></a></h3><p>让我们为 ‘/login-handler’ 端点配置 rest 控制器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@PostMapping(value = &quot;/login-handler&quot;, produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity\`\`&lt;RestResponse&gt;\`\` loginWithExceptionHandler() {
    return ResponseEntity.ok(new RestResponse(&quot;成功&quot;));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-测试" tabindex="-1"><a class="header-anchor" href="#_4-5-测试"><span>4.5. 测试</span></a></h3><p>现在让我们测试这个端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@WithMockUser(username = &quot;admin&quot;, roles = { &quot;ADMIN&quot; })
public void whenUserAccessLogin_shouldSucceed() throws Exception {
    mvc.perform(formLogin(&quot;/login-handler&quot;).user(&quot;username&quot;, &quot;admin&quot;)
      .password(&quot;password&quot;, &quot;password&quot;)
      .acceptMediaType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk());
}

@Test
public void whenUserAccessWithWrongCredentialsWithDelegatedEntryPoint_shouldFail() throws Exception {
    RestError re = new RestError(HttpStatus.UNAUTHORIZED.toString(), &quot;在控制器建议中认证失败&quot;);
    mvc.perform(formLogin(&quot;/login-handler&quot;).user(&quot;username&quot;, &quot;admin&quot;)
      .password(&quot;password&quot;, &quot;wrong&quot;)
      .acceptMediaType(MediaType.APPLICATION_JSON))
      .andExpect(status().isUnauthorized())
      .andExpect(jsonPath(&quot;$.errorMessage&quot;, is(re.getErrorMessage())));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在成功测试中，我们使用预配置的用户名和密码测试了端点。在失败测试中，我们验证了响应的状态码和响应体中的错误消息。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，<strong>我们学习了如何使用 <em>@ExceptionHandler</em> 全局处理 Spring 安全异常</strong>。此外，我们创建了一个完全功能的示例，帮助我们理解所解释的概念。</p><p>本文的完整源代码可在 GitHub 上获取。</p>`,49),a=[r];function l(d,o){return i(),n("div",null,a)}const p=e(s,[["render",l],["__file","2024-07-17-Handle Spring Security Exceptions With  ExceptionHandler.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-17/2024-07-17-Handle%20Spring%20Security%20Exceptions%20With%20%20ExceptionHandler.html","title":"使用 @ExceptionHandler 处理 Spring Security 异常","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","Exception Handling"],"tag":["Spring Security","ExceptionHandler","AuthenticationException","AccessDeniedException"],"head":[["meta",{"name":"keywords","content":"Spring Security, Exception Handling, AuthenticationException, AccessDeniedException"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-17/2024-07-17-Handle%20Spring%20Security%20Exceptions%20With%20%20ExceptionHandler.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用 @ExceptionHandler 处理 Spring Security 异常"}],["meta",{"property":"og:description","content":"使用 @ExceptionHandler 处理 Spring Security 异常 如果你正在处理 Spring Security（特别是 OAuth）的实现，一定要看看《学习 Spring 安全》课程： > 学习 Spring 安全 1. 概述 在本教程中，我们将学习如何使用 @ExceptionHandler 和 @ControllerAdvic..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-17T18:14:44.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:tag","content":"ExceptionHandler"}],["meta",{"property":"article:tag","content":"AuthenticationException"}],["meta",{"property":"article:tag","content":"AccessDeniedException"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-17T18:14:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用 @ExceptionHandler 处理 Spring Security 异常\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-17T18:14:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用 @ExceptionHandler 处理 Spring Security 异常 如果你正在处理 Spring Security（特别是 OAuth）的实现，一定要看看《学习 Spring 安全》课程： > 学习 Spring 安全 1. 概述 在本教程中，我们将学习如何使用 @ExceptionHandler 和 @ControllerAdvic..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"3. 没有 @ExceptionHandler","slug":"_3-没有-exceptionhandler","link":"#_3-没有-exceptionhandler","children":[{"level":3,"title":"3.2. 配置 SecurityConfig","slug":"_3-2-配置-securityconfig","link":"#_3-2-配置-securityconfig","children":[]},{"level":3,"title":"3.3. 配置 Rest 控制器","slug":"_3-3-配置-rest-控制器","link":"#_3-3-配置-rest-控制器","children":[]},{"level":3,"title":"3.4. 测试","slug":"_3-4-测试","link":"#_3-4-测试","children":[]}]},{"level":2,"title":"4. 使用 @ExceptionHandler","slug":"_4-使用-exceptionhandler","link":"#_4-使用-exceptionhandler","children":[{"level":3,"title":"4.1. 配置 AuthenticationEntryPoint","slug":"_4-1-配置-authenticationentrypoint","link":"#_4-1-配置-authenticationentrypoint","children":[]},{"level":3,"title":"4.2. 配置 ExceptionHandler","slug":"_4-2-配置-exceptionhandler","link":"#_4-2-配置-exceptionhandler","children":[]},{"level":3,"title":"4.3. 配置 SecurityConfig","slug":"_4-3-配置-securityconfig","link":"#_4-3-配置-securityconfig","children":[]},{"level":3,"title":"4.4. 配置 Rest 控制器","slug":"_4-4-配置-rest-控制器","link":"#_4-4-配置-rest-控制器","children":[]},{"level":3,"title":"4.5. 测试","slug":"_4-5-测试","link":"#_4-5-测试","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721240084000,"updatedTime":1721240084000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.28,"words":1284},"filePathRelative":"posts/baeldung/2024-07-17/2024-07-17-Handle Spring Security Exceptions With  ExceptionHandler.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用 @ExceptionHandler 处理 Spring Security 异常</h1>\\n<p>如果你正在处理 Spring Security（特别是 OAuth）的实现，一定要看看《学习 Spring 安全》课程：</p>\\n<p><strong>&gt;</strong> <strong>学习 Spring 安全</strong></p>\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将学习如何使用 <em>@ExceptionHandler</em> 和 <em>@ControllerAdvice</em> 全局处理 Spring 安全异常。控制器建议是一个拦截器，允许我们在应用程序中使用相同的异常处理。</p>","autoDesc":true}');export{p as comp,v as data};
