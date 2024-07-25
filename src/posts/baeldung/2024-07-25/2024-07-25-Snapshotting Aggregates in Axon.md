---
date: 2021-09-01
category:
  - Axon
  - Event Sourcing
tag:
  - Axon Framework
  - Snapshotting
head:
  - - meta
    - name: keywords
      content: Axon, Event Sourcing, Snapshotting, Aggregate
---

# Axon 中聚合快照的实现

在本文中，我们将探讨 Axon 如何支持聚合快照。我们认为这篇文章是我们关于 Axon 主要指南的扩展。因此，我们将再次使用 Axon Framework 和 Axon Server。我们将在本文的实现中使用前者，后者是事件存储和消息路由器。

聚合快照
让我们首先理解聚合快照的含义。当我们开始在应用程序中使用事件溯源时，一个自然的问题是如何使我的应用程序中的聚合保持高性能？尽管有几种优化选项，最直接的是引入快照。

聚合快照是存储聚合状态的快照以提高加载性能的过程。当引入快照时，加载聚合以处理命令变成了一个两步过程：

1. 检索最近的快照（如果有），并使用它来溯源聚合。快照携带一个序列号，定义了它代表聚合状态的截止点。
2. 从快照的序列号开始检索其余事件，并溯源聚合的其余部分。

如果应该启用快照，需要一个触发创建快照的过程。快照创建过程应确保快照在创建点时反映了整个聚合状态。最后，聚合加载机制（即：存储库）应首先加载快照，然后加载任何剩余的事件。

在 Axon 中的聚合快照
Axon Framework 支持聚合的快照。要获取此过程的完整概述，请查看 Axon 参考指南的这一部分。

在框架内，快照过程由两个主要组件组成：

- 快照器（_Snapshotter_)
- 快照触发定义（_SnapshotTriggerDefinition_）

快照器是为聚合实例构建快照的组件。默认情况下，框架将使用整个聚合的状态作为快照。

快照触发定义定义了触发快照器构建快照的条件。触发条件可以是：

- 在一定数量的事件之后，
- 当加载时间达到一定量时，
- 或在时间的设定时刻。

快照的存储和检索由事件存储和聚合的存储库负责。为此，事件存储包含一个单独的部分来存储快照。在 Axon Server 中，一个单独的快照文件反映了这一部分。

快照加载由存储库执行，它咨询事件存储。因此，加载聚合并整合快照完全由框架处理。

配置快照
我们将查看在之前文章中引入的订单领域。快照构建、存储和加载已经由快照器、事件存储和存储库处理。

因此，要向 _OrderAggregate_ 引入快照，我们只需要配置快照触发定义。

### 4.1. 定义快照触发器
由于应用程序使用 Spring，我们可以向应用程序上下文添加一个快照触发定义。为此，我们添加一个配置类：

```java
@Configuration
public class OrderApplicationConfiguration {
    @Bean
    public SnapshotTriggerDefinition orderAggregateSnapshotTriggerDefinition(
        Snapshotter snapshotter,
        @Value("${axon.aggregate.order.snapshot-threshold:250}") int threshold) {
        return new EventCountSnapshotTriggerDefinition(snapshotter, threshold);
    }
}
```

在这种情况下，我们选择了 _EventCountSnapshotTriggerDefinition_。这个定义在聚合的事件计数与“阈值”匹配时触发快照的创建。请注意，阈值可以通过属性配置。

定义还需要快照器，Axon 会自动将快照器添加到应用程序上下文中。因此，在构建触发定义时，可以将其作为参数连接。

我们可以使用另一种实现，即 _AggregateLoadTimeSnapshotTriggerDefinition_。如果加载聚合的时间超过 _loadTimeMillisThreshold_，则此定义触发快照的创建。最后，由于它是一个快照触发器，它还需要快照器来构建快照。

### 4.2. 使用快照触发器
现在 _SnapshotTriggerDefinition_ 是应用程序的一部分，我们需要为 _OrderAggregate_ 设置它。Axon 的 _Aggregate_ 注解允许我们指定快照触发器的 bean 名称。

在注释上设置 bean 名称将自动为聚合配置触发定义：

```java
@Aggregate(snapshotTriggerDefinition = "orderAggregateSnapshotTriggerDefinition")
public class OrderAggregate {
    // 省略状态、命令处理程序和事件源处理程序
}
```

通过将 _snapshotTriggerDefinition_ 设置为构建定义的 bean 名称，我们指示框架为此聚合配置它。

## 5. 实际中的快照
配置将触发定义阈值设置为“250”。这意味着框在发布 250 个事件后构建一个快照。尽管这对于大多数应用程序来说是一个合理的默认值，但这延长了我们的测试。

因此，为了进行测试，我们将 _axon.aggregate.order.snapshot-threshold_ 属性调整为“5”。现在，我们可以更容易地测试快照是否起作用。

为此，我们启动 Axon Server 和订单应用程序。在向 _OrderAggregate_ 发出足够多的命令以生成五个事件后，我们可以通过在 Axon Server Dashboard 中搜索来检查应用程序是否存储了一个快照。

要搜索快照，我们需要点击左侧标签中的“搜索”按钮，在左上角选择“快照”，然后点击右侧的橙色“搜索”按钮。下面的表格应该显示一个像这样的单个条目：

![img](https://www.baeldung.com/wp-content/uploads/2021/09/axon-server-dashboard-snapshot-search.jpg)

## 6. 结论
在本文中，我们探讨了聚合快照是什么以及 Axon Framework 如何支持这个概念。

启用快照所需的唯一事项是在聚合上配置 _SnapshotTriggerDefinition_。创建、存储和检索快照的工作都为我们处理了。

你可以在 GitHub 上找到订单应用程序的实现和代码片段。对于这个主题的任何额外问题，也请查看 Discuss AxonIQ。