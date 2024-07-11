---
date: 2022-12-01
category:
  - Java
  - 异常与错误
tag:
  - Throwable
  - Error
  - Exception
head:
  - - meta
    - name: keywords
      content: Java, 异常处理, 错误, 异常, Throwable
---
# Java中的错误与异常

在本教程中，我们将学习Java中的错误和异常以及它们之间的区别。

## 2. Throwable类
**错误(Error)和异常(Exception)都是Throwable类的子类，它们用于表示发生了异常情况**。此外，只有Throwable及其子类的实例可以由Java虚拟机抛出或在catch子句中捕获。

错误和异常的实例被创建以包含有关情况的信息（例如，堆栈跟踪）：

## 3. 错误(Error)
错误表示不应该发生的异常情况。当发生严重问题时，会抛出错误。**此外，错误被视为非检查异常，应用程序不应尝试捕获和处理它们**。此外，错误在运行时发生，并且无法恢复。

现在让我们看一个例子：

```java
public class ErrorExample {
    public static void main(String[] args) {
        throw new AssertionError();
    }
}
```

如果我们运行上述代码，我们将得到以下结果：

```
Exception in thread "main" java.lang.AssertionError:
at com.baeldung.exception.exceptions_vs_errors.ErrorExample.main(ErrorExample.java:6)
```

代码导致了一个名为_AssertionError_的错误，当断言失败时抛出。

Java错误的其他示例包括_StackOverflowError_、_LinkageError_、_IOError_和_VirtualMachineError_。

## 4. 异常(Exception)
**异常是应用程序可能想要捕获和处理的异常条件**。异常可以使用_try-catch块_恢复，并且可以在运行时和编译时发生。

用于异常处理的一些技术包括_try-catch_块、_throws_关键字和_try-with-resources_块。

异常分为两类：运行时异常和已检查异常。

### 4.1. 运行时异常(Runtime Exceptions)
_RuntimeException_及其子类是在Java虚拟机运行时可能抛出的异常。此外，它们是非检查异常。如果它们可以在方法执行后抛出并传播到方法的作用域之外，则不需要在方法签名中使用_throws_关键字声明未检查异常。

让我们看一个例子：

```java
public class RuntimeExceptionExample {
    public static void main(String[] args) {
        int[] arr = new int[20];

        arr[20] = 20;

        System.out.println(arr[20]);
    }
}
```

运行上述代码后，我们得到以下结果：

```
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 20
  at com.baeldung.exception.exceptions_vs_errors.RuntimeExceptionExample.main(RuntimeExceptionExample.java:7)
```

正如我们所看到的，我们得到了一个_ArrayIndexOutOfBoundsException_，它是_IndexOutOfBoundsException_的子类，而_IndexOutOfBoundsException_本身是_RuntimeException_的子类。

_RuntimeException_的其他子类包括_IllegalArgumentException_、_NullPointerExeption_和_ArithmeticException_。

### 4.2. 已检查异常(Checked Exceptions)
不是_RuntimeException_子类的其他异常是已检查异常。如果它们可以在方法执行后抛出并传播到方法的作用域之外，则需要在方法签名中使用_throws_关键字声明它们：

```java
public class CheckedExceptionExcample {
    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream(new File("test.txt"))) {
            fis.read();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

如果我们运行上述代码，我们将得到以下结果：

```
java.io.FileNotFoundException: test.txt (No such file or directory)
  at java.io.FileInputStream.open0(Native Method)
  at java.io.FileInputStream.open(FileInputStream.java:195)
  at java.io.FileInputStream.`<init>`(FileInputStream.java:138)
  at com.baeldung.exception.exceptions_vs_errors.CheckedExceptionExcample.main(CheckedExceptionExcample.java:9)
```

我们得到了一个_FileNotFoundException_，它是_IOError_的子类，而_IOError_本身是_Exception_的子类。

其他已检查异常的示例包括_TimeoutException_和_SQLException_。

## 5. 结论
在本文中，我们学习了Java生态系统中错误和异常之间的区别。

如往常一样，完整的代码示例可以在GitHub上找到。翻译已结束，以下是翻译的剩余部分：

## 5. 结论
在本文中，我们学习了Java生态系统中错误和异常之间的区别。

如往常一样，完整的代码示例可以在GitHub上找到。

[![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)](https://www.baeldung.com)
[![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)](https://www.baeldung.com)
[![img](https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g)](https://www.baeldung.com)
[![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)](https://www.baeldung.com)
[![img](https://www.baeldung.com/wp-content/uploads/2022/12/Throwable.png)](https://www.baeldung.com)

OK