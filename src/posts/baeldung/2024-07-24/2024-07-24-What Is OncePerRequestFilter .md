---
date: 2022-04-01
category:
  - Spring Framework
tag:
  - Spring
  - Java
  - OncePerRequestFilter
head:
  - - meta
    - name: keywords
      content: Spring, Java, OncePerRequestFilter
------
# OncePerRequestFilter 是什么？

## 1. 概述

在本教程中，我们将学习 Spring 中的一种特殊类型的过滤器 _OncePerRequestFilter_。我们将看到它解决了什么问题，并通过一个快速示例了解如何使用它。

首先让我们理解过滤器是如何工作的。一个 _Filter_ 可以在 servlet 执行之前或之后被调用。当一个请求被派发到一个 servlet 时，_RequestDispatcher_ 可能会将其转发到另一个 servlet。在这种情况下，另一个 servlet 也可能有相同的过滤器。在这种情况下，**同一个过滤器可能会被多次调用。**

但是，我们可能希望确保一个特定的过滤器每个请求只被调用一次。一个常见的用例是在使用 Spring Security 时。当一个请求通过过滤器链时，我们可能希望一些认证操作只对请求发生一次。

在这种情况下，我们可以扩展 _OncePerRequestFilter_。**Spring 保证 _OncePerRequestFilter_ 对于给定的请求只执行一次。**

## 3. 对同步请求使用 _OncePerRequestFilter_

让我们通过一个示例来理解如何使用这个过滤器。我们将定义一个扩展 _OncePerRequestFilter_ 的类 _AuthenticationFilter_，并重写 _doFilterInternal()_ 方法：

```java
public class AuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
        String usrName = request.getHeader(“userName”);
        logger.info(“成功认证用户 ” + usrName);
        filterChain.doFilter(request, response);
    }
}
```

由于 _OncePerRequestFilter_ 仅支持 HTTP 请求，**因此无需像实现 _Filter_ 接口时那样对 _request_ 和 _response_ 对象进行强制转换。**

## 4. 对异步请求使用 _OncePerRequestFilter_

对于异步请求，默认情况下 _OncePerRequestFilter_ 不会被应用。我们需要重写 _shouldNotFilterAsyncDispatch()_ 和 _shouldNotFilterErrorDispatch()_ 方法来支持这一点。

有时，我们需要过滤器仅在初始请求线程中应用，而不是在异步调度中创建的额外线程中应用。其他时候，我们可能需要在每个额外线程中至少调用一次过滤器。在这种情况下，我们需要重写 _shouldNotFilterAsyncDispatch()_ 方法。

如果 _shouldNotFilterAsyncDispatch()_ 方法返回 _true_，则过滤器将不会被调用用于后续的异步调度。然而，如果它返回 _false_，则过滤器将为每个异步调度调用一次，每个线程精确调用一次。

同样，**我们会重写 _shouldNotFilterErrorDispatch()_ 方法并返回 _true_ 或 _false_，取决于我们是否希望过滤错误调度：**

```java
@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
        String usrName = request.getHeader("userName");
        logger.info("成功认证用户 " + usrName);
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilterAsyncDispatch() {
        return false;
    }

    @Override
    protected boolean shouldNotFilterErrorDispatch() {
        return false;
    }
}
```

## 5. 有条件地跳过请求

我们可以通过重写 _shouldNotFilter()_ 方法，仅对某些特定请求应用过滤器，并跳过其他请求：

```java
@Override
protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    return Boolean.TRUE.equals(request.getAttribute(SHOULD_NOT_FILTER));
}
```

## 6. 快速示例

让我们通过一个快速示例来理解 _OncePerRequestFilter_ 的行为。

首先，我们将定义一个使用 Spring 的 _DeferredResult_ 异步处理请求的 _Controller_：

```java
@Controller
public class HelloController  {
    @GetMapping(path = "/greeting")
    public DeferredResult```<String>``` hello(HttpServletResponse response) throws Exception {
        DeferredResult```<String>``` deferredResult = new DeferredResult<>();
        executorService.submit(() -> perform(deferredResult));
        return deferredResult;
    }
    private void perform(DeferredResult```<String>``` dr) {
        // 一些处理
        dr.setResult("OK");
    }
}
```

在异步处理请求时，两个线程都会通过相同的过滤器链。因此，过滤器会被调用两次：第一次是在容器线程处理请求时，第二次是在异步调度器完成后。一旦异步处理完成，响应将返回给客户端。

现在，让我们定义一个实现 _OncePerRequestFilter_ 的 _Filter_：

```java
@Component
public class MyOncePerRequestFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
        logger.info("Inside Once Per Request Filter originated by request {}", request.getRequestURI());
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilterAsyncDispatch() {
        return true;
    }
}
```

在上面的代码中，我们故意从 _shouldNotFilterAsyncDispatch()_ 方法返回 _true_。这是为了演示我们的过滤器仅对容器线程调用一次，而不是对后续的异步线程调用。

让我们调用我们的端点来演示这一点：

```bash
curl -X GET http://localhost:8082/greeting
```

**输出：**

```
10:23:24.175 [http-nio-8082-exec-1] INFO  o.a.c.c.C.[Tomcat].[localhost].[/] - Initializing Spring DispatcherServlet 'dispatcherServlet'
10:23:24.175 [http-nio-8082-exec-1] INFO  o.s.web.servlet.DispatcherServlet - Initializing Servlet 'dispatcherServlet'
10:23:24.176 [http-nio-8082-exec-1] INFO  o.s.web.servlet.DispatcherServlet - Completed initialization in 1 ms
10:23:26.814 [http-nio-8082-exec-1] INFO  c.b.O.MyOncePerRequestFilter - Inside Once Per Request Filter originated by request /greeting
```

现在，让我们看看我们希望请求和异步调度都调用我们的过滤器的情况。我们只需要重写 _shouldNotFilterAsyncDispatch()_ 并返回 _false_ 即可实现这一点：

```java
@Override
protected boolean shouldNotFilterAsyncDispatch() {
    return false;
}
```

**输出：**

```
2:53.616 [http-nio-8082-exec-1] INFO  o.a.c.c.C.[Tomcat].[localhost].[/] - Initializing Spring DispatcherServlet 'dispatcherServlet'
10:32:53.616 [http-nio-8082-exec-1] INFO  o.s.web.servlet.DispatcherServlet - Initializing Servlet 'dispatcherServlet'
10:32:53.617 [http-nio-8082-exec-1] INFO  o.s.web.servlet.DispatcherServlet - Completed initialization in 1 ms
10:32:53.633 [http-nio-8082-exec-1] INFO  c.b.O.MyOncePerRequestFilter - Inside OncePer Request Filter originated by request /greeting
10:32:53.663 [http-nio-8082-exec-2] INFO  c.b.O.MyOncePerRequestFilter - Inside OncePer Request Filter originated by request /greeting
```

我们从上面的输出可以看到，我们的过滤器被调用了两次——第一次由容器线程调用，第二次由另一个线程调用。

## 7. 结论

在本文中，我们查看了 _OncePerRequestFilter_，它解决了什么问题，以及如何通过一些实际示例来实现它。