---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Boolean
  - Logic
head:
  - - meta
    - name: keywords
      content: Java, Boolean, Programming, Logic
------
# 在Java中检查三个布尔值中至少有两个为真

布尔类型是Java的基本数据类型之一。它非常简单，只有两个值：真（true）和假（false）。

在本教程中，我们将探讨一个问题：检查给定的三个布尔值中是否至少有两个为真。

## 2. 问题介绍

这个问题相当直接。我们将得到三个布尔值。如果其中至少有两个为真，我们的方法应该返回真。

解决这个问题对我们来说并不难。然而，在本教程中，我们将探索一些不错的解决方案。此外，我们将讨论每种方法是否可以轻松扩展来解决一个更一般的问题：**给定n个布尔值，检查其中至少有x个为真**。

我们将通过单元测试来验证每种方法。因此，让我们首先创建一个Map对象来保存测试用例和预期结果：

```java
static final Map`<boolean[], Boolean>` TEST_CASES_AND_EXPECTED = ImmutableMap.of(
    new boolean[]{true, true, true}, true,
    new boolean[]{true, true, false}, true,
    new boolean[]{true, false, false}, false,
    new boolean[]{false, false, false}, false
);

```

如上所示，_TEST_CASES_AND_EXPECTED_映射包含四种场景及其预期结果。稍后，我们将遍历这个映射对象，并将每个布尔数组作为参数传递给每种方法，并验证方法是否返回预期值。

接下来，让我们看看如何解决问题。

## 3. 遍历三个布尔值

解决这个问题最直接的想法可能是**遍历给定的三个布尔值并计算真值**。

一旦计数器大于或等于2，我们就停止检查并返回真。否则，三个布尔值中的真值数量少于2。因此，我们返回假：

```java
public static boolean twoOrMoreAreTrueByLoop(boolean a, boolean b, boolean c) {
    int count = 0;
    for (boolean i : new Boolean[] { a, b, c }) {
        count += i ? 1 : 0;
        if (count >= 2) {
            return true;
        }
    }
    return false;
}

```

接下来，让我们使用_TEST_CASES_AND_EXPECTED_映射来测试这个方法是否有效：

```java
TEST_CASES_AND_EXPECTED.forEach((array, expected) ->
  assertThat(ThreeBooleans.twoOrMoreAreTrueByLoop(array[0], array[1], array[2])).isEqualTo(expected));

```

如果我们运行这个测试，不出所料，它通过了。

这种方法非常容易理解。此外，假设我们改变方法的参数为一个布尔数组（或一个集合）和一个整数x。在这种情况下，**它可以很容易地扩展成为一个通用解决方案来解决问题：给定n个布尔值，检查其中至少有x个为真**：

```java
public static boolean xOrMoreAreTrueByLoop(boolean[] booleans, int x) {
    int count = 0;
    for (boolean i : booleans) {
        count += i ? 1 : 0;
        if (count >= x) {
            return true;
        }
    }
    return false;
}

```

## 4. 将布尔值转换为数字

同样，**我们可以将三个布尔值转换为数字并计算它们的和，并检查它是否大于或等于2**：

```java
public static boolean twoOrMoreAreTrueBySum(boolean a, boolean b, boolean c) {
    return (a ? 1 : 0) + (b ? 1 : 0) + (c ? 1 : 0) >= 2;
}

```

让我们执行测试以确保它按预期工作：

```java
TEST_CASES_AND_EXPECTED.forEach((array, expected) ->
  assertThat(ThreeBooleans.twoOrMoreAreTrueBySum(array[0], array[1], array[2])).isEqualTo(expected));

```

我们也可以将这种方法转化为一个通用解决方案，以检查n个布尔值中至少有x个为真：

```java
public static boolean xOrMoreAreTrueBySum(Boolean[] booleans, int x) {
    return Arrays.stream(booleans)
      .mapToInt(b -> Boolean.TRUE.equals(b) ? 1 : 0)
      .sum() >= x;
}

```

我们在上面的代码中使用了Stream API将每个布尔值转换为一个整数并计算总和。

## 5. 使用逻辑运算符

我们已经通过将布尔值转换为整数来解决了问题。或者，我们可以使用逻辑运算来确定至少有两个布尔值为真。

我们可以对每两个布尔值执行逻辑与（&&）操作。因此，我们将对给定的三个布尔值执行三次与操作。**如果三个布尔值中有至少两个为真，那么至少有一个逻辑与操作的结果应该为真**：

```java
public static boolean twoOrMoreAreTrueByOpeators(boolean a, boolean b, boolean c) {
    return (a && b) || (a && c) || (b && c);
}

```

接下来，如果我们使用_TEST_CASES_AND_EXPECTED_映射来测试这个方法，它也会通过：

```java
TEST_CASES_AND_EXPECTED.forEach((array, expected) ->
  assertThat(ThreeBooleans.twoOrMoreAreTrueByOpeators(array[0], array[1], array[2])).isEqualTo(expected));

```

现在，让我们考虑一下是否可以将这种方法扩展到一般情况。**它仅在x为2时有效。此外，如果n足够大，我们可能需要构建一个长逻辑操作链**。

因此，它不适合一般问题。

## 6. 使用卡诺图

**卡诺图是一种简化布尔代数表达式的方法**。此外，我们可以从卡诺图中写出表达式。因此，有时它可以帮助我们解决复杂的布尔代数问题。

接下来，让我们看看如何使用卡诺图来解决这个问题。假设我们有三个布尔值，A、B和C，我们可以构建一个卡诺图：

```
      | C | !C
------|---|----
 A  B | 1 | 1
 A !B | 1 | 0
!A !B | 0 | 0
!A  B | 1 | 0
```

在上表中，A、B和C表示它们的真值。相反，!A、!B和!C表示它们的假值。

因此，正如我们所见，表中涵盖了给定三个布尔值的所有可能组合。此外，我们可以找到所有至少有两个布尔值为真的组合情况。对于这些情况，我们在表中写了‘1’。因此，有两个包含一的组：第一行（组1）和第一列（组2）。

**因此，最终的布尔代数表达式是：（组1中所有一的表达式）||（组2中所有一的表达式）**。

接下来，让我们分而治之。

- 组1（第一行）——A和B都为真。无论C的值是什么，我们都会有一个。因此，我们有：_A && B_
- 组2（第一列）——首先，C始终为真。此外，A和B中至少有一个为真。因此，我们得到：_C && (A || B)_

最后，让我们将两组合并并得到解决方案：

```java
public static boolean twoorMoreAreTrueByKarnaughMap(boolean a, boolean b, boolean c) {
    return (c && (a || b)) || (a && b);
}

```

现在，让我们测试一下这个方法是否按预期工作：

```java
TEST_CASES_AND_EXPECTED.forEach((array, expected) ->
  assertThat(ThreeBooleans.twoorMoreAreTrueByKarnaughMap(array[0], array[1], array[2])).isEqualTo(expected));

```

如果我们执行测试，它会通过。也就是说，这个方法是有效的。

然而，如果我们尝试使用这种方法来解决一般问题，当n很大时，制作表格可能会很困难。

因此，**尽管卡诺图擅长解决复杂的布尔代数问题，但它不适合一些动态和一般的任务**。

## 7. 使用异或运算符

最后，让我们看看另一种有趣的方法。

在这个问题中，我们得到了三个布尔值。此外，我们知道一个布尔值只能有两个不同的值：真（true）和假（false）。

因此，让我们首先从三个中取出任意两个布尔值，比如说a和b。然后，我们检查表达式_a != b_的结果：

- _a != b_为真——a或b为真。因此，如果c为真，那么我们就有两个真值。否则，我们有三个布尔值中的两个假值。也就是说，c的值是答案。
- _a != b_为假——a和b具有相同的值。由于我们只有三个布尔值，a（或b）的值是答案。

因此，我们可以得出结论：_a != b ? c : a_。此外，_a != b_检查实际上是一个异或操作。因此，解决方案可以简单到：

```java
public static boolean twoOrMoreAreTrueByXor(boolean a, boolean b, boolean c) {
    return a ^ b ? c : a;
}

```

当我们使用_TEST_CASES_AND_EXPECTED_映射来测试这个方法时，测试也会通过：

```java
TEST_CASES_AND_EXPECTED.forEach((array, expected) ->
  assertThat(ThreeBooleans.twoOrMoreAreTrueByXor(array[0], array[1], array[2])).isEqualTo(expected));

```

这个解决方案非常紧凑且巧妙。然而，**我们不能将其扩展来解决一般问题**。

## 8. 结论

在本文中，我们探讨了几种不同的方法来检查给定的三个布尔值中是否至少有两个为真。

此外，我们讨论了哪种方法可以轻松扩展来解决更一般的问题：检查给定的n个布尔值中是否至少有x个为真。

一如既往，完整的源代码可以在GitHub上找到。
OK