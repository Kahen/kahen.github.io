---
date: 2022-11-01
category:
  - Kotlin
  - Exception Handling
tag:
  - Kotlin
  - Exception
  - Conditional Throwing
head:
  - - meta
    - name: keywords
      content: Kotlin, Exception Handling, Conditional Throwing
---
# Kotlin中的条件性异常抛出

异常处理是软件开发中不可或缺的一部分。

在本教程中，我们将深入探讨Kotlin中条件性异常抛出的习惯用法，Kotlin是一种现代且简洁的编程语言。

## 2. 理解条件性抛出

条件性抛出是指基于特定条件抛出异常的做法：
```kotlin
if (condition) {
    throw SomeException(...)
}
```

与传统的`if`块检查条件并抛出异常不同，Kotlin允许我们以更简洁的方式表达这个逻辑，使我们的代码更易读，并减少了样板代码。

在本教程中，我们将看到Kotlin中处理条件性抛出的多种方式。

## 3. 使用标准的`require()`和`check()`函数

Kotlin提供了`require()`, `requireNotNull()`, `check()`和`checkNotNull()`函数来进行条件性抛出。

**如果我们想抛出一个`IllegalArgumentException`，我们可以考虑使用`require()`或`requireNotNull()`函数。**

接下来，让我们看一些使用这两个函数的例子：

```kotlin
val str = "a b c"
assertThrows``<IllegalArgumentException>`` {
    require(str.length > 10) { "The string is too short." }
}
```

`require()`是一个简单的函数。但由于它的返回类型是`Unit`，**我们不能在`require()`检查之后无缝地执行额外的操作**。要克服这个限制，我们可以**利用作用域函数，如`also()`**：

```kotlin
val upperStr = str.also {
    require(it.split(" ").size == 3) { "Format not supported" }
}.uppercase()

assertEquals("A B C", upperStr)
```

在上面的例子中，我们在`require()`检查之后流畅地调用了`uppercase()`。

**`requireNotNull(value) { optionalMessage }`如果`value`为`null`，则抛出带有给定消息的`IllegalArgumentException`：**

```kotlin
var nullableValue: String? = null
assertThrows``<IllegalArgumentException>`` {
    requireNotNull(nullableValue) { "Null is not allowed" }
}
```

与`require()`不同，`requireNotNull()`返回`value`。**这允许我们在`requireNotNull()`检查之后流畅地执行进一步的操作**：

```kotlin
nullableValue = "a b c"
val uppercaseValue = requireNotNull(nullableValue).uppercase()
assertEquals("A B C", uppercaseValue)
```

`check()`和`checkNotNull()`与`require()`和`requireNotNull()`非常相似。唯一的区别是**`check()`和`checkNotNull()`抛出的是`IllegalStateException`而不是`IllegalArgumentException`**：

```kotlin
val str = "a b c"
assertThrows```<IllegalStateException>``` {
    check(str.length > 10) { "The string is too short." }
}

var nullableValue: String? = null
assertThrows```<IllegalStateException>``` {
    checkNotNull(nullableValue) { "Null is not allowed" }
}

nullableValue = "a b c"
val uppercaseValue = checkNotNull(nullableValue).uppercase()
assertEquals("A B C", uppercaseValue)
```

## 4. 使用`takeIf() ?: throw …`

虽然像`require()`和`check()`这样的内置函数提供了便利，但**它们仅限于抛出`IllegalArgumentException`或`IllegalStateException`**。但我们经常需要处理不同的异常，例如，自定义的异常类型：

```kotlin
class MyException(msg: String) : Exception(msg)
```

解决这个问题的一种方法是使用`takeIf()`和Kotlin的Elvis运算符（`?:`）：

```kotlin
takeIf{ precondition lambda } ?: throw SomeException(...)
```

**我们依赖`takeIf()`在不满足前提条件时返回`null`，这将触发Elvis运算符的参数。**

接下来，让我们看一个例子：

```kotlin
val str = "a b c"
assertThrows```<MyException>``` {
    str.takeIf { it.length > 10 } ?: throw MyException("The string is too short.")
}
```

除了支持所有异常类型，由于`takeIf()`是一个扩展函数，**我们可以从接收者对象**（本例中的`str`）**直接调用它，并在`takeIf()`的lambda中轻松引用接收者对象**。

然而，这种方法有一个限制：**它不能处理我们认为`null`是有效值的情况。**这是因为**“`?: throw …`”将在`receiverObj.takeIf(precondition)`返回`null`时触发**，并且**`receiverObj.takeIf(precondition)`返回`null`有两种情况**：

- 前提函数返回`false`
- 前提函数返回`true`，但`receiverObj`是`null`

一个例子可以清楚地展示这个场景：

```kotlin
val nullIsValid: String? = null
assertThrows```<MyException>``` {
    nullIsValid.takeIf { true } ?: throw MyException("The string is too short.")
}
```

因此，**如果`null`是一个有效的情况，我们不应该使用这种方法**。

## 5. `throwIf()`函数

执行条件性抛出的另一个想法是**创建一个包装“`if (…) throw …`”块的函数，使其更易于使用**：

```kotlin
inline fun throwIf(throwCondition: Boolean, exProvider: () -> Exception) {
    if (throwCondition) throw exProvider()
}
```

正如上面的代码所示，`throwIf()`函数有两个参数。第一个是`Boolean`中的条件，另一个是**提供`Exception`实例的函数**。

接下来，让我们通过一个例子看看如何使用`throwIf()`：

```kotlin
val str = "a b c"
assertThrows```<MyException>``` {
    throwIf(str.length `<= 10) { MyException("The string is too short.") }
}
```

正如我们所看到的，`throwIf()`提高了条件性抛出的可读性。值得一提的是，由于`exProvider`参数是一个函数，**_{MyException(“…”)}_只有在`throwCondition`为`true`时才执行**。本质上，**`exProvider`懒加载地提供`Exception`实例，从而避免了创建不必要的对象**。

由于`throwIf()`返回`Unit`，如果我们想在`throwIf()`之后无缝执行进一步的操作，我们可以使用同样的技巧，通过**利用`also()`函数**：

```kotlin
val uppercaseValue = str.also {
    throwIf(it.split(" ").size != 3) { MyException("Format not supported") }
}.uppercase()
assertEquals("A B C", uppercaseValue)
```

## 6. `mustHave()`函数

到目前为止，我们已经看到了执行Kotlin中习惯用法的条件性抛出的不同方法。它们可能对我们日常任务的大部分都足够了。然而，如果我们仔细考虑，它们有各种缺点：

- 异常类型限制——`check()/require()`
- 不是功能性/流畅的API——`check()/require()`和`throwIf()`
- `null`处理限制——`takeIf()`

所以，接下来，让我们总结一下**我们希望条件性抛出函数具备的理想特性**：

- 支持所有异常类型
- 扩展函数——使任何对象都能成为接收者并直接调用它
- 如果没有抛出异常，则返回接收者对象——允许流畅地链接操作
- 异常提供者作为函数——支持复杂的错误处理逻辑和延迟对象实例化
- 条件作为函数——适应更复杂的检查
- 接收者作为异常提供者和条件函数中的参数——简化了在这些函数中引用接收者

接下来，让我们尝试创建一个满足我们需求的函数：

```kotlin
inline fun <T : Any?>` T.mustHave(
    otherwiseThrow: (T) -> Exception = { IllegalStateException("mustHave check failed: $it") },
    require: (T) -> Boolean
): T {
    if (!require(this)) throw otherwiseThrow(this)
    return this
}
```

`mustHave()`函数接受两个参数，都是函数。`otherwiseThrow`**有一个默认值，一个返回`IllegalStateException`对象的函数**。也就是说，**如果没有指定特定的异常提供者，如果`require`不满足，将抛出`IllegalStateException`**。

接下来，让我们通过例子看看如何使用`mustHave()`。假设我们有一个简单的数据类`Player`，以及`InvalidPlayerException`类：

```kotlin
data class Player(val id: Int, val name: String, val score: Int)
class InvalidPlayerException(message: String) : RuntimeException(message)
```

现在，我们想要在玩家的分数为负数时抛出异常：

```kotlin
val kai = Player(1, "Kai", -5)
assertThrows```<IllegalStateException>``` { kai.mustHave { it.score >= 0 }
    .also { ex -> assertEquals("mustHave check failed: Player(id=1, name=Kai, score=-5)", ex.message) }
}

```

正如我们所看到的，我们提供了一个lambda来检查玩家是否有效。在这个例子中，我们简单地检查了`score`值。如果需要，**lambda可以包含复杂的实现**继续翻译：

当然，我们没有指定`otherwiseThrow`参数，所以默认抛出了`IllegalStateException`。当然，我们可以传递一个函数来要求`mustHave()`抛出指定的异常：

```kotlin
assertThrows`<InvalidPlayerException>` {
    kai.mustHave(
        require = { it.score >= 0 },
        otherwiseThrow = { InvalidPlayerException("Player [id=${it.id}, name=${it.name}] is invalid") }
    )
}.also { ex -> assertEquals("Player [id=1, name=Kai] is invalid", ex.message) }
```

**我们使用命名参数使代码易于阅读**。另外值得一提的是，由于接收者是`require`和`otherwiseThrow`函数的参数，我们可以在lambda表达式中轻松引用接收者。例如，**我们可以在两个lambda表达式中使用隐式变量“_it_”**。

最后，如果接收者对象通过了`require`检查，**`mustHave()`允许我们无缝地链接进一步的操作来处理接收者**：

```kotlin
val liam = Player(2, "Liam", 42)
val upperDescription = liam.mustHave(
    require = { it.score >= 0 },
    otherwiseThrow = { InvalidPlayerException("Player [id=${it.id}, name=${it.name}] is invalid") }
).let { "${it.name} : ${it.score}".uppercase() }

assertEquals("LIAM : 42", upperDescription)
```

## 7. 结论

在本文中，我们旨在发现Kotlin中处理条件性异常抛出的简洁和习惯用法。我们探讨了内置选项和几种自定义函数，如`throwIf()`和`mustHave()`。

如往常一样，示例的完整源代码可在GitHub上获得。

![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png)![img](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK