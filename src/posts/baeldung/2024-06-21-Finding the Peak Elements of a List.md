---
date: 2024-06-21
category:
  - Java
  - Algorithms
tag:
  - Peak Elements
  - Array
  - Binary Search
head:
  - - meta
    - name: keywords
      content: Java, Algorithms, Peak Elements, Array, Binary Search
---
# 寻找列表中的峰值元素 | Baeldung

## 1. 引言

数组中的峰值元素对于许多算法来说都非常重要，它们为数据集的特性提供了宝贵的洞察。在本教程中，我们将探讨峰值元素的概念，解释它们的重要性，并探索在单峰和多峰情况下有效识别它们的高效方法。

## 2. 什么是峰值元素？

**数组中的峰值元素定义为严格大于其相邻元素的元素。** 如果边元素大于它们唯一的相邻元素，则认为它们处于峰值位置。

在元素相等的情况下，不存在严格的峰值。相反，峰值是元素首次超过其邻居的第一个实例。

### 2.1. 示例

为了更好地理解峰值元素的概念，请看以下示例：

**示例 1：**

```
列表: [1, 2, 20, 3, 1, 0]
峰值元素: 20
```

这里，20是一个峰值，因为它大于它的相邻元素。

**示例 2：**

```
列表: [5, 13, 15, 25, 40, 75, 100]
峰值元素: 100
```

100是一个峰值，因为它大于75，并且没有元素在它的右侧。

**示例 3：**

```
列表: [9, 30, 13, 2, 23, 104, 67, 12]
峰值元素: 30 或 104，两者都是有效的峰值
```

30和104都符合峰值的条件。

## 3. 寻找单峰元素

当数组只包含一个峰值元素时，一种直接的方法是使用线性搜索。**这种算法扫描数组元素，将每个元素与其邻居进行比较，直到找到一个峰值。** 这种方法的时间复杂度是 _O(n)_，其中 n 是数组的大小。

```java
public class SinglePeakFinder {
    public static OptionalInt findSinglePeak(int[] arr) {
        int n = arr.length;

        if (n `< 2) {
            return n == 0 ? OptionalInt.empty() : OptionalInt.of(arr[0]);
        }

        if (arr[0] >`= arr[1]) {
            return OptionalInt.of(arr[0]);
        }

        for (int i = 1; i `< n - 1; i++) {
            if (arr[i] >`= arr[i - 1] && arr[i] >= arr[i + 1]) {
                return OptionalInt.of(arr[i]);
            }
        }

        if (arr[n - 1] >= arr[n - 2]) {
            return OptionalInt.of(arr[n - 1]);
        }

        return OptionalInt.empty();
    }
}
```

该算法从索引 1 到 n-2 遍历数组，检查当前元素是否大于其邻居。如果找到峰值，就返回包含峰值的 OptionalInt。此外，该算法还处理了数组极端情况下的峰值。

```java
public class SinglePeakFinderUnitTest {
    @Test
    void findSinglePeak_givenArrayOfIntegers_whenValidInput_thenReturnsCorrectPeak() {
        int[] arr = {0, 10, 2, 4, 5, 1};
        OptionalInt peak = SinglePeakFinder.findSinglePeak(arr);
        assertTrue(peak.isPresent());
        assertEquals(10, peak.getAsInt());
    }

    @Test
    void findSinglePeak_givenEmptyArray_thenReturnsEmptyOptional() {
        int[] arr = {};
        OptionalInt peak = SinglePeakFinder.findSinglePeak(arr);
        assertTrue(peak.isEmpty());
    }

    @Test
    void findSinglePeak_givenEqualElementArray_thenReturnsCorrectPeak() {
        int[] arr = {-2, -2, -2, -2, -2};
        OptionalInt peak = SinglePeakFinder.findSinglePeak(arr);
        assertTrue(peak.isPresent());
        assertEquals(-2, peak.getAsInt());
    }
}
```

在位单调数组的情况下——其特征是先单调递增序列后单调递减序列——可以更高效地找到峰值。**通过应用修改后的二分搜索技术，我们可以在 _O(log n)_ 时间内定位峰值，显著降低复杂度。**

需要注意的是，确定数组是否为位单调需要检查，而在最坏情况下，这可能接近线性时间。因此，当已知数组的位单调特性时，二分搜索方法的效率提升最为显著。

## 4. 寻找多个峰值元素

在数组中识别多个峰值元素通常需要检查每个元素与其邻居的关系，导致线性搜索算法的时间复杂度为 _O(n)_。这种方法确保不会遗漏任何潜在的峰值，适用于一般数组。

在特定情况下，当数组结构允许分割成可预测的模式时，可以应用修改后的二分搜索技术以更高效地找到峰值。让我们使用修改后的二分搜索算法实现 _O(log n)_ 的时间复杂度。

**算法解释：**

- **初始化指针：** 从两个指针 _low_ 和 _high_ 开始，代表数组的范围。
- **二分搜索：** 计算当前范围的中间索引 _mid_。
- **比较中间值与邻居：** 检查索引 _mid_ 处的元素是否大于其邻居。

  - 如果 _true_，_mid_ 是一个峰值。
  - 如果 _false_，向具有较大邻居的一侧移动，确保我们向潜在的峰值区域移动。
- **重复：** 继续这个过程，直到范围减少到一个单一元素。

```java
public class MultiplePeakFinder {
    public static List``````````<Integer>`````````` findPeaks(int[] arr) {
        List``````````<Integer>`````````` peaks = new ArrayList<>();
        if (arr == null || arr.length == 0) {
            return peaks;
        }
        findPeakElements(arr, 0, arr.length - 1, peaks, arr.length);
        return peaks;
    }

    private static void findPeakElements(int[] arr, int low, int high, List``````````<Integer>`````````` peaks, int length) {
        if (low > high) {
            return;
        }

        int mid = low + (high - low) / 2;

        boolean isPeak = (mid == 0 || arr[mid] > arr[mid - 1]) && (mid == length - 1 || arr[mid] > arr[mid + 1]);
        boolean isFirstInSequence = mid > 0 && arr[mid] == arr[mid - 1] && arr[mid] > arr[mid + 1];

        if (isPeak || isFirstInSequence) {

            if (!peaks.contains(arr[mid])) {
                peaks.add(arr[mid]);
            }
        }

        findPeakElements(arr, low, mid - 1, peaks, length);
        findPeakElements(arr, mid + 1, high, peaks, length);
    }
}
```

_MultiplePeakFinder_ 类使用修改后的二分搜索算法有效地识别数组中的多个峰值元素。 _findPeaks_ 方法初始化两个指针，_low_ 和 _high_，代表数组的范围。

它计算中间索引（_mid_）并检查 _mid_ 处的元素是否大于其邻居。如果 _true_，它将 _mid_ 标记为峰值，并继续在潜在的峰值丰富区域进行搜索。

```java
public class MultiplePeakFinderUnitTest {
    @Test
    void findPeaks_givenArrayOfIntegers_whenValidInput_thenReturnsCorrectPeaks() {

        MultiplePeakFinder finder = new MultiplePeakFinder();
        int[] array = {1, 13, 7, 0, 4, 1, 4, 45, 50};
        List``````````<Integer>`````````` peaks = finder.findPeaks(array);

        assertEquals(3, peaks.size());
        assertTrue(peaks.contains(4));
        assertTrue(peaks.contains(13));
        assertTrue(peaks.contains(50));
    }
}
```

**二分搜索寻找峰值的效率取决于数组的结构，允许在不检查每个元素的情况下检测峰值。** 然而，如果不知道数组的结构或它没有适合二分搜索的模式，线性搜索是最可靠的方法，保证不会遗漏任何峰值。

## 5. 处理边缘情况

理解和处理边缘情况对于确保峰值元素算法的健壮性和可靠性至关重要。

### 5.1. 没有峰值的数组

**在数组不包含峰值元素的情况下，重要的是要指示这种缺失。** 让我们在没有找到峰值时返回一个空数组：

```java
public class PeakElementFinder {
    public List``````````<Integer>`````````` findPeakElements(int[] arr) {
        int n = arr.length;
        List``````````<Integer>`````````` peaks = new ArrayList<>();

        if (n == 0) {
            return peaks;
        }

        for (int i = 0; i `< n; i++) {
            if (isPeak(arr, i, n)) {
                peaks.add(arr[i]);
            }
        }

        return peaks;
    }

    private boolean isPeak(int[] arr, int index, int n) {
        return arr[index] >`= arr[index - 1] && arr[index] >= arr[index + 1]) {
        return true;
    }
}

return arr[index] >= arr[index - 1] && arr[index] > arr[index + 1];
}
```

_findPeakElement_ 方法遍历数组，使用 _isPeak_ 辅助函数来识别峰值。如果没有找到峰值，它将返回一个空数组。

```java
public class PeakElementFinderUnitTest {
    @Test
    void findPeakElement_givenArrayOfIntegers_whenValidInput_thenReturnsCorrectPeak() {
        PeakElementFinder finder = new PeakElementFinder();
        int[] array = {1, 2, 3, 2, 1};
        List``````````<Integer>`````````` peaks = finder.findPeakElements(array);
        assertEquals(1, peaks.size());
        assertTrue(peaks.contains(3));
    }

    @Test
    void findPeakElement_givenArrayOfIntegers_whenNoPeaks_thenReturnsEmptyList() {
        PeakElementFinder finder = new PeakElementFinder();
        int[] array = {};
        List``````````<Integer>`````````` peaks = finder.findPeakElements(array);
        assertEquals(0, peaks.size());
    }
}
```

### 5.2. 极端处的峰值数组

**当峰值存在于第一个或最后一个元素时，需要特别注意以避免未定义的邻居比较。** 让我们在 _isPeak_ 方法中添加一个条件检查来处理这些情况：

```java
private boolean isPeak(int[] arr, int index, int n) {
    if (index == 0) {
        return n > 1 ? arr[index] >= arr[index + 1] : true;
    } else if (index == n - 1) {
        return arr[index] >= arr[index - 1];
    }

    return arr[index] >= arr[index - 1] && arr[index] > arr[index + 1];
}
```

这种修改确保了在没有尝试与未定义的邻居进行比较的情况下，正确识别了极端处的峰值。

```java
public class PeakElementFinderUnitTest {
    @Test
    void findPeakElement_givenArrayOfIntegers_whenPeaksAtExtremes_thenReturnsCorrectPeak() {
        PeakElementFinder finder = new PeakElementFinder();
        int[] array = {5, 2, 1, 3, 4};
        List``````````<Integer>`````````` peaks = finder.findPeakElements(array);
        assertEquals(2, peaks.size());
        assertTrue(peaks.contains(5));
        assertTrue(peaks.contains(4));
    }
}
```

### 5.3. 处理高原（连续相等的元素）

**在数组包含连续相等的元素的情况下，返回首次出现的索引至关重要。** _isPeak_ 函数通过跳过连续相等的元素来处理这一点：

```java
private boolean isPeak(int[] arr, int index, int n) {
    if (index == 0) {
        return n > 1 ? arr[index] >= arr[index + 1] : true;
    } else if (index == n - 1) {
        return arr[index] >= arr[index - 1];
    } else if (arr[index] == arr[index + 1] && arr[index] > arr[index - 1]) {
        int i = index;

        while (i `< n - 1 && arr[i] == arr[i + 1]) {
            i++;
        }
        return i == n - 1 || arr[i] >` arr[i + 1];
    } else {
        return arr[index] >= arr[index - 1] && arr[index] > arr[index + 1];
    }
}
```

_findPeakElement_ 函数跳过连续相等的元素，确保在识别峰值时返回首次出现的索引。

```java
public class PeakElementFinderUnitTest {
    @Test
    void findPeakElement_givenArrayOfIntegers_whenPlateaus_thenReturnsCorrectPeak() {
        PeakElementFinder finder = new PeakElementFinder();
        int[] array = {1, 2, 2, 2, 3, 4, 5};
        List``````````<Integer>`````````` peaks = finder.findPeakElements(array);
        assertEquals(1, peaks.size());
        assertTrue(peaks.contains(5));
    }
}
```

## 6. 结论

理解寻找峰值元素的技术可以使开发人员在设计高效且有弹性的算法时做出明智的决策。**有多种方法可以发现峰值元素，这些方法提供不同的时间复杂度，如 O(log n) 或 O(n)。**

选择这些方法取决于具体要求和应用约束。**选择正确的算法与在应用中要实现的效率和性能目标一致。**

你可以在 GitHub 上找到所有代码样本。