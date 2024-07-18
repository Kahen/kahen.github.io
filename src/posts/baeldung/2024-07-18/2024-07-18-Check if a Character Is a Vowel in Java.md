---
date: 2022-04-01
category:
  - Java
tag:
  - Character
  - Vowel
head:
  - - meta
    - name: keywords
      content: Java, Character, Vowel
------
# 在Java中检查字符是否为元音

1. 概述
当处理来自字符串的字符时，我们可能希望根据它们是否属于特定组来对它们进行分类。例如，英文字母表中的字符要么是元音，要么是辅音。
在本教程中，我们将探讨几种检查字符是否为元音的方法。我们可以轻松地将这些方法扩展到其他字符组。

2. 使用_indexOf_方法检查元音
正如我们所知，所有的元音字母，我们可以将它们（包括大小写）添加到一个字符串中：
```java
String VOWELS = "aeiouAEIOU";
```
**我们可以使用字符串类中的_indexOf_方法来查看字符是否存在**：
```java
boolean isInVowelsString(char c) {
    return VOWELS.indexOf(c) != -1;
}
```
如果字符存在，则索引不会是-1。如果是-1，则字符不在元音字母集中。让我们测试一下：
```java
assertThat(isInVowelsString('e')).isTrue();
assertThat(isInVowelsString('z')).isFalse();
```
在这里，我们使用的是Java中的字符。如果我们的字符是一个单字符字符串对象，我们可以使用不同的实现：
```java
boolean isInVowelsString(String c) {
    return VOWELS.contains(c);
}
```
它将通过相同的测试：
```java
assertThat(isInVowelsString("e")).isTrue();
assertThat(isInVowelsString("z")).isFalse();
```
正如我们所看到的，这种方法有一些实现开销。然而，我们必须遍历元音字符串中的10个可能的元音字母，以确定某物是否在该组中。

3. 使用_switch_检查元音
我们可以使用_switch_语句，每个元音字母是一个单独的_case_：
```java
boolean isVowelBySwitch(char c) {
    switch (c) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U':
            return true;
        default:
            return false;
    }
}
```
我们也可以测试这个：
```java
assertThat(isVowelBySwitch('e')).isTrue();
assertThat(isVowelBySwitch('z')).isFalse();
```
由于Java支持在_switch_语句中使用字符串，我们也可以使用单字符字符串来实现这个。

4. 使用正则表达式检查元音
虽然我们可以实现我们自己的字符串匹配算法，但**Java正则表达式引擎允许我们强大地匹配字符串**。
让我们构建一个正则表达式来识别元音：
```java
Pattern VOWELS_PATTERN = Pattern.compile("[aeiou]", Pattern.CASE_INSENSITIVE);
```
_\[ \]_ 用于表示字符类。我们只将元音字母以小写形式放入这个类中，因为我们可以用不区分大小写的方式匹配它们。
让我们实现我们的匹配算法，用于单字符字符串对象：
```java
boolean isVowelByRegex(String c) {
    return VOWELS_PATTERN.matcher(c).matches();
}
```
让我们测试一下：
```java
assertThat(isVowelByRegex("e")).isTrue();
assertThat(isVowelByRegex("E")).isTrue();
```
正如我们所看到的，正则表达式是不区分大小写的。
我们应该注意到，这需要输入是一个字符串，而不是字符。尽管**我们可以使用字符类的_toString_方法将字符转换为字符串**：
```java
assertThat(isVowelByRegex(Character.toString('e'))).isTrue();
```

使用正则表达式使处理这个问题的一般情况变得简单。我们可以指定任何字符组使用字符类，包括字符范围。

5. 我们应该使用哪种解决方案？
基于字符串的解决方案可能是最容易理解的，并且表现相当不错，因为它只需要为它分类的每个字符检查最多10个选项。
然而，我们通常会期望_switch_语句比字符串查找执行得更快。
正则表达式解决方案应该表现非常好，因为正则表达式在_Pattern_的_compile_方法期间进行了优化。然而，正则表达式可能更复杂，实施起来可能不值得用于像检测元音这样简单的事情。同样，如果我们正在处理字符值，那么正则表达式需要一些转换，而其他方法则不需要。

然而，**使用正则表达式允许我们实现复杂的表达式来分类字符**。

6. 结论
在本文中，我们已经看到了几种不同的方式来识别字符是否为元音。我们看到了如何使用包含所有元音字母的字符串以及如何实现_switch_语句。
最后，我们看到了如何使用正则表达式来解决这个问题以及更一般的情况。
如往常一样，本教程的完整代码可以在GitHub上找到。