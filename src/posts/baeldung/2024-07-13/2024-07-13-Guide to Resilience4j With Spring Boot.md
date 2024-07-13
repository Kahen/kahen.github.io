---
date: 2024-07-13
category:
  - Spring Boot
  - Resilience4j
tag:
  - Spring Boot
  - Resilience4j
  - 容错
  - 断路器
  - 重试
head:
  - - meta
    - name: keywords
      content: Spring Boot, Resilience4j, 容错, 断路器, 重试
---

# Resilience4j 在 Spring Boot 中的使用指南

Resilience4j 是一个轻量级的容错库，它为 web 应用程序提供了多种容错和稳定性模式。

在本教程中，我们将**学习如何将这个库与一个简单的 Spring Boot 应用程序一起使用**。

## 2. 搭建环境

在这一部分，我们将专注于**为我们的 Spring Boot 项目设置关键方面**。

### 2.1. Maven 依赖

首先，我们需要添加 _spring-boot-starter-web_ 依赖来引导一个简单的 web 应用程序：

```xml
`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-web`````</artifactId>`````
`````</dependency>`````
```

接下来，**我们需要 _resilience4j-spring-boot2_ 和 _spring-boot-starter-aop_ 依赖，以便在我们的 Spring Boot 应用程序中使用 Resilience-4j 库的注解**：

```xml
`````<dependency>`````
    `````<groupId>`````io.github.resilience4j`````</groupId>`````
    `````<artifactId>`````resilience4j-spring-boot2`````</artifactId>`````
`````</dependency>`````

`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-aop`````</artifactId>`````
`````</dependency>`````
```

此外，我们还需要添加 _spring-boot-starter-actuator_ 依赖，以便通过一组暴露的端点监控应用程序的当前状态：

```xml
`````<dependency>`````
    `````<groupId>`````org.springframework.boot`````</groupId>`````
    `````<artifactId>`````spring-boot-starter-actuator`````</artifactId>`````
`````</dependency>`````
```

最后，我们将添加 _wiremock-jre8_ 依赖，因为它将帮助我们使用模拟 HTTP 服务器测试我们的 REST API：

```xml
`````<dependency>`````
    `````<groupId>`````com.github.tomakehurst`````</groupId>`````
    `````<artifactId>`````wiremock-jre8`````</artifactId>`````
    `<scope>`test`</scope>`
`````</dependency>`````
```

### 2.2. RestController 和外部 API 调用者

在使用 Resilience4j 库的不同特性时，我们的 web 应用程序需要与外部 API 交互。因此，让我们继续添加一个 _RestTemplate_ 的 bean，这将帮助我们进行 API 调用：

```java
@Bean
public RestTemplate restTemplate() {
    return new RestTemplateBuilder().rootUri("http://localhost:9090")
      .build();
}
```

然后我们将定义 _ExternalAPICaller_ 类作为一个 _Component,_ 并使用 _restTemplate_ bean 作为一个成员：

```java
@Component
public class ExternalAPICaller {
    private final RestTemplate restTemplate;

    @Autowired
    public ExternalAPICaller(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
}
```

接下来，我们将**定义 _ResilientAppController_ 类，它公开 REST API 端点，并在内部使用 _ExternalAPICaller_ bean 调用外部 API**：

```java
@RestController
@RequestMapping("/api/")
public class ResilientAppController {
    private final ExternalAPICaller externalAPICaller;
}
```

### 2.3. 执行器端点

我们可以通过 Spring Boot 执行器公开健康端点，以了解应用程序在任何给定时间的确切状态。

因此，让我们将配置添加到 _application.properties_ 文件中，并启用端点：

```properties
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=always

management.health.circuitbreakers.enabled=true
management.health.ratelimiters.enabled=true
```

此外，根据需要，我们将在同一个 _application.properties_ 文件中添加特定于功能的配置。

### 2.4. 单元测试

我们的 web 应用程序将在现实世界场景中调用外部服务。然而，我们可以通过使用 _WireMockExtension_ 类启动外部服务来**模拟这样一个运行中的服务的存在**。

因此，让我们在 _ResilientAppControllerUnitTest_ 类中定义 _EXTERNAL_SERVICE_ 作为静态成员：

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ResilientAppControllerUnitTest {

    @RegisterExtension
    static WireMockExtension EXTERNAL_SERVICE = WireMockExtension.newInstance()
      .options(WireMockConfiguration.wireMockConfig()
      .port(9090))
      .build();
```

然后我们将添加一个 _TestRestTemplate_ 的实例来调用 API：

```java
@Autowired
private TestRestTemplate restTemplate;
```

### 2.5. 异常处理器

Resilience4j 库将通过抛出异常来保护服务资源，这取决于上下文中的容错模式。然而，这些异常应该转换为对客户端具有有意义状态代码的 HTTP 响应。

因此，我们将**定义 _ApiExceptionHandler_ 类来持有不同异常的处理程序**：

```java
@ControllerAdvice
public class ApiExceptionHandler {
}
```

我们将在探索不同的容错模式时，在此类中添加处理程序。

## 3. 断路器

**断路器模式通过限制上游服务在部分或完全停机期间调用下游服务来保护下游服务**。

让我们首先公开 _/api/circuit-breaker_ 端点并添加 _@CircuitBreaker_ 注解：

```java
@GetMapping("/circuit-breaker")
@CircuitBreaker(name = "CircuitBreakerService")
public String circuitBreakerApi() {
    return externalAPICaller.callApi();
}
```

如需要，我们还需要在 _ExternalAPICaller_ 类中定义 _callApi()_ 方法来调用外部端点 _/api/external_：

```java
public String callApi() {
    return restTemplate.getForObject("/api/external", String.class);
}
```

接下来，我们将在 _application.properties_ 文件中添加断路器的配置：

```properties
resilience4j.circuitbreaker.instances.CircuitBreakerService.failure-rate-threshold=50
resilience4j.circuitbreaker.instances.CircuitBreakerService.minimum-number-of-calls=5
resilience4j.circuitbreaker.instances.CircuitBreakerService.automatic-transition-from-open-to-half-open-enabled=true
resilience4j.circuitbreaker.instances.CircuitBreakerService.wait-duration-in-open-state=5s
resilience4j.circuitbreaker.instances.CircuitBreakerService.permitted-number-of-calls-in-half-open-state=3
resilience4j.circuitbreaker.instances.CircuitBreakerService.sliding-window-size=10
resilience4j.circuitbreaker.instances.CircuitBreakerService.sliding-window-type=count_based
```

本质上，配置将允许在封闭状态下对服务的调用失败率达到 50%，之后它将打开电路并开始用 _CallNotPermittedException_ 拒绝请求。因此，最好在 _ApiExceptionHandler_ 类中添加一个处理此异常的处理器：

```java
@ExceptionHandler({CallNotPermittedException.class})
@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public void handleCallNotPermittedException() {
}
```

最后，我们将通过使用 _EXTERNAL_SERVICE_ 模拟下游服务停机的情况来测试 _/api/circuit-breaker_ API 端点：

```java
@Test
public void testCircuitBreaker() {
    EXTERNAL_SERVICE.stubFor(WireMock.get("/api/external")
      .willReturn(serverError()));

    IntStream.rangeClosed(1, 5)
      .forEach(i -> {
          ResponseEntity response = restTemplate.getForEntity("/api/circuit-breaker", String.class);
          assertThat(response.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
      });

    IntStream.rangeClosed(1, 5)
      .forEach(i -> {
          ResponseEntity response = restTemplate.getForEntity("/api/circuit-breaker", String.class);
          assertThat(response.getStatusCode()).isEqualTo(HttpStatus.SERVICE_UNAVAILABLE);
      });

    EXTERNAL_SERVICE.verify(5, getRequestedFor(urlEqualTo("/api/external")));
}
```

我们可以看到，前五次调用失败，因为下游服务处于停机状态。之后，电路切换到打开状态，随后的五次尝试被拒绝，没有实际调用底层 API，而是返回了 _503_ HTTP 状态代码。

## 4. 重试

**重试模式通过从瞬时问题中恢复，为系统提供弹性**。让我们首先添加带有 _@Retry_ 注解的 _/api/retry_ API 端点：

```java
@GetMapping("/retry")
@Retry(name = "retryApi", fallbackMethod = "fallbackAfterRetry")
public String retryApi() {
    return externalAPICaller.callApi();
}
```

可选地，我们可以**在所有重试尝试失败时提供回退机制**。在这种情况下，我们提供了 _fallbackAfterRetry_ 作为回退方法：

```java
public String fallbackAfterRetry(Exception ex) {
    return "all retries have exhausted";
}
```

接下来，我们将更新 _application.properties_ 文件以添加将管理重试行为的配置：

```properties
resilience4j.retry.instances.retryApi.max-attempts=3
resilience4j.retry.instances.retryApi.waitduration=1s
resilience4j.retry.metrics.legacy.enabled=true
resilience4j.retry.metrics.enabled=true
```

如上所示，我们计划最多重试三次，每次延迟 _1s_。

最后，我们将测试 _/api/retry_ API 端点的重试行为：

```java
@Test
public void testRetry() {
    EXTERNAL_SERVICE.stubFor(WireMock.get("/api/external")
      .willReturn(ok()));
    ResponseEntity`````<String>````` response1 = restTemplate.getForEntity("/api/retry", String.class);
    EXTERNAL_SERVICE.verify(1, getRequestedFor(urlEqualTo("/api/external")));

    EXTERNAL_SERVICE.resetRequests();

    EXTERNAL_SERVICE.stubFor(WireMock.get("/api/external")
      .willReturn(serverError()));
    ResponseEntity`````<String>````` response2 = restTemplate.getForEntity("/api/retry", String.class);
    Assert.assertEquals(response2.getBody(), "all retries have exhausted");
    EXTERNAL_SERVICE.verify(3, getRequestedFor(urlEqualTo("/api/external")));
}
```

我们可以看到，在第一种情况下，没有出现问题，所以一次尝试就足够了。另一方面，当出现问题时，有三次尝试，之后 API 通过回退机制响应。

## 5. 时间限制器

我们可以**使用时间限制器模式为对外部系统进行的异步调用设置阈值超时值**。

让我们添加 _/api/time-limiter_ API 端点，它在内部调用一个慢速 API：

```java
@GetMapping("/time-limiter")
@TimeLimiter(name = "timeLimiterApi")
public CompletableFuture`````<String>````` timeLimiterApi() {
    return CompletableFuture.supplyAsync(externalAPICaller::callApiWithDelay);
}
```

然后我们将通过在 _callApiWithDelay()_ 方法中添加睡眠时间来模拟外部 API 调用的延迟：

```java
public String callApiWithDelay() {
    String result = restTemplate.getForObject("/api/external", String.class);
    try {
        Thread.sleep(5000);
    } catch (InterruptedException ignore) {
    }
    return result;
}
```

接下来，我们需要在 _application.properties_ 文件中为 _timeLimiterApi_ 提供配置：

```properties
resilience4j.timelimiter.metrics.enabled=true
resilience4j.timelimiter.instances.timeLimiterApi.timeout-duration=2s
resilience4j.timelimiter.instances.timeLimiterApi.cancel-running-future=true
```

我们可以看到阈值设置为 2s。之后，Resilience4j 库将内部取消异步操作，并抛出 _TimeoutException_。因此，我们将在 _ApiExceptionHandler_ 类中**添加一个处理器，以返回带有 _408_ HTTP 状态代码的 API 响应**：

```java
@ExceptionHandler({TimeoutException.class})
@ResponseStatus(HttpStatus.REQUEST_TIMEOUT)
public void handleTimeoutException() {
}
```

最后，我们将验证 _/api/time-limiter_ API 端点配置的时间限制器模式：

```java
@Test
public void testTimeLimiter() {
    EXTERNAL_SERVICE.stubFor(WireMock.get("/api/external").willReturn(ok()));
    ResponseEntity`````<String>````` response = restTemplate.getForEntity("/api/time-limiter", String.class);

    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.REQUEST_TIMEOUT);
    EXTERNAL_SERVICE.verify(1, getRequestedFor(urlEqualTo("/api/external")));
}
```

正如预期的那样，由于下游 API 调用被设置为超过五秒钟才能完成，我们见证了 API 调用的超时。

## 6. 舱壁

**舱壁模式限制了对外部服务的最大并发调用数量**。

让我们首先添加带有 _@Bulkhead_ 注解的 _/api/bulkhead_ API 端点：

```java
@GetMapping("/bulkhead")
@Bulkhead(name="bulkheadApi")
public String bulkheadApi() {
    return externalAPICaller.callApi();
}
```

接下来，我们将在 _application.properties_ 文件中定义控制舱壁功能的配置：

```properties
resilience4j.bulkhead.metrics.enabled=true
resilience4j.bulkhead.instances.bulkheadApi.max-concurrent-calls=3
resilience4j.bulkhead.instances.bulkheadApi.max-wait-duration=1
```

有了这个，我们想要将并发调用的最大数量限制为三个，以便如果舱壁已满，每个线程只能等待 _1ms_。之后，请求将被拒绝，并抛出 _BulkheadFullException_ 异常。我们还想向客户端返回一个有意义的 HTTP 状态代码，因此我们将在 _ApiExceptionHandler_ 类中添加一个异常处理器：

```java
@ExceptionHandler({ BulkheadFullException.class })
@ResponseStatus(HttpStatus.BANDWIDTH_LIMIT_EXCEEDED)
public void handleBulkheadFullException() {
}
```

最后，我们将通过并行调用五个请求来测试舱壁行为：

```java
@Test
void testBulkhead() throws Exception {
  EXTERNAL_SERVICE.stubFor(WireMock.get("/api/external")
      .willReturn(ok()));
  Map``<Integer, Integer>`` responseStatusCount = new ConcurrentHashMap<>();
  ExecutorService executorService = Executors.newFixedThreadPool(5);
  CountDownLatch latch = new CountDownLatch(5);

  IntStream.rangeClosed(1, 5)
      .forEach(i -> executorService.execute(() -> {
          ResponseEntity response = restTemplate.getForEntity("/api/bulkhead", String.class);
          int statusCode = response.getStatusCodeValue();
          responseStatusCount.merge(statusCode, 1, Integer::sum);
          latch.countDown();
      }));
  latch.await();
  executorService.shutdown();

  assertEquals(2, responseStatusCount.keySet().size());
  LOGGER.info("Response statuses: " + responseStatusCount.keySet());
  assertTrue(responseStatusCount.containsKey(BANDWIDTH_LIMIT_EXCEEDED.value()));
  assertTrue(responseStatusCount.containsKey(OK.value()));
  EXTERNAL_SERVICE.verify(3, getRequestedFor(urlEqualTo("/api/external")));
}
```

我们可以看到**只有三个请求成功，而其他请求被拒绝，并返回了 _BANDWIDTH_LIMIT_EXCEEDED_ HTTP 状态代码**。

## 7. 限流器

**限流器模式限制了对资源的请求速率**。

让我们首先添加带有 _@RateLimiter_ 注解的 _/api/rate-limiter_ API 端点：

```java
@GetMapping("/rate-limiter")
@RateLimiter(name = "rateLimiterApi")
public String rateLimitApi() {
    return externalAPICaller.callApi();
}
```

接下来，我们将在 _application.properties_ 文件中定义限流器的配置：

```properties
resilience4j.ratelimiter.metrics.enabled=true
resilience4j.ratelimiter.instances.rateLimiterApi.register-health-indicator=true
resilience4j.ratelimiter.instances.rateLimiterApi.limit-for-period=5
resilience4j.ratelimiter.instances.rateLimiterApi.limit-refresh-period=60s
resilience4j.ratelimiter.instances.rateLimiterApi.timeout-duration=0s
resilience4j.ratelimiter.instances.rateLimiterApi.allow-health-indicator-to-fail=true
resilience4j.ratelimiter.instances.rateLimiterApi.subscribe-for-events=true
resilience4j.ratelimiter.instances.rateLimiterApi.event-consumer-buffer-size=50
```

有了这个配置，我们想要将 API 调用速率限制为 _5_ _req/min_，不等待。**达到允许速率的阈值后，请求将被拒绝，并抛出 _RequestNotPermitted_ 异常**。因此，我们将在 _ApiExceptionHandler_ 类中定义一个处理器，将其转换为有意义的 HTTP 状态响应代码：

```java
@ExceptionHandler({ RequestNotPermitted.class })
@ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
public void handleRequestNotPermitted() {
}
```

最后，我们将用 _50_ 个请求测试我们的限流 API 端点：

```java
@Test
public void testRatelimiter() {
    EXTERNAL_SERVICE.stubFor(WireMock.get("/api/external")
      .willReturn(ok()));
    Map``<Integer, Integer>`` responseStatusCount = new ConcurrentHashMap<>();

    IntStream.rangeClosed(1, 50)
      .parallel()
      .forEach(i -> {
          ResponseEntity`````<String>````` response = restTemplate.getForEntity("/api/rate-limiter", String.class);
          int statusCode = response.getStatusCodeValue();
          responseStatusCount.put(statusCode, responseStatusCount.getOrDefault(statusCode, 0) + 1);
      });

    assertEquals(2, responseStatusCount.keySet().size());
    assertTrue(responseStatusCount.containsKey(TOO_MANY_REQUESTS.value()));
    assertTrue(responseStatusCount.containsKey(OK.value()));
    EXTERNAL_SERVICE.verify(5, getRequestedFor(urlEqualTo("/api/external")));
}
```

正如预期的那样，**只有五个请求成功，而所有其他请求都以 _TOO_MANY_REQUESTS_ HTTP 状态代码失败**。

## 8. 执行器端点

我们配置了应用程序以支持执行器端点，用于监控目的。使用这些端点，我们可以使用一个或多个配置的容错模式来确定应用程序随时间的行为。

首先，我们可以通过向 _/actuator_ 端点发送 GET 请求来**找到所有暴露的端点**：

```json
http://localhost:8080/actuator/
{
    "_links" : {
        "self" : {...},
        "bulkheads" : {...},
        "circuitbreakers" : {...},
        "ratelimiters" : {...},
        ...
    }
}
```

我们