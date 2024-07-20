---
date: 2024-07-21
category:
  - MongoDB
  - Java
tag:
  - MongoDB
  - Java
  - Update
  - $push
  - $set
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, Update, $push, $set
------
# MongoDB中同一更新操作中的Push和Set操作

## 1. 概述

_$push_ 是 MongoDB 中的一个更新操作符，用于在数组中添加值。相比之下，_$set_ 操作符用于更新文档中现有字段的值。

在这个简短的教程中，我们将介绍如何在单个更新查询中同时执行 _$push_ 和 _$set_ 操作。

## 2. 数据库初始化

在我们开始执行多个更新操作之前，我们首先需要设置一个数据库 _baeldung_ 和示例集合 _marks_：

```javascript
use baeldung;
db.createCollection(marks);
```

让我们使用 MongoDB 的 _insertMany_ 方法向集合 _marks_ 插入一些文档：

```javascript
db.marks.insertMany([
    {
        "studentId": 1023,
        "studentName":"James Broad",
        "joiningYear":"2018",
        "totalMarks":100,
        "subjectDetails":[
            {
                "subjectId":123,
                "subjectName":"Operating Systems Concepts",
                "marks":40
            },
            {
                "subjectId":124,
                "subjectName":"Numerical Analysis",
                "marks":60
            }
        ]
    },
    {
        "studentId": 1024,
        "studentName":"Chris Overton",
        "joiningYear":"2018",
        "totalMarks":110,
        "subjectDetails":[
            {
                "subjectId":123,
                "subjectName":"Operating Systems Concepts",
                "marks":50
            },
            {
                "subjectId":124,
                "subjectName":"Numerical Analysis",
                "marks":60
            }
        ]
    }
]);
```

成功插入后，上述查询将返回以下响应：

```json
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("622300cc85e943405d04b567"),
        ObjectId("622300cc85e943405d04b568")
    ]
}
```

到目前为止，我们已经成功地将一些示例文档插入到集合 _marks_ 中。

## 3. 理解问题

为了理解问题，我们首先需要理解我们刚刚插入的文档。它包括学生详细信息以及他们在不同科目中获得的分数。_totalMarks_ 是在不同科目中获得的分数的总和。

让我们考虑一种情况，我们希望在 _subjectDetails_ 数组中添加一个新的科目。为了使数据一致，我们还需要更新 _totalMarks_ 字段。

在 MongoDB 中，首先我们使用 _$push_ 操作符将新科目添加到数组中。然后我们使用 _$set_ 操作符将 _totalMarks_ 字段设置为特定值。

这两个操作可以使用 _$push_ 和 _$set_ 操作符分别单独执行。但我们可以使用 MongoDB 查询将这两个操作一起执行。

## 4. 使用 MongoDB Shell 查询

在 MongoDB 中，我们可以使用不同的更新操作符更新文档的多个字段。在这里，我们将在 _updateOne_ 查询中一起使用 _$push_ 和 _$set_ 操作符。

让我们看一下包含 _$push_ 和 _$set_ 操作符的示例：

```javascript
db.marks.updateOne(
    {
        "studentId": 1023
    },
    {
        $set: {
            totalMarks: 170
        },
        $push: {
            "subjectDetails":{ 
                "subjectId": 126,
                "subjectName": "Java Programming",
                "marks": 70
            }
        }
    }
);
```

在这里，上述查询中，我们基于 _studentId_ 进行了过滤查询。一旦我们获得过滤后的文档，我们则使用 $set 操作符更新 _totalMarks_。此外，我们使用 _$push_ 操作符将新科目数据插入到 _subjectDetails_ 数组中。

结果，上述查询将返回以下输出：

```json
{
    "acknowledged":true,
    "matchedCount":1,
    "modifiedCount":1
}
```

这里，_matchedCount_ 包含匹配过滤器的文档计数，而 _modifiedCount_ 包含修改的文档数量。

## 5. Java 驱动代码

到目前为止，我们讨论了使用 _$push_ 和 _$set_ 操作符的 mongo shell 查询。这里，我们将学习如何使用 Java 驱动代码实现相同的操作。

在我们继续之前，让我们首先连接到数据库和所需的集合：

```java
MongoClient mongoClient = new MongoClient(new MongoClientURI("localhost", 27017));
MongoDatabase database = mongoClient.getDatabase("baeldung");
MongoCollection`<Document>` collection = database.getCollection("marks");
```

在这里，我们连接到在 localhost 上运行的 MongoDB，默认端口为 27017。

现在，让我们看看 Java 驱动代码：

```java
Document subjectData = new Document()
  .append("subjectId", 126)
  .append("subjectName", "Java Programming")
  .append("marks", 70);
UpdateResult updateQueryResult = collection.updateOne(Filters.eq("studentId", 1023),
  Updates.combine(Updates.set("totalMarks", 170),
  Updates.push("subjectDetails", subjectData)));
```

在这段代码中，我们使用了 _updateOne_ 方法，该方法基于应用的过滤器 _studentId_ 1023 更新单个文档。然后我们使用 _Updates.combine_ 在单个调用中执行多个操作。字段 _totalMarks_ 将更新为 170，并将新的文档 _subjectData_ 推送到数组字段 _“subjectDetails”_。

## 6. 结论

在本文中，我们理解了在单个 MongoDB 查询中一起应用多个操作的用例。进一步地，我们使用 MongoDB shell 查询和 Java 驱动代码执行了相同的操作。

一如既往，所有示例的源代码和代码片段都可以在 GitHub 上找到。