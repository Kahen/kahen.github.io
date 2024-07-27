---
date: 2022-04-01
category:
  - Java
  - LRU Cache
tag:
  - Java
  - LRU Cache
  - 缓存
  - 算法
head:
  - - meta
    - name: keywords
      content: Java, LRU Cache, 缓存, 算法
---
# 如何在Java中实现LRU缓存

在本教程中，我们将学习LRU缓存，并查看在Java中的一个实现。

最近最少使用（LRU）缓存是一种缓存逐出算法，它按使用顺序组织元素。正如名字所暗示的，在LRU中，使用时间最长的元素将从缓存中被逐出。

例如，如果我们有一个容量为三个项目的缓存：

![img](https://www.baeldung.com/wp-content/uploads/2021/07/Screenshot-from-2021-07-03-14-30-34-1.png)

最初，缓存是空的，我们把元素8放入缓存。元素9和6像以前一样被缓存。但现在，缓存容量已满，要放入下一个元素，我们必须逐出缓存中最近最少使用的元素。

在我们用Java实现LRU缓存之前，了解缓存的一些方面是很好的：

- 所有操作应该以O(1)的顺序运行
- 缓存有有限的大小
- 所有缓存操作必须支持并发
- 如果缓存已满，添加新项目必须调用LRU策略

### 2.1. LRU缓存的结构

现在，让我们思考一个问题，这将有助于我们设计缓存。

**我们如何设计一个可以在常数时间内进行读取、排序（临时排序）和删除元素的数据结构？**

看来要找到这个问题的答案，我们需要深入思考关于LRU缓存及其特性的讨论：

- 实际上，LRU缓存是一种_队列_，如果重新访问一个元素，它会移到逐出顺序的末尾
- 这个队列将具有特定的容量，因为缓存有有限的大小。每当引入一个新元素时，它会被添加到队列的头部。当发生逐出时，它发生在队列的尾部。
- 在缓存中命中数据必须在常数时间内完成，这在_队列_中是不可能的！但是，使用Java的_HashMap_数据结构是可能的
- 最近最少使用的元素的删除必须在常数时间内完成，这意味着在_队列_的实现中，我们将使用_双向链表_而不是_单向链表_或数组

**所以，LRU缓存不过是_双向链表_和_HashMap_的结合，如下所示：**

![img](https://www.baeldung.com/wp-content/uploads/2021/07/Screenshot-from-2021-07-09-02-10-25-1.png)

这个想法是在_映射_上保留键，以便在_队列_中快速访问数据。

### 2.2. LRU算法

LRU算法非常简单！如果_HashMap_中存在键，则是缓存命中；否则，是缓存未命中。

在缓存未命中发生后，我们将遵循两个步骤：

1. 在列表前添加一个新元素。
2. 在_HashMap_中添加一个新条目，并引用列表的头部。

而在缓存命中后，我们将执行两个步骤：

1. 移除命中的元素，将其添加到列表的前面。
2. 使用列表前面的新引用更新_HashMap_。

现在，让我们看看我们如何在Java中实现LRU缓存！

# 3. Java中的实现

首先，我们将定义我们的_Cache_接口：

```java
public interface Cache```````<K, V>``````` {
    boolean set(K key, V value);
    Optional```<V>``` get(K key);
    int size();
    boolean isEmpty();
    void clear();
}
```

现在，我们将定义表示我们缓存的_LRUCache_类：

```java
public class LRUCache```````<K, V>``````` implements Cache```````<K, V>``````` {
    private int size;
    private Map`<K, LinkedListNode``<CacheElement<K,V>```>> linkedListNodeMap;
    private DoublyLinkedList``<CacheElement<K,V>``> doublyLinkedList;

    public LRUCache(int size) {
        this.size = size;
        this.linkedListNodeMap = new HashMap<>(maxSize);
        this.doublyLinkedList = new DoublyLinkedList<>();
    // 其余实现
}
```

我们可以创建一个具有特定大小的_LRUCache_实例。在这个实现中，我们使用_HashMap_集合来存储所有对_LinkedListNode_的引用。

现在，让我们讨论我们的_LRUCache_上的操作。

### 3.1. 放入操作

第一个是_put_方法：

```java
public boolean put(K key, V value) {
    CacheElement```````<K, V>``````` item = new CacheElement```````<K, V>```````(key, value);
    LinkedListNode<CacheElement```````<K, V>```````> newNode;
    if (this.linkedListNodeMap.containsKey(key)) {
        LinkedListNode<CacheElement```````<K, V>```````> node = this.linkedListNodeMap.get(key);
        newNode = doublyLinkedList.updateAndMoveToFront(node, item);
    } else {
        if (this.size() >= this.size) {
            this.evictElement();
        }
        newNode = this.doublyLinkedList.add(item);
    }
    if(newNode.isEmpty()) {
        return false;
    }
    this.linkedListNodeMap.put(key, newNode);
    return true;
}
```

首先，我们在存储所有键/引用的_linkedListNodeMap_中查找键。如果键存在，发生了缓存命中，准备从_DoublyLinkedList_中检索_CacheElement_并将其移到前面。

之后，我们使用新的引用更新_linkedListNodeMap_并将其移到列表的前面：

```java
public LinkedListNode````<T>```` updateAndMoveToFront(LinkedListNode````<T>```` node, T newValue) {
    if (node.isEmpty() || (this != (node.getListReference()))) {
        return dummyNode;
    }
    detach(node);
    add(newValue);
    return head;
}
```

首先，我们检查节点是否不为空。同样，节点的引用必须与列表相同。之后，我们从列表中_detach_节点并将_newValue_添加到列表中。

但如果键不存在，发生了缓存未命中，我们必须将新键放入_linkedListNodeMap_。在我们可以做到这一点之前，我们检查列表的大小。如果列表已满，我们必须从列表中_evict_最近最少使用的元素。

### 3.2. 获取操作

让我们看看我们的_get_操作：

```java
public Optional```<V>``` get(K key) {
   LinkedListNode<CacheElement```````<K, V>```````> linkedListNode = this.linkedListNodeMap.get(key);
   if(linkedListNode != null && !linkedListNode.isEmpty()) {
       linkedListNodeMap.put(key, this.doublyLinkedList.moveToFront(linkedListNode));
       return Optional.of(linkedListNode.getElement().getValue());
   }
   return Optional.empty();
}
```

如上所见，这个操作很简单。首先，我们从_linkedListNodeMap_中获取节点，之后，检查它是否不为null或为空。

其余的操作与之前相同，只是_moveToFront_方法有一点不同：

```java
public LinkedListNode````<T>```` moveToFront(LinkedListNode````<T>```` node) {
    return node.isEmpty() ? dummyNode : updateAndMoveToFront(node, node.getElement());
}
```

现在，让我们创建一些测试来验证我们的缓存是否正常工作：

```java
@Test
public void addSomeDataToCache_WhenGetData_ThenIsEqualWithCacheElement(){
    LRUCache``<String,String>`` lruCache = new LRUCache<>(3);
    lruCache.put("1","test1");
    lruCache.put("2","test2");
    lruCache.put("3","test3");
    assertEquals("test1",lruCache.get("1").get());
    assertEquals("test2",lruCache.get("2").get());
    assertEquals("test3",lruCache.get("3").get());
}

```

现在，让我们测试逐出策略：

```java
@Test
public void addDataToCacheToTheNumberOfSize_WhenAddOneMoreData_ThenLeastRecentlyDataWillEvict(){
    LRUCache``<String,String>`` lruCache = new LRUCache<>(3);
    lruCache.put("1","test1");
    lruCache.put("2","test2");
    lruCache.put("3","test3");
    lruCache.put("4","test4");
    assertFalse(lruCache.get("1").isPresent());
 }
```

## 4. 处理并发

到目前为止，我们假设我们的缓存只是在单线程环境中使用。

要使这个容器线程安全，我们需要同步所有公共方法。让我们在之前的实现中添加一个_ReentrantReadWriteLock_和_ConcurrentHashMap_：

```java
public class LRUCache```````<K, V>``````` implements Cache```````<K, V>``````` {
    private int size;
    private final Map`<K, LinkedListNode``<CacheElement<K,V>```>> linkedListNodeMap;
    private final DoublyLinkedList``<CacheElement<K,V>``> doublyLinkedList;
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    public LRUCache(int size)```java
{
    this.size = size;
    this.linkedListNodeMap = new ConcurrentHashMap<>(size);
    this.doublyLinkedList = new DoublyLinkedList<>();
}
// ...
}
```

**我们更倾向于使用可重入读写锁而不是将方法声明为_synchronized_，因为它让我们更灵活地决定何时使用读写锁。**

### 4.1. _writeLock_

现在，让我们在_put_方法中添加_writeLock_调用：

```java
public boolean put(K key, V value) {
    this.lock.writeLock().lock();
    try {
        //..
    } finally {
        this.lock.writeLock().unlock();
    }
}
```

当我们在资源上使用_writeLock_时，只有持有锁的线程才能写入或读取资源。因此，所有其他尝试读取或写入资源的线程都必须等待当前锁持有者释放它。

**这非常重要，可以防止死锁。如果_try_块内的任何操作失败，我们仍然在方法末尾的_finally_块中释放锁，然后再退出函数。**

另一个需要_writeLock_的操作是_evictElement_，我们在_put_方法中使用了它：

```java
private boolean evictElement() {
    this.lock.writeLock().lock();
    try {
        //...
    } finally {
        this.lock.writeLock().unlock();
    }
}
```

### 4.2. _readLock_

现在，让我们在_get_方法中添加_readLock_调用：

```java
public Optional```<V>``` get(K key) {
    this.lock.readLock().lock();
    try {
        //...
    } finally {
        this.lock.readLock().unlock();
    }
}
```

它看起来和我们对_put_方法所做的完全一样。唯一的区别是我们使用_readLock_而不是_writeLock_。因此，这种读写锁之间的区别允许我们在不更新缓存的情况下并行读取缓存。

现在，让我们在并发环境中测试我们的缓存：

```java
@Test
public void runMultiThreadTask_WhenPutDataInConcurrentToCache_ThenNoDataLost() throws Exception {
    final int size = 50;
    final ExecutorService executorService = Executors.newFixedThreadPool(5);
    Cache`<Integer, String>` cache = new LRUCache<>(size);
    CountDownLatch countDownLatch = new CountDownLatch(size);
    try {
        IntStream.range(0, size).mapToObj(key -> () -> {
            cache.put(key, "value" + key);
            countDownLatch.countDown();
        }).forEach(executorService::submit);
        countDownLatch.await();
    } finally {
        executorService.shutdown();
    }
    assertEquals(cache.size(), size);
    IntStream.range(0, size).forEach(i -> assertEquals("value" + i, cache.get(i).get()));
}
```

## 5. 结论

在本教程中，我们学习了LRU缓存是什么，包括它的一些最常见的特性。然后，我们看到了在Java中实现LRU缓存的一种方式，并探索了一些最常见的操作。

最后，我们使用锁机制涵盖了并发操作。

像往常一样，本文中使用的所有示例都可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/32621e394b0a5883654c0fcdce2fa0de?s=50&r=g)![img](https://secure.gravatar.com/avatar/629fdde67cb23f9d3799635d89c7b250?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)

OK