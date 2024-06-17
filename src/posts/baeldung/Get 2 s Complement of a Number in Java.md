由于我无法解析链接，因此无法提供网页内容的翻译。请检查链接是否有效，并确保网页可以正常访问。如果链接有效且网页可以访问，请重新发送链接，我将尽力提供所需的翻译服务。---
date: 2024-06-18
category:
  - Java
  - 计算机科学
tag:
  - 二进制
  - 补码
---

# 在Java中计算一个数的二进制补码

1. 引言

二进制补码是计算机科学中的一个基本概念，特别是在处理有符号二进制数时。它允许在固定数量的位内表示正整数和负整数。

在本教程中，我们将学习如何在Java中计算一个数的二进制补码。

2. 什么是二进制补码？

在计算机系统中，值是通过一系列由0和1组成的二进制数字来表示的。存在不同的方式在二进制表示中编码这些值，例如符号-数值表示法、1的补码、2的补码等。

**二进制补码表示法是一种非常高效的方式来存储和操作有符号数**。在这里，最高有效位（MSB）表示数字的符号，0表示正数，1表示负数。这种表示简化了二进制数的加法和减法操作。

3. 算法

让我们看看计算一个数的二进制补码的算法。**对于正数，其二进制补码值与其二进制表示相同**。然而，对于负数，我们可以使用以下算法来确定其二进制补码：

```
if number >= 0
  convert to binary and return
else
  take the absolute value and convert to binary
  calculate 1's complement by flipping 1s and 0s
  Add 1 to the 1's complement and return the value
```

这个算法计算给定数字的二进制补码值。

4. 实现

我们可以在Java中实现上述算法。

### 4.1. 算法实现

我们将根据算法定义的步骤逐步实现逻辑。我们从用户那里获取表示所需的位数和数字本身。此外，我们使用_BigInteger_来表示输入数字以支持更大的数字。

首先，我们检查数字是否为负。如果它是非负的，我们可以将其转换为二进制格式并返回结果。否则，我们继续通过调用相应的方法计算二进制补码：

```java
public static String decimalToTwosComplementBinary(BigInteger num, int numBits) {
    if (!canRepresentInNBits(num, numBits)) {
        throw new IllegalArgumentException(numBits + " bits is not enough to represent the number " + num);
    }
    var isNegative = num.signum() == -1;
    var absNum = num.abs();
    // Convert the abs value of the number to its binary representation
    String binary = absNum.toString(2);
    // Pad the binary representation with zeros to make it numBits long
    while (binary.length() `< numBits) {
        binary = "0" + binary;
    }
    // If the input number is negative, calculate two's complement
    if (isNegative) {
        binary = performTwosComplement(binary);
    }
    return formatInNibbles(binary);
}
```

**我们可以使用_toString()_方法，基数值为2，将_BigInteger_转换为其二进制表示**。在转换之前，我们取输入的绝对值，因为对于正数和负数，二进制补码的逻辑是不同的。此外，我们向二进制值的左侧添加额外的零，以确保其与指定的位数对齐。此外，我们验证数字是否可以在给定的位数内表示：

```java
private static boolean canRepresentInNBits(BigInteger number, int numBits) {
    BigInteger minValue = BigInteger.ONE.shiftLeft(numBits - 1).negate(); // -2^(numBits-1)
    BigInteger maxValue = BigInteger.ONE.shiftLeft(numBits - 1).subtract(BigInteger.ONE); // 2^(numBits-1) - 1
    return number.compareTo(minValue) >`= 0 && number.compareTo(maxValue) `<= 0;
}
```

现在，让我们看看_performTwosComplement()_方法的实现，它计算负数的二进制补码：

```java
private static String performTwosComplement(String binary) {
    StringBuilder result = new StringBuilder();
    boolean carry = true;
    // Perform one's complement
    StringBuilder onesComplement = new StringBuilder();
    for (int i = binary.length() - 1; i >`= 0; i--) {
        char bit = binary.charAt(i);
        onesComplement.insert(0, bit == '0' ? '1' : '0');
    }
    // Addition by 1
    for (int i = onesComplement.length() - 1; i >= 0; i--) {
        char bit = onesComplement.charAt(i);
        if (bit == '1' && carry) {
            result.insert(0, '0');
        } else if (bit == '0' && carry) {
            result.insert(0, '1');
            carry = false;
        } else {
            result.insert(0, bit);
        }
    }
    if (carry) {
        result.insert(0, '1');
    }
    return result.toString();
}
```

在这个方法中，我们首先通过将1翻转为0，反之亦然，计算给定二进制数的1的补码。随后，我们通过给1的补码结果加一，得到给定二进制字符串的二进制补码值。

为了更好的可读性，我们可以实现一个方法，将二进制字符串格式化为每组4位（半字节）：

```java
private static String formatInNibbles(String binary) {
    StringBuilder formattedBin = new StringBuilder();
    for (int i = 1; i `<= binary.length(); i++) {
        if (i % 4 == 0 && i != binary.length()) {
            formattedBin.append(binary.charAt(i - 1)).append(" ");
        } else {
            formattedBin.append(binary.charAt(i - 1));
        }
    }
    return formattedBin.toString();
}
```

现在，计算二进制补码的算法已经完全实现。

### 4.2. 替代实现

另外，基于二进制加法的性质，我们可以更简单地计算二进制补码。在这种方法中，我们从二进制字符串的最右侧开始迭代。**一旦检测到第一个1，我们就反转这个位左侧的所有位**。让我们继续实现这种方法：

```java
private static String performTwosComplementUsingShortCut(String binary) {
    int firstOneIndexFromRight = binary.lastIndexOf('1');
    if (firstOneIndexFromRight == -1) {
        return binary;
    }
    String rightPart = binary.substring(firstOneIndexFromRight);
    String leftPart = binary.substring(0, firstOneIndexFromRight);
    String leftWithOnes = leftPart.chars().mapToObj(c ->` c == '0' ? '1' : '0')
            .map(String::valueOf).collect(Collectors.joining(""));
    return leftWithOnes + rightPart;
}
```

这个方法提供了一种更简单的计算给定数字的二进制补码的方法。

5. 测试实现

现在实现已经准备好了，让我们编写单元测试来检查它们的准确性。我们可以使用JUnit的参数化测试来在一个测试中覆盖多个案例：

```java
@ParameterizedTest(name = "Twos Complement of {0} with number of bits {1}")
@CsvSource({
    "0, 4, 0000",
    "1, 4, 0001",
    "-1, 4, 1111",
    "7, 4, 0111",
    "-7, 4, 1001",
    "12345, 16, 0011 0000 0011 1001",
    "-12345, 16, 1100 1111 1100 0111"
})
public void givenNumberAndBits_getTwosComplement(String number, int noOfBits, String expected) {
    String twosComplement = TwosComplement.decimalToTwosComplementBinary(new BigInteger(number), noOfBits);
    Assertions.assertEquals(expected, twosComplement);
}
```

在这个单一测试中，我们包含了各种输入数字的案例。

同样，我们也可以为第二种方法编写测试。

6. 结论

在本文中，我们讨论了给定数字的二进制补码的计算。除了传统算法，我们还介绍了一种更简单的计算替代方法。此外，我们还通过参数化测试覆盖了实现的准确性。

如常，本文中使用的示例代码可以在GitHub上找到。

评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。

OK