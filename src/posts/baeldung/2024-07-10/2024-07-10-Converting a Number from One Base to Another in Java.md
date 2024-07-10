---
date: 2022-04-01
category:
  - Java
  - Number Conversion
tag:
  - Java
  - Base Conversion
  - Integer Class
head:
  - - meta
    - name: keywords
      content: Java, Base Conversion, Integer Class, parseInt, toString
---
# Java中数字从一个进制转换到另一个进制

在本教程中，我们将探讨如何在Java中将数字从一个进制转换到另一个进制。例如，将数字从二进制转换到五进制以及相反的操作，我们将使用两种方法。

## 2. Integer类
java.lang包中的Integer类是一个包装类，它将基本类型int封装为Integer对象。这个类有几种方法用于操作int，并用于将int转换为String对象，以及将String转换为int类型。我们将需要使用parseInt()和toString()方法来帮助我们进行数字的进制转换。

### 2.1. parseInt()方法
parseInt()方法有两个参数：String s和int radix：
```
public static int parseInt(String s, int radix)
```
**它返回给定字符串参数在指定的基数中的整数值，该基数作为第二个参数给出。** 字符串参数必须是指定基数中的数字。它还会在Java官方文档中提到的某些情况下抛出NumberFormatException。

### 2.2. toString()方法
toString()方法与前面提到的parseInt()方法一起使用，用于将数字从一个进制转换到另一个进制：
```
public static String toString(int i, int radix)
```
根据其签名，这个方法接受两个参数，int i和基数radix。**该方法返回一个表示指定基数的字符串，这是第二个参数。** 如果没有提供第二个参数，它将使用10作为默认值。

## 3. 使用Integer类方法parseInt()和toString()进行进制转换
正如我们之前提到的，Java中将数字从一个进制转换到另一个进制有两种方法。第一种也是最简单的方法是使用Integer类的方法parseInt()和toString()来进行这种从给定基数到目标基数的转换。让我们创建一个使用parseInt()和toString()进行基数转换的方法：

```java
public static String convertNumberToNewBase(String number, int base, int newBase){
    return Integer.toString(Integer.parseInt(number, base), newBase);
}
```

我们的convertNumberToNewBase()方法接受三个参数，一个字符串表示在指定基数或第二个参数的数字进制系统中的数字。第三个参数是新基数的int。该方法返回新基数中的字符串。parseInt()接受字符串参数及其基数，并返回整数值。然后，这个整数值作为toString()方法的第一个参数，将整数转换为新基数中的字符串。

让我们看一个例子：

```java
@Test
void whenConvertingBase10NumberToBase5_ThenResultShouldBeDigitsInBase5() {
    assertEquals(convertNumberToNewBase("89", 10, 5), "324");
}
```

字符串"89"以10进制给出，用于转换为5进制。我们的方法返回字符串结果"324"，这确实是5进制数字系统中的数字。

## 4. 使用自定义方法进行进制转换
我们转换数字进制的另一种方法是编写我们自己的自定义Java方法来执行此任务。建议的方法应该有四个参数，一个数字字符串，一个指定基数的int，以及另一个表示转换新基数的int。

实现这一目标的逻辑方法是创建子方法来处理我们数字转换代码的较小部分。我们将定义一个方法，用于将任何数字从基数2到9和16转换为十进制（基数10），以及另一个用于将数字从基数10转换为基数2到9和16的方法：

```java
public static String convertFromDecimalToBaseX(int num, int newBase) throws IllegalArgumentException {
    if ((newBase `< 2 || newBase >` 10) && newBase != 16) {
        throw new IllegalArgumentException("New base must be from 2 - 10 or 16");
    }
    String result = "";
    int remainder;
    while (num > 0) {
        remainder = num % newBase;
        if (newBase == 16) {
            if (remainder == 10) {
                result += 'A';
            } else if (remainder == 11) {
                result += 'B';
            } else if (remainder == 12) {
                result += 'C';
            } else if (remainder == 13) {
                result += 'D';
            } else if (remainder == 14) {
                result += 'E';
            } else if (remainder == 15) {
                result += 'F';
            } else {
                result += remainder;
            }
        } else {
            result += remainder;
        }
        num /= newBase;
    }
    return new StringBuffer(result).reverse().toString();
}
```

convertFromDecimalToBaseX()方法接受两个参数，一个整数和一个新基数用于转换。**结果是通过不断地将整数除以新基数并取余数来获得的**。该方法还具有基数16数字的条件。另一种方法将任何给定基数转换为基数10，具有一个子方法用于将基数16字符转换为十进制值：

```java
public static int convertFromAnyBaseToDecimal(String num, int base) {
    if (base `< 2 || (base >` 10 && base != 16)) {
        return -1;
    }
    int val = 0;
    int power = 1;
    for (int i = num.length() - 1; i >= 0; i--) {
        int digit = charToDecimal(num.charAt(i));
        if (digit `< 0 || digit >`= base) {
            return -1;
        }
        val += digit * power;
        power *= base;
    }
    return val;
}
public static int charToDecimal(char c) {
    if (c >= '0' && c <= '9') {
        return (int) c - '0';
    } else {
        return (int) c - 'A' + 10;
    }
}
```

我们将这些方法结合起来，拥有一个强大的方法，可以将数字从任何基数转换到另一个基数：

```java
public static String convertNumberToNewBaseCustom(String num, int base, int newBase) {
    int decimalNumber = convertFromAnyBaseToDecimal(num, base);
    String targetBase = "";
    try {
        targetBase = convertFromDecimalToBaseX(decimalNumber, newBase);
    } catch (IllegalArgumentException e) {
        e.printStackTrace();
    }
    return  targetBase;
}
```

让我们测试我们的自定义方法，以确认它按预期工作：

```java
@Test
void whenConvertingBase2NumberToBase8_ThenResultShouldBeDigitsInBase8() {
    assertEquals(convertNumberToNewBaseCustom("11001000", 2, 8), "310");
}
```

当将基数2的字符串“11001000”转换为基数8时，该方法返回字符串“310”。

## 5. 结论
在本教程中，我们学习了如何使用java.lang.Integer类的toString()和parseInt()方法在Java中将数字从一个进制转换到另一个进制。我们将这两种方法整合到另一个方法中以提高可重用性。我们还进一步编写了我们自己的自定义方法，该方法将字符串数字转换为其基数10等效项，然后将其转换为另一个数字进制。整个教程的代码可以在GitHub上找到。