---
date: 2024-06-27
category:
  - Java
  - 编程
tag:
  - 整数
  - 取反
head:
  - - meta
    - name: keywords
      content: Java, 整数取反, 编程技巧
---
# Java中将正整数转换为负数以及反之的方法 | Baeldung

## 1. 概述

在Java编程中，理解如何操作整数是编写健壮且高效代码的基础。一个常见的操作是取反整数。

在本教程中，我们将探索取反整数的不同方法。

## 2. 问题介绍

取反整数涉及将正数变为负数，或反之。例如，给定一个整数42，取反后我们期望得到-42作为结果。

我们不应忘记数字0既不是正数也不是负数。因此，取反0的结果也应该是0。

在Java中，这个操作很简单，我们将看到三种不同的实现方式。此外，我们将讨论一个边缘情况：整数溢出。

为了简化，我们将使用单元测试断言来验证每种方法的结果。

## 3. 使用一元负号运算符

取反整数最直接的方法是使用一元负号运算符（-）。它简单地改变了给定整数的符号：

```
int x = 42;
assertEquals(-42, -x);

int z = 0;
assertEquals(0, -z);

int n = -42;
assertEquals(42, -n);
```

正如测试所示，通过在输入整数上应用‘-’，我们得到了预期的结果。

## 4. 使用按位补码运算符

另一种不常见但有效的方法使用按位补码运算符（~）。这个运算符反转了给定整数的位，有效地创建了二进制补码：

```
int number = 12;
int negative13 = ~number; // ~00001100 = 11110011 = -13
```

因此，给定一个整数x，~x + 1是x的取反。

接下来，让我们编写一个测试来验证这一点：

```
int x = 42;
assertEquals(-42, ~x + 1);

int z = 0;
assertEquals(0, ~z + 1);

int n = -42;
assertEquals(42, ~n + 1);
```

正如我们所见，~x + 1解决了问题。

## 5. 与Integer.MIN_VALUE的溢出问题

我们知道Java的整数类型是一个有符号的32位类型，范围从-2147483648到2147483647。如果我们取反Integer.MAX_VALUE，结果-2147483647仍在范围内。但是，如果我们取反Integer.MIN_VALUE，我们应该得到2147483648，这大于Integer.MAX_VALUE。因此，在这种边缘情况下，会发生溢出错误。

尽管‘-x’和‘~x + 1’方法很直接，但**我们只有在确保不会发生溢出的情况下才能在我们的应用程序中使用它们。**一些可能适当使用它们的场景包括：

- 计算一个足球队在锦标赛中的目标差异
- 计算一个员工一个月的工作时间

然而，如果在我们的程序中可能会发生溢出，使用这些方法是不鼓励的。

接下来，让我们探索为什么这两种方法在将Integer.MIN_VALUE作为输入时会导致溢出错误。

### 5.1. 使用Integer.MIN_VALUE的-x

首先，让我们使用‘-’运算符取反Integer.MIN_VALUE：

```
int min = Integer.MIN_VALUE;
LOG.info("The value of '-min' is: " + -min);

assertTrue((-min) `< 0);
```

这个测试通过，意味着在取反Integer.MIN_VALUE后我们仍然得到了一个负数。我们可以从输出中进一步验证这一点：

```
The value of '-min' is: -2147483648
```

因此，**当溢出发生时，‘-x’方法返回了错误的结果。**

### 5.2. 使用Integer.MIN_VALUE的~x + 1

让我们使用相同的测试使用‘~x + 1’方法：

```
int min = Integer.MIN_VALUE;
int result = ~min + 1;
LOG.info("The value of '~min + 1' is: " + result);

assertFalse(result >` 0);
```

**我们可以看到，当溢出发生时，这种方法也不会给出预期的结果。**让我们通过检查控制台中的日志输出来进一步验证：

```
The value of '~min + 1' is: -2147483648
```

## 6. 使用Math.negateExact()方法

对于需要处理Integer.MIN_VALUE的场景，Math.negateExact()方法提供了一种安全和精确的方式来取反一个整数。

首先，Math.negateExact()在正常情况下按预期工作：

```
int x = 42;
assertEquals(-42, Math.negateExact(x));

int z = 0;
assertEquals(0, Math.negateExact(z));

int n = -42;
assertEquals(42, Math.negateExact(n));
```

接下来，让我们看看如果输入是Integer.MIN_VALUE会发生什么：

```
int min = Integer.MIN_VALUE;
assertThrowsExactly(ArithmeticException.class, () -> Math.negateExact(min));
```

正如测试所示，**如果取反过程中发生溢出，Math.negateExact()方法会抛出一个ArithmeticException，**允许开发者在错误发生时处理它。

## 7. 结论

在本文中，我们探讨了Java中取反整数的三种方式。

‘-x’和‘~x + 1’是直接的解决方案。然而，**如果我们的程序可能尝试取反Integer.MIN_VALUE，那么使用Math.negateExact()是正确的选择。**

如常，示例的完整源代码可在GitHub上找到。