---
date: 2023-08-01
category:
  - Java
  - Kafka
tag:
  - bootstrap.servers
  - Kafka configuration
head:
  - - meta
    - name: keywords
      content: Kafka, bootstrap.servers, configuration, Java, scalability, high availability
---
# Kafka配置中的bootstrap服务器

在实现Kafka生产者或消费者时（例如，使用Spring），我们需要配置的一个属性是“bootstrap.servers”。

## 1. 概述

本文将介绍这个设置的含义及其用途。

## 2. Kafka拓扑结构

Kafka的拓扑结构设计用于可扩展性和高可用性。这就是为什么有一个服务器集群（代理）处理代理之间复制的主题分区。每个分区有一个代理作为领导者，其他代理作为跟随者。

生产者将消息发送到分区领导者，然后该领导者将记录传播到每个副本。消费者通常也连接到分区领导者，因为消费消息是状态变化的（消费者偏移量）。

副本的数量是复制因子。推荐值为3，因为它在性能和容错性之间提供了正确的平衡，并且云服务提供商通常提供三个数据中心（可用区）作为区域的一部分进行部署。

例如，下图显示了一个由四个代理组成的集群，提供了一个具有两个分区和复制因子为3的主题：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/kafka-topology-1024x549-1-300x161.png)

当一个分区领导者崩溃时，Kafka会选择另一个代理作为新的分区领导者。然后，消费者和生产者（“客户端”）也必须切换到新的领导者。因此，在Broker 1崩溃的情况下，场景可能会变成这样：

![img](https://www.baeldung.com/wp-content/uploads/2023/08/kafka-topology-failure-1024x581-1-300x170.png)

## 3. Bootstrapping

正如我们所看到的，整个集群是动态的，客户端需要了解拓扑的当前状态，以便连接到正确的分区领导者以发送和接收消息。这就是bootstrapping发挥作用的地方。

“bootstrap-servers”配置是一系列“hostname:port”对的列表，这些地址指向一个或多个（甚至全部）代理。客户端使用这个列表执行以下步骤：

- 从列表中选择第一个代理
- 向代理发送请求，获取包含有关主题、分区和每个分区的领导者代理信息的集群元数据（每个代理都可以提供此元数据）
- 连接到所选主题的分区的领导者代理

当然，在列表中指定多个代理是有意义的，因为如果第一个代理不可用，客户端可以选择第二个代理进行bootstrapping。

Kafka使用Kraft（来自早期的Zookeeper）来管理所有这类编排。

## 4. 示例

假设我们在开发环境中使用一个简单的Docker镜像，其中包含Kafka和Kraft（如bashj79/kafka-kraft）。我们可以使用以下命令安装此Docker镜像：

```
docker run -p 9092:9092 -d bashj79/kafka-kraft
```

这在容器内和主机上运行一个在9092端口上可用的单个Kafka实例。

### 4.1. 使用Kafka CLI

连接到Kafka的一种可能性是使用Kafka安装中提供的Kafka CLI。首先，让我们创建一个名为samples的主题。在容器的Bash中，我们可以运行此命令：

```
$ cd /opt/kafka/bin
$ sh kafka-topics.sh --bootstrap-server localhost:9092 --create --topic samples --partitions 1 --replication-factor 1
```

如果我们想开始消费主题，我们需要再次指定bootstrap服务器：

```
$ sh kafka-console-consumer.sh --bootstrap-server localhost:9092,another-host.com:29092 --topic samples
```

我们还可以通过_kafka-metadata-shell_脚本以虚拟文件系统的形式探索集群元数据。我们使用以下命令连接到元数据：

```
$ sh kafka-metadata-shell.sh --snapshot /tmp/kraft-combined-logs/__cluster_metadata-0/00000000000000000167.log
```

![img](https://www.baeldung.com/wp-content/uploads/2023/08/2023_07_31_06_39_45_naughty_newton_Container_Docker_Desktop-300x102.png)

### 4.2. 使用Java

在Java应用程序中，我们可以使用Kafka客户端：

```
static Consumer``<Long, String>`` createConsumer() {
    final Properties props = new Properties();
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
        "localhost:9092,another-host.com:29092");
    props.put(ConsumerConfig.GROUP_ID_CONFIG,
        "MySampleConsumer");
    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
        LongDeserializer.class.getName());
    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
        StringDeserializer.class.getName());
    // 使用props创建消费者。
    final Consumer``<Long, String>`` consumer = new KafkaConsumer<>(props);
    // 订阅主题。
    consumer.subscribe(Arrays.asList("samples"));
    return consumer;
}
```

**使用Spring Boot和Spring的Kafka集成，我们可以简单地配置_application.properties_：**

```
spring.kafka.bootstrap-servers=localhost:9092,another-host.com:29092
```

## 5. 结论

在本文中，我们了解到Kafka是一个由多个代理组成的分布式系统，这些代理复制主题分区以确保高可用性、可扩展性和容错性。

客户端需要从一个代理中检索元数据以找到当前的分区领导者进行连接。这个代理随后就是一个bootstrap服务器，我们通常提供一个bootstrap服务器列表，以便在主代理无法访问时给客户端提供替代方案。

如常，所有的代码实现都可以在GitHub上找到。