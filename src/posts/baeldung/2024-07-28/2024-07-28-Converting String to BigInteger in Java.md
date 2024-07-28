---
date: 2024-07-28
category:
  - Java
  - BigInteger
tag:
  - Java
  - BigInteger
  - String
head:
  - - meta
    - name: keywords
      content: Java, BigInteger, String, 转换
---

# Java中将字符串转换为BigInteger

在本教程中，我们将演示如何将字符串转换为BigInteger。BigInteger通常用于处理非常大的数值，这些数值通常是由任意的算术计算得出的结果。

## 2. 将十进制（基数10）整数字符串转换
要将十进制字符串转换为BigInteger，我们将使用**BigInteger(String value)构造函数**：

```java
String inputString = "878";
BigInteger result = new BigInteger(inputString);
assertEquals("878", result.toString());
```

## 3. 转换非十进制整数字符串
使用默认的**BigInteger(String value)构造函数**转换非十进制字符串，如十六进制数字，**我们可能会得到一个** NumberFormatException：

```java
String inputString = "290f98";
new BigInteger(inputString);
```

这个异常可以通过两种方式处理。

一种方式是使用**BigInteger(String value, int radix)构造函数**：

```java
String inputString = "290f98";
BigInteger result = new BigInteger(inputString, 16);
assertEquals("2690968", result.toString());
```

在这种情况下，我们指定基数或基数为16，用于将十六进制转换为十进制。

另一种方式是首先**将非十进制字符串转换为字节数组，然后使用BigInteger(byte [] bytes)构造函数**：

```java
byte[] inputStringBytes = inputString.getBytes();
BigInteger result = new BigInteger(inputStringBytes);
assertEquals("290f98", new String(result.toByteArray()));
```

这样可以得到正确的结果，因为**BigInteger(byte [] bytes)构造函数**将包含二进制补码表示的字节数组转换为BigInteger。

## 4. 结论
在本文中，我们查看了在Java中将字符串转换为BigInteger的几种方式。

如常，本教程中使用的所有代码示例都可以在GitHub上找到。