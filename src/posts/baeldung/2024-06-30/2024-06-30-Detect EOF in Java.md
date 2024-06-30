---
date: 2022-04-01
category:
  - Java
  - I/O
tag:
  - EOF
  - FileInputStream
  - BufferedReader
  - Scanner
  - FileChannel
head:
  - - meta
    - name: keywords
      content: Java, EOF, FileInputStream, BufferedReader, Scanner, FileChannel, ByteBuffer
---
# Java中检测文件结束的几种方法

EOF（文件结束）是指在读取文件时，已经到达文件的末尾的状态。理解EOF检测对于某些应用程序来说至关重要，因为这些应用程序可能需要读取配置文件、处理数据或验证文件。在Java中，有几种方法可以检测到EOF。

在本教程中，我们将探索Java中检测EOF的几种方法。

## 2. 示例设置

在我们继续之前，让我们首先创建一个包含测试用例数据的示例文本文件：

```java
@Test
@Order(0)
public void prepareFileForTest() {
    File file = new File(pathToFile);

    if (!file.exists()) {
        try {
            file.createNewFile();
            FileWriter writer = new FileWriter(file);
            writer.write(LOREM_IPSUM);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

这个方法必须在其他方法之前运行，因为它确保了测试文件的存在。因此，我们添加了`@Order(0)`注解。

## 3. 使用`FileInputStream`检测EOF

在第一种方法中，我们将使用`FileInputStream`，它是`InputStream`的一个子类。

`FileInputStream`有一个`read()`方法，它逐字节地读取数据，当它到达EOF时，会产生一个`-1`的值。

让我们将测试文件读取到文件末尾，并将数据存储在一个`ByteArrayOutputStream`对象中：

```java
String readWithFileInputStream(String pathFile) throws IOException {
    try (FileInputStream fis = new FileInputStream(pathFile);
         ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
        int data;
        while ((data = fis.read()) != -1) {
            baos.write(data);
        }
        return baos.toString();
    }
}
```

现在，让我们创建一个单元测试并确保测试通过：

```java
@Test
@Order(1)
public void givenDummyText_whenReadWithFileInputStream_thenReturnText() {
    try {
        String actualText = eofDetection.readWithFileInputStream(pathToFile);
        assertEquals(LOREM_IPSUM, actualText);
    } catch (IOException e) {
        fail(e.getMessage());
    }
}
```

`FileInputStream`的优点在于效率——它非常快。不幸的是，没有按行读取文本的方法，所以在读取文本文件的情况下，我们必须将字节转换为字符。

因此，这种方法**适用于读取二进制数据，并在字节逐字节处理方面提供灵活性**。但是，如果我们想要以结构化格式读取文本数据，则需要更多的数据转换代码。

## 4. 使用`BufferedReader`检测EOF

`BufferedReader`是`java.io`包中的一个类，用于从输入流中读取文本。`BufferedReader`的工作方式是通过**缓冲或临时将数据存储在内存中**。

在`BufferedReader`中，有一个`readline()`方法，它逐行读取文件，并在到达EOF时返回一个`null`值：

```java
String readWithBufferedReader(String pathFile) throws IOException {
    try (FileInputStream fis = new FileInputStream(pathFile);
         InputStreamReader isr = new InputStreamReader(fis);
         BufferedReader reader = new BufferedReader(isr)) {
        StringBuilder actualContent = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            actualContent.append(line);
        }
        return actualContent.toString();
    }
}
```

在这里，文件的内容是通过`readLine()`方法逐行读取的。然后，结果存储在`actualContent`变量中，直到它产生一个`null`值，这表示EOF。

接下来，让我们进行测试以确保结果的准确性：

```java
@Test
@Order(2)
public void givenDummyText_whenReadWithBufferedReader_thenReturnText() {
    try {
        String actualText = eofDetection.readWithBufferedReader(pathToFile);
        assertEquals(LOREM_IPSUM, actualText);
    } catch (IOException e) {
        fail(e.getMessage());
    }
}
```

由于我们有`readLine()`方法，这种技术**非常适合以结构化格式读取文本数据**，例如CSV。然而，它不适合读取二进制数据。

## 5. 使用`Scanner`检测EOF

`Scanner`是`java.util`包中的一个类，可以用来读取各种类型的数据输入，如文本、整数等。

`Scanner`**提供了一个`hasNext()`方法，用于读取文件的全部内容**，直到它产生一个`false`值，这表示EOF：

```java
String readWithScanner(String pathFile) throws IOException{
    StringBuilder actualContent = new StringBuilder();
    File file = new File(pathFile);
    Scanner scanner = new Scanner(file);
    while (scanner.hasNext()) {
        String line = scanner.nextLine();
        actualContent.append(line);
    }
    return actualContent.toString();
}
```

我们可以观察到`scanner`是如何读取文件的，只要`hasNext()`评估为`true`。这意味着我们可以使用`nextLine()`方法从扫描器中检索字符串值，直到`hasNext()`评估为`false`，表示我们已经到达了EOF。

让我们测试以确保该方法正确工作：

```java
@Test
@Order(3)
public void givenDummyText_whenReadWithScanner_thenReturnText() {
    try {
        String actualText = eofDetection.readWithScanner(pathToFile);
        assertEquals(LOREM_IPSUM, actualText);
    } catch (IOException e) {
        fail(e.getMessage());
    }
}
```

这种方法的优点是**非常灵活，可以轻松读取各种类型的数据**，但对二进制数据来说并不理想。然而，它的性能可能略低于`BufferedReader`，并且不适合读取二进制数据。

## 6. 使用`FileChannel`和`ByteBuffer`检测EOF

`FileChannel`和`ByteBuffer`是Java NIO（New I/O）中的类，是对传统I/O的改进。

`FileChannel`函数用于处理文件输入和输出操作，而`ByteBuffer`用于高效地以字节数组的形式处理二进制数据。

对于EOF检测，我们将使用这两个类——`FileChannel`来读取文件，`ByteBuffer`来存储结果。我们使用的方法**是读取缓冲区直到它返回-1的值，这表示文件的末尾（EOF）**：

```java
String readFileWithFileChannelAndByteBuffer(String pathFile) throws IOException {
    try (FileInputStream fis = new FileInputStream(pathFile);
         FileChannel channel = fis.getChannel()) {
        ByteBuffer buffer = ByteBuffer.allocate((int) channel.size());
        while (channel.read(buffer) != -1) {
            buffer.flip();
            buffer.clear();
        }
        return StandardCharsets.UTF_8.decode(buffer).toString();
    }
}
```

这一次，我们不需要使用`StringBuilder`，因为我们可以从转换或解码的`ByteBuffer`对象中获取读取文件的结果。

让我们再次测试以确保该方法工作：

```java
@Test
@Order(4)
public void givenDummyText_whenReadWithFileChannelAndByteBuffer_thenReturnText() {
    try {
        String actualText = eofDetection.readFileWithFileChannelAndByteBuffer(pathToFile);
        assertEquals(LOREM_IPSUM, actualText);
    } catch (IOException e) {
        fail(e.getMessage());
    }
}
```

这种方法**在读取或写入文件数据时提供高性能**，**适合随机访问，并支持`MappedByteBuffer`**。然而，它的使用更为复杂，需要仔细管理缓冲区。

它特别适合读取二进制数据和需要随机文件访问的应用程序。

## 7. `FileInputStream`与`BufferedReader`与`Scanner`与`FileChannel`和`ByteBuffer`的比较

下表总结了四种方法之间的比较，每种方法都有其优缺点：

| 特性 | FileInputStream | BufferedReader | Scanner | FileChannel 和 ByteBuffer |
| --- | --- | --- | --- | --- |
| **数据类型** | 二进制 | 结构化文本 | 结构化文本 | 二进制 |
| **性能** | 好 | 好 | 好 | 极好 |
| **灵活性** | 高 | 中等 | 高 | 低 |
| **易用性** | 低 | 高 | 高 | 低 |

## 8. 结论

在本文中，我们学习了Java中检测EOF的四种方法。

每种方法都有其优缺点。正确的选择取决于我们应用程序的具体需求，无论是涉及读取结构化文本数据还是二进制数据，以及在我们的用例中性能的重要性如何。

如常，完整的源代码可以在GitHub上找到。