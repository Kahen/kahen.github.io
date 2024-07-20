---
date: 2022-11-01
category:
  - Kotlin
  - 编程
tag:
  - 字符串排序
  - Kotlin
head:
  - - meta
    - name: keywords
      content: Kotlin, 字符串排序, 编程
---
# Kotlin中按字母顺序对字符串排序 | Baeldung关于Kotlin的教程

## 1. 概述

在软件开发中，按字母顺序对字符串进行排序通常非常重要，尤其是在搜索和展示数据时。

在本教程中，我们将讨论在Kotlin中按不同场景和复杂度对字符串进行字母排序的一些方法。

## 2. 使用toCharArray()和sorted()

第一种排序字符串的方法是最简单的，因为我们将使用Kotlin内置的函数。我们将把字符串转换为字符数组进行排序，然后再将结果转换回字符串：

```
private fun sortStringWithCharArrayAndSorted(input: String): String {
    return input.toCharArray().sorted().joinToString("")
}
```

首先，我们使用toCharArray()将字符串分解为字符数组。然后，我们使用sorted()对这个数组进行排序。让我们看看结果：

```
[a, b, c, d, e, f, g, h, i, j, k, l]
```

接下来，我们使用joinToString()将数组转换为字符串。

现在，让我们测试这个函数是否正确地按字母顺序对我们的字符串进行了排序：

```
@Test
fun `using toCharArray and then sorted`() {
    val inputString = "laibkcedfgjh"
    assertEquals("abcdefghijkl", sortStringWithCharArrayAndSorted(inputString))
}
```

## 3. 使用toCharArray()，sorted()和distinct()

有时，我们可能希望在对字符串进行字母排序的同时，还去除重复的字母。我们将使用distinct()，这是Kotlin内置的从集合中移除重复元素的函数。如果字符串包含一些重复的字符，并且我们想要移除它们，**这种方法很有用**：

```
private fun sortStringWithCharArrayAnddistinct(input: String): String {
    return input.toCharArray().sorted().distinct().joinToString("")
}
```

如果不使用distinct()，输出将是：

```
abcdefgghhhijkkkl
```

因此，在调用toCharArray()和sorted()之后，我们需要调用distinct()来移除多余的重复字符。

我们也来测试这个函数，以验证它是否按预期工作：

```
@Test
fun `using sorted and distinct`() {
    val inputString = "lakibkcekdghfgjhh"
    assertEquals("abcdefghijkl", sortStringWithCharArrayAnddistinct(inputString))
}
```

## 4. 使用toCharArray()，sortedWith()和compareBy()

我们可能需要分别对字符串中的元音字母和辅音字母进行字母排序。因为这是一种独特的排序方式，我们需要使用sortedWith()来提供特殊的比较器。然后，我们将使用compareBy()来创建具有我们排序标准的比较器。这是一种**用于按更复杂标准对字符串进行排序的有用方法**。

例如，我们将首先对辅音字母进行排序，然后是元音字母：

```
private fun sortStringWithtoCharArrayAndCompareBy(input: String): String {
    val vowels = setOf('a', 'e', 'i', 'o', 'u')
    return input.toCharArray().sortedWith(compareBy`<Char>` { it in vowels }
            .thenBy { it }
        ).joinToString("")
}
```

我们也将测试我们的自定义排序，以确保辅音字母在前，元音字母在后，同时在这些分组之间仍然保持字母顺序：

```
@Test
fun `using compareBy`() {
    val inputString = "laibkcedfgjh"
    assertEquals("bcdfghjklaei", sortStringWithtoCharArrayAndCompareBy(inputString))
}
```

## 5. 使用扩展函数

我们可以将我们在前一节中讨论的任何方法转化为扩展函数。这允许我们向类或数据类型添加新函数，而不需要修改该类的原始源代码。

例如，我们可以采用第一种解决方案，并为String类定义一个名为sortAsc()的扩展函数：

```
private fun String.sortAsc() = toCharArray().sorted().joinToString("")
```

这是Kotlin的一个有趣之处。**现在我们已经为String定义了一个新的扩展函数，我们可以直接从字符串字面量调用它**：

```
"cdbae".sortAsc()
```

最后，我们将测试我们的扩展函数是否按我们期望的方式对字符串进行了排序：

```
@Test
fun `simplify toCharArray and sorted with extension`() {
    assertEquals("abcde", "cdbae".sortAsc())
}
```

## 6. 结论

在本文中，我们讨论了使用sorted()和sortedWith()的不同变体来按字母顺序对字符串进行排序的几种方法。当然，根据我们项目的需求，可以使用这些方法中的任何一种。此外，我们还探索了使用扩展函数——Kotlin的强大且富有表现力的特性——来为我们的解决方案。

一如既往，本文的代码可以在GitHub上找到。