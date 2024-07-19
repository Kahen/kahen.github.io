---
date: 2024-07-19
category:
  - Java
  - HttpClient
tag:
  - SSL
  - HTTPS
head:
  - - meta
    - name: keywords
      content: Java HttpClient, SSL, HTTPS
------
# Java HttpClient 与 SSL

## 1. 概述

在本教程中，我们将探讨如何使用 Java HttpClient 连接到 HTTPS URL。我们还将学习如何使用客户端连接到没有有效 SSL 证书的 URL。

在 Java 的旧版本中，我们更倾向于使用像 Apache HTTPClient 和 OkHttp 这样的库来连接服务器。在 Java 11 中，JDK 添加了一个改进的 HttpClient 库。

让我们探索如何使用它通过 SSL 调用服务。

## 2. 使用 Java HttpClient 调用 HTTPS URL

我们将使用测试用例来运行客户端代码。为了测试目的，我们将使用一个运行在 HTTPS 上的现有 URL。

让我们编写代码来设置客户端并调用服务：
```java
HttpClient httpClient = HttpClient.newHttpClient();

HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("https://www.google.com/"))
  .build();

HttpResponse``<String>`` response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
```

这里，我们首先使用 _HttpClient.newHttpClient()_ 方法创建了一个客户端。然后，我们创建了一个请求并设置了我们要访问的服务的 URL。最后，我们使用 _HttpClient.send()_ 方法发送请求并收集响应——一个包含响应体的 _HttpResponse_ 对象作为 _String_。

当我们将上述代码放入测试用例并执行以下断言时，我们将观察到它通过了：
```java
assertEquals(200, response.statusCode());
```

## 3. 调用无效的 HTTPS URL

现在，让我们将 URL 更改为另一个没有有效 SSL 证书的 URL。我们可以通过更改请求对象来实现：
```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://wrong.host.badssl.com/"))
  .build();
```

当我们再次运行测试时，我们得到以下错误：
```java
Caused by: java.security.cert.CertificateException: No subject alternative DNS name matching wrong.host.badssl.com found.
  at java.base/sun.security.util.HostnameChecker.matchDNS(HostnameChecker.java:212)
  at java.base/sun.security.util.HostnameChecker.match(HostnameChecker.java:103)
```

这是因为 URL 没有有效的 SSL 证书。

## 4. 绕过 SSL 证书验证

### 4.1. 使用模拟信任管理器

**为了跳过 _HttpClient_ 自动执行的验证，我们可以扩展默认的 _X509ExtendedTrustManager_ 对象**，这是负责检查 SSL 证书有效性的类，**通过覆盖默认的业务逻辑为空方法**：
```java
private static final TrustManager MOCK_TRUST_MANAGER = new X509ExtendedTrustManager() {
   @Override
   public java.security.cert.X509Certificate[] getAcceptedIssuers() {
       return new java.security.cert.X509Certificate[0];
   }

   @Override
   public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
       // 空方法
   }
   // ... 其他 void 方法
}
```

我们还需要将新的 _TrustManager_ 实现提供给我们的 _HttpClient_ 实例。为此，我们首先创建一个新的 _SSLContext_ 实例，然后我们通过传递 _null_ 作为 _KeyManager_ 列表，刚刚创建的 _TrustManager_ 数组，以及 _SecureRandom_ 类的新实例（一个随机数生成器）来初始化对象：
```java
SSLContext sslContext = SSLContext.getInstance("SSL"); // OR TLS
sslContext.init(null, new TrustManager[]{DUMMY_TRUST_MANAGER}, new SecureRandom());
```

现在让我们使用这个更新的 _SSLContext_ 来构建我们现在表现良好的 _HttpClient_：
```java
HttpClient httpClient = HttpClient.newBuilder().sslContext(sslContext).build();
```

现在我们可以调用任何没有有效证书的 URL 以获得成功的响应：
```java
HttpRequest request = HttpRequest.newBuilder()
            .uri(new URI("https://wrong.host.badssl.com/"))
            .build();
HttpResponse``<String>`` response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
Assertions.assertEquals(200, response.statusCode())
```

在下一段中，我们将看到另一种方法，我们可以使用 JVM 标志禁用所有 HttpClient 请求的证书验证。

### 4.2. 使用 JVM 禁用主机名验证标志

作为解决我们上面得到的错误的最后选项，让我们看看绕过 SSL 证书验证的解决方案。

在 Apache HttpClient 中，我们可以修改客户端以绕过证书验证。然而，我们不能使用 Java HttpClient 这样做。**我们必须依靠对 JVM 进行更改来禁用主机名验证。**

一种方法是将网站的证书导入到 Java KeyStore 中。这是一种常见的做法，如果只有少量内部可信网站，这是一个不错的选择。

然而，如果有很多网站或需要管理的环境太多，这可能会变得繁琐。在这种情况下，我们可以使用属性 _jdk.internal.httpclient.disableHostnameVerification_ 来禁用主机名验证。

我们可以在运行应用程序时作为命令行参数设置此属性：
```java
java -Djdk.internal.httpclient.disableHostnameVerification=true -jar target/java-httpclient-ssl-0.0.1-SNAPSHOT.jar
```

**或者，我们可以** **在创建客户端之前以编程方式设置此属性**：
```java
Properties props = System.getProperties();
props.setProperty("jdk.internal.httpclient.disableHostnameVerification", Boolean.TRUE.toString());

HttpClient httpClient = HttpClient.newHttpClient();

```

现在运行测试，我们将看到它通过了。

**我们应该注意到更改属性意味着所有请求都将禁用证书验证。** **这可能不是理想的，特别是在生产环境中。** 然而，通常在非生产环境中引入此属性。

## 5. 我们可以使用 Java HttpClient 与 Spring 一起使用吗？

Spring 提供了两个流行的接口来发送 HTTP 请求：
- _RestTemplate_ 用于同步请求
- _WebClient_ 用于同步和异步请求

两者都可以与流行的 HTTP 客户端如 Apache HttpClient、OkHttp 和旧的 _HttpURLConnection_ 一起使用。然而，**我们不能将 Java HttpClient 插入这两个接口中**。**它被视为它们的替代品。**

我们可以使用 Java HttpClient 直接进行同步和异步请求，转换请求和响应，添加超时等。

## 6. 结论

在本文中，我们探讨了如何使用 Java HTTP 客户端连接到需要 SSL 的服务器。我们还查看了如何使用客户端连接到没有有效证书的 URL。

一如既往，这些示例的代码可以在 GitHub 上找到。