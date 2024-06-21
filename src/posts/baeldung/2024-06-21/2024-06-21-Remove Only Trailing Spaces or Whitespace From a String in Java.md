---
date: 2024-06-22
category:
  - Java
  - String Manipulation
tag:
  - trailing spaces
  - whitespace
  - regex
  - stripTrailing
head:
  - - meta
    - name: keywords
      content: Java, String, trailing spaces, whitespace, regex, stripTrailing
---
# 在Java中仅移除字符串尾部的空格或空白字符

字符串操作是Java编程中的一项常见任务。有时，尾部的空白字符可能会导致不一致性，增加存储大小，甚至引起意外的bug。

在这个快速教程中，我们将探索有效的技术来从给定的字符串中仅移除尾部的空格或空白字符。

## 2. 问题介绍

首先，我们创建一个输入字符串作为示例：

```java
final static String INPUT = "  a b c d e \t  ";
```

当我们谈论移除尾部的空白字符时，trim()方法可能是首先想到的。然而，**trim()方法移除的是首尾的空白字符**：

```java
String result = INPUT.trim();
assertEquals("a b c d e", result);
```

我们必须保留原始输入中的首尾空白字符。因此，**trim()方法并没有解决我们的问题**。

根据需求，我们可能需要消除所有的尾部空白或仅尾部的空格字符。重要的是要认识到**空白包括空格和其他字符，如TAB（‘\t’）**。

例如，考虑以INPUT为例，移除其尾部的空白将得到“ a b c d e”。相反，如果我们打算仅从INPUT中移除尾部的空格字符，我们会期望得到“ a b c d e\t”。如我们所见，TAB字符保持不变。

在这个教程中，我们将涵盖这两种场景，并提供不同的解决方案来移除尾部的空格或空白。

接下来，让我们深入编码。

## 3. 使用正则表达式和replaceAll()方法

正则表达式在Java中是一个强大的字符串操作工具。通过构建一个正则表达式模式来匹配尾部的空格或空白，我们可以有效地使用replaceAll()方法来解决问题。

例如，由于**模式“+$”匹配尾部连续的空格字符**，我们可以将这个正则表达式模式传递给replaceAll()来移除尾部的空格：

```java
String result1 = INPUT.replaceAll(" +$", "");
assertEquals("  a b c d e \t", result1);
```

如我们所见，TAB字符及其前面的空格保持不变。

同样，**“\\s+$”是一个模式，它移除所有尾部的空白**：

```java
String result2 = INPUT.replaceAll("\\s+$", "");
assertEquals("  a b c d e", result2);
```

## 4. 使用stripTrailing()方法

在Java 11中，stripTrailing()方法作为String类的新增功能被引入。顾名思义，**stripTrailing()允许我们方便地移除尾部的空白**：

```java
String result = INPUT.stripTrailing();
assertEquals("  a b c d e", result);
```

## 5. 使用Apache Commons Lang 3的stripEnd()

Apache Commons Lang 3是一个广泛使用的库。它的StringUtils类提供了一套丰富的字符串操作实用工具。例如，**stripEnd()方法从输入字符串中移除指定的尾部字符**。因此，我们可以使用它来移除尾部的空格：

```java
String result = StringUtils.stripEnd(INPUT, " ");
assertEquals("  a b c d e \t", result);
```

值得一提的是，**由于stripEnd()只接受一个预定义的字符串作为stripChars参数，我们不能使用这个方法来移除尾部的空白字符**。

## 6. 结论

在本文中，我们探讨了移除尾部空格或空白的不同方法。这些解决方案包括Java标准库和外部库Apache Commons Lang 3。

如往常一样，示例的完整源代码可在GitHub上找到。