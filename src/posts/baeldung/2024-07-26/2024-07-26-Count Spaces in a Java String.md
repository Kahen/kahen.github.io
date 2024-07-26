---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String
  - Spaces Count
head:
  - - meta
    - name: keywords
      content: Java String, Count Spaces, String Manipulation
------
# 在Java字符串中计算空格数量

## 1. 概述

当我们处理Java字符串时，有时我们可能希望计算字符串中的空格数量。

有多种方法可以得到结果。在这个快速教程中，我们将通过示例看到如何完成这个任务。

## 2. 示例输入字符串

首先，让我们准备一个输入字符串作为示例：

```java
String INPUT_STRING = "  This string has nine spaces and a Tab:'\t'";
```

上面的字符串包含九个空格和一个制表符，制表符用单引号括起来。**我们的目标是仅在给定的输入字符串中计算空格字符**。

因此，我们的预期结果是：

```java
int EXPECTED_COUNT = 9;
```

接下来，让我们探索各种解决方案以获得正确的结果。

我们将首先使用Java标准库解决问题，然后我们将使用一些流行的外部库。

最后，在本教程中，我们将在单元测试方法中解决所有解决方案。

## 3. 使用Java标准库

### 3.1. 经典解决方案：循环和计数

这可能是解决这个问题最直接的想法。

我们遍历输入字符串中的所有字符。同时，我们维护一个计数变量，并在看到空格字符时增加计数器。

最后，我们将得到字符串中的空格计数：

```java
@Test
void givenString_whenCountSpaceByLooping_thenReturnsExpectedCount() {
    int spaceCount = 0;
    for (char c : INPUT_STRING.toCharArray()) {
        if (c == ' ') {
            spaceCount++;
        }
    }
    assertThat(spaceCount).isEqualTo(EXPECTED_COUNT);
}
```

### 3.2. 使用Java 8的Stream API

自Java 8以来，Stream API已经存在。

此外，**自Java 9以来，在_String_类中添加了一个新的_chars()_方法，将_String_中的_char_值转换为_IntStream_实例**。

如果我们使用Java 9或更高版本，我们可以结合这两个功能，用一行代码解决问题：

```java
@Test
void givenString_whenCountSpaceByJava8StreamFilter_thenReturnsExpectedCount() {
    long spaceCount = INPUT_STRING.chars().filter(c -> c == (int) ' ').count();
    assertThat(spaceCount).isEqualTo(EXPECTED_COUNT);
}
```

### 3.3. 使用Regex的_Matcher.find()_方法

到目前为止，我们已经看到了通过在给定字符串中搜索空格字符来计数的解决方案。我们使用_character == ‘ ‘_来检查一个字符是否是空格字符。

**正则表达式（Regex）是另一种强大的字符串搜索工具，Java对Regex有很好的支持**。

因此，我们可以定义一个空格作为模式，并使用_Matcher.find()_方法来检查模式是否在输入字符串中找到。

此外，为了得到空格的计数，我们每次找到模式时就增加一个计数器：

```java
@Test
void givenString_whenCountSpaceByRegexMatcher_thenReturnsExpectedCount() {
    Pattern pattern = Pattern.compile(" ");
    Matcher matcher = pattern.matcher(INPUT_STRING);
    int spaceCount = 0;
    while (matcher.find()) {
        spaceCount++;
    }
    assertThat(spaceCount).isEqualTo(EXPECTED_COUNT);
}
```

### 3.4. 使用_String.replaceAll()_方法

使用_Matcher.find()_方法搜索和查找空格非常简单。然而，既然我们谈论的是Regex，还可以有其他快速的方法来计数空格。

我们知道可以使用_String.replaceAll()_方法进行“搜索和替换”。

因此，**如果我们将输入字符串中的所有非空格字符替换为空字符串，所有的空格将从输入中得到结果**。

所以，如果我们想要得到计数，结果字符串的长度将是答案。接下来，让我们尝试这个想法：

```java
@Test
void givenString_whenCountSpaceByReplaceAll_thenReturnsExpectedCount() {
    int spaceCount = INPUT_STRING.replaceAll("[^ ]", "").length();
    assertThat(spaceCount).isEqualTo(EXPECTED_COUNT);
}
```

正如上面的代码所示，我们只需要一行代码就可以得到计数。

值得一提的是，在_String.replaceAll()_调用中，我们使用了模式_“\\[^ \\]”_而不是_“\\\\\\S”_。这是因为我们希望替换非空格字符而不仅仅是非空白字符。

### 3.5. 使用_String.split()_方法

我们已经看到使用_String.replaceAll()_方法的解决方案是整洁且紧凑的。现在，让我们看看另一种解决问题的想法：使用_String.split()_方法。

正如我们所知，我们可以将一个模式传递给_String.split()_方法，并得到一个字符串数组，该数组由模式分隔。

因此，想法是，**我们可以按单个空格分隔输入字符串。然后，原始字符串中的空格计数将比字符串数组长度少一个**。

现在，让我们看看这个想法是否有效：

```java
@Test
void givenString_whenCountSpaceBySplit_thenReturnsExpectedCount() {
    int spaceCount = INPUT_STRING.split(" ").length - 1;
    assertThat(spaceCount).isEqualTo(EXPECTED_COUNT);
}
```

## 4. 使用外部库

Apache Commons Lang 3库在Java项目中广泛使用。此外，Spring是Java爱好者中流行的框架。

这两个库都提供了一个方便的字符串工具类。

现在，让我们看看如何使用这些库在输入字符串中计数空格。

### 4.1. 使用Apache Commons Lang 3库

Apache Commons Lang 3库提供了一个_StringUtil_类，其中包含许多方便的与字符串相关的方法。

**要计算字符串中的空格数量，我们可以使用这个类中的_countMatches()_方法**。

在我们开始使用_StringUtil_类之前，我们应该检查库是否在类路径中。我们可以通过在_pom.xml_中添加最新版本的依赖来实现：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.14.0`</version>`
`</dependency>`
```

现在，让我们创建一个单元测试来展示如何使用这个方法：

```java
@Test
void givenString_whenCountSpaceUsingApacheCommons_thenReturnsExpectedCount() {
    int spaceCount = StringUtils.countMatches(INPUT_STRING, " ");
    assertThat(spaceCount).isEqualTo(EXPECTED_COUNT);
}
```

### 4.2. 使用Spring

如今，许多Java项目都基于Spring框架。因此，如果我们使用Spring，Spring已经准备好了一个方便的字符串工具：_StringUtils_。

是的，它的名字与Apache Commons Lang 3中的类相同。此外，它提供了一个_countOccurrencesOf()_方法来计算字符串中字符的出现次数。

这正是我们要找的：

```java
@Test
void givenString_whenCountSpaceUsingSpring_thenReturnsExpectedCount() {
    int spaceCount = StringUtils.countOccurrencesOf(INPUT_STRING, " ");
    assertThat(spaceCount).isEqualTo(EXPECTED_COUNT);
}
```

## 5. 结论

在这篇文章中，我们讨论了在输入字符串中计数空格字符的不同方法。

一如既往，文章的代码可以在GitHub上找到。