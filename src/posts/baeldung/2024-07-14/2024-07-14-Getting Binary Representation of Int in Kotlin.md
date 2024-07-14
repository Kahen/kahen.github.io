---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Kotlin
  - Binary Representation
head:
  - - meta
    - name: keywords
      content: Kotlin, Integer, Binary Representation, Java, two's complement
------
# 在Kotlin中获取Int的二进制表示

## 1. 概述

_Int_ 是我们日常工作中常用的数据类型。有时，我们可能需要获取整数的二进制表示。

在本教程中，我们将探索Kotlin中可用的方法来完成这项任务，并更深入地理解整数的二进制表示。

## 2. 使用Java的_Integer.toBinaryString()_方法

当我们在JVM上运行Kotlin程序时，**Java标准库提供的所有功能也适用于Kotlin**。因此，我们也可以使用Java的方法来获取整数的二进制表示。

**一种方便的方法是使用_Integer.toBinaryString()_方法**：

```kotlin
assertEquals("10110", Integer.toBinaryString(22))
assertEquals("101010", Integer.toBinaryString(42))
```

如我们所见，我们通过将数字传递给方法来获取22和42的二进制表示。这非常简单。

有时，我们需要处理负整数。由于我们稍后将重新讨论负二进制数的表示，让我们现在快速了解如何表示负二进制数。

**使用二进制补码是表示负二进制数最常用的技术**。

我们可以按照以下三个步骤将负十进制数转换为其二进制表示形式：

- 用二进制表示数字的绝对值。
- 如果原始数字是负数，翻转所有位（将0变为1，反之亦然）。
- 将结果加1。

让我们以-2为例，演示如何获取其二进制表示：

- -2的绝对值是2。在Java中，整数是32位的。因此，2的二进制表示是_00000000000000000000000000000010_。
- 翻转所有位：_11111111111111111111111111111101_
- 将上述二进制数加1：_11111111111111111111111111111110_

如果我们将-2传递给_Integer.toBinaryString()_方法，我们将得到预期的结果：

```kotlin
assertEquals("11111111111111111111111111111110", Integer.toBinaryString(-2))
```

因此，_Integer.toBinaryString()_方法也适用于负整数。

## 3. 使用_Int._ _toString(radix)_或_UInt.toString(radix)_扩展函数

除了使用Java的_Integer.toBinaryString()_方法来解决问题，**在Kotlin中，我们可以使用_Int.toString(radix = 2)_来获取整数的二进制表示**：

```kotlin
assertEquals("10110", 22.toString(radix = 2))
assertEquals("101010", 42.toString(2)) // 我们可以省略参数名称"radix"
```

然而，值得注意的是**如果我们将负整数传递给这个函数，它不会正确地表示负整数的二进制**：

```kotlin
assertEquals("-10", (-2).toString(2))
```

正如上述测试所示，当整数为-2时，_toString(radix = 2)_函数返回_-10_而不是预期的_11111111111111111111111111111110_。

这是因为_Int.toString(radix = 2)_是一个扩展函数，内部调用Java的_Integer.toString(int, radix)_方法：

```java
public actual inline fun Int.toString(radix: Int): String = java.lang.Integer.toString(this, checkRadix(radix))

```

_Integer.toString(int, radix)_方法支持动态基数参数。它不会对_radix=2_的情况应用任何特殊处理。因此，如果输入的整数是负数，这个方法会在结果前加上‘_–_’字符：

```java
public static String toString(int i, int radix) {
    ...
    if (negative) {
        buf[--charPos] = '-';
    }
    return StringLatin1.newString(buf, charPos, (33 - charPos));
... 
}
```

解决方案是**在调用_Int_的_toString(radix = 2)_扩展之前，先将负整数转换为无符号整数**：

```kotlin
assertEquals("11111111111111111111111111111110", (-2).toUInt().toString(2))
```

这种方法有效，因为**_Int.toUInt()_返回一个与输入Int值具有相同二进制表示的_UInt_值**。

当然，**将正整数转换为_UInts_不会影响结果**：

```kotlin
assertEquals("10110", 22.toUInt().toString(radix = 2))
assertEquals("101010", 42.toUInt().toString(2))
```

## 4. 获取32位二进制字符串

我们已经提到Java中的整数是32位的。因此，有时我们可能想要获取32位的二进制表示。为了实现这一点，**我们可以先获取整数的二进制表示，然后将二进制数字填充为32位二进制格式**：

```kotlin
fun Int.to32BitBinaryString(): String = toUInt().toString(2).padStart(Int.SIZE_BITS, '0')
```

正如上述代码所示，我们将实现包装在扩展函数_to32BitBinaryString()_中。这使我们能够直接从整数调用该函数，例如_42.to32BitBinaryString()_。

最后，让我们使用我们的例子测试这个扩展函数：

```kotlin
assertEquals("00000000000000000000000000010110", 22.to32BitBinaryString())
assertEquals("00000000000000000000000000101010", 42.to32BitBinaryString())
assertEquals("11111111111111111111111111111110", (-2).to32BitBinaryString())
```

## 5. 结论

在本文中，我们探讨了在Kotlin中将整数转换为二进制表示的两种方法：

- Java的_Integer.toBinaryString()_在Kotlin中也是可用的。
- Kotlin的_Int.toString(radix =2)_适用于正整数。**在处理负整数时，我们必须首先将_Int_转换为_UInt_并调用_UInt.toString(radix =2)_以获得正确的结果。**

如往常一样，示例的完整源代码可在GitHub上找到。