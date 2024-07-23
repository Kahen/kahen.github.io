---
date: 2022-04-01
category:
  - Spring Boot
  - Kafka Streams
tag:
  - Spring Boot
  - Kafka
  - Streams
head:
  - - meta
    - name: keywords
      content: Spring Boot, Kafka Streams, Event Stream Processing
---

# Kafka Streams 与 Spring Boot | Baeldung

在本文中，我们将了解如何使用 Spring Boot 设置 Kafka Streams。Kafka Streams 是建立在 Apache Kafka 之上的客户端库。它以声明式的方式使我们可以处理无限的事件流。

一些流数据的真实生活例子可能是传感器数据、股票市场事件流和系统日志。对于本教程，我们将构建一个简单的单词计数流应用程序。让我们首先了解 Kafka Streams 的概览，然后设置示例及其在 Spring Boot 中的测试。

## 2. 概览

Kafka Streams 提供了 Kafka 主题和关系数据库表之间的二元性。它使我们能够对一个或多个流事件执行诸如联接、分组、聚合和过滤等操作。

Kafka Streams 的一个重要概念是处理器拓扑。**处理器拓扑是 Kafka 流操作在一个或多个事件流上的蓝图**。本质上，处理器拓扑可以被看作是有向无环图。在这图中，节点被分类为源、处理器和接收器节点，而边缘代表流事件的流动。

拓扑顶部的源从 Kafka 接收流数据，将其传递到处理器节点进行自定义操作，并通过接收器节点流向一个新的 Kafka 主题。除了核心处理外，流的状态还使用检查点定期保存，以实现容错和弹性。

## 3. 依赖项

我们将通过向我们的 POM 添加 _spring-kafka_ 和 _kafka-streams_ 依赖项来开始：

```
``<dependency>``
    ``<groupId>``org.springframework.kafka``</groupId>``
    ``<artifactId>``spring-kafka``</artifactId>``
    ``<version>``3.1.2``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.apache.kafka``</groupId>``
    ``<artifactId>``kafka-streams``</artifactId>``
    ``<version>``3.6.1``</version>``
``</dependency>``
```

## 4. 示例

我们的示例应用程序从输入 Kafka 主题读取流事件。一旦记录被读取，它就处理它们来分割文本并计算个别单词。随后，它将更新的单词计数发送到 Kafka 输出。除了输出主题外，我们还将创建一个简单的 REST 服务，通过 HTTP 端点公开此计数。

总体而言，输出主题将不断更新，包含从输入事件中提取的单词及其更新的计数。

### 4.1. 配置

首先，让我们在 Java 配置类中定义 Kafka 流配置：

```java
@Configuration
@EnableKafka
@EnableKafkaStreams
public class KafkaConfig {
    // ...
}
```

在这里，我们使用了 _@EnableKafkaStreams_ 注解来自动配置所需的组件。这个自动配置需要一个名为 _DEFAULT_STREAMS_CONFIG_BEAN_NAME_ 的 _KafkaStreamsConfiguration_ bean。因此，**Spring Boot 使用此配置并创建一个 _KafkaStreams_ 客户端来管理我们的应用程序生命周期**。

在我们的示例中，我们提供了应用程序 ID、引导服务器连接详细信息以及我们配置的 SerDes（序列化器/反序列化器）。

### 4.2. 拓扑

现在我们已经设置了配置，让我们构建应用程序的拓扑，以统计输入消息中的单词：

```java
@Component
public class WordCountProcessor {
    // ...
}
```

在这里，我们定义了一个配置方法，并用 _@Autowired_ 注解。Spring 处理这个注解，并将容器中的匹配 bean 连接到 _StreamsBuilder_ 参数。或者，我们也可以在配置类中创建一个 bean 来生成拓扑。

_StreamsBuilder_ 为我们提供了所有 Kafka Streams API 的访问，它就像一个常规的 Kafka Streams 应用程序。在我们的示例中，我们使用这个 **高级 DSL 来定义我们应用程序的转换**：

- 使用指定的键和值 SerDes 从输入主题创建一个 _KStream_。
- 通过转换、分割、分组然后计数来创建一个 _KTable_。
- 将结果物质化到输出流。

本质上，**Spring Boot 在管理我们的 _KStream_ 实例的生命周期的同时，提供了一个非常薄的包装器**。它为我们的拓扑创建和配置所需的组件，并执行我们的流应用程序。重要的是，这让我们专注于我们的核心业务逻辑，而 Spring 管理生命周期。

### 4.3. REST 服务

在用声明性步骤定义了我们的管道之后，让我们创建 REST 控制器。这提供了端点，以便将消息 POST 到输入主题，并获取指定单词的计数。但重要的是，**应用程序从 Kafka Streams 状态存储而不是输出主题检索数据**。

首先，让我们修改之前的 _KTable_ 并将聚合计数物化为本地状态存储。然后可以从 REST 控制器查询：

```java
KTable`<String, Long>` wordCounts = textStream
  // ...
  .count(Materialized.as("counts"));
```

在此之后，我们可以更新我们的控制器，从这个 _counts_ 状态存储中检索计数值：

```java
@GetMapping("/count/{word}")
public Long getWordCount(@PathVariable String word) {
    // ...
}
```

在这里，_factoryBean_ 是 _StreamsBuilderFactoryBean_ 的一个实例，它被连接到控制器中。这提供了由这个工厂 bean 管理的 _KafkaStreams_ 实例。因此，我们可以获取我们之前创建的 _counts_ 键/值状态存储，由 _KTable_ 表示。在这一点上，我们可以使用它从本地状态存储中获取请求单词的当前计数。

## 5. 测试

测试是开发和验证我们应用程序拓扑的关键部分。Spring Kafka 测试库和 Testcontainers 都为我们的应用程序在各个级别上提供了出色的支持。

### 5.1. 单元测试

首先，让我们使用 _TopologyTestDriver_ 为我们的拓扑设置单元测试。这是测试 Kafka Streams 应用程序的主要工具：

```java
@Test
void givenInputMessages_whenProcessed_thenWordCountIsProduced() {
    // ...
}
```

在这里，我们首先需要的是 _Topology_，它封装了我们从 _WordCountProcessor_ 测试的业务逻辑。现在，我们可以使用这个与 _TopologyTestDriver_ 一起为我们的测试创建输入和输出主题。至关重要的是，这 **消除了运行代理的需要，并且仍然可以验证管道行为**。换句话说，它使我们能够快速轻松地验证我们的管道行为，而不需要使用真实的 Kafka 代理。

### 5.2. 集成测试

最后，让我们使用 Testcontainers 框架对我们的应用程序进行端到端测试。这使用运行中的 Kafka 代理，并启动我们的应用程序进行完整测试：

```java
@Testcontainers
@SpringBootTest(classes = KafkaStreamsApplication.class, webEnvironment = WebEnvironment.RANDOM_PORT)
class KafkaStreamsApplicationLiveTest {
    // ...
}
```

在这里，我们向我们的 REST 控制器发送了一个 POST，它反过来将消息发送到 Kafka 输入主题。作为设置的一部分，我们还启动了一个 Kafka 消费者。这个消费者异步监听输出 Kafka 主题，并将接收到的单词计数更新到 _BlockingQueue_。

在测试执行期间，应用程序应该处理输入消息。随后，我们可以验证来自主题的预期输出以及使用 REST 服务的状态存储。

## 6. 结论

在本教程中，我们看到了如何创建一个简单的事件驱动应用程序来使用 Kafka Streams 和 Spring Boot 处理消息。

在简要介绍了核心流概念之后，我们查看了流拓扑的配置和创建。然后，我们看到了如何将其与 Spring Boot 提供的 REST 功能集成。最后，我们涵盖了一些有效测试和验证我们的拓扑和应用程序行为的方法。

如往常一样，完整的源代码可在 GitHub 上获取。