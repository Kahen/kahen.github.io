---
date: 2022-04-01
category:
  - Spring Security
  - Keycloak
tag:
  - Spring Boot
  - Security
  - OAuth
head:
  - - meta
    - name: keywords
      content: Spring Boot, Keycloak, Security, OAuth
------
# 在Spring Boot中禁用Keycloak安全功能

![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)

如果你正在使用Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程：

**>> 学习Spring**
**安全**

## 1. 概述

Keycloak是一个免费且开源的身份和访问管理程序，通常用于我们今天的软件栈中。在测试阶段，禁用它可能很有用，以便专注于业务测试。我们也可能在测试环境中没有Keycloak服务器。

在本教程中，**我们将禁用由Keycloak启动器设置的配置**。我们还将查看在项目中启用时如何修改Spring Security。

## 2. 在非Spring-Security环境中禁用Keycloak

我们首先看看如何在不使用Spring Security的应用程序中禁用Keycloak。

### 2.1. 应用程序设置

让我们从向项目添加_spring-boot-starter-oauth2-client_依赖开始：

```
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-oauth2-client```</artifactId>```
```</dependency>```
```

此外，我们需要添加_spring-boot-starter-oauth2-resource-server_依赖。它将允许我们使用Keycloak服务器验证JWT令牌。因此，让我们将其添加到我们的pom中：

```
```<dependency>```
     ```<groupId>```org.springframework.boot```</groupId>```
     ```<artifactId>```spring-boot-starter-oauth2-resource-server```</artifactId>```
```</dependency>```
```

接下来，我们将在_application.properties_中添加Keycloak服务器的配置：

```
spring.security.oauth2.client.registration.keycloak.client-id=login-app
spring.security.oauth2.client.registration.keycloak.authorization-grant-type=authorization_code
spring.security.oauth2.client.registration.keycloak.scope=openid
spring.security.oauth2.client.provider.keycloak.issuer-uri=
    http://localhost:8080/realms/SpringBootKeycloak
spring.security.oauth2.client.provider.keycloak.user-name-attribute=preferred_username

spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/realms/SpringBootKeycloak
```

最后，让我们添加一个_UserController_来获取一个_User_：

```java
@RestController
@RequestMapping("/users")
public class UserController {
    @GetMapping("/{userId}")
    public User getCustomer(@PathVariable(name = "userId") Long userId) {
        return new User(userId, "John", "Doe");
    }
}
```

### 2.2. 禁用Keycloak

现在我们的应用程序已经就绪，让我们编写一个简单的测试来获取一个用户：

```java
@Test
public void givenUnauthenticated_whenGettingUser_shouldReturnUser() {
    ResponseEntity`<User>` responseEntity = restTemplate.getForEntity("/users/1", User.class);

    assertEquals(HttpStatus.SC_OK, responseEntity.getStatusCodeValue());
    assertNotNull(responseEntity.getBody()
        .getFirstname());
}
```

**这个测试将会失败，因为我们没有向_restTemplate_提供任何身份验证**，或者因为Keycloak服务器不可用。

Keycloak适配器实现了Keycloak安全的Spring自动配置。自动配置依赖于类路径中类的存在或属性的值。具体来说，_@ConditionalOnProperty_注解对于这个特定需求非常有用。

**要禁用Keycloak安全，我们需要告知适配器它不应该加载相应的配置**。我们可以通过如下方式设置属性：

```
keycloak.enabled=false
```

如果我们再次运行我们的测试，它现在将成功，而无需任何身份验证。

## 3. 在Spring Security环境中禁用Keycloak

我们经常将Keycloak与Spring Security结合使用。**在这种情况下，仅仅禁用Keycloak配置是不够的，我们还需要修改Spring Security配置**以允许匿名请求到达控制器。

### 3.1. 应用程序设置

让我们从向项目添加_spring-boot-starter-security_依赖开始：

```
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-security```</artifactId>```
```</dependency>```
```

接下来，我们创建一个_SecurityFilterChain_ bean来定义Spring Security所需的配置：

```java
@Configuration
@EnableWebSecurity
public class KeycloakSecurityConfig {

    @Bean
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth.anyRequest()
                .permitAll())
            .oauth2Login(Customizer.withDefaults())
            .oauth2ResourceServer(httpSecurityOAuth2ResourceServerConfigurer ->
                httpSecurityOAuth2ResourceServerConfigurer.jwt(Customizer.withDefaults()));
        return http.build();
    }
}
```

这里，我们配置Spring Security仅允许来自已认证用户的请求。

### 3.2. 禁用Keycloak

除了像我们之前那样禁用Keycloak之外，**我们现在还需要禁用Spring Security**。

我们可以使用配置文件来告诉Spring在测试期间是否激活Keycloak配置：

```java
@Configuration
@EnableWebSecurity
@Profile("tests")
public class KeycloakSecurityConfig {
    // ...
}
```

**然而，更优雅的方式是重用_keycloak.enable_属性**，类似于Keycloak适配器：

```java
@Configuration
@EnableWebSecurity
@ConditionalOnProperty(name = "keycloak.enabled", havingValue = "true", matchIfMissing = true)
public class KeycloakSecurityConfig {
    // ...
}
```

因此，只有当_keycloak.enable_属性为_true_时，Spring才会启用Keycloak配置。如果属性缺失，_matchIfMissing_默认启用它。

由于我们正在使用Spring Security启动器，仅禁用我们的Spring Security配置是不够的。实际上，根据Spring的默认配置原则，**启动器将创建一个默认的安全层**。

让我们创建一个配置类来禁用它：

```java
@Configuration
@ConditionalOnProperty(name = "keycloak.enabled", havingValue = "false")
public class DisableSecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(request -> request.anyRequest()
                .permitAll());
        return http.build();
    }

}
```

我们仍然使用我们的_keycloak.enable_属性，但这次**如果其值设置为_false_，Spring将启用配置**。

## 4. 结论

在本文中，我们探讨了如何在有或没有Spring Security的Spring环境中禁用Keycloak安全功能。

像往常一样，本文中使用的所有代码示例都可以在GitHub上找到。