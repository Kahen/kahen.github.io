---
date: 2022-04-01
category:
  - Java
  - Guava
tag:
  - ListenableFuture
  - Futures
head:
  - - meta
    - name: keywords
      content: Guava Futures, ListenableFuture, Java 异步编程
------
# Guava的Futures和ListenableFuture

Guava为我们提供了ListenableFuture，它是一个比Java默认的Future拥有更丰富的API。让我们看看如何利用这一点。

让我们简单了解一下这些不同的类以及它们之间的关系。

### 2.1 Future
从Java 5开始，我们可以使用java.util.concurrent.Future来表示异步任务。

Future允许我们访问已经完成或将来可能完成的任务的结果，同时支持取消它们。

### 2.2 ListenableFuture
使用java.util.concurrent.Future的一个不足之处是它不能添加在完成时运行的侦听器，这是大多数流行的异步框架提供的常见特性。

**Guava通过允许我们在其com.google.common.util.concurrent.ListenableFuture上附加侦听器来解决这个问题。**

### 2.3 Futures
Guava提供了便利类com.google.common.util.concurrent.Futures，使它更容易使用他们的ListenableFuture。

这个类提供了与ListenableFuture交互的多种方式，其中包括支持添加成功/失败回调以及允许我们使用聚合或转换来协调多个Future。

## 3 简单用法
现在让我们看看如何以最简单的方式使用ListenableFuture；创建和添加回调。

### 3.1 创建ListenableFuture
**我们可以获得ListenableFuture的最简单方式是将任务提交给ListeningExecutorService**（就像我们使用普通的ExecutorService来获得普通的Future一样）：

```java
ExecutorService execService = Executors.newSingleThreadExecutor();
ListeningExecutorService lExecService = MoreExecutors.listeningDecorator(execService);

ListenableFuture```````<Integer>``````` asyncTask = lExecService.submit(() -> {
    TimeUnit.MILLISECONDS.sleep(500); // 长时间运行的任务
    return 5;
});
```

注意我们如何使用MoreExecutors类将我们的ExecutorService装饰为ListeningExecutorService。我们可以在Guava的线程池实现中了解更多关于MoreExecutors的信息。

如果我们已经有了一个返回Future的API，我们需要将其转换为ListenableFuture，这可以通过初始化其具体实现ListenableFutureTask来轻松完成：

```java
// 旧API
public FutureTask``````````````````<String>`````````````````` fetchConfigTask(String configKey) {
    return new FutureTask<>(() -> {
        TimeUnit.MILLISECONDS.sleep(500);
        return String.format("%s.%d", configKey, new Random().nextInt(Integer.MAX_VALUE));
    });
}

// 新API
public ListenableFutureTask``````````````````<String>`````````````````` fetchConfigListenableTask(String configKey) {
    return ListenableFutureTask.create(() -> {
        TimeUnit.MILLISECONDS.sleep(500);
        return String.format("%s.%d", configKey, new Random().nextInt(Integer.MAX_VALUE));
    });
}
```

我们需要意识到，除非我们将它们提交给Executor，否则这些任务不会运行。**直接与ListenableFutureTask交互不是常见的用法，只在少数场景中进行（例如：实现我们自己的ExecutorService）**。请参阅Guava的_AbstractListeningExecutorService以了解实际用法。

我们还可以使用com.google.common.util.concurrent.SettableFuture，如果我们的异步任务不能使用ListeningExecutorService或提供的Futures实用方法，我们需要手动设置未来的值。对于更复杂的用法，我们还可以考虑com.google.common.util.concurrent.AbstractFuture。

### 3.2 添加侦听器/回调
我们可以通过使用Futures.addCallback()注册回调来**向ListenableFuture添加一个侦听器**，这让我们在成功或失败时访问结果或异常：

```java
Executor listeningExecutor = Executors.newSingleThreadExecutor();

ListenableFuture```````<Integer>``````` asyncTask = new ListenableFutureService().succeedingTask()
Futures.addCallback(asyncTask, new FutureCallback```````<Integer>```````() {
    @Override
    public void onSuccess(Integer result) {
        // 操作成功
    }

    @Override
    public void onFailure(Throwable t) {
        // 操作失败
    }
}, listeningExecutor);
```

我们也可以通过直接将其添加到ListenableFuture上**添加一个侦听器**。注意，这个侦听器将在future成功或异常完成时运行。同样注意，我们没有访问异步任务的结果：

```java
Executor listeningExecutor = Executors.newSingleThreadExecutor();

int nextTask = 1;
Set```````<Integer>``````` runningTasks = ConcurrentHashMap.newKeySet();
runningTasks.add(nextTask);

ListenableFuture```````<Integer>``````` asyncTask = new ListenableFutureService().succeedingTask()
asyncTask.addListener(() -> runningTasks.remove(nextTask), listeningExecutor);
```

## 4 复杂用法
现在让我们看看如何在更复杂的情况下使用这些futures。

### 4.1 扇入
有时我们需要调用多个异步任务并收集它们的结果，通常称为扇入操作。

Guava提供了两种方法来实现这一点。然而，我们需要根据我们的要求谨慎选择正确的方法。让我们假设我们需要协调以下异步任务：

```java
ListenableFuture``````````````````<String>`````````````````` task1 = service.fetchConfig("config.0");
ListenableFuture``````````````````<String>`````````````````` task2 = service.fetchConfig("config.1");
ListenableFuture``````````````````<String>`````````````````` task3 = service.fetchConfig("config.2");
```

**一种扇入多个futures的方法是使用Futures.allAsList()方法。这允许我们在所有futures都成功时收集它们的结果**，按照提供的futures的顺序。如果任何一个future失败，那么整个结果就是一个失败的future：

```java
ListenableFuture<List``````````````````<String>``````````````````> configsTask = Futures.allAsList(task1, task2, task3);
Futures.addCallback(configsTask, new FutureCallback<List``````````````````<String>``````````````````>() {
    @Override
    public void onSuccess(@Nullable List``````````````````<String>`````````````````` configResults) {
        // 所有futures成功时操作
    }

    @Override
    public void onFailure(Throwable t) {
        // 至少一个失败时处理
    }
}, someExecutor);
```

**如果我们需要收集所有异步任务的结果，不管它们是否失败，我们可以使用Futures.successfulAsList()**。这将返回一个列表，其结果将与传入参数的任务顺序相同，失败的任务将在列表的相应位置分配_null_：

```java
ListenableFuture<List``````````````````<String>``````````````````> configsTask = Futures.successfulAsList(task1, task2, task3);
Futures.addCallback(configsTask, new FutureCallback<List``````````````````<String>``````````````````>() {
    @Override
    public void onSuccess(@Nullable List``````````````````<String>`````````````````` configResults) {
        // 处理结果。如果task2失败，则configResults.get(1) == null
    }

    @Override
    public void onFailure(Throwable t) {
        // 处理失败
    }
}, listeningExecutor);
```

我们应该在上述用法中注意，**如果future任务通常在成功时返回_null_，它将无法与失败的任务（也将结果设置为_null_）区分开来。**

### 4.2 使用组合器的扇入
如果我们有一个要求协调多个返回不同结果的futures，上述解决方案可能不够用。在这种情况下，我们可以使用扇入操作的组合器变体来协调这种混合的futures。

与简单的扇入操作类似，**Guava提供了两种变体；一种在所有任务成功完成时成功，一种即使有些任务失败也成功的使用Futures.whenAllSucceed()和Futures.whenAllComplete()方法。**

让我们看看如何使用Futures.whenAllSucceed()将来自多个futures的不同结果类型组合起来：

```java
ListenableFuture```````<Integer>``````` cartIdTask = service.getCartId();
ListenableFuture``````````````````<String>`````````````````` customerNameTask = service.getCustomerName();
ListenableFuture<List``````````````````<String>``````````````````> cartItemsTask = service.getCartItems();

ListenableFuture``<CartInfo>`` cartInfoTask = Futures.whenAllSucceed(cartIdTask, customerNameTask, cartItemsTask)
    .call(() -> {
        int cartId = Futures.getDone(cartIdTask);
        String customerName = Futures.getDone(customerNameTask);
        List``````````````````<String>`````````````````` cartItems = Futures.getDone(cartItemsTask);
        return new CartInfo(cartId, customerName, cartItems);
    }, someExecutor);

Futures.addCallback(cartInfoTask, new FutureCallback``<CartInfo>``() {
    @Override
    public void onSuccess(@Nullable CartInfo result) {
        // 所有成功和组合成功时处理
    }

    @Override
    public void onFailure(Throwable t) {
        // 任一任务失败或组合失败时处理
    }
}, listeningExecService);
```

如果我们需要允许一些任务失败，我们可以使用Futures.whenAllComplete()。虽然语义大多与上述类似，但我们应该意识到失败的futures将在调用Futures.getDone()时抛出一个ExecutionException。

### 4.3 转换
有时我们需要在成功后转换future的结果。Guava提供了两种方法来实现这一点，使用Futures.transform()和Futures.lazyTransform()。

让我们看看如何**使用Futures.transform()转换future的结果。只要转换计算不重，就可以使用它：**

```java
ListenableFuture<List``````````````````<String>``````````````````> cartItemsTask = service.getCartItems();

Function<List``````````````````<String>``````````````````, Integer> itemCountFunc = cartItems -> {
    assertNotNull(cartItems);
    return cartItems.size();
};

ListenableFuture```````<Integer>``````` itemCountTask = Futures.transform(cartItemsTask, itemCountFunc, listenExecService);
```

**我们还可以使用Futures.lazyTransform()**将转换函数应用于java.util.concurrent.Future。我们需要记住，这个选项不返回一个ListenableFuture，但返回一个普通的java.util.concurrent.Future，并且转换函数每次在结果future的get()被调用时都会应用。

### 4.4 链式Futures
我们可能会遇到需要一个future调用另一个future的情况。在这种情况下，Guava提供了async()变体来安全地链式这些future，一个接一个地执行。

让我们看看如何**使用Futures.submitAsync()从提交的Callable中调用一个future：**

```java
AsyncCallable``````````````````<String>`````````````````` asyncConfigTask = () -> {
    ListenableFuture``````````````````<String>`````````````````` configTask = service.fetchConfig("config.a");
    TimeUnit.MILLISECONDS.sleep(500); // 一些长时间运行的任务
    return configTask;
};

ListenableFuture``````````````````<String>`````````````````` configTask = Futures.submitAsync(asyncConfigTask, executor);
```

**如果我们想要真正的链式，其中一个future的结果被输入到另一个future的计算中，我们可以使用Futures.transformAsync()：**

```java
ListenableFuture``````````````````<String>`````````````````` usernameTask = service.generateUsername("john");
AsyncFunction`<String, String>` passwordFunc = username -> {
    ListenableFuture``````````````````<String>`````````````````` generatePasswordTask = service.generatePassword(username);
    TimeUnit.MILLISECONDS.sleep(500); // 一些长时间运行的任务
    return generatePasswordTask;
};

ListenableFuture``````````````````<String>`````````````````` passwordTask = Futures.transformAsync(usernameTask, passwordFunc, executor);
```

Guava还提供了Futures.scheduleAsync()和Futures.catchingAsync()来提交一个计划任务和在错误恢复时提供回退任务。虽然它们适用于不同的场景，但我们将不讨论它们，因为它们类似于其他async()调用。

## 5. 使用注意事项
现在让我们研究一下在使用futures和提供的执行器时可能遇到的一些常见陷阱以及如何避免它们。

### 5.1 工作与侦听执行器
在使用Guava futures时，理解工作执行器和侦听执行器之间的区别非常重要。例如，假设我们有一个异步任务来获取配置：

```java
public ListenableFuture``````````````````<String>`````````````````` fetchConfig(String configKey) {
    return lExecService.submit(() -> {
        TimeUnit.MILLISECONDS.sleep(500);
        return String.format("%s.%d", configKey, new Random().nextInt(Integer.MAX_VALUE));
    });
}
```

假设我们想为上述future附加一个侦听器：

```java
ListenableFuture``````````````````<String>`````````````````` configsTask = service.fetchConfig("config.0");
Futures.addCallback(configsTask, someListener, listeningExecutor);
```

注意这里的lExecService是运行我们的异步任务的执行器，而listeningExecutor是我们的侦听器被调用的执行器。

如上所见，**我们总是要考虑将这两个执行器分开，以避免我们侦听器和工作者争夺同一线程池资源的场景。**共享同一个执行器可能会导致我们的重型任务饿死侦听器执行，或者一个写得不好的重型侦听器最终阻塞我们的重要重型任务。

### 5.2 小心使用directExecutor()
虽然我们可以使用MoreExecutors.directExecutor()和MoreExecutors.newDirectExecutorService()在单元测试中使异步执行更容易处理，但我们在生产代码中应该小心使用它们。

**当我们从上述方法获取执行器时，我们提交的任何任务，无论是重型还是侦听器，都将在当前线程上执行。如果当前执行上下文需要高吞吐量，这可能是危险的。**

例如，在UI线程中使用directExecutor并提交一个重型任务将自动阻塞我们的UI线程。

我们还可能面临一个场景，我们的侦听器最终减慢了我们所有其他侦听器的速度（即使是那些不涉及directExecutor的）。这是因为Guava在其各自的执行器中使用while循环执行所有侦听器，但directExecutor将导致侦听器在while循环的同一线程中运行。

### 5.3 嵌套Futures是不好的
在使用链式futures时，我们应该小心不要从一个future内部调用另一个future，以这种方式创建嵌套futures：

```java
public ListenableFuture``````````````````<String>`````````````````` generatePassword(String username) {
    return lExecService.submit(() -> {
        TimeUnit.MILLISECONDS.sleep(500);
        return username + "123";
    });
}

String firstName = "john";
ListenableFuture<ListenableFuture``````````````````<String>``````````````````> badTask = lExecService.submit(() -> {
    final String username = firstName.replaceAll("[^a-zA-Z]+", "")
        .concat("@service.com");
    return generatePassword(username);
});
```

**如果我们看到代码中有ListenableFuture`<ListenableFuture<V>`>，那么我们应该知道这是一个写得不好的future**，因为外部future的取消和完成可能会竞争，取消可能不会传播到内部future。

如果我们看到上述场景，我们应该总是使用Futures.async()变体来安全地以连接的方式解包这些链式futures。

### 5.4 小心使用JdkFutureAdapters.listenInPoolThread()
Guava建议我们利用其ListenableFuture的最佳方式是通过将所有使用Future的代码转换为ListenableFuture。

如果这种转换在某些场景中不可行，**Guava提供了使用JdkFutureAdapters.listenInPoolThread()覆盖的适配器来实现这一点。**虽然这看起来有帮助，**Guava警告我们这些是重型适配器，应尽可能避免使用。**

## 6. 结论
在本文中，我们已经看到了如何使用Guava的ListenableFuture来丰富我们对futures的使用，以及如何使用Futures API使它更容易与这些futures一起工作。

我们还看到了在使用这些futures和提供的执行器时可能犯的一些常见错误。

一如既往，带有我们示例的完整源代码可在GitHub上获得。