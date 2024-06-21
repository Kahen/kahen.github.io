---
date: 2024-06-22
category:
  - GraphQL
  - Java
tag:
  - GraphQL Mutation
  - Spring Boot
head:
  - - meta
    - name: keywords
      content: GraphQL, Java, Mutation, Spring Boot, API
---
# 在不返回数据的情况下实现GraphQL Mutation

## 1. 引言

**GraphQL 是一种强大的 API 查询语言，为我们与数据的交互提供了灵活而高效的方式。** 当处理 mutation（变更）时，我们通常会在服务器上执行数据的更新或添加。然而，在某些场景中，我们可能需要进行变更而不返回任何数据。

在 GraphQL 中，默认行为是强制字段在模式中为非空性，这意味着除非明确标记为可空，否则字段必须始终返回一个值，不能为 null。虽然这种严格性有助于 API 的清晰度和可预测性，但有时返回 null 可能是必要的。然而，通常认为避免返回 null 值是一个最佳实践。

在本文中，我们将探讨实现不检索或返回特定信息的 GraphQL mutation 的技术。

## 2. 先决条件

对于我们的示例，我们需要以下依赖项：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-graphql``</artifactId>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
```

**Spring Boot GraphQL Starter 提供了一个快速设置 GraphQL 服务器的出色解决方案。** 通过利用自动配置和采用基于注解的编程方法，我们只需要关注为我们的服务编写关键代码。

我们在我们的配置中包含了 web starter，因为 GraphQL 是传输无关的。这利用了 Spring MVC 通过 HTTP 公开 GraphQL API。我们可以通过默认的 /graphql 端点访问它。我们还可以为不同的底层实现使用其他 starter，比如 Spring Webflux。

## 3. 使用可空类型

与某些编程语言不同，GraphQL 强制每个字段在模式中明确声明可空性。这种方法提高了清晰度，允许我们传达一个字段何时可能没有值。

### 3.1. 编写模式

Spring Boot GraphQL starter 会自动定位在 _src/main/resources/graphql/**_ 位置下的 GraphQL 模式文件。它根据这些文件构建正确的结构，并将特殊 beans 连接到这个结构。

我们将从创建 _schema.graphqls_ 文件开始，并定义我们示例的模式：

```graphql
type Post {
    id: ID
    title: String
    text: String
    category: String
    author: String
}

type Mutation {
    createPostReturnNullableType(title: String!, text: String!, category: String!, authorId: String!) : Int
}
```

我们将有一个 _Post_ 实体和一个创建新帖子的 mutation。此外，为了使我们的模式通过验证，它必须有一个查询。因此，我们将实现一个返回帖子列表的虚拟查询：

```graphql
type Query {
    recentPosts(count: Int, offset: Int): [Post]!
}
```

### 3.2. 使用 Beans 表示类型

**在 GraphQL 服务器中，每种复杂类型都与一个 Java bean 关联。** 这些关联基于对象和属性名称建立。也就是说，我们将为我们的帖子创建一个 POJO 类：

```java
public class Post {
    private String id;
    private String title;
    private String text;
    private String category;
    private String author;

    // getters, setters, constructor
}
```

Java bean 中未映射的字段或方法在 GraphQL 模式中被忽略，不会产生问题。

### 3.3. 创建 Mutation Resolver

**我们必须用 @MutationMapping 标签标记处理函数。** 这些方法应该放在我们应用程序中的常规 _@Controller_ 组件内，将类注册为我们 GraphQL 应用程序中的数据修改组件：

```java
@Controller
public class PostController {

    List`<Post>` posts = new ArrayList<>();

    @MutationMapping
    public Integer createPost(@Argument String title, @Argument String text, @Argument String category, @Argument String author) {
        Post post = new Post();
        post.setId(UUID.randomUUID().toString());
        post.setTitle(title);
        post.setText(text);
        post.setCategory(category);
        post.setAuthor(author);
        posts.add(post);
        return null;
    }
}
```

**我们必须根据模式中的属性用 _@Argument_ 注解方法的参数。** 当我们声明模式时，我们确定我们的 mutation 将返回一个 _Int_ 类型，没有感叹号。这允许返回值为 _null_。

## 4. 创建自定义标量

在 GraphQL 中，标量是代表 GraphQL 查询或模式中叶节点的原子数据类型。

### 4.1. 标量和扩展标量

根据 GraphQL 规范，所有实现都必须包括以下标量类型：_String_, _Boolean_, _Int_, _Float_, 或 _ID_。除此之外，graphql-java-extended-scalars 添加了更多自定义标量，如 _Long_, _BigDecimal_, 或 _LocalDate_。**然而，原始的或扩展的标量集合中都没有一个特殊的 _null_ 值标量。** **因此，我们将在这一部分构建我们的标量。**

### 4.2. 创建自定义标量

**要创建自定义标量，我们应该初始化一个 _GraphQLScalarType_ 单例实例。** 我们将使用构建者设计模式创建我们的标量：

```java
public class GraphQLVoidScalar {

    public static final GraphQLScalarType Void = GraphQLScalarType.newScalar()
      .name("Void")
      .description("A custom scalar that represents the null value")
      .coercing(new Coercing() {
          @Override
          public Object serialize(Object dataFetcherResult) {
              return null;
          }

          @Override
          public Object parseValue(Object input) {
              return null;
          }

          @Override
          public Object parseLiteral(Object input) {
              return null;
          }
      })
      .build();
}
```

**标量的关键组成部分是名称、描述和 coercing。** 尽管名称和描述是自我解释的，但创建自定义标量最困难的部分是 _graphql.schema.Coercing_ 实现。这个类负责三个功能：

- _parseValue()_ **:** 接受一个变量输入对象，并将其转换为相应的 Java 运行时表示
- _parseLiteral()_ **:** 接收 AST 字面量 _graphql.language.Value_ 作为输入，并将其转换为 Java 运行时表示
- _serialize()_ **:** 接受一个 Java 对象，并将其转换为该标量的输出形状

尽管对于复杂对象，coercing 的实现可能相当复杂，但在我们的情况下，我们将为每个方法返回 _null_。

### 4.3. 注册自定义标量

我们将通过创建一个配置类来注册我们的标量：

```java
@Configuration
public class GraphQlConfig {
    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return wiringBuilder -> wiringBuilder.scalar(GraphQLVoidScalar.Void);
    }
}
```

我们创建了一个 _RuntimeWiringConfigurer_ bean，在这里我们配置了我们 _GraphQL_ 模式的运行时布线。**在这个 bean 中，我们使用 _RuntimeWiring_ 类提供的 _scalar()_ 方法来注册我们的自定义类型。**

### 4.4. 集成自定义标量

**最后一步是将自定义标量集成到我们的 GraphQL 模式中，通过使用定义的名称引用它。** 在这种情况下，我们通过简单地声明 _scalar Void_ 来在模式中使用标量。

这一步确保了 GraphQL 引擎识别并在整个模式中使用我们的自定义标量。现在，我们可以将标量集成到我们的 mutation 中：

```graphql
scalar Void

type Mutation {
    createPostReturnCustomScalar(title: String!, text: String!, category: String!, authorId: String!) : Void
}
```

此外，我们将更新映射方法的签名以返回我们的标量：

```java
public Void createPostReturnCustomScalar(@Argument String title, @Argument String text, @Argument String category, @Argument String author)
```

## 5. 结论

在本文中，我们探讨了在不返回特定数据的情况下实现 GraphQL mutation。我们展示了如何使用 Spring Boot GraphQL Starter 快速设置服务器。此外，我们引入了自定义的 _Void_ 标量来处理 _null_ 值，展示了如何扩展 GraphQL 的能力。

如常，完整的代码片段可以在 GitHub 上找到。翻译已经完成，以下是剩余部分的翻译：

## 5. 结论

在本文中，我们探讨了如何在不返回特定数据的情况下实现 GraphQL mutations。我们展示了如何使用 Spring Boot GraphQL Starter 快速搭建服务器。此外，我们引入了一个自定义的 `Void` 标量来处理 `null` 值，展示了如何扩展 GraphQL 的能力。

一如既往，完整的代码片段可以在 GitHub 上找到。

OK