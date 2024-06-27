---
date: 2024-06-27
category:
  - Java
  - Concurrency
tag:
  - Java
  - Synchronization
  - Thread
head:
  - - meta
    - name: keywords
      content: Java, Synchronization, Static Variable, Thread, Concurrency
---
# 在不同线程中同步静态变量

在Java中，需要同步访问静态变量的情况并不少见。在这个简短的教程中，我们将探讨几种在不同线程之间同步访问静态变量的方法。

## 2. 关于静态变量

作为快速回顾，**静态变量属于类而不是类的实例**。这意味着类的所有实例都具有变量的相同状态。

例如，考虑一个带有静态变量的_Employee_类：

```java
public class Employee {
    static int count;
    int id;
    String name;
    String title;
}
```

在这种情况下，_count_变量是静态的，表示曾经在公司工作过的员工总数。无论我们创建多少_Employee_实例，它们都将共享_count_的相同值。

然后，我们可以在构造函数中添加代码以确保每次有新员工时跟踪计数：

```java
public Employee(int id, String name, String title) {
    count = count + 1;
    // ...
}
```

虽然这种方法很直接，但在我们想要读取_count_变量时**可能存在问题**。这在多线程环境中尤其如此，特别是当有多个_Employee_类的实例时。

下面，我们将看到不同的方式来同步对_count_变量的访问。

## 3. 使用_synchronized_关键字同步静态变量

我们可以通过使用Java的_synchronized_关键字来同步我们的静态变量。我们有几种方式可以使用这个关键字来访问我们的静态变量。

首先，我们可以创建一个使用_synchronized_关键字作为修饰符的静态方法：

```java
public Employee(int id, String name, String title) {
    incrementCount();
    // ...
}

private static synchronized void incrementCount() {
    count = count + 1;
}

public static synchronized int getCount() {
    return count;
}
```

**在这种情况下，_synchronized_关键字锁定在类对象上，因为变量是静态的**。这意味着无论我们创建多少_Employee_实例，只要它们使用这两个静态方法，一次只能有一个访问变量。

其次，我们可以使用_synchronized_块来显式地同步在类对象上：

```java
private static void incrementCount() {
    synchronized(Employee.class) {
        count = count + 1;
    }
}

public static int getCount() {
    synchronized(Employee.class) {
        return count;
    }
}
```

请注意，**这在功能上等同于第一个示例**，但代码更加明确。

最后，我们还可以使用一个特定的对象实例的_synchronized_块，而不是类：

```java
private static final Object lock = new Object();

public Employee(int id, String name, String title) {
    incrementCount();
    // ...
}

private static void incrementCount() {
    synchronized(lock) {
        count = count + 1;
    }
}

public static int getCount() {
    synchronized(lock) {
        return count;
    }
}
```

这种方法有时更受欢迎的原因是锁定是我们类的私有。在第一个示例中，**可能存在我们无法控制的其他代码也锁定我们的类**。使用私有锁定，我们可以完全控制它的使用方式。

Java _synchronized_关键字只是同步访问静态变量的一种方式。下面，我们将看看Java API，它们也可以提供对静态变量的同步。

## 4. 同步静态变量的Java API

Java编程语言提供了几种API，可以帮助进行同步。让我们看看其中的两个。

### 4.1. 原子包装器

在Java 1.5中引入的_AtomicInteger_类是同步访问我们静态变量的替代方式。**这个类提供了原子的读写操作，确保所有线程对底层值的一致视图**。

例如，我们可以使用_AtomicInteger_类型而不是_int_重写我们的_Employee_类：

```java
public class Employee {
    private final static AtomicInteger count = new AtomicInteger(0);

    public Employee(int id, String name, String title) {
        count.incrementAndGet();
    }

    public static int getCount() {
        count.get();
    }
}
```

除了_AtomicInteger_之外，**Java还为_long_和_boolean_以及引用类型提供了原子包装器**。所有这些包装器类都是同步访问静态数据的极好工具。

### 4.2. 可重入锁

同样在Java 1.5中引入的_ReentrantLock_类是我们可以用于同步访问静态数据的另一种机制。**它提供了与我们之前使用的_synchronized_关键字相同的基本行为和语义，但具有额外的功能**。

让我们看看我们的_Employee_类如何使用_ReentrantLock_而不是_int_：

```java
public class Employee {
    private static int count = 0;
    private static final ReentrantLock lock = new ReentrantLock();

    public Employee(int id, String name, String title) {
        lock.lock();
        try {
            count = count + 1;
        }
        finally {
            lock.unlock();
        }

        // 设置字段
    }

    public static int getCount() {
        lock.lock();
        try {
            return count;
        }
        finally {
            lock.unlock();
        }
    }
}
```

关于这种方法有几点需要注意。首先，它比其他方法更冗长。**每次访问共享变量时，我们必须确保在访问之前正确锁定并在访问后解锁**。如果我们在访问共享静态变量的每个地方都忘记执行这个序列，这可能导致程序员错误。

此外，类的文档建议使用_try_/ _finally_块来正确锁定和解锁。这增加了额外的代码行和冗余，以及更多可能的程序员错误，如果我们在所有情况下都忘记这样做。

尽管如此，_ReentrantLock_类提供了_synchronized_关键字之外的额外行为。除其他外，**它允许我们设置公平性标志并查询锁的状态，以获得等待它的线程数量的详细视图**。

## 5. 结论

在本文中，我们探讨了几种不同的方式来同步不同实例和线程对静态变量的访问。我们首先看了Java _synchronized_关键字，并看到了如何将其作为方法修饰符和静态代码块使用的例子。

然后，我们看了Java并发API的两个特性：_AtomicInteger_和_ReentrantLock_。**这两个API都提供了同步访问共享数据的方法，并提供了_synchronized_关键字之外的一些额外好处**。

所有上述示例都可以在GitHub上找到。