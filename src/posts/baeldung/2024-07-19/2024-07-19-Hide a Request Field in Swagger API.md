---
date: 2023-09-01
category:
  - Spring Boot
  - Swagger
tag:
  - Spring
  - Swagger
  - REST API
head:
  - - meta
    - name: keywords
      content: Spring Boot, Swagger, REST API, API 文档, 字段隐藏
---
# 在Swagger API中隐藏请求字段

我们可以将Swagger UI用作一个平台，以方便的方式可视化和与API接口交互。它是一个强大的工具，可以以最少的配置生成API结构。

在本文中，我们将重点关注使用Swagger与Spring Boot REST API。具体来说，我们将探讨在Swagger UI中隐藏请求字段的不同方法。

## 2. 引言

为了简单起见，我们将创建一个基本的Spring Boot应用程序，并使用Swagger UI探索API。

让我们创建一个简单的_ArticleApplication_，使用Spring Boot。我们使用_ArticlesController_公开两个API。我们希望使用GET API接收与所有文章相关的详细信息。

另一方面，我们使用POST API添加新文章的详细信息：

```java
@RestController
@RequestMapping("/articles")
public class ArticlesController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("")
    public List`<Article>` getAllArticles() {
        return articleService.getAllArticles();
    }

    @PostMapping("")
    public void addArticle(@RequestBody Article article) {
        articleService.addArticle(article);
    }

}
```

我们将使用_Article_类作为这些API的数据传输对象（DTO）。现在，让我们在_Article_类中添加一些字段：

```java
public class Article {

    private int id;
    private String title;
    private int numOfWords;

    // 标准 getter 和 setter

}
```

我们可以在 http://localhost:9090/springbootapp/swagger-ui/index.html#/articles-controller 访问Swagger UI。让我们运行应用程序并查看上述两个API的默认行为：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/2_BAEL-5329-Img1-e1648650028181.png) ![img](https://www.baeldung.com/wp-content/uploads/2022/04/2_BAEL-5329-Img2-e1648650100457.png)

在POST API中，我们接受用户的所有详细信息 - 即_id_、_title_和_numOfWords_。在GET API中，我们以相同的字段返回响应。我们可以看到，默认情况下，Swagger为两个API显示了所有字段。

现在，假设我们想使用单独的后端逻辑来设置_id_字段。在这种情况下，我们不希望用户输入与_id_字段相关的信息。为了避免任何混淆，我们希望在Swagger UI中隐藏此字段。

我们想到的一个直接选项是创建一个单独的DTO并在其中隐藏所需的字段。如果我们想要为DTOs添加额外的逻辑，这种方法可能会有所帮助。如果我们的整体需求适合，我们可以选择使用此选项。

对于本文，让我们使用不同的注解来隐藏Swagger UI中的字段。

## 3. 使用_@JsonIgnore_

_@JsonIgnore_是标准的Jackson注解。我们可以使用它来**指定在序列化和反序列化期间由Jackson忽略的字段**。我们可以将注解添加到要忽略的字段上，**它将隐藏指定字段的getter和setter**。

让我们尝试一下：

```java
@JsonIgnore
private int id;
```

让我们重新运行应用程序并检查Swagger UI：![img](https://www.baeldung.com/wp-content/uploads/2022/04/BAEL-5329-Img4.png) ![img](https://www.baeldung.com/wp-content/uploads/2022/04/BAEL-5329-Img-3.png)

我们可以看到_id_字段在API描述中没有显示。Swagger还提供了注解来实现类似的行为。

## 4. 使用_@Schema_

_@Schema_注解可用于定义OpenAPI规范的一组元素的模式，和/或为模式定义其他属性。它适用于例如_parameters_、模式类（即“模型”）、这些模型的属性、请求和响应内容以及头部。我们**可以使用注解的_hidden_属性在Swagger UI中隐藏模型对象定义中的字段**。

让我们为_id_字段尝试一下：

```java
@Schema(hidden = true)
private int id;
```

在上述情况下，我们发现_id_字段在GET和POST API中都被隐藏了。假设我们想允许用户在GET API响应中查看_id_详细信息。在这种情况下，我们需要寻找其他选项。

Swagger提供了**替代属性_readOnly_**，我们可以使用它来**在更新操作期间隐藏指定字段，但在检索操作期间仍然显示它**。然而，_readOnly_属性现在已弃用，并被**_accessMode_**属性取代：

让我们检查一下：

```java
@Schema(accessMode = AccessMode.READ_ONLY)
private int id;
```

让我们现在检查更新后的Swagger UI：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/BAEL-5329-Img5.png)

我们可以看到_id_字段现在在GET API中可见，但在POST API中仍然被隐藏 - 它支持_只读_操作。

![img](https://www.baeldung.com/wp-content/uploads/2023/09/Screenshot-2023-08-31-000305.png)

## 5. 使用_@JsonProperty_

Jackson提供了_@JsonProperty_注解。我们可以使用它来添加与POJO字段的getter/setter相关的元数据，这些元数据可以在对象的序列化/反序列化期间使用。我们可以**将注解的_access_属性设置为只允许对特定字段进行_读取_操作**：

```java
@JsonProperty(access = JsonProperty.Access.READ_ONLY)
private int id;
```

通过这种方式，我们能够隐藏POST API模型定义中的_id_字段，但仍然可以在GET API响应中显示它。

让我们探索另一种实现所需功能的途径。

## 6. 使用_@JsonView_

Jackson还提供了_@JsonView_注解，我们可以使用它来实现对类字段的视图限制，相同的限制也将适用于Swagger UI。

让我们创建一个_Views_类，并创建两个视图 - 公共和私有：

```java
public class Views {
    public static class Public {}

    public static class Private {}
}

```

接下来，让我们创建一个新的_Author_类，我们将对其应用我们的限制：

```java
public class Author {

    @JsonView(Views.Private.class)
    private Integer id;

    @JsonView(Views.Public.class)
    private String name;

    @JsonView(Views.Public.class)
    private int email;

    // 标准 getter 和 setter

}
```

在这里，我们用_@JsonView(Views.Public.class)_注释了字段 - _name_和_email_，以便只有在公共视图中包含这些字段。

接下来，让我们在我们的GET方法上应用公共视图，以便只有_name_和_email_在Swagger UI中可见：

```java
@JsonView(Views.Public.class)
@GetMapping
public List`<Author>` getAllAuthors() {
    return authorService.getAllAuthors();
}
```

让我们现在检查Swagger UI：

正如我们所看到的，只有_email_和_name_字段在Swagger UI中可见。

**对于POST请求，我们也可以使用@JsonView，但它仅与_@RequestBody_结合使用，并且不支持_@ModelAttribute_。**

让我们检查一个带有POST请求的示例：

```java
@PostMapping
public void addAuthor(@RequestBody @JsonView(Views.Public.class) Author author) {
  authorService.addAuthor(author);
}
```

让我们现在检查更新后的Swagger UI：

我们可以看到_id_字段没有在API描述中显示，只有_email_和_name_可供编辑。

让我们探索另一种实现所需功能的途径。

_@Hidden_也是Swagger的一个注解，它将给定的资源、类或bean类型标记为隐藏。

让我们尝试一下：

```java
@Hidden
private int id;
```

让我们检查这种情况下的Swagger UI规范：

我们成功地在GET和POST API请求数据定义中隐藏了_id_字段。

## 7. 结论

我们已经探讨了修改Swagger UI中模型对象属性可见性的不同选项。讨论的注解还提供了其他几个功能，我们可以使用它们来更新Swagger规范。我们应该根据我们的需求使用适当的方法。

源代码可在GitHub上获得。