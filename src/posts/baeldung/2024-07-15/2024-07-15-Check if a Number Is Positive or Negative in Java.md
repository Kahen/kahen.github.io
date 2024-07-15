---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Number
  - Positive
  - Negative
head:
  - - meta
    - name: keywords
      content: Java, Number, Positive, Negative
---
# Java中检查数字是正数还是负数

在Java中，当我们使用诸如_Integer_、_Long_、_Float_和_Double_这样的类型时，我们经常需要检查这些数字是正数还是负数。这是一种基本且常见的数字操作。

在本快速教程中，我们将讨论如何检查给定的数字是正数还是负数。

### 2. 问题介绍

检查一个数字是正数还是负数是一个相当直接的问题。然而，在我们开始查看实现之前，让我们先理解正数和负数的定义。

给定一个实数_n_，如果_n_大于零，它就是正数。否则，如果_n_小于零，它就是负数。所以，我们还有一个特殊情况：零。**零既不是正数也不是负数**。

因此，我们可以创建一个_enum_来涵盖这三种可能性：

```java
enum Result {
    POSITIVE, NEGATIVE, ZERO
}
```

在本教程中，我们将解决两种不同的方法来检查数字是正数、负数还是零。为了简单起见，我们将使用单元测试断言来验证结果。

接下来，让我们看看它们是如何工作的。

### 3. 使用‘>’和‘`<’运算符

根据定义，一个数字是正数还是负数取决于它与零的比较结果。因此，**我们可以使用Java的“大于(>`)”和“小于(`<)”运算符来解决问题**。

接下来，让我们以_Integer_类型为例，创建一个方法来进行检查：

```java
static Result byOperator(Integer integer) {
    if (integer >` 0) {
        return POSITIVE;
    } else if (integer `< 0) {
        return NEGATIVE;
    }
    return ZERO;
}
```

上面的代码清楚地说明了自己。根据与零的比较结果，我们确定结果是正数、负数还是零。

让我们创建一个测试来验证我们的方法：

```java
assertEquals(POSITIVE, PositiveOrNegative.byOperator(42));
assertEquals(ZERO, PositiveOrNegative.byOperator(0));
assertEquals(NEGATIVE, PositiveOrNegative.byOperator(-700));
```

如果我们执行它，测试就会通过。

当然，如果我们将_Integer_参数更改为_Long_、_Float_或_Double_，同样的逻辑也是有效的。

### 4. 使用signum()方法

我们已经看到了如何使用<和>`运算符来检查数字是正数还是负数。或者，我们可以使用signum()方法来获取给定数字的符号。

**对于_Integer_和_Long_数字，我们可以调用_Integer.signum()_和_Long.signum()_方法。**

signum(n)方法在_n_为负数、零或正数时返回-1、0和1。

让我们以_Integer_为例来创建一个检查方法：

```java
static Result bySignum(Integer integer) {
    int result = Integer.signum(integer);
    if (result == 1) {
        return Result.POSITIVE;
    } else if (result == -1) {
        return Result.NEGATIVE;
    }
    return Result.ZERO;
}
```

下面的测试验证了我们的方法按预期工作：

```java
assertEquals(POSITIVE, PositiveOrNegative.bySignum(42));
assertEquals(ZERO, PositiveOrNegative.bySignum(0));
assertEquals(NEGATIVE, PositiveOrNegative.bySignum(-700));
```

与_Integer_和_Long_不同，_Float_和_Double_类没有提供_signum()_方法。然而，**_Math.signum()_方法接受_Float_和_Double_数字作为参数**，例如：

```java
static Result bySignum(Float floatNumber) {
    float result = Math.signum(floatNumber);

    if (result == 1.0f) {
        return Result.POSITIVE;
    } else if (result == -1.0f) {
        return Result.NEGATIVE;
    }
    return Result.ZERO;
}
```

最后，让我们创建一个测试来验证该方法是否可以检查浮点数是正数还是负数：

```java
assertEquals(POSITIVE, PositiveOrNegative.bySignum(4.2f));
assertEquals(ZERO, PositiveOrNegative.bySignum(0f));
assertEquals(NEGATIVE, PositiveOrNegative.bySignum(-7.7f));
```

如果我们运行它，测试就会通过。

### 5. 结论

在本文中，我们学习了两种确定给定数字是正数、负数还是零的方法。

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。