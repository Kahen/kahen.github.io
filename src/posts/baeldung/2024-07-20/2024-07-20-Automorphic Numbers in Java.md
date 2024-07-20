---
date: 2022-04-01
category:
  - Java
  - 数学
tag:
  - Automorphic Numbers
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Automorphic Numbers, 数学
------
# Java中的自守数

## 1. 概述

在这篇简短的教程中，我们将讨论自守数，并学习几种找到它们的方法以及相应的Java程序。

## 2. 什么是自守数？

**自守数是一个数，其平方的末尾数字与该数本身相同。**

例如，25是一个自守数，因为25的平方是625，末尾是25。同样，76是一个自守数，因为76的平方是5776，末尾也是76。

**在数学中，自守数也被称为循环数。**

一些自守数的例子包括0、1、5、6、25、76、376、625、9376等。

0和1被称为平凡的自守数，因为它们在任何基数下都是自守数。

## 3. 判断一个数是否是自守数

有许多算法可以用来确定一个数是否是自守数。接下来，我们将看到几种方法。

### 3.1. 循环遍历数字并比较

这里有一种方法可以确定一个数是否是自守数：

1. 获取数字并计算其平方
2. 获取平方的最后一个数字并与数字的最后一个数字进行比较
   - 如果最后一个数字不相等，则该数不是自守数
   - 如果最后一个数字相等，则进入下一步
3. 移除数字和平方的最后一个数字
4. 重复步骤2和3，直到比较完数字的所有数字

上述方法以相反的方式循环遍历输入数字的数字。

让我们编写一个Java程序来实现这种方法。_isAutomorphicUsingLoop()_方法接受一个整数作为输入，并检查它是否是自守数：

```java
public boolean isAutomorphicUsingLoop(int number) {
    int square = number * number;

    while (number > 0) {
        if (number % 10 != square % 10) {
            return false;
        }
        number /= 10;
        square /= 10;
    }

    return true;
}
```

这里，我们首先计算_number_的平方。然后，我们逐个比较_number_和_square_的最后一位数字。

在任何阶段，如果最后一个数字不相等，我们返回_false_并退出方法。否则，我们去掉相等的最后一位数字，并重复剩余数字的_number_的过程。

让我们测试一下：

```java
assertTrue(AutomorphicNumber.isAutomorphicUsingLoop(76));
assertFalse(AutomorphicNumber.isAutomorphicUsingLoop(9));
```

### 3.2. 直接比较数字

我们还可以以更直接的方式确定一个数是否是自守数：

1. 获取数字并计算其位数（_n_）
2. 计算数字的平方
3. 从平方中获取最后_n_位数字

   - 如果平方的最后_n_位数字构成原始数字，则该数是自守数
   - 否则它不是自守数

在这种情况下，我们不需要逐个循环遍历数字的数字。相反，我们可以利用编程框架的现有库。

**我们可以利用_Math_类执行数值操作，例如计算给定数字的位数并从其平方中获取相应数量的最后数字：**

```java
public boolean isAutomorphicUsingMath(int number) {
    int square = number * number;

    int numberOfDigits = (int) Math.floor(Math.log10(number) + 1);
    int lastDigits = (int) (square % (Math.pow(10, numberOfDigits)));

    return number == lastDigits;
}
```

类似于第一种方法，我们首先计算_number_的平方。然后，我们不是逐个比较_number_和_square_的最后一位数字，而是一次性使用_Math.floor()_获取_number_中的总_numberOfDigits_。之后，我们使用_Math.pow()_从_square_中提取相应数量的数字。最后，我们将输入_number_与提取的数字_lastDigits_进行比较。

如果_number_和_lastDigits_相等，则该数是自守数，我们返回_true_，否则我们返回_false_。

让我们测试一下：

```java
assertTrue(AutomorphicNumber.isAutomorphicUsingMath(76));
assertFalse(AutomorphicNumber.isAutomorphicUsingMath(9));
```

## 4. 结论

在这篇文章中，我们探索了自守数。我们还查看了几种确定一个数是否是自守数的方法以及相应的Java程序。

一如既往，这些示例的代码可以在GitHub上找到。