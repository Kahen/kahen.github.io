---
date: 2024-07-10
category:
  - ScyllaDB
  - Java
tag:
  - NoSQL
  - Database
  - Java Driver
head:
  - - meta
    - name: keywords
      content: ScyllaDB, Java, NoSQL, Database, Java Driver
---

# ScyllaDB与Java入门指南

在这个教程中，我们将探索ScyllaDB——一个快速且可扩展的NoSQL数据库。我们将看到它的特性以及如何与之交互。

## 2. ScyllaDB是什么？

**ScyllaDB是一个开源的分布式NoSQL数据库。**它支持与Cassandra相同的协议，但具有更高的吞吐量和更低的延迟。它使用C++语言开发。

ScyllaDB有三个变体：
- ScyllaDB开源版：这是一个免费的开源版本。我们将拥有完全所有权，需要自己进行维护
- ScyllaDB企业版：这是一个付费版本，我们将获得一些高级功能和全天候支持。我们需要使用自己的基础设施来安装这个版本
- ScyllaDB云服务：这是ScyllaDB提供的基于云的服务，我们不需要拥有自己的基础设施或进行任何安装和维护

### 2.1. 安装

我们将使用开源版本，并使用以下命令在Docker容器上运行它：

```
$ docker run --name scylla -p 9042:9042 -d scylladb/scylla
```

我们在这里暴露了9042号端口。我们将使用此端口连接到数据库。

现在，让我们连接到数据库，创建一个表并插入一些数据。我们将编写Java代码来获取这些数据。

让我们执行以下命令以连接到数据库：

```
$ docker exec -it scylla cqlsh
```

现在让我们创建一个具有简单复制策略和3个复制因子的命名空间：

```
CREATE KEYSPACE IF NOT EXISTS baeldung WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};
```

让我们执行以下查询以创建一个表并插入数据：

```
CREATE COLUMNFAMILY IF NOT EXISTS baeldung.User (id bigint PRIMARY KEY, name text);
INSERT INTO baeldung.User (id, name) values (1, 'john doe');
```

## 3. Java代码实现

我们将编写一个简单的Java程序，它将连接到我们本地部署的Scylla DB并执行查询。

### 3.1. Maven依赖

让我们在_pom.xml_文件中添加Scylla核心库依赖：

```
``<dependency>``
    ``<groupId>``com.scylladb``</groupId>``
    ``<artifactId>``java-driver-core``</artifactId>``
    ``<version>``4.14.1.0``</version>``
``</dependency>``
```

### 3.2. Java代码

让我们首先将连接URL添加到_application.yml_文件中：

```
datastax-java-driver:
  basic:
    contact-points: 127.0.0.1:9042
```

我们可以查看此文档以获取有关所有可配置值的更多详细信息。

现在让我们获取我们之前添加的用户名称：

```
try (CqlSession session = CqlSession.builder().build()) {
    ResultSet rs = session.execute("select * from baeldung.User");
    Row row = rs.one();
    return row.getString("name");
}
```

我们还可以使用查询构建器来插入和获取数据。我们首先需要在_pom.xml_文件中添加_java-driver-query-builder_ Maven依赖：

```
``<dependency>``
    ``<groupId>``com.scylladb``</groupId>``
    ``<artifactId>``java-driver-query-builder``</artifactId>``
    ``<version>``4.14.1.0``</version>``
``</dependency>``
```

现在我们将在我们的代码中编写SELECT和INSERT构建器语句以获取和插入据：

```
try (CqlSession session = CqlSession.builder().build()) {
    InsertInto insert = insertInto("baeldung", "User");
    SimpleStatement statement = insert.value("id", literal(2))
      .value("name", literal("dev user"))
      .build();
    ResultSet rs = session.execute(statement);
}
```

它将在命名空间baeldung的User表中插入一个新用户，id = 2，名称 = "dev user"。现在让我们创建一个SELECT语句，通过名称查找此用户：

```
try (CqlSession session = CqlSession.builder().build()) {
    Select query = selectFrom("baeldung", "User").all()
      .whereColumn("name").isEqualTo(literal("dev user"))
      .allowFiltering();
    SimpleStatement statement = query.build();
    ResultSet rs = session.execute(statement);
    Row row = rs.one();
    assertEquals(2, row.getLong("id"));
    assertEquals("dev user", row.getString("name");
}
```

我们可以看到，它将返回我们插入的数据，id = 2。

## 4. 结论

在这里，我们对ScyllaDB进行了快速介绍，学习了如何安装、连接和执行查询，以及我们如何从应用程序与之交互。

一如既往，示例的完整源代码可在GitHub上找到。