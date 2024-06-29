---
date: 2022-04-01
category:
  - Java
  - Stream API
tag:
  - Java 8
  - Stream
  - 分区
head:
  - - meta
    - name: keywords
      content: Java 8, Stream API, 分区, 并行流, Guava
---

# Java 8 中的 Stream 分区技术

在本教程中，我们将探索基于固定最大大小对 Java 8 的 Stream 进行分区的各种技术。

我们将首先重新审视如何使用 List 来完成这项工作。随后，我们将通过引入 Stream 特有的功能，如延迟评估和线程安全性，来增强我们的方法。

## 2. List 的分区

在 Java 中，有多种分区 List 的方法。一种简单的方法是首先根据所需的批量大小和源列表的大小来确定所需的批次数量：

```java
static ```````````<T>``````````` Stream<List```````````<T>```````````> partitionList(List```````````<T>``````````` source, int batchSize) {
    int nrOfFullBatches = (source.size() - 1) / batchSize;
    // ...
}
```

为了将源列表划分为更小的子列表，我们的第一步是计算划分每个批次的起始和结束点的索引。在执行此计算时，我们应该记住最后一个批次的大小可能与其他批次不同：

```java
int startIndex = batch * batchSize;
int endIndex = (batch == nrOfFullBatches) ? source.size() : (batch + 1) * batchSize;
```

最后，我们可以添加一些验证，并涵盖所有边缘情况。例如，当源列表为空或者 batchSize 是一个负数时：

```java
static ```````````<T>``````````` Stream<List```````````<T>```````````> partitionList(List```````````<T>``````````` source, int batchSize) {
    if (batchSize `<= 0) {
        throw new IllegalArgumentException(String.format("The batchSize cannot be smaller than 0. Actual value: %s", batchSize));
    }
    if (source.isEmpty()) {
        return Stream.empty();
    }
    int nrOfFullBatches = (source.size() - 1) / batchSize;
    return IntStream.rangeClosed(0, nrOfFullBatches)
      .mapToObj(batch ->` {
          int startIndex = batch * batchSize;
          int endIndex = (batch == nrOfFullBatches) ? source.size() : (batch + 1) * batchSize;
          return source.subList(startIndex, endIndex);
      });
}
```

最后，让我们测试一下解决方案。对于一个包含从 1 到 8 的数字的输入列表和批量大小为 3，我们将期望得到三个子列表：

```java
@Test
void whenPartitionList_thenReturnThreeSubLists() {
    List```<Integer>``` source = List.of(1, 2, 3, 4, 5, 6, 7, 8);

    Stream<List```<Integer>```> result = partitionList(source, 3);

    assertThat(result).containsExactlyInAnyOrder(
      List.of(1, 2, 3),
      List.of(4, 5, 6),
      List.of(7, 8)
    );
}
```

## 3. 并行 Stream 的分区

Streams 具有独特的特性，如延迟评估和并行处理的能力。通过创建自定义的 Collector，我们可以利用这些特性。

此外，鉴于期望的返回类型是子列表的列表，我们还将使用已经由 Collectors.toList() 定义的某些函数，我们将称之为下游收集器：

```java
static ```````````<T>``````````` List<List```````````<T>```````````> partitionStream(Stream```````````<T>``````````` source, int batchSize) {
    return source.collect(partitionBySize(batchSize, Collectors.toList()));
}

static ```<T, A, R>``` Collector```<T, ?, R>``` partitionBySize(int batchSize, Collector<List```````````<T>```````````, A, R> downstream) {
    return Collector.of( ... );
}
```

我们可以使用静态工厂方法 Collector.of() 来创建一个 Collector。让我们查阅文档，看看每个参数代表什么：

- supplier – 新收集器的供应器函数
- accumulator – 新收集器的累加器函数
- combiner – 新收集器的合并器函数
- finisher – 新收集器的完成器函数
- characteristics – 新收集器的特性

现在，让我们系统地逐一了解它们的功能。

### 3.1. The Supplier

我们将使用一个临时对象来累积数据并将其分割成批次。这个累加器通常被隐藏为实现细节。

在收集操作完成后，我们将调用完成器函数，该函数将累加器转换为收集器返回的最终结果。工厂方法 Collector.of() 的第一个参数将是一个函数，它提供了我们自定义累加器的实例。

这个临时累加器封装了一个值列表和固定的批量大小。此外，它还提供了调用者指定一个监听器的灵活性，当批次达到容量时，该监听器会被通知。它还包括一个通用字段，以适应下游收集器：

```java
static class Accumulator````<T, A>```` {
    private final List```````````<T>``````````` values = new ArrayList<>();
    private final int batchSize;
    private A downstreamAccumulator;
    private final BiConsumer<A, List```````````<T>```````````> batchFullListener;

    // constructor
}
```

不用说，累加器完全封装。因此，我们将创建它作为一个静态内部类，并倾向于使用包保护的访问修饰符。

现在，让我们编写一个接受新值的方法。在将其添加到列表后，如果列表的大小达到 batchSize，我们将通知监听器，然后清除值：

```java
void add(T value) {
    values.add(value);
    if (values.size() == batchSize) {
        batchFullListener.accept(downstreamAccumulator, new ArrayList<>(values));
        values.clear();
    }
}
```

让我们创建一个 Supplier 来实例化这个 Accumulator。当一个批次已满时，我们将委托给下游累加器，在我们的情况下，是来自 Collectors.toList() 的那个：

```java
(acc, values) -> downstream.accumulator().accept(acc, values)
```

最后，我们可以使用方法引用重写这个 BiConsumer 并创建我们的 Supplier：

```java
Supplier`<Accumulator>` supplier = () -> new Accumulator<>(
    batchSize,
    downstream.supplier().get(),
    downstream.accumulator()::accept
);
```

### 3.2. The Accumulator

创建自定义 Collector 的第二个参数将是一个接受 Accumulator 和新值的 BiConsumer。在我们的情况下，我们将简单地委托给 Accumulator 并允许它将值添加到当前批次：

```java
BiConsumer<Accumulator````<T, A>````, T> accumulator = (acc, value) -> acc.add(value);
```

### 3.3. The Combiner

合并器是一个接受两个 Accumulator 并提供将它们合并在一起的方式的函数。首先，我们需要使用下游的合并器合并它们的 downstreamAccumulator。之后，我们可以流式传输一个累加器累积的所有值，并将它们添加到另一个累加器中：

```java
BinaryOperator<Accumulator````<T, A>````> combiner = (acc1, acc2) -> {
    acc1.downstreamAccumulator = downstream.combiner()
      .apply(acc1.downstreamAccumulator, acc2.downstreamAccumulator);
    acc2.values.forEach(acc1::add);
    return acc1;
};
```

让我们重构代码，并将此逻辑封装在 Accumulator 类本身中：

```java
static class Accumulator````<T, A>```` {
    // ...

    Accumulator````<T, A>```` combine(Accumulator````<T, A>```` other, BinaryOperator`<A>` accumulatorCombiner) {
        this.downstreamAccumulator = accumulatorCombiner.apply(downstreamAccumulator, other.downstreamAccumulator);
        other.values.forEach(this::add);
        return this;
    }
}
```

这简化了我们的合并器为一行代码：

```java
BinaryOperator<Accumulator````<T, A>````> combiner = (acc1, acc2) -> acc1.combine(acc2, downstream.combiner());
```

### 3.4. The Finisher

正如前面提到的，我们必须建立一种将这个自定义 Accumulator 转换为最终结果的方法：List of List。这是我们可以依靠下游收集器将所有批次聚合到单个列表中的另一个地方。

此外，如果累加器不为空，表明存在来自最后一个不完整批次的值，我们需要确保在调用下游完成器之前将这些值合并：

```java
Function<Accumulator````<T, A>````, R> finisher = acc -> {
    if (!acc.values.isEmpty()) {
        downstream.accumulator().accept(acc.downstreamAccumulator, acc.values);
    }
    return downstream.finisher().apply(acc.downstreamAccumulator);
};
```

### 3.5. The Collector Characteristics

我们的收集器旨在是线程安全的，并且适用于与并行流一起使用。这意味着最终的归约过程是跨多个线程并发进行的。这种并行处理的一个自然后果是无法保证元素的顺序。

Collector Characteristics 可以用来优化归约实现。基于我们已经概述的考虑，我们将配置特性参数以使用 Collector.Characteristics.UNORDERED：

```java
static ```<T, A, R>``` Collector```<T, ?, R>``` partitionBySize(int batchSize, Collector<List```````````<T>```````````, A, R> downstream) {
    // ...
    return Collector.of(
      supplier,
      accumulator,
      combiner,
      finisher,
      Collector.Characteristics.UNORDERED
    );
}
```

### 3.6. The Full Solution

现在我们已经了解了收集器创建中使用的每个函数所扮演的角色。让我们在进行测试之前重新审视整个方法：

```java
static ```````````<T>``````````` List<List```````````<T>```````````> partitionStream(Stream```````````<T>``````````` source, int batchSize) {
    return source.collect(partitionBySize(batchSize, Collectors.toList()));
}

static ```<T, A, R>``` Collector```<T, ?, R>``` partitionBySize(int batchSize, Collector<List```````````<T>```````````, A, R> downstream) {
    Supplier<Accumulator````<T, A>````> supplier = () -> new Accumulator<>(
      batchSize,
      downstream.supplier().get(),
      downstream.accumulator()::accept
    );

    BiConsumer<Accumulator````<T, A>````, T> accumulator = (acc, value) -> acc.add(value);

    BinaryOperator<Accumulator````<T, A>````> combiner = (acc1, acc2) -> acc1.combine(acc2, downstream.combiner());

    Function<Accumulator````<T, A>````, R> finisher = acc -> {
        if (!acc.values.isEmpty()) {
            downstream.accumulator().accept(acc.downstreamAccumulator, acc.values);
        }
        return downstream.finisher().apply(acc.downstreamAccumulator);
    };

    return Collector.of(supplier, accumulator, combiner, finisher, Collector.Characteristics.UNORDERED);
}
```

**在测试期间，我们将无法再断言每个批次内的值。因此，我们的断言将仅关注验证批次的计数和大小。** 例如，使用批量大小为 3 对包含 1 到 8 之间整数的并行流进行分区时，我们将生成两个完整的批次，每个批次包含三个元素，以及一个包含两个元素的批次：

```java
@Test
void whenPartitionStream_thenReturnThreeSubLists() {
    Stream```<Integer>``` source = Stream.of(1, 2, 3, 4, 5, 6, 7, 8).parallel();

    List<List```<Integer>```> result = partitionStream(source, 3);

    assertThat(result)
      .hasSize(3)
      .satisfies(batch -> assertThat(batch).hasSize(3), atIndex(0))
      .satisfies(batch -> assertThat(batch).hasSize(3), atIndex(1))
      .satisfies(batch -> assertThat(batch).hasSize(2), atIndex(2));
}
```

## 4. 使用 Guava 进行 Stream 分区

**为了避免潜在的错误，我们可以选择使用经过验证的第三方库** 而不是从头开始构建线程安全的 Collector。例如，Google 的 Guava 提供了一个优雅且简洁的方法，将 Stream 分区为包含相同数据类型 List 的 Iterable。

首先，让我们将依赖项添加到我们的 pom.xml 中：

```xml
`<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`33.0.0-jre`</version>`
`</dependency>`
```

现在，我们可以简单地使用静态方法 Iterables.partition()。这个函数接受一个 Iterable 和所需的批量大小作为其参数：

```java
static ```````````<T>``````````` Iterable<List```````````<T>```````````> partitionUsingGuava(Stream```````````<T>``````````` source, int batchSize) {
    return Iterables.partition(source::iterator, batchSize);
}
```

我们测试方法的唯一区别在于更改了返回类型，现在是 Iterable。为了断言批次大小，我们将 Iterable 的所有元素收集到一个 ArrayList 中。除此之外，测试过程保持不变：

```java
@Test
void whenPartitionParallelStreamWithGuava_thenReturnThreeSubLists() {
    Stream```<Integer>``` source = Stream.of(1, 2, 3, 4, 5, 6, 7, 8).parallel();

    Iterable<List```<Integer>```> result = partitionUsingGuava(source, 3);

    assertThat(result)
      .map(ArrayList::new)
      .hasSize(3)
      .satisfies(batch -> assertThat(batch).asList().hasSize(3), atIndex(0))
      .satisfies(batch -> assertThat(batch).asList().hasSize(3), atIndex(1))
      .satisfies(batch -> assertThat(batch).asList().hasSize(2), atIndex(2));
}
```

## 5. 结论

在本文中，我们探索了在 Java 中分区 Stream 的多种方式。我们首先回顾了如何将 List 分割成较小的子列表。之后，我们讨论了 Stream 和并行 Stream 的优势，并为它们创建了自己的自定义 Collector。

最后，我们进入了 Guava 的 API，它使我们能够使用静态方法 Iterables.partition() 轻松实现相同的功能。

如往常一样，示例的完整源代码可在 GitHub 上获得。

[![Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)](https://www.baeldung.com)
[![Gravatar Image](https://secure.gravatar.com/avatar/475d4408e78071b2289e763a5887e617?s=50&r=g)](https://www.baeldung.com/)
[![Eric Martin](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)](https://www.baeldung.com/author/eric-martin)
[![Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)](https://www.baeldung.com/)
[![REST API Post Footer](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)](https://www.baeldung.com/)
[![REST API Footer Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)](https://www.baeldung.com/)

OK