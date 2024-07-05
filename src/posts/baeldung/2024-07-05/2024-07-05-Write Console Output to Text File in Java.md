---
date: 2024-07-05
category:
  - Java
  - 编程
tag:
  - Java
  - 控制台输出
  - 文件输出
head:
  - - meta
    - name: keywords
      content: Java, 控制台输出, 文件输出, 重定向
---
# Java中将控制台输出写入文本文件

在调试或向用户显示信息时，将输出打印到控制台是常见的做法。然而，有时可能需要将控制台输出保存到文本文件中，以便进一步分析或记录。

本教程将探讨如何在Java中将控制台输出重定向到文本文件。

## 2. 准备

当我们谈论将控制台输出写入文本文件时，可能有两种情况：

- 仅文件 - 将所有输出重定向到文件。不会在控制台打印任何输出。
- 控制台和文件 - 输出同时写入控制台和文件。

我们将在本教程中涵盖这两种情况。

在我们开始编码之前，让我们准备一些要写入控制台的文本。为了更容易测试，让我们将三行文本放入字符串列表中：

```java
final static List`<String>` OUTPUT_LINES = Lists.newArrayList(
  "I came",
  "I saw",
  "I conquered");
```

稍后，我们将讨论如何将控制台的输出重定向到文件。因此，我们将使用单元测试断言来验证文件是否包含预期的内容。

**JUnit 5的临时目录特性允许我们创建文件，向文件写入数据，并在验证后自动删除文件**。因此，我们将在测试中使用它。

接下来，让我们看看如何实现重定向。

## 3. 输出仅发送到文件

我们通常使用`System.out.println()`将文本打印到控制台。**`System.out`是一个`PrintStream`，默认情况下是标准输出**。`System`类提供了`setOut()`方法，允许我们用我们自己的`PrintStream`对象替换默认的“`out`”。

**由于我们想要将数据写入文件，我们可以从`FileOutputStream`创建一个`PrintStream`。**

接下来，让我们创建一个测试方法来查看这个想法是否有效：

```java
@Test
void whenReplacingSystemOutPrintStreamWithFileOutputStream_thenOutputsGoToFile(@TempDir Path tempDir) throws IOException {
    PrintStream originalOut = System.out;
    Path outputFilePath = tempDir.resolve("file-output.txt");
    PrintStream out = new PrintStream(Files.newOutputStream(outputFilePath), true);
    System.setOut(out);

    OUTPUT_LINES.forEach(line -> System.out.println(line));
    assertTrue(outputFilePath.toFile().exists(), "The file exists");
    assertLinesMatch(OUTPUT_LINES, Files.readAllLines(outputFilePath));
    System.setOut(originalOut);
}
```

在测试中，我们首先备份默认的`System.out`。然后，我们构造一个`PrintStream` `out`，它包装了一个`FileOutputStream`。接下来，我们用我们的“`out`”替换默认的`System.out`。

这些操作使得`System.out.println()`将数据打印到文件`file-output.txt`而不是控制台。**我们使用`assertLinesMatch()`方法验证了文件内容。**

最后，我们将`System.out`恢复为默认状态。

如果我们运行测试，它会通过。此外，没有任何输出打印到控制台。

## 4. 创建`DualPrintStream`类

现在，让我们看看如何将数据打印到控制台和文件。换句话说，**我们需要两个`PrintStream`对象**。

由于`System.setOut()`只接受一个`PrintStream`参数，我们不能传递两个`PrintStream`。

然而，我们可以**创建一个新的`PrintStream`子类来携带一个额外的`PrintStream`对象**：

```java
class DualPrintStream extends PrintStream {
    private final PrintStream second;

    public DualPrintStream(OutputStream main, PrintStream second) {
        super(main);
        this.second = second;
    }

    ...
}
```

`DualPrintStream`扩展了`PrintStream`。进一步，我们可以将一个额外的`PrintStream`对象`(second)`传递给构造函数。然后，**我们必须重写`PrintStream`的`write()`方法，以便第二个`PrintStream`可以附加相同的操作：**

```java
class DualPrintStream extends PrintStream {
    ...

    @Override
    public void write(byte[] b) throws IOException {
        super.write(b);
        second.write(b);
    }
}
```

现在，让我们检查它是否按预期工作：

```java
@Test
void whenUsingDualPrintStream_thenOutputsGoToConsoleAndFile(@TempDir Path tempDir) throws IOException {
    PrintStream originalOut = System.out;
    Path outputFilePath = tempDir.resolve("dual-output.txt");
    DualPrintStream dualOut = new DualPrintStream(Files.newOutputStream(outputFilePath), System.out);
    System.setOut(dualOut);
    OUTPUT_LINES.forEach(line -> System.out.println(line));
    assertTrue(outputFilePath.toFile().exists(), "The file exists");
    assertLinesMatch(OUTPUT_LINES, Files.readAllLines(outputFilePath));
    System.setOut(originalOut);
}
```

当我们运行它时，它通过了，这意味着文本已经被写入文件。同时，我们也可以看到控制台中的三行文本。

最后，值得注意的是，`PrintStream`还有其他我们需要重写的方法，以保持文件和控制台流的同步，如`close()`、`flush()`和其他变体的`write()`。我们还应该重写`checkError()`方法，以优雅地管理`IOExceptions`。

## 5. 结论

在本文中，我们学习了如何通过替换默认的`System.out`，使`System.out.println()`将数据打印到文件。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。