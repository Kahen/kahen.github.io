---
date: 2023-07-31
category:
  - Spring Boot
  - AsyncAPI
tag:
  - Springwolf
  - Event-Driven
  - Documentation
head:
  - - meta
    - name: keywords
      content: Springwolf, AsyncAPI, Spring Boot, Event-Driven, Documentation
---
# 使用AsyncAPI和Springwolf记录Spring事件驱动API

记录API是构建应用程序的重要部分。它是我们与客户共享的合同。此外，它详细记录了我们的集成点如何工作。文档应该易于访问、理解和实现。

在本教程中，我们将研究Springwolf，用于记录事件驱动的Spring Boot服务。Springwolf实现了AsyncAPI规范，这是OpenAPI规范的事件驱动API的适配。**Springwolf是协议不可知的，涵盖了Spring Kafka、Spring RabbitMQ和Spring CloudStream实现。**

使用Spring Kafka作为我们的事件驱动系统，**Springwolf为我们从代码生成AsyncAPI文档。**一些消费者会自动检测到。其他信息由我们提供。

## **2. 设置Springwolf**

要开始使用Springwolf，我们添加依赖项并进行配置。

### **2.1. 添加依赖项**

假设我们有一个运行中的带有Spring Kafka的Spring应用程序，我们在_pom.xml_文件中将_springwolf-kafka_添加为我们的Maven项目的依赖项：

```xml
``<dependency>``
    ``<groupId>``io.github.springwolf``</groupId>``
    ``<artifactId>``springwolf-kafka``</artifactId>``
    ``<version>``0.14.0``</version>``
``</dependency>``
```

最新版本可以在Maven Central找到，项目网站上提到了对Spring Kafka之外的其他绑定的支持。

### **2.2. _application.properties_ 配置**

在最基本的形式中，我们向我们的_application.properties_添加以下Springwolf配置：

```properties
# Springwolf 配置
springwolf.docket.base-package=com.baeldung.boot.documentation.springwolf.adapter
springwolf.docket.info.title=${spring.application.name}
springwolf.docket.info.version=1.0.0
springwolf.docket.info.description=Baeldung 教程应用程序，演示使用Springwolf的AsyncAPI文档

# Springwolf Kafka 配置
springwolf.docket.servers.kafka.protocol=kafka
springwolf.docket.servers.kafka.url=localhost:9092
```

第一部分设置了通用的Springwolf配置。**这包括_base-package_，Springwolf用它来自动检测监听器。**我们还设置了_docket_配置键下的一般信息，这些信息出现在AsyncAPI文档中。

然后，我们设置了_springwolf-kafka_特定的配置。同样，这也出现在AsyncAPI文档中。

### **2.3. 验证**

现在，我们准备运行我们的应用程序。应用程序启动后，默认情况下，AsyncAPI文档可在_/springwolf/docs_路径获取：

```
http://localhost:8080/springwolf/docs
```

## **3. AsyncAPI文档**

AsyncAPI文档遵循与OpenAPI文档类似的结构。首先，我们只查看关键部分。**规范可在AsyncAPI网站上找到。**为了简洁，我们只看属性的一个子集。

在以下小节中，我们将逐步查看JSON格式的AsyncAPI文档。我们从以下结构开始：

```json
{
    "asyncapi": "2.6.0",
    "info": { ... },
    "servers": { ... },
    "channels": { ... },
    "components": { ... }
}
```

### **3.1. _info_ 部分**

文档的_info_部分包含有关应用程序本身的信息。**至少包括以下字段：_title_、_application version_和_description._**

根据我们添加到配置中的信息，创建了以下结构：

```json
"info": {
    "title": "Baeldung Tutorial Springwolf Application",
    "version": "1.0.0",
    "description": "Baeldung Tutorial Application to Demonstrate AsyncAPI Documentation using Springwolf"
}
```

### **3.2. _servers_ 部分**

类似地，_servers_部分包含有关我们的Kafka代理的信息，并基于上述_application.properties_配置：

```json
"servers": {
    "kafka": {
        "url": "localhost:9092",
        "protocol": "kafka"
    }
}
```

### **3.3. _channels_ 部分**

此时此部分为空，因为我们尚未在应用程序中配置任何消费者或生产者。在稍后的部分配置它们之后，我们将看到以下结构：

```json
"channels": {
    "my-topic-name": {
        "publish": {
             "message": {
                "title": "IncomingPayloadDto",
                "payload": {
                    "$ref": "#/components/schemas/IncomingPayloadDto"
                }
            }
        }
    }
}
```

通用术语_channels_在Kafka术语中指的是_topics_。

每个主题可能提供两个操作：_publish_和/或_subscribe_。值得注意的是，**从应用程序的角度来看，语义可能看起来有些混乱：**

- **_publish_消息到此通道，以便我们的应用程序可以消费它们。**
- **_subscribe_订阅此通道以从我们的应用程序接收消息。**

操作对象本身包含信息，如_description_和_message_。_message_对象包含信息，如_title_和_payload_。

为了避免在多个主题和操作中重复相同的有效载荷信息，**AsyncAPI使用_$ref_符号来指示AsyncAPI文档_components_部分中的引用。**

### **3.4. _components_ 部分**

同样，此部分此时为空，但将具有以下结构：

```json
"components": {
    "schemas": {
        "IncomingPayloadDto": {
            "type": "object",
            "properties": {
                ...
                "someString": {
                    "type": "string"
                }
            },
            "example": {
                "someEnum": "FOO2",
                "someLong": 1,
                "someString": "string"
            }
        }
    }
}
```

_components_部分包含所有_$ref_引用的详细信息，包括_#/components/schemas/IncomingPayloadDto_。除了有效载荷的_type_和_properties_，模式还可以包含有效载荷的_example_（JSON）。

## **4. 记录消费者**

**Springwolf自动检测所有_@KafkaListener_注释**，接下来将展示。此外，我们使用_@AsyncListener_注释手动提供更多详细信息。

### **4.1. 自动检测_@KafkaListener_注释**

通过在方法上使用Spring-Kafka的_@KafkaListener_注释，Springwolf在_base-package_内自动找到消费者：

```java
@KafkaListener(topics = TOPIC_NAME)
public void consume(IncomingPayloadDto payload) {
    // ...
}
```

现在，AsyncAPI文档包含了带有_publish_操作和_IncomingPayloadDto_模式的通道_TOPIC_NAME_，正如我们之前看到的。

### **4.2. 通过_@AsyncListener_注释手动记录消费者**

**使用自动检测和@ _AsyncListener_可能会导致重复。**为了能够手动添加更多信息，我们完全禁用_@KafkaListener_的自动检测，并将以下行添加到_application.properties_文件中：

```properties
springwolf.plugin.kafka.scanner.kafka-listener.enabled=false
```

接下来，我们**在同一方法上添加Springwolf @ _AsyncListener_注释**，并为AsyncAPI文档提供额外的信息：

```java
@KafkaListener(topics = TOPIC_NAME)
@AsyncListener(
    operation = @AsyncOperation(
        channelName = TOPIC_NAME,
        description = "More details for the incoming topic"
    )
)
@KafkaAsyncOperationBinding
public void consume(IncomingPayloadDto payload) {
    // ...
}
```

此外，我们**添加@ _KafkaAsyncOperationBinding_注释**以将通用_@AsyncOperation_注释与_servers_部分中的Kafka代理连接。Kafka协议特定的信息也使用此注释设置。

更改后，AsyncAPI文档包含了更新的文档。

## **5. 记录生产者**

通过使用Springwolf _@AsyncPublisher_注释，手动记录生产者。

### **5.1. 通过_@AsyncPublisher_注释手动记录生产者**

类似于_@AsyncListener_注释，我们**添加_@AsyncPublisher_注释**到发布者方法，并**也添加_@KafkaAsyncOperationBinding_注释**：

```java
@AsyncPublisher(
    operation = @AsyncOperation(
        channelName = TOPIC_NAME,
        description = "More details for the outgoing topic"
    )
)
@KafkaAsyncOperationBinding
public void publish(OutgoingPayloadDto payload) {
    kafkaTemplate.send(TOPIC_NAME, payload);
}
```

基于此，Springwolf为_TOPIC_NAME_通道添加了一个_channels_部分的_subscribe_操作，使用上述提供的信息。**_有效载荷类型_从方法签名中提取**，与_@AsyncListener_中的方式相同。

## **6. 增强文档**

AsyncAPI规范涵盖了比我们上面提到的更多的特性。接下来，我们记录默认的Spring Kafka头_\\_\\_TypeId\\_\\__并改进有效载荷的文档。

当运行原生的Spring Kafka应用程序时，Spring Kafka自动添加头_\\_\\system:翻译继续

TypeId\_\_以协助消费者中有效载荷的反序列化。

我们通过在_@AsyncOperation_的_@AsyncListener_（或_@AsyncPublisher_）注释上设置_headers_字段来**将_\_\_TypeId\_\_头添加到文档中**：

```java
@AsyncListener(
    operation = @AsyncOperation(
        ...,
        headers = @AsyncOperation.Headers(
            schemaName = "SpringKafkaDefaultHeadersIncomingPayloadDto",
            values = {
                // 这个头是由Spring默认生成的
                @AsyncOperation.Headers.Header(
                    name = DEFAULT_CLASSID_FIELD_NAME,
                    description = "Spring 类型 ID 头",
                    value = "com.baeldung.boot.documentation.springwolf.dto.IncomingPayloadDto"
                ),
            }
        )
    )
)
```

现在，AsyncAPI文档包含了作为_message_对象一部分的新字段_headers_。

### **6.2. 添加有效载荷详细信息**

我们**使用Swagger _@Schema_注释**来提供有关有效载荷的额外信息。在以下代码片段中，我们设置了_description_、一个_example_值，以及字段是否是_required_：

```java
@Schema(description = "出站有效载荷模型")
public class OutgoingPayloadDto {
    @Schema(description = "Foo 字段", example = "bar", requiredMode = NOT_REQUIRED)
    private String foo;

    @Schema(description = "IncomingPayload 字段", requiredMode = REQUIRED)
    private IncomingPayloadDto incomingWrapped;
}
```

基于此，我们在AsyncAPI文档中看到了丰富的_OutgoingPayloadDto_模式：

```json
"OutgoingPayloadDto": {
    "type": "object",
    "description": "出站有效载荷模型",
    "properties": {
        "incomingWrapped": {
            "$ref": "#/components/schemas/IncomingPayloadDto"
        },
        "foo": {
            "type": "string",
            "description": "Foo 字段",
            "example": "bar"
        }
    },
    "required": [
        "incomingWrapped"
    ],
    "example": {
        "incomingWrapped": {
            "someEnum": "FOO2",
            "someLong": 5,
            "someString": "some string value"
        },
        "foo": "bar"
    }
}
```

我们应用程序的完整AsyncAPI文档可在链接的示例项目中找到。

Springwolf有自己的UI，尽管可以使用任何符合AsyncAPI的文档渲染器。

### **7.1. 添加_springwolf-ui_依赖项**

要使用_springwolf-ui_，我们将依赖项添加到我们的_pom.xml_中，重新构建并重新启动应用程序：

```xml
``<dependency>``
    ``<groupId>``io.github.springwolf``</groupId>``
    ``<artifactId>``springwolf-ui``</artifactId>``
    ``<version>``0.8.0``</version>``
``</dependency>``
```

### **7.2. 查看AsyncAPI文档**

现在，我们通过访问_http://localhost:8080/springwolf/asyncapi-ui.html_在浏览器中打开文档。

网页与AsyncAPI文档的结构类似，并显示有关_application_、_server_、_channels_和_schemas_的信息：

![img](https://www.baeldung.com/wp-content/uploads/2023/07/springwolf-ui.jpg)

### **7.3. 发布消息**

Springwolf允许我们直接从浏览器发布消息。展开一个_channel_后，点击_Publish_按钮可以直接将消息放到Kafka上。消息绑定（包括Kafka消息键）、头和消息可以根据需要进行调整：

![img](https://www.baeldung.com/wp-content/uploads/2023/07/springwolf-ui-publish-1.jpg)

由于安全问题，此功能默认情况下是禁用的。要启用发布，我们将以下行添加到我们的_application.properties_文件中：

```properties
springwolf.plugin.kafka.publishing.enabled=true
```

## **8. 结论**

在本文中，我们在现有的Spring Boot Kafka应用程序中设置了Springwolf。

使用消费者自动检测，自动生成了符合AsyncAPI的文档。我们通过手动配置进一步增强了文档。

除了通过提供的REST端点下载AsyncAPI文档外，我们还使用_springwolf-ui_在浏览器中查看文档。

如往常一样，示例的源代码可在GitHub上找到。

![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)

OK