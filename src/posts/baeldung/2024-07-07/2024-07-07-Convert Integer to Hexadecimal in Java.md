---
date: 2024-07-07
category:
  - Java
  - 编程
tag:
  - 整数转十六进制
  - Java
head:
  - - meta
    - name: keywords
      content: Java, 整数, 十六进制, 转换
---

# Java中将整数转换为十六进制的方法

在本教程中，我们将学习如何在Java中将整数值转换为十六进制。我们将讨论使用代码示例的不同方法。

在深入一些代码示例之前，让我们了解整数到十六进制转换的工作原理。

**整数使用十进制基数(10)，即0到9的数字。然而，十六进制值由16个符号表示，0到9和A到F。**

在Java中将整数值转换为十六进制有多种方法。**我们可以使用基于数学的方法、一些Java内置功能或第三方库。** 我们将在以下各节中看到每一种方法。

## 3. 原始方法

首先，我们将使用一个简单的数学算法来转换我们的输入整数值：

1. 将整数除以16
2. 将除法的结果再除以16
3. 取除法的余数并将其转换为十六进制数字
4. 重复步骤一和二，直到除法的结果是0

让我们根据上述算法构建我们自己的转换器类：

```java
class IntegerToHex {
    static final String digits = "0123456789ABCDEF";
    static String integerToHex(int input) {
        if (input `<= 0)
            return "0";
        StringBuilder hex = new StringBuilder();
        while (input >` 0) {
            int digit = input % 16;
            hex.insert(0, digits.charAt(digit));
            input = input / 16;
        }
        return hex.toString();
    }
}
```

上述代码使用描述的算法从输入整数中获取十六进制值。

接下来，让我们测试我们的方法：

```java
@Test
void givenIntegerValue_whenUseRawMethod_thenWillGetHexValue() {
    String result = IntegerToHex.integerToHex(1055);
    assertEquals("41F", result);
}
```

我们实现的一个缺点是它只接受大于零的正整数。

## 4. String _format()_ 方法

接下来的方法来自_String_类的_format()_方法。**在这种情况下，我们使用_%x_指定符来获取十六进制格式的输出**。让我们测试这种行为：

```java
@Test
void givenIntegerPositiveValue_whenUseStringFormat_thenWillGetHexValue() {
    String result = String.format("%02x", 255);
    assertEquals("ff", result);
}
```

_format()_方法将255格式化为我们代码示例中的两位十六进制数字。

我们可以通过改变指定符中的数字来改变结果十六进制的左侧填充零的数量。让我们将_%02x_替换为我们下一个测试中的_%04x_指定符：

```java
@Test
void givenIntegerPositiveValue_whenUseStringFormat_thenWillGetHexValueWithLeftZeros() {
    String result = String.format("%04x", 255);
    assertEquals("00ff", result);
}
```

我们可以从我们之前的测试用例中注意到，当指定符更改为_%04x_时，预期结果从最初的_“ff”_更改为_“00ff”_。

如果我们需要结果十六进制值大写，我们只需要在格式指定符中将_“x”_更改为_“X”_：

```java
@Test
void givenIntegerPositiveValue_whenUseStringFormat_thenWillGetHexValueWithLeftZerosAndUpperLetter() {
    String result = String.format("%04X", 255);
    assertEquals("00FF", result);
}
```

## 5. 使用 _toHexString()_ 方法

我们的下一个选项是使用_toHexString()_，它在_Integer_和_Long_类中都存在。

**静态_toHexString()_方法在内部调用_toUnsignedString()_方法**。在这两种情况下，它将输入值转换为无符号值。这就是为什么我们需要避免向此方法传递负值。

让我们编写一些测试用例来说明两种用法。第一个测试用例使用_Integer_类的_toHexString()_：

```java
@Test
void givenIntegerValue_whenUseIntegerToHexString_thenWillGetHexValue() {
    String result = Integer.toHexString(1000);
    assertEquals("3e8", result);
}
```

我们的下一个测试是使用_Long_类的_toHexString()_方法：

```java
@Test
void givenIntegerValue_whenUseLongToHexString_thenWillGetHexValue() {
    String result = Long.toHexString(255L);
    assertEquals("ff", result);
}
```

在第一个测试中，_toHexString()_方法的输入数据是一个_Integer_值。在第二个测试中，我们作为参数传递给方法的输入数据是一个_Long_值。

## 6. 使用 _toString()_ 方法

除了_Integer_和_Long_类中的_toHexString()_方法外，我们还有_toString()_方法。这个方法接受两个参数，并返回一个字符串，表示第一个参数使用第二个参数定义的基数。

让我们在_Integer_类中使用_toString()_方法：

```java
@Test
public void givenNegativeIntegerValue_whenUseIntegerToString_thenWillGetHexValue() {
    String result = Integer.toString(-1458, 16);
    assertEquals("-5b2", result);
}
```

在上面的测试用例中，我们将一个负整数和基数16传递给toString()方法。结果是负的十六进制值。与前面的方法不同，前面的方法只输入正整数，_toString()_方法将有符号整数转换为有符号的十六进制值。

我们的第二个测试与第一个类似，但我们将使用_Long_类的_toString()_方法：

```java
@Test
public void givenLongValue_whenUseLongToString_thenWillGetHexValue() {
    String result = Long.toString(158, 16);
    assertEquals("9e", result);
}
```

在这种情况下，_toString()_方法的工作方式与_Integer_类中的_toString()_方法相同，但是输入数据是一个长值。

## 7. Apache Commons Codec 库

最后，另一种获取十六进制值的方法是使用第三方库，如Apache Commons Codec。从Apache Commons Codec中，我们使用_Hex_类和静态方法__encodeHexString()_。

我们需要将Apache Commons Codec依赖项添加到我们的_pom.xml_文件中：

```xml
`<dependency>`
    `<groupId>`commons-codec`</groupId>`
    `<artifactId>`commons-codec`</artifactId>`
    `<version>`1.15`</version>`
`</dependency>`
```

现在，我们准备实现我们的测试用例：

```java
@Test
public void givenIntegerValue_whenUseApacheCommons_thenWillGetHexSignedValue() {
    String result = Hex.encodeHexString(new byte[] { (byte) 254 });
    assertEquals("fe", result);
}
```

在上面的测试中，我们传递了一个字节数组作为参数——只有一个元素的数组。我们将整数输入值强制转换为_byte_数据类型。

这种方法的主要缺点是因为Java中的_byte_数据类型是一个8位有符号的二进制补码整数，其值范围从_-128_到_127_。对于小于_255_的值，我们可以毫无问题地使用这种方法。

类似于这种方法的行为是由_java.util.HexFormat_使用的。这个特性是在Java 17中引入的。_HexFormat_类提供了一个简单方便的方法来在字节数组和它们相应的十六进制字符串表示之间进行转换。

## 8. 结论

在本文中，我们使用不同的方法实现了将整数值转换为十六进制的代码示例。通过更深入的代码理解和最佳实践，我们可以有效地执行转换并优化我们的代码性能。在我们的测试中，我们使用了Java中的内置方法和库。

像往常一样，本文中使用的所有代码片段都可以在GitHub上找到。