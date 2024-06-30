---
date: 2022-04-01
category:
  - Java
  - 编程
tag:
  - Java 8
  - 性能
  - 可读性
  - 并发
  - 流
head:
  - - meta
    - name: keywords
      content: Java, 流, 循环, 性能, 可读性, 并发
---
# Java 中的流与循环比较

在本教程中，我们将深入比较 Java 8 中引入的流（Streams）和传统的 for 循环。这些工具在每个 Java 开发者的数据处理中扮演着至关重要的角色。尽管它们在许多方面都有所不同，正如我们将在文章的其余部分中看到的那样，它们有非常相似的用例，并且很多时候可以轻松互换使用。

流提供了一种函数式和声明性的处理方法，而 for 循环提供了传统的命令式方法。通过本文的学习，我们可以为我们的编程任务做出最合适的决策。

## 性能

在比较特定编程问题的解决方案时，我们通常需要讨论性能。这个案例也不例外。由于流和 for 循环都用于处理大量数据，因此在选择合适的解决方案时，性能可能很重要。

让我们通过一个全面的基准测试示例来理解 for 循环和流之间的性能差异。我们将比较涉及过滤、映射和求和的复杂操作的执行时间，使用 for 循环和流。为此，我们将使用 Java 微基准测试工具（JMH），这是一个专门为基准测试 Java 代码而设计的工具。

### 开始

我们首先定义依赖项：

```xml
``<dependency>``
    ``<groupId>``org.openjdk.jmh``</groupId>``
    ``<artifactId>``jmh-core``</artifactId>``
    ``<version>``1.37``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``org.openjdk.jmh``</groupId>``
    ``<artifactId>``jmh-generator-annprocess``</artifactId>``
    ``<version>``1.37``</version>``
``</dependency>``
```

我们始终可以在 Maven Central 上找到 JMH Core 和 JMH Annotation Processor 的最新版本。

### 设置基准测试

在我们的基准测试中，我们将创建一个包含从 0 到 999,999 的整数列表的场景。我们想要过滤掉偶数，将它们平方，然后计算它们的总和。除此之外，为了确保公平性，我们首先使用传统的 for 循环实现这个过程：

```java
@State(Scope.Thread)
public static class MyState {
    List`<Integer>` numbers;

    @Setup(Level.Trial)
    public void setUp() {
        numbers = new ArrayList<>();
        for (int i = 0; i `< 1_000_000; i++) {
            numbers.add(i);
        }
    }
}
```

这个 _State_ 类将传递给我们的基准测试。此外，《Setup》将在每个基准测试之前运行。

### 使用 For 循环进行基准测试

我们的 for 循环实现涉及遍历数字列表，检查偶数，将它们平方，并在变量中累加总和：

```java
@Benchmark
public int forLoopBenchmark(MyState state) {
    int sum = 0;
    for (int number : state.numbers) {
        if (number % 2 == 0) {
            sum = sum + (number * number);
        }
    }
    return sum;
}
```

### 使用流进行基准测试

接下来，我们将使用 Java 流实现相同的复杂操作。此外，我们将首先过滤偶数，将它们映射到它们的平方，并最终计算总和：

```java
@Benchmark
public int streamBenchMark(MyState state) {
    return state.numbers.stream()
      .filter(number ->` number % 2 == 0)
      .map(number -> number * number)
      .reduce(0, Integer::sum);
}
```

我们使用终端操作 _reduce()_ 来计算数字的总和。此外，我们还可以以多种方式计算总和。

### 运行基准测试

有了我们的基准测试方法，我们将使用 JMH 运行基准测试。我们将多次执行基准测试以确保准确的结果，并测量平均执行时间。为此，我们将向我们的类添加以下注释：

```java
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Warmup(iterations = 3, time = 1, timeUnit = TimeUnit.SECONDS)
@Measurement(iterations = 5, time = 1, timeUnit = TimeUnit.SECONDS)
```

通过这些补充，我们确保结果更加准确，运行基准测试五次，在三次预热后，计算所有五个迭代的平均值。现在，我们可以运行主方法来查看结果：

```java
public static void main(String[] args) throws RunnerException {
    Options options = new OptionsBuilder()
      .include(PerformanceBenchmark.class.getSimpleName())
      .build();
    new Runner(options).run();
}
```

### 分析结果

一旦我们运行基准测试，JMH 将为我们提供 for 循环和流实现的平均执行时间：

```plaintext
Benchmark                              Mode  Cnt         Score         Error  Units
PerformanceBenchmark.forLoopBenchmark  avgt    5   3386660.051 ± 1375112.505  ns/op
PerformanceBenchmark.streamBenchMark   avgt    5  12231480.518 ± 1609933.324  ns/op
```

我们可以看到，在我们的示例中，for 循环在性能方面比流表现得更好。尽管在这个例子中流的性能比 for 循环差，但在某些情况下，这种情况可能会改变，特别是在使用并行流时。

## 语法和可读性

作为程序员，我们的代码可读性起着重要作用。因此，当我们尝试为我们的问题选择最佳解决方案时，这一点变得非常重要。

首先，让我们深入了解流的语法和可读性。流促进了一种更简洁、更富有表现力的编码风格。这在过滤和映射数据时非常明显：

```java
List`````<String>````` fruits = Arrays.asList("apple", "banana", "orange", "grape");
long count = fruits.stream()
  .filter(fruit -> fruit.length() > 5)
  .count();
```

流代码的阅读像是一个流畅的操作序列，过滤条件和计数操作在一个单一的、流畅的链中清晰地表达。此外，由于其声明性质，流通常会产生更容易阅读的代码。代码更注重需要完成什么，而不是如何完成。

相比之下，让我们探索 for 循环的语法和可读性。for 循环提供了一种更传统、更命令式的编码风格：

```java
List`````<String>````` fruits = Arrays.asList("apple", "banana", "orange", "grape");
long count = 0;
for (String fruit : fruits) {
    if (fruit.length() > 5) {
        count++;
    }
}
```

在这里，代码涉及显式的迭代和条件语句。虽然这种方法被大多数开发人员所理解，但有时它可能导致更冗长的代码，使其可能更难阅读，特别是对于复杂操作。

## 并行性和并发性

并行性和并发性是考虑 Java 中流和 for 循环时需要考虑的关键方面。这两种方法在利用多核处理器和管理并发操作时提供了不同的能力和挑战。

**流被设计为使并行处理更容易访问**。Java 8 引入了并行流的概念，它自动利用多核处理器来加速数据处理。我们可以轻松地将前面的基准测试重写为并发计算总和：

```java
@Benchmark
public int parallelStreamBenchMark(MyState state) {
    return state.numbers.parallelStream()
      .filter(number -> number % 2 == 0)
      .map(number -> number * number)
      .reduce(0, Integer::sum);
}
```

要并行化过程，只需要将 _stream()_ 替换为 _parallelStream()_ 方法。另一方面，将 for 循环重写为并行计算数字总和的过程更为复杂：

```java
@Benchmark
public int concurrentForLoopBenchmark(MyState state) throws InterruptedException, ExecutionException {
    int numThreads = Runtime.getRuntime().availableProcessors();
    ExecutorService executorService = Executors.newFixedThreadPool(numThreads);
    List<Callable`<Integer>`> tasks = new ArrayList<>();
    int chunkSize = state.numbers.size() / numThreads;

    for (int i = 0; i `< numThreads; i++) {
        final int start = i * chunkSize;
        final int end = (i == numThreads - 1) ? state.numbers.size() : (i + 1) * chunkSize;
        tasks.add(() ->` {
            int sum = 0;
            for (int j = start; j < end; j++) {
                int number = state.numbers.get(j);
                if (number % 2 == 0) {
                    sum = sum + (number * number);
                }
            }
            return sum;
        });
    }

    int totalSum = 0;
    for (Future`<Integer>` result : executorService.invokeAll(tasks)) {
        totalSum += result.get();
    }

    executorService.shutdown();
    return totalSum;
}
```

我们可以使用 Java 的并发实用工具，例如 _ExecutorService_，来并发执行任务。我们将列表分成块，并使用线程池并发处理它们。在决定使用流和 for 循环进行并行性和并发性时，我们应该考虑任务的复杂性。流为可以轻松并行化的任务提供了一种更直接的方式来启用并行处理。**另一方面，for 循环for 循环，通过手动并发控制，适用于需要自定义线程管理和协调的更复杂场景。**

## 可变性

现在，让我们探讨可变性的问题以及流和 for 循环在处理可变数据方面的不同。理解这些如何处理可变数据对于做出明智的选择至关重要。

**首先，我们需要认识到，流本质上促进了不可变性**。在流的上下文中，集合中的元素不是直接被修改的。相反，对流的操作会创建新的流或集合作为中间结果：

```java
List`````<String>````` fruits = new ArrayList<>(Arrays.asList("apple", "banana", "orange"));
List`````<String>````` upperCaseFruits = fruits.stream()
  .map(fruit -> fruit.toUpperCase())
  .collect(Collectors.toList());
```

在这个流操作中，原始列表保持不变。_map()_ 操作产生了一个新的流，其中每个水果都被转换为大写，而 _collect()_ 操作将这些转换后的元素收集到一个新的列表中。

相比之下，for 循环可以直接操作可变数据结构：

```java
List`````<String>````` fruits = new ArrayList<>(Arrays.asList("apple", "banana", "orange"));
for (int i = 0; i < fruits.size(); i++) {
    fruits.set(i, fruits.get(i).toUpperCase());
}
```

在这个 for 循环中，我们直接修改原始列表，将每个元素替换为其大写形式。这在需要就地修改现有数据时可能是有利的，但它也需要小心处理，以避免意外后果。

## 结论

流和循环都有其优点和缺点。流提供了一种更函数式和声明性的处理方法，增强了代码的可读性，并经常导致简洁而优雅的解决方案。另一方面，循环提供了一个熟悉且明确的控制结构，使它们适合于精确执行顺序或可变性控制至关重要的场景。

本文的所有源代码和所有代码片段都在 GitHub 上。

OK