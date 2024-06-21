---
date: 2024-06-14
category:
  - Java
tag:
  - Iterator
  - Iterable
---
# Java中Iterator.forEachRemaining()与Iterable.forEach()的区别 | Baeldung

## 1. 引言

_Iterator_和_Iterable_接口是Java中处理集合的基本构造。实际上，每个接口都提供了遍历元素的方法，但它们有不同的目的和使用场景。

**在本教程中，我们将深入探讨_Iterator.forEachRemaining()_和_Iterable.forEach()_之间的差异，以理解它们独特的功能。**

## 2. _Iterator.forEachRemaining()_方法

_Iterator_接口提供了一种顺序遍历集合元素的方式。_Iterator_接口中的_forEachRemaining()_方法是在Java 8中引入的。

**此外，它提供了一种简洁的方式来对迭代器中的每个剩余元素执行操作。此外，它接受一个_Consumer_函数式接口作为参数，代表对每个元素执行的操作。**

假设我们有以下员工详细信息，并希望处理它们以生成一个简单的报告：

```java
private final List`<String>` employeeDetails = Arrays.asList(
    "Alice Johnson, 30, Manager",
    "Bob Smith, 25, Developer",
    "Charlie Brown, 28, Designer"
);
```

```java
String expectedReport =
    "Employee: Alice Johnson, 30, Manager\n" +
    "Employee: Bob Smith, 25, Developer\n" +
    "Employee: Charlie Brown, 28, Designer\n";
```

在这里，我们初始化了一个员工详细信息列表，并指定了一个预期报告格式，每个员工信息格式化为(**员工：姓名，年龄，职位**)。

现在，让我们使用_Iterator.forEachRemaining()_方法遍历_employeeDetails_列表并生成报告：

```java
@Test
public void givenEmployeeDetails_whenUsingIterator_thenGenerateEmployeeReport() {
    StringBuilder report = new StringBuilder();
    employeeDetails.iterator().forEachRemaining(employee ->
        report.append("Employee: ").append(employee).append("\n")
    );

    assertEquals(expectedReport, report.toString());
}
```

在这个测试方法中，我们处理迭代器中的每个元素，将格式化的员工信息附加到_StringBuilder_ _report_。对于_employeeDetails_列表中的每个员工详细信息字符串，该方法附加前缀“**员工：**”后跟员工详细信息和一个换行符。

生成报告后，我们使用_assertEquals()_断言来验证生成的报告(_report_)是否与预期报告(_expectedReport_)匹配。

## 3. _Iterable.forEach()_方法

Java中的_Iterable_接口表示可以遍历的对象集合。_Iterable_接口中的_forEach()_方法也是在Java 8中引入的。

**默认方法允许我们对集合中的每个元素执行操作。像_Iterator.forEachRemaining()_一样，它也使用_Consumer_函数式接口作为参数。**

为了提供上下文，让我们看看实现：

```java
@Test
public void givenEmployeeDetails_whenUsingForEach_thenGenerateEmployeeReport() {
    StringBuilder report = new StringBuilder();
    employeeDetails.forEach(employee ->
        report.append("Employee: ").append(employee).append("\n")
    );

    assertEquals(expectedReport, report.toString());
}
```

在_forEach()_方法中，我们使用lambda表达式将每个格式化的员工详细信息附加到_StringBuilder_的报告中。

与_Iterator.forEachRemaining()_类似，这里的lambda表达式接收每个元素作为输入，我们执行相同的格式化操作，即前缀“**员工：**”后跟员工详细信息和一个换行符。

## 4. 关键差异

以下表格简洁地总结了基于它们的使用、实现和灵活性，_Iterator.forEachRemaining()_和_Iterable.forEach()_之间的区别：

| 关键差异 | _Iterator.forEachRemaining()_ | _Iterable.forEach()_ |
| --- | --- | --- |
| 使用 | 我们可以使用它来对迭代器中的每个剩余元素执行操作。 | 我们可以直接使用它来对集合中的每个元素执行操作，而无需显式使用迭代器。 |
| 实现 | 特定于_Iterator_接口，直接在迭代器实例上操作。 | 是可迭代接口的默认方法，直接在可迭代集合上操作。 |
| 灵活性 | 当使用迭代器遍历集合的子集时很有用。 | 直接与集合一起工作更方便，特别是当使用lambda表达式时。 |

## 5. 结论

在本文中，我们讨论了_Iterator.forEachRemaining()_和_Iterable.forEach()_这两种方法来遍历集合中的元素。根据我们是直接使用迭代器还是集合来选择适当的方法，可以基于用户偏好。

如往常一样，本文的完整代码示例可以在GitHub上找到。