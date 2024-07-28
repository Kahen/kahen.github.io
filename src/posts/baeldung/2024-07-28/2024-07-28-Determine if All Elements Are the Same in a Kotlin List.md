---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Lists
  - Collection Operations
head:
  - - meta
    - name: keywords
      content: Kotlin, List, all elements equal, distinct, count, set
------
# 确定 Kotlin 列表中的所有元素是否相同 | Baeldung 关于 Kotlin---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Lists
  - Collection Operations
head:
  - - meta
    - name: keywords
      content: Kotlin, List, all elements equal, distinct, count, set
------
# 确定 Kotlin 列表中的所有元素是否相同 | Baeldung 关于 Kotlin

如果你有几年 Kotlin 语言和服务器端开发的经验，并且有兴趣与社区分享这些经验，请查看我们的**贡献指南**。

## 1. 引言

在编程中，处理列表和比较列表中的元素是一项常见任务。

在本教程中，我们将探索确定列表中所有元素是否相同的各种方法。

## 2. 使用 for() 循环

首先，我们可以使用经典的 for() 循环来检查列表中的所有元素是否相同：

```
fun areAllElementsSameUsingForLoop(list: List`````<Int>`````): Boolean {
    if (list.isEmpty() || list.size == 1) return true
    val firstElement = list[0]
    for (element in list) {
        if (element != firstElement) {
            return false
        }
    }

    return true
}
```

在上面的代码中，我们使用 for() 循环遍历列表，并检查所有元素是否等于列表的第一个元素。**如果我们发现任何不匹配，我们立即返回** _false_ **，否则，我们返回** _true_ **。此外，空列表或只有一个元素的列表将始终返回** _true_ **。

让我们确保这种方法按预期工作：

```
@Test
fun `test all elements are same using for loop`() {
    val list1 = listOf(3, 3, 3)
    val list2 = listOf(2,3,4)
    val list3 = emptyList`````<Int>`````()

    assertTrue(areAllElementsSameUsingForLoop(list1))
    assertFalse(areAllElementsSameUsingForLoop(list2))
    assertTrue(areAllElementsSameUsingForLoop(list3))
}
```

## 3. 使用 all() 方法

Kotlin 的 all() 方法是一个内置函数，如果给定列表中的所有元素满足给定的条件，则返回 true：

```
fun areAllElementsSameUsingAllMethod(list: List`````<Int>`````) = list.all { it == list[0] }
```

在这段代码中，我们使用 all() 方法检查列表中的所有元素是否相同。我们传入一个谓词函数，将列表中的每个元素与列表的第一个元素进行比较。**请注意，如果列表或集合为空，则此方法返回 true**。

现在，让我们测试这种方法以确保它正确工作：

```
@Test
fun `test all elements are same using all method`() {
    val list1 = listOf(3, 3, 3)
    val list2 = listOf(2,3,4)
    val list3 = emptyList`````<Int>`````()

    assertTrue(areAllElementsSameUsingAllMethod(list1))
    assertFalse(areAllElementsSameUsingAllMethod(list2))
    assertTrue(areAllElementsSameUsingAllMethod(list3))
}
```

## 4. 使用 distinct() 方法

distinct() 方法是 Kotlin 的另一个内置方法。**如果集合为空，则此方法返回一个空列表**：

```
fun areAllElementsSameUsingDistinctMethod(list: List`````<Int>`````) =
    list.distinct().size <= 1
```

所以，要知道列表中的所有元素是否相同，这种方法应该确保列表中不同元素的数量为零（对于空输入列表）或一（对于非空输入列表）。**任何超过一个的剩余数量意味着原始列表中至少有两个不同的元素，我们的方法将返回 false**。

让我们测试这种方法的正确性：

```
@Test
fun `test all elements are same using distinct method`() {
    val list1 = listOf(3, 3, 3)
    val list2 = listOf(2,3,4)
    val list3 = emptyList`````<Int>`````()

    assertTrue(areAllElementsSameUsingDistinctMethod(list1))
    assertFalse(areAllElementsSameUsingDistinctMethod(list2))
    assertTrue(areAllElementsSameUsingDistinctMethod(list3))
}
```

## 5. 使用 count() 方法

同样，我们可以使用 count() 方法来实现我们的目标。通过使用列表的第一个元素，我们可以检查该元素在列表中的频率是否等于列表的大小：

```
fun areAllElementsSameUsingCountMethod(list: List```<Any>```): Boolean {
    return list.count { it == list[0] } == list.size
}
```

**count() 方法接受一个谓词函数，它将每个元素与列表的第一个元素进行比较，同时计算匹配项。**

让我们也测试这种方法：

```
@Test
fun `test all elements are same using count method`() {
    val list1 = listOf(3, 3, 3)
    val list2 = listOf(2,3,4)
    val list3 = emptyList```<Any>```()

    assertTrue(areAllElementsSameUsingCountMethod(list1))
    assertFalse(areAllElementsSameUsingCountMethod(list2))
    assertTrue(areAllElementsSameUsingCountMethod(list3))
}
```

## 6. 使用 Set

另一种检查列表中所有元素是否相同的直接方法是使用 Set。Set 包含不同的元素，不允许重复：

```
fun areAllElementsSameUsingSetMethod(list: List```<Any>```): Boolean {
    return list.toSet().size <= 1
}
```

**在这段代码中，我们首先使用 toSet() 方法将 List 转换为 Set，然后检查 Set 是否包含一个或更少的元素**。相应地，如果它包含，我们返回 true。相反，如果 Set 包含多于一个元素，我们返回 false。

像往常一样，让我们检查这种方法是否正确：

```
@Test
fun `test all elements are same using set method`() {
    val list1 = listOf(3, 3, 3)
    val list2 = listOf(2,3,4)
    val list3 = emptyList```<Any>```()

    assertTrue(areAllElementsSameUsingSetMethod(list1))
    assertFalse(areAllElementsSameUsingSetMethod(list2))
    assertTrue(areAllElementsSameUsingSetMethod(list3))
}
```

## 7. 结论

在本文中，我们探讨了在 Kotlin 中检查列表元素是否相同的多种方式。我们查看了使用内置方法如 all()、distinct() 和 count() 方法等实现这一点的方法。此外，我们还探索了其他技术，如经典的 for() 循环和 Set 数据结构。

如常，示例的完整源代码可在 GitHub 上找到。

OK