---
date: 2022-04-01
category:
  - Java
  - Performance
tag:
  - CPU
  - Troubleshooting
head:
  - - meta
    - name: keywords
      content: Java, CPU, Performance, Troubleshooting
---
# Java程序高CPU使用率的可能根本原因

在本教程中，我们将处理Java程序中的高CPU使用率问题。我们将探讨潜在的根本原因以及如何排查这些场景。

## 2. 什么是高CPU使用率

在我们进一步讨论之前，我们必须定义我们认为的高CPU使用率是什么。毕竟，这个指标取决于程序正在做什么，并且可能会有很大的波动，甚至高达100%。

对于本文，我们将考虑这样一些情况：Windows任务管理器或Unix/Linux的`top`命令显示CPU使用率在90-100%之间长时间（从几分钟到几小时）的持续使用。此外，这种使用应该是不合理的——换句话说，程序不应该在进行密集的工作。

### 3.1. 实现错误

我们首先应该检查的是我们代码中可能存在的无限循环。由于多线程的工作方式，即使在这些情况下，我们的程序仍然可以保持响应。

一个潜在的陷阱是运行在应用程序服务器上（例如Tomcat这样的Servlet容器）的Web应用程序。尽管我们可能没有在代码中显式创建新线程，但应用程序服务器在单独的线程中处理每个请求。因此，即使一些请求陷入了循环，服务器仍然可以正确地处理新请求。**这可能会给我们一个错误的印象，认为一切运行正常，而实际上应用程序表现不佳，如果足够多的线程最终被阻塞，甚至可能会崩溃**。

### 3.2. 糟糕的算法或数据结构

另一个可能的实现问题是引入了性能差或与我们特定用例不兼容的算法或数据结构。

让我们看一个简单的例子：

```java
List```<Integer>``` generateList() {
    return IntStream.range(0, 10000000).parallel().map(IntUnaryOperator.identity()).collect(ArrayList::new, List::add, List::addAll);
}
```

我们使用`ArrayList`实现生成一个包含1000万个数字的简单列表。

接下来，让我们访问列表末尾附近的一个条目：

```java
List```<Integer>``` list = generateList();
long start = System.nanoTime();
int value = list.get(9500000);
System.out.printf("Found value %d in %d nanos\n", value, (System.nanoTime() - start));
```

由于我们使用的是`ArrayList`，索引访问非常快，我们得到一个消息表明了这一点：

```plaintext
Found value 9500000 in 49100 nanos
```

让我们看看如果列表实现从`ArrayList`更改为`LinkedList`会发生什么：

```java
List```<Integer>``` generateList() {
    return IntStream.range(0, 10000000).parallel().map(IntUnaryOperator.identity()).collect(LinkedList::new, List::add, List::addAll);
}
```

现在运行我们的程序，发现访问时间慢了很多：

```plaintext
Found value 9500000 in 4825900 nanos
```

**我们可以看到，仅仅通过一个小小的改变，我们的程序就变慢了100倍**。

尽管我们自己永远不会引入这样的改变，但其他开发人员可能不了解我们如何使用`generateList`，可能会这样做。**此外，我们可能甚至不拥有`generateList` API实现的所有权，因此无法控制它**。

### 3.3. 大型和连续的GC周期

**还有一些原因与我们的实现无关，甚至可能超出我们的控制范围**。其中之一是大型和连续的垃圾收集。

这取决于我们正在工作的系统类型及其使用情况。一个例子是一个聊天室应用程序，用户为每个发布的消息接收通知。在小规模上，一个简单的实现会工作得很好。

然而，如果我们的应用程序开始发展到数百万用户，每个用户都是多个房间的成员，**生成的通知对象的数量和速率将急剧增加**。这可以迅速饱和我们的堆，并触发停止世界的垃圾收集。当JVM在清理堆时，我们的系统停止响应，这降低了用户体验。

## 4. 排查CPU问题

正如上述示例所示，排查这些问题不能总是通过检查或调试代码来完成。然而，有一些工具我们可以使用，以获取我们的程序发生了什么以及可能的原因。

### 4.1. 使用分析器

**使用分析器始终是一个有效且安全的选择**。无论是GC周期还是无限循环，分析器都会迅速指向热点代码路径。

市场上有许多分析器，包括商业和开源的。Java Flight Recorder以及Java Mission Control和诊断命令工具是一套帮助我们直观排查这些问题的工具。

### 4.2. 运行线程分析

如果分析器不可用，**我们可以进行一些线程分析以识别罪魁祸首**。根据主机操作系统和环境，我们可以使用不同的工具，但通常有两个步骤：

1. 使用一个显示所有运行线程及其PID和CPU百分比的工具，以识别有问题的线程。
2. 使用一个JVM工具显示所有线程及其当前堆栈信息，以找到有问题的PID。

Linux的`top`命令就是这样一个工具。如果我们使用`top`命令，我们可以看到当前运行的进程，其中包括我们的Java进程：

```plaintext
PID  USER       PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
3296 User       20   0 6162828   1.9g  25668 S 806.3  25.6   0:30.88 java
```

我们注意到_PID_值3296。这个视图帮助我们从我们的程序中识别出高CPU使用率，但我们需要进一步挖掘，找出哪些线程有问题。

运行`top -H`给我们一个所有运行线程的列表：

```plaintext
 PID USER       PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
3335 User       20   0 6162828   2.0g  26484 R  65.3  26.8   0:02.77 Thread-1
3298 User       20   0 6162828   2.0g  26484 R  64.7  26.8   0:02.94 GC Thread#0
3334 User       20   0 6162828   2.0g  26484 R  64.3  26.8   0:02.74 GC Thread#8
3327 User       20   0 6162828   2.0g  26484 R  64.0  26.8   0:02.93 GC Thread#3
```

我们看到多个GC线程占用了CPU时间，以及我们的一个线程_Thread-1_，PID为3335。

要获取线程转储，我们可以使用_jstack_。如果我们运行_jstack -e 3296_，我们可以得到我们程序的线程转储。我们可以通过使用它的名称或其十六进制的PID来找到_Thread-1_：

```plaintext
"Thread-1" #13 prio=5 os_prio=0 cpu=9430.54ms elapsed=171.26s allocated=19256B defined_classes=0 tid=0x00007f673c188000 nid=0xd07 runnable [0x00007f671c25c000]
   java.lang.Thread.State: RUNNABLE
        at com.baeldung.highcpu.Application.highCPUMethod(Application.java:40)
        at com.baeldung.highcpu.Application.lambda$main$1(Application.java:61)
        at com.baeldung.highcpu.Application$$Lambda$2/0x0000000840061040.run(Unknown Source)
        at java.lang.Thread.run(java.base@11.0.18/Thread.java:829)
```

**注意PID 3335对应于十六进制的0xd07，并且是线程的_nid_值**。

使用线程转储的堆栈信息，我们现在可以锁定有问题的代码并开始修复它。

## 5. 结论

在本文中，我们讨论了Java程序中高CPU使用率的潜在根本原因。我们通过一些示例，并介绍了几种我们可以排查这些场景的方法。

如往常一样，本文的源代码可在GitHub上找到。