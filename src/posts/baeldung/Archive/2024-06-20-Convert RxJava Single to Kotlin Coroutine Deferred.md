---
date: 2024-06-20
category:
  - Kotlin
  - RxJava
tag:
  - Kotlin Coroutine
  - RxJava Single
  - Deferred
head:
  - - meta
    - name: keywords
      content: Kotlin, RxJava, Coroutine, Single, Deferred

---

# 将 RxJava 的 Single 转换为 Kotlin 协程的 Deferred

1. 概述

在 RxJava 中的 **Single** 和 Kotlin 协程中的 **Deferred** 是执行异步操作的机制。它们允许我们在不阻塞主线程的情况下执行耗时任务。

我们可能已经在项目中使用了 **Single**，但希望迁移到 **Deferred** 作为替代解决方案。转换是实现这一目标的一种方式，而无需进行完整的重写。

在本文中，我们将尝试以多种方式将 **Single** 转换为 **Deferred**。

2. 比较 Single 和 Deferred

**Single** 是 RxJava 提供的抽象之一，它表示一个只会生成一个项目或一个错误的 **Observable**。

当我们只想从操作中接收一个结果，例如 API 调用或从数据库中读取数据时，我们可以使用 **Single**。

**Deferred** 是 Kotlin 协程中使用的数据类型，用于表示将来可用的结果。

同时，我们还可以使用 **Deferred** 来处理可能需要很长时间的操作，例如网络或 API 调用，这些操作的结果将在延迟一段时间后提供。

从概念上讲，**Deferred** 和 **Single** 具有相似的目的——即表示可能需要长时间运行的操作的单一结果：

| 特性 | **Single** (RxJava) | **Deferred** (Kotlin 协程) |
| --- | --- | --- |
| 目的 | 表示一个包含一个项目或错误的 **Observable** | 表示将来可用的结果 |
| 使用案例 | 从操作中接收一个结果 | 处理可能需要长时间运行的操作 |
| 结果处理 | 一个项目或错误 | 结果在时间延迟后可用 |
| 错误处理 | 通过 **onError()_** 处理错误 | 使用 **try/catch** 或 **await()** 捕获错误 |
| 获取结果 | **subscribe(), blockingGet()** | **await()** |

上表简要概述了 **Single** 和 **Deferred** 之间的比较。

为了演示目的，我们有以下形式的数据列表：

```kotlin
data class Product(val id: Int, val name: String, val price: Double)

private val allProducts = listOf(
  Product(1, "Samsung", 1200.0),
  Product(2, "Oppo", 800.0),
  Product(3, "Nokia", 450.0),
  Product(4, "Lenovo", 550.0),
  Product(5, "ASUS", 400.0)
)
```

接下来，我们创建一个函数，该函数产生一个经过价格过滤和排序的 **Single`\<List\<Product\>``>**：

```kotlin
private fun getFilteredProducts(): Single`\<List\<Product\>``> {
    return Single.just(
      allProducts
    ).map { products ->
      products.sortedBy { it.price }.filter { it.price > 500 }
    }.subscribeOn(Schedulers.io())
}
```

让我们还准备一个稍后可以使用的函数，以验证结果是否符合我们的期望：

```kotlin
private suspend fun ````````\<T\>```````` Deferred````````\<T\>````````.assertOver500AndSorted() {
    assertThat(this.await() as List\<*\>).containsExactly(
      Product(4, "Lenovo", 550.0),
      Product(2, "Oppo", 800.0),
      Product(1, "Samsung", 1200.0)
    )
}
```

这个函数将验证结果确实是一个代表过滤过的 **List\<Product\>** 的 **Deferred** 对象：

```kotlin
deferred.assertOver500AndSorted()
```

接下来，我们将以几种不同的方式从 **Single** 转换为 **Deferred**。让我们开始实验！

### 3.1. 使用 async() 和 blockingGet()

**async** 函数用于异步启动协程的执行。当我们使用 **async** 函数时，将启动一个协程来执行给定任务，并返回表示任务结果的 **Deferred**：

```kotlin
val futureResult: Deferred````````\<T\>```````` = async { /* 执行某些操作 */ }
```

在这种情况下，我们使用 RxJava 的 **blockingGet()** 方法，该方法以阻塞的方式等待当前 **Single** 发出一个成功值（返回）或一个异常（传播）。

因此，我们可以使用这种方法将 **Single** 转换为 **Deferred**：

```kotlin
val deferred = async { getFilteredProducts().blockingGet() }
```

**getFilteredProducts().blockingGet()** 在协程内被调用，并将阻塞协程直到 **getFilteredProducts()** 完成。

### 3.2. 使用 CompletableDeferred

**CompletableDeferred** 是 **Deferred** 的一个实例，允许我们在稍后手动设置结果。我们可以使用 **complete()** 或 **completeExceptionally()** 方法完成 **CompletableDeferred**：

```kotlin
public abstract fun complete(value: T): kotlin.Boolean
```

我们还可以使用 **completeExceptionally()** 方法来处理应该返回一个带有异常的失败值的操作：

```kotlin
public abstract fun completeExceptionally(exception: kotlin.Throwable): kotlin.Boolean
```

因此，我们将使用 **complete()** 函数将 **Single** 的 **subscribe()** 操作的结果发送出去，然后存储在 **CompletableDeferred** 中：

```kotlin
val deferred = CompletableDeferred````````\<T\>````````()
getFilteredProducts().subscribe(deferred::complete, deferred::completeExceptionally)
```

**getFilteredProducts().subscribe(…)** 订阅了由 **getFilteredProducts()** 返回的 observable，并有两个回调。

**deferred::complete** 在 observable 发出一个值时被调用，使用该值完成 **CompletableDeferred**。同时，**deferred::completeExceptionally** 在 observable 发出一个错误时被调用，使用该异常完成 **CompletableDeferred**。

### 3.3. 使用 suspendCoroutine 或 suspendCancellableCoroutine

**suspendCoroutine** 是 Kotlin 协程中的一个函数，用于挂起协程的执行并等待 lambda 的结果：

```kotlin
suspend inline fun ````````\<T\>```````` suspendCoroutine(
  crossinline block: (Continuation````````\<T\>````````) -> kotlin.Unit
): T
```

而 **suspendCancellableCoroutine** 就像 **suspendCoroutine**，但增加了在等待时取消协程的能力。这使用 **continuation.cancel()** 来取消例程：

```kotlin
public suspend inline fun ````````\<T\>```````` suspendCancellableCoroutine(
  crossinline block: (CancellableContinuation````````\<T\>````````) -> kotlin.Unit
): T
```

让我们使用 **suspendCoroutine** 创建 **Deferred**：

```kotlin
val deferred = async {
  suspendCoroutine { continuation ->
    getFilteredProducts().subscribe(continuation::resume, continuation::resumeWithException)
  }
}
```

当 **getFilteredProducts()** 发出一个值时，**continuation::resume** 将被调用，使用该值恢复协程。

但是，如果 **getFilteredProducts()** 发出一个错误，**continuation::resumeWithException** 将被调用，使用该异常恢复协程。

### 3.4. 使用 Kotlinx Coroutines Rx3

Kotlinx Coroutines Rx3 是 Kotlin 协程生态系统的一部分，它提供了 Kotlin 协程和 RxJava 3 之间的强大集成。在我们有 RxJava 和协程操作的组合时，Kotlin Coroutines Rx3 允许我们同时使用它们。

但是，由于这还不是默认 Kotlin 协程的一部分，我们必须首先将其声明为依赖项：

```groovy
\<dependency\>
    \<groupId\>org.jetbrains.kotlinx\</groupId\>
    \<artifactId\>kotlinx-coroutines-rx3\</artifactId\>
    \<version\>1.8.0\</version\>
\</dependency\>
```

这种集成允许我们在 Kotlin 核心例程中使用 RxJava 3 操作符和 flows，以及在 RxJava 3 数据类型（如 Completable、Single 或 Observable）与 Kotlin 核心数据类型（如 Deferred 或 Flow）之间进行转换。

Kotlinx Coroutines Rx3 有一个 **await()** 函数，用于等待 Single 值响应的完成，而不会阻塞线程。如果响应中出现错误，它将返回结果值或抛出异常：

```kotlin
suspend fun \<T\> SingleSource\<T & Any\>.await(): T
```

因此，我们使用 **Single.await()** 创建 **Deferred** 并用 **async** 包装它。

```kotlin
val deferred = async { getFilteredProducts().await() }
```

我们可以在 **Single** 协程上调用 **await()**。如果成功，**await()** 将返回从 **Single** 发出的价值。

## 4. 结论

在本文中，我们讨论了将 **Single** 转换为 **Deferred** 的多种方式。

我们可以使用 **async() 和 blockingGet()** 进行简单转换。

如果我们需要解析或重定向异常，那么我们可以使用方法 **CompletableDeferred**。

**suspendCoroutine** 函数是我们需要一个可挂起的函数而不是回调风格函数的选项。另一个选项是使用
