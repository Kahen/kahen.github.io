---
date: 2024-07-23
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String
  - Pattern Matching
head:
  - - meta
    - name: keywords
      content: Java, String, Pattern, EndsWith, Regular Expression
------
# 如何在Java中检查字符串是否以特定模式结束

在这篇简短的教程中，我们将深入介绍如何在Java中检查字符串是否以某个特定模式结束。

首先，我们将考虑使用Java核心类库的解决方案。然后，我们将展示如何使用外部库来完成相同的任务。

### 使用String类

简单来说，String提供了多种方便的选项来验证给定的字符串是否以特定的子字符串结束。

让我们更详细地看看每个选项。

#### 2.1. String#endsWith方法

这个方法通常是为了这个目的而引入的。**这是检查一个String对象是否以另一个字符串结束的最直接方式**。

让我们看看它在实际中的应用：

```java
public static boolean usingStringEndsWithMethod(String text, String suffix) {
    if (text == null || suffix == null) {
        return false;
    }
    return text.endsWith(suffix);
}
```

请注意endsWith不是null安全的。因此，我们需要首先确保text和suffix不是null，以避免NullPointerException。

#### 2.2. String#matches方法

matches是另一个我们可以用来实现我们目标的好方法。它简单地检查一个字符串是否与给定的正则表达式匹配。

基本上，我们需要做的就是指定适合我们用例的正则表达式：

```java
public static boolean usingStringMatchesMethod(String text, String suffix) {
    if (text == null || suffix == null) {
        return false;
    }
    String regex = ".*" + suffix + "$";
    return text.matches(regex);
}
```

正如我们所看到的，我们使用了一个正则表达式，它在字符串text的末尾($)匹配suffix。然后，我们将正则表达式传递给matches方法。

#### 2.3. String#regionMatches方法

同样，我们可以使用regionMatches方法来解决我们的中心问题。**如果字符串的一部分与指定的字符串完全匹配，它返回true；否则返回false**。

现在，让我们用一个例子来说明这一点：

```java
public static boolean usingStringRegionMatchesMethod(String text, String suffix) {
    if (text == null || suffix == null) {
        return false;
    }
    int toffset = text.length() - suffix.length();
    return text.regionMatches(toffset, suffix, 0, suffix.length());
}
```

toffset表示我们字符串中的子区域的起始偏移量。因此，为了检查text是否以指定的suffix结束，toffset应该等于text的长度减去suffix的长度。

### 使用Pattern类

另外，我们可以使用Pattern类来编译一个正则表达式，以检查字符串是否以一个模式结束。

话不多说，让我们重用前一节中指定的相同正则表达式：

```java
public static boolean usingPatternClass(String text, String suffix) {
    if (text == null || suffix == null) {
        return false;
    }
    Pattern pattern = Pattern.compile(".*" + suffix + "$");
    return pattern.matcher(text).find();
}
```

如上所示，Pattern编译了前面的正则表达式，它表示字符串的结尾，并尝试将其与我们的字符串text匹配。

### 使用Apache Commons Lang

Apache Commons Lang提供了一组用于字符串操作的现成的实用类。在这些类中，我们找到了StringUtils。

这个实用类带有一个有趣的方法叫做endsWith。它**以null安全的方式检查一个字符序列是否以后缀结束**。

现在，让我们举例说明StringUtils.endsWith方法的使用：

```java
public static boolean usingApacheCommonsLang(String text, String suffix) {
    return StringUtils.endsWith(text, suffix);
}
```

### 结论

在本文中，我们探索了检查字符串是否以特定模式结束的不同方法。

首先，我们看到了使用内置Java类库实现这一点的几种方法。然后，我们解释了如何使用Apache Commons Lang库来做同样的事情。

正如往常一样，本文中使用的代码可以在GitHub上找到。