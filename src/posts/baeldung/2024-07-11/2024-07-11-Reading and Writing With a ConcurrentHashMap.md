---
date: 2022-04-01
category:
  - Java
  - Concurrency
tag:
  - ConcurrentHashMap
  - Java
  - Thread-Safe
head:
  - - meta
    - name: keywords
      content: Java, Concurrency, ConcurrentHashMap, Thread-Safe
---
# ConcurrentHashMap的读写操作

## 1. 引言

在本教程中，我们将学习如何使用ConcurrentHashMap类以线程安全的方式从哈希表数据结构中读写数据。

## 2. 概览

ConcurrentHashMap是ConcurrentMap接口的一种实现，并且是Java提供的线程安全集合之一。它由一个常规映射支持，并且与Hashtable的工作方式类似，我们将在后续部分介绍一些细微差别。

### 2.2. 有用的方法

ConcurrentHashMap API规范提供了实用的方法来操作集合。在本教程中，我们将主要看两个方法：

- get(K key): 检索给定键的元素。这是我们的读取方法。
- computeIfPresent(K key, BiFunction`<K, V, V>` remappingFunction): 如果给定的键存在，则将remappingFunction应用于给定键的值。

我们将在第3节中看到这些方法的实际应用。

### 2.2. 为什么要使用ConcurrentHashMap

ConcurrentHashMap和常规HashMap的主要区别在于，前者实现了读取操作的完全并发性和写入操作的高并发性。

**读取操作保证不会被阻塞或阻塞键。写入操作在映射Entry级别被阻塞并阻塞其他写入。** 这两个概念在我们要实现高吞吐量和最终一致性的环境中非常重要。

HashTable和Collections.synchronizedMap集合也实现了读取和写入的并发性。而，它们效率较低，因为它们锁定了整个集合，而不是仅仅锁定线程正在写入的Entry。

另一方面，**ConcurrentHashMap类在映射Entry级别上锁定。** 因此，其他线程不会被阻止在其他映射键上写入。因此，在多线程环境中，为了实现高吞吐量，ConcurrentHashMap是比HashTable和synchronizedMap集合更好的选择。

## 3. 线程安全操作

ConcurrentHashMap实现了大多数代码需要被认为是线程安全的保证。这有助于避免Java中的一些常见并发陷阱。

为了说明ConcurrentHashMap在多线程环境中的工作方式，我们将使用一个Java测试，该测试检索并更新给定数字的频率。让我们首先定义测试的基本结构：

```java
public class ConcurrentHashMapUnitTest {
    private Map`<Integer, Integer>` frequencyMap;

    @BeforeEach
    public void setup() {
        frequencyMap = new ConcurrentHashMap<>();
        frequencyMap.put(0, 0);
        frequencyMap.put(1, 0);
        frequencyMap.put(2, 0);
    }

    @AfterEach
    public void teardown() {
        frequencyMap.clear();
    }

    private static void sleep(int timeout) {
        try {
            TimeUnit.SECONDS.sleep(timeout);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
```

上述类定义了数字的频率映射，一个setup方法来用初始值填充它，一个teardown方法来清除其内容，以及一个sleep助手方法来处理InterruptedException。

### 3.1. 读取

ConcurrentHashMap允许完全的读取并发，这意味着**任意数量的线程可以同时读取同一个键**。这也意味着读取不会阻塞，也不会被写入操作阻塞。因此，从映射中读取可能会得到“旧的”或不一致的值。

让我们看一个例子，其中一个线程正在写入一个键，第二个线程在写入完成之前读取，第三个线程在写入完成后读取：

```java
@Test
public void givenOneThreadIsWriting_whenAnotherThreadReads_thenGetCorrectValue() throws Exception {
    ExecutorService threadExecutor = Executors.newFixedThreadPool(3);

    Runnable writeAfter1Sec = () -> frequencyMap.computeIfPresent(1, (k, v) -> {
        sleep(1);
        return frequencyMap.get(k) + 1;
    });

    Callable``````<Integer>`````` readNow = () -> frequencyMap.get(1);
    Callable``````<Integer>`````` readAfter1001Ms = () -> {
        TimeUnit.MILLISECONDS.sleep(1001);
        return frequencyMap.get(1);
    };

    threadExecutor.submit(writeAfter1Sec);
    List<Future``````<Integer>``````> results = threadExecutor.invokeAll(asList(readNow, readAfter1001Ms));

    assertEquals(0, results.get(0).get());
    assertEquals(1, results.get(1).get());

    if (threadExecutor.awaitTermination(2, TimeUnit.SECONDS)) {
        threadExecutor.shutdown();
    }
}
```

让我们更仔细地看看上述代码中发生了什么：

1. 我们首先定义了一个ExecutorService，一个写入线程和两个读取线程。写入操作需要一秒钟才能完成。因此，在那之前的所有读取应该得到旧的结果。在那之后（在这个例子中恰好一毫秒后）的任何读取都应该得到更新后的值。
2. 然后，我们使用invokeAll调用所有读取线程，并将结果按顺序收集到列表中。因此，列表的零位置指的是第一次读取，位置一指的是第二次读取。
3. 最后，我们使用assertEquals验证已完成任务的结果，并关闭ExecutorService。

从这段代码中，我们得出结论，即使其他线程同时在同一个资源上写入，读取也不会被阻塞。如果我们将读取和写入想象为事务，**ConcurrentHashMap实现了读取的最终一致性**。这意味着我们不总是读取到一个一致的值（最新的），但是一旦映射停止接收写入，然后读取再次变得一致。有关最终一致性的更多详细信息，请查看有关事务的介绍。

提示：如果您还希望使读取被阻塞并被其他读取阻塞，请不要使用get()方法。相反，您可以实现一个恒等BiFunction，它在给定键上返回未修改的值，并将该函数传递给computeIfPresent方法。使用它，我们将牺牲读取速度以防止读取旧的或不一致的值的问题。

### 3.2. 写入

正如前面提到的，ConcurrentHashMap实现了部分写入并发性，它在同一个映射键上阻塞其他写入，并允许对不同键的写入。

**这对于在多线程环境中实现高吞吐量和写入一致性至关重要。** 为了说明一致性，让我们定义一个测试，其中两个线程在同一资源上写入，并检查映射如何处理：

```java
@Test
public void givenOneThreadIsWriting_whenAnotherThreadWritesAtSameKey_thenWaitAndGetCorrectValue() throws Exception {
    ExecutorService threadExecutor = Executors.newFixedThreadPool(2);

    Callable``````<Integer>`````` writeAfter5Sec = () -> frequencyMap.computeIfPresent(1, (k, v) -> {
        sleep(5);
        return frequencyMap.get(k) + 1;
    });

    Callable``````<Integer>`````` writeAfter1Sec = () -> frequencyMap.computeIfPresent(1, (k, v) -> {
        sleep(1);
        return frequencyMap.get(k) + 1;
    });

    List<Future``````<Integer>``````> results = threadExecutor.invokeAll(asList(writeAfter5Sec, writeAfter1Sec));

    assertEquals(1, results.get(0).get());
    assertEquals(2, results.get(1).get());

    if (threadExecutor.awaitTermination(2, TimeUnit.SECONDS)) {
        threadExecutor.shutdown();
    }
}
```

上述测试显示了两个写入线程被提交到ExecutorService。先来的线程需要五秒钟来写入，第二个线程需要一秒钟来写入。第一个线程获取锁并阻塞任何其他在映射键1上的写入活动。因此，第二个线程必须等待五秒钟，直到第一个线程释放锁。第一个写入完成后，第二个线程得到最新值并在一秒钟内更新它。

来自ExecutorService的结果列表按任务提交的顺序排列，所以第一个元素应该返回1，第二个应该返回2。

ConcurrentHashMap的另一个用例是在不同映射键上实现高写入吞吐量。让我们用另一个单元测试来说明这一点，该测试使用两个写入线程来更新映射中的不同键：

```java
@Test
public void givenOneThreadIsWriting_whenAnotherThreadWritesAtDifferentKey_thenNotWaitAndGetCorrectValue() throws Exception {
    ExecutorService threadExecutor = Executors.newFixedThreadPool(2);

    Callable``````<Integer>`````` writeAfter5Sec = () -> frequencyMap.computeIfPresent(1, (k, v) -> {
        sleep(5);
        return frequencyMap.get(k) + 1;
    });

    AtomicLong time = new AtomicLong(System.currentTimeMillis());
    Callable``````<Integer>`````` writeAfter1Sec = () -> frequencyMap.computeIfPresent(2, (k, v) -> {
        sleep(1);
        time.set((System.currentTimeMillis() - time.get()) / 1000);
        return frequencyMap.get(k) + 1;
    });

    threadExecutor.invokeAll(asList(writeAfter5Sec, writeAfter1Sec));

    assertEquals(1, time.get());

    if (threadExecutor.awaitTermination(2, TimeUnit.SECONDS)) {
        threadExecutor.shutdown();
    }
}
```

该测试验证了第二个线程不需要等待第一个线程的完成，因为写入发生在不同的映射键上。因此，第二个写入应该只需要一秒钟就可以完成。**在ConcurrentHashMap中，线程可以在不同的映射条目中同时工作，并且与其他线程安全结构相比，并发写入操作更快。**

## 4. 结论

