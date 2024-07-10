---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Integer
  - Null Check
head:
  - - meta
    - name: keywords
      content: Java, Integer, Null Check, Zero Check
---
# 在Java中检查整数是否为null或零

## 1. 概述

在这篇快速教程中，我们将学习几种不同的方式来检查给定的_Integer_实例的值是否为null或零。

为了简化，我们将使用单元测试断言来验证每种方法是否按预期工作。

接下来，让我们看看它们是如何工作的。

## 2. 使用标准方式

使用逻辑或运算符可能是执行检查的第一个想法。它简单地检查给定的_Integer_数字是否为null或零。

让我们创建一个方法来实现这个检查，以便于验证：

```
public static boolean usingStandardWay(Integer num) {
    return num == null || num == 0;
}
```

这可能是执行检查的最直接方法。让我们创建一个测试来看看它对不同的_Integer_实例是否有效：

```
int n0 = 0;
boolean result0 = usingStandardWay(n0);
assertTrue(result0);

boolean resultNull = usingStandardWay(null);
assertTrue(resultNull);

int n42 = 42;
boolean result42 = usingStandardWay(n42);
assertFalse(result42);
```

正如我们所看到的，我们已经通过传递三个_Integer_对象给_ usingStandardWay()_方法进行了测试：零，null和42。我们将使用这三个_Integer_对象作为本教程中进一步测试的输入。

## 3. 使用三元运算符

我们经常使用三元运算符编写带有条件的变量赋值，例如：

```
variable = booleanExpression ? expression1 : expression2
```

接下来，让我们看看如何使用三元运算符来执行所需的_Integer_检查：

```
public static boolean usingTernaryOperator(Integer num) {
    return 0 == (num == null ? 0 : num);
}
```

正如上面的代码所示，_(num == null ? 0 : num)_首先检查_num_变量是否为null。如果是这样，我们取零。否则，我们将取原始的_num_值。

换句话说，**这个表达式在这里进行了“null到零”的转换**。由于我们已经处理了null的情况，我们只需要检查带有三元运算符的表达式的结果是否为零。

接下来，让我们测试这种方法是否适用于我们的三个_Integer_实例：

```
int n0 = 0;
boolean result0 = usingTernaryOperator(n0);
assertTrue(result0);

boolean resultNull = usingTernaryOperator(null);
assertTrue(resultNull);

int n42 = 42;
boolean result42 = usingTernaryOperator(n42);
assertFalse(result42);
```

如果我们运行测试，它会通过。因此，_usingTernaryOperator()_方法按预期工作。

## 4. 使用_Optional_类

Java 8引入了_Optional_类型，因此如果我们的Java版本是8或更高版本，我们还可以使用_Optional_类的静态方法来实现这个检查：

```
public static boolean usingOptional(Integer num) {
    return Optional.ofNullable(num).orElse(0) == 0;
}
```

由于我们不知道给定的_Integer_变量是否为null，我们可以使用_Optional.ofNullable(num)_从它构建一个_Optional_实例。

接下来，我们调用_Optional_的_orElse()_方法。**_orElse(x)_方法检查_Optional_对象：如果存在值，则返回该值，否则返回_x_。**因此，_orElse(0)_也进行了“null到零”的转换。然后，剩下的就很简单了。我们只需要检查_orElse(0)_是否等于零。

接下来，让我们验证这种方法是否适用于我们的输入：

```
int n0 = 0;
boolean result0 = usingOptional(n0);
assertTrue(result0);

boolean resultNull = usingOptional(null);
assertTrue(resultNull);

int n42 = 42;
boolean result42 = usingOptional(n42);
assertFalse(result42);
```

如果我们运行测试，它会通过。因此，_usingOptional()_方法也完成了工作。

## 5. 使用_ObjectUtils_类

Apache Commons Lang 3是一个非常流行的库。如果这个库已经是我们正在工作的Java项目的依赖项，我们也可以使用它的_ObjectUtils_类来执行_Integer_检查：

```
public static boolean usingObjectUtils(Integer num) {
    return ObjectUtils.defaultIfNull(num, 0) == 0;
}
```

正如上面的实现所示，我们在检查中调用了_ObjectUtils.defaultIfNull(num, 0)_方法。_defaultIfNull()_方法是一个泛型方法。如果我们看看它的实现方式，我们就会理解_usingObjectUtils()_实现：

```
public static `<T>` T defaultIfNull(final T object, final T defaultValue) {
    return object != null ? object : defaultValue;
}
```

正如我们所看到的，如果我们跳过泛型声明，_defaultIfNull()_的实现就像使用三元运算符的表达式一样简单。这对我们来说并不新鲜。因此，**它也进行了“null到零”的转换**。

像往常一样，让我们测试我们的_usingObjectUtils()_方法：

```
int n0 = 0;
boolean result0 = usingObjectUtils(n0);
assertTrue(result0);

boolean resultNull = usingObjectUtils(null);
assertTrue(resultNull);

int n42 = 42;
boolean result42 = usingObjectUtils(n42);
assertFalse(result42);
```

毫不意外，测试也通过了。

## 6. 结论

在这篇文章中，我们探讨了三种检查给定_Integer_对象是否为null或其值是否为零的方法。

像往常一样，文章中展示的所有代码片段都可以在GitHub上找到。