---
date: 2022-04-01
category:
  - Spring Data JPA
  - NonUniqueResultException
tag:
  - Exception Handling
  - JPA
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, NonUniqueResultException, Exception Handling
------
# Spring Data JPA中的NonUniqueResultException

Spring Data JPA提供了一个简单一致的接口来访问存储在各种关系型数据库中的数据，使开发者能够更容易地编写数据库无关的代码。它还消除了大量样板代码的需要，允许开发者专注于构建应用程序的业务逻辑。

然而，我们仍然需要确保正确的返回类型，否则会抛出一个异常。在本教程中，我们将重点关注_NonUniqueResultException_。我们将学习是什么导致了它以及当我们遇到它时如何修复我们的代码。

当一个查询方法预期返回单个结果但发现多个结果时，Spring Data JPA框架会抛出一个_运行时异常NonUniqueResultException_。这可能发生在使用Spring Data JPA的查询方法之一执行查询时，例如_findById()_、_findOne()_或不返回集合的自定义定义方法。

当抛出_NonUniqueResultException_时，这意味着正在使用的方法被设计为返回单个结果，但它找到了多个。这可能是由于查询不正确或数据库中的数据不一致。

## **3. 示例**

让我们使用我们文章中已知的_实体Entity_，使用Spring Data JPA按日期和时间查询实体：

```java
@Entity
public class Article {
    
    @Id
    @GeneratedValue
    private Integer id;

    @Temporal(TemporalType.DATE)
    private Date publicationDate;

    @Temporal(TemporalType.TIME)
    private Date publicationTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDateTime;
}
```

现在，让我们创建我们的_ArticleRepository_并添加两个方法：

```java
public interface ArticleRepository extends JpaRepository`<Article, Integer>` {

    List``<Article>`` findAllByPublicationTimeBetween(Date publicationTimeStart, Date publicationTimeEnd);

    Article findByPublicationTimeBetween(Date publicationTimeStart, Date publicationTimeEnd);
}

```

这两种方法之间唯一的区别是_findAllByPublicationTimeBetween()_的返回类型是_List``<Article>``_，而_findByPublicationTimeBetween()_的返回类型是单个_Article_。

当我们执行第一个方法_findAllByPublicationTimeBetween_时，我们总是会得到一个集合。根据我们数据库中的数据，我们可以得到一个空的_List_或者一个包含一个或多个_Article_实例的_List_。

第二种方法_findByPublicationTimeBetween_，在数据库恰好包含零个或一个匹配的_Article_的情况下，理论上也是可行的。如果给定查询没有单个条目，该方法将返回_null_。另一方面，如果有对应的_Article_，它将返回单个_Article_。

然而，如果有多个_Article_s与_findByPublicationTimeBetween_的查询匹配，该方法将抛出一个_NonUniqueResultException_，然后被包装在一个_IncorrectResultSizeDataAccessException_中。

当这样的异常可以在运行时随机发生时，这表明数据库设计或我们的方法实现有问题。在下一节中，我们将学习如何避免这个错误。

## **4. 避免_NonUniqueResultException_的提示**

为了避免_NonUniqueResultException_，重要的是仔细设计数据库查询并正确使用Spring Data JPA的查询方法。在设计查询时，重要的是确保它总是返回预期数量的结果。我们可以通过仔细指定我们的查询条件来实现这一点，例如使用唯一键或其他识别信息。

在设计我们的查询方法时，我们应该遵循一些基本规则以避免_NonUniqueResultExceptions_：

- **如果可能返回多个值，我们应该使用_List_或_Set_作为返回类型。**
- 我们只有在能够通过数据库设计**确保只有一个返回值**时才使用单个返回值。这总是发生在我们寻找一个唯一键如_Id_、_UUID_，或者根据数据库设计，也可能是一个保证唯一的电子邮件或电话号码。
- 另一种确保只有一个返回值的方法是**限制返回到单个元素**。这在例如我们总是想要最新的_Article_时可能会很有用。

## **5. 结论**

_NonUniqueResultException_是一个在使用Spring Data JPA时需要理解并避免的重要异常。当一个查询预期返回单个结果但发现多个结果时，就会发生这种情况。我们可以通过确保我们的_JpaRepository_方法返回正确数量的元素并相应地指定正确的返回类型来预防这种情况。

通过理解和正确避免_NonUniqueResultException_，我们可以确保我们的应用程序能够一致可靠地从数据库访问数据。

如往常一样，这些示例也可以在GitHub上找到。