---
date: 2022-04-04
category:
  - Java
  - Error Handling
tag:
  - Java Error
  - Uninitialized Variable
head:
  - - meta
    - name: keywords
      content: Java Error Handling, Uninitialized Variable
------
# Java错误：“变量可能未被初始化” | Baeldung

## 1. 概述

在本教程中，我们将专注于Java程序中的“变量可能未被初始化”错误。**当声明一个变量而没有初始化时，就会发生此错误**。我们将通过一个例子讨论这个错误，并提供一些解决方案。

如果我们声明了一个没有初始值的局部变量，就会得到一个错误。**这个错误仅适用于局部变量，因为Java在编译时会自动初始化实例变量（它为整数设置0，布尔值设置false等**）。然而，局部变量需要一个默认值，因为Java编译器不允许使用未初始化的变量。

让我们编写一个包含未初始化变量的简单代码：

```java
public class VariableMightNotHaveBeenInitializedError {
    public static void main(String[] args) {
        int sum;
        int[] list = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9};
        for (int i = 0; i < list.length; i++) {
            sum += list[i];
        }
        System.out.println("sum is: " + sum);
    }
}
```

在这段代码中，我们计算了一系列整数的总和。然后我们将其放入变量_sum_。编译时出现了以下错误：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/Screenshot-2022-03-30-at-12.45.37-e1648637224593.png)

## 3. 解决方案

要解决这个错误，**我们可以在创建变量时为其分配一个值**：

```java
public class VariableMightNotHaveBeenInitializedError {
    public static void main(String[] args) {
        int sum = 0;
        int[] list = new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9};
        for (int i = 0; i < list.length; i++) {
            sum += list[i];
        }
        System.out.println("sum is: " + sum);
    }
}
```

最后，运行代码时，我们得到了没有任何错误的结果：

![img](https://www.baeldung.com/wp-content/uploads/2022/04/Screenshot-2022-04-04-at-13.58.25.png)

## 4. 结论

在本文中，我们讨论了Java中未初始化变量导致的错误。然后我们编写了一个简单的Java代码，并声明了一个局部变量来保存操作结果，没有出现任何错误。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)