---
date: 2024-07-29
category:
  - JPA
  - Hibernate
tag:
  - Unique Constraints
  - Database
head:
  - - meta
    - name: keywords
      content: JPA, Hibernate, Unique Constraints, Database
------
# 定义JPA中的唯一约束

在本教程中，我们将讨论如何使用JPA和Hibernate定义唯一约束。

首先，我们将探讨唯一约束及其与主键约束的区别。

然后，我们将看看JPA的重要注解，@Column(unique=true)和@UniqueConstraint。我们将实现它们以在单个列和多个列上定义唯一约束。

最后，我们将学习如何在引用表列上定义唯一约束。

让我们从快速回顾开始。唯一键是表的单个或多个列的集合，它们在数据库表中唯一标识一条记录。

**唯一和主键约束都为列或列集提供了唯一性的保证。**

### 2.1. 它与主键约束有何不同？
唯一约束确保列或列组合中的数据对于每一行都是唯一的。例如，表的主键自动充当隐式的唯一约束。因此，**主键约束自动具有唯一约束。**
此外，每个表只能有一个主键约束。然而，每个表可以有多个唯一约束。

**简而言之，唯一约束适用于除主键映射所隐含的任何约束之外。**
我们定义的唯一约束在表创建期间用于生成适当的数据库约束，并且可能还在运行时用于排序插入、更新或删除语句。

### **2.2. 单列和多列约束是什么？**
唯一约束可以是列约束或表约束。在表级别，我们可以在多个列上定义唯一约束。

**JPA允许我们使用@Column(unique=true)和@UniqueConstraint在我们的代码中定义唯一约束。** 这些注解被模式生成过程解释，自动创建约束。

首先，我们应该强调**列级约束适用于单个列，表级约束适用于整个表。**

我们将在接下来的部分中更详细地讨论这一点。

## 3. 设置实体

**在JPA中，实体表示存储在数据库中的表。实体的每个实例代表表中的一行。**

让我们从创建一个领域实体并将其映射到数据库表开始。为此示例，我们将创建一个_Person_实体：

```java
@Entity
@Table
public class Person implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String password;
    private String email;
    private Long personNumber;
    private Boolean isActive;
    private String securityNumber;
    private String departmentCode;
    @JoinColumn(name = "addressId", referencedColumnName = "id")
    private Address address;
   //getters and setters
}
```

一个_address_字段是从_Address_实体引用的字段：

```java
@Entity
@Table
public class Address implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private String streetAddress;
    //getters and setters
}
```

在本教程中，我们将使用这个_Person_实体来演示我们的例子。

## 4. 列约束

当我们的模型准备好后，我们可以实施我们的第一个唯一约束。

让我们考虑我们的_Person_实体，它包含个人信息。我们有一个_id_列的主键。这个实体还包含_PersonNumber_，它不包含任何重复值。此外，我们不能定义主键，因为我们的表已经有它了。

在这种情况下，我们可以使用列唯一约束来确保在_PersonNumber_字段中不会输入重复值。JPA允许我们使用具有_unique_属性的_Column_注解来实现这一点。

在接下来的部分中，我们将看看_Column_注解的定义，然后学习如何实现它。

### 4.1. _@Column(unique=true)_

注解类型_Column_用于指定持久属性或字段的映射列。

让我们看看定义：

```java
@Target(value={METHOD,FIELD})
@Retention(value=RUNTIME)
public @interface Column {
    boolean unique;
   //other elements
}
```

**_unique_属性指定列是否是唯一键。这是_UniqueConstraint_注解的快捷方式，并且当唯一键约束仅对应单个列时非常有用。**

我们将在下一部分中看到如何定义它。

### 4.2. 定义列约束

**每当唯一约束仅基于一个字段时，我们可以使用_Column(unique=true)_在该列上。**

让我们在_personNumber_字段上定义一个唯一约束：

```java
@Column(unique=true)
private Long personNumber;
```

当我们执行模式创建过程时，我们可以从日志中验证它：

```java
[main] DEBUG org.hibernate.SQL -
    alter table Person add constraint UK_d44q5lfa9xx370jv2k7tsgsqt unique (personNumber)
```

同样，如果我们希望限制一个_Person_使用唯一的电子邮件注册，我们可以在_email_字段上添加一个唯一约束：

```java
@Column(unique=true)
private String email;
```

让我们执行模式创建过程并检查约束：

```java
[main] DEBUG org.hibernate.SQL -
    alter table Person add constraint UK_585qcyc8qh7bg1fwgm1pj4fus unique (email)
```

尽管这在我们需要在单个列上放置唯一约束时很有用，但有时我们可能希望在复合键上添加唯一约束，复合键是列的组合。要定义复合唯一键，我们可以使用表约束。我们将在下一部分讨论。

## 5. 表约束

复合唯一键是由列组合组成的唯一键。**要定义复合唯一键，我们可以在表上而不是列上添加约束。JPA通过_@UniqueConstraint_注解帮助我们实现这一点。**

### 5.1. _@UniqueConstraint_注解

注解类型_UniqueConstraint_指定要在生成的DDL（数据定义语言）中包含唯一约束。

让我们看看定义：

```java
@Target(value={})
@Retention(value=RUNTIME)
public @interface UniqueConstraint {
    String name() default "";
    String[] columnNames();
}
```

正如我们所看到的，**_name_和_columnNames_分别是类型_String_和_String[]_的注解元素，这些元素可以为_UniqueConstraint_注解指定。**

我们将在下一部分中通过示例更详细地查看每个参数。

### 5.2. 定义唯一约束

让我们考虑我们的_Person_实体。一个_Person_不应该有任何重复的记录对于活动状态。换句话说，由_personNumber_和_isActive_组成的键不会有重复的值。在这里，我们需要添加跨越多个列的唯一约束。

JPA通过_@UniqueConstraint_注解帮助我们实现这一点。我们在_@Table_注解下的_uniqueConstraints_属性中使用它。让我们记住要指定列的名称：

```java
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "personNumber", "isActive" }) })
```

我们可以在生成模式后验证它：

```java
[main] DEBUG org.hibernate.SQL -
    alter table Person add constraint UK5e0bv5arhh7jjhsls27bmqp4a unique (personNumber, isActive)
```

**这里需要注意的一点是，如果我们不指定名称，它是一个提供程序生成的值。** **自JPA 2.0以来，我们可以为我们的唯一约束提供名称：**

```java
@Table(uniqueConstraints = { @UniqueConstraint(name = "UniqueNumberAndStatus", columnNames = { "personNumber", "isActive" }) })
```

我们可以验证相同的：

```java
[main] DEBUG org.hibernate.SQL -
    alter table Person add constraint UniqueNumberAndStatus unique (personNumber, isActive)
```

在这里，我们对一组列添加了唯一约束。我们也可以添加多个唯一约束，这意味着对多组列添加唯一约束。我们将在下一部分中做到这一点。

### 5.3. 单个实体上的多个唯一约束

**一个表可以有多个唯一约束。** 在上一节中，我们定义了_personNumber_和_isActive_状态的复合键的唯一约束。在这节中，我们将在_securityNumber_和_departmentCode_的组合上添加约束。

让我们收集我们的唯一索引并一次性指定它们。我们通过在大括号中重复_@UniqueConstraint_注解并用逗号分隔来做到这一点：

```java
@Table(uniqueConstraints = {
   @UniqueConstraint(name = "UniqueNumberAndStatus", columnNames = {"personNumber", "isActive"}),
   @UniqueConstraint(name = "UniqueSecurityAndDepartment", columnNames = {"securityNumber", "departmentCode"})})
```

现在让我们看看日志，并检查约束：

```java
[main] DEBUG org.hibernate.SQL -
    alter table Person add constraint UniqueNumberAndStatus unique (personNumber, isActive)
[main] DEBUG org.hibernate.SQL -
   alter table Person add constraint UniqueSecurityAndDepartment unique (securityNumber, departmentCode)
```

到目前为止，我们定义了同一实体上的字段的唯一约束。然而，在某些情况下，我们可能有来自其他实体的引用字段，并且需要确保这些字段的唯一性。我们将在下一节中讨论。

## 6. 引用表列上的唯一约束

当我们创建两个或更多相互关联的表时，它们通常通过一个表中的列引用另一个表的主键来关联。该列称为“外键”。例如，_Person_和_Address_实体通过_addressId_字段连接。因此，_addressId_充当引用表列。

我们可以在引用列上定义唯一约束。我们首先在单列上实现它，然后在多列上实现。

### 6.1. 单列约束

在我们的_Person_实体中，我们有一个_address_字段，它引用了_Address_实体。一个人应该有一个唯一的地址。

所以让我们在_Person_的_address_字段上定义一个唯一约束：

```java
@Column(unique = true)
private Address address;
```

现在让我们快速检查这个约束：

```java
[main] DEBUG org.hibernate.SQL -
   alter table Person add constraint UK_7xo3hsusabfaw1373oox9uqoe unique (address)
```

我们还可以在引用表列上定义多列约束，正如我们将在下一节中看到的。

### 6.2. 多列约束

我们可以指定列组合上的唯一约束。正如前面提到的，我们可以使用表约束来做到这一点。

让我们在_personNumber_和_address_上定义唯一约束，并将其添加到_uniqueConstraints_数组中：

```java
@Entity
@Table(uniqueConstraints = {
  //other constraints
  @UniqueConstraint(name = "UniqueNumberAndAddress", columnNames = { "personNumber", "address" })})
```

最后，让我们看看唯一约束：

```java
[main] DEBUG org.hibernate.SQL -
    alter table Person add constraint UniqueNumberAndAddress unique (personNumber, address)
```

## 7. 结论

唯一约束防止两记录在列或列集中具有相同的值。

在本文中，我们学习了如何在JPA中定义唯一约束。首先，我们对唯一约束进行了简要回顾。然后我们讨论了@Column(unique=true)和@UniqueConstraint注解，分别用于在单个列和多个列上定义唯一约束。

如常，本文的示例可以在GitHub上找到。

OK