---
date: 2022-04-07
category:
  - Spring Cloud
  - Eureka
tag:
  - Spring Cloud
  - Eureka
  - Discovery Client
head:
  - - meta
    - name: keywords
      content: Spring Cloud, Eureka, Discovery Client, 服务发现
------
# Spring Cloud – 使用配置文件禁用发现客户端

## 1. 概述

在本教程中，我们将探讨如何使用配置文件禁用 Spring Cloud 的发现客户端。这在某些情况下非常有用，比如我们希望在不更改代码的情况下启用/禁用服务发现。

## 2. 设置 Eureka 服务器和 Eureka 客户端

首先，我们创建一个 Eureka 服务器和一个发现客户端。

### 2.1. 发现客户端设置

接下来，我们需要创建另一个应用程序，该应用程序将在服务器上注册自己。让我们将此应用程序设置为发现客户端。

让我们在 _pom.xml_ 中添加 Web 和 Eureka 客户端启动依赖项：

```xml
``<dependencies>``
    ```<dependency>```
        ```<groupId>```org.springframework.cloud```</groupId>```
        ```<artifactId>```spring-cloud-starter-netflix-eureka-client```</artifactId>```
    ```</dependency>```
    ```<dependency>```
        ```<groupId>```org.springframework.boot```</groupId>```
        ```<artifactId>```spring-boot-starter-web```</artifactId>```
    ```</dependency>```
``</dependencies>``
```

我们还需要确保我们的云启动器在依赖管理部分存在，并且设置了 Spring Cloud 版本。

如果使用 Spring Initializr 创建项目，这些将已经设置好。如果没有，我们可以将它们添加到我们的 _pom.xml_ 文件中：

```xml
`<dependencyManagement>`
    ``<dependencies>``
        ```<dependency>```
            ```<groupId>```org.springframework.cloud```</groupId>```
            ```<artifactId>```spring-cloud-starter-parent```</artifactId>```
            `<version>`${spring-cloud-dependencies.version}`</version>`
            `<type>`pom`</type>`
            `<scope>`import`</scope>`
        ```</dependency>```
    ``</dependencies>``
`</dependencyManagement>`

`<properties>`
    `<spring-cloud-dependencies.version>`2021.0.3`</spring-cloud-dependencies.version>`
`</properties>`
```

### 2.2. 添加配置属性

一旦我们有了依赖项，我们所要做的就是将我们新客户端应用程序的配置属性添加到 _application.properties_ 文件中：

```
eureka.client.serviceUrl.defaultZone=${EUREKA_URI:http://localhost:8761/eureka}
eureka.instance.preferIpAddress=false
spring.application.name=spring-cloud-eureka-client
```

这将确保当应用程序启动时，它将在上述 URL 上注册到 Eureka 服务器。它将被称为 _spring-cloud-eureka-client_。

我们应该注意到，通常我们还会在配置类上使用 _@EnableDiscoveryClient_ 注解来启用发现客户端。但是，如果我们使用 Spring Cloud 启动器，我们不需要该注解。发现客户端默认启用。此外，当它在类路径上找到 Netflix Eureka 客户端时，它将自动配置它。

### 2.3. Hello World 控制器

为了测试我们的应用程序，我们需要一个我们可以访问的示例 URL。让我们创建一个简单的控制器，它将返回一个问候消息：

```java
@RestController
public class HelloWorldController {

    @RequestMapping("/hello")
    public String hello() {
        return "Hello World!";
    }
}
```

现在，是时候运行 Eureka 服务器和发现客户端了。当我们运行应用程序时，发现客户端将向 Eureka 服务器注册。我们可以在 Eureka 服务器仪表板上看到相同的内容：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/Screenshot-2022-03-07-at-1.13.16-PM.png)

## 3. 基于配置文件的配置

有时我们可能希望禁用服务注册。一个原因可能是环境。

例如，我们可能希望在本地开发环境中禁用发现客户端，因为每次我们想在本地测试时运行 Eureka 服务器可能是不必要的。让我们看看如何实现这一点。

我们将在 _application.properties_ 文件中更改属性，以按配置文件启用和禁用发现客户端。

### 3.1. 使用单独的属性文件

一种简单且流行的方法是根据环境使用单独的属性文件。

所以，让我们创建另一个名为 _application-dev.properties_ 的属性文件：

```
spring.cloud.discovery.enabled=false
```

我们可以使用 _spring.cloud.discovery.enabled_ 属性来启用/禁用发现客户端。我们将其设置为 _false_ 以禁用发现客户端。

当 _dev_ 配置文件处于活动状态时，将使用此文件而不是原始属性文件。

### 3.2. 使用多文档文件

如果我们不想为每个环境使用单独的文件，另一个选择是使用多文档属性文件。

我们将添加两个属性来实现这一点：

```
#---
spring.config.activate.on-profile=dev
spring.cloud.discovery.enabled=false
```

对于这种技术，我们使用 _‘#—‘_ 将属性文件分成两部分。此外，我们将使用 _spring.config.activate.on-profile_ 属性。这两条线一起使用，**指示应用程序** **仅在配置文件处于活动状态时读取当前部分中定义的属性**。在我们的情况下，我们将使用 _dev_ 配置文件。

同样，我们已将 _spring.cloud.discovery.enabled_ 属性设置为 _false_。

这将在 _dev_ 配置文件中禁用发现客户端，但在配置文件不活动时保持启用。

## 4. 测试

现在，是时候运行 Eureka 服务器和发现客户端并测试一切是否按预期工作。我们还没有添加配置文件。当我们运行应用程序时，发现客户端将向 Eureka 服务器注册。我们可以在 Eureka 服务器仪表板上看到相同的内容：

### 4.1. 使用配置文件进行测试

接下来，我们将在运行应用程序时添加配置文件。我们可以添加命令行参数 _-Dspring.profiles.active=dev_ 来启用 _dev_ 配置文件。当我们运行应用程序时，这次我们可以看到客户端没有向 Eureka 服务器注册：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/Screenshot-2022-03-10-at-10.50.44-AM.png)

## 5. 结论

在本教程中，我们学习了如何使用属性根据配置文件添加配置。我们使用了相同的方法根据活动配置文件禁用发现客户端。

一如既往，本教程的代码可在 GitHub 上获取。