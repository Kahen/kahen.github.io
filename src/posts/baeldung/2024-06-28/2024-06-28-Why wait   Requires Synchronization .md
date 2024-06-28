---
date: 2022-04-01
category:
  - Java
  - Concurrency
tag:
  - wait()
  - notify()
  - synchronization
head:
  - - meta
    - name: keywords
      content: Java, wait(), notify(), synchronization, thread communication
---
# 为什么wait()需要同步？ | Baeldung

## 1. 引言

在Java中，我们有一个wait()/notify() API。这个API是线程间同步的一种方式。为了使用这个API的方法，当前线程必须拥有被调用者的监视器。

在本教程中，我们将探讨为什么这个要求是有意义的。

## 2. wait()的工作原理

首先，我们需要简要讨论一下Java中wait()的工作原理。根据JLS，Java中每个对象都有一个监视器。基本上，这意味着我们可以对我们喜欢的任何对象进行同步。这可能不是一个很好的决定，但这就是我们现在所拥有的。

有了这个，当我们调用wait()时，我们隐式地做了两件事。首先，我们将当前线程放入JVM内部等待集，用于这个对象监视器。第二，一旦线程进入等待集，我们（或者说JVM）释放了这个对象的同步锁。在这里，我们需要澄清——这个词this指的是我们调用wait()方法的对象。

然后，当前线程就在这个集中等待，直到另一个线程调用notify()/notifyAll()来通知这个对象。

## 3. 为什么需要监视器所有权？

在前一节中，我们看到JVM做的第二件事是释放这个对象的同步锁。为了释放它，我们显然需要先拥有它。这样做的原因相对简单：**wait()上的同步是一个要求，以避免丢失唤醒问题**。这个问题本质上代表了一种条件，即我们有一个等待线程错过了notify信号。这主要是由于线程之间的竞态条件。让我们用一个例子来模拟这个问题。

假设我们有以下Java代码：

```java
private volatile boolean jobIsDone;

private Object lock = new Object();

public void ensureCondition() {
    while (!jobIsDone) {
        try {
            lock.wait();
        } catch (InterruptedException e) {
            // ...
        }
    }
}

public void complete() {
    jobIsDone = true;
    lock.notify();
}
```

快速说明一下——这段代码在运行时会因IllegalMonitorStateException而失败。这是因为，在两种方法中，我们在调用wait()/notify()之前都没有请求锁对象监视器。因此，这段代码纯粹是为了演示和学习目的。

另外，假设我们有两个线程。所以线程B正在做有用的工作。一旦完成，线程B需要调用complete()方法来发出完成信号。我们还有另一个线程A，正在等待由B执行的工作完成。线程A通过调用ensureCondition()方法来检查条件。由于Linux内核级别的伪唤醒问题，条件检查发生在循环中，但这是另一个话题。

## 4. 丢失唤醒问题

让我们一步一步地分解我们的例子。假设线程A调用了ensureCondition()并进入了while循环。它检查了一个条件，条件似乎是false，所以它进入了try块。因为我们在多线程环境中操作，另一个线程B可以同时进入complete()方法。因此，B可以在A调用wait()之前将volatile标志jobIsDone设置为true并调用notify()。

在这种情况下，如果线程B永远不会再次进入complete()，线程A将永远等待，因此，与它相关的所有资源也将永远存在。这不仅会导致死锁（如果线程A恰好持有另一个锁），还会导致内存泄漏，因为从线程A堆栈帧可达的对象将保持活动状态。这是因为线程A被认为是活动的，它可以恢复执行。因此，GC不允许垃圾收集A堆栈中分配的对象。

## 5. 解决方案

为了避免这种情况，我们需要同步。**因此，调用者在执行之前必须拥有被调用者的监视器**。让我们重写我们的代码，考虑到同步问题：

```java
private volatile boolean jobIsDone;
private final Object lock = new Object();

public void ensureCondition() {
    synchronized (lock) {
        while (!jobIsDone) {
            try {
                lock.wait();
            } catch (InterruptedException e) {
                // ...
            }
        }
    }
}

public void complete() {
    synchronized (lock) {
        jobIsDone = true;
        lock.notify();
    }
}
```

在这里，我们只添加了一个synchronized块，在调用wait()/notify() API之前，我们尝试获取锁对象监视器。现在，如果B在A调用wait()之前执行complete()方法，我们可以避免丢失唤醒。这是因为complete()方法只有在A没有获取锁对象监视器的情况下才能由B执行。因此，A不能在complete()方法执行时检查条件。

## 6. 结论

在本文中，我们讨论了为什么Java wait()方法需要同步。为了防止丢失唤醒异常，我们需要拥有被调用者的监视器的所有权。如果我们不这样做，JVM将采取快速失败的方法，并抛出IllegalMonitorStateException。

像往常一样，这些例子的源代码可以在GitHub上找到。