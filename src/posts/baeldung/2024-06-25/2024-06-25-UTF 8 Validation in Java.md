---
date: 2024-06-25
category:
  - Java
  - UTF-8
tag:
  - UTF-8
  - 编码
  - 验证
head:
  - - meta
    - name: keywords
      content: Java, UTF-8, 编码, 验证, Unicode

---
# Java中的UTF-8编码验证

## 1. 概述

在数据传输中，我们经常需要处理字节数据。如果数据是编码后的字符串而不是二进制数据，我们通常会使用Unicode编码。Unicode转换格式-8（UTF-8）是一种可变长度的编码方式，可以编码所有可能的Unicode字符。

在本教程中，我们将探讨UTF-8编码字节和字符串之间的转换。之后，我们将深入探讨在Java中对字节数据进行UTF-8验证的关键方面。

## 2. UTF-8转换

在我们进入验证部分之前，让我们回顾一下如何将字符串转换为UTF-8编码的字节数组，反之亦然。

**我们可以通过调用字符串的目标编码的_getBytes()_方法，将字符串转换为字节数组：**

```java
String UTF8_STRING = "Hello 你好";
byte[] UTF8_BYTES = UTF8_STRING.getBytes(StandardCharsets.UTF_8);
```

**对于反向操作，_String_类提供了一个构造函数，通过字节数组和其源编码创建一个_String_实例：**

```java
String decodedStr = new String(array, StandardCharsets.UTF_8);
```

我们使用的构造函数对解码过程没有太多的控制。每当字节数组包含无法映射的字符序列时，它就会用默认的替换字符替换这些字符：

```java
@Test
void whenDecodeInvalidBytes_thenReturnReplacementChars() {
    byte[] invalidUtf8Bytes = {(byte) 0xF0, (byte) 0xC1, (byte) 0x8C, (byte) 0xBC, (byte) 0xD1};
    String decodedStr = new String(invalidUtf8Bytes, StandardCharsets.UTF_8);
    assertEquals("", decodedStr);
}
```

因此，我们不能使用这种方法来验证一个字节数组是否以UTF-8编码。

## 3. 字节数组验证

**Java提供了一种简单的方法，使用_CharsetDecoder_来验证一个字节数组是否以UTF-8编码：**

```java
CharsetDecoder charsetDecoder = StandardCharsets.UTF_8.newDecoder();
CharBuffer decodedCharBuffer = charsetDecoder.decode(java.nio.ByteBuffer.wrap(UTF8_BYTES));
```

如果解码过程成功，我们认为这些字节是有效的UTF-8。否则，_decode()_方法会抛出_MalformedInputException_：

```java
@Test
void whenDecodeInvalidUTF8Bytes_thenThrowsMalformedInputException() {

   CharsetDecoder charsetDecoder = StandardCharsets.UTF_8.newDecoder();
   assertThrows(MalformedInputException.class, () -> {
       charsetDecoder.decode(java.nio.ByteBuffer.wrap(INVALID_UTF8_BYTES));
   });
}
```

## 4. 字节流验证

当我们的源数据是字节流而不是字节数组时，我们可以读取_InputStream_并将其内容放入字节数组。随后，我们可以对字节数组应用编码验证。

**然而，我们更倾向于直接验证_InputStream_。这避免了创建额外的字节数组，并减少了我们应用程序中的内存占用。** 当我们处理一个大流时，这一点尤其重要。

在这一部分，我们将定义以下常量作为我们的源UTF-8编码_InputStream_：

```java
InputStream UTF8_INPUTSTREAM = new ByteArrayInputStream(UTF8_BYTES);
```

### 4.1 使用Apache Tika进行验证

Apache Tika是一个开源的内容分析库，提供了一套类用于检测和从不同文件格式中提取文本内容。

我们需要在_pom.xml_中包含以下Apache Tika核心和标准解析器依赖：

```xml
```<dependency>```
    ```<groupId>```org.apache.tika```</groupId>```
    ```<artifactId>```tika-core```</artifactId>```
    ```<version>```2.9.1```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.apache.tika```</groupId>```
    ```<artifactId>```tika-parsers-standard-package```</artifactId>```
    ```<version>```2.9.1```</version>```
```</dependency>```
```

**当我们在Apache Tika中进行UTF-8验证时，我们实例化一个_UniversalEncodingDetector_并使用它来检测_InputStream_的编码。检测器返回编码作为一个_Charset_实例。** 我们只需验证_Charset_实例是否是UTF-8的：

```java
@Test
void whenDetectEncoding_thenReturnsUtf8() {
    EncodingDetector encodingDetector = new UniversalEncodingDetector();
    Charset detectedCharset = encodingDetector.detect(UTF8_INPUTSTREAM, new Metadata());
    assertEquals(StandardCharsets.UTF_8, detectedCharset);
}
```

**值得注意的是，当我们检测一个只包含ASCII码中前128个字符的流时，_detect()_方法返回ISO-8859-1而不是UTF-8。**

ISO-8859-1是一种单字节编码，用于表示ASCII字符，这些字符与前128个Unicode字符相同。由于这一特性，如果方法返回ISO-8859-1，我们仍然认为数据是以UTF-8编码的。

### 4.2 使用ICU4J进行验证

ICU4J代表Java的Unicode国际组件，是由IBM发布的Java库。它为软件应用程序提供Unicode和全球化支持。我们需要在_pom.xml_中包含以下ICU4J依赖：

```xml
```<dependency>```
    ```<groupId>```com.ibm.icu```</groupId>```
    ```<artifactId>```icu4j```</artifactId>```
    ```<version>```74.1```</version>```
```</dependency>```
```

**在ICU4J中，我们创建一个_CharsetDetector_实例来检测_InputStream_的字符集。** 与使用Apache Tika进行验证类似，我们验证字符集是否为UTF-8：

```java
@Test
void whenDetectEncoding_thenReturnsUtf8() {
    CharsetDetector detector = new CharsetDetector();
    detector.setText(UTF8_INPUTSTREAM);
    CharsetMatch charsetMatch = detector.detect();
    assertEquals(StandardCharsets.UTF_8.name(), charsetMatch.getName());
}
```

ICU4J在检测只包含前128个ASCII字符的数据流的编码时，表现出相同的行为，当检测返回ISO-8859-1时。

## 5. 结论

在本文中，我们探讨了基于字节和流的不同类型的UTF-8验证，以及UTF-8编码的字节和字符串转换。这趟旅程为我们提供了实用的代码，以加深对Java应用程序中UTF-8的理解。

如往常一样，示例代码可在GitHub上找到。

OK