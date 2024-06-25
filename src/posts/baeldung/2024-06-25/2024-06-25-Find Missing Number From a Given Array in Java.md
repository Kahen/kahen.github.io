---
date: 2024-06-25
category:
  - Java
  - 数组
tag:
  - 数组
  - 缺失数字
  - Java
head:
  - - meta
    - name: keywords
      content: Java, 数组, 缺失数字, 查找
------
# 在Java中从给定数组中找到缺失的数字

## 1. 概述

在Java中，从数组中找出指定范围内的缺失数字在多种场景下都非常有用，例如数据验证、确保完整性或识别数据集中的空白。

在本教程中，我们将**学习多种方法来从整数范围 _[1-N]_ 的数组中找出单个缺失的数字**。

## 2. 理解场景

让我们想象我们有一个包含整数范围 _[1-9]_（包括两端）的 _numbers_ 数组：

```
int[] numbers = new int[] { 1, 4, 5, 2, 7, 8, 6, 9 };
```

**现在，我们的目标是找出数组中范围 _[1-9]_ 的缺失数字**。

为了概括问题陈述，我们可以计算数组的长度并设置上限 _N_：

```
int N = numbers.length + 1;
```

在接下来的部分中，我们将学习不同的方法来从给定的数组中找出范围 _[1-N]_ 的缺失数字。

## 3. 使用算术求和

让我们首先使用算术求和来找出 _numbers_ 数组中的缺失数字。

首先，我们将计算范围 _[1-N]_ 的等差数列的预期求和和数组的实际求和：

```
int expectedSum = (N * (N + 1)) / 2;
int actualSum = Arrays.stream(numbers).sum();
```

接下来，我们可以通过从 _expectedSum_ 中减去 _actualSum_ 来得到 _missingNumber_：

```
int missingNumber = expectedSum - actualSum;
```

最后，让我们验证结果：

```
assertEquals(3, missingNumber);
```

这是正确的！

## 4. 使用XOR属性

或者，我们可以使用异或操作符（ ^ ）的两个有趣的属性来解决我们的问题：

- X^X = 0: 当我们将一个数字与其自身进行异或操作时，我们得到零。
- X^0 = X: 当我们将一个数字与零进行异或操作时，我们得到相同的数字。

首先，我们将使用 _reduce_ 函数对封闭范围 _[1-9]_ 中的所有整数值进行异或操作：

```
int xorValue = IntStream.rangeClosed(1, N).reduce(0, (a, b) -> a ^ b);
```

我们使用0和 _(a, b) -> a ^ b_，这是一个lambda表达式，分别作为_reduce()_ 操作的标识和累加器。

接下来，我们将使用来自 _numbers_ 数组的整数值继续进行异或操作：

```
xorValue = Arrays.stream(numbers).reduce(xorValue, (x, y) -> x ^ y);
```

**由于除了缺失数字之外的每个数字都出现了两次，_xorValue_ 将只包含 _numbers_ 数组中范围 _[1-9]_ 的缺失数字**。

最后，我们应该验证我们的方法是否给出了正确的结果：

```
assertEquals(3, xorValue);
```

太好了！我们这次也做对了。

## 5. 使用排序

我们的输入数组 _numbers_ 预计包含范围 _[1-N]_ 中的所有连续值，除了缺失的数字。因此，如果我们对数组进行排序，将便于发现缺失数字的位置，即我们没有看到连续数字的地方。

首先，让我们对 _numbers_ 数组进行排序：

```
Arrays.sort(numbers);
```

接下来，我们可以遍历 _numbers_ 数组并检查索引处的值是否为 _index+1_：

```
int missingNumber = -1;
for (int index = 0; index `< numbers.length; index++) {
    if (numbers[index] != index + 1) {
        missingNumber = index + 1;
        break;
    }
}
```

**当条件失败时，这意味着预期值 _index + 1_ 缺失于数组**。因此，我们设置 _missingNumber_ 并提前退出循环。

最后，让我们检查我们是否得到了期望的输出：

```
assertEquals(3, missingNumber);
```

结果看起来是正确的。然而，我们必须注意，在这种情况下**我们改变了原始输入数组**。

## 6. 使用布尔数组跟踪

在排序方法中，有两个主要缺点：

- 排序的开销成本
- 原始输入数组的变异

我们可以通过使用布尔数组来跟踪当前数字来减轻这些问题。

首先，让我们将 _present_ 定义为大小为 _N_ 的布尔数组：

```
boolean[] present = new boolean[N];
```

我们必须回忆 _N_ 被初始化为 _numbers.length + 1_。

接下来，我们将**遍历 numbers 数组并在 _present_ 数组中标记每个数字的存在**：

```
int missingNumber = -1;
Arrays.stream(numbers).forEach(number ->` present[number - 1] = true);
```

进一步，我们将进行另一次迭代，但这次是对 _present_ 数组，以找到未标记为存在的数字：

```
for (int index = 0; index < present.length; index++) {
    if (!present[index]) {
        missingNumber = index + 1;
        break;
    }
}
```

最后，让我们通过检查 _missingNumber_ 变量的值来验证我们的方法：

```
assertEquals(3, missingNumber);
```

完美！我们的方法奏效了。此外，我们必须注意**我们使用了 _N_ 字节的额外空间**，因为每个布尔值在Java中将占用1字节。

## 7. 使用位集跟踪

我们可以通过使用位集而不是布尔数组来优化空间复杂度。

```
BitSet bitSet = new BitSet(N);
```

通过这种初始化，**我们将只使用足够的空间来表示 _N_ 位**。当 _N_ 的值相当高时，这是一个相当大的优化。

接下来，让我们**遍历 numbers 数组并通过在 _bitset_ 中的他们的位置设置位来标记它们的存在**：

```
for (int num : numbers) {
    bitSet.set(num);
}
```

现在，**我们可以通过检查未设置的位来找到缺失的数字**：

```
int missingNumber = bitSet.nextClearBit(1);
```

最后，让我们确认我们在 _missingNumber_ 中得到了正确的值：

```
assertEquals(3, missingNumber);
```

太棒了！看起来我们这次也做得很好。

## 8. 结论

在本教程中，**我们学习了如何从数组中找出缺失的数字**。此外，我们探索了多种解决这个问题的方法，如算术求和、异或操作、排序以及像 _Bitset_ 和 _boolean_ 数组这样的附加数据结构。

正如往常一样，本文的代码可在GitHub上找到。