---
date: 2022-04-01
category:
  - Spring Cloud
  - Microservices
tag:
  - Spring Cloud Sidecar
  - Netflix Sidecar
  - Service Discovery
  - Eureka
  - Zuul Proxy
head:
  - - meta
    - name: keywords
      content: Spring Cloud Sidecar, Netflix Sidecar, Service Discovery, Eureka, Zuul Proxy
------
# Spring Cloud Sidecar 介绍

## 1. 概述

Spring Cloud 提供了广泛的功能和库，如客户端负载均衡、服务注册/发现、并发控制和配置服务器。另一方面，在微服务世界中，使用不同语言和框架编写的多语言服务是一种常见做法。那么，如果我们希望在整个生态系统中利用 Spring Cloud 的优势呢？Spring Cloud Netflix Sidecar 就是这里的解决方案。

在本教程中，我们将通过工作示例更深入地了解 Spring Cloud Sidecar。

## 2. 什么是 Spring Cloud Sidecar？

Cloud Netflix Sidecar 的灵感来自 Netflix Prana，可以用作一个实用工具，以便于使用服务注册，为非 JVM 语言编写的服务提高 Spring Cloud 生态系统内的端点互操作性。

**使用 Cloud Sidecar，非 JVM 服务可以注册到服务注册表中。** 此外，该服务还可以使用服务发现查找其他服务，甚至可以通过主机查找或 Zuul 代理访问配置服务器。非 JVM 服务能够集成的唯一要求是有一个标准的健康检查端点可用。

## 3. 示例应用程序

我们的示例用例包括 3 个应用程序。为了展示 Cloud Netflix Sidecar 的最佳效果，我们将在 NodeJS 中创建一个 _/hello_ 端点，然后通过一个名为 sidecar 的 Spring 应用程序将其暴露给我们的生态系统。我们还将开发另一个 Spring Boot 应用程序，使用服务发现回显 _/hello_ 端点响应，并使用 Zuul。

通过这个项目，我们的目标是涵盖请求的两个流程：

- 用户在 echo Spring Boot 应用程序上调用 echo 端点。echo 端点使用 _DiscoveryClient_ 查找 Eureka 中的 hello 服务 URL，即指向 NodeJS 服务的 URL。然后 echo 端点在 NodeJS 应用程序上调用 hello 端点
- 用户通过 Zuul 代理直接从 echo 应用程序调用 hello 端点

### 3.1. NodeJS Hello 端点

让我们从创建一个名为 _hello.js_ 的 JS 文件开始。我们使用 _express_ 来处理我们的 hello 请求。在我们的 _hello.js_ 文件中，我们引入了三个端点——默认的“/”端点、_/hello_ 端点和一个 _/health_ 端点，以满足 Spring Cloud Sidecar 的要求：

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health', (req, res) => {
    res.send({ "status": "UP"});
});

app.get('/hello/:me', (req, res) => {
    res.send('Hello ' + req.params.me + '!');
});

app.listen(port, () => {
    console.log(`Hello app listening on port ${port}`);
});
```

接下来，我们将安装 _express_：

```bash
npm install express
```

最后，让我们启动我们的应用程序：

```bash
node hello.js
```

应用程序启动后，让我们 _curl_ hello 端点：

```bash
curl http://localhost:3000/hello/baeldung
Hello baeldung!
```

然后，我们测试健康端点：

```bash
curl http://localhost:3000/health
status:"UP"}
```

有了我们的 Node 应用程序为下一步做好准备，我们将 Spring 化它。

### 3.2. Sidecar 应用程序

首先，我们需要有一个 Eureka 服务器。Eureka 服务器启动后，我们可以访问它：http://127.0.0.1:8761

让我们添加 _spring-cloud-netflix-sidecar_ 作为依赖项：

```xml
```<dependency>```
    ```<groupId>```org.springframework.cloud```</groupId>```
    ```<artifactId>```spring-cloud-netflix-sidecar```</artifactId>```
    ```<version>```2.2.10.RELEASE```</version>```
```</dependency>```
```

**需要注意的是，目前 _spring-cloud-netflix-sidecar_ 的最新版本是 _2.2.10.RELEASE_，并且它只支持 spring boot _2.3.12.RELEASE_。因此，当前最新版本的 Spring Boot 与 Netflix Sidecar 不兼容。**

然后让我们实现我们的 Spring Boot 应用程序类，并启用 sidecar：

```java
@SpringBootApplication
@EnableSidecar
public class SidecarApplication {
    public static void main(String[] args) {
        SpringApplication.run(SidecarApplication.class, args);
    }
}
```

接下来，我们需要设置连接到 Eureka 的属性。此外，我们设置了 sidecar 配置，包括我们的 NodeJS hello 应用程序的端口和健康 URI：

```properties
server.port: 8084
spring:
  application:
    name: sidecar
eureka:
  instance:
    hostname: localhost
    leaseRenewalIntervalInSeconds: 1
    leaseExpirationDurationInSeconds: 2
  client:
    service-url:
      defaultZone: http://127.0.0.1:8761/eureka
healthcheck:
  enabled: true
sidecar:
  port: 3000
  health-uri: http://localhost:3000/health
```

现在我们可以启动我们的应用程序。应用程序成功启动后，Spring 在 Eureka 服务器中注册了一个名为“hello”的服务。

要检查它是否工作，我们可以访问端点：http://localhost:8084/hosts/sidecar。

_@EnableSidecar_ 不仅仅是一个标记，用于将 sidecar 服务注册到 Eureka。它还会导致 _@EnableCircuitBreaker_ 和 _@EnableZuulProxy_ 被添加，随后我们的 Spring Boot 应用程序从 Hystrix 和 Zuul 中受益。

现在，有了我们的 Spring 应用程序准备好了，让我们进入下一步，看看我们生态系统中服务之间的通信是如何工作的。

### 3.3. Echo 应用程序也说 Hello!

对于 echo 应用程序，我们将创建一个端点，该端点使用服务发现调用 NodeJS hello 端点。此外，我们将启用 Zuul 代理以展示这两种服务之间通信的其他选项。

首先，让我们添加依赖项：

```xml
```<dependency>```
    ```<groupId>```org.springframework.cloud```</groupId>```
    ```<artifactId>```spring-cloud-starter-netflix-zuul```</artifactId>```
    ```<version>```2.2.10.RELEASE```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.springframework.cloud```</groupId>```
    ```<artifactId>```spring-cloud-starter-netflix-eureka-client```</artifactId>```
    ```<version>```2.2.10.RELEASE```</version>```
```</dependency>```
```

**为了与 sidecar 应用程序保持一致，我们在 echo 应用程序中使用 _2.2.10.RELEASE_ 版本，用于 _spring-cloud-starter-netflix-zuul_ 和 _spring-cloud-starter-netflix-eureka-client_ 的依赖项。**

然后让我们创建 Spring Boot 主类并启用 Zuul 代理：

```java
@SpringBootApplication
@EnableEurekaClient
@EnableZuulProxy
public class EchoApplication {
    // ...
}
```

然后，我们像前一节中所做的那样配置 Eureka 客户端：

```properties
server.port: 8085
spring:
  application:
    name: echo
eureka:
  instance:
    hostname: localhost
    leaseRenewalIntervalInSeconds: 1
    leaseExpirationDurationInSeconds: 2
  client:
    service-url:
      defaultZone: http://127.0.0.1:8761
 ...
```

接下来，我们启动我们的 echo 应用程序。启动后，我们可以检查我们两个服务之间的互操作性。

要检查 sidecar 应用程序，让我们查询它以获取 echo 服务的元数据：

```bash
curl http://localhost:8084/hosts/echo
```

然后，为了验证 echo 应用程序可以通过 sidecar 应用程序暴露的 NodeJS 端点调用，让我们使用 Zuul 代理的魔力并 curl 这个 URL：

```bash
curl http://localhost:8085/sidecar/hello/baeldung
Hello baeldung!
```

既然我们已经验证了一切工作正常，让我们尝试另一种调用 hello 端点的方式。首先，我们将在 echo 应用程序中创建一个控制器并注入 _DiscoveryClient_。然后我们添加一个 _GET_ 端点，该端点使用 _DiscoveryClient_ 查询 hello 服务并使用 _RestTemplate_ 调用它：

```java
@Autowired
DiscoveryClient discoveryClient;

@GetMapping("/hello/{me}")
public ResponseEntity`<String>` echo(@PathVariable("me") String me) {
    List`<ServiceInstance>` instances = discoveryClient.getInstances("sidecar");
    if (instances.isEmpty()) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("hello service is down");
    }
    String url = instances.get(0).getUri().toString();
    return ResponseEntity.ok(restTemplate.getForObject(url + "/hello/" + me, String.class));
}
```

让我们重新启动 echo 应用程序并执行这个 curl 以验证从echo 应用程序调用的 echo 端点：

```bash
curl http://localhost:8085/hello/baeldung
Hello baeldung!
```

或者让它更有趣一些，从 sidecar 应用程序调用它：

```bash
curl http://localhost:8084/echo/hello/baeldung
Hello baeldung!
```

## 4. 结论

在本文中，我们了解了 Cloud Netflix Sidecar 并构建了一个工作示例，使用 NodeJS 和两个 Spring 应用程序来展示其在 Spring 生态系统中的使用方式。

一如既往，示例的完整代码可以在 GitHub 上找到。
OK