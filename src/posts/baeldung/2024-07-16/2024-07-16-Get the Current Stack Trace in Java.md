---
date: 2022-04-01
category:
  - Java
  - 异常处理
tag:
  - Stack Trace
  - Thread
  - Throwable
head:
  - - meta
    - name: keywords
      content: Java, Stack Trace, Thread, Throwable, 异常处理
---
# 获取Java当前堆栈跟踪

作为一个Java开发者，在处理异常时经常会遇到堆栈跟踪的概念。

在本教程中，**我们将理解堆栈跟踪是什么以及如何在编程/调试中使用它。** 此外，我们还将了解_StackTraceElement_类。最后，我们将学习如何使用_Thread_和_Throwable_类来获取它。

## 2. 什么是堆栈跟踪？

**堆栈跟踪，也称为回溯，是堆栈帧的列表。** 简单来说，这些帧代表了程序执行过程中的一个时刻。

一个堆栈帧**包含了代码调用的方法的信息**。它是从当前方法开始，一直延伸到程序开始时的一系列帧。

为了更好地理解这一点，让我们看一个快速示例，我们在异常后转储了当前的堆栈跟踪：

```java
public class DumpStackTraceDemo
{
    public static void main(String[] args) {
        methodA();
    }

    public static void methodA() {
        try {
            int num1 = 5/0; // java.lang.ArithmeticException: divide by zero
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

在上面的示例中，_methodA()_抛出了_ArithmeticException_，这反过来在_catch_块中转储了当前的堆栈跟踪：

```
java.lang.ArithmeticException: / by zero
at main.java.com.baeldung.tutorials.DumpStackTraceDemo.methodA(DumpStackTraceDemo.java:11)
at main.java.com.baeldung.tutorials.DumpStackTraceDemo.main(DumpStackTraceDemo.java:6)
```

## **3. _StackTraceElement_ 类**

**堆栈跟踪由_StackTraceElement_类的元素组成。** 我们可以使用以下方法分别获取类和方法名称：

- _getClassName_ – 返回包含当前执行点的类的完全限定名称。
- _getMethodName_ – 返回表示此堆栈跟踪元素的执行点的方法名称。

我们可以在Java API文档中看到_StackTraceElement_类的完整方法列表及其详细信息。

## 4. 使用_Thread_类获取堆栈跟踪

我们可以通过在_Thread_实例上调用_getStackTrace()_方法来从线程获取堆栈跟踪。它返回一个_StackTraceElement_数组，从中可以找到线程的堆栈帧的详细信息。

让我们看一个示例：

```java
public class StackTraceUsingThreadDemo {

    public static void main(String[] args) {
        methodA();
    }

    public static StackTraceElement[] methodA() {
        return methodB();
    }

    public static StackTraceElement[] methodB() {
        Thread thread = Thread.currentThread();
        return thread.getStackTrace();
    }
}
```

在上面的类中，方法调用的方式如下 – _main() -> methodA() -> methodB() -> getStackTrace()_。

让我们通过以下测试用例来验证它，其中测试用例方法调用_methodA()_：

```java
@Test
public void whenElementIsFetchedUsingThread_thenCorrectMethodAndClassIsReturned() {
    StackTraceElement[] stackTrace = new StackTraceUsingThreadDemo().methodA();

    StackTraceElement elementZero = stackTrace[0];
    assertEquals("java.lang.Thread", elementZero.getClassName());
    assertEquals("getStackTrace", elementZero.getMethodName());

    StackTraceElement elementOne = stackTrace[1];
    assertEquals("com.baeldung.tutorials.StackTraceUsingThreadDemo", elementOne.getClassName());
    assertEquals("methodB", elementOne.getMethodName());

    StackTraceElement elementTwo = stackTrace[2];
    assertEquals("com.baeldung.tutorials.StackTraceUsingThreadDemo", elementTwo.getClassName());
    assertEquals("methodA", elementTwo.getMethodName());

    StackTraceElement elementThree = stackTrace[3];
    assertEquals("test.java.com.baeldung.tutorials.CurrentStacktraceDemoUnitTest", elementThree.getClassName());
    assertEquals("whenElementIsFetchedUsingThread_thenCorrectMethodAndClassIsReturned", elementThree.getMethodName());
}
```

在上面的测试用例中，我们使用_StackTraceUsingThreadDemo_类的_methodB()_获取了_StackTraceElement_数组。然后，使用_StackTraceElement_类的_getClassName()_和_getMethodName()_方法验证了堆栈跟踪中的方法和类名称。

## 5. 使用_Throwable_类获取堆栈跟踪

当任何Java程序抛出_Throwable_对象时，我们可以通过调用_getStackTrace()_方法而不是简单地将其打印到控制台或记录它，来获得一个_StackTraceElement_对象数组。

让我们看一个示例：

```java
public class StackTraceUsingThrowableDemo {

    public static void main(String[] args) {
        methodA();
    }

    public static StackTraceElement[] methodA() {
        try {
            methodB();
        }
        catch (Throwable t) {
            return t.getStackTrace();
        }
        return null;
    }

    public static void methodB() throws Throwable {
        throw new Throwable("A test exception");
    }
}
```

这里，方法调用的方式如下 – _main() -> methodA() -> methodB() -> getStackTrace()_。

让我们使用一个测试来验证它：

```java
@Test
public void whenElementIsFecthedUsingThrowable_thenCorrectMethodAndClassIsReturned() {
    StackTraceElement[] stackTrace = new StackTraceUsingThrowableDemo().methodA();

    StackTraceElement elementZero = stackTrace[0];
    assertEquals("com.baeldung.tutorials.StackTraceUsingThrowableDemo", elementZero.getClassName());
    assertEquals("methodB", elementZero.getMethodName());

    StackTraceElement elementOne = stackTrace[1];
    assertEquals("com.baeldung.tutorials.StackTraceUsingThrowableDemo", elementOne.getClassName());
    assertEquals("methodA", elementOne.getMethodName());

    StackTraceElement elementThree = stackTrace[2];
    assertEquals("test.java.com.baeldung.tutorials.CurrentStacktraceDemoUnitTest", elementThree.getClassName());
    assertEquals("whenElementIsFecthedUsingThrowable_thenCorrectMethodAndClassIsReturned", elementThree.getMethodName());
}
```

在上面的测试用例中，我们使用_StackTraceUsingThrowableDemo_类的_methodB()_获取了_StackTraceElement_数组。然后，验证了方法和类名称以理解_StackTraceElement_类数组中元素的顺序。

## 6. 结论

在本文中，我们学习了Java堆栈跟踪以及如何在异常情况下使用_printStackTrace()_方法来打印它。我们还查看了如何使用_Thread_和_Throwable_类获取当前堆栈跟踪。

如往常一样，本文的完整代码示例可以在GitHub上找到。