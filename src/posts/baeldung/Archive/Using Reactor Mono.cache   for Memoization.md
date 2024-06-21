---
date: 2024-06-16
category:
  - Spring
  - WebFlux
tag:
  - Reactor
  - Mono
  - Cache
---
# 使用 Reactor Mono.cache() 进行备忘录模式 | Baeldung

## 1. 概述

优化代码以提高性能是编程的关键部分，特别是当处理昂贵的操作或数据检索过程时。提高性能的一种有效方法是缓存。

**Project Reactor 库提供了一个 _cache()_ 方法，用于缓存昂贵的操作或几乎不改变的数据，以避免重复操作并提高性能**。

在本教程中，我们将探讨备忘录模式，这是一种缓存形式，并演示如何使用 Project Reactor 库中的 _Mono.cache()_ 来缓存对 JSONPlaceholder API 的 HTTP GET 请求的结果。我们还将通过一个大理石图来理解 _Mono.cache()_ 方法的内部机制。

## 2. 理解备忘录模式

**备忘录模式是一种缓存形式，它存储昂贵函数调用的输出。然后，当相同的函数调用再次发生时，它返回缓存的结果**。

它在涉及递归函数或计算的情况下非常有用，这些函数或计算对于给定的输入始终产生相同的输出。

让我们通过一个使用斐波那契序列的 Java 示例来演示备忘录模式。首先，让我们创建一个 _Map_ 对象来存储缓存的结果：

```
private static final Map`<Integer, Long>` cache = new HashMap<>();
```

接下来，让我们定义一个计算斐波那契序列的方法：

```
long fibonacci(int n) {
    if (n `<= 1) {
        return n;
    }

    if (cache.containsKey(n)) {
        return cache.get(n);
    }

    long result = fibonacci(n - 1) + fibonacci(n - 2);
    logger.info("First occurrence of " + n);
    cache.put(n, result);

    return result;
}
```

在上面的代码中，我们在进一步计算之前检查整数 _n_ 是否已经存储在 _Map_ 对象中。如果它已经存储在 _Map_ 对象中，我们返回缓存的值。否则，我们递归地计算结果并将其存储在 _Map_ 对象中以供将来使用。

这种方法通过避免冗余计算显著提高了斐波那契计算的性能。

让我们为该方法编写一个单元测试：

```
@Test
void givenFibonacciNumber_whenFirstOccurenceIsCache_thenReturnCacheResultOnSecondCall() {
    assertEquals(5, FibonacciMemoization.fibonacci(5));
    assertEquals(2, FibonacciMemoization.fibonacci(3));
    assertEquals(55, FibonacciMemoization.fibonacci(10));
    assertEquals(21, FibonacciMemoization.fibonacci(8));
}
```

在上面的测试中，我们调用 _fibonacci()_ 来计算序列。

## 3. 使用大理石图描述 _Mono.cache()_

_Mono.cache()_ 操作符有助于缓存 _Mono_ 发布者的结果是，并为后续订阅返回缓存的值。

大理石图有助于理解反应式类的内部细节以及它们的工作原理。这里有一个大理石图，说明了 _cache()_ 操作符的行为：

**在上面的图像中，第一次订阅 _Mono_ 发布者发出数据并将其缓存。后续订阅检索缓存的数据，而不会触发新的计算或数据获取**。

## 4. 示例设置

为了演示 _Mono.cache()_ 的使用，让我们将 _reactor-core_ 添加到 _pom.xml_：

```
`<dependency>``
    ``<groupId>``io.projectreactor``</groupId>``
    ``<artifactId>``reactor-core``</artifactId>``
    ``<version>``3.6.5``</version>``
``</dependency>``
```

该库提供了操作符，_Mono_, _Flux_ 等，以在 Java 中实现反应式编程。

此外，让我们将 _spring-boot-starter-webflux_ 添加到 _pom.xml_：

```
`<dependency>`
    ``<groupId>``org.springframework.boot``</groupId>``
    ``<artifactId>``spring-boot-starter-webflux``</artifactId>``
    ``<version>``3.2.5``</version>``
``</dependency>``
```

上述依赖项提供了 _WebClient_ 类来使用 API。

让我们也看看当我们向 _https://jsonplaceholder.typicode.com/users/2_ 发送 GET 请求时的示例响应：

```
{
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette"
    // ...
}
```

接下来，让我们创建一个名为 _User_ 的 POJO 类来反序列化来自 GET 请求的 JSON 响应：

```
public class User {
    private int id;
    private String name;

    // 标准构造函数，getter 和 setter
}
```

此外，让我们创建一个 _WebClient_ 对象并设置 API 的基础 URL：

```
WebClient client = WebClient.create("https://jsonplaceholder.typicode.com/users");
```

这将作为将使用 _cache()_ 方法缓存的 HTTP 响应的基础 URL。

最后，让我们创建一个 _AtomicInteger_ 对象：

```
AtomicInteger counter = new AtomicInteger(0);
```

上面的对象有助于跟踪我们向 API 发送 GET 请求的次数。

## 5. 不使用备忘录模式获取数据

让我们首先定义一个从 _WebClient_ 对象获取用户的方法：

```
Mono````````<User>```````` retrieveOneUser(int id) {
    return client.get()
      .uri("/{id}", id)
      .retrieve()
      .bodyToMono(User.class)
      .doOnSubscribe(i -> counter.incrementAndGet())
      .onErrorResume(Mono::error);
}
```

在上面的代码中，我们使用特定 ID 检索用户，并将响应体映射到 _User_ 对象。此外，我们在每次订阅时增加 _counter_。

这是一个演示不使用缓存获取用户的测试用例：

```
@Test
void givenRetrievedUser_whenTheCallToRemoteIsNotCache_thenReturnInvocationCountAndCompareResult() {
    MemoizationWithMonoCache memoizationWithMonoCache = new MemoizationWithMonoCache();

    Mono````````<User>```````` retrieveOneUser = MemoizationWithMonoCache.retrieveOneUser(1);
    AtomicReference````````<User>```````` firstUser = new AtomicReference<>();
    AtomicReference````````<User>```````` secondUser = new AtomicReference<>();

    Disposable firstUserCall = retrieveOneUser.map(user -> {
          firstUser.set(user);
          return user.getName();
    })
    .subscribe();

    Disposable secondUserCall = retrieveOneUser.map(user -> {
          secondUser.set(user);
          return user.getName();
    })
    .subscribe();

    assertEquals(2, memoizationWithMonoCache.getCounter());
    assertEquals(firstUser.get(), secondUser.get());
}
```

在这里，我们两次订阅 _retrieveOneUser_ _Mono_，每次订阅都会向 _WebClient_ 对象单独触发一个 GET 请求。我们断言 _counter_ 增加了两次。

## 6. 使用备忘录模式获取数据

现在，让我们修改前一个示例以利用 _Mono.cache()_ 并缓存第一个 GET 请求的结果：

```
@Test
void givenRetrievedUser_whenTheCallToRemoteIsCache_thenReturnInvocationCountAndCompareResult() {
    MemoizationWithMonoCache memoizationWithMonoCache = new MemoizationWithMonoCache();

    Mono````````<User>```````` retrieveOneUser = MemoizationWithMonoCache.retrieveOneUser(1).cache();
    AtomicReference````````<User>```````` firstUser = new AtomicReference<>();
    AtomicReference````````<User>```````` secondUser = new AtomicReference<>();

    Disposable firstUserCall = retrieveOneUser.map(user -> {
          firstUser.set(user);
          return user.getName();
    })
    .subscribe();

    Disposable secondUserCall = retrieveOneUser.map(user -> {
          secondUser.set(user);
          return user.getName();
    })
    .subscribe();

    assertEquals(1, memoizationWithMonoCache.getCounter());
    assertEquals(firstUser.get(), secondUser.get());
}
```

与前一个示例的主要区别是我们在订阅之前对 _retrieveOneUser_ 对象调用了 _cache()_ 操作符。**这缓存了第一个 GET 请求的结果，后续订阅接收到的是缓存的结果，而不是触发新的请求**。

在测试用例中，我们断言 _counter_ 只增加了一次，因为第二次订阅使用了缓存的值。

## 7. 设置缓存持续时间

默认情况下，_Mono.Cache()_ 无限期地缓存结果。然而，在数据可能随时间变得陈旧的情况下，设置缓存持续时间是必要的：

```
// ...
Mono````````<User>```````` retrieveOneUser = memoizationWithMonoCache.retrieveOneUser(1)
  .cache(Duration.ofMinutes(5));
// ...
```

在上面的代码中，_cache()_ 方法接受一个 _Duration_ 实例作为参数。缓存的值将在 5 分钟后过期，任何在此之后的订阅将触发一个新的 GET 请求。

## 8. 结论

在本文中，我们学习了备忘录模式的关键概念，并使用斐波那契序列示例在 Java 中实现了它。然后，我们深入研究了 Project Reactor 库中的 _Mono.cache()_ 的使用，并演示了如何缓存 HTTP GET 请求的结果。

缓存是提高性能的强大技术。然而，考虑缓存失效策略以确保不会无限期地提供陈旧数据是至关重要的。

如往常一样，示例的完整源代码可在 GitHub 上获取。

文章发布后 30 天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。