---
date: 2024-06-21
category:
  - Java
  - 算法
tag:
  - Happy Number
  - 算法实现
head:
  - - meta
    - name: keywords
      content: Java, Happy Number, 算法实现, 快乐数, 判断快乐数
---

# Java中判断一个数是否是快乐数

## 1. 概述

我们经常在编程中解决数学问题。确定一个数是否是快乐数是一个有趣的任务。

在本教程中，我们将理解快乐数的定义，并探索如何实现一个Java程序来检查给定的数是否是快乐数。

## 2. 理解快乐数

**快乐数是通过重复替换其数字平方和达到1的数。** 相反，非快乐数（悲伤数）会陷入一个无限循环，永远无法达到1。

像往常一样，一些例子可以帮助我们快速理解快乐数的定义：

```
给定数字：19

 19 -> 1^2 + 9^2 = 82
 82 -> 8^2 + 2^2 = 68
 68 -> 6^2 + 8^2 = 100
100 -> 1^2 + 0^2 + 0^2 = 1
  1

```

正如上面的例子所示，我们最终为输入数字19达到了1。因此，19是一个快乐数。类似地，更多的快乐数例子包括7、10、13、23等。

然而，如果输入是15，我们将永远无法达到1：

```
给定数字：15

       15 -> 1^2 + 5^2 = 26
       26 -> 2^2 + 6^2 = 40
       40 -> 4^2 + 0^2 = 16
+---  16 -> 1^2 + 6^2 = 37
|      37 -> 3^2 + 7^2 = 58
|      58 -> 5^2 + 8^2 = 89
|      89 -> 8^2 + 9^2 = 145
|     145 -> 1^2 + 4^2 + 5^2 = 42
|      42 -> 4^2 + 2^2 = 20
|      20 -> 2^2 + 0^2 = 4
|       4 -> 4^2 = 16
+------16

```

正如我们所看到的，过程在16和4之间无限循环，永远不会达到1。因此，15是一个悲伤数。

根据这个规则，我们可以找到更多的悲伤数，例如4、6、11、20等。

## 3. 实现检查方法

现在我们已经理解了快乐数的定义，让我们实现Java方法来检查给定的数是否是快乐数。

如果一个数的序列，每个数字平方和形成的序列包含循环，则该数是悲伤的。换句话说，**给定一个数，如果一步计算结果已经存在于序列中，它就是悲伤数**。

我们可以在Java中使用_HashSet_数据结构来实现这个逻辑。这允许我们存储每个步骤的结果，并有效地检查新计算的结果是否已经存在于集合中：

```
class HappyNumberDecider {
    public static boolean isHappyNumber(int n) {
        Set`<Integer>` checkedNumbers = new HashSet<>();
        while (true) {
            n = sumDigitsSquare(n);
            if (n == 1) {
                return true;
            }
            if (checkedNumbers.contains(n)) {
                return false;
            }
            checkedNumbers.add(n);
        }
    }

    // ...
}
```

正如上面的代码所示，_sumDigitsSquare()_方法执行实际的计算并返回结果：

```
private static int sumDigitsSquare(int n) {
    int squareSum = 0;
    while (n != 0) {
        squareSum += (n % 10) * (n % 10);
        n /= 10;
    }
    return squareSum;
}
```

接下来，让我们创建一个测试来验证我们的_isHappyNumber()_方法是否为不同的输入报告了预期的结果：

```
assertTrue(HappyNumberDecider.isHappyNumber(7));
assertTrue(HappyNumberDecider.isHappyNumber(10));
assertTrue(HappyNumberDecider.isHappyNumber(13));
assertTrue(HappyNumberDecider.isHappyNumber(19));
assertTrue(HappyNumberDecider.isHappyNumber(23));

assertFalse(HappyNumberDecider.isHappyNumber(4));
assertFalse(HappyNumberDecider.isHappyNumber(6));
assertFalse(HappyNumberDecider.isHappyNumber(11));
assertFalse(HappyNumberDecider.isHappyNumber(15));
assertFalse(HappyNumberDecider.isHappyNumber(20));
```

## 4. 性能分析

首先，让我们分析解决方案的时间复杂度。

假设我们有一个数字_n_，它有_k_位数字。因此，我们需要_k_次迭代来计算数字平方的和。进一步，**由于_k = log n_**（以10为底的对数），**O(log n)是计算第一个结果的时间复杂度**。让我们称它为_result1_。**由于最大数字是9，_result1_的最大值是** _**9^2 * log n**。

如果_result1_不是1，我们必须重复调用_sumDigitsSquare()_。然后，**到目前为止的时间复杂度是_O(log n) + O(log (9^2 * log n)) = O(log n) + O(log 81 + log log n)_。** 去掉常数部分后，**我们得到_O(log n) + O(log log n)_。**

因此，我们的总时间复杂度变为_O(log n) + O(log log n) + O(log log log n) + O(log log log log n) + …_ 直到结果达到1或我们检测到循环。**由于_log n_是这个表达式中的主导部分，解决方案的时间复杂度是O(log n)。**

在我们转向空间复杂度分析之前，让我们列出有_k_位数字的最大的数字_n_和相应的_result1_：

```
k     Largest n        result1
1     9                81
2     99               162
3     999              243
4     9999             324
5     99999            405
6     999999           486
7     9999999          567
8     99999999         648
9     999999999        729
10    9999999999       810
11    99999999999      891
12    999999999999     972
13    9999999999999    1053
       ...
1m    9..a million..9  81000000
```

正如我们所看到的，给定超过三位数字的数字_n_，**重复应用_sumDigitsSquare()_操作可以迅速将_n_减少到三位数数字的几个步骤内**。

例如，当_k=1m_时，_n_比Java的_Long.MAX_VALUE_大得多。它只需要两个步骤就可以达到一个少于三位数的数字：_9..(1m)..9 -> 81000000 (9^2 * 1m = 81000000) -> 65 (8^2 + 1^2 = 65)_

因此，在Java的_int_或_long_范围内，我们可以合理地假设_n_需要一个常数_C_步骤才能达到一个三位数或更少的数字。因此，我们的_HashSet_最多持有_C+243_个结果，**得到一个空间复杂度为O(1)**。

虽然这种方法的空间复杂度是O(1)，但它仍然需要空间来存储结果以检测循环。

## 5. 改进_isHappyNumber()_方法

Floyd的循环检测算法可以检测序列中的循环。例如，我们可以将这个算法应用于检查一个_LinkedList_是否包含一个圆圈。

这个想法是维护两个指针，_slow_和_fast。**slow****每次更新一步，而**fast**每两步更新一次**。如果它们在1处相遇，给定的数字是快乐的。否则，**如果它们相遇但值不是1，就检测到循环**。因此，给定的数字是悲伤的。

接下来，让我们在Java中实现慢快逻辑：

```
public static boolean isHappyNumberFloyd(int n) {
    int slow = n;
    int fast = n;
    do {
        slow = sumDigitsSquare(slow);
        fast = sumDigitsSquare(sumDigitsSquare(fast));
    } while (slow != fast);

    return slow == 1;
}
```

让我们用相同的输入测试_isHappyNumberFloyd()_方法：

```
assertTrue(HappyNumberDecider.isHappyNumberFloyd(7));
assertTrue(HappyNumberDecider.isHappyNumberFloyd(10));
assertTrue(HappyNumberDecider.isHappyNumberFloyd(13));
assertTrue(HappyNumberDecider.isHappyNumberFloyd(19));
assertTrue(HappyNumberDecider.isHappyNumberFloyd(23));

assertFalse(HappyNumberDecider.isHappyNumberFloyd(4));
assertFalse(HappyNumberDecider.isHappyNumberFloyd(6));
assertFalse(HappyNumberDecider.isHappyNumberFloyd(11));
assertFalse(HappyNumberDecider.isHappyNumberFloyd(15));
assertFalse(HappyNumberDecider.isHappyNumberF
