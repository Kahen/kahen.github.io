import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as t,a as n}from"./app-BMOUrRO4.js";const r={},a=n('<h1 id="将应用程序从spring-security-5迁移到spring-security-6-spring-boot-3-baeldung" tabindex="-1"><a class="header-anchor" href="#将应用程序从spring-security-5迁移到spring-security-6-spring-boot-3-baeldung"><span>将应用程序从Spring Security 5迁移到Spring Security 6/Spring Boot 3 | Baeldung</span></a></h1><p>Spring Security 6带来了几个重大变化，包括移除类、弃用方法以及引入新方法。</p><p>从Spring Security 5迁移到Spring Security 6可以逐步进行，不会破坏现有的代码库。此外，我们可以使用第三方插件如OpenRewrite来促进迁移到最新版本。</p><p>在本教程中，我们将学习如何将使用Spring Security 5的现有应用程序迁移到Spring Security 6。我们将替换弃用的方法，并利用lambda DSL简化配置。此外，我们将利用OpenRewrite使迁移更快。</p><p>Spring Boot基于Spring框架，Spring Boot的版本使用Spring框架的最新版本。Spring Boot 2默认使用Spring Security 5，而Spring Boot 3使用Spring Security 6。</p><p>要在Spring Boot应用程序中使用Spring Security，我们总是向pom.xml添加spring-boot-starter-security依赖。</p><p><strong>然而，我们可以通过在pom.xml的properties部分指定所需的版本来覆盖默认的Spring Security版本</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;properties&gt;`\n    `&lt;spring-security.version&gt;`5.8.9`&lt;/spring-security.version&gt;`\n`&lt;/properties&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们指定我们的项目使用Spring Security 5.8.9，覆盖了默认版本。</p><p>值得注意的是，我们也可以通过在properties部分覆盖默认版本，在Spring Boot 2中使用Spring Security 6。</p><p>Spring Security 6引入了几个功能更新，以提高安全性和健壮性。它现在至少需要Java版本17，并使用jakarta命名空间。</p><p><strong>一个主要的变化是移除了WebSecurityConfigurerAdapter，转而采用基于组件的安全配置</strong>。</p><p>此外，authorizeRequests()被移除并被authorizeHttpRequests()取代，以定义授权规则。</p><p><strong>此外，它引入了requestMatcher()和securityMatcher()方法来替换antMatcher()和mvcMatcher()，用于配置请求资源的安全</strong>。requestMatcher()方法更安全，因为它为请求配置选择了适当的RequestMatcher实现。</p><p>其他弃用的方法如cors()和csrf()现在有了功能性风格的替代品。</p><p>要开始，让我们通过向pom.xml添加spring-boot-starter-web和spring-boot-starter-security来启动一个Spring Boot 2.7.5项目：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.boot````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-boot-starter-web````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````2.7.5````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.boot````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-boot-starter-security````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````2.7.5````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>spring-boot-starter-security依赖使用Spring Security 5。</p><p>接下来，让我们创建一个名为WebSecurityConfig的类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@EnableWebSecurity\n@EnableGlobalMethodSecurity(prePostEnabled = true)\nclass WebSecurityConfig extends WebSecurityConfigurerAdapter {\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们用@EnableWebSecurity注解类以启动配置web请求安全的进程。我们还启用了方法级别的授权。接下来，类扩展了WebSecurityConfigurerAdapter类以提供各种安全配置方法。</p><p>此外，让我们通过覆盖默认配置来定义一个内存中的用户进行身份验证：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override\nvoid configure(AuthenticationManagerBuilder auth) throws Exception {\n    UserDetails user = User.withDefaultPasswordEncoder()\n      .username(&quot;Admin&quot;)\n      .password(&quot;password&quot;)\n      .roles(&quot;ADMIN&quot;)\n      .build();\n    auth.inMemoryAuthentication().withUser(user);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的方法中，我们通过覆盖默认配置创建了一个内存中的用户。</p><p>继续，让我们通过覆盖configure(WebSecurity web)方法从安全中排除静态资源：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override\nvoid configure(WebSecurity web) {\n    web.ignoring().antMatchers(&quot;/js/**&quot;, &quot;/css/**&quot;);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们通过覆盖configure(HttpSecurity http)方法来创建HttpSecurity：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override\nvoid configure(HttpSecurity http) throws Exception {\n    http\n      .authorizeRequests()\n      .antMatchers(&quot;/&quot;).permitAll()\n      .anyRequest().authenticated()\n      .and()\n      .formLogin()\n      .and()\n      .httpBasic();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，此设置展示了典型的Spring Security 5配置。在接下来的部分中，我们将将此代码迁移到Spring Security 6。</p><p>Spring推荐逐步迁移方法，以防止在更新到Spring Security 6时破坏现有代码。<strong>在升级到Spring Security 6之前，我们可以先升级我们的Spring Boot应用程序到Spring Security 5.8.5并更新代码以使用新功能</strong>。迁移到5.8.5为我们准备版本6中的预期变化。</p><p>在逐步迁移过程中，我们的IDE可以警告我们弃用的功能。这有助于逐步更新过程。</p><p>为了简单起见，让我们直接将示例项目迁移到Spring Security 6，通过更新应用程序使用Spring Boot版本3.2.2。在应用程序使用Spring Boot版本2的情况下，我们可以在properties部分指定Spring Security 6。</p><p>要开始迁移过程，让我们修改pom.xml以使用最新的Spring Boot版本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.boot````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-boot-starter-web````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````3.2.2````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n\n````&lt;dependency&gt;````\n    ````&lt;groupId&gt;````org.springframework.boot````&lt;/groupId&gt;````\n    ````&lt;artifactId&gt;````spring-boot-starter-security````&lt;/artifactId&gt;````\n    ````&lt;version&gt;````3.2.2````&lt;/version&gt;````\n````&lt;/dependency&gt;````\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在最初的设置中，我们使用Spring Boot 2.7.5，它在幕后使用Spring Security 5。</p><p>值得注意的是，Spring Boot 3的最低Java版本是Java 17。</p><p>在随后的小节中，我们将重构现有代码以使用Spring Security 6。</p><h3 id="_5-1-configuration注解" tabindex="-1"><a class="header-anchor" href="#_5-1-configuration注解"><span>5.1. @Configuration注解</span></a></h3><p>在Spring Security 6之前，@Configuration注解是@EnableWebSecurity的一部分，但随着最新更新，我们必须用@Configuration注解我们的安全配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration\n@EnableWebSecurity\n@EnableMethodSecurity\npublic class WebSecurityConfig extends WebSecurityConfigurerAdapter {\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这里，我们向现有代码库引入了@Configuration注解，因为它不再是@EnableWebSecurity注解的一部分</strong>。此外，该注解也不再是@EnableMethodSecurity、@EnableWebFluxSecurity或@EnableGlobalMethodSecurity注解的一部分。</p><p><strong>另外，@EnableGlobalMethodSecurity被标记为弃用，并被@EnableMethodSecurity取代</strong>。默认情况下，它启用了Spring的预后注解。因此，我们引入了@EnableMethodSecurity以在方法级别提供授权。</p><h3 id="_5-2-websecurityconfigureradapter" tabindex="-1"><a class="header-anchor" href="#_5-2-websecurityconfigureradapter"><span>5.2. WebSecurityConfigurerAdapter</span></a></h3><p>最新更新移除了WebSecurityConfigurerAdapter类，并采用了基于组件的配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Configuration\n@EnableWebSecurity\npublic class WebSecurityConfig {\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们移除了WebSecurityConfigurerAdapter，这消除了覆盖安全配置方法的需求。<strong>相反，我们可以为安全配置注册一个bean</strong>。我们可以注册WebSecurityCustomizer bean来配置web安全，注册SecurityFilterChain bean来配置HTTP安全，注册InMemoryUserDetails bean来注册自定义用户等。</p><h3 id="_5-3-websecuritycustomizer-bean" tabindex="-1"><a class="header-anchor" href="#_5-3-websecuritycustomizer-bean"><span>5.3. WebSecurityCustomizer Bean</span></a></h3><p>让我们通过发布WebSecurityCustomizer bean来修改排除静态资源的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\nWebSecurityCustomizer webSecurityCustomizer() {\n   return (web) -&gt; web.ignoring().requestMatchers(&quot;/js/**&quot;, &quot;/css/**&quot;);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>WebSecurityCustomizer接口取代了WebSecurityConfigurerAdapter接口中的configure(Websecurity web)。</p><h3 id="_5-4-authenticationmanager-bean" tabindex="-1"><a class="header-anchor" href="#_5-4-authenticationmanager-bean"><span>5.4. AuthenticationManager Bean</span></a></h3><p>在早期部分中，我们通过覆盖WebSecurityConfigurerAdapter中的configure(AuthenticationManagerBuilder auth)来创建内存中的用户。</p><p>让我们通过注册InMemoryUserDetailsManager bean来重构认证凭据逻辑：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\nInMemoryUserDetailsManager userDetailsService() {\n    UserDetails user = User.withDefaultPasswordEncoder()\n      .username(&quot;Admin&quot;)\n      .password(&quot;admin&quot;)\n      .roles(&quot;USER&quot;)\n      .build();\n\n    return new InMemoryUserDetailsManager(user);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了一个具有USER角色的内存中的用户，以提供基于角色的授权。</p><h3 id="_5-5-http安全配置" tabindex="-1"><a class="header-anchor" href="#_5-5-http安全配置"><span>5.5. HTTP安全配置</span></a></h3><p>在以前的Spring Security版本中，我们通过覆盖WebSecurityConfigurer类中的configure方法来配置HttpSecurity。由于在最新版本中被移除，让我们为HTTP安全配置注册SecurityFilterChain bean：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Bean\nSecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n    http\n      .authorizeHttpRequests(\n          request -&gt;\n            request\n              .requestMatchers(&quot;/&quot;).permitAll()\n              .anyRequest().authenticated()\n      )\n      .formLogin(Customizer.withDefaults())\n      .httpBasic(Customizer.withDefaults());\n   return http.build();\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们用authorizeHttpRequests()替换了authorizeRequest()方法。新方法使用了AuthorizationManager API，这简化了重用和定制。</p><p>此外，它通过延迟认证查找来提高性能。只有当请求需要授权时，才会进行认证查找。</p><p>当我们没有自定义规则时，我们使用Customizer.withDefaults()方法使用默认配置。</p><p>此外，我们使用requestMatchers()而不是antMatcher()或mvcMatcher()来保护资源。</p><h3 id="_5-6-requestcache" tabindex="-1"><a class="header-anchor" href="#_5-6-requestcache"><span>5.6. RequestCache</span></a></h3><p>请求缓存有助于在用户需要认证并重定向用户到请求时保存</p>',64),s=[a];function l(d,u){return t(),i("div",null,s)}const p=e(r,[["render",l],["__file","2024-06-21-Migrate Application from Spring Security 5 to Spring Security 6 Spring Boot 3.html.vue"]]),g=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Migrate%20Application%20from%20Spring%20Security%205%20to%20Spring%20Security%206%20Spring%20Boot%203.html","title":"将应用程序从Spring Security 5迁移到Spring Security 6/Spring Boot 3 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Spring Security","Spring Boot"],"tag":["迁移","安全"],"head":[["meta",{"name":"keywords","content":"Spring Security 5, Spring Security 6, Spring Boot 3, 迁移指南"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Migrate%20Application%20from%20Spring%20Security%205%20to%20Spring%20Security%206%20Spring%20Boot%203.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将应用程序从Spring Security 5迁移到Spring Security 6/Spring Boot 3 | Baeldung"}],["meta",{"property":"og:description","content":"将应用程序从Spring Security 5迁移到Spring Security 6/Spring Boot 3 | Baeldung Spring Security 6带来了几个重大变化，包括移除类、弃用方法以及引入新方法。 从Spring Security 5迁移到Spring Security 6可以逐步进行，不会破坏现有的代码库。此外，我们可..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T13:30:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"迁移"}],["meta",{"property":"article:tag","content":"安全"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T13:30:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将应用程序从Spring Security 5迁移到Spring Security 6/Spring Boot 3 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T13:30:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将应用程序从Spring Security 5迁移到Spring Security 6/Spring Boot 3 | Baeldung Spring Security 6带来了几个重大变化，包括移除类、弃用方法以及引入新方法。 从Spring Security 5迁移到Spring Security 6可以逐步进行，不会破坏现有的代码库。此外，我们可..."},"headers":[{"level":3,"title":"5.1. @Configuration注解","slug":"_5-1-configuration注解","link":"#_5-1-configuration注解","children":[]},{"level":3,"title":"5.2. WebSecurityConfigurerAdapter","slug":"_5-2-websecurityconfigureradapter","link":"#_5-2-websecurityconfigureradapter","children":[]},{"level":3,"title":"5.3. WebSecurityCustomizer Bean","slug":"_5-3-websecuritycustomizer-bean","link":"#_5-3-websecuritycustomizer-bean","children":[]},{"level":3,"title":"5.4. AuthenticationManager Bean","slug":"_5-4-authenticationmanager-bean","link":"#_5-4-authenticationmanager-bean","children":[]},{"level":3,"title":"5.5. HTTP安全配置","slug":"_5-5-http安全配置","link":"#_5-5-http安全配置","children":[]},{"level":3,"title":"5.6. RequestCache","slug":"_5-6-requestcache","link":"#_5-6-requestcache","children":[]}],"git":{"createdTime":1718976640000,"updatedTime":1718976640000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.85,"words":1755},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Migrate Application from Spring Security 5 to Spring Security 6 Spring Boot 3.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>Spring Security 6带来了几个重大变化，包括移除类、弃用方法以及引入新方法。</p>\\n<p>从Spring Security 5迁移到Spring Security 6可以逐步进行，不会破坏现有的代码库。此外，我们可以使用第三方插件如OpenRewrite来促进迁移到最新版本。</p>\\n<p>在本教程中，我们将学习如何将使用Spring Security 5的现有应用程序迁移到Spring Security 6。我们将替换弃用的方法，并利用lambda DSL简化配置。此外，我们将利用OpenRewrite使迁移更快。</p>\\n<p>Spring Boot基于Spring框架，Spring Boot的版本使用Spring框架的最新版本。Spring Boot 2默认使用Spring Security 5，而Spring Boot 3使用Spring Security 6。</p>","autoDesc":true}');export{p as comp,g as data};
