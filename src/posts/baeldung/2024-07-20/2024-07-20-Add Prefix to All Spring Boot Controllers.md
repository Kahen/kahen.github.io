---
date: 2022-04-01
category:
  - Spring Boot
  - Web Development
tag:
  - Spring Boot
  - Servlet
  - Annotations
head:
  - - meta
    - name: keywords
      content: Spring Boot, Servlet, Annotations, URL Mapping
------
# 为所有Spring Boot控制器添加前缀 | Baeldung

## 1. 引言

在Spring Boot应用程序中，每个控制器都可以有自己的URL映射。这使得一个应用程序可以在多个位置提供Web端点。例如，我们可以将API端点分组为内部和外部等逻辑分组。

然而，有时我们可能希望将所有端点都放在一个共同的前缀下。在本教程中，我们将探讨为所有Spring Boot控制器使用共同前缀的不同方法。

## 2. Servlet上下文

在Spring应用程序中处理Web请求的主要组件是_DispatcherServlet_。通过自定义此组件，我们可以在很大程度上控制请求的路由方式。

让我们看看两种不同的自定义_DispatcherServlet_的方法，这将使我们的所有应用程序端点都可以在共同的URL前缀下使用。

### 2.1. Spring Bean

第一种方法是通过引入一个新的Spring bean：

```java
@Configuration
public class DispatcherServletCustomConfiguration {

    @Bean
    public DispatcherServlet dispatcherServlet() {
        return new DispatcherServlet();
    }

    @Bean
    public ServletRegistrationBean dispatcherServletRegistration() {
        ServletRegistrationBean registration = new ServletRegistrationBean(dispatcherServlet(), "/api/");
        registration.setName(DispatcherServletAutoConfiguration.DEFAULT_DISPATCHER_SERVLET_REGISTRATION_BEAN_NAME);
        return registration;
    }
}
```
在这里，我们创建了一个_ServletRegistrationBean_，它包装了_DispatcherServlet_ bean。注意我们提供了一个明确的基URL _/api/_。**这意味着所有端点都必须在该基URL前缀下访问**。

### 2.2. 应用程序属性

我们还可以通过使用应用程序属性来实现相同的结果。在Spring Boot 2.0.0之后的版本中，我们将以下内容添加到我们的_application.properties_文件中：

```
server.servlet.contextPath=/api
```

在此版本之前，属性名称略有不同：

```
server.contextPath=/api
```

这种方法的一个好处是它只使用标准的Spring属性。**这意味着我们可以很容易地使用像配置文件或外部属性绑定这样的标准机制来更改或覆盖我们的共同前缀**。

### 2.3. 优点和缺点

这两种方法的主要优点也是主要缺点：它们影响应用程序中的每个端点。

对于一些应用程序来说，这可能完全没问题。然而，有些应用程序可能需要使用标准端点映射来与第三方服务交互——例如，OAuth交换。在这些情况下，像这样的全局解决方案可能不是一个好的选择。

## 3. 注解

我们可以通过使用注解来为Spring应用程序中的所有控制器添加前缀。下面，我们将看两种不同的方法。

### 3.1. SpEL

第一种方法涉及使用Spring表达式语言（SpEL）与标准的_@RequestMapping注解_。通过这种方法，我们只需向我们想要添加前缀的每个控制器添加一个属性：

```java
@Controller
@RequestMapping(path = "${apiPrefix}/users")
public class UserController {

}
```

然后，我们只需在_application.properties_中指定属性值：

```
apiPrefix=/api
```

### 3.2. 自定义注解

另一种实现方法是通过创建我们自己的注解：

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
@RequestMapping("/api/")
public @interface ApiPrefixController {
    @AliasFor(annotation = Component.class)
    String value() default "";
}
```

然后，我们只需要将注解应用到我们想要添加前缀的每个控制器：

```java
@Controller
@ApiPrefixController
public class SomeController {
    @RequestMapping("/users")
    @ResponseBody
    public String getAll(){
        // ...
    }
}
```

### 3.3. 优点和缺点

这两种方法解决了前一种方法的主要问题：**它们都提供了对哪些控制器获得前缀的细粒度控制**。我们可以只将注解应用于特定的控制器，而不是影响应用程序中的所有端点。

## 4. 服务器端转发

我们将要探讨的最后一种方法是使用服务器端转发。**与重定向不同，转发不涉及向客户端返回响应**。这意味着我们的应用程序可以在不影响客户端的情况下在端点之间传递请求。

让我们从编写一个带有两个端点的简单控制器开始：

```java
@Controller
class EndpointController {
    @GetMapping("/endpoint1")
    @ResponseBody
    public String endpoint1() {
        return "Hello from endpoint 1";
    }

    @GetMapping("/endpoint2")
    @ResponseBody
    public String endpoint2() {
        return "Hello from endpoint 2";
    }
}
```

接下来，我们创建一个新的控制器，它基于我们想要的前缀：

```java
@Controller
@RequestMapping("/api/endpoint")
public class ApiPrefixController {

    @GetMapping
    public ModelAndView route(ModelMap model) {
        if(new Random().nextBoolean()) {
            return new ModelAndView("forward:/endpoint1", model);
        }
        else {
            return new ModelAndView("forward:/endpoint2", model);
        }
    }
}
```

**这个控制器有一个单一的端点，充当路由器。**在这种情况下，它本质上是抛硬币来转发原始请求到我们的其他两个端点之一。

我们可以通过发送几个连续的请求来验证它是否有效：

```
> curl http://localhost:8080/api/endpoint
Hello from endpoint 2
> curl http://localhost:8080/api/endpoint
Hello from endpoint 1
> curl http://localhost:8080/api/endpoint
Hello from endpoint 1
> curl http://localhost:8080/api/endpoint
Hello from endpoint 2
> curl http://localhost:8080/api/endpoint
Hello from endpoint 2
```

这种方法的主要好处是它非常强大。我们可以应用任何我们想要的逻辑来决定如何转发请求：URL路径、HTTP方法、HTTP头等。

## 5. 结论

在本文中，我们学习了在Spring应用程序中为每个控制器应用共同前缀的几种方法。与大多数决策一样，每种方法都有其优缺点，应该在实施前仔细考虑。

如常，本教程的代码示例可以在GitHub上找到。