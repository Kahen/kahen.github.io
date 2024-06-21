---
date: 2024-06-17
category:
  - Java
  - Concurrency
tag:
  - ExecutorService
  - Unit Testing
---
# 如何在不使用Thread.sleep()的情况下单元测试ExecutorService | Baeldung

## 1. 概述

一个_ExecutorService_对象在后台运行任务。单元测试在另一个线程上运行的任务是具有挑战性的。**父线程必须等待任务结束才能断言其结果**。

此外，解决这个问题的一个方法是使用_Thread.sleep()_方法。这个方法会阻塞父线程一段时间。然而，如果任务超出了_sleep()_上设置的时间，单元测试会在任务完成之前结束并失败。

在本教程中，我们将学习如何在不使用_Thread.sleep()_方法的情况下单元测试一个_ExecutorService_实例。

## 2. 创建一个_Runnable_对象

在进行测试之前，让我们创建一个实现_Runnable_接口的类：

```java
public class MyRunnable implements Runnable {
    Long result;

    public Long getResult() {
        return result;
    }

    public void setResult(Long result) {
        this.result = result;
    }

    @Override
    public void run() {
        result = sum();
    }

    private Long sum() {
        Long result = 0L;
        for (int i = 0; i `< Integer.MAX_VALUE; i++) {
            result += i;
        }
        return result;
    }
}
```

_MyRunnable_类执行一个需要很长时间的计算。计算出的总和然后设置到_result_成员字段。所以，这将是我们提交给执行器的任务。

## 3. 问题

通常，**一个_ExecutorService_对象在后台线程中运行任务**。任务实现了_Callable_或_Runnable_接口。

**如果父线程不等待，它会在任务完成之前终止**。所以，测试总是失败。

让我们创建一个单元测试来验证问题：

```java
ExecutorService executorService = Executors.newSingleThreadExecutor();
MyRunnable r = new MyRunnable();
executorService.submit(r);
assertNull(r.getResult());

```

在这个测试中，我们首先创建了一个单线程的ExecutorService实例。然后，我们创建并提交了一个任务。最后，我们断言_result_字段的值。

在运行时，断言在任务结束之前运行。所以，_getResult()_返回_null_。

## 4. 使用_Future_类

**_Future_类表示后台任务的结果**。此外，**它可以阻塞父线程直到任务完成**。

让我们修改我们的测试以使用由_submit()_方法返回的_Future_对象：

```java
Future<?>` future = executorService.submit(r);
future.get();
assertEquals(2305843005992468481L, r.getResult());

```

这里，**_Future_实例的_get()_方法会阻塞，直到任务结束**。

此外，当任务是_Callable_的实例时，_get()_可能会返回一个值。**如果任务是_Runnable_的实例，_get()_总是返回_null_**。

现在运行测试比之前要长。这是一个迹象，表明父线程正在等待任务完成。最后，测试成功了。

## 5. 关闭和等待

**另一个选择是使用_ExecutorService_类的_shutdown()_和_awaitTermination()_方法**。

**_shutdown()_方法关闭执行器**。执行器不接受任何新任务。现有的任务不会被杀死。但它不等待它们结束。

另一方面，我们可以使用**_awaitTermination()_方法阻塞，直到所有提交的任务结束**。此外，我们应该在方法上设置一个阻塞超时。超时过去意味着阻塞结束。

让我们修改之前的测试以使用这两种方法：

```java
executorService.shutdown();
executorService.awaitTermination(10000, TimeUnit.SECONDS);
assertEquals(2305843005992468481L, r.getResult());
```

可以看到，我们在提交任务后关闭了执行器。接下来，我们调用_awaitTermination()_来阻塞线程，直到任务完成。

我们还设置了一个最大超时时间_10000_秒。因此，如果任务运行时间超过_10000_秒，方法将解除阻塞，即使任务还没有结束。换句话说，如果我们设置了一个很小的超时值，_awaitTermination()_会像_Thread.sleep()_一样过早地解除阻塞。

实际上，当我们运行它时，测试是成功的。

## 6. 使用_ThreadPoolExecutor_

另一个选择是**创建一个_ExecutorService_对象，它接受一个定义好数量的工作并阻塞直到它们完成**。

一个简单的方法是扩展_ThreadPoolExecutor_类：

```java
public class MyThreadPoolExecutor extends ThreadPoolExecutor {
    CountDownLatch doneSignal = null;

    public MyThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue``<Runnable>`` workQueue,
        int jobsNumberToWaitFor) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue);
        doneSignal = new CountDownLatch(jobsNumberToWaitFor);
    }

    @Override
    protected void afterExecute(Runnable r, Throwable t) {
        super.afterExecute(r, t);
        doneSignal.countDown();
    }

    public void waitDone() throws InterruptedException {
        doneSignal.await();
    }
}
```

这里，我们创建了扩展_ThreadPoolExecutor_的_MyThreadPoolExecutor_类。在其构造函数中，我们添加了_jobsNumberToWaitFor_参数，我们计划提交的工作数量。

此外，该类使用_doneSignal_字段，一个_CountDownLatch_类的实例。_doneSignal_字段在构造函数中初始化为要等待的工作数量。接下来，我们重写了_afterExecute()_方法，将_doneSignal_减一。_afterExecute()_方法在工作结束时被调用。

最后，我们有_waitDone()_方法，它使用_doneSignal_来阻塞，直到所有工作结束。

此外，我们可以用单元测试来测试上述实现：

```java
@Test
void whenUsingThreadPoolExecutor_thenTestSucceeds() throws InterruptedException {
    MyThreadPoolExecutor threadPoolExecutor = new MyThreadPoolExecutor(3, 6, 10L, TimeUnit.SECONDS, new LinkedBlockingQueue``<Runnable>``(), 20);
    List``<MyRunnable>`` runnables = new ArrayList``<MyRunnable>``();
    for (int i = 0; i < 20; i++) {
        MyRunnable r = new MyRunnable();
        runnables.add(r);
        threadPoolExecutor.submit(r);
    }
    threadPoolExecutor.waitDone();
    for (int i = 0; i < 20; i++) {
        assertEquals(2305843005992468481L, runnables.get(i).result);
    }
}
```

在这个单元测试中，我们向执行器提交了_20_个工作。紧接着，我们调用了_waitDone()_方法，该方法会阻塞，直到_20_个工作完成。最后，我们断言每个工作的结果。

## 7. 结论

**在本文中，我们学习了如何在不使用_Thread.sleep()_方法的情况下单元测试一个_ExecutorService_实例**。也就是说，我们看了三种方法：

- 获取一个_Future_对象并调用_get()_方法
- 关闭执行器并等待运行中的任务完成
- 创建自定义的_ExecutorService_

如常，我们示例的完整源代码可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。