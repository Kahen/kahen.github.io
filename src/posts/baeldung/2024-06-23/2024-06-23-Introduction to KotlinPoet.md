---
date: 2024-06-23
category:
  - Kotlin
  - Programming
tag:
  - KotlinPoet
  - Code Generation
head:
  - - meta
    - name: keywords
      content: Kotlin, KotlinPoet, Source Code Generation, IDE, Build Process
---

# KotlinPoet 简介

在本文中，我们将深入了解 KotlinPoet。我们将了解它是什么，我们可以用它做什么，以及如何使用它。

## 2. KotlinPoet 是什么？

**KotlinPoet 是一个开源库，用于生成 Kotlin 源代码。** 由 Square 维护，它是 JavaPoet 库的 Kotlin 版本。

与 Asm 等工具不同，KotlinPoet 生成的是原始的、未编译的源代码。这需要在直接执行之前进行编译。然而，根据我们的需求，这可能更有用和强大——例如，在构建过程中或在 IDE 内部进行代码生成。

KotlinPoet 生成了 Kotlin 程序中的大部分主要结构——类、字段、方法、注解等。因此，我们可以程序性地生成从单行代码到整个源文件的任何内容。

## 3. 依赖性

**在我们使用 KotlinPoet 之前，我们需要在构建中包含最新版本，目前是 1.16.0。**

如果我们使用 Maven，我们可以包含此依赖项：

```xml
`<dependency>`
    `<groupId>`com.squareup`</groupId>`
    `<artifactId>`kotlinpoet-jvm`</artifactId>`
    `<version>`1.16.0`</version>`
`</dependency>`
```

或者如果我们使用 Gradle，我们可以这样包含它：

```groovy
implementation("com.squareup:kotlinpoet:1.16.0")
```

此时，我们已经准备好在应用程序中使用它了。

## 4. 生成代码

现在我们已经设置好了 KotlinPoet，我们可以使用它来生成代码了。

**所有代码都是使用一组 _Spec_ 类之一生成的。** 我们可以使用这些类中的一种来生成我们可以生成的每种主要类别的代码——例如，_TypeSpec_ 用于生成类型定义，_FunSpec_ 用于生成函数定义等。

**这些 _Spec_ 类中的每一个都有一个伴生对象，它公开了开始生成的函数，然后我们从那个点开始链式调用。**

例如，我们可以像下面这样生成一个空类：

```kotlin
val code = TypeSpec.classBuilder("Test").build()
```

这将输出一个 _TypeSpec_ 实例，表示我们的类，我们可以使用它上面的 _toString()_ 方法来生成结果代码：

```java
public class Test
```

## 5. 生成函数

**我们将使用 KotlinPoet 生成的第一个代码单元是函数。这包括我们在函数中期望看到的一切——函数本身、参数、返回类型以及函数的实际体。**

我们从 _FunSpec_ 类开始。我们需要决定我们希望构建的函数类型——常规的、构造函数、getter、setter，或者我们是否在重写另一个函数——然后调用适当的构建器函数：

```kotlin
FunSpec.builder("simple") // public fun simple() {}
FunSpec.constructorBuilder() // public constructor()
FunSpec.getterBuilder() // public get() {}
FunSpec.setterBuilder() // public set() {}
```

### 5.1. 指定函数体

**一旦我们有了函数定义，我们必须给它一个体。KotlinPoet 不建模函数体，而是让我们自由地指定它们。**

最简单的方法是通过使用 _addStatement()_ 调用来添加单独的语句：

```kotlin
val code = FunSpec.builder("test")
  .addStatement("println(\"Testing\")")
  .build()
```

这样做将生成以下代码：

```java
public fun test() {
    println("Testing")
}
```

在这样做时，我们可以看到我们必须转义我们字符串周围的引号。**KotlinPoet 通过允许我们指定格式字符串来使这变得更容易，这些字符串接受参数。** 例如，我们可以像这样写：

```kotlin
val code = FunSpec.builder("test")
  .addStatement("println(%S)", "Testing")
  .build()
```

这将像以前一样产生相同的代码。这里的优点是 KotlinPoet 将正确地格式化我们的输入；然而，它需要——在这种情况下，用引号包围它。我们在这里有几种格式说明符的选项：

- %S – 将参数格式化为字符串，转义引号和美元符号，并将所有内容用引号包围。
- %P – 将参数格式化为字符串模板，转义引号但不转义美元符号，并将整个内容用引号包围。
- %L – 将参数视为字面值，不转义也不引用。
- %N – 将参数视为另一个代码元素，并插入其名称。
- %T – 将参数视为类型，插入类型名称，并确保适当地添加导入。
- %M – 将参数视为包或类的成员，插入正确限定的成员名称，并确保适当地添加导入。

### 5.2. 控制流

**函数体的某些方面是特殊的，需要以不同的方式处理。特别是，这适用于任何本身包含更多语句的标准控制流机制。**

KotlinPoet 为我们提供了 _beginControlFlow()_ 和 _endControlFlow()_ 调用来管理这一点。_beginControlFlow()_ 输出某个语句，然后是一个开括号，而 _endControlFlow()_ 输出闭括号。

KotlinPoet 还将缩进这些之间的任何语句：

```kotlin
val code = FunSpec.builder("test")
  .beginControlFlow("if (showOutput)")
  .addStatement("println(%S)", "Testing")
  .endControlFlow()
  .build()
```

这将产生以下结果：

```java
public fun test() {
    if (showOutput) {
        println("Testing")
    }
}
```

我们还有 _nextControlFlow()_ 用于允许 _else_ 和 _else if_ 等结构。这是 _endControlFlow()_ 和 _beginControlFlow()_ 在同一行上的组合。

### 5.3. 参数

**没有参数的函数用途有限，所以我们需要一种方法来指定它们。我们可以通过 _addParameter()_ 调用来做到这一点，我们需要提供 _ParameterSpec_。**

至少，一个 _ParameterSpec_ 需要有一个名称和一个类型：

```kotlin
val code = FunSpec.builder("test")
  .addParameter(ParameterSpec.builder("param", String::class).build())
  .build()
```

这将产生：

```java
public fun test(param: kotlin.String) {
}
```

我们还可以使用 _ParameterSpec_ 上的 _defaultValue()_ 调用来为我们的参数提供默认值：

```kotlin
val code = FunSpec.builder("test")
  .addParameter(ParameterSpec.builder("param", Int::class).defaultValue("%L", 42).build())
  .build()
```

正如我们之前看到的，默认值是作为格式说明符提供的。

**KotlinPoet 还提供了一种简写，通过直接将参数名称和类型传递给 _addParameter()_ 调用来添加参数：**

```kotlin
val code = FunSpec.builder("test")
  .addParameter("param", String::class)
  .build()
```

然而，这样做意味着我们不能自定义参数额外的。

### 5.4. 返回类型

**与函数参数类似，我们也可以指定返回类型。与其他设置不同，一个函数只能有一个返回类型，默认为 _Unit_。这是使用 _returns()_ 调用来完成的：**

```kotlin
val code = FunSpec.builder("test")
  .returns(String::class)
  .build()
```

这将产生：

```java
public fun test(): kotlin.String {
}
```

**此外，KotlinPoet 对单表达式函数有独特的理解。** 如果我们的函数规范有一个以 _return_ 开始的单个语句，那么我们会以不同的方式生成它：

```kotlin
val code = FunSpec.builder("test")
  .returns(Int::class)
  .addStatement("return 5")
  .build()
```

将生成：

```java
public fun test(): kotlin.Int = 5
```

在这种情况下提供了返回类型，因为我们的函数规范包含了它。根据我们的规范，Kotlin 允许我们在这些情况下省略它，同时仍然产生有效的代码。

## 6. 生成类型

**现在我们可以生成函数了，我们需要一些类型来使用它们。这可能包括在我们函数内部使用的类型，或者函数存在于其中的类型。**

KotlinPoet 允许我们创建 Kotlin 支持的所有预期类型定义——类、接口、对象等。

我们可以使用 _TypeSpec_ 规范类来创建类型：

```kotlin
TypeSpec.classBuilder("Test") // public class Test
TypeSpec.interfaceBuilder("Test") // public interface Test
TypeSpec.objectBuilder("Test") // public object Test
TypeSpec.enumBuilder("Test") // public enum class Test
```

### 6.1. 添加方法

**一旦我们可以创建我们的类型，我们希望它们能够有一些功能。做到这一点的第一种方式是能够添加方法。**

我们已经看到了如何使用 _FunSpec_ 创建函数。我们可以通过