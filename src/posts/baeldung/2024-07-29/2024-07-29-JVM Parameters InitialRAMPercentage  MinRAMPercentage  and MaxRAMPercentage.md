---
date: 2022-04-01
category:
  - JVM参数
  - Java性能优化
tag:
  - InitialRAMPercentage
  - MinRAMPercentage
  - MaxRAMPercentage
head:
  - - meta
    - name: keywords
      content: JVM内存参数，Java应用性能，CRaC项目，BellSoft容器，Alpaquita Linux，Liberica JDK
---

# JVM参数：InitialRAMPercentage、MinRAMPercentage 和 MaxRAMPercentage

Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK中的CRaC（协调恢复检查点）项目可以通过创建应用程序在峰值性能时的检查点，并恢复JVM实例到该点来帮助改善这些问题。

为了充分利用这一特性，BellSoft提供了高度优化的Java应用程序容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。

这些现成的镜像使我们能够轻松地将CRaC集成到Spring Boot应用程序中：

**使用CRaC支持提高Java应用程序性能**

## 1. 概述

在本教程中，我们将讨论一些JVM参数，这些参数可以用来设置JVM的RAM百分比。

Java 8中引入的_InitialRAMPercentage_、_MinRAMPercentage_和_MaxRAMPercentage_参数有助于配置Java应用程序的堆大小。

_InitialRAMPercentage_ JVM参数允许我们配置Java应用程序的初始堆大小。它是物理服务器或容器总内存的百分比，以双精度值传递。

例如，如果我们为1 GB全内存的物理服务器设置-_XX:InitialRAMPercentage=50.0_，那么初始堆大小将大约是500 MB（1 GB的50%）。

首先，让我们检查JVM中_IntialRAMPercentage_的默认值：

```shell
$ docker run openjdk:8 java -XX:+PrintFlagsFinal -version | grep -E "InitialRAMPercentage"
   double InitialRAMPercentage                      = 1.562500                            {product}
```

然后，让我们为JVM设置50%的初始堆大小：

```shell
$ docker run -m 1GB openjdk:8 java -XX:InitialRAMPercentage=50.0 -XX:+PrintFlagsFinal -version | grep -E "InitialRAMPercentage"
   double InitialRAMPercentage                     := 50.000000                           {product}
```

需要注意的是，当我们配置-_Xms_选项时，JVM会忽略_InitialRAMPercentage_。

## 3. -XX:MinRAMPercentage

与名称不同，_MinRAMPercentage_参数允许设置在少量内存（少于200MB）下运行的JVM的最大堆大小。

首先，我们将探索_MinRAMPercentage_的默认值：

```shell
$ docker run openjdk:8 java -XX:+PrintFlagsFinal -version | grep -E "MinRAMPercentage"
   double MinRAMPercentage                      = 50.000000                            {product}
```

然后，我们使用该参数为总内存为100MB的JVM设置最大堆大小：

```shell
$ docker run -m 100MB openjdk:8 java -XX:MinRAMPercentage=80.0 -XshowSettings:VM -version

VM settings:
    Max. Heap Size (Estimated): 77.38M
    Ergonomics Machine Class: server
    Using VM: OpenJDK 64-Bit Server VM
```

同样，当为小内存服务器/容器设置最大堆大小时，JVM会忽略_MaxRAMPercentage_参数：

```shell
$ docker run -m 100MB openjdk:8 java -XX:MinRAMPercentage=80.0 -XX:MaxRAMPercentage=50.0 -XshowSettings:vm -version
VM settings:
    Max. Heap Size (Estimated): 77.38M
    Ergonomics Machine Class: server
    Using VM: OpenJDK 64-Bit Server VM
```

## 4. -XX:MaxRAMPercentage

_MaxRAMPercentage_参数允许设置在大量内存（大于200 MB）下运行的JVM的最大堆大小。

首先，让我们探索_MaxRAMPercentage_的默认值：

```shell
$ docker run openjdk:8 java -XX:+PrintFlagsFinal -version | grep -E "MaxRAMPercentage"
   double MaxRAMPercentage                      = 25.000000                            {product}
```

然后，我们可以使用该参数将500 MB总内存的JVM的最大堆大小设置为60%：

```shell
$ docker run -m 500MB openjdk:8 java -XX:MaxRAMPercentage=60.0 -XshowSettings:vm -version
VM settings:
    Max. Heap Size (Estimated): 290.00M
    Ergonomics Machine Class: server
    Using VM: OpenJDK 64-Bit Server VM
```

同样，对于大内存服务器/容器，JVM会忽略_MinRAMPercentage_参数：

```shell
$ docker run -m 500MB openjdk:8 java -XX:MaxRAMPercentage=60.0 -XX:MinRAMPercentage=30.0 -XshowSettings:vm -version
VM settings:
    Max. Heap Size (Estimated): 290.00M
    Ergonomics Machine Class: server
    Using VM: OpenJDK 64-Bit Server VM
```

## 5. 结论

在这篇短文中，我们讨论了JVM参数_InitialRAMPercentage_、_MinRAMPercentage_和_MaxRAMPercentage_的使用，这些参数用于设置JVM将用于堆的RAM百分比。

首先，我们检查了JVM上设置的标志的默认值。然后，我们使用JVM参数来设置初始和最大堆大小。