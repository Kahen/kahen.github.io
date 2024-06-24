---
date: 2024-06-24
category:
  - Java
  - BigDecimal
tag:
  - BigDecimal
  - Integer
  - Conversion
head:
  - - meta
    - name: keywords
      content: Java, BigDecimal, Integer, Conversion
---
# Java中将BigDecimal转换为Integer

## 1. 概述

_BigDecimal_ 旨在处理浮点数。它提供了一种便捷的方式来管理精度，并且最重要的是，它处理了舍入误差。

然而，在某些情况下，我们需要将其作为简单的整数来处理，并且将其转换为_Integer_或_int_。在本教程中，我们将学习如何正确进行转换，并理解转换背后的一些问题。

## 2. 缩小转换

_BigDecimal_ 可以存储比_Integer_或_int_更广泛的数字范围。这通常可能导致在转换过程中丢失精度。

### 2.1. 截断

_BigDecimal_ 提供了_intValue()_方法，可以将BigDecimal转换为_int_：

```java
@ParameterizedTest
@ArgumentsSource(SmallBigDecimalConversionArgumentsProvider.class)
void givenSmallBigDecimalWhenConvertToIntegerThenWontLosePrecision(BigDecimal given, int expected) {
    int actual = given.intValue();
    assertThat(actual).isEqualTo(expected);
}
```

_BigDecimal_ 可以包含浮点值，但_int_不能。**这就是为什么_intValue()_方法会截断小数点后的所有数字：**

```java
@ParameterizedTest
@ValueSource(doubles = {0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5})
void givenLargeBigDecimalWhenConvertToIntegerThenLosePrecision(double given) {
    BigDecimal decimal = BigDecimal.valueOf(given);
    int integerValue = decimal.intValue();
    double actual = Integer.valueOf(integerValue).doubleValue();
    assertThat(actual)
      .isEqualTo((int) given)
      .isNotEqualTo(given);
}
```

这种行为类似于将_double_转换为_int_或_long_。**因此，数字的精度可能会丢失。** 同时，对于应用程序来说，丢失精度可能是可以接受的。但是，我们应该始终考虑这一点。

### 2.2. 溢出

另一个问题是在使用_intValue()_时的溢出。**这与前一个问题类似，但给出了一个完全不同的错误结果：**

```java
@ParameterizedTest
@ValueSource(longs = {Long.MAX_VALUE, Long.MAX_VALUE - 1, Long.MAX_VALUE - 2,
  Long.MAX_VALUE - 3, Long.MAX_VALUE - 4, Long.MAX_VALUE - 5,
  Long.MAX_VALUE - 6, Long.MAX_VALUE - 7, Long.MAX_VALUE - 8})
void givenLargeBigDecimalWhenConvertToIntegerThenLosePrecision(long expected) {
    BigDecimal decimal = BigDecimal.valueOf(expected);
    int actual = decimal.intValue();
    assertThat(actual)
      .isNotEqualTo(expected)
      .isEqualTo(expected - Long.MAX_VALUE - 1);
}
```

同时，考虑到二进制数字表示，这是合理的行为。**我们不能存储比_int_能容纳的更多信息。** 在某些场景中，我们同时面临这两个问题：

```java
@ParameterizedTest
@ValueSource(doubles = {Long.MAX_VALUE - 0.5, Long.MAX_VALUE - 1.5, Long.MAX_VALUE - 2.5,
  Long.MAX_VALUE - 3.5, Long.MAX_VALUE - 4.5, Long.MAX_VALUE - 5.5,
  Long.MAX_VALUE - 6.5, Long.MAX_VALUE - 7.5, Long.MAX_VALUE - 8.5})
void givenLargeBigDecimalWhenConvertToIntegerThenLosePrecisionFromBothSides(double given) {
    BigDecimal decimal = BigDecimal.valueOf(given);
    int integerValue = decimal.intValue();
    double actual = Integer.valueOf(integerValue).doubleValue();
    assertThat(actual)
      .isNotEqualTo(Math.floor(given))
      .isNotEqualTo(given);
}
```

**尽管_intValue()_在某些情况下可能有效，但我们必须有更好的解决方案来避免意外的错误。**

## 3. 精度损失

我们有几种方法可以解决我们讨论的问题。**尽管我们无法避免精度损失，但我们可以使过程更加明确。**

### 3.1. 检查小数位

最直接的方法之一是检查_BigDecimal_的小数位。**我们可以确定给定的数字是否包含小数点，并假设它之后有一些值。** 这种技术在大多数情况下都是有效的。然而，它只是确定小数点的存在，而不是数字是否包含非零值：

```java
@ParameterizedTest
@ValueSource(doubles = {
  0.0, 1.00, 2.000, 3.0000,
  4.00000, 5.000000, 6.00000000,
  7.000000000, 8.0000000000})
void givenLargeBigDecimalWhenCheckScaleThenItGreaterThanZero(double given) {
    BigDecimal decimal = BigDecimal.valueOf(given);
    assertThat(decimal.scale()).isPositive();
    assertThat(decimal.toBigInteger()).isEqualTo((int) given);
}
```

**在这个例子中，数字0.0的小数位等于一。** 如果我们基于小数位值来转换行为，我们可能会遇到一些边缘情况。

### 3.2. 定义舍入

如果丢失精度是可以接受的，我们可以将小数位设置为零，并确定舍入策略。**这比简单的_intValue()_调用有优势。** 我们将明确定义舍入行为：

```java
@ParameterizedTest
@ValueSource(doubles = {0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5})
void givenLargeBigDecimalWhenConvertToIntegerWithRoundingUpThenLosePrecision(double given) {
    BigDecimal decimal = BigDecimal.valueOf(given);
    int integerValue = decimal.setScale(0, RoundingMode.CEILING).intValue();
    double actual = Integer.valueOf(integerValue).doubleValue();
    assertThat(actual)
      .isEqualTo(Math.ceil(given))
      .isNotEqualTo(given);
}
```

**我们可以使用_RoundingMode_枚举来定义规则。** 它为我们提供了几种预定义的策略，以获得对转换过程的更多控制。

## 4. 防止溢出

溢出问题则不同。虽然对于应用程序来说，丢失精度可能是可以接受的，但得到一个完全错误的数字是永远不可接受的。

### 4.1. 范围检查

我们可以检查是否可以将_BigDecimal_值适应到_int_中。如果我们能做到，我们就使用_intValue()_转换。否则，我们可以使用一个默认值，例如最小的或最大的_int_：

```java
@ParameterizedTest
@ValueSource(longs = {
  Long.MAX_VALUE, Long.MAX_VALUE - 1, Long.MAX_VALUE - 2,
  Long.MIN_VALUE, Long.MIN_VALUE + 1, Long.MIN_VALUE + 2,
  0, 1, 2})
void givenLargeBigDecimalWhenConvertToIntegerThenSetTheMaxOrMinValue(long expected) {
    BigDecimal decimal = BigDecimal.valueOf(expected);
    boolean tooBig = isTooBig(decimal);
    boolean tooSmall = isTooSmall(decimal);
    int actual;
    if (tooBig) {
        actual = Integer.MAX_VALUE;
    } else if (tooSmall) {
        actual = Integer.MIN_VALUE;
    } else {
        actual = decimal.intValue();
    }
    assertThat(tooBig).isEqualTo(actual == Integer.MAX_VALUE);
    assertThat(tooSmall).isEqualTo(actual == Integer.MIN_VALUE);
    assertThat(!tooBig && !tooSmall).isEqualTo(actual == expected);
}
```

如果无法确定一个合理的默认值，我们可以抛出一个异常。_BigDecimal_ API已经为我们提供了一个类似的方法。

### 4.2. 精确值

**BigDecimal有一个更安全的_intValue()_版本——_intValueExact()._** 这个方法在任何十进制部分溢出时都会抛出_ArithmeticException_：

```java
@ParameterizedTest
@ValueSource(longs = {Long.MAX_VALUE, Long.MAX_VALUE - 1, Long.MAX_VALUE - 2,
  Long.MAX_VALUE - 3, Long.MAX_VALUE - 4, Long.MAX_VALUE - 5,
  Long.MAX_VALUE - 6, Long.MAX_VALUE - 7, Long.MAX_VALUE - 8})
void givenLargeBigDecimalWhenConvertToExactIntegerThenThrowException(long expected) {
    BigDecimal decimal = BigDecimal.valueOf(expected);
    assertThatExceptionOfType(ArithmeticException.class)
      .isThrownBy(decimal::intValueExact);
}
```

这样，我们可以确保我们的应用程序将处理溢出，并且不允许不正确的状态。

## 5. 结论

数值转换可能听起来很简单，但即使是简单的转换也可能在应用程序中引入难以调试的问题。因此，我们应该小心处理缩小转换，并始终考虑精度损失和溢出。

_BigDecimal_ 提供了各种方便的方法来简化转换，并让我们对过程有更多的控制。

像往常一样，本教程的所有代码都可以在GitHub上找到。