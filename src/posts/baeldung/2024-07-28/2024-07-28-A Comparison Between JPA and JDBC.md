---
date: 2022-04-01
category:
  - Java Persistence API
  - Java Database Connectivity
tag:
  - JPA
  - JDBC
head:
  - - meta
    - name: keywords
      content: JPA, JDBC, ORM, 数据库, Java
---

# JPA与JDBC的比较

在本教程中，我们将探讨Java数据库连接（JDBC）API和Java持久化API（JPA）之间的差异。

## 2. JDBC是什么
JDBC是Java应用程序与数据库通信的编程级接口。应用程序使用此API与JDBC管理器通信。这是我们的应用程序代码用来与数据库通信的通用API。在API之外，是供应商提供的符合JDBC标准的数据库驱动程序。

## 3. JPA是什么
JPA是允许我们将Java对象绑定到关系数据库记录的Java标准。**它是对象关系映射（ORM）的一种可能方法**，允许开发人员使用Java对象在关系数据库中检索、存储、更新和删除数据。JPA规范有几种实现可用。

## 4. JPA与JDBC
**在决定如何与后端数据库系统通信时，软件架构师面临重大的技术挑战**。JPA和JDBC之间的辩论通常是决定因素，因为这两种数据库技术在处理持久数据方面采取了非常不同的方法。让我们分析它们之间的主要区别。

### 4.1. 数据库交互
JDBC允许我们编写SQL命令从关系数据库中读取数据并更新数据。**与JDBC不同，JPA允许开发人员使用面向对象的语义构建数据库驱动的Java程序**。JPA注解描述了给定的Java类及其变量如何映射到数据库中的给定表及其列。

让我们看看如何将_Employee_类映射到_employee_数据库表：

```java
@Entity
@Table(name = "employee")
public class Employee implements Serializable {
    @Column(name = "employee_name")
    private String employeeName;
}
```

然后JPA框架处理所有耗时且容易出错的编码工作，以在面向对象的Java代码和后端数据库之间进行转换。

### 4.2. 管理关联
在JDBC中，当我们需要在查询中将数据库表与关联时，我们需要编写完整的SQL查询，而**使用JPA时，我们只需使用注解来创建一对一、一对多、多对一和多对多的关联**。

假设我们的_employee_表与_communication_表有一对多的关系：

```java
@Entity
@Table(name = "employee")
public class Employee implements Serializable {

    @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER)
    @OrderBy("firstName asc")
    private Set communications;
}
```

这个关系的拥有者是_Communication_，所以我们在_Employee_中使用_mappedBy_属性使其成为双向关系。

### 4.3. 数据库依赖性
JDBC是数据库依赖的，这意味着必须为不同的数据库编写不同的脚本。另一方面，**JPA是不依赖于数据库的，意味着相同的代码可以在多种数据库中使用，几乎不需要（或不需要）修改**。

### 4.4. 异常处理
因为JDBC抛出受检异常，如_SQLException_，我们必须在_try-catch_块中编写它。**另一方面，JPA框架只使用未受检异常，如Hibernate**。因此，我们不需要在每个使用它们的地方捕获或声明它们。

### 4.5. 性能
JPA和JDBC之间的差异本质上是谁在编写代码：JPA框架或本地开发人员。无论如何，我们都得处理对象关系阻抗不匹配问题。

公平地说，当我们不正确编写SQL查询时，JDBC的性能可能会非常缓慢。在决定这两种技术时，性能不应该是争议点。专业开发人员完全有能力生产出无论使用哪种技术都能同样运行良好的Java应用程序。

### 4.6. JDBC依赖性
基于JPA的应用程序在底层仍然使用JDBC。因此，当我们使用JPA时，我们的代码实际上正在使用JDBC API进行所有数据库交互。换句话说，**JPA作为抽象层，隐藏了开发人员的低级JDBC调用，使数据库编程大大简化**。

### 4.7. 事务管理
在JDBC中，事务管理是通过使用提交和回滚显式处理的。另一方面，**JPA中隐式提供了事务管理**。

## 5. 优点和缺点
**JDBC相对于JPA的最明显好处是它更容易理解**。另一方面，如果开发人员不理解JPA框架或数据库设计的内部工作，他们将无法编写出好的代码。

此外，许多开发人员认为JPA更适合更复杂的应用程序。但是，如果应用程序将使用一个简单的数据库，我们不计划将其迁移到不同的数据库供应商，JDBC被认为是更好的选择。

对于开发人员来说，JPA相对于JDBC的主要优势是他们可以使用面向对象的原则和最佳实践来编写Java应用程序，而不必担心数据库语义。因此，**开发可以更快地完成，特别是当软件开发人员缺乏对SQL和关系数据库的扎实理解时**。

另外，因为一个经过充分测试和健壮的框架正在处理数据库和Java应用程序之间的交互，所以当我们使用JPA时，我们应该会看到数据库映射层的错误减少。

## 6. 结论
在这个快速教程中，我们探讨了JPA和JDBC之间的主要区别。

虽然JPA带来了许多优势，但如果JPA不适合我们当前的应用程序要求，我们还有许多其他高质量的替代方案可供使用。