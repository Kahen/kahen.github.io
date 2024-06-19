很抱歉，由于网络原因，我无法访问并解析您提供的链接内容。请您检查链接是否有效，并确保网页可以正常访问。如果链接有效，您可以重新发送链接，我将尝试再次解析并翻译网页内容。如果不需要解析链接，而有其他问题或需要帮助，请随时告知。---
date: 2024-06-19
category:
  - Spring Boot
  - Java
tag:
  - Spring Boot
  - Filter
  - Response Body
head:
  - - meta
    - name: keywords
      content: Spring Boot, Filter, Response Body, Java, Web Applications
---

# 在Spring Boot Filter中获取响应体

无论你是刚开始学习还是拥有多年经验，**Spring Boot** 是构建新应用程序的绝佳选择，它让一切变得简单。

Jmix增强了Spring Boot开发者的能力，允许他们构建和交付**全栈Web****应用程序**，而无需涉足前端技术。它使你能够从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了前端/后端分离及相关安全问题。

**Jmix平台**包括一个构建在**Spring Boot, JPA, 和 Vaadin**之上的框架，并带有Jmix Studio，**一个IntelliJ IDEA插件**，配备了一套开发者生产力工具。该平台还提供了**现成的**插件，用于报告生成、BPM、地图等，你可以在Jmix应用程序中使用它们，或者作为单独的服务。所有技术都是相互连接的，使单个Java开发者能够以整个团队的水平执行任务，**入门所需的知识最少**。

另外！Jmix可以**立即生成一个CRUD Web应用程序**，包括其JPA数据模型和UI，**直接从现有数据库**。然后，在Jmix Studio的帮助下继续开发。

智能开发，不费力！

**>> 成为全栈开发者**

**与Jmix一起**

既然《REST With Spring -_ "REST With Spring Boot"_**的新版本终于发布了，当前的价格将在6月22日之前**有效**，之后将永久增加50美元。

**>> 立即获取访问权限**

## 1. 引言
在本文中，我们将探讨如何在Spring Boot过滤器中从_ServletResponse_检索响应体。

本质上，我们将定义问题，然后我们将使用一个解决方案，该解决方案缓存响应体，使其在Spring Boot过滤器中可用。让我们开始。

## 2. 理解问题
首先，让我们理解我们试图解决的问题。

在使用Spring Boot过滤器时，从_ServletResponse_访问响应体是棘手的。**这是因为响应体不容易获得，因为它是在过滤器链完成执行后写入输出流的**。

然而，一些操作，如生成哈希签名，需要在将响应发送给客户端之前获取响应体的内容。因此，我们需要找到一种方法来读取体的内容。

## 3. 在过滤器中使用_ContentCachingResponseWrapper_
为了克服前面定义的问题，我们将创建一个自定义过滤器并使用Spring框架提供的_ContentCachingResponseWrapper_类：

```
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
  throws IOException, ServletException {
    ContentCachingResponseWrapper responseCacheWrapperObject =
      new ContentCachingResponseWrapper((HttpServletResponse) servletResponse);
    filterChain.doFilter(servletRequest, responseCacheWrapperObject);
    byte[] responseBody = responseCacheWrapperObject.getContentAsByteArray();
    MessageDigest md5Digest = MessageDigest.getInstance("MD5");
    byte[] md5Hash = md5Digest.digest(responseBody);
    String md5HashString = DatatypeConverter.printHexBinary(md5Hash);
    responseCacheWrapperObject.getResponse().setHeader("Response-Body-MD5", md5HashString);
    // ...
}
```

简而言之，包装器类允许我们包装_HttpServletResponse_来缓存响应体内容，并调用_doFilter()_将请求传递给下一个过滤器。

请记住，我们在这里必须不要忘记_doFilter()_调用。否则，传入的请求将不会进入Spring过滤器链中的下一个过滤器，应用程序也不会按我们预期的方式处理请求。实际上，**不调用_doFilter()_是违反servlet规范的**。

此外，我们不要忘记使用_responseCacheWrapperObject_调用_doFilter()_。否则，响应体将不会被缓存。简而言之，_ContentCachingResponseWrapper_将过滤器置于响应输出流和发起HTTP请求的客户端之间。因此，在创建响应体输出流之后，这种情况下是在_doFilter()_调用之后，内容在过滤器内可用以进行处理。

使用包装器后，可以使用_getContentAsByteArray()_方法在过滤器内获取响应体。我们使用这种方法来计算MD5哈希。

首先，我们使用_MessageDigest_类创建响应体的MD5哈希。其次，我们将字节数组转换为十六进制字符串。第三，我们使用_setHeader()_方法将结果哈希字符串设置为响应对象的标头。

如果需要，我们可以将字节数组转换为字符串，使主体的内容更加明确。

最后，在退出_doFilter()_方法之前，至关重要的是调用_copyBodyToResponse()_以将更新后的响应体复制回原始响应：

```
responseCacheWrapperObject.copyBodyToResponse();
```

**在退出_doFilter()_方法之前调用_copyBodyToResponse()_至关重要。否则，客户端将不会收到完整的响应**。

## 4. 配置过滤器
现在，我们需要在Spring Boot中添加过滤器：

```
@Bean
public FilterRegistrationBean loggingFilter() {
    FilterRegistrationBean registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(new MD5Filter());
    return registrationBean;
}
```

在这里，我们配置创建_FilterRegistrationBean_，使用我们之前创建的过滤器的实现。

## 5. 测试MD5
最后，我们可以使用Spring中的集成测试来测试一切是否按预期工作：

```
@Test
void whenExampleApiCallThenResponseHasMd5Header() throws Exception {
    String endpoint = "/api/example";
    String expectedResponse = "Hello, World!";
    String expectedMD5 = getMD5Hash(expectedResponse);

    MvcResult mvcResult = mockMvc.perform(get(endpoint).accept(MediaType.TEXT_PLAIN_VALUE))
      .andExpect(status().isOk())
      .andReturn();

    String md5Header = mvcResult.getResponse()
      .getHeader("Response-Body-MD5");
    assertThat(md5Header).isEqualTo(expectedMD5);
}
```

在这里，我们调用返回正文中的“Hello, World!”文本的_/api/example_控制器。我们定义了_getMD5Hash()_方法，它将响应转换为与我们在过滤器中使用的类似的MD5：

```
private String getMD5Hash(String input) throws NoSuchAlgorithmException {
    MessageDigest md5Digest = MessageDigest.getInstance("MD5");
    byte[] md5Hash = md5Digest.digest(input.getBytes(StandardCharsets.UTF_8));
    return DatatypeConverter.printHexBinary(md5Hash);
}
```

## 6. 结论
在本文中，我们学习了如何使用_ContentCachingResponseWrapper_类在Spring Boot过滤器中从_ServletResponse_检索响应体。我们使用这种机制展示了如何在HTTP响应头中实现主体的MD5编码。

如常，我们可以在GitHub上找到完整的代码。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。

OK