---
date: 2022-04-01
category:
  - Spring Cloud Sleuth
  - Spring Boot
tag:
  - Trace ID
  - Spring Cloud
  - Logging
head:
  - - meta
    - name: keywords
      content: Spring Cloud Sleuth, Trace ID, Spring Boot, Logging
---
# 在Spring Cloud Sleuth中获取当前跟踪ID

在本文中，我们将探讨Spring Cloud Sleuth，并看看如何在Spring Boot中使用它进行跟踪。它为我们的日志添加了有用的额外信息，并通过为它们添加唯一标识符来使调试操作变得更容易。在Sleuth术语中，这些操作被称为跟踪。它们可以由几个步骤组成，称为跨度。

例如，一个跟踪可以是一个查询我们应用程序数据的GET请求。当我们的应用程序处理请求时，它可以被分解为更小的步骤：用户授权、执行数据库查询、转换响应。这些步骤中的每一个都是属于同一跟踪的唯一跨度。

在某些情况下，我们可能想要获取当前跟踪或跨度的ID。例如，我们可以在发生事件时将这些发送给开发团队。然后他们可以使用这个来调试和解决问题。

## 2. 应用程序设置

首先，我们通过创建一个Spring Boot项目并添加spring-cloud-starter-sleuth依赖项来开始：

```
`<dependency>`
    `<groupId>`org.springframework.cloud`</groupId>`
    `<artifactId>`spring-cloud-starter-sleuth`</artifactId>`
    `<version>`3.1.0`</version>`
`</dependency>`
```

这个启动依赖项与Spring Boot集成得很好，并提供了开始使用Spring Cloud Sleuth所需的必要配置。

但是，我们可以采取一个额外的步骤。让我们在application.properties文件中设置我们应用程序的名称，这样我们就可以在日志中看到它以及跟踪和跨度ID：

```
spring.application.name=Baeldung Sleuth Tutorial
```

现在我们需要一个应用程序的入口点。让我们创建一个REST控制器，带有一个GET端点：

```java
@RestController
public class SleuthTraceIdController {

    @GetMapping("/traceid")
    public String getSleuthTraceId() {
        return "Hello from Sleuth";
    }
}
```

让我们访问我们的API端点http://localhost:8080/traceid。我们应该在响应中看到“Hello from Sleuth”。

## 3. 日志记录

让我们在_getSleuthTraceId_方法中添加一个日志语句。首先，我们需要一个类的_Logger_。然后我们可以记录消息：

```java
private static final Logger logger = LoggerFactory.getLogger(SleuthTraceIdController.class);

@GetMapping("/traceid")
public String getSleuthTraceId() {
    logger.info("Hello with Sleuth");
    return "Hello from Sleuth";
}
```

让我们再次调用我们的API端点，并检查日志。我们应该找到类似于这样的内容：

```
INFO [Baeldung Sleuth Tutorial,e48f140a63bb9fbb,e48f140a63bb9fbb] 9208 --- [nio-8080-exec-1] c.b.s.traceid.SleuthTraceIdController : Hello with Sleuth
```

注意，应用程序名称在括号内开始。这些括号是由Sleuth添加的。它们表示应用程序名称、跟踪ID和跨度ID。

## 4. 当前跟踪和跨度

我们可以使用上述示例来调试应用程序中的问题，但可能很难确定是什么引起的以及要跟踪哪个跟踪。这就是为什么我们要以编程方式获取当前跟踪，然后我们可以使用它进行任何进一步的调查。

在我们的实现中，我们将简化这个用例，我们只会将跟踪ID记录到控制台。

首先，我们需要获取一个_Tracer_对象的实例。让我们将其注入到我们的控制器中并获取当前跨度：

```java
@Autowired
private Tracer tracer;

@GetMapping("/traceid")
public String getSleuthTraceId() {
    logger.info("Hello with Sleuth");
    Span span = tracer.currentSpan();
    return "Hello from Sleuth";
}
```

注意，如果目前没有活动的跨度，_currentSpan_方法可能会返回null。因此，我们必须执行额外的检查，以查看我们是否可以继续使用这个_Span_对象而不会遇到_NullPointerException_。让我们实现这个检查并将当前跟踪和跨度ID记录到日志中：

```java
Span span = tracer.currentSpan();
if (span != null) {
    logger.info("Trace ID {}", span.context().traceIdString());
    logger.info("Span ID {}", span.context().spanIdString());
}
```

让我们运行应用程序，并在访问我们的API端点时查找这些消息。它们应该包含与Sleuth添加的括号中相同的ID。

## 5. 作为十进制数字的跟踪和跨度ID

还有另一种方式使用_spanId_方法而不是_spanIdString_来获取跨度ID。

它们之间的差别在于后者返回值的十六进制表示，而前者返回十进制数字。让我们在实际操作中比较它们并将十进制值也记录下来：

```java
Span span = tracer.currentSpan();
if (span != null) {
    logger.info("Span ID hex {}", span.context().spanIdString());
    logger.info("Span ID decimal {}", span.context().spanId());
}
```

这两个值表示相同的数字，输出应该看起来类似于这样：

```
INFO [Baeldung Sleuth Tutorial,0de46b6fcbc8da83,0de46b6fcbc8da83] 8648 --- [nio-8080-exec-3] c.b.s.traceid.SleuthTraceIdController    : Span ID hex 0de46b6fcbc8da83
INFO [Baeldung Sleuth Tutorial,0de46b6fcbc8da83,0de46b6fcbc8da83] 8648 --- [nio-8080-exec-3] c.b.s.traceid.SleuthTraceIdController    : Span ID decimal 1001043145087572611
```

同样，这也适用于跟踪ID。**而不是_traceIdString_，我们可以使用_traceId_方法。_traceIdString_返回十六进制值，而_traceId_返回十进制值：**

```java
logger.info("Trace ID hex {}", span.context().traceIdString());
logger.info("Trace ID decimal {}", span.context().traceId());
```

输出与之前的非常相似。它首先包含十六进制的跟踪ID，然后是十进制：

```
INFO [Baeldung Sleuth Tutorial,34ec0b8ac9d65e91,34ec0b8ac9d65e91] 7384 --- [nio-8080-exec-1] c.b.s.traceid.SleuthTraceIdController    : Trace ID hex 34ec0b8ac9d65e91
INFO [Baeldung Sleuth Tutorial,34ec0b8ac9d65e91,34ec0b8ac9d65e91] 7384 --- [nio-8080-exec-1] c.b.s.traceid.SleuthTraceIdController    : Trace ID decimal 3813435675195629201
```

## 6. 结论

在本文中，我们讨论了Spring Cloud Sleuth如何帮助调试和跟踪Spring Boot中的事件。首先，我们使用_Tracer_对象引用当前跨度和_TraceContext_。之后，我们能够获取当前跟踪和跨度的ID。此外，我们还看到了不同方法以不同的数字系统返回ID。 

如常，这些示例的源代码以在GitHub上找到。