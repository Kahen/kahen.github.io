---
date: 2024-07-24
category:
  - Java
tag:
  - String
  - split
head:
  - - meta
    - name: keywords
      content: Java, String, split, delimiter
------
# 在Java中仅在第一个分隔符处分割字符串

## 1. 概述

在本教程中，我们将学习如何使用两种方法在Java中仅在第一个分隔符处分割一个_String_。

## 2. 问题陈述

假设我们有一个文本文件，每行都是一个字符串，由两部分组成——左部分表示一个人的名字，右部分表示他们的问候语：

```
Roberto "I wish you a bug-free day!"
Daniele "Have a great day!"
Jonas "Good bye!"
```

随后，我们希望从每行中获取人的名字。

我们可以看到，这两部分由一个空格（” ”）分隔，就像右部分的其他单词一样。因此，我们的分隔符将是空格字符。

## 3. 使用 _split()_ 方法

_String_ 类的 _split()_ 实例方法根据提供的正则表达式分割字符串。此外，我们可以使用其重载变体之一来获取所需的第一个出现。

我们可以向 _split()_ 方法提供一个 _limit_ 作为参数，以指定我们想要应用模式的次数，从而确定结果数组中的最大令牌数。例如，如果我们将 _limit_ 设置为 _n_（_n_ > 0），这意味着模式将最多应用 _n-1_ 次。

这里，我们将使用空格（” ”）作为正则表达式，在第一个空格出现时分割 _String_。

因此，我们可以使用重载的 _split()_ 方法将每行标记为两部分：

```java
public String getFirstWordUsingSplit(String input) {
    String[] tokens = input.split(" ", 2);
    return tokens[0];
}
```

因此，如果我们将示例中的第一行作为输入传递给此方法，它将返回“Roberto”。

**但是，如果输入_String_只有一个单词或没有空格，上述方法将简单地返回相同的_String_。**

让我们来测试一下：

```java
assertEquals("Roberto", getFirstWordUsingSplit("Roberto \"I wish you a bug-free day\""));
assertEquals("StringWithNoSpace", getFirstWordUsingSplit("StringWithNoSpace"));
```

## 4. 使用 _substring()_ 方法

_String_ 类的 _substring()_ 方法返回一个_String_ 的子字符串。它是一个重载方法，其中一个重载版本接受 _index_ 并返回给定索引之前的所有字符。

让我们结合 _substring()_ 和 _indexOf()_ 来解决同样的问题。

首先，我们将获取第一个空格字符的索引。然后，我们将获取到此索引的子字符串，这将是我们的结果，即人的名字：

```java
public String getFirstWordUsingSubString(String input) {
    return input.substring(0, input.indexOf(" "));
}
```

如果我们传递与之前相同的输入_String_，我们的方法将返回_String_“Roberto”。

**但是，如果输入_String_不包含任何空格，那么这种方法将抛出 _StringIndexOutOfBoundsException_。** 如果没有找到匹配项，_indexOf()_ 方法返回 -1。

为了避免这种异常，我们可以修改上述方法：

```java
public String getFirstWordUsingSubString(String input) {
    int index = input.contains(" ") ? input.indexOf(" ") : 0;
    return input.substring(0, index);
}
```

现在，如果我们传递一个没有空格的_String_到这个方法，我们将得到一个空的_String_作为返回。

让我们来测试一下：

```java
assertEquals("Roberto", getFirstWordUsingSubString("Roberto \"I wish you a bug-free day\""));
assertEquals("", getFirstWordUsingSubString("StringWithNoSpace"));
```

## 5. 结论

在本文中，我们看到了在Java中仅在第一个分隔符处分割一个_String_的两种方法。