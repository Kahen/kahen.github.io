---
date: 2024-07-03
category:
  - Spring Boot
  - OpenFeign
tag:
  - HTTP PATCH
  - REST API
head:
  - - meta
    - name: keywords
      content: OpenFeign, HTTP PATCH, REST API, Spring Boot, Microservice
------
# 使用OpenFeign设置HTTP PATCH请求

当通过REST API更新对象时，使用PATCH方法是一个好习惯。这允许我们使用我们希望更改的字段进行部分更新。当现有的资源需要完全更改时，我们也可以使用方法PUT。

在本教程中，我们将学习如何在OpenFeign中设置HTTP PATCH方法。我们还将看到在测试Feign客户端的PATCH方法时出现的一个意外错误。最后，我们将理解根本原因并解决问题。

## 2. Spring Boot示例应用程序

让我们想象我们需要构建一个简单的微服务，该服务调用下游服务进行部分更新。

### 2.1. Maven依赖项

首先，我们将添加spring-boot-starter-web和spring-cloud-starter-openfeign依赖项：

```xml
````<dependency>````
    ````<groupId>````org.springframework.boot````</groupId>````
    ````<artifactId>````spring-boot-starter-web````</artifactId>````
````</dependency>````
````<dependency>````
    ````<groupId>````org.springframework.cloud````</groupId>````
    ````<artifactId>````spring-cloud-starter-openfeign````</artifactId>````
````</dependency>````
```

### 2.2. 实现Feign客户端

现在，让我们使用Spring Web注解在Feign中实现PATCH方法。

首先，让我们用一些属性对_User_类进行建模：

```java
public class User {
    private String userId;
    private String userName;
    private String email;
}
```

接下来，我们将实现_UserClient接口_和_updateUser_方法：

```java
@FeignClient(name = "user-client", url = "http://localhost:8082/api/user")
public interface UserClient {
    @RequestMapping(value = "{userId}", method = RequestMethod.PATCH)
    User updateUser(@PathVariable(value = "userId") String userId, @RequestBody User user);
}
```

在上面的PATCH方法中，我们传递了带有仅需要更新的字段的_User_对象以及_userId_字段。这比发送整个资源表示要简单一些，节省了一些网络带宽，并避免了当多个更新针对同一对象的不同字段时的冲突。

相反，如果我们使用PUT请求，我们将不得不传递完整的资源表示来替换现有资源。

## 3. 实现Feign客户端的测试

现在，让我们通过模拟HTTP调用来实现_UserClient_的测试用例。

### 3.1. 设置WireMock服务器

为了进行实验，我们需要使用模拟框架来模拟我们正在调用的服务。

首先，让我们包括_WireMockServer_ Maven依赖项：

```xml
````<dependency>````
    ````<groupId>````com.github.tomakehurst````</groupId>````
    ````<artifactId>````wiremock-jre8````</artifactId>````
    `<version>`2.35.0`</version>`
    `<scope>`test`</scope>`
````</dependency>````
```

然后，让我们配置并启动_WireMockServer_：

```java
WireMockServer wireMockServer = new WireMockServer(8082);
configureFor("localhost", 8082);
wireMockServer.start();
```

_WireMockServer_在Feign客户端配置使用的相同_host_和_port_上启动。

### 3.2. 模拟PATCH API

我们将模拟PATCH方法以测试更新_User_ API：

```java
String updatedUserResponse = "{\n" +
    "\"userId\": 100001,\n" +
    "\"userName\": \"name\",\n" +
    "\"email\": \"updated-email@mail.in\"\n" +
"}";
stubFor(patch(urlEqualTo("/api/user/".concat(USER_ID)))
  .willReturn(aResponse().withStatus(HttpStatus.OK.value())
  .withHeader("Content-Type", "application/json")
  .withBody(updatedUserResponse)));
```

### 3.3. 测试PATCH请求

为了测试，我们将带有需要更新的字段的_User_对象传递给_UserClient_。

现在，让我们完成测试并验证更新功能：

```java
User user = new User();
user.setUserId("100001");
user.setEmail("updated-email@mail.in");
User updatedUser = userClient.updateUser("100001", user);

assertEquals(user.getUserId(), updatedUser.getUserId());
assertEquals(user.getEmail(), updatedUser.getEmail());
```

预期上述测试应该通过。相反，我们将从Feign客户端收到一个意外的错误：

```java
feign.RetryableException: Invalid HTTP method: PATCH executing PATCH http://localhost:8082/api/user/100001
    at feign.FeignException.errorExecuting(FeignException.java:268)
    at feign.SynchronousMethodHandler.executeAndDecode(SynchronousMethodHandler.java:131)
    at feign.SynchronousMethodHandler.invoke(SynchronousMethodHandler.java:91)
    at feign.ReflectiveFeign$FeignInvocationHandler.invoke(ReflectiveFeign.java:100)
    at jdk.proxy2/jdk.proxy2.$Proxy80.updateUser(Unknown Source)
    at com.baeldung.cloud.openfeign.patcherror.client.UserClientUnitTest.givenUserExistsAndIsValid_whenUpdateUserCalled_thenReturnSuccess(UserClientUnitTest.java:64)
    ...
```

接下来，让我们详细调查错误。

### 3.4. 无效HTTP方法错误的原因

上述错误消息**表明请求的HTTP方法是无效的。**尽管根据HTTP标准，PATCH方法是有效的。

我们将从错误消息中看到，它是由_ProtocolException_类引起的，并从_HttpURLConnection_类传播：

```java
Caused by: java.net.ProtocolException: Invalid HTTP method: PATCH
    at java.base/java.net.HttpURLConnection.setRequestMethod(HttpURLConnection.java:489)
    at java.base/sun.net.www.protocol.http.HttpURLConnection.setRequestMethod(HttpURLConnection.java:598)
    at feign.Client$Default.convertAndSend(Client.java:170)
    at feign.Client$Default.execute(Client.java:104)
    at feign.SynchronousMethodHandler.executeAndDecode(SynchronousMethodHandler.java:119)
```

事实证明，默认的HTTP客户端使用_HttpURLConnection_类来建立HTTP连接。_HttpURLConnection_类有一个_setRequestMethod_方法来设置请求方法。

不幸的是，**_HttpURLConnection_类不将PATCH方法识别为有效类型。**

## 4. 修复PATCH方法错误

为了修复错误，我们将添加一个支持的HTTP客户端依赖项。我们还将通过添加配置来覆盖默认的HTTP客户端。

### 4.1. 添加_OkHttpClient_依赖项

让我们包括_feign-okhttp_依赖项：

```xml
````<dependency>````
    ````<groupId>````io.github.openfeign````</groupId>````
    ````<artifactId>````feign-okhttp````</artifactId>````
````</dependency>````
```

我们应该注意到，任何其他支持的HTTP客户端，如_ApacheHttpClient_，也将起作用。

### 4.2. 启用_OkHttpClient_

_OkHttpClient_类将PATCH方法视为有效类型，不会抛出任何异常。

让我们使用以下配置启用_OkHttpClient_类：

```properties
feign.okhttp.enabled=true
```

最后，我们将重新运行测试并验证PATCH方法是否有效。现在，我们没有从Feign客户端收到任何错误：

```plaintext
UserClientUnitTest.givenUserExistsAndIsValid_whenUpdateUserCalled_thenReturnSuccess: 1 total, 1 passed
```

## 5. 结论

在本文中，我们学习了如何在OpenFeign中使用PATCH方法。我们还看到了测试时出现的意外错误，并理解了根本原因。

我们还使用_OkHttpClient_实现修复了问题。

如常，示例代码可以在GitHub上找到。