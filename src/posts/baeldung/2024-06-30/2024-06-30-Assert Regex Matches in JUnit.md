---
date: 2022-04-01
category:
  - JUnit
  - 正则表达式
tag:
  - JUnit
  - 正则表达式
  - 断言
head:
  - - meta
    - name: keywords
      content: JUnit, 正则表达式, 断言, 测试
---
# JUnit中断言正则表达式匹配的方法

JUnit 成为许多开发者首选的Java代码单元测试工具。在现实世界场景中，一个常见的测试需求是验证给定的字符串是否符合特定的正则表达式（regex）模式。

在本教程中，我们将探讨在JUnit中断言正则表达式匹配的几种方法，使我们能够有效地测试我们的字符串模式。

## 2. 问题介绍

问题相当简单：我们希望有一种自然而有效的方法来确认输入字符串与特定正则表达式模式一致。理想情况下，我们还应该有一种可靠的方法来断言相反的情况，即输入字符串不匹配正则表达式模式。

让我们首先探索广泛使用的JUnit 5框架，并学习如何使用其标准特性执行正则表达式模式匹配的断言。此外，我们将讨论在使用JUnit 5进行此类断言时可能遇到的一个潜在陷阱。

除了JUnit 5，还有一些方便且补充的测试和断言库，它们与JUnit 5无缝集成。在本教程中，我们将重点关注这两个流行的外部库。我们将探讨在这些库的上下文中如何断言正则表达式模式匹配，扩展我们高效测试的工具箱。

## 3. 使用标准的JUnit 5方法

JUnit 5在`org.junit.jupiter.api.Assertions`包中提供了一系列常用断言，如`assertSame()`、`assertEquals()`等。

然而，JUnit 5缺少像`assertMatches()`这样的专用断言方法用于正则表达式模式验证。由于`String.matches()`方法返回一个布尔值，我们可以利用`assertTrue()`方法确保字符串匹配正则表达式模式：

```java
assertTrue("Java at Baeldung".matches(".* at Baeldung$"));
```

毫不意外地，如果我们想要断言字符串不匹配正则表达式模式，我们可以使用`assertFalse()`断言：

```java
assertFalse("something else".matches(".* at Baeldung$"));
```

## 4. 为什么我们不应该使用`assertLinesMatch()`方法进行正则表达式匹配测试

虽然我们之前提到JUnit 5缺少专用的正则表达式模式断言方法，一些人可能不同意这一说法。JUnit 5确实提供了`assertLinesMatch()`方法，它可以在文本行中验证正则表达式模式匹配，例如：

```java
assertLinesMatch(List.of(".* at Baeldung$"), List.of("Kotlin at Baeldung"));
```

正如上面的例子所示，由于该方法接受两个字符串列表（预期列表和实际列表），我们将正则表达式模式和输入字符串包装在列表中，测试通过了。

然而，值得注意的是，使用`assertLinesMatch()`方法进行正则表达式匹配测试是不安全的。一个例子可以快速展示这一点：

```java
assertFalse(".* at Baeldung$".matches(".* at Baeldung$"));
assertLinesMatch(List.of(".* at Baeldung$"), List.of(".* at Baeldung$"));
```

在上面的例子中，我们的输入字符串和正则表达式模式是相同的：".* at Baeldung$"。显然，输入不匹配模式，因为输入字符串以'$'字符结束，而不是"Baeldung"。所以，`assertFalse()`断言通过了。

然后，我们将相同的输入和正则表达式模式传递给`assertLinesMatch()`方法，断言通过了！这是因为`assertLinesMatch()`按以下三个步骤验证预期列表和实际列表中的每对字符串：

1. 如果预期字符串等于实际字符串，则继续下一对。
2. 否则，将预期字符串视为正则表达式模式并检查`actualString.matches(expectedString)`。如果结果为真，则继续下一对。
3. 否则，如果预期字符串是快进标记，相应地快进实际行，并从第一步开始。

我们不会深入使用`assertLinesMatches()`方法。正如上述步骤所示，正则表达式模式测试在第二步执行。在我们的示例中，实际字符串，即输入，和预期字符串，即正则表达式模式，是相等的。因此，第一步通过了。也就是说，断言在根本没有应用正则匹配检查的情况下通过了。

所以，`assertLinesMatch()`方法不是验证正则表达式模式匹配的正确断言方法。

## 5. 使用AssertJ的`matches()`方法

使用流行的AssertJ库，我们可以快速编写流畅的断言。**AssertJ提供了`matches()`方法来测试正则表达式模式：**

```java
// assertThat()下面的内容从org.assertj.core.api.Assertions导入
assertThat("Linux at Baeldung").matches(".* at Baeldung$");
```

顾名思义，`doesNotMatch()`方法允许我们执行否定测试场景：

```java
assertThat("something unrelated").doesNotMatch(".* at Baeldung$");
```

## 6. 使用Hamcrest的`matchesPattern()`方法

同样，Hamcrest是另一个广泛使用的测试框架。它也提供了`matchesPattern()`方法用于正则匹配测试：

```java
// assertThat()下面的内容从org.hamcrest.MatcherAssert导入
assertThat("Computer science at Baeldung", matchesPattern(".* at Baeldung$"));
```

**要执行否定的正则匹配测试，我们可以使用`not()`来否定由`matchesPattern()`创建的`Matcher`：**

```java
assertThat("something unrelated", not(matchesPattern(".* at Baeldung$")));
```

## 7. 结论

在本文中，我们探讨了不同的断言正则表达式模式匹配的方法。

两个常用的库，AssertJ和Hamcrest，提供了专用的正则匹配测试方法。另一方面，如果我们希望最小化外部依赖，JUnit 5的`assertTrue()`结合`String.matches()`方法也可以实现相同的目标。

此外，我们讨论了我们不应该使用JUnit 5的`assertLinesMatch()`进行正则表达式匹配测试。

如往常一样，示例的完整源代码可以在GitHub上找到。