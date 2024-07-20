---
date: 2024-07-21
category:
  - Java
  - Web开发
tag:
  - Jakarta EE MVC
  - Eclipse Krazo
head:
  - - meta
    - name: keywords
      content: Java, Jakarta EE MVC, Eclipse Krazo, Web开发
---

# Jakarta EE MVC / Eclipse Krazo 简介

模型-视图-控制器（MVC）是一种流行的设计模式，用于构建Web应用程序。多年来，它已成为构建现代基于Web的应用程序的事实上的设计原则。

在本教程中，我们将学习如何使用Jakarta EE MVC 2.0构建带有网页和REST API的Web应用程序。

## 2. JSR-371

**Jakarta MVC 2.0（前称JSR 371 MVC 1.0）是基于Jakarta RESTful Web Services或JAX-RS（前称Java API for RESTful web services）的基于动作的Web框架。** JSR-371通过额外的注解补充了JAX-RS，使构建Web应用程序更加方便。

JSR-371或Jakarta MVC标准化了我们在Java中开发Web应用程序的方式。此外，主要目标是利用现有的CDI（Contexts和Dependency Injections）和Bean Validation，并支持JSP和Facelets作为视图技术。

目前，Jakarta MVC 2.1规范的工作正在进行中，可能会随着Jakarta EE 10的发布而发布。

## 3. JSR-371注解

JSR-371定义了一些除了JAX-RS注解之外的注解。**所有这些注解都是_jakarta.mvc._包的一部分。**

### 3.1. _jakarta.mvc.Controller_

_@Controller_注解将资源标记为MVC控制器。当用于类时，类中的所有资源方法都变成控制器。类似地，将此注解用于资源方法会使得该方法成为控制器。通常，如果我们想要在同一个类中定义MVC控制器和REST API，对方法定义_@Controller_会很有帮助。

例如，让我们定义一个控制器：

```java
@Path("user")
public class UserController {
    @GET
    @Produces("text/html")
    @Controller
    public String showUserForm(){
        return "user.jsp";
    }
    @GET
    @Produces("application/json")
    public String getUserDetails(){
        return getUserDetails();
    }
}
```

这个类有一个_@Controller_来渲染用户表单（_showUserForm_）和一个返回用户详细信息JSON的REST API（_getUserDetails_）。

### 3.2. _jakarta.mvc.View_

像_@Controller_一样，我们可以将_@View_注解标记在资源类或资源方法上。通常，返回_void_的资源方法应该有_@View_。带有_@View_的类表示类中控制器的默认视图，类型为_void_。

例如，让我们定义一个带有_@View_的控制器：

```java
@Controller
@Path("user")
@View("defaultModal.jsp")
public class UserController {
    @GET
    @Path("void")
    @View("userForm.jsp")
    @Produces("text/html")
    public void showForm() {
        getInitFormData();
    }

    @GET
    @Path("string")
    @Produces("text/html")
    public void showModal() {
        getModalData();
    }
}
```

在这里，资源类和资源方法都有_@View_注解。控制器_showForm_渲染视图_userForm.jsp_。类似地，_showModal_控制器渲染在资源类上定义的_defaultModal.jsp_。

### 3.3. _jakarta.mvc.binding.MvcBinding_

Jakarta RESTful Webservices会拒绝具有绑定和验证错误的请求。对于与Web页面交互的用户来说，可能不适用类似的设置。幸运的是，即使在发生绑定和验证错误时，Jakarta MVC也会调用控制器。通常，用户应该清楚地了解数据绑定错误。

控制器注入一个_BindingResult_以向用户呈现易于理解的验证和绑定错误消息。例如，让我们定义一个带有_@MvcBinding_的控制器：

```java
@Controller
@Path("user")
public class UserController {
    @MvcBinding
    @FormParam("age")
    @Min(18)
    private int age;
    @Inject
    private BindingResult bindingResult;
    @Inject
    private Models models;
    @POST
    public String processForm() {
        if (bindingResult.isFailed()) {
            models.put("errors", bindingResult.getAllMessages());
            return "user.jsp";
        }
    }
}
```

在这里，如果用户输入的年龄小于18岁，用户将被送回带有绑定错误的同一页面。使用表达式语言（EL）的_user.jsp_页面可以检索请求属性_errors_并在页面上显示它们。

### 3.4. _jakarta.mvc.RedirectScoped_

考虑一个表单，用户填写并提交数据（HTTP POST）。服务器处理数据，并将用户重定向到成功页面（HTTP GET）。这种模式被广泛称为PRG（Post-Redirect-Get）模式。在我们希望在POST和GET之间保留数据的情况下，有几种场景。在这些场景中，模型/bean的作用域超出了单个请求。

当一个bean被注解为_@RedirectScoped_时，bean的状态超出了单个请求。然而，在POST、重定向和GET完成后，状态被销毁。用_@RedirectScoped_标记的bean在POST、重定向和GET完成后被销毁。

例如，假设bean_User_有注解_@RedirectScoped_：

```java
@RedirectScoped
public class User
{
    private String id;
    private String name;
    // getters and setters
}
```

接下来，将此bean注入控制器：

```java
@Controller
@Path("user")
public class UserController {
    @Inject
    private User user;
    @POST
    public String post() {
        user.setName("John Doe");
        return "redirect:/submit";
    }
    @GET
    public String get() {
        return "success.jsp";
    }
}
```

在这里，bean_User_可用于POST以及随后的重定向和GET。因此，_success.jsp_可以使用EL访问bean的_name_属性。

### 3.5. _jakarta.mvc.UriRef_

我们只能对资源方法使用_@UriRef_注解。_@UriRef_使我们能够为资源方法提供名称。我们可以使用这些名称在视图中调用我们的控制器，而不是控制器路径URI。

假设有一个用户表单，有一个_href_：

```html
`<a href="/app/user">`Clich Here``</a>``
```

点击_Clich Here_将调用映射到_GET /app/user_的控制器。

```java
@GET
@UriRef("user-details")
public String getUserDetails(String userId) {
    userService.getUserDetails(userId);
}
```

在这里，我们用_user-details_命名了我们的控制器。现在，我们可以在视图中引用这个名字，而不是URI：

```html
`<a href="${mvc.uri('user-details')}">`Click Here``</a>``
```

### 3.6. _jakarta.mvc.security.CsrfProtected_

这个注解强制要求在调用资源方法时需要CSRF验证。如果CSRF令牌无效，客户端将收到_ForbiddenException_（HTTP 403）异常。只有资源方法才能有这个注解。

考虑一个控制器：

```java
@POST
@Path("user")
@CsrfProtected
public String saveUser(User user) {
    service.saveUser(user);
}
```

鉴于控制器有_@CsrfProtected_注解，只有在请求包含有效的CSRF令牌时，请求才能到达控制器。

# 4. 构建MVC应用程序

接下来，让我们使用REST API和控制器构建一个Web应用程序。最后，让我们将我们的Web应用程序部署在最新版本的Eclipse Glassfish上。

### 4.1. 生成项目

首先，让我们使用Maven _archetype:generate_生成Jakarta MVC 2.0项目：

```shell
mvn archetype:generate \
  -DarchetypeGroupId=org.eclipse.krazo \
  -DarchetypeArtifactId=krazo-jakartaee9-archetype \
  -DarchetypeVersion=2.0.0 -DgroupId=com.baeldung \
  -DartifactId=krazo -DkrazoImpl=jersey
```

上述archetype生成了一个带有所需工件的maven项目，类似于： ![img](https://www.baeldung.com/wp-content/uploads/2022/03/1.png)

此外，生成的_pom.xml_包含_jakarta.platform, jakarta.mvc_和_org.eclipse.krazo_依赖项：

```xml
```<dependency>```
    ```<groupId>```jakarta.platform```</groupId>```
    ```<artifactId>```jakarta.jakartaee-web-api```</artifactId>```
    ```<version>```9.1.0```</version>```
    `<scope>`provided`</scope>`
```</dependency>```
```<dependency>```
    ```<groupId>```jakarta.mvc```</groupId>```
    ```<artifactId>```jakarta.mvc-api```</artifactId>```
    ```<version>```2.0.0```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.eclipse.krazo```</groupId>```
    ```<artifactId>```krazo-jersey```</artifactId>```
    ```<version>```2.0.0```</version>```
```</dependency>```
```

### 4.2_Controllers_

接下来，让我们定义控制器来显示表单、保存用户详细信息以及获取用户详细信息的API。但首先，让我们定义我们的应用程序路径：

```java
@ApplicationPath("/app")
public class UserApplication extends Application {
}
```

应用程序路径被定义为_/app_。接下来，让我们定义我们的控制器，将用户转发到用户详细信息表单：

```java
@Path("users")
public class UserController {
    @GET
    @Controller
    public String showForm() {
        return "user.jsp";
    }
}
```

接下来，在_WEB-INF/views_下我们可以创建视图_user.jsp_，并构建和部署应用程序：

```shell
mvn clean install glassfish:deploy
```

这个Glassfish Maven插件构建、部署并在端口8080上运行。部署成功后，我们可以打开浏览器并访问URL：

_http://localhost:8080/mvc-2.0/app/users_：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/form-1-1024x304.png)

接下来，让我们定义一个处理表单提交动作的HTTP POST：

```java
@POST
@Controller
public String saveUser(@Valid @BeanParam User user) {
    return "redirect:users/success";
}
```

现在，当用户点击_创建_按钮时，控制器处理POST请求并将用户重定向到成功页面：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/success-1024x133.png)

让我们利用Jakarta验证、CDI和_@MvcBinding_提供表单验证：

```java
@Named("user")
public class User implements Serializable {

    @MvcBinding
    @Null
    private String id;

    @MvcBinding
    @NotNull
    @Size(min = 1, message = "名称不能为空")
    @FormParam("name")
    private String name;
    // 其他带有getter和setter的验证
}
```

一旦我们有了表单验证，让我们检查绑定错误。如果有绑定错误，我们必须向用户展示验证消息。为此，让我们注入_BindingResult_来处理无效的表单参数。让我们更新我们的_saveUser_方法：

```java
@Inject
private BindingResult bindingResult;

public String saveUser(@Valid @BeanParam User user) {
    if (bindingResult.isFailed()) {
        models.put("errors", bindingResult.getAllErrors());
        return "user.jsp";
    }
    return "redirect:users/success";
}
```

有了验证，如果用户没有提交必填参数，我们将显示验证错误：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/validations-1024x402.png)

接下来，让我们通过使用_@CsrfProtected_保护我们的POST方法免受CSRF攻击。给_saveUser_方法添加_@CsrfProtected_：

```java
@POST
@Controller
@CsrfProtected
public String saveUser(@Valid @BeanParam User user) {
}
```

接下来，让我们尝试点击_创建_按钮：

![img](https://www.baeldung.com/wp-content/uploads/2022/03/403-1024x154.png)

当控制器受到CSRF攻击的保护时，客户端在每次请求时都应该传递CSRF令牌。所以，让我们在_user.jsp_中添加一个隐藏字段，在每次请求时添加CSRF令牌：

```html
`<input type="hidden" name="${mvc.csrf.name}" value="${mvc.csrf.token}"/>`
```

同样，让我们现在开发一个REST API：

```java
@GET
@Produces(MediaType.APPLICATION_JSON)
public List`<User>` getUsers() {
    return users;
}
```

这个HTTP GET API返回用户列表。

# 5. 结论

在本文中，我们学习了Jakarta MVC 2.0以及如何使用Eclipse Krazo开发Web应用程序和REST API。我们已经看到了MVC 2.0如何标准化我们在Java中构建基于MVC的Web应用程序的方式。

如往常一样，完整的源代码可在GitHub上找到。

![img](https://www.baeldung.com/wp-content/uploads/2022/03/form-1-1024x304.png)

OK