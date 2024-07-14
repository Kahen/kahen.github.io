---
date: 2022-04-01
category:
  - Java
  - 文件操作
tag:
  - Java
  - 文件名
  - 文件路径
head:
  - - meta
    - name: keywords
      content: Java, 文件名提取, 文件路径解析
---
# 从包含绝对文件路径的字符串中获取文件名 | Baeldung

## 1. 概述

当我们在Java中处理文件时，我们经常需要从一个给定的绝对路径中提取文件名。

在本教程中，我们将探讨如何提取文件名。

## 2. 问题介绍

问题非常直接。想象一下，我们有一个绝对文件路径字符串。我们想要从中提取文件名。一些例子可以快速解释这个问题：

```java
String PATH_LINUX = "/root/with space/subDir/myFile.linux";
String EXPECTED_FILENAME_LINUX = "myFile.linux";

String PATH_WIN = "C:\\root\\with space\\subDir\\myFile.win";
String EXPECTED_FILENAME_WIN = "myFile.win";
```

正如我们所看到的，**不同的文件系统可能有不同的文件分隔符**。因此，在本教程中，我们将解决一些平台无关的解决方案。换句话说，相同的实现将在\*nix和Windows系统上工作。

为了简单起见，我们将使用单元测试断言来验证解决方案是否按预期工作。

接下来，让我们看看它们在行动中的表现。

## 3. 将绝对路径作为字符串解析

首先，**文件系统不允许文件名包含文件分隔符**。因此，例如，我们不能在Linux的Ext2、Ext3或Ext4文件系统上创建一个包含“/”的文件名：

```bash
$ touch "a/b.txt"
touch: cannot touch 'a/b.txt': No such file or directory
```

在上面的例子中，文件系统将“a/”视为一个目录。基于这个规则，解决这个问题的一个想法是**从最后一个文件分隔符开始取出子字符串直到字符串的末尾**。

String的_lastIndexOf()_方法返回该字符串中子字符串的最后索引。然后，我们可以通过调用_absolutePath.substring(lastIndex+1)_简单地获取文件名。

正如我们所看到的，实现是直接的。然而，我们应该注意到，为了使我们的解决方案系统无关，我们不应该将文件分隔符硬编码为Windows的“\\\\”或\*nix系统的“/”。相反，**让我们在代码中使用_File.separator_，以便我们的程序自动适应它运行的系统：**

```java
int index = PATH_LINUX.lastIndexOf(File.separator);
String filenameLinux = PATH_LINUX.substring(index + 1);
assertEquals(EXPECTED_FILENAME_LINUX, filenameLinux);
```

如果我们在Linux机器上运行上述测试，它会通过。类似地，下面的测试在Windows机器上也会通过：

```java
int index = PATH_WIN.lastIndexOf(File.pathSeparator);
String filenameWin = PATH_WIN.substring(index + 1);
assertEquals(EXPECTED_FILENAME_WIN, filenameWin);
```

正如我们所看到的，相同的实现在两个系统上都有效。

除了将绝对路径作为字符串解析之外，我们可以使用标准的_File_类来解决这个问题。

## 4. 使用_File.getName()_方法

_File_类提供了_getName()_方法直接获取文件名。此外，我们可以从给定的绝对路径字符串构造一个_File_对象。

让我们首先在Linux系统上测试它：

```java
File fileLinux = new File(PATH_LINUX);
assertEquals(EXPECTED_FILENAME_LINUX, fileLinux.getName());
```

如果我们运行测试，它会通过。正如**_File_在内部使用_File.separator_**，如果我们在Windows系统上测试相同的解决方案，它也会通过：

```java
File fileWin = new File(PATH_WIN);
assertEquals(EXPECTED_FILENAME_WIN, fileWin.getName());
```

## 5. 使用_Path.getFileName()_方法

_File_是_java.io_包的标准类。从Java 1.7开始，较新的_java.nio_库带有_Path_接口。

一旦我们有一个_Path_对象，我们可以通过调用_Path.getFileName()_方法来获取文件名。与_File_类不同，**我们可以使用静态_Paths.get()_方法创建一个_Path_实例。**

接下来，让我们从给定的_PATH_LINUX_字符串创建一个_Path_实例，并在Linux上测试解决方案：

```java
Path pathLinux = Paths.get(PATH_LINUX);
assertEquals(EXPECTED_FILENAME_LINUX, pathLinux.getFileName().toString());
```

当我们执行测试时，它会通过。值得一提的是，**_Path.getFileName()_返回一个_Path_对象**。因此，我们明确调用_toString()_方法将其转换为字符串。

相同的实现在Windows系统上使用_PATH_WIN_作为路径字符串也有效。这是因为_Path_可以检测它运行的当前_FileSystem_：

```java
Path pathWin = Paths.get(PATH_WIN);
assertEquals(EXPECTED_FILENAME_WIN, pathWin.getFileName().toString());
```

## 6. 使用Apache Commons IO中的_FilenameUtils.getName()_

到目前为止，我们已经讨论了三种从绝对路径中提取文件名的解决方案。正如我们提到的，它们是平台无关的。然而，所有这三种解决方案只有在给定的绝对路径与程序运行的系统相匹配时才正确。例如，我们的程序只有在Windows上运行时才能处理Windows路径。

### 6.1. 智能_FilenameUtils.getName()_方法

嗯，在实践中，解析不同系统路径格式的可能性相对较低。然而，**Apache Commons IO的_FilenameUtils_类可以“智能”地从不同的路径格式中提取文件名**。因此，如果我们的程序在Windows上运行，它也可以处理Linux文件路径，反之亦然。

接下来，让我们创建一个测试：

```java
String filenameLinux = FilenameUtils.getName(PATH_LINUX);
assertEquals(EXPECTED_FILENAME_LINUX, filenameLinux);

String filenameWin = FilenameUtils.getName(PATH_WIN);
assertEquals(EXPECTED_FILENAME_WIN, filenameWin);
```

正如我们所看到的，上面的测试解析了_PATH_LINUX_和_PATH_WIN_。无论我们在Linux还是Windows上运行它，测试都会通过。

所以接下来，我们可能想知道_FilenameUtils_如何自动处理不同系统的路径。

### 6.2. _FilenameUtils.getName()_的工作原理

如果我们看看_FilenameUtils.getName()_的实现，它的逻辑与我们的“lastIndexOf”文件分隔符方法类似。不同之处在于_FilenameUtils_调用_lastIndexOf()_方法两次，一次使用\*nix分隔符(/)，然后使用Windows文件分隔符(\\)。最后，它将较大的索引作为“lastIndex”：

```java
...
final int lastUnixPos = fileName.lastIndexOf(UNIX_SEPARATOR); // UNIX_SEPARATOR = '/'
final int lastWindowsPos = fileName.lastIndexOf(WINDOWS_SEPARATOR); // WINDOWS_SEPARATOR = '\\'
return Math.max(lastUnixPos, lastWindowsPos);
```

因此，**_FilenameUtils.getName()_不检查当前文件系统或系统的文件分隔符**。相反，它找到最后一个文件分隔符的索引，无论它属于哪个系统，然后从这个索引提取子字符串直到字符串的末尾作为最终结果。

### 6.3. 使_FilenameUtils.getName()_失败的边缘情况

现在我们了解了_FilenameUtils.getName()_的工作原理。这确实是一个聪明的解决方案，而且在大多数情况下都有效。然而，**许多Linux支持的文件系统允许文件名包含反斜杠（‘\\’）**：

```bash
$ echo 'Hi there!' > 'my\file.txt'

$ ls -l my*
-rw-r--r-- 1 kent kent 10 Sep 13 23:55 'my\file.txt'

$ cat 'my\file.txt'
Hi there!
```

如果给定的Linux文件路径中的文件名包含反斜杠，_FilenameUtils.getName()_将失败。一个测试可以清楚地解释它：

```java
String filenameToBreak = FilenameUtils.getName("/root/somedir/magic\\file.txt");
assertNotEquals("magic\\file.txt", filenameToBreak); // <-- filenameToBreak = "file.txt", 但我们期望：magic\file.txt
```

当我们使用这种方法时，我们应该记住这种情况。

## 7. 结论

在本文中，我们学习了如何从一个给定的绝对路径字符串中提取文件名。

如往常一样，示例的完整源代码可在GitHub上获得。