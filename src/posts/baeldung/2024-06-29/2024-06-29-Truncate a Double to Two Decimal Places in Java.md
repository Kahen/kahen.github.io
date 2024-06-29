---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java
  - Double
  - Rounding
head:
  - - meta
    - name: keywords
      content: Java, Double, Rounding, Truncate
---
# Java中将double截断为两位小数的方法 | Baeldung

## 1. 概述

在本教程中，我们将探讨Java中将_double_截断为两位小数的多种选项。我们将看到将结果保留为_String_的方法，以及返回_Numbers_的选项。

## 2. 使用_Math.floor()_和_Math.ceil()_进行四舍五入

我们将首先检查使用_Math_类来去除多余的小数位的方法。要将正数截断为两位小数，我们首先将_double_乘以100，将我们想要保留的所有数字移动到小数点前面。接下来，我们使用_Math.floor()_向下取整，去除小数点后的数字。最后，我们除以100来撤销之前的乘法：

```java
@Test
void givenADouble_whenUsingMath_truncateToTwoDecimalPlaces(){
    double positive = 1.55555555;
    double truncated = Math.floor(positive * 100) / 100;
    assertEquals("1.55", String.valueOf(truncated));

    double negative = -1.55555555;
    double negativeTruncated = Math.ceil(negative * 100) / 100;
    assertEquals("-1.55", String.valueOf(negativeTruncated));
}
```

对于负数，过程几乎相同，但我们使用_Math.ceil()_而不是_Math.floor()_来向上取整。如果我们愿意，我们可以添加额外的代码来检测_double_是负数还是正数，并自动使用正确的方法。

对于去除更多或更少的小数位，我们将在乘法和除法的数字中添加或删除零。例如，要保持三位小数，我们将乘以和除以1000。如果我们想要保持_double_作为_double_而不是转换为_String_，这种方法很有用。

## 3. 使用_String.format()_

让我们继续探讨那些为显示目的而设计的方法。这些方法将返回一个_String_，但如果需要，我们总是可以将结果转换回_double_。_String.format()_方法接受两个参数。首先，我们想要应用的格式，其次，由格式引用的参数。要截断到两位小数，我们将使用格式_String_ "%.2f"：

```java
@Test
void givenADouble_whenUsingStringFormat_truncateToTwoDecimalPlaces() {
    double positive = 1.55555555;
    String truncated = String.format("%.2f", positive);
    assertEquals("1.56", truncated);

    double negative = -1.55555555;
    String negativeTruncated = String.format("%.2f", negative);
    assertEquals("-1.56", negativeTruncated);
}
```

我们格式_String_末尾的'f'指示格式化器产生十进制格式，'.2'意味着我们想要小数点后两位数字。我们可以调整这个来截断所需的小数位数。我们可以看到，在测试中，结果实际上已经向上取整而不是截断，所以根据我们的需求，这可能不适合。

## 4. 使用_NumberFormat_

_NumberFormat_是一个抽象类，设计用来让我们格式化任何数字。因为它是一个抽象类，我们需要先使用_getNumberInstance()_来接收一个我们可以使用的对象。注意，这将使用我们的默认区域设置，除非我们指示它做其他事情。我们可以接着使用_setMaximumFractionDigits()_来说我们想要多少小数位。最后，因为我们想要截断而不是四舍五入，我们使用_setRoundingMode()_并用参数_RoundingMode.DOWN_调用：

```java
@Test
public void givenADouble_whenUsingNumberFormat_truncateToTwoDecimalPlaces(){
    NumberFormat nf = NumberFormat.getNumberInstance();
    nf.setMaximumFractionDigits(2);
    nf.setRoundingMode(RoundingMode.DOWN);

    double value = 1.55555555;
    String truncated = nf.format(value);
    assertEquals("1.55", truncated);

    double negativeValue = -1.55555555;
    String negativeTruncated = nf.format(negativeValue);
    assertEquals("-1.55", negativeTruncated);
}
```

使用NumberFormat设置后，只需使用_double_调用_format()_即可。在上面的测试中，我们可以看到它对正数和负数都表现得很好。

## 5. 使用_DecimalFormat_

_DecimalFormat_是_NumberFormat_的一个子类，专门用于小数。**它是一个具体类，所以我们可以直接创建它的实例，将我们想要的模式传递给构造函数。** 我们将在这里传递“#.##。”，小数点后的井号数量表示要保留多少位：

```java
@Test
public void givenADouble_whenUsingDecimalFormat_truncateToTwoDecimalPlaces(){
    DecimalFormat df = new DecimalFormat("#.##");
    df.setRoundingMode(RoundingMode.DOWN);

    double value = 1.55555555;
    String truncated = df.format(value);
    assertEquals("1.55", truncated);

    double negativeValue = -1.55555555;
    String negativeTruncated = df.format(negativeValue);
    assertEquals("-1.55", negativeTruncated);
}
```

与之前的_NumberFormat_一样，我们指定了使用_RoundingMode.DOWN_。我们再次看到，这个解决方案很好地处理了正数和负数，这使它很有用。

## 6. 使用_BigDecimal_获得最佳精度

Java的_BigDecimal_类最适合直接截断小数位，同时保持结果为我们可以工作的数字。如果可能使用这个而不是_double_，这可能是最佳选项。我们可以通过将_double_值传递到构造函数中，并直接告诉它保留两位小数同时向下取整来创建一个_BigInteger_：

```java
@Test
void givenADouble_whenUsingBigDecimal_truncateToTwoDecimalPlaces(){
    BigDecimal positive = new BigDecimal(2.555555).setScale(2, RoundingMode.DOWN);
    BigDecimal negative = new BigDecimal(-2.555555).setScale(2, RoundingMode.DOWN);
    assertEquals("2.55", positive.toString());
    assertEquals("-2.55", negative.toString());
}
```

为了这个测试的目的，我们把结果转换为_String_，以清楚地显示结果是什么。然而，如果我们想要的话，我们可以继续使用截断的输出进行进一步的计算。

## 7. 结论

我们探讨了Java中截断_double_的五种不同方式。我们看到_String.format()_、_NumberFormat_和_DecimalFormat_适用于我们创建显示目的的场合，因为它们输出_String_ s。当然，我们总是可以使用_Double.parseDouble()_将我们的_String_ s转换回_doubles_。或者，我们可以使用_Math_类或_BigDecimal_来保持我们的截断值为数字，以供进一步计算。

和往常一样，示例的完整代码可以在GitHub上找到。