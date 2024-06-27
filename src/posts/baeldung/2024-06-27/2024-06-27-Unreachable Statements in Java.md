---
date: 2024-06-28
category:
  - Java
  - 编程
tag:
  - 代码
  - 编译错误
head:
  - - meta
    - name: keywords
      content: Java, 代码, 编译错误, 不可达代码
---
# Java中的不可达语句 | Baeldung

## 1. 概述

在本教程中，我们将讨论Java规范，该规范指出如果有任何语句是不可达的，编译器应该抛出错误。不可达语句是在程序执行期间永远无法执行的代码，因为程序流程无法到达它。我们将看到各种代码示例，这些示例符合这一定义。

## 2. 循环中的_break_指令后的代码

**在循环中，如果我们在_break_语句后放置指令，它们是不可达的：**

```java
public class UnreachableStatement {

    public static void main(String[] args) {
        for (int i = 0; i `< 10; i++) {
            break;
            int j = 0;
        }
    }

}
```

让我们尝试使用_javac_编译我们的代码：

```shell
$ javac UnreachableStatement.java
UnreachableStatement.java:9: error: unreachable statement
            int j = 0;
                ^  
1 error
```

正如预期的那样，编译失败了，因为_int j = 0;_语句是不可达的。类似地，在循环中的_continue_关键字后的指令也是不可达的：

```java
public static void main(String[] args) {
    int i = 0;
    while (i < 5) {
        i++;
        continue;
        int j = 0;
    }
}
```

## 3. _while(true)_后的代码

**_while(true)_指令意味着其中的代码将永远运行。** 因此，该代码之后的任何代码都是不可达的：

```java
public static void main(String[] args) {
    while (true) {}
    int j = 0;
}
```

再次，之前的代码中的_int j = 0;_语句是不可达的。这一观点也适用于使用_do-while_结构的等效代码：

```java
public static void main(String[] args) {
    do {} while (true);
    int j = 0;
}
```

另一方面，任何在_while(false)_循环内的代码都是不可达的：

```java
public static void main(String[] args) {
    while (false) {
        int j = 0;
    }
}
```

## 4. 方法返回后

**方法在_return_语句上立即退出。** 因此，此指令之后的任何代码都是不可达的：

```java
public static void main(String[] args) {
    return;
    int i = 0;
}
```

再次，_int j = 0;_行是不可达的，导致编译器错误。类似地，当_throw_语句没有包含在_try-catch_块中或在_throws_子句中指定时，方法异常完成。因此，此行之后的任何代码都是不可达的：

```java
public static void main(String[] args) throws Exception {
    throw new Exception();
    int i = 0;
}
```

总结一下，如果所有代码分支都返回，以下代码无论如何都是不可达的：

```java
public static void main(String[] args) throws Exception {
    int i = new Random().nextInt(0, 10);
    if (i >` 5) {
        return;
    } else {
        throw new Exception();
    }
    int j = 0;
}
```

在这段代码中，我们选择了一个介于_0_（包括）和_10_（不包括）之间的随机数。如果这个数字大于_5_，我们立即返回，如果不是，我们抛出一个通用的_Exception_。因此，没有可能的执行路径到达_if-else_块之后的代码。

## 5. 死亡但可达的代码

最后，让我们注意到**即使明显的死亡代码从编译器的角度来看也不是强制性的不可达**。特别是，它不评估_if_语句中的条件：

```java
public static void main(String[] args) {
    if (false) {
        return;
    }
}
```

即使我们一眼就知道_if_块内的代码是死亡代码，这段代码仍然可以成功编译。

## 6. 结论

在本文中，我们看了很多不可达的语句。在开发人员社区中有一个争论，即是否应该对不可达的代码发出警告或错误。Java语言遵循这样一个原则，即每个编写的代码都应该有目的，因此会抛出错误。在像C++这样的其他语言中，由于编译器可以执行代码，尽管代码不一致，它只会发出警告。