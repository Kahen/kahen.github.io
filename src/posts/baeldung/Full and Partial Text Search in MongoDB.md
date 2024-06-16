---
date: 2024-06-16
category:
  - MongoDB
  - Java
tag:
  - Full-Text Search
  - Partial-Text Search
---
# MongoDB中的全文和部分文本搜索

全文搜索和部分文本搜索的需求在开发数据库应用程序时经常出现。它们还应该支持全文和部分文本匹配，以使这些搜索更加用户友好。为此，MongoDB提供了几种使用文本搜索查找相关文档的方法。

在本教程中，我们将探索MongoDB中的文本搜索，其特性，如何使用它，以及如何充分利用它。

尽管文本搜索查询是一个强大的工具，但它们需要特定的设置。为了实现这一点，我们需要在集合上创建一个文本索引。

**索引就像是特殊的文件夹，只保存集合中每个文档的一点点信息**。换句话说，它们与实际的文档本身是分开的。此外，MongoDB允许用户创建不同类型的索引。

幸运的是，MongoDB提供了设计用于促进字符串内容搜索的文本索引。这些索引灵活，可以包含多个字段，允许进行全面搜索。此外，这些索引帮助数据库更快地搜索集合。

首先，让我们通过指定连接字符串、数据库名称和集合名称来创建一个数据库客户端：

```java
@Before
public static void setup() {
    if (mongoClient == null) {
        mongoClient = MongoClients.create("mongodb://localhost:27017");
        database = mongoClient.getDatabase("baeldung");
        collection = database.getCollection("user");
    }
}
```

让我们还在集合的字段上创建一个文本索引：

```java
void createTextIndex(String field) {
    IndexOptions indexOptions = new IndexOptions();
    indexOptions.name("textIndex").unique(false).background(true);
    collection.createIndex(Indexes.text(field), indexOptions);
}
```

**有一个限制：一个集合只能有一个专用的文本搜索索引**。

### 3. 全文搜索

简单的全文搜索非常直接。我们可以输入关键词或短语，然后系统定位包含这些确切术语的文档。

除了简单的全文搜索外，还有几种执行全文搜索的方法。每种都有其自身的优势，并且适用于特定的用例。一些常见的方法包括布尔全文搜索、短语搜索和邻近搜索。

让我们创建一个执行文本搜索查询的方法：

```java
List`<Document>` searchUser(String query) {
    Document result = new Document("$text", new Document("$search", query));
    return collection.find(result).into(new ArrayList<>());
}
```

_$text_ 在使用文本索引索引的字段的内容上执行文本搜索，而 _$search_ 定义要搜索的目标文本。此外，_$text_ 使用空格对搜索字符串进行分词，并在搜索字符串中对所有此类标记执行逻辑或。**这意味着，当我们搜索“Java Spring”时，我们将找到所有包含“Java”或“Spring”或两者都有的文档**。

让我们创建一些记录来探索全文搜索功能：

```java
@Test
void whenSearchingUserWithFullText_thenCorrectCountReturned() {
    // WHEN
    insertUser("Leonel", "Java Spring");
    insertUser("John", "Java Spring MongoDB");
    insertUser("Smith", "Java");
    createTextIndex("description");

    // THEN
    assertEquals("All users with term 'Java' or 'Spring'", 3, searchUser("Java Spring").size());
}

// 我们还可以通过在搜索查询中添加“-”字符来排除一个词：
assertEquals("All users with term 'Java' or 'Spring' but not 'MongoDB'", 2, searchUser("Java Spring -MongoDB").size());

// 类似地，我们也可以通过将它们用双引号括起来来搜索确切的短语：
assertEquals("All users with term Java only", 1, searchUser("\"Java\"").size());
```

### 4. 部分文本搜索

MongoDB不原生支持部分搜索。与全文搜索不同，部分、模糊或子字符串搜索并不直接。搜索功能应用了针对停用词和词干提取的语言特定规则。

**支持语言的词干提取规则基于标准算法，这些算法处理常见的动词和名词，但通常不涉及专有名词**。

让我们尝试使用部分搜索来搜索用户：

```java
@Test
void whenSearchingUserWithPartialText_thenCorrectCountReturned() {
    // WHEN
    insertUser("LEONEL", "Java Spring");
    createTextIndex("name");

    // THEN
    assertEquals("Search with capital case", 1, mongoDBClient.searchUser("LEONEL").size());
    assertEquals("Search with lower case", 1, mongoDBClient.searchUser("leonel").size());
    assertEquals("Partial search", 1, mongoDBClient.searchUser("LEONE").size());
}

// 相反，由于词干提取规则，系统无法定位‘L’、‘LEO’或‘NEL’：
assertEquals("Partial search with L", 0, searchUser("L").size());
assertEquals("Partial search with LEO", 0, searchUser("LEO").size());
assertEquals("Partial search with NEL", 0, searchUser("NEL").size());
```

部分搜索的一种解决方法是使用 _$regex_。为此，我们将不需要文本索引，这可能会在集合非常大的情况下减慢搜索操作。

### 5. 结论

在这个快速教程中，我们检查了MongoDB中的全文和部分文本搜索。我们学习了如何使用搜索查询来精确地找到我们正在寻找的内容，并从搜索结果中排除某些术语。我们还发现，前缀和后缀在文档的部分搜索中不匹配，并找到了一种解决方法。

如常，所有的代码片段都可以在GitHub上找到。

发布帖子后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。