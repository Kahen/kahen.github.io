---
date: 2024-06-23
category:
  - Spring Modulith
  - Event Externalization
tag:
  - Spring
  - Kafka
  - Event-Driven
head:
  - - meta
    - name: keywords
      content: Spring Modulith, Event Externalization, Kafka, Transactional, Asynchronous
---
# Spring Modulith中的事件外部化

在本文中，我们将讨论在 `@Transactional` 块内发布消息的需求以及相关的性能挑战，例如延长的数据库连接时间。为了解决这个问题，我们将利用 Spring Modulith 的特性来监听 Spring 应用程序事件，并自动将它们发布到 Kafka 主题。 

## 2. 事务性操作和消息代理
对于本文的代码示例，我们假设我们正在编写负责在 Baeldung 上保存 `Article` 的功能：

```java
@Service
class Baeldung {
    private final ArticleRepository articleRepository;

    // 构造函数

    @Transactional
    public void createArticle(Article article) {
        validateArticle(article);
        article = addArticleTags(article);
        // ...其他业务逻辑

        articleRepository.save(article);
    }
}
```

此外，我们还需要通知系统的其他部分关于这个新的 `Article`。有了这些信息，其他模块或服务将相应地做出反应，创建报告或向网站的读者发送新闻通讯。

实现这一目标的最简单方法是注入一个知道如何发布此事件的依赖项。对于我们的示例，让我们使用 `KafkaOperations` 向 “baeldung.articles.published” 主题发送消息，并使用 `Article` 的 `slug()` 作为键：

```java
@Service
class Baeldung {
    private final ArticleRepository articleRepository;
    private final KafkaOperations``<String, ArticlePublishedEvent>`` messageProducer;

    // 构造函数

    @Transactional
    public void createArticle(Article article) {
        // ...业务逻辑
        validateArticle(article);
        article = addArticleTags(article);
        article = articleRepository.save(article);

        messageProducer.send(
          "baeldung.articles.published",
          article.slug(),
          new ArticlePublishedEvent(article.slug(), article.title())
        ).join();
    }
}
```

然而，这种方法并不理想，原因有几个。从设计角度来看，我们将领域服务与消息生产者耦合了。此外，领域服务直接依赖于较低级别的组件，打破了 Clean Architecture 的一个基本原则。

此外，这种方法还将对性能产生影响，因为一切都发生在 `@Transactional` 方法中。结果，用于保存 `Article` 的数据库连接将保持打开状态，直到消息成功发布。

最后，这个解决方案还创建了数据持久化和消息发布之间的错误倾向关系：

- **如果生产者无法发布消息，事务将回滚；**
- **即使消息已经发布，事务最终也可能回滚；**

## 3. 使用 Spring 事件进行依赖反转
**我们可以利用 Spring 事件来改进我们的解决方案设计。** 我们的目标是避免直接从我们的领域服务发布消息到 Kafka。让我们移除 `KafkaOperations` 依赖项，改为发布一个内部应用程序事件：

```java
@Service
public class Baeldung {
    private final ApplicationEventPublisher applicationEvents;
    private final ArticleRepository articleRepository;

    // 构造函数

    @Transactional
    public void createArticle(Article article) {
        // ...业务逻辑
        validateArticle(article);
        article = addArticleTags(article);
        article = articleRepository.save(article);

        applicationEvents.publishEvent(
          new ArticlePublishedEvent(article.slug(), article.title()));
    }
}
```

除此之外，我们将有一个专用的 Kafka 生产者作为我们基础设施层的一部分。这个组件将监听 `ArticlePublishedEvent` 并将发布任务委托给底层的 `KafkaOperations` bean：

```java
@Component
class ArticlePublishedKafkaProducer {
    private final KafkaOperations``<String, ArticlePublishedEvent>`` messageProducer;

    // 构造函数

    @EventListener
    public void publish(ArticlePublishedEvent article) {
        Assert.notNull(article.slug(), "Article Slug must not be null!");
        messageProducer.send("baeldung.articles.published", article.slug(), event);
    }
}
```

**通过这种抽象，基础设施组件现在依赖于领域服务产生的事件。换句话说，我们已经成功地减少了耦合并反转了源代码依赖。** 此外，如果其他模块对 `Article` 创建感兴趣，它们现在可以无缝地监听这些应用程序事件并相应地做出反应。

另一方面，`publish()` 方法将在与我们的业务逻辑相同的事务内被调用。间接地，两个操作仍然相对于彼此的失败可能导致另一个失败或回滚的事实耦合在一起。

## 4. 原子与非原子操作
现在，让我们深入探讨性能考虑。首先，我们必须确定当与消息代理的通信失败时回滚是否是期望的行为。这个选择根据特定上下文而变化。

**如果我们不需要这种原子性，那么释放数据库连接并异步发布事件至关重要。** 为了模拟这一点，我们可以尝试创建一个没有 `slug` 的文章，导致 `ArticlePublishedKafkaProducer::publish` 失败：

```java
@Test
void whenPublishingMessageFails_thenArticleIsStillSavedToDB() {
    var article = new Article(null, "Introduction to Spring Boot", "John Doe", "`<p>` Spring Boot is [...] `</p>`");

    baeldung.createArticle(article);

    assertThat(repository.findAll())
      .hasSize(1).first()
      .extracting(Article::title, Article::author)
      .containsExactly("Introduction to Spring Boot", "John Doe");
}
```

如果我们现在运行测试，它将会失败。这是因为 `ArticlePublishedKafkaProducer` 抛出了一个异常，这将导致领域服务回滚事务。**然而，我们可以通过将 `@EventListener` 注解替换为 `@TransactionalEventListener` 和 `@Async` 来使事件监听器异步：**

```java
@Async
@TransactionalEventListener
public void publish(ArticlePublishedEvent event) {
    Assert.notNull(event.slug(), "Article Slug must not be null!");
    messageProducer.send("baeldung.articles.published", event);
}
```

如果我们现在重新运行测试，我们将注意到异常被记录，事件没有被发布，实体被保存到数据库中。此外，数据库连接更早地被释放，允许其他线程使用它。

我们通过两步方法成功解决了原始代码示例的设计和性能问题：

- 使用 Spring 应用程序事件进行依赖反转
- 使用 `@TransactionalEventListener` 和 `@Async` 进行异步发布

**Spring Modulith 允许我们进一步简化我们的代码，为这种模式提供内置支持。** 让我们首先向我们的 `pom.xml` 添加 `spring-modulith-events-api` 的 maven 依赖项：

```xml
```<dependency>```
    ```<groupId>```org.springframework.modulith```</groupId>```
    ```<artifactId>```spring-modulith-events-api```</artifactId>```
    ```<version>```1.1.3```</version>```
```</dependency>```
```

**这个模块可以配置为监听应用程序事件，并自动将它们外部化到各种消息系统中。** 我们将坚持我们最初的示例，并专注于 Kafka。为此集成，我们需要添加 `spring-modulith-events-kafka` 依赖项：

```xml
```<dependency>```
    ```<groupId>```org.springframework.modulith```</groupId>```
    ```<artifactId>```spring-modulith-events-kafka```</artifactId>```
    ```<version>```1.1.3```</version>```
    `<scope>`runtime`</scope>`
```</dependency>```
```

现在，我们需要更新 `ArticlePublishedEvent` 并用 `@Externalized` 注解它。这个注解需要路由目标的名称和键。换句话说，Kafka 主题和消息键。对于键，我们将使用一个 SpEL 表达式，将调用 `Article`::`slug()`：

```java
@Externalized("baeldung.article.published::#{slug()}")
public record ArticlePublishedEvent(String slug, String title) {}
```

## 6. 事件发布注册表
正如先前讨论的，我们仍然有数据持久化和消息发布之间的错误倾向关系——发布消息失败会导致事务回滚。另一方面，即使消息成功发布，事务仍然可能稍后回滚。

Spring Modulith 的事件发布注册表实现了“事务性出站箱”模式来解决这个问题，确保系统之间的最终一致性。**当事务性操作发生时，而不是立即向外部系统发送消息，事件存储在同一个业务事务中的事件发布日志中。**

### 6.1. 事件发布日志
首先，我们需要引入与我们的持久性技术相对应的 `spring-modulith-starter` 依赖项。我们可以查阅官方文档以获取支持的启动器的完整列表。由于我们使用 Spring Data JPA 和 PostgreSQL 数据库，我们将添加 `spring-modulith-starter-jpa` 依赖项：

```xml
```<dependency>```
    ```<groupId>```org.springframework.modulith```</groupId>```
    ```<artifactId>```spring-modulith-starter-jpa```</artifactId>```
    ```<version>```1.1.2```</version>```
```</dependency>```
```

此外，我们将启用 Spring Modulith 创建 “event_publication” 表。这个表包含有关外部化应用程序事件的相关数据。让我们将以下属性添加到我们的 `application.yml`：

```yaml
spring.modulith:
  events.jdbc-schema-initialization.enabled: true
```

我们的设置使用 Testcontainer 启动一个带有 PostgreSQL 数据库的 Docker 容器。因此，我们可以利用 Testcontainers 桌面应用程序来“冻结容器关闭”并“打开一个终端”附加到该文档的翻译已经结束。以下是翻译的继续部分：

容器本身。然后，我们可以使用以下命令检查数据库：

- `“psql -U test_user -d test_db”` - 打开 PostgreSQL 交互式终端
- `“\d”` - 列出数据库对象

正如我们所看到的，“event_publication” 表已成功创建。让我们执行一个查询，查看我们的测试持久化的事件：

在第一行，我们可以看到我们的第一个测试创建的事件，它涵盖了正常流程。然而，在第二个测试中，我们故意创建了一个无效的事件，省略了 “slug”，以模拟事件发布期间的失败。由于这个 `Article` 被保存到数据库中但没有成功发布，它出现在 `events_publication` 表中，缺少 `completion_date`。

### 6.2. 重新提交事件

**我们可以通过 `republish-outstanding-events-on-restart` 属性启用 Spring Modulith，在应用程序重新启动时自动重新提交事件：**

```yaml
spring.modulith:
  republish-outstanding-events-on-restart: true
```

**此外，我们可以使用 `IncompleteEventPublications` bean 以编程方式重新提交给定时间之前失败的事件：**

```java
@Component
class EventPublications {
    private final IncompleteEventPublications incompleteEvents;
    private final CompletedEventPublications completeEvents;

    // 构造函数

    void resubmitUnpublishedEvents() {
        incompleteEvents.resubmitIncompletePublicationsOlderThan(Duration.ofSeconds(60));
    }
}
```

类似地，我们可以使用 `CompletedEventPublications` bean 轻松查询或清除 `event_publications` 表：

```java
void clearPublishedEvents() {
    completeEvents.deletePublicationsOlderThan(Duration.ofSeconds(60));
}
```

## 7. 事件外部化配置

尽管 `@Externalized` 注解的值对于简洁的 SpEL 表达式很有用，但有些情况下我们可能想要避免使用它：

- 当表达式变得过于复杂时
- 当我们旨在将主题信息与应用程序事件分开时
- 如果我们想要为应用程序事件和外部化事件使用不同的模型

对于这些用例，**我们可以使用 `EventExternalizationConfiguration` 的构建器配置必要的路由和事件映射。** 之后，我们只需要将此配置作为 Spring bean 暴露：

```java
@Bean
EventExternalizationConfiguration eventExternalizationConfiguration() {
    return EventExternalizationConfiguration.externalizing()
      .select(EventExternalizationConfiguration.annotatedAsExternalized())
      .route(
        ArticlePublishedEvent.class,
        it -> RoutingTarget.forTarget("baeldung.articles.published").andKey(it.slug())
      )
      .mapping(
        ArticlePublishedEvent.class,
        it -> new PostPublishedKafkaEvent(it.slug(), it.title())
      )
      .build();
}
```

`EventExternalizationConfiguration` 使我们能够以声明方式定义应用程序事件的 _路由_ 和 _映射_。此外，**它让我们能够处理各种类型的应用程序事件。** 例如，如果我们需要处理像 `WeeklySummaryPublishedEvent` 这样的额外事件，我们可以通过添加一个更多类型特定的 _路由_ 和 _映射_ 来轻松完成：

```java
@Bean
EventExternalizationConfiguration eventExternalizationConfiguration() {
    return EventExternalizationConfiguration.externalizing()
      .select(EventExternalizationConfiguration.annotatedAsExternalized())
      .route(
        ArticlePublishedEvent.class,
        it -> RoutingTarget.forTarget("baeldung.articles.published").andKey(it.slug())
      )
      .mapping(
        ArticlePublishedEvent.class,
        it -> new PostPublishedKafkaEvent(it.slug(), it.title())
      )
      .route(
        WeeklySummaryPublishedEvent.class,
        it -> RoutingTarget.forTarget("baeldung.articles.published").andKey(it.handle())
      )
      .mapping(
        WeeklySummaryPublishedEvent.class,
        it -> new PostPublishedKafkaEvent(it.handle(), it.heading())
      )
      .build();
}
```

正如我们所观察到的，映射和路由需要两件事：类型本身和一个用于解析 Kafka 主题和有效载荷的函数。在我们的示例中，两个应用程序事件将被映射到一个共同的类型，并发送到同一个主题。

此外，由于我们现在在配置中声明了路由，我们可以从事件本身中移除此信息。因此，事件将只有 `@Externalized` 注解，没有值：

```java
@Externalized
public record ArticlePublishedEvent(String slug, String title) {}

@Externalized
public record WeeklySummaryPublishedEvent(String handle, String heading) {}
```

## 8. 结论

在本文中，我们讨论了需要在事务性块内发布消息的场景。我们发现这种模式可能会有重大的性能影响，因为它可能会阻塞数据库连接更长的时间。

之后，我们使用 Spring Modulith 的特性来监听 Spring 应用程序事件，并自动将它们发布到 Kafka 主题。这种方法允许我们异步地外部化事件并更快地释放数据库连接。

完整的源代码可以在 GitHub 上找到。

OK