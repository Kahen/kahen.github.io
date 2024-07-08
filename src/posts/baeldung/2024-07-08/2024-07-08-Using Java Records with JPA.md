---
date: 2024-07-08
category:
  - Spring
  - JPA
tag:
  - Java Records
  - JPA
head:
  - - meta
    - name: keywords
      content: Java Records, JPA, Spring Data JPA, Hibernate
---

# 使用Java Records与JPA

## 1. 概述

在本教程中，我们将探讨如何将Java Records与JPA一起使用。我们将从探讨为什么记录不能用作实体开始。

然后，我们将看到如何将记录与JPA一起使用。我们还将看看如何在Spring Boot应用程序中使用Spring Data JPA与记录。

## 2. 记录与实体

记录是不可变的，用于存储数据。它们**包含字段、全参数构造函数、getter、toString、以及equals/hashCode方法。**由于它们是不可变的，它们没有setter。由于它们的语法简洁，它们通常在Java应用程序中用作数据传输对象（DTO）。

实体是映射到数据库表的类。它们用于表示数据库中的一个条目。它们的字段映射到数据库表中的列。

### 2.1 记录不能作为实体

实体由**JPA提供者处理。JPA提供者负责创建数据库表、将实体映射到表中，并将实体持久化到数据库。**在像Hibernate这样的流行JPA提供者中，实体是通过代理在运行时生成和管理的。

代理是在运行时生成的类，并扩展实体类。**这些代理依赖于实体类具有无参数构造函数和setter。由于记录没有这些，它们不能用作实体。**

### 2.2 其他将记录与JPA一起使用的方法

由于在Java应用程序中使用记录的便捷性和安全性，可能以其他方式将它们与JPA一起使用是有益的。

在JPA中，我们可以以以下方式使用记录：

- 将查询结果转换为记录
- 将记录用作在层之间传输数据的DTO
- 将实体转换为记录。

## 3. 项目设置

我们将使用Spring Boot来创建一个使用JPA和Spring Data JPA的简单应用程序。然后，我们将看看在与数据库交互时使用记录的几种方法。

### 3.1 依赖项

让我们从向我们的项目添加Spring Data JPA依赖项开始：

```xml
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-data-jpa`</artifactId>`
    `<version>`3.0.4`</version>`
`</dependency>`
```

除了Spring Data JPA，我们还需要配置数据库。我们可以使用任何SQL数据库。例如，我们可以使用内存中的H2数据库。

### 3.2 实体和记录

让我们创建一个我们将用于与数据库交互的实体。我们将创建一个_Book_实体，它将映射到数据库中的_book_表：

```java
@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String isbn;

    // 构造函数，getter，setter
}

```

让我们也创建一个与_Book_实体相对应的记录：

```java
public record BookRecord(Long id, String title, String author, String isbn) {}
```

接下来，我们将看看在我们的应用程序中使用记录而不是实体的几种方法。

JPA API提供了几种与数据库交互的方式，其中可以使用记录。让我们看看其中的一些。

### 4.1 标准查询构建器

让我们首先看看如何使用_CriteriaBuilder_与记录。我们将创建一个查询，返回数据库中的所有书籍：

```java
public class QueryService {
    @PersistenceContext
    private EntityManager entityManager;

    public List`````<BookRecord>````` findAllBooks() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery`````<BookRecord>````` query = cb.createQuery(BookRecord.class);
        Root`<Book>` root = query.from(Book.class);
        query.select(cb.construct(BookRecord.class, root.get("id"), root.get("title"), root.get("author"), root.get("isbn")));
        return entityManager.createQuery(query).getResultList();
    }
}
```

在上面的代码中，我们使用_CriteriaBuilder_创建一个返回_BookRecord_的_CriteriaQuery_。

让我们看看上面代码中的一些步骤：

- 我们使用_CriteriaBuilder.createQuery()_方法创建一个_CriteriaQuery_。**我们传递我们想要返回的记录类的类作为参数**
- 然后，我们使用_CriteriaQuery.from()_方法创建一个_Root_。我们传递实体类作为参数。这就是我们**指定我们想要查询的表的方式**
- 然后，我们使用_CriteriaQuery.select()_方法指定一个选择子句。我们使用_CriteriaBuilder.construct()_方法将查询结果转换为记录。**我们传递记录的类和我们想要传递给记录构造函数的实体字段作为参数**
- 最后，我们使用_EntityManager.createQuery()_方法从_CriteriaQuery_创建一个_TypedQuery_。然后，我们使用_TypedQuery.getResultList()_方法获取查询的结果

这将创建一个选择查询以获取数据库中的所有书籍。然后，它将使用_construct()_方法将每个结果转换为_BookRecord_，并在调用_getResultList()_方法时返回记录列表而不是实体列表。

这样，我们可以使用实体类来创建查询，但在应用程序的其余部分使用记录。

### 4.2 类型化查询

类似于_CriteriaBuilder_，我们可以使用类型化查询返回记录而不是实体。让我们在我们的_QueryService_中添加一个方法，使用类型化查询以记录的形式获取单本书：

```java
public BookRecord findBookByTitle(String title) {
    TypedQuery`````<BookRecord>````` query = entityManager
        .createQuery("SELECT new com.baeldung.recordswithjpa.records.BookRecord(b.id, b.title, b.author, b.isbn) " +
                     "FROM Book b WHERE b.title = :title", BookRecord.class);
    query.setParameter("title", title);
    return query.getSingleResult();
}
```

**_TypedQuery_允许我们将查询结果转换为任何类型，只要该类型具有与查询结果相同数量的参数的构造函数。**

在上面的代码中，我们使用_EntityManager.createQuery()_方法创建一个_TypedQuery_。我们传递查询字符串和记录的类作为参数。然后，我们使用_TypedQuery.setParameter()_方法设置查询的参数。最后，我们使用_TypedQuery.getSingleResult()_方法获取查询的结果，它将是一个_BookRecord_对象。

### 4.3 本地查询

我们还可以使用本地查询以记录的形式获取查询结果。然而，**本地查询不允许我们将结果转换为任何类型。相反，我们需要使用映射将结果转换为记录。**首先，让我们在我们的实体中定义一个映射：

```java
@SqlResultSetMapping(
  name = "BookRecordMapping",
  classes = @ConstructorResult(
    targetClass = BookRecord.class,
    columns = {
      @ColumnResult(name = "id", type = Long.class),
      @ColumnResult(name = "title", type = String.class),
      @ColumnResult(name = "author", type = String.class),
      @ColumnResult(name = "isbn", type = String.class)
    }
  )
)
@Entity
@Table(name = "book")
public class Book {
    // ...
}

```

映射将以以下方式工作：

- _@SqlResultSetMapping_注解的_name_属性指定映射的名称。
- _@ConstructorResult_注解指定我们想要使用记录的构造函数来转换结果。
- _@ConstructorResult_注解的_targetClass_属性指定记录的类。
- _@ColumnResult_注解指定列名称和列的类型。这些列值将传递给记录的构造函数。

然后，我们可以使用此映射在我们的本地查询中以记录的形式获取结果：

```java
public List`````<BookRecord>````` findAllBooksUsingMapping() {
    Query query = entityManager.createNativeQuery("SELECT * FROM book", "BookRecordMapping");
    return query.getResultList();
}

```

这将创建一个本地查询，返回数据库中的所有书籍。它将使用映射将结果转换为_BookRecord_，并在调用_getResultList()_方法时返回记录列表而不是实体列表。

## 5. 使用Spring Data JPA与记录

Spring Data JPA提供了对JPA API的一些改进。它使我们能够在几种方式上使用Spring Data JPA存储库中的记录。让我们看看如何使用记录与Spring Data JPA存储库。

### 5.1 从实体到记录的自动映射

Spring Data存储库允许我们将记录用作存储库中方法的返回类型。这将自动将实体映射到记录。只有在记录具有与实体完全相同的字段时，这才可能。让我们看一个例子：

```java
public interface BookRepository extends JpaRepository``<Book, Long>`` {
    List`````<BookRecord>````` findBookByAuthor(String author);
}

```

由于_BookRecord_具有与_Book_实体相同的字段，因此在我们调用_findBookByAuthor()_方法时，Spring Data JPA将自动将实体映射到记录，并返回记录列表而不是实体列表。

### 5.2 使用记录与@Query

类似于_TypedQuery_，我们可以使用记录与Spring Data JPA存储库中的_@Query_注解。让我们看一个例子：

```java
public interface BookRepository extends JpaRepository``<Book, Long>`` {
