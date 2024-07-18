---
date: 2022-11-01
category:
  - Java
  - HttpClient
tag:
  - Java
  - HttpClient
  - 参数
head:
  - - meta
    - name: keywords
      content: Java HttpClient 请求参数
------
# Java HttpClient 请求参数的添加

## 1. 引言

在本教程中，我们将讨论如何向 Java _HttpClient_ 请求添加参数。

从 Java 11 开始，Java _HTTPClient_ 作为内置功能提供。因此，我们可以在不使用像 Apache HttpClient 和 OkHttp 这样的第三方库的情况下发送 HTTP 请求。

_HttpRequest.Builder_ 通过构建器模式帮助我们轻松创建 HTTP 请求并添加参数。

**Java _HttpClient_ API 没有提供任何方法来添加查询参数**。尽管我们可以利用 Apache HttpClient 中的 _URIBuilder_ 这样的第三方库来构建请求 URI 字符串。让我们看看仅使用 Java 11 中添加的功能会是什么样子：

```java
HttpRequest request = HttpRequest.newBuilder()
  .version(HttpClient.Version.HTTP_2)
  .uri(URI.create("https://postman-echo.com/get?param1=value1&param2=value2"))
  .GET()
  .build();
```

注意，我们设置了 _version()_ 方法以使用 HTTP 版本 2。Java _HTTPClient_ 默认使用 HTTP 2。但是，如果服务器不支持使用 HTTP 2 的请求，版本将自动降级到 HTTP 1.1。

此外，我们使用了 _GET()_ 作为 HTTP 请求方法，这是默认的。如果我们不指定 HTTP 请求方法，默认方法 GET 将被使用。

最后，我们还可以以默认配置的简洁形式编写相同的请求：

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("https://postman-echo.com/get?param1=value1&param2=value2"))
  .build();
```

## 3. 结论

在这个例子中，我们涵盖了如何向 Java _HTTPClient_ 请求添加参数。所有这些示例和代码片段的实现都可以在 GitHub 上找到。

在示例中，我们使用了由 _https://postman-echo.com_ 提供的示例 REST 端点。