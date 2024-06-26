---
date: 2024-06-26
category:
  - Spring Kafka
  - Trusted Packages
tag:
  - Alpaquita Linux
  - Java apps
  - Kafka message headers
head:
  - - meta
    - name: keywords
      content: Spring Kafka, Trusted Packages, Alpaquita Linux, Java apps, Kafka message headers
---
# Spring Kafka可信包特性 | Baeldung

寻找理想的Linux发行版，用于在云中运行现代Spring应用程序？

**遇见Alpaquita Linux**：轻量级、安全且功能强大，足以处理重负荷工作负载。

这个发行版是**专门为运行Java应用程序而设计的**。它基于Alpine，具有显著的增强功能，在高密度容器环境中表现出色，同时满足企业级安全标准。

具体来说，容器镜像大小比标准选项小约**30%**，并且消耗的RAM少至**30%**：

**>> 立即尝试Alpaquita容器。**

### 1. 引言

在本教程中，我们将回顾Spring Kafka可信包特性。我们将看到它背后的动机以及它的用法。像往常一样，都有实际的例子。

### 2. 先决条件

通常，Spring Kafka模块允许我们作为用户指定一些关于我们发送的POJO的元数据。它通常以Kafka消息头的形式出现。例如，如果我们这样配置_ProducerFactory_：

```java
@Bean
public ProducerFactory`<Object, SomeData>` producerFactory() {
    JsonSerializer```<SomeData>``` jsonSerializer = new JsonSerializer<>();
    jsonSerializer.setAddTypeInfo(true);
    return new DefaultKafkaProducerFactory<>(
      producerFactoryConfig(),
      new StringOrBytesSerializer(),
      jsonSerializer
    );
}

@Data
@AllArgsConstructor
static class SomeData {
    private String id;
    private String type;
    private String status;
    private Instant timestamp;
}
```

然后我们将使用上述配置的_kafkaTemplate_将新消息发送到一个主题：

```java
public void sendDataIntoKafka() {
    SomeData someData = new SomeData("1", "active", "sent", Instant.now());
    kafkaTemplate.send(new ProducerRecord<>("sourceTopic", null, someData));
}
```

在这种情况下，我们将在Kafka消费者的控制台中看到以下消息：

```
CreateTime:1701021806470 __TypeId__:com.baeldung.example.SomeData null {"id":"1","type":"active","status":"sent","timestamp":1701021806.153965150}
```

正如我们所看到的，消息中POJO的类型信息在头文件中。这当然是Spring Kafka特性，Spring只识别。这意味着，从Kafka或其他框架的角度来看，这些头文件只是元数据。因此，我们可以假设这里的消费者和生产者都使用Spring来处理Kafka消息。

话虽如此，我们可以说，在某些情况下，这是一个相当有用的特性。当主题中的消息具有不同的负载架构时，为消费者提供负载类型的提示将是很好的。

然而，通常我们知道主题中可能出现的消息类型及其架构。因此，限制消费者将接受的可能的负载架构可能是一个好主意。这就是Spring Kafka可信包特性的用途。

### 4. 使用示例

可信包Spring Kafka特性在反序列化器级别上配置。如果配置了可信包，那么Spring将查找传入消息的类型头文件。然后，它将检查消息中提供的所有类型（键和值）是否受信任。

这基本上意味着键和值的Java类，指定在相应的头文件中，必须位于可信包内。如果一切正常，那么Spring将消息传递给进一步的反序列化。如果头文件不存在，那么Spring只会反序列化对象，而不会检查可信包：

```java
@Bean
public ConsumerFactory`<String, SomeData>` someDataConsumerFactory() {
    JsonDeserializer```<SomeData>``` payloadJsonDeserializer = new JsonDeserializer<>();
    payloadJsonDeserializer.addTrustedPackages("com.baeldung.example");
    return new DefaultKafkaConsumerFactory<>(
      consumerConfigs(),
      new StringDeserializer(),
      payloadJsonDeserializer
    );
}
```

还值得一提的是，如果用星号(*)替换具体包，Spring可以信任所有包：

```java
JsonDeserializer```<SomeData>``` payloadJsonDeserializer = new JsonDeserializer<>();
payloadJsonDeserializer.trustedPackages("*");
```

然而，在这种情况下，使用可信包不会做任何事情，只会增加额外的开销。现在让我们跳到我们刚刚看到的特性背后的动机。

### 5.1. 第一个动机：一致性

这个特性很棒，有两个主要原因。首先，如果集群中出现问题，我们可以快速失败。想象一下，如果一个特定的生产者不小心在主题中发布了他不应该发布的消息。这可能会引起很多问题，特别是如果我们成功地反序列化了传入的消息。在这种情况下，整个系统的行为可能是未定义的。

因此，如果生产者发布包含类型信息的消息，并且消费者知道它信任哪些类型，那么所有这些都可以避免。当然，这假设生产者的消息类型与消费者期望的不同。但这个假设相当合理，因为生产者根本不应该在这个主题中发布消息。

### 5.2. 第二个动机：安全

但最重要的是安全问题。在我们之前的例子中，我们强调生产者无意中在主题中发布了消息。**但那也可能是故意的攻击**。恶意生产者可能会故意在特定主题中发布消息，以利用反序列化漏洞。因此，通过防止不需要的消息的反序列化，Spring提供了额外的安全措施来降低安全风险。

**真正重要的是要理解，可信包特性不是“头文件伪造”攻击的解决方案**。在这种情况下，攻击者操纵消息的头文件，欺骗收件人相信消息是合的，并且来自可信来源。因此，通过提供正确的类型头文件，攻击者可能会欺骗Spring，后者将继续消息反序列化。但这个问题相当复杂，不是讨论的主题。总的来说，Spring只是提供了一个额外的安全措施，以最小化黑客成功的风险。

### 6. 结论

在本文中，我们探讨了Spring Kafka可信包特性。这个特性为我们的分布式消息系统提供了额外的一致性和安全性。然而，至关重要的是要记住，可信包仍然容易受到头文件伪造攻击的威胁。尽管如此，Spring Kafka在提供额外的安全措施方面做得非常出色。

像往常一样，本文的源代码可以在GitHub上找到。