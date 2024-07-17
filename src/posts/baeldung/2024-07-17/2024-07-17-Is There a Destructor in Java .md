---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Destructor
  - Garbage Collection
  - Finalizer
  - AutoCloseable
  - Cleaner
head:
  - - meta
    - name: keywords
      content: Java, Destructor, Garbage Collection, Finalizer, AutoCloseable, Cleaner
------
# Java中有析构函数吗？

## 1. 概述

在这篇简短的教程中，我们将探讨在Java中销毁对象的可能性。

每次我们创建一个对象时，Java会自动在堆上分配内存。同样，当一个对象不再需要时，内存也会自动被释放。

在像C这样的语言中，当我们在内存中完成使用一个对象时，我们必须手动释放它。不幸的是，**Java不支持手动内存释放**。此外，Java编程语言的一个特性是它自己通过一种称为垃圾回收的技术来处理对象的销毁。

## 3. 垃圾回收

垃圾回收从堆内存中移除未使用的对象。它有助于防止内存泄漏。简单来说，当没有更多的引用指向特定对象，并且对象不再可访问时，垃圾回收器会将此对象标记为不可达并回收其空间。

如果不正确处理垃圾回收，可能会导致性能问题，最终导致应用程序耗尽内存。

当对象达到不再在程序中可访问的状态时，它可以被垃圾回收。一个对象不再可访问时，会发生以下两种情况之一：
- 对象没有任何引用指向它
- 对象的所有引用都已经超出作用域

Java包括_System.gc()_方法来帮助支持垃圾回收。通过调用此方法，我们可以建议JVM运行垃圾回收器。然而，我们不能保证JVM实际上会调用它。JVM可以自由地忽略请求。

## 4. 终结器

Object类提供了_finalize()_方法。在垃圾回收器从内存中移除对象之前，它会调用_finalize()_方法。该方法可以运行零次或一次。然而，它不能为同一个对象运行两次。

在_Object_类中定义的_finalize()_方法不执行任何特殊操作。

**终结器的主要目标是在对象从内存中移除之前释放对象使用的资源**。例如，我们可以重写该方法来关闭数据库连接或其他资源。

让我们创建一个包含_BufferedReader_实例变量的类：

```java
class Resource {
    final BufferedReader reader;

    public Resource(String filename) throws FileNotFoundException {
        reader = new BufferedReader(new FileReader(filename));
    }

    public long getLineNumber() {
        return reader.lines().count();
    }
}
```

在我们的示例中，我们没有关闭我们的资源。我们可以在_finalize()_方法中关闭它们：

```java
@Override
protected void finalize() {
    try {
        reader.close();
    } catch (IOException e) {
        // ...
    }
}
```

当JVM调用_finalize()_方法时，_BufferedReader_资源将被释放。_finalize()_方法抛出的异常将停止对象的最终化。

**然而，从Java 9开始，_finalize()_方法已经被弃用**。使用_finalize()_方法可能会令人困惑且难以正确使用。

如果我们想释放对象持有的资源，我们应该考虑实现_AutoCloseable_接口。类如_Cleaner_和_PhantomReference_提供了一种更灵活的方式来管理对象变得不可达时的资源。

### 4.1. 实现_AutoCloseable_

_AutoCloseable_接口提供了_close()_方法，该方法将在退出_try-with-resources_块时自动执行。在这个方法中，我们可以关闭对象使用的资源。

让我们修改我们的示例类以实现_AutoCloseable_接口：

```java
class Resource implements AutoCloseable {

    final BufferedReader reader;

    public Resource(String filename) throws FileNotFoundException {
        reader = new BufferedReader(new FileReader(filename));
    }

    public long getLineNumber() {
        return reader.lines().count();
    }

    @Override
    public void close() throws Exception {
        reader.close();
    }
}
```

我们可以使用_close()_方法来关闭我们的资源，而不是使用_finalize()_方法。

### 4.2. _Cleaner_类

如果我们想在对象变得幻影可达时执行特定操作，我们可以使用_Cleaner_类。换句话说，当对象被最终化并且其内存准备被释放时。

现在，让我们看看如何使用_Cleaner_类。首先，让我们定义_Cleaner_：

```java
Cleaner cleaner = Cleaner.create();
```

接下来，我们将创建一个包含清理器引用的类：

```java
class Order implements AutoCloseable {

    private final Cleaner cleaner;

    public Order(Cleaner cleaner) {
        this.cleaner = cleaner;
    }
}
```

其次，我们将在_Order_类中定义一个实现_Runnable_的静态内部类：

```java
static class CleaningAction implements Runnable {

    private final int id;

    public CleaningAction(int id) {
        this.id = id;
    }

    @Override
    public void run() {
        System.out.printf("Object with id %s is garbage collected. %n", id);
    }
}
```

我们的内部类的实例将代表清理操作。我们应该注册每个清理操作，以便它们在对象变得幻影可达后运行。

我们应该考虑不使用lambda表达式作为清理操作。通过使用lambda，我们可能会无意中捕获对象引用，阻止对象变得幻影可达。使用静态嵌套类，如上所示，将避免保留对象引用。

让我们在_Order_类中添加_Cleanable_实例变量：

```java
private Cleaner.Cleanable cleanable;
```

_Cleanable_实例表示包含清理操作的清理对象。

接下来，让我们创建一个方法来注册清理操作：

```java
public void register(Product product, int id) {
    this.cleanable = cleaner.register(product, new CleaningAction(id));
}
```

最后，让我们实现_close()_方法：

```java
public void close() {
    cleanable.clean();
}
```

_clean()_方法将注销可清理对象并调用注册的清理操作。此方法最多只会被调用一次，无论clean方法被调用多少次。

当我们在_try-with-resources_块中使用我们的_CleaningExample_实例时，_close()_方法将调用清理操作：

```java
final Cleaner cleaner = Cleaner.create();
try (Order order = new Order(cleaner)) {
    for (int i = 0; i < 10; i++) {
        order.register(new Product(i), i);
    }
} catch (Exception e) {
    System.err.println("Error: " + e);
}
```

在其他情况下，清理器将在实例变得幻影可达时调用_clean()_方法。

此外，清理器在_System.exit()_期间的行为是实现特定的。Java不保证清理操作是否会被调用。 

## 5. 结论

在这篇简短的教程中，我们探讨了Java中对象销毁的可能性。总结一下，Java不支持手动对象销毁。然而，我们可以使用_finalize()_或_Cleaner_来释放对象持有的资源。如往常一样，示例的源代码可以在GitHub上找到。