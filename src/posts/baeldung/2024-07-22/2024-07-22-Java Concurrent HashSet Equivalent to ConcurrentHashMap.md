---
date: 2022-04-01
category:
  - Java
  - Concurrency
tag:
  - Java
  - ConcurrentHashMap
  - HashSet
  - Thread Safety
head:
  - - meta
    - name: keywords
      content: Java, ConcurrentHashMap, HashSet, Thread Safety, Thread-Safe Set
---
# Java ConcurrentHashMap 与线程安全的 HashSet 等价实现

在本教程中，我们将探讨创建线程安全的 HashSet 实例的可能性，以及 HashSet 的 ConcurrentHashMap 等价物是什么。此外，我们将查看每种方法的优缺点。

## 2. 使用 ConcurrentHashMap 工厂方法实现线程安全的 HashSet

首先，我们将查看 ConcurrentHashMap 类公开的静态 newKeySet() 方法。基本上，此方法返回一个遵守 java.util.Set 接口的实例，并允许使用标准方法如 add()，contains() 等。

可以这样简单地创建：

```java
Set`````<Integer>````` threadSafeUniqueNumbers = ConcurrentHashMap.newKeySet();
threadSafeUniqueNumbers.add(23);
threadSafeUniqueNumbers.add(45);
```

**此外，返回的 Set 性能与 HashSet 类似，因为两者都使用基于哈希的算法实现。** 而且，由于实现使用了 ConcurrentHashMap，同步逻辑带来的额外开销也很小。

最后，缺点是该方法**仅从 Java 8 开始存在**。

## 3. 使用 ConcurrentHashMap 实例方法实现线程安全的 HashSet

到目前为止，我们已经查看了 ConcurrentHashMap 的静态方法。接下来，我们将处理 ConcurrentHashMap 用于创建线程安全 Set 实例的实例方法。有两种方法可用，newKeySet() 和 newKeySet(defaultValue)，它们彼此略有不同。

**两种方法都创建了一个与原始映射链接的 Set。** 换句话说，每次我们向原始 ConcurrentHashMap 添加新条目时，Set 将接收该值。接下来，让我们看看这两种方法之间的区别。

### 3.1. newKeySet() 方法

如上所述，newKeySet() 公开了一个包含原始映射所有键的 Set。此方法与 newKeySet(defaultValue) 的关键区别在于当前方法不支持向 Set 添加新元素。**因此，如果我们尝试调用如 add() 或 addAll() 等方法，我们将得到一个 UnsupportedOperationException。**

尽管像 remove(object) 或 clear() 这样的操作按预期工作，但我们需要意识到 Set 上的任何更改都将反映在原始映射中：

```java
ConcurrentHashMap``<Integer, String>`` numbersMap = new ConcurrentHashMap<>();
Set`````<Integer>````` numbersSet = numbersMap.keySet();

numbersMap.put(1, "One");
numbersMap.put(2, "Two");
numbersMap.put(3, "Three");

System.out.println("Map before remove: " + numbersMap);
System.out.println("Set before remove: " + numbersSet);

numbersSet.remove(2);

System.out.println("Set after remove: " + numbersSet);
System.out.println("Map after remove: " + numbersMap);
```

上面的代码输出如下：

```
Map before remove: {1=One, 2=Two, 3=Three}
Set before remove: [1, 2, 3]

Set after remove: [1, 3]
Map after remove: {1=One, 3=Three}
```

### 3.2. newKeySet(defaultValue) 方法

让我们看看另一种从映射中的键创建 Set 的方法。**与上面提到的相比，newKeySet(defaultValue) 返回一个 Set 实例，该实例通过调用 set 上的 add() 或 addAll() 支持添加新元素。**

进一步查看作为参数传递的默认值，这用作通过 add() 或 addAll() 方法添加到映射中的每个新条目的值。以下示例展示了它的工作原理：

```java
ConcurrentHashMap``<Integer, String>`` numbersMap = new ConcurrentHashMap<>();
Set`````<Integer>````` numbersSet = numbersMap.keySet("SET-ENTRY");

numbersMap.put(1, "One");
numbersMap.put(2, "Two");
numbersMap.put(3, "Three");

System.out.println("Map before add: " + numbersMap);
System.out.println("Set before add: " + numbersSet);

numbersSet.addAll(asList(4, 5));

System.out.println("Map after add: " + numbersMap);
System.out.println("Set after add: " + numbersSet);
```

上面的代码输出如下：

```
Map before add: {1=One, 2=Two, 3=Three}
Set before add: [1, 2, 3]
Map after add: {1=One, 2=Two, 3=Three, 4=SET-ENTRY, 5=SET-ENTRY}
Set after add: [1, 2, 3, 4, 5]
```

## 4. 使用 Collections 实用类实现线程安全的 HashSet

让我们使用 java.util.Collections 中可用的 synchronizedSet() 方法来创建一个线程安全的 HashSet 实例：

```java
Set`````<Integer>````` syncNumbers = Collections.synchronizedSet(new HashSet<>());
syncNumbers.add(1);
```

**在使用这种方法之前，我们需要意识到它比上面讨论的方法效率低。** 基本上，synchronizedSet() 只是将 Set 实例包装在一个同步装饰器中，与 ConcurrentHashMap 实现的低级并发机制相比。

## 5. 使用 CopyOnWriteArraySet 实现线程安全的 Set

创建线程安全 Set 实现的最后方法是 CopyOnWriteArraySet。创建这个 Set 的实例很简单：

```java
Set`````<Integer>````` copyOnArraySet = new CopyOnWriteArraySet<>();
copyOnArraySet.add(1);
```

尽管使用这个类看起来很有吸引力，但我们需要考虑一些严重的性能缺点。在幕后，CopyOnWriteArraySet 使用数组而不是 HashMap 来存储数据。**这意味着像 contains() 或 remove() 这样的操作具有 O(n) 复杂度，而使用由 ConcurrentHashMap 支持的 Set 时，复杂度是 O(1)。**

建议在 Set 大小通常保持较小且只读操作占多数的情况下使用此实现。

## 6. 结论

在本文中，我们看到了创建线程安全 Set 实例的不同可能性，并强调了它们之间的区别。**首先我们看到了 ConcurrentHashMap.newKeySet() 静态方法。当需要线程安全的 HashSet 时，这应该是首选。** 之后我们查看了 ConcurrentHashMap 静态方法和 newKeySet()、newKeySet(defaultValue) 之间的区别。

最后，我们还讨论了 Collections.synchronizedSet() 和 CopyOnWriteArraySet 以及它们的性能缺点。

如常，完整的源代码可在 GitHub 上获得。翻译已经完成，以下是剩余部分：

## 6. 结论

在本文中，我们探讨了创建线程安全的 Set 实例的不同方法，并强调了它们之间的差异。**首先，我们看到了 ConcurrentHashMap.newKeySet() 静态方法。当需要线程安全的 HashSet 时，这应该是首选。** 然后，我们探讨了 ConcurrentHashMap 静态方法和 newKeySet()、newKeySet(defaultValue) 实例方法的区别。

最后，我们也讨论了 Collections.synchronizedSet() 和 CopyOnWriteArraySet 以及它们的性能缺点。

通常，完整的源代码可以在 GitHub 上找到。

OK