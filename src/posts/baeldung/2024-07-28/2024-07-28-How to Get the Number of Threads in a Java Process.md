---
date: 2021-06-21
category:
  - Java
  - Concurrency
tag:
  - Java
  - Threads
  - Monitoring
head:
  - - meta
    - name: keywords
      content: Java, Threads, Monitoring, Performance
------
# 如何获取Java进程中的线程数

线程是Java中并发的基本单位。在大多数情况下，当创建多个线程以并行执行任务时，应用程序的吞吐量会增加。

然而，总有一个饱和点。毕竟，应用程序的吞吐量取决于CPU和内存资源。**超过一定限制后，增加线程数量可能会导致高内存使用、线程上下文切换等问题。**

因此，在排查Java应用程序中的高内存问题时，监控线程数量是一个不错的起点。在本教程中，我们将探讨一些检查Java进程创建的线程数量的方法。

## 2. 图形化Java监控工具

查看Java中线程数量的最简单方法是使用像Java VisualVM这样的图形化工具。**除了应用程序线程外，Java VisualVM还列出了GC或应用程序使用的其他线程，如JMX线程。**

此外，它还显示了线程状态及其持续时间的统计信息：

![img](https://www.baeldung.com/wp-content/uploads/2021/06/JvisualVM.png)

监控线程数量是Java VisualVM中最基本的功能。一般来说，图形化工具更加高级，允许实时监控应用程序。例如，Java VisualVM允许我们对CPU堆栈跟踪进行采样，从而找到可能导致CPU瓶颈的类或方法。

Java VisualVM随Windows机器上的JDK安装一起分发。**对于部署在Linux上的应用，我们需要远程连接到应用程序。这需要JMX VM参数。**

因此，如果应用程序已经在没有这些参数的情况下运行，这些工具将无法工作。在后面的部分，我们将看到如何使用命令行工具获取线程数量。

## 3. Java API

在某些用例中，我们可能希望在应用程序本身内找到线程数量。例如，在监控仪表板中显示或在日志中公开。

在这种情况下，我们依赖Java API来获取线程计数。幸运的是，Thread类中有`activeCount()` API：

```java
public class FindNumberofThreads {
    public static void main(String[] args) {
        System.out.println("Number of threads " + Thread.activeCount());
    }
}
```

输出将是：

```
Number of threads 2
```

值得注意的是，如果我们在Java VisualVM中看到Java的线程数量，我们会看到相同应用程序的线程数量更多。**这是因为`activeCount()`只返回同一ThreadGroup中的线程数量。Java将所有线程分组以便于管理。**

在这个例子中，我们只有父ThreadGroup，即`main:`：

```java
public static void main(String[] args) {
    System.out.println("Current Thread Group - " + Thread.currentThread().getThreadGroup().getName());
}
```

```
Current Thread Group - main
```

如果Java应用程序中有很多线程组，`activeCount()`不会给出正确的输出。例如，它不会返回GC线程的数量。

**在这种情况下，我们可以使用JMX API：**

```java
public static void main(String[] args) {
    System.out.println("Total Number of threads " + ManagementFactory.getThreadMXBean().getThreadCount());
}
```

这个API返回所有线程组的总线程数，包括GC、JMX等：

```
Total Number of threads 6
```

事实上，Java VisualVM等JMX图形化工具也使用相同的API获取数据。

## 4. 命令行工具

之前，我们讨论了Java VisualVM，这是一个分析应用程序中实时线程的图形化工具。尽管它是一个用于线程实时可视化的伟大工具，但它对应用程序性能有轻微的影响。**因此，不推荐在生产环境中使用。**

此外，正如我们所讨论的，Java VisualVM需要在Linux上进行远程连接。事实上，在某些情况下，它需要额外的配置。例如，在Docker或Kubernetes中运行的应用程序将需要额外的服务和端口配置。

在这种情况下，我们必须依赖主机环境中的命令行工具来获取线程计数。

**幸运的是，Java提供了一些命令来获取线程转储。我们可以将线程转储分析为文本文件，或使用线程转储分析器工具来检查线程数量及其状态。**

Alibaba Arthas是另一个很棒的命令行工具，它不需要远程连接或任何特殊配置。

此外，我们还可以从一些Linux命令中获取线程信息。**例如，我们可以使用top命令来显示任何Java应用程序的所有线程：**

```shell
top -H -p 1
```

这里，`-H`是命令行选项，用于显示Java进程中的每个线程。如果没有这个标志，top命令将显示进程中所有线程的合并统计信息。`-p`选项通过目标应用程序的进程ID过滤输出：

```
top - 15:59:44 up 7 days, 19:23,  0 users,  load average: 0.52, 0.41, 0.36
Threads:  37 total,   0 running,  37 sleeping,   0 stopped,   0 zombie
%Cpu(s):  3.2 us,  2.2 sy,  0.0 ni, 93.4 id,  0.8 wa,  0.0 hi,  0.3 si,  0.0 st
MiB Mem :   1989.2 total,    110.2 free,   1183.1 used,    695.8 buff/cache
MiB Swap:   1024.0 total,    993.0 free,     31.0 used.    838.8 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   1 flink     20   0 2612160 304084  29784 S   0.0  14.9   0:00.07 java
  275 flink     20   0 2612160 304084  29784 S   0.0  14.9   0:02.87 java
  276 flink     20   0 2612160 304084  29784 S   0.0  14.9   0:00.37 VM Thread
  277 flink     20   0 2612160 304084  29784 S   0.0  14.9   0:00.00 Reference Handl
  278 flink     20   0 2612160 304084  29784 S   0.0  14.9   0:00.00 Finalizer
  279 flink     20   0 2612160 304084  29784 S   0.0  14.9   0:00.00 Signal Dispatch
```

如上所见，它显示了线程ID，即_PID_和每个线程的CPU和内存使用情况。与Java VisualVM类似，top命令将列出所有线程，包括GC、JMX或任何其他子进程。

要找到我们在上面命令中用作参数的进程ID，我们可以使用_ps_命令：

```shell
ps -ef | grep java
```

**事实上，我们可以使用_ps_命令列出线程：**

```shell
ps -e -T | grep 1
```

_PS_命令的_-T_选项告诉_ps_命令列出应用程序启动的所有线程：

```
1     1 ?        00:00:00 java
1   275 ?        00:00:02 java
1   276 ?        00:00:00 VM Thread
1   277 ?        00:00:00 Reference Handl
1   278 ?        00:00:00 Finalizer
1   279 ?        00:00:00 Signal Dispatch
1   280 ?        00:00:03 C2 CompilerThre
1   281 ?        00:00:01 C1 CompilerThre
```

这里，第一列是PID，第二列显示每个线程的Linux线程ID。

## 5. 结论

在本文中，我们看到了有多种方法可以找到Java应用程序中的线程数量。**在大多数情况下，使用如_top_或_ps_命令行选项应该是首选方式。**

然而，在某些情况下，我们也可能需要像Java VisualVM这样的图形化工具。所有代码示例都可以在GitHub上找到。