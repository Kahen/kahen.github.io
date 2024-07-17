---
date: 2022-04-01
category:
  - Hibernate
  - JPA
tag:
  - Hibernate
  - JPA
  - Detached Entity
  - Persistence
head:
  - - meta
    - name: keywords
      content: Hibernate, JPA, Detached Entity, Persistence
------
# Hibernate的“传递给持久化的分离实体”错误

## 1. 概述

在本教程中，我们将学习Hibernate的_PersistentObjectException_，该错误发生在尝试保存一个分离的实体时。

我们将首先理解_分离_状态的含义，以及Hibernate的_persist_和_merge_方法之间的区别。然后我们将在各种用例中重现错误，以演示如何修复它。

## 2. 分离实体

让我们首先简要回顾一下_分离_状态是什么以及它如何与实体生命周期相关。

一个_分离_实体是一个不再被_持久化上下文_跟踪的Java对象。**实体可以通过关闭或清除会话达到这种状态。同样，我们可以通过手动将其从持久化上下文中删除来分离实体。**

我们将在本文中使用_Post_和_Comment_实体作为代码示例。要分离特定的_Post_实体，我们可以使用_session.evict(post)_。我们可以通过使用_session.clear()_清除会话来分离上下文中的所有实体。

例如，一些测试将需要一个分离的_Post_。让我们看看如何实现这一点：

```java
@Before
public void beforeEach() {
    session = HibernateUtil.getSessionFactory().openSession();
    session.beginTransaction();

    this.detachedPost = new Post("Hibernate Tutorial");
    session.persist(detachedPost);
    session.evict(detachedPost);
}
```

首先，我们持久化了_Post_实体，然后我们使用_session.evict(post)_将其分离。

## 3. 尝试持久化一个分离实体

如果我们尝试持久化一个分离实体，Hibernate会抛出一个带有“detached entity passed to persist”错误消息的_PersistenceException_。

让我们尝试持久化一个分离的_Post_实体以预期这个异常：

```java
@Test
public void givenDetachedPost_whenTryingToPersist_thenThrowException() {
    detachedPost.setTitle("Hibernate Tutorial for Absolute Beginners");

    assertThatThrownBy(() -> session.persist(detachedPost))
      .isInstanceOf(PersistenceException.class)
      .hasMessageContaining("detached entity passed to persist: com.baeldung.hibernate.exception.detachedentity.entity.Post");
}
```

为了避免这种情况，我们应该了解实体状态并使用适当的方法来保存它。

**如果我们使用_merge_方法，Hibernate将根据@** _**Id**_ **字段重新将实体附加到持久化上下文中：**

```java
@Test
public void givenDetachedPost_whenTryingToMerge_thenNoExceptionIsThrown() {
    detachedPost.setTitle("Hibernate Tutorial for Beginners");

    session.merge(detachedPost);
    session.getTransaction().commit();

    List`<Post>` posts = session.createQuery("Select p from Post p", Post.class).list();
    assertThat(posts).hasSize(1);
    assertThat(posts.get(0).getTitle())
        .isEqualTo("Hibernate Tutorial for Beginners");
}
```

同样，我们可以使用其他Hibernate特定方法，如_update_, _save_和_saveOrUpdate_。与_persist_和_merge_不同，这些方法不是JPA规范的一部分。因此，如果我们想要使用JPA抽象，我们应该避免使用它们。

## 4. 通过关联尝试持久化分离实体

在这个例子中，我们将引入_Comment_实体：

```java
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ManyToOne(cascade = CascadeType.MERGE)
    private Post post;

    // constructor, getters and setters
}
```

我们可以看到_Comment_实体与一个_Post_有一对多的关系。

级联类型设置为_CascadeType.MERGE;_，因此，我们将只传播_merge_操作到相关的_Post_。

换句话说，如果我们_merge_一个_Comment_实体，Hibernate将传播操作到相关的_Post_，并且这两个实体都将在数据库中更新。然而，如果我们想使用这种设置_persist_一个_Comment_，我们首先必须_merge_相关的分离_Post_：

```java
@Test
public void givenDetachedPost_whenMergeAndPersistComment_thenNoExceptionIsThrown() {
    Comment comment = new Comment("nice article!");
    Post mergedPost = (Post) session.merge(detachedPost);
    comment.setPost(mergedPost);

    session.persist(comment);
    session.getTransaction().commit();

    List`<Comment>` comments = session.createQuery("Select c from Comment c", Comment.class).list();
    Comment savedComment = comments.get(0);
    assertThat(savedComment.getText()).isEqualTo("nice article!");
    assertThat(savedComment.getPost().getTitle())
        .isEqualTo("Hibernate Tutorial");
}
```

**相反，如果级联类型设置为_PERSIST_或_ALL_，Hibernate将尝试在分离的关联字段上传播_persist_操作。** 因此，当我们使用这些级联类型_persist_一个_Post_实体时，Hibernate将_persist_相关的分离_Comment_，这将导致另一个_PersistentObjectException_。

## 5. 结论

在本文中，我们讨论了Hibernate的_PersistentObjectException_并了解了其主要原因。我们可以通过适当使用Hibernate的_save_, _persist_, _update_, _merge_和_saveOrUpdate_方法来避免它。

此外，合理利用JPA级联类型将防止在实体关联中发生_PersistentObjectException_。

如往常一样，文章的源代码可在GitHub上获取。