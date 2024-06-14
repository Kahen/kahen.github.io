由于网页解析失败，我无法提供网页内容的翻译。请检查链接的有效性或尝试重新获取网页内容。如果需要其他帮助，请告知。---
date: 2024-06-14
category:
  - Java
tag:
  - Algorithm
  - Number
---

# 寻找具有相同数字的下一个更高数字 | Baeldung

## 1. 引言

在本教程中，我们将学习如何在Java中找到与原始数字具有相同数字集的下一个更高数字。这个问题可以通过使用排列、排序和双指针方法的概念来解决。

## 2. 问题陈述

给定一个正整数，我们需要找到使用完全相同的数字集的下一个更高数字。例如，如果输入是123，我们的目标是重新排列其数字以形成具有相同数字的下一个更高数字。在这种情况下，下一个更高数字将是132。

如果输入是654或444，那么我们返回-1以表示无法找到下一个更高数字。

## 3. 使用排列

在这种方法中，我们将利用排列来找到与输入数字相同的数字集的下一个更大数字。**我们将生成输入数字数字的所有可能排列，并将它们添加到_TreeSet_中以确保唯一性和排序。**

### 3.1. 实现

**首先，我们实现一个方法_findPermutations()_来生成输入数字_num_的数字的所有排列，并将它们添加到_TreeSet_中：**

```java
void findPermutations(int num, int index, StringBuilder sb, Set`<Integer>` hs) {
    if (index == String.valueOf(num).length()) {
        hs.add(Integer.parseInt(sb.toString()));
        return;
    }
    //...
}
```

该方法首先检查当前_index_是否等于输入数字的长度。如果是，这意味着已经完全生成了一个排列，然后我们将排列添加到_TreeSet_并返回以结束递归。

**否则，我们从当前_index_开始迭代数字的数字以生成所有排列：**

```java
for (int i = index; i < String.valueOf(num).length(); i++) {
    char temp = sb.charAt(index);
    sb.setCharAt(index, sb.charAt(i));
    sb.setCharAt(i, temp);
    //...
}
```

在每次迭代中，我们将当前索引_index_处的字符与迭代索引_i_处的字符交换。**这种交换操作有效地创建了不同的数字组合。**

交换后，该方法递归调用自身，使用更新后的_index_和修改后的_StringBuilder_：

```java
findPermutations(num, index + 1, sb, hs);
temp = sb.charAt(index);
sb.setCharAt(index, sb.charAt(i));
sb.setCharAt(i, temp); // 递归后交换回原位
```

递归调用后，我们将字符交换回原始位置，以保持_sb_的完整性，以便后续迭代。

让我们将逻辑封装在方法中：

```java
int findNextHighestNumberUsingPermutation(int num) {
    Set`<Integer>` hs = new TreeSet();
    StringBuilder sb = new StringBuilder(String.valueOf(num));
    findPermutations(num, 0, sb, hs);
    for (int n : hs) {
        if (n > num) {
            return n;
        }
    }
    return -1;
}
```

**一旦生成了所有排列，我们遍历_TreeSet_以找到大于输入数字的最小数字。** 如果找到了这样的数字，它就是下一个更大的数字。否则，我们返回-1以表示不存在这样的数字。

### 3.2. 测试

让我们验证排列解决方案：

```java
assertEquals(536497, findNextHighestNumberUsingPermutation(536479));
assertEquals(-1, findNextHighestNumberUsingPermutation(987654));
```

### 3.3. 复杂度分析

**这种实现的时间复杂度是O(n!)，在最坏的情况下，其中n是输入数字的位数。** _findPermutations()_函数生成所有可能的数字排列n!，这在时间复杂度中占主导地位。

虽然_TreeSet_为插入和检索提供了对数复杂度(log n)，但它并没有显著影响整体时间复杂度。

**在最坏的情况下，如果所有排列都是唯一的（没有重复），_TreeSet_可能会持有所有n!个数字的排列。** 这导致空间复杂度为O(n!)。

## 4. 使用排序

在这种方法中，我们将使用排序方法来确定与给定输入数字具有相同数字的下一个更大数字。

### 4.1. 实现

我们首先定义一个名为_findNextHighestNumberUsingSorting()_的方法：

```java
int findNextHighestNumberUsingSorting(int num) {
    String numStr = String.valueOf(num);
    char[] numChars = numStr.toCharArray();
    int pivotIndex;
    // ...
}
```

**在方法内部，我们将输入数字转换为字符串，然后转换为字符数组。** 我们还初始化了一个变量_pivotIndex_来标识枢轴点。

接下来，我们从右到左迭代_numChars_数组，以确定最大的数字，它小于或等于其右侧的邻居：

```java
for (pivotIndex = numChars.length - 1; pivotIndex > 0; pivotIndex--) {
    if (numChars[pivotIndex] > numChars[pivotIndex - 1]) {
        break;
    }
}
```

这个数字成为识别数字降序中的断点的枢轴点。**如果这个条件为真，这意味着我们已经找到了一个比它左边的邻居大的数字（潜在的枢轴）。** 然后我们中断循环，因为我们不需要进一步搜索更大的降序数字。

如果没有找到这样的枢轴，这意味着数字已经在降序中，因此我们返回-1：

```java
if (pivotIndex == 0) {
    return -1;
}
```

在确定了枢轴之后，代码搜索枢轴右侧的最小数字，它仍然大于枢轴本身：

```java
int pivot = numChars[pivotIndex - 1];
int minIndex = pivotIndex;

for (int j = pivotIndex + 1; j `< numChars.length; j++) {
    if (numChars[j] >` pivot && numChars[j] < numChars[minIndex]) {
        minIndex = j;
    }
}
```

**这个数字将与枢轴交换，以创建下一个更大的数字。** 我们从枢轴后一个位置开始迭代数组，使用循环找到大于枢轴的最小数字。

一旦找到了大于枢轴的最小数字，我们将它与枢轴的位置交换：

```java
swap(numChars, pivotIndex - 1, minIndex);
```

**这个交换基本上将可以大于枢轴的最小数字带到了枢轴之前的位置。**

为了创建下一个字典序更大的数字，代码需要将枢轴右侧的数字按升序排序：

```java
Arrays.sort(numChars, pivotIndex, numChars.length);
return Integer.parseInt(new String(numChars));
```

这将得到一个比原数字大的最小排列。

### 4.2. 测试

现在，让我们验证我们的排序实现：

```java
assertEquals(536497, findNextHighestNumberUsingSorting(536479));
assertEquals(-1, findNextHighestNumberUsingSorting(987654));
```

在第一个测试用例中，枢轴在索引4（数字7）处找到。接下来，为了找到大于枢轴（7）的最小数字，我们从pivotIndex + 1到末尾进行迭代。9大于枢轴（7），所以大于枢轴的最小数字在索引5（数字9）处找到。

现在，我们交换numChars[4]（7）和numChars[5]（9）。在我们交换和排序之后，numChars数组变为[5, 3, 6, 4, 9, 7]。

### 4.3. 复杂度分析

**这种实现的时间复杂度是O(n log n)，空间复杂度是O(n)。** 这是因为排序数字的实现在O(n log n)时间内，并使用字符数组来存储数字。

## 5. 使用双指针

这种方法比排序更有效。它使用双指针来找到所需的数字并操纵它们以获得下一个更高的数字。

### 5.1. 实现

在我们开始主要逻辑之前，我们创建两个辅助方法来简化数组内字符的操作：

```java
void swap(char[] numChars, int i, int j) {
    char temp = numChars[i];
    numChars[i] = numChars[j];
    numChars[j] = temp;
}

void reverse(char[] numChars, int i, int j) {
    while (i < j) {
        swap(numChars, i, j);
        i++;
        j--;
    }
}
```

然后我们开始定义一个名为_findNextHighestNumberUsingTwoPointer()_的方法：

```java
int findNextHighestNumberUsingTwoPointer(int num) {
    String numStr = String.valueOf(num);
    char[] numChars = numStr.toCharArray();
    int pivotIndex = numChars.length - 2;
    int minIndex = numChars.length - 1;
    // ...
}
```

在方法内部，我们将输入数字转换为字符数组并初始化两个变量：
- _pivotIndex_：从数组右侧跟踪枢轴索引
- _minIndex_：找到大于枢轴的数字

我们将_pivotIndex_初始化为倒数第二个数字，因为如果从最后一个数字（即numChars.length – 1）开始，它没有右的数字可以比较。**随后，我们使用一个_while_循环从右侧找到第一个_index _pivotIndex_，它的数字小于或等于