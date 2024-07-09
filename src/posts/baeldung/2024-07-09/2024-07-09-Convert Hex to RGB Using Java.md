---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - 十六进制
  - RGB
head:
  - - meta
    - name: keywords
      content: Java, 十六进制转RGB, 颜色代码, 编程
---

# Java中将十六进制转换为RGB

十六进制（hex）和RGB（红-绿-蓝）是图形和设计中常见的颜色代码。有时，将十六进制转换为其等效的RGB值可能是必要的，因为它在许多数字应用中被广泛使用。

在本教程中，我们将学习如何在Java中将十六进制颜色代码转换为其等效的RGB值。

## 2. 十六进制颜色代码和RGB

十六进制颜色代码由六个字符串字符组成。**每个字符代表十六进制表示法中的一个值，范围在0到15之间（0-9和A-F）**。

例如，深藏红花的十六进制颜色代码是_FF9933_。

RGB是红色、绿色和蓝色的组合。**它每个使用8位，并具有介于0和255之间的整数值**。

深藏红的RGB值是“_255, 153, 51_”。

要将十六进制颜色代码转换为其RGB等效值，**重要的是要知道每对十六进制颜色代码表示红色、绿色和蓝色颜色部分之一**。前两个字符代表红色部分，第二个两个代表绿色部分，最后两个代表蓝色部分。

此外，十六进制颜色代码基于16进制，而RGB颜色值基于10进制。必须将十六进制颜色代码转换为十进制，以获得RGB颜色的最终表示。

## 3. 将十六进制转换为RGB

首先，让我们将一个十六进制颜色代码转换为其RGB等效值：

```java
@Test
void givenHexCode_whenConvertedToRgb_thenCorrectRgbValuesAreReturned() {
    String hexCode = "FF9933";
    int red = 255;
    int green = 153;
    int blue = 51;

    int resultRed = Integer.valueOf(hexCode.substring(0, 2), 16);
    int resultGreen = Integer.valueOf(hexCode.substring(2, 4), 16);
    int resultBlue = Integer.valueOf(hexCode.substring(4, 6), 16);

    assertEquals(red, resultRed);
    assertEquals(green, resultGreen);
    assertEquals(blue, resultBlue);
}
```

在这个例子中，我们声明了一个_string_类型的变量_hexCode_。该变量保存了一个十六进制颜色代码。我们将十六进制代码分割为其红色、绿色和蓝色组件。

此外，我们通过获取十六进制颜色代码的子字符串来提取组件。为了将红色、绿色和蓝色的十六进制值转换为它们的十进制值，我们调用了_Integer.valueOf()_方法。_Integer.valueOf()_允许我们解析一个数字的_string_表示，以指定的基数。在示例中的指定基数是16。

最后，我们确认提取的RGB等效值是我们预期的结果。

## 4. 结论

在本文中，我们学习了一种简单的方法，将十六进制颜色代码转换为其RGB等效值。我们使用了_Integer.valueOf()_将十六进制值转换为其等效的十进制值。

如常，示例的完整源代码可以在GitHub上找到。

OK