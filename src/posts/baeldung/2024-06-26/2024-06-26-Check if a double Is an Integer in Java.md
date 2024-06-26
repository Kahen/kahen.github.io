---
date: 2024-06-27
category:
  - Java
  - 编程
tag:
  - double
  - 整数
  - 数值检查
head:
  - - meta
    - name: keywords
      content: Java, double, 整数, 检查, 数值处理
---

# 在Java中检查double是否为整数

## 1. 概述

处理数值数据通常需要精确处理。一个常见的场景是，我们需要检查一个_double_实际上是否是一个数学整数。

在本教程中，我们将探索执行此检查的各种技术，确保在我们的数值评估中的准确性和灵活性。

## 2. 问题介绍

首先，我们知道，_double_是一个浮点数据类型，可以表示小数值，并且比Java的_int_或_Integer_有更广的范围。另一方面，数学整数是一个整数数据类型，不能存储小数值。

当小数点后的值可以忽略或不存在时，_double_可以被视为表示一个数学整数。这意味着_double_持有一个没有小数部分的整数。例如，_42.0D_实际上是一个整数（_42_）。但是，_42.42D_不是。

在本教程中，我们将学习几种检查_double_是否为数学整数的方法。

## 3. 特殊的_double_值：_NaN_和无穷大

在我们深入检查_double_是否为整数之前，让我们首先看看一些特殊的_double_值：_Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY,_ 和 _Double.NaN._

**_Double.NaN_意味着该值是“不是数字”。因此，它也不是一个整数。**

另一方面，_Double.POSITIVE_INFINITY_和_Double.NEGATIVE_INFINITY_在传统意义上并不是具体的数字。它们代表无穷大，这是一个特殊值，表示一个数学运算的结果超出了双精度浮点数的最大可表示有限值。因此，**这两个无穷大值也不是整数。**

此外，**_Double_类提供了_isNan()_和_isInfinite()_方法来判断一个_Double_对象是否是NaN或无穷大。** 因此，我们可以在检查_double_是否为整数之前，先执行这些特殊值检查。

为了简单起见，让我们创建一个方法来执行此任务，以便在我们的代码示例中重用：

```java
boolean notNaNOrInfinity(double d) {
    return !(Double.isNaN(d) || Double.isInfinite(d));
}
```

## 4. 将_double_强制转换为_int_

要确定一个_double_是否是一个整数，最直接的想法可能是**首先将_double_强制转换为_int_，然后比较转换后的_int_与原始的** _double_。如果它们的值相等，那么_double_就是一个整数。

接下来，让我们实现并测试这个想法：

```java
double d1 = 42.0D;
boolean d1IsInteger = notNaNOrInfinity(d1) && (int) d1 == d1;
assertTrue(d1IsInteger);

double d2 = 42.42D;
boolean d2IsInteger = notNaNOrInfinity(d2) && (int) d2 == d2;
assertFalse(d2IsInteger);
```

正如测试所示，这种方法奏效了。

然而，我们知道，**_double_的范围比Java中的_int_要广。** 因此，让我们编写一个测试来检查如果_double_超出_int_范围会发生什么：

```java
double d3 = 2.0D * Integer.MAX_VALUE;
boolean d3IsInteger = notNaNOrInfinity(d3) && (int) d3 == d3;
assertTrue(!d3IsInteger); // `<-- 如果超出Integer的范围则失败
```

在这个测试中，我们将_2.0D * Integer.MAX_VALUE_赋值给_double d3_。显然，**这个值是一个数学整数，但是超出了Java整数的范围。** 结果是，**这种方法在给定的_double_超出Java整数范围时将不起作用。**

接下来，让我们探索替代方案，以解决_double_超出整数范围的场景。

## 5. 使用取模运算符‘%’

我们提到，如果一个_double_是一个整数，它就没有小数部分。因此，**我们可以通过测试_double_是否能被1整除**来测试这一点。为此，我们可以使用取模运算符：

```java
double d1 = 42.0D;
boolean d1IsInteger = notNaNOrInfinity(d1) && (d1 % 1) == 0;
assertTrue(d1IsInteger);

double d2 = 42.42D;
boolean d2IsInteger = notNaNOrInfinity(d2) && (d2 % 1) == 0;
assertFalse(d2IsInteger);

double d3 = 2.0D * Integer.MAX_VALUE;
boolean d3IsInteger = notNaNOrInfinity(d3) && (d3 % 1) == 0;
assertTrue(d3IsInteger);
```

正如测试所示，**这种方法即使在_double_超出整数范围时也能奏效。**

## 6. 对_double_进行四舍五入

标准_Math_类提供了一系列的四舍五入方法：

- _ceil()_ – 示例：_ceil(42.0001) = 43; ceil(42.999) = 43_
- _floor()_ – 示例：_floor(42.0001) = 42; floor(42.9999) = 42_
- _round()_ – 示例：_round(42.4) = 42; round(42.5) = 43_
- _rint()_ – 示例：_rint(42.4) = 42; rint(42.5) = 43_

我们不会详细讨论列表中的_Math_四舍五入方法。所有这些方法都有一个共同特点：它们将提供的_double_四舍五入到接近的数学整数。

**如果一个_double_表示一个数学整数，那么在将其传递到上述列表中的任何四舍五入方法之后，结果必须等于输入的_double_**，例如：

- _ceil(42.0) = 42_
- _floor(42.0) = 42_
- _round(42.0) = 42_
- _rint(42.0) = 42_

因此，我们可以使用任何四舍五入方法来执行检查。

接下来，让我们以_Math.floor()_为例来演示这是如何完成的：

```java
double d1 = 42.0D;
boolean d1IsInteger = notNaNOrInfinity(d1) && Math.floor(d1) == d1;
assertTrue(d1IsInteger);

double d2 = 42.42D;
boolean d2IsInteger = notNaNOrInfinity(d2) && Math.floor(d2) == d2;
assertFalse(d2IsInteger);

double d3 = 2.0D * Integer.MAX_VALUE;
boolean d3IsInteger = notNaNOrInfinity(d3) && Math.floor(d3) == d3;
assertTrue(d3IsInteger);
```

正如测试结果所证明的，**这个解决方案即使在_double_超出整数范围时仍然有效。**

当然，如果我们愿意，我们可以将_floor()_方法替换为_ceil(), round(),_或_rint()_。

## 7. 使用Guava

Guava是一个广泛使用的开源通用工具库。**Guava的_DoubleMath_类提供了_isMathematicalInteger()_方法。** 方法名称暗示了这正是我们要找的解决方案。

要包含Guava，我们需要将其依赖项添加到我们的_pom.xml_：

```xml
<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`33.0.0-jre`</version>`
`</dependency>`
```

最新版本信息可以在Maven Repository上找到。

接下来，让我们编写一个测试来验证_DoubleMath.isMathematicalInteger()_是否按预期工作：

```java
double d1 = 42.0D;
boolean d1IsInteger = DoubleMath.isMathematicalInteger(d1);
assertTrue(d1IsInteger);

double d2 = 42.42D;
boolean d2IsInteger = DoubleMath.isMathematicalInteger(d2);
assertFalse(d2IsInteger);

double d3 = 2.0D * Integer.MAX_VALUE;
boolean d3IsInteger = DoubleMath.isMathematicalInteger(d3);
assertTrue(d3IsInteger);
```

正如测试结果所证明的，**该方法无论输入_double_是否在Java整数范围内，都能始终产生预期的结果。**

敏锐的眼睛可能已经注意到我们在上面的测试中没有调用_notNaNOrInfinity()_来检查_NaN_和无穷大。这是因为**_DoubleMath.isMathematicalInteger()_方法也处理了_NaN_和无穷大：**

```java
boolean isInfinityInt = DoubleMath.isMathematicalInteger(Double.POSITIVE_INFINITY);
assertFalse(isInfinityInt);

boolean isNanInt = DoubleMath.isMathematicalInteger(Double.NaN);
assertFalse(isNanInt);
```

## 8. 结论

在本文中，我们首先讨论了“一个_double_表示一个数学整数”的含义。然后，我们探索了不同的方法来检查_double_是否真的符合数学整数的条件。

虽然直接将_double_强制转换为_int_（即，_theDouble == (