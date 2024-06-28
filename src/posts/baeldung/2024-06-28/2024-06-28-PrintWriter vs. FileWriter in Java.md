---
date: 2022-04-01
category:
  - Java
  - 文件操作
tag:
  - PrintWriter
  - FileWriter
head:
  - - meta
    - name: keywords
      content: Java, 文件写入, 格式化文本
---

# Java中的PrintWriter与FileWriter对比 | Baeldung

## 1. 概览

Java标准库提供了文件操作的API。**PrintWriter和FileWriter类帮助将字符写入到文件中**。然而，这两个类适用于不同的使用场景。

在本教程中，我们将探讨PrintWriter和FileWriter的详细情况，包括它们的用例。同时，我们还将看到这两个类之间的区别和相似之处。

**PrintWriter类帮助将格式化文本写入到输出流，如文件和控制台**。

此外，PrintWriter类的方法不会抛出IOException。相反，它有一个checkError()方法来了解写操作的状态。checkError()方法如果写操作通过则返回false，如果由于错误失败则返回true。

此外，如果流在检查错误状态之前未关闭，则checkError()还会刷新流。

PrintWriter还提供了一个名为flush()的方法，以在写操作后显式刷新流。但是，当使用try-with-resources语句块时，无需显式刷新流。

### 2.1 PrintWriter.println()

println()方法将字符串写入到输出流，并以新行结束。它不能将格式化文本写入到输出流。

此外，如果我们决定不以新行结束字符串，PrintWriter还提供了print()方法。

以下是使用println()方法将字符串写入文件的示例：

```java
@Test
void whenWritingToTextFileUsingPrintWriterPrintln_thenTextMatches() throws IOException {
    String result = "I'm going to Alabama\nAlabama is a state in the US\n";
    try (PrintWriter pw = new PrintWriter("alabama.txt")) {
        pw.println("I'm going to Alabama");
        pw.println("Alabama is a state in the US");
    }
    Path path = Paths.get("alabama.txt");
    String actualData = new String(Files.readAllBytes(path));
    assertEquals(result, actualData);
}
```

在这里，我们创建了一个PrintWriter对象，它以文件路径作为参数。接下来，我们在PrintWriter对象上调用println()方法将字符写入文件。

最后，我们断言预期结果等于文件内容。

**值得注意的是，PrintWriter还提供了一个write()方法将文本写入文件，我们可以将其替换print()方法使用**。

### 2.2 PrintWriter.printf()

**printf()方法帮助将格式化文本写入到输出流**。我们可以使用像%s, %d, %.2f等格式说明符将不同数据类型写入到输出流。

让我们看看使用printf()将格式化数据写入文件的示例代码：

```java
@Test
void whenWritingToTextFileUsingPrintWriterPrintf_thenTextMatches() throws IOException {
    String result = "Dreams from My Father by Barack Obama";
    File file = new File("dream.txt");
    try (PrintWriter pw = new PrintWriter(file)) {
        String author = "Barack Obama";
        pw.printf("Dreams from My Father by %s", author);
        assertTrue(!pw.checkError());
    }
    try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
        String actualData = reader.readLine();
        assertEquals(result, actualData);
    }
}
```

在上面的代码中，我们将格式化文本写入到文件。我们使用%s标识符直接添加String数据类型到文本中。

我们还创建了一个BufferedReader实例，它以FileReader对象作为参数来读取文件的内容。

由于该方法不抛出IOException，我们调用checkError()方法来了解写操作的状态。在这种情况下，checkError()返回false，表示没有错误。

## 3. FileWriter

FileWriter类扩展了Writer类。**它提供了一个方便的方法，使用预设的缓冲区大小将字符写入文件**。

FileWriter不会自动刷新缓冲区。我们需要调用flush()方法。然而，当FileWriter与try-with-resources语句块一起使用时，它在退出块时自动刷新并关闭流。

**此外，如果文件丢失，文件无法打开等情况下，它会抛出IOException**。

与PrintWriter不同，它不能将格式化文本写入文件。

让我们看看使用FileWriter类中的write()方法将字符写入File的示例：

```java
@Test
void whenWritingToTextFileUsingFileWriter_thenTextMatches() throws IOException {
    String result = "Harry Potter and the Chamber of Secrets";
    File file = new File("potter.txt");
    try (FileWriter fw = new FileWriter(file)) {
        fw.write("Harry Potter and the Chamber of Secrets");
    }
    try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
        String actualData = reader.readLine();
        assertEquals(result, actualData);
    }
}
```

在上面的代码中，我们创建了一个File实例，并将其传递给FileWriter对象。接下来，我们在FileWriter对象上调用write()方法将字符串字符写入文件。

最后，我们断言预期结果等于文件内容。

## 4. 结论

在本文中，我们学习了FileWriter和PrintWriter的基本用法，并提供了示例代码。

FileWriter的主要目的是将字符写入文件。**然而，PrintWriter具有更多功能。它可以写入除了文件之外的其他输出流**。此外，它还提供了一种方法，可以将格式化文本写入文件或控制台。

如常，示例的源代码可在GitHub上找到。

OK