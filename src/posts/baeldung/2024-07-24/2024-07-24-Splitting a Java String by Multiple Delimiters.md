---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String
  - Split
head:
  - - meta
    - name: keywords
      content: Java, String, Split, Multiple Delimiters, Regular Expressions, Guava, Apache Commons
------
# Java中按多个分隔符分割字符串

## 1. 引言

我们都知道，分割字符串是一个非常常见的任务。然而，我们通常只使用一个分隔符进行分割。

在本教程中，我们将详细讨论**按多个分隔符分割字符串的不同选项**。

为了展示下面每种解决方案如何执行分割，我们将使用相同的示例字符串：

```
String example = "Mary;Thomas:Jane-Kate";
String[] expectedArray = new String[]{"Mary", "Thomas", "Jane", "Kate"};
```

### 2.1. 正则表达式解决方案

程序员经常使用不同的正则表达式来定义字符串的搜索模式。当涉及到分割字符串时，它们也是非常流行的解决方案。那么，让我们看看如何使用正则表达式在Java中按多个分隔符分割字符串。

首先，我们不需要添加新的依赖，因为正则表达式在_java.util.regex_包中是可用的。我们只需要定义我们想要分割的输入字符串和一个模式。

接下来，应用一个模式。**一个模式可以匹配零次或多次。为了按不同的分隔符分割，我们只需要在模式中设置所有的字符。**

我们将编写一个简单的测试来演示这种方法：

```
String[] names = example.split("[;:-]");
Assertions.assertEquals(4, names.length);
Assertions.assertArrayEquals(expectedArray, names);
```

我们定义了一个测试字符串，其中的名字应该按模式中的字符分割。模式本身包含分号、冒号和连字符。当应用于示例字符串时，我们将在数组中得到四个名字。

### 2.2. Guava解决方案

Guava也为按多个分隔符分割字符串提供了解决方案。它的解决方案基于_Splitter_类。这个类使用分隔符序列从输入字符串中提取子字符串。我们可以以多种方式定义这个序列：

- 作为一个单独的字符
- 一个固定字符串
- 一个正则表达式
- 一个_CharMatcher_实例

进一步地，_Splitter_类有两种方法来定义分隔符。所以，让我们测试这两种方法。

首先，我们将添加Guava依赖：

```
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``32.1.3-jre``</version>``
``</dependency>``
```

然后，我们将从_on_方法开始：_public static Splitter on(Pattern separatorPattern)_

它采用用于定义分割的分隔符模式的模式。首先，我们将定义分隔符的组合并编译模式。之后，我们可以分割字符串。

在我们的示例中，我们将使用正则表达式来指定分隔符：

```
Iterable```<String>``` names = Splitter.on(Pattern.compile("[;:-])).split(example);
Assertions.assertEquals(4, Iterators.size(names.iterator()));
Assertions.assertIterableEquals(Arrays.asList(expectedArray), names);
```

另一种方法是_onPattern_方法：_public static Splitter onPattern(String separatorPattern)_

这与前面的方法的区别在于_onPattern_方法以字符串形式接受模式。不需要像_on_方法那样编译。我们将为测试_onPattern_方法定义相同的分隔符组合：

```
Iterable```<String>``` names = Splitter.onPattern("[;:-]").split(example);
Assertions.assertEquals(4, Iterators.size(names.iterator()));
Assertions.assertIterableEquals(Arrays.asList(expectedArray), names);
```

在两种测试中，我们都成功地分割了字符串并得到了包含四个名字的数组。

由于我们正在使用多个分隔符分割输入字符串，我们还可以使用_CharMatcher_类的_anyOf_方法：

```
Iterable```<String>``` names = Splitter.on(CharMatcher.anyOf(";:-")).split(example);
Assertions.assertEquals(4, Iterators.size(names.iterator()));
Assertions.assertIterableEquals(Arrays.asList(expectedArray), names);
```

这个选项只与_Splitter_类的_on_方法一起使用。结果与前两个测试相同。

### 2.3. Apache Commons解决方案

我们将讨论的最后一个选项可在Apache Commons Lang 3库中找到。

我们将从我们的_pom.xml_文件中添加Apache Commons Lang依赖开始：

```
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.13.0``</version>``
``</dependency>``
```

接下来，我们将使用_StringUtils_类的_split_方法：

```
String[] names = StringUtils.split(example, ";:-");
Assertions.assertEquals(4, names.length);
Assertions.assertArrayEquals(expectedArray, names);
```

我们只需要定义我们将用于分割字符串的所有字符。调用_split_方法将把_example_字符串分割成四个名字。

## 3. 结论

在本文中，我们看到了按多个分隔符分割输入字符串的不同选项。首先，我们讨论了基于正则表达式和纯Java的解决方案。后来，我们展示了Guava中可用的不同选项。最后，我们用基于Apache Commons Lang 3库的解决方案结束了我们的示例。

如常，这些示例的代码可以在GitHub上找到。