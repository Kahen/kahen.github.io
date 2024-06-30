---
date: 2022-04-01
category:
  - Java
  - Regex
tag:
  - Java Stream
  - Regex Match
head:
  - - meta
    - name: keywords
      content: Java, Regex, Stream, Match, Regular Expressions
------
# 创建正则表达式匹配流

正则表达式（regex）是模式匹配的强大工具。它们允许我们在字符串中找到特定的模式，这对于数据提取、验证和转换等任务非常有用。

在本教程中，我们将通过一个简单的例子探索如何使用正则表达式创建匹配流。

### 2. 入门

首先，假设我们有一个包含字母和数字的字符串：
```java
String input = "There are 3 apples and 2 bananas on the table.";
```

我们的目标是使用正则表达式提取这个字符串中的所有数字，然后创建这些匹配项的流。

### 3. 定义正则表达式

首先，我们需要定义一个可以匹配数字的正则表达式模式：
```java
String regex = "\\d+";
```

在这个正则表达式中，`\d+` 匹配一个或多个数字。双反斜杠 `\\` 用于转义反斜杠字符，因为它在Java中是一个特殊字符。

接下来，我们将通过将定义的模式应用于输入字符串来创建一个 `Matcher` 对象：
```java
Pattern pattern = Pattern.compile(regex);
Matcher matcher = pattern.matcher(input);
```

最后，让我们将匹配到的数字转换为流。我们将使用 `matcher.results()`，这是Java 9中引入的一个新方法：
```java
Stream`<String>` outputStream = matcher.results().map(MatchResult::group);

// 在流中处理元素
outputStream.forEach(System.out::println);
```

`matcher.results()` 方法返回一个 `MatchResult` 对象的流。每个对象对应于基于正则表达式模式在输入字符串中找到的一个独特匹配。然后，我们可以使用这个对象的 `group()` 方法来获取匹配的 `String`。

### 5. 结论

在本文中，我们学习了如何通过一个简单的例子从字符串中提取数字来创建正则表达式匹配流。

本文的示例代码可以在GitHub上找到。