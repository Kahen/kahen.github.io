---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Array
  - String
  - Conversion
head:
  - - meta
    - name: keywords
      content: Kotlin, Array, String, Conversion
------
# 将数组转换为字符串 | Baeldung 关于 Kotlin## 将数组转换为字符串 | Baeldung 关于 Kotlin

在本教程中，我们将讨论如何在 Kotlin 中将数组内容转换为字符串。首先，我们将探索四种不同的方法来实现这一点。然后，我们将根据它们的简洁性、不可变性和简单性进行比较。

我们将从内置方法 `contentToString()` 开始，该方法内部使用 Java 的静态方法 `Arrays.toString()`。之后，我们将学习如何使用 `reduce()` 和 `fold()` 聚合元素。最后，我们将通过在简单的 for 循环中连接元素来实现相同的功能。

### 2. `contentToString()`
**`contentToString()` 方法是将数组内容转换为字符串的直接方式。** 此方法返回一个包含数组中所有元素的字符串，元素之间用逗号分隔：

```kotlin
val stringArray: Array``<String>`` = arrayOf("java", "kotlin", "scala")
assertEquals("[java, kotlin, scala]", stringArray.contentToString())
```

此外，如果我们在非字符串元素的数组上调用 `contentToString()`，将首先调用 `toString()` 方法：

```kotlin
val intArray: IntArray = intArrayOf(9, 8, 7, 6)
assertEquals("[9, 8, 7, 6]", intArray.contentToString())
```

这是一种快速将内容转换为字符串的便捷方式，对于日志记录和调试非常有用。然而，我们将无法控制结果字符串的结构。例如，如果我们想要去掉外围的方括号或使用不同的分隔符，我们将需要调用其他方法，如 `replace()`。

### 3. `reduce()`
**`reduce()` 方法提供了更多的灵活性，允许我们完全控制结果字符串的结构。** 例如，我们可以使用它来去掉外围的方括号，并将元素用分号而不是逗号连接：

```kotlin
val stringArray: Array``<String>`` = arrayOf("java", "kotlin", "scala")

val result = stringArray.reduce { result, nr -> "$result; $nr" }

assertEquals("java; kotlin; scala", result)
```

`reduce()` 方法将多个元素聚合成一个类型的结果元素。因此，如果我们不是从一个字符串数组开始，我们将需要手动 `map()` 元素到它们的字符串等价物：

```kotlin
val intArray: IntArray = intArrayOf(9, 8, 7, 6)

val result = intArray
  .map { it.toString() }
  .reduce { result, nr -> "$result; $nr" }

assertEquals("9; 8; 7; 6", result)
```

正如我们所注意到的，这种方法让我们完全控制最终结果的结构。首先，我们可以自定义 `map()` 方法来定义每个元素作为字符串的显示方式。然后，我们可以指定这些元素应该如何通过 `reduce()` 连接在一起。

### 4. `fold()`
**我们还可以使用 `fold()` 方法来实现这一点，它的功能类似于 `reduce()`，但提供了修改聚合类型的额外灵活性。** 这使我们能够完全跳过 `map()` 步骤，并在我们的场景中提供一个默认值，例如空字符串。

然而，我们传递给 `fold()` 方法的空字符串将用作中间结果变量的初始值。因此，我们需要添加一个 if 语句，以避免在字符串开头添加额外的分号：

```kotlin
val intArray: IntArray = intArrayOf(9, 8, 7, 6)

val result = intArray.fold("") { result, nr ->
    if (result.isEmpty()) "$nr" else "$result; $nr"
}

assertEquals("9; 8; 7; 6", result)
```

### 5. `for` 循环
**最后，我们可以使用一个简单的 `for` 循环和一个字符串变量，我们不断地向其中追加元素。** 让我们从初始化这个字符串为数组的第一个元素开始，然后当我们迭代集合时更新它：

```kotlin
val intArray: IntArray = intArrayOf(9, 8, 7, 6)

var result = intArray[0].toString()
for (i in 1 until intArray.size) {
    result += "; ${intArray[i]}"
}

assertEquals("9; 8; 7; 6", result)
```

### 6. 结论
在本教程中，我们探索了将数组内容转换为字符串的四种不同方式。我们首先研究了内置方法 `contentToString()`。之后，我们探索了从函数式编程继承的方法，如 `reduce()` 和 `fold()`。最后，我们讨论了使用简单的 `for` 循环和一个非最终字符串变量的不那么声明性的解决方案。

如常，示例的源代码可在 GitHub 上获取。

OK