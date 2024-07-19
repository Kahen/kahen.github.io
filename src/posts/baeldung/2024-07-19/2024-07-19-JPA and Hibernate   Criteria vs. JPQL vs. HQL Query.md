---
date: 2022-04-01
category:
  - JPA
  - Hibernate
tag:
  - Criteria Query
  - JPQL
  - HQL
head:
  - - meta
    - name: keywords
      content: JPA, Hibernate, Criteria API, JPQL, HQL, Query
---
# JPA和Hibernate - Criteria查询与JPQL和HQL查询的比较

在本教程中，我们将了解如何使用JPA和Hibernate查询，以及Criteria、JPQL和HQL查询之间的区别。Criteria查询允许用户在不使用原始SQL的情况下编写查询。除了Criteria查询，我们还将探讨编写Hibernate命名查询以及如何在Spring Data JPA中使用_Query_注解。

在我们深入之前，应该指出Hibernate Criteria API自Hibernate 5.2以来已被弃用。因此，**我们将在示例中使用JPA Criteria API**，因为它是编写Criteria查询的新的和首选工具。从这里开始，我们将简单地将其称为Criteria API。

### 2. Criteria查询

Criteria API通过在其上应用不同的过滤器和逻辑条件来帮助构建Criteria查询对象。这是操纵对象并从RDBMS表中返回所需数据的替代方法。

Hibernate _Session_ 的 _createCriteria()_ 方法返回应用程序中运行Criteria查询的持久性对象实例。简单来说，Criteria API构建了一个应用不同过滤器和逻辑条件的Criteria查询。

### 2.1. Maven依赖

让我们获取Hibernate的参考JPA依赖项的最新版本——它在Hibernate中实现了JPA——并将其添加到我们的_pom.xml_中：

```xml
`<dependency>`
    `<groupId>`org.hibernate.orm`</groupId>`
    `<artifactId>`hibernate-core`</artifactId>`
    `<version>`6.4.2.Final`</version>`
`</dependency>`
```

### 2.2. 使用Criteria查询和表达式

根据用户的条件，**_CriteriaBuilder_ 控制查询结果**。它使用 _CriteriaQuery_ 的 _where()_ 方法，该方法提供 _CriteriaBuilder_ 表达式。

让我们看看我们将在本文中使用的实体：

```java
public class Employee {
    private Integer id;
    private String name;
    private Long salary;

   // 标准的getter和setter
}
```

让我们看看一个简单的Criteria查询，它将从数据库中检索所有“Employee”的行：

```java
Session session = HibernateUtil.getHibernateSession();
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery`````<Employee>````` cr = cb.createQuery(Employee.class);
Root`````<Employee>````` root = cr.from(Employee.class);
cr.select(root);

Query`````<Employee>````` query = session.createQuery(cr);
List`````<Employee>````` results = query.getResultList();
session.close();
return results;
```

上述Criteria查询返回了所有条目的集合。让我们看看它是如何工作的：

1. _SessionFactory_ 对象创建 _Session_ 实例
2. _Session_ 使用 _getCriteriaBuilder()_ 方法返回 _CriteriaBuilder_ 的实例
3. _CriteriaBuilder_ 使用 _createQuery()_ 方法。这创建了 _CriteriaQuery()_ 对象，进一步返回查询实例
4. 最后，我们调用 _getResult()_ 方法以获得包含结果的查询对象

让我们看看 _CriteriaQuery_ 的另一个表达式：

```java
cr.select(root).where(cb.gt(root.get("salary"), 50000));
```

上述查询的结果是返回薪水超过50000的员工集合。

JPQL代表Java持久化查询语言。Spring Data提供了多种创建和执行查询的方法，JPQL是其中之一。它使用Spring中的_Query_注解来定义JPQL和原生SQL查询。**查询定义默认使用JPQL。**

我们使用 _@Query_ 注解在Spring中定义SQL查询。**任何由 _@Query_ 注解定义的查询都比用 _@NamedQuery_ 注解的命名查询具有更高的优先级。**

### 3.1. 使用JPQL查询

让我们使用JPQL构建一个动态查询：

```java
@Query(value = "SELECT e FROM Employee e")
List`````<Employee>````` findAllEmployees(Sort sort);
```

使用带有参数的JPQL查询，Spring Data按照方法声明的顺序将方法参数传递给查询。让我们看几个将方法参数传递到查询中的例子：

```java
@Query("SELECT e FROM Employee e WHERE e.salary = ?1")
Employee findAllEmployeesWithSalary(Long salary);
```

```java
@Query("SELECT e FROM Employee e WHERE e.name = ?1 and e.salary = ?2")
Employee findEmployeeByNameAndSalary(String name, Long salary);
```

在上面的查询中，_name_ 方法参数作为查询参数传递，对应于索引1，而 _salary_ 参数作为索引2的查询参数传递。

### 3.2. 使用JPQL原生查询

我们可以直接在数据库中执行这些SQL查询，使用原生查询，这些查询指的是实际的数据库和表对象。我们需要**将 _nativeQuery_ 属性的值设置为 _true_ 来定义一个原生SQL查询**。**原生SQL查询将在注解的 _value_ 属性中定义。**

让我们看一个显示索引参数作为查询参数传递的原生查询：

```java
@Query(
  value = "SELECT * FROM Employee e WHERE e.salary = ?1",
  nativeQuery = true)
Employee findEmployeeBySalaryNative(Long salary);
```

**使用命名参数使查询更易于阅读，在重构时也更不容易出错。**让我们看一个简单的JPQL和原生格式的命名查询示例：

```java
@Query("SELECT e FROM Employee e WHERE e.name = :name and e.salary = :salary")
Employee findEmployeeByNameAndSalaryNamedParameters(
  @Param("name") String name,
  @Param("salary") Long salary);
```

方法参数使用命名参数传递给查询。我们可以使用 @Param 注解在存储库方法声明中定义命名查询。结果，**@Param 注解必须具有与相应的JPQL或SQL查询名称相匹配的字符串值。**

```java
@Query(value = "SELECT * FROM Employee e WHERE e.name = :name and e.salary = :salary",
  nativeQuery = true)
Employee findUserByNameAndSalaryNamedParamsNative(
  @Param("name") String name,
  @Param("salary") Long salary);
```

## 4. HQL

HQL代表Hibernate查询语言。它**是一种类似于SQL的面向对象语言**，我们可以用它来查询数据库。然而，主要的缺点是代码的可读性差。我们可以将我们的查询定义为命名查询，并将它们放在实际访问数据库的代码中。

### 4.1. 使用Hibernate命名查询

命名查询定义了一个具有预定义、不可更改的查询字符串的查询。这些查询是快速失败的，因为它们在会话工厂创建期间进行了验证。让我们使用 _org.hibernate.annotations.NamedQuery_ 注解定义一个命名查询：

```java
@NamedQuery(name = "Employee_FindByEmployeeId",
 query = "from Employee where id = :id")
```

每个 _@NamedQuery_ 注解只附加到一个实体类。我们可以使用 _@NamedQueries_ 注解为一个实体组合多个命名查询：

```java
@NamedQueries({
    @NamedQuery(name = "Employee_findByEmployeeId",
      query = "from Employee where id = :id"),
    @NamedQuery(name = "Employee_findAllByEmployeeSalary",
      query = "from Employee where salary = :salary")
})
```

### 4.2. 存储过程和表达式

总之，我们可以使用 _@NamedNativeQuery_ 注解来存储过程和函数：

```java
@NamedNativeQuery(
  name = "Employee_FindByEmployeeId",
  query = "select * from employee emp where id=:id",
  resultClass = Employee.class)
```

## 5. Criteria查询相对于HQL和JPQL查询的优势

**Criteria查询相对于HQL的主要优势是整洁、清晰的面向对象API**。因此，我们可以在编译时检测到Criteria API中的错误。

此外，JPQL查询和Criteria查询具有相同的性能和效率。

**Criteria查询比HQL和JPQL更灵活，并且为编写动态查询提供了更好的支持。**

但是HQL和JPQL提供了Criteria查询不可能的原生查询支持。这是Criteria查询的一个缺点。

我们可以很容易地使用JPQL原生查询编写复杂的连接，**而使用Criteria API应用相同的连接则变得难以管理。**

## 6. 结论

在本文中，我们主要查看了Hibernate和JPA中Criteria查询、JPQL查询和HQL查询的基础知识。此外，我们学习了如何使用这些查询以及每种方法的优势和劣势。

像往常一样，本文中使用的所有代码示例可以在GitHub上找到，也可以在这里找到。