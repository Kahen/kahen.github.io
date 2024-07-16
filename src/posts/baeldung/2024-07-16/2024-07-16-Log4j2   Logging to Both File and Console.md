---
date: 2024-07-16
category:
  - Java
  - Log4j2
tag:
  - 日志
  - 文件
  - 控制台
head:
  - - meta
    - name: keywords
      content: Log4j2, 日志记录, 文件, 控制台, Java
------
# 使用Apache Log4j2库同时记录日志到文件和控制台

在本教程中，我们将探讨如何使用Apache Log4j2库将消息记录到文件和控制台。这在非生产环境中非常有用，我们可能希望在控制台中看到调试消息，并且我们可能希望将更高级别的日志持久化到文件中，以便后续分析。

### 2.1. Log4j2依赖
让我们将log4j2依赖项添加到我们的项目中。我们需要Apache Log4J Core和Apache Log4J API依赖项：

```xml
`<dependencies>`
    ``<dependency>``
        ``<groupId>``org.apache.logging.log4j``</groupId>``
        ``<artifactId>``log4j-core``</artifactId>``
        ``<version>``2.19.0``</version>``
    ``</dependency>``
    ``<dependency>``
        ``<groupId>``org.apache.logging.log4j``</groupId>``
        ``<artifactId>``log4j-api``</artifactId>``
        ``<version>``2.19.0``</version>``
    ``</dependency>``
`</dependencies>`
```

### 2.2. 应用程序类
现在让我们使用log4j2库为我们的应用程序添加一些日志记录：

```java
public class Log4j2ConsoleAndFile {
    private static final Logger logger = LogManager.getLogger(Log4j2ConsoleAndFile.class);

    public static void main(String[] args) {
        logger.info("Hello World!");
        logger.debug("Hello World!");
    }
}
```

### 3.1. 控制台日志记录
要记录到任何目的地，我们首先需要定义一个记录到控制台的appender。让我们看看如何配置：

```properties
appender.console.type = Console
appender.console.name = STDOUT
appender.console.layout.type = PatternLayout
appender.console.layout.pattern = [%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n
```

### 3.2. 文件日志记录
类似地，我们可以配置记录器记录到文件。这对于持久化日志非常有用。让我们定义一个文件appender：

```properties
appender.file.type = File
appender.file.name = LOGFILE
appender.file.fileName=logs/log4j.log
appender.file.layout.type=PatternLayout
appender.file.layout.pattern=[%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n
appender.file.filter.threshold.type = ThresholdFilter
appender.file.filter.threshold.level = info
```

## 4. 测试
现在让我们运行应用程序并检查控制台中的输出：

```
12:43:47,891 INFO  Application:8 - Hello World!
12:43:47,892 DEBUG Application:9 - Hello World!
```

正如预期的那样，我们可以看到控制台中的两个日志消息。如果我们检查路径_logs/log4j.log_中的日志文件，我们只能看到_info_级别的日志消息：

```
12:43:47,891 INFO  Application:8 - Hello World!
```

## 5. 结论
在本文中，我们学习了如何将消息记录到控制台和文件。我们创建了一个Java项目，使用属性文件配置了Log4j2，并测试了消息是否打印到控制台和文件。如常，完整的源代码可在GitHub上找到。