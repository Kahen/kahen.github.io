---
date: 2022-04-01
category:
  - Java
  - Functional Programming
tag:
  - TriFunction
  - FunctionalInterface
  - Java 8
head:
  - - meta
    - name: keywords
      content: Java TriFunction, FunctionalInterface, Java 8
---
# Java中的TriFunction接口 | Baeldung

## 1. 概述

在本文中，我们将定义一个_TriFunction_ _FunctionalInterface_，它表示一个接受三个参数并计算结果的函数。稍后，我们还将看到一个使用Vavr库内置_Function3_的例子。

## 2. 创建我们自己的_TriFunction_接口

自Java 8版本以来，Java定义了_BiFunction FunctionalInterface_。它代表一个接受两个参数并计算结果的函数。为了允许函数组合，它还提供了一个_andThen()_方法，该方法将另一个_Function_应用于_BiFunction_的结果。

**类似地，我们将定义我们的_TriFunction_接口，并给它_andThen()_方法：**

```java
@FunctionalInterface
public interface TriFunction`<T, U, V, R>` {
    R apply(T t, U u, V v);

    default `<K>` TriFunction`<T, U, V, K>` andThen(Function`<? super R, ? extends K>` after) {
        Objects.requireNonNull(after);
        return (T t, U u, V v) -> after.apply(apply(t, u, v));
    }
}
```

让我们看看如何使用这个接口。我们将定义一个函数，它接受三个_Integers_，将前两个操作数相乘，然后加上最后一个操作数：

```java
static TriFunction````<Integer, Integer, Integer, Integer>```` multiplyThenAdd = (x, y, z) -> x * y + z;
```

请注意，只有在前两个操作数的乘积低于_Integer_最大值时，此方法的结果才会准确。

作为一个例子，我们可以使用_andThen()_方法来定义一个_TriFunction_，它：

- 首先，对参数应用_multiplyThenAdd()_
- 然后，应用一个_Function_，计算一个_Integer_除以10的欧几里得除法的商到前一步的结果

```java
static TriFunction````<Integer, Integer, Integer, Integer>```` multiplyThenAddThenDivideByTen = multiplyThenAdd.andThen(x -> x / 10);
```

现在我们可以编写一些快速测试来检查我们的_TriFunction_s是否按预期工作：

```java
@Test
void whenMultiplyThenAdd_ThenReturnsCorrectResult() {
    assertEquals(25, multiplyThenAdd.apply(2, 10, 5));
}

@Test
void whenMultiplyThenAddThenDivideByTen_ThenReturnsCorrectResult() {
    assertEquals(2, multiplyThenAddThenDivideByTen.apply(2, 10, 5));
}
```

最后，_TriFunction_的操作数可以是各种类型。例如，我们可以定义一个_TriFunction_，根据一个_Boolean_条件将一个_Integer_转换为_String_或返回另一个给定的_String_：

```java
static TriFunction`<Integer, String, Boolean, String>` convertIntegerOrReturnStringDependingOnCondition = (myInt, myStr, myBool) -> {
    if (Boolean.TRUE.equals(myBool)) {
        return myInt != null ? myInt.toString() : "";
    } else {
        return myStr;
    }
};
```

## 3. 使用Vavr的_Function3_

**Vavr库已经定义了一个_Function3_接口，它具有我们想要的行为。** 首先，让我们将Vavr依赖项添加到我们的项目中：

```xml
`<dependency>`
    `<groupId>`io.vavr`</groupId>`
    `<artifactId>`vavr`</artifactId>`
    `<version>`0.10.4`</version>`
`</dependency>`
```

现在，我们可以重新定义_multiplyThenAdd()_和_multiplyThenAddThenDivideByTen()_方法：

```java
static Function3````<Integer, Integer, Integer, Integer>```` multiplyThenAdd = (x, y, z) -> x * y + z;

static Function3````<Integer, Integer, Integer, Integer>```` multiplyThenAddThenDivideByTen = multiplyThenAdd.andThen(x -> x / 10);
```

如果我们需要定义最多8个参数的函数，使用Vavr是一个不错的选择。确实，_Function4_, _Function5_,… _Function8_已经在库中定义了。

## 4. 结论

在本教程中，我们实现了自己的接受3个参数的_FunctionInterface_。我们还强调了Vavr库包含了这种函数的实现。

如常，代码可在GitHub上找到。