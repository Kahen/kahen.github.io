---
date: 2024-06-19
category:
  - Spring WebFlux
  - Reactive Programming
tag:
  - WebFlux
  - Interceptor
  - Headers
head:
  - - meta
    - name: keywords
      content: Spring WebFlux, Interceptor, Reactive Programming, Headers
---
# 如何在 WebFlux 中拦截请求并添加头部信息 | Baeldung

拦截器，也被称为过滤器，是 Spring 的一个特性，允许我们拦截客户端请求。这使我们能够在控制器处理它或向客户端返回响应之前检查和转换请求。

在本教程中，我们将讨论使用 WebFlux 框架拦截客户端请求并添加自定义头部的各种方式。我们首先探索如何为特定端点执行此操作。然后，我们将确定拦截所有传入请求的方法。

我们将使用以下 spring-boot-starter-webflux Maven 依赖项，以支持 Spring 框架的响应式 Web 功能：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-webflux`</artifactId>`
    `<version>`3.1.5`</version>`
`</dependency>`
```

Spring WebFlux 过滤器可以分为 WebFilter 和 HandlerFilterFunction。我们将使用这些过滤器来拦截服务器 Web 请求并添加新的自定义头部或修改现有头部。

### 3.1 使用 WebFilter
WebFilter 是以链式、拦截式的方式处理服务器 Web 请求的约定。**WebFilter 作用于全局，一旦启用，就会拦截所有请求和响应。**

首先，我们应该定义基于注解的控制器：

```java
@GetMapping(value = "/trace-annotated")
public Mono``````<String>`````` trace(@RequestHeader(name = "traceId") final String traceId) {
    return Mono.just("TraceId: ".concat(traceId));
}
```

然后，我们拦截服务器 Web 请求并使用 TraceWebFilter 实现添加一个新的头部 traceId：

```java
@Component
public class TraceWebFilter implements WebFilter {
    @Override
    public Mono``<Void>`` filter(ServerWebExchange exchange, WebFilterChain chain) {
        exchange.getRequest().mutate()
          .header("traceId", "ANNOTATED-TRACE-ID");
        return chain.filter(exchange);
    }
}
```

现在，我们可以使用 WebTestClient 发送 GET 请求到 trace-annotated 端点，并验证响应是否包含我们添加的 traceId 头部值，即 "TraceId: ANNOTATED-TRACE-ID"：

```java
@Test
void whenCallAnnotatedTraceEndpoint_thenResponseContainsTraceId() {
    EntityExchangeResult``````<String>`````` result = webTestClient.get()
      .uri("/trace-annotated")
      .exchange()
      .expectStatus()
      .isOk()
      .expectBody(String.class)
      .returnResult();

    String body = "TraceId: ANNOTATED-TRACE-ID";
    assertEquals(result.getResponseBody(), body);
}
```

**重要的一点是，我们不能像响应头部那样直接修改请求头部，因为请求头部映射是只读的：**

```java
@Override
public Mono``<Void>`` filter(ServerWebExchange exchange, WebFilterChain chain) {
    if (exchange.getRequest().getPath().toString().equals("/trace-exceptional")) {
        exchange.getRequest().getHeaders().add("traceId", "TRACE-ID");
    }
    return chain.filter(exchange); 
}
```

**这种实现会抛出 UnsupportedOperationException。**

让我们使用 WebTestClient 验证过滤器抛出异常，导致在发送 GET 请求到 trace-exceptional 端点后服务器错误：

```java
@GetMapping(value = "/trace-exceptional")
public Mono``````<String>`````` traceExceptional() {
    return Mono.just("Traced");
}
```

```java
@Test
void whenCallTraceExceptionalEndpoint_thenThrowsException() {
    EntityExchangeResult`<Map>` result = webTestClient.get()
      .uri("/trace-exceptional")
      .exchange()
      .expectStatus()
      .is5xxServerError()
      .expectBody(Map.class)
      .returnResult();

    assertNotNull(result.getResponseBody());
}
```

### 3.2 使用 HandlerFilterFunction
在函数式风格中，路由器函数拦截请求并调用适当的处理函数。

我们可以启用零个或多个 HandlerFilterFunction，它们作为过滤 HandlerFunction 的函数。**HandlerFilterFunction 实现仅适用于基于路由器的。**

对于函数式端点，我们需要首先创建一个处理器：

```java
@Component
public class TraceRouterHandler {
    public Mono`````<ServerResponse>````` handle(final ServerRequest serverRequest) {
        String traceId = serverRequest.headers().firstHeader("traceId");

        assert traceId != null;
        Mono``````<String>`````` body = Mono.just("TraceId: ".concat(traceId));
        return ok().body(body, String.class);
    }
}
```

在配置了路由器配置的处理器之后，我们拦截服务器 Web 请求并使用 TraceHandlerFilterFunction 实现添加一个新的头部 traceId：

```java
public RouterFunction`````<ServerResponse>````` routes(TraceRouterHandler routerHandler) {
    return RouterFunctions
      .route(GET("/trace-functional-filter"), routerHandler::handle)
      .filter(new TraceHandlerFilterFunction());
}
```

```java
public class TraceHandlerFilterFunction implements HandlerFilterFunction`<ServerResponse, ServerResponse>` {
    @Override
    public Mono`````<ServerResponse>````` filter(ServerRequest request, HandlerFunction`````<ServerResponse>````` handlerFunction) {
        ServerRequest serverRequest = ServerRequest.from(request)
          .header("traceId", "FUNCTIONAL-TRACE-ID")
          .build();
        return handlerFunction.handle(serverRequest);
    }
}
```

现在，在触发 GET 调用到 trace-functional-filter 端点后，我们可以验证响应是否包含我们添加的 traceId 头部值，即 "TraceId: FUNCTIONAL-TRACE-ID"：

```java
@Test
void whenCallTraceFunctionalEndpoint_thenResponseContainsTraceId() {
    EntityExchangeResult``````<String>`````` result = webTestClient.get()
      .uri("/trace-functional-filter")
      .exchange()
      .expectStatus()
      .isOk()
      .expectBody(String.class)
      .returnResult();

    String body = "TraceId: FUNCTIONAL-TRACE-ID";
    assertEquals(result.getResponseBody(), body);
}
```

### 3.3 使用自定义 Processor 函数
处理器函数类似于路由器函数，它拦截请求并调用适当的处理函数。

功能性路由 API 使我们能够添加零个或多个自定义 Function 实例，这些实例在 HandlerFunction 之前应用。

这个过滤器函数拦截由构建器创建的服务器 Web 请求并添加一个新的头部 traceId：

```java
public RouterFunction`````<ServerResponse>````` routes(TraceRouterHandler routerHandler) {
    return route()
      .GET("/trace-functional-before", routerHandler::handle)
      .before(request -> ServerRequest.from(request)
        .header("traceId", "FUNCTIONAL-TRACE-ID")
        .build())
      .build();
}
```

在发送 GET 请求到 trace-functional-before 端点后，让我们验证响应是否包含我们添加的 traceId 头部值，即 "TraceId: FUNCTIONAL-TRACE-ID"：

```java
@Test
void whenCallTraceFunctionalBeforeEndpoint_thenResponseContainsTraceId() {
    EntityExchangeResult``````<String>`````` result = webTestClient.get()
      .uri("/trace-functional-before")
      .exchange()
      .expectStatus()
      .isOk()
      .expectBody(String.class)
      .returnResult();

    String body = "TraceId: FUNCTIONAL-TRACE-ID";
    assertEquals(result.getResponseBody(), body);
}
```

## 4. 客户端请求拦截和转换
我们将使用 ExchangeFilterFunction 来拦截 Spring WebClient 的客户端请求。

### 4.1 使用 ExchangeFilterFunction
ExchangeFilterFunction 与 Spring WebClient 相关。我们使用它来拦截 WebFlux WebClient 的客户端请求。ExchangeFilterFunction 用于在发送之前或接收之后转换请求或响应。

让我们定义交换过滤器函数以拦截 WebClient 请求并添加一个新的头部 traceId。我们将跟踪所有请求头部以验证 ExchangeFilterFunction：

```java
public ExchangeFilterFunction modifyRequestHeaders(MultiValueMap``<String, String>`` changedMap) {
    return (request, next) -> {
        ClientRequest clientRequest = ClientRequest.from(request)
          .header("traceId", "TRACE-ID")
          .build();
        changedMap.addAll(clientRequest.headers());
        return next.exchange(clientRequest);
    };
}
```

由于我们定义了过滤器函数，然后我们可以将其附加到 WebClient 实例。这只能在我们创建 WebClient 时完成：

```java
public WebClient webclient() {
    return WebClient.builder()
      .filter(modifyRequestHeaders(new LinkedMultiValueMap<>()))
      .build();
}
```

现在，我们可以使用 Wiremock 测试自定义 ExchangeFilterFunction：

```java
@RegisterExtension
static WireMockExtension extension = WireMockExtension.newInstance()
  .options(wireMockConfig().dynamicPort().dynamicHttpsPort())
  .build();
```

```java
@Test
void whenCallEndpoint_thenRequestHeadersModified() {
    extension.stubFor(get("/test").willReturn(aResponse().withStatus(200)
      .withBody("SUCCESS")));

    MultiValueMap``<String, String>`` map = new LinkedMultiValueMap<>();
    
    WebClient webClient = WebClient.builder()
      .filter(modifyRequestHeaders(map))
      .build();
    String receivedResponse = triggerGetRequest(webClient);

    String body = "SUCCESS";
    Assertions.assertEquals(receivedResponse, body);
    Assertions.assertEquals("TRACE-ID", map.getFirst("traceId"));
}
```

最后，通过 Wiremock，我们通过检查 MultivalueMap 实例中是否包含新的 traceId 头部来验证 ExchangeFilterFunction。

## 5