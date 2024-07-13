---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Map
  - Arrays
head:
  - - meta
    - name: keywords
      content: Kotlin, Map, Arrays, create map, two arrays
---
# Kotlin中从两个数组创建Map的多种方法

在Kotlin中，一个_Map_是一个键值对集合，每个键都是唯一的。我们可以通过使用键作为索引来访问与键关联的值。当然，我们可能会遇到需要从两个数组创建一个map的情况。简单来说，我们使用一个数组的值作为map的键，另一个数组的值作为map的值。

在本教程中，我们将探索在Kotlin中从两个数组创建map的各种方法。

## 2. 假设
为了有效地从两个数组创建一个map，我们需要强调一些假设和边缘情况，这些将指导我们很快要查看的解决方案：

- 我们应该期望我们讨论的两个数组长度相同。
- 第一个数组包含键，第二个数组包含相应的值。
- 构成map键的数组包含唯一元素。如果遇到重复元素，map中的最新键将覆盖具有相同键的先前条目。

## 3. 使用_for()_循环
_for()_循环是创建两个数组map的直接方法。**我们可以通过创建一个辅助方法来实现，该方法接受两个数组作为参数并返回一个_Map_**：

```kotlin
fun createMap(keys: Array`<String>`, values: Array`<Int>`): Map``<String, Int>`` {
    val map = mutableMapOf``<String, Int>``()
    for (i in keys.indices) {
        map[keys[i]] = values[i]
    }
    return map
}
```

在上面的代码中，我们使用_mutableMapOf()_方法创建了一个空的_MutableMap_。接下来，我们使用_for()_循环遍历两个数组的索引，并将每个键值对添加到map中。

测试我们的代码始终是一个好的实践，以确保它正确工作：

```kotlin
@Test
fun `creates a map from two arrays using a custom approach`() {
    val keys = arrayOf("a", "b", "c")
    val values = arrayOf(1, 2, 3)

    val map = createMap(keys, values)
    val expected = mapOf("a" to 1, "b" to 2, "c" to 3)

    assertEquals(3, map.size)
    assertEquals(expected, map)
}
```

从这个单元测试中，我们看到我们正在构建一个具有_String_键和_Int_值的_Map_。

## 4. 使用_zip()_方法
内置的_zip()_方法为我们的问题提供了另一个简单的解决方案。**它操作一个_Array_，接受另一个_Array_作为参数，并返回一个对列表，该列表可以使用_toMap()_方法转换为_Map_**：

```kotlin
@Test
fun `creates a map from two arrays using zip() method`() {
    val keys = arrayOf("a", "b", "c")
    val values = arrayOf(1, 2, 3)

    val map = keys.zip(values).toMap()
    val expected = mapOf("a" to 1, "b" to 2, "c" to 3)

    assertEquals(3, map.size)
    assertEquals(expected, map)
}
```

正如前面解释的，我们使用_zip()_方法与两个数组结合，并使用_toMap()_方法来获取我们的map。注意断言语句，它们向我们展示了map中每个键的预期值。

## 5. 使用_associateWith()_方法
第三，我们可以利用_associateWith()_方法从两个数组创建map。**此方法通过索引将键数组中的每个键与值数组中的相应值关联起来创建map**：

```kotlin
@Test
fun `creates a map from two arrays using the associateWith() method`() {
    val keys = arrayOf("a", "b", "c")
    val values = arrayOf(1, 2, 3)

    val map = keys.associateWith { key -> values[keys.indexOf(key)] }
    val expected = mapOf("a" to 1, "b" to 2, "c" to 3)

    assertEquals(3, map.size)
    assertEquals(expected, map)
}
```

在这个单元测试中，我们使用_associateWith()_方法通过将键数组中的每个键与第二个数组中的相应值关联起来来创建map。最后，我们使用断言语句确保正确的值映射到第一个数组中的特定键。

与其他方法不同，这种方法对处理重复键的方式不同。**当遇到重复键时，它不会用现有map条目替换，而是保留第一个map条目**。这是因为它使用了_indexOf()_方法，该方法始终返回每个键的第一个索引。

## 6. 使用_mapIndexed()_方法
我们还可以使用_mapIndexed()_方法从两个数组创建map。**此方法接受一个lambda函数，然后将其应用于原始数组的每个元素**。最后，它返回键值对列表：

```kotlin
@Test
fun `creates a map from two arrays using the mapIndexed() method`() {
    val keys = arrayOf("a", "b", "c")
    val values = arrayOf(1, 2, 3)

    val pairs = keys.mapIndexed { index, key -> key to values[index] }

    val map = pairs.toMap()
    val expected = mapOf("a" to 1, "b" to 2, "c" to 3)

    assertEquals(3, map.size)
    assertEquals(expected, map)
}
```

这段代码片段展示了我们如何通过调用_mapIndexed()_方法在第一个数组上获得一对列表。此外，我们向该方法提供了一个lambda函数，该函数使用它们的索引将一个键映射到第二个数组中的相应值。最后，我们使用_toMap()_方法将一对列表转换为map。

## 7. 结论
在本文中，我们探索了在Kotlin中从两个数组创建map的各种方式。虽然基于循环的方法更加灵活，但其他方法提供了简单和优雅。

例如，_zip()_方法非常简单，而_associateWith()_和_mapIndex()_方法则更加简洁。因此，选择最适合我们项目用例的方法非常重要。根据项目的复杂性，一种方法可能比另一种方法更适合。

如常，本文中使用的代码可以在GitHub上找到。