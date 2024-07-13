---
date: 2022-11-01
category:
  - Kotlin
tag:
  - MutableStateFlow
  - value
  - emit
head:
  - - meta
    - name: keywords
      content: Kotlin, Flow API, MutableStateFlow, value, emit
---
# Kotlin中MutableStateFlow的value属性与emit()函数的区别 | Baeldung关于Kotlin

Kotlin的_Flow_ API通过提供一种强大而简洁的方式来处理数据流，彻底改变了异步编程。这个API的一个关键组件是_MutableStateFlow_，这是一个可变状态持有者，它向其收集器发出值。然而，当开发者在_MutableStateFlow_的上下文中遇到_value_属性和_emit()_函数时，常常会感到困惑。

在本教程中，我们将深入探讨_value_和_emit()_之间的区别。

### 2. 理解_MutableStateFlow_

在深入探讨差异之前，让我们快速回顾一下_MutableStateFlow_是什么。_MutableStateFlow_是一种特殊的_Flow_，它表示一个可变的值。**它持有一个当前值，并允许收集器在值改变时接收更新**。具体来说，我们可以创建具有起始值的新实例：

`val mutableStateFlow = MutableStateFlow("初始值")`

此外，我们可以使用_collect()_函数订阅值：

```kotlin
fun main() = runBlocking {
    val mutableStateFlow = MutableStateFlow("初始值")
    val job = launch {
        mutableStateFlow.collect { value ->
            println("接收到的值: $value")
        }
    }
    mutableStateFlow.value = "更新后的值 1"
    mutableStateFlow.value = "更新后的值 2"
    job.cancel()
}
```

在提供的示例中，我们使用“初始值”作为初始值创建了一个_MutableStateFlow_。然后，我们使用_launch()_函数启动一个协程。我们使用_collect()_函数订阅由_MutableStateFlow_发出的值。最终，_MutableStateFlow_的值会按顺序更新。使用_collect()_块创建的订阅者接收每个更新，并在协程内部打印每个值。

### 3. _value_属性

_value_属性是_MutableStateFlow_的一个可读写属性，代表其当前值。它允许我们在不订阅流的情况下设置或检索当前状态：

```kotlin
@Test
fun `初始值应该是Baeldung团队`() {
    val mutableStateFlow = MutableStateFlow("Baeldung团队")
    val currentValue = mutableStateFlow.value
    assertEquals("Baeldung团队", currentValue)
}
```

在这段代码中，我们使用“Baeldung团队”作为初始值创建了一个_MutableStateFlow_。通过访问_value_属性，我们获得了可变状态的某个时间点的快照，在这种情况下，它反映了初始值。此外，**_value_属性是线程安全的**，允许并发线程访问。

### 4. _emit()_函数

_emit()_函数用于更新_MutableStateFlow_的值。它是一个挂起函数，这意味着它必须在协程或协程上下文中调用：

```kotlin
@Test
fun `emit函数应该更新值`() = runBlocking {
    val mutableStateFlow = MutableStateFlow("Baledung团队")
    mutableStateFlow.emit("Baledung团队Kotlin")
    assertEquals("Baledung团队Kotlin", mutableStateFlow.value)
}
```

这段代码演示了我们_MutableStateFlow_的简单状态更新。在创建它并使用“Baeldung团队”作为初始值之后，我们使用_emit()_将状态更新为“Baeldung团队Kotlin”。此外，我们使用_runBlocking()_创建一个父协程上下文。如果_Flow_的缓冲区已满，_emit()_将挂起，直到缓冲区有空间并且可以设置值。

**这个示例展示了_MutableStateFlow_如何使可变状态的异步修改成为可能**。

### 5. _tryEmit()_函数

_tryEmit()_函数尝试向_MutableStateFlow_发出一个新值。它返回一个布尔值，指示是否成功发出。如果发出成功，函数返回_true_，如果失败，返回_false_，这意味着调用_emit()_函数将挂起，直到有缓冲区空间可用。**这个方法是线程安全的，并且可以安全地从并发线程调用，无需外部同步**：

```kotlin
@Test
fun `tryEmit函数应该更新值`() {
    val mutableStateFlow = MutableStateFlow("Baledung团队Kotlin 2024")
    val emitResult = mutableStateFlow.tryEmit("Baledung团队Kotlin 2024")
    assertTrue(emitResult)
    assertEquals("Baledung团队Kotlin 2024", mutableStateFlow.value)
}
```

在这个示例中，我们使用初始值创建了一个_MutableStateFlow_，然后我们使用_tryEmit()_在不处于协程上下文的情况下更新值。最后，我们检查_tryEmit()_的返回值，以确保更新成功。

### 6. 结论

_MutableStateFlow_的_value_属性提供了一种直接的方法来访问当前状态，无需订阅，允许开发者高效地检索信息。另一方面，_emit()_函数在异步更新_MutableStateFlow_的值方面发挥着重要作用，尽管它必须在协程上下文中使用。最后，我们还可以使用_tryEmit()_在没有协程上下文的情况下发布新值，尽管它可能无法发布新值。

如往常一样，这些示例的完整实现可以在GitHub上找到。