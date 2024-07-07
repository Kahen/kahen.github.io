---
date: 2024-07-07
category:
  - Java
  - Performance
tag:
  - StringBuilder
  - Efficiency
head:
  - - meta
    - name: keywords
      content: Java, StringBuilder, Performance, Efficiency, Reuse, Memory, CPU, Garbage Collection, Cache
---

# 重用StringBuilder以提高效率

在本教程中，我们将讨论是否应该重用StringBuilder以提高效率。我们将指导您如何重用StringBuilder并解释其好处。

### 2. 好处

重用StringBuilder实例可以帮助优化应用程序的内存使用和速度。

#### 2.1. 优化对象创建

在Java中实例化新对象在内存和CPU使用方面可能代价昂贵。由于字符串是不可变的，使用StringBuilder来连接不同的字符串通常可以避免不必要的对象创建。重用StringBuilder本身也可以避免与内存分配和垃圾回收相关的额外开销。

#### 2.2. 改善性能

StringBuilder对象是可变的，允许我们多次更改对象而无需创建新对象。这比字符串操作的性能要高得多。

#### 2.3. 减少内存使用

字符串对象是不可变的，这意味着它们在创建后不能被修改。当字符串被修改时，它会创建一个新对象，这增加了内存使用。通过使用StringBuilder实例，开发人员可以避免不必要的对象创建，减少应用程序使用的内存量。

#### 2.4. 提高缓存可靠性

当应用程序创建一个新对象时，它很可能每次都会分配在不同的内存位置，导致缓存未命中和性能下降。通过重用StringBuilder实例，同一个对象可以重复使用，从而实现更好的缓存利用和改善的性能。

### 3. 示例

在我们第一个示例中，我们将在每次循环迭代中创建一个新的StringBuilder对象：

```
for (int i = 0; i < 100; i++) {
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.append("baeldung");
    stringBuilder.toString();
}
```

另一种方式是一次又一次地重用同一个StringBuilder对象。为了做到这一点，我们需要在StringBuilder的每次迭代结束时调用delete()方法，并删除StringBuilder包含的整个字符数组：

```
StringBuilder stringBuilder = new StringBuilder();
for (int i = 0; i < 100; i++) {
    stringBuilder.append("baeldung");
    stringBuilder.toString();
    stringBuilder.delete(0, stringBuilder.length());
}
```

我们也可以在每次迭代后将StringBuilder的长度设置为零，而不是删除底层的字符数组：

```
StringBuilder stringBuilder = new StringBuilder();
for (int i = 0; i < 100; i++) {
    stringBuilder.append("baeldung");
    stringBuilder.toString();
    stringBuilder.setLength(0);
}
```

让我们比较各自示例之间的差异进行简短的基准测试：

```
Benchmark                                                   Mode  Cnt    Score    Error  Units
Example 1: new StringBuilder object                           ss   10  210,661 ± 15,237  ms/op
Example 2: reuse StringBuilder with delete()                  ss   10  185,908 ±  7,802  ms/op
Example 3: reuse StringBuilder with setLength()               ss   10  164,323 ±  1,909  ms/op
```

我们看到，正如预期的那样，每次迭代中的对象创建是最慢的。我们还可以看到，使用setLength(0)的示例比使用delete(0, stringBuilder.length())的示例更快。这主要是因为**使用setLength()，我们只改变StringBuilder的计数字段的值**。这个操作很快。而使用delete()方法时，StringBuilder对象必须删除传递范围内的字符。在这种情况下，通过传递零和最大长度，整个字符数组被删除。在数组中移动字符使这个操作复杂得多。因此**，使用setLength()方法通常更快**以达到相同的结果。

### 4. 何时重用StringBuilder

需要注意的是，并非所有的字符串操作都需要StringBuilder。我们可以在没有StringBuilder的情况下执行简单的操作，例如连接两个字符串。我们也不需要为所有操作重用StringBuilder。**我们应该在涉及大量操作或迭代的复杂字符串操作中使用可重用的StringBuilders。**

我们还需要确保在并发应用程序中的线程安全性。如果没有适当的同步，多个线程可能会使用同一个StringBuilder对象，导致意外的行为。开发人员可以通过使用同步方法或锁来防止竞争条件，确保线程安全。或者，一个类或线程可以只在当地重用StringBuilder对象。

有时**如果性能提升不是那么重要，而是确保代码易于理解**和可读，那么放弃重用StringBuilder和由此获得的性能也是有意义的。

### 5. 结论

在本文中，我们讨论了重用StringBuilder的优势，并展示了如何做到这一点的具体示例。总的来说，重用StringBuilder可以帮助减少开销并提高性能。

如往常一样，示例代码可在GitHub上找到。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)
[Gravatar Image](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)
[Gravatar Image](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)
[Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)
[Baeldung REST Post Footer](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)
[Baeldung REST Post Footer Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK