---
date: 2024-07-21
category:
  - MongoDB
  - 数据库
tag:
  - MongoDB
  - 更新文档
  - Java
head:
  - - meta
    - name: keywords
      content: MongoDB, 更新文档, Java
------
# MongoDB中更新文档 | Baeldung

## 1. 概述

MongoDB 是一个跨平台的、面向文档的开源 NoSQL 数据库，用 C++ 编写。此外，MongoDB 提供高性能、高可用性和自动扩展。

为了在 MongoDB 中更新文档，我们可以使用不同的方法，如 _updateOne_、_findOneAndUpdate_ 等。此外，MongoDB 为更新方法提供了各种操作符。

在本教程中，我们将讨论在 MongoDB 中执行更新操作的不同方法。对于每种方法，我们将首先讨论 mongo shell 查询，然后是其在 Java 中的实现。

## 2. 数据库设置

在我们继续更新查询之前，让我们首先创建一个数据库 _baeldung_ 和一个示例集合 _student_：
``` 
use baeldung;
db.createCollection(student);
```

作为示例，让我们使用 _insertMany_ 查询向集合 _student_ 中添加一些文档：
``` 
db.student.insertMany([
    {
        "student_id": 8764,
        "student_name": "Paul Starc",
        "address": "Hostel 1",
        "age": 16,
        "roll_no":199406
    },
    {
        "student_id": 8765,
        "student_name": "Andrew Boult",
        "address": "Hostel 2",
        "age": 18,
        "roll_no":199408
    }
]);
```

成功插入后，我们将得到一个带有 _acknowledged:true_ 的 JSON：
``` 
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("621b078485e943405d04b557"),
ObjectId("621b078485e943405d04b558")
    ]
}
```

现在让我们深入了解在 MongoDB 中更新文档的不同方式。

## 3. 使用 _updateOne_ 方法

在 MongoDB 中的更新操作可以通过添加一个新字段、删除一个字段或更新一个现有字段来完成。_updateOne_ 方法根据应用的查询过滤器更新集合中的单个文档。它首先找到匹配过滤器的文档，然后更新指定的字段。

此外，**我们可以使用不同的操作符如 _$set_、_$unset_、_$inc_ 等，与更新方法一起使用。**

为了演示，让我们看看更新集合中的单个文档的查询：
``` 
db.student.updateOne(
    {
        "student_name" : "Paul Starc"
    },
    {
        $set: {
            "address" : "Hostel 2"
        }
    }
 );
```

我们将得到类似于下面显示的输出：
``` 
{
    "acknowledged":true,
    "matchedCount":1,
    "modifiedCount":1
}
```

现在让我们看看上述 _updateOne_ 查询的 Java 驱动代码：
``` 
UpdateResult updateResult = collection.updateOne(Filters.eq("student_name", "Paul Starc"),
Updates.set("address", "Hostel 2"));
```

在这里，我们首先使用 _student_name_ 字段来过滤文档。然后我们更新 _student_name_ “Paul Starc” 的文档的地址。

## 4. 使用 _updateMany_ 方法

_updateMany_ 方法更新 MongoDB 集合中所有匹配给定过滤器的文档。**使用 _updateMany_ 的好处之一是我们可以更新多个文档而不会丢失旧文档的字段。**

让我们看看使用 _updateMany_ 方法的 MongoDB shell 查询：
``` 
db.student.updateMany(
    {
        age: {
            $lt: 20
         }
    },
    {
        $set:{
            "Review" : true
        }
    }
);
```

上述命令将返回以下输出：
``` 
{
    "acknowledged":true,
    "matchedCount":2,
    "modifiedCount":2
}
```

在这里，_matchedCount_ 包含匹配文档的数量，而 _modifiedCount_ 包含修改的文档数量。

现在让我们看看使用 _updateMany_ 方法的 Java 驱动代码：
``` 
UpdateResult updateResult = collection.updateMany(Filters.lt("age", 20), Updates.set("Review", true));
```

在这里，所有 _age_ 小于 20 的文档将被过滤，并将 _Review_ 字段设置为 _true_。

## 5. 使用 _replaceOne_ 方法

MongoDB 的 _replaceOne_ 方法替换整个文档。**使用 _replaceOne_ 的一个缺点是所有旧字段将被新字段替换，旧字段也会丢失：**
``` 
db.student.replaceOne(
    {
        "student_id": 8764
    },
    {
        "student_id": 8764,
        "student_name": "Paul Starc",
        "address": "Hostel 2",
        "age": 18,
        "roll_no":199406
    }
);
```

在这种情况下，我们将得到以下输出：
``` 
{
    "acknowledged":true,
    "matchedCount":1,
    "modifiedCount":1
}
```

如果没有找到匹配项，操作将返回 _matchedCount_ 为 0：
``` 
{
    "acknowledged":true,
    "matchedCount":0,
    "modifiedCount":0
}
```

现在让我们编写使用 _replaceOne_ 方法的相应 Java 驱动代码：
``` 
Document replaceDocument = new Document();
replaceDocument
  .append("student_id", 8764)
  .append("student_name", "Paul Starc")
  .append("address", "Hostel 2")
  .append("age",18)
  .append("roll_no", 199406);
UpdateResult updateResult = collection.replaceOne(Filters.eq("student_id", 8764), replaceDocument);
```

在上面的代码中，我们创建了一个文档，旧文档将被该文档替换。具有 _student_id_ 8764 的文档将被新创建的文档替换。

## 6. 使用 _findOneAndReplace_ 方法

_findOneAndReplace_ 方法是 MongoDB 提供的一种高级更新方法，它根据给定的选择标准替换第一个匹配的文档。默认情况下，此方法返回原始文档。我们可以使用 _findOneAndReplace_ 的不同选项对文档进行排序和投影（如果需要）。

简而言之，_findOneAndReplace_ 根据应用的过滤器替换集合中的第一个匹配文档：
``` 
db.student.findOneAndReplace(
    {
        "student_id" : {
            $eq : 8764
        }
    },
    {
        "student_id" : 8764,
        "student_name" : "Paul Starc",
        "address": "Hostel 2",
        "age": 18,
        "roll_no":199406
    },
    {
        returnNewDocument: false
    }
);
```

此查询将返回以下文档：
``` 
{
    "student_id":8764,
    "student_name":"Paul Starc",
    "address":"Hostel 1",
    "age":16,
    "roll_no":199406
}
```

如果我们将 _returnNewDocument_ 设置为 _true_，则操作将返回替换后的文档：
``` 
{
    "student_id":8764,
    "student_name":"Paul Starc",
    "address":"Hostel 2",
    "age":18,
    "roll_no":199406
}
```

现在让我们使用 _findOneAndReplace_ 方法在返回的文档中投影 _student_id_ 和 _age_ 字段：
``` 
db.student.findOneAndReplace(
    {
        "student_id" : {
        $eq : 8764
        }
    },
    {
        "student_id" : 8764,
        "student_name" : "Paul Starc",
        "address": "Hostel 2",
        "age": 18,
        "roll_no":199406
    },
    {
        projection: {
            "_id" : 0,
            "student_id":1,
            "age" : 1
        }
    }
);
```

上述查询的输出将仅包含投影字段：
``` 
{
    "student_id":"8764",
    "age":16
}
```

上述查询的各种选项的 Java 驱动代码：
``` 
Document replaceDocument = new Document();
replaceDocument
  .append("student_id", 8764)
  .append("student_name", "Paul Starc")
  .append("address", "Hostel 2")
  .append("age", 18)
  .append("roll_no", 199406);
Document sort = new Document("roll_no", 1);
Document projection = new Document("_id", 0).append("student_id", 1).append("address", 1);
Document resultDocument = collection.findOneAndReplace(
  Filters.eq("student_id", 8764),
  replaceDocument,
  new FindOneAndReplaceOptions().upsert(true``` 
).sort(sort).projection(projection).returnDocument(ReturnDocument.AFTER));
```

在上面的查询中，_findOneAndReplace_ 方法将首先根据 _roll_no_ 升序排序文档，然后新创建的文档将替换具有 _student_id_ “8764” 的文档。

## 7. 使用 _findOneAndUpdate_ 方法

_findOneAndUpdate_ 方法更新集合中的第一个匹配文档。如果多个文档匹配选择标准，则只更新第一个匹配的文档。当我们更新文档时，_\_id_ 字段的值保持不变：
``` 
db.student.findOneAndUpdate(
    {
        "student_id" : 8764
    },
    {
        $inc : {
            "roll_no" : 5
        }
    },
    {
        sort: {
            "roll_no" : 1
        },
        projection: {
            "_id" : 0,
            "student_id":1,
            "address" : 1
        }
    }
);
```

查询的输出将只包含旧文档的 _studentId_ 和 _address_：
``` 
{
    "student_id":8764,
    "address":"Hostel 1"
}
```

上述查询的不同选项的 _findOneAndUpdate_ 的 Java 驱动代码如下：
``` 
Document sort = new Document("roll_no", 1);
Document projection = new Document("_id", 0).append("student_id", 1).append("address", 1);
Document resultDocument = collection.findOneAndUpdate(
  Filters.eq("student_id", 8764),
  Updates.inc("roll_no", 5),
  new FindOneAndUpdateOptions().sort(sort).projection(projection).returnDocument(ReturnDocument.BEFORE));
```

在这种情况下，_findOneAndUpdate_ 方法将首先根据 _roll_no_ 升序排序文档。上述查询将 _roll_no_ 增加 5，然后返回 _student_id_ 和 _address_ 字段。

## 8. 结论

在本文中，我们看到了在 MongoDB 中更新文档的各种方式。首先，我们查看了 MongoDB shell 查询，然后我们讨论了相应的 Java 驱动代码。

所有这些示例和代码片段的实现都可以在 GitHub 上找到。

OK