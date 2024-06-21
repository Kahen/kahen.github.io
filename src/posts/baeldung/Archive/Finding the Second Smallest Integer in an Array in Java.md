---
date: 2024-06-15
category:
  - Java
  - Algorithm
tag:
  - Array
  - Second Smallest
---
# 在Java中找到数组中的第二小整数

## 1. 引言

在本教程中，我们将探索使用Java在数组中找到第二小元素的不同方法。

## 2. 问题陈述

给定一个整数数组，任务是在数组中找到第二小的元素。**这个值代表数组中存在的第二低的整数，假设至少有两个不同的元素。**

数组中无法找到第二小元素有两种情况：

- 如果输入数组为空（长度为0）或只包含一个元素，那么就无法识别出第二小的元素。
- 如果数组中的所有元素都相同，那么就不存在不同的第二小元素。

在这些情况下，我们将返回 _-1_ 以表示在给定的数组中没有找到第二小的数字。

让我们看看下面的例子：

```
输入: [4, 2, 8, 1, 3] 输出: 2
输入: [1, 1, 1] 输出: -1
输入: [1] 输出: -1
输入: [] 输出: -1
```

## 3. 使用数组排序

一个直接的方法是将数组按升序排序，然后返回第二个元素，它将是数组中的第二小整数。以下是通过排序数组来找到数组中第二小整数的代码：

```java
int[] arr = {5, 2, 9, 1, 7};
Arrays.sort(arr);

result = arr[1];

```

然而，这种方法有一个限制。**如果数组包含重复元素（例如，_{5, 2, 9, 1, 7, 1}_），在排序后直接访问第二个元素可能不会得到第二小的不同元素。**

为了解决重复问题，我们可以修改排序方法：

```java
int usingArraySort(int[] arr) {
    Arrays.sort(arr);
    int smallest = arr[0];

    for (int i = 1; i `< arr.length; i++) {
        if (arr[i] != smallest) {
            return arr[i];
        }
    }
    return -1;
}
```

这种修改后的方法在排序后迭代排序数组。**它一直在跟踪到目前为止遇到的最小元素。**如果它遇到一个不同的元素（与当前最小值不同），它将用该元素更新结果并跳出循环。这确保它找到了第二小的不同元素：

```java
assertEquals(4, usingArraySort(new int[] {5, 3, 8, 9, 6, 8, 4, 4}));
assertEquals(-1, usingArraySort(new int[] {5}));
assertEquals(3, usingArraySort(new int[] {5, 3}));
assertEquals(-1, usingArraySort(new int[] {5, 5, 5, 5, 5}));
```

对数组进行排序是初学者熟悉的概念，逻辑也很直接。**然而，_Arrays.sort()_ 在平均和最坏情况下通常具有 _O(n log n)_ 的时间复杂度，其中 _n_ 是数组中的元素数量。**这可能对大型数组来说是低效的。

## 4. 使用单次遍历

这种方法通过只遍历数组一次来高效地找到数组中的第二小元素。**它避免了排序的开销，并利用条件语句来更新可能的最小和第二小元素的候选项。**

以下是这种方法的代码：

```java
int usingSinglePassThrough(int[] arr) {
    int smallest = Integer.MAX_VALUE;
    int secondSmallest = Integer.MAX_VALUE;

    for (int num : arr) {
        if (num < smallest) {
            secondSmallest = smallest;
            smallest = num;
        } else if (num < secondSmallest && num != smallest) {
            secondSmallest = num;
        }
    }

    if (secondSmallest == Integer.MAX_VALUE) {
        return -1;
    } else {
        return secondSmallest;
    }
}
```

- _smallest_: 初始化为 _Integer.MAX_VALUE_ 以跟踪到目前为止遇到的当前最小元素
- _secondSmallest_: 初始化为 _Integer.MAX_VALUE_，它可能持有第二小的元素

代码使用 _for_-each 循环迭代数组。**如果当前元素 _num_ 小于 _smallest_，它就成为新的 _smallest_，而之前的 _smallest_ 被分配给 _secondSmallest_。**这确保我们同时跟踪最小和潜在的第二小元素。

**如果 _num_ 小于当前的 _secondSmallest_ 但不等于 _smallest_（避免考虑同一个元素两次），它就成为新的 _secondSmallest_。**循环结束后，如果 _secondSmallest_ 仍然是 _Integer.MAX_VALUE_，这意味着所有元素都相同，没有找到比初始 _smallest_ 更小的元素。

在这种情况下，返回 _-1_。否则，存储在 _secondSmallest_ 中的最终值作为第二小的元素返回：

```java
assertEquals(4, usingSinglePassThrough(new int[] {5, 3, 8, 9, 6, 8, 4, 4}));
assertEquals(-1, usingSinglePassThrough(new int[] {5}));
assertEquals(3, usingSinglePassThrough(new int[] {5, 3}));
assertEquals(-1, usingSinglePassThrough(new int[] {5, 5, 5, 5, 5}));
```

在最坏的情况下，循环对数组中的所有元素执行。**因此，这种方法的时间复杂度是 _O(n)_，这表示元素数量和执行时间之间的线性关系。**总的来说，这种方法避免了对整个数组进行排序，使其潜在地更快，特别是对于较大的数组。

## 5. 使用最小堆

这种方法利用最小堆数据结构来高效地找到数组中的第二小元素。**最小堆是一个优先队列，其中最小值的元素始终位于根节点。**通过策略性地操作堆大小，我们可以确保它包含最小和潜在的第二小元素。

以下是实现这种方法的代码：

```java
int usingMinHeap(int[] arr) {
    if (arr.length < 2) {
        return -1;
    }

    PriorityQueue<Integer>` minHeap = new PriorityQueue<>();
    for (int num : arr) {
        if (minHeap.isEmpty() || num != minHeap.peek()) {
            minHeap.offer(num);
        }
    }
    // 如果minHeap大小小于2，则所有元素都相同
    if (minHeap.size() < 2) {
        return -1;
    }
    minHeap.poll(); // 移除最小元素
    return minHeap.peek(); // 第二小的元素在堆的根节点
}
```

我们首先检查数组长度是否小于 _2_。如果是，我们返回 _-1_，因为没有第二小的元素。接下来，我们创建一个 _PriorityQueue_ 对象 _minHeap_。**默认情况下，_PriorityQueue_ 实现了最小堆，所以最小值的元素位于根节点。**

我们迭代数组，使用 _offer()_ 将每个元素添加到 _minHeap_。在每次迭代中，我们考虑两个条件：

- 如果堆为空，任何元素都可以添加，因为还没有更小的元素。
- 如果当前元素与堆中的最小元素不同，它可以被添加。这确保了具有与最小值相同值的重复元素不会被多次添加。

处理完整个数组后，我们检查 _minHeap_ 的大小是否小于2。**这表明所有元素都相同。**在这种情况下，我们返回 _-1_，因为没有第二小的元素。

**否则，我们使用 _poll()_ 从最小堆中移除最小元素，并使用 _peek()_ 从最小堆的根节点返回第二小的元素。**

让我们使用测试用例验证我们的解决方案：

```java
assertEquals(4, usingMinHeap(new int[] {5, 3, 8, 9, 6, 8, 4, 4}));
assertEquals(-1, usingMinHeap(new int[] {5}));
assertEquals(3, usingMinHeap(new int[] {5, 3}));
assertEquals(-1, usingMinHeap(new int[] {5, 5, 5, 5, 5}));
```

这种方法可能比排序对大型数组更有效率。然而，对于非常小的数组，创建和维护最小堆的开销可能与更简单的方法相比效率较低。

**最小堆方法可以被认为具有平均和最坏情况下的时间复杂度 _O(n)_，这比排序算法更有效率。**

## 6. 结论

在本文中，我们探讨了几种在数组中找到第二小数字的方法。对整个数组进行排序可能适用于较小的数据集，因为它是一个熟悉的概念。然而，对于较大的数据集，单次遍历或最小堆是更好的解决方案。

正如往常一样，示例的源代码可在GitHub上获取。

评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。