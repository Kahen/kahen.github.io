---
date: 2022-04-01
category:
  - Spring Security
  - OAuth
tag:
  - OpenAPI
  - JWT
  - Springdoc-OpenAPI
  - Swagger-UI
head:
  - - meta
    - name: keywords
      content: OpenAPI, JWT, Spring Boot, Springdoc-OpenAPI, Swagger-UI
------
# 如何为Spring Boot应用中的OpenAPI配置JWT认证

如果你正在处理Spring Security（尤其是OAuth）实现，一定要看看《Learn Spring Security》课程：

**> > LEARN SPRING**
**SECURITY**

## 1. 概述

OpenAPI 是一种语言无关且平台独立的规范，它标准化了REST API。OpenAPI 使用户能够轻松理解API而无需深入代码。Swagger-UI 基于这个OpenAPI规范生成一个用户界面，帮助可视化和测试REST API。

在本教程中，我们将学习如何生成OpenAPI文档，测试REST API，并使用Springdoc-OpenAPI在Spring Boot应用程序中为我们的OpenAPI配置JWT认证。

## 2. Swagger-UI

Swagger-UI 是一系列HTML、Javascript和CSS文件的集合，它基于OpenAPI规范生成用户界面。**让我们使用Springdoc-OpenAPI库来自动化生成REST API的OpenAPI文档**，并使用Swagger-UI来可视化这些API。

当应用程序中的API数量不断增加时，编写OpenAPI文档规范可能会变得具有挑战性。Springdoc-OpenAPI帮助我们自动生成OpenAPI文档。进一步地，让我们尝试使用这个库并生成OpenAPI文档。

### 2.1. 依赖项

首先，让我们通过添加Springdoc-OpenAPI依赖项开始：

```xml
`<dependency>`
    `<groupId>`org.springdoc`</groupId>`
    `<artifactId>`springdoc-openapi-ui`</artifactId>`
    `<version>`1.7.0`</version>`
`</dependency>`
```

这个依赖项还会将Swagger-UI web-jars添加到我们的Spring Boot应用程序中。

### 2.2. 配置

接下来，让我们启动应用程序并在浏览器中访问URL _http://localhost:8080/swagger-ui.html_。

结果，我们得到了Swagger-UI页面：

### ![img](https://www.baeldung.com/wp-content/uploads/2022/06/swagger-1-1-1024x264.png)

**同样，_OpenAPI v3.0_文档将在_http://localhost:8080/v3/api-docs_中可用。**

此外，让我们使用 _@OpenAPIDefinition_ 为我们的 _User_ API添加描述、服务条款和其他元信息：

```java
@Configuration
@OpenAPIDefinition(
  info =@Info(
    title = "User API",
    version = "${api.version}",
    contact = @Contact(
      name = "Baeldung", email = "user-apis@baeldung.com", url = "https://www.baeldung.com"
    ),
    license = @License(
      name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"
    ),
    termsOfService = "${tos.uri}",
    description = "${api.description}"
  ),
  servers = @Server(
    url = "${api.server.url}",
    description = "Production"
  )
)
public class OpenAPISecurityConfiguration {}
```

我们也可以外部化配置和元信息。例如，在 _application.properties_ 或 _application.yaml_ 文件中定义 _api.version_、_tos.uri_ 和 _api.description_。

### 2.3. 测试

最后，让我们测试Swagger-UI并检查OpenAPI文档。

为此，启动应用程序并打开URL _http://localhost:8080/swagger-ui/index.html_ 以查看Swagger-UI：

 ![img](https://www.baeldung.com/wp-content/uploads/2022/06/swagger-config-1024x230.png)

同样，OpenAPI文档将在 _http://localhost:8080/v3/api-docs_ 可用：

```json
{
    "openapi": "3.0.1",
    "info": {
      "title": "User API",
      "termsOfService": "terms-of-service",
     ...
     ...
}
```

Springdoc-OpenAPI根据我们的应用程序REST API生成文档。此外，可以使用Springdoc-OpenAPI注解自定义此文档。

在本节中，让我们学习如何为我们的OpenAPI配置基于JWT的认证。

我们可以按操作、类或全局级别为OpenAPI配置JWT认证。

### 3.1. 按操作配置

首先，让我们只对特定操作声明JWT认证。让我们定义此配置：

```java
@Configuration
@SecurityScheme(
  name = "Bearer Authentication",
  type = SecuritySchemeType.HTTP,
  bearerFormat = "JWT",
  scheme = "bearer"
)
public class OpenAPI30Configuration {}
```

_@SecurityScheme_ 注解将 _securitySchemes_ 添加到OneAPI规范的 _components_ 部分。_@SecurityScheme_ 定义了我们的API可以使用的安全机制。**支持的安全方案是 _APIKey_、_HTTP认证（基本和承载）_、_OAuth2_ 和 _OpenID Connect_**。在这种情况下，让我们使用 _HTTP承载认证_ 作为我们的安全方案。

**对于基于HTTP承载令牌的认证，我们需要选择安全方案为 _bearerAuth_ 并承载格式为 _JWT_。**

由于我们只想保护特定的操作，我们需要指定需要认证的操作。对于操作级认证，我们应该在操作上使用 _@SecurityRequirement_ 注解：

```java
@Operation(summary = "Delete user", description = "Delete user")
@SecurityRequirement(name = "Bearer Authentication")
@DeleteMapping
description = "A JWT token is required to access this API...",
public String deleteUser(Authentication authentication) {}
```

有了这些配置，让我们重新部署应用程序并访问URL _http://localhost:8080/swagger-ui.html_：

 ![img](https://www.baeldung.com/wp-content/uploads/2022/06/operation-1024x239.png)

点击 ![img](https://www.baeldung.com/wp-content/uploads/2022/06/lock.png) 图标会打开一个登录对话框，用户可以提供访问令牌以调用操作：

 ![img](https://www.baeldung.com/wp-content/uploads/2022/06/auth-modal.png)

对于这个示例，可以通过向 _authentication_ API 提供 _john/password_ 或 _jane/password_ 来获取JWT令牌。一旦我们获得JWT令牌，我们可以将其输入到 _value_ 文本框中，然后点击 _Authorize_ 按钮和 _Close_ 按钮：

有了JWT令牌，让我们调用 _deleteUser_ API：

结果，我们看到操作将提供JWT令牌，如图标所示，Swagger-UI将此令牌作为HTTP承载在 _Authorization_ 头中提供。最后，有了这些配置，我们可以成功调用受保护的 _deleteUser_ API。

到目前为止，我们已经配置了操作级安全配置。同样，让我们检查OpenAPI JWT安全类和全局配置。

### 3.2. 类级别配置

同样，我们可以为包含所有API的类提供OpenAPI认证。通过在包含所有API的类上声明 _@SecurityRequirement_ 注解。这样做将为该特定类中的所有API提供认证：

```java
@RequestMapping("/api/user")
@RestController
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "User", description = "The User API. Contains all the operations that can be performed on a user.")
public class UserApi {}
```

因此，此配置启用了类 _UserApi_ 中所有操作的安全性。结果，假设该类有两个操作，Swagger-UI看起来像这样：

### 3.3. 全局配置

通常，我们更喜欢将OpenAPI认证应用于应用程序中的所有API。**在这些情况下，我们可以使用Spring _@Bean_ 注解在全局级别声明安全性**：

```java
@Configuration
public class OpenAPI30Configuration {
@Bean
public OpenAPI customizeOpenAPI() {
    final String securitySchemeName = "bearerAuth";
    return new OpenAPI()
      .addSecurityItem(new SecurityRequirement()
        .addList(securitySchemeName))
      .components(new Components()
        .addSecuritySchemes(securitySchemeName, new SecurityScheme()
          .name(securitySchemeName)
          .type(SecurityScheme.Type.HTTP)
          .scheme("bearer")
          .bearerFormat("JWT")));
}
```

有了这个全局配置，Springdoc-OpenAPI将为应用程序中的所有OpenAPI配置JWT认证：

让我们尝试调用GET API：

最终，我们得到 _HTTP 401 Unauthorized._ API是安全的，我们还没有提供JWT令牌。接下来，让我们提供JWT令牌并检查行为。

点击 _Authorize_ 按钮并提供JWT令牌以调用操作。我们可以从Swagger控制台中提供的认证API获取承载令牌：

最后，有了JWT令牌配置，让我们重新调用API：

在这一点上，有了正确的JWT令牌，我们可以成功调用我们的安全API。

## 4. 结论

在本教程中，我们学习了如何为我们的OpenAPI配置JWT认证。Swagger-UI提供了一个工具，根据OneAPI规范来记录和测试REST API。Swaggerdoc-OpenAPI工具帮助我们根据我们Spring Boot应用程序中的REST API生成此规范。

如往常一样，完整的源代码可以在GitHub上找到。