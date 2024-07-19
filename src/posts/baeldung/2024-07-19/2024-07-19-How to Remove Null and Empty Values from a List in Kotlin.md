---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Lists
  - Null and Empty Values
head:
  - - meta
    - name: keywords
      content: Kotlin, Lists, Null Values, Empty Values, Remove
---
# 如何在 Kotlin 中从列表中移除空值和 null 值 | Baeldung 关于 Kotlin

## 1. 引言

在 Kotlin 中使用列表时，经常需要移除空值和 null 值。null 值可能会在我们的代码中引起错误，而空值可能会给我们的列表增加不必要的冗余。

在本教程中，我们将探索在 Kotlin 中从列表中移除 null 和空值的不同方法。

## 2. 使用简单的列表迭代

我们将使用的第一个方法是程序化方法。它涉及遍历列表，并在此过程中移除所有 null 和空元素：

```kotlin
fun removeValuesViaIteration(listWithNullsAndEmpty: MutableList````````````<String?>````````````): List``````````````<String>`````````````` {
    val iterator = listWithNullsAndEmpty.iterator()
    while (iterator.hasNext()) {
        val element = iterator.next()
        if (element == null || element.isEmpty()) {
            iterator.remove()
        }
    }
    return listWithNullsAndEmpty as List``````````````<String>``````````````
}
```

上述方法接受一个可能包含 null 和空值的 `MutableList`。**一旦我们将这个列表传递给我们的 `removeValuesViaIteration()` 方法，我们就为列表创建一个 `Iterator` 来遍历列表中的每个元素**。

在每次迭代中，我们检查当前元素是否为 null 或空。如果是，我们使用迭代器的 `remove()` 函数从列表中移除此元素。最后，我们在完全遍历列表后返回相同的列表。注意，我们可以进行类型转换，因为 null 已经被移除。

让我们编写一个测试以确保我们的方法正常工作：

```kotlin
@Test
fun `通过列表迭代从列表中移除 null 和空值`() {
    val listWithNullsAndEmpty: MutableList````````````<String?>```````````` = mutableListOf("A", null, "", "C", null, "E")
    val listWithoutNullsAndEmpty = removeValuesViaIteration(listWithNullsAndEmpty)
    assertEquals(listOf("A", "C", "E"), listWithoutNullsAndEmpty)
}
```

## 3. 使用 `filterNotNull()` 和 `filterNot()` 方法

从列表中移除空值和 null 值的另一种方法是利用 `filterNotNull()` 和 `filterNot()` 方法。**`filterNotNull()` 方法返回一个新列表，其中只包含原始列表中的非 null 元素**：

```kotlin
val listWithNulls: List````````````<String?>```````````` = listOf("A", null, "", "C", null, "E")
val listWithoutNulls: List``````````````<String>`````````````` = listWithNulls.filterNotNull()
```

这段代码片段展示了我们如何使用 `filterNotNull()` 方法在一行代码中从列表中移除所有 null 值。因此，通过调用这个方法，我们最终得到一个新列表，包含值 `["A", "", "C", "E"]`。

**同样，`filterNot()` 方法对于从列表中移除所有空值非常有用**。`filterNot()` 方法接受一个 lambda 谓词函数作为参数，并返回一个新列表，其中只包含谓词返回 `false` 的元素。

让我们也演示一下 `filterNot()` 方法的使用：

```kotlin
val listWithEmpty: List``````````````<String>`````````````` = listOf("A", "", "C", "E")
val listWithoutEmpty: List``````````````<String>`````````````` = listWithEmpty.filterNot { it.isEmpty() }
```

将所有这些结合起来，我们可以通过连续调用这两个方法来实现我们的目标：

```kotlin
@Test
fun `使用 filterNotNull 和 filterNot 方法从列表中移除 null 和空值`() {
    val listWithNullsAndEmpty: List````````````<String?>```````````` = listOf("A", null, "", "C", null, "E")
    val listWithoutNulls: List``````````````<String>`````````````` = listWithNullsAndEmpty.filterNotNull()

    val listWithoutNullsAndEmpty: List``````````````<String>`````````````` = listWithoutNulls.filterNot { it.isEmpty() }

    assertEquals(listOf("A", "", "C", "E"), listWithoutNulls)
    assertEquals(listOf("A", "C", "E"), listWithoutNullsAndEmpty)
}
```

在这里，我们创建了一个包含 null 和空值的列表。然后我们调用这个列表的 `filterNotNull()` 方法以获得只包含非 null 值的列表，如第一个断言所示。随后，我们在调用 `filterNotNull()` 方法获得的列表上调用 `filterNot()` 方法，从而获得我们最终的列表，不包含 null 和空值。

## 4. 使用 `removeIf()` 方法

我们探索的前一种方法最终创建了一个新的列表。然而，**如果我们有一个 `MutableList`，我们可以使用 `removeIf()` 方法来就地移除所有 null 和空值**。同样，这个方法接受一个谓词作为参数，并移除所有谓词返回 `true` 的元素：

```kotlin
val listWithNullsAndEmpty: MutableList````````````<String?>```````````` = mutableListOf("A", null, "", "C", null, "E")
listWithNullsAndEmpty.removeIf { it == null || it.isEmpty() }
```

创建了一个包含 null 和空值的 `MutableList` 后，我们使用 `removeIf()` 方法一次性从列表中移除这些值。我们示例中的结果是 `["A", "C", "E"]`。

最后，我们也将测试上述代码以确保它按预期工作：

```kotlin
@Test
fun `使用 removeIf 方法从列表中移除 null 和空值`() {
    val listWithNullsAndEmpty: MutableList````````````<String?>```````````` = mutableListOf("A", null, "", "C", null, "E")
    listWithNullsAndEmpty.removeIf { it == null || it.isEmpty() }

    assertEquals(listOf("A", "C", "E"), listWithNullsAndEmpty)
}
```

## 5. 结论

本文探讨了在 Kotlin 中从列表中移除 null 和空值的方法。首先，我们讨论了涉及迭代列表并移除任何 null 或空元素的程序化方法。接下来，我们看到了如何使用内置方法实现相同的目标。

记住，**虽然 `removeIf()` 方法就地消除所有 null 和空值，但使用 `filterNotNull()` 和 `filterNot()` 方法各自返回一个新列表**。

如往常一样，本文中使用的代码可在 GitHub 上找到。我已经完成了翻译，以下是翻译的完整内容：

---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Lists
  - Null and Empty Values
head:
  - - meta
    - name: keywords
      content: Kotlin, Lists, Null Values, Empty Values, Remove
---
# 如何在 Kotlin 中从列表中移除空值和 null 值 | Baeldung 关于 Kotlin

## 1. 引言

在 Kotlin 中使用列表时，经常需要移除空值和 null 值。null 值可能会在我们的代码中引起错误，而空值可能会给我们的列表增加不必要的冗余。

在本教程中，我们将探索在 Kotlin 中从列表中移除 null 和空值的不同方法。

## 2. 使用简单的列表迭代

我们将使用的第一个方法是程序化方法。它涉及遍历列表，并在此过程中移除所有 null 和空元素：

```kotlin
fun removeValuesViaIteration(listWithNullsAndEmpty: MutableList````````````<String?>````````````): List``````````````<String>`````````````` {
    val iterator = listWithNullsAndEmpty.iterator()
    while (iterator.hasNext()) {
        val element = iterator.next()
        if (element == null || element.isEmpty()) {
            iterator.remove()
        }
    }
    return listWithNullsAndEmpty as List``````````````<String>``````````````
}
```

上述方法接受一个可能包含 null 和空值的 `MutableList`。**一旦我们将这个列表传递给我们的 `removeValuesViaIteration()` 方法，我们就为列表创建一个 `Iterator` 来遍历列表中的每个元素**。

在每次迭代中，我们检查当前元素是否为 null 或空。如果是，我们使用迭代器的 `remove()` 函数从列表中移除此元素。最后，我们在完全遍历列表后返回相同的列表。注意，我们可以进行类型转换，因为 null 已经被移除。

让我们编写一个测试以确保我们的方法正常工作：

```kotlin
@Test
fun `通过列表迭代从列表中移除 null 和空值`() {
    val listWithNullsAndEmpty: MutableList````````````<String?>```````````` = mutableListOf("A", null, "", "C", null, "E")
    val listWithoutNullsAndEmpty = removeValuesViaIteration(listWithNullsAndEmpty)
    assertEquals(listOf("A", "C", "E"), listWithoutNullsAndEmpty)
}
```

## 3. 使用 `filterNotNull()` 和 `filterNot()` 方法

从列表中移除空值和 null 值的另一种方法是利用 `filterNotNull()` 和 `filterNot()` 方法。**`filterNotNull()` 方法返回一个新列表，其中只包含原始列表中的非 null 元素**：

```kotlin
val listWithNulls: List````````````<String?>```````````` = listOf("A", null, "", "C", null, "E")
val listWithoutNulls: List``````````````<String>`````````````` = listWithNulls.filterNotNull()
```

这段代码片段展示了我们如何使用 `filterNotNull()` 方法在一行代码中从列表中移除所有 null 值。因此，通过调用这个方法，我们最终得到一个新列表，包含值 `["A", "", "C", "E"]`。

**同样，`filterNot()` 方法对于从列表中移除所有空值非常有用**。`filterNot()` 方法接受一个 lambda 谓词函数作为参数，并返回一个新列表，其中只包含谓词返回 `false` 的元素。

让我们也演示一下 `filterNot()` 方法的使用：

```kotlin
val listWithEmpty: List``````````````<String>`````````````` = listOf("A", "", "C", "E")
val listWithoutEmpty: List``````````````<String>`````````````` = listWithEmpty.filterNot { it.isEmpty() }
```

将所有这些结合起来，我们可以通过连续调用这两个方法来实现我们的目标：

```kotlin
@Test
fun `使用 filterNotNull 和 filterNot 方法从列表中移除 null 和空值`() {
    val listWithNullsAndEmpty: List````````````<String?>```````````` = listOf("A", null, "", "C", null, "E")
    val listWithoutNulls: List``````````````<String>`````````````` = listWithNullsAndEmpty.filterNotNull()

    val listWithoutNullsAndEmpty: List``````````````<String>`````````````` = listWithoutNulls.filterNot { it.isEmpty() }

    assertEquals(listOf("A", "C", "E"), listWithoutNullsAndEmpty)
}
```

在这里，我们创建了一个包含 null 和空值的列表。然后我们调用这个列表的 `filterNotNull()` 方法以获得只包含非 null 值的列表，如第一个断言所示。随后，我们在调用 `filterNotNull()` 方法获得的列表上调用 `filterNot()` 方法，从而获得我们最终的列表，不包含 null 和空值。

## 4. 使用 `removeIf()` 方法

我们探索的前一种方法最终创建了一个新的列表。然而，**如果我们有一个 `MutableList`，我们可以使用 `removeIf()` 方法来就地移除所有 null 和空值**。同样，这个方法接受一个谓词作为参数，并移除所有谓词返回 `true` 的元素：

```kotlin
val listWithNullsAndEmpty: MutableList````````````<String?>```````````` = mutableListOf("A", null, "", "C", null, "E")
listWithNullsAndEmpty.removeIf { it == null || it.isEmpty() }
```

创建了一个包含 null 和空值的 `MutableList` 后，我们使用 `removeIf()` 方法一次性从列表中移除这些值。我们示例中的结果是 `["A", "C", "E"]`。

最后，我们也将测试上述代码以确保它按预期工作：

```kotlin
@Test
fun `使用 removeIf 方法从列表中移除 null 和空值`() {
    val listWithNullsAndEmpty: MutableList````````````<String?>```````````` = mutableListOf("A", null, "", "C", null, "E")
    listWithNullsAndEmpty.removeIf { it == null || it.isEmpty() }

    assertEquals(listOf("A", "C", "E"), listWithNullsAndEmpty)
}
```

## 5. 结论

本文探讨了在 Kotlin 中从列表中移除 null 和空值的方法。首先，我们讨论了涉及迭代列表并移除任何 null 或空元素的程序化方法。接下来，我们看到了如何使用内置方法实现相同的目标。

记住，**虽然 `removeIf()` 方法就地消除所有 null 和空值，但使用 `filterNotNull()` 和 `filterNot()` 方法各自返回一个新列表**。

如往常一样，本文中使用的代码可在 GitHub 上找到。

OK