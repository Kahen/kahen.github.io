---
date: 2024-06-20
category:
  - Kotlin
  - 并行操作
tag:
  - Kotlin
  - 并行流
  - 协程
head:
  - - meta
    - name: keywords
      content: Kotlin, 并行操作, 协程, 流, RxJava, Java Stream API, ExecutorService
------
# Kotlin集合的并行操作

使用Kotlin集合的并行操作允许我们同时处理集合中的元素，利用多核处理器来提高性能。这对于计算密集型任务，如过滤、映射和数据缩减，非常有用。

在本文中，我们将讨论一些在Kotlin集合上执行并行操作的方法。

为了解释并行操作的工作原理，我们将使用以下集合：

```kotlin
data class Person(val name: String, val age: Int, var isAdult: Boolean? = null)

private val people = listOf(
  Person("Martin", 12),
  Person("Ahmad", 42),
  Person("Alina", 13),
  Person("Alice", 30),
  Person("Bob", 16),
  Person("Charlie", 40)
)
```

在我们的示例中，我们将为18岁及以上的人分配成年状态(`isAdult = true`)，对于18岁以下的人分配`isAdult = false`。

为了使并行操作更清晰，我们还将显示系统时间和线程名称（默认使用SLF4J记录器）：

```kotlin
private fun Person.setAdult(){
    this.isAdult = this.age >= 18
    logger.info(this.toString())
}

```

我们期望的输出是一个年龄超过15岁的人集合，并按年龄排序：

```kotlin
private fun List``<Person>``.assertOver15AndSortedByAge() {
    assertThat(this).containsExactly(
      Person("Bob", 16, false),
      Person("Alice", 30, true),
      Person("Charlie", 40, true),
      Person("Ahmad", 42, true)
    )
}
```

我们将使用这个扩展函数`List``<Person>``.assertOver15AndSortedByAge()`来确保我们的每个解决方案都按预期工作。

### 2.1. 使用协程

协程可以依赖于并行操作，因为它们是非阻塞的、轻量级的、灵活的，并允许我们同时运行多个任务：

```kotlin
val filteredPeople = people
  .map { person ->
      async {
          person.setAdult()
          person
      }
  }
  .awaitAll()
  .filter { it.age > 15 }
  .sortedBy { it.age }

filteredPeople.assertOver15AndSortedByAge()
```

在`people.map { person -> … }`中，我们使用`async { … }`为每个`person`对象创建了一个新的协程。

这允许协程与其他协程和主线程并发执行。

我们可以通过查看日志输出来看到每个操作都在不同的协程线程上运行：

```plaintext
13:03:44.484 [main @coroutine#1] INFO  - 使用协程
13:03:44.522 [main @coroutine#2] INFO  - Person(name=Martin, age=12, isAdult=false)
...
```

`awaitAll()`确保在`map`步骤中创建的所有异步协程都已完成。这确保了`filteredPeople`列表包含了所有并行处理的结果。

### 2.2. 使用Kotlin Flow

协程流—通常称为Kotlin Flow或简称Flow—是建立在协程之上的额外库，用于异步处理流数据。

我们可以使用`flatMapMerge()`来并行处理`Flow`中的元素：

```kotlin
val filteredPeople = people.asFlow()
  .flatMapMerge { person ->
      flow {
          emit(
            async {
                person.setAdult()
                person
            }.await()
          )
      }
  }
  .filter { it.age > 15 }
  .toList()
  .sortedBy { it.age }

filteredPeople.assertOver15AndSortedByAge()
```

代码使用`Flow`并发处理`people`数组中的每个`person`对象：

```plaintext
13:03:44.706 [main @coroutine#8] INFO  - 使用Kotlin Flow
...
```

但我们必须注意`flatMapMerge()`是Kotlin协程中的一个实验性特性，尚未稳定或可能在未来版本中更改。因此，为了使用它，我们必须添加一个注释：

```kotlin
@OptIn(ExperimentalCoroutinesApi::class)
```

像往常一样，我们可以将注释添加到类或函数中。

### 2.3. 使用RxJava或RxKotlin

RxJava是一个基于Java的反应式编程库，是反应式扩展的实现。同时，RxKotlin是RxJava的Kotlin扩展：

```kotlin
val observable = Observable.fromIterable(people)
  .flatMap(
      {
          Observable.just(it)
            .subscribeOn(Schedulers.computation())
            .doOnNext { person -> person.setAdult()}
      },
      people.size // 使用maxConcurrency定义元素的数量
  )
  .filter { it.age > 15 }
  .toList()
  .map { it.sortedBy { person -> person.age } }
  .blockingGet()

observable.assertOver15AndSortedByAge()

```

首先，我们将原始的`people`数组转换为`Observable`对象：

```kotlin
Observable.fromIterable(people)
```

然而，RxKotlin提供了一个更简洁的扩展函数作为替代：

```kotlin
people.toObservable()
```

`flatMap()`对由`Observable`发出的每个`person`应用转换。在这种情况下，它创建了一个新的`Observable`，发出相同的`person`对象。

然后，为了控制并行操作，强烈建议在`flatMap()`中显式设置`maxConcurrency`参数。这允许我们定义最大并发内`Observable`的数量，确保可预测的资源利用。

让我们在日志输出中看到每个操作在不同的线程中运行：

```plaintext
13:03:44.691 [main] INFO  - 使用RxKotlin
...
```

我们可以看到每个操作的线程名称都不同。这表明操作正在并行运行。

### 2.4. 使用Java Stream API

在Java 8中，Stream API引入了一种强大的机制，以声明性和函数式的方式处理数据集合。

我们可以使用`parallelStream()`，这是`Collection`类型（如`List`、`Set`等）的可用方法，它从`Collection`的元素创建一个并行`Stream`：

```kotlin
val filteredPeople = people.parallelStream()
  .map { person ->
      person.setAdult()
      person
  }.filter { it.age > 15 }
  .sorted { p1, p2 -> p1.age.compareTo(p2.age) }
  .collect(Collectors.toList())

filteredPeople.assertOver15AndSortedByAge()

```

当我们调用`parallelStream()`时，`Collection`的元素被划分为几个子`Stream`实例。

每个子`Stream`然后在单独的线程上并发处理：

```plaintext
13:03:44.683 [main] INFO  - 使用Stream API
...
```

最后，每个子`Stream`的结果被组合以产生`Stream`操作的最终结果。

### 2.5. 使用_ExecutorService_

现在我们将使用`ExecutorService`，这是Java中的一个接口，提供了一种异步执行任务（`Runnable`或`Callable`）的方式。

首先，我们必须创建一个线程池，其大小等于`people`元素的数量：

```kotlin
val executor = Executors.newFixedThreadPool(people.size)
```

然后我们调用`map{}`对`people`中的每个元素（`person`）应用一个lambda表达式。我们使用lambda表达式创建一个新的`Callable`对象，并将其`submit()`到`executor`：

```kotlin
val futures = people
  .map { person ->
      executor.submit(Callable {
          person.setAdult()
          person
      }).get()
  }
  .filter { it.age > 15 }
  .sortedBy { it.age }

futures.assertOver15AndSortedByAge()
```

我们可以再次检查日志，以看到使用了多个并发线程：

```plaintext
13:03:44.700 [main] INFO  - 使用ExecutorService
...
```

最后，我们将通过调用`shutdown()`来停止线程池：

```kotlin
executor.shutdown()
```

这确保了`executor`释放了它持有的资源。

## 3. 结论

在本教程中，我们讨论了在Kotlin集合上执行并行操作的各种方法。

协程和Kotlin Flow以其富有表现力的Kotlin风格可以很好地完成这项工作。如果我们想使用第三方库，RxJava或RxKotlin也是成熟可靠的选择。另外，Java也有处理此问题的相关API，如`Stream`和`ExecutorService`。

如常，示例的源代码可在GitHub上获取。