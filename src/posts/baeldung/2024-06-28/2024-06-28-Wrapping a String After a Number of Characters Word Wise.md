---
date: 2024-06-29
category:
  - Java
  - 编程
tag:
  - 字符串
  - 换行
head:
  - - meta
    - name: keywords
      content: Java, 字符串换行, WordUtils, 编程技巧
---
# Java中按字符数自动换行字符串

在本教程中，我们将看到如何在给定字符数后自动换行一个句子。因此，我们的程序将返回一个带有新行断点的转换后的字符串。

## 2. 通用算法
让我们考虑以下句子："Baeldung是一个提供各种编程和软件开发主题的深入教程和文章的流行网站，主要关注Java和相关技术。"

**我们想要每_n_个字符插入一行返回**，n代表字符数。让我们看看实现这一点的代码：

```java
String wrapStringCharacterWise(String input, int n) {
    StringBuilder stringBuilder = new StringBuilder(input);
    int index = 0;
    while(stringBuilder.length() > index + n) {
        index = stringBuilder.lastIndexOf(" ", index + n);
        stringBuilder.replace(index, index + 1, "\n");
        index++;
    }
    return stringBuilder.toString();
}
```

让我们以n=20为例来理解我们的示例代码：

- 我们首先找到20个字符之前的最后一个空白：在本例中，是在单词a和popular之间
- 然后我们将这个空白替换为行返回
- 我们从下一个单词的开头开始再次执行，在我们的示例中是popular

当剩余的句子少于20个字符时，我们停止算法。我们自然地通过一个for循环实现这个算法。此外，我们内部使用了StringBuilder以方便操作，并参数化了我们的输入：

我们可以编写一个单元测试来确认我们的方法对我们的示例返回预期的结果：

```java
@Test
void givenStringWithMoreThanNCharacters_whenWrapStringCharacterWise_thenCorrectlyWrapped() {
    String input = "Baeldung is a popular website that provides in-depth tutorials and articles on various programming and software development topics, primarily focused on Java and related technologies.";
    assertEquals("Baeldung is a\npopular website that\nprovides in-depth\ntutorials and\narticles on various\nprogramming and\nsoftware development\ntopics, primarily\nfocused on Java and\nrelated\ntechnologies.", wrapper.wrapStringCharacterWise(input, 20));
}
```

## 3. 边缘情况
到目前为止，我们编写了一个非常简单的代码。在现实生活用例中，我们可能需要考虑一些边缘情况。在本文中，我们将解决其中的两个。

### 3.1. 字符长度超过限制的单词
首先，如果一个单词太大而无法换行怎么办？为了简单起见，**让我们在这种情况下抛出一个_IllegalArgumentException_。** 在我们的循环的每次迭代中，我们需要检查在给定长度之前确实有一个空格：

```java
String wrapStringCharacterWise(String input, int n) {
    StringBuilder stringBuilder = new StringBuilder(input);
    int index = 0;
    while(stringBuilder.length() > index + n) {
        index = stringBuilder.lastIndexOf(" ", index + n);
        if (index == -1) {
            throw new IllegalArgumentException("impossible to slice " + stringBuilder.substring(0, n));
        }
        stringBuilder.replace(index, index + 1, "\n");
        index++;
    }
    return stringBuilder.toString();
}
```

这次我们可以再次为我们的验证编写一个简单的JUnit测试：

```java
@Test
void givenStringWithATooLongWord_whenWrapStringCharacterWise_thenThrows() {
    String input = "The word straightforward has more than 10 characters";
    assertThrows(IllegalArgumentException.class, () -> wrapper.wrapStringCharacterWise(input, 10));
}
```

### 3.2. 原始输入包含行返回
另一个边缘情况是输入字符串已经包含行返回字符。目前，如果我们在句子中的Baeldung之后添加一个行返回，它将被完全相同地换行。**然而，更直观的是在现有行返回之后开始换行。**

为此，我们将在算法的每次迭代中搜索最后一个行返回；如果存在，我们将移动光标并跳过换行部分：

```java
String wrapStringCharacterWise(String input, int n) {
    StringBuilder stringBuilder = new StringBuilder(input);
    int index = 0;
    while(stringBuilder.length() > index + n) {
        int lastLineReturn = stringBuilder.lastIndexOf("\n", index + n);
        if (lastLineReturn > index) {
            index = lastLineReturn;
        } else {
            index = stringBuilder.lastIndexOf(" ", index + n);
            if (index == -1) {
                throw new IllegalArgumentException("impossible to slice " + stringBuilder.substring(0, n));
            }
            stringBuilder.replace(index, index + 1, "\n");
            index++;
        }
    }
    return stringBuilder.toString();
}
```

再次，我们可以在我们的示例上测试我们的代码：

```java
@Test
void givenStringWithLineReturns_whenWrapStringCharacterWise_thenWrappedAccordingly() {
    String input = "Baeldung\nis a popular website that provides in-depth tutorials and articles on various programming and software development topics, primarily focused on Java and related technologies.";
    assertEquals("Baeldung\nis a popular\nwebsite that\nprovides in-depth\ntutorials and\narticles on various\nprogramming and\nsoftware development\ntopics, primarily\nfocused on Java and\nrelated\ntechnologies.", wrapper.wrapStringCharacterWise(input, 20));
}
```

## 4. Apache WordUtils wrap() 方法
**我们可以使用Apache WordUtils的wrap()方法来实现所需的行为。** 首先，让我们添加最新的Apache commons-text依赖项：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-text`</artifactId>`
    `<version>`1.10.0`</version>`
`</dependency>`
```

与我们的代码的主要区别是wrap()默认使用平台无关的System的行分隔符：

```java
@Test
void givenStringWithMoreThanNCharacters_whenWrap_thenCorrectlyWrapped() {
    String input = "Baeldung is a popular website that provides in-depth tutorials and articles on various programming and software development topics, primarily focused on Java and related technologies.";
    assertEquals("Baeldung is a" + System.lineSeparator() + "popular website that" + System.lineSeparator() + "provides in-depth" + System.lineSeparator() + "tutorials and" + System.lineSeparator() + "articles on various" + System.lineSeparator() + "programming and" + System.lineSeparator() + "software development" + System.lineSeparator() + "topics, primarily" + System.lineSeparator() + "focused on Java and" + System.lineSeparator() + "related" + System.lineSeparator() + "technologies.", WordUtils.wrap(input, 20));
}
```

默认情况下，wrap()接受长单词但不换行它们：

```java
@Test
void givenStringWithATooLongWord_whenWrap_thenLongWordIsNotWrapped() {
    String input = "The word straightforward has more than 10 characters";
    assertEquals("The word" + System.lineSeparator() + "straightforward" + System.lineSeparator() + "has more" + System.lineSeparator() + "than 10" + System.lineSeparator() + "characters", WordUtils.wrap(input, 10));
}
```

最后但同样重要的是，这个库忽略了我们的另一个边缘情况：

```java
@Test
void givenStringWithLineReturns_whenWrap_thenWrappedLikeThereWasNone() {
    String input = "Baeldung" + System.lineSeparator() + "is a popular website that provides in-depth tutorials and articles on various programming and software development topics, primarily focused on Java and related technologies.";
    assertEquals("Baeldung" + System.lineSeparator() + "is a" + System.lineSeparator() + "popular website that" + System.lineSeparator() + "provides in-depth" + System.lineSeparator() + "tutorials and" + System.lineSeparator() + "articles on various" + System.lineSeparator() + "programming and" + System.lineSeparator() + "software development" + System.lineSeparator() + "topics, primarily" + System.lineSeparator() + "focused on Java and" + System.lineSeparator() + "related" + System.lineSeparator() + "technologies.", WordUtils.wrap(input, 20));
}
```

最后，我们来看看方法的重载签名：

```java
static String wrap(final String str, int wrapLength, String newLineStr, final boolean wrapLongWords, String wrapOn)
```

我们注意到额外的参数：

- _newLineStr_: 使用不同的字符进行新行插入
- _wrapLongWords_: 一个布尔值，决定是否换行长单词
- _wrapOn_: 可以使用任何正则表达式而不是空格

## 5. 结论
在本文中，我们看到了一种在给定字符数后换行_String_的算法。我们实现了它并增加了对几个边缘情况的支持。

最后，我们意识到Apache WordUtils的wrap()方法高度可配置，应该足以应对大多数情况。然而，如果我们不能使用外部依赖项或需要特定行为，我们可以使用我们自己的实现。

一如既往，代码可以在GitHub上找到。