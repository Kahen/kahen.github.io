---
date: 2022-11-01
category:
  - Kotlin
tag:
  - List
  - Map
  - Conversion
head:
  - - meta
    - name: keywords
      content: Kotlin, List, Map, Conversion, Null Values
---
# Kotlin中在列表转换为映射时跳过空值

列表和映射是Kotlin中的核心数据结构，通常用于完成各种编程任务。经常将键值对列表转换为映射以提高我们数据的组织性。然而，有时键值对中可能包含不需要在最终映射中的空值。

在本教程中，我们将探讨在Kotlin中将一对列表转换为映射时跳过空值的多种方法。

### 2. 使用for()循环

在将一对列表转换为映射时跳过空值的一个简单方法是使用经典的for()循环。我们遍历列表的每个元素并检查值是否为空。如果值不为空，我们将这对添加到映射中：

```kotlin
@Test
fun `使用for循环跳过空值`() {
    val pairs = listOf````<Pair<String, Int?>````>(Pair("a", 1), Pair("b", null), Pair("c", 3))
    val expected = mapOf("a" to 1, "c" to 3)
    val map = mutableMapOf``<String, Int>``()
    for (pair in pairs) {
        if (pair.second != null) {
            map[pair.first] = pair.second!!
        }
    }

    assertEquals(expected, map)
}
```

在上面的代码中，我们构建了一个包含空值的一对列表。接下来，我们创建了一个空的MutableMap，然后遍历列表的每个元素。如果这对的值不为空，我们将其添加到映射中。否则，我们跳过该对。最后，我们断言最终得到的映射包含正确的条目。

### 3. 使用filter()方法

另一种方法是使用filter()方法。这个方法接受一个谓词lambda函数并过滤列表，保留与谓词匹配的元素：

```kotlin
@Test
fun `使用filter方法跳过空值`() {
    val list = listOf````<Pair<String, Int?>````>(Pair("a", 1), Pair("b", null), Pair("c", 3))
    val filteredList = list.filter { it.second != null }
    val map = filteredList.toMap()

    val expected = mapOf("a" to 1, "c" to 3)

    assertEquals(expected, map)
}
```

同样，我们创建了一个包含空值的一对列表。随后，我们向filter()方法提供谓词函数，该函数移除任何第二值为空的对。最后，我们使用toMap()方法在过滤后将列表转换为映射。

### 4. 使用mapNotNull()方法

我们也可以利用mapNotNull()方法在将一对列表转换为映射时跳过空值。这个方法对列表的每个元素应用转换，并返回一个只包含非空值的新列表：

```kotlin
@Test
fun `使用mapNotNull方法跳过空值`() {
    val pairs = listOf````<Pair<String, Int?>````>(Pair("a", 1), Pair("b", null), Pair("c", 3))
    val expected = mapOf("a" to 1, "c" to 3)
    val result = pairs.mapNotNull { it.second?.let { value -> it.first to value } }.toMap()

    assertEquals(expected, result)
}
```

在上面的代码片段中，我们调用mapNotNull()方法将一对列表转换为只包含非空值的新列表。

转换适用于列表的每个元素，并返回一个新的对，其中包含原始对的第一个元素和第二个元素的非空值，或者如果第二个元素为空，则返回null。

mapNotNull()方法跳过任何空元素，并且不将它们包含在结果列表中。这导致最终的toMap()映射中没有空元素。

### 5. 使用fold()方法

我们还可以使用fold()方法在将一对列表转换为映射时跳过空值。这个方法使用指定的操作将集合的元素组合成单个值。

这个方法对列表的每个元素运行累积lambda，以累积结果。在这种情况下，我们将在跳过空值的同时在映射中累积结果：

```kotlin
@Test
fun `使用fold方法跳过空值`() {
    val pairs = listOf````<Pair<String, Int?>````>(Pair("a", 1), Pair("b", null), Pair("c", 3))
    val expected = mapOf("a" to 1, "c" to 3)
    val map = pairs.fold(mutableMapOf``<String, Int>``()) { acc, pair ->
        acc.apply {
            if (pair.second != null){
                put(pair.first, pair.second!!)
            }
        }
    }

    assertEquals(expected, map)
}
```

在这个测试中，我们使用fold()方法对一对列表进行迭代，跳过空值。我们传递给fold()方法的lambda函数检查对的第二个值是否不为空。如果是这样，我们将对添加到一个可变的映射中。最后，我们总是返回作为中间累积lambda的结果的累加器映射。

### 6. 结论

在本文中，我们探讨了在Kotlin中将一对列表转换为映射时跳过空值的多种方式。filterNotNull()方法从列表中过滤出空值，而mapNotNull()方法对列表的每个元素应用转换并返回一个只包含非空转换值的新列表。

此外，for()循环方法迭代一对列表并检查值是否为空。最后，fold()方法对列表的每个元素应用操作并累积结果。

如常，与本文相关的代码样本和测试用例可以在GitHub上找到。