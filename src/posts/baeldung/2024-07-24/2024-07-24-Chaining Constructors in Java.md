---
date: 2022-04-01
category:
  - Java
  - Tutorial
tag:
  - Java
  - Constructor Chaining
head:
  - - meta
    - name: keywords
      content: Java, Constructor Chaining, Chaining Constructors in Java, Java Tutorial
---
# Java中构造器链式调用

在这个简短的教程中，我们将看到如何在Java中链式调用构造器。这是一种方便的设计理念，它减少了代码的重复，使代码更加易读。

首先，我们将解释构造器链式调用的含义。然后，我们将看到如何在同一个类中链式调用它们，以及如何使用父类的构造器。最后，我们将分析这种方法的优点和缺点。

### 2.1. 同一类中构造器的链式调用

让我们定义一个简单的`Person`类，它包含一些属性：

```java
public class Person {
    private final String firstName;
    private final String middleName;
    private final String lastName;
    private final int age;

    //getters, equals和hashcode
}
```

`firstName`、`lastName`和`age`是在对象初始化时我们总是要设置的属性。然而，并不是每个人都有中间名。因此，`middleName`属性是可选的。

考虑到这一点，我们将创建两个构造器。第一个接受所有四个属性：

```java
public Person(String firstName, String middleName, String lastName, int age) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.age = age;
}
```

第二个构造器将接受三个必需的属性并省略可选字段：

```java
public Person(String firstName, String lastName, int age) {
    this(firstName, null, lastName, age);
}
```

我们使用`this()`关键字。它必须是构造器的第一行。这确保了我们正在链式调用的构造器首先被调用。

请记住，构造器在类中的顺序并不重要。这意味着我们的第二个构造器可以放在`Person`类的任何位置，它仍然可以正确工作。

### 2.2. 从父类链式调用构造器

让我们定义一个从上一节中创建的`Person`类继承的`Customer`类：

```java
public class Customer extends Person {
    private final String loyaltyCardId;

    //getters, equals和hashcode
}
```

它包含一个额外的属性。现在，让我们以类似于`Person`类的方式创建两个构造器：

```java
public Customer(String firstName, String lastName, int age, String loyaltyCardId) {
    this(firstName, null, lastName, age, loyaltyCardId);
}

public Customer(String firstName, String middleName, String lastName, int age, String loyaltyCardId) {
    super(firstName, middleName, lastName, age);
    this.loyaltyCardId = loyaltyCardId;
}
```

第一个构造器使用`this()`关键字链式调用到第二个构造器，它接受所有必需和可选属性。在这里，我们首次使用`super()`关键字。

它的行为与`this()`关键字非常相似。唯一的区别是`super()`链式调用到父类中的相应构造器，而`this()`链式调用到同一类中的构造器。

请记住，与之前的关键字类似，`super()`必须始终是构造器的第一行。这意味着首先调用父类的构造器。之后，将值分配给`loyaltyCardId`属性。

## 3. 构造器链式调用的优点和缺点

构造器链式调用的最大优点是**减少重复代码**。换句话说，我们使用了不要重复自己（DRY）原则。这是因为我们在单个构造器中完成了对象的初始化，通常是接受所有属性的那个构造器。其他构造器只是用于传递接收到的数据并为缺失的属性添加默认值。

链式调用构造器使代码更易读。我们不必在所有构造器中重复属性赋值。相反，我们在一个地方完成这个操作。

另一方面，**使用构造器链式调用时，我们暴露了更多的对象构造方式**。这在某些项目中可能是一个显著的缺点。在这些情况下，我们应该寻找工厂或建造者模式来隐藏多个构造器。

## 4. 结论

在本文中，我们讨论了Java中的构造器链式调用。首先，我们解释了什么是构造器链式调用。然后，我们展示了如何在同一个类中这样做，以及如何使用父类的构造器。最后，我们讨论了链式构造器的优点和缺点。

和往常一样，本文的完整源代码可以在GitHub上找到。