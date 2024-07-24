---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - Array
  - Reverse Iteration
head:
  - - meta
    - name: keywords
      content: Kotlin, Array, Reverse Iteration
------
# 在Kotlin中反转数组并迭代

数组是存储和操作元素集合的基本数据结构。按自然顺序遍历数组是一项常见任务。然而，在某些情况下，需要按相反的顺序迭代它。

在本教程中，我们将探讨在Kotlin中按相反顺序迭代数组的各种方法。

## 2. 问题介绍

Kotlin通过提供简洁的语法和内置函数简化了数组操作。数组可以轻松初始化、操作，当然也可以遍历。例如，我们可以编写一个_for_循环来遍历其元素，或者使用_forEach{ … }_函数按自然顺序遍历数组。

然而，当涉及到按相反顺序迭代数组时，我们可能会想知道是否有专门的函数或是否需要一个变通方法。

在本教程中，我们将看到不同的解决方案。

例如，假设我们有一个包含六个元素的字符串数组：
```kotlin
val array = arrayOf("a", "b", "c", "d", "e", "f")
```

如果我们反转地迭代这个数组，期望的访问元素的顺序是_“f” -> “e” -> “d” -> … -> “a”_。

因此，让我们将元素存储在预期的顺序中，以便我们可以验证我们的反转迭代解决方案是否按预期工作：
```kotlin
val reversedList = listOf("f", "e", "d", "c", "b", "a")
```

接下来，让我们看看如何反转迭代_array_。

## 3. 调用数组的_reversed()_函数

Kotlin提供了_Array.reversed()_扩展函数。**这个函数返回一个新数组，其中元素按相反顺序排列**：
```kotlin
public fun ``<T>`` Array`<out T>`.reversed(): List``<T>`` { ... }
```

例如，我们可以使用_for_循环来迭代_array.reversed()_的结果：
```kotlin
val resultList = mutableListOf```<String>```()
for (element in array.reversed()) {
    resultList += element
}
assertEquals(reversedList, resultList)
```

正如测试所示，我们首先创建了一个空的_Mutablelist_。在迭代反转数组时，我们将每个元素添加到可变列表中。

然后，结果_listResult_等于预期的_reversedList_。因此，我们按相反顺序遍历了原始数组。

## 4. 应用数组索引范围的_reversed()_

_reversed()_函数是一个直接的解决方案。然而，在某些情况下，更倾向于直接索引。

**Kotlin的数组提供_indices_属性，包含数组的索引在自然顺序中的_IntRange_。** 进一步地，**_IntRange_也有_reversed()_扩展函数**。

因此，我们可以迭代_array.indices.reversed()_，它提供了一个反转的索引范围，然后使用索引访问数组元素：
```kotlin
val resultList = mutableListOf```<String>```()

for (i in array.indices.reversed()) {
    resultList += array[i]
}

assertEquals(reversedList, resultList)
```

## 5. 使用_downTo()_函数

在Kotlin中，我们可以使用_downTo()_函数创建一个“反转范围”。从技术上讲，**_Int.downTo()_返回一个_IntProgression_而不是_IntRange_**。

**_IntProgression_是** _**IntRange**的超类型。**_IntRange_和_IntProgression_之间的差异在于**_IntRange_的固定步长为1**：
```kotlin
public class IntRange(start: Int, endInclusive: Int) : IntProgression(start, endInclusive, 1), ...{
    override val start: Int get() = first
    override val endInclusive: Int get() = last
    // ...
}
```

另一方面，**_IntProgression_允许我们指定步长值**。例如，**_downTo()_函数自动将步长设置为-1**，因此整数按相反顺序排列：
```kotlin
public infix fun Int.downTo(to: Int): IntProgression {
    return IntProgression.fromClosedRange(this, to, -1)
}
```

因此，**使用_array.lastIndex_结合_downTo()_是另一种在Kotlin中按相反顺序迭代数组的有效方法**。这种方法直接操作索引以实现预期的结果：
```kotlin
val resultList = mutableListOf```<String>```()
for (i in (array.lastIndex downTo 0)) {
    resultList += array[i]
}
assertEquals(reversedList, resultList)
```

值得注意的是，“ _array.lastIndex downTo 0_”在上述代码中实际上是函数调用“ _array.lastIndex.downTo(0)”。**由于_Int.downTo()_是一个_infix_扩展函数，我们可以以更易读的形式编写函数调用**。

## 6. 结论

在本文中，我们探讨了在Kotlin中按相反顺序迭代数组的不同方法。

如果我们不关心数组的索引，_array.reversed()_是最直接的解决方案。否则，可以选择两种方法直接按相反顺序索引元素：_array.indices.reversed()_和_array.lastIndex downTo 0_。

一如既往，示例的完整源代码可以在GitHub上找到。