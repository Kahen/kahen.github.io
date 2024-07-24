---
date: 2024-04-01
category:
  - Java
  - HTML
tag:
  - HTML
  - Java
  - Regex
  - Jsoup
  - HTMLCleaner
  - Jericho
head:
  - - meta
    - name: keywords
      content: Java, HTML, Regex, Jsoup, HTMLCleaner, Jericho
------
# 使用Java去除HTML标签

## 1. 概述

有时，我们可能希望从HTML文档字符串中移除所有HTML标签并提取文本。

这个问题看起来相当简单。然而，根据需求的不同，它可能有不同的变体。

在本教程中，我们将讨论如何使用Java来实现这一点。

## 2. 使用正则表达式

既然我们已经将HTML作为_String_变量，我们需要进行一些文本操作。

面对文本操作问题时，正则表达式（Regex）可能是首先想到的方法。

从字符串中移除HTML标签对Regex来说并不是一个挑战，因为不管HTML元素的开始或结束，它们都遵循“\u003c … \u003e”的模式。

如果我们将其转换为Regex，它将是“\u003c\\[^\u003e\\]\\*\u003e”或“\u003c.\\*?\u003e”。

我们应该注意到**Regex默认进行贪婪匹配**。也就是说，Regex“\u003c.\\*?\u003e”不会为我们的问题工作，因为我们想匹配从‘\u003c’到下一个‘\u003e’而不是一行中最后一个‘\u003e’。

现在，让我们测试一下它是否可以从HTML源代码中移除标签。

### 2.1. 从_example1.html_移除标签

在我们测试移除HTML标签之前，首先让我们创建一个HTML示例，比如说_example1.html_：

```html
``<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">``
``<html>``
``<head>``
    ``<title>``This is the page title``</title>``
``</head>``
``<body>``
    ``<p>``
        If the application X doesn't start, the possible causes could be:`````<br/>`````
        1. `<a href="maven.com">`Maven``</a>`` is not installed.`````<br/>`````
        2. Not enough disk space.`````<br/>`````
        3. Not enough memory.
    ``</p>``
``</body>``
``</html>``
```

现在，让我们编写一个测试并使用_String.replaceAll()_来移除HTML标签：

```java
String html = ... // 加载example1.html
String result = html.replaceAll("`<[^>`]*>", "");
System.out.println(result);

```

如果我们运行测试方法，我们会看到结果：

```
    This is the page title

        If the application X doesn't start, the possible causes could be:
        1. Maven is not installed.
        2. Not enough disk space.
        3. Not enough memory.
```

输出看起来相当不错。这是因为所有HTML标签都被移除了。

它保留了从剥离的HTML中删除的空白。但我们在处理提取的文本时，可以很容易地移除或跳过这些空行或空白。到目前为止，一切都很好。

### 2.2. 从_example2.html_移除标签

正如我们刚刚看到的，使用Regex移除HTML标签相当简单。然而，**这种方法可能会有问题，因为我们无法预测我们将获得什么样的HTML源代码**。

例如，一个HTML文档可能包含_\u003cscript\u003e_或_\u003cstyle\u003e_标签，我们可能不希望在结果中包含它们的内容。

此外，_\u003cscript\u003e_、_\u003cstyle\u003e_甚至_\u003cbody\u003e_标签中的文本可能包含“_\u003c_”或“_\u003e_”字符。如果是这种情况，我们的Regex方法可能会失败。

现在，让我们看看另一个HTML示例，比如说_example2.html_：

```html
``<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">``
``<html>``
``<head>``
    ``<title>``This is the page title``</title>``
``</head>``
`<script>`
    // some interesting script functions
`</script>`
``<body>``
    ``<p>``
        If the application X doesn't start, the possible causes could be:`````<br/>`````
        1. `<a
            id="link"
            href="http://maven.apache.org/">`
            Maven
        ``</a>`` is not installed.`````<br/>`````
        2. Not enough (<1G) disk space.`````<br/>`````
        3. Not enough (<64MB) memory.`````<br/>`````
    ``</p>``
``</body>``
``</html>``
```

这次，我们有一个_\u003cscript\u003e_标签和_\u003cbody\u003e_标签中的“_\u003c_”字符。

如果我们在_example2.html_上使用相同的方法，我们会得到（空行已被删除）：

```
   This is the page title
    // some interesting script functions
        If the application X doesn't start, the possible causes could be:
        1.
            Maven
             is not installed.
        2. Not enough (
        3. Not enough (
```

显然，由于“\u003c”字符，我们丢失了一些文本。

因此，**使用Regex处理XML或HTML是脆弱的**。相反，我们可以选择一个HTML解析器来完成这项工作。

接下来，我们将介绍一些易于使用的HTML库来提取文本。

## 3. 使用Jsoup

Jsoup是一个流行的HTML解析器。要从HTML文档中提取文本，我们可以简单地调用_Jsoup.parse(htmlString).text()_。

首先，我们需要将Jsoup库添加到类路径中。例如，假设我们使用Maven来管理项目依赖项：

```xml
`<dependency>`
    ```<groupId>```org.jsoup```</groupId>```
    ```<artifactId>```jsoup```</artifactId>```
    ```<version>```1.17.2```</version>```
```</dependency>```
```

现在，让我们用我们的_example2.html_测试一下：

```java
String html = ... // 加载example2.html
System.out.println(Jsoup.parse(html).text());

```

如果我们运行这个方法，它会打印：

```
This is the page title If the application X doesn't start, the possible causes could be: 1. Maven is not installed. 2. Not enough (<1G) disk space. 3. Not enough (<64MB) memory.
```

正如输出所示，Jsoup成功地从HTML文档中提取了文本。此外，_\u003cscript\u003e_元素中的文本已被忽略。

此外，**默认情况下，Jsoup会移除所有文本格式和空白，例如换行符**。

然而，如果需要，我们也可以要求Jsoup保留换行符。

## 4. 使用HTMLCleaner

HTMLCleaner是另一个HTML解析器。其目标是使来自Web的“格式不正确和脏乱”的HTML适合进一步处理。

首先，让我们在_pom.xml_中添加HTMLCleaner依赖项：

```xml
`<dependency>`
    ```<groupId>```net.sourceforge.htmlcleaner```</groupId>```
    ```<artifactId>```htmlcleaner```</artifactId>```
    ```<version>```2.25```</version>```
```</dependency>```
```

我们可以设置各种选项来控制HTMLCleaner的解析行为。

这里，作为一个例子，让我们告诉HTMLCleaner在解析_example2.html_时跳过_\u003cscript\u003e_元素：

```java
String html = ... // 加载example2.html
CleanerProperties props = new CleanerProperties();
props.setPruneTags("script");
String result = new HtmlCleaner(props).clean(html).getText().toString();
System.out.println(result);

```

如果我们运行测试，HTMLCleaner将产生以下输出：

```
    This is the page title

        If the application X doesn't start, the possible causes could be:
        1.
            Maven
             is not installed.
        2. Not enough (<1G) disk space.
        3. Not enough (<64MB) memory.
```

正如我们所看到的，_\u003cscript\u003e_元素的内容已被忽略。

此外，**它将_\u003cbr/\u003e_标签转换为提取文本中的换行符**。如果格式很重要，这可能会很有帮助。

另一方面，**HTMLCleaner保留了从剥离的HTML源代码中的空白**。因此，例如，文本“_1. Maven is not installed_”被分成了三行。

## 5. 使用Jericho

最后，我们将看到另一个HTML解析器——Jericho。它有一个不错的功能：以简单的文本格式呈现HTML标记。稍后我们将看到它在行动中的表现。

像往常一样，让我们首先在_pom.xml_中添加Jericho依赖项：

```xml
`<dependency>`
    ```<groupId>```net.htmlparser.jericho```</groupId>```
    ```<artifactId>```jericho-html```</artifactId>```
    ```<version>```3.4```</version>```
```</dependency>```
```

在我们的_example2.html_中，我们有一个超链接“_Maven (http://maven.apache.org/)_”。现在，假设我们希望在结果中同时拥有链接URL和链接文本。

为此，我们可以创建一个_Renderer_对象，并使用_includeHyperlinkURLs_选项：

```java
String html = ... // 加载example2.html继续翻译：

```java
Source htmlSource = new Source(html);
Segment segment = new Segment(htmlSource, 0, htmlSource.length());
Renderer htmlRender = new Renderer(segment).setIncludeHyperlinkURLs(true);
System.out.println(htmlRender);
```

接下来，让我们执行测试并检查输出：

```
If the application X doesn't start, the possible causes could be:
1. Maven `<http://maven.apache.org/>` is not installed.
2. Not enough (<1G) disk space.
3. Not enough (<64MB) memory.
```

正如我们在上面的结果中看到的，文本已经被美化格式化。此外，**_\u003ctitle\u003e_元素中的文本默认被忽略**。

链接URL也被包括在内。除了呈现链接（_\u003ca\u003e_），**Jericho还支持呈现其他HTML标签，例如_\u003chr/\u003e, \u003cbr/\u003e,_ 列表（_\u003cul\u003e_ 和 _\u003cli\u003e_）等**。

## 6. 结论

在本文中，我们讨论了不同的移除HTML标签和提取HTML文本的方法。

我们应该注意到**使用Regex处理XML/HTML不是一种好的做法**。

正如往常一样，本文的完整源代码可以在GitHub上找到。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

OK