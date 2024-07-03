---
date: 2022-04-01
category:
  - Java
  - JVM
tag:
  - Call Stack
  - Stack Overflow
head:
  - - meta
    - name: keywords
      content: Java, JVM, Call Stack, Stack Overflow, Method Execution, Variable Scope, Recursive Functions, Deep Call Chains
---
# Java调用栈的最大深度是多少？

调用栈是Java中管理方法执行和变量作用域的关键数据结构。栈的深度，或者说它可以容纳的活动方法调用的数量，是处理递归函数或深层调用链时的一个重要考虑因素。

在本教程中，我们将探讨确定Java调用栈最大深度的技术。

## Java调用栈的理解

Java调用栈遵循后进先出（LIFO）结构。当一个方法被调用时，一个新的栈帧会被推到栈顶，包含参数、局部变量和返回地址等信息。一旦方法完成执行，它的栈就会被弹出。

每个线程分配的总栈大小决定了其调用栈可以容纳的数据量。默认的栈大小因JVM实现而异，但对于标准JVM来说，通常大约是1MB。

我们可以使用`-XX:+PrintFlagsFinal`参数检查我们的JVM的默认栈大小：

```shell
$ java -XX:+PrintFlagsFinal -version | grep ThreadStackSize
```

使用1MB的栈，我们可以在达到最大深度之前进行大约10000到20000次方法调用，假设每个栈帧使用大约100字节。关键是栈大小限制了调用栈可以增长的深度。

这里有一个故意溢出调用栈以确定其最大深度的示例：

```java
public class RecursiveCallStackOverflow {
    static int depth = 0;

    private static void recursiveStackOverflow() {
        depth++;
        recursiveStackOverflow();
    }

    public static void main(String[] args) {
        try {
            recursiveStackOverflow();
        } catch (StackOverflowError e) {
            System.out.println("Maximum depth of the call stack is " + depth);
        }
    }
}
```

`recursiveStackOverflow()`方法简单地递增一个计数器并递归地调用自己，直到栈溢出。通过捕获结果错误，我们可以打印出达到的深度。

当我们在标准JVM上测试时，这里是输出结果：

```
Maximum depth of the call stack is 21792
```

让我们使用`-XX:+PrintFlagsFinal`参数检查我们JVM的默认栈大小：

```shell
$ java -XX:+PrintFlagsFinal -version | grep ThreadStackSize

```

这里是我们JVM的默认线程栈大小：

```
intx ThreadStackSize = 1024
```

默认情况下，JVM为线程栈分配了1MB的大小。

我们可以通过使用`-Xss` JVM参数为线程分配更多的栈空间来增加最大深度：

```shell
$ java -Xss2m RecursiveCallStackOverflow
```

使用2MB的线程栈大小，这里是输出结果：

```
Maximum depth of the call stack is 49522
```

栈大小翻倍允许深度成比例地增加。

## 结论

在本文中，我们学习了如何通过递归调用方法来获取栈调用的最大深度。此外，我们还看到了JVM有一个默认的栈大小。通过分配更多的内存空间，可以增加栈调用的深度。

如常，示例的完整源代码可在GitHub上获得。