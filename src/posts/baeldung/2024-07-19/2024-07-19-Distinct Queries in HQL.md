---
date: 2022-04-01
category:
  - Java
  - HQL
tag:
  - HQL
  - DISTINCT
head:
  - - meta
    - name: keywords
      content: HQL, DISTINCT, SQL, Hibernate, 查询优化
------
# HQL中的不同查询

在这篇文章中，我们将讨论HQL中的不同查询以及如何在不必要时避免在SQL查询中添加_distinct_关键字。

## 2. 理解问题

首先，让我们看看我们的数据模型并确定我们想要实现什么。

我们将使用具有一对多关系的_Post_和_Comment_实体对象。我们想要检索一个帖子列表以及它们所有相关的评论。

让我们先尝试以下HQL查询：

```hql
String hql = "SELECT p FROM Post p LEFT JOIN FETCH p.comments";
List``<Post>`` posts = session.createQuery(hql, Post.class).getResultList();
```

这将生成以下SQL查询：

```sql
select
     p1_0.id,c1_0.Post_id,c1_1.id,c1_1.text,p1_0.title
from
     Post p1_0
left join (Post_Comment c1_0 join Comment c1_1 on c1_1.id=c1_0.comments_id) on p1_0.id=c1_0.Post_id
```

**结果将包含重复项。** **一个_Post_将根据其关联的_Comments_数量显示多次——**一个有三个_Comments_的_Post_将在结果列表中显示三次。

## 3. 在HQL查询中使用_distinct_

我们需要在HQL查询中使用_distinct_关键字来消除重复项：

```hql
String hql = "SELECT DISTINCT p FROM Post p LEFT JOIN FETCH p.comments";
List``<Post>`` posts = session.createQuery(hql, Post.class).getResultList();
```

现在，我们得到了正确的结果：不再有重复的_Post_对象。让我们看看Hibernate生成的SQL语句：

```sql
select
     distinct p1_0.id,c1_0.Post_id,c1_1.id,c1_1.text,p1_0.title
from
     Post p1_0
left join
     (Post_Comment c1_0 join Comment c1_1 on c1_1.id=c1_0.comments_id) on p1_0.id=c1_0.Post_id
```

我们可以注意到_distinct_关键字不仅被Hibernate使用，也被包含在SQL查询中。**我们应该避免这样做，因为它是不必要的，并且会导致性能问题。**

## 4. 使用_QueryHint_为_distinct_关键字

**从Hibernate 6开始，distinct总是传递给SQL查询，并且已经移除了QueryHints#HINT_PASS_DISTINCT_THROUGH标志。**

## 5. 结论

在这篇文章中，我们发现SQL查询中_distinct_关键字的存在可能是不必要的，并且会影响性能。之后，我们学习了如何使用_PASS_DISTINCT_THROUGH_查询提示来避免这种行为。

如常，源代码可在GitHub上获得。