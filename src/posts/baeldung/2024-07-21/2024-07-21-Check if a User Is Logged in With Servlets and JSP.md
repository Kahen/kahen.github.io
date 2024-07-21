---
date: 2022-02-01
category:
  - Servlets
  - JSP
tag:
  - Java
  - Login
  - Security
head:
  - - meta
    - name: keywords
      content: Servlets, JSP, User Login, Session Management
---
# 使用Servlets和JSP检查用户是否登录

在本教程中，我们将学习如何检查用户的登录情况，并确保用户使用有效的凭据填写了登录表单并启动了会话。**然而，我们将不使用Spring Security，只使用JSP和servlets。**因此，我们需要一个能够支持它的servlet容器，比如Tomcat 9。

通过本教程，我们将对底层工作机制有一个良好的理解。

## 2. 持久化策略
首先，我们需要用户。为了简单起见，我们将使用预加载的映射。让我们定义它以及我们的_User_：

```java
public class User {
    static HashMap`<String, User>` DB = new HashMap<>();
    static {
        DB.put("user", new User("user", "pass"));
        // ...
    }

    private String name;
    private String password;

    // getters and setters
}
```

## 3. 过滤请求
我们将通过创建一个过滤器来检查无会话请求，阻止直接访问我们的servlet：

```java
@WebFilter("/*")
public class UserCheckFilter implements Filter {

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
        // ...
        request.setAttribute("origin", request.getRequestURI());

        if (!request.getRequestURI().contains("login") && request.getSession(false) == null) {
            forward(request, response, "/login.jsp");
            return;
        }

        chain.doFilter(request, response);
    }
}
```

**在这里，通过在_@WebFilter_上定义“_/*_”作为我们的URL模式，所有请求首先会通过我们的过滤器。**然后，如果没有会话，我们将请求重定向到我们的登录页面，存储_origin_以备后用。最后，我们提前返回，防止我们的servlet在没有适当会话的情况下处理。

## 4. 使用JSP创建登录表单
为了构建我们的登录表单，我们需要导入JSTL的核心标签库。同时，让我们在_page_指令中将_session_属性设置为“_false_”。结果，不会自动创建新会话，我们可以完全控制：

```jsp
`<%@ page session="false"%>`
`<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>`

`<form action="login" method="POST">`
    ...
`</form>`
```

然后，在我们的_form_内部，我们将有一个隐藏输入来保存_origin_：

```jsp
`<input type="hidden" name="origin" value="${origin}">`
```

接下来，我们将包括一个条件元素来输出错误：

```jsp
`<c:if test="${not empty error}">`
    * error: ${error}
`</c:if>`
```

最后，让我们添加一些_input_标签，以便用户可以输入并提交凭据：

```jsp
`<input type="text" name="name">`
`<input type="password" name="password">`
`<input type="submit">`
```

## 5. 设置我们的登录servlet
在我们的servlet中，如果是_GET_，我们将转发请求到我们的登录表单。**最重要的是，如果是_POST_，我们将验证登录**：

```java
@WebServlet("/login")
public class UserCheckLoginServlet extends HttpServlet {
    // ...
}

```

所以，在我们的_doGet()_方法中，我们将重定向到我们的登录JSP，传递_origin_转发：

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) {
    String referer = (String) request.getAttribute("origin");
    request.setAttribute("origin", referer);
    forward(request, response, "/login.jsp");
}
```

在我们的_doPost()_中，我们验证凭据并创建会话，传递_User_对象转发并重定向到_origin_：

```java
protected void doPost(HttpServletRequest request, HttpServletResponse response) {
    String key = request.getParameter("name");
    String pass = request.getParameter("password");

    User user = User.DB.get(key);
    if (!user.getPassword().equals(pass)) {
        request.setAttribute("error", "invalid login");
        forward(request, response, "/login.jsp");
        return;
    }

    HttpSession session = request.getSession();
    session.setAttribute("user", user);

    response.sendRedirect(request.getParameter("origin"));
}
```

**如果凭据无效，我们将在我们的_error_变量中设置一条消息。**否则，我们使用_User_对象更新会话。

## 6. 检查登录信息
最后，让我们创建我们的主页。它只显示会话信息，并有一个注销链接：

```jsp
`<body>`
    current session info: ${user.name}

    `<a href="logout">`logout`</a>`
`</body>`
```

我们所有的主页servlet所做的就是将_User_转发到主页：

```java
@WebServlet("/home")
public class UserCheckServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        User user = (User) session.getAttribute("user");
        request.setAttribute("user", user);

        forward(request, response, "/home.jsp");
    }
}
```

它看起来是这样的：
![img](https://www.baeldung.com/wp-content/uploads/2022/02/login-success.png)

## 7. 注销
**要注销，我们只需使当前会话无效并重定向首页**。之后，我们的_UserCheckFilter_将检测到无会话请求，并将我们重定向回登录页面，重新开始流程：

```java
@WebServlet("/logout")
public class UserCheckLogoutServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();

        response.sendRedirect("./");
    }
}
```

## 8. 结论
在本文中，我们经历了创建完整的登录周期的过程。我们看到了我们现在如何完全控制对我们servlet的访问，使用单个过滤器。简而言之，通过这种方法，我们可以始终确保在需要的地方有一个有效的会话。同样，我们可以扩展该机制以实现更细粒度的访问控制。

如往常一样，源代码可在GitHub上获得。