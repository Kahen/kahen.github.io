---
date: 2024-07-17
category:
  - Java
  - StringBuilder
  - StringBuffer
tag:
  - Java
  - StringBuilder
  - StringBuffer
head:
  - - meta
    - name: keywords
      content: Java, StringBuilder, StringBuffer, 清除, setLength, delete
---

# 清除StringBuilder或StringBuffer的教程

在本教程中，我们将介绍几种清除StringBuilder或StringBuffer的方法，然后详细阐述它们。

### 使用setLength方法
setLength方法更新StringBuilder的内部长度。之后，当操作StringBuilder时，长度之后的所有条目都将被忽略。因此，使用0调用它将清除其内容：

```java
@Test
void whenSetLengthToZero_ThenStringBuilderIsCleared() {
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.append("Hello World");
    int initialCapacity = stringBuilder.capacity();
    stringBuilder.setLength(0);
    assertEquals("", stringBuilder.toString());
    assertEquals(initialCapacity, stringBuilder.capacity());
}
```

请注意，调用setLength方法后，StringBuilder的容量保持不变。

### 使用delete方法
delete方法在后台使用System.arraycopy。所有在起始索引之前或结束索引之后的索引都被复制到同一个StringBuilder中。

因此，如果我们使用0作为起始索引，并将结束索引设置为StringBuilder的长度，我们将复制：

- 0之前的索引：没有。
- stringBuilder.length()之后的索引：没有。

结果，StringBuilder中的所有内容都被移除：

```java
@Test
void whenDeleteAll_ThenStringBuilderIsCleared() {
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.append("Hello World");
    int initialCapacity = stringBuilder.capacity();
    stringBuilder.delete(0, stringBuilder.length());
    assertEquals("", stringBuilder.toString());
    assertEquals(initialCapacity, stringBuilder.capacity());
}
```

与setLength方法一样，删除内容后对象的容量保持不变。我们还要强调，在这一过程中没有涉及新对象的创建。

### 清除StringBuffer
所有适用于StringBuilder的方法同样适用于StringBuffer。此外，关于对象容量的所有评论仍然有效。

让我们展示一个使用setLength方法的例子：

```java
@Test
void whenSetLengthToZero_ThenStringBufferIsCleared() {
    StringBuffer stringBuffer = new StringBuffer();
    stringBuffer.append("Hello World");
    int initialCapacity = stringBuffer.capacity();
    stringBuffer.setLength(0);
    assertEquals("", stringBuffer.toString());
    assertEquals(initialCapacity, stringBuffer.capacity());
}
```

也可以使用delete方法：

```java
@Test
void whenDeleteAll_ThenStringBufferIsCleared() {
    StringBuffer stringBuffer = new StringBuffer();
    stringBuffer.append("Hello World");
    int initialCapacity = stringBuffer.capacity();
    stringBuffer.delete(0, stringBuffer.length());
    assertEquals("", stringBuffer.toString());
    assertEquals(initialCapacity, stringBuffer.capacity());
}
```

### 性能
让我们使用JMH进行快速性能比较。让我们比较StringBuilder的三种方法：

```java
@State(Scope.Benchmark)
public static class MyState {
    final String HELLO = "Hello World";
    final StringBuilder sb = new StringBuilder().append(HELLO);
}

@Benchmark
public void evaluateSetLength(Blackhole blackhole, MyState state) {
    state.sb.setLength(0);
    blackhole.consume(state.sb.toString());
}

@Benchmark
public void evaluateDelete(Blackhole blackhole, MyState state) {
    state.sb.delete(0, state.sb.length());
    blackhole.consume(state.sb.toString());
}
```

我们通过每秒操作数来衡量性能。这个基准测试得出以下结果：

```java
Benchmark                  Mode   Cnt         Score          Error  Units
evaluateDelete             thrpt   25  67943684.417 ± 18116791.770  ops/s
evaluateSetLength          thrpt   25  37310891.158 ±   994382.978  ops/s
```

如我们所见，delete似乎是两种方法中耗时较少的一种，几乎是setLength的两倍。

### 结论
在本文中，我们详细介绍了三种清除StringBuilder或StringBuffer的方法。

如常，代码可在GitHub上找到。