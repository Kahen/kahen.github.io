---
date: 2022-04-01
category:
  - Java
  - Servlet
tag:
  - IllegalStateException
  - ServletRequest
  - getReader
  - getInputStream
head:
  - - meta
    - name: keywords
      content: Java, Servlet, IllegalStateException, getReader, getInputStream
---

# Java Web应用中ServletRequest的IllegalStateException异常解析与解决方法

1. 引言

在Java Web应用中，有时我们在调用ServletRequest接口的getReader()方法时可能会遇到IllegalStateException异常，错误信息为“getInputStream()已经为这个请求调用过了”。

本教程将学习为什么会发生这种情况以及如何解决。

2. 问题及原因

Java Servlet规范为构建Java Web应用提供定义，它定义了ServletRequest/HttpServletRequest接口，其中包含getReader()和getInputStream()方法用于从HTTP请求中读取数据。

getReader()方法以字符数据的形式检索请求体，而getInputStream()以二进制数据的形式检索请求体。

Servlet API文档对getReader()和getInputStream()强调它们不能同时使用：

```java
public java.io.BufferedReader getReader()
    要么调用此方法要么调用getInputStream来读取请求体，不能同时调用两者。
    ...
    抛出：
    java.lang.IllegalStateException - 如果在此请求上已经调用了getInputStream()方法

public ServletInputStream getInputStream()
    要么调用此方法要么调用getReader来读取请求体，不能同时调用两者。
    ...
    抛出：
    java.lang.IllegalStateException - 如果已经为这个请求调用了getReader()方法
```

因此，使用Tomcat Servlet容器时，如果我们在调用getInputStream()之后调用getReader()，我们会得到IllegalStateException：“getInputStream()已经为这个请求调用过了”。如果我们在调用getReader()之后调用getInputStream()，我们会得到IllegalStateException：“getReader()已经为这个请求调用过了”。

这里有一个测试来重现这种情况：

```java
@Test
void shouldThrowIllegalStateExceptionWhenCalling_getReaderAfter_getInputStream() throws IOException {
    HttpServletRequest request = new MockHttpServletRequest();
    try (ServletInputStream ignored = request.getInputStream()) {
        IllegalStateException exception = assertThrows(IllegalStateException.class, request::getReader);
        assertEquals("Cannot call getReader() after getInputStream() has already been called for the current request",
                      exception.getMessage());
    }
}
```

我们使用MockHttpServletRequest来模拟这种情况。如果我们在调用getReader()之后调用getInputStream()，我们会得到类似的错误消息。不同实现中的错误消息可能会略有不同。

3. 使用ContentCachingRequestWrapper避免IllegalStateException

那么我们如何在应用程序中避免这种异常呢？一个简单的方法是避免同时调用它们。但是一些Web框架可能在我们代码之前读取请求中的数据。如果我们想多次检查输入流，使用Spring MVC框架提供的ContentCachingRequestWrapper是一个很好的选择。

让我们看看ContentCachingRequestWrapper的核心部分：

```java
public class ContentCachingRequestWrapper extends HttpServletRequestWrapper {
    private final ByteArrayOutputStream cachedContent;
    //....
    @Override
    public ServletInputStream getInputStream() throws IOException {
        if (this.inputStream == null) {
            this.inputStream = new ContentCachingInputStream(getRequest().getInputStream());
        }
        return this.inputStream;
    }

    @Override
    public BufferedReader getReader() throws IOException {
        if (this.reader == null) {
            this.reader = new BufferedReader(new InputStreamReader(getInputStream(), getCharacterEncoding()));
        }
        return this.reader;
    }

    public byte[] getContentAsByteArray() {
        return this.cachedContent.toByteArray();
    }

    //....
}
```

ContentCachingRequestWrapper按照装饰者模式包装ServletRequest对象。它覆盖了getInputStream()和getReader()方法，以避免抛出IllegalStateException。它还定义了一个ContentCachingInputStream来包装原始的ServletInputStream，将数据缓存到一个输出流中。

在我们从请求对象中读取数据之后，ContentCachingInputStream帮助我们将字节缓存到类型为ByteArrayOutputStream的cachedContent对象中。然后我们可以通过调用它的getContentAsByteArray()方法重复读取数据。

在我们使用ContentCachingRequestWrapper之前，我们需要创建一个过滤器将ServletRequest转换为ContentCachingRequestWrapper：

```java
@WebFilter(urlPatterns = "/*")
public class CacheRequestContentFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        if (request instanceof HttpServletRequest) {
            String contentType = request.getContentType();
            if (contentType == null || !contentType.contains("multipart/form-data")) {
                request = new ContentCachingRequestWrapper((HttpServletRequest) request);
            }
        }
        chain.doFilter(request, response);
    }
}
```

最后，我们创建一个测试以确保它按预期工作：

```java
@Test
void givenServletRequest_whenDoFilter_thenCanCallBoth() throws ServletException, IOException {
    MockHttpServletRequest req = new MockHttpServletRequest();
    MockHttpServletResponse res = new MockHttpServletResponse();
    MockFilterChain chain = new MockFilterChain();

    Filter filter = new CacheRequestContentFilter();
    filter.doFilter(req, res, chain);

    ServletRequest request = chain.getRequest();
    assertTrue(request instanceof ContentCachingRequestWrapper);

    // 现在我们可以同时调用getInputStream()和getReader()
    request.getInputStream();
    request.getReader();
}
```

实际上，ContentCachingRequestWrapper有一个限制，我们不能多次读取请求。尽管我们采用了ContentCachingRequestWrapper，我们仍然从请求对象的ServletInputStream中读取字节。然而，默认的ServletInputStream实例不支持多次读取数据。当我们到达流的末尾时，调用ServletInputStream.read()将始终返回-1。

如果我们想克服这个限制，我们需要自己实现ServletRequest。

4. 结论

在本文中，我们查看了ServletRequest的文档，并理解了为什么会得到IllegalStateException。然后，我们学习了使用Spring MVC框架提供的ContentCachingRequestWrapper的解决方案。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。