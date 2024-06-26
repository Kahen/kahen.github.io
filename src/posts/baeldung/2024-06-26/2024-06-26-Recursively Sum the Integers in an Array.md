---
date: 2024-06-26
category:
  - Java
  - 编程
tag:
  - 数组
  - 递归
head:
  - - meta
    - name: keywords
      content: Java, 数组求和, 递归算法
---
# 数组中整数的递归求和 | Baeldung

## 1. 概述

当我们处理数字时，对数组中的所有整数进行求和是一项常见操作。此外，递归经常提供优雅的解决方案。

在本教程中，我们将探讨如何使用递归来对数组中的整数进行求和。

## 2. 带数组复制的递归

首先，我们初始化一个整数数组：

```java
private static final int[] INT_ARRAY = { 1, 2, 3, 4, 5 };
```

显然，上述数组中的整数之和是15。

在数组中求和数字的通常方法是sum _(array[0-n]) = array[0] + array[1] + array[2] + array[3] + … + array[n]_。

这种方法是直接的。或者，我们可以从不同的角度看待这个问题：**数组中数字的和等于第一个数字加上其余数字组成的子数组的和：**

```java
sumOf(array[0..n]) = array[0] + sumOf(subArray[1..n]).
```

现在，如果我们将_sumOf()_看作一个函数或方法，我们可以看到_sumOf()_的主体再次调用_sumOf()_。因此，_sumOf()_是一个递归方法。

由于Java不允许我们在创建后更改数组的长度，**从技术上讲，从数组中移除一个元素是不可能的**。但是Java提供了多种复制数组的方法。我们可以使用这些方法来创建子数组。

当我们实现递归方法时，定义基本情况至关重要。**基本情况是递归退出的某个点。**否则，没有基本情况，该方法将无限地递归调用自己，直到抛出_StackOverflowError_。

在我们的例子中，**基本情况是当子数组只有一个元素时。这是因为在取出唯一的数字后，子数组为空**。

那么接下来，让我们实现递归方法：

```java
int sumIntArray1(int[] array) {
    if (array.length == 1) {
        return array[0];
    } else {
        return array[0] + sumIntArray1(Arrays.copyOfRange(array, 1, array.length));
    }
}
```

正如我们在_sumIntArray1()_方法中看到的，我们使用_Arrays.copyOfRange()_方法来创建子数组。

如果我们将示例输入传递给该方法，递归步骤如下所示：

```java
sumIntarray1(array) = array[0] + sumOfArray1(arr1{2, 3, 4, 5})
                    = 1 + (arr1[0] + sumIntarray1(arr2{3, 4, 5}))
                    = 1 + (2 + (arr2[0] + sumIntarray1(arr3{4, 5})))
                    = 1 + (2 + (3 + (arr3[0] + sumIntarray1(arr4{5})))) `<-- (arr4.length == 1) 达到基本情况
                    = 1 + (2 + (3 + (4 + (5))))
                    = 15
```

接下来，让我们使用_INT_ARRAY_测试该方法：

```java
assertEquals(15, sumIntArray1(INT_ARRAY));
```

## 3. 不创建数组副本的递归

在_sumIntArray1()_方法中，我们使用了_Arrays.copyOfRange()_方法来初始化子数组。然而**，每次调用这个方法时都会创建一个新的数组**。如果我们面对一个庞大的整数数组，这种方法会创建许多数组对象。

我们知道应该避免创建不必要的对象以获得更好的性能。那么，接下来，让我们看看是否可以改进_sumIntArray1()_方法。

这个想法是**将所需的索引传递给下一个递归步骤**。然后，我们可以重用同一个数组对象：

```java
int sumIntArray2(int[] array, int lastIdx) {
    if (lastIdx == 0) {
        return array[lastIdx];
    } else {
        return array[lastIdx] + sumIntArray2(array, lastIdx - 1);
    }
}
```

如果我们使用_INT_ARRAY_输入测试它，测试通过：

```java
assertEquals(15, sumIntArray2(INT_ARRAY, INT_ARRAY.length - 1))
```

接下来，让我们了解_sumIntArray2()_方法的工作原理。

该方法接受两个参数：**整数数组（_array_）和我们打算计算总和的最后一个索引（_lastIdx_）**。这一次，递归遵循这个规则：

```java
sumOf(array[0..n], n) = array[n] + sumOf(array[0..n], n-1).
```

正如我们所看到的，我们在每次递归步骤中重用原始数组。**这种方法的基本情况是当_lastIdx_为零时，这意味着我们已经反向（从_n ->` 0_）遍历了整个数组：**

```java
sumIntArray2(array, 4) = array[4] + sumOfArray2(array, 3)
                       = 5 + (array[3] + sumIntArray2(array, 2))
                       = 5 + (4 + (array[2] + sumIntArray2(array, 1)))
                       = 5 + (4 + (3 + (array[1] + sumIntArray2(array, 0))))
                       = 5 + (4 + (3 + (2 + (array[0])))) <-- (idx == 0) 达到基本情况
                       = 5 + (4 + (3 + (2 + (1))))
                       = 15
```

最后，让我们进行性能比较，看看在相同的输入下，_sumIntArray2()_是否比_sumIntArray1()_更快。

## 4. 两个递归解决方案的基准测试

我们将使用JMH（Java Microbenchmark Harness）来对这两个递归解决方案进行基准测试。那么，让我们首先创建一个基准测试类：

```java
@BenchmarkMode(Mode.AverageTime)
@State(Scope.Thread)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Warmup(iterations = 2)
@Fork(1)
@Measurement(iterations = 5)
public class SumArrayBenchmark {

    public static void main(String[] args) throws Exception {
        Options options = new OptionsBuilder()
          .include(SumArrayBenchmark.class.getSimpleName())
          .build();
        new Runner(options).run();
    }

    @Param({"10", "10000"})
    public int size;
    int[] array;

    @Setup
    public void setup() {
        var r = new Random();
        array = new int[size];

        for (int i = 0; i < size; i++) {
            array[i] = r.nextInt();
        }
    }

    @Benchmark
    public int withArrayCopy() {
        return sumIntArray1(array);
    }

    @Benchmark
    public int withoutArrayCopy() {
        return sumIntArray2(array, array.length - 1);
    }
}
```

我们的目标是对两种解决方案进行基准测试。因此，为了简洁，我们不会讨论每个JMH配置或注释。然而，至关重要的是要理解**_SumArrayBenchmark_使用两个不同的输入数组对每种解决方案进行测试：**

- 一个包含10个随机数字的数组
- 一个包含10000个随机整数的数组

此外，**JMH对每个解决方案的每个输入数组进行五次迭代**，确保对他们的性能进行全面评估。

接下来，让我们看看_SumArrayBenchmark_产生的输出：

```java
Benchmark                           (size)  Mode  Cnt        Score       Error  Units
SumArrayBenchmark.withArrayCopy         10  avgt    5       30,576 ±     0,584  ns/op
SumArrayBenchmark.withArrayCopy      10000  avgt    5  7314150,000 ± 82516,421  ns/op
SumArrayBenchmark.withoutArrayCopy      10  avgt    5        6,764 ±     0,032  ns/op
SumArrayBenchmark.withoutArrayCopy   10000  avgt    5    30140,685 ±    91,804  ns/op
```

正如报告所示，**_withoutArrayCopy()_解决方案比_withArrayCopy()_方法快得多：**

- 数组[10] ~ 快5倍 (30576/6764)
- 数组[10000] ~ 快242倍 (7314150/30140)

## 5. 结论

在本文中，我们探讨了两种递归求和数组中整数的方法。我们还使用JMH工具分析了它们的性能。"withoutArrayCopy"解决方案比"withArrayCopy"方法快得多。

如常，示例的完整源代码可在GitHub上获得。