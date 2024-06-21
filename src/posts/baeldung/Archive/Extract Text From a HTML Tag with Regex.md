---
date: 2024-06-15
category:
  - Java
  - HTML
tag:
  - 正则表达式
  - 文本提取
---
# 使用Java正则表达式从HTML标签提取文本

当在Java中处理HTML内容时，从HTML标签中提取特定文本是常见的需求。尽管通常不推荐使用正则表达式来解析HTML，因为它的结构复杂，但在某些简单任务中，这有时是足够的。

在本教程中，我们将看到如何使用Java中的正则表达式从HTML标签中提取文本。

## 2. 使用Pattern和Matcher类

Java提供了来自java.util.regex的Pattern和Matcher类，允许我们定义并应用正则表达式来从字符串中提取文本。以下是一个使用正则表达式从指定HTML标签中提取文本的示例：

在这里，我们首先定义了HTML内容，表示为htmlContent，其中包含带有`````<b>`````标签的HTML。此外，我们指定了标签名tagName为“b”，以从`````<b>`````标签中提取文本。

然后，我们使用compile()方法编译正则表达式pattern，其中patternString是“`````<b>`````(.*?)`</b>`”以匹配并提取`````<b>`````标签内的文本。之后，我们使用while循环和find()方法迭代所有匹配项，并将它们添加到名为extractedTexts的列表中。

最后，我们断言从`````<b>`````标签中提取了两个文本（“Baeldung”和“extracting text”）。

## 3. 使用JSoup进行HTML解析和提取

对于更复杂的HTML解析任务，特别是涉及嵌套标签的任务，推荐使用像JSoup这样的专用库。让我们演示如何使用JSoup从```<p>```标签中提取文本，包括处理嵌套标签：

在这里，我们使用parse()方法解析htmlContent字符串，将其转换为Document对象。接下来，我们在doc对象上使用select()方法来选择解析文档中的所有```<p>```元素。

随后，我们遍历所选的paragraphElements集合，使用paragraphElement.text()方法从每个```<p>```元素中提取文本内容。

## 4. 结论

总之，我们已经探索了在Java中从HTML标签提取文本的不同方法。首先，我们讨论了使用Pattern和Matcher类进行基于正则表达式的文本提取。此外，我们还研究了利用JSoup进行更复杂的HTML解析任务。

如常，示例的完整源代码可在GitHub上找到。