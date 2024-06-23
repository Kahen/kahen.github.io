---
date: 2024-06-24
category:
  - Java
  - 编程
tag:
  - Java Flight Recorder
  - JFR
  - Java 21
head:
  - - meta
    - name: keywords
      content: Java Flight Recorder, JFR, Java 21, 性能分析, 诊断工具
---

# Java Flight Recorder (JFR) 视图命令在 Java 21 中的使用 | Baeldung

## 1. 引言

Java Flight Recorder（JFR）是一个监控 JVM 及其上运行程序的性能分析和诊断工具。这是一个开发者用来监控其应用程序状态和性能的实用工具。

本教程将重点介绍 Java 21 中为 JFR 新引入的 _view_ 命令。

## 2. Java Flight Recorder (JFR)

Java Flight Recorder（JFR）是一个在 Java 7 中引入的低开销应用程序分析框架，作为实验性特性。它允许我们分析和理解我们程序的重要指标，例如垃圾收集模式、IO 操作、内存分配等。

### 2.1. Java Flight Recorder 是什么？

JFR 在 Java 应用程序运行时收集 JVM 中的事件信息，我们可以使用诊断工具分析结果。

JFR 监控应用程序并将分析结果记录在记录文件中。我们有两种方式指示 JFR 监控应用程序：

1. 使用命令行启动应用程序并启用 JFR。
2. 使用如 _jcmd_ 等诊断工具对已运行的 Java 应用程序进行监控。

**记录通常生成为 _.jfr_ 文件，然后可以通过 Java Mission Control (JMC) 工具或我们将在后续部分中看到的新 _view_ 命令进行分析。**

### 2.2. 从命令行录制

为了演示飞行记录，让我们编写一个小程序，它将对象插入到 _ArrayList_ 中，直到抛出 _OutOfMemoryError_：

```java
void insertToList(List`<Object>` list) {
    try {
        while (true) {
            list.add(new Object());
        }
    } catch (OutOfMemoryError e) {
        System.out.println("内存不足。退出");
    }
}
```

让我们使用标准 _javac_ 编译器编译程序：

```shell
javac -d out -sourcepath JFRExample.java
```

一旦生成了 _.class_ 文件，我们启动飞行记录器。我们向 _java_ 命令传递一些额外的参数，即 _-XX:+FlightRecorder_ 选项，以及一些额外参数来设置记录持续时间和记录将被存储的输出文件路径：

```shell
java -XX:StartFlightRecording=duration=200s,filename=flight.jfr -cp ./out/ com.baeldung.jfrview.JFRExample
```

我们的程序现在运行时启用了 JFR 以捕获事件和其他系统属性，JFR 将结果写入 _flight.jfr_ 文件。

### 2.3. 使用 _jcmd_ 工具录制

**_jcmd_ 诊断工具提供了一种替代方式来记录和分析我们的应用程序和 JVM 的性能。** 我们可以使用此工具向运行中的虚拟机注册诊断事件。

要使用 _jcmd_ 工具，我们需要应用程序正在运行，并且我们必须知道 _pid_：

```shell
jcmd `<pid|MainClass>` `<command>` [parameters]
```

_jcmd_ 工具识别的几个命令包括：

- **JFR.start** – 开始新的 JFR 记录
- **JFR.check** – 检查正在运行的 JFR 记录
- **JFR.stop** – 停止特定的 JFR 记录
- **JFR.dump** – 将 JFR 记录的内容复制到文件

每个命令都需要额外的参数。

现在让我们使用 _jcmd_ 工具创建一个记录。我们需要启动应用程序并找到正在运行进程的 _pid_。一旦我们有了 _pid_，我们开始记录：

```shell
jcmd 128263 JFR.start filename=recording.jfr
```

当我们捕获了相关事件后，我们可以停止记录：

```shell
jcmd 128263 JFR.stop filename=recording.jfr
```

## 3. 查看 JFR 记录文件

要查看和理解 _jfr_ 文件的结果，我们可以使用 Java Mission Control (JMC) 工具。JMC 工具附带了多种功能来分析和监控 Java 应用程序，**包括一个可以读取 JFR 文件并显示结果的视觉表示的诊断工具**：

## 4. _jfr_ 命令

_jfr_ 命令解析并打印飞行记录文件（_jfr_）到标准输出。虽然我们之前使用 Mission Control 工具进行视觉表示，但 _jfr_ 命令为我们提供了一种在控制台中过滤、总结并从飞行记录文件生成人类可读输出的方式。

### 4.1. 使用 _jfr_ 命令

_jfr_ 命令位于 _$JAVA_HOME_ 的 _bin_ 路径中。让我们看看它的语法：

```shell
$JAVA_HOME/bin/jfr [command] `<path>`
```

在接下来的部分中，我们将直接访问 _jfr_。

### 4.2. _jfr_ 命令

_jfr_ 之前有五个命令，分别是 _print_、_summary_、_metadata_、_assemble_ 和 _disassemble_。**_view_ 命令是新引入的第六个 _jfr_ 命令**。

_print_ 命令用于打印飞行记录的内容，它接受几个参数，包括输出格式（_json_/ _xml_ 等）、可能包括类别、事件和堆栈深度的范围过滤器：

```shell
jfr print [--xml|--json] [--categories ``<filters>``] [--events ``<filters>``] [--stack-depth `<depth>`] `````<file>`````
```

_summary_ 命令顾名思义，生成记录的摘要，包括发生的事件、磁盘空间利用率等：

```shell
jfr summary `````<file>`````
```

_metadata_ 命令生成有关事件的详细信息，例如它们的名称和类别：

```shell
jfr metadata `````<file>`````
```

最后，《assemble_ 和 _disassemble_ 命令用于将块文件组装成记录文件，反之亦然：

```shell
jfr assemble `<repository>` `````<file>`````
jfr disassemble [--max-chunks `<chunks>`] [--output `<directory>`] `````<file>`````
```

### 4.3. _jfr_ 命令示例

现在我们将看一个 _jfr_ 命令的示例，并生成我们的 JFR 文件的摘要：

```shell
$JAVA_HOME/bin/jfr summary recording.jfr

 版本：2.1
 块：1
 开始：2023-12-25 17:07:08 (UTC)
 持续时间：1 秒

 事件类型                              计数  大小（字节）
=============================================================
 jdk.NativeLibrary                         512         44522
 jdk.SystemProcess                         511         49553
 jdk.ModuleExport                          506          4921
 jdk.BooleanFlag                           495         15060
 jdk.ActiveSetting                         359         10376
 jdk.GCPhaseParallel                       162          4033
```

## 5. JDK 21 中的 _view_ 命令

Java 21 引入了 _view_ 命令，以便于从命令行分析 JFR 记录。这个新的 _view_ 命令消除了将记录下载到 JMC 工具中使用的需求，并附带了超过 70 个预构建选项。这些选项，随着时间的推移可能会增加，涵盖了应用程序的几乎所有重要方面，包括 JVM、应用程序本身以及应用程序的环境。

### 5.1. 查看选项的类别

我们可以将不同的 _view_ 选项大致分为三类，这些类别与 JMC 工具中显示的类似：

1. Java 虚拟机视图
2. 环境视图
3. 应用程序视图

### 5.2. JVM 视图

Java 虚拟机视图提供了对 JVM 属性的洞察，例如堆空间、垃圾收集、本地内存以及其他与编译器相关的指标。一些常见的 JVM 视图包括：

- _class-modifications_
- _gc-concurrent-phases_
- _compiler-configuration_
- _gc-configuration_
- _native-memory-committed_
- _gc-cpu-time_
- _compiler-statistics_
- _gc-pause-phases_
- _heap-configuration_

### 5.3. 环境视图

环境视图显示了 JVM 运行的主机系统的信息，例如 CPU 信息、网络利用率、系统属性、进程和信息。一些常见的环境视图包括：

- _cpu-information_
- _cpu-load_
- _jvm-flags_
- _container-configuration_
- _network-utilization_
- _system-processes_
- _system-properties_

### 5.4. 应用程序视图

应用程序视图提供了对应用程序代码的洞察，例如有关其线程使用、对象统计和内存利用的信息。一些常见的应用程序视图包括：

- _exception-count_
- _object-statistics_
- _allocation-by-thread_
- _memory-leaks-by-class_
- _thread-cpu-load_
- _thread-count_
- _thread-allocation_

### 5.5. _view_ 命令的结构

**_view_ 命令期望一个视图名称和记录文件的路径