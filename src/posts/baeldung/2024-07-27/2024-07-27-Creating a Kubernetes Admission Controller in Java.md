---
date: 2021-07-01
category:
  - Kubernetes
  - Java
tag:
  - Admission Controller
  - Java
  - Kubernetes
head:
  - - meta
    - name: keywords
      content: Kubernetes, Java, Admission Controller
---

# 创建Java中的Kubernetes准入控制器

在与Kubernetes合作一段时间后，我们很快就会意识到其中涉及很多样板代码。即使是一个简单的服务，我们也需要提供所有必需的详细信息，通常以相当冗长的YAML文档的形式出现。

此外，当在给定环境中部署多个服务时，这些YAML文档往往包含很多重复的元素。例如，我们可能想要向所有部署中添加一个特定的_ConfigMap_或一些sidecar容器。

在本文中，我们将探讨如何使用Kubernetes准入控制器坚持DRY原则，避免所有这些重复的代码。

## 2. 什么是准入控制器？

准入控制器是Kubernetes用来在API请求经过身份验证但执行前进行预处理的机制。

API服务器进程（_kube-apiserver_）已经内置了几个控制器，每个控制器负责API处理的特定方面。

_AllwaysPullImage_ 是一个很好的例子：这个准入控制器修改了pod创建请求，使得镜像拉取策略变为“always”，无论指定的值是什么。Kubernetes文档包含了标准准入控制器的完整列表。

除了这些内置控制器，实际上作为_kubeapi-server_进程的一部分运行，Kubernetes还支持外部准入控制器。在这种情况下，准入控制器只是一个来自API服务器的HTTP服务。

此外，这些外部准入控制器可以动态添加和删除，因此得名动态准入控制器。这导致处理流程看起来像这样：

![img](https://www.baeldung.com/wp-content/uploads/2021/07/k8s-admission-controllers.png)

在这里，我们可以看到，经过身份验证的传入API请求，在到达持久层之前，会依次通过每个内置的准入控制器。

## 3. 准入控制器类型

目前有两种类型的准入控制器：

- 可变准入控制器
- 验证准入控制器

顾名思义，它们的主要区别在于对传入请求的处理类型。可变控制器可能在将请求传递到下游之前修改它，而验证控制器只能验证它们。

关于这些类型的一个重点在于API服务器执行它们的顺序：首先是可变控制器，然后是验证控制器。这是有意义的，因为一旦我们有了最终的请求，可能已经被任何可变控制器改变了，就会进行验证。

### 3.1. 准入审查请求

内置的准入控制器（可变和验证）使用简单的HTTP请求/响应模式与外部准入控制器通信：

- 请求：一个包含其_request_属性中要处理的API调用的_AdmissionReview_ JSON对象
- 响应：一个包含其_response_属性中结果的_AdmissionReview_ JSON对象

这是一个请求的示例：

```json
{
  "kind": "AdmissionReview",
  "apiVersion": "admission.k8s.io/v1",
  "request": {
    "uid": "c46a6607-129d-425b-af2f-c6f87a0756da",
    "kind": {
      "group": "apps",
      "version": "v1",
      "kind": "Deployment"
    },
    "resource": {
      "group": "apps",
      "version": "v1",
      "resource": "deployments"
    },
    "requestKind": {
      "group": "apps",
      "version": "v1",
      "kind": "Deployment"
    },
    "requestResource": {
      "group": "apps",
      "version": "v1",
      "resource": "deployments"
    },
    "name": "test-deployment",
    "namespace": "test-namespace",
    "operation": "CREATE",
    "object": {
      "kind": "Deployment",
      ... deployment fields omitted
    },
    "oldObject": null,
    "dryRun": false,
    "options": {
      "kind": "CreateOptions",
      "apiVersion": "meta.k8s.io/v1"
    }
  }
}
```

在可用字段中，有些特别重要：

- _operation_：这表明此请求将创建、修改或删除资源
- _object_：正在处理的资源的规范详细信息。
- _oldObject_：当修改或删除资源时，此字段包含现有资源

预期的响应也是一个_AdmissionReview_ JSON对象，但具有_response_字段而不是_request_：

```json
{
  "apiVersion": "admission.k8s.io/v1",
  "kind": "AdmissionReview",
  "response": {
    "uid": "c46a6607-129d-425b-af2f-c6f87a0756da",
    "allowed": true,
    "patchType": "JSONPatch",
    "patch": "W3sib3A ... Base64 patch data omitted"
  }
}
```

让我们剖析一下_response_对象的字段：

- _uid_：此字段的值必须与传入_request_字段中出现的相应字段匹配
- _allowed_：审查操作的结果。_true_意味着API调用处理可以进入下一步
- _patchType_：仅对可变准入控制器有效。指示_AdmissionReview_请求返回的补丁类型
- _patch_：要应用在传入对象上的补丁。详细信息在下一部分

### 3.2. 补丁数据

来自可变准入控制器的响应中的_patch_字段告诉API服务器在请求继续之前需要更改什么。它的值是一个Base64编码的JSONPatch对象，包含API服务器用来修改传入API调用正文的一系列指令的数组：

```json
[
  {
    "op": "add",
    "path": "/spec/template/spec/volumes/-",
    "value": {
      "name": "migration-data",
      "emptyDir": {}
    }
  }
]
```

在这个例子中，我们有一个单一的指令，将一个卷添加到部署规范的_volumes_数组中。处理补丁时的一个常见问题是，除非原始对象中已经存在，否则没有办法向现有数组添加一个元素。这在处理Kubernetes API对象时特别烦人，因为最常见的对象（例如，部署）包括可选数组。

例如，前一个例子只有在传入的_deployment_至少有一个卷时才有效。如果不是这种情况，我们将不得不使用稍微不同的指令：

```json
[
  {
    "op": "add",
    "path": "/spec/template/spec/volumes",
    "value": [
    {
      "name": "migration-data",
      "emptyDir": {}
    }
    ]
  }
]
```

在这里，我们定义了一个新的_volumes_字段，其值是一个包含卷定义的数组。之前，值是一个对象，因为我们正在将其追加到现有数组中。

## 4. 示例用例：Wait-For-It

现在我们已经对准入控制器的预期行为有了基本的了解，让我们编写一个简单的示例。在Kubernetes中管理运行时依赖关系是一个常见问题，特别是当使用微服务架构时。例如，如果一个特定的微服务需要访问数据库，如果前者离线，启动就没有意义。

为了解决这样的问题，我们可以使用_pods_中的_initContainer_在启动主容器之前进行检查。一个简单的方法是使用流行的_wait-for-it_ shell脚本，也可以作为docker镜像使用。

该脚本采用_hostname_和_port_参数，并尝试连接到它。如果测试成功，容器以成功的状态码退出，pod初始化继续进行。否则，它将失败，并且相关的控制器将根据定义的策略继续重试。将此预检外部化的好处是，任何相关的Kubernetes服务都会注意到失败。因此，不会向其发送任何请求，可能会提高整体的弹性。

### 4.1. 准入控制器的案例

这是一个典型的部署，其中添加了_wait-for-it_ init容器：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      initContainers:
      - name: wait-backend
        image: willwill/wait-for-it
        args:
        - -www.google.com:80
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

虽然在这个简单的例子中并不复杂，但在每个部署中添加相关代码有一些缺点。特别是，我们给部署作者带来了确切指定依赖检查应该如何进行的负担。相反，更好的体验只需要定义_应该_测试什么。

进入我们的准入控制器。为了解决这个用例，我们将编写一个可变准入控制器，它查找资源中特定注释的存在，并在存在时向其添加_initContainer_。这是一个带注释的部署规范的样子：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  labels:
    app: nginx
  annotations:
    com.baeldung/wait-for-it: "www.google.com:80"
spec:
  replicas: 1