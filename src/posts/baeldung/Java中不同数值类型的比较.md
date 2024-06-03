---
date: 2024-05-15
category:
  - Java编程
  - 数据类型比较
tag:
  - Java
  - BigDecimal
  - 数据比较
---
# Java中不同数值类型的比较

## 1. 概述

有时，我们需要比较数字，忽略它们的类或类型。**这在格式不统一，数字可能在不同上下文中使用时特别有用。**

在本教程中，我们将学习如何比较原始类型和不同类别的数字，例如_Integers_、_Longs_和_Floats_。我们还将检查如何将浮点数与整数进行比较。

## 2. 比较不同类别

让我们检查Java如何比较不同的原始类型、包装类和数字类型。**为了澄清，在本文的上下文中，我们将把“类型”称为浮点数和整数，而不是类或原始类型。**

### 2.1. 比较整数原始类型

在Java中，我们有几种原始类型来表示整数。**为了简单起见，我们将只讨论_int_、_long_和_double_。** 如果我们要检查一个数字是否等于另一个数字，使用原始类型时我们可以没有问题地这样做：

```java
@ValueSource(strings = {"1", "2", "3", "4", "5"})
@ParameterizedTest
void givenSameNumbersButDifferentPrimitives_WhenCheckEquality_ThenTheyEqual(String number) {
    int integerNumber = Integer.parseInt(number);
    long longNumber = Long.parseLong(number);
    assertEquals(longNumber, integerNumber);
}
```

同时，这种方法在处理溢出时表现不佳。**技术上，在本例中，它将清楚地识别出这些数字不相等：**

```java
@ValueSource(strings = {"1", "2", "3", "4", "5"})
@ParameterizedTest
void givenSameNumbersButDifferentPrimitivesWithIntegerOverflow_WhenCheckEquality_ThenTheyNotEqual(String number) {
    int integerNumber = Integer.MAX_VALUE + Integer.parseInt(number);
    long longNumber = Integer.MAX_VALUE + Long.parseLong(number);
    assertNotEquals(longNumber, integerNumber);
}
```

**然而，如果两个值都发生溢出，可能会导致不正确的结果。** 尽管我们很难自食其果，但通过某些操作仍然可能发生：

```java
@Test
void givenSameNumbersButDifferentPrimitivesWithLongOverflow_WhenCheckEquality_ThenTheyEqual() {
    long longValue = BigInteger.valueOf(Long.MAX_VALUE)
      .add(BigInteger.ONE)
      .multiply(BigInteger.TWO).longValue();
    int integerValue = BigInteger.valueOf(Long.MAX_VALUE)
      .add(BigInteger.ONE).intValue();
    assertThat(longValue).isEqualTo(integerValue);
}

```

**这个测试会认为数字相等，尽管一个数字是另一个的两倍。** 如果我们不希望数字溢出，这种方法可能对小数字有用。

### 2.2. 比较整数和浮点原始类型

在使用原始类型比较整数和浮点数时，我们有类似的情况：

```java
@ValueSource(strings = {"1", "2", "3", "4", "5"})
@ParameterizedTest
void givenSameNumbersButDifferentPrimitivesTypes_WhenCheckEquality_ThenTheyEqual(String number) {
    int integerNumber = Integer.parseInt(number);
    double doubleNumber = Double.parseDouble(number);
    assertEquals(doubleNumber, integerNumber);
}
```

**这是因为整数将被提升为双精度或单精度浮点数。** 这就是为什么即使数字之间有很小的差异，等式操作也会按预期行为：

```java
@ValueSource(strings = {"1", "2", "3", "4", "5"})
@ParameterizedTest
void givenDifferentNumbersButDifferentPrimitivesTypes_WhenCheckEquality_ThenTheyNotEqual(String number) {
    int integerNumber = Integer.parseInt(number);
    double doubleNumber = Double.parseDouble(number) + 0.0000000000001;
    assertNotEquals(doubleNumber, integerNumber);
}
```

**然而，我们仍然存在精度和溢出的问题。** 因此，即使在比较相同类型的数字时，我们也不能完全确定结果的正确性：

```java
@Test
void givenSameNumbersButDifferentPrimitivesWithDoubleOverflow_WhenCheckEquality_ThenTheyEqual() {
    double firstDoubleValue = BigDecimal.valueOf(Double.MAX_VALUE).add(BigDecimal.valueOf(42)).doubleValue();
    double secondDoubleValue = BigDecimal.valueOf(Double.MAX_VALUE).doubleValue();
    assertEquals(firstDoubleValue, secondDoubleValue);
}
```

想象一下，如果我们需要使用两种不同的百分比表示法比较分数。在第一种情况下，我们使用浮点数，其中1代表100%。在第二种情况下，我们使用整数来识别百分比：

```java
@Test
void givenSameNumbersWithDoubleRoundingErrors_WhenCheckEquality_ThenTheyNotEqual() {
    double doubleValue = 0.3 / 0.1;
    int integerValue = 30 / 10;
    assertNotEquals(doubleValue, integerValue);
}
```

**因此，我们不能依赖原始类型的比较，特别是如果我们使用涉及浮点数计算。**

## 3. 比较包装类

在使用包装类时，我们会得到与比较原始类型不同的结果：

```java
@ValueSource(strings = {"1", "2", "3", "4", "5"})
@ParameterizedTest
void givenSameNumbersButWrapperTypes_WhenCheckEquality_ThenTheyNotEqual(String number) {
    Float floatNumber = Float.valueOf(number);
    Integer integerNumber = Integer.valueOf(number);
    assertNotEquals(floatNumber, integerNumber);
}
```

**尽管Float和Integer数字是从相同的数值表示创建的，但它们不相等。** 然而，问题可能是我们比较的是不同类型的数字：浮点数和整数。让我们检查Integer和Long的行为：

```java
@ValueSource(strings = {"1", "2", "3", "4", "5"})
@ParameterizedTest
void givenSameNumbersButDifferentWrappers_WhenCheckEquality_ThenTheyNotEqual(String number) {
    Integer integerNumber = Integer.valueOf(number);
    Long longNumber = Long.valueOf(number);
    assertNotEquals(longNumber, integerNumber);
}
```

奇怪的是，我们得到了相同的结果。**这里的主要问题是我们试图在Number层次结构中比较不同类型的类。** 在大多数情况下，《equals()_方法的第一步是检查类型是否相同。例如，Long_具有以下实现：

```java
public boolean equals(Object obj) {
    if (obj instanceof Long) {
        return value == ((Long)obj).longValue();
    }
    return false;
}

```

**这是为了避免任何传递性问题，通常是一个很好的规则要遵循。** 然而，它并没有解决比较具有不同表示的两个数字的问题。

## 4. BigDecimal

在比较整数与浮点数时，我们可以采取与前面案例相同的方法：将数字转换为最精确的表示形式并进行比较。_BigDecimal_类非常适合这个用途。

我们将考虑两种情况，具有相同小数位数的数字和具有不同小数位数的数字：

```java
static Stream<Arguments> numbersWithDifferentScaleProvider() {
    return Stream.of(
      Arguments.of("0", "0.0"), Arguments.of("1", "1.0"),
      Arguments.of("2", "2.0"), Arguments.of("3", "3.0"),
      Arguments.of("4", "4.0"), Arguments.of("5", "5.0"),
      Arguments.of("6", "6.0"), Arguments.of("7", "7.0")
    );
}
static Stream<Arguments> numbersWithSameScaleProvider() {
    return Stream.of(
      Arguments.of("0", "0"), Arguments.of("1", "1"),
      Arguments.of("2", "2"), Arguments.of("3", "3"),
      Arguments.of("4", "4"), Arguments.of("5", "5"),
      Arguments.of("6", "6"), Arguments.of("7", "7")
    );
}
```

我们不会检查不同的数字，因为这是一个微不足道的案例。同样，我们也不会看到比较规则严重依赖于领域逻辑的案例。

让我们首先检查具有相同小数位数的数字：

```java
@MethodSource("numbersWithSameScaleProvider")
@ParameterizedTest
void givenBigDecimalsWithSameScale_WhenCheckEquality_ThenTheyEqual(String firstNumber, String secondNumber) {
    BigDecimal firstBigDecimal = new BigDecimal(firstNumber);
    BigDecimal secondBigDecimal = new BigDecimal(secondNumber);

    assertEquals(firstBigDecimal, secondBigDecimal);
}
```

**BigDecimal的行为符合预期。** 现在让我们检查具有不同小数位数的数字：

```java
@MethodSource("numbersWithDifferentScaleProvider")
@ParameterizedTest
void givenBigDecimalsWithDifferentScale_WhenCheckEquality_ThenTheyNotEqual(String firstNumber, String secondNumber) {
    BigDecimal firstBigDecimal = new BigDecimal(firstNumber);
    BigDecimal secondBigDecimal = new BigDecimal(secondNumber);

    assertNotEquals(firstBigDecimal, secondBigDecimal);
}
```

**BigDecimal将数字1和1.0视为不同。** 原因是BigDecimal中的_equals()_方法在比较时使用小数位数。即使数字仅在末尾的零上有所不同，它们也会被认为是不相等的。

**然而，BigDecimal API中的另一个方法为我们的情况提供了所需的逻辑：_compareTo()_方法。** 它不考虑尾随零，并且非常适合比较数字：

```java
@MethodSource("numbersWithDifferentScaleProvider")
@ParameterizedTest
void givenBigDecimalsWithDifferentScale_WhenCompare_ThenTheyEqual(String firstNumber, String secondNumber) {
    BigDecimal firstBigDecimal = new BigDecimal(firstNumber);
    BigDecimal secondBigDecimal = new BigDecimal(secondNumber);

    assertEquals(0, firstBigDecimal.compareTo(secondBigDecimal));
}
```

**因此，虽然BigDecimal是一个好的，也是最合理的选择来解决这个问题，但在比较数字和使用BigDecimal时，我们应该考虑_equals()_和_compareTo()_方法的怪癖。**

## 5. AssertJ

如果我们使用AssertJ库，我们可以简化断言代码并使其更易于阅读：

```java
@MethodSource("numbersWithDifferentScaleProvider")
@ParameterizedTest
void givenBigDecimalsWithDifferentScale_WhenCompareWithAssertJ_ThenTheyEqual(String firstNumber, String secondNumber) {
    BigDecimal firstBigDecimal = new BigDecimal(firstNumber);
    BigDecimal secondBigDecimal = new BigDecimal(secondNumber);

    assertThat(firstBigDecimal).isEqualByComparingTo(secondBigDecimal);
}
```

此外，如果需要，我们可以提供一个比较器来进行更复杂的逻辑。

## 6. 结论

通常，我们需要按照数字的原样进行比较，忽略类型和类。默认情况下，Java可以处理一些值，但总的来说，直接比较原始类型是容易出错的，比较包装器也不会按预期工作。

_BigDecimal_是解决这个问题的一个很好的解决方案。然而，它在_equals()_和_hashCode()_方法上有一个非直观的行为。因此，在比较数字和使用BigDecimal时，我们应该考虑这一点。

如往常一样，本文的所有代码都可以在GitHub上找到。
