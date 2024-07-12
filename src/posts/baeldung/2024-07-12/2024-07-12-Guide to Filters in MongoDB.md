---
date: 2022-04-01
category:
  - MongoDB
  - Java
tag:
  - Java
  - MongoDB
  - Filters
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, Filters, 查询, 数据库
------
# MongoDB中过滤器的使用指南

在本教程中，我们将学习如何使用过滤器构建器在MongoDB中指定查询的过滤器。

过滤器类是一种构建器，帮助我们构建查询过滤器。**过滤器是MongoDB用来根据特定条件限制结果的操作**。

## 2. 构建器类型

Java MongoDB驱动程序提供了各种类型的构建器，帮助我们构建BSON文档。**构建器提供了一个方便的API，简化了执行各种CRUD和聚合操作的过程**。

让我们回顾一下可用的不同类型构建器：

- **Filters** 用于构建查询过滤器
- **Projections** 用于构建字段投影，指定要包含和排除的字段
- **Sorts** 用于构建排序标准
- **Updates** 用于构建更新操作
- **Aggregates** 用于构建聚合管道
- **Indexes** 用于构建索引键

现在让我们深入探讨在MongoDB中使用**Filters**的不同方式。

## 3. 数据库初始化

首先，为了演示各种过滤器操作，让我们设置一个名为_baeldung_的数据库和一个示例集合，_user_：

```javascript
use baeldung;
db.createCollection("user");
```

进一步地，让我们向_user_集合中插入一些文档：

```javascript
db.user.insertMany([
{
    "userId":"123",
    "userName":"Jack",
    "age":23,
    "role":"Admin"
},
{
    "userId":"456",
    "userName":"Lisa",
    "age":27,
    "role":"Admin",
    "type":"Web"
},
{
    "userId":"789",
    "userName":"Tim",
    "age":31,
    "role":"Analyst"
}]);
```

成功插入后，上述查询将返回一个确认结果的响应：

```json
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("6357c4736c9084bcac72eced"),
        ObjectId("6357c4736c9084bcac72ecee"),
        ObjectId("6357c4736c9084bcac72ecef")
    ]
}
```

我们将使用这个集合作为我们所有过滤器操作示例的样本。

## 4. 使用**Filters**类

正如已经提到的，**Filters**是MongoDB用来限制结果到我们想要看到的内容的操作。**Filters**类提供了各种静态工厂方法，用于不同类型的MongoDB操作。每种方法都返回一个BSON类型，然后可以传递给任何期望查询过滤器的方法。

**当前MongoDB Java驱动程序API中的**Filters**类取代了旧版API中的**QueryBuilder**。**

**Filters**根据操作类型进行分类：条件、逻辑、数组、元素、评估、位和地理空间。

接下来，让我们看看一些最常用的**Filters**方法。

### 4.1. **eq()** 方法

**Filters.eq()**方法**创建一个过滤器，匹配所有指定字段的值等于指定值的文档**。

首先，让我们看看MongoDB Shell查询，过滤_user_集合中_userName_等于_“Jack”_的文档：

```javascript
db.getCollection('user').find({"userName":"Jack"})
```

上面的查询将从_user_集合返回一个文档：

```json
{
    "_id" : ObjectId("6357c4736c9084bcac72eced"),
    "userId" : "123",
    "userName" : "Jack",
    "age" : 23.0,
    "role" : "Admin"
}
```

现在，让我们看看相应的MongoDB Java驱动程序代码：

```java
Bson filter = Filters.eq("userName", "Jack");
FindIterable````````````````````<Document>```````````````````` documents = collection.find(filter);

MongoCursor````````````````````<Document>```````````````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

我们可以注意到**Filters.eq()**方法返回了一个BSON类型，然后我们将其作为过滤器传递给_find()_方法。

另外，**Filters.ne()_是**Filters.eq()_方法的相反** — 它匹配所有指定字段的值不等于指定值的文档：

```java
Bson filter = Filters.ne("userName", "Jack");
FindIterable````````````````````<Document>```````````````````` documents = collection.find(filter);

MongoCursor````````````````````<Document>```````````````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

### 4.2. **gt()** 方法

**Filters.gt()**方法**创建一个过滤器，匹配所有指定字段的值大于指定值的文档**。

让我们看一个例子：

```java
Bson filter = Filters.gt("age", 25);
FindIterable````````````````````<Document>```````````````````` documents = collection.find(filter);

MongoCursor````````````````````<Document>```````````````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

上述代码片段获取所有_user_集合中_age_大于_25_的文档。就像**Filters.gt()**方法一样，**还有**Filters.lt()**方法，它匹配所有指定字段的值小于指定值的文档**：

```java
Bson filter = Filters.lt("age", 25);
FindIterable````````````````````<Document>```````````````````` documents = collection.find(filter);

MongoCursor````````````````````<Document>```````````````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

此外，**还有方法**Filters.gte()**和**Filters.lte()**，分别匹配值大于或等于和小于或等于指定值**。

### 4.3. **in()** 方法

**Filters.in()**方法**创建一个过滤器，匹配所有指定字段的值等于指定值列表中的任何值的文档**。

让我们看看它的实际应用：

```java
Bson filter = Filters.in("userName", "Jack", "Lisa");
FindIterable````````````````````<Document>```````````````````` documents = collection.find(filter);

MongoCursor````````````````````<Document>```````````````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

这段代码片段获取所有_user_集合中_userName_等于_“Jack”_或_“Lisa”_的文档。

就像**Filters.in()**方法一样，**还有**Filters.nin()**方法，它匹配所有指定字段的值不等于指定值列表中的任何值的文档**：

```java
Bson filter = Filters.nin("userName", "Jack", "Lisa");
FindIterable````````````````````<Document>```````````````````` documents = collection.find(filter);

MongoCursor````````````````````<Document>```````````````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

### 4.4. **and()** 方法

**Filters.and()**方法**创建一个过滤器，对提供的过滤器列表执行逻辑AND操作**。

让我们找出所有_user_集合中_age_大于_25_且_role_等于_“Admin”_的文档：

```java
Bson filter = Filters.and(Filters.gt("age", 25), Filters.eq("role", "Admin"));
FindIterable````````````````````<Document>```````````````````` documents = collection.find(filter);

MongoCursor````````````````````<Document>```````````````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

### 4.5. **or()** 方法

正如我们所预期的，**Filters.or()**方法**创建一个过滤器，对提供的过滤器列表执行逻辑OR操作**。

让我们编写一个代码片段，返回所有_user_集合中_age_大于_30_或_role_等于_“Admin”_的文档：

```java
Bson filter = Filters.or(Filters.gt("age", 30), Filters.eq("role", "Admin"));
FindIterable````````````````````<Document>```````````````````` documents = collection.find(filter);

MongoCursor````````````````````<Document>```````````````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

### 4.6. **exists()** 方法

进一步地，**Filters.exists()**方法**创建一个过滤器，匹配所有包含给定字段的文档**：

```java
Bson filter = Filters.exists("type");
FindIterable````````````````````<Document>```````````````````` documents = collection.find(filter);

MongoCursor````````````````````<Document>```````````````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

上述代码返回所有_user_集合中有_type_字段的文档。

### 4.7. **regex()** 方法

最后，**Filters.regex()**方法**创建一个过滤器，匹配指定字段的值与给定正则表达式模式匹配的文档**：

```java
Bson filter = Filters.regex("userName", "a");
FindIterable````````````````````<Document>```````````````````` documents = collection.find(filter);

MongoCursor````````````````````<Document>```````````````````` cursor = documents.iterator();
while (cursor.hasNext()) {
    System.out.println(cursor.next());
}
```

在这里，我们获取了所有_user_集合中_userName_匹配正则表达式_“a”_的文档。

到目前为止，我们已经讨论了一些最常用的过滤器操作符。我们可以将查询过滤器操作符的任何组合作为_find()_方法的过滤器。

此外，过滤器还可以在其他地方使用，例如聚合的match阶段、_deleteOne()_方法和_updateOne()_方法等。

## 5. 结