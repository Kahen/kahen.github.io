---
date: 2022-11-01
category:
  - Kotlin
  - MockK
tag:
  - Mocking
  - Spies
  - Unit Testing
head:
  - - meta
    - name: keywords
      content: Kotlin, MockK, Spies, Unit Testing
---

# MockK中使用Spy的指南

## 1. 引言

模拟是单元测试的一个重要方面。它允许我们隔离组件，确保代码库的每个部分都能按预期工作。在Kotlin中，有一个强大的测试框架叫做MockK，它提供了一个称为间谍（spies）的特性。间谍是一种高级用例，我们可以用模拟框架来观察真实对象。

在本教程中，我们将探讨MockK中间谍的概念以及它们如何增强我们的单元测试过程。

## 2. 理解模拟和间谍

在我们深入间谍之前，让我们简要回顾一下模拟的概念。**在单元测试中，模拟是创建模仿真实对象行为的假对象**。这允许开发人员在不依赖依赖对象的实际实现的情况下测试组件的隔离。我们可以使用`mockk<>`创建一个模拟：

```kotlin
val mock = mockk``<Any>``()
```

在MockK的上下文中，间谍是一种允许部分模拟的模拟类型。这意味着我们可以使用间谍来模拟真实对象的特定方法，同时保留其余方法的原始行为。这种能力使间谍成为单元测试中的一种多功能工具，使开发人员能够在不完全隔离被测试组件的情况下测试代码的某些方面。我们可以使用`spyk<>`创建一个间谍：

```kotlin
val spy = spyk``<Any>``()
```

### 2.1. MockK依赖性

为了使用这些特性，我们需要将MockK添加到我们的项目中。我们可以在`build.gradle`或`build.gradle.kts`文件中的依赖项中添加它：

```groovy
dependencies {
    testImplementation "io.mockk:mockk:1.12.0"
}
```

## 3. 在Kotlin中使用间谍

现在，让我们探索如何在Kotlin中使用MockK的间谍。假设我们有一个名为_Calculator_的简单类，它具有各种数学运算：

```kotlin
fun add(a: Int, b: Int): Int {
    return a+b
}
fun findAverage(a: Int, b: Int): Int {
    val total = add(a,b)
    return total/2;
}
```

在这段代码中，我们定义了两个函数：_add()_用于添加两个整数，_findAverage()_使用_add()_函数来计算两个整数的平均值。

我们使用`spyk()`函数创建我们的_Calculator_的间谍实例。**这个间谍允许我们观察、拦截和验证方法调用，深入了解在测试期间这些方法是如何被调用的**：

```kotlin
class CalculatorTest {
    @Test
    fun testSpy() {
        val spy = spyk```<Calculator>```()
        val result = spy.findAverage(5, 5)
        verify { spy.add(5, 5) }
        assertEquals(5, result)
    }
}
```

在这个代码中，我们的测试使用`spyk()`来观察_Calculator_的行为。具体来说，_verify()_行确保_add()_方法被调用了预期的参数，允许我们验证与间谍的交互并验证与间谍的交互。

## 4. 使用间谍进行部分模拟

除了观察和验证方法调用之外，MockK还允许我们在间谍上部分模拟方法。考虑我们之前的例子，并演示如何在_Calculator_间谍上模拟_add()_方法以返回特定值。这在我们想要控制某些方法的行为的同时仍然执行其他真实实现时很有帮助：

```kotlin
@Test
fun testPartialMocking() {
    val spy = spyk```<Calculator>```()
    every { spy.add(any(), any()) } returns 2
    val result = spy.findAverage(5, 5)
    verify { spy.add(5, 5) }
    assertEquals(1, result)
}
```

在这个例子中，我们可以通过将函数传递给`every()`来控制我们的_spy_。我们可以指定特定的参数，但为了简单起见，这次我们选择了_any()_参数。最后，我们可以为间谍配置`returns()`值，在这种情况下是两个。

**这种部分模拟允许我们控制_add()_方法的行为，同时仍然执行_findAverage()_方法的真实实现**。然后测试验证_add()_方法是否被调用了预期的参数，并且_findAverage()_的结果反映了带有模拟加法的真实行为。

## 5. 重置间谍

最后，**我们可以使用_clearMocks()_来重置间谍上的模拟行为和调用记录**：

```kotlin
@Test
fun testPartialMocking() {
    val spy = spyk```<Calculator>```()
    every { spy.add(any(), any()) } returns 2
    val result = spy.findAverage(5, 5)
    verify { spy.add(5, 5) }
    assertEquals(1, result)
    clearMocks(spy)
}
```

使用_clearMocks()_将重置任何使用_every()_在_spy_上配置的行为。这还将重置我们使用_verify()_检查的任何记录的调用。

## 6. 使用间谍的好处

间谍允许我们模拟特定方法，同时保留其余方法的原始行为。这在我们想要专注于测试类的特定部分而不需要完全隔离它时特别有用。

**与常规模拟不同，间谍让我们调用被监视对象的真实方法**。当我们想要测试同一对象上真实方法与模拟方法的集成时，这是很有价值的。

间谍可以通过允许开发人员编写更专注和简洁的测试来增强代码的可维护性。当使用间谍时，我们可以选择模拟哪些方法以及保留哪些真实方法，从而得到更干净、更易读的测试代码。

## 7. 结论

在Kotlin的单元测试领域，间谍为开发人员提供了一个灵活而强大的工具。它们支持部分模拟，允许我们在保持其余部分原始行为的同时测试代码的特定组件。通过将间谍纳入我们的测试策略，我们可以在隔离代码进行测试和确保不同组件之间现实交互之间找到平衡。

如常，所提供的示例代码可在GitHub上找到。

OK