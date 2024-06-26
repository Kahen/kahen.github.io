---
date: 2024-06-26
category:
  - Java
  - 编程
tag:
  - String
  - StringBuffer
head:
  - - meta
    - name: keywords
      content: Java, String, StringBuffer, 字符串, 性能比较
---
# Java中String与StringBuffer的比较

在Java中处理字符串时，String和StringBuffer是两个重要的类。简单来说，字符串是字符序列，例如“java”，“spring”等。

String和StringBuffer之间的主要区别在于String是不可变的，而StringBuffer是可变的并且是线程安全的。

本教程将比较String和StringBuffer类，并理解它们之间的相似之处和不同之处。

String类表示字符字符串。Java将所有字符串字面量，例如“baeldung”，实现为这个类的实例。

让我们创建一个String字面量：

```
String str = "baeldung";
```

我们也可以这样创建一个String对象：

```
Char data[] = {'b', 'a', 'e', 'l', 'd', 'u', 'n', 'g'};

String str = new String(data);
```

我们还可以做如下操作：

```
String str = new String("baeldung");
```

**字符串是常量且不可变，这使得它们可以共享。**

### 2.1. 字符串字面量与String对象

字符串字面量是存储在堆内存中一个特殊内存空间，称为字符串池中的不可变字符串。Java不会为具有相同值的字符串字面量分配新的内存空间。相反，它使用字符串池。

与此相反，JVM为新创建的String对象在字符串池外的堆内存中分配单独的内存。

因此，即使两个String对象可能具有相同的值，每个String对象也指向不同的内存地址。注意，String字面量仍然是String对象，但反之则不成立。

### 2.2. 字符串池

字符串字面量存储在Java堆的一个保留内存区域，称为字符串池。

### 2.3. 字符串池化

字符串池化是编译器使用的一种优化技术，以避免冗余的内存分配。如果已经存在具有相似值字符串字面量，则避免为其分配内存。相反，它使用现有副本：

常见的String操作包括连接、比较和搜索。Java语言还为字符串连接运算符（+）和其他对象转换为字符串提供了特殊支持。值得注意的是，String在内部使用StringBuffer及其append方法执行连接：

```
String str = "String";
str = str.concat("Buffer");
assertThat(str).isEqualTo("StringBuffer");
assertThat(str.indexOf("Buffer")).isEqualTo(6);
```

## StringBuffer

**StringBuffer是一个字符序列，就像String一样。但是，与String不同，它是可变的。** 我们可以通过append()和insert()等方法调用来修改StringBuffer。append方法将字符序列添加到StringBuffer的末尾，而insert方法在指定的索引处插入字符序列。StringBuffer类对这两种方法都有重载，以处理任何对象。在将对象追加或插入到StringBuffer之前，会将其转换为其字符串表示形式：

```
StringBuffer sBuf = new StringBuffer("String");
sBuf.append("Buffer");
assertThat(sBuf).isEqualToIgnoringCase("StringBuffer");
sBuf.insert(0, "String vs ");
assertThat(sBuf).isEqualToIgnoringCase("String vs StringBuffer");
```

StringBuffer是线程安全的，可以在多线程环境中工作。**同步**确保了所有语句的正确执行顺序，并避免了数据竞争情况。

然而，Java 1.5引入了StringBuilder作为StringBuffer的替代品，用于在线程安全不是问题的情况下进行性能优化。建议在单线程使用字符串缓冲区的地方使用StringBuilder，因为它在大多数实现中会更快。

## 性能比较

String和StringBuffer具有类似的性能。然而，使用StringBuffer进行字符串操作比String更快，因为String每次修改都需要创建一个新对象，并且所有更改都发生在新的String上，导致更多的时间和内存消耗。

让我们通过JMH进行一个快速的微基准测试，比较String和StringBuffer的连接性能：

```
@BenchmarkMode(Mode.SingleShotTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@Measurement(batchSize = 100000, iterations = 10)
@Warmup(batchSize = 100000, iterations = 10)
@State(Scope.Thread)
public class ComparePerformance {

    String strInitial = "springframework";
    String strFinal = "";
    String replacement = "java-";

    @Benchmark
    public String benchmarkStringConcatenation() {
        strFinal = "";
        strFinal += strInitial;
        return strFinal;
    }

    @Benchmark
    public StringBuffer benchmarkStringBufferConcatenation() {
        StringBuffer stringBuffer = new StringBuffer(strFinal);
        stringBuffer.append(strInitial);
        return stringBuffer;
    }
}
```

```
Benchmark                                              Mode  Cnt   Score    Error  Units
ComparePerformance.benchmarkStringBufferConcatenation    ss   10  16.047 ± 11.757  ms/op
ComparePerformance.benchmarkStringConcatenation          ss   10   3.492 ±  1.309  ms/op
```

## 比较表

为了总结差异：

| | |
|---|---|
| **String** | **StringBuffer** |
| String是字符序列且不可变 | StringBuffer像String但可以修改，即可变 |
| 由于其不可变性，它可以很容易地共享 | 只能在同步线程间共享 |
| 修改需要创建新字符串 | 修改需要调用特定方法 |
| 修改速度慢 | 修改速度快 |
| 使用字符串池存储数据 | 使用堆内存 |

## 结论

在本文中，我们比较了String和StringBuffer类。示例代码可以在GitHub上找到。