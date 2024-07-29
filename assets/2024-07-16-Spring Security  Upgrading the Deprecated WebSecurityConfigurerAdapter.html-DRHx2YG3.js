import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a as t}from"./app-Bx_7oN2A.js";const r={},s=t(`<hr><h1 id="spring-security-升级已弃用的-websecurityconfigureradapter" tabindex="-1"><a class="header-anchor" href="#spring-security-升级已弃用的-websecurityconfigureradapter"><span>Spring Security：升级已弃用的 WebSecurityConfigurerAdapter</span></a></h1><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>如果你正在处理 Spring Security（特别是 OAuth）实现，一定要看看《Learn Spring Security》课程：</p><p><strong>&gt;</strong> <strong>学习 Spring</strong> <strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Spring Security 允许通过扩展 <em>WebSecurityConfigurerAdapter</em> 类来自定义 HTTP 安全，例如端点授权或认证管理器配置。然而，在最近的版本中，Spring 弃用了这种方法，并鼓励使用基于组件的安全配置。</p><p>在本教程中，我们将学习如何在 Spring Boot 应用程序中替换这种弃用，并运行一些 MVC 测试。</p><p><strong>我们通常看到 Spring HTTP 安全配置类扩展了 <em>WebSecurityConfigureAdapter</em> 类。</strong></p><p>然而，从版本 5.7.0-M2 开始，Spring 弃用了 <em>WebSecurityConfigureAdapter</em> 的使用，并建议创建不包含它的配置。</p><p>让我们创建一个使用内存认证的示例 Spring Boot 应用程序来展示这种新类型的配置。</p><p>首先，我们将定义我们的配置类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {
    
    // 配置
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将添加方法安全注解以启用基于不同角色的处理。</p><h3 id="_2-1-配置认证" tabindex="-1"><a class="header-anchor" href="#_2-1-配置认证"><span>2.1. 配置认证</span></a></h3><p>使用 <em>WebSecurityConfigureAdapter,</em> 我们将使用 <em>AuthenticationManagerBuilder</em> 来设置我们的认证上下文。</p><p><strong>现在，如果我们想避免弃用，我们可以定义一个 <em>UserDetailsManager</em> 或 <em>UserDetailsService</em> 组件：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public UserDetailsService userDetailsService(BCryptPasswordEncoder bCryptPasswordEncoder) {
    InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
    manager.createUser(User.withUsername(&quot;user&quot;)
      .password(bCryptPasswordEncoder.encode(&quot;userPass&quot;))
      .roles(&quot;USER&quot;)
      .build());
    manager.createUser(User.withUsername(&quot;admin&quot;)
      .password(bCryptPasswordEncoder.encode(&quot;adminPass&quot;))
      .roles(&quot;USER&quot;, &quot;ADMIN&quot;)
      .build());
    return manager;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，鉴于我们的 <em>UserDetailService</em>，我们甚至可以设置一个 <em>AuthenticationManager</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, UserDetailService userDetailService)
  throws Exception {
    return http.getSharedObject(AuthenticationManagerBuilder.class)
      .userDetailsService(userDetailsService)
      .passwordEncoder(bCryptPasswordEncoder)
      .and()
      .build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，如果我们使用 JDBC 或 LDAP 认证，这也将起作用。</p><h3 id="_2-2-配置-http-安全" tabindex="-1"><a class="header-anchor" href="#_2-2-配置-http-安全"><span>2.2. 配置 HTTP 安全</span></a></h3><p><strong>更重要的是，如果我们想避免 HTTP 安全的弃用，我们可以创建一个 <em>SecurityFilterChain</em> bean。</strong></p><p>例如，假设我们想要根据角色保护端点，并只留下一个匿名登录入口。我们还将限制任何删除请求只能由管理员角色执行。我们将使用基本认证：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
      .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -&gt;
              authorizationManagerRequestMatcherRegistry.requestMatchers(HttpMethod.DELETE).hasRole(&quot;ADMIN&quot;)
                      .requestMatchers(&quot;/admin/**&quot;).hasAnyRole(&quot;ADMIN&quot;)
                      .requestMatchers(&quot;/user/**&quot;).hasAnyRole(&quot;USER&quot;, &quot;ADMIN&quot;)
                      .requestMatchers(&quot;/login/**&quot;).permitAll()
                      .anyRequest().authenticated())
      .httpBasic(Customizer.withDefaults())
      .sessionManagement(httpSecuritySessionManagementConfigurer -&gt;
              httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>HTTP 安全将构建一个 <em>DefaultSecurityFilterChain</em> 对象来加载请求匹配器和过滤器。</strong></p><h3 id="_2-3-配置-web-安全" tabindex="-1"><a class="header-anchor" href="#_2-3-配置-web-安全"><span>2.3. 配置 Web 安全</span></a></h3><p>对于 Web 安全，我们现在可以使用回调接口 <em>WebSecurityCustomizer.</em></p><p>我们将添加一个调试级别并忽略一些路径，如图片或脚本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean
public WebSecurityCustomizer webSecurityCustomizer() {
    return web -&gt; web.debug(securityDebug).ignoring().requestMatchers(&quot;/css/**&quot;, &quot;/js/**&quot;, &quot;/img/**&quot;, &quot;/lib/**&quot;, &quot;/favicon.ico&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-端点控制器" tabindex="-1"><a class="header-anchor" href="#_3-端点控制器"><span>3. 端点控制器</span></a></h2><p>现在我们将定义一个简单的 REST 控制器类为我们的应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestController
public class ResourceController {
    @GetMapping(&quot;/login&quot;)
    public String loginEndpoint() {
        return &quot;登录!&quot;;
    }

    @GetMapping(&quot;/admin&quot;)
    public String adminEndpoint() {
        return &quot;管理员!&quot;;
    }

    @GetMapping(&quot;/user&quot;)
    public String userEndpoint() {
        return &quot;用户!&quot;;
    }

    @GetMapping(&quot;/all&quot;)
    public String allRolesEndpoint() {
        return &quot;所有角色!&quot;;
    }

    @DeleteMapping(&quot;/delete&quot;)
    public String deleteEndpoint(@RequestBody String s) {
        return &quot;我正在删除 &quot; + s;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们之前在定义 HTTP 安全时提到的，我们将添加一个通用的 <em>/login</em> 端点，任何人都可以访问，特定的管理员和用户端点，以及一个 <em>/all</em> 端点，不由角色保护，但仍然需要认证。</p><h2 id="_4-测试端点" tabindex="-1"><a class="header-anchor" href="#_4-测试端点"><span>4. 测试端点</span></a></h2><p>让我们将我们的新配置添加到使用 MVC 模拟的 Spring Boot 测试中，以测试我们的端点。</p><h3 id="_4-1-测试匿名用户" tabindex="-1"><a class="header-anchor" href="#_4-1-测试匿名用户"><span>4.1. 测试匿名用户</span></a></h3><p>匿名用户可以访问 <em>/login</em> 端点。如果他们尝试访问其他内容，他们将被拒绝授权（<em>401</em>）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@WithAnonymousUser
public void whenAnonymousAccessLogin_thenOk() throws Exception {
    mvc.perform(get(&quot;/login&quot;))
      .andExpect(status().isOk());
}

@Test
@WithAnonymousUser
public void whenAnonymousAccessRestrictedEndpoint_thenIsUnauthorized() throws Exception {
    mvc.perform(get(&quot;/all&quot;))
      .andExpect(status().isUnauthorized());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，除了 <em>/login</em> 端点之外，我们总是需要认证，就像 <em>/all</em> 端点一样。</p><h3 id="_4-2-测试用户角色" tabindex="-1"><a class="header-anchor" href="#_4-2-测试用户角色"><span>4.2. 测试用户角色</span></a></h3><p>用户角色可以访问通用端点和我们为这个角色授予的所有其他路径：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@WithUserDetails()
public void whenUserAccessUserSecuredEndpoint_thenOk() throws Exception {
    mvc.perform(get(&quot;/user&quot;))
      .andExpect(status().isOk());
}

@Test
@WithUserDetails()
public void whenUserAccessRestrictedEndpoint_thenOk() throws Exception {
    mvc.perform(get(&quot;/all&quot;))
      .andExpect(status().isOk());
}

@Test
@WithUserDetails()
public void whenUserAccessAdminSecuredEndpoint_thenIsForbidden() throws Exception {
    mvc.perform(get(&quot;/admin&quot;))
      .andExpect(status().isForbidden());
}

@Test
@WithUserDetails()
public void whenUserAccessDeleteSecuredEndpoint_thenIsForbidden() throws Exception {
    mvc.perform(delete(&quot;/delete&quot;))
      .andExpect(status().isForbidden());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，如果用户角色尝试访问管理员保护的端点，用户将获得一个“禁止”（<em>403</em>）错误。</p><p>相反，像前面示例中的匿名用户一样，没有凭据的人将获得一个“未授权”错误（<em>401</em>）。</p><h3 id="_4-3-测试管理员角色" tabindex="-1"><a class="header-anchor" href="#_4-3-测试管理员角色"><span>4.3. 测试管理员角色</span></a></h3><p>正如我们所看到的，拥有管理员角色的人可以访问任何端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
@WithUserDetails(value = &quot;admin&quot;)
public void whenAdminAccessUserEndpoint_thenOk() throws Exception {
    mvc.perform(get(&quot;/user&quot;))
      .andExpect(status().isOk());
}

@Test
@WithUserDetails(value = &quot;admin&quot;)
public void whenAdminAccessAdminSecuredEndpoint_thenIsOk() throws Exception {
    mvc.perform(get(&quot;/admin&quot;))
      .andExpect(status().isOk());
}

@Test
@WithUserDetails(value = &quot;admin&quot;)
public void whenAdminAccessDeleteSecuredEndpoint_thenIsOk() throws Exception {
    mvc.perform(delete(&quot;/delete&quot;).content(&quot;{}&quot;))
      .andExpect(status().isOk());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何创建一个不使用 <em>WebSecurityConfigureAdapter</em> 的 Spring Security 配置，并在创建认证、HTTP 安全和 Web 安全组件时替换它。</p><p>一如既往，我们可以在 GitHub 上找到工作的代码示例。</p>`,51),a=[s];function d(l,u){return n(),i("div",null,a)}const v=e(r,[["render",d],["__file","2024-07-16-Spring Security  Upgrading the Deprecated WebSecurityConfigurerAdapter.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-16/2024-07-16-Spring%20Security%20%20Upgrading%20the%20Deprecated%20WebSecurityConfigurerAdapter.html","title":"Spring Security：升级已弃用的 WebSecurityConfigurerAdapter","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","OAuth"],"tag":["Spring Boot","MVC","Security"],"head":[["meta",{"name":"keywords","content":"Spring Security, WebSecurityConfigurerAdapter, Spring Boot, MVC, Security"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-16/2024-07-16-Spring%20Security%20%20Upgrading%20the%20Deprecated%20WebSecurityConfigurerAdapter.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Security：升级已弃用的 WebSecurityConfigurerAdapter"}],["meta",{"property":"og:description","content":"Spring Security：升级已弃用的 WebSecurityConfigurerAdapter imgimg 如果你正在处理 Spring Security（特别是 OAuth）实现，一定要看看《Learn Spring Security》课程： > 学习 Spring 安全 1. 概述 Spring Security 允许通过扩展 WebSe..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T19:07:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"MVC"}],["meta",{"property":"article:tag","content":"Security"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T19:07:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Security：升级已弃用的 WebSecurityConfigurerAdapter\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-16T19:07:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Security：升级已弃用的 WebSecurityConfigurerAdapter imgimg 如果你正在处理 Spring Security（特别是 OAuth）实现，一定要看看《Learn Spring Security》课程： > 学习 Spring 安全 1. 概述 Spring Security 允许通过扩展 WebSe..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. 配置认证","slug":"_2-1-配置认证","link":"#_2-1-配置认证","children":[]},{"level":3,"title":"2.2. 配置 HTTP 安全","slug":"_2-2-配置-http-安全","link":"#_2-2-配置-http-安全","children":[]},{"level":3,"title":"2.3. 配置 Web 安全","slug":"_2-3-配置-web-安全","link":"#_2-3-配置-web-安全","children":[]}]},{"level":2,"title":"3. 端点控制器","slug":"_3-端点控制器","link":"#_3-端点控制器","children":[]},{"level":2,"title":"4. 测试端点","slug":"_4-测试端点","link":"#_4-测试端点","children":[{"level":3,"title":"4.1. 测试匿名用户","slug":"_4-1-测试匿名用户","link":"#_4-1-测试匿名用户","children":[]},{"level":3,"title":"4.2. 测试用户角色","slug":"_4-2-测试用户角色","link":"#_4-2-测试用户角色","children":[]},{"level":3,"title":"4.3. 测试管理员角色","slug":"_4-3-测试管理员角色","link":"#_4-3-测试管理员角色","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721156863000,"updatedTime":1721156863000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.12,"words":1235},"filePathRelative":"posts/baeldung/2024-07-16/2024-07-16-Spring Security  Upgrading the Deprecated WebSecurityConfigurerAdapter.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Spring Security：升级已弃用的 WebSecurityConfigurerAdapter</h1>\\n<figure><img src=\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>\\n<p>如果你正在处理 Spring Security（特别是 OAuth）实现，一定要看看《Learn Spring Security》课程：</p>","autoDesc":true}');export{v as comp,p as data};
