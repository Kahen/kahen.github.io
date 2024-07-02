---
date: 2024-07-02
category:
  - Spring Data JPA
  - Scroll API
tag:
  - Spring Data
  - JPA
  - Scroll API
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, Scroll API, Spring Data Commons, 数据库查询, 大数据量处理
---

# Spring Data JPA 中的滚动API

Spring Data Commons 是 Spring Data 项目的一部分，包含了用于管理持久层的接口和实现。滚动API是 Spring Data Commons 提供的一个功能，用于处理从数据库读取的大型结果集。

在本教程中，我们将通过一个示例来探索滚动API。

## 2. 依赖
滚动API支持是在 Spring Boot 3.1 版本中添加的。Spring Data Commons 已经包含在 Spring Data JPA 中。因此，添加 Spring Data JPA 3.1 版本就足以获得滚动API的功能：

```xml
`<dependency>`
    `<groupId>`org.springframework.data`</groupId>`
    `<artifactId>`spring-data-jpa`</artifactId>`
    `<version>`3.1.0`</version>`
`</dependency>`
```

可以在 Maven Central 仓库中找到最新的库版本。

## 3. 实体类
为了示例，我们将使用 _BookReview_ 实体，它包含了不同用户对不同书籍的评论评级：

```java
@Entity
@Table(name="BOOK_REVIEWS")
public class BookReview {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "book_reviews_reviews_id_seq")
    @SequenceGenerator(name = "book_reviews_reviews_id_seq", sequenceName = "book_reviews_reviews_id_seq", allocationSize = 1)
    private Long reviewsId;
    private String userId;
    private String isbn;
    private String bookRating;

    // getters and setters
}
```

**滚动API提供了按块迭代大型结果的功能。** **它提供了稳定的排序、滚动类型和结果限制。**

我们可以使用属性名称定义简单的排序表达式，并通过查询派生定义静态结果限制，使用 _Top_ 或 _First_。

### 4.1. 使用偏移量过滤进行滚动
在以下示例中，我们使用查询派生来找到按评级参数的前五本书，并使用 _OffsetScrollPosition_：

```java
public interface BookRepository extends Repository`<BookReview, Long>` {
    Window````````````<BookReview>```````````` findFirst5ByBookRating(String bookRating, OffsetScrollPosition position);
    Window````````````<BookReview>```````````` findFirst10ByBookRating(String bookRating, OffsetScrollPosition position);
    Window````````````<BookReview>```````````` findFirst3ByBookRating(String bookRating, KeysetScrollPosition position);
}
```

由于我们已经定义了我们的仓库方法，我们可以在逻辑类中使用它们来获取前五本书，并持续迭代直到我们到达最后一个结果。

在迭代过程中，我们需要检查下一个窗口的存在，通过查询它：

```java
public List````````````<BookReview>```````````` getBooksUsingOffset(String rating) {
    OffsetScrollPosition offset = ScrollPosition.offset();

    Window````````````<BookReview>```````````` bookReviews = bookRepository.findFirst5ByBookRating(rating, offset);
    List````````````<BookReview>```````````` bookReviewsResult = new ArrayList<>();
    do {
        bookReviews.forEach(bookReviewsResult::add);
        bookReviews = bookRepository.findFirst5ByBookRating(rating, (OffsetScrollPosition) bookReviews.positionAt(bookReviews.size() - 1));
    } while (!bookReviews.isEmpty() && bookReviews.hasNext());

    return bookReviewsResult;
}
```

**我们可以通过使用 _WindowIterator_ 来简化我们的逻辑**，它提供了滚动浏览大型结果的实用工具，无需检查下一个窗口和 _ScrollPosition_：

```java
public List````````````<BookReview>```````````` getBooksUsingOffSetFilteringAndWindowIterator(String rating) {
    WindowIterator````````````<BookReview>```````````` bookReviews = WindowIterator.of(position ->
        bookRepository.findFirst5ByBookRating("3.5", (OffsetScrollPosition) position))
        .startingAt(ScrollPosition.offset());
    List````````````<BookReview>```````````` bookReviewsResult = new ArrayList<>();
    bookReviews.forEachRemaining(bookReviewsResult::add);

    return bookReviewsResult;
}
```

**偏移滚动类似于分页，通过从大型结果中跳过一定数量的记录来返回预期的结果。** 虽然我们只看到了请求结果的一部分，但服务器需要构建完整的结果，这会导致额外的负载。

我们可以使用键集过滤来避免这种行为。

### 4.2. 使用键集过滤进行滚动
键集过滤帮助使用数据库的内置能力检索结果的子集，目的是**减少单个查询的计算和IO需求**。

数据库只需要从给定的键集位置构建较小的结果，而不需要实现大型完整结果：

```java
public List````````````<BookReview>```````````` getBooksUsingKeySetFiltering(String rating) {
    WindowIterator````````````<BookReview>```````````` bookReviews = WindowIterator.of(position ->
        bookRepository.findFirst5ByBookRating(rating, (KeysetScrollPosition) position))
        .startingAt(ScrollPosition.keyset());
    List````````````<BookReview>```````````` bookReviewsResult = new ArrayList<>();
    bookReviews.forEachRemaining(bookReviewsResult::add);

    return bookReviewsResult;
}
```

## 5. 结论
在本文中，我们探索了 Spring Data Commons 库提供的滚动API。滚动API支持基于偏移位置和过滤条件读取大型结果的小部分。

**滚动API支持使用偏移和键集进行过滤。** 虽然基于偏移的过滤需要在数据库中实现整个结果，但键集通过构建较小的结果来帮助减少数据库上的计算和IO负载。

如常，示例代码可在 GitHub 上找到。