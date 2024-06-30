---
date: 2024-07-01
category:
  - Java
  - 性能监控
tag:
  - 堆转储
  - 线程转储
  - 核心转储
head:
  - - meta
    - name: keywords
      content: Java, 堆转储, 线程转储, 核心转储, JVM, 性能分析, 错误诊断
---

# Java中的堆转储、线程转储和核心转储的区别

在Java虚拟机（JVM）的帮助下，Java程序的内存管理变得简单。当出现错误时，我们可以从JVM获取转储文件以诊断错误。本教程将探讨三种常见的Java转储文件——堆转储、线程转储和核心转储——并了解它们的使用场景。

在运行时，JVM创建堆，其中包含运行中的Java应用程序中使用的对象的引用。堆转储包含了运行时所有使用中对象的当前状态的保存副本。

此外，它用于分析Java中的_OutOfMemoryError_错误。堆转储可以有两种格式——经典格式和便携式堆格式（PHD）。经典格式是可读的，而PHD是二进制的，需要工具进行进一步分析。此外，PHD是堆转储的默认格式。

现代堆转储还包含一些线程信息。从Java 6更新14开始，堆转储还包含线程的堆栈跟踪。堆转储中的堆栈跟踪将对象连接到使用它们的线程。

像Eclipse Memory Analyzer这样的分析工具包括支持检索这些信息。

### 2.1. 使用场景

堆转储可以帮助分析Java应用程序中的_OutOfMemoryError_。

让我们看一些示例代码，这些代码会抛出_OutOfMemoryError_：

```java
public class HeapDump {
    public static void main(String[] args) {
        List`<Integer>` numbers = new ArrayList<>();
        try {
            while (true) {
                numbers.add(10);
            }
        } catch (OutOfMemoryError e) {
            System.out.println("内存溢出错误发生了！");
        }
    }
}
```

在上面的示例代码中，我们创建了一个无限循环，直到堆内存被填满。我们知道，在Java中，`new`关键字有助于在堆上分配内存。

要捕获上述代码的堆转储，我们需要一个工具。**最常用的工具之一是_jmap_**。

首先，我们需要通过运行_jps_命令获取我们机器上所有运行中的Java进程的进程ID：

```shell
$ jps
```

上述命令将输出所有运行中的Java进程：

```shell
12789 Launcher
13302 Jps
7517 HeapDump
```

这里，我们感兴趣的是_HeapDump_进程。因此，让我们使用_jmap_命令和_HeapDump_进程ID来捕获堆转储：

```shell
$ jmap -dump:live,file=hdump.hprof 7517
```

上述命令在项目根目录下生成_hdump.hprof_文件。

最后，**我们可以使用像Eclipse Memory Analyzer这样的工具来分析转储文件**。

## 3. 线程转储

**线程转储包含了运行中的Java程序中所有线程在特定瞬间的快照**。

线程是进程的最小部分，它通过并发运行多个任务来帮助程序高效运行。

此外，线程转储可以帮助诊断Java应用程序中的效率问题。因此，它是分析性能问题的重要工具，特别是当应用程序运行缓慢时。

此外，它可以帮助检测陷入无限循环的线程。它还可以帮助识别死锁，即多个线程等待彼此释放资源。

此外，它可以识别某些线程没有获得足够CPU时间的情况。这可以帮助识别性能瓶颈。

### 3.1. 使用场景

这里有一个示例程序，可能由于长时间运行的任务而性能缓慢：

```java
public class ThreadDump {
    public static void main(String[] args) {
        longRunningTask();
    }

    private static void longRunningTask() {
        for (int i = 0; i `< Integer.MAX_VALUE; i++) {
            if (Thread.currentThread().isInterrupted()) {
                System.out.println("中断了！");
                break;
            }
            System.out.println(i);
        }
    }
}
```

在上面的示例代码中，我们创建了一个方法，它循环到_Integer.MAX_VALUE_并将值输出到控制台。**这是一个长时间运行的操作，可能会成为性能问题**。

**为了分析性能，我们可以捕获线程转储**。首先，让我们找到所有运行中的Java程序的进程ID：

```shell
$ jps
```

_jps_命令将所有Java进程输出到控制台：

```shell
3042 ThreadDump
964 Main
3032 Launcher
3119 Jps
```

我们对_ThreadDump_进程ID感兴趣。接下来，**让我们使用_jstack_命令和进程ID来获取线程转储**：

```shell
$ jstack -l 3042 >` slow-running-task-thread-dump.txt
```

上述命令捕获线程转储并将其保存在_txt_文件中，以便进一步分析。

## 4. 核心转储

**核心转储，也称为崩溃转储，包含了程序崩溃或突然终止时的快照**。

JVM运行字节码而不是本地代码。因此，Java代码不能导致核心转储。

然而，一些Java程序使用Java本地接口（JNI）直接运行本地代码。JNI可能因为外部库崩溃而导致JVM崩溃。我们可以在那一刻获取核心转储并分析它。

此外，**核心转储是操作系统级别的转储，可以用来找到JVM崩溃时本地调用的详细信息**。

### 4.1. 使用场景

让我们看一个使用JNI生成核心转储的示例。

首先，让我们创建一个名为_CoreDump_的类来加载本地库：

```java
public class CoreDump {
    private native void core();
    public static void main(String[] args) {
        new CoreDump().core();
    }
    static {
        System.loadLibrary("nativelib");
    }
}
```

接下来，让我们使用_javac_命令编译Java代码：

```shell
$ javac CoreDump.java
```

然后，让我们通过运行_javac -h_命令为本地方法实现生成头文件：

```shell
$ javac -h . CoreDump.java
```

最后，让我们用C实现一个将使JVM崩溃的本地方法：

```c
#include `<jni.h>`
#include "CoreDump.h"

void core() {
    int *p = NULL;
    *p = 0;
}

JNIEXPORT void JNICALL Java_CoreDump_core(JNIEnv *env, jobject obj) {
    core();
};
void main() {
}
```

让我们通过运行_gcc_命令编译本地代码：

```shell
$ gcc -fPIC -I"/usr/lib/jvm/java-17-graalvm/include" -I"/usr/lib/jvm/java-17-graalvm/include/linux" -shared -o libnativelib.so CoreDump.c
```

这将生成名为_libnativelib.so_的共享库。接下来，让我们使用共享库编译Java代码：

```shell
$ java -Djava.library.path=. CoreDump
```

**本地方法使JVM崩溃并在项目目录中生成了核心转储：**

```shell
// ...
# A fatal error has been detected by the Java Runtime Environment:
# SIGSEGV (0xb) at pc=0x00007f9c48878119, pid=65743, tid=65744
# C  [libnativelib.so+0x1119]  core+0x10
# Core dump will be written. Default location: Core dumps may be processed with
# "/usr/lib/systemd/systemd-coredump %P %u %g %s %t %c %h" (or dumping to /core-java-perf/core.65743)
# An error report file with more information is saved as:
# ~/core-java-perf/hs_err_pid65743.log
// ...
```

上述输出显示了崩溃信息和转储文件的位置。

## 5. 关键差异

以下是显示三种Java转储文件关键差异的摘要表：

| 转储类型 | 使用场景 | 包含内容 |
| --- | --- | --- |
| 堆转储 | 诊断内存问题，如_OutOfMemoryError_ | Java堆中对象的快照 |
| 线程转储 | 排查性能问题、线程死锁和无限循环 | JVM中所有线程状态的快照 |
| 核心转储 | 调试由本地库引起的崩溃 | JVM崩溃时的进程状态 |

## 6. 结论

在本文中，我们通过查看它们的用途，学习了堆转储、线程转储和核心转储之间的区别。此外，我们看到了具有不同问题的示例代码，并生成了转储文件以供进一步分析。每种转储文件都为排查Java应用程序的不同目的服务。

如常，示例的源代码可在GitHub上获得。