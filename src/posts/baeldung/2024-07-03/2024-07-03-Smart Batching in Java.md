---
date: 2022-04-01
category:
  - Java
  - Batch Processing
tag:
  - Smart Batching
  - Micro Batching
head:
  - - meta
    - name: keywords
      content: Java, Batching, Performance Optimization
---
# Java中的智能批处理

## 1. 概述

在本教程中，我们将了解智能批处理模式。首先，我们将看看微批处理及其优缺点，然后我们将看到智能批处理如何缓解其问题。我们还将使用简单的Java数据结构查看这两种模式的一些示例。

## 2. 微批处理

### 2.1. 什么是微批处理？

微批处理是一种针对由小任务突发组成的工作负载的系统优化技术。尽管它们具有很小的计算开销，但它们伴随着某种操作，支持每秒少量的请求，例如，写入I/O设备。

当我们采用微批处理模式时，我们避免了单独处理传入的任务。相反，我们**将它们聚合成一个批次，一旦足够大，就一起处理它们**。

通过这种分组技术，我们可以优化资源利用，特别是当涉及到I/O设备时。这种方法帮助我们缓解了逐个处理小任务突发时引入的延迟。

### 2.2. 它是如何工作的？

实现微批处理的最简单方法是将传入的任务缓存在一个集合中，例如一个_队列_。一旦集合超过由目标系统属性决定的某个大小，我们就收集所有任务直到那个限制，并一起处理它们。

让我们创建一个最小的_MicroBatcher_类：

```
class MicroBatcher {
    Queue```<String>``` tasksQueue = new ConcurrentLinkedQueue<>();
    Thread batchThread;
    int executionThreshold;
    int timeoutThreshold;

    MicroBatcher(int executionThreshold, int timeoutThreshold, Consumer<List```<String>```> executionLogic) {
        batchThread = new Thread(batchHandling(executionLogic));
        batchThread.setDaemon(true);
        batchThread.start();
        this.executionThreshold = executionThreshold;
        this.timeoutThreshold = timeoutThreshold;
    }

    void submit(String task) {
        tasksQueue.add(task);
    }

    Runnable batchHandling(Consumer<List```<String>```> executionLogic) {
        return () -> {
            while (!batchThread.isInterrupted()) {
                long startTime = System.currentTimeMillis();
                while (tasksQueue.size() < executionThreshold && (System.currentTimeMillis() - startTime) < timeoutThreshold) {
                    Thread.sleep(100);
                }
                List```<String>``` tasks = new ArrayList<>(executionThreshold);
                while (tasksQueue.size() > 0 && tasks.size() < executionThreshold) {
                    tasks.add(tasksQueue.poll());
                }
                executionLogic.accept(tasks);
            }
        };
    }
}
```

我们的批处理类有两个重要字段，_tasksQueue_和_batchThread_。

**我们选择_队列_实现为_ConcurrentLinkedQueue_，因为它提了并发访问，并且可以根据需要增长**。这是所有提交任务的存放地。在我们的情况下，我们把它们表示为简单的_String_对象，作为外部定义的_executionLogic_的参数提供。

此外，我们的_MicroBatcher_有一个专用的_线程_来处理批次。我们必须注意，任务提交和处理必须在不同的线程中完成。这种解耦是延迟最小化最重要的部分。**这是因为我们只让一个线程发出慢请求，而其余线程可以尽可能快地提交任务，因为它们不会被操作阻塞**。

最后，我们定义了_executionThreshold_和_timeoutThreshold_。第一个决定了在执行之前必须缓冲的任务数量。它的值取决于目标操作。例如，如果我们正在写入网络设备，阈值应该等于最大包大小。第二个是我们在处理任务之前等待任务缓冲的最长时间，即使_executionThreshold_还没有达到。

### 2.3. 优点和缺点

我们通过使用微批处理模式获得了许多好处。首先，它为我们提供了增加的吞吐量，因为任务的提交不受执行状态的影响，这意味着我们的系统更加响应。

此外，通过调整微批处理器，我们可以实现底层资源（例如，磁盘存储）的适当利用，并将其饱和到最佳水平。

最后，**它很好地符合现实世界的流量，流量很少是均匀的，通常以突发的形式出现**。

然而，这种实现最重要的缺点之一是，当系统不在负载下，例如在夜间，**即使是单个请求也被迫等待_timeoutThreshold_才能被处理**。这导致资源利用不足，最重要的是，用户体验差。

进入智能批处理，微批处理的修改版本。**区别在于我们省略了_timeoutThreshold_，而不是等待队列用任务填充，我们立即执行任何数量的任务，直到_executionThreshold_**。

通过这个简单的改变，我们避免了上述低流量延迟问题，同时仍然保持了微批处理的所有好处。原因是通常处理一批任务所需的时间足以使队列填充下一批。因此，我们有最优的资源使用，并避免了在所有待处理的任务都是单个任务的情况下阻止执行。

让我们将我们的_MicroBatcher_转换为_SmartBatcher_：

```
class SmartBatcher {
    BlockingQueue```<String>``` tasksQueue = new LinkedBlockingQueue<>();
    Thread batchThread;
    int executionThreshold;
    boolean working = false;
    SmartBatcher(int executionThreshold, Consumer<List```<String>```> executionLogic) {
        batchThread = new Thread(batchHandling(executionLogic));
        batchThread.setDaemon(true);
        batchThread.start();
        this.executionThreshold = executionThreshold;
    }

    Runnable batchHandling(Consumer<List```<String>```> executionLogic) {
        return () -> {
            while (!batchThread.isInterrupted()) {
                List```<String>``` tasks = new ArrayList<>(executionThreshold);
                while(tasksQueue.drainTo(tasks, executionThreshold) == 0) {
                    Thread.sleep(100);
                }
                working = true;
                executionLogic.accept(tasks);
                working = false;
            }
        };
    }
}
```

在我们的新实现中，我们改变了三件事。首先，我们移除了_timeoutThreshold_。其次，我们将我们的_队列_实现改为_BlockingQueue_。这些支持_drainTo()_方法，这对我们的需求非常合适。最后，我们利用这个方法简化了我们的_batchHandling()_逻辑。

## 4. 无批处理与批处理比较

让我们创建一个应用程序类，用一个简单的场景来测试直接方法与批处理方法：

```
class BatchingApp {
    public static void main(String[] args) throws Exception {
        final Path testPath = Paths.get("./test.txt");
        testPath.toFile().createNewFile();
        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(100);
        Set`<Future>` futures = new HashSet<>();
        for (int i = 0; i `< 50000; i++) {
            futures.add(executorService.submit(() ->` {
                Files.write(testPath, Collections.singleton(Thread.currentThread().getName()), StandardOpenOption.APPEND);
            }));
        }
        long start = System.currentTimeMillis();
        for (Future future : futures) {
            future.get();
        }
        System.out.println("Time: " + (System.currentTimeMillis() - start));
        executorService.shutdown();
    }
}
```

我们选择了一个简单的文件写入作为I/O操作。我们创建了一个_test.txt_文件，并使用_100_个线程写入了_50000_行。尽管控制台显示的时间将取决于目标硬件，但这里有一个示例：

```
Time (ms): 4968
```

即使尝试不同的线程计数，时间仍然大约是_4500_ ms。看来我们达到了我们硬件的极限。

现在让我们切换到_SmartBatcher_：

```
class BatchingApp {
    public static void main(String[] args) throws Exception {
        final Path testPath = Paths.get("./testio.txt");
        testPath.toFile().createNewFile();
        SmartBatcher batcher = new SmartBatcher(10, strings -> {
            List```<String>``` content = new ArrayList<>(strings);
            content.add("-----Batch Operation-----");
            Files.write(testPath, content, StandardOpenOption.APPEND);
        });

        for (int i = 0; i < 50000; i++) {
            batcher.submit(Thread.currentThread().getName() + "-1");
        }
        long start = System.currentTimeMillis();
        while (!batcher.finished());
        System.out.println("Time: " + (System.currentTimeMillis() - start));
    }
}

```

我们为_SmartBatcher_添加了一个_finished()_方法来检查何时完成所有任务：

```
boolean finished() {
    return tasksQueue.isEmpty() && !working;
}
```

这是显示的新时间：

```
Time (ms): 1053
```

即使使用_10_的_executionThreshold_，我们也实现了五倍的改进。将阈值增加到_100_将时间减少到~150 ms，比简单方法快了近50倍。

正如我们所看到的，采用一种利用底层硬件特性的简单技术可以极大地提高我们的应用程序性能。**我们应该始终牢记我们的系统正在做什么以及它正在处理的流量**。

## 5. 结论

在本文中，我们对任务批处理技术有了概述，特别是微批处理和智能批处理。我们看到了潜在的用例，微批处理的优缺点，以及智能批处理如何缓解其不足。最后，我们比较了简单的任务执行和批处理执行。

一如既往，本文的源代码可在GitHub上找到。
OK