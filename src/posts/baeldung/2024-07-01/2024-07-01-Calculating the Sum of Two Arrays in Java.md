---
date: 2023-08-01
category:
  - Java
  - Arrays
tag:
  - Java
  - Arrays
  - Sum
head:
  - - meta
    - name: keywords
      content: Java, Arrays, Sum, Element-wise
------
# Java中计算两个数组元素对应求和的方法

数组是Java中最常用的数据结构之一。它们允许我们在单个变量中存储相同类型的多个值。有时，我们可能需要对两个或多个数组的元素执行一些操作，如加、减、乘、除等。

在本教程中，我们将重点介绍**如何在Java中逐元素计算两个数组的和**。

## 2. 数组求和的不同方法
在Java中计算数组的和是一个常见且有用的任务，原因有多种：
- 对向量或矩阵执行算术运算
- 从不同的来源或格式合并或混合数据
- 对数值数据进行统计分析或数据操作等

**要计算两个数组的和，它们必须具有相同的类型和大小。**如果它们的类型或大小不同，我们将得到一个_IllegalArgumentException_。为解决这个问题，我们需要创建一个同样大小的第三个数组，然后存储给定数组的相应元素的和：

让我们探索不同的方法来做到这一点。

### 2.1. 使用_for_循环
for循环是迭代两个数组元素并将它们相加的最基本和直接的方法。我们可以使用一个从0到数组长度减一的索引变量的for循环。

在循环内部，我们可以使用索引变量访问两个数组的每个元素，并将它们的和存储在第三个数组的相同索引处。让我们使用这种方法计算两个数组的和：

```java
public int[] sumOfTwoArrays(int[] arr1, int[] arr2) {
    int[] arr3 = new int[arr1.length];
    for (int i = 0; i `< arr1.length; i++) {
        arr3[i] = arr1[i] + arr2[i];
    }
    return arr3;
}
```

### 2.2. 使用_for-each_循环
for-each循环是for循环的简化版本，它不需要索引变量。相反，它使用一个变量来保存一个数组的每个元素，并遍历所有元素。

在循环内部，我们可以使用一个随着每次迭代递增的计数器变量来访问另一个数组的每个元素。然后我们可以将它们的和存储在第三个数组的相同计数器值处。接下来实现这个方法：

```java
public int[] sumOfTwoArrays(int[] arr1, int[] arr2) {
    int[] arr3 = new int[arr1.length];
    int counter = 0;
    for (int num1 : arr1) {
        arr3[counter] = num1 + arr2[counter];
        counter++;
    }
    return arr3;
}
```

### 2.3. 使用Streams
这是一种更高级的Java数组计算方法。Streams是支持各种操作（如过滤、映射、归约等）的数据序列。

我们可以使用streams将两个数组转换为_IntStream_对象，即原始int值的流。然后我们可以使用_IntStream_类的_range_方法创建一个从0到两个数组的最小长度的索引流。接下来，我们可以使用_map_方法来应用一个函数，该函数添加两个数组的相应元素并返回一个int值。最后，我们可以使用_toArray_方法将结果流收集到一个int数组中：

```java
public static int[] sumOfTwoArrays(int[] arr1, int[] arr2) {
    IntStream range = IntStream.range(0, Math.min(arr1.length, arr2.length));
    IntStream stream3 = range.map(i ->` arr1[i] + arr2[i]);
    int[] arr3 = stream3.toArray();
    return arr3;
}
```

## 3. 不同方法的比较
让我们比较和对比这些方法在**简单性**、**可读性**、**性能**、**内存使用**等方面的优缺点。

### 3.1. 使用_for_循环
**for循环是计算方法中最简单的，也是最直接的。**它不需要任何特殊的语法或特性。它也很容易理解和调试，因为它遵循清晰和顺序的逻辑。

然而，使用for循环也有一些缺点。它需要一个索引变量来访问数组的每个元素，这可能会引入错误或偏移一个的错误。它还需要一个第三个数组来存储和值，这可能会增加内存使用量和_数组索引越界_异常的风险。这使它比其他方法效率低。

### 3.2. 使用_for-each_循环
**for-each循环更简洁、优雅。**它不需要索引变量。它直接迭代元素，并使用一个计数器变量来访问另一个数组的相应元素。语法更易读和直观。

然而，它也需要一个第三个数组来存储和值，这增加了内存使用量。此外，如果不小心处理，使用计数器变量也可能引入错误或偏移一个的错误。

### 3.3. 使用Streams
**这种方法更功能性强，表达性更强。**它不需要任何索引或计数器变量，因为它使用streams将数组作为元素序列进行操作。它使用_toArray()_方法内部创建第三个数组。

缺点是_java.util.stream_可能会增加代码的冗长和复杂性。

## 4. 结论
在本文中，我们学习了如何在Java中逐元素计算两个数组的和。

代码示例可在GitHub上找到。