---
date: 2024-06-21
category:
  - Java
  - 数字处理
tag:
  - 数字唯一性
  - 集合
  - 流API
  - 位操作
head:
  - - meta
    - name: keywords
      content: Java, 数字唯一性, 集合, 流API, 位操作
---
# 使用Java计算整数中唯一数字的数量

## 1. 概述

在这个简短的教程中，我们将探讨如何使用Java来计算一个整数中包含的唯一数字的数量。

## 2. 理解问题

给定一个整数，我们的目标是计算它包含多少个不同的数字。例如，整数567890有六个不同的数字，而115577只有三个不同的数字（1、5和7）。

## 3. 使用集合

找到整数中唯一数字数量的最直接方式是使用集合。集合本质上可以消除重复项，这使得它们非常适合我们的需求：

```java
public static int countWithSet(int number) {
    number = Math.abs(number);
    Set`<Character>` uniqueDigits = new HashSet<>();
    String numberStr = String.valueOf(number);
    for (char digit : numberStr.toCharArray()) {
        uniqueDigits.add(digit);
    }
    return uniqueDigits.size();
}
```

让我们分解算法的步骤：

- 将整数转换为字符串，以便于遍历每个数字。
- 遍历字符串中的每个字符并添加到`HashSet`中。
- 迭代完成后，`HashSet`的大小将给出唯一数字的计数。

这个解决方案的时间复杂度是O(n)，其中n是整数中的数字数量。向`HashSet`中添加和检查其大小都是O(1)操作，但我们仍然需要遍历每个数字。

## 4. 使用Stream API

Java的Stream API提供了一种简洁现代的解决方案来计算整数中唯一数字的数量。这种方法利用了流的强大功能来处理元素序列，包括以集合的方式处理不同元素：

```java
public static long countWithStreamApi(int number) {
    return String.valueOf(Math.abs(number)).chars().distinct().count();
}
```

让我们检查涉及的步骤：

- 将数字转换为字符串。
- 使用字符串的`chars()`方法获取字符流。
- 使用`distinct()`方法过滤掉重复的数字。
- 使用`count()`方法获取唯一数字的数量。

时间复杂度与第一个解决方案相同。

## 5. 使用位操作

让我们探索另一种解决方案。位操作也提供了一种跟踪唯一数字的方式：

```java
public static int countWithBitManipulation(int number) {
    if (number == 0) {
        return 1;
    }
    number = Math.abs(number);
    int mask = 0;
    while (number > 0) {
        int digit = number % 10;
        mask |= 1 << digit;
        number /= 10;
    }
    return Integer.bitCount(mask);
}
```

这次我们的代码步骤如下：

- 初始化一个整数`mask`为0。`mask`中的每个位将代表一个0-9的数字。
- 遍历数字的每个数字。
- 对于每个数字，创建一个位表示。如果数字是d，则位表示为1<<d。
- 使用位或运算符更新`mask`。这将标记数字已被看到。
- 计算`mask`中设置为1的位数。这个计数就是唯一数字的数量。

时间复杂度也与上述解决方案相同。

## 6. 结论

本文提供了计算整数中唯一数字数量的不同方法及其时间复杂度。

本文的示例代码可以在GitHub上找到。