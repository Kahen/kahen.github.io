---
date: 2024-07-21
category:
  - MongoDB
  - Java
tag:
  - MongoDB
  - Java
  - Case Insensitive Sorting
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, Case Insensitive Sorting, Collation, Aggregation
---
# MongoDB中不区分大小写的排序 | Baeldung

1. 概述

默认情况下，MongoDB引擎在排序提取的数据时会考虑字符的大小写。**通过指定聚合(_Aggregations_)或排序规则(_Collations_)，可以执行不区分大小写的排序查询。**

在这个简短的教程中，我们将使用MongoDB Shell和Java来探讨这两种解决方案。

2. 设置环境

首先，我们需要运行一个MongoDB服务器。让我们使用一个Docker镜像：

```shell
$ docker run -d -p 27017:27017 --name example-mongo mongo:latest
```

这将创建一个名为“_example-mongo_”的新临时Docker容器，开放端口_27017_。现在，我们需要创建一个基本的Mongo数据库，其中包含我们需要测试解决方案的数据。

首先，让我们在容器内打开Mongo Shell：

```shell
$ docker exec -it example-mongo mongosh
```

一旦我们进入shell，让我们切换上下文并进入名为“_sorting_”的数据库：

```shell
> use sorting
```

最后，让我们插入一些数据供我们尝试排序操作：

```shell
> db.users.insertMany([
  {name: "ben", surname: "ThisField"},
  {name: "aen", surname: "Does"},
  {name: "Aen", surname: "Not"},
  {name: "Ben", surname: "Matter"},
])
```

我们在一些文档的_name_字段中插入了相似的值。唯一的区别是第一个字母的大小写。此时，数据库已创建并适当插入了数据，所以我们准备开始行动。

3. 默认排序

让我们运行没有定制的标准查询：

```shell
> db.getCollection('users').find({}).sort({name:1})
```

返回的数据将考虑大小写进行排序。这意味着，例如，大写字母“_B”将被认为在小写字母“_a”之前：

```json
[
  {
    _id: ..., name: 'Aen', surname: 'Not'
  },
  {
    _id: ..., name: 'Ben', surname: 'Matter'
  },
  {
    _id: ..., name: 'aen', surname: 'Does'
  },
  {
    _id: ..., name: 'ben', surname: 'ThisField'
  }
]
```

现在让我们来看看如何使我们的排序不区分大小写，以便_Ben_和_ben_会一起出现。

4. Mongo Shell中的不区分大小写的排序

### 4.1. 使用_Collation_排序

让我们尝试使用MongoDB排序规则。仅在MongoDB 3.4及更高版本中可用，它允许使用特定于语言的字符串比较规则。

**排序规则ICU _locale_参数驱动数据库如何进行排序。**让我们使用“_en_”（英语）_locale_：

```shell
> db.getCollection('users').find({}).collation({locale: "en"}).sort({name:1})
```

这将产生按字母聚集的输出：

```json
[
  {
    _id: ..., name: 'aen', surname: 'Does'
  },
  {
    _id: ..., name: 'Aen', surname: 'Not'
  },
  {
    _id: ..., name: 'ben', surname: 'ThisField'
  },
  {
    _id: ..., name: 'Ben', surname: 'Matter'
  }
]
```

### 4.2. 使用_Aggregation_排序

现在让我们使用_Aggregation_函数：

```shell
> db.getCollection('users').aggregate([
    {
      "$project": {
        "name": 1,
        "surname": 1,
        "lowerName": {
          "$toLower": "$name"
        }
      }
    },
    {
      "$sort": {
        "lowerName": 1
      }
    }
])
```

使用_$project_功能，我们添加了一个_lowerName_字段作为_name_字段的小写版本。这允许我们使用该字段进行排序。它将给我们一个包含额外字段的结果对象，按期望的排序顺序排列：

```json
[
  {
    _id: ..., name: 'aen', surname: 'Does', lowerName: 'aen'
  },
  {
    _id: ..., name: 'Aen', surname: 'Not', lowerName: 'aen'
  },
  {
    _id: ..., name: 'ben', surname: 'ThisField', lowerName: 'ben'
  },
  {
    _id: ..., name: 'Ben', surname: 'Matter', lowerName: 'ben'
  }
]
```

5. Java中的不区分大小写的排序

### 5.1. 配置样板代码

让我们首先添加mongo-java-driver依赖项：

```xml
`<dependency>`
    `<groupId>`org.mongodb`</groupId>`
    `<artifactId>`mongo-java-driver`</artifactId>`
    `<version>`3.12.10`</version>`
`</dependency>`
```

然后，让我们使用_MongoClient_进行连接：

```java
MongoClient mongoClient = new MongoClient();
MongoDatabase db = mongoClient.getDatabase("sorting");
MongoCollection```<Document>``` collection = db.getCollection("users");
```

### 5.2. Java中使用_Collation_排序

让我们看看如何在Java中实现“_Collation_”解决方案：

```java
FindIterable```<Document>``` nameDoc = collection.find().sort(ascending("name"))
  .collation(Collation.builder().locale("en").build());
```

在这里，我们使用“_en_”locale构建了排序规则。然后，我们将创建的_Collation_对象传递给_FindIterable_对象的_collation_方法。

接下来，让我们使用_MongoCursor_逐个读取结果：

```java
MongoCursor cursor = nameDoc.cursor();
List expectedNamesOrdering = Arrays.asList("aen", "Aen", "ben", "Ben", "cen", "Cen");
List actualNamesOrdering = new ArrayList<>();
while (cursor.hasNext()) {
    Document document = cursor.next();
    actualNamesOrdering.add(document.get("name").toString());
}
assertEquals(expectedNamesOrdering, actualNamesOrdering);
```

### 5.3. Java中使用_Aggregations_排序

我们还可以使用_Aggregation_对集合进行排序。让我们使用Java API重新创建我们的命令行版本。

首先，我们依赖于_project_方法来创建一个_Bson_对象。这个对象还将包括通过使用_Projection_类将名称中的每个字符转换为小写来计算的_lowerName_字段：

```java
Bson projectBson = project(
  Projections.fields(
    Projections.include("name","surname"),
    Projections.computed("lowerName", Projections.computed("$toLower", "$name"))
));
```

接下来，我们将_aggregate_方法与包含前面代码片段中_Bson_的对象的列表以及_sort_方法一起提供：

```java
AggregateIterable```<Document>``` nameDoc = collection.aggregate(
  Arrays.asList(projectBson,
  sort(Sorts.ascending("lowerName")))
);
```

在这种情况下，就像前一个例子一样，我们可以很容易地使用_MongoCursor_读取结果。

6. 结论

在本文中，我们看到了如何对MongoDB集合进行简单的不区分大小写的排序。

我们在MongoDB shell中使用了_Aggregation_和_Collation_方法。最后，我们翻译了这些查询，并提供了一个简单的Java实现，使用_mongo-java-driver_库。

如往常一样，文章的完整源代码可在GitHub上找到。