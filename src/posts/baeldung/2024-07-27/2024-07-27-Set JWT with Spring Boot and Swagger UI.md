---
date: 2020-10-01
category:
  - Spring Boot
  - Swagger UI
tag:
  - JWT
  - API
  - Security
head:
  - - meta
    - name: keywords
      content: Spring Boot, Swagger UI, JWT, API, Security
---

# 使用Spring Boot和Swagger UI设置JWT

在本简短教程中，我们将了解如何配置Swagger UI以在调用我们的API时包含JSON Web Token（JWT）。

## 2. Maven依赖项

在这个例子中，我们将使用springdoc-openapi-ui，它包含了开始使用Swagger和Swagger UI所需的所有依赖项。让我们将其添加到我们的_pom.xml_文件中：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.springdoc``</groupId>``
    ``<artifactId>``springdoc-openapi-ui``</artifactId>``
    `<version>`1.7.0`</version>`
``</dependency>``
```

## 3. Swagger配置

首先，我们需要配置JWT的_SecurityScheme_：

```java
private SecurityScheme createAPIKeyScheme() {
    return new SecurityScheme().type(SecurityScheme.Type.HTTP)
        .bearerFormat("JWT")
        .scheme("bearer");
}
```

然后，我们配置我们的OpenAPI bean以包括API信息和安全方案：

```java
@Bean
public OpenAPI openAPI() {
    return new OpenAPI().addSecurityItem(new SecurityRequirement()
        .addList("Bearer Authentication"))
    .components(new Components().addSecuritySchemes
    ("Bearer Authentication", createAPIKeyScheme()))
    .info(new Info().title("My REST API")
        .description("Some custom description of API.")
        .version("1.0").contact(new Contact().name("Sallo Szrajbman")
            .email("www.baeldung.com").url("salloszraj@gmail.com"))
        .license(new License().name("License of API")
            .url("API license URL")));
}
```

## 4. REST控制器

在我们的_ClientsRestController_中，让我们编写一个简单的_getClients_端点以返回客户端列表：

```java
@RestController(value = "/clients")
@Tag(name = "Clients")
public class ClientsRestController {

    @Operation(summary = "This method is used to get the clients.")
    @GetMapping
    public List`<String>` getClients() {
        return Arrays.asList("First Client", "Second Client");
    }
}
```

当我们启动应用程序时，我们可以在_http://localhost:8080/swagger-ui.html_ URL访问Swagger UI。

这是Swagger UI带有_Authorize_按钮的样子：

![img](https://www.baeldung.com/wp-content/uploads/2020/10/swaggerui-1024x516-1.png)

当我们点击Authorize按钮时，Swagger UI将要求输入JWT。

我们需要输入我们的令牌并点击Authorize，从那时起，所有对我们API的请求将自动在HTTP头中包含令牌：

![img](https://www.baeldung.com/wp-content/uploads/2020/10/swagger-authorize-1024x499-1.png)

## 6. 带有JWT的API请求

当我们向我们的API发送请求时，我们可以看到有一个带有我们令牌值的“Authorization”头：

![img](https://www.baeldung.com/wp-content/uploads/2020/10/swagger-get-clients-1024x556-1.png)

## 7. 结论

在本文中，我们看到了Swagger UI如何提供自定义配置来设置JWT，这在处理应用程序授权时可能很有帮助。在Swagger UI中授权后，所有请求将自动包含我们的JWT。

本文的源代码可在GitHub上获得。