---
date: 2022-04-01
category:
  - Java
  - ArrayList
tag:
  - Java
  - ArrayList
  - replace
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, replace element
---

# 在Java ArrayList中替换特定索引处的元素

通过本教程，我们将探讨如何在Java的_ArrayList_中替换特定索引处的元素。

## **2. 常见做法**

要替换一个现有元素，首先需要找到该元素在_ArrayList_中的确切位置。这个位置就是我们所说的索引。然后，我们可以将旧元素替换为新元素。

在Java _ArrayList_中替换元素的最常用方法是使用_set(int index, Object element)_方法。_set()_方法接受两个参数：现有项目的索引和新项目。

_ArrayList_的索引是基于0的。因此，要替换第一个元素，必须将0作为参数传递给索引。

如果提供的索引超出范围，将发生_IndexOutOfBoundsException_。

## **3. 实现**

让我们通过一个例子来看看如何在Java _ArrayList_中替换特定索引处的元素。

```java
List``<Integer>`` EXPECTED = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

List``<Integer>`` aList = new ArrayList<>(Arrays.asList(1, 2, 7, 4, 5));
aList.set(2, 3);

assertThat(aList).isEqualTo(EXPECTED);
```

首先，我们创建一个包含五个元素的_ArrayList_。然后，我们将第三个元素的值7替换为3，索引为2。最后，我们可以看到索引2处的值7已从列表中移除，并更新为新值3。同时，请注意列表的大小不会受到影响。

## **4. 结论**

在这篇简短的文章中，我们学习了如何在Java _ArrayList_中替换特定索引处的元素。此外，您可以使用此方法与任何其他_List_类型，如_LinkedList_。只要确保您使用的_List_不是不可变的。

如往常一样，本文的完整源代码可以在GitHub上找到。