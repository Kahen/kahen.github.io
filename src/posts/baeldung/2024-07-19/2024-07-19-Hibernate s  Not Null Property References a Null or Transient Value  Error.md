---
date: 2022-04-01
category:
  - Hibernate
  - JPA
tag:
  - Hibernate
  - Error
head:
  - - meta
    - name: keywords
      content: Hibernate, JPA, PropertyValueException, Nullability, Error Handling
---
# Hibernate的“非空属性引用了空或瞬态值”错误

在本文中，我们将学习Hibernate的_PropertyValueException_。特别是，我们将考虑“非空属性引用了空或瞬态值”的错误消息。

Hibernate主要在两种情况下抛出_PropertyValueException_：
- 当为标记为_nullable = false_的列保存一个_null_值时
- 当保存一个引用未保存实例的关联实体时

## 2. Hibernate的空值检查

首先，让我们讨论Hibernate的_@Column(nullable = false)_注解。**如果不存在其他Bean验证，我们可以依赖**Hibernate的空值检查。

此外，我们可以通过设置_hibernate.check_nullability = true_来强制执行此验证。为了重现以下示例，我们需要启用空值检查。

## 3. 为非空列保存_null_值

现在，让我们利用Hibernate的验证机制来重现一个简单的用例的错误。我们将尝试保存一个没有设置其必填字段的_@Entity_。为此示例，我们将使用简单的_Book_类：

```java
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String title;

    // getters and setters
}
```

_title_列的_nullable_标志设置为_false_。现在我们可以保存一个没有设置标题的_Book_对象，并断言抛出了_PropertyValueException_：

```java
@Test
public void whenSavingEntityWithNullMandatoryField_thenThrowPropertyValueException() {
    Book book = new Book();

    assertThatThrownBy(() -> session.save(book))
      .isInstanceOf(PropertyValueException.class)
      .hasMessageContaining("not-null property references a null or transient value");
}
```

因此，我们只需要在保存实体之前设置必填字段就可以解决问题：_book.setTitle("Clean Code")_。

## 4. 保存引用未保存实例的关联

在这一部分，我们将探索一个更复杂的设置中常见的场景。为此示例，我们将使用_Author_和_Article_实体，它们共享双向关系：

```java
@Entity
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany
    @Cascade(CascadeType.ALL)
    private List``<Article>`` articles;

    // constructor, getters and setters
}
```

_articles_字段有_@Cascade(CascadeType.ALL)_注解。因此，当我们保存一个_Author_实体时，操作将传播到所有的_Article_对象：

```java
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    @ManyToOne(optional = false)
    private Author author;

    // constructor, getters and setters
}
```

现在，让我们尝试保存一个_Author_和一些_Articles_并看看会发生什么：

```java
@Test
public void whenSavingBidirectionalEntityiesithCorrectParent_thenDoNotThrowException() {
    Author author = new Author("John Doe");
    author.setArticles(asList(new Article("Java tutorial"), new Article("What's new in JUnit5")));

    assertThatThrownBy(() -> session.save(author))
      .isInstanceOf(PropertyValueException.class)
      .hasMessageContaining("not-null property references a null or transient value");
}
```

当我们使用双向关系时，我们可能会犯忘记从两边更新分配的常见错误。**我们可以通过改变_Author_类的_setter_来更新所有子_articles_来避免这个问题。**

为了说明文章中提出的所有用例，我们将为此创建一个不同的方法。然而，从父实体的_setter_设置这些字段是一个好习惯：

```java
public void addArticles(List``<Article>`` articles) {
    this.articles = articles;
    articles.forEach(article -> article.setAuthor(this));
}
```

现在我们可以使用新方法设置分配，并期望没有错误：

```java
@Test
public void whenSavingBidirectionalEntitesWithCorrectParent_thenDoNotThrowException() {
    Author author = new Author("John Doe");
    author.addArticles(asList(new Article("Java tutorial"), new Article("What's new in JUnit5")));

    session.save(author);
}
```

## 5. 结论

在本文中，我们看到了Hibernate的验证机制是如何工作的。首先，我们发现了如何在项目中启用_nullability checking_。之后，我们举例说明了导致_PropertyValueException_的主要原因，并学习了如何修复它们。

像往常一样，源代码可以在GitHub上找到。