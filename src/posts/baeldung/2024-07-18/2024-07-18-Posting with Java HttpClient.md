---
date: 2022-04-01
category:
  - Java
  - HTTP
tag:
  - HttpClient
  - POST请求
head:
  - - meta
    - name: keywords
      content: Java HttpClient, POST请求, 异步请求, 文件上传, 表单提交
------
# 使用Java HttpClient发送POST请求

## 1. 概述

Java _HttpClient_ API 是在 Java 11 中引入的。该 API **实现了最新 HTTP 标准的客户端**。它支持 HTTP/1.1 和 HTTP/2，同时支持同步和异步编程模型。

我们可以使用它来发送 HTTP 请求并检索它们的响应。在 Java 11 之前，我们不得不依赖于基本的 _URLConnection_ 实现或第三方库，如 Apache _HttpClient_。

在本教程中，我们将探讨如何使用 Java _HttpClient_ 发送 POST 请求。我们将展示如何发送同步和异步 POST 请求，以及并发 POST 请求。此外，我们将检查如何向 POST 请求添加认证参数和 JSON 正文。

最后，我们将看到如何上传文件和提交表单数据。因此，我们将涵盖大多数常见用例。

## 2. 准备 POST 请求

在我们能够发送 HTTP 请求之前，我们首先需要创建一个 _HttpClient_ 的实例。

**_HttpClient_ 实例可以通过其构建器使用 _newBuilder_ 方法进行配置和创建**。否则，如果不需要配置，我们可以利用 _newHttpClient_ 实用方法创建一个默认客户端：

```java
HttpClient client = HttpClient.newHttpClient();
```

_HttpClient_ 默认使用 HTTP/2。如果服务器不支持 HTTP/2，它也会自动降级到 HTTP/1.1。

现在我们准备创建一个 _HttpRequest_ 的实例，使用其构建器。我们将在稍后使用客户端实例发送此请求。POST 请求的最小参数是服务器 URL、请求方法和正文：

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create(serviceUrl))
  .POST(HttpRequest.BodyPublishers.noBody())
  .build();
```

请求正文需要通过 _BodyPublisher_ 类提供。它是一个反应流发布者，按需发布请求正文流。在我们的示例中，我们使用了发送无请求正文的正文发布者。

## 3. 发送 POST 请求

现在我们已经准备好了一个 POST 请求，让我们看看发送它的不同选项。

### 3.1. 同步

我们可以使用此默认 _send_ 方法发送准备好的请求。此方法将**阻塞我们的代码，直到收到响应**：

```java
HttpResponse```<String>``` response = client.send(request, HttpResponse.BodyHandlers.ofString());
```

_BodyHandlers_ 实用程序实现了各种有用的处理程序，例如将响应正文处理为 _String_ 或将响应正文流式传输到文件。一旦收到响应，_HttpResponse_ 对象将包含响应状态、标头和正文：

```java
assertThat(response.statusCode())
  .isEqualTo(200);
assertThat(response.body())
  .isEqualTo("{\"message\":\"ok\"}");
```

### 3.2. 异步

我们可以使用 _sendAsync_ 方法异步发送上一个示例中的相同请求。与阻塞我们的代码不同，此方法将**立即返回一个** _**CompletableFuture**_ **实例**：

```java
CompletableFuture<HttpResponse```<String>```> futureResponse = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
```

_CompletableFuture_ 在 _HttpResponse_ 可用时完成：

```java
HttpResponse```<String>``` response = futureResponse.get();
assertThat(response.statusCode()).isEqualTo(200);
assertThat(response.body()).isEqualTo("{\"message\":\"ok\"}");
```

### 3.3. 并发

我们可以将 Streams 与 _CompletableFutures_ 结合起来，以**同时发出多个请求并等待它们的响应**：

```java
List<CompletableFuture<HttpResponse```<String>```>> completableFutures = serviceUrls.stream()
  .map(URI::create)
  .map(HttpRequest::newBuilder)
  .map(builder -> builder.POST(HttpRequest.BodyPublishers.noBody()))
  .map(HttpRequest.Builder::build)
  .map(request -> client.sendAsync(request, HttpResponse.BodyHandlers.ofString()))
  .collect(Collectors.toList());
```

现在，让我们等待所有请求完成，以便我们可以一次性处理它们的响应：

```java
CompletableFuture<List<HttpResponse```<String>```>> combinedFutures = CompletableFuture
  .allOf(completableFutures.toArray(new CompletableFuture[0]))
  .thenApply(future ->
    completableFutures.stream()
      .map(CompletableFuture::join)
      .collect(Collectors.toList()));
```

正如我们使用 _allOf_ 和 _join_ 方法结合了所有响应一样，我们得到了一个新的 _CompletableFuture_，其中包含我们的响应：

```java
List<HttpResponse```<String>```> responses = combinedFutures.get();
responses.forEach((response) -> {
  assertThat(response.statusCode()).isEqualTo(200);
  assertThat(response.body()).isEqualTo("{\"message\":\"ok\"}");
});
```

## 4. 添加认证参数

我们可以在客户端级别设置一个 **authenticator**，用于所有请求的 HTTP 认证：

```java
HttpClient client = HttpClient.newBuilder()
  .authenticator(new Authenticator() {
    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
      return new PasswordAuthentication(
        "baeldung",
        "123456".toCharArray());
    }
  })
  .build();
```

然而，_HttpClient_ 直到服务器用 _WWW-Authenticate_ 标头挑战它们时，才会发送基本凭据。

要绕过这个问题，我们可以手动创建并发送基本授权标头：

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create(serviceUrl))
  .POST(HttpRequest.BodyPublishers.noBody())
  .header("Authorization", "Basic " +
    Base64.getEncoder().encodeToString(("baeldung:123456").getBytes()))
  .build();
```

## 5. 添加正文

到目前为止的例子中，我们没有向我们的 POST 请求添加任何正文。然而，POST 方法通常用于通过请求正文将数据发送到服务器。

### 5.1. JSON 正文

_BodyPublishers_ 实用程序实现了各种有用的发布者，例如从 _String_ 或文件发布请求正文。我们可以将 JSON 数据作为 _String_ 发布，使用 UTF-8 字符集进行转换：

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create(serviceUrl))
  .POST(HttpRequest.BodyPublishers.ofString("{\"action\":\"hello\"}"))
  .build();
```

### 5.2. 上传文件

让我们创建一个临时文件，我们可以通过 _HttpClient_ 上传：

```java
Path file = tempDir.resolve("temp.txt");
List```<String>``` lines = Arrays.asList("1", "2", "3");
Files.write(file, lines);
```

**_HttpClient_ 提供了一个单独的方法，_BodyPublishers.ofFile_，用于将文件添加到 POST 正文**。我们可以简单地将我们的临时文件作为方法参数添加，API 会处理其余部分：

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create(serviceUrl))
  .POST(HttpRequest.BodyPublishers.ofFile(file))
  .build();
```

### 5.3. 提交表单

与文件不同，_HttpClient_ 没有为发布表单数据提供单独的方法。因此，我们再次需要**使用 _BodyPublishers.ofString_ 方法**：

```java
Map```<String, String>``` formData = new HashMap<>();
formData.put("username", "baeldung");
formData.put("message", "hello");

HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create(serviceUrl))
  .header("Content-Type", "application/x-www-form-urlencoded")
  .POST(HttpRequest.BodyPublishers.ofString(getFormDataAsString(formData)))
  .build();
```

然而，我们需要使用自定义实现将表单数据从 _Map_ 转换为 _String_：

```java
private static String getFormDataAsString(Map```<String, String>``` formData) {
    StringBuilder formBodyBuilder = new StringBuilder();
    for (Map.Entry```<String, String>``` singleEntry : formData.entrySet()) {
        if (formBodyBuilder.length() > 0) {
            formBodyBuilder.append("&");
        }
        formBodyBuilder.append(URLEncoder.encode(singleEntry.getKey(), StandardCharsets.UTF_8));
        formBodyBuilder.append("=");
        formBodyBuilder.append(URLEncoder.encode(singleEntry.getValue(), StandardCharsets.UTF_8));
    }
    return formBodyBuilder.toString();
}
```

## 6. 结论

本文中，**我们** **探索了使用 Java 11 中引入的 Java HttpClient API 发送 POST 请求**。

我们学习了如何创建一个 _HttpClient_ 实例并准备一个 POST 请求。我们看到了如何同步、异步和并发地发送准备好的请求。接下来，我们还看到了如何添加基本认证参数。

最后，我们看了如何向 POST 请求添加正文。我们涵盖了 JSON 负载、上传文件和提交表单数据。

一如既往，完整的源代码可以在 GitHub 上找到。