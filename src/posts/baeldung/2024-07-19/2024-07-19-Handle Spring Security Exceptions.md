---
date: 2022-04-01
category:
  - Spring Security
tag:
  - 异常处理
  - 资源服务器
head:
  - - meta
    - name: keywords
      content: Spring Security, 异常处理, 资源服务器
---
# 处理Spring Security异常

如果你正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring》的**安全课程**。

## 1. 概述

在本文中，我们将看看如何**处理由我们的Spring Security资源服务器产生的Spring Security异常**。为此，我们还将使用一个实际的例子，其中将解释所有必要的配置。首先，让我们简短地介绍一下Spring Security。

Spring Security是Spring项目的一部分库。**它试图将Spring项目中用户访问控制的所有功能集中起来**。访问控制允许限制应用程序中特定用户组或角色可以执行的选项。在这个方向上，**Spring Security控制对业务逻辑的调用或限制对某些URL的HTTP请求的访问**。考虑到这一点，我们必须通过告诉Spring Security安全层应该如何表现来配置应用程序。

在我们的例子中，我们将专注于异常处理程序的配置。**Spring Security提供了三个不同的接口来实现这个目的并控制产生的事件：**

- 认证成功处理器
- 认证失败处理器
- 访问拒绝处理器

首先，让我们仔细看看配置。

## 3. 安全配置

首先，我们有配置类，它必须创建一个_SecurityFilterChain_ bean。**这将负责管理应用程序的所有安全配置**。所以，这就是我们必须引入我们的处理器的地方。

一方面，我们将定义所需的配置：

```
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
        .httpBasic(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth -> auth
        .requestMatchers("/login")
        .permitAll()
        .requestMatchers("/customError")
        .permitAll()
        .requestMatchers("/access-denied")
        .permitAll()
        .requestMatchers("/secured")
        .hasRole("ADMIN")
        .anyRequest()
        .authenticated())
        .formLogin(form -> form.failureHandler(authenticationFailureHandler())
                        .successHandler(authenticationSuccessHandler()))
                        .exceptionHandling(ex -> ex.accessDeniedHandler(accessDeniedHandler()))
        .logout(Customizer.withDefaults());
    return http.build();
}
```

值得注意的是，重定向URL，如"/login"、"/customError"和"/access-denied"不需要任何类型的访问限制。所以我们将它们标注为_permitAll()_。

另一方面，我们必须定义定义我们可以处理的异常类型的Beans：

```
@Bean
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
```

由于_AuthenticationSuccessHandler_处理成功路径，我们将为异常情况定义剩余的两个bean。**这两个处理器是我们现在必须适应和实现以满足我们的需求的**。所以，让我们继续实现每一个。

## 4. 认证失败处理器

一方面，我们有_AuthenticationFailureHandler_接口。它负责**管理用户登录失败时产生的异常**。这个接口为我们提供了_onAuthenticationFailure()_方法来自定义处理器逻辑。**它将在Spring Security登录失败时被调用**。考虑到这一点，让我们定义我们的异常处理器，当登录失败时重定向到错误页面：

```
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
      throws IOException {
        response.sendRedirect("/customError");
    }
}
```

## 5. 访问拒绝处理器

另一方面，当未经授权的用户试图访问安全或受保护的页面时，**Spring Security将抛出访问拒绝异常**。Spring Security有一个默认的403访问拒绝页面，我们可以自定义。这由_AccessDeniedHandler_接口管理。**此外，它提供了_handle()_方法，用于在重定向用户到403页面之前自定义逻辑**：

```
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException exc) throws IOException {
        response.sendRedirect("/access-denied");
    }
}
```

## 6. 结论

在这篇简短的文章中，**我们学习了如何处理Spring Security异常以及如何通过创建和自定义我们的类来控制它们**。此外，我们创建了一个完全功能的例子，帮助我们理解所解释的概念。

文章的完整源代码可以在GitHub上找到。