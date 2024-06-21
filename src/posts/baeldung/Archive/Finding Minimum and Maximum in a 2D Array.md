---
date: 2024-06-14
category:
  - Java
  - 编程
tag:
  - 数组
  - 算法
---
# 在二维数组中寻找最小和最大值 | Baeldung

在本教程中，我们将讨论使用Java在二维数组中寻找最小和最大值的两种技术。二维数组是一种像网格一样的元素排列。它是一个数组的数组，其中每个内部数组代表网格中的一行。

我们首先将检查使用嵌套_for_循环的传统方法。接下来，我们将探索使用_Stream_ API来完成相同的任务。两种方法都有优缺点。最佳选择取决于我们的需求。

## 2. 使用嵌套For循环识别极值

我们将使用的第一个方法是嵌套_for_循环。这种技术提供了一种清晰直观的方法来迭代二维数组中的每个元素。**我们通过迭代数组的每一行和列来实现这一点**。当访问每个元素时，将其与我们迄今为止遇到的当前最小值和最大值进行比较：

```java
@Test
void givenArrayWhenFindMinAndMaxUsingForLoopsThenCorrect() {
    int[][] array = {{8, 4, 1}, {2, 5, 7}, {3, 6, 9}};

    int min = array[0][0];
    int max = array[0][0];
    for (int[] row : array) {
        for (int currentValue : row) {
            if (currentValue `< min) {
                min = currentValue;
            } else if (currentValue >` max) {
                max = currentValue;
            }
        }
    }

    assertEquals(1, min);
    assertEquals(9, max);
}
```

外部for循环遍历二维数组的每一行。然后，嵌套的for循环遍历当前行中的每个元素。我们检查当前元素是否小于当前最小值或大于当前最大值，必要时更新这些值。

尽管简单性使这成为一个可行的选择，但与大型数组的潜在低效率使得考虑替代方法变得值得。

## 3. 使用_Stream_识别极值

Java _Stream_ API提供了一种简洁且声明性的方式来处理数据。**我们可以使用_flatMapToInt()_方法将二维数组转换为单个元素的_Stream_**。这个方法将二维数组转换为统一的单个元素_Stream_，允许我们使用_summaryStatistics()_方法在一行代码中找到最小值和最大值：

```java
@Test
void givenArrayWhenFindMinAndMaxUsingStreamThenCorrect() {
    int[][] array = {{8, 4, 1}, {2, 5, 7}, {3, 6, 9}};

    IntSummaryStatistics stats = Arrays
      .stream(array)
      .flatMapToInt(Arrays::stream)
      .summaryStatistics();

    assertEquals(1, stats.getMin());
    assertEquals(9, stats.getMax());
}
```

_flatMapToInt()_方法将二维数组的嵌套结构展平为单个元素的_Stream_。

从这个统一的所有元素_Stream_中，我们使用_summaryStatistics()_方法。**这个方法终止_Stream_并生成内容的摘要**。这个摘要包括最小值和最大值，还提供了_Stream_中元素的平均值、总和和计数。

虽然_summaryStatistics()_提供了一种方便的方式来找到最小值和最大值，_Stream_ API还提供了专用的方法_min()_和_max()_，分别用于找到_Stream_中的最小和最大元素。当我们只需要最小值或最大值而不是其他统计数据时，这种方法是简洁的。

### 3.1 并行处理

**为了提高效率，我们可以使用_Stream_ API进行并行处理**。这涉及到使用多个线程来分配计算工作负载，可能在大型数组中减少处理时间：

```java
@Test
void givenArrayWhenFindMinAndMaxUsingParallelStreamThenCorrect() {
    int[][] array = {{8, 4, 1}, {2, 5, 7}, {3, 6, 9}};

    IntSummaryStatistics stats = Arrays
      .stream(array)
      .parallel()
      .flatMapToInt(Arrays::stream)
      .summaryStatistics();

    assertEquals(1, stats.getMin());
    assertEquals(9, stats.getMax());
}
```

虽然_Stream_ API的语法对初学者来说可能不那么直观，但它在简洁性和性能方面的好处使其成为一个有价值的工具。

## 4. 结论

在这篇简短的文章中，我们探讨了在Java中识别二维数组中最小和最大值的两种有效方法。嵌套_for_循环提供了一种简单直观的方法，特别适合在清晰和简单性重要的情境中使用。另一方面，_Stream_ API提供了一种简洁、表达性强且性能优越的方法，非常适合处理大型数组。

如常，代码可在GitHub上找到。