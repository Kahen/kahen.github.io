---
date: 2022-04-01
category:
  - Java
  - 字符串操作
tag:
  - Java
  - 字符串分割
  - 正则表达式
head:
  - - meta
    - name: keywords
      content: Java, 字符串分割, 正则表达式, 保持分隔符
---

# Java中分割字符串并保留分隔符

程序员经常遇到涉及字符串分割的算法。在一种特殊场景中，可能需要基于单个或多个不同的分隔符来分割字符串，并且**还要在分割操作中返回分隔符**。

让我们详细讨论这个_字符串_分割问题的不同可用解决方案。

## 2. 基础

Java世界提供了相当多的库（例如_java.lang.String_、Guava和Apache Commons等）来简化简单和相当复杂的字符串分割情况。此外，功能丰富的正则表达式在围绕匹配特定模式的分割问题上提供了额外的灵活性。

## 3. 断言查找

在正则表达式中，断言查找表明**通过向前查找（lookahead）或向后查找（lookbehind）另一个模式，在源字符串的当前位置可能匹配**。让我们通过一个例子更好地理解这一点。

一个向前查找的断言_Java(?=Baeldung)_**只有在"Java"后面跟着"Baeldung"时才匹配"Java"**。

同样，一个否定的向后查找断言_(?`<!#)\d+_只有在它不是由'#'前缀时才匹配一个数字。

让我们使用这样的断言正则表达式并设计一个解决方案。

在本文中解释的所有示例中，我们将使用两个简单的_字符串_：

```java
String text = "Hello@World@This@Is@A@Java@Program";
String textMixed = "@HelloWorld@This:Is@A#Java#Program";
```

## 4. 使用_String.split()_

让我们首先使用核心Java库的_String_类的_split()_方法。

此外，我们将评估适当的向前查找断言、向后查找断言以及它们的组合，以按我们希望的方式分割字符串。

### 4.1. 正向查找

首先，让我们使用向前查找断言_"((?=@))"_并围绕其匹配分割字符串_text_：

```java
String[] splits = text.split("((?=@))");
```

向前查找的正则表达式通过"@"符号的前向匹配来分割字符串。结果数组的内容是：

```java
[Hello, @World, @This, @Is, @A, @Java, @Program]
```

使用这个正则表达式不会在_splits_数组中单独返回分隔符。让我们尝试另一种方法。

### 4.2. 正向后查找

我们也可以使用方法正向后查找断言_"((?<=@))"_来分割字符串_text_：

```java
String[] splits = text.split("((?<=@))");
```

然而，结果输出仍然不会包含数组中作为单独元素的分隔符：

```java
[Hello@, World@, This@, Is@, A@, Java@, Program]
```

### 4.3. 正向查找或正向后查找

我们可以使用上述两种查找的组合，并使用逻辑或来看到它的作用。

**结果正则表达式_"((?=@)|(?<=@))"_肯定会给我们想要的结果。**下面的代码片段演示了这一点：

```java
String[] splits = text.split("((?=@)|(?<=@))");
```

上述正则表达式分割字符串，结果数组包含分隔符：

```java
[Hello, @, World, @, This, @, Is, @, A, @, Java, @, Program]
```

现在我们已经理解了所需的查找断言正则表达式，我们可以根据输入字符串中存在的不同类型的分隔符来修改它。

让我们尝试使用适当的正则表达式分割之前定义的_textMixed_：

```java
String[] splitsMixed = textMixed.split("((?=:|#|@)|(?<=:|#|@))");
```

执行上述代码行后，看到以下结果并不奇怪：

```java
[@, HelloWorld, @, This, :, Is, @, A, #, Java, #, Program]
```

## 5. 使用Guava _Splitter_

考虑到现在我们已经清楚了上述部分讨论的正则表达式断言，让我们深入了解Google提供的Java库。

Guava的_Splitter_类提供了_on()_和_onPattern()_方法，使用正则表达式模式作为分隔符来分割字符串。

首先，让我们在包含单个分隔符"@"的字符串_text_上看看它们的实际效果：

```java
List<String>` splits = Splitter.onPattern("((?=@)|(?`<=@))).splitToList(text);
List<String>` splits2 = Splitter.on(Pattern.compile("((?=@)|(?`<=@)"))).splitToList(text);
```

执行上述代码行的结果与_split_方法生成的结果非常相似，只是我们现在有_List_而不是数组。

同样，我们也可以使用这些方法来分割包含多个不同分隔符的字符串：

```java
List<String>` splitsMixed = Splitter.onPattern("((?=:|#|@)|(?`<=:|#|@))).splitToList(textMixed);
List<String>` splitsMixed2 = Splitter.on(Pattern.compile("((?=:|#|@)|(?<=:|#|@)"))).splitToList(textMixed);
```

正如我们所看到的，上述两种方法之间的差异非常显著。

_on()_方法接受一个_java.util.regex.Pattern_参数，而_onPattern()_方法只接受分隔符正则表达式作为_String_。

## 6. 使用Apache Commons _StringUtils_

我们也可以利用Apache Commons Lang项目的_StringUtils_方法_splitByCharacterType_。

非常重要的一点是，这个方法**通过按_java.lang.Character.getType(char)_返回的字符类型来分割输入字符串。在这里，我们不能选择或提取我们选择的分隔符。**

此外，当源字符串在整个过程中具有恒定的大小写时（要么全部大写要么全部小写），它提供最佳结果：

```java
String[] splits = StringUtils.splitByCharacterType("pg@no;10@hello;world@this;is@a#10words;Java#Program");
```

上述字符串中看到的不同类型的字符包括大写字母、小写字母、数字和特殊字符（@ ; # ）。

因此，预期的结果数组_splits_看起来像：

```java
[pg, @, no, ;, 10, @, hello, ;, world, @, this, ;, is, @, a, #, 10, words, ;, J, ava, #, P, rogram]
```

## 7. 结论

在本文中，我们看到了如何以一种方式分割字符串，使得分隔符也在结果数组中可用。

首先，我们讨论了查找断言并使用它们获得所需的结果。后来，我们使用了Guava库提供的方法来实现类似的结果。

最后，我们以Apache Commons Lang库结束，它提供了一个更用户友好的方法来解决一个相关的问题——分割字符串，同时也返回分隔符。

正如往常一样，本文中使用的代码可以在GitHub上找到。