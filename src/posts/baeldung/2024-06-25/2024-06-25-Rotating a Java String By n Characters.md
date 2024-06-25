---
date: 2024-06-25
category:
  - Java
  - 编程
tag:
  - 字符串操作
  - 字符串旋转
head:
  - - meta
    - name: keywords
      content: Java, 字符串旋转, 编程技巧
---
# Java中通过n个字符旋转字符串

在我们的日常Java编程中，字符串通常是我们必须处理的基本对象。有时，我们需要通过n个字符来旋转给定的字符串。旋转字符串涉及以循环方式移动其字符，创造出动态且视觉上吸引人的效果。

在本教程中，我们将探讨解决字符串旋转问题的几种不同方法。

### 2.1. 一个例子

假设我们有一个字符串对象：
```
String STRING = "abcdefg";
```

如果我们以_STRING_作为输入，在旋转它n个字符后，结果将是以下这样：
```
- 向前旋转 -
输入字符串    : abcdefg
旋转 (n = 1) -> gabcdef
旋转 (n = 2) -> fgabcde
旋转 (n = 3) -> efgabcd
旋转 (n = 4) -> defgabc
旋转 (n = 5) -> cdefgab
旋转 (n = 6) -> bcdefga
旋转 (n = 7) -> abcdefg
旋转 (n = 8) -> gabcdef
...
```

上述示例展示了向前字符串旋转的行为。然而，字符串也可以向相反方向旋转——向后旋转，如下所示：
```
- 向后旋转 -
输入字符串    : abcdefg
旋转 (n = 1) -> bcdefga
旋转 (n = 2) -> cdefgab
旋转 (n = 3) -> defgabc
旋转 (n = 4) -> efgabcd
旋转 (n = 5) -> fgabcde
旋转 (n = 6) -> gabcdef
旋转 (n = 7) -> abcdefg
...
```

在本教程中，我们将探索向前和向后的旋转。我们的目标是创建一个能够通过移动n个字符按指定方向旋转输入字符串的方法。

为了保持简单，我们将限制我们的方法只接受非负值的n。

### 2.2. 分析问题

在我们深入代码之前，让我们分析这个问题并总结其关键特点。

首先，如果我们通过移动零个字符（n=0）旋转字符串，无论方向如何，结果应该反映输入字符串。当n等于0时，没有旋转发生，这是很自然的事情。

此外，如果我们看示例，当n=7时，输出等于输入：
```
输入字符串    : abcdefg
...
旋转 (n = 7) -> abcdefg
...
```

这种现象出现的原因是输入字符串的长度是7。当n等于_STRING.length_时，每个字符在旋转后返回到其原始位置。因此，**旋转_STRING_通过移动_STRING.length_个字符的结果是与原始_STRING相同。**

现在，很明显，当n = STRING.length × K（其中K是一个整数）时，输入和输出字符串是相等的。简单来说，**有效的n'移动字符实际上是n % STRING.length。**

接下来，让我们看看旋转方向。通过比较前面提供的向前和向后旋转示例，它显示了**“向后旋转n”实质上等同于“向前旋转STRING.length - n”**。例如，向后旋转n=2得到的结果与向前旋转n=5（STRING.length - 2）相同，如下所示：
```
- 向前旋转 -
旋转 (n = 5) -> cdefgab
...

- 向后旋转 -
旋转 (n = 2) -> cdefgab
...
```

因此，**我们只需要专注于解决向前旋转问题，并将所有向后旋转转换为向前旋转。**

让我们简要列出我们到目前为止学到的内容：

- 有效的n' = n % STRING.length
- n=0或K × STRING.length：结果 = STRING
- “向后旋转n”可以转换为“向前旋转(STRING.length - n)”

### 2.3. 准备测试数据

由于我们将使用单元测试来验证我们的解决方案，让我们创建一些预期的输出以涵盖各种情况：
```
// 向前
String EXPECT_1X = "gabcdef";
String EXPECT_2X = "fgabcde";
String EXPECT_3X = "efgabcd";
String EXPECT_6X = "bcdefga";
String EXPECT_7X = "abcdefg";  // 长度 = 7
String EXPECT_24X = "efgabcd"; //24 = 3 × 7(长度) + 3

// 向后
String B_EXPECT_1X = "bcdefga";
String B_EXPECT_2X = "cdefgab";
String B_EXPECT_3X = "defgabc";
String B_EXPECT_6X = "gabcdef";
String B_EXPECT_7X = "abcdefg";
String B_EXPECT_24X = "defgabc";
```

接下来，让我们转到第一个解决方案，“分割和组合”。

### 3. 分割和组合

解决问题的想法是**将输入字符串分割成两个子字符串，然后交换它们的位置并重新组合它们**。像往常一样，一个例子将帮助我们快速理解这个想法。

假设我们想要向前旋转_STRING_通过移动两个（n=2）字符。然后，我们可以通过以下方式执行旋转：
```
索引   0   1   2   3   4   5   6
STRING a   b   c   d   e   f   g

Sub1   [a   b   c   d   e] -->
Sub2                   <-- [f   g]
结果 [f   g] [a   b   c   d   e]

```

因此，解决问题的关键是找到两个子字符串的索引范围。这对我们来说不是挑战：
- Sub 1 – [0, STRING.length – n), 在这个例子中，它是[0,5)
- Sub 2 – [STRING.length – n, STRING.length) 在这个例子中，它是[5, 7)

值得注意的是，上面使用的半开符号“[a, b)”表明索引‘a'是包含的，而‘b'是不包含的。有趣的是，**Java的String.subString(beginIndex, endIndex)方法恰好遵循了排除_endIndex_的相同约定**，简化了索引计算。

现在，基于我们的了解，实现变得简单直接：
```
String rotateString1(String s, int c, boolean forward) {
    if (c < 0) {
        throw new IllegalArgumentException("Rotation character count cannot be negative!");
    }
    int len = s.length();
    int n = c % len;
    if (n == 0) {
        return s;
    }
    n = forward ? n : len - n;
    return s.substring(len - n, len) + s.substring(0, len - n);
}
```

如观察到的，_boolean_变量_forward_指示预期的旋转方向。随后，我们使用表达式“n = forward ? n : len – n”来无缝地将向后旋转转换为它们的向前对应物。

此外，该方法成功通过了我们准备的测试用例：
```
// 向前
assertEquals(EXPECT_1X, rotateString1(STRING, 1, true));
assertEquals(EXPECT_2X, rotateString1(STRING, 2, true));
assertEquals(EXPECT_3X, rotateString1(STRING, 3, true));
assertEquals(EXPECT_6X, rotateString1(STRING, 6, true));
assertEquals(EXPECT_7X, rotateString1(STRING, 7, true));
assertEquals(EXPECT_24X, rotateString1(STRING, 24, true));

// 向后
assertEquals(B_EXPECT_1X, rotateString1(STRING, 1, false));
assertEquals(B_EXPECT_2X, rotateString1(STRING, 2, false));
assertEquals(B_EXPECT_3X, rotateString1(STRING, 3, false));
assertEquals(B_EXPECT_6X, rotateString1(STRING, 6, false));
assertEquals(B_EXPECT_7X, rotateString1(STRING, 7, false));
assertEquals(B_EXPECT_24X, rotateString1(STRING, 24, false));
```

### 4. 自连接和提取

这种方法的实质在于将字符串与其自身连接，创建_SS = STRING + STRING_。因此，**无论我们如何旋转原始_STRING,_结果字符串必须是_SS_的一个子字符串**。因此，我们可以高效地在_SS_中定位子字符串并提取它。

例如，如果我们向前旋转_STRING_与n=2，结果是_SS.subString(5,12)_：
```
索引  0   1   2   3   4   5   6 | 7   8   9   10  11  12  13
 SS   a   b   c   d   e   f   g | a   b   c   d   e   f   g
                                 |
结果 a   b   c   d   e [f   g   a   b   c   d   e]  f   g

```

现在，问题转化为在自连接字符串_SS_中识别预期的起始和结束索引。这对我们来说相对简单：
- 起始索引：_STRING.length – n_
- 结束索引：_StartIndex + STRING.length_ = 2 × STRING.length – n接下来，让我们将这个想法“翻译”成Java代码：

```java
String rotateString2(String s, int c, boolean forward) {
    if (c < 0) {
        throw new IllegalArgumentException("Rotation character count cannot be negative!");
    }
    int len = s.length();
    int n = c % len;
    if (n == 0) {
        return s;
    }
    String ss = s + s;

    n = forward ? n : len - n;
    return ss.substring(len - n, 2 * len - n);
}
```

这个方法也通过了我们的测试：

```java
// 向前
assertEquals(EXPECT_1X, rotateString2(STRING, 1, true));
assertEquals(EXPECT_2X, rotateString2(STRING, 2, true));
assertEquals(EXPECT_3X, rotateString2(STRING, 3, true));
assertEquals(EXPECT_6X, rotateString2(STRING, 6, true));
assertEquals(EXPECT_7X, rotateString2(STRING, 7, true));
assertEquals(EXPECT_24X, rotateString2(STRING, 24, true));

// 向后
assertEquals(B_EXPECT_1X, rotateString2(STRING, 1, false));
assertEquals(B_EXPECT_2X, rotateString2(STRING, 2, false));
assertEquals(B_EXPECT_3X, rotateString2(STRING, 3, false));
assertEquals(B_EXPECT_6X, rotateString2(STRING, 6, false));
assertEquals(B_EXPECT_7X, rotateString2(STRING, 7, false));
assertEquals(B_EXPECT_24X, rotateString2(STRING, 24, false));
```

所以，它解决了我们的字符串旋转问题。

我们已经了解到_STRING_的旋转结果将是_SS_的一个子字符串。值得注意的是，**我们可以使用这个规则来检查一个字符串是否是从另一个字符串旋转来的：**

```java
boolean rotatedFrom(String rotated, String rotateFrom) {
    return rotateFrom.length() == rotated.length() && (rotateFrom + rotateFrom).contains(rotated);
}
```

最后，让我们快速测试这个方法：

```java
assertTrue(rotatedFrom(EXPECT_7X, STRING));
assertTrue(rotatedFrom(B_EXPECT_3X, STRING));
assertFalse(rotatedFrom("abcefgd", STRING));
```

### 5. 结论

在本文中，我们首先分析了通过n个字符旋转字符串的问题。然后，我们探索了解决这个问题的两种不同方法。

如往常一样，示例的完整源代码可在GitHub上找到。
OK