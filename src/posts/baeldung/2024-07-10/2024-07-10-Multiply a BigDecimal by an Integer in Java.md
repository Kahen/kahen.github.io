---
date: 2022-04-01
category:
  - Java
  - BigDecimal
tag:
  - BigDecimal
  - Integer
  - Java
head:
  - - meta
    - name: keywords
      content: Java, BigDecimal, Integer, 乘法
------
# Java中BigDecimal与Integer的乘法操作

## 1. 概述

在Java编程中，_Integer_和_BigDecimal_是我们日常使用中非常常见的两种数字类型。

在这个快速教程中，我们将探讨如何将_BigDecimal_数字与_Integer_数字相乘。

## 2. 问题介绍

一个例子可以快速解释问题。假设我们有一个_BigDecimal_数字和一个整数：
```java
final BigDecimal BIG = new BigDecimal("42.42");
final int INT = 10;
```

然后我们想要计算_42.42 x 10_的结果，作为另一个_BigDecimal_数字：
```java
final BigDecimal EXPECTED = new BigDecimal("424.2");
```

_BigDecimal_提供了一组数学计算方法，如_add()_, _divide()_, _subtract()_, _multiply()_等。这些方法允许我们方便地执行标准的算术计算。然而，我们应该注意，这些方法只能在两个_BigDecimal_对象之间进行数学运算。换句话说，它们只接受_BigDecimal_类型的参数。

因此，我们不能直接将_BigDecimal_与_Integer_相乘。

接下来，让我们看看如何执行计算。为了简单起见，我们将使用单元测试断言来验证解决方案是否产生了预期的结果。

## 3. 将_Integer_转换为_BigDecimal_实例

现在我们知道_BigDecimal.multiply()_只接受_BigDecimal_数字作为参数。所以，如果我们能将_Integer_对象转换为_BigDecimal_对象，我们就可以执行乘法计算。

**_BigDecimal_类有一个_valueOf()_方法，它允许我们从_Integer_获取一个_BigDecimal_数字：**
```java
BigDecimal result = BIG.multiply(BigDecimal.valueOf(INT));

assertEquals(0, EXPECTED.compareTo(result));
```

如果我们运行测试，测试就会通过。所以我们得到了预期的结果。

值得一提的是，除了使用_BigDecimal.valueOf(INT)_方法，我们还可以使用构造函数从_Integer_获取_BigDecimal_数字：_new BigDecimal(INT)_。

然而，**使用_valueOf()_方法是首选**。这是因为_BigDecimal_类有预定义的十一个常用实例：从零到十：
```java
ZERO_THROUGH_TEN = new BigDecimal[]{
  new BigDecimal(BigInteger.ZERO, 0L, 0, 1),
  new BigDecimal(BigInteger.ONE, 1L, 0, 1),
  new BigDecimal(BigInteger.TWO, 2L, 0, 1),
  new BigDecimal(BigInteger.valueOf(3L), 3L, 0, 1),
  ...
  new BigDecimal(BigInteger.TEN, 10L, 0, 2)
};

```

**_valueOf()_方法会检查给定的整数是否在“零到十”范围内，并尝试重用预定义的实例。** 另一方面，调用构造函数总是创建一个新的_BigDecimal_实例。

## 4. 关于断言的说明

我们已经编写了一个测试，它验证了我们的解决方案是有效的。然而，好奇的眼睛可能会看到断言看起来有点尴尬：
```java
assertEquals(0, EXPECTED.compareTo(result));
```

我们中的一些人可能想要简化它，以提高可读性：
```java
assertEquals(EXPECTED, result);
```

然而，如果我们用上面的断言运行测试，测试就会失败：
```java
org.opentest4j.AssertionFailedError:
Expected :424.2
Actual   :424.20
```

这是因为**_BigDecimal_的_equals()_方法不仅比较两个_BigDecimal_数字的值，它还检查两个_BigDecimal_数字的_小数位数_：**
```java
public boolean equals(Object x) {
  if (x instanceof BigDecimal xDec) {
    if (x == this) {
      return true;
    } else if (this.scale != xDec.scale) {
      return false;
    } else {
      ...
    }
  }
}
```

在我们的情况下，我们只对_BigDecimal_数字的值感兴趣。因此，我们需要调用_compareTo()_方法。

或者，我们可以使用AssertJ的_isEqualByComparingTo()_方法使代码更易于阅读：
```java
assertThat(result).isEqualByComparingTo(EXPECTED);
```

## 5. 结论

在这篇文章中，我们习了如何将_BigDecimal_与_Integer_相乘。由于_BigDecimal.multiply()_只接受一个_BigDecimal_对象作为参数，我们需要在调用_multiply()_方法之前将_Integer_对象转换为_BigDecimal_实例。

像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。翻译已经完成，以下是剩余部分的翻译：

### 5. 结论

在这篇文章中，我们学习了如何在Java中将BigDecimal与Integer相乘。由于BigDecimal.multiply()方法只接受BigDecimal对象作为参数，我们需要在调用multiply()方法之前将Integer对象转换为BigDecimal实例。

文章中展示的所有代码片段都可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK