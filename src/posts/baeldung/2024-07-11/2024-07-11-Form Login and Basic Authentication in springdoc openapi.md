---
date: 2022-04-01
category:
  - Spring Security
  - Springdoc-OpenAPI
tag:
  - Form Login
  - Basic Authentication
head:
  - - meta
    - name: keywords
      content: Spring Security, Springdoc-OpenAPI, Form Login, Basic Authentication
---
# Springdoc-OpenAPI 中的表单登录和基本认证

如果您正在使用 Spring Security（特别是 OAuth）实现，请务必查看《学习 Spring 安全》课程。

**>> 学习 Spring 安全**

## 1. 概述

Springdoc-OpenAPI 是一个库，它基于 OpenAPI 3 规范自动化生成 Spring Boot 应用程序的服务文档。

通过用户界面与我们的 API 交互而无需实现用户界面可能会很方便。因此，让我们看看如果涉及授权，我们如何使用端点。

在本教程中，我们将学习**如何在 Springdoc 中使用 Spring Security 管理表单登录和基本认证来安全访问端点**。

## 2. 项目设置

我们将设置一个由 Spring Security 保护的 Spring Boot Web 应用程序，并使用 Springdoc 生成文档。

### 2.1. 依赖项

让我们为我们的项目声明所需的 Maven 依赖项。我们将添加 `springdoc-openapi-starter-webmvc-ui`，负责与 Swagger-UI 集成，并默认提供可通过以下地址访问的可视化工具：

```
http://localhost:8080/swagger-ui.html
```

```xml
`<dependency>`
     `<groupId>`org.springdoc`</groupId>`
     `<artifactId>`springdoc-openapi-starter-webmvc-ui`</artifactId>`
     `<version>`2.5.0`</version>`
`</dependency>`
```

### 2.2. 示例 API

对于本文，我们将实现一个虚拟的 REST 控制器，作为使用 Springdoc 生成文档的来源。此外，我们将举例说明如何通过 Swagger-UI 通过身份验证与 `FooController` 的受保护端点交互。

```java
@RestController
@RequestMapping(value = "foos", produces = MediaType.APPLICATION_JSON_VALUE)
@OpenAPIDefinition(info = @Info(title = "Foos API", version = "v1"))
public class FooController {

    @GetMapping(value = "/{id}")
    public FooDTO findById(@PathVariable("id") final Long id) {
        return new FooDTO(randomAlphabetic(STRING_LENGTH));
    }

    @GetMapping
    public List`<FooDTO>` findAll() {
        return Lists.newArrayList(new FooDTO(randomAlphabetic(STRING_LENGTH)),
          new FooDTO(randomAlphabetic(STRING_LENGTH)), new FooDTO(randomAlphabetic(STRING_LENGTH)));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FooDTO create(@RequestBody final FooDTO fooDTO) {
        return fooDTO;
    }
}
```

### 2.3. 用户凭据

我们将使用 Spring Security 的内存认证来注册我们的测试用户凭据：

```java
@Autowired
public void configureGlobal(AuthenticationManagerBuilder auth, PasswordEncoder passwordEncoder) throws Exception {
    auth.inMemoryAuthentication()
      .withUser("user")
      .password(passwordEncoder.encode("password"))
      .roles("USER");
}
```

让我们看看我们如何通过身份验证与我们基于表单登录保护的文档化端点交互。

### 3.1. 安全配置

在这里，我们定义了使用表单登录授权请求的安全配置：

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth.requestMatchers("/v3/api-docs/**",
                 "/swagger-ui/**", "/swagger-ui.html")
                .permitAll()
                .anyRequest()
                .authenticated())
            .formLogin(formLogin -> formLogin.defaultSuccessUrl("/foos"));
    return http.build();
}
```

### 3.2. 登录文档

默认情况下，框架提供的登录端点没有被记录。因此，我们需要通过设置相应的配置属性使其可见。此外，可以在库的文档中找到有用的配置属性：

```properties
springdoc.show-login-endpoint=true
```

之后，**Springdoc 将检测配置的 Spring Security 的表单登录，并在 Swagger-UI 中生成文档**。因此，它将添加带有用户名和密码请求参数以及特定的 `application/x-www-form-urlencoded` 请求正文类型的 `/login` 端点：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/2_login-endpoint-swagger-ui.png)

认证后，我们可以调用受保护的 `FooController` 端点。此外，由于安全配置的 `defaultSucccesfulUrl`，我们还将获得来自 `/foos` 端点的响应，因为登录成功：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/2_successful-login-swagger.png)

### 3.3. 注销文档

能够在 Swagger-UI 中注销有助于用户切换，这可能很有帮助。例如，当应用基于角色的 API 授权时。

**Springdoc 不像登录那样提供自动检测注销端点的方式**。在这种情况下，我们需要定义一个虚拟的 REST 控制器，公开一个 post 请求映射到 `/logout` 路径。然而，我们不需要添加实现，因为 Spring Security 将拦截并处理请求：

```java
@RestController
public class LogoutController {

    @PostMapping("logout")
    public void logout() {}
}
```

通过添加 `LogoutController`，库将生成文档并使注销在 Swagger-UI 中可用：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/2_logout-controller-endpoint-swagger-ui.png)

## 4. 基本认证

当处理使用基本认证保护的端点时，我们不需要直接调用登录。另一方面，OpenAPI 支持一组标准安全方案，包括基本认证，我们可以相应地配置 Springdoc。

### 4.1. 安全配置

使用基本认证保护端点的简单安全配置：

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth.requestMatchers("/v3/api-docs/**",
                 "/swagger-ui/**", "/swagger-ui.html")
                .permitAll()
                .anyRequest()
                .authenticated())
            .httpBasic(Customizer.withDefaults());
    return http.build();
 }
```

### 4.2. Springdoc 安全方案

要配置 OpenAPI 安全方案，我们需要提供基于 `@SecurityScheme` 注解的配置：

```java
@Configuration
@SecurityScheme(
  type = SecuritySchemeType.HTTP,
  name = "basicAuth",
  scheme = "basic")
public class SpringdocConfig {}
```

然后，我们还需要使用 `@SecurityRequirement(name = “basicAuth”)` 注解我们的 `FooController`。如果我们只想保护某些端点或使用不同的方案，我们可以在方法级别应用此注解：

```java
@RestController
@OpenAPIDefinition(info = @Info(title = "Foos API", version = "v1"))
@SecurityRequirement(name = "basicAuth")
@RequestMapping(value = "foos", produces = MediaType.APPLICATION_JSON_VALUE)
public class FooController {
    ...
}
```

因此，Swagger-UI 中将提供授权按钮：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/2_authorize-button-swagger-ui.png)

然后，我们可以在表单中提供我们的用户凭据：

![img](https://www.baeldung.com/wp-content/uploads/2022/12/2_basic-authentication-form-swagger.png)

随后，**在调用任何 `FooController` 端点时，请求中将包含带有凭据的授权标头**，如生成的 curl 命令所示。因此，我们将被授权执行请求：

## 5. 结论

在本文中，我们学习了如何配置 Springdoc 的身份验证，以便通过在 Swagger-UI 中生成的文档访问受保护的端点。起初，我们经历了基于表单的登录设置。然后，我们为基本认证配置了安全方案。

本教程的项目实现可在 GitHub 上找到。