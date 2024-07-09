---
date: 2022-11-01
category:
  - Kotlin
  - Maps
tag:
  - Kotlin
  - Map Merging
head:
  - - meta
    - name: keywords
      content: Kotlin, Map, Merging, Tutorial
---
# Kotlin中合并两个Map的指南

## 1. 概述

_映射_是在大多数Kotlin应用程序中常用的数据结构。**通过合并两个映射，我们可以将两个映射中的键值对组合到一个单一的映射中**。

在本教程中，我们将探索在Kotlin中合并两个映射的多种方法。此外，我们还将看到每种方法如何处理冲突元素的场景，其中默认行为是优先考虑来自第二个映射的元素。

## 2. 使用加号(+)运算符

首先，让我们初始化两个映射，_map1_和_map2_，它们之间有字符串和整数值的映射：

```kotlin
val map1 = mapOf("a" to 1, "b" to 2)
val map2 = mapOf("b" to 3, "c" to 4)
```

我们必须注意，_map1_和_map2_是不可变的，因为我们使用_mapOf()_来初始化它们。

接下来，让我们**使用+运算符将map1和map2合并到一个新的映射，mergedMap**：

```kotlin
val mergedMap = map1 + map2
```

最后，让我们通过合并操作验证我们是否得到了正确的结果：

```kotlin
assertEquals(mapOf("a" to 1, "b" to 3, "c" to 4), mergedMap)
```

太好了！我们得到了正确的结果。

## 3. 使用加等于(+=)运算符

在具有可变映射的场景中，我们可以使用现有的映射来保存合并两个映射后的结果。

首先，让我们定义一个可变的映射_map1_和一个不可变的映射_map2_：

```kotlin
val map1 = mutableMapOf("a" to 1, "b" to 2)
val map2 = mapOf("b" to 3, "c" to 4)
```

重要的是，我们使用_mutableMapOf()_来初始化可变映射。

现在，我们可以**使用+=运算符将两个映射中的键值对合并到可变映射_map1_中**：

```kotlin
map1 += map2
```

在这种情况下，我们通过使用现有的映射更有效地利用了存储。

像之前一样，我们应该验证_map1_中的合并结果：

```kotlin
assertEquals(mapOf("a" to 1, "b" to 3, "c" to 4), map1)
```

太棒了！我们这次也做对了。

## 4. 使用_putAll()_函数

另外，我们可以使用_putAll()_函数将_map2_中的所有键值对放入可变映射_map1_中：

```kotlin
map1.putAll(map2)
```

进一步，让我们验证合并后的映射_map1_的内容：

```kotlin
assertEquals(mapOf("a" to 1, "b" to 3, "c" to 4), map1)
```

我们得到了预期的结果。

## 5. 使用_associateWith()_函数

使用_putAll()_函数，我们得到了默认行为，即按原样合并键值对。然而，我们可以使用_associateWith()_函数定义合并的自定义行为。

首先，让我们定义两个不可变的映射_map1_和_map2_：

```kotlin
val map1 = mapOf("a" to 1, "b" to 2)
val map2 = mapOf("b" to 3, "c" to 4)
```

接下来，让我们**使用associateWith()函数将每个键映射为来自map1或map2的值**：

```kotlin
val mergedMap = (map1.keys + map2.keys).associateWith { key ->
  key -> map2[key] ?: map1[key]!!
}
```

我们优先考虑_map2_，如果_key_在_map2_中不存在，则使用_map1_。进一步，**我们使用!!运算符来声明，如果_key_在_map2_中缺失，则我们确信它在_map1_中存在**。

最后，我们应该验证_mergedMap_是否包含正确的键值对：

```kotlin
assertEquals(mapOf("a" to 1, "b" to 3, "c" to 4), mergedMap)
```

看来我们这次也做得很好。

## 6. 使用Java _Map_ 中的 _merge()_

Kotlin与Java完全兼容。因此，我们可以直接调用Java类中的方法。

首先，让我们定义一个可变的映射_map1_和一个不可变的映射_map2_，并提供一些示例键值对：

```kotlin
val map1 = mutableMapOf("a" to 1, "b" to 2)
val map2 = mapOf("b" to 3, "c" to 4)
```

现在，让我们遍历不可变映射_map2_中的键值对，并使用_merge()_将它们合并到_map1_中：

```kotlin
map2.forEach { (key, value) ->
  map1.merge(key, value) { oldVal, newVal -> newVal * oldVal }
}
```

需要注意的是，**oldVal和newVal分别对应来自map1和map2的值**。此外，_merge()_方法比Map中的_put()_方法的优点是提供重映射函数的灵活性。在这种情况下，对于每个冲突的元素，我们将原始映射中的值相乘以获得合并映射的值。

最后，我们应通过检查_map1_中的键值对来验证我们的方法：

```kotlin
assertEquals(mapOf("a" to 1, "b" to 6, "c" to 4), map1)
```

正如预期的那样，所有来自_map2_和_map1_的键值对现在都在_map1_中。

## 7. 结论

在本教程中，我们**探索了在Kotlin中合并两个映射的不同方式**。此外，我们学习了如何解决用例，使用如+和+=等运算符以及如putAll()和associateWith()等函数。

最后，我们还利用了Java Map接口中_merge()_方法的互操作性。

一如既往，本文的代码可在GitHub上找到。