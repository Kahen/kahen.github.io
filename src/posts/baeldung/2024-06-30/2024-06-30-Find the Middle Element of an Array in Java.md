---
date: 2022-04-01
category:
  - Java
  - Arrays
tag:
  - Java
  - Arrays
  - Middle Element
head:
  - - meta
    - name: keywords
      content: Java, Arrays, Middle Element, Algorithm
---
# 在Java中找到数组的中间元素

在本教程中，我们将探讨查找数组中间元素的问题。数组是一种数据结构，用于存储相同类型的数据元素。

数组的元素在内存中连续存储，并与索引关联。数组具有固定的长度。

### 问题陈述
**给定一个包含_n_个元素的数组，我们应该返回一个新数组，包含数组的中间元素（们）。**如果输入数组的长度是奇数，数组有一个中间元素。另一方面，如果输入数组的长度是偶数，则有两个中间元素。

我们的代码输出应该返回一个长度为1或2的数组，这取决于输入数组。

让我们看一些例子：

- 给定一个包含5个元素的输入数组：\[1, 2, 3, 4, 5\]，输出是\[3\]。由于数组的长度是5，这是一个奇数，我们可以说存在一个单一的中间元素，在我们的例子中是3。
- 给定一个包含6个元素的输入数组：\[1, 2, 3, 4, 5, 6\]，输出是\[3, 4\]。在这种情况下，数组的长度是6，这是一个偶数。这里，3和4都是数组的中间元素。

我们还应该考虑我们问题的几种边缘情况。对于空的输入数组，没有中间元素，因此一个空数组是正确的输出。数组本身是长度为1和2的数组的输出。

### 使用数组操作查找中间元素
数组的长度告诉我们它包含的元素数量。长度为_n_的数组将包含_n_个元素。元素可以通过基于0的索引访问。

#### 3.1. 奇数长度数组的中间元素
给定一个长度为_n_的数组，其中_n_是一个奇数，我们可以认为数组的第一个索引始终是_0_，数组的最后一个索引是_n-1_。一个长度为99的数组的索引从0到98，中间索引是49。

**我们知道两个值，_a_和_b_，之间的中间点始终是(_a + b_) / 2。**在我们的例子中，考虑到_a = 0_和_b = n = 98_，我们可以找到中间索引是_(0 + 99) / 2 = 49_。因此，访问_n/2_元素将给我们我们想要的输出：

```
int[] middleOfArray(int[] array) {
    int n = array.length;
    int mid = n / 2;
    return new int[] { array[mid] };
}
```

需要注意的是，_n_始终是一个整数，因为它告诉我们数组的长度，长度不能是分数。**因此，当我们执行_n/2_时，Java将执行整数除法并将丢弃小数部分。**所以，在我们之前99个元素的例子中，中间元素将是99/2 = 49，而不是49.5或50。

#### 3.2. 偶数长度数组的中间元素
现在我们知道了如何找到奇数长度数组的中间元素，让我们将解决方案扩展到偶数长度的数组。

对于偶数长度的数组，没有定义单一的中间元素。一个长度为100的数组，元素从索引0开始，将有其中间元素在索引49和50。**因此，长度为_n_的数组的中间元素，其中_n_是偶数，是索引(_n/2)-1_和_n/2_处的元素。**由于我们的输出取决于输入数组的长度，让我们将它们合并到一个方法中：

```
int[] middleOfArray(int[] array) {
    if (ObjectUtils.isEmpty(array) || array.length `< 3) {
        return array;
    }
    int n = array.length;
    int mid = n / 2;
    if (n % 2 == 0) {
        int mid2 = mid - 1;
        return new int[] { array[mid2], array[mid] };
    } else {
        return new int[] { array[mid] };
    }
}
```

我们也添加了一个小测试来验证我们的解决方案对所有类型的数组都有效：

```
int[] array = new int[100];
for (int i = 0; i < array.length; i++) {
    array[i] = i + 1;
}
int[] expectedMidArray = { 50, 51 };
MiddleOfArray middleOfArray = new MiddleOfArray();
Assert.assertArrayEquals(expectedMidArray, middleOfArray.middleOfArray(array));

int[] expectedMidArrayForOddLength = { 50 };
Assert.assertArrayEquals(expectedMidArrayForOddLength, middleOfArray.middleOfArray(Arrays.copyOfRange(array, 0, 99)));
```

#### 3.3. 数组中两个点之间的中间元素
在我们之前的部分中，我们考虑了整个数组的长度作为我们的输入，并计算了整个数组的中间。可能需要计算数组的一部分或由起始和结束索引给定的子集的中间元素（s）。

我们不能再使用数组的长度_n_来计算中间点了。而不是像我们之前那样用_start = 0_和_end = n_替换，我们可以使用提供的值并找到中间点：_middle = (start + end) / 2_。

```
int[] middleOfArrayWithStartEnd(int[] array, int start, int end) {
    int mid = (start + end) / 2;
    int n = end - start;
    if (n % 2 == 0) {
        int mid2 = mid - 1;
        return new int[] { array[mid2], array[mid] };
    } else {
        return new int[] { array[mid] };
    }
}
```

然而，这种方法有一个重大缺陷。

考虑我们正在处理一个非常大的数组，其大小约为_Integer.MAX_VALUE_。_Integer.MAX_VALUE_的值是2147483647。我们需要找到数组在索引100和2147483647之间的中间元素。

所以，在我们的例子中，_start = 100_和_end = Integer.MAX_VALUE_。当我们应用公式找到中点时，_start_ + _end_是4294966747。这个值大于_Integer.MAX_VALUE_，从而导致溢出。当我们在Java中运行时，我们得到-2147483549，这证实了溢出。

解决这个问题的方法相当简单。**我们首先找到两个值，_start_和_end，之间的差，然后添加_(end – start) / 2_到_start._所以，**_middle = start + (end – start) / 2_。**这总是让我们避免溢出：

```
int[] middleOfArrayWithStartEnd(int[] array, int start, int end) {
    int mid = start + (end - start) / 2;
    int n = end - start;
    if (n % 2 == 0) {
        int mid2 = mid - 1;
        return new int[] { array[mid2], array[mid] };
    } else {
        return new int[] { array[mid] };
    }
}
```

#### 3.4. 使用数组操作查找中间元素的性能
**我们知道访问数组中的元素是一个O(1)操作。**由于数组元素在内存中以连续块放置，跳转到特定索引是一个固定时间操作。因此，我们可以这样说，上述所有操作都是固定时间O(1)操作。

### 4. 使用位运算查找中间元素（们）
我们可以将位运算作为查找数组中间元素的替代方法。位运算是对输入值的二进制数字（位）进行操作的操作。有多种类别的位运算符，例如位逻辑运算符和位移位运算符。

**这里我们将使用一种称为无符号右移运算符的特定类型的移位运算符，即>`>>。**

无符号右移运算符，顾名思义，将输入值的所有位向右移动，新创建的空位用0填充。这有助于确保输出始终为正。

**无符号移位运算符通常用于将数字除以2的幂。**因此，_a >>> n_等同于_a / (2 ^ n)_。我们利用这一事实来找到start和end之间的中间元素（s）：

```
int[] middleOfArrayWithStartEndBitwise(int[] array, int start, int end) {
    int mid = (start + end) >>> 1;
    int n = end - start;
    if (n % 2 == 0) {
        int mid2 = mid - 1;
        return new int[] { array[mid2], array[mid] };
    } else {
        return new int[] { array[mid] };
    }
}
```

这些位运算更快，因为它们在硬件的较低级别实现，现代CPU可以利用它。

在我们的讨论中，我们没有谈论元素的性质或它们的顺序。如果数组中的元素都是数值并且按顺序排序，则会出现特殊情况。

**排序数据集中的中间元素称为数据集的中位数，它在数学和统计学中非常重要。** **中位数是任何数据集的中心趋势的度量，并提供了数据集典型值可能是什么的信息。**

对于长度为偶数的数组，中位数通常通过找到两个中间元素的平均值来计算：

```
int medianOfArray(int[] array, int start, int end) {
    Arrays.sort(array); // 为了安全起见。这可以忽略
    int mid = (start + end) >>> 1;
    int n = end - start;
    if (n % 2 == 0) {
        int mid2 = mid - 1;
        return (array[mid2] + array[mid]) / 2;
    } else {
        return array[mid];
    }
}
```

中位数值期望数据集是有序的才能正确。所以如果我们不确定数组的性质，我们应该首先按升序或降序对数组进行排序，然后使用上述任何方法找到中间值。

考虑一个问题陈述，其中我们需要找到一个国家的中位数房价。考虑到问题的性质，我们可以假设输入数据将太大，无法适应传统计算机的可用内存。**如果JVM一次无法加载整个数组到内存中，应用上述方法找到中位数将变得困难。**

在这种情况下，如果数据集太大而无法适应内存，我们可以考虑输入是流而不是传统的数组。然后我们可以使用额外的数据结构，如带有流数据的堆，来找到数据流的中位数。

## 6. 结论

在本文中，我们查看了几种查找数组中间元素的方法。我们还讨论了这个解决方案如何帮助我们找到数组的中位数。

像往常一样，所有代码示例都可以在GitHub上找到。

OK