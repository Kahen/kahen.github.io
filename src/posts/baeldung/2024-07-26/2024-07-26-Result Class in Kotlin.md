---
date: 2022-11-01
category:
  - Kotlin
  - Error Handling
tag:
  - Result Class
  - Kotlin
head:
  - - meta
    - name: keywords
      content: Kotlin, Result Class, Error Handling
---
# Kotlin中的Result类 | Baeldung关于Kotlin的教程

Kotlin提供了多种特性来增强代码的可读性、可维护性和健壮性。其中一种在错误处理中扮演关键角色的特性是_Result_类型。

在本教程中，我们将探讨什么是_Result_类，它为什么重要，以及如何在Kotlin中有效使用它。此外，我们将讨论实际用例，并提供代码片段以及相应的JUnit测试用例。

### 2.1. 为什么_Result_很重要？

Kotlin中_Result_类型的重要性在于它促进了显式的错误处理。通过强制开发者认真处理成功和失败的情况，_Result_最小化了忽视潜在错误的风险，有助于开发更健壮的应用程序。

此外，_Result_提供了比可空返回类型的优势，提供了一种有意识的方式来表示成功或失败。这不仅增强了代码的可读性，而且确保了代码的透明性，从而使开发者更容易理解程序流程，更容易推理代码。

### 3. 使用_runCatching()_的_Result_类

在探索手动创建_Result_实例之前，我们将探索提供的实用函数_runCatching()_。这个函数接受一个可能会抛出异常的lambda，并在发生异常时返回一个带有异常的_Result.failure()_。否则，它将返回lambda的返回值的_Result.success()_：

```kotlin
fun divide(a: Int, b: Int): Result`````<Int>````` {
    return runCatching {
        a / b
    }
}
```

在我们的代码中，如果除数_b_为零，_divide()_将抛出_ArithmeticException_。_runCatching()_函数是手动处理异常的_try/catch_块的替代品。

现在，让我们测试_divide()_函数的成功和失败结果：

```kotlin
@Test
fun `should handle successful division`() {
    val resultValid = divide(10, 2)
    assertTrue(resultValid.isSuccess)
    assertEquals(5, resultValid.getOrNull())
}

@Test
fun `should handle division by zero`() {
    val resultInvalid = divide(5, 0)
    assertTrue(resultInvalid.isFailure)
    assertEquals(ArithmeticException::class, resultInvalid.exceptionOrNull()!!::class)
    assertEquals("/ by zero", resultInvalid.exceptionOrNull()!!.message)
}
```

### 4. 如何使用_Result_

虽然我们在编写代码时知道有特定的失败条件，但我们也可以直接创建自己的_Result_实例：

```kotlin
fun divide(a: Int, b: Int): Result`````<Int>````` = if (b != 0) {
    Result.success(a / b)
} else {
    Result.failure(Exception("Division by zero is not allowed."))
}
```

我们已经确定不能除以零。与其让除以零抛出异常，不如在我们的_divide()_函数中检查除数，并在除数为零时直接返回带有异常和错误消息的_Result.failure()_。否则，我们可以执行除法并在_Result.success()_中返回值。

让我们再次测试我们的_divide()_函数的两个路径：

```kotlin
@Test
fun `should test valid division`() {
    val firstResult = divide(10, 2)
    assertEquals(Result.success(5), firstResult)
}

@Test
fun `should handle division by zero`() {
    val result = divide(10, 0)
    val expectedException = assertFailsWith``<Exception>`` {
        result.getOrThrow()
    }
    assertEquals("Division by zero is not allowed.", expectedException.message)
}
```

### 4.1. 使用Result类处理成功案例

让我们看看一个成功的_Result_案例。我们可以确认我们正在处理一个成功的结果，我们有多种方法来解包值本身：

```kotlin
@Test
fun `Should handle Successful States`() {
    val result = Result.success(42)
    assertTrue(result.isSuccess)
    assertEquals(42, result.getOrNull())
    result.onSuccess {
        assertEquals(42, it)
    }
}
```

在上面的代码中，我们可以通过检查_isSuccess_属性来验证_Result_是成功的。我们还可以使用_getOrNull()_函数从_Result_中获取值。最后，我们甚至可以使用成功的结果作为lambda函数的主题_onSuccess()_，这只在_Result_成功时被调用。

### 4.2. 使用_Result_类处理失败案例

现在，让我们考虑一个失败的_Result_案例。我们将专注于确认失败并检查相关异常：

```kotlin
@Test
fun `Should handle Failure States`() {
    val result = Result.failure`````<Int>`````(Exception("We have an error!"))
    assertTrue(result.isFailure)
    assertNotNull(result.exceptionOrNull())
    result.onFailure {
        assertEquals("We have an error!", it.message)
    }
}
```

我们的测试确认了_Result_是失败的_isFailure_属性。我们可以使用_exceptionOrNull()_函数从_Result_中提取具体的错误。最后，我们可以使用_onFailure()_函数对错误执行额外的逻辑，该函数只在失败的_Result_上被调用。

## 5. 结论

Kotlin中的_Result_类型是增强代码可靠性和可读性的宝贵工具，特别是在处理错误时。我们已经看到了如何使用_runCatching()_作为_try/catch_的替代品以及它如何返回一个_Result_。然后，我们看到了如何直接创建_Result_对象的实例来显式处理错误。最后，我们学习了如何解包在_Result_中返回的成功和失败对象。

通过显式表示成功和失败的结果，开发者可以构建更健壮的应用程序，优雅地处理潜在问题。

如常，这些示例的完整实现可以在GitHub上找到。我将继续翻译剩余部分：

## 4. 如何使用 Result 类

在我们知道代码中存在特定失败条件的情况下，我们可以直接创建 Result 实例：

```kotlin
fun divide(a: Int, b: Int): Result`````<Int>````` = if (b != 0) {
    Result.success(a / b)
} else {
    Result.failure(Exception("不允许除以零"))
}
```

我们已确定不能除以零。在 divide() 函数中，我们检查除数，如果除数为零，则直接返回带有异常和错误消息的 Result.failure()。否则，我们可以执行除法并返回 Result.success() 中的值。

让我们再次测试 divide() 函数的两个路径：

```kotlin
@Test
fun `应该测试有效的除法`() {
    val firstResult = divide(10, 2)
    assertEquals(Result.success(5), firstResult)
}

@Test
fun `应该处理除以零的情况`() {
    val result = divide(10, 0)
    val expectedException = assertFailsWith``<Exception>`` {
        result.getOrThrow()
    }
    assertEquals("不允许除以零", expectedException.message)
}
```

### 4.1. 使用 Result 类处理成功案例

让我们看看一个成功的 Result 情况。我们可以确认我们正在处理一个成功的结果，并且我们有多种方法来解包值本身：

```kotlin
@Test
fun `应该处理成功的结果`() {
    val result = Result.success(42)
    assertTrue(result.isSuccess)
    assertEquals(42, result.getOrNull())
    result.onSuccess {
        assertEquals(42, it)
    }
}
```

在上述代码中，我们可以通过检查 isSuccess 属性来验证 Result 是否成功。我们还可以使用 getOrNull() 函数从 Result 中获取值。最后，我们甚至可以使用 onSuccess()，它将在 Result 成功时调用。

### 4.2. 使用 Result 类处理失败案例

现在，让我们考虑一个失败的 Result 情况。我们将专注于确认失败并检查相关异常：

```kotlin
@Test
fun `应该处理失败的结果`() {
    val result = Result.failure`````<Int>`````(Exception("我们有一个错误！"))
    assertTrue(result.isFailure)
    assertNotNull(result.exceptionOrNull())
    result.onFailure {
        assertEquals("我们有一个错误！", it.message)
    }
}
```

我们的测试确认了 Result 是失败的，使用 isFailure 属性。我们可以使用 exceptionOrNull() 函数从 Result 中提取具体的错误。最后，我们可以使用 onFailure() 函数对错误执行额外的逻辑，该函数仅在 Result 失败时调用。

## 5. 结论

Kotlin 中的 Result 类型是处理错误时增强代码可靠性和可读性的有价值工具。我们已经看到了如何使用 runCatching() 作为 try/catch 的替代品，以及它如何返回 Result。然后，我们看到了如何直接创建 Result 对象的实例来显式处理错误。最后，我们学习了如何解包 Result 中返回的成功和失败对象。

通过显式表示成功和失败的结果，开发者可以构建更健壮的应用程序，优雅地处理潜在问题。

如常，这些示例的完整实现可以在 GitHub 上找到。

OK