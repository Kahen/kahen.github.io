---
date: 2024-06-21
category:
  - Spring Data JPA
  - Query Optimization
tag:
  - Query Hints
  - Performance
head:
  - - meta
    - name: keywords
      content: Spring Data JPA, Query Hints, Optimization, Performance
---
# Spring Data JPA中的查询提示

在本教程中，我们将探讨Spring Data JPA中查询提示的基础知识。这些提示有助于优化数据库查询，并通过影响优化器的决策过程来潜在地提高应用程序性能。我们还将讨论它们的功能以及如何有效地应用它们。

## 2. 理解查询提示

Spring Data JPA中的查询提示是一个强大的工具，可以帮助优化数据库查询并提高应用程序性能。与直接控制执行不同，它们影响优化器的决策过程。

在Spring Data JPA中，我们可以在`org.hibernate.annotations`包中找到这些提示，以及与Hibernate相关的各种注释和类，Hibernate是一种普遍的持久性提供者。**值得注意的是，这些提示的解释和执行通常取决于底层的持久性提供者，如Hibernate或EclipseLink，使它们成为特定于供应商的。**

## 3. 使用查询提示

Spring Data JPA提供了多种方式来利用查询提示来优化数据库查询。让我们探索常见的方法。

### 3.1. 注解基础配置

Spring Data JPA提供了一种使用注解向JPA查询添加查询提示的简便方法。**`@QueryHints`注解允许指定一个JPA `@QueryHint`提示数组，用于应用到生成的SQL查询中。**

让我们考虑以下示例，我们设置JDBC获取大小提示以限制返回结果的大小：

```java
@Repository
public interface EmployeeRepository extends JpaRepository``<Employee, Long>`` {
    @QueryHints(value = { @QueryHint(name = "org.hibernate.fetchSize", value = "50") })
    List`````<Employee>````` findByGender(String gender);
}
```

在这个例子中，我们向`EmployeeRepository`接口的`findByGender()`方法添加了`@QueryHints`注解，以一次性控制获取的实体数量。此外，我们可以在仓库级别应用`@QueryHints`注解，以影响仓库中的所有查询：

```java
@Repository
@QueryHints(value = { @QueryHint(name = "org.hibernate.fetchSize", value = "50") })
public interface EmployeeRepository extends JpaRepository``<Employee, Long>`` {
    // 仓库方法...
}
```

这个操作确保指定的查询提示适用于`EmployeeRepository`接口中的所有查询，从而促进了仓库查询的一致性。

### 3.2. 程序性配置查询提示

除了基于注解和动态方法，我们可以使用`EntityManager`对象程序性地配置查询提示。这种方法提供了对查询提示配置的细粒度控制。以下是一个程序性设置自定义SQL注释提示的示例：

```java
@PersistenceContext
private EntityManager entityManager;

@Override
List`````<Employee>````` findRecentEmployees(int limit, boolean readOnly) {
    Query query = entityManager.createQuery("SELECT e FROM Employee e ORDER BY e.joinDate DESC", Employee.class)
      .setMaxResults(limit)
      .setHint("org.hibernate.readOnly", readOnly);
    return query.getResultList();
}
```

在这个例子中，我们传递了一个布尔标志作为参数，以指示是否应该将提示设置为`true`或`false`。这种灵活性允许我们根据运行时条件适应查询行为。

### 3.3. 在实体中定义命名查询

**查询提示可以直接使用`@NamedQuery`注解在实体类中应用。**这允许我们定义一个命名查询以及特定的提示。例如，让我们考虑以下代码片段：

```java
@Entity
@NamedQuery(name = "selectEmployee", query = "SELECT e FROM Employee e",
  hints = @QueryHint(name = "org.hibernate.fetchSize", value = "50"))
public class Employee {
    // 实体属性和方法
}
```

一旦在实体类中定义，带有关联提示的命名查询`selectEmployee`可以使用`EntityManager`的`createNamedQuery()`方法调用：

```java
List`````<Employee>````` employees = em.createNamedQuery("selectEmployee").getResultList();
```

## 4. 查询提示使用场景

查询提示可以在多种场景中使用，以优化查询性能。以下是一些常见的用例。

### 4.1. 超时管理

在查询可能运行较长时间的场景中，实施有效的超时管理策略变得至关重要。**通过使用`javax.persistence.query.timeout`提示，我们可以为查询建立最大执行时间。**这种做法确保查询不会超过指定的时间阈值。

提示接受以毫秒为单位的值，如果查询超出限制，它将抛出`LockTimeoutException`。以下是一个示例，我们为检索活跃员工设置了5000毫秒的超时：

```java
@QueryHints(value = {@QueryHint(name = "javax.persistence.query.timeout", value = "5000")})
List`````<Employee>````` findActiveEmployees(long inactiveDaysThreshold);
```

### 4.2. 缓存查询结果

**查询提示可以用来启用查询结果的缓存，使用`jakarta.persistence.cache.retrieveMode`提示。**当设置为_USE_时，JPA首先尝试从缓存中检索实体，然后再去数据库。另一方面，将其设置为_BYPASS_指示JPA忽略缓存，并直接从数据库中获取实体。

**此外，我们还可以使用`jakarta.persistence.cache.storeMode`来指定JPA应该如何处理在二级缓存中存储实体。**当设置为_USE_时，JPA将实体添加到缓存中并更新现有的实体。_BYPASS_模式指示Hibernate只更新缓存中的现有实体，而不添加新的实体。最后，_REFRESH_模式在检索之前刷新缓存中的实体，确保缓存的数据是最新的。

以下是一个示例，展示了这些提示的使用：

```java
@QueryHints(value = {
    @QueryHint(name = "jakarta.persistence.cache.retrieveMode", value = "USE"),
    @QueryHint(name = "jakarta.persistence.cache.storeMode", value = "USE")
})
List`````<Employee>````` findEmployeesByName(String name);
```

在这种情况下，`retrieveMode`和`storeMode`都被配置为_USE_，表明Hibernate积极利用二级缓存来检索和存储实体。

### 4.3. 优化查询执行计划

**查询提示可以用来影响数据库优化器生成的执行计划。**例如，当数据保持不变时，我们可以使用`org.hibernate.readOnly`提示来表示查询是只读的：

```java
@QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
User findByUsername(String username);
```

`org.hibernate.comment`提示允许向查询中添加自定义SQL注释，有助于查询分析和调试。**这个特性特别有用，当我们想在生成的SQL语句中提供上下文或注释时。**

以下是一个示例：

```java
@QueryHints(value = { @QueryHint(name = "org.hibernate.comment", value = "Retrieve employee older than specified age") })
List findByAgeGreaterThan(int age);
```

## 5. 结论

在本文中，我们了解了Spring Data JPA中查询提示的重要性以及它们对优化数据库查询以提高应用程序性能的显著影响。我们探索了包括基于注解的配置和直接JPQL操作在内的各种技术，以有效应用查询提示。

如常，示例的源代码可在GitHub上找到。