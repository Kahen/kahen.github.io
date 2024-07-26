---
date: 2024-07-26
category:
  - Kafka
  - Docker
tag:
  - Apache Kafka
  - Docker
head:
  - - meta
    - name: keywords
      content: Apache Kafka, Docker, Kafka broker, Kafka connection, event streaming platform
---
# 在Docker中运行的Apache Kafka连接

Apache Kafka是一个非常流行的事件流平台，经常与Docker一起使用。通常，当客户端不在同一个Docker网络或主机上时，人们会遇到与Kafka建立连接的问题。这主要是由于Kafka的公开监听器配置不当造成的。

在本教程中，我们将学习如何配置监听器，以便客户端可以连接到在Docker中运行的Kafka代理。

## 2. 设置Kafka

在我们尝试建立连接之前，我们需要使用Docker运行一个Kafka代理。这是我们的docker-compose.yaml文件的一个片段：

```yaml
version: '2'
services:
  zookeeper:
    container_name: zookeeper
    networks:
      - kafka_network
    ...

  kafka:
    container_name: kafka
    networks:
      - kafka_network
    ports:
      - 29092:29092
    environment:
      KAFKA_LISTENERS: EXTERNAL_SAME_HOST://:29092,INTERNAL://:9092
      KAFKA_ADVERTISED_LISTENERS: INTERNAL://kafka:9092,EXTERNAL_SAME_HOST://localhost:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: INTERNAL:PLAINTEXT,EXTERNAL_SAME_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: INTERNAL
    ...

networks:
  kafka_network:
    name: kafka_docker_example_net
```

在这里，我们定义了两个必须的服务——Kafka和Zookeeper。我们还定义了一个自定义网络——_kafka_docker_example_net_，我们的服务将使用它。

我们将在后面更详细地查看_KAFKA_LISTENERS_、_KAFKA_ADVERTISED_LISTENERS_和_KAFKA_LISTENER_SECURITY_PROTOCOL_MAP_属性。

使用上述_docker-compose.yaml_文件，我们启动服务：

```bash
docker-compose up -d
Creating network "kafka_docker_example_net" with the default driver
Creating zookeeper ... done
Creating kafka ... done
```

我们还将在测试Kafka代理的连接时使用Kafka控制台生产者实用程序作为示例客户端。如果要在不使用Docker的情况下使用Kafka-console-producer脚本，我们需要下载Kafka。

## 3. 监听器

监听器、公开监听器和监听器协议在连接Kafka代理时起着相当大的作用。

我们使用_KAFKA_LISTENERS_属性来管理监听器，在这里我们声明了一个由URI组成的逗号分隔列表，这些URI指定了代理应该监听传入TCP连接的套接字。

每个URI由协议名称、接口地址和端口组成：

```plaintext
EXTERNAL_SAME_HOST://0.0.0.0:29092,INTERNAL://0.0.0.0:9092
```

在这里，我们指定了一个_0.0.0.0_元地址，将套接字绑定到所有接口。此外，_EXTERNAL_SAME_HOST_和_INTERNAL_是我们在URI格式中定义监听器时需要指定的自定义监听器名称。

### 3.2. 引导启动

对于初始连接，Kafka客户端需要一个引导服务器列表，其中我们指定了代理的地址。列表应该至少包含一个到集群中任意代理的有效地址。

客户端将使用该地址连接到代理。如果连接成功，代理将返回有关集群的元数据，包括集群中所有代理的公开监听器列表。对于后续连接，客户端将使用该列表到达代理。

### 3.3. 公开监听器

仅仅声明监听器是不够的，因为它只是代理的套接字配置。我们需要一种方法来告诉客户端（消费者和生产者）如何连接到Kafka。

这就是公开监听器的作用，它通过_KAFKA_ADVERTISED_LISTENERS_属性来实现。它的格式与监听器的属性类似：

**`<listener protocol>`://`<advertised host name>`:`<advertised port>`**

客户端在初始引导启动过程之后使用指定为公开监听器的地址。

### 3.4. 监听器安全协议映射

除了监听器和公开监听器，我们需要告诉客户端在连接到Kafka时使用的安全协议。在_KAFKA_LISTENER_SECURITY_PROTOCOL_MAP_中，我们将自定义协议名称映射到有效的安全协议。

在前一节中的配置中，我们声明了两个自定义协议名称——_INTERNAL_和_EXTERNAL_SAME_HOST_。我们可以按我们想要的方式命名它们，但我们需要将它们映射到有效的安全协议。

我们指定的一种安全协议是_PLAINTEXT_，这意味着客户端不需要与Kafka代理进行身份验证。此外，交换的数据不是加密的。

## 4. 来自同一Docker网络的客户端连接

让我们从另一个容器启动Kafka控制台生产者，并尝试向代理生产消息：

```bash
docker run -it --rm --network kafka_docker_example_net confluentinc/cp-kafka /bin/kafka-console-producer --bootstrap-server kafka:9092 --topic test_topic
>hello
>world
```

在这里，我们将此容器附加到现有的_kafka_docker_example_net_网络，以便自由地与我们的代理通信。我们还指定了代理的地址——_kafka:9092_和主题的名称，该主题将自动创建。

我们能够向主题生产消息，这意味着代理的连接成功。

## 5. 来自同一主机的客户端连接

当客户端没有容器化时，让我们从主机机器连接到代理。对于外部连接，我们公开了_EXTERNAL_SAME_HOST_监听器，我们可以使用它来建立从主机的连接。从公开监听器属性中，我们知道我们必须使用_localhost:29092_地址来到达Kafka代理。

为了测试从同一主机的连接性，我们将使用一个非Docker化的Kafka控制台生产者：

```bash
kafka-console-producer --bootstrap-server localhost:29092 --topic test_topic_2
>hi
>there
```

由于我们能够生产主题，这意味着初始引导和随后的连接（客户端使用公开监听器）到代理都是成功的。

我们之前在_docker-compose.yaml_中配置的29092端口号使Kafka代理可以在Docker外部到达。

## 6. 来自不同主机的客户端连接

如果Kafka代理在不同的主机机器上运行，我们如何连接到它呢？不幸的是，我们不能重用现有的监听器，因为它们仅用于同一Docker网络或主机连接。所以我们需要定义一个新的监听器并公开它：

```plaintext
KAFKA_LISTENERS: EXTERNAL_SAME_HOST://:29092,EXTERNAL_DIFFERENT_HOST://:29093,INTERNAL://:9092
KAFKA_ADVERTISED_LISTENERS: INTERNAL://kafka:9092,EXTERNAL_SAME_HOST://localhost:29092,EXTERNAL_DIFFERENT_HOST://157.245.80.232:29093
KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: INTERNAL:PLAINTEXT,EXTERNAL_SAME_HOST:PLAINTEXT,EXTERNAL_DIFFERENT_HOST:PLAINTEXT
```

我们创建了一个名为_EXTERNAL_DIFFERENT_HOST_的新监听器，安全协议为_PLAINTEXT_，与29093端口相关联。在_KAFKA_ADVERTISED_LISTENERS_中，我们还添加了Kafka运行的云机器的IP地址。

我们必须记住，我们不能使用_localhost_，因为我们正在从不同的机器（这种情况下是本地工作站）连接。另外，29093端口在端口部分发布，以便它可以在Docker外部到达。

让我们尝试生产一些消息：

```bash
kafka-console-producer --bootstrap-server 157.245.80.232:29093 --topic test_topic_3
>hello
>REMOTE SERVER
```

我们可以看到，我们能够成功连接到Kafka代理并生产消息。

## 7. 结论

在本文中，我们学习了如何配置监听器，以便客户端可以连接到在Docker中运行的Kafka代理。我们查看了客户端在同一个Docker网络、同一主机、不同主机等不同场景下的连接情况。我们看到，监听器、公开监听器和安全协议映射的配置决定了连接性。