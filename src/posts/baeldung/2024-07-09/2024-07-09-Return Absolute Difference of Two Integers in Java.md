---
date: 2022-04-01
category:
  - Java
  - Math
tag:
  - Absolute Difference
  - Integer
  - Overflow
  - Underflow
head:
  - - meta
    - name: keywords
      content: Java, Math, Absolute Difference, Integer, Overflow, Underflow
---
# Java中返回两个整数的绝对差值

在本教程中，我们将探讨如何获取两个给定整数之间的绝对差值。

## 2. 使用 _Math.abs()_ 方法

问题相当直接。让我们通过一些例子快速理解：

- _num1=3, num2=4_: _absDiff=1_
- _num1=3, num2=-4_: _absDiff=7_
- _num1=-3, num2=-4_: _absDiff=1_

从上述例子中可以看出，**给定两个整数，_num1_ 和 _num2，_ 结果是 _(num1 – num2)_ 的绝对值。** 进一步地，Java标准库提供了 _Math.abs()_ 方法来返回绝对值。因此，我们可以很容易地将计算转换为Java代码：

```java
int absDiff(int num1, int num2) {
    int result = Math.abs(num1 - num2);
    System.out.println("绝对差值: " + result);
    return result;
}
```

正如我们所看到的，_absDiff()_ 方法返回结果。同时，它也打印了结果。

为了简单起见，让我们使用单元测试断言来验证方法是否按预期工作：

```java
int diff1 = absDiff(100, -200);
assertEquals(300, diff1);

int diff2 = absDiff(100, 200);
assertEquals(100, diff2);
```

当我们运行测试时，测试通过。所以，我们已经解决了问题。然而，实现中隐藏了一个潜在问题。接下来，让我们找出问题所在。

## 3. 溢出/下溢问题

我们知道Java的_int_是一个有符号的32位整数。换句话说，**Java整数的范围是 _-2147483648_ 到 _2147483647_**。

现在，让我们重新审视我们的实现。我们有计算：_num1 – num2_。因此，结果可能超过_Integer.MAX_VALUE_，例如，当我们将_Integer.MAX_VALUE_ 和 _-200_ 传递给 _absDiff()_ 方法时。接下来，让我们用这两个整数调用方法，看看会发生什么。

首先，让我们手动计算一下，看看预期结果是什么：

```java
Result = Integer.MAX_VALUE - (-200)
       = 2147483647 + 200
      = 2147483847
```

然而，如果我们调用我们的_absDiff()_ 方法，没有异常发生，我们看到的输出是：

```java
绝对差值: 2147483449
```

显然，结果不正确。这是因为**发生了整数溢出**。当然，计算结果可能小于_Integer.MIN_VALUE_，例如，_absDiff(Integer.MIN_VALUE, 200)_。在这种情况下，我们称之为下溢。

接下来，让我们看看如何解决溢出/下溢问题。

## 4. 使用不同的数据类型

在Java中，有些数字类型的范围比_int_大，比如_long_或_BigInteger_。为了避免溢出/下溢陷阱，我们可以**在执行计算之前将_int_参数转换为这些类型之一**。让我们以_long_为例，并在一个新的方法中实现逻辑：

```java
long absDiffAsLong(int num1, int num2) {
    return Math.abs((long) num1 - num2);
}
```

现在，让我们测试一下当我们传递_Integer.MAX_VALUE_ 和 _-200_ 时，它是否给出了预期的结果：

```java
long diff = absDiffAsLong(Integer.MAX_VALUE, -200);
assertEquals(Integer.MAX_VALUE + 200L, diff);
```

如果我们运行测试，它会通过。因此，这种方法解决了溢出/下溢问题。但值得一提的是，返回类型是_long_而不是_int_。

如果调用者期望结果是_long_，这是可以的。否则，如果需要_int_，我们必须将_long_值转换为_int_。这是不方便的。此外，如果我们不正确地进行_long_到_int_的转换，溢出/下溢也可能发生。

接下来，让我们看看我们是否可以保持结果为_int_并避免溢出/下溢问题。

## 5. 在溢出/下溢发生时抛出异常

假设我们的程序需要绝对差值结果为_int_。那么方法的理想行为应该是**返回一个_int_并在溢出/下溢发生时抛出异常**。

然而，正如我们之前看到的，**Java在常规 _(num1 – num2)_ 计算期间不抛出异常**。这使得当我们发现程序没有产生预期结果时，很难找到真正的原因。

自从Java 8以来，Java的Math引入了新的_*exact()_方法。这些方法在溢出/下溢发生时抛出_ArithmeticException_。所以接下来，让我们用_subtractExact()_替换我们方法中的_(num1 – num2)_：

```java
int absDiff2(int num1, int num2) {
    return Math.abs(Math.subtractExact(num1, num2));
}
```

最后，以下测试显示_absDiff2()_按预期工作：

```java
int diff1 = absDiff2(100, -200);
assertEquals(300, diff1);

int diff2 = absDiff2(100, 200);
assertEquals(100, diff2);

//溢出 -> 异常
assertThrows(ArithmeticException.class, () -> absDiff2(Integer.MAX_VALUE, -200));
```

## 6. 结论

在本文中，我们探讨了计算两个整数之间的绝对差值。此外，我们讨论了溢出/下溢问题。

如往常一样，本文中展示的所有代码片段都可以在GitHub上找到。