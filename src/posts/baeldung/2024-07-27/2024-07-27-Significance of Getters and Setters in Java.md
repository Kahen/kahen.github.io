---
date: 2024-07-28
category:
  - Java
  - Programming
tag:
  - Getters
  - Setters
head:
  - - meta
    - name: keywords
      content: Java, Getters, Setters, Encapsulation, OOP
---
# Java中Getter和Setter的重要性

1. 引言

Getter和Setter在Java中扮演着重要的角色，用于在封装类之外检索和更新变量的值。Setter用于更新变量的值，而Getter用于读取变量的值。本教程将讨论不使用Getter/Setter的问题、它们的重要性以及在Java中实现它们时应避免的常见错误。

2. Java中没有Getter和Setter的生活

想象一下，如果我们想根据某些条件改变对象的状态，没有Setter方法我们如何实现这一点？

- 将变量标记为public、protected或默认
- 使用点(.)操作符更改值

让我们看看这样做的后果。

3. 没有Getter和Setter访问变量

首先，要在类外部访问变量而不使用Getter和Setter，我们必须将它们标记为public、protected或默认。**这样，我们就失去了对数据的控制，损害了面向对象编程的基本原则——封装。**

其次，由于任何人都可以直接从类外部更改非私有字段，**我们无法实现不变性。**

第三，我们无法为变量的更改提供任何条件逻辑。让我们考虑一个名为_Employee_的类，它有一个字段_retirementAge_：

```java
public class Employee {
    public String name;
    public int retirementAge;

// 构造函数，但没有getter/setter
}
```

注意，我们在这里将字段设置为public，以便从类外部访问_Employee_。现在，我们需要更改员工的_retirementAge_：

```java
public class RetirementAgeModifier {

    private Employee employee = new Employee("John", 58);

    private void modifyRetirementAge(){
        employee.retirementAge=18;
    }
}
```

在这里，任何_Employee_类的客户端都可以轻易地对_retirementAge_字段做他们想做的事情。**没有办法验证更改。**

第四，我们如何实现从类外部对字段的只读或只写访问？

这时Getter和Setter就派上用场了。

让我们来谈谈使用Getter和Setter的一些最重要的好处：

- **它帮助我们实现封装，这是用来隐藏类内结构化数据对象的状态，防止未经授权的直接访问**
- 通过将字段声明为private并仅使用getters来实现不变性
- **Getter和Setter还允许我们更容易地添加额外的功能，如验证、错误处理，以便在未来更容易地添加条件逻辑。因此我们可以添加条件逻辑并根据需要提供行为**
- 我们可以为字段提供不同的访问级别；例如，get（读取访问）可以是public，而set（写入访问）可以是protected
- 控制正确设置属性值
- 使用Getter和Setter，我们还实现了面向对象的另一个关键原则，即抽象，隐藏实现细节，以便没有人可以在其他类或模块中直接使用字段

5. 避免错误

以下是实现Getter和Setter时需要避免的最常见的错误。

### 5.1 使用公共变量的Getter和Setter

公共变量可以使用点(.)操作符在类外部访问。对于公共变量使用Getter和Setter是没有意义的：

```java
public class Employee {
    public String name;
    public int retirementAge;

    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return this.name;
    }
    // retirementAge的getter/setter
}
```

在这种情况下，使用Getter和Setter可以做到的事情也可以通过简单地使字段公开来完成。

作为经验法则，我们需要**始终根据需要使用最受限的访问修饰符以实现封装。**

### 5.2 在Setter方法中直接分配对象引用

当我们在Setter方法中直接分配对象引用时，这两个引用指向内存中的同一个对象。因此，使用任何一个引用变量所做的更改实际上是对同一个对象进行的：

```java
public void setEmployee(Employee employee) {
    this.employee = employee;
}
```

然而，我们可以通过深度复制将一个对象的所有元素复制到另一个对象中。这样，_this_对象的状态就独立于现有的（传递的）员工对象：

```java
public void setEmployee(Employee employee) {
    this.employee.setName(employee.getName());
    this.employee.setRetirementAge(employee.getRetirementAge());
}
```

### 5.3 直接从Getter方法返回对象引用

同样，如果Getter方法直接返回对象的引用，任何外部代码都可以使用这个引用来更改对象的状态：

```java
public Employee getEmployee() {
    return this.employee;
}
```

让我们使用这个_getEmployee()_方法来更改_retirementAge_：

```java
private void modifyAge() {
    Employee employeeTwo = getEmployee();
    employeeTwo.setRetirementAge(65);
}
```

这导致了原始对象的不可恢复的损失。

因此，而不是从Getter方法返回引用，我们应该返回对象的副本。一种方法是：

```java
public Employee getEmployee() {
    return new Employee(this.employee.getName(), this.employee.getRetirementAge());
}
```

然而，我们还应该记住，在Getter或Setter中创建对象副本并不总是最佳实践。例如，在循环中调用上述Getter方法可能会导致昂贵的操作。

另一方面，如果我们希望我们的集合保持不可修改，那么从Getter返回集合的副本是有意义的。然后我们必须确定哪种方法在特定情况下最合适。

### 5.4 添加不必要的Getter和Setter

通过拥有Getter和Setter，我们可以控制成员变量的访问和分配。但在许多地方，这被证明是不必要的。此外，它使代码变得冗长：

```java
private String name;

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}
```

简单地为类中的私有字段定义公共的getter和setter等同于在没有getter和setter的情况下使字段公开。因此，总是建议深思熟虑地决定是否为所有字段定义访问器方法。

6. 结论

在本教程中，我们讨论了在Java中使用Getter和Setter的优缺点。我们还讨论了实现Getter和Setter时需要避免的一些常见错误，以及如何适当地使用它们。