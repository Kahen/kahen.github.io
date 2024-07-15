---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Factors
  - Optimization
head:
  - - meta
    - name: keywords
      content: Java, Factors, Optimization, Programming
---
# Java中列出一个整数的所有因子

## 1. 概述

在本教程中，我们将编写一个Java程序来找出给定整数的所有因子。

## 2. 问题介绍

在我们开始编写Java代码之前，让我们先理解一下整数的因子是什么。

**给定一个整数n，如果整数i能够完全整除n，则i是n的因子。** 完全整除意味着当我们用i除以n时，余数为零。

一些例子可能可以快速解释：
- n = 10，它的因子：1, 2, 5, 和 10
- n = 13，它的因子：1 和 13
- n = 1，n只有一个因子：1
- n = 0，零没有因子

正如示例所示，通常，整数n的因子总是包含1和n，即使n是一个质数，例如13。然而，**零是一个特殊的整数。它没有因子。**

现在我们已经理解了因子的概念，让我们创建一个Java程序来找出给定整数的所有因子。

为了简单起见，我们将使用单元测试断言来验证我们的解决方案是否按预期工作。

## 3. 创建一个方法来找出一个整数的所有因子

找出一个整数n的所有因子的最直接方法是通过**从1循环到n，并测试哪个数字可以完全整除n**。我们可以将能够完全整除n的数字存储在一个集合中。当循环结束时，这个集合将包含n的所有因子。

在Java中实现这个想法对我们来说并不是一个挑战：

```java
static Set`````<Integer>````` getAllFactorsVer1(int n) {
    Set`````<Integer>````` factors = new HashSet<>();
    for (int i = 1; i <= n; i++) {
        if (n % i == 0) {
            factors.add(i);
        }
    }
    return factors;
}
```

接下来，让我们编写一些测试来检查我们的方法是否按预期工作。首先，让我们创建一个映射来准备一些要测试的数字及其预期的因子：

```java
final static Map<Integer, Set`````<Integer>`````> FACTOR_MAP = ImmutableMap.of(
    0, ImmutableSet.of(),
    1, ImmutableSet.of(1),
    20, ImmutableSet.of(1, 2, 4, 5, 10, 20),
    24, ImmutableSet.of(1, 2, 3, 4, 6, 8, 12, 24),
    97, ImmutableSet.of(1, 97),
    99, ImmutableSet.of(1, 3, 9, 11, 33, 99),
    100, ImmutableSet.of(1, 2, 4, 5, 10, 20, 25, 50, 100)
);
```

现在，对于上面的FACTOR_MAP中的每个数字，我们调用我们已经实现的getAllFactorsVer1()方法，看看它是否能找到所需的因子：

```java
FACTOR_MAP.forEach((number, expected) -> assertEquals(expected, FactorsOfInteger.getAllFactorsVer1(number)));
```

如果我们运行它，测试将通过。所以，这个方法解决了问题，太好了！

敏锐的眼睛可能会发现我们用Ver1命名了这个方法。通常，这意味着我们将在教程中引入不同版本。换句话说，解决方案仍有改进的空间。

接下来，让我们看看如何优化版本1的实现。

## 4. 优化 - 版本2

让我们回顾一下方法中的主要逻辑：

```java
for (int i = 1; i <= n; i++) {
   if (n % i == 0) {
       factors.add(i);
   }
}
```

正如上面的代码所示，我们将执行n % i计算n次。现在，如果我们检查一个整数的因子，我们会看到**因子总是成对出现**。让我们以n = 100为例来理解这个因子特性：

```java
   1    2    4    5    10    20    25    50    100
   │    │    │    │    |      │     │     │     │
   │    │    │    │  [10,10]  │     │     │     │
   │    │    │    │           │     │     │     │
   │    │    │    └──[5, 20] ─┘     │     │     │
   │    │    │                      │     │     │
   │    │    └───────[4, 25]────────┘     │     │
   │    │                                 │     │
   │    └────────────[2, 50]──────────────┘     │
   │                                            │
   └─────────────────[1, 100]───────────────────┘
```

正如我们所看到的，100的有因子都是成对的。因此，**如果我们找到了n的一个因子i，我们就可以得到配对的一个i'= n/i**。也就是说，我们不需要循环n次。相反，**我们检查从1到n的平方根，并找到所有的i和i'对**。通过这种方式，给定n=100，我们只需要循环十次。

接下来，让我们优化我们的版本1方法：

```java
static Set`````<Integer>````` getAllFactorsVer2(int n) {
    Set`````<Integer>````` factors = new HashSet<>();
    for (int i = 1; i `<= Math.sqrt(n); i++) {
        if (n % i == 0) {
            factors.add(i);
            factors.add(n / i);
        }
    }
    return factors;
}
```

正如上面的代码所示，我们使用了Java标准库中的Math.sqrt()方法来计算n的平方根。

现在，让我们用相同的测试数据测试我们的第二版实现：

```java
FACTOR_MAP.forEach((number, expected) ->` assertEquals(expected, FactorsOfInteger.getAllFactorsVer2(number)));
```

如果我们运行测试，它会通过。所以，优化后的版本2按预期工作。

我们已经成功地将因子确定次数从n减少到n的平方根。这是一个显著的改进。然而，仍然有进一步优化的空间。那么，接下来，让我们进一步分析。

## 5. 进一步优化 - 版本3

首先，让我们做一些简单的数学分析。

我们知道，给定的整数n可以是偶数或奇数。**如果n是偶数，我们不能预测它的因子是偶数还是奇数。** 例如，20的因子是1, 2, 4, 5, 10和20。所以有偶数和奇数。

然而，**如果n是奇数，它的所有因子也必须是奇数**。例如，99的因子是1, 3, 9, 11, 33和99。因此，它们都是奇数。

所以，我们可以根据n是奇数还是偶数来调整环的增量步长。**由于我们的循环从i = 1开始，如果我们得到一个奇数，我们可以将增量步长设置为step = 2，以跳过所有偶数的检查。**

接下来，让我们在版本3中实现这个想法：

```java
static Set`````<Integer>````` getAllFactorsVer3(int n) {
    Set`````<Integer>````` factors = new HashSet<>();
    int step = n % 2 == 0 ? 1 : 2;
    for (int i = 1; i `<= Math.sqrt(n); i += step) {
        if (n % i == 0) {
            factors.add(i);
            factors.add(n / i);
        }
    }
    return factors;
}
```

通过这种优化，如果n是偶数，循环将执行sqrt(n)次，与版本2相同。

然而，**如果n是一个奇数整数，循环总共将执行sqrt(n)/2次。**

最后，让我们测试我们的版本3解决方案：

```java
FACTOR_MAP.forEach((number, expected) ->` assertEquals(expected, FactorsOfInteger.getAllFactorsVer3(number)));
```

如果我们运行它，测试将通过。所以，它正确地完成了工作。

## 6. 结论

在本文中，我们创建了一个Java方法来找出一个整数的所有因子。此外，我们讨论了对初始解决方案的两种优化。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。