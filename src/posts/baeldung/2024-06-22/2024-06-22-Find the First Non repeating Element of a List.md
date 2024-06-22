---
date: 2024-06-22
category:
  - Java
  - 算法
tag:
  - 非重复元素
  - 列表处理
head:
  - - meta
    - name: keywords
      content: Java, 非重复元素, 算法, 列表处理
---
# 寻找列表中第一个不重复的元素

## 1. 引言

在本教程中，我们将探讨在列表中找到第一个不重复元素的问题。我们首先理解问题陈述，然后实现几种方法来达到期望的结果。

## 2. 问题陈述

给定一个元素列表，任务是找到列表中不重复的第一个元素。换句话说，**我们需要识别列表中只出现一次的第一个元素。**如果没有不重复的元素，我们则返回一个适当的指示，例如，_null_。

## 3. 使用 _for_ 循环

这种方法使用嵌套的 _for_ 循环来遍历列表并检查重复元素。它很直接但效率较低。

### 3.1. 实现

首先，我们遍历输入列表中的每个元素。对于每个元素，我们通过再次遍历列表来检查它是否只出现一次。如果发现元素重复，我们将标志 _isRepeating_ 设置为 _true_。如果发现元素不重复，方法返回该元素。

以下是上述思想的实现：

```java
Integer findFirstNonRepeating(List``<Integer>`` list) {
    for (int i = 0; i < list.size(); i++) {
        int current = list.get(i);
        boolean isRepeating = false;
        for (int j = 0; j < list.size(); j++) {
            if (i != j && current == list.get(j)) {
                isRepeating = true;
                break;
            }
        }
        if (!isRepeating) {
            return current;
        }
    }
    return null;
}
```

让我们通过一个示例列表来演示：

```java
[1, 2, 3, 2, 1, 4, 5, 4]
```

在第一次迭代中，内循环扫描整个列表以查找元素 _1_ 的任何其他出现。它在索引 _4_ 处找到了元素 _1_ 的另一个出现。由于元素 _1_ 在列表中的其他地方再次出现，它被认为是重复的。对元素 _2_ 的处理过程重复。在第三次迭代中，它没有在列表中找到元素 _3_ 的任何其他出现。因此，它被识别为第一个不重复的元素，方法返回 _3_。

### 3.2. 复杂度分析

设 n 为输入列表的大小。外循环遍历列表一次，产生 O(n) 次迭代。内循环还为每次外循环迭代遍历列表一次，导致每次外循环迭代产生 O(n) 次迭代。因此，总体时间复杂度是 O(n^2)。该方法使用与输入列表大小无关的常量额外空间。因此，空间复杂度是 O(1)。

**这种方法提供了一个直接的解决方案来找到列表中的第一个不重复元素。但是，它具有 O(n^2) 的时间复杂度，使其对大型列表来说效率低下。**

## 4. 使用 _indexOf()_ 和 _lastIndexOf()_

_indexOf()_ 方法检索元素第一次出现的索引，而 _lastIndexOf()_ 返回元素最后一次出现的索引。通过比较列表中每个元素的这些索引，我们可以识别只出现一次的元素。

### 4.1. 实现

在迭代过程中，我们检查每个元素的第一次出现索引是否不等于其最后一次出现索引。如果它们不相等，这意味着元素在列表中出现了多次。如果发现一个元素的第一次和最后一次出现索引相同，方法将返回该元素作为第一个不重复的元素：

```java
Integer findFirstNonRepeatedElement(List``<Integer>`` list) {
    for (int i = 0; i < list.size(); i++) {
        if (list.indexOf(list.get(i)) == list.lastIndexOf(list.get(i))) {
            return list.get(i);
        }
    }
    return null;
}
```

让我们通过提供的示例列表来演示：

```java
[1, 2, 3, 2, 1, 4, 5, 4]
```

在最初的迭代中，both _indexOf(1)_ and _lastIndexOf(1)_ return _0_ and _4_. They aren’t equal. This indicates that element _1_ is a repeating element. This process is repeated for subsequent element _2_. However, when examining element _3_, both _indexOf(3)_ and _lastIndexOf(3)_ return _2_. This equality implies that element _3_ is the first non-repeating element. Therefore, the method returns _3_ as the result.

### 4.2. 复杂度分析

设 n 为输入列表的大小。该方法遍历列表一次。**对于每个元素，它调用 _indexOf()_ 和 _lastIndexOf()_，这可能会遍历列表以找到索引。**因此，总体时间复杂度是 O(n^2)。这种方法使用常量量的额外空间。因此，空间复杂度是 O(1)。

虽然这种方法提供了一个简洁的解决方案，但由于其二次时间复杂度 (O(n^2))，它是低效的。**对于大型列表，特别是重复调用 _indexOf()_ 和 _lastIndexOf()_，这种方法可能比其他方法显著慢。**

## 5. 使用 _HashMap_

另一种方法是使用 _HashMap_ 来计算每个元素的出现次数，然后找到第一个不重复的元素。这种方法比简单的 _for_ 循环方法更有效。

### 5.1. 实现

**在这种方法中，我们遍历输入列表以计算每个元素的出现次数，并将它们存储在 _HashMap_ 中。**计数完成后，我们再次遍历列表并检查每个元素的计数是否等于 _1_。如果任何元素的计数等于 _1_，它就作为第一个不重复的元素返回。如果在遍历整个列表后没有找到不重复的元素，它返回 _-1_。

以下是上述思想的实现：

```java
Integer findFirstNonRepeating(List``<Integer>`` list) {
    Map`<Integer, Integer>` counts = new HashMap<>();
    for (int num : list) {
        counts.put(num, counts.getOrDefault(num, 0) + 1);
    }

    for (int num : list) {
        if (counts.get(num) == 1) {
            return num;
        }
    }

    return null;
}
```

让我们通过提供的示例列表来演示：

```java
[1, 2, 3, 2, 1, 4, 5, 4]
```

第一次迭代后的 _counts_ 将是：

```java
{1=2, 2=2, 3=1, 4=2, 5=1}
```

当遍历列表时，_1_ 和 _2_ 的计数大于 _1_，所以它们不是不重复的。元素 _3_ 的计数为 _1_，所以它是第一个不重复的元素。

### 5.2. 复杂度分析

设 n 为输入列表的大小。在列表中计算每个元素的出现次数需要 O(n) 时间。再次遍历列表以找到第一个不重复的元素也需要 O(n) 时间。因此，**总体时间复杂度是 O(n)**。这种方法使用的额外空间与输入列表中唯一元素的数量成比例。**在最坏的情况下，如果所有元素都是唯一的，空间复杂度是 O(n)。**

**这种方法为在广泛的输入数据中找到列表中的第一个不重复元素提供了一个有效的解决方案。**它利用 _HashMap_ 来跟踪元素的出现次数，与传统的 _for_ 循环方法相比，显著提高了性能。

## 6. 使用数组作为频率计数器

这种方法使用数组作为频率计数器来计算每个元素的出现次数并找到第一个不重复的元素。

### 6.1. 实现

首先，我们初始化一个大小为 _maxElement + 1_ 的数组 _frequency_，其中 _maxElement_ 是列表中的最大元素。我们遍历列表，对于每个元素 _num_，增加 _frequency[num]_。这一步确保 _frequency[i]_ 存储了元素 _i_ 的出现次数。

接下来，我们再次遍历列表。对于每个元素 _num_，我们检查 _frequency[num]_ 是否等于 _1_。如果 _frequency[num]_ 等于 _1_，我们返回 _num_，因为它是第一个不重复的元素：

```java
Integer findFirstNonRepeating(List``<Integer>`` list) {
    int maxElement = Collections.max(list);
    int[] frequency = new int[maxElement + 1];

    for (int num : list) {
        frequency[num]++;
    }

    for (int num : list) {
        if (frequency[num] == 1) {
            return num;
        }
    }

    return null;
}
```

让我们通过提供的示例列表来演示：

```java
[1, 2, 3, 2, 1, 4, 5, 4]
```

我们初始化频率数组，将所有元素设置为零：

```java
[0, 0, 0, 0, 0, 0]
我们遍历列表：

```java
Increment frequency[1] to 2.
Increment frequency[2] to 2.
Increment frequency[3] to 1.
Increment frequency[4] to 2.
Increment frequency[5] to 1.
```

接下来，我们再次遍历列表，对于 _frequency[1]_ 和 _frequency[2]_ 的值是 _2_，所以它不是非重复的。对于 _frequency[3]_，值等于 _1_，所以方法返回 _3_。

### 6.2. 复杂度分析

设 n 为输入列表的大小。我们两次遍历列表，但每次迭代都提供了 O(n) 的时间复杂度。这种方法比 _HashMap_ 方法更节省内存，其空间复杂度为 O(maxElement)。

这种方法在列表中的元素范围较小时特别有效，因为它避免了哈希的开销并提供了更直接的实现。**然而，如果输入列表包含负数或零，则频率数组必须覆盖所有可能的元素范围，如果适用的话，包括负数。**

## 7. 总结

以下是不同实现的比较表：

| 方法           | 时间复杂度 | 空间复杂度 | 效率 | 适合大型列表 |
| -------------- | ---------- | ---------- | ---- | ------------ |
| 使用 _for_ 循环 | O(n^2)    | O(1)       | 低   | 否           |
| 使用 _indexOf()_ | O(n^2)    | O(1)       | 低   | 否           |
| 使用 _HashMap_ | O(n)      | O(n)       | 高   | 是           |
| 使用数组计数器 | O(n)      | O(maxElement) | 高   | 否   |

## 8. 结论

在本文中，我们学习了几种在列表中找到第一个非重复元素的方法，每种方法都有其优势和考虑因素。虽然每种方法都提供了其优势和考虑因素，但 HashMap 方法因其在识别第一个非重复元素方面的效率而脱颖而出。通过利用 HashMaps，我们可以实现最佳性能。

如往常一样，示例的源代码可在 GitHub 上找到。

OK