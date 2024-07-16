---
date: 2022-04-01
category:
  - Spring Security
  - Thymeleaf
tag:
  - Spring Security
  - Thymeleaf
  - User Information
head:
  - - meta
    - name: keywords
      content: Spring Security, Thymeleaf, User Information Display
---
# 在Thymeleaf中显示已登录用户信息

如果您正在使用Spring Security（特别是OAuth）实现，请务必查看《学习Spring安全》课程：

**>> 学习Spring**
**安全**

## 1. 概述

在这个快速教程中，**我们将看看如何** **在Thymeleaf中显示已登录用户的信息**。
我们将扩展我们在Spring Security与Thymeleaf文章中构建的项目。首先，我们将添加一个自定义模型来存储用户信息和检索它们的服务。之后，我们将使用Thymeleaf Extras模块中的Spring Security方言来显示它。

## 2. UserDetails实现

_UserDetails_ 是Spring Security用来保存与安全无关的用户信息的接口。

我们将创建我们的_UserDetails_接口实现，其中包含一些自定义字段，作为存储我们认证用户详细信息的模型。但是，为了处理更少的字段和方法，我们将扩展默认框架实现，_User_类：

```
public class CustomUserDetails extends User {

    private final String firstName;
    private final String lastName;
    private final String email;

    private CustomUserDetails(Builder builder) {
        super(builder.username, builder.password, builder.authorities);
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
    }

    // 省略getter和静态Builder类
}
```

## 3. UserDetailsService实现

框架的_UserDetailsService_单一方法接口负责在认证过程中获取_UserDetails_。

因此，为了能够加载我们的_CustomUserDetails_，我们需要实现_UserDetailsService_接口。对于我们的示例，我们将在用户名作为键的_Map_中硬编码并存储用户详细信息：

```
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final Map`<String, CustomUserDetails>` userRegistry = new HashMap<>();

    // 省略构造器

    @PostConstruct
    public void init() {
        userRegistry.put("user", new CustomUserDetails.Builder().withFirstName("Mark")
          .withLastName("Johnson")
          .withEmail("mark.johnson@email.com")
          .withUsername("user")
          .withPassword(passwordEncoder.encode("password"))
          .withAuthorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")))
          .build());
        userRegistry.put("admin", new CustomUserDetails.Builder().withFirstName("James")
          .withLastName("Davis")
          .withEmail("james.davis@email.com")
          .withUsername("admin")
          .withPassword(passwordEncoder.encode("password"))
          .withAuthorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")))
          .build());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomUserDetails userDetails = userRegistry.get(username);
        if (userDetails == null) {
            throw new UsernameNotFoundException(username);
        }
        return userDetails;
    }
}
```

此外，为了实现所需的_loadUserByUsername()_方法，我们通过用户名从注册_Map_中获取相应的_CustomUserDetails_对象。然而，在生产环境中，用户详细信息将从存储库中存储和检索。

## 4. Spring Security配置

首先，我们需要在Spring Security的配置中添加_UserDetailsService_，它将连接到_CustomUserDetailsService_实现。进一步，我们将通过相应的方法将其设置在_HttpSecurity_实例上。其余的只是最小的安全配置，要求用户经过认证，并配置_/login_、_/logout_和_/index_端点：

```
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final UserDetailsService userDetailsService;

    // 省略构造器

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.userDetailsService(userDetailsService)
            .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
                    .anyRequest().authenticated())
            .formLogin(httpSecurityFormLoginConfigurer -> httpSecurityFormLoginConfigurer
                    .loginPage("/login").permitAll()
                    .defaultSuccessUrl("/index"))
            .logout(httpSecurityLogoutConfigurer -> httpSecurityLogoutConfigurer.permitAll()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .logoutSuccessUrl("/login"));
        return http.build();
    }
}
```

**Thymeleaf Extras模块提供了对_Authentication_对象的访问**，通过安全方言，我们可以在Thymeleaf页面上显示已登录用户的信息。

_CustomUserDetails_对象可以通过_Authentication_对象上的_principal_字段访问。例如，我们可以使用_sec:authentication="principal.firstName"_访问_firstName_字段：

```
`<!DOCTYPE html>`
`<html xmlns:sec="http://www.thymeleaf.org/extras/spring-security">`
`<head>`
`<title>`欢迎来到Spring Security Thymeleaf教程`</title>`
`</head>`
`<body>`
    `<h2>`欢迎`</h2>`
    `<p>`Spring Security Thymeleaf教程`</p>`
    `<div sec:authorize="hasRole('USER')">`用户可见的文本。`````````</div>`````````
    `<div sec:authorize="hasRole('ADMIN')">`管理员可见的文本。`````````</div>`````````
    `<div sec:authorize="isAuthenticated()">`仅已认证用户可见的文本。`````````</div>`````````
    已认证用户名：
    `<div sec:authentication="name">``````````</div>`````````
    已认证用户的名字：
    `<div sec:authentication="principal.firstName">``````````</div>`````````
    已认证用户的姓氏：
    `<div sec:authentication="principal.lastName">``````````</div>`````````
    已认证用户的电子邮件：
    `<div sec:authentication="principal.email">``````````</div>`````````
    已认证用户的角色：
    `<div sec:authentication="principal.authorities">``````````</div>`````````
`</body>`
`</html>`
```

或者，如果不使用_sec:authentication_属性，可以使用Spring表达式语言的等效语法来编写安全方言表达式。因此，如果我们更习惯使用它，我们可以使用Spring表达式语言格式来显示_firstName_字段：

```
`<div th:text="${#authentication.principal.firstName}">``````````</div>`````````
```

## 6. 结论

在本文中，我们已经看到如何在Spring Boot应用程序中使用Spring Security的支持在Thymeleaf中显示已登录用户的信息。

像往常一样，示例的源代码可以在GitHub上找到。