---
date: 2022-04-01
category:
  - Java
  - Endianness
tag:
  - Java
  - Big Endian
  - Little Endian
head:
  - - meta
    - name: keywords
      content: Java, Endianness, Big Endian, Little Endian
---
# Java是如何读取整数的：小端还是大端？

## 1. 概述

"大端"和"小端"这两个术语描述了内存中字节的排列顺序。在处理数据序列化、网络通信或在不同硬件架构中读取二进制数据时，字节序至关重要。

在本教程中，我们将深入探讨Java如何读取整数，以及它是否遵循小端或大端方法。

## 2. 什么是字节序？

字节序指的是计算机内存中字节的排列方式。它有两种形式：小端和大端。

**大端存储在最小的内存地址处存储最高位字节。**

另一方面，**小端在最小的内存地址处存储最低位字节。**

## 3. Java中的字节顺序

让我们看一个输出整数值字节顺序的示例代码：

```java
int value = 123456789;
byte [] bytes = ByteBuffer.allocate(4).putInt(value).array();
for (byte b : bytes) {
    System.out.format("0x%x ", b);
}
```

在上面的代码中，我们声明了一个名为_value_的整数变量。接下来，我们声明一个_byte_数组，并通过调用_ByteBuffer_上的_allocate()_方法为其分配4个字节的空间。

此外，我们调用_putInt()_方法将四个字节的数据写入_ByteBuffer_对象。另外，_array()_方法帮助我们从_ByteBuffer_对象中获取_byte_数组。

最后，我们打印每个字节的十六进制值。

让我们看看示例代码的输出：

```java
0x7 0x5b 0xcd 0x15
```

上面的输出显示了内存中表示整数的四个字节的顺序。输出中的第一个字节“_0x7_”是整数的最高位字节，最后一个字节“_0x15_”是最低位字节。这种从最高位到最低位的字节顺序是大端字节顺序的特征。因此，我们可以推断Java默认使用大端字节顺序来处理整数。

**然而，大多数处理器以小端格式顺序字节。在运行时，JVM使用主机的原生字节序来读取二进制数据。**

Java提供了通过_ByteBuffer_类以小端顺序读取数据的灵活性。让我们修改示例代码以使用主机机器的原生字节序：

```java
int value = 123456789;
byte [] bytes = ByteBuffer.allocate(4).order(ByteOrder.nativeOrder()).putInt(value).array();
for (byte b : bytes) {
    System.out.format("0x%x ", b);
}
```

在这里，我们通过调用_order()_方法修改示例代码以使用主机机器的字节序。

让我们看看新的输出：

```java
0x15 0xcd 0x5b 0x7
```

字节顺序从最低位字节“_0x15_”重新排列到最高位字节“_0x7_”。这表明主机机器的字节序是小端。

## 4. 结论

在本文中，我们了解到Java默认使用大端字节顺序。此外，Java提供了在必要时以小端读取数据所必需的类。

如往常一样，示例的完整源代码可在GitHub上找到。