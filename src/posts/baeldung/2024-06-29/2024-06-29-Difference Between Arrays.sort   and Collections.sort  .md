---
date: 2024-06-30
category:
  - Java
  - 算法
tag:
  - Arrays.sort
  - Collections.sort
head:
  - - meta
    - name: keywords
      content: Java, Arrays.sort, Collections.sort, 排序算法, 性能比较
---
# Java 中 Arrays.sort() 与 Collections.sort() 的区别

排序是计算机科学中的一项基本操作，对于各种应用中的数据组织和操作至关重要。在本教程中，我们将比较 Java 中常用的两种排序方法：Arrays.sort() 和 Collections.sort()。尽管这两种方法的主要功能是排序数据，但每种方法都有其自身的特征、注意事项和最佳使用场景。

### 2.1. Arrays.sort()
**Arrays.sort() 方法是 Java 中用于排序数组的实用函数。** 它允许对原始数据类型的数组和对象数组进行排序。无论是处理数值数据还是按字母顺序排列的字符串，Arrays.sort() 都可以将元素按升序排列。此外，我们可以通过自定义比较器来修改对象数组的行为。这个方法是 java.util.Arrays 类的一部分，该类提供了一整套用于数组操作的实用工具。

### 2.2. Collections.sort()
**另一方面，Collections.sort() 旨在对 Java 集合框架中的 List 接口实例进行排序。** 与仅限于数组的 Arrays.sort() 不同，Collections.sort() 可以对更动态的数据结构进行排序，如 ArrayList、LinkedList 以及其他实现 List 接口的类。Collections.sort() 是 java.util.Collections 类的成员，这是一个充满静态方法用于操作集合的实用类。

## 稳定性
假设我们有一组任务：
```java
tasks = new ArrayList<>();
tasks.add(new Task(1, 1, "2023-09-01"));
// ... 省略其他任务添加代码 ...
```
我们希望首先按优先级对它们进行排序，然后按到期日期排序。我们将使用两种不同的方法对它们进行排序。在第一种情况下，我们将使用 Collections 提供的稳定算法：
```java
final List``<Task>`` tasks = Tasks.supplier.get();
Collections.sort(tasks, Comparator.comparingInt(Task::getPriority));
// ... 省略其他代码 ...
```
我们还将使用非稳定算法对任务进行排序。因为 Java 不提供使用非稳定算法对引用类型列表进行排序的选项，我们有一个简单的快速排序实现：
```java
List``<Task>`` tasks = Tasks.supplier.get();
quickSort(tasks, Comparator.comparingInt(Task::getPriority));
// ... 省略其他代码 ...
```
代码基本相同。唯一的区别是使用的算法。排序发生在两个步骤中。第一步按优先级对任务进行排序，第二步按到期日期排序。

结果的差异是微妙的，但可能会显著影响代码的功能并引入难以调试的错误。稳定版本产生的输出如下：
```java
After sorting by due date:
Task: #9  | Priority: 1 | Due Date: 2023-08-28
// ... 省略其他任务输出 ...
```
任务按日期排序，当日期相同时，先前的按优先级排序将被保留。而非稳定版本给出这样的结果：
```java
After sorting by due date:
Task: #9  | Priority: 1 | Due Date: 2023-08-28
// ... 省略其他任务输出，注意任务 #2 和 #12 的优先级颠倒了 ...
```
这是因为非稳定算法在处理相等但可区分的项目时会产生非确定性行为。

**由于原始类型没有身份或额外参数，我们可以使用非稳定算法对它们进行排序。** 它们唯一拥有的就是值，这就是为什么我们不关心用于原始类型的算法的稳定性。如上例所示，稳定性特性对于排序对象至关重要。

这就是为什么 Arrays.sort() 对原始类型使用相同的非稳定算法实现，如快速排序或双轴快速排序。**当处理引用类型的集合时，Arrays.sort() 和 Collections.sort() 都使用相同的实现，通常是归并排序或 TimSort。**

## 复杂性
让我们通过一个简单的示例来比较归并排序和快速排序，以展示这些算法之间的区别，最终是 Collections.sort() 和 Arrays.sort() 之间的区别。**我们将使用这两种算法的简单实现。** 这是部分因为 Java 没有直接提供这些算法，所以我们可以选择它们，部分是因为当前的算法有太多的调整和改进。因此，很难为它们开发类似的测试用例。

我们将运行以下测试来比较吞吐量：
```java
// ... 省略测试代码 ...
```
运行这些测试后，我们得到了两个工件：一个是性能指标，另一个是垃圾收集日志。

### 4.1. 时间复杂度
让我们回顾一下上述测试的性能指标：
```java
Benchmark                                    Mode  Cnt     Score     Error  Units
PerformanceBenchmark.mergeSortRandomNumber  thrpt    4  1489.983 ± 401.330  ops/s
PerformanceBenchmark.quickSortRandomNumber  thrpt    4  2757.273 ±  29.606  ops/s
```
**首先，使用快速排序对随机数进行排序通常比归并排序快近两倍。** 快速排序是原地进行的，减少了影响性能的空间复杂度，我们将在下一节中讨论。

我们还可以看到快速排序在某些情况下可能会迅速退化：
```java
Benchmark                                    Mode  Cnt     Score     Error  Units
PerformanceBenchmark.mergeSortSameNumber    thrpt    4  5295.502 ±  98.624  ops/s
PerformanceBenchmark.quickSortSameNumber    thrpt    4   118.211 ±   0.117  ops/s
```
例如，当所有数字都相同时，归并排序表现得更好，速度非常快。**尽管我们使用的是快速排序和归并排序的简单实现，但它们的行为通常与更优化和更复杂的对应物相似。**

请记住，算法的性能和其时间复杂度可能不相关，因为我们应该考虑许多其他因素：空间复杂度、隐藏的常数因子、优化、自适应性等。

**快速排序和双轴快速排序的上限比归并排序或 TimSort 高。** 然而，由于一系列改进和检查，性能问题变得可以忽略不计，总的来说，可以忽略。**因此，我们可以假设归并排序、TimSort、快速排序和双轴快速排序具有相同的时间复杂度。**

例如，DualPivotQuicksort.sort() 方法考虑了许多参数，如并行化、数组大小、预排序运行，甚至是递归深度。根据原始类型和数组的大小，Java 可以使用不同的算法，如插入排序或计数排序。这就是为什么很难比较高度优化的算法；它们通常会产生类似的结果。

### 4.2. 空间复杂度
**正如前面提到的，虽然快速排序和双轴快速排序是非稳定的，但它们以使用较少的空间作为权衡。** 根据实现，它们可能有最多 O(log*n) 的空间复杂度。这是一个可能对性能产生重大影响的不错特性。在我们的例子中，让我们专注于对随机数进行排序。

虽然这些算法的时间复杂度被认为大致相同，但我们在性能上有显著的差异：
```java
Benchmark                                    Mode  Cnt     Score     Error  Units
PerformanceBenchmark.mergeSortRandomNumber  thrpt    4  1489.983 ± 401.330  ops/s
PerformanceBenchmark.quickSortRandomNumber  thrpt    4  2757.273 ±  29.606  ops/s
```

为了调查这种差异，我们可以查看垃圾收集日志。我们将使用 IBM 垃圾收集和内存可视化器：
| 变体 | mergeSort | quickSort |
| --- | --- | --- |
| 强制收集次数 | 0 | 0 |
| 完整收集 | 0 | 0 |
| GC 模式 | G1 | G1 |
| 平均垃圾收集暂停时间 (ms) | 0.33 | 0.47 |
| 由于分配失败触发的收集次数 | 26848 | 588 |
| 在垃圾收集暂停中花费的时间比例 (%) | 0.72 | 0.02 |
| 在全局停止垃圾收集暂停中花费的时间比例 (%) | 0.72 | 0.02 |
| 在未暂停中花费的时间比例 (%) | 99.28 | 99.98 |
| 年轻收集 - 平均垃圾收集暂停时间 (ms) | 0.33 | 0.47 |
| 年轻收集 - 收集间隔平均时间 (ms) | 46.6 | 2124 |

如我们所见，MergeSort 的垃圾收集事件数量显著更高（26848 对比 588），这是可以理解的，因为该算法使用更多的空间。

### 4.3. 优化
由于归并排序和 TimSort 需要更多的空间，使用非稳定算法对原始类型进行排序是优化步骤，假设快速排序和双轴快速排序退化到 O(n^2) 是可以忽略不计的。技术上，可以使用非稳定排序算法对引用类型的集合进行排序并获得性能提升。**如果稳定性不重要或相等的对象不可区分，这是可以做到的。**

我们可以使用的一个改进是将包装类转换为原始类型，进行排序，然后再转换回来。让我们考虑以下测试：
```java
// ... 省略测试代码 ...
```
使用 Arrays.sort() 的事实显著提高了我们的性能 _Collection.sort()_：
```java
Benchmark                                       Mode  Cnt     Score     Error  Units
ObjectOverheadBenchmark.sortingObjectArrayth rpt    4   982.849 ±  19.201  ops/s
ObjectOverheadBenchmark.sortingObjects         thrpt    4   976.778 ±  10.580  ops/s
ObjectOverheadBenchmark.sortingPrimitiveArray  thrpt    4  1998.818 ± 373.654  ops/s
```

对 `int[]` 进行排序的性能提升了超过 100%。

## 实现细节的 Arrays.sort() 和 Collections.sort()
**请注意，前几节中使用的算法和测试并不反映库实现的性能，因为它们有更复杂的过程，允许它们优化特定情况。** 测试仅用于提供有关这两种算法简单实现的内部工作方式的更多直观信息。

没有它们的底层算法，实际上不可能比较 Collections.sort() 和 Arrays.sort()。

**底层算法是这些两种方法的复杂性和性能的关键部分。** 因为 Collections.sort() 是以稳定性为考虑实现的，它们使用归并排序或 TimSort。同时，对原始类型的排序不需要这个属性，可以使用快速排序或双轴快速排序。

为了更好地理解这些方法，我们直接查看了它们使用的排序算法。

## 结论
排序是计算机科学的基石操作之一，它使许多应用程序能够高效地进行数据操作。通过了解算法之间的差异，我们可以在编码和优化性能及功能时做出更明智的决策，以满足特定要求。

因此，尽管本文旨在突出 Collections.sort() 和 Arrays.sort() 之间的区别。它也是了解不同排序算法之间差异的一个很好的指南。如常，算法实现的代码可以在 GitHub 上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/cb3ee72a94d923d6529e5b811c1d0b7d?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK