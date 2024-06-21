---
date: 2024-06-21
category:
  - Java
  - 算法
tag:
  - 序列
  - 递归
head:
  - - meta
    - name: keywords
      content: Java, 算法, 递归, 序列, 杂耍序列
---

# Java中生成杂耍序列

杂耍序列以其迷人的行为和优雅的简单性而脱颖而出。

在本教程中，我们将理解杂耍序列，并探索如何使用Java中的给定初始数字生成序列。

### 2. 理解杂耍序列

在我们深入到生成杂耍序列的代码之前，让我们快速了解一下杂耍序列是什么。

在数论中，杂耍序列是一个整数序列，定义为递归如下：​​

- 以正整数\( n \)作为序列的第一项。
- 如果 \( n \) 是偶数，下一项是 \( n \) 的平方根，向下取整到最近的整数。
- 如果 \( n \) 是奇数，则下一项是 \( n \times \sqrt{n} \)，向下取整到最近的整数。

**此过程继续进行，直到达到1，序列终止。**

值得一提的是，**\( n \) 的平方根和 \( n \times \sqrt{n} \) 都可以转换为平方根计算：**

- \( n \) 的平方根是 \( \sqrt{n} \)。因此，\( n \) 的平方根 \( = \sqrt{n} \)。
- \( n \times \sqrt{n} = n \times (n \) 的平方根 \( ) = n \times \sqrt{n} \)。

一个例子可能有助于我们快速理解序列：

```
给定数字：3
-----------------
3 - 奇数 - 3 × √3 - (int)5.19.. - 5
5 - 奇数 - 5 × √5 - (int)11.18.. - 11
11 - 奇数 - 11 × √11 - (int)36.48.. - 36
36 - 偶数 - √36 - (int)6 - 6
6 - 偶数 - √6 - (int)2.45.. - 2
2 - 偶数 - √2 - (int)1.41.. - 1
1

序列：3, 5, 11, 36, 6, 2, 1
```

值得注意的是，人们推测所有的杂耍序列最终都会达到1，但**这个猜想还没有被证明**。因此，我们实际上无法完成大O时间复杂度分析。

现在我们知道了如何生成杂耍序列，让我们在Java中实现一些序列生成方法。

### 3. 基于循环的解决方案

让我们首先实现一个基于循环的生成方法：

```
class JugglerSequenceGenerator {
    public static List```<Integer>``` byLoop(int n) {
        if (n <= 0) {
            throw new IllegalArgumentException("The initial integer must be greater than zero.");
        }
        List```<Integer>``` seq = new ArrayList<>();
        int current = n;
        seq.add(current);
        while (current != 1) {
            int next = (int) (Math.sqrt(current) * (current % 2 == 0 ? 1 : current));
            seq.add(next);
            current = next;
        }
        return seq;
    }
}
```

代码看起来相当直接。让我们快速浏览一下代码并理解它的工作原理：

- 首先，验证输入 \( n \)，因为初始数字必须是正整数。
- 然后，创建 _seq_ 列表以存储结果序列，将初始整数分配给 _current，并将其添加到_seq_。
- 一个 _while_ 循环负责根据我们之前讨论的计算生成每一项并将其附加到序列中。
- 一旦循环终止（当 _current_ 变为1），存储在 _seq_ 列表中的生成序列将被返回。

接下来，让我们创建一个测试方法来验证我们的基于循环的方法是否可以生成预期的结果：

```
assertThrows(IllegalArgumentException.class, () -> JugglerSequenceGenerator.byLoop(0));
assertEquals(List.of(3, 5, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byLoop(3));
assertEquals(List.of(4, 2, 1), JugglerSequenceGenerator.byLoop(4));
assertEquals(List.of(9, 27, 140, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byLoop(9));
assertEquals(List.of(21, 96, 9, 27, 140, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byLoop(21));
assertEquals(List.of(42, 6, 2, 1), JugglerSequenceGenerator.byLoop(42));
```

### 4. 基于递归的解决方案

或者，我们可以递归地从给定数字生成杂耍序列。首先，让我们将 _byRecursion()_ 方法添加到 _JugglerSequenceGenerator_ 类中：

```
public static List```<Integer>``` byRecursion(int n) {
    if (n <= 0) {
        throw new IllegalArgumentException("The initial integer must be greater than zero.");
    }
    List```<Integer>``` seq = new ArrayList<>();
    fillSeqRecursively(n, seq);
    return seq;
}
```

正如我们所看到的，_byRecursion()_ 方法是另一个杂耍序列生成器的入口点。它验证输入数字并准备结果序列列表。然而，主要的序列生成逻辑是在 _fillSeqRecursively()_ 方法中实现的：

```
private static void fillSeqRecursively(int current, List```<Integer>``` result) {
    result.add(current);
    if (current == 1) {
        return;
    }
    int next = (int) (Math.sqrt(current) * (current % 2 == 0 ? 1 : current));
    fillSeqRecursively(next, result);
}
```

正如代码所示，**该方法使用 _next_ 值和 _result_ 列表递归调用自身。**这意味着该方法将重复添加 _current_ 数字到序列中，检查终止条件，并计算下一项，直到满足终止条件（_current == 1_）。

递归方法通过相同的测试：

```
assertThrows(IllegalArgumentException.class, () -> JugglerSequenceGenerator.byRecursion(0));
assertEquals(List.of(3, 5, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byRecursion(3));
assertEquals(List.of(4, 2, 1), JugglerSequenceGenerator.byRecursion(4));
assertEquals(List.of(9, 27, 140, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byRecursion(9));
assertEquals(List.of(21, 96, 9, 27, 140, 11, 36, 6, 2, 1), JugglerSequenceGenerator.byRecursion(21));
assertEquals(List.of(42, 6, 2, 1), JugglerSequenceGenerator.byRecursion(42));
```

### 5. 结论

在本文中，我们首先讨论了什么是杂耍序列。值得注意的是，尚未证明所有杂耍序列最终都会达到1。

此外，我们探索了两种从给定整数开始生成杂耍序列的方法。

如常，示例的完整源代码可在GitHub上找到。