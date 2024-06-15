---
date: 2024-06-15
category:
  - gRPC
  - Java
tag:
  - 重试策略
  - 微服务
---
# gRPC请求的重试策略配置 | Baeldung

## 1. 概述

在本教程中，我们将讨论在gRPC中实现重试策略的各种方式，gRPC是由Google开发的远程过程调用框架。gRPC可以在多种编程语言中互操作，但我们将专注于Java实现。

## 2. 重试的重要性

应用程序越来越多地依赖于分布式架构。这种方法有助于通过水平扩展来处理重负载。它还促进了高可用性。然而，它也引入了更多的潜在故障点。因此，在开发具有多个微服务的应用程序时，容错能力至关重要。

**RPC可能会因各种原因暂时或短暂地失败：**

- **网络延迟或网络中的连接中断**
- **服务器由于内部错误而不响应**
- **系统资源繁忙**
- **下游服务忙碌或不可用**
- **其他相关问题**

重试是一种故障处理机制。重试策略可以帮助根据某些条件自动重新尝试失败的请求。它还可以定义客户端可以重试多长时间或多频繁。这种简单的模式可以帮助处理暂时性故障并提高可靠性。

## 3. RPC失败阶段

让我们首先了解远程过程调用(RPC)可能在哪些地方失败：

客户端应用程序发起请求，gRPC客户端库将其发送到服务器。一旦收到，gRPC服务器库将请求转发到服务器应用程序逻辑。

**RPC可以在不同阶段失败：**

1. **在离开客户端之前**
2. **在服务器中但在到达服务器应用程序逻辑之前**
3. **在服务器应用程序逻辑中**

## 4. gRPC中的重试支持

由于重试是一种重要的恢复机制，gRPC在特殊情况下会自动重试失败的请求，并允许开发人员为更大的控制定义重试策略。

### 4.1. 透明重试

我们必须理解，只有在请求没有到达应用程序服务器逻辑的情况下，gRPC才能安全地重新尝试失败的请求。除此之外，gRPC不能保证事务的幂等性。让我们看看整体的透明重试路径：

**如前所述，内部重试可以在离开客户端之前或在服务器中但在到达服务器应用程序逻辑之前安全地发生。**这种重试策略被称为透明重试。一旦服务器应用程序成功处理请求，它就会返回响应并不再尝试重试。

当RPC到达gRPC服务器库时，gRPC可以执行单个重试，因为多次重试可能会给网络增加负载。然而，当RPC无法离开客户端时，它可能会无限次地重试。

### 4.2. 重试策略

为了给开发人员更多的控制权，gRPC支持在个别服务或方法级别为他们的应用配置适当的重试策略。一旦请求越过第二阶段，它就属于可配置的重试策略的范围。服务所有者或发布者可以通过服务配置的帮助来配置他们的RPC的重试策略，这是一个JSON文件。

**服务所有者通常使用名称解析服务（如DNS）将服务配置分发给gRPC客户端。然而，在名称解析不提供服务配置的情况下，服务消费者或开发人员可以以编程方式进行配置。**

gRPC支持多个重试参数：

| 配置名称 | 描述 |
| --- | --- |
| maxAttempts | - 包括原始请求在内的RPC尝试的最大次数````<br>````- 默认最大值是5 |
| initialBackoff | - 重试尝试之间的初始后退延迟 |
| maxBackoff | - 它对指数后退增长设置了上限````<br>````- 它是强制性的，必须大于零 |
| backoffMultiplier | - 每次重试尝试后，后退将乘以这个值，并在乘数大于1时指数增长````<br>````- 它是强制性的，必须大于零 |
| retryableStatusCodes | - 失败的gRPC调用如果匹配状态将自动重试````<br>````- 服务所有者在设计可以重试的方法时应该小心。方法应该是幂等的，或者只有在RPC没有在服务器上进行任何更改的错误状态代码时才允许重试 |

值得注意的是，gRPC客户端使用_initialBackoff_、_maxBackoff_和_backoffMultiplier_参数来随机化重试请求之前的延迟。

有时，服务器可能会在响应元数据中发送不重试或在某些延迟后尝试请求的指令。这被称为服务器推回。

现在我们已经讨论了gRPC的透明和基于策略的重试特性，让我们总结一下gRPC如何总体上管理重试：

## 5. 以编程方式应用重试策略

假设我们有一个服务，可以通过调用底层通知服务向公民广播消息，该服务向手机发送短信。政府使用此服务在紧急情况下发布公告。使用此服务的客户端应用程序必须具有重试策略，以减轻由于暂时性故障导致的错误。

让我们进一步探讨这个问题。

### 5.1. 高层设计

首先，让我们看看__broadcast.proto__文件中的接口定义：

```protobuf
syntax = "proto3";
option java_multiple_files = true;
option java_package = "com.baeldung.grpc.retry";
package retryexample;

message NotificationRequest {
  string message = 1;
  string type = 2;
  int32 messageID = 3;
}

message NotificationResponse {
  string response = 1;
}

service NotificationService {
  rpc notify(NotificationRequest) returns (NotificationResponse){}
}
```

**__broadcast.proto__文件定义了_NotificationService_，它有一个远程方法_notify()_和两个DTOs _NotificationRequest_和_NotificationResponse_。**

总的来说，让我们看看gRPC应用程序的客户端和服务器端使用的类：

稍后，我们可以使用__broadcast.proto__文件生成支持Java源代码，以实现_NotificationService_。Maven插件生成了类_NotificationRequest_、_NotificationResponse_和_NotificationServiceGrpc_。

服务器端的_GrpcBroadcastingServer_类使用_ServerBuilder_类来注册_NotificationServiceImpl_以广播消息。**客户端类_GrpcBroadcastingClient_使用gRPC库的_ManagedChannel_类来管理执行RPC的通道。**

服务配置文件_retry-service-config.json_概述了重试策略：

```json
{
     "methodConfig": [
         {
             "name": [
                 {
                      "service": "retryexample.NotificationService",
                      "method": "notify"
                 }
             ],
             "retryPolicy": {
                 "maxAttempts": 5,
                 "initialBackoff": "0.5s",
                 "maxBackoff": "30s",
                 "backoffMultiplier": 2,
                 "retryableStatusCodes": [
                     "UNAVAILABLE"
                 ]
             }
         }
     ]
}
```

之前，我们了解了_maxAttempts_、指数退避参数和_retryableStatusCodes_等重试策略。当客户端在_NotificationService_中调用远程过程_notify()_时，如之前在__broadcast.proto__文件中定义的那样，gRPC框架将执行重试设置。

### 5.2. 实现重试策略

让我们看看_GrpcBroadcastingClient_类：

```java
public class GrpcBroadcastingClient {
    protected static Map`<String, ?>` getServiceConfig() {
        return new Gson().fromJson(new JsonReader(new InputStreamReader(GrpcBroadcastingClient.class.getClassLoader()
            .getResourceAsStream("retry-service-config.json"), StandardCharsets.UTF_8)), Map.class);
    }

    public static NotificationResponse broadcastMessage() {
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 8080)
          .usePlaintext()
          .disableServiceConfigLookUp()
          .defaultServiceConfig(getServiceConfig())
          .enableRetry()
          .build();
        return sendNotification(channel);
    }

    public static NotificationResponse sendNotification(ManagedChannel channel) {
        NotificationServiceGrpc.NotificationServiceBlockingStub notificationServiceStub = NotificationServiceGrpc
          .newBlockingStub(channel);

        NotificationResponse response = notificationServiceStub.notify(NotificationRequest.newBuilder()
          .setType("Warning")
          .setMessage("Heavy rains expected")
          .setMessageID(generateMessageID())
          .build());
        channel.shutdown();
        return response;
    }
}
```

_broadcast()_方法构建了带有必要配置的_ManagedChannel_对象。然后，我们将其传递给_sendNotification()_，该方法进一步调用了存根上的_notify()_方法。

**在设置包括重试策略的服务配置方面，_ManagedChannelBuilder_类中的方法起着至关重要的作用：**

- **_disableServiceConfigLookup()_: 明确禁用通过名称解析的服务配置查找**
- **_enableRetry()_: 启用每个方法的重试配置**
- **_defaultServiceConfig()_: 明确设置服务配置**

_getServiceConfig()_方法从_retry-service-config.json_文件中读取服务配置，并返回其内容的_Map_表示。随后，这个_Map_被传递到_ManagedChannelBuilder_类的_defaultServiceConfig()_方法中。

最后，在创建了_ManagedChannel_对象之后，我们调用_notificationServiceStub_对象的_notify()_方法，该对象的类型是_NotificationServiceGrpc.NotificationServiceBlockingStub_，以广播消息。该策略也适用于非阻塞存根。

**建议使用专用类来创建_ManagedChannel_对象。这允许集中管理，包括配置重试策略。**

为了演示重试功能，服务器中的_NotificationServiceImpl_类被设计为随机不可用。让我们看看_GrpcBroadcastingClient_的实际运行情况：

```java```java
@Test
void whenMessageBroadcasting_thenSuccessOrThrowsStatusRuntimeException() {
    try {
        NotificationResponse notificationResponse = GrpcBroadcastingClient.sendNotification(managedChannel);
        assertEquals("Message received: Warning - Heavy rains expected", notificationResponse.getResponse());
    } catch (Exception ex) {
        assertTrue(ex instanceof StatusRuntimeException);
    }
}
```

**该方法调用_GrpcBroadcastingClient_类的_sendNotification()_来调用服务器端远程过程以广播消息。我们可以通过检查日志来验证重试：**

## 结论

在本文中，我们探讨了gRPC库中的重试策略功能。通过JSON文件声明性地设置策略的能力是一个强大的特性。然而，我们应该仅在测试场景中使用它，或者在名称解析期间服务配置不可用时使用。

**重试失败的请求可能导致不可预测的结果，因此我们应该小心仅将其设置为幂等事务。**

像往常一样，本文中使用的所有代码都可以在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系方式。

OK