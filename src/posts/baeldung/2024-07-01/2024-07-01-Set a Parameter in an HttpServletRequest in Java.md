---
date: 2023-09-01
category:
  - Java
  - Servlet
tag:
  - HttpServletRequest
  - Java Web
head:
  - - meta
    - name: keywords
      content: Java Servlet API, HttpServletRequest, request parameter, parameter sanitization, XSS
---
# 在Java中为HttpServletRequest设置参数

当使用Servlet API开发Java Web应用程序时，_HttpServletRequest_对象在处理传入的HTTP请求中扮演着关键角色。它提供了对请求的各个方面的访问，例如参数、头和属性。

请求参数始终由HTTP客户端提供。然而，在某些场景中，我们可能需要在应用程序处理之前，在_HttpServletRequest_对象中以编程方式设置参数。

需要注意的是，**_HttpServletRequest_缺少添加新参数或更改参数值的setter方法。**在本文中，我们将探讨如何通过扩展原始_HttpServletRequest_的功能来实现这一点。

## 2. Maven依赖项

除了标准的Java Servlet API：

```
``<dependency>``
    ``<groupId>``javax.servlet``</groupId>``
    ``<artifactId>``javax.servlet-api``</artifactId>``
    ``<version>``4.0.1``</version>``
    `<scope>`provided`</scope>`
``</dependency>``
```

我们还将使用commons-text库在我们的一个用例中，通过转义HTML实体来清理请求参数：

```
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-text``</artifactId>``
    ``<version>``1.10.0``</version>``
``</dependency>``
```

## 3. 必要的Servlet组件

在我们深入实际使用示例之前，让我们快速看一下我们将要使用的某些基础Servlet组件。

### 3.1. _HttpServletRequest_

_HttpServletRequest_类是客户端和Servlets之间通信的主要方式。它**封装了传入的HTTP请求**，提供了对参数、头和其他请求相关信息的访问。

### 3.2. _HttpServletRequestWrapper_

_HttpServletRequestWrapper_通过作为现有_HttpServletRequest_对象的装饰器来扩展_HttpServletRequest_的功能。这允许我们根据我们的特定需求**附加额外的责任**。

### 3.3. _Filter_

_Filter_在Servlet容器中捕获并处理请求和响应。这些_Filter_被设计为在Servlet执行之前调用，使它们能够**修改传入的请求和传出的响应**。

## 4. 参数清理

在_HttpServletRequest_中以编程方式设置参数的一个应用是清理请求参数，有效地减轻跨站脚本（XSS）漏洞。**这个过程涉及从用户输入中消除或编码潜在的有害字符，从而增强Web应用程序的安全性。**

### 4.1. 示例

现在，让我们详细探讨这个过程。首先，我们必须设置一个Servlet _Filter_来拦截请求。过滤器提供了一种在请求到达目标Servlet或JSP之前修改请求和响应的方法。

以下是一个Servlet _Filter_的具体示例，它拦截所有对特定URL模式的请求，确保过滤器链返回_SanitizeParametersRequestWrapper_而不是原始_HttpSevletRequest_对象：

```
@WebFilter(urlPatterns = {"/sanitize/with-sanitize.jsp"})
public class SanitizeParametersFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpSerlvetRequest httpReq = (HttpSerlvetRequest) request;
        chain.doFilter(new SanitizeParametersRequestWrapper(httpReq), response);
    }
}
```

类_SanitizeParameterRequestWrapper_扩展了_HttpServletRequestWrapper_。这在参数清理过程中起着至关重要的作用。这个类被设计为清理原始_HttpServletRequest_的请求参数，并且只向调用JSP公开清理后的参数：

```
public class SanitizeParametersRequestWrapper extends HttpServletRequestWrapper {

    private final Map````<String, String[]>```` sanitizedMap;

    public SanitizeParametersRequestWrapper(HttpServletRequest request) {
        super(request);
        sanitizedMap = Collections.unmodifiableMap(
            request.getParameterMap().entrySet().stream()
                .collect(Collectors.toMap(
                  Map.Entry::getKey,
                  entry -> Arrays.stream(entry.getValue())
                    .map(StringEscapeUtils::escapeHtml4)
                    .toArray(String[]::new)
                )));
    }

    @Override
    public Map````<String, String[]>```` getParameterMap() {
        return sanitizedMap;
    }

    @Override
    public String[] getParameterValues(String name) {
        return Optional.ofNullable(getParameterMap().get(name))
            .map(values -> Arrays.copyOf(values, values.length))
            .orElse(null);
    }

    @Override
    public String getParameter(String name) {
        return Optional.ofNullable(getParameterValues(name))
            .map(values -> values[0])
            .orElse(null);
    }

}
```

在构造函数中，我们遍历每个请求参数并使用_StringEscapeUtils.escapeHtml4_来清理该值。处理后的参数被收集到一个新的清理后的映射中。

我们重写_getParameter_方法，以返回来自清理映射的相应参数，而不是原始请求参数。即使_getParameter_方法是主要的使用重点，重写_getParameterMap_和_getParameterValues_也是至关重要的。**我们确保所有参数检索方法之间的一致行为，并在整个过程中保持安全标准。**

根据规范，_getParameterMap_方法保证返回一个不可修改的映射，防止更改内部值。**因此，遵守这个约定并确保重写也返回一个不可修改的映射是很重要的。**同样，重写的_getParameterValues_方法返回一个克隆的数组，而不是其内部值。

现在，让我们创建一个JSP来说明我们的工作。它简单地在屏幕上呈现_request_请求参数的值：

```
The text below comes from request parameter "input":`<br/>`
`<%=request.getParameter("input")%>`
```

### 4.2. 结果

现在，让我们在未激活清理过滤器的情况下运行JSP。我们将向请求参数注入一个脚本标签，作为反射XSS：

```
http://localhost:8080/sanitize/without-sanitize.jsp?input=```<script>```alert('Hello');```</script>```
```

我们将看到嵌入在参数中的JavaScript被浏览器执行：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/hello-popup.jpg)

接下来，我们将运行清理版本：

```
http://localhost:8080/sanitize/with-sanitize.jsp?input=```<script>```alert('Hello');```</script>```
```

在这种情况下，过滤器将捕获请求并将_SanitizeParameterRequestWrapper_传递给调用JSP。结果，弹出窗口将不再出现。相反，我们将观察到HTML实体被转义，并在屏幕上可见地呈现：

```
The text below comes from request parameter "input":
```<script>```alert('Hello');```</script>```
```

## 5. 第三方资源访问

让我们考虑另一个场景，其中一个第三方模块接受一个请求参数_locale_来改变模块显示的语言。注意，我们无法直接修改第三方模块的源代码。

在我们的示例中，我们将_locale_参数设置为默认系统区域设置。然而，它也可以从另一个来源获取，例如HTTP会话。

### 5.1. 示例

第三方模块是一个JSP页面：

```
`<%
    String localeStr = request.getParameter("locale");
    Locale currentLocale = (localeStr != null ? new Locale(localeStr) : null);
%>`
The language you have selected: `<%=currentLocale != null ? currentLocale.getDisplayLanguage(currentLocale) : " None"%>`
```

如果提供了_locale_参数，模块将显示语言名称。

我们将通过_SetParameterRequestWrapper_向目标请求参数提供默认系统语言_Locale.getDefault().getLanguage()_。为此，让我们在我们的_SetParameterRequestWrapper_中设置_locale_参数，它装饰了原始_HttpServletRequest_：

```
@WebServlet(name = "LanguageServlet", urlPatterns = "/setparam/lang")
public class LanguageServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        SetParameterRequestWrapper requestWrapper = new SetParameterRequestWrapper(request);
        requestWrapper.setParameter("locale", Locale.getDefault().getLanguage());
        request.getRequestDispatcher("/setparam/3rd_party_module.jsp").forward(requestWrapper, response);
    }
}
```

我们将采取与前一节类似的方法来创建_SetParameterRequestWrapper_。此外，我们将实现_setParameter_方法，以向现有参数映射中添加一个新参数：

```
public class SetParameterRequestWrapper extends HttpServletRequestWrapper {

    private final Map````<String, String[]>```` paramMap;

    public SetParameterRequestWrapper(HttpServletRequest request) {
        super(request);
        paramMap = new HashMap<>(request.getParameterMap());
    }

    @Override
    public Map````<String, String[]>```` getParameterMap() {
        return Collections.unmodifiableMap(paramMap);
    }

    public void setParameter(String name, String value) {
        paramMap.put(name, new String[] {value});
    }

    // getParameter() 和 getParameterValues() 与 SanitizeParametersRequestWrapper 相同
}
```

_getParameter_方法检索存储在_paramMap_中的参数，而不是原始请求。

### 5.2. 结果

_LangaugeServlet_通过_SetParameterRequestWrapper_将_locale_参数传递给第三方模块。当我们在英语语言服务器上访问第三方模块时，我们将看到以下内容：

```
The language you have selected: English
```

## 6. 结论

在本文中，我们查看了在Java Web应用程序开发中可以用于处理客户端请求的一些重要的Servlet组件。这些包括_HttpServletRequest_、_HttpServletRequestWrapper_和_Filter_。

通过具体示例，**我们展示了如何扩展_HttpServletRequest_的功能，以编程方式设置和修改请求参数。**

无论是通过清理用户输入来增强安全性，还是与第三方资源集成，这些技术都使开发人员能够应对各种场景。

像往常一样，这个示例的完整源代码可以在GitHub上找到。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)[Gravatar Profile Image](https://secure.gravatar.com/avatar/e40831f54e3d08c1273e41e60a538c33?s=50&r=g)[Liam Williams Baeldung Editor](https://www.baeldung.com/wp-content/uploads/custom_avatars/Liam-Williams-Baeldung-Editor-150x150.jpeg)[Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)[Baeldung REST POST Footer](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)

OK