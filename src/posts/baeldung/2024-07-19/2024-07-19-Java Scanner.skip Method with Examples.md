---
date: 2022-04-01
category:
  - Java
  - Scanner
tag:
  - skip
  - Pattern
  - String
head:
  - - meta
    - name: keywords
      content: Java Scanner skip method, Java Scanner skip tutorial, Java Scanner skip examples
------
# Java Scanner.skip 方法示例 | Baeldung---
date: 2022-04-01
category:
  - Java
  - Scanner
tag:
  - skip
  - Pattern
  - String
head:
  - - meta
    - name: keywords
      content: Java Scanner skip method, Java Scanner skip tutorial, Java Scanner skip examples
------
# Java Scanner.skip 方法示例 | Baeldung

## **1. 概述**

_java.util.Scanner_ 类有许多方法，我们可以用来验证输入。其中之一是 _skip()_ 方法。

在本教程中，我们将学习 _skip()_ 方法的用途以及如何使用它。

_skip()_ 方法属于 Java _Scanner_ 类。它用于跳过与方法参数中指定的模式匹配的输入，忽略分隔符。

### 2.1. 语法

_skip()_ 方法**有两个重载的方法签名**：

- _skip(Pattern pattern)_ – 以参数形式接收 _Scanner_ 应跳过的模式
- _skip(String pattern)_ – 以参数形式接收一个 _String_，指定要跳过的模式

### 2.2. 返回值

_skip()_ 返回一个满足方法参数中指定模式的 _Scanner_ 对象。**它也可能抛出两种类型的异常**：如果扫描器已关闭，则抛出 _IllegalStateException_；如果未找到与指定模式匹配的内容，则抛出 _NoSuchElementException_。

请注意，通过使用一个不可能匹配任何内容的模式，可以跳过某些内容而不冒 _NoSuchElementException_ 的风险——例如，_skip_(“\\[ \\\\t\\]\\*”)。

## **3. 示例**

正如我们前面提到的，_skip_ 方法有两个重载形式。首先，让我们看看如何使用 _skip_ 方法与 _Pattern_：

```java
String str = "Java scanner skip tutorial";
Scanner sc = new Scanner(str);
sc.skip(Pattern.compile(".ava"));
```

在这里，我们使用 _skip(Pattern)_ 方法跳过符合“.ava”模式的文本。

同样，_skip(String)_ 方法将跳过由给定 _String_ 构造的模式匹配的文本。在我们的示例中，我们跳过字符串“Java”：

```java
String str = "Java scanner skip tutorial";
Scanner sc = new Scanner(str);
sc.skip("Java");
```

简而言之，**无论使用模式还是字符串，两种方法的结果都是相同的**。

## **4. 结论**

在这篇简短的文章中，我们检查了如何使用 _java.util.Scanner_ 类的 _skip()_ 方法，使用 _String_ 或 _Pattern_ 参数。

一如既往，讨论期间使用的代码在 GitHub 上可用。

OK