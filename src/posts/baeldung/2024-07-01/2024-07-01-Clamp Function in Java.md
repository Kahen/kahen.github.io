---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - clamp function
  - Java 21
  - Math class
head:
  - - meta
    - name: keywords
      content: Java, clamp function, Math class, Java 21, Programming
---
# Java中的钳制函数

1. 概述

**钳制函数将值限制在一定范围内**。它确保给定的值不会超出特定的下限和上限。

在本教程中，我们将通过示例探讨如何在Java中实现钳制函数。

2. Java 21之前的钳制函数

**在Java 21之前，Java没有内置的钳制值的函数**。我们需要自己编写钳制函数。

钳制函数指定了一个值的范围。低于最小值的值将被设置为最小值。高于最大值的值将被设置为最大值。同时，范围内的值将返回它们自己。

### 2.1 使用方法重载

**我们可以使用方法重载来为不同的数据类型实现钳制函数**。

让我们创建一个_Clamp_类，并添加一个返回整数的_clamp()_方法：

```java
class Clamp {
    int clamp(int value, int min, int max) {
        return Math.max(min, Math.min(max, value));
    }
}
```

在这里，我们创建了一个接受值、下限和上限作为参数的_clamp()_方法。此外，我们使用_Math_类来设置最小值和最大值。最后，如果值在设定的范围内，我们返回该值；如果值不在范围内，我们返回最小值或最大值。

让我们为_clamp()_方法编写一个单元测试：

```java
@Test
void givenValueOutsideRange_whenClamp_thenReturnLowerValue() {
    Clamp clampValue = new Clamp();
    assertEquals(15, clampValue.clamp(10, 15, 35));
}
```

在这里，我们创建了一个_Clamp_的实例，并在其上调用_clamp()_。值设置为_10_，最小值设置为_15_，最大值为_35_。由于值不在范围内，方法返回最小值。

这是一个测试范围内值的示例：

```java
assertEquals(20, clampValue.clamp(20, 15, 35));
```

由于输入值在范围内，_clamp()_方法返回此值。

最后，让我们看看一个值高于最大值的测试：

```java
assertEquals(35, clampValue.clamp(50, 15, 35));
```

在这里，输入值超出了最大边界。因此，_clamp()_方法返回最大值。

此外，让我们通过重载_clamp()_方法来实现_double_数据类型的钳制函数：

```java
double clamp(double value, double min, double max) {
    return Math.max(min, Math.min(max, value));
}
```

在这里，我们使用_double_数据类型重载了_clamp()_。此外，该方法返回一个_double_。

### 2.2 使用泛型

此外，**我们可以使用泛型使_clamp()_方法更加灵活，并适用于不同的数据类型**：

```java
static `<T extends Comparable<T>`> T clamp(T value, T min, T max) {
    if (value.compareTo(min) `< 0) {
        return min;
    } else if (value.compareTo(max) >` 0) {
        return max;
    } else {
        return value;
    }
}
```

上述方法接受三个泛型类型_T_的参数。_T_还实现了_Comparable_接口。**然而，这种方法可能代价较高**。如果最小值和最大值是原始类型，**Java将自动将它们装箱为等价的对象，因为原始类型不能实现_Comparable_**。

让我们为泛型方法编写一个单元测试：

```java
@Test
void givenFloatValueWithinRange_whenClamp_thenReturnValue() {
    Clamp clampValue = new Clamp();
    assertEquals(16.2f, clampValue.clamp(16.2f, 15f, 35.3f));
}
```

该方法接受_float_类型，但在计算值时，它将_float_装箱为_Float_，然后从_Float_拆箱返回值到_float_。因此，我们有两个装箱操作和一个拆箱操作。

**建议使用方法重载以避免装箱/拆箱操作**。

3. Java 21之后的钳制函数

Java 21，目前仍处于实验阶段，在_Math_类中引入了_clamp()_方法。这种方法使我们能够轻松地钳制一个值，而无需编写自己的方法。

以下是使用Java 21中_clamp()_的一个示例：

```java
@Test
void givenValueWithinRange_whenClamp_thenReturnValue() {
    assertEquals(20, Math.clamp(20, 17, 98));
}
```

在上面的代码中，我们调用_clamp()_方法并设置最小值和最大值。代码返回该值，因为它在最小值和最大值之间。

值得注意的是，_clamp()_方法支持不同的数据类型。因此，不需要为不同的数据类型显式实现。

4. 结论

在本文中，我们学习了在Java中实现钳制函数的三种不同方法。我们看到了在Java 21将_clamp()_方法引入标准库之前如何编写_clamp()_方法。

如往常一样，示例的源代码可以在GitHub上找到。