---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - boolean
  - int
  - conversion
head:
  - - meta
    - name: keywords
      content: Java, boolean to int, programming, conversion
---
# Java中布尔值与整型之间的转换

在本教程中，我们将学习如何在布尔值和整数值之间进行转换。首先，我们将了解Java如何处理这两种原始数据类型；然后，我们将探索多种方法来促进布尔值和整型之间的转换。

## 2. 数据类型

在Java中，整数可以通过int原始数据类型或Integer包装类来表示。原始数据类型是一个32位的有符号整数，采用二进制补码编码方法。Integer类充当包装器，允许您执行无符号整数运算，并且可以将整数（原始）值作为对象与泛型一起使用。

另一方面，布尔值在内存中没有特定的大小，但它默认为操作系统和Java虚拟机（JVM）。与Java中的所有原始数据类型一样，布尔值也有Boolean包装类，允许布尔值表现得像对象。

**我们可以利用这两种数据类型（布尔值和整型）的原始值和包装类来执行数据转换。** **假设true和false布尔值分别表示1和0，我们有多种方法来进行转换。

## 3. 原始布尔值到整型

要将原始的布尔值转换为整型，我们评估表达式的条件以确定要返回的整数：

```java
public int booleanPrimitiveToInt(boolean foo) {
    int bar = 0;
    if (foo) {
        bar = 1;
    }
    return bar;
}
```

我们可以使用三元运算符简化这个函数：

```java
public int booleanPrimitiveToIntTernary(boolean foo) {
    return (foo) ? 1 : 0;
}
```

这种方法使用原始数据类型（布尔值和整型）进行转换。结果，当布尔表达式为true时，我们得到1。否则，方法返回0。

## 4. 包装类

使用Boolean包装类，我们有几种方法来进行转换：

- 我们可以利用Boolean类的静态方法。
- 我们可以直接从Boolean对象调用方法。

### 4.1. 静态方法

Boolean类有一个_compare_方法，我们可以这样使用：

```java
public static int booleanObjectToInt(boolean foo) {
    return Boolean.compare(foo, false);
}
```

**记住静态_compare_方法如果两个参数的值相同则返回0。** **换句话说，当foo为false时，比较将产生0。否则，当第一个参数为true且第二个参数为false时，函数返回1。

同样，我们可以使用相同的静态方法，将第二个参数改为true：

```java
public static int booleanObjectToIntInverse(boolean foo) {
    return Boolean.compare(foo, true) + 1;
}
```

这次，如果foo为true，_compare_方法评估两个相同值的参数，结果为0。但是，将结果加1将返回来自真值布尔变量的预期整数值。

### 4.2. Boolean类对象

Boolean类对象具有如_compareTo_之类的函数，我们可以使用：

```java
public static int booleanObjectMethodToInt(Boolean foo) {
    return foo.compareTo(false);
}
```

使用_method_ booleanObjectMethodToInt，我们可以像使用静态方法一样将布尔值转换为整数。同样，您可以通过将参数更改为true并将结果加1来应用反向版本。

## 5. Apache Commons

Apache Commons是Java的一个流行的开源库，提供了诸如_BooleanUtils_之类的实用类。我们可以按如下方式将库添加为Maven的依赖项：

```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-lang3`</artifactId>`
    `<version>`3.12.0`</version>`
`</dependency>`
```

一旦库在我们的pom.xml文件中，我们就可以使用_BooleanUtils_类将布尔值转换为整数：

```java
public static int booleanUtilsToInt(Boolean foo) {
    return BooleanUtils.toInteger(foo);
}
```

与示例方法_booleanPrimitiveToIntTernary_一样，内部地，_toInteger_方法执行相同的三元运算符进行转换。

## 6. 将整型转换为布尔值

在探讨了将布尔值转换为整数值的多种技术之后，现在让我们将注意力转向相反的过程：将整数值转换为布尔值。

首先，我们将遵循这个规则来执行_int_到_boolean_的转换：

- true – 整数值是1
- false – 整数值是0
- 如果整数值既不是1也不是0，则抛出异常

### 6.1. 使用_if_或_if-else_语句

**为了实现转换，我们可以使用_if/if-else_语句**，例如：

```java
boolean intToBooleanWithThrowing(int theInt) {
    if (theInt == 1) {
        return true;
    }
    if (theInt == 0) {
        return false;
    }
    throw new IllegalArgumentException("Only 0 or 1 is allowed.");
}
```

### 6.2. 使用_BooleanUtils.toBoolean()_方法

来自Apache Commons Lang3库的_BooleanUtils_类还提供了将整数值转换为布尔值的_BooleanUtils.toBoolean(int value, int trueValue, int falseValue)_方法。

这个方法有三个参数：

- value – 要转换的整数值
- trueValue – 如果value等于trueValue，方法返回true
- falseValue – 如果value等于falseValue，方法返回false

进一步地，**如果value不等于trueValue或falseValue，将抛出IllegalArgumentException**：

```java
public static boolean toBoolean(final int value, final int trueValue, final int falseValue) {
    if (value == trueValue) {
        return true;
    } else if (value == falseValue) {
        return false;
    } else {
        throw new IllegalArgumentException("The Integer did not match either specified value");
    }
}
```

接下来，让我们通过单元测试演示如何使用这个方法：

```java
int trueValue = 1;
int falseValue = 0;

assertTrue(BooleanUtils.toBoolean(1, trueValue, falseValue));
assertFalse(BooleanUtils.toBoolean(0, trueValue, falseValue));
assertThrows(IllegalArgumentException.class, () -> BooleanUtils.toBoolean(42, trueValue, falseValue));
assertThrows(IllegalArgumentException.class, () -> BooleanUtils.toBoolean(-42, trueValue, falseValue));
```

### 6.3. 其他转换规则

有时，我们可能需要实现不同的转换规则，例如：

- true – 如果整数值是正数，否则false
- true – 如果整数值是1，否则false
- true – 如果整数值非零，否则false
- …

**实现这些转换的一种常见方法是使用布尔表达式。**

为了简单起见，让我们假设我们想要将整数转换为true，如果它是正数。否则，我们将转换为false。

然后，布尔表达式“_theInt > 0_”就完成了这项工作：

```java
boolean intToBoolean(int theInt) {
    return theInt > 0;
}
```

此外，_BooleanUtils_类还提供了另一个_toBoolean(int value)_方法，将整数值转换为布尔值。这个方法只接受一个_int_参数。

与我们的_intToBoolean()_实现类似，_toBoolean(int value)_也使用布尔表达式。**如果整数值是零，方法返回false。相反，对于任何非零值，它返回true**：

```java
public static boolean toBoolean(final int value) {
    return value != 0;
}
```

## 7. 结论

在本教程中，我们学习了如何将布尔值转换为整数值。假设true转换为1，false转换为0，我们探索了不同的实现方法来实现这种转换。此外，我们还讨论了如何将整数值转换为布尔值。

如往常一样，本文的完整代码示例可以在GitHub上找到。