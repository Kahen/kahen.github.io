---
date: 2024-07-18
category:
  - Java
  - Reactive Programming
tag:
  - Project Reactor
  - Flux
head:
  - - meta
    - name: keywords
      content: Java, Reactive Programming, Project Reactor, Flux
------
# Flux.create 和 Flux.generate 的区别

## 1. 引言

Project Reactor 提供了一个完全非阻塞的编程基础，适用于 JVM。它提供了响应式流规范的实现，并提供了可组合的异步 API，如 Flux。Flux 是一个响应式流发布者，可以发出 0 到 N 个元素，然后成功完成或出现错误。根据我们的需求，可以通过多种不同的方式创建它。

## 2. 理解 Flux

**Flux 是一个响应式流发布者，可以发出 0 到 N 个元素**。它有几个操作符，用于生成、协调和转换 Flux 序列。Flux 可以成功完成或出现错误完成。

Flux API 提供了几个静态工厂方法来创建源或从几种回调类型生成。它还提供了实例方法和操作符来构建一个异步处理管道。这个管道生成了一个异步序列。

在接下来的部分，让我们看看 Flux _generate()_ 和 _create()_ 方法的一些用法。

## 3. **Maven 依赖**

我们需要 _reactor-core_ 和 _reactor-test_ Maven 依赖：

```xml
``<dependency>``
    ``<groupId>``io.projectreactor``</groupId>``
    ``<artifactId>``reactor-core``</artifactId>``
    ``<version>``3.6.0``</version>``
``</dependency>``
``<dependency>``
    ``<groupId>``io.projectreactor``</groupId>``
    ``<artifactId>``reactor-test``</artifactId>``
    ``<version>``3.6.0``</version>``
    `<scope>`test`</scope>`
``</dependency>``
```

Flux API 的 _generate()_ 方法提供了一种简单直接的程序化方法来创建 Flux。_generate()_ 方法接受一个生成器函数来产生一系列项目。

_generate()_ 方法有三个变体：

- _generate(Consumer`<SynchronousSink<T>`> generator)_
- _generate(Callable```<S>``` stateSupplier, BiFunction```<S, SynchronousSink<T>```, S> generator)_
- _generate(Callable```<S>``` stateSupplier, BiFunction```<S, SynchronousSink<T>```, S> generator, Consumer`<? super S>` stateConsumer)_

**generate 方法按需计算并发出值**。在计算可能不会被下游使用的元素成本过高的情况下，建议使用它。如果发出的事件受到应用程序状态的影响，也可以使用它。

### 4.1. 示例

在这个示例中，我们使用 _generate(Callable```<S>``` stateSupplier, BiFunction```<S, SynchronousSink<T>```, S> generator)_ 生成一个 _Flux_：

```java
public class CharacterGenerator {

    public Flux``````<Character>`````` generateCharacters() {

        return Flux.generate(() -> 97, (state, sink) -> {
            char value = (char) state.intValue();
            sink.next(value);
            if (value == 'z') {
                sink.complete();
            }
            return state + 1;
        });
    }
}
```

在 _generate()_ 方法中，我们提供了两个函数作为参数：

- 第一个是一个 _Callable_ 函数。这个函数定义了生成器的初始状态，值为 97
- 第二个是一个 _BiFunction_。这是一个生成器函数，它使用一个 _SynchronousSink_。这个 SynchronousSink 每次调用 sink 的 _next_ 方法时返回一个项目

根据其名称，一个 _SynchronousSink_ 实例同步工作。然而，**我们不能在每次生成器调用中多次调用 SynchronousSink 对象的 _next_ 方法**。

让我们使用 _StepVerifier_ 验证生成的序列：

```java
@Test
public void whenGeneratingCharacters_thenCharactersAreProduced() {
    CharacterGenerator characterGenerator = new CharacterGenerator();
    Flux``````<Character>`````` characterFlux = characterGenerator.generateCharacters().take(3);

    StepVerifier.create(characterFlux)
      .expectNext('a', 'b', 'c')
      .expectComplete()
      .verify();
}
```

在这个示例中，订阅者只请求三个项目。因此，生成的序列通过发出三个字符——a、b 和 c 来结束。_expectNext()_ 期望我们从 Flux 中得到的元素。_expectComplete()_ 表示从 Flux 发出的元素完成。

## 5. Flux Create

**当我们想要计算多个（0 到无穷大）不受应用程序状态影响的值时，使用 Flux 的 _create()_ 方法**。这是因为 Flux _create()_ 方法的底层方法会持续计算元素。此外，下游系统决定它需要多少元素。因此，如果下游系统跟不上，已经发出的元素要么被缓冲，要么被移除。

默认情况下，发出的元素被缓冲，直到下游系统请求更多的元素。

### 5.1. 示例

让我们现在演示 _create()_ 方法的示例：

```java
public class CharacterCreator {
    public Consumer<List``````<Character>``````> consumer;

    public Flux``````<Character>`````` createCharacterSequence() {
        return Flux.create(sink -> CharacterCreator.this.consumer = items -> items.forEach(sink::next));
    }
}
```

我们可以注意到 _create_ 操作符要求我们提供一个 _FluxSink_ 而不是 _generate_() 中使用的 _SynchronousSink_。在这种情况下，我们将为列表中的每个项目调用 _next()_，逐个发出每个项目。

现在让我们使用两个字符序列：

```java
@Test
public void whenCreatingCharactersWithMultipleThreads_thenSequenceIsProducedAsynchronously() throws InterruptedException {
    CharacterGenerator characterGenerator = new CharacterGenerator();
    List``````<Character>`````` sequence1 = characterGenerator.generateCharacters().take(3).collectList().block();
    List``````<Character>`````` sequence2 = characterGenerator.generateCharacters().take(2).collectList().block();
}

```

我们在上面的代码片段中创建了两个序列——_sequence1_ 和 _sequence2_。这些序列作为字符项目的源。注意我们使用 _CharacterGenerator_ 实例来获取字符序列。

现在让我们定义一个 _characterCreator_ 实例和两个线程实例：

```java
CharacterCreator characterCreator = new CharacterCreator();
Thread producerThread1 = new Thread(() -> characterCreator.consumer.accept(sequence1));
Thread producerThread2 = new Thread(() -> characterCreator.consumer.accept(sequence2));
```

我们现在创建了两个线程实例，它们将向发布者提供元素。当调用 accept 操作符时，字符元素开始流入序列源。接下来，我们 _subscribe_ 到新的合并序列：

```java
List``````<Character>`````` consolidated = new ArrayList<>();
characterCreator.createCharacterSequence().subscribe(consolidated::add);
```

注意 _createCharacterSequence_ 返回一个 Flux，我们订阅了它，并在 _consolidated_ 列表中消费元素。接下来，让我们触发整个过程，看到项目在两个不同的线程上移动：

```java
producerThread1.start();
producerThread2.start();
producerThread1.join();
producerThread2.join();
```

最后，让我们验证操作的结果：

```java
assertThat(consolidated).containsExactlyInAnyOrder('a', 'b', 'c', 'a', 'b');
```

接收到的序列中的前三个字符来自 _sequence1_。最后两个字符来自 _sequence2_。由于这是一个异步操作，这些序列中的元素顺序不能保证。

## 6. Flux Create 与 Flux Generate

以下是 create 和 generate 操作之间的一些区别：

| Flux Create| Flux Generate|
| ---| ---|
| 此方法接受一个 _Consumer`<FluxSink>`_ 实例| 此方法接受一个 _Consumer`<SynchronousSink>`_ 实例|
| Create 方法只调用一次消费者| Generate 方法根据下游应用程序的需要多次调用消费者方法|
| 消费者可以立即发出 0..N 个元素| 只能发出一个元素|
| 发布者不了解下游状态。因此 create 接受一个额外的 Overflow 策略参数用于流量控制| 发布者根据下游应用程序的需要生成元素|
| _FluxSink_ 允许我们在需要时使用多个线程发出元素| 对于多个线程没有用，因为它一次只能发出一个元素|

## 7. 结论

在本文中，我们讨论了 Flux API 的 create 和 generate 方法之间的区别。

首先，我们介绍了响应式编程的概念，并讨论了 Flux API。然后，我们讨论了 Flux API 的 create 和 generate 方法。最后，我们提供了 Flux API 的 create 和 generate 方法之间的差异列表。

本教程的源代码可在 GitHub 上获取。