---
date: 2022-11-01
category:
  - Kotlin
  - Coroutines
tag:
  - Kotlin
  - Scheduling
  - Coroutines
head:
  - - meta
    - name: keywords
      content: Kotlin, Scheduling, Coroutines, Timer, ScheduledExecutorService
---
# Kotlin中调度重复任务

调度重复任务是编程中的常见需求。我们可能在数据更新、传感器监控和发送通知等应用程序中看到过它。

在本教程中，我们将讨论在Kotlin中执行任务的重复和在特定间隔中执行的方法。

## 2. 使用 _Timer.schedule()_

_Timer_ 是 Java 中的一个类，在 _java.util_ 包中，我们可以使用它来安排任务在一定时间后重复或仅执行一次：

```kotlin
val timer = Timer()
```

每个 _Timer_ 对象在后台线程中顺序执行其任务。任务应该尽快完成，以避免延迟后续任务。如果一个任务耗时太长，可能会导致延迟，并在任务完成后迅速连续执行任务。

要创建一个计划，我们只需调用 _schedule()_ 方法：

```kotlin
timer.schedule(object : TimerTask() {
    override fun run() {
        println("Timer ticked!")
    }
}, 0, 1000)
```

然后，Kotlin 简化为 _kotlin.concurrent.Timer.kt_：

```kotlin
timer.schedule(0L, 1000L) {
    println("Timer ticked!")
}
```

任务将继续运行，直到我们通过调用 _cancel()_ 来停止它：

```kotlin
timer.cancel()
```

## 3. 使用 _ScheduledExecutorService_

_ScheduledExecutorService_ 是 _java.util.concurrent_ API 的一部分，它允许我们**在特定时间安排和执行任务，或在特定间隔重复执行**：

```kotlin
val scheduler = Executors.newScheduledThreadPool(1)
```

它使用内部线程池来执行计划任务。这使得它比使用 _Timer_ 和 _TimerTask_ 更高效，后者只使用一个线程。

让我们看看它在实际中的应用：

```kotlin
scheduler.scheduleAtFixedRate({
    println("Complex task completed!")
}, 0, 1, TimeUnit.SECONDS)
```

这个任务将一直运行，直到我们调用 _shutdown()_ 来停止它：

```kotlin
scheduler.shutdown()
```

它是一个多才多艺的 _Timer_ 替代品，因为它允许多个服务线程，接受各种时间单位，并且不需要子类化 _TimerTask_。

## 4. 使用协程

我们还可以使用协程，它们被设计为平滑地处理异步进程。

协程也适合调度重复任务，因为它们是非阻塞的、轻量级的、灵活的，并且它们允许错误处理，而不会中断整个程序的执行。

### 4.1. 使用 _repeat()_ 和 _delay()_

_repeat()_ 函数是 Kotlin 的内置扩展函数，用于重复指定的代码块指定的次数。

与此同时，_delay()_ 是 Kotlin 协程中的一个函数，用于在不阻塞线程的情况下延迟协程的执行一定时间。

让我们看一个使用这两个函数重复任务的示例：

```kotlin
var count = 0
repeat(10) {
    count++
    println("Timer ticked! $count")
    delay(1000.milliseconds)
}

assertEquals(10, count)
```

在这里，我们使用 _repeat(10)_ 来运行任务10次。每次执行任务时，我们增加 _count_ 值并打印一条消息。

然后，我们使用 _delay(1000.milliseconds)_ 在再次执行任务之前延迟执行一秒钟。

### 4.2. 使用 _withTimeout()_

_withTimeout()_ 是 Kotlin 协程中的一个函数，我们用它来设置完成代码块的最大时间限制。

如果超时发生，它会停止执行协程代码块并抛出 _TimeoutCancellationException_。因此，我们需要用 _try-catch_ 包装它或在单元测试中使用 _assertThrows_：

```kotlin
var count = 0
assertThrows`<TimeoutCancellationException>` {
    withTimeout(5000.milliseconds) {
        while (true) {
            count++
            println("Waiting for timeout")
            delay(1000.milliseconds)
        }
    }
}

assertEquals(5, count)
```

在 _withTimeout(5000.milliseconds)_ 块内，我们运行一个循环，每秒增加 _count_ 值。

_TimeoutCancellationException_ 总是在达到超时时抛出。

## 5. 使用协程流

协程流 — 通常称为 Kotlin Flow 或简称 Flow — 是构建在协程之上的额外库，用于异步处理流数据。

与 _Channel_ 相比，_Flow_ 是冷的，因为它**本身不持有任何资源，并且在 _collect()_ 开始之前不会执行任何操作**。

因此，_Flow_ 适用于处理重复任务的调度，**特别是在需要定期重复操作的应用程序上下文中**。

让我们创建一个简单的场景：

```kotlin
val flow = flow {
    while (true) {
        emit(Unit)
        delay(1000.milliseconds)
    }
}
```

每次执行数据流时，此函数将发送一个计数器值，然后延迟一秒钟再发送下一个值。

这个过程将无限重复，并创建一个每秒间隔重复自身的数据流。

### 5.1. 使用 _collect()_

_collect()_ 是 _Flow_ 中用于消费 _Flow_ 生产的数据流的操作之一。它将为 _Flow_ 发送的每个数据元素执行其中定义的代码块。

因此，_collect_ 允许我们对从数据流接收到的每个项目执行操作或操作：

```kotlin
var count = 0

flow.collect{
    count++
    println(count)
}
```

所以，_collect_ 作为一个机制来收集或捕获从 _Flow_ 接收到的值，并在接收到的每个值上执行相关操作。

代码的输出将是一个无限循环，每秒间隔顺序打印 _Long_ 值：

```plaintext
1
2
3
...
```

### 5.2. 使用 _take()_ 和 _collect()_

_take()_ 函数是 _Flow_ 中的操作，用于从数据流中检索前几个元素。当我们只想检索 _Flow_ 生成的数据流的一小部分时，这个函数很有用 — 例如，限制处理或显示的元素数量。

让我们调用 _take()_ 并看看它的效果：

```kotlin
flow.take(10).collect{
    count++
    println("Task executed $count")
}
```

_take(10)_ 取 _flow_ 的前10个元素。然后我们使用 _.collect()_ 从 _Flow_ 收集值。

每当收集到一个值时，就会执行其中的代码块。在这种情况下，每次发出一个值，我们就增加 _count_ 并打印一条消息，指示任务已执行以及当前的 _count_。

## 6. 结论

在本教程中，我们讨论了调度重复任务的方法。

_Timer_ 提供了一种简单的方法，适用于轻量级任务。然而，_ScheduledExecutorService_ 提供了一种更高级的方法，适用于需要单独线程的计划任务。

此外，Kotlin 拥有协程，能够比传统的基于线程的方法更有效地处理线程。但是，在使用它们时，我们需要小心避免阻塞。

如果我们需要连续数据处理，那么 _Flow_ 更适合这项工作，因为它允许响应式和非阻塞的任务调度。

像往常一样，所有的代码示例都可以在 GitHub 上找到。