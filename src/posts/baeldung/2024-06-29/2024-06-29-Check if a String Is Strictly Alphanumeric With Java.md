---
date: 2024-06-29
category:
  - Java
  - 字符串
tag:
  - 正则表达式
  - 性能测试
head:
  - - meta
    - name: keywords
      content: Java, 字符串, 正则表达式, 性能测试, 检查是否只包含字母和数字
---

# 使用Java检查字符串是否严格为字母数字

检查_String_是否符合业务规则对于大多数应用程序至关重要。通常，我们需要检查名称是否只包含允许的字符，电子邮件是否格式正确，或者密码是否有限制。

在本教程中，我们将学习如何检查一个_String_是否为字母数字，这在许多情况下都很有用。

## 字母数字字符

首先，我们明确一下这个术语，以避免任何混淆。字母数字字符是字母和数字的组合。更具体地说，是拉丁字母和阿拉伯数字。因此，我们不会将任何特殊字符或下划线视为字母数字字符的一部分。

## 检查方法

一般来说，我们有两种主要方法来解决这个问题。第一种使用正则表达式模式，第二种逐个检查所有字符。

### 3.1 使用正则表达式

这是最简单的方法，它要求我们提供正确的正则表达式模式。在我们的情况下，我们将使用这个：

```
String REGEX = "^[a-zA-Z0-9]*$";
```

从技术上讲，我们可以使用_\w_快捷方式来识别“单词字符”，但不幸的是，它不符合我们的要求，因为这种模式可能会包含下划线，可以这样表达：`\[a-zA-Z0-9_]\`。

在确定了正确的模式之后，下一步是将给定的_String_与之进行匹配。它可以直接在_String_本身上完成：

```
boolean result = TEST_STRING.matches(REGEX);
```

然而，这并不是最好的方式，特别是如果我们需要经常进行这样的检查。**每次调用_match(String)_方法时，_String_都会重新编译正则表达式。** 因此，最好使用静态_Pattern_：

```
Pattern PATTERN = Pattern.compile(REGEX);
Matcher matcher = PATTERN.matcher(TEST_STRING);
boolean result = matcher.matches();
```

总的来说，这是一种简单、灵活的方法，使代码简单易懂。

### 3.2 逐个检查字符

另一种方法是逐个检查_String_中的每个字符。我们可以使用任何方法来遍历给定的_String_。为了演示，我们使用一个简单的_for_循环：

```
boolean result = true;
for (int i = 0; i `< TEST_STRING.length(); ++i) {
    int codePoint = TEST_STRING.codePointAt(i);
    if (!isAlphanumeric(codePoint)) {
        result = false;
        break;
    }
}
```

我们可以以几种方式实现_isAlphanumeric(int)_，但总的来说，我们必须在ASCII表中匹配字符代码。我们将使用ASCII表，因为我们最初限制了使用拉丁字母和阿拉伯数字：

```
boolean isAlphanumeric(final int codePoint) {
    return (codePoint >`= 65 && codePoint `<= 90) ||
           (codePoint >`= 97 && codePoint `<= 122) ||
           (codePoint >`= 48 && codePoint <= 57);
}
```

此外，我们可以使用_Character.isAlphabetic(int)_和_Character.isDigit(int)_。这些方法高度优化，可能会提高应用程序的性能：

```
boolean result = true;
for (int i = 0; i < TEST_STRING.length(); ++i) {
    final int codePoint = TEST_STRING.codePointAt(i);
    if (!Character.isAlphabetic(codePoint) || !Character.isDigit(codePoint)) {
        result = false;
        break;
    }
}
```

这种方法需要更多的代码，并且也是高度命令式的。同时，它为我们提供了透明实现的好处。然而，不同的实现可能会无意中恶化这种方法的空间复杂度：

```
boolean result = true;
for (final char c : TEST_STRING.toCharArray()) {
    if (!isAlphanumeric(c)) {
        result = false;
        break;
    }
}
```

**_toCharArray()_方法将创建一个单独的数组来包含_String_中的字符，将空间复杂度从O(1)降低到O(n)。** 我们可以用同样的方式说_Stream API_方法：

```
boolean result = TEST_STRING.chars().allMatch(this::isAlphanumeric);
```

**请注意这些陷阱，特别是如果性能对应用程序至关重要。**

## 优缺点

从前面的示例中可以看出，第一种方法更易于编写和阅读，而第二种方法需要更多的代码，并且可能包含更多的错误。**然而，让我们从性能的角度用JMH比较它们。** 测试设置为只运行一分钟，这足以比较它们的吞吐量。

我们得到以下结果。分数显示了每秒的操作数。因此，更高的分数标识了更高性能的解决方案：

```
Benchmark                                                                   Mode  Cnt           Score   Error  Units
AlphanumericPerformanceBenchmark.alphanumericIteration                     thrpt        165036629.641          ops/s
AlphanumericPerformanceBenchmark.alphanumericIterationWithCharacterChecks  thrpt       2350726870.739          ops/s
AlphanumericPerformanceBenchmark.alphanumericIterationWithCopy             thrpt        129884251.890          ops/s
AlphanumericPerformanceBenchmark.alphanumericIterationWithStream           thrpt         40552684.681          ops/s
AlphanumericPerformanceBenchmark.alphanumericRegex                         thrpt         23739293.608          ops/s
AlphanumericPerformanceBenchmark.alphanumericRegexDirectlyOnString         thrpt         10536565.422          ops/s
```

如我们所见，我们有可读性-性能权衡。**更易读和更声明性的解决方案往往性能较差。** 同时，请注意，不必要的优化可能会造成更多的伤害而不是好处。**因此，对于大多数应用程序，正则表达式是一个好的、干净的解决方案，可以轻松扩展。**

然而，如果应用程序依赖于大量文本与特定规则的匹配，迭代方法将表现更好。这最终减少了CPU使用率和停机时间，并提高了吞吐量。

## 结论

有几种方法可以检查一个_String_是否为字母数字。它们都有优缺点，应该仔细考虑。选择可以归结为可扩展性与性能之间的权衡。

在真正需要性能时优化代码，因为优化后的代码通常可读性较差，更容易出现难以调试的错误。

如往常一样，代码可以在GitHub上找到。