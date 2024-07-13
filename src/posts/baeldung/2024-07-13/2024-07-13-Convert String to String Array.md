---
date: 2024-07-13
category:
  - Java
  - String
tag:
  - Java
  - String Array
head:
  - - meta
    - name: keywords
      content: Java, String, Convert, Array
------
# Java中将字符串转换为字符串数组

在本教程中，我们将探讨如何在Java中将`String`转换为`String`数组（`String[]`）。

## 2. 问题介绍

将字符串转换为字符串数组可能有两种场景：
- 将字符串转换为单例数组（只有一个元素的数组）
- 根据特定规则将字符串拆分为数组元素

第一种情况相对容易理解。例如，如果我们有一个字符串`"baeldung"`，我们想将其转换为`String[]{ "baeldung" }`。换句话说，**转换后的数组只有一个元素，即输入字符串本身**。

对于第二种情况，我们需要将输入字符串拆分成片段。然而，结果应该是完全取决于需求的。例如，如果我们期望最终数组中的每个元素包含输入字符串中的两个相邻字符，给定`"baeldung"`，我们将有`String[]{ "ba", "el", "du", "ng" }`。稍后，我们将看到更多的例子。

在本教程中，我们将使用这个字符串作为输入：
```java
String INPUT = "Hi there, nice to meet you!";
```

当然，我们将涵盖两种转换场景。此外，为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否如预期工作。

## 3. 转换为单例数组

由于输入字符串将是目标数组中的唯一元素，**我们可以通过使用输入字符串初始化数组来解决问题**：
```java
String[] myArray = new String[] { INPUT };
assertArrayEquals(new String[] { "Hi there, nice to meet you!" }, myArray);
```

然后，如果我们运行测试，它会通过。

## 4. 将输入字符串转换为数组中的元素

现在，让我们看看如何将输入字符串拆分成段。

### 4.1. 使用`String`的`split()`方法

**我们经常需要按照特定模式处理输入字符串。** 在这种情况下，我们可以使用正则表达式或regex将输入拆分为`String`数组。**Java的`String`类提供了`split()`方法来完成这项工作**。

接下来，我们将根据几个不同的要求，将我们的输入示例拆分为数组。

首先，假设我们想要将输入句子拆分为子句数组。为了解决这个问题，我们可以通过标点符号来拆分输入字符串：
```java
String[] myArray = INPUT.split("[-,.!;?]\\s*");
assertArrayEquals(new String[] { "Hi there", "nice to meet you" }, myArray);
```

值得一提的是，**当我们需要在正则表达式的字符类中包含一个破折号字符时，我们可以将其放在最开始**。

上述测试表明，输入字符串被拆分成了包含两个子句的数组。

接下来，让我们从同一个输入字符串中提取所有单词到一个单词数组。这也是我们在现实世界中可能经常遇到的问题。

要获得单词数组，我们可以通过非单词字符（`\\W+`）来拆分输入：
```java
String[] myArray = INPUT.split("\\W+");
assertArrayEquals(new String[] { "Hi", "there", "nice", "to", "meet", "you" }, myArray);
```

最后，让我们将输入字符串拆分成字符：
```java
String[] myArray = INPUT.split("");
assertArrayEquals(new String[] {
    "H", "i", " ", "t", "h", "e", "r", "e", ",", " ",
    "n", "i", "c", "e", " ", "t", "o", " ", "m", "e", "e", "t", " ", "y", "o", "u", "!"
}, myArray);
```

正如上述代码所示，我们使用空字符串（零宽度）作为正则表达式。输入字符串中的每个字符，包括空格，都被提取为目标数组的一个元素。

我们应该注意到**`String.toCharArray()`也转换输入为数组。然而，目标数组是一个`char`数组（`char[]`）而不是`String`数组（`String[]`）**。

三个例子使用了`String.split()`方法将输入字符串转换为不同的字符串数组。一些流行的库，如Guava和Apache Commons，也提供了增强的字符串拆分功能。我们在另一篇文章中详细讨论了这一点。

此外，我们还有更多文章讨论如何解决不同的具体拆分问题。

### 4.2. 特殊解析需求

有时，我们必须遵循特定规则来拆分输入。一个例子可以快速澄清它。假设我们有这个输入字符串：
```java
String FLIGHT_INPUT = "20221018LH720FRAPEK";
```

我们期望得到这个数组作为结果：
```java
{ "20221018", "LH720", "FRA", "PEK" }
```

乍一看，这种转换逻辑看起来有些模糊。然而，如果我们列出输入字符串的定义，我们将看到为什么期望上述数组：

```java
[date][Flight number][Airport from][Airport to]
- date: YYYY-MM-DD; length:8
- Flight number; length: variable
- Airport From: IATA airport code, length:3
- Airport To: IATA airport code, length:3
```

正如我们所看到的，有时我们需要根据相当特殊的规则解析输入字符串。在这种情况下，**我们需要分析需求并实现一个解析器**：
```java
String dateStr = FLIGHT_INPUT.substring(0, 8);
String flightNo = FLIGHT_INPUT.substring(8, FLIGHT_INPUT.length() - 6);
int airportStart = dateStr.length() + flightNo.length();
String from = FLIGHT_INPUT.substring(airportStart, airportStart + 3);
String to = FLIGHT_INPUT.substring(airportStart + 3);

String[] myArray = new String[] { dateStr, flightNo, from, to };
assertArrayEquals(new String[] { "20221018", "LH720", "FRA", "PEK" }, myArray);
```

正如上述代码所示，我们已经使用了`substring()`方法构建了一个解析器，并正确处理了航班输入。

## 5. 结论

在本文中，我们学习了如何在Java中将`String`转换为`String`数组。

简单来说，将字符串转换为单例数组是相当直接的。如果我们需要将给定的字符串拆分成段，我们可以求助于`String.split()`方法。然而，如果我们需要根据特定规则拆分输入，我们可能需要仔细分析输入格式并实现一个解析器来解决问题。

如常，文章中使用的全部代码可在GitHub上找到。