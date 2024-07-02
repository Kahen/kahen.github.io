---
date: 2022-04-01
category:
  - Java
  - Concurrency
tag:
  - Executors
  - Task Notification
head:
  - - meta
    - name: keywords
      content: Java, Executors, Task Completion Notification, Asynchronous Task
---
# 如何在Java中使用Executors接收任务完成通知

Java提供了多种选项来异步运行任务，例如使用Executors。通常我们想知道任务何时完成，例如，为了提醒用户或开始下一个任务。在本教程中，我们将探讨根据我们最初运行任务的方式，接收任务完成通知的不同选项。

## 2. 设置

首先，让我们定义我们想要运行的任务和一个回调接口，当我们的任务完成时，我们希望通过该接口收到通知。

**对于我们的任务，我们将实现_Runnable_。_Runnable_是一个接口，当我们想要某些东西在线程中运行时可以使用。** 我们必须重写_run()_方法，并将我们的业务逻辑放在里面。对于我们的示例，我们只会在控制台打印，以便我们知道它已经运行：

```java
class Task implements Runnable {
    @Override
    public void run() {
        System.out.println("任务进行中");
        // 业务逻辑在这里
    }
}
```

然后让我们创建我们的_Callback_接口，我们将有一个单一的方法，它接受一个_String_参数。这是一个简单的例子，但我们可以根据需要拥有任何东西，使我们的提醒尽可能有用。使用_接口_允许我们以更通用的方式实现我们的解决方案。这意味着我们可以根据不同的用例传递不同的_CallbackInterface_实现：

```java
interface CallbackInterface {
    void taskDone(String details);
}
```

现在让我们实现该接口：

```java
class Callback implements CallbackInterface {
    void taskDone(String details){
        System.out.println("任务完成: " + details);
        // 警报/通知在这里
    }
}
```

我们将使用这些选项来运行我们的任务。这将清楚地表明我们正在完成相同的任务，并且每次都会从相同的回调在最后收到一个提醒。

## 3. _Runnable_ 实现

**我们将看到的第一个例子是_Runnable_接口的简单实现。** 我们可以通过构造函数提供我们的任务和回调，然后在重写的_run()_方法中调用它们：

```java
class RunnableImpl implements Runnable {
    Runnable task;
    CallbackInterface callback;
    String taskDoneMessage;

    RunnableImpl(Runnable task, CallbackInterface callback, String taskDoneMessage) {
        this.task = task;
        this.callback = callback;
        this.taskDoneMessage = taskDoneMessage;
    }

    void run() {
        task.run();
        callback.taskDone(taskDoneMessage);
    }
}
```

我们这里的设置运行了我们提供的的任务，然后在任务完成后调用了我们的回调方法。我们可以看到这在测试中的运行情况：

```java
@Test
void whenImplementingRunnable_thenReceiveNotificationOfCompletedTask() {
    Task task = new Task();
    Callback callback = new Callback();
    RunnableImpl runnableImpl = new RunnableImpl(task, callback, "准备进行下一个任务");
    runnableImpl.run();
}
```

如果我们检查这个测试的日志，我们会看到我们期望的两条消息：

```
任务进行中
任务完成 准备进行下一个任务
```

当然，在真正的应用程序中，我们会拥有业务逻辑和真实的提醒。

## 4. 使用 _CompletableFuture_

**也许最简单的异步运行任务并在完成后收到提醒的选项是使用_CompletableFuture_类。**

_CompletableFuture_是在Java 8中引入的，是_Future_接口的一个实现。它允许我们按顺序执行多个任务，每个任务在前一个_Future_完成后运行。这对我们来说很棒，因为我们可以运行我们的任务，并指示_CompletableFuture_在完成后运行我们的回调方法。

将这个计划付诸行动，我们首先可以使用_CompletableFuture_的_runAsync()_方法。这个方法接受一个_Runnable_并为我们运行它，返回一个_CompletableFuture_实例。然后我们可以链式调用_thenAccept()_方法，将我们的_Callback.taskDone()_方法作为参数，这将在我们的任务完成后被调用：

```java
@Test
void whenUsingCompletableFuture_thenReceiveNotificationOfCompletedTask() {
    Task task = new Task();
    Callback callback = new Callback();
    CompletableFuture.runAsync(task)
      .thenAccept(result -> callback.taskDone("完成细节: " + result));
}
```

运行这个将按预期产生任务的输出，然后是我们的_Callback_实现。我们的任务没有返回任何东西，所以_result_是_null_，但根据我们的用例，我们可以不同地处理它。

## 5. 扩展 _ThreadPoolExecutor_

对于一些用例，我们可能需要使用_ThreadPoolExecutor_，例如，如果我们要一次性提交许多任务。_ThreadPoolExecutor_允许我们使用我们在实例化时指定的线程数量来执行我们需要的任何任务。

**我们可以扩展_ThreadPoolExecutor_类并覆盖_afterExecute()_方法，以便在每个任务后调用我们的_Callback_实现：**

```java
class AlertingThreadPoolExecutor extends ThreadPoolExecutor {
    CallbackInterface callback;
    public AlertingThreadPoolExecutor(CallbackInterface callback) {
        super(1, 1, 60, TimeUnit.SECONDS, new ArrayBlockingQueue`<Runnable>`(10));
        this.callback = callback;
    }
    @Override
    protected void afterExecute(Runnable r, Throwable t) {
        super.afterExecute(r, t);
        callback.taskDone("可执行任务的详细信息在这里");
    }
}
```

在我们的构造函数中，我们使用硬编码的值调用了超类构造函数，为我们提供了一个线程来使用。我们还设置了空闲线程的存活时间为_60_秒，并给出了一个可以容纳_10_个任务的队列。我们可以针对特定的应用程序进行微调，但对于一个简单的示例，这就是我们所需要的。运行时，正如预期的那样，给出了以下输出：

```
任务进行中
任务完成 可执行任务的详细信息在这里
```

## 6. 扩展 _FutureTask_

我们的最后一个选择是扩展_FutureTask_类。**_FutureTask_是_Future_接口的另一个实现。它还实现了_Runnable_，这意味着我们可以将它的实例提交给_ExecutorService_。** 这个类提供了一个我们可以重写的方法_called_，它将在提供的_Runnable_完成后被调用。

考虑到这一点，我们在这里需要做的全部就是扩展_FutureTask_，重写_called_方法，并通过构造函数传递我们的_Callback_实现：

```java
class AlertingFutureTask extends FutureTask``<String>`` {
    CallbackInterface callback;
    public AlertingFutureTask(Runnable runnable, Callback callback) {
        super(runnable, null);
        this.callback = callback;
    }
    @Override
    protected void done() {
        callback.taskDone("警报警报");
    }
}
```

我们可以通过创建它的一个实例和一个_ExecutorService_的实例来使用这个_FutureTask_的扩展。然后我们将我们的_FutureTask_提交给_ExecutorService_：

```java
@Test
void whenUsingFutureTask_thenReceiveNotificationOfCompletedTask(){
    Task task = new Task();
    Callback callback = new Callback();
    FutureTask``<String>`` future = new AlertingFutureTask(task, callback);
    ExecutorService executor = Executors.newSingleThreadExecutor();
    executor.submit(future);
}
```

那个测试的输出正如预期的那样——任务首先记录，然后是我们的回调实现记录：

```
任务进行中
任务完成: 任务详情在这里
```

## 7. 结论

在本文中，我们探讨了四种异步运行相同任务，然后接收指示其完成的提醒的方式。其中三种选项涉及扩展或实现现有的Java类或接口。这些是_Runnable_接口和_ThreadPoolExecutor_和_FutureTask_类。每种选项都为我们提供了高度的控制和大量选项，以获得我们想要的提醒行为。

最后一个选项是使用_CompletableFuture_，这更加简洁。我们不需要单独的类，我们可以在一两行中完成所有操作。对于简单的用例或者当我们的所有内容都很好地包装在我们的_Callback_和_Task_类中时，这种方法做得很好。

如往常一样，示例的完整代码可以在GitHub上找到。