---
date: 2024-07-20
category:
  - MongoDB
  - Upsert
tag:
  - MongoDB
  - Upsert
  - Java
  - 数据库
head:
  - - meta
    - name: MongoDB Upsert操作
      content: 本文介绍了MongoDB中upsert操作的基本概念、使用方法和Java实现。
------
# MongoDB中的Upsert操作指南

1. 概述

**Upsert是插入(insert)和更新(update)的结合体（inSERT + UPdate = upsert）。** 我们可以在不同的更新方法中使用_upsert_，例如_update_、_findAndModify_和_replaceOne_。

在MongoDB中，_upsert_选项是一个布尔值。假设值为_true_，并且文档与指定的查询过滤器匹配。在这种情况下，应用的更新操作将更新文档。如果值为_true_并且没有文档匹配条件，此选项将向集合中插入一个新文档。新文档将包含基于过滤器和应用操作的字段。

在本教程中，我们将首先查看MongoDB Shell查询中的_upsert_，然后使用Java驱动程序代码。

2. 数据库初始化

在我们继续执行_upsert_操作之前，首先需要设置一个新的数据库_baeldung_和一个示例集合，_vehicle_：

``` 
db.vehicle.insertMany([
{
    "companyName": "Nissan",
    "modelName": "GTR",
    "launchYear": 2016,
    "type": "Sports",
    "registeredNo": "EPS 5561"
},
{
    "companyName": "BMW",
    "modelName": "X5",
    "launchYear": 2020,
    "type": "SUV",
    "registeredNo": "LLS 6899"
},
{
    "companyName": "Honda",
    "modelName": "Gold Wing",
    "launchYear": 2018,
    "type": "Bike",
    "registeredNo": "LKS 2477"
}]);
``` 

如果插入成功，上述命令将打印出类似于下面显示的JSON：

``` 
{
    "acknowledged": true,
    "insertedIds": [
        ObjectId("623c1db39d55d4e137e4781b"),
ObjectId("623c1db39d55d4e137e4781c"),
ObjectId("623c1db39d55d4e137e4781d")
    ]
}
``` 

我们已经成功地将虚拟数据添加到_vehicle_集合中。

3. 使用_update_方法

在这一部分，我们将学习如何使用_update_方法和_upsert_选项。_upsert_选项的主要目的是根据应用的过滤器更新现有文档，或者如果过滤器没有匹配到，则插入一个新文档。

作为示例，我们将使用_upsert_选项和_$setOnInsert_操作符来获得在插入新字段到文档中的额外优势。

让我们查看一个查询，其中过滤器条件与集合中的现有文档匹配：

``` 
db.vehicle.update(
{
    "modelName": "X5"
},
{
    "$set": {
        "companyName": "Hero Honda"
    }
},
{
    "upsert": true
});
``` 

上述查询将返回以下文档：

``` 
{
    "nMatched": 1,
    "nUpserted": 0,
    "nModified": 1
}
``` 

这里，我们将看到与上述Mongo shell查询相对应的Java驱动程序代码：

``` 
UpdateOptions options = new UpdateOptions().upsert(true);
UpdateResult updateResult = collection.updateOne(Filters.eq("modelName", "X5"),
  Updates.combine(Updates.set("companyName", "Hero Honda")), options);
System.out.println("updateResult:- " + updateResult);
``` 

在上述查询中，字段_modelName_ "X5"已经存在于集合中，因此该文档的_companyName_字段将更新为“Hero Honda”。

现在让我们查看一个使用_$setOnInsert_操作符的_upsert_选项的示例。它仅在添加新文档的情况下适用：

``` 
db.vehicle.update(
{
    "modelName": "GTPR"
},
{
    "$set": {
        "companyName": "Hero Honda"
    },
    "$setOnInsert": {
        "launchYear": 2022,
"type": "Bike",
"registeredNo": "EPS 5562"
    },
},
{
    "upsert": true
});
``` 

上述查询将返回以下文档：

``` 
{
    "nMatched": 0,
    "nUpserted": 1,
    "nModified": 0,
    "_id": ObjectId("623b378ed648af670fe50e7f")
}
``` 

上述使用_$setOnInsert_选项的更新查询的Java驱动程序代码将是：

``` 
UpdateResult updateSetOnInsertResult = collection.updateOne(Filters.eq("modelName", "GTPR"),
  Updates.combine(Updates.set("companyName", "Hero Honda"),
  Updates.setOnInsert("launchYear", 2022),
  Updates.setOnInsert("type", "Bike"),
  Updates.setOnInsert("registeredNo", "EPS 5562")), options);
System.out.println("updateSetOnInsertResult:- " + updateSetOnInsertResult);
``` 

在这里，上述查询中，字段_modelName_ "GTPR"的过滤器条件不匹配任何集合文档，所以我们将向集合添加一个新文档。**需要注意的关键点是，_$setOnInsert_将所有字段添加到新文档中。**

4. 使用_findAndModify_方法

我们还可以使用_findAndModify_方法使用_upsert_选项。对于这种方法，默认的_upsert_选项值是_false_。如果我们将_upsert_选项设置为_true_，它将执行与更新方法完全相同的操。

让我们查看一个使用_upsert_选项_true_的_findAndModify_方法的用例：

``` 
db.vehicle.findAndModify(
{
    query: {
        "modelName": "X7"
    },
    update: {
        "$set": {
            "companyName": "Hero Honda"
        }
    },
    "upsert": true,
    "new": true
});
``` 

在这种情况下，上述查询将返回新创建的文档。让我们查看上述查询的Java驱动程序代码：

``` 
FindOneAndUpdateOptions upsertOptions = new FindOneAndUpdateOptions();
  upsertOptions.returnDocument(ReturnDocument.AFTER);
  upsertOptions.upsert(true);
Document resultDocument = collection.findOneAndUpdate(Filters.eq("modelName", "X7"),
  Updates.set("companyName", "Hero Honda"), upsertOptions);
System.out.println("resultDocument:- " + resultDocument);
``` 

在这里，我们首先创建了基于此的过滤器条件，然后我们将更新现有文档或向_vehicle_集合添加一个新文档。

5. 使用_replaceOne_方法

让我们使用_replaceOne_方法执行_upsert_操作。MongoDB的_replaceOne_方法仅在条件匹配时替换集合中的单个文档。

首先，让我们看看替换方法的Mongo shell查询：

``` 
db.vehicle.replaceOne(
{
    "modelName": "GTPR"
},
{
    "modelName": "GTPR",
    "companyName": "Hero Honda",
    "launchYear": 2022,
    "type": "Bike",
    "registeredNo": "EPS 5562"
},
{
    "upsert": true
});
``` 

上述查询将返回以下响应：

``` 
{
    "acknowledged": true,
    "matchedCount": 1,
    "modifiedCount": 1
}
``` 

现在，让我们使用Java驱动程序代码编写上述查询：

``` 
Document replaceDocument = new Document();
replaceDocument.append("modelName", "GTPP")
  .append("companyName", "Hero Honda")
  .append("launchYear", 2022)
  .append("type", "Bike")
  .append("registeredNo", "EPS 5562");
UpdateResult updateReplaceResult = collection.replaceOne(Filters.eq("modelName", "GTPP"), replaceDocument, options);
System.out.println("updateReplaceResult:- " + updateReplaceResult);
``` 

在这种情况下，我们首先需要创建一个新文档，用它来替换现有文档，并且使用_upsert_选项_true_，我们只有在条件匹配时才会替换文档。

6. 结论

在本文中，我们看到了如何使用MongoDB的各种更新方法执行_upsert_操作。首先，我们学习了如何使用_update_和_findAndModify_方法执行_upsert_，然后使用_replaceOne_方法。简而言之，我们使用Mongo shell查询和Java驱动程序代码实现了upsert操作。

所有案例的实现都可以在GitHub上找到。