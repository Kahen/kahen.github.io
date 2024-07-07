---
date: 2022-04-01
category:
  - Java
  - HttpClient
tag:
  - Retry
  - Apache HttpClient
head:
  - - meta
    - name: keywords
      content: Java, HttpClient, Retry, Apache HttpClient, HTTP请求重试
---
# 使用Apache HttpClient重试请求

在本教程中，我们将探讨在使用Apache HttpClient时如何重试HTTP请求。我们还将探索库的默认重试行为以及如何配置它。

## 2. 默认重试策略

在我们深入默认行为之前，我们将创建一个测试类，其中包含HttpClient实例和请求计数器：

```java
public class ApacheHttpClientRetryUnitTest {

    private Integer requestCounter;
    private CloseableHttpClient httpClient;

    @BeforeEach
    void setUp() {
        requestCounter = 0;
    }

    @AfterEach
    void tearDown() throws IOException {
        if (httpClient != null) {
            httpClient.close();
        }
    }
}
```

让我们从默认行为开始 - Apache HttpClient最多重试3次所有以IOException完成的幂等请求，因此总共会有4个请求。我们将在这里创建一个HttpClient，它对每个请求都会抛出IOException，只是为了演示：

```java
private void createFailingHttpClient() {
   this.httpClient = HttpClientBuilder
     .create()
     .addInterceptorFirst((HttpRequestInterceptor) (request, context) -> requestCounter++)
     .addInterceptorLast((HttpResponseInterceptor) (response, context) -> { throw new IOException(); })
     .build()
}

@Test
public void givenDefaultConfiguration_whenReceivedIOException_thenRetriesPerformed() {
    createFailingHttpClient();
    assertThrows(IOException.class, () -> httpClient.execute(new HttpGet("https://httpstat.us/200")));
    assertThat(requestCounter).isEqualTo(4);
}
```

HttpClient认为有些IOException子类是不重试的。更具体地说，它们是：

- InterruptedIOException
- ConnectException
- UnknownHostException
- SSLException
- NoRouteToHostException

例如，如果我们无法解析目标主机的DNS名称，那么请求将不会被重试：

```java
public void createDefaultApacheHttpClient() {
    this.httpClient = HttpClientBuilder
      .create()
      .addInterceptorFirst((HttpRequestInterceptor) (httpRequest, httpContext) -> {
          requestCounter++;
      }).build();
}

@Test
public void givenDefaultConfiguration_whenDomainNameNotResolved_thenNoRetryApplied() {
    createDefaultApacheHttpClient();
    HttpGet request = new HttpGet(URI.create("http://domain.that.does.not.exist:80/api/v1"));

    assertThrows(UnknownHostException.class, () -> httpClient.execute(request));
    assertThat(requestCounter).isEqualTo(1);
}
```

正如我们所注意到的，这些异常通常表示网络或TLS问题。因此，它们与不成功的HTTP请求处理无关。这意味着，如果服务器用5xx或4xx响应我们的请求，那么将不会应用重试逻辑：

```java
@Test
public void givenDefaultConfiguration_whenGotInternalServerError_thenNoRetryLogicApplied() throws IOException {
    createDefaultApacheHttpClient();
    HttpGet request = new HttpGet(URI.create("https://httpstat.us/500"));

    CloseableHttpResponse response = assertDoesNotThrow(() -> httpClient.execute(request));
    assertThat(response.getStatusLine().getStatusCode()).isEqualTo(500);
    assertThat(requestCounter).isEqualTo(1);
    response.close();
}
```

但大多数情况下，这不是我们想要的。我们通常至少想在5xx状态码上重试。所以我们将需要覆盖默认行为。我们将在下一节中进行。

## 3. 幂等性

在我们自定义重试之前，我们需要详细讨论一下请求的幂等性。这很重要，因为Apache HTTP客户端认为所有HttpEntityEnclosingRequest实现都是非幂等的。这个接口的常见实现是HttpPost、HttpPut和HttpPatch类。因此，我们的PATCH和PUT请求默认情况下将不会被重试：

```java
@Test
public void givenDefaultConfiguration_whenHttpPatchRequest_thenRetryIsNotApplied() {
    createFailingHttpClient();
    HttpPatch request = new HttpPatch(URI.create("https://httpstat.us/500"));

    assertThrows(IOException.class, () -> httpClient.execute(request));
    assertThat(requestCounter).isEqualTo(1);
}

@Test
public void givenDefaultConfiguration_whenHttpPutRequest_thenRetryIsNotApplied() {
    createFailingHttpClient();
    HttpPut request = new HttpPut(URI.create("https://httpstat.us/500"));

    assertThrows(IOException.class, () -> httpClient.execute(request));
    assertThat(requestCounter).isEqualTo(1);
}
```

正如我们所看到的，即使我们收到了IOException，也没有执行任何重试。

## 4. 自定义RetryHandler

我们提到的默认行为可以被覆盖。首先，我们可以设置RetryHandler。为此，我们可以使用DefaultHttpRequestRetryHandler。这是一个方便的现成实现RetryHandler，顺便说一下，这个库默认使用它。这个默认实现也实现了我们讨论的默认行为。

通过使用DefaultHttpRequestRetryHandler，我们可以设置我们想要的重试次数，以及HttpClient何时应该重试幂等请求：

```java
private void createHttpClientWithRetryHandler() {
    this.httpClient = HttpClientBuilder
      .create()
      .addInterceptorFirst((HttpRequestInterceptor) (httpRequest, httpContext) -> requestCounter++)
      .addInterceptorLast((HttpResponseInterceptor) (httpRequest, httpContext) -> { throw new IOException(); })
      .setRetryHandler(new DefaultHttpRequestRetryHandler(6, true))
      .build();
}

@Test
public void givenConfiguredRetryHandler_whenHttpPostRequest_thenRetriesPerformed() {
    createHttpClientWithRetryHandler();

    HttpPost request = new HttpPost(URI.create("https://httpstat.us/500"));

    assertThrows(IOException.class, () -> httpClient.execute(request));
    assertThat(requestCounter).isEqualTo(7);
}
```

正如我们所看到的，我们配置了DefaultHttpRequestRetryHandler进行6次重试。看第一个构造函数参数。我们还启用了幂等请求的重试。看第二个构造函数的布尔参数。因此，HttpClient执行我们的POST请求7次 - 1次原始请求和6次重试。

如果这种级别的自定义还不够，我们可以创建我们自己的RetryHandler：

```java
private void createHttpClientWithCustomRetryHandler() {
    this.httpClient = HttpClientBuilder
      .create()
      .addInterceptorFirst((HttpRequestInterceptor) (httpRequest, httpContext) -> requestCounter++)
      .addInterceptorLast((HttpResponseInterceptor) (httpRequest, httpContext) -> { throw new IOException(); })
      .setRetryHandler((exception, executionCount, context) -> {
          if (executionCount `<= 4 && Objects.equals("GET", ((HttpClientContext) context).getRequest().getRequestLine().getMethod())) {
              return true;
          } else {
              return false;
          }
    }).build();
}

@Test
public void givenCustomRetryHandler_whenUnknownHostException_thenRetryAnyway() {
    createHttpClientWithCustomRetryHandler();

    HttpGet request = new HttpGet(URI.create("https://domain.that.does.not.exist/200"));

    assertThrows(IOException.class, () ->` httpClient.execute(request));
    assertThat(requestCounter).isEqualTo(5);
}
```

这里我们基本上说的是 - 无论如何都要重试所有GET请求4次。所以在上面的示例中，我们重试了UnknownHostException。

## 5. 禁用重试逻辑

最后，有些情况下我们可能想要禁用重试。我们可以提供一个总是返回false的RetryHandler，或者我们可以使用disableAutomaticRetries()：

```java
private void createHttpClientWithRetriesDisabled() {
    this.httpClient = HttpClientBuilder
      .create()
      .addInterceptorFirst((HttpRequestInterceptor) (httpRequest, httpContext) -> requestCounter++)
      .addInterceptorLast((HttpResponseInterceptor) (httpRequest, httpContext) -> { throw new IOException(); })
      .disableAutomaticRetries()
      .build();
}

@Test
public void givenDisabledRetries_whenExecutedHttpRequestEndUpWithIOException_thenRetryIsNotApplied() {
    createHttpClientWithRetriesDisabled();
    HttpGet request = new HttpGet(URI.create("https://httpstat.us/200"));

    assertThrows(IOException.class, () -> httpClient.execute(request));
    assertThat(requestCounter).isEqualTo(1);
}
```

通过在HttpClientBuilder上调用disableAutomaticRetries()，我们禁用了HttpClient中的所有重试。这意味着没有任何请求会被重试。

## 6. 结论

在本教程中，我们讨论了Apache HttpClient的默认重试行为。开箱即用的RetryHandler将重试3次幂等请求，考虑到发生的异常。然而，我们可以配置重试次数和非幂等请求的重试策略。此外，我们可以提供我们自己的RetryHandler实现，以实现更进一步的自定义。最后，我们可以通过在HttpClientBuilder上调用方法来禁用重试，以在HttpClient构建期间禁用重试。

如往常一样，文章中使用的源代码可以在GitHub上找到。