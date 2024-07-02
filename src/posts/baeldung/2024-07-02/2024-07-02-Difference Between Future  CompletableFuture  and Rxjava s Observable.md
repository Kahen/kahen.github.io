---
date: 2022-04-01
category:
  - Java
  - RxJava
tag:
  - Future
  - CompletableFuture
  - Observable
head:
  - - meta
    - name: keywords
      content: Java, CompletableFuture, Future, RxJava, Observable, 异步编程
---
# Java 中的 Future、CompletableFuture 和 RxJava 的 Observable 之间的区别

在 Java 中，我们有几种方式可以异步运行任务。Java 本身内置了 `Future` 和 `CompletableFuture`。我们还可以使用 RxJava 库，它提供了 `Observable` 类。在本文中，我们将探讨这三种方式的区别以及每种方式的优缺点和潜在用例。

`Future` 接口首次出现在 Java 5 中，并且功能非常有限。一个 `Future` 的实例是一个异步进程将产生的结果的占位符，可能尚未可用。提供了一小系列方法来帮助这个过程。我们可以取消一个任务或从已完成的任务中获取结果，还可以检查任务是否已被取消或完成。

让我们通过创建一个示例异步任务来实际演示。我们将有一个对象和一个 `Callable`，它的行为就像是从数据库中检索该对象。我们的对象可以非常简单：

```java
class TestObject {
    int dataPointOne;
    int dataPointTwo;
    TestObject() {
        dataPointOne = 10;
    }
    // 标准 getter 和 setter
}
```

调用构造函数时，我们返回一个设置了其中一个数据点的 `TestObject` 实例。现在我们可以创建第二个类实现 `Callable` 接口来为我们创建该对象：

```java
class ObjectCallable implements Callable`````<TestObject>````` {
    @Override
    TestObject call() {
        return new TestObject();
    }
}
```

有了这两个对象的设置，我们可以编写一个测试来使用 `Future` 获取 `TestObject`：

```java
@Test
void whenRetrievingObjectWithBasicFuture_thenExpectOnlySingleDataPointSet() throws ExecutionException, InterruptedException {
    ExecutorService exec = Executors.newSingleThreadExecutor();
    Future`````<TestObject>````` future = exec.submit(new ObjectCallable());
    TestObject retrievedObject = future.get();
    assertEquals(10, retrievedObject.getDataPointOne());
    assertEquals(0, retrievedObject.getDataPointTwo());
}
```

在这里，我们创建了一个 `ExecutorService`，我们可以向其中提交任务。接下来，我们提交了我们的 `ObjectCallable` 类，并得到了一个 `Future` 作为返回。最后，我们可以调用 `Future` 上的 `get()` 来获取结果。从断言中我们可以看到，我们得到了一个只填充了一个数据点的对象。

## 3. `CompletableFuture`

`CompletableFuture` 是 `Future` 接口的一个实现，它在 Java 8 中发布。它扩展了 `Future` 的基本功能，让我们可以对我们的异步操作结果有更多的控制。增加的一个最重要的功能是可以选择将函数调用链到初始任务的结果上。让我们通过重复上一节中的任务来实际演示这一点。但这次，我们希望在检索后填充对象。让我们创建一个具有填充方法的对象，以填充 `TestObject` 中的第二个数据点：

```java
class ObjectHydrator {
    TestObject hydrateTestObject(TestObject testObject){
        testObject.setDataPointTwo(20);
        return testObject;
    }
}
```

我们还需要从 `Supplier` 的实现中检索我们的初始 TestObject：

```java
class ObjectSupplier implements Supplier`````<TestObject>````` {
    @Override
    TestObject get() {
        return new TestObject();
    }
}
```

有了这两个类，让我们将它们投入使用：

```java
@Test
void givenACompletableFuture_whenHydratingObjectAfterRetrieval_thenExpectBothDataPointsSet() throws ExecutionException, InterruptedException {
    ExecutorService exec = Executors.newSingleThreadExecutor();
    ObjectHydrator objectHydrator = new ObjectHydrator();
    CompletableFuture`````<TestObject>````` future = CompletableFuture.supplyAsync(new ObjectSupplier(), exec)
      .thenApply(objectHydrator::hydrateTestObject);
    TestObject retrievedObject = future.get();
    assertEquals(10, retrievedObject.getDataPointOne());
    assertEquals(20, retrievedObject.getDataPointTwo());
}
```

这次我们从断言中看到，由于能够链式调用填充方法，我们的两个数据点都已设置。

## 4. RxJava 的 `Observable`

RxJava 是一个库，它允许我们按照响应式编程范式构建事件驱动和异步程序。

要在项目中使用 RxJava，我们需要将其导入到我们的 pom.xml 中：

```xml
`<dependency>`
    `<groupId>`io.reactivex.rxjava3`</groupId>`
    `<artifactId>`rxjava`</artifactId>`
    `<version>`3.1.6`</version>`
`</dependency>`
```

最新版本可在 Maven 仓库中找到。

这个库可以做很多事情，但今天，我们将专注于 `Observable` 类。一个 `Observable` 向 `Observer` 提供数据，无论是按需还是数据可用时。要像我们使用 `Future` 和 `CompletableFuture` 那样异步运行任务，我们可以创建一个 `Observable`，当请求时，它将从异步源产生数据：

```java
@Test
void givenAnObservable_whenRequestingData_thenItIsRetrieved() {
    ObjectHydrator objectHydrator = new ObjectHydrator();
    Observable`````<TestObject>````` observable = Observable.fromCallable(new ObjectCallable()).map(objectHydrator::hydrateTestObject);
    observable.subscribe(System.out::println);
}
```

在这里，我们从我们的 `ObjectCallable` 类创建了一个 `Observable`，并使用 `map()` 应用了我们的填充器。然后我们订阅了 `Observable` 并提供了一个处理结果的方法。在我们的例子中，我们只是简单地将结果记录了出来。这与我们的 `CompletableFuture` 实现具有完全相同的最终结果。`subscribe()` 方法的作用与 `CompletableFutures` 的 `get()` 相同。

虽然我们显然可以使用 RxJava 达到与 `CompletableFuture` 相同的目的，但我们还注意到它是一个提供大量其他功能的广泛库。一个例子是，我们可以以完全不同的方式执行相同的任务。我们可以创建一个 `Observable`，它将等待数据到达，然后数据可以从其他地方推送给它：

```java
@Test
void givenAnObservable_whenPushedData_thenItIsReceived() {
    PublishSubject``<Integer>`` source = PublishSubject.create();
    Observable``<Integer>`` observable = source.observeOn(Schedulers.computation());
    observable.subscribe(System.out::println, (throwable) -> System.out.println("Error"), () -> System.out.println("Done"));

    source.onNext(1);
    source.onNext(2);
    source.onNext(3);
    source.onComplete();
}
```

当运行这个测试时，它产生了以下输出：

```
1
2
3
Done
```

所以我们能够订阅一个尚未产生任何内容的数据源，并且简单地等待。一旦数据准备好，我们使用 `onNext()` 将其推送到源上，并通过我们的订阅得到通知。这是 RxJava 允许的响应式编程风格的一个例子。我们对事件和新数据做出反应，这些数据是由外部源推送给我们的，而不是我们自己请求的。

## 5. 结论

在本文中，我们看到了早期 Java 中的 `Future` 接口允许我们以有限但有用的方式异步执行任务并稍后获取结果。接下来，我们探讨了较新的实现 `CompletableFuture` 带来的优势。这使我们能够串联方法调用，并提供对整个过程的更大控制。

最后，我们看到我们可以用 RxJava 完成相同的工作，但我们也注意到它是一个广泛的库，允许我们做更多的事情。我们简要地看了如何使用 RxJava 异步推送任务到 `Observer`，同时无限期地订阅数据流。

如往常一样，示例的完整代码可以在 GitHub 上找到。