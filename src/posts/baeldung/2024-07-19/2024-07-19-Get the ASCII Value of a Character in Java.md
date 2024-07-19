---
date: 2022-04-01
category:
  - Java
  - ASCII
tag:
  - Java
  - ASCII
  - Character
head:
  - - meta
    - name: keywords
      content: Java, ASCII, Character
------
# 在Java中获取字符的ASCII值

## 1. 概述

在这篇简短的教程中，我们将看到如何在Java中**获取字符的ASCII值**以及**将ASCII值转换为其字符等价物**。

### 2.1. 使用强制类型转换

要获取字符的ASCII值，我们可以简单地将我们的_char_强制转换为_int_：

```java
char c = 'a';
System.out.println((int) c);
```

这里是输出结果：

```java
97
```

记住，Java中的_char_可以是Unicode字符。因此**我们的角色必须是一个ASCII字符**，才能获得其正确的ASCII数值。

### 2.2. 字符串中的字符

如果我们的_char_在_String_中，我们可以使用_charAt()_方法来检索它：

```java
String str = "abc";
char c = str.charAt(0);
System.out.println((int) c);
```

## 3. 获取ASCII值对应的字符

简单来说，我们可以通过强制类型转换将ASCII值转换为其等价的_char_：

```java
int value = 65;
char c = (char) value;
System.out.println(c);
```

这是代码的输出结果：

```java
A
```

值得注意的是，我们需要提供一个在ASCII值范围内（_0_– _127_）的整数，才能获得相应的ASCII字符。任何超出ASCII范围的整数不会返回_null_，而是返回该整数值在Unicode字符集中的字符表示。

## 4. 结论

在这篇文章中，我们学习了如何在Java中获取字符的ASCII值。此外，我们还看到了如何获取ASCII值对应的字符。