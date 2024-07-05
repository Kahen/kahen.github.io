---
date: 2022-04-01
category:
  - Spring Boot
  - Spring Security
tag:
  - Shared Secret Authentication
  - Microservices
head:
  - - meta
    - name: keywords
      content: Spring Boot, Spring Security, shared secret, authentication, microservices
---
# Spring Boot应用中的共享密钥认证

如果您正在处理Spring Security（特别是OAuth）实现，一定要看看《学习Spring安全》课程。

## 1. 概述

认证是设计安全微服务的基本方面。我们可以通过多种方式实现认证，比如使用基于用户凭证、证书或基于令牌的认证。

在本教程中，我们将学习如何为服务间通信设置认证。我们将使用Spring Security来实现解决方案。

## 2. 自定义认证介绍

使用身份提供者或密码数据库可能并不总是可行的，因为私有微服务不需要基于用户交互。然而，我们仍然应该保护应用程序免受任何无效请求的侵害，而不仅仅依赖于网络安全。

在这种情况下，我们可以通过使用自定义的共享密钥头来设计一个简单的认证技术。应用程序将根据预先配置的请求头验证请求。

我们还应该在应用程序中启用TLS以在网络上保护共享密钥。

我们可能还需要确保一些端点无需任何认证即可工作，例如健康检查或错误端点。

## 3. 示例应用程序

让我们想象我们需要构建一个具有几个REST API的微服务。

### 3.1. Maven依赖项

首先，我们将通过创建一个Spring Boot Web项目并包括一些Spring依赖项来开始。

让我们添加spring-boot-starter-web、spring-boot-starter-security、spring-boot-starter-test和rest-assured依赖项：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-web````</artifactId>````
````</dependency>````
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-security````</artifactId>````
````</dependency>````
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-test````</artifactId>````
    `<scope>`test`</scope>`
````</dependency>````
````<dependency>````
    ````<groupId>````io.rest-assured````</groupId>````
    ````<artifactId>````rest-assured````</artifactId>````
````</dependency>````
```

### 3.2. 实现REST控制器

我们的应用程序有两个端点，一个端点可以通过共享密钥头访问，另一个端点对所有网络中的用户都是可访问的。

首先，让我们实现APIController类中的/hello端点：

```java
@GetMapping(path = "/api/hello")
public String hello(){
    return "hello";
}
```

然后，我们将在HealthCheckController类中实现health端点：

```java
@GetMapping(path = "/health")
public String getHealthStatus() {
   return "OK";
}
```

## 4. 使用Spring Security实现自定义认证

Spring Security提供了几个内置的过滤器类来实现认证。我们也可以覆盖内置的过滤器类或使用认证提供者来实现自定义解决方案。

我们将配置应用程序将AuthenticationFilter注册到过滤器链中。

### 4.1. 实现认证过滤器

要实现基于头的认证，我们可以使用RequestHeaderAuthenticationFilter类。RequestHeaderAuthenticationFilter是一个预先认证的过滤器，它从请求头获取主体。与任何预认证场景一样，我们需要将认证的证据转换为具有角色的用户。

RequestHeaderAuthenticationFilter将请求头设置为Principal对象。在内部，它将使用请求头中的Principal和Credential创建一个PreAuthenticatedAuthenticationToken对象，并将令牌传递给认证管理器。

让我们在SecurityConfig类中添加RequestHeaderAuthenticationFilter Bean：

```java
@Bean
public RequestHeaderAuthenticationFilter requestHeaderAuthenticationFilter() {
    RequestHeaderAuthenticationFilter filter = new RequestHeaderAuthenticationFilter();
    filter.setPrincipalRequestHeader("x-auth-secret-key");
    filter.setExceptionIfHeaderMissing(false);
    filter.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api/**"));
    filter.setAuthenticationManager(authenticationManager());

    return filter;
}
```

在上述代码中，x-auth-header-key头被添加为Principal对象。此外，包括了AuthenticationManager对象以委托实际的认证。

我们应该注意，过滤器仅对匹配/api/*路径的端点启用。

### 4.2. 设置认证管理器

现在，我们将创建AuthenticationManager并传递一个自定义的AuthenticationProvider对象，我们将稍后创建：

```java
@Bean
protected AuthenticationManager authenticationManager() {
    return new ProviderManager(Collections.singletonList(requestHeaderAuthenticationProvider));
}
```

### 4.3. 配置认证提供者

要实现自定义认证提供者，我们将实现AuthenticationProvider接口。

让我们覆盖AuthenticationProvider接口中定义的authenticate方法：

```java
public class RequestHeaderAuthenticationProvider implements AuthenticationProvider {

    @Value("${api.auth.secret}")
    private String apiAuthSecret;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String authSecretKey = String.valueOf(authentication.getPrincipal());

        if(StringUtils.isBlank(authSecretKey) || !authSecretKey.equals(apiAuthSecret)) {
            throw new BadCredentialsException("Bad Request Header Credentials");
        }

        return new PreAuthenticatedAuthenticationToken(authentication.getPrincipal(), null, new ArrayList<>());
    }
}
```

在上述代码中，authSecretkey值与Principal匹配。如果头不有效，该方法将抛出BadCredentialsException。

在认证成功后，它将返回完全认证的PreAuthenticatedAuthenticationToken对象。PreAuthenticatedAuthenticationToken对象可以被视为基于角色授权的用户。

我们还需要覆盖AuthenticationProvider接口中定义的supports方法：

```java
@Override
public boolean supports(Class`<?>` authentication) {
    return authentication.equals(PreAuthenticatedAuthenticationToken.class);
}
```

supports方法检查此认证提供者支持的Authentication类类型。

### 4.4. 使用Spring Security配置过滤器

要使Spring Security在应用程序中启用，我们将添加@EnableWebSecurity注解。此外，我们需要创建一个SecurityFilterChain对象。

此外，Spring Security默认启用CORS和CSRF保护。由于此应用程序只能由内部微服务访问，我们将禁用CORS和CSRF保护。

让我们在SecurityFilterChain中包括上述RequestHeaderAuthenticationFilter：

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       http.cors(Customizer.withDefaults()).csrf(AbstractHttpConfigurer::disable)
          .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
          .addFilterAfter(requestHeaderAuthenticationFilter(), HeaderWriterFilter.class)
          .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
                      .requestMatchers("/api/**").authenticated());

        return http.build();
    }
}
```

我们应该注意，会话管理被设置为STATELESS，因为应用程序是内部访问的。

### 4.5. 从认证中排除健康端点

使用antMatcher的permitAll方法，我们可以从认证和授权中排除任何公共端点。

让我们在上述filterchain方法中添加/health端点以从认证中排除：

```java
.requestMatchers(HttpMethod.GET, "/health").permitAll()
.exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
       httpSecurityExceptionHandlingConfigurer.authenticationEntryPoint((request, response, authException) ->
                                                          response.sendError(HttpServletResponse.SC_UNAUTHORIZED)));
```

我们应该注意，异常处理被配置为包括authenticationEntryPoint以返回401 Unauthorized状态。

## 5. 为API实现集成测试

我们将使用TestRestTemplate为端点实现集成测试。

首先，让我们通过向/hello端点传递有效的x-auth-secret-key头来实现测试：

```java
HttpHeaders headers = new HttpHeaders();
headers.add("x-auth-secret-key", "test-secret");

ResponseEntity```<String>``` response = restTemplate.exchange(new URI("http://localhost:8080/app/api"),
  HttpMethod.GET, new HttpEntity<>(headers), String.class);

assertEquals(HttpStatus.OK, response.getStatusCode());
assertEquals("hello", response.getBody());
```

然后，让我们通过传递无效的头来实现测试：

```java
HttpHeaders headers = new HttpHeaders();
headers.add("x-auth-secret-key", "invalid-secret");

ResponseEntity```<String>``` response = restTemplate.exchange(new URI("http://localhost:8080/app/api"),
  HttpMethod.GET, new HttpEntity<>(headers), String.class);

assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
```

最后，我们将在不添加任何头的情况下测试/health端点：

```java
HttpHeaders headers = new HttpHeaders();
ResponseEntity```<String>``` response = restTemplate.exchange(new URI(HEALTH_CHECK_ENDPOINT),
  HttpMethod.GET, new HttpEntity<>(headers), String.class);

assertEquals(HttpStatus.OK, response.getStatusCode());
assertEquals("OK", response.getBody());
```

正如预期的那样，认证对所需端点有效。/health端点可以在没有头认证的情况下访问。

## 6. 结论

在本文中，我们学习了如何使用自定义头和共享密钥认证来帮助保护服务间通信。

我们还看到了如何使用RequestHeaderAuthenticationFilter和自定义认证提供者的组合来实现基于共享密钥的头认证。

如常，示例代码可以在GitHub上找到。