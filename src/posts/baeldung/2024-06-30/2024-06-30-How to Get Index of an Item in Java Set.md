---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - Java
  - Set
  - Index
head:
  - - meta
    - name: keywords
      content: Java, Set, Index, find index in set, Java Set element index
------
# 如何在Java集合中获取元素的索引

在本教程中，我们将探讨如何在Java的_Set_中获取一个项目的索引。Java中的_Set_不允许有重复元素，一些重要的_Set_接口实现包括_HashSet_、_TreeSet_和_LinkedHashSet_。

## 2. Java中的有序、无序和排序集合

在我们查看问题陈述之前，让我们先看看Java中不同类型的集合之间的区别：

- 有序集合
- 无序集合
- 排序集合

有序集合维护其元素的插入顺序。元素按照它们被插入的顺序存储，并且可以通过它们的位置来访问。**这些集合通常提供一个_get(index)_接口来检索特定索引处的元素。** 实现_List_接口的类，如_ArrayList_、_LinkedList_等，是有序集合的例子。

另一方面，Java中的无序集合不保证任何特定的遍历顺序。**元素存储的顺序取决于支持它的底层数据结构。无序集合中的元素通常通过它们的值而不是索引来访问。** _HashSet_和_HashMap_是无序集合的一些例子。

**排序集合是一种特殊的集合类型，遍历集合将按照元素的自然顺序或根据指定的_Comparator_来产生元素。** _TreeSets_和_TreeMaps_是排序集合的例子。

## 3. 为什么_Set_不提供_indexOf()_

Java中的_Set_是无序集合。它们具有以下重要特征：

- 保证其元素的唯一性
- 可以高效地确认元素的存在，时间复杂度为常数

_Set_有不同的变体。_HashSet_基于基于哈希的机存储其元素（内部使用_HashMap_），而_TreeSet_将使用默认或自定义比较器来存储和排序其元素。

**_Set_还需要在保证唯一性方面高效，这意味着存储元素的效率比保持它们的顺序更重要。与_List_不同，直接获取_Set_中项目的索引并不简单。**

## 4. 问题陈述

我们在这里要解决的问题是找到一个给定_Set_中元素的索引。**该元素的索引应该始终相同，并且在每次查询时不应改变。** 如果集合中缺少该元素，我们应该返回-1。

```java
示例 1:
输入集合 [10, 2, 9, 15, 0]
查询：getIndexOf(10)
输出：0
查询：getIndexOf(0)
输出：4
```

```java
示例 2:
输入集合 ["Java", "Scala", "Python", "Ruby", "Go"]
查询：getIndexOf("Scala")
输出：1
```

## 5. 编写获取索引的工具方法

### 5.1. 使用迭代器

_Iterator``````<E>``````_是一个对象，允许我们一次遍历集合中的一个元素，例如_List_、_Set_或_Map_。这是一种有序的方法来遍历元素，可以用来解决我们的问题。

我们首先从_Set_获取一个迭代器实例，并使用它来迭代直到我们找到我们正在寻找的元素。我们还跟踪步骤，并在到达我们想要的元素时中断，索引如下：

```java
public int getIndexUsingIterator(Set``````<E>`````` set, E element) {
    Iterator``````<E>`````` iterator = set.iterator();
    int index = 0;
    while (iterator.hasNext()) {
        if (element.equals(iterator.next())) {
            return index;
        }
        index++;
    }
    return -1;
}
```

### 5.2. 使用_For-Each_循环

我们也可以同样使用_for-each_循环来遍历提供的集合：

```java
public int getIndexUsingForEach(Set``````<E>`````` set, E element) {
    int index = 0;
    for (E current : set) {
        if (element.equals(current)) {
            return index;
        }
        index++;
    }
    return -1;
}
```

**我们结合使用这些工具方法和我们使用的_Set_对象。这些方法每次调用时都以_O(n)_，或线性时间运行，其中_n_是集合的大小。它不需要任何额外的空间。**

我们这里的实现将始终返回相同的索引，无论我们调用_getIndexUsingIterator()_或_getIndexUsingForEach()_方法多少次。这验证了解决方案的正确性。

然而，如果需要将此方法的索引输出与元素的插入顺序匹配，我们需要更深入地研究。

### 5.3. 在不同类型的集合上应用实现

请注意，使用迭代器遍历得到的索引可能与插入顺序不匹配，特别是如果我们使用_HashSet_作为源：

```java
Set````<Integer>```` set = new HashSet<>();
set.add(100);
set.add(20);
// 添加更多元素
Assert.assertEquals(2, integerIndexOfElementsInSet.getIndexUsingIterator(set,100));
```

尽管我们将100作为第一个元素插入，但我们从我们的实现中得到的索引是2。**迭代器将按其在_HashSet_中存储的顺序遍历元素，而不是插入的顺序。**

要解决这个问题，我们可以将我们的_HashSet_替换为_LinkedHashSet_：

```java
Set````<Integer>```` set = new LinkedHashSet<>();
set.add(100);
set.add(20);
// 添加更多元素
Assert.assertEquals(0, integerIndexOfElementsInSet.getIndexUsingIterator(set, 100));
```

**_LinkedHashSet_由_LinkedList_支持，它存储元素并因此维护元素的顺序。**

同样，当我们使用_TreeSet_时，我们从我们的实现中得到的索引基于_Set_中元素的自然排序：

```java
Set````<Integer>```` set = new TreeSet<>();
set.add(0);
set.add(-1);
set.add(100);
// 添加更多元素
Assert.assertEquals(0, integerIndexOfElementsInSet.getIndexUsingIterator(set, -1));
Assert.assertEquals(3, integerIndexOfElementsInSet.getIndexUsingIterator(set, 100));
```

在这一部分中，我们探讨了如何在_Set_中找到元素的索引，以及如何使用_LinkedHashSet_正确地基于插入顺序找到索引。

## 6. 编写自定义_LinkedHashSet_实现

我们也可以编写一个自定义的_LinkedHashSet_类在Java中来补充其功能以获取元素的索引。尽管仅为了添加一个实用方法而创建一个子类是高度不必要的，但这仍然是一个选项：

```java
public class InsertionIndexAwareSet``````<E>`````` extends LinkedHashSet``````<E>`````` {

    public int getIndexOf(E element) {
        int index = 0;
        for (E current : this) {
            if (current.equals(element)) {
                return index;
            }
            index++;
        }
        return -1;
    }
}
```

最后，我们可以创建我们的自定义类的实例，并调用_getIndexOf()_方法来获取索引：

```java
@Test
public void givenIndexAwareSetWithStrings_whenIndexOfElement_thenGivesIndex() {
    InsertionIndexAwareSet`<String>` set = new InsertionIndexAwareSet<>();
    set.add("Go");
    set.add("Java");
    set.add("Scala");
    set.add("Python");
    Assert.assertEquals(0, set.getIndexOf("Go"));
    Assert.assertEquals(2, set.getIndexOf("Scala"));
    Assert.assertEquals(-1, set.getIndexOf("C++"));
}
```

## 7. 使用_Apache Commons Collections_

最后，让我们也看看如何使用_Apache Commons Collections_库来解决我们的问题。_Apache Commons Collections_库提供了一组广泛的实用方法，帮助我们处理和扩展Java Collections API的功能。

首先，我们需要添加Maven依赖项以在我们的代码中使用：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-collections4`</artifactId>`
    `<version>`4.4`</version>`
`</dependency>`
```

我们将在这里使用_ListOrderedSet_类。_ListOrderedSet_实现了_Set_接口，并使用装饰器模式提供额外的好处，即保留元素的插入顺序。如果我们向集合中添加重复的元素，元素保持在其原始位置：

```java
@Test
public void givenListOrderedSet_whenIndexOfElement_thenGivesIndex() {
    ListOrderedSet````<Integer>```` set = new ListOrderedSet<>();
    set.add(12);
    set.add(0);
    set.add(-1);
    set.add(50);
    Assert.assertEquals(0, set.indexOf(12));
    Assert.assertEquals(2, set.indexOf(-1));
}
```

## 8. 结论

在本文中，我们探讨了在_Set_中找到元素索引的不同方法。我们首先探讨了为什么在_Set_中找到元素的索引是困难的，以及如何创建我们的_LinkedHashSet_版本来实现结果。我们最后探讨了如何使用Apache库来实现相同的结果。

像往常一样，本教程中展示的所有代码示例都可以在GitHub上找到。