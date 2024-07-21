---
date: 2022-04-01
category:
  - Spring Cloud Gateway
  - URL Rewrite
tag:
  - Spring Cloud
  - Gateway
  - URL Rewriting
head:
  - - meta
    - name: keywords
      content: Spring Cloud Gateway, URL Rewrite, API Gateway, Microservices
---
# 使用Spring Cloud Gateway进行URL重写

## 1. 引言

Spring Cloud Gateway通常用作一个或多个服务的门面，从而为客户提供了一种更简单的消费服务的方式。

在本教程中，我们将展示通过在将请求发送到后端之前重写URL来定制公开API的不同方式。

## 2. Spring Cloud Gateway快速回顾

Spring Cloud Gateway项目是建立在流行的Spring Boot 2和Project Reactor之上的，因此它继承了其主要特点：

- 由于其响应式特性，资源使用率低
- 支持Spring Cloud生态系统中的所有好处（发现、配置等）
- 使用标准Spring模式易于扩展和/或自定义

我们已经在早期文章中介绍了其主要功能，因此这里我们只列出主要概念：

- **路由（Route）**：一组处理步骤，匹配的传入请求在Gateway中经历
- **谓词（Predicate）**：一个Java 8谓词，它针对ServerWebExchange进行评估。
- **过滤器（Filters）**：GatewayFilter实例，可以检查和/或更改ServerWebExchange。Gateway支持全局过滤器和每个路由的过滤器。

简而言之，这是传入请求经历的处理序列：

- Gateway使用与每个路由关联的谓词来找到将处理请求的路由
- 一旦找到路由，请求（ServerWebExchange实例）就会经过每个配置的过滤器，直到最终被发送到后端。
- 当后端发送响应回来，或者出现错误（例如超时或连接重置）时，过滤器再次有机会处理响应，然后将其发送回客户端。

## 3. 基于配置的URL重写

回到本文的主题，让我们看看如何定义一个路由，在将其发送到后端之前重写传入的URL。例如，假设有一个形式为/api/v1/customer/*的传入请求，后端URL应该是http://v1.customers/api/*。这里，我们使用“*”来表示“此点之后的任何内容”。

**要创建基于配置的重写，我们只需要向应用程序的配置添加一些属性**。这里，我们将使用基于YAML的配置以清晰明了，但这些信息可以来自任何支持的PropertySource：

```
spring:
  cloud:
    gateway:
      routes:
      - id: rewrite_v1
        uri: ${rewrite.backend.uri:http://example.com}
        predicates:
        - Path=/v1/customer/**
        filters:
        - RewritePath=/v1/customer/(?`<segment>`.*),/api/$\{segment}
```

让我们剖析这个配置。首先，我们有路由的id，这只是它的标识符。接下来，我们有由uri属性给出的后端URI。**注意，只有主机名/端口被考虑，因为最终路径来自重写逻辑**。

谓词属性定义了激活此路由必须满足的条件。在我们的例子中，我们使用Path谓词，它采用类似ant的路径表达式与传入请求的路径匹配。

最后，过滤器属性有实际的重写逻辑。**RewritePath过滤器接受两个参数：一个正则表达式和一个替换字符串**。过滤器的实现通过简单地在请求的URI上执行replaceAll()方法，使用提供的参数作为参数。

Spring处理配置文件的一个缺点是我们不能使用标准的${group}替换表达式，因为Spring会认为它是一个属性引用并尝试替换它的值。为了避免这种情况，我们需要在“$”和“{”字符之间添加一个反斜杠，该字符将由过滤器实现在用作实际替换表达式之前删除。

## 4. 基于DSL的URL重写

虽然RewritePath非常强大且易于使用，但它在重写规则具有一些动态方面的场景中不足。根据情况，可能仍然可以使用谓词作为每个规则分支的守卫来编写多个规则。

**然而，如果不是这种情况，我们可以使用基于DSL的方法创建路由**。我们所要做的就是创建一个实现路由逻辑的RouteLocator bean。例如，让我们创建一个简单的路由，像以前一样使用正则表达式重写传入的URI。这一次，替换字符串将在每个请求上动态生成：

```
@Configuration
public class DynamicRewriteRoute {
    @Value("${rewrite.backend.uri}")
    private String backendUri;
    private static Random rnd = new Random();

    @Bean
    public RouteLocator dynamicZipCodeRoute(RouteLocatorBuilder builder) {
        return builder.routes()
          .route("dynamicRewrite", r -> 
             r.path("/v2/zip/**")
              .filters(f -> f.filter((exchange, chain) -> {
                  ServerHttpRequest req = exchange.getRequest();
                  addOriginalRequestUrl(exchange, req.getURI());
                  String path = req.getURI().getRawPath();
                  String newPath = path.replaceAll(
                    "/v2/zip/(?`<zipcode>`.*)",
                    "/api/zip/${zipcode}-" + String.format("%03d", rnd.nextInt(1000)));
                  ServerHttpRequest request = req.mutate().path(newPath).build();
                  exchange.getAttributes().put(GATEWAY_REQUEST_URL_ATTR, request.getURI());
                  return chain.filter(exchange.mutate().request(request).build());
              })) 
              .uri(backendUri))
          .build();
    }
}
```

这里，动态部分只是附加到替换字符串的随机数。实际应用可能具有更复杂的逻辑，但基本机制将与所示相同。

关于这段代码经历的步骤的一些评论：首先，它调用了来自ServerWebExchangeUtils类的addOriginalRequestUrl()，以在交换的属性GATEWAY_ORIGINAL_REQUEST_URL_ATTR下存储原始URL。这个属性的值是一个列表，我们将在进行任何修改之前将接收到的URL添加到其中，并由网关内部作为X-Forwarded-For头处理的一部分使用。

其次，一旦我们应用了重写逻辑，我们必须将修改后的URL保存在GATEWAY_REQUEST_URL_ATTR交换属性中。**这一步在文档中没有直接提到，但它确保了我们的自定义过滤器与其他可用过滤器很好地配合使用。**

## 5. 测试

为了测试我们的重写规则，我们将使用标准的JUnit 5类，但有一点小变化：我们将启动一个基于Java SDK的com.sun.net.httpserver.HttpServer类的简单服务器。服务器将在一个随机端口上启动，从而避免端口冲突。

**这种方法的缺点是，我们必须找出实际分配给服务器的端口，然后将其传递给Spring，以便我们可以使用它来设置路由的uri属性**。幸运的是，Spring为我们提供了一个优雅的解决方案：@DynamicPropertySource。在这里，我们将使用它来启动服务器并注册一个带有绑定端口值的属性：

```
@DynamicPropertySource
static void registerBackendServer(DynamicPropertyRegistry registry) {
    registry.add("rewrite.backend.uri", () -> {
        HttpServer s = startTestServer();
        return "http://localhost:" + s.getAddress().getPort();
    });
}
```

测试处理程序简单地在响应体中回响接收到的URI。这使我们能够验证重写规则是否按预期工作。例如，这是：

```
@Test
void testWhenApiCall_thenRewriteSuccess(@Autowired WebTestClient webClient) {
    webClient.get()
      .uri("http://localhost:" + localPort + "/v1/customer/customer1")
      .exchange()
      .expectBody()
      .consumeWith((result) -> {
          String body = new String(result.getResponseBody());
          assertEquals("/api/customer1", body);
      });
}
```

## 6. 结论

在这个快速教程中，我们展示了使用Spring Cloud Gateway库重写URL的不同方式。像往常一样，所有代码都可以在GitHub上找到。