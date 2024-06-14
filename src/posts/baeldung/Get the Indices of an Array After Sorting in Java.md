---
date: 2024-06-14
category:
  - Java
  - 编程
tag:
  - 数组排序
  - 索引
---
# Java中数组排序后获取索引的方法 | Baeldung

## 1. 引言

在Java中对数组进行排序是一项常见操作，但有时我们还需要知道排序后元素的原始索引。这些信息对于某些算法和应用至关重要。

**在本教程中，我们将展示在Java中实现这一点的不同方法。**

## 2. 问题描述

对数组进行排序是一项基本操作，但在某些场景中，我们不仅需要按顺序排列值；我们还需要保留这些值的原始位置。当我们想要知道排序后元素的顺序如何变化时，这一点尤其重要。让我们考虑以下数组：

```
int[] array = {40, 10, 20, 30};
```

在这个数组排序之前，元素的索引（位置）是：

- 索引0: 40
- 索引1: 10
- 索引2: 20
- 索引3: 30

对这个数组进行排序后，我们得到了元素的新索引：

- 索引0: 10（原始索引1）
- 索引1: 20（原始索引2）
- 索引2: 30（原始索引3）
- 索引3: 40（原始索引0）

**我们的目标是在升序排序这个数组的同时，也跟踪索引如何根据排序后的值变化。**

## 3. 使用带有索引的自定义比较器

获取排序后索引的一种方法是使用一个自定义比较器，该比较器在维护数组元素的同时保留索引。此外，这种方法允许我们根据元素值对数组进行排序，同时跟踪它们的原始位置。

现在，让我们通过一些代码来演示：

```java
int[] array = {40, 10, 20, 30};

@Test
void givenArray_whenUsingCustomComparator_thenSortedIndicesMatchExpected() {
    Integer[] indices = new Integer[array.length];
    for (int i = 0; i `< array.length; i++) {
        indices[i] = i;
    }

    Arrays.sort(indices, Comparator.comparingInt(i ->` array[i]));

    assertArrayEquals(new Integer[]{1, 2, 3, 0}, indices);
}
```

在这个例子中，我们初始化一个_indices_数组来保存原始数组_array_的索引。_indices_数组的每个元素代表_array_中相应元素的索引。

**通过使用自定义比较器与_Arrays.sort()_方法，我们指定_indices_数组应该根据_array_中的值进行排序。此外，_Comparator.comparingInt(i -> array[i])_根据_indices_数组中索引处_array_的值来比较元素。**

排序后，我们使用_assertArrayEquals()_来验证排序后的_indices_数组是否符合预期的顺序_\[1, 2, 3, 0\]_。

## 4. 使用Java 8 _Stream_ API

Java 8的一个重大新特性是引入了流功能——_java.util.stream_——它包含了处理元素序列的类。

以下是我们如何利用Java 8 _Stream_ API来获取并根据原始数组中的值排序索引：

```java
@Test
void givenArray_whenUsingStreamAPI_thenSortedIndicesMatchExpected() {
    List```<Integer>``` indices = IntStream.range(0, array.length)
      .boxed().sorted(Comparator.comparingInt(i -> array[i])).collect(Collectors.toList());

    assertIterableEquals(Arrays.asList(1, 2, 3, 0), indices);
}
```

在这里，我们使用_IntStream.range()_方法生成从_0_到_array.length – 1_的整数索引流。然后，使用_boxed()_方法将此流转换为_Stream```<Integer>```_。

接着，我们使用_sorted()_操作，使用由_Comparator.comparingInt(i -> array[i])_定义的比较器。这里，流中的每个索引_i_映射到_array_中的相应值，比较器基于这些值。最后，我们使用_collect(Collectors.toList())_方法将排序后的_indices_收集到_List```<Integer>```_中。

## 5. 结论

总之，我们探索了Java中在排序数组的同时保留原始元素索引的有效方法。这些信息对于需要维护元素位置关系的算法和应用至关重要。

像往常一样，相关的源代码可以在GitHub上找到。