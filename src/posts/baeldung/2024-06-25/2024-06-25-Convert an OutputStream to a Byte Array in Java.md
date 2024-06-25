---
date: 2024-06-26
category:
  - Java
  - IO
tag:
  - OutputStream
  - Byte Array
head:
  - - meta
    - name: keywords
      content: Java, OutputStream, Byte Array, Conversion, Apache Commons IO, FileUtils, DrainableOutputStream
---
# 在Java中将OutputStream转换为字节数组

## **1. 引言**

处理流是常见的任务，尤其是在进行输入和输出操作时。偶尔，我们需要将`OutputStream`转换为字节数组。这在网络编程、文件处理或数据操作等多种场景中都非常有用。

在本教程中，我们将探讨两种实现这种转换的方法。

## **2. 使用Apache Commons IO库中的FileUtils**

Apache Commons IO库提供了`FileUtils`类，其中包含了`readFileToByteArray()`方法，可以间接地将`FileOutputStream`转换为字节数组。这是通过首先写入文件，然后从文件系统中读取生成的字节来实现的。

要使用这个库，我们首先需要将以下Commons IO依赖项添加到我们的项目中：

```
`<dependency>`
    `<groupId>`commons-io`</groupId>`
    `<artifactId>`commons-io`</artifactId>`
    `<version>`2.11.0`</version>`
`</dependency>`
```

让我们通过一个简单的例子来实现这一点：

```java
@Test
public void givenFileOutputStream_whenUsingFileUtilsToReadTheFile_thenReturnByteArray(@TempDir Path tempDir) throws IOException {
    String data = "Welcome to Baeldung!";
    String fileName = "file.txt";
    Path filePath = tempDir.resolve(fileName);

    try (FileOutputStream outputStream = new FileOutputStream(filePath.toFile())) {
        outputStream.write(data.getBytes(StandardCharsets.UTF_8));
    }

    byte[] writtenData = FileUtils.readFileToByteArray(filePath.toFile());
    String result = new String(writtenData, StandardCharsets.UTF_8);
    assertEquals(data, result);
}
```

在上面的测试方法中，我们初始化了一个字符串`data`和一个`filePath`。此外，我们使用`FileOutputStream`将字符串的字节表示写入文件。**随后，我们使用`FileUtils.readFileToByteArray()`方法有效地将文件的内容转换为字节数组。**

最后，字节数组被转换回字符串，并通过断言确认原始`data`和`result`的相等性。

需要注意的是，**这种方法仅适用于`FileOutputStream`**，因为我们可以在流关闭后检查写入的文件。对于适用于不同类型`OutputStream`的更通用解决方案，下一节将介绍另一种方法，提供更广泛的适用性。

## **3. 使用自定义的DrainableOutputStream**

另一种方法涉及创建一个自定义的`DrainableOutputStream`类，该类扩展了`FilterOutputStream`。这个类**拦截写入底层`OutputStream`的字节，并将副本保留在内存中，允许稍后转换为字节数组。**

首先，让我们创建一个扩展`FilterOutputStream`的自定义类`DrainableOutputStream`：

```java
public class DrainableOutputStream extends FilterOutputStream {
    private final ByteArrayOutputStream buffer;

    public DrainableOutputStream(OutputStream out) {
        super(out);
        this.buffer = new ByteArrayOutputStream();
    }

    @Override
    public void write(byte b[]) throws IOException {
        buffer.write(b);
        super.write(b);
    }

    public byte[] toByteArray() {
        return buffer.toByteArray();
    }
}
```

在上面的代码中，我们首先声明了一个将包装给定`OutputStream`的`DrainableOutputStream`类。我们包括了一个`ByteArrayOutputStream` `buffer`来累积写入的字节副本，以及一个重写的`write()`方法来捕获字节。我们还实现了`toByteArray()`方法来提供对捕获字节的访问。

现在，让我们使用`DrainableOutputStream`：

```java
@Test
public void givenSystemOut_whenUsingDrainableOutputStream_thenReturnByteArray() throws IOException {
    String data = "Welcome to Baeldung!\n";

    DrainableOutputStream drainableOutputStream = new DrainableOutputStream(System.out);
    try (drainableOutputStream) {
        drainableOutputStream.write(data.getBytes(StandardCharsets.UTF_8));
    }

    byte[] writtenData = drainableOutputStream.toByteArray();
    String result = new String(writtenData, StandardCharsets.UTF_8);
    assertEquals(data, result);
}
```

在上面的测试方法中，我们首先初始化了一串我们想要写入`OutputStream`的`data`字符串。**然后我们使用`DrainableOutputStream`来拦截这个过程，通过在实际写入`OutputStream`之前捕获字节。**累积的字节随后使用`toByteArray()`方法转换为字节数组。

随后，我们从`intercepted`字节数组创建了一个新的字符串`result`，并断言它与原始`data`的相等性。

**请注意，一个全面的`DrainableOutputStream`实现需要为示例中显示之外的其他写入方法提供类似的重写。**

## **4. 考虑和限制**

虽然前几节中介绍的方法为将`OutputStream`转换为字节数组提供了实用的方法，但**必须承认与此任务相关的某些考虑和限制。**

将任意`OutputStream`转换为字节数组通常不是直接的操作，因为在写入字节后可能无法或不实际检索字节。

某些子类，如`FileOutputStream`或`ByteArrayOutputStream`，具有内置机制，允许我们检索输出字节，例如内存缓冲区或已写入的文件。另一方面，如果没有这样的输出字节副本可用，我们可能需要考虑使用`DrainableOutputStream`这样的技术，在写入字节时复制它们。

## **5. 结论**

总之，在编程中，将`OutputStream`转换为Java中的字节数组可能是一个有用的操作。我们看到了如何使用Apache Commons IO库中的`FileUtils.readFileToByteArray()`读取`FileOutputStream`生成的文件，以及使用自定义的`DrainableOutputStream`来复制给定`OutputStream`的写入字节的更通用方法。

如常，相应的源代码可以在GitHub上找到。