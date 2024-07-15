---
date: 2022-04-01
category:
  - Java
  - Armstrong Numbers
tag:
  - Java
  - Armstrong Numbers
  - 数学
head:
  - - meta
    - name: keywords
      content: Java, Armstrong Numbers, 数学, 编程
---
# Java中的阿姆斯特朗数

在这个快速教程中，我们将学习什么是阿姆斯特朗数，以及如何通过创建一个Java程序来检查和找到它们。

## 2. 问题介绍

首先，让我们了解什么是阿姆斯特朗数。

**给定一个正整数 _i_，如果它有 _n_ 位数字，并且 _i_ 等于其各位数字的 _n_ 次幂之和，则整数 _i_ 是一个阿姆斯特朗数。** 阿姆斯特朗数形成了OEIS序列A005188。

一些例子可能有助于我们快速理解阿姆斯特朗数：

- _1_：_pow(1,1) = 1_ -> 1是一个阿姆斯特朗数。
- _123_：_pow(1, 3) + pow(2, 3) + pow(3, 3) = 1 + 8 + 27 = 36 != 123_ -> 123不是阿姆斯特朗数。
- _1634_：_pow(1, 4) + pow(6, 4) + pow(3, 4) + pow(4, 4) = 1 + 1296 + 81 + 256 = 1643_ -> 1634是一个阿姆斯特朗数。

所以，我们想要有一个Java程序方便地检查给定的数字是否是阿姆斯特朗数。此外，我们还想生成一个小于给定限制的OEIS序列A005188。

为了简单起见，我们将使用单元测试断言来验证我们的方法是否按预期工作。

## 3. 解决问题的方法

既然我们了解了阿姆斯特朗数，让我们看看问题并考虑解决它的方法。

首先，**生成一个有限制的OEIS序列A005188可以转化为从0到给定限制，找出所有的阿姆斯特朗数。** 如果我们有一个方法来检查一个整数是否是阿姆斯特朗数，那么从整数范围中过滤掉非阿姆斯特朗数并得到所需的序列就很容易了。

因此，主要问题就是创建阿姆斯特朗数检查方法。一个直接的检查方法是两步方法：

- 步骤1 - 将给定的整数分解成数字列表，例如，_12345 -> [1, 2, 3, 4, 5]_
- 步骤2 - 对列表中的每个数字，计算 _pow(digit, list.size())_，然后求和结果，并最终将总和与最初给定的整数进行比较

接下来，让我们将这个想法转换成Java代码。

## 4. 创建阿姆斯特朗数方法

正如我们所讨论的，让我们首先将给定的整数转换为数字列表：

```java
static List`````<Integer>````` digitsInList(int n) {
    List`````<Integer>````` list = new ArrayList<>();
    while (n > 0) {
        list.add(n % 10);
        n = n / 10;
    }
    return list;
}
```

如上述代码所示，我们使用 _while_ 循环从 _n_ 中提取数字。**在每一步中，我们通过 _n % 10_ 取一个数字，然后通过 _n = n / 10_ 缩小数字。**

或者，我们可以将数字转换为字符串，并使用 _split()_ 方法获得一个数字字符串列表。然后，我们可以将每个数字重新转换为整数。这里，我们没有采用这种方法。

现在我们已经创建了检查方法，我们可以进行步骤2：_pow()_ 计算和求和：

```java
static boolean isArmstrong(int n) {
    if (n < 0) {
        return false;
    }
    List`````<Integer>````` digitsList = digitsInList(n);
    int len = digitsList.size();
    int sum = digitsList.stream()
      .mapToInt(d -> (int) Math.pow(d, len))
      .sum();
    return n == sum;
}
```

正如我们在 _isArmstrong()_ 检查方法中看到的，我们使用了Java _Stream_ 的 _mapToInt()_ 方法将每个数字转换为 _pow()_ 计算后的结果，然后列表中的结果求和。

最后，我们将总和与初始整数进行比较，以确定数字是否是阿姆斯特朗数。

值得一提的是，**我们可以将 _mapToInt()_ 和 _sum()_ 方法调用合并为一个 _reduce()_ 调用**：

```java
int sum = digits.stream()
  .reduce(0, (subtotal, digit) -> subtotal + (int) Math.pow(digit, len));
```

接下来，让我们创建一个方法来生成限制内的OEIS序列A005188：

```java
static List`````<Integer>````` getA005188Sequence(int limit) {
    if (limit `< 0) {
        throw new IllegalArgumentException("The limit cannot be a negative number.");
    }
    return IntStream.range(0, limit)
      .boxed()
      .filter(ArmstrongNumberUtil::isArmstrong)
      .collect(Collectors.toList());
}
```

正如上述代码中看到的，我们再次使用Stream API来过滤阿姆斯特朗数并生成序列。

## 5. 测试

现在，让我们创建一些测试来验证我们的方法是否按预期工作。首先，让我们从一些测试数据开始：

```java
static final Map<Integer, Boolean>` ARMSTRONG_MAP = ImmutableMap.of(
  0, true,
  1, true,
  2, true,
  153, true,
  370, true,
  407, true,
  42, false,
  777, false,
  12345, false);
```

现在，让我们将上述 _Map_ 中的每个数字传递到我们的检查方法，并看看是否返回预期的结果：

```java
ARMSTRONG_MAP.forEach((number, result) -> assertEquals(result, ArmstrongNumberUtil.isArmstrong(number)));
```

如果我们运行测试，它会通过。所以，检查方法正确地完成了工作。

接下来，让我们准备两个预期的序列，并测试 _getA005188Sequence()_ 是否也按预期工作：

```java
List`````<Integer>````` A005188_SEQ_1K = ImmutableList.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407);
List`````<Integer>````` A005188_SEQ_10K = ImmutableList.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407, 1634, 8208, 9474);

assertEquals(A005188_SEQ_1K, ArmstrongNumberUtil.getA005188Sequence(1000));
assertEquals(A005188_SEQ_10K, ArmstrongNumberUtil.getA005188Sequence(10000));
```

如果我们运行测试，它会通过。

## 6. 结论

在本文中，我们讨论了什么是阿姆斯特朗数。此外，我们创建了方法来检查一个整数是否是阿姆斯特朗数，并生成给定限制内的OEIS序列A005188。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。