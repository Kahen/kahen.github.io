---
date: 2023-06-22
category:
  - Java
  - Reactive Programming
tag:
  - Mono
  - defer
  - Reactive Streams
head:
  - - meta
    - name: keywords
      content: Java, Reactive Programming, Mono, defer, Reactive Streams
---
# Mono.defer() 是做什么用的？ | Baeldung

## 1. 概述

在响应式编程中，我们有多种方法可以创建类型为 _Mono_ 或 _Flux_ 的发布者。在这里，我们将探讨使用 _defer_ 方法来延迟执行 _Mono_ 发布者。

## 2. Mono.defer 方法是什么？

我们可以使用 _defer_ 方法创建一个最多产生一个值的冷发布者。让我们看看方法签名：

```java
public static ````<T>```` Mono````<T>```` defer(Supplier``<? extends Mono<? extends T>``> supplier)
```

在这里，_defer_ 接受一个 _Mono_ 发布者的 _Supplier_ 并返回该 _Mono_，当下游订阅时才懒加载地返回。

然而，问题是，什么是冷发布者或懒发布者？让我们深入研究。

**消费者订阅时，执行线程仅评估冷发布者。** **而热发布者在任何订阅之前就急切地评估。** 我们有 _Mono.just()_ 方法，它提供了一个类型的 _Mono_ 的热发布者。

## 3. 它是如何工作的？

让我们探索一个具有 _Mono_ 类型 _Supplier_ 的示例用例：

```java
private Mono``````````<String>`````````` sampleMsg(String str) {
    log.debug("Call to Retrieve Sample Message!! --> {} at: {}", str, System.currentTimeMillis());
    return Mono.just(str);
}
```

这里，这个方法返回一个热 _Mono_ 发布者。让我们急切地订阅它：

```java
public void whenUsingMonoJust_thenEagerEvaluation() throws InterruptedException {
    
    Mono``````````<String>`````````` msg = sampleMsg("Eager Publisher");
    
    log.debug("Intermediate Test Message....");
    
    StepVerifier.create(msg)
      .expectNext("Eager Publisher")
      .verifyComplete();
    
    Thread.sleep(5000);
    
    StepVerifier.create(msg)
      .expectNext("Eager Publisher")
      .verifyComplete();
}
```

执行时，我们可以看到日志中的以下内容：

```plaintext
20:44:30.250 [main] DEBUG com.baeldung.mono.MonoUnitTest - Call to Retrieve Sample Message!! --> Eager Publisher at: 1622819670247
20:44:30.365 [main] DEBUG reactor.util.Loggers$LoggerFactory - Using Slf4j logging framework
20:44:30.365 [main] DEBUG com.baeldung.mono.MonoUnitTest - Intermediate Test Message....
```

在这里，我们可以注意到：

- 根据指令序列，主线程急切地执行 _sampleMsg_ 方法。
- 在使用 _StepVerifier_ 的两次订阅中，主线程使用 _sampleMsg_ 的相同输出。因此，没有新的评估。

让我们看看 _Mono.defer()_ 如何将其转换为冷（懒）发布者：

```java
public void whenUsingMonoDefer_thenLazyEvaluation() throws InterruptedException {
    
    Mono``````````<String>`````````` deferMsg = Mono.defer(() -> sampleMsg("Lazy Publisher"));
    
    log.debug("Intermediate Test Message....");
    
    StepVerifier.create(deferMsg)
      .expectNext("Lazy Publisher")
      .verifyComplete();
    
    Thread.sleep(5000);
    
    StepVerifier.create(deferMsg)
      .expectNext("Lazy Publisher")
      .verifyComplete();
}
```

执行这个方法时，我们可以看到控制台中的以下日志：

```plaintext
20:01:05.149 [main] DEBUG com.baeldung.mono.MonoUnitTest - Intermediate Test Message....
20:01:05.187 [main] DEBUG com.baeldung.mono.MonoUnitTest - Call to Retrieve Sample Message!! --> Lazy Publisher at: 1622817065187
20:01:10.197 [main] DEBUG com.baeldung.mono.MonoUnitTest - Call to Retrieve Sample Message!! --> Lazy Publisher at: 1622817070197
```

在这里，我们可以从日志序列中注意到几点：

- _StepVerifier_ 在每次订阅时执行 _sampleMsg_ 方法，而不是在我们定义它时。
- 在5秒的延迟之后，第二个订阅 _sampleMsg_ 方法的消费者再次执行它。

这就是 _defer_ 方法将热发布者转换为冷发布者的方式。

## 4. _Mono.defer_ 的使用场景？

让我们看看我们可以在哪里使用 _Mono.defer()_ 方法的可能用例：

- 当我们必须有条件地订阅发布者时
- 当每个订阅的执行可能产生不同的结果时
- **_deferContextual_ 可以用于基于当前上下文的发布者评估**

### 4.1. 示例用法

让我们通过一个使用条件 _Mono.defer()_ 方法的示例：

```java
public void whenEmptyList_thenMonoDeferExecuted() {
    
    Mono<List``````````<String>``````````> emptyList = Mono.defer(() -> monoOfEmptyList());
    
    // 空列表，因此在 switchIfEmpty 中的 Mono 发布者在条件评估后执行
    Flux``````````<String>`````````` emptyListElements = emptyList.flatMapIterable(l -> l)
      .switchIfEmpty(Mono.defer(() -> sampleMsg("EmptyList")))
      .log();
    
    StepVerifier.create(emptyListElements)
      .expectNext("EmptyList")
      .verifyComplete();
}
```

在这里，发布者 _sampleMsg_ 的 _Supplier_ 被放置在 _switchIfEmpty_ 方法中，用于条件执行。因此，仅当它被懒加载订阅时才执行 _sampleMsg_。

现在，让我们看看非空列表的相同代码：

```java
public void whenNonEmptyList_thenMonoDeferNotExecuted() {
    
    Mono<List``````````<String>``````````> nonEmptyList = Mono.defer(() -> monoOfList());
    
    // 非空列表，因此在 switchIfEmpty 中的 Mono 发布者不会被评估。
    Flux``````````<String>`````````` listElements = nonEmptyList.flatMapIterable(l -> l)
      .switchIfEmpty(Mono.defer(() -> sampleMsg("NonEmptyList")))
      .log();
    
    StepVerifier.create(listElements)
      .expectNext("one", "two", "three", "four")
      .verifyComplete();
}
```

在这里，_sampleMsg_ 没有被执行，因为它没有被订阅。

## 5. 结论

在本文中，我们讨论了 _Mono.defer()_ 方法和热/冷发布者。此外，我们如何将热发布者转换为冷发布者。最后，我们还讨论了它的工作原理以及示例用例。

如往常一样，代码示例可在 GitHub 上找到。我已经完成了翻译，以下是翻译的完整内容：

---
date: 2023-06-22
category:
  - Java
  - Reactive Programming
tag:
  - Mono
  - defer
  - Reactive Streams
head:
  - - meta
    - name: keywords
      content: Java, Reactive Programming, Mono, defer, Reactive Streams
---
# Mono.defer() 是做什么用的？ | Baeldung

## 1. 概述

在响应式编程中，我们有多种方法可以创建类型为 _Mono_ 或 _Flux_ 的发布者。在这里，我们将探讨使用 _defer_ 方法来延迟执行 _Mono_ 发布者。

## 2. Mono.defer 方法是什么？

我们可以使用 _defer_ 方法创建一个最多产生一个值的冷发布者。让我们看看方法签名：

```java
public static ````<T>```` Mono````<T>```` defer(Supplier``<? extends Mono<? extends T>``> supplier)
```

在这里，_defer_ 接受一个 _Mono_ 发布者的 _Supplier_ 并返回该 _Mono_，当下游订阅时才懒加载地返回。

然而，问题是，什么是冷发布者或懒发布者？让我们深入研究。

**消费者订阅时，执行线程仅评估冷发布者。** **而热发布者在任何订阅之前就急切地评估。** 我们有 _Mono.just()_ 方法，它提供了一个类型的 _Mono_ 的热发布者。

## 3. 它是如何工作的？

让我们探索一个具有 _Mono_ 类型 _Supplier_ 的示例用例：

```java
private Mono``````````<String>`````````` sampleMsg(String str) {
    log.debug("Call to Retrieve Sample Message!! --> {} at: {}", str, System.currentTimeMillis());
    return Mono.just(str);
}
```

这里，这个方法返回一个热 _Mono_ 发布者。让我们急切地订阅它：

```java
public void whenUsingMonoJust_thenEagerEvaluation() throws InterruptedException {
    
    Mono``````````<String>`````````` msg = sampleMsg("Eager Publisher");
    
    log.debug("Intermediate Test Message....");
    
    StepVerifier.create(msg)
      .expectNext("Eager Publisher")
      .verifyComplete();
    
    Thread.sleep(5000);
    
    StepVerifier.create(msg)
      .expectNext("Eager Publisher")
      .verifyComplete();
}
```

执行时，我们可以看到日志中的以下内容：

```plaintext
20:44:30.250 [main] DEBUG com.baeldung.mono.MonoUnitTest - Call to Retrieve Sample Message!! --> Eager Publisher at: 1622819670247
20:44:30.365 [main] DEBUG reactor.util.Loggers$LoggerFactory - Using Slf4j logging framework
20:44:30.365 [main] DEBUG com.baeldung.mono.MonoUnitTest - Intermediate Test Message....
```

在这里，我们可以注意到：

- 根据指令序列，主线程急切地执行 _sampleMsg_ 方法。
- 在使用 _StepVerifier_ 的两次订阅中，主线程使用 _sampleMsg_ 的相同输出。因此，没有新的评估。

让我们看看 _Mono.defer()_ 如何将其转换为冷（懒）发布者：

```java
public void whenUsingMonoDefer_thenLazyEvaluation() throws InterruptedException {
    
    Mono``````````<String>`````````` deferMsg = Mono.defer(() -> sampleMsg("Lazy Publisher"));
    
    log.debug("Intermediate Test Message....");
    
    StepVerifier.create(deferMsg)
      .expectNext("Lazy Publisher")
      .verifyComplete();
    
    Thread.sleep(5000);
    
    StepVerifier.create(deferMsg)
      .expectNext("Lazy Publisher")
      .verifyComplete();
}
```

执行这个方法时，我们可以看到控制台中的以下日志：

```plaintext
20:01:05.149 [main] DEBUG com.baeldung.mono.MonoUnitTest - Intermediate Test Message....
20:01:05.187 [main] DEBUG com.baeldung.mono.MonoUnitTest - Call to Retrieve Sample Message!! --> Lazy Publisher at: 1622817065187
20:01:10.197 [main] DEBUG com.baeldung.mono.MonoUnitTest - Call to Retrieve Sample Message!! --> Lazy Publisher at: 1622817070197
```

在这里，我们可以从日志序列中注意到几点：

- _StepVerifier_ 在每次订阅时执行 _sampleMsg_ 方法，而不是在我们定义它时。
- 在5秒的延迟之后，第二个订阅 _sampleMsg_ 方法的消费者再次执行它。

这就是 _defer_ 方法将热发布者转换为冷发布者的方式。

## 4. _Mono.defer_ 的使用场景？

让我们看看我们可以在哪里使用 _Mono.defer()_ 方法的可能用例：

- 当我们必须有条件地订阅发布者时
- 当每个订阅的执行可能产生不同的结果时
- **_deferContextual_ 可以用于基于当前上下文的发布者评估**

### 4.1. 示例用法

让我们通过一个使用条件 _Mono.defer()_ 方法的示例：

```java
public void whenEmptyList_thenMonoDeferExecuted() {
    
    Mono<List``````````<String>``````````> emptyList = Mono.defer(() -> monoOfEmptyList());
    
    // 空列表，因此在 switchIfEmpty 中的 Mono 发布者在条件评估后执行
    Flux``````````<String>`````````` emptyListElements = emptyList.flatMapIterable(l -> l)
      .switchIfEmpty(Mono.defer(() -> sampleMsg("EmptyList")))
      .log();
    
    StepVerifier.create(emptyListElements)
      .expectNext("EmptyList")
      .verifyComplete();
}
```

在这里，发布者 _sampleMsg_ 的 _Supplier_ 被放置在 _switchIfEmpty_ 方法中，用于条件执行。因此，仅当它被懒加载订阅时才执行 _sampleMsg_。

现在，让我们看看非空列表的相同代码：

```java
public void whenNonEmptyList_thenMonoDeferNotExecuted() {
    
    Mono<List``````````<String>``````````> nonEmptyList = Mono.defer(() -> monoOfList());
    
    // 非空列表，因此在 switchIfEmpty 中的 Mono 发布者不会被评估。
    Flux``````````<String>`````````` listElements = nonEmptyList.flatMapIterable(l -> l)
      .switchIfEmpty(Mono.defer(() -> sampleMsg("NonEmptyList")))
      .log();
    
    StepVerifier.create(listElements)
      .expectNext("one", "two", "three", "four")
      .verifyComplete();
}
```

在这里，_sampleMsg_ 没有被执行，因为它没有被订阅。

## 5. 结论

在本文中，我们讨论了 _Mono.defer()_ 方法和热/冷发布者。此外，我们如何将热发布者转换为冷发布者。最后，我们还讨论了它的工作原理以及示例用例。

如往常一样，代码示例可在 GitHub 上找到。

OK