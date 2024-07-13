---
date: {2024-07-13}
category:
  - Java
  - Testing
tag:
  - InputStream
  - Mocking
  - Unit Test
head:
  - - meta
    - name: keywords
      content: Java, InputStream, Mocking, Unit Test, Testing
---
# Java中模拟InputStream对象

1. 引言

`InputStream`是一个常用的抽象类，用于处理数据。数据可能来自非常不同的来源，但使用这个类可以让我们抽象化来源，并独立于特定来源处理数据。

然而，当我们编写测试时，我们实际上需要提供一些坚实的实现。在本教程中，我们将学习应该选择哪些可用的实现，或者何时更好地编写我们自己的实现。

2. `InputStream`接口基础

在我们开始编写自己的代码之前，了解`InputStream`接口是如何构建的对我们来说是个好主意。幸运的是，它非常简单。**要实现一个简单的`InputStream`，我们只需要考虑一个方法——** `read`。它不接受任何参数，并以`int`的形式返回流的下一个字节。如果`InputStream`已经结束，它返回-1，提示我们停止处理。

### 2.1. 测试案例

在本教程中，我们将测试一个以`InputStream`形式处理文本消息并返回处理的字节数的方法。然后我们将断言读取了正确数量的字节：

```
int bytesCount = processInputStream(someInputStream);
assertThat(bytesCount).isEqualTo(expectedNumberOfBytes);
```

这里`processInputStream()`方法的内部实现不太相关，所以我们只是使用一个非常简单的实现：

```java
public class MockingInputStreamUnitTest {
    int processInputStream(InputStream inputStream) throws IOException {
        int count = 0;
        while(inputStream.read() != -1) {
            count++;
        }
        return count;
    }
}
```

### 2.2. 使用简单实现

为了更好地理解`InputStream`的工作原理，我们将编写一个简单的实现，其中包含一个硬编码的消息。除了消息之外，我们的实现将有一个索引，指向我们应该读取消息的下一个字节。每次调用`read`方法时，我们将从消息中获取一个字节，然后增加索引。

在我们这样做之前，我们还需要检查我们是否已经读取了消息中的所有字节。如果是这样，我们需要返回-1：

```java
public class MockingInputStreamUnitTest {

@Test
public void givenSimpleImplementation_shouldProcessInputStream() throws IOException {
    int byteCount = processInputStream(new InputStream() {
        private final byte[] msg = "Hello World".getBytes();
        private int index = 0;
        @Override
        public int read() {
            if (index >= msg.length) {
                return -1;
            }
            return msg[index++];
        }
    });
    assertThat(byteCount).isEqualTo(11);
}
```

3. 使用`ByteArrayInputStream`

**如果我们完全确定整个数据负载可以适应内存，最简单的选择是`ByteArrayInputStream`。** 我们向构造函数提供一个字节数组，然后流逐字节地迭代它，类似于前一节中的例子：

```java
String msg = "Hello World";
int bytesCount = processInputStream(new ByteArrayInputStream(msg.getBytes()));
assertThat(bytesCount).isEqualTo(11);
```

4. 使用`FileInputStream`

如果我们可以将数据保存为文件，我们也可以将文件加载为`FileInputStream`。**这种方法的优点是数据不会整个加载到内存中，而是在需要时从磁盘读取。** 如果我们将文件放在资源文件夹中，我们可以使用方便的`getResourceAsStream`方法直接从路径创建`InputStream`，只需一行代码：

```java
InputStream inputStream = MockingInputStreamUnitTest.class.getResourceAsStream("/mockinginputstreams/msg.txt");
int bytesCount = processInputStream(inputStream);
assertThat(bytesCount).isEqualTo(11);
```

请注意，在这个例子中，实际的`InputStream`实现将是`BufferedFileInputStream`。顾名思义，它读取更大的数据块并将它们存储在缓冲区中。因此，它限制了从磁盘的读取次数。

5. 即时生成数据

有时，我们想测试我们的系统是否能够正确处理大量数据。我们可以简单地使用从磁盘加载的大文件，但这种方法有一些严重的缺点。这不仅是潜在的空间浪费，而且像`git`这样的版本控制系统并不擅长处理大型二进制文件。幸运的是，我们不需要事先拥有所有数据。相反，我们可以即时生成它。

为了实现这一点，我们需要实现我们的`InputStream`。让我们从定义字段和构造函数开始：

```java
public class GeneratingInputStream extends InputStream {
    private final int desiredSize;
    private final byte[] seed;
    private int actualSize = 0;

    public GeneratingInputStream(int desiredSize, String seed) {
        this.desiredSize = desiredSize;
        this.seed = seed.getBytes();
    }
}
```

“desiredSize”变量将告诉我们何时应该停止生成数据。“seed”变量将是一小块数据，将被重复。最后，`actualSize`变量将帮助我们跟踪我们已经返回了多少字节。**我们需要它，因为我们实际上没有保存任何数据。我们只返回“当前”字节。**

使用我们定义的变量，我们可以实现`read`方法：

```java
@Override
public int read() {
    if (actualSize >= desiredSize) {
        return -1;
    }
    return seed[actualSize++ % seed.length];
}
```

首先，我们检查是否达到了期望的大小。如果我们做到了，我们应该返回-1，以便流的消费者知道停止读取。如果我们没有，我们应该从种子中返回一个字节。为了确定应该是哪个字节，我们使用模运算符来获取生成数据的实际大小除以种子长度的余数。

6. 总结

在本教程中，我们探讨了如何在测试中处理`InputStreams`。我们了解了类的构建方式以及我们可以为不同场景使用哪些实现。最后，我们学习了如何编写我们自己的实现以即时生成数据。

像往常一样，代码示例可以在GitHub上找到。