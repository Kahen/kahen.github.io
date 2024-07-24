---
date: 2022-04-01
category:
  - Java
  - HexFormat
tag:
  - Java 17
  - Hexadecimal
head:
  - - meta
    - name: keywords
      content: Java 17, HexFormat, Hexadecimal, Java 17 HexFormat
---
# Java 17中HexFormat的介绍

在Java中，我们通常编写自己的方法来处理字节和十六进制字符串之间的转换。然而，Java 17引入了`java.util.HexFormat`，这是一个实用工具类，它**可以转换原始类型、字节数组或字符数组到十六进制字符串，反之亦然**。

在本教程中，我们将探索如何使用`HexFormat`并演示它提供的功能。

## 2. Java 17之前处理十六进制字符串

十六进制编号系统使用16作为基数来表示数字。这意味着它由16个符号组成，通常使用0-9的符号表示0到9的值，使用A-F的符号表示10到15的值。

这是表示长二进制值的流行选择，因为它比二进制字符串的1和0更容易理解。

当我们需要在十六进制字符串和字节数组之间进行转换时，开发人员通常使用`String.format()`编写自己的方法来完成这项工作。

这是一个简单且易于理解的实现，但往往效率不高：

```
public static String byteArrayToHex(byte[] a) {
    StringBuilder sb = new StringBuilder(a.length * 2);
    for (byte b: a) {
       sb.append(String.format("%02x", b));
    }
    return sb.toString();
}
```

另一个流行的解决方案是使用Apache Commons Codec库，它包含一个`Hex`实用工具类：

```
String foo = "I am a string";
byte[] bytes = foo.getBytes();
Hex.encodeHexString(bytes);
```

我们的另一个教程解释了手动执行此转换的不同方法。

## 3. Java 17中`HexFormat`的使用

`HexFormat`可以在Java 17标准库中找到，并且可以**处理字节和十六进制字符串之间的转换**。它还支持几种格式化选项。

### 3.1. 创建`HexFormat`

我们如何创建一个新的`HexFormat`实例**取决于我们是否需要分隔符支持**。`HexFormat`是线程安全的，所以一个实例可以在多个线程中使用。

`HexFormat.of()`是我们使用最普遍的情况，当我们不需要分隔符支持时使用：

```
HexFormat hexFormat = HexFormat.of();
```

`HexFormat.ofDelimiter(":")`可以用于分隔符支持，此示例使用冒号作为分隔符：

```
HexFormat hexFormat = HexFormat.ofDelimiter(":");
```

### 3.2. 字符串格式化

`HexFormat`允许我们**向现有的`HexFormat`对象添加前缀、后缀和分隔符格式化选项**。我们可以使用这些来控制正在解析或生成的`String`的格式。

以下是将这三个一起使用的示例：

```
HexFormat hexFormat = HexFormat.of().withPrefix("[").withSuffix("]").withDelimiter(", ");
assertEquals("[48], [0c], [11]", hexFormat.formatHex(new byte[] {72, 12, 17}));
```

在这种情况下，我们使用简单的`of()`方法创建对象，然后使用`withDelimiter()`添加分隔符。

### 3.3. 字节和十六进制字符串的转换

现在我们已经看到了如何创建一个`HexFormat`实例，让我们来讨论一下如何执行转换。

我们将使用创建实例的简单方法：

```
HexFormat hexFormat = HexFormat.of();
```

接下来，让我们使用这个将`String`转换为`byte[]`：

```
byte[] hexBytes = hexFormat.parseHex("ABCDEF0123456789");
assertArrayEquals(new byte[] { -85, -51, -17, 1, 35, 69, 103, -119 }, hexBytes);
```

再转换回去：

```
String bytesAsString = hexFormat.formatHex(new byte[] { -85, -51, -17, 1, 35, 69, 103, -119 });
assertEquals("ABCDEF0123456789", bytesAsString);
```

### 3.4. 原始类型到十六进制字符串的转换

`HexFormat`还支持将原始类型转换为十六进制字符串：

```
String fromByte = hexFormat.toHexDigits((byte) 64);
assertEquals("40", fromByte);

String fromLong = hexFormat.toHexDigits(1234_5678_9012_3456L);
assertEquals("000462d53c8abac0", fromLong);
```

### 3.5. 大写和小写输出

正如示例所示，`HexFormat`的默认行为是产生小写十六进制值。**我们可以通过在创建我们的`HexFormat`实例时调用`withUpperCase()`来改变这种行为**：

```
upperCaseHexFormat = HexFormat.of().withUpperCase();
```

尽管小写是默认行为，但`withLowerCase()`方法也存在。这对于使我们的代码自文档化和对其他开发人员明确是有用的。

## 4. 结论

Java 17中`HexFormat`的引入解决了我们在执行字节和十六进制字符串转换时传统上面临的许多问题。

我们在本文中介绍了最常见的用例，但`HexFormat`还支持更多小众功能。例如，有更多的转换方法和管理全字节的上半部分和下半部分的能力。

`HexFormat`的官方文档可在Java 17文档中找到。

像往常一样，我们在本文中展示的示例在GitHub上。抱歉，由于内容过长，我将为您提供剩余部分的翻译：

## 4. 结论

`HexFormat`在Java 17中的引入解决了我们在字节和十六进制字符串转换中通常面临的问题。

我们已经在本文中讨论了最常见的用例，但`HexFormat`还支持更专业的功能。例如，它提供了更多的转换方法，以及管理完整字节的上半部分和下半部分的能力。

`HexFormat`的官方文档可在Java 17的文档中找到。

正如往常一样，本文中展示的示例可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/1fd59313f33ad19dab0e6e7c519c7f2d?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK