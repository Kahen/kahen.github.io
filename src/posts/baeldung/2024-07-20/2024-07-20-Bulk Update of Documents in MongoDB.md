---
date: 2022-04-01
category:
  - MongoDB
  - Java
tag:
  - MongoDB
  - Bulk Update
  - Java
head:
  - - meta
    - name: keywords
      content: MongoDB, Bulk Update, Java, Database Performance
------
# MongoDB中批量更新文档

## 1. 概述

在本教程中，我们将探讨在MongoDB中执行批量更新和插入操作。此外，MongoDB提供了API调用，允许在单个操作中插入或检索多个文档。MongoDB使用数组或批量接口，通过减少客户端和数据库之间的调用次数，大大提高了数据库性能。

在本教程中，我们将查看使用MongoDB Shell和Java驱动代码的解决方案。

让我们深入实现MongoDB中文档的批量更新。

## 2. 数据库初始化

首先，我们需要连接到mongo shell：

```
mongo --host localhost --port 27017
```

现在，设置一个数据库_baeldung_和一个样本集合_populations_：

```
use baeldung;
db.createCollection(populations);
```

让我们使用_insertMany_方法向集合_populations_中添加一些样本数据：

```
db.populations.insertMany([
{
    "cityId":1124,
    "cityName":"New York",
    "countryName":"United States",
    "continentName":"North America",
    "population":22
},
{
    "cityId":1125,
    "cityName":"Mexico City",
    "countryName":"Mexico",
    "continentName":"North America",
    "population":25
},
{
    "cityId":1126,
    "cityName":"New Delhi",
    "countryName":"India",
    "continentName":"Asia",
    "population":45
},
{
    "cityId":1134,
    "cityName":"London",
    "countryName":"England",
    "continentName":"Europe",
    "population":32
}]);
```

上述_insertMany_查询将返回以下文档：

```
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("623575049d55d4e137e477f6"),
        ObjectId("623575049d55d4e137e477f7"),
        ObjectId("623575049d55d4e137e477f8"),
        ObjectId("623575049d55d4e137e477f9")
    ]
}
```

在这里，我们在上述查询中插入了四个文档，以执行MongoDB中的所有类型的批量写操作。

数据库_baeldung_已成功创建，所有所需数据也已插入到集合_populations_中，因此我们准备执行批量更新。

## 3. 使用MongoDB Shell查询

MongoDB的批量操作构建器用于为单个集合构建批量写操作列表。我们可以以两种不同的方式初始化批量操作。方法_initializeOrderedBulkOp_用于按顺序执行批量写操作列表。**_initializeOrderedBulkOp_的一个缺点是，如果在处理任何写操作时发生错误，MongoDB将返回而不处理列表中剩余的写操作。**

我们可以使用insert、update、replace和remove方法在单个DB调用中执行不同类型的操作。作为示例，让我们看看使用MongoDB shell的批量写操作查询：

```
db.populations.bulkWrite([
    {
        insertOne :
            {
                "document" :
                    {
                        "cityId":1128,
                        "cityName":"Kathmandu",
                        "countryName":"Nepal",
                        "continentName":"Asia",
                        "population":12
                    }
            }
    },
    {
        insertOne :
            {
                "document" :
                    {
                        "cityId":1130,
                        "cityName":"Mumbai",
                        "countryName":"India",
                        "continentName":"Asia",
                        "population":55
                    }
            }
    },
    {
        updateOne :
            {
                "filter" :
                     {
                         "cityName": "New Delhi"
                     },
                 "update" :
                     {
                         $set :
                         {
                             "status" : "High Population"
                         }
                     }
            }
    },
    {
        updateMany :
            {
                "filter" :
                     {
                         "cityName": "London"
                     },
                 "update" :
                     {
                         $set :
                         {
                             "status" : "Low Population"
                         }
                     }
            }
    },
    {
        deleteOne :
            {
                "filter" :
                    {
                        "cityName":"Mexico City"
                    }
            }
    },
    {
        replaceOne :
            {
                "filter" :
                    {
                        "cityName":"New York"
                    },
                 "replacement" :
                    {
                        "cityId":1124,
                        "cityName":"New York",
                        "countryName":"United States",
                        "continentName":"North America",
                        "population":28
                    }
             }
    }
]);
```

上述_bulkWrite_查询将返回以下文档：

```
{
    "acknowledged" : true,
    "deletedCount" : 1,
    "insertedCount" : 2,
    "matchedCount" : 3,
    "upsertedCount" : 0,
    "insertedIds" :
        {
            "0" : ObjectId("623575f89d55d4e137e477f9"),
            "1" : ObjectId("623575f89d55d4e137e477fa")
        },
    "upsertedIds" : {}
}
```

在这里，上述查询中，我们执行了所有类型的写操作，即_insertOne_、_updateOne_、_deleteOne_、_replaceOne_。

首先，我们使用_insertOne_方法向集合中插入了一个新的文档。其次，我们使用_updateOne_更新了_cityName_“New Delhi”的文档。后来，我们使用_deleteOne_方法根据过滤器从集合中删除了一个文档。最后，我们使用_replaceOne_用过滤器_cityName_“New York”替换了一个完整的文档。

## 4. 使用Java驱动

我们已经讨论了MongoDB shell查询来执行批量写操作。在创建批量写操作之前，让我们首先创建一个与数据库_baeldung_的集合_populations_的_MongoClient_连接：

```
MongoClient mongoClient = new MongoClient("localhost", 27017);
MongoDatabase database = mongoClient.getDatabase("baeldung");
MongoCollection```````<Document>``````` collection = database.getCollection("populations");
```

在这里，我们与在默认端口27017上运行的MongoDB服务器创建了连接。现在，让我们使用Java代码实现相同的批量操作：

```
List<WriteModel```````<Document>```````> writeOperations = new ArrayList<WriteModel```````<Document>```````>();
writeOperations.add(new InsertOneModel```````<Document>```````(new Document("cityId", 1128)
  .append("cityName", "Kathmandu")
  .append("countryName", "Nepal")
  .append("continentName", "Asia")
  .append("population", 12)));
writeOperations.add(new InsertOneModel```````<Document>```````(new Document("cityId", 1130)
  .append("cityName", "Mumbai")
  .append("countryName", "India")
  .append("continentName", "Asia")
  .append("population", 55)));
writeOperations.add(new UpdateOneModel```````<Document>```````(new Document("cityName", "New Delhi"),
  new Document("$set", new Document("status", "High Population"))
));
writeOperations.add(new UpdateManyModel```````<Document>```````(new Document("cityName", "London"),
  new Document("$set", new Document("status", "Low Population"))
));
writeOperations.add(new DeleteOneModel```````<Document>```````(new Document("cityName", "Mexico City")));
writeOperations.add(new ReplaceOneModel```````<Document>```````(new Document("cityId", 1124),
  new Document("cityName", "New York").append("cityName", "United States")
    .append("continentName", "North America")
    .append("population", 28)));
BulkWriteResult bulkWriteResult = collection.bulkWrite(writeOperations);
System.out.println("bulkWriteResult:- " + bulkWriteResult);
```

在这里，我们首先创建了一个_writeModel_列表，将所有不同类型的写操作添加到一个单一的更新列表中。此外，我们在我们的查询中使用了_InsertOneModel_、_UpdateOneModel_、_UpdateManyModel_、_DeleteOneModel_和_ReplaceOneModel_。最后，_bulkWrite_方法一次性执行了所有操作。

## 5. 结论

在本文中，我们学习了如何使用不同类型的写操作在MongoDB中执行批量操作。我们在一个单独的DB查询中执行了文档的插入、更新、删除和替换。此外，我们学习了在MongoDB中批量更新中使用_initializeOrderedBulkOp_的用例。

首先，我们查看了MongoDB shell查询中批量操作的用例，然后我们讨论了相应的Java驱动代码。

所有案例的示例可以在GitHub上找到。