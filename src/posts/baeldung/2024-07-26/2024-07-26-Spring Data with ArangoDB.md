---
date: 2022-04-01
category:
  - Spring Data
  - ArangoDB
tag:
  - Spring Data
  - ArangoDB
  - Java
  - Database
head:
  - - meta
    - name: keywords
      content: Spring Data, ArangoDB, Java, Database
---
# Spring Data 与 ArangoDB | Baeldung

## 1. 引言

在本教程中，我们将学习如何使用 Spring Data 模块和 ArangoDB 数据库进行操作。ArangoDB 是一个免费且开源的多模型数据库系统。它支持键值对、文档和图形数据模型，具有统一的查询语言：AQL（ArangoDB 查询语言）。

我们将涵盖所需的配置、基本的 CRUD 操作、自定义查询和实体关系。

## 2. ArangoDB 安装

要安装 ArangoDB，我们首先需要从官方 ArangoDB 网站的下载页面下载软件包。

为了本教程的目的，我们将安装 ArangoDB 的社区版。详细的安装步骤可以在这里找到。

默认安装包含一个名为 `_system` 的数据库和一个 `root` 用户，该用户可以访问所有数据库。

根据软件包的不同，安装程序在安装过程中可能会要求输入 root 密码，或者会设置一个随机密码。

默认配置下，我们将看到 ArangoDB 服务器在 `8529` 端口上运行。

安装完成后，我们可以使用 `http://localhost:8529` 上的 Web 界面与服务器交互。我们将在本教程后面的 Spring Data 配置中使用此主机和端口。

我们也可以另外使用 `arangosh`，这是一个与服务器交互的同步 shell。

让我们开始启动 `arangosh` 创建一个名为 `baeldung-database` 的新数据库，并为这个新创建的数据库创建一个用户 `baeldung`。

```shell
arangosh> db._createDatabase("baeldung-database", {}, [{ username: "baeldung", passwd: "password", active: true}]);
```

## 3. 依赖关系

要在应用程序中使用 Spring Data 与 ArangoDB，我们需要以下依赖项：

```xml
`<dependency>`
    `<groupId>`com.arangodb`</groupId>`
    `<artifactId>`arangodb-spring-data`</artifactId>`
    `<version>`3.5.0`</version>`
`</dependency>`
```

## 4. 配置

在我们开始使用数据之前，我们需要设置与 ArangoDB 的连接。我们应该通过创建一个实现 _ArangoConfiguration_ 接口的配置类来实现：

```java
@Configuration
public class ArangoDbConfiguration implements ArangoConfiguration {}
```

在内部，我们需要实现两个方法。第一个方法应该创建一个 _ArangoDB.Builder_ 对象，该对象将生成我们数据库的接口：

```java
@Override
public ArangoDB.Builder arango() {
    return new ArangoDB.Builder()
      .host("127.0.0.1", 8529)
      .user("baeldung").password("password"); 
}
```

创建连接需要四个必需参数：主机、端口、用户名和密码。

另外，我们可以跳过在配置类中设置这些参数：

```java
@Override
public ArangoDB.Builder arango() {
    return new ArangoDB.Builder();
}
```

因为我们可以将它们存储在 _arango.properties_ 资源文件中：

```properties
arangodb.host=127.0.0.1
arangodb.port=8529
arangodb.user=baeldung
arangodb.password=password
```

这是 Arango 寻找的默认位置。它可以通过向自定义属性文件传递 _InputStream_ 来重写：

```java
InputStream in = MyClass.class.getResourceAsStream("my.properties");
ArangoDB.Builder arango = new ArangoDB.Builder()
  .loadProperties(in);
```

我们需要实现的第二个方法是简单地提供我们应用程序所需的数据库名称：

```java
@Override
public String database() {
    return "baeldung-database";
}
```

此外，配置类需要 _@EnableArangoRepositories_ 注解，这告诉 Spring Data 在哪里查找 ArangoDB 仓库：

```java
@EnableArangoRepositories(basePackages = {"com.baeldung"})
```

## 5. 数据模型

作为下一步，我们将创建一个数据模型。对于这部分，我们将使用一个包含 _name_、_author_ 和 _publishDate_ 字段的文章表示：

```java
@Document("articles")
public class Article {
    @Id
    private String id;

    @ArangoId
    private String arangoId;

    private String name;
    private String author;
    private ZonedDateTime publishDate;

    // 构造函数
}
```

_ArangoDB_ 实体必须具有 _@Document_ 注解，该注解以集合名称作为参数。默认情况下，它是小写的类名。

接下来，我们有两个 id 字段。一个带有 Spring 的 _@Id_ 注解，另一个带有 Arango 的 _@ArangoId_ 注解。第一个存储生成的实体 id。第二个存储相同的 id，但是具有数据库中的正确位置。在我们的例子中，这些值可能分别是 _1_ 和 _articles/1_。

现在，当我们定义了实体之后，我们可以为数据访问创建一个仓库接口：

```java
@Repository
public interface ArticleRepository extends ArangoRepository``<Article, String>`` {}
```

它应该扩展 _ArangoRepository_ 接口，带有两个泛型参数。在我们的例子中，它是带有类型为 _String_ 的 id 的 _Article_ 类。

## 6. CRUD 操作

最后，我们可以创建一些具体数据。

作为一个起点，我们需要对文章仓库的依赖：

```java
@Autowired
ArticleRepository articleRepository;
```

以及 _Article_ 类的一个简单实例：

```java
Article newArticle = new Article(
  "ArangoDb with Spring Data",
  "Baeldung Writer",
  ZonedDateTime.now()
);
```

现在，如果我们想将这篇文章存储在我们的数据库中，我们应该简单地调用 _save_ 方法：

```java
Article savedArticle = articleRepository.save(newArticle);
```

之后，我们可以确保 _id_ 和 _arangoId_ 字段已经被生成：

```java
assertNotNull(savedArticle.getId());
assertNotNull(savedArticle.getArangoId());
```

要从数库中获取文章，我们需要先获取它的 id：

```java
String articleId = savedArticle.getId();
```

然后简单地调用 _findById_ 方法：

```java
Optional````<Article>```` articleOpt = articleRepository.findById(articleId);
assertTrue(articleOpt.isPresent());
```

有了文章实体，我们可以更改它的属性：

```java
Article article = articleOpt.get();
article.setName("New Article Name");
articleRepository.save(article);
```

最后，再次调用 _save_ 方法以更新数据库条目。它不会创建新条目，因为 id 已经被分配给了实体。

删除条目也是一个简单的操作。我们只需调用仓库的 _delete_ 方法：

```java
articleRepository.delete(article)
```

按 id 删除也是可能的：

```java
articleRepository.deleteById(articleId)
```

## 7. 自定义查询

使用 _Spring Data_ 和 _ArangoDB_，我们可以利用派生仓库，并简单地通过方法名定义查询：

```java
@Repository
public interface ArticleRepository extends ArangoRepository``<Article, String>`` {
    Iterable````<Article>```` findByAuthor(String author);
}
```

第二个选项是使用 AQL（ArangoDb 查询语言）。这是一个自定义的语法语言，我们可以使用 _@Query_ 注解来应用它。

现在，让我们看看一个基本的 AQL 查询，它将找到所有给定作者的文章，并按发布日期排序：

```java
@Query("FOR a IN articles FILTER a.author == @author SORT a.publishDate ASC RETURN a")
Iterable````<Article>```` getByAuthor(@Param("author") String author);
```

## 8. 关系

_ArangoDB_ 允许我们在实体之间创建关系。

例如，让我们在 _Author_ 类和它的文章之间创建一个关系。

为此，我们需要定义一个新的集合属性，带有 _@Relations_ 解，其中包含链接到给定作者编写的每篇文章：

```java
@Relations(edges = ArticleLink.class, lazy = true)
private Collection````<Article>```` articles;
```

正如我们所看到的，_ArangoDB_ 中的关系是通过一个单独的类来定义的，该类带有 @Edge 注解：

```java
@Edge
public class ArticleLink {
    @From
    private Article article;

    @To
    private Author author;

    // 构造函数，getter 和 setter
}
```

它带有两个字段，分别带有 _@From_ 和 _@To_ 注解。它们定义了进入和出去的关系。

## 9. 结论

在本教程中，我们学习了如何配置 ArangoDB 并使用 Spring Data。我们涵盖了基本的 CRUD 操作、自定义查询和实体关系。

像往常一样，所有源代码都可以在 GitHub 上找到。