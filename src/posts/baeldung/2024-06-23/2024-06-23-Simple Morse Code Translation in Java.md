---
date: 2024-06-24
category:
  - Java
  - Morse Code
tag:
  - Morse Code
  - Translation
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Morse Code, Translation
---

# 简单的摩斯电码翻译在Java中 | Baeldung

## 1. 概述

摩斯电码使用点和划的序列来表示字母、数字和标点符号。Samuel Morse 和 Alfred Vail 在 19 世纪 30 年代初为电报使用而开发了它。

在本教程中，我们将编写一个方法，将英文翻译成摩斯电码。然后，我们将编写一个相反的方法。

## 2. 编写摩斯电码

让我们了解摩斯电码及其字母表。

### 2.1. 什么是摩斯电码？

**在摩斯电码中，每个字母由独特的短信号（点）和长信号（划）组合表示**，允许通过一系列开关信号进行通信。根据常见用法，我们将用“ _._”表示点，用“ _–_”表示划。这两个字符足以写出整个摩斯字母表。

然而，我们需要更多的东西来写句子。由于摩斯电码确实针对非书面通信，流程对于解密摩斯电报至关重要。因此，负责传输摩斯电报的操作员会在每个字母之间留下短暂的停顿。此外，他会在每个单词之间留下更长的停顿。因此，不考虑到这些停顿的表示将无法解码。

一个常见的选择是使用空格“ ”来表示每个单词之间的停顿。我们还将使用“ _/_”来编码两个单词之间的空格字符。由于斜杠也是一个字符，空格将像其他字符一样包围它。

### 2.2. 英文和摩斯电码之间的双向映射

**为了能够轻松地从英文翻译到摩斯电码，反之亦然，我们希望在两种字母表之间有一个双向映射。** 因此，我们将使用 Apache Commons Collection 的 _BidiMap_ 数据结构。这是一个允许通过键或值访问的 _Map_。这样，我们将使用它进行两种翻译方法。然而，如果我们只对单向翻译感兴趣，我们可以直接使用一个 _Map_。

首先，让我们在 _pom.xml_ 中包含库的最新版本：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-collections4`</artifactId>`
    `<version>`4.4`</version>`
`</dependency>`
```

现在我们可以创建我们的映射并在静态块中初始化它：

```java
public class MorseTranslator {

    private static final BidiMap`<String, String>` morseAlphabet = new DualHashBidiMap<>();

    static {
        morseAlphabet.put("A", ".-");
        morseAlphabet.put("B", "-...");
        morseAlphabet.put("C", "-.-.");
        morseAlphabet.put("D", "-..");
        morseAlphabet.put("E", ".");
        morseAlphabet.put("F", "..-.");
        morseAlphabet.put("G", "--.");
        morseAlphabet.put("H", "....");
        morseAlphabet.put("I", "..");
        // 等等
        morseAlphabet.put(" ", "/");
    }

}
```

让我们注意我们添加了空白字符的翻译。此外，我们限制自己只使用字母、数字和标点符号。如果我们也想使用带重音的字符，我们需要使用另一个数据结构或做出选择，因为许多带重音的字符可以匹配相同的摩斯电码。例如，“ _à_”和“ _å_”在摩斯电码中都对应“ _.–.-_”。

## 3. 将英文翻译成摩斯电码

首先，让我们编写一个方法将英文句子翻译成摩斯电码。

### 3.1. 通用算法

我们的 _BidiMap_ 只包含大写字母，因为大写不会改变翻译。因此，我们将从将单词大写开始。然后，**我们将逐个迭代字母并逐个翻译它们**：

```java
static String englishToMorse(String english) {
    String upperCaseEnglish = english.toUpperCase();
    String[] morse = new String[upperCaseEnglish.length()];
    for (int index = 0; index `< upperCaseEnglish.length(); index++) {
        String morseCharacter = morseAlphabet.get(String.valueOf(upperCaseEnglish.charAt(index)));
        morse[index] = morseCharacter;
    }
    return String.join(" ", morse);
}
```

将翻译存储在一个摩斯 _String_ 数组中是方便的。这个中间数组有与输入字符数一样多的值。最后，我们使用 _String.join()_ 方法将所有条目连接起来，使用空格作为分隔符。

我们现在可以测试我们的方法。由于我们想检查大写字母不重要，我们将编写一个参数化测试，使用各种输入期望相同的输出：

```java
@ParameterizedTest
@ValueSource(strings = {"MORSE CODE!", "morse code!", "mOrSe cOdE!"})
void givenAValidEnglishWordWhateverTheCapitalization_whenEnglishToMorse_thenTranslatedToMorse(String english) {
    assertEquals("-- --- .-. ... . / -.-. --- -.. . -.-.-----.", MorseTranslator.englishToMorse(english));
}
```

此外，我们可以注意到两个单词之间的空格翻译为“ _/_ ”，正如预期的那样。

### 3.2. 边缘情况

目前，我们的程序没有考虑到可能的格式错误的输入。然而，**我们希望拒绝包含无效字符的句子。** 在这种情况下，我们将抛出一个 _IllegalArgumentException_：

```java
String morseCharacter = morseAlphabet.get(String.valueOf(upperCaseEnglish.charAt(index)));
if (morseCharacter == null) {
    throw new IllegalArgumentException("Character " + upperCaseEnglish.charAt(index) + " can't be translated to morse");
}
morse[index] = morseCharacter;
```

修改非常直接，因为如果一个字符是无效的，它就不会作为双向映射的键存在。因此，_get()_ 方法返回 _null_。我们也可以在我们的方法顶部添加一个 _null_ 安全检查。简而言之，我们的最终方法如下：

```java
static String englishToMorse(String english) {
    if (english == null) {
        return null;
    }
    String upperCaseEnglish = english.toUpperCase();
    String[] morse = new String[upperCaseEnglish.length()];
    for (int index = 0; index < upperCaseEnglish.length(); index++) {
        String morseCharacter = morseAlphabet.get(String.valueOf(upperCaseEnglish.charAt(index)));
        if (morseCharacter == null) {
            throw new IllegalArgumentException("Character " + upperCaseEnglish.charAt(index) + " can't be translated to morse");
        }
        morse[index] = morseCharacter;
    }
    return String.join(" ", morse);
}
```

最后，我们可以添加一个不可翻译句子的单元测试：

```java
@Test
void givenAnEnglishWordWithAnIllegalCharacter_whenEnglishToMorse_thenThrows() {
    String english = "~This sentence starts with an illegal character";
    assertThrows(IllegalArgumentException.class, () ->` MorseTranslator.englishToMorse(english));
}
```

## 4. 将摩斯电码翻译成英文

现在让我们写一个反向方法。再次强调，我们将在深入边缘情况之前关注大局。

### 4.1. 通用算法

概念相同：**对于每个摩斯电码字符，我们在 _BidiMap_ 中找到英文翻译。** _getKey()_ 方法允许我们这样做。然后，我们需要迭代每个摩斯电码字符：

```java
static String morseToEnglish(String morse) {
    String[] morseUnitCharacters = morse.split(" ");
    StringBuilder stringBuilder = new StringBuilder();
    for (int index = 0; index < morseUnitCharacters.length; index++) {
        String englishCharacter = morseAlphabet.getKey(morseUnitCharacters[index]);
        stringBuilder.append(englishCharacter);
    }
    return stringBuilder.toString();
}
```

我们通过 _String.split()_ 方法隔离了每个摩斯电码字符。将每个英文翻译附加到 _StringBuilder_ 是连接结果的最有效方式。

现在让我们验证我们的方法是否返回正确的结果：

```java
@Test
void givenAValidMorseWord_whenMorseToEnglish_thenTranslatedToUpperCaseEnglish() {
    assertEquals("MORSE CODE!", MorseTranslator.morseToEnglish("-- --- .-. ... . / -.-. --- -.. . -.-.-----."));
}
```

最后，我们可以回忆一下，输出将始终是大写字母。

### 4.2. 边缘情况

此外，**我们希望拒绝包含无效摩斯电码字符的输入。** 就像 _englishToMorse()_ 中一样，我们将在这种情况下抛出一个 _IllegalArgumentException_。此外，我们还可以处理 _null_ 输入的特殊情况。在这里，我们还必须单独处理空输入，因为 _split()_ 方法的内部功能。

总而言之，让我们写下我们的最终方法：

```java
static