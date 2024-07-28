---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Kotlin
  - Programming
head:
  - - meta
    - name: keywords
      content: Kotlin, Integer List, IntArray, Convert
---

# 如何在 Kotlin 中将整数表转换为 IntArray

如果你有几年 Kotlin 语言和服务器端开发的经验，并且有兴趣与社区分享这些经验，请查看我们的**贡献指南**。

## 1. 引言

有时需要将整数列表转换为整数数组以进行进一步处理。幸运的是，Kotlin 中有几种方法可以实现这一点。

在本教程中，我们将讨论将整数列表转换为整数数组的三种不同方法，以及相应的 Kotlin 代码。

## 2. 使用 for 循环

第一种方法是程序化方法，我们**使用简单的 for 循环遍历列表中的条目，并将每个条目添加到数组中**：

```kotlin
@Test
fun `使用 for 循环将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = IntArray(list.size)
    for (i in list.indices) {
        result[i] = list[i]
    }

    assertArrayEquals(expected, result)
}
```

## 3. 使用 IntArray 构造函数

或者，我们可以使用接受两个参数的 _IntArray_ 构造函数从整数列表中获取整数数组——数组大小和一个 lambda 表达式，该表达式返回数组中每个索引的值：

```kotlin
@Test
fun `使用 intArray 构造函数将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = IntArray(list.size) { i -> list[i] }

    assertArrayEquals(expected, result)
}
```

基本上，我们创建了一个与列表大小相同的数组。此外，lambda 表达式将列表中的每个元素复制到 result 数组中。它通过将列表中索引为 i 的元素分配给 result 数组的第 i 索引来实现这一点。

## 4. 使用 toIntArray() 方法

toIntArray() 方法是 Kotlin 中的一个内置函数，我们可以使用它将整数列表转换为整数数组。结果是包含与原始列表相同元素的整数数组：

```kotlin
@Test
fun `使用 toIntArray() 方法将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = list.toIntArray()

    assertArrayEquals(expected, result)
}
```

另外，我们可以使用 map() 方法将整数列表转换为整数数组。**map() 方法帮助我们迭代列表并创建一个与原始列表具有相同条目的新列表**。最后，我们使用 toIntArray() 方法将这个新列表转换为整数数组：

```kotlin
@Test
fun `使用 map() 方法将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = list.map { it }.toIntArray()

    assertArrayEquals(expected, result)
}
```

## 5. 使用 toTypedArray() 方法

有趣的是，我们还有 toTypedArray() 方法。**基本上，我们使用这个方法将列表转换为由编译器推断类型的数组**：

```kotlin
@Test
fun `使用 toTypedArray() 方法将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = list.toTypedArray().toIntArray()

    assertArrayEquals(expected, result)
}
```

在这个例子中，我们使用 toTypedArray() 方法将整数列表转换为数组。然后最后我们调用 toIntArray() 方法将得到的 Integer 对象数组转换为原始整数数组。

## 6. 使用 stream() 方法

stream() 方法允许我们将列表转换为整数的流：

```kotlin
@Test
fun `使用 stream() 方法将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = list.stream().mapToInt { it }.toArray()

    assertArrayEquals(expected, result)
}
```

基本上，我们在流上调用 mapToInt() 方法将每个整数映射到其相应的值。最后，我们使用 toArray() 方法获得整数数组。

## 7. 结论

在本文中，我们探讨了在 Kotlin 中将整数列表转换为整数数组的各种方法。toIntArray() 方法是实现此目的的最简单和最简洁的方式，而 copyOf()、stream()、带有索引运算符的 for 循环和提供是替代选项。此外，我们为每种方法编写了单元测试以确保正确性。

如往常一样，示例的源代码可在 GitHub 上找到。好的，翻译已经完成。以下是翻译的完整内容：

---
date: 2022-11-01
category:
  - Kotlin
tag:
  - Kotlin
  - Programming
head:
  - - meta
    - name: keywords
      content: Kotlin, Integer List, IntArray, Convert
---

# 如何在 Kotlin 中将整数列表转换为 IntArray

如果你有几年 Kotlin 语言和服务器端开发的经验，并且有兴趣与社区分享这些经验，请查看我们的**贡献指南**。

## 1. 引言

有时需要将整数列表转换为整数数组以进行进一步处理。幸运的是，Kotlin 中有几种方法可以实现这一点。

在本教程中，我们将讨论将整数列表转换为整数数组的三种不同方法，以及相应的 Kotlin 代码。

## 2. 使用 for 循环

第一种方法是程序化方法，我们**使用简单的 for 循环遍历列表中的条目，并将每个条目添加到数组中**：

```kotlin
@Test
fun `使用 for 循环将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = IntArray(list.size)
    for (i in list.indices) {
        result[i] = list[i]
    }

    assertArrayEquals(expected, result)
}
```

## 3. 使用 IntArray 构造函数

或者，我们可以使用接受两个参数的 _IntArray_ 构造函数从整数列表中获取整数数组——数组大小和一个 lambda 表达式，该表达式返回数组中每个索引的值：

```kotlin
@Test
fun `使用 intArray 构造函数将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = IntArray(list.size) { i -> list[i] }

    assertArrayEquals(expected, result)
}
```

基本上，我们创建了一个与列表大小相同的数组。此外，lambda 表达式将列表中的每个元素复制到 result 数组中。它通过将列表中索引为 i 的元素分配给 result 数组的第 i 索引来实现这一点。

## 4. 使用 toIntArray() 方法

toIntArray() 方法是 Kotlin 中的一个内置函数，我们可以使用它将整数列表转换为整数数组。结果是包含与原始列表相同元素的整数数组：

```kotlin
@Test
fun `使用 toIntArray() 方法将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = list.toIntArray()

    assertArrayEquals(expected, result)
}
```

另外，我们可以使用 map() 方法将整数列表转换为整数数组。**map() 方法帮助我们迭代列表并创建一个与原始列表具有相同条目的新列表**。最后，我们使用 toIntArray() 方法将这个新列表转换为整数数组：

```kotlin
@Test
fun `使用 map() 方法将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = list.map { it }.toIntArray()

    assertArrayEquals(expected, result)
}
```

## 5. 使用 toTypedArray() 方法

有趣的是，我们还有 toTypedArray() 方法。**基本上，我们使用这个方法将列表转换为由编译器推断类型的数组**：

```kotlin
@Test
fun `使用 toTypedArray() 方法将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = list.toTypedArray().toIntArray()

    assertArrayEquals(expected, result)
}
```

在这个例子中，我们使用 toTypedArray() 方法将整数列表转换为数组。然后最后我们调用 toIntArray() 方法将得到的 Integer 对象数组转换为原始整数数组。

## 6. 使用 stream() 方法

stream() 方法允许我们将列表转换为整数的流：

```kotlin
@Test
fun `使用 stream() 方法将整数列表转换为整数数组`() {
    val list = listOf(1, 2, 3, 4, 5)
    val expected = intArrayOf(1, 2, 3, 4, 5)
    val result = list.stream().mapToInt { it }.toArray()

    assertArrayEquals(expected, result)
}
```

基本上，我们在流上调用 mapToInt() 方法将每个整数映射到其相应的值。最后，我们使用 toArray() 方法获得整数数组。

## 7. 结论

在本文中，我们探讨了在 Kotlin 中将整数列表转换为整数数组的各种方法。toIntArray() 方法是实现此目的的最简单和最简洁的方式，而 copyOf()、stream()、带有索引运算符的 for 循环和提供是替代选项。此外，我们为每种方法编写了单元测试以确保正确性。

如往常一样，示例的源代码可在 GitHub 上找到。

OK