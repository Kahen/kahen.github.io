---
date: 2022-04-01
category:
  - Java
  - Stream API
tag:
  - Java 8
  - Stream
  - Empty Stream
head:
  - - meta
    - name: keywords
      content: Java Stream API, Empty Stream, Java 8
---

# Java中处理空流的指南

## 1. 概述

在这篇简短的教程中，我们将快速了解Java流（Stream）中的中间操作和终端操作，创建空流（Empty Stream）的一些方法，以及如何检查流是否为空。

## 2. 流和流操作

流（Stream）API是Java 8的一个主要特性。流是我们可以迭代并执行操作的元素序列。

**流操作特别分为两种类型——中间操作和终端操作。** 中间操作和终端操作可以连接在一起形成流管道。

顾名思义，终端操作出现在流管道的末端，并返回一个结果，如`distinct()`或创建一个副作用，如`forEach()`。

另一方面，中间操作，如`sorted()`，将流转换为另一个流。因此，我们可以链接多个中间操作。

**任何终端或中间操作实际上都不会改变流的源，而是产生一个结果。** 另外，中间操作以延迟方式执行；只有在启动终端操作后才执行计算。

让我们看一个例子：

```java
Stream``````<Integer>`````` numbers = Stream.of(1, 2, 3, 4, 5, 6);

int sumOfEvenNumbers = numbers
  .filter(number -> number % 2 == 0)
  .reduce(0, Integer::sum);

Assert.assertEquals(sumOfEvenNumbers, 12);
```

在这里，我们创建了一个整数流。我们使用了中间操作`filter()`来创建另一个偶数流。最后，我们使用了终端操作`reduce()`来获取所有偶数的总和。

## 3. 在Java中创建空流

有时，我们可能需要将流作为参数传递给方法或从方法返回。**空流对于处理`NullPointerException`很有用。** 此外，一些流操作，如`findFirst()`、`findAny()`、`min()`和`max()`，会检查流是否为空，并相应地返回结果。

有多种创建流的方法。因此，也有多种创建空流的方法。

首先，**我们可以使用类`Stream`的`empty()`方法**：

```java
Stream```<String>``` emptyStream = Stream.empty();
```

`empty()`方法返回一个空的顺序流（sequential Stream）的`String`类型。

**我们还可以使用`of()`方法创建任何类型的空流**。`of()`方法返回一个包含作为参数传递给它的元素的顺序有序流。如果我们不传递任何参数，它将返回一个空流：

```java
Stream```<String>``` emptyStr = Stream.of();
```

同样，我们可以使用`IntStream`来创建原始类型的流：

```java
IntStream intStream = IntStream.of(new int[]{});
```

`Arrays`类有一个`stream()`方法，它接受一个数组作为参数，并返回与参数类型相同的流。我们可以通过传递一个空数组作为参数来创建一个空流：

```java
IntStream emptyIntStream = Arrays.stream(new int[]{});
```

最后，我们可以使用`Collection`（例如`List`或`Set`）的`stream()`方法来创建一个空流。一个空集合将创建一个空流：

```java
Stream``````<Integer>`````` emptyIntStream = new ArrayList``````<Integer>``````().stream();
```

## 4. 检查空流

**我们可以通过简单地使用一个短路终端操作，如`findFirst()`或`findAny()`来检查空流**：

```java
Stream```<String>``` emptyStream = Stream.empty();
assertTrue(emptyStream.findAny().isEmpty());
```

在这里，`findFirst()`如果流为空，则返回一个空的`Optional`。然后我们检查`Optional`中是否存在值。由于流是空的，`Optional`中没有值，它返回`false`。

然而，**我们必须记住，我们只能对流操作一次。如果我们重复使用流，我们可能会遇到一个`IllegalStateException`**，它说：

```java
IllegalStateException: stream has already been operated upon or closed.
```

因此，**我们只允许对消耗流的单个操作。** 如果我们想重复使用流，我们必须处理这个`IllegalStateException`。

为了解决这个问题，我们可以在每次需要检查其空状态时，使用`Supplier`函数接口创建一个新的流：

```java
Supplier<Stream``````<Integer>``````> streamSupplier = Stream::of;

Optional``````<Integer>`````` result1 = streamSupplier.get().findAny();
assertTrue(result1.isEmpty());
Optional``````<Integer>`````` result2 = streamSupplier.get().findFirst();
assertTrue(result2.isEmpty());
```

在这里，我们首先定义了一个空流。然后我们创建了一个类型为`Stream``````<Integer>```````的`streamSupplier`对象。每次调用`get()`方法都会返回一个新的空流对象，我们可以安全地在其上执行另一个流操作。

## 5. 结论

在这篇快速文章中，我们看到了在Java中创建空流的一些方法。我们还探讨了如何检查流是否为空，以及如何在避免抛出当流已经关闭或操作过著名`IllegalStateException`的同时，多次重用流。

一如既往，伴随文章的源代码可以在GitHub上找到。

OK