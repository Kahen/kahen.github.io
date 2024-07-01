---
date: 2022-04-01
category:
  - Java
  - Regex
tag:
  - Java
  - Regex
  - Pattern
  - Matcher
head:
  - - meta
    - name: keywords
      content: Java, Regex, Pattern, Matcher, 正则表达式, 索引
---
# 在Java中获取正则表达式模式匹配的索引

在Java编程中，处理字符串和模式是许多应用的基本需求。正则表达式，通常称为regex，为模式匹配和操作提供了一个强大的工具。

有时，我们不仅需要在字符串中识别匹配项，还需要精确定位这些匹配发生的位置。在本教程中，我们将探讨如何在Java中获取正则表达式模式匹配的索引。

让我们从一个_String_示例开始：

```java
String INPUT = "This line contains `````<the first value>`````, `````<the second value>`````, and ````<the third value>````.";
```

假设我们想从上面的字符串中提取所有的_“```<…>```”_段，例如“ _`````<the first value>`````_”和“ _`````<the second value>`````_”。

为了匹配这些段，我们可以使用正则表达式的NOR字符类：_“```<[^>```]*>”_。

在Java中，**Regex API中的_Pattern_和_Matcher_类是处理模式匹配的重要工具**。这些类提供了编译正则表达式并将它们应用于字符串进行各种操作的方法。

接下来，让我们使用_Pattern_和_Matcher_来提取所需的文本。为了简单起见，我们将使用AssertJ断言来验证我们是否获得了预期的结果：

```java
Pattern pattern = Pattern.compile("```<[^>```]*>");
Matcher matcher = pattern.matcher(INPUT);
List```<String>``` result = new ArrayList<>();
while (matcher.find()) {
    result.add(matcher.group());
}
assertThat(result).containsExactly("`````<the first value>`````", "`````<the second value>`````", "````<the third value>````");
```

正如上面的代码所示，我们从输入_String_中提取了所有的“ _```<…>```_”部分。然而，有时我们想知道匹配项在输入中的确切位置。换句话说，**我们想要获得匹配项及其在输入字符串中的索引。**

接下来，让我们扩展这段代码以实现我们的目标。

我们已经使用_Matcher_类来提取匹配项。**_Matcher_类提供了两个方法，_start()_和_end()_，它们允许我们获取每个匹配项的起始和结束索引。**

值得注意的是，**_Matcher.end()_方法返回匹配子序列之后的那个字符的索引。**一个示例可以清楚地展示这一点：

```java
Pattern pattern = Pattern.compile("456");
Matcher matcher = pattern.matcher("0123456789");
String result = null;
int startIdx = -1;
int endIdx = -1;
if (matcher.find()) {
    result = matcher.group();
    startIdx = matcher.start();
    endIdx = matcher.end();
}
assertThat(result).isEqualTo("456");
assertThat(startIdx).isEqualTo(4);
assertThat(endIdx).isEqualTo(7); // matcher.end() 返回7而不是6
```

现在我们知道了_start()_和_end()_返回的内容，让我们看看我们是否可以获取输入中的每个匹配_“```<…>```”_子序列的索引：

```java
Pattern pattern = Pattern.compile("```<[^>```]*>");
Matcher matcher = pattern.matcher(INPUT);
List```<String>``` result = new ArrayList<>();
Map``<Integer, Integer>`` indexesOfMatches = new LinkedHashMap<>();
while (matcher.find()) {
    result.add(matcher.group());
    indexesOfMatches.put(matcher.start(), matcher.end());
}
assertThat(result).containsExactly("`````<the first value>`````", "`````<the second value>`````", "````<the third value>````");
assertThat(indexesOfMatches.entrySet()).map(entry -> INPUT.substring(entry.getKey(), entry.getValue()))
  .containsExactly("`````<the first value>`````", "`````<the second value>`````", "````<the third value>````");
```

正如上面的测试所示，**我们将每个匹配项的_start()_和_end()_结果存储在一个_LinkedHashMap_中以保持插入顺序。**然后，我们通过这些索引对从原始输入中提取子字符串。**如果我们获得了正确的索引，这些子字符串必须等于匹配项。**

如果我们运行这个测试，它会通过。

在正则表达式中，捕获组通过允许我们稍后引用它们或方便地提取子模式来发挥关键作用。

为了说明，**假设我们的目标是提取被‘ _`<_‘和‘ _>`_‘包围的内容。在这种情况下，我们可以创建一个包含捕获组的模式：_“``<([^>``]*)>”_**。结果，当使用_Matcher.group(1)_时，我们获得了文本“ _the first value_“，” _the second value_“等等。

当没有明确定义捕获组时，整个正则表达式假定默认组，索引为0。因此，调用_Matcher.group()_等同于调用_Matcher.group(0)_。

就像_Matcher.group()_函数的行为一样，**_Matcher.start()_和_Matcher.end()_方法支持指定组索引作为参数**。因此，这些方法提供了与相应组中匹配内容相对应的起始和结束索引：

```java
Pattern pattern = Pattern.compile("``<([^>``]*)>");
Matcher matcher = pattern.matcher(INPUT);
List```<String>``` result = new ArrayList<>();
Map``<Integer, Integer>`` indexesOfMatches = new LinkedHashMap<>();
while (matcher.find()) {
    result.add(matcher.group(1));
    indexesOfMatches.put(matcher.start(1), matcher.end(1));
}
assertThat(result).containsExactly("the first value", "the second value", "the third value");
assertThat(indexesOfMatches.entrySet()).map(entry -> INPUT.substring(entry.getKey(), entry.getValue()))
  .containsExactly("the first value", "the second value", "the third value");
```

## 结论

在本文中，我们探讨了在处理正则表达式时如何在原始输入中获取模式匹配的索引。我们讨论了涉及有和没有明确定义捕获组的模式的场景。

如常，示例的完整源代码可在GitHub上找到。