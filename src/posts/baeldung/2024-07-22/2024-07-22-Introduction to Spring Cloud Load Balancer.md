---
date: 2024-07-23
category:
  - Spring Cloud
  - Load Balancer
tag:
  - Microservices
  - Fault Tolerance
  - Load Balancing
head:
  - - meta
    - name: keywords
      content: Spring Cloud, Load Balancer, Microservices, Fault Tolerance, Load Balancing
---

# Spring Cloud 负载均衡器简介

随着微服务架构越来越受欢迎，跨不同服务器运行多个服务变得越来越普遍。在这个快速教程中，**我们将看看如何使用Spring Cloud Load Balancer来创建更具容错性的应用程序**。

## 2. 什么是负载均衡？

**负载均衡是将流量分配到同一应用程序的不同实例的过程。**

为了创建一个容错系统，通常运行每个应用程序的多个实例。因此，每当一个服务需要与另一个服务通信时，它需要选择一个特定的实例来发送其请求。

在负载均衡方面有许多算法：
- 随机选择：随机选择一个实例
- 轮询：每次以相同的顺序选择一个实例
- 最少连接数：选择当前连接数最少的实例
- 加权指标：使用加权指标选择最佳实例（例如，CPU或内存使用量）
- IP哈希：使用客户端IP的哈希映射到一个实例

这些只是负载均衡算法的一些示例，**每种算法都有其优缺点**。

随机选择和轮询易于实现，但可能不会最优化地使用服务。相反，最少连接数和加权指标更复杂，但通常会创建更优化的服务利用率。而IP哈希在服务器粘性很重要时表现良好，但并不是非常容错。

## 3. Spring Cloud Load Balancer 简介

Spring Cloud Load Balancer 库**允许我们创建以负载均衡方式与其他应用程序通信的应用程序**。使用我们想要的任何算法，我们可以轻松地在进行远程服务调用时实现负载均衡。

为了说明，让我们看一些示例代码。我们将从一个简单的服务器应用程序开始。服务器将有一个单一的HTTP端点，并且可以作为多个实例运行。

然后，我们将创建一个客户端应用程序，该应用程序使用Spring Cloud Load Balancer在服务器的不同实例之间交替请求。

### 3.1 示例服务器

对于我们的示例服务器，我们从一个简单的Spring Boot应用程序开始：

```java
@SpringBootApplication
@RestController
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Value("${server.instance.id}")
    String instanceId;

    @GetMapping("/hello")
    public String hello() {
        return String.format("Hello from instance %s", instanceId);
    }
}
```

我们首先注入一个名为_instanceId_的可配置变量。这允许我们在多个运行实例之间进行区分。接下来，我们添加一个单一的HTTP GET端点，它回显消息和实例ID。

默认实例将在端口8080上运行，ID为1。**要运行第二个实例，们只需要添加几个程序参数**：

```shell
--server.instance.id=2 --server.port=8081
```

### 3.2 示例客户端

现在，让我们看看客户端代码。**这是我们使用Spring Cloud Load Balancer的地方**，所以让我们先从在我们的应用程序中包含它开始：

```xml
`<dependency>`
    `<groupId>`org.springframework.cloud`</groupId>`
    `<artifactId>`spring-cloud-starter-loadbalancer`</artifactId>`
`</dependency>`
```

接下来，我们创建一个_ServiceInstanceListSupplier_的实现。**这是Spring Cloud Load Balancer中的一个关键接口**。它定义了我们如何找到可用的服务实例。

对于我们的示例应用程序，我们将硬编码两个不同的示例服务器实例。它们在同一台机器上运行，但使用不同的端口：

```java
class DemoInstanceSupplier implements ServiceInstanceListSupplier {
    private final String serviceId;

    public DemoInstanceSupplier(String serviceId) {
        this.serviceId = serviceId;
    }

    @Override
    public String getServiceId() {
        return serviceId;
    }

    @Override
    public Flux`<List<ServiceInstance>`> get() {
        return Flux.just(Arrays
            .asList(new DefaultServiceInstance(serviceId + "1", serviceId, "localhost", 8080, false),
              new DefaultServiceInstance(serviceId + "2", serviceId, "localhost", 8081, false)));
    }
}
```

在现实世界的系统中，我们将希望使用不硬编码服务地址的实现。我们将在后面更详细地讨论这个问题。

现在，让我们创建一个_LoadBalancerConfiguration_类：

```java
@Configuration
@LoadBalancerClient(name = "example-service", configuration = DemoServerInstanceConfiguration.class)
class WebClientConfig {
    @LoadBalanced
    @Bean
    WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
```

这个类有一个角色：创建一个负载均衡的_WebClient_构建器来进行远程请求。**注意我们的注解使用了一个服务的伪名称**。

这是因为我们可能事先不知道运行实例的实际主机名和端口。因此，我们使用一个伪名称作为占位符，当框架选择一个运行实例时，它将替换为真实值。

接下来，让我们创建一个_Configuration_类来实例化我们的服务实例供应商。注意我们使用了与上述相同的伪名称：

```java
@Configuration
class DemoServerInstanceConfiguration {
    @Bean
    ServiceInstanceListSupplier serviceInstanceListSupplier() {
        return new DemoInstanceSupplier("example-service");
    }
}
```

现在，我们可以创建实际的客户端应用程序。让我们使用上面的_WebClient_ bean向示例服务器发送十个请求：

```java
@SpringBootApplication
public class ClientApplication {

    public static void main(String[] args) {

        ConfigurableApplicationContext ctx = new SpringApplicationBuilder(ClientApplication.class)
          .web(WebApplicationType.NONE)
          .run(args);

        WebClient loadBalancedClient = ctx.getBean(WebClient.Builder.class).build();

        for(int i = 1; i <= 10; i++) {
            String response =
              loadBalancedClient.get().uri("http://example-service/hello")
                .retrieve().toEntity(String.class)
                .block().getBody();
            System.out.println(response);
        }
    }
}
```

查看输出，我们可以确认我们在两个不同的实例之间进行负载均衡：

```
Hello from instance 2
Hello from instance 1
Hello from instance 2
Hello from instance 1
Hello from instance 2
Hello from instance 1
Hello from instance 2
Hello from instance 1
Hello from instance 2
Hello from instance 1
```

## 4. 其他特性

**示例服务器和客户端展示了Spring Cloud Load Balancer的非常简单的用法**。但是其他库特性值得一提。

首先，示例客户端使用了默认的_RoundRobinLoadBalancer_策略。库还提供了一个_RandomLoadBalancer_类。我们也可以创建我们自己的_ReactorServiceInstanceLoadBalancer_实现，使用我们想要的任何算法。

此外，库提供了一种**动态发现服务实例的方式**。我们通过使用_DiscoveryClientServiceInstanceListSupplier_接口来实现这一点。这对于与服务发现系统集成，如Eureka或Zookeeper，非常有用。

除了不同的负载均衡和服务发现特性外，库还提供了基本的重试能力。在底层，它最终依赖于Spring Retry库。**这允许我们重试失败的请求**，可能在一段时间后使用相同的实例。

另一个内置特性是指标，它建立在Micrometer库之上。开箱即用，我们为每个实例获得基本的服务级别指标，但我们也可以添加我们自己的。

最后，Spring Cloud Load Balancer库提供了一种使用_LoadBalancerCacheManager_接口缓存服务实例的方式。这很重要，因为，在现实中，**查找可用服务实例可能涉及远程调用**。这意味着查找不经常更改的数据可能代价高昂，并且它也代表了应用程序中的一个可能的故障点。**通过使用服务实例的缓存，我们的应用程序可以绕过这些缺点。**

## 5. 结论

负载均衡是构建现代、容错系统的重要组成部分。使用Spring Cloud Load Balancer，**我们可以轻松创建使用各种负载均衡技术将请求分发到不同服务实例的应用程序**。

当然，这里所有的示例代码都可以在GitHub上找到。