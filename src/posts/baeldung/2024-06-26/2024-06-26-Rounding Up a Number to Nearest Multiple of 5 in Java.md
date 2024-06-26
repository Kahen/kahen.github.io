---
date: 2024-06-26
category:
  - Java
  - 编程
tag:
  - 编程技巧
  - 数学运算
head:
  - - meta
    - name: keywords
      content: Java, 数学运算, 取整技巧
---

# Java中将数字四舍五入到最近的5的倍数

## 1. 引言

在许多应用中，有时会需要将数值四舍五入到特定数字的最近倍数。

**在本教程中，我们将探讨如何在Java中将数字四舍五入到5的最近倍数。**

## 2. 使用基本算术

将数字四舍五入到5的最近倍数的一种方法是使用基本的算术运算。

假设我们有以下Java示例：

```java
public static int originalNumber = 18;
public static int expectedRoundedNumber = 20;
public static int nearest = 5;
```

**这里，_originalNumber_ 是我们想要四舍五入的起始值，_expectedRoundedNumber_ 是四舍五入后预期的结果，而 _nearest_ 表示我们希望将数字四舍五入到的倍数（在本例中为5）。**

让我们看看以下简单的方法来完成转换任务：

```java
@Test
public void givenNumber_whenUsingBasicMathOperations_thenRoundUpToNearestMultipleOf5() {
    int roundedNumber = (originalNumber % nearest == 0) ? originalNumber : ((originalNumber / nearest) + 1) * nearest;
    assertEquals(expectedRoundedNumber, roundedNumber);
}
```

**此策略使用基本算术运算，检查原始数字是否能被期望的倍数整除；如果不能，它通过调整商数并乘以最近的倍数来进行四舍五入。**

## 3. 使用 Math.ceil()

另一种方法是使用Java中的Math.ceil()方法以及一些数学运算：

```java
@Test
public void givenNumber_whenUsingMathCeil_thenRoundUpToNearestMultipleOf5() {
    int roundedNumber = (int) (Math.ceil(originalNumber / (float) (nearest)) * nearest);
    assertEquals(expectedRoundedNumber, roundedNumber);
}
```

这里，我们通过获取大于或等于原始数字除以指定倍数结果的最小值来确保四舍五入过程。

## 4. 使用 Math.floor()

要将数字四舍五入到小于或等于参数的最大双精度浮点数，我们应该使用Math.floor()方法：

```java
@Test
public void givenNumber_whenUsingMathFloor_thenRoundUpToNearestMultipleOf5() {
    int roundedNumber = (int) (Math.floor((double) (originalNumber + nearest / 2) / nearest) * nearest);
    assertEquals(expectedRoundedNumber, roundedNumber);
}
```

这意味着，这种方法加上最近的倍数的一半，然后执行向下取整，确保与最近的倍数对齐。

## 5. 使用 Math.round()

与上述方法相同，但这个方法如果参数是float则返回int值，如果参数是double则返回long值：

```java
@Test
public void givenNumber_whenUsingMathRound_thenRoundUpToNearestMultipleOf5() {
    int roundedNumber = Math.round(originalNumber / (float) (nearest)) * nearest;
    assertEquals(expectedRoundedNumber, roundedNumber);
}
```

Math.round()方法通过将原始数字除以期望的倍数得到的商四舍五入到最近的整数来实现四舍五入。

## 6. 结论

总之，我们在本教程中探讨了多种在Java中将数字四舍五入到5的最近倍数的方法。根据我们的特定需求，我们可以选择最适合我们需要的方法。

如常，本文的完整代码示例可以在GitHub上找到。