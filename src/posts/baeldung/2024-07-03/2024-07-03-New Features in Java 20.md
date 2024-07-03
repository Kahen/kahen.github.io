---
date: 2024-07-03
category:
  - Java
  - 编程
tag:
  - Java 20
  - 新特性
head:
  - - meta
    - name: keywords
      content: Java 20, 新特性, JDK, 编程
---
# Java 20 新特性概览

Java 20，于2023年3月21日发布，是迄今为止在Java 19基础上构建的最新短期增量发布。它包括JEP 2.0中提到的七个重要的JDK增强提案（JEPs）。JEP流程用于评估对JDK增强的提案。Java 20中的大多数更新是对早期版本中引入的功能的改进或增强。

此外，Oracle JDK 20不是长期支持版本。因此，它将在Java 21发布之前接收更新。

在本文中，我们将探讨这些新特性。## 2. Scoped Values (JEP 429)

Java应用程序中有大量的组件或模块需要在它们之间共享数据。通常，这些模块是基于线程的，因此我们必须保护它们共享的数据不受任何更改的影响。

我们一直在使用_ThreadLocal_类型的变量来允许组件共享数据。

但这有一些后果：
- _ThreadLocal_变量是可变的。_ThreadLocal_ API允许访问其变量类型的_get()_和_set()_方法。
- 我们可能会遇到内存泄漏问题，因为_ThreadLocal_变量的值会一直保留，直到我们显式调用_remove()_方法或线程退出。因此，这些每个线程的变量没有绑定到它们的生命周期。
- 如果使用大量的线程，它们可能会导致内存占用过大。这是因为子线程可以继承父线程的_ThreadLocal_变量，从而为每个_ThreadLocal_变量分配内存。

为了克服_ThreadLocal_变量的问题，Java 20引入了在线程内和跨线程共享数据的scoped values。

**Scoped values提供了一种简单、不可变且可继承的数据共享选项，特别是在我们使用大量线程的情况下。**

_ScopedValue_是一个不可变的值，它在线程执行的有限期间内可供读取。由于它是不可变的，它允许在有限的线程执行期间安全且容易地共享数据。此外，我们不需要将值作为方法参数传递。

**我们可以使用类_ScopedValue_的_where()_方法来为线程执行的有限期间设置变量的值。此外，一旦我们使用_get()_方法获取了数据，就不能再访问它了。**

一旦线程的_run()_方法完成执行，scoped value就会恢复到未绑定状态。我们可以使用_get()_方法在线程内读取scoped-value变量的值。

## 3. Record Patterns (JEP 432)

JDK 19已经作为预览功能引入了Record Patterns。

Java 20提供了改进和完善的记录模式版本。让我们看看这个版本中的一些改进：

- 增加了对泛型记录模式参数的类型推断支持。
- **增加了在增强的_for_循环的头部使用记录模式的支持。**
- 移除了命名记录模式的支持，我们可以使用可选的标识符来引用记录模式。

这个版本本质上旨在在不改变类型模式的语法或语义的情况下，通过模式匹配表达更改进的、可组合的数据查询。

## 4. Pattern Matching for Switch (JEP 433)

Java 20为_switch_表达式和语句提供了模式匹配的改进版本，特别是关于_switch_表达式中使用的语法。它最初在Java 17中提供，随后在Java 18和19中进行了一些改进，从而扩大了_switch_语句和表达式的可用性和适用性。

这个版本的主要变化包括：

- 使用_switch_表达式或模式对枚举类现在会抛出_MatchException_。以前，如果我们在运行时没有应用_switch_标签，我们会得到_IncompatibleClassChangeError_。
- _switch_标签的语法有所改进。
- 他们增加了对_switch_表达式和语句中泛型记录模式参数的类型推断支持，以及其他支持模式的结构。

## 5. Foreign Function and Memory API (JEP 434)

Java 20包含了在以前Java版本中引入的Foreign Function and Memory (FFM) API的改进和完善。这是第二个预览API。

**Foreign Function and Memory API允许Java开发人员访问JVM之外的代码，并管理堆外内存（即不受JVM管理的内存）。** FFM API旨在提供一个安全、改进和纯Java基础的Java Native Interface (JNI)替代品。

它包括以下改进：

- _MemorySegment_和_MemoryAddress_的抽象被统一。这意味着我们实际上可以从其空间界限确定与段关联的内存地址范围。
- 他们还通过增强密封的_MemoryLayout_层次结构，促进了在_switch_表达式和语句中使用模式匹配。
- 此外，他们将_MemorySession_拆分为_Arena_和_SegmentScope_，以便于跨维护边界共享段。

## 6. Virtual Threads (JEP 436)

虚拟线程最初在JEP 425中作为预览功能提出，并在Java 19中提供。Java 20提出了第二个预览，目的是在使用后收集更多的反馈和改进建议。

虚拟线程是轻量级线程，减少了编写、维护和观察高吞吐量并发应用程序的工作量。因此，它使使用现有的JDK工具调试和排除服务器应用程序变得容易。这可能在服务器应用程序的扩展中很有用。

然而，我们应该注意，传统的_Thread_实现仍然存在，它并不旨在取代Java的基本并发模型。

以下是自第一次预览以来的一些较小变化：

- 他们使Thread中先前引入的方法——_join(Duration)_、_sleep(Duration)_和_threadId()_——在Java 20中变为永久性的。
- 类似地，Future中新引入的方法用于检查任务状态和结果——_state()_和_resultNow()_——在Java 20中变为永久性的。
- 此外，_ExecutorService_现在扩展了_AutoCloseable_。
- 在JDK 19中对线程分组的遗留API_ThreadGroup_的降级，在JEP 425中被描述为永久性的。_ThreadGroup_不适合用于虚拟线程的分组。

## 7. Structured Concurrency (JEP 437)

Structured Concurrency是由JEP 428提出的，并在JDK 19中作为孵化API提供。这个JEP提议在JDK 20中重新孵化API，没有太多变化。因此，它允许更多的反馈时间。

目标是通过引入结构化并发的API来简化多线程编程。它通过将执行类似任务的多个线程分组为一个工作单元来提高可靠性。结果，错误处理和线程取消得到了改进。此外，它促进了一种改进的并发编程方式，旨在保护免受线程取消引起的常见风险。

然而，在这个重新孵化的API中有一个变化。**我们得到了一个更新的_StructuredTaskScope_，它支持在任务范围内创建的线程继承scoped values。** 因此，我们现在可以方便地在多个线程之间共享不可变数据。

## 8. Vector API (JEP 438)

Vector API最初由JEP 338提出，并作为孵化API集成到JDK 16中。这个版本（第五个孵化器）是对所有以前Java版本中的多轮孵化和集成的后续。

Vector API用于在支持的CPU架构上在Java中表达向量计算。向量计算实际上是对向量的一系列操作序列。Vector API旨在提供一种比传统标量计算更优化的向量计算方式。

这个版本与Java 19相比没有引入任何API变化。然而，它包括一些错误修复和性能增强。

最后，**Vector API的开发与Project Valhalla紧密对齐，因为它旨在适应Project Valhalla未来的增强。**

## 9. 结论

Java 20在包括记录模式、_switch_表达式的模式匹配、FFM、虚拟线程等过去版本的多个功能上进行了增量构建。**它还增加了像scoped values这样的新孵化功能，以及像结构化并发和Vector API这样的重新孵化功能的一些增强。**

在本文中，我们讨论了作为增量Java 20发布的一部分引入的一些功能和变化。Java 20的完整更改列表在JDK发布说明中。

OK