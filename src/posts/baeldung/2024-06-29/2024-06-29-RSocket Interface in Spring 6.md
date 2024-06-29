---
date: 2022-04-XX
category:
  - Spring Framework
  - RSocket
tag:
  - Spring 6
  - Alpaquita Linux
  - RSocket Server
  - RSocket Client
head:
  - - meta
    - name: keywords
      content: Spring RSocket, Spring Framework 6, RSocket Interaction Models
---

# Spring 6中的RSocket接口 | Baeldung

寻找理想的Linux发行版，用于在云中运行现代Spring应用程序？
**遇见Alpaquita Linux**：轻量级、安全且功能强大，足以处理重负载工作。
这个发行版是**专门为运行Java应用程序设计的**。它基于Alpine构建，并具有显著的增强功能，以在高密度容器环境中表现出色，同时满足企业级安全标准。

具体来说，容器镜像大小比标准选项**小约30%**，并且它消耗的RAM**少至30%**：

**>> 立即尝试Alpaquita容器。**

## 1. 概述
在本教程中，我们将探讨如何在Spring Framework 6中使用RSocket。
随着Spring Framework 6版本中声明式RSocket客户端的引入，使用RSocket变得更加简单。这个特性消除了重复的样板代码的需要，允许开发者更有效和高效地使用RSocket。

## 2. Maven依赖
我们首先在首选的IDE中创建一个Spring Boot项目，并将_spring-boot-starter-rsocket_依赖项添加到_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`org.springframework.boot`</groupId>`
    `<artifactId>`spring-boot-starter-rsocket`</artifactId>`
    `<version>`3.1.4`</version>`
`</dependency>`
```

## 3. 创建RSocket服务器
首先，我们将创建一个使用控制器来管理传入请求的响应器：

```
@MessageMapping("MyDestination")
public Mono````````<String>```````` message(Mono````````<String>```````` input) {
    return input.doOnNext(msg -> System.out.println("请求是:" + msg + ",请求!"))
      .map(msg -> msg + ",响应!");
}
```

此外，我们将在_application.properties_文件中添加以下属性，以使服务器能够通过_MyDestination_在端口_7000_上监听：

```
spring.rsocket.server.port=7000
```

## 4. 客户端代码
现在，我们需要开发客户端代码。为了简单起见，我们将在同一个项目中的不同包中创建客户端代码。实际上，它们必须在唯一的项目中。

为了继续，让我们创建客户端接口：

```
public interface MessageClient {

    @RSocketExchange("MyDestination")
    Mono````````<String>```````` sendMessage(Mono````````<String>```````` input);
}
```

在使用我们的客户端接口时，我们使用_@RSocketExchange_来显示RSocket端点。基本上，这只是意味着我们需要一些信息来建立端点路径。我们可以通过在接口级别分配共享路径来做到这一点。这非常简单，并且帮助我们知道我们想要使用哪个端点。

## 5. 测试
每个Spring Boot项目都包括一个带有_@SpringBootApplication_注解的类。这个类在项目加载时运行。因此，我们可以使用这个类并添加一些bean来测试一个场景。

### 5.1. 创建_RSocketServiceProxyFactory_ Bean
首先，我们需要创建一个bean来生成一个_RSocketServiceProxyFactory_。

这个工厂负责创建RSocket服务接口的代理实例。它处理这些代理的创建，并通过指定服务器将接收传入连接的主机和端口，建立与RSocket服务器的必要连接：

```
@Bean
public RSocketServiceProxyFactory getRSocketServiceProxyFactory(RSocketRequester.Builder requestBuilder) {
    RSocketRequester requester = requestBuilder.tcp("localhost", 7000);
    return RSocketServiceProxyFactory.builder(requester).build();
}
```

### 5.2. 创建消息客户端
然后，我们将创建一个_Bean_，负责生成客户端接口：

```
@Bean
public MessageClient getClient(RSocketServiceProxyFactory factory) {
    return factory.createClient(MessageClient.class);
}
```

### 5.3. 创建Runner Bean
最后，让我们创建一个使用_MessageClient_实例从服务器发送和接收消息的runner bean：

```
@Bean
public ApplicationRunner runRequestResponseModel(MessageClient client) {
    return args -> {
        client.sendMessage(Mono.just("请求-响应测试 "))
          .doOnNext(message -> {
              System.out.println("响应是 :" + message);
          })
          .subscribe();
    };
}
```

### 5.4. 测试结果
当我们通过命令行运行我们的Spring Boot项目时，显示以下结果：

```
> Spring Boot响应器：已启动
> RSocketApplication 在 1.127 秒内启动（进程运行了 1.398）
> 请求是：请求-响应测试 ,请求!
> 响应是 :请求-响应测试 ,响应!
```

## 6. RSocket交互模型
RSocket是一个用于创建快速响应的分布式应用程序的二进制协议。它提供了不同的通信模式，用于在服务器和客户端之间交换数据。

有了这些交互模型，开发者可以设计满足特定数据流、积压和应用程序行为要求的系统。

RSocket有四种主要的交互模型可用。这些方法之间的主要区别基于输入和输出的基数。

### 6.1. 请求-响应
在这种方法中，每个请求都会收到一个单一的响应。因此，我们使用基数为一的_Mono_请求，并以相同的基数收到_Mono_响应。

到目前为止，本文中的所有代码都是基于请求-响应模型的。

### 6.2. 请求-流
当我们订阅新闻通讯时，我们会定期从服务器接收更新流。当客户端进行初始请求时，服务器会以数据流的形式响应。

请求可以是_Mono_或_Void_，但响应将始终是_Flux_：

```
@MessageMapping("Counter")
public Flux````````<String>```````` Counter() {
    return Flux.range(1, 10)
      .map(i -> "计数是: " + i);
}
```

### 6.3. 火并忘记
当我们通过邮件发送信件时，我们通常只是把它投入邮箱，并不期望收到回复。类似地，在火并忘记的上下文中，响应可以是_null_或单个_Mono_：

```
@MessageMapping("Warning")
public Mono`<Void>` Warning(Mono````````<String>```````` error) {
    error.doOnNext(e -> System.out.println("警告是 :" + e))
      .subscribe();
    return Mono.empty();
}
```

### 6.4. 通道
想象一下，对讲机允许双方同时进行双向通信，就像进行对话一样。这种通信依赖于发送和接收数据_Flux_：

```
@MessageMapping("channel")
public Flux````````<String>```````` channel(Flux````````<String>```````` input) {
    return input.doOnNext(i -> {
          System.out.println("收到的消息是 : " + i);
      })
      .map(m -> m.toUpperCase())
      .doOnNext(r -> {
          System.out.println("响应是 :" + r);
      });
}
```

## 7. 结论
在本文中，我们探讨了Spring 6中新的声明式RSocket客户端特性。我们还学习了如何使用_@RSocketExchange_注解。
此外，我们详细了解了如何创建和设置服务代理，以便我们可以轻松安全地使用TCP协议连接到远程端点。
此外，本教程的源代码可在GitHub上找到。由于文章内容较长，我将分两部分进行翻译。以下是第二部分的翻译：

## 7. 结论

在本文中，我们探索了Spring 6中新的声明式RSocket客户端特性。我们还学习了如何使用`@RSocketExchange`注解。此外，我们详细了解了如何创建和设置服务代理，以便我们可以轻松安全地使用TCP协议连接到远程端点。

此外，本教程的源代码可在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)
![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/ganji-150x150.jpg)
![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)
![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)
![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

翻译结束。

OK。