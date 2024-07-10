---
date: 2022-04-01
category:
  - Java
tag:
  - PrintStream
  - PrintWriter
head:
  - - meta
    - name: keywords
      content: Java, PrintStream, PrintWriter, 比较, 教程
---
# Java中的PrintStream与PrintWriter比较

在这个教程中，我们将比较Java中的PrintStream和PrintWriter类。本文将帮助程序员为每个类找到合适的用例。

在深入内容之前，我们建议查看我们之前的文章，其中展示了如何使用PrintStream和PrintWriter。

## 1. 引言

## 2. PrintStream和PrintWriter之间的相似性

因为PrintStream和PrintWriter共享一些功能，程序员有时很难找到这些类的适当用例。让我们首先确定它们的相似之处；然后，我们将看看它们的差异。

### 2.1. 字符编码

无论系统如何，**字符编码允许程序以一致的方式在不同平台上解释文本**。

在JDK 1.4版本发布后，PrintStream类在其构造函数中包含了一个字符编码参数。这允许PrintStream类在跨平台实现中对文本进行编码/解码。另一方面，PrintWriter自始至终都有字符编码功能。

我们可以查看官方Java代码以确认：

```java
public PrintStream(OutputStream out, boolean autoFlush, String encoding) throws UnsupportedEncodingException {
    this(requireNonNull(out, "Null output stream"), autoFlush, toCharset(encoding));
}
```

同样，PrintWriter构造函数有一个charset参数，用于指定编码目的的Charset：

```java
public PrintWriter(OutputStream out, boolean autoFlush, Charset charset) {
    this(new BufferedWriter(new OutputStreamWriter(out, charset)), autoFlush);

    // 保存打印流以传播错误
    if (out instanceof java.io.PrintStream) {
        psOut = (PrintStream) out;
    }
}
```

**如果这些类没有提供字符编码，它们将使用默认的平台编码**。

### 2.2. 写入文件

要将文本写入文件，我们可以将String或File实例传递给相应的构造函数。此外，我们可以传递字符编码的charset。

以一个具有单个File参数的构造函数为例。在这种情况下，字符编码将默认为平台：

```java
public PrintStream(File file) throws FileNotFoundException {
    this(false, new FileOutputStream(file));
}
```

同样，PrintWriter类有一个构造函数来指定要写入的文件：

```java
public PrintWriter(File file) throws FileNotFoundException {
    this(new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file))), false);
}
```

正如我们所看到的，**两个类都提供了写入文件的功能。然而，它们的实现通过使用不同的流父类而有所不同**。我们将在本文的《差异》部分深入探讨为什么会这样。

## 3. PrintStream和PrintWriter之间的差异

在上一节中，我们展示了PrintStream和PrintWriter共享一些功能，这些功能可能适合我们的情况。尽管如此，**尽管我们可以用这些类做相同的事情，但它们的实现方式不同**，这使我们评估哪个类更适合。

现在，让我们看看PrintStream和PrintWriter之间的差异。

### 3.1. 数据处理

在上一节中，我们展示了两个类如何写入文件。让我们看看它们的实现有何不同。

**在PrintStream的情况下，它是OutputStream的子类，在Java中定义为一个字节流。换句话说，数据是逐字节处理的。另一方面，PrintWriter是一个字符流，逐个字符处理，并使用Unicode自动转换为我们指定的每个字符集**。

我们将在两种不同的情况下展示这些实现。

### 3.2. 处理非文本数据

**由于两个类以不同的方式处理数据，我们可以在处理非文本文件时特别区分**。在这个例子中，我们将使用一个png文件来读取数据，然后看看使用每个类将内容写入另一个文件后的差异：

```java
public class DataStream {
    public static void main (String[] args) throws IOException {
        FileInputStream inputStream = new FileInputStream("image.png");
        PrintStream printStream = new PrintStream("ps.png");

        int b;
        while ((b = inputStream.read()) != -1) {
            printStream.write(b);
        }
        printStream.close();

        FileReader reader = new FileReader("image.png");
        PrintWriter writer = new PrintWriter("pw.png");

        int c;
        while ((c = reader.read()) != -1) {
            writer.write(c);
        }
        writer.close();
        inputStream.close();
    }
}
```

在这个例子中，我们使用FileInputStream和FileReader来读取图像的内容。然后，我们将数据写入不同的输出文件。

结果，ps.png和pw.png文件将根据它们的内容被流处理的方式包含数据。**我们知道PrintStream按一次读取一个字节的方式处理数据。因此，结果文件包含与原始文件相同的原始数据**。

**与PrintStream类不同，PrintWriter将数据解释为字符**。**这导致文件损坏**，系统无法理解其内容。或者，我们可以将pw.png的扩展名更改为pw.txt，并检查PrintWriter如何尝试将图像的原始数据转换为不可读的符号。

### 3.3. 处理文本数据

**现在，让我们看一个例子，我们使用OutputStream，PrintStream的父类，来演示写入文件时字符串是如何被处理的**：

```java
public class PrintStreamWriter {
    public static void main (String[] args) throws IOException {
        OutputStream out = new FileOutputStream("TestFile.txt");
        out.write("foobar");
        out.flush();
        out.close();
    }
}
```

**上面的代码将无法编译，因为OutputStream不知道如何处理字符串**。**要成功写入文件，输入数据必须是原始字节序列**。以下更改将使我们的代码成功写入文件：

```java
out.write("foobar".getBytes());
```

**回到PrintStream**，尽管这个类是OutputStream的子类，**Java在内部调用getBytes()方法**。这允许PrintStream在调用print方法时接受字符串。让我们看一个例子：

```java
public class PrintStreamWriter {
    public static void main (String[] args) throws IOException {
        PrintStream out = new PrintStream("TestFile.txt");
        out.print("Hello, world!");
        out.flush();
        out.close();
    }
}
```

现在，因为PrintWriter知道如何处理字符串，我们在调用print方法时传递字符串输入。然而，在这种情况下，**Java不会将字符串转换为字节，而是在内部将流中的每个字符转换为其对应的Unicode编码**：

```java
public class PrintStreamWriter {
    public static void main (String[] args) throws IOException {
        PrintWriter out = new PrintWriter("TestFile.txt");
        out.print("Hello, world!");
        out.flush();
        out.close();
    }
}
```

根据这些类如何处理内部文本数据，**像PrintWriter这样的字符流类在执行文本I/O操作时更好地处理这些内容**。此外，在编码过程中将数据转换为Unicode，使得应用程序的国际化更加简单。

### 3.4. 刷新

在我们之前的例子中，注意我们如何必须显式调用flush方法。根据Java文档，**这两个类之间的这一过程是不同的**。

对于PrintStream，我们只能在写入字节数组、调用println方法或写入换行字符时指定自动刷新。然而，PrintWriter也可以有自动刷新，但只有在我们调用println、printf或format方法时。

这个区别很难证明，因为文档提到刷新会在上述情况下发生，但没有提到它不会发生的情况。因此，**我们可以演示两个类中自动刷新的工作方式，但我们不能保证它将按预期行为**。

在这个例子中，我们将启用自动刷新功能，并写入一个以换行字符结尾的字符串：

```java
public class AutoFlushExample {
    public static void main (String[] args) throws IOException {
        PrintStream printStream = new PrintStream(new FileOutputStream("autoFlushPrintStream.txt"), true);
        printStream.write("Hello, world!\n".getBytes());
        printStream.close();

        PrintWriter printWriter = new PrintWriter(new FileOutputStream("autoFlushPrintWriter.txt"), true);
        printWriter.print("Hello, world!");
        printWriter.close();
    }
}
```

**我们保证文件autoFlushPrintStream.txt将包含写入文件的内容**，因为我们启用了自动刷新功能。此外，我们调用write方法并包含换行字符的字符串以强制刷新。

然而，**我们期望看到autoFlushPrintWriter.txt文件为空**，尽管这不是保证的。毕竟，在程序执行期间可能会发生刷新。

如果我们想在使用PrintWriter时强制刷新，代码必须满足我们提到的所有要求，或者我们可以添加一行代码来显式刷新写入器：

```java
printWriter.flush();
```

## 4. 结论

在本文中，我们比较了两个数据流类PrintStream和PrintWriter。首先，我们查看了它们的相似之处和使用本地字符集的能力。我们还涵盖了如何从外部文件读取和写入的示例。**尽管我们可以用两个类实现类似的事情，但在查看差异后，我们展示了每个类在不同场景中表现更好**。

例如，当我们写入所有类型的数据时，我们从PrintStream中受益，因为PrintStream处理原始字节。另一方面，PrintWriter作为字符流，最适合在执行I/O操作时处理文本。此外，由于其内部格式为Unicode，它有助于复杂的软件实现，如国际化。最后，我们比较了两个类