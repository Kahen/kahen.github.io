---
date: 2024-07-06
category:
  - Java
  - Concurrency
tag:
  - ArrayBlockingQueue
  - LinkedBlockingQueue
head:
  - - meta
    - name: keywords
      content: Java, BlockingQueue, ArrayBlockingQueue, LinkedBlockingQueue, concurrency, thread safety
---

# Java中的ArrayBlockingQueue与LinkedBlockingQueue对比

1. 概述

Java的_BlockingQueue_接口表示一个线程安全的队列。如果队列满了，尝试向队列中添加元素的线程会被阻塞。如果队列为空，尝试从队列中取出元素的线程也会被阻塞。

BlockingQueue有多种实现，如_ArrayBlockingQueue_、_LinkedBlockingQueue_、_SynchronousQueue_、_PriorityBlockingQueue_。

在本教程中，我们将探讨_ArrayBlockingQueue_和_LinkedBlockingQueue_之间的差异。

_ArrayBlockingQueue_是一个有界队列。它内部使用数组。在创建实例时，我们可以指定数组的大小。

下面代码片段展示了如何创建一个_ArrayBlockingQueue_对象。我们指定内部数组的大小为_10_：

```
int INIT_CAPACITY = 10;

BlockingQueue``<String>`` arrayBlockingQueue = new ArrayBlockingQueue<>(INIT_CAPACITY, true);
```

如果我们在队列已满的情况下插入超过定义容量的元素，那么添加操作将抛出_IllegalStateException_。同样，如果我们将初始大小设置为小于_1_，我们将得到_IllegalArgumentException_。

**这里的第二个参数代表公平性策略。**我们可以选择设置公平性策略以保持阻塞的生产者和消费者线程的顺序。它允许按FIFO顺序访问队列的阻塞线程。因此，首先进入等待状态的线程将首先获得访问队列的机会。这有助于避免线程饥饿。

3. _LinkedBlockingQueue_

_LinkedBlockingQueue_是一个可选有界的_BlockingQueue_实现。它由链接节点支持。

**在创建实例时，我们也可以指定容量。如果没有指定，则将_Integer.MAX_VALUE_设置为容量。**

插入元素时，链接节点会动态创建。

让我们看看如何创建一个_LinkedBlockingQueue_：

```
BlockingQueue``<String>`` linkedBlockingQueue = new LinkedBlockingQueue<>();
```

4. _ArrayBlockingQueue_与_LinkedBlockingQueue_的比较

尽管_ArrayBlockingQueue_和_LinkedBlockingQueue_都是_BlockingQueue_的实现，并且以FIFO顺序存储元素，但它们之间存在某些差异。现在我们将看看这些差异：

| 特性 | ArrayBlockingQueue | LinkedBlockingQueue |
| --- | --- | --- |
| 实现 | 由数组支持 | 使用链接节点 |
| 队列大小 | 它是一个有界队列。因此，在创建时必须指定初始容量。 | 不必须指定大小。 |
| 公平性策略 | 可以在其中设置公平性策略 | 没有设置公平性策略的选项 |
| 锁的数量 | 使用一个_ReentrantLock_。同一把锁用于put和take操作。 | 为读写操作使用单独的_ReentrantLock_。这防止了生产者和消费者线程之间的争用。 |
| 内存空间 | 由于必须在其中指定初始容量，我们可能会分配比所需更多的空间。 | 通常不预先分配节点。因此，其内存占用与其大小相匹 |

5. 结论

在本文中，我们了解了_ArrayBlockingQueue_和_LinkedBlockingQueue_之间的差异。_ArrayBlockingQueue_由数组支持，而_LinkedBlockingQueue_由链接节点支持。我们还涉及了_ArrayBlockingQueue_中存在的公平性策略的额外特性，以及两种队列的锁定机制和内存占用。

像往常一样，示例的源代码可以在GitHub上找到。

OK