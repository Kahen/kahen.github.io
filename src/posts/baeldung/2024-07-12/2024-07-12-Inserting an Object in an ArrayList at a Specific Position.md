---
date: 2022-11-01
category:
  - Java
  - Collections
tag:
  - ArrayList
  - Java Collections
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, Insert, Object, Specific Position
---

# 在特定位置向ArrayList中插入对象

在本教程中，我们将学习如何在特定位置向ArrayList中插入一个对象。

## 2. 示例

如果我们想在ArrayList中的特定位置添加一个元素，我们可以使用通过List``<E>``接口实现提供的`add(int index, E element)`方法。这个方法允许我们在特定索引处添加一个元素。

如果索引超出范围（索引`<0或索引>`size()），它还可能抛出一个`IndexOutOfBoundsException`。这意味着如果我们的ArrayList中只有4个元素，我们不能使用它在位置4添加项目，因为我们从0开始计数。在这里，我们必须使用标准的`add(E e)`方法。

首先，我们将创建一个新的ArrayList并添加四个元素：

```java
List`<Integer>` integers = new ArrayList<>();
integers.add(5);
integers.add(6);
integers.add(7);
integers.add(8);
System.out.println(integers);
```

这将产生以下结果：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/img_637528671724b.svg)

现在，如果我们在索引1处添加另一个元素：

```java
integers.add(1, 9);
System.out.println(integers);
```

ArrayList内部首先会移动从给定索引开始的对象：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/img_637528683cc07.svg)

这是因为ArrayList是一个可增长的数组，如果需要，它会自巋调整容量：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/img_63752869916a0.svg)

然后在给定索引处添加新项目：

![img](https://www.baeldung.com/wp-content/uploads/2022/11/img_6375286ad6a38.svg)

在特定索引处添加将导致ArrayList的平均操作性能为O(n/2)。例如，LinkedList的平均复杂度为O(n/4)，如果索引为0，则为O(1)。因此，如果我们严重依赖在特定位置添加元素，我们需要更仔细地看看LinkedList。

我们还可以看到元素的顺序不再正确。当我们手动在特定位置添加项目时，这通常是我们想要实现的。否则，我们可以使用`integers.sort(Integer::compareTo)`再次对ArrayList进行排序，或者实现我们自己的Comparator。

## 3. 结论

在本文中，我们讨论了`add(int index, E element)`方法，以便我们可以在ArrayList``<E>``中的特定位置添加新元素。我们必须注意保持ArrayList的索引界限内，并确保我们允许正确的对象。

文中提到的所有代码片段都可以在GitHub上找到。