---
date: 2024-06-23
category:
  - Java
  - 编程
tag:
  - 权重平均数
  - 计算
head:
  - - meta
    - name: keywords
      content: Java, 权重平均数, 计算, 编程
---
# 在Java中计算加权平均数

## **1. 引言**

在本文中，我们将探讨几种不同的方法来解决同一个问题——计算一组数值的加权平均数。

## **2. 什么是加权平均数？**

我们通过将一组数字全部相加，然后除以数字的个数来计算标准平均数。例如，数字1、3、5、7、9的平均数将是(1 + 3 + 5 + 7 + 9) / 5，等于5。

**当我们计算加权平均数时，我们有一组每个数字都有权重的数字：**

| 数字 | 权重 |
| --- | --- |
| 1   | 10  |
| 3   | 20  |
| 5   | 30  |
| 7   | 50  |
| 9   | 40  |

在这种情况下，我们需要考虑权重。**新的计算方式是将每个数字与其权重的乘积求和，然后除以所有权重的总和。** 例如，这里的平均数将是((1 * 10) + (3 * 20) + (5 * 30) + (7 * 50) + (9 * 40)) / (10 + 20 + 30 + 50 + 40)，等于6.2。

## **3. 准备设置**

为了这些示例，我们将进行一些初始设置。**最重要的事情是我们需要一个类型来表示我们的加权值：**

```java
private static class Values {
    int value;
    int weight;

    public Values(int value, int weight) {
        this.value = value;
        this.weight = weight;
    }
}
```

在我们的示例代码中，我们还将有一组初始值和一个预期的平均结果：

```java
private List`<Values>` values = Arrays.asList(
    new Values(1, 10),
    new Values(3, 20),
    new Values(5, 30),
    new Values(7, 50),
    new Values(9, 40)
);

private Double expected = 6.2;
```

## **4. 两次遍历计算**

**最明显的方式来计算这个就像我们上面看到的那样。我们可以遍历数字列表，分别求和我们需要的值用于除法：**

```java
double top = values.stream()
  .mapToDouble(v -> v.value * v.weight)
  .sum();
double bottom = values.stream()
  .mapToDouble(v -> v.weight)
  .sum();
```

完成这个之后，我们的计算现在只是将一个除以另一个：

```java
double result = top / bottom;
```

**我们可以进一步简化这一点，通过使用传统的_for_循环，并且边遍历边进行两次求和。** 这里的不足是结果不能是不可变值：

```java
double top = 0;
double bottom = 0;

for (Values v : values) {
    top += (v.value * v.weight);
    bottom += v.weight;
}
```

## **5. 扩展列表**

我们可以以不同的方式考虑我们的加权平均数计算。**而不是计算乘积的总和，我们可以扩展每个加权值。** 例如，我们可以将列表扩展为包含10个“1”，20个“2”等等。此时，我们可以对扩展后的列表进行直接平均：

```java
double result = values.stream()
  .flatMap(v -> Collections.nCopies(v.weight, v.value).stream())
  .mapToInt(v -> v)
  .average()
  .getAsDouble();
```

这显然效率较低，但它可能更清晰、更容易理解。我们也可以更容易地对最终的数字集合进行其他操作——例如，找到中位数这种方式更容易理解。

## **6. 减少列表**

我们看到求和乘积和权重比尝试展开值更有效率。但如果我们想在不使用可变值的情况下进行单次遍历怎么办？**我们可以使用Streams的_reduce()_功能来实现这一点。特别是，我们将使用它来边进行边进行加法，将运行总数收集到一个对象中：**

我们首先需要一个类来收集我们的运行总数：

```java
class WeightedAverage {
    final double top;
    final double bottom;

    public WeightedAverage(double top, double bottom) {
        this.top = top;
        this.bottom = bottom;
    }

    double average() {
        return top / bottom;
    }
}
```

我们还在这个类上包含了一个_average()_函数，它将执行我们的最终计算。现在，我们可以执行我们的缩减：

```java
double result = values.stream()
  .reduce(new WeightedAverage(0, 0),
    (acc, next) -> new WeightedAverage(
      acc.top + (next.value * next.weight),
      acc.bottom + next.weight),
    (left, right) -> new WeightedAverage(
      left.top + right.top,
      left.bottom + right.bottom))
  .average();
```

这看起来非常复杂，让我们分解成部分。

_reduce()_的第一个参数是我们的身份。这是值为0的加权平均数。

下一个参数是一个lambda，它接受一个_WeightedAverage_实例并添加下一个值。我们会注意到这里的总和计算方式与我们之前执行的方式相同。

最后一个参数是用于组合两个_WeightedAverage_实例的lambda。这对于某些情况下的_reduce()_是必要的，例如，如果我们在并行流上执行此操作。

_reduce()_调用的结果是一个_WeightedAverage_实例，我们可以使用它来计算结果。

## **7. 自定义收集器**

我们的_reduce()_版本当然很干净，但它比其他尝试更难理解。我们最终传递了两个lambda到函数中，并且仍然需要执行一个后处理步骤来计算平均值。

**我们可以探索的最后一个解决方案是编写一个自定义收集器来封装这项工作。这将直接产生我们的结果，它将更简单易用。**

在我们编写收集器之前，让我们看看我们需要实现的接口：

```java
public interface Collector`<T, A, R>` {
    Supplier``<A>`` supplier();
    BiConsumer`<A, T>` accumulator();
    BinaryOperator``<A>`` combiner();
    Function`<A, R>` finisher();
    Set``<Characteristics>`` characteristics();
}
```

这里有很多内容，但我们将边构建收集器边处理它。我们还将看到这些额外的复杂性如何允许我们在并行流上使用完全相同的收集器，而不仅仅是在顺序流上。

首先要注意的是泛型类型：

- _T_ – 这是输入类型。我们的收集器始终需要与它可以收集的值的类型绑定。
- _R_– 这是结果类型。我们的收集器始终需要指定它将产生的类型。
- _A_– 这是聚合类型。这通常是收集器内部的，但对于某些函数签名是必要的。

**这意味着我们需要定义一个聚合类型。这只是一个在我们进行时收集运行结果的类型。** 我们不能直接在我们的收集器中这样做，因为我们需要支持并行流，可能会同时进行未知数量的这些操作。因此，我们定义了一个单独的类型，用于存储每个并行流的结果：

```java
class RunningTotals {
    double top;
    double bottom;

    public RunningTotals() {
        this.top = 0;
        this.bottom = 0;
    }
}
```

这是一个可变类型，但由于其使用将被限制在一个并行流内，这是可以的。

**现在，我们可以实现我们的收集器方法。** 我们会发现这些大多数返回lambda。同样，这是为了支持并行流，其中底层流框架将根据需要调用它们的某种组合。

**第一个方法是_supplier()_** _._ 这构造了我们的_RunningTotals_的新零实例：

```java
@Override
public Supplier``<RunningTotals>`` supplier() {
    return RunningTotals::new;
}
```

**接下来，我们有_accumulator()_**。这接受一个_RunningTotals_实例和下一个要处理的_Values_实例，并将它们结合起来，就地更新我们的_RunningTotals_实例：

```java
@Override
public BiConsumer`<RunningTotals, Values>` accumulator() {
    return (current, next) -> {
        current.top += (next.value * next.weight);
        current.bottom += next.weight;
    };
}
```

**我们的下一个方法是_combiner()_**。这接受两个_RunningTotals_实例——来自不同的并行流——并将它们合并为一个：

```java
@Override
public BinaryOperator``<RunningTotals>`` combiner() {
    return (left, right) -> {
        left.top += right.top;
        left.bottom += right.bottom;

        return left;
    };
}
```

在这种情况下，我们正在改变我们的一个输入并直接返回它。这是完全安全的，但如果返回一个新实例更容易，我们也可以这样做。

这只会在JVM决定将流处理拆分为多个并行流时使用，这取决于几个因素。但是，我们应该实现它以防这种情况发生。

**我们需要实现的最后一个lambda方法是_finisher()_**。这接受最终的_RunningTotals_实例，在所有值都被累积并且所有并行流都被合并之后，并返回最终结果：

```java
@Override
public Function`<RunningTotals```java
, Double>` finisher() {
    return rt -> rt.top / rt.bottom;
}
```

**我们的_Collector_还需要一个_characteristics()_方法，返回描述收集器如何使用的特征集。** _Collectors.Characteristics_枚举由三个值组成：

- _CONCURRENT_ – _accumulator()_函数可以安全地从并行线程调用到同一个聚合实例。如果指定了这一点，那么_combiner()_函数将永远不会被使用，但_aggregation()_函数必须格外小心。
- _UNORDERED_ – 收集器可以安全地以任意顺序处理来自底层流的元素。如果没有指定这一点，那么在可能的情况下，值将按照正确的顺序提供。
- _IDENTITY_FINISH_ – _finisher()_函数只是直接返回其输入。如果指定了这一点，那么收集过程可能会短路此调用，并直接返回值。

**在我们的情况下，我们有一个_UNORDERED_收集器，但需要省略其他两个：**

```java
@Override
public Set``<Characteristics>`` characteristics() {
    return Collections.singleton(Characteristics.UNORDERED);
}
```

我们现在可以使用我们的收集器了：

```java
double result = values.stream().collect(new WeightedAverage());
```

**虽然编写收集器比以前更复杂，但使用它要容易得多。** 我们还可以不费吹灰之力地利用像并行流这样的东西，这意味着这为我们提供了一个更易用且更强大的解决方案，假设我们需要重用它。

## **8. 结论**

在这里，我们已经看到了几种不同的方法来计算一组数值的加权平均数，从简单地自己遍历这些值到编写一个完整的_Collector_实例，以便在需要执行此计算时重用。下次你需要这样做时，为什么不试试其中之一呢？

和往常一样，本文的全部代码可以在GitHub上找到。

OK