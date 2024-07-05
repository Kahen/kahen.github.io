---
date: 2022-04-01
category:
  - Java
  - Concurrency
tag:
  - Java
  - Singleton
  - Synchronized
  - AtomicBoolean
  - Static Initialization
head:
  - - meta
    - name: keywords
      content: Java, Method Execution, Singleton, Synchronized, AtomicBoolean, Static Initialization
---
# Java中仅执行一次方法

在本教程中，我们将探讨仅执行一次方法的不同方法。这在几种场景中都非常有用。例如，初始化单例实例的方法或执行一次性设置操作的方法。

我们将探索各种技术以确保方法只被调用一次。这些技术包括使用布尔变量和`synchronized`关键字、`AtomicBoolean`以及静态初始化块。此外，某些单元测试框架如JUnit和TestNG提供了注释，可以帮助仅执行一次方法。

## 2. 使用布尔值与Synchronized
我们的第一种方法是结合使用布尔标志和`synchronized`关键字。让我们看看如何实现它：

```java
class SynchronizedInitializer {
    static volatile boolean isInitialized = false;
    int callCount = 0;

    synchronized void initialize() {
        if (!isInitialized) {
            initializationLogic();
            isInitialized = true;
        }
    }

    private void initializationLogic() {
        callCount++;
    }
}
```

在这个实现中，我们最初将`isInitialized`标志设置为`false`。当第一次调用`initialize()`方法时，它检查标志是否为`false`。如果是，执行一次性初始化逻辑，并将标志设置为`true`。后续对`initialize()`方法的调用将看到标志已经是`true`，并且不会执行初始化逻辑。

同步确保一次只有一个线程可以执行initialize方法。这防止了多个线程同时执行初始化逻辑，可能引起竞态条件。我们需要`volatile`关键字以确保每个线程都读取更新后的布尔值。

我们可以通过以下测试来验证我们只执行了一次初始化：

```java
void givenSynchronizedInitializer_whenRepeatedlyCallingInitialize_thenCallCountIsOne() {
    SynchronizedInitializer synchronizedInitializer = new SynchronizedInitializer();
    assertEquals(0, synchronizedInitializer.callCount);

    synchronizedInitializer.initialize();
    synchronizedInitializer.initialize();
    synchronizedInitializer.initialize();

    assertEquals(1, synchronizedInitializer.callCount);
}
```

首先，我们创建一个`SynchronizedInitializer`的实例，并断言`callCount`变量是`0`。调用`initialize()`方法几次后，`callCount`增加到`1`。

## 3. 使用AtomicBoolean
执行方法的另一种方法是使用`AtomicBoolean`类型的原子变量。让我们看一个实现示例：

```java
class AtomicBooleanInitializer {
    AtomicBoolean isInitialized = new AtomicBoolean(false);
    int callCount = 0;

    void initialize() {
        if (isInitialized.compareAndSet(false, true)) {
            initializationLogic();
        }
    }

    private void initializationLogic() {
        callCount++;
    }
}
```

在这个实现中，使用`AtomicBoolean`构造函数将`isInitialized`变量最初设置为`false`。当我们第一次调用`initialize()`方法时，我们调用`compareAndSet()`方法，预期值为`false`，新值为`true`。如果`isInitialized`的当前值为`false`，该方法将将其设置为`true`并返回`true`。后续对`initialize()`方法的调用将看到`isInitialized`变量已经是`true`，并且不会执行初始化逻辑。

使用`AtomicBoolean`确保`compareAndSet()`方法是原子操作，这意味着一次只有一个线程可以修改`isInitialized`的值。这防止了竞态条件，并确保`initialize()`方法是线程安全的。

我们可以通过以下测试来验证我们只执行了`AtomicBooleanInitializer`的`initializationLogic()`方法一次：

```java
void givenAtomicBooleanInitializer_whenRepeatedlyCallingInitialize_thenCallCountIsOne() {
    AtomicBooleanInitializer atomicBooleanInitializer = new AtomicBooleanInitializer();
    assertEquals(0, atomicBooleanInitializer.callCount);

    atomicBooleanInitializer.initialize();
    atomicBooleanInitializer.initialize();
    atomicBooleanInitializer.initialize();

    assertEquals(1, atomicBooleanInitializer.callCount);
}
```

这个测试与我们之前看到的非常相似。

## 4. 使用静态初始化
静态初始化是另一种仅执行一次方法的方法：

```java
final class StaticInitializer {
    public static int CALL_COUNT = 0;

    static {
        initializationLogic();
    }

    private static void initializationLogic() {
        CALL_COUNT++;
    }
}
```

静态初始化块仅在类加载期间执行一次。它不需要额外的锁定。

我们可以通过以下测试来验证我们只调用了`StaticInitializer`的初始化方法一次：

```java
void whenLoadingStaticInitializer_thenCallCountIsOne() {
    assertEquals(1, StaticInitializer.CALL_COUNT);
}
```

因为静态初始化块已经在类加载期间被调用，`CALL_COUNT`变量已经设置为`1`。

```java
void whenInitializingStaticInitializer_thenCallCountStaysOne() {
    StaticInitializer staticInitializer = new StaticInitializer();
    assertEquals(1, StaticInitializer.CALL_COUNT);
}
```

创建`StaticInitializer`的新实例时，`CALL_COUNT`仍然是`1`。我们不能再调用静态初始化块。

## 5. 使用单元测试框架
JUnit和TestNG提供了注释，以仅运行一次设置方法。在JUnit中，使用`@BeforeAll`注释，而在TestNG或旧版本的JUnit中，我们可以使用`@BeforeClass`注释来仅执行一次方法。

这里是一个JUnit设置方法的示例：

```java
@BeforeAll
static void setup() {
    log.info("@BeforeAll - executes once before all test methods in this class");
}
```

## 6. 结论
在本文中，我们学习了如何确保我们只执行一次方法的不同方法。我们在不同的场景中需要这样做，例如初始化数据库连接。

我们看到的方法利用了锁定、`AtomicBoolean`和静态初始化器。还可以使用单元测试框架仅运行一次方法。

如常，所有这些示例的实现都可以在GitHub上找到。