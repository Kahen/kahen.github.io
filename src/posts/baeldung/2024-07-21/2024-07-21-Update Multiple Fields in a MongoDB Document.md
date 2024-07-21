---
date: 2022-04-01
category:
  - MongoDB
  - Java
tag:
  - MongoDB
  - Java
  - 更新
  - 文档
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, 更新, 文档
------
# 更新 MongoDB 文档中的多个字段

MongoDB 是一个公开可用的面向文档的 NoSQL 数据库。我们可以使用各种方法如 _update_、_replace_ 和 _save_ 来更新集合中的文档。为了更改文档的特定字段，我们将使用不同的操作符如 _$set_、_$inc_ 等。

在本教程中，我们将学习如何使用 _update_ 和 _replace_ 查询来修改文档的多个字段。为了演示目的，我们首先讨论 mongo shell 查询，然后是其在 Java 中的对应实现。

让我们现在看看实现目的的各种方法。

### 2.1. 更新单个文档的多个字段
我们可以使用 _$set_ 和 _$inc_ 操作符来更新 MongoDB 中的任何字段。_$set_ 操作符将设置新指定的值，而 _$inc_ 操作符将按指定值增加值。

让我们首先看看使用 _$set_ 操作符更新员工集合中两个字段的 MongoDB 查询：

```javascript
db.employee.updateOne(
    {
        "employee_id": 794875,
        "employee_name": "David Smith"
    },
    {
        $set:{
            department_id:3,
            job:"Sales Manager"
        }
    }
);
```

在上面的查询中，使用 _employee_id_ 和 _employee_name_ 字段来过滤文档，并使用 _$set_ 操作符来更新 _job_ 和 _department_id_ 字段。

我们也可以在单个更新查询中一起使用 _$set_ 和 _$inc_ 操作符：

```javascript
db.employee.updateOne(
    {
        "employee_id": 794875
    },
    {
        $inc: {
            department_id: 1,
        },
        $set: {
            job: "Sales Manager"
        }
    }
);
```

这将把 _job_ 字段更新为 Sales Manager 并将 _department_id_ 增加 1。

### 2.2. 更新多个文档的多个字段
此外，我们还可以更新 MongoDB 中多个文档的多个字段。我们只需要在修改所有匹配过滤查询条件的文档时包含选项 _multi:true_：

```javascript
db.employee.update(
    {
        "job": "Sales Representative"
    },
    {
        $inc: {
            salary: 10000
        },
        $set: {
            department_id: 5
        }
    },
    {
        multi: true
    }
);
```

或者，我们可以使用 _updateMany_ 查询得到相同的结果：

```javascript
db.employee.updateMany(
    {
        "job": "Sales Representative"
    },
    {
        $inc: {
            salary: 10000
        },
        $set: {
            department_id: 5
        }
    }
);
```

在上面的查询中，我们使用 _updateMany_ 方法更新集合中的多个文档。

### 2.3. 更新多个字段时的常见问题
到目前为止，我们已经学会了如何使用更新查询通过提供两个不同的操作符或在多个字段上使用单个操作符来更新多个字段。

现在，如果我们在单个查询中多次使用不同的字段的同一个操作符，**MongoDB 只会更新更新查询的最后一个语句**并忽略其余部分：

```javascript
db.employee.updateMany(
    {
        "employee_id": 794875
    },
    {
        $set: {
            department_id: 3
        },
        $set: {
            job:"Sales Manager"
        }
    }
);
```

上述查询将返回类似于此的输出：

```json
{
    "acknowledged":true,
    "matchedCount":1,
    "modifiedCount":1
}
```

在这种情况下，只有 _job_ 将被更新为 “Sales Manager”。_department_id_ 的值将不会被更新为 3。

## 3. 使用 Java 驱动程序更新字段
到目前为止，我们已经讨论了原始的 MongoDB 查询。现在让我们使用 Java 来执行相同的操作。MongoDB Java 驱动程序支持两个类来表示 MongoDB 文档，_com.mongodb.BasicDBObject_ 和 _org.bson.Document_。我们将看看使用这两种方法来更新文档中的字段。

在我们继续之前，让我们首先连接到 _baeldung_ DB 中的 _employee_ 集合：

```java
MongoClient mongoClient = new MongoClient(new MongoClientURI("localhost", 27017);
MongoDatabase database = mongoClient.getDatabase("baeldung");
MongoCollection`<Document>` collection = database.getCollection("employee");
```

这里我们假设 MongoDB 在默认端口 27017 上本地运行。

### 3.1. 使用 _DBObject_
为了在 MongoDB 中创建文档，我们将使用 _com.mongodb._ DBObject 接口及其实现类 _com.mongodb.BasicDBObject_。

_DBObject_ 的实现基于键值对。**_BasicDBObject_ 继承自 _util_ 包中的 _LinkedHashMap_ 类。**

现在让我们使用 _com.mongodb.BasicDBObject_ 来执行多个字段的更新操作：

```java
BasicDBObject searchQuery = new BasicDBObject("employee_id", 794875);
BasicDBObject updateFields = new BasicDBObject();
updateFields.append("department_id", 3);
updateFields.append("job", "Sales Manager");
BasicDBObject setQuery = new BasicDBObject();
setQuery.append("$set", updateFields);
UpdateResult updateResult = collection.updateMany(searchQuery, setQuery);
```

在这里，首先我们基于 _employee_id_ 创建了一个过滤查询。此操作将返回一组文档。进一步，我们根据设置查询更新了 _department_id_ 和 _job_ 的值。

### 3.2. 使用 _bson_ 文档
我们可以使用 _bson_ 文档执行所有 MongoDB 操作。为此，首先需要集合对象，然后使用 _updateMany_ 方法和 _filter_ 和 _set_ 函数执行更新操作。

```java
UpdateResult updateQueryResult = collection.updateMany(Filters.eq("employee_id", 794875),
    Updates.combine(Updates.set("department_id", 3), Updates.set("job", "Sales Manager")));
```

在这里，我们向 _updateMany_ 方法传递了一个查询过滤器。_eq_ 过滤器匹配 _employee_id_ 与精确匹配文本 ‘794875’。然后，我们使用 _set_ 操作符更新 _department_id_ 和 _job_。

## 4. 使用 Replace 查询
更新文档的多个字段的简单方法是用具有更新值的新文档替换它。

例如，如果我们希望替换 _employee_id_ 为 794875 的文档，我们可以执行以下查询：

```javascript
db.employee.replaceOne(
    {
        "employee_id": 794875
    },
    {
        "employee_id": 794875,
        "employee_name": "David Smith",
        "job": "Sales Manager",
        "department_id": 3,
        "salary": 30000,
        "hire_date": NumberLong("1643969311817")
    }
);
```

上述命令将在输出中打印确认 JSON：

```json
{
    "acknowledged":true,
    "matchedCount":1,
    "modifiedCount":1
}
```

在这里，使用 _employee_id_ 字段来过滤文档。更新查询的第二个参数表示从现有文档将被替换的文档。

在上面的查询中，我们正在执行 _replaceOne_，因此，它将仅用该过滤器替换单个文档。或者，如果我们想用该过滤器查询替换所有文档，则需要使用 _updateMany_ 方法。

## 5. 结论
在本文中，我们探讨了在 MongoDB 中更新文档的多个字段的各种方法。我们广泛讨论了两种实现，使用 MongoDB shell 和使用 Java 驱动程序。

更新文档的多个字段有各种选项，包括 _$inc_ 和 _$set_ 操作符。

所有这些示例和代码片段的实现都可以在 GitHub 上找到。