---
date: 2024-06-15
category:
  - Java
tag:
  - Failsafe
  - 容错
---
# Java中使用Failsafe实现容错

在这篇文章中，我们将探索Failsafe库，并看到如何将其集成到我们的代码中，使其对故障情况更加有弹性。

## 2. 什么是容错？

无论我们多么精心构建应用程序，总会有出错的方式。通常，这些是我们无法控制的——例如，调用一个不可用的远程服务。因此，我们必须构建能够容忍这些故障并为用户提供最佳体验的应用程序。

我们可以根据不同的情况以许多不同的方式对这些故障做出反应。例如，如果我们正在调用一个我们知道会有间歇性中断的远程服务，我们可以重试并希望调用能够成功。或者我们可以尝试调用提供相同功能的另一个服务。

还有方法可以结构化我们的代码以避免这些情况。例如，限制对同一远程服务的并发调用数量将减少其负载。

## 3. 依赖关系

在我们使用Failsafe之前，我们需要在构建中包含最新版本，目前是3.3.2。

如果我们使用Maven，我们可以在_pom.xml_中包含它：

```xml
`<dependency>`
    `<groupId>`dev.failsafe`</groupId>`
    `<artifactId>`failsafe`</artifactId>`
    `<version>`3.3.2`</version>`
`</dependency>`
```

或者如果我们使用Gradle，我们可以在_build.gradle_中包含它：

```groovy
implementation("dev.failsafe:failsafe:3.3.2")
```

此时，我们已经准备好在应用程序中使用它了。

## 4. 使用Failsafe执行操作

Failsafe使用策略的概念。每个策略决定它是否认为操作是失败的，以及它将如何对此做出反应。

### 4.1. 确定失败

默认情况下，策略会认为如果操作抛出任何_异常_，则为失败。然而，**我们可以配置策略仅处理我们感兴趣的确切异常集**，无论是通过类型还是通过提供检查它们的lambda：

```java
policy
  .handle(IOException.class)
  .handleIf(e -> e instanceof IOException)
```

**我们还可以将特定操作结果配置为失败**，无论是作为确切值还是通过提供lambda来检查它：

```java
policy
  .handleResult(null)
  .handleResultIf(result -> result `< 0)
```

默认情况下，策略始终将所有异常视为失败。如果我们添加了异常处理，这将替换这种行为，但**添加对特定结果的处理将是策略异常处理的补充**。此外，我们所有的handle检查都是累加的——我们可以添加尽可能多的检查，如果任何检查通过，策略将认为操作失败。

### 4.2. 组合策略

**一旦我们有了策略，我们可以从中构建一个执行器。这是我们执行功能并获取结果的方式——无论是我们操作的实际结果还是由我们的策略修改的结果。** 我们可以通过将所有策略传递到_Failsafe.with()_中，或者我们可以使用_compose()_方法来扩展它：

```java
Failsafe.with(defaultFallback, npeFallback, ioFallback)
  .compose(timeout)
  .compose(retry);
```

我们可以按任何顺序添加任意多的策略。策略始终按照它们添加的顺序执行，每个策略都包装下一个策略。所，上面的代码将是：

每个策略都将适当地对它所包装的策略或操作的异常或返回值做出反应。这允许我们根据需要采取行动。例如，上述代码将超时应用于所有重试。我们也可以将其交换，以便将超时应用于每个单独的重试尝试。

### 4.3. 执行操作

一旦我们组合了策略，Failsafe将返回一个_FailsafeExecutor_实例给我们。**然后，这个实例有一组方法，我们可以使用它们来执行我们的操作，具体取决于我们想要执行什么以及我们希望如何返回结果。**

执行操作最直接的方式是_T_ _get`<T>(CheckedSupplier<T>`)_ 和 _void_ _run(CheckedRunnable)_。_CheckedSupplier_和_CheckedRunnable_都是功能接口，这意味着如果需要，我们可以使用lambda或方法引用来调用这些方法。

这两种方法的区别在于_get()_将返回操作的结果，而_run()_将返回_void_——并且操作也必须返回_void_：

```java
Failsafe.with(policy).run(this::runSomething);
var result = Failsafe.with(policy).get(this::doSomething);
```

此外，我们还有各种方法可以异步运行我们的操作，返回结果的_CompletableFuture_。然而，这些不在本文的讨论范围内。

## 5. Failsafe策略

**现在我们知道如何构建_FailsafeExecutor_来执行我们的操作，我们需要构建使用它的策略。Failsafe提供了几种标准策略。** 每个策略都使用构建器模式来简化构建过程。

### 5.1. 回退策略

**我们可以使用的最简单策略是_Fallback_。这个策略将允许我们在链式操作失败时提供一个新的结果。**

使用这种方法最简单的方式是简单地返回一个静态值：

```java
Fallback``<Integer>`` policy = Fallback.``<Integer>``builder(0).build();
```

在这种情况下，如果我们的操作由于任何原因失败，我们的策略将返回一个固定的值“0”。

此外，我们可以使用_CheckedRunnable_或_CheckedSupplier_来生成我们的替代值。根据我们的需求，这可能像在返回一个固定值之前写入日志消息一样简单，或者像运行一个完全不同的执行路径一样复杂：

```java
Fallback````<Result>```` backupService = Fallback.````<Result>````of(this::callBackupService)
  .build();

Result result = Failsafe.with(backupService)
  .get(this::callPrimaryService);
```

在这种情况下，我们将执行_callPrimaryService()_。如果这失败了，我们将自动执行_callBackupService()_并尝试用这种方式获得结果。

最后，我们可以使用_Fallback.ofException()_在任何失败的情况下抛出一个特定的异常。这允许我们将任何配置的失败原因归结为一个预期的异常，然后我们可以按需处理：

```java
Fallback````<Result>```` throwOnFailure = Fallback.````<Result>````ofException(e -> new OperationFailedException(e));
```

### 5.2. 重试策略

**_Fallback_策略允许我们在操作失败时给出一个替代结果。而_Retry_策略允许我们简单地再次尝试原始操作。**

没有配置的情况下，这个策略将调用操作最多三次，并在成功时返回结果，或者如果我们从未获得成功，则抛出_FailsafeException_：

```java
RetryPolicy``````````````````````````````````<Object>`````````````````````````````````` retryPolicy = RetryPolicy.``````````````````````````````````<Object>``````````````````````````````````builder().build();
```

这已经非常有用，因为这意味着如果我们有一个偶尔出错的操作，我们可以重试几次然后再放弃。

然而，我们可以进一步配置这种行为。我们能做的第一件事是使用_withMaxAttempts()_调用来调整它将重试的次数：

```java
RetryPolicy``````````````````````````````````<Object>`````````````````````````````````` retryPolicy = RetryPolicy.``````````````````````````````````<Object>``````````````````````````````````builder()
  .withMaxAttempts(5)
  .build();
```

现在，它将执行操作最多五次而不是默认的三次。

我们还可以配置它在每次尝试之间等待固定的时间量。这在短时故障（如网络闪烁）不会立即自行修复的情况下非常有用：

```java
RetryPolicy``````````````````````````````````<Object>`````````````````````````````````` retryPolicy = RetryPolicy.``````````````````````````````````<Object>``````````````````````````````````builder()
  .withDelay(Duration.ofMillis(250))
  .build();
```

我们还可以为此使用更复杂的变体。例如，_withBackoff()_将允许我们配置递增的延迟：

```java
RetryPolicy``````````````````````````````````<Object>`````````````````````````````````` retryPolicy = RetryPolicy.``````````````````````````````````<Object>``````````````````````````````````builder()
  .withMaxAttempts(20)
  .withBackoff(Duration.ofMillis(100), Duration.ofMillis(2000))
  .build();
```

这将在第一次失败后延迟100毫秒在第20次失败后延迟2000毫秒，并在中间失败时逐渐增加延迟。

### 5.3. 超时策略

**Fallback和Retry策略帮助我们从操作中获得成功的结果，而Timeout策略则相反。我们可以使用它来强制失败，如果我们调用的操作花费的时间比我们希望的要长。** 这在我们需要在操作花费太长时间时失败时非常有价值。

当我们构建我们的_Timeout_时，我们需要提供操作将失败的目标持续时间：

```java
Timeout``````````````````````````````````<Object>`````````````````````````````````` timeout = Timeout.``````````````````````````````````<Object>``````````````````````````````````builder(Duration.ofMillis(100)).build();
```

默认情况下，这将运行操作直到完成，然后如果它花费的时间超过了我们提供的持续时间就失败。

或者，我们可以配置它在超时到达时中断操作而不是运行到完成。这在我们需要快速响应而不是仅仅因为太慢而失败时非常有用：

```java
Timeout``````````````````````````````````<Object>`````````````````````````````````` timeout = Timeout.``````````````````````````````````<Object>``````````````````````````````````builder(Duration.ofMillis(100))
  .withInterrupt()
  .build();
```

我们可以将_Timeout_策略与_Retry_策略组合使用。如果我们在重试之外组合超时，那么超时周期将跨越所有重试：

```java
Timeout``````````````````````````````````<Object>`````````````````````````````````` timeoutPolicy = Timeout.``````````````````````````````````<Object>``````````````````````````````````builder(Duration.ofSeconds(10))
  .withInterrupt()
  .build();
RetryPolicy``````````````````````````````````<Object>`````````````````````````````````` retryPolicy = RetryPolicy.``````````````````````````````````<Object>``````````````````````````````````builder()
  .withMaxAttempts(20)
  .withBackoff(Duration.ofMillis(100), Duration.ofMillis(2000))
  .build();

Failsafe.with(timeoutPolicy, retryPolicy).get(this::perform);
```

这将尝试我们的操作最多20次，每次尝试之间有递增的延迟，但如果整个尝试超过10秒执行，将放弃。

相反，我们可以将超时组合在重试内部，以便每个单独的尝试都有超时配置：

```java
Timeout``````````````````````````````````<Object>`````````````````````````````````` timeoutPolicy = Timeout.``````````````````````````````````<Object>``````````````````````````````````builder(Duration.ofMillis(500))
  .withInterrupt()
  .build();
RetryPolicy``````````````````````````````````<Object>`````````````````````````````````` retryPolicy = RetryPolicy.``````````````````````````````````<Object>``````````````````````````````````builder()
  .withMaxAttempts(5)
  .build();

Failsafe.with(retryPolicy, timeoutPolicy).get(this::perform);
```

这将尝试操作五次，并且每次尝试如果超过500毫秒将被取消。

### 5.4. 舱壁策略

到目前为止，我们看到的所有策略都是关于控制我们的应用程序如何对故障做出反应的。然而，还有一些策略我们可以使用来减少故障发生的机会。

**舱壁策略存在是为了限制同时执行操作的次数。这可以减少外部服务的负载，因此有助于降低它们失败的机会。**

当我们构建一个_Bulkhead_时，我们需要配置它支持的最大并发执行数量：

```java
Bulkhead``````````````````````````````````<Object>`````````````````````````````````` bulkhead = Bulkhead.``````````````````````````````````<Object>``````````````````````````````````builder(10).build();
```

默认情况下，当舱壁已经达到容量时，将立即失败任何操作。

我们还可以配置舱壁在新操作进来时等待，如果容量开放，它将执行等待的任务：

```java
Bulkhead``````````````````````````````````<Object>`````````````````````````````````` bulkhead = Bulkhead.``````````````````````````````````<Object>``````````````````````````````````builder(10)
  .withMaxWaitTime(Duration.ofMillis(1000))
  .build();
```

任务将被允许通过舱壁，一旦容量可用，就按它们执行的顺序执行。任何等待时间超过此配置等待时间的任务将在等待时间到期时立即失败。然而，排在它们后面的其他任务可能随后会成功执行。

### 5.5. 速率限制器策略

**与舱壁类似，速率限制器有助于限制可以发生的操作执行次数。然而，与舱壁不同，舱壁只跟踪当前正在执行的操作数量，速率限制器限制了在给定时期内的操作数量。**

Failsafe为我们提供了两种速率限制器——突发型和平滑型。

突发型速率限制器使用固定时间窗口，并允许在此窗口内执行最大数量的操作：

```java
RateLimiter``````````````````````````````````<Object>`````````````````````````````````` rateLimiter = RateLimiter.``````````````````````````````````<Object>``````````````````````````````````burstyBuilder(100, Duration.ofSeconds(1))
  .withMaxWaitTime(Duration.ofMillis(200))
  .build();
```

在这种情况下，我们每秒可以执行100个操作。我们已经配置了一个等待时间，操作可以阻塞直到它们被执行或失败。这些被称为突发型，因为在窗口结束时计数突然回到零，所以我们突然允许执行再次开始。

特别是，有了我们的等待时间，所有阻塞等待时间的执行将在速率限制器窗口结束时突然能够执行。

平滑型速率限制器则通过时间窗口分散执行：

```java
RateLimiter``````````````````````````````````<Object>`````````````````````````````````` rateLimiter = RateLimiter.``````````````````````````````````<Object>``````````````````````````````````smoothBuilder(100, Duration.ofSeconds(1))
  .withMaxWaitTime(Duration.ofMillis(200))
  .build();
```

这看起来与之前非常相似。然而，在这种情况下，执行将在窗口内平滑分布。这意味着不是在一秒钟内允许100次执行，而是每1/100秒允许一次执行。任何比这更快的执行将触及我们的等待时间，否则将失败。

### 5.6. 断路器策略

**与其他大多数策略不同，我们可以使用断路器让我们的应用程序在操作被认为已经失败时快速失败。** 例如，如果我们正在调用远程服务并知道它没有响应，那么尝试是没有意义的——我们可以立即失败，而不必先花费时间和资源。

**断路器在三态系统中工作。** 默认状态是Closed，这意味着所有操作都像断路器不存在一样被尝试。然而，如果这些操作中的足够多失败，断路器将移动到Open。

Open状态意味着没有操作被尝试，所有调用将立即失败。断路器将保持这种状态一段时间，然后移动到Half-Open。

Half-Open状态意味着操作被尝试，但我们有一个不同的失败阈值来确定我们是移动到Closed还是Open。

例如：

```java
CircuitBreaker``````````````````````````````````<Object>`````````````````````````````````` circuitBreaker = CircuitBreaker.``````````````````````````````````<Object>``````````````````````````````````builder()
  .withFailureThreshold(7, 10)
  .withDelay(Duration.ofMillis(500))
  .withSuccessThreshold(4, 5)
  .build();
```

这个设置将在我们在过去10个请求中有7个失败时从Closed移动到Open，在500毫秒后从Open移动到Half-Open，如果我们在过去10个请求中有4个成功，则从Half-Open移动到Closed，或者如果我们在过去5个请求中有2个失败，则回到Open。

我们还可以配置我们的失败阈值基于时间。例如，让我们在过去30秒内有五个失败时打开电路：

```java
CircuitBreaker``````````````````````````````````<Object>`````````````````````````````````` circuitBreaker = CircuitBreaker.``````````````````````````````````<Object>``````````````````````````````````builder()
  .withFailureThreshold(5, Duration.ofSeconds(30))
  .build();
```

我们还可以将其配置为请求的百分比而不是固定数量。例如，让我们在任何5分钟期间有20%的失败率并且至少有100个请求时打开电路：

```java
CircuitBreaker``````````````````````````````````<Object>`````````````````````````````````` circuitBreaker = CircuitBreaker.``````````````````````````````````<Object>``````````````````````````````````builder()
  .withFailureRateThreshold(20, 100, Duration.ofMinutes(5))
  .build();
```

这样做允许我们更快地适应负载。如果我们的负载非常低，我们可能根本不想检查失败，但如果我们的负载非常高，失败的机会增加，所以我们希望只有在超过我们的阈值时才做出反应。

## 6. 总结

在这篇文章中，我们对Failsafe进行了广泛的介绍。这个库可以做更多，所以为什么不试试看看呢？

所有的例子都可以在GitHub上找到。
OK
