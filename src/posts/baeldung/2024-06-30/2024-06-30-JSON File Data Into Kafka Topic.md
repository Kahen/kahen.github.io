---
date: 2022-04-01
category:
  - Java
  - Kafka
tag:
  - JSON
  - Kafka
  - Streaming
head:
  - - meta
    - name: keywords
      content: Java, JSON, Kafka, Streaming, Data Processing
---
# Kafka主题中传输JSON文件数据

Apache Kafka是一个开源的、容错性强、高度可扩展的流处理平台。它遵循发布-订阅架构来实时流式传输数据。我们可以通过将数据放入队列中，以非常低的延迟处理大量数据。有时，我们需要将JSON类型的数据发送到Kafka主题进行数据处理和分析。

在本教程中，我们将学习如何将JSON数据流式传输到Kafka主题。此外，我们还将了解如何为JSON数据配置Kafka生产者和消费者。

### 2. Kafka中JSON数据的重要性

从架构上讲，Kafka支持系统中的消息流。因此，我们也可以向Kafka服务器发送JSON数据。**如今，在现代应用系统中，每个应用程序主要处理JSON数据，因此以JSON格式进行通信变得非常重要。** 通过以JSON格式发送数据，有助于实时跟踪用户及其在网站和应用程序上的行为。

将JSON类型的数据流式传输到Kafka服务器有助于实时数据分析。它促进了事件驱动的架构，每个微服务订阅其相关主题，并实时提供更改。使用Kafka主题和JSON格式，可以轻松地传输IOT数据，实现微服务之间的通信，并聚合指标。

### 3. Kafka设置

要将JSON流式传输到Kafka服务器，我们首先需要设置Kafka代理和Zookeeper。我们可以按照本教程设置完整的Kafka服务器。现在，让我们检查创建Kafka主题_baeldung_的命令，我们将在该主题上生产和消费JSON数据：

```shell
$ docker-compose exec kafka kafka-topics.sh --create --topic baeldung
  --partitions 1 --replication-factor 1 --bootstrap-server kafka:9092
```

上面的命令创建了一个具有1个副本因子的Kafka主题_baeldung_。这里，我们创建了一个只有1个副本因子的Kafka主题，因为它仅用于演示目的。在真实情况下，我们可能需要多副本因子**，因为它有助于系统故障转移情况。此外，它提供了数据的高可用性和可靠性。**

### 4. 生产数据

Kafka生产者是整个Kafka生态系统中最基本的组件，它提供了向Kafka服务器生产数据的功能。为了演示，让我们看看使用_docker-compose_命令启动生产者的命令：

```shell
$ docker-compose exec kafka kafka-console-producer.sh --topic baeldung
  --broker-list kafka:9092
```

在上面的命令中，我们创建了一个Kafka生产者，向Kafka代理发送消息。此外，要发送JSON数据类型，我们需要调整命令。在继续之前，让我们首先创建一个示例JSON文件_sampledata.json_：

```json
{
    "name": "test",
    "age": 26,
    "email": "test@baeldung.com",
    "city": "Bucharest",
    "occupation": "Software Engineer",
    "company": "Baeldung Inc.",
    "interests": ["programming", "hiking", "reading"]
}
```

上述_sampledata.json_文件以JSON格式包含用户基本信息。要将JSON数据发送到Kafka主题，我们需要_jq_库，因为它在处理JSON数据方面非常强大。为了演示，让我们安装_jq_库，将此JSON数据传递给Kafka生产者：

```shell
$ sudo apt-get install jq
```

上面的命令简单地在Linux机器上安装了_jq_库。此外，让我们看看发送JSON数据的命令：

```shell
$ jq -rc . sampledata.json | docker-compose exec -T kafka kafka-console-producer.sh --topic baeldung --broker-list kafka:9092
```

上述命令是一行命令，用于在Docker环境中处理并将JSON数据流式传输到Kafka主题。首先，_jq_命令处理_sampledata.json_，然后使用-r_选项，确保JSON数据以行格式且不带引号。之后，-c_选项确保数据以单行显示，以便数据可以轻松地流式传输到相应的Kafka主题。

### 5. 消费数据

到目前为止，我们已经成功地将JSON数据发送到_baeldung_ Kafka主题。现在，让我们看看消费这些数据的命令：

```shell
$ docker-compose exec kafka kafka-console-consumer.sh --topic baeldung  --from-beginning --bootstrap-server kafka:9092
{"name":"test","age":26,"email":"test@baeldung.com","city":"Bucharest","occupation":"Software Engineer","company":"Baeldung Inc.","interests":["programming","hiking","reading"]}
```

上面的命令从开始消费所有发送到_baeldung_主题的数据。在前一节中，我们发送了JSON数据。因此，它也消费了该JSON数据。简而言之，上述命令允许用户积极监控发送到_baeldung_主题的所有消息。它使用基于Kafka的消息系统促进实时数据消费。

### 6. 结论

在本文中，我们探讨了如何将JSON数据流式传输到Kafka主题。首先，我们创建了一个示例JSON，然后我们使用生产者将该JSON流式传输到Kafka主题。之后，我们使用_docker-compose_命令消费了这些数据。

**简言之，我们涵盖了使用Kafka生产者和消费者将JSON格式数据发送到主题的所有必要步骤。此外，由于JSON可以处理优雅更新而不影响现有数据，因此它提供了模式演化。**