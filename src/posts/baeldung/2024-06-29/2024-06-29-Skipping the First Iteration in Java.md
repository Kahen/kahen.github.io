---
date: 2023-09-01
category:
  - Java
  - Programming
tag:
  - Java
  - Loop
  - Stream API
head:
  - - meta
    - name: keywords
      content: Java, Loop, Skip, First Element, Stream API
---
# Java中跳过首次迭代的方法

迭代是编程的基石，它使开发者能够遍历并轻松地操作数据结构。然而，在某些情况下，我们可能需要在遍历这些集合的同时跳过第一个元素。在本教程中，我们将探索使用循环和Stream API跳过第一个元素的各种方法。

### 2.1. For循环
跳过第一个元素的最简单方式是使用for循环，并将计数器变量从1而不是0开始。这种方法最适合支持索引访问的集合，如ArrayList和简单数组：

```java
void skippingFirstElementInListWithForLoop(List````<String>```` stringList) {
    for (int i = 1; i < stringList.size(); i++) {
        process(stringList.get(i));
    }
}
```

### 2.2. While循环
另一种方式是使用while循环以及Iterator。我们可以手动推进迭代器以跳过第一个元素：

```java
void skippingFirstElementInListWithWhileLoop(List````<String>```` stringList) {
    Iterator````<String>```` iterator = stringList.iterator();
    if (iterator.hasNext()) {
        iterator.next();
    }
    while (iterator.hasNext()) {
        process(iterator.next());
    }
}
```

### 2.3. Stream API
Java 8引入了Stream API，它提供了一种更声明性的方式来操作集合。为了跳过第一个元素，我们可以使用skip()方法：

```java
void skippingFirstElementInListWithStreamSkip(List````<String>```` stringList) {
    stringList.stream().skip(1).forEach(this::process);
}
```

### 2.4. 使用subList()
在列表中跳过第一个元素的另一种方式是使用subList()方法。此方法返回列表指定fromIndex（含）和toIndex（不含）之间的部分视图。当我们将其与for-each循环配对时，我们可以轻松地跳过第一个元素：

```java
void skippingFirstElementInListWithSubList(List````<String>```` stringList) {
    for (final String element : stringList.subList(1, stringList.size())) {
        process(element);
    }
}
```

### 2.5. 其他方法
尽管只有少数基本方法可以迭代集合，我们可以组合和修改它们以获得更多变化。由于这些变化没有实质性的不同，我们在这里列出它们以展示可能的方法并激发实验。

## 3. 结论
虽然Java提供了不同的方式在迭代集合时跳过第一个元素，但选择正确方法的主要标准是代码的清晰度。因此，我们应该选择两种简单且最明确的方法是简单的for循环或stream.skip()。其他方法更复杂，包含更多的移动部件，如果可能的话应该避免使用。

如往常一样，本文的示例可以在GitHub上找到。