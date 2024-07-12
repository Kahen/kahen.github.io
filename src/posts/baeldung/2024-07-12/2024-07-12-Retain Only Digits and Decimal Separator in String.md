---
date: {2024-07-13}
category:
  - Java
  - 字符串处理
tag:
  - 正则表达式
  - 字符串
  - Java 8
  - Guava
  - Apache Commons
head:
  - - meta
    - name: keywords
      content: Java, 字符串处理, 数字, 小数点, 正则表达式, Guava, Apache Commons
---

# 在字符串中仅保留数字和小数点

让我们假设我们需要从一个包含字母数字和特殊字符的字符串中移除所有非数字字符，同时保留小数点。例如，我们想要从文本“这个包的价格是100.5$”中提取数字和小数部分，仅得到“100.5”，即价格部分。

在本教程中，我们将探索在Java中实现此目的的四种不同方法。

## 使用正则表达式和String的replaceAll()方法

最简单的方法是使用String类的内置replaceAll()方法。它替换文本中匹配所提供正则表达式的每个部分为指定的替换内容。

replaceAll()方法接受两个参数：正则表达式和替换内容。

因此，如果我们**将相关的正则表达式和一个空字符串作为替换参数传递给该方法**，我们就可以达成我们的目的。

为了简化，我们将定义一个单元测试来验证预期结果：

```java
String s = "Testing abc123.555abc";
s = s.replaceAll("[^\\d.]", "");
assertEquals("123.555", s);
```

在上面的测试案例中，我们定义了正则表达式为**_[^\\d.]_，表示一个否定集，匹配不在包含任何数字字符（0-9）和“.”字符的集合中的任何字符**。

上述测试成功执行，从而验证最终结果只包含数字字符和小数点。

## 使用Java 8 Stream

使用Java 8 Streams，我们有能力在不同的小步骤中定义对数据的一系列操作：

```java
String s = "Testing abc123.555abc";
StringBuilder sb = new StringBuilder();
s.chars()
  .mapToObj(c -> (char) c)
  .filter(c -> Character.isDigit(c) || c == '.')
  .forEach(sb::append);
assertEquals("123.555", sb.toString());
```

首先，我们创建了一个StringBuilder实例来保存最终结果。然后，我们使用chars()方法遍历String中的各个字符，该方法返回int的流，这些实际上是字符代码。为了处理这种情况，我们使用了一个映射函数mapToObj()，它返回一个Character的Stream。

最后，**我们使用filter()方法仅选择那些是数字或小数点的字符**。

## 使用外部库

我们也可以通过将一些外部库如Guava和Apache Commons集成到我们的代码库中来解决我们的问题。我们可以利用这些库中可用的预定义工具类。

### 4.1. Guava

要使用Guava在Java String中移除所有非数字字符但保留小数点，**我们将使用CharMatcher实用程序类中的方法**。

要包含Guava，我们首先需要更新我们的pom.xml文件：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``33.0.0-jre``</version>``
``</dependency>``
```

接下来，让我们使用CharMatcher类中的方法重写单元测试：

```java
String s = "Testing abc123.555abc";
String result = CharMatcher.inRange('0', '9')
  .or(CharMatcher.is('.'))
  .retainFrom(s);
assertEquals("123.555", result);
```

如果我们运行测试，它将成功执行并返回预期的结果。为了清楚起见，让我们回顾一下我们使用的方法：

- inRange()方法接受两个char参数，startInclusive和endInclusive，并匹配在给定范围内定义的字符。
- or()方法接受一个CharMatcher类型的单个参数。它通过匹配这个匹配器或它被调用的匹配器中的任何字符来返回一个匹配器。
- is()方法接受一个单一参数，char match。它只匹配一个指定的字符。
- retainFrom()方法接受一个单一参数，CharSequence sequence。**它返回满足指定匹配标准的序列中的字符**。

### 4.2. Apache Commons

在Apache Commons中，**_RegExUtils_类提供了一个简单直接的方法_removeAll(String text, String regex)_来移除所有符合正则表达式中指定标准的字符**。

要包含Apache Commons Lang，我们需要更新我们的pom.xml文件：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.12.0``</version>``
``</dependency>``
```

如果我们查看_RegExUtils_类，我们将看到它的_removeAll()_方法可以帮助我们解决问题：

```java
String s = "Testing abc123.555abc";
String result = RegExUtils.removeAll(s, "[^\\d.]");
assertEquals("123.555", result);
```

_RegExUtils.removeAll()_需要两个String参数，text和regex。在这里，我们以与上面String.replaceAll示例中相同的方式定义了regex。

## 结论

在本文中，我们探讨了从Java String中移除所有非数字字符的同时保留小数点的四种不同方法。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。