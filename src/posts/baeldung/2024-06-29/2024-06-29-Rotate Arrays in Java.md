---
date: 2023-10-01
category:
  - Java
  - Algorithms
tag:
  - Array Rotation
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Array Rotation, Algorithms
---
# Java中旋转数组的方法 | Baeldung

在这篇教程中，我们将学习一些在Java中旋转数组的算法。

我们将看到如何将数组元素向右旋转_k_次。我们还将了解如何就地修改数组，尽管我们可能会使用额外的空间来计算旋转。

### 2.1. 找到最小的旋转数
我们将使用字母_k_作为旋转数的别名。

### 2.2. 单元测试
我们可能想要测试_k_小于、等于和大于数组长度的情况。例如，如果我们将一个6个元素的数组旋转8次，我们只需要进行2次旋转。

### 2.3. 数组和旋转测试变量
我们将设置以下变量：

- _arr_ 作为测试长度为_6_的数组
- _rotationLtArrayLength_ = _1_ 作为小于数组长度的旋转
- _rotationGtArrayLength_ = _8_ 作为大于数组长度的旋转
- _ltArrayLengthRotation_ 作为_rotationLtArrayLength_的解决方案
- _gtArrayLengthRotation_ 作为_rotationGtArrayLength_的解决方案

让我们看看它们的初始值：

```java
int[] arr = { 1, 2, 3, 4, 5, 6 };
int rotationLtArrayLength = 1;
int rotationGtArrayLength = arr.length + 2;
int[] ltArrayLengthRotation = { 6, 1, 2, 3, 4, 5 };
int[] gtArrayLengthRotation = { 5, 6, 1, 2, 3, 4 };
```

### 2.4. 空间和时间复杂度
尽管如此，我们必须对时间和空间复杂度的概念有信心，以理解算法解决方案。

### 3. 暴力法
尝试用暴力法解决问题是一种常见的方法。这可能不是最有效的解决方案。然而，它有助于理解问题空间。

### 4. 使用额外数组
我们将使用额外的数组来放置每个元素在其正确的位置。然后，我们将复制回原始数组。

### 5. 循环替换
我们可以每次将元素替换为其所需位置。但是，我们会丢失原始值。因此，我们将在临时变量中存储它。

### 6. 反转
这是一个简单但非平凡的算法。当我们旋转时，我们可能会注意到数组后面的_k_个元素来到前面，而前面的其余元素向后移动。

### 7. 结论
在这篇文章中，我们看到了如何通过_k_次旋转来旋转数组。我们从暴力法开始，然后转向更复杂的算法，如反转或循环替换，无需额外空间。我们还讨论了时间和空间复杂度。最后，我们讨论了单元测试和一些边缘情况。

如往常一样，本文中展示的代码可在GitHub上找到。