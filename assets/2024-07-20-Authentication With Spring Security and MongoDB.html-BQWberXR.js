import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-BvjIfnnU.js";const s={},r=t(`<hr><h1 id="使用spring-security和mongodb进行认证" tabindex="-1"><a class="header-anchor" href="#使用spring-security和mongodb进行认证"><span>使用Spring Security和MongoDB进行认证</span></a></h1><p>如果你正在开发一个Spring Security（特别是OAuth）实现，一定要看看《学习Spring Security》课程： <strong>&gt;&gt; 学习Spring</strong><strong>安全</strong></p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>Spring Security提供了不同的认证系统，例如通过数据库和_UserDetailService_进行认证。</p><p>除了使用JPA持久层，我们可能还想使用例如MongoDB仓库。在本教程中，我们将看到如何使用Spring Security和MongoDB进行用户认证。</p><p><strong>类似于使用JPA仓库，我们可以使用MongoDB仓库。</strong> 但是，我们需要设置不同的配置才能使用它。</p><h3 id="_2-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-maven依赖"><span>2.1. Maven依赖</span></a></h3><p><strong>对于本教程，我们将使用嵌入式MongoDB。</strong> 然而，MongoDB实例和_Testcontainer_可能是生产环境的有效选项。首先，让我们添加_spring-boot-starter-data-mongodb_和_de.flapdoodle.embed.mongo.spring30x_依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
   \`\`&lt;groupId&gt;\`\`org.springframework.boot\`\`&lt;/groupId&gt;\`\`
   \`\`&lt;artifactId&gt;\`\`spring-boot-starter-data-mongodb\`\`&lt;/artifactId&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`de.flapdoodle.embed\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`de.flapdoodle.embed.mongo.spring30x\`\`&lt;/artifactId&gt;\`\`
    \`&lt;version&gt;\`4.11.0\`&lt;/version&gt;\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-配置" tabindex="-1"><a class="header-anchor" href="#_2-2-配置"><span>2.2. 配置</span></a></h3><p>一旦我们设置了依赖，我们需要配置我们的_AuthenticationManager_，例如使用HTTP基本认证：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

    //....
    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public AuthenticationManager customAuthenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailsService)
            .passwordEncoder(bCryptPasswordEncoder());
        return authenticationManagerBuilder.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(Customizer.withDefaults())
            .httpBasic(Customizer.withDefaults())
            .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -&gt; authorizationManagerRequestMatcherRegistry.anyRequest().permitAll())
            .sessionManagement(httpSecuritySessionManagementConfigurer -&gt; httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-用户域和仓库" tabindex="-1"><a class="header-anchor" href="#_2-3-用户域和仓库"><span>2.3. 用户域和仓库</span></a></h3><p>首先，让我们定义一个简单的用户角色，用于我们的认证。我们将让它实现_UserDetails_接口，以重用_Principal_对象的公共方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Document
public class User implements UserDetails {
    private @MongoId ObjectId id;
    private String username;
    private String password;
    private Set\`&lt;UserRole&gt;\` userRoles;
    // getters and setters
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们有了用户，让我们定义一个简单的仓库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface UserRepository extends MongoRepository\`&lt;User, String&gt;\` {

    @Query(&quot;{username:&#39;?0&#39;}&quot;)
    User findUserByUsername(String username);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-认证服务" tabindex="-1"><a class="header-anchor" href="#_2-4-认证服务"><span>2.4. 认证服务</span></a></h3><p><strong>最后，让我们实现我们的_UserDetailService_，以便检索用户并检查它是否已认证</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Service
public class MongoAuthUserDetailService implements UserDetailsService {
    // ...
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        com.baeldung.mongoauth.domain.User user = userRepository.findUserByUsername(userName);

        Set\`&lt;GrantedAuthority&gt;\` grantedAuthorities = new HashSet&lt;&gt;();
        user.getAuthorities()
          .forEach(role -&gt; grantedAuthorities.add(new SimpleGrantedAuthority(role.getRole().getName())));

        return new User(user.getUsername(), user.getPassword(), grantedAuthorities);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-测试认证" tabindex="-1"><a class="header-anchor" href="#_2-5-测试认证"><span>2.5. 测试认证</span></a></h3><p>为了测试我们的应用程序，让我们定义一个简单的控制器。作为一个例子，我们已经定义了两种不同的角色，以测试特定端点的认证和授权：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RestController
public class ResourceController {

    @RolesAllowed(&quot;ROLE_ADMIN&quot;)
    @GetMapping(&quot;/admin&quot;)
    public String admin() {
        return &quot;Hello Admin!&quot;;
    }

    @RolesAllowed({ &quot;ROLE_ADMIN&quot;, &quot;ROLE_USER&quot; })
    @GetMapping(&quot;/user&quot;)
    public String user() {
        return &quot;Hello User!&quot;;
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们将所有内容都包装在一个Spring Boot测试中，以检查我们的认证是否有效。正如我们所看到的，<strong>我们期望为提供无效凭据或在我们系统中不存在的人提供401代码</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class MongoAuthApplicationTest {

    // set up

    @Test
    void givenUserCredentials_whenInvokeUserAuthorizedEndPoint_thenReturn200() throws Exception {
        mvc.perform(get(&quot;/user&quot;).with(httpBasic(USER_NAME, PASSWORD)))
          .andExpect(status().isOk());
    }

    @Test
    void givenUserNotExists_whenInvokeEndPoint_thenReturn401() throws Exception {
        mvc.perform(get(&quot;/user&quot;).with(httpBasic(&quot;not_existing_user&quot;, &quot;password&quot;)))
          .andExpect(status().isUnauthorized());
    }

    @Test
    void givenUserExistsAndWrongPassword_whenInvokeEndPoint_thenReturn401() throws Exception {
        mvc.perform(get(&quot;/user&quot;).with(httpBasic(USER_NAME, &quot;wrong_password&quot;)))
          .andExpect(status().isUnauthorized());
    }

    @Test
    void givenUserCredentials_whenInvokeAdminAuthorizedEndPoint_thenReturn403() throws Exception {
        mvc.perform(get(&quot;/admin&quot;).with(httpBasic(USER_NAME, PASSWORD)))
          .andExpect(status().isForbidden());
    }

    @Test
    void givenAdminCredentials_whenInvokeAdminAuthorizedEndPoint_thenReturn200() throws Exception {
        mvc.perform(get(&quot;/admin&quot;).with(httpBasic(ADMIN_NAME, PASSWORD)))
          .andExpect(status().isOk());

        mvc.perform(get(&quot;/user&quot;).with(httpBasic(ADMIN_NAME, PASSWORD)))
          .andExpect(status().isOk());
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-结论" tabindex="-1"><a class="header-anchor" href="#_3-结论"><span>3. 结论</span></a></h2><p>在本文中，我们探讨了使用Spring Security进行MongoDB认证。</p><p>我们已经看到了如何创建一个工作配置并实现我们的自定义_UserDetailService_。我们还看到了如何模拟MVC上下文并测试认证和授权。</p><p>一如既往，这些示例的代码可以在GitHub上找到。</p>`,30),a=[r];function d(l,o){return i(),n("div",null,a)}const v=e(s,[["render",d],["__file","2024-07-20-Authentication With Spring Security and MongoDB.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Authentication%20With%20Spring%20Security%20and%20MongoDB.html","title":"使用Spring Security和MongoDB进行认证","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Spring Security","MongoDB"],"tag":["Authentication","Spring Boot"],"head":[["meta",{"name":"keywords","content":"Spring Security, MongoDB, Authentication"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Authentication%20With%20Spring%20Security%20and%20MongoDB.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Spring Security和MongoDB进行认证"}],["meta",{"property":"og:description","content":"使用Spring Security和MongoDB进行认证 如果你正在开发一个Spring Security（特别是OAuth）实现，一定要看看《学习Spring Security》课程： >> 学习Spring 安全 1. 概述 Spring Security提供了不同的认证系统，例如通过数据库和_UserDetailService_进行认证。 除了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T23:39:03.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Authentication"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T23:39:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Spring Security和MongoDB进行认证\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T23:39:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Spring Security和MongoDB进行认证 如果你正在开发一个Spring Security（特别是OAuth）实现，一定要看看《学习Spring Security》课程： >> 学习Spring 安全 1. 概述 Spring Security提供了不同的认证系统，例如通过数据库和_UserDetailService_进行认证。 除了..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[{"level":3,"title":"2.1. Maven依赖","slug":"_2-1-maven依赖","link":"#_2-1-maven依赖","children":[]},{"level":3,"title":"2.2. 配置","slug":"_2-2-配置","link":"#_2-2-配置","children":[]},{"level":3,"title":"2.3. 用户域和仓库","slug":"_2-3-用户域和仓库","link":"#_2-3-用户域和仓库","children":[]},{"level":3,"title":"2.4. 认证服务","slug":"_2-4-认证服务","link":"#_2-4-认证服务","children":[]},{"level":3,"title":"2.5. 测试认证","slug":"_2-5-测试认证","link":"#_2-5-测试认证","children":[]}]},{"level":2,"title":"3. 结论","slug":"_3-结论","link":"#_3-结论","children":[]}],"git":{"createdTime":1721518743000,"updatedTime":1721518743000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.86,"words":857},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Authentication With Spring Security and MongoDB.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>使用Spring Security和MongoDB进行认证</h1>\\n<p>如果你正在开发一个Spring Security（特别是OAuth）实现，一定要看看《学习Spring Security》课程：\\n<strong>&gt;&gt; 学习Spring</strong>\\n<strong>安全</strong></p>\\n<h2>1. 概述</h2>\\n<p>Spring Security提供了不同的认证系统，例如通过数据库和_UserDetailService_进行认证。</p>\\n<p>除了使用JPA持久层，我们可能还想使用例如MongoDB仓库。在本教程中，我们将看到如何使用Spring Security和MongoDB进行用户认证。</p>","autoDesc":true}');export{v as comp,m as data};
