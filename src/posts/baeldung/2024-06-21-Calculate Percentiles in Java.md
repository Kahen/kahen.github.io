由于我无法访问外部链接，包括您提供的链接，因此我无法直接获取网页内容，包括标题、日期、类别、标签等信息。如果您能提供这些信息，我可以帮您翻译。如果需要我翻译其他文本，请提供文本内容。---
date: 2024-06-21
category:
  - Java
  - 数据分析
tag:
  - 百分位数
  - 数据集
  - 统计分布
head:
  - - meta
    - name: keywords
      content: Java, 百分位数计算, 数据分析, 统计分布
---

# Java中计算百分位数

## 1. 概述

在Java中分析数据时，计算百位数是理解数值数据集的统计分布和特征的基本任务。

在本教程中，我们将逐步介绍Java中计算百分位数的过程，并提供代码示例和解释。

## 2. 理解百分位数

在讨论实现细节之前，我们首先了解百分位数是什么以及它们在数据分析中的常见用法。

**百分位数是统计学中用来表示低于某个给定百分比的观察值的值**。例如，第50百分位数（也称为中位数）表示有50%的数据点低于此值。

值得注意的是，**百分位数以与输入数据集相同的单位表示，而不是以百分比**。例如，如果数据集指的是月薪，相应的百分位数将以美元、欧元或其他货币表示。

接下来，让我们看几个具体的例子：

```
输入：一个未排序的1-100的数字数据集
-> 排序后的数据集：[1, 2, ... 49, (50), 51, 52, ... 100]
-> 第50百分位数：50

输入：[-1, 200, 30, 42, -5, 7, 8, 92]
-> 排序后的数据集：[-2, -1, 7, (8), 30, 42, 92, 200]
-> 第50百分位数：8
```

百分位数通常用于理解数据分布，识别异常值和比较不同的数据集。它们在处理大型数据集或简洁地总结数据集特征时特别有用。

接下来，让我们看看如何在Java中计算百分位数。

## 3. 从《集合》计算百分位数

既然我们了解了百分位数是什么，让我们总结一下实现百分位数计算的逐步指南：

- 将给定的数据集按升序排序
- 计算所需百分位数的等级为 _(百分位数 / 100) * 数据集大小_
- **将等级取上限值，因为等级可能是一个小数**
- 最终结果是排序后的数据集中索引 _上限(rank) – 1_ 的元素

接下来，让我们创建一个通用方法来实现上述逻辑：

```java
static `<T extends Comparable``<T>```> T getPercentile(Collection``<T>`` input, double percentile) {
    if (input == null || input.isEmpty()) {
        throw new IllegalArgumentException("输入的数据集不能为null或为空。");
    }
    if (percentile `< 0 || percentile >` 100) {
        throw new IllegalArgumentException("百分位数必须在0到100之间，包括0和100。");
    }
    List``<T>`` sortedList = input.stream()
      .sorted()
      .collect(Collectors.toList());

    int rank = percentile == 0 ? 1 : (int) Math.ceil(percentile / 100.0 * input.size());
    return sortedList.get(rank - 1);
}
```

正如我们所看到的，上面的实现相当直接。然而，值得一提的是：

- 需要证 _百分位数_ 参数 ( _0 `<= 百分位数 <= 100_ )
- 我们使用Stream API对输入的数据集进行排序，并**将排序结果收集到一个新的列表中，以避免修改原始数据集**

接下来，让我们测试我们的 _getPercentile()_ 方法。

## 4. 测试 _getPercentile()_ 方法

首先，如果百分位数超出有效范围，该方法应该抛出 _IllegalArgumentException_：

```java
assertThrows(IllegalArgumentException.class, () ->` getPercentile(List.of(1, 2, 3), -1));
assertThrows(IllegalArgumentException.class, () -> getPercentile(List.of(1, 2, 3), 101));
```

我们**使用 _assertThrows()_ 方法来验证是否引发了预期的异常**。

接下来，让我们以1-100的列表作为输入，验证该方法是否能产生预期的结果：

```java
List``<Integer>`` list100 = IntStream.rangeClosed(1, 100)
  .boxed()
  .collect(Collectors.toList());
Collections.shuffle(list100);

assertEquals(1, getPercentile(list100, 0));
assertEquals(10, getPercentile(list100, 10));
assertEquals(25, getPercentile(list100, 25));
assertEquals(50, getPercentile(list100, 50));
assertEquals(76, getPercentile(list100, 75.3));
assertEquals(100, getPercentile(list100, 100));
```

在上面的代码中，我们通过 _IntStream_ 准备了输入列表。此外，我们使用 _shuffle()_ 方法来**随机排序100个数字**。

此外，让我们用另一个数据集输入测试我们的方法：

```java
List``<Integer>`` list8 = IntStream.of(-1, 200, 30, 42, -5, 7, 8, 92)
  .boxed()
  .collect(Collectors.toList());

assertEquals(-5, getPercentile(list8, 0));
assertEquals(-5, getPercentile(list8, 10));
assertEquals(-1, getPercentile(list8, 25));
assertEquals(8, getPercentile(list8, 50));
assertEquals(92, getPercentile(list8, 75.3));
assertEquals(200, getPercentile(list8, 100));
```

## 5. 从数组计算百分位数

有时，给定的数据集输入是一个数组而不是《集合》。在这种情况下，我们可以**先将输入数组转换为《列表》**，然后使用我们的 _getPercentile()_ 方法来计算所需的百分位数。

接下来，让我们演示如何通过使用一个 _long_ 数组作为输入来实现这一点：

```java
long[] theArray = new long[] { -1, 200, 30, 42, -5, 7, 8, 92 };

//将long[]数组转换为List```<Long>```
List```<Long>``` list8 = Arrays.stream(theArray)
  .boxed()
  .toList();

assertEquals(-5, getPercentile(list8, 0));
assertEquals(-5, getPercentile(list8, 10));
assertEquals(-1, getPercentile(list8, 25));
assertEquals(8, getPercentile(list8, 50));
assertEquals(92, getPercentile(list8, 75.3));
assertEquals(200, getPercentile(list8, 100));
```

正如代码所示，**由于我们的输入是原始类型数组（long[]），我们使用了 Arrays.stream() 将其转换为 List```<Long>```。**然后，我们可以将转换后的 _List_ 传递给 _getPercentile()_ 以获得预期的结果。

## 6. 结论

在本文中，我们首先讨论了百分位数的基本原理。然后，我们探讨了如何在Java中为数据集计算百分位数。

如往常一样，示例的完整源代码可在GitHub上获得。
OK