---
date: 2024-07-21
category:
  - MongoDB
  - 数据库
tag:
  - MongoDB
  - 数据库操作
head:
  - - meta
    - name: keywords
      content: MongoDB, 数据库, 数组操作, $push, $addToSet
---
# MongoDB中的Push操作 | Baeldung

在本教程中，我们将介绍如何在MongoDB中向数组中插入文档。此外，我们还将看到使用_$push和_$addToset_操作符将值添加到数组中的各种应用。

首先，我们将创建一个示例数据库、一个集合，并将虚拟数据插入其中。接下来，我们将看一些基本示例，使用_$push_操作符更新文档。之后，我们还将讨论_$push_和_$addtoSet_操作符的各种用例。

让我们深入探讨在MongoDB中将文档插入数组的多种方法。

### 2. 数据库初始化

首先，让我们设置一个新的数据库_baeldung_和一个示例集合_orders_：

``` 
use baeldung;
db.createCollection(orders);
```

现在，让我们使用_insertMany_方法将一些文档添加到集合中：

``` 
db.orders.insertMany([
    {
        "customerId": 1023,
        "orderTimestamp": NumberLong("1646460073000"),
        "shippingDestination": "336, Street No.1 Pawai Mumbai",
        "purchaseOrder": 1000,
        "contactNumber":"9898987676",
        "items": [
            {
                "itemName": "BERGER",
                "quantity": 1,
                "price": 500
            },
            {
                "itemName": "VEG PIZZA",
                "quantity": 1,
                "price": 800
            }
        ]
    },
    {
        "customerId": 1027,
        "orderTimestamp": NumberLong("1646460087000"),
        "shippingDestination": "445, Street No.2 Pawai Mumbai",
        "purchaseOrder": 2000,
        "contactNumber":"9898987676",
        "items": [
            {
               "itemName": "BERGER",
               "quantity": 1,
               "price": 500
            },
            {
               "itemName": "NON-VEG PIZZA",
               "quantity": 1,
               "price": 1200
            }
        ]
    }
]);
```

如果插入成功，上述命令将打印出类似于下面显示的JSON：

``` 
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("622300cc85e943405d04b567"),
ObjectId("622300cc85e943405d04b568")
    ]
}
```

到目前为止，我们已经成功设置了数据库和集合。我们将在所有示例中使用这个数据库和集合。

### 3. 使用Mongo查询进行Push操作

MongoDB提供了各种类型的数组操作符来更新MongoDB文档中的数组。**MongoDB中的_$push_操作符将值追加到数组的末尾。**根据查询的类型，我们可以与_updateOne_、_updateMany_、_findAndModify_等方法一起使用_$push_操作符。

现在让我们来看看使用_$push_操作符的shell查询：

``` 
db.orders.updateOne(
    {
        "customerId": 1023
    },
    {
        $push: {
            "items":{
                "itemName": "PIZZA MANIA",
                "quantity": 1,
                "price": 800
            }
        }
    });
```

上述查询将返回以下文档：

``` 
{
    "acknowledged":true,
    "matchedCount":1,
    "modifiedCount":1
}
```

现在让我们检查_customerId_为1023的文档。在这里，我们可以看到新项目被插入到列表“_items_”的末尾：

``` 
{
    "customerId" : 1023,
    "orderTimestamp" : NumberLong("1646460073000"),
    "shippingDestination" : "336, Street No.1 Pawai Mumbai",
    "purchaseOrder" : 1000,
    "contactNumber" : "9898987676",
    "items" : [
        {
            "itemName" : "BERGER",
            "quantity" : 1,
        "price" : 500
        },
    {
        "itemName" : "VEG PIZZA",
        "quantity" : 1,
        "price" : 800
    },
    {
        "itemName" : "PIZZA MANIA",
        "quantity" : 1,
        "price" : 800
    }
]
}
```

### 4. 使用Java驱动代码进行Push操作

到目前为止，我们已经讨论了将文档推送到数组中的MongoDB shell查询。现在让我们使用Java代码实现推送更新查询。

在执行更新操作之前，让我们首先连接到_baeldung_数据库中的_orders_集合：

``` 
mongoClient = new MongoClient("localhost", 27017);
MongoDatabase database = mongoClient.getDatabase("baeldung");
MongoCollection`<Document>` collection = database.getCollection("orders");
```

在这种情况下，我们连接到在localhost上的默认端口27017上运行的MongoDB。

#### 4.1. 使用_DBObject_

MongoDB Java驱动程序支持_DBObject_和_BSON_文档。在这里，_DBObject_是MongoDB旧版驱动程序的一部分，但在MongoDB的较新版本中**已弃用**。

现在让我们来看看使用Java驱动程序将新值插入数组的代码：

``` 
DBObject listItem = new BasicDBObject("items", new BasicDBObject("itemName", "PIZZA MANIA")
  .append("quantity", 1)
  .append("price", 800));
BasicDBObject searchFilter = new BasicDBObject("customerId", 1023);
BasicDBObject updateQuery = new BasicDBObject();
updateQuery.append("$push", listItem);
UpdateResult updateResult = collection.updateOne(searchFilter, updateQuery);
```

在上面的查询中，我们首先使用_BasicDBObject_创建了项目文档。根据_searchQuery_，将过滤集合中的文档，并将值推送到数组中。

#### 4.2. 使用_BSON_文档

_BSON_文档是在Java中访问MongoDB文档的新方式，它是基于较新的客户端堆栈构建的。_org.bson.Document_类更简单，更易于使用。

让我们使用_org.bson.Document_类将值推送到数组“_items_”中：

``` 
Document item = new Document()
  .append("itemName1", "PIZZA MANIA")
  .append("quantity", 1).append("price", 800);
UpdateResult updateResult = collection.updateOne(Filters.eq("customerId", 1023), Updates.push("items", item));
```

在这种情况下，_BSON_的实现与使用_DBObject_运行的代码类似，更新也将是相同的。在这里，我们使用_updateOne_方法仅更新单个文档。

### 5. 使用_addToSet_操作符

_$addToSet_操作符也可以用来推送数组中的值。这个操作符只有在数组中不存在该值时才会添加。否则，它只会忽略它。而push操作符将不考虑任何其他条件地将值推送到数组中。

**一个关键点是要注意，_$addToSet_操作符在处理重复项目时不会推送值。**另一方面，_push操作符_会将值推送到数组中，不管任何其他条件。

#### 5.1. 使用_addToSet_操作符的Shell查询

_$addToSet_操作符的mongo shell查询类似于_$push_操作符，但_$addToSet_不会在数组中插入重复的值。

现在让我们来看看使用_$addToSet_将值推送到数组中的MongoDB查询：

``` 
db.orders.updateOne(
    {
        "customerId": 1023
    },
    {
        $addToSet: {
            "items":{
                "itemName": "PASTA",
                "quantity": 1,
                "price": 1000
            }
        }
    });
```

在这种情况下，输出将是如下所示：

``` 
{
    "acknowledged":true,
    "matchedCount":1,
    "modifiedCount":1
}
```

在这种情况下，我们使用了_$addToSet_操作符，只有当它是唯一的，文档才会被推送到数组“items”。

#### 5.2. 使用_addToSet_操作符的Java驱动

_$addToSet_操作符提供了与push操作符不同的数组更新操作：

``` 
Document item = new Document()
  .append("itemName1", "PIZZA MANIA")
  .append("quantity", 1).append("price", 800);
UpdateResult updateResult = collection
  .updateOne(Filters.eq("customerId", 1023), Updates.addToSet("items", item));
System.out.println("updateResult:- " + updateResult);
```

在上述代码中，我们首先创建了文档“_item_”，然后基于_customerId_过滤器，_updateOne_方法将尝试将文档“_item_”推送到数组“_items_”。

### 6. 结论

在本文中，我们学习了如何使用_$push和$addToSet_操作符将新值推送到数组中。首先，我们查看了MongoDB shell查询中_$push_操作符的使用，然后我们讨论了相应的Java驱动代码。

所有案例的实现都可以在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png)

OK