---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - Type Inference
  - Underscore Operator
head:
  - - meta
    - name: keywords
      content: Kotlin, Type Inference, Underscore Operator
------
# Kotlin中类型参数的下划线操作符

## 1. 引言

Kotlin的下划线操作符是该语言的一个独特工具，它有几种不同的用途。传统用法主要集中在lambda中的未使用变量或变量解构上。然而，**我们应该注意的是 Kotlin 1.7 中的一个新特性，即类型参数的下划线操作符**。具体来说，现在下划线操作符可以触发泛型类型的自动类型推断。

在本教程中，我们将深入探讨Kotlin中用于类型推断的下划线操作符，并探索它如何简化我们的代码并使其更易于阅读。

类型参数指定泛型类型或函数的实际类型。泛型提供了一种创建可以在不牺牲类型安全性的情况下操作不同类型数据的类、接口和函数的方法。

在定义泛型类时，我们可以使用类型参数来表示稍后将指定的类型：

```kotlin
class Box``````<T>``````(val content: T)
val stringBox: Box``````<String>`````` = Box("Hello, Kotlin!")
val intBox: Box````<Int>```` = Box(42)
```

在这个例子中，_T_是我们_Box_类的类型参数，而_String_和_Int_是类型参数。

## 3. 理解下划线操作符

在Kotlin 1.7之前，下划线操作符只能作为lambda函数中的占位符或在变量解构中使用，以指示未使用的变量。

### 3.1. 使用下划线的未使用Lambda参数

当我们声明一个lambda函数并且我们不需要其中的变量时，我们可以用下划线替换它：

```kotlin
fun main(args: Array``````<String>``````) {
    val list = listOf("hi")
    val list2 = list.mapIndexed { _, item -> item }
    println(list2)
}
```

在这个例子中，_mapIndexed()_函数需要两个参数：_index_和_item_。**然而，我们只对_item_感兴趣，所以我们用下划线作为占位符来明确表示我们忽略了_index_参数**。

### 3.2. 使用下划线的变量解构

类似地，当解构变量时，如果我们想忽略第一个变量并只提取第二个变量，我们可以用下划线替换第一个变量：

```kotlin
fun main(args: Array``````<String>``````) {
    val (_, second) = "ignored" to "hello"
    println(second)
}
```

在这个例子中，我们使用了一个_Pair_的变量解构。下划线用于忽略_Pair_中的第一个值。这种语法特别允许我们提取我们感兴趣的值并丢弃我们不需要的值。

## 4. 类型推断辅助

**在Kotlin 1.7中，下划线操作符引入了一种方便的方式来替换定义泛型类型时的类型声明**。因此，这个操作符允许我们有意省略类型参数，并让编译器推断类型。

### 4.1. 声明泛型值

在Kotlin 1.7之前，类型参数是必需的。如果我们在代码中输入一个泛型类，我们必须指定一个有效的类型参数：

```kotlin
// 在Kotlin 1.7之前
class Box``````<T>``````(value: T) {
    // 一些类实现
}

fun main() {
    val intBox: Box````<Int>```` = Box(42)
    val anyBox: Box``<Any>`` = Box("Some value")
}
```

在下一部分，我们将看到我们如何在Kotlin代码中使用下划线操作符。

### 4.2. 使用下划线的类型声明

**Kotlin中的下划线操作符通过允许编译器根据周围上下文推断类型来辅助类型推断**。这不是关于省略类型信息，而是向编译器发出信号，当有足够周围的信息时推断类型。

让我们在泛型函数的上下文中看一个例子：

```kotlin
inline fun ``````<T>`````` printElementInfo(element: T) {
    println("Element: $element")
}

fun main() {
    printElementInfo````<_>````(42)
    printElementInfo````<_>````("Hello")
}
```

在这个例子中，_printElementInfo()_函数是一个高阶函数，它打印给定元素的值。下划线操作符允许编译器在调用函数时推断类型参数。

## 5. 结论

Kotlin 1.7中的类型推断下划线操作符是一个有价值的补充，有助于编写更简洁和富有表现力的代码。它通过允许编译器处理类型推断，赋予开发者编写更干净、更易于维护的代码的能力。这特别适用于可以从周围上下文中推断出类型的情境，当类型参数显而易见时，它作为一种简写。---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - Type Inference
  - Underscore Operator
head:
  - - meta
    - name: keywords
      content: Kotlin, Type Inference, Underscore Operator
------
# Kotlin中类型参数的下划线操作符

## 1. 引言

Kotlin的下划线操作符是该语言的一个独特工具，它有几种不同的用途。传统用法主要集中在lambda中的未使用变量或变量解构上。然而，**我们应该注意的是 Kotlin 1.7 中的一个新特性，即类型参数的下划线操作符**。具体来说，现在下划线操作符可以触发泛型类型的自动类型推断。

在本教程中，我们将深入探讨Kotlin中用于类型推断的下划线操作符，并探索它如何简化我们的代码并使其更易于阅读。

类型参数指定泛型类型或函数的实际类型。泛型提供了一种创建可以在不牺牲类型安全性的情况下操作不同类型数据的类、接口和函数的方法。

在定义泛型类时，我们可以使用类型参数来表示稍后将指定的类型：

```kotlin
class Box``````<T>``````(val content: T)
val stringBox: Box``````<String>`````` = Box("Hello, Kotlin!")
val intBox: Box````<Int>```` = Box(42)
```

在这个例子中，_T_是我们_Box_类的类型参数，而_String_和_Int_是类型参数。

## 3. 理解下划线操作符

在Kotlin 1.7之前，下划线操作符只能作为lambda函数中的占位符或在变量解构中使用，以指示未使用的变量。

### 3.1. 使用下划线的未使用Lambda参数

当我们声明一个lambda函数并且我们不需要其中的变量时，我们可以用下划线替换它：

```kotlin
fun main(args: Array``````<String>``````) {
    val list = listOf("hi")
    val list2 = list.mapIndexed { _, item -> item }
    println(list2)
}
```

在这个例子中，_mapIndexed()_函数需要两个参数：_index_和_item_。**然而，我们只对_item_感兴趣，所以我们用下划线作为占位符来明确表示我们忽略了_index_参数**。

### 3.2. 使用下划线的变量解构

类似地，当解构变量时，如果我们想忽略第一个变量并只提取第二个变量，我们可以用下划线替换第一个变量：

```kotlin
fun main(args: Array``````<String>``````)) {
    val (_, second) = "ignored" to "hello"
    println(second)
}
```

在这个例子中，我们使用了一个_Pair_的变量解构。下划线用于忽略_Pair_中的第一个值。这种语法特别允许我们提取我们感兴趣的值并丢弃我们不需要的值。

## 4. 类型推断辅助

**在Kotlin 1.7中，下划线操作符引入了一种方便的方式来替换定义泛型类型时的类型声明**。因此，这个操作符允许我们有意省略类型参数，并让编译器推断类型。

### 4.1. 声明泛型值

在Kotlin 1.7之前，类型参数是必需的。如果我们在代码中输入一个泛型类，我们必须指定一个有效的类型参数：

```kotlin
// 在Kotlin 1.7之前
class Box``````<T>``````(value: T) {
    // 一些类实现
}

fun main() {
    val intBox: Box````<Int>```` = Box(42)
    val anyBox: Box``<Any>`` = Box("Some value")
}
```

在下一部分，我们将看到我们如何在Kotlin代码中使用下划线操作符。

### 4.2. 使用下划线的类型声明

**Kotlin中的下划线操作符通过允许编译器根据周围上下文推断类型来辅助类型推断**。这不是关于省略类型信息，而是向编译器发出信号，当有足够周围的信息时推断类型。

让我们在泛型函数的上下文中看一个例子：

```kotlin
inline fun ``````<T>`````` printElementInfo(element: T) {
    println("Element: $element")
}

fun main() {
    printElementInfo````<_>````(42)
    printElementInfo````<_>````("Hello")
}
```

在这个例子中，_printElementInfo()_函数是一个高阶函数，它打印给定元素的值。下划线操作符允许编译器在调用函数时推断类型参数。

## 5. 结论

Kotlin 1.7中的类型推断下划线操作符是一个有价值的补充，有助于编写更简洁和富有表现力的代码。它通过允许编译器处理类型推断，赋予开发者编写更干净、更易于维护的代码的能力。这特别适用于可以从周围上下文中推断出类型的情境，当类型参数显而易见时，它作为一种简写。

如往常一样，这些示例的完整实现可以在GitHub上找到。

OK