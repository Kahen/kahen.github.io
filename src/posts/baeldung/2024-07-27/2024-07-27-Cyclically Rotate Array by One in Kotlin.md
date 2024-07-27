---
date: 2022-11-01
category:
  - Kotlin
  - Programming
tag:
  - Array
  - Rotation
  - Kotlin
head:
  - - meta
    - name: keywords
      content: Kotlin, Array, Rotation, Programming
---
# Kotlin中循环旋转数组的一种方法 | Baeldung关于Kotlin

## 1. 引言

在编程中，旋转数组经常在完成某些任务时非常有用。旋转数组意味着将数组的元素向前或向后移动一定数量的位置。

在本教程中，我们将讨论在Kotlin中循环旋转数组的一种方法。这简单地意味着将元素向右移动一个位置。

## 2. 编程方法

循环旋转数组的一种直接方法是使用一个临时变量和一个经典的_for()_循环。基本上，我们将数组的最后一个元素存储在一个临时变量中，并将数组的所有其他元素向右移动一个位置。最后，我们将临时变量放在数组的开头：

```
fun rotateArrayByOneProgramaticApproach(arr: IntArray) {
    val temp = arr.last()
    for (i in arr.size - 1 downTo 1) {
        arr[i] = arr[i - 1]
    }
    arr[0] = temp
}
```

现在，让我们测试我们的方法以确保它按预期工作：

```
@Test
fun `使用编程方法循环旋转数组一个位置`() {
    val arr = intArrayOf(1, 2, 3, 4, 5)
    rotateArrayByOneProgramaticApproach(arr)
    assertArrayEquals(intArrayOf(5, 1, 2, 3, 4), arr)
}
```

## 3. 使用_copyInto()_方法

我们同样可以使用Kotlin内置的_copyInto()_方法来循环旋转数组。这个方法将数组的元素复制到一个新数组中。

这个方法接受以下顺序的四个参数：

- 要将元素复制到的数组
- 开始复制元素的偏移索引位置
- 从原始数组中开始选择元素的起始索引
- 从原始数组中停止选择元素的结束索引（不包含）

```
fun rotateArrayByOneUsingCopyIntoMethod(arr: IntArray) {
    val newArr = IntArray(arr.size)
    arr.copyInto(newArr, 1, 0, arr.size - 1)
    newArr.set(0, arr[arr.size - 1])
    newArr.copyInto(arr)
}
```

在这段代码中，我们使用_copyInto()_方法将原始数组中除最后一个元素之外的所有元素移动到一个新数组中。注意，我们最初在复制元素时跳过了新数组的第一个位置。

最后，我们使用_set()_方法将原始数组的最后一个元素放在新数组的第一个位置。

让我们也测试这个方法：

```
@Test
fun `使用copyInto方法循环旋转数组一个位置`() {
    val arr = intArrayOf(1, 2, 3, 4, 5)
    rotateArrayByOneUsingCopyIntoMethod(arr)
    assertArrayEquals(intArrayOf(5, 1, 2, 3, 4), arr)
}
```

## 4. 使用_takeLast()_和_dropLast()_方法

另外，我们可以通过使用_takeLast()_和_dropLast()_方法来实现我们的目标。然而，这些方法返回_List_对象：

```
fun rotateArrayByOneUsingDropLastAndTakeLastMethods(arr: IntArray): Array`<Int>` {
    val newArray = (arr.takeLast(1) + arr.dropLast(1)).toIntArray()
    newArray.copyInto(arr)
}
```

在这段代码中，我们调用_takeLast()_方法并传入一个参数，这允许我们获得一个包含数组最后一个元素的列表。接下来，我们调用_dropLast()_方法，也传入一个参数，以获得一个包含除最后一个元素之外的所有数组元素的列表。

然后我们使用加号运算符连接两个方法的结果，将组合后的列表转换回数组，最后，返回这个移动后的数组。

让我们也验证这个方法的正确性：

```
 @Test
fun `使用dropLast和takeLast方法循环旋转数组一个位置`() {
    val arr = intArrayOf(1, 2, 3, 4, 5)
    rotateArrayByOneUsingDropLastAndTakeLastMethods(arr)
    assertArrayEquals(intArrayOf(5, 1, 2, 3, 4), arr)
}
```

## 5. 使用_Collections.rotate()_方法

我们还可以使用_Collections.rotate()_方法来循环旋转数组。然而，这个方法要求我们首先将数组转换为列表，执行旋转，然后将列表转换回数组：

```
fun rotateArrayByOneUsingCollectionsRotateMethod(arr: IntArray) {
    val list = arr.toList().toMutableList()
    Collections.rotate(list, 1)
    list.toIntArray().copyInto(arr)
}
```

上述代码涉及将我们想要旋转的列表和我们想要旋转的距离传递给_Collections.rotate()_方法。最后，我们将旋转后的列表转换为数组，并使用_copyInto()_方法将数组元素复制到原始数组中。

我们也应该测试这个方法：

```
@Test
fun `使用Collections rotate方法循环旋转数组一个位置`() {
    val arr = intArrayOf(1, 2, 3, 4, 5)
    rotateArrayByOneUsingCollectionsRotateMethod(arr)
    assertArrayEquals(intArrayOf(5, 1, 2, 3, 4), arr)
}
```

## 6. 使用递归

最后，我们可以使用递归来循环旋转数组：

```
fun rotateArrayByOneUsingRecursion(arr: IntArray, position: Int = 0) {
    if (position == arr.size - 1) return
    val temp = arr[position]
    arr[position] = arr[arr.size - 1]
    arr[arr.size - 1] = temp
    rotateArrayByOneUsingRecursion(arr, position + 1)
}
```

在这种方法中，我们传入原始数组和一个索引位置。_position_有一个默认值零，从数组的开头开始。接下来，**我们递归地交换给定索引位置和数组最后一个索引位置的数组元素**，并在每一步中递增给定的索引位置，直到我们到达数组的末尾。

现在，让我们测试这种方法以确保它按预期工作：

```
@Test
fun `使用递归循环旋转数组一个位置`() {
    val arr = intArrayOf(1, 2, 3, 4, 5)
    rotateArrayByOneUsingRecursion(arr)
    assertArrayEquals(intArrayOf(5, 1, 2, 3, 4), arr)
}
```

## 7. 结论

在本文中，我们探讨了如何在Kotlin中使用不同的方法循环旋转数组。我们讨论的一些方法仅使用Kotlin数组，例如编程和递归方法，而其他方法则利用Kotlin内置的方法，如_copyInto()_、_takeLast()_、_dropLast()_和_Collections.rotate()_方法。然而，除了_copyInto()_之外，所有这些方法最终都会得到一个列表，这意味着我们必须将列表转换回数组。

我们选择采用哪种方法应该取决于我们的项目需求。

如常，本文中使用的所有代码都可以在GitHub上找到。