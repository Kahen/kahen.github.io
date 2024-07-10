---
date: 2023-01-28
category:
  - Java
  - Concurrency
tag:
  - Java 19
  - Structured Concurrency
head:
  - - meta
    - name: keywords
      content: Java, Concurrency, Java 19, Structured Concurrency
---
# Java 19中的结构化并发 | Baeldung

## 1. 概述

在本教程中，我们将讨论孵化器特性结构化并发（JEP 428），它为Java 19提供了结构化并发的能力。我们将指导您使用新的API来管理多线程代码。

## 2. 理念

通过采用减少线程泄漏和取消延迟可能性的并发编程风格，增强多线程代码的可维护性、可靠性和可观察性，这些是与取消和关闭相关的常见风险。为了更好地理解非结构化并发的问题，让我们看一个例子：

```java
Future``<Shelter>`` shelter;
Future`<List```<Dog>````> dogs;
try (ExecutorService executorService = Executors.newFixedThreadPool(3)) {
    shelter = executorService.submit(this::getShelter);
    dogs = executorService.submit(this::getDogs);
    Shelter theShelter = shelter.get();   // 等待shelter
    List```<Dog>``` theDogs = dogs.get();  // 等待dogs
    Response response = new Response(theShelter, theDogs);
} catch (ExecutionException | InterruptedException e) {
    throw new RuntimeException(e);
}
```

当`getShelter()`正在运行时，代码不会注意到如果`getDogs()`可能失败，并且由于阻塞的`shelter.get()`调用，它将不必要地继续运行。结果，在`getShelter()`完成并且`getDogs()`返回后，`dogs.get()`将抛出异常，我们的代码将失败：

![img](https://www.baeldung.com/wp-content/uploads/2023/01/img_63d318d9898a0.svg)

但这并不是唯一的问题。当执行我们代码的线程被中断时，它不会将中断传播到我们的子任务。此外，如果首先执行的子任务shelter抛出异常，它将不会被委托给dogs的子任务，并且它将继续运行，浪费资源。

结构化并发试图在下一章中解决这些问题。

## 3. 示例

对于我们的结构化并发示例，我们将使用以下记录：

```java
record Shelter(String name) { }

record Dog(String name) { }

record Response(Shelter shelter, List```<Dog>``` dogs) { }
```

我们还将提供两个方法。一个用于获取`Shelter`：

```java
private Shelter getShelter() {
    return new Shelter("Shelter");
}
```

另一个用于检索`Dog`元素列表：

```java
private List```<Dog>``` getDogs() {
    return List.of(new Dog("Buddy"), new Dog("Simba"));
}
```

由于结构化并发是一个孵化器特性，我们必须使用以下参数运行我们的应用程序：

```shell
--enable-preview --add-modules jdk.incubator.foreign
```

否则，我们可以添加一个`module-info.java`并标记包为必需的。

让我们来检查一个示例：

```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Future``<Shelter>`` shelter = scope.fork(this::getShelter);
    Future`<List```<Dog>````> dogs = scope.fork(this::getDogs);
    scope.join();
    Response response = new Response(shelter.resultNow(), dogs.resultNow());
    // ...
}
```

由于`StructuredTaskScope`实现了`AutoCloseable`接口，我们可以在try-with-resources语句中使用它。`StructuredTaskScope`为我们提供了两个子类，它们有不同的用途。在本教程中，我们将使用`ShutdownOnFailure()`，它在出现问题时关闭子任务。

还有一个`ShutdownOnSuccess()`构造函数，它的作用相反。它在成功时关闭子任务。这种短路模式帮助我们避免不必要的工作。

使用`StructuredTaskScope`的结构强烈类似于同步代码的结构。创建`scope`的线程是所有者的线程。`scope`允许我们在`scope`中`fork`进一步的子任务。此代码异步调用。借助`join()`方法，我们可以阻塞所有任务，直到它们提供结果。

每个任务都可以通过`scope`的`shutdown()`方法终止其他任务。`throwIfFailed(e -> new RuntimeException("ERROR_MESSAGE"))`方法提供了另一种可能性：

```java
scope.throwIfFailed(e -> new RuntimeException("ERROR_MESSAGE"));
```

它允许我们在任何`fork`失败时传播任何异常。此外，我们还可以设置一个期限与`joinUntil`：

```java
scope.joinUntil(Instant.now().plusSeconds(1));
```

如果任务在时间到期后还没有完成，这将在时间到期后抛出异常。

## 4. 结论

在本文中，我们讨论了非结构化并发的缺点以及结构化并发如何尝试解决这些问题。我们学习了如何处理错误和实现截止日期。我们还看到了新的构造如何使编写易于维护、可读和可靠的多线程代码同步变得更加容易。

像往常一样，这些示例也可以在GitHub上找到。