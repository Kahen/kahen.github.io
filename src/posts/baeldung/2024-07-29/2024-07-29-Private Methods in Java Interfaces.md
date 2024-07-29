---
date: 2022-04-01
category:
  - Java
  - Interfaces
tag:
  - Java 9
  - Private Methods
head:
  - - meta
    - name: keywords
      content: Java 9, Interfaces, Private Methods
------
# Java接口中的私有方法

## 1. 概述

**从Java 9开始，可以在Java接口中添加私有方法**。在这个简短的教程中，让我们讨论如何定义这些方法以及它们的好处。

## 2. 在接口中定义私有方法

**私有方法可以是静态的或非静态的**。这意味着在接口中，我们可以创建私有方法来封装来自默认和静态公共方法签名的代码。

首先，让我们看看如何从默认接口方法中使用私有方法：

```java
public interface Foo {
    default void bar() {
        System.out.print("Hello");
        baz();
    }

    private void baz() {
        System.out.println(" world!");
    }
}
```

_bar()_ 能够通过从其默认方法中调用它来使用私有方法 _baz()_。

接下来，让我们向我们的 _Foo_ 接口添加一个静态定义的私有方法：

```java
public interface Foo {
    static void buzz() {
        System.out.print("Hello");
        staticBaz();
    }

    private static void staticBaz() {
        System.out.println(" static world!");
    }
}
```

在接口内，其他静态定义的方法可以使用这些私有静态方法。

最后，让我们从具体类中调用定义的默认和静态方法：

```java
public class CustomFoo implements Foo {
    public static void main(String... args) {
        Foo customFoo = new CustomFoo();
        customFoo.bar();
        Foo.buzz();
    }
}
```

输出是从调用 _bar()_ 方法得到的字符串“Hello world!”和从调用 _buzz()_ 方法得到的“Hello static world!”。

## 3. 接口中私有方法的好处

现在我们已经定义了它们，让我们谈谈接口中私有方法的好处。

正如前一节中提到的，接口可以使用私有方法来隐藏实现细节，从而实现封装。

另一个好处是（就像一般的私有方法一样）减少重复并为具有相似功能的接口方法添加更多可重用的代码。

## 4. 结论

在本教程中，我们介绍了如何在接口内定义私有方法以及如何从静态和非静态上下文中使用它们。我们在本文中使用的所有代码都可以在GitHub上找到。