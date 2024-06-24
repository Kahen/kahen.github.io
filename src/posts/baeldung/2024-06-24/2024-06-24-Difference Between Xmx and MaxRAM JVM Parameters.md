---
date: 2024-06-25
category:
  - Java
  - JVM
tag:
  - Xmx
  - MaxRAM
head:
  - - meta
    - name: keywords
      content: Java, JVM, Xmx, MaxRAM, 堆大小, 内存分配
------
# Java中Xmx与MaxRAM JVM参数的区别

## 1. 概述

堆大小是Java应用程序的一个关键参数。它直接影响我们可以使用多少内存，并间接影响应用程序的性能。例如，使用压缩指针、垃圾回收周期的数量和持续时间等。

在本教程中，我们将学习如何使用`-XX:MaxRAM`标志来提供更多的堆大小计算调整机会。这在容器内运行应用程序或在不同主机上运行时尤其重要。

## 2. 堆大小计算

配置堆的标记可以一起工作，也可以相互覆盖。理解它们之间的关系对于更深入地了解它们的用途非常重要。

### 2.1 使用`-Xmx`

控制堆大小的主要方式是`-Xmx`和`-Xms`标志，分别控制最大和初始大小。这是一个强大的工具，但不考虑机器或容器上的可用空间。假设我们在可用RAM从4GB到64GB的不同主机上运行应用程序。

没有`-Xmx`的情况下，JVM会自动为应用程序堆分配大约25%的可用RAM。然而，通常JVM分配的初始堆大小取决于各种参数：系统架构、JVM版本、平台等。

这种行为在某些情况下可能是不可取的。根据可用RAM，它可能会分配截然不同的堆。让我们检查一下在具有24GB RAM的机器上JVM默认分配了多少：

```shell
$ java -XX:+PrintFlagsFinal -version |\
grep -e '\bMaxHeapSize\|MinHeapSize\|InitialHeapSize'
   size_t InitialHeapSize   = 402653184    {product} {ergonomic}
   size_t MaxHeapSize       = 6442450944   {product} {ergonomic}
   size_t MinHeapSize       = 8388608      {product} {ergonomic}
```

JVM大约分配了6GB或25%，对我们的应用程序来说可能太多了。设置特定的最大堆也可能会造成问题。如果我们使用`-Xmx4g`，它可能对内存不足的主机失败，同时我们也不会得到我们可以拥有的额外内存：

```shell
$ java -XX:+PrintFlagsFinal -Xmx4g -version |\
grep -e '\bMaxHeapSize\|MinHeapSize\|InitialHeapSize'
   size_t InitialHeapSize   = 402653184    {product} {ergonomic}
   size_t MaxHeapSize       = 4294967296   {product} {command line}
   size_t MinHeapSize       = 8388608      {product} {ergonomic}
```

在某些情况下，这个问题可以通过使用脚本即时计算`-Xmx`来解决。然而，它绕过了JVM关于应用程序需求可能更精确的启发式算法。

### 2.2 使用`-XX:MaxRAM`

`-XX:MaxRAM`标志旨在解决上述问题。首先，它防止JVM在具有大量RAM的系统上过度分配内存。我们可以将这个标志视为“运行应用程序，但假设你最多只有X量的RAM”。

此外，`-XX:MaxRAM`允许JVM使用标准启发式算法来计算堆大小。让我们回顾一下前面的例子，但使用`-XX:MaxRAM`：

```shell
$ java -XX:+PrintFlagsFinal -XX:MaxRAM=6g -version |\
grep -e '\bMaxHeapSize\|MinHeapSize\|InitialHeapSize'
   size_t InitialHeapSize   = 100663296    {product} {ergonomic}
   size_t MaxHeapSize       = 1610612736   {product} {ergonomic}
   size_t MinHeapSize       = 8388608      {product} {ergonomic}
```

在这种情况下，JVM计算了最大堆大小，但假设我们只有6GB的RAM。注意我们不应该与`-XX:MaxRAM`一起使用`-Xmx`。因为`-Xmx`更具体，它会覆盖`-XX:MaxRAM`：

```shell
$ java -XX:+PrintFlagsFinal -XX:MaxRAM=6g -Xmx6g -version |\
grep -e '\bMaxHeapSize\|MinHeapSize\|InitialHeapSize'
   size_t InitialHeapSize   = 100663296    {product} {ergonomic}
   size_t MaxHeapSize       = 6442450944   {product} {command line}
   size_t MinHeapSize       = 8388608      {product} {ergonomic}
```

这个标志可以提高资源利用率和堆分配。然而，我们仍然无法控制应该将多少RAM分配给堆。

### 2.3 使用`-XX:MaxRAMPercentage`和`-XX:MinRAMPercentage`

现在我们可以控制并告诉JVM它应该考虑多少RAM。让我们定义我们的堆分配策略。`-XX:MaxRAM`标志与`-XX:MaxRAMPercentage`和`-XX:MinRAMPercentage`很好地配合使用。**它们提供了更多的灵活性，特别是在容器化环境中。**让我们尝试将其与`-XX:MaxRAM`一起使用，并将堆设置为可用RAM的50%：

```shell
$ java -XX:+PrintFlagsFinal -XX:MaxRAM=6g -XX:MaxRAMPercentage=50 -version |\
grep -e '\bMaxHeapSize\|MinHeapSize\|InitialHeapSize'
   size_t InitialHeapSize   = 100663296    {product} {ergonomic}
   size_t MaxHeapSize       = 3221225472   {product} {ergonomic}
   size_t MinHeapSize       = 8388608      {product} {ergonomic}
```

关于`-XX:MinRAMPercentage`有一个常见的误解。它并不像`-Xms`那样表现。尽管，假设它设置最小堆大小是合理的。让我们检查以下设置：

```shell
$ java -XX:+PrintFlagsFinal -XX:MaxRAM=16g -XX:MaxRAMPercentage=10 -XX:MinRAMPercentage=50 -version |\
grep -e '\bMaxHeapSize\|MinHeapSize\|InitialHeapSize'
   size_t InitialHeapSize   = 268435456    {product} {ergonomic}
   size_t MaxHeapSize       = 1719664640   {product} {ergonomic}
   size_t MinHeapSize       = 8388608      {product} {ergonomic}
```

我们设置了`-XX:MaxRAMPercentage`和`-XX:MinRAMPercentage`，但很明显只有`-XX:MaxRAMPercentage`在工作。**我们为堆分配了16GB RAM的10%。** 然而，如果我们将可用RAM减少到200MB，我们会得到不同的行为：

```shell
$ java -XX:+PrintFlagsFinal -XX:MaxRAM=200m -XX:MaxRAMPercentage=10 -XX:MinRAMPercentage=50 -version |\
grep -e '\bMaxHeapSize\|MinHeapSize\|InitialHeapSize'
   size_t InitialHeapSize   = 8388608      {product} {ergonomic}
   size_t MaxHeapSize       = 109051904    {product} {ergonomic}
   size_t MinHeapSize       = 8388608      {product} {ergonomic}
```

在这种情况下，堆大小由`-XX:MinRAMPercentage`控制。当可用RAM降至200MB以下时，这个标志开始生效。现在，我们可以将堆增加到75%：

```shell
$ java -XX:+PrintFlagsFinal -XX:MaxRAM=200m -XX:MaxRAMPercentage=10 -XX:MinRAMPercentage=75 -version |\
grep -e '\bMaxHeapSize\|MinHeapSize\|InitialHeapSize'
   size_t InitialHeapSize   = 8388608      {product} {ergonomic}
   size_t MaxHeapSize       = 134217728    {product} {ergonomic}
   size_t MinHeapSize       = 8388608      {product} {ergonomic}
```

如果我们对这样小的堆使用`-XX:MaxRAMPercentage`，我们会得到20MB的堆，这可能对我们的目的来说不够。**这就是为什么我们为大堆和小堆有不同标志的原因。**`-XX:MaxRAM`标志与它们配合得很好，给我们更多的控制。

## 3. 结论

控制堆大小对Java应用程序至关重要。分配更多的内存并不一定好；同时，分配不够内存也是坏的。

使用`-Xmx`、`-XX:MaxRAM`、`-XX:MaxRAMPercentage`和`-XX:MinRAMPercentage`可以帮助我们更好地调整应用程序并提高性能。