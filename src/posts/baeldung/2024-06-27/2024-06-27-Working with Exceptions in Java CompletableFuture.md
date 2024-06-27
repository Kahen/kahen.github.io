---
date: 2024-06-27
category:
  - Java
  - CompletableFuture
tag:
  - Java
  - CompletableFuture
  - 异常处理
head:
  - - meta
    - name: keywords
      content: Java CompletableFuture 异常处理
---
# Java CompletableFuture中的异常处理

Java 8引入了一种基于_Future_的新抽象概念来执行异步任务——_CompletableFuture_类。它基本上是用来克服旧版_Future_ API的问题。

在本教程中，我们将探讨在使用_CompletableFuture_时处理异常的方法。

## CompletableFuture回顾

首先，我们可能需要简要回顾一下_CompletableFuture_是什么。_CompletableFuture_是一种_Future_实现，允许我们运行并最重要的是，链式调用异步操作。一般来说，异步操作完成有三种可能的结果——正常完成、异常完成或从外部取消。_CompletableFuture_有各种API方法来处理所有这些可能的结果。

就像_CompletableFuture_中的许多其他方法一样，这些方法有非异步、异步以及使用特定_Executor_的异步变体。那么，让我们不再拖延，逐一看看如何在_CompletableFuture_中处理异常。

## handle()

首先，我们有一个handle()方法。通过使用此方法，**我们可以访问并转换_CompletionStage_的整个结果，无论结果如何**。也就是说，handle()方法接受一个_BiFunction_函数式接口。因此，这个接口有两个输入。在handle()方法的情况下，参数将是上一个_CompletionStage_的结果和发生的_Exception_。

重要的是，**这两个参数都是可选的，意味着它们可以是_null_**。这在某种意义上是显而易见的，因为上一个_CompletionStage_正常完成。然后_Exception_应该是_null_，因为没有发生任何异常，同样对于_CompletionStage_结果值的可空性也是如此。

让我们现在看看handle()方法使用的一个例子：

```java
@ParameterizedTest
@MethodSource("parametersSource_handle")
void whenCompletableFutureIsScheduled_thenHandleStageIsAlwaysInvoked(int radius, long expected)
  throws ExecutionException, InterruptedException {
    long actual = CompletableFuture
      .supplyAsync(() -> {
          if (radius `<= 0) {
              throw new IllegalArgumentException("Supplied with non-positive radius '%d'");
          }
          return Math.round(Math.pow(radius, 2) * Math.PI);
      })
      .handle((result, ex) ->` {
          if (ex == null) {
              return result;
          } else {
              return -1L;
          }
      })
      .get();

    Assertions.assertThat(actual).isEqualTo(expected);
}

static Stream```<Arguments>``` parameterSource_handle() {
    return Stream.of(Arguments.of(1, 3), Arguments.of(0, -1));
}
```

这里需要注意的是，handle()方法返回一个新的_CompletionStage_，它将始终执行，不管上一个_CompletionStage_的结果如何。因此，handle()将上一个阶段的源值转换为某个输出值。因此，我们将通过_get()_方法获得的值是handle()方法返回的值。

## exceptionally()

handle()方法并不总是方便的，特别是如果我们只想在出现异常时处理异常。幸运的是，我们有一个替代方案——exceptionally()。

此方法允许我们在**仅当上一个_CompletionStage_以_Exception_结束时执行回调**。如果没有抛出异常，那么回调将被省略，执行链将继续传递到下一个回调（如果有的话）与上一个的值。

为了理解，让我们看一个具体的例子：

```java
@ParameterizedTest
@MethodSource("parametersSource_exceptionally")
void whenCompletableFutureIsScheduled_thenExceptionallyExecutedOnlyOnFailure(int a, int b, int c, long expected)
  throws ExecutionException, InterruptedException {
    long actual = CompletableFuture
      .supplyAsync(() -> {
          if (a `<= 0 || b <= 0 || c <= 0) {
              throw new IllegalArgumentException(String.format("Supplied with incorrect edge length [%s]", List.of(a, b, c)));
          }
          return a * b * c;
      })
      .exceptionally((ex) ->` -1)
      .get();

    Assertions.assertThat(actual).isEqualTo(expected);
}

static Stream```<Arguments>``` parametersSource_exceptionally() {
    return Stream.of(
      Arguments.of(1, 5, 5, 25),
      Arguments.of(-1, 10, 15, -1)
    );
}
```

所以在这里，它的工作方式与handle()相同，但我们的回调参数是一个_Exception_实例。这个参数永远不会是_null_，所以我们的代码现在更简单一些。

需要注意的重要事项是，exceptionally()方法的回调仅在上一个阶段以_Exception_完成时执行。这基本上意味着如果在执行链中某个地方发生了_Exception_，并且已经有一个handle()方法捕获了它——那么exceptionally()回调将不会在之后执行：

```java
@ParameterizedTest
@MethodSource("parametersSource_exceptionally")
void givenCompletableFutureIsScheduled_whenHandleIsAlreadyPresent_thenExceptionallyIsNotExecuted(int a, int b, int c, long expected)
  throws ExecutionException, InterruptedException {
    long actual = CompletableFuture
      .supplyAsync(() -> {
          if (a `<= 0 || b <= 0 || c <= 0) {
              throw new IllegalArgumentException(String.format("Supplied with incorrect edge length [%s]", List.of(a, b, c)));
          }
          return a * b * c;
      })
      .handle((result, throwable) ->` {
          if (throwable != null) {
              return -1;
          }
          return result;
      })
      .exceptionally((ex) -> {
          System.exit(1);
          return 0;
      })
      .get();

    Assertions.assertThat(actual).isEqualTo(expected);
}

```

在这里，exceptionally()没有被调用，因为handle()方法已经捕获了任何_Exception_。因此，除非在handle()方法内部发生_Exception_，否则这里的exceptionally()方法永远不会被执行。

## whenComplete()

我们还拥有一个whenComplete()方法。它接受一个_BiConsumer_，有两个参数：上一个阶段的结果和如果有的话的异常。然而，这个方法与上述方法有显著的不同。

不同之处在于whenComplete()不会转换前一阶段的任何异常结果。因此，即使whenComplete()的回调总是运行，如果有来自前一阶段的异常，它将传播到更远的地方：

```java
@ParameterizedTest
@MethodSource("parametersSource_whenComplete")
void whenCompletableFutureIsScheduled_thenWhenCompletedExecutedAlways(Double a, long expected) {
    try {
        CountDownLatch countDownLatch = new CountDownLatch(1);
        long actual = CompletableFuture
          .supplyAsync(() -> {
              if (a.isNaN()) {
                  throw new IllegalArgumentException("Supplied value is NaN");
              }
              return Math.round(Math.pow(a, 2));
          })
          .whenComplete((result, exception) -> countDownLatch.countDown())
          .get();
        Assertions.assertThat(countDownLatch.await(20L, java.util.concurrent.TimeUnit.SECONDS));
        Assertions.assertThat(actual).isEqualTo(expected);
    } catch (Exception e) {
        Assertions.assertThat(e.getClass()).isSameAs(ExecutionException.class);
        Assertions.assertThat(e.getCause().getClass()).isSameAs(IllegalArgumentException.class);
    }
}

static Stream```<Arguments>``` parametersSource_whenComplete() {
    return Stream.of(
      Arguments.of(2d, 4),
      Arguments.of(Double.NaN, 1)
    );
}
```

如我们所见，whenCompleted()内的回调在两次测试调用中都运行了。然而，在第二次调用中，我们以_ExecutionException_完成，其原因是我们的_IllegalArgumentException_。所以，我们可以看到，来自回调的异常传播到了调用者。我们将在下一节中讨论为什么会发生这种情况。

## 未处理的异常

最后，我们需要稍微谈谈未处理的异常。**一般来说，如果一个异常没有被捕获，那么_CompletableFuture_将带有一个异常完成，这个异常不会传播到调用者。**在我们上面的例子中，我们从_get()_方法调用中得到了_ExecutionException_。这是因为我们尝试在_CompletableFuture_以_Exception_结束时访问结果。

因此，我们需要在_get()_调用之前检查_CompletableFuture_的结果。有几种方法可以做到这一点。第一种方法，也是可能对大家最熟悉的方法，是通过_isCompletedExceptionally()/isCancelled()/isDone()_方法。这些方法在_CompletableFutre_以异常完成、从外部取消或成功完成时返回一个布尔值。

然而，值得一提的是，还有一个_state()_方法，它返回一个_State_枚举实例。这个实例代表_CompletableFuture_的状态，如_RUNNING_, _SUCCESS_等。所以，这是另一种访问_CompletableFuture_结果的方法。

## 结论

在本文中，我们探讨了在_CompletableFuture_阶段发生异常的处理方式。

如往常一样，本文的源代码可在GitHub上获得。