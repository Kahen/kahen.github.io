---
date: 2024-06-25
category:
  - Spring Data JPA
  - SpEL
tag:
  - Spring
  - JPA
  - Query
  - SpEL
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, SpEL, Query Definitions
---
# Spring Data JPA 中使用 SpEL 支持的查询定义 | Baeldung

SpEL 是 Spring 表达式语言（Spring Expression Language）的缩写，它是一个强大的工具，可以显著增强我们与 Spring 的交互，并在配置、属性设置和查询操作中提供额外的抽象。

在本教程中，我们将学习如何使用这个工具使我们的自定义查询更加动态，并在存储库层隐藏数据库特定的操作。我们将使用 _@Query_ 注解，它允许我们使用 JPQL 或原生 SQL 来定制与数据库的交互。

## 1. 概述

## 2. 访问参数

### 2.1. 按索引访问
按索引访问参数不是最佳选择，因为它可能会给代码带来难以调试的问题。特别是当参数类型相同时。

同时，它为我们提供了更多的灵活性，特别是在开发阶段，当参数名称经常改变时。IDE 可能无法正确处理代码和查询的更新。

JDBC 为我们提供了 _?_ 占位符，我们可以用它来标识查询中参数的位置。Spring 支持这种约定，并允许编写以下代码：

```java
@Modifying
@Transactional
@Query(value = "INSERT INTO articles (id, title, content, language) "
  + "VALUES (?1, ?2, ?3, ?4)",
  nativeQuery = true)
void saveWithPositionalArguments(Long id, String title, String content, String language);
```

到目前为止，没有发生什么有趣的事情。我们使用的是我们以前在 JDBC 应用程序中使用的方法。注意，对于任何在数据库中进行更改的查询，都需要 _@Modifying_ 和 _@Transactional_ 注解，而 INSERT 是其中之一。所有 INSERT 的示例都将使用原生查询，因为 JPQL 不支持它们。

我们可以使用 SpEL 重写上面的查询：

```java
@Modifying
@Transactional
@Query(value = "INSERT INTO articles (id, title, content, language) "
  + "VALUES (?#{[0]}, ?#{[1]}, ?#{[2]}, ?#{[3]})",
  nativeQuery = true)
void saveWithPositionalSpELArguments(long id, String title, String content, String language);
```

结果类似，但看起来比前一个更杂乱。然而，由于它是 SpEL，它提供了所有丰富的功能。例如，我们可以使用条件逻辑在查询中：

```java
@Modifying
@Transactional
@Query(value = "INSERT INTO articles (id, title, content, language) "
  + "VALUES (?#{[0]}, ?#{[1]}, ?#{[2] ?: 'Empty Article'}, ?#{[3]})",
  nativeQuery = true)
void saveWithPositionalSpELArgumentsWithEmptyCheck(long id, String title, String content, String isoCode);
```

我们在这个查询中使用了 Elvis 运算符来检查是否提供了内容。尽管我们可以在查询中编写更复杂的逻辑，但应该谨慎使用，因为它可能会引入调试和验证代码时的问题。

### 2.2. 按名称访问
我们可以通过使用命名占位符来访问参数，这通常与参数名称匹配，但这不是严格要求。这是 JDBC 的另一种约定；命名参数用 _:name_ 占位符标记。我们可以直接使用它：

```java
@Modifying
@Transactional
@Query(value = "INSERT INTO articles (id, title, content, language) "
  + "VALUES (:id, :title, :content, :language)",
  nativeQuery = true)
void saveWithNamedArguments(@Param("id") long id, @Param("title") String title,
  @Param("content") String content, @Param("isoCode") String language);
```

唯一额外需要做的是确保 Spring 知道参数的名称。我们可以通过使用 _-parameters_ 标志编译代码的更隐式方式来做，或者使用 _@Param_ 注解明确地做。

明确的方式总是更好的，因为它提供了对名称的更多控制，我们不会因为错误的编译而遇到问题。

然而，让我们使用 SpEL 重写同一个查询：

```java
@Modifying
@Transactional
@Query(value = "INSERT INTO articles (id, title, content, language) "
  + "VALUES (:#{#id}, :#{#title}, :#{#content}, :#{#language})",
  nativeQuery = true)
void saveWithNamedSpELArguments(@Param("id") long id, @Param("title") String title,
  @Param("content") String content, @Param("language") String language);
```

在这里，我们有标准的 SpEL 语法，但此外，我们需要使用 _#_ 来区分参数名称和应用程序中的 bean 名称。如果我们省略它，Spring 将尝试在上下文中查找名为 _id_、_title_、_content_ 和 _language_ 的 bean。

总的来说，这个版本与没有 SpEL 的简单方法非常相似。然而，正如前一节所讨论的，SpEL 提供了更多的功能和功能。例如，我们可以在传递的对象上调用函数：

```java
@Modifying
@Transactional
@Query(value = "INSERT INTO articles (id, title, content, language) "
  + "VALUES (:#{#id}, :#{#title}, :#{#content}, :#{#language.toLowerCase()})",
  nativeQuery = true)
void saveWithNamedSpELArgumentsAndLowerCaseLanguage(@Param("id") long id, @Param("title") String title,
  @Param("content") String content, @Param("language") String language);
```

我们可以使用 _toLowerCase()_ 方法在 _String_ 对象上。我们可以进行条件逻辑、方法调用、字符串连接等。同时，拥有太多的逻辑在 _@Query_ 中可能会使其模糊不清，并诱使我们将业务逻辑泄露到基础设施代码中。

### 2.3. 访问对象的字段
虽然前面的方法是或多或少地反映了 JDBC 和准备查询的能力，但这种方法允许我们以更面向对象的方式使用原生查询。正如我们之前看到的，我们可以在 SpEL 中使用简单的逻辑并调用对象的方法。此外，我们可以访问对象的字段：

```java
@Modifying
@Transactional
@Query(value = "INSERT INTO articles (id, title, content, language) "
  + "VALUES (:#{#article.id}, :#{#article.title}, :#{#article.content}, :#{#article.language})",
  nativeQuery = true)
void saveWithSingleObjectSpELArgument(@Param("article") Article article);
```

我们可以使用对象的公共 API 来获取其内部。这是一种非常有用的技术，因为它允许我们保持存储库的签名整洁，并且不过多地暴露。

它甚至允许我们访问嵌套对象。假设我们有一个文章包装器：

```java
public class ArticleWrapper {
    private final Article article;
    public ArticleWrapper(Article article) {
        this.article = article;
    }
    public Article getArticle() {
        return article;
    }
}
```

我们可以在我们的示例中使用它：

```java
@Modifying
@Transactional
@Query(value = "INSERT INTO articles (id, title, content, language) "
  + "VALUES (:#{#wrapper.article.id}, :#{#wrapper.article.title}, "
  + ":#{#wrapper.article.content}, :#{#wrapper.article.language})",
  nativeQuery = true)
void saveWithSingleWrappedObjectSpELArgument(@Param("wrapper") ArticleWrapper articleWrapper);
```

因此，我们可以将参数作为 SpEL 中的 Java 对象，并使用任何可用的字段或方法。我们也可以在这个查询中添加逻辑和方法调用。

此外，我们可以将此技术与 _Pageable_ 结合使用，以获取对象中的信息，例如偏移量或页面大小，并将其添加到我们的原生查询中。虽然 _Sort_ 也是一个对象，但它的结构更复杂，使用起来会更困难。

## 3. 引用实体

减少重复代码是一个好的实践。然而，自定义查询可能会使其变得具有挑战性。即使我们有类似的逻辑要提取到基础存储库中，表名的不同使得重用变得困难。

SpEL 提供了一个实体名称的占位符，它从存储库参数化中推断出来。让我们创建这样一个基础存储库：

```java
@NoRepositoryBean
public interface BaseNewsApplicationRepository``<T, ID>`` extends JpaRepository``<T, ID>`` {
    @Query(value = "select e from #{#entityName} e")
    List`````<Article>````` findAllEntitiesUsingEntityPlaceholder();

    @Query(value = "SELECT * FROM #{#entityName}", nativeQuery = true)
    List`````<Article>````` findAllEntitiesUsingEntityPlaceholderWithNativeQuery();
}
```

**我们需要使用一些额外的注解来使其工作。** 第一个注解是 _@NoRepositoryBean._ 我们需要这个来排除这个基础存储库的实例化。由于它没有特定的参数化，尝试创建这样的存储库将会失败上下文。因此，我们需要将其排除。

使用 JPQL 的查询相当直接，将使用给定存储库的实体名称：

```java
@Query(value = "select e from #{#entityName} e")
List`````<Article>````` findAllEntitiesUsingEntityPlaceholder();
```

然而，原生查询的情况并不那么简单。**如果不进行额外的更改和配置，它将尝试使用实体名称，在我们的情况下是 _Article_，来查找表：**

```java
@Query(value = "SELECT * FROM #{#entityName}", nativeQuery = true)
List`````<Article>````` findAllEntitiesUsingEntityPlaceholderWithNativeQuery();
```

然而，我们的数据库中并没有这样的表。在实体定义中，我们明确指出了表的名称：

```java
@Entity
@Table(name = "articles")
public class Article {
    // ...
}
```

为了解决这个问题，我们需要为我们的表提供匹配的实体名称：

```java
@Entity(name = "articles")
@Table(name = "articles")
public class Article {
    // ...
}
```

在这种情况下，JPQL 和原生查询都将推断出正确的实体名称，我们将能够跨应用程序中的所有实体重用相同的基础查询。

## 4. 添加 SpEL 上下文

正如所指出的，虽然在引用参数或占位符时，我们必须在它们的名字前提供额外的 _#_。这是为了区分 bean 名称和参数名称。

然而，我们不能直接在查询中使用 Spring 上下文中的 beans。IDE 通常提供有关上下文 beans 的提示，但上下文会失败。**这是因为 _@Value_ 和类似的注解以及 _@Query_ 以不同的方式处理。** 我们可以在前者的上下文中引用 beans，但不能在后者中。

**同时，我们可以使用 _EvaluationContextExtension_ 在 SpEL 上下文中注册 beans，这样我们就可以在** _@Query_ **中使用它们。** 让我们想象以下情况 - 我们想要找到我们数据库中的所有文章，但根据用户的区域设置进行过滤：

```java
@Query(value = "SELECT * FROM articles WHERE language = :#{locale.language}", nativeQuery = true)
List`````<Article>````` findAllArticlesUsingLocaleWithNativeQuery();
```

这个查询会失败，因为我们不能默认访问 locale。我们需要提供我们的自定义 _EvaluationContextExtension_，它将持有有关用户区域设置的信息：

```java
@Component
public class LocaleContextHolderExtension implements EvaluationContextExtension {

    @Override
    public String getExtensionId() {
        return "locale";
    }

    @Override
    public Locale getRootObject() {
        return LocaleContextHolder.getLocale();
    }
}
```

我们可以使用 _LocaleContextHolder_ 在应用程序的任何地方访问当前区域设置。**唯一要注意的是，它与用户的请求绑定，并且在此范围之外无法访问。** 我们需要提供我们的根对象和名称。我们还可以选择添加属性和函数，但在这个例子中，我们将只使用根对象。

在我们能够使用 _@Query_ 中的 _locale_ 之前，我们需要采取的另一个步骤是注册区域设置拦截器：

```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
        localeChangeInterceptor.setParamName("locale");
        registry.addInterceptor(localeChangeInterceptor);
    }
}
```

在这里，我们可以添加有关我们将要跟踪的参数的信息，因此每当请求包含区域设置参数时，上下文中的区域设置将被更新。我们可以通过在请求中提供区域设置来检查逻辑：

```java
@ParameterizedTest
@CsvSource({"eng,2","fr,2", "esp,2", "deu, 2","jp,0"})
void whenAskForNewsGetAllNewsInSpecificLanguageBasedOnLocale(String language, int expectedResultSize) {
    webTestClient.get().uri("/articles?locale=" + language)
      .exchange()
      .expectStatus().isOk()
      .expectBodyList(Article.class)
      .hasSize(expectedResultSize);
}

```

**_EvaluationContextExtension_ 可以显著增加 SpEL 的能力，特别是在使用 @Query 注解时。** 使用这种方法的方式可以包括从安全和角色限制到功能标志以及模式之间的交互。

## 5. 结论

SpEL 是一个强大的工具，正如所有强大的工具一样，人们倾向于过度使用它们，并试图只使用它来解决所有问题。最好合理地使用复杂表达式，并且只在必要时使用。

**尽管 IDE 提供了 SpEL 支持和高亮显示，复杂的逻辑可能会隐藏难以调试和验证的错误。** 因此，要谨慎使用 SpEL，避免使用可能更好地用 Java 表达而不是隐藏在 SpEL 中的“聪明代码”。

像往常一样，教程中使用的所有代码都可以在 GitHub 上找到。

OK