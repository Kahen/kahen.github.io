---
date: 2022-04-01
category:
  - MongoDB
  - Java
tag:
  - MongoDB
  - Java Driver
  - find
  - query
head:
  - - meta
    - name: keywords
      content: MongoDB find, Java Driver, MongoDB 查询
------
# MongoDB中查找指南

## 1. 概述

在本教程中，我们将探讨执行搜索操作以检索MongoDB中的文档。MongoDB提供了一个_find_操作符，用于从集合中查询文档。**_find_操作符的主要目的是根据查询条件从集合中选择文档，并返回一个游标到所选文档。**

在本教程中，我们首先将查看MongoDB Shell查询中的_find_操作符，然后使用Java驱动代码。

## 2. 数据库初始化

在我们继续执行_find_操作之前，我们首先需要设置一个名为_baeldung_的数据库和一个示例集合_employee_：

``` 
db.employee.insertMany([
{
    "employeeId":"EMP1",
    "name":"Sam",
    "age":23,
    "type":"Full Time",
    "department":"Engineering"
},
{
    "employeeId":"EMP2",
    "name":"Tony",
    "age":31,
    "type":"Full Time",
    "department":"Admin"
},
{
    "employeeId":"EMP3",
    "name":"Lisa",
    "age":42,
    "type":"Part Time",
    "department":"Engineering"
}]);
```

上述查询成功插入后，将返回类似于以下内容的JSON结果：

``` 
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("62a88223ff0a77909323a7fa"),
        ObjectId("62a88223ff0a77909323a7fb"),
        ObjectId("62a88223ff0a77909323a7fc")
    ]
}
```

此时，我们已经将一些文档插入到我们的集合中，以执行各种类型的_find_操作。

## 3. 使用MongoDB Shell

要从MongoDB集合中查询文档，我们使用_db.collection.find(query, projection)_方法。该方法接受两个可选参数——_query_和_projection_——作为MongoDB BSON文档。

_query_参数接受带有查询操作符的选择过滤器。要检索MongoDB集合中的所有文档，我们可以省略此参数或传递一个空白文档。

接下来，_projection_参数用于指定从匹配文档中返回的字段。要返回匹配文档中的所有字段，我们可以省略此参数。

让我们从基本的_find_查询开始，该查询将返回所有集合文档：

``` 
db.employee.find({});
```

上述查询将返回_employee_集合中的所有文档：

``` 
{ "_id" : ObjectId("62a88223ff0a77909323a7fa"), "employeeId" : "1", "name" : "Sam", "age" : 23, "type" : "Full Time", "department" : "Engineering" }
{ "_id" : ObjectId("62a88223ff0a77909323a7fb"), "employeeId" : "2", "name" : "Tony", "age" : 31, "type" : "Full Time", "department" : "Admin" }
{ "_id" : ObjectId("62a88223ff0a77909323a7fc"), "employeeId" : "3", "name" : "Ray", "age" : 42, "type" : "Part Time", "department" : "Engineering" }
```

接下来，让我们编写一个查询，返回所有属于“Engineering”部门的员工：

``` 
db.employee.find(
{
    "department":"Engineering"
});
```

上述查询返回所有_employee_集合文档，其中_department_等于“Engineering”：

``` 
{ "_id" : ObjectId("62a88223ff0a77909323a7fa"), "employeeId" : "1", "name" : "Sam", "age" : 23, "type" : "Full Time", "department" : "Engineering" }
{ "_id" : ObjectId("62a88223ff0a77909323a7fc"), "employeeId" : "3", "name" : "Ray", "age" : 42, "type" : "Part Time", "department" : "Engineering" }
```

最后，让我们编写一个查询，获取属于“Engineering”部门的所有员工的_name_和_age_字段：

``` 
db.employee.find(
{
    "department":"Engineering"
},
{
    "name":1,
    "age":1
});
```

上述查询仅返回与查询条件匹配的文档的_name_和_age_字段：

``` 
{ "_id" : ObjectId("62a88223ff0a77909323a7fa"), "name" : "Sam", "age" : 23 }
{ "_id" : ObjectId("62a88223ff0a77909323a7fc"), "name" : "Ray", "age" : 42 }
```

注意，默认情况下，所有文档中都会返回_id_字段，除非明确排除。

还需要注意的是，_find_操作符返回一个游标到与查询过滤器匹配的文档。MongoDB Shell自动迭代游标以显示最多20个文档。

此外，MongoDB Shell还提供了一个_findOne()_方法，该方法仅返回满足提到的查询条件的一个文档。如果有多个文档匹配，将根据磁盘上文档的自然顺序返回第一个文档：

``` 
db.employee.findOne();
```

与_find()_不同，上述查询将仅返回一个文档而不是游标：

``` 
{
    "_id" : ObjectId("62a99e22a849e1472c440bbf"),
    "employeeId" : "EMP1",
    "name" : "Sam",
    "age" : 23,
    "type" : "Full Time",
    "department" : "Engineering"
}
```

## 4. 使用Java驱动

到目前为止，我们已经看到了如何使用MongoDB Shell执行_find_操作。接下来，让我们使用MongoDB Java驱动实现相同的操作。在我们开始之前，让我们首先创建一个_MongoClient_连接到_employee_集合：

``` 
MongoClient mongoClient = new MongoClient("localhost", 27017);
MongoDatabase database = mongoClient.getDatabase("baeldung");
MongoCollection`````````<Document>````````` collection = database.getCollection("employee");
```

在这里，我们创建了一个连接到默认端口27017上运行的MongoDB服务器的连接。接下来，我们从连接中创建的_MongoDatabase_实例中获取_MongoCollection_的实例。

首先，要执行_find_操作，我们调用_MongoCollection_实例上的_find()_方法。让我们检查一下代码，以从集合中检索所有文档：

``` 
FindIterable`````````<Document>````````` documents = collection.find();
MongoCursor`````````<Document>````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

注意，_find()_方法返回一个_FindIterable`````````<Document>`````````_实例。然后我们通过调用_FindIterable_的_iterator()_方法获取_MongoCursor_的实例。最后，我们迭代游标以检索每个文档。

接下来，让我们添加查询操作符来过滤_find_操作返回的文档：

``` 
Bson filter = Filters.eq("department", "Engineering");
FindIterable`````````<Document>````````` documents = collection.find(filter);

MongoCursor`````````<Document>````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

在这里，我们将一个_Bson_过滤器作为参数传递给_find()_方法。我们可以使用任何组合的查询操作符作为_find()_方法的过滤器。上述代码片段将返回所有_department_等于“Engineering”的文档。

进一步，让我们编写一个代码片段，仅从匹配选择标准的文档中返回_name_和_age_字段：

``` 
Bson filter = Filters.eq("department", "Engineering");
Bson projection = Projections.fields(Projections.include("name", "age"));
FindIterable`````````<Document>````````` documents = collection.find(filter)
  .projection(projection);

MongoCursor`````````<Document>````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

在这里，我们在_FindIterable_实例上调用_projection()_方法。我们将一个_Bson_过滤器作为参数传递给_projection()_方法。我们可以使用_projection_操作包含或排除最终结果中的任何字段。作为直接使用MongoDB驱动和_Bson_的替代方案，请查看我们的Spring Data MongoDB投影指南。

最后，我们可以使用_FindIterable_实例上的_first()_方法检索结果中的第一个文档。这返回一个单一的文档而不是_MongoCursor_实例：

``` 
FindIterable`````````<Document>````````` documents = collection.find();
Document document = documents.first();
```

## 5. 结论

在本文中，我们学习了使用各种方法在MongoDB中执行_find_操作。我们执行_find_以检索符合选择标准的特定文档，使用查询操作符。此外，我们还学习了执行_projection_以确定匹配文档中返回哪些字段。

首先，我们