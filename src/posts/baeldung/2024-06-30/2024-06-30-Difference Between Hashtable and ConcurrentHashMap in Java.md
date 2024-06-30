---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - Hashtable
  - ConcurrentHashMap
head:
  - - meta
    - name: keywords
      content: Java, Hashtable, ConcurrentHashMap, 线程安全, 性能比较
---
# Hashtable和ConcurrentHashMap在Java中的区别

当在Java应用程序中管理键值对时，我们经常发现自己在两个主要选项之间进行选择：Hashtable和ConcurrentHashMap。尽管这两种集合都提供了线程安全的优势，但它们的底层架构和能力有显著差异。无论是构建旧系统还是处理基于微服务的云应用程序，理解这些细微差别对于做出正确选择至关重要。

在本教程中，我们将剖析Hashtable和ConcurrentHashMap之间的差异，深入探讨它们的性能指标、同步特性和其他各个方面，以帮助我们做出明智的决策。

Hashtable是Java中最古老的集合类之一，自JDK 1.0以来就存在。它提供了键值存储和检索API：

```
Hashtable``<String, String>`` hashtable = new Hashtable<>();
hashtable.put("Key1", "1");
hashtable.put("Key2", "2");
hashtable.putIfAbsent("Key3", "3");
String value = hashtable.get("Key2");
```

Hashtable的主要卖点是线程安全，这是通过方法级同步实现的。

像put()、putIfAbsent()、get()和remove()这样的方法都是同步的。在给定时间点上，只有一个线程可以执行Hashtable实例上的这些方法中的任何一个，确保数据一致性。

ConcurrentHashMap是一个更现代的替代品，作为Java 5的一部分，随着Java Collections Framework一起引入。

Hashtable和ConcurrentHashMap都实现了Map接口，这解释了方法签名的相似性：

```
ConcurrentHashMap``<String, String>`` concurrentHashMap = new ConcurrentHashMap<>();
concurrentHashMap.put("Key1", "1");
concurrentHashMap.put("Key2", "2");
concurrentHashMap.putIfAbsent("Key3", "3");
String value = concurrentHashMap.get("Key2");
```

### 4. 差异

在本节中，我们将检查设置Hashtable和ConcurrentHashMap区别的关键方面，包括并发性、性能和内存使用。

#### 4.1. 并发性

正如我们之前讨论的，Hashtable通过方法级同步实现线程安全。

另一方面，ConcurrentHashMap提供了更高级别的并发性来实现线程安全。它允许多个线程同时进行读取，并在不锁定整个数据结构的情况下执行有限的写操作。这在应用程序中特别有用，这些应用程序的读操作比写操作更多。

#### 4.2. 性能

尽管Hashtable和ConcurrentHashMap都保证了线程安全，但由于它们的底层同步机制，它们在性能上有所不同。

Hashtable在写操作期间锁定整个表，从而阻止其他读取或写入。这可能在高并发环境中成为瓶颈。

然而，ConcurrentHashMap允许并发读取和有限的并发写入，使其更具可扩展性，并且在实践中通常更快。

对于小数据集，性能差异可能不明显。然而，ConcurrentHashMap通常在更大的数据集和更高级别的并发性下展示其优势。

为了证实性能数字，我们使用JMH（Java Microbenchmark Harness）运行基准测试，它使用10个线程模拟并发活动，并执行三次热身迭代，然后进行五次测量迭代。它测量每个基准测试方法的平均时间，指示平均执行时间：

```
Benchmark                                                        Mode  Cnt   Score   Error
BenchMarkRunner.concurrentHashMap                                avgt    5   1.788 ± 0.406
BenchMarkRunner.concurrentHashMap:benchmarkConcurrentHashMapGet  avgt    5   1.157 ± 0.185
BenchMarkRunner.concurrentHashMap:benchmarkConcurrentHashMapPut  avgt    5   2.419 ± 0.629
BenchMarkRunner.hashtable                                        avgt    5  10.744 ± 0.873
BenchMarkRunner.hashtable:benchmarkHashtableGet                  avgt    5  10.810 ± 1.208
BenchMarkRunner.hashtable:benchmarkHashtablePut                  avgt    5  10.677 ± 0.541
```

基准测试结果提供了Hashtable和ConcurrentHashMap特定方法的平均执行时间的洞察。

较低的分数表示更好的性能，结果表明，平均而言，ConcurrentHashMap在get()和put()操作上都优于Hashtable。

#### 4.3. Hashtable迭代器

Hashtable迭代器是“快速失败”的，这意味着如果在创建迭代器后修改了Hashtable的结构，迭代器将抛出ConcurrentModificationException。这种机制通过在检测到并发修改时快速失败，有助于防止不可预测的行为。

在下面的示例中，我们有一个包含三个键值对的Hashtable，我们启动了两个线程：

- iteratorThread：以100毫秒的延迟遍历Hashtable的键并打印它们
- modifierThread：等待50毫秒，然后向Hashtable添加一个新的键值对

当modifierThread向Hashtable添加一个新的键值对时，iteratorThread抛出ConcurrentModificationException，表明在迭代进行中修改了Hashtable结构：

```
Hashtable``<String, Integer>`` hashtable = new Hashtable<>();
hashtable.put("Key1", 1);
hashtable.put("Key2", 2);
hashtable.put("Key3", 3);
AtomicBoolean exceptionCaught = new AtomicBoolean(false);

Thread iteratorThread = new Thread(() -> {
    Iterator``<String>`` it = hashtable.keySet().iterator();
    try {
        while (it.hasNext()) {
            it.next();
            Thread.sleep(100);
        }
    } catch (ConcurrentModificationException e) {
        exceptionCaught.set(true);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
});

Thread modifierThread = new Thread(() -> {
    try {
        Thread.sleep(50);
        hashtable.put("Key4", 4);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
});

iteratorThread.start();
modifierThread.start();

iteratorThread.join();
modifierThread.join();

assertTrue(exceptionCaught.get());
```

#### 4.4. ConcurrentHashMap迭代器

与使用“快速失败”迭代器的Hashtable不同，ConcurrentHashMap采用“弱一致性”迭代器。

这些迭代器可以承受对原始映射的并发修改，反映迭代器创建时映射的状态。它们也可能反映进一步的更改，但不保证这样做。因此，我们可以在另一个线程中修改ConcurrentHashMap，同时在另一个线程中迭代它，而不会得到ConcurrentModificationException。

下面的示例演示了ConcurrentHashMap迭代器的弱一致性特性：

- iteratorThread：以100毫秒的延迟遍历ConcurrentHashMap的键并打印它们
- modifierThread：等待50毫秒，然后向ConcurrentHashMap添加一个新的键值对

与Hashtable的“快速失败”迭代器不同，这里的弱一致性迭代器没有抛出ConcurrentModificationException。iteratorThread中的迭代器继续没有任何问题，展示了ConcurrentHashMap是如何为高并发场景设计的：

```
ConcurrentHashMap``<String, Integer>`` concurrentHashMap = new ConcurrentHashMap<>();
concurrentHashMap.put("Key1", 1);
concurrentHashMap.put("Key2", 2);
concurrentHashMap.put("Key3", 3);
AtomicBoolean exceptionCaught = new AtomicBoolean(false);

Thread iteratorThread = new Thread(() -> {
    Iterator``<String>`` it = concurrentHashMap.keySet().iterator();
    try {
        while (it.hasNext()) {
            it.next();
            Thread.sleep(100);
        }
    } catch (ConcurrentModificationException e) {
        exceptionCaught.set(true);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
});

Thread modifierThread = new Thread(() -> {
    try {
        Thread.sleep(50);
        concurrentHashMap.put("Key4", 4);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
});

iteratorThread.start();
modifierThread.start();

iteratorThread.join();
modifierThread.join();

assertFalse(exceptionCaught.get());
```

#### 4.5. 内存

Hashtable使用一个简单的数据结构，本质上是一个链表数组。这个数组的每个桶存储一个键值对，所以只有数组本身的开销和链表节点。没有其他内部数据结构来管理并发级别、负载因子或其他高级功能。因此，Hashtable总体上消耗较少的内存。

ConcurrentHashMap更复杂，由段的数组组成，本质上是一个单独的Hashtable。这允许它同时执行某些操作，但也消耗了这些段对象的额外内存。

对于每个段，它维护额外的信息，如计数、阈值、负载因子等，这增加了它的内存占用。它动态调整段的数量和大小以适应更多的条目并减少冲突，这意味着它必须保留额外的元数据来管理这些，导致进一步的内存消耗。

## 5. 结论

在本文中，我们学习了Hashtable和ConcurrentHashMap之间的区别。

Hashtable和ConcurrentHashMap都以线程安全的方式存储键值对。然而，我们看到由于其高级同步特性，ConcurrentHashMap在性能和可扩展性方面通常具有优势。

Hashtable仍然有用，可能在旧系统或明确需要方法级同步的场景中更受青睐。**了解我们应用程序的特定需求可以帮助我们在这两个之间做出更明智的决策**。

如往常一样，示例的源代码可在GitHub上获得。