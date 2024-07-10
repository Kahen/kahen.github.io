---
date: 2024-07-10
category:
  - Spring Boot
  - Logback
  - Log4j2
tag:
  - Spring Boot
  - Logback
  - Log4j2
  - 日志
head:
  - - meta
    - name: keywords
      content: Spring Boot, Logback, Log4j2, 日志配置, 扩展
---

# Spring Boot Logback 和 Log4j2 扩展

记录是任何软件应用程序的重要组成部分，它有助于故障排除和调试问题。此外，它还可用于监控目的。Spring Boot 支持流行的日志框架，如 Logback 和 Log4j2。**Spring Boot 为 Logback 和 Log4j2 提供了一些扩展，这些扩展可能对高级配置很有用。**

在本教程中，我们将探讨 Spring Boot 应用程序中的 Logback 和 Log4j2 扩展。

Spring Boot 默认使用 Logback 库进行记录。在这一部分中，我们将了解一些可以帮助进行高级配置的 Logback 扩展。

还值得一提的是，**Spring Boot 建议使用 _logback-spring.xml_ 而不是默认的 _logback.xml_**。**我们不能在标准的 _logback.xml_ 中使用扩展，因为 _logback.xml_ 配置文件加载得太早了**。

### 2.1. Maven 依赖项

要使用 Logback，我们需要在 _pom.xml_ 中添加 _logback-classic_ 依赖项。然而，_logback-classic_ 依赖项已经在 Spring Boot Starter 依赖项中可用。

因此，我们只需要在 _pom.xml_ 中添加 _spring-boot-starter-web_ 依赖项：

```xml
````<dependency>````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-web`````</artifactId>`````
````</dependency>````
```

### 2.2. 基本记录

首先，我们将在主 Spring Boot 类中添加一些日志，以用于我们的示例：

```java
@SpringBootApplication
public class SpringBootLogbackExtensionsApplication {
    
    private static final Logger logger = LoggerFactory.getLogger(SpringBootLogbackExtensionsApplication.class);
    
    public static void main(String[] args) {
        SpringApplication.run(SpringBootLogbackExtensionsApplication.class, args);
        
        logger.debug("调试日志消息");
        logger.info("信息日志消息");
        logger.error("错误日志消息");
        logger.warn("警告日志消息");
        logger.trace("跟踪日志消息");
    }
}
```

### 2.3. 特定于配置文件的设置

Spring 配置文件提供了一种机制，可以根据激活的配置文件调整应用程序配置。

例如，我们可以为各种环境定义分离的 Logback 配置，如 "development" 和 "production"。**如果我们想要一个单一的 Logback 配置，我们可以使用 _logback-spring.xml_ 中的 _springProfile_ 元素**。

**使用 _springProfile_ 元素，我们可以根据激活的 Spring 配置文件选择性地包含或排除配置部分。我们可以使用 _name_ 属性来允许哪个配置文件接受配置**。

默认情况下，Spring Boot 仅记录到控制台。现在，假设我们想要为 "production" 记录到文件，为 "development" 记录到控制台。我们可以通过使用 _springProfile_ 元素轻松实现。

让我们创建一个 _logback-spring.xml_ 文件：

```xml
`<springProfile name="development">`
    `<appender name="Console" class="ch.qos.logback.core.ConsoleAppender">`
        `<layout class="ch.qos.logback.classic.PatternLayout">`
            ``<Pattern>``%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n``</Pattern>``
        `</layout>`
    ```</appender>```
    ``<root level="info">``
        `<appender-ref ref="Console" />`
    ``</root>``
````</springProfile>````

``<springProfile name="production">``
    ``<appender name="RollingFile" class="ch.qos.logback.core.rolling.RollingFileAppender">``
        ``<file>``${LOGS}/spring-boot-logger.log``</file>``
        `<encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">`
            ``<Pattern>``%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n``</Pattern>``
        `</encoder>`
        `<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">`
            `<fileNamePattern>`${LOGS}/archived/spring-boot-logger-%d{yyyy-MM-dd}.log`</fileNamePattern>`
        `</rollingPolicy>`
    ```</appender>```
    ``<root level="info">``
        `<appender-ref ref="RollingFile" />`
    ``</root>``
````</springProfile>````
```

然后，我们可以使用 JVM 系统参数 _-Dspring.profiles.active=development_ 或 _-Dspring.profiles.active=production_ 设置激活的配置文件。

现在，如果我们使用 _development_ 配置文件运行 Spring Boot 应用程序，我们将在控制台中获得以下输出：

```
10:31:13.766 [main] INFO  c.b.e.SpringBootLogbackExtensionsApplication - 信息日志消息
10:31:13.766 [main] ERROR c.b.e.SpringBootLogbackExtensionsApplication - 错误日志消息
10:31:13.766 [main] WARN  c.b.e.SpringBootLogbackExtensionsApplication - 警告日志消息
```

此外，我们可能想要为 "staging" 或 "production" 记录到文件。为了支持这种情况，_springProfile’s_ _name_ 属性接受配置文件表达式。配置文件表达式允许更复杂的配置文件逻辑：

```xml
`<springProfile name="production | staging">`
    ``<!-- 配置 -->``
````</springProfile>````
```

上述配置在 "production" 或 "staging" 配置文件激活时启用。

### 2.4. 环境属性

**有时，我们需要在记录配置中访问 _application.properties_ 文件中的值。在这种情况下，我们使用 Logback 配置中的 _springProperty_ 元素**。

_springProperty_ 元素类似于 Logback 的标准 _property_ 元素。然而，我们可以确定属性的来源来自环境，而不是指定一个直接的值。

_springProperty_ 元素有一个 _source_ 属性，它取应用程序属性的值。如果环境中没有设置属性，则从 _defaultValue_ 属性中取默认值。我们还需要为 _name_ 属性设置一个值，以便在配置中的其他元素中引用该属性。

最后，我们可以设置 _scope_ 属性。_context_ 作用域中的属性是上下文的一部分，它在所有记录事件中都可用。

假设我们想使用应用程序名称作为日志文件的名称。首先，在 _application.properties_ 文件中定义应用程序名称：

```
spring.application.name=logback-extension
```

然后在 _logback-spring.xml_ 中暴露应用程序名称以供使用：

```xml
`<property name="LOGS" value="./logs" />`
`<springProperty scope="context" name="application.name" source="spring.application.name" />`
``<springProfile name="production">``
    ``<appender name="RollingFile" class="ch.qos.logback.core.rolling.RollingFileAppender">``
        ``<file>``${LOGS}/${application.name}.log``</file>``
        ``<!-- 配置 -->``
    ```</appender>```
````</springProfile>````
```

在上面的配置中，我们将 _springProperty_ 元素的 _source_ 属性设置为属性 _spring.application.name_。此外，我们使用 _${application.name}_ 引用该属性。

在下一节中，我们将讨论 Spring Boot 应用程序中的 Log4j2 扩展。

## 3. Log4j2 扩展

Log4j2 扩展与 Logback 扩展类似。**我们不能在标准的 _log4j2.xml_ 配置文件中使用扩展，因为它加载得太早了**。

Spring Boot 推荐的方法是将 Log4j2 配置存储在一个名为 _log4j2-spring.xml_ 的单独文件中。如果存在，Spring Boot 将在加载任何其他 Log4j2 配置之前加载此文件。

### 3.1. Maven 依赖项

要使用 Log4j2 库而不是默认的 Logback，我们需要 **从我们的启动依赖项中排除 Logback**：

```xml
````<dependency>````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-web`````</artifactId>`````
    `<exclusions>`
        `<exclusion>`
            `````<groupId>`````org.springframework.boot`````</groupId>`````
            `````<artifactId>`````spring-boot-starter-logging`````</artifactId>`````
        `</exclusion>`
    `</exclusions>`
````</dependency>````
```

此外，我们需要在 _pom.xml_ 文件中添加 _spring-boot-starter-log4j2_ 和 _log4j-spring-boot_ 依赖项：

```xml
````<dependency>````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-log4j2`````</artifactId>`````
````</dependency>````
````<dependency>````
    `````<groupId>`````org.apache.logging.log4j`````</groupId>`````
    `````<artifactId>`````log4j-spring-boot`````</artifactId>`````
````</dependency>````
```

我们在应用程序中包含 _log4j-spring-boot_ 库以支持 Log4j2 设置中的 SpringBoot 配置文件。如果没有这个依赖项，我们将看到以下错误消息：

```
2023-01-21 15:56:12,473 main ERROR Error processing element SpringProfile ([Loggers: null]): CLASS_NOT_FOUND
```

### 3.2. 特定于配置文件的设置

尽管将设置放入不同的日志配置文件在大多数情况下都能正常工作，但可能存在我们希望为不同环境使用单一日志设置的情况。在这种情况下，**我们可以使用 _SpringProfile_ 元素将 Spring Boot 配置文件添加到我们的配置中**。

让我们编写一个简单的 _log4j2-spring.xml_：

```xml
`<SpringProfile name="development">`
    `<Logger name="com.baeldung.extensions" level="debug" />`
``</SpringProfile>``

`<SpringProfile name="production">`
    `<Logger name="com.baeldung.extensions" level="error" />`
``</SpringProfile>``
```

这与我们在 Logback 部分讨论的示例类似。

如果我们使用 _production_ 配置文件运行应用程序，我们现在将看到来自应用程序的 ERROR 日志，并且不再有来自 _com.baeldung.extensions_ 包的 DEBUG 日志：

```
2023-01-22T11:19:52,885 ERROR [main] c.b.e.SpringBootLog4j2ExtensionsApplication: Error log message
2023-01-22T11:19:52,885 FATAL [main] c.b.e.SpringBootLog4j2ExtensionsApplication: Fatal log message
```

重要的是要注意，_SpringProfile_ 部分在 _configuration_ 元素内的任何位置都受支持。

### 3.3. 环境属性查找

Log4j2 Lookups 提供了一种方法，为我们的日志配置文件提供值。

**我们可以使用 Log4j2 Lookup 在我们的 Log4j2 配置中从 _application.properties_ 文件中访问值。此外，我们可以使用激活的和默认的配置文件的值。为此，在 Log4j2 配置中，我们可以使用以 _spring-_ 为前缀的查找**。

让我们在 _application.properties_ 文件中设置 _spring.application.name=log4j2-extension_。然后，从 Spring 环境读取 _spring.application.name_：

```xml
`<Console name="Console-Extensions" target="SYSTEM_OUT">`
    `<PatternLayout
        pattern="%d %p %c{1.} [%t] ${spring:spring.application.name} %m%n" />`
`</Console>`
```

在上面的配置中，我们使用以 _spring-_ 为前缀的查找设置 _spring.application.name_。运行后，应用程序将把以下消息记录到控制台：

```
2023-01-22 16:17:30,301 ERROR c.b.e.SpringBootLog4j2ExtensionsApplication [main] log4j2-extension Error log message
2023-01-22 16:17:30,301 FATAL c.b.e.SpringBootLog4j2ExtensionsApplication [main] log4j2-extension Fatal log message
```

### 3.4. Log4j2 系统属性

Log4j2 提供了几个系统属性，可用于配置各个方面。我们可以将这些系统属性添加到 _log4j2.system.properties_ 文件中。

让我们添加 _log4j2.debug=true_ 属性。这个系统属性将打印所有内部日志到控制台：

```
TRACE StatusLogger Log4jLoggerFactory.getContext() found anchor class java.util.logging.Logger
```

我们还可以将系统属性添加到 _application.properties_ 文件中。在 _log4j2.system.properties_ 文件中定义的属性优先于 _application.properties_ 文件。

## 4. 结论

Spring Boot 提供了广泛的日志支持。在本教程中，我们探索了 Spring Boot 中的 Logback 和 Log4j2 扩展。

如往常一样，Logback 扩展的完整源代码可在 GitHub 上获得。此外，Log4j2 扩展的源代码也可在 GitHub 上获得。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

OK