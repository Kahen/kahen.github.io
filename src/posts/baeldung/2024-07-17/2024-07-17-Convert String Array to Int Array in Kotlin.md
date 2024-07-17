---
date: 2022-11-01
category:
  - Kotlin
tag:
  - String Array
  - Int Array
head:
  - - meta
    - name: keywords
      content: Kotlin, String Array, Int Array, Conversion
------
# Kotlin中将字符串数组转换为整数数组 | Baeldung关于Kotlin的文章

## 1. 概述

在Kotlin中，我们可能会遇到需要将字符串数组转换为整数数组的各种场景。在本文中，我们将探讨这个问题的不同解决方法。此外，我们还将展示在转换过程中如何处理可能出现的异常。

## 2. 使用 _toInt()_ 函数

在最简单的情况下，**直接的方法是遍历每个字符串数组元素并使用 _toInt()_ 函数**。它将每个元素转换为一个 _Int_ 实例。让我们看一个例子：

```kotlin
@Test
fun `when using toInt then it converts array`() {
    val stringArray = arrayOf("1", "2", "3", "4", "5")
    val intArray = stringArray.map { it.toInt() }.toIntArray()
    assertThat(intArray.all { it is Int }).isTrue()
    assertThat(intArray).isEqualTo(arrayOf(1, 2, 3, 4, 5))
}
```

在这个例子中，_map_ 函数将 _stringArray_ 的每个元素转换为 _Int_。之后，我们使用 _toIntArray()_ 函数将结果列表转换为数组。

## 3. 处理可能的数字格式异常

虽然上述方法简洁，但它不处理由于字符串数组中无效格式而导致的转换失败的情况。让我们通过一个例子来演示：

```kotlin
@Test
fun `when using toInt then exception is thrown`() {
    val stringArray = arrayOf("1", "2", "3", "four", "5")
    assertThrows`<NumberFormatException>` { stringArray.map { it.toInt() }}
}
```

值 “four” 无法转换为 _Int_ 并抛出 _NumberFormatException_。为了解决这个问题，我们将实现一种更安全的错误处理方法：

```kotlin
@Test
fun `when using toInt then exception is handled`() {
    val stringArray = arrayOf("1", "2", "3", "four", "5")
    val intList = mutableListOf`<Int>`()
    for (element in stringArray) {
        try {
            val intValue = element.toInt()
            intList.add(intValue)
        } catch (e: NumberFormatException) {
            // 处理提供值不是数字的情况
        }
    }
    val intArray = intList.toIntArray()
    assertThat(intArray).isEqualTo(arrayOf(1, 2, 3, 5))
}
```

在这个例子中，_try-catch_ 块处理在转换过程中可能发生的 _NumberFormatException_。此外，这允许我们识别和处理无法转换为整数的元素。

## 4. 利用 _toIntOrNull_() 函数

最后，Kotlin提供了 _toIntOrNull()_ 函数。**这是将字符串数组转换为整数数组的最方便的方法**。**它处理可能的异常并返回 _Null_ 而不是抛出异常**。让我们看看它在实际中的应用：

```kotlin
@Test
fun `when using toIntOrNull then it converts array`() {
    val stringArray = arrayOf("1", "2", "3", "four", "5")
    val intArray = stringArray.mapNotNull { it.toIntOrNull() }.toIntArray()
    assertThat(intArray.all { it is Int }).isTrue()
    assertThat(intArray).isEqualTo(arrayOf(1, 2, 3, 5))
}
```

在这里，函数 _toIntOrNull()_ 将每个元素转换为 _Int_。此外，如果转换失败，它返回 _Null_。之后，我们使用 _mapNotNull()_ 方法过滤出无法成功转换的元素。多亏了这个方法，我们只得到整数。此外，我们可以使用 _toIntArray()_ 方法将其转换为 _Int_ 数组。

## 5. 结论

在本文中，我们展示了如何在Kotlin中将字符串数组转换为整数数组。此外，我们展示了如何处理潜在的异常。虽然 _toInt()_ 函数提供了一个简洁的解决方案，处理异常或使用 _toIntOrNull()_ 确保了更稳健的转换过程。

如常，示例的源代码可在GitHub上获取。