---
date: 2022-04-01
category:
  - Spring Security
  - API Key
tag:
  - Spring Boot
  - Security
  - API Key
head:
  - - meta
    - name: keywords
      content: Spring Boot, API Key, Security
------
# 使用API密钥和密钥保护Spring Boot API

如果你正在使用Spring Security（特别是OAuth）实现，请务必查看《学习Spring安全》课程。

**> > 学习Spring**
**安全**

## 1. 概述

安全在REST API开发中扮演着至关重要的角色。一个不安全的REST API可以直接访问后端系统的敏感数据。因此，组织需要关注API安全。

Spring Security提供了多种机制来保护我们的REST API。其中之一是API密钥。API密钥是一个令牌，客户端在调用API时提供。

在本教程中，我们将讨论在Spring Security中实现基于API密钥的认证。

## 2. REST API安全

Spring Security可以用来保护REST API。**REST API是无状态的。因此，它们不应该使用会话或cookies。相反，这些应该使用基础认证、API密钥、JWT或基于OAuth2的令牌来确保安全。**

### 2.1. 基础认证

基础认证是一个简单的认证方案。客户端发送HTTP请求，其中包含一个_Authorization_头，后面跟着单词_Basic_，一个空格和一个Base64编码的字符串_username_:_password_。只有在HTTPS/SSL等其他安全机制下，基础认证才被认为是安全的。

### 2.2. OAuth2

OAuth2是REST API安全的事实上的标准。它是一个开放的认证和授权标准，允许资源所有者通过访问令牌给客户端委托访问私有数据。

### 2.3. API密钥

一些REST API使用API密钥进行认证。API密钥是一个令牌，它标识API客户端到API，而不引用实际的用户。令牌可以在查询字符串中发送或作为请求头。像基础认证一样，可以使用SSL隐藏密钥。

本教程重点介绍如何使用Spring Security实现API密钥认证。

## 3. 使用API密钥保护REST API

在这一部分，我们将创建一个Spring Boot应用程序，并使用基于API密钥的认证来保护它。

### 3.1. Maven依赖项

让我们从在我们的_pom.xml_中声明_spring-boot-starter-security_依赖项开始：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-security`</artifactId>`
`</dependency>`
```

### 3.2. 创建自定义过滤器

**想法是从请求中获取HTTP API密钥头，然后检查与我们配置的秘密。** **在这种情况下，我们需要在Spring Security配置类中添加一个自定义过滤器。**

我们将从实现_GenericFilterBean_开始。_GenericFilterBean_是一个简单的_javax.servlet.Filter_实现，它是Spring感知的。

让我们创建_AuthenticationFilter_类：

```java
public class AuthenticationFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
        throws IOException, ServletException {
        try {
            Authentication authentication = AuthenticationService.getAuthentication((HttpServletRequest) request);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception exp) {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
            PrintWriter writer = httpResponse.getWriter();
            writer.print(exp.getMessage());
            writer.flush();
            writer.close();
        }

        filterChain.doFilter(request, response);
    }
}
```

我们只需要实现一个_doFilter()_方法。在这个方法中，我们评估API密钥头，并将结果_Authentication_对象设置到当前_SecurityContext_实例中。

然后，请求被传递到其余的过滤器进行处理，然后路由到_DispatcherServlet_，最后到我们的控制器。

我们将评估API密钥和构建_Authentication_对象的任务委托给_AuthenticationService_类：

```java
public class AuthenticationService {

    private static final String AUTH_TOKEN_HEADER_NAME = "X-API-KEY";
    private static final String AUTH_TOKEN = "Baeldung";

    public static Authentication getAuthentication(HttpServletRequest request) {
        String apiKey = request.getHeader(AUTH_TOKEN_HEADER_NAME);
        if (apiKey == null || !apiKey.equals(AUTH_TOKEN)) {
            throw new BadCredentialsException("Invalid API Key");
        }

        return new ApiKeyAuthentication(apiKey, AuthorityUtils.NO_AUTHORITIES);
    }
}
```

在这里，我们检查请求是否包含带有密钥的API密钥头。如果头部是_null_或者不等于密钥，我们抛出一个_BadCredentialsException_。如果请求有头部，它执行认证，将密钥添加到安全上下文，然后将调用传递到下一个安全过滤器。我们的_getAuthentication_方法非常简单——我们只是比较API密钥头和密钥与静态值。

要构建_Authentication_对象，我们必须使用Spring Security通常用于构建标准认证的对象的方法。所以，让我们扩展_AbstractAuthenticationToken_类并手动触发认证。

### 3.3. 扩展_AbstractAuthenticationToken_

**为了成功实现我们应用程序的认证，我们需要将传入的API密钥转换为一个_Authentication_对象，例如一个_AbstractAuthenticationToken_。** _AbstractAuthenticationToken_类实现了_Authentication_接口，表示已认证请求的秘密/主体。

让我们创建_ApiKeyAuthentication_类：

```java
public class ApiKeyAuthentication extends AbstractAuthenticationToken {
    private final String apiKey;

    public ApiKeyAuthentication(String apiKey, Collection`<? extends GrantedAuthority>` authorities) {
        super(authorities);
        this.apiKey = apiKey;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return apiKey;
    }
}
```

_ApiKeyAuthentication_类是一种_AbstractAuthenticationToken_对象，其中_apiKey_信息是从HTTP请求中获取的。我们在构造函数中使用_setAuthenticated(true)_方法。结果，_Authentication_对象包含_apiKey_和_authenticated_字段：

### 3.4. 安全配置

我们可以通过创建一个_SecurityFilterChain_ bean来以编程方式注册我们的自定义过滤器。在这种情况下，**我们需要在_HttpSecurity_实例上使用_addFilterBefore()_方法将_AuthenticationFilter_添加到_UsernamePasswordAuthenticationFilter_类之前。**

让我们创建_SecurityConfig_类：

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry.requestMatchers("/**").authenticated())
            .httpBasic(Customizer.withDefaults())
            .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(new AuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}
```

此外，会话策略设置为_STATELESS_，因为我们将使用REST端点。

### 3.5. _ResourceController_

最后，我们将创建一个带有_/home_映射的_ResourceController_：

```java
@RestController
public class ResourceController {
    @GetMapping("/home")
    public String homeEndpoint() {
        return "Baeldung !";
    }
}
```

### 3.6. 禁用默认自动配置

我们需要丢弃安全自动配置。为此，我们排除_SecurityAutoConfiguration_和_UserDetailsServiceAutoConfiguration_类：

```java
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class, UserDetailsServiceAutoConfiguration.class})
public class ApiKeySecretAuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiKeySecretAuthApplication.class, args);
    }
}
```

现在，应用程序已经准备好进行测试。

## 4. 测试

我们可以使用curl命令来使用受保护的应用程序。

首先，让我们尝试请求_/home_而不提供任何安全凭证：

```shell
curl --location --request GET 'http://localhost:8080/home'
```

我们得到预期的_401 Unauthorized_。

现在让我们请求相同的资源，但提供API密钥和密钥以访问它：

```shell
curl --location --request GET 'http://localhost:8080/home' \
--header 'X-API-KEY: Baeldung'
```

结果，服务器的响应是_200 OK_。

## 5. 结论

在本教程中，我们讨论了REST API安全机制。然后，我们在Spring Boot应用程序中实现了Spring Security，使用API密钥认证机制来保护我们的REST API。

像往常一样，代码示例可以在GitHub上找到。