---
date: 2024-07-13
category:
  - Spring Webflux
  - DataBufferLimitException
tag:
  - WebFlux
  - Reactive Programming
head:
  - - meta
    - name: keywords
      content: Spring Webflux, Reactive Programming, DataBufferLimitException, Configuration, WebFluxConfigurer
---
# 如何解决Spring Webflux中的DataBufferLimitException

在本教程中，我们将探讨为什么在Spring Webflux应用程序中可能会出现_DataBufferLimitException_，并查看解决此问题的不同方法。

### 2.1. 什么是_DataBufferLimitException?_

Spring WebFlux限制了在编解码器中的内存缓冲数据量，以避免应用程序内存问题。**默认情况下，这个配置设置为262,144字节**。当这不足以满足我们的用例时，我们将遇到_DataBufferLimitException_。

### 2.2. 什么是_编解码器（Codec）?_

_spring-web_和_spring-core_模块通过非阻塞I/O和反应式流背压提供了将字节内容序列化和反序列化为更高级对象的支持。_编解码器_提供了Java序列化的一种替代方案。一个优点是，通常对象不需要实现_Serializable_。

### 3.1. 重现问题

让我们尝试向我们的Spring Webflux服务器应用程序发送一个390KB大小的JSON负载来创建异常。我们将使用_curl_命令向服务器发送_POST_请求：

```shell
curl --location --request POST 'http://localhost:8080/1.0/process' \
  --header 'Content-Type: application/json' \
  --data-binary '@/tmp/390KB.json'
```

如我们所见，抛出了_DataBufferLimitException_：

```plaintext
org.springframework.core.io.buffer.DataBufferLimitException: Exceeded limit on max bytes to buffer : 262144
  at org.springframework.core.io.buffer.LimitedDataBufferList.raiseLimitException(LimitedDataBufferList.java:99) ~[spring-core-5.3.23.jar:5.3.23]
  Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException:
Error has been observed at the following site(s):
  *__checkpoint ⇢ HTTP POST "/1.0/process" [ExceptionHandlingWebHandler]
```

### 3.2. 解决方案

我们可以使用_WebFluxConfigurer_接口来配置这些阈值。为此，我们将添加一个新的配置类，_WebFluxConfiguration_：

```java
@Configuration
public class WebFluxConfiguration implements WebFluxConfigurer {
    @Override
    public void configureHttpMessageCodecs(ServerCodecConfigurer configurer) {
        configurer.defaultCodecs().maxInMemorySize(500 * 1024);
    }
}
```

我们还需要更新我们的应用程序属性：

```properties
spring:
  codec:
    max-in-memory-size: 500KB
```

### 4.1. 重现问题

现在让我们使用Webflux的_WebClient_来重现相同的行为。让我们创建一个处理器，它使用390KB的负载调用服务器：

```java
public Mono`<Users>` fetch() {
    return webClient
      .post()
      .uri("/1.0/process")
      .body(BodyInserters.fromPublisher(readRequestBody(), Users.class))
      .exchangeToMono(clientResponse -> clientResponse.bodyToMono(Users.class));
}
```

我们再次看到抛出了相同的异常，但这次是因为_webClient_尝试发送的负载超过了允许的大小：

```plaintext
org.springframework.core.io.buffer.DataBufferLimitException: Exceeded limit on max bytes to buffer : 262144
  at org.springframework.core.io.buffer.LimitedDataBufferList.raiseLimitException(LimitedDataBufferList.java:99) ~[spring-core-5.3.23.jar:5.3.23]
  Suppressed: reactor.core.publisher.FluxOnAssembly$OnAssemblyException:
Error has been observed at the following site(s):
    *__checkpoint ⇢ Body from POST http://localhost:8080/1.0/process [DefaultClientResponse]
    *__checkpoint ⇢ Handler com.baeldung.spring.reactive.springreactiveexceptions.handler.TriggerHandler@428eedd9 [DispatcherHandler]
    *__checkpoint ⇢ HTTP POST "/1.0/trigger" [ExceptionHandlingWebHandler]
```

### 4.2. 解决方案

我们也有程序化的方式来配置web客户端以实现这个目标。让我们创建一个具有以下配置的_WebClient_：

```java
@Bean("progWebClient")
public WebClient getProgSelfWebClient() {
    return WebClient
      .builder()
      .baseUrl(host)
      .exchangeStrategies(ExchangeStrategies
        .builder()
        .codecs(codecs -> codecs
          .defaultCodecs()
          .maxInMemorySize(500 * 1024))
        .build())
      .build();
}
```

我们还需要更新我们的应用程序属性：

```properties
spring:
  codec:
    max-in-memory-size: 500KB
```

通过这些配置，我们现在应该能够从应用程序发送大于500KB的有效负载。值得注意的是，此配置应用于整个应用程序，这意味着对所有web客户端和服务器本身都有效。

因此，如果我们只想为特定的web客户端配置此限制，那么这并不是一个理想的解决方案。此外，这种方法有一个缺点。用于创建WebClients的构建器必须像下面这样由Spring自动装配：

```java
@Bean("webClient")
public WebClient getSelfWebClient(WebClient.Builder builder) {
  return builder.baseUrl(host).build();
}
```

### 5. 结论

在本文中，我们了解了_DataBufferLimitException_是什么，并查看了如何在服务器和客户端两侧修复它们。我们查看了两种方法，基于属性配置和程序化配置。我们希望这个异常再也不会给你带来麻烦。

如常，完整的代码可以在GitHub上找到。