---
date: 2024-06-20
category:
  - Spring Boot
  - Jmix
tag:
  - Cacheable
  - Caching
head:
  - - meta
    - name: keywords
      content: Spring Boot, Jmix, Cacheable, Caching
---
# 在Spring Boot中禁用@Cacheable

无论你是刚开始还是拥有多年经验，**Spring Boot** 都是构建新应用程序的绝佳选择，使用起来非常便捷。

Jmix增强了Spring Boot开发者的能力，允许他们构建并交付**全栈Web** **应用程序**，而无需涉足前端技术。它使你能够创建从简单的Web GUI CRUD应用程序到复杂的企业解决方案，消除了前后端分离及其相关的安全问题。

**Jmix平台**包括一个构建在**Spring Boot, JPA, 和 Vaadin**之上的框架，并配备了Jmix Studio，这是一个**IntelliJ IDEA插件**，配备了一系列开发者生产力工具。该平台还提供了**现成**的报告生成、BPM、地图等插件，你可以在你的Jmix应用程序中使用，或者作为单独的服务使用。所有技术都是相互连接的，赋予一个Java开发者以整个团队的水平，**以最少的知识** **开始**。

另外！Jmix可以**立即生成一个CRUD Web应用程序**，包括其JPA数据模型和UI，**直接从现有的数据库**。然后，在Jmix Studio的帮助下继续开发。

不要辛苦开发，要聪明地开发！

**>> 成为一个全栈开发者**

**使用Jmix**

现在，新版本的 _REST With Spring -_ **“REST With Spring Boot”** 终于发布了，当前价格将在6月22日之前**有效**，之后将永久增加50美元。

**>> 立即获取访问**

## 1. 引言
缓存是一种有效的策略，通过避免在已知期间（实际上是相同的）执行结果没有变化的逻辑的重复执行来提高性能。

**Spring Boot提供了@Cacheable注解，我们将其定义在方法上，它会缓存方法的结果**。**在某些场景下，例如在较低环境中进行测试时，我们可能需要禁用缓存以观察某些修改后的行为。**

在本文中，我们将配置Spring Boot的缓存，并学习在需要时如何禁用缓存。

## 2. 缓存设置
让我们设置一个简单的用例，使用ISBN查询书评，并使用@Cacheable缓存一些逻辑中的方法。

我们的实体类将是_BookReview_类，其中包含_rating_、_isbn_等：

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

    // getters & setters
}
```

我们在_BookRepository_中添加一个简单的_findByIsbn()_方法，通过_isbn_查询书评：

```java
public interface BookRepository extends JpaRepository`<BookReview, Long>` {
    List``<BookReview>`` findByIsbn(String isbn);
}
```

_BookReviewsLogic_类包含一个调用_BookRepository_中_findByIsbn()_的方法。我们添加了@Cacheable注解，它为给定的_isbn_在_book_reviews_缓存中缓存结果：

```java
@Service
public class BookReviewsLogic {
    @Autowired
    private BookRepository bookRepository;

    @Cacheable(value = "book_reviews", key = "#isbn")
    public List``<BookReview>`` getBooksByIsbn(String isbn){
        return bookRepository.findByIsbn(isbn);
    }
}
```

**由于我们在逻辑类中使用了@Cacheable，我们需要配置我们的缓存。我们可以通过带有@Configuration和@EnableCaching的注解配置类来设置缓存配置**。在这里，我们返回_HashMap_作为我们的缓存存储：

```java
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager();
    }
}
```

我们准备好了缓存设置。如果我们在_BookReviewsLogic_中执行_getBooksByIsbn()_，我们的结果在第一次执行时被缓存，并且从那时起立即返回，而无需重新计算（即，查询数据库），从而提高了性能。

让我们编写一个简单的测试来验证它：

```java
@Test
public void givenCacheEnabled_whenLogicExecuted2ndTime_thenItDoesntQueriesDB(CapturedOutput output){
    BookReview bookReview = insertBookReview();

    String target = "Hibernate: select bookreview0_.reviews_id as reviews_1_0_, "
      + "bookreview0_.book_rating as book_rat2_0_, "
      + "bookreview0_.isbn as isbn3_0_, "
      + "bookreview0_.user_id as user_id4_0_ "
      + "from book_reviews bookreview0_ "
      + "where bookreview0_.isbn=?";

    // 第一次执行
    bookReviewsLogic.getBooksByIsbn(bookReview.getIsbn());
    String[] logs = output.toString()
      .split("\\r?\\n");
    assertThat(logs).anyMatch(e -> e.contains(target));

    // 第二次执行
    bookReviewsLogic.getBooksByIsbn(bookReview.getIsbn());
    logs = output.toString()
      .split("\\r?\\n");

    long count = Arrays.stream(logs)
      .filter(e -> e.equals(target))
      .count();

    // 计数1意味着第一次执行的选择查询日志。
    assertEquals(1,count);
}
```

在上面的测试中，我们两次执行_getBooksByIsbn()_，捕获日志，并确认由于_getBooksByIsbn()_方法在第二次执行时返回了缓存的结果，因此_select_查询只执行了一次。

要为针对数据库执行的查询生成SQL日志，我们可以在_application.properties_文件中设置以下属性：

`spring.jpa.show-sql=true`

## 3. 禁用缓存
**为了禁用缓存，我们将在_application.properties_文件中使用一个额外的自定义属性（即_appconfig.cache.enabled_）**：

```properties
appconfig.cache.enabled=true
```

之后，我们可以在缓存配置文件中读取此配置，并进行条件检查：

```java
@Bean
public CacheManager cacheManager(@Value("${appconfig.cache.enabled}") String isCacheEnabled) {
    if (isCacheEnabled.equalsIgnoreCase("false")) {
        return new NoOpCacheManager();
    }

    return new ConcurrentMapCacheManager();
}
```

如上所见，我们的逻辑检查属性是否设置为禁用缓存。如果是，我们可以**返回一个_NoOpCacheManager_的实例，它是一个不执行缓存的缓存管理器**。否则，我们可以返回我们的基于哈希的缓存管理器。

通过上述简单的设置，我们可以在Spring Boot应用程序中禁用缓存。让我们通过一个简单的测试来验证上述设置。

首先，我们需要修改我们在_application.properties_中定义的缓存属性。对于我们的测试设置，我们可以使用_@TestPropertySource_来覆盖属性：

```java
@SpringBootTest(classes = BookReviewApplication.class)
@ExtendWith(OutputCaptureExtension.class)
@TestPropertySource(properties = {
    "appconfig.cache.enabled=false"
})
public class BookReviewsLogicCacheDisabledUnitTest {
    // ...
}
```

现在，我们的测试将类似于之前，我们两次执行逻辑。我们检查SQL查询日志是否在当前测试中记录了两次，因为执行不会被缓存：

```java
long count = Arrays.stream(logs)
   .filter(e -> e.contains(target))
   .count();

// 计数2意味着第一次和第二次执行的选择查询日志。
assertEquals(2, count);
```

## 4. 结论
在本教程中，我们简要地介绍了Spring Boot中的缓存，然后在应用程序中设置了缓存。我们还学习了在需要测试代码的某些部分时如何禁用缓存。此外，我们编写了必要的测试来验证启用和禁用缓存的工作。

和往常一样，示例代码可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。