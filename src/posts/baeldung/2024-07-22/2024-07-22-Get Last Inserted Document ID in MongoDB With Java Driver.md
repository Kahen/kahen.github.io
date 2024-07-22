---
date: 2022-04-01
category:
  - MongoDB
  - Java
tag:
  - Java
  - MongoDB
  - Document ID
head:
  - - meta
    - name: keywords
      content: MongoDB, Java, Document ID, Last Inserted ID
---

# 在Java驱动中获取MongoDB最后插入的文档ID

## 1. 概述

有时我们需要刚刚插入到MongoDB数据库中文档的ID。例如，我们可能想要将ID作为响应返回给调用者或记录创建的对象进行调试。

在本教程中，我们将看到MongoDB中ID是如何实现的，以及如何通过Java程序检索我们刚刚插入到集合中的文档的ID。

## 2. MongoDB文档的ID是什么？

像每个数据存储系统一样，MongoDB需要为存储在集合中的每个文档提供一个唯一标识符。这个标识符相当于关系数据库中的主键。

在MongoDB中，此ID由12个字节组成：
- 4字节的时间戳值，表示自Unix纪元以来的秒数
- 每个进程一次生成的5字节随机值。这个随机值对于机器和进程是唯一的。
- 一个3字节的递增计数器

**ID存储在一个名为_id的字段中，并且由客户端生成。**这意味着在将文档发送到数据库之前必须生成ID。在客户端，我们可以使用驱动程序生成的ID或生成自定义ID。

我们可以看到，在同一秒由同一客户端创建的文档将有前9个字节相同。因此，ID的唯一性在这种情况下依赖于计数器。计数器允许客户端在同一秒内创建超过1600万个文档。

尽管它以时间戳开始，但我们应该小心，不要将标识符用作排序标准。这是因为在同一秒创建的文档不能保证按创建日期排序，因为计数器不能保证是单调的。此外，不同的客户端可能有不同的系统时钟。

Java驱动程序使用随机数生成器作为计数器，这不是单调的。这就是为什么我们不应该使用驱动程序生成的ID按创建日期排序。

## 3. _ObjectId_ 类

唯一标识符存储在_ObjectId_类中，该类提供了方便的方法来获取ID中存储的数据，而无需手动解析。

例如，以下是我们如何获取ID的创建日期：
```
Date creationDate = objectId.getDate();
```

同样，我们可以检索ID的时间戳（秒）：
```
int timestamp = objectId.getTimestamp();
```

_ObjectId_类还提供了获取计数器、机器标识符或进程标识符的方法，但它们都被弃用了。

## 4. 检索ID

需要记住的主要事情是，在MongoDB中，客户端在将_Document_发送到集群之前生成唯一的标识符。这与关系数据库中的序列形成对比。这使得检索此ID非常容易。

### 4.1. 驱动程序生成的ID

**生成_Document_的唯一ID的标准且简单的方法是让驱动程序来做这项工作。**当我们向_Collection_插入一个新的_Document_时，如果_Document_中没有_id字段，驱动程序在发送插入命令到集群之前会生成一个新的_ObjectId_。

我们插入新_Document_到您的Collection的代码可能如下所示：
```
Document document = new Document();
document.put("name", "Shubham");
document.put("company", "Baeldung");
collection.insertOne(document);
```

我们可以看到，我们从未指明ID必须如何生成。

当_insertOne()_方法返回时，我们可以从_Document_获取生成的_ObjectId_：
```
ObjectId objectId = document.getObjectId("_id");
```

我们还可以使用_Document_的标准字段检索_ObjectId_，然后将其转换为_ObjectId_：
```
ObjectId oId = (ObjectId) document.get("_id");
```

### 4.2. 自定义ID

**检索ID的另一种方式是在代码中生成它，然后像其他字段一样将其放入_Document_中。**如果我们向驱动程序发送带有_id字段的_Document_，它将不会生成一个新的。

我们可能需要这样做的情况是，我们需要在将_Document_插入_Collection_之前获得MongoDB_Document_的ID。

我们可以通过创建类的实例来生成一个新的_ObjectId_：
```
ObjectId generatedId = new ObjectId();
```

或者，我们也可以调用_ObjectId_类的静态_get()_方法：
```
ObjectId generatedId = ObjectId.get();
```

然后，我们只需要创建我们的_Document_并使用生成的ID。为此，我们可以在_Document_构造函数中提供它：
```
Document document = new Document("_id", generatedId);
```

或者，我们可以使用_put()_方法：
```
document.put("_id", generatedId);
```

使用用户生成的ID时，我们必须小心，在每次插入之前生成一个新的_ObjectId_，因为重复的ID是禁止的。重复的ID将导致_MongoWriteException_，带有重复键消息。

_ObjectId_类提供了几个其他构造函数，允许我们设置标识符的某些部分：
```
public ObjectId(final Date date)
public ObjectId(final Date date, final int counter)
public ObjectId(final int timestamp, final int counter)
public ObjectId(final String hexString)
public ObjectId(final byte[] bytes)
public ObjectId(final ByteBuffer buffer)
```

但是，当我们使用这些构造函数时，我们必须非常小心，因为提供给驱动程序的ID的唯一性完全依赖于我们的代码。在这些特定情况下，我们可能会得到重复键错误：
- 如果我们多次使用相同的日期（或时间戳）和计数器组合
- 如果我们多次使用相同的十六进制_String_、_byte_数组或_ByteBuffer_

## 5. 结论

在本文中，我们学习了MongoDB文档的唯一标识符是什么以及它的工作原理。然后，我们看到了如何在插入_Document_到_Collection_之后甚至之前检索它。

像往常一样，这些示例的代码可以在GitHub上找到。

OK