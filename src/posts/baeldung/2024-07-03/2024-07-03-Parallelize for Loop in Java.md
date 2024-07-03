---
date: 2023-07-31
category:
  - Java
  - Concurrency
tag:
  - for loop
  - parallelism
  - Java 8
head:
  - - meta
    - name: keywords
      content: Java, for loop, parallel processing, ExecutorService, Stream API, StreamSupport, performance, benchmarking
---
# Java中并行化for循环

## 1. 概述

有时，我们可能需要在for循环中处理大量的元素。顺序执行可能需要很长时间，并且使系统利用率不足。

在本教程中，我们将学习在Java中并行化for循环的不同方法，以提高应用程序在这种情况下的性能。

## 2. 顺序处理

让我们首先看看如何使用for循环顺序处理元素并测量处理元素所需的时间。

### 2.1. 使用for循环进行顺序处理

首先，我们将创建一个运行100次的for循环，并在每次迭代中执行一个重量级操作。

重量级操作的常见示例包括数据库调用、网络调用或CPU密集型操作。为了模拟重量级操作所需的时间，让我们在每次迭代中调用Thread.sleep()方法：

```java
public class Processor {

    public void processSerially() throws InterruptedException {
        for (int i = 0; i `< 100; i++) {
            Thread.sleep(10);
        }
    }
}
```

在上面的代码中，我们在每次迭代中调用Thread.sleep()方法。这会导致执行暂停10毫秒。当我们运行processSerially()方法时，顺序处理元素需要大量的时间。

我们将在接下来的部分中通过并行化for循环来优化这个方法。最后，我们将比较顺序处理和并行处理所需的时间。

## 3. 使用ExecutorService进行并行处理

ExecutorService是一个接口，表示异步执行机制。它允许我们提交任务以供执行，并提供管理它们的方法。

让我们看看如何使用ExecutorService接口来并行化for循环：

```java
void processParallelyWithExecutorService() throws InterruptedException {
    ExecutorService executorService = Executors.newFixedThreadPool(10);
    List<CompletableFuture<Void>`> futures = new ArrayList<>();
    for (int i = 0; i `< 100; i++) {
        CompletableFuture<Void>` future = CompletableFuture.runAsync(() -> {
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, executorService);
        futures.add(future);
    }
    CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
    executorService.shutdown();
}
```

在上面的代码中需要注意以下几点：

- 我们使用newFixedThreadPool()方法创建了一个10个线程的线程池。
- 接下来，我们使用CompletableFuture.runAsync()方法将任务提交到线程池。runAsync()方法确保它提供的任务在单独的线程中异步运行。
- 该方法接受一个Callable或Runnable对象作为参数。在这种情况下，我们使用lambda表达式创建了一个Runnable对象。
- runAsync()方法返回一个CompletableFuture对象。我们将其添加到CompletableFuture对象列表中，以便稍后使用executorService实例中的线程池执行。
- 接下来，我们使用CompletableFuture.allOf()方法组合CompletableFuture对象，并在它们上调用join()操作。当执行join()时，进程等待所有CompletableFuture任务并行完成。
- 最后，我们使用shutdown()方法关闭执行服务。这个方法释放了线程池中的所有线程。

## 4. 使用Streams进行并行处理

Java 8引入了Stream API，它支持并行处理。让我们探索如何使用Stream API的parallel()方法来并行化for循环。

### 4.1. 使用并行流

让我们看看如何使用Stream API的parallel()方法来并行化for循环：

```java
void processParallelyWithStream() {
    IntStream.range(0, 100)
        .parallel()
        .forEach(i -> {
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
}
```

在上面的代码中，我们使用IntStream.range()方法创建了一个整数流。接下来，我们调用parallel()方法来并行化流。

最后，我们调用forEach()方法来处理流中的元素。对于每个元素，我们调用Thread.sleep()方法来模拟一个重量级操作。

### 4.2. 使用StreamSupport

另一种并行化for循环的方法是使用StreamSupport类。让我们看看同样的代码：

```java
void processParallelyWithStreamSupport() {
    Iterable``<Integer>`` iterable = () -> IntStream.range(0, 100).iterator();
    Stream``<Integer>`` stream = StreamSupport.stream(iterable.spliterator(), true);
    stream.forEach(i -> {
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    });
}
```

StreamSupport类提供了一个stream()方法，它接受一个Iterable对象作为参数。此外，它还接受一个布尔参数，以指示流是否应该是并行的。

在这里，我们使用IntStream.range()方法创建了一个Iterable对象。接下来，我们调用stream()方法来创建一个整数流。最后，我们调用forEach()方法来处理流中的元素。

parallel()方法和StreamSupport类的工作方式类似。它们在内部创建线程来处理流中的元素。创建的线程数量取决于系统中可用的核心数量。

## 5. 性能比较

现在我们已经看到了并行化for循环的不同方法，让我们比较每种方法的性能。为此，我们将使用Java Microbenchmark Harness (JMH)。首先，我们需要将JMH依赖项添加到我们的项目中。

接下来，让我们将@BenchmarkMode注解添加到我们的方法中，并启用它们以用于平均时间的基准测试：

```java
@Benchmark
@BenchmarkMode(Mode.AverageTime)
public void processSerially() throws InterruptedException {
    for (int i = 0; i < 100; i++) {
        Thread.sleep(10);
    }
}
```

类似地，我们也对所有并行处理方法执行相同的操作。

要运行基准测试，让我们创建一个main()方法并设置JMH：

```java
class Benchmark {
    public static void main(String[] args) {
        try {
            org.openjdk.jmh.Main.main(new String[] { "com.baeldung.concurrent.parallel.Processor" });
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
```

从我们的main()方法中，我们调用JMH的main()方法，并将Processor类的路径作为参数传递。这告诉JMH在Processor类的基准测试方法上运行。

当我们运行main()方法时，我们看到了以下结果：

![img](https://www.baeldung.com/wp-content/uploads/2023/07/benchmarking-results.png)

正如我们从上述结果中看到的，使用并行处理元素所需的时间远少于顺序处理所需的时间。

值得注意的是，**处理元素所需的时间可能因系统而异**。这取决于系统中可用的核心数量。

另外，**每次运行中每种并行方法所需的时间可能会有所不同，这些数字并不是这些方法之间的确切比较**。

## 6. 结论

在本文中，我们探讨了在Java中并行化for循环的不同方法。我们探索了如何使用ExecutorService接口、Stream API和StreamSupport实用工具来并行化for循环。最后，我们使用JMH比较了每种方法的性能。

如往常一样，示例代码可在GitHub上找到。