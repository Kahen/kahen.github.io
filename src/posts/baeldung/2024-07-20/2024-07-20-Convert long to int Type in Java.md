---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Convert
  - Long to Int
head:
  - - meta
    - name: keywords
      content: Java, Convert, Long to Int, Type Casting
------
# Java中将long转换为int类型

在本教程中，我们将看到如何在Java中将`long`类型的值转换为`int`类型。在我们开始编码之前，我们需要指出一些关于这个数据类型的细节。

首先，在Java中，`long`值由有符号的64位数字表示。另一方面，`int`值由有符号的32位数字表示。因此，将一个更高数据类型的转换为一个较低数据类型称为窄化类型转换。这些转换的结果，当`long`值大于`Integer.MAX_VALUE`和`Integer.MIN_VALUE`时，一些位将会丢失。

此外，我们将展示每种转换变体，对于一个等于`Integer.MAX_VALUE`加一的`long`值是如何工作的。

### 2.1. 强制类型转换
首先，在Java中，强制类型转换是类型转换的最常见方式——它很简单直接：
```java
public int longToIntCast(long number) {
    return (int) number;
}
```

### 2.2. Java 8
自Java 8以来，我们可以使用另外两种方式进行类型转换：使用`Math`包或使用lambda函数。对于`Math`包，我们可以使用`toIntExact`方法：
```java
public int longToIntJavaWithMath(long number) {
    return Math.toIntExact(number);
}
```

### 2.3. 包装类
另一方面，我们可以使用包装类`Long`来获取`int`值：
```java
public int longToIntBoxingValues(long number) {
    return Long.valueOf(number).intValue();
}
```

### 2.4. 使用BigDecimal
此外，我们可以使用`BigDecimal`类来完成这种转换：
```java
public static int longToIntWithBigDecimal(long number) {
    return new BigDecimal(number).intValueExact();
}
```

### 2.5. 使用Guava
接下来，我们将展示使用Google Guava的`Ints`类进行类型转换：
```java
public int longToIntGuava(long number) {
    return Ints.checkedCast(number);
}
```

除此之外，Google Guava的`Ints`类还提供了一个`saturatedCast`方法：
```java
public int longToIntGuavaSaturated(long number) {
    return Ints.saturatedCast(number);
}
```

### 2.6. 整数上限和下限
最后，我们需要考虑到整数值有一个上限和下限。这些限制由`Integer.MAX_VALUE`和`Integer.MIN_VALUE`定义。对于那些超出这些限制的值，不同方法的结果各不相同。

在下一个代码片段中，我们将测试当整数值无法容纳长整数值的情况：
```java
@Test
public void longToIntSafeCast() {
    long max = Integer.MAX_VALUE + 10L;
    int expected = -2147483639;
    assertEquals(expected, longToIntCast(max));
    assertEquals(expected, longToIntJavaWithLambda(max));
    assertEquals(expected, longToIntBoxingValues(max));
}
```

使用直接强制转换，lambda或使用装箱值会产生一个负值。在这些情况下，长整数值大于`Integer.MAX_VALUE`，这就是为什么结果值用一个负数包装。如果长整数值小于`Integer.MIN_VALUE`，则结果值是一个正数。

另一方面，本文中描述的三种方法可能会抛出不同类型的异常：
```java
@Test
public void longToIntIntegerException() {
    long max = Integer.MAX_VALUE + 10L;
    assertThrows(ArithmeticException.class, () -> ConvertLongToInt.longToIntWithBigDecimal(max));
    assertThrows(ArithmeticException.class, () -> ConvertLongToInt.longToIntJavaWithMath(max));
    assertThrows(IllegalArgumentException.class, () -> ConvertLongToInt.longToIntGuava(max));
}
```

对于前两个，抛出了`ArithmeticException`。对于后者，抛出了`IllegalArgumentException`。在这种情况下，`Ints.checkedCast`检查整数是否超出范围。

最后，来自Guava的`saturatedCast`方法，首先检查整数限制，并在传递的数字大于或低于整数上下限时返回限制值：
```java
@Test
public void longToIntGuavaSaturated() {
    long max = Integer.MAX_VALUE + 10L;
    int expected = 2147483647;
    assertEquals(expected, ConvertLongToInt.longToIntGuavaSaturated(max));
}
```

## 3. 结论
在本文中，我们通过一些示例了解了如何在Java中将`long`转换为`int`类型。使用原生Java强制转换和一些库。
 
如往常一样，本文中使用的所有代码片段都可以在GitHub上找到。