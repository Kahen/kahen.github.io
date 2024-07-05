---
date: 2022-04-01
category:
  - Regular Expressions
  - Java
tag:
  - regex
  - java
  - anchors
head:
  - - meta
    - name: keywords
      content: Java, Regular Expressions, z, Z, anchors, text matching
---

# Java正则表达式中的z和Z锚点对比

正则表达式是Java中用于匹配和操作文本的强大工具。它们允许我们指定模式以匹配文本中的特定字符、单词或短语。在Java中，正则表达式通过java.util.regex包得到支持。

此外，\z和\Z以及$是三个常见的正则表达式锚点，它们可以匹配字符串的结尾。

**在本教程中，我们将探讨这两种锚点的区别，它们的工作原理以及何时使用它们。**

正则表达式锚点是一个或多个字符的序列，可以指定文本中应该发生匹配的位置。

**所有\z、\Z和$都是正则表达式锚点，可以精确匹配字符串的结尾。但是，当字符串以行终止符（如换行符）结尾时，它们的行为不同。**

通常，\z锚点用于确保正则表达式匹配字符串的绝对结尾，无论它是否以行终止符结尾。**这有助于确保匹配模式之后没有更多的文本。**

另一方面，\Z用于确保正则表达式匹配字符串的结尾或行的结尾（如果字符串以行终止符结尾）。**这在我们要匹配多行字符串中每一行末尾的模式时非常有用。**

**$在功能上等同于\z，并且不考虑行终止符，匹配字符串的结尾。**

### 3.1. 使用\z的示例

**在验证信用卡号时，我们希望确保卡号之后没有额外的数字或字符。** 为了实现这一点，我们可以使用\z正则表达式。它确保模式只匹配完整的信用卡号，而不是之后可能出现的任何额外文本。

```java
@Test
public void givenCreditCardNumber_thenReturnIfMatched() {
    String creditCardNumber = "1234567890123456";
    String pattern = "\\d{16}\\z";
    Assertions.assertTrue(Pattern.compile(pattern).matcher(creditCardNumber).find());
}
```

这个方法使用\z正则表达式验证给定的信用卡号是否正好包含16位数字。

**另一方面，当解析日志文件时，我们可能希望匹配每一行末尾的模式。但我们不想包括下一行的任何文本。** 在这种情况下，我们可以使用\z正则表达式确保模式只匹配行尾的文本。即使行以行终止符结尾，\z也确保模式只匹配最后一行。

```java
@Test
public void givenLogOutput_thenReturnIfMatched() {
    String logLine = "2022-05-01 14:30:00,123 INFO Some log message";
    String pattern = ".*message\\z";
    Assertions.assertTrue(Pattern.compile(pattern).matcher(logLine).find());
}
```

这个方法定义了一个日志行。然后它检查它们是否以单词“message”结尾，紧接着是字符串的结尾\z。

### 3.2. 使用\Z的示例

**在解析电子邮件消息时，我们通常只想匹配消息正文最末尾的模式，不包括电子邮件签名中的任何文本。** 为了实现这一点，我们可以使用正则表达式中的\Z符号，它确保模式只匹配消息正文最末尾的文本。

```java
@Test
public void givenEmailMessage_thenReturnIfMatched() {
    String myMessage = "Hello HR, I hope i can write to Baeldung\n";
    String pattern = ".*Baeldung\\Z";
    Assertions.assertTrue(Pattern.compile(pattern).matcher(myMessage).find());
}
```

这个方法检查字符串消息是否以模式“Baeldung”结尾，后面是可选的空白字符，然后是字符串的结尾\Z。

**类似地，当匹配文件扩展名时，我们可能要确保正则表达式只匹配文件名最末尾的扩展名。** 再次，我们可以使用正则表达式中的\Z符号，以确保它只匹配文件名末尾的扩展名。

```java
@Test
public void givenFileExtension_thenReturnIfMatched() {
    String fileName = "image.jpeg\n";
    String pattern = ".*\\.jpeg\\Z";
    Assertions.assertTrue(Pattern.compile(pattern).matcher(fileName).find());
}
```

这段代码使用\Z正则表达式测试文件名是否以特定文件扩展名结尾。方法givenFileExtension_thenReturnIfMatched检查字符串文件名fileName是否以.jpeg结尾。

### 3.3. 使用$的示例

**在处理URL时，我们可能想要验证URL是否匹配特定的端点。** 因此，$锚点可以帮助确保模式仅在表示URL的结尾时匹配：

```java
@Test
public void givenURL_thenReturnIfMatched() {
    String url = "https://www.example.com/api/endpoint\n";
    String pattern = ".*/endpoint$";
    Assertions.assertTrue(Pattern.compile(pattern).matcher(url).find());
}
```

在这个例子中，我们使用模式来匹配“/endpoint”之前的任何字符，并确保它出现在不考虑到是否有行终止符的确切字符串的末尾。

**此外，当我们想要验证一个句子是否以正确的标点结束，例如句号、问号或感叹号时：**

```java
@Test
public void givenSentence_thenReturnIfMatched() {
    String sentence = "Hello, how are you?";
    String pattern = ".*[.?!]$";
    Assertions.assertTrue(Pattern.compile(pattern).matcher(sentence).find());
}
```

这个方法检查给定的句子是否以句号、问号或感叹号结尾。此外，前面代码中使用的模式匹配任何字符后跟一个句号、问号或感叹号，确保它出现在字符串的末尾。

## 4. 结论

总之，正则表达式锚点在Java中用于匹配文本中的模式非常有用。\z和\Z是两个匹配字符串结尾的锚点，但当字符串以行终止符结尾时，它们的行为不同。\z确保正则表达式匹配字符串的绝对结尾，而\Z匹配字符串的结尾或行的结尾。另一方面，$锚点是一个正则表达式结构，专门用于匹配字符串的结尾。

通过使用适当的锚点，我们可以确保我们的正则表达式只匹配我们想要的文本，而不是之后可能出现的任何额外文本。

**理解\z、\Z和$之间的区别将帮助我们在Java代码中编写更准确的正则表达式。**

本教程的完整源代码可在GitHub上找到。

OK