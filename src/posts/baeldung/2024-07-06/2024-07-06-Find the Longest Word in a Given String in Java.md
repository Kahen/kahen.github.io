---
date: 2022-04-01
category:
  - Java
  - String
tag:
  - Longest Word
  - Java String
head:
  - - meta
    - name: keywords
      content: Java, Longest Word, String Manipulation
---

# 在Java中查找给定字符串中的最长单词 | Baeldung

## 1. 概述

在本教程中，我们将寻找一个句子中的一个或所有最长的单词。

一个句子是一组单词。我们将用Java的_String_来表示它。此外，我们假设每个非空白字符都是单词的一部分。最后，我们将强调技术边缘情况：null、空或空白的_String_没有最长的单词。

## 2. 查找一个最长的单词

首先，让我们找到句子中的最长单词。例如，在句子：“_This is a phrase with words_”，最长的单词是_phrase_。如果有多个单词具有相同的长度，任何一个都是可接受的答案。如果句子中没有单词，则没有结果。因此，我们的方法返回一个_Optional_：

```java
public Optional``<String>`` findLongestWord(String sentence) {
    return Optional.ofNullable(sentence)
      .filter(string -> !string.trim().isEmpty())
      .map(string -> string.split("\\s"))
      .map(Arrays::asList)
      .map(list -> Collections.max(list, Comparator.comparingInt(String::length)));
}
```

我们首先将句子包装在一个_Optional_中，并过滤掉所有空和空白的_String_。接下来，我们应用_String_的_split()_方法来检索单词数组。我们需要将‘_\\s_’作为参数传递，以使用空格作为分隔符。然后，我们通过_Arrays.asList()_将数组转换为_List_。最后，我们使用_Collections.max()_来获取最长的单词。这个方法有两个属性：

- 确定最大值的列表
- 用于确定最大值的_Comparator_

在这种情况下，我们通过它们的长度来比较单词。我们将类命名为_LongestWordFinder_，现在我们可以对示例句子进行单元测试：

```java
@Test
void givenAPhraseWithALongestWord_whenFindLongestWord_thenLongestWordOfThePhrase() {
    assertThat(new LongestWordFinder().findLongestWord("This is a phrase with words")).hasValue("phrase");
}
```

## 3. 查找所有最长的单词

现在我们将列出所有最长的单词。例如，_Baeldung_和_sentence_是句子：“_Baeldung is another word of size eight in this sentence_”中的两个最长的单词。

首先，我们将处理没有单词的边缘情况，并在这种情况下返回一个空列表。此外，我们将再次将句子分割成一个单词数组。但这次我们的目标是**首先计算最大长度，并使用它来找到所有具有此长度的单词**：

```java
public List``<String>`` findLongestWords(String sentence) {
    if (sentence == null || sentence.trim().isEmpty()) {
        return Collections.emptyList();
    }
    String[] words = sentence.split("\\s");
    int maxWordLength = Arrays.stream(words)
      .mapToInt(String::length)
      .max()
      .orElseThrow();
    return Arrays.stream(words)
      .filter(word -> word.length() == maxWordLength)
      .collect(Collectors.toList());
}
```

正如我们所看到的，为了计算最大长度，我们首先从单词数组创建了一个_Stream_。然后，我们应用了_mapToInt()_中间操作，并使用_String::length_作为参数。这样，我们将_Stream_转换为单词长度的_Stream_。最后，我们得到了_Stream_的最大值。

总之，我们所要做的就是过滤出具有这个最大长度的单词。我们使用另一个_Stream_来做到这一点，并将匹配的单词收集到结果列表中。现在让我们检查_findLongestWords()_是否为我们的示例句子返回了预期的结果：

```java
@Test
void givenAPhraseWithVariousWordsOfMaxLength_whenFindLongestWords_thenAllLongestsWords() {
    assertThat(new LongestWordFinder().findLongestWords("Baeldung is another word of size eight in this sentence")).containsExactly("Baeldung", "sentence");
}
```

## 4. 结论

在本文中，我们将句子分割成单词列表，并使用Collections API来找到一个最长的单词。我们还看到了如何使用Java Streams来找到它们全部。

一如既往，代码可以在GitHub上找到。