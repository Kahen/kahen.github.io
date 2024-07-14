---
date: 2022-04-01
category:
  - Java
  - Tutorial
tag:
  - Scanner
  - Character Input
head:
  - - meta
    - name: keywords
      content: Java, Scanner, Character Input, Tutorial
------
# Java Scanner 类接收字符输入

## 1. 概述

在本教程中，我们将看到如何使用 _Scanner_ 类接收字符输入。

## 2. 扫描字符

**Java _Scanner_ 没有提供类似于 _nextInt()_, _nextLine()_ 等的方法来接收字符输入。**

我们可以使用几种方法使用 _Scanner_ 接收字符输入。

让我们首先创建一个输入字符串：

```java
String input = new StringBuilder().append("abc\n")
  .append("mno\n")
  .append("xyz\n")
  .toString();
```

## 3. 使用 _next()_

让我们看看如何使用 _Scanner_ 的 _next()_ 方法和 _String_ 类的 _charAt()_ 方法来接收一个字符作为输入：

```java
@Test
public void givenInputSource_whenScanCharUsingNext_thenOneCharIsRead() {
    Scanner sc = new Scanner(input);
    char c = sc.next().charAt(0);
    assertEquals('a', c);
}
```

**Java Scanner 的 _next()_ 方法返回一个字符串对象。** 我们在这里使用 _String_ 类的 _charAt()_ 方法来从字符串对象中获取字符。

## 4. 使用 _findInLine()_

这个方法接收一个字符串模式作为输入，我们将传递 “.”（点）来匹配只有一个字符。然而，这将返回一个字符串形式的单个字符，所以我们将使用 _charAt()_ 方法来获取字符：

```java
@Test
public void givenInputSource_whenScanCharUsingFindInLine_thenOneCharIsRead() {
    Scanner sc = new Scanner(input);
    char c = sc.findInLine(".").charAt(0);
    assertEquals('a', c);
}
```

## 5. 使用 _useDelimiter()_

这个方法也只扫描一个字符，但作为一个字符串对象，类似于 _findInLine()_ API。我们可以类似地使用 _charAt()_ 方法来获取字符值：

```java
@Test
public void givenInputSource_whenScanCharUsingUseDelimiter_thenOneCharIsRead() {
    Scanner sc = new Scanner(input);
    char c = sc.useDelimiter("").next().charAt(0);
    assertEquals('a', c);
}
```

## 6. 结论

在本教程中，我们学习了如何使用 Java _Scanner_ 接收字符输入。

如常，示例的完整源代码可在 GitHub 上找到。