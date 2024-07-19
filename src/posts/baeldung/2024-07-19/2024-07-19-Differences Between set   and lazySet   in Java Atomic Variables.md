---
date: 2022-04-01
category:
  - Java
  - Concurrency
tag:
  - Java
  - Atomic Variables
  - set()
  - lazySet()
head:
  - - meta
    - name: keywords
      content: Java, Atomic Variables, set(), lazySet()
------
# Java 中原子变量的 set() 和 lazySet() 方法的区别

## 1. 概述

在本教程中，我们将探讨 Java 中如 AtomicInteger 和 AtomicReference 等原子类的方法 _set()_ 和 _lazySet()_ 之间的区别。

## 2. 原子变量——快速回顾

**Java 中的原子变量允许我们轻松地在类引用或字段上执行线程安全的操作，而无需添加诸如监视器或互斥锁等并发原语。**

它们定义在 _java.util.concurrent.atomic_ 包下，尽管它们的 API 根据原子类型不同而有所不同，但大多数都支持 _set()_ 和 _lazySet()_ 方法。

为了简化事情，我们将在本文中使用 _AtomicReference_ 和 _AtomicInteger_，但相同的原理适用于其他原子类型。

## 3. _set()_ 方法

**_set()_ 方法等同于写入一个 _volatile_ 字段。**

调用 _set()_ 后，当我们从不同线程使用 _get()_ 方法访问该字段时，更改会立即可见。这意味着该值已从 CPU 缓存刷新到所有 CPU 核心共享的内存层。

为了展示上述功能，让我们创建一个最小的生产者-消费者控制台应用程序：

```java
public class Application {

    AtomicInteger atomic = new AtomicInteger(0);

    public static void main(String[] args) {
        Application app = new Application();
        new Thread(() -> {
            for (int i = 0; i `< 10; i++) {
                app.atomic.set(i);
                System.out.println("Set: " + i);
                Thread.sleep(100);
            }
        }).start();

        new Thread(() ->` {
            for (int i = 0; i < 10; i++) {
                synchronized (app.atomic) {
                    int counter = app.atomic.get();
                    System.out.println("Get: " + counter);
                }
                Thread.sleep(100);
            }
        }).start();
    }
}
```

在控制台中，我们应该看到一系列“Set”和“Get”消息：

```
Set: 3
Set: 4
Get: 4
Get: 5
```

**这表明缓存一致性的事实是“Get”语句中的值始终等于或大于它们上面的“Set”语句中的值。**

这种行为虽然非常有用，但会带来性能损失。如果我们不需要缓存一致性，能够避免这种情况就好了。

## 4. _lazySet()_ 方法

_ _lazySet()_ 方法与 _set()_ 方法相同，但没有缓存刷新。

**换句话说，我们的更改最终只会对其他线程可见。** **这意味着从不同线程调用更新后的 _AtomicReference_ 的 _get()_ 可能会给我们旧的值。**

让我们通过更改我们之前控制台应用程序中的第一个线程的 _Runnable_ 来看看这在实际操作中的表现：

```java
for (int i = 0; i < 10; i++) {
    app.atomic.lazySet(i);
    System.out.println("Set: " + i);
    Thread.sleep(100);
}
```

新的“Set”和“Get”消息可能不总是递增的：

```
Set: 4
Set: 5
Get: 4
Get: 5
```

由于线程的性质，我们可能需要多次运行应用程序才能触发这种行为。即使生产者线程已将 _AtomicInteger_ 设置为 5，消费者线程首先检索到值 4 意味着当使用 _lazySet()_ 时，系统最终是一致的。

**用更技术性的术语来说，我们说 _lazySet()_ 方法不作为代码中的 happens-before 边缘，与其 _set()_ 对应物相反。**

## 5. 何时使用 _lazySet()_

由于其与 _set()_ 的差异微妙，我们并不清楚何时应该使用 _lazySet()_。我们需要仔细分析问题，不仅要确保我们能够获得性能提升，还要确保在多线程环境中的正确性。

**我们可以使用它的一种方式是在我们不再需要它时，用 _null_ 替换对象引用。** 这样，我们表明该对象有资格进行垃圾回收，而不会产生任何性能损失。我们假设其他线程可以继续使用过时的值，直到它们看到 _AtomicReference_ 是 _null_。

通常，**当我们想要对原子变量进行更改，并且我们知道更改不需要立即对其他线程可见时，我们应该使用 _lazySet()_。**

## 6. 结论

在本文中，我们查看了原子类中 _set()_ 和 _lazySet()_ 方法的区别。我们还学习了何时使用哪种方法。

如往常一样，示例的源代码可以在 GitHub 上找到。