---
date: 2022-04-01
category:
  - Java
  - Concurrency
tag:
  - Thread
  - Thread Name
head:
  - - meta
    - name: keywords
      content: Java, Thread, Thread Name
------
# 在Java中设置线程名称

## 1. 概述

在本教程中，我们将探讨在Java中设置_线程_名称的不同方法。首先，我们将创建一个示例，运行两个_线程_。一个打印偶数，另一个只打印奇数。然后，我们将为我们的_线程_设置自定义名称并显示它们。

## 2. 设置_线程_名称的方法

_线程_是一个轻量级进程，可以并发执行。**Java中的_线程_类为线程提供了默认名称。**

在某些情况下，我们可能需要知道哪个线程正在运行，因此为_线程_提供自定义名称可以使它在其他运行线程中更容易识别。

让我们首先定义一个简单的类，创建两个_线程_。第一个_线程_将打印1到N之间的偶数。第二个_线程_将打印1到N之间的奇数。在我们的示例中，N是5。

我们还将打印_线程_的默认名称。

首先，让我们创建两个_线程_：

```java
public class CustomThreadNameTest {

    public int currentNumber = 1;

    public int N = 5;

    public static void main(String[] args) {

        CustomThreadNameTest test = new CustomThreadNameTest();

        Thread oddThread = new Thread(() -> {
            test.printOddNumber();
        });

        Thread evenThread = new Thread(() -> {
            test.printEvenNumber();
        });

        evenThread.start();
        oddThread.start();

    }
    // printEvenNumber() 和 printOddNumber()
}
```

在这里，无论是在_printEvenNumber_还是_printOddNumber_方法中，我们将检查当前数字是偶数还是奇数，并打印数字以及_线程_名称：

```java
public void printEvenNumber() {
    synchronized (this) {
        while (currentNumber `< N) {
            while (currentNumber % 2 == 1) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println(Thread.currentThread().getName() + " -->` " + currentNumber);
            currentNumber++;
            notify();
        }
    }
}

public void printOddNumber() {
    synchronized (this) {
        while (currentNumber `< N) {
            while (currentNumber % 2 == 0) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println(Thread.currentThread().getName() + " -->` " + currentNumber);
            currentNumber++;
            notify();
        }
    }
}
```

运行代码后，我们得到以下输出：

```
Thread-0 --> 1
Thread-1 --> 2
Thread-0 --> 3
Thread-1 --> 4
Thread-0 --> 5
```

所有线程都有默认名称，如_Thread-0, Thread-1_等。

### 2.1. 使用_线程_构造函数

**_线程_类提供了一些构造函数，我们可以在创建_线程_时提供_线程_名称**，例如：

- _Thread(Runnable target, String name)_
- _Thread(String name)_

这里的参数_name_是_线程_名称。

使用_线程_构造函数，我们可以在线程创建时提供线程名称。

让我们为我们的_线程_设置自定义名称：

```java
Thread oddThread = new Thread(() -> {
    test.printOddNumber();
}, "ODD");

Thread evenThread = new Thread(() -> {
    test.printEvenNumber();
}, "EVEN");
```

现在，当我们运行代码时，将显示自定义名称：

```
ODD --> 1
EVEN --> 2
ODD --> 3
EVEN --> 4
ODD --> 5
```

### 2.2. 使用_setName()_方法

此外，**_线程_类提供了一个_setName_方法**。

让我们通过_Thread.currentThread().setName()_调用_setName_：

```java
Thread oddThread = new Thread(() -> {
    Thread.currentThread().setName("ODD");
    test.printOddNumber();
});

Thread evenThread = new Thread(() -> {
    Thread.currentThread().setName("EVEN");
    test.printEvenNumber();
});
```

也可以通过_Thread.setName()_：

```java
Thread oddThread = new Thread(() -> {
    test.printOddNumber();
});
oddThread.setName("ODD");

Thread evenThread = new Thread(() -> {
    test.printEvenNumber();
});
evenThread.setName("EVEN");
```

再次运行代码，将显示我们的_线程_的自定义名称：

```
ODD --> 1
EVEN --> 2
ODD --> 3
EVEN --> 4
ODD --> 5
```

## 3. 结论

在本文中，我们探讨了如何在Java中设置_线程_的名称。首先，我们创建了一个具有默认名称的_线程_，然后使用_线程_构造函数和_setName_方法设置了自定义名称。

如往常一样，本文的示例代码可在GitHub上找到。