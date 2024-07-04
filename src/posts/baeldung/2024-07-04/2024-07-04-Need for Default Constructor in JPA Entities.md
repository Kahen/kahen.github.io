---
date: 2023-06-01
category:
  - JPA
  - Entity Classes
tag:
  - JPA Specification
  - No-Argument Constructor
head:
  - - meta
    - name: keywords
      content: JPA, Entity Classes, No-Argument Constructor, Reflection, Proxy Mechanism
------
# JPA实体类中默认无参构造函数的必要性

在这篇快速教程中，我们将学习JPA对实体类中默认无参构造函数的要求。

为了理解无参构造函数的重要性，我们将使用一个简单的_Employee_实体类示例。我们将观察缺少默认构造函数如何导致编译时错误。我们将深入探讨JPA使用反射来实例化实体。此外，我们还将简要介绍这些构造函数可能需要的其他原因。

## 2. 示例设置

让我们设置一个名为_Employee_的实体类示例，该类包含名称、部门和自动生成的ID。让我们定义一个接受所有三个字段的构造函数：

```
@Entity
public class Employee {

    @Id
    private Long id;
    private String name;
    private int age;

    public Employee(Long id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    // getters and setters
}
```

然而，在这一点上，我们将注意到_Employee_类无法编译：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/jpa-entiity-no-constructor-1024x604.png)

显然，在这里我们可以看到我们定义了一个带有参数化构造函数的_实体_类，但没有无参构造函数。**在这种情况下，有一个编译时错误，它建议我们需要在现有构造函数之外再添加一个无参构造函数。**

在接下来的两个部分中，我们将查看JPA规范中关于_实体_类构造函数的内容。我们将看到如何修复这个错误，以及JPA强加这些限制的底层原因。

## 3. JPA规范、构造函数和反射

**JPA规范要求所有_实体_类都有一个默认的无参构造函数。这可以是_公共的_或_受保护的_。**

如果没有定义其他构造函数，编译时将自动提供默认的无参构造函数。然而，如果我们定义了一个参数化构造函数，我们还必须显式地提供一个默认构造函数。

**这个默认构造函数由JPA用于使用反射创建实体类的实例。**它提供了一种动态创建类实例、调用方法和访问字段的方式。

使用反射创建类的实例，我们可以使用_Class_类及其_newInstance()_方法。当JPA创建持久化实体类的实例时，它首先使用实体的完全限定类名获取其_Class_对象。**一旦它有了_Class_对象，JPA就使用反射通过调用无参构造函数来创建类的新实例。**因此，在JPA实体类中提供无参构造函数始终是一个好习惯，即使我们没有显式使用它。

简单来说，为了解决这个问题，让我们在_Employee_实体类中显式定义一个无参构造函数：

```
@Entity
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String dept;
    private int salary;

    public Employee(String name, String dept, int salary) {
        this.name = name;
        this.dept = dept;
        this.salary = salary;
    }

    public Employee() {

    }
}
```

现在编译时错误已修复：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/entity-with-on-args-constructor-1024x918.png)

显然，通过引入一个无参数构造函数，之前的编译器错误现在已经被解决了。

## 4. 无参构造函数的原因

首先，正如我们在前一节中简要讨论的，JPA实现，如Hibernate，使用反射来创建实体类的实例。这允许在运行时动态地检查和实例化类。**为了创建一个实体对象，JPA提供者需要调用一个没有任何参数的构造函数。**如果没有无参构造函数，它将在对象实例化期间导致异常。

此外，**JPA提供者通常使用代理对象**进行性能优化和延迟加载关系。代理对象是实体类的动态生成的子类。**这些子类需要一个无参构造函数来创建实例并实现其目的。**如果没有它，代理机制就会失败，导致运行时错误。

最后**，**我们知道JPA提供了实体和数据库表之间的双向映射。在将实体对象映射到它们对应的数据库记录的过程中，JPA提供者必须创建实体类的实例。**如果没有无参构造函数，提供者就无法实例化实体对象**，导致映射失败和数据检索问题。

## 5. 结论

在本文中，我们讨论了实体类中默认无参构造函数的必要性。

我们了解到它使JPA提供者能够实例化对象，使用代理机制，并在实体和数据库表之间进行无缝映射。

缺少无参构造函数会导致编译时错误，阻止持久化操作的成功执行。通过理解无参构造函数的需要以及反射在处理实体实例化中的作用，我们可以确保基于JPA的应用程序的顺利运行。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/ba372319eaeba50279f8ab63c58e438d?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/david-martinez-150x150.png)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)