---
date: 2023-07-31
category:
  - Spring
  - Thymeleaf
tag:
  - HTTP Session
  - Thymeleaf
head:
  - - meta
    - name: keywords
      content: Thymeleaf, Spring, HTTP Session, Web Development
---
# 在Thymeleaf中访问会话属性

在这篇短文中，我们将学习如何使用Thymeleaf库在服务器端访问HTTP会话。为此，我们将构建一个带有表单的网页，用于发送名称分析请求，一个显示结果的部分，以及一个面板，显示在会话期间发起的所有请求。

为了简化，示例将使用Spring + Thymeleaf，因此我们将使用Thymeleaf Spring标准方言。

会话信息位于servlet上下文中，我们可以在模板级别或Spring Boot控制器内部访问这些信息。现在，我们将检查两种访问会话信息的方法。

### 2.1. 在Thymeleaf模板中访问会话属性

在Thymeleaf中，我们有两个始终可用的基础对象：_ctx_和_locale_，它们以前缀‘#’表示。#ctx基础对象提供了访问包含HTTP会话信息的servlet上下文的权限。因此，在模板中，我们可以使用以下表达式访问会话：

```
#ctx.session
```

如果我们想要以更简短的方式访问会话，我们可以使用变量_session_，所以之前的命令等价于：

```
session
```

现在，让我们看看我们可以和不能对会话实例在模板中做什么。首先，我们可以获取会话中存在的属性数量：

```
${#ctx.session.size()}
```

同样，我们可以检查会话是否为空：

```
${#ctx.session.isEmpty()}
```

我们不能使用模板中的_containsKey_方法检查会话中是否注册了属性：

```
${#ctx.session.containsKey('lastAnalysis')}
```

这个方法总是返回_true_，因此，我们应该检查会话属性是否为null：

```
${#ctx.session.lastAnalysis}==null
```

最后，我们可以访问会话属性：

```
${#ctx.session.foo}
```

### 2.2. 在Spring Boot控制器中访问会话属性

在控制器内部，Thymeleaf的_IWebSession_接口定义了我们必须访问会话信息的方法：

```java
public interface IWebSession {
    public boolean exists();
    public boolean containsAttribute(String name);
    public int getAttributeCount();
    public Set`<String>` getAllAttributeNames();
    public Map`<String,Object>` getAttributeMap();
    public Object getAttributeValue(String name);
    public void setAttributeValue(String name,Object value);
    public void removeAttribute(String name);
}
```

在我们的示例中，我们将看到如何获取_IWebSession_接口的实例，并使用它来移除、获取和设置属性，所以我们不会使用接口中的所有方法，但这应该足以展示如何使用它。

从最后开始，_IServletWebExchange_将提供_IWebSession_实例。我们使用在_NameAnalysisController_控制器请求中接收到的_HttpServletRequest_和_HttpServletResponse_构建_IServletWebExchange_实例，使用_webApp_属性。

让我们看看_getIWebSession_方法：

```java
private IWebSession getIWebSession(HttpServletRequest request, HttpServletResponse response) {
    IServletWebExchange exchange = webApp.buildExchange(request, response);
    return exchange == null ? null : exchange.getSession();
}
```

现在，让我们看看_webApp_属性的类型以及它的实例化方式：

```java
private JakartaServletWebApplication webApp;

@Autowired
public NameAnalysisController(NameAnalysisService nameAnalysisService, SessionNameRequestFactory sessionNameRequestFactory, ServletContext servletContext) {
    super();
    ...
    this.webApp = JakartaServletWebApplication.buildApplication(servletContext);
}
```

这里，我们可以看到_webApp_属性是一个使用注入的_ServletContext_实例构建的_JakartaServletWebApplication_实例。此时，我们已经准备好访问会话信息。

### 3. 项目设置

让我们回顾一下我们的项目设置。这是一个Maven项目，有两个依赖项。第一个是_spring-boot-starter-web_，它将导入使用Spring Boot进行Web项目所需的一切：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
```

第二个是_spring-boot-starter-thymeleaf_，它将导入一切以启用与Spring Boot一起使用的Thymeleaf：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-thymeleaf``</artifactId>``
    `<version>`${spring.boot.starter.thymeleaf}`</version>`
``</dependency>``
```

### 3.1. Thymeleaf引擎配置

_spring-boot-starter-thymeleaf_依赖项将为我们配置一切，但在我们的示例中，让我们对_SpringResourceTemplateResolver_进行一些调整，以设置模板模式、模板前缀和模板后缀：

```java
@Autowired
public SpringWebConfig(SpringResourceTemplateResolver templateResolver) {
    super();

    templateResolver.setPrefix("/WEB-INF/templates/");
    templateResolver.setSuffix(".html");
    templateResolver.setTemplateMode(TemplateMode.HTML);
}
```

有了这些更改，解析器将通过添加前缀_/WEB-INF/templates/_和后缀_.html_来转换请求。因此，对_URL_的以下请求：

```
http://localhost:8080/name-analysis.html
```

将转换为以下模板路径：

```
WEB-INF/templates/name-analysis.html
```

### 4. 运行示例

要检查一切都在运行并进行中，让我们在项目的根目录下的命令行执行以下Maven命令：

```
mvn spring-boot:run
```

该命令将启动一个Tomcat服务器并将应用程序嵌入其中。服务器监听端口8080并在根上下文中发布示例应用程序。因此，访问基本页面的URL是：

```
http://localhost:8080
```

这个请求将显示：![img](https://www.baeldung.com/wp-content/uploads/2023/07/name-analysis-base-1.png)

在这里，我们可以看到示例的三个不同部分。我们将从_Analyze name_面板开始。它没有访问任何会话信息。它使用公开的_nameRequest_模型属性。

我们继续使用_Name analyzed_面板，它使用来自会话的_lastRequest_属性显示名称分析请求的结果。最后，最后的面板，_Requests History_面板，也将访问存储在会话的_requests_属性中的信息。

### 5. 结论

在这篇文章中，我们看到了如何配置一个Maven项目来使用Spring + Thymeleaf。除此之外，我们重点介绍了如何从Thymeleaf模板和Spring Boot服务器端访问HTTP会话信息。要更深入地了解Thymeleaf从头开始的工作原理，请阅读在Spring中使用Thymeleaf的介绍。

像往常一样，这个示例的完整代码可以在GitHub上找到。