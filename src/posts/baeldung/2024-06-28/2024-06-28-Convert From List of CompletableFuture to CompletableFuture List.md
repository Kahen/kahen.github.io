---
date: 2022-04-01
category:
  - Java
  - CompletableFuture
tag:
  - CompletableFuture
  - Java
  - 异步编程
head:
  - - meta
    - name: keywords
      content: Java, CompletableFuture, 异步编程, 转换
---

# 如何将CompletableFuture列表转换为CompletableFuture的列表

在本教程中，我们将学习如何将`List``<CompletableFuture<T>``>`对象转换为`CompletableFuture``<List<T>``>`。

这种转换在许多情况下都非常有用。**一个典型的例子是我们不得不对远程服务进行多次调用，这通常是一个异步操作，并将结果聚合到一个单独的`List`中**。此外，我们最终等待一个单一的`CompletableFuture`对象，它在所有操作完成后提供结果列表，或者如果一个或多个操作失败则抛出异常。

我们首先看一个简单的方式来进行转换，然后看看一个更简单、更安全的方法。

### 2.1. 实现

首先，让我们创建一个模拟异步操作的`Application`类：

```java
public class Application {
    ScheduledExecutorService asyncOperationEmulation;

    Application initialize() {
        asyncOperationEmulation = Executors.newScheduledThreadPool(10);
        return this;
    }

    CompletableFuture`````<String>````` asyncOperation(String operationId) {
        CompletableFuture`````<String>````` cf = new CompletableFuture<>();
        asyncOperationEmulation.submit(() -> {
            Thread.sleep(100);
            cf.complete(operationId);
        });
        return cf;
    }
}
```

我们创建了一个`Application`类来托管我们的测试代码和`asyncOperation()`方法，该方法简单地休眠100毫秒。我们使用一个10个线程的`Executor`来异步分发所有内容。

为了收集我们所有的操作结果，在这种情况下，是简单的`operationId`字符串，我们将使用`asyncOperation()`方法生成的`CompletableFuture`进行链式调用：

```java
void startNaive() {
    List<CompletableFuture`````<String>`````> futures = new ArrayList<>();
    for (int i = 1; i <= 1000; i++) {
        String operationId = "Naive-Operation-" + i;
        futures.add(asyncOperation(operationId));
    }
    CompletableFuture<List`````<String>`````> aggregate = CompletableFuture.completedFuture(new ArrayList<>());
    for (CompletableFuture`````<String>````` future : futures) {
        aggregate = aggregate.thenCompose(list -> {
            list.add(future.get());
            return CompletableFuture.completedFuture(list);
        });
    }
    final List`````<String>````` results = aggregate.join();
    for (int i = 0; i < 10; i++) {
        System.out.println("Finished " + results.get(i));
    }

    close();
}
```

我们首先使用静态的`completedFuture()`方法创建一个`CompletableFuture`，并提供一个空的`List`作为完成结果。使用`thenCompose()`我们创建一个`Runnable`，一旦前一个`future`完成就执行，在这个例子中是立即执行的。**`thenCompose()`方法返回一个新的`CompletableFuture`，它在第一个和第二个`future`都完成后解析**。我们将`aggregate`引用替换为这个新的`future`对象。这允许我们在迭代`futures`列表的循环中继续链式调用这些调用。

在`Runnable`内部，我们等待`future`完成，并将结果添加到`list`中。然后我们返回一个包含该`list`的完成的`future`和结果。这将使`list`沿着`thenCompose()`链进一步传递，让我们逐个添加`future`的结果。

一旦所有`future`都被链式调用，我们调用`aggregate` `CompletableFuture`上的`join()`。这是特别为了示例，以便我们可以检索结果，并阻止主Java线程在`aggregate`完成之前退出。在真正的异步场景中，我们可能会在`thenAccept()`或`whenComplete()`调用中添加我们的回调逻辑。

需要注意的一点是我们在最后添加了一个`close()`调用：

```java
void close() {
    asyncOperationEmulation.shutdownNow();
}
```

**当应用程序退出时，关闭所有`Executors`是强制性的，否则Java进程将挂起**。

### 2.2. 实现问题

简单的实现有一些问题。**不仅`future`链式调用引入了不必要的复杂性，而且还创建了大量的不需要的对象**，例如由`thenCompose()`生成的所有新的`CompletableFuture`。

另一个潜在的问题出现在我们执行大量操作时。如果一个操作失败，并且取决于Java实现如何解析`CompletableFuture`链，如果解析是递归进行的，我们可能会得到一个`StackOverflowError`。

为了测试异常场景，我们可以通过改变`asyncOperation()`方法来引入一个操作的错误：

```java
CompletableFuture`````<String>````` asyncOperation(String operationId) {
    CompletableFuture`````<String>````` cf = new CompletableFuture<>();
    asyncOperationEmulation.submit(() -> {
        if (operationId.endsWith("567")) {
            cf.completeExceptionally(new Exception("Error on operation " + operationId));
            return;
        }
        Thread.sleep(100);
        cf.complete(operationId);
    });
    return cf;
}
```

在这种情况下，第567个操作的`future`将异常完成，这将使`aggregate.join()`调用也抛出运行时异常。

### 3.1. 使用`CompletableFuture.allOf()`

一种不同的更好的方法是使用`CompletableFuture` API的`allOf()`方法。**这个方法接受一个`CompletableFuture`对象数组，并创建一个新的`CompletableFuture`，当所有提供的`future`本身解析时，它就会解析**。

此外，如果其中一个`future`失败，那么聚合的`future`也会失败。**新`future`不包含结果列表**。要获得它们，我们必须检查相应的`CompletableFuture`对象。

### 3.2. 使用`allOf()`的优点

基于`allOf()`的实现是处理多个异步操作的更简单、更清晰的方式，而不是`future`链式调用。聚合的`CompletableFuture`为整个操作提供了原子性，并在所有`future`成功时完成，或者当任何一个失败时失败。**这保护我们免受潜在的部分处理结果的影响。**

**此外，它让我们以非阻塞的方式等待所有`future`完成。**注意，在示例代码中，我们为`listFuture`对象调用了`join()`，但在现实场景中，我们只依赖回调。

## 结论

在本文中，我们学习了如何将`List``<CompletableFuture<T>``>`转换为`CompletableFuture``<List<T>``>`。我们了解了这种转换的用途，并看到了两种实现方式，一种是简单的实现，一种是使用正确的Java API。我们讨论了前者的潜在问题以及后者如何避免它们。

如往常一样，本文的源代码可在GitHub上获得。