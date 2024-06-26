---
date: 2024-06-26
category:
  - Java
  - 异步编程
tag:
  - CompletableFuture
  - 单元测试
head:
  - - meta
    - name: keywords
      content: Java, CompletableFuture, 单元测试, 异步编程
---
# 如何有效地对CompletableFuture进行单元测试

CompletableFuture 是 Java 中用于异步编程的强大工具。它提供了一种方便的方式来将异步任务链接在一起并处理它们的结果。它通常用于需要执行异步操作并在稍后阶段需要使用或处理其结果的情况。

然而，对 CompletableFuture 进行单元测试可能具有挑战性，因为它的异步特性。依赖于顺序执行的传统测试方法常常无法捕捉到异步代码的细微差别。在本教程中，我们将讨论如何使用两种不同的方法：黑盒测试和基于状态的测试，来有效地对 CompletableFuture 进行单元测试。

异步代码引入了挑战，因为它的非阻塞和并发执行，给传统测试方法带来了困难。这些挑战包括：

- 时间问题：异步操作将时间依赖性引入代码，使得控制执行流程和在特定时间点验证代码行为变得困难。依赖于顺序执行的传统测试方法可能不适用于异步代码。
- 异常处理：异步操作可能会抛出异常，重要的是要确保代码能够优雅地处理这些异常，并且不会静默失败。单元测试应该涵盖各种场景以验证异常处理机制。
- 竞态条件：异步代码可能导致竞态条件，其中多个线程或进程尝试同时访问或修改共享数据，可能导致意外的结果。
- 测试覆盖率：由于交互的复杂性和潜在的非确定性结果，实现异步代码的全面测试覆盖率可能具有挑战性。

黑盒测试侧重于在不了解其内部实现的情况下测试代码的外部行为。这种方法适用于从用户的角度验证异步代码行为。测试者只知道代码的输入和预期输出。

使用黑盒测试对 CompletableFuture 进行测试时，我们优先考虑以下方面：

- 成功完成：验证 CompletableFuture 成功完成，并返回预期结果。
- 异常处理：验证 CompletableFuture 能够优雅地处理异常，防止静默失败。
- 超时：确保 CompletableFuture 在遇到超时时的行为符合预期。

我们可以使用 Mockito 这样的模拟框架来模拟 CompletableFuture 正在测试的依赖项。这将允许我们隔离 CompletableFuture 并在受控环境中测试其行为。

我们将测试一个名为 processAsync() 的方法，该方法封装了异步数据检索和组合过程。此方法接受 Microservice 对象列表作为输入，并返回 CompletableFuture```````````````````<String>```````````````````。每个 Microservice 对象表示能够执行异步检索操作的微服务。

processAsync() 利用两个辅助方法 fetchDataAsync() 和 combineResults() 来处理异步数据检索和组合任务：

```java
CompletableFuture```````````````````<String>``````````````````` processAsync(List``<Microservice>`` microservices) {
    List<CompletableFuture```````````````````<String>```````````````````> dataFetchFutures = fetchDataAsync(microservices);
    return combineResults(dataFetchFutures);
}
```

fetchDataAsync() 方法通过 Microservice 列表流式处理，为每个调用 retrieveAsync()，并返回 CompletableFuture```````````````````<String>``````````````````` 列表：

```java
private List<CompletableFuture```````````````````<String>```````````````````> fetchDataAsync(List``<Microservice>`` microservices) {
    return microservices.stream()
        .map(client -> client.retrieveAsync(""))
        .collect(Collectors.toList());
}
```

combineResults() 方法使用 CompletableFuture.allOf() 等待列表中的所有 future 完成。一旦完成，它映射 futures，连接结果，并返回一个单独的字符串：

```java
private CompletableFuture```````````````````<String>``````````````````` combineResults(List<CompletableFuture```````````````````<String>```````````````````> dataFetchFutures) {
    return CompletableFuture.allOf(dataFetchFutures.toArray(new CompletableFuture[0]))
      .thenApply(v -> dataFetchFutures.stream()
        .map(future -> future.exceptionally(ex -> {
            throw new CompletionException(ex);
        }))
        .collect(Collectors.joining()));
}
```

测试用例：验证成功的数据检索和组合

此测试用例验证 processAsync() 方法是否正确地从多个微服务中检索数据，并将结果组合成单个字符串：

```java
@Test
public void givenAsyncTask_whenProcessingAsyncSucceed_thenReturnSuccess()
  throws ExecutionException, InterruptedException {
    Microservice mockMicroserviceA = mock(Microservice.class);
    Microservice mockMicroserviceB = mock(Microservice.class);

    when(mockMicroserviceA.retrieveAsync(any())).thenReturn(CompletableFuture.completedFuture("Hello"));
    when(mockMicroserviceB.retrieveAsync(any())).thenReturn(CompletableFuture.completedFuture("World"));

    CompletableFuture```````````````````<String>``````````````````` resultFuture = processAsync(List.of(mockMicroserviceA, mockMicroserviceB));

    String result = resultFuture.get();
    assertEquals("HelloWorld", result);
}
```

测试用例：验证微服务抛出异常时的异常处理

此测试用例验证当其中一个微服务抛出异常时，processAsync() 方法会抛出 ExecutionException，并断言异常消息与微服务抛出的异常相同：

```java
@Test
public void givenAsyncTask_whenProcessingAsyncWithException_thenReturnException()
  throws ExecutionException, InterruptedException {
    Microservice mockMicroserviceA = mock(Microservice.class);
    Microservice mockMicroserviceB = mock(Microservice.class);

    when(mockMicroserviceA.retrieveAsync(any())).thenReturn(CompletableFuture.completedFuture("Hello"));
    when(mockMicroserviceB.retrieveAsync(any()))
      .thenReturn(CompletableFuture.failedFuture(new RuntimeException("Simulated Exception")));
    CompletableFuture```````````````````<String>``````````````````` resultFuture = processAsync(List.of(mockMicroserviceA, mockMicroserviceB));

    ExecutionException exception = assertThrows(ExecutionException.class, resultFuture::get);
    assertEquals("Simulated Exception", exception.getCause().getMessage());
}
```

测试用例：验证组合结果超出超时时的超时处理

此测试用例尝试在指定的 300 毫秒超时内从 processAsync() 方法检索组合结果。它断言当超时超过时会抛出 TimeoutException：

```java
@Test
public void givenAsyncTask_whenProcessingAsyncWithTimeout_thenHandleTimeoutException()
  throws ExecutionException, InterruptedException {
    Microservice mockMicroserviceA = mock(Microservice.class);
    Microservice mockMicroserviceB = mock(Microservice.class);

    Executor delayedExecutor = CompletableFuture.delayedExecutor(200, TimeUnit.MILLISECONDS);
    when(mockMicroserviceA.retrieveAsync(any()))
      .thenReturn(CompletableFuture.supplyAsync(() -> "Hello", delayedExecutor));
    Executor delayedExecutor2 = CompletableFuture.delayedExecutor(500, TimeUnit.MILLISECONDS);
    when(mockMicroserviceB.retrieveAsync(any()))
      .thenReturn(CompletableFuture.supplyAsync(() -> "World", delayedExecutor2));
    CompletableFuture```````````````````<String>``````````````````` resultFuture = processAsync(List.of(mockMicroserviceA, mockMicroserviceB));

    assertThrows(TimeoutException.class, () -> resultFuture.get(300, TimeUnit.MILLISECONDS));
}
```

上述代码使用 CompletableFuture.delayedExecutor() 创建将在 200 和 500 毫秒后分别延迟完成 retrieveAsync() 调用的执行器。这模拟了微服务引起的延迟，并允许测试验证 processAsync() 方法是否正确处理超时。

基于状态的测试侧重于验证代码在执行过程中的状态转换。这种方法对于测试异步代码特别有用，因为它允许测试人员跟踪代码通过不同状态的进度，并确保它正确地进行转换。

例如，我们可以验证当所有构成 CompletableFuture 实例成功完成时，CompletableFuture 转换为完成状态。否则，当发生异常时，它转换为失败状态，或者由于中断而被取消。

测试用例：验证成功完成后的状态

此测试用例验证当所有构成 CompletableFuture 实例成功完成后，CompletableFuture 实例转换为完成状态：

```java
@Test
public void givenCompletableFuture_whenCompleted_thenStateIsDone() {
    Executor delayedExecutor = CompletableFuture.delayedExecutor(200, TimeUnit.MILLISECONDS);
    CompletableFuture```````````````````<String>``````````````````` cf1 = CompletableFuture.supplyAsync(() -> "Hello", delayedExecutor);
    CompletableFuture```````````````````<String>``````````````````` cf2 = CompletableFuture.supplyAsync(() -> " World");
    CompletableFuture```````````````````<String>``````````````````` cf3 = CompletableFuture.supplyAsync(() -> "!");
    CompletableFuture```````````````````<String>```````````````````[] cfs = new CompletableFuture[] { cf1, cf2, cf3 };

    CompletableFuture```<Void>``` allCf = CompletableFuture.allOf(cfs);

    assertFalse(allCf.isDone());
    allCf.join();
    String result = Arrays.stream(cfs)
      .map(CompletableFuture::join)
      .collect(Collectors.joining());

    assertFalse(allCf.isCancelled());
    assertTrue(allCf.isDone());
    assertFalse(allCf.isCompletedExceptionally());
}
```

测试用例：验证异常完成时的状态

此测试用例验证当构成 CompletableFuture 实例 cf2 异常完成时，allCf CompletableFuture 转换为异常状态：

```java
@Test
public void givenCompletableFuture_whenCompletedWithException_thenStateIsCompletedExceptionally()
  throws ExecutionException, InterruptedException {
    Executor delayedExecutor = CompletableFuture.delayedExecutor(200, TimeUnit.MILLISECONDS);
    CompletableFuture```````````````````<String>``````````````````` cf1 = CompletableFuture.supplyAsync(() -> "Hello", delayedExecutor);
    CompletableFuture```````````````````<String>``````````````````` cf2 = CompletableFuture.failedFuture(new RuntimeException("Simulated Exception"));
    CompletableFuture```````````````````<String>``````````````````` cf3 = CompletableFuture.supplyAsync(() -> "!");
    CompletableFuture```````````````````<String>```````````````````[] cfs = new CompletableFuture[] { cf1, cf2, cf3 };

    CompletableFuture```<Void>``` allCf = CompletableFuture.allOf(cfs);

    assertFalse(allCf.isDone());
    assertFalse(allCf.isCompletedExceptionally());

    assertThrows(CompletionException.class, allCf::join);

    assertTrue(allCf.isCompletedExceptionally());

    assertTrue(allCf.isCompletedExceptionally());
    assertTrue(allCf.isDone());
    assertFalse(allCf.isCancelled());
}
```

测试用例：验证任务取消后的状态

此测试用例验证当使用 cancel(true) 方法取消 allCf CompletableFuture 时，它转换为已取消状态：

```java
@Test
public void givenCompletableFuture_whenCancelled_thenStateIsCancelled()
  throws ExecutionException, InterruptedException {
    Executor delayedExecutor = CompletableFuture.delayedExecutor(200, TimeUnit.MILLISECONDS);
    CompletableFuture```````````````````<String>``````````````````` cf1 = CompletableFuture.supplyAsync(() -> "Hello", delayedExecutor);
    CompletableFuture```````````````````<String>``````````````````` cf2 = CompletableFuture.supplyAsync(() -> " World");
    CompletableFuture```````````````````<String>``````````````````` cf3 = CompletableFuture.supplyAsync(() -> "!");
    CompletableFuture```````````````````<String>```````````````````[] cfs = new CompletableFuture[] { cf1, cf2, cf3 };

    CompletableFuture```<Void>``` allCf = CompletableFuture.allOf(cfs);
    assertFalse(allCf.isDone());
    assertFalse(allCf.isCompletedExceptionally());

    allCf.cancel(true);

    assertTrue(allCf.isCancelled());
    assertTrue(allCf.isDone());
}
```

## 5. 结论

总之，由于其异步特性，对 CompletableFuture 进行单元测试可能具有挑战性。然而，它是编写健壮且可维护的异步代码的重要部分。通过使用黑盒和基于状态的测试方法，我们可以在各种条件下评估我们的 CompletableFuture 代码的行为，确保其按预期功能运行并优雅地处理潜在的异常。

如常，示例代码可在 GitHub 上获得。
OK