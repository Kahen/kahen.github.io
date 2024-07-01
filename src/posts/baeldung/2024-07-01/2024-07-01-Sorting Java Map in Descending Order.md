---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - Java
  - Map
  - Sorting
head:
  - - meta
    - name: keywords
      content: Java, Map, Sorting, TreeMap, Comparator
---
# Java Map按降序排序

排序是所有编程语言中的基本操作，它允许有效地组织和检索信息。

此外，Map接口广泛用于在Java中存储键值对。然而，默认的Map迭代顺序并不总是符合应用程序的需求。通常，为了优化我们的操作，我们需要按特定顺序对数据进行排序。

**在本教程中，我们将探讨按键和值对Java Map进行降序排序的过程，并提供详细的解释和实际示例。**

## 2. 理解Map和排序

Java中的Map是一个接口，代表一个键值对集合。虽然数据本质上没有顺序，但有时我们需要以排序的方式显示或处理它。

**当按值降序排序Map时，我们需要考虑与每个键关联的值。**

## 3. 使用TreeMap对Map的键进行排序

TreeMap类是Java中SortedMap接口的一个排序实现。具体来说，它基于元素的自然顺序或构造函数中指定的Comparator对键进行排序：

```java
Map````<K, V>```` sortedMap = new TreeMap<>(Comparator.reverseOrder());
```

为了证明前面的陈述，我们使用JUnit创建了一个未排序的Map，并为TreeMap的构造器提供了**自定义比较器**。

```java
@Test
public void given_UnsortedMap_whenUsingTreeMap_thenKeysAreInDescendingOrder() {
    SortedMap```<String, Integer>``` treeMap = new TreeMap<>(Comparator.reverseOrder());
    treeMap.put("one", 1);
    treeMap.put("three", 3);
    treeMap.put("five", 5);
    treeMap.put("two", 2);
    treeMap.put("four", 4);

    assertEquals(5, treeMap.size());
    final Iterator`<String>` iterator = treeMap.keySet().iterator();
    assertEquals("two", iterator.next());
    assertEquals("three", iterator.next());
    assertEquals("one", iterator.next());
    assertEquals("four", iterator.next());
    assertEquals("five", iterator.next());
}

```

正如我们所看到的，Map按字母顺序对其键进行了排序。

## 4. 使用自定义比较器对值进行排序

**要按降序对Map进行排序，我们可以使用一个自定义的Comparator，它反转了值的自然顺序。** 以下是一个实现示例：

```java
public static `<K, V extends Comparable<? super V>`> Map````<K, V>```` sortMapByValueDescending(Map````<K, V>```` map) {
    return map.entrySet()
      .stream()
      .sorted(Map.Entry.````<K, V>````comparingByValue().reversed())
      .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
}
```

在这个例子中，我们定义了一个_sortMapByValueDescending_方法，它接受一个输入Map，并创建一个自定义Comparator，根据其值以降序比较Map.Entry对象，并初始化一个新的LinkedHashMap来保存排序后的条目。

**该方法通过输入Map的条目流，使用Comparator进行排序，并使用_forEach_方法将排序后的条目填充到新Map中。** 结果是一个按值降序排序的Map，同时保持键值关联。

为了确保我们排序实现的正确性，我们可以利用JUnit测试。JUnit是Java应用程序广泛使用的测试框架。

让我们创建一些测试用例来验证我们的_sortMapByValueDescending_方法：

```java
@Test
public void given_UnsortedMap_whenSortingByValueDescending_thenValuesAreInDescendingOrder() {
    Map```<String, Integer>``` unsortedMap = new HashMap<>();
    unsortedMap.put("one", 1);
    unsortedMap.put("three", 3);
    unsortedMap.put("five", 5);
    unsortedMap.put("two", 2);
    unsortedMap.put("four", 4);

    Map```<String, Integer>``` sortedMap = sortMapByValueDescending(unsortedMap);

    assertEquals(5, sortedMap.size());
    final Iterator`<Integer>` iterator = sortedMap.values().iterator();
    assertEquals(5, (int) iterator.next());
    assertEquals(4, (int) iterator.next());
    assertEquals(3, (int) iterator.next());
    assertEquals(2, (int) iterator.next());
    assertEquals(1, (int) iterator.next());
}
```

在这里，我们创建了一个测试方法来验证我们的排序方法的正确性。此外，我们定义了一个具有各种键值对的未排序Map，然后检查由我们的方法生成的排序Map是否具有正确的大小以及所有元素是否已正确排序。

## 5. 结论

对Java Map进行降序排序是使用键值数据的程序员的一项宝贵技能。根据我们想要排序的内容，我们可以通过使用适当的Map和自定义Comparator或创建我们自己的Comparator来按值排序元素。使用**TreeMap**，您将能够按**键**对Map的元素进行排序，编写**自定义Comparator**，您可以定义要排序的**元素，同时保持相同的键值关联**。记住，平滑的过渡对于引导读者通过您的代码和解释至关重要，这增强了整体的可读性。

有了这些知识，我们可以自信地对Java Map对象进行降序排序，以优化我们的应用程序。

如往常一样，本文的完整代码示例可以在GitHub上找到。