---
date: 2024-06-24
category:
  - Java
  - BigDecimal
tag:
  - Integer
  - BigDecimal
  - Java
head:
  - - meta
    - name: keywords
      content: Java, BigDecimal, Integer, 转换, 精确度, 浮点数
---
# Java中将Integer转换为BigDecimal

_BigDecimal_ 旨在处理大的浮点数。**它解决了浮点算术的问题，并提供了控制精度的方式。** 此外，它还拥有许多用于数字运算的常规方法。

我们可以通过将_Integer_转换来利用_BigDecimal_的特性。在本教程中，我们将学习几种不同的转换方法，并讨论它们的优缺点。

## 2. 构造函数转换

最直接的一种方式是使用构造函数转换。**_BigDecimal_ 提供了可以从多种输入转换的构造函数。** 因此，我们可以将给定的_Integer_传递给_BigDecimal_构造函数：

```
@ParameterizedTest
@ArgumentsSource(BigDecimalConversionArgumentsProvider.class)
void giveIntegerWhenConvertWithConstructorToBigDecimalThenConversionCorrect(Integer given, BigDecimal expected) {
    BigDecimal actual = new BigDecimal(given);
    assertThat(actual).isEqualTo(expected);
}

```

**然而，这种方法每次都会强制_BigDecimal_创建一个新的对象：**

```
@ParameterizedTest
@ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
void giveIntegerWhenConvertWithConstructorToBigDecimalThenConversionWithoutCaching(Integer given) {
    BigDecimal firstBigDecimal = new BigDecimal(given);
    BigDecimal secondBigDecimal = new BigDecimal(given);
    assertThat(firstBigDecimal)
      .isEqualTo(secondBigDecimal)
      .isNotSameAs(secondBigDecimal);
}
```

## 3. 静态工厂转换

另一种技术涉及静态工厂，它与前一个例子类似：

```
@ParameterizedTest
@ArgumentsSource(BigDecimalConversionArgumentsProvider.class)
void giveIntegerWhenConvertWithValueOfToBigDecimalThenConversionCorrect(Integer given, BigDecimal expected) {
    BigDecimal actual = BigDecimal.valueOf(given);
    assertThat(actual).isEqualTo(expected);
}
```

它提供了一个好处：与构造函数转换不同，它可以缓存值。**因此，我们可以在不同的上下文中重用同一个对象。** 因为_BigDecimal_是不可变的，它不会创建任何问题。

## 4. 缓存

**_BigIntegers.valueOf()_ 工厂缓存了从零到十的值。** 所有这些值都在_BigDecimal_类中的静态_ZERO_THROUGH_TEN_数组中定义：

```
private static final BigDecimal[] ZERO_THROUGH_TEN = {
  new BigDecimal(BigInteger.ZERO,       0,  0, 1),
  new BigDecimal(BigInteger.ONE,        1,  0, 1),
  new BigDecimal(BigInteger.TWO,        2,  0, 1),
  new BigDecimal(BigInteger.valueOf(3), 3,  0, 1),
  new BigDecimal(BigInteger.valueOf(4), 4,  0, 1),
  new BigDecimal(BigInteger.valueOf(5), 5,  0, 1),
  new BigDecimal(BigInteger.valueOf(6), 6,  0, 1),
  new BigDecimal(BigInteger.valueOf(7), 7,  0, 1),
  new BigDecimal(BigInteger.valueOf(8), 8,  0, 1),
  new BigDecimal(BigInteger.valueOf(9), 9,  0, 1),
  new BigDecimal(BigInteger.TEN,        10, 0, 2),
};

```

_valueOf(long)_ 工厂在内部使用这个数组：

```
public static BigDecimal valueOf(long val) {
    if (val >= 0 && val < ZERO_THROUGH_TEN.length)
        return ZERO_THROUGH_TEN[(int)val];
    else if (val != INFLATED)
        return new BigDecimal(null, val, 0, 0);
    return new BigDecimal(INFLATED_BIGINT, val, 0, 0);
}

```

我们可以看到，对于某些值，_BigDecimal_对象是相同的：

```
@ParameterizedTest
@ValueSource(ints = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
void giveIntegerWhenConvertWithValueOfToBigDecimalThenConversionCachesTheResults(Integer given) {
    BigDecimal firstBigDecimal = BigDecimal.valueOf(given);
    BigDecimal secondBigDecimal = BigDecimal.valueOf(given);
    assertThat(firstBigDecimal).isSameAs(secondBigDecimal);
}
```

如果我们要使用许多从零到十的_BigDecimal_值，这可能会提高性能。同时，由于_BigDecimal_对象是不可变的，我们可以在我们的应用程序中实现我们重复使用的数字的缓存。

同时，这个范围之外的数字将不会使用缓存：

```
@ParameterizedTest
@ValueSource(ints = {11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21})
void giveIntegerWhenConvertWithValueOfToBigDecimalThenConversionWontCacheTheResults(Integer given) {
    BigDecimal firstBigDecimal = BigDecimal.valueOf(given);
    BigDecimal secondBigDecimal = BigDecimal.valueOf(given);
    assertThat(firstBigDecimal)
      .isEqualTo(secondBigDecimal)
      .isNotSameAs(secondBigDecimal);
}
```

因此，在生产代码中依赖身份等价是不明智的。

## 5. 结论

当我们需要对浮点数进行操作，避免舍入误差时，_BigDecimal_是一个很好的选择。此外，它还允许我们使用其他方式无法表示的巨大数字。_BigDecimal_提供了从其他类型转换的各种方法，例如从_Integer_转换。

像往常一样，本教程的所有代码都可以在GitHub上找到。