---
date: 2024-06-24
category:
  - Java
  - ListIterator
tag:
  - Java
  - ListIterator
  - 编程
head:
  - - meta
    - name: keywords
      content: Java, ListIterator, 编程技巧
---
# Java中重置ListIterator到列表的第一个元素

当我们使用Java进行编程时，高效地遍历集合是一个常见的需求。在处理列表时，_ListIterator_接口提供了一个强大的工具，用于双向遍历。然而，在某些情况下，将_ListIterator_重置到列表的第一个元素变得必要。

在本教程中，我们将探讨在Java中将_ListIterator_重置到列表开头的各种方法。

## 2. 问题介绍

像往常一样，我们通过一个例子来理解问题。

假设我们有一个字符串列表：

```java
List```<String>``` MY_LIST = List.of("A", "B", "C", "D", "E", "F", "G");
```

然后，我们可以通过`MY_LIST.listIterator()`获得一个_ListIterator_，并调用_ListIterator_的`next()`方法来遍历列表。

有时，我们可能想要通过**让_ListIterator_再次指向列表中第一个元素之前的位置**来重置_ListIterator_对象，就像它刚创建时一样。

接下来，我们将查看解决这个问题的不同方法。此外，我们将利用单元测试断言来验证每种解决方案是否给出了预期的结果。

## 3. 创建新的_ListIterator_

我们知道，**当我们创建一个新的_ListIterator_对象时，它指向目标列表的开头**。因此，重置一个_ListIterator_实例的最简单方法就是重新赋值给一个新的_ListIterator_。

让我们创建一个测试并验证这个想法是否如预期工作：

```java
ListIterator```<String>``` lit = MY_LIST.listIterator();
lit.next();
lit.next();
lit.next();
lit.next();

lit = MY_LIST.listIterator();

assertFalse(lit.hasPrevious());
assertEquals("A", lit.next());
```

正如上面的测试所示，在我们创建了_ListIterator_ `lit` 之后，我们调用了四次 `lit.next()` 方法。当我们想要重置 `lit` 时，我们创建了一个新的_ListIterator_实例并重新赋值给 `lit`。

然后，我们通过两个断言来验证 `lit` 是否成功重置：

- `lit.hasPrevious()` 返回 `false`
- `lit.next()` 应该是 `MY_LIST` 中的第一个元素（"A"）

如果我们运行这个测试，它会通过。因此，创建一个新的_ListIterator_解决了我们的问题。

## 4. 反向迭代到列表的开头

创建一个新的_ListIterator_可以快速导航到列表的开头。然而，我们将拥有一个新的_ListIterator_对象。

有时，我们想要保留原始的_ListIterator_对象，并将它的指针移回目标列表的开头。如果是这种情况，我们可以利用_ListIterator_的双向迭代特性来**反向迭代到列表的开头**。

接下来，让我们创建一个测试来看看如何实现这一点：

```java
ListIterator```<String>``` lit = MY_LIST.listIterator();
lit.next();
lit.next();
lit.next();
lit.next();

while (lit.hasPrevious()) {
    lit.previous();
}

assertFalse(lit.hasPrevious());
assertEquals("A", lit.next());
```

正如我们所看到的，我们通过一个`while`循环来应用反向迭代。

如果我们运行测试，它会通过。所以，它做到了。

值得注意的是，由于这种方法是从当前位置反向迭代到列表的开头，**如果列表中的元素数量很大，这可能会很慢**。

## 5. 结论

在本文中，我们探讨了两种将_ListIterator_重置到列表开头的方法。

如果需要保留原始的_ListIterator_实例，我们可以反向迭代到列表的头部。否则，创建一个新的_ListIterator_将是最直接的解决方案。

像往常一样，示例的完整源代码可以在GitHub上找到。