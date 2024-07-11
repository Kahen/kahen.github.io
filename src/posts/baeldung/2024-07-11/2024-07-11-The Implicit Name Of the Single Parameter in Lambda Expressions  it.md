---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - Lambda Expressions
head:
  - - meta
    - name: keywords
      content: Kotlin, Lambda Expressions, it, implicit parameter
------
# Kotlin中单参数Lambda表达式的隐式名称：it

Lambda表达式是Kotlin中用于编写简洁且富有表现力代码的强大工具。此外，我们可以在Lambda表达式中使用默认的隐式参数_it_。

在本教程中，我们将探索_it_是什么，以及如何提高我们的Lambda表达式的可读性。

## 2. 问题介绍

首先，让我们看一个在Lambda表达式中使用_it_作为参数名称的例子：

```kotlin
val result = listOf("Kai", "Liam", "Eric", "Kevin")
  .filter { it.length == 4 }
  .map { it.uppercase() }
  .sortedBy { it }
assertEquals(listOf("ERIC", "LIAM"), result)
```

当我们阅读上面的代码时，它非常直接。我们以一个名字列表作为输入。首先，我们过滤长度为四的_String_值。然后，过滤后的_String_元素被转换为大写并排序。

我们使用Lambda表达式执行每个处理。在这个例子中，带有_it_参数的Lambda表达式使函数调用流畅且易于理解。

接下来，让我们再看一个例子。我们将使用相同的名单作为输入，但这次，我们的目标是对_String_值进行编码。我们将通过将每个字符替换为其ASCII码加一来实现这一点。例如，‘_K_’将被转换为‘_L_’，‘_a_’在编码过程后将变成‘_b_’：

```kotlin
val result = listOf("Kai", "Liam", "Eric", "Kevin").map {
  it.map {
    (it + 1).also { log.debug("Char After: $it") }
  }.joinToString(separator = "")
}
assertEquals(listOf("Lbj", "Mjbn", "Fsjd", "Lfwjo"), result)
```

正如上面的代码所示，我们继续使用Lambda表达式和默认的隐式_it_参数来执行编码逻辑。然而，**由于代码中的嵌套Lambda表达式，_it_参数所指的可能不是立即明显的**。例如，在示例代码中，_it_可以表示列表中的_String_元素，字符，以及编码后的字符。

接下来，让我们更仔细地检查_it_参数，并探索如何提高Lambda表达式的可读性。

## 3. 它是什么？

**当Lambda表达式只接受一个参数时，Kotlin提供了省略显式参数声明的选项，而是隐式地使用_it_来引用它。**

我们经常在内置函数如_let()_、_also()_以及我们之前看到的函数中使用隐式参数_it_。但它并不局限于内置函数。

接下来，让我们创建一个_Long_类的扩展函数作为例子：

```kotlin
fun Long.calc(desc: String, operation: (Long) -> Long) = "$desc($this) = ${operation(this)}"
```

**calc()_扩展函数的第二个参数（_operation_）是一个函数**。进一步地说，**这个函数只有一个_Long_参数**。因此，当我们将Lambda表达式作为_operation_参数传递时，我们可以使用隐式的_it_参数：

```kotlin
val negateOutput = 2L.calc("negate") { -it }
assertEquals("negate(2) = -2", negateOutput)

val squareOutput = 2L.calc("square") { it * it }
assertEquals("square(2) = 4", squareOutput)
```

正如我们所看到的，这种优雅的简写简化了代码并提高了可读性，特别是对于简短且直接的操作。

## 4. 提高可读性

现在我们已经理解了_it_是什么，让我们探索如何在_it_可能导致歧义时提高Lambda表达式的可读性。

### 4.1. 用显式参数名覆盖_it_

在Kotlin中，**我们可以通过在格式为“_ParamName ->_”中显式声明参数名称来覆盖Lambda表达式中的隐式_it_参数**。这允许代码更透明地理解，**特别是在嵌套Lambda表达式可能引起混淆的情况下**。

让我们以前面的_String_编码示例来展示如何使用显式参数：

```kotlin
val result = listOf("Kai", "Liam", "Eric", "Kevin").map { name ->
  name.map { originalChar ->
    (originalChar + 1).also { resultChar -> log.debug("Char After: $resultChar") }
  }.joinToString(separator = "")
}
assertEquals(listOf("Lbj", "Mjbn", "Fsjd", "Lfwjo"), result)
```

在这个例子中，我们在Lambda表达式中显式命名了参数。现在，当阅读代码时，Lambda表达式内参数的目的没有歧义。

### 4.2. 使用解构声明

**我们还可以使用Kotlin的解构声明来覆盖_it_参数以提高可读性**。接下来，让我们通过一个例子看看如何实现它：

```kotlin
val players = listOf("Kai" to 42, "Liam" to 50, "Eric" to 27, "Kevin" to 49)
```

在_players_列表中，我们有四个_Pair_实例。每个_Pair_包含一个玩家的名字（_String_）和分数（_Int_）。我们的目标是生成一个简单的玩家报告：

```kotlin
val expectedOutput = listOf(
  "Kai's score: 42",
  "Liam's score: 50",
  "Eric's score: 27",
  "Kevin's score: 49"
)
```

我们可以使用_it_来实现这一点：

```kotlin
val output1 = players.map { "${it.first}'s score: ${it.second}" }
assertEquals(expectedOutput, output1)
```

然而，在阅读或编写此代码时，可能需要回顾_player’s_声明以检查_it.first_和_it.second_代表什么。

或者，我们可以使用解构声明来覆盖_it_，使代码更容易理解：

```kotlin
val output2 = players.map { (player, score) -> "$player's score: $score" }
assertEquals(expectedOutput, output2)
```

## 5. 结论

在本文中，我们探索了Kotlin的Lambda表达式，并发现隐式的_it_参数可能导致歧义，特别是在嵌套Lambda表达式中。然后，我们讨论了如何通过使用显式参数覆盖_it_来提高代码的可读性。

如常，示例的完整源代码可在GitHub上找到。