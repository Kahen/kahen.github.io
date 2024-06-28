---
date: 2022-04-01
category:
  - Java
  - Collections Framework
tag:
  - Vector
  - ArrayList
head:
  - - meta
    - name: keywords
      content: Java Vector, Collections Framework, growable array
---
# Java中向量类的介绍

向量类是一个可增长的对象数组的线程安全实现。它实现了java.util.List接口，并且是Java集合框架的一部分。虽然它与ArrayList类似，但这些类在实现上有着显著的差异。

在本教程中，我们将探索向量类及其一些最常见的操作和方法。

向量类被设计为一个可以根据应用程序需求扩展或收缩的动态数组。因此，我们可以使用索引访问向量中的对象。此外，它维护插入顺序并存储重复元素。

每个向量都通过跟踪容量和capacityIncrement来增强其存储处理。容量不过是向量的大小。当我们向向量中添加元素时，向量的大小会增加。因此，容量始终保持等于或大于向量的大小。

每当向量的长度达到其容量时，就会计算新的长度：
```
newLength = capacityIncrement == 0 ? currentSize * 2 : currentSize + capacityIncrement
```

与ArrayList类似，向量类的迭代器也是快速失败的。如果我们在迭代向量时尝试修改它，它会抛出ConcurrentModificationException。然而，我们可以通过迭代器的add()或remove()方法来结构性地修改向量。

让我们看看如何创建向量以及在其上执行各种操作。

### 3.1. 创建向量
我们可以使用构造函数创建向量实例。有四种不同类型的向量构造函数。

第一种是默认构造函数，它创建一个初始容量为10且标准capacityIncrement为0的空向量：
```
Vector`````````<T>````````` vector = new Vector`````````<T>`````````();
```

我们可以通过指定其初始大小（容量）来创建一个空的向量。在这种情况下，其capacityIncrement也设置为0：
```
Vector`````````<T>````````` vector = new Vector`````````<T>`````````(int size);
```

还有另一个构造函数，我们可以使用它来指定初始容量和capacityIncrement来创建一个空的向量：
```
Vector`````````<T>````````` vector = new Vector`````````<T>`````````(int size, int capacityIncrement);
```

最后，我们可以通过将另一个集合传递给构造函数来构建一个向量。结果的向量包含指定集合的所有元素：
```
Vector`````````<T>````````` vector = new Vector`````````<T>`````````(Collection`````````<T>````````` collection);
```

### 3.2. 向向量中添加元素
让我们创建一个返回向量的方法。我们将使用此方法进行后续操作：

```
Vector`````````<String>````````` getVector() {
    Vector`````````<String>````````` vector = new Vector`````````<String>`````````();
    vector.add("Today");
    vector.add("is");
    vector.add("a");
    vector.add("great");
    vector.add("day!");

    return vector;
}
```

在这里，我们使用默认构造函数创建了一个空的字符串向量，并添加了一些字符串。

根据需要，我们可以在向量的末尾或特定索引处添加元素。为此，我们可以使用重载的add()方法来满足各种需求。

现在，让我们将元素添加到向量的特定索引：
```
vector.add(2, "not"); // 在索引2处添加"not"
assertEquals("not", vector.get(2)); // 向量 = [Today, is, not, a, great, day!]
```

在这里，我们使用向量类的add(int index, E element)方法将字符串“not”添加到索引2。请注意，它将所有指定索引后的元素向右移动一个位置。因此，字符串“not”被添加在字符串“is”和“a”之间。

同样，我们可以使用addAll(Collection c)方法将所有元素添加到向量中。使用此方法，我们可以将集合中的所有元素以与集合相同的顺序添加到向量的末尾：
```
ArrayList`````````<String>````````` words = new ArrayList<>(Arrays.asList("Baeldung", "is", "cool!"));
vector.addAll(words);

assertEquals(9, vector.size());
assertEquals("cool!", vector.get(8));
```

执行上述代码后，如果打印向量，我们将得到以下结果：
```
[Today, is, not, a, great, day!, Baeldung, is, cool!]
```

### 3.3. 更新元素
我们可以使用set()方法更新向量中的元素。set()方法用新元素替换指定索引处的元素，同时返回被替换的元素。因此，它接受两个参数——要替换的元素的索引和新元素：
```
Vector`````````<String>````````` vector = getVector();
assertEquals(5, vector.size());
vector.set(3, "good");
assertEquals("good", vector.get(3));
```

### 3.4. 移除元素
我们可以使用remove()方法从向量中移除元素。它根据各种需求被重载。因此，我们可以移除特定元素或特定索引处的元素，或移除向量中的所有元素。让我们看几个例子。

如果我们向remove()方法传递一个对象，将删除它的第一次出现：
```
Vector`````````<String>````````` vector = getVector();
assertEquals(5, vector.size());

vector.remove("a");
assertEquals(4, vector.size()); // 向量 = [Today, is, great, day!]
```

同样，如果我们现在向上述remove()方法传递2，它将删除索引2处的元素great：
```
vector.remove(2);
assertEquals("day!", vector.get(2));
```

我们应该注意，所有被删除元素右侧的元素都会向左移动一个位置。此外，如果我们提供的索引超出了向量的范围，即index `< 0或index >`= size()，remove()方法将抛出ArrayIndexOutOfBoundsException。

最后，让我们移除向量中的所有元素：
```
vector.removeAll();
assertEquals(0, vector.size());
```

### 3.5. 获取元素
我们可以使用get()方法获取向量中特定索引处的元素：
```
Vector`````````<String>````````` vector = getVector();

String fourthElement = vector.get(3);
assertEquals("great", fourthElement);
```

**get()方法也会抛出ArrayIndexOutOfBoundsException，如果我们提供的索引超出了向量的范围。**

### 3.6. 遍历向量
我们可以通过多种方式遍历向量。然而，最常见的方式之一是for-each循环：
```
Vector`````````<String>````````` vector = getVector();

for(String string : vector) {
    System.out.println(string);
}
```

我们还可以使用forEach()方法遍历向量，特别是当我们想要对每个元素执行某个操作时：
```
Vector`````````<String>````````` vector = getVector();
vector.forEach(System.out::println);
```

## 4. 使用向量的情况
向量的首要和明显用途是当我们需要一个可增长的对象集合时。如果我们不确定增长集合的大小，但我们知道我们将多频繁地添加或删除元素，那么我们可能更倾向于使用向量。在这种情况下，我们可以根据情况设置capacityIncrement。

然而，由于向量是同步的，我们更倾向于在多线程应用程序中使用它。在单线程应用程序中，与向量相比，ArrayList的运行速度要快得多。此外，我们可以使用Collections.synchronizedList()显式同步ArrayList。

## 5. 结论
在本文中，我们查看了Java中的向量类。我们还探讨了如何创建向量实例以及如何使用不同的方法添加、查找或删除元素。

如往常一样，本文的源代码可在GitHub上获得。