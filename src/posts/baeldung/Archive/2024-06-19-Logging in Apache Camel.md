---
date: 2024-06-20
category:
  - Apache Camel
  - Logging
tag:
  - Java
  - Apache Camel
  - Logging
head:
  - - meta
    - name: keywords
      content: Apache Camel, Logging, Java, Software Development, Debugging
---

# 在Apache Camel中记录日志

记录日志在软件开发中至关重要，它有助于记录应用程序的每一个足迹。它有助于跟踪应用程序的活动和状态。基本上，它对于调试非常有用。

Apache Camel提供了一个组件、接口和拦截器来记录消息和交换。它通过为各种日志框架提供一层抽象来简化记录日志。

在本教程中，我们将探讨在Camel应用程序中记录消息和交换的四种方式。

## 2. 使用Log EIP

Apache Camel 2.2提供了一个轻量级的_log()_ DSL，用于从路由中记录人类可读的消息。其主要用途是快速将消息输出到日志控制台。此外，我们还可以与Camel Simple表达式语言一起使用，以进一步将路由中的细节记录到日志控制台。

让我们看一个示例，它从一个文件夹复制文件到另一个文件夹：

```java
class FileCopierCamelRoute extends RouteBuilder {
    void configure() {
        from("file:data/inbox?noop=true")
          .log("We got an incoming file ${file:name} containing: ${body}")
          .to("file:data/outbox")
          .log("Successfully transfer file: ${file:name}");
    }
}
```

在上面的代码中，我们配置了一个_RouteBuilder_，它将文件从_inbox_传输到_outbox_文件夹。首先，我们定义了传入文件的位置。接下来，我们使用_log()_ DSL输出有关传入文件及其内容的人类可读日志。我们还使用Simple表达式语言获取文件名和文件内容作为日志消息的一部分。

这里是日志输出：

```
14:39:23.389 [Camel (camel-1) thread #1 - file://data/inbox] INFO  route1 - We got an incoming file welcome.txt containing: Welcome to Baeldung
14:39:23.423 [Camel (camel-1) thread #1 - file://data/inbox] INFO  route1 - Successfully transfer file: welcome.txt
```

_log()_ DSL与Log组件和_Tracer_拦截器相比是轻量级的。

此外，我们可以明确指定日志级别和名称：

```java
// ...
.log(LoggingLevel.DEBUG,"Output Process","The Process ${id}")
// ...
```

在这里，我们在传递日志消息之前指定了日志级别和名称。我们还拥有WARN、TRACE和OFF作为日志级别选项。**当未指定调试级别时，_log()_ DSL使用INFO**。

## 3. 使用_Processor_接口

_Processor_是Apache Camel中的一个重要接口，它提供了对交换的访问，以便进一步操作。它使我们能够灵活地更改交换体。然而，我们也可以使用它来输出人类可读的日志消息。

首先，_Processor_不是日志工具。因此，我们需要创建一个_Logger_实例来使用它。Apache Camel默认使用SLF4J库。让我们创建一个_Logger_实例：

```java
private static final Logger LOGGER = LoggerFactory.getLogger(FileCopierCamelRoute.class);
```

接下来，让我们看一个示例，它将消息传递给bean进行进一步操作：

```java
void configure() {
    from("file:data/inbox?noop=true")
     .to("log:com.baeldung.apachecamellogging?level=INFO")
     .process(process -> {
         LOGGER.info("We are passing the message to a FileProcessor bean to capitalize the message body");
     })
     .bean(FileProcessor.class)
     .to("file:data/outbox")
}
```

在这里，我们将传入的消息传递给_FileProcessor_ bean，以将文件内容转换为大写。然而，在将消息传递给bean进行处理之前，我们通过创建_Processor_的实例来记录一条信息。

最后，让我们看看日志输出：

```
14:50:47.048 [Camel (camel-1) thread #1 - file://data/inbox] INFO  c.b.a.FileCopierCamelRoute - We are passing the message to a FileProcessor to Capitalize the message body
```

从上面的输出中，自定义日志消息被输出到控制台。

## 4. 使用Log组件

Apache Camel提供了一个Log组件，帮助将Camel _Message_记录到控制台输出。**要使用Log组件，我们可以将消息路由到它**：

```java
void configure() {
    from("file:data/inbox?noop=true")
      .to("log:com.baeldung.apachecamellogging?level=INFO")
      .bean(FileProcessor.class)
      .to("file:data/outbox")
      .to("log:com.baeldung.apachecamellogging")
}
```

在这里，我们在两个地方使用了Log组件。首先，我们通过使用_level_选项以INFO日志级别记录消息体。此外，我们在操作文件后记录了消息体，但我们没有指定日志级别。

**值得注意的是，在未指定日志级别的情况下，Log组件使用INFO级别作为默认**。

这里是日志输出：

```
09:36:32.432 [Camel (camel-1) thread #1 - file://data/inbox] INFO  com.baeldung.apachecamellogging - Exchange[ExchangePattern: InOnly, BodyType: org.apache.camel.component.file.GenericFile, Body: [Body is file based: GenericFile[welcome.txt]]]
09:36:32.454 [Camel (camel-1) thread #1 - file://data/inbox] INFO  com.baeldung.apachecamellogging - Exchange[ExchangePattern: InOnly, BodyType: String, Body: WELCOME TO BAELDUNG]
```

此外，我们可以通过添加_showBodyType_和_maxChars_选项来使输出不那么冗长：

```java
.to("log:com.baeldung.apachecamellogging?showBodyType=false&maxChars=20")
```

在上面的代码中，我们忽略了消息体的时间，并将体字符流线化到20。

## 5. 使用_Tracer_

_Tracer_是Apache Camel架构的一部分，它有助于记录消息在运行时是如何路由的。**它在路由过程中跟踪交换的快照**。它可以拦截消息从一个节点移动到另一个节点。

要使用_Tracer_，我们必须在路由配置方法中启用它：

```java
getContext().setTracing(true);
```

这将启用_Tracer_拦截器，拦截所有交换过程并将它们记录到日志控制台。

让我们看一个启用_Tracer_以跟踪交换过程的示例代码：

```java
void configure() {
    getContext().setTracing(true);
    from("file:data/json?noop=true")
      .unmarshal().json(JsonLibrary.Jackson)
      .bean(FileProcessor.class, "transform")
      .marshal().json(JsonLibrary.Jackson)
      .to("file:data/output");
}
```

在上面的代码中，我们从源复制一个JSON文件并将其转换为Camel可以操作的数据结构。我们将内容传递给一个bean以更改文件内容。接下来，我们将消息转换为JSON并将其发送到预期的目的地。

这是从_Tracer_拦截器的日志：

```
// ...
09:23:10.767 [Camel (camel-1) thread #1 - file://data/json] INFO  FileCopierTracerCamelRoute:14 - *--> [route1      ] [from[file:data/json?noop=true]   ]
09:23:10.768 [Camel (camel-1) thread #1 - file://data/json] INFO  FileCopierTracerCamelRoute:14 -      [route1      ] [log:input?level=INFO             ]
// ...
```

在上面的输出中，_Tracer_记录了从生产者到消费者的每一个过程和交换。这对于调试非常有用。

值得注意的是，日志输出很详细，但为了简单起见，我们展示了基本的日志消息。

## 6. 结论

在本文中，我们学习了在Apache Camel中记录日志的四种方式。此外，我们看到了使用_log()_ DSL、_Tracer_、_Processor_和Log组件将消息记录到控制台的示例。_log()_ DSL和_Processor_接口非常适合人类可读的日志，而Log组件和_Tracer_适用于调试中使用的更复杂的日志。

如常，示例的源代码可在GitHub上获取。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。