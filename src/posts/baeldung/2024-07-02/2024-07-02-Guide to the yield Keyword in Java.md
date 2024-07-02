---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - yield
  - switch
  - Java 14
head:
  - - meta
    - name: keywords
      content: Java, yield, switch expression, Java 14, Baeldung
---

# Java 中的 yield 关键字指南

1. 概述
在Java的早期版本中，我们经常使用_switch_语句来将一个值转换为另一个值。这通常需要我们将_switch_嵌入到一个单独的函数中，并从每个_case_使用_return_语句，或者需要我们从每个_case_分配一个临时变量以供函数稍后使用。
自Java 14起，_switch_表达式中的_yield_关键字为我们提供了一种更好的方法。
_yield_关键字允许我们通过返回一个值来退出_switch_表达式，该值成为_switch_表达式的值。
这意味着我们可以将_switch_表达式的值分配给一个变量。
最后，通过在_switch_表达式中使用_yield_，我们得到了一个隐式检查，以确保我们覆盖了我们的案例，这使我们的代码更加健壮。
让我们看一些例子。

2.1 使用箭头操作符的 _yield_
首先，假设我们有以下_enum_和_switch_语句：
```java
public enum Number {
    ONE, TWO, THREE, FOUR;
}

String message;
switch (number) {
    case ONE:
        message = "Got a 1";
        break;
    case TWO:
        message = "Got a 2";
        break;
    default:
        message = "More than 2";
}
```
让我们将其转换为_switch_表达式，并使用箭头操作符和_yield_关键字：
```java
String message = switch (number) {
    case ONE -> {
        yield "Got a 1";
    }
    case TWO -> {
        yield "Got a 2";
    }
    default -> {
        yield "More than 2";
    }
};
```
_yield_根据_number_的值设置_switch_表达式的值。

2.2 使用冒号分隔符的 _yield_
我们还可以使用冒号分隔符创建使用_yield_的_switch_表达式：
```java
String message = switch (number) {
    case ONE:
        yield "Got a 1";
    case TWO:
        yield "Got a 2";
    default:
        yield "More than 2";
};
```
这段代码的行为与前一节相同。但是，箭头操作符更清晰，也不太可能忘记_yield_（或_break_）语句。
我们应该注意，我们不能在同一个_switch_表达式中混合使用冒号和箭头分隔符。

3. 穷尽性
使用_switch_表达式和_yield_的另一个好处是，如果我们缺少案例覆盖，我们将看到一个编译错误。让我们从箭头操作符_switch_表达式中删除_default_案例来看看：
```java
String message = switch (number) {
    case ONE -> {
        yield "Got a 1";
    }
    case TWO -> {
        yield "Got a 2";
    }
};
```
上述代码在_number_上给出了一个错误：“_switch_表达式没有覆盖所有可能的输入值_”。
我们可以将_default_案例加回去，或者我们可以特别覆盖_number_的其余可能值：
```java
String message = switch (number) {
    case ONE -> {
        yield "Got a 1";
    }
    case TWO -> {
        yield "Got a 2";
    }
    case THREE, FOUR -> {
        yield "More than 2";
    }
};
```
_switch_表达式强制我们的案例覆盖是穷尽的。

4. 结论
在本文中，我们探讨了Java中的_yield_关键字，它的用法以及它的一些好处。
如常，我们示例的完整源代码可以在GitHub上找到。