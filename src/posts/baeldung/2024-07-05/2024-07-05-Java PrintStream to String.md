---
date: 2024-07-06
category:
  - Java
  - 编程
tag:
  - PrintStream
  - 字符串转换
head:
  - - meta
    - name: keywords
      content: Java, PrintStream, 字符串, 转换
---
# Java PrintStream 转 String

在这篇简短的教程中，我们将介绍如何在Java中将 PrintStream 转换为 String。

我们将从使用Java核心方法开始。然后，我们将看到如何使用Apache Commons IO等外部库来实现相同的目标。

## 2. PrintStream 是什么

在Java中，PrintStream 是一种输出流，提供了一种方便的方式来打印和格式化数据。它带有一组用于打印和格式化不同类型数据的方法，例如 println() 和 printf()。

与其他输出流不同，它永远不会抛出 IOException。然而，在出现错误的情况下，它会设置一个可以通过 checkError() 方法测试的标志。

现在我们知道了 PrintStream 是什么，让我们看看如何将其转换为字符串。

## 3. 使用 ByteArrayOutputStream

简而言之，ByteArrayOutputStream 是一个输出流，数据被写入到一个字节数组中。

通常，**我们可以使用它来捕获 PrintStream 的输出，然后将捕获的字节转换为字符串**。让我们看看实际操作：

```java
public static String usingByteArrayOutputStreamClass(String input) throws IOException {
    if (input == null) {
        return null;
    }

    String output;
    try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream(); PrintStream printStream = new PrintStream(outputStream)) {
        printStream.print(input);

        output = outputStream.toString();
    }

    return output;
}
```

正如我们所看到的，我们用传递给构造函数的 ByteArrayOutputStream 创建了一个 PrintStream 对象。

然后，我们使用 print() 方法将输入字符串写入 PrintStream。

最后，我们使用 ByteArrayOutputStream 类的 toString() 方法将输入转换为 String 对象。

现在，让我们使用一个测试用例来确认：

```java
@Test
public void whenUsingByteArrayOutputStreamClass_thenConvert() throws IOException {
    assertEquals("test", PrintStreamToStringUtil.usingByteArrayOutputStreamClass("test"));
    assertEquals("", PrintStreamToStringUtil.usingByteArrayOutputStreamClass(""));
    assertNull(PrintStreamToStringUtil.usingByteArrayOutputStreamClass(null));
}
```

如上所示，我们的方法能够将 PrintStream 转换为字符串。

## 4. 使用自定义输出流

另一种解决方案是使用 OutputStream 类的自定义实现。

基本上，OutputStream 是所有表示字节输出流的类的超类，包括 ByteArrayOutputStream。

首先，让我们考虑 CustomOutputStream 静态内部类：

```java
private static class CustomOutputStream extends OutputStream {

    private StringBuilder string = new StringBuilder();

    @Override
    public void write(int b) throws IOException {
        this.string.append((char) b);
    }

    @Override
    public String toString() {
        return this.string.toString();
    }
}
```

在这里，我们使用 StringBuilder 实例逐字节写入给定的数据。此外，我们重写了 toString() 方法以获取 StringBuilder 对象的字符串表示。

接下来，让我们重用前一节中的相同示例。**但是，我们将使用我们的自定义实现而不是 ByteArrayOutputStream**：

```java
public static String usingCustomOutputStream(String input) throws IOException {
    if (input == null) {
        return null;
    }

    String output;
    try (CustomOutputStream outputStream = new CustomOutputStream(); PrintStream printStream = new PrintStream(outputStream)) {
        printStream.print(input);

        output = outputStream.toString();
    }

    return output;
}
```

现在，让我们添加另一个测试用例以确认一切按预期工作：

```java
@Test
public void whenCustomOutputStream_thenConvert() throws IOException {
    assertEquals("world", PrintStreamToStringUtil.usingCustomOutputStream("world"));
    assertEquals("", PrintStreamToStringUtil.usingCustomOutputStream(""));
    assertNull(PrintStreamToStringUtil.usingCustomOutputStream(null));
}
```

## 5. 使用 Apache Commons IO

或者，我们可以使用 Apache Commons IO 库来实现相同的目标。

首先，让我们将 Apache Commons IO 依赖项添加到我们的 pom.xml：

```xml
`<dependency>`
    `<groupId>`commons-io`</groupId>`
    `<artifactId>`commons-io`</artifactId>`
    `<version>`2.15.1`</version>`
`</dependency>`
```

Apache Commons IO 提供了自己版本的 ByteArrayOutputStream。**这个类带有 toByteArray() 方法来检索数据作为字节数组**。

让我们在实践中看看：

```java
public static String usingApacheCommonsIO(String input) {
    if (input == null) {
        return null;
    }

    org.apache.commons.io.output.ByteArrayOutputStream outputStream = new org.apache.commons.io.output.ByteArrayOutputStream();
    try (PrintStream printStream = new PrintStream(outputStream)) {
        printStream.print(input);
    }

    return new String(outputStream.toByteArray());
}
```

简而言之，我们使用 toByteArray() 从输出流中获取字节数组。然后，我们将返回的数组传递给 String 构造函数。

这里的一个重要警告是，与 Java 不同，我们不需要关闭 ByteArrayOutputStream。

这个解决方案也运行得很好，如单元测试所示：

```java
@Test
public void whenUsingApacheCommonsIO_thenConvert() {
    assertEquals("hello", PrintStreamToStringUtil.usingApacheCommonsIO("hello"));
    assertEquals("", PrintStreamToStringUtil.usingApacheCommonsIO(""));
    assertNull(PrintStreamToStringUtil.usingApacheCommonsIO(null));
}
```

## 6. 结论

在本文中，我们学习了如何将 PrintStream 转换为 String。

在此过程中，我们解释了如何使用 Java 核心方法来实现它。然后，我们展示了如何使用 Apache Commons IO 等外部库。

一如既往，本文中使用的代码可以在 GitHub 上找到。