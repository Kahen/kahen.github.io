---
date: 2024-06-25
category:
  - Spring Security
  - OAuth
tag:
  - JWT
  - Custom Claims
  - Spring Authorization Server
head:
  - - meta
    - name: keywords
      content: Spring Security, OAuth, JWT, Custom Claims, Spring Authorization Server
---

# 在Spring授权服务器中将权限作为自定义声明添加到JWT访问令牌

如果您正在处理Spring Security（特别是OAuth）实现，一定要看看《Learn Spring Security》课程。

### 1. 概述

将自定义声明添加到JSON Web Token（JWT）访问令牌在许多场景中至关重要。自定义声明允许我们在令牌负载中包含额外的信息。

在本教程中，我们将学习如何在Spring授权服务器中将资源所有者的权限添加到JWT访问令牌。

Spring授权务器是Spring生态系统中的一个新项目，旨在为Spring应用程序提供授权服务器支持。它旨在简化使用熟悉且灵活的Spring编程模型实现OAuth 2.0和OpenID Connect（OIDC）授权服务器的过程。

### 2.1. Maven依赖

首先，我们将导入spring-boot-starter-web、spring-boot-starter-security、spring-boot-starter-test和spring-security-oauth2-authorization-server依赖到pom.xml中：

```xml
`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-web`````</artifactId>`````
    `````<version>`````2.5.4`````</version>`````
`````</dependency>`````
`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-security`````</artifactId>`````
    `````<version>`````2.5.4`````</version>`````
`````</dependency>`````
`````<dependency>`````
    `````<groupId>`````org.springframework.security`````</groupId>`````
    `````<artifactId>`````spring-security-oauth2-authorization-server`````</artifactId>`````
    `````<version>`````0.2.0`````</version>`````
`````</dependency>`````
`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-test`````</artifactId>`````
    `````<version>`````2.5.4`````</version>`````
`````</dependency>`````
```

或者，我们可以将spring-boot-starter-oauth2-authorization-server依赖添加到我们的pom.xml文件中：

```xml
`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-oauth2-authorization-server`````</artifactId>`````
    `````<version>`````3.2.0`````</version>`````
`````</dependency>`````
```

### 2.2. 项目设置

让我们设置Spring授权服务器以发行访问令牌。为了保持简单，我们将使用Spring Security OAuth授权服务器应用程序。

假设我们正在使用GitHub上可用的授权服务器项目。

**在基于Spring Security OAuth2的应用程序中，** **我们可以通过自定义授权服务器中的令牌创建过程来将自定义声明添加到JWT访问令牌中。** 这种类型的声明对于将额外信息注入JWT非常有用，这些信息随后可以由资源服务器或认证和授权流程中的其他组件使用。

### 3.1. 添加基本自定义声明

**我们可以使用_OAuth2TokenCustomizer`<JWTEncodingContext>`_ bean将自定义声明添加到访问令牌中。** 通过使用它，授权服务器发行的每个访问令牌都将填充自定义声明。

让我们在DefaultSecurityConfig类中添加OAuth2TokenCustomizer bean：

```java
@Bean
@Profile("basic-claim")
public OAuth2TokenCustomizer```<JwtEncodingContext>``` jwtTokenCustomizer() {
    return (context) -> {
      if (OAuth2TokenType.ACCESS_TOKEN.equals(context.getTokenType())) {
        context.getClaims().claims((claims) -> {
          claims.put("claim-1", "value-1");
          claims.put("claim-2", "value-2");
        });
      }
    };
}
```

OAuth2TokenCustomizer接口是Spring Security OAuth2库的一部分，用于自定义OAuth 2.0令牌。在这种情况下，它特别在编码过程中自定义JWT令牌。

传递给jwtTokenCustomizer() bean的lambda表达式定义了自定义逻辑。context参数表示令牌编码过程中的JwtEncodingContext。

首先，我们使用context.getTokenType()方法检查正在处理的令牌是否是访问令牌。然后，我们使用context.getClaims()方法获取与正在构建的JWT关联的声明。最后，我们将自定义声明添加到JWT中。

在这个例子中，添加了两个声明（"claim-1"和"claim-2"）及其相应的值（"value-1"和"value-2"）。

### 3.2. 测试自定义声明

对于测试，我们将使用_client_credentials_授权类型。

首先，我们将从RegisteredClient对象中定义_AuthorizationServerConfig_的_client_credentials_授权类型作为授权的授权类型：

```java
@Bean
public RegisteredClientRepository registeredClientRepository() {
    RegisteredClient registeredClient = RegisteredClient.withId(UUID.randomUUID().toString())
      .clientId("articles-client")
      .clientSecret("{noop}secret")
      .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
      .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
      .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
      .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
      .redirectUri("http://127.0.0.1:8080/login/oauth2/code/articles-client-oidc")
      .redirectUri("http://127.0.0.1:8080/authorized")
      .scope(OidcScopes.OPENID)
      .scope("articles.read")
      .build();

    return new InMemoryRegisteredClientRepository(registeredClient);
}
```

然后，让我们在CustomClaimsConfigurationTest类中创建一个测试用例：

```java
@ActiveProfiles(value = "basic-claim")
public class CustomClaimsConfigurationTest {

    private static final String ISSUER_URL = "http://localhost:";
    private static final String USERNAME = "articles-client";
    private static final String PASSWORD = "secret";
    private static final String GRANT_TYPE = "client_credentials";

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int serverPort;

    @Test
    public void givenAccessToken_whenGetCustomClaim_thenSuccess() throws ParseException {
        String url = ISSUER_URL + serverPort + "/oauth2/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(USERNAME, PASSWORD);
        MultiValueMap`<String, String>` params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        HttpEntity<MultiValueMap`<String, String>`> requestEntity = new HttpEntity<>(params, headers);
        ResponseEntity`<TokenDTO>` response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, TokenDTO.class);

        SignedJWT signedJWT = SignedJWT.parse(response.getBody().getAccessToken());
        JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
        Map```<String, Object>``` claims = claimsSet.getClaims();

        assertEquals("value-1", claims.get("claim-1"));
        assertEquals("value-2", claims.get("claim-2"));
    }

    static class TokenDTO {
        @JsonProperty("access_token")
        private String accessToken;
        @JsonProperty("token_type")
        private String tokenType;
        @JsonProperty("expires_in")
        private String expiresIn;
        @JsonProperty("scope")
        private String scope;

        public String getAccessToken() {
            return accessToken;
        }
    }
}
```

让我们浏览测试的关键部分以了解发生了什么：

- 首先构建OAuth2令牌端点的URL。
- 从对令牌端点的POST请求中检索包含TokenDTO类的响应。在这里，我们创建了一个带有标头（基本认证）和参数（授权类型）的HTTP请求实体。
- 使用SignedJWT类解析响应中的访问令牌。同时，我们从JWT中提取声明，并将它们存储在Map```<String, Object>```中。
- 使用JUnit断言断言JWT中的特定声明具有预期值。

**此测试确认了我们的令牌编码过程正常工作，并且我们的声明按预期生成。太棒了！**

此外，我们可以使用curl命令获取访问令牌：

```bash
curl --request POST \
  --url http://localhost:9000/oauth2/token \
  --header 'Authorization: Basic YXJ0aWNsZXMtY2xpZW50OnNlY3JldA==' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials
```

在这里，凭据被编码为客户端ID和客户端密钥的Base64字符串，由单个冒号“:”分隔。

现在，我们可以在_basic-claim_配置文件下运行我们的Spring Boot应用程序。

如果我们获取访问令牌并使用jwt.io对其进行解码，我们会发现令牌体中的测试声明：

```json
{
  "sub": "articles-client",
  "aud": "articles-client",
  "nbf": 1704517985,
  "scope": [
    "articles.read",
    "openid"
  ],
  "iss": "http://auth-server:9000",
  "exp": 1704518285,
  "claim-1": "value-1",
  "iat": 1704517985,
  "claim-2": "value-2"
}
```

正如我们所看到的，测试声明的值符合预期。

## 4.### 4. 将权限作为自定义声明添加到JWT访问令牌

**将权限作为自定义声明添加到JWT访问令牌通常是确保和管理Spring Boot应用程序访问的关键方面。** 在Spring Security中，权限通常由_GrantedAuthority_对象表示，指示用户被允许执行的操作或角色。通过将这些权限作为自定义声明包含在JWT访问令牌中，我们为资源服务器提供了一种方便且标准化的方式来理解用户的权限。

### 4.1. 将权限作为自定义声明添加

首先，我们在_DefaultSecurityConfig_类中使用一个简单的内存用户配置，包含一组权限：

```java
@Bean
UserDetailsService users() {
    UserDetails user = User.withDefaultPasswordEncoder()
      .username("admin")
      .password("password")
      .roles("USER")
      .build();
    return new InMemoryUserDetailsManager(user);
}
```

创建了一个用户名为“_admin_”、密码为“_password_”和角色为“_USER_”的单个用户。

现在，让我们在访问令牌中用这些权限填充自定义声明：

```java
@Bean
@Profile("authority-claim")
public OAuth2TokenCustomizer```<JwtEncodingContext>``` tokenCustomizer(@Qualifier("users") UserDetailsService userDetailsService) {
    return (context) -> {
      UserDetails userDetails = userDetailsService.loadUserByUsername(context.getPrincipal().getName());
      Collection`<? extends GrantedAuthority>` authorities = userDetails.getAuthorities();
      context.getClaims().claims(claims ->
         claims.put("authorities", authorities.stream().map(authority -> authority.getAuthority()).collect(Collectors.toList())));
    };
}
```

首先，我们定义了一个lambda函数来实现_OAuth2TokenCustomizer```<JwtEncodingContext>```_接口。这个函数在编码过程中自定义JWT。

然后，我们从注入的_UserDetailsService_中检索与当前主体（用户）关联的_UserDetails_对象。主体的名称通常是用户名。

在那之后，我们检索与用户关联的_GrantedAuthority_对象集合。

最后，我们从_JwtEncodingContext_中检索JWT声明并应用自定义。它包括向JWT添加一个名为“_authorities_”的自定义声明。此外，这个声明包含了从与用户关联的_GrantedAuthority_对象中获得的权限字符串列表。

### 4.2. 测试权限声明

现在我们已经配置了授权服务器，让我们来测试它。为此，我们将使用GitHub上可用的客户端-服务器项目。

让我们创建一个REST API客户端，它将从访问令牌中获取声明列表：

```java
@GetMapping(value = "/claims")
public String getClaims(
  @RegisteredOAuth2AuthorizedClient("articles-client-authorization-code") OAuth2AuthorizedClient authorizedClient
) throws ParseException {
    SignedJWT signedJWT = SignedJWT.parse(authorizedClient.getAccessToken().getTokenValue());
    JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
    Map```<String, Object>``` claims = claimsSet.getClaims();
    return claims.get("authorities").toString();
}
```

_@RegisteredOAuth2AuthorizedClient_注解在Spring Boot控制器方法中使用，以指示该方法期望有一个使用指定客户端ID注册的OAuth 2.0授权客户端。在这种情况下，客户端ID是“_articles-client-authorization-code_”。

让我们在_authority-claim_配置文件下运行我们的Spring Boot应用程序。

现在，当我们在浏览器中尝试访问_http://127.0.0.1:8080/claims_页面时，我们将自动重定向到_http://auth-server:9000/login_ URL下的OAuth服务器登录页面。

**在提供正确的用户名和密码后，授权服务器将把我们重定向回请求的URL，即声明列表。**

## 5. 结论

总的来说，将自定义声明添加到JWT访问令牌提供了一种强大的机制，用于根据我们应用程序的特定需求定制令牌，并增强我们的身份验证和授权系统的整体安全性和功能。

在本文中，我们学习了如何在Spring授权服务器中将自定义声明和用户权限添加到JWT访问令牌。

如往常一样，完整的源代码可以在GitHub上找到。

OK