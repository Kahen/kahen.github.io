---
date: 2022-04-01
category:
  - spring
  - jpa
tag:
  - spring data jpa
  - jpa specifications
head:
  - - meta
    - name: keywords
      content: spring data jpa, jpa specifications, table join
---
# 使用Spring Data JPA规范连接表

在本简短教程中，我们将讨论Spring Data JPA规范的一个高级特性，它允许我们在创建查询时连接表。

让我们首先简要回顾一下JPA规范及其用法。

**Spring Data JPA引入了_Specification_接口，允许我们使用可重用的组件创建动态查询。**

在本文的代码示例中，我们将使用_Author_和_Book_类：

```java
@Entity
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    @OneToMany(cascade = CascadeType.ALL)
    private List`<Book>` books;

    // getters and setters
}
```

为了为_Author_实体创建动态查询，我们可以使用_Specification_接口的实现：

```java
public class AuthorSpecifications {

    public static Specification````````<Author>```````` hasFirstNameLike(String name) {
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.like(root.``<String>``get("firstName"), "%" + name + "%");
    }

    public static Specification````````<Author>```````` hasLastName(String name) {
        return (root, query, cb) ->
            cb.equal(root.``<String>``get("lastName"), name);
    }
}
```

最后，我们需要_AuthorRepository_扩展_JpaSpecificationExecutor_：

```java
@Repository
public interface AuthorsRepository extends JpaRepository`<Author, Long>`, JpaSpecificationExecutor````````<Author>```````` { }
```

因此，我们现在可以连接这两个规范，并使用它们创建查询：

```java
@Test
public void whenSearchingByLastNameAndFirstNameLike_thenOneAuthorIsReturned() {

    Specification````````<Author>```````` specification = hasLastName("Martin")
        .and(hasFirstNameLike("Robert"));

    List````````<Author>```````` authors = repository.findAll(specification);

    assertThat(authors).hasSize(1);
}
```

## 3. 使用JPA规范连接表

我们可以从数据模型中观察到_Author_实体与_Book_实体共享一对多关系：

```java
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    // getters and setters
}
```

Criteria Query API允许我们在创建_Specification_时连接这两个表。因此，我们将能够在查询中包含_Book_实体的字段：

```java
public static Specification````````<Author>```````` hasBookWithTitle(String bookTitle) {
    return (root, query, criteriaBuilder) -> {
        Join`<Book, Author>` authorsBook = root.join("books");
        return criteriaBuilder.equal(authorsBook.get("title"), bookTitle);
    };
}
```

现在让我们将这个新的Specification与之前创建的Specification结合起来：

```java
@Test
public void whenSearchingByBookTitleAndAuthorName_thenOneAuthorIsReturned() {

    Specification````````<Author>```````` specification = hasLastName("Martin")
        .and(hasBookWithTitle("Clean Code"));

    List````````<Author>```````` authors = repository.findAll(specification);

    assertThat(authors).hasSize(1);
}
```

最后，让我们看看生成的SQL并查看_JOIN_子句：

```sql
select
  author0_.id as id1_1_,
  author0_.first_name as first_na2_1_,
  author0_.last_name as last_nam3_1_
from
  author author0_
  inner join author_books books1_ on author0_.id = books1_.author_id
  inner join book book2_ on books1_.books_id = book2_.id
where
  author0_.last_name = ?
  and book2_.title = ?
```

## 4. 结论

在本文中，我们学习了如何使用JPA规范根据其关联实体之一查询表。

Spring Data JPA的规范提供了一种流畅、动态和可重用的方式来创建查询。

如常，源代码可在GitHub上获得。