---
date: 2022-04-01
category:
  - Java
  - JVM
tag:
  - CRaC
  - Java性能
  - 线程管理
head:
  - - meta
    - name: keywords
      content: Java, JVM, 线程, 性能优化, CRaC
---
# 获取当前JVM中所有运行的线程

Java应程序以其启动缓慢和预热时间长而闻名。OpenJDK中的CRaC（检查点的协调恢复）项目可以通过**创建应用程序峰值性能的检查点**并恢复JVM实例到该点来帮助改善这些问题。

要充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。

这些即用型镜像使我们能够轻松地在Spring Boot应用程序中**集成CRaC**：

**使用CRaC支持提高Java应用程序性能**

## 1. 概述

在本简短教程中，我们将学习如何获取当前JVM中所有运行的线程，包括不是由我们的类启动的线程。

## 2. 使用_Thread_类

_Thread_类的_getAllStackTrace()_方法提供了所有运行线程的堆栈跟踪。它返回一个其键是_Thread_对象的_Map_，因此我们可以获取键集并简单地循环遍历其元素以获取有关线程的信息。

让我们使用_printf()_方法使输出更易读：

```java
Set`<Thread>` threads = Thread.getAllStackTraces().keySet();
System.out.printf("%-15s \t %-15s \t %-15s \t %s\n", "Name", "State", "Priority", "isDaemon");
for (Thread t : threads) {
    System.out.printf("%-15s \t %-15s \t %-15d \t %s\n", t.getName(), t.getState(), t.getPriority(), t.isDaemon());
}
```

输出将如下所示：

```plaintext
Name            \t State           \t Priority        \t isDaemon
main            \t RUNNABLE        \t 5               \t false
Signal Dispatcher \t RUNNABLE        \t 9               \t true
Finalizer       \t WAITING         \t 8               \t true
Reference Handler \t WAITING         \t 10              \t true
```

如我们所见，除了运行主程序的_thread main_之外，我们还有另外三个线程。这个结果可能因不同的Java版本而异。

让我们更多地了解这些其他线程：

- _Signal Dispatcher_：这个线程处理操作系统发送给JVM的信号。
- _Finalizer_：这个线程对不再需要释放系统资源的对象执行最终化。
- _Reference Handler_：这个线程将不再需要的对象放入队列，由_Finalizer_线程处理。

如果主程序退出，所有这些线程将被终止。

## 3. 使用Apache Commons的_ThreadUtils_类

我们还可以使用Apache Commons Lang库中的_ThreadUtils_类来实现相同的目标：

让我们将依赖项添加到我们的_pom.xml_文件中：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.14.0`</version>`
`</dependency>`
```

然后简单地使用_getAllThreads()_方法获取所有运行的线程：

```java
System.out.printf("%-15s \t %-15s \t %-15s \t %s\n", "Name", "State", "Priority", "isDaemon");
for (Thread t : ThreadUtils.getAllThreads()) {
    System.out.printf("%-15s \t %-15s \t %-15d \t %s\n", t.getName(), t.getState(), t.getPriority(), t.isDaemon());
}
```

输出与上述相同。

## 4. 结论

总之，我们学到了两种方法来获取当前JVM中所有运行的线程。