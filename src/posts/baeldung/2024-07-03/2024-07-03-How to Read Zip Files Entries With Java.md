---
date: 2022-04-01
category:
  - Java
  - Zip Files
tag:
  - Java
  - ZipFile
  - ZipEntry
head:
  - - meta
    - name: keywords
      content: Java, ZipFile, ZipEntry, 压缩文件, 解压, 读取
------
# 如何使用Java读取Zip文件条目

Zip文件广泛用于将多个文件压缩和归档到一个单一文件中。在各种场景中，程序化地提取和处理Zip文件中的单个条目可能非常有价值。

在这个简短的教程中，我们将探讨如何使用Java读取Zip文件条目。

## 2. 解决方案

**我们可以使用来自_java.util.zip_包的_ZipFile_和_ZipEntry_类轻松读取Zip文件的条目：**

```
String zipFilePath = "path/to/our/zip/file.zip";

try (ZipFile zipFile = new ZipFile(zipFilePath)) {
    Enumeration`<? extends ZipEntry>` entries = zipFile.entries();
    while (entries.hasMoreElements()) {
        ZipEntry entry = entries.nextElement();
        // 检查条目是否是目录
        if (!entry.isDirectory()) {
            try (InputStream inputStream = zipFile.getInputStream(entry)) {
                // 使用inputStream读取和处理条目内容
            }
        }
    }
}
```

让我们详细了解这些步骤：

- 首先，我们可以创建一个_ZipFile_对象，该对象表示Zip文件。此对象将提供对文件内条目的访问。
- 一旦我们有了_ZipFile_对象，我们可以使用_entries()_方法遍历其条目。每个条目代表一个文件或目录。
- 对于每个条目，我们可以访问各种属性，如名称、大小、修改时间等。让我们使用_isDirectory()_方法来检查它是否是一个目录。
- 要读取特定条目的内容，我们可以使用由_getInputStream()_方法返回的_InputStream_。这允许我们访问条目的字节数据。
- 最后，让我们使用try-with-resources，这样我们就不必担心手动关闭_ZipFile_和_InputStream_。

## 3. 示例

让我们使用具有以下结构的Zip文件来测试我们的解决方案：

```
fileA.txt
folder1/
folder1/fileB.txt
```

让我们改变上述代码，以读取Zip文件中的文本文件内容：

```
try (InputStream inputStream = zipFile.getInputStream(entry);
     Scanner scanner = new Scanner(inputStream);) {

    while (scanner.hasNextLine()) {
        String line = scanner.nextLine();
        System.out.println(line);
    }
}
```

输出将如下所示：

```
this is the content in fileA
this is the content in fileB
```

## 4. 结论

在这个教程中，我们学习了如何使用Java读取Zip文件条目。

本文的示例代码可以在GitHub上找到。