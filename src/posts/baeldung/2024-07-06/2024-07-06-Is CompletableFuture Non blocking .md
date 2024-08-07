---
date: 2023-05-01
category:
  - Java
  - CompletableFuture
tag:
  - 非阻塞
  - 异步编程
head:
  - - meta
    - name: keywords
      content: CompletableFuture, 非阻塞, Java 8
---
# CompletableFuture 是非阻塞的吗？

CompletableFuture 是 Java 8 中引入的 Concurrent API 的一部分，它是一个强大的类，用于编写非阻塞代码。但是它真的是非阻塞的吗？在本教程中，我们将检查 CompletableFuture 何时是阻塞的，何时是非阻塞的。

CompletableFuture 类实现了 Future 接口，并且是 CompletionStage 接口的主要实现。因此，它提供了近 50 种不同的方法来创建和执行异步计算。

为什么我们需要 CompletableFuture？使用 Future 接口，我们只能通过调用 get() 方法来检索结果。然而，这个方法是一个阻塞操作。换句话说，它将阻塞当前线程，直到任务的结果可用。

如果我们需要对结果执行额外的操作，我们将最终得到阻塞操作。另一方面，由于 CompletionStage，CompletableFuture 提供了将多个计算链接在一起的能力，这些计算可以并发运行。这个功能允许我们创建一个任务链，当当前任务完成时，下一个任务被触发。

此外，我们可以指定在获取未来结果后不阻塞当前线程应该发生什么。CompletableFuture 类表示依赖过程中的一个阶段，其中一个阶段的完成触发另一个阶段，以及它的结果。

接下来，让我们理解阻塞和非阻塞处理之间的区别。

在阻塞操作中，调用线程等待另一个线程中的操作完成，然后继续执行：[图片链接]。在这里，任务按顺序执行。Thread 1 被 Thread 2 阻塞。换句话说，Thread 1 无法继续执行，直到 Thread 2 完成处理其任务。

我们可以将阻塞处理视为同步操作。然而，我们系统中的阻塞操作可能会引起性能问题，特别是在需要高可用性和可扩展性的应用程序中。

相比之下，非阻塞操作允许线程同时执行多个计算，而无需等待每个任务完成。当前线程可以在其他线程并行执行任务时继续执行：[图片链接]。在上面的例子中，Thread 2 并没有阻塞 Thread 1 的执行。此外，两个线程都在并发运行他们的任务。

除了提高性能外，我们还可以在非阻塞操作完成后决定如何处理结果。

使用 CompletableFuture 的主要优点是它能够将多个任务链接在一起，这些任务将在不阻塞当前线程的情况下执行。因此，我们可以说 CompletableFuture 是非阻塞的。

此外，它提供了几种方法，允许我们以非阻塞的方式执行任务，包括：
- supplyAsync()：异步执行任务并返回表示结果的 CompletableFuture
- thenApply()：将函数应用于前一个任务的结果，并返回表示转换结果的 CompletableFuture
- thenCompose()：执行一个返回 CompletableFuture 的任务，并返回表示嵌套任务结果的 CompletableFuture
- allOf()：并行执行多个任务，并返回表示所有任务完成的 CompletableFuture

让我们来看一个简单的例子。例如，假设我们有两个我们希望以非阻塞方式执行的任务：

```java
CompletableFuture.supplyAsync(() -> "Baeldung")
  .thenApply(String::length)
  .thenAccept(s -> logger.info(String.valueOf(s)));
```

任务完成后，它将在标准输出上打印数字 8。

计算在后台运行并返回一个未来。如果我们有多个依赖操作，每个操作都由阶段表示。一个阶段完成后，它会触发其他依赖阶段的计算。

尽管 CompletableFuture 用于执行非阻塞操作，但在某些情况下，它仍然可能阻塞当前线程。

在异步通信中，我们通常有一个回调机制来检索计算的结果。然而，CompletableFuture 并不会在其完成后通知我们。

如果需要，我们可以使用 get() 方法在调用线程中检索结果。

然而，我们需要意识到 get() 方法使用阻塞处理返回结果。如果需要，它会等待计算完成然后返回结果。

因此，我们将阻塞当前线程，直到未来完成：

```java
CompletableFuture``<String>`` completableFuture = CompletableFuture
  .supplyAsync(() -> "Baeldung")
  .thenApply(String::toUpperCase);

assertEquals("BAELDUNG", completableFuture.get());
```

类似地，调用 join() 方法也会阻塞当前线程：

```java
CompletableFuture``<String>`` completableFuture = CompletableFuture
  .supplyAsync(() -> "Blocking")
  .thenApply(s -> s + " Operation")
  .thenApply(String::toLowerCase);

assertEquals("blocking operation", completableFuture.join());
```

这两种方法之间的主要区别在于，如果未来异常完成，join() 方法不会抛出检查异常。

此外，我们可以调用 isDone() 方法来检查未来是否在获取结果之前完成。

然而，当有必要在调用线程中获取计算结果时，我们可以创建 CompletableFuture，在当前线程中做其他工作，然后调用 get() 或 join() 方法。通过给它更多的时间，Future 更有可能在我们获取结果之前完成计算。但仍然没有保证检索不会最终阻塞线程。

在本文中，我们检查了 CompletableFuture 何时是非阻塞的，何时不是。

总之，CompletableFuture 大多数时候是非阻塞的。然而，如果我们调用 get() 或 join() 方法来检索结果，它们将阻塞当前线程。

如常，全部源代码可在 GitHub 上获得。