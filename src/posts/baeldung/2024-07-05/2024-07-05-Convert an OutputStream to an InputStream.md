---
date: 2022-04-01
category:
  - Java
  - IO
tag:
  - OutputStream
  - InputStream
head:
  - - meta
    - name: keywords
      content: Java, OutputStream, InputStream, 转换
------
# 将 OutputStream 转换为 InputStream | Baeldung

## 1. 概述

_InputStream_ 和 _OutputStream_ 是 Java IO 中的两个基本类。有时，我们需要在这两类流之间进行转换。在之前的教程中，我们讨论了将 _InputStream_ 写入 _OutputStream_ 的问题。

在这个快速教程中，我们将看向相反的方向。我们将探讨如何将 _OutputStream_ 转换为 _InputStream_。

## 2. 问题介绍

有时，将 _OutputStream_ 转换为 _InputStream_ 是必要的。这种转换在多种情况下都很有帮助，例如当我们需要读取写入 _OutputStream_ 的数据时。

在本文中，我们将探索两种执行此转换的不同方法：
- 使用字节数组
- 使用管道

为了简单起见，我们将在示例中使用 _ByteArrayOutputStream_ 作为 _OutputStream_ 类型。同时，我们将使用单元测试断言来验证我们是否能够从转换后的 _InputStream_ 对象中读取预期的数据。

接下来，让我们看看它们的实际应用。

## 3. 使用字节数组

当我们考虑这个问题时，最直接的方法可能是：
- 第 1 步 - 从给定的 _OutputStream_ 读取数据，并将其保存在缓冲区中，例如字节数组
- 第 2 步 - 使用字节数组创建一个 _InputStream_

接下来，让我们将这个想法实现为一个测试，并检查它是否按预期工作：

```
@Test
void whenUsingByteArray_thenGetExpectedInputStream() throws IOException {
    String content = "I'm an important message.";
    try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
        out.write(content.getBytes());
        try (ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray())) {
            String inContent = new String(in.readAllBytes());

            assertEquals(content, inContent);
        }
    }
}
```

首先，我们准备了一个 _OutputStream_ 对象（_out_）并写入了一个字符串（_content_）。接下来，我们通过调用 _out.toByteArray()_ 从 _OutputStream_ 获取数据作为字节数组，并从数组创建一个 _InputStream_。

如果我们运行测试，它会通过。因此，转换是成功的。

值得一提的是，我们使用了 _try-with-resources_ 语句以确保 _InputStream_ 和 _OutputStream_ 在读写操作后被关闭。同时，我们的 _try_ 块没有 _catch_ 块，因为我们已经声明了测试方法抛出 _IOException_。

这种方法简单易实现。然而，缺点是它需要在能够作为输入回读之前将整个输出存储在内存中。换句话说，如果输出非常大，它可能会导致显著的内存消耗，并可能引起 _OutOfMemoryError_。

## 4. 通过管道

我们经常一起使用 _PipedOutputStream_ 和 _PipedInputStream_ 类来允许数据从 _OutputStream_ 传递到 _InputStream_。因此，我们首先可以连接一个 _PipedOutputStream_ 和一个 _PipedInputStream_，以便 _PipedInputStream_ 可以从 _PipedOutputStream_ 读取数据。接下来，我们可以将给定的 _OutputStream_ 的数据写入 _PipedOutputStream_。然后，在另一方面，我们可以从 _PipedInputStream_ 读取数据。

接下来，让我们将其实现为一个单元测试：

```
@Test
void whenUsingPipeStream_thenGetExpectedInputStream() throws IOException {
    String content = "I'm going through the pipe.";

    ByteArrayOutputStream originOut = new ByteArrayOutputStream();
    originOut.write(content.getBytes());

    //connect the pipe
    PipedInputStream in = new PipedInputStream();
    PipedOutputStream out = new PipedOutputStream(in);

    try (in) {
        new Thread(() -> {
            try (out) {
                originOut.writeTo(out);
            } catch (IOException iox) {
                // ...
            }
        }).start();

        String inContent = new String(in.readAllBytes());
        assertEquals(content, inContent);
    }
}
```

如上代码所示，首先，我们准备了 _OutputStream_（_originOut_）。接下来，我们创建了一个 _PipedInputStream_（_in_）和一个 _PipedOutputStream_（_out_）并将它们连接起来。这样，就建立了一个管道。

然后，我们使用 _ByteArrayOutputStream.writeTo()_ 方法将数据从给定的 _OutputStream_ 转发到 _PipedOutputStream_。我们应该注意，我们创建了一个新的线程来写入 _PipedOutputStream_。这是因为 **从同一个线程使用 _PipedInputStream_ 和 _PipedOutputStream_ 对象是不建议的。这可能导致死锁**。

最后，如果我们执行测试，它会通过。因此，成功将 _OutputStream_ 转换为 _PipedInputStream_。

## 5. 结论

在本文中，我们探讨了将 _OutputStream_ 转换为 _InputStream_ 的两种方法：
- 字节数组作为缓冲区 - 这是直接的。然而，它有 _OutOfMemoryError_ 的潜在风险
- 使用管道 - 将输出写入 _PipedOutputStream_ 使数据流向 _PipedInputStream_

像往常一样，这里展示的所有代码片段都可以在 GitHub 上找到。