---
date: 2022-04-01
category:
  - Java
  - Regular Expressions
tag:
  - Java
  - Regex
  - Non-Capturing Groups
head:
  - - meta
    - name: keywords
      content: Java, Regular Expressions, Non-Capturing Groups
------
# Java正则表达式中的非捕获组

## 1. 概述

非捕获组是Java正则表达式中的重要结构。**它们创建了一个作为单一单元工作的子模式，但不会保存匹配的字符序列。**在本教程中，我们将探讨如何在Java正则表达式中使用非捕获组。

## 2. 正则表达式组

正则表达式组可以是两种类型之一：捕获和非捕获。

捕获组会保存匹配的字符序列。它们的值可以作为模式中的反向引用使用，或者稍后在代码中检索。

尽管它们不会保存匹配的字符序列，**非捕获组可以改变组内的模式匹配修饰符。一些非捕获组甚至可以在成功匹配子模式后丢弃回溯信息。**

让我们通过一些非捕获组的示例来深入了解。

非捕获组是通过操作符“ _(?:X)_”创建的。“ _X_”是组的模式：

```java
Pattern.compile("[^:]+://(?:[.a-z]+/?)+")
```

这个模式有一个单一的非捕获组。如果它像URL一样，它将匹配一个值。一个完整的URL正则表达式会更复杂。我们使用一个简单的模式来专注于非捕获组。

模式 _“\\[^:\\]:_” 匹配协议 — 例如，“ _http://_”。非捕获组“ _(?:\\[.a-z\\]+/?)_”匹配带有可选斜杠的域名。由于“ _+_”操作符匹配这个模式的一个或多个出现，我们也会匹配后续的路径段。让我们在一个URL上测试这个模式：

```java
Pattern simpleUrlPattern = Pattern.compile("[^:]+://(?:[.a-z]+/?)+");
Matcher urlMatcher
  = simpleUrlPattern.matcher("http://www.microsoft.com/some/other/url/path");

Assertions.assertThat(urlMatcher.matches()).isTrue();
```

让我们看看当我们尝试检索匹配的文本时会发生什么：

```java
Pattern simpleUrlPattern = Pattern.compile("[^:]+://(?:[.a-z]+/?)+");
Matcher urlMatcher = simpleUrlPattern.matcher("http://www.microsoft.com/");

Assertions.assertThat(urlMatcher.matches()).isTrue();
Assertions.assertThatThrownBy(() -> urlMatcher.group(1))
  .isInstanceOf(IndexOutOfBoundsException.class);
```

正则表达式被编译成一个 _java.util.Pattern_ 对象。然后，我们创建一个 _java.util.Matcher_ 来将我们的 _Pattern_ 应用到提供的值。

接下来，我们断言 _matches()_ 的结果返回 _true_。

我们使用一个非捕获组来匹配URL中的域名。**由于非捕获组不保存匹配的文本，我们无法检索匹配的文本 _“www.microsoft.com/”_。**尝试检索域名将导致 _IndexOutOfBoundsException_。

### 3.1. 内联修饰符

**正则表达式是区分大小写的。**如果我们将我们的模式应用于一个混合大小写的URL，匹配将失败：

```java
Pattern simpleUrlPattern
  = Pattern.compile("[^:]+://(?:[.a-z]+/?)+");
Matcher urlMatcher
  = simpleUrlPattern.matcher("http://www.Microsoft.com/");

Assertions.assertThat(urlMatcher.matches()).isFalse();
```

在这种情况下，我们想要匹配大写字母，我们可以尝试几种选项。

一个选项是将大写字符范围添加到模式中：

```java
Pattern.compile("[^:]+://(?:[.a-zA-Z]+/?)+")
```

另一个选项是使用修饰符标志。因此，我们可以编译正则表达式使其不区分大小写：

```java
Pattern.compile("[^:]+://(?:[.a-z]+/?)+", Pattern.CASE_INSENSITIVE)
```

非捕获组允许第三种选项：**我们可以仅为组更改修饰符标志。**让我们向组添加不区分大小写的修饰符标志（“ _i_”）：

```java
Pattern.compile("[^:]+://(?i:[.a-z]+/?)+");
```

现在我们已经使组不区分大小写，让我们将这个模式应用于一个混合大小写的URL：

```java
Pattern scopedCaseInsensitiveUrlPattern
  = Pattern.compile("[^:]+://(?i:[.a-z]+/?)+");
Matcher urlMatcher
  = scopedCaseInsensitiveUrlPattern.matcher("http://www.Microsoft.com/");

Assertions.assertThat(urlMatcher.matches()).isTrue();
```

**当一个模式被编译为不区分大小写时，我们可以通过在修饰符前面添加“-”操作符来关闭它。**让我们将这个模式应用于另一个混合大小写的URL：

```java
Pattern scopedCaseSensitiveUrlPattern
  = Pattern.compile("[^:]+://(?-i:[.a-z]+/?)+/ending-path", Pattern.CASE_INSENSITIVE);
Matcher urlMatcher
  = scopedCaseSensitiveUrlPattern.matcher("http://www.Microsoft.com/ending-path");

Assertions.assertThat(urlMatcher.matches()).isFalse();
```

在这个示例中，最终的路径段“ _/ending-path_”是不区分大小写的。模式的“ _/ending-path_”部分将匹配大写和小写字符。

当我们在组内关闭不区分大小写的选项时，非捕获组仅支持小写字符。因此，混合大小写的域名不匹配。

## 4. 独立非捕获组

独立非捕获组是一种正则表达式组。这些组**在找到成功的匹配后丢弃回溯信息。**当使用这种类型的组时，我们需要意识到回溯何时会发生。否则，我们的模式可能不会匹配我们认为应该匹配的值。

回溯是不确定有限自动机（NFA）正则表达式引擎的一个特性。**当引擎无法匹配文本时，NFA引擎可以探索模式中的替代方案。**引擎会在耗尽所有可用的替代方案后失败匹配。我们仅涉及与独立非捕获组相关的回溯。

独立非捕获组是通过操作符“ _(?\u003eX)_”创建的，其中 _X_ 是子模式：

```java
Pattern.compile("[^:]+://(?\u003e[.a-z]+/?)+/ending-path");
```

我们添加了“ _/ending-path_”作为一个常量路径段。这个额外的要求迫使回溯情况。域名和其他路径段可以匹配斜杠字符。为了匹配 _“/ending-path”_，引擎需要回溯。通过回溯，引擎可以从组中删除斜杠并将其应用于模式的“ _/ending-path_”部分。

让我们将我们的独立非捕获组模式应用于一个URL：

```java
Pattern independentUrlPattern
  = Pattern.compile("[^:]+://(?\u003e[.a-z]+/?)+/ending-path");
Matcher independentMatcher
  = independentUrlPattern.matcher("http://www.microsoft.com/ending-path");

Assertions.assertThat(independentMatcher.matches()).isFalse();
```

该组成功匹配了域名和斜杠。因此，我们离开了独立非捕获组的范围。

这个模式要求在 _“ending-path”_ 之前出现斜杠。然而，我们的独立非捕获组已经匹配了斜杠。

NFA引擎应该尝试回溯。**由于组末尾的斜杠是可选的，NFA引擎会从组中删除斜杠并再次尝试。**独立非捕获组丢弃了回溯信息。因此，NFA引擎无法回溯。

### 4.1. 组内的回溯

可以在独立非捕获组内发生回溯。**当NFA引擎匹配组时，回溯信息尚未丢弃。回溯信息在组成功匹配后才会被丢弃：**

```java
Pattern independentUrlPatternWithBacktracking
  = Pattern.compile("[^:]+://(?\u003e(?:[.a-z]+/?)+/)ending-path");
Matcher independentMatcher
  = independentUrlPatternWithBacktracking.matcher("http://www.microsoft.com/ending-path");

Assertions.assertThat(independentMatcher.matches()).isTrue();
```

现在我们有一个独立非捕获组内的非捕获组。我们仍然有一个涉及 _“ending-path”_ 前面的斜杠的回溯情况。然而，我们将模式的回溯部分封装在独立非捕获组内。**因此，回溯将在独立非捕获组内发生。因此NFA引擎有足够的信息进行回溯，并且模式匹配提供的URL。**

## 5. 结论

我们已经展示了非捕获组与捕获组的不同。然而，它们像它们的捕获对应物一样作为一个单一单元工作。我们还展示了**非捕获组可以启用或禁用组而不是整个模式的修饰符。**

同样，我们已经展示了独立非捕获组如何丢弃回溯信息。**没有这些信息，NFA引擎无法探索替代方案以成功匹配。**然而，组内可以发生回溯。

正如往常一样，源代码可在GitHub上获得。

[![Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)](https://www.baeldung.com)
[![Gravatar Image](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)](https://www.baeldung.com/)
[![Eric Martin Avatar](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)](https://www.baeldung.com/)
[![Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)](https://www.baeldung.com/)
[![REST API Post Footer](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)](https://www.baeldung.com/)
[![REST API Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)](https://www.baeldung.com/)

OK