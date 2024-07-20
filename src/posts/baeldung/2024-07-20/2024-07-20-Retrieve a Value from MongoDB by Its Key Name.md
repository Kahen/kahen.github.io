---
date: 2024-07-20
category:
  - MongoDB
  - 数据库
tag:
  - MongoDB
  - 数据检索
head:
  - - meta
    - name: keywords
      content: MongoDB, 数据检索, Java, 数据库操作
---
# MongoDB中通过键名检索值

在本教程中，我们将学习如何在MongoDB中通过键名检索值。我们将探索MongoDB的各种方法，根据应用的过滤器获取文档的键字段名称。首先，我们将使用_find_或_findone_方法来获取所需的数据，然后使用_aggregation_方法。这里，我们将在MongoDB shell查询和Java驱动程序代码中编写查询。

让我们看看在MongoDB中通过字段名称检索值的不同方法。

## 2. 数据库初始化

首先，我们需要设置一个新的数据库_baeldung_和一个新集合，_travel_：

```shell
use baeldung;
db.createCollection(travel);
```

现在让我们使用MongoDB的_insertMany_方法向集合中添加一些虚拟数据：

```json
[
    {
        "passengerId": 145,
        "passengerName": "Nathan Green",
        "passengerAge": 25,
        "sourceStation": "London",
        "destinationStation": "Birmingham",
        "seatType": "Slepper",
        "emailAddress": "nathongreen12@gmail.com"
    },
    {
        "passengerId": 148,
        "passengerName": "Kevin Joseph",
        "passengerAge": 28,
        "sourceStation": "Manchester",
        "destinationStation": "London",
        "seatType": "Slepper",
        "emailAddress": "kevin13@gmail.com"
    },
    {
        "passengerId": 154,
        "passengerName": "Sheldon burns",
        "passengerAge": 26,
        "sourceStation": "Cambridge",
        "destinationStation": "Leeds",
        "seatType": "Slepper",
        "emailAddress": "sheldonnn160@gmail.com"
    },
    {
        "passengerId": 168,
        "passengerName": "Jack Ferguson",
        "passengerAge": 24,
        "sourceStation": "Cardiff",
        "destinationStation": "Coventry",
        "seatType": "Slepper",
        "emailAddress": "jackfergusion9890@gmail.com"
    }
]
```

上述_insertMany_查询将返回以下JSON：

```json
{
    "acknowledged": true,
    "insertedIds": [
        ObjectId("623d7f079d55d4e137e47825"),
        ObjectId("623d7f079d55d4e137e47826"),
        ObjectId("623d7f079d55d4e137e47827"),
        ObjectId("623d7f079d55d4e137e47828")
    ]
}
```

到目前为止，我们已经将虚拟数据插入到_travel_集合中。

## 3. 使用_find_方法

_find_方法查找并返回与集合上指定的查询条件匹配的文档。如果有多个文档符合条件，它将根据磁盘上的文档顺序返回所有文档。此外，在MongoDB中，_find_方法支持查询中的参数投影。如果我们在_find_方法中指定了投影参数，它将只返回包含投影字段的所有文档。

**一个关键点是，除非显式移除，否则_\_id_字段总是在响应中包含。**

为了演示，让我们看看shell查询来投影一个键字段：

```shell
db.travel.find({}, {"passengerId": 1}).pretty();
```

上述查询的响应将是：

```json
{
    "_id": ObjectId("623d7f079d55d4e137e47825"),
    "passengerId": 145
}
{
    "_id": ObjectId("623d7f079d55d4e137e47826"),
    "passengerId": 148
}
{
    "_id": ObjectId("623d7f079d55d4e137e47827"),
    "passengerId": 154
}
{
    "_id": ObjectId("623d7f079d55d4e137e47828"),
    "passengerId": 168
}
```

在这里，在这个查询中，我们只投影了_passengerId_。现在让我们看看不包含_\_id_的键字段：

```shell
db.travel.find({}, {"passengerId": 1, "_id": 0}).pretty();
```

上述查询的响应将是：

```json
{
    "passengerId": 145
}
{
    "passengerId": 148
}
{
    "passengerId": 154
}
{
    "passengerId": 168
}
```

在这里，在这个查询中，我们从响应投影中排除了_\_id_字段。让我们看看上面的Java驱动程序代码：

```java
MongoClient mongoClient = new MongoClient("localhost", 27017);
DB database = mongoClient.getDB("baeldung");
DBCollection collection = database.getCollection("travel");
BasicDBObject queryFilter = new BasicDBObject();
BasicDBObject projection = new BasicDBObject();
projection.put("passengerId", 1);
projection.put("_id", 0);
DBCursor dbCursor = collection.find(queryFilter, projection);
while (dbCursor.hasNext()) {
    System.out.println(dbCursor.next());
}
```

在上面的代码中，首先，我们使用端口_27017_上的本地mongo服务器创建了一个_MongoClient_连接。接下来，我们使用了_find_方法，它有两个参数，_queryFilter_和投影。查询_DBObject_包含我们需要获取数据的过滤器。在这里，我们使用_DBCursor_打印了所有旅行文档的投影字段。

## 4. 使用_aggregation_方法

MongoDB中的_aggregation_操作处理数据记录和文档，并返回计算结果。它从各种文档中收集值，并将它们分组在一起，然后对分组的数据执行不同类型的操作，如求和、平均、最小、最大等。

当我们需要进行更复杂的聚合时，可以使用MongoDB聚合管道。**聚合管道是与MongoDB查询语法结合的阶段集合，以产生聚合结果。**

让我们看看聚合查询通过键名检索值：

```shell
db.travel.aggregate([
    {
        "$project": {
            "passengerId": 1
        }
    }
]).pretty();
```

上述聚合查询的响应将是：

```json
{
    "_id": ObjectId("623d7f079d55d4e137e47825"),
    "passengerId": 145
}
{
    "_id": ObjectId("623d7f079d55d4e137e47826"),
    "passengerId": 148
}
{
    "_id": ObjectId("623d7f079d55d4e137e47827"),
    "passengerId": 154
}
{
    "_id": ObjectId("623d7f079d55d4e137e47828"),
    "passengerId": 168
}
```

在这种情况下，我们使用了聚合管道的_$project_阶段。_$project_指定要包括或排除哪些字段。在我们的查询中，我们只在投影阶段传递了passengerId。

让我们看看上面的Java驱动程序代码：

```java
ArrayList```<Document>``` response = new ArrayList<>();
ArrayList```<Document>``` pipeline = new ArrayList<>(Arrays.asList(new Document("$project", new Document("passengerId", 1L))));
database = mongoClient.getDatabase("baeldung");
database.getCollection("travel").aggregate(pipeline).allowDiskUse(true).into(response);
System.out.println("response:- " + response);
```

我们还可以用以下方式编写聚合管道

```java
ArrayList```<Document>``` response = new ArrayList<>();
ArrayList`<Bson>` pipeline = new ArrayList<>(Arrays.asList(
    project(fields(Projections.exclude("_id"), Projections.include("passengerId"))))); 
MongoDatabase database = mongoClient.getDatabase("baeldung");
database.getCollection("travel").aggregate(pipeline).allowDiskUse(true).into(response);
System.out.println("response:-" + response);
```

我们使用Java驱动程序代码创建了一个聚合管道，并仅设置项目阶段以包括_passengerId_字段。最后，我们将聚合管道传递给_aggregate_方法以检索数据。

## 5. 结论

在本文中，我们学习了如何在MongoDB中通过键名检索值。我们探索了MongoDB的不同方法来获取数据。首先，我们使用_find_方法检索数据，然后使用_aggregate_方法。我们研究了MongoDB中字段投影的使用情况。简而言之，我们使用Mongo shell查询和Java驱动程序代码实现了字段的投影。

我们可以在GitHub上找到所有案例的实现。