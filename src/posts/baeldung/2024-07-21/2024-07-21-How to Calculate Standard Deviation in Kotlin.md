---
date: 2022-11-01
category:
  - Kotlin
  - 编程
tag:
  - 标准差
  - 数学
  - 统计学
head:
  - - meta
    - name: keywords
      content: Kotlin, 标准差, 编程, 数学, 统计学
------
# 如何在 Kotlin 中计算标准差 | Baeldung 关于 Kotlin

## 1. 引言

在编程中，计算标准差是一个关键的统计任务，当我们需要确定数据集中的变异量或离散程度时，它非常有用。

在 Kotlin 中，有几种方法可以计算表示为数组的一系列数字的标准差。在本教程中，我们将探讨这些方法中的几种。

## 2. 标准差的定义和公式

正如前面提到的，标准差是衡量数据集中变异量或离散程度的一种方法。**我们可以通过找到所考虑数据的方差的平方根来计算标准差**。方差是每个数据点与所考虑数据的平均值之间的差的平方的平均值。

数学上，方差的公式是：
\[ \text{方差} = \frac{\sum (x - \mu)^2}{N} \]

其中 \( \Sigma \) 表示每个数据点 \( x \) 减去数据的平均值 \( \mu \) 的平方的总和。 \( N \) 表示数据点的数量。

因此，知道如何计算方差后，我们通过取方差的平方根来数学上获得标准差：
\[ \text{标准差} = \sqrt{\text{方差}} \]

## 3. 使用 Kotlin 的标准库

第一种方法需要使用 Kotlin 的数学包，该包包含在标准库中。这个包带有许多方法，可以完成不同的数学任务，包括标准差。

具体来说，我们可以使用 _sqrt()_ 方法来计算平方根，使用 _pow()_ 来处理指数，使用 _average()_ 来计算数字列表的平均值：
```kotlin
fun standardDeviationUsingMathPackage(numbers: DoubleArray): Double {
    val mean = numbers.average()
    val variance = numbers.map { (it - mean).pow(2) }.average()
    return Math.sqrt(variance)
}
```
在上述方法中，我们首先使用 _average()_ 方法计算数据集的平均值。**接下来，我们通过从数据集中的每个数字中减去平均值，平方结果，然后获取平方差的平均水平作为数据集的方差**。最后，我们返回方差的平方根以获得标准差。

现在，为了确保我们的方法正确，进行单元测试是一个好主意：
```kotlin
@Test
fun `standard deviation using the math package`() {
    val dataset1 = doubleArrayOf(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)
    val dataset2 = doubleArrayOf(11.0, 14.0, 19.0, 23.0, 28.0, 30.0)

    assertEquals(1.707825127659933, standardDeviationUsingMathPackage(dataset1))
    assertEquals(6.914156170897181, standardDeviationUsingMathPackage(dataset2))
}
```

## 4. 使用 Apache Commons Math 库

另一种实现目的方法是利用提供复杂统计方法的第三方库。Apache Commons Math 库是这方面的一个流行选择，并提供了几种计算标准差的方法。

### 4.1. Maven 和 Gradle 配置

要在我们的 Maven 项目中使用这个库，我们需要在项目的 _pom.xml_ 文件中包含依赖项：
```xml
`<dependency>`
    `<groupId>`org.apache.commons`</groupId>`
    `<artifactId>`commons-math3`</artifactId>`
    `<version>`3.6.1`</version>`
`</dependency>`
```

对于 Gradle 项目，我们只需要在项目的 _build.gradle_ 文件中添加以下行：
```groovy
implementation 'org.apache.commons:commons-math3:3.6.1'
```

### 4.2. 实现

现在，让我们使用这个库来计算数据集的标准差：
```kotlin
fun calculateStandardDeviationUsingApacheCommonsMath(dataset: DoubleArray): Double {
    val sd = StandardDeviation(false)
    return sd.evaluate(dataset)
}
```
在这个方法中，我们使用 _false_ 参数实例化 _StandardDeviation_ 实例。**此参数允许我们指定所考虑的数据是样本还是整个总体**。

如果设置为 _true_，此库将将数据集视为样本，并在计算标准差时应用略有不同的公式。然而，如果我们将此参数设置为 _false_，则库将将整个总体视为数据，并使用除以 _n_ 的公式计算标准差。

最后，我们在使用数据集作为参数的 _StandardDeviation_ 实例上使用 _evaluate()_ 方法。这将返回数据集的标准差。

为了确保我们的实现正确，我们应该测试我们的函数：
```kotlin
@Test
fun `standard deviation using the apache commons math library`() {
    val dataset1 = doubleArrayOf(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)
    val dataset2 = doubleArrayOf(11.0, 14.0, 19.0, 23.0, 28.0, 30.0)

    assertEquals(1.707825127659933, calculateStandardDeviationUsingApacheCommonsMath(dataset1))
    assertEquals(6.914156170897181, calculateStandardDeviationUsingApacheCommonsMath(dataset2))
}
```

## 5. 结论

在本文中，我们探讨了计算数据集标准差的两种主要方法。第一种方法涉及使用 Kotlin 的数学包，该包包含在标准库中，并且可以立即在我们的 Kotlin 程序中使用。

相反，第二种方法涉及使用第三方库，Apache Commons Math 库。虽然这个库为我们提供了高级统计方法，但它需要我们首先为项目配置它，然后才能使用。

一如既往，与本文相关的代码示例和相关测试用例可以在 GitHub 上找到。