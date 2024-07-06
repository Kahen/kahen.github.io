---
date: 2024-07-06
category:
  - Java
  - 编程
tag:
  - 数组
  - 索引
  - Java 8
head:
  - - meta
    - name: keywords
      content: Java 数组, 索引查找, 性能比较
---

# 在Java数组中查找元素的索引

## 1. 概述

在本教程中，我们将讨论使用Java内置API和第三方库，通过代码示例查找数组元素索引的多种方法。这对于搜索、排序和修改数组等许多任务都非常有用。

## 2. 使用_for_循环

我们的第一个方法是使用_for_循环来查找数组中元素的索引，这是最简单的方法之一。

**基本思想是遍历输入数组并在每次迭代中检查元素。** **如果找到了元素，我们就返回当前索引。**

否则，如果我们在数组的末尾找不到元素，我们返回一个固定的常量值。这个固定值可以是任何我们事先知道的东西。我们使用它来表示元素在数组中未找到。

这些固定常量值的示例包括_-1_、_Integer.MAX_VALUE_、_Integer.MIN_VALUE_等。

首先，让我们使用这种方法创建一个简单的方法：

```
int forLoop(int[] numbers, int target) {
    for (int index = 0; index `< numbers.length; index++) {
        if (numbers[index] == target) {
            return index;
        }
    }
    return -1;
}
```

我们遍历输入的_numbers_数组，然后检查每个元素。如果我们找到匹配项，我们返回当前的_index_值。否则，我们返回_-1_，表示我们找不到_target_。

现在让我们用一些示例输入数据测试我们的_forLoop()_方法：

```
@Test
void givenIntegerArray_whenUseForLoop_thenWillGetElementIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(2, forLoop(numbers, 30));
}
```

在这里，我们正在寻找值_30_。_forLoop()_方法返回_2_，这是输入数组中的位置。我们必须记住Java中数组的起始索引是零。

接下来，让我们寻找一个不在输入数组中的元素：

```
@Test
void givenIntegerArray_whenUseForLoop_thenWillGetElementMinusOneIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(-1, forLoop(numbers, 100));
}
```

在这种情况下，我们尝试搜索数字_100_。然而，它不在我们的数组中。这就是为什么我们的方法返回_-1_，表示元素未找到。

## 3. 使用_List_indexOf()

我们将使用_List_类的_indexOf()_方法作为下一个方法：

```
static int listIndexOf(Integer[] numbers, int target) {
    List<Integer>` list = Arrays.asList(numbers);
    return list.indexOf(target);
}
```

在我们的_listIndexOf()_方法中，我们传递一个_Integer_数组和一个目标值作为参数。在内部，我们使用_Arrays_工具类的_asList()_方法。这个方法将对象数组转换为相同对象类型的_List_。值得注意的是，_asList()_方法没有为原始类型实现。

将输入数组转换为列表后，我们使用_indexOf()_方法找到我们目标元素的索引。如果目标元素不在列表中，那么_indexOf()_方法返回_-1_。

现在，让我们实现几个测试用例。在第一个测试用例中，目标将在输入数组中：

```
@Test
void givenIntegerArray_whenUseIndexOf_thenWillGetElementIndex() {
    Integer[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(2, listIndexOf(numbers, 30));
}
```

当我们调用我们的_listIndexOf()_方法时，我们得到索引_2_，这是输入数组中目标数字_30_的位置。

在第二个测试用例中，目标元素不在输入数组中：

```
@Test
void givenIntegerArray_whenUseIndexOf_thenWillGetElementMinusOneIndex() {
    Integer[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(-1, listIndexOf(numbers, 100));
}
```

在这种情况下，我们得到了预期的结果，_-1_。

## 4. 使用_Arrays_ binarySearch()

_Arrays_工具类的另一个有用方法是_binarySearch()_方法。**这个方法执行二分搜索算法。** **在使用这个方法之前，输入数组必须先排序。** 我们可以使用_binarySearch()_方法在排序数组中查找元素的索引。

让我们使用_binarySearch()_方法实现一些测试：

```
@Test
void givenIntegerArray_whenUseBinarySearch_thenWillGetElementIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(2, Arrays.binarySearch(numbers, 30));
}
```

在上述代码中，使用_binarySearch()_方法，如果找到了目标元素，方法将返回其索引号。在这种情况下，我们得到了索引_2_。

然而，如果目标没有找到，方法将返回一个负值。根据Java中_binarySearch()_方法的官方文档，这个负值是通过一个插入点来计算的。插入点是键应该在数组中的位置。它的值是数组中第一个大于键的元素的索引，或者是如果数组中的所有元素都小于键，则为_arr.length_。元素不在数组中的索引等于_(-(插入点)-1)_。

让我们实现一些关于这个负值的测试：

```
@Test
void givenIntegerArray_whenUseBinarySearch_thenWillGetUpperBoundMinusIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(-6, Arrays.binarySearch(numbers, 100));
}
```

由于_100_不在数组中，方法返回了一个负值。在这种情况下，返回的值是_-6_。这是因为数组中的所有元素都小于我们的_target_值。然后，插入点是_5_（数组长度），得到的索引是_(-5-1)_，即_-6_。

另一个案例是当目标元素值在数组的上下界值之间时：

```
@Test
void givenIntegerArray_whenUseBinarySearch_thenWillGetInArrayMinusIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(-2, Arrays.binarySearch(numbers, 15));
}
```

在上面的测试用例中，由于15是在10和50之间的值，这个数组的边界值，我们得到了索引值_-2_。我们得到这个值是因为插入点是_1_。因此，得到的索引是_(-1-1)_或_-2_。

这个方法的最后一个案例是当目标值不存在并且小于数组中的最小值时：

```
@Test
void givenIntegerArray_whenUseBinarySearch_thenWillGetLowerBoundMinusIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(-1, Arrays.binarySearch(numbers, -15));
}
```

在这种情况下，我们得到了_-1_，因为我们的目标值小于数组中的最小值。

## 5. 使用_IntStream_

在接下来的测试代码中，我们将使用_IntStream_接口。这个接口是在Java 8中引入的。从_IntStream_接口，我们将使用_range()_方法。_range()_方法产生一个从0（包括）到_arr.length_（不包括）的有序整数流。

首先，我们将使用_IntStream.range()_实现一个方法来遍历输入数组：

```
static int intStream(int[] numbers, int target) {
    return IntStream.range(0, numbers.length)
      .filter(i -> numbers[i] == target)
      .findFirst()
      .orElse(-1);
}
```

由_range()_方法产生的整数代表_numbers_数组的索引。然后_filter()_方法检查索引_i_处的元素是否等于目标值。如果目标元素不在数组中，那么_orElse()_返回_-1_。最后，使用_findFirst(_)，我们得到第一个等于目标值的元素。

使用我们的_intStream()_方法，我们可以实施下一个测试用例：

```
@Test
void givenIntegerArray_whenUseIntStream_thenWillGetElementIndex() {
    int[] numbers = { 10, 20, 30, 40, 50 };
    assertEquals(2, intStream(numbers, 30));
}
```

在我们的测试代码中，我们调用我们实现的_intStream()_方法，我们得到了目标元素放置的索引。如果目标元素不在数组中，那么我们将得到_-1_。

## 6. Apache Commons库

到目前为止，我们已经查看了我们可以用来在数组中查找元素索引的大多数内置Java API。然而，还有一些第三方库我们可以使用。一个有用的第三方库是Apache Commons Lang 3。在我们实现测试用例之前，我们需要将Apache Commons Lang依赖项添加到我们的_pom.xml_文件中：

```
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.12.0`</version>`
`</dependency>`
```

在我们的测试用例中，我们使用_ArrayUtils_类的_indexOf()_方法。这个方法接收一个