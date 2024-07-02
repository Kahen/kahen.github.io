---
date: 2022-04-01
category:
  - Java
  - CompletableFuture
tag:
  - CompletableFuture
  - Java 8
  - 并发编程
head:
  - - meta
    - name: keywords
      content: CompletableFuture, Java 8, 并发编程, 非阻塞
---
# CompletableFuture allOf().join() 与 CompletableFuture.join() 比较

在本文中，我们将探讨CompletableFuture的allOf()方法的细节，并理解使用它与在多个独立的CompletableFuture实例上调用join()的区别。我们将发现allOf()使我们能够在确保原子性的同时，以非阻塞的方式继续我们的流程。

CompletableFuture是Java 8中引入的一个强大特性，它促进了非阻塞代码的创建。在本文中，我们将重点介绍两种方法，它们使并行代码执行成为可能：join()和allOf()。

让我们首先分析这两种方法的内部工作机制。之后，我们将深入了解它们实现共同目标的不同方法，即并行执行代码，然后合并结果。对于本文的代码片段，我们将使用两个辅助函数，这些函数会阻塞线程一段时间，然后返回一些数据或抛出异常：

```
private CompletableFuture waitAndReturn(long millis, String value) {
    return CompletableFuture.supplyAsync(() -> {
        try {
            Thread.sleep(millis);
            return value;
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    });
}

private CompletableFuture waitAndThrow(long millis) {
    return CompletableFuture.supplyAsync(() -> {
        try {
            Thread.sleep(millis);
        } finally {
            throw new RuntimeException();
        }
    });
}
```

### 2.1. join()

CompletableFuture API公开了join()方法，作为检索Future对象值的一种方式，通过阻塞线程直到执行完成。我们应该注意到，即使CompletableFuture的执行发生在不同的线程上，调用线程也会被阻塞：

```
CompletableFuture```````````<String>``````````` future = waitAndReturn(1_000, "Harry");
assertEquals("Harry", future.join());
```

此外，如果CompletableFuture以错误完成，join()将抛出它作为一个RuntimeException：

```
CompletableFuture```````````<String>``````````` futureError = waitAndThrow(1_000);
assertThrows(RuntimeException.class, futureError::join);
```

### 2.2. allOf()

静态方法allOf()允许我们组合多个CompletableFuture实例，并返回CompletableFuture````<Void>````。结果对象的完成取决于所有后续Futures的完成。此外，如果任何后续Futures异常完成，整体结果也将被视为失败。重要的是要理解allOf()不是一个阻塞方法，这意味着它将立即执行：

```
CompletableFuture```````````<String>``````````` f1 = waitAndReturn(1_000, "Harry");
CompletableFuture```````````<String>``````````` f2 = waitAndReturn(2_000, "Ron");

CompletableFuture````<Void>```` combinedFutures = CompletableFuture.allOf(f1, f2);
```

然而，为了提取值，我们需要调用API的其他方法。例如，如果我们在生成的CompletableFuture````<Void>````上调用join()，线程将等待两个组成的CompletableFuture对象完成——每个都在自己的线程中。换句话说，调用线程将被阻塞，直到最长的Future完成所需的时间：

```
combinedFutures.join();
```

由于主线程已经等待了两秒钟，f1和f2现在已经完成，随后的调用如join()或get()将立即执行：

```
assertEquals("Harry", f1.join());
assertEquals("Ron", f2.join());
```

### 2.3. 并行执行代码

正如我们从前面的例子中注意到的，我们可以通过在每个CompletableFuture上调用join()来并行执行CompletableFutures并简单地合并结果：

```
CompletableFuture```````````<String>``````````` f1 = waitAndReturn(1_000, "Harry");
CompletableFuture```````````<String>``````````` f2 = waitAndReturn(2_000, "Ron");

sayHello(f1.join());
sayHello(f2.join());
```

或者通过迭代CompletableFutures的Collection或Stream，对它们每个调用join()，并使用它们的结果：

```
Stream.of(f1, f2).map(CompletableFuture::join).forEach(this::sayHello);
```

手头的问题是，在迭代和连接所有CompletableFutures之前使用静态allOf()方法是否会对最终结果产生任何影响：

```
CompletableFuture.allOf(f1, f2).join();
Stream.of(f1, f2).map(CompletableFuture::join).forEach(this::sayHello);
```

这两种方法之间有两个显著的区别：错误处理和以非阻塞方式继续的能力。让我们深入研究它们，并理解它们的特殊性。

## 3. 错误处理

这两种方法之间的一个主要区别是，如果我们省略调用allOf，我们将顺序处理CompletableFutures的结果。因此，我们最终可能会部分处理值。

换句话说，如果其中一个CompletableFuture抛出异常，它将打破链并停止处理。在某些情况下，这可能会导致错误，因为前面的元素已经被处理了：

```
CompletableFuture```````````<String>``````````` f1 = waitAndReturn(1_000, "Harry");
CompletableFuture```````````<String>``````````` f2 = waitAndThrow(1_000);
CompletableFuture```````````<String>``````````` f3 = waitAndReturn(1_000, "Ron");

Stream.of(f1, f2, f3)
  .map(CompletableFuture::join)
  .forEach(this::sayHello);
```

另一方面，我们可以使用allOf()组合这三个实例，然后调用join()方法以实现某种原子性。通过这样做，我们要么一次性处理所有元素，要么一个也不处理：

```
CompletableFuture.allOf(f1, f2, f3).join();
Stream.of(f1, f2, f3)
  .map(CompletableFuture::join)
  .forEach(this::sayHello);
```

## 4. 非阻塞代码

allOf()的一个优点是它允许我们以非阻塞的方式继续我们的流程。由于返回类型是CompletableFuture````<Void>````，我们可以使用thenAccept()在数据到达时处理数据，而不会阻塞线程：

```
CompletableFuture.allOf(f1, f2, f3)
  .thenAccept(__ -> sayHelloToAll(f1.join(), f2.join(), f3.join()));
```

同样，如果我们需要合并来自不同Futures的数据，我们可以使用thenApply()方法。例如，我们可以连接三个futures的值，并继续使用生成的String进行非阻塞流程：

```
CompletableFuture```````````<String>``````````` names = CompletableFuture.allOf(f1, f2, f3)
  .thenApply(__ -> f1.join() + "," + f2.join() + "," + f3.join());
```

此外，如果我们不离开异步世界并继续CompletableFuture链，我们将能够利用其自身的错误处理和恢复机制，即exceptionally()方法。例如，如果其中一个CompletableFuture以异常完成，我们可以简单地记录它并继续使用默认值进行流程：

```
CompletableFuture```````````<String>``````````` names = CompletableFuture.allOf(f1, f2, f3)
  .thenApply(__ -> f1.join() + "," + f2.join() + "," + f3.join())
  .exceptionally(err -> {
      System.out.println("oops, there was a problem! " + err.getMessage());
      return "names not found!";
  });
```

## 5. 结论

在本文中，我们学习了如何使用CompletableFuture的join()进行并行代码执行，同时无缝地合并结果。我们还揭示了allOf()的优势。join()允许我们原子性地处理数据。换句话说，只有当所有构成的CompletableFuture对象都成功完成时，流程才会继续。

最后，我们发现我们可以使用allOf()并省略调用join()。这将允许我们在继续非阻塞流程的同时使用多个CompletableFuture的结果。我们通过API的其他有用方法，如thenApply()，theAccept()和exceptionally()来实现这一点。

如往常一样，我们可以在GitHub上找到工作的代码示例。翻译已经完成，以下是剩余部分的翻译：

## 5. 结论

在本文中，我们学习了如何使用CompletableFuture的join()方法来并行执行代码，同时无缝地合并结果。我们还揭示了allOf()的优势。使用join()，我们可以在所有构成的CompletableFuture对象成功完成后继续执行流程，从而实现原子性处理。

最后，我们发现，我们可以使用allOf()并省略调用join()，这将允许我们在继续非阻塞流程的同时使用多个CompletableFuture的结果。我们通过API的其他有用方法，如thenApply()，thenAccept()和exceptionally()来实现这一点。

如往常一样，我们可以在GitHub上找到工作的代码示例。

OK