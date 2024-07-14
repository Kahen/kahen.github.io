---
date: 2022-04-01
category:
  - Java
  - Reactor
tag:
  - Mono
  - Flux
head:
  - - meta
    - name: keywords
      content: Java, Reactor, Mono, Flux
---
# Reactor 核心库中的 Flux 和 Mono 的区别

在本教程中，我们将学习 Reactor 核心库中 Flux 和 Mono 的区别。

## 2. Mono 是什么？
Mono 是一种特殊的 Publisher。**Mono 对象表示单个或空值**。这意味着它最多只能为 onNext() 请求发出一个值，然后以 onComplete() 信号终止。如果出现故障，它只发出一个 onError() 信号。

让我们看一个带有完成信号的 Mono 示例：

```java
@Test
public void givenMonoPublisher_whenSubscribeThenReturnSingleValue() {
    Mono```<String>``` helloMono = Mono.just("Hello");
    StepVerifier.create(helloMono)
      .expectNext("Hello")
      .expectComplete()
      .verify();
}
```

我们可以看到，当 helloMono 被订阅时，它只发出一个值，然后发送完成信号。

## 3. Flux 是什么？
Flux 是一个标准的 Publisher，代表 0 到 N 个异步序列值。这意味着它可以发出 0 到多个值，对于 onNext() 请求，可能是无限值，然后以完成或错误信号终止。

让我们看一个带有完成信号的 Flux 示例：

```java
@Test
public void givenFluxPublisher_whenSubscribedThenReturnMultipleValues() {
    Flux```<String>``` stringFlux = Flux.just("Hello", "Baeldung");
    StepVerifier.create(stringFlux)
      .expectNext("Hello")
      .expectNext("Baeldung")
      .expectComplete()
      .verify();
}
```

现在，让我们看一个带有错误信号的 Flux 示例：

```java
@Test
public void givenFluxPublisher_whenSubscribeThenReturnMultipleValuesWithError() {
    Flux```<String>``` stringFlux = Flux.just("Hello", "Baeldung", "Error")
      .map(str -> {
          if (str.equals("Error"))
              throw new RuntimeException("Throwing Error");
          return str;
      });
    StepVerifier.create(stringFlux)
      .expectNext("Hello")
      .expectNext("Baeldung")
      .expectError()
      .verify();
}
```

我们可以看到，在从 Flux 获取两个值之后，我们遇到了一个错误。

## 4. Mono 与 Flux
Mono 和 Flux 都是 Publisher 接口的实现。简单来说，当我们进行计算或向数据库或外部服务发出请求，并期望最多一个结果时，我们应该使用 Mono。

当我们期望从计算、数据库或外部服务调用中获得多个结果时，我们应该使用 Flux。

Mono 更类似于 Java 中的 Optional 类，因为它包含 0 或 1 个值，而 Flux 更类似于 List，因为它可以有 N 个值。

## 5. 结论
在本文中，我们学习了 Mono 和 Flux 之间的区别。

如往常一样，示例的完整源代码可在 GitHub 上获取。