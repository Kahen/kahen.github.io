---
date: 2022-04-01
category:
  - MongoDB
  - 技术
tag:
  - ObjectId
  - 唯一性
  - 技术
head:
  - - meta
    - name: keywords
      content: MongoDB, ObjectId, 唯一性, 技术
---
# 在MongoDB中生成唯一的ObjectId

在这篇文章中，我们将讨论什么是ObjectId，如何生成它，以及确保其唯一性可能的方法。 

## 1. 引言

## 2. ObjectId 基本信息
让我们首先解释一下什么是ObjectId。**ObjectId是一个12字节的十六进制值**，是BSON规范中可能的数据类型之一。BSON是JSON文档的二进制序列化。此外，MongoDB使用ObjectId作为文档中_id字段的默认标识符。当创建集合时，还会在_id字段上设置默认的唯一索引。

这防止用户插入两个具有相同_id的文档。此外，_id索引不能从集合中删除。然而，可以在两个集合中插入具有相同_id的单个文档。

### 2.1 ObjectId 结构
ObjectId可以分为三个不同的部分。考虑到ObjectId 6359388c80616b1fc6d7ec71，第一部分将由4个字节组成 - 6359388c。这4个字节表示自Unix纪元以来的秒数。第二部分由接下来的5个字节组成，即80616b1fc6。这些字节表示每个进程生成一次的随机值。该随机值对于机器和进程是唯一的。最后一部分是3个字节d7ec71，它表示从随机值开始的递增计数器。

还值得一提的是，**上述结构适用于MongoDB 4.0及以上版本**。在此之前，ObjectId由四部分组成。前4个字节表示自Unix纪元以来的秒数，接下来的三个字节用于机器标识符。

接下来的2个字节用于进程ID，最后的3个字节用于从随机值开始的计数器。

### 2.2 ObjectId 唯一性
MongoDB文档中也提到了最重要的一点，即在生成时ObjectId被**高度认为可能是唯一的**。也就是说，生成重复ObjectId的可能性非常小。查看ObjectId的结构，我们可以看到在一秒钟内生成ObjectId的可能性超过1.8×10^19。

即使所有ID都是在同一秒、同一台机器、同一进程中生成的，仅计数器本身就有超过1700万种可能性。

## 3. ObjectId 创建
在Java中有多种创建ObjectId的方法。可以通过无参数构造函数或参数化构造函数来完成。

### 3.1 使用无参数构造函数创建ObjectId
第一种，也是最简单的一种，是通过使用无参数构造函数的新关键字：

```
ObjectId objectId = new ObjectId();
```

第二种是简单地调用ObjectId类的静态方法_get()_。而不是直接调用无参数构造函数。然而，_get()_方法的实现与第一个示例中通过新关键字创建ObjectId相同：

```
ObjectId objectId = ObjectId.get();
```

### 3.2 使用参数化构造函数创建ObjectId
其余示例使用参数化构造函数。我们可以通过传递Date类作为参数或同时传递Date类和int计数器来创建ObjectId。如果我们尝试使用相同的Date在这两种方法中创建ObjectId，我们将得到不同的ObjectId，即new ObjectId(date)与new ObjectId(date, counter)。

然而，如果我们在同一秒通过new ObjectId(date, counter)创建两个ObjectId，我们将得到一个重复的ObjectId，因为它是在同一秒、同一台机器上，并且使用相同的计数器生成的。让我们看一个例子：

```
@Test
public void givenSameDateAndCounter_whenComparingObjectIds_thenTheyAreNotEqual() {
    Date date = new Date();
    ObjectId objectIdDate = new ObjectId(date); // 635981f6e40f61599e839ddb
    ObjectId objectIdDateCounter1 = new ObjectId(date, 100); // 635981f6e40f61599e000064
    ObjectId objectIdDateCounter2 = new ObjectId(date, 100); // 635981f6e40f61599e000064

    assertThat(objectIdDate).isNotEqualTo(objectIdDateCounter1);
    assertThat(objectIdDate).isNotEqualTo(objectIdDateCounter2);

    assertThat(objectIdDateCounter1).isEqualTo(objectIdDateCounter2);
}
```

此外，还可以通过直接提供十六进制值作为参数来创建ObjectId：

```
ObjectId objectIdHex = new ObjectId("635981f6e40f61599e000064");
```

还有更多创建ObjectId的可能性。我们可以传递byte[]或ByteBuffer类。如果我们通过将字节数组传递给构造函数来创建ObjectId，我们应该能够通过使用相同的字节数组创建ByteBuffer类来得到相同的ObjectId。

让我们看一个例子：

```
@Test
public void givenSameArrayOfBytes_whenComparingObjectIdsCreatedViaDifferentMethods_thenTheObjectIdsAreEqual(){
    byte[] bytes = "123456789012".getBytes();
    ObjectId objectIdBytes = new ObjectId(bytes);

    ByteBuffer buffer = ByteBuffer.wrap(bytes);
    ObjectId objectIdByteBuffer = new ObjectId(buffer);

    assertThat(objectIdBytes).isEqualTo(objectIdByteBuffer);
}
```

最后一种可能的方法是通过传递时间戳和计数器到构造函数来创建ObjectId。

## 4. ObjectId 的优缺点

正如所有事物一样，了解ObjectId的优缺点是值得的。

### 4.1 ObjectId 的好处
由于ObjectId是12字节长，它比16字节的UUID小。也就是说，如果我们在数据库中使用ObjectId而不是UUID，我们将节省一些空间。大约26500次ObjectId的使用可以比UUID节省大约1MB。这看起来是一个最小的数量。

尽管如此，如果数据库足够大，而且也有可能单个文档会有多个ObjectId的出现，那么磁盘空间和RAM的节省可能会更显著，因为最终文档会更小。其次，正如我们之前学到的，ObjectId中嵌入了时间戳，这在某些情况下可能很有用。

例如，确定哪个ObjectId是首先创建的，假设所有ObjectId都是自动生成的，而不是像我们之前看到的那样通过操作Date类到参数化构造函数中创建的。

### 4.2 ObjectId 的缺点
另一方面，还有一些甚至比12字节的ObjectId更小的标识符，这将节省更多的磁盘空间和RAM。此外，由于ObjectId只是一个生成的十六进制值，这意味着有**可能存在重复的id**。可能性非常小，但仍然存在。

## 5. 确保ObjectId 的唯一性
如果我们必须确保生成的ObjectId是唯一的，我们可以尝试围绕它进行一些编程，以确保它100%不是重复的。

### 5.1 捕获 DuplicateKeyException
假设我们向数据库中插入一个已经存在的_id字段的文档。在这种情况下，我们可以捕获**DuplicateKeyException**并重试插入操作，直到成功。此方法仅适用于**已创建唯一索引的字段**。

让我们看一个例子。考虑到一个User类：

```
public class User {
    public static final String NAME_FIELD = "name";

    private final ObjectId id;
    private final String name;

    // 构造函数
    // getter
}
```

我们将User插入数据库，然后尝试插入另一个具有相同ObjectId的User。这将导致抛出DuplicateKeyException。我们可以捕获它并重试User的插入操作。然而，这次我们将生成另一个ObjectId。为了这个测试，我们将使用嵌入式MongoDB库和Spring Data with MongoDB。

让我们看一个例子：

```
@Test
public void givenUserInDatabase_whenInsertingAnotherUserWithTheSameObjectId_DKEThrownAndInsertRetried() {
    // given
    String userName = "Kevin";
    User firstUser = new User(ObjectId.get(), userName);
    User secondUser = new User(ObjectId.get(), userName);

    mongoTemplate.insert(firstUser);

    // when
    try {
        mongoTemplate.insert(firstUser);
    } catch (DuplicateKeyException dke) {
        mongoTemplate.insert(secondUser);
    }

    // then
    Query query = new Query();
    query.addCriteria(Criteria.where(User.NAME_FIELD)
      .is(userName));
    List`<User>` users = mongoTemplate.find(query, User.class);
    assertThat(users).usingRecursiveComparison()
      .isEqualTo(Lists.newArrayList(firstUser, secondUser));
}
```

### 5.2 查找和插入
另一种可能的方法，可能不推荐，可能是查找具有给定ObjectId的文档，看看它是否存在。如果不存在，我们可以插入它。否则，抛出错误或生成另一个ObjectId并重试。这种方法也是不可靠的，因为MongoDB中没有**原子查找和插入**选项，这可能导致不一致。

**通常的做法是自动生成ObjectId并尝试插入文档而不确保其唯一性**。在每次插入时尝试捕获DuplicateKeyException并重试操作似乎有些过头。边缘情况的数量非常有限，而且如果不首先通过Date、计数器或时间戳来播种ObjectId，就很难重现这种情况。

然而，如果出于某种原因，我们不能承受由于这些边缘情况而有重复的ObjectId，那么我们会考虑使用上述方法来确保全局唯一性。

## 5. 结论
在这篇文章中，我们学习了什么是ObjectId，它是如何构建的，如何生成它，以及确保其唯一性可能的方法。最终，最好的想法是信任ObjectId的自动生成。

所有代码示例都可以在GitHub上找到。