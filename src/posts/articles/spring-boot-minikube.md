---
date: 2024-06-13
category:
  - Spring Boot
  - Minikube
tag:
  - Spring Boot
  - Kubernetes
  - Minikube
---
在Minikube上运行Spring Boot应用程序 | Baeldung

现在，新版的《REST With Spring - "REST With Spring Boot"》终于发布了，当前价格将在6月22日之前有效，之后将永久上涨50美元。

**>>> 立即获取访问权限**

**现在**

## **1. 概述**

在之前的文章中，我们对Kubernetes进行了理论介绍。

本教程中，我们将讨论如何在本地Kubernetes环境，也就是Minikube上部署Spring Boot应用程序。

作为本文的一部分，我们将：

- 在我们的本地机器上安装Minikube
- 开发一个包含两个Spring Boot服务的示例应用程序
- 使用Minikube在单节点集群上设置应用程序
- 使用配置文件部署应用程序

## **2. 安装Minikube**

Minikube的安装基本上包括三个步骤：安装一个虚拟机监视器（如VirtualBox），CLI命令kubectl，以及Minikube本身。

官方文档为每个步骤提供了详细的说明，适用于所有流行的操作系统。

安装完成后，我们可以启动Minikube，设置VirtualBox为虚拟机监视器，并配置kubectl与名为minikube的集群通信：

```
$> minikube start
$> minikube config set vm-driver virtualbox
$> kubectl config use-context minikube
```

之后，我们可以验证kubectl是否正确地与我们的集群通信：

```
$> kubectl cluster-info
```

输出应该看起来像这样：

```
Kubernetes master is running at https://192.168.99.100:8443
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

在这个阶段，我们将保留响应中的IP地址（以我们的案例为例是_192.168.99.100_）。我们稍后将引用它为_NodeIP_，这是从集群外部调用资源时需要的，例如从我们的浏览器。

最后，我们可以检查我们集群的状态：

```
$> minikube dashboard
```

此命令将在默认浏览器中打开一个网站，提供关于我们集群状态的广泛概述。

## **4. 演示应用程序**

现在我们的集群正在运行并准备好部署，我们需要一个演示应用程序。

为此，我们将创建一个简单的“Hello world”应用程序，由两个Spring Boot服务组成，我们将它们称为_frontend_和_backend_。

后端在端口8080上提供一个REST端点，返回包含其主机名的_String_。前端在端口8081上可用，它将简单地调用后端端点并返回其响应。

之后，我们必须为每个应用程序构建一个Docker镜像。所有必要的文件也在GitHub上可用。

有关如何构建Docker镜像的详细说明，请查看Docker化Spring Boot应用程序。

**我们必须确保在Minikube集群的Docker主机上触发构建过程**，否则Minikube在部署期间将找不到镜像。此外，我们的主机工作区必须挂载到Minikube VM中：

```
$> minikube ssh
$> cd /c/workspace/tutorials/spring-cloud/spring-cloud-kubernetes/demo-backend
$> docker build --file=Dockerfile \
  --tag=demo-backend:latest --rm=true .
```

之后，我们可以从Minikube VM登出，所有进一步的步骤将在我们的主机上使用kubectl和minikube命令行工具执行。

## **5. 使用命令行命令进行简单部署**

首先，我们将为我们的_demo-backend_应用程序创建一个Deployment，只包含一个Pod。基于此，我们将讨论一些命令，以便我们可以验证Deployment，检查日志，并在最后清理它。

### **5.1. 创建Deployment**

我们将使用kubectl，将所有必需的命令作为参数传递：

```
$> kubectl run demo-backend --image=demo-backend:latest \
  --port=8080 --image-pull-policy Never
```

正如我们所看到的，我们创建了一个名为_demo-backend_的Deployment，它是从同名为_demo-backend_的镜像实例化而来，版本为_latest_。

使用_–port_，我们指定Deployment为其Pods打开端口8080（因为我们的_demo-backend_应用程序监听端口8080）。

标志_–image-pull-policy Never_确保Minikube不会尝试从注册表中拉取镜像，而是从本地Docker主机中获取。

### **5.2. 验证Deployment**

现在，我们可以检查部署是否成功：

```
$> kubectl get deployments
```

输出看起来像这样：

```
NAME           DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
demo-backend   1         1         1            1           19s
```

如果我们想查看应用程序日志，我们首先需要Pod ID：

```
$> kubectl get pods
$> kubectl logs <pod id>
```

### **5.3. 为Deployment创建Service**

**为了使我们的后端应用程序的REST端点可用，我们需要创建一个Service：**

```
$> kubectl expose deployment demo-backend --type=NodePort
```

_–type=NodePort_使Service从集群外部可用。它将在_<NodeIP>:<NodePort>_上可用，即服务将任何传入_<NodePort>_的请求映射到其分配的Pods的端口8080。

我们使用expose命令，因此_NodePort_将由集群自动设置（这是一个技术限制），默认范围是30000-32767。要获取我们选择的端口，我们可以使用配置文件，正如我们将在下一节中看到的。

我们可以验证服务是否成功创建：

```
$> kubectl get services
```

输出看起来像这样：

```
NAME           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
demo-backend   NodePort    10.106.11.133   <none>        8080:30117/TCP   11m
```

正如我们所看到的，我们有一个名为_demo-backend_的服务，类型为_NodePort_，它在集群内部IP 10.106.11.133上可用。

我们必须仔细查看PORT(S)列：由于在Deployment中定义了端口8080，服务将流量转发到此端口。然而，如果我们想从浏览器中调用_demo-backend_，我们必须使用端口30117，这可以从集群外部访问。

### **5.4. 调用Service**

现在，我们可以第一次调用我们的后端服务：

```
$> minikube service demo-backend
```

此命令将启动我们的默认浏览器，打开_<NodeIP>:<NodePort>._ 在我们的示例中，将是_http://192.168.99.100:30117_。

### **5.5. 清理Service和Deployment**

之后，我们可以删除Service和Deployment：

```
$> kubectl delete service demo-backend
$> kubectl delete deployment demo-backend
```

## **6. 使用配置文件进行复杂部署**

对于更复杂的设置，配置文件是比通过命令行参数传递所有参数更好的选择。

配置文件是记录我们的部署的好方法，它们可以进行版本控制。

### **6.1. 为我们的后端应用程序定义Service**

让我们使用配置文件重新定义我们的后端服务：

```
kind: Service
apiVersion: v1
metadata:
  name: demo-backend
spec:
  selector:
    app: demo-backend
  ports:
  - protocol: TCP
    port: 8080
  type: ClusterIP
```

我们创建了一个名为_demo-backend_的_Service_，由_metadata: name_字段指示。

它针对任何带有_app=demo-backend_标签的Pod上的TCP端口8080。

最后，_type: ClusterIP_表示它仅在集群内部可用（因为我们这次想从_demo-frontend_应用程序中调用端点，而不是像前一个示例那样直接从浏览器中调用）。

### **6.2. 后端应用程序的Deployment定义**

接下来，我们可以定义实际的Deployment：

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-backend
spec:
  selector:
      matchLabels:
        app: demo-backend
  replicas: 3
  template:
    metadata:
      labels:
        app: demo-backend
    spec:
      containers:
        - name: demo-backend
          image: demo-backend:latest
          imagePullPolicy: Never
          ports:
            - containerPort: 8080
```

我们创建了一个名为_demo-backend_的_Deployment_，由_metadata: name_字段指示。

_spec: selector_字段定义了Deployment如何找到要管理的Pods。在这种情况下，我们只选择在Pod模板中定义的一个标签（_app: demo-backend_。

我们希望有三个复制的Pods，我们通过_replicas_字段来指示。

模板字段定义了实际的Pod：

- Pods被标记为_app: demo-backend_
- _template: spec_字段指示每个Pod复制运行一个容器，_demo-backend_，版本为_latest_
- Pods打开端口8080

### **6.3. 后端应用程序的部署**

我们现在可以触发部署：

```
$> kubectl create -f backend-deployment.yaml
```

让我们验证部署是否成功：

```
$> kubectl get deployments
```

输出看起来像这样：

```
NAME           DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
demo-backend   3         33         3            3           25s
```

我们还可以检查Service是否可用：

```
$> kubectl get services
```

输出看起来像这样：

```
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
demo-backend    ClusterIP   10.102.17.114   <none>        8080/TCP         30s
```

正如我们所看到的，Service是类型_ClusterIP_，它没有提供在30000-32767范围内的外部端口，这与我们在第5节中的前一个示例不同。

### **6.4. 前端应用程序的Deployment和服务定义**

之后，我们可以为前端定义Service和Deployment：

```
kind: Service
apiVersion: v1
metadata:
  name: demo-frontend
spec:
  selector:
    app: demo-frontend
  ports:
  - protocol: TCP
    port: 8081
    nodePort: 30001
  type: NodePort
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-frontend
spec:
  selector:
      matchLabels:
        app: demo-frontend
  replicas: 3
  template:
    metadata:
      labels:
        app: demo-frontend
    spec:
      containers:
        - name: demo-frontend
          image: demo-frontend:latest
          imagePullPolicy: Never
          ports:
            - containerPort: 8081
```

前端和后端几乎相同，**后端和前端之间唯一的区别是Service的spec**：

对于前端，我们定义类型为_NodePort_（因为我们希望使前端对集群外部可用）。后端只需要在集群内部可达，因此，_type_是_ClusterIP_。

正如前面所说，我们还使用_nodePort_字段手动指定_NodePort_。

### **6.5. 前端应用程序的部署**

我们现在可以以相同的方式触发此部署：

```
$> kubectl create -f frontend-deployment.yaml
```

让我们快速验证部署是否成功并且Service可用：

```
$> kubectl get deployments
$> kubectl get services
```

之后，我们终于可以调用前端应用程序的REST端点：

```
$> minikube service demo-frontend
```

此命令将再次启动我们的默认浏览器，打开_<NodeIP>:<NodePort>_，对于这个例子是_http://192.168.99.100:30001_。

### **6.6. 清理服务和部署**

最后，我们可以清理通过删除服务和部署：

```
$> kubectl delete service demo-frontend
$> kubectl delete deployment demo-frontend
$> kubectl delete service demo-backend
$> kubectl delete deployment demo-backend
```

## **7. 结论**

在本文中，我们快速了解了如何使用Minikube在本地Kubernetes集群上部署一个Spring Boot“Hello world”应用程序。

我们详细讨论了如何：

- 在我们的本地机器上安装Minikube
- 开发并构建由两个Spring Boot应用程序组成的示例
- 使用kubectl的命令行命令以及配置文件在单节点集群上部署服务

如往常一样，示例的完整源代码可在GitHub上获得。

发表文章后的30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。

OK