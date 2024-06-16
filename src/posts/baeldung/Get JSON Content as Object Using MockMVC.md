---
date: 2024-06-17
category:
  - Spring
  - Spring Boot
tag:
  - MockMVC
  - JSON
---
使用MockMVC获取JSON内容为对象 | Baeldung

## 1. 概述

在测试我们的REST端点时，有时我们希望获取响应并将其转换为对象，以便进一步检查和验证。众所周知，一种方法是使用如RestAssured等库在不将响应转换为对象的情况下验证响应。

在本教程中，我们将探索使用MockMVC和Spring Boot获取JSON内容为对象的几种方法。

## 2. 示例设置

在我们深入研究之前，让我们创建一个我们将用于测试的简单REST端点。

让我们从依赖设置开始。我们将在_pom.xml_中添加_spring-boot-starter-web_依赖，以便我们可以创建REST端点：

```
``<dependency>``
   ``<groupId>``org.springframework.boot``</groupId>``
   ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
```

接下来，让我们定义_Article_类：

```java
public class Article {
    private Long id;
    private String title;

    // 标准getter和setter
}
```

进一步，让我们创建_ArticleController_，其中包含两个端点，一个返回单个文章，另一个返回文章列表：

```java
@RestController
@RequestMapping
public class ArticleController {
    @GetMapping("/article")
    public Article getArticle() {
        return new Article(1L, "Learn Spring Boot");
    }

    @GetMapping("/articles")
    public List`````<Article>````` getArticles() {
        return List.of(new Article(1L, "Guide to JUnit"), new Article(2L, "Working with Hibernate"));
    }
}
```

## 3. 测试类

为了测试我们的控制器，我们将使用_@WebMvcTest_注解装饰我们的测试类。当我们使用此注解时，**Spring Boot自动配置MockMvc并仅针对web层启动上下文**。

此外，我们将指定仅实例化_ArticleController_控制器的上下文，这在具有多个控制器的应用程序中非常有用：

```java
@WebMvcTest(ArticleController.class)
class ArticleControllerUnitTest {
    @Autowired
    private MockMvc mockMvc;
}
```

我们还可以使用_@AutoConfigureMockMvc_注解配置MockMVC。然而，这种方法要求Spring Boot运行整个应用程序上下文，这将使我们的测试运行变慢。

现在我们已经设置好了，让我们探索如何使用MockMvc执行请求并将响应作为对象获取。

## 4. 使用Jackson

将JSON内容转换为对象的一种方法是使用Jackson库。

### 4.1. 获取单个对象

让我创建一个测试来验证HTTP GET _/article_端点是否按预期工作。

由于我们想要将响应转换为对象，让我们首先调用_mockMvc_上的_andReturn()_方法以检索结果：

```java
MvcResult result = this.mockMvc.perform(get("/article"))
  .andExpect(status().isOk())
  .andReturn();
```

**_andReturn()_方法返回_MvcResult_对象，它允许我们执行不支持的工具的额外验证。**

此外，我们可以调用_getContentAsString()_方法以检索响应作为_String_。不幸的是，MockMvc没有定义我们可以用来将响应转换为特定对象类型的方法是。我们需要自己指定逻辑。

**我们将使用Jackson的_ObjectMapper_将JSON内容转换为所需的类型。**

让我们调用_readValue()_方法并传递响应以_String_格式以及我们想要将响应转换为的类型：

```java
String json = result.getResponse().getContentAsString();
Article article = objectMapper.readValue(json, Article.class);

assertNotNull(article);
assertEquals(1L, article.getId());
assertEquals("Learn Spring Boot", article.getTitle());
```

### 4.2. 获取对象集合

让我们看看当端点返回集合时如何获取响应。

在前一节中，当我们想要获取单个对象时，我们指定了类型为_Article.class_。然而，这在集合等泛型类型中是不可能的。我们不能指定类型为_List`````<Article>`````.class_。

**我们可以使用Jackson的_TypeReference_泛型类来反序列化集合：**

```java
@Test
void whenGetArticle_thenReturnListUsingJacksonTypeReference() throws Exception {
    MvcResult result = this.mockMvc.perform(get("/articles"))
      .andExpect(status().isOk())
      .andReturn();

    String json = result.getResponse().getContentAsString();
    List`````<Article>````` articles = objectMapper.readValue(json, new TypeReference<List`````<Article>`````>(){});

    assertNotNull(articles);
    assertEquals(2, articles.size());
}
```

由于类型擦除，泛型类型信息在运行时不可用。要克服这个限制，_TypeReference_在编译时捕获我们想要将JSON转换为的类型。

此外，**我们可以通过指定_CollectionType_实现相同的功能：**

```java
String json = result.getResponse().getContentAsString();
CollectionType collectionType = objectMapper.getTypeFactory().constructCollectionType(List.class, Article.class);
List`````<Article>````` articles = objectMapper.readValue(json, collectionType);

assertNotNull(articles);
assertEquals(2, articles.size());
}
```

## 5. 使用Gson

现在，让我们看看如何使用Gson库将JSON内容转换为对象。

首先，让我们在_pom.xml_中添加所需的依赖：

```
``<dependency>``
    ``<groupId>``com.google.code.gson``</groupId>``
    ``<artifactId>``gson``</artifactId>``
    `<version>`2.10.1`</version>`
``</dependency>``
```

### 5.1. 获取单个对象

我们可以通过在_Gson_实例上调用_fromJson()_方法，传递内容和所需的类型，将JSON转换为对象：

```java
@Test
void whenGetArticle_thenReturnArticleObjectUsingGson() throws Exception {
    MvcResult result = this.mockMvc.perform(get("/article"))
      .andExpect(status().isOk())
      .andReturn();

    String json = result.getResponse().getContentAsString();
    Article article = new Gson().fromJson(json, Article.class);

    assertNotNull(article);
    assertEquals(1L, article.getId());
    assertEquals("Learn Spring Boot", article.getTitle());
}
```

### 5.2. 获取对象集合

最后，让我们看看如何使用Gson处理集合。

**要使用Gson反序列化集合，我们可以指定_TypeToken_：**

```java
@Test
void whenGetArticle_thenReturnArticleListUsingGson() throws Exception {
    MvcResult result = this.mockMvc.perform(get("/articles"))
      .andExpect(status().isOk())
      .andReturn();

    String json = result.getResponse().getContentAsString();
    TypeToken<List`````<Article>`````> typeToken = new TypeToken<List`````<Article>`````>(){};
    List`````<Article>````` articles = new Gson().fromJson(json, typeToken.getType());

    assertNotNull(articles);
    assertEquals(2, articles.size());
}
```

在这里，我们为_Article_元素的列表定义了_TypeToken_。然后，在_fromJson()_方法中，我们调用_getType()_返回_Type_对象。**Gson使用反射来确定我们想要将JSON转换为哪种类型的对象。**

## 6. 结论

在本文中，我们学习了在MockMVC工具中工作时获取JSON内容为对象的几种方法。

总之，我们可以使用Jackson的_ObjectMapper_将_String_响应转换为所需的类型。当处理集合时，我们需要指定_TypeReference_或_CollectionType_。同样，我们可以使用Gson库来反序列化对象。

如常，所有源代码都在GitHub上可用。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。