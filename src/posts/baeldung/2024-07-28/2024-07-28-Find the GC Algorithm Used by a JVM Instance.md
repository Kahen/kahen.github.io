---
date: 2022-04-01
category:
  - Java
  - JVM
tag:
  - GC算法
  - JVM实例
head:
  - - meta
    - name: keywords
      content: JVM, GC算法, Java性能, CRaC项目
---
# JVM实例使用的GC算法查找方法

Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（协调恢复检查点）项目可以通过**创建应用程序峰值性能的检查点**并恢复JVM实例到该点来帮助改善这些问题。

为了充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。

这些现成的镜像使我们能够轻松地在Spring Boot应用程序中**集成CRaC**：

**通过CRaC支持提高Java应用程序性能**

## 1. 概述

除了编译器和运行时等典型开发工具外，每个JDK版本都附带了众多其他工具。其中一些工具可以帮助我们获得有关运行中应用程序的宝贵见解。

在本文中，我们将看到如何使用这些工具来更多地了解特定JVM实例使用的GC算法。

## 2. 示例应用程序

在本文中，我们将使用一个非常简单的应用程序：

```java
public class App {
    public static void main(String[] args) throws IOException {
        System.out.println("Waiting for stdin");
        int read = System.in.read();
        System.out.println("I'm done: " + read);
    }
}
```

显然，这个应用程序等待并持续运行，直到它从标准输入接收到某些内容。这种挂起帮助我们模拟长时间运行的JVM应用程序的行为。

为了使用这个应用程序，我们必须使用`javac`编译`App.java`文件，然后使用`java`工具运行它。

## 3. 查找JVM进程

**要查找JVM进程使用的GC，首先，我们应该确定该特定JVM实例的进程ID。**假设我们使用以下命令运行了我们的应用程序：

```shell
>> java App
Waiting for stdin
```

如果我们安装了JDK，找到JVM实例进程ID的最佳方式是使用`jps`工具。例如：

```shell
>> jps -l
69569
48347 App
48351 jdk.jcmd/sun.tools.jps.Jps
```

如上所示，系统上运行着三个JVM实例。显然，第二个JVM实例的描述（"App"）与我们的应用程序名称匹配。因此，我们要找的进程ID是48347。

除了`jps`，我们也可以使用其他通用实用程序来过滤运行中的进程。例如，来自procps包的著名`ps`工具也可以工作：

```shell
>> ps -ef | grep java
502 48347 36213   0  1:28AM ttys037    0:00.28 java App
```

然而，`jps`更易于使用，需要的过滤更少。

现在我们知道了如何找到进程ID，让我们找到已经运行的JVM应用程序使用的GC算法。

### 4.1. Java 8及更早版本

**如果我们使用的是Java 8，我们可以使用`jmap`工具来打印堆摘要、堆直方图，甚至生成堆转储**。为了找到GC算法，我们可以使用`-heap`选项如下：

```shell
>> jmap -heap ```<pid>```
```

所以在我们的特定案例中，我们使用的是CMS GC：

```shell
>> jmap -heap 48347 | grep GC
Concurrent Mark-Sweep GC
```

对于其他GC算法，输出几乎相同：

```shell
>> jmap -heap 48347 | grep GC
Parallel GC with 8 thread(s)
```

### 4.2. Java 9+: `jhsdb jmap`

**从Java 9开始，我们可以使用`jhsdb jmap`组合来打印有关JVM堆的一些信息。**更具体地说，这个特定命令将等同于前一个命令：

```shell
>> jhsdb jmap --heap --pid ```<pid>```
```

例如，现在我们的应用程序运行的是G1GC：

```shell
>> jhsdb jmap --heap --pid 48347 | grep GC
Garbage-First (G1) GC with 8 thread(s)
```

### 4.3. Java 9+: `jcmd`

在现代JVM中，`jcmd`命令非常多功能。例如，**我们可以使用它来获取有关堆的一些通用信息**：

```shell
>> jcmd ```<pid>``` VM.info
```

所以如果我们传递应用程序的进程ID，我们可以看到这个JVM实例正在使用Serial GC：

```shell
>> jcmd 48347 VM.info | grep gc
# Java VM: OpenJDK 64-Bit Server VM (15+36-1562, mixed mode, sharing, tiered, compressed oops, serial gc, bsd-amd64)
// omitted
```

对于G1或ZGC，输出类似：

```shell
// ZGC
# Java VM: OpenJDK 64-Bit Server VM (15+36-1562, mixed mode, sharing, tiered, z gc, bsd-amd64)
// G1GC
# Java VM: OpenJDK 64-Bit Server VM (15+36-1562, mixed mode, sharing, tiered, compressed oops, g1 gc, bsd-amd64)
```

通过一点`grep`技巧，我们也可以去除所有这些噪音，只获取GC名称：

```shell
>> jcmd 48347 VM.info | grep -ohE "[^\s^,]+\\sgc"
g1 gc
```

### 4.4. 命令行参数

有时，我们（或别人）在启动JVM应用程序时明确指定GC算法。例如，我们在这里选择使用ZGC：

```shell
>> java -XX:+UseZGC App
```

在这种情况下，有更简单的方法来找到使用的GC。基本上，**我们所要做的就是找到应用程序执行的命令**。

例如，在基于UNIX的平台上，我们可以再次使用`ps`命令：

```shell
>> ps -p 48347 -o command=
java -XX:+UseZGC App
```

从上述输出中，很明显JVM正在使用ZGC。同样，**`jcmd`命令也可以打印命令行参数**：

```shell
>> jcmd 48347 VM.flags
84020:
-XX:CICompilerCount=4 -XX:-UseCompressedOops -XX:-UseNUMA -XX:-UseNUMAInterleaving -XX:+UseZGC // omitted
```

**令人惊讶的是，如上所示，这个命令将打印隐式和显式的参数和可调项**。所以即使我们没有明确指定GC算法，它也会显示所选的和默认的：

```shell
>> jcmd 48347 VM.flags | grep -ohE '\S*GC\s'
-XX:+UseG1GC
```

甚至更令人惊讶的是，这也适用于Java 8：

```shell
>> jcmd 48347 VM.flags | grep -ohE '\S*GC\s'
-XX:+UseParallelGC
```

## 5. 结论

在本文中，我们看到了不同的方式来查找特定JVM实例使用的GC算法。一些提到的方法与特定Java版本相关，一些是可移植的。

此外，我们还看到了几种查找进程ID的方法，这总是必需的。