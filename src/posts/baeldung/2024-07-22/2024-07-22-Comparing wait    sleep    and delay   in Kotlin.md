---
date: 2022-11-01
category:
  - Kotlin
  - Multithreading
tag:
  - wait()
  - sleep()
  - delay()
  - Coroutines
head:
  - - meta
    - name: keywords
      content: Kotlin, wait(), sleep(), delay(), Coroutines, Multithreading
---
# Kotlin中wait()、sleep()和delay()的比较

多线程和并发是现代软件开发中的关键概念，它们使程序能够同时高效地处理多个任务。在Kotlin中，开发者有多种工具来控制线程或协程的定时和执行。

在本教程中，我们将探索并比较三种常用的引入延迟的方法：wait()、sleep()和delay()。

在深入了解特定的延迟方法之前，理解线程和协程的基本概念至关重要。

线程是进程内最小的执行单元。在Java和Kotlin中，Thread类提供了一种创建和管理线程的方式。然而，直接使用线程可能会出错且复杂。

另一方面，协程是Kotlin引入的轻量级替代方案，以简化异步编程。它们提供了一种以顺序和更易读的方式编写异步代码的方法。

现在，让我们深入了解每种方法的细节。

wait()方法是Java和Kotlin中Object类的一部分，用于线程同步。值得注意的是，wait()不是Kotlin语言的直接成员，而是可以通过Java互操作性访问。

在Kotlin中，重要的是要注意wait()和notify()方法并不直接在Any类型的实例上可访问。因此，要使用wait()和notify()，我们需要使我们的锁是Object类型：

```kotlin
val lock = Object()
fun main() {
    runBlocking(Dispatchers.Default) {
        launch(Dispatchers.IO) {
            testWaitThread1()
        }
        launch(Dispatchers.IO) {
            testWaitThread2()
        }
    }
}
fun testWaitThread1() = synchronized(lock) {
    lock.wait()
    println("首先打印")
}
fun testWaitThread2() = synchronized(lock) {
    println("其次打印")
    lock.notify()
}
```

在这个例子中，我们的第一个协程testWaitThread1()在打印“首先打印”之前等待一个信号。我们的第二个协程testWaitThread2()打印“其次打印”，并通过在我们的共享对象lock上调用notify()来向等待的线程发出信号，继续执行。

使用synchronized()、wait()和notify()确保了两个线程之间的正确协调和同步。当代码运行时，我们会发现它首先打印“其次打印”，然后是“首先打印”，这是由于这种锁定。

sleep()方法是Thread类的静态方法，它使线程暂停指定的时间量。与wait()不同，它不涉及同步或线程间通信：

```kotlin
fun sleepMethod() {
    println("线程1正在休眠...")
    Thread.sleep(2000) // 休眠2秒
    println("线程1醒了!")
}
```

在这个例子中，主线程在继续执行之前休眠两秒钟。虽然sleep()很简单，但重要的是要注意它**暂停了整个线程**。

delay()方法是Kotlin协程框架的一部分，它在协程执行中引入延迟。**协程是与传统线程相比更现代、更灵活的并发方法**：

```kotlin
fun delayMethod() = runBlocking {
    println("协程1正在延迟...")
    delay(2000) // 延迟2秒
    println("协程1恢复了!")
}
```

在这个例子中，runBlocking()协程构建器创建了一个协程，delay()引入了两秒的非阻塞延迟。与线程不同，协程不会阻塞底层线程，使它们更适合异步和响应式应用程序。

现在我们已经探索了wait()、sleep()和delay()，让我们讨论何时使用每种方法。

### 6.1. wait()
当我们处理线程同步和线程间通信时，建议使用wait()方法。这种方法让一个线程等待另一个线程的条件或通知，然后继续。

### 6.2 sleep()
sleep()方法在不需要任何同步或线程间通信的情况下引入线程执行的延迟。它适用于线程内简单的与时间相关的任务。

### 6.3 delay()
我们通常在处理协程时使用delay()方法进行非阻塞延迟。这种方法是在现代Kotlin应用程序中进行异步编程的首选，确保了响应性而不阻塞线程。

理解wait()、sleep()和delay()之间的区别对于在Kotlin中进行有效的多线程和基于协程的编程至关重要。这些方法之间的选择取决于我们应用程序的具体要求，协程和delay()是更现代、更灵活的异步编程选项。

随着Kotlin的不断发展，协程可能会变得更加集成到语言的并发模型中。

这些示例的完整实现可以在GitHub上找到。