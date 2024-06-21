---
date: 2024-06-17
category:
  - Java
  - 数据类型转换
tag:
  - int
  - short
---
# Java中从int转换为short的方法

当我们在Java中工作时，经常会遇到需要转换数据类型以满足特定要求的场景。一种常见的转换是从int转换为short。

在本教程中，我们将探讨如何在Java中将int转换为short以及需要注意的潜在陷阱。

## 2. 问题介绍

Java提供了几种原始数据类型来存储数值，每种数据类型都有其范围和精度。例如，int数据类型是一个32位有符号整数，能够存储从-2^31到2^31 - 1的值。另一方面，short数据类型是一个16位有符号整数，能够存储从-2^15到2^15 - 1的值。

由于int的范围比short宽，将int转换为short可能会有潜在的陷阱，我们将在接下来的部分中详细讨论。

接下来，让我们探索在Java中将int转换为short的方法。

## 3. 将int强制转换为short

将int转换为short最直接的方法是通过强制转换。一个示例可以清楚地显示它的工作原理：

```java
short expected = 42;
int i = 42;
short result = (short) i;
assertEquals(expected, result);
```

在Java中，整数有两种类型：原始int和Integer。接下来，让我们看看如何将Integer实例转换为short。

## 4. 使用Integer.shortValue()方法

Integer类提供了shortValue()方法。顾名思义，shortValue()允许我们方便地将给定的Integer转换为short值：

```java
short expected = 42;
Integer intObj = 42;
short result = intObj.shortValue();
assertEquals(expected, result);
```

然而，如果我们查看shortValue()方法的实现，我们会发现它在内部将Integer值强制转换为short值：

```java
public short shortValue() {
    return (short)value;
}
```

我们已经注意到Java中int的范围比short大。因此，我们可能会想知道，如果给定的整数超出了short的范围会发生什么。接下来，让我们详细探讨这个问题。

## 5. 潜在陷阱

将超出short范围的整数值进行强制转换可能会产生“令人惊讶”的结果。接下来，让我们检查几个转换示例：

```java
int oneMillion = 1_000_000;
short result = (short) oneMillion;
assertEquals(16960, result);
```

在这个示例中，整数值是一百万，超出了short的最大值（32767）。强制转换后，我们得到了一个short值16960。

此外，如果我们将整数更改为二百万，我们甚至得到一个负数（-31616）：

```java
int twoMillion = 2_000_000;
result = (short) twoMillion;
assertEquals(-31616, result);
```

接下来，我们将找出为什么我们得到这些“令人惊讶”的数字。

为了回答这个问题，我们首先需要了解Java中short是如何表示为二进制数的。

### 5.1. short：16位有符号整数

我们已经知道short是Java中的16位有符号整数。最高有效位（MSB）表示整数的符号：正数为0，负数为1。例如，short值42是这样存储的：

```java
short 42:
    00000000 00101010
    ^
    MSB
```

按照这个规则，有些人可能认为-42可以表示为“10000000 00101010”。但它不是：

```java
short -42:
    11111111 11010110
    ^
    MSB
```

这是因为Java采用二进制补码来表示负数。简单来说，在二进制补码计算中，有两个步骤：首先，反转每个位，然后向反转后的二进制数加1。

接下来，让我们理解为什么-42可以表示为“11111111 11010110”：

```java
二进制          : 11111111 11010110 (MSB: 1 -> 负数)
反转位     : 00000000 00101001
+ 1             : 00000000 00101010
十进制         : 42
结果          : -42
```

现在我们知道了short是如何存储的，让我们理解将int转换为short时会发生什么。

### 5.2. 强制转换是如何工作的

在Java中，int是一个32位有符号整数，比short多出16位。因此，当我们将int强制转换为short时，int的16位高阶位将被截断。

一个示例可以快速澄清这一点。让我们看看当我们将int值42强制转换为short时是如何工作的：

```java
42 (int)      : 00000000 00000000 00000000 00101010
强制转换为short :                   00000000 00101010
结果        : 42
```

现在，我们可以明白当我们将整数一百万强制转换为short时为什么会得到“令人惊讶”的结果。由于short的范围比int窄，超出short容量的高阶位在强制转换过程中被丢弃，导致结果short中出现意外的值：

```java
1 million (int)  : 00000000 00001111 01000010 01000000
强制转换为short    :                   01000010 01000000
十进制          :                   16960
```

在“将整数二百万强制转换”的例子中，**我们得到了一个负数，因为在截断高阶位后MSB是1：**

```java
2 million (int)  : 00000000 00011110 10000100 10000000
强制转换为short    :                   10000100 10000000
MSB: 1 -> 负数
反转位      :                   01111011 01111111
+ 1              :                   01111011 10000000
十进制          :                   31616
结果           :                   -31616
```

### 5.3. 创建intToShort()

在将int转换为short时，我们必须小心，因为这可能会导致数据丢失或如果int值超出short范围则出现意外行为。**我们应该始终在强制转换之前检查int值是否在Short.MIN_VALUE和Short.MAX_VALUE之间：**

```java
short intToShort(int i) {
    if (i ``< Short.MIN_VALUE || i >`` Short.MAX_VALUE) {
        throw new IllegalArgumentException("Int is out of short range");
    }
    return (short) i;
}
```

然后，当输入的整数超出short的范围时，它会抛出一个异常：

```java
short expected = 42;
int int42 = 42;
assertEquals(expected, intToShort(int42));

int oneMillion = 1_000_000;
assertThrows(IllegalArgumentException.class, () -> intToShort(oneMillion));
```

## 6. 结论

在本文中，我们探讨了如何在Java中将int转换为short，并讨论了当我们强制转换一个超出short范围的int值时可能遇到的潜在陷阱。

如常，示例的完整源代码可在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。翻译已经完成，以下是翻译的完整内容：

---
date: 2024-06-17
category:
  - Java
  - 数据类型转换
tag:
  - int
  - short
---
# Java中从int转换为short的方法

当我们在Java中工作时，经常会遇到需要转换数据类型以满足特定要求的场景。一种常见的转换是从int转换为short。

在本教程中，我们将探讨如何在Java中将int转换为short以及需要注意的潜在陷阱。

## 问题介绍

Java提供了几种原始数据类型来存储数值，每种数据类型都有其范围和精度。例如，int数据类型是一个32位有符号整数，能够存储从-2^31到2^31 - 1的值。另一方面，short数据类型是一个16位有符号整数，能够存储从-2^15到2^15 - 1的值。

由于int的范围比short宽，将int转换为short可能会有潜在的陷阱，我们将在接下来的部分中详细讨论。

接下来，让我们探索在Java中将int转换为short的方法。

## 将int强制转换为short

将int转换为short最直接的方法是通过强制转换。一个示例可以清楚地显示它的工作原理：

```java
short expected = 42;
int i = 42;
short result = (short) i;
assertEquals(expected, result);
```

在Java中，整数有两种类型：原始int和Integer。接下来，让我们看看如何将Integer实例转换为short。

## 使用Integer.shortValue()方法

Integer类提供了shortValue()方法。顾名思义，shortValue()允许我们方便地将给定的Integer转换为short值：

```java
short expected = 42;
Integer intObj = 42;
short result = intObj.shortValue();
assertEquals(expected, result);
```

然而，如果我们查看shortValue()方法的实现，我们会发现它在内部将Integer值强制转换为short值：

```java
public short shortValue() {
    return (short)value;
}
```

我们已经注意到Java中int的范围比short大。因此，我们可能会想知道，如果给定的整数超出了short的范围会发生什么。接下来，让我们详细探讨这个问题。

## 潜在陷阱

将超出short范围的整数值进行强制转换可能会产生“令人惊讶”的结果。接下来，让我们检查几个转换示例：

```java
int oneMillion = 1_000_000;
short result = (short) oneMillion;
assertEquals(16960, result);
```

在这个示例中，整数值是一百万，超出了short的最大值（32767）。强制转换后，我们得到了一个short值16960。

此外，如果我们将整数更改为二百万，我们甚至得到一个负数（-31616）：

```java
int twoMillion = 2_000_000;
result = (short) twoMillion;
assertEquals(-31616, result);
```

接下来，我们将找出为什么我们得到这些“令人惊讶”的数字。

为了回答这个问题，我们首先需要了解Java中short是如何表示为二进制数的。

### short：16位有符号整数

我们已经知道short是Java中的16位有符号整数。最高有效位（MSB）表示整数的符号：正数为0，负数为1。例如，short值42是这样存储的：

```java
short 42:
    00000000 00101010
    ^
    MSB
```

按照这个规则，有些人可能认为-42可以表示为“10000000 00101010”。但它不是：

```java
short -42:
    11111111 11010110
    ^
    MSB
```

这是因为Java采用二进制补码来表示负数。简单来说，在二进制补码计算中，有两个步骤：首先，反转每个位，然后向反转后的二进制数加1。

接下来，让我们理解为什么-42可以表示为“11111111 11010110”：

```java
二进制          : 11111111 11010110 (MSB: 1 -> 负数)
反转位     : 00000000 00101001
+ 1             : 00000000 00101010
十进制         : 42
结果          : -42
```

现在我们知道了short是如何存储的，让我们理解将int转换为short时会发生什么。

### 强制转换是如何工作的

在Java中，int是一个32位有符号整数，比short多出16位。因此，当我们将int强制转换为short时，int的16位高阶位将被截断。

一个示例可以快速澄清这一点。让我们看看当我们将int值42强制转换为short时是如何工作的：

```java
42 (int)      : 00000000 00000000 00000000 00101010
强制转换为short :                   00000000 00101010
结果        : 42
```

现在，我们可以明白当我们将整数一百万强制转换为short时为什么会得到“令人惊讶”的结果。由于short的范围比int窄，超出short容量的高阶位在强制转换过程中被丢弃，导致结果short中出现意外的值：

```java
1 million (int)  : 00000000 00001111 01000010 01000000
强制转换为short    :                   01000010 01000000
十进制          :                   16960
```

在“将整数二百万强制转换”的例子中，**我们得到了一个负数，因为在截断高阶位后MSB是1：**

```java
2 million (int)  : 00000000 00011110 10000100 10000000
强制转换为short    :                   10000100 10000000
MSB: 1 -> 负数
反转位      :                   01111011 01111111
+ 1              :                   01111011 10000000
十进制          :                   31616
结果           :                   -31616
```

### 创建intToShort()

在将int转换为short时，我们必须小心，因为这可能会导致数据丢失或如果int值超出short范围则出现意外行为。**我们应该始终在强制转换之前检查int值是否在Short.MIN_VALUE和Short.MAX_VALUE之间：**

```java
short intToShort(int i) {
    if (i ``< Short.MIN_VALUE || i >`` Short.MAX_VALUE) {
        throw new IllegalArgumentException("Int is out of short range");
    }
    return (short) i;
}
```

然后，当输入的整数超出short的范围时，它会抛出一个异常：

```java
short expected = 42;
int int42 = 42;
assertEquals(expected, intToShort(int42));

int oneMillion = 1_000_000;
assertThrows(IllegalArgumentException.class, () -> intToShort(oneMillion));
```

## 结论

在本文中，我们探讨了如何在Java中将int转换为short，并讨论了当我们强制转换一个超出short范围的int值时可能遇到的潜在陷阱。

如常，示例的完整源代码可在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。
