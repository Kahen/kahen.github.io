---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - Lambda
  - Return
head:
  - - meta
    - name: keywords
      content: Kotlin, Lambda, Return, Functional Programming
---
# Kotlin中Lambda内使用return的用法

在Kotlin中，函数是一等公民。此外，Lambda表达式提供了一种简洁而强大的方式表达功能。这些匿名函数使我们能够编写更具表现力的代码。

然而，由于Lambda的特性及其隐含的返回行为，Lambda内使用_return_关键字最初可能看起来令人困惑。在本教程中，我们将探索Kotlin中Lambda内_return_的使用。

## 2. 问题介绍

虽然Lambda通常依赖于隐式返回，但有时可能需要显式返回以处理复杂逻辑或跳出嵌套结构。

接下来，让我们看一个在Lambda中使用_return_的例子。

### 2.1. 一个例子

假设我们从另一个系统接收到一个字符串消息：

```kotlin
val input = """
    T, T, T, T, T, T
    F, O, F, O, F, O
    T, F, O, F
    T, O, T, O, T, O
    T, X, T, X, T, X
    F, F, F, F, F, F
""".trimIndent()
```

如我们所见，输入是一个多行字符串。我们的任务是解析这个输入，并将有效值提取到所需的数据格式。

每行应该恰好包含六个用逗号分隔的字段。**我们放弃包含多于或少于六个字段的行**，例如输入中的第三行。

**有效的字段值是_T（真）_, _F（假）_和_O（空）_。**我们将它们映射到_Answer_枚举：

```kotlin
enum class Answer {
    True, False, Empty
}
```

由于外部系统故障，某些行包含无效字段。例如，第五行包含三个_X_字母。只要行有六个字段，**我们取有效字段并跳过无效的**。

因此，如果我们解析了输入示例，我们应该得到一个列表列表：

```kotlin
val expectedResult = listOf(
    listOf(True, True, True, True, True, True),
    listOf(False, Empty, False, Empty, False, Empty),
    listOf(True, Empty, True, Empty, True, Empty),
    listOf(True, True, True),
    listOf(False, False, False, False, False, False),
)
```

接下来，让我们编写一个函数来解析输入。

### 2.2. 处理输入

我们将创建一个函数来解析输入并填充一个预先声明的_resultList_变量：

```kotlin
lateinit var resultList: MutableList`<List````<Answer>`````>
fun processInputV1(input: String) {
    resultList = mutableListOf()
    input.lines().forEach { line ->
        val fields = line.split(", ")
        if (fields.size != 6) return
        val answerList: MutableList````<Answer>```` = mutableListOf()
        fields.forEach { field ->
            answerList += when (field) {
                "T" -> True
                "F" -> False
                "O" -> Empty
                else -> return
            }
        }
        resultList += answerList
    }
}
```

在上面的函数中，我们使用嵌套的_forEach_来解析输入。此外，我们两次使用_return_关键字：

- 在外部_forEach_ - “_if (fields.size != 6) return_”如果字段数量不是六则跳过整行
- 在内部_forEach_ - _when(field){ … else -> return}_如果当前字段无效则跳过当前字段

接下来，让我们测试我们的函数，看看它是否按预期工作。

### 2.3. 测试函数

让我们首先创建一个函数来“漂亮打印”_resultList_内容。

```kotlin
fun printResult() {
    log.info(
        """
           |处理后的结果：
           |----------------
           |${resultList.joinToString(separator = System.lineSeparator()) { "$it" }}
           |----------------
        """.trimMargin())
}
```

如果我们将输入传递给我们的_processInputV1()_，结果表明函数没有按预期工作：

```kotlin
processInputV1(input)
assertNotEquals(expectedResult, resultList)
printResult()
```

让我们看看_resultList_的值：

```kotlin
处理后的结果：
----------------
[True, True, True, True, True, True]
[False, Empty, False, Empty, False, Empty]
----------------
```

**输出显示我们丢弃了第三行，这是我们想要的。但是，整个过程就停在那里了。**

接下来，让我们找出为什么会发生这种情况以及如何修复这个问题。

## 3. 返回到标签

我们的处理在外部_forEach_中的_return_语句处停止了。这是因为**_return_语句使包含函数_processInputV1()_“返回”**。但我们希望_return_语句返回当前Lambda以跳过当前行，并从外部_forEach_中取下一行。

所以接下来，让我们看看如何实现它。

### 3.1. 返回到_forEach_标签

在Kotlin中，**当我们在Lambda表达式中使用_return_关键字时，我们可以选择是返回当前Lambda表达式还是使用标签返回包含函数**。

例如，如果我们想_返回_外部_forEach_的当前Lambda，我们可以使用_return@forEach_：

```kotlin
fun processInputV2(input: String) {
    resultList = mutableListOf()
    input.lines().forEach { line ->
        val fields = line.split(", ")
        if (fields.size != 6) return@forEach
        val answerList: MutableList````<Answer>```` = mutableListOf()
        fields.forEach { field ->
            answerList += when (field) {
                "T" -> True
                "F" -> False
                "O" -> Empty
                else -> return
            }
        }
        resultList += answerList
    }
}
```

现在，让我们用_processInputV2()_函数解析输入。它仍然没有按预期工作：

```kotlin
processInputV2(input)
assertNotEquals(expectedResult, resultList)
printResult()
```

接下来，让我们看看处理在哪里停止了：

```kotlin
处理后的结果：
----------------
[True, True, True, True, True, True]
[False, Empty, False, Empty, False, Empty]
[True, Empty, True, Empty, True, Empty]
----------------
```

输出显示我们已经跳过了输入中的第三行。但是内部的_forEach_中的_return_语句返回了包含函数_processInputV2_。这次，我们知道如何修复问题。所以，让我们**将_@forEach_标签添加到_return_关键字**：

```kotlin
fun processInputV3(input: String) {
    resultList = mutableListOf()
    input.lines().forEach { line ->
        val fields = line.split(", ")
        if (fields.size != 6) return@forEach
        val answerList: MutableList````<Answer>```` = mutableListOf()
        fields.forEach { field ->
            answerList += when (field) {
                "T" -> True
                "F" -> False
                "O" -> Empty
                else -> return@forEach
            }
        }
        resultList += answerList
    }
}
```

现在，如果我们运行测试，我们得到预期的结果：

```kotlin
processInputV3(input)
assertEquals(expectedResult, resultList)
```

我们可能已经意识到**两个_return_语句都带有_@forEach_标签**。当然，编译器知道哪个_@forEach_标签指示哪个Lambda。然而，当我们阅读代码时，**带有相同标签的多个返回可能不容易理解**。

接下来，让我们改进这一点。

### 3.2. 返回到自定义标签

Kotlin允许我们在Lambda之前定义我们自己的标签，按照“_labelName@_”格式，并在_return_语句中引用定义的标签。接下来，让我们在输入处理函数中添加两个有意义的标签：

```kotlin
fun processInputV4(input: String) {
    resultList = mutableListOf()
    input.lines().forEach lineProcessing@{ line ->
        val fields = line.split(", ")
        if (fields.size != 6) return@lineProcessing
        val answerList: MutableList````<Answer>```` = mutableListOf()
        fields.forEach answerProcessing@{ field ->
            answerList += when (field) {
                "T" -> True
                "F" -> False
                "O" -> Empty
                else -> return@answerProcessing
            }
        }
        resultList += answerList
    }
}
```

最后，带有自定义标签的_processInputV4()_函数通过了测试：

```kotlin
processInputV4(input)
assertEquals(expectedResult, resultList)
```

## 4. 结论

在本文中，我们探讨了如何在Kotlin中Lambda内使用_return_关键字。

Kotlin的返回到标签功能使我们能够编写更灵活和富有表现力的代码，平衡了简洁性和控制。