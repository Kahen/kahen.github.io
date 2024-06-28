---
date: 2024-06-28
category:
  - Spring Boot
  - RestClient
tag:
  - Spring Framework
  - HTTP Client
head:
  - - meta
    - name: keywords
      content: RestClient, Spring Boot, HTTP Client, REST API
---
# Spring Boot 中的 RestClient 指南

## 1. 引言

_RestClient_ 是 Spring Framework 6.1 M2 中引入的同步 HTTP 客户端，它取代了 _RestTemplate_。同步 HTTP 客户端以阻塞方式发送和接收 HTTP 请求和响应，这意味着它在继续下一个请求之前会等待每个请求完成。

在本教程中，我们将探讨 _RestClient_ 提供了什么，以及它与 _RestTemplate_ 的比较。

## 2. _RestClient_ 与 _RestTemplate_

_RestTemplate_，顾名思义，是建立在模板设计模式之上的。它是一种行为设计模式，通过在方法中定义算法的框架，允许子类为某些步骤提供特定的实现。虽然它是一种强大的模式，但它创建了重载的需求，这可能会很不方便。

为了改进这一点，_RestClient_ 采用了流畅的 API。流畅的 API 是一种设计模式，它允许通过顺序调用对象上的方法来实现方法链，通常不需要中间变量，使代码更易于阅读和表达。

让我们从创建一个基本的 _RestClient_ 开始：

```java
RestClient restClient = RestClient.create();
```

## 3. 使用 HTTP 请求方法进行简单获取

与 _RestTemplate_ 或任何其他 REST 客户端类似，**_RestClient_ 允许我们使用请求方法进行 HTTP 调用**。让我们通过不同的 HTTP 方法来创建、检索、修改和删除资源。

我们将操作一个基本的 _Article_ 类：

```java
public class Article {
    Integer id;
    String title;
    // 构造函数和获取器
}
```

### 3.1. 使用 GET 检索资源

**我们将使用 GET HTTP 方法从 web 服务器上的指定资源请求并检索数据，而不会修改它。** 它主要用于 web 应用程序中的只读操作。

首先，让我们获取一个简单的 _String_ 作为响应，而不进行任何序列化到我们自定义的类：

```java
String result = restClient.get()
  .uri(uriBase + "/articles")
  .retrieve()
  .body(String.class);
```

### 3.2. 使用 POST 创建资源

**我们将使用 POST HTTP 方法向 web 服务器上的资源提交数据，通常用于在 web 应用程序中创建新记录或资源。** 与检索数据的 GET 方法不同，POST 旨在发送要由服务器处理的数据，例如提交 web 表单时。

URI 应该定义我们想要处理的资源。

让我们向服务器发送一个 ID 等于 1 的简单 Article：

```java
Article article = new Article(1, "如何使用 RestClient");
ResponseEntity```<Void>``` response = restClient.post()
  .uri(uriBase + "/articles")
  .contentType(APPLICATION_JSON)
  .body(article)
  .retrieve()
  .toBodilessEntity();
```

因为我们指定了 "_APPLICATION_JSON_" 内容类型，_Article_ 类的实例将由底层的 Jackson 库自动序列化为 JSON。在这个例子中，我们使用 _toBodilessEntity()_ 方法忽略了响应体。POST 端点不需要，通常也不返回任何有效载荷。

### 3.3. 使用 PUT 更新资源

接下来，**我们将看看 PUT HTTP 方法，它用于使用提供的数据更新或替换现有资源。** 它通常用于修改 web 应用程序中的现有实体或其他资源。通常，我们需要指定要更新的资源，确保完全替换。

让我们修改我们在前一段中创建的文章。我们提供的 URI 应该识别我们想要更改的资源：

```java
Article article = new Article(1, "如何更好地使用 RestClient");
ResponseEntity```<Void>``` response = restClient.put()
  .uri(uriBase + "/articles/1")
  .contentType(APPLICATION_JSON)
  .body(article)
  .retrieve()
  .toBodilessEntity();
```

与前一段类似，我们将依赖 _RestClient_ 来序列化我们的负载并忽略响应。

### 3.4. 使用 DELETE 删除资源

**我们将使用 DELETE HTTP 方法请求从 web 服务器中删除指定的资源。** 类似于 GET 端点，我们通常不提供请求的任何负载，并依赖于 URI 中编码的参数：

```java
ResponseEntity```<Void>``` response = restClient.delete()
  .uri(uriBase + "/articles/1")
  .retrieve()
  .toBodilessEntity();
```

## 4. 反序列化响应

我们经常想要序列化请求并反序列化响应到我们可以高效操作的某些类。**_RestClient_ 配备了执行 JSON 到对象转换的能力**，这是由 Jackson 库提供的功能。

此外，由于共享消息转换器的使用，我们可以使用 _RestTemplate_ 支持的所有数据类型。

让我们通过其 ID 检索文章，并将序列化到 _Article_ 类的实例：

```java
Article article = restClient.get()
  .uri(uriBase + "/articles/1")
  .retrieve()
  .body(Article.class);
```

当我们想要获得某个泛型类的实例时，指定主体的类就有点复杂了，例如 _List_。例如，如果我们想要获取所有文章，我们将获得 _List```<Article>```_ 对象。在这种情况下，我们可以使用 _ParameterizedTypeReference_ 抽象类来告诉 _RestClient_ 我们将获得什么对象。

我们甚至不需要指定泛型类型，Java 会为我们推断类型：

```java
List```<Article>``` articles = restClient.get()
  .uri(uriBase + "/articles")
  .retrieve()
  .body(new ParameterizedTypeReference<>() {});
```

## 5. 使用 Exchange 解析响应

**_RestClient_ 包括 _exchange()_ 方法，用于通过提供对底层 HTTP 请求和响应的访问来处理更复杂的情况。** 因此，库不会应用默认处理程序，我们必须自己处理状态。

假设我们正在通信的服务在数据库中没有文章时返回 204 状态代码。由于这种稍微非标准的行为，我们想要以特殊的方式处理它。当状态代码等于 204 时，我们将抛出一个 _ArticleNotFoundException_ 异常，并且在状态代码不等于 200 时，抛出一个更通用的异常：

```java
List```<Article>``` articles = restClient.get()
  .uri(uriBase + "/articles")
  .exchange((request, response) -> {
      if (response.getStatusCode().isSameCodeAs(HttpStatusCode.valueOf(204))) {
          throw new ArticleNotFoundException();
      } else if (response.getStatusCode().isSameCodeAs(HttpStatusCode.valueOf(200))) {
          return objectMapper.readValue(response.getBody(), new TypeReference<>() {});
      } else {
          throw new InvalidArticleResponseException();
      }
});
```

因为我们在这里使用原始响应，我们还需要使用 _ObjectMapper_ 自己反序列化响应体。

## 6. 错误处理

默认情况下，当 _RestClient_ 在 HTTP 响应中遇到 4xx 或 5xx 状态代码时，它会抛出一个 _RestClientException_ 的子类异常。**我们可以通过实现我们的状态处理器来覆盖这种行为。**

让我们编写一个当我们找不到文章时抛出自定义异常的状态处理器：

```java
Article article = restClient.get()
  .uri(uriBase + "/articles/1234")
  .retrieve()
  .onStatus(status -> status.value() == 404, (request, response) -> {
      throw new ArticleNotFoundException(response)
  })
  .body(Article.class);
```

## 7. 从 _RestTemplate_ 构建 _RestClient_

_RestClient_ 是 _RestTemplate_ 的继任者，在旧的代码库中，我们很可能会碰到使用 _RestTemplate_ 的实现。

幸运的是，使用旧的 _RestTemplate_ 配置创建一个 _RestClient_ 实例非常简单：

```java
RestTemplate oldRestTemplate;
RestClient restClient = RestClient.create(oldRestTemplate);
```

## 8. 结论

在本文中，我们重点关注了 _RestClient_ 类，它是 _RestTemplate_ 的后继者，作为一个同步 HTTP 客户端。我们学习了如何使用它的流畅 API 来处理简单和复杂的用例。接下来，我们开始汇总所有 HTTP 方法，然后继续讨论响应序列化和错误处理主题。

像往常一样，所有的代码示例都可以在 GitHub 上找到。