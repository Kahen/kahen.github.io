---
date: 2024-06-26
category:
  - Java
  - Programming
tag:
  - Java
  - Lambda
  - Lazy Initialization
head:
  - - meta
    - name: keywords
      content: Java, Lambda, Lazy Initialization, Programming
------
# Java中使用Lambda表达式进行懒加载字段初始化

1. 引言

在处理需要执行昂贵或慢速方法的资源时，例如数据库查询或REST调用，我们通常会使用本地缓存或私有字段。一般来说，lambda函数允许我们使用方法作为参数，并推迟方法的执行或完全省略它。

在本教程中，我们将展示使用lambda函数以不同方式懒加载字段初始化。

2. Lambda替代

让我们实现我们自己的解决方案的第一个版本。作为第一次迭代，我们将提供_LambdaSupplier_类：

```java
public class LambdaSupplier``````````<T>`````````` {
    protected final Supplier``````````<T>`````````` expensiveData;

    public LambdaSupplier(Supplier``````````<T>`````````` expensiveData) {
        this.expensiveData = expensiveData;
    }

    public T getData() {
        return expensiveData.get();
    }
}
```

_LambdaSupplier_通过推迟_Supplier.get()_执行实现字段的懒加载。**如果_getData()_方法被多次调用，_Supplier.get()_方法也会被多次调用。** 因此，这个类的行为与_Supplier_接口完全相同。每次调用_getData()_方法时，底层方法都会执行。

为了展示这种行为，让我们编写一个单元测试：

```java
@Test
public void whenCalledMultipleTimes_thenShouldBeCalledMultipleTimes() {
    @SuppressWarnings("unchecked") Supplier````<String>```` mockedExpensiveFunction = Mockito.mock(Supplier.class);
    Mockito.when(mockedExpensiveFunction.get())
        .thenReturn("expensive call");
    LambdaSupplier````<String>```` testee = new LambdaSupplier<>(mockedExpensiveFunction);
    Mockito.verify(mockedExpensiveFunction, Mockito.never())
        .get();
    testee.getData();
    testee.getData();
    Mockito.verify(mockedExpensiveFunction, Mockito.times(2))
        .get();
}
```

正如预期的那样，我们的测试用例验证了_Supplier.get()_函数被调用了两次。

3. 懒加载供应商

由于_LambdaSupplier_没有解决多次调用问题，我们实现的下一个版本旨在保证昂贵方法的单次执行。_LazyLambdaSupplier_在_LambdaSupplier_的实现基础上进行了扩展，通过将返回值缓存到一个私有字段中：

```java
public class LazyLambdaSupplier``````````<T>`````````` extends LambdaSupplier``````````<T>`````````` {

    private T data;

    public LazyLambdaSupplier(Supplier``````````<T>`````````` expensiveData) {
        super(expensiveData);
    }

    @Override
    public T getData() {
        if (data != null) {
            return data;
        }
        return data = expensiveData.get();
    }

}
```

这种实现将返回值存储到私有字段_data_中，以便在连续调用中重用该值。

以下测试用例验证了新实现在顺序调用时不会进行多次调用：

```java
@Test
public void whenCalledMultipleTimes_thenShouldBeCalledOnlyOnce() {
    @SuppressWarnings("unchecked") Supplier````<String>```` mockedExpensiveFunction = Mockito.mock(Supplier.class);
    Mockito.when(mockedExpensiveFunction.get())
        .thenReturn("expensive call");
    LazyLambdaSupplier````<String>```` testee = new LazyLambdaSupplier<>(mockedExpensiveFunction);
    Mockito.verify(mockedExpensiveFunction, Mockito.never())
        .get();
    testee.getData();
    testee.getData();
    Mockito.verify(mockedExpensiveFunction, Mockito.times(1))
        .get();
}
```

基本上，这个测试用例的模板与我们之前的测试用例相同。重要的不同之处在于，在第二种情况下，我们验证了模拟函数只被调用了一次。

**为了展示这个解决方案不是线程安全的，让我们编写一个并发执行的测试用例**：

```java
@Test
public void whenCalledMultipleTimesConcurrently_thenShouldBeCalledMultipleTimes() throws InterruptedException {
    @SuppressWarnings("unchecked") Supplier mockedExpensiveFunction = Mockito.mock(Supplier.class);
    Mockito.when(mockedExpensiveFunction.get())
        .thenAnswer((Answer) invocation -> {
            Thread.sleep(1000L);
            return "Late response!";
        });
    LazyLambdaSupplier testee = new LazyLambdaSupplier<>(mockedExpensiveFunction);
    Mockito.verify(mockedExpensiveFunction, Mockito.never())
        .get();

    ExecutorService executorService = Executors.newFixedThreadPool(4);
    executorService.invokeAll(List.of(testee::getData, testee::getData));
    executorService.shutdown();
    if (!executorService.awaitTermination(5, TimeUnit.SECONDS)) {
        executorService.shutdownNow();
    }

    Mockito.verify(mockedExpensiveFunction, Mockito.times(2))
        .get();
}
```

在上面的测试中，《Supplier.get()_函数被调用了两次。为了实现这一点，_ExecutorService_同时调用两个线程，调用_LazyLambdaSupplier.getData()_函数。此外，我们在_mockedExpensiveFunction_中添加的_Thread.sleep()_调用确保了当两个线程都调用_getData()_函数时，字段_data_仍然是_null_。

4. 线程安全解决方案

最后，让我们解决我们上面演示的线程安全限制。为此，我们需要使用同步数据访问和线程安全值包装器，即_AtomicReference_。

让我们结合到目前为止学到的知识来编写_LazyLambdaThreadSafeSupplier_：

```java
public class LazyLambdaThreadSafeSupplier``````````<T>`````````` extends LambdaSupplier``````````<T>`````````` {

    private final AtomicReference``````````<T>`````````` data;

    public LazyLambdaThreadSafeSupplier(Supplier``````````<T>`````````` expensiveData) {
        super(expensiveData);
        data = new AtomicReference<>();
    }

    public T getData() {
        if (data.get() == null) {
            synchronized (data) {
                if (data.get() == null) {
                    data.set(expensiveData.get());
                }
            }
        }
        return data.get();
    }

}
```

为了解释这种方法为什么是线程安全的，我们需要想象多个线程同时调用_getData()_方法。线程确实会被阻塞，执行将按顺序进行，直到_data.get()_调用不是null。一旦_data_字段初始化完成，那么多个线程就可以并发访问它。

乍一看，有人可能会认为_getData()_方法中的双重null检查是多余的，但它不是。**实际上，外部null检查确保当_data.get()_不是null时，线程不会阻塞在同步块上。**

为了验证我们的实现是线程安全的，让我们以与之前解决方案相同的方式提供一个单元测试：

```java
@Test
public void whenCalledMultipleTimesConcurrently_thenShouldBeCalledOnlyOnce() throws InterruptedException {
    @SuppressWarnings("unchecked") Supplier mockedExpensiveFunction = Mockito.mock(Supplier.class);
    Mockito.when(mockedExpensiveFunction.get())
        .thenAnswer((Answer) invocation -> {
            Thread.sleep(1000L);
            return "Late response!";
        });
    LazyLambdaThreadSafeSupplier testee = new LazyLambdaThreadSafeSupplier<>(mockedExpensiveFunction);
    Mockito.verify(mockedExpensiveFunction, Mockito.never())
        .get();

    ExecutorService executorService = Executors.newFixedThreadPool(4);
    executorService.invokeAll(List.of(testee::getData, testee::getData));
    executorService.shutdown();
    if (!executorService.awaitTermination(5, TimeUnit.SECONDS)) {
        executorService.shutdownNow();
    }

    Mockito.verify(mockedExpensiveFunction, Mockito.times(1))
        .get();
}
```

5. 结论

在本文中，我们展示了使用lambda函数懒加载字段的不同方式。通过这种方法，我们可以避免多次执行昂贵的调用，也可以推迟它们。我们的例子可以作为本地缓存或Project Lombok的lazy-getter的替代品。

和往常一样，我们例子的源代码可以在GitHub上找到。
OK