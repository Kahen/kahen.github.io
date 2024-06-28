---
date: 2022-04-01
category:
  - Java
tag:
  - final
  - static
head:
  - - meta
    - name: keywords
      content: Java, static, final, constant, class-level, code consistency
------
# Java中“final static”与“static final”的区别

关键词_final_和_static_在Java中有不同的含义，但它们可以一起使用来声明一个常量变量。

在本教程中，我们将讨论_final static_和_static final_之间的区别。

## **2. _final_和_static_：简要概述**

_final_关键字表示一个变量一旦被初始化就不能重新赋值。这对于防止对重要变量的意外更改非常有用。

_static_关键字表示一个变量属于类本身，而不是类的任何特定实例。这意味着**只有一个变量副本，由类的所有实例共享**。

## 3. _static_和_final_的顺序

当我们结合使用_final_和_static_关键字时，我们创建了一个既是常量又是类级别的变量。这意味着它不能被重新赋值，并且由类的所有实例共享。

理解声明常量变量时_static_和_final_的顺序至关重要。尽管广泛接受使用_both _static final_ and _final static_，但一些编码标准和工具，如Sonar和Checkstyle，可能会强制执行_static final_的顺序。因此，**遵循_static final_顺序是确保代码一致性的好习惯**。

让我们举例说明如何创建类级别的常量变量：

```java
public class MyClass {
    public final static int MY_CONSTANT = 10;
    public static final int MY_OTHER_CONSTANT = 20;
}
```

我们可以从任何_MyClass_类的实例或类外部使用_MyClass_类名访问_MY_CONSTANT_和_MY_OTHER_CONSTANT_变量。然而，我们不能重新赋值这两个变量。

## **4. 何时使用** _static final_

我们应该使用_final stati_ c或_static fina_ l来声明我们想要保持不变的任何变量。这包括包含配置设置、数学常数或不应更改的其他值的变量。

使用_static fina_ l变量可以帮助提高我们代码的可读性和可维护性。它还有助于通过防止对重要变量的意外更改来防止错误。

我们应该如何使用_static final_的例子：

- 声明配置设置，如数据库连接字符串或日志文件路径
- 声明数学常数，如π或e

## **5. 结论**

Java中的_final stati_ c和_static fina_ l关键字用于声明常量、类级别的变量。这对于防止对重要变量的意外更改和提高我们代码的可读性和可维护性非常有用。

在本文中，**我们了解到_static_和_final_修饰符的顺序并不重要。然而，在实际应用中，建议使用_static final_的顺序**。