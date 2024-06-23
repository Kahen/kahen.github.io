---
date: 2024-06-23
category:
  - Spring Boot
  - gRPC
tag:
  - Baeldung
  - 教程
head:
  - - meta
    - name: keywords
      content: Spring Boot, gRPC, 教程, Baeldung
---
# gRPC与Spring Boot入门指南

无论你是刚开始学习还是拥有多年经验，**Spring Boot** 显然是构建一个web应用程序的极佳选择。

Jmix基于这个功能强大且成熟的Boot堆栈，允许开发者在不需要编写前端代码的情况下构建和交付**全栈web应用程序**。非常灵活，从简单的web GUI CRUD应用程序到复杂的企业解决方案。

具体来说，**Jmix平台**包括一个构建在**Spring Boot、JPA和Vaadin**之上的框架，并附带Jmix Studio，这是一个配备了一系列开发者生产力工具的**IntelliJ IDEA插件**。

该平台带有相互连接的**开箱即用**的插件，用于报告生成、BPM、地图、从数据库即时生成web应用程序等：

**>> 成为一个高效的全栈开发者，使用Jmix**

现在，随着新版《REST With Spring -_ "REST With Spring Boot"_** 最终发布，当前价格将在本周五之前有效，之后将永久增加50美元。

**>> 立即获取访问**

## 1. 概述

**gRPC是一个由Google最初开发的高性能、开源的RPC框架。** 它有助于消除样板代码，并在数据中心内外连接多语言服务。API基于Protocol Buffers，提供了一个_protoc_编译器，用于为不同支持的语言生成代码。

我们可以将gRPC视为REST、SOAP或GraphQL的替代品，它建立在HTTP/2之上，使用诸如多路复用或流式连接等功能。

在本教程中，我们将学习如何使用Spring Boot实现gRPC服务提供者和消费者。

## 2. 挑战

首先，我们可以注意到**Spring Boot中没有直接支持gRPC**。只支持Protocol Buffers，这允许我们实现基于protobuf的REST服务。因此，我们需要通过使用第三方库或自行管理一些挑战来包含gRPC：

- 平台依赖编译器：_protoc_编译器是平台依赖的。因此，如果存根应在构建时生成，构建将变得更加复杂且容易出错。
- 依赖项：我们需要Spring Boot应用程序中的兼容依赖项。不幸的是，Java的_protoc_添加了一个_javax.annotation.Generated_注释，这迫使我们为编译添加了对旧的_Java EE Annotations for Java_库的依赖。
- 服务器运行时：gRPC服务提供者需要在服务器内运行。gRPC for Java项目提供了一个遮蔽的Netty，我们需要将其包含在我们的Spring Boot应用程序中，或者替换为Spring Boot已经提供的服务器。
- 消息传输：Spring Boot提供了不同的客户端，如_RestClient_（阻塞）或_WebClient_（非阻塞），不幸的是，它们不能被配置和用于gRPC，因为gRPC对阻塞和非阻塞调用使用自定义传输技术。
- 配置：因为gRPC带来了自己的技术，我们需要配置属性来以Spring Boot的方式配置它们。

## 3. 示例项目

幸运的是，有一些第三方Spring Boot Starters我们可以使用来帮助我们掌握这些挑战，例如来自LogNet或grpc生态系统项目的Starters。这两个Starters都很容易集成，但后者既有提供者也有消费者支持以及许多其他集成特性，所以我们选择了后者作为我们的示例。

在这个示例中，**我们只设计了一个简单的HelloWorld API，使用单个Proto文件**：

```protobuf
syntax = "proto3";

option java_package = "com.baeldung.helloworld.stubs";
option java_multiple_files = true;

message HelloWorldRequest {
    // 要问候的名字，默认是"World"
    optional string name = 1;
}

message HelloWorldResponse {
    string greeting = 1;
}

service HelloWorldService {
    rpc SayHello(stream HelloWorldRequest) returns (stream HelloWorldResponse);
}
```

正如我们所看到的，我们使用了双向流式传输功能。

### 3.1. gRPC存根

由于存根对于提供者和消费者都是相同的，我们在一个独立的、与Spring无关的项目中生成它们。这样做的好处是，该项目的生命周期，包括_protoc_编译器配置和Java EE Annotations for Java依赖项，可以从Spring Boot项目的生命周期中隔离出来。

### 3.2. 服务提供者

实现服务提供者相当容易。首先，我们需要为Starter和我们的存根项目添加依赖项：

```xml
````<dependency>````
    ````<groupId>````net.devh````</groupId>````
    ````<artifactId>````grpc-server-spring-boot-starter````</artifactId>````
    ````<version>````2.15.0.RELEASE````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````com.baeldung.spring-boot-modules````</groupId>````
    ````<artifactId>````helloworld-grpc-java````</artifactId>````
    ````<version>````1.0.0-SNAPSHOT````</version>````
````</dependency>````
```

我们不需要包含Spring MVC或WebFlux，因为Starter依赖项带来了遮蔽的Netty服务器。我们可以在_application.yml_中**配置它**，例如，通过配置服务器端口：

```yaml
grpc:
  server:
    port: 9090
```

然后，我们需要实现服务并用_@GrpcService_注解它：

```java
@GrpcService
public class HelloWorldController extends HelloWorldServiceGrpc.HelloWorldServiceImplBase {

    @Override
    public StreamObserver`<HelloWorldRequest>` sayHello(
        StreamObserver`<HelloWorldResponse>` responseObserver
    ) {
        // ...
    }
}
```

### 3.3. 服务消费者

对于服务消费者，我们需要添加Starter和存根的依赖项：

```xml
````<dependency>````
    ````<groupId>````net.devh````</groupId>````
    ````<artifactId>````grpc-client-spring-boot-starter````</artifactId>````
    ````<version>````2.15.0.RELEASE````</version>````
````</dependency>````
````<dependency>````
    ````<groupId>````com.baeldung.spring-boot-modules````</groupId>````
    ````<artifactId>````helloworld-grpc-java````</artifactId>````
    ````<version>````1.0.0-SNAPSHOT````</version>````
````</dependency>````
```

然后，在_application.yml_中**配置对服务的连接**：

```yaml
grpc:
  client:
    hello:
      address: localhost:9090
      negotiation-type: plaintext
```

名称_“hello”_是自定义的。这样，我们可以配置多个连接，并在将gRPC客户端注入我们的Spring组件时引用此名称：

```java
@GrpcClient("hello")
HelloWorldServiceGrpc.HelloWorldServiceStub stub;

```

## 4. 陷阱

使用Spring Boot实现和消费gRPC服务相当容易。但有一些陷阱我们应该注意。

### 4.1. SSL握手

通过HTTP传输数据意味着发送未加密的信息，除非我们使用SSL。集成的Netty服务器默认不使用SSL，因此我们需要明确配置它。

否则，对于本地测试，我们可以将连接保持不加密。在这种情况下，我们需要像已经显示的那样配置消费者：

```yaml
grpc:
  client:
    hello:
      negotiation-type: plaintext
```

消费者默认使用TLS，而提供者的默认是跳过SSL加密。**因此，消费者和提供者的默认值彼此不匹配**。

### 4.2. 没有@Autowired的消费者注入

我们通过将客户端对象注入到我们的Spring组件中来实现消费者：

```java
@GrpcClient("hello")
HelloWorldServiceGrpc.HelloWorldServiceStub stub;
```

这是通过_BeanPostProcessor_实现的，并且作为Spring内置依赖注入机制的补充。这意味着我们不能将_@GrpcClient_注解与_@Autowired_或构造函数注入结合使用。相反，我们被限制为使用字段注入。

我们只能通过使用配置类来分离注入：

```java
@Configuration
public class HelloWorldGrpcClientConfiguration {

    @GrpcClient("hello")
    HelloWorldServiceGrpc.HelloWorldServiceStub helloWorldClient;

    @Bean
    MyHelloWorldClient helloWorldClient() {
        return new MyHelloWorldClient(helloWorldClient);
    }
}
```

### 4.3. 映射传输对象

由_protoc_生成的数据类型在调用带有null值的setter时可能会失败：

```java
public HelloWorldResponse map(HelloWorldMessage message) {
    return HelloWorldResponse
      .newBuilder()
      .setGreeting( message.getGreeting() ) // 可能是null
      .build();
}
```

因此，在调用setter之前我们需要进行空值检查。当我们使用映射框架时，我们需要配置映射器生成进行这样的空值检查。例如，MapStruct映射器将需要一些特殊的配置：

```java
@Mapper(
  componentModel = "spring",
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
)
public interface HelloWorldMapper {
    HelloWorldResponse map(HelloWorldMessage message);
}
```

### 4.4. 测试

Starter不包括任何特殊支持来实现测试。即使是gRPC for Java项目也只有对JUnit 4的最小支持，并且不支持JUnit 5。

### 4.5. 本地映像

当我们想要构建本地映像时，目前没有对gRPC的支持。因为客户端注入是通过反射完成的，**没有额外的配置这将无法工作**。

#