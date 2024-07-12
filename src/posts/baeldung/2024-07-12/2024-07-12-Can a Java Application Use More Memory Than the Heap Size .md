---
date: 2022-04-01
category:
  - Java
  - JVM
tag:
  - Java应用
  - 内存
  - 堆外内存
head:
  - - meta
    - name: keywords
      content: Java, JVM, 内存管理, 堆内存, 非堆内存
---
# Java应用程序可以使用超过堆大小的内存吗？ | Baeldung

Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK中的CRaC（检查点时协调恢复）项目可以通过创建应用程序的峰值性能检查点并恢复JVM实例到该点来帮助改善这些问题。

为了充分利用这一特性，BellSoft提供了为Java应用程序高度优化的容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。

这些现成的映像使我们能够轻松地在Spring Boot应用程序中集成CRaC：

**使用CRaC支持提高Java应用程序性能**

## 1. 概述

我们可能都注意到，在内存消耗方面，我们的Java应用程序的内存使用并不遵循我们基于-Xmx（最大堆大小）选项的严格指令。实际上，JVM不仅仅有堆这一个内存区域。

为了限制总内存使用，还有一些额外的内存设置需要注意，让我们从Java应用程序的内存结构和内存分配的来源开始。

## 2. Java进程的内存结构

Java虚拟机（JVM）的内存分为两个主要类别：堆和非堆。

堆内存是JVM内存中最知名的部分。它存储由应用程序创建的对象。JVM在启动时初始化堆。当应用程序创建新的对象实例时，该对象驻留在堆中，直到应用程序释放该实例。然后，垃圾收集器（GC）释放实例持有的内存。因此，堆大小根据负载变化，尽管我们可以使用-Xmx选项配置JVM的最大堆大小。

非堆内存构成了其余部分。它允许我们的应用程序使用超过配置的堆大小的内存。JVM的非堆内存被划分为几个不同的区域。像JVM代码和内部结构、加载的分析代理代码、每个类的常量池结构、字段和方法的元数据以及方法和构造函数的代码，以及保留的字符串等数据都被归类为非堆内存。

值得一提的是，我们可以使用-XX选项调整非堆内存的某些区域，如-XX:MaxMetaspaceSize（在Java 7及更早版本中等同于-XX:MaxPermSize）。我们将在本教程中看到更多的标志。

除了JVM本身，还有其他区域的Java进程消耗内存。例如，堆外技术通常使用直接ByteBuffer来处理大内存，并将其保持在GC的控制之外。另一个来源是本地库使用的内存。

## 3. JVM的非堆内存区域

让我们继续了解JVM的非堆内存区域。

### 3.1. Metaspace

Metaspace是一个本地内存区域，用于存储类的元数据。当一个类被加载时，JVM将类的元数据，即其运行时表示，分配到Metaspace中。每当类加载器及其所有类从堆中移除时，它们在Metaspace中的分配可以被认为是由GC释放了。

**然而，释放的Metaspace并不一定返回给操作系统。** JVM可能会保留全部或部分内存，以便将来类加载时重用。

在Java 8之前的版本中，Metaspace被称为永久代（PermGen）。然而，与位于堆内存区域的Metaspace不同，PermGen位于一个特殊的堆区域。

### 3.2. 代码缓存

即时编译器（JIT）将其输出存储在代码缓存区域。JIT编译器将字节码编译为频繁执行的部分的本地代码，即热点。分层编译是在Java 7中引入的，它通过客户端编译器（C1）编译带有仪器的代码，然后服务器端编译器（C2）使用分析数据以优化方式编译代码。

分层编译的目标是混合使用C1和C2编译器，以实现快速启动时间和良好的长期性能。分层编译通过最多四倍增加需要在内存中缓存的代码量。从Java 8开始，默认情况下启用了JIT的分层编译，尽管我们仍然可以禁用分层编译。

### 3.3. 线程

线程栈包含每个执行方法的所有局部变量以及线程调用以到达当前执行点的方法。线程栈只能由创建它的线程访问。

从理论上讲，由于线程栈内存是运行线程数量的函数，并且线程数量没有限制，线程区域是无界的，可以占用大量的内存。实际上，操作系统限制了线程的数量，并且JVM根据平台为每个线程的栈内存大小设置了默认值。

### 3.4. 垃圾收集

JVM提供了一组GC算法，我们可以根据应用程序的用例选择使用。无论我们使用哪种算法，都会为GC进程分配一定量的本地内存，但使用的内存量会根据使用的垃圾收集器而变化。

### 3.5. 符号

JVM使用符号区域存储诸如字段名称、方法签名和保留的字符串等符号。在Java开发工具包（JDK）中，**符号存储在三个不同的表中**：

- 系统字典包含所有加载的类型信息，如Java类。
- 常量池使用符号表数据结构保存类、方法、字段和可枚举类型的加载符号。JVM维护一个称为运行时常量池的每个类型常量池，其中包含从编译时常量到运行时方法甚至字段引用的各种常量。
- 字符串表包含对所有常量字符串的引用，也称为保留字符串。

要了解字符串表，我们需要更多地了解字符串池。字符串池是JVM优化分配给_String_的内存量的机制，通过在池中仅存储每个文字_String_的一个副本，通过称为保留的过程。字符串池有两个部分：

- 保留字符串的内容作为常规_String_对象生活在Java堆中。
- 哈希表，即所谓的字符串表，被分配在堆外，并包含对保留字符串的引用。

换句话说，字符串池既有堆内部分也有堆外部分。堆外部分是字符串表。尽管它通常较小，但当我们有更多保留的字符串时，它仍然可能占用大量的额外内存。

### 3.6. Arena

Arena是JVM自己的基于Arena的内存管理实现，与glibc的Arena内存管理不同。它被JVM的一些子系统使用，如编译器和符号，或者当本地代码使用依赖于JVM Arenas的内部对象时。

### 3.7. 其他

所有其他无法归入本地内存区域的内存使用都归入这一部分。例如，《DirectByteBuffer》的使用在这里间接可见。

现在我们已经发现Java内存使用不仅仅局限于堆，我们将研究跟踪总内存使用的方法。发现可以通过使用随JDK提供的分析和内存监视工具来完成，然后，我们可以使用一些特定的调整来调整总使用量。

让们快速查看一下我们可以用于JVM内存监视的工具：

- _jmap_是一个命令行实用程序，用于打印运行中的VM或核心文件的内存映射。我们可以使用_jmap_来查询远程机器上的进程。然而，在JDK8引入_jcmd_之后，建议使用_jcmd_而不是_jmap_，以增强诊断并减少性能开销。
- _jcmd_用于向JVM发送诊断命令请求，这些请求对于控制Java飞行记录、故障排除和诊断JVM和Java应用程序非常有用。**_jcmd_不适用于远程进程**。我们将在本文中看到一些_jcmd_的特定用法。
- _jhat_通过启动本地web服务器来可视化堆转储文件。有几种方法可以创建堆转储，比如使用_jmap -dump_或_jcmd GC.heap_dump filename_。
- _hprof_能够展示CPU使用情况、堆分配统计和监视争用配置文件。根据请求的分析类型，_hprof_指示虚拟机收集相关的JVM工具接口（JVM TI）事件，并将事件数据处理成分析信息。

除了JVM附带的工具外，还有特定于操作系统的命令来检查进程的内存。_pmap_是Linux发行版中可用的工具，它提供了Java进程使用的内存的完整视图。

## 5. 本地内存跟踪

本地内存跟踪（NMT）是我们可以用来跟踪VM内部内存使用情况的JVM特性。NMT不跟踪所有本地内存使用情况，如第三方本地代码内存分配，但对于大量典型应用程序来说已经足够了。

要开始使用NMT，我们必须为我们的应用程序启用它：

```shell
java -XX:NativeMemoryTracking=summary -jar app.jar
```

_-XX:NativeMemoryTracking_的其他可用值是_off_和_detail_。请注意，启用NMT会有开销成本，这将影响性能。此外，NMT在所有malloced内存上添加了两个机器字作为malloc头。

然后我们可以使用_jps_或不带参数的_jcmd_来找到我们应用程序的进程ID（pid）：

```shell
jcmd
```

在我们找到应用程序的pid之后，我们可以继续使用_jcmd_，它提供了一长串选项来监视。让我们请求_jcmd_帮助查看可用选项：

```shell
jcmd ````````<pid>```````` help
```

从输出中，我们可以看到_jcmd_支持不同的类别，如编译器、GC、JFR、JVMTI、ManagementAgent和VM。一些选项，如_VM.metaspace_、_VM.native_memory_可以帮助我们进行内存跟踪。让我们探索其中的一些。

### 5.1. 本地内存摘要报告

最方便的是_VM.native_memory_。我们可以使用它来查看应用程序VM内部本地内存使用的摘要：

```shell
jcmd ````````<pid>```````` VM.native_memory summary
```

```shell
````````<pid>````````:
Native Memory Tracking:

Total: reserved=1779287KB, committed=503683KB
- Java Heap (reserved=307200KB, committed=307200KB)
  ...
- Class (reserved=1089000KB, committed=44824KB)
  ...
- Thread (reserved=41139KB, committed=41139KB)
  ...
- Code (reserved=248600KB, committed=17172KB)
  ...
- GC (reserved=62198KB, committed=62198KB)
  ...
- Compiler (reserved=175KB, committed=175KB)
  ...
- Internal (reserved=691KB, committed=691KB)
  ...
- Other (reserved=16KB, committed=16KB)
  ...
- Symbol (reserved=9704KB, committed=9704KB)
  ...
- Native Memory Tracking (reserved=4812KB, committed=4812KB)
  ...
- Shared class space (reserved=11136KB, committed=11136KB)
  ...
- Arena Chunk (reserved=176KB, committed=176KB)
  ...
- Logging (reserved=4KB, committed=4KB)
  ...
- Arguments (reserved=18KB, committed=18KB)
  ...
- Module (reserved=175KB, committed=175KB)
  ...
- Safepoint (reserved=8KB, committed=8KB)
  ...
- Synchronization (reserved=4235KB, committed=4235KB)
  ...

```

从输出中，我们可以看到JVM内存区域的摘要，如Java堆、GC和线程。“reserved”内存意味着通过_malloc_或_mmap_预先映射的总地址范围，因此这是该区域的最大可寻址内存。“committed”意味着正在积极使用的内存。

在这里，我们可以找到输出的详细解释。要查看内存使用的变化，我们可以使用_VM.native_memory baseline_和_VM.native_memory summary.diff_依次。

### 5.2. Metaspace和字符串表报告

我们可以尝试其他VM选项的_jcmd_，以了解本地内存的特定区域的概述，如Metaspace、符号和保留的字符串。

让我们尝试Metaspace：

```shell
jcmd ````````<pid>```````` VM.metaspace
```

我们的输出看起来像这样：

```shell
````````<pid>````````:
Total Usage - 1072 loaders, 9474 classes (1176 shared):
...
Virtual space:
  Non-class space:       38.00 MB reserved,      36.67 MB ( 97%) committed
      Class space:        1.00 GB reserved,       5.62 MB ( <1%) committed
             Both:        1.04 GB reserved,      42.30 MB (  4%) committed
Chunk freelists:
   Non-Class: ...
       Class: ...
Waste (percentages refer to total committed size 42.30 MB):
              Committed unused:    192.00 KB ( <1%)
        Waste in chunks in use:      2.98 KB ( <1%)
         Free in chunks in use:      1.05 MB (  2%)
     Overhead in chunks in use:    232.12 KB ( <1%)
                In free chunks:     77.00 KB ( <1%)
Deallocated from chunks in use:    191.62 KB ( <1%) (890 blocks)
                       -total-:      1.73 MB (  4%)
MaxMetaspaceSize: unlimited
CompressedClassSpaceSize: 1.00 GB
InitialBootClassLoaderMetaspaceSize: 4.00 MB
```

现在，让我们看看我们应用程序的字符串表：

```shell
jcmd ````````<pid>```````` VM.stringtable
```

让我们看看输出：

```shell
````````<pid>````````:
StringTable statistics:
Number of buckets : 65536 = 524288 bytes, each 8
Number of entries : 20046 = 320736 bytes, each 16
Number of literals : 20046 = 1507448 bytes, avg 75.000
Total footprint : = 2352472 bytes
Average bucket size : 0.306
Variance of bucket size : 0.307
Std. dev. of bucket size: 0.554
Maximum bucket size : 4
```

## 6. JVM内存调整

我们知道Java应用程序使用的总内存是堆分配和JVM或第三方库的一堆非堆分配的总和。

非堆内存在负载下不太可能改变大小。通常，我们的应用程序有稳定的非堆内存使用，一旦所有使用的类都加载了，JIT完全预热了。但是，我们可以使用一些标志来指示JVM如何在某些区域管理内存使用。

**_jcmd_提供了一个_VM.flag_选项，可以看到我们的Java进程已经拥有的哪些标志，包括默认值，因此我们可以用它作为工具来检查默认配置，并了解JVM是如何配置的：**

```shell
jcmd ````````<pid>```````` VM.flags
```

在这里，我们看到了使用的旗帜及其值：

```shell
````````<pid>````````:
-XX:CICompilerCount=4
-XX:ConcGCThreads=2
-XX:G1ConcRefinementThreads=8
-XX:G1HeapRegionSize=1048576
-XX:InitialHeapSize=314572800
...
```

让我们看看一些VM标志，用于不同区域的内存调整。

### **6.1. 堆**

我们有很多标志用于调整JVM堆。要配置最小和最大堆大小，我们有_Xms_（_XX:InitialHeapSize_）和_Xmx_（_XX:MaxHeapSize_）。如果我们希望将堆大小设置为物理内存的百分比，我们可以使用_XX:MinRAMPercentage_和_XX:MaxRAMPercentage_。**重要的是要知道，当我们分别使用_Xms_和_Xmx_选项时，JVM会忽略这两个。**

另一个可能影响内存分配模式的选项是_XX:+AlwaysPreTouch_。默认情况下，JVM最大堆在虚拟内存中分配，而不是物理内存。操作系统可能决定在没有写操作之前不分配内存。为了绕过这一点（特别是在有巨大的_DirectByteBuffers_的情况下，重新分配可能需要一些时间来重新排列操作系统的内存页），我们可以启用-XX:+AlwaysPreTouch。Pretouching在所有页面上写入“0”，迫使操作系统分配内存，而不仅仅是保留它。**Pretouching会导致JVM启动延迟，因为它以单线程工作。**

### **6.2. 线程栈**

线程栈是每个执行方法的所有局部变量的每个线程存储。我们使用**-Xss或_XX:ThreadStackSize_**选项来配置每个线程的栈大小。默认线程栈大小取决于平台，但在大多数现代64位操作系统中，它高达1 MB。

### 6.3. 垃圾收集

我们可以使用这些标志之一来设置应用程序的GC算法：_-XX:+UseSerialGC_、_-XX:+UseParallelGC_、_-XX:+UseParallelOldGC_、_-XX:+UseConcMarkSweepGC_或_-XX:+UseG1GC_。

如果我们选择G1作为GC，我们可以选择通过_-XX:+UseStringDeduplication_启用字符串去重。它可以节省相当大比例的内存。字符串去重仅适用于长期存在的实例。为了绕过这一点，我们可以使用_-XX:StringDeduplicationAgeThreshold_配置实例的有效年龄。_XX:StringDeduplicationAgeThreshold_的值表示GC周期存活的数量。

### **6.4. 代码缓存**

从Java 9开始，JVM将代码缓存分为三个区域。因此，JVM提供了特定的选项来调整它们中的每一个：

- _-XX:NonNMethodCodeHeapSize_配置非方法段，这是与JVM内部相关的代码。默认情况下，它大约是5 MB。
- _-XX:ProfiledCodeHeapSize_配置配置文件代码段，这是C1编译的代码，可能具有短暂的生命周期。默认大小约为122 MB。
- _-XX:NonProfiledCodeHeapSize_设置非配置文件段的大小，这是C2编译的代码，可能具有较长的生命周期。默认大小约为122 MB。

### **6.5. 分配器**

JVM首先预留内存，然后通过使用glibc的malloc和mmap修改内存映射，使这个“预留”的部分可用。预留和释放内存块的行为可能导致碎片化。分配内存的碎片化可能导致内存中有很多未使用的区域。

除了malloc，我们还可以使用其他分配器，如jemalloc或tcmalloc。jemalloc是一种通用的malloc实现，强调避免碎片化和可扩展的并发支持，因此它通常看起来比常规的glibc的malloc更智能