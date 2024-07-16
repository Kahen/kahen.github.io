---
date: 2024-07-17
category:
  - Java
  - Stream
tag:
  - Java
  - Stream
  - Filter
  - Reduction
head:
  - - meta
    - name: keywords
      content: Java, Stream, Filter, Reduction, Unique Element
---
# Java流中筛选出唯一元素的方法

在这篇文章中，我们将使用两种来自_Collectors_的方法来检索与给定谓词匹配的唯一元素。对于这两种方法，我们将根据以下标准定义两种方法：

- get方法期望有一个唯一的结果。否则，它将抛出一个_Exception_
- find方法接受结果可能缺失，并在存在时返回一个_Optional_与值

## 2. 使用归约(Reduction)检索唯一结果

**_Collectors.reducing_对其输入元素执行归约。**为此，它应用一个指定为_BinaryOperator_的函数。结果被描述为_Optional_。因此我们可以定义我们的find方法。

在我们的情况下，如果过滤后有两个或更多的元素，我们只需要丢弃结果：

```java
public static ``````````````````<T>`````````````````` Optional``````````````````<T>`````````````````` findUniqueElementMatchingPredicate_WithReduction(Stream``````````````````<T>`````````````````` elements, Predicate``````````````````<T>`````````````````` predicate) {
    return elements.filter(predicate)
      .collect(Collectors.reducing((a, b) -> null));
}
```

要编写get方法，我们需要进行以下更改：

- 如果我们检测到两个元素，我们可以直接抛出它们而不是返回null
- 最后，我们需要获取_Optional_的值：如果它是空的，我们也想抛出

此外，在这种情况下，**我们可以直接在** _**Stream**_ **上应用归约操作：**

```java
public static ``````````````````<T>`````````````````` T getUniqueElementMatchingPredicate_WithReduction(Stream``````````````````<T>`````````````````` elements, Predicate``````````````````<T>`````````````````` predicate) {
    return elements.filter(predicate)
      .reduce((a, b) -> {
          throw new IllegalStateException("Too many elements match the predicate");
      })
      .orElseThrow(() -> new IllegalStateException("No element matches the predicate"));
}
```

## 3. 使用_Collectors.collectingAndThen_检索唯一结果

**_Collectors.collectingAndThen_对收集操作的结果_List_应用一个函数。**

因此，为了定义find方法，我们需要获取_List_并：

- 如果_List_有零个或多于两个元素，返回_null_
- 如果_List_恰好有一个元素，返回它

这是这个操作的代码：

```java
private static ``````````````````<T>`````````````````` T findUniqueElement(List``````````````````<T>`````````````````` elements) {
    if (elements.size() == 1) {
        return elements.get(0);
    }
    return null;
}
```

因此，find方法如下：

```java
public static ``````````````````<T>`````````````````` Optional``````````````````<T>`````````````````` findUniqueElementMatchingPredicate_WithCollectingAndThen(Stream``````````````````<T>`````````````````` elements, Predicate``````````````````<T>`````````````````` predicate) {
    return elements.filter(predicate)
      .collect(Collectors.collectingAndThen(Collectors.toList(), list -> Optional.ofNullable(findUniqueElement(list))));
}
```

为了适应我们的私有方法用于get情况，我们需要在检索到的元素数量不是恰好1时抛出。让我们精确区分没有结果和太多结果的情况，就像我们使用归约时那样：

```java
private static ``````````````````<T>`````````````````` T getUniqueElement(List``````````````````<T>`````````````````` elements) {
    if (elements.size() > 1) {
        throw new IllegalStateException("Too many elements match the predicate");
    } else if (elements.size() == 0) {
        throw new IllegalStateException("No element matches the predicate");
    }
    return elements.get(0);
}
```

最后，假设我们的类命名为_FilterUtils_，我们可以编写get方法：

```java
public static ``````````````````<T>`````````````````` T getUniqueElementMatchingPredicate_WithCollectingAndThen(Stream``````````````````<T>`````````````````` elements, Predicate``````````````````<T>`````````````````` predicate) {
    return elements.filter(predicate)
      .collect(Collectors.collectingAndThen(Collectors.toList(), FilterUtils::getUniqueElement));
}
```

## 4. 性能基准测试

**让我们使用JMH对不同方法进行快速性能比较。**

首先，让我们将我们的方法应用到：

- 一个包含从1到100万的所有_整数_的_Stream_
- 一个验证元素是否等于751879的_Predicate_

在这种情况下，_Predicate_将对_Stream_中的唯一元素进行验证。让我们看看_Benchmark_的定义：

```java
@State(Scope.Benchmark)
public static class MyState {
    final Stream``<Integer>`` getIntegers() {
        return IntStream.range(1, 1000000).boxed();
    }

    final Predicate``<Integer>`` PREDICATE = i -> i == 751879;
}

@Benchmark
public void evaluateFindUniqueElementMatchingPredicate_WithReduction(Blackhole blackhole, MyState state) {
    blackhole.consume(FilterUtils.findUniqueElementMatchingPredicate_WithReduction(state.INTEGERS.stream(), state.PREDICATE));
}

@Benchmark
public void evaluateFindUniqueElementMatchingPredicate_WithCollectingAndThen(Blackhole blackhole, MyState state) {
    blackhole.consume(FilterUtils.findUniqueElementMatchingPredicate_WithCollectingAndThen(state.INTEGERS.stream(), state.PREDICATE));
}

@Benchmark
public void evaluateGetUniqueElementMatchingPredicate_WithReduction(Blackhole blackhole, MyState state) {
    try {
        FilterUtils.getUniqueElementMatchingPredicate_WithReduction(state.INTEGERS.stream(), state.PREDICATE);
    } catch (IllegalStateException exception) {
        blackhole.consume(exception);
    }
}

@Benchmark
public void evaluateGetUniqueElementMatchingPredicate_WithCollectingAndThen(Blackhole blackhole, MyState state) {
    try {
        FilterUtils.getUniqueElementMatchingPredicate_WithCollectingAndThen(state.INTEGERS.stream(), state.PREDICATE);
    } catch (IllegalStateException exception) {
        blackhole.consume(exception);
    }
}
```

让我们运行它。**我们正在测量每秒的操作数。越高越好：**

```plaintext
Benchmark                                                                          Mode  Cnt    Score    Error  Units
BenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithCollectingAndThen  thrpt   25  140.581 ± 28.793  ops/s
BenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithReduction          thrpt   25  100.171 ± 36.796  ops/s
BenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithCollectingAndThen   thrpt   25  145.568 ±  5.333  ops/s
BenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithReduction           thrpt   25  144.616 ± 12.917  ops/s
```

正如我们所看到的，在这种情况下，不同的方法表现非常相似。

让我们改变我们的_Predicate_来检查_Stream_中的元素是否等于0。这个条件对于_List_中的所有元素都是错误的。我们现在可以再次运行基准测试：

```plaintext
Benchmark                                                                          Mode  Cnt    Score    Error  Units
BenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithCollectingAndThen  thrpt   25  165.751 ± 19.816  ops/s
BenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithReduction          thrpt   25  174.667 ± 20.909  ops/s
BenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithCollectingAndThen   thrpt   25  188.293 ± 18.348  ops/s
BenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithReduction           thrpt   25  196.689 ±  4.155  ops/s
```

这里，性能图表相当平衡。

最后，让我们看看如果我们使用一个返回值大于751879的_Predicate_会发生什么：这个_Predicate_匹配了_List_中的大量元素。这导致了以下基准测试：

```plaintext
Benchmark                                                                          Mode  Cnt    Score    Error  Units
BenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithCollectingAndThen  thrpt   25   70.879 ±  6.205  ops/s
BenchmarkRunner.evaluateFindUniqueElementMatchingPredicate_WithReduction          thrpt   25  210.142 ± 23.680  ops/s
BenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithCollectingAndThen   thrpt   25   83.927 ±  1.812  ops/s
BenchmarkRunner.evaluateGetUniqueElementMatchingPredicate_WithReduction           thrpt   25  252.881 ±  2.710  ops/s
```

正如我们所看到的，使用归约的变体更有效。此外，直接在过滤后的_Stream_上使用_reduce_因为异常在找到两个匹配值后立即抛出而表现突出。

总而言之，如果性能是一个问题：

- **应该优先使用归约**
- 如果我们期望找到许多潜在的匹配值，减少_Stream_的get方法要快得多

## 5. 结论

在这个教程中，我们看到了在过滤_Stream_后检索唯一结果的不同方法，然后比较了它们的效率。

如常，代码可以在GitHub上找到。