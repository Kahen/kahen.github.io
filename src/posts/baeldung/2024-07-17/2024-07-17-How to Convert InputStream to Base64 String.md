---
date: 2022-04-01
category:
  - Java
  - Base64
tag:
  - InputStream
  - Base64
  - Encoding
head:
  - - meta
    - name: keywords
      content: Java, Base64, Encoding, InputStream
------
# 如何将 InputStream 转换为 Base64 字符串

## 1. 概述

Base64 是一种文本编码方案，它为应用程序和平台之间的二进制数据提供可移植性。Base64 可用于将二进制数据存储在数据库字符串列中，从而避免混乱的文件操作。结合数据 URI 方案，Base64 可用于在符合 HTML 和多用途互联网邮件扩展（MIME）标准的网页和电子邮件中嵌入图像。

在本简短教程中，我们将演示 Java 流式 IO 函数和内置的 Java _Base64_ 类，以**将二进制数据作为 _InputStream_ 加载，然后将其转换为 _String_**。

## 2. 设置

让我们看看我们需要的依赖项和测试数据。

### 2.1. 依赖项

我们将使用 Apache IOUtils 库方便地访问测试数据文件，通过将其依赖项添加到我们的 _pom.xml_：

```xml
`<dependency>`
    ``<groupId>``commons-io``</groupId>``
    ``<artifactId>``commons-io``</artifactId>``
    ``<version>``2.15.1``</version>``
``</dependency>``
```

### 2.2. 测试数据

这里需要一个二进制测试数据文件。因此，我们将 _logo.png_ 图像文件添加到我们标准的 _src/test/resources_ 文件夹中。

## 3. 将 _InputStream_ 转换为 Base64 字符串

**Java 在 _java.util.Base64_ 类中内置了对 Base64 编码和解码的支持。因此，我们将使用那里的 _static_ 方法来完成繁重的工作。**

_Base64.encode()_ 方法期望一个 _byte_ 数组，而我们的图像在文件中。因此，我们需要先将文件转换为 _InputStream_，然后逐字节读取流到数组中。

我们使用 Apache _commons-io_ 包中的 _IOUtils.toByteArray()_ 方法作为繁琐的纯 Java 方法的便捷替代。

首先，我们将编写一个简单的方法来生成“穷人版”校验和：

```java
int calculateChecksum(byte[] bytes) {
    int checksum = 0;
    for (int index = 0; index < bytes.length; index++) {
        checksum += bytes[index];
    }
    return checksum;
}
```

我们将使用它来比较这两个数组，验证它们是否匹配。

接下来的几行打开文件，将其转换为字节数组，然后将 Base64 编码为 _String_：

```java
InputStream sourceStream  = getClass().getClassLoader().getResourceAsStream("logo.png");
byte[] sourceBytes = IOUtils.toByteArray(sourceStream);

String encodedString = Base64.getEncoder().encodeToString(sourceBytes);
assertNotNull(encodedString);

```

字符串看起来像一块随机字符。实际上，它并不是随机的，正如我们在验证步骤中看到的：

```java
byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
assertNotNull(decodedBytes);
assertTrue(decodedBytes.length == sourceBytes.length);
assertTrue(calculateChecksum(decodedBytes) == calculateChecksum(sourceBytes));

```

## 4. 结论

在本文中，我们展示了将 _InputStream_ 编码为 Base64 字符串以及成功将该字符串解码回二进制数组的过程。

一如既往，本文中展示的代码可在 GitHub 上获取。好的，翻译已完成。以下是翻译的剩余部分：

---

# 如何将 InputStream 转换为 Base64 字符串

## 1. 概述

Base64 是一种文本编码方案，它为应用程序和平台之间的二进制数据提供可移植性。Base64 可以用于在数据库字符串列中存储二进制数据，从而避免混乱的文件操作。结合数据 URI 方案，Base64 可以用于在网页和电子邮件中嵌入图像，符合 HTML 和多用途互联网邮件扩展（MIME）标准。

在本简短教程中，我们将演示 Java 流式 IO 函数和内置的 Java _Base64_ 类，以**将二进制数据作为 _InputStream_ 加载，然后将其转换为 _String_**。

## 2. 设置

### 2.1. 依赖项

我们将使用 Apache IOUtils 库来方便地访问测试数据文件，通过将依赖项添加到我们的 _pom.xml_：

```xml
`<dependency>`
    ``<groupId>``commons-io``</groupId>``
    ``<artifactId>``commons-io``</artifactId>``
    ``<version>``2.15.1``</version>``
``</dependency>``
```

### 2.2. 测试数据

这里需要一个二进制测试数据文件。因此，我们将 _logo.png_ 图像文件添加到我们的 _src/test/resources_ 文件夹中。

## 3. 将 _InputStream_ 转换为 Base64 字符串

**Java 在 _java.util.Base64_ 类中内置了 Base64 编码和解码的支持。我们将使用该类中的静态方法来执行主要工作。**

_Base64.encode()_ 方法需要一个字节数组，而我们的图像存储在文件中。因此，我们需要先将文件转换为 _InputStream_，然后逐字节读取流到数组中。

我们使用 Apache _commons-io_ 包中的 _IOUtils.toByteArray()_ 方法作为替代 Java 原生方法的便捷方式。

首先，我们编写一个简单方法来生成一个简单的校验和：

```java
int calculateChecksum(byte[] bytes) {
    int checksum = 0;
    for (int index = 0; index < bytes.length; index++) {
        checksum += bytes[index];
    }
    return checksum;
}
```

我们将使用它来比较两个数组，确保它们匹配。

接下来的代码行打开文件，将其转换为字节数组，然后将其 Base64 编码为 _String_：

```java
InputStream sourceStream = getClass().getClassLoader().getResourceAsStream("logo.png");
byte[] sourceBytes = IOUtils.toByteArray(sourceStream);

String encodedString = Base64.getEncoder().encodeToString(sourceBytes);
assertNotNull(encodedString);
```

字符串看起来像一串随机字符。实际上，它不是随机的，正如我们在验证步骤中看到的：

```java
byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
assertNotNull(decodedBytes);
assertTrue(decodedBytes.length == sourceBytes.length);
assertTrue(calculateChecksum(decodedBytes) == calculateChecksum(sourceBytes));
```

## 4. 结论

在本文中，我们展示了将 _InputStream_ 编码为 Base64 字符串以及成功将该字符串解码回二进制数组的过程。

如常，本文中展示的代码可在 GitHub 上找到。

OK