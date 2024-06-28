---
date: 2022-04-01
category:
  - Java
  - Text Processing
tag:
  - String
  - StringBuilder
  - StringUtils
head:
  - - meta
    - name: keywords
      content: Java, text centering, String.format, StringBuilder, StringUtils
---
# Java中文本居中输出的不同方法

在基于Java的文本应用程序中，经常需要对文本进行居中对齐。此外，在为Xbox开发应用程序、命令行工具或任何涉及改善文本视觉表现的应用程序时，居中文本可以提升用户体验。

**在本教程中，我们将深入探讨Java中文本输出居中对齐的不同方法。**

## 2. 使用String格式化

Java中居中文本的最快方式可以通过使用String类的format()方法提供。让我们看以下示例：

```java
@Test
public void givenTextAndTotalWidth_whenUsingStringFormat_thenTextIsCentered() {
    String text = "Centered Text";
    int totalWidth = 15;
    int padding = (totalWidth - text.length()) / 2;
    String centeredText = String.format("%" + padding + "s%s%" + padding + "s", "", text, "");
    Assert.assertEquals(" Centered Text ", centeredText);
}
```

在这个测试方法中，我们希望在总共20个字符的宽度内显示“Centered Text”。因此，我们计算出两边需要多少空格。然后，我们使用String.format()方法填充所需数量的字符串，这些字符串的长度等于空格数。

## 3. 使用StringBuilder

另一种居中构建文本的方式是通过StringBuilder。它允许更多的对齐调整，因此更加灵活。让我们看以下示例：

```java
@Test
public void givenTextAndTotalWidth_whenCenterUsingStringBuilder_thenTextIsCentered() {
    String text = "Centered Text";
    int width = 15;
    int padding = (width - text.length()) / 2;
    StringBuilder centeredText = new StringBuilder();
    for (int i = 0; i < padding; i++) {
        centeredText.append(" ");
    }
    centeredText.append(text);
    for (int i = 0; i < padding; i++) {
        centeredText.append(" ");
    }
    String centeredTextString = centeredText.toString();
    assertEquals(" Centered Text ", centeredTextString);
}
```

在上面的测试方法中，我们创建了一个StringBuilder，用空格填充它来添加所需的填充空间，并追加我们的主要内容。然后，在打印居中文本之前再次填充以添加其余的填充空间。

## 4. 使用StringUtils

一个更简单的居中文本的方式是使用Apache Commons Lang中的StringUtils类的center()方法，它专门为这个目的而创建。让我们实践以下示例：

```java
@Test
public void givenTextAndTotalWidth_whenUsingStringUtilsCenterMethod_thenTextIsCentered() {
    String text = "Centered Text";
    int width = 15;
    String centeredText = StringUtils.center(text, width);
    assertEquals(" Centered Text ", centeredText);
}
```

在上面的测试方法中，我们使用StringUtils类的center()方法，它接受文本字符串及其总宽度。然后，它在指定的宽度内居中文本。

## 5. 结论

**总之，我们可以说Java中有多种居中文本输出的方法，如String格式化、StringBuilder和Apache Commons Lang库中的StringUtils。**

此外，这些方法增强了基于Java的文本应用程序的美观性，用户发现它们更容易交互。

如常，本文的完整代码示例可以在GitHub上找到。