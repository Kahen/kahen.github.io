---
date: 2022-04-01
category:
  - Java Concurrency
  - Locks
tag:
  - Java
  - Lock
  - Concurrency
head:
  - - meta
    - name: keywords
      content: Java, Lock, Concurrency, ReentrantLock, Semaphore, ConcurrentHashMap
---
# Java中通过键获取锁

## 1. 概述

在本文中，我们将看到如何针对特定键获取锁，以防止对该键的并发操作，同时不影响其他键的操作。

通常，我们将实现两个方法并了解如何操作它们：

- `void lock(String key)`
- `void unlock(String key)`

为了教程的简单性，我们总是假设我们的键是_字符串_。您可以将它们替换为您需要的对象类型，唯一的条件是正确定义了`equals`和`hashCode`方法，因为我们将它们用作`HashMap`的键。

## 2. 一个简单的互斥锁

首先，我们假设我们想要阻止任何请求的操作，如果相应的键已经被使用。在这里，我们将定义一个`boolean tryLock(String key)`方法，而不是我们之前想象的`lock`方法。

具体来说，我们的目标是维护一个`Set`，我们将用任何时刻正在使用的键填充它。因此，当对键请求一个新操作时，我们只需要拒绝它，如果我们发现键已经被另一个线程使用。

我们面临的问题是没有线程安全的`Set`实现。因此，我们将使用一个由`ConcurrentHashMap`支持的`Set`。使用`ConcurrentHashMap`保证了我们在多线程环境中的数据一致性。

让我们看看这在实践中是如何工作的：

```java
public class SimpleExclusiveLockByKey {
    private static Set`<String>` usedKeys = ConcurrentHashMap.newKeySet();

    public boolean tryLock(String key) {
        return usedKeys.add(key);
    }

    public void unlock(String key) {
        usedKeys.remove(key);
    }
}
```

以下是我们将如何使用这个类：

```java
String key = "key";
SimpleExclusiveLockByKey lockByKey = new SimpleExclusiveLockByKey();
try {
    lockByKey.tryLock(key);
    // 插入需要在键锁可用时才执行的代码
} finally { // 至关重要
    lockByKey.unlock(key);
}
```

**让我们强调`finally`块的存在：在其中调用`unlock`方法至关重要。**这样，即使我们的代码在`try`括号内抛出了`Exception`，我们也会解锁键。

## 3. 通过键获取和释放锁

现在，让我们进一步探讨问题，假设我们不仅仅想拒绝对相同键的并发操作，而是想让新进来的操作等待当前对键的操作完成。

应用程序流程将是：

- 第一个线程请求对键的锁定：它获取了键的锁
- 第二个线程请求对同一键的锁定：线程2被告知等待
- 第一个线程释放了键的锁
- 第二个线程获取了键的锁并可以执行其操作

### 3.1. 定义一个带有线程计数器的锁

在这种情况下，使用`Lock`听起来很自然。简而言之，`Lock`是一个用于线程同步的对象，它允许阻塞线程直到它可以被获取。`Lock`是一个接口——我们将使用`ReentrantLock`，这是它的基本实现。

让我们首先用一个内部类包装我们的`Lock`。这个类将能够跟踪当前等待锁定键的线程数量。它将公开两个方法，一个用于增加线程计数器，另一个用于减少它：

```java
private static class LockWrapper {
    private final Lock lock = new ReentrantLock();
    private final AtomicInteger numberOfThreadsInQueue = new AtomicInteger(1);

    private LockWrapper addThreadInQueue() {
        numberOfThreadsInQueue.incrementAndGet();
        return this;
    }

    private int removeThreadFromQueue() {
        return numberOfThreadsInQueue.decrementAndGet();
    }
}
```

### 3.2. 让锁处理排队的线程

此外，我们将继续使用`ConcurrentHashMap`。但与我们之前所做的不同，我们将不仅仅提取`Map`的键，我们将使用`LockWrapper`对象作为值：

```java
private static ConcurrentHashMap````<String, LockWrapper>```` locks = new ConcurrentHashMap````<String, LockWrapper>````();
```

当一个线程想要获取对键的锁定时，我们需要查看是否已经存在这个键的`LockWrapper`：

- 如果没有，我们将为给定的键实例化一个新的`LockWrapper`，计数器设置为1
- 如果有，我们将返回现有的`LockWrapper`并增加其关联的计数器

让我们看看这是如何完成的：

```java
public void lock(String key) {
    LockWrapper lockWrapper = locks.compute(key, (k, v) -> v == null ? new LockWrapper() : v.addThreadInQueue());
    lockWrapper.lock.lock();
}
```

代码由于使用了`HashMap`的`compute`方法而非常简洁。让我们详细介绍这个方法的工作原理：

- `compute`方法应用于对象`locks`，`key`作为其第一个参数：检索`locks`中与`key`对应的初始值
- 作为`compute`第二个参数给出的`BiFunction`应用于`key`和初始值：结果给出了一个新的值
- 新值替换了`locks`中`key`的初始值

### 3.3. 解锁并可选地移除映射条目

此外，当一个线程释放锁时，我们将减少与`LockWrapper`关联的线程数量。如果计数降到零，那么我们将从`ConcurrentHashMap`中移除键：

```java
public void unlock(String key) {
    LockWrapper lockWrapper = locks.get(key);
    lockWrapper.lock.unlock();
    if (lockWrapper.removeThreadFromQueue() == 0) {
        // 注意：我们传入特定的值以移除，以处理另一个线程可能正好在移除前排队的情况
        locks.remove(key, lockWrapper);
    }
}
```

### 3.4. 总结

总而言之，让我们看看我们整个类最终的样子：

```java
public class LockByKey {

    private static class LockWrapper {
        private final Lock lock = new ReentrantLock();
        private final AtomicInteger numberOfThreadsInQueue = new AtomicInteger(1);

        private LockWrapper addThreadInQueue() {
            numberOfThreadsInQueue.incrementAndGet();
            return this;
        }

        private int removeThreadFromQueue() {
            return numberOfThreadsInQueue.decrementAndGet();
        }
    }

    private static ConcurrentHashMap````<String, LockWrapper>```` locks = new ConcurrentHashMap````<String, LockWrapper>````();

    public void lock(String key) {
        LockWrapper lockWrapper = locks.compute(key, (k, v) -> v == null ? new LockWrapper() : v.addThreadInQueue());
        lockWrapper.lock.lock();
    }

    public void unlock(String key) {
        LockWrapper lockWrapper = locks.get(key);
        lockWrapper.lock.unlock();
        if (lockWrapper.removeThreadFromQueue() == 0) {
            locks.remove(key, lockWrapper);
        }
    }

}
```

使用方式与我们之前类似：

```java
String key = "key";
LockByKey lockByKey = new LockByKey();
try {
    lockByKey.lock(key);
    // 在这里插入你的代码
} finally { // 至关重要
    lockByKey.unlock(key);
}
```

## 4. 允许同时进行多个操作

最后但同样重要的是，让我们考虑另一种情况：不是只允许一个线程对给定键同时执行一个操作，而是我们想要将对同一键同时执行操作的线程数量限制为某个整数`n`。为了简单起见，我们将设置`n`=2。

让我们详细描述我们的用例：

- 第一个线程想要获取键的锁定：它将被允许这样做
- 第二个线程想要获取相同的锁：它也将被允许
- 第三个线程请求相同的锁：它将不得不排队，直到前两个线程之一释放其锁

Semaphores为此而生。一个`Semaphore`是一个用来限制同时访问资源的线程数量的对象。

全局功能和代码看起来与我们使用锁时非常相似：

```java
public class SimultaneousEntriesLockByKey {

    private static final int ALLOWED_THREADS = 2;

    private static ConcurrentHashMap``<String, Semaphore>`` semaphores = new ConcurrentHashMap``<String, Semaphore>``();

    public void lock(String key) {
        Semaphore semaphore = semaphores.compute(key, (k, v) -> v == null ? new Semaphore(ALLOWED_THREADS) : v);
        semaphore.acquireUninterruptibly();
    }

    public void unlock(String key) {
        Semaphore semaphore = semaphores.get(key);
        semaphore.release();
        if (semaphore.availablePermits() == ALLOWED_THREADS) {
            semaphores.remove(key, semaphore);
        }
    }

}
```

使用方式是相同的：

```java
String key = "key";
SimultaneousEntriesLockByKey lockByKey = new SimultaneousEntriesLockByKey();
try {
    lockByKey.lock(key);
    // 在这里插入你的代码
} finally { // 至关重要
    lockByKey.unlock(key);
}
```

## 5. 结论

在本文中，我们已经看到了如何对键设置锁，以完全阻止并发操作或将并发操作的数量限制为一个（使用锁）或更多（使用信号量）。 

一如既往，代码可以在GitHub上找到。