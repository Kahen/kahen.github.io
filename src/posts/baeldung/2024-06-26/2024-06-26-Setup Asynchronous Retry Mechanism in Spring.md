---
date: 2024-06-27
category:
  - Spring
  - Asynchronous Programming
tag:
  - Spring Boot
  - Async
  - Retry
head:
  - - meta
    - name: keywords
      content: Spring, Asynchronous, Retry, Spring Boot, Java
------
# 在Spring中设置异步重试机制

---

## 1. 概述

有时，我们需要代码执行是异步的，以提高应用程序的性能和响应能力。此外，我们可能希望在遇到任何异常时自动重新调用代码，因为我们预计会遇到像网络故障这样的偶尔失败。

在本教程中，我们将学习如何在Spring应用程序中实现异步执行与自动重试。

我们将探索Spring对异步(_async_)和重试(_retry_)操作的支持。

## 2. Spring Boot中的示例应用程序

让我们想象我们需要构建一个简单的微服务，该服务调用下游服务来处理一些数据。

### 2.1. Maven依赖项

首先，我们需要包含_spring-boot-starter-web_ maven依赖项：

```xml
``<dependency>``
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-web``</artifactId>``
``</dependency>``
```

### 2.2. 实现Spring服务

现在，我们将实现_EventService_类的调用另一个服务的方法：

```java
public String processEvents(List```````<String>``````` events) {
    downstreamService.publishEvents(events);
    return "Completed";
}
```

然后，让我们定义_DownstreamService_接口：

```java
public interface DownstreamService {
    boolean publishEvents(List```````<String>``````` events);
}
```

## 3. 实现带有重试的异步执行

要实现带有重试的异步执行，我们将使用Spring的实现。

我们需要使用_async_和_retry_支持来配置应用程序。

### 3.1. 添加_Retry_ Maven依赖项

让我们将_spring-retry_添加到maven依赖项中：

```xml
``<dependency>``
    ``<groupId>``org.springframework.retry``</groupId>``
    ``<artifactId>``spring-retry``</artifactId>``
    `<version>`2.0.4`</version>`
``</dependency>``
```

### 3.2. _@EnableAsync_ 和 _@EnableRetry_ 配置

接下来**我们需要包括_@EnableAsync_和_@EnableRetry_** **注解**：

```java
@Configuration
@ComponentScan("com.baeldung.asyncwithretry")
@EnableRetry
@EnableAsync
public class AsyncConfig {
}
```

### 3.3. 包含_@Async_ 和 _@Retryable_ 注解

为了异步执行方法，我们需要使用_@Async_注解。类似地，我们将使用_@Retryable注解_来重试执行。

让我们在上述_EventService_方法中配置上述注解：

```java
@Async
@Retryable(retryFor = RuntimeException.class, maxAttempts = 4, backoff = @Backoff(delay = 100))
public Future```````<String>``````` processEvents(List```````<String>``````` events) {
    LOGGER.info("Processing asynchronously with Thread {}", Thread.currentThread().getName());
    downstreamService.publishEvents(events);
    CompletableFuture```````<String>``````` future = new CompletableFuture<>();
    future.complete("Completed");
    LOGGER.info("Completed async method with Thread {}", Thread.currentThread().getName());
    return future;
}
```

在上述代码中，我们正在重试方法以防出现_RuntimeException_，并将结果作为_Future_对象返回。

我们应该注意，**我们应该使用_Future_来包装任何异步方法的响应**。

我们应该注意，_@Async_注解**仅在公共方法上工作**，并且不应在同一类中自调用。自调用方法将绕过Spring代理调用，并在同一线程中运行。

## 4. 对_@Async_和_@Retryable_的实现测试

让我们测试_EventService_方法，并验证其异步和重试行为的几个测试用例。

首先，我们将实现一个测试用例，当_DownstreamService_调用没有错误时：

```java
@Test
void givenAsyncMethodHasNoRuntimeException_whenAsyncMethodIscalled_thenReturnSuccess_WithoutAnyRetry() throws Exception {
    LOGGER.info("Testing for async with retry execution with thread " + Thread.currentThread().getName());
    when(downstreamService.publishEvents(anyList())).thenReturn(true);
    Future```````<String>``````` resultFuture = eventService.processEvents(List.of("test1"));
    while (!resultFuture.isDone() && !resultFuture.isCancelled()) {
        TimeUnit.MILLISECONDS.sleep(5);
    }
    assertTrue(resultFuture.isDone());
    assertEquals("Completed", resultFuture.get());
    verify(downstreamService, times(1)).publishEvents(anyList());
}
```

在上述测试中，我们正在等待_Future_完成，然后断言结果。

然后，让我们运行上述测试并验证测试日志：

```plaintext
18:59:24.064 [main] INFO com.baeldung.asyncwithretry.EventServiceIntegrationTest - Testing for async with retry execution with thread main
18:59:24.078 [SimpleAsyncTaskExecutor-1] INFO com.baeldung.asyncwithretry.EventService - Processing asynchronously with Thread SimpleAsyncTaskExecutor-1
18:59:24.080 [SimpleAsyncTaskExecutor-1] INFO com.baeldung.asyncwithretry.EventService - Completed async method with Thread SimpleAsyncTaskExecutor-1
```

从上述日志中，我们确认服务方法在单独的线程中运行。

接下来，我们将实现另一个测试用例，其中_DownstreamService_方法抛出_RuntimeException_：

```java
@Test
void givenAsyncMethodHasRuntimeException_whenAsyncMethodIsCalled_thenReturnFailure_With_MultipleRetries() throws InterruptedException {
    LOGGER.info("Testing for async with retry execution with thread " + Thread.currentThread().getName());
    when(downstreamService.publishEvents(anyList())).thenThrow(RuntimeException.class);
    Future```````<String>``````` resultFuture = eventService.processEvents(List.of("test1"));
    while (!resultFuture.isDone() && !resultFuture.isCancelled()) {
        TimeUnit.MILLISECONDS.sleep(5);
    }
    assertTrue(resultFuture.isDone());
    assertThrows(ExecutionException.class, resultFuture::get);
    verify(downstreamService, times(4)).publishEvents(anyList());
}
```

最后，让我们通过输出日志来验证上述测试用例：

```plaintext
19:01:32.307 [main] INFO com.baeldung.asyncwithretry.EventServiceIntegrationTest - Testing for async with retry execution with thread main
19:01:32.318 [SimpleAsyncTaskExecutor-1] INFO com.baeldung.asyncwithretry.EventService - Processing asynchronously with Thread SimpleAsyncTaskExecutor-1
19:01:32.425 [SimpleAsyncTaskExecutor-1] INFO com.baeldung.asyncwithretry.EventService - Processing asynchronously with Thread SimpleAsyncTaskExecutor-1
.....
```

从上述日志中，我们确认服务方法异步重试了四次。

## 5. 结论

在本文中，我们学习了如何在Spring中实现带有重试机制的异步方法。

我们在示例应用程序中实现了这一点，并尝试了一些测试，以查看它如何处理不同的用例。我们看到了异步代码如何在自己的线程上运行，并可以自动重试。

如常，示例代码可以在GitHub上找到。