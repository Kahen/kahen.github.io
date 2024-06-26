---
date: 2024-06-27
category:
  - Java
  - 集合框架
tag:
  - HashMap
  - LinkedHashMap
head:
  - - meta
    - name: keywords
      content: Java, HashMap, LinkedHashMap, 缓存, 集合框架
---
# Java中限制HashMap最大大小的方法

HashMap是Java Collections库中众所周知的类。它实现了Map接口，并允许存储键值对。**HashMap的一个实例在其条目数量上没有限制**。在某些特定场景中，我们可能想要改变这种行为。在本教程中，我们将探讨几种强制对HashMap进行大小限制的可能方法。

## 2. Java HashMap的概念

HashMap的核心本质上是一个哈希表。哈希表是一种基于数组和链表这两种基本结构的数据结构。

### 2.1 内部结构

数组是HashMap的基本存储实体。数组的每个位置包含一个对链表的引用。链表可以包含一组由键和值组成的条目。键和值都是Java对象，不是基本类型，并且键是唯一的。HashMap接口定义了一个put方法如下：

```
V put(K key, V value)
```

它使用所谓的“哈希函数”，根据输入的键计算一个称为“哈希”的数字。然后，从哈希开始，基于数组的当前大小，计算插入条目的索引。

不同的键值可能具有相同的哈希值，因此具有相同的索引。这导致冲突，当这种情况发生时，条目被插入到该索引的链表的下一个位置。

如果链表中的条目数量大于由TREEIFY_THRESHOLD常量定义的特定阈值，HashMap将链表替换为树，将运行时性能从O(n)提高到O(log(n))。

### 2.2 调整大小、重新哈希和负载因子

从性能的角度来看，理想的情况是条目分布在整个数组上，每个位置最多有一个条目。然而，随着条目数量的增长，冲突数量上升，每个位置的链表大小也随之增加。

为了尽可能保持接近理想状态，当条目数量达到某个限制时，HashMap会调整自己的大小，然后重新计算哈希和索引。

HashMap根据“负载因子”来调整自己的大小。我们可以将负载因子定义为在需要调整大小和重新哈希之前的条目数量除以可用位置的分数的最大值。HashMap的默认负载因子是0.75f。

## 3. 需要对HashMap的最大大小设置限制的场景

**HashMap的大小仅受Java虚拟机可用内存的限制**。这是类的设计方式，并且与哈希表数据结构的常规用例一致。

然而，可能有一些特定场景，我们需要施加自定义限制。例如：

- 实现缓存
- 在良好定义的条件下收集HashMap的指标，避免其自动调整大小阶段

正如我们在以下部分中看到的，对于第一种情况，我们可以使用LinkedHashMap扩展及其removeEldestEntry方法。对于第二种情况，我们必须实现HashMap的自定义扩展。

这些场景远远超出了HashMap设计的原始目的。缓存是一个比简单映射更广泛的概念，扩展原始类的需求使其无法作为一个纯粹的黑盒进行测试。

## 4. 使用LinkedHashMap限制最大大小

限制最大大小的一种可能方法是使用LinkedHashMap，它是HashMap的一个子类。LinkedHashMap是HashMap和LinkedList的组合：它存储对前一个和后一个条目的指针。因此，它可以维护其条目的插入顺序，而HashMap不支持。

### 4.1 使用LinkedHashMap的示例

**我们可以通过覆盖removeEldestEntry()方法来限制最大大小**。此方法返回一个布尔值，并且在内部调用以决定在新插入后是否应该删除最老的条目。

最老的条目将是最近最少插入的键或最少最近访问的条目，这取决于我们是使用false（默认值）还是true作为accessOrder参数来创建LinkedHashMap实例。

通过覆盖removeEldestEntry()方法，我们定义了自己的规则：

```
@Test
void givenLinkedHashMapObject_whenAddingNewEntry_thenEldestEntryIsRemoved() {
    final int MAX_SIZE = 4;
    LinkedHashMap````<Integer, String>```` linkedHashMap;
    linkedHashMap = new LinkedHashMap````<Integer, String>````() {
        @Override
        protected boolean removeEldestEntry(Map.Entry````<Integer, String>```` eldest) {
            return size() > MAX_SIZE;
        }
    };
    linkedHashMap.put(1, "One");
    linkedHashMap.put(2, "Two");
    linkedHashMap.put(3, "Three");
    linkedHashMap.put(4, "Four");
    linkedHashMap.put(5, "Five");
    String[] expectedArrayAfterFive = { "Two", "Three", "Four", "Five" };
    assertArrayEquals(expectedArrayAfterFive, linkedHashMap.values().toArray());
    linkedHashMap.put(6, "Six");
    String[] expectedArrayAfterSix = { "Three", "Four", "Five", "Six" };
    assertArrayEquals(expectedArrayAfterSix, linkedHashMap.values().toArray());
}
```

在上面的示例中，我们创建了一个LinkedHashMap实例，覆盖了它的removeEldestEntry方法。然后，**当条目集的大小在添加新条目后超过给定限制时，实例本身将在插入新条目之前删除其最老的键**。

在测试用例中，我们在setUp方法中预先设置了最大大小为4，并用四个条目填充了LinkedHashMap对象。我们可以看到，对于每个进一步的插入，条目数量始终为4，并且LinkedHashMap实例每次都删除其最老的条目。

我们必须注意，这不是限制最大大小要求的严格解释，因为插入操作仍然被允许：通过删除最老的键来保持最大大小。

我们可以通过使用适当的构造函数，将accessOrder参数设置为true来创建LinkedHashMap，从而实现所谓的LRU（最近最少使用）缓存。

### 4.2 性能考虑

常规HashMap具有我们期望的哈希表数据结构的性能。另一方面，LinkedHashMap必须保持其条目的顺序，这使得其插入和删除操作变慢。除非我们将accessOrder标志设置为true，否则访问操作的性能不会改变。

## 5. 使用自定义HashMap限制最大大小

另一种可能的策略是通过自定义实现put方法来扩展HashMap。我们可以在实现中增加一个检查，当HashMap实例达到强加的限制时抛出异常。

### 5.1 实现自定义HashMap

对于这种方法，我们必须覆盖put方法，进行初步检查：

```
public class HashMapWithMaxSizeLimit``<K, V>`` extends HashMap``<K, V>`` {
    private int maxSize = -1;

    public HashMapWithMaxSizeLimit(int maxSize) {
        super();
        this.maxSize = maxSize;
    }

    @Override
    public V put(K key, V value) {
        if (this.maxSize == -1 || this.containsKey(key) || this.size() `< this.maxSize) {
            return super.put(key, value);
        }
        throw new RuntimeException("Max size exceeded!");
    }
}
```

在上面的示例中，我们有一个HashMap的扩展。**它有一个maxSize属性，默认值为-1，这隐含地意味着“无限制”**。我们可以通过特定的构造函数修改这个属性。在put实现中，如果maxSize等于默认值，键已经存在，或者条目数量低于指定的maxSize，扩展调用超类相应的方法。

如果扩展不符合上述条件，它将引发一个未检查的异常。我们不能使用已检查的异常，因为put方法没有明确抛出任何异常，我们不能重新定义其签名。**在我们的示例中，这个限制可以通过使用putAll来规避。为了避免这种情况，我们可能还想通过覆盖putAll，使用相同的逻辑来改进示例。**

为了保持示例的简单性，我们没有重新定义超类的所有构造函数。然而，在真实用例中，我们应该这样做，以保持HashMap的原始设计。在这种情况下，我们还应该在HashMap(Map<? extends K, ? extends V>` m)构造函数中使用最大大小逻辑，因为它在不使用putAll的情况下添加了所有条目的映射参数。

这个解决方案比前一节中描述的解决方案更严格地遵循要求。**在这种情况下，HashMap禁止任何超出限制的插入操作，而不会删除任何现有元素**。

### 5.2 测试自定义HashMap

作为一个示例，我们可以测试上述自定义类：

```
private final int MAX_SIZE = 4;
private HashMapWithMaxSizeLimit````<Integer, String>```` hashMapWithMaxSizeLimit;

@Test
void givenCustomHashMapObject_whenThereIsNoLimit_thenDoesNotThrowException() {
    hashMapWithMaxSizeLimit = new HashMapWithMaxSizeLimit<>();
    assertDoesNotThrow(() -> {
        for (int i = 0; i `< 10000; i++) {
            hashMapWithMaxSizeLimit.put(i, i + "");
        }
    });
}

@Test
void givenCustomHashMapObject_whenLimitNotReached_thenDoesNotThrowException() {
    hashMapWithMaxSizeLimit = new HashMapWithMaxSizeLimit(MAX_SIZE);
    assertDoesNotThrow(() ->` {
        for (int i = 0; i `< 4; i++) {
            hashMapWithMaxSizeLimit.put(i, i + "");
        }
    });
}

@Test
void givenCustomHashMapObject_whenReplacingValueWhenLimitIsReached_thenDoesNotThrowException() {
    hashMapWithMaxSizeLimit = new HashMapWithMaxSizeLimit(MAX_SIZE);
    assertDoesNotThrow(() ->` {
        hashMapWithMaxSizeLimit.put(1, "One\");
        hashMapWithMaxSizeLimit.put(2, "Two");
        hashMapWithMaxSizeLimit.put(3, "Three");
        hashMapWithMaxSizeLimit.put(4, "Four");
        hashMapWithMaxSizeLimit.put(4, "4");
    });
}

@Test
void givenCustomHashMapObject_whenLimitExceeded_thenThrowsException() {
    hashMapWithMaxSizeLimit = new HashMapWithMaxSizeLimit(MAX_SIZE);
    Exception exception = assertThrows(RuntimeException.class, () -> {
        for (int i = 0; i < 5; i++) {
            hashMapWithMaxSizeLimit.put(i, i + "");
        }
    });

    String messageThrownWhenSizeExceedsLimit = "Max size exceeded!";
    String actualMessage = exception.getMessage();
    assertTrue(actualMessage.equals(messageThrownWhenSizeExceedsLimit));
}

```

在上面的代码中，我们有四个测试用例：

- 我们使用默认的无限制行为实例化类。即使我们添加了大量条目，我们也不期望有任何异常。
- 我们使用maxSize为4实例化类。如果我们没有达到限制，我们不期望有任何异常。
- 我们使用maxSize为4实例化类。如果我们已经达到限制并且我们替换一个值，我们不期望有任何异常。
- 我们使用maxSize为4实例化类。如果我们超出限制，我们期望抛出一个RuntimeException，并带有特定消息。

## 6. 结论

强制对HashMap的最大大小设置限制的需求可能在某些特定场景中出现。在本文中，我们已经看到了一些解决这一需求的示例。

扩展LinkedHashMap并覆盖其removeEldestEntry()方法在我们要快速实现LRU缓存或类似东西时非常有用。如果我们想要强制执行更严格的限制，我们可以扩展HashMap并覆盖其插入方法以满足我们的需求。

像往常一样，示例代码可以在GitHub上找到。
---
OK