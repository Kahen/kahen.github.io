---
date: 2024-06-17
category:
  - Java
  - 编程
tag:
  - 数组
  - 2D数组
  - 1D数组
---
# Java中将二维数组转换为一维数组

数组是任何语言中最基本的数据结构。**尽管我们大多数情况下不直接操作它们，但知道如何有效操作它们可以显著提高我们的代码效率。**

在本教程中，我们将学习如何将二维数组转换为一维数组，通常被称为扁平化。例如，我们将转换 { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} } 为 {1, 2, 3, 4, 5, 6, 7, 8, 9}。

尽管我们将使用二维数组进行操作，但本教程中概述的思想可以应用于任何维度的数组。在本文中，我们将使用原始整数数组作为示例，但这些思想可以应用于任何数组。

## 2. 循环和原始数组

解决这个问题的最简单方法是使用_for_循环，我们可以使用它将一个数组中的元素转移到另一个数组。然而，为了提高性能，我们必须确定元素的总数以创建目标数组。

如果所有数组具有相同数量的元素，这是一个微不足道的任务。在这种情况下，我们可以使用简单的数学来进行计算。**然而，如果我们处理的是锯齿形数组，我们需要逐个遍历这些数组：**

```java
@ParameterizedTest
@MethodSource("arrayProvider")
void giveTwoDimensionalArray_whenFlatWithForLoopAndTotalNumberOfElements_thenGetCorrectResult(
  int [][] initialArray, int[] expected) {
    int totalNumberOfElements = 0;
    for (int[] numbers : initialArray) {
        totalNumberOfElements += numbers.length;
    }
    int[] actual = new int[totalNumberOfElements];
    int position = 0;
    for (int[] numbers : initialArray) {
        for (int number : numbers) {
            actual[position] = number;
            ++position;
        }
    }
    assertThat(actual).isEqualTo(expected);
}
```

我们也可以进行一些改进，并在第二个_for_循环中使用_System.arrayCopy()_：

```java
@ParameterizedTest
@MethodSource("arrayProvider")
void giveTwoDimensionalArray_whenFlatWithArrayCopyAndTotalNumberOfElements_thenGetCorrectResult(
  int [][] initialArray, int[] expected) {
    int totalNumberOfElements = 0;
    for (int[] numbers : initialArray) {
        totalNumberOfElements += numbers.length;
    }
    int[] actual = new int[totalNumberOfElements];
    int position = 0;
    for (int[] numbers : initialArray) {
        System.arraycopy(numbers, 0, actual,  position, numbers.length);
        position += numbers.length;
    }
    assertThat(actual).isEqualTo(expected);
}
```

**_System.arrayCopy()_相对较快，并且是推荐的方式来复制数组，以及_clone()_方法。** 然而，我们需要谨慎使用这些方法在引用类型的数组上，因为它们执行的是浅拷贝。

从技术上讲，我们可以避免在第一个循环中计算元素数量，并在必要时扩展数组：

```java
@ParameterizedTest
@MethodSource("arrayProvider")
void giveTwoDimensionalArray_whenFlatWithArrayCopy_thenGetCorrectResult(
  int [][] initialArray, int[] expected) {
    int[] actual = new int[]{};
    int position = 0;
    for (int[] numbers : initialArray) {
        if (actual.length `< position + numbers.length) {
            int[] newArray = new int[actual.length + numbers.length];
            System.arraycopy(actual, 0, newArray, 0, actual.length );
            actual = newArray;
        }
        System.arraycopy(numbers, 0, actual,  position, numbers.length);
        position += numbers.length;
    }
    assertThat(actual).isEqualTo(expected);
}
```

**然而，这种方法会降低我们的性能，并将初始的时间复杂度从_O(n)_变为_O(n^2)_。** 因此，应该避免使用，或者我们需要使用更优化的算法来增加数组大小，类似于List的实现。

## 3. _Lists_

关于列表，Java Collection API提供了一种更方便的方式来管理元素集合。因此，如果我们使用_List_作为我们扁平化逻辑的返回类型，或者至少作为一个中间值持有者，我们可以简化代码：

```java
@ParameterizedTest
@MethodSource("arrayProvider")
void giveTwoDimensionalArray_whenFlatWithForLoopAndAdditionalList_thenGetCorrectResult(
  int [][] initialArray, int[] intArray) {
    List````<Integer>````` expected = Arrays.stream(intArray).boxed().collect(Collectors.toList());
    List````<Integer>```` actual = new ArrayList<>();
    for (int[] numbers : initialArray) {
        for (int number : numbers) {
            actual.add(number);
        }
    }
    assertThat(actual).isEqualTo(expected);
}
```

在这种情况下，我们不需要处理目标数组的扩展，_List_会透明地处理它。我们还可以使用_addAll()_方法将第二维数组转换为_Lists_：

```java
@ParameterizedTest
@MethodSource("arrayProvider")
void giveTwoDimensionalArray_whenFlatWithForLoopAndLists_thenGetCorrectResult(
  int [][] initialArray, int[] intArray) {
    List````<Integer>```` expected = Arrays.stream(intArray).boxed().collect(Collectors.toList());
    List````<Integer>```` actual = new ArrayList<>();
    for (int[] numbers : initialArray) {
        List````<Integer>```` listOfNumbers = Arrays.stream(numbers).boxed().collect(Collectors.toList());
        actual.addAll(listOfNumbers);
    }
    assertThat(actual).isEqualTo(expected);
}
```

**由于我们不能在_Collections_中使用原始类型，装箱创建了显著的开销，我们应该谨慎使用它。** 当数组中的元素数量很大或性能关键时，最好避免使用包装类。

## 4. Stream API

因为这类问题相当常见，Stream API提供了一种更方便的方法来进行扁平化：

```java
@ParameterizedTest
@MethodSource("arrayProvider")
void giveTwoDimensionalArray_whenFlatWithStream_thenGetCorrectResult(
  int [][] initialArray, int[] expected) {
    int[] actual = Arrays.stream(initialArray).flatMapToInt(Arrays::stream).toArray();
    assertThat(actual).containsExactly(expected);
}
```

我们之所以只使用_flatMapToInt()_方法，是因为我们正在处理原始数组。**对于引用类型，解决方案将是类似的，但我们应该使用_flatMap()_方法。** 这是最直接和最易读的选项。然而，需要对Stream API有一定的理解。

## 5. 结论

我们通常不直接操作数组。然而，它们是最基础的数据结构，知道如何操作它们是必不可少的。

_System_类、Collection和Stream API提供了许多方便的方法与数组交互。**然而，我们应该始终考虑这些方法的缺点，并为我们的特定情况选择最合适的方法。**

像往常一样，代码可以在GitHub上找到。

文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。翻译已经完成。

OK