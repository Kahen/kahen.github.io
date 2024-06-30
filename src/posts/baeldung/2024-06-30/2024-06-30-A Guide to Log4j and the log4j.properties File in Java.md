---
date: 2024-06-30
category:
  - Log4j
  - Java
tag:
  - Log4j
  - log4j.properties
  - Java日志
head:
  - - meta
    - name: keywords
      content: Java, Log4j, log4j.properties, 日志配置
---
# Log4j和Java中log4j.properties文件指南

Log4J是一个流行的开源日志框架，用Java编写。各种基于Java的应用程序广泛使用Log4j。此外，它是线程安全的，快速的，并提供了一个命名的_Logger_层级结构。Log4j在开源Apache软件许可下分发。

**Log4j 1.x在2015年8月5日达到了生命周期的终点。因此，到目前为止，Log4j2是Log4j的最新升级。**

在本教程中，我们将学习Log4j以及如何使用Java中的_log4j.properties_文件配置核心Log4j组件。

## 2. Maven设置

我们需要在_pom.xml_中加入_log4j-core_依赖项来开始：

```
`<dependency>`
    `<groupId>`org.apache.logging.log4j`</groupId>`
    `<artifactId>`log4j-api`</artifactId>`
    `<version>`1.2.17`</version>`
`</dependency>`
```

可以在此处找到_log4j-core_的最新版本。

## 3. Log4j API

Log4j API提供了一种机制，可以根据各种优先级级别传递日志信息，并将它们定向到各种目的地，如文件、控制台、数据库等。它还支持在将日志事件传递给_logger_或_appender_之前进行过滤。

Log4j API具有分层架构，提供了Log4j框架中的两种类型的对象——核心对象和支持对象。

## 4. Log4j组件

Log4j有三个主要组件——_logger_、_appender_和_layout_——可以一起使用，以在所需的目的地打印自定义的日志语句。让我们简要地看看它们。

### 4.1. _Logger_

_Logger_对象负责表示日志信息。它是Log4j架构中的第一层强制性层。_Logger_类在_package org.apache.log4j_中定义。

通常，**我们为每个应用程序类创建一个_Logger_实例来记录属于该类的重要事件**。此外，我们通常在类的开头使用一个静态工厂方法创建此实例，该方法接受类名为参数：

```
private static final Logger logger = Logger.getLogger(JavaClass.class.getName());
```

随后，我们可以使用_Logger_类的多种方法来记录或打印根据不同类别的重要事件。这些方法是_trace()_、_debug()_、_info()_、_warn()_、_error()_、_fatal()_。这些方法决定了日志请求的级别。

_Logger_方法的优先级顺序是：_TRACE_ < _DEBUG_ < _INFO_ < _WARN_ < _ERROR_ < _FATAL_。因此，这些方法根据在_log4j.properties_文件中设置的_logger_级别打印日志消息。这意味着如果我们将_logger_级别设置为_INFO_，那么所有的_INFO_、_WARN_、_ERROR_和_FATAL_事件都将被记录。

### 4.2. _Appender_

_Appender_表示日志输出的目的地。我们可以使用Log4j将日志输出打印到多个首选目的地，如控制台、文件、远程套接字服务器、数据库等。我们称这些输出目的地为_Appender_。此外，我们可以将多个_appender_附加到一个_Logger_。

_Appender_根据_appender_累加规则工作。**这条规则规定，任何_Logger_的日志语句的输出将传递到它的所有_appender_ s及其祖先——** **在层级结构中较高的_appender_ s。**

Log4j为文件、控制台、GUI组件、远程套接字服务器、JMS等定义了多个_appender_。

### 4.3. _Layout_

我们使用_layout_来自定义日志语句的格式。我们可以通过将_layout_与已经定义的_appender_关联来实现这一点。因此，_layout_和_appender_的组合帮助我们将格式化的日志语句发送到所需的目的地。

我们可以通过使用转换模式来指定日志语句的格式。**类_PatternLayout_更多地解释了我们可以根据需要使用的转换字符。**

我们还将通过以下部分的示例来了解一些转换字符。

我们可以使用XML或属性文件配置Log4j。_log4j.properties_文件以键值对的形式存储配置。

log4j属性配置文件的默认名称是_log4j.properties_。_Logger_在_CLASSPATH_中查找此文件名。然而，**如果我们需要使用不同的配置文件名，我们可以使用系统属性_log4j.configuration_来设置。**

_log4j.properties_文件包含_appender_ s的规范，它们的名称和类型，以及_layout_模式。它还包含有关默认_root Logger_及其日志级别的规范。

## 6. _log4j.properties_文件的语法

在一般的_log4j.properties_文件中，我们定义以下配置：

- _root logger_及其级别。我们还在这里为_appender_提供了一个名称。
- 然后，我们将一个有效的_appender_分配给定义的appender名称。
- 最后，我们为定义的_appender_定义_layout_、目标、级别等。

让我们看看一般log4.properties文件的语法：

```
# Root logger with appender name
log4j.rootLogger = DEBUG, NAME

# Assign NAME a valid appender
log4j.appender.NAME = org.apache.log4j.FileAppender

# Define the layout for NAME
log4j.appender.NAME.layout=org.apache.log4j.PatternLayout
log4j.appender.NAME.layout.conversionPattern=%m%n
```

这里，_NAME_是_Appender_的名称。正如前面所讨论的，**我们可以将多个_appender_附加到一个_Logger_来将日志定向到不同的目的地。**

## 7. 示例

现在，让我们通过一些示例来理解不同_appender_的_log4j.properties_文件配置。

### 7.1. 示例程序

让我们从一个记录一些消息的示例应用程序开始：

```
import org.apache.log4j.Logger;

public class Log4jExample {

    private static Logger logger = Logger.getLogger(Log4jExample.class);

    public static void main(String[] args) throws InterruptedException {
        for(int i = 1; i <= 2000; i++) {
            logger.info("This is the " + i + " time I say 'Hello World'.");
            Thread.sleep(100);
        }
    }
}
```

该应用程序是一个简单的应用程序——它在循环中写入一些消息，每次迭代之间有短暂的延迟。它有2,000次迭代，每次迭代之间有100毫秒的暂停。因此，执行应该需要大约三个半小时才能完成。我们将在下面的例子中使用这个应用程序。

### 7.2. 控制台日志记录

如果没有找到配置文件，控制台是记录消息的默认位置。让我们为_console_和_root logger_创建一个_log4j.properties_配置，并为其定义日志级别：

```
# Root Logger
log4j.rootLogger=INFO, stdout

# Direct log messages to stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
```

在这里，我们定义了一个_log4j.properties_文件，具有以下规格：

- 我们定义了_root logger_的级别为_INFO_。这意味着所有级别为_INFO_及以上的日志事件都将被记录。我们还为_appender_定义了一个名称为_stdout_。
- 由于我们想要将日志定向到控制台，我们分配了_Appender_为_org.apache.log4j.ConsoleAppender_，并将目标设置为_System.out_。
- 最后，我们指定了我们想要打印日志的_PatternLayout_格式，使用_ConversionPattern_。

让我们也了解一下我们在_ConversionPattern_中使用的每个转换字符的含义：

- _%d_以定义的格式添加时间戳。
- _%-5p_将日志级别信息添加到每个日志语句中。它表示日志事件的优先级应该左对齐到五个字符的宽度。
- _%c{1}_打印限定的类名，后面可以选择性地跟随包名（精度限定符），即记录特定的日志语句。
- _%L_打印特定日志事件的行号。
- _%m_打印实际的日志消息。
- _%n_在每个日志语句后添加一个新行。

因此，当我们运行我们的示例应用程序时，我们在控制台上得到以下行打印：

```
2023-08-01 00:27:25 INFO Log4jExample:15 - This is the 1 time I say 'Hello World'.
...
...
2023-08-01 00:27:25 INFO Log4jExample:15 - This is the 2000 time I say 'Hello World'.
```

**_PatternLayout_类的文档根据我们的需求解释了更多的转换字符。**

### 7.3. 多个destinations

正如前面所讨论的，我们可以将日志事件重定向到多个目的地：

```
# Root logger
log4j.rootLogger=INFO, file, stdout

# Direct to a file
log4j.appender.file=org.apache.log4j.RollingFileAppender
log4j.appender.file.File=C:\\Baeldung\\app.log
log4j.appender.file.MaxFileSize=5KB
log4j.appender.file.MaxBackupIndex=2
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n

# Direct to console
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
```

在这里，我们使用了两个_appender_ s将日志消息重定向到文件和控制台。此外，我们还为我们的文件_Appender_分配了一个_RollingFileAppender_。当我们知道日志文件可能会随着时间增长时，我们使用_RollingFileAppender_。

在上述示例中，**我们使用了_RollingFileAppender_，它根据大小和日志文件的数量使用_MaxFileSize_和_MaxBackupIndex_参数来滚动日志文件。** 因此，当日志文件大小达到5KB时，日志文件将滚动，我们将保留最多两个滚动的日志文件作为备份。

当我们运行我们的示例应用程序时，我们得到以下包含与前一个示例中相同的日志语句的文件：

```
31/01/2023  10:28    138 app.log
31/01/2023  10:28  5.281 app.log.1
31/01/2023  10:28  5.281 app.log.2
```

我们可以在GitHub上找到基于大小滚动日志文件的详细示例和执行说明。

## 8. 结论

在本文中，我们探讨了Log4j及其三个组件——_logger_ s、_appender_ s和_layout_ s。我们还了解了_log4j.properties_文件的语法和一些简单的_log4j.properties_文件配置示例。

正如往常一样，伴随本文的示例可以在GitHub上找到。

OK