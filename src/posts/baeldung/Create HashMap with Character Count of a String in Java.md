---
date: 2024-06-17
category:
  - Java
  - 编程
tag:
  - HashMap
  - 字符计数
  - Java 8
---
# 在Java中创建包含字符串字符计数的HashMap | Baeldung

## 1. 引言

在各种编程场景中，处理字符串中的字符计数是常见的。一种高效的方法是使用_HashMap_来存储字符串中每个字符的频率。

**在本教程中，我们将探讨如何在Java中创建一个包含给定字符串字符计数的_HashMap_。**

## 2. 使用传统循环

创建一个包含字符串字符计数的_HashMap_的最简单方法之一是使用传统循环。在这种方法中，我们遍历字符串中的每个字符，并相应地在_HashMap_中更新每个字符的计数。

让我们看看这如何实现：

`String str = "abcaadcbcb";`

```java
@Test
public void givenString_whenUsingLooping_thenVerifyCounts() {
    Map```<Character, Integer>``` charCount = new HashMap<>();
    for (char c : str.toCharArray()) {
        charCount.merge(c, 1, Integer::sum);
    }
    assertEquals(3, charCount.get('a').intValue());
}
```

在测试方法中，我们首先实例化一个名为_charCount_的映射对象，它将保存字符计数。之后，我们遍历字符串_str_中的每个字符。对于每个字符，我们使用映射接口的_charCount.merge()_方法来更新_charCount_映射中的出现次数计数。

**如果字符是第一次遇到，我们将其计数初始化为1；否则，我们将现有计数增加1。** 最后，我们验证_charCount_映射是否正确存储了字符‘_a_’的计数为3。

## 3. 使用Java _Streams_

另外，我们可以利用Java _Streams_以更简洁和功能性的方法达到相同的结果。使用_Streams_，我们可以轻松地对字符串中的字符进行分组和计数。以下是我们如何使用Java _Streams_来实现它：

```java
@Test
public void givenString_whenUsingStreams_thenVerifyCounts() {
    Map```<Character, Integer>``` charCount = str.chars()
        .boxed()
        .collect(toMap(
          k -> (char) k.intValue(),
          v -> 1,
          Integer::sum));
    assertEquals(3, charCount.get('a').intValue());
}
```

在这里，我们首先使用_chars()_方法将_str_字符串转换为_IntStream_。接下来，使用_boxed()_方法将每个表示Unicode代码点的整数封装成_Character_对象，得到_Stream`<Character>`_。此外，通过使用_collect()_方法，我们将流元素累积到_Map```<Character, Integer>```_中。

_toMap()_收集器在映射每个字符到其计数中至关重要。**在这个收集器中，我们定义了三个参数：一个键映射函数，将每个字符转换为_Character_对象；一个值映射函数，为遇到的每个字符分配1的计数；以及一个合并函数，_Integer::sum_，它通过求和来聚合具有相同键的字符的计数。**

## 4. 结论

在本文中，我们创建了一个包含字符串字符计数的_HashMap_。无论是通过传统循环还是利用Java Streams，关键是有效地遍历字符串的字符并在_HashMap_中更新计数。

如往常一样，本文的完整代码示例可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。翻译已经结束。

OK。