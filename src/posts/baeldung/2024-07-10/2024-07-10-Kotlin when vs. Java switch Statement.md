---
date: 2022-11-01
category:
  - Kotlin
  - Java
tag:
  - when
  - switch
head:
  - - meta
    - name: keywords
      content: Kotlin when, Java switch, 比较, 语法, 特性
---
# Kotlin 的 when 表达式与 Java 的 switch 语句

Kotlin 和 Java 作为构建健壮且可扩展应用的流行选择而脱颖而出。这两种语言都提供了独特的特性和语法，有助于它们的优势。

在本教程中，我们将深入探讨 Kotlin 的强大 when 表达式和 Java 的传统 switch 语句，比较它们的使用、语法和能力。通过检查代码示例并提供详细的解释，我们旨在帮助理解这些结构的优势和细微差别。

Java 的 switch 语句虽然是语言的长期特性，但与 Kotlin 的 when 表达式相比有其局限性。在 Java 7 之前，switch 语句仅支持原始类型和枚举类型。从 Java 7 开始，它还支持 Strings。让我们探索一个使用 Java 的 switch 语句的简单示例：

```java
int number = 3;
String description;
switch (number) {
    case 0:
        description = "Zero";
        break;
    case 1:
    case 2:
        description = "One or Two";
        break;
    case 3:
    case 4:
    case 5:
        description = "Between Three and Five";
        break;
    default:
        description = "Other";
}
System.out.println(description);
```

在这段代码中，我们用值三初始化了一个整数变量 number，并使用 switch 语句根据 number 的值确定 String 变量 description 的内容。default 情况涵盖了任何其他值，分配了 "Other"。然后，description 的最终值被打印到控制台，在这个特定实例中将打印 "Between Three and Five"。

Kotlin 引入了多功能的 when 表达式，这是 Java 的 switch 语句的更强大和富有表现力的替代品。when 表达式允许开发人员用简洁易读的语法替换一系列 if-else 语句。让我们将第一个示例重写为 when 表达式：

```kotlin
fun describeNumber(number: Int): String {
    return when (number) {
        0 -> "Zero"
        1, 2 -> "One or Two"
        in 3..5 -> "Between Three and Five"
        else -> "Other"
    }
}
```

我们的 describeNumber() 函数中的 when 表达式处理相同的比较并返回与上述 switch 语句相同的描述。注意我们如何一次处理更复杂的比较，同时保持相同的逻辑含义。也就是说，when 表达式可以一次性检查多个值，使用逗号分隔的值进行比较，甚至可以检查数字范围。**最后，如果 number 与我们的任何表达式都不匹配，我们的代码将执行 else 块。**

首先，我们来看看 Java 中的 switch 语句和 Kotlin 中的 when 表达式的相似之处：

- Java 中的 switch 语句和 Kotlin 中的 when 表达式都用于模式匹配。它们通常允许我们将表达式的值与一个或多个可能的值进行比较，并相应地执行不同的代码块。
- 这两种结构都支持多个分支，允许我们为不同的情况定义不同的操作。

最后，我们将强调 Java 中的 switch 语句和 Kotlin 中的 when 的不同之处：

- Kotlin 的 when 在定义条件方面比 Java 的 switch 更灵活。它允许复杂的条件，包括范围、类型检查和其他表达式。
- 在 Kotlin 的 when 中，我们不需要使用 break 语句。when 表达式默认不会继续执行下一个表达式。

在本文中，我们比较了 Kotlin 的强大 when 表达式和 Java 的传统 switch 语句。

Kotlin 的 when 表达式提供了一种更多样化和富有表现力的语法，允许开发人员简化他们的代码，用简洁易读的结构替换冗长的 if-else 结构。另一方面，Java 的 switch 语句虽然是一个成熟的功能，但有其局限性，例如从 Java 7 开始只支持原始类型、枚举类型和 String 类型。

最后，我们查看了 Java 中的 switch 语句和 Kotlin 中的 when 表达式的相似之处和不同之处。

如常，这些示例的完整实现可以在 GitHub 上找到。好的，翻译已经完成。以下是翻译的剩余部分：

文章的最后，我们比较了 Kotlin 的强大 when 表达式和 Java 的传统 switch 语句。

Kotlin 的 when 表达式提供了一种更多样化和富有表现力的语法，允许开发人员简化他们的代码，用简洁易读的结构替换冗长的 if-else 结构。另一方面，Java 的 switch 语句虽然是一个成熟的功能，但有其局限性，例如从 Java 7 开始只支持原始类型、枚举类型和 String 类型。

最后，我们查看了 Java 中的 switch 语句和 Kotlin 中的 when 表达式的相似之处和不同之处。

如常，这些示例的完整实现可以在 GitHub 上找到。

![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png)![img](https://secure.gravatar.com/avatar/2b7c820e884a055a46b81eb79a49cd12?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/brandon_ward_headshot-150x150.jpeg)![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK