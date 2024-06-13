---
date: 2024-06-13
category:
  - Java
  - gRPC
tag:
  - ALTS
  - 安全
---
# gRPC 在 Java 中使用应用层传输安全（ALTS）进行认证

在本教程中，我们将探讨 ALTS（应用层传输安全）在 gRPC 应用程序中的作用。众所周知，在分布式架构中确保认证和数据安全是困难但至关重要的。

ALTS 是 Google 专为其云基础设施定制构建的内置双向认证和传输加密解决方案。ALTS 简化了 gRPC 服务之间的认证和数据加密，并且可以通过最小的代码更改启用。因此，它在开发者中很受欢迎，因为他们可以更多地专注于编写业务逻辑。

ALTS 与 TLS 类似，但具有针对 Google 基础设施优化的不同信任模型。让我们快速看一下它们之间的主要区别：

| 特性 | ALTS | TLS |
| --- | --- | --- |
| 信任模型 | 基于身份，依赖于 GCP IAM 服务账户 | 基于证书，需要证书管理，包括续订和撤销 |
| 设计 | 更简单 | 更复杂 |
| 使用上下文 | 用于保护在 Google 数据中心运行的 gRPC 服务 | 用于保护 Web 浏览（HTTPS）、电子邮件、即时消息、VoIP 等 |
| 消息序列化 | 使用 Protocol Buffers | 使用用 ASN.1 编码的 X.509 证书 |
| 性能 | 为通用用途设计 | 针对 Google 数据中心中的低延迟、高吞吐量通信进行优化 |

ALTS 功能默认在 Google Cloud Platform (GCP) 上启用。它使用 GCP 服务账户来保护 gRPC 服务之间的 RPC 调用。具体来说，它在 Google 的基础设施内运行于 Google Compute Engine 或 Kubernetes Engine (GKE)。

让我们假设医院有一个手术室（OT）预订系统，由前端和后端服务组成：

手术室预订系统由在 Google Cloud Platform (GCP) 上运行的两个服务组成。前端服务向后端服务发起远程过程调用。我们将使用 gRPC 框架开发服务。考虑到数据的敏感性，我们将利用 GCP 中内置的 ALTS 功能来启用传输数据的认证和加密。

首先，让我们定义 protobuf _ot_booking.proto_ 文件：

```protobuf
syntax = "proto3";

package otbooking;

option java_multiple_files = true;
option java_package = "com.baeldung.grpc.alts.otbooking";

service OtBookingService {
  rpc getBookingInfo(BookingRequest) returns (BookingResponse) {}
}

message BookingRequest {
  string patientID = 1;
  string doctorID = 2;
  string description = 3;
}

message BookingResponse {
  string bookingDate = 1;
  string condition = 2;
}
```

基本上，我们在 protobuf 文件中声明了一个服务 _OtBookingService_ 和 RPC _getBookingInfo()_，以及两个 DTOs _BookingRequest_ 和 _BookingResponse_。

接下来，让我们看看这个应用的重要类：

Maven 插件编译 protobuf 文件并自动生成一些类，如 _OtBookingServiceGrpc_、_OtBookingServiceImplBase_、_BookingRequest_ 和 _BookingResponse_。**我们将使用 gRPC 库类 _AltsChannelBuilder_ 来启用 ALTS 以在客户端创建 _ManagedChannel_ 对象**。最后，我们将使用 _OtBookingServiceGrpc_ 生成 _OtBookingServiceBlockingStub_ 以调用在服务器端运行的 RPC _getBookingInfo()_ 方法。

**与 _AltsChannelBuilder_ 类似，** **_AltsServerBuilder_ 类帮助在服务器端启用 ALTS。我们注册拦截器 _ClientAuthInterceptor_ 以帮助认证客户端**。最后，我们将 _OtBookingService_ 注册到 _io.grpc.Server_ 对象，然后启动服务。

此外，我们将在下一节中讨论实现。

### 4.1. 先决条件

由于 ALTS 是 GCP 的内置功能，我们将不得不为运行示例应用程序提供一些云资源。

首先，我们将创建两个 IAM 服务账户，分别与前端和后端服务器关联：

然后，我们将创建两个虚拟机，分别托管前端和后端服务：

虚拟机 _prod-booking-client-vm_ 与 _prod-ot-booking-client-svc_ 服务账户关联。同样，_prod-booking-service-vm_ 与 _prod-ot-booking-svc_ 服务账户关联。服务账户作为服务器的身份，ALTS 用它们进行授权和加密。

### 4.2. 实现

让我们首先进入 _pom.xml_ 文件，解决 Maven 依赖：

```xml
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-alts</artifactId>
    <version>1.63.0</version>
</dependency>
```

然后，我们将实现后端，从 _AltsBookingServer_ 类开始：

```java
public class AltsOtBookingServer {
    public static void main(String[] args) throws IOException, InterruptedException {
        final String CLIENT_SERVICE_ACCOUNT = args[0];
        Server server = AltsServerBuilder.forPort(8080)
          .intercept(new ClientAuthInterceptor(CLIENT_SERVICE_ACCOUNT))
          .addService(new OtBookingService())
          .build();
        server.start();
        server.awaitTermination();
    }
}
```

gRPC 提供了一个特殊的类 _AltsServerBuilder_ 用于以 ALTS 模式配置服务器。我们在服务器上注册了 _ClientAuthInterceptor_ 来拦截所有 RPC，在它们到达 _OtBookingService_ 类的端点之前。

让我们看看 _ClientAuthInterceptor_ 类：

```java
public class ClientAuthInterceptor implements ServerInterceptor {
    String clientServiceAccount = null;
    public ClientAuthInterceptor(String clientServiceAccount) {
        this.clientServiceAccount = clientServiceAccount;
    }

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(ServerCall<ReqT, RespT> serverCall, Metadata metadata,
        ServerCallHandler<ReqT, RespT> serverCallHandler) {
        Status status = AuthorizationUtil.clientAuthorizationCheck(serverCall,
            Lists.newArrayList(this.clientServiceAccount));
        if (!status.isOk()) {
            serverCall.close(status, new Metadata());
        }
        return serverCallHandler.startCall(serverCall, metadata);
    }
}
```

所有的 RPC 都击中了 _ClientAuthInterceptor_ 中的 _intercept()_ 方法。然后，我们调用 gRPC 库类 _AuthorizationUtil_ 的 _clientAuthorizationCheck()_ 方法来授权客户端服务账户。最后，只有当授权成功时，RPC 才会继续进行。

接下来，让我们看看前端服务：

```java
public class AltsOtBookingClient {
    public static void main(String[] args) {
        final String SERVER_ADDRESS = args[0];
        final String SERVER_ADDRESS_SERVICE_ACCOUNT = args[1];
        ManagedChannel managedChannel = AltsChannelBuilder.forTarget(SERVER_ADDRESS)
          .addTargetServiceAccount(SERVER_ADDRESS_SERVICE_ACCOUNT)
          .build();
        OtBookingServiceGrpc.OtBookingServiceBlockingStub OTBookingServiceStub = OtBookingServiceGrpc
          .newBlockingStub(managedChannel);
        BookingResponse bookingResponse = OTBookingServiceStub.getBookingInfo(BookingRequest.newBuilder()
          .setPatientID("PT-1204")
          .setDoctorID("DC-3904")
          .build());
        managedChannel.shutdown();
    }
}
```

与 _AltsServerBuilder_ 类似，gRPC 提供了一个 _AltsChannelBuilder_ 类在客户端启用 ALTS。我们可以多次调用 _addTargetServiceAccount()_ 方法来添加多个潜在的目标服务账户。进一步，我们通过在存根上调用 _getBookingInfo()_ 方法来启动 RPC。

**同一个服务账户可以与多个虚拟机关联。因此，它提供了一定程度的灵活性和敏捷性来水平扩展服务。**

### 4.3. 在 Google Compute Engine 上运行

让我们登录到两个服务器，然后克隆托管示例 gRPC 服务源代码的 GitHub 仓库：

```bash
git clone https://github.com/eugenp/tutorials.git
```

克隆后，我们将在 _tutorials/grpc_ 目录中编译代码：

```bash
mvn clean compile
```

编译成功后，我们将在 _prod-booking-service-vm_ 上启动后端服务：

```bash
mvn exec:java -Dexec.mainClass="com.baeldung.grpc.alts.server.AltsOtBookingServer" \
-Dexec.arguments="prod-ot-booking-client-svc@grpc-alts-demo.iam.gserviceaccount.com"
```

我们用前端客户端的服务账户作为参数运行了 _AltsOtBookingServer_ 类。

服务启动并运行后，我们将在虚拟机 _prod-booking-client-vm_ 上运行的前端服务中发起 RPC：

```bash
mvn exec:java -Dexec.mainClass="com.baeldung.grpc.alts.client.AltsOtBookingClient" \
-Dexec.arguments="10.128.0.2:8080,prod-ot-booking-svc@grpc-alts-demo.iam.gserviceaccount.com"
```

我们用两个参数运行了 _AltsOtBookingClient_ 类。第一个参数是后端服务正在运行的目标服务器，第二个参数是与后端服务器关联的服务账户。

命令成功运行，服务在认证客户端后返回响应：

让我们假设我们禁用客户端服务账户：

结果，ALTS 阻止了 RPC 到达后端服务：
RPC 因状态 _UNAVAILABLE_ 失败。

现在，让我们禁用后端服务器的服务账户：

令人惊讶的是，RPC 通过了，但在重新启动服务器后，它像之前的场景一样失败了：
**看起来 ALTS 之前缓存了服务账户的状态，但在服务器重启后，RPC 因状态 _UNKNOWN_ 失败**。

## 5. 结论

在本文中，我们深入探讨了支持 ALTS 的 gRPC Java 库。通过最小的代码，可以在 gRPC 服务中启用 ALTS。它还通过使用 GCP IAM 服务账户，提供了更大的灵活性来控制 gRPC 服务的授权。

**但是，它只能在 GCP 基础设施中工作，因为它是开箱即用的。因此，要在 GCP 基础设施之外运行 gRPC 服务，gRPC 中的 TLS 支持至关重要，并且必须手动配置。**

像往常一样，这里使用到的代码可以在 GitHub 上找到。
OK