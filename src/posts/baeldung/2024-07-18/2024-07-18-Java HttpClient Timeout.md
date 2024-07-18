---
date: 2022-04-01
category:
  - Java
  - HTTP Client
tag:
  - Java
  - HttpClient
  - Timeout
head:
  - - meta
    - name: keywords
      content: Java HttpClient, HTTP Client, Timeout
------
# Java HttpClient 超时设置

## 1. 概述

在本教程中，我们将展示如何使用从 Java 11 开始提供的新的 Java HTTP 客户端设置超时。

如果我们需要刷新我们的知识，我们可以从 Java HTTP 客户端的教程开始。

另一方面，要学习如何使用旧库设置超时，请参见 _HttpUrlConnection_。

## 2. 配置超时

首先，我们需要设置一个 HttpClient 以便能够进行 HTTP 请求：

```java
private static HttpClient getHttpClientWithTimeout(int seconds) {
    return HttpClient.newBuilder()
      .connectTimeout(Duration.ofSeconds(seconds))
      .build();
}
```

上述代码中，我们创建了一个方法，返回一个配置了超时参数的 _HttpClient_。简单来说，**我们使用建造者设计模式实例化一个 _HttpClient_ 并使用 _connectTimeout_ 方法配置超时**。此外，使用静态方法 _ofSeconds_，我们创建了一个定义我们超时时间（以秒为单位）的 _Duration_ 对象实例。

之后，我们检查 _HttpClient_ 超时是否配置正确：

```java
httpClient.connectTimeout().map(Duration::toSeconds)
  .ifPresent(sec -> System.out.println("Timeout in seconds: " + sec));
```

因此，我们使用 _connectTimeout_ 方法获取超时时间。结果，它返回一个 _Duration_ 的 _Optional_，我们将其映射到秒。

## 3. 处理超时

进一步，我们需要创建一个 _HttpRequest_ 对象，我们的客户端将使用它来进行 HTTP 请求：

```java
HttpRequest httpRequest = HttpRequest.newBuilder()
  .uri(URI.create("http://10.255.255.1")).GET().build();
```

为了模拟超时，我们向一个不可路由的 IP 地址发起调用。换句话说，所有的 TCP 数据包都会丢失，并在预定义的持续时间后强制超时。

现在，让我们更深入地了解如何处理超时。

### 3.1. 处理同步调用超时

例如，要使同步调用使用 _send_ 方法：

```java
HttpConnectTimeoutException thrown = assertThrows(
  HttpConnectTimeoutException.class,
  () -> httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString()),
  "Expected send() to throw HttpConnectTimeoutException, but it didn't");
assertTrue(thrown.getMessage().contains("timed out"));
```

**同步调用强制捕获 _IOException_，而 _HttpConnectTimeoutException_ 扩展了它**。因此，在上述测试中，我们期望 _HttpConnectTimeoutException_ 带有错误消息。

### 3.2. 处理异步调用超时

类似地，要使异步调用使用 _sendAsync_ 方法：

```java
CompletableFuture``<String>`` completableFuture = httpClient.sendAsync(httpRequest, HttpResponse.BodyHandlers.ofString())
  .thenApply(HttpResponse::body)
  .exceptionally(Throwable::getMessage);
String response = completableFuture.get(5, TimeUnit.SECONDS);
assertTrue(response.contains("timed out"));
```

上述对 _sendAsync_ 的调用返回了一个 _CompletableFuture``<String>``_。因此，我们需要定义如何处理响应函数。具体来说，当没有发生错误时，我们从响应中获取正文。否则，我们从可抛出对象中获取错误消息。最后，我们通过等待最多 5 秒来从 _CompletableFuture_ 获取结果。同样，这个请求在 3 秒后抛出我们期望的 _HttpConnectTimeoutException_。

## 4. 在请求级别配置超时

上述，我们为 _sync_ 和 _async_ 调用重用了同一个客户端实例。然而，我们可能希望为每个请求分别处理超时。同样，我们可以为单个请求设置超时：

```java
HttpRequest httpRequest = HttpRequest.newBuilder()
  .uri(URI.create("http://10.255.255.1"))
  .timeout(Duration.ofSeconds(1))
  .GET()
  .build();
```

同样，我们使用 _timeout_ 方法为这个请求设置超时。在这里，我们为这个请求配置了 1 秒的超时时间。

**客户端和请求之间的最小持续时间设置了请求的超时时间。**

## 5. 结论

在本文中，我们成功地使用新的 Java HTTP 客户端配置了超时，并在超时溢出时优雅地处理了请求。

一如既往，示例的源代码可以在 GitHub 上找到。