---
date: 2024-06-19
category:
  - Java
  - jOOQ
tag:
  - jOOQ
  - SQL
  - Java
head:
  - - meta
    - name: keywords
      content: jOOQ, SQL, Java, 数据库, 表连接
---

# 使用jOOQ连接两个表

jOOQ（Java Object Oriented Querying）是一个强大的库，它通过使我们能够以面向对象的方式编写SQL查询，从而简化了Java中的数据库交互。在关系数据库中，连接表是一个基本操作，它允许我们根据特定条件从多个表中组合数据。在本教程中，我们将探索jOOQ中可用的各种连接类型。

## 2. 设置jOOQ

使用jOOQ连接两个表涉及使用jOOQ提供的DSL（领域特定语言）来构建SQL查询。

要使用jOOQ，我们需要将jOOQ和PostgreSQL依赖项添加到我们的Maven项目的_pom.xml_文件中：

```
``<dependency>``
    ``<groupId>``org.jooq``</groupId>``
    ``<artifactId>``jooq``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.postgresql``</groupId>``
    ``<artifactId>``postgresql``</artifactId>``
``</dependency>``
```

在开始使用连接之前，我们需要使用jOOQ建立到数据库的连接。让我们创建一个_getConnection()_方法来获取用于数据库交互的_DSLContext_对象：

```java
public static DSLContext getConnection() {
    try {
        Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        DSLContext context = DSL.using(conn, SQLDialect.POSTGRES);
        return context;
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
}
```

我们将在整个教程中使用_context_对象与数据库交互：

```java
DSLContext context = DBConnection.getConnection();
```

**此外，jOOQ提供了一个代码生成器，它根据我们的数据库架构生成Java类。** 我们将假设数据库中已经创建了_Store_、_Book_和_BookAuthor_表及其各自的架构。

接下来，我们可以使用_DSLContext_对象在注解为_@BeforeClass_的方法中插入测试数据，以确保它在每个测试之前运行。让我们将试数据插入集成到我们的设置方法中：

```java
@BeforeClass
public static void setUp() throws Exception {
    context = DBConnection.getConnection();

    context.insertInto(Tables.STORE, Store.STORE.ID, Store.STORE.NAME)
      .values(1, "ABC Branch I ")
      .values(2, "ABC Branch II")
      .execute();

    context.insertInto(Tables.BOOK, Book.BOOK.ID, Book.BOOK.TITLE, Book.BOOK.DESCRIPTION,
      Book.BOOK.AUTHOR_ID, Book.BOOK.STORE_ID)
      .values(1, "Article 1", "This is article 1", 1, 1)
      .values(2, "Article 2", "This is article 2", 2, 2)
      .values(3, "Article 3", "This is article 3", 1, 2)
      .values(4, "Article 4", "This is article 4", 5, 1)
      .execute();

    context.insertInto(Tables.BOOKAUTHOR, Bookauthor.BOOKAUTHOR.ID, Bookauthor.BOOKAUTHOR.NAME,
      Bookauthor.BOOKAUTHOR.COUNTRY)
      .values(1, "John Smith", "Japan")
      .values(2, "William Walce", "Japan")
      .values(3, "Marry Sity", "South Korea")
      .values(4, "Morry Toh", "England")
      .execute();
}
```

## 3. 使用_join_子句

在jOOQ中，_SelectJoinStep````````<Record>````````_是一个接口，代表在构建带有连接的_SELECT_查询的过程中的一个步骤。我们可以使用_select()_等方法来指定我们想要从涉及的表中检索哪些列。

jOOQ中的_join()_方法用于根据指定条件执行表之间的内连接。**内连接检索在两个表中都满足特定条件的行。**

以下是一个基于作者ID连接_Book_和_BookAuthor_表的示例：

```java
SelectJoinStep````````<Record>```````` query = context.select()
  .from(Tables.BOOK)
  .join(Tables.BOOKAUTHOR)
  .on(field(Tables.BOOK.AUTHOR_ID).eq(field(Tables.BOOKAUTHOR.ID)));

assertEquals(3, query.fetch().size());
```

这是一个扩展示例，展示了连接多个表：

```java
SelectJoinStep````````<Record>```````` query = context.select()
  .from(Tables.BOOK)
  .join(Tables.BOOKAUTHOR)
  .on(field(Tables.BOOK.AUTHOR_ID).eq(field(Tables.BOOKAUTHOR.ID)))
  .join(Tables.STORE)
  .on(field(Tables.BOOK.STORE_ID).eq(field(Tables.STORE.ID)));

assertEquals(3, query.fetch().size());
```

我们向_Store_表添加了另一个连接。这个连接操作基于_Book_表中的_STORE_ID_列和_Store_表中的ID列，将_Book_和_Store_表连接起来。通过添加这个额外的连接，查询现在从三个表中检索数据：_Book_、_BookAuthor_和_Store_。

## 4. 使用外连接

jOOQ支持各种连接类型，除了默认的内连接，还有外连接。**外连接允许我们检索记录，即使在连接的表中没有匹配的记录。**

### 4.1. 左外连接

左连接包括左表_Book_的所有行和右表_BookAuthor_的匹配行。来自右表的任何不匹配的行将为特定于作者的列具有_null_值。

让我们看看如何使用jOOQ执行左外连接：

```java
SelectJoinStep````````<Record>```````` query = context.select()
  .from(Tables.BOOK)
  .leftOuterJoin(Tables.BOOKAUTHOR)
  .on(field(Tables.BOOK.AUTHOR_ID).eq(field(Tables.BOOKAUTHOR.ID)));

assertEquals(4, query.fetch().size());
```

在输出中，最后一行的作者列显示_null_而不是相应的作者条目：

```
+----+---------+---------+-----------------+--------+------+-------------+-------+
|  id|author_id|title    |description      |store_id|    id|name         |country|
+----+---------+---------+-----------------+--------+------+-------------+-------+
|   1|        1|   Book 1|This is    book 1|       1|     1|John Smith   |Japan  |
|   2|        2|   Book 2|This is    book 2|       2|     2|William Walce|Japan  |
|   3|        1|   Book 3|This is    book 3|       2|     1|John Smith   |Japan  |
|   4|        5|   Book 4|This is    book 4|       1|{null}|{null}       |{null} |
+----+---------+---------+-----------------+--------+------+-------------+-------+
```

在执行左外连接时，如查询所示，左表_Book_的所有行都包含在结果集中。**在这种情况下，尽管最后一行在_BookAuthor_表中没有匹配的_author_id_，它仍然出现在输出中。** 然而，由于_BookAuthor_表中没有相应的数据可用，因此这一行的特定于作者的列（_id_、_name_、_country_）具有_null_值。

### 4.2. 右外连接

与此相反，右连接包括右表_BookAuthor_的所有行，并将其与左表_Book_的行进行匹配。左表中没有与右表中的任何条目匹配的行将具有书籍特定列的_null_值。

让我们看看如何使用jOOQ执行右外连接：

```java
SelectJoinStep````````<Record>```````` query = context.select()
  .from(Tables.BOOK)
  .rightOuterJoin(Tables.BOOKAUTHOR)
  .on(field(Tables.BOOK.AUTHOR_ID).eq(field(Tables.BOOKAUTHOR.ID)));

assertEquals(5, query.fetch().size());
```

与左外连接类似，在输出中，最后两位作者没有相关的图书记录，导致_null_值：

```
+------+---------+---------+-----------------+--------+----+-------------+-----------+
|    id|author_id|title    |description      |store_id|  id|name         |    country|
+------+---------+---------+-----------------+--------+----+-------------+-----------+
...
|{null}|   {null}|{null}   |{null}           |  {null}|   4|Morry Toh    |England    |
|{null}|   {null}|{null}   |{null}           |  {null}|   3|Marry Sity   |South Korea|
+------+---------+---------+-----------------+--------+----+-------------+-----------+
```

### 4.3. 全外连接

全外连接结合了_Book_和_BookAuthor_表的所有行，无论是否有匹配。****没有匹配的行在相反表中的列具有_null_值。**

要在jOOQ中执行全外连接，我们可以使用以下语法：

```java
SelectJoinStep````````<Record>```````` query = context.select()
  .from(Tables.BOOK)
  .fullOuterJoin(Tables.BOOKAUTHOR)
  .on(field(Tables.BOOK.AUTHOR_ID).eq(field(Tables.BOOKAUTHOR.ID)));

assertEquals(6, query.fetch().size());
```

自然连接根据匹配的列名自动确定连接条件。这在连接条件使用如_AUTHOR_ID_这样的公共列时非常有帮助：

```java
SelectJoinStep````````<Record>```````` query = context.select()
  .from(Tables.BOOK)
  .naturalJoin(Tables.BOOKAUTHOR);

assertEquals(4, query.fetch().size());
```

然而，如果列名不打算用于连接或数据类型不匹配，可能会发生意外的结果。在输出中，我们观察到有一条记录被错误地匹配了：

```
+----+---------+---------+-----------------+--------+----+-------------+-------+
|  id|author_id|title    |description      |store_id|  id|name         |country|
+----+---------+---------+-----------------+--------+----+-------------+-------+
...
|   4|        5|   Book 4|This is    book 4|       1|   4|Morry Toh    |England|
+----+---------+---------+-----------------+--------+----+-------------+-------+
```

## 6. 使用交叉连接

**交叉连接是最基本的连接类型，其中一个表的每一行都与另一个表的每一行结合。** 这在特定场景中可能很有用，比如我们有一个_Store_和_Book_表。我们想要显示所有可能的商店-书籍组合列表。

让我们检查执行交叉连接的结果：

```java
SelectJoinStep````````<Record>```````` query = context.select()
  .from(Tables.STORE)
  .crossJoin(Tables.BOOK);

assertEquals(8, query.fetch().size());
```

交叉连接有效地生成了每种可能的组合，使我们能够展示像“_Branch I – Book 1_”、“_Branch I – Book 2_”等选项。**然而，由于交叉连接可能会创建非常大的数据集，特别是在涉及的表有很多行的情况下，应该谨慎使用。**

## 7. 结论

在本文中，我们学习了如何在jOOQ中连接表。我们讨论了各种类型的连接，包括内连接、外连接（左、右和全外连接）、自然连接和交叉连接。此外，我们看到自然连接和交叉连接可能很有用，但由于潜在的意外结果或性能问题，尤其是在处理大型数据集时，应该小心使用。

如常，示例的源代码可在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。

OK