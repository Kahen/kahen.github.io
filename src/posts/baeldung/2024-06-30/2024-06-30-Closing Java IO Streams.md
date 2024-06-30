---
date: 2022-04-01
category:
  - Java
  - IO
tag:
  - Java IO
  - Streams
head:
  - - meta
    - name: keywords
      content: Java IO Streams, Closing Streams, Resource Management
---
# Java IO 流的关闭

## 1. 概述

在 Java IO 操作领域内，确保正确关闭 IO 流是非常重要的。这对于资源管理和代码的健壮性至关重要。

在本教程中，我们将**详细探讨为什么需要关闭 IO 流**。

## 2. 不关闭 IO 流会发生什么？

在完成对它们的所有操作后，显式关闭 IO 流始终是一个好习惯。忽略关闭它们可能会导致各种问题。

在这一部分，我们将看看这些问题。

### 2.1. 资源泄漏

每当我们打开一个 IO 流时，它总是用一些系统资源。**这些资源直到 IO 流的 _close()_ 方法被调用才会被释放**。

某些 IO 流实现可以在它们的 _finalize()_ 方法中自动关闭自己。__finalize()_ 方法在垃圾收集器（GC）被触发时调用。

然而，没有保证 GC 会被触发，也没有保证它何时被调用。资源可能在 GC 被调用之前就已经耗尽。因此，**我们不应该完全依赖 GC 来回收系统资源**。

### 2.2. 数据损坏

我们经常将 _BufferedOutputStream_ 包装在 _OutputStream_ 周围，以提供缓冲功能，减少每次写操作的开销。这是一种常见的做法，旨在提高写数据的性能。

_BufferedOutputStream_ 内部的缓冲区是一个用于临时存储数据的暂存区。当缓冲区达到一定大小或调用 _flush()_ 方法时，数据将被写入目标。

当我们完成向 _BufferedOutputStream_ 写入数据后，最后一块数据可能还没有写入目标，导致数据损坏。**调用 _close()_ 方法会调用 _flush()_ 将缓冲区中的剩余数据写入**。

### 2.3. 文件锁定

当我们使用 _FileOutputStream_ 向文件写入数据时，一些操作系统（如 Windows）会将文件保持在我们的应用程序中。**这阻止了其他应用程序写入甚至访问文件，直到 _FileOutputStream_ 被关闭**。

现在让我们来看看一些关闭 Java IO 流的方法。这些方法帮助我们避免我们讨论的问题，并确保适当的资源管理。

### 3.1. _try-catch-finally_

这是关闭 IO 流的传统方式。**我们在 _finally_ 块中关闭 IO 流。这确保了无论操作是否成功，都会调用 _close()_ 方法**：

```java
InputStream inputStream = null;
OutputStream outputStream = null;

try {
    inputStream = new BufferedInputStream(wrappedInputStream);
    outputStream = new BufferedOutputStream(wrappedOutputStream);
    // 流操作...
} finally {
    try {
        if (inputStream != null)
            inputStream.close();
    } catch (IOException ioe1) {
        log.error("无法关闭 InputStream");
    }
    try {
        if (outputStream != null)
            outputStream.close();
    } catch (IOException ioe2) {
        log.error("无法关闭 OutputStream");
    }
}
```

正如我们所展示的，_close()_ 方法也可能引发 _IOException_。因此，当关闭 IO 流时，我们必须在 _finally_ 块中再放置一个 _try-catch_ 块。**当有大量 IO 流需要处理时，这个过程变得繁琐**。

### 3.2. Apache Commons IO

Apache Commons IO 是一个多功能的 Java 库，为 IO 操作提供实用类和方法。

要使用它，让我们在 _pom.xml_ 中包含以下依赖项：

```xml
`<dependency>`
    `<groupId>`commons-io`</groupId>`
    `<artifactId>`commons-io`</artifactId>`
    `<version>`2.15.1`</version>`
`</dependency>`
```

Apache Commons 库简化了在 _finally_ 块中关闭 IO 流等复杂任务：

```java
InputStream inputStream = null;
OutputStream outputStream = null;

try {
    inputStream = new BufferedInputStream(wrappedInputStream);
    outputStream = new BufferedOutputStream(wrappedOutputStream);
    // 流操作...
} finally {
    IOUtils.closeQuietly(inputStream);
    IOUtils.closeQuietly(outputStream);
}
```

**_IOUtils.closeQuietly()_ 有效地关闭 IO 流，无需进行空值检查，并处理关闭过程中发生的异常。**

除了 _IOUtils.closeQuietly()_，**该库还提供了 _AutoCloseInputStream_ 类来自动关闭包装的 _InputStream_**：

```java
InputStream inputStream = AutoCloseInputStream.builder().setInputStream(wrappedInputStream).get();

byte[] buffer = new byte[256];
while (inputStream.read(buffer) != -1) {
    // 其他操作...
}
```

上述示例从 _InputStream_ 中读取数据。**_AutoCloseInputStream_ 在到达输入的末尾时自动关闭 _InputStream_**，这是通过从 _InputStream_ 的 _read()_ 方法中获取 _-1_ 来确定的。在这种情况下，我们甚至不需要显式调用 _close()_ 方法。

### 3.3. _try-with-resources_

_try-with-resources_ 块是在 Java 7 中引入的。它被认为是关闭 IO 流的首选方式。

**这种方法允许我们在 _try_ 语句中定义资源。** 资源是在我们完成使用后必须关闭的对象。

例如，实现 _AutoClosable_ 接口的类如 _InputStream_ 和 _OutputStream_ 被用作资源。它们将在 _try-catch_ 块之后自动关闭。这**消除了在 _finally_ 块中显式调用 _close()_ 方法的需要**：

```java
try (BufferedInputStream inputStream = new BufferedInputStream(wrappedInputStream);
     BufferedOutputStream outputStream = new BufferedOutputStream(wrappedOutputStream)) {
    // 流操作...
}
```

Java 9 进一步改进了 _try-with-resources_ 语法。**我们可以在 _try-with-resources_ 块之前声明资源变量，并直接在 _try_ 语句中指定它们的变量名**：

```java
InputStream inputStream = new BufferedInputStream(wrappedInputStream);
OutputStream outputStream = new BufferedOutputStream(wrappedOutputStream);

try (inputStream; outputStream) {
    // 流操作...
}
```

## 4. 结论

在本文中，我们检查了关闭 IO 流的各种策略，从在 _finally_ 块中调用 _close()_ 方法的传统方法到 Apache Commons IO 等库提供的更简化的方法，以及 _try-with-resources_ 的优雅。

有各种技术可供选择，我们可以根据自己的代码库选择最佳方法，并确保顺畅且无错误的 IO 操作。

像往常一样，文章中展示的源代码可以在 GitHub 上找到。