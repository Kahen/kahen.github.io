---
date: 2024-06-23
category:
  - Kubernetes
  - Networking
tag:
  - Service URL
  - ClusterIP
  - NodePort
  - LoadBalancer
head:
  - - meta
    - name: keywords
      content: Kubernetes, Service URL, ClusterIP, NodePort, LoadBalancer, Networking
------
# 如何在Kubernetes中找到服务的URL

网络是Kubernetes不可或缺的一部分，而"Service"是其基础网络对象之一。Kubernetes "Service"允许我们将网络应用程序暴露给外部世界。然而，为了访问它，我们必须知道它的URL。

在本实践教程中，我们将讨论如何找到并使用Kubernetes服务的URL作为可靠的网络端点。

## 2. 设置示例

我们需要创建一些Kubernetes对象作为示例。首先，让我们创建"Namespace"对象。

### 2.1. 创建Kubernetes命名空间

Kubernetes命名空间允许我们在同一个集群内隔离资源。因此，让我们使用_create_命令创建两个命名空间 - _dev_和_stg_：

```shell
$ kubectl create ns dev
namespace/dev created

$ kubectl create ns stg
namespace/stg created
```

### 2.2. 创建Kubernetes部署

在上一步中，我们创建了两个命名空间。现在，让我们将Redis pod部署到这些命名空间：

```shell
$ kubectl create deploy redis-dev --image=redis:alpine -n dev
deployment.apps/redis-dev created

$ kubectl create deploy redis-stg --image=redis:alpine -n stg
deployment.apps/redis-stg created
```

接下来，让我们验证pod是否已创建并且它们处于健康状态：

```shell
$ kubectl get pods -n dev
NAME                         READY   STATUS    RESTARTS   AGE
redis-dev-7b647c797c-c2mmg   1/1     Running   0          16s

$ kubectl get pods -n stg
NAME                        READY   STATUS    RESTARTS   AGE
redis-stg-d66978466-plfpv   1/1     Running   0          9s
```

在这里，我们可以观察到两个pod的状态都是_Running_。

现在，所需的设置已经准备好。在接下来的部分中，我们将创建一些_Service_对象以建立与这些pod的通信。

## 3. 找到_ClusterIP_服务的URL

在Kubernetes中，默认的服务类型是_ClusterIP_。**对于_ClusterIP_服务，我们可以使用服务名称或其IP地址作为其URL**。这允许我们仅在集群内限制通信。让我们通过一个简单的例子来理解这一点。

### 3.1. 创建_ClusterIP_服务

首先，让我们在两个命名空间中创建_ClusterIP_ _Service_对象：

```shell
$ kubectl expose deploy redis-dev --port 6379 --type ClusterIP -n dev
service/redis-dev exposed

$ kubectl expose deploy redis-stg --port 6379 --type ClusterIP -n stg
service/redis-stg exposed
```

在这个例子中，我们使用了_expose_命令来创建一个_Service_对象。**_expose_命令使用_Deployment_对象的选择器，并使用相同的选择器创建_Service_**。

在接下来的部分中，我们将讨论如何找到并使用这些服务的名称作为URL。

### 3.2. 在同一命名空间中使用_ClusterIP_服务的URL

首先，让我们使用_get_命令从_dev_命名空间中找到服务名称：

```shell
$ kubectl get svc -n dev
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
redis-dev   ClusterIP   10.100.18.154   ````<none>````        6379/TCP   9s
```

在输出中，第一列显示服务名称。在我们的例子中，它是_redis-dev_。

现在，让我们_exec_到部署在_dev_命名空间中的Redis pod，使用_redis-dev_作为主机名连接到Redis服务器，并执行_PING_命令：

```shell
$ kubectl exec -it redis-dev-7b647c797c-c2mmg -n dev -- sh
/data # redis-cli -h redis-dev PING
PONG
/data # exit
```

在这里，我们可以看到Redis服务器以_PONG_消息响应。

最后，我们执行_exit_命令从pod退出。

### 3.3. 从另一个命名空间使用_ClusterIP_服务的URL

让我们检查_ClusterIP_服务URL的格式：

```shell
`<service-name>`.`<namespace>`.`<cluster-name>`:`<service-port>`
```

我们在上一个例子中没有使用_命名空间_和_集群名称_，因为我们从同一命名空间和集群执行了命令。此外，我们还跳过了_服务端口_，因为服务是使用默认的Redis端口_6379_公开的。

然而，**我们需要指定命名空间名称才能从另一个命名空间使用_ClusterIP_服务**。让我们通过一个例子来理解这一点。

首先，让我们找出_stg_命名空间中的服务名称：

```shell
$ kubectl get svc -n stg
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
redis-stg   ClusterIP   10.110.213.51   ````<none>````        6379/TCP   9s
```

现在，让我们_exec_到部署在_dev_命名空间中的Redis pod，使用_redis-stg.stg_作为主机名连接到Redis服务器，并执行_PING_命令：

```shell
$ kubectl exec -it redis-dev-7b647c797c-c2mmg -n dev -- sh
/data # redis-cli -h redis-stg.stg PING
PONG
/data # exit
```

在这个例子中，我们可以看到Redis服务器发送了一个_PONG_回复。

需要注意的一个重要事项是，我们**使用了_redis-stg.stg_作为主机名，其中_redis-stg_是服务名称，_stg_是创建_Service_对象的命名空间名称**。

### 3.4. 清理

在前面的例子中，我们看到了如何使用服务名称作为URL。

现在，让我们使用_delete_命令从_dev_和_stg_命名空间中清理服务：

```shell
$ kubectl delete svc redis-dev -n dev
service "redis-dev" deleted

$ kubectl delete svc redis-stg -n stg
service "redis-stg" deleted
```

## 4. 找到_NodePort_服务的URL

_NodePort_服务允许使用Kubernetes节点的IP地址和端口连接到应用程序。让我们通过创建一个_NodePort_服务来理解这一点。

### 4.1. 创建_NodePort_服务

首先，让我们使用_expose_命令创建一个类型为_NodePort_的_Service_：

```shell
$ kubectl expose deploy redis-dev --port 6379 --type NodePort -n dev
service/redis-dev exposed
```

接下来，让我们验证_Service_是否已创建：

```shell
$ kubectl get svc -n dev
NAME        TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
redis-dev   NodePort   10.111.147.176   ````<none>````        6379:30243/TCP   2s
```

在这里，我们可以看到_Service_类型是_NodePort_。在倒数第二列中，它显示了Kubernetes节点的端口_30243_映射到了pod的端口_6379_。

现在，**我们可以使用Kubernetes节点的IP地址和端口_30243_从集群外部访问Redis服务器**。让我们实际操作一下。

### 4.2. 使用_NodePort_服务的URL

首先，让我们找到Kubernetes节点的IP地址：

```shell
$ kubectl get nodes -o wide
NAME       STATUS   ROLES           AGE   VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION      CONTAINER-RUNTIME
baeldung   Ready    control-plane   24h   v1.28.3   192.168.49.2   ````<none>````        Ubuntu 22.04.3 LTS   5.15.0-41-generic   docker://24.0.7
```

在这里，我们使用了_Node_对象的_o wide_选项来显示附加字段。

在上面的输出中，**带有标题_INTERNAL-IP_的列显示了Kubernetes节点的IP地址**。

现在，从外部机器上，让我们使用_192.168.49.2_作为主机名，_30243_作为端口号，并执行_PING_命令：

```shell
$ redis-cli -h 192.168.49.2 -p 30243 PING
PONG
```

在这里，我们可以看到Redis服务器以_PONG_消息响应。

### 4.3. 清理

在下一部分，我们将看到_LoadBalancer_服务的使用。但在此之前，让我们清理_dev_命名空间中的_NodePort_服务：

```shell
$ kubectl delete svc redis-dev -n dev
service "redis-dev" deleted
```

## 5. 找到_LoadBalancer_服务的URL

就像_NodePort_服务一样，_LoadBalancer_服务也允许使用负载均衡器的IPaddress来连接到应用程序。让我们通过创建一个_LoadBalancer_服务来理解这一点。

### 5.1. 创建_LoadBalancer_服务

让我们使用_expose_命令在_dev_命名空间中创建一个_LoadBalancer_服务：

```shell
$ kubectl expose deploy redis-dev --port 6379 --type LoadBalancer -n dev
service/redis-dev exposed
```

### 5.2. 使用_LoadBalancer_服务的URL

接下来，让我们使用_get_命令找到负载均衡器的IP地址：

```shell
$ kubectl get svc -n dev
NAME        TYPE           CLUSTER-IP       EXTERNAL-IP     PORT(S)          AGE
redis-dev   LoadBalancer   10.111.167.249   192.168.49.10   6379:32637/TCP   7s
```

在这个例子中，带有标题_EXTERNAL-IP_的列表示_LoadBalancer_服务的IP地址。

在我们的情况下，负载均衡器的IP地址是_192.168.49.10_。

现在，从外部机器上，让我们使用_192.168.49.10_作为主机名并执行_PING_命令：

```shell
$ redis-cli -h 192.168.49.10 PING
PONG
```

在输出中，我们可以看到Redis服务器回复了一个_PONG_消息。

## 6. 清理

删除所有不需要的对象以整理集群是一个好习惯。这有助于我们通过减少硬件消耗来降低成本。

所以，让我们使用_delete_命令删除_dev和_stg_命名空间：

```shell
$ kubectl delete ns dev
namespace "dev" deleted

$ kubectl delete ns stg
namespace "stg" deleted
```

这条命令删除了命名空间本身以及这个命名空间中存在的所有对象。

在这里，**我们直接删除了命名空间，因为这是一个测试设置。然而，在生产环境中执行删除操作时，我们应该非常小心**。

## 7. 结论

在本文中，我们讨论了如何在Kubernetes中找到并使用服务的URL。

首先，我们看到了如何在同一命名空间和另一个命名空间中使用_ClusterIP_服务名称作为URL。然后，我们讨论了如何找到并使用_NodePort_服务的URL。

最后，我们讨论了使用负载均衡器的IP地址作为服务URL。

OK