---
date: 2022-04-01
category:
  - Spring Security
  - MongoDB
tag:
  - Authentication
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: Spring Security, MongoDB, Authentication
------
# 使用Spring Security和MongoDB进行认证

如果你正在开发一个Spring Security（特别是OAuth）实现，一定要看看《学习Spring Security》课程：
**>> 学习Spring**
**安全**

## 1. 概述

Spring Security提供了不同的认证系统，例如通过数据库和_UserDetailService_进行认证。

除了使用JPA持久层，我们可能还想使用例如MongoDB仓库。在本教程中，我们将看到如何使用Spring Security和MongoDB进行用户认证。

**类似于使用JPA仓库，我们可以使用MongoDB仓库。** 但是，我们需要设置不同的配置才能使用它。

### 2.1. Maven依赖

**对于本教程，我们将使用嵌入式MongoDB。** 然而，MongoDB实例和_Testcontainer_可能是生产环境的有效选项。首先，让我们添加_spring-boot-starter-data-mongodb_和_de.flapdoodle.embed.mongo.spring30x_依赖：

```
``<dependency>``
   ``<groupId>``org.springframework.boot``</groupId>``
   ``<artifactId>``spring-boot-starter-data-mongodb``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``de.flapdoodle.embed``</groupId>``
    ``<artifactId>``de.flapdoodle.embed.mongo.spring30x``</artifactId>``
    `<version>`4.11.0`</version>`
``</dependency>``
```

### 2.2. 配置

一旦我们设置了依赖，我们需要配置我们的_AuthenticationManager_，例如使用HTTP基本认证：

```
@Configuration
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
            .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry.anyRequest().permitAll())
            .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

}
```

### 2.3. 用户域和仓库

首先，让我们定义一个简单的用户角色，用于我们的认证。我们将让它实现_UserDetails_接口，以重用_Principal_对象的公共方法：

```
@Document
public class User implements UserDetails {
    private @MongoId ObjectId id;
    private String username;
    private String password;
    private Set`<UserRole>` userRoles;
    // getters and setters
}
```

现在我们有了用户，让我们定义一个简单的仓库：

```
public interface UserRepository extends MongoRepository`<User, String>` {

    @Query("{username:'?0'}")
    User findUserByUsername(String username);
}
```

### 2.4. 认证服务

**最后，让我们实现我们的_UserDetailService_，以便检索用户并检查它是否已认证**：

```
@Service
public class MongoAuthUserDetailService implements UserDetailsService {
    // ...
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        com.baeldung.mongoauth.domain.User user = userRepository.findUserByUsername(userName);

        Set`<GrantedAuthority>` grantedAuthorities = new HashSet<>();
        user.getAuthorities()
          .forEach(role -> grantedAuthorities.add(new SimpleGrantedAuthority(role.getRole().getName())));

        return new User(user.getUsername(), user.getPassword(), grantedAuthorities);
    }

}
```

### 2.5. 测试认证

为了测试我们的应用程序，让我们定义一个简单的控制器。作为一个例子，我们已经定义了两种不同的角色，以测试特定端点的认证和授权：

```
@RestController
public class ResourceController {

    @RolesAllowed("ROLE_ADMIN")
    @GetMapping("/admin")
    public String admin() {
        return "Hello Admin!";
    }

    @RolesAllowed({ "ROLE_ADMIN", "ROLE_USER" })
    @GetMapping("/user")
    public String user() {
        return "Hello User!";
    }

}
```

让我们将所有内容都包装在一个Spring Boot测试中，以检查我们的认证是否有效。正如我们所看到的，**我们期望为提供无效凭据或在我们系统中不存在的人提供401代码**：

```
class MongoAuthApplicationTest {

    // set up

    @Test
    void givenUserCredentials_whenInvokeUserAuthorizedEndPoint_thenReturn200() throws Exception {
        mvc.perform(get("/user").with(httpBasic(USER_NAME, PASSWORD)))
          .andExpect(status().isOk());
    }

    @Test
    void givenUserNotExists_whenInvokeEndPoint_thenReturn401() throws Exception {
        mvc.perform(get("/user").with(httpBasic("not_existing_user", "password")))
          .andExpect(status().isUnauthorized());
    }

    @Test
    void givenUserExistsAndWrongPassword_whenInvokeEndPoint_thenReturn401() throws Exception {
        mvc.perform(get("/user").with(httpBasic(USER_NAME, "wrong_password")))
          .andExpect(status().isUnauthorized());
    }

    @Test
    void givenUserCredentials_whenInvokeAdminAuthorizedEndPoint_thenReturn403() throws Exception {
        mvc.perform(get("/admin").with(httpBasic(USER_NAME, PASSWORD)))
          .andExpect(status().isForbidden());
    }

    @Test
    void givenAdminCredentials_whenInvokeAdminAuthorizedEndPoint_thenReturn200() throws Exception {
        mvc.perform(get("/admin").with(httpBasic(ADMIN_NAME, PASSWORD)))
          .andExpect(status().isOk());

        mvc.perform(get("/user").with(httpBasic(ADMIN_NAME, PASSWORD)))
          .andExpect(status().isOk());
    }

}
```

## 3. 结论

在本文中，我们探讨了使用Spring Security进行MongoDB认证。

我们已经看到了如何创建一个工作配置并实现我们的自定义_UserDetailService_。我们还看到了如何模拟MVC上下文并测试认证和授权。

一如既往，这些示例的代码可以在GitHub上找到。