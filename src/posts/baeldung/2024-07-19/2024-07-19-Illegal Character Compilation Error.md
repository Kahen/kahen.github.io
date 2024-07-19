---
date: 2022-04-01
category:
  - Java
tag:
  - 编码
  - 编译错误
head:
  - - meta
    - name: keywords
      content: Java, 编码, 编译错误
------
# Java 非法字符编译错误

## 1. 概述

非法字符编译错误是一种文件类型编码错误。当我们在创建文件时使用了错误的编码，就会产生这种错误。因此，在像 Java 这样的语言中，当我们尝试编译项目时可能会遇到这种类型的错误。在本教程中，我们将详细描述问题，并展示一些可能遇到这种情况的场景，然后提供一些解决此问题的示例。

### 2.1. 字节顺序标记 (BOM)

在我们深入字节顺序标记之前，需要快速了解一下 UCS（Unicode）转换格式（UTF）。**UTF 是一种字符编码格式，可以编码 Unicode 中所有可能的字符代码点**。在所有这些编码中，UTF-8 是最常用的。

UTF-8 使用 8 位可变宽度编码，以最大化与 ASCII 的兼容性。当我们在文件中使用这种编码时，我们可能会发现一些字节代表 Unicode 代码点。因此，我们的文件以 U+FEFF 字节顺序标记 (BOM) 开始。这个标记在正确使用时是不可见的。然而，在某些情况下，它可能会导致数据错误。

**在 UTF-8 编码中，BOM 的存在并不是根本性的**。尽管它不是必需的，BOM 仍可能出现在 UTF-8 编码的文本中。BOM 的添加可能发生在编码转换过程中，或者由标记内容为 UTF-8 的文本编辑器完成。

像 Windows 上的记事本这样的文本编辑器可能会产生这种添加。因此，当我们使用类似记事本的文本编辑器创建代码示例并尝试运行它时，我们可能会得到编译错误。相比之下，现代 IDE 在创建文件时会将其编码为不带 BOM 的 UTF-8。接下来的部分将展示这个问题的一些示例。

### 2.2. 包含非法字符的类的编译错误

通常，我们使用高级 IDE，但有时我们也会使用文本编辑器。不幸的是，正如我们所了解到的，一些文本编辑器可能会比解决方案带来更多问题，因为保存带有 BOM 的文件可能会导致 Java 中的编译错误。**“非法字符”错误发生在编译阶段，因此很容易检测到**。下一个示例向我们展示了它的工作原理。

首先，让我们在文本编辑器中编写一个简单的类，比如记事本。这个类只是一个表示——我们可以编写任何代码进行测试。接下来，我们将文件保存为带有 BOM 的格式以进行测试：

```java
public class TestBOM {
    public static void main(String ...args){
        System.out.println("BOM Test");
    }
}
```

现在，当我们尝试使用 _javac_ 命令编译此文件时：

```bash
$ javac ./TestBOM.java
```

因此，我们得到错误消息：

```
∩╗┐public class TestBOM {
 ^
.\\TestBOM.java:1: error: illegal character: '\u00bf'
∩╗┐public class TestBOM {
  ^
2 errors
```

理想情况下，要解决这个问题，唯一要做的就是将文件保存为不带 BOM 编码的 UTF-8。之后，问题就解决了。**我们应该始终检查我们的文件是否保存时不带 BOM**。

**另一种解决这个问题的方法是使用像 _dos2unix_ 这样的工具**。这个工具将删除 BOM，并且还会处理 Windows 文本文件的其他特性。

## 3. 读取文件

此外，让我们分析一些使用 BOM 编码的文件的示例。

最初，我们需要创建一个带有 BOM 的文件以用于我们的测试。这个文件包含我们的示例文本，“Hello world with BOM.”——这将是我们期望的字符串。接下来，让我们开始测试。

### 3.1. 使用 BufferedReader 读取文件

首先，我们将使用 _BufferedReader_ 类测试文件：

```java
@Test
public void whenInputFileHasBOM_thenUseInputStream() throws IOException {
    String line;
    String actual = "";
    try (BufferedReader br = new BufferedReader(new InputStreamReader(file))) {
        while ((line = br.readLine()) != null) {
            actual += line;
        }
    }
    assertEquals(expected, actual);
}
```

在这种情况下，当我们尝试断言字符串相等时，**我们得到一个错误**：

```
org.opentest4j.AssertionFailedError: expected: ``<Hello world with BOM.>`` but was: ``<Hello world with BOM.>``
Expected :Hello world with BOM.
Actual   :Hello world with BOM.
```

实际上，如果我们浏览测试响应，两个字符串看起来显然相等。尽管如此，字符串的实际值包含 BOM。因此，字符串不相等。

此外，**一个快速的解决方法是替换 BOM 字符**：

```java
@Test
public void whenInputFileHasBOM_thenUseInputStreamWithReplace() throws IOException {
    String line;
    String actual = "";
    try (BufferedReader br = new BufferedReader(new InputStreamReader(file))) {
        while ((line = br.readLine()) != null) {
            actual += line.replace("\uFEFF", "");
        }
    }
    assertEquals(expected, actual);
}
```

_replace_ 方法从我们的字符串中清除了 BOM，因此我们的测试通过了。我们需要小心使用 _replace_ 方法。处理大量文件可能会导致性能问题。

### 3.2. 使用 Apache Commons IO 读取文件

此外，**Apache Commons IO 库提供了 _BOMInputStream_ 类**。这个类是一个包装器，包含编码的 _ByteOrderMark_ 作为其第一个字节。让我们看看它是如何工作的：

```java
@Test
public void whenInputFileHasBOM_thenUseBOMInputStream() throws IOException {
    String line;
    String actual = "";
    ByteOrderMark[] byteOrderMarks = new ByteOrderMark[] {
      ByteOrderMark.UTF_8, ByteOrderMark.UTF_16BE, ByteOrderMark.UTF_16LE, ByteOrderMark.UTF_32BE, ByteOrderMark.UTF_32LE
    };
    InputStream inputStream = new BOMInputStream(ioStream, false, byteOrderMarks);
    Reader reader = new InputStreamReader(inputStream);
    BufferedReader br = new BufferedReader(reader);
    while ((line = br.readLine()) != null) {
        actual += line;
    }
    assertEquals(expected, actual);
}
```

代码与前面的示例类似，但我们将 _BOMInputStream_ 作为参数传递到 _InputStreamReader_ 中。

### 3.3. 使用 Google Data (GData) 读取文件

另一方面，**另一个处理 BOM 的有用库是 Google Data (GData)**。这是一个较旧的库，但它帮助管理文件中的 BOM。它使用 XML 作为其底层格式。让我们看看它是如何工作的：

```java
@Test
public void whenInputFileHasBOM_thenUseGoogleGdata() throws IOException {
    char[] actual = new char[21];
    try (Reader r = new UnicodeReader(ioStream, null)) {
        r.read(actual);
    }
    assertEquals(expected, String.valueOf(actual));
}
```

最后，正如我们在前面的示例中观察到的，从文件中删除 BOM 是重要的。如果我们不适当地处理它，当数据被读取时会发生意外的结果。这就是为什么我们需要意识到我们文件中存在这个标记。 

## 4. 结论

在本文中，我们涵盖了有关 Java 中非法字符编译错误的几个主题。首先，我们了解了 UTF 是什么以及 BOM 如何集成到其中。其次，我们展示了使用文本编辑器（在这种情况下是 Windows 记事本）创建的示例类。生成的类抛出了非法字符的编译错误。最后，我们提供了一些代码示例，说明如何读取带有 BOM 的文件。

像往常一样，所有用于这个示例的代码都可以在 GitHub 上找到。