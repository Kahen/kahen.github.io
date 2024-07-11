---
date: 2022-04-01
category:
  - Java
  - Spring Boot
tag:
  - Blaze Persistence
  - JPA
  - Hibernate
head:
  - - meta
    - name: keywords
      content: Blaze Persistence, Spring Boot, JPA, Hibernate, 教程
---

# 使用Blaze Persistence入门指南

在这个教程中，我们将讨论在Spring Boot应用程序中使用Blaze Persistence库的方法。

该库提供了丰富的Criteria API，用于以编程方式创建SQL查询。它允许我们应用各种类型的过滤器、函数和逻辑条件。

我们将涵盖项目设置，提供一些如何创建查询的例子，并看看如何将实体映射到DTO对象。

## 2. Maven依赖

要在项目中包含Blaze Persistence核心，我们需要在_pom.xml_文件中添加依赖blaze-persistence-core-api-jakarta、blaze-persistence-core-impl-jakarta和blaze-persistence-integration-hibernate-6.2：

```xml
```````<dependency>```````
    ```````<groupId>```````com.blazebit```````</groupId>```````
    ```````<artifactId>```````blaze-persistence-core-api-jakarta```````</artifactId>```````
    ```<scope>```compile```</scope>```
```````</dependency>```````
```````<dependency>```````
    ```````<groupId>```````com.blazebit```````</groupId>```````
    ```````<artifactId>```````blaze-persistence-core-impl-jakarta```````</artifactId>```````
    ```<scope>```runtime```</scope>```
```````</dependency>```````
```````<dependency>```````
    ```````<groupId>```````com.blazebit```````</groupId>```````
    ```````<artifactId>```````blaze-persistence-integration-hibernate-6.2```````</artifactId>```````
    ```<scope>```runtime```</scope>```
```````</dependency>```````
```

根据我们使用的Hibernate版本，最后一个依赖可能不同。

## 3. 实体模型

作为第一步，让我们定义我们将在示例中使用的数据模型。为了自动创建表，我们将使用Hibernate。

我们将有两个实体，_Person_和_Post_，它们通过一对多的关系连接：

```java
@Entity
public class Person {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private int age;

    @OneToMany(mappedBy = "author")
    private Set`````<Post>````` posts = new HashSet<>();
}
```

```java
@Entity
public class Post {
    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    private Person author;
}
```

## 4. Criteria API

Blaze Persistence库是JPA Criteria API的替代品。两个API都允许我们在运行时定义动态查询。

然而，JPA Criteria API在开发人员中并不流行，因为它难以读写。相比之下，Blaze Persistence旨在更加用户友好和易于使用。此外，它与各种JPA实现集成，并提供了广泛的查询功能。

### 4.1. 配置

**为了使用Blaze Persistence Criteria API，我们需要在我们的配置类中定义_CriteriaBuilderFactory_ bean：**

```java
@Autowired
private EntityManagerFactory entityManagerFactory;

@Bean
public CriteriaBuilderFactory createCriteriaBuilderFactory() {
    CriteriaBuilderConfiguration config = Criteria.getDefault();
    return config.createCriteriaBuilderFactory(entityManagerFactory);
}
```

### 4.2. 基本查询

现在，让我们从一个简单的查询开始，它从数据库中选择每一个_Post_。我们只需要两个方法调用来定义和执行查询：

```java
List`````<Post>````` posts = builderFactory.create(entityManager, Post.class).getResultList();
```

_create_方法创建一个查询，而调用_getResultList_方法返回查询返回的结果。

此外，在_create_方法中，_Post.class_参数有多个用途：

- 确定查询的结果类型
- 确定隐式的查询根
- 为Post表添加隐式的SELECT和FROM子句

执行后，查询将生成以下JPQL：

```sql
SELECT post
FROM Post post;
```

### 4.3. WHERE子句

我们可以通过在_create_方法之后调用_where_方法来在我们的条件构建器中添加WHERE子句。

让我们看看如何获取由至少写了两篇文章的人写的帖子，并且年龄在18到40岁之间：

```java
CriteriaBuilder`<Person>` personCriteriaBuilder = builderFactory.create(entityManager, Person.class, "p")
  .where("p.age")
    .betweenExpression("18")
    .andExpression("40")
  .where("SIZE(p.posts)").geExpression("2")
  .orderByAsc("p.name")
  .orderByAsc("p.id");
```

**由于Blaze Persistence支持直接函数调用语法，我们可以轻松地检索与个人连接的帖子的大小。**

**此外，我们可以通过调用_whereAnd_或_whereOr_方法来定义复合谓词。**它们返回构建器实例，我们可以使用它来通过多次调用_where_方法来定义嵌套复合谓词。一旦我们完成，我们需要调用_endAnd_或_endOr_方法来关闭复合谓词。

例如，让我们创建一个查询，选择具有特定标题或作者名称的帖子：

```java
CriteriaBuilder`````<Post>````` postCriteriaBuilder = builderFactory.create(entityManager, Post.class, "p")
  .whereOr()
    .where("p.title").like().value(title + "%").noEscape()
    .where("p.author.name").eq(authorName)
  .endOr();
```

### 4.4. FROM子句

FROM子句包含应该被查询的实体。如前所述，我们可以在create方法中指定根实体。然而，我们可以定义FROM子句来指定根。这样，隐式创建的查询根将被移除：

```java
CriteriaBuilder`````<Post>````` postCriteriaBuilder = builderFactory.create(entityManager, Post.class)
  .from(Person.class, "person")
  .select("person.posts");
```

在这个例子中，_Post.class_参数只定义了返回类型。

由于我们从不同的表中选择，构建器将在生成的查询中添加隐式JOIN：

```sql
SELECT posts_1
FROM Person person
LEFT JOIN person.posts posts_1;
```

## 5. 实体视图模块

**Blaze Persistence实体视图模块试图解决实体和DTO类之间高效映射的问题。**使用这个模块，我们可以定义DTO类为接口，并使用注释提供到实体类的映射。

### 5.1. Maven依赖

我们需要在项目中包含额外的entity-view依赖：

```xml
```````<dependency>```````
    ```````<groupId>```````com.blazebit```````</groupId>```````
    ```````<artifactId>```````blaze-persistence-entity-view-api-jakarta```````</artifactId>```````
```````</dependency>```````
```````<dependency>```````
    ```````<groupId>```````com.blazebit```````</groupId>```````
    ```````<artifactId>```````blaze-persistence-entity-view-impl-jakarta```````</artifactId>```````
```````</dependency>```````
```````<dependency>```````
    ```````<groupId>```````com.blazebit```````</groupId>```````
    ```````<artifactId>```````blaze-persistence-entity-view-processor-jakarta```````</artifactId>```````
```````</dependency>```````
```

### 5.2. 配置

此外，我们需要一个_entityViewManager_ bean，注册实体视图类：

```java
@Bean
public EntityViewManager createEntityViewManager(
  CriteriaBuilderFactory criteriaBuilderFactory, EntityViewConfiguration entityViewConfiguration) {
    return entityViewConfiguration.createEntityViewManager(criteriaBuilderFactory);
}
```

**由于_EntityViewManager_绑定到_EntityManagerFactory_和_CriteriaBuilderFactory_，其作用域应该是相同的。**

### 5.3. 映射

实体视图表示是一个简单的接口或抽象类，描述了我们想要的投影结构。

让我们创建一个接口，将代表_Post_类的实体视图：

```java
@EntityView(Post.class)
public interface PostView {

    @IdMapping
    Long getId();

    String getTitle();

    String getContent();
}
```

**我们需要使用_@EntityView_注释来注释我们的接口，并提供实体类。**

虽然不是必需的，但我们应该在可能的情况下使用_@IdMapping_注释定义id映射。没有这样的映射的实体视图将具有考虑所有属性的_equals_和_hashCode_实现，而有了id映射，只考虑id。

然而，如果我们想为getter方法使用不同的名称，我们可以添加一个_@Mapping_注释。使用这个注释，我们可以定义整个表达式：

```java
@Mapping("UPPER(title)")
String getTitle();
```

作为结果，映射将返回_Post_实体的大写标题。

此外，我们可以扩展实体视图。假设我们想定义一个视图，它将返回一个帖子以及附加的作者信息。

首先，我们将定义一个_PersonView_接口：

```java
@EntityView(Person.class)
public interface PersonView {

    @IdMapping
    Long getId();

    int getAge();

    String getName();
}
```

其次，让我们定义一个新的接口，它扩展了_PostView_接口，并返回_PersonView_信息的方法：

```java
@EntityView(Post.class)
public interface PostWithAuthorView extends PostView {
    PersonView getAuthor();
}
```

最后，让我们使用视图与条件构建器。它们可以直接应用到查询中。

我们可以定义一个基本查询，然后创建映射：

```java
CriteriaBuilder`````<Post>````` postCriteriaBuilder = builderFactory.create(entityManager, Post.class, "p")
  .whereOr()
    .where("p.title").like().value("title%").noEscape()
    .where("p.author.name").eq(authorName)
  .endOr();

CriteriaBuilder`<PostWithAuthorView>` postWithAuthorViewCriteriaBuilder =
  viewManager.applySetting(EntityViewSetting.create(PostWithAuthorView.class), postCriteriaBuilder);
```

上述代码将会创建一个优化的查询，并基于结果构建我们的实体视图：

```sql
SELECT p.id AS PostWithAuthorView_id,
  p.author.id AS PostWithAuthorView_author_id,
  author_1.age AS PostWithAuthorView_author_age,
  author_1.name AS PostWithAuthorView_author_name,
  p.content AS PostWithAuthorView_content,
  UPPER(p.title) AS PostWithAuthorView_title
FROM com.baeldung.model.Post p
LEFT JOIN p.author author_1
WHERE p.title LIKE REPLACE(:param_0, '\\', '\\\\')
  OR author_1.name = :param_1
```

### 5.4. 实体视图和Spring Data

除了与Spring集成外，Blaze Persistence还提供了一个Spring Data集成模块，使得使用实体视图和使用实体一样方便。

此外，我们需要包括一个Spring集成依赖：

```xml
```````<dependency>```````
    ```````<groupId>```````com.blazebit```````</groupId>```````
    ```````<artifactId>```````blaze-persistence-integration-spring-data-3.1```````</artifactId>```````
```````</dependency>```````
```

而且，为了启用Spring Data，我们需要使用_@EnableBlazeRepositories_注释我们的配置类。可选地，我们可以指定用于存储库类扫描的基础包。

**集成提供了一个基础的_EntityViewRepository_接口，我们可以用它来定义我们的存储库定义。**

现在，让我们定义一个与_PostWithAuthorView_一起工作的接口：

```java
@Repository
@Transactional(readOnly = true)
public interface PostViewRepository extends EntityViewRepository`<PostWithAuthorView, Long>` {
}
```

在这里，我们的接口继承了最常用的存储库方法，如_findAll_、_findOne_和_exists_。如果需要，我们可以使用Spring Data JPA方法命名约定定义我们自己的方法。

## 6. 结论

在本文中，我们学习了如何配置和使用Blaze Persistence库创建简单查询。

像往常一样，所有源代码都可以在GitHub上找到。

OK