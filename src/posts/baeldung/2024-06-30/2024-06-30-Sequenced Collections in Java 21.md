---
date: 2023-09-01
category:
  - Java
  - 编程
tag:
  - Java 21
  - 序列化集合
head:
  - - meta
    - name: keywords
      content: Java 21, 序列化集合, 集合框架, 编程
---
# Java 21 中的序列化集合

## 1. 概述

**Java 21** 预计将在 2023 年 9 月发布，作为 Java 17 之后的下一个长期支持版本。在新特性中，我们可以发现对 Java 的集合框架进行了更新，称为 **序列化集合**。

序列化集合提案是一个引人注目的增强功能，承诺重新定义开发人员与集合的交互方式。这个特性在现有的层级结构中注入了新的接口，提供了一种无缝的机制，使用内置的默认方法访问集合的第一个和最后一个元素。此外，它还提供了支持获取集合的反向视图。

在本文中，我们将探讨这个新增强功能、它的潜在风险以及它带来的优点。

## 2. 动机

集合具有明确访问顺序的通用超类型缺失一直是问题和抱怨的反复来源。此外，**缺乏统一的方法来访问首尾元素以及以相反顺序迭代** 一直是 Java 集合框架的一个持续限制。

我们可以以列表（List）和双端队列（Deque）为例：它们都定义了访问顺序，但它们的公共超类型，集合（Collection），并没有。类似地，集合（Set）不定义访问顺序，但有些子类型，如有序集合（SortedSet）和链接哈希集合（LinkedHashSet），却定义了。因此，对访问顺序的支持分散在类型层级中，与访问顺序相关的操作要么不一致要么缺失。

为了说明不一致性，让我们比较不同集合类型访问首尾元素的方式：

| | 访问第一个元素 | 访问最后一个元素 |
| --- | --- | --- |
| **列表** | list.get(0) | list.get(list.size() – 1) |
| **双端队列** | deque.getFirst() | deque.getLast() |
| **有序集合** | sortedSet.first() | sortedSet.last() |
| **链接哈希集合** | linkedHashSet.iterator().next() | // 缺失 |

尝试获取集合的反向视图时也会出现同样的情况。当从第一个元素到最后一个元素迭代集合的元素时，遵循了一个清晰和一致的模式，但以相反的方向这样做则面临挑战。

例如，处理可导航集合（NavigableSet）时，我们可以使用 descendingSet() 方法。对于双端队列，descendingIterator() 方法很有用。类似地，当处理列表时，listIterator() 方法效果良好。然而，对于链接哈希集合来说并非如此，因为它不支持反向迭代。

**所有这些差异导致了代码库的碎片化和复杂性，使得在 API 中表达某些有用的概念变得具有挑战性。**

## 3. 新的 Java 集合层级结构

这个新特性为序列化集合、序列化集合和序列化映射引入了三个新的接口，它们被添加到现有的集合层级结构中：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/new-hierarchy-diagram.png)

这张图片是 **JEP 431: Sequenced Collections** 的官方文档的一部分（来源）。

### 3.1. _SequencedCollection_

序列化集合是一个集合，其元素具有明确的访问顺序。新的 SequencedCollection 接口提供了在集合两端添加、检索或删除元素的方法，以及获取集合的反向有序视图的方法。

```
interface SequencedCollection```````<E>``````` extends Collection```````<E>``````` {
    // 新方法
    SequencedCollection```````<E>``````` reversed();

    // 从 Deque 升级的方法
    void addFirst(E);
    void addLast(E);

    E getFirst();
    E getLast();

    E removeFirst();
    E removeLast();
}
```

除了 reversed() 方法外，所有方法都是默认方法，提供了默认实现，并从 Deque 升级而来。reversed() 方法提供了原始集合的反向顺序视图。此外，对原始集合的任何修改都会在反向视图中可见。

add*() 和 remove*() 方法是可选的，在默认实现中抛出 UnsupportedOperationException，主要用于支持不可修改的集合和已经定义了排序顺序的集合的情况。get*() 和 remove*() 方法如果集合为空，则抛出 NoSuchElementException。

### 3.2. _SequencedSet_

序列化集合可以定义为一个特殊的集合，它作为 SequencedCollection 运行，确保没有重复元素。SequencedSet 接口扩展了 SequencedCollection 并覆盖了它的 reversed() 方法。唯一的区别是 SequencedSet.reversed() 的返回类型是 SequencedSet。

```
interface SequencedSet```````<E>``````` extends Set```````<E>```````, SequencedCollection```````<E>``````` {
    // 协变覆盖
    SequencedSet```````<E>``````` reversed();
}
```

### 3.3. _SequencedMap_

序列化映射是一个映射，其条目具有明确的访问顺序。SequencedMap 不扩展 SequencedCollection 并提供自己的方法来操作集合两端的元素。

```
interface SequencedMap```````<K, V>``````` extends Map```````<K, V>``````` {
    // 新方法
    SequencedMap```````<K, V>``````` reversed();
    SequencedSet`<K>` sequencedKeySet();
    SequencedCollection`<V>` sequencedValues();
    SequencedSet<Entry```````<K, V>```````> sequencedEntrySet();

    V putFirst(K, V);
    V putLast(K, V);

    // 从 NavigableMap 升级的方法
    Entry```````<K, V>``````` firstEntry();
    Entry```````<K, V>``````` lastEntry();
    Entry```````<K, V>``````` pollFirstEntry();
    Entry```````<K, V>``````` pollLastEntry();
}
```

与 SequencedCollection 类似，put*() 方法对于不可修改的映射或已经定义了排序顺序的映射会抛出 UnsupportedOperationException。此外，在空映射上调用从 NavigableMap 升级的任一方法会导致抛出 NoSuchElementException。

## 4. 风险

新接口的引入不应该影响仅使用集合实现的代码。然而，如果在我们的代码库中定义了自定义集合类型，可能会出现几种冲突：

- **方法命名**：新引入的方法可能会与现有类中的方法冲突。例如，如果我们有一个自定义的 List 接口实现，它已经定义了一个 getFirst() 方法，但返回类型与 SequencedCollection 中定义的 getFirst() 不同，那么在升级到 Java 21 时，它将创建源代码不兼容。
- **协变覆盖**：List 和 Deque 都提供了 reversed() 方法的协变覆盖，一个返回 List，另一个返回 Deque。因此，任何同时实现这两个接口的自定义集合在升级到 Java 21 时都会导致编译时错误，因为编译器无法选择一个而不是另一个。

JDK-8266572 报告包含了不兼容性风险的完整分析。

## 5. 结论

总之，**序列化集合** 标志着 Java 集合向前迈出了重要的一步。通过解决长期以来对具有明确访问顺序的统一处理方式的需求，Java 使开发人员能够更高效、更直观地工作。新接口建立了更清晰的结构和一致的行为，从而产生了更强大、更易读的代码。

如常，源代码可在 GitHub 上获取。