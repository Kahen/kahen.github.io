---
date: 2024-06-22
category:
  - Java
  - 编程
tag:
  - System.in.read()
  - 用户输入
head:
  - - meta
    - name: keywords
      content: Java, System.in.read(), 用户输入, 控制台输入
---
# Java中System.in.read()方法指南

Java提供了多种工具和函数来处理用户输入。_System.in.read()_ 是Java中用于从控制台读取输入的常用方法之一。在本文中，我们将探讨它的功能以及如何在Java中使用它。

## 2. System.in.read()是什么？
Java方法_System.in.read()_ 从标准输入流中读取一个字节，通常与键盘或其他来源相关联。它是_System_类的一部分，提供了一种低级别的机制来读取基于字节的输入：
```java
public static int read() throws IOException
```
**这里，该方法返回一个整数，表示读取的字符的ASCII值。** 我们需要将ASCII整数值转换为字符来查看实际值。如果到达流的末尾，则返回-1。

**需要注意的是，_System.in.read()_ 一次只读取一个字节。** 如果我们需要读取一整行或处理不同的数据类型，我们可能需要使用其他方法或类，例如_BufferedReader_或_Scanner_。

## 3. 其他输入源
虽然_System.in_通常用于控制台输入，但_System.in.read()_也可以重定向以从各种其他源读取，包括文件、网络连接和用户界面。

这些替代输入源启用了广泛的应用程序，例如读取配置文件、管理客户端-服务器通信、与数据库交互、处理用户界面以及与传感器和物联网设备等外部设备进行接口。

## 4. 读取单个字符
_System.in.read()_ 最简单的用法是读取单个字符：
```java
void readSingleCharacter() {
    System.out.println("Enter a character:");
    try {
        int input = System.in.read();
        System.out.println((char) input);
    }
    catch (IOException e) {
        System.err.println("Error reading input: " + e.getMessage());
    }
}
```
**由于_System.in.read()_ 抛出_IO异常_，这是一个检查异常，我们需要处理它。** 在上述示例中，我们捕获_IO异常_并输出错误消息到标准错误流。

让我们通过从输入流中读取一个字符来进行测试，以确认一切按预期工作：
```java
@Test
void givenUserInput_whenUsingReadSingleCharacter_thenRead() {
    System.setIn(new ByteArrayInputStream("A".getBytes()));
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    System.setOut(new PrintStream(outputStream));
    SystemInRead.readSingleCharacter();

    assertEquals("Enter a character:\nA", outputStream.toString().trim());
}
```
在这里，我们将_System.in.read()_ 重定向为从_ByteArrayInputStream_读取。通过这样做，我们可以在运行测试时避免提示用户输入，并且我们可以断言控制台输出。

## 5. 读取多个字符
虽然_System.in.read()_ 一次读取一个字节，但我们经常需要读取多个字符。一种常见的方法是在循环中连续读取，直到满足特定条件：
```java
void readMultipleCharacters() {
    System.out.println("Enter characters (Press 'Enter' to quit):");
    try {
        int input;
        while ((input = System.in.read()) != '\n') {
            System.out.print((char) input);
        }
    }
    catch (IOException e) {
        System.err.println("Error reading input: " + e.getMessage());
    }
}
```
在这里，我们在while循环中使用_System.in.read()_，循环继续执行，直到我们按下回车键。让我们用一个单元测试来测试新的行为：
```java
@Test
void givenUserInput_whenUsingReadMultipleCharacters_thenRead() {
    System.setIn(new ByteArrayInputStream("Hello\n".getBytes()));
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    System.setOut(new PrintStream(outputStream));
    SystemInRead.readMultipleCharacters();

    assertEquals("Enter characters (Press 'Enter' to quit):\n" + "Hello", outputStream.toString().trim());
}
```

## 6. System.in.read()带参数
_System.in.read()_ 方法还有另外两个版本，它们返回从输入流中读取的字节数。

### 6.1. 带多个参数的读取
这个方法从输入流中读取数据，并将其存储在字节数组中，从指定的偏移量开始，继续到指定的长度。如果遇到流的末尾，该方法可能会读取少于指定长度的字节：
```java
void readWithParameters() {
    try {
        byte[] byteArray = new byte[5];
        int bytesRead;
        int totalBytesRead = 0;

        while ((bytesRead = System.in.read(byteArray, 0, byteArray.length)) != -1) {
            System.out.print("Data read: " + new String(byteArray, 0, bytesRead));
            totalBytesRead += bytesRead;
        }

        System.out.println("\nBytes read: " + totalBytesRead);

    }
    catch (IOException e) {
        e.printStackTrace();
    }
}
```
在上面的示例中，我们从标准输入流中读取字节到一个字节数组并打印读取的字节数和数据。我们可以执行一个测试来验证其预期行为：
```java
@Test
void givenUserInput_whenUsingReadWithParameters_thenRead() {
    System.setIn(new ByteArrayInputStream("ABC".getBytes()));
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    System.setOut(new PrintStream(outputStream));
    SystemInRead.readWithParameters();

    assertEquals("Data read: ABC\n" + "Bytes Read: 3", outputStream.toString().trim());
}
```

### 6.2. 带单个参数的读取
这是_System.in.read()_ 方法的另一个版本，它接受一个字节数组作为参数。它在内部调用_System.in.read(byte[] b, int off, int len)_。

该方法的定义如下：
```java
public static int read(byte[] b) throws IOException
```

## 7. 限制
虽然_System.in.read()_ 简单，但它有一些限制：
- 它一次只读取一个_字节_，这使得它在读取完整的行或处理多字节字符时效率较低。
- 该方法在接收到输入之前会阻塞。如果用户不提供输入，可能会导致应用程序看起来无响应。
- 对于更复杂的输入处理，例如处理整数或字符串，最好使用其他类，如_BufferedReader_或_Scanner_。

## 8. 结论
在本文中，我们查看了Java中的_System.in.read()_ 方法，并探讨了如何在应用程序中使用它。它提供了一种基本但功能强大的方式，直接从标准输入流处理用户输入。

通过理解其用法、处理错误并将其纳入更复杂的输入场景，我们可以创建交互式和用户友好的应用程序。

如常，完整的源代码可在GitHub上获得。