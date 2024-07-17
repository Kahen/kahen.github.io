---
date: 2022-11-01
category:
  - Kotlin
  - Coroutines
tag:
  - Kotlin Flow
  - collect()
  - collectLatest()
head:
  - - meta
    - name: keywords
      content: Kotlin, Coroutines, Flow, collect(), collectLatest()
------
# Kotlin 中 Flow 的 collect() 和 collectLatest() 的区别

## 1. 引言

Kotlin 的 _Flow_，作为 Kotlin 协程库的一部分，已经成为 Kotlin 中异步编程的重要工具。它提供了一种简洁且富有表现力的方式来处理异步数据流。在使用 Flow 收集数据时，两个常用函数是 _collect()_ 和 _collectLatest()_。尽管这两个终端操作符都用于收集由 Flow 发出的数据，但它们具有不同的特性和用例。

在本教程中，我们将深入探讨 _collect()_ 和 _collectLatest()_ 之间的区别。

## 2. Kotlin Flow 概述

在深入讨论 _collect()_ 和 _collectLatest()_ 的具体内容之前，让我们简要回顾一下 Kotlin Flow 是什么。一个 _Flow_ 是一个可以被转换、组合和反应性消费的异步值流。它是 Kotlin 协程的一部分，并提供了一种结构化和简洁的方法来处理异步数据流。

在使用 _Flow_ 时，我们需要一个活动的协程上下文或 _suspend_ 函数来进行大多数操作。

## 3. _collect()_ 的基础知识

_collect()_ 函数是用于消费由 Flow 发出值的基本方法。**调用 _collect()_** **在 Flow 上启动收集过程，并阻塞协程直到 Flow 完成**。这意味着当 Flow 发出多个值时，这个收集器会按顺序处理每个值。让我们看看 _collect()_ 函数的使用，这是一个 _suspend_ 函数，需要在 _runBlocking()_ lambda 中使用，以便我们有一个活动的协程上下文：

```kotlin
fun main() {
    runBlocking {
        flowOf(1, 2, 3)
            .collect { value ->
                println(value)
            }
    }
}

```

在上面的示例中，_collect()_ 函数将按 Flow 发出的顺序打印每个值“1”，“2”和“3”。

## 4. 理解 _collectLatest()_

_collectLatest()_ 函数引入了不同的行为。与 _collect()_ 不同，**_collectLatest()_ 取消或忽略 Flow 中的早期值，并仅优先考虑最近发出的值**。

像之前的示例一样，我们需要将 _collectLatest()_ 的使用封装在 _runBlocking()_ 中以提供协程上下文：

```kotlin
fun main() {
    runBlocking {
        flowOf(1, 2, 3)
            .collectLatest { value ->
                println(value)
            }
    }
}

```

在这个示例中，如果 Flow 快速连续发出值“1”，“2”和“3”，_collectLatest()_ 将忽略除“3”之外的所有值，因为处理值“1”和“2”将被取消。这意味着只有“3”会被打印。_runBlocking()_ lambda 将我们的代码封装在协程上下文中，因为 _collectLatest()_ 是一个 _suspend_ 函数。

## 5. 使用考虑

选择 _collect()_ 和 _collectLatest()_ 可以影响我们应用程序的性能。如果处理每个发出的值至关重要且顺序重要，则 _collect()_ 是更好的选择。另一方面，如果我们处理的是快速变化的数据，并且只关心最新值，则 _collectLatest()_ 可以通过取消不必要的处理来帮助提高效率。

一个现实世界的数据集可以帮助说明这些差异，如果我们正在构建一个温度站。我们会使用 _collect()_ 获取所有温度以显示时间图。而我们会使用 _collectLatest()_ 仅获取当前温度。

## 6. 结论

Kotlin _Flow_ 是 Kotlin 协程库的强大组件。它提供了一种有效的方式来处理异步数据流。_collect()_ 函数允许按顺序处理每个发出的值并阻塞协程直到 Flow 完成。另一方面，_collectLatest()_ 独特地取消 Flow 中的先前值，仅优先考虑最近发出的值。当优先考虑最新发出的值并丢弃不必要的处理时，这个特性特别有利。

如往常一样，这些示例的完整实现可以在 GitHub 上找到。