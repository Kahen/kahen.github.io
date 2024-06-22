---
date: 2024-06-23
category:
  - Java
  - Algorithm
tag:
  - Equilibrium Index
  - Array
head:
  - - meta
    - name: keywords
      content: Java, Algorithm, Equilibrium Index, Array
---
# 在Java中查找数组的平衡索引

## 1. 概述

在本教程中，我们首先学习数组平衡索引的定义。随后，我们将编写一个方法来识别和定位它们。

## 2. 问题陈述

**给定一个大小为N的零索引数组_A_，如果索引_i_满足左侧元素之和等于右侧元素之和，则该索引是平衡索引。** 也就是说：A[0] + A[1] + … + A[i-1] = A[i+1] + A[i+2] + … + A[N-1]。特别是，对于数组的第一个和最后一个索引，其他元素的和应该是0。例如，考虑数组_{1, -3, 0, 4, -5, 4, 0, 1, -2, -1}_：

- 1是一个平衡索引，因为A[0] = 1且A[2] + A[3] + A[4] + A[5] + A[6] + A[7] + A[8] + A[9] = 0 + 4 + (-5) + 4 + 0 + 1 + (-2) + (-1) = 1
- 4也是一个平衡索引，因为A[0] + A[1] + A[2] + A[3] = 1 + (-3) + 0 + 4 = 2且A[5] + A[6] + A[7] + A[8] + A[9] = 4 + 0 + 1 + (-2) + (-1) = 2
- A[0] + A[1] + A[2] + A[3] + A[4] + A[5] + A[6] + A[7] + A[8] = 1 + (-3) + 0 + 4 + (-5) + 4 + 0 + 1 + (-2) = 0且没有索引大于9的元素，所以9也是这个数组的平衡索引
- 另一方面，5不是平衡索引，因为A[0] + A[1] + A[2] + A[3] + A[4] = 1 + (-3) + 0 + 4 + (-5) = -3，而A[6] + A[7] + A[8] + A[9] = 0 + 1 + (-2) + (-1) = -2

## 3. 算法

让我们思考如何找到数组的平衡索引。首先想到的解决方案可能是遍历所有元素，然后计算两个和。然而，这将涉及对数组元素的内部迭代，这将损害我们算法的性能。

因此，我们最好首先计算数组的所有部分和。**索引_i_处的部分和是所有索引小于或等于_i_的_A_元素的和。** 我们可以通过一次对初始数组的迭代来完成这个操作。然后，我们将注意到我们可以通过部分和数组获得我们需要的两个和：

- 如果_i=0_，则在部分和数组的索引_i-1_处找到左侧元素的和；否则为0
- 右侧索引元素的和等于数组的总和减去直到索引_i_的所有数组元素的和，或者用数学术语来说：A[i+1] + A[i+2] + … + A[N-1] = A[0] + A[1] + … + A[i-1] + A[i] + A[i+1] + … + A[N-1] – (A[0] + A[1] + … + A[i])。数组的总和是部分和数组在索引_N-1_处的值，第二个和是部分和数组在索引_i_处的值

之后，我们将简单地遍历数组，如果两个表达式相等，就将元素添加到平衡索引列表中。因此，我们算法的复杂度是_O(N)_。

## 4. 计算部分和

除了部分和之外，0是0之前_A_元素的和。此外，0是累积和的自然起点。因此，**在我们的部分和数组前面添加一个元素，值为0**：

```
int[] partialSums = new int[array.length + 1];
partialSums[0] = 0;
for (int i=0; i`<array.length; i++) {
    partialSums[i+1] = partialSums[i] + array[i];
}
```

简而言之，在我们的实现中，部分和数组在索引_i+1_处包含A[0] + A[1] + … + A[i]的和。换句话说，**我们的部分和数组的第_i_个值等于所有索引小于_i_的_A_元素的和**。

## 5. 列出所有平衡索引

**现在我们可以遍历我们的初始数组，并决定给定的索引是否是平衡的**：

```
List``<Integer>``` equilibriumIndexes = new ArrayList``<Integer>``();
for (int i=0; i<array.length; i++) {
    if (partialSums[i] == (partialSums[array.length] - (partialSums[i+1]))) {
        equilibriumIndexes.add(i);
    }
}
```

正如我们所看到的，我们在我们的结果_List_中收集了所有符合条件项。

让我们看看我们的方法作为一个整体：

```
List``<Integer>`` findEquilibriumIndexes(int[] array) {
    int[] partialSums = new int[array.length + 1];
    partialSums[0] = 0;
    for (int i=0; i<array.length; i++) {
        partialSums[i+1] = partialSums[i] + array[i];
    }

    List``<Integer>`` equilibriumIndexes = new ArrayList``<Integer>``();
    for (int i=0; i<array.length; i++) {
        if (partialSums[i] == (partialSums[array.length] - (partialSums[i+1]))) {
            equilibriumIndexes.add(i);
        }
    }
    return equilibriumIndexes;
}
```

正如我们命名我们的类_EquilibriumIndexFinder_，我们现在可以在我们的示例数组上对我们的方法进行单元测试：

```
@Test
void givenArrayHasEquilibriumIndexes_whenFindEquilibriumIndexes_thenListAllEquilibriumIndexes() {
    int[] array = {1, -3, 0, 4, -5, 4, 0, 1, -2, -1};
    assertThat(new EquilibriumIndexFinder().findEquilibriumIndexes(array)).containsExactly(1, 4, 9);
}
```

我们使用了AssertJ来检查输出_List_是否包含正确的索引：我们的方法按预期工作！

## 6. 结论

在本文中，我们设计并实现了一个算法来查找Java数组的所有平衡索引。数据结构不必是数组。它也可以是_List_或任何有序整数序列。

如常，代码可在GitHub上找到。