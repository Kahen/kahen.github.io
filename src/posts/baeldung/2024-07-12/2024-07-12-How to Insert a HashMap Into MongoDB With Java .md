---
date: 2022-04-01
category:
  - Java
  - MongoDB
tag:
  - HashMap
  - Spring Data MongoDB
head:
  - - meta
    - name: keywords
      content: Java, MongoDB, HashMap, 插入, 数据库
---
# 如何使用Java将HashMap插入MongoDB？

在这个快速教程中，我们将学习如何在Java中使用HashMap与MongoDB进行交互。MongoDB拥有一个对map友好的API，而Spring Data MongoDB使得使用map或map列表的工作变得更加直接。

## 2. 设置我们的场景

Spring Data MongoDB带有MongoTemplate，它有许多重载版本的insert()方法，允许我们将map插入到我们的集合中。MongoDB以JSON格式表示一个文档。因此，我们可以用Java中的Map````<String, Object>````来复制它。

我们将使用MongoTemplate和简单的可重用map来实现我们的用例。首先，创建map引用并注入MongoTemplate：

```java
class MongoDbHashMapIntegrationTest {
    private static final Map````<String, Object>```` MAP = new HashMap<>();
    
    @Autowired
    private MongoTemplate mongo;
}
```

然后，我们将map初始化为几个不同类型的条目：

```java
@BeforeAll
static void init() {
    MAP.put("name", "Document A");
    MAP.put("number", 2);
    MAP.put("dynamic", true);
}
```

我们使用@BeforeAll标记它，以便我们所有的测试都可以使用它。

## 3. 直接插入单个Map

首先，我们调用mongo.insert()并选择一个集合来放置它：

```java
@Test
void whenUsingMap_thenInsertSucceeds() {
    Map````<String, Object>```` saved = mongo.insert(MAP, "map-collection");
    
    assertNotNull(saved.get("_id"));
}
```

不需要特定的包装器。插入后，我们的map变成了我们集合中的一个单独的JSON文档。最重要的是，我们可以检查MongoDB生成的_id属性的存在，确保它被正确处理。

## 4. 直接批量插入Map

我们也可以插入Map的集合。每次插入都会成为一个不同的文档。另外，为了避免插入重复项，我们将使用一个Set。

**让我们将我们之前创建的map以及一个新的map添加到我们的set中：**

```java
@Test
void whenMapSet_thenInsertSucceeds() {
    Set<Map````<String, Object>````> set = new HashSet<>();
    
    Map````<String, Object>```` otherMap = new HashMap<>();
    otherMap.put("name", "Other Document");
    otherMap.put("number", 22);
    
    set.add(MAP);
    set.add(otherMap);
    
    Collection<Map````<String, Object>````> insert = mongo.insert(set, "map-set");
    
    assertEquals(2, insert.size());
}
```

结果，我们得到了两次插入。这种方法有助于减少一次性添加大量文档的开销。

## 5. 从Map构建Document并插入

Document类是Java中处理MongoDB文档的推荐方式。它实现了Map和Bson，使得工作变得容易。让我们使用接受map的构造函数：

```java
@Test
void givenMap_whenDocumentConstructed_thenInsertSucceeds() {
    Document document = new Document(MAP);
    
    Document saved = mongo.insert(document, "doc-collection");
    
    assertNotNull(saved.get("_id"));
}
```

内部，Document使用LinkedHashMap，保证插入的顺序。

## 6. 从Map构建BasicDBObject并插入

尽管Document类是首选，我们也可以从未map构建一个BasicDBObject：

```java
@Test
void givenMap_whenBasicDbObjectConstructed_thenInsertSucceeds() {
    BasicDBObject dbObject = new BasicDBObject(MAP);
    
    BasicDBObject saved = mongo.insert(dbObject, "db-collection");
    
    assertNotNull(saved.get("_id"));
}
```

**BasicDBObject在我们处理遗留代码时仍然很有帮助，因为Document类仅从MongoDB驱动程序版本3开始可用。**

## 7. 从Object值流构建Document并插入

在我们最后一个示例中，我们将从未map构建一个Document对象，其中每个键的值是Object值的列表。由于我们知道值的格式，我们可以通过为每个值放置一个属性名称来构建我们的Document。

让我们首先构建我们的输入map：

```java
Map`<String, List```<Object>````> input = new HashMap<>();
List```<Object>``` listOne = new ArrayList<>();
listOne.add("Doc A");
listOne.add(1);

List```<Object>``` listTwo = new ArrayList<>();
listTwo.add("Doc B");
listTwo.add(2);

input.put("a", listOne);
input.put("b", listTwo);
```

**如我们所见，没有属性名称，只有值。** 所以，让我们流化我们的input的entrySet()并从中构建我们的结果。为此，我们将在我们的input中的每个条目收集到一个HashSet中。**然后，我们将在累加器函数中构建一个Document，将条目键作为_id属性。之后，我们将迭代条目值，将它们放在适当的属性名下。** 最后，我们将每个Document添加到我们的结果中：

```java
Set``<Document>`` result = input.entrySet()
  .stream()
  .collect(HashSet``<Document>``::new,
    (set, entry) -> {
      Document document = new Document();
      
      document.put("_id", entry.getKey());
      Iterator```<Object>``` iterator = entry.getValue()
        .iterator();
      document.put("name", iterator.next());
      document.put("number", iterator.next());
      
      set.add(document);
    },
    Set::addAll
  );
```

让我们注意，我们在collect()的第三个参数在这个例子中不需要。但那是因为只有并行流使用合并函数。

**最后，我们可以将结果插入MongoDB：**

```java
mongo.insert(result, "custom-set");
```

这种策略很有用，例如，如果我们想将CSV值转换为JSON。

## 8. 结论

在本文中，我们看到了使用HashMap和HashMap列表的不同方法将文档插入MongoDB集合。我们使用了MongoTemplate来简化任务，并使用了最常见的文档抽象：BasicDBObject和Document。

并且，正如往常一样，源代码可以在GitHub上找到。翻译已完成，以下是剩余部分：

## 8. 结论

在这篇文章中，我们看到了不同的方式来使用HashMap和HashMap列表将文档插入MongoDB集合。我们使用了MongoTemplate来简化任务，并使用了最常见的文档抽象：BasicDBObject和Document。

而且，正如往常一样，源代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/11c3bee512ea79aa4341510e5bb5f001?s=50&r=g)![img](https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png)

OK