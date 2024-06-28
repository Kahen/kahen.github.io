---
date: 2022-04-01
category:
  - Java
  - Stream API
tag:
  - Java
  - Stream
  - N-th Element
head:
  - - meta
    - name: keywords
      content: Java, Stream API, N-th Element, Infinite Streams, Finite Streams
------
# Java中从有限和无限流中获取每N个元素的方法

## 1. 概述

Java Stream API提供了多种操作方法来处理元素序列。然而，如果我们只想处理流的一部分，例如每N个元素，这就不容易了。**这在我们处理代表CSV文件或数据库表的原始数据流，并且只想处理特定列时可能会很有用。**

**我们将处理两种类型的流：有限的和无限的。**第一种情况可以通过将Stream转换为List来解决，这允许索引访问。另一方面，无限流将需要一种不同的方法。在本教程中，我们将学习如何使用各种技术来解决这个挑战。

## 2. 测试设置

我们将使用参数化测试来检查我们解决方案的正确性。将有几个案例，分别对应N-th元素和预期结果：

```java
Arguments.of(
  Stream.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
  List.of("Wednesday", "Saturday"), 3),
Arguments.of(
  Stream.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
  List.of("Friday"), 5),
Arguments.of(
  Stream.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
  List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"), 1)
```

现在，我们可以深入不同的方法来处理流中的第N个元素。

## 3. 使用 _filter(Predicate)_

在第一种方法中，我们可以创建一个单独的流，其中只包含我们想要处理的元素的索引。我们以使用 _filter(Predicate)_ 来创建这样一个数组：

```java
void givenListSkipNthElementInListWithFilterTestShouldFilterNthElement(Stream`````````````````````````<String>````````````````````````` input, List`````````````````````````<String>````````````````````````` expected, int n) {
    final List`````````````````````````<String>````````````````````````` sourceList = input.collect(Collectors.toList());
    final List`````````````````````````<String>````````````````````````` actual = IntStream.range(0, sourceList.size())
      .filter(s -> (s + 1) % n == 0)
      .mapToObj(sourceList::get)
      .collect(Collectors.toList());
    assertEquals(expected, actual);
}
```

如果我们想要操作允许索引访问的数据结构，例如_List_，这种方法将有效。所需的元素可以收集到一个新的_List_或使用_forEach(Consumer)_进行处理。

## 4. 使用 _iterate()_

这种方法与前一种类似，需要一个具有索引访问的数据结构。然而，我们不是过滤掉我们不需要的索引，而是在开始时只生成我们想要使用的索引：

```java
void givenListSkipNthElementInListWithIterateTestShouldFilterNthElement(Stream`````````````````````````<String>````````````````````````` input, List`````````````````````````<String>````````````````````````` expected, int n) {
    final List`````````````````````````<String>````````````````````````` sourceList = input.collect(Collectors.toList());
    int limit = sourceList.size() / n;
    final List`````````````````````````<String>````````````````````````` actual = IntStream.iterate(n - 1, i -> (i + n))
      .limit(limit)
      .mapToObj(sourceList::get)
      .collect(Collectors.toList());
    assertEquals(expected, actual);
}
```

在这种情况下，我们使用_IntStream.iterate(int, IntUnaryOperator)_，它允许我们创建一个步长为_n_的整数序列。

## 5. 使用 _subList()_

这种方法使用_Stream.iterate_，类似于前一种，但它创建了一个_List_的流，每个_List_都从_nk-th_索引开始：

```java
void givenListSkipNthElementInListWithSublistTestShouldFilterNthElement(Stream`````````````````````````<String>````````````````````````` input, List`````````````````````````<String>````````````````````````` expected, int n) {
    final List`````````````````````````<String>````````````````````````` sourceList = input.collect(Collectors.toList());
    int limit = sourceList.size() / n;
    final List`````````````````````````<String>````````````````````````` actual = Stream.iterate(sourceList, s -> s.subList(n, s.size()))
      .limit(limit)
      .map(s -> s.get(n - 1))
      .collect(Collectors.toList());
    assertEquals(expected, actual);
}
```

我们应该取每个这些_Lists_的第一个元素来获得所需的结果。

## 6. 使用自定义 _Collector_

作为一个更高级和透明的解决方案，我们可以实现一个自定义_Collector_，它只收集所需的元素：

```java
class SkippingCollector {
    private static final BinaryOperator`<SkippingCollector>` IGNORE_COMBINE = (a, b) -> a;
    private final int skip;
    private final List`````````````````````````<String>````````````````````````` list = new ArrayList<>();
    private int currentIndex = 0;
    private SkippingCollector(int skip) {
        this.skip = skip;
    }

    private void accept(String item) {
        int index = ++currentIndex % skip;
        if (index == 0) {
            list.add(item);
        }
    }
    private List`````````````````````````<String>````````````````````````` getResult() {
        return list;
    }

    public static Collector<String, SkippingCollector, List`````````````````````````<String>`````````````````````````> collector(int skip) {
        return Collector.of(() -> new SkippingCollector(skip),
          SkippingCollector::accept,
          IGNORE_COMBINE,
          SkippingCollector::getResult);
    }
}
```

这种方法更复杂，需要一些编码。**同时，这个解决方案不允许并行化，并且在技术上甚至可能在顺序流上失败，因为组合是一个实现细节，可能会在未来的版本中改变：**

```java
public static List`````````````````````````<String>````````````````````````` skipNthElementInStreamWithCollector(Stream`````````````````````````<String>````````````````````````` sourceStream, int n) {
    return sourceStream.collect(SkippingCollector.collector(n));
}
```

然而，可以使用_Spliterators_使这种方法适用于并行流，但这应该有一个很好的理由。

## 7. 简单循环

所有前面的解决方案都是可行的，但总的来说，它们过于复杂，而且常常误导。**通常，解决问题的最佳方式是尽可能简单的实现。**这是我们如何使用_for_循环实现相同目标的方法：

```java
void givenListSkipNthElementInListWithForTestShouldFilterNthElement(Stream`````````````````````````<String>````````````````````````` input, List`````````````````````````<String>````````````````````````` expected, int n) {
    final List`````````````````````````<String>````````````````````````` sourceList = input.collect(Collectors.toList());
    List`````````````````````````<String>````````````````````````` result = new ArrayList<>();
    for (int i = n - 1; i < sourceList.size(); i += n) {
        result.add(sourceList.get(i));
    }
    final List`````````````````````````<String>````````````````````````` actual = result;
    assertEquals(expected, actual);
}
```

然而，有时我们需要直接使用_Stream_，这不允许我们直接通过索引访问元素。在这种情况下，我们可以使用带有_while_循环的_Iterator_：

```java
void givenListSkipNthElementInStreamWithIteratorTestShouldFilterNthElement(Stream`````````````````````````<String>````````````````````````` input, List`````````````````````````<String>````````````````````````` expected, int n) {
    List`````````````````````````<String>````````````````````````` result = new ArrayList<>();
    final Iterator`````````````````````````<String>````````````````````````` iterator = input.iterator();
    int count = 0;
    while (iterator.hasNext()) {
        if (count % n == n - 1) {
            result.add(iterator.next());
        } else {
            iterator.next();
        }
        ++count;
    }
    final List`````````````````````````<String>````````````````````````` actual = result;
    assertEquals(expected, actual);
}
```

这些解决方案更清洁、更直接易懂，同时解决了相同的问题。

## 8. 结论

Java Stream API是一个强大的工具，它有助于使代码更加声明性和可读。此外，通过利用参数化，流可以实现更好的性能。然而，想要在任何地方都使用流可能不是使用这个API的最佳方式。

虽然在流不完全适用的情况下应用流操作的精神体操可能很有趣，但这也可能导致“聪明代码”。**通常，像循环这样的最简单结构，可以用更少的代码实现相同的结果，并且代码更易于理解。**

如常，本文中使用的所有代码都可以在GitHub上找到。