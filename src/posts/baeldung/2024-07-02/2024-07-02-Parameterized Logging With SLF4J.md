---
date: 2024-07-02
category:
  - Software Development
  - Logging
tag:
  - SLF4J
  - Parameterized Logging
  - Logback
head:
  - - meta
    - name: keywords
      content: SLF4J, Parameterized Logging, Logback, Software Development
---
# 使用SLF4J进行参数化日志记录

日志记录是软件开发的重要组成部分，为我们提供了对应用程序行为的宝贵见解。本教程将回顾一个称为参数化日志记录的重要日志特性。通过利用参数化日志记录，我们可以增强我们日志的全面性和效率。

Java简单日志门面（SLF4J）是一个广为人知的日志库，提供了统一的抽象日志记录。它允许开发人员使用单一API并插入任何兼容的日志框架，如Logback、log4j或SLF4J简单日志记录器。SLF4J API实际上并不记录日志，我们可以在部署时插入我们想要的任何日志框架。

在深入了解日志记录本身之前，让我们配置所需的依赖项。通常，我们需要包括两个依赖项：提供统一门面的_slf4j-api_，以及执行日志记录的日志实现。在我们的示例中，我们将使用Logback作为日志实现，并且这里我们可以采取不同的方法。我们只需要包括一个已经使用_slf4j-api_的_single logback-classic_依赖项。

让我们将_logback-classic_依赖项添加到我们的Maven _pom.xml_：

```
`<dependency>`
    `<groupId>`ch.qos.logback`</groupId>`
    `<artifactId>`logback-classic`</artifactId>`
    `<version>`1.4.8`</version>`
`</dependency>`
```

我们可以在Maven中央仓库中找到单独的_slf4j-api_和_logback-classic_的最新版本。

日志记录器初始化
----------------

第一步是初始化我们的日志记录器。根据项目设置，**这可以手动完成或通过_Lombok_完成**。让我们检查两种变体。

手动初始化应始终使用来自_org.slf4j_包的_Logger_和_LoggerFactory_：

```java
public static final Logger log = LoggerFactory.getLogger(LoggingPlayground.class);
```

通过在类级别使用_@Slf4j_注解，_Lombok_将生成与上述手动初始化相同的代码行。

为了保持一致性，并为可能迁移到_Lombok_做好准备，我们可以使用_log_名称为所有手动初始化的日志记录器。

**从术语的角度来看，参数化日志记录指的是将提供的参数注入到日志消息中的过程。**在过去，旧版本的库并不总是提供一种统一的方式来处理具有多个值的参数化日志记录。这就是为什么我们可以看到纯字符串连接、_String.format()_和其他技巧的使用。这些技术不再必要，我们可以使用花括号_{_和_}_在消息中使用尽可能多的参数。

我们可以只记录一个参数：

```java
log.info("App is running at {}", LocalDateTime.now());
```

我们也可以记录多个参数，占位符将按顺序填充。只要**记住确保我们传递的参数数量与我们传递的花括号数量相匹配**。幸运的是，大多数IDE会突出显示这种不匹配。

以下是如何记录多个参数的示例：

```java
log.info("App is running at {}, zone = {}, java version = {}, java vm = {}",
  LocalDateTime.now(), ZonedDateTime.now().getZone(), System.getProperty("java.version"),
  System.getProperty("java.vm.name"));
```

上面的代码输出将是：

```
15:41:48.749 [main] INFO  c.b.p.logging.LoggingPlayground - App is running at 2023-07-20T15:41:48.749435, zone = Europe/Helsinki, java version = 11.0.15, java vm = Java HotSpot(TM) 64-Bit Server VM
```

当库不支持多个参数时，一种常见的方法是使用_Object[]_记录数据，但不应与新版本一起使用：

```java
log.info("App is running at {}, zone = {}, java version = {}, java vm = {}",
  new Object[] { ZonedDateTime.now(), ZonedDateTime.now().getZone(), System.getProperty("java.version"),
    System.getProperty("java.vm.name") });
```

输出将与使用四个单独对象的输出相同。

流畅的日志记录
--------

从SLF4J 2.0开始，流畅的日志记录提供了另一种与现有框架向后兼容的方法。**流畅提供了一个构建器API，逐步构建日志事件。**因此，我们也可以使用此功能实现参数化日志记录。每个日志级别都有专用的构建器。每个构建器的创建应该用_log()_调用来实际打印消息。

例如，**我们可以使用_addArgument()_方法，并将参数值添加到消息中的每个占位符**：

```java
log.atInfo().setMessage("App is running at {}, zone = {}")
  .addArgument(LocalDateTime.now())
  .addArgument(ZonedDateTime.now().getZone())
  .log();
```

我们的输出与非流畅方法相同：

```
15:50:20.724 [main] INFO  c.b.p.l.FluentLoggingPlayground - App is running at 2023-07-20T15:50:20.724532900, zone = Europe/Helsinki
```

或者，我们可以使用_addKeyValue()_并指定参数名称及其值：

```java
log.atInfo().setMessage("App is running at")
  .addKeyValue("time", LocalDateTime.now())
  .addKeyValue("zone", ZonedDateTime.now().getZone())
  .setCause(exceptionCause)
  .log();
```

**为了使用_addKeyValue()_方法，我们的日志配置应该能够接受它**。在_Logback_的情况下，我们应该更新日志格式以包含一个_%kvp_占位符。如果没有指定，那么所有添加的数据都将被忽略：

```
`<appender name="out" class="ch.qos.logback.core.ConsoleAppender">`
    `<encoder>`
        `<pattern>`%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg %kvp%n`</pattern>`
    `</encoder>`
`</appender>`
```

使用键值方法，我们的参数值的输出略有不同：

```
15:52:35.835 [main] INFO  c.b.p.l.FluentLoggingPlayground - App is running at time="2023-07-20T15:52:35.834338500" zone="Europe/Helsinki"
```

参数化日志记录与异常日志记录
-----------------------

经常出现的一个问题是如何在考虑声明的方法能够传递参数或异常的情况下记录多个参数。从SLF4J 1.6开始，这个问题已经解决了，我们可以将参数化日志记录与异常日志记录结合起来。

**默认情况下，SLF4J将使用最后一个参数作为_Throwable_的候选。**如果提供的参数是一个异常，SLF4J将在日志输出中打印完整的堆栈跟踪。

例如，对于给定的日志行：

```java
log.info("App is running at {}, zone = {}, java version = {}, java vm = {}",
  LocalDateTime.now(), ZonedDateTime.now().getZone(), System.getProperty("java.version"),
  System.getProperty("java.vm.name"), exceptionCause);
```

输出将是：

```
15:54:43.771 [main] INFO  c.b.p.logging.LoggingPlayground - App is running at 2023-07-20T15:54:43.771587300, zone = Europe/Helsinki, java version = 11.0.15, java vm = Java HotSpot(TM) 64-Bit Server VM
java.lang.Exception: java.lang.IllegalArgumentException: Something unprocessable
    at com.baeldung.parameterized.logging.LoggingPlayground.main(LoggingPlayground.java:30)
Caused by: java.lang.IllegalArgumentException: Something unprocessable
    ... 1 common frames omitted
```

如果我们在其他参数中间传递_Throwable_，它将被视为一个普通对象，堆栈跟踪将不会被打印。

_Throwable_也可以通过流畅的方法使用_setCause()_方法指定：

```java
log.atInfo()
  .setMessage("App is running at {}, zone = {}")
  .addArgument(LocalDateTime.now())
  .addArgument(ZonedDateTime.now().getZone())
  .setCause(exceptionCause)
  .log();
```

### 结论

在本文中，我们回顾了如何使用参数化日志记录来记录多个参数，并探索了流畅日志记录方法以获得更大的灵活性。此外，我们还探索了如何将参数化日志记录与异常结合起来。

完整的示例可以在GitHub上找到。