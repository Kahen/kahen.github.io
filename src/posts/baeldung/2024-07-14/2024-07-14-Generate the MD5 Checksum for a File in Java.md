---
date: 2022-04-01
category:
  - Java
  - MD5
tag:
  - Java
  - MD5
  - Checksum
head:
  - - meta
    - name: keywords
      content: Java, MD5, Checksum, 文件校验
---

# Java中生成文件的MD5校验和

## 1. 概述

校验和是一串用于唯一标识文件的字符序列。它最常用于验证文件副本是否与原始文件完全相同。

在这个简短的教程中，我们将看到如何在Java中**生成文件的MD5校验和**。

## 2. 使用MessageDigest类

我们可以很容易地使用java.security包中的MessageDigest类来为文件生成MD5校验和：

```
byte[] data = Files.readAllBytes(Paths.get(filePath));
byte[] hash = MessageDigest.getInstance("MD5").digest(data);
String checksum = new BigInteger(1, hash).toString(16);
```

## 3. 使用Apache Commons Codec

我们还可以使用Apache Commons Codec库中的DigestUtils类来实现相同的目标。

让我们在我们的pom.xml文件中添加一个依赖项：

```
`<dependency>`
    `<groupId>`commons-codec`</groupId>`
    `<artifactId>`commons-codec`</artifactId>`
    `<version>`1.15`</version>`
`</dependency>`
```

现在，我们简单地使用md5Hex()方法来获取我们文件的MD5校验和：

```
try (InputStream is = Files.newInputStream(Paths.get(filePath))) {
    String checksum = DigestUtils.md5Hex(is);
    // ....
}
```

让我们不要忘记使用try-with-resources，这样我们就不必担心关闭流。

## 4. 使用Guava

最后，我们可以使用Guava的ByteSource对象的hash()方法：

```
File file = new File(filePath);
ByteSource byteSource = com.google.common.io.Files.asByteSource(file);
HashCode hc = byteSource.hash(Hashing.md5());
String checksum = hc.toString();
```

## 5. 结论

在这个快速教程中，我们已经展示了在Java中**生成文件的MD5校验和**的不同方法。

正如往常一样，本文的示例代码可以在GitHub上找到。