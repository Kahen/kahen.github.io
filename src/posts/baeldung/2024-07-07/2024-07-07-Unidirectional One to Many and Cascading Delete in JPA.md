---
date: 2024-07-08
category:
  - Spring JPA
  - 数据库
tag:
  - JPA
  - 级联删除
  - 单向一对多
head:
  - - meta
    - name: keywords
      content: Spring JPA, 级联删除, 单向一对多关系, 数据库完整性
---

# JPA中单向一对多关系及级联删除

## 1. 引言

在本教程中，我们将探索JPA在执行单向一对多关系实体之间的级联删除功能。我们将简要解释在此背景下级联删除的含义。然后，我们将使用一个简单的例子来演示JPA如何实现所需的结果。最后，我们将在内存H2数据库上进行集成测试，以验证该过程是否正确工作。

## 2. 单向一对多关系

从本质上讲，在关系数据模型中，单向一对多关系是两种表之间的一种关系类型，其中一个表在另一个表中有多个相关记录。然而，第二个表并不直接与第一个表相关。这意味着关系只在一个方向上流动。

转到JPA，当一个实体对相关实体的集合有引用时，可以建立两个实体之间的单向一对多关系。然而，我们不能从相关实体回溯到第一个实体。通常，包含引用的实体称为父实体，被引用的实体称为子实体。

让我们考虑文章及其评论的例子。正如我们可以想象的，一篇文章可以有多个相关评论，但一个评论只能属于一篇文章。这里，_Article_ 是父实体，_Comment_ 是子实体。

现在，让我们设置代表_Article_和_Comment_的JPA实体：

我们希望_Article_能够引用其所有评论以及其他字段：

```java
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    @OneToMany
    private Set``````<Comment>`````` comments = new HashSet<>();
    //...setters and getters
}
```

在这个例子中，我们向_Article_实体添加了_Set``````<Comment>``````_并用_@OneToMany_进行了注解。这向JPA表明了_Article_和_Comment_之间的单向一对多关系。JPA将自动生成支持这种关系所需的数据库架构。

接下来，让我们定义_Comment_：

```java
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String description;
    private Date date;

    //...setters and getters
}
```

我们可以看到_Comment_实体内部没有对_Article_的引用。因此，我们的例子代表了单向关系。

**在上面的例子中，如果我们决定删除_Article_，与其相关的任何_Comment_将被留下作为悬挂引用或孤立对象。**

为了解决这个问题，JPA提供了一些属性，可以用来传播删除并清理孤立对象。

让我们扩展我们在_Article_对象中已经建立的_Set``````<Comment>``````_上的_@OneToMany_注解。这个注解也可以与几个选项一起使用，以自定义关系映射和行为。**对于级联删除有用的选项是_cascade_**。**本上，_cascade_允许我们定义哪些操作（持久化，合并，删除）在父实体上应该被级联到相关子实体上**。

**JPA还提供了一个设置所有操作的级联级别的选项。这被称为_CascadingType.All_**。**如果我们只想在删除父实体时级联删除子实体，那么我们可以使用方法_CascadingType.Remove_。**

**我们将与级联一起使用的第二个选项是_orphanRemoval_。**

让我们利用JPA提供的这两种选项，结合我们之前建立的_@OneToMany_注解：

```java
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set``````<Comment>`````` comments = new HashSet<>();

   //...setters and getters
}
```

**除了使用_CascadeType.All_或_CascadeType.remove_，设置_orphanRemoval_属性为true以确保正确删除孤立实体也是至关重要的。有了这个属性设置，JPA会自动从数据库中删除任何孤立实体**。通过使用级联删除.All或级联删除.Remove与OrphanedRemoval=true；我们可以高效地管理数据，维护数据完整性，并促进自动删除过时的引用和数据库清理。

## 4. 集成测试

让我们使用内存H2数据库测试我们的级联删除，假设我们已经设置了服务和JPA存储库层。主要的，我们将测试当删除_Article_时，其相关的_Comments_是否自动被删除。

```java
@Test
@Transactional
public void givenAnArticleAndItsComments_whenDeleteArticle_thenCommentsDeletedAutomatically() {

    Set``````<Comment>`````` comments = new HashSet<>();
    Article article = new Article();
    article.setName("introduction to Spring");

    Comment comment1 = new Comment();
    comment1.setDescription("Explain types of Autowired");
    comment1.setDate(Date.from(Instant.now()));

    Comment comment2 = new Comment();
    comment2.setDescription("Good article");
    comment2.setDate(Date.from(Instant.now()
      .minus(10, ChronoUnit.MINUTES)));

    comments.add(comment1);
    comments.add(comment2);

    article.setComments(comments);
    articleRepository.save(article);

    List`<Article>` articles = articleRepository.findAll();
    assertThat(articles.size()).isEqualTo(1);
    Article retrievedArticle = articles.get(0);

    List``````<Comment>`````` fetchedComments = commentRepository.findAll();
    assertThat(fetchedComments.size()).isEqualTo(2);

    articleService.deleteArticle(retrievedArticle);
    assertThat(articleRepository.findAll()).isEmpty();

    assertThat(commentRepository.findAll()).isEmpty();

}
```

在这里，我们可以看到级联删除在起作用。在我们使用_articleService.deleteArticle(retrievedArticle)_删除_Article_之后，然后使用_commentRepository.findAll()_检索评论，我们得到一个空列表，这意味着所有评论都已通过从_Article_（父）到_Comment_（子）的级联删除被删除。

## 5. 结论

在本文中，我们简要概述了级联删除，重点关注单向一对多关系。我们查看了JPA提供的_@OneToMany_注解中的_cascade_和_orphan removal_选项，以实现级联删除和数据库中的数据完整性。**我们查看了_CascadeType.All_和_CascadeType.Remove_以实现当父实体被删除时相关子实体的级联删除**。**此外，我们还强调了使用_OrphanRemoval_选项的重要性，以确保数据库记录按要求被删除**。

最后，我们设置了一个Spring Boot集成测试，以查看级联删除的实际效果。

如往常一样，文章的完整源代码可在GitHub上获得。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/ba372319eaeba50279f8ab63c58e438d?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-persistence-post-footer-icn-1.0.0.png)

OK