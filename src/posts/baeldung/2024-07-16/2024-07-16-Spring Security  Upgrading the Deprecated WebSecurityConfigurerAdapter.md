---
date: 2022-04-01
category:
  - Spring Security
  - OAuth
tag:
  - Spring Boot
  - MVC
  - Security
head:
  - - meta
    - name: keywords
      content: Spring Security, WebSecurityConfigurerAdapter, Spring Boot, MVC, Security
------
# Spring Security：升级已弃用的 WebSecurityConfigurerAdapter

![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)

如果你正在处理 Spring Security（特别是 OAuth）实现，一定要看看《Learn Spring Security》课程：

**>** **学习 Spring** **安全**

## 1. 概述

Spring Security 允许通过扩展 _WebSecurityConfigurerAdapter_ 类来自定义 HTTP 安全，例如端点授权或认证管理器配置。然而，在最近的版本中，Spring 弃用了这种方法，并鼓励使用基于组件的安全配置。

在本教程中，我们将学习如何在 Spring Boot 应用程序中替换这种弃用，并运行一些 MVC 测试。

**我们通常看到 Spring HTTP 安全配置类扩展了 _WebSecurityConfigureAdapter_ 类。**

然而，从版本 5.7.0-M2 开始，Spring 弃用了 _WebSecurityConfigureAdapter_ 的使用，并建议创建不包含它的配置。

让我们创建一个使用内存认证的示例 Spring Boot 应用程序来展示这种新类型的配置。

首先，我们将定义我们的配置类：

```
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {
    
    // 配置
}
```

我们将添加方法安全注解以启用基于不同角色的处理。

### 2.1. 配置认证

使用 _WebSecurityConfigureAdapter,_ 我们将使用 _AuthenticationManagerBuilder_ 来设置我们的认证上下文。

**现在，如果我们想避免弃用，我们可以定义一个 _UserDetailsManager_ 或 _UserDetailsService_ 组件：**

```
@Bean
public UserDetailsService userDetailsService(BCryptPasswordEncoder bCryptPasswordEncoder) {
    InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
    manager.createUser(User.withUsername("user")
      .password(bCryptPasswordEncoder.encode("userPass"))
      .roles("USER")
      .build());
    manager.createUser(User.withUsername("admin")
      .password(bCryptPasswordEncoder.encode("adminPass"))
      .roles("USER", "ADMIN")
      .build());
    return manager;
}
```

或者，鉴于我们的 _UserDetailService_，我们甚至可以设置一个 _AuthenticationManager_：

```
@Bean
public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, UserDetailService userDetailService)
  throws Exception {
    return http.getSharedObject(AuthenticationManagerBuilder.class)
      .userDetailsService(userDetailsService)
      .passwordEncoder(bCryptPasswordEncoder)
      .and()
      .build();
}
```

同样，如果我们使用 JDBC 或 LDAP 认证，这也将起作用。

### 2.2. 配置 HTTP 安全

**更重要的是，如果我们想避免 HTTP 安全的弃用，我们可以创建一个 _SecurityFilterChain_ bean。**

例如，假设我们想要根据角色保护端点，并只留下一个匿名登录入口。我们还将限制任何删除请求只能由管理员角色执行。我们将使用基本认证：

```
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
      .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
              authorizationManagerRequestMatcherRegistry.requestMatchers(HttpMethod.DELETE).hasRole("ADMIN")
                      .requestMatchers("/admin/**").hasAnyRole("ADMIN")
                      .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                      .requestMatchers("/login/**").permitAll()
                      .anyRequest().authenticated())
      .httpBasic(Customizer.withDefaults())
      .sessionManagement(httpSecuritySessionManagementConfigurer ->
              httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build();
}
```

**HTTP 安全将构建一个 _DefaultSecurityFilterChain_ 对象来加载请求匹配器和过滤器。**

### 2.3. 配置 Web 安全

对于 Web 安全，我们现在可以使用回调接口 _WebSecurityCustomizer._

我们将添加一个调试级别并忽略一些路径，如图片或脚本：

```
@Bean
public WebSecurityCustomizer webSecurityCustomizer() {
    return web -> web.debug(securityDebug).ignoring().requestMatchers("/css/**", "/js/**", "/img/**", "/lib/**", "/favicon.ico");
}
```

## 3. 端点控制器

现在我们将定义一个简单的 REST 控制器类为我们的应用程序：

```
@RestController
public class ResourceController {
    @GetMapping("/login")
    public String loginEndpoint() {
        return "登录!";
    }

    @GetMapping("/admin")
    public String adminEndpoint() {
        return "管理员!";
    }

    @GetMapping("/user")
    public String userEndpoint() {
        return "用户!";
    }

    @GetMapping("/all")
    public String allRolesEndpoint() {
        return "所有角色!";
    }

    @DeleteMapping("/delete")
    public String deleteEndpoint(@RequestBody String s) {
        return "我正在删除 " + s;
    }
}
```

正如我们之前在定义 HTTP 安全时提到的，我们将添加一个通用的 _/login_ 端点，任何人都可以访问，特定的管理员和用户端点，以及一个 _/all_ 端点，不由角色保护，但仍然需要认证。

## 4. 测试端点

让我们将我们的新配置添加到使用 MVC 模拟的 Spring Boot 测试中，以测试我们的端点。

### 4.1. 测试匿名用户

匿名用户可以访问 _/login_ 端点。如果他们尝试访问其他内容，他们将被拒绝授权（_401_）：

```
@Test
@WithAnonymousUser
public void whenAnonymousAccessLogin_thenOk() throws Exception {
    mvc.perform(get("/login"))
      .andExpect(status().isOk());
}

@Test
@WithAnonymousUser
public void whenAnonymousAccessRestrictedEndpoint_thenIsUnauthorized() throws Exception {
    mvc.perform(get("/all"))
      .andExpect(status().isUnauthorized());
}
```

此外，除了 _/login_ 端点之外，我们总是需要认证，就像 _/all_ 端点一样。

### 4.2. 测试用户角色

用户角色可以访问通用端点和我们为这个角色授予的所有其他路径：

```
@Test
@WithUserDetails()
public void whenUserAccessUserSecuredEndpoint_thenOk() throws Exception {
    mvc.perform(get("/user"))
      .andExpect(status().isOk());
}

@Test
@WithUserDetails()
public void whenUserAccessRestrictedEndpoint_thenOk() throws Exception {
    mvc.perform(get("/all"))
      .andExpect(status().isOk());
}

@Test
@WithUserDetails()
public void whenUserAccessAdminSecuredEndpoint_thenIsForbidden() throws Exception {
    mvc.perform(get("/admin"))
      .andExpect(status().isForbidden());
}

@Test
@WithUserDetails()
public void whenUserAccessDeleteSecuredEndpoint_thenIsForbidden() throws Exception {
    mvc.perform(delete("/delete"))
      .andExpect(status().isForbidden());
}
```

值得注意的是，如果用户角色尝试访问管理员保护的端点，用户将获得一个“禁止”（_403_）错误。

相反，像前面示例中的匿名用户一样，没有凭据的人将获得一个“未授权”错误（_401_）。

### 4.3. 测试管理员角色

正如我们所看到的，拥有管理员角色的人可以访问任何端点：

```
@Test
@WithUserDetails(value = "admin")
public void whenAdminAccessUserEndpoint_thenOk() throws Exception {
    mvc.perform(get("/user"))
      .andExpect(status().isOk());
}

@Test
@WithUserDetails(value = "admin")
public void whenAdminAccessAdminSecuredEndpoint_thenIsOk() throws Exception {
    mvc.perform(get("/admin"))
      .andExpect(status().isOk());
}

@Test
@WithUserDetails(value = "admin")
public void whenAdminAccessDeleteSecuredEndpoint_thenIsOk() throws Exception {
    mvc.perform(delete("/delete").content("{}"))
      .andExpect(status().isOk());
}
```

## 5. 结论

在本文中，我们学习了如何创建一个不使用 _WebSecurityConfigureAdapter_ 的 Spring Security 配置，并在创建认证、HTTP 安全和 Web 安全组件时替换它。

一如既往，我们可以在 GitHub 上找到工作的代码示例。