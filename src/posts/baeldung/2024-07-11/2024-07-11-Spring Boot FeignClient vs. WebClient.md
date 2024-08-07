---
date: 2024-07-12
category:
  - Spring Boot
  - Web Client
tag:
  - FeignClient
  - WebClient
head:
  - - meta
    - name: keywords
      content: Spring Boot, FeignClient, WebClient, REST, 微服务
---

# Spring Boot FeignClient与WebClient比较

在本教程中，我们将比较Spring Feign——一种声明式REST客户端，以及Spring 5中引入的Spring _WebClient_——一种响应式Web客户端。

## 阻塞与非阻塞客户端
在当今的微服务生态系统中，通常需要后端服务使用HTTP调用其他Web服务。因此，Spring应用程序需要一个Web客户端来执行请求。

接下来，我们将检查阻塞Feign客户端和非阻塞_WebClient_实现之间的差异。

### 2.1 Spring Boot 阻塞Feign客户端
Feign客户端是一种声明式REST客户端，它使编写Web客户端变得更容易。使用Feign时，开发人员只需要定义接口并相应地进行注解。然后，Spring在运行时提供实际的Web客户端实现。

在幕后，使用_@FeignClient_注解的接口生成基于每个请求一个线程的同步实现。因此，对于每个请求，分配的线程会阻塞，直到收到响应。保持多个线程存活的缺点是每个打开的线程都占用内存和CPU周期。

接下来，让我们想象一下，如果我们的服务遭受流量激增，每秒接收数千个请求。除此之外，每个请求都需要等待几秒钟才能从上游服务返回结果。

根据分配给托管服务器的资源和流量激增的持续时间，过一段时间后，所有创建的线程将开始堆积并占用所有分配的资源。因此，这一系列的事件将降低服务的性能，并最终导致服务崩溃。

### 2.2 Spring Boot 非阻塞_WebClient_
_WebClient_是Spring WebFlux库的一部分。它是Spring响应式框架提供的非阻塞解决方案，以解决像Feign客户端这样的同步实现的性能瓶颈。

虽然Feign客户端为每个请求创建一个线程并阻塞它，直到收到响应，但_WebClient_执行HTTP请求并将“等待响应”的任务添加到队列中。稍后，“等待响应”的任务在收到响应后从队列中执行，最终将响应传递给订阅者函数。

响应式框架实现了由响应式流API驱动的事件驱动架构。正如我们所看到的，这使我们能够编写使用最少数量的阻塞线程执行HTTP请求的服务。

结果，_WebClient_帮助我们构建在恶劣环境中表现一致的服务，通过使用更少的系统资源处理更多的请求。

## 比较示例
为了看到Feign客户端和_WebClient_之间的差异，我们将实现两个HTTP端点，它们都调用同一个返回产品列表的慢速端点。

我们将看到，在阻塞Feign实现的情况下，每个请求线程会阻塞两秒钟，直到收到响应。

另一方面，非阻塞_WebClient_将立即关闭请求线程。

首先，我们需要添加三个依赖项：

```xml
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-webflux```</artifactId>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.springframework.boot```</groupId>```
    ```<artifactId>```spring-boot-starter-web```</artifactId>```
```</dependency>```
```<dependency>```
    ```<groupId>```org.springframework.cloud```</groupId>```
    ```<artifactId>```spring-cloud-starter-openfeign```</artifactId>```
```</dependency>```
```

接下来，我们有慢速端点的定义：

```java
@GetMapping("/slow-service-products")
private List``````<Product>`````` getAllProducts() throws InterruptedException {
    Thread.sleep(2000L); // 延迟
    return Arrays.asList(
      new Product("Fancy Smartphone", "A stylish phone you need"),
      new Product("Cool Watch", "The only device you need"),
      new Product("Smart TV", "Cristal clean images")
    );
}
```

### 3.1 使用Feign调用慢速服务
现在，让我们开始使用Feign实现第一个端点。

第一步是定义接口并使用@ _FeignClient_进行注解：

```java
@FeignClient(value = "productsBlocking", url = "http://localhost:8080")
public interface ProductsFeignClient {

    @RequestMapping(method = RequestMethod.GET, value = "/slow-service-products", produces = "application/json")
    List``````<Product>`````` getProductsBlocking(URI baseUrl);
}
```

最后，我们将使定义的_ProductsFeignClient_接口调用慢速服务：

```java
@GetMapping("/products-blocking")
public List``````<Product>`````` getProductsBlocking() {
    log.info("Starting BLOCKING Controller!");
    final URI uri = URI.create(getSlowServiceBaseUri());

    List``````<Product>`````` result = productsFeignClient.getProductsBlocking(uri);
    result.forEach(product -> log.info(product.toString()));

    log.info("Exiting BLOCKING Controller!");
    return result;
}
```

接下来，让我们执行一个请求并看看日志是什么样子的：

```
Starting BLOCKING Controller!
Product(title=Fancy Smartphone, description=A stylish phone you need)
Product(title=Cool Watch, description=The only device you need)
Product(title=Smart TV, description=Cristal clean images)
Exiting BLOCKING Controller!
```

正如预期的那样，**在同步实现的情况下，请求线程正在等待接收所有产品**。之后，它将它们打印到控制台并退出控制器函数，然后最终关闭请求线程。

### 3.2 使用_WebClient_调用慢速服务
其次，让我们实现一个非阻塞_WebClient_来调用同一个端点：

```java
@GetMapping(value = "/products-non-blocking", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux``````<Product>`````` getProductsNonBlocking() {
    log.info("Starting NON-BLOCKING Controller!");

    Flux``````<Product>`````` productFlux = WebClient.create()
      .get()
      .uri(getSlowServiceBaseUri() + SLOW_SERVICE_PRODUCTS_ENDPOINT_NAME)
      .retrieve()
      .bodyToFlux(Product.class);

    productFlux.subscribe(product -> log.info(product.toString()));

    log.info("Exiting NON-BLOCKING Controller!");
    return productFlux;
}
```

**与返回产品列表不同，控制器函数返回了_Flux_发布者并快速完成方法**。在这种情况下，消费者将订阅_Flux_实例，并在产品可用时处理它们。

现在，让我们再次查看日志：

```
Starting NON-BLOCKING Controller!
Exiting NON-BLOCKING Controller!
Product(title=Fancy Smartphone, description=A stylish phone you need)
Product(title=Cool Watch, description=The only device you need)
Product(title=Smart TV, description=Cristal clean images)
```

正如预期的那样，控制器函数立即完成，并且通过这种方式，它也完成了请求线程。一旦_产品_可用，订阅的函数就会处理它们。

## 结论
在本文中，我们比较了Spring中编写Web客户端的两种风格。

首先，我们探索了Feign客户端，这是一种编写同步和阻塞Web客户端的声明式风格。

其次，我们探索了_WebClient_，它使得Web客户端的异步实现成为可能。

尽管Feign客户端在许多情况下是一个很好的选择，并且生成的代码具有较低的认知复杂性，但_WebClient_的非阻塞风格在高流量激增期间使用更少的系统资源。考虑到这一点，对于这些情况，选择_WebClient_是更可取的。

像往常一样，本文的代码可以在GitHub上找到。