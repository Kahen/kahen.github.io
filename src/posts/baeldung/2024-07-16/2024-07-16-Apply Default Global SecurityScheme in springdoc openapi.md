---
date: 2022-07-01
category:
  - Spring
  - Spring Boot
tag:
  - springdoc-openapi
  - API Security
head:
  - - meta
    - name: keywords
      content: Spring, Spring Boot, springdoc-openapi, API Security, Global Security Scheme
---
# 在springdoc-openapi中应用默认全局安全方案

在本教程中，我们将学习如何使用springdoc-openapi库在Spring MVC Web应用程序中配置默认的全局安全方案，并将其应用为API的默认安全需求。此外，我们将讨论如何覆盖这些默认的安全需求。

OpenAPI规范允许我们为API定义一组安全方案。我们可以全局配置API的安全需求，或者按端点应用/移除它们。

## 2. 设置

由于我们正在使用Spring Boot构建Maven项目，让我们探索项目的设置。在本节结束时，我们将拥有一个简单的Web应用程序。

### 2.1. 依赖项

示例有两个依赖项。第一个依赖项是spring-boot-starter-web。这是构建Web应用程序的主要依赖项：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
    ``<version>``3.1.5``</version>``
``</dependency>``
```

另一个依赖项是springdoc-openapi-ui，这是将API文档以HTML、JSON或YAML格式呈现的库：

```xml
``<dependency>``
    ``<groupId>``org.springdoc``</groupId>``
    ``<artifactId>``springdoc-openapi-ui``</artifactId>``
    ``<version>``1.7.0``</version>``
``</dependency>``
```

### 2.2. 应用程序入口点

一旦依赖项准备就绪，让我们定义应用程序的入口点。

我们将使用@SpringBootApplication注解来引导应用程序，并使用SpringApplication帮助类来启动它：

```java
@SpringBootApplication
public class DefaultGlobalSecuritySchemeApplication {
    public static void main(String[] args) {
        SpringApplication.run(DefaultGlobalSecuritySchemeApplication.class, args);
    }
}
```

## 3. springdoc-openapi基础配置

一旦我们配置了Spring MVC，让我们看看API的语义信息。

我们将通过向DefaultGlobalSecuritySchemeApplication类添加springdoc-openapi注解来定义默认的全局安全方案和API元数据。要定义全局安全方案，我们将使用@SecurityScheme注解：

```java
@SecurityScheme(type = SecuritySchemeType.APIKEY, name = "api_key", in = SecuritySchemeIn.HEADER)
```

我们选择了APIKEY安全方案类型，但我们也可以配置其他安全方案，例如JWT。在定义安全方案之后，我们将添加元数据并建立API的默认安全需求。我们使用@OpenApiDefinition注解来完成这个操作：

```java
@OpenAPIDefinition(info = @Info(title = "在springdoc-openapi中应用默认全局安全方案", version = "1.0.0"), security = { @SecurityRequirement(name = "api_key") })
```

在这里，_info_属性定义了API元数据。此外，_security_属性确定了默认的全局安全需求。

让我们看看带有注解的HTML文档是什么样子。我们将看到元数据和将适用于整个API的安全按钮：

![img](https://www.baeldung.com/wp-content/uploads/2022/07/default_global_security_requirement.png)

## 4. 控制器

现在我们已经配置了Spring框架和springdoc-openapi库，让我们向上下文基础路径添加一个REST控制器。为此，我们将使用@RestController和@RequestMapping注解：

```java
@RestController
@RequestMapping("/")
public class DefaultGlobalSecuritySchemeOpenApiController {
    ...
}
```

之后，我们将定义两个端点或路径。

第一个端点将是/login端点。它将接收用户凭据并验证用户身份。如果身份验证成功，端点将返回一个令牌。

API的另一个端点是/ping端点，它需要由/login方法生成的令牌。在执行请求之前，方法验证令牌并检查用户是否被授权。

总结来说，/login端点验证用户身份并提供令牌。/ping端点接收由/login端点返回的令牌，并检查它是否有效以及用户是否可以执行操作。

### 4.1. login()方法

这个方法没有任何安全需求。因此，我们需要覆盖默认的安全需求配置。

首先，我们需要告诉Spring这是我们API的一个端点，所以我们将添加@RequestMapping注解来配置端点：

```java
@RequestMapping(method = RequestMethod.POST, value = "/login", produces = { "application/json" }, consumes = { "application/json" })
```

之后，我们需要向端点添加语义信息。因此，我们将使用@Operation和@SecurityRequirements注解。@Operation将定义端点，而@SecurityRequirements将定义适用于端点的特定安全需求集：

```java
@Operation(operationId = "login", responses = {
    @ApiResponse(responseCode = "200", description = "在受保护的ping端点中使用的api_key", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = TokenDto.class)) }),
    @ApiResponse(responseCode = "401", description = "未授权请求", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationExceptionDto.class)) }) })
@SecurityRequirements()
```

例如，这是状态码为200的响应的HTML文档：

![img](https://www.baeldung.com/wp-content/uploads/2022/07/login_response_status_code_200.png)

最后，让我们看看login()方法的签名：

```java
public ResponseEntity login(@Parameter(name = "LoginDto", description = "登录") @Valid @RequestBody(required = true) LoginDto loginDto) {
    ...
}
```

正如我们所看到的，API请求的正文接收一个LoginDto实例。我们还需要用语义信息装饰DTOs，以便在文档中显示信息：

```java
public class LoginDto {
    private String user;
    private String pass;

    ...

    @Schema(name = "user", required = true)
    public String getUser() {
        return user;
    }

    @Schema(name = "pass", required = true)
    public String getPass() {
        return pass;
    }
}
```

在这里我们可以看到/login端点HTML文档的样子：

![img](https://www.baeldung.com/wp-content/uploads/2022/07/login_execute.png)

### 4.2. ping()方法

此时，我们将定义ping()方法。ping()方法将使用默认的全局安全方案：

```java
@Operation(operationId = "ping", responses = {
    @ApiResponse(responseCode = "200", description = "需要在头部包含api_key属性的Ping", content = {
        @Content(mediaType = "application/json", schema = @Schema(implementation = PingResponseDto.class), examples = { @ExampleObject(value = "{ pong: '2022-06-17T18:30:33.465+02:00' }") }) }),
    @ApiResponse(responseCode = "401", description = "未授权请求", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationExceptionDto.class)) }),
    @ApiResponse(responseCode = "403", description = "禁止请求", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationExceptionDto.class)) }) })
@RequestMapping(method = RequestMethod.GET, value = "/ping", produces = { "application/json" })
public ResponseEntity ping(@RequestHeader(name = "api_key", required = false) String api_key) {
    ...
}
```

login()和ping()方法之间的主要区别在于将应用的安全需求。login()根本没有安全需求，但ping()方法将具有在API级别定义的安全。因此，HTML文档将只对/ping端点显示锁：

![img](https://www.baeldung.com/wp-content/uploads/2022/07/ping_endpoint.png)

## 5. REST API文档URL

此时，我们的Spring MVC Web应用程序已经准备好，我们可以启动服务器：

```shell
mvn spring-boot:run -Dstart-class="com.baeldung.defaultglobalsecurityscheme.DefaultGlobalSecuritySchemeApplication"
```

一旦服务器准备好，我们就可以在之前示例中显示的URL http://localhost:8080/swagger-ui-custom.html 上看到HTML文档。

API定义的JSON版本可以在 http://localhost:8080/api-docs 找到，YAML版本在 http://localhost:8080/api-docs.yaml。

**这些输出可以用来使用swagger-codegen-maven-plugin在不同语言中构建API的客户端或服务器。**

## 6. 结论

在本文中，我们学习了如何使用springdoc-openapi库定义默认的全局安全方案。我们还看到了如何将其作为API的默认安全需求应用。此外，我们学习了如何为特定端点更改默认安全需求。

我们还发现，我们可以使用springdoc-openapi的JSON和YAML输出来自动化代码生成。

像往常一样，本文的完整源代码可在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?