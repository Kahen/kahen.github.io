---
date: 2022-11-01
category:
  - Kotlin
  - Coroutine
tag:
  - Exception Handling
  - Asynchronous Programming
head:
  - - meta
    - name: keywords
      content: Kotlin, Coroutine, Exception Handling, Asynchronous Programming
---
# Kotlin协程中的异步异常处理

异常处理是编写健壮可靠软件的关键方面。在异步编程中，由于可能在不同线程或协程中出现的错误，管理异常变得更加关键。

在本教程中，我们将探讨如何在Kotlin协程中处理异常，特别关注在异步代码中捕获异常的各种方法。

### 2. 理解异常

在深入探讨Kotlin协程中的异常处理之前，让我们简要回顾一下异常。**异常是在程序执行期间发生的异常事件，它打断了应用程序的正常流程**。这些事件可能包括错误，例如除以零、访问数组越界或与网络相关的问题。

### 3. 在协程中处理异常

让我们也简要回顾一下协程。协程是异步编程的强大工具，它允许开发人员以顺序和更易读的方式编写异步代码。它们提供了一种执行非阻塞操作的方式，而无需回调代码的复杂性。

在异步编程中，任务通常在不同的线程或协程中并发运行。**如果异常没有得到适当处理，它可以传播到调用栈中，可能导致整个程序崩溃**。有效管理异常对我们维护异步代码的稳定性和可靠性至关重要。

现在，让我们探索几种在Kotlin协程中处理异常的不同方法。

异常通过协程层次结构传播。如果协程内部发生异常，它会传播到父协程或协程作用域。要在协程中捕获和处理异常，我们使用协程代码内的_try-catch_块：

```kotlin
fun main() = runBlocking {
    launch {
        try {
            val result = 10 / 0
            println("Result: $result")
        } catch (e: ArithmeticException) {
            println("Caught an ArithmeticException: $e")
        }
    }
    delay(1000)
}
```

在这个例子中，协程尝试执行除以零的操作，这触发了一个_ArithmeticException_。_try-catch_块捕获了这个特定的异常，并且catch块打印了一条消息，详细说明了捕获的异常。

因此，输出将是：

```kotlin
Caught an ArithmeticException: java.lang.ArithmeticException: / by zero
```

### 4. 使用_CoroutineExceptionHandler_

或者，_CoroutineExceptionHandler_接口允许我们为特定作用域内的所有协程定义全局异常处理器。当我们想要一个集中的位置来处理异常时，这非常有用。

我们的接下来的几个例子将使用一个自定义异常：

```kotlin
CustomException(message: String) : Exception(message)
```

现在，让我们创建一个可重用的_CoroutineExceptionHandler_并将其附加到我们的协程：

```kotlin
fun main() = runBlocking {
    val exceptionHandler = CoroutineExceptionHandler { _, exception ->
        println("Caught global exception: ${exception.message}")
    }
    val job = GlobalScope.launch(exceptionHandler) {
        delay(100)
        throw CustomException("An exception occurred!")
    }
    job.join()
}
```

我们使用_CoroutineExceptionHandler_定义了一个全局异常处理器，并将其附加到在_GlobalScope_中启动的协程。处理器在协程内捕获异常，同时提供了**可重用的异常处理逻辑供其他协程使用**。

输出将是：

```kotlin
Caught global exception: An exception occurred!
```

### 5. 使用_coroutineScope()_包装异步调用

现在我们已经探讨了在协程中处理异常的方法，让我们看看在同时运行多个协程时处理异常的一些策略。

_coroutineScope()_函数是一个协程构建器，它确保所有子协程完成，除非其中一个失败，这将取消整个作用域：

```kotlin
fun main() = runBlocking {
    try {
        coroutineScope {
            launch {
                delay(100)
                throw CustomException("An exception occurred!")
            }
            launch {
                delay(200)
                println("This coroutine completes successfully.")
            }
        }
    } catch (e: CustomException) {
        println("Caught exception: ${e.message}")
    }
}
```

在这个例子中，_coroutineScope()_函数为两个子协程创建了一个作用域。**如果其中一个协程失败，整个作用域将被取消，并且异常在周围的_try-catch_块中被捕获**。

由于成功的协程有更短的延迟，输出将是：

```kotlin
Caught exception: An exception occurred!
```

### 6. 使用_supervisorScope()_包装异步调用

最后，_supervisorScope()_是另一个类似于_coroutineScope()_的协程构建器，但它在处理失败时有所不同。而_coroutineScope()_在第一次失败时取消所有子协程**，_supervisorScope()_允许剩余的协程即使其中一个失败也能继续运行**：

```kotlin
fun main(args: Array) = runBlocking {
    val exceptionHandler = CoroutineExceptionHandler { _, exception ->
        println("Caught an exception: ${exception.message}")
    }
    supervisorScope {
        val job1 = launch(exceptionHandler) {
            delay(100)
            println("This coroutine completes successfully.")
        }
        val job2 = launch(exceptionHandler) {
            throw Exception("An exception occurred!")
        }
        listOf(job1, job2).joinAll()
    }
}
```

在上面的例子中，我们定义了一个_CoroutineExceptionHandler_来处理协程内出现的异常。然后我们使用_supervisorScope()_为子协程建立一个作用域。这种机制防止了一个子协程的失败影响到其他协程或监管协程。我们的一个协程故意抛出一个异常，而另一个协程在执行过程中没有遇到任何问题。

输出将是：

```kotlin
Caught an exception: An exception occurred!
This coroutine completes successfully.
```

为了同步监管协程的执行与其子协程，我们在_job_上调用_join()_。**这确保了监管协程等待所有子协程完成执行**。如果任何子协程中发生异常，_CoroutineExceptionHandler()_会捕获它，允许我们打印一个适当的消息，指示异常的性质。

### 7. 结论

在本教程中，我们强调了理解异常及其如何打断应用程序的正常流程的重要性。在异步编程中，挑战在于有效处理可能在不同线程或协程中发生的异常。我们讨论了异常如何通过协程层次结构传播，并演示了在协程内使用_try-catch_块来捕获和处理特定异常。

此外，我们探讨了_CoroutineExceptionHandler_接口，它提供了一种集中处理作用域内多个协程的异常的机制。这种方法允许可重用的异常处理逻辑，并促进了更清晰的代码组织。此外，我们检查了如_coroutineScope()_和_supervisorScope()_这样的协程构建器，用于管理协程组。这些构建器提供了不同的异常处理策略，_coroutineScope()_在第一次失败时取消所有子协程，而_supervisorScope()_允许剩余的协程继续独立执行。

如常，本文的示例可以在GitHub上找到。