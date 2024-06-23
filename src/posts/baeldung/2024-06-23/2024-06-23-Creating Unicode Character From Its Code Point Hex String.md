---
date: 2024-06-23
category:
  - Java
  - Unicode
tag:
  - Unicode
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Unicode, 编码点, 字符串
---
# 从十六进制编码点字符串创建Unicode字符 | Baeldung

Java对Unicode的支持使其能够轻松处理来自不同语言和脚本的字符。

在本教程中，我们将探索并学习如何在Java中从它们的编码点获取Unicode字符。

### 2. 问题介绍

Java的Unicode支持使我们能够快速构建国际化应用程序。让我们看几个例子：

```java
static final String U_CHECK = "✅"; // U+2705
static final String U_STRONG = "强"; // U+5F3A
```

在上面的例子中，复选标记“✅”和“强”（中文中的“Strong”）都是Unicode字符。

我们知道，如果我们的字符串遵循一个转义的‘u’和一个十六进制数字的模式，Unicode字符就可以在Java中正确表示，例如：

```java
String check = "\u2705";
assertEquals(U_CHECK, check);

String strong = "\u5F3A";
assertEquals(U_STRONG, strong);
```

在某些场景中，我们得到的是“\u”后的十六进制数字，需要获取相应的Unicode字符。例如，当我们收到数字“2705”的字符串格式时，应该产生复选标记“✅”。

我们首先想到的可能是将“\u”和数字连接起来。然而，这并不能完成工作：

```java
String check = "\u" + "2705";
assertEquals("\u2705", check);

String strong = "\u" + "5F3A";
assertEquals("\u5F3A", strong);
```

正如测试所示，将“\u”和一个数字如“2705”连接起来，会产生字面字符串“\u2705”，而不是复选标记“✅”。

接下来，让我们探索如何将给定的数字转换为Unicode字符串。

### 3. 理解“\u”后的十六进制数字

**Unicode为每个字符分配了一个唯一的编码点**，提供了一种在不同语言和脚本中通用的文本表示方式。编码点是一个数值，它在Unicode标准中唯一标识一个字符。

要在Java中创建一个Unicode字符，我们需要理解所需字符的编码点。一旦我们有了编码点，我们可以使用Java的_char_数据类型和转义序列‘\u’来表示Unicode字符。

在“\uxxxx”表示法中，“xxxx”是字符的编码点在十六进制表示中的值。例如，‘A’的十六进制ASCII码是41（十进制：65）。因此，如果我们使用Unicode表示法“\u0041”，我们可以得到字符串“A”：

```java
assertEquals("A", "\u0041");
```

那么接下来，让我们看看如何从“\u”后的十六进制数字获取所需的Unicode字符。

### 4. 使用_Character.toChars()_方法

现在我们理解了“\u”后的十六进制数字的含义。当我们收到“2705”时，它是字符编码点的十六进制表示。

如果我们得到编码点整数，**_Character.toChars(int codePoint)_方法可以给我们一个字符数组，该数组包含编码点的Unicode表示_**。最后，我们可以调用_String.valueOf()_来获取目标字符串：

```java
Given "2705"
 |_ Hex(codePoint) = 0x2705
     |_ codePoint = 9989 (decimal)
         |_ char[] chars = Character.toChars(9989)
            |_ String.valueOf(chars)
               |_"✅"

```

正如我们所看到的，要获取我们的目标字符，我们必须首先找到编码点。

**编码点整数可以通过使用_Integer.parseInt()_方法解析提供的字符串的十六进制（基数-16）来获得**。

那么接下来，让我们将所有内容整合在一起：

```java
int codePoint = Integer.parseInt("2705", 16); // Decimal int: 9989
char[] checkChar = Character.toChars(codePoint);
String check = String.valueOf(checkChar);
assertEquals(U_CHECK, check);

codePoint = Integer.parseInt("5F3A", 16); // Decimal int: 24378
char[] strongChar = Character.toChars(codePoint);
String strong = String.valueOf(strongChar);
assertEquals(U_STRONG, strong);
```

值得注意的是，**如果我们使用Java 11或更高版本，我们可以直接使用_Character.toString()_方法从编码点整数获取字符串**，例如：

```java
// For Java 11 and later versions:
assertEquals(U_STRONG, Character.toString(codePoint));
```

当然，我们可以将上面的实现包装在一个方法中：

```java
String stringFromCodePointHex(String codePointHex) {
    int codePoint = Integer.parseInt(codePointHex, 16);
    // For Java 11 and later versions: return Character.toString(codePoint)
    char[] chars = Character.toChars(codePoint);
    return String.valueOf(chars);
}
```

最后，让我们测试该方法以确保它产生预期的结果：

```java
assertEquals("A", stringFromCodePointHex("0041"));
assertEquals(U_CHECK, stringFromCodePointHex("2705"));
assertEquals(U_STRONG, stringFromCodePointHex("5F3A"));
```

### 5. 结论

在本文中，我们首先学习了“\uxxxx”表示法中“xxxx”的重要性，然后探讨了如何从给定的编码点的十六进制表示中获取目标Unicode字符串。

如往常一样，示例的完整源代码可在GitHub上找到。