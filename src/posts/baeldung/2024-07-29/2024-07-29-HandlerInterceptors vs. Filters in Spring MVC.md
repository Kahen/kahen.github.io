---
date: 2021-05-01
category:
  - Spring MVC
  - Java
tag:
  - Filter
  - HandlerInterceptor
head:
  - - meta
    - name: keywords
      content: Spring MVC, Filter, HandlerInterceptor, Java Servlet
---

# Spring MVC中的HandlerInterceptor与Filter对比

在本文中，我们将比较Java Servlet的_Filter_和Spring MVC的_HandlerInterceptor_，并讨论何时一个比另一个更可取。

**Filters是web服务器的一部分，而不是Spring框架的一部分。** 对于传入的请求，我们可以使用filters来操作甚至阻止请求到达任何servlet。反之，我们也可以阻止响应到达客户端。

Spring Security是使用filters进行认证和授权的一个绝佳例子。要配置Spring Security，我们只需要添加一个filter，即_DelegatingFilterProxy_。然后Spring Security就可以拦截所有传入和传出的流量。这就是为什么Spring Security可以用于Spring MVC之外。

### 2.1. 创建_Filter_

要创建一个filter，首先我们创建一个实现_javax.servlet.Filter接口_的类：

```java
@Component
public class LogFilter implements Filter {

    private Logger logger = LoggerFactory.getLogger(LogFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        logger.info("Hello from: " + request.getLocalAddr());
        chain.doFilter(request, response);
    }

}
```

接下来，我们覆盖_doFilter_方法，在这里我们可以访问或操作_ServletRequest_, _ServletResponse_, 或_FilterChain_对象。我们可以使用_FilterChain_对象来允许或阻止请求。

最后，我们通过使用_@Component_注解将_Filter_添加到Spring上下文中。Spring会做其余的工作。

## 3. _HandlerInterceptor_

**_HandlerInterceptor_是Spring MVC框架的一部分，位于_DispatcherServlet_和我们的_Controller_之间。** 我们可以在请求到达我们的controllers之前拦截请求，并在视图渲染之前和之后进行拦截。

### 3.1. 创建_HandlerInterceptor_

要创建一个_HandlerInterceptor_，我们创建一个实现_org.springframework.web.servlet.HandlerInterceptor_接口的类。这使我们可以选择覆盖三个方法：

- _preHandle()_ – 在调用目标处理器之前执行
- _postHandle()_ – 在目标处理器之后但在_DispatcherServlet_渲染视图之前执行
- _afterCompletion()_ – 请求处理和视图渲染完成后的回调

让我们在我们的测试拦截器中向这三个方法添加日志记录：

```java
public class LogInterceptor implements HandlerInterceptor {

    private Logger logger = LoggerFactory.getLogger(LogInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
        throws Exception {
        logger.info("preHandle");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
        throws Exception {
        logger.info("postHandle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
        throws Exception {
        logger.info("afterCompletion");
    }

}
```

## 4. 关键差异和用例

让我们看一张图表，显示_Filter_和_HandlerInterceptor_在请求/响应流程中的位置：

![img](https://www.baeldung.com/wp-content/uploads/2021/05/filters_vs_interceptors.jpg)

**Filters在请求到达_DispatcherServlet_之前进行拦截，使它们非常适合粗粒度任务**，例如：

- 认证
- 日志记录和审计
- 图像和数据压缩
- 我们想要与Spring MVC解耦的任何功能

**HandlerInterceptors另一方面，在_DispatcherServlet_和我们的_Controller_之间拦截请求。** 这是在Spring MVC框架内完成的，提供了对_Handler_和_ModelAndView_对象的访问。这减少了重复，并允许更细粒度的功能，例如：

- 处理应用程序日志记录等横切关注点
- 详细的授权检查
- 操作Spring上下文或模型

## 5. 结论

在本文中，我们涵盖了_Filter_和_HandlerInterceptor_之间的差异。

**关键要点是，使用_Filter_，我们可以在请求到达我们的controllers之前操作请求，并且可以在Spring MVC之外操作。** 否则，_HandlerInterceptor_是应用程序特定横切关注点的好地方。通过提供对目标_Handler_和_ModelAndView_对象的访问，我们有了更细粒度的控制。

所有这些示例和代码片段的实现可以在GitHub上找到。