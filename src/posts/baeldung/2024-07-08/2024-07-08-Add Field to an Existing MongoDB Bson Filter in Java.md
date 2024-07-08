---
date: 2024-07-08
category:
  - MongoDB
  - Java
tag:
  - BSON
  - Filter
  - Java Driver
head:
  - - meta
    - name: MongoDB BSON Filter
      content: 介绍如何在Java中使用MongoDB的BSON过滤器添加字段。
---

# 在Java中向现有MongoDB BSON过滤器添加字段

MongoDB是一个流行的分布式、开源的NoSQL文档存储引擎。它基本上是一个将数据存储在称为BSON（二进制JavaScript对象表示）的JSON格式类型的数据库。MongoDB中以BSON数据存储的文档被组织成集合。

在本教程中，我们将讨论可以用于向现有MongoDB BSON过滤器添加字段的不同方法。然后，我们将使用MongoDB Java驱动程序来检查它们的相应实现。

## 2. 数据库初始化

在我们继续之前，让我们首先创建一个新的数据库和一个示例集合。我们将使用这些来演示我们所有的代码示例。

让我们创建一个名为_baeldung_的数据库：

```java
use baeldung;
```

这条命令将为我们创建一个新的空数据库_baeldung_，如果它还不存在的话。

进一步地，让我们在新创建的数据库中创建一个名为_pet_的集合：

```java
db.createCollection("pet");
```

有了这个，我们的示例_baeldung_数据库和_pet_集合就成功设置好了。

最后，让我们向_pet_集合添加一些示例数据：

```java
db.pet.insertMany([
{
    "petId":"P1",
    "name":"Tom",
    "age":3,
    "type":"Cat",
    "gender": "Female"
},
{
    "petId":"P2",
    "name":"Max",
    "age":4,
    "type":"Dog",
    "gender": "Male"
},
{
    "petId":"P3",
    "name":"Milo",
    "age":8,
    "type":"Dog",
    "gender": "Male"
}]);
```

上述脚本成功插入后将返回一个JSON结果：

```json
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("64007c0a2b07cc62bfe6accc"),
        ObjectId("64007c0a2b07cc62bfe6accd"),
        ObjectId("64007c0a2b07cc62bfe6acce")
    ]
}
```

现在让我们深入理解如何向现有BSON过滤器添加字段。

我们将使用_Filters_构建器向现有_Filter_添加字段。构建器是由MongoDB Java驱动程序提供的类，将帮助我们构建BSON对象。

_Filters_类在Java中提供了所有MongoDB查询操作符的静态工厂方法。这些方法中的每一个都将返回一个_Bson_类型的实例。然后我们可以将这个_Bson_对象传递给任何期望查询过滤器的方法。

请注意，由于_Filter_是不可变的，我们不能直接编辑它们。我们将不得不使用一些过滤器操作符通过应用现有过滤器来创建一个新的_Bson_ _Filter_。

具体来说，我们将使用_Filters.and()_方法执行添加操作。**_Filters.and()_方法基本上创建了一个过滤器，它对提供的过滤器列表执行逻辑AND操作。**

我们可以通过以下两种方式实现这一点：

1. 使用_BsonDocument_
2. 使用_Filters_

现在让我们深入每种方法。

### 3.1. 使用_BsonDocument_

通过这种方法，我们将首先将现有的_Bson_过滤器转换为_BsonDocument_。然后，我们将向这个_BsonDocument_添加所需的字段。

首先，假设我们有一个过滤器，它返回所有_pet_集合中类型为“Dog”的文档：

```java
Bson existingFilter = eq("type", "Dog");
BsonDocument existingBsonDocument = existingFilter.toBsonDocument(BsonDocument.class, MongoClient.getDefaultCodecRegistry());
```

我们已将过滤器转换为_BsonDocument_类型。

其次，假设我们现在想要向此过滤器添加一个字段，使得宠物的年龄超过5岁。我们将为此字段创建一个_Bson_过滤器，并将其转换为一个_BsonDocument_对象：

```java
Bson newFilter = gt("age", 5);
BsonDocument newBsonDocument = newFilter.toBsonDocument(BsonDocument.class, MongoClient.getDefaultCodecRegistry());
```

最后，我们将新字段附加到现有的_BsonDocument_：

```java
existingBsonDocument.append("age", newBsonDocument.get("age"));

FindIterable``````<Document>`````` documents = collection.find(existingBsonDocument);

MongoCursor``````<Document>`````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

_BsonDocument.append()_方法接受一个键和一个_BsonValue_，然后将它们附加到现有的_BsonDocument_。然后我们可以使用生成的_BsonDocument_从MongoDB集合中查询文档。

### 3.2. 使用_Filters_

这种方法直接使用_Filters_添加字段，而不需要先将它们转换为_BsonDocument_。

假设我们有一个过滤器，它返回所有_pet_集合中类型为“Dog”且性别为“Male”的文档：

```java
Bson existingFilter = and(eq("type", "Dog"), eq("gender", "Male"));
FindIterable``````<Document>`````` documents = collection.find(existingFilter);

MongoCursor``````<Document>`````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

上述代码片段将打印出所有符合我们条件的_pet_集合文档：

```json
Document{_id=64007c0a2b07cc62bfe6accd, petId=P2, name=Max, age=4.0, type=Dog, gender=Male}
Document{_id=64007c0a2b07cc62bfe6acce, petId=P3, name=Milo, age=8.0, type=Dog, gender=Male}
```

假设我们现在想要修改这个过滤器，添加一个条件，使得宠物的年龄大于5岁。我们使用_Filters.and()_方法，它接受现有的过滤器和要添加的新字段作为参数。

让我们看看Java实现代码：

```java
Bson existingFilter = and(eq("type", "Dog"), eq("gender", "Male"));

Bson newFilter = and(existingFilter, gt("age", 5));
FindIterable``````<Document>`````` documents = collection.find(newFilter);

MongoCursor``````<Document>`````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

上述代码片段将通过向现有过滤器添加所需字段的条件来创建一个新的_Bson_过滤器。我们可以使用新字段以及MongoDB中的任何可用过滤器操作符。现在，代码片段将打印出所有_type_等于“Dog”，_gender_等于“Male”，并且_age_大于5的_pet_集合文档：

```json
Document{_id=64007c0a2b07cc62bfe6acce, petId=P3, name=Milo, age=8.0, type=Dog, gender=Male}
```

这是向现有_Bson_ _Filter_添加字段的最方便的方法。

## 4. 结论

在本文中，我们看到了向现有_Bson_ _Filter_添加字段的各种方式。然后，我们使用相应的Java驱动程序代码实现讨论了这些用例。

使用Java驱动程序代码，我们首先查看了使用_BsonDocument_类的实现。然后，我们学习了如何直接使用_Filters_类来实现相同的操作。

如常，所有示例的完整代码都可以在GitHub上找到。

[![Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)](https://www.baeldung.com)
[![Gravatar Image](https://secure.gravatar.com/avatar/8761915a15b52dde955019cbd6ba4312?s=50&r=g)](https://www.baeldung.com/)
[![Gravatar Image](https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&r=g)](https://www.baeldung.com/)
[![Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)](https://www.baeldung.com/)
[![Baeldung Persistence Post Footer](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg)](https://www.baeldung.com/)
[![Baeldung Persistence Post Footer Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png)](https://www.baeldung.com/)

OK