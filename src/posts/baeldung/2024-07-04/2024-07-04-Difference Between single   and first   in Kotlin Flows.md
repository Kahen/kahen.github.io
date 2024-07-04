---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Kotlin Flows
  - single() vs first()
head:
  - - meta
    - name: keywords
      content: Kotlin, Flows, single(), first(), asynchronous programming
---
# Kotlin 中 Flow 的 single() 与 first() 的区别

Kotlin _Flows_ 已成为现代异步编程不可或缺的一部分。它们提供了一种无缝且简洁的方式来处理异步数据流。在使用 Flows 时，两个常用的终端操作符是 _single()_ 和 _first()_。尽管这两个函数乍一看可能可以互换使用，但理解它们的细微差别对于编写高效且无错误的代码至关重要。

在本教程中，我们将深入探讨 Kotlin _Flows_ 中 _single()_ 和 _first()_ 函数的区别。

### 2. 理解 Kotlin Flows

在深入讨论 _single()_ 和 _first()_ 之前，让我们简要回顾一下 Kotlin _Flows_。一个 _Flow_ 是一个异步序列，它随时间发出多个值。它们以非阻塞和高效的方式处理数据流，使它们成为响应式编程的强大工具。

以下是一些突出 Flows 重要性的关键方面：

- Flows 通过允许我们异步表示和处理值序列来简化异步编程。
- 它们提供了一种处理异步操作而不阻塞线程的方式。
- Kotlin _Flows_ 支持取消操作。
- Flows 提供了内置的错误处理支持，允许我们传播和一致地处理错误。
- **Flows 是基于 Kotlin 协程构建的，这意味着它们与基于协程的代码无缝集成，为异步操作提供了统一和一致的编程模型**。

### 3. 使用 _single()_ 函数

_single()_ 函数从一个 _Flow_ 返回第一个也是唯一的项目。如果流为空，则此函数抛出一个 _NoSuchElementException_。如果流包含多于一个项目，则此函数抛出一个 _IllegalArgumentException_。

**这使得 _single()_ 适用于我们期望 _Flow_ 发出单个值，并且任何其他值组合都应该出现错误的情况**：

```kotlin
@Test
fun testSingleValue() = runBlocking {
    val multipleValuesFlow = flowOf(42)
    val singleValue = multipleValuesFlow.single()
    assertEquals(42, singleValue)
}
```

在这个代码中，我们的测试用例验证了当一个包含单个值 42 的流返回这个值时。

正如前面提到的，当 _Flow_ 包含多于一个值时，_single()_ 抛出异常：

```kotlin
@Test
fun testExceptionForMultipleValues() = runBlocking {
    val multipleValues = flowOf(42, 43, 44)
    val exception = assertFailsWith`<IllegalArgumentException>` {
        runBlocking {
            multipleValues.single()
        }
    }
    assertEquals("Flow has more than one element", exception.message)
}
```

在这个例子中，_multipleValues_ 包含三个项目，尝试调用它的 _single()_ 将抛出一个 _IllegalArgumentException_。

接下来，我们将验证空的流抛出一个 _NoSuchElementException_：

```kotlin
@Test
fun testIllegalArgumentException() = runBlocking {
    val emptyFlow = flowOf``<Int>``()
    val exception = assertFailsWith``<NoSuchElementException>`` {
        runBlocking {
            emptyFlow.single()
        }
    }
    assertEquals("Flow is empty", exception.message)
}
```

这强制执行 _single()_ 仅在我们期望我们的 _Flow_ 有一个值时使用，并且所有其他情况都应该出现错误。

### 3.1. 何时使用 _single()_ 函数

让我们看看我们应该在什么情况下使用 _single()_：

- 当我们期望 _Flow_ 恰好发出一个项目时使用 _single()_。
- 我们期望非唯一发射出现错误。

### 4. 使用 _first()_ 函数

另一方面，_first()_ 函数检索 _Flow_ 发出的第一个项目。**它不要求只发出一个项目；相反，它返回发出的第一个项目并完成 _Flow_**：

```kotlin
@Test
fun testFirstValue() = runBlocking {
    val multipleValuesFlow = flowOf(1, 2, 3)
    val firstValue = multipleValuesFlow.first()
    assertEquals(1, firstValue)
}
```

在这个代码中，我们从整数 _Flow_ 中获取第一个值 _first()_，在这种情况下是一。

**我们还将验证空的 _Flow_ 抛出一个 _NoSuchElementException_**：

```kotlin
@Test
fun testFirstValueFromEmptyFlow() = runBlocking {
    val emptyFlow = emptyFlow``<Int>``()
    val exception = assertFailsWith``<NoSuchElementException>`` {
        runBlocking {
            emptyFlow.first()
        }
    }
    assertEquals("Expected at least one element", exception.message)
}
```

### 4.1. 何时使用 _first()_ 函数

让我们看看我们应该在什么情况下使用 _first()_：

- 当我们寻找第一个发出的项目，不管 _Flow_ 可能包含多少项目时。
- 当我们想要处理第一个发出的项目而不需要等待 _Flow_ 完成时。

### 5. 结论

Flows 是处理异步数据流的强大工具，允许开发人员根据我们的特定要求选择 _single()_ 和 _first()_ 终端函数。区别在于如何处理包含多个值的流。_single()_ 函数确保只发出一个项目，而 _first()_ 函数检索初始项目而不限制流的大小。如果流为空，两个函数都会出错。

如常，这些示例的完整实现可以在 GitHub 上找到。