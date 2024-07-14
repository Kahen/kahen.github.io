---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - BMI Calculator
  - Java
head:
  - - meta
    - name: keywords
      content: Java, BMI Calculator, Body Mass Index, Programming
---

# 在Java中创建BMI计算器

在本教程中，我们将在Java中创建一个BMI（身体质量指数）计算器。

在开始实现之前，我们首先来理解BMI的概念。

### 2. 什么是BMI？

BMI代表身体质量指数。它是从个人的身高和体重中派生出来的一个值。

借助BMI，我们可以判断一个人的体重是否健康。

让我们来看一下计算BMI的公式：

**BMI = 体重（千克） / （身高（米） * 身高（米））**

根据BMI范围，一个人被归类为“低体重”、“正常”、“超重”或“肥胖”：

| BMI范围 | 类别     |
| ------- | -------- |
| `< 18.5  | 低体重   |
| 18.5 – 25 | 正常     |
| 25 – 30  | 超重     |
| >` 30    | 肥胖     |

例如，让我们计算一个体重等于100kg（千克）和身高等于1.524m（米）的个人的BMI。

BMI = 100 / (1.524 * 1.524)

BMI = 43.056

**由于BMI大于30，这个人被归类为“超重”。**

### 3. Java程序计算BMI

Java程序包括用于计算BMI的公式和简单的_if_–_else_语句。使用上述公式和表格，我们可以找出一个人属于哪个类别：

```java
static String calculateBMI(double weight, double height) {
    double bmi = weight / (height * height);

    if (bmi < 18.5) {
        return "低体重";
    }
    else if (bmi < 25) {
        return "正常";
    }
    else if (bmi < 30) {
        return "超重";
    }
    else {
       return "肥胖";
    }
}
```

### 4. 测试

让我们通过提供一个人的身高和体重来测试代码，这个人是“肥胖”的：

```java
@Test
public void whenBMIIsGreaterThanThirty_thenObese() {
    double weight = 50;
    double height = 1.524;
    String actual = BMICalculator.calculateBMI(weight, height);
    String expected = "肥胖";

    assertThat(actual).isEqualTo(expected);
}
```

运行测试后，我们可以看到实际结果与预期结果相同。

### 5. 结论

在本文中，我们学习了如何在Java中创建BMI计算器。我们还通过编写JUnit测试来测试实现。

如常，教程的完整代码可在GitHub上找到。