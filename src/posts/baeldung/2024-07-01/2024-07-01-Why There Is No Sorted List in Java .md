---
date: 2022-04-01
category:
  - Java
  - Collection Framework
tag:
  - Java
  - Sorted List
  - List Interface
head:
  - - meta
    - name: keywords
      content: Java, Collection Framework, Sorted List, List Interface
---
# Java中为什么没有内置的排序列表？

Java提供了一个丰富的集合框架，其中包括多种接口和类，以满足不同的数据结构需求。然而，它并没有提供内置的排序列表实现。在本文中，我们将探讨这种缺失背后的原因，比较插入时排序和按需排序的概念。我们还将讨论插入时排序如何可能破坏_List_接口的契约，并探索实现排序行为的替代方法。

## 2. 插入时排序与按需排序

要理解为什么Java中没有排序列表，我们首先需要区分插入时排序和按需排序。

### 2.1. 插入时排序

**插入时排序涉及在插入时立即重新排列元素，确保每次添加后都保持排序顺序。** 一些数据结构就是这样表现的。通常，它们的实现基于树结构，最著名的是_TreeSet_和_TreeMap_。

插入时排序实现的主要优点是，从这种结构中读取数据的效率。写入数据的成本更高，因为我们需要在结构中找到正确的位置，有时甚至需要重新排列现有数据。

这种成本可能比每次读取时对整个未排序集合进行排序的成本要小得多。然而，具有多个排序条件的插入时排序要复杂得多，涉及到跟踪多个索引树结构，使得保存更加复杂和昂贵。

### 2.2. 按需排序

另一方面，**按需排序将排序操作推迟到用户明确请求时才执行。** 排序读取成本较高，因为我们必须每次都对整个集合进行排序。

优点是，保存数据非常便宜，底层数据结构可以更简单——例如，支持_ArrayList_的数组。此外，我们可以每次根据不同的条件进行排序，甚至可以选择不进行排序。

## 3. 插入时排序如何破坏_List_契约

插入时排序将破坏_List_接口的契约。**_List_接口的契约规定，元素应该保持它们被插入的顺序，允许有重复项。** 插入时排序将通过重新排列元素来违反这一契约。这种顺序对于许多依赖元素顺序的列表操作和算法非常重要。

每次插入时对列表进行排序，我们将改变元素的顺序，并可能破坏_List_接口中定义的其他方法的预期行为。

## 4. 实现插入时排序

在大多数情况下，我们不应该实现我们自己的数据结构来实现插入时排序。已经有集合很好地做到了这一点，尽管它们基于树数据结构，而不是线性列表。

### 4.1. 使用自然顺序的_TreeSet_

如果我们对自然顺序感到满意并想忽略重复项，我们可以创建一个默认构造函数的_TreeSet_实例：

```java
TreeSet````<Integer>```` sortedSet = new TreeSet<>();
sortedSet.add(5);
sortedSet.add(2);
sortedSet.add(8);
sortedSet.add(1);
System.out.println(sortedSet); // 输出: [1, 2, 5, 8]
```

### 4.2. 使用自定义顺序的_TreeSet_

我们还可以使用自定义_Comparator_来实现自定义顺序。假设我们有一组字符串，我们想根据它们的最后一个字母对它们进行排序：

```java
Comparator``<String>`` customComparator = Comparator.comparing(str -> str.charAt(str.length() - 1));

TreeSet``<String>`` sortedSet = new TreeSet<>(customComparator);

sortedSet.add("Canada");
sortedSet.add("Germany");
sortedSet.add("Japan");
sortedSet.add("Sweden");
sortedSet.add("India");
```

```java
System.out.println(sortedSet); // 输出: [India, Canada, Sweden, Japan, Germany]
```

## 5. 实现按需排序

如果我们想使用_List_接口，我们可以按需实现排序。我们可以通过两种方式做到这一点：就地排序或创建一个新的排序列表。

### 5.1. 就地排序

要就地对列表进行排序，我们将使用_Collections_类的_sort_方法。它将改变我们的列表，改变元素的顺序：

```java
List````<Integer>```` numbers = new ArrayList<>();
numbers.add(5);
numbers.add(2);
numbers.add(8);
numbers.add(1);
System.out.println("排序前: " + numbers); // 输出: 排序前: [5, 2, 8, 1]

Collections.sort(numbers);
System.out.println("排序后: " + numbers); // 输出: 排序后: [1, 2, 5, 8]
```

就地排序**通常更快，更节省内存，但按定义，它需要在一个可变集合上工作**，这并不总是可取或可能的。

### 5.2. 不改变原始集合的排序

我们也可以在不改变原始集合的情况下对列表进行排序。为此，我们将**从列表创建一个流，对其进行排序，然后将其收集到一个新的列表中**：

```java
List````<Integer>```` sortedList = numbers.stream().sorted().collect(Collectors.toList());

System.out.println("排序后: " + sortedList); // 输出: 排序后: [1, 2, 5, 8]
System.out.println("原始列表: " + numbers); // 输出: 原始列表: [5, 2, 8, 1]
```

我们还可以使用前几段的知识，并且**不是将流中的元素收集到一个新的列表中，而是将其收集到一个_TreeSet_中**。这样，我们就不需要显式地对其进行排序——_TreeSet_的实现会为我们做这件事：

```java
TreeSet````<Integer>```` sortedSet = numbers.stream().collect(Collectors.toCollection(() -> new TreeSet<>()));

System.out.println("排序后: " + sortedSet); // 输出: 排序后: [1, 2, 5, 8]
System.out.println("原始列表: " + numbers); // 输出: 原始列表: [5, 2, 8, 1]
```

## 6. 总结

在本文中，我们了解到Java集合框架中缺少内置排序列表实现是一个经过深思熟虑的决定，它维护了_List_接口的契约。然后，我们探讨了如果我们想要实现插入时排序，可以使用哪些数据结构。

最后，我们还学习了如果决定使用_List_接口，如何按需进行排序。