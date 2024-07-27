---
date: 2022-04-01
category:
  - Java
  - Zip4j
tag:
  - Java
  - Zip4j
  - 密码保护
  - 压缩文件
head:
  - - meta
    - name: keywords
      content: Java, Zip4j, 密码保护, 压缩文件
---

# 如何在Java中创建受密码保护的Zip文件以及解压它们 | Baeldung

1. 概述

在之前的教程中，我们展示了如何使用java.util.zip包在Java中进行压缩和解压。但我们没有标准的Java库来创建受密码保护的zip文件。

在本教程中，我们将学习如何使用Zip4j库创建受密码保护的zip文件以及解压它们。它是Java中最全面的zip文件库。

2. 依赖性

让我们首先将zip4j依赖项添加到我们的pom.xml文件中：

```xml
`<dependency>`
    `<groupId>`net.lingala.zip4j`</groupId>`
    `<artifactId>`zip4j`</artifactId>`
    `<version>`2.11.5`</version>`
`</dependency>`
```

3. 压缩文件

首先，我们将使用ZipFile的addFile()方法将名为aFile.txt的文件压缩到名为compressed.zip的受密码保护的归档中：

```java
ZipParameters zipParameters = new ZipParameters();
zipParameters.setEncryptFiles(true);
zipParameters.setCompressionLevel(CompressionLevel.HIGHER);
zipParameters.setEncryptionMethod(EncryptionMethod.AES);

ZipFile zipFile = new ZipFile("compressed.zip", "password".toCharArray());
zipFile.addFile(new File("aFile.txt"), zipParameters);
```

设置压缩级别这一行是可选的。我们可以选择从FASTEST到ULTRA（默认为NORMAL）。

在这个例子中，我们使用了AES加密。如果我们想使用Zip标准加密，我们只需要将AES替换为ZIP_STANDARD。

请注意，如果文件"aFile.txt"在磁盘上不存在，该方法将抛出异常：“net.lingala.zip4j.exception.ZipException: File does not exist: …”。

为了解决这个问题，我们必须确保文件要么手动创建并放置在项目文件夹中，要么我们得从Java中创建它：

```java
File fileToAdd = new File("aFile.txt");
if (!fileToAdd.exists()) {
    fileToAdd.createNewFile();
}
```

此外，完成新的ZipFile后，**关闭资源是一个好习惯：**

```java
zipFile.close();
```

4. 压缩多个文件

让我们稍微修改一下代码，以便我们可以一次性压缩多个文件：

```java
ZipParameters zipParameters = new ZipParameters();
zipParameters.setEncryptFiles(true);
zipParameters.setEncryptionMethod(EncryptionMethod.AES);

List`<File>` filesToAdd = Arrays.asList(
  new File("aFile.txt"),
  new File("bFile.txt")
);

ZipFile zipFile = new ZipFile("compressed.zip", "password".toCharArray());
zipFile.addFiles(filesToAdd, zipParameters);
```

我们使用addFiles()而不是addFile方法，并传入一个文件列表。

5. 压缩一个目录

我们可以通过将addFile方法替换为addFolder来简单地压缩一个文件夹：

```java
ZipFile zipFile = new ZipFile("compressed.zip", "password".toCharArray());
zipFile.addFolder(new File("/users/folder_to_add"), zipParameters);
```

6. 创建分割的Zip文件

当大小超过特定限制时，我们可以通过使用createSplitZipFile和createSplitZipFileFromFolder方法将zip文件分割成多个文件：

```java
ZipFile zipFile = new ZipFile("compressed.zip", "password".toCharArray());
int splitLength = 1024 * 1024 * 10; //10MB
zipFile.createSplitZipFile(Arrays.asList(new File("aFile.txt")), zipParameters, true, splitLength);
```

```java
zipFile.createSplitZipFileFromFolder(new File("/users/folder_to_add"), zipParameters, true, splitLength);
```

splitLength的单位是字节。

提取文件同样简单。我们可以使用extractAll()方法从我们的compressed.zip中提取所有文件：

```java
ZipFile zipFile = new ZipFile("compressed.zip", "password".toCharArray());
zipFile.extractAll("/destination_directory");
```

如果我们只想从compressed.zip中提取单个文件，我们可以使用extractFile()方法：

```java
ZipFile zipFile = new ZipFile("compressed.zip", "password".toCharArray());
zipFile.extractFile("aFile.txt", "/destination_directory");
```

9. 结论

总结来说，我们学习了如何使用Zip4j库在Java中创建受密码保护的zip文件以及解压它们。

这些示例的实现可以在GitHub上找到。