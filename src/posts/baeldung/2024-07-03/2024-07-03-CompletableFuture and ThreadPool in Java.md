---
date: 2023-07-31
category:
  - Java
  - CompletableFuture
tag:
  - Java 8
  - 线程池
head:
  - - meta
    - name: keywords
      content: CompletableFuture, 线程池, Java 8, 异步编程
---
# Java 中的 CompletableFuture 和线程池 | Baeldung

Java 8 的并发 API 引入了 _CompletableFuture_，这是一个简化异步和非阻塞编程的有价值工具。

在本文中，我们将讨论 Java 的 _CompletableFuture_ 以及它所使用的线程池。我们将探索其异步和非异步方法之间的区别，并学习如何最大限度地利用 _CompletableFuture_ API 的潜力。

## 2. 非异步方法

_CompletableFuture_ 提供了一个包含50多种方法的广泛API。这些方法中的许多都有两个变体：非异步和异步。让我们从非异步对应方法开始，并深入探讨使用 _thenApply()_ 方法的实践示例：

当使用 _thenApply()_ 时，我们传递一个函数作为参数，该函数以 _CompletableFuture_ 的前一个值作为输入，执行一个操作，并返回一个新的值。因此，会创建一个新的 _CompletableFuture_ 来封装结果值。为了说明这个概念，让我们考虑一个简单的示例，将 _String_ 值转换为表示其大小的 _Integer_。此外，我们还将打印负责执行此操作的线程的名称：

```java
@Test
void whenUsingNonAsync_thenMainThreadIsUsed() throws Exception {
    CompletableFuture`````<String>````` name = CompletableFuture.supplyAsync(() -> "Baeldung");

    CompletableFuture`````<Integer>````` nameLength = name.thenApply(value -> {
        printCurrentThread(); // 将打印 "main"
        return value.length();
    });

    assertThat(nameLength.get()).isEqualTo(8);
}

private static void printCurrentThread() {
    System.out.println(Thread.currentThread().getName());
}
```

作为参数传递给 _thenApply()_ 的函数将由直接与 _CompletableFuture_ 的 API 交互的线程执行，在本例中为主线程。然而，如果我们提取与 _CompletableFuture_ 的交互，并从不同的线程调用它，我们应该注意到变化：

```java
@Test
void whenUsingNonAsync_thenUsesCallersThread() throws Exception {
    Runnable test = () -> {
        CompletableFuture`````<String>````` name = CompletableFuture.supplyAsync(() -> "Baeldung");

        CompletableFuture`````<Integer>````` nameLength = name.thenApply(value -> {
            printCurrentThread(); // 将打印 "test-thread"
            return value.length();
        });

        try {
            assertThat(nameLength.get()).isEqualTo(8);
        } catch (Exception e) {
            fail(e.getMessage());
        }
    };

    new Thread(test, "test-thread").start();
    Thread.sleep(100l);
}
```

## 3. 异步方法

API 中的大多数方法都有一个异步对应方法。我们可以使用这些异步变体来确保中间操作在单独的线程池上执行。让我们改变前面的代码示例，从 _thenApply()_ 切换到 _thenApplyAsync()_：

```java
@Test
void whenUsingAsync_thenUsesCommonPool() throws Exception {
    CompletableFuture`````<String>````` name = CompletableFuture.supplyAsync(() -> "Baeldung");

    CompletableFuture`````<Integer>````` nameLength = name.thenApplyAsync(value -> {
        printCurrentThread(); // 将打印 "ForkJoinPool.commonPool-worker-1"
        return value.length();
    });

    assertThat(nameLength.get()).isEqualTo(8);
}
```

根据官方文档，如果我们使用异步方法而不显式提供 _Executor_，函数将使用 _ForkJoinPool.commonPool()_ 执行。因此，如果我们运行代码片段，我们应该期望看到一个常见的 _ForkJoinPool_ 工作线程：在本例中为 "ForkJoinPool.commonPool-worker-1"。

## 4. 使用自定义执行器的异步方法

**我们可以注意到所有异步方法都重载了，提供了一个替代方案，它接受要执行的代码以及 _Executor_。我们可以使用这个来为异步操作使用一个显式的线程池。** 让我们进一步更新我们的测试，并为 _thenApplyAsync()_ 方法提供一个自定义的线程池：

```java
@Test
void whenUsingAsync_thenUsesCustomExecutor() throws Exception {
    Executor testExecutor = Executors.newFixedThreadPool(5);
    CompletableFuture`````<String>````` name = CompletableFuture.supplyAsync(() -> "Baeldung");

    CompletableFuture`````<Integer>````` nameLength = name.thenApplyAsync(value -> {
        printCurrentThread(); // 将打印 "pool-2-thread-1"
        return value.length();
    }, testExecutor);

    assertThat(nameLength.get()).isEqualTo(8);
}
```

正如预期的那样，当使用重载方法时，CompletableFuture 将不再使用公共的 _ForkJoinPool_。

## 5. 扩展 CompletableFuture

**最后，我们可以扩展 CompletableFuture 并覆盖 defaultExecutor()，封装一个自定义线程池。因此，我们将能够使用异步方法而不指定 Executor，函数将由我们的线程池而不是公共 ForkJoinPool 调用。**

让我们创建一个 CustomCompletableFuture 来扩展 CompletableFuture。让我们使用 newSingleThreadExecutor 并创建一个线程，该线程在控制台测试时可以轻松识别。此外，我们将覆盖 defaultExecutor() 方法，使 CompletableFuture 能够无缝地使用我们的自定义线程池：

```java
public class CustomCompletableFuture``<T>`` extends CompletableFuture``<T>`` {
    private static final Executor executor = Executors.newSingleThreadExecutor(
        runnable -> new Thread(runnable, "Custom-Single-Thread")
    );

    @Override
    public Executor defaultExecutor() {
        return executor;
    }
}
```

此外，让我们添加一个静态工厂方法，该方法遵循 CompletableFuture 模式。这将使我们能够轻松创建并完成 CustomCompletableFuture 对象：

```java
public static ````<TYPE>```` CustomCompletableFuture````<TYPE>```` supplyAsync(Supplier````<TYPE>```` supplier) {
    CustomCompletableFuture````<TYPE>```` future = new CustomCompletableFuture<>();
    executor.execute(() -> {
        try {
            future.complete(supplier.get());
        } catch (Exception ex) {
            future.completeExceptionally(ex);
        }
    });
    return future;
}
```

现在，让我们创建一个 CustomCompletableFuture 的实例，并在 thenSupplyAsync() 中对 String 值执行相同的转换。尽管这次我们没有指定 Executor，但我们仍然期望函数由我们专用的线程 "Custom-Single-Thread" 调用：

```java
@Test
void whenOverridingDefaultThreadPool_thenUsesCustomExecutor() throws Exception {
    CompletableFuture`````<String>````` name = CustomCompletableFuture.supplyAsync(() -> "Baeldung");

    CompletableFuture`````<Integer>````` nameLength = name.thenApplyAsync(value -> {
        printCurrentThread(); // 将打印 "Custom-Single-Thread"
        return value.length();
    });

    assertThat(nameLength.get()).isEqualTo(8);
}
```

## 6. 结论

在本文中，我们了解到 CompletableFuture 的 API 中的大多数方法都允许异步和非异步执行。通过调用非异步变体，调用 CompletableFuture 的 API 的线程也将执行所有中间操作和转换。另一方面，异步对应方法将使用不同的线程池，默认的是公共 ForkJoinPool。

之后，我们讨论了执行的进一步定制，为每个异步步骤使用自定义 Executors。最后，我们学会了如何创建自定义 CompletableFuture 对象并覆盖 defaultExecutor() 方法。这使我们能够使用异步方法而不必每次都指定自定义 Executor。

如往常一样，我们可以在 GitHub 上找到工作的代码示例。