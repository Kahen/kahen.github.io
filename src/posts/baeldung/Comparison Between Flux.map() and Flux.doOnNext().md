---
date: 2024-06-14
category:
  - Java
  - Reactive Programming
tag:
  - Reactor
  - Flux
  - map
  - doOnNext
---
# Reactor库中Flux.map()与Flux.doOnNext()的比较 | Baeldung概述

在Reactor库中，Flux.map()和Flux.doOnNext()操作符在处理流数据元素时扮演着不同的角色。

Flux.map()操作符有助于转换Flux发出的每个元素。Flux.doOnNext()操作符是一个生命周期钩子，允许我们在每个元素发出时执行副作用操作。

在本教程中，我们将深入探讨这些操作符的详细信息，探索它们的内部实现和实际用例。此外，我们还将看到如何一起使用这两个操作符。

Maven依赖

要使用Flux发布者和其他响应式操作符，让我们将reactor-core依赖项添加到pom.xml中：

```xml
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-core</artifactId>
    <version>3.6.5</version>
</dependency>
```

此依赖项提供了Flux、Mono等核心类。

同样，让我们添加reactor-test依赖项以帮助我们的单元测试：

```xml
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-test</artifactId>
    <version>3.6.5</version>
    <scope>test</scope>
</dependency>
```

上述依赖项提供了StepVerifier等类，允许我们创建测试场景并断言响应式管道的预期行为。

理解Flux.map()操作符

Flux.map()操作符类似于Java内置的Stream.map()，但它在响应式流上操作。

### 3.1. 马赛克图
让我们通过马赛克图了解Flux.map()操作符的内部：

在上面的图中，我们有一个Flux发布者，它发出一个没有错误的数据流。它还显示了map()操作符对发出数据的影响。操作符将数据从圆形转换为正方形并返回转换后的数据。**订阅后，将发出转换后的数据，而不是原始数据**。

### 3.2. 方法定义
Flux.map()操作符接受一个Function作为参数，并返回一个包含转换元素的新Flux。

这是方法签名：

```java
public final <V> Flux<V> map(Function<? super T,? extends V> mapper)
```

在这种情况下，输入是来自Flux发布者的数据流。**映射器函数将同步应用于Flux发出的每个元素**。输出是一个包含基于提供的映射器函数转换的元素的新Flux。

### 3.3. 示例代码
让我们通过将每个值乘以10来将一些数据转换为新序列：

```java
Flux<Integer> numbersFlux = Flux.just(50, 51, 52, 53, 54, 55, 56, 57, 58, 59)
  .map(i -> i * 10)
  .onErrorResume(Flux::error);
```

然后，让我们断言发出的新数据序列等于预期的数字：

```java
StepVerifier.create(numbersFlux)
  .expectNext(500, 510, 520, 530, 540, 550, 560, 570, 580, 590)
  .verifyComplete();
```

map()操作符按照马赛克图和函数定义所描述的方式对数据进行操作，产生了每个值乘以10的新输出。

理解doOnNext()操作符

Flux.doOnNext()操作符是一个生命周期钩子，有助于窥视发出的数据流。它类似于Stream.peek()。**它提供了一种在发出的每个元素上执行副作用的方法，而不会改变原始数据流**。

### 4.1. 马赛克图
让我们通过马赛克图了解Flux.doOnNext()方法的内部：

在上面的图中，显示了Flux发出的数据流和doOnNext()操作符对数据的操作。

### 4.2. 方法定义
让我们看看doOnNext()操作符的方法定义：

```java
public final Flux<T> doOnNext(Consumer<? super T> onNext)
```

该方法接受一个Consumer<T>作为参数。**Consumer是一个功能接口，代表一个副作用操作**。它消耗输入但不产生任何输出，使其适合执行副作用操作。

### 4.3. 示例代码
让我们将doOnNext()操作符应用于在订阅时将数据流中的项目记录到控制台：

```java
Flux<Integer> numberFlux = Flux.just(1, 2, 3, 4, 5)
  .doOnNext(number -> {
      LOGGER.info(String.valueOf(number));
  })
  .onErrorResume(Flux::error);
```

在上面的代码中，doOnNext()操作符在Flux发出的每个数字时将其记录到控制台，而不会修改实际的数字。

同时使用两个操作符

由于Flux.map()和Flux.doOnNext()服务于不同的目的，**它们可以结合在响应式管道中以实现数据转换和副作用**。

让我们通过记录项目到控制台并转换原始数据为新数据来窥视发出的数据流中的项目：

```java
Flux<Integer> numbersFlux = Flux.just(10, 11, 12, 13, 14)
  .doOnNext(number -> {
      LOGGER.info("Number: " + number);
  })
  .map(i -> i * 5)
  .doOnNext(number -> {
      LOGGER.info("Transformed Number: " + number);
  })
  .onErrorResume(Flux::error);
```

在上面的代码中，我们首先使用doOnNext()操作符记录Flux发出的每个原始数字。接下来，我们应用map()操作符将每个数字乘以5进行转换。然后，我们使用另一个doOnNext()操作符记录转换后的数字。

最后，让我们断言发出的数据是预期的数据：

```java
StepVerifier.create(numbersFlux)
  .expectNext(50, 55, 60, 65, 70)
  .verifyComplete();
```

这种结合使用有助于我们在转换数据流的同时，通过记录提供原始和转换元素的可见性。

主要区别

我们知道，这两个操作符作用于发出的数据。然而，Flux.map()操作符是一个转换操作符，通过将提供的函数应用于每个元素来改变原始发出的数据流。**这个操作符在我们想要对流中的元素执行计算、数据转换或操作的情况下非常有用**。

另一方面，Flux.doOnNext()操作符是一个生命周期钩子，允许我们检查并对每个发出的元素执行操作。它不能修改数据。**这个操作符在记录、调试等情况下非常有用**。

结论

在本文中，我们深入探讨了Project Reactor库中Flux.map()和Flux.doOnNext()操作符的细节。我们通过检查马赛克图、类型定义和实际示例来研究它们的内部工作方式。

这两个操作符服务于不同的用例，可以一起使用来构建强大且健壮的响应式系统。

如常，示例的完整源代码可在GitHub上获得。

OK