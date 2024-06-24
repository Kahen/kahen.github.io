---
date: 2024-06-24
category:
  - Java
  - Programming
tag:
  - Java
  - main method
  - static block
head:
  - - meta
    - name: keywords
      content: Java, main method, static block, JUnit, nested class
---
# 在Java中不使用main()方法在控制台打印消息

## 1. 引言

Java程序的执行始于_main()_方法。然而，在某些场景中，我们可能希望在不使用_main()_方法的情况下显示消息。

**在本教程中，我们将探讨完成此任务的一些方法。**

## 2. 使用静态代码块

静态代码块在类被加载到内存中时执行，这使得在不使用_main()_方法的情况下显示消息成为可能。

让我们看一个例子：

```java
public final class PrintMessageWithoutMainMethod {
    static {
        System.out.println("Hello World!!");
        System.exit(0);
    }
}
```

在这种情况下，无论_main()_方法是否为空或不存在，消息“Hello World!!”都会在类加载期间出现。此外，_System.exit(0)_方法会立即结束程序。

## 3. 使用内部类

我们也可以不使用main()方法，使用内部类来打印消息。让我们看看如何使用这种方法：

```java
public final class PrintMessageWithoutMainMethod {
    static {
        NestedClass.printMessage();
    }
    static class NestedClass {
        static void printMessage() {
            System.out.println("Message from nested class");
        }
    }
}
```

在这种情况下，外部类中的静态代码块调用了嵌套类中的静态方法，并输出了一条消息。

## 4. 在类初始化期间执行代码

在某些情况下，需要在类初始化期间执行某些方法。**请注意，这种方法在配置或执行只需要执行一次的初始化任务时非常有用。**

给定代码显示了在加载类时调用名为_getStatus()_的方法：

```java
public final class PrintMessageWithoutMainMethod {
    private static final int STATUS = getStatus();

    private static int getStatus() {
        System.out.println("Hello World!!");
        System.exit(0);
        return 0;
    }
}
```

在这种情况下，我们在类加载过程中调用_getStatus()_方法，并在控制台打印“Hello World!!”。

**我们应该小心使用这种方法，因为它会强制终止Java虚拟机(JVM)的执行。因此，如果需要干净地关闭，请寻找替代方案。**

## 5. 使用JUnit测试

除了上述方法，我们还可以使用JUnit测试来在控制台打印我们的消息，如下所示：

```java
public class PrintMessageWithoutMainUnitTest {
    @Test
    public void givenMessage_whenUsingJunitTest_thenPrintMessage() {
        System.out.println("Hello World!!");
    }
}
```

在这种情况下，我们创建了一个单元测试作为测试方法，它将“Hello World!!”打印到控制台。这不是_main()_方法的替代品，而是一种不同的实现方式，特别是在测试时。

## 6. 结论

总之，Java中还有其他不使用_main()_方法打印消息的方法。因此，本教程提供了几种解决这个问题的方法，例如使用静态代码块、在类初始化期间执行代码以及利用嵌套类。

如往常一样，本文的完整代码示例可以在GitHub上找到。