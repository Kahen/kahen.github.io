---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Kotlin
  - Mutable List
  - List Manipulation
head:
  - - meta
    - name: keywords
      content: Kotlin, Mutable List, List Manipulation
------
# 如何在 Kotlin 中更改可变列表中的值 | Baeldung 关于 Kotlin

## 1. 引言

在 Kotlin 中，最常见的数据结构之一是可变 _List_，它允许存储和操作数据。因此，我们经常会遇到需要更改可变列表中值的情况。

在本文中，我们将探讨在 Kotlin 中更改可变列表中值的各种方法。

## 2. 使用 _set()_ 方法

更改可变列表中元素值的一种简单方法是使用 _set()_ 方法。**此方法接受两个参数，我们希望更改的元素的索引和我们希望分配给该元素的新值**：

```kotlin
@Test
fun `使用 set 方法更改可变列表中的值`() {
    val mutableList = mutableListOf("kotlin", "java", "android")
    mutableList.set(1, "swift")

    assertEquals(mutableListOf("kotlin", "swift", "android"), mutableList)
}
```

在上述单元测试中，我们首先创建一个包含“kotlin”，“java”和“android”的字符串可变列表。然后我们使用 _set()_ 方法将索引 1 处的元素值从“java”更改为“swift”。最后，我们断言可变列表现在包含预期的值，包括索引 1 处的新值“swift”。

## 3. 使用索引访问运算符

另一种有趣的方法是使用索引访问运算符。**此运算符允许我们通过其索引访问可变列表中的元素，然后为其分配一个新值**：

```kotlin
@Test
fun `使用索引访问运算符更改可变列表中的值`() {
    val mutableList = mutableListOf("kotlin", "java", "android")
    mutableList[1] = "swift"

    assertEquals(mutableListOf("kotlin", "swift", "android"), mutableList)
}
```

在这段代码片段中，创建一个字符串可变列表后，我们使用索引访问运算符访问索引位置 1 的元素，该元素包含值“java”。然后我们将新值“swift”分配给此索引位置的元素。最后，我们使用 _assertEquals()_ 方法验证可变列表是否包含预期的值。

## 4. 使用 _map()_ 方法

_map()_ 方法是我们可以用来更新列表中值的另一种方法。然而，此方法不会直接在列表上执行更改，而是**返回一个包含列表所有元素的新列表，包括我们希望更新的新值**。

它接受一个 lambda 函数作为参数，该函数对可变列表中的每个元素执行。lambda 函数接受一个参数——当前元素。**在 lambda 函数中，我们可以检查当前元素是否是我们想要更改的一个，并返回它的新值**。_map()_ 方法返回一个带有更新值的新列表：

```kotlin
@Test
fun `使用 map 方法创建具有更新值的新列表`() {
    val mutableList = mutableListOf("kotlin", "java", "android")
    val updatedList = mutableList.map { element ->
        if (element == "java") {
            "swift"
        } else {
            element
        }
    }

    assertEquals(mutableListOf("kotlin", "swift", "android"), updatedList)
}
```

在上述代码中，我们使用 _map()_ 方法对一个字符串可变列表进行迭代，并为每个元素返回一个新值。在 lambda 函数中，我们检查当前元素是否是“java”，如果是，我们返回新值“swift”。否则，我们保留原始值。然后我们断言更新后的列表包含预期的值。

这种方法有一个主要缺点：**它返回一个带有更新值的新列表，而不是就地更改值**。这意味着使用 _map()_ 方法创建新列表可能会消耗大量的内存。如果可变列表很大，它还可能影响性能。

## 5. 使用 _replaceAll()_ 方法

Kotlin 还提供了一个 _replaceAll()_ 方法，可以用来更新可变列表中的元素值。**此方法允许我们用新值替换列表中所有特定值的出现**：

```kotlin
@Test
fun `使用 replace 方法更改可变列表中的值`() {
    val mutableList = mutableListOf("kotlin", "java", "android")
    mutableList.replaceAll { if (it == "java") "swift" else it }

    assertEquals(mutableListOf("kotlin", "swift", "android"), mutableList)
}
```

在这个单元测试中，我们创建一个包含三个元素——“kotlin”，“java”和“android”的可变列表。然后我们使用 _replaceAll()_ 方法将所有“java”的出现替换为“swift”。最后，我们断言我们的可变列表现在包含预期的值。

_replaceAll()_ 方法可以对可变列表进行全局更改。然而，有一个潜在的缺点：**它将修改列表中所有指定值的出现**。这甚至可能发生在那些出现是预期不同的情况下。如果我们不了解这种行为，可能会导致意外的结果。

## 6. 结论

在本文中，我们探讨了更改可变列表中值的各种方法。虽然有些方法更简单直接，如使用 _set()_ 和索引访问运算符的方法，_map()_ 和 _replaceAll()_ 方法则有一些限制，我们必须在使用它们时牢记这些限制。

总的来说，这些方法都很容易使用，我们选择在程序中采用哪种方法取决于我们的需求。

如往常一样，源代码可以在 GitHub 上找到。