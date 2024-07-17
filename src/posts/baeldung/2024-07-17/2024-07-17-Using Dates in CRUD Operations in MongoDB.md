---
date: 2022-04-01
category:
  - MongoDB
  - Java
tag:
  - CRUD
  - Date Operations
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, CRUD, Date Operations
------
# 在MongoDB中使用日期进行CRUD操作

## 1. 概述

在本教程中，我们将使用MongoDB Java驱动程序执行与日期相关的CRUD操作，例如创建和更新带有日期字段的文档，以及查询、更新和删除其日期字段在给定范围内的文档。

## 2. 设置

在深入实现之前，让我们设置我们的工作环境。

### 2.1. Maven依赖

首先，**你应该安装MongoDB**。如果你没有安装，可以按照官方的MongoDB安装指南进行安装。

接下来，让我们将MongoDB Java驱动程序作为依赖项添加到我们的_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`org.mongodb`</groupId>`
    `<artifactId>`mongodb-driver-sync`</artifactId>`
    `<version>`4.6.0`</version>`
`</dependency>`
```

### 2.2. POJO数据模型

让我们定义一个POJO来表示我们数据库中包含的文档：

```java
public class Event {
    private String title;
    private String location;
    private LocalDateTime dateTime;

    public Event() {}
    public Event(String title, String location, LocalDateTime dateTime) {
        this.title = title;
        this.location = location;
        this.dateTime = dateTime;
    }

    // 标准setter和getter
}
```

注意我们声明了两个构造函数。**MongoDB默认使用无参数构造函数**。另一个构造函数是供我们在本教程中自己使用的。

还需要注意的是，虽然_dateTime_可以是一个_String_变量，**最佳实践是使用特定于日期/时间的JDK类来表示日期字段**。使用_String_字段表示日期需要额外的努力来确保值的格式正确。

现在我们准备好连接到我们的数据库了。

### 2.3. MongoDB客户端

为了让MongoDB能够序列化/反序列化我们的_Event_ POJO，我们需要将_PojoCodecProvider_注册到MongoDB的_CodecRegistry_：

```java
CodecProvider codecProvider = PojoCodecProvider.builder().automatic(true).build();
CodecRegistry codecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(codecProvider));
```

让我们创建一个数据库、集合和客户端，这些将使用我们注册的_PojoCodecProvider_：

```java
MongoClient mongoClient = MongoClients.create(uri);
MongoDatabase db = mongoClient.getDatabase("calendar").withCodecRegistry(codecRegistry);
MongoCollection`<Event>` collection = db.getCollection("my_events", Event.class);
```

我们现在准备好创建文档并执行与日期相关的CRUD操作了。

## 3. 创建带有日期字段的文档

在我们的POJO中，我们使用了_LocalDateTime_而不是_String_，以便更容易地处理日期值。现在让我们利用这一点，使用_LocalDateTime_的便捷API构建_Event_对象：

```java
Event pianoLessonsEvent = new Event("Piano lessons", "Foo Blvd",
    LocalDateTime.of(2022, 6, 4, 11, 0, 0));
Event soccerGameEvent = new Event("Soccer game", "Bar Avenue",
    LocalDateTime.of(2022, 6, 10, 17, 0, 0));
```

我们可以按照以下方式将新的_Event_插入我们的数据库：

```java
InsertOneResult pianoLessonsInsertResult = collection.insertOne(pianoLessonsEvent);
InsertOneResult soccerGameInsertResult = collection.insertOne(soccerGameEvent);
```

让我们通过检查插入文档的id来验证插入是否成功：

```java
assertNotNull(pianoLessonsInsertResult.getInsertedId());
assertNotNull(soccerGameInsertResult.getInsertedId());
```

## 4. 根据日期条件查询文档

现在我们的数据库中有_Event_，让我们根据它们的日期字段检索它们。

**我们可以使用等值过滤器 (_eq_) 来检索与特定日期和时间匹配的文档：**

```java
LocalDateTime dateTime = LocalDateTime.of(2022, 6, 10, 17, 0, 0);
Event event = collection.find(eq("dateTime", dateTime)).first();
```

让我们检查结果_Event_的各个字段：

```java
assertEquals("Soccer game", event.title);
assertEquals("Bar Avenue", event.location);
assertEquals(dateTime, event.dateTime);
```

**我们还可以使用MongoDB _BasicDBObject_类以及_gte_和_lte_操作符来构建** **更复杂的日期范围查询：**

```java
LocalDateTime from = LocalDateTime.of(2022, 06, 04, 12, 0, 0);
LocalDateTime to = LocalDateTime.of(2022, 06, 10, 17, 0, 0);
BasicDBObject object = new BasicDBObject();
object.put("dateTime", BasicDBObjectBuilder.start("$gte", from).add("$lte", to).get());
List list = new ArrayList(collection.find(object).into(new ArrayList()));
```

由于足球比赛是我们查询日期范围内唯一的_Event_，我们应该只在_list_中看到一个_Event_对象，排除了钢琴课：

```java
assertEquals(1, events.size());
assertEquals("Soccer game", events.get(0).title);
assertEquals("Bar Avenue", events.get(0).location);
assertEquals(dateTime, events.get(0).dateTime);
```

## 5. 更新文档

让我们探索两种基于日期字段更新文档的用例。首先，我们将更新单个文档的日期字段，然后我们将更新匹配日期范围的多个文档。

### 5.1. 更新文档的日期字段

**要更新MongoDB文档，我们可以使用_updateOne()_方法**。让我们还使用_currentDate()_方法来设置我们的钢琴课事件的_dateTime_字段：

```java
Document document = new Document().append("title", "Piano lessons");
Bson update = Updates.currentDate("dateTime");
UpdateOptions options = new UpdateOptions().upsert(false);
UpdateResult result = collection.updateOne(document, update, options);
```

注意_updateOne()_的第一个参数是一个_Document_对象，MongoDB将使用它来匹配我们数据库中的单个条目。如果有多个文档匹配，MongoDB只会更新它遇到的第一份文档。让我们还注意到我们向_upsert()_方法传递了_false_。如果我们传递了_true_，MongoDB将会在没有现有文档匹配的情况下插入一个新文档。

我们可以通过检查修改的文档数量来确认操作是否成功：

```java
assertEquals(1, result.getModifiedCount());
```

### 5.2. 更新符合日期条件的文档

**要更新多个文档，MongoDB提供了_updateMany_方法。** 在这个例子中，我们将更新与我们查询的日期范围匹配的多个事件。

与_updateOne()_不同，_updateMany()_方法期望第二个_Bson_对象来封装将定义我们想要更新的文档的查询条件。在这种情况下，我们将指定一个涵盖2022年所有事件的日期范围，通过引入_lt_字段操作符：

```java
LocalDate updateManyFrom = LocalDate.of(2022, 1, 1);
LocalDate updateManyTo = LocalDate.of(2023, 1, 1);
Bson query = and(gte("dateTime", from), lt("dateTime", to));
Bson updates = Updates.currentDate("dateTime");
UpdateResult result = collection.updateMany(query, updates);
```

就像_updateOne()_一样，**我们可以通过检查_result_对象的更新计数来确认此操作更新了多个事件：**

```java
assertEquals(2, result.getModifiedCount());
```

## 6. 删除符合日期条件的文档

与更新一样，我们可以一次从数据库中删除一个或多个文档。假设我们需要删除2022年的所有事件。让我们使用_Bson_日期范围查询和_deleteMany()_方法来做到这一点：

```java
LocalDate deleteFrom = LocalDate.of(2022, 1, 1);
LocalDate deleteTo = LocalDate.of(2023, 1, 1);
Bson query = and(gte("dateTime", deleteFrom), lt("dateTime", deleteTo));
DeleteResult result = collection.deleteMany(query);
```

由于我们在本教程中创建的所有事件都有一个2022_dateTime_字段值，_deleteMany()_从我们的集合中删除了它们全部。我们可以通过检查删除计数来确认这一点：

```java
assertEquals(2, result.getDeletedCount());
```

## 7. 使用时区

**MongoDB以UTC存储日期，这不能更改。** 因此，如果我们希望我们的日期字段特定于时区，我们可以在一个单独的字段中存储时区偏移量，并自己进行转换。让我们将该字段添加为_String_：

```java
public String timeZoneOffset;
```

我们需要调整我们的构造函数，以便在创建事件时可以设置新字段：

```java
public Event(String title, String location, LocalDateTime dateTime, String timeZoneOffset) {
    this.title = title;
    this.location = location;
    this.dateTime = dateTime;
    this.timeZoneOffset = timeZoneOffset;
}
```

我们现在可以创建并将特定时区的事件插入我们的数据库。让我们使用ZoneOffset类来避免手动格式化时区偏移_String_：

```java
LocalDateTime utcDateTime = LocalDateTime.of(2022, 6, 20, 11, 0, 0);
Event pianoLessonsTZ = new Event("Piano lessons", "Baz Bvld", utcDateTime, ZoneOffset.ofHours(2).toString());
InsertOneResult pianoLessonsTZInsertResult = collection.insertOne(pianoLessonsTZ);
assertNotNull(pianoLessonsTZInsertResult.getInsertedId());
```

注意**由于偏移量是相对于UTC的，_dateTime_成员变量必须表示UTC时间，这样我们才能正确地稍后转换它**。一旦我们从集合中检索到文档，我们就可以使用偏移字段和_OffsetDateTime_类进行转换：

```java
OffsetDateTime dateTimeWithOffset = OffsetDateTime.of(pianoLessonsTZ.dateTime, ZoneOffset.of(pianoLessonsTZ.timeZoneOffset));
```

## 8. 结论

在本文中，我们学习了如何使用Java和MongoDB数据库执行与日期相关的CRUD操作。

我们使用日期值来创建、检索、更新或从我们的数据库中删除文档。在我们的示例中，我们涵盖了各种辅助类，并介绍了在处理日期时有帮助的MongoDB操作符。最后，为了解决MongoDB仅以UTC存储日期的问题，我们学会了如何使用需要特定时区的日期/时间值。

一如既往，本教程中使用的示例代码可在GitHub上找到。
OK