---
date: 2022-04-01
category:
  - Java
tag:
  - POJO
  - JavaBeans
  - DTO
  - VO
head:
  - - meta
    - name: keywords
      content: POJO, JavaBeans, DTO, VO, Java
------
# POJO、JavaBeans、DTO 和 VO 之间的区别

在本教程中，我们将学习数据传输对象（DTO）、值对象（VO）、普通旧Java对象（POJO）和JavaBeans是什么。我们将探讨它们之间的区别，并了解何时使用每种类型。

## 1. 概述

## 2. 普通旧Java对象

**POJO，也就是普通旧Java对象，是一个没有引用任何特定框架的普通Java对象。** 这个术语用来指代一个简单、轻量级的Java对象。

POJO不使用属性和方法的任何命名约定。

让我们定义一个基本的_EmployeePOJO_对象，它有三个属性：

```java
public class EmployeePOJO {
    private String firstName;
    private String lastName;
    private LocalDate startDate;

    public EmployeePOJO(String firstName, String lastName, LocalDate startDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.startDate = startDate;
    }

    public String name() {
        return this.firstName + " " + this.lastName;
    }

    public LocalDate getStart() {
        return this.startDate;
    }
}
```

如我们所见，上述Java对象定义了表示员工的结构，并且不依赖于任何框架。

### 3.1 什么是JavaBean？

**JavaBean在很大程度上类似于POJO，但有一些严格的规则来实现它。**

规则规定它应该是可序列化的，有一个空构造函数，并且使用遵循_getX()_和_setX()_约定的方法来访问变量。

### 3.2 POJO作为JavaBean

由于JavaBean本质上是POJO，让我们通过实现必要的bean规则将_EmployeePOJO_转换为JavaBean：

```java
public class EmployeeBean implements Serializable {

    private static final long serialVersionUID = -3760445487636086034L;
    private String firstName;
    private String lastName;
    private LocalDate startDate;

    public EmployeeBean() {
    }

    public EmployeeBean(String firstName, String lastName, LocalDate startDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.startDate = startDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // 额外的getter和setter
}
```

在这里，为了将POJO转换为JavaBean，我们实现了_Serializable_接口，将属性标记为_private_，并使用getter/setter方法来访问属性。

## 4. DTO

### 4.1 DTO模式

**DTO，也称为数据传输对象，封装值以在进程或网络之间传输数据。**

这有助于减少调用的方法数量。通过在单个调用中包含多个参数或值，我们减少了远程操作中的网络开销。

这种模式的另一个优点是封装了序列化的逻辑。它允许程序以特定格式存储和传输数据。

**DTO没有明确的行为。它基本上通过解耦领域模型和表示层来帮助使代码松耦合。**

### 4.2 如何使用DTO？

DTO具有平坦的结构，没有业务逻辑。它们使用与POJO相同的格式。DTO只包含存储、访问器以及与序列化或解析相关的方法是标准的。

DTO基本上映射到领域模型，因此将数据发送到方法或服务器。

让我们创建_EmployeeDTO_，它组合了创建员工所需的所有必要细节。我们将这些数据在单个请求中发送到服务器，优化了与API的交互：

```java
public class EmployeeDTO {

    private String firstName;
    private String lastName;
    private LocalDate startDate;

    // 标准的getter和setter
}
```

上述DTO与不同的服务交互并处理数据流。这种DTO模式可以在任何服务中使用，没有任何框架限制。

## 5. VO

**VO，也称为值对象，是一种特殊类型的对象，可以保存值，例如_java.lang.Integer_和_java.lang.Long_。**

VO应该始终覆盖_equals()_和_hashCode()_方法。VO通常封装小对象，如数字、日期、字符串等。它们遵循值语义，即直接更改对象的值，并通过传递副本而不是引用来传递。

将值对象设为不可变是一种好习惯。值的更改只通过创建一个新对象来发生，而不是通过更新旧对象本身的值。这有助于理解隐含的合同，即两个创建相等的值对象应该保持相等。

让我们定义_EmployeeVO_并覆盖_equals()_和_hashCode()_方法：

```java
public final class EmployeeVO {

    private final String firstName;
    private final String lastName;
    private final LocalDate startDate;

    public EmployeeVO(String firstName, String lastName, LocalDate startDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.startDate = startDate;
    }
    // Getters

    @Override
    public boolean equals(Object obj) {

        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        EmployeeVO emp = (EmployeeVO) obj;

        return Objects.equals(firstName, emp.firstName)
            && Objects.equals(lastName, emp.lastName)
            && Objects.equals(startDate, emp.startDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName, startDate);
    }
}
```

## 6. 结论

在本文中，我们看到了POJO、JavaBeans、DTO和值对象的定义。我们还看到了一些框架和库如何利用JavaBean命名约定，以及如何将POJO转换为JavaBean。我们还研究了DTO模式和值对象以及它们在不同场景中的使用。

接下来，Java 14记录通过抽象getter、setter、equals和hashcode提高了可读性，并提供了开箱即用的不可变性。你可以在我们的文章中阅读更多相关内容。

像往常一样，这些示例的代码可以在GitHub上找到。