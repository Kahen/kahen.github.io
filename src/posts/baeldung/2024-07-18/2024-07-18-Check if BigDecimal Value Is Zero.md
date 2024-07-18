---
date: 2022-04-01
category:
  - Java
  - BigDecimal
tag:
  - BigDecimal
  - Java
  - Zero
head:
  - - meta
    - name: keywords
      content: BigDecimal, Java, Zero
------
# 检查BigDecimal值是否为零

## 1. 概述

当我们在Java中进行小数计算时，可能会考虑使用_BigDecimal_类。

在这个简短的教程中，我们将探讨如何检查一个_BigDecimal_对象的值是否为零。

## 2. 问题介绍

问题其实相当直接。假设我们有一个非空的_BigDecimal_对象。我们想知道它的值是否等于零。

敏锐的眼睛可能已经意识到了“_它的值是否等于零_”的要求隐含了解决方案：使用_equals()_方法。此外，_BigDecimal_类提供了一个方便的_ZERO_常量对象来表示零值。

确实，这个问题听起来很简单。我们可以简单地检查_BigDecimal.ZERO.equals(givenBdNumber)_来决定_if the givenBdNumber object has the value zero_（如果给定的BdNumber对象的值是否为零）。然而，**如果我们不知道_BigDecimal_的比较细节，我们可能会陷入一个常见的陷阱**。

接下来，让我们更仔细地看看它，并解决正确的方法。

## 3. _BigDecimal_比较的常见陷阱：使用_equals_方法

首先，让我们创建一个值为零的_BigDecimal_对象：

```java
BigDecimal BD1 = new BigDecimal("0");
```

现在，让我们使用_equals_方法检查_BD1_的值是否为零。为了简单起见，让我们在单元测试方法中这样做：

```java
assertThat(BigDecimal.ZERO.equals(BD1)).isTrue();
```

如果我们运行测试，它会通过。到目前为止，一切都很好。我们可能会认为这是解决方案。接下来，让我们创建另一个_BigDecimal_对象：

```java
BigDecimal BD2 = new BigDecimal("0.0000");
```

显然，_BD2_对象的值是零，尽管我们通过一个有四位小数的字符串构建了它。众所周知，0.0000在值上与0相同。

现在，让我们再次使用_equals_方法测试BD2：

```java
assertThat(BigDecimal.ZERO.equals(BD2)).isTrue();
```

这次，如果我们运行该方法，**令人惊讶的是，测试将失败**。

这是因为一个_BigDecimal_对象具有值和小数位属性。此外，**_equals_方法仅在两个_BigDecimal_对象在值和小数位上都相等时才认为它们相等**。也就是说，如果我们使用_equals_比较，_BigDecimal_ 42与42.0不相等。

另一方面，_BigDecimal.ZERO_常量具有零值和小数位也为零。因此，当我们检查“_0 equals 0.0000_”时，_equals_方法返回_false_。

因此，我们需要找到一种方法，只比较两个_BigDecimal_对象的值，而忽略它们的小数位。

接下来，让我们看看几种解决这个问题的方法。

## 4. 使用_compareTo_方法

_BigDecimal_类实现了_Comparable_接口。因此，我们可以使用_compareTo_方法来比较两个_BigDecimal_对象的值。

此外，_compareTo_方法的Javadoc明确指出：

> 两个在值上相等但在小数位上不同（如2.0和2.00）的_BigDecimal_对象，通过这种方法被认为是相等的。

因此，**我们可以检查_BigDecimal.ZERO.compareTo(givenBdNumber) == 0_**来决定给定的BdNumber是否为零。

接下来，让我们测试这种方法是否可以正确地判断两个_BigDecimal_对象_BD1_和_BD2_是否为零：

```java
assertThat(BigDecimal.ZERO.compareTo(BD1)).isSameAs(0);
assertThat(BigDecimal.ZERO.compareTo(BD2)).isSameAs(0);
```

当我们运行测试时，它通过了。因此，我们使用_compareTo_方法解决了问题。

## 5. 使用_signum_方法

**_BigDecimal_类提供了_signum_方法，以判断给定的_BigDecimal_对象的值是负数（-1）、零（0）还是正数（1）**。_signum_方法将忽略小数位属性。

因此，我们可以通过检查_(givenBdNumber.signum() == 0)_来解决这个问题。

再次，让我们编写一个测试来验证这种方法是否适用于两个示例：

```java
assertThat(BD1.signum()).isSameAs(0);
assertThat(BD2.signum()).isSameAs(0);
```

如果我们运行上述测试，它将通过。

## 6. 结论

在这篇简短的文章中，我们讨论了两种正确的方法来检查一个_BigDecimal_对象的值是否为零：_compareTo_方法或_signum_方法。

像往常一样，这篇文章的完整代码可以在GitHub上找到。