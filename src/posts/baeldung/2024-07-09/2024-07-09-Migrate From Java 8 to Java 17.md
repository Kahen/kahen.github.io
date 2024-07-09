---
date: 2024-07-09
category:
  - Java
  - 编程
tag:
  - Java 8
  - Java 17
head:
  - - meta
    - name: keywords
      content: Java, 编程, Java 8, Java 17, 迁移指南
---

# 从Java 8迁移到Java 17 | Baeldung

## 1. 概述

我们经常面临是否迁移到Java的新版本或继续使用现有版本的困境。换句话说，我们需要在新特性和增强功能与迁移所需的总工作量之间进行权衡。

在本教程中，**我们将介绍Java较新版本中一些极其有用的特性**。这些特性不仅易于学习，而且在计划从Java 8迁移到Java 17时，可以快速实施，几乎不需要太多努力。

## 2. 使用 _String_

让我们来看一看_String_ 类的一些有趣增强。

### 2.1. 紧凑字符串

Java 9引入了紧凑字符串，这是优化_String_ 对象内存消耗的性能增强。

**简单来说，一个_String_ 对象将在内部以_byte[]_ 而不是_char[]_ 表示**。解释一下，由于Java内部使用UTF-16，每个_char_ 由2个字节组成。在大多数情况下，_String_ 对象是可以用单个_byte_ 表示的英文单词，即LANTIN-1表示。

Java根据_String_ 对象的实际内容内部处理这种表示：对于LANTIN-1字符集使用_byte[]_，如果内容包含任何特殊字符（UTF-16）则使用_char[]_。因此，这对使用_String_ 对象的开发者来说是完全透明的。

直到Java 8，_String_ 在内部以_char[]_ 表示：

```java
char[] value;
```

从Java 9开始，它将是一个 _byte[]_：

```java
byte[] value;
```

### 2.2. 文本块

在Java 15之前，嵌入多行代码片段需要显式的行终止符、_String_ 连接和分隔符。为了解决这个问题，**Java 15引入了文本块，它允许我们更或少地按原样嵌入代码片段和文本序列**。这在处理像HTML、JSON和SQL这样的字面量片段时特别有用。

文本块是_String_ 表示的替代形式，可以在任何可以使用普通双引号_String_ 字面量的地方使用。例如，多行_String_ 字面量可以表示，而无需显式使用行终止符和_String_ 连接：

```java
// 使用文本块
String value = """
            Multi-line
            Text
            """;
```

在此功能之前，多行文本不太易读，并且表示起来比较复杂：

```java
// 使用字面量字符串
String value = "Multi-line"
                + "\\n" + "line separator"
                + "Text"
                + "\\n";
String str = "Multi-line\nText\n";
```

### 2.3. 新的 _String_ 方法

在处理_String_ 对象时，我们经常倾向于使用第三方库，例如Apache Commons，用于常见的_String_ 操作。特别是，这是检查空白/空值和重复、缩进等其他_String_ 操作的实用函数的情况。

随后，Java 11和Java 12引入了许多这样的便捷功能，以便我们可以依赖内置功能来进行这些常规_String_ 操作：_isBlank(), repeat(), indent(), lines(), strip(),_ 和 _transform()_。

让我们看看它们是如何工作的：

```java
assertThat("  ".isBlank());
assertThat("Twinkle ".repeat(2)).isEqualTo("Twinkle Twinkle ");
assertThat("Format Line".indent(4)).isEqualTo("    Format Line\n");
assertThat("Line 1 \n Line2".lines()).asList().size().isEqualTo(2);
assertThat(" Text with white spaces   ".strip()).isEqualTo("Text with white spaces");
assertThat("Car, Bus, Train".transform(s1 -> Arrays.asList(s1.split(","))).get(0)).isEqualTo("Car");
```

## 3. 记录

数据传输对象（DTO）在对象之间传递数据时很有用。然而，创建DTO伴随着大量的样板代码，例如字段、构造函数、getter/setter、_equals()_、_hashcode()_ 和 _toString()_ 方法：

```java
public class StudentDTO {
    private int rollNo;
    private String name;

    // 构造函数
    // getters & setters
    // equals(), hashcode() & toString() 方法
}
```

进入记录类，**这是一种特殊类型的类，可以以更紧凑的方式定义不可变数据对象，并且与Project Lombok相同**。最初作为Java 14的预览功能引入，记录类从Java 16开始成为标准特性：

```java
public record Student(int rollNo, String name) {
}
```

正如我们所看到的，记录类只需要字段的类型和名称。随后，编译器生成了_equals()_、_hashCode()_ 和 _toString()_ 方法，以及公共构造函数、私有和最终字段：

```java
Student student = new Student(10, "Priya");
Student student2 = new Student(10, "Priya");

assertThat(student.rollNo()).isEqualTo(10);
assertThat(student.name()).isEqualTo("Priya");
assertThat(student.equals(student2));
assertThat(student.hashCode()).isEqualTo(student2.hashCode());
```

## 4. 有用的 _NullPointerException_ s

_NullPointerException_ s (NPEs) 是每个开发者都会遇到的非常常见的异常。在大多数情况下，编译器抛出的错误消息对于确定哪个对象是 _null_ 并不有用。此外，最近的趋势是使用函数式编程和方法链来编写表达性和紧凑的代码，这使得调试NPEs更加困难。

让我们看一个使用方法链的示例：

```java
student.getAddress().getCity().toLowerCase();
```

在这里，如果在这行抛出NPE，很难确定确切的 _null_ 对象位置，因为有三个可能的对象可以是 _null_。

从Java 14开始，**我们现在可以指示编译器使用额外的VM参数来获取有用的NPE消息：**

```java
-XX:+ShowCodeDetailsInExceptionMessages
```

启用此选项后，错误消息将更加精确：

```java
Cannot invoke "String.toLowerCase()" because the return value of "com.baeldung.java8to17.Address.getCity()" is null
```

请注意，**从Java 15开始，此标志默认启用。**

## 5. 模式匹配

**模式匹配解决了程序中常见的逻辑，即以更简洁、更安全的方式有条件地从对象中提取组件。**

让我们看看支持Java模式匹配的两个特性。

### 5.1. 增强的 _instanceOf_ 运算符

每个程序都有的常见逻辑是检查某种类型或结构，将其转换为所需的类型以进行进一步处理。这涉及到大量的样板代码。

让我们看一个例子：

```java
if (obj instanceof Address) {
    Address address = (Address) obj;
    city = address.getCity();
}
```

在这里，我们可以看到涉及三个步骤：一个测试（确认类型）、一个转换（转换为特定类型）和一个新局部变量（进一步处理它）。

自Java 16以来，模式匹配的 _instanceof_ 运算符是一个标准特性，以解决这个问题。现在，我们可以直接以更易读的方式访问目标类型：

```java
if (obj instanceof Address address) {
    city = address.getCity();
}
```

### 5.2. Switch表达式

**Switch表达式（Java 14）就像常规表达式一样，它们评估或返回单个值，并且可以用于语句中。** 此外，Java 17允许我们在Switch表达式中使用模式匹配（预览功能）：

```java
double circumference = switch(shape) {
    case Rectangle r -> 2 * r.length() + 2 * r.width();
    case Circle c -> 2 * c.radius() * Math.PI;
    default -> throw new IllegalArgumentException("Unknown shape");
};
```

正如我们所注意到的，有一种新的 _case_ 标签语法。_switch_ 表达式使用 “ _case L ->_” 标签而不是 “ _case_ _L:_” 标签。**此外，不需要显式的 _break_ 语句来防止穿透**。**此外，** _switch_ 选择器表达式可以是任何类型。

在使用传统的 “ _case_ _L:_” 标签的Switch表达式时，我们必须使用 _yield_ 关键字（而不是 _break_ 语句）来返回值。

## 6. 封闭类

继承的主要目的是代码的可重用性。然而，某些业务领域模型可能只需要预定义的一组类来扩展基类或接口。这在使用领域驱动设计时特别有价值。

为了增强这种行为，Java 17提供了封闭类作为标准特性。简而言之，**一个封闭的类或接口只能被允许这样做的类和接口扩展或实现。**

让我们看看如何定义一个封闭类：

```java
public sealed class Shape permits Circle, Square, Triangle {
}
```

在这里，《Shape_ 类只允许继承到一组受限制的类中。此外，**被允许的子类必须定义以下修饰符之一：_final_、_sealed_ 或 _non-