---
date: 2024-07-14
category:
  - Java
  - MongoDB
tag:
  - MongoDB Shell
  - Java Driver
  - Document
  - Array
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, Array, Document, NoSQL
---
# MongoDB中在对象内插入数组 | Baeldung

MongoDB 是最受欢迎的开源分布式文档导向型NoSQL数据库。MongoDB中的一个文档是一个具有字段和值对的JSON类对象的数据结构。

为了将文档插入MongoDB集合中，我们可以使用不同的方法，如_insert()_、_insertOne()_和_insertMany()_。

本教程将讨论如何在MongoDB文档中插入数组。首先，我们将查看如何使用MongoDB Shell查询将数组插入文档。然后，我们将使用MongoDB Java驱动程序代码。

## 2. 数据库初始化

在我们继续插入查询之前，让我们首先创建一个数据库。让我们称它为_baeldung_。我们还将创建一个名为_student_的示例集合：

```shell
use baeldung;
db.createCollection(student);
```

通过这个命令，我们的示例_baeldung_数据库和_student_集合已成功设置。我们将在所有示例中使用它们。

## 3. 使用MongoDB Shell

**要使用MongoDB Shell将数组插入集合，我们可以简单地将数组作为JSON数组类型传递给shell：**

```shell
db.student.insert({
    "studentId" : "STU1",
    "name" : "Avin",
    "Age" : 12,
    "courses" : ["Science", "Math"]
});
```

上述查询在_student_集合中插入了一个带有数组的单个文档。我们可以通过使用_find_操作符查询_student_集合中的文档来验证结果：

```shell
db.student.find();
```

上述查询返回插入的_student_集合文档：

```json
{
    "_id" : ObjectId("631da4197581ba6bc1d2524d"),
    "studentId" : "STU1",
    "name" : "Avin",
    "Age" : 12,
    "courses" : [ "Science", "Math" ]
}
```

## 4. 使用Java驱动程序代码进行插入操作

MongoDB Java驱动程序提供了各种便捷的方法来帮助我们将文档插入集合：

- _insert()_ – 向集合中插入单个文档或多个文档
- _insertOne()_ – 向集合中插入单个文档
- _insertMany()_ – 向集合中插入多个文档

上述任何方法都以用来对MongoDB集合执行_insert_操作。

接下来，让我们深入了解使用Java MongoDB驱动程序实现数组插入操作。MongoDB Java驱动程序支持_DBObject_和_BSON_文档。

## 5. 使用_DBObject_

这里，**_DBObject_是MongoDB旧版驱动程序的一部分，但在较新的MongoDB版本中已被弃用。**

让我们将一个带有数组的_DBObject_文档插入到_student_集合中：

```java
BasicDBList coursesList = new BasicDBList();
coursesList.add("Chemistry");
coursesList.add("Science");

DBObject student = new BasicDBObject().append("studentId", "STU1")
  .append("name", "Jim")
  .append("age", 13)
  .append("courses", coursesList);

dbCollection.insert(student);
```

上述查询将一个带有数组的_DBObject_文档插入到_student_集合中。

## 6. 使用_BSON_文档

_BSON_文档是在Java中访问MongoDB文档的新方式，并且是使用较新的客户端堆栈构建的。幸运的是，它也更易于使用。

**Java驱动程序提供了一个_org.bson.Document_类，用于将一个_Bson_文档对象带有数组插入到_student_集合中。**

### 6.1. 插入一个带有数组的单个文档

首先，让我们使用_insertOne()_方法将一个带有数组的单个文档插入到集合中：

```java
List```<String>``` coursesList = new ArrayList<>();
coursesList.add("Science");
coursesList.add("Geography");

Document student = new Document().append("studentId", "STU2")
  .append("name", "Sam")
  .append("age", 13)
  .append("courses", coursesList);

collection.insertOne(student);
```

上述查询将一个带有数组的单个文档插入到_student_集合中。重要的是要注意，_Document_类的_append(String, Object)_方法接受一个_Object_作为值。我们可以将任何_Object_类型的_List_作为值传递，将其作为数组插入到文档中。

### 6.2. 插入多个带有数组的文档

让我们使用_insertMany()_方法将多个带有数组的文档插入到集合中：

```java
List```<String>``` coursesList1 = new ArrayList<>();
coursesList1.add("Chemistry");
coursesList1.add("Geography");

Document student1 = new Document().append("studentId", "STU3")
  .append("name", "Sarah")
  .append("age", 12)
  .append("courses", coursesList1);

List```<String>``` coursesList2 = new ArrayList<>();
coursesList2.add("Math");
coursesList2.add("History");

Document student2 = new Document().append("studentId", "STU4")
  .append("name", "Tom")
  .append("age", 13)
  .append("courses", coursesList2);

List``<Document>`` students = new ArrayList<>();
students.add(student1);
students.add(student2);

collection.insertMany(students);
```

上述查询将多个带有数组的文档插入到_student_集合中。

### 6.3. 插入一个对象数组

最后，让我们将一个对象数组类型的文档插入到MongoDB集合中：

```java
Document course1 = new Document().append("name", "C1")
  .append("points", 5);

Document course2 = new Document().append("name", "C2")
  .append("points", 7);

List``<Document>`` coursesList = new ArrayList<>();
coursesList.add(course1);
coursesList.add(course2);

Document student = new Document().append("studentId", "STU5")
  .append("name", "Sam")
  .append("age", 13)
  .append("courses", coursesList);

collection.insertOne(student);
```

上述查询将多个带有对象数组的文档插入到_student_集合中。在这里，我们插入了一个包含文档列表作为数组的文档到集合中。同样，我们可以构建任何复杂的数组对象并将其插入到MongoDB集合中。

## 7. 结论

在本文中，我们看到了将带有数组对象的文档插入MongoDB集合的多种方式。我们使用MongoDB Shell查询以及相应的Java驱动程序代码实现来讨论了这些用例。

使用Java驱动程序代码，我们首先查看了使用已弃用的_DBObject_类的实现。然后，我们学习了如何使用新的_BSON_文档类来实现相同的操作。

所有这些示例和代码片段的实现都可以在GitHub上找到。