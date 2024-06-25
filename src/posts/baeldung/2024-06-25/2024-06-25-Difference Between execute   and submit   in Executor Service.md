---
date: 2024-06-25
category:
  - Java
  - Concurrency
tag:
  - ExecutorService
  - submit()
  - execute()
head:
  - - meta
    - name: keywords
      content: Java, ExecutorService, submit(), execute(), 多线程, 并发
---
# Java中ExecutorService的submit()和execute()方法的区别

多线程和并行处理是现代应用开发中的关键概念。在Java中，_Executor_框架提供了一种有效管理和控制并发任务执行的方式。_ExecutorService_接口是这个框架的核心，它提供了两种常用的方法来提交需要执行的任务：_submit()_和_execute()_。

在本文中，我们将探讨这两种方法之间的主要区别。我们将通过一个简单的示例来使用_submit()_和_execute()_，模拟一个计算数组中数字总和的任务，使用线程池。

## 2. 使用_ExecutorService.submit( )_

让我们首先从_submit()_方法开始，它广泛用于_ExecutorService_接口。它允许我们提交任务以供执行，并返回一个表示计算结果的_Future_对象。

这个_Future_允许我们获取计算结果，处理任务执行期间发生的异常，并监控任务的状态。我们可以在_Future_中调用_get()_来检索结果或异常。

首先，我们初始化_ExecutorService_：

```java
ExecutorService executorService = Executors.newFixedThreadPool(2);
```

这里，我们使用大小为2的固定线程池初始化_ExecutorService_。这创建了一个使用固定数量的线程从共享的无界队列中操作的线程池。在我们的案例中，任何时候，最多有两个线程将被激活来处理任务。如果有更多任务发送，而所有现有任务都在处理中，它们将被保存在队列中，直到处理线程空闲。

接下来，我们使用_Callable_创建一个任务：

```java
Callable```<Integer>``` task = () -> {
    int[] numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int num : numbers) {
        sum += num;
    }
    return sum;
};
```

重要的是，这里，_Callable_对象表示返回结果并可能抛出异常的任务。在这种情况下，它表示另一个线程可以执行并返回结果或可能抛出异常的任务。这个_Callable_计算数组中整数的总和并返回结果。

现在我们已经将任务定义为_Callable_，让我们将这个任务提交给_ExecutorService_：

```java
Future```<Integer>``` result = executorService.submit(task);
```

简单来说，_submit()_方法接受_Callable_任务，并将其提交给_ExecutorService_执行。它返回一个_Future```<Integer>```_对象，表示计算的未来结果。总的来说，_executorService.submit()_是使用_ExecutorService_异步执行_Callable_任务的一种方式，允许任务的并发执行，并通过返回的_Future_获取它们的结果。

最后，让我们检查结果：

```java
try {
    int sum = result.get();
    System.out.println("使用submit计算的总和:" + sum);
} catch (InterruptedException | ExecutionException e) {
    e.printStackTrace();
}
```

这里，_get()_检索任务执行的结果。在这种情况下，它获取任务计算的总和并打印它。**但重要的是要注意，_get()_方法是一个阻塞调用，如果结果尚不可用，它会等待，可能会导致线程暂停，直到结果准备好**。如果计算在运行时遇到问题，它也可能抛出_InterruptedException或ExecutionException_等异常。

最后，让我们关闭_ExecutorService_：

```java
executorService.shutdown();
```

这在任务完成执行后关闭_ExecutorService_并释放服务使用的任何资源。

## 3. 使用_ExecutorService.execute( )_

_execute()_方法是一个更简单的方法，定义在_Executor_接口中，它是_ExecutorService_的父接口。**它用于提交任务以供执行，但不返回一个** _**Future**_ **。**这意味着我们不能通过_Future_对象直接获取任务的结果或处理异常。

它适用于我们不需要等待任务结果，也不期望任何异常的场景。这些任务是为了它们的副作用而执行的。

像以前一样，我们将创建一个大小为2的固定线程池的_ExecutorService_。然而，我们将创建一个_Runnable_任务：

```java
Runnable task = () -> {
    int[] numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int num : numbers) {
        sum += num;
    }
    System.out.println("使用execute计算的总和: " + sum);
};
```

重要的是，任务不返回任何结果；它只是计算总和并在任务内部打印它。我们现在将_Runnable_任务提交给_ExecutorService_：

```java
executorService.execute(task);
```

**这仍然是一个异步操作，表示来自线程池的线程之一将执行任务。**

## 4. 结论

在本文中，我们查看了_ExecutorService_接口中_submit()_和_execute()_的显著特点和用途。总结来说，这两种方法都提供了一种提交任务以供并发执行的方式，但它们在处理任务结果和异常方面有所不同。

选择_submit()_和_execute()_取决于具体要求。**如果我们需要获取任务的结果或处理异常，我们应该使用_submit()_。另一方面，如果我们有一个不返回结果的任务，我们想要发射它并忘记它，_execute()_是正确的选择**。

此外，如果我们正在处理更复杂的用例并且需要灵活性来管理任务并检索结果或异常，_submit()_是更好的选择。

像往常一样，本文的完整代码可以在GitHub上找到。