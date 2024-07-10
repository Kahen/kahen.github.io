---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - List
  - ArrayList
  - LinkedList
head:
  - - meta
    - name: keywords
      content: Java List Interface, ArrayList, LinkedList, Collections Framework
---
# Java List 接口 | Baeldung

1. 概述

在本教程中，我们将探讨 Java 的 List 接口。我们将讨论 List 提供的方法、它的实现以及使用场景。

2. Java 列表简介

Java 是一种面向对象的语言，因此大多数问题都涉及对象以及与这些对象相关的行为或动作。

此外，我们经常需要同时操作多个相同类型的对象，这就是集合发挥作用的地方。Java 的 List 是一种集合的实现，它保证元素的顺序并允许重复。

3. List 方法和用法

让我们看看 List 接口中最重要的方法，并看看如何使用它们。在这个例子中，我们将使用 ArrayList 实现。

3.1. 添加元素

让我们使用 void add(E element) 方法向列表中添加新元素：

```java
@Test
public void givenAFruitList_whenAddNewFruit_thenFruitIsAdded(){
    List fruits = new ArrayList();
    assertEquals("列表中的水果数量意外，应该是0", 0, fruits.size());

    fruits.add("Apple");
    assertEquals("列表中的水果数量意外，应该是1", 1, fruits.size());
}
```

3.2. 检查列表是否包含元素

我们可以使用 boolean contains(Object o) 方法检查列表是否包含元素：

```java
@Test
public void givenAFruitList_whenContainsFruit_thenFruitIsInTheList(){
    List fruits = new ArrayList();

    fruits.add("Apple");
    assertTrue("Apple 应该在水果列表中", fruits.contains("Apple"));
    assertFalse("Banana 不应该在水果列表中", fruits.contains("Banana"));
}
```

3.3. 检查列表是否为空

让我们使用 boolean isEmpty() 方法检查列表是否为空：

```java
@Test
public void givenAnEmptyFruitList_whenEmptyCheck_thenListIsEmpty(){
    List fruits = new ArrayList();
    assertTrue("水果列表应该是空的", fruits.isEmpty());

    fruits.add("Apple");
    assertFalse("水果列表不应该为空", fruits.isEmpty());
}
```

3.4. 迭代列表

如果我们想要迭代列表，我们可以使用 ListIterator listIterator() 方法：

```java
@Test
public void givenAFruitList_whenIterateOverIt_thenFruitsAreInOrder(){
    List fruits = new ArrayList();

    fruits.add("Apple"); // 索引 0 的水果
    fruits.add("Orange");// 索引 1 的水果
    fruits.add("Banana");// 索引 2 的水果
    int index = 0;
    for (Iterator it = fruits.listIterator(); it.hasNext(); ){
        String fruit = it.next();
        assertEquals("水果应该按顺序排列", fruits.get(index++), fruit);
    }
}
```

3.5. 移除元素

让我们使用 boolean remove(Object o) 方法从列表中移除元素：

```java
@Test
public void givenAFruitList_whenRemoveFruit_thenFruitIsRemoved(){
    List fruits = new ArrayList();

    fruits.add("Apple");
    fruits.add("Orange");
    assertEquals("列表中的水果数量意外，应该是2", 2, fruits.size());

    fruits.remove("Apple");
    assertEquals("列表中的水果数量意外，应该是1", 1, fruits.size());
}
```

3.6. 修改元素

让我们使用 E set(int index, E element) 方法修改列表中指定索引处的元素：

```java
@Test
public void givenAFruitList_whenSetFruit_thenFruitIsUpdated(){
    List fruits = new ArrayList();

    fruits.add("Apple");
    fruits.add("Orange");

    fruits.set(0, "Banana");
    assertEquals("索引 0 处的水果应该是 Banana", "Banana", fruits.get(0));
}
```

3.7. 获取列表大小

让我们使用 int size() 方法检索列表的大小：

```java
List fruits = new ArrayList();

fruits.add("Apple");
fruits.add("Orange");
assertEquals("列表中的水果数量意外，应该是2", 2, fruits.size());
```

3.8. 对列表进行排序

我们有多种对列表进行排序的方法。这里让我们看看如何使用 List 接口中的 default void sort(Comparator c) 方法。

这个方法需要一个比较器作为参数。让我们提供自然顺序比较器：

```java
@Test
public void givenAFruitList_whenSort_thenFruitsAreSorted(){
    List fruits = new ArrayList();

    fruits.add("Apple");
    fruits.add("Orange");
    fruits.add("Banana");

    fruits.sort(Comparator.naturalOrder());

    assertEquals("索引 0 处的水果应该是 Apple", "Apple", fruits.get(0));
    assertEquals("索引 1 处的水果应该是 Banana", "Banana", fruits.get(1));
    assertEquals("索引 2 处的水果应该是 Orange", "Orange", fruits.get(2));
}
```

3.9. 创建子列表

我们可以通过提供 fromIndex 和 toIndex 参数到方法 List subList(int fromIndex, int toIndex) 来创建列表的子列表。我们需要考虑到 toIndex 是不包含的：

```java
@Test
public void givenAFruitList_whenSublist_thenWeGetASublist(){
    List fruits = new ArrayList();

    fruits.add("Apple");
    fruits.add("Orange");
    fruits.add("Banana");

    List fruitsSublist = fruits.subList(0, 2);
    assertEquals("子列表中的水果数量意外，应该是2", 2, fruitsSublist.size());

    assertEquals("索引 0 处的水果应该是 Apple", "Apple", fruitsSublist.get(0));
    assertEquals("索引 1 处的水果应该是 Orange", "Orange", fruitsSublist.get(1));
}
```

3.10. 使用列表元素创建数组

我们可以使用方法 T[] toArray(T[] a) 来创建包含列表元素的数组：

```java
@Test
public void givenAFruitList_whenToArray_thenWeGetAnArray(){
    List fruits = new ArrayList();

    fruits.add("Apple");
    fruits.add("Orange");
    fruits.add("Banana");

    String[] fruitsArray = fruits.toArray(new String[0]);
    assertEquals("数组中的水果数量意外，应该是3", 3, fruitsArray.length);

    assertEquals("索引 0 处的水果应该是 Apple", "Apple", fruitsArray[0]);
    assertEquals("索引 1 处的水果应该是 Orange", "Orange", fruitsArray[1]);
    assertEquals("索引 2 处的水果应该是 Banana", "Banana", fruitsArray[2]);
}
```

4. List 实现

让我们看看 Java 中 List 接口最常用的实现。

4.1. ArrayList

ArrayList 是 List 接口的可调整大小数组实现。它实现了所有可选操作，并允许所有元素，包括 null。这个类大致相当于 Vector，除了它是不同步的。

这是 List 接口最广泛使用的实现。

4.2. CopyOnWriteArrayList

CopyOnWriteArrayList 是 ArrayList 的线程安全变体。这个类的所有更改操作（添加、设置等）都会创建底层数组的新副本。

这个实现因其固有的线程安全能力而被使用。

4.3. LinkedList

LinkedList 是 List 和 Deque 接口的双向链表实现。它实现了所有可选操作，并允许所有元素（包括 null）。

4.4. 抽象列表实现

我们这里有两个抽象实现，它们为 List 接口提供了骨架实现。这些帮助最小化了扩展和自定义 List 所需的工作量：

- AbstractList - 保持一个“随机访问”数据存储（如数组）用于其内部状态
- AbstractSequentialList - 保持一个“顺序访问”数据存储（如链表）用于其内部状态

4.5. 其他具体列表实现

这里还有两个值得讨论的具体实现：

- Vector - 实现了一个可增长的对象数组。像数组一样，它包含可以使用整数值索引访问的组件。这个类是同步的。因此，如果不需要线程安全的实现，建议使用 ArrayList 代替 Vector。
- Stack - 表示一个后进先出（LIFO）的对象栈。它扩展了 Vector 类，并提供了五个额外的操作，允许将向量视为栈。

Java 还提供了几个特定的 List 实现，它们的行为类似于上面讨论的实现之一。

5. 结论

在本文中，我们探讨了 Java 的 List 接口及其实现。当我们只关心元素顺序并允许重复时，列表是我们首选的集合类型。由于它们内部处理增长，它们比数组更受青睐。

像往常一样，代码片段可以在 GitHub 上找到。