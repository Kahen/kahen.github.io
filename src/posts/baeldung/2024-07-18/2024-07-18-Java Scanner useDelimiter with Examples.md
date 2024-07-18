---
date: 2022-04-01
category:
  - Java
  - Scanner
tag:
  - Java
  - Scanner
  - useDelimiter
head:
  - - meta
    - name: keywords
      content: Java Scanner, useDelimiter, 示例
------
# Java Scanner useDelimiter 示例 | Baeldung## 1. 概述

在本教程中，我们将看到如何使用_Scanner_类的_useDelimiter_方法。

## 2. _java.util.Scanner_简介

_Scanner_ API 提供了一个简单的文本扫描器。

**默认情况下，_Scanner_使用空格作为分隔符来分割其输入。** 让我们编写一个函数，将输入传递给_Scanner_，然后遍历_Scanner_以将令牌收集到一个列表中。

让我们看看基本的实现：

```java
public static List`````````<String>````````` baseScanner(String input) {
    try (Scanner scan = new Scanner(input)) {
        List`````````<String>````````` result = new ArrayList`````````<String>`````````();
        scan.forEachRemaining(result::add);
        return result;
    }
}
```

让我们注意，在这段代码中我们使用了_try-with-resources_来创建我们的_Scanner_。这是因为_Scanner_类实现了_AutoCloseable_接口。这个代码块自动负责关闭_Scanner_资源。在Java 7之前，我们不能使用_try-with-resources_，因此将不得不手动处理它。

我们还可以注意到，为了遍历_Scanner_元素，我们使用了_forEachRemaining_方法。这个方法是在Java 8中引入的。_Scanner_实现了_Iterator_，如果我们使用的是较旧的Java版本，我们将不得不利用这一点来遍历元素。

正如我们所说，_Scanner_默认会使用空格来解析其输入。例如，使用以下输入调用我们的_baseScanner_方法：“Welcome to Baeldung”，应该返回一个包含以下有序元素的列表：“Welcome”，“to”，“Baeldung”。

让我们编写一个测试来检查我们的方法是否按预期工作：

```java
@Test
void whenBaseScanner_ThenWhitespacesAreUsedAsDelimiters() {
    assertEquals(List.of("Welcome", "to", "Baeldung"), baseScanner("Welcome to Baeldung"));
}
```

## 3. 使用自定义分隔符

现在让我们设置我们的扫描器以使用自定义分隔符。**我们将传入一个_字符串_，该字符串将被_Scanner_用来断开输入。**

让我们看看如何做到这一点：

```java
public static List`````````<String>````````` scannerWithDelimiter(String input, String delimiter) {
    try (Scanner scan = new Scanner(input)) {
        scan.useDelimiter(delimiter);
        List`````````<String>````````` result = new ArrayList`````````<String>`````````();
        scan.forEachRemaining(result::add);
        return result;
    }
}
```

让我们评论一些示例：

- 我们可以使用单个字符作为分隔符：如果需要，必须转义该字符。例如，如果我们想要模仿基本行为并使用空格作为分隔符，我们将使用“\\s”
- 我们可以使用任何单词/短语作为分隔符
- 我们可以使用多个可能的字符作为分隔符：为此，我们必须用“|”将它们分开。例如，如果我们想要在每个空格和每个换行符之间分割输入，我们将使用以下分隔符：“\\n|\\s”
- 简言之，我们可以使用任何类型的正则表达式作为分隔符：例如，“a+”是一个有效的分隔符

让我们看看我们如何测试第一种情况：

```java
@Test
void givenSimpleCharacterDelimiter_whenScannerWithDelimiter_ThenInputIsCorrectlyParsed() {
    assertEquals(List.of("Welcome", "to", "Baeldung"), scannerWithDelimiter("Welcome to Baeldung", "\\s"));
}
```

**实际上，在幕后，_useDelimiter_方法将将其输入转换为一个封装在_Pattern_对象中的正则表达式。** 另外，我们也可以自己处理_Pattern_的实例化。为此我们需要使用覆盖的_useDelimiter(Pattern pattern)_，如下所示：

```java
public static List`````````<String>````````` scannerWithDelimiterUsingPattern(String input, Pattern delimiter) {
    try (Scanner scan = new Scanner(input)) {
        scan.useDelimiter(delimiter);
        List`````````<String>````````` result = new ArrayList`````````<String>`````````();
        scan.forEachRemaining(result::add);
        return result;
    }
}
```

要实例化一个_Pattern_，我们可以使用_compile_方法，如下所示的测试：

```java
@Test
void givenStringDelimiter_whenScannerWithDelimiterUsingPattern_ThenInputIsCorrectlyParsed() {
    assertEquals(List.of("Welcome", "to", "Baeldung"), DelimiterDemo.scannerWithDelimiterUsingPattern("Welcome to Baeldung", Pattern.compile("\\s")));
}
```

## 4. 结论

在本文中，我们展示了一些可以用于调用_useDelimiter_函数的模式示例。我们注意到，默认情况下，_Scanner_使用空格分隔符，我们指出我们可以在那里使用任何类型的正则表达式。

一如既往，完整的代码可以在GitHub上找到。

OK