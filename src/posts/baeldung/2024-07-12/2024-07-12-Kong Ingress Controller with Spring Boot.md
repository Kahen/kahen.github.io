---
date: 2022-11-06
category:
  - Spring Boot
  - Kong Ingress
tag:
  - Kubernetes
  - API Gateway
head:
  - - meta
    - name: kong-ingress-spring-boot
      content: 教程，Kubernetes，Spring Boot，API 网关
---

# Kong Ingress Controller 与 Spring Boot | Baeldung

Kubernetes (K8s) 是一个自动化软件开发和部署的编排器，是当今 API 托管的流行选择，无论是在本地还是在诸如 Google Cloud Kubernetes Service (GKS) 或 Amazon Elastic Kubernetes Service (EKS) 等云服务上运行。另一方面，Spring 已成为最受欢迎的 Java 框架之一。

在本教程中，我们将展示如何使用 Kong Ingress Controller (KIC) 在 Kubernetes 上部署我们的 Spring Boot 应用程序，并设置受保护的环境。我们还将展示 KIC 的高级用法，通过实现一个简单的速率限制器来增强应用程序的功能，而无需任何编码。

## 2. 提高安全性和访问控制

现代应用程序部署，特别是 API，面临许多挑战，例如：隐私法（例如 GDPR）、安全问题（例如 DDOS）和使用跟踪（例如 API 配额和速率限制）。在这种情况下，现代应用程序和 API 需要额外的保护级别来应对所有这些挑战，例如防火墙、反向代理、速率限制器和相关服务。尽管 K8s 环境为我们的应用程序提供了许多这些威胁的保护，但我们仍然需要采取一些措施来确保我们的应用程序安全。其中一项措施是部署一个入口控制器并设置其访问规则。

入口是一个管理对 K8s 集群和部署在其上的应用的外部访问的对象，通过公开 HTTP / HTTPS 路由到部署的应用并强制执行访问规则。为了公开一个应用程序以允许外部访问，我们需要定义入口规则并使用入口控制器，这是一个专门的反向代理和负载均衡器。通常，入口控制器由第三方公司提供，功能各异，就像本文中使用的 Kong Ingress Controller。

## 3. 设置环境

为了演示 Kong Ingress Controller (KIC) 与 Spring Boot 应用程序的结合使用，我们需要访问一个 K8s 集群，因此我们可以使用完整的 Kubernetes 本地安装或云提供的，或者使用 Minikube 开发我们的示例应用程序。启动我们的 K8s 环境后，我们需要在我们的集群上部署 Kong Ingress Controller。Kong 公开了一个外部 IP，我们需要使用它来访问我们的应用程序，因此创建一个包含该地址的环境变量是一个好习惯：

```
export PROXY_IP=$(minikube service -n kong kong-proxy --url | head -1)
```

就是这样！Kong Ingress Controller 已安装，我们可以通过访问 PROXY_IP 来测试它是否正在运行：

```
curl -i $PROXY_IP
```

响应应该是一个 404 错误，这是正确的，因为我们还没有部署任何应用程序，所以它应该说没有找到匹配的路由。是时候创建一个示例应用程序了，但在此之前，如果我们还没有 Docker，我们可能需要安装它。为了将我们的应用程序部署到 K8s，我们需要一种创建容器镜像的方法，我们可以使用 Docker 来实现。

## 4. 创建示例 Spring Boot 应用程序

现在我们需要一个 Spring Boot 应用程序并将其部署到 K8s 集群。为了生成一个至少有一个公开 Web 资源的简单 HTTP 服务器应用程序，我们可以这样做：

```
curl https://start.spring.io/starter.tgz -d dependencies=webflux,actuator -d type=maven-project | tar -xzvf -
```

一个重要的事情是选择默认的 Java 版本。如果我们需要使用旧版本，那么就需要一个 javaVersion 属性：

`curl https://start.spring.io/starter.tgz -d dependencies=webflux,actuator -d type=maven-project -d javaVersion=11 | tar -xzvf -`

在这个示例应用程序中，我们选择了 webflux，它生成了一个使用 Spring WebFlux 和 Netty 的反应式 Web 应用程序。但还添加了另一个重要的依赖项。actuator，这是 Spring 应用程序的监控工具，已经公开了一些 Web 资源，这正是我们需要用 Kong 测试的。这样，我们的应用程序已经公开了一些我们可以使用的 Web 资源。让我们构建它：

```
./mvnw install
```

生成的 jar 是可执行的，所以我们可以通过运行它来测试应用程序：

```
java -jar target/*.jar
```

为了测试应用程序，我们需要打开另一个终端并输入此命令：

```
curl -i http://localhost:8080/actuator/health
```

响应必须是应用程序的健康状态，由执行器提供：

```
HTTP/1.1 200 OK
Content-Type: application/vnd.spring-boot.actuator.v3+json
Content-Length: 15

{"status":"UP"}
```

## 5. 从应用程序生成容器镜像

将应用程序部署到 Kubernetes 集群的过程涉及创建并部署一个容器镜像到集群可以访问的存储库。在现实生活中，我们会将我们的镜像推送到 DockerHub 或我们自己的私有容器镜像注册表。但是，由于我们使用的是 Minikube，让我们只需将我们的 Docker 客户端环境变量指向 Minikube 的 Docker：

```
$(minikube docker-env)
```

我们可以构建应用程序镜像：

```
./mvnw spring-boot:build-image
```

## 6. 部署应用程序

现在是我们在我们的 K8s 集群上部署应用程序的时候了。我们需要创建一些 K8s 对象来部署和测试我们的应用程序，所有所需的文件都可以在演示的存储库中找到：

- 具有容器规范的应用程序的部署对象
- 分配给我们的 Pod 集群 IP 地址的服务定义
- 使用 Kong 的代理 IP 地址和我们的路由的入口规则

部署对象只是创建运行我们镜像所必需的 pod，这是创建它的 YAML 文件：

```
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: demo
  name: demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: demo
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: demo
    spec:
      containers:
      - image: docker.io/library/demo:0.0.1-SNAPSHOT
        name: demo
        resources: {}
        imagePullPolicy: Never

status: {}
```

我们指向在 Minikube 中创建的镜像，获取其完整名称。注意，我们需要指定 imagePullPolicy 属性为 Never，因为我们没有使用镜像注册服务器，所以我们不希望 K8s 尝试下载镜像，而是使用已经在其内部 Docker 存档中的镜像。我们可以使用 kubectl 部署它：

```
kubectl apply -f serviceDeployment.yaml
```

如果部署成功，我们可以看到消息：

```
deployment.apps/demo created
```

为了我们的应用程序有一个统一的 IP 地址，我们需要创建一个服务，它为它分配一个内部的集群范围的 IP 地址，这是创建它的 YAML 文件：

```
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: demo
  name: demo
spec:
  ports:
  - name: 8080-8080
    port: 8080
    protocol: TCP
    targetPort: 8080
  selector:
    app: demo
  type: ClusterIP
status:
  loadBalancer: {}
```

现在我们也可以部署它使用 kubectl：

```
kubectl apply -f clusterIp.yaml
```

注意我们选择了标签 demo，它指向我们部署的应用程序。为了能够从 K8s 集群外部访问，我们需要创建一个入口规则，在我们的情况下，我们将其指向路径 /actuator/health 和端口 8080：

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: demo
spec:
  ingressClassName: kong
  rules:
  - http:
      paths:
      - path: /actuator/health
        pathType: ImplementationSpecific
        backend:
          service:
            name: demo
            port:
              number: 8080
```

最后，我们使用 kubectl 部署它：

```
kubectl apply -f ingress-rule.yaml
```

现在我们可以使用 Kong 的代理 IP 地址进行外部访问：

```
$ curl -i $PROXY_IP/actuator/health
HTTP/1.1 200 OK
Content-Type: application/vnd.spring-boot.actuator.v3+json
Content-Length: 49
Connection: keep-alive
X-Kong-Upstream-Latency: 325
X-Kong-Proxy-Latency: 1
Via: kong/3.0.0
```

## 7. 演示速率限制器

我们已经成功地在 Kubernetes 上部署了 Spring Boot 应用程序，并使用 Kong Ingress Controller 提供了对其的访问。但 KIC 不仅如此：身份验证、负载均衡、监控、速率限制和其他功能。为了展示 Kong 的真正能力，我们将为我们的应用程序实现一个简单的速率限制器，将访问限制为每分钟仅五次请求。为此，我们需要在我们的 K8s 集群中创建一个名为 KongClusterPlugin 的对象。YAML 文件就是这样做的：

```
apiVersion: configuration.konghq.com/v1
kind: KongClusterPlugin
metadataname: global-rate-limit
  annotations:
    kubernetes.io/ingress.class: kong
  labels:
    global: true
config:
  minute: 5
  policy: local
plugin: rate-limiting
```

插件配置允许我们为应用程序指定额外的访问规则，我们将访问限制为每分钟五次请求。让我们应用此配置并测试结果：

```
kubectl apply -f rate-limiter.yaml
```

要测试它，我们可以在一分钟内重复使用我们之前使用的 CURL 命令超过五次，我们将得到一个 429 错误：

```
curl -i $PROXY_IP/actuator/health
HTTP/1.1 429 Too Many Requests
Date: Sun, 06 Nov 2022 19:33:36 GMT
Content-Type: application/json; charset=utf-8
Connection: keep-alive
RateLimit-Reset: 24
Retry-After: 24
X-RateLimit-Remaining-Minute: 0
X-RateLimit-Limit-Minute: 5
RateLimit-Remaining: 0
RateLimit-Limit: 5
Content-Length: 41
X-Kong-Response-Latency: 0
Server: kong/3.0.0

{
  "message":"API rate limit exceeded"
}
```

我们可以看到响应 HTTP 头信息告知客户端有关速率限制的信息。

## 8. 清理资源

为了清理演示，我们需要按 LIFO 顺序删除所有对象：

```
kubectl delete -f rate-limiter.yaml
kubectl delete -f ingress-rule.yaml
kubectl delete -f clusterIp.yaml
kubectl delete -f serviceDeployment.yaml
```

并停止 Minikube 集群：

```
minikube stop
```

## 9. 结论

在本文中，我们展示了如何使用 Kong Ingress Controller 管理对部署在 K8s 集群上的 Spring Boot 应用程序的访问。

如往常一样，源代码可以在 GitHub 上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK