---
date: 2022-04-01
category:
  - Spring Boot
  - Java
tag:
  - Spring Boot
  - Memory Settings
head:
  - - meta
    - name: keywords
      content: Spring Boot, Java, Memory Settings
------
# Spring Boot 默认内存设置是什么？

## 1. 概述

在本教程中，我们将了解 Spring Boot 应用程序使用的默认内存设置。

通常，Spring 没有特定的内存配置，它运行在底层 Java 进程的配置下。因此，以下是我们可以配置 Java 应用程序内存的方式。

Java 进程或 JVM 的内存被分配到堆、栈、元空间、JIT 代码缓存和共享库中。

### 2.1. 堆

堆是对象存放直到被垃圾收集器收集的那部分内存。

默认的最小堆大小是 **8 MB 或物理内存的 1/64，范围在 8 MB 到 1 GB 之间**。

默认的最大堆大小是 **对于大于 192 MB 的物理内存，是物理内存的 1/4，否则是物理内存的 1/2**。

在堆内部，我们有托儿所大小限制，当超过这个限制时，会触发新生代垃圾收集。**其默认值是平台特定的**。

我们还有保留区域限制。这是总堆大小的百分比，当达到这个百分比时，足够长寿的对象会从新生代提升到老年代。**其默认值是 25%**。

自 Java 8 以来，我们还有元空间作为堆的一部分，所有类元数据都存储在这里。默认情况下，其 **最小值是平台依赖的，最大值是无限的**。

要覆盖最小堆、最大堆和元空间大小的默认值，请参阅有关配置堆大小的帖子。

我们可以使用 _-Xns_ 参数覆盖托儿所大小限制。由于托儿所是堆的一部分，其值不应大于 _-Xmx_ 值：
```shell
java -Xns:10m MyApplication
```

我们还可以使用 _-XXkeepAreaRatio_ 参数覆盖保留区域限制的默认值。例如，我们可以将其设置为 10%：
```shell
java -XXkeepAreaRatio:10 MyApplication
```

最后，这是如何在 Linux 上检查堆大小：
```shell
java -XX:+PrintFlagsFinal -version | grep HeapSize
```

在 Windows 上检查堆大小的命令将是：
```shell
java -XX:+PrintFlagsFinal -version | findstr HeapSize
```

### 2.2. 栈

它是为每个线程执行提供的内存量。**其默认值是平台特定的**。

因此，我们可以使用 _-Xss_ 参数定义线程栈大小。例如，我们可以将其分配为 512 kB：
```shell
java -Xss:512k MyApplication
```

然后我们可以在 Linux 上检查线程栈大小：
```shell
java -XX:+PrintFlagsFinal -version | grep ThreadStackSize
```

或者在 Windows 机器上做同样的事情：
```shell
java -XX:+PrintFlagsFinal -version | findstr ThreadStackSize
```

## 3. 结论

在本文中，我们学习了 Java 应用程序可用的各种堆和栈内存配置选项的默认值。

因此，在启动我们的 Spring Boot 应用程序时，我们可以根据我们的需求定义这些参数。

对于进一步的调整选项，我们参考官方指南。另外，有关所有配置参数的列表，请参阅此文档。