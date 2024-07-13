---
date: 2022-04-01
category:
  - Java
tag:
  - Infinity
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Infinity, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY
------
# Java中的无穷大概念

在本教程中，我们将探讨Java中的无穷大概念以及如何使用它。

## 2. Java中的数字简介

在数学中，我们有一组实数和一组整数。显然，这两组数字都是无限的，并且都包含正无穷和负无穷。

在计算机世界中，我们需要一个内存位置来存储这些集合的值，而这个位置必须是有限大小的，因为计算机的内存是有限的。

**对于Java中的_int_类型，不包括无穷大的概念。我们只能存储适合我们选择的内存位置的整数。**

**对于实数，我们也有正无穷或负无穷的概念。** Java中的32位_float_类型和64位_double_类型都支持这一点。接下来，我们将使用_double_类型作为示例，因为它也是Java中用于实数的最常用类型，因为它具有更好的精度。

## 3. 正无穷

常量_Double.POSITIVE_INFINITY_保存了类型为_double_的正无穷大值。这个值是通过将_1.0_除以_0.0_得到的。它的_String_表示是_Infinity_。这是一个约定，其十六进制表示是_7FF0000000000000_。任何具有这个位值的_double_变量都包含正无穷大。

## 4. 负无穷

常量_Double.NEGATIVE_INFINITY_保存了类型为_double_的负无穷大值。这个值是通过将_-1.0_除以_0.0_得到的。它的_String_表示是_-Infinity_。这也是一个约定，其十六进制表示是_FFF0000000000000_。任何具有这个位值的_double_变量都包含负无穷大。

## 5. 使用无穷大进行运算

让我们声明一个名为_positiveInfinity_的_double_变量，并将其值赋为_Double.POSITIVE_INFINITY_，另一个名为_negativeInfinity_的_double_变量，并将其值赋为_Double.NEGATIVE_INFINITY_。然后，我们得到以下运算结果：

```java
Double positiveInfinity = Double.POSITIVE_INFINITY;
Double negativeInfinity = Double.NEGATIVE_INFINITY;

assertEquals(Double.NaN, (positiveInfinity + negativeInfinity));
assertEquals(Double.NaN, (positiveInfinity / negativeInfinity));
assertEquals(Double.POSITIVE_INFINITY, (positiveInfinity - negativeInfinity));
assertEquals(Double.NEGATIVE_INFINITY, (negativeInfinity - positiveInfinity));
assertEquals(Double.NEGATIVE_INFINITY, (positiveInfinity * negativeInfinity));
```

在这里，常量_Double.NaN_表示一个不是数字的结果。

让我们看看与正无穷大和正数的数学运算：

```java
Double positiveInfinity = Double.POSITIVE_INFINITY;
Double negativeInfinity = Double.NEGATIVE_INFINITY;
double positiveNumber = 10.0;

assertEquals(Double.POSITIVE_INFINITY, (positiveInfinity + positiveNumber));
assertEquals(Double.NEGATIVE_INFINITY, (negativeInfinity + positiveNumber));

assertEquals(Double.POSITIVE_INFINITY, (positiveInfinity - positiveNumber));
assertEquals(Double.NEGATIVE_INFINITY, (negativeInfinity - positiveNumber));

assertEquals(Double.POSITIVE_INFINITY, (positiveInfinity * positiveNumber));
assertEquals(Double.NEGATIVE_INFINITY, (negativeInfinity * positiveNumber));

assertEquals(Double.POSITIVE_INFINITY, (positiveInfinity / positiveNumber));
assertEquals(Double.NEGATIVE_INFINITY, (negativeInfinity / positiveNumber));

assertEquals(Double.NEGATIVE_INFINITY, (positiveNumber - positiveInfinity));
assertEquals(Double.POSITIVE_INFINITY, (positiveNumber - negativeInfinity));

assertEquals(0.0, (positiveNumber / positiveInfinity));
assertEquals(-0.0, (positiveNumber / negativeInfinity));
```

现在，让我们看看与无穷大和负数的数学运算：

```java
Double positiveInfinity = Double.POSITIVE_INFINITY;
Double negativeInfinity = Double.NEGATIVE_INFINITY;
double negativeNumber = -10.0;

assertEquals(Double.POSITIVE_INFINITY, (positiveInfinity + negativeNumber));
assertEquals(Double.NEGATIVE_INFINITY, (negativeInfinity + negativeNumber));

assertEquals(Double.POSITIVE_INFINITY, (positiveInfinity - negativeNumber));
assertEquals(Double.NEGATIVE_INFINITY, (negativeInfinity - negativeNumber));

assertEquals(Double.NEGATIVE_INFINITY, (positiveInfinity * negativeNumber));
assertEquals(Double.POSITIVE_INFINITY, (negativeInfinity * negativeNumber));

assertEquals(Double.NEGATIVE_INFINITY, (positiveInfinity / negativeNumber));
assertEquals(Double.POSITIVE_INFINITY, (negativeInfinity / negativeNumber));

assertEquals(Double.NEGATIVE_INFINITY, (negativeNumber - positiveInfinity));
assertEquals(Double.POSITIVE_INFINITY, (negativeNumber - negativeInfinity));

assertEquals(-0.0, (negativeNumber / positiveInfinity));
assertEquals(0.0, (negativeNumber / negativeInfinity));
```

有一些经验法则可以帮助我们更好地记住这些运算：

- 将负无穷和正无穷分别替换为_Infinity_和_-Infinity_，然后首先执行符号运算。
- 对于任何非零数字和无穷大之间的运算，你将得到无穷大的结果。
- 当我们添加或除以正负无穷大时，我们会得到_不是一个数字_的结果。

## 6. 除以零

除以零是除法的一个特殊情况，因为它会产生正负无穷大值。

例如，让我们取一个_double_值_d_并检查以下除以零的结果：

```java
double d = 1.0;

assertEquals(Double.POSITIVE_INFINITY, (d / 0.0));
assertEquals(Double.NEGATIVE_INFINITY, (d / -0.0));
assertEquals(Double.NEGATIVE_INFINITY, (-d / 0.0));
assertEquals(Double.POSITIVE_INFINITY, (-d / -0.0));
```

## 7. 结论

在本文中，我们探讨了Java中正负无穷大的概念和使用。实现和代码片段可以在GitHub上找到。翻译已完成，以下是翻译的剩余部分：

在本文中，我们探索了Java中正负无穷大的概念和使用。实现和代码片段可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/427b49844c6d9d8dcaa327fbdae79974?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK