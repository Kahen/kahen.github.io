---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Enums
  - when()
head:
  - - meta
    - name: keywords
      content: Kotlin Enums, when() expression
------
# 使用Kotlin中的枚举与when()表达式

## 1. 引言

Kotlin中的枚举提供了一种优雅的方式来处理类似switch结构的多重条件。

在本教程中，我们将探讨如何使用枚举与_when()_表达式，以及它如何增强代码的可读性和可维护性。

## 2. Kotlin中枚举的基础知识

在深入讨论使用枚举与_when()_表达式的细节之前，让我们简要了解枚举是什么以及它们在Kotlin中的工作方式。

枚举，简称enumerations，允许我们定义一组命名常量值，创建一种类型安全的方式来表示一组相关值：

```kotlin
enum class Color {
    RED, GREEN, BLUE
}
```

在这个例子中，_Color_是一个枚举类，有三个值：_RED_、_GREEN_和_BLUE_。枚举可以有属性、方法，甚至可以实现接口，使它们适用于各种用例。

## 3. 使用_when()_和枚举简化代码

枚举的一个关键优势是它们与Kotlin中的_when()_表达式的无缝集成。_when()_表达式作为传统_switch()_语句的强大替代品。Kotlin中的_when()_表达式提供了一种简洁而富有表现力的语法，用于基于枚举的值处理多重条件。

让我们考虑以下示例，其中我们的枚举_Day_代表一周的天：

```kotlin
enum class Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

现在，让我们使用_when()_表达式根据天执行不同的操作：

```kotlin
fun getDailyRoutine(day: Day): String {
    return when (day) {
        Day.MONDAY -> "Start of the workweek"
        Day.WEDNESDAY -> "Midweek - Keep pushing!"
        Day.FRIDAY -> "Almost there, the weekend is coming!"
        Day.SUNDAY -> "Relax and recharge"
        else -> "It's a regular day"
    }
}
```

在这个例子中，_when()_表达式根据_Day_枚举的值处理不同的场景。这比嵌套的_if-else_语句或传统的_switch()_语句更易于阅读和维护。

因为我们没有涵盖我们的_Day_枚举的所有可能分支，**我们必须用_else()_子句完成_when()_表达式**。这大致相当于_switch()_语句的默认值。

### 3.1. 无需_else()_的详尽_when()

在某些情况下，Kotlin中的_when()_表达式可以是详尽的，不需要_else()_子句。正如我们上面所注意到的，所有的_when()_表达式都需要是详尽的，这意味着它们必须涵盖所有可能的分支。

让我们考虑一个涉及名为_Color_的枚举类型的示例。在这个示例中，我们将使用一个没有_else()_子句的_when()_表达式来展示它的详尽性：

```kotlin
enum class Color {
    RED, GREEN, BLUE
}
fun getColorDescription(color: Color): String {
    return when (color) {
        Color.RED -> "The color is red."
        Color.GREEN -> "The color is green."
        Color.BLUE -> "The color is blue."
    }
}
```

在这里，_getColorDescription()_函数使用_when()_表达式匹配_Color_枚举的每个枚举案例。由于所有枚举案例_RED_、_GREEN_和_BLUE_都在_when()_块中被覆盖，因此不需要_else()_子句。这展示了_when()_表达式在处理所有可能的案例时能够详尽而不需要额外的回退逻辑的能力。

## 4. 密封类和_when()_表达式

除了枚举，Kotlin还提供了密封类，通常被称为超级枚举。密封类与枚举有一些共同特征，但它们提供了不同的功能集。使用密封类的一种强大方式是与_when()_表达式结合。

**密封类允许我们表示类似于枚举的限制类型层次结构**。然而，密封类提供了更多的灵活性，因为它们可以包括额外的属性和方法。**此外，与枚举不同，密封类可以有在其声明之外定义的子类，提供了扩展层次结构的强大机制。**

让我们看一个定义密封类_Shape_及其两个子类_Triangle_和_Square_的示例：

```kotlin
fun main(args: Array`<String>`) {
    val shape: Shape = Shape.Triangle
    when (shape) {
        Shape.Square -> println("I'm a square")
        Shape.Triangle -> println("I'm a triangle")
    }
}
sealed class Shape {
    object Triangle : Shape()
    object Square : Shape()
}
```

在这个示例中，密封类_Shape_作为相关子类_Triangle_和_Square_的容器。_when()_表达式根据遇到的_Shape_类型执行不同的操作。在这种情况下，它打印“_I’m a triangle_”。

值得注意的是，当使用密封类时，**我们也允许在所有分支都被覆盖的情况下在_when()_表达式中跳过_else()_子句**，因为Kotlin编译器可以推断我们已经涵盖了我们密封类的所有可能的子类。

## 5. 结论

在Kotlin中使用枚举与_when()_表达式的结果不仅更易于阅读，而且更易于维护和健壮。枚举提供了一种类型安全的方式来表示一组相关值，当与_when()_表达式的简洁语法结合时，它们提供了一种强大的机制来处理多重条件。

如常，这些示例的完整实现可以在GitHub上找到。