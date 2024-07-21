---
date: 2022-03-01
category:
  - Java
  - NIO
tag:
  - ByteBuffer
  - Java NIO
head:
  - - meta
    - name: keywords
      content: Java, ByteBuffer, NIO, 教程
---
# Java ByteBuffer 指南

## 1. 概览

Buffer 类是 Java NIO 的基础。然而，在这些类中，ByteBuffer 类是最受欢迎。这是因为 byte 类型是最通用的。例如，我们可以使用字节来组成 JVM 中的其他非布尔基本类型。此外，我们还可以使用字节在 JVM 与外部 I/O 设备之间传输数据。

在本教程中，我们将检查 ByteBuffer 类的不同方面。

## 2. ByteBuffer 创建

ByteBuffer 是一个抽象类，所以我们不能直接构造一个新的实例。但是，它提供了静态工厂方法来方便实例创建。简单来说，有两种方式可以创建 ByteBuffer 实例，一种是通过分配，另一种是通过包装：

### 2.1. 分配

分配将创建一个实例并分配具有特定容量的私有空间。具体来说，ByteBuffer 类有两种分配方法：allocate 和 allocateDirect。

使用 allocate 方法，我们将得到一个非直接缓冲区 - 即，一个具有底层字节数组的缓冲区实例：

```java
ByteBuffer buffer = ByteBuffer.allocate(10);
```

当我们使用 allocateDirect 方法时，它将生成一个直接缓冲区：

```java
ByteBuffer buffer = ByteBuffer.allocateDirect(10);
```

为了简单起见，让我们专注于非直接缓冲区，并稍后讨论直接缓冲区。

### 2.2. 包装

包装允许一个实例重用现有的字节数组：

```java
byte[] bytes = new byte[10];
ByteBuffer buffer = ByteBuffer.wrap(bytes);
```

上述代码等同于：

```java
ByteBuffer buffer = ByteBuffer.wrap(bytes, 0, bytes.length);
```

对现有字节数组中的数据元素所做的任何更改都将反映在缓冲区实例中，反之亦然。

### 2.3. 洋葱模型

现在，我们知道了如何获取 ByteBuffer 实例。接下来，让我们将 ByteBuffer 类视为一个三层洋葱模型，并从内到外逐层理解它：

- 数据和索引层
- 传输数据层
- 视图层

在最内层，我们将 ByteBuffer 类视为一个带有额外索引的字节数组容器。在中间层，我们专注于使用 ByteBuffer 实例将数据从/到其他数据类型传输。在最外层，我们使用不同的基于缓冲区的视图检查相同的底层数据。

## 3. ByteBuffer 索引

概念上，ByteBuffer 类是一个包装在对象内部的字节数组。它提供了许多方便的方法来促进对底层数据的读写操作。而且，这些方法高度依赖于维护的索引。

现在，让我们故意简化 ByteBuffer 类为带有额外索引的字节数组容器：

```java
ByteBuffer = 字节数组 + 索引
```

有了这个概念，我们可以将索引相关的方法分为四类：

- 基本
- 标记和重置
- 清除、翻转、倒带和压缩
- 剩余

### 3.1. 四个基本索引

在 Buffer 类中定义了四个索引。这些索引记录了底层数据元素的状态：

- 容量：缓冲区可以容纳的数据元素的最大数量
- 限制：停止读写的索引
- 位置：当前读写的索引
- 标记：记住的位置

还有这些索引之间的不变关系：

```java
0 `<= mark <= position <= limit <= capacity
```

并且，我们应该注意 **所有索引相关的方法都围绕这四个索引旋转**。

当我们创建一个新的 ByteBuffer 实例时，标记是未定义的，位置保持为 0，限制等于容量。例如，让我们分配一个包含 10 个数据元素的 ByteBuffer：

```java
ByteBuffer buffer = ByteBuffer.allocate(10);
```

或者，让我们用包含 10 个数据元素的现有字节数组包装：

```java
byte[] bytes = new byte[10];
ByteBuffer buffer = ByteBuffer.wrap(bytes);
```

结果，标记将是 -1，位置将是 0，限制和容量都将是 10：

```java
int position = buffer.position(); // 0
int limit = buffer.limit();       // 10
int capacity = buffer.capacity(); // 10
```

容量是只读的，不能更改。但是，我们可以使用 position(int) 和 limit(int) 方法来更改相应的位置和限制：

```java
buffer.position(2);
buffer.limit(5);
```

然后，位置将是 2，限制将是 5。

### 3.2. 标记和重置

mark() 和 reset() 方法允许我们记住特定位置并在以后返回。当我们第一次创建一个 ByteBuffer 实例时，标记是未定义的。然后，我们可以调用 mark() 方法，将标记设置为当前位置。在一些操作之后，调用 reset() 方法将位置更改回标记。

```java
ByteBuffer buffer = ByteBuffer.allocate(10); // mark = -1, position = 0
buffer.position(2);                          // mark = -1, position = 2
buffer.mark();                               // mark = 2,  position = 2
buffer.position(5);                          // mark = 2,  position = 5
buffer.reset();                              // mark = 2,  position = 2
```

需要注意的一点：如果标记是未定义的，调用 reset() 方法将导致 InvalidMarkException。

### 3.3. 清除、翻转、倒带和压缩

clear()、flip()、rewind() 和 compact() 方法有一些共同点和轻微的不同：

为了比较这些方法，让我们准备一个代码片段：

```java
ByteBuffer buffer = ByteBuffer.allocate(10); // mark = -1, position = 0, limit = 10
buffer.position(2);                          // mark = -1, position = 2, limit = 10
buffer.mark();                               // mark = 2,  position = 2, limit = 10
buffer.position(5);                          // mark = 2,  position = 5, limit = 10
buffer.limit(8);                             // mark = 2,  position = 5, limit = 8
```

clear() 方法将限制更改为容量，位置更改为 0，并将标记更改为 -1：

```java
buffer.clear();                              // mark = -1, position = 0, limit = 10
```

flip() 方法将限制更改为位置，位置更改为 0，并将标记更改为 -1：

```java
buffer.flip();                               // mark = -1, position = 0, limit = 5
```

rewind() 方法保持限制不变，将位置更改为 0，并将标记更改为 -1：

```java
buffer.rewind();                             // mark = -1, position = 0, limit = 8
```

compact() 方法将限制更改为容量，位置更改为剩余（限制 - 位置），并将标记更改为 -1：

```java
buffer.compact();                            // mark = -1, position = 3, limit = 10
```

上述四种方法各自有自己的用例：

- 要重用缓冲区，clear() 方法很有用。它将索引设置为初始状态，并准备好进行新的写操作。
- 调用 flip() 方法后，缓冲区实例从写模式切换到读模式。但是，我们应该避免两次调用 flip() 方法。那是因为第二次调用将限制设置为 0，没有数据元素可以读取。
- 如果我们想多次读取底层数据，rewind() 方法很有用。
- compact() 方法适用于部分重用缓冲区。例如，假设我们想读取一些，但不是全部的底层数据，然后我们想将数据写入缓冲区。compact() 方法将未读数据复制到缓冲区的开头，并更改缓冲区索引，以准备好进行写操作。

### 3.4. 剩余

hasRemaining() 和 remaining() 方法计算限制和位置之间的关系：

当限制大于位置时，hasRemaining() 将返回 true。此外，remaining() 方法返回限制和位置之间的差异。

例如，如果一个缓冲区的位置为 2，限制为 8，那么它的剩余将是 6：

```java
ByteBuffer buffer = ByteBuffer.allocate(10); // mark = -1, position = 0, limit = 10
buffer.position(2);                          // mark = -1, position = 2, limit = 10
buffer.limit(8);                             // mark = -1, position = 2, limit = 8
boolean flag = buffer.hasRemaining();        // true
int remaining = buffer.remaining();          // 6
```

## 4. 传输数据

洋葱模型的第二层关注于数据传输。具体来说，ByteBuffer 类提供了将数据从/到其他数据类型（字节、字符、短整型、整型、长整型、浮点型和双精度型）传输的方法：

### 4.1. 传输字节数据

要传输字节数据，ByteBuffer 类提供了单个和批量操作。

**我们可以在单个操作中从缓冲区的底层数据中读取或写入单个字节。** 这些操作包括：

```java
public abstract byte get();
public abstract ByteBuffer put(byte b);
public abstract byte get(int index);
public abstract ByteBuffer put(int index, byte b);
```

我们可以从上述方法中注意到 get()/put方法有两种版本：没有参数的和接受索引的。那么，有什么区别呢？

没有索引的是一个相对操作，它作用于当前位置的数据元素，然后位置增加 1。但是，接受索引的是一个绝对操作，它作用于索引处的数据元素，不会改变位置。

**相比之下，批量操作可以从缓冲区的底层数据中读取或写入多个字节。** 这些操作包括：

```java
public ByteBuffer get(byte[] dst);
public ByteBuffer get(byte[] dst, int offset, int length);
public ByteBuffer put(byte[] src);
public ByteBuffer put(byte[] src, int offset, int length);
```

上述方法都属于相对操作。也就是说，它们将从当前位置读取或写入，并分别改变位置值。

还有另一个 put() 方法，它接受一个 ByteBuffer 参数：

```java
public ByteBuffer put(ByteBuffer src);
```

### 4.2. 传输整型数据

除了读写字节数据外，ByteBuffer 类还支持除布尔类型之外的其他原始类型。让我们以整型为例。相关方法包括：

```java
public abstract int getInt();
public abstract ByteBuffer putInt(int value);
public abstract int getInt(int index);
public abstract ByteBuffer putInt(int index, int value);
```

同样，带有索引参数的 getInt() 和 putInt() 方法是绝对操作，否则是相对操作。

## 5. 不同视图

洋葱模型的第三层是关于**用不同视角读取相同的底层数据**。

上图中的每个方法都会生成一个新的视图，这些视图与原始缓冲区共享相同的底层数据。要理解一个新视图，我们应该关注两个问题：

- 新视图将如何解析底层数据？
- 新视图将如何记录其索引？

### 5.1. ByteBuffer 视图

要将 ByteBuffer 实例读取为另一个 ByteBuffer 视图，它有三种方法：duplicate()、slice() 和 asReadOnlyBuffer()。

让我们看看这些差异的说明：

```java
ByteBuffer buffer = ByteBuffer.allocate(10); // mark = -1, position = 0, limit = 10, capacity = 10
buffer.position(2);                          // mark = -1, position = 2, limit = 10, capacity = 10
buffer.mark();                               // mark = 2,  position = 2, limit = 10, capacity = 10
buffer.position(5);                          // mark = 2,  position = 5, limit = 10, capacity = 10
buffer.limit(8);                             // mark = 2,  position = 5, limit = 8,  capacity = 10
```

duplicate() 方法创建一个新的 ByteBuffer 实例，就像原始的一样。但是，两个缓冲区将各自拥有独立的限制、位置和标记：

```java
ByteBuffer view = buffer.duplicate();        // mark = 2,  position = 5, limit = 8,  capacity = 10
```

slice() 方法创建了一个共享的底层数据子视图。视图的位置将是 0，其限制和容量将是原始缓冲区的剩余部分：

```java
ByteBuffer view = buffer.slice();            // mark = -1, position = 0, limit = 3,  capacity = 3
```

与 duplicate() 方法相比，asReadOnlyBuffer() 方法的工作方式类似，但它生成的是一个只读缓冲区。这意味着我们不能使用这个只读视图来更改底层数据：

```java
ByteBuffer view = buffer.asReadOnlyBuffer(); // mark = 2,  position = 5, limit = 8,  capacity = 10
```

### 5.2. 其他视图

ByteBuffer 还提供了其他视图：asCharBuffer()、asShortBuffer()、asIntBuffer()、asLongBuffer()、asFloatBuffer() 和 asDoubleBuffer()。这些方法与 slice() 方法类似，即它们提供了一个对应于底层数据当前位置和限制的切片视图。它们之间的主要区别在于将底层数据解释为其他原始类型值。

我们应该关心的问题是：

- 如何解释底层数据
- 从哪里开始解释
- 新生成的视图中将呈现多少个元素

新视图将多个字节组合成目标原类型，并从原始缓冲区的当前位置开始解释。新视图的容量将等于原始缓冲区剩余元素的数量除以视图的原始类型字节数。原始缓冲区末尾的任何剩余字节在视图中将不可见。

现在，让我们以 asIntBuffer() 为例：

```java
byte[] bytes = new byte[]{
  (byte) 0xCA, (byte) 0xFE, (byte) 0xBA, (byte) 0xBE, // CAFEBABE -->` cafebabe
  (byte) 0xF0, (byte) 0x07, (byte) 0xBA, (byte) 0x11, // F007BA11 --> football
  (byte) 0x0F, (byte) 0xF1, (byte) 0xCE               // 0FF1CE   ---> office
};
ByteBuffer buffer = ByteBuffer.wrap(bytes);
IntBuffer intBuffer = buffer.asIntBuffer();
int capacity = intBuffer.capacity();                         // 2
```

在上述代码片段中，buffer 有 11 个数据元素，而 int 类型占用 4 个字节。因此，intBuffer 将有 2 个数据元素（11 / 4 = 2），并留下额外的 3 个字节（11 % 4 = 3）。

## 6. 直接缓冲区

什么是直接缓冲区？直接缓冲区是指其底层数据分配在操作系统函数可以直接访问的内存区域的缓冲区。非直接缓冲区是指其底层数据是一个在 Java 堆区域分配的字节数组的缓冲区。

那么，我们如何创建一个直接缓冲区呢？通过调用带有所需容量的 allocateDirect() 方法来创建一个直接 ByteBuffer：

```java
ByteBuffer buffer = ByteBuffer.allocateDirect(10);
```

**我们为什么需要一个直接缓冲区？** 答案很简单：非直接缓冲区总是涉及不必要的复制操作。当发送非直接缓冲区的数据到 I/O 设备时，本地代码必须“锁定”底层字节数组，将其复制到 Java 堆之外，然后调用操作系统函数来刷新数据。然而，本地代码可以直接访问底层数据，并使用直接缓冲区调用操作系统函数来刷新数据，而无需任何额外开销。

鉴于上述情况，直接缓冲区是否完美？不。主要问题是分配和释放直接缓冲区的成本很高。那么，在现实中，直接缓冲区是否总是比非直接缓冲区运行得更快？不一定。这是因为许多因素在起作用。而且，性能权衡可以因 JVM、操作系统和代码设计而大不相同。

最后，有一个实用的软件格言要遵循：**首先让它工作，然后让它变快**。这意味着，让我们首先集中精力确保代码的正确性。如果代码运行不够快，那么让我们进行相应的优化。

## 7. 杂项

ByteBuffer 类还提供了一些辅助方法：

isDirect() 方法可以告诉我们缓冲区是直接缓冲区还是非直接缓冲区。请注意，使用 wrap() 方法创建的包装缓冲区总是非直接的。

所有缓冲区都是可读的，但并非所有都是可写的。isReadOnly() 方法指示我们是否可以写入底层数据。

要比较这两种方法，**isDirect() 方法关心底层数据存在的位置，在 Java 堆还是内存区域**。然而，**isReadOnly() 方法关心是否可以更改底层数据元素**。

如果原始缓冲区是直接的或只读的，新生成的视图将继承这些属性。

如果 ByteBuffer 实例是直接的或只读的，我们不能获取其底层字节数组。但是，如果缓冲区是非直接且非只读的，这并不一定意味着其底层数据是可访问的。

要准确地说，**hasArray() 方法可以告诉我们缓冲区是否有一个可访问的支撑数组**。如果 hasArray() 方法返回 true，那么我们就可以使用 array() 和 arrayOffset() 方法来获取更多相关信息。

### 7.3. 字节顺序

ByteBuffer 类的字节顺序默认始终是 ByteOrder.BIG_ENDIAN。我们可以使用 order() 和 order(ByteOrder) 方法分别获取和设置当前字节顺序。

字节顺序影响如何解释底层数据。例如，假设我们有一个 buffer 实例：

```java
byte[] bytes = new byte[]{(byte) 0xCA, (byte) 0xFE, (byte) 0xBA, (byte) 0xBE};
ByteBuffer buffer = ByteBuffer.wrap(bytes);
```

使用 ByteOrder.BIG_ENDIAN，val 将是 -889275714 (0xCAFEBABE)：

```java
buffer.order(ByteOrder.BIG_ENDIAN);
int val = buffer.getInt();
```

但是，使用 ByteOrder.LITTLE_ENDIAN，val 将是 -1095041334 (0xBEBAFECA)：

```java
buffer.order(ByteOrder.LITTLE_ENDIAN);
int val = buffer.getInt();
```

### 7.4. 比较

ByteBuffer 类提供了 equals() 和 compareTo() 方法来比较两个缓冲区实例。这两种方法都是基于剩余数据元素进行比较，这些数据元素在范围 [position, limit) 内。

例如，两个缓冲区实例具有不同的底层数据和索引，但可以相等：

```java
byte[] bytes1 = "World".getBytes(StandardCharsets.UTF_8);
byte[] bytes2 = "HelloWorld".getBytes