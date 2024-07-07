---
date: 2024-07-07
category:
  - Spring Boot
  - Resilience4j
tag:
  - Resilience4j
  - Spring Boot
  - Circuit Breaker
  - Retry
  - Rate Limiter
  - Bulkhead
  - Time Limiter
head:
  - - meta
    - name: keywords
      content: Resilience4j, Spring Boot, Circuit Breaker, Retry, Rate Limiter, Bulkhead, Time Limiter
---

# Resilience4j 事件端点

在本文中，我们将探讨 Resilience4j 用于其提供的弹性机制的内部事件，以及在 SpringBoot 应用程序中列出这些事件的端点是什么。

我们将重用我们关于 Spring Boot 中 Resilience4j 指南的文章中的项目，来展示 Resilience4j 如何在执行器端点下列出不同的模式事件。

## 2. 模式事件

该库使用事件来驱动弹性模式的行为（允许或拒绝调用），作为一种通信机制。此外，事件为监控和可观察性提供了有价值的详细信息，同时也有助于故障排除。

此外，断路器、重试、限流器、舱壁和时间限制器实例发出的事件分别存储在循环事件消费者缓冲区中。缓冲区的大小可以根据 `eventConsumerBufferSize` 属性进行配置，默认为 100 个事件。

我们将查看在执行器端点下为每种模式列出的特定发出的事件。

## 3. 断路器

### 3.1. 配置

我们将为我们的 `/api/circuit-breaker` 端点定义的断路器实例提供默认配置：

```
resilience4j.circuitbreaker:
  configs:
    default:
      registerHealthIndicator: true
      slidingWindowSize: 10
      minimumNumberOfCalls: 5
      permittedNumberOfCallsInHalfOpenState: 3
      automaticTransitionFromOpenToHalfOpenEnabled: true
      waitDurationInOpenState: 5s
      failureRateThreshold: 50
      eventConsumerBufferSize: 50
  instances:
    externalService:
      baseConfig: default
```

### 3.2. 事件

Resilience4j 在执行器端点下暴露了与断路器相关的事件：

```
http://localhost:8080/actuator/circuitbreakers
```

**断路器是定义最复杂的弹性机制，并且定义了最多的事件类型**。由于其实现依赖于状态机的概念，它使用事件来信号状态转换。因此，让我们看看在执行器事件端点下从初始的 `CLOSED` 状态转换到 `OPEN` 状态，然后再回到 `CLOSED` 状态时列出的事件。

对于成功的调用，我们可以看到 `CircuitBreakerOnSuccess` 事件：

```
{
    "circuitBreakerName": "externalService",
    "type": "SUCCESS",
    "creationTime": "2023-03-22T16:45:26.349252+02:00",
    "errorMessage": null,
    "durationInMs": 526,
    "stateTransition": null
}
```

让我们看看当断路器实例处理失败请求时会发生什么：

```
@Test
void testCircuitBreakerEvents() throws Exception {
    EXTERNAL_SERVICE.stubFor(WireMock.get("/api/external")
      .willReturn(serverError()));

    IntStream.rangeClosed(1, 5)
      .forEach(i ->
        {
            ResponseEntity``<String>`` response = restTemplate.getForEntity("/api/circuit-breaker", String.class);
            assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    ...
}
```

正如我们观察到的，**失败的请求触发了 `CircuitBreakerOnErrorEvent`**：

```
{
"circuitBreakerName": "externalService",
"type": "ERROR",
"creationTime": "2023-03-19T20:13:05.069002+02:00",
"errorMessage": "org.springframework.web.client.HttpServerErrorException$InternalServerError: 500 Server Error: \"{\"error\": \"Internal Server Error\"}\"",
"durationInMs": 519,
"stateTransition": null
}
```

此外，这些成功/错误事件包含了 `durationInMs` 属性，这是一个可以有用的性能指标。

当失败率超过配置的阈值时，实例触发 `CircuitBreakerOnFailureRateExceededEvent`，决定转换到 `OPEN` 状态，并触发 `CircuitBreakerOnStateTransitionEvent` 事件：

```
{
"circuitBreakerName": "externalService",
"type": "FAILURE_RATE_EXCEEDED",
"creationTime": "2023-03-19T20:13:07.554813+02:00",
"errorMessage": null,
"durationInMs": null,
"stateTransition": null
},
{
"circuitBreakerName": "externalService",
"type": "STATE_TRANSITION",
"creationTime": "2023-03-19T20:13:07.563623+02:00",
"errorMessage": null,
"durationInMs": null,
"stateTransition": "CLOSED_TO_OPEN"
}
```

查看最后一个事件的 `stateTransition` 属性，断路器处于 `OPEN` 状态。一个新的调用尝试引发了 `CallNotPermittedException`，进而触发了 `CircuitBreakerOnCallNotPermittedEvent`：

```
{
    "circuitBreakerName": "externalService",
    "type": "NOT_PERMITTED",
    "creationTime": "2023-03-22T16:50:11.897977+02:00",
    "errorMessage": null,
    "durationInMs": null,
    "stateTransition": null
}
```

在配置的 `waitDuration` 经过后，断路器将转换到中间的 `OPEN_TO_HALF_OPEN` 状态，并通过 `CircuitBreakerOnStateTransitionEvent` 再次发出信号：

```
{
    "circuitBreakerName": "externalService",
    "type": "STATE_TRANSITION",
    "creationTime": "2023-03-22T16:50:14.787381+02:00",
    "errorMessage": null,
    "durationInMs": null,
    "stateTransition": "OPEN_TO_HALF_OPEN"
}
```

在 `OPEN_TO_HALF_OPEN` 状态下，如果配置的 `minimumNumberOfCalls` 成功，则再次触发 `CircuitBreakerOnStateTransitionEvent` 以切换回 `CLOSED` 状态：

```
{
    "circuitBreakerName": "externalService",
    "type": "STATE_TRANSITION",
    "creationTime": "2023-03-22T17:48:45.931978+02:00",
    "errorMessage": null,
    "durationInMs": null,
    "stateTransition": "HALF_OPEN_TO_CLOSED"
}
```

断路器相关的事件提供了实例如何执行和处理请求的洞察。因此，我们可以通过分析断路器事件来**识别潜在问题并跟踪性能指标**。

## 4. 重试

### 4.1. 配置

为我们的 `/api/retry` 端点，我们将使用以下配置创建一个重试实例：

```
resilience4j.retry:
  configs:
    default:
      maxAttempts: 3
      waitDuration: 100
  instances:
    externalService:
      baseConfig: default
```

### 4.2. 事件

让我们检查重试模式在执行器端点下列出的事件：

```
http://localhost:8080/actuator/retryevents
```

例如，当一个调用失败时，它将根据配置进行重试：

```
@Test
void testRetryEvents()throws Exception {
    EXTERNAL_SERVICE.stubFor(WireMock.get("/api/external")
      .willReturn(serverError()));
    ResponseEntity``<String>`` response = restTemplate.getForEntity("/api/retry", String.class);

    ...
}
```

因此，**对于每次重试尝试，都会发出一个 `RetryOnErrorEvent`，并且重试实例根据其配置安排另一次重试**。正如我们所看到的，事件有一个 `numberOfAttempts` 计数字段：

```
{
"retryName": "retryApi",
"type": "RETRY",
"creationTime": "2023-03-19T22:57:51.458811+02:00",
"errorMessage": "org.springframework.web.client.HttpServerErrorException$InternalServerError: 500 Server Error: \"{\"error\": \"Internal Server Error\"}\"",
"numberOfAttempts": 1
}
```

因此，一旦配置的尝试次数耗尽，重试实例发布一个 `RetryOnFailedEvent`，同时允许底层异常传播：

```
{
"retryName": "retryApi",
"type": "ERROR",
"creationTime": "2023-03-19T23:30:11