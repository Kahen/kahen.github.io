---
date: 2024-06-17
category:
  - Java
  - 编程
tag:
  - Java编程
  - 字符串处理
---
# Java中打印字符串的不同字符 | Baeldung

## 1. 引言

在Java编程中，从字符串中打印不同的字符是一个基本任务，通常在文本处理和分析中需要。

**在本教程中，我们将探索处理和加工唯一字符的各种方法。**

## 2. 使用_Set_集合

从字符串中打印不同字符的一种有效方法是通过使用Java中的_Set_集合。_Set_自动处理重复项，允许我们高效地收集唯一字符。以下是实现此方法的方式：

```java
String inputString = "BBaaeelldduunngg";

@Test
public void givenString_whenUsingSet_thenFindDistinctCharacters() {
    Set``````<Character>`````` distinctChars = new HashSet<>();
    for (char ch : inputString.toCharArray()) {
        distinctChars.add(ch);
    }
    assertEquals(Set.of('B', 'a', 'e', 'l', 'd', 'u', 'n', 'g'), distinctChars);
}
```

在这种方法中，我们首先遍历名为_inputString_的输入字符串中的每个字符。它将每个字符添加到名为_distinctChars_的_HashSet_中，由于_Set_的特性，它自动消除了重复项。

最后，我们使用_assertEquals()_方法验证收集到的不同字符是否与预期的唯一字符集匹配。

## 3. 使用Java _Streams_

另一种获取不同字符的方法是利用Java _Streams_。Streams提供了一种简洁且功能性的方式来处理集合，包括提取不同的元素。以下是一个例子：

```java
@Test
public void givenString_whenUsingStreams_thenFindDistinctCharacters() {
    Set``````<Character>`````` distinctChars = inputString.chars()
      .mapToObj(c -> (char) c)
      .collect(Collectors.toSet());
    assertEquals(Set.of('B', 'a', 'e', 'l', 'd', 'u', 'n', 'g'), distinctChars);
}
```

在这里，我们使用_inputString.chars()_方法将输入字符串_inputString_转换为字符值的_IntStream_。然后，我们使用_mapToObj(c -> (char) c)_将每个字符值映射回其对应的char值。

此外，我们使用_Collectors.toSet()_终端操作将这些字符收集到一个_Set``````<Character>``````_中，由于_Set_的特性，它自动确保消除了重复项。

## 4. 使用 _LinkedHashMap_

我们可以使用_LinkedHashMap_作为一种有效的方式来在字符串中维护唯一的字符。以下是一个示例：

```java
@Test
public void givenString_whenUsingLinkedHashMap_thenFindDistinctCharacters() {
    Map``<Character, Integer>`` charCount = new LinkedHashMap<>();
    for (char ch : inputString.toCharArray()) {
        charCount.put(ch, 1);
    }
    assertEquals("[B, a, e, l, d, u, n, g]", charCount.keySet().toString());
}
```

在这种方法中，我们遍历每个字符，并使用_charCount.put(ch, 1)_方法将其添加到_LinkedHashMap_中。此外，每个字符关联的值1在这个用例中并不重要；它只是一个占位符来填充映射。

**值得注意的是，_LinkedHashMap_保持插入的顺序，因此当我们遍历字符串时，字符按照它们首次出现的顺序被添加。**

## 5. 结论

总之，在Java中打印字符串的不同字符可以使用各种方法，包括_Set_集合、Java _Streams_和_LinkedHashMap_。每种方法都提供了独特的优势，这取决于我们应用程序的具体需求。

如常，本文的完整代码示例可以在GitHub上找到。

评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。---
date: 2024-06-17
category:
  - Java
  - 编程
tag:
  - Java编程
  - 字符串处理
---
# Java中打印字符串的不同字符 | Baeldung

## 1. 引言

在Java编程中，打印字符串中的不同字符是一项基本任务，这在文本处理和分析中经常需要。

**在本教程中，我们将探索处理和加工唯一字符的多种方法。**

## 2. 使用集合

使用Java中的集合来打印字符串中的不同字符是一种有效的方法。集合自动处理重复项，让我们能够高效地收集唯一字符。以下是实现此方法的示例代码：

```java
String inputString = "BBaaeelldduunngg";

@Test
public void givenString_whenUsingSet_thenFindDistinctCharacters() {
    Set``````<Character>`````` distinctChars = new HashSet<>();
    for (char ch : inputString.toCharArray()) {
        distinctChars.add(ch);
    }
    assertEquals(Set.of('B', 'a', 'e', 'l', 'd', 'u', 'n', 'g'), distinctChars);
}
```

在这种方法中，我们首先遍历名为_inputString_的输入字符串中的每个字符。它将每个字符添加到名为_distinctChars_的_HashSet_中，由于集合的特性，它自动消除了重复项。

最后，我们使用_assertEquals()_方法来验证收集到的不同字符是否与预期的唯一字符集匹配。

## 3. 使用Java 流

利用Java 流的另一种获取不同字符的方法。流提供了一种简洁且函数式的方式来处理集合，包括提取不同的元素。以下是示例代码：

```java
@Test
public void givenString_whenUsingStreams_thenFindDistinctCharacters() {
    Set``````<Character>`````` distinctChars = inputString.chars()
      .mapToObj(c -> (char) c)
      .collect(Collectors.toSet());
    assertEquals(Set.of('B', 'a', 'e', 'l', 'd', 'u', 'n', 'g'), distinctChars);
}
```

在这里，我们使用_inputString.chars()_方法将输入字符串_inputString_转换为字符值的_IntStream_。然后，我们使用_mapToObj(c -> (char) c)_将每个字符值映射回其对应的字符。

此外，我们使用_Collectors.toSet()_终端操作来收集这些字符到一个_Set``````<Character>``````_中，由于集合的特性，它自动确保了重复项的消除。

## 4. 使用LinkedHashMap

我们还可以使用LinkedHashMap作为一种有效的方式来在字符串中维护唯一字符。以下是这种方法的示例代码：

```java
@Test
public void givenString_whenUsingLinkedHashMap_thenFindDistinctCharacters() {
    Map``<Character, Integer>`` charCount = new LinkedHashMap<>();
    for (char ch : inputString.toCharArray()) {
        charCount.put(ch, 1);
    }
    assertEquals("[B, a, e, l, d, u, n, g]", charCount.keySet().toString());
}
```

在这种方法中，我们遍历每个字符，并使用_charCount.put(ch, 1)_方法将其添加到_LinkedHashMap_中。此外，与每个字符关联的值1在这个用例中并不重要；它只是一个占位符。

**值得注意的是，LinkedHashMap维护插入的顺序，因此当我们遍历字符串时，字符将按照它们首次出现的顺序被添加。**

## 5. 结论

总之，在Java中打印字符串的不同字符可以通过使用集合、Java流和LinkedHashMap等多种方法来实现。每种方法都有其独特的优势，这取决于我们应用程序的具体需求。

文章的完整代码示例可以在GitHub上找到。

文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。

OK