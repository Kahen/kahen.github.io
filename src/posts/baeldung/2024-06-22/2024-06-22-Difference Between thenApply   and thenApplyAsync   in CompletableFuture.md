---
date: 2024-06-22
category:
  - Java
  - CompletableFuture
tag:
  - thenApply
  - thenApplyAsync
head:
  - - meta
    - name: keywords
      content: CompletableFuture, thenApply, thenApplyAsync, Java, 异步编程
---
# CompletableFuture 中的 thenApply() 和 thenApplyAsync() 之间的区别

在 CompletableFuture 框架中，thenApply() 和 thenApplyAsync() 是支持异步编程的关键方法。

在本教程中，我们将深入探讨 CompletableFuture 中 thenApply() 和 thenApplyAsync() 之间的差异。我们将探索它们的功能、使用案例，以及何时选择其中一个而不是另一个。

CompletableFuture 提供了 thenApply() 和 thenApplyAsync() 方法，用于对计算结果应用转换。这两种方法都允许在 CompletableFuture 的结果上执行操作链。

### thenApply()
thenApply() 是一个用于在 CompletableFuture 完成时对其结果应用函数的方法。它接受一个 Function 函数式接口，将函数应用于结果，并返回一个新的带有转换结果的 CompletableFuture。

### thenApplyAsync()
thenApplyAsync() 是一个异步执行提供函数的方法。它接受一个 Function 函数式接口和一个可选的 Executor，并返回一个新的带有异步转换结果的 CompletableFuture。

### 执行线程
thenApply() 和 thenApplyAsync() 之间的主要区别在于它们的执行行为。

#### thenApply()
默认情况下，thenApply() 方法使用完成当前 CompletableFuture 的同一线程执行转换函数。这意味着转换函数的执行可能在结果可用后立即发生。如果转换函数运行时间长或资源密集，这可能会潜在地阻塞线程。

然而，如果我们在尚未完成的 CompletableFuture 上调用 thenApply()，则它在来自执行器池的另一个线程中异步执行转换函数。

这里有一个示例代码片段来说明 thenApply()：

```java
CompletableFuture``````<Integer>`````` future = CompletableFuture.supplyAsync(() -> 5);
CompletableFuture``````<String>`````` thenApplyResultFuture = future.thenApply(num -> "Result: " + num);

String thenApplyResult = thenApplyResultFuture.join();
assertEquals("Result: 5", thenApplyResult);
```

在这个例子中，如果结果已经可用并且当前线程兼容，thenApply() 可能会同步执行函数。然而，重要的是要注意 CompletableFuture 根据各种因素（例如结果的可用性和线程上下文）智能决定是同步执行还是异步执行。

#### thenApplyAsync()
相比之下，thenApplyAsync() 通过使用来自执行器池的线程保证异步执行提供的函数，通常使用 ForkJoinPool.commonPool()。这确保了函数异步执行，并且可能在单独的线程中运行，防止了当前线程的任何阻塞。

这是我们如何使用 thenApplyAsync() 的示例：

```java
CompletableFuture``````<Integer>`````` future = CompletableFuture.supplyAsync(() -> 5);
CompletableFuture``````<String>`````` thenApplyAsyncResultFuture = future.thenApplyAsync(num -> "Result: " + num);

String thenApplyAsyncResult = thenApplyAsyncResultFuture.join();
assertEquals("Result: 5", thenApplyAsyncResult);
```

在这个例子中，即使结果立即可用，thenApplyAsync() 总是在单独的线程上调度函数进行异步执行。

### 控制线程
虽然 thenApply() 和 thenApplyAsync() 都支持异步转换，但它们在支持指定自定义执行器和控制执行线程方面有所不同。

#### thenApply()
thenApply() 方法不直接支持指定自定义执行器来控制执行线程。它依赖于 CompletableFuture 的默认行为，可能会在完成上一个阶段的同一线程上执行转换函数，通常是来自公共池的线程。

#### thenApplyAsync()
相比之下，thenApplyAsync() 允许我们显式指定一个执行器来控制执行线程。通过提供自定义执行器，我们可以决定转换函数的执行位置，从而实现更精确的线程管理。

这是我们如何使用自定义执行器与 thenApplyAsync() 的示例：

```java
ExecutorService customExecutor = Executors.newFixedThreadPool(4);

CompletableFuture``````<Integer>`````` future = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(2000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return 5;
}, customExecutor);

CompletableFuture``````<String>`````` resultFuture = future.thenApplyAsync(num -> "Result: " + num, customExecutor);

String result = resultFuture.join();
assertEquals("Result: 5", result);

customExecutor.shutdown();
```

在这个例子中，创建了一个固定线程池大小为 4 的自定义执行器。然后，thenApplyAsync() 方法使用这个自定义执行器，为转换函数的执行线程提供了控制。

### 异常处理
thenApply() 和 thenApplyAsync() 在异常处理上的关键区别在于异常何时以及如何变得可见。

#### thenApply()
如果提供给 thenApply() 的转换函数抛出异常，thenApply() 阶段会立即以异常完成 CompletableFuture。这种异常完成携带了抛出的异常在一个 CompletionException 中，包装了原始异常。

让我们用一个示例来说明：

```java
CompletableFuture``````<Integer>`````` future = CompletableFuture.supplyAsync(() -> 5);
CompletableFuture``````<String>`````` resultFuture = future.thenApply(num -> "Result: " + num / 0);
assertThrows(CompletionException.class, () -> resultFuture.join());
```

在这个例子中，我们尝试将 5 除以 0，这导致抛出 ArithmeticException。这个 CompletionException 直接传播到下一个阶段或调用者，这意味着函数中的任何异常都立即可见以供处理。因此，如果我们尝试使用 get()、join() 或 thenAccept() 等方法访问结果，我们直接遇到 CompletionException：

```java
CompletableFuture``````<Integer>`````` future = CompletableFuture.supplyAsync(() -> 5);
CompletableFuture``````<String>`````` resultFuture = future.thenApply(num -> "Result: " + num / 0);
try {
    // 使用 join() 访问结果
    String result = resultFuture.join();
    assertEquals("Result: 5", result);
} catch (CompletionException e) {
    assertEquals("java.lang.ArithmeticException: / by zero", e.getMessage());
}
```

在这个例子中，传递给 thenApply() 的函数抛出了异常。阶段识别出问题并将原始异常包装在 CompletionException 中，允许我们在后续处理中处理它。

#### thenApplyAsync()
虽然转换函数异步运行，但其中的任何异常不会直接传播到返回的 CompletableFuture。当我们调用 get()、join() 或 thenAccept() 等方法时，异常不会立即可见。这些方法会阻塞，直到异步操作完成，如果不正确处理，可能会导致死锁。

要处理 thenApplyAsync() 中的异常，我们必须使用专用方法，如 handle()、exceptionally() 或 whenComplete()。这些方法允许我们在异常发生时拦截和处理它。

这是一个使用 handle 显式处理的代码片段示例：

```java
CompletableFuture``````<Integer>`````` future = CompletableFuture.supplyAsync(() -> 5);
CompletableFuture``````<String>`````` thenApplyAsyncResultFuture = future.thenApplyAsync(num -> "Result: " + num / 0);

String result = thenApplyAsyncResultFuture.handle((res, error) -> {
    if (error != null) {
        // 适当处理错误，例如返回默认值
        return "Error occurred";
    } else {
        return res;
    }
})
.join(); // 现在 join() 不会抛出异常
assertEquals("Error occurred", result);
```

在这个例子中，即使 thenApplyAsync() 中发生了异常，它在 resultFuture 中并不直接可见。join() 方法阻塞并最终解开 CompletionException，揭示原始的 ArithmeticException。

### 使用案例
在这一部分，我们将探讨 CompletableFuture 中 thenApply() 和 thenApplyAsync() 方法的常见使用案例。

#### thenApply()
thenApply() 方法特别适用于以下场景：

- 顺序转换：**当需要顺序地将转换应用于 CompletableFuture 的结果时。**这可能涉及将数字结果转换为字符串或基于结果执行计算的任务。
- 轻量级操作：**它非常适合执行小而快速的转换，这些转换不会对调用线程造成显著阻塞。**示例包括将数字转换为字符串、基于结果执行计算或操作数据结构。

#### thenApplyAsync()
另一方面，thenApplyAsync() 方法适用于以下情况：

- 异步转换：**当需要异步应用转换时，可能利用多个线程进行并行执行。**例如，在 Web 应用程序中，用户上传图像进行编辑，使用 CompletableFuture 进行异步转换可以同时应用调整大小、过滤器和水印，从而提高处理效率和用户体验。
- 阻塞操作：**在转换函数涉及阻塞操作、I/O 操作或计算密集型任务的情况下，thenApplyAsync() 变得有利。**通过将这些计算卸载到单独的线程，有助于防止调用线程阻塞，从而确保更流畅的应用程序性能。

### 总结
这里是一个比较 thenApply() 和 thenApplyAsync() 关键差异的总结表。

| 特性 | thenApply() | thenApplyAsync() |
| --- | --- | --- |
| 执行行为 | 前一阶段的同一线程或执行器池中的单独线程（如果在完成前调用） | 来自执行器池的单独线程 |
| 自定义执行器支持 | 不支持 | 支持自定义执行器进行线程控制 |
| 异常处理 | 立即在 CompletionException 中传播异常 | 异常不直接可见，需要显式处理 |
| 性能 | 可能会阻塞调用线程 | 避免阻塞并提高性能 |
| 使用案例 | 顺序转换，轻量级操作 | 异步转换，阻塞操作 |

### 结论在本文中，我们探讨了 CompletableFuture 框架中 thenApply() 和 thenApplyAsync() 方法的功能和差异。

**thenApply()** 可能会潜在地阻塞线程，使其适合轻量级转换或同步执行可接受的场景。另一方面，**thenApplyAsync()** 保证异步执行，使其理想用于涉及潜在阻塞或计算密集型任务的操作，其中响应性至关重要。

如往常一样，示例的源代码可在 GitHub 上找到。

OK