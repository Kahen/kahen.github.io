---
date: 2024-06-25
category:
  - Java
  - OutputStream
tag:
  - Java
  - OutputStream
  - StringWriter
head:
  - - meta
    - name: keywords
      content: Java, OutputStream, 字符串写入, 编码
------
# 如何在Java中将字符串写入OutputStream

## 1. 概述

我们经常在需要将数据传输到外部目的地，如文件和网络时使用_OutputStream_。数据可以是二进制格式或字符串格式。**我们使用_OutputStream_，这是一个字节流，来处理二进制数据，并使用_Writer_，这是一个字符流，来处理字符串数据。**

然而，在某些情况下，由于选定的API的限制，我们必须将字符串写入_OutputStream_。在某些情况下，API可能只提供_OutputStream_而不是_Writer_。在本教程中，我们将探讨在这种情况下将字符串写入_OutputStream_的不同方法。

## 2. 字节转换

**最直接的方法涉及将字符串转换为字节，然后将转换后的字节写入_OutputStream：**

```
String str = "Hello";
byte[] bytes = str.getBytes(StandardCharsets.UTF_8);
outputStream.write(bytes);
```

这种方法简单直接，但有一个主要缺点。我们需要在每次调用_getBytes()_时显式地将字符串转换为字节，并指定字符编码。这使得我们的代码变得繁琐。

## 3. _OutputStreamWriter_

**更好的方法是使用_OutputStreamWriter_来包装我们的_OutputStream_。** _OutputStreamWriter_作为一个包装器，将字符流转换为字节流。写入它的字符串使用所选的字符编码编码成字节。

我们通过_write()_方法写入字符串，而不需要指定字符编码。对_OutputStreamWriter_的每次_write()_调用都隐式地将字符串转换为编码的字节，提供了一个更流畅的过程：

```
try (OutputStreamWriter writer = new OutputStreamWriter(outputStream, StandardCharsets.UTF_8)) {
    writer.write("Hello");
}
```

如果包装的_OutputStream_尚未缓冲，我们建议使用_BufferedWriter_来包装_OutputStreamWriter_，以使写入过程更有效：

```
BufferedWriter bufferedWriter = new BufferedWriter(writer);
```

这通过先将数据写入缓冲区，然后一次性将缓冲的数据刷新到流中，减少了IO操作。

## 4. _PrintStream_

**另一个选择是使用_PrintStream_，它提供了与_OutputStreamWriter_类似的功能。** 与_OutputStreamWriter_类似，我们可以在实例化_PrintStream_时指定编码：

```
try (PrintStream printStream = new PrintStream(outputStream, true, StandardCharsets.UTF_8)) {
    printStream.print("Hello");
}
```

如果我们在构造函数中没有明确定义字符编码，默认编码将是UTF-8：

```
PrintStream printStream = new PrintStream(outputStream);
```

_PrintStream_和_OutputStreamWriter_之间的不同之处在于_PrintStream_提供了额外的_print()_方法，用于将不同类型的数据写入_OutputStream_。此外，_PrintWriter_永远不会因其_print()_和_write()_方法而抛出_IOException_：

```
printStream.print(100); // 整数
printStream.print(true); // 布尔值
```

## 5. _PrintWriter_

**_PrintWriter_的用途与_PrintStream_相似，提供将数据的格式化表示写入_OutputStream_的功能：**

```
try (PrintWriter writer = new PrintWriter(outputStream)) {
    writer.print("Hello");
}
```

除了包装_OutputStream_，_PrintWriter_还提供了额外的构造函数来包装_Writer_。它们之间的另一个区别是，_PrintWriter_提供了_write()_方法来写入字符数组，而_PrintStream_提供了_write()_方法来写入字节数组：

```
char[] c = new char[] {'H', 'e', 'l', 'l', 'o'};
try (PrintWriter writer = new PrintWriter(new StringWriter())) {
    writer.write(c);
}
```

## 6. 结论

在本文中，我们探讨了在Java中将字符串写入_OutputStream_的几种方法。

我们从将字符串直接转换为字节开始，这需要为每次写操作显式编码，影响代码的可维护性。随后，我们探讨了三种不同的Java类，它们围绕_OutputStream_进行包装，以无缝地将字符串编码成字节。

如往常一样，示例代码可在GitHub上找到。翻译已经完成，以下是剩余部分的翻译：

## 6. 结论

在这篇文章中，我们探索了在Java中将字符串写入_OutputStream_的几种方法。

我们首先从将字符串直接转换为字节开始，这种方法需要为每次写操作显式指定编码，并且会影响代码的可维护性。接着，我们探讨了三种不同的Java类，它们可以包装_OutputStream_来无缝地将字符串编码成字节。

一如既往，示例代码可以在GitHub上找到。

OK