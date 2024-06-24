---
date: {2024-06-24}
category:
  - Java
  - 输入处理
tag:
  - Java
  - BufferedReader
  - FileReader
  - Scanner
head:
  - - meta
    - name: keywords
      content: Java, 输入处理, BufferedReader, FileReader, Scanner
---
# Java中逐字符读取输入的方法

## 1. 引言

在许多Java应用程序中，我们需要逐字符地读取输入数据，这通常是一个常见的任务，尤其是在处理来自流源的大量数据时。

**在本教程中，我们将探讨Java中逐字符读取数据的不同方法。**

## 2. 使用BufferedReader进行控制台输入

我们可以利用BufferedReader从控制台逐字符地执行读取。**请注意，如果我们要交互式地读取字符，这种方法很有帮助。**

让我们来看一个例子：

```java
@Test
public void givenInputFromConsole_whenUsingBufferedStream_thenReadCharByChar() throws IOException {
    ByteArrayInputStream inputStream = new ByteArrayInputStream("TestInput".getBytes());
    System.setIn(inputStream);

    try (BufferedReader buffer = new BufferedReader(new InputStreamReader(System.in))) {
        char[] result = new char[9];
        int index = 0;
        int c;
        while ((c = buffer.read()) != -1) {
            result[index++] = (char) c;
        }

        assertArrayEquals("TestInput".toCharArray(), result);
    }
}
```

在这里，我们通过实例化一个包含“TestInput”内容的ByteArrayInputStream来模拟控制台输入。然后，我们使用BufferedReader从System.in读取字符。之后，我们使用read()方法读取一个字符作为整数代码，并将其转换为char。最后，我们使用assertArrayEquals()方法来验证读取的字符是否与预期的输入匹配。

## 3. 使用FileReader从文件中读取

当处理文件时，FileReader是逐字符读取的合适选择：

```java
@Test
public void givenInputFromFile_whenUsingFileReader_thenReadCharByChar() throws IOException {
    File tempFile = File.createTempFile("tempTestFile", ".txt");
    FileWriter fileWriter = new FileWriter(tempFile);
    fileWriter.write("TestFileContent");
    fileWriter.close();

    try (FileReader fileReader = new FileReader(tempFile.getAbsolutePath())) {
        char[] result = new char[15];
        int index = 0;
        int charCode;
        while ((charCode = fileReader.read()) != -1) {
            result[index++] = (char) charCode;
        }

        assertArrayEquals("TestFileContent".toCharArray(), result);
    }
}
```

在上述代码中，我们创建了一个带有“tempTestFile”内容的临时测试文件进行模拟。然后，我们使用FileReader通过tempFile.getAbsolutePath()方法指定的路径建立与文件的连接。在try-with-resources块中，我们逐字符读取文件。

## 4. 使用Scanner进行标记化输入

对于更灵活的方法，允许标记化输入，我们可以使用Scanner：

```java
@Test
public void givenInputFromConsole_whenUsingScanner_thenReadCharByChar() {
    ByteArrayInputStream inputStream = new ByteArrayInputStream("TestInput".getBytes());
    System.setIn(inputStream);

    try (Scanner scanner = new Scanner(System.in)) {
        if (scanner.hasNext()) {
            char[] result = scanner.next().toCharArray();
            assertArrayEquals("TestInput".toCharArray(), result);
        }
    }
}
```

在上述测试方法中，我们通过实例化一个包含“TestInput”内容的ByteArrayInputStream来模拟控制台输入。**然后，我们使用hasNext()方法来验证是否还有另一个标记。之后，我们使用next()方法将当前的标记作为String获取。**

## 5. 结论

总之，我们探索了Java中读取字符的不同方法，涵盖了使用BufferedReader进行交互式控制台输入、使用FileReader进行基于文件的字符读取以及通过Scanner处理标记化输入，为开发者在不同场景中高效处理字符数据提供了多样化的方法。

如往常一样，本文的完整代码示例可以在GitHub上找到。