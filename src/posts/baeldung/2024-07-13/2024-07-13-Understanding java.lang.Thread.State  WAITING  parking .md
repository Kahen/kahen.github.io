---
date: 2022-04-01
category:
  - Java
  - Concurrency
tag:
  - Java
  - Thread
  - LockSupport
head:
  - - meta
    - name: keywords
      content: Java, Thread, LockSupport, WAITING
------
# 理解java.lang.Thread.State: WAITING (parking) | Baeldung

在这篇文章中，我们将讨论Java线程状态——特别是_Thread.State.WAITING_。我们将探讨线程进入此状态的方法以及它们之间的区别。最后，我们将更仔细地研究_LockSupport_类，它提供了几个用于同步的静态实用方法。

## 1. 概述

## 2. 进入_Thread.State.WAITING_

Java提供了多种方式将线程置于_WAITING_状态。

### 2.1. _Object.wait()_

将线程置于_WAITING_状态的最标准方式之一是通过_wait()_方法。当一个线程拥有对象的监视器时，我们可以使用_notify()_方法唤醒它，直到另一个线程完成一些工作。在执行暂停时，线程处于_WAITING (on object monitor)_状态，这也在程序的线程转储中报告：

```java
"WAITING-THREAD" #11 prio=5 os_prio=0 tid=0x000000001d6ff800 nid=0x544 in Object.wait() [0x000000001de4f000]
   java.lang.Thread.State: WAITING (on object monitor)
```

### 2.2 _Thread.join()_

我们可以通过_join()_调用来暂停线程的执行。当我们的主线程需要等待工作线程完成后，我们可以从主线程调用工作线程实例上的_join()_。执行将被暂停，主线程将进入_WAITING_状态，从_jstack_报告为_WAITING (on object monitor)_：

```java
"MAIN-THREAD" #12 prio=5 os_prio=0 tid=0x000000001da4f000 nid=0x25f4 in Object.wait() [0x000000001e28e000]
   java.lang.Thread.State: WAITING (on object monitor)
```

### 2.3 _LockSupport.park()_

最后，我们还可以使用_LockSupport_类的_park()_静态方法将线程设置为_WAITING_状态。调用_park()_将停止当前线程的执行并将其置于_WAITING_状态——更具体地说，是_WAITING (parking)_状态，正如_jstack_报告所示：

```java
"PARKED-THREAD" #11 prio=5 os_prio=0 tid=0x000000001e226800 nid=0x43cc waiting on condition [0x000000001e95f000]
   java.lang.Thread.State: WAITING (parking)
```

由于我们想要更好地理解线程的停车和取消停车，让我们更仔细地看看这是如何工作的。

## 3. 停车和取消停车线程

正如我们之前看到的，我们可以使用_LockSupport_类提供的设施来停车和取消停车线程。这个类是_Unsafe_类的包装器，它的大部分方法立即委托给它。然而，由于_Unsafe_被认为是Java内部API，不应该使用，_LockSupport_是我们可以获得停车工具的官方方式。

### 3.1 如何使用_LockSupport_

使用_LockSupport_很简单。如果我们想要停止一个线程的执行，我们调用_park()_方法。我们不需要提供线程对象本身的引用——代码停止调用它的线程。

让我们看一个简单的停车示例：

```java
public class Application {
    public static void main(String[] args) {
        Thread t = new Thread(() -> {
            int acc = 0;
            for (int i = 1; i `<= 100; i++) {
                acc += i;
            }
            System.out.println("Work finished");
            LockSupport.park();
            System.out.println(acc);
        });
        t.setName("PARK-THREAD");
        t.start();
    }
}
```

我们创建了一个最小的控制台应用程序，它从1到100累加数字并打印出来。如果我们运行它，我们会看到它打印出_Work finished_但不是结果。这当然是因为我们在前面调用了_park()_。

**要让_PARK-THREAD_完成，我们必须取消停车它**。为此，我们必须使用不同的线程。我们可以使用_main_线程（运行_main()_方法的线程）或创建一个新的。

为了简单起见，让我们使用_main_线程：

```java
t.setName("PARK-THREAD");
t.start();

Thread.sleep(1000);
LockSupport.unpark(t);
```

我们在_main_线程中添加了一秒的睡眠，以让_PARK-THREAD_完成累加并自行停车。之后，我们通过调用_unpark(Thread)_来取消停车它。正如预期的那样，在取消停车期间，我们必须提供我们想要启动的线程对象的引用。

有了我们的更改，程序现在正确地终止并打印结果，_5050_。

### 3.2. 取消停车许可证

停车API的内部工作原理是通过使用许可证。实际上，这就像一个单许可证_Semaphore_。停车许可证用于内部管理线程的状态，**_park()_方法消耗它，而_unpark()_使其可用。**

**由于我们每个线程只能有一个许可证可用，多次调用_unpark()_方法没有效果。**一个单独的_park()_调用将禁用线程。

然而，有趣的是，停车的线程等待许可证变得可用以再次启用自己。**如果调用_park()_时许可证已经可用，那么线程从未被禁用。**许可证被消耗，_park()_调用立即返回，线程继续执行。

我们可以通过删除前一个代码片段中的调用_sleep()_来看到这个效果：

```java
//Thread.sleep(1000);
LockSupport.unpark(t);
```

如果我们再次运行我们的程序，我们会看到_PARK-THREAD_执行没有延迟。这是因为我们立即调用_unpark()_，这使得许可证对_park()_可用。

### 3.3. Park重载

_LockSupport_类包含_park(Object blocker)_重载方法。_blocker_参数是负责线程停车的同步对象。我们提供的_object_不影响停车过程，但它在线程转储中被报告，这可能有助于我们诊断并发问题。

让我们更改我们的代码，包含一个同步器对象：

```java
Object syncObj = new Object();
LockSupport.park(syncObj);
```

如果我们删除对_unpark()_的调用并再次运行应用程序，它将挂起。如果我们使用_jstack_查看_PARK-THREAD_正在做什么，我们将得到：

```java
"PARK-THREAD" #11 prio=5 os_prio=0 tid=0x000000001e401000 nid=0xfb0 waiting on condition [0x000000001eb4f000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for  <0x000000076b4a8690>` (a java.lang.Object)
```

正如我们所看到的，最后一行包含了_PARK-THREAD_正在等待的对象。**这对调试很有帮助，这就是为什么我们应该优先选择_park(Object)_重载。**

由于这两个API为我们提供了类似的功能，我们应该选择哪一个？通常，_LockSupport_类及其设施被认为是低级API。此外，API可能会被误用，导致难以察觉的死锁。**在大多数情况下，我们应该使用_Thread_类的_wait()_和_join()_。**

使用停车的好处是我们不需要进入_synchronized_块来禁用线程。这很重要，因为_synchronized_块在代码中建立了happens-before关系，这迫使所有变量刷新，如果不需要，可能会降低性能。然而，这种优化很少发挥作用。

## 5. 结论

在这篇文章中，我们探讨了_LockSupport_类及其停车API。我们研究了如何使用它来禁用线程，并解释了它的内部工作原理。最后，我们将其与更常见的_wait()/join()_ API进行了比较，并展示了它们的差异。

一如既往，代码示例可以在GitHub上找到。