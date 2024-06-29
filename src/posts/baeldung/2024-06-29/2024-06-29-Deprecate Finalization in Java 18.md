---
date: 2022-04-01
category:
  - Java
tag:
  - Java 18
  - Finalization
head:
  - - meta
    - name: keywords
      content: Java 18 Finalization, JEP 421, Resource Leaks, Cleaner API
---
# Java 18 中废弃 Finalization 的讨论

在这篇教程中，我们将讨论 Java 尝试通过 Java 18 版本中的 JEP 421 废弃 `Object` 最终化的原因。我们还将讨论最终化的潜在替代品和更好的替代方案。

### 2.1. 资源泄漏
JVM 配备了垃圾收集（GC）机制，用于回收应用程序不再使用的对象的内存，或者没有更多引用指向该对象。然而，一些对象引用使用并代表其他底层资源，如操作系统级别的资源、本地内存块和打开的文件描述符。这些对象在关闭时应调用 `close()` 方法，以将底层资源释放回操作系统。

如果 GC 在对象有机会调用 `close()` 之前过早地清理了对象，操作系统就会认为该对象仍在使用中。这就是资源泄漏。

一个非常常见的例子是，当我们尝试读取文件并将代码包装在 try-catch 块中以处理异常时。我们将资源的优雅关闭包装在传统的 finally 块中。这不是一个完全可靠的解决方案，因为即使在 finally 块中也可能发生异常，导致资源泄漏：

```java
public void copyFileOperation() throws IOException {
    try {
        fis = new FileInputStream("input.txt");
        // 对文件执行操作

        fis.close();

    } finally {
        if (fis != null) {
            fis.close();
        }
    }
}
```

### 2.2. 对象的 `finalize()` 方法
Java 引入了最终化的概念来处理资源泄漏问题。`finalize()` 方法，也称为终结器，是 `Object` 类中的一个受保护的 void 方法，其目的是释放对象使用的任何资源。我们在类中重写该方法以执行资源关闭，以帮助 GC：

```java
public class MyFinalizableResourceClass {
    FileInputStream fis = null;

    public MyFinalizableResourceClass() throws FileNotFoundException {
        this.fis = new FileInputStream("file.txt");
    }

    public int getByteLength() throws IOException {
        return this.fis.readAllBytes().length;
    }

    @Override
    protected void finalize() throws Throwable {
        fis.close();
    }
}
```

当对象符合垃圾收集的条件时，如果对象被重写了 `finalize()` 方法，垃圾收集器将调用对象的 `finalize()` 方法。尽管在类中拥有 `finalize()` 方法来执行所有资源清理工作看起来是处理资源泄漏的好方法，但自 Java 9 以来，最终化本身已经被声明为废弃。最终化本身有几个根本性的缺陷。

## 3. 最终化的缺陷

### 3.1. 不可预测的执行
即使对象符合垃圾收集的条件，也没有保证对象的 `finalize()` 一定会被调用。同样，GC 在对象符合垃圾收集条件后调用对象的终结器可能会有不可预测的延迟。

终结器由 GC 计划运行，然而，垃圾收集是基于包括系统当前内存需求在内的参数进行的。如果因为有足够的空闲内存而暂停 GC，许多对象将在堆上等待它们的终结器被调用。这可能导致资源短缺。

### 3.2. 无约束的终结器代码
尽管 `finalize()` 方法的意图已经定义，但代码仍然是开发者可以采取的任何行动。这种缺乏控制可能会破坏终结器的目的。这也引入了对应用程序的安全威胁。恶意代码可以坐在终结器中，导致意外错误或以各种方式导致应用程序行为异常。

如果我们完全省略终结器，子类仍然可以为自己定义 `finalize()` 并访问格式不正确或反序列化的对象。子类也可能选择覆盖父类的终结器并注入恶意代码。

### 3.3. 性能开销
类中重写的 `finalize()` 增加了性能惩罚，因为 GC 需要跟踪所有具有终结器的类。GC 还需要在此类对象的生命周期中执行额外的步骤，特别是在对象创建和最终化期间。

有一些以吞吐量为导向的垃圾收集器，通过最小化垃圾收集的总体暂停时间来表现最佳。对于这样的垃圾收集器来说，终结器是一个劣势，因为它增加了暂停时间。

此外，`finalize()` 方法始终是启用的，即使不需要，GC 也会调用终结器。即使资源关闭的需求已经被处理，`finalize()` 操作也不能取消。

这导致了性能惩罚，因为它无论如何都会被调用，不管是否需要。

### 3.4. 没有线程保证
JVM 没有保证哪个线程将调用对象的终结器，也没有保证顺序。可能有未指定数量的终结器线程。如果应用程序线程比终结器线程更频繁地为对象分配资源，可能会导致资源短缺。

### 3.5. 确保终结器代码的正确性
通常很难编写正确的 `finalize()` 实现。由于终结器实现不当，也很容易编写破坏应用程序的代码。对象的 `finalize()` 方法必须记得使用 `super.finalize()` 调用其父类的 `finalize()`，而 JVM 本身并不提供。

由于终结器在未指定数量的线程上运行，可能会导致多线程环境中常见的问题，如死锁和其他线程问题。此外，当有多个类具有终结器时，会导致系统中的耦合增加。这些对象的终结化可能会产生相互依赖，一些对象可能会在堆中停留更长时间，等待依赖对象被终结化。

## 4. `try-with-resources` 作为替代技术
我们可以通过使用 Java 7 引入的 `try-with-resources` 构造来保证资源的 `close()` 方法被调用。这个框架是对 `try-catch-finally` 构造的改进，因为它确保所有异常都被正确处理，从而消除了对最终化的需求：

```java
public void readFileOperationWithTryWith() throws IOException {
    try (FileOutputStream fis = new FileOutputStream("input.txt")) {
        // 执行操作
    }
}
```

我们可以在 try-with 块中放入任意数量的资源初始化。让我们重写我们的类，不使用终结器：

```java
public class MyCloseableResourceClass implements AutoCloseable {
    private FileInputStream fis;
    public MyCloseableResourceClass() throws FileNotFoundException {
        this.fis = new FileInputStream("file.txt");
    }
    public int getByteLength() throws IOException {
        return this.fis.readAllBytes().length;
    }
    @Override
    public void close() throws IOException {
        this.fis.close();
    }
}
```

这里的唯一区别是 `AutoCloseable` 接口和重写的 `close()` 方法。现在我们可以安全地在 try-with 块中使用我们的资源对象，而不必担心资源泄漏：

```java
@Test
public void givenCloseableResource_whenUsingTryWith_thenShouldClose() throws IOException{
    int length = 0;
    try (MyCloseableResourceClass mcr = new MyCloseableResourceClass()) {
        length = mcr.getByteLength();
    }
    Assert.assertEquals(20, length);
}
```

## 5. Java 中的 Cleaner API

### 5.1. 使用 Cleaner API 创建资源类
Java 9 引入了 Cleaner API 的概念，用于释放长寿命资源。Cleaners 实现了 `Cleanable` 接口，并允许我们定义并注册针对对象的清理操作。

实现我们资源类的 Cleaner 需要三个步骤：

1. 获取 Cleaner 实例
2. 注册清理操作
3. 执行清理

我们定义的资源类将使用 Cleaner API 在使用后帮助我们清理资源：

```java
public class MyCleanerResourceClass implements AutoCloseable {
    private static Resource resource;
}
```

要获取 Cleaner 实例，我们调用 Cleaner 类上的静态 `create()` 方法：

```java
private static final Cleaner cleaner = Cleaner.create();
private final Cleaner.Cleanable cleanable;
```

我们还创建了一个 Cleanable 实例，它将帮助我们针对我的对象注册清理操作：

```java
public MyCleanerResourceClass() {
    resource = new Resource();
    this.cleanable = cleaner.register(this, new CleaningState());
}
```

Cleaner 的 `register()` 方法接受两个参数，它应该监控的用于清理的对象，以及用于清理的操作。我们这里传递了一个类型为 `java.lang.Runnable` 的 lambda 作为清理操作，它在 CleaningState 类中定义：

```java
static class CleaningState implements Runnable {
    CleaningState() {
        // 构造函数
    }

    @Override
    public void run() {
        // 一些清理操作
        System.out.println("Cleanup done");
    }
}
```

我们也重写了 `close()` 方法，因为我们实现了 AutoCloseable 接口。在 `close()` 方法中，我们在 cleanable 上调用 `clean()` 方法，并执行第三个也是最后一步。

```java
@Override
public void close() {
    // 执行关闭所有底层资源的操作
    this.cleanable.clean();
}
```

### 5.2. 测试 Cleaner 实现
现在我们已经为我们的资源类实现了 Cleaner API，让我们通过编写一个小测试来验证它：

```java
@Test
public void givenMyCleanerResource_whenUsingCleanerAPI_thenShouldClean() {
    assertDoesNotThrow(() -> {
        try (MyCleanerResourceClass myCleanerResourceClass = new MyCleanerResourceClass()) {
            myCleanerResourceClass.useResource();
        }
    });
}

// 注意，我们将资源类包装在 try-with 块中。运行测试时，我们可以在控制台看到两个语句：
```java
Using the resource
Cleanup done
```

### 5.3. Cleaner API 的优势
当对象符合清理条件时，Cleaner API 会自动清理资源。Cleaner API 试图解决上述提到的最终化大部分缺点。在 `finalize()` 中，我们可以编写代码使对象复活，使其不适合收集。Cleaner API 中不存在这个问题，因为 `CleaningState` 对象无法访问原始对象。

此外，Cleaner API 需要在对象创建完成后正确注册清理操作。因此，清理操作不能处理未正确初始化的对象。而且，这种清理操作是可取消的，与最终化不同。

最后，清理操作在单独的线程上运行，因此不干扰，并且清理操作抛出的异常会被 JVM 自动忽略。

## 6. 结论
在本文中，我们讨论了 Java 决定废弃最终化的原因。我们查看了最终化的问题，并探索了两种帮助资源清理的替代解决方案。

如常，本教程的源代码可以在 GitHub 上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/0f08492941896785c081f90c7a231caa?s=50&r=g)![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK