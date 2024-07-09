---
date: 2022-04-01
category:
  - Java
  - Stream API
tag:
  - Stream.of()
  - IntStream.range()
head:
  - - meta
    - name: keywords
      content: Java, Stream API, Stream.of(), IntStream.range(), 懒加载, 急切模式
---
# Java 8 中 Stream.of() 与 IntStream.range() 的区别解析

## 1. 概述

Java 8 中引入的 Stream API 是一项重大新特性。

在本教程中，我们将讨论一个有趣的话题：Stream.of() 和 IntStream.range() 之间的区别。

## 2. 问题介绍

我们可以使用 Stream.of() 方法初始化一个 Stream 对象，例如 Stream.of(1, 2, 3, 4, 5)。或者，如果我们想要初始化一个整数 Stream，IntStream 是一个更直接使用的类型，例如 IntStream.range(1, 6)。然而，通过这两种方法创建的整数 Stream 的行为可能会有所不同。

像往常一样，我们将通过一个例子来理解问题。首先，让我们以不同的方式创建两个 Stream：

```java
Stream`````<Integer>````` normalStream = Stream.of(1, 2, 3, 4, 5);
IntStream intStreamByRange = IntStream.range(1, 6);
```

接下来，我们将对上述两个 Stream 执行相同的操作：

```java
STREAM.peek(添加到结果列表)
  .sorted()
  .findFirst();
```

我们将对每个 Stream 调用三种方法：

- 首先 - 调用 peek() 方法将处理过的元素收集到结果列表
- 然后 - 对元素进行排序
- 最后 - 从 Stream 中取出第一个元素

由于两个 Stream 包含相同的整数值，我们会认为执行后，两个结果列表也应该包含相同的整数。那么接下来，让我们编写一个测试来检查它是否产生了我们期望的结果：

```java
List`````<Integer>````` normalStreamPeekResult = new ArrayList<>();
List`````<Integer>````` intStreamPeekResult = new ArrayList<>();

// 首先是常规 Stream
normalStream.peek(normalStreamPeekResult::add)
  .sorted()
  .findFirst();
assertEquals(Arrays.asList(1, 2, 3, 4, 5), normalStreamPeekResult);

// 然后是 IntStream
intStreamByRange.peek(intStreamPeekResult::add)
  .sorted()
  .findFirst();
assertEquals(Arrays.asList(1), intStreamPeekResult);
```

执行后，结果表明由 normalStream.peek() 填充的结果列表包含了所有整数值。然而，由 intStreamByRange.peek() 填充的列表仅有一个元素。

接下来，让我们找出为什么会这样。

## 3. Streams 是懒加载的

在我们解释两个 Stream 在早期测试中为何产生了不同的结果列表之前，让我们理解 Java Streams 是按设计懒加载的。

“懒加载”意味着 Stream 只有在被告知要产生结果时才执行所需的操作。换句话说，**Stream 上的中间操作直到执行终端操作时才执行。**这种懒加载行为可以是一个优势，因为它允许更高效的处理并防止不必要的计算。

为了快速理解这种懒加载行为，让我们暂时去掉先前测试中的 sort() 方法调用，并重新运行它：

```java
List`````<Integer>````` normalStreamPeekResult = new ArrayList<>();
List`````<Integer>````` intStreamPeekResult = new ArrayList<>();

// 首先是常规 Stream
normalStream.peek(normalStreamPeekResult::add)
  .findFirst();
assertEquals(Arrays.asList(1), normalStreamPeekResult);

// 然后是 IntStream
intStreamByRange.peek(intStreamPeekResult::add)
  .findFirst();
assertEquals(Arrays.asList(1), intStreamPeekResult);
```

这次两个 Stream 都只填充了相应结果列表中的第一个元素。这是因为 **findFirst() 方法是终端操作，它只需要一个元素——第一个。**

现在我们理解了 Stream 是懒加载的，接下来，让我们找出当 sorted() 方法加入时，两个结果列表为何不同。

## 4. 调用 sorted() 可能会使 Stream 变为“急切”模式

首先，让我们看看由 Stream.of() 初始化的 Stream。终端操作 findFirst() 只需要 Stream 中的第一个整数。但 **这是在 sorted() 操作之后的第一个。**

我们知道我们必须遍历所有整数才能对它们进行排序。因此，调用 sorted() 使 Stream 变为“急切”模式。所以，**peek() 方法会被调用在每个元素上。**

另一方面，**IntStream.range() 返回一个顺序排序的 IntStream**。也就是说，IntStream 对象的输入已经是排序过的。此外，**当它对已经排序过的输入进行排序时，Java 应用优化使得 sorted() 操作成为无操作。**因此，结果列表中仍然只有一个元素。

接下来，让我们看一个基于 TreeSet 的 Stream 的另一个例子：

```java
List``<String>`` peekResult = new ArrayList<>();

TreeSet``<String>`` treeSet = new TreeSet<>(Arrays.asList("CCC", "BBB", "AAA", "DDD", "KKK"));

treeSet.stream()
  .peek(peekResult::add)
  .sorted()
  .findFirst();

assertEquals(Arrays.asList("AAA"), peekResult);
```

我们知道 TreeSet 是一个排序集合。因此，我们看到 peekResult 列表只包含一个字符串，尽管我们调用了 sorted()。

## 5. 结论

在本文中，我们以 Stream.of() 和 IntStream.range() 为例，理解了调用 sorted() 可能会使 Stream 从“懒加载”变为“急切”模式。

像往常一样，文章中展示的所有代码片段都可以在 GitHub 上找到。