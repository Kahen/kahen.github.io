---
date: 2023-04-01
category:
  - Concurrency
  - Java
tag:
  - Thread Dump
  - Deadlock
head:
  - - meta
    - name: keywords
      content: Java, Thread Dump, Lock, Deadlock, Synchronizer
---
# 线程转储中的“锁定可拥有同步器”是什么？

在本教程中，我们将探讨线程的锁定可拥有同步器的含义。我们将编写一个使用_Lock_进行同步的简单程序，并查看在线程转储中它看起来如何。

每个线程可能有一个同步器对象列表。该列表中的条目表示线程已获取锁的可拥有同步器。

_AbstractOwnableSynchronizer_类的实例可以用作同步器。它最常见的子类是_Sync_类，这是如_ReentrantReadWriteLock_等_Lock_接口实现的字段。

当我们调用_ReentrantReadWriteLock.lock()_方法时，内部代码将此委托给_Sync.lock()_方法。**一旦我们获取了锁，Lock对象就会被添加到线程的锁定可拥有同步器列表中**。

我们可以在典型的线程转储中查看这个列表：

```
"Thread-0" #1 prio=5 os_prio=0 tid=0x000002411a452800 nid=0x1c18 waiting on condition [0x00000051a2bff000]
   java.lang.Thread.State: TIMED_WAITING (sleeping)
        at java.lang.Thread.sleep(Native Method)
        at com.baeldung.ownablesynchronizers.Application.main(Application.java:25)

   Locked ownable synchronizers:
        - ```<0x000000076e185e68>``` (a java.util.concurrent.locks.ReentrantReadWriteLock$FairSync)
```

根据我们用来生成它的工具，我们可能需要提供特定的选项。例如，使用jstack，我们运行以下命令：

```
jstack -l `<pid>`
```

使用_-l_选项，我们告诉jstack打印有关锁的额外信息。

### 3. 锁定可拥有同步器如何帮助我们

可拥有同步器列表帮助我们识别可能的应用程序死锁。例如，我们可以看到在线程转储中，如果一个名为_Thread-1_的不同线程正在等待获取同一个_Lock_对象上的锁：

```
"Thread-1" #12 prio=5 os_prio=0 tid=0x00000241374d7000 nid=0x4da4 waiting on condition [0x00000051a42fe000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for ```<0x000000076e185e68>``` (a java.util.concurrent.locks.ReentrantReadWriteLock$FairSync)
```

_Thread-1_线程处于_WAITING_状态。具体来说，它正在等待获取对象id为_```<0x000000076e185e68>```_上的锁。然而，同一个对象在线程_Thread-0_的锁定可拥有同步器列表中。**我们现在知道，除非线程_Thread-0_释放它自己的锁，否则线程_Thread-1_无法继续**。

如果同时发生了相反的情况，即_Thread-1_获取了_Thread-0_正在等待的锁，我们就创建了一个死锁。

### 4. 死锁诊断示例

让我们看一下一些简单的代码，它说明了上述所有内容。我们将使用两个线程和两个_ReentrantLock_对象创建一个死锁场景：

```java
public class Application {

    public static void main(String[] args) throws Exception {
        ReentrantLock firstLock = new ReentrantLock(true);
        ReentrantLock secondLock = new ReentrantLock(true);
        Thread first = createThread("Thread-0", firstLock, secondLock);
        Thread second = createThread("Thread-1", secondLock, firstLock);

        first.start();
        second.start();

        first.join();
        second.join();
    }
}
```

我们的_main()_方法创建了两个_ReentrantLock_对象。第一个线程，_Thread-0_，使用_firstLock_作为其主锁，_secondLock_作为其辅助锁。

我们将为_Thread-1_做相反的事情。具体来说，我们的目标是通过让每个线程获取其主锁并在尝试获取其辅助锁时挂起来，来生成一个死锁。

_createThread()_方法为我们的每个线程生成它们各自的锁：

```java
public static Thread createThread(String threadName, ReentrantLock primaryLock, ReentrantLock secondaryLock) {
    return new Thread(() -> {
        primaryLock.lock();

        synchronized (Application.class) {
            Application.class.notify();
            if (!secondaryLock.isLocked()) {
                Application.class.wait();
            }
        }

        secondaryLock.lock();

        System.out.println(threadName + ": Finished");
        primaryLock.unlock();
        secondaryLock.unlock();
    });
}
```

为了确保每个线程在其他线程尝试之前锁定了它的_primaryLock_，我们使用_synchronized_块内的_isLocked()_来等待它。

运行此代码将挂起，永远不会打印完成的控制台输出。如果我们运行jstack，我们将看到以下内容：

```
"Thread-0" #12 prio=5 os_prio=0 tid=0x0000027e1e31e800 nid=0x7d0 waiting on condition [0x000000a29acfe000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for ``<0x000000076e182558>``

   Locked ownable synchronizers:
        - ``<0x000000076e182528>``

"Thread-1" #13 prio=5 os_prio=0 tid=0x0000027e1e3ba000 nid=0x650 waiting on condition [0x000000a29adfe000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for ``<0x000000076e182528>``

   Locked ownable synchronizers:
        - ``<0x000000076e182558>``
```

我们可以看到_Thread-0_正在等待_0x000000076e182558_，而_Thread-1_正在等待_0x000000076e182528_。同时，我们可以在它们各自的线程的锁定可拥有同步器中找到这些句柄。**基本上，这意味着我们可以看到我们的线程正在等待哪些锁以及哪个线程拥有这些锁**。这有助于我们排除并发问题，包括死锁。

需要注意的重要一点是，如果我们使用的是_ReentrantLock_而不是_ReentrantReadWriteLock.ReadLock_作为同步器，我们就不会在线程转储中获得相同的信息。**只有在同步器列表中显示_ReentrantReadWriteLock.WriteLock_**。

### 5. 结论

在本文中，我们讨论了线程转储中出现的锁定可拥有同步器列表的含义，如何使用它来排除并发问题，并看到了一个示例场景。

如往常一样，本文的源代码可在GitHub上找到。