---
date: 2024-06-26
category:
  - Spring Data JPA
  - JPA
tag:
  - Spring
  - JPA
  - Hibernate
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, JPA, Hibernate, 最后一条记录, 查询
---
# 如何在Spring Data JPA中获取最后一条记录

在这个简短的教程中，我们将探索在Spring Data JPA中获取最后一条记录的不同方法。首先，我们将看看如何使用派生查询方法来实现。然后，我们将探索如何使用`@Query`注解来达到同样的目的。

## 2. 设置

**首先，让我们创建并初始化我们想要查询的表。**让我们从创建一个`Post`实体类开始：

```java
@Entity
public class Post {

    @Id
    private Long id;
    private String title;
    private LocalDate publicationDate;

    // 标准的getter和setter
}
```

这里，`@Entity`表示注解的类代表数据库中的一个表。同样，`@Id`注解定义了主键。

为了保持简单，我们将使用H2作为我们的内存数据库。首先，让我们添加一个基本的SQL脚本来创建映射到`Post`类的`post`表：

```sql
DROP TABLE IF EXISTS post;
CREATE TABLE post(
    id INT PRIMARY KEY,
    title VARCHAR(200),
    publication_date DATE
)
```

接下来，让我们用数据填充表：

```sql
INSERT INTO post (id, title, publication_date) VALUES(1, 'Facebook post', '2020-11-10');
INSERT INTO post (id, title, publication_date) VALUES(2, 'Instagram post', '2020-12-24');
INSERT INTO post (id, title, publication_date) VALUES(3, 'Twitter post', '2023-01-10');
INSERT INTO post (id, title, publication_date) VALUES(4, 'tiktok post', '2023-03-18');
INSERT INTO post (id, title, publication_date) VALUES(5, 'Pinterest post', '2023-09-09');
```

如我们所见，这里的最后一条记录是`id`为5的记录。因此，为了实现我们获取最后一条记录的目标，我们将根据`publication_date`反转记录的顺序。然后，我们将使用Spring Data JPA方法来获取排序结果中的第一个记录。这样，我们就可以得到表中的最后一条记录。

## 3. 使用派生查询方法

Spring Data JPA因其派生查询方法而受到赞誉。**这个特性提供了一种方便的方式来从方法名称生成查询，而无需手动编写SQL语句。**

Spring Data JPA没有提供任何直接的方法来获取最后一条记录。另一方面，它提供了从一组记录的开始检索数据的简单方法。

例如，我们可以使用`findFirst`前缀来创建一个派生查询，以获取第一条记录。那么，让我们看看它的实际应用：

```java
public interface PostRepository extends JpaRepository`<Post, Integer>` {

    Post findFirstByOrderByPublicationDateDesc();

}
```

方法名称`findFirstByOrderByPublicationDateDesc()`的每个部分都有其意义。**动词“find”告诉Spring Data JPA生成一个选择查询，而“First”表示它应该从结果集中检索第一条记录。**

此外，“OrderByPublicationDateDesc”表示我们希望按`publicationDate`属性的逆序对记录进行排序。

在这里，Spring Data JPA智能地评估方法名称。它首先按发布日期的降序对帖子进行排序。这样，它将最后一条记录放在结果的开头。

然后，它解释“findFirst”以返回排序记录的第一个元素。结果，我们得到了表中的最后一条记录。

现在，让我们添加一个测试用例来确认一切按预期工作：

```java
@Test
void givenPosts_whenUsingFindFirstDerivedQuery_thenReturnLastPost() {
    Post post = postRepository.findFirstByOrderByPublicationDateDesc();

    assertNotNull(post);
    assertEquals(5, post.getId());
}
```

我们可以看到我们的测试成功通过。

同样，**我们可以使用`findTop`关键字来实现相同的结果。**我们可以无问题地交替使用`findFirst`或`findTop`：

```java
Post findTopByOrderByPublicationDateDesc();
```

最后，让我们为`findTopByOrderByPublicationDateDesc()`方法创建另一个测试用例：

```java
@Test
void givenPosts_whenUsingFindTopDerivedQuery_thenReturnLastPost() {
    Post post = postRepository.findTopByOrderByPublicationDateDesc();

    assertNotNull(post);
    assertEquals(5, post.getId());
}
```

如上所示，测试用例成功通过。

## 4. 使用`@Query`注解

**另一种解决方案是使用`@Query`注解将方法绑定到检索最后一条记录的查询上。**默认情况下，`@Query`接受JPQL查询。所以，让我们在我们的`PostRepository`中添加另一个名为`findLastPost()`的方法，并使用`@Query`来指定获取最后一条帖子的查询：

```java
@Query("SELECT p FROM Post p ORDER BY p.publicationDate DESC LIMIT 1")
Post findLastPost();
```

简而言之，我们选择了按发布日期逆序排序的帖子。然后，我们使用`LIMIT 1`仅检索一个帖子。返回的帖子表示最后一条记录。

像往常一样，让我们添加一个测试用例来测试我们的新方法：

```java
@Test
void givenPosts_whenUsingQueryAnnotation_thenReturnLastPost() {
    Post post = postRepository.findLastPost();

    assertNotNull(post);
    assertEquals(5, post.getId());
}
```

毫不意外，最后一条记录是`id`为5的帖子。

## 5. 结论

在这个教程中，我们探索了使用Spring Data JPA检索特定表中最后一条记录的不同方式。首先，我们看到了如何使用派生查询方法来实现它。然后，我们在`@Query`注解中编写了一个JPQL查询，获得了相同的结果。

一如既往，本文的完整代码可以在GitHub上找到。