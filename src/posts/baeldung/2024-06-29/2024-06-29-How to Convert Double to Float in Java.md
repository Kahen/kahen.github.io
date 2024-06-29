---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - double
  - float
  - conversion
head:
  - - meta
    - name: keywords
      content: Java, double to float, conversion, programming
---
# Java中Double与Float的转换

_双精度浮点数_和_单精度浮点数_是Java中表示小数的两种数据类型。它们在处理小数时各有不同。

在本教程中，我们将讨论_double_和_float_，并学习如何将它们相互转换。

### 2. Java中的Double和Float是什么

**_float_是32位单精度浮点类型，可以存储大约7位小数。** 这种数据类型在需要节省内存时具有优势。然而，不建议使用_float_来处理货币或高精度数据计算。

声明原始数据类型的_float_变量时，我们可以使用_float_关键字：

```java
float vatRate = 14.432511f;
```

对于包装类，我们应该使用_Float_类：

```java
Float localTaxRate = 20.12434f;
```

由于我们处理的是_float_，变量的末尾应该有“f”后缀。否则，编译器会将其视为_double_并报错。

**另一方面，_double_是64位双精度浮点类型。** 这种数据类型可以存储比_float_更多的小数位数，大约17位小数。由于其更高的精度，它是十进制计算的常见选择。和_float_一样，_double_也不推荐用于货币计算。

以下是如何使用_double_关键字声明_double_的示例：

```java
double shootingAverage = 56.00000000000001;
```

通过_Double_包装类声明_double_的另一种方式：

```java
Double assistAverage = 81.123000000045;
```

在决定使用_double_还是_float_数据类型时，需要考虑应用程序的技术需求和业务需求。

### 3. Double和Float之间的转换

在_Double_和_Float_之间进行转换是一个常见的技术需求。然而，在转换时我们应该小心，因为我们可能会丢失一些小数精度。随后，这可能导致我们的应用程序出现意外的行为。

#### 3.1. 将Double转换为Float

让我们通过类型转换演示如何转换变量：

```java
double interestRatesYearly = 13.333333333333333;
float interest = (float) interestRatesYearly;
System.out.println(interest); //13.333333
Assert.assertEquals(13.333333f, interest, 0.000001f);
```

由于我们执行了从_double_到_float_的类型转换，我们的新_float_值与其原始值相比丢失了一些小数位。

为了使用assertEquals()测试这种转换，我们使用了一个delta参数，值为0.000001，这对于转换后的13.333333值来说是足够的。

将_double_转换为_float_的另一种方法是通过包装类：

```java
Double monthlyRates = 2.111111111111111;
float rates = monthlyRates.floatValue();
System.out.println(rates); //2.1111112
Assert.assertEquals(2.1111111f, rates, 0.0000001f);
```

在上面的示例中，_monthlyRates_对象调用了一个名为_floatValue()_的方法，该方法返回了一个_float_。

与我们的第一个转换示例类似，我们为我们的delta使用了0.0000001的值。

#### 3.2. 将Float转换为Double

接下来，让我们展示如何将_float_转换为_double_数据类型：

```java
float gradeAverage =2.05f;
double average = gradeAverage;
System.out.println(average); //2.049999952316284
Assert.assertEquals(2.05, average, 0.01);
```

我们注意到转换为_double_的结果与我们预期的不同。问题在于浮点数的二进制表示。

将_float_转换为_double_的另一种方式是通过使用_Double_类通过_doubleValue()_方法：

```java
Float monthlyRates = 2.1111111f;
Double rates = monthlyRates.doubleValue();
System.out.println(rates); //2.1111111640930176
Assert.assertEquals(2.11111111, rates, 0.0000001);
```

像我们前一节的测试一样，我们在assertEquals()中使用了delta参数，用于本节的单元测试。

### 4. 结论

在本文中，我们讨论了_float_和_double_数据类型。每种数据类型都有其特点和自己的精度大小。_double_数据类型比_float_有更多的小数位。然而，_float_数据类型在内存使用方面有自己的优势，而_double_在精度方面有其优势。

文章中使用的有代码示例都可以在GitHub上找到。