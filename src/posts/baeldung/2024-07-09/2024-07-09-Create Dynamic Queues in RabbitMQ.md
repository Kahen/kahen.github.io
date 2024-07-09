---
date: 2022-04-01
category:
  - RabbitMQ
  - Java
tag:
  - 消息队列
  - 动态队列
head:
  - - meta
    - name: keywords
      content: RabbitMQ, Java, 动态队列, 消息队列
---
# 在RabbitMQ中创建动态队列

RabbitMQ是一个消息代理，它提供了不同组件之间的异步通信。它提供了AMQP（高级消息队列协议）的实现，这是最受欢迎的消息协议。

在本教程中，我们将探讨如何使用Java客户端库在RabbitMQ中动态创建队列。

## 2. RabbitMQ消息模型

在我们开始之前，让我们快速回顾一下RabbitMQ消息的工作方式。

我们首先需要理解AMQP的构建块，也称为AMQP实体。交换器、队列和绑定统称为AMQP实体。

在RabbitMQ中，消息生产者永远不会直接向队列发送消息。相反，它使用一个_交换器_作为路由中介。消息生产者将消息发布到_交换器_。然后，交换器根据称为_绑定_的路由规则将这些消息路由到不同的_队列_。代理随后将消息传递给订阅队列的消费者，或者消费者按需从队列中拉取/获取消息。消息传递给消费者基于FIFO模型。

## 3. 连接初始化

RabbitMQ为所有主要编程语言提供了客户端库。使用Java，客户端与RabbitMQ代理通信的标准方式是使用RabbitMQ的_amqp-client_ Java库。让我们将这个库的Maven依赖项添加到我们项目的_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`com.rabbitmq`</groupId>`
    `<artifactId>`amqp-client`</artifactId>`
    `<version>`5.16.0`</version>`
`</dependency>`
```

**为了使客户端能够与RabbitMQ代理交互，我们首先需要建立一个_连接_**。一旦我们建立了连接，我们就可以从现有的_连接_创建一个_通道_。**AMQP通道基本上是轻量级的连接，它们共享单个TCP连接**。一个通道帮助我们在单个TCP连接上多路复用多个逻辑连接。

Java RabbitMQ客户端库使用工厂模式来创建新的连接。

首先，让我们创建一个新的_ConnectionFactory_实例。接下来，我们将设置创建连接所需的所有参数。至少，这需要通知RabbitMQ主机的地址：

```
ConnectionFactory factory = new ConnectionFactory();
factory.setHost("amqp.baeldung.com");
```

其次，我们将使用我们创建的_ConnectionFactory_实例中的_newConnection()_工厂方法来获取一个新的_连接_实例：

```
Connection connection = factory.newConnection();
```

最后，让我们使用现有_连接_的_createChannel()_方法创建一个新的_通道_：

```
Channel channel = connection.createChannel();
```

我们成功地与RabbitMQ代理建立了连接并创建了一个_通道_。我们现在可以使用创建的_通道_向RabbitMQ服务器发送命令。

此外，我们还可以为通道设置不同的策略，使用单个或多个连接。

## 4. 创建动态队列

Java RabbitMQ客户端库提供了各种易于使用的方法来创建和管理队列。让我们看看一些重要方法：

### 4.1. 创建队列

**要动态创建一个队列，我们使用我们之前创建的_Channel_实例中的_queueDeclare(String queue, boolean durable, boolean exclusive, boolean autoDelete, Map`<String, Object>` arguments)_方法**。如果队列尚不存在，则此方法会创建一个队列。该方法接受以下参数：

- _queue_ – 要创建的队列的名称
- _durable_ – 布尔标志，表示要创建的队列是否应该是持久的（即，队列将在服务器重启后继续存在）
- _exclusive_ – 布尔标志，表示要创建的队列是否应该是独占的（即，仅限于此连接）
- _autoDelete_ – 布尔标志，表示要创建的队列是否应该是自动删除的（即，当不再使用时，服务器将删除它）
- _arguments_ – 队列的其他属性

让我们看看创建队列的Java代码：

```
AMQP.Queue.DeclareOk declareOk = channel.queueDeclare("baeldung-queue", true, false, false, null);
```

上述代码片段创建了一个名为_‘baeldung-queue’_的队列。成功创建队列后，该方法将返回一个_AMQP.Queue.DeclareOk_实例。如果创建队列时出现任何错误，该方法将抛出一个_IOException_。

进一步，我们将使用返回的_AMQP.Queue.DeclareOk_实例来获取有关队列的信息——例如队列名称、队列的消费者数量以及队列中包含的消息数量。让我们看看从_DeclareOk_实例中获取队列名称的代码片段：

```
String queueName = declareOk.getQueue();
```

上述片段将返回创建的队列的名称。类似地，我们可以获取队列的消息计数和消费者计数：

```
int messageCount = declareOk.getMessageCount();
int consumerCount = declareOk.getConsumerCount();
```

我们已经看到了如何使用RabbitMQ Java客户端库动态创建队列。接下来，让我们看看如何检查队列是否存在。

### 4.2. 检查队列是否存在

RabbitMQ Java客户端库还提供了一种方法来检查队列是否存在。**我们将使用_queueDeclarePassive(String queue)_方法来检查队列是否存在**。如果队列存在，该方法将返回一个_AMQP.Queue.DeclareOk_实例作为确认。如果队列不存在，或者队列是独占的，或者有其他任何错误，该方法将抛出一个_IOException_。

让我们看看检查队列是否已经存在的Java代码：

```
AMQP.Queue.DeclareOk declareOk = channel.queueDeclarePassive("baeldung-queue");
```

该代码片段检查队列_“baeldung-queue”_是否存在。

最后，我们关闭通道和连接：

```
channel.close();
connection.close();
```

我们还可以使用_try-with-resources_来初始化通道和连接对象，以便它们自动关闭。

## 5. 结论

在本文中，我们首先了解了如何与RabbitMQ服务器建立连接并打开通信通道。

然后，我们使用RabbitMQ Java客户端库演示了如何动态创建队列并检查其存在。

如常，所有示例的完整代码可在GitHub上找到。