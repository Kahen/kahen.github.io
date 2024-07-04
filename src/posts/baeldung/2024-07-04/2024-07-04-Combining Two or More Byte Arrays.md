---
date: 2024-07-04
category:
  - Java
  - 编程
tag:
  - 字节数组
  - 合并
head:
  - - meta
    - name: keywords
      content: Java, 字节数组, 合并, ByteBuffer, System.arraycopy, Guava, Apache Commons
---

# Java中合并两个或更多字节数组

## 1. 引言

作为Java开发者，我们可能会遇到需要合并两个或更多字节数组的情况。在本教程中，**我们将探索几种合并两个或更多字节数组的方法**。

我们将从Java的基本类和方法开始。然后，我们将查看一些外部库，如Guava和Apache Commons Collections，用于合并字节数组。

## 2. 使用纯Java

在以下所有示例中，我们将考虑以下两个字节数组：

```java
byte[] first = {69, 121, 101, 45, 62, 118, 114};
byte[] second = {58, 120, 100, 46, 64, 114, 103, 117};
```

为了存储这两个合并后的数组，我们需要一个新的结果数组：

```java
byte[] combined = new byte[first.length + second.length];
```

预期的结果数组将是以下内容：

```java
byte[] expectedArray = {69, 121, 101, 45, 62, 118, 114, 58, 120, 100, 46, 64, 114, 103, 117};
```

在一些示例中，我们将查看允许我们合并多个数组的方法。我们将考虑一个额外的字节数组进行合并：

```java
byte[] third = {55, 66, 11, 111, 25, 84};
```

在这种情况下，三个数组合并后的预期结果数组将是以下内容：

```java
byte[] expectedArray = {69, 121, 101, 45, 62, 118, 114, 58, 120, 100, 46, 64, 114, 103, 117, 55, 66, 11, 111, 25, 84};
```

### 2.1. 使用 _System.arraycopy()_

_arrayCopy()_ 是 _System_ 类中的一个静态方法。它从指定的源数组开始，将数组或数组的一个子序列复制到目标数组的指定位置。

这个方法接受源数组和目标数组、数组中的位置和长度作为参数，以复制数组元素。让我们看看它的签名：

```java
public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)
```

我们将了解这些参数的含义：

- _src_ 是源数组
- _srcPos_ 是源数组中的起始位置
- _dest_ 是目标数组
- _destPos_ 是目标数组中的起始位置
- _length_ 是要复制的数组元素数量

让我们使用 _arrayCopy()_ 方法将其复制到我们的 _combined_ 数组：

```java
System.arraycopy(first, 0, combined, 0, first.length);
System.arraycopy(second, 0, combined, first.length, second.length);
assertArrayEquals(expectedArray, combined);
```

如果我们运行上述测试，它会通过。

### 2.2. 使用 _ByteBuffer_

_ByteBuffer_ 是扩展了 _java.nio.Buffer_ 的Java类。我们可以使用它来合并两个或更多的字节数组：

```java
ByteBuffer buffer = ByteBuffer.wrap(combined);
buffer.put(first);
buffer.put(second);
buffer.put(third);
combined = buffer.array();
assertArrayEquals(expectedArray, combined);
```

再次，如果我们运行测试，它会通过。

### 2.3. 使用自定义方法

我们可以通过编写自定义逻辑来合并两个字节数组。例如，我们可以通过比较索引与第一个数组的长度来将数据插入结果数组：

```java
for (int i = 0; i `< combined.length; ++i) {
    combined[i] = i < first.length ? first[i] : second[i - first.length];
}
assertArrayEquals(expectedArray, combined);
```

我们看到，当我们运行上述测试时，它会通过。

## 3. 外部库

我们可以使用几个外部库来合并两个字节数组。我们来看看最受欢迎的一些。

### 3.1. 使用 Guava

让我们首先在 _pom.xml_ 中添加Google的Guava Maven依赖：

```xml
`<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``31.1-jre``</version>``
``</dependency>``
```

我们将使用Guava的 _com.google.common.primitives.Bytes.concat()_。这是它的签名：

```java
public static byte[] concat(byte[]... arrays)
```

我们可以使用上述方法结合两个或更多的字节数组：

```java
byte[] combined = Bytes.concat(first, second, third);
assertArrayEquals(expectedArray, combined);
```

正如我们所看到的，结果的 _combined_ 数组包含了传递给 _concat()_ 方法的所有数组中的元素。

### 3.2. 使用 Apache Commons

要开始使用Apache Commons Lang 3，我们首先需要添加Maven依赖：

```xml
`<dependency>`
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

我们将使用Apache Commons Lang的 _org.apache.commons.lang3.ArrayUtils_：

```java
public static byte[] addAll(final byte[] array1, final byte... array2)
```

让我们看看如何使用上述方法合并两个字节数组：

```java
byte[] combined = ArrayUtils.addAll(first, second);
assertArrayEquals(expectedArray, combined);
```

再次，如果我们运行测试，它会通过。

## 4. 结论

在这篇短文中，我们首先看了几种使用纯Java合并两个字节数组的方法。后来，我们还使用了像Guava和Apache Commons这样的外部库来合并两个字节数组。

正如往常一样，本文的完整代码示例可以在GitHub上找到。

OK