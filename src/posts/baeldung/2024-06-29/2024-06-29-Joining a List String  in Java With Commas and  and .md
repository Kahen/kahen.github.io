---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String Concatenation
  - Natural Language
head:
  - - meta
    - name: keywords
      content: Java, String Concatenation, Natural Language, Oxford Comma
------
# Java中以自然语言方式连接列表

当处理字符串集合时，使用特定分隔符连接这些字符串是一项常见任务。幸运的是，我们有多种解决方案可供选择，包括使用_String.join()_和_Collectors.joining()_。

在这个快速教程中，我们将探索一个有趣的字符串连接问题：以更接近自然语言的方式连接字符串。

### 2. 问题介绍

让我们通过一个例子来理解问题。假设我们有一个字符串列表_{“A”，“B”，“C”，“D”}_。如果我们想用逗号作为分隔符将它们连接起来，结果将是“_A, B, C, D_”。到目前为止，一切顺利。

然而，如果我们希望连接的结果遵循英语语法，**预期的输出应该是“A, B, C and D”或“A, B, C, and D”**。我们稍后将看到为什么有两种变体。但至少我们明白结果不是我们可以直接从_String.join()_或_Collectors.joining()_方法调用中获得的。

在上面的例子中，“_C”和“and”之间的逗号被称为牛津逗号或哈佛逗号。关于哪种风格更精确的讨论很多。但这并不是我们的重点。我们的目标是创建一个支持两种场景的方法。

所以，**给定一个包含三个或更多字符串元素的列表，例如_{“A”，“B”，“C”，… “X”，“Y”}_，我们可能会根据要求得到两种不同的结果：**

- 使用牛津逗号——**“A, B, C, … X and Y”**
- 不使用牛津逗号——**“A, B, C, … X, and Y”**

此外，我们只讨论了至少有三个元素的列表的情况。如果列表包含少于三个元素，结果可能会有所不同：

- 对于空列表，返回空字符串，所以，_**{}**_ 变成 _**“”**_
- 对于包含单个元素的列表，返回该元素。例如，_**{“A”}**_ 变成 _**“A”**_
- 当处理包含两个字符串元素的列表时，使用“and”这个词将它们连接起来，不使用逗号。例如，_**{“A”, “B”}**_ 变成 _**“A and B”**_

接下来，让我们创建一个以自然语言方式连接字符串列表的方法。为了简单起见，我们假设**输入列表不是null，并且不包含null或空字符串元素。**在实践中，如果列表包含空或null字符串，我们可以先过滤掉这些元素。

### 3. 创建 _joinItemsAsNaturalLanguage()_ 方法

首先，让我们看看方法的实现，然后了解它的工作原理：

```java
String joinItemsAsNaturalLanguage(List`<String>` list, boolean oxfordComma) {
    if (list.size() < 3) {
        return String.join(" and ", list);
    }
    // 列表至少有三个元素
    int lastIdx = list.size() - 1;

    StringBuilder sb = new StringBuilder();
    return sb.append(String.join(", ", list.subList(0, lastIdx)))
      .append(oxfordComma ? ", and " : " and ")
      .append(list.get(lastIdx))
      .toString();
}
```

现在，让我们快速浏览一下代码。首先，我们使用_String.join(" and ", list)_处理列表包含少于三个元素的情况。

然后，如果列表包含三个或更多字符串，**我们使用“, ”作为分隔符来连接输入列表的一个子列表中的元素**，这排除了最后一个字符串。最后，我们根据_oxfordComma_选项，将连接的结果与最后一个元素和“and”连接起来。

值得注意的是，**我们不应该采取首先用逗号连接所有元素，然后替换最后一个逗号为“and”的方法。**这是因为最后一个元素也可能包含逗号。

让我们测试一下不使用牛津逗号的解决方案：

```java
assertEquals("", joinItemsAsNaturalLanguage(emptyList(), false));
assertEquals("A", joinItemsAsNaturalLanguage(List.of("A"), false));
assertEquals("A and B", joinItemsAsNaturalLanguage(List.of("A", "B"), false));
assertEquals("A, B, C, D and I have a comma (,)", joinItemsAsNaturalLanguage(List.of("A", "B", "C", "D", "I have a comma (,)"), false));
```

最后，让我们测试使用牛津逗号的情况：

```java
assertEquals("", joinItemsAsNaturalLanguage(emptyList(), true));
assertEquals("A", joinItemsAsNaturalLanguage(List.of("A"), true));
assertEquals("A and B", joinItemsAsNaturalLanguage(List.of("A", "B"), true));
assertEquals("A, B, C, D, and I have a comma (,)", joinItemsAsNaturalLanguage(List.of("A", "B", "C", "D", "I have a comma (,)"), true));
```

### 4. 结论

在本文中，我们讨论了以自然语言方式连接字符串列表的问题。我们还学习了如何创建一个方法来解决这个问题。

如常，示例的完整源代码可在GitHub上找到。