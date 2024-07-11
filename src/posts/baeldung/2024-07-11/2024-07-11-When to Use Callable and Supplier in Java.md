---
date: 2022-04-01
category:
  - Java
  - Concurrency
tag:
  - Callable
  - Supplier
head:
  - - meta
    - name: keywords
      content: Java Callable, Java Supplier, 异步任务, 函数式接口
---
# Java中何时使用Callable和Supplier

在本教程中，我们将讨论Callable和Supplier这两个函数式接口，它们在结构上相似但在使用上有所不同。

Callable和Supplier都返回一个类型化的值，并且不接受任何参数。执行上下文是区分它们的标准。

在本教程中，我们将重点关注异步任务的上下文。

## 2. 模型

在我们开始之前，让我们定义一个类：

```java
public class User {
    private String name;
    private String surname;
    private LocalDate birthDate;
    private Integer age;
    private Boolean canDriveACar = false;

    // 标准的构造函数、getter和setter
}
```

Callable是在Java版本5中引入的接口，并在版本8中发展为函数式接口。

**它的SAM（单一抽象方法）是call()方法，它返回一个泛型值并可能抛出异常：**

```java
V call() throws Exception;
```

它被设计为封装应该由另一个线程执行的任务，例如Runnable接口。这是因为Callable实例可以通过ExecutorService执行。

那么让我们定义一个实现：

```java
public class AgeCalculatorCallable implements Callable``````<Integer>`````` {
    private final LocalDate birthDate;

    @Override
    public Integer call() throws Exception {
        return Period.between(birthDate, LocalDate.now()).getYears();
    }

    // 标准的构造函数、getter和setter
}
```

当call()方法返回一个值时，主线程检索它以执行其逻辑。为此，我们可以使用Future，这是一个跟踪并在另一个线程执行的任务完成后获取值的对象。

### 3.1. 单一任务

让我们定义一个只执行一个异步任务的方法：

```java
public User execute(User user) {
    ExecutorService executorService = Executors.newCachedThreadPool();
    try {
        Future``````<Integer>`````` ageFuture = executorService.submit(new AgeCalculatorCallable(user.getBirthDate()));
        user.setAge(ageFuture.get());
    } catch (ExecutionException | InterruptedException e) {
        throw new RuntimeException(e.getCause());
    }
    return user;
}
```

我们可以通过lambda表达式重写submit()的内部块：

```java
Future``````<Integer>`````` ageFuture = executorService.submit(
  () -> Period.between(user.getBirthDate(), LocalDate.now()).getYears());
```

当我们尝试通过调用get()方法访问返回值时，我们必须处理两个检查异常：

- InterruptedException：在线程睡眠、活跃或占用时发生中断时抛出
- ExecutionException：当任务因抛出异常而中止时抛出。换句话说，它是一个包装异常，中止任务的真实异常是原因（可以使用getCause()方法进行检查）。

### 3.2. 任务链

执行属于链的任务取决于之前任务的状态。如果其中一个失败，当前任务无法执行。

那么让我们定义一个新的Callable：

```java
public class CarDriverValidatorCallable implements Callable```<Boolean>``` {
    private final Integer age;

    @Override
    public Boolean call() throws Exception {
        return age > 18;
    }
    // 标准的构造函数、getter和setter
}
```

接下来，让我们定义一个任务链，其中第二个任务的输入参数是前一个任务的结果：

```java
public User execute(User user) {
    ExecutorService executorService = Executors.newCachedThreadPool();
    try {
        Future``````<Integer>`````` ageFuture = executorService.submit(new AgeCalculatorCallable(user.getBirthDate()));
        Integer age = ageFuture.get();
        Future```<Boolean>``` canDriveACarFuture = executorService.submit(new CarDriverValidatorCallable(age));
        Boolean canDriveACar = canDriveACarFuture.get();
        user.setAge(age);
        user.setCanDriveACar(canDriveACar);
    } catch (ExecutionException | InterruptedException e) {
        throw new RuntimeException(e.getCause());
    }
    return user;
}
```

在任务链中使用Callable和Future存在一些问题：

- 链中的每个任务都遵循“submit-get”模式。在长链中，这会产生冗长的代码。
- 当链对任务失败宽容时，我们应该创建一个专门的try/catch块。
- 当调用get()方法时，它将等待Callable返回值。因此，链的总执行时间等于所有任务执行时间的总和。但如果下一个任务仅依赖于正确执行的一个先前任务，链过程将显著减慢。

## 4. Supplier

Supplier是一个函数式接口，其SAM（单一抽象方法）是get()。

**它不接受任何参数，返回一个值，并且只抛出未检查的异常：**

```java
T get();
```

这个接口最常见的用例之一是延迟执行一些代码。

Optional类有一些方法接受Supplier作为参数，例如Optional.or()，Optional.orElseGet()。

因此，Supplier仅在Optional为空时执行。

我们还可以在异步计算上下文中使用它，特别是在CompletableFuture API中。

一些方法接受Supplier作为参数，例如supplyAsync()方法。

### 4.1. 单一任务

让我们定义一个只执行一个异步任务的方法：

```java
public User execute(User user) {
    ExecutorService executorService = Executors.newCachedThreadPool();
    CompletableFuture``````<Integer>`````` ageFut = CompletableFuture.supplyAsync(
        () -> Period.between(user.getBirthDate(), LocalDate.now()).getYears(), executorService)
        .exceptionally(throwable -> {throw new RuntimeException(throwable);});
    user.setAge(ageFut.join());
    return user;
}
```

在这种情况下，lambda表达式定义了Supplier，但我们也可以定义一个实现类。多亏了CompletableFuture，我们定义了一个异步操作的模板，使其更易于理解和修改。

join()方法提供了Supplier的返回值。

### 4.2. 任务链

我们也可以在Supplier接口和CompletableFuture的支持下开发任务链：

```java
public User execute(User user) {
    ExecutorService executorService = Executors.newCachedThreadPool();
    CompletableFuture``````<Integer>`````` ageFut = CompletableFuture.supplyAsync(
        () -> Period.between(user.getBirthDate(), LocalDate.now()).getYears(), executorService);
    CompletableFuture```<Boolean>``` canDriveACarFut = ageFut.thenComposeAsync(
        age -> CompletableFuture.supplyAsync(() -> age > 18, executorService))
        .exceptionally((ex) -> false);
    user.setAge(ageFut.join());
    user.setCanDriveACar(canDriveACarFut.join());
    return user;
}
```

使用CompletableFuture-Supplier方法定义异步任务链可能解决了之前使用Future-Callable方法引入的一些问题：

- 链中的每个任务都是隔离的。因此，如果任务执行失败，我们可以通过exceptionally()块处理它。
- join()方法不需要在编译时处理检查异常。
- 我们可以设计一个异步任务模板，改进每个任务的状态处理。

## 5. 结论

在本文中，我们讨论了Callable和Supplier接口之间的区别，重点关注了异步任务的上下文。

**在接口设计层面的主要区别是Callable抛出的检查异常。**

Callable并不是为了函数式上下文而设计的。它是随着时间的推移逐渐适应的，函数式编程和检查异常并不兼容。

因此，任何函数式API（如CompletableFuture API）总是接受Supplier而不是Callable。

如常，示例的完整源代码可以在GitHub上找到。