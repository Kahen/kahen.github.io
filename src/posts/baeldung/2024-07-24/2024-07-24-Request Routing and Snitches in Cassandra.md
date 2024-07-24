---
date: 2022-04-01
category:
  - Cassandra
  - Database
tag:
  - Snitch
  - Request Routing
head:
  - - meta
    - name: keywords
      content: Cassandra, Snitch, Request Routing, Database
---
# Cassandra中的请求路由和Snitch

在本教程中，我们将学习Snitch的作用以及Cassandra如何使用它来高效地路由请求。我们还将查看Cassandra中可用的各种类型的Snitch。

## 1. 概述

## 2. Snitch是什么？

Snitch简单地报告每个节点所属的机架和数据中心——本质上，它确定并告知Cassandra集群的网络拓扑。

有了对集群拓扑的了解，包括节点之间的相对接近性，Cassandra能够高效地将请求路由到集群中的适当节点。

### 2.1. 写操作中的Snitch

Cassandra使用Snitch的信息将节点分组到机架和数据中心中。**为了避免在写操作期间发生相关故障，Cassandra尽一切努力不在同一机架上存储副本。**

### 2.2. 读操作中的Snitch

我们知道，在读取操作期间，Cassandra必须根据它们的一致性级别联系一些节点和副本。**为了使读取操作高效，Cassandra使用Snitch的信息来识别将最快返回副本的节点。**

然后查询该节点以获取完整行信息。接着，Cassandra查询其他副本节点的哈希值以确保返回最新的数据。

## 3. Snitch的类型

**默认的Snitch，_SimpleSnitch_，不是拓扑感知的。也就是说，它不知道集群的机架和数据中心。** 因此，它不适用于多数据中心部署。

出于这个原因，Cassandra提出了各种类型的Snitch来满足我们的要求。通常，我们可以通过在配置文件_cassandra.yml_文件中的_endpoint_snitch_属性来配置Snitch的类型。

让我们看看一些Snitch的类型以及它们的工作原理。

### 3.1. _PropertyFileSnitch_

_PropertyFileSnitch_是一个机架感知的Snitch。我们可以在名为_cassandra-topology.properties_的文件中以键值属性的形式提供集群拓扑信息。在这个属性文件中，我们为每个节点提供机架和数据中心的名称。

此外，我们可以使用任何名称来命名机架和数据中心。但是**，我们需要确保数据中心名称与在keyspace定义中定义的_NetworkTopologyStrategy_相匹配。**

以下是_cassandra-topology.properties_文件的示例内容：

```
# Cassandra节点IP=数据中心:机架
172.86.22.125=DC1:RAC1
172.80.23.120=DC1:RAC1
172.84.25.127=DC1:RAC1

192.53.34.122=DC1:RAC2
192.55.36.134=DC1:RAC2
192.57.302.112=DC1:RAC2

# 未知节点的默认设置
default=DC1:RAC1
```

在上面的示例中，有两个机架（RAC1, RAC2）和一个数据中心（DC1）。任何未覆盖的节点IP将落入默认数据中心（DC1）和机架（RAC1）。

这种Snitch的一个缺点是，我们需要确保_cassandra-topology.properties_文件与集群中的所有节点保持同步。

### 3.2. _GossipingPropertyFileSnitch_

_GossipingPropertyFileSnitch_也是一个机架感知的Snitch。为了避免像_PropertyFileSnitch_那样手动同步机架和数据中心，在这个Snitch中，我们只需要在_cassandra-rackdc.properties_文件中为每个节点单独定义机架和数据中心的名称。

**这些机架和数据中心的信息将使用gossip协议与所有节点交换。**

以下是_cassandra-rackdc.properties_文件的示例内容：

```
dc=DC1
rack=RAC1
```

### 3.3. _Ec2Snitch_

顾名思义，_Ec2Snitch_与在Amazon Web Service (AWS) EC2中的集群部署有关。在单个AWS区域部署中，区域名称被视为数据中心，可用区名称被视为机架。

如果我们只需要单数据中心部署，则不需要属性配置。而在多数据中心部署的情况下，我们可以在_cassandra-rackdc.properties_文件中指定_dc_suffix_。

例如，在_us-east_区域，如果我们需要几个数据中心，我们可以提供_dc_suffix_配置如下：

```
dc_suffix=_1_DC1
dc_suffix=_1_DC2
```

上述每个配置进入两个不同的节点。因此，结果为_us_east_1_DC1_和_us_east_1_DC2_作为数据中心的名称。

### 3.4. _Ec2MultiRegionSnitch_

在AWS的多区域集群部署中，我们应该使用_Ec2MultiRegionSnitch_。此外，我们需要配置_cassandra.yaml_和_cassandra-rackdc.properties_。

我们必须将公共IP地址配置为_broadcast_address_，并且如果需要，也可以将其用作_cassandra.yaml_中的种子节点。此外，我们必须将专用IP地址配置为_listen_address._ 最后，我们必须在公共IP防火墙上打开_session_port_或_ssl_session_port_。

这些配置允许节点跨AWS区域通信，从而实现跨区域的多数据中心部署。在单区域的情况下，Cassandra节点在建立连接后切换到专用IP地址进行通信。

_cassandra_rackdc.properties_中每个节点跨区域的_dc_suffix_数据中心配置类似于_Ec2Snitch_。

### 3.5. _GoogleCloudSnitch_

顾名思义，_GoogleCloudSnitch_用于在Google Cloud Platform的一个或多个区域中部署集群。与AWS类似，区域名称被视为数据中心，可用区是机架。

在单数据中心部署的情况下，我们不需要任何配置。相反，在多数据中心部署的情况下，类似于_Ec2Snitch_，我们可以在_cassandra-rackdc.properties_文件中设置_dc_suffix_。

### 3.6. _RackInferringSnitch_

_RackInferringSnitch_根据节点IP地址的第三和第二八位推断节点到机架和数据中心的接近度。

## 4. 动态Snitching

默认情况下，Cassandra将我们在_cassandra.yml_文件中配置的任何Snitch类型包装在另一种称为_DynamicEndpointSnitch_的Snitch中。这种动态Snitch从已经配置的基础Snitch中获取集群拓扑的基本信息。然后，它监控节点的读取延迟，甚至跟踪任何节点的压缩操作。

**然后，动态Snitch使用这些性能数据来为任何读取查询选择最佳的副本节点。** 这样，Cassandra避免了将读取请求路由到表现不佳或忙碌（性能慢）的副本节点。

动态Snitch使用gossip使用的_Phi accrual failure detection_机制的修改版本来确定读取请求上的最佳副本节点。_badness threshold_是一个可配置的参数，它决定了首选节点必须与表现最佳的节点相比表现得多差，才能失去其优先地位。

Cassandra定期重置每个节点的性能分数，以允许表现不佳的节点恢复并表现得更好，以便重新获得其优先地位。

## 5. 结论

在本教程中，我们学习了什么是Snitch，并且还了解了我们可以在Cassandra集群部署中配置的一些Snitch类型。