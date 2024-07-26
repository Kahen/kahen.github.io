---
date: 2022-04-01
category:
  - Java
  - 文件操作
tag:
  - 文件比较
  - Java Stream I/O
  - Apache Commons I/O
head:
  - - meta
    - name: keywords
      content: Java文件比较, 文件内容比较, Java Stream I/O, Apache Commons I/O
---

# 在Java中比较两个文件的内容 | Baeldung

## 1. 概述

在本教程中，我们将回顾不同的方法来确定两个文件的内容是否相等。我们将使用Java核心Stream I/O库来读取文件内容并实现基本比较。

最后，我们将回顾Apache Commons I/O提供的支持，以检查两个文件内容的相等性。

## 2. 字节比较

让我们从一种**简单的方式来读取两个文件的字节并顺序比较它们**。

为了加快文件读取速度，我们将使用_BufferedInputStream_。正如我们将看到的，_BufferedInputStream_从底层_InputStream_读取大块字节到内部缓冲区。当客户端读取完块中的所有字节时，缓冲区会从流中读取另一块字节。

显然，**使用_BufferedInputStream_比一次从底层流中读取一个字节要快得多**。

让我们编写一个使用_BufferedInputStream_比较两个文件的方法：

```java
public static long filesCompareByByte(Path path1, Path path2) throws IOException {
    try (BufferedInputStream fis1 = new BufferedInputStream(new FileInputStream(path1.toFile()));
         BufferedInputStream fis2 = new BufferedInputStream(new FileInputStream(path2.toFile()))) {

        int ch = 0;
        long pos = 1;
        while ((ch = fis1.read()) != -1) {
            if (ch != fis2.read()) {
                return pos;
            }
            pos++;
        }
        if (fis2.read() == -1) {
            return -1;
        } else {
            return pos;
        }
    }
}
```

我们使用_try-with-resources_语句确保两个_BufferedInputStream_在语句结束时关闭。

使用_while_循环，我们读取第一个文件的每个字节并与第二个文件的相应字节进行比较。如果我们发现差异，我们返回不匹配的字节位置。否则，文件相同，方法返回-1L。

我们可以看到，如果文件大小不同，但较小文件的字节与较大文件的相应字节匹配，则它返回较小文件的大小（以字节为单位）。

## 3. 逐行比较

**要比较文本文件，我们可以进行实现，逐行读取文件并检查它们之间的相等性**。

让我们使用_BufferedReader_，它使用与_InputStreamBuffer_相同的策略，将数据块从文件复制到内部缓冲区以加快读取过程。

让我们回顾一下我们的实现：

```java
public static long filesCompareByLine(Path path1, Path path2) throws IOException {
    try (BufferedReader bf1 = Files.newBufferedReader(path1);
         BufferedReader bf2 = Files.newBufferedReader(path2)) {

        long lineNumber = 1;
        String line1 = "", line2 = "";
        while ((line1 = bf1.readLine()) != null) {
            line2 = bf2.readLine();
            if (line2 == null || !line1.equals(line2)) {
                return lineNumber;
            }
            lineNumber++;
        }
        if (bf2.readLine() == null) {
            return -1;
        } else {
            return lineNumber;
        }
    }
}
```

代码遵循与前一个示例相同的策略。在_while_循环中，我们不是读取字节，而是读取每个文件的一行并检查它们是否相等。如果两个文件的所有行都相同，那么我们返回-1L，但如果有差异，我们返回第一个不匹配行的行号。

如果文件大小不同，但较小的文件与较大文件的相应行匹配，则它返回较小文件的行数。

## 4. 使用_Files::mismatch_

**_Files::mismatch_方法，添加于Java 12，比较两个文件的内容**。如果文件相同，它返回-1L，否则，它返回第一个不匹配的字节位置。

这个方法**内部从文件的_InputStream_ s读取数据块，并使用Java 9引入的_Arrays::mismatch_来比较它们**。

与我们的第一个示例一样，对于大小不同但小文件的内容与大文件的相应内容相同的文件，它返回较小文件的大小（以字节为单位）。

要查看如何使用这个方法的示例，请参见我们涵盖Java 12新特性的文章。

## 5. 使用内存映射文件

内存映射文件是一个内核对象，它将磁盘文件的字节映射到计算机的内存地址空间。绕过了堆内存，因为Java代码操作内存映射文件的内容就好像我们直接访问内存一样。

**对于大文件，从内存映射文件中读写数据比使用标准Java I/O库要快得多**。重要的是计算机有足够的内存来处理任务，以防止颠簸。

让我们编写一个非常简单的示例，展示如何使用内存映射文件比较两个文件的内容：

```java
public static boolean compareByMemoryMappedFiles(Path path1, Path path2) throws IOException {
    try (RandomAccessFile randomAccessFile1 = new RandomAccessFile(path1.toFile(), "r");
         RandomAccessFile randomAccessFile2 = new RandomAccessFile(path2.toFile(), "r")) {

        FileChannel ch1 = randomAccessFile1.getChannel();
        FileChannel ch2 = randomAccessFile2.getChannel();
        if (ch1.size() != ch2.size()) {
            return false;
        }
        long size = ch1.size();
        MappedByteBuffer m1 = ch1.map(FileChannel.MapMode.READ_ONLY, 0L, size);
        MappedByteBuffer m2 = ch2.map(FileChannel.MapMode.READ_ONLY, 0L, size);

        return m1.equals(m2);
    }
}
```

如果文件内容相同，该方法返回_true_，否则返回_false_。

我们使用_RamdomAccessFile_类打开文件，并访问它们各自的_FileChannel_以获取_MappedByteBuffer_。这是一个直接字节缓冲区，是文件的内存映射区域。在这个简单的实现中，我们使用它的_equals_方法在内存中一次性比较整个文件的字节。

## 6. 使用Apache Commons I/O

**_IOUtils::contentEquals_和_IOUtils::contentEqualsIgnoreEOL_方法比较两个文件的内容以确定相等性**。它们之间的差异在于**_contentEqualsIgnoreEOL_忽略了换行符(\\\\n)和回车符(\\\\r)**。这样做的动机是操作系统使用不同的这些控制字符组合来定义新行。

让我们看一个简单的示例来检查相等性：

```java
@Test
public void whenFilesIdentical_thenReturnTrue() throws IOException {
    Path path1 = Files.createTempFile("file1Test", ".txt");
    Path path2 = Files.createTempFile("file2Test", ".txt");

    InputStream inputStream1 = new FileInputStream(path1.toFile());
    InputStream inputStream2 = new FileInputStream(path2.toFile());

    Files.writeString(path1, "testing line 1" + System.lineSeparator() + "line 2");
    Files.writeString(path2, "testing line 1" + System.lineSeparator() + "line 2");

    assertTrue(IOUtils.contentEquals(inputStream1, inputStream2));
}

```

如果我们想忽略换行控制字符，但除此之外检查内容的相等性：

```java
@Test
public void whenFilesIdenticalIgnoreEOF_thenReturnTrue() throws IOException {
    Path path1 = Files.createTempFile("file1Test", ".txt");
    Path path2 = Files.createTempFile("file2Test", ".txt");

    Files.writeString(path1, "testing line 1 \n line 2");
    Files.writeString(path2, "testing line 1 \r\n line 2");

    Reader reader1 = new BufferedReader(new FileReader(path1.toFile()));
    Reader reader2 = new BufferedReader(new FileReader(path2.toFile()));

    assertTrue(IOUtils.contentEqualsIgnoreEOL(reader1, reader2));
}
```

## 7. 结论

在本文中，我们涵盖了几种实现比较两个文件内容以检查相等性的方法。

源代码可以在GitHub上找到。