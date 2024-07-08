---
date: 2023-03-16
category:
  - Java
  - QuestDB
tag:
  - Java
  - QuestDB
  - 数据库
head:
  - - meta
    - name: keywords
      content: QuestDB, Java, 时间序列数据库, SQL, 数据库
---

# QuestDB简介

1. 概览

在本教程中，我们将简要介绍QuestDB，这是一个面向时间序列和事件数据的关系型列式数据库。然后，我们将学习如何从Java应用程序向数据库发送数据。

2. 什么是QuestDB？

**QuestDB是一个快速的开源时间序列数据库，具有高性能的数据摄取和SQL分析能力**。简而言之，QuestDB解决了管理基于时间的高吞吐量数据时的困难，并通过简单的SQL查询使分析摄取的数据变得容易。

它与InfluxDB行协议、PostgreSQL线协议和HTTP REST API兼容。此外，它还有一个美观的Web控制台应用程序，我们可以直接与数据库交互。然而，我们将只关注InfluxDB行协议，这是一个包含每个数据点的测量、标签、字段和时间戳的文本格式。在这种情况下，我们将使用一个易于使用的Java客户端库来发送数据，并抽象出这些细节。

QuestDB的一些优势包括：

- 它易于使用并提供高性能
- 它使用关系模型来处理时间序列数据
- 数据摄取非常可扩展
- 提供即时一致性

接下来，我们将使用Docker容器创建一个本地数据库实例。或者，我们可以支付完全托管的云实例，无需维护。

3. 安装

让我们从使用Docker安装的容器化版本开始：

```shell
$ docker run -p 9000:9000 \
  -p 9009:9009 \
  -p 8812:8812 \
  -p 9003:9003 \
  -v "$(pwd):/var/lib/questdb" \
  -d --name questdb questdb/questdb:7.0.0
```

这将在我们机器上创建一个QuestDB的本地实例。要检查它是否启动，我们可以访问端口9000上暴露的Web应用程序：

![img](https://www.baeldung.com/wp-content/uploads/2023/03/Screenshot-2023-02-26-at-17.31.14.png)

QuestDB Web应用程序的用户界面

或者，QuestDB还在9003端口上暴露了一个端点，我们可以使用它来检查数据库的健康状况。

4. 在Java项目中使用QuestDB

### 4.1. 连接到数据库

首先，我们需要从应用程序与数据库进行通信。为此，QuestDB提供了几种连接方法，这些方法在以下端口上公开：

- InfluxDB Line Protocol: 端口9009
- PostgreSQL Wire Protocol: 端口8812
- HTTP REST API: 端口9000
- Web Console: 端口9000

例如，我们将只使用InfluxDB行协议，这是推荐的方法，并使用Java客户端插入数据：

```xml
`<dependency>`
    `<groupId>`org.questdb`</groupId>`
    `<artifactId>`questdb`</artifactId>`
    `<version>`7.0.0`</version>`
`</dependency>`
```

然后，我们将向数据库发送一些数据。

### 4.2. 发送数据

简而言之，我们想要创建一个温度跟踪系统，将数据发送到我们的数据库中的_sensors_表。因此，我们需要创建一个_Sender_对象，向构建器提供数据库的正确地址：

```java
Sender sender = Sender.builder().address("localhost:9009").build();
```

Sender是可关闭的，所以我们在try-with结构中使用它。

然后，我们可以引用_sensors_表，并通过为每个列提供值来简单地添加数据：

```java
sender.table(SENSORS_TABLE_NAME)
    .stringColumn("id", "KTC")
    .stringColumn("name", "Kitchen temperature (Celsius)")
    .doubleColumn("currentValue", 20)
    .atNow();
```

特别是，我们不需要事先创建表，因为库将根据我们发送到数据库的数据来创建表。

### 4.3. 查询数据

一旦我们有一些数据，我们就可以在Web应用程序上使用SELECT语句查询数据。例如，我们可以使用以下方式查看我们的厨房传感器的读数：

```sql
SELECT * from 'sensors' WHERE id = 'KTC'
```

我们可以在Web应用程序中看到这一点：![img](https://www.baeldung.com/wp-content/uploads/2023/03/Screenshot-2023-03-16-at-21.55.59.png)

### 4.4. 删除行

QuestDB不允许删除单行，但可以通过创建一个不包含所需行的表的副本，删除表，然后将副本重命名为原始表名来解决这个问题。

尽管可以使用这种解决方法，但我们建议尽可能避免使用它，因为它成本很高。

5. 结论

在本文中，我们学习了如何安装和连接到QuestDB，执行查询，并从我们的应用程序与之交互。

本文的所有代码示例都可以在GitHub上找到。

OK