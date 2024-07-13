---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String
  - Capitalize
head:
  - - meta
    - name: keywords
      content: Java, String, Capitalize, Uppercase, First Letter
------
# Java中将字符串首字母大写的几种方法

## 1. 概述

Java标准库提供了_String.toUpperCase()_方法，允许我们将字符串中的所有字母转换为大写。

在本教程中，我们将学习如何仅将给定字符串的第一个字符转换为大写。

## 2. 问题介绍

一个示例可以快速解释这个问题。假设我们有一个输入字符串：
```
String INPUT = "hi there, Nice to Meet You!";
```

给定这个_INPUT_字符串，这是我们期望的结果：
```
String EXPECTED = "Hi there, Nice to Meet You!";
```

如我们所见，我们只想将第一个字符‘h’更改为‘H’。然而，**其余字符不应被修改**。

当然，如果输入字符串为空，则结果也应该是空字符串：
```
String EMPTY_INPUT = "";
String EMPTY_EXPECTED = "";
```

在本教程中，我们将解决这个问题的几种解决方案。为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否按预期工作。

## 3. 使用_substring()_方法

解决问题的第一个想法是将输入字符串拆分为两个子字符串。例如，我们可以将_INPUT_字符串拆分为“h”和“i there, Nice ….”。换句话说，第一个子字符串只包含第一个字符，另一个子字符串保存字符串的其余部分。

然后，**我们只需对第一个子字符串应用_toUpperCase()_方法并将第二个子字符串连接起来就可以解决问题**。

Java的_String_类的_substring()_方法可以帮助我们获取这两个子字符串：
- _INPUT.substring(0, 1)_ – 包含第一个字符的子字符串1
- _INPUT.substring(1)_ – 持有字符其余部分的子字符串2

接下来，让我们编写一个测试来看看解决方案是否有效：
```
String output = INPUT.substring(0, 1).toUpperCase() + INPUT.substring(1);
assertEquals(EXPECTED, output);
```

如果我们运行测试，它会通过。然而，**如果我们的输入是一个空字符串，这种方法将引发_IndexOutOfBoundsException_**。这是因为当我们调用_INPUT.substring(1)_时，结束索引(1)大于空字符串的长度(0)：

```
assertThrows(IndexOutOfBoundsException.class, () -> EMPTY_INPUT.substring(1));
```

此外，我们应该注意到，如果输入字符串是_null_，这种方法将抛出_NullPointerException_。

**因此，在使用substring方法之前，我们需要检查并确保输入字符串不是_null_或空**。

## 4. 使用_Matcher.replaceAll()_方法

解决这个问题的另一个想法是使用正则表达式(“^._”)来匹配第一个字符并将匹配的组转换为大写。

在Java 9之前，这不是一个容易的任务。这是因为_Matcher_的替换方法，如_replaceAll()_和_replaceFirst()_，不支持_Function_对象或lambda表达式替换器。然而，自Java 9以来，这种情况已经改变了。

**自Java 9以来，_Matcher_的替换方法支持_Function_对象作为替换器。** 也就是说，我们可以使用一个函数来处理匹配的字符序列并完成替换。当然，为了解决我们的问题，我们只需要在匹配的字符上调用_toUpperCase()_方法：

```
String output = Pattern.compile("^.").matcher(INPUT).replaceFirst(m -> m.group().toUpperCase());
assertEquals(EXPECTED, output);
```

如果我们运行测试，它会通过。

如果正则表达式没有匹配到任何内容，替换就不会发生。因此，**这个解决方案也适用于空输入字符串**：

```
String emptyOutput = Pattern.compile("^.").matcher(EMPTY_INPUT).replaceFirst(m -> m.group().toUpperCase());
assertEquals(EMPTY_EXPECTED, emptyOutput);
```

值得一提的是，如果输入字符串是_null_，这个解决方案也会抛出_NullPointerException_。所以，**我们仍然需要在使用它之前进行_null_检查**。

## 5. 使用Apache Commons Lang 3中的_StringUtils_

Apache Commons Lang3是一个流行的库。它提供了许多方便的实用类，并扩展了Java标准库的功能。

**它的_StringUtils_类提供了_capitalize()_方法，直接解决了我们的问题**。

要使用这个库，我们首先添加Maven依赖项：
```
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.12.0`</version>`
`</dependency>`
```

然后，像往常一样，让我们创建一个测试来看看它如何工作：

```
String output = StringUtils.capitalize(INPUT);
assertEquals(EXPECTED, output);
```

如果我们执行测试，它会通过。正如我们所看到的，我们只需简单地调用_StringUtils.capitalize(INPUT)_。然后库为我们完成了工作。

值得一提的是，**_StringUtils.capitalize()_方法是null安全的，也适用于空输入字符串**：

```
String emptyOutput = StringUtils.capitalize(EMPTY_INPUT);
assertEquals(EMPTY_EXPECTED, emptyOutput);
String nullOutput = StringUtils.capitalize(null);
assertNull(nullOutput);
```

## 6. 结论

在本文中，我们学习了如何将给定字符串的第一个字符转换为大写。

一如既往，文章中使用的全部代码可以在GitHub上找到。