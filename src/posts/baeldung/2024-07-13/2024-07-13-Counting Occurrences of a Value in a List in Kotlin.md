---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - List
  - Count Occurrences
head:
  - - meta
    - name: keywords
      content: Kotlin, List, Count Occurrences, Tutorial
------
# Kotlin中统计列表中值的出现次数

在Kotlin中，_List_是一个具有特定顺序的元素集合。有时，我们可能需要找出列表中某个特定元素出现的次数。这在识别重复项或统计特定列表元素的频率等情况下非常有用。

在本教程中，我们将探讨在Kotlin中完成这项任务的几种方法。

## 2. 使用_for()_循环

使用传统的_for()_循环来找出列表中某个特定值出现的次数是一种直接的方法。我们遍历列表中的元素，并跟踪值在列表中的出现次数：

```kotlin
fun findRepeatedValuesUsingForLoop(value: Int, list: List````<Int>````): Int {
    var count = 0
    for (i in 0 until list.size - 1) {
        if (list[i] == value) {
            count++
        }
    }
    return count
}
```

我们的方法接受两个参数：我们要检查的值和值的列表。它返回该值在列表中出现的次数。

首先，我们用零初始化一个计数器。然后，我们遍历列表元素，并在每次出现该值时递增计数器。最后，我们返回其计数作为结果。

现在，让我们确保这个方法按预期运行：

```kotlin
@Test
fun `使用for循环在列表中查找重复元素`() {
    val list = listOf(1, 2, 3, 2, 4, 3, 5, 2, 6)

    assertEquals(3, findRepeatedValuesUsingForLoop(2, list))
    assertEquals(2, findRepeatedValuesUsingForLoop(3, list))
    assertEquals(1, findRepeatedValuesUsingForLoop(4, list))
    assertEquals(0, findRepeatedValuesUsingForLoop(9, list))
}
```

这个测试正确地找到了几个元素的出现次数，并且当元素不在列表中时也能正确识别。

## 3. 使用_count()_方法

另外，我们可以使用Kotlin中的_count()_方法来达到相同的结果。这个方法接受一个lambda函数作为参数，并返回列表中满足lambda表达式指定条件的元素数量：

```kotlin
@Test
fun `使用count方法在列表中查找重复元素`() {
    val list = listOf(1, 2, 3, 2, 4, 3, 5, 2, 6)

    assertEquals(3, list.count{it == 2})
    assertEquals(2, list.count{it == 3})
    assertEquals(1, list.count{it == 4})
    assertEquals(0, list.count{it == 9})
}
```

在每个断言中，我们首先调用列表上的_count()_方法。然后，我们传入一个lambda函数，检查每个元素是否等于我们正在寻找的值。结果，该方法返回列表中与谓词匹配的元素数量。

## 4. 使用_HashMap_

我们可以探索另一种可行的方法，涉及使用_HashMap_。更准确地说，我们将使用列表中的值作为键，出现次数作为值来构建_HashMap_：

```kotlin
fun findRepeatedValuesUsingHashMap(value: Int, list: List````<Int>````): Int {
    val map = HashMap``<Int, Int>``()
    for (element in list) {
        map[element] = map.getOrDefault(element, 0) + 1
    }
    return if(!list.contains(value)) 0 else map.getValue(value)
}
```

我们首先创建一个空的_HashMap_。然后，当我们遍历列表的元素时，我们更新映射中的计数。为了实现这一点，我们使用_getOrDefault(_)方法，它返回一个元素的当前计数，如果它不在映射中则返回零。

一旦我们将所有元素分组到频率映射中，我们就从映射中返回我们想要计数的值的出现次数。如果该值不存在，则返回零。

像往常一样，我们测试我们的方法的正确性：

```kotlin
@Test
fun `使用hashmap在列表中查找重复元素`() {
    val list = listOf(1, 2, 3, 2, 4, 3, 5, 2, 6)

    assertEquals(3, findRepeatedValuesUsingHashMap(2, list))
    assertEquals(2, findRepeatedValuesUsingHashMap(3, list))
    assertEquals(1, findRepeatedValuesUsingHashMap(4, list))
    assertEquals(0, findRepeatedValuesUsingHashMap(9, list))
}
```

## 5. 结论

在本文中，我们探讨了在列表中查找重复元素的几种方法。第一种方法更简单，因为它不需要内置方法或数据结构。然而，_HashMap_和_count()_方法分别利用了数据结构和内置方法。尽管如此，我们鼓励开发人员采用任何符合他们需求的方法。

正如往常一样，本文中使用的代码可在GitHub上找到。---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - List
  - Count Occurrences
head:
  - - meta
    - name: keywords
      content: Kotlin, List, Count Occurrences, Tutorial
------
# Kotlin中统计列表中值的出现次数

在Kotlin中，_List_是一个具有特定顺序的元素集合。有时，我们可能需要找出列表中某个特定元素出现的次数。这在识别重复项或统计特定列表元素的频率等情况下非常有用。

在本教程中，我们将探讨在Kotlin中完成这项任务的几种方法。

## 2. 使用_for()_循环

使用传统的_for()_循环来找出列表中某个特定值出现的次数是一种直接的方法。我们遍历列表中的元素，并跟踪值在列表中的出现次数：

```kotlin
fun findRepeatedValuesUsingForLoop(value: Int, list: List````<Int>````): Int {
    var count = 0
    for (i in 0 until list.size) {
        if (list[i] == value) {
            count++
        }
    }
    return count
}
```

我们的方法接受两个参数：我们要检查的值和值的列表。它返回该值在列表中出现的次数。

首先，我们用零初始化一个计数器。然后，我们遍历列表元素，并在每次出现该值时递增计数器。最后，我们返回其计数作为结果。

现在，让我们确保这个方法按预期运行：

```kotlin
@Test
fun `使用for循环在列表中查找重复元素`() {
    val list = listOf(1, 2, 3, 2, 4, 3, 5, 2, 6)

    assertEquals(3, findRepeatedValuesUsingForLoop(2, list))
    assertEquals(2, findRepeatedValuesUsingForLoop(3, list))
    assertEquals(1, findRepeatedValuesUsingForLoop(4, list))
    assertEquals(0, findRepeatedValuesUsingForLoop(9, list))
}
```

这个测试正确地找到了几个元素的出现次数，并且当元素不在列表中时也能正确识别

## 3. 使用_count()_方法

另外，我们可以使用Kotlin中的_count()_方法来达到相同的结果。这个方法接受一个lambda函数作为参数，并返回列表中满足lambda表达式指定条件的元素数量：

```kotlin
@Test
fun `使用count方法在列表中查找重复元素`() {
    val list = listOf(1, 2, 3, 2, 4, 3, 5, 2, 6)

    assertEquals(3, list.count { it == 2 })
    assertEquals(2, list.count { it == 3 })
    assertEquals(1, list.count { it == 4 })
    assertEquals(0, list.count { it == 9 })
}
```

在每个断言中，我们首先调用列表上的_count()_方法。然后，我们传入一个lambda函数，检查每个元素是否等于我们正在寻找的值。结果，该方法返回列表中与谓词匹配的元素数量。

## 4. 使用_HashMap_

我们可以探索另一种可行的方法，涉及使用_HashMap_。更准确地说，我们将使用列表中的值作为键，出现次数作为值来构建_HashMap_：

```kotlin
fun findRepeatedValuesUsingHashMap(value: Int, list: List````<Int>````): Int {
    val map = HashMap``<Int, Int>``()
    for (element in list) {
        map[element] = map.getOrDefault(element, 0) + 1
    }
    return if (!list.contains(value)) 0 else map[value]!!
}
```

我们首先创建一个空的_HashMap_。然后，当我们遍历列表的元素时，我们更新映射中的计数。为了实现这一点，我们使用_getOrDefault(_)方法，它返回一个元素的当前计数，如果它不在映射中则返回零。

一旦我们将所有元素分组到频率映射中，我们就从映射中返回我们想要计数的值的出现次数。如果该值不存在，我们返回零。

像往常一样，我们测试我们的方法的正确性：

```kotlin
@Test
fun `使用hashmap在列表中查找重复元素`() {
    val list = listOf(1, 2, 3, 2, 4, 3, 5, 2, 6)

    assertEquals(3, findRepeatedValuesUsingHashMap(2, list))
    assertEquals(2, findRepeatedValuesUsingHashMap(3, list))
    assertEquals(1, findRepeatedValuesUsingHashMap(4, list))
    assertEquals(0, findRepeatedValuesUsingHashMap(9, list))
}
```

## 5. 结论

在本文中，我们探讨了在列表中查找重复元素的几种方法。第一种方法更简单，因为它不需要内置方法或数据结构。然而，_HashMap_和_count()_方法分别利用了数据结构和内置方法。尽管如此，我们鼓励开发人员采用任何符合他们需求的方法。

正如往常一样，本文中使用的代码可在GitHub上找到。

OK