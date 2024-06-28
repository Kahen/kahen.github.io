---
date: 2024-06-28
category:
  - Java
  - 编程
tag:
  - ZipFile
  - ZipInputStream
head:
  - - meta
    - name: keywords
      content: Java, 压缩文件, ZipFile, ZipInputStream
---

# Java 中 ZipFile 与 ZipInputStream 的区别

在需要将多个文件压缩成一个单一的归档文件以方便传输和节省空间的情况下，**Zip 是一种广泛使用的压缩归档文件格式。**

Java 提供了一套标准类，如 _ZipFile_ 和 _ZipInputStream_，用于访问 zip 文件。在本教程中，我们将学习如何使用它们来读取 zip 文件。同时，我们将探索它们的功能差异并评估它们的性能。

## 2. 创建 Zip 文件

在我们深入到读取 zip 文件的代码之前，让我们先回顾一下创建 zip 文件的过程。

在以下代码片段中，我们将有两个变量。_data_ 存储要压缩的内容，_file_ 代表我们的目的地文件：

```java
String data = "..."; // 一个非常长的字符串

try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
  ZipOutputStream zos = new ZipOutputStream(bos)) {
    ZipEntry zipEntry = new ZipEntry("zip-entry.txt");
    zos.putNextEntry(zipEntry);
    zos.write(data);
    zos.closeEntry();
}
```

**此片段将 _data_ 归档到名为 _zip-entry.txt_ 的 zip 条目中，然后将条目写入目标 _file_。**

## 3. 通过 _ZipFile_ 读取

首先，让我们看看如何通过 _ZipFile_ 类从 zip 文件中读取所有条目：

```java
try (ZipFile zipFile = new ZipFile(compressedFile)) {
    Enumeration`<? extends ZipEntry>` zipEntries = zipFile.entries();
    while (zipEntries.hasMoreElements())  {
        ZipEntry zipEntry = zipEntries.nextElement();
        try (InputStream inputStream = new BufferedInputStream(zipFile.getInputStream(zipEntry))) {
            // 从 InputStream 读取数据
        }
    }
}
```

我们创建一个 _ZipFile_ 的实例来读取压缩文件。_ZipFile.entries()_ 返回 zip 文件中的所有 zip 条目。然后我们可以从 _ZipEntry_ 获取 _InputStream_ 来读取它的内容。

**除了 _entries()_，ZipFile 还有一个方法 _getEntry(…)_，它允许我们基于条目名称随机访问特定的 _ZipEntry_：**

```java
ZipEntry zipEntry = zipFile.getEntry("str-data-10.txt");
try (InputStream inputStream = new BufferedInputStream(zipFile.getInputStream(zipEntry))) {
    // 从 InputStream 读取数据
}
```

## 4. 通过 _ZipInputStream_ 读取

接下来，我们将通过一个典型的例子来了解如何通过 _ZipInputStream_ 从 zip 文件中读取所有条目：

```java
try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(compressedFile));
  ZipInputStream zipInputStream = new ZipInputStream(bis)) {
    ZipEntry zipEntry;
    while ((zipEntry = zipInputStream.getNextEntry()) != null) {
        // 从 ZipInputStream 读取数据
    }
}
```

我们创建一个 _ZipInputStream_ 来包装数据源，即我们案例中的 _compressedFile_。之后，我们通过 _getNextEntry()_ 迭代 _ZipInputStream_。

在循环中，我们通过从 _ZipIputStream_ 读取数据来读取每个 _ZipEntry_ 的数据。一旦我们完成一个条目的读取，然后我们再次调用 _getNextEntry()_ 来表示我们将要读取下一个条目。

## 5. 功能差异

尽管这两个类都可以从 zip 文件中读取条目，但它们有两个明显不同的功能差异。

### 5.1. 访问类型

它们之间的主要区别是 _ZipFile_ 支持随机访问，而 _ZipInputStream_ 仅支持顺序访问。

在 _ZipFile_ 中，我们可以通过调用 _ZipFile.getEntry(…)_ 来提取特定的条目。当我们只需要 _ZipFile_ 中的特定条目时，这个特性特别有利。如果我们想在 _ZipInputStream_ 中实现相同的功能，我们必须在迭代过程中循环遍历每个 _ZipEntry_，直到找到匹配项。

### 5.2. 数据源

_ZipFile_ 需要数据源是一个物理文件，而 _ZipInputStream_ 只需要一个 _InputStream_。可能会有这样的情况，我们的数据不是一个文件。例如，我们的数据来自网络流。在这种情况下，在使用 _ZipFile_ 处理之前，我们必须将整个 _InputStream_ 转换为文件。

## 6. 性能比较

我们已经了解了 _ZipFile_ 和 _ZipInputStream_ 之间的功能差异。现在，让我们进一步探索它们在性能方面的差异。

我们将使用 JMH（Java Microbenchmark Harness）来捕捉这两种方式处理 zip 文件的速度。JMH 是一个旨在测量代码片段性能的框架。

在我们进行基准测试之前，我们必须在 _pom.xml_ 中包含以下 Maven 依赖项：

```xml
``<dependency>``
    ``<groupId>``org.openjdk.jmh``</groupId>``
    ``<artifactId>``jmh-core``</artifactId>``
    ``<version>``1.37``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.openjdk.jmh``</groupId>``
    ``<artifactId>``jmh-generator-annprocess``</artifactId>``
    ``<version>``1.37``</version>``
``</dependency>``
```

JMH Core 和 Annotation 的最新版本可以在 Maven Central 中找到。

### 6.1. 读取所有条目

在这个实验中，我们的目标是评估从 zip 文件中读取所有条目的性能。在我们的设置中，我们有一个包含 10 个条目的 zip 文件，每个条目包含 200KB 的数据。我们将分别通过 _ZipFile_ 和 _ZipInputStream_ 读取它们：

| 类        | 运行时间（毫秒）|
| --------- | -------------- |
| _ZipFile_ | 11.072         |
| _ZipInputStream_ | 11.642     |

**从结果中，我们看不到两个类之间的显著性能差异。运行时间的差异在 10% 以内。它们在读取 zip 文件中的所有条目时都表现出了可比的效率。**

### 6.2. 读取最后一个条目

接下来，我们将特别针对从同一个 zip 文件中读取最后一个条目：

| 类        | 运行时间（毫秒）|
| --------- | -------------- |
| _ZipFile_ | 1.016          |
| _ZipInputStream_ | 12.830     |

这次它们之间有很大的差异。_ZipFile_ 只需要读取所有条目所需时间的 1/10 来读取 10 个条目中的单个条目，而 _ZipInputStream_ 花费的时间几乎相同。

我们可以从结果中观察到 _ZipInputStream_ 顺序读取条目。输入流必须从 zip 文件的开头读取到目标条目被定位，而 _ZipFile_ 允许跳转到目标条目而无需读取整个文件。

**结果表明，特别是当处理大量条目中的少数条目时，选择 _ZipFile_ 而不是 _ZipInputStream_ 的重要性。**

## 7. 结论

在软件开发中，使用 zip 压缩文件是常见的。Java 提供了两个不同的类，_ZipFile_ 和 _ZipIputStream,_ 来读取 zip 文件。

在本文中，我们探讨了它们的用法和功能差异。我们还评估了它们之间的性能。

选择它们之间的差异取决于我们的需求。**当我们处理大型 zip 归档中的有限数量条目以确保最佳性能时，我们将选择 _ZipFile_。相反，如果我们的数据源不是文件，我们将选择 _ZipInputStream_。**

如常，我们的示例的完整源代码可以在 GitHub 上找到。