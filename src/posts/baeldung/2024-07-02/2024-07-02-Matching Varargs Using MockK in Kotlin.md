---
date: 2022-11-01
category:
  - Kotlin
  - MockK
tag:
  - MockK
  - varargs
head:
  - - meta
    - name: keywords
      content: Kotlin, MockK, varargs, 测试, 模拟
---
# MockK 在 Kotlin 中匹配可变参数的使用

MockK 是一个功能强大的 Kotlin 测试模拟库。当涉及到使用可变参数（varargs）的函数时，MockK 提供了优雅的解决方案。

在本教程中，我们将学习如何使用 MockK 来模拟带有 vararg 参数的函数。

## 2. MockK 对 Varargs 的支持

首先，我们创建一个带有 vararg 参数的基本函数。这将使我们能够演示如何模拟一个函数并有效地匹配 vararg 参数：

```kotlin
class MyClass {
    fun joinBySpace(vararg strings: String): String {
        return strings.joinToString(separator = " ")
    }
}
```

joinBySpace() 函数非常简单。顾名思义，它使用空格作为分隔符连接任意数量的 String 值：

```kotlin
val result = MyClass().joinBySpace("a", "b", "c", "d", "e")
assertEquals("a b c d e", result)
```

**从 1.9.1 版本开始，MockK 引入了强大的 vararg 匹配器**，提供了灵活的参数匹配功能。**我们将深入探讨三个关键匹配器：anyVararg()，varargAll() 和 varargAny()。**

首先，让我们为我们的 MyClass 初始化一个模拟对象：

```kotlin
val mockkObj = mockk`<MyClass>`()
```

**我们将在整个教程中使用 mockkObj 对象来模拟 joinBySpace()。**

当使用 anyVararg()，varargAll() 或 varargAny() 来匹配 vararg 参数时，我们遵循一致的模式：**_FunctionToStub(optional prefix elements, *VarargMatcherFun(), optional suffix elements)_**，其中 VarargMatcherFun() 表示匹配器函数，如 anyVararg()，varargAll() 等。

让我们看一个例子：

```kotlin
every { mockkObj.joinBySpace("a", "b", "c", *anyVararg(), "x", "y", "z") } ...
```

在 MockK 的 vararg 匹配中，前缀和后缀元素都是可选的。但是，如果提供了它们，它们将有助于参数匹配检查。**VarargMatcherFun() 匹配前缀和后缀元素之间的元素。**

需要注意的是，**所有内置的 vararg 匹配器都是返回数组的函数**。因此，**我们使用展开运算符 (*) 确保它们作为 vararg 参数正确传递。**

接下来，让我们更仔细地检查 anyVararg()，varargAll() 和 varargAny() 匹配器。

## 3. anyVararg() 匹配器

anyVararg() 函数**不需要任何参数**。它的用途是**匹配 vararg 中的任何数量的元素，这些元素可以是任何值。**一个例子可以清楚地展示它的工作原理：

```kotlin
every { mockkObj.joinBySpace("a", "b", "c", *anyVararg(), "x", "y", "z") } returns "Wow, Kotlin rocks!"

val result = mockkObj.joinBySpace("a", "b", "c", "Baeldung", "is", "cool", "x", "y", "z")
assertEquals("Wow, Kotlin rocks!", result)

val result2 = mockkObj.joinBySpace("a", "b", "c", "x", "y", "z")
assertEquals("Wow, Kotlin rocks!", result2)
```

## 4. varargAll() 匹配器

使用 varargAll()，**我们可以指定一个 lambda 来建立一个条件，即所有 vararg 元素（不包括前缀和后缀）必须满足**。lambda 接受一个 vararg 元素作为输入并返回一个 Boolean。

接下来，让我们看一个例子：

```kotlin
every { mockkObj.joinBySpace("a", "b", "c", *varargAll { it.startsWith("d") }, "z") } returns "Wow, Kotlin rocks!"

val result = mockkObj.joinBySpace("a", "b", "c", "d1", "d2", "d-whatever", "z")
assertEquals("Wow, Kotlin rocks!", result)
```

在上面的代码中，使用 varargAll() 定义的匹配规则**确保它所覆盖的所有元素都以字母‘d’开头**。如果任何元素偏离了这个规则，lambda 返回 false。因此，我们的存根将不会被调用：

```kotlin
assertThrows```````<MockKException>``````` {
    mockkObj.joinBySpace("a", "b", "c", "d1", "Baeldung", "z")
}.also { exception ->
    assertTrue(exception.message!!.startsWith("no answer found"))
}
```

在上面的例子中，值 “Baeldung” 不以 ‘b’ 开头。因此，这个调用不匹配我们之前定义的存根。

此外，**如果 varargAll() 没有包含任何元素，模拟函数仍然可以正常工作**：

```kotlin
val result2 = mockkObj.joinBySpace("a", "b", "c", "z")
assertEquals("Wow, Kotlin rocks!", result2)
```

## 5. varargAny() 匹配器

varargAny() 函数的工作方式与 varargAll() 类似，但有一个不同的要求：**它要求至少有一个元素满足 lambda 中指定的条件。**

接下来，让我们在之前的例子中应用 varargAny()：

```kotlin
every { mockkObj.joinBySpace("a", "b", "c", *varargAny { it.startsWith("d") }, "z") } returns "Wow, Kotlin rocks!"

val result = mockkObj.joinBySpace("a", "b", "c", "d1", "d2", "d-whatever", "z")
assertEquals("Wow, Kotlin rocks!", result)

val result2 = mockkObj.joinBySpace("a", "b", "c", "d1", "Baeldung", "z")
assertEquals("Wow, Kotlin rocks!", result2)
```

这次，尽管 “Baeldung” 不以 ‘b’ 开头，但 “d1” 使 varargAny() 返回 true。因此，我们的存根匹配并被调用。

然而，**如果 varargAny() 没有覆盖任何元素，我们的存根将不匹配**：

```kotlin
assertThrows```````<MockKException>``````` {
    mockkObj.joinBySpace("a", "b", "c", "z")
}.also { exception ->
    assertTrue(exception.message!!.startsWith("no answer found"))
}
```

## 6. MockKVarargScope 的 nArgs 和 position

我们已经讨论了 varargAny() 和 varargAll() 在类似上下文中的工作方式。它们都依赖于一个 lambda 来评估相应的元素是否满足某些条件。现在，让我们深入了解它们的函数定义：

```kotlin
inline fun ``<reified T : Any>`` varargAll(noinline matcher: MockKVarargScope.(T) -> Boolean)

inline fun ``<reified T : Any>`` varargAny(noinline matcher: MockKVarargScope.(T) -> Boolean)
```

正如我们所看到的，matcher 参数不仅仅是 (T) -> Boolean，而是 MockKVarargScope.(T) -> Boolean。这意味着 **lambda 也作为 MockKVarargScope 类的扩展函数，使其能够使用 MockKVarargScope 提供的属性**。

接下来，让我们看看 MockKVarargScope 类的定义：

```kotlin
class MockKVarargScope(val position: Int, val nArgs: Int)
```

MockKVarargScope 类定义了两个属性：

- position – 表示当前元素在 vararg 参数中的索引（从零开始）
- nArgs – 表示 vararg 参数中的总元素数量

需要强调的是，**position 和 nArgs 属性都包括前缀和后缀中的所有元素**。

接下来，让我们看看如何在 varargAll() 和 varargAny() 中使用这些属性。

### 6.1. nArgs 属性

**我们可以直接在 lambda 表达式中使用 nArgs 属性来执行有关 vararg 参数大小的检查。**

接下来，让我们以 varargAll() 为例来展示它如何工作：

```kotlin
every { mockkObj.joinBySpace("a", "b", "c", *varargAll { nArgs > 6 }, "z") } returns "Wow, Kotlin rocks!"

val result = mockkObj.joinBySpace("a", "b"c", "Baeldung", "is", "cool", "z")
assertEquals("Wow, Kotlin rocks!", result)
```

如代码所示，我们为 joinBySpace() 创建了一个存根。此外，它检查 vararg 参数是否至少包含七个元素，如果是，则返回预定义的值。

否则，存根将不会被调用：

```kotlin
assertThrows```````<MockKException>``````` {
    mockkObj.joinBySpace("a", "b", "c", "Baeldung", "z")
}.also { exception ->
    assertTrue(exception.message!!.startsWith("no answer found"))
}
```

由于 nArgs 表示 vararg 参数中的元素计数，**varargAll { nArgs > 6 } 和 varargAny { nArgs > 6 } 没有区别**：

```kotlin
every { mockkObj.joinBySpace("a", "b", "c", *varargAny { nArgs > 6 }, "z") } returns "Wow, Kotlin rocks!"

val result = mockkObj.joinBySpace("a", "b", "c", "Baeldung", "is", "cool", "z")
assertEquals("Wow, Kotlin rocks!", result)

assertThrows```````<MockKException>``````` {
    mockkObj.joinBySpace("a", "b", "c", "Baeldung", "z")
}.also { exception ->
    assertTrue(exception.message!!.startsWith("no answer found"))
}
```

### 6.2. position 属性

同样地，**position 属性允许我们在传递给 varargAll() 和 varargAny() 的 lambda 中进行基于元素索引的检查**。

再次以 varargAll() 为例来演示如何在 lambda 中使用 position：

```kotlin
every {
    mockkObj.joinBySpace(
        "a", "b", "c", *varargAll { if (position % 2 == 0) it == "E" else it == "O" }, "z"
    )
} returns "Wow, Kotlin rocks!"

val result = mockkObj.joinBySpace("a", "b", "c", "O", "E", "O", "E", "z")
assertEquals("Wow, Kotlin rocks!", result)
```

在这个例子中，我们指定了 **varargAll() 所覆盖的元素，如果它们的位置是偶数，则元素应该是 “E”。否则，需要一个 “O” 元素。**

由于我们使用了 varargAll() 匹配器，**任何违反指定规则的元素都会导致不匹配的条件**：

```kotlin
assertThrows```````<MockKException>``````` {
    mockkObj.joinBySpace("a", "b", "c", "Baeldung", "z")
}.also { exception ->
    assertTrue(exception.message!!.startsWith("no answer found"))
}

assertThrows```````<MockKException>``````` {
    mockkObj.joinBySpace("a", "b", "c", "O", "Baeldung", "is", "cool", "z")
}.also { exception ->
    assertTrue(exception.message!!.startsWith("no answer found"))
}
```

然而，如果我们将上面的例子中的 varargAll() 替换为 varargAny() 匹配器，**varargAny() 匹配器只要至少有一个元素符合 position 规则就认为它是匹配的**：

```kotlin
every {
    mockkObj.joinBySpace(
        "a", "b", "c", *varargAny { if (position % 2 == 0) it == "E" else it == "O" }, "z"
    )
} returns "Wow, Kotlin rocks!"

assertThrows```````<MockKException>``````` {
    mockkObj.joinBySpace("a", "b", "c", "Baeldung", "z")
}.also { exception ->
    assertTrue(exception.message!!.startsWith("no answer found"))
}

val result = mockkObj.joinBySpace("a", "b", "c", "O", "Baeldung", "is", "cool", "z")
assertEquals("Wow, Kotlin rocks!", result)
```

## 7. 结论

在本文中，我们深入探讨了如何使用 MockK 的 anyVararg()，varargAll() 和 varargAny() 匹配器来为模拟对象中的函数创建存根。此外，我们还展示了示例，说明如何在 varargAll() 和 varargAny() 中使用 MockKVarargScope 的属性。

如常，示例的完整源代码可在 GitHub 上获得。

[Baeldung Kotlin Logo](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg)[Kotlin Sublogo](https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png)[Gravatar Image](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)[Baeldung Whiteleaf Icon](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK