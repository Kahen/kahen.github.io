---
date: 2022-04-01
category:
  - Java
  - CRaC
tag:
  - Java .class 版本
  - Javap
  - Hexdump
head:
  - - meta
    - name: keywords
      content: Java .class 文件版本, Javap 命令, Hexdump 命令, Java 性能优化
---
# 如何查找 Java .class 文件的版本 | Baeldung

Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK 的 CRaC（在检查点协调恢复）项目可以通过创建应用程序在峰值性能时的检查点并恢复 JVM 实例到该点来帮助改善这些问题。

为了充分利用此功能，BellSoft 提供了高度优化的 Java 应用程序容器。这些容器打包了 Alpaquita Linux（一个为 Java 和云环境优化的全功能操作系统）和 Liberica JDK（基于 OpenJDK 的开源 Java 运行时）。

这些现成的镜像使我们能够轻松地在 Spring Boot 应用程序中集成 CRaC：

**使用 CRaC 支持提高 Java 应用程序的性能**

## **1. 概述**

在本教程中，我们将探讨如何找到 .class 文件的 Java 版本。此外，我们还将查看如何检查 jar 文件中的 Java 版本。

当 Java 文件被编译时，会生成一个 .class 文件。在某些情况下，我们需要找到编译后的类文件的 Java 版本。**每个 Java 主要版本都会为其生成的 .class 文件分配一个主版本号。**

在这个表中，我们将 .class 的主版本号映射到引入该类版本的 JDK 版本，并显示该版本号的十六进制表示：

| Java 版本 | 类主版本 | 十六进制 |
| --- | --- | --- |
| Java SE 18 | 62 | 003e |
| Java SE 17 | 61 | 003d |
| Java SE 16 | 60 | 003c |
| ... | ... | ... |

## **3. 使用 javap 命令检查 .class 版本**

让我们创建一个简单的类，并使用 JDK 8 构建它：

```java
public class Sample {
    public static void main(String[] args) {
        System.out.println("Baeldung tutorials");
    }
}
```

**为了识别类文件的版本，我们可以使用 Java 类文件反汇编工具 javap。**

这里是 javap 命令的语法：

```shell
javap [选项] [类名]
```

让我们以 Sample.class 为例检查版本：

```shell
javap -verbose Sample

// 省略输出 ...
Compiled from "Sample.java"
public class test.Sample
  minor version: 0
  major version: 52
// 省略 ...
```

正如我们在 javap 命令的输出中看到的，主版本是 52，表明它是 JDK8 的。

虽然 javap 提供了许多详细信息，我们只关心主版本。

对于任何基于 Linux 的系统，我们可以使用以下命令仅获取主版本：

```shell
javap -verbose Sample | grep major
```

类似地，对于 Windows 系统，这是我们可以使用的命令：

```shell
javap -verbose Sample | findstr major
```

这在我们的示例中给出了主版本 52。

**需要注意的是，此版本值并不表示应用程序是使用相应的 JDK 构建的。类文件版本可能与用于编译的 JDK 版本不同。**

**例如，如果我们使用 JDK11 构建代码，它应该产生一个版本为 55 的 .class 文件。但是，如果我们在编译期间传递 -target 8，那么 .class 文件的版本将是 52。**

## **4. 使用 hexdump 检查 .class 版本**

也可以使用任何十六进制编辑器检查版本。Java 类文件遵循规范。让我们看看它的结构：

```java
ClassFile {
    u4             magic;
    u2             minor_version;
    u2             major_version;
    // 其他细节
}
```

这里，类型 u1、u2 和 u4 分别表示一个无符号的一字节、两字节和四字节整数。

u4 是一个识别类文件格式的魔术数字。它的值是 0xCAFEBABE，u2 是主版本。

**对于基于 Linux 的系统，我们可以使用 hexdump 实用程序解析任何 .class 文件：**

```shell
hexdump -v Sample.class
0000000 ca fe ba be 00 00 00 34 00 22 07 00 02 01 00 0b
0000010 74 65 73 74 2f 53 61 6d 70 6c 65 07 00 04 01 00
... 省略 ...
```

在这个例子中，我们使用 JDK8 编译。第一行的索引 7 和 8 提供了类文件的主版本。因此，0034 是十六进制表示，JDK8 是相应的发布号（从我们之前看到的映射表）。

作为替代方案，**我们可以直接使用 hexdump 获取主版本号作为十进制：**

```shell
hexdump -s 7 -n 1 -e '"%d"' Sample.class
52
```

这里，输出 52 是对应于 JDK8 的类版本。

## **5. jar 文件的版本**

Java 生态系统中的 jar 文件包含了捆绑在一起的一系列类文件。为了找出 jar 是用哪个 Java 版本构建或编译的，**我们可以提取 jar 文件并使用 javap 或 hexdump 检查 .class 文件版本。**

jar 文件中还有一个 MANIFEST.MF 文件，其中包含有关使用的 JDK 的一些头信息。

例如，Build-Jdk 或 Created-By 头存储了 JDK 值，这取决于 jar 的构建方式：

```
Build-Jdk: 17.0.4
```

或

```
Created-By: 17.0.4
```

## **5. 结论**

在本文中，我们学习了如何查找 .class 文件的 Java 版本。我们看到了 javap 和 hexdump 命令及其用法，用于查找版本。此外，我们还查看了如何在 jar 文件中检查 Java 版本。