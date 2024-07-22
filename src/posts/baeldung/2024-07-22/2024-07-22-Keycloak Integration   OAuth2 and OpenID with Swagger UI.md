---
date: 2022-01-01
category:
  - Keycloak
  - OAuth2
  - OpenID
  - Swagger UI
tag:
  - Integration
  - Security
  - REST API
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: Keycloak, OAuth2, OpenID, Swagger UI, REST API, Spring Boot, Security, Integration
---
# Keycloak集成 - 使用Swagger UI的OAuth2和OpenID

在本教程中，我们将重点介绍如何使用Keycloak对REST服务进行身份验证和授权，并使用Swagger UI进行测试。

## 2. 挑战

像其他Web资源一样，REST API通常需要安全保护。因此，服务消费者（例如Swagger UI）不仅需要处理HTTP调用本身，还需要向服务提供商提供身份验证信息。

Keycloak是一个IAM服务器，允许在服务提供商的实现之外进行身份验证和授权。它是架构的一部分，如下所示：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/oauth.svg)

首先，我们需要安装Keycloak服务器，并将其实现在Spring Boot应用程序中作为REST服务提供商。然后，我们需要扩展Swagger UI。

## 3. 集成Swagger UI

要在spring-boot和swagger-ui之间进行集成，请将库添加到项目依赖列表中（无需额外配置）：

```xml
`<dependency>`
    `<groupId>`org.springdoc`</groupId>`
    `<artifactId>`springdoc-openapi-starter-webmvc-ui`</artifactId>`
    `<version>`2.5.0`</version>`
`</dependency>`
```

## 4. 使用标准

对于特定供应商的代码扩展Swagger UI，只有在特殊情况下才有意义。因此，我们应该优先使用供应商中立的标准。以下部分将描述如何实现这一点。

### 4.1. 现有标准

首先，我们需要知道存在哪些标准。对于身份验证和授权，有一个像OAuth2这样的协议。对于单点登录（SSO），我们可以使用OpenID Connect（OIDC）作为OAuth2的扩展。

描述REST API的标准是OpenAPI。这个标准包括定义多种安全方案，包括OAuth2和OIDC：

```yaml
paths:
  /api/v1/products:
    get:
      ...
      security:
        - my_oAuth_security_schema:
          - read_access
...
securitySchemes:
  my_oAuth_security_schema:
    type: oauth2
    flows:
      implicit:
        authorizationUrl: https://api.example.com/oauth2/authorize
        scopes:
          read_access: 读取数据
          write_access: 修改数据
```

### 4.2. 扩展服务提供商

在代码优先的方法中，服务提供商可以根据代码生成OpenAPI文档。因此，安全方案也必须以这种方式提供。例如，使用Spring Boot，包括SpringDoc，我们可以编写这样的配置类：

```java
@Configuration
public class OpenAPISecurityConfig {

    @Value("${keycloak.auth-server-url}")
    String authServerUrl;
    @Value("${keycloak.realm}")
    String realm;

    private static final String OAUTH_SCHEME_NAME = "my_oAuth_security_schema";

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().components(new Components()
            .addSecuritySchemes(OAUTH_SCHEME_NAME, createOAuthScheme()))
            .addSecurityItem(new SecurityRequirement().addList(OAUTH_SCHEME_NAME))
            .info(new Info().title("Todos Management Service")
                .description("A service providing todos.")
                .version("1.0"));
    }

    private SecurityScheme createOAuthScheme() {
        OAuthFlows flows = createOAuthFlows();
        return new SecurityScheme().type(SecurityScheme.Type.OAUTH2)
            .flows(flows);
    }

    private OAuthFlows createOAuthFlows() {
        OAuthFlow flow = createAuthorizationCodeFlow();
        return new OAuthFlows().implicit(flow);
    }

    private OAuthFlow createAuthorizationCodeFlow() {
        return new OAuthFlow()
            .authorizationUrl(authServerUrl + "/realms/" + realm + "/protocol/openid-connect/auth")
            .scopes(new Scopes().addString("read_access", "read data")
                .addString("write_access", "modify data"));
    }

}
```

当然，使用其他技术将导致不同的实现。但我们应该始终意识到需要生成的OpenAPI。

### 4.3. 扩展服务消费者

Swagger UI默认支持OpenAPI身份验证方案 - 无需自定义。我们将获得一个认证的可能性：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/swagger-ui-auth.png)

其他客户端将有不同的解决方案。例如，有一个为Angular应用程序提供的NPM模块，以简单直接的方式提供OAuth2和OpenID Connect（OIDC）。

## 5. 从SwaggerUI测试端点

按照本文提供的配置，您应该已经配置了一个能够登录应用程序的用户。为了使用swagger-UI，您还应该配置客户端（_login-app_）并启用_隐式流身份验证方法_：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/implicit-flow-1024x338.png)

您还需要通过首先在_Client Scope_会话中创建作用域来链接应用程序作用域（读取和写入）：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/scopes-creation-1024x564.png)

然后将它们添加到应用程序的启用作用域列表中：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/add-scopes.png)

现在，您将能够在swagger-ui应用程序中使用正确的作用域进行身份验证，该应用程序可在地址http://localhost:8081/swagger-ui/index.html访问：

![img](https://www.baeldung.com/wp-content/uploads/2022/01/auhtorized-swagger.png)

最后，我们可以点击swagger中定义的控制器端点：

## 6. 结论

在本文中，我们指出了在使用Keycloak作为IAM的情况下，使用Swagger UI测试REST服务的可能性。最佳解决方案是使用OpenAPI、OAuth2和OpenID Connect等标准，这些工具都支持。

如常，所有代码都可以在GitHub上找到。