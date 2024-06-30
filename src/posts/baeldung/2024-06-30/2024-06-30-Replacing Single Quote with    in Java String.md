---
date: 2022-04-01
category:
  - Java
  - String Manipulation
tag:
  - Java
  - String
  - replace
  - escape
head:
  - - meta
    - name: keywords
      content: Java, String, replace, escape
---
# 在Java字符串中替换单引号

在Java中，单引号用于定义字符字面量，而双引号用于定义字符串字面量。我们也可以在字符串字面量中使用单引号。在本教程中，我们将学习如何在Java字符串中替换单引号。

## 2. 如何在Java中转义特殊字符？

字符串是字符序列，这些字符可以是字母、数字、标点符号等。在创建字符串时，它必须用双引号括起来，但如果我们需要创建一个本身包含单引号的字符串，我们应该怎么做呢？Java会误解字符串并抛出错误，因为单引号被解释为特殊字符。

为了解决这个问题，我们可以简单地使用转义字符，例如特殊的反斜杠\字符，它将特殊字符转换为字符串字符。

例如，假设我们想要将字符串中的单引号替换为\'。

## 3. 使用String.replace()

让我们使用String.replace(CharSequence target, CharSequence replacement)方法来进行字符串替换。这个方法替换所有目标字符序列为替换字符序列。

让我们看看如何使用String.replace()方法来替换Java字符串中的单引号：

```java
String ORIGINAL_STRING = "This is 'Baeldung' tutorial.";
String EXPECTED_STRING = "This is \\'Baeldung\\' tutorial.";

@Test
public void givenString_thenReplaceUsinReplaceMethod() {
    String modifiedString = ORIGINAL_STRING.replace("'", "\\'");
    assertEquals(EXPECTED_STRING, modifiedString);
}
```

在上面的例子中，我们在String.replace()方法中使用了\'作为替换参数。第一个反斜杠转义了第二个，与单引号一起形成了转义序列\'。通过这种简单的方式，我们用\'替换了所需字符串中的单引号。

## 4. 使用String.replaceAll()

String.replaceAll(String regex, String replacement)方法与String.replace(CharSequence target, CharSequence replacement)相似。它们之间的主要区别在于它们处理要替换的子字符串的方式。此外，replace()使用纯文本并替换文字出现，而replaceAll()使用正则表达式。

为了演示，我们将使用与前一节相同的示例：

```java
@Test
public void givenString_thenReplaceUsinReplaceAllMethod() {
    String modifiedString = ORIGINAL_STRING.replaceAll("'", "\\\\'");
    assertEquals(EXPECTED_STRING, modifiedString);
}
```

在上面的例子中，我们在String.replaceAll()方法中使用了\\\\'作为替换参数。前两个反斜杠用于在正则表达式中正确转义反斜杠字符，然后\\\\'表示转义的单引号字符\'。

记住，Java中的字符串是不可变的，这意味着replace()或replaceAll()方法不会修改原始字符串，而是返回一个新的修改后的字符串。因此，请确保将方法调用的结果分配给一个新变量。

## 5. 结论

在这篇短文中，我们学习了如何在Java字符串中替换单引号。源代码可在GitHub上找到。