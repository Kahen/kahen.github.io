---
date: 2024-06-25
category:
  - Java
  - 编程
tag:
  - Future
  - Promise
head:
  - - meta
    - name: keywords
      content: Java, Future, Promise, 异步任务, 比较
---
# Java 中 Future 和 Promise 的区别

## 1. 引言

Future 和 Promise 是用于处理异步任务的工具，它们允许在不等待每一步完成的情况下执行操作。尽管它们的目的相同，但它们之间存在关键差异。在本教程中，我们将探讨 Future 和 Promise 之间的差异，仔细研究它们的关键特性、用例和独特特点。

## 2. 理解 Future

Future 充当一个容器，等待正在进行的操作的结果。开发者通常使用 Future 来检查计算的状态，在结果准备好时检索结果，或者优雅地等待操作结束。Future 经常与 Executor 框架集成，提供了一种简单高效的处理异步任务的方法。

### 2.1. 关键特性

现在，让我们探索一些 Future 的关键特性：

- **采用阻塞设计，这可能导致等待直到异步计算完成。**
- 与正在进行的计算的直接交互受到限制，保持了一种简单直接的方法。

### 2.2. 使用场景

**Future 在异步操作的结果在过程开始后就已经确定，并且不能在过程中修改的场景中表现出色。**

考虑从数据库中获取用户个人资料信息或从远程服务器下载文件。一旦启动，这些操作就有固定的结果，例如检索到的数据或下载的文件，并且不能在中途修改。

### 2.3. 使用 Future

要使用 Future，我们可以在 java.util.concurrent 包中找到它们。让我们看一个演示如何使用 Future 处理异步任务的代码片段：

```java
ExecutorService executorService = Executors.newSingleThreadExecutor();

Future````<String>```` futureResult = executorService.submit(() -> {
    Thread.sleep(2000);
    return "Future Result";
});

while (!futureResult.isDone()) {
    System.out.println("Future task is still in progress...");
    Thread.sleep(500);
}

String resultFromFuture = futureResult.get();
System.out.println("Future Result: " + resultFromFuture);

executorService.shutdown();
```

当我们运行代码时，我们会得到以下输出：

```
Future task is still in progress...
Future task is still in progress...
Future task is still in progress...
Future task is still in progress...
Future Result: Future Result
```

在代码中，futureResult.get() 方法是一个阻塞调用。这意味着当程序到达这行时，**它将等待提交给 ExecutorService 的异步任务完成后才继续前进**。

## 3. 理解 Promise

相反，Promise 的概念在 Java 中不是本地的，但在其他编程语言中是一种多功能的抽象。**Promise 充当一个代理，代表一个可能在 Promise 创建时未知的值。**与 Future 不同，Promise 通常提供一种更互动的方法，允许开发者即使在启动后也能影响异步计算。

### 3.1. 关键特性

现在，让我们探索一些 Promise 的关键特性：

- 封装了一个可变状态，即使在异步操作开始后也允许修改，提供了处理动态场景的灵活性
- 使用回调机制，允许开发者附加在异步操作完成、失败或进度时执行的回调

### 3.2. 使用场景

**Promise 非常适合需要动态和交互式控制异步操作的场景。**此外，Promise 提供了在启动后修改正在进行的计算的灵活性。一个很好的例子是在金融应用中实时数据流，其中显示内容需要适应实时市场变化。

此外，当处理需要基于中间结果进行条件分支或修改的异步任务时，Promise 也很有用。一个可能的使用场景是，我们需要处理多个异步 API 调用，其中后续操作取决于前一个调用的结果。

### 3.3. 使用 Promise

Java 可能没有严格遵循 JavaScript 中 Promise 规范的专用 Promise 类。**然而，我们可以使用 java.util.concurrent.CompletableFuture 来实现类似 Promise 的功能。**CompletableFuture 提供了一种灵活的方式来处理异步任务，与 Promise 共享一些特性。需要注意的是，它们并不相同。

让我们探索如何使用 CompletableFuture 在 Java 中实现类似 Promise 的行为：

```java
ExecutorService executorService = Executors.newSingleThreadExecutor();
CompletableFuture````<String>```` completableFutureResult = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(2000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "CompletableFuture Result";
}, executorService);

completableFutureResult.thenAccept(result -> {
    System.out.println("Promise Result: " + result);
})
.exceptionally(throwable -> {
    System.err.println("Error occurred: " + throwable.getMessage());
    return null;
});

System.out.println("Doing other tasks...");

executorService.shutdown();
```

当我们运行代码时，我们会看到以下输出：

```
Doing other tasks...
Promise Result: CompletableFuture Result
```

我们创建了一个名为 completableFutureResult 的 CompletableFuture。supplyAsync() 方法用于启动异步计算。提供的 lambda 函数表示异步任务。

接下来，我们使用 thenAccept() 和 exceptionally() 将回调附加到 CompletableFuture。thenAccept() 回调处理异步任务的成功完成，类似于 Promise 的解析，而 exceptionally() 处理在任务期间可能发生的任何异常，类似于 Promise 的拒绝。

## 4. 关键差异

### 4.1. 控制流

一旦 Future 的值被设置，控制流就会顺流而下，不受后续事件或更改的影响。与此同时，Promise（或 CompletableFuture）提供了 thenCompose() 和 whenComplete() 等方法，用于基于最终结果或异常的条件执行。

让我们创建一个使用 CompletableFuture 的分支控制流的示例：

```java
CompletableFuture```<Integer>``` firstTask = CompletableFuture.supplyAsync(() -> {
    return 1;
})
.thenApplyAsync(result -> {
    return result * 2;
})
.whenComplete((result, ex) -> {
    if (ex != null) {
        // 在这里处理错误
    }
});
```

在代码中，我们使用 thenApplyAsync() 方法来演示异步任务的链式。

### 4.2. 错误处理

Future 和 Promise 都提供了处理错误和异常的机制。Future 依赖于在计算期间抛出的异常：

```java
ExecutorService executorService = Executors.newSingleThreadExecutor();
Future````<String>```` futureWithError = executorService.submit(() -> {
    throw new RuntimeException("An error occurred");
});

try {
    String result = futureWithError.get();
} catch (InterruptedException | ExecutionException e) {
    e.printStackTrace();
} finally {
    executorService.shutdown();
}
```

在 CompletableFuture 中，exceptionally() 方法用于处理在异步计算期间发生的任何异常。如果发生异常，它将打印错误消息并提供回退值：

```java
CompletableFuture````<String>```` promiseWithError = new CompletableFuture<>();
promiseWithError.completeExceptionally(new RuntimeException("An error occurred"));

promiseWithError.exceptionally(throwable -> {
    return "Fallback value";
});
```

### 4.3. 读写访问

Future 提供了一个只读视图，允许我们在计算完成后检索结果：

```java
Future```<Integer>``` future = executor.submit(() -> 100);
// 不能在完成后修改 future.get()
```

相比之下，CompletableFuture 不仅允许我们读取结果，而且在异步操作开始后甚至可以主动动态设置值：

```java
ExecutorService executorService = Executors.newSingleThreadExecutor();
CompletableFuture```<Integer>``` totalPromise = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return 100;
}, executorService);

totalPromise.thenAccept(value -> System.out.println("Total $" + value ));
totalPromise.complete(10);
```

最初，我们设置异步任务返回 100 作为结果。然而，我们在它自然完成之前介入，并显式地用值 10 完成任务。这种灵活性突出了 CompletableFuture 的可写特性，允许我们在异步执行期间动态更新结果。

## 5. 结论

在本文中，我们探讨了 Future 和 Promise 之间的区别。虽然两者都用于处理异步任务，但它们在功能上有很大的不同。

如往常一样，示例的源代码可在 GitHub 上获取。