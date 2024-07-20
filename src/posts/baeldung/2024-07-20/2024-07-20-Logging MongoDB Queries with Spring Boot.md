---
date: 2022-03-20
category:
  - Spring Boot
  - MongoDB
tag:
  - Logging
  - Debugging
head:
  - - meta
    - name: keywords
      content: MongoDB, Spring Boot, Logging, Debugging
------
# 使用Spring Boot记录MongoDB查询

## 1. 概述

在使用Spring Data MongoDB时，我们可能需要将日志级别提高到默认级别以上。通常，我们可能需要查看例如语句执行或查询参数等额外信息。

在这个简短的教程中，我们将看到如何修改MongoDB查询的日志级别。

## 2. 配置MongoDB查询日志

MongoDB支持提供了_MongoOperations_接口或其主要的_MongoTemplate_实现来访问数据，因此我们所需要做的就是为_MongoTemplate_类配置一个调试级别。

**像任何Spring或Java应用程序一样，我们可以使用日志库并为_MongoTemplate_定义一个日志级别。**

通常，我们可以在配置文件中写入类似以下内容：

```
`<logger name="org.springframework.data.mongodb.core.MongoTemplate" level="DEBUG" />`
```

**然而，如果我们正在运行一个Spring Boot应用程序**，**我们可以在我们的_application.properties_文件中配置这一点**：

```
logging.level.org.springframework.data.mongodb.core.MongoTemplate=DEBUG
```

同样，我们可以使用_YAML_语法：

```yaml
logging:
  level:
    org:
      springframework:
        data:
          mongodb:
            core:
              MongoTemplate: DEBUG
```

## 3. 日志测试类

首先，让我们创建一个_Book_类：

```java
@Document(collection = "book")
public class Book {

    @MongoId
    private ObjectId id;
    private String bookName;
    private String authorName;

    // getters and setters
}
```

我们想创建一个简单的测试类并检查日志。

**为了演示这一点，我们使用嵌入式MongoDB。为了确保，让我们首先检查我们的依赖项**：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-data-mongodb``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``de.flapdoodle.embed``</groupId>``
    ``<artifactId>``de.flapdoodle.embed.mongo``</artifactId>``
    `<version>`${embed.mongo.version}`</version>`
    `<scope>`test`</scope>`
``</dependency>``
```

最后，让我们使用Spring Boot Test定义我们的测试类：

```java
@SpringBootTest
@TestPropertySource(properties = { "logging.level.org.springframework.data.mongodb.core.MongoTemplate=DEBUG" })
public class LoggingUnitTest {

    private static final String CONNECTION_STRING = "mongodb://%s:%d";

    private MongodExecutable mongodExecutable;
    private MongoTemplate mongoTemplate;

    @AfterEach
    void clean() {
        mongodExecutable.stop();
    }

    @BeforeEach
    void setup() throws Exception {
        String ip = "localhost";
        int port = 27017;

        ImmutableMongodConfig mongodbConfig = MongodConfig.builder()
          .version(Version.Main.PRODUCTION)
          .net(new Net(ip, port, Network.localhostIsIPv6()))
          .build();

        MongodStarter starter = MongodStarter.getDefaultInstance();
        mongodExecutable = starter.prepare(mongodbConfig);
        mongodExecutable.start();
        mongoTemplate = new MongoTemplate(MongoClients.create(String.format(CONNECTION_STRING, ip, port)), "test");
    }
    // tests
}
```

## 4. 日志样本

在这一部分，我们将定义一些简单的测试用例并显示相关的日志，以测试最常见的场景，如查找、插入、更新或聚合_Document_。

### 4.1. 插入

首先，让我们从插入一个_Document_开始：

```java
Book book = new Book();
book.setBookName("Book");
book.setAuthorName("Author");

mongoTemplate.insert(book);

```

日志显示我们在哪个集合中插入。在查找_Document_时，id也会被记录：

```
[2022-03-20 17:42:47,093]-[main] DEBUG MongoTemplate - Inserting Document containing fields: [bookName, authorName, _class] in collection: book
...
[2022-03-20 17:42:47,144]-[main] DEBUG MongoTemplate - findOne using query: { "id" : { "$oid" : "623759871ff6275fe96a5ecb"}} fields: Document{{}} for class: class com.baeldung.mongodb.models.Book in collection: book
[2022-03-20 17:42:47,149]-[main] DEBUG MongoTemplate - findOne using query: { "_id" : { "$oid" : "623759871ff6275fe96a5ecb"}} fields: {} in db.collection: test.book
```

### 4.2. 更新

同样，当更新一个_Document_时：

```java
Book book = new Book();
book.setBookName("Book");
book.setAuthorName("Author");

mongoTemplate.insert(book);

String authorNameUpdate = "AuthorNameUpdate";

book.setAuthorName(authorNameUpdate);
mongoTemplate.updateFirst(query(where("bookName").is("Book")), update("authorName", authorNameUpdate), Book.class);

```

我们可以看到日志中实际更新的_Document_字段：

```
[2022-03-20 17:48:31,759]-[main] DEBUG MongoTemplate - Calling update using query: { "bookName" : "Book"} and update: { "$set" : { "authorName" : "AuthorNameUpdate"}} in collection: book
```

### 4.3. 批量插入

让我们添加一个批量插入的示例：

```java
Book book = new Book();
book.setBookName("Book");
book.setAuthorName("Author");

Book book1 = new Book();
book1.setBookName("Book1");
book1.setAuthorName("Author1");

mongoTemplate.insert(Arrays.asList(book, book1), Book.class);
```

我们可以看到日志中插入的_Document_数量：

```
[2022-03-20 17:52:00,564]-[main] DEBUG MongoTemplate - Inserting list of Documents containing 2 items
```

### 4.4. 删除

同样，让我们添加一个删除的示例：

```java
Book book = new Book();
book.setBookName("Book");
book.setAuthorName("Author");

mongoTemplate.insert(book);

mongoTemplate.remove(book);

```

我们可以看到日志中，这种情况下被删除的_Document_的id：

```
[2022-03-20 17:56:42,151]-[main] DEBUG MongoTemplate - Remove using query: { "_id" : { "$oid" : "62375cca2a2cba4db774d8c1"}} in collection: book.
```

### 4.5. 聚合

让我们看看聚合的示例。在这种情况下，我们需要定义一个结果类。例如，我们将按作者名称进行聚合：

```java
public class GroupByAuthor {

    @Id
    private String authorName;
    private int authCount;

    // getters and setters
}
```

接下来，让我们定义一个分组的测试用例：

```java
Book book = new Book();
book.setBookName("Book");
book.setAuthorName("Author");

Book book1 = new Book();
book1.setBookName("Book1");
book1.setAuthorName("Author");

Book book2 = new Book();
book2.setBookName("Book2");
book2.setAuthorName("Author");

mongoTemplate.insert(Arrays.asList(book, book1, book2), Book.class);

GroupOperation groupByAuthor = group("authorName")
  .count()
  .as("authCount");

Aggregation aggregation = newAggregation(groupByAuthor);

AggregationResults`<GroupByAuthor>` aggregationResults = mongoTemplate.aggregate(aggregation, "book", GroupByAuthor.class);
```

我们可以看到日志中通过哪个字段进行了聚合以及聚合管道的类型：

```
[2022-03-20 17:58:51,237]-[main] DEBUG MongoTemplate - Executing aggregation: [{ "$group" : { "_id" : "$authorName", "authCount" : { "$sum" : 1}}}] in collection book
```

## 5. 结论

在本文中，我们探讨了如何为Spring Data MongoDB启用调试日志级别。

我们定义了一些常见的查询场景，并在进行一些实时测试时查看了它们的相关日志。