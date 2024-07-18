---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Kotlin
  - Arrays
  - Printing
head:
  - - meta
    - name: keywords
      content: Kotlin, Arrays, Printing
------
# 在 Kotlin 中一行打印所有字符串数组元素

在 Kotlin 中，处理数组是一项常见任务，将所有元素打印在一行上是一个简单但必不可少的操作。

在本教程中，我们将探索实现这一目标的有效方法，强调 Kotlin 代码的可读性和简洁性。

## 2. 问题介绍

我们知道我们可以直接使用 `println()` 函数来打印一个列表，输出列表元素在一行中，例如：

```kotlin
println(listOf("A", "B", "C", "D", "E", "F"))
// 输出: [A, B, C, D, E, F]
```

然而，如果我们将 `println()` 函数应用于一个数组，Kotlin 不会打印数组的元素。相反，**输出中会出现数组类型和对象的 _hashcode_**：

```kotlin
val myArray = arrayOf("A", "B", "C", "D", "E", "F")
println(myArray)
// 输出: [Ljava.lang.String;@fdefd3f
```

通过迭代数组元素并在每个元素上调用 `println()` 允许我们将所有元素打印在输出中。然而，缺点是**输出会将每个元素显示在单独的一行上**。例如，如果我们在 `forEach` 中调用 `println()`，我们会得到以下输出：

```kotlin
myArray.forEach { println(it) }
/* 输出:
A
B
C
D
E
F
*/
```

在本教程中，我们将探索各种方法**将所有数组元素打印在一行上，以逗号分隔的格式**。

有时，元素值可能包含逗号。因此，我们将使用以下数组作为另一个输入示例，以展示如何在输出中正确分隔元素：

```kotlin
val arrayWithComma = arrayOf("A", "B, C", "D, E", "F")
```

像往常一样，我们将使用单元测试来验证每种方法是否产生预期的输出。

接下来，让我们做一些准备工作来验证 `println()` 的输出。

## 3. 使用单元测试验证输出

验证 `println()` 的输出不像检查变量值那样容易。但这对我们来说也不是挑战。让我们首先看看 Kotlin 的 `println()` 函数的实现：

```kotlin
@kotlin.internal.InlineOnly
public actual inline fun println(message: Any?) {
    System.out.println(message)
}
```

正如代码所示，`println()` 内部调用了 Java 的 `System.out.println()`。因此，我们可以借鉴单元测试 Java 的 `System.out.println()` 的方法。基本思想是**用我们自己的 _ByteArrayOutputStream_ 替换标准输出流，这样我们就可以捕获并验证输出**：

```kotlin
val stdOut = System.out
val myOutput = ByteArrayOutputStream()

@BeforeEach
fun setup() {
    System.setOut(PrintStream(myOutput))
}

@AfterEach
fun restore() {
    System.setOut(stdOut)
}
```

让我们创建一个简单的测试来看看这种方法是否有效：

```kotlin
val newLine = System.lineSeparator()

println("Hello, world")
assertEquals("Hello, world$newLine", myOutput.toString())

myOutput.reset()

println("Kotlin rocks")
assertEquals("Kotlin rocks$newLine", myOutput.toString())
```

正如上面的示例所示，**我们可以 _reset()_ 我们的输出流来检查由新的 _println()_ 调用产生的输出**。

接下来，让我们将数组的元素打印在一行上。

## 4. 将字符串数组转换为列表

我们已经看到 `println()` 可以打印一行字符串列表。因此，**我们可以将我们的数组转换为列表，并将列表传递给 _println()_**。这可能是最直接的解决方案：

```kotlin
println(myArray.asList())
assertEquals("[A, B, C, D, E, F]$newLine", myOutput.toString())
```

接下来，让我们看看我们的 `arrayWithComma` 变量。这个数组包含 “ _B, C_” 和 “ _D, E_” 两个元素。如果我们使用这种方法，我们无法在输出中区分元素：

```kotlin
myOutput.reset()

println(arrayWithComma.asList())
// 我们无法自定义输出格式
assertEquals("[A, B, C, D, E, F]$newLine", myOutput.toString())
```

因此，**由于我们在输出元素时无法自定义格式，如果某些元素包含逗号，输出可能会令人困惑**。

## 5. 在 forEach 中使用 _print()_

`println()` 函数总是在输出的末尾添加一个换行字符。然而，** _print()_ 函数不会**。

因此，**我们可以使用 _print()_ 在 _forEach_ 函数中输出每个元素**。当然，我们需要检查元素是否是最后一个，以决定是否添加分隔符或结尾的换行字符：

```kotlin
myArray.forEachIndexed { idx, e ->
    print(if (idx == myArray.lastIndex) "$e$newLine" else "$e, ")
}
assertEquals("A, B, C, D, E, F$newLine", myOutput.toString())
```

接下来，让我们以 _arrayWithComma_ 作为输入，看看如何在输出中清晰地打印每个元素：

```kotlin
myOutput.reset()

arrayWithComma.forEachIndexed { idx, e ->
    print(if (idx == arrayWithComma.lastIndex) """"$e""$newLine""" else """"$e", """)
}
assertEquals(""""A", "B, C", "D, E", "F"$newLine""", myOutput.toString())
```

正如上面的测试所示，**我们在输出中将每个元素用引号括起来，以清晰地展示数组元素**。

值得一提的是，**我们使用了 Kotlin 的原始字符串来避免转义**。

## 6. 使用 _joinToString()_ 函数

另外，我们可以利用 _Array_ 的 _joinToString()_ 扩展函数来**首先将所有元素连接为一个逗号分隔的字符串，然后将字符串传递给 _println()_**：

```kotlin
println(myArray.joinToString { it })
assertEquals("A, B, C, D, E, F$newLine", myOutput.toString())
```

正如 **我们在 _joinToString()_ 的 lambda 表达式中完全控制元素的输出格式**，输出中引用每个元素是一个简单的任务：

```kotlin
myOutput.reset()

println(arrayWithComma.joinToString { """"$it"""" })
assertEquals(""""A", "B, C", "D, E", "F"$newLine""", myOutput.toString())
```

## 7. 结论

在本文中，我们探讨了在 Kotlin 中将所有字符串数组元素打印在一行上的不同方法。此外，我们还讨论了如何通过示例对 _println()_ 的输出进行单元测试。

一如既往，示例的完整源代码可在 GitHub 上获取。