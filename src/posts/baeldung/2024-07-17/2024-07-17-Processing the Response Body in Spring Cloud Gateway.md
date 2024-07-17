---
date: 2022-04-01
category:
  - Spring Cloud Gateway
  - Web Development
tag:
  - Spring Cloud Gateway
  - API Gateway
  - Response Body Manipulation
  - Java
  - Reactive Programming
head:
  - - meta
    - name: keywords
      content: Spring Cloud Gateway, API Gateway, Response Body Manipulation, Java, Reactive Programming
------
# 1. 引言

在本教程中，我们将探讨如何使用 Spring Cloud Gateway 在将响应体发送回客户端之前对其进行检查和/或修改。

# 2. Spring Cloud Gateway 快速回顾

Spring Cloud Gateway，简称 SCG，是 Spring Cloud 家族的一个子项目，它提供了一个基于反应式 Web 堆栈构建的 API 网关。我们之前已经在早期教程中介绍了其基本用法，因此这里不会再涉及这些方面。

**相反，这次我们将专注于在围绕 API 网关设计解决方案时偶尔会出现的一个特定使用场景：如何在将响应发送回客户端之前处理后端响应有效载荷？**

以下是我们可能需要使用此功能的一些情况：
- 在允许后端发展的同时保持与现有客户端的兼容性
- 根据像 PCI 或 GDPR 这样的法规要求，屏蔽某些字段

更具体地说，满足这些要求意味着我们需要实现一个过滤器来处理后端响应。由于过滤器是 SCG 的核心概念，我们所需要做的只是实现一个自定义过滤器，应用所需的转换。

此外，一旦我们创建了我们的过滤器组件，我们可以将其应用于任何声明的路由。

# 3. 实现数据清洗过滤器

为了更好地说明响应体操作的工作原理，让我们创建一个简单的过滤器，用于屏蔽基于 JSON 的响应中的值。例如，给定一个具有名为“ssn”的字段的 JSON：
```json
{
  "name" : "John Doe",
  "ssn" : "123-45-9999",
  "account" : "9999888877770000"
}
```

我们希望用一个固定的值替换它们，从而防止数据泄露：
```json
{
  "name" : "John Doe",
  "ssn" : "****",
  "account" : "9999888877770000"
}
```

### 3.1. 实现 _GatewayFilterFactory_

_GatewayFilterFactory_ 顾名思义，是特定时间过滤器的工厂。在启动时，Spring 会查找任何使用 _@Component_ 注解的类，这些类实现了这个接口。然后它会构建一个可用过滤器的注册表，我们可以在声明路由时使用：

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: rewrite_with_scrub
        uri: ${rewrite.backend.uri:http://example.com}
        predicates:
        - Path=/v1/customer/**
        filters:
        - RewritePath=/v1/customer/(?`<segment>`.*),/api/$\{segment}
        - ScrubResponse=ssn,***
```

**注意，当使用基于配置的方法定义路由时，根据 SCG 的预期命名约定命名我们的工厂非常重要**：_FilterNameGatewayFilterFactory_。考虑到这一点，我们将我们的工厂命名为 _ScrubResponseGatewayFilterFactory._

SCG 已经有几个实用类，我们可以使用它们来实现这个工厂。这里，我们将使用一个通常由现成过滤器使用的类：_AbstractGatewayFilterFactory`<T>`_，这是一个模板基类，其中 T 代表与我们的过滤器实例关联的配置类。在我们的情况下，我们只需要两个配置属性：
- _fields_：用于匹配字段名称的正则表达式
- _replacement_：将替换原始值的字符串

**我们必须实现的关键方法是 _apply()_**。SCG 会为使用我们过滤器的每个路由定义调用此方法。例如，在上述配置中，由于只有一个路由定义，_apply()_ 将只被调用一次。

在我们的情况下，实现非常简单：
```java
@Override
public GatewayFilter apply(Config config) {
    return modifyResponseBodyFilterFactory
       .apply(c -> c.setRewriteFunction(JsonNode.class, JsonNode.class, new Scrubber(config)));
}
```

在这个例子中，它之所以简单，是因为我们使用了另一个内置过滤器 _ModifyResponseBodyGatewayFilterFactory_，我们将所有与解析和类型转换相关的繁重工作委托给它。我们使用构造函数注入来获取这个工厂的实例，在 _apply()_ 中，我们将创建 _GatewayFilter_ 实例的任务委托给它。

**关键是使用 _apply()_ 方法的变体，它不是接受一个配置对象，而是期望一个配置的 _Consumer_**。同样重要的是，这个配置是 _ModifyResponseBodyGatewayFilterFactory_ 的一个。这个配置对象提供了我们在代码中调用的 _setRewriteFunction()_ 方法。

### 3.2. 使用 _setRewriteFunction()_

现在，让我们更深入地了解 _setRewriteFunction()_。

这个方法接受三个参数：两个类（输入和输出）和一个可以转换输入类型到输出类型的函数。在我们的情况下，我们没有转换类型，因此输入和输出都使用相同的类：_JsonNode_。这个类来自 Jackson 库，是用于表示 JSON 中不同节点类型（如对象节点、数组节点等）的类层次结构的顶部。使用 _JsonNode_ 作为输入/输出类型允许我们处理任何有效的 JSON 负载，这正是我们想要的。

对于转换器类，我们传递一个我们的 _Scrubber_ 的实例，它在其 _apply()_ 方法中实现了所需的 _RewriteFunction_ 接口：

```java
public static class Scrubber implements RewriteFunction``<JsonNode, JsonNode>`` {
    // ... 字段和构造函数省略
    @Override
    public Publisher`<JsonNode>` apply(ServerWebExchange t, JsonNode u) {
        return Mono.just(scrubRecursively(u));
    }
    // ... 清洗实现省略
}
```

_apply()_ 传递的第一个参数是当前的 _ServerWebExchange_，它为我们提供了到目前为止的请求处理上下文。我们这里不会使用它，但知道我们有这个能力是好的。下一个参数是已经转换为通知的类的接收体。

预期的返回是一个实例的 _Publisher_，这些实例是通知的输出类。因此，只要我们不做任何阻塞 I/O 操作，我们可以在重写函数中做一些复杂的工作。

### 3.3. _Scrubber_ 实现

现在我们知道了重写函数的合同，让我们最终实现我们的清洗逻辑。**这里，我们假设负载相对较小，所以我们不必担心存储接收到的对象的内存需求**。

它的实现只是递归地遍历所有节点，查找匹配配置模式的属性，并将相应的值替换为掩码：

```java
public static class Scrubber implements RewriteFunction``<JsonNode, JsonNode>`` {
    // ... 字段和构造函数省略
    private JsonNode scrubRecursively(JsonNode u) {
        if (!u.isContainerNode()) {
            return u;
        }

        if (u.isObject()) {
            ObjectNode node = (ObjectNode)u;
            node.fields().forEachRemaining(f -> {
                if (fields.matcher(f.getKey()).matches() && f.getValue().isTextual()) {
                    f.setValue(TextNode.valueOf(replacement));
                } else {
                    f.setValue(scrubRecursively(f.getValue()));
                }
            });
        } else if (u.isArray()) {
            ArrayNode array = (ArrayNode)u;
            for (int i = 0; i `< array.size(); i++) {
                array.set(i, scrubRecursively(array.get(i)));
            }
        }

        return u;
    }
}
```

# 4. 测试

我们在示例代码中包含了两个测试：一个简单的单元测试和一个集成测试。第一个只是一个常规的 JUnit 测试，用作对清洗器的健全性检查。**集成测试更有趣，因为它展示了 SCG 开发环境中的有用技术**。

首先，有一个提供实际后端的问题，可以发送消息。一种可能性是使用像 Postman 或类似工具，这在典型的 CI/CD 场景中会带来一些问题。相反，我们将使用 JDK 的鲜为人知的 _HttpServer_ 类，它实现了一个简单的 HTTP 服务器。

```java
@Bean
public HttpServer mockServer() throws IOException {
    HttpServer server = HttpServer.create(new InetSocketAddress(0),0);
    server.createContext("/customer", (exchange) ->` {
        exchange.getResponseHeaders().set("Content-Type", "application/json");

        byte[] response = JSON_WITH_FIELDS_TO_SCRUB.getBytes("UTF-8");
        exchange.sendResponseHeaders(200,response.length);
        exchange.getResponseBody().write(response);
    });

    server.setExecutor(null);
    server.start();
    return server;
}
```

这个服务器将处理 _/customer_ 的请求，并返回我们在测试中使用的固定 JSON 响应。注意返回的服务器已经启动，并将在随机端口监听传入请求。我们还指示服务器创建一个新的默认 _Executor_ 来管理用于处理请求的线程。

其次，我们以编程方式创建一个包含我们过滤器的路由 _@Bean_。这相当于使用配置属性构建路由，但允许我们完全控制测试路由的所有方面：

```java
@Bean
public RouteLocator scrubSsnRoute(
  RouteLocatorBuilder builder,
  ScrubResponseGatewayFilterFactory scrubFilterFactory,
  SetPathGatewayFilterFactory pathFilterFactory,
  HttpServer server) {
    int mockServerPort = server.getAddress().getPort();
    ScrubResponseGatewayFilterFactory.Config config = new ScrubResponseGatewayFilterFactory.Config();
    config.setFields```java
    config.setFields("ssn");
    config.setReplacement("*");

    SetPathGatewayFilterFactory.Config pathConfig = new SetPathGatewayFilterFactory.Config();
    pathConfig.setTemplate("/customer");

    return builder.routes()
      .route("scrub_ssn",
         r -> r.path("/scrub")
           .filters(
              f -> f
                .filter(scrubFilterFactory.apply(config))
                .filter(pathFilterFactory.apply(pathConfig)))
           .uri("http://localhost:" + mockServerPort ))
      .build();
}

```

最后，有了这些 beans 现在成为 _@TestConfiguration_ 的一部分，我们可以将它们注入到实际的测试中，连同 _WebTestClient_。实际的测试使用这个 _WebTestClient_ 来驱动两者：旋转的 SCG 和后端：

```java
@Test
public void givenRequestToScrubRoute_thenResponseScrubbed() {
    client.get()
      .uri("/scrub")
      .accept(MediaType.APPLICATION_JSON)
      .exchange()
      .expectStatus()
        .is2xxSuccessful()
      .expectHeader()
        .contentType(MediaType.APPLICATION_JSON)
      .expectBody()
        .json(JSON_WITH_SCRUBBED_FIELDS);
}
```

# 5. 结论

在本文中，我们展示了如何使用 Spring Cloud Gateway 库访问后端服务的响应体并对其进行修改。像往常一样，所有代码都可以在 GitHub 上找到。