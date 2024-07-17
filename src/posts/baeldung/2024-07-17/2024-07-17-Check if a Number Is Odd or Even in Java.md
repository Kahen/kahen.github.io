---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Number Parity
  - Bitwise Operations
  - Least Significant Bit
head:
  - - meta
    - name: keywords
      content: Java, Number Parity, Bitwise Operations, Least Significant Bit
------
# 在Java中检查数字是奇数还是偶数

## 1. 概述

众所周知，数字的奇偶性由其除以2的余数决定。偶数的余数为0，而奇数的余数为1。

在本教程中，**我们将看到多种在Java中检查数字是偶数还是奇数的方法。**

## 2. 除法方法

返回除法余数的算术运算符是模运算符 _%_。

我们可以通过将数字除以2并检查余数来验证数字是偶数还是奇数的最简单方法是：

```java
boolean isEven(int x) {
    return x % 2 == 0;
}

boolean isOdd(int x) {
    return x % 2 != 0;
}
```

让我们编写一些测试来确认我们方法的行为：

```java
assertEquals(true, isEven(2));
assertEquals(true, isOdd(3));
```

## 3. 位运算方法

我们可以对数字执行多个位运算来确定它是偶数还是奇数。

**位运算** **比其他方法更高效** **以确定数字的奇偶性。**

### 3.1. 位运算 _OR_ (\\|)

**偶数 _OR_ 1 总是将数字增加1。**

**奇数 _OR_ 1 总是得到** **相同的数字：**

```java
boolean isOrEven(int x) {
    return (x | 1) > x;
}

boolean isOrOdd(int x) {
    return (x | 1) == x;
}
```

让我们用一些测试来演示我们的代码行为：

```java
assertEquals(true, isOrEven(4));
assertEquals(true, isOrOdd(5));
```

### 3.2. 位运算 _AND_ ( _\u0026_)

**偶数 _AND_ 1 总是得到0。** 另一方面，**奇数 _AND_ 1** **总是得到1：**

```java
boolean isAndEven(int x) {
    return (x & 1) == 0;
}

boolean isAndOdd(int x) {
    return (x & 1) == 1;
}
```

我们将通过一个小测试来确认这种行为：

```java
assertEquals(true, isAndEven(6));
assertEquals(true, isAndOdd(7));
```

### 3.3. 位运算 _XOR_ ( _^_)

**位运算 _XOR_ 是** **检查数字奇偶性的** **最佳解决方案。**

**偶数 _XOR_ 1 总是** **增加数字1，而** **奇数 _XOR_ 1 总是** **减少它1：**

```java
boolean isXorEven(int x) {
    return (x ^ 1) > x;
}

boolean isXorOdd(int x) {
    return (x ^ 1) < x;
}
```

让我们编写一些小型测试来检查我们的代码：

```java
assertEquals(true, isXorEven(8));
assertEquals(true, isXorOdd(9));
```

## 4. 最低有效位 (LSB)

我们展示的最后方法是读取数字的最低有效位。

**偶数的最低有效位** **总是0，而奇数的最低有效位总是1：**

```java
boolean isLsbEven(int x) {
    return Integer.toBinaryString(x).endsWith("0");
}

boolean isLsbOdd(int x) {
    return Integer.toBinaryString(x).endsWith("1");
}
```

我们将通过几行代码来演示这种行为：

```java
assertEquals(true, isLsbEven(10));
assertEquals(true, isLsbOdd(11));
```

## 5. 结论

在本文中，我们学习了多种检查数字奇偶性的方法，即它是偶数还是奇数。我们看到**检查奇偶性的最佳解决方案是位运算 _XOR_ 操作。**

一如既往，示例的源代码可以在GitHub上找到。