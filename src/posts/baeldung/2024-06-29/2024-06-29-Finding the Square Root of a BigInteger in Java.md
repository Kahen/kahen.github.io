---
date: 2024-06-29
category:
  - Java
  - 数学运算
tag:
  - BigInteger
  - 性能比较
head:
  - - meta
    - name: keywords
      content: Java, BigInteger, 平方根, 性能测试, Guava, NewtonPlus方法
---
# Java中计算BigInteger的平方根

在处理大数字时，我们常常受到_int_和_long_大小的限制。Java通过_BigInteger_类提供了一个很好的解决方案。然而，有时API并不支持我们想要使用的所有算术运算。

计算一个大数的平方根是常见但通常很棘手的。

在本教程中，我们将学习如何做到这一点，以及每种方法的优缺点。

### 2.1. Java 9 _BigInteger_ API
我们将从Java 9中引入的最直接方法开始。从这个版本及以上，_BigInteger_提供了两个有用的方法：_sqrt()_和_sqrtAndReminder()_。让我们先看看第一个：

```
BigInteger integer = new BigInteger(bigDecimalNumber);
BigInteger root = integer.sqrt();
```

第二个方法类似，但提供了有关余数的额外信息：

```
BigInteger integer = new BigInteger(bigDecimalNumber);
BigInteger[] rootAndReminder = integer.sqrtAndRemainder();
```

这两种方法提供了一种简单透明的方式来计算根。然而，它需要特定的Java版本，这可能对某些应用程序来说是个问题。

### 2.2. Guava的_BigIntegerMath_
另一种不升级Java版本即可计算根的方法是使用Guava库：

```
BigInteger integer = new BigInteger(bigDecimalNumber);
BigInteger root = BigIntegerMath.sqrt(integer, RoundingMode.DOWN);
```

该方法采用_RoundingMode_来确定舍入逻辑。该库没有提供一种简单的方法来获取余数，所以如果我们需要它，我们将不得不进行一些额外的步骤：

```
BigInteger integer = new BigInteger(bigDecimalNumber);
BigInteger root = BigIntegerMath.sqrt(integer, RoundingMode.DOWN);
BigInteger reminder = integer.subtract(root.multiply(root));
```

### 2.3. NewtonPlus方法
在大多数情况下，实现一个自定义解决方案来寻找一个大整数的平方根是可能的，但通常不推荐。通常，自定义实现可能具有更高的复杂性和更低的吞吐量。有一些简单但效率低下的算法，例如二分查找和牛顿法。

然而，有一种算法的性能超过了Java标准和Guava的实现。NewtonPlus算法是由[未提供作者名]引入的，基于牛顿法。该算法从5 x 10^14以上的数字开始显示出性能提升。

### 3. 性能比较
让我们对Java、Guava库、NewtonPlus和牛顿法进行性能测试，以检查它们之间是否有显著差异。我们将在三个不同的值上运行测试用例：

```
private static final String BIG_NUMBER = "1797693130000000000000000000000..." // 309位
private static final String VERY_BIG_NUMBER = "32473927492374927934284792..." // 1802位
private static final String INSANELY_BIG_NUMBER = "3247392749237492793428..." // 3604位
```

运行JMH基准测试后，我们得到了以下结果：

```
Benchmark                                                  (number)              Mode  Cnt       Score   Error  Units
BigIntegerSquareRootBenchmark.calculateRootWithNewton      BIG_NUMBER           thrpt         2668.642          ops/s
BigIntegerSquareRootBenchmark.calculateRootWithJava        BIG_NUMBER           thrpt        25417.428          ops/s
BigIntegerSquareRootBenchmark.calculateRootWithGuava       BIG_NUMBER           thrpt       144117.671          ops/s
BigIntegerSquareRootBenchmark.calculateRootWithNewtonPlus  BIG_NUMBER           thrpt       308933.077          ops/s

BigIntegerSquareRootBenchmark.calculateRootWithNewton      VERY_BIG_NUMBER      thrpt           33.627          ops/s
BigIntegerSquareRootBenchmark.calculateRootWithJava        VERY_BIG_NUMBER      thrpt         1376.668          ops/s
BigIntegerSquareRootBenchmark.calculateRootWithGuava       VERY_BIG_NUMBER      thrpt         5349.748          ops/s
BigIntegerSquareRootBenchmark.calculateRootWithNewtonPlus  VERY_BIG_NUMBER      thrpt        12283.677          ops/s

BigIntegerSquareRootBenchmark.calculateRootWithNewton      INSANELY_BIG_NUMBER  thrpt            9.135          ops/s
BigIntegerSquareRootBenchmark.calculateRootWithJava        INSANELY_BIG_NUMBER  thrpt          553.475          ops/s
BigIntegerSquareRootBenchmark.calculateRootWithGuava       INSANELY_BIG_NUMBER  thrpt         1713.520          ops/s
BigIntegerSquareRootBenchmark.calculateRootWithNewtonPlus  INSANELY_BIG_NUMBER  thrpt         3252.308          ops/s
```

NewtonPlus方法显示出最佳性能，可能是需要大量此类计算的应用程序的好选择。同时，如果向代码库添加自定义的、高度优化的代码不是一个很有吸引力的想法，我们可以选择Guava的_BigIntegerMath_，它具有相对良好的性能。

此外，像牛顿法这样的简单算法效率低下，应该避免使用。**二分查找方法通常比牛顿法性能低，因为它的收敛速度较低。**

### 4. 结论
在处理巨大的数字时，我们需要一种方便的方式来对它们执行标准数学运算。从数学的角度来看，无论数字的大小如何，操作都是一样的，但计算机科学创造了某些限制。这就是为什么我们需要特定的库和算法来处理_BigIntegers_。

根据手头任务的特定性，我们可以选择不同的解决方案，从标准库到为应用程序需求精心调整的自定义解决方案。然而，过早的优化从来都不是好事，而且往往是有害的。因此，我们应该在我们的选择中保持合理。

像往常一样，所有的代码都可以在GitHub上找到。