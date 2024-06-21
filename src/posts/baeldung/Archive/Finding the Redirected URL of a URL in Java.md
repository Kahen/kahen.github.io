---
date: 2024-06-18
category:
  - Java
  - Web Development
tag:
  - URL Redirection
  - Java
  - HttpURLConnection
  - HttpClient
head:
  - - meta
    - name: keywords
      content: Java, URL Redirection, HttpURLConnection, HttpClient, Web Development
---
# 在Java中查找URL重定向后的URL

## 1. 引言

理解URL是如何重定向的对于网络开发和网络编程任务至关重要，例如处理HTTP重定向、验证URL重定向或提取最终目的地URL。在Java中，我们可以使用_HttpURLConnection_或_HttpClient_库来实现这一功能。

**在本教程中，我们将探讨在Java中查找给定URL重定向后的URL的不同方法。**

## 2. 使用_HttpURLConnection_

Java提供了_HttpURLConnection_类，它允许我们发出HTTP请求并处理响应。此外，我们可以使用_HttpURLConnection_来查找给定URL的重定向后的URL。以下是如何操作的示例：

```java
String canonicalUrl = "http://www.baeldung.com/";
String expectedRedirectedUrl = "https://www.baeldung.com/";

@Test
public void givenOriginalUrl_whenFindRedirectUrlUsingHttpURLConnection_thenCorrectRedirectedUrlReturned() throws IOException {
    URL url = new URL(canonicalUrl);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setInstanceFollowRedirects(true);
    int status = connection.getResponseCode();
    String redirectedUrl = null;
    if (status == HttpURLConnection.HTTP_MOVED_PERM || status == HttpURLConnection.HTTP_MOVED_TEMP) {
        redirectedUrl = connection.getHeaderField("Location");
    }
    connection.disconnect();
    assertEquals(expectedRedirectedUrl, redirectedUrl);
}
```

在这里，我们定义了原始URL字符串( _canonicalUrl_)和重定向后的URL( _expectedRedirectedUrl_)。然后，我们创建了一个_HttpURLConnection_对象并打开到原始URL的连接。

之后，我们将_instanceFollowRedirects_属性设置为_true_以启用自动重定向。**接收到响应后，我们检查状态码以确定是否发生了重定向。如果发生了重定向，我们从“_Location_”头字段中检索重定向后的_URL_。**

最后，我们断开连接并断言检索到的重定向后的_URL_与预期的匹配。

## 3. 使用Apache _HttpClient_

另外，我们可以使用Apache _HttpClient_，这是一个更通用的Java HTTP客户端库。Apache _HttpClient_提供了更高级的功能和更好的支持来处理HTTP请求和响应。以下是我们如何使用Apache _HttpClient_来查找重定向后的URL：

```java
@Test
public void givenOriginalUrl_whenFindRedirectUrlUsingHttpClient_thenCorrectRedirectedUrlReturned() throws IOException {
    RequestConfig config = RequestConfig.custom()
      .setRedirectsEnabled(false)
      .build();
    try (CloseableHttpClient httpClient = HttpClients.custom().setDefaultRequestConfig(config).build()) {
        HttpGet httpGet = new HttpGet(canonicalUrl);
        try (CloseableHttpResponse response = httpClient.execute(httpGet)) {
            int statusCode = response.getStatusLine().getStatusCode();
            String redirectedUrl = null;
            if (statusCode == HttpURLConnection.HTTP_MOVED_PERM || statusCode == HttpURLConnection.HTTP_MOVED_TEMP) {
                org.apache.http.Header[] headers = response.getHeaders("Location");
                if (headers.length > 0) {
                    redirectedUrl = headers[0].getValue();
                }
            }
            assertEquals(expectedRedirectedUrl, redirectedUrl);
        }
    }
}
```

在这个测试中，我们首先配置请求以禁用自动重定向。随后，我们实例化一个_CloseableHttpClient_并发出到原始URL的_HttpGet_请求。

获取到响应后，我们分析状态码和头字段以确定是否发生了重定向。如果发生重定向，我们从_Location_头字段中提取重定向后的URL。

## 4. 结论

在本文中，我们讨论了正确处理重定向对于构建与外部资源交互的强大Web应用程序的重要性。我们已经探讨了如何使用_HttpURLConnection_和Apache _HttpClient_来查找给定URL的重定向后的URL。

如常，相关的源代码可以在GitHub上找到。

文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。