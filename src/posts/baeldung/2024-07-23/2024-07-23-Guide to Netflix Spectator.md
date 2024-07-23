---
date: 2024-07-23
category:
  - Java
  - Netflix Spectator
tag:
  - Spectator
  - 度量
  - 监控
head:
  - - meta
    - name: keywords
      content: Java, Netflix, Spectator, 度量, 监控
---
# Netflix Spectator使用指南

## 1. 概述

**Spectator 是一个用于代码度量和收集维度时间序列后端系统数据的库。** Spectator 最初由 Netflix 开发用于各种度量数据的收集，与之对应的后端系统主要是 Atlas。

在本教程中，我们将学习 Spectator 提供了什么以及我们如何使用它来收集度量数据。

## 2. Maven 依赖

在我们深入实际实现之前，让我们先在 _pom.xml_ 文件中添加 Spectator 依赖：

```
`<dependency>`
    `<groupId>`com.netflix.spectator`</groupId>`
    `<artifactId>`spectator-api`</artifactId>`
    `<version>`1.7.7`</version>`
`</dependency>`
```

_spectator-api_ 是 Spectator 核心库。

## 3. _Registry_、_Meter_ 和度量基础

在我们更深入地研究这个库之前，我们首先应该理解 _Registry, Meter_ 和度量的基础。

- _Registry_ 是我们维护一组度量的地方
- _Meter_ 用于收集关于我们应用程序的一组测量数据，例如 _Counter, Timer, Gauge_ 等。
- 度量是我们在 _Meter_ 上显示的个别测量数据，例如计数、持续时间、最大值、平均值等。

让我们进一步探索这些，并了解它们在 Spectator 库中的使用方式。

## 4. _Registry_

Spectator 库带有 _Registry_ 接口，有一些内置实现，例如 _DefaultRegistry_ 和 _NoopRegistry_。我们也可以根据自己的需求创建自定义 _Registry_ 实现。

_Registry_ 实现的使用方式如下：

```
Registry registry = new DefaultRegistry();
```

## 5. _Meter_

**_Meter_ 主要有两种类型，即主动和被动。**

### 5.1. 主动度量器

这些度量器用于测量某个事件的发生频率。我们有三种这样的度量器：

- _Counter_
- _Timers_
- _DistributionSummary_

### 5.2. 被动度量器

这些度量器用于在需要时获取度量的值。例如，运行中的线程数可能是我们想要测量的一个度量。我们有一种这样的度量器，_ Gauge_。

接下来，让我们详细探讨这些不同类型的度量器。

## 6. _Counter_

这些度量器测量事件发生的频率。例如，假设我们想要测量元素被插入或从列表中删除的频率。

首先，在初始化时将计数器注册到 _Registry_ 对象：

```
insertCounter = registry.counter("list.insert.count");
removeCounter = registry.counter("list.remove.count");
```

在这里，我们可以允许用户使用任何 _Registry_ 实现，使用依赖注入。

现在，我们可以分别对列表的添加或删除操作增加或减少 _Counter_ 度量器：

```
requestList.add(element);
insertCounter.increment();

requestList.remove(0);
removeCounter.increment();
```

通过这种方式，我们可以生成两个度量器，稍后，我们可以将度量数据推送到 _Atlas_ 进行可视化。

## 7. Timers

这些度量器用于测量某个事件所花费的时间。Spectator 支持两种类型的计时器：

- _Timer_
- _LongTaskTimer_

### 7.1. _Timer_

这些计时器主要用于测量短时事件。因此，它们通常在事件完成后测量所花费的时间。

首先，我们需要在 _Registry_ 中注册这个度量器：

```
requestLatency = registry.timer("app.request.latency");
```

接下来，我们可以调用 _Timer_ 的 _record()_ 方法来测量处理请求所花费的时间：

```
requestLatency.record(() -> handleRequest(input));
```

### 7.2. _LongTaskTimer_

这些计时器主要用于测量长时间运行任务的持续时间。因此，即使事件正在进行中，我们也可以查询这些计时器。这也是 _Gauge_ 的一种类型。当事件进行中时，我们可以看到诸如 _duration_ 和 _activeTasks_ 等度量。

同样，作为第一步，我们需要注册这个度量器：

```
refreshDuration = LongTaskTimer.get(registry, registry.createId("metadata.refreshDuration"));
```

接下来，我们可以使用 _LongTaskTimer_ 来开始和停止围绕长时间运行任务的测量：

```
long taskId = refreshDuration.start();
try {
    Thread.sleep(input);
    return "Done";
} catch (InterruptedException e) {
    e.printStackTrace();
    throw e;
} finally {
    refreshDuration.stop(taskId);
}
```

## 8. Gauges

正如我们之前讨论的，仪表是被动度量器。因此，这些在任何给定时间点为运行中的任务提供采样值。例如，如果我们想要知道 JVM 中运行的线程数或任何给定时间点的堆内存使用情况，我们会使用它。

我们有两种类型的仪表：

- 轮询仪表
- 活动仪表

### 8.1. 轮询仪表

这种类型的仪表在后台轮询运行任务的值。它在它监控的任务上创建了一个钩子。因此，不需要在这个仪表中更新值。

现在，让我们看看如何使用这个仪表来监控 _List_ 的大小：

```
PolledMeter.using(registry)
  .withName("list.size")
  .monitorValue(listSize);
```

在这里，_PolledMeter_ 是一个类，它允许使用 _monitorValue()_ 方法在后台轮询 _listSize_。进一步地，_listSize_ 是跟踪我们示例列表大小的变量。

### 8.2. 活动仪表

这种类型的仪表需要定期手动更新与监控任务更新相对应的值。以下是使用活动仪表的示例：

```
gauge = registry.gauge("list.size");
```

我们首先在 _Registry_ 中注册这个仪表。然后，们在列表中添加或删除元素时手动更新它：

```
list.add(element);
gauge.set(listSize);

list.remove(0);
gauge.set(listSize);
```

## 9. _DistributionSummary_

现在，我们将查看另一种称为 _DistributionSummary_ 的度量器。它跟踪事件的分布。这个度量器可以测量请求负载的大小。例如，我们将使用 _DistributionSummary_ 来测量请求的大小。

首先，一如既往地，在 _Registry_ 中注册这个度量器：

```
distributionSummary = registry.distributionSummary("app.request.size");
```

现在，我们可以像使用 _Timer_ 一样使用这个度量器来记录请求的大小：

```
distributionSummary.record((long) input.length());
handleRequest();
```

## 10. Spectator 与 Servo 与 Micrometer

Servo 也是一个用于测量不同代码度量的库。Spectator 是由 Netflix 构建的 Servo 的后继者。Spectator 最初是为 Java 8 推出的，从未来支持的角度来看，它是更好的选择。

这些 Netflix 库是市场上可用的各种选项之一，用于测量不同的度量。我们总是可以单独使用它们，或者我们可以选择像 Micrometer 这样的门面。Micrometer 允许用户轻松切换不同的度量测量库。因此，它也允许选择不同的后端监控系统。

## 11. 结论

在本文中，我们介绍了 Spectator，这是 Netflix 的一个度量测量库。我们还研究了它的各种主动和被动度量器的使用。我们可以将度量数据推送并发布到时间序列数据库 _Atlas_。

一如既往，本文的完整实现代码可以在 GitHub 上找到。