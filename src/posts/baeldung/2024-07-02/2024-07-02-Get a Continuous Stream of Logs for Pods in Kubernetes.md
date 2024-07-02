---
date: 2024-07-02
category:
  - Kubernetes
  - 运维
tag:
  - Kubernetes
  - 日志流
  - 监控
head:
  - - meta
    - name: kubernetes 日志流
      content: 学习如何在 Kubernetes 集群中使用 kubectl logs 命令获取 Pod 的连续日志流。
---
# Kubernetes 中获取 Pod 日志的连续流

日志流在 Kubernetes 中对于监控和排错运行在容器化环境中的应用程序至关重要。它提供了对 Pod 中容器生成的日志的实时访问。

在本文中，我们将学习如何使用 `kubectl logs` 命令从 Kubernetes Pod 中获取日志的连续流。### 1. 概述

让我们从 `ubuntu-pod.yaml` 配置文件开始，这个 Pod 使用 `ubuntu` 镜像，并每分钟打印一条消息：

```yaml
$ cat ubuntu-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-pod
spec:
  containers:
  - name: ubuntu-container
    image: ubuntu
    command: ["bash", "-c", "while true; do echo 'running ...' && sleep 60; done"]
```

我们可以看到在 `command` 属性中指定了一个无限循环的 `while` 循环。因此，**Pod 应该永远保持运行状态，同时每分钟记录一条消息**。

现在，让我们使用 `kubectl apply` 命令根据我们的配置文件创建 `ubuntu-pod`：

```shell
$ kubectl apply -f ubuntu-pod.yaml
pod/ubuntu-pod created
```

进一步，我们可以验证 Pod 是否确实处于运行状态：

```shell
$ kubectl get pods --field-selector metadata.name=ubuntu-pod
NAME         READY   STATUS    RESTARTS   AGE
ubuntu-pod   1/1     Running   0          3m7s
```

最后，让我们使用 `kubectl logs` 命令检查我们 `ubuntu-pod` 的日志：

```shell
$ kubectl logs ubuntu-pod
running ...
running ...
running ...
running ...
$ 
```

太好了！我们可以在控制台看到到目前为止生成的日志消息。之后，控制权转移到命令提示符 (`$`)，我们不再看到日志流。然而，如果我们正在排查问题，实时的日志流可以反映应用程序的最新状态，并有助于有效的监控。

那么，让我们开始学习如何从我们的 Pod 中获取日志流的技术。

### 3. 使用 `–follow` 选项流式传输日志

让我们使用 `kubectl logs` 命令的 `–follow` 选项来查看 `ubuntu-pod` 的日志流：

```shell
$ kubectl logs --follow ubuntu-pod
running ...
running ...
running ...
running ...
running ...
running ...
```

有趣的是，这种方法不会将控制权转移到命令提示符 (`$`)。那么，让我们等待一分钟，看看下一条消息是否出现在我们的控制台上：

```shell
running ...
```

太棒了！正如预期的那样，新的日志消息出现了。这是因为我们的 Pod 每分钟生成一条日志消息。

尽管如此，关于在 Kubernetes 中流式传输日志，我们还有很多要学习的内容。让我们准备深入探讨。

### 4. 丰富日志流

在本节中，我们将学习如何使用 `kubectl logs` 命令提供的选项，通过添加元数据来丰富我们的日志流消息。

#### 4.1. 带时间戳

知道日志消息的时间戳可能是除了消息本身之外最重要的细节。`kubectl logs` 命令提供了 `–timestamps` 选项，我们可以使用它在消息的开头添加时间戳。

让我们看看这对我们 Kubernetes 集群中运行的 `ubuntu-pod` 的实际效果：

```shell
$ kubectl logs --follow --timestamps ubuntu-pod
2023-07-30T03:09:49.368021900Z running ...
2023-07-30T03:10:49.368683774Z running ...
2023-07-30T03:11:49.370931509Z running ...
```

我们可以注意到消息显示时带有时间戳细节。此外，我们必须记住时间戳是以 RFC3339 格式显示的。

现在，每当我们的流中有新消息出现时，由于日志行的保证变化，它很容易引起注意：

```shell
2023-07-30T03:12:49.372825176Z running ...
```

太棒了！现在我们的日志流看起来更有用了。

#### 4.2. 带来源

另一个有用的细节是添加到我们的日志流中的日志消息来源。幸运的是，`kubectl logs` 命令的 `–prefix` 选项也在这里为我们提供了帮助。

让我们继续并使用 `–prefix` 选项来丰富我们的流，包括日志消息的来源：

```shell
$ kubectl logs --follow --prefix ubuntu-pod
[pod/ubuntu-pod/ubuntu-container] running ...
[pod/ubuntu-pod/ubuntu-container] running ...
```

正如预期的那样，我们可以注意到我们的流显示了每个日志行的 Pod 名称 (`ubuntu-pod`) 和容器名称 (`ubuntu-container`)。有了这些信息，我们可以将每个日志行追溯到其正确的来源。

### 5. 按大小限制日志流

在我们的场景中，我们添加了一个非常简单的日志消息，并且两个日志消息之间有足够的延迟。然而，对于解决实际业务需求的应用程序，应用程序可能以更高的频率记录更长的消息。那么，让我们学习如何通过日志的大小来限制流。

#### 5.1. 使用 `–tail` 选项

当我们使用 `–follow` 选项从运行中的 Pod 获取日志流时，Kubernetes 首先显示历史日志消息。一旦显示了所有消息，我们就可以看到近乎实时的日志直播。然而，如果 Pod 运行了很多天或者在短时间内生成了大量的日志事件，这种行为可能会增加噪声。

在这种情况下，我们可以使用 `–tail` 选项来限制历史日志行的大小到一个固定数量。结果，我们应该能更快地看到我们的日志流。

让我们通过 `ubuntu-pod` Pod 的日志流来验证我们的理解：

```shell
$ date
Sun Jul 30 03:19:14 AM UTC 2023
$ kubectl logs --follow --timestamps --tail 2 ubuntu-pod
2023-07-30T03:17:49.383687361Z running ...
2023-07-30T03:18:49.386528064Z running ...
```

正如预期的那样。在输出中，我们可以看到过去只有两条日志行显示出来。

#### 5.2. 使用 `–limit-bytes` 选项

日志大小是我们可以用于限制我们日志流大小的另一个标准。为此，我们可以使用 `kubectl logs` 命令的 `–limit-bytes` 选项。

让我们首先通过将 `1` 字节的值传递给 `–limit-bytes` 选项，检查我们的日志流中每个字节显示多少个字符：

```shell
$ kubectl logs --follow --limit-bytes 1 ubuntu-pod
r
$ 
```

我们可以看到，在这种情况下，一个字节对应一个字符。

由于在我们的场景中，每条日志行有 `11` 个字符，通过传递 `11` 字节给 `–limit-bytes` 选项来验证这一点是值得的：

```shell
$ kubectl logs --follow --limit-bytes 11 ubuntu-pod
running ...
$ 
```

完美！我们已经验证了我们的理解。但是，我们必须注意到控制权在这两种情况下都立即转移到了命令提示符 (`$`)。那是因为 **`–limit-bytes` 选项适用于整个日志流，而不仅仅是历史日志**。

最后，让我们传递 `500` 字节与 `–limit-bytes` 选项来看看 `ubuntu-pod` 的日志流：

```shell
$ kubectl logs --follow --limit-bytes 500 ubuntu-pod
running ...
running ...
running ...
running ...
running ...
running ...
running ...
running ...
running ...
running ...
running ...
running ...
```

在这种情况下，值得注意的是，一旦它获得了 `500` 个字符，流就会关闭。

### 6. 按时间限制日志流

在本节中，我们将看看如何使用基于时间的选项，如 `–since` 和 `–since-time` 来限制日志流。

#### 6.1. 使用 `–since` 选项

我们可以使用 `–since` 选项指定一个时间段，以限制历史日志行到过去的特定时间。

让我们首先传递 `300s`（300 秒）给 `–since` 选项，并看看 `ubuntu-pod` 的日志流：

```shell
$ date
Sun Jul 30 03:28:51 AM UTC 2023
$ kubectl logs --follow --timestamps --since 300s ubuntu-pod
2023-07-30T03:24:49.398533266Z running ...
2023-07-30T03:25:49.401017157Z running ...
2023-07-30T03:26:49.402346354Z running ...
2023-07-30T03:27:49.404715543Z running ...
2023-07-30T03:28:49.407544746Z running ...
```

我们可以注意到，日志流中只显示了过去五条日志行。这是因为我们的应用程序每分钟记录一次日志，这在 `300` 秒内计算为 `5` 次。

此外，我们还可以通过传递分钟数来传递持续时间。让我们通过传递 `2m` 来验证这一点：

```shell
$ date
Sun Jul 30 03:29:53 AM UTC 2023
$ kubectl logs --follow --timestamps --since 2m ubuntu-pod
2023-07-30T03:28:49.407544746Z running ...
2023-07-30T03:29:49.409491441Z running ...
```

结果看起来是正确的。

接下来