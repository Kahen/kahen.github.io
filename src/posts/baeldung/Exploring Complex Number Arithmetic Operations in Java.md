---
date: 2024-06-19
category:
  - Java
  - 数学
tag:
  - 复数
  - 运算
head:
  - - meta
    - name: keywords
      content: Java, 复数运算, 数学, 编程
---
# 探索Java中的复数算术运算

在这个教程中，我们将检查复数的算术运算。具体来说，我们将探讨如何在Java中对两个复数进行加法、减法、乘法和除法。

## 2. 什么是复数？

复数使用实部和虚部的组合来表示。它们通常表示为a+bi，其中a和b是实数，i代表虚数单位，相当于-1的平方根。在正式的数学符号中，a是复数的实部，而bi项是虚部。尽管复数最初可能让新手感到困惑，但它们在各种实际应用中发挥着关键作用，例如物理学和数学，包括量子力学、信号处理和经济学等领域。

像实数一样，我们可以执行加法、减法、乘法和除法等算术运算。对复数进行算术运算由于实部和虚部的组合而引入了复杂性。然而，每种运算都有特定的公式，这些公式简化了运算并确保了准确的结果。

## 3. 设置

我们可以在实现复数的算术运算之前设置所需的基础代码。让我们从定义一个表示复数的类开始：

```java
public record ComplexNumber(double real, double imaginary) {
    public static ComplexNumber fromString(String complexNumberStr) {
        // ...（代码省略）...
    }
    public String toString() {
        return real + "+" + imaginary + "i";
    }
}
```

上述类定义了复数的实部和虚部。我们使用_record_关键字来定义这个类以表示复数。此外，我们定义了_toString()_方法以返回复数的典型格式_a+bi_。

另外，我们重写了_fromString()_方法，将复数的字符串表示解析为_ComplexNumber_记录。我们使用正则表达式组从字符串中提取实部和虚部。

在后续部分中，我们可以通过添加执行各种算术运算的方法来增强这个记录。

## 4. 两个复数的加法

现在基本设置已经准备好，让我们实现两个复数相加的方法。**复数加法涉及分别添加两个数的实部和虚部以获得结果数**。为了更清晰的理解，让我们建立加法公式。让我们看看两个复数相加的公式：

```java
public ComplexNumber add(ComplexNumber that) {
    return new ComplexNumber(real + that.real, imaginary + that.imaginary);
}
```

我们可以从记录中直接访问实部和虚部，并在方法中与给定的复数结合。

## 5. 两个复数的减法

**两个复数的减法涉及分别减去它们的实部和虚部**。当减去复数_a+bi_和_c+di_时，我们分别减去实部（_a_和_c_）和虚部（_b_和_d_），得到的新复数的实部是原始实部的差，虚部是原始虚部的差。这是减法操作的公式：

```java
public ComplexNumber subtract(ComplexNumber that) {
    return new ComplexNumber(real - that.real, imaginary - that.imaginary);
}
```

这实现了减法，使用公式_(a-c)+(b-d)i_。

## 6. 两个复数的乘法

与加法和减法不同，两个复数的乘法并不那么简单。让我们看看乘法的公式：

```java
public ComplexNumber multiply(ComplexNumber that) {
    double newReal = this.real * that.real - this.imaginary * that.imaginary;
    double newImaginary = this.real * that.imaginary + this.imaginary * that.real;
    return new ComplexNumber(newReal, newImaginary);
}
```

上述方法实现了复数乘法的算法。

## 7. 两个复数的除法

**两个复数的除法比乘法更复杂**。它涉及一个更复杂的公式：

```java
public ComplexNumber divide(ComplexNumber that) {
    if (that.real == 0 && that.imaginary == 0) {
        throw new ArithmeticException("Division by 0 is not allowed!");
    }
    double c2d2 = Math.pow(that.real, 2) + Math.pow(that.imaginary, 2);
    double newReal = (this.real * that.real + this.imaginary * that.imaginary) / c2d2;
    double newImaginary = (this.imaginary * that.real - this.real * that.imaginary) / c2d2;
    return new ComplexNumber(newReal, newImaginary);
}
```

上述方法有效地除以两个复数。它包含错误处理以防止除以零，并在这种情况下提供清晰的错误消息。

## 8. 测试实现

现在我们已经实现了两个复数的算术运算，让我们为每种方法编写测试用例。**复数可以有各种形式，包括只有实部的、只有虚部的或两者都有的**。为了确保实现的健壮性，我们必须在所有这些场景中彻底测试我们的实现。为了全面的覆盖，我们可以利用JUnit的参数化测试来测试不同的输入。

为了在本文中保持简洁，我们将重点关注一个测试用例，演示复数的除法：

```java
@ParameterizedTest(name = "Dividing {0} and {1}")
@CsvSource({
    "3+2i, 1+7i, 0.34-0.38i",
    "2, 4, 0.5",
    "2, 4i, 0-0.5i",
    "1+1i, 1+1i, 1",
    "3 + 2i, 1 + 7i, 0.34-0.38i",
    "0+5i, 3+0i, 0+1.6666666666666667i",
    "0+0i, -2+0i, 0+0i",
    "-3+2i, 1-7i, -0.34-0.38i",
    "2+4i, 1, 2+4i"
})
public void givenTwoComplexNumbers_divideThemAndGetResult(String complexStr1, String complexStr2, String expectedStr) {
    // ...（代码省略）...
}
```

在上面的实现中，我们使用_@CsvSource_创建了一个全面的测试套件，涵盖了许多复数除法。实现了一个自定义实用方法_isSame()_，以有效地比较测试结果。类似地，我们可以使用相同的测试参数为其他算术运算实现测试。

我们还可以编写一个单独的测试来验证除以零的场景：

```java
@Test
public void givenAComplexNumberAsZero_handleDivideByZeroScenario() {
    // ...（代码省略）...
}
```

在这里，我们创建了一个实部和虚部都为零的复数，然后尝试除以它。使用_assertThrows()_，测试确保抛出了带有预期错误消息的异常。

## 9. 结论

在本文中，我们实现了Java中两个复数的算术运算。我们探讨了复数的加法、减法、乘法和除法，通过广泛的测试覆盖实现了健壮的功能。这包括使用参数化测试确保代码在各种输入值上正确运行。

如往常一样，本文中使用的示例代码可在GitHub上找到。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。