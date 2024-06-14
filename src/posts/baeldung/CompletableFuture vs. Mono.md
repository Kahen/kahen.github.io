---
date: 2024-06-13
category:
  - Java
tag:
  - CompletableFuture
  - Mono
  - 异步编程
---
# CompletableFuture与Mono | Baeldung

在这篇快速教程中，我们将学习Java中CompletableFuture和来自Project Reactor的Mono之间的差异。我们将重点讨论它们如何处理异步任务以及为完成这些任务而发生的执行过程。

让我们先从CompletableFuture开始了解。

### 2. CompletableFuture的理解

CompletableFuture是在Java 8中引入的，它建立在之前的Future类之上，并提供了一种异步运行代码的方式。简而言之，它改善了异步编程并简化了线程的工作。

此外，我们可以使用thenApply()、thenAccept()和thenCompose()等方法创建一系列计算，以协调我们的异步任务。

虽然CompletableFuture是异步的，意味着主线程在等待当前操作完成时会继续执行其他任务，但它并不是完全非阻塞的。一个长时间运行的操作可能会阻塞执行它的线程：

```java
CompletableFuture completableFuture = CompletableFuture.supplyAsync(() -\> {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
    return "Finished completableFuture";
});
```

在上面，我们使用Thread类的sleep()方法模拟一个长时间操作。如果未定义，supplyAsnc()将使用ForkJoinPool并分配一个线程来运行匿名lambda函数，这个线程会被sleep()方法阻塞。

此外，如果在CompletableFuture实例完成操作之前调用get()方法，会阻塞主线程：

```java
try {
    completableFuture.get(); // 这会阻塞主线程
} catch (InterruptedException | ExecutionException e) {
    e.printStackTrace();
}
```

为了避免这种情况，我们可以使用CompletableFuture中的completeExceptionally()或complete()方法手动处理CompletableFuture的完成。例如，假设我们有一个函数，我们希望它在不阻塞主线程的情况下运行，然后，我们希望在它失败或成功完成时处理这个将来：

```java
public void myAsyncCall(String param, BiConsumer\<String, Throwable\> callback) {
    new Thread(() -\> {
        try {
            Thread.sleep(1000);
            callback.accept("Response from API with param: " + param, null);
        } catch (InterruptedException e) {
            callback.accept(null, e);
        }
    }).start();
}

```

然后，我们使用这个函数创建一个CompletableFuture：

```java
public CompletableFuture\<String\> nonBlockingApiCall(String param) {
    CompletableFuture\<String\> completableFuture = new CompletableFuture\<\>();
    myAsyncCall(param, (result, error) -\> {
        if (error != null) {
            completableFuture.completeExceptionally(error);
        } else {
            completableFuture.complete(result);
        }
    });
    return completableFuture;
}
```

接下来，我们将看到一种替代的、更反应式的方式来处理相同的操作。

### 3. CompletableFuture与Mono的比较

\> 来自Project Reactor的Mono类使用反应式原则。与CompletableFuture不同，**Mono旨在以更少的开销支持并发**。

此外，与CompletableFuture的急切执行相比，Mono是懒惰的，这意味着我们的应用程序不会消耗资源，除非我们订阅了Mono：

```java
Mono\<String\> reactiveMono = Mono.fromCallable(() -\> {
    Thread.sleep(1000); // 模拟一些计算
    return "Reactive Data";
}).subscribeOn(Schedulers.boundedElastic());

reactiveMono.subscribe(System.out::println);
```

在上面，我们使用fromCallable()方法创建一个Mono对象，并提供阻塞操作作为供应商。然后，我们使用subscribeOn()方法将操作委托给一个单独的线程。

**Schedulers.boundedElastic()类似于缓存线程池，但对线程的最大数量有限制**。这确保了主线程保持非阻塞。唯一强制阻塞主线程的方法是强制调用block()方法。此方法等待Mono实例的完成，无论成功与否。

然后，我们使用subscribe()来订阅Mono对象的结果，使用方法引用将println()订阅到：

```java
reactiveMono.subscribe(System.out::println);
```

Mono类非常灵活，并提供了一组操作符来描述性地转换和组合其他Mono对象。它还支持背压，以防止应用程序消耗所有资源。

### 4. 结论

在这篇快速文章中，我们比较了CompletableFuture与Project Reactor中的Mono类。首先，我们描述了CompletableFuture如何运行异步任务。然后，我们展示了如果配置不正确，它可能会阻塞它正在工作的线程以及主线程。最后，我们展示了如何使用Mono以反应式的方式运行异步操作。

如常，我们可以在GitHub上找到完整的代码。
