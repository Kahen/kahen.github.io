---
date: 2024-06-20
category:
  - Hibernate
  - Java
tag:
  - Struct Annotation
  - User-Defined Types
head:
  - - meta
    - name: keywords
      content: Hibernate, Struct, Annotation, User-Defined Types, SQL, JSON, Database, ORM
---
# Hibernate中的@Struct注解类型 - 结构化用户定义类型 | Baeldung

在本教程中，我们将回顾Hibernate的@Struct注解，它允许开发者创建结构化用户定义类型。

结构化用户定义类型，也称为结构化类型，是在SQL:1999标准中引入的，是对象关系（ORM）数据库的一个特性。

结构化或复合类型有其用例，特别是自SQL:2016标准引入JSON支持以来。这些结构化类型的值可以访问它们的子部分，并且不像表中的行那样具有标识符或主键。

### 结构映射
**Hibernate允许你通过@Struct注解类型为带有@Embeddable注解或@Embedded属性的类指定结构化类型。**

#### 2.1. 使用@Struct映射结构化类型
考虑下面的例子，一个_Department_类，它有一个带有@Embedded的_Manager_类（一个结构化类型）：

```java
@Entity
public class Department {
    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String departmentName;

    @Embedded
    private Manager manager;
}
```

使用@Struct注解定义的_Manager_类如下：

```java
@Embeddable
@Struct(name = "Department_Manager_Type", attributes = {"firstName", "lastName", "qualification"})
public class Manager {
    private String firstName;

    private String lastName;

    private String qualification;
}
```

#### 2.2. @Embeddable和@Struct注解之间的区别
带有@Struct注解的类将类映射到数据库中的结构化用户定义类型。例如，如果没有@Struct注解，尽管@Embedded的_Manager_对象是一个单独的类型，它将成为_DEPARTMENT_表的一部分，如下所示的DDL：

```sql
CREATE TABLE DEPARTMENT (
  Id BIGINT,
  DepartmentName VARCHAR,
  FirstName VARCHAR,
  LastName VARCHAR,
  Qualification VARCHAR
);
```

带有@Struct注解的_Manager_类将产生一个类似于以下的用户定义类型：

```sql
create type Department_Manager_Type as (
    firstName VARCHAR,
    lastName VARCHAR,
    qualification VARCHAR
)
```

加上@Struct注解后，_DEPARTMENT_对象如下所示的DDL：

```sql
CREATE TABLE DEPARTMENT (
Id BIGINT,
DepartmentName VARCHAR,
Manager Department_Manager_Type
);
```

#### 2.3. @Struct注解和属性的顺序
由于结构化类型具有多个属性，属性的顺序对于将数据映射到正确的属性非常重要。定义属性顺序的一种方式是通过@Struct注解的“attributes”字段。

在上面的_Manager_类中，你可以看到@Struct注解的“attributes”字段，它指定Hibernate在序列化和反序列化_Manager_属性时期望的顺序是“firstName”，“lastName”和最后的“qualification”。

**定义属性顺序的第二种方式是使用Java记录来隐式地通过规范构造函数指定顺序，例如：**

```java
@Embeddable
@Struct(name = "Department_Manager")
public record Manager(String lastName, String firstName, String qualification) {}
```

上述的_Manager_记录属性将具有以下顺序：“lastName”，“firstName”和“qualification”。

### JSON映射
由于JSON是预定义的非结构化类型，因此无需定义类型名称或属性顺序。通过使用@JdbcTypeCode(SqlTypes.JSON)注解嵌入式字段/属性，可以将@Embeddable作为JSON映射。

例如，下面的类持有一个_Manager_对象，它也是一个JSON非结构化类型：

```java
@Entity
public class Department_JsonHolder {
    @Id
    @GeneratedValue
    private int id;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "department_manager_json")
    private Manager manager;
}
```

上述类的预期DDL代码如下：

```sql
create table Department_JsonHolder as (
    id int not null primary key,
    department_manager_json json
)
```

以下是从_department_manager_json_列选择属性的示例HQL查询：

```sql
select djh.manager.firstName, djh.manager.lastName, djh.manager.qualifications
from department_jsonholder djh
```

### 结论
@Embeddable和@Embeddable @Struct之间的区别在于后者实际上是底层数据库中的**用户定义类型**。尽管许多数据库支持用户定义类型，但支持@Struct注解的hibernate方言包括：

- Oracle
- DB2
- PostgreSQL

在本文中，我们讨论了Hibernate的@Struct注解，如何使用它，以及何时将其添加到域类中。

文章的源代码可在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。