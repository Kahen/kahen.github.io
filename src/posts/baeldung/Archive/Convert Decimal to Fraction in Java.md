---
date: 2024-06-13
category:
  - Java
  - 编程
tag:
  - 十进制转分数
  - Java
---
# Java中将十进制转换为分数

1. 引言

分数是表示数字的另一种方式，由分子和分母组成。例如，分数3/5可以被看作是“5分之3”，表示的值与十进制数0.6相同。在本教程中，我们将探讨在Java中将十进制数字转换为分数的不同方法。

2. 使用乘以10的幂

将十进制转换为分数的一种简单方法是将十进制乘以10的幂，然后使用结果的分子和分母作为分数。

以下是这种方法的代码片段：

```java
String convertDecimalToFractionUsingMultiplyingWithPowerOf10(double decimal) {
    String decimalStr = String.valueOf(decimal);
    int decimalPlaces = decimalStr.length() - decimalStr.indexOf('.') - 1;

    long denominator = (long) Math.pow(10, decimalPlaces);
    long numerator = (long) (decimal * denominator);

    return numerator + "/" + denominator;
}
```

首先，我们通过查找小数点在字符串中的位置并从小字符串的长度中减去它来计算小数位数。然后我们通过将10提高到小数位数的幂来计算分母。

接下来，我们将原始的十进制数乘以分母以确定分子。该方法通过将分子和分母用斜杠(/)分隔符连接起来，返回分数的字符串表示。

让我们使用_assertEquals()_验证我们的解决方案：

```java
assertEquals("5/10", convertDecimalToFractionUsingMultiplyingWithPowerOf10(0.5));
assertEquals("1/10", convertDecimalToFractionUsingMultiplyingWithPowerOf10(0.1));
assertEquals("6/10", convertDecimalToFractionUsingMultiplyingWithPowerOf10(0.6));
assertEquals("85/100", convertDecimalToFractionUsingMultiplyingWithPowerOf10(0.85));
assertEquals("125/100", convertDecimalToFractionUsingMultiplyingWithPowerOf10(1.25));
assertEquals("1333333333/1000000000", convertDecimalToFractionUsingMultiplyingWithPowerOf10(1.333333333));
```

这种方法简单且易于实现，但它有一些限制。简单的转换可能不会产生最简化形式的分数。例如，使用这种方法转换0.5将得到5/10，这可以简化为1/2。

3. 使用最大公约数(GCD)

将十进制转换为分数的一种更健壮的方式是使用最大公约数(GCD)来简化分数。GCD是能够同时整除分子和分母而不留下余数的最大数字。

首先，我们创建一个_gcd()_方法，使用欧几里得算法计算两个整数_a_和_b_的最大公约数：

```java
long gcd(long a, long b) {
    if (b == 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}
```

在方法内部，我们检查：

- 如果_b_为0，则GCD是_a_。
- 否则，通过递归地找到_b_和_a_除以_b_的余数的GCD来计算GCD。

接下来，我们创建一个方法来应用_gcd()_方法简化分数：

```java
String convertDecimalToFractionUsingGCD(double decimal) {
    String decimalStr = String.valueOf(decimal);
    int decimalPlaces = decimalStr.length() - decimalStr.indexOf('.') - 1;
    long denominator = (long) Math.pow(10, decimalPlaces);
    long numerator = (long) (decimal * denominator);

    long gcd = gcd(numerator, denominator);
    numerator /= gcd;
    denominator /= gcd;

    return numerator + "/" + denominator;
}
```

与之前的方法类似，我们计算小数位数以确定分母。然后通过将原始的十进制数乘以分母来确定分子。

然后我们应用_gcd()_方法来计算分子和分母的GCD。之后，我们通过将分子和分母都除以GCD来简化分数。这确保了分数处于其最简形式。

最后，该方法通过将分子和分母用斜杠(/)分隔符连接起来，返回简化后的分数作为字符串：

```java
assertEquals("1/2", convertDecimalToFractionUsingGCD(0.5));
assertEquals("1/10", convertDecimalToFractionUsingGCD(0.1));
assertEquals("3/5", convertDecimalToFractionUsingGCD(0.6));
assertEquals("17/20", convertDecimalToFractionUsingGCD(0.85));
assertEquals("5/4", convertDecimalToFractionUsingGCD(1.25));
assertEquals("4/3", convertDecimalToFractionUsingGCD(1.333333333));
```

虽然这种方法在寻找GCD方面是高效的，但对于非常大的数字来说，它可能会变得计算上很昂贵。这是因为每次递归调用都涉及计算取模操作(%)，这可能对大输入来说很慢。

4. 使用Apache Commons Math

最后，我们也可以像Apache Commons Math这样的库来将十进制转换为分数。在这种情况下，我们利用Apache Commons Math中的_Fraction_类将十进制转换为分数：

```java
String convertDecimalToFractionUsingApacheCommonsMath(double decimal) {
    Fraction fraction = new Fraction(decimal);
    return fraction.toString();
}
```

要将十进制转换为分数，我们通过将十进制值传递给其构造函数来创建一个_Fraction_对象。一旦我们有了表示十进制值的_Fraction_对象，我们可以调用其_toString()_方法来获取分数的字符串表示。

_toString()_方法以“分子/分母”的形式返回分数：

```java
assertEquals("1 / 2", convertDecimalToFractionUsingApacheCommonsMath(0.5));
assertEquals("1 / 10", convertDecimalToFractionUsingApacheCommonsMath(0.1));
assertEquals("3 / 5", convertDecimalToFractionUsingApacheCommonsMath(0.6));
assertEquals("17 / 20", convertDecimalToFractionUsingApacheCommonsMath(0.85));
assertEquals("5 / 4", convertDecimalToFractionUsingApacheCommonsMath(1.25));
assertEquals("4 / 3", convertDecimalToFractionUsingApacheCommonsMath(1.333333333));
```

5. 处理循环小数

我们可能会观察到，将十进制值1.333333333应用于前两种方法和Apache Commons Math库的结果不同。这是因为它们以不同的方式处理循环小数。

循环小数是在小数点后无限重复的数字序列。例如，十进制数1.333333333在小数点后有一个无限重复的数字3序列。

要将循环小数转换为分数，我们首先确定在小数点后无限重复的数字序列：

```java
String extractRepeatingDecimal(String fractionalPart) {
    int length = fractionalPart.length();
    for (int i = 1; i \<= length / 2; i++) {
        String sub = fractionalPart.substring(0, i);
        boolean repeating = true;
        for (int j = i; j + i \<= length; j += i) {
            if (!fractionalPart.substring(j, j + i).equals(sub)) {
                repeating = false;
                break;
            }
        }
        if (repeating) {
            return sub;
        }
    }
    return "";
}
```

接下来，我们增强_convertDecimalToFractionUsingGCD()_以处理循环小数：

```java
String convertDecimalToFractionUsingGCDRepeating(double decimal) {
    String decimalStr = String.valueOf(decimal);
    int indexOfDot = decimalStr.indexOf('.');
    String afterDot = decimalStr.substring(indexOfDot + 1);
    String repeatingNumber = extractRepeatingDecimal(afterDot);

    if (repeatingNumber == "") {
        return convertDecimalToFractionUsingGCD(decimal);
    } else {
        //...
    }
}
```

一旦检测到循环小数，我们继续通过确定几个关键属性：

```java
int n = repeatingNumber.length();
int repeatingValue = Integer.parseInt(repeatingNumber);
int integerPart = Integer.parseInt(decimalStr.substring(0, indexOfDot));
int denominator = (int) Math.pow(10, n) - 1;
int numerator = repeatingValue + (integerPart * denominator);
```

- _n_: 循环序列中的数字长度。
- _repeatingValue_: 循环数字的数值。
- _integerPart_: 从小数点前的十进制中提取的整数部分
- _denominator_: **分母是通过将10提高到_n_的幂并减去1得出的**
- 分子：通过将_repeatingValue_与_integerPart_和分母的乘积相加来计算分子。

接下来，我们可以应用_gcd()_方法来计算分子和分母的GCD：

```java
int gcd = gcd(numerator, denominator);
numerator /= gcd;
denominator /= gcd;
return numerator + "/" + denominator;
```现在，让我们验证我们处理循环小数的解决方案：

```java
assertEquals("1/2", convertDecimalToFractionUsingGCDRepeating(0.5));
assertEquals("17/20", convertDecimalToFractionUsingGCDRepeating(0.85));
assertEquals("5/4", convertDecimalToFractionUsingGCDRepeating(1.25));
assertEquals("4/3", convertDecimalToFractionUsingGCDRepeating(1.333333333));
assertEquals("7/9", convertDecimalToFractionUsingGCDRepeating(0.777777));
```

对于测试案例_1.333333333_，我们确定循环数字_repeatingValue_是_3_。**这意味着数字“_3_”在小数点后无限重复。** 循环序列的长度是1，这表明循环模式由单一位的重复组成。

**接下来，我们通过将10提高到_n_的幂并减去1来确定分母，这将是** _10^1 – 1 = 9_。分子通过将_repeatingValue_加到_integerPart_与分母的乘积上计算得出，这将是_3 + (1 * 9) = 12_。

到这一步为止，分数将是_12/9_。**在我们应用_gcd()_方法简化分数后，我们得到了结果_4/3_。**

另外，需要注意的是，这种增强可能不适用于包含循环和非循环部分的十进制数，例如0.1123123123。

## 6. 结论

在本文中，我们探讨了几种将十进制转换为分数的方法。对于大多数情况，使用GCD方法在简单性和确保分数简化之间提供了良好的平衡。

如往常一样，示例的源代码可在GitHub上找到。
OK
