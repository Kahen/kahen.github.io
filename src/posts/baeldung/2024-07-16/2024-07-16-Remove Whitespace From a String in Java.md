---
date: 2024-07-17
category:
  - Java
  - 字符串操作
tag:
  - Java
  - 字符串
  - 空白字符
head:
  - - meta
    - name: keywords
      content: Java, 字符串, 空白字符, 删除空白
---
# 在Java中从字符串中移除空白字符 | Baeldung

1. 概述

当我们在Java中操作字符串时，我们经常需要从字符串中移除空白字符。

在本教程中，我们将探索在Java中从字符串中移除空白字符的常见场景。

2. 问题介绍

为了更容易理解问题，我们首先来看一个字符串示例：

```java
String myString = "   I    am a    wonderful String     !   ";
```

上述示例显示，`myString`变量包含多个前导、尾随空格和中间的空白字符。

通常，当我们在Java中处理类似`myString`这样的字符串时，我们经常面临这两个要求：

- 从给定字符串中移除所有空白字符 -> "IamawonderfulString!"
- 将连续的空白字符替换为单个空格，并移除所有前导和尾随空白字符 -> "I am a wonderful String !"

接下来，我们将针对每种情况介绍两种方法：使用`String`类的便捷`replaceAll()`方法，以及广泛使用的Apache Commons Lang3库中的`StringUtils`类。

为了在本教程中保持简单，当我们谈论空白时，我们不会涵盖Unicode字符集中的空白字符。此外，我们将使用测试断言来验证每个解决方案。

现在让我们看看它们是如何工作的。

3. 从字符串中移除所有空白字符

### 3.1. 使用`String.replaceAll()`

首先，我们将使用`replaceAll()`方法从字符串中移除所有空白。

`replaceAll()`使用正则表达式（regex）。**我们可以使用正则表达式字符类‘\s’来匹配一个空白字符。** 我们可以将输入字符串中的每个空白字符替换为空字符串来解决问题：`inputString.replaceAll("\\s", "")`。

然后我们将创建一个测试，看看这个想法是否适用于我们的示例字符串：

```java
String result = myString.replaceAll("\\s", "");
assertThat(result).isEqualTo("IamawonderfulString!");
```

如果我们运行测试，它通过了。所以`replaceAll()`方法解决了问题。接下来，让我们使用Apache Commons Lang3来解决问题。

### 3.2. 使用Apache Commons Lang3库

Apache Commons Lang3库附带了一个`StringUtils`实用工具，它允许我们方便地操作字符串。

要开始使用Apache Commons Lang 3，让我们添加Maven依赖项：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.14.0`</version>`
`</dependency>`
```

如果我们查看`StringUtils`类中的方法，有一个叫做`deleteWhitespace()`的方法。这个名字暗示了它就是我们要找的方法。

接下来，**我们使用`StringUtils.deleteWhitespace()`从字符串中移除所有空白**：

```java
String result = StringUtils.deleteWhitespace(myString);
assertThat(result).isEqualTo("IamawonderfulString!");
```

当我们执行测试时，测试通过了。所以`deleteWhitespace()`完成了工作。

4. 将连续的空白字符替换为单个空格

### 4.1. 使用`String.replaceAll()`

现在让我们看看另一个场景。我们可以分两步解决这个问题：

- 将连续的空白替换为单个空格
- 修剪第一步的结果

值得一提的是，我们也可以先修剪输入字符串，然后替换连续的空白。所以，我们先执行哪个步骤并不重要。

对于第一步，我们仍然可以使用`replaceAll()`和正则表达式来匹配连续的空白字符，并将一个空格设置为替换。

**正则表达式‘\s+’匹配一个或多个空白字符。因此，我们可以调用`replaceAll("\\s+", " ")`方法来完成第一步**。然后我们可以调用`String.trim()`方法来应用修剪操作。

接下来，我们将创建一个测试来检查我们的想法是否可以解决问题。为了清晰起见，我们为两个步骤编写两个断言：

```java
String result = myString.replaceAll("\\s+", " ");
assertThat(result).isEqualTo(" I am a wonderful String ! ");
assertThat(result.trim()).isEqualTo("I am a wonderful String !");
```

如果我们运行它，测试通过了。所以这种方法按预期工作。

最后，让我们使用Apache Commons Lang 3库来解决问题。

### 4.2. 使用Apache Commons Lang3库

**`StringUtils.normalizeSpace()`方法修剪输入字符串，然后用单个空格替换空白字符序列。** 因此，我们可以直接调用这个方法来解决问题：

```java
String result = StringUtils.normalizeSpace(myString);
assertThat(result).isEqualTo("I am a wonderful String !");
```

当我们执行测试时，测试通过了。正如我们所见，`StringUtils.normalizeSpace()`非常直接易用。

5. 结论

在本文中，我们学习了如何在Java中从字符串中移除空白字符。

如往常一样，完整的源代码可在GitHub上获得。抱歉，由于原文内容较长，我将翻译剩余部分。

### 5. 结论

在本文中，我们学习了如何在Java中从字符串中移除空白字符。

正如往常一样，完整的源代码可在GitHub上获得。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

![Baeldung logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)
![Gravatar image](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)
![Eric Martin avatar](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)
![Announcement icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)
![REST post footer image](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)
![REST post footer icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK