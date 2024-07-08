---
date: 2022-04-01
category:
  - Java
  - ArrayList
tag:
  - Java
  - Collections
  - ArrayList
  - 旋转
  - 交换
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, Collections, 旋转, 交换
---

# Java ArrayList中移动元素的方法

1. 概述

Java为我们提供了多种在_ArrayList_中重新排列元素的方法。在本教程中，我们将探讨其中的三种。

2. 移动一个元素

最手动的方法，也是给我们最大控制权的方法，是直接将一个元素移动到新的位置。我们可以通过首先使用_ArrayList.remove()_来实现这一点，它返回被移除的元素。然后，我们可以选择性地使用_ArrayList.add()_将该元素重新插入到我们选择的位置：

```java
@Test
void givenAList_whenManuallyReordering_thenOneItemMovesPosition() {
    ArrayList````````<String>```````` arrayList = new ArrayList<>(Arrays.asList("one", "two", "three", "four", "five"));

    String removed = arrayList.remove(3);
    arrayList.add(2, removed);

    ArrayList````````<String>```````` expectedResult = new ArrayList<>(Arrays.asList("one", "two", "four", "three", "five"));
    assertEquals(expectedResult, arrayList);
}
```

在底层，_ArrayList_使用数组。这意味着移除和插入元素需要通过移动其他所有元素来实现，这有很大的开销。因此，如果可能的话，我们应该避免这种方法，并使用下面两种方法之一，它们都保持了_ArrayList_的原始长度。

3. 交换两个元素

我们可以使用_Collections.swap()_来交换_ArrayList_中两个元素的位置。_swap()_方法接受三个参数，首先是要调整的_ArrayList_，然后是两个要交换的元素的位置：

```java
@Test
public void givenAList_whenUsingSwap_thenItemsSwapPositions() {
    ArrayList````````<String>```````` arrayList = new ArrayList<>(Arrays.asList("one", "two", "three", "four", "five"));

    Collections.swap(arrayList, 1, 3);

    ArrayList````````<String>```````` expectedResult = new ArrayList<>(Arrays.asList("one", "four", "three", "two", "five"));
    assertEquals(expectedResult, arrayList);
}
```

在这里，我们已经交换了位置1和3的元素，并确认列表看起来符合我们的预期。

4. 旋转整个列表

最后，我们也可以对列表应用旋转，通过给定的距离来移动所有元素。距离没有限制。因此，如果我们愿意，我们可以多次循环所有元素。正距离将根据我们的观点将元素向右或向下旋转：

```java
@Test
void givenAList_whenUsingRotateWithPositiveDistance_thenItemsMoveToTheRight() {
    ArrayList````````<String>```````` arrayList = new ArrayList<>(Arrays.asList("one", "two", "three", "four", "five"));

    Collections.rotate(arrayList, 2);

    ArrayList````````<String>```````` expectedResult = new ArrayList<>(Arrays.asList("four", "five", "one", "two", "three"));
    assertEquals(expectedResult, arrayList);
}
```

在这里，所有元素都向右移动了两个位置，一旦到达末尾就重新回到起点。或者，如果需要，我们也可以向左旋转，使用负距离：

```java
@Test
void givenAList_whenUsingRotateWithNegativeDistance_thenItemsMoveToTheLeft() {
    ArrayList````````<String>```````` arrayList = new ArrayList<>(Arrays.asList("one", "two", "three", "four", "five"));

    Collections.rotate(arrayList, -2);

    ArrayList````````<String>```````` expectedResult = new ArrayList<>(Arrays.asList("three", "four", "five", "one", "two"));
    assertEquals(expectedResult, arrayList);
}
```

5. 结论

在本文中，我们了解了Java为我们提供的重新排序_ArrayList_的三种选项。如果可能的话，我们应该使用_swap()_或_rotate()_以提高性能。如果我们需要更多的控制，或者只有一个元素在移动，那么我们知道如何使用_remove()_和_add()_手动将一个元素移动到我们需要的任何位置。

如往常一样，示例的完整代码可以在GitHub上找到。

OK