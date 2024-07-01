---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Thread
  - Execution Control
head:
  - - meta
    - name: keywords
      content: Java, Thread, Execution Control, Break, Return, System.exit()
------
# 在Java中停止执行更多代码

## 1. 概述

我们知道在Java中可以在特定的时间持续后停止执行。有时，我们可能希望在满足某些条件时停止执行更多的代码。在本教程中，我们将探索这个问题的不同解决方案。

## 2. 问题介绍

在某些情况下，停止进一步执行代码可能很有用，例如我们想要终止一个长时间运行的过程，中断一个正在运行的_线程_，或处理异常情况。这增强了我们程序的控制和灵活性。

**停止进一步执行代码可以提高资源利用效率，允许适当的错误处理，并允许优雅地处理意外情况。** 这在以下领域中非常有用：

- 高效的CPU利用
- 内存管理
- 文件和I/O资源
- 电源管理

一个例子可能是在后台运行一个_线程_。我们知道，从计算的角度来看，创建和运行一个_线程_成本很高。当我们不再需要一个后台_线程_时，我们应该中断并停止它以节省计算资源：

```java
@Override
public void run() {
    while (!isInterrupted()) {
        if (isInterrupted()) {
            break;
        }
        // 复杂计算
    }
}
```

## 3. 使用_return_语句

*数学上，非负整数n的阶乘，表示为n!，是从1到n的所有正整数的乘积。* 阶乘函数可以递归定义：

```java
n! = n * (n - 1)!
0! = 1
```

下面的_calculateFactorial(n)_方法计算小于或等于_n_的所有正整数的乘积：

```java
int calculateFactorial(int n) {
    if (n `<= 1) {
        return 1; // 基本情况
    }
    return n * calculateFactorial(n - 1);
}
```

在这里，我们使用_return_语句作为这个递归函数的基本情况。如果_n_是_1_或更小，函数返回_1_。但如果_n_大于或等于_2_，函数计算阶乘并返回值。

_return_语句的另一个例子可以是下载文件。如果_download()_方法中的_fileUrl_和_destinationPath_是_null_或为空，则停止执行更多的代码：

```java
void download(String fileUrl, String destinationPath) throws MalformedURLException {
    if (fileUrl == null || fileUrl.isEmpty() || destinationPath == null || destinationPath.isEmpty()) {
        return;
    }
    // 执行下载
    URL url = new URL(fileUrl);
    try (InputStream in = url.openStream(); FileOutputStream out = new FileOutputStream(destinationPath)) {
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) != -1) {
            out.write(buffer, 0, bytesRead);
        }
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
```

## 4. 在循环中使用_break_语句

要计算数组的总和，我们可以使用一个简单的Java_for_循环。**但是当数组中有一个负值时，该方法停止计算数组的进一步值，并且_break_语句终止循环。** 结果是，控制流被重定向到_for循环_结束后的立即语句：

```java
int calculateSum(int[] x) {
    int sum = 0;
    for (int i = 0; i < 10; i++) {
        if (x[i] < 0) {
            break;
        }
        sum += x[i];
    }
    return sum;
}
```

要退出循环的特定迭代，我们可以使用_break_语句退出循环的作用域：

```java
@Test
void givenArrayWithNegative_whenStopExecutionInLoopCalled_thenSumIsCalculatedIgnoringNegatives() {
    StopExecutionFurtherCode stopExecutionFurtherCode = new StopExecutionFurtherCode();
    int[] nums = { 1, 2, 3, -1, 1, 2, 3 };
    int sum = stopExecutionFurtherCode.calculateSum(nums);
    assertEquals(6, sum);
}
```

## 5. 在标记循环中使用_break_语句

**一个标记的_break_终止外层循环。** 一旦外层循环完成其迭代，程序的执行自然地移动到随后的语句。

这里，_processLines()_方法接受一个_String_数组并打印该行。然而，当程序在数组中遇到_stop_时，它停止打印该行，并使用_break_语句退出标记循环的作用域：

```java
int processLines(String[] lines) {
    int statusCode = 0;
    parser:
    for (String line : lines) {
        System.out.println("Processing line: " + line);
        if (line.equals("stop")) {
            System.out.println("Stopping parsing...");
            statusCode = -1;
            break parser; // 停止解析并退出循环
        }
        System.out.println("Line processed.");
    }
    return statusCode;
}
```

## 6. 使用_System.exit()_

要停止执行更多的代码，我们可以使用一个标志变量。**_System.exit(0)_通常用于以退出状态_0_终止当前运行的Java程序。**

在这里，我们使用条件语句来确定程序是否应该继续运行或终止：

```java
public class StopExecutionFurtherCode {

    boolean shouldContinue = true;

    int performTask(int a, int b) {
        if (!shouldContinue) {
            System.exit(0);
        }
        return a + b;
    }

    void stop() {
        this.shouldContinue = false;
    }
}
```

如果_shouldContinue_为_false_，我们在达到_return_语句之前使用_System.exit(0)_终止程序。

如果使用参数_10_和_20_调用_performTask()_方法，并且_shouldContinue_状态为_false_，则程序停止执行。而不是给出数字的总和，这个方法终止程序：

```java
StopExecutionFurtherCode stopExecution = new StopExecutionFurtherCode();
stopExecution.stop();
int performedTask = stopExecution.performTask(10, 20);
```

在批量处理中有很多长时间运行的任务。我们可以在完成批处理后通知操作系统状态。当我们使用_System.exit(statusCode)_时，操作系统可以确定关机是正常还是异常。我们可以使用_System.exit(0)_进行正常关机，使用_System.exit(1)_进行异常关机。

## 7. 使用_Exception_

**异常是应用程序面临的意外错误或异常条件，需要适当处理。** 了解错误和异常至关重要。在这个例子中，我们需要泛型来检查参数类型。如果参数类型是_Number_，我们使用_Exception_来停止方法的执行：

```java
<T>` T stopExecutionUsingException(T object) {
    if (object instanceof Number) {
        throw new IllegalArgumentException("Parameter can not be number.");
    }
    T upperCase = (T) String.valueOf(object).toUpperCase(Locale.ENGLISH);
    return upperCase;
}
```

在这里，我们可以看到每当我们传递一个_Number_作为参数时，它就会抛出一个_Exception_。另一方面，如果我们传递_String_作为输入参数，它将返回给定_S_string_的大写：

```java
@Test
void givenName_whenStopExecutionUsingExceptionCalled_thenNameIsConvertedToUpper() {
    StopExecutionFurtherCode stopExecutionFurtherCode = new StopExecutionFurtherCode();
    String name = "John";
    String result1 = stopExecutionFurtherCode.stopExecutionUsingException(name);
    assertEquals("JOHN", result1);
    try {
        Integer number1 = 10;
        assertThrows(IllegalArgumentException.class, () -> {
            int result = stopExecutionFurtherCode.stopExecutionUsingException(number1);
        });
    } catch (Exception e) {
        Assert.fail("Unexpected exception thrown: " + e.getMessage());
    }
}
```

在这个例子中，我们使用了Java泛型的基础。泛型对于类型安全、编译时类型检查、集合框架等都很有用。

## 8. 在_Thread_中使用_interrupt()_方法

让我们创建一个名为_InterruptThread_的类，使用运行中的线程中的_interrupt()_方法。

**当一个线程被中断时，它设置了线程的中断标志，表示已请求它停止。** 如果线程接收到中断信号，它在程序中的_while循环_作用域停止：

```java
class InterruptThread extends Thread {
    @Override
    public void run() {
        while (!isInterrupted()) {
            break;
            // 业务逻辑
        }
    }
}
```

我们需要使用_start()_方法启动一个线程，并暂停程序2000ms。然后使用_interrupt()_信号停止_while循环_中的执行并停止线程：

```java
@Test
void givenThreadRunning_whenInterruptCalled_thenThreadExecutionIsStopped() throws InterruptedException {
    InterruptThread stopExecution = new InterruptThread();
    stopExecution.start();
    Thread.sleep(2000);
    stopExecution.interrupt();
    stopExecution.join();
    assertTrue(!stopExecution.isAlive());
}
```

## 9. 结论

在本文中，我们探讨了在Java程序中停止进一步执行代码的多种编程方式。要停止程序的执行，我们可以使用_System.exit(0)_进行立即终止。或者，_return_和_break_语句有助于退出特定的方法或循环，而异常允许中断代码执行。

正如往常一样，本文的完整代码示例可以在GitHub上找到。

[![Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)](https://www.baeldung.com/)
[![Gravatar Profile](https://secure.gravatar.com/avatar/9ce4ebe71d4786e2b06723f8891bdaa7?s=50&r=g)](https://en.gravatar.com/)
[![Gravatar Profile](https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g)](https://en.gravatar.com/)
[![Announcement Icon](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)](https://www.baeldung.com/)
[![Baeldung REST API](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)](https://www.baeldung.com/)
[![Baeldung REST API Icon](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)](https://www.baeldung.com/)

OK