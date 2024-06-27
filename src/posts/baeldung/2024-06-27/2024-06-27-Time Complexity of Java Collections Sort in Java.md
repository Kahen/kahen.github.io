---
date: 2024-06-27
category:
  - Java
  - 算法
tag:
  - Java Collections
  - 时间复杂度
head:
  - - meta
    - name: keywords
      content: Java Collections Sort, 时间复杂度, TimSort, Java Microbenchmark Harness (JMH), 排序算法效率
------
# Java中Collections.sort()的时间复杂度

在本教程中，我们将利用Java微基准测试工具（JMH）探索_Collections.sort()_的时间复杂度，并提供示例来说明其效率。

## 2. 时间复杂度

理解算法的时间复杂度对于评估其效率至关重要。具体来说，_Collections.sort()_的时间复杂度在最佳情况下是_O(n)_，在最坏和平均情况下是_O(n log n)_，其中_n_是集合中元素的数量。

### 2.1. 最佳情况时间复杂度

在Java中，_Collections.sort()_使用TimSort算法进行排序。在以下示例中，TimSort算法首先确定运行长度，创建四个运行：

然后，对这些单独的运行执行插入排序。接着，以成对的方式合并这些运行，从运行#1和#2开始，然后是#3和#4，最后合并剩余的两个运行。这个合并过程最终生成一个完全排序的数组。

在近乎排序好的数组中，Timsort的时间复杂度为_O(n)_，它利用现有的顺序并有效地对数据进行排序。粗略估计，在这种情况下，Timsort可能执行大约20-25次比较和交换。

以下Java代码演示了使用_Collections.sort()_方法对已经排序好的数组进行排序的时间复杂度：

```java
public static void bestCaseTimeComplexity() {
    Integer[] sortedArray = {19, 22, 19, 22, 24, 25, 17, 11, 22, 23, 28, 23, 0, 1, 12, 9, 13, 27, 15};
    List`````<Integer>````` list = Arrays.asList(sortedArray);
    long startTime = System.nanoTime();
    Collections.sort(list);
    long endTime = System.nanoTime();
    System.out.println("O(n)执行时间: " + (endTime - startTime) + " 纳秒");
}
```

### 2.2. 平均和最坏情况时间复杂度

在未排序数组的情况下，TimSort的平均和最坏情况时间复杂度为_O(n log n)_，因为它需要更多的比较和交换操作来对数组进行排序。

让我们看看以下图表：

Timsort将为这个特定的数组执行大约60-70次比较和交换。

运行以下代码将展示排序未排序列表的执行时间，展示_Collections.sort()_使用的排序算法在平均和最坏情况下的性能：

```java
public static void worstAndAverageCasesTimeComplexity() {
    Integer[] sortedArray = {20, 21, 22, 23, 24, 25, 26, 17, 28, 29, 30, 31, 18, 19, 32, 33, 34, 27, 35};
    List`````<Integer>````` list = Arrays.asList(sortedArray);
    Collections.shuffle(list);
    long startTime = System.nanoTime();
    Collections.sort(list);
    long endTime = System.nanoTime();
    System.out.println("O(n log n)执行时间: " + (endTime - startTime) + " 纳秒");
}
```

## 3. **JMH报告**

在这一部分，我们将使用JMH来评估_Collections.sort()_的效率和性能特征。

以下基准配置对于在不太有利的条件下评估排序算法的效率至关重要，为我们提供了关于其在平均和最坏情况下行为的宝贵见解：

```java
@State(Scope.Benchmark)
public static class AverageWorstCaseBenchmarkState {
    List`````<Integer>````` unsortedList;

    @Setup(Level.Trial)
    public void setUp() {
        unsortedList = new ArrayList<>();
        for (int i = 1000000; i > 0; i--) {
            unsortedList.add(i);
        }
    }
}
@Benchmark
public void measureCollectionsSortAverageWorstCase(AverageWorstCaseBenchmarkState state) {
    List`````<Integer>````` unsortedList = new ArrayList<>(state.unsortedList);
    Collections.sort(unsortedList);
}
```

这里，用@Benchmark注解的方法，名为measureCollectionsSortAverageWorstCase，采用benchmark状态的实例，并使用_Collections.sort()_方法来评估算法在排序严重未排序列表时的性能。

现在，让我们看看一个类似的基准测试，但是针对最佳情况，数组已经排序：

```java
@State(Scope.Benchmark)
public static class BestCaseBenchmarkState {
    List`````<Integer>````` sortedList;

    @Setup(Level.Trial)
    public void setUp() {
        sortedList = new ArrayList<>();
        for (int i = 1; i <= 1000000; i++) {
            sortedList.add(i);
        }
    }
}
@Benchmark
public void measureCollectionsSortBestCase(BestCaseBenchmarkState state) {
    List`````<Integer>````` sortedList = new ArrayList<>(state.sortedList);
    Collections.sort(sortedList);
}
```

提供的代码片段引入了一个基准测试类BestCaseBenchmarkState，用@State(Scope.Benchmark)注解。此外，这个类中的@Setup(Level.Trial)方法初始化了一个从1到1,000,000的整数排序列表，创建了一个测试环境。

执行测试将给我们以下报告：

```plaintext
Benchmark                                            Mode  Cnt   Score    Error   Units
Main.measureCollectionsSortAverageWorstCase          avgt   5    36.810 ± 144.15 ms/op
Main.measureCollectionsSortBestCase                  avgt   5     8.190 ± 7.229  ms/op
```

**基准测试报告表明，在最佳情况下，_Collections.sort()_算法的平均执行时间显著降低，大约为每次操作8.19毫秒，与平均和最坏情况下相对较高的平均时间大约36.81毫秒每次操作相比，这证实了使用大O表示法显示的差异。**

## 4. 结论

总之，使用Java微基准测试工具（JMH）对_Collections.sort()_算法的时间复杂度进行的检查证实了其在最佳情况下的_O(n)_时间复杂度和在平均及最坏情况下的_O(n log n)_时间复杂度。

如常，本文的完整代码示例可以在GitHub上找到。