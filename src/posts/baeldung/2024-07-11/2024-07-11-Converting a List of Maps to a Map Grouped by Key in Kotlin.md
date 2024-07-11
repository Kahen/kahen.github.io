---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - List of Maps
  - Map Grouping
head:
  - - meta
    - name: keywords
      content: Kotlin, Map Grouping, List of Maps, GroupBy, Fold
------
# Kotlin中将列表中的映射转换为按键分组的映射

作为Kotlin开发者，我们经常使用列表和映射作为核心数据结构来解决不同的编程挑战。有时，我们可能需要处理列表中的映射，以获得一个不同的映射，该映射按键分组数据。也就是说，我们需要将列表中的映射转换为列表的映射。

在本教程中，我们将探索在Kotlin中将列表中的映射转换为按键分组的映射的不同方法。

## 2. 问题解释

为了更好地理解我们试图解决的问题，让我们考虑这个示例数据，包括所有示例的输入和预期输出：

```
val listOfMaps = listOf(
    mapOf("name" to "Albert", "age" to "18"),
    mapOf("name" to "Naomi", "age" to "26"),
    mapOf("name" to "Dru", "age" to "18"),
    mapOf("name" to "Steve", "age" to "30")
)
val expectedMap = mapOf(
    "name" to listOf("Albert", "Naomi", "Dru", "Steve"),
    "age" to listOf("18", "26", "18", "30")
)
```

这段代码表示变量_listOfMaps_是一个包含键值对映射的列表。然而，我们想要将所有这些映射合并成单个映射，按键分组，最终得到_expectedMap_。**因此，这个新的_Map_使用来自原始_listOfMaps_的所有键，并将每个键与一个_List_的值关联**。这些值代表原始_listOfMaps_中与特定键关联的所有值。

## 3. 使用_for()_循环

将列表中的映射转换为按键分组的映射的一个直接方法是使用简单的_for()_循环：

```
fun groupByUsingForLoop(input: List``<Map<String, String>``>): Map``<String, List<String>``> {
    val result = mutableMapOf`<String, MutableList<String>`>()()
    for (map in input) {
        for ((key, value) in map) {
            result.getOrPut(key) { mutableListOf() }.add(value)
        }
    }
    return result
}
```

我们的辅助方法定义了一个_MutableMap_，表示将保存分组数据的映射。此外，它接受原始映射的列表中的值。

首先，我们创建一个空的可变映射来存储结果。然后，我们遍历输入列表中的每个映射。**对于每个_Map_，我们还使用嵌套的_for()_循环遍历其条目**。随后，我们使用_getOrPut()_方法来获取与键关联的当前值列表，或者如果键在结果映射中尚未存在，则创建一个新的空列表。最后，我们将当前值添加到列表中。

像往常一样，编写单元测试以确保我们的代码按预期工作是一个好习惯：

```
@Test
fun `converts list of maps to maps grouped by key using for loop`() {
    assertEquals(expectedMap, groupByUsingForLoop(listOfMaps))
}
```

在这个测试中，我们首先创建一个映射列表。每个映射包含两个条目，一个_name_和一个_age_键。我们的最终目标是将这个映射列表转换为一个新的映射，其中原始映射的所有键成为新映射的键。此外，这些映射中的值应该是与给定键关联的所有值的列表。

## 4. 使用_groupBy()_方法

现在，我们将看看我们可以用内置方法解决这个问题的一些方法。Kotlin的标准库提供了一个_groupBy()_方法，可以根据键对集合中的元素进行分组。此外，此方法接受一个lambda函数，为列表中的每个元素生成一个键。**结果，每个条目在结果_Map_中的值被收集到具有相同原始键的元素列表中**：

```
@Test
fun `converts list of maps to maps grouped by key using groupBy method`() {
    val result = listOfMaps
        .flatMap { map -> map.entries }
        .groupBy({ it.key }, { it.value })

    assertEquals(expectedMap, result)
}
```

在上面的代码中，我们获取输入的映射列表，并使用_flatMap()_方法将映射列表展平为条目列表。**接下来，我们使用_groupBy()_方法按其键对条目进行分组，并创建一个列表映射**。最后，它创建了一个映射，使用原始列表中的键作为自己的键。每个键与一个列表关联，该列表包含在原始输入列表中与该键关联的所有值。

## 5. 使用_fold()_方法

此外，我们可以使用_fold()_方法按特定键对列表中的映射进行分组。这种方法累积映射的条目到列表映射中。实际上，它接一个初始映射和一个lambda函数，并将其应用于输入列表的每个条目：

```
fun groupByUsingFoldMethod(input: List``<Map<String, String>``>): Map``<String, List<String>``> {
    return input.fold(emptyMap()) { acc, map ->
        acc.keys.union(map.keys).associateWith { key ->
            acc.getOrDefault(key, emptyList()) + map.getOrDefault(key, "")
        }
    }
}
```

我们的辅助方法接受一个映射列表作为输入。_fold()_方法从空映射开始。**输入列表中的每个映射将当前映射的键与累加器映射的键配对**。

此外，我们使用_associateWith()_方法将每个键与值列表关联。列表包含累加器映射和当前映射中键的值。结果，最终映射拥有原始列表中的所有键作为其键。具体来说，每个键与一个列表关联，该列表包含在原始列表中的条目中与该键关联的所有值。

像往常一样，让我们为正确性单元测试这个方法：

```
@Test
fun `converts list of maps to maps grouped by key using fold method`() {
    assertEquals(expectedMap, groupByUsingFoldMethod(listOfMaps))
}
```

通过使用我们的辅助方法，我们可以确保我们获得一个精确地将所有键与值列表关联的映射。

## 6. 结论

在本文中，我们探讨了在Kotlin中将列表中的映射转换为按键分组的列表映射的不同方法。第一种方法使用经典的_for()_循环。另一方面，其他方法依赖于Kotlin的内置方法，如_fold()_和_groupBy()_方法。我们可以根据需要在项目中舒适地采用这些解决方案。

正如往常一样，本文中使用的代码可在GitHub上找到。