---
date: 2022-04-24
category:
  - Java
  - Regular Expressions
tag:
  - camel case
  - title case
  - java
head:
  - - meta
    - name: keywords
      content: Java, Camel Case, Title Case, Regular Expressions
---
# 在Java中将驼峰式和标题式转换为单词

字符串通常包含单词和其他分隔符的混合。有时，这些字符串可能会在没有空格的情况下通过大小写变化来分隔单词。例如，**驼峰式在第一个单词之后每个单词的首字母大写**，而标题式（或帕斯卡式）每个单词的首字母都大写。

我们可能希望将这些字符串解析回单词以便处理它们。

在这个简短的教程中，我们将探讨如何使用正则表达式在混合大小写字符串中找到单词，以及如何将它们转换为句子或标题。

### 2. 解析大写字符串的用例

处理驼峰式字符串的一个常见用例可能是文档中的字段名称。假设一个文档有一个字段“_firstName_”——我们可能希望在屏幕上显示为“First name”或“First Name”。

同样，如果我们通过反射扫描应用程序中的类型或函数，以便使用它们的名称生成报告，我们通常会发现我们可能希望转换的驼峰式或标题式标识符。

解析这些表达式时我们需要解决的一个额外问题是**单字母单词导致连续大写字母**。

为了清晰起见：
- _thisIsAnExampleOfCamelCase_
- _ThisIsTitleCase_
- _thisHasASingleLetterWord_

现在我们知道了我们需要解析的标识符类型，让我们使用正则表达式来找到单词。

### 3. 使用正则表达式查找单词

#### 3.1. 定义一个正则表达式来查找单词
让我们定义一个正则表达式来定位由小写字母组成、后面跟着小写字母的单个大写字母，或者单独的单个大写字母的单词：

```
Pattern WORD_FINDER = Pattern.compile("(([A-Z]?[a-z]+)|([A-Z]))");
```

这个表达式为正则表达式引擎提供了两个选项。第一个使用_“[A-Z]?”_表示“一个可选的第一个大写字母”，然后是_“[a-z]+”_表示“一个或多个小写字母”。之后是_“|”_字符提供_或_逻辑，后面是表达式_“[A-Z]”_，意思是“一个单独的大写字母”。

现在我们有了正则表达式，让我们解析我们的字符串。

#### 3.2. 在字符串中查找单词
我们将定义一个使用这个正则表达式的方法：

```
public List````<String>```` findWordsInMixedCase(String text) {
    Matcher matcher = WORD_FINDER.matcher(text);
    List````<String>```` words = new ArrayList<>();
    while (matcher.find()) {
        words.add(matcher.group(0));
    }
    return words;
}
```

这使用由正则表达式的_Pattern_创建的_Matcher_来帮助我们找到单词。**我们在matcher仍然有匹配项时迭代它**，将它们添加到我们的列表中。

这应该提取符合我们单词定义的任何内容。让我们测试一下。

#### 3.3. 测试单词查找器
我们的单词查找器应该能够找到由任何非单词字符以及大小写变化分隔的单词。让我们从一个简单的例子开始：

```
assertThat(findWordsInMixedCase("some words"))
  .containsExactly("some", "words");
```

这个测试通过并显示我们的算法是工作的。接下来，我们试试驼峰式：

```
assertThat(findWordsInMixedCase("thisIsCamelCaseText"))
  .containsExactly("this", "Is", "Camel", "Case", "Text");
```

这里我们看到，单词从驼峰式字符串中提取出来，并且它们的大写保持不变。例如，_“Is”_在原始文本中以大写字母开始，在提取时也大写了。

我们也可以尝试标题式：

```
assertThat(findWordsInMixedCase("ThisIsTitleCaseText"))
  .containsExactly("This", "Is", "Title", "Case", "Text");
```

另外，我们可以检查单字母单词是否按我们的意图被提取：

```
assertThat(findWordsInMixedCase("thisHasASingleLetterWord"))
  .containsExactly("this", "Has", "A", "Single", "Letter", "Word");
```

到目前为止，我们已经构建了一个单词提取器，但这些单词的大写方式可能不是输出的理想方式。

### 4. 将单词列表转换为人类可读格式

提取单词列表后，我们可能想要使用诸如_toUpperCase_或_toLowerCase_之类的方法来规范化它们。然后我们可以使用_String.join_将它们重新连接成一个带有分隔符的单个字符串。让我们看看如何用这些实现现实世界用例的几种方法。

#### 4.1. 转换为句子
**句子以大写字母开始并以句号结束**——“。”。我们将需要能够使一个单词以大写字母开始：

```
private String capitalizeFirst(String word) {
    return word.substring(0, 1).toUpperCase()
      + word.substring(1).toLowerCase();
}
```

然后我们可以遍历单词，将第一个单词大写，其余的变为小写：

```
public String sentenceCase(List````<String>```` words) {
    List````<String>```` capitalized = new ArrayList<>();
    for (int i = 0; i < words.size(); i++) {
        String currentWord = words.get(i);
        if (i == 0) {
            capitalized.add(capitalizeFirst(currentWord));
        } else {
            capitalized.add(currentWord.toLowerCase());
        }
    }
    return String.join(" ", capitalized) + ".";
}
```

这里的逻辑是第一个单词的首字符大写，其余的都是小写。我们用空格作为分隔符将它们连接起来，并在最后加上一个句号。

让我们测试一下：

```
assertThat(sentenceCase(Arrays.asList("these", "Words", "Form", "A", "Sentence")))
  .isEqualTo("These words form a sentence.");
```

#### 4.2. 转换为标题式
标题式的规则比句子稍微复杂一些。**每个单词都必须有一个大写字母，除非它是一个通常不大写的特殊停用词**。然而，整个标题必须以大写字母开始。

我们可以通过定义我们的停用词来实现这一点：

```
Set````<String>```` STOP_WORDS = Stream.of("a", "an", "the", "and",
  "but", "for", "at", "by", "to", "or")
  .collect(Collectors.toSet());
```

在此之后，我们可以修改我们的循环中的_if_语句，将任何不是停用词的单词以及第一个单词大写：

```
if (i == 0 ||
  !STOP_WORDS.contains(currentWord.toLowerCase())) {
    capitalized.add(capitalizeFirst(currentWord));
 }
```

组合单词的算法是相同的，尽管我们在最后不加上句号。

让我们测试一下：

```
assertThat(capitalizeMyTitle(Arrays.asList("title", "words", "capitalize")))
  .isEqualTo("Title Words Capitalize");

assertThat(capitalizeMyTitle(Arrays.asList("a", "stop", "word", "first")))
  .isEqualTo("A Stop Word First");
```

### 5. 结论

在这篇短文中，我们探讨了如何使用正则表达式在_String_中找到单词。我们看到了如何定义这个正则表达式来使用大写作为单词边界找到不同的单词。

我们还看了一些简单的算法，用于将单词列表转换为句子或标题的正确大写形式。

像往常一样，示例代码可以在GitHub上找到。