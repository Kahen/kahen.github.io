---
date: 2024-06-20
category:
  - Hibernate
  - JPA
tag:
  - Subselect
  - Entity
  - SQL
head:
  - - meta
    - name: keywords
      content: Hibernate, JPA, Subselect, Entity, SQL
---
# Hibernate中的@Subselect注解

在本教程中，我们将回顾Hibernate中的@Subselect注解，如何使用它以及它的好处。我们还将看到Hibernate对使用@Subselect注解的实体的限制及其后果。

## @Subselect注解概述

@Subselect允许我们将一个不可变的实体映射到SQL查询上。让我们从实体到SQL查询映射的含义开始解释。

### 2.1. 映射到SQL查询
通常，我们在Hibernate中创建实体时，会使用@Entity注解。这个注解表明这是一个实体，应该由持久化上下文管理。我们也可以提供@Table注解，以指示Hibernate应该将这个实体映射到哪个具体的表。默认情况下，每当我们在Hibernate中创建一个实体时，它都假定实体直接映射到一个特定的表。在大多数情况下，这正是我们想要的，但并不总是这样。

有时，我们的实体并不是直接映射到数据库中的某个特定表，而是SQL查询执行的结果。例如，我们可能有一个Client实体，其中每个实例都是SQL查询（或视图）执行结果集ResultSet中的一行：

```
SELECT
  u.id        as id,
  u.firstname as name,
  u.lastname  as lastname,
  r.name      as role
FROM users AS u
INNER JOIN roles AS r
ON r.id = u.role_id
WHERE u.type = 'CLIENT'
```

重要的是，数据库中可能根本没有专用的clients表。这就是将实体映射到SQL查询的含义——我们从一个子查询SQL查询中获取实体，而不是从表中获取。这个查询可以从任何表中选择并执行任何逻辑——Hibernate不关心。

### 2.2. 不可变性
因此，我们可能有一个没有映射到特定表的实体。作为直接后果，不清楚如何执行任何INSERT/UPDATE语句。简单地说，没有clients表（如上例所示），我们可以插入记录。

确实，Hibernate对我们执行的SQL一无所知。因此，Hibernate无法对这样的实体执行任何写操作——它变成了只读的。这里的棘手之处在于，我们仍然可以要求Hibernate插入这个实体，但它会失败，因为在ANSI SQL中至少不可能向子查询发出INSERT。

## 使用示例
现在，一旦我们理解了@Subselect注解的作用，让我们尝试实际使用它。这里，我们有一个简单的RuntimeConfiguration：

```java
@Data
@Entity
@Immutable
@Subselect(value = """
    SELECT
      ss.id,
      ss.key,
      ss.value,
      ss.created_at
    FROM system_settings AS ss
    INNER JOIN (
      SELECT
        ss2.key as k2,
        MAX(ss2.created_at) as ca2
      FROM system_settings ss2
      GROUP BY ss2.key
    ) AS t ON t.k2 = ss.key AND t.ca2 = ss.created_at
    WHERE ss.type = 'SYSTEM' AND ss.active IS TRUE
""")
public class RuntimeConfiguration {
    @Id
    private Long id;

    @Column(name = "key")
    private String key;

    @Column(name = "value")
    private String value;

    @Column(name = "created_at")
    private Instant createdAt;
}

```
这个实体代表我们应用程序的运行时参数。但是，为了返回属于我们应用程序的最新参数集合，我们需要在system_settings表上执行特定的SQL查询。正如我们所看到的，@Subselect注解的正文包含了那个SQL语句。现在，因为每个RuntimeConfiguration条目本质上是一个键值对，我们可能想要实现一个简单的查询——获取具有特定键的最新活动RuntimeConfiguration记录。

请注意，我们还用@Immutable标记了我们的实体。因此，Hibernate将禁用对我们实体的任何脏检查跟踪，以避免意外的UPDATE语句。

所以，如果我们想用特定的键获取RuntimeConfiguration，我们可以这样做：

```java
@Test
void givenEntityMarkedWithSubselect_whenSelectingRuntimeConfigByKey_thenSelectedSuccessfully() {
    String key = "config.enabled";
    CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

    CriteriaQuery`<RuntimeConfiguration>` query = criteriaBuilder.createQuery(RuntimeConfiguration.class);

    var root = query.from(RuntimeConfiguration.class);

    RuntimeConfiguration configurationParameter = entityManager
      .createQuery(query.select(root).where(criteriaBuilder.equal(root.get("key"), key))).getSingleResult();

    Assertions.assertThat(configurationParameter.getValue()).isEqualTo("true");
}
```

在这里，我们使用Hibernate Criteria API按键查询RuntimeConfiguration。现在，让我们检查Hibernate实际产生的查询，以满足我们的请求：

```sql
select
    rc1_0.id,
    rc1_0.created_at,
    rc1_0.key,
    rc1_0.value
from
    ( SELECT
        ss.id,
        ss.key,
        ss.value,
        ss.created_at
    FROM
        system_settings AS ss
    INNER JOIN
        (   SELECT
            ss2.key as k2,     MAX(ss2.created_at) as ca2
        FROM
            system_settings ss2
        GROUP BY
            ss2.key ) AS t
            ON t.k2 = ss.key
            AND t.ca2 = ss.created_at
    WHERE
        ss.type = 'SYSTEM'
        AND ss.active IS TRUE  ) rc1_0
where
    rc1_0.key=?
```

正如我们所看到的，Hibernate只是从@Subselect中提供的SQL语句中选择记录。现在，我们提供的每个过滤器都将应用于结果子选择记录集。

## 替代方案
有经验的Hibernate开发者可能会注意到，已经有几种方法可以实现类似的结果。其中之一是使用投影映射到DTO，另一个是视图映射。这两种方法都有它们的优缺点。让我们一一讨论。

### 4.1. 投影映射
让我们谈谈DTO投影。**它允许将SQL查询映射到DTO投影中，这不是一个实体**。与实体相比，DTO投影的处理速度也被认为是更快的。DTO投影也是不可变的，这意味着Hibernate不管理这样的实体，也不对它们应用任何脏检查。

尽管上述所有都是真的，但DTO投影本身也有限制。**最重要的一个是DTO投影不支持关联**。这是相当明显的，因为我们处理的是DTO投影，它不是一个被管理的实体。这使得DTO投影在Hibernate中很快，但也意味着持久化上下文不管理这些DTO。因此，我们不能在DTO上有任何OneToX或ManyToX字段。

然而，如果我们将实体映射到SQL语句，我们仍然在映射一个实体。它可能有管理的关联。所以，这个限制不适用于实体到查询的映射。

另一个重要且概念上的区别是@Subselect允许我们将实体表示为SQL查询。Hibernate将做注解名称所建议的事情。它只会使用我们提供的SQL查询来选择（所以我们的查询变成了子选择），然后应用额外的过滤器。假设我们需要获取实体X，我们需要执行一些过滤、分组等。然后，如果我们使用DTO投影，我们将不得不在每个JPQL或本地查询中始终编写过滤器、分组等。当使用@Subselect时，我们可以一次性指定这个查询并从中选择。

### 4.2. 视图映射
虽然这不是众所周知的，但Hibernate可以开箱即用地将我们的实体映射到SQL视图。这在实体到SQL查询映射方面非常相似。视图本身在数据库中几乎总是只读的。在不同的RDBMS中有一些例外，比如PostgreSQL中的简单视图，但这完全是供应商特定的。这意味着我们的实体也是不可变的，我们只会从底层视图中读取，我们不会更新/插入任何数据。

总的来说，@Subselect和实体到视图映射之间的区别非常小。前者使用我们在注解中提供的确切SQL语句，而后者使用现有的视图。两种方法都支持管理关联，所以选择这些选项之一完全取决于我们的要求。

## 结论
在本文中，我们讨论了如何使用@Subselect从子选择查询而不是特定表中选择实体。如果我们不想在获取实体时重复相同的SQL语句部分，这非常方便。但这意味着使用@Subselect的实体实际上是不可变的，我们不应该尝试从应用程序代码中持久化它们。有一些@Subselect的替代方案，例如Hibernate中的实体到视图映射，甚至是DTO投影的使用。它们都有各自的优缺点，因此为了做出选择，我们需要像往常一样，遵守要求和常识。

如往常一样，源代码可在GitHub上获得。