---
date: 2022-04-01
category:
  - Spring
  - WebClient
tag:
  - Rate Limiting
  - Concurrency
head:
  - - meta
    - name: keywords
      content: Spring WebClient, Rate Limiting, Concurrency, Non-blocking
---
# 使用Spring 5 WebClient限制每秒请求数量

在本教程中，我们将看到使用Spring 5 WebClient限制每秒请求数量的不同方法。

尽管我们通常希望利用其非阻塞特性，但某些场景可能迫使我们添加延迟。我们将学习在使用一些Project Reactor特性来控制对服务器的请求流时遇到的一些这些场景。

### 2.1. 编写一个简单的Web服务

要探索这个场景，我们将从一个简单的@RestController开始，它提供来自固定范围的随机数：

```java
@RestController
@RequestMapping("/random")
public class RandomController {

    @GetMapping
    Integer getRandom() {
        return new Random().nextInt(50);
    }
}
```

接下来，我们将模拟一个昂贵的操作并限制并发请求的数量。

### 2.2. 对我们的服务器进行速率限制

在查看解决方案之前，让我们将服务更改为模拟一个更现实的场景。

首先，我们将限制服务器可以接收的并发请求数量，并在达到限制时抛出异常。

其次，我们将添加一个延迟来处理我们的响应，模拟一个昂贵的操作。虽然有更强大的解决方案可用，但我们将仅出于说明目的这样做：

```java
public class Concurrency {

    public static final int MAX_CONCURRENT = 5;
    static final AtomicInteger CONCURRENT_REQUESTS = new AtomicInteger();

    public static int protect(IntSupplier supplier) {
        try {
            if (CONCURRENT_REQUESTS.incrementAndGet() > MAX_CONCURRENT) {
                throw new UnsupportedOperationException("max concurrent requests reached");
            }

            TimeUnit.SECONDS.sleep(2);
            return supplier.getAsInt();
        } finally {
            CONCURRENT_REQUESTS.decrementAndGet();
        }
    }
}
```

最后，让我们更改我们的端点以使用它：

```java
@GetMapping
Integer getRandom() {
    return Concurrency.protect(() -> new Random().nextInt(50));
}
```

现在，我们的端点在超过_MAX_CONCURRENT_请求时拒绝处理请求，并向客户端返回错误。

### 2.3. 编写一个简单的客户端

所有示例都将遵循这种模式来生成_n_个请求的_Flux_，并对我们的服务进行_GET_请求：

```java
Flux.range(1, n)
  .flatMap(i -> {
    // GET request
  });
```

为了减少样板代码，让我们在所有示例中都可以重用的方法中实现请求部分。我们将接收一个_WebClient_，调用_get()_，并使用_generics_和_ParameterizedTypeReference_检索响应体：

```java
public interface RandomConsumer {

    static ```<T>``` Mono```<T>``` get(WebClient client) {
        return client.get()
          .retrieve()
          .bodyToMono(new ParameterizedTypeReference```<T>```() {});
    }
}
```

现在我们准备好看一些方法了。

## 3. 使用_zipWith(Flux.interval())_进行延迟

我们的第一个示例使用_zipWith()_将我们的请求与固定延迟结合起来：

```java
public class ZipWithInterval {

    public static Flux`````<Integer>````` fetch(
      WebClient client, int requests, int delay) {
        return Flux.range(1, requests)
          .zipWith(Flux.interval(Duration.ofMillis(delay)))
          .flatMap(i -> RandomConsumer.get(client));
    }
}
```

结果，这将每个请求延迟_delay_毫秒。我们应该注意，这个延迟是在发送请求之前应用的。

## 4. 使用_Flux.delayElements()_进行延迟

_Flux_有一个更直接的方式来延迟其元素：

```java
public class DelayElements {

    public static Flux`````<Integer>````` fetch(
      WebClient client, int requests, int delay) {
        return Flux.range(1, requests)
          .delayElements(Duration.ofMillis(delay))
          .flatMap(i -> RandomConsumer.get(client));
    }
}
```

使用_delayElements()_，延迟直接应用于_Subscriber.onNext()_信号。换句话说，它延迟了来自_Flux.range()_的每个元素。因此，传递给_flatMap()_的函数将受到影响，开始时间会更长。例如，如果_delay_值是_1000_，我们的请求将在开始前延迟一秒钟。

### 4.1. 调整我们的解决方案

因此，如果我们没有提供足够长的延迟，我们将得到一个错误：

```java
@Test
void givenSmallDelay_whenDelayElements_thenExceptionThrown() {
    int delay = 100;

    int requests = 10;
    assertThrows(InternalServerError.class, () -> {
      DelayElements.fetch(client, requests, delay)
        .blockLast();
    });
}
```

那是因为我们每个请求等待100毫秒，但每个请求在服务器端需要两秒钟才能完成。所以很快我们的并发请求限制就达到了，我们得到了一个_500_错误。

如果我们添加足够的延迟，我们可以避免请求限制。但然后，我们将面临另一个问题——我们将等待比必要的时间更长。

根据我们的用例，等待太久可能会显著影响性能。接下来，让我们检查一种更合适的方法来处理这个问题，因为我们已经知道服务器的限制。

## 5. 使用_flatMap()_进行并发控制

鉴于我们服务的限制，我们最好的选择是并行发送最多_Concurrency.MAX_CONCURRENT_个请求。为此，我们可以为_flatMap()_添加一个额外的参数，用于最大并行处理数量：

```java
public class LimitConcurrency {

    public static Flux`````<Integer>````` fetch(
      WebClient client, int requests, int concurrency) {
        return Flux.range(1, requests)
          .flatMap(i -> RandomConsumer.get(client), concurrency);
    }
}
```

此参数确保最大并发请求数量不会超过_concurrency_，并且我们的处理不会不必要地延迟：

```java
@Test
void givenLimitInsideServerRange_whenLimitedConcurrency_thenNoExceptionThrown() {
    int limit = Concurrency.MAX_CONCURRENT;

    int requests = 10;
    assertDoesNotThrow(() -> {
      LimitConcurrency.fetch(client, TOTAL_REQUESTS, limit)
        .blockLast();
    });
}
```

仍然有一些其他选项值得讨论，这取决于我们的场景和偏好。让我们一一了解。

## 6. 使用Resilience4j _RateLimiter_

Resilience4j是一个多功能库，旨在处理应用程序中的容错。我们将使用它在间隔内限制并发请求的数量，并包括一个超时。

让我们首先添加resilience4j-reactor和resilience4j-ratelimiter依赖项：

```xml
```<dependency>```
    ```<groupId>```io.github.resilience4j```</groupId>```
    ```<artifactId>```resilience4j-reactor```</artifactId>```
    ```<version>```1.7.1```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```io.github.resilience4j```</groupId>```
    ```<artifactId>```resilience4j-ratelimiter```</artifactId>```
    ```<version>```1.7.1```</version>```
```</dependency>```
```

然后我们使用_RateLimiter.of()_构建我们的速率限制器，提供名称、发送新请求的间隔、并发限制和超时：

```java
public class Resilience4jRateLimit {

    public static Flux`````<Integer>````` fetch(
      WebClient client, int requests, int concurrency, int interval) {
        RateLimiter limiter = RateLimiter.of("my-rate-limiter", RateLimiterConfig.custom()
          .limitRefreshPeriod(Duration.ofMillis(interval))
          .limitForPeriod(concurrency)
          .timeoutDuration(Duration.ofMillis(interval * concurrency))
          .build());

        // ...
    }
}
```

现在我们使用_transformDeferred()_将其包含在我们的_Flux_中，以便它控制我们的_GET_请求速率：

```java
return Flux.range(1, requests)
  .flatMap(i -> RandomConsumer.get(client)
    .transformDeferred(RateLimiterOperator.of(limiter))
  );
```

我们应该注意到，如果我们将间隔定义得太低，我们仍然会遇到问题。但是，如果我们需要与其他操作共享速率限制器规范，这种方法是有帮助的。

## 7. 使用Guava进行精确节流

Guava有一个通用的速率限制器，适用于我们的场景。此外，由于它使用令牌桶算法，它只会在必要时阻塞，而不是每次都像_Flux.delayElements()_那样。

首先，我们需要将guava添加到我们的pom.xml中：

```xml
```<dependency>```
    ```<groupId>```com.google.guava```</groupId>```
    ```<artifactId>```guava```</artifactId>```
    ```<version>```33.2.1-jre```</version>```
```</dependency>```
```

要使用它，我们调用_RateLimiter.create()_并传递我们想要发送的每秒最大请求数量。然后，在发送请求之前，我们在_limiter_上调用_acquire()_以在必要时节流执行：

```java
public class GuavaRateLimit {

    public static Flux`````<Integer>````` fetch(
      WebClient client, int requests, int requestsPerSecond) {
        RateLimiter limiter = RateLimiter.create(requestsPerSecond);

        return Flux.range(1, requests)
          .flatMap(i -> {
            limiter.acquire();

            return RandomConsumer.get(client);
          });
    }
}
```

由于其简单性，这个解决方案工作得非常好——它不会使我们的代码比必要时间更长地阻塞。例如，如果由于某种原因，一个请求比预期的时间长，下一个不会等待执行。但是，只有在我们设置的_requestsPerSecond_范围内才会这样。

## 8. 结论

在本文中，我们看到了几种可用的方法来限制我们的_WebClient_的速率。之后，我们模拟了一个受控的Web服务，以了解它如何影响我们的代码和测试。此外，我们使用了Project Reactor和一些库以不同的方式帮助我们实现相同的目标。

如常，源代码可在GitHub上获取。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/11c3bee512ea79aa4341510e5bb5f001?s=50&r=g)![img](https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2019/10/JUnit5-Cover-Mockup.png)![img](https://www.baeldung.com/wp-content/uploads/2018/07/JUnit5-Icon-1.png)

OK