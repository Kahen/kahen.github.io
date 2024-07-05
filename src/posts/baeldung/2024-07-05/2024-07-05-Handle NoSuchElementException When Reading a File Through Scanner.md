---
date: 2022-04-01
category:
  - Java
  - Exception Handling
tag:
  - NoSuchElementException
  - Scanner
  - Java
head:
  - - meta
    - name: keywords
      content: NoSuchElementException, Scanner, Java, 文件读取, 异常处理
------
# 使用Scanner类读取文件时处理NoSuchElementException异常

在这篇简短的教程中，我们将探讨在使用Scanner类读取文件时如何处理“NoSuchElementException: No line found”异常。

首先，我们将了解异常的根本原因。然后，我们将学习如何在实践中重现它，最后，我们将学习如何修复它。

### 2. 理解异常

Scanner类，顾名思义，是一个Java类，提供了扫描和解析原始类型和字符串的方法。

在这些方法中，我们找到了nextLine()，它返回当前行，不包括末尾的任何行分隔符。

在深入细节之前，让我们研究一下“NoSuchElementException: No line found”意味着什么。

NoSuchElementException表示我们尝试访问的元素不存在。因此，堆栈跟踪“No line found”表明Scanner无法检索到请求的行。

这种异常最常见的原因是在没有行可读时调用nextLine()方法。

### 3. 重现异常

现在我们知道Scanner为什么会出现NoSuchElementException。让我们看看如何重现它。

为了举例说明异常，我们将创建一个使用Scanner.nextLine()读取文件的方法：

```java
static String readFileV1(String pathname) throws IOException {
    Path pathFile = Paths.get(pathname);
    if (Files.notExists(pathFile)) {
        return "";
    }

    try (Scanner scanner = new Scanner(pathFile)) {
        return scanner.nextLine();
    }
}
```

正如我们所看到的，我们使用Path类来表示我们想要读取的文件。

现在，让我们将一个空文件作为参数传递给我们的方法，看看会发生什么：

```java
@Test
void givenEmptyFile_whenUsingReadFileV1_thenThrowException() throws IOException {
    Exception exception = assertThrows(NoSuchElementException.class, () -> {
        ScannerNoSuchElementException.readFileV1("src/test/resources/emptyFile.txt");
    });

    assertEquals("No line found", exception.getMessage());
}
```

因此，尝试读取一个空文件会导致NoSuchElementException: No line found。

这里的主要原因是nextLine()期望存在一行。否则，它将抛出异常。

### 4. 使用防御性编程解决方案

避免异常的最简单方法是在调用nextLine()之前检查是否有下一行。

为此，我们可以使用hasNextLine()方法，如果输入有另一行，则返回true。

所以，让我们创建另一个方法readFileV2()作为readFileV1()的增强：

```java
static String readFileV2(String pathname) throws IOException {
    Path pathFile = Paths.get(pathname);
    if (Files.notExists(pathFile)) {
        return "";
    }

    try (Scanner scanner = new Scanner(pathFile)) {
        return scanner.hasNextLine() ? scanner.nextLine() : "";
    }
}
```

如上所述，如果有下一行，我们返回它，否则返回一个空字符串。

现在，让我们使用一个测试用例来验证一切是否按预期工作：

```java
@Test
void givenEmptyFile_whenUsingReadFileV2_thenSuccess() throws IOException {
    String emptyLine = ScannerNoSuchElementException.readFileV2("src/test/resources/emptyFile.txt");

    assertEquals("", emptyLine);
}
```

解决方案工作正常，如测试用例所示。hasNextLine()防止nextLine()抛出异常。

另一种解决方案是在使用Scanner读取之前检查给定的文件是否为空：

```java
static String readFileV3(String pathname) throws IOException {
    Path pathFile = Paths.get(pathname);
    if (Files.notExists(pathFile) || Files.size(pathFile) == 0) {
        return "";
    }

    try (Scanner scanner = new Scanner(pathFile)) {
        return scanner.nextLine();
    }
}
```

这样，我们确保至少一行将被nextLine()消费。因此，我们省略了hasNextLine()。

现在，让我们测试这种新方法：

```java
@Test
void givenEmptyFile_whenUsingReadFileV3_thenSuccess() throws IOException {
    String emptyLine = ScannerNoSuchElementException.readFileV3("src/test/resources/emptyFile.txt");

    assertEquals("", emptyLine);
}
```

### 5. 使用异常处理解决方案

或者，我们可以使用try-catch块以传统方式处理NoSuchElementException：

```java
static String readFileV4(String pathname) throws IOException {
    Path pathFile = Paths.get(pathname);
    if (Files.notExists(pathFile)) {
        return "";
    }

    try (Scanner scanner = new Scanner(pathFile)) {
        return scanner.nextLine();
    } catch (NoSuchElementException exception) {
        return "";
    }
}
```

如上所示，我们捕获了异常并返回了一个空字符串。

最后，让我们使用一个测试用例来确认：

```java
@Test
void givenEmptyFile_whenUsingReadFileV4_thenSuccess() throws IOException {
    String emptyLine = ScannerNoSuchElementException.readFileV4("src/test/resources/emptyFile.txt");

    assertEquals("", emptyLine);
}
```

### 6. 结论

在本文中，我们学习了Scanner在读取文件时抛出“NoSuchElementException: No line found”的原因。

然后，我们通过实际示例了解了如何产生异常以及如何修复它。

如往常一样，示例的完整源代码可在GitHub上获得。