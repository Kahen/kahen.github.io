---
date: 2024-06-21
category:
  - Java Concurrency
  - Java Tutorials
tag:
  - ExecutorService
  - CompletableFuture
head:
  - - meta
    - name: keywords
      content: Java, ExecutorService, CompletableFuture, Concurrency, Asynchronous Programming
---

# ExecutorService与CompletableFuture：Java并发处理的两种方式

在本教程中，我们将探讨Java中处理需要并发运行的任务的两个重要类：_ExecutorService_和_CompletableFuture_。我们将学习它们的功能以及如何有效地使用它们，并理解它们之间的关键差异。

## 2. ExecutorService概述

_ExecutorService_是Java的_java.util.concurrent_包中的强大接口，它简化了需要并发运行的任务的管理。它抽象了线程创建、管理和调度的复杂性，让我们可以专注于需要完成的实际工作。

_ExecutorService_提供了如_submit()_和_execute()_等方法来提交我们想要并发运行的任务。然后，这些任务被排队并分配给线程池中的可用线程。如果任务返回结果，我们可以使用_Future_对象来检索它们。然而，使用_Future_上的_get()_等方法检索结果可能会阻塞调用线程，直到任务完成。

## 3. CompletableFuture概述

_CompletableFuture_是在Java 8中引入的。它专注于以更声明性的方式组合异步操作和处理它们的最终结果。一个_CompletableFuture_充当一个容器，保存异步操作的最终结果。它可能不会立即有结果，但它提供了定义结果可用时做什么的方法。

与_ExecutorService_不同，在检索结果时可能会阻塞线程，_CompletableFuture_以非阻塞方式操作。

## 4. 焦点和责任

虽然_ExecutorService_和_CompletableFuture_都处理Java中的异步编程，但它们服务于不同的目的。让我们探索它们各自的焦点和责任。

### 4.1. ExecutorService

_ExecutorService_专注于管理线程池和并发执行任务。它提供了创建具有不同配置的线程池的方法，例如固定大小、缓存和计划。

让我们看一个使用_ExecutorService_创建并维护恰好三个线程的示例：

```java
ExecutorService executor = Executors.newFixedThreadPool(3);
Future````<Integer>```` future = executor.submit(() -> {
    // 任务执行逻辑
    return 42;
});
```

_newFixedThreadPool(3)_方法调用创建了一个有三个线程的线程池，确保最多有三个任务将被并发执行。然后使用_submit()_方法将任务提交给线程池执行，返回一个代表计算结果的_Future_对象。

### 4.2. CompletableFuture

与此相反，_CompletableFuture_为组合异步操作提供了更高级别的抽象。它专注于定义工作流和处理异步任务的最终结果。

这是一个使用_supplyAsync()_启动返回字符串的异步任务的示例：

```java
CompletableFuture````<Integer>```` future = CompletableFuture.supplyAsync(() -> {
    return 42;
});
```

在这个示例中，_supplyAsync()_启动了一个异步任务，返回结果为42。

## 5. 异步任务的链式调用

_ExecutorService_和_CompletableFuture_都提供了链式异步任务的机制，但它们采取了不同的方法。

### 5.1. ExecutorService

在_ExecutorService_中，我们通常提交任务以执行，然后使用这些任务返回的_Future_对象来处理依赖关系和链式后续任务。然而，这涉及到阻塞并等待每个任务完成后再继续，这可能导致在处理异步工作流时的效率低下。

考虑我们向_ExecutorService_提交两个任务，然后使用_Future_对象将它们链在一起的情况：

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

Future````<Integer>```` firstTask = executor.submit(() -> {
    return 42;
});

Future```````<String>``````` secondTask = executor.submit(() -> {
    try {
        Integer result = firstTask.get();
        return "Result based on Task 1: " + result;
    } catch (InterruptedException | ExecutionException e) {
        // 处理异常
    }
    return null;
});

executor.shutdown();
```

在这个示例中，第二个任务依赖于第一个任务的结果。然而，_ExecutorService_没有提供内置的链式调用，所以我们需要通过使用_get()_显式管理依赖关系——这会阻塞线程——在提交第二个任务之前等待第一个任务完成。

### 5.2. CompletableFuture

另一方面，_CompletableFuture_提供了一种更流畅和表达性的方式来链式异步任务。它通过内置方法如_thenApply()_简化了任务链式调用。这些方法允许你定义一个异步任务序列，其中一个任务的输出成为下一个任务的输入。

这是一个使用_CompletableFuture_的等效示例：

```java
CompletableFuture````<Integer>```` firstTask = CompletableFuture.supplyAsync(() -> {
    return 42;
});

CompletableFuture```````<String>``````` secondTask = firstTask.thenApply(result -> {
    return "Result based on Task 1: " + result;
});
```

在这个示例中，_thenApply()_方法被用来定义第二个任务，它依赖于第一个任务的结果。当我们使用_thenApply()_将任务链式到_CompletableFuture_时，主线程不需要等待第一个任务完成就可以继续执行。它继续执行我们代码的其他部分。

## 6. 错误处理

在这一部分，我们将检查_ExecutorService_和_CompletableFuture_如何处理错误和异常情况。

### 6.1. ExecutorService

使用_ExecutorService_时，错误可以以两种方式表现：

- 提交的任务中抛出的异常：这些异常在尝试使用返回的_Future_对象上的_get()_等方法检索结果时，会传播回主线程。如果处理不当，这可能导致意外行为。
- 线程池管理期间的未检查异常：如果在线程池创建或关闭期间发生未检查异常，它通常从_ExecutorService_方法本身抛出。我们需要在代码中捕获并处理这些异常。

让我们看一个示例，突出潜在问题：

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

Future```````<String>``````` future = executor.submit(() -> {
    if (someCondition) {
        throw new RuntimeException("Something went wrong!");
    }
    return "Success";
});

try {
    String result = future.get();
    System.out.println("Result: " + result);
} catch (InterruptedException | ExecutionException e) {
    // 处理异常
} finally {
    executor.shutdown();
}
```

在这个示例中，提交的任务在满足特定条件时抛出异常。然而，我们需要在_future.get()_周围使用_try-catch_块来捕获任务抛出的异常或在使用_get()_检索时发生的异常。这种方法在管理多个任务的错误时可能会变得繁琐。

### 6.2. CompletableFuture

相比之下，_CompletableFuture_提供了一种更强大的错误处理方法，具有如_exceptionally()_和在链式方法本身内处理异常的方法。这些方法允许我们在异步工作流的不同阶段定义如何处理错误，而无需显式_try-catch_块。

让我们看一个使用_CompletableFuture_的错误处理示例：

```java
CompletableFuture```````<String>``````` future = CompletableFuture.supplyAsync(() -> {
    if (someCondition) {
        throw new RuntimeException("Something went wrong!");
    }
    return "Success";
})
.exceptionally(ex -> {
    System.err.println("Error in task: " + ex.getMessage());
    return "Error occurred"; // 可以选择性地返回一个默认值
});

future.thenAccept(result -> System.out.println("Result: " + result));
```

在这个示例中，异步任务抛出异常，错误在_exceptionally()_回调中被捕获和处理。它在发生异常时提供了一个默认值（"Error occurred"）。

## 7. 超时管理

超时管理在异步编程中至关重要，以确保任务在指定的时间框架内完成。让我们探讨_ExecutorService_和_CompletableFuture_如何处理超时的不同方式。

### 7.1. ExecutorService

_ExecutorService_没有内置的超时功能。要实现超时，我们需要使用_Future_对象，并可能中断超过截止时间的任务。这种方法涉及手动协调：

```java
ExecutorService executor = Executors.newFixedThreadPool(2);

Future```````<String>``````` future = executor.submit(() -> {
    try {
        Thread.sleep(5000);
    } catch (InterruptedException e) {
        System.err.println("Error occurred: " + e.getMessage());
    }
    return "Task completed";
});

try {
    String result = future.get(2, TimeUnit.SECONDS);
    System.out.println("Result: " + result);
} catch (TimeoutException e) {
    System.err.println("Task execution timed out!");
    future.cancel(true); // 手动中断任务。
} catch (Exception e) {
    // 处理异常
} finally {
    executor.shutdown();
}
```

在这个示例中，我们向_ExecutorService_提交了一个任务，并在使用_get()_方法检索结果时指定了两秒的超时。如果任务完成时间超过指定的超时时间，将抛出_TimeoutException_。这种方法可能会出错，需要仔细处理。

**重要的是要注意，虽然超时机制中断了等待任务结果的过程，但任务本身将继续在后台运行，直到它完成或被中断。**例如，要中断在_ExecutorService_中运行的任务，我们需要使用_Future.cancel(true)_方法。

##### 7.2. CompletableFuture

**在Java 9中，《CompletableFuture》提供了一种更流畅的超时处理方法，使用如_completeOnTimeout()_等方法。** _completeOnTimeout()_方法将在指定的超时持续时间内，如果原始任务未完成，则使用指定的值完成_CompletableFuture_。

让我们看一个示例，说明_completeOnTimeout()_是如何工作的：

```java
CompletableFuture```````<String>``````` future = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(5000);
    } catch (InterruptedException e) {
        // 处理异常
    }
    return "Task completed";
});

CompletableFuture```````<String>``````` timeoutFuture = future.completeOnTimeout("Timed out!", 2, TimeUnit.SECONDS);

String result = timeoutFuture.join();
System.out.println("Result: " + result);
```

在这个示例中，_supplyAsync()_方法启动了一个模拟长时间运行操作的异步任务，需要五秒钟才能完成。然而，我们使用_completeOnTimeout()_指定了两秒钟的超时。如果任务在两秒内未完成，_CompletableFuture_将自动使用值“Timed out!”完成。

## 8. 总结

以下是总结_ExecutorService_和_CompletableFuture_关键差异的比较表：

| 特性 | ExecutorService | CompletableFuture |
| --- | --- | --- |
| 焦点 | 线程池管理和任务执行 | 组合异步操作和处理最终结果 |
| 链式调用 | 使用_Future_对象手动协调 | 内置方法如_thenApply()_ |
| 错误处理 | 围绕_Future.get()_的手动try-catch块 | _exceptionally()_, _whenComplete()_, 在链式方法中处理 |
| 超时管理 | 使用_Future.get(timeout)_手动协调和可能的中断 | 内置方法如_completeOnTimeout()_ |
| 阻塞与非阻塞 | 阻塞（通常等待_Future.get()_以检索结果） | 非阻塞（在不阻塞主线程的情况下链式任务） |

## 9. 结论

在本文中，我们探讨了处理异步任务的两个基本类：_ExecutorService_和_CompletableFuture_。_ExecutorService_简化了线程池的管理和并发任务的执行，而_CompletableFuture_提供了一个更高级别的抽象，用于组合异步操作和处理它们的结果。

我们还检查了它们的功能、差异以及它们如何处理错误处理、超时管理和异步任务的链式调用。

如常，示例的源代码可在GitHub上找到。

OK