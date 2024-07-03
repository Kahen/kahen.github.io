---
date: 2022-04-01
category:
  - Java
  - 文件操作
tag:
  - Java
  - 文件检查
  - 文件是否为空
head:
  - - meta
    - name: keywords
      content: Java, 文件操作, 文件是否为空检查
---
# 在Java中检查文件是否为空

我们经常在Java应用程序中遇到需要操作文件的场景。有时，在进行进一步操作之前，我们想要确定一个文件是否为空。

在本教程中，我们将探讨几种在Java中检查文件是否为空的高效且直接的方法。

## 2. 问题介绍

在我们深入实现之前，让我们理解一下文件为空的含义。

在文件操作的上下文中，**空文件指的是一个不包含数据或大小为零字节的文件**。

验证文件是否为空在处理输入或输出操作时特别有用，例如读取或解析文件。

Java标准库提供了获取文件大小的方法。然而，我们需要留意一些陷阱。

为了简单起见，我们将使用单元测试断言来验证我们的方法是否按预期工作。此外，JUnit 5的TempDirectory扩展允许我们在单元测试中轻松创建和清理临时目录。由于我们的测试与文件相关，我们将使用此扩展来支持我们的验证。

## 3. 使用 _File.length()_ 方法

我们知道，我们可以通过检查文件的大小来确定文件是否为空。Java标准IO库提供了**_File.length()_ 方法来以字节为单位计算文件的大小**。

因此，我们可以通过检查 _File.length()_ 返回 _0_ 来解决我们的问题：

```java
@Test
void whenTheFileIsEmpty_thenFileLengthIsZero(@TempDir Path tempDir) throws IOException {
    File emptyFile = tempDir.resolve("an-empty-file.txt")
      .toFile();
    emptyFile.createNewFile();
    assertTrue(emptyFile.exists());
    assertEquals(0, emptyFile.length());
}
```

调用 _File.length()_ 来检查文件是否为空非常方便。但有一个陷阱。让我们通过另一个测试来理解它：

```java
@Test
void whenFileDoesNotExist_thenFileLengthIsZero(@TempDir Path tempDir) {
    File aNewFile = tempDir.resolve("a-new-file.txt")
      .toFile();
    assertFalse(aNewFile.exists());
    assertEquals(0, aNewFile.length());
}
```

在上面的测试中，我们像平常一样初始化了一个 _File_ 对象。然而，我们没有创建文件。换句话说，**文件 _tempDir/a-new-file.txt_ 不存在**。

所以测试显示，**当我们对一个不存在的文件调用 _File.length()_ 时，它也返回 _0_**。通常，当我们谈论文件为空时，文件必须存在。因此，仅通过 _File.length()_ 来检查空文件是不可靠的。

那么接下来，让我们创建一个方法来解决这个问题：

```java
boolean isFileEmpty(File file) {
    if (!file.exists()) {
        throw new IllegalArgumentException("Cannot check the file length. The file is not found: " + file.getAbsolutePath());
    }
    return file.length() == 0;
}
```

在上面的方法中，如果文件不存在，我们抛出 _IllegalArgumentException_。有些人可能认为 _FileNotFoundException_ 更合适。在这里，我们没有选择 _FileNotFoundException_，因为它是一个检查异常。如果我们在调用我们的 _isFileEmpty()_ 方法时抛出这个异常，我们必须处理这个异常。另一方面，**_IllegalArgumentException_ 是一个非检查异常**，表示 _file_ 参数无效。

现在，无论文件是否存在，_isFileEmpty()_ 方法都能正常工作：

```java
@Test
void whenTheFileDoesNotExist_thenIsFilesEmptyThrowsException(@TempDir Path tempDir) {
    File aNewFile = tempDir.resolve("a-new-file.txt")
      .toFile();
    IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> isFileEmpty(aNewFile));
    assertEquals(ex.getMessage(), "Cannot check the file length. The file is not found: " + aNewFile.getAbsolutePath());
}

@Test
void whenTheFileIsEmpty_thenIsFilesEmptyReturnsTrue(@TempDir Path tempDir) throws IOException {
    File emptyFile = tempDir.resolve("an-empty-file.txt")
      .toFile();
    emptyFile.createNewFile();
    assertTrue(isFileEmpty(emptyFile));
}
```

## 4. 使用 NIO _Files.size()_ 方法

我们已经使用 _File.length()_ 解决了问题。

_File.length()_ 来自Java标准IO。或者，如果我们使用的是Java 7或更高版本，我们可以使用Java NIO API来解决问题。例如，_java.nio.file.Files.size()_ 返回文件的大小，这也可以帮助我们检查文件是否为空。

值得一提的是，**Java NIO的 _Files.size()_ 如果文件不存在会抛出 _NoSuchFileException_**：

```java
@Test
void whenTheFileIsEmpty_thenFilesSizeReturnsTrue(@TempDir Path tempDir) throws IOException {
    Path emptyFilePath = tempDir.resolve("an-empty-file.txt");
    Files.createFile(emptyFilePath);
    assertEquals(0, Files.size(emptyFilePath));
}

@Test
void whenTheFileDoesNotExist_thenFilesSizeThrowsException(@TempDir Path tempDir) {
    Path aNewFilePath = tempDir.resolve("a-new-file.txt");
    assertThrows(NoSuchFileException.class, () -> Files.size(aNewFilePath));
}
```

## 5. 结论

在本文中，我们探讨了在Java中检查文件是否为空的两种方法：

- 使用Java标准IO的 _File.length()_
- 使用Java NIO的 _Files.size()_

像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。