---
date: 2022-04-01
category:
  - MongoDB
  - Java
tag:
  - MongoDB
  - Java
  - Database
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, Database, Query, Document ID
---
# MongoDB中使用文档ID查询文档

在本教程中，我们将探讨在MongoDB中使用文档ID执行查询操作。MongoDB提供了一个_find_操作符来从集合中查询文档。

首先，让我们看看在MongoDB Shell中使用文档ID查询文档，然后使用Java驱动程序代码。

## 2. MongoDB文档的文档ID是什么？

就像其他数据库管理系统一样，MongoDB要求每个存储在集合中的文档都有一个唯一的标识符。这个唯一的标识符作为集合的主键。

在MongoDB中，ID由12个字节组成：
- 一个4字节的时间戳，表示ID的创建时间，以Unix纪元以来的秒数计算
- 一个5字节的随机生成值，对机器和进程是唯一的
- 一个3字节的递增计数器

在MongoDB中，**ID存储在名为_\_id_的字段中，并由客户端生成。**因此，在将文档发送到数据库之前，应该生成ID。在客户端，我们可以使用驱动程序生成的ID或生成自定义ID。

唯一标识符存储在_ObjectId_类中。这个类提供了方便的方法来获取存储在ID中的数据，而不需要实际解析它。如果插入文档时没有指定_\_id_，MongoDB将添加_\_id_字段并为文档分配一个唯一的_ObjectId_。

## 3. 数据库初始化

首先，让我们设置一个新的数据库_baeldung_和一个样本集合，_vehicle_：

```javascript
use baeldung;
db.createCollection("vehicle");
```

进一步，让我们使用_insertMany_方法将一些文档添加到集合中：

```javascript
db.vehicle.insertMany([
{
    "companyName":"Skoda",
    "modelName":"Octavia",
    "launchYear":2016,
    "type":"Sports",
    "registeredNo":"SKO 1134"
},
{
    "companyName":"BMW",
    "modelName":"X5",
    "launchYear":2020,
    "type":"SUV",
    "registeredNo":"BMW 3325"
},
{
    "companyName":"Mercedes",
    "modelName":"Maybach",
    "launchYear":2021,
    "type":"Luxury",
    "registeredNo":"MER 9754"
}]);
```

如果插入成功，上述命令将打印类似于以下内容的JSON：

```json
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("62d01d17cdd1b7c8a5f945b9"),
        ObjectId("62d01d17cdd1b7c8a5f945ba"),
        ObjectId("62d01d17cdd1b7c8a5f945bb")
    ]
}
```

我们已经成功设置了数据库和集合。我们将使用这个数据库和集进行所有示例。

## 4. 使用MongoDB Shell

我们将使用_db.collection.find(query, projection)_方法从MongoDB查询文档。

首先，让我们编写一个查询，返回所有的_vehicle_集合文档：

```javascript
db.vehicle.find({});
```

上述查询返回所有文档：

```json
{ "_id" : ObjectId("62d01d17cdd1b7c8a5f945b9"), "companyName" : "Skoda",
    "modelName" : "Octavia", "launchYear" : 2016, "type" : "Sports", "registeredNo" : "SKO 1134" }
{ "_id" : ObjectId("62d01d17cdd1b7c8a5f945ba"), "companyName" : "BMW",
    "modelName" : "X5", "launchYear" : 2020, "type" : "SUV", "registeredNo" : "BMW 3325" }
{ "_id" : ObjectId("62d01d17cdd1b7c8a5f945bb"), "companyName" : "Mercedes",
    "modelName" : "Maybach", "launchYear" : 2021, "type" : "Luxury", "registeredNo" : "MER 9754" }
```

进一步，让我们编写一个查询，使用上面返回的结果中的ID获取_vehicle_集合文档：

```javascript
db.vehicle.find(
{
    "_id": ObjectId("62d01d17cdd1b7c8a5f945b9")
});
```

上述查询返回具有_\_id_等于_ObjectId("62d01d17cdd1b7c8a5f945b9")_的_vehicle_集合文档：

```json
{ "_id" : ObjectId("62d01d17cdd1b7c8a5f945b9"), "companyName" : "Skoda",
    "modelName" : "Octavia", "launchYear" : 2016, "type" : "Sports", "registeredNo" : "SKO 1134" }
```

此外，我们可以使用_in_查询操作符使用ID检索多个_vehicle_集合文档：

```javascript
db.vehicle.find(
{
    "_id": {
        $in: [
            ObjectId("62d01d17cdd1b7c8a5f945b9"),
            ObjectId("62d01d17cdd1b7c8a5f945ba"),
            ObjectId("62d01d17cdd1b7c8a5f945bb")
        ]
    }
});
```

上述查询返回_in_操作符中查询ID的所有_vehicle_集合文档：

```json
{ "_id" : ObjectId("62d01d17cdd1b7c8a5f945b9"), "companyName" : "Skoda",
    "modelName" : "Octavia", "launchYear" : 2016, "type" : "Sports", "registeredNo" : "SKO 1134" }
{ "_id" : ObjectId("62d01d17cdd1b7c8a5f945ba"), "companyName" : "BMW",
    "modelName" : "X5", "launchYear" : 2020, "type" : "SUV", "registeredNo" : "BMW 3325" }
{ "_id" : ObjectId("62d01d17cdd1b7c8a5f945bb"), "companyName" : "Mercedes",
    "modelName" : "Maybach", "launchYear" : 2021, "type" : "Luxury", "registeredNo" : "MER 9754" }
```

同样，任何查询操作符都可以作为_find()_方法的过滤器与要查询的ID一起使用。

同样重要的是要注意，**在使用_\_id_字段查询文档时，文档ID字符串值应该指定为_ObjectId()_而不是_String_。**

让我们尝试使用ID作为_String_值查询现有文档：

```javascript
db.vehicle.find(
{
    "_id": "62d01d17cdd1b7c8a5f945b9"
});
```

不幸的是，上述查询将不会返回任何文档，因为不存在ID为_String_值_62d01d17cdd1b7c8a5f945b9_的文档。

## 5. 使用Java驱动程序

到目前为止，我们已经学习了如何使用MongoDB Shell使用ID查询文档。现在让我们使用MongoDB Java驱动程序实现相同的操作。

在执行更新操作之前，让我们首先连接到_baeldung_数据库中的_vehicle_集合：

```java
MongoClient mongoClient = new MongoClient("localhost", 27017);
MongoDatabase database = mongoClient.getDatabase("baeldung");
MongoCollection```````<Document>``````` collection = database.getCollection("vehicle");
```

在这里，我们连接到在默认端口27017上运行的MongoDB。

首先，让我们编写使用ID查询文档的代码：

```java
Bson filter = Filters.eq("_id", new ObjectId("62d01d17cdd1b7c8a5f945b9"));
FindIterable```````<Document>``````` documents = collection.find(filter);

MongoCursor```````<Document>``````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

在这里，我们向_find()_方法传递一个_Bson_过滤器作为参数，使用_\_id_字段进行查询。上述代码片段将返回_\_id_等于_ObjectId("62d01d17cdd1b7c8a5f945b9")_的_vehicle_集合文档。

进一步，让我们编写一个代码片段，使用多个ID查询文档：

```java
Bson filter = Filters.in("_id", new ObjectId("62d01d17cddb7c8a5f945b9"),
  new ObjectId("62d01d17cdd1b7c8a5f945ba"));
FindIterable```````<Document>``````` documents = collection.find(filter);

MongoCursor```````<Document>``````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

上述查询将返回所有查询ID的_vehicle_集合文档。

最后，让我们尝试使用驱动程序生成的ID查询_vehicle_集合：

```java
Bson filter = Filters.eq("_id", new ObjectId());
FindIterable```````<Document>``````` documents = collection.find(filter);

MongoCursor```````<Document>``````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

上述查询将不会返回任何文档，因为集合中不存在具有新生成ID的文档。

## 6. 结论

在本文中，我们学习了如何在MongoDB中使用文档ID查询文档。首先，我们研究了在MongoDB Shell查询中的这些用例，然后我们讨论了相应的Java驱动程序代码。

所有这些示例和代码片段的实现都可以在GitHub上找到。
OK