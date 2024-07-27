---
date: 2022-04-01
category:
  - Java
  - Annotations
tag:
  - Java Annotation
  - Attribute Value Restrictions
head:
  - - meta
    - name: keywords
      content: Java Annotation Attribute Value Restrictions
------
# Java 注解属性值限制

## 1. 概述

如今，很难想象没有注解的 Java，注解是 Java 语言中的强大工具。

Java 提供了一组内置注解。此外，还有许多来自不同库的注解。我们甚至可以定义和处理我们自己的注解。我们可以调整这些注解的属性值，但这些属性值有限制。特别是，**注解属性值必须是常量表达式**。

在本教程中，我们将学习这种限制的一些原因，并深入 JVM 内部以更好地解释它。我们还将查看一些涉及注解属性值的问题和解决方案的示例。

## 2. Java 注解属性的内部机制

让我们考虑 Java 类文件如何存储注解属性。Java 有一个特殊的结构称为 _element_value_。这个结构存储一个特定的注解属性。

_element_value_ 结构可以存储四种不同类型的值：
- 常量池中的常量
- 类字面量
- 嵌套注解
- 数组值

因此，注解属性中的常量是编译时常量。否则，编译器不会知道应该将什么值放入常量池并用作注解属性。

Java 规范定义了产生常量表达式的运算。如果我们将这些运算应用于编译时常量，我们将得到编译时常量。

假设我们有一个名为 _@Marker_ 的注解，它有一个属性 _value_：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Marker {
    String value();
}
```

例如，这段代码可以无错误地编译：

```java
@Marker(Example.ATTRIBUTE_FOO + Example.ATTRIBUTE_BAR)
public class Example {
    static final String ATTRIBUTE_FOO = "foo";
    static final String ATTRIBUTE_BAR = "bar";

    // ...
}
```

在这里，我们将注解属性定义为两个字符串的连接。连接运算符产生个常量表达式。

## 3. 使用静态初始化器

让我们考虑在 _static_ 块中初始化的常量：

```java
@Marker(Example.ATTRIBUTE_FOO)
public class Example {
    static final String[] ATTRIBUTES = {"foo", "Bar"};
    static final String ATTRIBUTE_FOO;

    static {
        ATTRIBUTE_FOO = ATTRIBUTES[0];
    }

    // ...
}
```

它在 _static_ 块中初始化字段，并尝试将该字段用作注解属性。**这种方法会导致编译错误。**

首先，变量 _ATTRIBUTE_FOO_ 具有 _static_ 和 _final_ 修饰符，但编译器不能计算该字段。应用程序在运行时计算它。

其次，**注解属性必须在 JVM 加载类之前具有确切的值**。然而，当 _static_ 初始化器运行时，类已经被加载了。因此，这种限制是有意义的。

同样的错误也出现在字段初始化中。这段代码由于同样的原因是错误的：

```java
@Marker(Example.ATTRIBUTE_FOO)
public class Example {
    static final String[] ATTRIBUTES = {"foo", "Bar"};
    static final String ATTRIBUTE_FOO = ATTRIBUTES[0];

    // ...
}
```

JVM 如何初始化 _ATTRIBUTE_FOO_？数组访问运算符 _ATTRIBUTES[0]_ 在类初始化器中运行。因此，_ATTRIBUTE_FOO_ 是一个运行时常量。它不是在编译时定义的。

## 4. 数组常量作为注解属性

让我们考虑一个数组注解属性：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Marker {
    String[] value();
}
```

这段代码将不会编译：

```java
@Marker(value = Example.ATTRIBUTES)
public class Example {
    static final String[] ATTRIBUTES = {"foo", "bar"};

    // ...
}
```

首先，尽管 _final_ 修饰符保护了引用不被更改，**我们仍然可以修改数组元素**。

其次，**数组字面量不能是运行时常量。JVM 在静态初始化器中设置每个元素** —— 我们之前描述过的限制。

最后，类文件存储该数组的每个元素的值。因此，编译器计算属性数组的每个元素，并且它发生在编译时。

因此，我们只能每次指定数组属性：

```java
@Marker(value = {"foo", "bar"})
public class Example {
    // ...
}
```

我们仍然可以使用常量作为数组属性的基本元素。

## 5. 标记接口中的注解：为什么不工作？

如果一个注解属性是一个数组，我们必须每次都重复它。但我们希望避免这种复制粘贴。我们为什么不让我们的注解 _@Inherited_？我们可以将我们的注解添加到一个标记接口：

```java
@Marker(value = {"foo", "bar"})
public interface MarkerInterface {
}
```

然后，我们可以让需要这个注解的类实现它：

```java
public class Example implements MarkerInterface {
    // ...
}
```

**这种方法不会工作**。代码可以无错误地编译。然而，**Java 不支持从接口继承注解**，即使注解本身具有 _@Inherited_ 注解。因此，实现标记接口的类不会继承注解。

**原因是多重继承的问题**。的确，如果多个接口具有相同的注解，Java 无法选择一个。

因此，我们不能通过标记接口避免这种复制粘贴。

## 6. 数组元素作为注解属性

假设我们有一个数组常量，我们使用这个常量作为注解属性：

```java
@Marker(Example.ATTRIBUTES[0])
public class Example {
    static final String[] ATTRIBUTES = {"Foo", "Bar"};
    // ...
}
```

这段代码不会编译。注解参数必须是编译时常量。但是，正如我们之前考虑的，**数组不是编译时常量**。

此外，**数组访问表达式不是常量表达式**。

如果我们有一个 _List_ 而不是数组会怎样？方法调用不属于常量表达式。因此，使用 _List_ 类的 _get_ 方法会导致同样的错误。

相反，我们应该明确引用一个常量：

```java
@Marker(Example.ATTRIBUTE_FOO)
public class Example {
    static final String ATTRIBUTE_FOO = "Foo";
    static final String[] ATTRIBUTES = {ATTRIBUTE_FOO, "Bar"};
    // ...
}
```

这样，我们在字符串常量中指定注解属性值，Java 编译器可以明确地找到属性值。

## 7. 结论

在本文中，我们查看了注解参数的限制。我们考虑了一些注解属性的问题示例。我们还讨论了这些限制的 JVM 内部机制。

在所有示例中，我们使用了相同的类来存储常量和注解。然而，所有这些限制也适用于常量来自另一个类的情况。