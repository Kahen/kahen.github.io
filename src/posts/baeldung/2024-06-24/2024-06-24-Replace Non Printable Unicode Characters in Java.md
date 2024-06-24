---
date: 2024-06-24
category:
  - Java
  - Unicode
tag:
  - 非打印字符
  - 正则表达式
  - 文本处理
head:
  - - meta
    - name: keywords
      content: Java, Unicode, 非打印字符, 正则表达式, 文本处理
---

# Java中替换非打印Unicode字符

## 1. 引言

非打印Unicode字符包括控制字符、样式标记和其他在文本中可见但并非用于显示的不可见符号。此外，这些字符可能会在文本处理、显示和保存时引起问题。因此，根据需要找到替换或消除这些字符的方法非常重要。

### 在本教程中，我们将探讨不同的替换方法。

## 2. 使用正则表达式

Java的_String_类有强大的文本处理功能，正则表达式提供了一种简短的方式来匹配和替换字符串中的模式。我们可以使用简单的模式来查找和更改非打印的Unicode字母，如下所示：

```java
@Test
public void givenTextWithNonPrintableChars_whenUsingRegularExpression_thenGetSanitizedText() {
    String originalText = "\n\nWelcome \n\n\nto Baeldung!\n\t";
    String expected = "Welcome to Baeldung!";
    String regex = "[\\p{C}]";
    
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(originalText);
    String sanitizedText = matcher.replaceAll("");
    
    assertEquals(expected, sanitizedText);
}
```

在这个测试方法中，正则表达式_\p{C}_代表任何控制字符（非打印Unicode字符）在给定的_originalText_中。**此外，我们使用_Pattern.compile(regex)_方法将正则表达式编译成模式，然后通过将_originalText_作为参数调用这个模式来创建一个_Matcher_对象。**

然后，我们调用_Matcher.replaceAll()_方法将所有匹配到的控制字符实例替换为空字符串，从而从源文本中消除它们。最后，我们使用_assertEquals()_方法将_sanitizedText_与_expected_字符串进行比较。

## 3. 自定义实现

我们可以采用另一种方法来遍历我们的文本中的字符，并根据它们的数值删除特殊的Unicode字符。让我们来看一个简单的例子：

```java
@Test
public void givenTextWithNonPrintableChars_whenCustomImplementation_thenGetSanitizedText() {
    String originalText = "\n\nWelcome \n\n\nto Baeldung!\n\t";
    String expected = "Welcome to Baeldung!";
    
    StringBuilder strBuilder = new StringBuilder();
    originalText.codePoints().forEach((i) -> {
        if (i >= 32 && i != 127) {
            strBuilder.append(Character.toChars(i));
        }
    });
    
    assertEquals(expected, strBuilder.toString());
}
```

在这里，我们使用_originalText.codePoints()_和一个_forEach_循环来遍历原始文本的Unicode代码。**然后，我们设置条件来消除值小于32和等于127的字符，分别代表非打印和控制字符。**

然后我们使用_strBuilder.append(Character.toChars(i))_方法将字符追加到_StringBuilder_对象中。

## 4. 结论

总之，本教程深入探讨了书面文本中非打印Unicode字符带来的挑战。探索包括了两种不同的方法，利用Java的String类中的正则表达式和实现自定义解决方案。

如常，本文的完整代码示例可以在GitHub上找到。