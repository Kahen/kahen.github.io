---
date: 2024-06-15
category:
  - gRPC
  - 异常处理
tag:
  - gRPC
  - 拦截器
  - 异常拦截器
---
# 在gRPC服务器中添加全局异常拦截器

在本教程中，我们将探讨gRPC服务器应用程序中拦截器的作用，以处理全局异常。

拦截器可以在请求到达RPC方法之前进行验证或操作。因此，它们对于处理应用程序的常见问题非常有用，例如日志记录、安全性、缓存、审计、身份验证和授权等。

应用程序也可以使用拦截器作为全局异常处理器。

主要地，拦截器可以帮助处理两种类型的异常：
- 处理从无法处理它们的方法中逃逸的未知运行时异常
- 处理从任何其他下游拦截器中逃逸的异常

拦截器可以帮助以集中的方式创建一个处理异常的框架。这样，应用程序就可以有一个一致的标准和强大的方法来处理异常。

它们可以以各种方式处理异常：
- 记录或持久化异常，用于审计或报告目的
- 创建支持票据
- 在将错误响应发送回客户端之前修改或丰富错误响应

### 3. 高级设计全局异常处理器

拦截器可以将传入的请求转发到目标RPC服务。然而，当目标RPC方法抛出异常时，它可以捕获它，然后适当地处理它。

让我们假设有一个订单处理微服务。我们将使用拦截器开发一个全局异常处理器，以捕获从微服务中的RPC方法逃逸的异常。此外，拦截器还捕获从任何下游拦截器逃逸的异常。然后，它调用票据服务在票务系统中提出票据。最后，将响应发送回客户端。

让我们看看当RPC端点失败时请求的遍历路径：

同样，让我们看看当日志拦截器失败时请求的遍历路径：

首先，我们将在protobuf文件_order_processing.proto_中定义订单处理服务的基类：

```protobuf
syntax = "proto3";

package orderprocessing;

option java_multiple_files = true;
option java_package = "com.baeldung.grpc.orderprocessing";

message OrderRequest {
  string product = 1;
  int32 quantity = 2;
  float price = 3;
}
message OrderResponse {
  string response = 1;
  string orderID = 2;
  string error = 3;
}
service OrderProcessor {
  rpc createOrder(OrderRequest) returns (OrderResponse){}
}
```

_order_processing.proto_文件定义了_OrderProcessor_带有远程方法_createOrder()_和两个DTOs_OrderRequest_和_OrderResponse_。

让我们看看在接下来的部分中我们将实现的主要类：

稍后，我们可以使用_order_processing.proto_文件生成支持Java源代码，以实现_OrderProcessorImpl_和_GlobalExeptionInterceptor_。Maven插件生成了类_OrderRequest_、_OrderResponse_和_OrderProcessorGrpc_。

我们将在实现部分讨论这些类中的每一个。

### 4. 实现

我们将实现一个可以处理所有类型异常的拦截器。异常可能是由于某些失败逻辑显式引发的，也可能是由于某些未预见的错误引发的。

### 4.1. 实现全局异常处理器

在gRPC应用程序中，拦截器必须实现_ServerInterceptor_接口的_interceptCall()_方法：

```java
public class GlobalExceptionInterceptor implements ServerInterceptor {
    @Override
    public ````````````<ReqT, RespT>```````````` ServerCall.Listener```````<ReqT>``````` interceptCall(ServerCall````````````<ReqT, RespT>```````````` serverCall, Metadata headers,
        ServerCallHandler````````````<ReqT, RespT>```````````` next) {
        ServerCall.Listener```````<ReqT>``````` delegate = null;
        try {
            delegate = next.startCall(serverCall, headers);
        } catch(Exception ex) {
            return handleInterceptorException(ex, serverCall);
        }
        return new ForwardingServerCallListener.SimpleForwardingServerCallListener```````<ReqT>```````(delegate) {
            @Override
            public void onHalfClose() {
                try {
                    super.onHalfClose();
                } catch (Exception ex) {
                    handleEndpointException(ex, serverCall);
                }
            }
        };
    }

    private static ````````````<ReqT, RespT>```````````` void handleEndpointException(Exception ex, ServerCall````````````<ReqT, RespT>```````````` serverCall) {
        String ticket = new TicketService().createTicket(ex.getMessage());
        serverCall.close(Status.INTERNAL
            .withCause(ex)
            .withDescription(ex.getMessage() + ", Ticket raised:" + ticket), new Metadata());
    }

    private ````````````<ReqT, RespT>```````````` ServerCall.Listener```````<ReqT>``````` handleInterceptorException(Throwable t, ServerCall````````````<ReqT, RespT>```````````` serverCall) {
        String ticket = new TicketService().createTicket(t.getMessage());
        serverCall.close(Status.INTERNAL
            .withCause(t)
            .withDescription("An exception occurred in a **subsequent** interceptor:" + ", Ticket raised:" + ticket), new Metadata());

        return new ServerCall.Listener```````<ReqT>```````() {
            // no-op
        };
    }
}
```

_interceptCall()_方法有三个输入参数：

- _ServerCall_：帮助接收响应消息
- _Metadata_：保存传入请求的元数据
- _ServerCallHandler_：帮助将传入的服务器调用分派到拦截器链中的下一个处理器

该方法有两个_try_–_catch_块。第一个处理从任何后续下游拦截器抛出的未捕获异常。在catch块中，我们调用_handleInterceptorException()_方法为异常创建一个票据。最后，它返回一个_ServerCall.Listener_对象，这是一个回调方法。

同样，第二个_try_–_catch_块处理从RPC端点抛出的未捕获异常。_interceptCall()_方法返回_ServerCall.Listener_，它作为传入RPC消息的回调。具体来说，它返回一个_ForwardingServerCallListener_的实例。_SimpleForwardingServerCallListener_是_ServerCall.Listener_的子类。

为了处理从下游方法抛出的异常，我们重写了_ForwardingServerCallListener_类中的_onHalfClose()_方法。_SimpleForwardingServerCallListener_。它在客户端完成发送消息后被调用。

在这个方法中，_super.onHalfClose()_将请求转发到_OrderProcessorImpl_类中的RPC端点_createOrder()_。如果在端点中有未捕获的异常，我们捕获异常，然后调用_handleEndpointException()_来创建一个票据。最后，我们调用_serverCall_对象上的_close()_方法来关闭服务器调用，并将响应发送回客户端。

### 4.2. 注册全局异常处理器

我们在启动期间创建_io.grpc.Server_对象时注册拦截器：

```java
public class OrderProcessingServer {
    public static void main(String[] args) throws IOException, InterruptedException {
        Server server = ServerBuilder.forPort(8080)
          .addService(new OrderProcessorImpl())
          .intercept(new LogInterceptor())
          .intercept(new GlobalExceptionInterceptor())
          .build();
        server.start();
        server.awaitTermination();
    }
}
```

我们将_GlobalExceptionInterceptor_对象传递给_io.grpc.ServerBuilder_类的_intercept()_方法。这确保了对_OrderProcessorImpl_服务的任何RPC调用都会通过_GlobalExceptionInterceptor_。同样，我们调用_addService()_方法来注册_OrderProcessorImpl_服务。最后，我们在_Server_对象上调用_start()_方法来启动服务器应用程序。

### 4.3. 处理来自端点的未捕获异常

为了演示异常处理器，让我们首先看看_OrderProcessorImpl_类：

```java
public class OrderProcessorImpl extends OrderProcessorGrpc.OrderProcessorImplBase {
    @Override
    public void createOrder(OrderRequest request, StreamObserver`<OrderResponse>` responseObserver) {
        if (!validateOrder(request)) {
             throw new StatusRuntimeException(Status.FAILED_PRECONDITION.withDescription("Order Validation failed"));
        } else {
            OrderResponse orderResponse = processOrder(request);

            responseObserver.onNext(orderResponse);
            responseObserver.onCompleted();
        }
    }

    private Boolean validateOrder(OrderRequest request) {
        int tax = 100/0;
        return false;
    }

    private OrderResponse processOrder(OrderRequest request) {
        return OrderResponse.newBuilder()
          .setOrderID("ORD-5566")
          .setResponse("Order placed successfully")
          .build();
    }
}
```

_RPC方法_createOrder()_首先验证订单，然后通过调用_processOrder()_方法来处理它。在_validateOrder()_方法中，我们故意通过除以零来强制运行时异常。

现在，让我们运行服务并看看它如何处理异常：

```java
@Test
void whenRuntimeExceptionInRPCEndpoint_thenHandleException() {
    OrderRequest orderRequest = OrderRequest.newBuilder()
      .setProduct("PRD-7788")
      .setQuantity(1)
      .setPrice(5000)
      .build();

    try {
        OrderResponse response = orderProcessorBlockingStub.createOrder(orderRequest);
    } catch (StatusRuntimeException ex) {
        assertTrue(ex.getStatus()
          .getDescription()
          .contains("Ticket raised:TKT"));
    }
}
```

我们创建_OrderRequest_对象，然后将其传递给客户端存根中的_createOrder()_方法。正如预期的那样，服务抛出了异常。当我们检查异常中的描述时，我们发现票据信息嵌入在其中。因此，它表明_GlobalExceptionInterceptor_完成了它的工作。

这对于流式传输的情况也同样有效。

### 4.4. 处理来自拦截器的未捕获异常

让我们假设有一个在_GlobalExceptionInterceptor_之后被继续翻译：

调用的第二个拦截器。LogInterceptor_记录所有传入的请求以供审计。让我们看看它：

```java
public class LogInterceptor implements ServerInterceptor {
    @Override
    public ````````````<ReqT, RespT>```````````` ServerCall.Listener```````<ReqT>``````` interceptCall(ServerCall````````````<ReqT, RespT>```````````` serverCall, Metadata metadata,
        ServerCallHandler````````````<ReqT, RespT>```````````` next) {
        logMessage(serverCall);
        ServerCall.Listener```````<ReqT>``````` delegate = next.startCall(serverCall, metadata);
        return delegate;
    }

    private ````````````<ReqT, RespT>```````````` void logMessage(ServerCall````````````<ReqT, RespT>```````````` call) {
        int result = 100/0;
    }
}
```

在_LogInterceptor_中，_interceptCall()_方法调用_logMessage()_在将请求转发到RPC端点之前记录消息。_logMessage()_方法故意执行除以零以引发运行时异常，以演示_GlobalExceptionInterceptor_的能力。

让我们运行服务并看看它如何处理从_LogInterceptor_抛出的异常：

```java
@Test
void whenRuntimeExceptionInLogInterceptor_thenHandleException() {
    OrderRequest orderRequest = OrderRequest.newBuilder()
        .setProduct("PRD-7788")
        .setQuantity(1)
        .setPrice(5000)
        .build();

    try {
        OrderResponse response = orderProcessorBlockingStub.createOrder(orderRequest);
    } catch (StatusRuntimeException ex) {
        assertTrue(ex.getStatus()
            .getDescription()
            .contains("An exception occurred in a **subsequent** interceptor:, Ticket raised:TKT"));
    }
    logger.info("order processing over");
}
```

首先，我们在客户端存根上调用_createOrder()_方法。这次，_GlobalExceptionInterceptor_在第一个_try_–_catch_块中捕获了从_LogInterceptor_逃逸的异常。随后，客户端接收到的异常中包含了描述中的票据信息。

## 5. 结论

在本文中，我们探讨了gRPC框架中拦截器作为全局异常处理器的角色。它们是处理异常的常见问题的优秀工具，如日志记录、创建票据、丰富错误响应等。

本文中使用的所有代码都可以在GitHub上找到。
---
date: 2024-06-15
category:
  - gRPC
  - 异常处理
tag:
  - gRPC
  - 拦截器
  - 异常拦截器
---
# 在gRPC服务器中添加全局异常拦截器

OK