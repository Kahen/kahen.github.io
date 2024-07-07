---
date: 2022-04-01
category:
  - JPA
  - 多对多关系
tag:
  - JPA
  - 多对多
  - 实体删除
head:
  - - meta
    - name: keywords
      content: JPA, 多对多关系, 实体删除, 数据库操作
---
# 在JPA中删除多对多关系的实体

在本教程中，我们将习如何在JPA中从多对多关系中删除实体。

多对多关系是一种两个实体通过一个额外的连接表相连的关系。为了有效地映射这些实体，我们应该遵循一些指导原则。

**首先，在定义多对多关系时，我们应该考虑使用_Set_而不是_List_。** 作为JPA实现的Hibernate不会以高效的方式从_List_中删除实体。

当使用_List_时，Hibernate会从连接表中删除所有实体，然后插入剩余的实体。这可能会导致性能问题。我们可以通过使用_Set_来轻松避免这个问题。

**其次，我们不应该在映射中使用_CascadeType.REMOVE_，因此也不应该使用_CascadeType.ALL_。**

在多对多关系中，两个实体是相互独立的。例如，假设我们有两个实体，_Post_和_Category_。当从_Post_实体中删除记录时，我们通常不想删除相关的_Category_实体。使用_CascadeType.REMOVE_，JPA将删除所有相关实体，即使那些可能仍然与其他实体相连的实体。

要定义JPA中的多对多关系，我们可以使用_@ManyToMany_注解。

多对多关联可以是单向的或双向的。

### 3. 从单向_@ManyToMany_中删除

现在，让我们看看如何从单向多对多关联中删除实体。

首先，让我们定义我们将在示例中使用的数据模型，_Post_和_Category_：

```java
@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(name = "post_category",
      joinColumns = @JoinColumn(name = "post_id"),
      inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set`<Category>` categories = new HashSet<>();

    // getters and setters
}
```

```java
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    // getters and setters
}
```

在这里，我们定义了关系为单向的，因为不需要从_Category_表中使用关联。此外，我们声明了_Post_实体为负责管理关系的实体。

现在，假设我们有两个_Post_实体，都与同一个_Category_相关联：

```java
Category category1 = new Category("JPA");
Category category2 = new Category("Persistence");

Post post1 = new Post("Many-to-Many Relationship");
post1.getCategories().add(category1);
post1.getCategories().add(category2);

Post post2 = new Post("Entity Manager");
post2.getCategories().add(category1);

entityManager.persist(post1);
entityManager.persist(post2);
```

接下来，让我们从第一个_Post_实体中删除类别：

```java
void givenEntities_whenRemove_thenRemoveAssociation() {
   Post post1 = entityManager.find(Post.class, 1L);
   Post post2 = entityManager.find(Post.class, 2L);
   Category category = entityManager.find(Category.class, 1L);

   post1.getCategories().remove(category);

   assertEquals(1, post1.getCategories().size());
   assertEquals(1, post2.getCategories().size());
}
```

结果，第一个_Post_和Category之间的关系被删除。此外，JPA并没有删除相关的类别。

由于我们使用的是_Set_而不是_List_，JPA**生成了一个单独的删除语句来从连接表中删除关联**。

### 4. 从双向_@ManyToMany_中删除

在双向关系中，我们可以从两边管理关联。

首先，让我们在_Book_和_Author_实体之间创建一个双向关联：

```java
@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "book_author",
      joinColumns = @JoinColumn(name = "book_id"),
      inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set`<Author>` authors = new HashSet<>();

    // getters and setters
}
```

```java
@Entity
@Table(name = "author")
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "authors")
    private Set`<Book>` books = new HashSet<>();

    // getters and setters
}
```

JPA将创建一个额外的连接表来存储两个实体之间的连接。这个表作为关联的子端。因此，_Author_和_Book_实体都代表父端。

然而，尽管父端看起来可能相同，但它们并不是。**关系的所有权是由_mappedBy_属性确定的。** 不是所有者的实体将具有_mappedBy_属性。

在我们的例子中，_Book_实体是所有者。因此，它将把关联更改传播到连接表。

### 4.1. 从所有者实体中删除

让我们看看如何从所有者侧删除实体。

**我们将向充当关联所有者的实体添加辅助方法。** 在我们的例子中，是_Book_实体：

```java
public void removeAuthor(Author author){
   this.authors.remove(author);
   author.getBooks().remove(this);
}
```

当删除作者时，我们可以调用辅助方法来删除关联：

```java
void givenEntities_whenRemoveFromOwner_thenRemoveAssociation() {
   Author author = (Author) entityManager
     .createQuery("SELECT author from Author author where author.name = ?1")
     .setParameter(1, "Ralph Johnson")
     .getSingleResult();

   Book book1 = entityManager.find(Book.class, 1L);
   Book book2 = entityManager.find(Book.class, 2L);

   book1.removeAuthor(author);
   entityManager.persist(book1);

   assertEquals(3, book1.getAuthors().size());
   assertEquals(1, book2.getAuthors().size());
}
```

### 4.2. 从非所有者实体中删除

当从不是关系所有者的实体中删除记录时，**我们应该手动删除关联**：

```java
for (Book book : author1.getBooks()) {
   book.getAuthors().remove(author1);
}
entityManager.remove(author1);
```

此外，让我们将代码放在方法内，并用_@PreRemove_注解进行注释：

```java
@PreRemove
private void removeBookAssociations() {
   for (Book book: this.books) {
       book.getAuthors().remove(this);
   }
}
```

JPA将在删除实体之前执行此方法中的所有内容。

最后，让我们创建一个测试来检查功能是否正常工作：

```java
void givenEntities_whenRemoveFromNotOwner_thenRemoveAssociation() {
    Author author = (Author) entityManager
      .createQuery("SELECT author from Author author where author.name = ?1")
      .setParameter(1, "Ralph Johnson")
      .getSingleResult();
    Book book1 = entityManager.find(Book.class, 1L);
    Book book2 = entityManager.find(Book.class, 2L);

    entityManager.remove(author);

    assertEquals(3, book1.getAuthors().size());
    assertEquals(0, book2.getAuthors().size());
}
```

## 5. 结论

在本文中，我们学习了如何在JPA中从多对多关系中删除实体。

像往常一样，示例可以在GitHub上找到。