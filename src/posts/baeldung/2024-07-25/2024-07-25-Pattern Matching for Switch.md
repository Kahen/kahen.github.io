---
date: 2024-07-25
category:
  - Java
  - Programming
tag:
  - Java SE 17
  - Pattern Matching
  - Switch
head:
  - - meta
    - name: keywords
      content: Java, Pattern Matching, Switch, Java SE 17
------
# Java SE 17 中的 switch 模式匹配

## 1. 概述

Java SE 17 版本引入了 switch 表达式和语句的模式匹配（JEP 406）作为预览特性。模式匹配**为我们在定义 switch 案例的条件时提供了更多的灵活性**。

除了现在的案例标签可以包含模式外，选择表达式也不再仅限于几种类型。在模式匹配之前，switch 案例仅支持对选择表达式进行简单的测试，需要完全匹配一个常量值。

在本教程中，我们将涵盖三种不同的模式类型，这些模式可以应用于 switch 语句。我们还将探索一些 switch 的特定情况，比如覆盖所有值、排序子类和处理 null 值。

## 2. Switch 语句

我们使用 Java 中的 switch 来将控制转移到几个预定义的案例语句之一。哪个语句被选中取决于 switch 选择表达式的值。

在 Java 的早期版本中，**选择表达式必须是数字、字符串或常量**。此外，案例标签只能包含常量：

```java
final String b = "B";
switch (args[0]) {
    case "A" -> System.out.println("Parameter is A");
    case b -> System.out.println("Parameter is b");
    default -> System.out.println("Parameter is unknown");
};
```

在我们的示例中，如果变量 b 不是 final，编译器会抛出一个常量表达式所需的错误。

模式匹配通常最早在 Java SE 14 中作为预览特性引入。

它仅限于一种模式——类型模式。一个典型的模式由类型名称和绑定结果的变量组成。

**将类型模式应用于 instanceof 运算符简化了类型检查和强制转换**。此外，它使我们能够将两者合并为一个表达式：

```java
if (o instanceof String s) {
    System.out.printf("Object is a string %s", s);
} else if (o instanceof Number n) {
    System.out.printf("Object is a number %n", n);
}
```

这种内置的语言增强帮助我们用更少的代码编写具有增强可读性的代码。

## 4. Switch 的模式

instanceof 的模式匹配在 Java SE 16 中成为永久特性。

**在 Java 17 中，模式匹配的应用现在也扩展到了 switch 表达式**。

然而，它仍然是一个预览特性，所以我们需要启用预览才能使用它：

```java
java --enable-preview --source 17 PatternMatching.java
```

### 4.1. 类型模式

让我们看看类型模式和 instanceof 运算符如何在 switch 语句中应用。

作为一个示例，我们将创建一个方法，使用 if-else 语句将不同类型的对象转换为 double。我们的方法将简单地返回零，如果类型不受支持：

```java
static double getDoubleUsingIf(Object o) {
    double result;
    if (o instanceof Integer) {
        result = ((Integer) o).doubleValue();
    } else if (o instanceof Float) {
        result = ((Float) o).doubleValue();
    } else if (o instanceof String) {
        result = Double.parseDouble(((String) o));
    } else {
        result = 0d;
    }
    return result;
}
```

我们可以使用 switch 中的类型模式以更少的代码解决同样的问题：

```java
static double getDoubleUsingSwitch(Object o) {
    return switch (o) {
        case Integer i -> i.doubleValue();
        case Float f -> f.doubleValue();
        case String s -> Double.parseDouble(s);
        default -> 0d;
    };
}
```

在 Java 的早期版本中，选择表达式仅限于几种类型。然而，有了类型模式，**switch 选择表达式可以是任何类型**。

### 4.2. 受保护的模式

类型模式帮助我们根据特定类型转移控制。然而，有时我们还需要**对传递的值执行额外的检查**。

例如，我们可以使用 if 语句来检查 String 的长度：

```java
static double getDoubleValueUsingIf(Object o) {
    return switch (o) {
        case String s -> {
            if (s.length() > 0) {
                yield Double.parseDouble(s);
            } else {
                yield 0d;
            }
        };
        default -> 0d;
    };
}
```

我们可以使用受保护的模式来解决同样的问题。它们使用模式和布尔表达式的组合：

```java
static double getDoubleValueUsingGuardedPatterns(Object o) {
    return switch (o) {
        case String s && s.length() > 0 -> Double.parseDouble(s);
        default -> 0d;
    };
}
```

**受保护的模式使我们能够避免在 switch 语句中添加额外的 if 条件。相反，我们可以** **将我们的条件逻辑移动到案例标签**。

### 4.3. 括号模式

除了在案例标签中具有条件逻辑外，**括号模式使我们能够对它们进行分组**。

我们可以在执行额外检查时简单地使用括号在我们的布尔表达式中：

```java
static double getDoubleValueUsingParenthesizedPatterns(Object o) {
    return switch (o) {
        case String s && s.length() > 0 && !(s.contains("#") || s.contains("@")) -> Double.parseDouble(s);
        default -> 0d;
    };
}
```

通过使用括号，我们可以避免有额外的 if-else 语句。

## 5. Switch 特定情况

让我们现在看看在使用 switch 模式匹配时需要考虑的几个特定情况。

### 5.1. 覆盖所有值

在使用 switch 中的模式匹配时，Java **编译器会检查类型覆盖**。

让我们考虑一个接受任何对象但只覆盖 String 案例的示例 switch 条件：

```java
static double getDoubleUsingSwitch(Object o) {
    return switch (o) {
        case String s -> Double.parseDouble(s);
    };
}
```

我们的示例将导致以下编译错误：

```java
[ERROR] Failed to execute goal ... on project core-java-17: Compilation failure
[ERROR] /D:/Projects/.../HandlingNullValuesUnitTest.java:[10,16] the switch expression does not cover all possible input values
```

这是因为 **switch 案例标签需要包括选择表达式的类型**。

默认案例标签也可以应用于选择表达式的特定类型。

### 5.2. 排序子类

在使用 switch 中的子类进行模式匹配时，**案例的顺序很重要**。

让我们考虑一个示例，其中 String 案例在 CharSequence 案例之后：

```java
static double getDoubleUsingSwitch(Object o) {
    return switch (o) {
        case CharSequence c -> Double.parseDouble(c.toString());
        case String s -> Double.parseDouble(s);
        default -> 0d;
    };
}
```

由于 String 是 CharSequence 的子类，我们的示例将导致以下编译错误：

```java
[ERROR] Failed to execute goal ... on project core-java-17: Compilation failure
[ERROR] /D:/Projects/.../HandlingNullValuesUnitTest.java:[12,18] this case label is dominated by a preceding case label
```

错误的原因是因为 **执行没有任何机会进入第二个案例**，因为任何传递给方法的字符串对象都会在第一个案例中处理。

### 5.3. 处理 Null 值

在 Java 的早期版本中，将 null 值传递给 switch 语句会导致 NullPointerException。

然而，有了类型模式，现在可以**将 null 检查作为单独的案例标签应用**：

```java
static double getDoubleUsingSwitch(Object o) {
    return switch (o) {
        case String s -> Double.parseDouble(s);
        case null -> 0d;
        default -> 0d;
    };
}
```

如果没有特定的 null 案例标签，**总类型模式将匹配 null 值**：

```java
static double getDoubleUsingSwitchTotalType(Object o) {
    return switch (o) {
        case String s -> Double.parseDouble(s);
        case Object ob -> 0d;
    };
}
```

我们应该注意，switch 表达式不能同时具有 null 案例和总类型案例。

这样的 switch 语句将导致以下编译错误：

```java
[ERROR] Failed to execute goal ... on project core-java-17: Compilation failure
[ERROR] /D:/Projects/.../HandlingNullValuesUnitTest.java:[14,13] switch has both a total pattern and a default label
```

最后，使用模式匹配的 switch 语句仍然可以抛出 NullPointerException。

然而，它只有在 switch 块没有 null 匹配案例标签时才会这样做。

## 6. 结论

在本文中，**我们探索了 Java SE 17 中的 switch 表达式和语句的模式匹配**，这是一个预览特性。我们看到了通过在案例标签中使用模式，选择是通过模式匹配而不是简单的相等检查来确定的。

在示例中，我们涵盖了三种不同的模式类型，这些模式可以应用于 switch 语句。最后，我们探索了几个特定情况，包括覆盖所有值、排序子类和处理 null 值。

如常，完整的源代码