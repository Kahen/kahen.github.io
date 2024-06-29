---
date: 2022-11-01
category:
  - Kotlin
  - 高阶函数
tag:
  - Kotlin
  - 高阶函数
  - 函数式编程
head:
  - - meta
    - name: keywords
      content: Kotlin, 高阶函数, 函数式编程
---
# Kotlin中将函数作为参数传递给另一个函数的概述

Kotlin以其简洁的语法和强大的功能，提供了多种实现效率和可读性的方法。其中一项特性是将函数作为参数传递给其他函数的能力，这被称为高阶函数。这种能力允许我们编写更灵活、可重用的代码，使我们能够编写更干净、更富有表现力的程序。

在本教程中，我们将简要讨论Kotlin的高阶函数，并探索如何将函数作为参数传递给高阶函数。

## 2. 关于高阶函数的一些话

**在Kotlin中，函数是一等公民，这意味着它们可以被当作值来对待。** 这包括将函数作为参数传递给其他函数、从函数返回函数以及将函数赋值给变量。

**接受其他函数作为参数或返回它们的函数被称为高阶函数。**

接下来，让我们看一个例子：

```kotlin
fun joinByOperation(theList: List```````<String>```````, operation: (List```````<String>```````) -> String): String {
    return operation(theList)
}
```

_joinByOperation()_ 函数接受两个参数。第一个是_String_值的列表，另一个是将_String_值列表转换为_String_的函数。

接下来，让我们看看如何将函数作为参数传递给_joinByOperation()_。

## 3. 将Lambda表达式作为函数传递

**Lambda表达式实际上是Kotlin中的匿名函数。** 因此，我们可以像这样将Lambda表达式作为函数传递给_joinByOperation()_：

```kotlin
joinByOperation(aStringList, { lambda expression })
```

此外，**当函数的最后一个参数是函数时，Kotlin允许我们将Lambda表达式放在括号外面**：

```kotlin
joinByOperation(aStringList) { lambda expression }
```

这被称为尾随Lambda。

接下来，让我们看看如何将Lambda传递给函数：

```kotlin
val input = listOf("a b c", "d e f", "x y z")
val result1 = joinByOperation(input) { theList ->
    theList.joinToString(separator = " ") { str -> str.reversed() }.replace(" ", ", ")
}
assertEquals("c, b, a, f, e, d, z, y, x", result1)
```

正如上面的代码所示，我们传递了一个Lambda来反转列表中的每个_String_，然后将它们连接起来，最后，在每个空格前加上一个逗号。

高阶函数的一个优点是它们的灵活性。例如，我们可以传递另一个Lambda表达式，要求_joinByOperation()_以相反的顺序连接_String_值列表，并将结果_String_转换为大写：

```kotlin
val result2 = joinByOperation(input) { theList ->
    theList.reversed().joinToString(separator = " ") { str -> str }.uppercase()
}
assertEquals("X Y Z D E F A B C", result2)
```

正如我们所看到的，将Lambda表达式作为参数传递给高阶函数是直接且灵活的。

## 4. 传递现有函数

将Lambda传递给高阶函数非常方便。然而，一个缺点是**这些Lambda不能在高阶函数之外重用**。

在实践中，我们经常定义函数以重用逻辑。在Kotlin中，函数可以在不同的范围内定义，例如实例函数、顶级函数等，

接下来，让我们看看如何将现有函数作为参数传递给我们的_joinByOperation()_高阶函数。

### 4.1. 传递实例函数

假设我们的应用程序中有一个带有函数的_MessageParser_类：

```kotlin
class MessageParser {
    fun joinWithoutPlaceholder(segments: List```````<String>```````): String {
        return segments.joinToString(separator = " ").replace(" [SPACE] ", " ")
    }
}
```

正如上面的代码所示，**_joinWithoutPlaceholder()_是一个典型的实例函数**。它连接_String_值列表并用空格替换“[SPACE]”占位符。

当我们的输入包含占位符时，我们希望使用_joinWithoutPlaceholder()_来连接_String_段。**我们可以使用_instanceVariable::FunctionName_格式引用实例函数，** 并将函数引用作为参数传递给高阶函数：

```kotlin
val messageParser = MessageParser()
val input = listOf("a [SPACE] b [SPACE] c", "d [SPACE] e [SPACE] f", "x [SPACE] y [SPACE] z")
val result = joinByOperation(input, messageParser::joinWithoutPlaceholder)
assertEquals("a b c d e f x y z", result)
```

### 4.2. 在类的伴生对象中传递函数

在Kotlin中，没有“static”关键字。然而，我们可以通过在类的**伴生对象**中声明函数来创建**“静态函数”**。

接下来，让我们向_MessageParser_类添加一个伴生对象函数：

```kotlin
class MessageParser {
    // ...
    companion object {
        fun simplyJoin(segments: List```````<String>```````): String {
            return segments.joinToString(separator = " ")
        }
    }
}
```

_simpllyJoin()_函数通过空格连接给定_String_列表中的段。当我们将这个伴生对象函数作为参数传递时，**我们使用_ClassName::FunctionName_格式引用它**：

```kotlin
val input = listOf("a b c", "d e f", "x y z")
val result = joinByOperation(input, MessageParser::simplyJoin)
assertEquals("a b c d e f x y z", result)
```

### 4.3. 传递对象函数

除了实例函数和伴生对象函数之外，**我们还可以在Kotlin的_object_中声明函数**：

```kotlin
object ParserInObject {
    fun joinWithoutComma(segments: List```````<String>```````): String {
        return segments.joinToString(separator = " ") { it.replace(",", "") }
    }
}
```

正如这个例子所示，_ParserInObject_中的_joinWithoutComma()_函数连接_String_值列表并移除所有的逗号。因此，当我们想要从输入中跳过所有的逗号时，我们可以使用这个函数。

要将_joinWithoutComma()_作为参数传递给_joinByOperation()_，**我们使用_ObjectName::FunctionName_格式引用它**。

接下来，让我们创建一个测试来验证我们是否可以以这种方式获得预期的结果：

```kotlin
val input = listOf("a, b, c", "d, e, f", "x, y, z")
val result = joinByOperation(input, ParserInObject::joinWithoutComma)
assertEquals("a b c d e f x y z", result)
```

### 4.4. 传递顶级函数

最后，在Kotlin中，**函数可以在顶级声明，也称为包级函数**。接下来，让我们创建一个顶级函数：

```kotlin
fun decrypt(segments: List```````<String>```````): String {
    return segments.reversed().joinToString(separator = " ") { it.reversed() }
}
```

**_decrypt()_在类之外定义**。它接受一个_String_段的列表，并通过反转每个段和输入列表中段的顺序来解密输入。

**我们可以按照_::FunctionName_模式将顶级函数作为参数传递**。在我们的例子中，它将是_::decrypt_。

接下来，让我们传递_decrypt()_到_joinByOperation()_：

```kotlin
val input = listOf("z y x", "f e d", "c b a")
val result = joinByOperation(input, ::decrypt)
assertEquals("a b c d e f x y z", result)
```

## 5. 将函数赋值给变量

到目前为止，我们已经探索了在Kotlin中将函数作为参数传递给高阶函数的两种方法：使用Lambda或函数引用。正如之前强调的，函数在Kotlin中被视为一等公民。因此，我们可以**将函数引用或Lambda表达式赋值给变量，允许我们将变量传递给另一个函数**。

接下来，我们将通过例子深入理解这个概念。

让我们使用对象函数_joinWithoutComma()_和一个Lambda表达式来演示将现有函数和Lambda赋值给变量。然后，我们将这些变量传递给_joinByOperation()_函数。

```kotlin
val input = listOf("a, b, c", "d, e, f", "x, y, z")

val funRef = ParserInObject::joinWithoutComma
val resultFunRef = joinByOperation(input, funRef)
assertEquals("a b c d e f x y z", resultFunRef)

val funLambda = { theList: List```````<String>``````` -> theList.reversed().joinToString(separator = ", ") { str -> str }.uppercase() }
val resultFunLambda = joinByOperation(input, funLambda)
assertEquals("X, Y, Z, D, E, F, A, B, C", resultFunLambda)
```

正如上面的示例中所示，**Kotlin允许我们将Lambda和函数引用作为常规值来对待。** 例如，**我们可以直接将它们赋值给变量**。当我们将这些变量作为参数传递给其他函数时，我们实际上就是在传递函数作为参数。

## 6. 结论

在本文中，我们首先探讨了Kotlin中的高阶函数概念。通过采用高阶函数，我们可以提高代码的可重用性、灵活性和可读性，从而实现更易于维护的软件。

随后，我们通过示例深入研究了如何将函数作为参数传递给高阶函数。我们考察了两种情况：传递Lambda表达式和传递现有函数的引用。

此外，我们展示了我们可以直接将Lambda表达式和函数引用赋值给变量，使我们能够将这些变量作为参数传递给其他函数。

如常，示例的完整源代码可在GitHub上获得。

[Baeldung Kotlin 教程](https://www.baeldung.com/kotlin/function-parameter-high-order)

OK