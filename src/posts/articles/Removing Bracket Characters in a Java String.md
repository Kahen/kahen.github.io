---
date: 2024-06-13
category:
  - Java
  - 字符串处理
tag:
  - 字符串
  - 正则表达式
  - Apache Commons Lang
---
在Java字符串中移除括号字符 | Baeldung

## 1. 概述

在Java中使用字符串值时，有时我们需要通过移除特定字符来清理数据。一个常见的场景是移除括号字符。通过正确的方法，移除这些字符可以变得简单直接。

本教程将探讨如何实现这一点。

## 2. 问题介绍

首先，让我们明确需求：什么是括号字符？

如果我们关注ASCII字符，**有三对括号字符**：

- 圆括号/小括号 - ‘(’ 和 ‘)’
- 方括号 - ‘[’ 和 ‘]’
- 花括号 - ‘{’ 和 ‘}’
- 除了这三对之外，**我们通常在实践中使用‘\u003c’和‘\u003e’作为尖括号**，例如在XML标签中。

然而，‘\u003c’和‘\u003e’实际上并不是括号字符。**它们被定义为“小于”和“大于”字符**。但我们将它们视为第四对括号字符，因为它们经常被用作尖括号。

因此，**我们的目标是从给定的字符串中移除这四对字符**。

假设我们有一个字符串值：

```
static final String INPUT = "This (is) \u003ca\u003e [nice] {string}!";
```

如我们所见，_INPUT字符串_包含所有八个括号字符。移除所有括号字符后，我们期望得到这个结果：

```
"This is a nice string!"
```

当然，**我们的输入可能包含Unicode字符**。本教程还涉及Unicode字符串场景。

接下来，让我们以_INPUT为例，看看如何移除字符。

## 3. 使用StringUtils.replaceChars()方法

Apache Commons Lang 3是一个广泛使用的库。**这个库中的StringUtils类提供了丰富的辅助方法，允许我们方便地操作字符串**。

例如，我们可以使用replaceChars()方法来解决我们的问题。这个方法允许我们一次性替换多个字符。此外，**我们可以利用它来删除字符**：

```
String result = StringUtils.replaceChars(INPUT, "(){}[]\u003c\u003e", null);
assertEquals("This is a nice string!", result);
```

如上述代码所示，我们将字符串“(){}\\[\\]\u003c\u003e”作为_searchChars_参数，将_null_值作为_replaceChars_参数。这是因为**当replaceChars为_null时，replaceChars()会从输入字符串中删除searchChars中包含的所有字符**。因此，replaceChars()完成了这项工作。

## 4. 使用基于正则表达式的replaceAll()方法

正则表达式（regex）是匹配字符串中模式的强大工具，允许我们根据定义的标准高效地搜索、替换和操作文本。

接下来，让我们看看如何使用Java标准库中的基于正则表达式的replaceAll()方法来移除括号字符：

```
String regex = "[(){}\u003c\u003e\\\\[\\\\]]";
String result = INPUT.replaceAll(regex, "");
assertEquals("This is a nice string!", result);
```

正则表达式模式看起来相当简单。它只有一个字符类，包括括号字符。

敏锐的眼睛可能已经注意到，我们只在字符类中转义了‘\[’和‘\]’字符，而将‘(){}\u003c\u003e’保持原样。这是因为正则表达式在字符类中按字面意义匹配字符，这意味着**字符类中的所有字符都失去了特殊含义，不需要转义**。

然而，由于‘\[’和‘\]’用于定义字符类本身，我们必须转义它们以**区分它们作为字符类定界符的角色和作为字符类中的文字字符**。

我们已经看到了如何从只包含ASCII字符的字符串输入中删除括号字符。接下来，让我们看看如何移除Unicode括号字符。

假设我们有另一个包含Unicode和ASCII括号字符的字符串输入：

```
static final String INPUT_WITH_UNICODE = "⟨T⟩❰h❱「i」⦇s⦈ (is) \u003ca\u003e [nice] {string}!";
```

如示例所示，除了ASCII括号字符“ _(){}\\[\\]\u003c\u003e_”外，它还包含以下Unicode字符：

- _⟨_ 和 _⟩_ – 数学尖括号 U27E8 和 U27E9
- _❰_ 和 _❱_ – 重尖括号 U2770 和 U2771
- _「_ 和 _」_– 角括号 U300C 和 U300D
- _⦇_ 和 _⦈_ – 图像括号 U2987 和 U2988

还有许多其他的Unicode括号字符我们的示例没有覆盖。幸运的是，**正则表达式支持Unicode类别匹配**。

**我们可以使用_\p{Ps}_和_\p{Pe}_来匹配所有开启和闭合的括号字符**。

接下来，让我们看看这些类别是否可以告诉replaceAll()删除所有括号字符：

```
String regex = "\\p{Ps}|\p{Pe}";

String result = INPUT.replaceAll(regex, "");
assertEquals("This is \u003ca\u003e nice string!", result);

String resultWithUnicode = INPUT_WITH_UNICODE.replaceAll(regex, "");
assertEquals("This is \u003ca\u003e nice string!", resultWithUnicode);
```

上述测试显示大部分字符括号已被移除。然而，**ASCII字符‘ _\u003c_‘和‘ _\u003e_‘仍然保留**。这是因为‘ _\u003c_‘和‘ _\u003e_‘被定义为“小于”和“大于”，而不是尖括号。也就是说，**它们不属于括号类别，不被正则表达式匹配**。

如果我们想要移除‘ _\u003c_‘和‘ _\u003e_‘，**我们可以将字符类“ _[\u003c\u003e]_”添加到模式中**：

```
String regex = "\\p{Ps}|\p{Pe}|[\u003c\u003e]";

String result = INPUT.replaceAll(regex, "");
assertEquals("This is a nice string!", result);

String resultWithUnicode = INPUT_WITH_UNICODE.replaceAll(regex, "");
assertEquals("This is a nice string!", resultWithUnicode);
```

如我们所见，这一次，我们得到了预期的结果。

## 6. 结论

在本文中，我们探讨了从输入字符串中移除括号字符的不同方法，并讨论了如何通过示例移除Unicode括号。

如常，示例的完整源代码可在GitHub上找到。