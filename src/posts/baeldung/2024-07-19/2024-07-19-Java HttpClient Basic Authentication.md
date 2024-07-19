---
date: 2024-07-20
category:
  - Java
  - HTTP Client
tag:
  - Basic Authentication
  - HttpClient
head:
  - - meta
    - name: keywords
      content: Java, HTTP Client, Basic Authentication, Tutorial
---
# Java HttpClient 基础认证

在本简短的教程中，我们将探讨基础认证。我们将看到它是如何工作的，并配置Java _HttpClient_ 使用这种类型的认证。

基础认证是一种简单的认证方法。客户端可以通过用户名和密码进行认证。这些凭据以特定的格式在_HTTP_授权头部发送。它以_Basic_关键字开头，后跟用户名和密码的_base64_编码值。冒号字符在这里很重要。头部应严格遵循此格式。

例如，要使用用户名_baeldung_和_HttpClient_密码进行认证，我们必须发送此头部：

```
Basic YmFlbGR1bmc6SHR0cENsaWVudA==
```

我们可以通过使用base64解码器并检查解码结果来验证它。

## **3. Java HttpClient**

Java 9引入了一个新的_HttpClient_作为孵化模块，它在Java 11中被标准化。我们将使用Java 11，所以我们可以从_java.net.http_包中简单地导入它，无需任何额外的配置或依赖。

让我们首先执行一个不带任何认证的简单GET请求：

```
HttpClient client = HttpClient.newHttpClient();

HttpRequest request = HttpRequest.newBuilder()
  .GET()
  .uri(new URI("https://postman-echo.com/get"))
  .build();

HttpResponse`<String>` response = client.send(request, BodyHandlers.ofString());

logger.info("Status {}", response.statusCode());
```

首先，我们创建一个_HttpClient_，它可以用来执行HTTP请求。其次，我们使用构建器设计模式创建一个_HttpRequest_。_GET_方法设置请求的HTTP方法。_uri_方法设置我们想要发送请求的URL。

之后，我们使用我们的客户端发送请求。_send_方法的第二个参数是一个响应体处理器。这告诉客户端我们希望将响应体视为_String_。

让我们运行我们的应用程序并检查日志。输出应该像这样：

```
INFO com.baeldung.httpclient.basicauthentication.HttpClientBasicAuthentication - Status 200
```

我们看到HTTP状态是200，这意味着我们的请求成功了。在此之后，让我们看看如何处理认证。

## **4. 使用HttpClient Authenticator**

在我们配置认证之前，我们需要一个URL来测试它。让我们使用一个需要认证的Postman Echo端点。首先，将之前的URL更改为这个，然后再次运行应用程序：

```
HttpRequest request = HttpRequest.newBuilder()
  .GET()
  .uri(new URI("https://postman-echo.com/basic-auth"))
  .build();
```

让我们检查日志并查找状态码。这次我们收到了HTTP状态401“未授权”。这个响应代码意味着端点需要认证，但客户端没有发送任何凭据。

让我们更改我们的客户端，以便它发送所需的认证数据。**我们可以通过配置_HttpClient Builder_来做到这一点，我们的客户端将使用我们设置的凭据。** 这个端点接受用户名“postman”和密码“password”。让我们向我们的客户端添加一个_authenticator_：

```
HttpClient client = HttpClient.newBuilder()
  .authenticator(new Authenticator() {
      @Override
      protected PasswordAuthentication getPasswordAuthentication() {
          return new PasswordAuthentication("postman", "password".toCharArray());
      }
  })
  .build();
```

让我们再次运行应用程序。现在请求成功，我们收到了HTTP状态200。

我们可以使用另一种方法来访问需要认证的端点。**我们从前面的部分了解到如何构建_Authorization_头部，所以我们可以手动设置它的值。** 尽管这必须针对每个请求完成，而不是通过authenticator一次性设置。

让我们去掉authenticator，看看如何设置请求头部。我们需要使用base64编码来构建头部值：

```
private static final String getBasicAuthenticationHeader(String username, String password) {
    String valueToEncode = username + ":" + password;
    return "Basic " + Base64.getEncoder().encodeToString(valueToEncode.getBytes());
}

```

让我们为_Authorization_头部设置这个值并运行应用程序：

```
HttpRequest request = HttpRequest.newBuilder()
  .GET()
  .uri(new URI("https://postman-echo.com/basic-auth"))
  .header("Authorization", getBasicAuthenticationHeader("postman", "password"))
  .build();
```

我们的请求成功，这意味着我们正确地构建并设置了头部值。

## **6. 结论**

在这个简短的教程中，我们看到了什么是基础认证以及它是如何工作的。我们通过为它设置_authenticator_来使用Java _HttpClient_ 进行基础认证。我们通过手动设置HTTP头部采用了不同的认证方法。

如往常一样，这些示例的源代码可以在GitHub上找到。继续翻译：

文章的结尾部分并没有提供完整的图片链接和作者信息，因此我将省略这部分内容。下面是文章的结论部分的翻译：

## **6. 结论**

在本简短的教程中，我们了解了基础认证是什么以及它的工作原理。我们展示了如何通过为Java _HttpClient_ 设置一个_authenticator_ 来使用基础认证。我们还学习了一种不同的认证方法，即通过手动设置HTTP头部来进行认证。

正如通常一样，这些示例的源代码可以在GitHub上找到。

OK