---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - String
  - Iteration
head:
  - - meta
    - name: keywords
      content: Java, String, Iteration, Characters
---
# 如何在Java中迭代字符串字符 | Baeldung

## 1. 概述

在本教程中，我们将熟悉在Java中迭代字符串字符的几种方式，以及它们的时间和空间复杂度。

## 2. 迭代字符串的常见方式

在Java中，有几种方式可以迭代字符串的字符，每种方式都有自己的时间和空间复杂度。使用最佳方法取决于您的程序的具体需求。

### 2.1. for循环

我们可以使用一个简单的for循环来迭代字符串的字符。这种方法的时间复杂度为O(n)，其中n是字符串str的长度，空间复杂度为O(1)，因为它只要求一个单独的循环变量：

```java
String str = "Hello, Baeldung!";
for (int i = 0; i `< str.length(); i++) {
    char c = str.charAt(i);
    System.out.print(c);
}
```

### 2.2. toCharArray()

**toCharArray()方法首先将字符串转换为字符数组**，我们可以使用它来执行迭代。这种方法的时间复杂度为O(n)，其中n是字符串str的长度，空间复杂度为O(n)，因为它创建了一个新的char数组：

```java
String str = "Hello, Baeldung!";
for (char c : str.toCharArray()) {
    System.out.print(c);
}
```

### 2.3. Java 8 Stream

**我们可以使用Java 8 Streams来处理字符串中的每个字符**。这种方法的时间复杂度为O(n)，空间复杂度取决于您在流上执行的中间操作：

```java
String str = "Hello, Baeldung!";
str.chars().forEach(c ->` {
    System.out.print((char) c);
});
```

请注意，在上述代码中，我们需要将变量c强制转换为char类型，因为chars()返回一个IntStream。

### 2.4. CharacterIterator

我们使用以下CharacterIterator方法来迭代字符串：

- **current()**: 获取当前字符
- **next()**: 向前移动一个位置

StringCharacterIterator提供了CharacterIterator的实现。这个接口允许双向迭代字符串。迭代器迭代一个有界字符序列。迭代器维护一个当前字符索引，其有效范围是从getBeginIndex()到getEndIndex()。

在这里，时间复杂度是O(n)，其中n是字符串str的长度，空间复杂度为O(1)，因为它只要求一个单独的while循环迭代器：

```java
String str = "Hello, Baeldung!";
CharacterIterator it = new StringCharacterIterator(str);
while (it.current() != CharacterIterator.DONE) {
    System.out.print(it.current());
    it.next();
}
```

## 3. 结论

使用最佳方法取决于我们的特定用例。在大多数情况下，简单的for循环或增强型for循环是迭代字符串字符最直接和有效的方式。**它们具有低空间复杂度和O(n)的时间复杂度，这是我们为这项任务所能达到的最佳。**

当我们需要对字符执行复杂操作或想要利用它提供的函数式编程能力时，我们可以使用Java 8 Streams。

像往常一样，所有这些示例的源代码都可以在GitHub上找到。