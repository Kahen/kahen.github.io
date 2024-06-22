---
date: 2024-06-23
category:
  - Java
  - Concurrency
tag:
  - CountDownLatch
  - Semaphore
head:
  - - meta
    - name: keywords
      content: Java, Multithreading, Synchronization, CountDownLatch, Semaphore
---

# CountDownLatch与Semaphore的对比

在Java多线程编程中，线程间的有效协调对于确保适当的同步和防止数据损坏至关重要。两种常用的线程协调机制是_CountDownLatch_和_Semaphore_。在本教程中，我们将探讨_CountDownLatch_和_Semaphore_之间的区别，并讨论何时使用它们。

### 2.1. _CountDownLatch_
**_CountDownLatch_允许一个或多个线程在指定的任务集完成之前优雅地暂停。**它通过将计数器递减，直到它达到零，这表明所有先决任务都已完成。

### 2.2. _Semaphore_
**_Semaphore_是一个同步工具，通过使用许可证来控制对共享资源的访问。**与_CountDownLatch_不同，_Semaphore_的许可证可以在应用程序中多次释放和获取，允许更细粒度地控制并发管理。

### 3.1. 计数机制
_CountDownLatch_通过从一个初始计数开始操作，随着任务的完成而递减计数。**当计数达到零时，等待的线程被释放。**
_Semaphore_维护一组许可证，每个许可证代表访问共享资源的权限。**线程获取许可证以访问资源，并在完成时释放它们。**

### 3.2. 可重置性
**_Semaphore_许可证可以多次释放和获取，允许动态资源管理。**例如，如果我们的应用程序突然需要更多的数据库连接，我们可以释放额外的许可证来动态增加可用连接的数量。

而在_CountDownLatch_中，一旦计数达到零，它就不能被重置或用于另一个同步事件。它被设计为一次性使用案例。

### 3.3. 动态许可证计数
_Semaphore_许可证可以在运行时使用_acquire()_和_release()_方法动态调整。**这允许对允许同时访问共享资源的线程数量进行动态更改。**
另一方面，一旦_CountDownLatch_初始化了一个计数，它在运行时就保持不变，不能更改。

### 3.4. 公平性
_Semaphore_支持公平性概念，确保等待获取许可证的线程按照它们到达的顺序服务（先进先出）。这有助于防止在高竞争场景中发生线程饥饿。

**与此相反，_CountDownLatch_没有公平性概念。**它通常用于一次性同步事件，其中线程执行的特定顺序不太关键。

### 3.5. 使用案例
_CountDownLatch_通常用于协调多个线程的启动、等待并行操作完成或在继续主任务之前同步系统的初始化等场景。例如，在并发数据处理应用程序中，_CountDownLatch_可以确保在开始数据分析之前完成所有数据加载任务。

另一方面，_Semaphore_适用于管理对共享资源的访问、实现资源池、控制对代码关键部分的访问或限制并发数据库连接的数量。例如，在数据库连接池系统中，_Semaphore_可以限制并发数据库连接的数量，以防止数据库服务器过载。

### 3.6. 性能
由于_CountDownLatch_主要涉及递减计数器，因此在处理和资源利用方面引入的开销很小。**此外，_Semaphore_在管理许可证时引入开销，特别是当频繁获取和释放许可证时。**每次调用_acquire()_和_release()_都会涉及额外的处理来管理许可证计数，这可能会影响性能，尤其是在高并发场景中。

### 3.7. 总结
下表总结了_CountDownLatch_和_Semaphore_在各个方面的关键差异：

| 特性 | _CountDownLatch_ | _Semaphore_ |
| --- | --- | --- |
| 目的 | 同步线程直到一组任务完成 | 控制对共享资源的访问 |
| 计数机制 | 递减计数器 | 管理许可证（令牌） |
| 可重置性 | 不可重置（一次性同步） | 可重置（许可证可以多次释放和获取） |
| 动态许可证计数 | 否 | 是（可以在运行时调整许可证） |
| 公平性 | 没有特定的公平性保证 | 提供公平性（先进先出顺序） |
| 性能 | 低开销（最小处理） | 由于许可证管理而略高开销 |

## 4. 实现中的比较
在这一部分，我们将突出_CountDownLatch_和_Semaphore_在语法和功能上的差异。

### 4.1. _CountDownLatch_实现
首先，我们创建一个_CountDownLatch_，其初始计数于要完成的任务数。每个工作线程模拟一个任务，并在任务完成后使用_countDown()_方法递减锁存计数。主线程使用_await()_方法等待所有任务完成：

```java
int numberOfTasks = 3;
CountDownLatch latch = new CountDownLatch(numberOfTasks);

for (int i = 1; i `<= numberOfTasks; i++) {
    new Thread(() ->` {
        System.out.println("Task completed by Thread " + Thread.currentThread().getId());
        latch.countDown();
    }).start();
}

latch.await();
System.out.println("All tasks completed. Main thread proceeds.");
```

所有任务完成后，锁存计数达到零，尝试调用_countDown()_将没有任何效果。此外，由于锁存计数已经是零，任何后续对_await()_的调用都会立即返回而不阻塞线程：

```java
latch.countDown();
latch.await(); // 这行不会阻塞
System.out.println("Latch is already at zero and cannot be reset.");
```

让我们现在观察程序的执行并检查输出：

```
Task completed by Thread 11
Task completed by Thread 12
Task completed by Thread 13
All tasks completed. Main thread proceeds.
Latch is already at zero and cannot be reset.
```

### 4.2. _Semaphore_实现
在这个例子中，我们创建了一个具有固定许可证数量_NUM_PERMITS_的_Semaphore_。每个工作线程通过使用_acquire()_方法获取许可证来模拟资源访问。需要注意的一点是，当线程调用_acquire()_方法以获取许可证时，它可能在等待许可证时被中断。因此，在_try_–_catch_块中捕获_InterruptedException_以优雅地处理此中断至关重要。

完成资源访问后，线程使用_release()_方法释放许可证：

```java
int NUM_PERMITS = 3;
Semaphore semaphore = new Semaphore(NUM_PERMITS);

for (int i = 1; i `<= 5; i++) {
    new Thread(() ->` {
        try {
            semaphore.acquire();
            System.out.println("Thread " + Thread.currentThread().getId() + " accessing resource.");
            Thread.sleep(2000); // 模拟资源使用
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            semaphore.release();
        }
    }).start();
}
```

接下来，我们通过释放额外的许可证来模拟重置_Semaphore_，将计数恢复到初始许可证值。这证明了_Semaphore_许可证可以在运行时动态调整或重置：

```java
try {
    Thread.sleep(5000);
    semaphore.release(NUM_PERMITS); // 将Semaphore许可证重置为初始计数
    System.out.println("Semaphore permits reset to initial count.");
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

以下是运行程序后的输出：

```
Thread 11 accessing resource.
Thread 12 accessing resource.
Thread 13 accessing resource.
Thread 14 accessing resource.
Thread 15 accessing resource.
Semaphore permits reset to initial count.
```

## 5. 结论
在本文中，我们探讨了_CountDownLatch_和_Semaphore_的关键特性。_CountDownLatch_非常适合在允许线程继续之前需要完成一组固定任务的场景，使其适用于一次性同步事件。相比之下，_Semaphore_用于通过限制可以同时访问它们的线程数量来控制对共享资源的访问，为并发管理提供了更细粒度的控制。

如常，示例的源代码可在GitHub上找到。