---
date: 2022-04-01
category:
  - Java
  - MongoDB
tag:
  - MongoDB
  - Java
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, 集合存在性检查
---

# MongoDB中检查集合存在性的多种方法

MongoDB 是一种 NoSQL 数据库，它将数据记录以 BSON 文档的形式存储到集合中。我们可以拥有多个数据库，每个数据库可以有一个或多个文档集合。

与关系型数据库不同，MongoDB 在插入文档时会自动创建集合，无需任何结构定义。在本教程中，我们将学习检查集合存在性的多种方法。我们将使用 collectionExists、createCollection、listCollectionNames 和 count 方法来检查集合是否存在。

### 2.1. 使用 _MongoClient_ 创建连接

_MongoClient_ 是一个 Java 类，用于与 MongoDB 实例建立连接：

```
MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
```

这里，我们连接到在本地主机上运行的 MongoDB，使用的是默认端口 27017。

### 2.2. 连接到数据库

现在，让我们使用 _MongoClient_ 对象来访问数据库。有几种方法可以使用 _MongoClient_ 访问数据库。

首先，我们将使用 getDatabase 方法访问 _baeldung_ 数据库：

```
MongoDatabase database = mongoClient.getDatabase("baeldung");
```

我们也可以使用 Mongo Java 驱动程序的 getDB 方法连接到数据库：

```
MongoDatabase db = mongoClient.getDatabase("baeldung");
```

getDB 方法已被弃用，因此不建议使用。

到目前为止，我们已经使用 MongoClient 设置了与 MongoDB 的连接，并进一步连接到了 _baeldung_ 数据库。

让我们深入研究在 MongoDB 中检查集合存在的不同方法。

### 3. 使用 _DB_ 类

MongoDB Java 驱动程序提供了同步和异步方法调用。为了连接到数据库，我们只需要指定数据库名称。**如果数据库不存在，MongoDB 会自动创建一个。**

collectionExists 方法在较新版本中不存在，因此我们基于 listCollectionNames() 创建了一个检查集合是否存在的工作方式：

```
MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
MongoDatabase db = mongoClient.getDatabase("baeldung");
String testCollectionName = "student";
System.out.println("Collection Name " + testCollectionName + " " + db.listCollectionNames().into(new ArrayList<>()).contains(testCollectionName));
```

这里，listCollectioNames 方法将返回所有集合，然后与所需的集合进行匹配。

**MongoDB Java 驱动程序的 com.mongodb.DB API 从 3.x 版本开始已被弃用，但仍然可以访问。** 因此，不建议在新项目中使用 DB 类。

### 4. 使用 _MongoDatabase_ 类

com.mongodb.client.MongoDatabase 是 Mongo 3.x 及以上版本的更新 API。与 DB 类不同，MongoDatabase 类没有提供任何特定方法来检查集合的存在。但是，我们可以使用各种方法来获得所需的结果。

#### 4.1. 使用 _createCollection_ 方法

createCollection 方法在 MongoDB 中创建一个新集合。但我们也可以使用它来检查集合是否存在：

```
String databaseName="baeldung";
MongoDatabase database = mongoClient.getDatabase(databaseName);
String testCollectionName = "student";
try {
    database.createCollection(testCollectionName);
} catch (Exception exception) {
    System.err.println("Collection:- " + testCollectionName + " already Exists");
}
```

上述代码将在数据库中创建一个新的 _student_ 集合（如果它尚未存在）。如果集合已经存在，createCollection 方法将抛出异常。

**这种方法不推荐使用，因为它会在数据库中创建一个新的集合。**

#### 4.2. 使用 _listCollectionNames_ 方法

listCollectionNames 方法列出了数据库中的所有集合名称。因此，我们可以使用此方法来解决集合存在性的问题。

让我们现在看看使用 Java 驱动程序代码的 listCollectionNames 方法的示例代码：

```
String databaseName="baeldung";
MongoDatabase database = mongoClient.getDatabase(databaseName);
String testCollectionName = "student";
boolean collectionExists = database.listCollectionNames()
  .into(new ArrayList()).contains(testCollectionName);
System.out.println("collectionExists:- " + collectionExists);
```

在这里，我们遍历了数据库 _baeldung_ 中所有集合名称的列表。对于每次出现，我们将集合字符串名称与 testCollectionName 进行匹配。如果成功匹配，它将返回 true，否则返回 false。

#### 4.3. 使用 _count_ 方法

MongoCollection 的 count 方法统计集合中存在的文档数量。

作为一种替代方案，我们可以使用这种方法来检查集合的存在。以下是相同的 Java 代码片段：

```
String databaseName="baeldung";
MongoDatabase database = mongoClient.getDatabase(databaseName);
String testCollectionName = "student";
MongoCollection`<Document>` collection = database.getCollection(testCollectionName);
Boolean collectionExists = collection.countDocuments() > 0 ? true : false;
System.out.println("collectionExists:- " + collectionExists);
Boolean expectedStatus = false;
assertEquals(expectedStatus, collectionExists);
```

如果集合存在但没有数据，这种方法将不起作用。在这种情况下，它将返回 0，但集合存在且数据为空。

## **5. 结论**

在本文中，我们探索了使用 MongoDatabase 和 DB 类方法检查集合存在性的各种方式。

简而言之，推荐使用 com.mongodb.DB 类的 collectionExists 方法和 com.mongodb.client.MongoDatabase 的 listCollectionNames 方法来检查集合的存在。

如常，所有示例的源代码和代码片段都可以在 GitHub 上找到。