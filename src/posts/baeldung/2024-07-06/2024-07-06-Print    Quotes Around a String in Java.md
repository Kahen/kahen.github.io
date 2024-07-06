---
date: 2022-04-01
category:
  - Java
  - 字符串处理
tag:
  - Java
  - 字符串
  - 引号
head:
  - - meta
    - name: keywords
      content: Java, 字符串, 引号, 打印, 格式化
---

# 在Java中打印带引号的字符串

## 1. 概述

“Hello World!”可能是我们开始学习Java时看到的第一个Java示例。我们知道，如果我们将一个字符串对象传递给System.out.println()方法，Java就会在控制台输出该字符串。

然而，有时我们希望输出的字符串被引号包围（“...”）。在这个快速教程中，我们将探讨如何实现这一点。

## 2. 使用两个转义引号字符串包装

如果我们想要将字符串用引号（“...”）包裹，最直接的想法可能是将引号连接到给定文本的开头和结尾。

在Java中，当我们使用字符串值时，我们必须使用引号，例如System.out.println("Hello World!")。然而，我们不能像“”这样在字符串中放置引号字符。Java不接受它。因此，在这种情况下，**我们必须在字符串中转义引号符号：\"\\\"\"**。

接下来，让我们用一个输入示例来尝试：

```
String theySay = "All Java programmers are cute!";
String quoted = "\"" + theySay + "\"";

System.out.print(quoted);
```

当我们运行上述程序时，我们可以看到带有引号的输出：

```
"All Java programmers are cute!"
```

## 3. 在单元测试中验证输出

通常，我们构建单元测试来验证一个方法是否按预期工作。然而，这个案例有点特别，因为我们需要验证我们打印到控制台的输出。为了验证输出，我们可以将System.out替换为另一个使用ByteArrayOutputStream作为OutputStream的PrintStream对象：

```
final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
final PrintStream originalOut = System.out;

@BeforeEach
void replaceOut() {
    System.setOut(new PrintStream(outContent));
}

@AfterEach
void restoreOut() {
    System.setOut(originalOut);
}
```

@BeforeEach和@AfterEach是JUnit 5的两个注解。这些注解的方法将在每个测试方法执行之前和之后被调用。

现在，如果我们将原始的输出代码放入一个测试方法中，我们可以验证打印的输出：

```
String theySay = "All Java programmers are cute!";
String quoted = "\"" + theySay + "\"";

System.out.println(quoted);

//断言
String expected = "\"All Java programmers are cute!\"";
assertEquals(expected, outContent.toString());
```

如果我们运行测试，它将通过。因此，为了简单起见，在后续的例子中，我们将使用单元测试断言来验证由System.out.println()打印的输出。

## 4. 使用replaceAll()方法

标准的String.replaceAll()方法可以通过正则表达式执行字符串替换操作。我们已经通过在输入字符串的开头和结尾连接引号来解决了问题。

按照相同的思路，我们可以使用replaceAll()方法来实现：

```
String theyAsk = "Can you write Java code?";
String quoted = theyAsk.replaceAll("^|$", "\"");

System.out.println(quoted);

//断言
String expected = "\"Can you write Java code?\"";
assertEquals(expected, outContent.toString());
```

上述示例显示**正则表达式“^|$”匹配输入字符串的开头和结尾**。因此，replaceAll()方法用引号替换匹配项。

## 5. 使用两个引号字符包装

到目前为止，我们已经学习了两种打印带引号的字符串的方法。两种方法都像“\"”一样在字符串中转义引号字符。它正确地完成了工作。然而，**使用转义字符可能会使代码更难阅读和理解。**

为了避免**转义引号字符，我们可以使用char而不是字符串**：

```
String weSay = "Yes, we can write beautiful Java codes!";
String quoted = '"' + weSay + '"';

System.out.println(quoted);

//断言
String expected = "\"Yes, we can write beautiful Java codes!\"";
assertEquals(expected, outContent.toString());
```

如果我们运行测试，它会通过。如上所示的测试，我们在两个char和一个String上执行加法操作：'"' + weSay + '"'。这是因为**Java自动将char转换为String，然后与字符串weSay连接**。因此，不需要转义。

## 6. 结论

在这篇文章中，我们探讨了三种不同的打印带引号(“”)的字符串的方法：

- “\"” + input + “\"” - 在输入字符串的开头和结尾添加转义引号字符串(“\"”)
- input.replaceAll(“^|$”, “\"”) - 使用基于正则表达式的replaceAll()方法
- '"“ + input + '"“ - 与第一种解决方案类似，但使用char代替String以避免转义

除此之外，我们还学习了如何在单元测试中验证由System.out.println()写入的输出。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。

OK