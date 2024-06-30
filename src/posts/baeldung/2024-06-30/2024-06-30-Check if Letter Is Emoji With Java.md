---
date: 2022-04-01
category:
  - Java
  - Emoji
tag:
  - Java
  - Emoji
  - Unicode
head:
  - - meta
    - name: keywords
      content: Java, Emoji, Unicode, UTF-16, emoji-java, Regex
---
# 如何在Java中检查字母是否为表情符号

表情符号在我们可能需要在代码中处理的文本中频繁出现。例如，这可能是在我们使用电子邮件或即时消息服务时。

在本教程中，我们将看到在Java应用程序中检测表情符号的多种方法。

## 2. Java如何表示表情符号？

每个表情符号都有一个独特的Unicode值来表示它。**Java使用UTF-16在_String_中对Unicode字符进行编码。**

UTF-16可以对所有Unicode代码点进行编码。一个代码点可能由一个或两个代码单元组成。如果需要两个，因为Unicode值超出了我们可以在16位中存储的范围，那么我们称它为代理对。

代理对简单地是由两个字符（或代码单元）组成的，当它们组合在一起时表示一个单一的Unicode字符（或代码点）。为代理对保留了一个代码单元的范围。

例如，骷髅和交叉骨表情符号的Unicode值是“U+2620”，它在_String_中存储为“\\u2620️️”。我们只需要一个代码单元。然而，熊脸表情符号有Unicode字符“U+1F43B”，它在_String_中存储为“\\uD83D\\uDC3B”。这需要两个代码单元，因为Unicode值对于一个单元来说太高了。

稍后我们将看到这方面的扩展，但这就是基础知识。

## 3. _emoji-java_ 库

一个现成的解决方案是使用_emoji-java_。要在我们的项目中使用这个库，我们需要将其导入到我们的_pom.xml_中：

```
`<dependency>`
    `<groupId>`com.vdurmont`</groupId>`
    `<artifactId>`emoji-java`</artifactId>`
    `<version>`5.1.1`</version>`
`</dependency>`
```

最新版本可在Maven仓库中找到。

使用这个库来检查一个字母是否是表情符号非常简单。**它在_EmojiManager_实用类中提供了静态的_isEmoji()_方法。**

该方法接受一个单一的_String_参数，如果_String_是表情符号，则返回_true_，否则返回_false_：

```
@Test
void givenAWord_whenUsingEmojiJava_thenDetectEmoji(){
    boolean emoji = EmojiManager.isEmoji("\uD83D\uDC3B");
    assertTrue(emoji);

    boolean notEmoji = EmojiManager.isEmoji("w");
    assertFalse(notEmoji);
}
```

我们从这个测试中可以看到，该库正确地识别了代理对作为表情符号。它还断言了单个字母“_w_”不是表情符号。

这个库有其他许多功能。因此，它是处理Java中表情符号的强有力候选者。

## 4. 使用正则表达式

正如我们前面讨论的，我们知道在Java _String_中表情符号大致是什么样子。我们也知道为代理对保留的潜在值的范围。第一个代码单元将在_U+D800_和_U+DBFF_之间，第二个代码单元将在_U+DC00_和_U+DFFF_之间。

我们可以利用这一见解来编写一个正则表达式，以检查给定的_String_是否是由代理对表示的表情符号之一。我们需要**在这里注意，并非所有代理对都是表情符号，所以这可能会给我们假阳性**：

```
@Test
void givenAWord_whenUsingRegex_thenDetectEmoji(){
    String regexPattern = "[\\uD800-\\uDBFF\\uDC00-\\uDFFF]+";
    String emojiString = "\uD83D\uDC3B";
    boolean emoji = emojiString.matches(regexPattern);
    assertTrue(emoji);

    String notEmojiString = "w";
    boolean notEmoji = notEmojiString.matches(regexPattern);
    assertFalse(notEmoji);
}
```

**然而，情况并不总是像在预期范围内进行检查那么简单。**正如我们已经看到的，一些表情符号只使用单个代码单元。此外，许多表情符号有修饰符，这些修饰符附加在Unicode的末尾，改变了表情符号的外观。我们还可以在它们之间使用零宽度连接符(ZWJ)字符来组合几个表情符号，形成更复杂的表情符号。

一个很好的例子是海盗旗表情符号，我们可以使用飘扬的黑色旗帜和骷髅与交叉骨，中间加上ZWJ来构建。考虑到这一点，很明显我们需要的正则表达式要复杂得多，以确保我们捕获所有的表情符号。

**Unicode发布了一份列出所有当前表情符号值的文档。我们可以为这个文档编写解析器，或者将范围提取到我们自己的配置文件中。**然后结果将可用于我们自己的可靠的表情符号查找器。

## 5. 结论

在本文中，我们探讨了Java如何将Unicode表情符号表示为UTF-16代理对。有一个库，_emoji-java_，我们可以在我们的代码中使用来检测它们。这个库提供了一个简单的方法来检查一个_String_是否是表情符号。

我们还可以选择使用正则表达式编写我们自己的检测代码。然而，这是复杂的，需要覆盖一个不断增长的可能值的广泛范围。要做到这一点，我们需要能够接受Unicode的更新到我们的程序中。

像往常一样，示例的完整代码可以在GitHub上找到。