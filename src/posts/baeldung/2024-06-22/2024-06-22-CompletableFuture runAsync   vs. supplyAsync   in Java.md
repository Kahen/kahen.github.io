---
date: 2024-06-22
category:
  - Java
  - CompletableFuture
tag:
  - CompletableFuture
  - runAsync
  - supplyAsync
head:
  - - meta
    - name: keywords
      content: Java, CompletableFuture, runAsync, supplyAsync, 异步编程
---
# Java中CompletableFuture的runAsync()与supplyAsync()对比 | Baeldung

Java的_CompletableFuture_框架提供了强大的异步编程能力，方便了任务的并发执行。

在本教程中，我们将深入探讨_CompletableFuture_提供的两个基本方法——runAsync()和supplyAsync()。我们将探索它们的区别、使用场景以及何时选择其中一个。

### 2. CompletableFuture, runAsync() 和 supplyAsync() 的理解

CompletableFuture是Java中一个强大的框架，它支持异步编程，允许任务并发执行而不会阻塞主线程。runAsync()和supplyAsync()是由CompletableFuture类提供的方法。

在我们深入比较之前，先了解一下runAsync()和supplyAsync()各自的功能。这两种方法都启动了异步任务，允许我们并发执行代码而不会阻塞主线程。

**runAsync()** 是一个用于异步执行不产生结果的任务的方法。它适用于我们想要异步执行代码而不等待结果的“发射后忘记”任务。例如，记录日志、发送通知或触发后台任务。

另一方面，**supplyAsync()** 是一个用于异步执行产生结果的任务的方法。它非常适合需要结果进行进一步处理的任务。例如，从数据库获取数据、进行API调用或异步执行计算。

### 3. 输入和返回

runAsync()和supplyAsync()之间的主要区别在于它们接受的输入以及它们产生的返回类型。

#### 3.1. runAsync()

当异步任务不产生任何结果时，使用runAsync()方法。它接受一个Runnable函数式接口并异步启动任务。**它返回CompletableFuture`````<Void>`````，并且适用于那些重点在于任务完成而不是获取特定结果的场景。**

这是一个展示其用法的代码片段：

```java
CompletableFuture`````<Void>````` future = CompletableFuture.runAsync(() -> {
    // 执行不产生结果的任务
    System.out.println("Task executed asynchronously");
});
```

在这个例子中，runAsync()方法被用来异步执行一个不产生结果的任务。提供的lambda表达式封装了要执行的任务。完成后，它会打印：

```java
Task completed successfully
```

#### 3.2. supplyAsync()

另一方面，当异步任务产生结果时，使用supplyAsync()。它接受一个Supplier函数式接口并异步启动任务。**随后，它返回CompletableFuture```<T>```，其中T是由任务产生的结果类型。**

让我们通过一个例子来说明：

```java
CompletableFuture```<String>``` future = CompletableFuture.supplyAsync(() -> {
    // 执行结果生成任务
    return "Result of the asynchronous computation";
});

// 稍后获取结果
String result = future.get();
System.out.println("Result: " + result);
```

在这个例子中，supplyAsync()被用来异步执行一个结果生成任务。supplyAsync()内的lambda表达式代表了异步计算结果的任务。完成后，它打印出获得的结果：

```java
Result: Result of the asynchronous computation
```

### 4. 异常处理

在这一部分，我们将讨论这两种方法如何处理异常。

#### 4.1. runAsync()

使用runAsync()时，异常处理是直接的。**该方法没有为异步任务内处理异常提供显式机制。** 因此，在执行任务期间抛出的任何异常都会在调用CompletableFuture上的get()方法时传播到调用线程。这意味着我们必须在调用get()之后手动处理异常。

这是一个演示runAsync()异常处理的代码片段：

```java
CompletableFuture`````<Void>````` future = CompletableFuture.runAsync(() -> {
    throw new RuntimeException("Exception occurred in asynchronous task");
});

try {
    future.get(); // 异常将在这里抛出
} catch (ExecutionException ex) {
    Throwable cause = ex.getCause();
    System.out.println("Exception caught: " + cause.getMessage());
}
```

然后打印出异常消息：

```java
Exception caught: Exception occurred in asynchronous task
```

#### 4.2. supplyAsync()

相比之下，supplyAsync()提供了一种更方便的异常处理方式。**它通过exceptionally()方法提供了异常处理机制。** 这个方法允许我们指定一个函数，如果原始的异步任务异常完成，该函数将被调用。我们可以使用这个函数来处理异常并返回一个默认值或执行任何必要的清理操作。

让我们看一个示例，演示supplyAsync()的异常处理如何工作：

```java
CompletableFuture```<String>``` future = CompletableFuture.supplyAsync(() -> {
    throw new RuntimeException("Exception occurred in asynchronous task");
}).exceptionally(ex -> {
    // 异常处理逻辑
    return "Default value";
});

String result = future.join(); // 获取结果或默认值
System.out.println("Result: " + result);
```

在这个例子中，如果在执行异步任务期间发生异常，exceptionally()方法将被调用。这允许我们优雅地处理异常，并在需要时提供回退值。

而不是抛出异常，它打印：

```java
Task completed with result: Default value
```

### 5. 执行行为

在这一部分，我们将探讨CompletableFuture的runAsync()和supplyAsync()方法的执行行为。

#### 5.1. runAsync()

使用runAsync()时，任务会立即在公共线程池中启动。它的行为类似于调用new Thread(runnable).start()。**这意味着任务在调用时立即开始执行，没有任何延迟或调度考虑。**

#### 5.2. supplyAsync()

另一方面，supplyAsync()在公共线程池中安排任务，如果其他任务排队，可能会延迟其执行。**这种调度方法在资源管理方面可能是有利的，因为它有助于防止突然的线程创建爆发。** 通过排队任务并根据线程的可用性安排它们的执行，supplyAsync()确保了高效的资源利用。

### 6. 链式操作

在这一部分，我们将探讨CompletableFuture的runAsync()和supplyAsync()方法如何支持链式操作，突出它们的差异。

#### 6.1. runAsync()

runAsync()方法不能直接与thenApply()或thenAccept()等方法链式使用，因为它不产生结果。**然而，我们可以使用thenRun()在runAsync()任务完成后执行另一个任务。** 这个方法允许我们在不依赖初始任务结果的情况下，链式执行顺序执行的其他任务。

下面是一个使用runAsync()和thenRun()展示链式操作的例子：

```java
CompletableFuture`````<Void>````` future = CompletableFuture.runAsync(() -> {
    System.out.println("Task executed asynchronously");
});

future.thenRun(() -> {
    // 在runAsync()完成后执行另一个任务
    System.out.println("Another task executed after runAsync() completes");
});
```

在这个例子中，我们首先使用runAsync()异步执行一个任务。然后，我们使用thenRun()来指定在初始任务完成后要执行的另一个任务。这允许我们顺序地链式多个任务，结果如下：

```java
Task executed asynchronously
Another task executed after runAsync() completes
```

#### 6.2. supplyAsync()

相比之下，supplyAsync()由于其返回值允许链式操作。由于supplyAsync()产生结果，我们可以使用thenApply()来转换结果，使用thenAccept()来消费结果，或使用thenCompose()来链式进一步的异步操作。这种灵活性使我们能够通过链式多个任务来构建复杂的异步工作流。

这里有一个使用supplyAsync()和thenApply()的链式操作示例：

```java
CompletableFuture```<String>``` future = CompletableFuture.supplyAsync(() -> {
    return "Result of the asynchronous computation";
});

future.thenApply(result -> {
    // 转换结果
    return result.toUpperCase();
}).thenAccept(transformedResult -> {
    // 消费转换后的结果
    System.out.println("Transformed Result: " + transformedResult);
});
```

在这个例子中，我们首先使用supplyAsync()异步执行一个任务，该任务产生结果。然后，我们使用thenApply()来转换结果，使用thenAccept()来消费转换后的结果。这演示了使用supplyAsync()的多个操作的链式，允许更复杂的异步工作流。

输出示例如下：

```java
Transformed Result: RESULT OF THE ASYNCHRONOUS COMPUTATION
```

### 7. 性能

虽然runAsync()和supplyAsync()都异步执行任务，但它们的性能特性可能会根据任务的性质和底层执行环境而有所不同。

#### 7.1. runAsync()

由于runAsync()不产生任何结果，它可能与supplyAsync()相比具有稍微更好的性能。**这是因为它避免了创建Supplier对象的开销。** 在某些情况下，缺少结果处理逻辑可以导致更快的任务执行。

#### 7.2. supplyAsync()

影响supplyAsync()性能的因素包括任务的复杂性、资源的可用性和底层执行环境的效率。

在涉及复杂计算或资源密集型操作的任务场景中，使用supplyAsync()的性能影响可能更为明显。然而，处理结果和任务之间的依赖能力可能会超过任何潜在的性能开销。

### 8. 使用场景

在这一部分，我们将探讨这两种方法的具体使用场景。

#### 8.1. runAsync()

runAsync()方法特别适用于重点在于任务完成而不是获得特定结果的场景。**runAsync()通常用于执行不需要返回结果的后台任务或操作的场景。例如，使用runAsync()可以高效地运行定期清理例程、记录事件或触发通知。

#### 8.2. supplyAsync()

与runAsync()相比，supplyAsync()方法特别适用于任务完成时涉及产生稍后可能在应用程序流程中使用的值的情况。supplyAsync()的一个典型用例是从外部源获取数据，例如数据库、API或远程服务器。

**此外，supplyAsync()适合执行生成结果值的计算任务，例如执行复杂计算或处理输入数据。**

### 9. 总结

以下是比较runAsync()和supplyAsync()关键差异的摘要表：

| 特性 | runAsync() | supplyAsync() |
| --- | --- | --- |
| 输入 | 接受一个Runnable，代表一个不产生结果的任务 | 接受一个Supplier```<T>```，代表一个产生结果的任务 |
| 返回类型 | CompletableFuture`````<Void>````` | CompletableFuture```<T>```（T是结果类型） |
| 使用场景 | 不需要结果的“发射后忘记”任务 | 需要结果进行进一步处理的任务 |
| 异常处理 | 没有内置机制；异常传播给调用者 | 提供exceptionally()用于优雅的异常处理 |
| 执行行为 | 立即启动任务 | 安排任务可能延迟执行 |
| 链式操作 | 支持thenRun()用于后续任务 | 支持thenApply()等方法进行任务链式 |
| 性能 | 可能具有稍微更好的性能 | 性能受任务复杂性和资源影响 |
| 使用场景 | 后台任务、定期例程、通知 | 数据获取、计算任务、结果依赖任务 |

### 10. 结论

在本文中，我们探讨了runAsync()和supplyAsync()方法。我们讨论了它们的功能、差异、异常处理机制、执行行为、链式操作、性能考虑和特定使用场景。

当需要结果时，supplyAsync()是首选，而当重点仅在于任务完成而不需要特定结果时，runAsync()是合适的。

如常，示例的源代码可在GitHub上找到。

OK