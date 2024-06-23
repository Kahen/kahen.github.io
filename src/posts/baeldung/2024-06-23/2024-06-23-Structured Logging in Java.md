---
date: 2024-06-23
category:
  - Java
  - 编程
tag:
  - 日志记录
  - 结构化日志
head:
  - - meta
    - name: keywords
      content: Java, 结构化日志, 日志记录, 性能监控
---
# Java中的结构化日志记录

应用程序日志是排查问题、测量性能或仅仅是检查软件应用程序行为的重要资源。

在本教程中，我们将学习如何在Java中实现结构化日志记录以及这种技术相对于非结构化日志记录的优势。

## 2. 结构化日志与非结构化日志的比较

在深入代码之前，让我们了解非结构化和结构化日志之间的主要区别。

非结构化日志是打印出的信息，具有一致的格式但没有结构。它只是一段文本，其中一些变量被连接和格式化。

让我们看一个来自演示Spring应用程序的非结构化日志示例：

```
22:25:48.111 [restartedMain] INFO  o.s.d.r.c.RepositoryConfigurationDelegate - Finished Spring Data repository scanning in 42 ms. Found 1 JPA repository interfaces.
```

上述日志显示了时间戳、日志级别、完全限定的类名以及Spring当时正在做什么的描述。当我们观察应用程序行为时，这是一条有用的信息。

**然而，从非结构化日志中提取信息比较困难**。例如，要识别并提取生成该日志的类名，我们可能需要使用_String_ 操作逻辑来找到它。

**与此相反，结构化日志以类似字典的方式单独显示每条信息**。我们可以将它们视为信息对象而不是_String_。让我们看看应用于非结构化日志示例的可能的结构化日志解决方案：

```
{
    "timestamp": "22:25:48.111",
    "logger": "restartedMain",
    "log_level": "INFO",
    "class": "o.s.d.r.c.RepositoryConfigurationDelegate",
    "message": "Finished Spring Data repository scanning in 42 ms. Found 1 JPA repository interfaces."
}
```

**在结构化日志中，提取特定字段值更容易，因为我们可以使用其名称访问它**。因此，我们不需要处理文本并查找其中的特定模式以提取信息。例如，在我们的代码中，我们可以简单地使用_class_ 字段来访问生成日志的类名。

## 3. 配置结构化日志

在这一部分，我们将深入了解使用_logback_和_slf4j_库在Java应用程序中实现结构化日志记录的细节。

### 3.1. 依赖项

为了使一切正常工作，我们需要在_pom.xml_文件中设置一些依赖项：

```
````<dependency>````
    ````<groupId>````org.slf4j````</groupId>````
    ````<artifactId>````slf4j-api````</artifactId>````
    ````<version>````2.0.9````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````ch.qos.logback````</groupId>````
    ````<artifactId>````logback-classic````</artifactId>````
    ````<version>````1.4.14````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````ch.qos.logback````</groupId>````
    ````<artifactId>````logback-core````</artifactId>````
    ````<version>````1.4.14````</version>````
````</dependency>````
```

_slf4j-api_依赖项是_logback-classic_和_logback-core_依赖项的门面。它们一起在Java应用程序中轻松实现日志记录机制。请注意，如果我们使用Spring Boot，那么我们不需要添加这三个依赖项，因为它们是_spring-boot-starter-logging_的子级。

让我们添加另一个依赖项_logstash-logback-encoder_，它有助于实现结构化日志格式和布局：

```
````<dependency>````
    ````<groupId>````net.logstash.logback````</groupId>````
    ````<artifactId>````logstash-logback-encoder````</artifactId>````
    ````<version>````7.4````</version>````
````</dependency>````
```

记得始终使用上述依赖项的最新可能版本。

### 3.2. 为结构化日志配置_logback_的基础知识

要以结构化方式记录信息，我们需要配置_logback_。为此，让我们创建一个_logback.xml_文件，其中包含一些初始内容：

```
``<configuration>``
    ``<appender name="jsonConsoleAppender" class="ch.qos.logback.core.ConsoleAppender">``
        ``<encoder class="net.logstash.logback.encoder.LogstashEncoder">``
        ``</encoder>``
    ``</appender>``

    ``<root level="INFO">``
        ``<appender-ref ref="jsonConsoleAppender"/>``
    ``</root>``
``</configuration>``
```

在上述文件中，我们配置了一个名为_jsonConsoleAppender_的_appender_，它使用_logback-core_中的现有_ConsoleAppender_类作为其appender。

我们还设置了一个指向_logback-encoder_库中的_LogstashEncoder_类的_encoder_。该编码器负责将日志事件转换为JSON格式并输出信息。

有了这些设置，让我们看看一个示例日志条目：

```
{
{    "@timestamp":"2023-12-20T22:16:25.2831944-03:00"}
{    "@version":"1"}
    "message":"Example log message",
    "logger_name":"info_logger",
    "thread_name":"main",
{    "level":"INFO"}
{    "level_value":20000}
    "custom_message":"my_message",
    "password":"123456"
}
```

上述日志行以JSON格式结构化，带有元数据信息和自定义字段，如_message_和_password_。

### 3.3. 改进结构化日志

为了使我们的日志**更易于阅读和安全**，让我们修改我们的_logback.xml_：

```
``<configuration>``
    ``<appender name="jsonConsoleAppender" class="ch.qos.logback.core.ConsoleAppender">``
        ``<encoder class="net.logstash.logback.encoder.LogstashEncoder">``
            `<includeCallerData>`true`</includeCallerData>`
            `<jsonGeneratorDecorator class="net.logstash.logback.decorate.CompositeJsonGeneratorDecorator">`
                `<decorator class="net.logstash.logback.decorate.PrettyPrintingJsonGeneratorDecorator"/>`
                `<decorator class="net.logstash.logback.mask.MaskingJsonGeneratorDecorator">`
                    `<defaultMask>`XXXX`</defaultMask>`
                    `<path>`password`</path>`
                `</decorator>`
            `</jsonGeneratorDecorator>`
        ``</encoder>``
    ``</appender>``

    ``<root level="INFO">``
        ``<appender-ref ref="jsonConsoleAppender"/>``
    ``</root>``
``</configuration>``
```

在这里，我们添加了几个标签来提高输出的可读性，添加了更多的元数据，并混淆了一些字段。让我们分别看看每一个：

- _configuration_: 包含日志配置的根标签
- _appender name_: 我们定义的appender名称，以便在其他标签中重用
- _appender class_: 实现日志appender的完全限定类名。我们使用了_logback-core_中的_ConsoleAppender_类。
- _encoder class_: 日志编码器实现，在我们的情况下是_logstash-logback-encoder_中的_LogstashEncoder_
- _includeCallerData_: 添加了更多关于生成该日志行的调用者代码的信息
- _jsonGeneratorDecorator_: 为了以更漂亮的格式打印JSON，我们添加了这个标签，其中嵌套了一个_reference_标签，引用了_CompositeJsonGeneratorDecorator_类。
- _decorator class_: 我们使用了_PrettyPrintingJsonGeneratorDecorator_类以更漂亮的方式打印JSON输出，显示每个字段在不同的行。
- _decorator class_: 这里，_MaskingJsonGeneratorDecorator_类混淆了任何字段数据。
- _defaultMask_: 替换在_path_标签中定义的字段的掩码。这在掩码敏感数据时非常有用，使我们的应用程序在使用结构化日志时符合PII合规性。
- _path_: 应用在_defaultMask_标签中定义的掩码的字段名称

使用新配置，第3.2节的相同日志应该看起来类似于：

```
{
  "@timestamp" : "2023-12-20T22:44:58.0961616-03:00",
  "@version" : "1",
  "message" : "Example log message",
  "logger_name" : "info_logger",
  "thread_name" : "main",
  "level" : "INFO",
  "level_value" : 20000,
  "custom_message" : "my_message",
  "password" : "XXXX",
  "caller_class_name" : "StructuredLog4jExampleUnitTest",
  "caller_method_name" : "givenStructuredLog_whenUseLog4j_thenExtractCorrectInformation",
  "caller_file_name" : "StructuredLog4jExampleUnitTest.java",
  "caller_line_number" : 16
}
```

日志也有助于识别我们代码中的错误。因此，**我们还可以使用_LoggingEventBuilder_在_catch_块中说明错误日志记录**：

```
@Test
void givenStructuredLog_whenUseLog4j_thenExtractCorrectInformation() {
    User user = new User("1", "John Doe", "123456");

    try {
        throwExceptionMethod();
    } catch (RuntimeException ex) {
        logger.atError().addKeyValue("user_info",user) user)
                .setMessage("Error processing given user")
                .addKeyValue("exception_class", ex.getClass().getSimpleName())
                .addKeyValue("error_message", ex.getMessage())
                .log();
    }
}
```

在上述测试中，我们为异常消息和类名添加了更多的键值对。让我们看看日志输出：

```
{
  "@timestamp" : "2023-12-22T00:04:52.8414988-03:00",
  "@version" : "1",
  "message" : "Error processing given user",
  "logger_name" : "logger_name_example",
  "thread_name" : "main",
  "level" : "ERROR",
  "level_value" : 40000,
  "user_info" : {
    "id" : "1",
    "name" : "John Doe",
    "password" : "XXXX"
  },
  "exception_class" : "RuntimeException",
  "error_message" : "Error saving user data",
  "caller_class_name" : "StructuredLog4jExampleUnitTest",
  "caller_method_name" : "givenStructuredLog_whenUseLog4j_thenExtractCorrectInformation",
  "caller_file_name" : "StructuredLog4jExampleUnitTest.java",
  "caller_line_number" : 35
}
```

## 5. 结构化日志记录的优势

结构化日志记录与非结构化日志记录相比有一些优势，比如可读性和效率。

### 5.1. 可读性

日志通常是排查软件问题、测量性能以及检查应用程序是否按预期行为的最佳工具之一。因此，创建一个系统，使我们能够更容易地阅读日志行非常重要。

**结构化日志以字典形式显示数据，这使得人脑更容易在日志行中搜索特定字段**。这与使用索引搜索书籍中的特定章节，而不是逐页阅读内容的概念相同。

### 5.2. 效率

通常，像Kibana、New Relic和Splunk这样的数据可视化工具使用查询语言在特定时间窗口中的所有日志行中搜索特定值。**当使用结构化日志记录时，由于数据以_key-value_格式存在，编写日志搜索查询更容易**。

此外，使用结构化日志记录，更容易创建有关提供的数据的业务指标。在这种情况下，在一致的结构化格式中搜索业务数据比在整个日志文本中搜索特定单词更容易和更有效。

最后，搜索结构化数据的查询使用更简单的算法，这可能会降低根据使用的工具降低云计算成本。

## 6. 结论

在本文中，我们看到了一种使用_slf4j_和_logback_在Java中实现结构化日志记录的方法。

使用格式化的结构化日志记录使机器和人类能够更快地阅读它们，使我们的应用程序更容易排查问题，并降低消费日志事件的复杂性。

如常，源代码可在GitHub上获得。
OK