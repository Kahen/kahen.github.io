---
date: 2024-06-17
category:
  - Spring WebFlux
  - WebClient
tag:
  - Spring Boot
  - Web Client
  - Reactive Programming
---
# Spring WebClient的retrieve()与exchange()方法比较

_WebClient_ 是一个简化执行 HTTP 请求过程的接口。与 _RestTemplate_ 不同，它是一个响应式且非阻塞的客户端，可以消费和操作 HTTP 响应。尽管它设计为非阻塞，但也可以在阻塞场景中使用。

在本教程中，我们将深入探讨 _WebClient_ 接口的关键方法，包括 _retrieve()_、_exchangeToMono()_ 和 _exchangeToFlux()_。我们还将探讨这些方法之间的差异和相似之处，并查看示例以展示不同的用例。此外，我们将使用 JSONPlaceholder API 获取用户数据。

### 示例设置

首先，让我们启动一个 Spring Boot 应用程序，并将 _spring-boot-starter-webflux_ 依赖项添加到 _pom.xml_：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-webflux`</artifactId>`
    `<version>`3.2.4`</version>`
`</dependency>`
```

**此依赖项提供了 _WebClient_ 接口，使我们能够执行 HTTP 请求**。

让我们也看一下对 _https://jsonplaceholder.typicode.com/users/1_ 的请求的示例 GET 响应：

```json
{
  "id": 1,
  "name": "Leanne Graham",
  // ...
}
```

此外，让我们创建一个名为 _User_ 的 POJO 类：

```java
class User {
    private int id;
    private String name;

   // 标准构造函数，getter 和 setter
}
```

来自 JSONPlaceholder API 的 JSON 响应将被反序列化并映射到 _User_ 类的一个实例。

最后，让我们使用基本 URL 创建一个 _WebClient_ 实例：

```java
WebClient client = WebClient.create("https://jsonplaceholder.typicode.com/users");
```

在这里，我们为 HTTP 请求定义了基本 URL。

### _exchange()_ 方法

**_exchange()_ 方法直接返回 _ClientResponse_，从而提供对 HTTP 状态码、头部和响应体的访问**。简单来说，_ClientResponse_ 代表了 _WebClient_ 返回的 HTTP 响应。

**但是，这个方法自 Spring 版本 5.3 起已被弃用，并已被 _exchangeToMono()_ 或 _exchangeToFlux()_ 方法取代，这取决于我们发出的内容**。这两种方法允许我们根据响应状态对响应进行解码。

### 3.1. 发出 _Mono_

让我们看一个使用 _exchangeToMono()_ 发出 _Mono_ 的示例：

```java
@GetMapping("/user/exchange-mono/{id}")
Mono``````````<User>`````````` retrieveUsersWithExchangeAndError(@PathVariable int id) {
    return client.get()
      .uri("/{id}", id)
      .exchangeToMono(res -> {
          if (res.statusCode().is2xxSuccessful()) {
              return res.bodyToMono(User.class);
          } else if (res.statusCode().is4xxClientError()) {
              return Mono.error(new RuntimeException("客户端错误：无法获取用户"));
          } else if (res.statusCode().is5xxServerError()) {
              return Mono.error(new RuntimeException("服务器错误：无法获取用户"));
          } else {
              return res.createError();
          }
     });
}
```

在上面的代码中，我们根据 HTTP 状态码检索用户并解码响应。

### 3.2. 发出 _Flux_

此外，让我们使用 _exchangeToFlux()_ 获取一系列用户：

```java
@GetMapping("/user-exchange-flux")
Flux``````````<User>`````````` retrieveUsersWithExchange() {
   return client.get()
     .exchangeToFlux(res -> {
         if (res.statusCode().is2xxSuccessful()) {
             return res.bodyToFlux(User.class);
         } else {
             return Flux.error(new RuntimeException("获取用户时出错"));
         }
    });
}
```

在这里，我们使用 _exchangeToFlux()_ 方法将响应体映射到 _User_ 对象的 _Flux_ 并返回自定义错误消息，如果请求失败。

### 3.3. 直接检索响应体

值得注意的是，_exchangeToMono()_ 或 _exchangeToFlux()_ 可以在不指定响应状态码的情况下使用：

```java
@GetMapping("/user-exchange")
Flux``````````<User>`````````` retrieveAllUserWithExchange(@PathVariable int id) {
    return client.get().exchangeToFlux(res -> res.bodyToFlux(User.class))
      .onErrorResume(Flux::error);
}
```

在这里，我们没有指定状态码就检索了用户。

### 3.4. 改变响应体

此外，让我们看一个改变响应体的示例：

```java
@GetMapping("/user/exchange-alter/{id}")
Mono``````````<User>`````````` retrieveOneUserWithExchange(@PathVariable int id) {
    return client.get()
      .uri("/{id}", id)
      .exchangeToMono(res -> res.bodyToMono(User.class))
      .map(user -> {
          user.setName(user.getName().toUpperCase());
          user.setId(user.getId() + 100);
          return user;
      });
}
```

在上面的代码中，我们将响应体映射到 POJO 类后，通过给 _id_ 添加 _100_ 并将 _name_ 大写来改变响应体。

值得注意的是，我们也可以使用 _retrieve()_ 方法改变响应体。

我们还可以提取响应头：

```java
@GetMapping("/user/exchange-header/{id}")
Mono``````````<User>`````````` retrieveUsersWithExchangeAndHeader(@PathVariable int id) {
  return client.get()
    .uri("/{id}", id)
    .exchangeToMono(res -> {
        if (res.statusCode().is2xxSuccessful()) {
            logger.info("状态码: " + res.headers().asHttpHeaders());
            logger.info("内容类型" + res.headers().contentType());
            return res.bodyToMono(User.class);
        } else if (res.statusCode().is4xxClientError()) {
            return Mono.error(new RuntimeException("客户端错误：无法获取用户"));
        } else if (res.statusCode().is5xxServerError()) {
            return Mono.error(new RuntimeException("服务器错误：无法获取用户"));
        } else {
            return res.createError();
        }
    });
}
```

在这里，我们将 HTTP 头部和内容类型记录到控制台。与需要返回 _ResponseEntity_ 以访问头部和响应代码的 _retrieve()_ 方法不同，_exchangeToMono()_ 直接返回 _ClientResponse_ 因此可以直接访问。

### 4. _retrieve()_ 方法

**_retrieve()_ 方法简化了从 HTTP 请求中提取响应体的过程**。它返回 _ResponseSpec_，允许我们指定如何处理响应体，而无需访问完整的 _ClientResponse_。

_ClientResponse_ 包括响应代码、头部和体。因此，_ResponseSpec_ 包括响应体，但不包括响应代码和头部。

### 4.1. 发出 _Mono_

这是一个检索 HTTP 响应体的示例代码：

```java
@GetMapping("/user/{id}")
Mono``````````<User>`````````` retrieveOneUser(@PathVariable int id) {
    return client.get()
      .uri("/{id}", id)
      .retrieve()
      .bodyToMono(User.class)
      .onErrorResume(Mono::error);
}
```

在上面的代码中，我们通过向 _/users_ 端点发出具有特定 _id_ 的 HTTP 调用，从基本 URL 检索 JSON。然后，我们将响应体映射到 _User_ 对象。

### 4.2. 发出 _Flux_

此外，让我们看一个对 _/users_ 端点发出 GET 请求的示例：

```java
@GetMapping("/users")
Flux``````````<User>`````````` retrieveAllUsers() {
    return client.get()
      .retrieve()
      .bodyToFlux(User.class)
      .onResumeError(Flux::error);
}
```

在这里，当它将 HTTP 响应映射到 POJO 类时，该方法发出 _User_ 对象的 _Flux_。

### 4.3. 返回 _ResponseEntity_

如果我们打算使用 _retrieve()_ 方法访问响应状态和头部，我们可以返回 _ResponseEntity_：

```java
@GetMapping("/user-id/{id}")
Mono<ResponseEntity``````````<User>``````````> retrieveOneUserWithResponseEntity(@PathVariable int id) {
    return client.get()
      .uri("/{id}", id)
      .accept(MediaType.APPLICATION_JSON)
      .retrieve()
      .toEntity(User.class)
      .onErrorResume(Mono::error);
}
```

使用 _toEntity()_ 方法获得的响应包含 HTTP 头部、状态码和响应体。

### 4.4. 使用 _onStatus()_ 处理器自定义错误

**此外，当出现 400 或 500 HTTP 错误时，它默认返回 _WebClientResponseException_ 错误**。但是，我们可以使用 _onStatus()_ 处理器自定义异常以给出自定义错误响应：

```java
@GetMapping("/user-status/{id}")
Mono``````````<User>`````````` retrieveOneUserAndHandleErrorBasedOnStatus(@PathVariable int id) {
    return client.get()
      .uri("/{id}", id)
      .retrieve()
      .onStatus(HttpStatusCode::is4xxClientError,
        response -> Mono.error(new RuntimeException("客户端错误：无法获取用户")))
      .onStatus(HttpStatusCode::is5xxServerError,
        response -> Mono.error(new RuntimeException("服务器错误：无法获取用户")))
      .bodyToMono(User.class);
在这里，我们检查 HTTP 状态码，并使用 _onStatus()_ 处理器定义自定义错误响应。

## 5. 性能比较

接下来，让我们编写一个性能测试来比较使用 Java Microbench Harness (JMH) 的 _retrieve()_ 和 _exchangeToFlux()_ 的执行时间。

首先，让我们创建一个名为 _RetrieveAndExchangeBenchmarkTest_ 的类：

```java
@State(Scope.Benchmark)
@BenchmarkMode(Mode.AverageTime)
@Warmup(iterations = 3, time = 10, timeUnit = TimeUnit.MICROSECONDS)
@Measurement(iterations = 3, time = 10, timeUnit = TimeUnit.MICROSECONDS)
public class RetrieveAndExchangeBenchmarkTest {

    private WebClient client;

    @Setup
    public void setup() {
        this.client = WebClient.create("https://jsonplaceholder.typicode.com/users");
    }
}
```

在这里，我们将基准模式设置为 _AverageTime_，这意味着它测量测试执行的平均时间。我们还定义了迭代次数和每次迭代的运行时间。

接下来，我们创建一个 _WebClient_ 的实例，并使用 _@Setup_ 注解使其在每个基准测试之前运行。

让我们编写一个使用 _retrieve()_ 方法检索一系列用户的基准测试方法：

```java
@Benchmark
Flux``````````<User>`````````` retrieveManyUserUsingRetrieveMethod() {
    return client.get()
      .retrieve()
      .bodyToFlux(User.class)
      .onErrorResume(Flux::error);
}
```

最后，让我们定义一个使用 _exchangeToFlux()_ 方法发出 _User_ 对象的 _Flux_ 的方法：

```java
@Benchmark
Flux``````````<User>`````````` retrieveManyUserUsingExchangeToFlux() {
    return client.get()
      .exchangeToFlux(res -> res.bodyToFlux(User.class))
      .onErrorResume(Flux::error);
}
```

这是基准测试结果：

```plaintext
Benchmark                             Mode  Cnt   Score    Error  Units
retrieveManyUserUsingExchangeToFlux   avgt   15  ≈ 10⁻⁴            s/op
retrieveManyUserUsingRetrieveMethod   avgt   15  ≈ 10⁻³            s/op
```

两种方法都表现出高效的性能。然而，当检索一系列用户时，_exchangeToFlux()_ 比 _retrieve()_ 方法略快。

## 6. 关键差异和相似之处

_retrieve()_ 和 _exchangeToMono()_ 或 _exchangeToFlux()_ 都可以用来进行 HTTP 请求并提取 HTTP 响应。

_retrieve()_ 方法只允许我们消费 HTTP 正文并发出 _Mono_ 或 _Flux_，因为它返回 _ResponseSpec_。然而，如果我们想要访问状态码和头部，我们可以使用带有 _ResponseEntity_ 的 _retrieve()_ 方法。此外，它允许我们使用 _onStatus()_ 处理器根据 HTTP 状态码报告错误。

与 _retrieve()_ 方法不同，_exchangeToMono()_ 和 _exchangeToFlux()_ 允许我们消费 HTTP 响应并直接访问头部和响应代码，因为它们返回 _ClientResponse_。此外，它们提供了更多的错误处理控制，因为我们可以根据 HTTP 状态码对响应进行解码。

值得注意的是，如果意图仅消费响应体，建议使用 _retrieve()_ 方法。

然而，如果我们需要对响应有更多的控制，_exchangeToMono()_ 或 _exchangeToFlux()_ 可能是更好的选择。

## 7. 结论

在本文中，我们学习了如何使用 _retrieve()_、_exchangeToMono()_ 和 _exchangeToFlux()_ 方法来处理 HTTP 响应，并将响应进一步映射到 POJO 类。此外，我们比较了 _retrieve()_ 和 _exchangeToFlux()_ 方法之间的性能。

_retrieve()_ 方法适用于我们只需要消费响应体，不需要访问状态码或头部的场景。它通过返回 _ResponseSpec_ 简化了处理过程，提供了一种直接处理响应体的简单方式。

如常，示例的完整源代码可在 GitHub 上获得。

文章发布后 30 天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。

OK