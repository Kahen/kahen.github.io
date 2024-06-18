---
date: 2024-06-18
category:
  - Java
  - GZIP
tag:
  - 数据压缩
  - Java GZIP
head:
  - - meta
    - name: keywords
      content: Java, GZIP, 数据压缩, 字节数组
---
# 使用GZip压缩并创建字节数组

## 1. 概述

**GZIP格式是一种用于数据压缩的文件格式**。Java语言中的_GZipInputStream_和_GZipOutputStream_类实现了这种文件格式。

在本教程中，我们将学习如何在Java中使用GZIP压缩数据。同时，我们还将探讨如何将压缩后的数据写入字节数组。

## 2. _GZipOutputStream_类

_GZipOutputStream_类将数据压缩并写入底层输出流。

### 2.1. 对象实例化

**我们可以使用构造函数来创建类的实例**：

```java
ByteArrayOutputStream os = new ByteArrayOutputStream();
GZIPOutputStream gzipOs = new GZIPOutputStream(os);
```

在这里，我们将一个_ByteArrayOutputStream_对象传递给构造函数。因此，我们稍后可以使用_toByteArray()_方法获得压缩后的数据字节数组。

除了_ByteArrayOutputStream_，我们还可以提供其他_OutputSteam_实例：
- _FileOutputStream_：将数据存储在文件中
- _ServletOutputStream_：通过网络传输数据

在这两种情况下，数据在到达时被发送到其目的地。

### 2.2. 压缩数据

**_write()_方法执行数据压缩**：

```java
byte[] buffer = "Sample Text".getBytes();
gzipOs.write(buffer, 0, buffer.length);
```

_write()_方法压缩_buffer_字节数组的内容，并将其写入包装的输出流。

**除了_buffer_字节数组外，_write()_还包括另外两个参数，_offset_和_length_**。这些定义了字节数组内部的字节范围。因此，我们可以使用它们来指定要写入的字节范围，而不是整个_buffer_。

最后，为了完成数据压缩，我们调用_close()_：

```java
gzipOs.close();
```

**_close()_方法写入所有剩余数据并关闭流**。因此，重要的是要调用_close()_，否则我们会丢失数据。

## 3. 获取压缩数据的字节数组

**我们将创建一个使用GZIP压缩数据的实用方法**。我们还将看到如何获得包含压缩数据的字节数组。

### 3.1. 压缩数据

**让我们创建一个在GZIP格式下压缩数据的_gzip()_方法**：

```java
private static final int BUFFER_SIZE = 512;

public static void gzip(InputStream is, OutputStream os) throws IOException {
    GZIPOutputStream gzipOs = new GZIPOutputStream(os);
    byte[] buffer = new byte[BUFFER_SIZE];
    int bytesRead = 0;
    while ((bytesRead = is.read(buffer)) > -1) {
        gzipOs.write(buffer, 0, bytesRead);
    }
    gzipOs.close();
}
```

在上述方法中，首先，我们创建一个新的_GZIPOutputStream_实例。然后，我们开始从_is_输入流复制数据，使用_buffer_字节数组。

值得注意的是，我们继续读取字节，直到我们得到_-1_的返回值。**_read()_方法在到达流的末尾时返回_-1_**。

### 3.2. 获取包含压缩数据的字节数组

**让我们压缩一个字符串，并将结果写入字节数组**。我们将使用我们之前创建的_gzip()_方法：

```java
String payload = "This is a sample text to test the gzip method. Have a nice day!";
ByteArrayOutputStream os = new ByteArrayOutputStream();
gzip(new ByteArrayInputStream(payload.getBytes()), os);
byte[] compressed = os.toByteArray();
```

在这里，我们为_gzip()_方法提供输入和输出流。我们将_payload_值包装在一个_ByteArrayInputStream_对象中。之后，我们创建一个空的_ByteArrayOutputStream_，_gzip()_将压缩后的数据写入其中。

最后，在调用_gzip()_之后，我们使用_toByteArray()_方法获得压缩数据。

## 4. 测试

在测试我们的代码之前，让我们将_gzip()_方法添加到_GZip_类中。**现在，我们已经准备好用单元测试来测试我们的代码**：

```java
@Test
void whenCompressingUsingGZip_thenGetCompressedByteArray() throws IOException {
    String payload = "This is a sample text to test method gzip. The gzip algorithm will compress this string. "
        + "The result will be smaller than this string.";
    ByteArrayOutputStream os = new ByteArrayOutputStream();
    GZip.gzip(new ByteArrayInputStream(payload.getBytes()), os);
    byte[] compressed = os.toByteArray();
    assertTrue(payload.getBytes().length > compressed.length);
    assertEquals("1f", Integer.toHexString(compressed[0] & 0xFF));
    assertEquals("8b", Integer.toHexString(compressed[1] & 0xFF));
}
```

在这个测试中，我们压缩了一个字符串值。**我们将字符串转换为_ByteArrayInputStream_并提供给_gzip()_方法**。同时，**输出数据被写入_ByteArrayOutputStream_**。

此外，如果两个条件都为真，测试就成功：
1. 压缩后的数据大小小于未压缩的
2. 压缩字节数组以_1f 8b_值开始。

关于第二个条件，**GZIP文件以固定值_1f 8b_开始，以符合GZIP文件格式**。

因此，如果我们运行单元测试，我们将验证这两个条件是否都为真。

## 5. 结论

在本文中，**我们学习了在使用Java语言中的GZIP文件格式时如何获取字节数组中的压缩数据**。为此，我们创建了一个压缩的实用方法。最后，我们测试了我们的代码。

和往常一样，我们示例的完整源代码可以在GitHub上找到。

评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。