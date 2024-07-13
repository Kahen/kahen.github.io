---
date: 2022-04-01
category:
  - Java
  - String
tag:
  - Java
  - String
  - char
head:
  - - meta
    - name: keywords
      content: Java, String, char, 转换
------
# Java中将字符串转换为字符的教程

## 1. 概述

字符串是Java中常见的数据类型，而字符（char）是Java的基本数据类型。

在本教程中，我们将探讨如何在Java中将字符串对象转换为字符。

## 2. 问题介绍

我们知道，字符（char）只能包含一个单一的字符。然而，字符串对象可以包含多个字符。

因此，我们的教程将涵盖两种情况：

- 源字符串是单个字符。
- 源字符串是多个字符。

对于第一种情况，我们可以很容易地将单个字符的字符串转换为字符。例如，假设这是我们的输入：

```java
String STRING_b = "b";
```

转换后，我们期望得到字符 'b'。

对于第二种情况，如果源字符串是多字符字符串，我们仍然想要得到一个单一的字符作为结果，我们必须分析需求以选择所需的字符，比如第一个、最后一个或第n个字符。

在本教程中，我们将提供一个更一般的解决方案。我们将把源字符串转换为一个字符数组，该数组包含字符串中的每个字符。这样，我们可以根据需求选择任何元素。

我们将使用 "STRING_Baeldung" 作为输入示例：

```java
String STRING_Baeldung = "Baeldung";
```

接下来，让我们看看它们是如何工作的。

## 3. 单个字符的字符串

Java的字符串类提供了charAt()方法，用于从输入字符串中获取第n个字符（从0开始）作为字符。因此，我们可以直接调用getChar(0)方法将单个字符的字符串转换为字符：

```java
assertEquals('b', STRING_b.charAt(0));
```

然而，我们应该注意，如果输入是一个空字符串，charAt()方法调用会抛出StringIndexOutOfBoundsException：

```java
assertThrows(StringIndexOutOfBoundsException.class, () -> "".charAt(0));
```

因此，在调用charAt()方法之前，我们应该检查输入字符串是否为空或为null。

## 4. 多个字符的字符串

我们已经学会了使用charAt(0)将单个字符的字符串转换为字符。如果输入是一个多字符的字符串，并且我们知道我们想要转换为字符的确切字符，我们仍然可以使用charAt()方法。例如，我们可以从输入字符串 "Baeldung" 中获取第四个字符（'l'）：

```java
assertEquals('l', STRING_Baeldung.charAt(3));
```

此外，我们可以使用String.toCharArray()获取一个包含所有字符的字符数组：

```java
assertArrayEquals(new char[] { 'B', 'a', 'e', 'l', 'd', 'u', 'n', 'g' }, STRING_Baeldung.toCharArray());
```

值得一提的是，toCharArray()方法也适用于空字符串输入。它返回一个空的字符数组作为结果：

```java
assertArrayEquals(new char[] {}, "".toCharArray());
```

除了toCharArray()，String.getChars()可以从给定的字符串中提取连续的字符到字符数组。该方法接收四个参数：

- srcBegin - 字符串中要取的第一个字符的索引（包括）
- srcEnd - 字符串中要复制的最后一个字符的索引（不包括）
- dst - 目标数组，这是我们的结果
- dstBegin - 目标数组中的起始偏移量。我们将通过一个示例进行讨论。

首先，让我们从字符串 "Baeldung" 中提取 "aeld" 并将其填充到一个预定义的字符数组：

```java
char[] aeld = new char[4];
STRING_Baeldung.getChars(1, 5, aeld, 0);
assertArrayEquals(new char[] { 'a', 'e', 'l', 'd' }, aeld);
```

正如上面的测试所示，调用getChars()时，我们应该首先有一个字符数组来保存结果。

在示例中，我们在调用getChars()时传递0作为dstBegin。这是因为我们希望转换结果从数组aeld的第一个元素开始。

当然，有时，我们希望结果覆盖数组的中间部分。然后我们可以将dstBegin设置为期望的值。

接下来，让我们再看一个示例，将 "aeld" 转换为字符并从第二个（索引=1）元素开始覆盖目标数组：

```java
char[] anotherArray = new char[] { '#', '#', '#', '#', '#', '#' };
STRING_Baeldung.getChars(1, 5, anotherArray, 1);
assertArrayEquals(new char[] { '#', 'a', 'e', 'l', 'd', '#' }, anotherArray);
```

正如我们所看到的，我们传递dstBegin=1到方法并得到预期的结果。

## 5. 结论

在本文中，我们学习了如何在Java中将字符串转换为字符。

和往常一样，文章中使用的代码可以在GitHub上找到。