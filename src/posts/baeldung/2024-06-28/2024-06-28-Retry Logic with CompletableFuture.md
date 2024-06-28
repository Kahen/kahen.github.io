---
date: 2022-04-01
category:
  - Java
  - CompletableFuture
tag:
  - CompletableFuture
  - 重试逻辑
  - Java
head:
  - - meta
    - name: keywords
      content: Java, CompletableFuture, 重试逻辑, 异步编程
---
# CompletableFuture中的重试逻辑

在这篇文章中，我们将学习如何对CompletableFuture对象应用重试逻辑。起初，我们将重试封装在CompletableFuture中的任务。之后，我们将利用CompletableFuture API创建多个实例的链，使我们能够在将来遇到异常完成时重新执行任务。

### 2. 重试任务

**简单重试任务的方法是利用装饰者模式，并使用传统的面向对象风格通过类和接口实现它。** 另一方面，我们可以选择更简洁和函数式的方法，利用高阶函数的优势。

首先，我们将声明一个函数，它接受一个Supplier```````````````````````````<T>```````````````````````````和最大调用次数作为参数。然后，我们将使用while循环和try-catch块在需要时多次调用函数。最后，我们将通过返回另一个Supplier```````````````````````````<T>```````````````````````````来保留原始数据类型：

```java
static ```````````````````````````<T>``````````````````````````` Supplier```````````````````````````<T>``````````````````````````` retryFunction(Supplier```````````````````````````<T>``````````````````````````` supplier, int maxRetries) {
    return () -> {
        int retries = 0;
        while (retries < maxRetries) {
            try {
                return supplier.get();
            } catch (Exception e) {
                retries++;
            }
        }
        throw new IllegalStateException(String.format("任务在%s次尝试后失败", maxRetries));
    };
}
```

我们可以进一步改进这个装饰器，允许定义特定的异常进行重试，或者引入调用之间的延迟。但是，为了简单起见，让我们继续创建基于此函数装饰器的CompletableFuture：

```java
static ```````````````````````````<T>``````````````````````````` CompletableFuture```````````````````````````<T>``````````````````````````` retryTask(Supplier```````````````````````````<T>``````````````````````````` supplier, int maxRetries) {
    Supplier```````````````````````````<T>``````````````````````````` retryableSupplier = retryFunction(supplier, maxRetries);
    return CompletableFuture.supplyAsync(retryableSupplier);
}
```

现在，让我们继续编写此功能的测试。首先，我们需要一个将被我们的CompletableFuture重试的方法。为此，我们将设计一个方法，该方法通过抛出RuntimeExceptions失败四次，并在第五次尝试时成功完成，返回一个整数值：

```java
AtomicInteger retriesCounter = new AtomicInteger(0);

@BeforeEach
void beforeEach() {
    retriesCounter.set(0);
}

int failFourTimesThenReturn(int returnValue) {
    int retryNr = retriesCounter.get();
    if (retryNr `< 4) {
        retriesCounter.set(retryNr + 1);
        throw new RuntimeException();
    }
    return returnValue;
}
```

现在，我们终于可以测试我们的retryTask()函数，并断言返回了预期的值。此外，我们可以通过查询retriesCounter来检查调用次数：

```java
@Test
void whenRetryingTask_thenReturnsCorrectlyAfterFourInvocations() {
    Supplier```<Integer>```` codeToRun = () -> failFourTimesThenReturn(100);

    CompletableFuture```<Integer>``` result = retryTask(codeToRun, 10);

    assertThat(result.join()).isEqualTo(100);
    assertThat(retriesCounter).hasValue(4);
}
```

此外，如果我们使用较小的值调用同一个函数的maxRetires参数，我们将期望Future异常完成。原始的IllegalStateException应该被包装在CompletionException中，但原始的错误消息应该被保留：

```java
@Test
void whenRetryingTask_thenThrowsExceptionAfterThreeInvocations() {
    Supplier```<Integer>``` codeToRun = () -> failFourTimesThenReturn(100);

    CompletableFuture```<Integer>``` result = retryTask(codeToRun, 3);

    assertThatThrownBy(result::join)
        .isInstanceOf(CompletionException.class)
        .hasMessageContaining("IllegalStateException: Task failed after 3 attempts");
}
```

### 3. 重试CompletableFuture

**CompletableFuture API提供了处理异常的选项，因为它们出现。因此，我们可以利用exceptionally()等方法，而不是创建我们自己的函数装饰器。**

#### 3.1. 不安全的重试

exceptionally()方法使我们能够指定一个备选函数，当初始调用因异常而完成时，将调用此函数。例如，如果我们打算重试两次调用，我们可以利用流畅的API添加这两个回退：

```java
static ```````````````````````````<T>``````````````````````````` CompletableFuture```````````````````````````<T>``````````````````````````` retryTwice(Supplier```````````````````````````<T>``````````````````````````` supplier) {
    return CompletableFuture.supplyAsync(supplier)
      .exceptionally(__ -> supplier.get())
      .exceptionally(__ -> supplier.get());
}
```

由于我们需要可变的重试次数，让我们重构代码，改用for循环：

```java
static ```````````````````````````<T>``````````````````````````` CompletableFuture```````````````````````````<T>``````````````````````````` retryUnsafe(Supplier```````````````````````````<T>``````````````````````````` supplier, int maxRetries) {
    CompletableFuture```````````````````````````<T>``````````````````````````` cf = CompletableFuture.supplyAsync(supplier);
    for (int i = 0; i ``< maxRetries; i++) {
        cf = cf.exceptionally(__ ->`` supplier.get());
    }
    return cf;
}
```

我们可以使用相同的测试助手测试retryUnsafe()，并预期类似的结果。然而，如果初始供应商在创建具有所有exceptionally()回退的最终CompletableFuture之前完成，将会有一个微妙的区别。在这种情况下，函数确实会被重试指定的次数。但是，这个重试过程将在主线程上进行，导致异步性的丧失。

为了说明这一点，我们可以在for循环之前插入一个100毫秒的暂停，该循环依次调用exceptionally()方法。

```java
static ```````````````````````````<T>``````````````````````````` CompletableFuture```````````````````````````<T>``````````````````````````` retryUnsafe(Supplier```````````````````````````<T>``````````````````````````` supplier, int maxRetries) {
    CompletableFuture```````````````````````````<T>``````````````````````````` cf = CompletableFuture.supplyAsync(supplier);
    sleep(100l);
    for (int i = 0; i ``< maxRetries; i++) {
        cf = cf.exceptionally(__ ->`` supplier.get());
    }
    return cf;
}
```

接下来，我们将修改failFourTimesThenReturn()测试方法，以记录每次调用此方法时的尝试次数和当前线程名称。现在，让我们重新运行测试并检查控制台：

```plaintext
invocation: 0, thread: ForkJoinPool.commonPool-worker-1
invocation: 1, thread: main
invocation: 2, thread: main
invocation: 3, thread: main
invocation: 4, thread: main
```

正如预期的那样，后续调用是由主线程执行的。如果初始调用很快，但随后的调用预计会更慢，这可能会成为问题。

#### 3.2. 异步重试

我们可以通过确保后续调用异步执行来解决这个问题。为此，从Java 12开始，API中引入了一个专用方法。**通过使用exceptionallyAsync()，我们将确保所有重试都将异步执行，无论初始CompletableFuture完成的速度如何**：

```java
static ```````````````````````````<T>``````````````````````````` CompletableFuture```````````````````````````<T>``````````````````````````` retryExceptionallyAsync(Supplier```````````````````````````<T>``````````````````````````` supplier, int maxRetries) {
   CompletableFuture```````````````````````````<T>``````````````````````````` cf = CompletableFuture.supplyAsync(supplier);
   for (int i = 0; i `< maxRetries; i++) {
      cf = cf.exceptionallyAsync(__ ->` supplier.get());
   }
   return cf;
}
```

让我们快速运行测试并检查日志：

```plaintext
invocation: 0, thread: ForkJoinPool.commonPool-worker-1
invocation: 1, thread: ForkJoinPool.commonPool-worker-1
invocation: 2, thread: ForkJoinPool.commonPool-worker-1
invocation: 3, thread: ForkJoinPool.commonPool-worker-2
invocation: 4, thread: ForkJoinPool.commonPool-worker-2
```

正如预期的那样，没有调用是由主线程执行的。

#### 3.3. 嵌套CompletableFutures

**如果我们需要一个与Java 12之前的版本兼的解决方案，我们可以手动增强第一个示例以实现完全的异步性。** 为了实现这一点，我们必须确保回退在新的CompletableFuture内异步执行：

```java
cf.exceptionally(__ -> CompletableFuture.supplyAsync(supplier))
```

然而，上述代码将无法编译，因为数据类型不匹配，但我们可以通过三个步骤来解决它。首先，我们需要双重嵌套初始的Future。我们可以通过completedFuture()轻松实现这一点：

```java
CompletableFuture<CompletableFuture```````````````````````````<T>```````````````````````````> temp = cf.thenApply(value -> CompletableFuture.completedFuture(value));

```

现在类型匹配了，所以我们可以安全地应用exceptionally()回退：

```java
temp = temp.exceptionally(__ -> CompletableFuture.supplyAsync(supplier));

```

最后，我们将使用thenCompose()来展平对象并返回到原始类型：

```java
cf = temp.thenCompose(t -> t);
```

最后，让我们将所有内容结合起来，创建一个具有可变数量的异步回退的CompletableFuture。此外，让我们利用流畅的API、方法引用和实用函数来保持代码简洁：

```java
static ```````````````````````````<T>``````````````````````````` CompletableFuture```````````````````````````<T>``````````````````````````` retryNesting(Supplier```````````````````````````<T>``````````````````````````` supplier, int maxRetries) {
    CompletableFuture```````````````````````````<T>``````````````````````````` cf = CompletableFuture.supplyAsync(supplier);
    for (int i = 0; i `< maxRetries; i++) {
        cf = cf.thenApply(CompletableFuture::completedFuture)
        .exceptionally(__ ->` CompletableFuture.supplyAsync(supplier))
        .thenCompose(Function.identity());
    }
    return cf;
}
```

## 4. 结论

在这篇文章中，我们探讨了在CompletableFuture内重试函数调用的概念。我们首先深入研究了以函数风格实现装饰者模式的实现，允许我们重试函数本身。

接着，我们利用CompletableFuture API来完成相同的任务，同时保持了异步流程。我们的发现包括Java 12中引入的exceptionallyAsync()方法，这非常适合这个目的。最后，我们展示了一种仅依赖原始Java 8 API的方法。

正如往常一样，我们可以在GitHub上找到工作的代码示例。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)[Gravatar Logo](https://secure.gravatar.com/avatar/475d4408e78071b2289e763a5887e617?s=50&r=g)[David Martinez Avatar](https://www.baeldung.com/wp-content/uploads/custom_avatars/david-martinez-150x150.png)[Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)[REST API Post Footer Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)[Article Footer Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK