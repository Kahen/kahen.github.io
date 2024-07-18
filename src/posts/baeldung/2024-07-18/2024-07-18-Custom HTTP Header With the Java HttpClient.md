---
date: 2022-04-01
category:
  - Java
  - HTTP Client
tag:
  - Java
  - HttpClient
  - Custom Header
head:
  - - meta
    - name: keywords
      content: Java HttpClient, Custom HTTP Header
------
# 使用Java HttpClient添加自定义HTTP头

## 1. 概述

Java 11 正式引入了 Java HttpClient。在此之前，当我们需要使用 HTTP 客户端时，通常会使用像 Apache HttpClient 这样的第三方库。

在这个简短的教程中，我们将看到如何使用 Java HttpClient **添加自定义 HTTP 头**。

我们可以使用 _HttpRequest.Builder_ 对象的三种方法之一轻松添加自定义头：_header_、_headers_ 或 _setHeader_。让我们看看它们的实际应用。

_header()_ 方法允许我们一次添加一个头。

我们可以像下面的例子一样多次添加相同的头名，它们都会被发送：
```java
HttpClient httpClient = HttpClient.newHttpClient();

HttpRequest request = HttpRequest.newBuilder()
  .header("X-Our-Header-1", "value1")
  .header("X-Our-Header-1", "value2")
  .header("X-Our-Header-2", "value2")
  .uri(new URI(url)).build();

return httpClient.send(request, HttpResponse.BodyHandlers.ofString());
```

如果我们想同时添加多个头，我们可以使用 _headers()_ 方法：
```java
HttpRequest request = HttpRequest.newBuilder()
  .headers("X-Our-Header-1", "value1", "X-Our-Header-2", "value2")
  .uri(new URI(url)).build();
```

这种方法还允许我们为一个头名添加多个值：
```java
HttpRequest request = HttpRequest.newBuilder()
  .headers("X-Our-Header-1", "value1", "X-Our-Header-1", "value2")
  .uri(new URI(url)).build();
```

最后，我们可以使用 _setHeader()_ 方法添加一个头。但是，与 _header()_ 方法不同，**如果我们多次使用相同的头名，它将覆盖我们之前用该名称设置的任何先前头**：
```java
HttpRequest request = HttpRequest.newBuilder()
  .setHeader("X-Our-Header-1", "value1")
  .setHeader("X-Our-Header-1", "value2")
  .uri(new URI(url)).build();
```

在上面的例子中，我们的头的值将是“value2”。

## 3. 结论

总之，我们学习了使用 Java HttpClient 添加自定义 HTTP 头的不同方法。

一如既往，本文的示例代码可以在 GitHub 上找到。