---
date: 2022-02-01
category:
  - Spring Cloud
  - Zuul
tag:
  - Zuul
  - 异常处理
  - 微服务
head:
  - - meta
    - name: keywords
      content: Zuul, 异常自定义, 微服务架构, Spring Cloud
---
# Zuul异常自定义

Zuul是由Netflix开发的基于JVM的路由器和服务器端负载均衡器。Zuul的规则引擎提供了灵活性，允许编写规则和过滤器来增强Spring Cloud微服务架构中的路由。

在本文中，我们将探讨如何通过编写在代码执行期间发生错误时运行的自定义错误过滤器来自定义Zuul中的异常和错误响应。

在Zuul中处理的所有异常都是_ZuulExceptions_。现在，让我们明确一点，**_ZuulException_不能通过_@ControllerAdvice_捕获，也不能通过_@ExceptionHandling_注解方法**。这是因为**_ZuulException_是从错误过滤器中抛出的**。因此，它跳过了后续的过滤器链，并且从未到达错误控制器。下图显示了Zuul中错误处理的层次结构：

![img](https://www.baeldung.com/wp-content/uploads/2022/02/zuul.png)

当出现_ZuulException_时，Zuul会显示以下错误响应：

```
{
    "timestamp": "2022-01-23T22:43:43.126+00:00",
    "status": 500,
    "error": "Internal Server Error"
}
```

在某些场景中，我们可能需要自定义_ZuulException_响应中的错误消息或状态码。Zuul过滤器来拯救。在下一节中，我们将讨论如何扩展Zuul的错误过滤器并自定义_ZuulException_。

### 3. Zuul异常自定义

spring-cloud-starter-netflix-zuul的启动包包括三种类型的过滤器：pre、post和error过滤器。这里，**我们将深入研究错误过滤器，并探索自定义名为_SendErrorFilter_的Zuul错误过滤器**。

首先，我们将禁用自动配置的默认_SendErrorFilter_。这使我们不必担心执行顺序，因为这是唯一的Zuul默认错误过滤器。让我们在_application.yml_中添加属性以禁用它：

```
zuul:
  SendErrorFilter:
    post:
      disable: true
```

现在，让我们编写一个名为_CustomZuulErrorFilter_的自定义Zuul错误过滤器，如果底层服务不可用，则抛出自定义异常：

```
public class CustomZuulErrorFilter extends ZuulFilter {
}
```

这个自定义过滤器需要扩展_com.netflix.zuul.ZuulFilter_并覆盖其中的一些方法。

首先，我们必须**覆盖_filterType()_方法并返回类型为_“error”_**。这是因为我们想要为错误过滤器类型配置Zuul过滤器：

```
@Override
public String filterType() {
    return "error";
}
```

之后，我们**覆盖_filterOrder()_并返回_-1_，以便该过滤器是链中的第一个**：

```
@Override
public int filterOrder() {
    return -1;
}
```

然后，我们**覆盖_shouldFilter()_方法并无条件返回_true_**，因为我们希望在所有情况下都链入这个过滤器：

```
@Override
public boolean shouldFilter() {
    return true;
}
```

最后，让我们**覆盖_run()_方法**：

```
@Override
public Object run() {
    RequestContext context = RequestContext.getCurrentContext();
    Throwable throwable = context.getThrowable();

    if (throwable instanceof ZuulException) {
        ZuulException zuulException = (ZuulException) throwable;
        if (throwable.getCause().getCause().getCause() instanceof ConnectException) {
            context.remove("throwable");
            context.setResponseBody(RESPONSE_BODY);
            context.getResponse()
                .setContentType("application/json");
            context.setResponseStatusCode(503);
        }
    }
    return null;
}
```

让我们分解_run()_方法以理解它在做什么。首先，我们获取_RequestContext_的实例。接下来，我们验证从_RequestContext_获得的_throwable_是否是_ZuulException_的实例。然后，我们检查_throwable_中嵌套异常的原因是否是_ConnectException_的实例。最后，我们使用自定义属性设置上下文响应。

请注意，在设置自定义响应之前，我们**从上下文中清除_throwable_，以防止后续过滤器中的进一步错误处理**。

此外，我们也可以在我们的_run()_方法中设置自定义异常，以便后续过滤器处理：

```
if (throwable.getCause().getCause().getCause() instanceof ConnectException) {
    ZuulException customException = new ZuulException("", 503, "Service Unavailable");
    context.setThrowable(customException);
}
```

上述代码片段将记录堆栈跟踪并继续执行下一个过滤器。

此外，我们还可以修改这个示例来处理_ZuulFilter_中的多个异常。

### 4. 测试自定义Zuul异常

在这一部分中，我们将在我们的_CustomZuulErrorFilter_中测试自定义Zuul异常。

假设有_ConnectException_，上述示例在Zuul API响应中的输出将是：

```
{
    "timestamp": "2022-01-23T23:10:25.584791Z",
    "status": 503,
    "error": "Service Unavailable"
}
```

此外，**我们总是可以通过在_application.yml_文件中配置_error.path_属性来更改Zuul的默认错误转发路径_/error_**。

现在，让我们通过一些测试用例来验证它：

```
@Test
public void whenSendRequestWithCustomErrorFilter_thenCustomError() {
    Response response = RestAssured.get("http://localhost:8080/foos/1");
    assertEquals(503, response.getStatusCode());
}
```

在上面的测试场景中，_/foos/1_的路由被故意关闭，导致java.lang. _ConnectException_。结果，我们的自定义过滤器将拦截并以503状态响应。

现在，让我们测试一下没有注册自定义错误过滤器的情况：

```
@Test
public void whenSendRequestWithoutCustomErrorFilter_thenError() {
    Response response = RestAssured.get("http://localhost:8080/foos/1");
    assertEquals(500, response.getStatusCode());
}
```

执行上述测试用例时没有注册自定义错误过滤器，结果Zuul以状态500响应。

### 5. 结论

在本教程中，我们了解了错误处理的层次结构，并深入了解了如何在Spring Zuul应用程序中配置自定义Zuul错误过滤器。这个错误过滤器提供了自定义响应体以及响应码的机会。像往常一样，示例代码可在GitHub上找到。