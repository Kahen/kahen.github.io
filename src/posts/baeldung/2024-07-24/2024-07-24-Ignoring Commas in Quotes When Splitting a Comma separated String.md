---
date: 2024-07-24
category:
  - Java
  - 编程
tag:
  - 字符串处理
  - CSV解析
head:
  - - meta
    - name: keywords
      content: Java, 字符串分割, 正则表达式, CSV库, Baeldung教程
---

# 忽略引号中的逗号在分割逗号分隔字符串时的处理方法 | Baeldung

当处理包含逗号分隔值的文本时，可能需要忽略出现在引号子字符串中的逗号。

在本教程中，我们将探索在分割逗号分隔的字符串时忽略引号内逗号的不同方法。

## 问题陈述

假设我们需要分割以下逗号分隔的输入：

```java
String input = "baeldung,tutorial,splitting,text,\"ignoring this comma,\"";
```

分割此输入并打印结果后，我们期望得到以下输出：

```
baeldung
tutorial
splitting
text
"ignoring this comma,"
```

换句话说，我们不能将所有逗号字符视为分隔符。我们必须忽略出现在引号子字符串中的逗号。

## 实现一个简单解析器

让我们创建一个简单的解析算法：

```java
List``<String>`` tokens = new ArrayList``<String>``();
int startPosition = 0;
boolean isInQuotes = false;
for (int currentPosition = 0; currentPosition < input.length(); currentPosition++) {
    if (input.charAt(currentPosition) == '"') {
        isInQuotes = !isInQuotes;
    } else if (input.charAt(currentPosition) == ',' && !isInQuotes) {
        tokens.add(input.substring(startPosition, currentPosition));
        startPosition = currentPosition + 1;
    }
}

String lastToken = input.substring(startPosition);
if (lastToken.equals(",")) {
    tokens.add("");
} else {
    tokens.add(lastToken);
}
```

在这里，我们首先定义一个名为_tokens_的_List_，它负责存储所有逗号分隔的值。

接下来，我们遍历输入_String_中的字符。

**在每次循环迭代中，我们需要检查当前字符是否是双引号**。当发现双引号时，我们使用_isInQuotes_标志来表示所有在双引号后的逗号应该被忽略。当找到成对的双引号时，_isInQuotes_标志将被设置为false。

**当_isInQuotes_为_false_时，并且我们发现一个逗号字符，我们将向_tokens_列表添加一个新的token**。这个新token将包含从_startPosition_到逗号字符前最后一个位置的字符。

然后，新的_startPosition_将是逗号字符后的位置。

最后，在循环结束后，我们仍然有从_startPosition_到最后一个位置的最后一个token。因此，我们使用_substring()_方法来获取它。如果这个最后一个token只是一个逗号，这意味着最后一个token应该是一个空字符串。否则，我们将最后一个token添加到_tokens_列表。

**现在，让我们测试解析代码：**

```java
String input = "baeldung,tutorial,splitting,text,\"ignoring this comma,\"";
var matcher = contains("baeldung", "tutorial", "splitting", "text", "\"ignoring this comma,\"");
assertThat(splitWithParser(input), matcher);
```

在这里，我们已经在一个叫做_splitWithParser_的静态方法中实现了我们的解析代码。然后，在测试中，我们定义了一个简单的测试_input_，其中包含一个由双引号包围的逗号。接下来，我们使用hamcrest测试框架为预期输出创建一个_contains_ _matcher_。最后，我们使用_assertThat_测试方法来检查我们的解析器是否返回了预期的输出。

在实际情况下，我们应该创建更多的单元测试来验证我们的算法与其他可能的输入的行为。

## 应用正则表达式

**实现一个解析器是一种有效的方法。然而，得到的算法相对较大且复杂。** 因此，作为一种替代方案，我们可以使用正则表达式。

接下来，我们将讨论两种依赖于正则表达式的可能实现。然而，它们应该谨慎使用，因为与前面的方法相比，它们的处理时间较高。因此，**在处理大量输入数据时，使用正则表达式可能代价过高。**

### 4.1. _String split()_ 方法

在这种正则表达式选项中，我们将使用_String_类的_split()_方法。**这个方法根据给定的正则表达式匹配来分割_String_：**

```java
String[] tokens = input.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
```

乍一看，正则表达式可能看起来非常复杂。然而，它的功能相对简单。

简而言之，**使用正向先行断言，告诉它只在没有双引号或有偶数个双引号在它前面时，围绕逗号进行分割。**

_split()_方法的最后一个参数是限制。当我们提供一个负的限制时，模式将被应用尽可能多次，得到的token数组可以有任意长度。

### 4.2. Guava的_Splitter_类

另一种基于正则表达式的替代方案是使用Guava库中的_Splitter_类：

```java
Pattern pattern = Pattern.compile(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
Splitter splitter = Splitter.on(pattern);
List``<String>`` tokens = splitter.splitToList(input);
```

在这里，我们根据之前的相同正则表达式模式创建了一个_splitter_对象。创建_splitter_后，我们使用_splitToList()_方法，该方法在分割输入_String_后返回一个token的_List_。

## 使用CSV库

尽管所呈现的替代方案很有趣，**可能需要使用CSV解析库**，如OpenCSV。

**使用CSV库的优点是所需的工作量更少，因为我们不需要编写解析器或复杂的正则表达式。** 结果，我们的代码最终更少出错，更易于维护。

此外，**当不确定我们的输入形状时，使用CSV库可能是最佳方法。** 例如，输入可能有转义的引号，这不会被前面的方法正确处理。

要使用OpenCSV，我们需要将其作为依赖项包含。在Maven项目中，我们包含opencsv依赖项：

```xml
`<dependency>`
    `<groupId>`com.opencsv`</groupId>`
    `<artifactId>`opencsv`</artifactId>`
    `<version>`5.8`</version>`
`</dependency>`
```

然后，我们可以按如下方式使用OpenCSV：

```java
CSVParser parser = new CSVParserBuilder()
  .withSeparator(',')
  .build();

CSVReader reader = new CSVReaderBuilder(new StringReader(input))
  .withCSVParser(parser)
  .build();

List`<String[]>` lines = new ArrayList<>();
lines = reader.readAll();
reader.close();
```

使用_CSVParserBuilder_类，我们首先创建一个带有逗号分隔符的解析器。然后，我们使用_CSVReaderBuilder_创建一个基于我们的逗号基础解析器的CSV读取器。

在我们的示例中，我们向_CSVReaderBuilder_构造函数提供了一个_StringReader_作为参数。然而，如果需要，我们可以使用不同的读取器（例如，文件读取器）。

最后，我们调用_reader_对象的_readAll()_方法来获取一个_String_数组的_List_。由于OpenCSV旨在处理多行输入，因此_lines_列表中的每个位置对应于输入中的一行。因此，对于每一行，我们都有一个包含相应逗号分隔值的_String_数组。

**与前面的方法不同，使用OpenCSV时，生成的输出中会删除双引号。**

## 结论

在本文中，我们探讨了在分割逗号分隔的字符串时忽略引号中逗号的多种替代方案。除了学习如何实现我们自己的解析器，我们还探索了使用正则表达式和OpenCSV库。

如往常一样，本教程中使用的代码示例可在GitHub上找到。