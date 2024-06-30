---
date: 2024-06-30
category:
  - Java
  - Log4j2
tag:
  - Log4j2
  - 日志配置
head:
  - - meta
    - name: keywords
      content: Log4j2, 日志配置, Java, 配置文件
---

# Log4j 2 使用属性文件进行配置

Log4j 2 是一个流行的开源 Java 日志框架。它被引入是为了克服 Log4j 的各种架构缺陷。它是线程安全的、快速的，并且提供了许多改进，超过了它的前身。它在开源 Apache 软件许可下分发。

Log4j 2 是经典 Log4j 框架的最新和改进版本，该框架在 2015 年 8 月 5 日达到了生命周期的终点。然而，Log4j 仍然在许多 Java 企业应用程序中作为日志框架被广泛使用。

在本教程中，我们将学习 Log4j 2，它相对于 Log4j 的优势，以及如何使用 Java 中的 _log4j2.properties_ 文件配置其核心组件。

## 2. Maven 配置

我们需要在 _pom.xml_ 中添加 _log4j-core_ 依赖项来开始：

```xml
``<dependency>``
    ``<groupId>``org.apache.logging.log4j``</groupId>``
    ``<artifactId>``log4j-core``</artifactId>``
    ``<version>``2.20.0``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.apache.logging.log4j``</groupId>``
    ``<artifactId>``log4j-api``</artifactId>``
    ``<version>``2.20.0``</version>``
``</dependency>``
```

我们可以在 Maven 仓库中找到 _log4j-core_ 和 _log4j-api_ 的最新版本。

## 3. Log4j 2 日志器

与 Log4j 中使用 _Logger.getLogger()_ 获取具有特定名称的 _Logger_ 实例不同，在 Log4j 2 中我们使用 _LogManager.getLogger()_：

```java
private static final Logger logger = LogManager.getLogger(Log4j2Example.class);
```

_LogManager_ 从配置文件或配置类中读取初始配置参数。一个 _Logger_ 与 _LoggerConfig_ 关联，后者又与实际传递日志事件的 _Appender_ 相关联。

**如果我们通过传递相同的（类）名称调用 _LogManager.getLogger()_，我们将始终获得相同的日志器实例的引用。**

_Logger_ 和 _LoggerConfig_ 都是命名实体。每个 _Logger_ 引用一个 _LoggerConfig_，它可以引用其父级，从而实现相同的效果。

_Logger_ 遵循命名层次结构。这意味着名为 "_com.baeldung_" 的 _LoggerConfig_ 是名为 "_com.baeldung.foo_" 的 _LoggerConfig_ 的父级。

与 Log4j 仅支持通过属性和 XML 格式进行配置不同，我们可以**使用 JSON、XML、YAML 或属性文件格式定义 Log4j 2 配置。**所有这些格式在功能上是等效的。因此，我们可以轻松地将一种格式中的配置转换为任何其他格式。

**此外，Log4j2 支持自动配置，这意味着它能够在初始化期间自动配置自己。**

它在启动时扫描并定位所有 _ConfigurationFactory_ 插件，并按从高到低的加权顺序排列——属性文件具有最高的优先级值 _8_，其次是 YAML、JSON 和 XML。

这意味着如果我们有以属性文件和 XML 文件形式的日志配置，那么将优先考虑属性文件。

## 5. _log4j2.properties_ 文件

当 Log4j 2 发布时，它不支持通过属性文件进行配置。它从版本 2.4 开始支持属性文件。

默认的属性配置文件始终是 _log4j2.properties_。_Logger_ 从 _CLASSPATH_ 中获取此文件的引用。

然而，**如果我们需要使用不同的配置文件名，我们可以使用系统属性 _log4j.configurationFile_ 来设置。**

系统属性可能指向本地文件系统或可能包含 URL。如果 Log4j 2 无法定位配置文件，它提供 _DefaultConfiguration_。在这种情况下，我们将日志输出重定向到控制台，并将 _root logger_ 级别设置为 _ERROR_。

## 6. _log4j2.properties_ 文件的语法

_log4j2.properties_ 文件的语法与 _log4j.properties_ 不同。在 _log4j.properties_ 文件中，每个配置都以 '_log4j_' 开头，而在 _log4j2.properties_ 配置中省略了这一点。

让我们看看一个通用 _log4j2.properties_ 文件的语法：

```properties
# 根日志器与追加器名称
rootLogger = DEBUG, STDOUT

# 分配 STDOUT 一个有效的追加器并定义其布局
appender.console.name = STDOUT
appender.console.type = Console
appender.console.layout.type = PatternLayout
appender.console.layout.pattern = %msg%n
```

这里，_STDOUT_ 是 _Appender_ 的名称。如前所述，我们可以将多个 _appender_ 附加到 _logger_ 以将日志定向到不同的目的地。

**我们还应该在每个 Log4j 2 配置中定义根日志器。否则，将使用默认的 _root LoggerConfig_，它具有 _ERROR_ 级别和 _ConsoleAppender_。**

## 7. 示例

现在，让我们通过一些示例来理解不同 _appender_ 的 _log4j2.properties_ 文件配置。

### 7.1. 示例程序

让我们从一个记录一些消息的示例应用程序开始：

```java
public class Log4j2ConsoleAndFile {
    private static final Logger logger = LogManager.getLogger(Log4j2ConsoleAndFile.class);

    public static void main(String[] args) {
        logger.info("Hello World!");
        logger.debug("Hello World!");
    }
}
```

### 7.2. 控制台日志记录

如果没有找到配置文件，控制台是记录消息的默认位置。让我们为控制台 _Appender_ 以及 _root logger_ 创建一个 _log4j2.properties_ 配置，并为其定义日志级别：

```properties
# 根日志器
rootLogger=DEBUG, STDOUT

# 直接将日志消息定向到 stdout
appender.console.type = Console
appender.console.name = STDOUT
appender.console.layout.type = PatternLayout
appender.console.layout.pattern = [%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n
```

在这里，我们定义了一个具有以下规格的 _log4j2.properties_ 文件：

- 我们定义了 _root logger_ 的级别为 _DEBUG_。这意味着我们将获得所有级别为 _DEBUG_ 及以上的日志事件。我们还为 _appender_ 定义了一个名称为 _STDOUT_。
- 由于我们想要将日志定向到控制台，我们分配了 _Appender type_ 为 _Console_。我们应该注意到键名中的 _console_ 一词只是一种惯例，不是强制性的。
- 然后，我们指定了我们想要打印日志消息的模式。

让我们也了解一下我们在 _layout_ 模式中使用的每个转换字符的含义：

- _%-5level_ 为每个日志语句添加日志级别信息。它表示日志事件的优先级左对齐到五个字符的宽度。
- _%d_ 以定义的格式添加时间戳。
- _%t_ 向日志语句添加线程名称
- _%c{1}_ 打印限定的类名，可选地后跟包名（精度限定符）_,_ 记录特定日志语句的类。
- _%msg_ 打印实际的日志消息。
- _%n_ 在每个日志语句后添加新行。

因此，当我们运行我们的示例应用程序时，我们在控制台上得到以下行打印：

```
[INFO ] 2023-08-05 23:04:03.255 [main] Log4j2ConsoleAndFile - Hello World!
[DEBUG] 2023-08-05 23:04:03.255 [main] Log4j2ConsoleAndFile - Hello World!
```

**类 _PatternLayout_ 根据我们的需求解释了我们可以使用更多的转换字符。**

### 7.3. 多个目的地

如前所述，我们可以将日志事件重定向到多个目的地：

```properties
# 根日志器
rootLogger=INFO, STDOUT, LOGFILE

# 直接将日志消息定向到 STDOUT
appender.console.type = Console
appender.console.name = STDOUT
appender.console.layout.type = PatternLayout
appender.console.layout.pattern = [%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n

# 直接定向到文件
appender.file.type = File
appender.file.name = LOGFILE
appender.file.fileName = baeldung/logs/log4j2.log
appender.file.layout.type = PatternLayout
appender.file.layout.pattern = [%-5level] %d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %c{1} - %msg%n
appender.file.filter.threshold.type = ThresholdFilter
appender.file.filter.threshold.level = info
```

在这里，我们使用了两个 _appender_ 将日志消息重定向到文件和控制台。我们分别将它们命名为 _STDOUT_ 和 _LOGFILE_。此外，我们将这两个 _appender_ 都添加到了 _root logger_。

**要将日志消息重定向到文件，我们需要指定文件的名称及其位置。**

我们还使用了 _ThresholdFilter_，它过滤掉一定日志级别及以上的日志消息。最后，我们将 _threshold.level_ 指定为 _INFO_。因此，所有级别为 _INFO_ 或更高的日志消息将被打印到文件中。

当我们运行我们的示例应用程序时，我们只在控制台以及 _log4j2.log_ 文件中打印以下行：

```
[INFO ] 2023-08-05 23:04:03.255 [main] Log4j2ConsoleAndFile - Hello World!
```

## 8. 结论

在本文中，我们探讨了 Log4j 2 及其相对于 Log4j 的优势。我们还理解了 _log4j2.properties_ 文件的语法以及一些简单的配置 _log4j2.properties_ 文件的示例。

正如往常一样，伴随本文的示例可以在 GitHub 上找到。

[文章结束]

OK