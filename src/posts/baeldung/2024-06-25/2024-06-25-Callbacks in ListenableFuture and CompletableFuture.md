---
date: 2024-06-26
category:
  - Java
  - Concurrency
tag:
  - ListenableFuture
  - CompletableFuture
head:
  - - meta
    - name: keywords
      content: Java, Future, Callbacks, Concurrency
------
# Java中ListenableFuture和CompletableFuture的回调机制

## 1. 概述

_ListenableFuture_ 和 _CompletableFuture_ 都是基于 Java 的 _Future_ 接口构建的。前者是 Google 的 Guava 库的一部分，而后者则是 Java 8 的一部分。

众所周知，**_Future_ 接口不提供回调功能**。**_ListenableFuture_ 和 _CompletableFuture_ 都填补了这一空白**。在本教程中，我们将学习如何使用它们进行回调机制。

## 2. 异步任务中的回调

让我们定义一个用例，我们需要从远程服务器下载图像文件，并将图像文件的名称保存到数据库中。由于此任务包括网络操作并消耗时间，它是使用 Java 异步能力的完美案例。

我们可以创建一个函数，从远程服务器下载文件，并附加一个监听器，当下载完成后将数据推送到数据库。

让我们看看如何使用 _ListenableFuture_ 和 _CompletableFuture_ 来实现这项任务。

## 3. ListenableFuture 中的回调

让我们首先在 _pom.xml_ 中添加 Google 的 Guava 库依赖项：

```xml
`<dependency>`
    `<groupId>`com.google.guava`</groupId>`
    `<artifactId>`guava`</artifactId>`
    `<version>`32.1.3-jre`</version>`
`</dependency>`
```

现在，让我们模仿一个从远程 Web 服务器下载文件的 _Future_：

```java
ExecutorService executorService = Executors.newFixedThreadPool(1);
ListeningExecutorService pool = MoreExecutors.listeningDecorator(executorService);
ListenableFuture`````<String>````` listenableFuture = pool.submit(downloadFile());

private static Callable`````<String>````` downloadFile() {
  return () -> {
    // 通过添加睡眠调用来模拟文件下载
    Thread.sleep(5000);
    return "pic.jpg";
  };
}
```

上述代码创建了一个 _ExecutorService_，它被包裹在 _MoreExecutors_ 中以创建一个线程池。在 _ListenableFutureService_ 的 submit 方法中，我们传递了一个下载文件并返回文件名称的 _Callable`````<String>`````_，它返回一个 _ListenableFuture_。

要附加一个回调到 _ListenableFuture_ 实例，Guava 在 _Future_ 中提供了一个实用方法：

```java
Futures.addCallback(
    listenableFuture,
    new FutureCallback`<Void>`() {
        @Override
        public void onSuccess(String fileName) {
            // 将 fileName 推送到数据库的代码
        }

        @Override
        public void onFailure(Throwable throwable) {
            // 当出现错误时采取适当行动的代码
        }
    },
    executorService);
}
```

在这个回调中，成功和异常场景都得到了处理。使用回调的方式非常自然。

我们还可以通过直接将其添加到 _ListenableFuture_ 来**添加一个监听器**：

```java
listenableFuture.addListener(
    new Runnable() {
        @Override
        public void run() {
            // 下载文件的逻辑
        }
    },
    executorService
);

```

这个回调没有访问 _Future_ 的结果，因为它的输入是 _Runnable._ 这个回调方法无论 _Future_ 成功完成还是失败都会执行。

在了解了 _ListenableFuture_ 中的回调之后，下一节将探索 _CompletableFuture_ 中实现相同功能的方法。

## 4. CompletableFuture 中的回调

在 _CompletableFuture_ 中，有多种方法可以附加回调。最受欢迎的方法是使用链式方法，如 _thenApply()_、_thenAccept()_、_thenCompose()_、_exceptionally()_ 等，这些方法正常或异常执行。

在这一部分，我们将学习 _whenComplete()_ 方法。这个方法最好的地方在于，它可以被任何想要完成它的线程完成。使用上述文件下载示例，让我们看看如何使用 _whenComplete()_：

```java
CompletableFuture`````<String>````` completableFuture = new CompletableFuture<>();
Runnable runnable = downloadFile(completableFuture);
completableFuture.whenComplete(
  (res, error) -> {
      if (error != null) {
          // 处理异常场景
      } else if (res != null) {
          // 将数据发送到数据库
      }
  });
new Thread(runnable).start();

private static Runnable downloadFile(CompletableFuture`````<String>````` completableFuture) {
  return () -> {
      try {
          // 下载文件的逻辑；
      } catch (InterruptedException e) {
          log.error("exception is {} " + e);
      }
      completableFuture.complete("pic.jpg");
  };
}
```

当文件下载完成时，_whenComplete()_ 方法执行成功或失败条件。

## 5. 结论

在本文中，我们学习了 _ListenableFuture_ 和 _CompletableFuture_ 中的回调机制。

我们看到，与 _CompletableFuture_ 相比，**_ListenableFuture_ 是一个更自然和流畅的回调 API。**

我们可以自由选择最适合我们用例的，因为 **_CompletableFuture_ 是 Java 核心库的一部分，而 _ListenableFuture_ 是非常流行的 Guava 库的一部分。**

本文中使用的所有代码示例都可以在 GitHub 上找到。