---
date: 2022-04-01
category:
  - Spring Cloud
  - Dapr
tag:
  - Spring Cloud Gateway
  - Dapr
head:
  - - meta
    - name: keywords
      content: Spring Cloud, Dapr, Spring Cloud Gateway, 分布式应用运行时, 微服务
---

# Dapr 与 Spring Cloud Gateway 入门介绍

在本文中，我们将从Spring Cloud Gateway应用程序和Spring Boot应用程序开始。然后，我们将更新它以使用Dapr（分布式应用程序运行时）。最后，我们将更新Dapr配置以展示Dapr在与云原生组件集成时提供的**灵活性**。

使用Dapr，我们可以在不影响应用程序本身的情况下管理云原生应用程序的部署。Dapr使用**边车模式**来卸载应用程序的部署问题，这允许我们将应用程序部署到其他环境（例如本地、不同的专有云平台、Kubernetes等）**而无需对应用程序本身进行任何更改**。有关更多详细信息，请查看Dapr网站上的概述。

## **3. 创建示例应用程序**

我们将通过创建一个示例Spring Cloud Gateway和Spring Boot应用程序开始。按照“Hello world”示例的伟大传统，网关将代理请求到后端Spring Boot应用程序以获取标准的“Hello world”问候。

### **3.1. 问候服务**

首先，让我们为问候服务创建一个Spring Boot应用程序。这是一个标准的Spring Boot应用程序，只有_spring-boot-starter-web_作为依赖项，标准的主类，并将服务器端口配置为3001。

让我们添加一个控制器来响应_hello_端点：

```java
@RestController
public class GreetingController {
    @GetMapping(value = "/hello")
    public String getHello() {
        return "Hello world!";
    }
}
```

构建我们的问候服务应用程序后，我们将启动它：

```shell
java -jar greeting/target/greeting-1.0-SNAPSHOT.jar
```

我们可以使用_curl_来测试它，返回“Hello world!”消息：

```shell
curl http://localhost:3001/hello
```

### **3.2. Spring Cloud Gateway**

现在，我们将在端口3000上创建一个Spring Cloud Gateway，作为一个标准的Spring Boot应用程序，只有_spring-cloud-starter-gateway_作为依赖项和标准的主类。我们还将配置路由以访问问候服务：

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: greeting-service
          uri: http://localhost:3001/
          predicates:
            - Path=/**
          filters:
          - RewritePath=/?(?``<segment>``.*), /${segment}
```

一旦我们构建了网关应用程序，我们可以启动网关：

```shell
java -Dspring.profiles.active=no-dapr -jar gateway/target/gateway-1.0-SNAPSHOT.jar
```

我们可以使用_curl_来测试它，从问候服务返回“Hello world!”消息：

```shell
curl http://localhost:3000/hello
```

## **4. 添加Dapr**

现在我们已经建立了一个基本示例，让我们将Dapr加入其中。

我们通过**配置网关与Dapr边车通信**而不是直接与问候服务通信来实现这一点。然后，Dapr将负责找到问候服务并将请求转发给它；通信路径现在将从网关，通过Dapr边车，到问候服务。

### **4.1. 部署Dapr边车**

首先，我们需要部署两个Dapr边车的实例——一个用于网关，一个用于问候服务。我们使用Dapr CLI来实现这一点。

我们将使用一个标准的Dapr配置文件：

```yaml
apiVersion: dapr.io/v1alpha1
kind: Configuration
metadata:
  name: daprConfig
spec: {}
```

让我们使用_dapr_命令在端口4000上启动网关的Dapr边车：

```shell
dapr run --app-id gateway --dapr-http-port 4000 --app-port 3000 --config dapr-config/basic-config.yaml
```

接下来，让我们使用_dapr_命令在端口4001上启动问候服务的Dapr边车：

```shell
dapr run --app-id greeting --dapr-http-port 4001 --app-port 3001 --config dapr-config/basic-config.yaml
```

现在边车正在运行，我们可以看到它们如何拦截并转发请求到问候服务。当我们使用_curl_进行测试时，它应该返回“Hello world!”问候：

```shell
curl http://localhost:4001/v1.0/invoke/greeting/method/hello
```

让我们尝试使用网关边车进行相同的测试，以确认它也返回“Hello world!”问候：

```shell
curl http://localhost:4000/v1.0/invoke/greeting/method/hello
```

这里背后发生了什么？**网关的Dapr边车使用服务发现**（在这种情况下，是本地环境的mDNS），找到问候服务的Dapr边车。然后，它**使用服务调用在问候服务上调用指定的端点**。

### **4.2. 更新网关配置**

下一步是配置网关路由以使用其Dapr边车：

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: greeting-service
          uri: http://localhost:4000/
          predicates:
            - Path=/**
          filters:
          - RewritePath=//?(?``<segment>``.*), /v1.0/invoke/greeting/method/${segment}
```

然后，我们将使用更新的路由重新启动网关：

```shell
java -Dspring.profiles.active=with-dapr -jar gateway/target/gateway-1.0-SNAPSHOT.jar
```

我们可以使用_curl_命令再次测试，从问候服务获取“Hello world”问候：

```shell
curl http://localhost:3000/hello
```

当我们使用Wireshark查看网络上发生的事情时，我们可以看到**网关和服务之间的流量通过Dapr边车**。

恭喜！我们现在成功地将Dapr引入了画面。让我们回顾一下这给我们带来了什么：网关不再需要配置以找到问候服务（也就是说，问候服务的端口号不再需要在路由配置中指定），网关也不需要知道如何将请求转发到问候服务的细节。

## 5. 更新Dapr配置

现在我们已经部署了Dapr，我们可以配置Dapr使用其他云原生组件。

### **5.1. 使用Consul进行服务发现**

让我们使用Consul而不是mDNS进行服务发现。

首先，我们需要在默认端口8500上安装并启动Consul，然后更新Dapr边车配置以使用Consul：

```yaml
apiVersion: dapr.io/v1alpha1
kind: Configuration
metadata:
  name: daprConfig
spec:
  nameResolution:
    component: "consul"
    configuration:
      selfRegister: true
```

然后我们将使用新的配置重新启动两个Dapr边车：

```shell
dapr run --app-id greeting --dapr-http-port 4001 --app-port 3001 --config dapr-config/consul-config.yaml
```

```shell
dapr run --app-id gateway --dapr-http-port 4000 --app-port 3000 --config dapr-config/consul-config.yaml
```

一旦边车重新启动，我们可以在Consul UI的Services页面上看到列出的网关和问候应用程序。注意，我们不需要重新启动应用程序本身。

看看这有多容易？**Dapr边车的一个简单配置更改现在让我们支持Consul**，最重要的是，**对底层应用程序没有影响**。这与使用Spring Cloud Consul不同，后者需要更新应用程序本身。

### **5.2. 使用Zipkin进行追踪**

Dapr还支持与Zipkin集成，以追踪跨应用程序的调用。

首先，在默认端口9411上安装并启动Zipkin，然后更新Dapr边车的配置以添加Zipkin：

```yaml
apiVersion: dapr.io/v1alpha1
kind: Configuration
metadata:
  name: daprConfig
spec:
  nameResolution:
    component: "consul"
    configuration:
      selfRegister: true
  tracing:
    samplingRate: "1"
    zipkin:
      endpointAddress: "http://localhost:9411/api/v2/spans"
```

我们需要重新启动两个Dapr边车以获取新的配置：

```shell
dapr run --app-id greeting --dapr-http-port 4001 --app-port 3001 --config dapr-config/consul-zipkin-config.yaml
```

```shell
dapr run --app-id gateway --dapr-http-port 4000 --app-port 3000 --config dapr-config/consul-zipkin-config.yaml
```

一旦Dapr重新启动，你可以发出_curl_命令，并在Zipkin UI中查看调用跟踪。

再次，不需要重新启动网关和问候服务。它**只需要对Dapr配置进行简单的更新**。与使用Spring Cloud Zipkin相比。

### **5.3. 其他组件**

Dapr支持许多其他组件来解决其他问题，如安全性、监控和报告。查看Dapr文档以获取完整列表。

## **6. 结论**

我们已经将Dapr添加到一个简单的Spring Cloud Gateway示例中，与后端Spring Boot服务通信。我们已经展示了如何配置和启动Dapr边车，以及它如何处理诸如服务发现、通信和追踪等云原生问题。

尽管这需要部署和管理一个边车应用程序，但Dapr为部署到不同的云原生环境提供了**灵活性**，并在与Dapr集成后不需要更改应用程序即可解决云原生问题。

这种方法还意味着开发人员在编写代码时不需要承担云原生问题，这使他们能够专注于业务功能。一旦应用程序配置为使用Dapr边车，就可以在不影响应用程序的情况下解决不同的部署问题——无需重新编码、重新构建或重新部署应用程序。**Dapr提供了应用程序和部署问题之间的清晰分离**。

正如往一样，本文的完整代码可以在GitHub上找到。

OK