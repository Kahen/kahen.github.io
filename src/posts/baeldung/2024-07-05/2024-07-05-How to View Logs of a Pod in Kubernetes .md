---
date: 2024-07-05
category:
  - DevOps
  - Kubernetes
tag:
  - Pod Logs
  - kubectl
  - Kubernetes Dashboard
head:
  - - meta
    - name: kubernetes pod logs
      content: 学习如何在Kubernetes中查看Pod的日志，包括使用kubectl命令和Kubernetes仪表板。
---
# 如何在Kubernetes中查看Pod的日志？ | Baeldung关于运维

如果您在DevOps生态系统中有几年的经验，并且有兴趣与社区分享这些经验，请查看我们的**贡献指南**。

## 1. 概述

Kubernetes是一个强大的容器编排平台，它允许我们大规模地管理和部署容器化应用程序。

确保我们应用程序的可靠性和可用性的最关键方面之一是监控运行中的Pod的健康状况和状态。**查看日志是这一过程的重要组成部分，因为它们提供了应用程序或系统执行的事件和操作的记录**。

在本文中，我们将发现在Kubernetes中查看_pod日志_的各种技术。这些技术包括使用_kubectl logs_命令、Kubernetes仪表板以及实时流式传输日志。

## 2. 使用_kubectl logs_命令

**_kubectl logs_命令是在Kubernetes中查看Pod日志的最直接方式。**我们可以使用此命令检索在Pod中运行的特定容器的日志。

以下是如何使用_kubectl logs_命令的一些示例：

首先，要从只有一个容器的运行中的Pod中检索日志，我们使用以下命令：

```shell
$ kubectl logs ``````<pod-name>`````` -c ``````<container-name>``````
```

在此命令中，我们将_``````<pod-name>``````_替换为Pod的名称，将_``````<container-name>``````_替换为我们想要查看日志的容器的名称。

当针对具有多个容器的Pod进行故障排除时，使用_–container_或_-c_选项检索特定容器的日志可能很有用。此选项允许您专注于感兴趣的容器，并可以简化故障排除过程。

要查看在名为_my-pod_的Pod中运行的名为_httpd-server_的特定容器的日志，我们将使用此命令：

```shell
$ kubectl logs my-pod -c httpd-server
[Wed Apr 27 10:12:29.000000 2022] [core:notice] [pid 1:tid 140028840174080] AH00094: Command line: 'httpd -D FOREGROUND'
[Wed Apr 27 10:12:29.000000 2022] [mpm_prefork:notice][pid 1:tid 140028840174080] AH00163: Apache/2.4.41 (Unix) configured -- resuming normal operations
```

此命令的输出显示了在_my-pod_中运行的_httpd-server_容器的日志。

### **2.1. 使用_tail_选项**

默认情况下，_kubectl logs_命令检索从容器输出开始的所有日志。然而，**我们可以使用_tail_选项仅获取最新的日志**。以下是如何使用此选项的示例：

```shell
$ kubectl logs ``````<pod-name>`````` -c ``````<container-name>`````` --tail=``<number-of-lines>``
```

在此命令中，我们将_``````<pod-name>``````_替换为Pod的名称，将_``````<container-name>``````_替换为容器的名称，将_``<number-of-lines>``_替换为我们想要检索的日志行数。

```shell
$ kubectl logs my-pod -c httpd-server --tail=100
```

此命令获取我们Pod中运行的容器的最近100行日志。

### **2.2. 使用_follow_选项**

_kubectl logs_命令提供了一种轻松访问日志的方式，但有时我们需要实时监控它们，以便在发生错误或问题时立即捕捉。这就是_–follow_选项的用武之地。

要使用_kubectl logs_命令的_–follow_选项，我们只需使用以下命令：

```shell
$ kubectl logs ``````<pod-name>`````` -c ``````<container-name>`````` --follow
```

其中_``````<pod-name>``````_是Pod的名称，_``````<container-name>``````_是我们想要流式传输日志的容器的名称。

使用_–follow_选项允许我们实时查看生成的日志，这在故障排除时特别有用，需要立即查看日志。

## 3. 使用Kubernetes仪表板监控Kubernetes Pod的日志

Kubernetes提供了一个基于Web的仪表板，我们可以使用它来查看Pod的日志。要使用Kubernetes仪表板查看日志，我们需要按照以下步骤操作：

要开始监控Kubernetes Pod的日志，我们可以通过在终端中运行_kubectl proxy_命令来访问Kubernetes仪表板：

```shell
$ kubectl proxy
Starting to serve on 127.0.0.1:8001
```

运行上述命令后，我们可以在Web浏览器中导航至_http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/_。

一旦我们进入Kubernetes仪表板，我们可以在命名空间中找到我们想要监控日志的特定Pod。我们可以点击Pod的名称以访问其详细信息。如果Pod有多个容器，我们可以从“容器”列表中选择我们想要监控日志的容器。

最后，要实时监控日志，我们可以点击“日志”标签，日志将显示在一个类似控制台的界面中，随着新日志的生成而更新。

## 4. Kubernetes日志记录的最佳实践

除了在Kubernetes中查看_pod日志_的各种技术外，**遵循日志记录的最佳实践以确保日志结构化、安全且易于访问也很重要**。

Kubernetes日志记录的一些最佳实践包括：

- 使用结构化日志记录
- 以JSON格式记录日志
- 避免记录敏感信息
- 设置日志级别

最初，结构化日志记录使搜索和分析日志变得更加容易，而以JSON格式记录日志则有助于解析和与其他系统集成。

然而，重要的是要避免记录敏感信息，而是使用安全的方法，如环境变量。最后，设置日志级别有助于过滤掉噪音，专注于相关信息。

通过遵循这些最佳实践，我们可以确保我们的日志是可靠的，并且对于故障排除和分析是有用的。

## **5. 结论**

总之，监控我们的Kubernetes Pod的日志对于确保我们应用程序的健康状况和性能至关重要。**通过使用Kubernetes仪表板或_kubectl logs_命令，我们可以快速排除故障，识别错误，并确保应用程序的可用性和可靠性。**

本教程中概述的步骤提供了一个简单易跟的指南，用于使用Kubernetes仪表板查看日志，这对于Kubernetes管理员和开发人员来说是一个理想的工具。无论我们是Kubernetes专家还是刚刚开始使用容器化，监控我们的日志是维护应用程序健康和性能的关键部分。翻译已经完成，以下是翻译的剩余部分：

## 5. 结论

总之，监控我们的Kubernetes Pod的日志对于确保我们应用程序的健康状况和性能至关重要。**通过使用Kubernetes仪表板或_kubectl logs_命令，我们可以快速排除故障，识别错误，并确保应用程序的可用性和可靠性。**

本教程中概述的步骤提供了一个简单易跟的指南，用于使用Kubernetes仪表板查看日志，这对于Kubernetes管理员和开发人员来说是一个理想的工具。无论我们是Kubernetes专家还是刚刚开始使用容器化，监控我们的日志是维护应用程序健康和性能的关键部分。

![img](https://www.baeldung.com/ops/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/db3a7706a8df361420f4586d9a83b443?s=50&d=mm&r=g)![img](https://www.baeldung.com/ops/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK