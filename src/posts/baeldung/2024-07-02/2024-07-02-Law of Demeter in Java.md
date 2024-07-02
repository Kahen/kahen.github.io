---
date: 2024-07-03
category:
  - Java
  - 设计模式
tag:
  - Law of Demeter
  - 面向对象设计
head:
  - - meta
    - name: keywords
      content: Java, 设计原则, 模块化, 低耦合
------
# 迪米特法则在Java中的应用

## 1. 概述

迪米特法则（LoD），或最少知识原则，为模块化软件开发提供了面向对象设计原则。它有助于构建相互依赖性较低且松耦合的组件。

在本教程中，我们将深入探讨迪米特法则及其在Java中的应用。

## 2. 理解迪米特法则

迪米特法则是面向对象编程中的几种设计指南之一。**它建议对象应避免访问其他对象的内部数据和方法**。相反，对象应该只与其直接依赖项交互。

该概念最初由Karl J. Lieberherr等人在一篇论文中提出。它指出：

> 对于所有类_C_，以及附加到_C_的所有方法_M_，_M_发送消息的所有对象必须是以下类别的实例：
> 
> - _M_的参数类（包括_C_）
> - _C_的实例变量的类
> 
> （由_M_创建的对象，或由_M_调用的函数或方法，以及全局变量中的对象被视为_M_的参数。）

简单来说，法则规定类_C_中的方法_X_只应调用以下方法：

- 类_C_本身
- 由_X_创建的对象
- 作为参数传递给_X_的对象
- 存储在_C_的实例变量中的对象
- 静态字段

这五个要点总结了法则。

## 3. Java中迪米特法则的示例

在上一节中，我们将迪米特法则提炼成五个关键规则。让我们通过一些示例代码来说明这些要点。

### 3.1. 第一规则

**第一规则表明，类_C_中的方法_X_只应调用_C_的方法：**

```
class Greetings {
    String generalGreeting() {
        return "Welcome" + world();
    }
    String world() {
        return "Hello World";
    }
}
```

在这里，generalGreeting()方法调用了同一类中的world()方法。这符合法则，因为它们属于同一类。

### 3.2. 第二规则

**第二规则表明，类_C_中的方法_X_只应调用由_X_创建的对象的方法：**

```
String getHelloBrazil() {
    HelloCountries helloCountries = new HelloCountries();
    return helloCountries.helloBrazil();
}
```

在上面的代码中，我们创建了HelloCountries的一个对象，并在其上调用了helloBrazil()。这符合法则，因为getHelloBrazil()方法本身创建了对象。

### 3.3. 第三规则

此外，**第三规则指出方法_X_只应调用作为参数传递给**_X_**的对象的方法：**

```
String getHelloIndia(HelloCountries helloCountries) {
    return helloCountries.helloIndia();
}
```

在这里，我们将HelloCountries对象作为参数传递给getHelloIndia()。将对象作为参数传递给了方法，使方法能够不违反迪米特法则地调用其方法。

### 3.4. 第四规则

**类_C_中的方法_X_只应调用存储在_C_的实例变量中的对象的方法：**

```
// ...
HelloCountries helloCountries = new HelloCountries();

String getHelloJapan() {
    return helloCountries.helloJapan();
}
// ...
```

在上面的代码中，我们在Greetings类中创建了一个实例变量“_helloCountries_”，然后在getHelloJapan()方法中调用了实例变量上的helloJapan()方法。这符合第四规则。

### 3.5. 第五规则

最后，**类_C_中的方法_X_可以调用在_C_中创建的静态字段的方法：**

```
// ...
static HelloCountries helloCountriesStatic = new HelloCountries();

String getHellStaticWorld() {
    return helloCountriesStatic.helloStaticWorld();
}
// ...
```

在这里，方法调用了类中创建的静态对象上的helloStaticWorld()方法。

## 4. 违反迪米特法则

让我们检查一些违反迪米特法则的示例代码，并查看可能的修复方法。

### 4.1. 设置

我们首先定义一个Employee类：

```
class Employee {
    private Department department = new Department();

    public Department getDepartment() {
        return department;
    }
}
```

Employee类包含一个对象引用成员变量，并为其提供访问器方法。

接下来，定义Department类，具有以下成员变量和方法：

```
class Department {
    private Manager manager = new Manager();

    public Manager getManager() {
        return manager;
    }
}
```

此外，Manager类包含批准费用的方法：

```
class Manager {
    public void approveExpense(Expenses expenses) {
        System.out.println("Total amounts approved" + expenses.total());
    }
}
```

最后，让我们看看Expenses类：

```
class Expenses {
    private double total;
    private double tax;

    public Expenses(double total, double tax) {
        this.total = total;
        this.tax = tax;
    }

    public double total() {
        return total + tax;
    }
}
```

### 4.2. 使用

这些类通过它们的关系表现出紧密耦合。**我们将通过让_Manager_批准_Expenses_来演示迪米特法则的违反：**

```
Expenses expenses = new Expenses(100, 10);
Employee employee = new Employee();
employee.getDepartment().getManager().approveExpense(expenses);
```

在上面的代码中，**我们有违反迪米特法则的链式调用**。这些类紧密耦合，不能独立操作。

让我们通过将_Manager_类作为_Employee_的实例变量来修复这个违规。它将通过_Employee_构造函数传入。然后，我们将在_Employee_类中创建_submitExpense()_方法，并在其中调用_Manager_上的_approveExpense()_：

```
// ...
private Manager manager;
Employee(Manager manager) {
    this.manager = manager;
}

void submitExpense(Expenses expenses) {
    manager.approveExpense(expenses);
}
// ...
```

这是新的用法：

```
Manager mgr = new Manager();
Employee emp = new Employee(mgr);
emp.submitExpense(expenses);
```

这种修订后的方法通过减少类之间的耦合并促进更模块化的设计，符合迪米特法则。

## 5. 迪米特法则的例外

链式调用通常表示违反了迪米特法则，但也有例外。例如，**如果构建器是本地实例化的，则构建器模式不违反迪米特法则**。其中一条规则指出，“类_C_中的方法_X_只应调用由_X_创建的对象的方法”。

此外，Fluent APIs中的链式调用。**如果链式调用是在本地创建的对象上进行的，则Fluent APIs不违反迪米特法则**。但是，当链式调用是在非本地实例化的对象上进行的，或者返回一个不同的对象时，那么它就违反了迪米特法则。

还有，在我们处理数据结构时，可能会违反迪米特法则。**典型的数据结构使用，如本地实例化、变异和访问它们，不违反迪米特法则**。在我们从数据结构中获取的对象上调用方法的情况下，那么迪米特法则可能被违反。

## 6. 结论

在本文中，我们学习了迪米特法则的应用以及如何在面向对象代码中遵循它。此外，我们通过代码示例深入探讨了每条法则。迪米特法则通过限制对象交互到直接依赖项促进了松耦合。

如常，示例的完整源代码可在GitHub上找到。