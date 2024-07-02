---
date: 2023-07-25
category:
  - Software Engineering
  - Testing
tag:
  - Java
  - jqwik
  - Property-Based Testing
head:
  - - meta
    - name: keywords
      content: jqwik, property-based testing, Java, unit testing
---

# jqwik 属性测试入门 | Baeldung

## **1. 引言**

在本文中，我们将探讨基于属性的测试。**我们将看到基于属性的测试是什么，以及如何使用 Java 的 jqwik 库来实现它。**

## **2. 参数化测试**

在深入探讨基于属性的测试之前，我们先简要了解一下参数化测试。**参数化测试是指我们可以编写一个单一的测试函数，然后使用许多不同的参数来调用它。**例如：

```java
@ParameterizedTest
@CsvSource({"4,2,2", "6,2,3", "6,3,2"})
void testIntegerDivision(int x, int y, int expected) {
    int answer = calculator.divide(x, y);
    assertEquals(expected, answer);
}
```

这使我们能够相对容易地测试许多不同的输入集。这可以让我们确定一组合适的测试案例并运行这些测试。然后挑战就变成决定这些测试案例应该是什么。显然，我们不能测试所有可能的值集——这根本是不可行的。相反，我们会尝试确定有趣的案例并测试它们。

对于这个例子，我们可能会测试以下情况：

- 一些正常情况
- 一个数字除以它自己——总是得到“1”
- 一个数字除以1——总是得到原始数字
- 一个正数除以一个负数——总是得到一个负数

等等。然而，这假设我们能想到所有这些案例。如果我们没有想到呢？例如，如果我们用0除以一个数字会发生什么？我们没有想到要测试那个，所以我们不知道结果会是什么。

**如果我们能程序性地生成我们的测试输入呢？**

实现这一点的一个明显的方式是有一个参数化测试，它在循环中生成输入：

```java
@ParameterizedTest
@MethodSource("provideIntegerInputs")
void testDivisionBySelf(int input) {
    int answer = calculator.divide(input, input);
    assertEquals(answer, 1);
}

private static Stream``<Arguments>`` provideIntegerInputs() {
    return IntStream.rangeClosed(Integer.MIN_VALUE, Integer.MAX_VALUE)
        .mapToObj(i -> Arguments.of(i));
}
```

这肯定会发现任何边缘情况。然而，这是以巨大的代价来实现的。它将测试每一个可能的整数值——那是4,294,967,296个不同的测试案例。即使每个测试需要1毫秒，那也需要将近50天的时间来运行。

**基于属性的测试是这个想法的一个变体。我们将不是生成每一个测试案例，而是根据我们定义的一组属性生成有趣的测试案例。**

例如，对于我们的除法示例，我们可能只测试-20到+20之间的每一个数字。如果我们假设任何不寻常的案例都会在这个范围内，那么这将是足够有代表性的，同时更容易管理。在这种情况下，我们的属性仅仅是“在-20和+20之间”：

```java
private static Stream``<Arguments>`` provideIntegerInputs() {
    return IntStream.rangeClosed(-20, +20).mapToObj(i -> Arguments.of(i));
}
```

## **4. jqwik 入门**

**jqwik 是一个 Java 测试库，为我们实现了基于属性的测试。**它为我们提供了非常轻松和高效的进行这种测试的工具。这包括生成我们的数据集的能力，但它也与 JUnit 5 集成。

### **4.1. 添加依赖**

**为了使用 jqwik，我们首先需要将其添加到我们的项目中。**这是一个我们可以添加到我们的构建中的单一依赖：

```xml
`<dependency>`
    `<groupId>`net.jqwik`</groupId>`
    `<artifactId>`jqwik`</artifactId>`
    `<version>`1.7.4`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

最新版本可以在 Maven 中央仓库中找到。

我们还需要确保我们的项目中正确设置了 JUnit 5，否则我们不能运行使用 jqwik 编写的测试。

### **4.2. 我们的第一个测试**

**现在我们已经设置了 jqwik，让我们用它写一个测试。**我们将测试一个数字除以它自己返回 1，就像我们之前做的那样：

```java
@Property
public void divideBySelf(@ForAll int value) {
    int result = divide(value, value);
    assertEquals(result, 1);
}
```

这就是全部。那么我们做了什么呢？

首先，测试用 _@Property_ 注解而不是 _@Test_。这告诉 JUnit 使用 jqwik 运行器来运行这个测试。

接下来，我们有一个测试参数，用 _@ForAll_ 注解。这告诉 jqwik 为这个参数生成一组有趣的值，然后我们可以在测试中使用它们。在这种情况下，我们没有任何约束，所以它将从所有整数的集合中生成值。

如果我们运行这个测试会发生什么呢？

![img](https://www.baeldung.com/wp-content/uploads/2023/07/Screenshot-2023-07-25-at-08.06.29-1024x609.png)

jqwik 在找到失败的测试之前运行了 13 个不同的测试。失败的输入是“0”，这导致它抛出了一个 _ArithmeticException_。

**这立即在我们的代码中发现了一个问题，而且测试代码非常少。**

## **5. 定义属性**

我们已经看到了如何使用 jqwik 为我们的测试提供值。在这种情况下，我们的测试接受一个没有任何约束的整数。

**jqwik 可以为一标准类型的集合提供值——包括字符串、数字、布尔值、枚举和集合等。**所需做的只是用 _@ForAll_ 注解来编写我们的测试参数，这将告诉 jqwik 反复使用不同生成的值来运行我们的测试。

我们可以为我们的测试需要多少属性就有多少：

```java
@Property
public void additionIsCommutative(@ForAll int a, @ForAll int b) {
    assertEquals(a + b, b + a);
}
```

我们甚至可以根据需要混合类型。

### **5.1. 约束属性**

**然而，通常我们需要对这些参数可以是什么设置一些约束。**例如，当测试除法时，我们不能使用零作为分母，所以这需要是我们测试的一个约束。

我们可以编写测试来检测这些情况并跳过它们。然而，这仍将被视为一个测试案例。特别是，jqwik 只会在决定测试通过之前运行有限数量的测试案例。如果我们短路这一点，那么我们就是破坏了使用属性测试的目的。

**相反，jqwik 允许我们约束我们的属性，以便生成的值都在界限之内。**例如，我们可能想要重复我们的除法测试，但只使用正数：

```java
@Property
public void dividePositiveBySelf(@ForAll @Positive int value) {
    int result = divide(value, value);
    assertEquals(result, 1);
}
```

在这里我们已经用 _@Positive_ 注解了我们的属性。这将导致 jqwik 将值限制为只有正值——即，大于 0 的任何东西。

jqwik 附带了一系列可以应用于标准属性类型的约束——例如：

- 是否包含 _nulls_。
- 数字的最小值和最大值——无论是整数还是其他类型。
- 字符串和集合的最小和最大长度。
- 字符串中允许的字符。
- 等等。

### **5.2. 自定义约束**

通常情况下，标准约束对我们的需求来说已经足够好了。然而，在某些情况下，我们可能需要更有说明性。**jqwik 让我们有能力编写我们自己的生成函数，这些函数可以做任何我们需要它们做的事情。**

例如，我们知道零是我们不能用于除法的唯一情况。任何其他数字都应该可以正常工作。然而，jqwik 的标准注释不允许我们生成除一个值之外的所有东西。我们能做的最好的事情是从整个范围内生成数字。

所以，我们将自己生成数字。这将允许我们从整个整数范围中生成任何数字，除了零：

```java
@Property
public void divideNonZeroBySelf(@ForAll("nonZeroNumbers") int value) {
    int result = divide(value, value);
    assertEquals(result, 1);
}

@Provide
Arbitrary``<Integer>`` nonZeroNumbers() {
    return Arbitraries.integers().filter(v -> v != 0);
}
```

为了实现这一点，我们已经在我们的测试类中编写了一个新的方法，用 _@Provide_ 注解，它返回一个 _Arbitrary``<Integer>``_。然后我们在 _@ForAll_ 注解上指明使用这个方法来生成，而不是仅仅从参数类型的所有可能值集中。这样做意味着 jqwik 现在将使用我们的生成方法而不是默认的。

如果我们尝试这个，我们将看到我们得到了整个整数值范围内的大量正数和负数。而且 0 从未出现过——因为我们明确地过滤掉了它。

### **5.3. 假设**

**有时我们需要有多个属性，但是它们之间有约束。**例如，我们可能想要测试将一个大数除以一个小数总是会返回一个大于 1 的结果。我们可以很容易地为每个数字定义属性，但我们不能以另一个属性为条件来定义一个属性。

相反，这可以通过使用假设来完成。我们告诉测试我们假设一些先决