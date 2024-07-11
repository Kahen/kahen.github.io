---
date: 2022-11-01
category:
  - NoSQL
  - 数据库
tag:
  - MongoDB
  - Couchbase
head:
  - - meta
    - name: keywords
      content: MongoDB, Couchbase, NoSQL, 数据库, 对比
---

# MongoDB 与 Couchbase 比较

在这个教程中，我们将比较两种最受欢迎的NoSQL数据库——MongoDB和Couchbase。我们将查看它们的架构、功能列表、数据模型、查询方式以及它们各自如何处理分区。

## 2. NoSQL数据库简介

SQL数据库自1970年以来一直存在，并且在相当长的一段时间内一直是事实上的数据库。它们的一个目的是减少数据重复，因为在那些日子里存储并不便宜。水平扩展意味着SQL数据库需要大量的维护工作，但可以通过购买更强大的服务器进行垂直扩展。

**NoSQL（不仅仅是SQL）数据库在21世纪末出现，允许更容易的水平扩展。** 我们现在可以在许多不那么强大的机器上分布我们的数据，因为计算能力变得越来越便宜。这里的数据不是以表格形式存储，而是以文档形式（通常是JSON格式），并且模式不像SQL数据库那样严格。

MongoDB是最早的NoSQL数据库之一。它的简单设置和易用性使其长时间保持在榜首。然而，也有像Couchbase这样的新竞争者，它提供了易于扩展和高性能的特性。

## 3. 架构

让我们看看MongoDB部署的架构：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/Mongo-architecture.png)

在这里，每个节点都包含一个副本集，其中有一个主副本和两个次副本。

每个副本都有自己的**MongoD服务，它管理数据、索引和查询**。**MongoS组件充当分布式查询路由器和处理器。**

现在让我们看看Couchbase部署的架构：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/Couch-architecture.png)

在Couchbase部署的每个节点上都有一个强制性的集群管理器。其他服务组件，即数据、索引、查询和搜索，可以存在也可以不存在。

**对于Couchbase，数据存储在Buckets中，这些Buckets使用自动哈希在节点之间进行分区。**

不需要配置服务器，因为元数据管理是内置在数据库设计中的。扩展只是一个添加更多节点的问题。

## 4. 功能比较

让我们看看这两种NoSQL数据库的主要功能比较：

| 功能 | MongoDB | Couchbase |
| --- | --- | --- |
| 存储 | 以二进制JSON（BSON）形式存储文档 | 以JSON形式存储文档 |
| 查询 | 专有查询语言 | N1QL - 支持SQL查询 |
| 分区 | 通过分片手动处理分区 | 使用哈希机制自动分区 |
| 事务 | 从4.2版本起支持分布式事务 | 从6.6版本起支持分布式事务 |
| 搜索 | 从4.0版本起支持文本搜索 | 从6.0版本起支持全文搜索 |

## 5. 数据模型

与SQL数据库不同，在NoSQL的情况下，数据模型不是强制的。文档不需要具有相同的模式。我们有自由按照我们认为合适的方式建模每个关系。

让我们看看实体之间关系的建模：

- 一对一（1-1）：NoSQL数据库处理此问题的标准方式是通过将一个实体嵌入另一个实体中。这也是MongoDB和Couchbase的行为。我们也可以嵌入另一个实体的实体id。两个数据库都支持这一点。
- 一对多（1-N）：我们通过嵌入N个实体的数组或N个实体id的数组在第一个实体中来解决这个问题。MongoDB和Couchbase都支持这一点。
- 多对多（M-N）：我们通过在每个M个实体中嵌入N个实体的数组或在每个M个实体中嵌入N个实体id的数组来解决这个问题。MongoDB和Couchbase也都支持这一点。

嵌入哪个实体以及选择嵌入实体还是id是一个关键的设计决策。我们在仔细考虑应用程序将如何使用我们的数据库后做出这个决定。

## 6. 数据查询

对于查询，MongoDB有自己的专有查询语言，而Couchbase使用N1QL，这是一种类似于SQL的语言。让我们以_STUDENT_集合为例，看看每个数据库如何处理通常的命令查询操作。

### 6.1. _SELECT_

这是SQL语言、MongoDB查询语言和Couchbase N1QL中的_SELECT_操作：

```sql
-- SQL
SELECT * FROM STUDENT WHERE name = 'Ryan';

-- MongoDB查询语言
db.STUDENT.find({name:"Ryan"})

-- Couchbase N1QL
SELECT * FROM STUDENT WHERE name = 'Ryan';
```

### 6.2. _INSERT_

现在，让我们看看SQL、MongoDB查询语言和Couchbase N1QL中的_INSERT_操作：

```sql
-- SQL
INSERT INTO STUDENT(id, name) VALUES (123, 'Ryan');

-- MongoDB查询语言
db.STUDENT.save({_id: "123", {"id": "123", "name": "Ryan"})

-- Couchbase N1QL
INSERT INTO STUDENT(KEY, VALUE) VALUES ('123', {"id": "123", "name": "Ryan"})
```

### 6.3. _UPDATE_

接下来是SQL、MongoDB查询语言和Couchbase N1QL中的_UPDATE_操作：

```sql
-- SQL
UPDATE STUDENT SET name='John' WHERE id = 123;

-- MongoDB查询语言
db.STUDENT.update({_id: "123"}, {"name": "John"})

-- Couchbase N1QL
UPDATE STUDENT SET name = "John" WHERE id = "123"
```

### 6.4. _DELETE_

这是SQL、MongoDB查询语言和Couchbase N1QL中的基本操作——_DELETE_：

```sql
-- SQL
DELETE FROM STUDENT WHERE id = 123;

-- MongoDB查询语言
db.STUDENT.remove({_id: "123"})

-- Couchbase N1QL
DELETE FROM CUSTOMER WHERE id = "123";
```

我们可以在我们的Spring Data MongoDB教程中深入了解使用Spring Data进行MongoDB查询。

同样，我们可以在我们的Spring Data Couchbase教程中学习如何使用Spring Data持久化Couchbase文档。

## 7. 分区

分区是任何NoSQL数据库的关键特性，这两种也不例外。

MongoDB默认不分区其数据。相反，它将所有数据保留在单个节点上。**MongoDB通过将数据分割成子集（shards）来进行水平扩展**，我们可以将每个子集分布在不同的节点上。**配置服务器管理部署集群的配置。**

**Couchbase中没有配置服务器。相反，每个节点都有自己的集群管理器服务，并且可以运行任何数据、索引、查询和搜索服务**。这样，我们可以通过在需要的地方分配计算能力来实现极大的灵活性。

## 8. 结论

在本文中，我们探讨了MongoDB和Couchbase之间的相似之处和差异。

总结一下，**MongoDB是进入NoSQL世界的一个好方式**。它周围有一个伟大的社区，MongoDB大学为开发人员提供了大量的培训。

另一方面，**Couchbase支持SQL查询，并承诺提供出色的性能和易于扩展**。