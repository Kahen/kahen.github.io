---
date: 2022-06-01
category:
  - Java
tag:
  - Error Handling
  - Java Basics
head:
  - - meta
    - name: keywords
      content: Java, int, char, dereference, error
------
# Java “int/char 不能被解引用” 错误 | Baeldung## 1. 概述

在本教程中，我们将仔细查看 Java 错误 “int cannot be dereferenced”（int 不能被解引用）。首先，我们将创建一个产生此错误的示例。接下来，我们将解释异常的主要原因。最后，我们将看到如何修复它。

## 2. 实例演示

现在，让我们看一个生成编译错误 “X cannot be dereferenced”（X 不能被解引用）的示例。

这里，_X_ 代表八种 Java 基本类型之一，即 _int_, _byte_, _short_, _long_, _float_, _double_, _boolean_, 和 _char_。

首先，让我们创建一个类 _Test_ 并**将一个 _int_ 与另一个值进行比较**：

```java
int x = 10;
System.out.println(x.equals(10));
```

当从终端编译代码时，我们将得到错误：

```plaintext
$ javac Test.java
Test.java:8: error: int cannot be dereferenced
        System.out.println(x.toString());
                             ^
1 error
```

此外，像 Eclipse 和 IntelliJ 这样的现代 IDE 甚至在编译之前就会显示错误：

## 3. 原因

在 Java 中，引用是某个对象/变量的地址。解引用是指通过引用访问对象的特性的动作。**对基本类型进行任何解引用操作都会导致 “X cannot be dereferenced” 错误，其中 X 是基本类型。** 这是因为基本类型不被视为对象 —— 它们代表原始值：

```java
int x = 10;
System.out.println(x.equals(10));
```

当从终端构建代码时，我们将得到 “_int cannot be dereferenced_” 错误。

然而，对于 _Object_，它工作正常：

```java
Object testObj = new Object();
testObj.toString();
```

这里，_testObj_ 是一个对象，解引用发生在调用 _toString()_ 时使用 **.** 运算符在 _testObj_ 上。这不会给出任何错误，因为 _testObj_ 是一个对象，因此解引用将起作用。

## 4. 解决方案

在我们的示例中，我们需要检查两个值的相等性。

**我们问题的第一个解决方案是使用 _==_ 而不是 _equals()_ 对基本类型**：

```java
int x = 10;
System.out.println(x == 10);
```

当我们运行代码时，它将打印 “true”。

**第二个解决方案是将基本类型更改为包装类**。

Java 为每种基本类型提供了包装类对象。

例如，如果我们必须使用 _equals()_，我们可以将基本类型转换为包装对象：

```java
Integer x = 10;
System.out.println(x.equals(10));
```

这个错误没有一劳永逸的解决方案。根据用例，我们可以使用上述两种解决方案中的任何一种。

## 5. 结论

我们已经解释了 Java 的 _“int cannot be dereferenced”_ 错误。然后，我们讨论了如何产生错误以及异常的原因。最后，我们讨论了解决错误的方案。

OK