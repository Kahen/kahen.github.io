---
date: 2022-04-01
category:
  - Java
  - Collections
tag:
  - HashSet
  - sort
head:
  - - meta
    - name: keywords
      content: Java, Collections, HashSet, sort
------
# Java中对HashSet进行排序 | Baeldung

## 1. 概述

_HashSet_ 是来自 _java.util_ 包的集合类。此类继承自 _AbstractSet_ 类并实现了 _Set_ 接口。此外，_HashSet_ 不保留元素的顺序，因此需要找到对这些元素进行排序的方法。

在这个快速教程中，**我们将学习多种对 _HashSet_ 元素进行排序的技术**。

## 2. 使用 _Collections.sort()_ 方法

_Collections.sort()_ 方法对实现 _java.util.List_ 接口的对象集合进行排序。因此，我们可以将我们的 _HashSet_ 转换为 _List_，然后使用 _Collections.sort()_ 进行排序：

```
HashSet`````<Integer>````` numberHashSet = new HashSet<>();
numberHashSet.add(2);
numberHashSet.add(1);
numberHashSet.add(4);
numberHashSet.add(3);

// 将HashSet转换为arraylist
ArrayList arrayList = new ArrayList(numberHashSet);

// 对列表进行排序
Collections.sort(arrayList);

assertThat(arrayList).containsExactly(1, 2, 3, 4);
```

在上面的例子中，我们首先将 _HashSet_ 中的元素复制到 _ArrayList_ 中。然后，我们将 _ArrayList_ 作为 _Collections.sort()_ 方法的参数。除了 _ArrayList_，我们还可以使用 _LinkedList_ 或 _Vector_。

## 3. 使用 _TreeSet_

使用这种方法，我们将 _HashSet_ 转换为 _TreeSet_，它与 _HashSet_ 类似，只是它将元素存储在升序中。因此，**当 _HashSet_ 转换为 _TreeSet_ 时，_HashSet_ 元素会被排序**：

```
HashSet`````<Integer>````` numberHashSet = new HashSet<>();
numberHashSet.add(2);
numberHashSet.add(1);
numberHashSet.add(4);
numberHashSet.add(3);

TreeSet`````<Integer>````` treeSet = new TreeSet<>();
treeSet.addAll(numberHashSet);

assertThat(treeSet).containsExactly(1, 2, 3, 4);
```

我们可以看到，使用 _TreeSet_ 对 _HashSet_ 进行排序非常简单。我们只需要使用 _HashSet_ 列表作为参数创建一个 _TreeSet_ 实例。

## 4. 使用 _stream().sorted()_ 方法

使用 Stream API 的 _stream().sorted()_ 方法对 _HashSet_ 进行排序是一种简洁的方式。这个 API 在 Java 8 中引入，允许我们对一组元素执行函数式操作。此外，它可以从不同的集合中获取对象，并根据我们使用的管道方法以所需的方式显示它们。

在我们的示例中，**我们将使用** **_stream().sorted()_ 方法，它返回一个元素按特定顺序排序的 _Stream_**。需要注意的是，由于原始的 _HashSet_ 保持不变，我们需要将排序结果保存到一个新的 _Collection_ 中。我们将使用 _collect()_ 方法将数据存储回一个新的 _HashSet_：

```
HashSet`````<Integer>````` numberHashSet = new HashSet<>();
numberHashSet.add(200);
numberHashSet.add(100);
numberHashSet.add(400);
numberHashSet.add(300);

HashSet`````<Integer>````` sortedHashSet = numberHashSet.stream()
  .sorted()
  .collect(Collectors.toCollection(LinkedHashSet::new));

assertThat(sortedHashSet).containsExactly(100, 200, 300, 400);
```

我们应该注意，当我们使用不带参数的 _stream()_ ._ _sorted()_ 方法时，它会按照自然顺序对 _HashSet_ 进行排序。我们也可以重载它并使用比较器来定义自定义排序顺序。

## 5. 结论

在本文中，我们讨论了使用三种方式在 Java 中对 _HashSet_ 进行排序：使用 _Collections.sort()_ 方法、使用 _TreeSet_ 和使用 _stream().sorted()_ 方法。

如常，代码片段可在 GitHub 上获取。