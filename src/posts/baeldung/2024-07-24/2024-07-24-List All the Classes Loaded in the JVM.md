---
date: 2022-04-01
category:
  - JVM
  - Java
tag:
  - CRaC
  - 性能优化
head:
  - - meta
    - name: keywords
      content: JVM, Java, CRaC, 性能优化, 类加载
---
# JVM中列出所有已加载的类

Java应用程序以其启动缓慢和预热时间长而闻名。OpenJDK的CRaC（在检查点协调恢复）项目可以通过**创建应用程序在性能峰值时的检查点**并**将JVM实例恢复到该点**来帮助改善这些问题。

为了充分利用这一特性，BellSoft提供了为Java应用程序高度优化的容器。这些容器打包了Alpaquita Linux（一个为Java和云环境优化的全功能操作系统）和Liberica JDK（基于OpenJDK的开源Java运行时）。

这些即用型镜像允许我们轻松地在Spring Boot应用程序中**集成CRaC**：

**使用CRaC支持提高Java应用程序性能**

## 1. 概述

在本教程中，我们将学习不同的技术来列出JVM中加载的所有类。例如，我们可以加载JVM的堆转储或将运行中的应用程序连接到各种工具，并列出在该工具中加载的所有类。此外，还有各种库可以以编程方式完成此操作。

我们将探索非编程和编程方法。

## 2. 非编程方法

### 2.1. 使用VM参数

列出所有加载的类最直接的方法可能是在控制台输出或文件中记录。

我们将使用以下JVM参数运行Java应用程序：

```
java ``<app_name>`` --verbose:class
```

```
[Opened /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]
[Loaded java.lang.Object from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]
[Loaded java.io.Serializable from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]
[Loaded java.lang.Comparable from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]
[Loaded java.lang.CharSequence from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]
[Loaded java.lang.String from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]
[Loaded java.lang.reflect.AnnotatedElement from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]
[Loaded java.lang.reflect.GenericDeclaration from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]
[Loaded java.lang.reflect.Type from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]
[Loaded java.lang.Class from /Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home/jre/lib/rt.jar]
................................
```

对于Java 9，我们将使用`-Xlog` JVM参数将加载的类记录到文件中：

```
java ``<app_name>`` -Xlog:class+load=info:classloaded.txt
```

### 2.2. 使用堆转储

我们将看到不同的工具如何使用JVM堆转储来提取类加载信息。但首先，我们将使用以下命令生成堆转储：

```
jmap -dump:format=b,file=/opt/tmp/heapdump.bin `<app_pid>`
```

上述堆转储可以在各种工具中打开以获取不同的指标。

在Eclipse中，我们将在Eclipse Memory Analyzer中加载堆转储文件`heapdump.bin`，并使用直方图接口：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/eclipse-histogram.png)

现在，我们将在Java VisualVM界面中打开堆转储文件`heapdump.bin`，并使用按实例或大小分类的类选项：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/heapdump-visualvm.png)

### 2.3. JProfiler

JProfiler是顶级的Java应用程序分析器之一，具有丰富的功能集，可以查看不同的指标。

在JProfiler中，我们可以**附加到运行的JVM或加载堆转储文件**并获取所有与JVM相关的指标，包括所有加载的类的名称。

我们将使用附加进程功能让JProfiler连接到运行中的应用程序_ListLoadedClass_：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/jprofiler-attach-process.png)

然后，我们将拍摄应用程序的快照，并使用它来获取所有加载的类：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/jprofiler-snapshot.png)

下面，我们可以使用堆步行者功能查看加载的类的实例计数：

![img](https://www.baeldung.com/wp-content/uploads/2021/11/jprofiler-heapwalker.png)

## 3. 编程方法

### 3.1. 仪器化API

Java提供了Instrumentation API，有助于获取应用程序的有价值指标。首先，我们需要创建并加载一个Java代理以获取应用程序中的_Instrumentation_接口实例。Java代理是一个在JVM上运行的程序的工具。

然后，我们需要调用_Instrumentation_方法_getInitiatedClasses(Classloader loader)_以获取特定类加载器类型的所有加载的类。

### 3.2. Google Guava

我们将看到Guava库如何使用当前类加载器获取加载到JVM中的所有类的列表。

让我们首先向我们的Maven项目添加Guava依赖项：

```
`<dependency>`
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``31.0.1-jre``</version>``
``</dependency>``
```

我们将使用当前类加载器实例初始化_ClassPath_对象：

```
ClassPath classPath = ClassPath.from(ListLoadedClass.class.getClassLoader());
Set`<ClassInfo>` classes = classPath.getAllClasses();
Assertions.assertTrue(4 < classes.size());
```

### 3.3. 反射API

我们将使用Reflections库扫描当前类路径并允许我们在运行时查询它。

让我们首先向我们的Maven项目添加_reflections_依赖项：

```
`<dependency>`
    ``<groupId>``org.reflections``</groupId>``
    ``<artifactId>``reflections``</artifactId>``
    ``<version>``0.10.2``</version>``
``</dependency>``
```

现在，我们将查看示例代码，该代码返回一个包下的类集合：

```
Reflections reflections = new Reflections(packageName, new SubTypesScanner(false));
Set`<Class>` classes = reflections.getSubTypesOf(Object.class)
  .stream()
  .collect(Collectors.toSet());
Assertions.assertEquals(4, classes.size());
```

## 4. 结论

在本文中，我们学习了列出JVM中加载的所有类的各种方法。首先，我们看到了如何使用VM参数记录加载的类列表。

然后，我们探索了各种工具如何加载堆转储或连接到JVM以显示各种指标，包括加载的类。最后，我们涵盖了一些Java库。

像往常一样，所有的代码都可以在GitHub上找到。