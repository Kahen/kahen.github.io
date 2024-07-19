---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - Enum
  - Function
head:
  - - meta
    - name: keywords
      content: Kotlin, Enum, Function, Enum Classes, Baeldung
---
# Kotlin中为所有枚举类创建通用函数 | Baeldung关于Kotlin

在Kotlin中，枚举是一种强大的结构，允许我们定义一组表示不同值的命名常量。然而，在使用多个枚举类时，创建一个能够为任何枚举类提供功能的通用函数可能是具有挑战性的。

在本教程中，我们将探讨创建一个适用于任何枚举类的多功能Kotlin函数的不同方法。

### 2. 理解挑战

像往常一样，让我们通过一个例子来理解挑战。

假设我们想要有一个名为**_joinTheirNames()_**的函数，该函数适用于所有枚举类，以通过逗号连接给定枚举的实例名称。

例如，假设我们用以下_Level_枚举调用这个函数：

```kotlin
enum class Level {
    A, B, C, D, E
}
```

_joinTheirNames()_返回一个字符串：

```
"A, B, C, D, E"
```

类似地，假设我们在不同的枚举上调用这个函数，该枚举的构造函数接受参数，比如_WorkingDay_：

```kotlin
enum class WorkingDay(val n: Int) {
    MON(1), TUE(2), WED(3), THU(4), FRI(5)
}
```

我们将得到以下字符串作为结果：

```
"MON, TUE, WED, THU, FRI"
```

挑战在于**Kotlin中的每个枚举类都是具有自己的一组常量的独立类型**。此外，Kotlin不支持枚举继承，这意味着每个枚举类都是独立的。

因此，编写一个适用于所有枚举类的函数需要考虑到它们的差异，并采取周到的方法。

在本教程中，我们将以_joinTheirNames()_需求为例，探讨为所有枚举类创建函数的不同方法。

### 3. 在_Array_类上创建扩展函数

**在Kotlin中，对于任何枚举类型，我们都可以通过调用_values()_函数来获得它的实例数组**。因此，我们可以在_Array_类上创建一个扩展函数来实现我们的目标：

```kotlin
fun `<E : Enum`````<E>``````> Array`````<E>`````.joinTheirNames(): String {
    return joinToString { it.name }
}
```

当然，我们只想扩展包含枚举实例作为元素的数组类，而不是污染所有数组。因此，如上面的代码所示，**我们引入了类型参数< _E : Enum`````<E>`````_>，使_joinTheirNames()_函数仅适用于枚举数组（_Array`````<E>`````_）。**

函数的实现非常简单。我们使用_joinToString()_函数来连接枚举常量的名称。

有了扩展函数，我们可以调用_AnyEnumType.values().joinTheirNames()_来获得预期的字符串结果：

```kotlin
assertEquals("A, B, C, D, E", Level.values().joinTheirNames() )
assertEquals("MON, TUE, WED, THU, FRI", WorkingDay.values().joinTheirNames())
```

### 4. 在_EnumEntries_类上创建扩展函数

自1.9.0版本以来，Kotlin已将_entries_属性引入所有枚举类型作为一个稳定的功能。此外，官方文档建议**用_AnEnum.entries_替换_AnEnum.values()_函数调用。**

与返回数组的_values()_函数不同，_entries_属性的类型是_EnumEntries_。因此，**如果我们使用Kotlin 1.9.0或更高版本，我们可以将我们的扩展函数从扩展_Array_更改为扩展_EnumEntries_类**：

```kotlin
fun EnumEntries`<*>`.joinTheirNames(): String {
    return joinToString { it.name }
}
```

然后，扩展函数可以使用枚举的_entries_属性调用：

```kotlin
assertEquals("A, B, C, D, E", Level.entries.joinTheirNames() )
assertEquals("MON, TUE, WED, THU, FRI", WorkingDay.entries.joinTheirNames())
```

我们已经讨论了两种在所有枚举上创建函数的解决方案。然而，无论是扩展_Array_还是_EnumEntries_，_joinToString()_都是通过枚举的实例而不是直接从枚举类调用的。

那么，接下来让我们看看是否可以有一个更直接的解决方案。

### 5. 我们可以在类级别上实现_joinToString()_函数吗？

能够调用像_Level.joinTheirNames()_和_WorkingDay.joinTheirNames()_这样的函数将是理想的。它简单易用。

我们知道，**_Enum_类是Kotlin中所有枚举类的共同超类型**。此外，我们已经看到了Kotlin扩展函数的强大。**扩展函数允许我们在不真正修改类型的代码的情况下向类型添加功能**。

因此，一个想法可能浮现出来：创建一个扩展函数来扩展_Enum_类。

然而，在尝试之后，我们将意识到**我们无法通过在_Enum_上创建扩展函数来实现像_Level.joinTheirNames()_这样的功能**。

接下来，让我们找出为什么。

### 5.1. 为什么我们不能让_Level.joinTheirNames()_工作？

首先，值得注意的是，Kotlin的**扩展函数在实例级别上操作**。例如，如果我们在_String_上创建一个扩展函数_singleCharString()_：

```kotlin
fun String.singleCharString() = this.length == 1
```

然后，**_singleCharString()_函数适用于所有_String_实例**。例如，我们可以这样调用它：

```kotlin
"x y z".singleCharString() // false
"x".singleCharString() // true
```

然而，**我们不能像_String.singleCharString()_这样从_String_类调用扩展函数**。

现在，如果我们再次看看我们的“在_Enum_上扩展函数”的想法，我们的目标是拥有_Level.joinTheirNames()_或_WorkingDay.joinTheirNames()_。但是**_Level_和_WorkingDay_这里实际上是两个枚举类而不是实例**。因此，我们无法使用扩展函数来实现我们的目标。

除此之外，假设我们能够实现_WorkingDay.joinTheirNames()_。那么，_joinTheirNames()_函数将是_WorkingDay_类的静态函数。**在Kotlin和Java中，静态方法不是从超类继承到子类的**。

因此，即使我们可以在_Enum_类上创建静态扩展函数，该函数将仅适用于_Enum_类而不是其子类。换句话说，**如果我们能够在_Enum_类上添加静态扩展_joinTheirNames()_，我们将有_Enum.joinTheirNames()_而不是_WorkingDay.joinTheirNames()_**。

我们可能已经注意到，如果我们能够以某种方式将具体枚举类型传递给_Enum.joinTheirNames()_，它仍然可以解决我们的问题，尽管它看起来并不像_WorkingDay.joinTheirNames()_那样直接。

然后，让我们找出我们是否可以在Kotlin中创建静态扩展函数。

### 5.2. 我们可以创建静态扩展函数吗？

目前，**Kotlin不支持静态扩展函数**。但这个特性在Kotlin的官方KEEP提案中。

这是否意味着我们不能创建静态_Enum_扩展？在回答这个问题之前，让我们看看Kotlin中静态函数的工作原理。

**Kotlin的静态函数基于Companion对象**。我们不能直接创建静态扩展，但如果目标类有一个Companion对象，我们可以**为Companion对象创建扩展函数**。然后，我们可以像调用静态函数一样调用这个扩展函数。

让我们看看_Enum_类的实现：

```kotlin
public abstract class Enum`<E : Enum`````<E>``````>(name: String, ordinal: Int): Comparable`````<E>````` {
    companion object {}
    ...
}
```

幸运的是，_Enum_类有一个匿名的Companion对象。那么接下来，让我们通过添加_joinTheirNames()_函数来扩展这个Companion对象：

```kotlin
inline fun <reified E : Enum`````<E>`````> Enum.Companion.joinTheirNames(): String {
    return enumValues`````<E>`````().joinToString { it.name }
}
```

由于函数显示，我们引入了一个类型参数来知道我们正在处理哪种具体的枚举类型。**Kotlin提供了reified _inline_ _enumValues()_函数来获取所有_Enum``<T>``_的实例：**

```kotlin
inline fun <reified T : Enum``<T>``> enumValues(): Array``<T>``
```

我们在_joinTheirNames()_函数中使用了_enumValues()_函数。因此，我们需要使我们的类型参数也是reified。

现在，是时候验证这种方法是否有效了。让我们用我们的两个枚举示例进行测试：

```kotlin
assertEquals("A, B, C, D, E", Enum.joinTheirNames```<Level>```())
assertEquals("MON, TUE, WED, THU, FRI", Enum.joinTheirNames``<WorkingDay>``())
```

如果我们运行测试，它将通过。所以，这种方法是有效的。

然而，让我们快速回顾一下函数调用：_Enum.joinTheirNames```<Level>```()_。如果我们已经限制了_E_必须是枚举类型，那么_Enum_类前缀是多余的。

接下来，让我们看看是否可以简化函数。

### 6### 6. 创建一个通用函数

正如我们之前讨论的，既然我们已经定义了_Enum.joinTheirNames()_只能与枚举类型一起工作，那么_Enum_前缀就没有必要了。因此，让我们从函数签名中删除“_Enum.Companion_”：

```kotlin
inline fun <reified E : Enum`````<E>`````> joinEnumNames(): String {
    return enumValues`````<E>`````().joinToString { it.name }
}
```

现在，_joinEnumNames()_变成了一个常规函数。

最后，如果我们使用我们的枚举示例进行测试，它将按预期工作：

```kotlin
assertEquals("A, B, C, D, E", joinEnumNames```<Level>```())
assertEquals("MON, TUE, WED, THU, FRI", joinEnumNames``<WorkingDay>``())
```

### 7. 结论

在本文中，我们通过示例探索了为所有枚举类创建一个可用函数的不同方法。我们在我们的实现中使用了各种Kotlin特性，如扩展函数、泛型、_reified_类型参数、_inline_函数等。

一如既往，示例的完整源代码可以在GitHub上找到。

![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png)![img](https://secure.gravatar.com/avatar/c6c28b2e0205c9b87004ebaade245ff1?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/custom_avatars/Eric-Martin-150x150.jpg)![img](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK