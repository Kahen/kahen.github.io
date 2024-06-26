---
date: 2023-09-01
category:
  - Java
  - I/O
tag:
  - System.out
  - flush
head:
  - - meta
    - name: keywords
      content: Java, System.out, flush, buffering, I/O, debugging
---
# Java中何时调用System.out.flush()？

1. 引言

Java语言的基本特性之一是_System.out_流，它通常用于生成控制台输出。无论是用来打印我们的第一个“Hello, World!”还是调试复杂的应用程序，我们很可能会用到_System.out_。

在本教程中，我们将讨论在Java中何时调用_System.out.flush()_。

2. 缓冲概念

缓冲是计算中的基本概念，特别是在I/O操作中。在输出流的上下文中，缓冲指的是在数据被写出之前暂时存储数据。一旦这个缓冲区达到其容量或被显式刷新，累积的数据将一次性被写出。

然而，这种缓冲机制有时会导致意外的行为。数据可能不会立即出现在预期的地方，从而导致潜在的混淆。**这就是理解_flush()_方法的作用变得至关重要的地方，确保必要时缓冲数据被写出。**

3. Java中刷新的基础知识

虽然缓冲提供了一种有效的方式来处理数据，但有时需要立即将缓冲的数据发送到其预定目的地，不管缓冲区是否已满。这个动作被称为刷新。

当处理输出流时，如果没有立即看到预期的输出，可能会感到困惑。这种延迟通常是由于缓冲数据尚未被写入其目的地。**刷新确保缓冲区中的任何数据立即被写出，为开发人员提供了他们输出的实时视图：**

Java提供了一个内置的机制来显式刷新输出流，即_flush()_方法。这个方法是_OutputStream_类及其子类的一部分，包括_System.out_背后的类型。**当被调用时，_flush()_方法确保流中的任何缓冲数据立即被写出：**

```java
public void flush() {
    if (lock != null) {
        lock.lock();
        try {
            implFlush();
        } finally {
            lock.unlock();
        }
    } else {
        synchronized (this) {
            implFlush();
        }
    }
}
```

4. 使用_System.out_进行刷新

_System.out_的行为由JVM的具体实现决定。在许多场景中，底层_PrintStream_配置为启用_autoFlush_。这种自动刷新是为什么开发人员通常不需要显式调用刷新操作的原因。

大多数写入方法都有一些对_autoflush_的检查。它们可能不同，但我们可以在_PrintStream.implWriteln()_中看到一般思路：

```java
private void implWriteln(char[] buf) throws IOException {
    ensureOpen();
    textOut.write(buf);
    textOut.newLine();
    textOut.flushBuffer();
    charOut.flushBuffer();
    if (autoFlush)
        out.flush();
}
```

然而，值得注意的是，某些JVM实现或框架可能提供自定义的_System.out_实现。例如，JUnit可能会禁用_autoFlush_以优化测试输出的显示。

**虽然一些来源讨论了_print_和_println_方法与刷新之间的关系的差异，但仔细查看_PrintStream_实现揭示了两者在自动刷新方面没有明显的行为差异。** 然而，正如前面提到的，我们应该检查_System.out_的实际实现以确定其行为。

5. 结论

对于许多开发人员来说，_System.out_在不需要深入了解其底层机制或刷新行为的复杂性的情况下无缝工作。然而，重要的是要记住，_System.out_的行为取决于平台的具体实现，这可能会引入变化。

虽然像“Hello, World”这样的基本应用程序不受缓冲和刷新细微差别的影响，但当我们进入更复杂的领域时，情况就不同了。在高级日志记录或测试框架等上下文中，修改默认实现或过度使用显式刷新操作可能会影响性能。始终谨慎行事，确保应用程序的性能保持最佳，同时实现所需的输出行为。