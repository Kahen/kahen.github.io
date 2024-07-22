---
date: 2022-04-01
category:
  - Java
  - 字符串处理
tag:
  - Java
  - 字符串分割
head:
  - - meta
    - name: keywords
      content: Java, 字符串分割, 正则表达式, Guava库
---

# Java中每n个字符分割字符串

在本教程中，我们将探讨如何在Java中每n个字符分割字符串。首先，我们将探索使用内置Java方法实现此操作的可能方式。然后，我们将展示如何使用Guava库达到相同的目标。

## 2. 使用String#split方法

String类提供了一个方便的方法叫做split。顾名思义，它根据给定的分隔符或正则表达式将字符串分割成多个部分。

让我们看看它的实际应用：

```java
public static List````````<String>```````` usingSplitMethod(String text, int n) {
    String[] results = text.split("(?<=\\G.{" + n + "})");
    return Arrays.asList(results);
}
```

如我们所见，我们使用了正则表达式"(?<=\\G.{" + n + "})", 其中n是字符的数量。这是一个正向后瞻断言，它匹配一个字符串，该字符串在最后一个匹配(\\G)之后有n个字符。

现在，让我们创建一个测试用例来检查一切是否按预期工作：

```java
public class SplitStringEveryNthCharUnitTest {

    public static final String TEXT = "abcdefgh123456";

    @Test
    public void givenString_whenUsingSplit_thenSplit() {
        List````````<String>```````` results = SplitStringEveryNthChar.usingSplitMethod(TEXT, 3);

        assertThat(results, contains("abc", "def", "gh1", "234", "56"));
    }
}
```

## 3. 使用String#substring方法

另一种在每个第n个字符处分割String对象的方法是使用substring方法。

基本上，我们可以循环遍历字符串并调用substring，根据指定的n字符将其分割成多个部分：

```java
public static List````````<String>```````` usingSubstringMethod(String text, int n) {
    List````````<String>```````` results = new ArrayList<>();
    int length = text.length();

    for (int i = 0; i < length; i += n) {
        results.add(text.substring(i, Math.min(length, i + n)));
    }

    return results;
}
```

如上所示，substring方法允许我们获取字符串在当前索引i和i+n之间的部分。

现在，让我们使用一个测试用例来确认这一点：

```java
@Test
public void givenString_whenUsingSubstring_thenSplit() {
    List````````<String>```````` results = SplitStringEveryNthChar.usingSubstringMethod(TEXT, 4);

    assertThat(results, contains("abcd", "efgh", "1234", "56"));
}
```

## 4. 使用Pattern类

Pattern提供了一种简洁的方式来编译正则表达式并将其与给定的字符串匹配。

因此，使用正确的正则表达式，我们可以使用Pattern实现我们的目标：

```java
public static List````````<String>```````` usingPattern(String text, int n) {
    return Pattern.compile(".{1," + n + "}")
        .matcher(text)
        .results()
        .map(MatchResult::group)
        .collect(Collectors.toList());
}
```

如我们所见，我们使用了".{1,n}"作为正则表达式来创建我们的Pattern对象。它至少匹配一个字符，最多匹配n个字符。

最后，让我们编写一个简单的测试：

```java
@Test
public void givenString_whenUsingPattern_thenSplit() {
    List````````<String>```````` results = SplitStringEveryNthChar.usingPattern(TEXT, 5);

    assertThat(results, contains("abcde", "fgh12", "3456"));
}
```

## 5. 使用Guava

现在我们已经知道如何使用核心Java方法每n个字符分割字符串，让我们看看如何使用Guava库来做同样的事情：

```java
public static List````````<String>```````` usingGuava(String text, int n) {
    Iterable````````<String>```````` parts = Splitter.fixedLength(n).split(text);

    return ImmutableList.copyOf(parts);
}
```

Guava提供了Splitter类来简化从字符串中提取子字符串的逻辑。fixedLength()方法将给定的字符串分割成指定长度的片段。

让我们用一个测试用例来验证我们的方法：

```java
@Test
public void givenString_whenUsingGuava_thenSplit() {
    List````````<String>```````` results = SplitStringEveryNthChar.usingGuava(TEXT, 6);

    assertThat(results, contains("abcdef", "gh1234", "56"));
}
```

## 6. 结论

总结起来，我们解释了如何使用Java方法在每个第n个字符处分割字符串。

在那之后，我们展示了如何使用Guava库完成相同的目标。

正如往常一样，本文中使用的代码可以在GitHub上找到。