---
date: 2024-06-25
category:
  - Java
  - 编程技巧
tag:
  - Java
  - 列表排序
head:
  - - meta
    - name: keywords
      content: Java, 列表排序, 编程技巧
---
# Java中根据另一个列表排序列表的多种方法

在Java中，根据另一个列表的顺序对列表进行排序是一项常见任务，存在多种方法可以实现这一点。

在本教程中，我们将看到Java中根据另一个列表对列表进行排序的不同方法。

## 2. 示例

假设我们有一个产品列表`productList`和另一个列表`shoppingCart`，后者代表用户的购物车。`shoppingCart`包含各种产品ID，我们需要按照它们在购物车中出现的顺序显示产品：

```java
List````````````````````````````````````````<String>```````````````````````````````````````` productList = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
List````````````````````````````````````````<String>```````````````````````````````````````` shoppingCart = Arrays.asList("Pizza", "Burger", "Fries", "Coke");
```

在上面的示例中，`productList`是具有实际顺序的列表，而`shoppingCart`是需要根据`productList`进行排序的列表。排序后的顺序应该是：

```
Pizza
Burger
Fries
Coke
```

## 3. 使用_for_循环迭代_List_

我们可以使用标准的_for_循环根据另一个列表对列表进行排序。在这种方法中，我们创建一个新的列表，该列表将按排序顺序返回元素。循环遍历_listWithOrder_表，并将_listToSort_中的元素按照_listWithOrder_中指定的顺序添加到_sortedList_。结果是根据_listWithOrder_列表中元素的顺序进行排序的_sortedList_：

```java
List````````````````````````````````````````<String>```````````````````````````````````````` sortUsingForLoop(List````````````````````````````````````````<String>```````````````````````````````````````` listToSort, List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder) {
    List````````````````````````````````````````<String>```````````````````````````````````````` sortedList = new ArrayList<>();
    for (String element : listWithOrder) {
        if (listToSort.contains(element)) {
            sortedList.add(element);
        }
    }
    return sortedList;
}
```

让我们测试这种方法来排序上述示例：

```java
public void givenTwoList_whenUsingForLoop_thenSort() {
    List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    List````````````````````````````````````````<String>```````````````````````````````````````` listToSort = Arrays.asList("Pizza", "Burger", "Fries", "Coke");
    sortUsingForLoop(listToSort, listWithOrder);
    List````````````````````````````````````````<String>```````````````````````````````````````` expectedSortedList = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    assertEquals(expectedSortedList, listWithOrder);
}
```

## 4. 使用_Comparator_接口

在这种方法中，我们利用Java的_Comparator_接口的灵活性来创建自定义比较器。比较器将基于参考列表或具有实际顺序的列表中元素的索引。让我们看看它如何允许我们对列表进行排序：

```java
void sortUsingComparator(List````````````````````````````````````````<String>```````````````````````````````````````` listToSort, List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder) {
    listToSort.sort(Comparator.comparingInt(listWithOrder::indexOf));
}
```

_Comparator.comparingInt(listWithOrder::indexOf)_结构允许我们根据_listWithOrder_中元素的出现顺序对_listToSort_列表进行排序。

让我们使用这种方法来排序上述讨论的示例：

```java
public void givenTwoList_whenUsingComparator_thenSort() {
    List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    List````````````````````````````````````````<String>```````````````````````````````````````` listToSort = Arrays.asList("Pizza", "Burger", "Fries", "Coke");
    sortUsingComparator(listToSort, listWithOrder);
    List````````````````````````````````````````<String>```````````````````````````````````````` expectedSortedList = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    assertEquals(expectedSortedList, listToSort);
}
```

这是一个简洁易读的解决方案，避免了额外数据结构的需求，并提供了一种清晰直接的方法。**然而，需要注意的是，对于大型列表，性能可能会下降，因为_indexOf()_操作具有线性时间复杂度。**

## 5. 使用Stream API

我们还可以使用基于Stream API的方法来根据另一个列表对列表进行排序。首先，我们将通过_Collectors.toMap()_收集器在_listWithOrder_中创建元素及其索引之间的映射。之后，使用_Comparator.comparingInt()_方法使用结果映射对_listToSort_进行排序：

```java
void sortUsingStreamAPI(List````````````````````````````````````````<String>```````````````````````````````````````` listToSort, List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder) {
    Map``<String, Integer>`` indicesMap = listWithOrder.stream().collect(Collectors.toMap(e -> e, listWithOrder::indexOf));
    listToSort.sort(Comparator.comparingInt(indicesMap::get));
}
```

让我们测试这种方法来排序上述示例：

```java
public void givenTwoList_whenUsingStreamAPI_thenSort() {
    List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    List````````````````````````````````````````<String>```````````````````````````````````````` listToSort = Arrays.asList("Pizza", "Burger", "Fries", "Coke");
    sortUsingCustomComparator(listToSort, listWithOrder);
    List````````````````````````````````````````<String>```````````````````````````````````````` expectedSortedList = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    assertEquals(expectedSortedList, listToSort);
}
```

Stream API方法提供了一个干净且现代的解决方案。**然而，对于大型列表，需要注意潜在的开销，因为创建映射涉及遍历整个列表。**

## 6. 使用_Map_

在这种方法中，我们利用Java的_Map_的强大功能，在参考列表_listWithOrder_和它们对应的索引之间创建直接映射。映射中的键值对由_listWithOrder_中的元素作为键和它们的索引作为值组成：

```java
void sortUsingMap(List````````````````````````````````````````<String>```````````````````````````````````````` listToSort, List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder) {
    Map``<String, Integer>`` orderedIndicesMap = new HashMap<>();
    for (int i = 0; i < listWithOrder.size(); i++) {
        orderedIndicesMap.put(listWithOrder.get(i), i);
    }
    listToSort.sort(Comparator.comparingInt(orderedIndicesMap::get));
}
```

让我们测试这种方法来排序上述示例：

```java
public void givenTwoList_whenUsingMap_thenSort() {
    List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    List````````````````````````````````````````<String>```````````````````````````````````````` listToSort = Arrays.asList("Pizza", "Burger", "Fries", "Coke");
    sortUsingMap(listToSort, listWithOrder);
    List````````````````````````````````````````<String>```````````````````````````````````````` expectedSortedList = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    assertEquals(expectedSortedList, listToSort);
}
```

使用_Map_为我们提供了一个优势，特别是在涉及大型列表、重复查找或性能敏感应用程序的场景中，它比_indexOf()_方法更优。

## 7. 使用Guava的_Ordering.explicit()_

Guava是一个广泛使用的Java库，它提供了一个方便的方法，根据另一个列表的元素顺序对列表进行排序。首先，让我们通过在我们的_pom.xml_文件中添加这个依赖项：

```xml
``<dependency>``
    ``<groupId>``com.google.guava``</groupId>``
    ``<artifactId>``guava``</artifactId>``
    ``<version>``33.0.0-jre``</version>``
``</dependency>``
```

**Guava的_explicit()_方法允许我们根据特定顺序创建比较器。_Ordering_类是不可变的，因此结果将是一个新排序的列表，原始列表，即_listToSort，_将保持不变。**

```java
List````````````````````````````````````````<String>```````````````````````````````````````` sortUsingGuava(List````````````````````````````````````````<String>```````````````````````````````````````` listToSort, List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder) {
    Ordering````````````````````````````````````````<String>```````````````````````````````````````` explicitOrdering = Ordering.explicit(listWithOrder);
    List````````````````````````````````````````<String>```````````````````````````````````````` sortedList = explicitOrdering.sortedCopy(listToSort);
    return sortedList;
}
```

在上面的示例中，_sortedCopy()_方法负责创建一个排序列表。让我们测试这种方法：

```java
public void givenTwoList_whenUsingGuavaExplicit_thenSort() {
    List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    List````````````````````````````````````````<String>```````````````````````````````````````` listToSort = Arrays.asList("Pizza", "Burger", "Fries", "Coke");
    sortUsingGuava(listToSort, listWithOrder);
    List````````````````````````````````````````<String>```````````````````````````````````````` expectedSortedList = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    assertEquals(expectedSortedList, listWithOrder);
}
```

## 8. 使用Vavr

Vavr是一个**Java 8+的函数库，提供不可变数据类型和函数控制结构。**为了使用Vavr，我们首先需要添加这个依赖项：

```xml
``<dependency>``
    ``<groupId>``io.vavr``</groupId>``
    ``<artifactId>``vavr``</artifactId>``
    ``<version>``0.10.4``</version>``
``</dependency>``
```

Vavr提供了一个_sortBy()_方法，可以用来根据另一个列表中指定的顺序对列表进行排序，即_listToSort_。结果将存储在新的列表_sortedList_中，原始_listToSort_列表将保持不变。让我们看看使用Vavr的一个示例：

```java
List````````````````````````````````````````<String>```````````````````````````````````````` sortUsingVavr(List````````````````````````````````````````<String>```````````````````````````````````````` listToSort, List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder) {
    io.vavr.collection.List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrderedElements = io.vavr.collection.List.ofAll(listWithOrder);
    io.vavr.collection.List````````````````````````````````````````<String>```````````````````````````````````````` listToSortElements = io.vavr.collection.List.ofAll(listToSort);
    io.vavr.collection.List````````````````````````````````````````<String>```````````````````````````````````````` sortedList = listToSortElements.sortBy(listWithOrderedElements::indexOf);
    return sortedList.asJava();
}
```

让我们测试这种方法：

```java
public void givenTwoList_whenUsingVavr_thenSort() {
    List````````````````````````````````````````<String>```````````````````````````````````````` listWithOrder = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    List````````````````````````````````````````<String>```````````````````````````````````````` listToSort = Arrays.asList("Pizza", "Burger", "Fries", "Coke");
    sortUsingVavr(listToSort, listWithOrder);
    List````````````````````````````````````````<String>```````````````````````````````````````` expectedSortedList = Arrays.asList("Burger", "Coke", "Fries", "Pizza");
    assertEquals(expectedSortedList, listWithOrder);
}
```

## 9. 结论

在本教程中，我们探索了根据另一个列表中元素的顺序对列表进行排序的各种方法。选择适当的方法取决于特定用例，基于解决方案的简单性和性能。

如常，源代码可在GitHub上获得。
OK