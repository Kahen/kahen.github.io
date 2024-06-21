---
date: 2023-10-10
category:
  - Spring
  - JPA
tag:
  - Querydsl
  - JPA Criteria
head:
  - - meta
    - name: keywords
      content: Java, Spring Data, JPA, Querydsl, Criteria API
---

# Querydsl 与 JPA Criteria 的比较

Querydsl 和 JPA Criteria 是 Java 中构建类型安全查询的流行框架。它们都提供了静态类型查询的表达方式，使得编写高效且易于维护的数据库交互代码变得更加容易。在本文中，我们将从不同的角度对它们进行比较。

## 2. 设置

首先，我们需要为我们的测试设置依赖项和配置。在所有示例中，我们将使用 HyperSQL 数据库：

```xml
``````<dependency>``````
    ```````<groupId>```````org.hsqldb```````</groupId>```````
    ```````<artifactId>```````hsqldb```````</artifactId>```````
    ```````<version>```````2.7.1```````</version>```````
``````</dependency>``````
```

我们将使用 _JPAMetaModelEntityProcessor_ 和 _JPAAnnotationProcessor_ 为我们的框架生成元数据。为此，我们将添加 _maven-processor-plugin_ 并配置如下：

```xml
`<plugin>`
    ```````<groupId>```````org.bsc.maven```````</groupId>```````
    ```````<artifactId>```````maven-processor-plugin```````</artifactId>```````
    ```````<version>```````5.0```````</version>```````
    `<executions>`
        `<execution>`
            `<id>`process`</id>`
            `<goals>`
                `<goal>`process`</goal>`
            `</goals>`
            `<phase>`generate-sources`</phase>`
            `<configuration>`
                `<processors>`
                    ``<processor>``org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor``</processor>``
                    ``<processor>``com.querydsl.apt.jpa.JPAAnnotationProcessor``</processor>``
                `</processors>`
            `</configuration>`
        `</execution>`
    `</executions>`
    `<dependencies>`
        ``````<dependency>``````
            ```````<groupId>```````org.hibernate```````</groupId>```````
            ```````<artifactId>```````hibernate-jpamodelgen```````</artifactId>```````
            ```````<version>```````6.2.0.Final```````</version>```````
        ``````</dependency>``````
    `</dependencies>`
`</plugin>`
```

然后，让我们配置 _EntityManager_ 的属性：

```xml
`<persistence-unit name="com.baeldung.querydsl.intro">`
    `<provider>`org.hibernate.jpa.HibernatePersistenceProvider`</provider>`
    `<properties>`
        `<property name="hibernate.connection.driver_class" value="org.hsqldb.jdbcDriver"/>`
        `<property name="hibernate.connection.url" value="jdbc:hsqldb:mem:test"/>`
        `<property name="hibernate.connection.username" value="sa"/>`
        `<property name="hibernate.connection.password" value=""/>`
        `<property name="hibernate.hbm2ddl.auto" value="update"/>`
        `<property name="hibernate.dialect" value="org.hibernate.dialect.HSQLDialect" />`
    `</properties>`
`</persistence-unit>`
```

### 2.1. JPA Criteria

要使用 _EntityManager_，我们需要为任何 JPA 提供者指定依赖项。让我们选择 Hibernate 作为最受欢迎的一个：

```xml
``````<dependency>``````
    ```````<groupId>```````org.hibernate```````</groupId>```````
    ```````<artifactId>```````hibernate-core```````</artifactId>```````
    ```````<version>```````6.2.0.Final```````</version>```````
``````</dependency>``````
```

为了支持代码生成功能，我们将添加注解处理器依赖项：

```xml
``````<dependency>``````
    ```````<groupId>```````org.hibernate```````</groupId>```````
    ```````<artifactId>```````hibernate-jpamodelgen```````</artifactId>```````
    ```````<version>```````6.2.0.Final```````</version>```````
``````</dependency>``````
```

### 2.2. Querydsl

由于我们将与 _EntityManager_ 一起使用它，我们仍然需要包含前一节中的依赖项。此外，我们将加入 Querydsl 依赖项：

```xml
``````<dependency>``````
    ```````<groupId>```````com.querydsl```````</groupId>```````
    ```````<artifactId>```````querydsl-jpa```````</artifactId>```````
    ```````<version>```````5.0.0```````</version>```````
``````</dependency>``````
```

为了支持基于 APT 的源代码生成功能，我们将添加依赖项：

```xml
``````<dependency>``````
    ```````<groupId>```````com.querydsl```````</groupId>```````
    ```````<artifactId>```````querydsl-apt```````</artifactId>```````
    `<classifier>`jakarta`</classifier>`
    ```````<version>```````5.0.0```````</version>```````
``````</dependency>``````
```

## 3. 简单查询

**让我们从没有额外逻辑的单个实体的简单查询开始**。我们将使用以下数据模型，根实体将是 _UserGroup_：

```java
@Entity
public class UserGroup {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToMany(cascade = CascadeType.PERSIST)
    private Set`<GroupUser>` groupUsers = new HashSet<>();
    
    // getters and setters
}
```

在这个实体中，我们将与 _GroupUser_ 建立多对多关系：

```java
@Entity
public class GroupUser {
    @Id
    @GeneratedValue
    private Long id;

    private String login;

    @ManyToMany(mappedBy = "groupUsers", cascade = CascadeType.PERSIST)
    private Set````````<UserGroup>```````` userGroups = new HashSet<>();
    
    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "groupUser")
    private Set`<Task>` tasks = new HashSet<>(0);
    
    // getters and setters
}
```

最后，我们将添加一个与 _User_ 多对一关系的 _Task_ 实体：

```java
@Entity
public class Task {
    @Id
    @GeneratedValue
    private Long id;

    private String description;

    @ManyToOne
    private GroupUser groupUser;
    // getters and setters
}
```

### 3.1. JPA Criteria

现在，让我们从数据库中选择所有的 _UserGroup_ 项目：

```java
@Test
void givenJpaCriteria_whenGetAllTheUserGroups_thenExpectedNumberOfItemsShouldBePresent() {
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery````````<UserGroup>```````` cr = cb.createQuery(UserGroup.class);
    Root````````<UserGroup>```````` root = cr.from(UserGroup.class);
    CriteriaQuery````````<UserGroup>```````` select = cr.select(root);

    TypedQuery````````<UserGroup>```````` query = em.createQuery(select);
    List````````<UserGroup>```````` results = query.getResultList();
    Assertions.assertEquals(3, results.size());
}
```

我们通过调用 _EntityManager_ 的 _getCriteriaBuilder()_ 方法创建了一个 _CriteriaBuilder_ 实例。然后，我们为 _UserGroup_ 模型创建了一个 _CriteriaQuery_ 实例。之后，我们通过调用 _EntityManager_ 的 _createQuery()_ 方法获得了一个 _TypedQuery_ 实例。通过调用 _getResultList()_ 方法，我们从数据库检索了实体列表。**正如我们所看到的，预期数量的项目出现在结果集合中**。

### 3.2. Querydsl

让我们准备 _JPAQueryFactory_ 实例，我们将用它来创建我们的查询。

```java
@BeforeEach
void setUp() {
    em = emf.createEntityManager();
    em.getTransaction().begin();
    queryFactory = new JPAQueryFactory(em);
}
```

现在，我们将使用 Querydsl 执行与前一节相同的查询：

```java
@Test
void givenQueryDSL_whenGetAllTheUserGroups_thenExpectedNumberOfItemsShouldBePresent() {
    List````````<UserGroup>```````` results = queryFactory.selectFrom(QUserGroup.userGroup).fetch();
    Assertions.assertEquals(3, results.size());
}
```

使用 _JPAQueryFactory_ 的 _selectFrom()_ 方法开始构建我们的实体查询。然后，_fetch()_ 从数据库检索值到持久化上下文中。**最后，我们得到了相同的结果，但我们的查询构建过程大大缩短了**。

## **4.** 过滤、排序和分组

让我们深入一个更复杂的例子。**我们将探索我们的框架如何处理过滤、排序和数据聚合查询**。

### 4.1. JPA Criteria

在这个例子中，我们将查询所有的 _UserGroup_ 实体，使用名称过滤它们，这些名称应该在两个列表中的一个。我们将按 _UserGroup_ 名称以降序排序结果。此外，我们将聚合来自结果的每个 _UserGroup_ 的唯一 ID：

```java
@Test
void givenJpaCriteria_whenGetTheUserGroups_thenExpectedAggregatedDataShouldBePresent() {
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery````<Object[]>```` cr = cb.createQuery(Object[].class);
    Root````````<UserGroup>```````` root = cr.from(UserGroup.class);

    CriteriaQuery````<Object[]>```` select = cr
      .multiselect(root.get(UserGroup_.name), cb.countDistinct(root.get(UserGroup_.id)))
      .where(cb.or(
        root.get(UserGroup_.name).in("Group 1", "Group 2"),
        root.get(UserGroup_.name).in("Group 4", "Group 5")
      ))
      .orderBy(cb.desc(root.get(UserGroup_.name)))
      .groupBy(root.get(UserGroup_.name));

    TypedQuery````<Object[]>```` query = em.createQuery(select);
    List````<Object[]>```` results = query.getResultList();
    assertEquals(2, results.size());
    assertEquals("Group 2", results.get(0)[0]);
    assertEquals(1L, results.get(0)[1]);
    assertEquals("Group 1", results.get(1)[0]);
    assertEquals(1L, results.get(1)[1]);
}
```

这里所有基础方法都与前一节的 JPA Criteria 相同。
