---
date: 2024-07-30
category:
  - Java
  - BigDecimal
tag:
  - String
  - Convert
  - BigDecimal
head:
  - - meta
    - name: keywords
      content: Java, BigDecimal, String, Convert
---
# Java中将字符串转换为BigDecimal

在本教程中，我们将介绍Java中将字符串转换为BigDecimal的多种方法。

**BigDecimal** 表示一个不可变的任意精度的有符号十进制数字。它由两部分组成：

- 未缩放值 - 一个任意精度的整数
- 小数位 - 表示小数点右边数字数量的32位整数

例如，BigDecimal 3.14 有一个未缩放值为314，小数位为2。

如果为零或正数，小数位是小数点右边的位数。

如果是负数，数字的未缩放值将乘以10的负小数位次幂。因此，**BigDecimal表示的数值是（未缩放值 × 10^(-小数位)）**。

Java中的**BigDecimal**类提供了基本算术运算、小数位操作、比较、格式转换和哈希计算的操作。

此外，我们使用**BigDecimal**进行高精度算术运算，需要控制小数位和舍入行为的计算。一个例子是涉及金融交易的计算。

我们可以使用以下方法之一在Java中将字符串转换为BigDecimal：

- **BigDecimal(String)** 构造器
- **BigDecimal.valueOf()** 方法
- **DecimalFormat.parse()** 方法

让我们在下面详细讨论它们。

## 3. **BigDecimal(String)**

在Java中将字符串转换为BigDecimal的最简单方法是使用**BigDecimal(String)** 构造器：

```java
BigDecimal bigDecimal = new BigDecimal("123");
assertEquals(new BigDecimal(123), bigDecimal);
```

## 4. **BigDecimal.valueOf()**

我们还可以通过使用**BigDecimal.valueOf(double)** 方法将字符串转换为BigDecimal。

这是一个两步过程。第一步是将字符串转换为Double。第二步是将Double转换为BigDecimal：

```java
BigDecimal bigDecimal = BigDecimal.valueOf(Double.valueOf("123.42"));
assertEquals(new BigDecimal(123.42).setScale(2, BigDecimal.ROUND_HALF_UP), bigDecimal);
```

必须注意，有些浮点数不能使用Double值精确表示。这是因为Double类型的浮点数在内存中的表示形式。实际上，该数字以尽可能接近输入的Double数字的有理数形式表示。结果，一些浮点数变得不准确。

## 5. **DecimalFormat.parse()**

当表示值的字符串具有更复杂格式时，我们可以使用**DecimalFormat**。

例如，我们可以在不移除非数字符号的情况下转换基于小数的长值：

```java
BigDecimal bigDecimal = new BigDecimal(10692467440017.111).setScale(3, BigDecimal.ROUND_HALF_UP);

DecimalFormatSymbols symbols = new DecimalFormatSymbols();
symbols.setGroupingSeparator(',');
symbols.setDecimalSeparator('.');
String pattern = "#,##0.0#";
DecimalFormat decimalFormat = new DecimalFormat(pattern, symbols);
decimalFormat.setParseBigDecimal(true);

// 解析字符串值
BigDecimal parsedStringValue = (BigDecimal) decimalFormat.parse("10,692,467,440,017.111");

assertEquals(bigDecimal, parsedStringValue);
```

**DecimalFormat.parse** 方法返回一个**Number**，我们使用_setParseBigDecimal(true)_将其转换为BigDecimal数字。

通常，**DecimalFormat** 比我们要求的更高级。因此，我们应该更倾向于使用**new BigDecimal(String)** 或 **BigDecimal.valueOf()**。

## 6. **无效转换**

Java为处理无效的数字字符串提供了通用异常。

特别是，**new BigDecimal(String), BigDecimal.valueOf()** 和 **DecimalFormat.parse** 在我们传递**null**时抛出**NullPointerException**：

```java
@Test(expected = NullPointerException.class)
public void givenNullString_WhenBigDecimalObjectWithStringParameter_ThenNullPointerExceptionIsThrown() {
    String bigDecimal = null;
    new BigDecimal(bigDecimal);
}

@Test(expected = NullPointerException.class)
public void givenNullString_WhenValueOfDoubleFromString_ThenNullPointerExceptionIsThrown() {
    BigDecimal.valueOf(Double.valueOf(null));
}

@Test(expected = NullPointerException.class)
public void givenNullString_WhenDecimalFormatOfString_ThenNullPointerExceptionIsThrown()
throws ParseException {
    new DecimalFormat("#").parse(null);
}
```

同样，**new BigDecimal(String)** 和 **BigDecimal.valueOf()** 在我们传递无法解析为BigDecimal的无效字符串（例如**&**）时抛出**NumberFormatException**：

```java
@Test(expected = NumberFormatException.class)
public void givenInalidString_WhenBigDecimalObjectWithStringParameter_ThenNumberFormatExceptionIsThrown() {
    new BigDecimal("&");
}

@Test(expected = NumberFormatException.class)
public void givenInalidString_WhenValueOfDoubleFromString_ThenNumberFormatExceptionIsThrown() {
    BigDecimal.valueOf(Double.valueOf("&"));
}
```

最后，**DecimalFormat.parse** 在我们传递无效的字符串时抛出**ParseException**：

```java
@Test(expected = ParseException.class)
public void givenInalidString_WhenDecimalFormatOfString_ThenNumberFormatExceptionIsThrown()
throws ParseException {
    new DecimalFormat("#").parse("&");
}
```

## 7. **结论**

在本文中，我们了解到Java为我们提供了多种将字符串转换为BigDecimal值的方法。通常，我们推荐使用**new BigDecimal(String)** 方法来实现这一目的。

如常，本文中使用的代码可以在GitHub上找到。