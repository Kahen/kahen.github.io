---
date: {2024-07-06}
category:
  - Java
  - Text Processing
tag:
  - String Manipulation
  - Regular Expressions
head:
  - - meta
    - name: keywords
      content: Java, String, Punctuation, Regular Expressions, Unicode
---

# 在Java中从字符串中移除标点符号

在文本处理和分析中，从字符串中消除标点符号是一种常见做法。

在这个快速教程中，让我们探讨如何轻松地从给定的字符串中移除标点符号。

## 2. 问题介绍

假设我们有一个字符串：

```java
static final String INPUT = "It's 1 W o r d (!@#$%^&*{}[];':\")<>,.";
```

正如我们所看到的，字符串_INPUT_包含数字、字母、空白和各种标点符号。

**我们的目标是从字符串中仅移除标点符号，并将字母、数字和空白保留在结果中**：

```java
static final String EXPECTED = "Its 1 W o r d ";
```

在这个教程中，我们将主要使用Java标准库中附带的_String.replaceAll()_方法来解决问题。

为了简单起见，我们将使用单元测试断言来验证结果是否符合预期。

接下来，让我们看看如何移除标点符号。

## 3. 使用正则表达式模式“[^\\s\\p{L}0-9]”和“\\p{Punct}”

我们提到了使用_String.replaceAll()_方法从输入字符串中移除标点。**replaceAll()_方法基于正则表达式进行字符串替换**。它检查输入字符串，并用替换字符串替换所有匹配我们的正则模式的部分。

因此，正则模式是解决这个问题的关键。

由于我们想要在结果中保留字母、数字和空白，**我们可以将任何不是数字、字母或空白字符的字符替换为空字符串**。我们可以使用正则表达式的字符范围[^\\s\\p{L}0-9]来匹配这些字母。

接下来，让我们创建一个测试来检查它是否有效：

```java
String result = INPUT.replaceAll("[^\\s\\p{L}0-9]", "");
assertEquals(EXPECTED, result);
```

如果我们执行它，测试就会通过。正则表达式非常直接。对于那些不熟悉语法的人来说，注意以下几点可能会有所帮助：

- [^…] – 匹配不在[...]中的任何一个字符。例如，[^0-9]匹配任何非数字。
- \\s – \\s匹配任何空白字符，如空格和制表符。

此外，Java的正则表达式引擎支持POSIX字符类。因此，**我们可以直接使用_\\p{Punct}_字符类来匹配任何字符在** _!”#$%&'()*+,-./:;`<=>`?@[\]^_`{|}~:_

```java
String result = INPUT.replaceAll("\\p{Punct}", "");
assertEquals(EXPECTED, result);
```

当我们运行上述测试时，它也会通过。

## 4. 当输入是Unicode字符串时

我们已经成功地看到了两种从输入字符串中移除标点的方法。如果我们仔细看看_INPUT_字符串，我们会意识到它由ASCII字符组成。

一个问题可能会出现 - 如果我们收到像这样的字符串：

```java
static final String UNICODE_INPUT = "3 March März 三月 březen маршировать (!@#$%^&*{}[];':\")<>,.";
```

除了数字‘3’、空白字符和标点符号，这个输入还包括了英语、德语、中文、捷克语和俄语中的“March”这个词。所以，与之前的_INPUT_字符串不同，_UNICODE_INPUT_变量包含Unicode字符。

移除标点后，预期的结果应该是这样的：

```java
static final String UNICODE_EXPECTED = "3 March März 三月 březen маршировать ";
```

接下来，让我们测试我们的两种解决方案是否仍然适用于这个输入：

```java
String result1 = UNICODE_INPUT.replaceAll("[^\\s\\p{L}0-9]", "");
assertNotEquals(UNICODE_EXPECTED, result1);
```

上述测试通过。但我们应该注意到断言是assertNotEquals()。所以“移除[^\\s\\p{L}0-9]”的方法没有产生预期的结果。让我们看看它实际上产生了什么结果：

```java
String actualResult1 = "3 March Mrz  bezen  ";
assertEquals(actualResult1, result1);
```

所以，所有非ASCII字符都与标点符号一起被移除了。显然，**“移除[^\\s\\p{L}0-9]”的方法不适用于Unicode字符串**。

但**我们可以通过将“a-zA-Z”范围替换为“\\p{L}”来修复它**：

```java
String result3 = UNICODE_INPUT.replaceAll("[^\\s\\p{L}0-9]", "");
assertEquals(UNICODE_EXPECTED, result3);
```

值得一提的是，**_\\p{L}_匹配任何字母，包括Unicode字符**。

另一方面，**“移除_\\p{Punct}_”的方法仍然适用于Unicode输入**：

```java
String result2 = UNICODE_INPUT.replaceAll("\\p{Punct}", "");
assertEquals(UNICODE_EXPECTED, result2);
```

这是因为_\\p{Punct}_仅匹配标点字符。

## 5. 结论

在本文中，我们学习了如何使用标准的_String.replaceAll()_方法从字符串中移除标点：

- String.replaceAll("[^\\s\\p{L}0-9]", "") – 只适用于ASCII字符的输入字符串
- String.replaceAll("\\p{Punct}", "") – 适用于ASCII和Unicode字符串
- String.replaceAll("[^\\s\\p{L}0-9]", "") – 适用于ASCII和Unicode字符串

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。