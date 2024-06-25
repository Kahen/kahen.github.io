根据您提供的网页内容，以下是翻译结果：

---
date: 2024-06-25
category:
  - Java
  - Web Development
tag:
  - HTTP Request
  - Servlet
  - HttpServletRequest
head:
  - - meta
    - name: keywords
      content: Java, HTTP, Servlet, HttpServletRequest, User-Agent, Web Development
---
# 在Java中从HTTP请求获取客户端信息

Web应用程序主要基于请求-响应模型，该模型描述了使用HTTP协议在客户端和Web服务器之间进行数据交换。在服务器端，它接受或拒绝请求，理解发出请求的客户端非常重要。

在本教程中，我们将学习如何从HTTP请求中捕获客户端信息。

## HTTP请求对象

在了解HTTP请求之前，我们首先应该了解_Servlet_。_Servlet_是Java实现的基础部分，用于扩展Web开发的能力，以便处理HTTP请求并在响应中生成动态内容。

_HttpServletRequest_是Java Servlet API中的一个接口，代表客户端发出的HTTP请求。**_HttpServletRequest_对象在捕获有关客户端的重要信息方面非常有用。** HttpServletRequest提供了开箱即用的方法，如_getRemoteAddr()_, _getRemoteHost()_, _getHeader()_和_getRemoteUser()_，这些方法有助于提取客户端信息。

### 2.1 获取客户端IP地址

我们可以使用_getRemoteAddr()_方法获取客户端的IP地址：
```
String remoteAddr = request.getRemoteAddr(); // 198.167.0.1
```
需要注意的是，此方法检索到的IP地址是服务器看到的IP地址，可能并不总是代表真实的客户端IP地址，这是由于代理服务器、负载均衡器等因素。

### 2.2 获取远程主机

我们可以使用_getRemoteHost()_方法获取客户端的主机名：
```
String remoteHost = request.getRemoteHost(); // baeldung.com
```

### 2.3 获取远程用户

如果客户端经过身份验证，我们可以使用_getRemoteUser()_方法获取客户端用户名：
```
String remoteUser = request.getRemoteUser(); // baeldung
```
需要注意的是，如果客户端未经身份验证，那么我们可能会得到_null_。

我们可以使用_getHeader(headerName)_方法读取客户端传递的头值：
```
String contentType = request.getHeader("content-type"); // application/json
```

**获取客户端信息的一个重要头是_User-Agent_头。** 它包括客户端的软件、系统等信息。一些重要信息可能包括浏览器、操作系统、设备信息、插件、附加组件等。

下面是一个_User-Agent_字符串的例子：
```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36
```

我们可以使用由_HttpServletRequest._提供的_getHeader(String headerName)_方法读取_User-Agent_头。解析_User-Agent_字符串可能本质上很复杂，但由于其动态性质，有多种编程语言的库可以简化这项任务。对于Java生态系统，_uap-java_是一个流行的选择。

除了上述方法外，还有其他方法，如_getSessionID()_, _getMethod()_, _getRequestURL()_等，根据用例可能有所帮助。

如前一节所讨论的，要解析_User-Agent_，我们可以使用_uap-java_库。为此，我们需要在_pom.xml_文件中添加以下XML片段：
```
`<dependency>`
    `<groupId>`com.github.ua-parser`</groupId>`
    `<artifactId>`uap-java`</artifactId>`
    `<version>`1.5.4`</version>`
`</dependency>`
```

一旦我们配置了依赖项，让我们创建一个简单的_AccountServlet_，它作为HTTP端点接受客户端请求：
```
@WebServlet(name = "AccountServlet", urlPatterns = "/account")
public class AccountServlet extends HttpServlet {
    public static final Logger log = LoggerFactory.getLogger(AccountServlet.class);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        AccountLogic accountLogic = new AccountLogic();
        Map`````<String, String>````` clientInfo = accountLogic.getClientInfo(request);
        log.info("Request client info: {}, " + clientInfo);

        response.setStatus(HttpServletResponse.SC_OK);
    }
}
```

然后，我们可以将请求对象传递给_AccountLogic_，它从用户请求中提取客户端信息。然后，我们可以创建一个_AccountLogic_类，主要包含获取客户端信息的所有逻辑。我们可以使用我们之前讨论的所有常见辅助方法：
```
public class AccountLogic {
    public Map`````<String, String>````` getClientInfo(HttpServletRequest request) {
        String remoteAddr = request.getRemoteAddr();
        String remoteHost = request.getRemoteHost();
        String remoteUser = request.getRemoteUser();
        String contentType = request.getHeader("content-type");
        String userAgent = request.getHeader("user-agent");

        Parser uaParser = new Parser();
        Client client = uaParser.parse(userAgent);

        Map`````<String, String>````` clientInfo = new HashMap`````<String, String>`````();
        clientInfo.put("os_family", client.os.family);
        clientInfo.put("device_family", client.device.family);
        clientInfo.put("userAgent_family", client.userAgent.family);
        clientInfo.put("remote_address", remoteAddr);
        clientInfo.put("remote_host", remoteHost);
        clientInfo.put("remote_user", remoteUser);
        clientInfo.put("content_type", contentType);
        return clientInfo;
    }
}
```

最后，我们准备编写一个简单的单元测试来验证功能：
```
@Test
void givenMockHttpServletRequestWithHeaders_whenGetClientInfo_thenReturnsUserAGentInfo() {
    HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
    when(request.getHeader("user-agent")).thenReturn("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36, acceptLanguage:en-US,en;q=0.9");
    when(request.getHeader("content-type")).thenReturn("application/json");
    when(request.getRemoteAddr()).thenReturn("198.167.0.1");
    when(request.getRemoteHost()).thenReturn("baeldung.com");
    when(request.getRemoteUser()).thenReturn("baeldung");

    AccountLogic accountLogic = new AccountLogic();
    Map`````<String, String>````` clientInfo = accountLogic.getClientInfo(request);
    assertThat(clientInfo.get("os_family")).isEqualTo("Mac OS X");
    assertThat(clientInfo.get("device_family")).isEqualTo("Mac");
    assertThat(clientInfo.get("userAgent_family")).isEqualTo("Chrome");
    assertThat(clientInfo.get("content_type")).isEqualTo("application/json");
    assertThat(clientInfo.get("remote_user")).isEqualTo("baeldung");
    assertThat(clientInfo.get("remote_address")).isEqualTo("198.167.0.1");
    assertThat(clientInfo.get("remote_host")).isEqualTo("baeldung.com");
}
```

## 4. 结论

在本文中，我们了解了_HttpServletRequest_对象，它提供了有助于捕获请求客户端信息的方法。我们还了解了_User-Agent_头，它提供了诸如浏览器家族、操作系统家族等客户端系统级信息。

之后，我们还实现了从请求对象捕获客户端信息的逻辑。

如往常一样，示例代码可在GitHub上找到。
OK