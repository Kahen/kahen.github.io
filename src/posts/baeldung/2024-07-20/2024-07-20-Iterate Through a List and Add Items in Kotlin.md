---
date: 2022-11-01
category:
  - Kotlin
  - 编程
tag:
  - Kotlin
  - 列表
  - 迭代
  - 动态添加
head:
  - - meta
    - name: keywords
      content: Kotlin, 列表迭代, 动态添加元素
---
# Kotlin中迭代列表并动态添加项

当我们使用Kotlin工作时，处理集合是一个常见且基本的任务。作为基本的集合类型，列表经常要求我们迭代其元素并在迭代过程中动态添加新项。

在本文中，我们将介绍在Kotlin中迭代列表的同时高效添加项的过程。

## 2. 问题介绍

像往常一样，我们通过一个例子来理解问题。假设我们有一个字符串列表：

```
["ab", "a", "cd", "c", "xyz"]
```

现在，我们想要遍历这个元素列表。**一旦字符串元素的长度大于1，我们就在它后面添加一个元素“`<- 一个长的”**：

```
["ab", "<- 一个长的", "a", "cd", "<- 一个长的", "c", "xyz", "<- 一个长的"]
```

或者，根据需求，**我们可能需要在这些“长元素”之前添加一个字符串元素“一个长的 ->`”**：

```
["一个长的 ->", "ab", "a", "一个长的 ->", "cd", "c", "一个长的 ->", "xyz"]
```

此外，**Kotlin提供了只读列表和可变列表**。通过考虑不同的插入位置案例以及列表的类型，我们会遇到几种不同的情况。

在本教程中，我们将讨论所有这些场景，并探索不同的解决方案来解决问题。

## 3. 当列表是只读时

假设给定的列表是一个Kotlin只读列表：

```kotlin
val myList = listOf("ab", "a", "cd", "c", "xyz")
```

由于列表是只读的，我们实际上不能向其中添加元素。因此，**我们将创建一个可变列表，将所需的元素添加到正确的位置，然后将其作为只读列表返回**。

接下来，让我们看看如何实现它。

### 3.1. 使用 forEach() 函数

一种直接的方法是创建一个空的可变列表，然后使用 forEach() 函数迭代给定的列表。**在迭代过程中，我们将元素添加到预先初始化的可变列表中**：

```kotlin
fun byForEach(list: List````<String>````): List````<String>```` {
    val result = mutableListOf````<String>````()
    list.forEach {
        result += it
        if (it.length > 1) {
            result += "<- 一个长的"
        }
    }
    return result.toList()
}
```

接下来，让我们用我们的示例输入测试 byForEach() 函数：

```kotlin
assertEquals(
    listOf("ab", "<- 一个长的", "a", "cd", "<- 一个长的", "c", "xyz", "<- 一个长的"),
    byForEach(myList)
)
```

当我们运行测试时，它通过了。

### 3.2. 使用 buildList() 函数

我们可以使用Kotlin的 buildList() 函数来节省可变列表声明：

```kotlin
fun byBuildList(list: List````<String>````) =
    buildList {
        list.forEach {
            this += it
            if (it.length > 1) {
                this += "<- 一个长的"
            }
        }
    }
```

正如我们所看到的，**buildList() 函数通过填充一个可变列表来构建一个新的只读列表，以适应指定的操作**，例如本例中使用的 add() 或 +=（plusAssign）运算符。

如果我们使用相同的输入测试 buildList() 解决方案，它会产生预期的结果：

```kotlin
assertEquals(
    listOf("ab", "<- 一个长的", "a", "cd", "<- 一个长的", "c", "xyz", "<- 一个长的"),
    byBuildList(myList)
)
```

### 3.3. 在目标元素前添加元素

到目前为止，我们的方法涉及遍历元素列表并在检测到“长元素”后添加一个新元素。如果需求转变为在每个“长元素”前添加新元素，**我们可以很容易地通过交换 if 块和 result += it 或 this += it 语句来调整当前解决方案**。

由于对 forEach() 和 buildList() 方法的调整非常相似，让我们使用 buildList() 作为示例来展示修改后的代码：

```kotlin
fun addBeforeByBuildList(list: List````<String>````) =
    buildList {
        list.forEach {
            if (it.length > 1) {
                this += "一个长的 ->"
            }
            this += it
        }
    }
```

现在，如果我们测试这个函数，我们会得到预期的结果：

```kotlin
assertEquals(
    listOf("一个长的 ->", "ab", "a", "一个长的 ->", "cd", "c", "一个长的 ->", "xyz"),
    addBeforeByBuildList(myList)
)
```

## 4. 当列表是可变时

当处理可变列表时，使用 forEach() 或 buildList() 方法是不必要的。这是因为**我们可以在迭代过程中无缝地向原始可变列表添加新元素，消除了创建新列表和复制所有元素的需要**。

接下来，让我们看看如何做到这一点。

### 4.1. 使用 ListIterator

**ListIterator 允许我们在迭代时修改列表**，例如添加或删除元素。那么，让我们使用 ListIterator 来解决问题：

```kotlin
fun byListIterator(list: MutableList````<String>````) {
    val it = list.listIterator()
    for (e in it) {
        if (e.length > 1) {
            it.add("<- 一个长的")
        }
    }
}
```

如上所示的代码，**我们使用 ListIterator 与 for 循环来填充可变列表中的元素**。此外，当我们检测到一个“长元素”时，我们**使用 ListIterator.add() 插入一个新元素**。

我们可以编写一个测试来验证它是否按预期工作：

```kotlin
val myMutableList = mutableListOf("ab", "a", "cd", "c", "xyz")
byListIterator(myMutableList)
assertEquals(
    listOf("ab", "<- 一个长的", "a", "cd", "<- 一个长的", "c", "xyz", "<- 一个长的"),
    myMutableList
)
```

### 4.2. 在每个“长元素”前添加元素

我们已经看到 ListIterator 允许我们在迭代过程中添加元素。此外，使用 ListIterator，**我们可以在正向和反向两个方向上迭代列表**。如果我们需要在当前条目前插入一个元素，这非常有用：

```kotlin
fun addBeforeByListIterator(list: MutableList````<String>````) {
    val it = list.listIterator()
    for (e in it) {
        if (e.length > 1) {
            it.previous()
            it.add("一个长的 ->")
            it.next()
        }
    }
}
```

在 addBeforeByListIterator() 函数中，识别出“长元素”后，**我们的程序包括使用 ListIterator.previous() 向后移动一步**，然后使用 add() 添加指针元素。随后，**我们调用 ListIterator.next() 返回到当前位置**。

最后，让我们测试一下它是否解决了问题：

```kotlin
val myMutableList = mutableListOf("ab", "a", "cd", "c", "xyz")
addBeforeByListIterator(myMutableList)
assertEquals(
    listOf("一个长的 ->", "ab", "a", "一个长的 ->", "cd", "c", "一个长的 ->", "xyz"),
    myMutableList
)
```

## 5. 结论

在本教程中，我们探讨了在迭代列表的同时添加元素的各种方法。此外，我们还查看了只读和可变列表的场景。

如常，示例的完整源代码可在GitHub上找到。