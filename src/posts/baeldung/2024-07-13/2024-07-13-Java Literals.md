---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java Literals
  - Programming
head:
  - - meta
    - name: keywords
      content: Java, Literals, Programming
---
# Java字面量

在Java编程语言中，我们会使用大量的字面量。

在本教程中，我们将查看所有类型的字面量以及如何使用它们。

## 2. Java字面量是什么？
**Java字面量是我们在代码中指定为常量值的任何值。**它可以是任何类型 - 整数、浮点数、双精度、长整型、字符串、字符或布尔值。

在以下示例中，数字_1_和字符串_literal_string_是字面量。

```java
int x = 1;
String s = "literal_string";
```

在使用字面量时，同样重要的是要很好地理解Java基本类型。

## 3. 字面量的类型
让我们通过一些示例来查看不同类型的字面量。

### 3.1. 整数字面量
对于整数（int、long、short、byte），我们可以用不同的方式指定它们。

首先，我们可以使用**十进制字面量（基数10）**。这些是最常用的，因为它们是我们日常使用的数字。

```java
int x = 1;
```

其次，我们可以以**八进制形式（基数8）**指定整数字面量。在这种形式中，它们必须以**0**开头。

```java
int x = 05;
```

第三，整数字面量可以以**十六进制形式（基数16）**使用。它们必须以**0x**或**0X**开头。

```java
int x = 0x12ef;
```

最后，我们有**二进制形式（基数2）**。这种形式是在Java 1.7中引入的，这些字面量必须以**0b**或**0B**开头。

```java
int x = 0b1101;
```

在上面的示例中，我们可以将_int_更改为任何整数类型，只要字面量值不超过类型限制。

这些字面量默认被视为_int_。对于_long_、_short_或_byte_，编译器会检查值是否接近类型的限制，如果是，它将被视为该类型的字面量。

我们可以通过使用_l_或_L_来覆盖默认的_int_字面量，以表示长整型字面量。我们仅在字面量值超过_int_限制时才需要使用此方法。

### 3.2. 浮点字面量
浮点字面量默认被视为_double_。我们也可以通过使用_d_或_D_来指定字面量是_double_。这不是强制性的，但这是一种良好的实践。

我们可以通过使用_f_或_F_来**指定我们想要一个_float_**。这对于_float_类型的字面量是强制性的。

浮点字面量只能以十进制形式（基数10）指定：

```java
double d = 123.456;
float f = 123.456;
float f2 = 123.456d; // 此示例将因类型不匹配而无法编译
float f3 = 123.456f;
```

第二和第三个示例将因类型不匹配而无法编译。

### 3.3. 字符字面量
对于_char_数据类型，字面量可以有几种形式。

单引号字符很常见，特别是对于特殊字符。

```java
char c = 'a';
char c2 = '\n';
```

我们可以**在单引号之间使用单个字符或特殊字符**。

用于字符的整数值被转换为该字符的Unicode值：

```java
char c = 65;
```

我们可以像整数字面量一样指定它。

最后，我们可以使用Unicode表示法：

```java
char c = '\u0041';
```

最后两个示例中的表达式评估为字符_A_。

### 3.4. 字符串字面量
双引号中的任何文本都是_String_字面量：

```java
String s = "string_literal";
```

_String_字面量只能在一行上。为了拥有多行_String_，我们可以使用在编译时执行的表达式：

```java
String multiLineText = "When we want some text that is on more than one line,\n"
+ "then we can use expressions to add text to a new line.\n";
```

## 4. 短整型和字节字面量
在上面，我们看到了如何声明每种类型的字面量。对于所有类型，除了_byte_和_short_，我们不需要创建变量。我们可以直接使用字面量值。

例如，在向方法传递参数时，我们可以传递字面量：

```java
static void literals(int i, long l, double d, float f, char c, String s) {
    // do something
}
// 调用literals方法
literals(1, 123L, 1.0D, 1.0F, 'a', "a");
```

在上面的例子中，只有_F_是强制性的标记。

令人惊讶的是，对于_byte_和_short_类型会出现问题：

```java
static void shortAndByteLiterals(short s, byte b) {
    // do something
}
// 调用方法
shortAndByteLiterals(1, 0); // 无法编译
```

尽管有这个限制，但有两种解决方案。

第一种解决方案是使用我们之前声明的一些变量：

```java
short s = 1;
byte b = 1;
shortAndByteLiterals(s, b);
```

另一个选择是将字面量值进行类型转换：

```java
shortAndByteLiterals((short) 1, (byte) 0);
```

这是必要的，以便让编译器使用适当的类型。

## 5. 结论
在本文中，我们查看了在Java中指定和使用字面量的不同方式。