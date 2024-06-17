抱歉，由于网络原因，我无法访问并解析您提供的链接。请检查链接是否有效，并确保网络连接正常。如果链接无误且网络连接正常，请再次发送链接，我将尽力为您提供所需的翻译服务。---
date: 2024-06-17
category:
  - Java
  - 编程
tag:
  - 数组
  - 最小元素
  - 索引
---

# 在数组中找到最小元素的索引 | Baeldung

## 1. 概述

数组操作是必不可少的，我们可能在任何应用程序中都需要它们。有时，它们隐藏在像集合API这样更便利的接口后面。然而，这是我们应该在职业生涯早期就掌握的基本知识。

在本教程中，我们将学习如何找到数组中最小元素的索引。我们将讨论如何做到这一点，无论元素的类型如何，但为了简单起见，我们将使用一个整数数组。

## 2. 简单迭代

最简单的解决方案往往是最好的。**这是出于几个原因：它更容易实现、更改和理解。** 让我们看看如何使用基本的_for_循环找到最小元素的索引：

```java
@ParameterizedTest
@MethodSource("primitiveProvider")
void givenArray_whenUsingForLoop_thenGetCorrectResult(int[] array, int expectedIndex) {
    int minValue = Integer.MAX_VALUE;
    int minIndex = -1;
    for (int i = 0; i `< array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
            minIndex = i;
        }
    }
    assertThat(minIndex).isEqualTo(expectedIndex);
}
```

实现相当冗长。然而，我们的目标是解决问题，而不是最小化我们使用的行数。这是一种健壮且简单的解决方案，易于阅读和更改。此外，它不需要对更高级的Java API有深入的了解。

**_for_循环可以被_while_或，如果我们感觉特别花哨，甚至_do-while_替换。** 我们用来迭代数组的方法并不重要。

同时，如果我们使用引用类型，我们可以将这种逻辑仅应用于可比较的对象，并且不是使用<运算符，而是使用_compareTo()_方法。

## 3. 两步方法

**在另一种方法中，我们可以将任务分成两个独立的步骤：找到最小元素和找到它的索引。** 尽管它可能比第一个方法性能稍差，但它具有相同的时间复杂度。

让我们修改我们的第一个方法：

```java
@ParameterizedTest
@MethodSource("primitiveProvider")
void givenArray_whenUsingForLoopAndLookForIndex_thenGetCorrectResult(int[] array, int expectedIndex) {
    int minValue = Integer.MAX_VALUE;
    for (int number : array) {
        if (number < minValue) {
            minValue = number;
        }
    }
    int minIndex = -1;
    for (int i = 0; i < array.length; i++) {
        if (array[i] == minValue) {
            minIndex = i;
            break;
        }
    }
    assertThat(minIndex).isEqualTo(expectedIndex);
}
```

在这里，我们需要使用两个单独的循环。同时，我们可以简化第一个循环，因为我们不需要索引，并且可以提前退出第二个循环。请注意，与第一种方法相比，它并没有提高性能。

## 4. 原始流

我们可以从前一种方法中消除第一个循环。在这种情况下，我们可以使用Stream API，特别是_IntStream_：

```java
@ParameterizedTest
@MethodSource("primitiveProvider")
void givenArray_whenUsingIntStreamAndLookForIndex_thenGetCorrectResult(int[] array, int expectedIndex) {
    int minValue = Arrays.stream(array).min().orElse(Integer.MAX_VALUE);
    int minIndex = -1;
    for (int i = 0; i < array.length; i++) {
        if (array[i] == minValue) {
            minIndex = i;
            break;
        }
    }
    assertThat(minIndex).isEqualTo(expectedIndex);
}
```

_IntStreams_提供了方便的方法来对一系列原始值进行操作。我们使用了_min()_方法，并将我们的命令式循环转换为声明式流。

让我们尝试将第二个循环重构为声明式循环：

```java
@ParameterizedTest
@MethodSource("primitiveProvider")
void givenArray_whenUsingIntStreamAndLookForIndexWithIntStream_thenGetCorrectResult(int[] array, int expectedIndex) {
    int minValue = Arrays.stream(array).min().orElse(Integer.MAX_VALUE);
    int minIndex = IntStream.range(0, array.length)
      .filter(index ->` array[index] == minValue)
      .findFirst().orElse(-1);
    assertThat(minIndex).isEqualTo(expectedIndex);
}
```

在这种情况下，我们使用_IntStream.range()_进行迭代，并将元素与最小值进行比较。这种方法是声明式的，应该被认为是前进的方式。**然而，代码的可读性受到了影响，特别是对于没有流经验的开发者。**

我们可以使用Apache Commons _ArrayUtils_类将找到最小元素的逻辑替换为一行代码：

```java
@ParameterizedTest
@MethodSource("primitiveProvider")
void givenArray_whenUsingIntStreamAndLookForIndexWithArrayUtils_thenGetCorrectResult(int[] array, int expectedIndex) {
    int minValue = Arrays.stream(array).min().orElse(Integer.MAX_VALUE);
    int minIndex = ArrayUtils.indexOf(array, minValue);
    assertThat(minIndex).isEqualTo(expectedIndex);
}
```

这使得解决方案更易于阅读，但需要额外的依赖项。如果我们不想添加更多依赖项，我们可以使用_Lists_，因为它们默认包含_indexOf()_方法：

```java
@ParameterizedTest
@MethodSource("referenceTypesProvider")
void givenArray_whenUsingReduceAndList_thenGetCorrectResult(Integer[] array, int expectedIndex) {
    List`<Integer>` list = Arrays.asList(array);
    int minValue = list.stream().reduce(Integer.MAX_VALUE, Integer::min);
    int index = list.indexOf(minValue);
    assertThat(index).isEqualTo(expectedIndex);
}
```

**然而，将数组转换为_List_将影响我们解决方案的空间复杂度，将其从常数增加到线性。** 我们不会在进一步的例子中考虑这种方法，因为它没有提供任何显著的好处。

## 5. 数组和引用类型

虽然原始流为计算提供了很好的API，但它们不适用于引用类型。在这种情况下，我们可以使用_reduce()_方法：

```java
@ParameterizedTest
@MethodSource("referenceTypesProvider")
void givenArray_whenUsingReduce_thenGetCorrectResult(Integer[] array, int expectedIndex) {
    int minValue = Arrays.stream(array).reduce(Integer.MAX_VALUE, Integer::min);
    int minIndex = ArrayUtils.indexOf(array, minValue);
    assertThat(minIndex).isEqualTo(expectedIndex);
}
```

reduce()方法采用识别的值；在我们的例子中，它是_Integer.MAX_VALUE_和_min()_方法的引用。**我们有些非传统地使用了_reduce()_方法，进行了过滤而不是聚合。** 这里，我们使用了_ArrayUtils_，但使用_for_循环或_filter()_的解决方案同样有效。

## 6. 流中的索引

我们可以直接在流解决方案中使用索引，就像我们之前使用_filter()_一样。这样，我们可以在_reduce()_方法内完成所有逻辑：

```java
@ParameterizedTest
@MethodSource("primitiveProvider")
void givenArray_whenUsingReduceWithRange_thenGetCorrectResult(int[] array, int expectedIndex) {
    int index = IntStream.range(0, array.length)
      .reduce((a, b) -> array[a] <= array[b] ? a : b)
      .orElse(-1);
    assertThat(index).isEqualTo(expectedIndex);
}
```

我们沿着流传递最小元素的索引。**然而，这种方法可能不易于阅读，并且需要对Stream API有更深入的了解。**

## 7. 结论

数组是Java中最基础的数据结构。熟练地操作和迭代它们是一项宝贵的技能，尽管我们通常不直接使用数组。

**最直接的方法通常是最佳选择，因为它易于理解和明确。** 使用Streams需要对函数式编程有更深入的了解，可能会以两种方式影响代码的可读性：更好或更差。因此，应该谨慎使用Stream API。

像往常一样，文章中的所有代码都可以在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。

OK