---
date: 2022-04-01
category:
  - Java
  - NIO
tag:
  - Java NIO
  - Java NIO.2
head:
  - - meta
    - name: keywords
      content: Java NIO, Java NIO.2, 文件系统操作, 非阻塞IO
------
# Java NIO和NIO.2的区别是什么？ | Baeldung---

date: 2022-04-01
category:
  - Java
  - NIO
tag:
  - Java NIO
  - Java NIO.2
head:
  - - meta
    - name: keywords
      content: Java NIO, Java NIO.2, 文件系统操作, 非阻塞IO

---

# Java NIO和NIO.2的区别是什么？ | Baeldung

## 1. 引言

在本教程中，我们将介绍Java IO功能以及它们在不同Java版本中的演变。首先，我们将介绍最初Java版本中的_java.io_包。接下来，我们将介绍在Java 1.4中引入的_java.nio_包。最后，我们将介绍_java.nio.file_包，通常被称为NIO.2包。

## 2. Java NIO包

Java的第一个版本发布了_java.io_包，引入了一个_File_类来访问文件系统。**_File_类代表文件和目录，并提供有限的文件系统操作。** 我们可以创建和删除文件，检查它们是否存在，检查读写访问权限等。

它也有一些缺点：
- **缺少复制方法** - 要复制文件，我们需要创建两个_File_实例，并使用缓冲区从一个实例读取并写入另一个_File_实例。
- **错误处理不佳** - 一些方法返回_boolean_作为操作成功与否的指示。
- **文件属性集有限** - 名称、路径、读写权限、内存大小等可用。
- **阻塞API** - 我们的线程在IO操作完成之前被阻塞。

要读取文件，我们需要一个_FileInputStream_实例来从文件中读取字节：

```java
@Test
public void readFromFileUsingFileIO() throws Exception {
    File file = new File("src/test/resources/nio-vs-nio2.txt");
    FileInputStream in = new FileInputStream(file);
    StringBuilder content = new StringBuilder();
    int data = in.read();
    while (data != -1) {
        content.append((char) data);
        data = in.read();
    }
    in.close();
    assertThat(content.toString()).isEqualTo("Hello from file!");
}
```

接下来，Java 1.4引入了非阻塞IO API，捆绑在_java.nio_包中（nio代表新的IO）。NIO被引入是为了克服_java.io_包的限制。这个包引入了三个核心类：_Channel_、_Buffer_和_Selector_。

### 2.1. _Channel_

**Java NIO _Channel_是一个允许我们读写缓冲区的类。** _Channel_类类似于_Streams_（这里我们说的是IO _Streams_，不是Java 1.8 _Streams_），有几个不同之处。_Channel_是双向的，而_Streams_通常是单向的，并且它们可以异步读写。

_Channel_类有几种实现，包括用于文件系统读写的_FileChannel_、用于使用UDP进行读写的_DatagramChannel_和用于使用TCP进行读写的_SocketChannel_。

### 2.2. _Buffer_

**缓冲区是一块内存，我们可以从中读取或写入数据。** NIO _Buffer_对象包装了一个内存块。_Buffer_类提供了一组功能，用于操作内存块。要使用_Buffer_对象，我们需要了解_Buffer_类的三个主要属性：容量、位置和限制。

- 容量定义了内存块的大小。当我们向缓冲区写入数据时，我们只能写入有限的长度。当缓冲区满时，我们需要读取数据或清除它。
- 位置是我们写入数据的起始点。一个空缓冲区从0开始，一直到_capacity – 1_。同样，当我们读取数据时，我们从位置值开始。
- 限制意味着我们可以从缓冲区读写。

_Buffer_类有多种变体。每种原始Java类型都有一个，不包括_Boolean_类型，还有_MappedByteBuffer_。

要使用缓冲区，我们需要了解一些重要的方法：

- _allocate(int value) –_ 我们使用此方法创建特定大小的缓冲区。
- _flip()_ – 这个方法用于从写入模式切换到读取模式
- _clear() –_ 清除缓冲区内容的方法
- _compact() –_ 清除我们已读取内容的方法
- _rewind() –_ 将位置重置为0，以便我们可以重新读取缓冲区中的数据

使用前面描述的概念，让我们使用_Channel_和_Buffer_类从文件中读取内容：

```java
@Test
public void readFromFileUsingFileChannel() throws Exception {
    RandomAccessFile file = new RandomAccessFile("src/test/resources/nio-vs-nio2.txt", "r");
    FileChannel channel = file.getChannel();
    StringBuilder content = new StringBuilder();
    ByteBuffer buffer = ByteBuffer.allocate(256);
    int bytesRead = channel.read(buffer);
    while (bytesRead != -1) {
        buffer.flip();
        while (buffer.hasRemaining()) {
            content.append((char) buffer.get());
        }
        buffer.clear();
        bytesRead = channel.read(buffer);
    }
    file.close();
    assertThat(content.toString()).isEqualTo("Hello from file!");
}
```

初始化所有必需的对象后，我们从通道读入缓冲区。接下来，在while循环中，我们使用_flip()_方法标记缓冲区以供读取，并逐字节读取，将其附加到我们的结果中。最后，我们清除数据并读取另一批。

### 2.3. _Selector_

**Java NIO Selector允许我们用单个线程管理多个通道。** 要使用selector对象监视多个通道，每个通道实例必须是非阻塞模式，并且我们必须注册它。注册通道后，我们得到一个_SelectionKey_对象，表示通道和选择器之间的连接。当我们有多个通道连接到选择器时，我们可以使用_select()_方法检查有多少通道准备好使用。调用_select()_方法后，我们可以使用_selectedKeys()_方法获取所有准备好的通道。

### 2.4. NIO包的缺点

_java.nio_包引入的变化更多地与低级数据IO有关。虽然它们允许非阻塞API，但其他方面仍然存在问题：

- **对符号链接的支持有限**
- **对文件属性访问的支持有限**
- **缺少更好的文件系统管理工具**

## 3. Java NIO.2包

Java 1.7引入了新的_java.nio.file_包，也称为NIO.2包。这个包采用了非阻塞IO的异步方法，这是_java.nio_包不支持的。最显著的变化与高级文件操作有关。它们通过_Files_、_Path_和_Paths_类添加。最值得注意的低级变化是添加了_AsynchronousFileChannel_和_AsyncroniousSocketChannel_。

**_Path_对象表示由分隔符分隔的目录和文件名的层次序列。** 根组件最左边，文件在右边。这个类提供了诸如_getFileName()_、_getParent()_等实用方法。_Path_类还提供了_resolve_和_relativize_方法，帮助构建不同文件之间的路径。Paths类是一组静态实用方法，接收_String_或_URI_以创建_Path_实例。

**_Files_类提供了使用前面描述的_Path_类的实用方法，并对文件、目录和符号链接进行操作。** 它还提供了一种使用_readAttributes()_方法读取许多文件属性的方式。

最后，让我们看看在读取文件方面，NIO.2与以前的IO版本相比如何：

```java
@Test
public void readFromFileUsingNIO2() throws Exception {
    List`<String>` strings = Files.readAllLines(Paths.get("src/test/resources/nio-vs-nio2.txt"));
    assertThat(strings.get(0)).isEqualTo("Hello from file!");
}
```

## 4. 结论

在本文中，我们介绍了_java.nio_和_java.nio.file_包的基础知识。正如我们所看到的，NIO.2不是NIO包的新版本。NIO包引入了一个用于非阻塞IO的低级API，而NIO.2引入了更好的文件管理。这两个包不是同义词，而是相互补充。像往常一样，所有代码示例都可以在GitHub上找到。

OK