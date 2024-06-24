---
date: {2024-06-25}
category:
  - 数据结构
  - Java
tag:
  - 链表
  - 删除操作
head:
  - - meta
    - name: keywords
      content: Java, 链表, 删除最后一个节点, 单向链表, 双向链表
------
# 从链表中移除最后一个节点

数据结构是任何编程语言的重要组成部分。Java在_Collection````<T>````_接口下提供了大多数数据结构。映射（Maps）也被认为是Java集合的一部分，但它们不实现这个接口。

在本教程中，我们将集中讨论链表数据结构。特别是，我们将讨论如何在单向链表中移除最后一个元素。

### 单向链表与双向链表

首先，我们定义一下单向链表和双向链表之间的区别。幸运的是，它们的名字非常具有描述性。双向链表中的每个节点都有指向下一个和前一个节点的引用，除了显而易见的头和尾：

单向链表有一个更简单的结构，只包含关于下一个节点的信息：

根据这些差异，我们在这些数据结构之间有一个权衡。单向链表消耗的空间更少，因为每个节点只包含一个额外的引用。同时，双向链表更方便于逆序遍历节点。**这不仅可能在我们遍历列表时造成问题，也可能在搜索、插入和删除操作中造成问题。**

### 从双向链表中移除最后一个元素

因为双向链表包含有关其前一个邻居的信息，所以操作本身是微不足道的。我们将以Java标准_LinkedList````<T>````._为例。让我们先检查_LinkedList.Node````````<E>````````_：

```java
class Node````````<E>```````` {
    E item;
    LinkedList.Node````````<E>```````` next;
    LinkedList.Node````````<E>```````` prev;

    Node(LinkedList.Node````````<E>```````` prev, E element, LinkedList.Node````````<E>```````` next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}
```

它相当简单，但正如我们所看到的，有两个引用：_next_和_prev_。它们显著简化了我们的工作：

整个过程只需要几行代码，并且可以在常数时间内完成：

```java
private E unlinkLast(Node````````<E>```````` l) {
    // assert l == last && l != null;
    E element = l.item;
    Node````````<E>```````` prev = l.prev;
    l.item = null;
    l.prev = null; // help GC
    last = prev;
    if (prev == null) {
        first = null;
    } else {
        prev.next = null;
    }
    size--;
    modCount++;
    return element;
}
```

### 从单向链表中移除最后一个元素

从单向链表中移除最后一个元素的主要挑战是我们必须更新倒数第二个节点。然而，我们的节点没有向后的引用：

```java
public static class Node````<T>````  {
    private T element;
    private Node````<T>```` next;

    public Node(T element) {
        this.element = element;
    }
}
```

因此，我们必须从开头一直遍历，以确定倒数第二个节点：

链表 单向链表 倒数第二个

代码也会比双向链表更复杂一些：

```java
public void removeLast() {
    if (isEmpty()) {
        return;
    } else if (size() == 1) {
        tail = null;
        head = null;
    } else {
        Node`````<S>````` secondToLast = null;
        Node`````<S>````` last = head;
        while (last.next != null) {
            secondToLast = last;
            last = last.next;
        }
        secondToLast.next = null;
    }
    size--;
}
```

由于我们必须遍历整个列表，操作需要线性时间，如果我们计划将我们的列表用作队列，这不是好事。**一种优化策略是将_secondToLast_节点与_head_和_tail_一起存储：**

```java
public class SinglyLinkedList`````<S>````` {
    private int size;
    private Node`````<S>````` head = null;
    private Node`````<S>````` tail = null;

    // 其他方法
}
```

这不会为我们提供简单的迭代，但至少改善了_removeLast()_方法，使其类似于我们为双向链表看到的那一个。

### 结论

不可能将数据结构分为好和坏。它们只是工具。**因此，每个任务都需要一个特定的数据结构来实现其目标。**

单链表在移除最后一个元素时有一些性能问题，并且在其他操作上也不灵活，但同时，它们消耗的内存更少。双向链表没有限制，但我们为此付出的代价是更多的内存。

理解数据结构的底层实现至关重要，它允许我们为我们的需求选择最佳工具。像往常一样，本教程的所有代码都可以在GitHub上找到。