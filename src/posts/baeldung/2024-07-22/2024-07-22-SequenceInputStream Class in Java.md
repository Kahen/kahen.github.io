---
date: 2022-04-01
category:
  - Java
  - IO
tag:
  - SequenceInputStream
  - Java IO
head:
  - - meta
    - name: keywords
      content: Java, SequenceInputStream, IO, 文件流
------
# Java中的SequenceInputStream类

在这个教程中，我们将学习如何在Java中使用_SequenceInputStream_类。特别是，这个类在连续读取一系列文件或流时非常有用。

有关Java IO和其他相关Java类的更多基础知识，我们可以阅读Java IO教程。

### 使用_SequenceInputStream_类
_SequenceInputStream_接受两个或更多的_InputStream_对象作为源。它按照给定的顺序依次从每个源读取。当它完成从第一个_InputStream_的读取后，它会自动开始从第二个读取。这个过程会一直持续，直到它完成所有源流的读取。

#### 2.1. 对象创建
我们可以使用两个_InputStream_对象来初始化_SequenceInputStream_：

```java
InputStream first = new FileInputStream(file1);
InputStream second = new FileInputStream(file2);
SequenceInputStream sequenceInputStream = new SequenceInputStream(first, second);
```

我们也可以使用_Enumeration_的_InputStream_对象实例化它：

```java
Vector`<InputStream>` inputStreams = new Vector<>();
for (String fileName : fileNames) {
    inputStreams.add(new FileInputStream(fileName));
}
sequenceInputStream = new SequenceInputStream(inputStreams.elements());
```

#### 2.2. 从流中读取
_SequenceInputStream_提供了两种简单的方法来从输入源读取数据。第一种方法读取单个字节，而第二种方法读取字节数组。

要读取单个字节的数据，我们使用_read()_方法：

```java
int byteValue = sequenceInputStream.read();
```

在上面的例子中，read方法返回流中的下一个字节（0 – 255）值。如果流到达末尾，则返回-1。

我们还可以从数组中读取字节：

```java
byte[] bytes = new byte[100];
sequenceInputStream.read(bytes, 0, 50);
```

在上面的例子中，它读取50个字节，并将它们从索引0开始放置。

#### 2.3. 显示序列读取的示例
以两个字符串作为输入源来演示读取序列：

```java
InputStream first = new ByteArrayInputStream("One".getBytes());
InputStream second = new ByteArrayInputStream("Magic".getBytes());
SequenceInputStream sequenceInputStream = new SequenceInputStream(first, second);
StringBuilder stringBuilder = new StringBuilder();
int byteValue;
while ((byteValue = sequenceInputStream.read()) != -1) {
    stringBuilder.append((char) byteValue);
}
assertEquals("OneMagic", stringBuilder.toString());
```

从上面的例子中，如果我们打印_stringBuilder.toString()_，它将显示以下输出：

```
OneMagic
```

### 结论
在这篇简短的文章中，我们看到了如何使用_SequenceInputStream_。它只是将所有底层输入流合并为一个单一的流。

完整的代码示例可以在GitHub上找到。