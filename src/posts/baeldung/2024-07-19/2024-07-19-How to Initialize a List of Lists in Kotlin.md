---
date: 2024-01-13
category:
  - Kotlin
tag:
  - Kotlin
  - Lists
  - Arrays
head:
  - - meta
    - name: keywords
      content: Kotlin, Lists of Lists, Arrays, Data Structures
------
# 如何在 Kotlin 中初始化列表的列表

## 1. 引言

要有效地使用 Kotlin，了解如何初始化列表的列表是重要的。也被称为二维数组或矩阵，列表的列表是一种数据结构，定义为一个列表，其中的每个元素本身是一个列表。

在本教程中，我们将探索在 Kotlin 中初始化列表的列表的几种方法。

## 2. 什么是列表的列表？

在大多数编程语言中，包括 Kotlin，列表的列表被实现为二维数组：

## ![img](https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/Screenshot-2024-01-13-at-02.58.36-300x162.png)

在上面的图形表示中，**外层列表代表行，内层列表代表列**。

## 3. 使用 _listOf()_ 方法

我们将探索的第一种方法使用 _listOf()_ 方法。**我们可以利用这种方法创建一个不可变的列表的列表**：

```
@Test
fun `Creates an immutable list of immutable lists using listOf()`() {
    val listOfLists = listOf(listOf(1, 2), listOf(3, 4), listOf(5, 6))

    assertEquals(3, listOfLists.size)
    assertEquals(listOf(1, 2), listOfLists[0])
    assertEquals(listOf(3, 4), listOfLists[1])
    assertEquals(listOf(5, 6), listOfLists[2])
}
```

在上述单元测试中，我们使用 _listOf()_ 方法创建了包含三个列表的列表，每个列表包含两个整数。随后，我们验证列表恰好包含三个列表，并确保每个内部列表包含正确的元素。

**_listOf()_ 允许我们为每个子列表指定唯一的值**。

## 4. 使用 List 构造器

另一种初始化列表的列表的方法是使用 _List_ 或 _MutableList_ 构造器，这取决于我们是否需要一个可变的或不可变的列表：

```
@Test
fun `Creates an immutable list of mutable lists using List constructor`() {
    val listOfLists = List(3) { MutableList``<Int>``(2) {0} }
    assertEquals(3, listOfLists.size)
    assertEquals(listOf(0, 0), listOfLists[0])
    assertEquals(listOf(0, 0), listOfLists[1])
    assertEquals(listOf(0, 0), listOfLists[2])
}
```

在这里，我们创建了一个包含三个空的可变列表的不可变列表，类型为 _Integer_。然后我们断言恰好有三个内部列表，每个列表恰好有两个整数，全部为零。

与 _listOf()_ 不同，**使用 _List_ 构造器将导致子列表具有相同的项目**。

## 5. 使用 _map()_ 方法

第三种实现目标的方法是使用 _map()_ 方法。我们使用这种方法创建包含可变或不可变列表的列表，尽管我们获得的父列表是不可变的。

### 5.1. 创建不可变列表的列表

让我们使用 _map()_ 方法创建包含三个内部不可变列表的列表：

```
@Test
fun `Creates an immutable list of immutable lists using map method`() {
    val listOfLists = (0..2).map { _ -> (0..1).map { 0 } }

    assertEquals(3, listOfLists.size)
    assertEquals(listOf(0, 0), listOfLists[0])
    assertEquals(listOf(0, 0), listOfLists[1])
    assertEquals(listOf(0, 0), listOfLists[2])
}
```

首先，我们使用 “…” 运算符创建从零到二的整数范围，然后使用 _map()_ 方法和一个匿名函数，该函数接受一个下划线作为其参数并返回另一个包含两个零的列表。

由于我们的外部 _map()_ 方法运行三次，内部 _map()_ 函数也将运行三次，在每一步中将创建一个包含两个零的子列表。最后，我们断言我们的列表恰好有三个子列表，每个子列表包含两个零。

就像 _List_ 构造器一样，**_map()_ 限制我们用相同的项目初始化子列表**。

### 5.2. 创建可变列表的列表

仍然使用 _map()_ 方法，我们也可以创建 _List_ 的 _MutableLists_：

```
@Test
fun `Creates an immutable list of mutable lists using map method`() {
    val listOfMutableLists = (0..2).map { mutableListOf``<Int>``() }

    assertEquals(3, listOfMutableLists.size)
    assertTrue(listOfMutableLists.all { it.isEmpty() })
}
```

在上述代码中，我们使用 _map()_ 方法在零到二的范围内，并提供一个 lambda 表达式，创建三个可变列表。对于每次执行，lambda 将返回一个新的空可变列表。lambda 将总共执行三次。**这种方法允许我们创建空的子列表**。

最后，我们断言我们的列表恰好包含三个子列表，每个子列表都是空的。

## 6. 结论

在本文中，我们探索了在 Kotlin 中初始化列表的列表的各种方法。

虽然一些方法限制我们用相同的元素初始化每个子列表，如 _map()_ 方法，但像 _listOf()_ 方法这样的方法则允许我们控制每个单独元素的值。

一如既往，本文中使用的代码可以在 GitHub 上找到。