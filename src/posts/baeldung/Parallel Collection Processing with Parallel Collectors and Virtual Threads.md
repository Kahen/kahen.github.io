很抱歉，由于网络问题，我无法访问并解析您提供的链接。请您检查链接是否有效，并确保网页可以正常访问。如果链接有效且可访问，您可以重新发送链接，我将尽力为您提供所需的翻译服务。---
date: 2024-06-19
category:
  - Java
  - Concurrency
tag:
  - Virtual Threads
  - Parallel Collectors
head:
  - - meta
    - name: keywords
      content: Java, Virtual Threads, Parallel Collectors, Project Loom, JDK21, Stream API, concurrency, performance
---

# Java虚拟线程和并行收集器的并行集合处理

## 1. 引言

在之前的文章中，我们介绍了并行收集器，这是一个小型的零依赖库，它使得自定义线程池中的Stream API能够进行并行处理。

Project Loom是引入轻量级虚拟线程（之前称为Fibers）到JVM的有组织努力的代号，最终在JDK21中完成。

让我们看看如何利用这个技术在并行收集器中。

## 2. Maven依赖

如果我们想开始使用这个库，我们需要在Maven的_pom.xml_文件中添加一个单一条目：

```
`<dependency>`
    `<groupId>`com.pivovarit`</groupId>`
    `<artifactId>`parallel-collectors`</artifactId>`
    `<version>`3.0.0`</version>`
`</dependency>`
```

或者在Gradle的构建文件中的单行：

```
compile 'com.pivovarit:parallel-collectors:3.0.0'
```

最新版本可以在Maven Central找到。

### 3.1. 操作系统线程并行性

让我们看看为什么使用虚拟线程的并行处理是一个大问题。

我们将从一个简单的示例开始。我们需要一个要并行化的操作，这将是一个人工延迟的_String_连接：

```
private static String fetchById(int id) {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        // 无耻地忽略
    }
    return "user-" + id;
}
```

我们还将使用自定义代码来测量执行时间：

```
private static ``<T>`` T timed(Supplier``<T>`` supplier) {
    var before = Instant.now();
    T result = supplier.get();
    var after = Instant.now();
    log.info("Execution time: {} ms", Duration.between(before, after).toMillis());
    return result;
}
```

现在，让我们创建一个简单的并行_Stream_处理示例，我们将创建_n_个元素，然后在_n_个线程上并行处理它们，每个线程的并行度为_n_：

```
@Test
public void processInParallelOnOSThreads() {
    int parallelProcesses = 5_000;
    var e = Executors.newFixedThreadPool(parallelProcesses);

    var result = timed(() -> Stream.iterate(0, i -> i + 1).limit(parallelProcesses)
      .collect(ParallelCollectors.parallel(i -> fetchById(i), toList(), e, parallelProcesses))
      .join());

    log.info("", result);
}
```

当我们运行它时，我们可以观察到它显然完成了任务，因为我们不需要等待5000秒才能得到结果：

```
Execution time: 1321 ms
[user-0, user-1, user-2, ...]
```

但是让我们看看如果我们尝试将并行处理的元素数量增加到_20_000_会发生什么：

```
[2.795s][warning][os,thread] Failed to start thread "Unknown thread" - pthread_create failed (...)
[2.795s][warning][os,thread] Failed to start the native thread for java.lang.Thread "pool-1-thread-16111"
```

**基于操作系统线程的方法不具有可扩展性，因为线程的创建成本很高，我们很快就达到了资源限制。**

让我们看看如果我们切换到虚拟线程会发生什么。

### 3.2. 虚拟线程并行性

在Java 21之前，很难为线程池配置提出合理的默认值。幸运的是，虚拟线程不需要任何配置——我们可以创建尽可能多的线程，并且它们在内部使用共享的ForkJoinPool实例进行调度，使它们非常适合运行阻塞操作！

如果我们运行的是Parallel Collectors 3.x，我们可以轻松地利用虚拟线程：

```
@Test
public void processInParallelOnVirtualThreads() {
    int parallelProcesses = 5_000;

    var result = timed(() -> Stream.iterate(0, i -> i + 1).limit(parallelProcesses)
      .collect(ParallelCollectors.parallel(i -> fetchById(i), toList()))
      .join());
}

```

正如我们所看到的，**这就像省略_executor_和_parallelism_参数一样简单**，因为虚拟线程是默认的执行工具。

如果我们尝试运行它，我们可以看到它实际上**比原始示例完成得更快**：

```
Execution time: 1101 ms
[user-0, user-1, user-2, ...]
```

这是因为我们创建了5000个虚拟线程，它们使用一组非常有限的操作系统线程进行调度。

让我们尝试将并行度增加到_20_000_，这在传统的_Executor_中是不可能的：

```
Execution time: 1219 ms
[user-0, user-1, user-2, ...]
```

这不仅成功执行了，而且比操作系统线程上小四倍的工作完成得更快！

让我们将并行度增加到100_000，看看会发生什么：

```
Execution time: 1587 ms
[user-0, user-1, user-2, ...]
```

运行得很好，尽管观察到了显著的开销。

如果我们将并行级别增加到1_000_000呢？

```
Execution time: 6416 ms
[user-0, user-1, user-2, ...]
```

2_000_000？

```
Execution time: 12906 ms
[user-0, user-1, user-2, ...]
```

5_000_000？

```
Execution time: 25952 ms
[user-0, user-1, user-2, ...]
```

正如我们所看到的，**我们可以轻松地扩展到以前用操作系统线程无法实现的高并行级别。**这，以及在较小的并行工作负载上的性能改进，是利用虚拟线程进行阻塞操作并行处理的主要好处。

### 3.3. 虚拟线程和旧版本的并行收集器

利用虚拟线程的最简单方法是升级到可能的最新版本的库，但如果这不可能，我们也可以在JDK21上运行2.x.y版本时实现这一点。

诀窍是手动提供_Executors.newVirtualThreadPerTaskExecutor()_作为执行器，并提供_Integer.MAX_VALUE_作为最大并行级别：

```
@Test
public void processInParallelOnVirtualThreadsParallelCollectors2() {
    int parallelProcesses = 100_000;

    var result = timed(() -> Stream.iterate(0, i -> i + 1).limit(parallelProcesses)
      .collect(ParallelCollectors.parallel(
        i -> fetchById(i), toList(),
        Executors.newVirtualThreadPerTaskExecutor(), Integer.MAX_VALUE))
      .join());

    log.info("", result);
}
```

## 5. 结论

在这篇文章中，我们有机会看到如何轻松地利用虚拟线程与并行收集器库，事实证明，它比传统的基于操作系统线程的解决方案更好地扩展。我们的测试机器在大约~16000个线程时达到了资源限制，而扩展到数百万虚拟线程却很容易。

如常，代码示例可以在GitHub上找到。

文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。

OK