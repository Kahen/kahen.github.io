---
date: 2022-04-01
category:
  - Java
  - 算法
tag:
  - 二次方程根
  - 算法实现
head:
  - - meta
    - name: keywords
      content: Java, 算法, 二次方程, 根, 实现
---
# Java程序计算二次方程的根

在这篇文章中，我们将看到如何在Java中计算二次方程的解。我们将首先定义什么是二次方程，然后无论是在实数还是复数系统中，我们都会计算它的解。

## 1. 概述

## 2. 二次方程的解
给定实数a ≠ 0, b和c，让我们考虑以下的二次方程：\[ ax^2 + bx + c = 0 \]。

### 2.1. 多项式的根
这个方程的解也被称为多项式\[ ax^2 + bx + c \]的根。因此，让我们定义一个_Polynom_类。如果系数_a_等于0，我们将抛出一个_IllegalArgumentException_：

```java
public class Polynom {
    private double a;
    private double b;
    private double c;

    public Polynom(double a, double b, double c) {
        if (a == 0) {
            throw new IllegalArgumentException("a不能等于0");
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }

    // getters 和 setters
}
```

我们将在实数系统中解决这个方程：为此，我们将寻找一些_Double_解。

### 2.2. 复数系统
我们还将展示如何在复数系统中解决这个方程。**Java中没有复数的默认表示**，因此我们将创建我们自己的。让我们给它一个_static_方法_ofReal_，以便于转换实数。这将在接下来的步骤中有所帮助：

```java
public class Complex {
    private double realPart;
    private double imaginaryPart;

    public Complex(double realPart, double imaginaryPart) {
        this.realPart = realPart;
        this.imaginaryPart = imaginaryPart;
    }

    public static Complex ofReal(double realPart) {
        return new Complex(realPart, 0);
    }

    // getters 和 setters
}
```

## 3. 计算判别式
**Δ = b² – 4ac的数量被称为二次方程的判别式。** 在java中计算b平方有两个解决方案：

- 将b乘以自身
- 使用_Math.pow_将其提升到2的幂

让我们坚持第一种方法，并在_Polynom_类中添加一个_getDiscriminant_方法：

```java
public double getDiscriminant() {
    return b * b - 4 * a * c;
}
```

## 4. 获取解
根据判别式的值，我们可以知道存在多少解并计算它们。

### 4.1. 严格正的判别式
**如果判别式严格为正，方程有两个实数解，(-b – √Δ) / 2a 和 (-b + √Δ) / 2a：**

```java
Double solution1 = (-polynom.getB() - Math.sqrt(polynom.getDiscriminant())) / (2 * polynom.getA());
Double solution2 = (-polynom.getB() + Math.sqrt(polynom.getDiscriminant())) / (2 * polynom.getA());
```

如果我们在复数系统中工作，那么我们只需要进行转换：

```java
Complex solution1 = Complex.ofReal((-polynom.getB() - Math.sqrt(polynom.getDiscriminant())) / (2 * polynom.getA()));
Complex solution2 = Complex.ofReal((-polynom.getB() + Math.sqrt(polynom.getDiscriminant())) / (2 * polynom.getA()));
```

### 4.2. 判别式等于零
**如果判别式等于零，方程有一个唯一的实数解 -b / 2a：**

```java
Double solution = (double) -polynom.getB() / (2 * polynom.getA());
```

同样，如果我们在复数系统中工作，我们将以以下方式转换解：

```java
Complex solution = Complex.ofReal(-polynom.getB() / (2 * polynom.getA()));
```

### 4.3. 严格负的判别式
**如果判别式严格为负，方程在实数系统中没有解。然而，它可以在复数系统中解决：解是(-b – i√-Δ) / 2a 及其共轭(-b + i√-Δ) / 2a：**

```java
Complex solution1 = new Complex(-polynom.getB() / (2 * polynom.getA()), -Math.sqrt(-polynom.getDiscriminant()) / (2 * polynom.getA()));
Complex solution2 = new Complex(-polynom.getB() / (2 * polynom.getA()), Math.sqrt(-polynom.getDiscriminant()) / (2 * polynom.getA()));
```

### 4.4. 汇总结果
**总之，让我们构建一个方法，当解存在时，将方程的解填充到一个_List_中。** 在实数系统中，这个方法看起来像这样：

```java
public static List``<Double>`` getPolynomRoots(Polynom polynom) {
    List``<Double>`` roots = new ArrayList<>();
    double discriminant = polynom.getDiscriminant();
    if (discriminant > 0) {
        roots.add((-polynom.getB() - Math.sqrt(discriminant)) / (2 * polynom.getA()));
        roots.add((-polynom.getB() + Math.sqrt(discriminant)) / (2 * polynom.getA()));
    } else if (discriminant == 0) {
        roots.add(-polynom.getB() / (2 * polynom.getA()));
    }
    return roots;
}
```

如果我们在复数系统中工作，我们将这样写：

```java
public static List``<Complex>`` getPolynomRoots(Polynom polynom) {
    List``<Complex>`` roots = new ArrayList<>();
    double discriminant = polynom.getDiscriminant();
    if (discriminant > 0) {
        roots.add(Complex.ofReal((-polynom.getB() - Math.sqrt(discriminant)) / (2 * polynom.getA())));
        roots.add(Complex.ofReal((-polynom.getB() + Math.sqrt(discriminant)) / (2 * polynom.getA())));
    } else if (discriminant == 0) {
        roots.add(Complex.ofReal(-polynom.getB() / (2 * polynom.getA())));
    } else {
        roots.add(new Complex(-polynom.getB() / (2 * polynom.getA()), -Math.sqrt(-discriminant) / (2 * polynom.getA())));
        roots.add(new Complex(-polynom.getB() / (2 * polynom.getA()), Math.sqrt(-discriminant) / (2 * polynom.getA())));
    }
    return roots;
}
```

## 5. 结论
在本教程中，我们看到了如何在Java中解决二次方程，无论是使用实数还是复数。如往常一样，代码可以在GitHub上找到。