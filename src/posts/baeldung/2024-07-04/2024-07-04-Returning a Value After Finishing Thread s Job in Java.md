---
date: 2023-06-01
category:
  - Java
  - Concurrency
tag:
  - Java
  - Thread
  - Callable
  - Future
head:
  - - meta
    - name: keywords
      content: Java, Thread, Callable, Future, Concurrency
---
# Java中线程完成工作后的返回值

Java的一个主要特性是并发性。它允许多个线程运行并执行并行任务。因此，我们可以执行异步和非阻塞指令。这将优化可用资源，特别是当计算机具有多个CPU时。有两种类型的线程：有返回值的和没有返回值的（在后一种情况下，我们说它将有一个void返回方法）。

在本文中，我们将关注**如何在线程完成工作后返回一个值**。

## 2. _Thread_ 和 _Runnable_
我们通常将Java线程称为轻量级进程。让我们看看Java程序通常的工作原理：

一个Java程序是一个正在执行的过程。一个线程是Java进程的一个子集，可以访问主内存。它可以与同一进程中的其他线程通信。

线程有一个生命周期和不同的状态。实现它的一个常见方式是通过_Runnable_接口：

```java
public class RunnableExample implements Runnable {
    ...
    @Override
    public void run() {
        // 执行某些操作
    }
}
```

然后，我们可以启动我们的线程：

```java
Thread thread = new Thread(new RunnableExample());
thread.start();
thread.join();
```

正如我们所看到的，我们不能从_Runnable_返回一个值。然而，我们可以使用_wait()_和_notify()_与其他线程同步。_join()_方法将保持执行状态等待，直到它完成。稍后我们将看到这在从异步执行中获取结果时的重要性。

## 3. _Callable_
Java从1.5版本开始引入了_Callable_接口。让我们看一个计算阶乘的异步任务的例子。我们使用_BigInteger_作为结果，因为结果可能是一个很大的数字：

```java
public class CallableFactorialTask implements Callable`````````<BigInteger>````````` {
    // 字段和构造函数
    @Override
    public BigInteger call() throws Exception {
        return factorial(BigInteger.valueOf(value));
    }
}
```

我们也创建一个简单的阶乘计算器：

```java
public class FactorialCalculator {

    public static BigInteger factorial(BigInteger end) {
        BigInteger start = BigInteger.ONE;
        BigInteger res = BigInteger.ONE;

        for (int i = start.add(BigInteger.ONE).intValue(); i `<= end.intValue(); i++) {
            res = res.multiply(BigInteger.valueOf(i));
        }

        return res;
    }

    public static BigInteger factorial(BigInteger start, BigInteger end) {
        BigInteger res = start;

        for (int i = start.add(BigInteger.ONE).intValue(); i <= end.intValue(); i++) {
            res = res.multiply(BigInteger.valueOf(i));
        }

        return res;
    }
}
```

_Callable_只有一个我们需要重写的_call()_方法。该方法将返回我们的异步任务的对象。

_Callable_和_Runnable_都是_@FunctionalInterface_。_Callable_可以返回一个值并抛出异常。然而，它需要一个_Future_来完成任务。

## 4. 执行 _Callable_
我们可以使用_Future_或Fork/Join来执行_Callable_。

### 4.1. 使用 _Future_ 的 _Callable_
**自1.5版本以来，Java有了_Future_接口，用于创建包含我们异步处理响应的对象**。我们可以逻辑上将_Future_与Javascript中的Promise进行比较。

例如，当我们想要从多个端点获取数据时，我们通常会看到_Future_。因此，我们需要等待所有任务完成后才能收集响应数据。

_Future_包装了响应并等待线程完成。然而，我们可能会有中断，例如，由于超时或执行异常。

让我们看看_Future_接口：

```java
public interface Future<V>` {
    boolean cancel(boolean var1);
    boolean isCancelled();
    boolean isDone();
    V get() throws InterruptedException, ExecutionException;
    V get(long var1, TimeUnit var3) throws InterruptedException, ExecutionException, TimeoutException;
}
```

**_get_方法对我们来说很有趣，可以等待并获取执行结果。**

要启动一个_Future_作业，我们将其执行与_ThreadPool_关联。这样，我们将为这些异步任务分配一些资源。

让我们创建一个使用_Executor_的示例，它执行从我们之前看到的_Callable_中阶乘数的总和。我们将使用_Executor_接口和_ExecutorService_实现来创建一个_ThreadPoolExecutor_。我们可能想要使用固定或缓存的线程池。在这种情况下，我们将选择一个缓存线程池来演示：

```java
public BigInteger execute(List`<CallableFactorialTask>` tasks) {

    BigInteger result = BigInteger.ZERO;

    ExecutorService cachedPool = Executors.newCachedThreadPool();

    List<Future`````````<BigInteger>`````````> futures;

    try {
        futures = cachedPool.invokeAll(tasks);
    } catch (InterruptedException e) {
        // 异常处理示例
        throw new RuntimeException(e);
    }

    for (Future`````````<BigInteger>````````` future : futures) {
        try {
            result = result.add(future.get());
        } catch (InterruptedException | ExecutionException e) {
            // 异常处理示例
            throw new RuntimeException(e);
        }
    }

    return result;
}
```

我们可以用一个图表来表示这种执行，我们可以观察线程池和_Callable_如何相互作用：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/callable_future-7.png)

_Executor_将调用并收集所有内容到一个_Future_对象中。然后，我们可以从我们的异步处理中获取一个或多个结果。

让我们通过求和两个阶乘数的结果来测试：

```java
@Test
void givenCallableExecutor_whenExecuteFactorial_thenResultOk() {
    BigInteger result = callableExecutor.execute(Arrays.asList(new CallableFactorialTask(5), new CallableFactorialTask(3)));
    assertEquals(BigInteger.valueOf(126), result);
}
```

### 4.2. 使用 Fork/Join 的 _Callable_
**我们也可以选择使用_ForkJoinPool_**。它的工作方式与_ExecutorSerivce_类似，因为它扩展了_AbstractExecutorService_类。然而，它有不同的方式创建和组织线程。**它将任务分解为更小的任务，并优化资源，以便它们永远不会空闲**。我们可以用一个图表来表示子任务：

![img](https://www.baeldung.com/wp-content/uploads/2023/06/fork.png)

我们可以看到主任务将分解为SubTask1、SubTask3和SubTask4作为最小的可执行任务。最后，它们将合并到最终结果中。

让我们将之前的例子转换为使用_ForkJoinPool_的一个。我们可以将所有内容包装在一个执行器方法中：

```java
public BigInteger execute(List<Callable`````````<BigInteger>`````````> forkFactorials) {
    List<Future`````````<BigInteger>`````````> futures = forkJoinPool.invokeAll(forkFactorials);

    BigInteger result = BigInteger.ZERO;

    for (Future`````````<BigInteger>````````` future : futures) {
        try {
            result = result.add(future.get());
        } catch (InterruptedException | ExecutionException e) {
            // 异常处理示例
            throw new RuntimeException(e);
        }
    }

    return result;
}
```

在这种情况下，我们只需要创建一个不同的池来获取我们的futures。让我们用一个列表的阶乘_Callable_来测试这个：

```java
@Test
void givenForkExecutor_whenExecuteCallable_thenResultOk() {
    assertEquals(BigInteger.valueOf(126),
      forkExecutor.execute(Arrays.asList(new CallableFactorialTask(5), new CallableFactorialTask(3))));
}
```

然而，我们也可能决定如何分解我们的任务。我们可能想要根据某些标准来分解我们的计算，例如，根据输入参数或服务负载。

我们需要将任务重写为_ForkJoinTask_，所以我们将使用_RecursiveTask_：

```java
public class ForkFactorialTask extends RecursiveTask`````````<BigInteger>````````` {
    // 字段和构造函数

    @Override
    protected BigInteger compute() {

        BigInteger factorial = BigInteger.ONE;

        if (end - start > threshold) {

            int middle = (end + start) / 2;

            return factorial.multiply(new ForkFactorialTask(start, middle, threshold).fork()
              .join()
              .multiply(new ForkFactorialTask(middle + 1, end, threshold).fork()
                .join()));
        }

        return factorial.multiply(factorial(BigInteger.valueOf(start), BigInteger.valueOf(end)));
    }
}
```

如果应用了某个阈值，我们将细分我们的主要任务。然后我们可以使用_invoke()_方法来获取结果：

```java
ForkJoinPool forkJoinPool = ForkJoinPool.commonPool();
int result = forkJoinPool.invoke(forkFactorialTask);
```

另外，_submit()_或_execute()_也是一个选项。然而，我们总是需要_join()_命令来完成执行。

让我们也创建一个测试，我们将阶乘执行分解为子任务：

```java
@Test
void givenForkExecutor_whenExecuteRecursiveTask_thenResultOk() {
    assertEquals(BigInteger.valueOf(3628800), forkExecutor.execute(new ForkFactorialTask(10, 5)));
}
```

在这种情况下，我们将10的阶乘分解为两个任务。第一个将从1计算到5，而第二个将从6计算到10。

## 5. CompletableFuture
**自Java 8以来，Java通过引入_CompletableFuture_改进了多threading。它从_Future_执行中移除了样板代码，并添加了如链式或组合异步结果等功能。然而，最重要的是，我们现在可以为任何方法执行异步计算，因此我们不再局限于_Callable_。此外，我们可以将语义上不同的多个_Futures_结合起来。

### 5.1. _supplyAsync()_
使用_CompletableFuture_可以像这样简单：

```java
CompletableFuture`````````<BigInteger>````````` future = CompletableFuture.supplyAsync(() -> factorial(BigInteger.valueOf(10)));
...
BigInteger result = future.get();

```

我们不再需要_Callable_了。我们可以将任何lambda表达式作为参数传递。让我们使用_supplyAsync()_测试阶乘方法：

```java
@Test
void givenCompletableFuture_whenSupplyAsyncFactorial_thenResultOk() throws ExecutionException, InterruptedException {
    CompletableFuture`````````<BigInteger>````````` completableFuture = CompletableFuture.supplyAsync(() -> factorial(BigInteger.valueOf(10)));
    assertEquals(BigInteger.valueOf(3628800), completableFuture.get());
}
```

请注意，我们没有指定任何线程池。在这种情况下，将使用默认的_ForkJoinPool_。然而，我们可以指定一个_Executor_，例如，使用固定线程池：

```java
CompletableFuture``<String>`` future = CompletableFuture.supplyAsync(() -> factorial(BigInteger.valueOf(10)), Executors.newFixedThreadPool(1));

```

### 5.2. _thenCompose()_
我们也可以创建一个顺序_Futures_的链。假设我们有两个阶乘任务，第二个需要第一个的输入：

```java
CompletableFuture`````````<BigInteger>````````` completableFuture = CompletableFuture.supplyAsync(() -> factorial(BigInteger.valueOf(3)))
   .thenCompose(inputFromFirstTask -> CompletableFuture.supplyAsync(() -> factorial(inputFromFirstTask)));

BigInteger result = completableFuture.get();
```

我们可以使用_thenCompose()_方法将一个_CompletableFuture_的返回值用于链中的下一个。

让我们结合两个阶乘的执行。例如，我们从3开始，给我们6的阶乘作为下一个阶乘的输入：

```java
@Test
void givenCompletableFuture_whenComposeTasks_thenResultOk() throws ExecutionException, InterruptedException {
    CompletableFuture`````````<BigInteger>````````` completableFuture = CompletableFuture.supplyAsync(() -> factorial(BigInteger.valueOf(3)))
      .thenCompose(inputFromFirstTask -> CompletableFuture.supplyAsync(() -> factorial(inputFromFirstTask)));
    assertEquals(BigInteger.valueOf(720), completableFuture.get());
}
```

### 5.3. _allOf()_
有趣的是，我们可以使用静态方法_allOf()_并行执行多个_Futures_，它接受一个输入var-arg。

从多个执行中收集异步结果将像添加到_allOf()_并使用_join()_来完成任务一样简单：

```java
BigInteger result = allOf(asyncTask1, asyncTask2)
  .thenApplyAsync(fn -> factorial(factorialTask1.join()).add(factorial(new BigInteger(factorialTask2.join()))), Executors.newFixedThreadPool(1)).join();
```

注意，_allOf()_的返回类型是void。因此，我们需要从单个_Futures_中手动获取结果。此外，我们可以在同一个执行中运行具有不同返回类型的_Futures_。

为了测试，让我们加入两个不同的阶乘任务。为了演示，一个有数字输入，而第二个有字符串：

```java
@Test
void givenCompletableFuture_whenAllOfTasks_thenResultOk() {
    CompletableFuture`````````<BigInteger>````````` asyncTask1 = CompletableFuture.supplyAsync(() -> BigInteger.valueOf(5));
    CompletableFuture``<String>`` asyncTask2 = CompletableFuture.supplyAsync(() -> "3");

    BigInteger result = allOf(asyncTask1, asyncTask2)
      .thenApplyAsync(fn -> factorial(asyncTask1.join()).add(factorial(new BigInteger(asyncTask2.join()))), Executors.newFixedThreadPool(1))
        .join();

    assertEquals(BigInteger.valueOf(126), result);
}
```

## 6. 结论
在本教程中，我们看到了如何从线程返回一个对象。我们看到了如何使用与_Future_和线程池结合的_Callable_。_Future_包装了结果并等待所有任务完成。我们还看到了一个_ForkJoinPool_的例子，它可以将我们的执行优化为多个子任务。

Java 8中的_CompletableFuture_工作式类似，但也提供了新功能，如执行任何lambda表达式的可能性。它还允许我们链式和组合我们异步任务的结果。

最后，我们使用_Future_、_Fork_和_CompletableFuture_测试了一个简单的阶乘任务。

如往常一样，我们可以在GitHub上找到工作的代码示例。

![img](https://www.baeldung.com/wp-content/uploads/2023/06/baeldung-logo.png)![img](https://secure.gravatar.com/avatar/c69d1195809ba221a644df1e3d60f3ba?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)

OK