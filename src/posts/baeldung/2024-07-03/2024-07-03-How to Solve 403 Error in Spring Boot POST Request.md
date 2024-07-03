---
date: 2023-07-03
category:
  - Spring Boot
  - 403 Error
tag:
  - Spring Security
  - CSRF
head:
  - - meta
    - name: keywords
      content: Spring Boot, 403 Error, Spring Security, CSRF
---
# 如何解决Spring Boot POST请求中的403错误 | Baeldung

## 1. 概述

在Web开发中，遇到错误是常有的事。其中一种错误是HTTP 403禁止错误。

在本教程中，我们将学习如何在Spring Boot POST请求中解决403错误。我们将从理解403错误的含义开始，然后探索在Spring Boot应用程序中解决它的步骤。

## 2. 什么是错误403？

**HTTP 403错误，通常被称为“禁止”错误，是一个状态码，表示服务器理解了请求，但选择不授权它**。这通常意味着客户端缺乏访问所请求资源的权限。

需要注意的是，这个错误与401错误不同，401错误表示服务器需要对客户端进行身份验证，但尚未收到有效的凭据。

## 3. 错误403的原因

有几个因素可能在Spring Boot应用程序中触发403错误。其中之一是当**客户端未能提供认证凭据**。在这种情况下，服务器无法验证客户端的权限，拒绝请求，导致403错误。

另一个可能的原因在服务器配置中。例如，服务器可能配置为出于安全考虑拒绝来自特定IP地址或用户代理的请求。如果请求来自这些被阻止的实体，服务器会响应403错误。

此外，Spring Security默认启用跨站请求伪造（CSRF）保护。CSRF是一种攻击，它诱使受害者提交恶意请求，并使用受害者的身份来代表他们执行不希望的功能。**如果用于防止这种攻击的CSRF令牌缺失或不正确，服务器也可能响应错误403**。

## 4. 项目设置

为了演示如何解决403错误，我们将创建一个Spring Boot项目，包含spring-boot-starter-web和spring-boot-starter-security依赖：

```
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-security``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
```

然后我们将创建一个控制器类来处理POST请求：

```java
@PostMapping("/test-request")
public ResponseEntity`<String>` testPostRequest() {
    return ResponseEntity.ok("POST request successful");
}
```

上述方法具有@PostMapping注释，这意味着它可以处理服务器的POST请求。一个成功的POST请求返回“POST request successful”作为响应。

接下来，我们将通过添加内存用户来配置Spring Security：

```java
@Bean
public InMemoryUserDetailsManager userDetailsService() {
    UserDetails user = User.withUsername("user")
      .password(encoder().encode("userPass"))
      .roles("USER")
      .build();
    return new InMemoryUserDetailsManager(user);
}

@Bean
public PasswordEncoder encoder() {
    return new BCryptPasswordEncoder();
}
```

在上述代码中，我们配置应用程序使用内存用户进行请求认证。使用BCryptPasswordEncoder对用户密码进行编码，以增强安全性。

最后，我们将配置SecurityFilterChain接受所有传入请求：

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest()
      .permitAll());
    return http.build();
}
```

在这段代码中，我们配置应用程序在不需要任何形式的身份验证的情况下允许所有传入请求。

在这一部分，我们将探讨可能导致403错误的几个因素，并讨论可能的解决方案。

### 5.1. 跨站请求伪造（CSRF）保护

默认情况下，Spring Security启用了CSRF保护。如果请求头中缺少CSRF令牌，服务器会响应403错误。这种行为不特定于任何服务器环境，包括本地主机、暂存或生产环境。

让我们尝试进行POST请求：

```bash
$ curl -X POST -H "Content-Type: application/json" http://localhost:8080/test-request
```

上述请求导致禁止错误：

```json
{"timestamp":"2023-06-24T16:52:05.397+00:00","status":403,"error":"Forbidden","path":"/test-request"}
```

我们可以通过禁用CSRF保护来解决此错误：

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest()
      .permitAll())
      .csrf(AbstractHttpConfigurer::disable);
    return http.build();
}
```

在上述代码中，我们通过调用disable()方法禁用了CSRF保护。

让我们对“/test-request”端点进行POST请求：

```bash
$ curl -X POST -H "Content-Type: application/json" http://localhost:8080/test-request
```

禁用CSRF后，我们进行POST请求，服务器响应预期的HTTP响应“POST request successful”。

然而，**值得注意的是，在生产环境中的应用程序中禁用CSRF保护通常不推荐。CSRF保护是防止跨站伪造攻击的关键安全措施。因此，建议在状态更改操作的请求头中包含CSRF令牌**。

### 5.2. 认证凭据

**向安全端点提供不正确的认证凭据，或不提供认证凭据，可能导致Spring Boot应用程序中的403错误**。

让我们修改SecurityFilterChain以对服务器的所有请求进行身份验证：

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest()
      .authenticated())
      .httpBasic(withDefaults())
      .formLogin(withDefaults())
      .csrf(AbstractHttpConfigurer::disable);
    return http.build();
}
```

在上述代码中，我们配置应用程序在授予访问权限之前对每个请求进行身份验证。如果我们在没有提供正确认证凭据的情况下向端点进行POST请求，服务器会响应403错误。

让我们使用我们创建的内存用户的凭据向“/test-request”端点进行POST请求：

![img](https://www.baeldung.com/wp-content/uploads/2023/07/basic_authentication_to_avoid_error_403-2.png)

上图显示，当我们提供正确的认证时，服务器响应200 OK状态码。

## 6. 结论

在本文中，我们学习了如何通过禁用CSRF保护和提供正确的认证凭据来解决Spring Boot中的403错误。我们还演示了如何配置Spring Security以接受经过身份验证和未经身份验证的请求。此外，我们强调了Spring Boot应用程序中403错误的不同原因。

如往常一样，示例的完整源代码可在GitHub上找到。