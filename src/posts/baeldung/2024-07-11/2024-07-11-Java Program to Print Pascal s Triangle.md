---
date: 2024-07-11
category:
  - Java
  - 算法
tag:
  - Pascal's Triangle
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Pascal's Triangle, Algorithm
------
# Java程序打印帕斯卡三角形

帕斯卡三角形是一种二项式系数的三角形排列。帕斯卡三角形中的数字是这样排列的，即每个数字是它正上方两个数字的和。

在本教程中，我们将看到如何在Java中打印帕斯卡三角形。

### 2. 使用递归

我们可以使用递归打印帕斯卡三角形，公式为\( nCr \)：\( n! / ( ( n – r )! r! ) \)

首先，让我们创建一个递归函数：

```java
public int factorial(int i) {
    if (i == 0) {
        return 1;
    }
    return i * factorial(i - 1);
}
```

然后我们可以使用该函数打印三角形：

```java
private void printUseRecursion(int n) {
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= n - i; j++) {
            System.out.print(" ");
        }

        for (int k = 0; k <= i; k++) {
            System.out.print(" " + factorial(i) / (factorial(i - k) * factorial(k)));
        }

        System.out.println();
    }
}
```

使用n = 5的结果看起来像这样：

```
       1
      1 1
     1 2 1
    1 3 3 1
   1 4 6 4 1
  1 5 10 10 5 1
```

### 3. 避免使用递归

另一种不使用递归打印帕斯卡三角形的方法是使用二项式展开。

我们总是在每行的开头有值1，然后(n)行和(i)位置的值k计算为：

```java
k = ( k * (n - i) / i )
```

让我们使用这个公式创建我们的函数：

```java
public void printUseBinomialExpansion(int n) {
    for (int line = 1; line <= n; line++) {
        for (int j = 0; j <= n - line; j++) {
            System.out.print(" ");
        }

        int k = 1;
        for (int i = 1; i <= line; i++) {
            System.out.print(k + " ");
            k = k * (line - i) / i;
        }

        System.out.println();
    }
}
```

### 4. 结论

在这个快速教程中，我们学习了两种在Java中打印帕斯卡三角形的方法。

本文的示例代码可以在GitHub上找到。