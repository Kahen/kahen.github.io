---
date: 2022-04-01
category:
  - Software Testing
  - Java
tag:
  - Gray Box Testing
  - OAT
  - Test Coverage
head:
  - - meta
    - name: keywords
      content: Java, Gray Box Testing, OAT, Test Coverage, Software Testing
---
# 灰色盒子测试使用OAT技术 | Baeldung

## 1. 概述

灰色盒子测试帮助我们在不测试每一种可能的场景的情况下建立充分的测试覆盖率。

在本教程中，我们将检查这种方法以及如何使用正交数组测试（OAT）技术来实现它。

最后，我们将确定使用灰色盒子测试的优点和缺点。

## 2. 什么是灰色盒子测试？

首先，我们比较白色与黑色盒子测试方法，然后理解灰色盒子测试。

白色盒子测试是指我们完全了解算法的测试部分。因此，我们可以测试该算法的所有路径。并且，由于这个原因，白色盒子测试可能会产生大量的测试场景。

黑色盒子测试意味着测试应用程序的外部视角。换句话说，我们对实现的算法一无所知，测试其所有路径更加困难。因此，我们专注于验证有限数量的测试场景。

灰色盒子测试使用有限的信息，通常是白色盒子测试中可用的信息。然后，它使用黑色盒子测试技术来使用可用的信息生成测试场景。

因此，我们最终的测试场景比白色盒子测试少。然而，**这些场景覆盖的功能比黑色盒子测试多**。

因此，**灰色盒子测试是黑色盒子测试技术和白色盒子测试知识的混合**。

## 3. 进行灰色盒子测试

在这一部分，我们将使用OAT技术在佣金计算器演示应用程序上进行灰色盒子测试。

### 3.1. 创建待测试系统

在测试之前，我们首先创建一个应用程序来计算销售人员基于四个属性的平均佣金：

- 销售人员级别 - L1、L2或L3
- 合同类型 - 全职佣金制、承包商或自由职业者
- 资历 - 初级、中级、高级
- 销售影响 - 低、中、高

为了实现这一点，让我们创建_SalaryCommissionPercentageCalculator_类来满足上述要求：

```java
public class SalaryCommissionPercentageCalculator {
    public BigDecimal calculate(Level level, Type type,
      Seniority seniority, SalesImpact impact) {
        return BigDecimal.valueOf(DoubleStream.of(
          level.getBonus(),
          type.getBonus(),
          seniority.getBonus(),
          impact.getBonus(),
          type.getBonus())
          .average()
          .orElse(0))
          .setScale(2, RoundingMode.CEILING);
    }

    public enum Level {
        L1(0.06), L2(0.12), L3(0.2);
        private double bonus;

        Level(double bonus) {
            this.bonus = bonus;
        }

        public double getBonus() {
            return bonus;
        }
    }

    // 其他枚举定义...
}
```

上面的代码定义了四个枚举来映射销售人员的属性。每个枚举包含一个表示每个属性佣金百分比的_bonus_字段。

_calculate()_方法使用双精度原始流计算所有百分比的平均值。

最后，我们使用_BigDecimal_类的_setScale()_方法将平均结果四舍五入到两位小数。

### 3.2. OAT技术简介

OAT技术基于田口博士提出的田口设计实验。该实验允许我们只考虑所有输入组合的一个子集来测试变量之间的交互。

这个想法是只考虑变量值之间的两个因素交互，并在构建实验时忽略重复的交互。这意味着**每个变量的值在实验子集中恰好与另一个变量的值交互一次**。当我们构建测试场景时，这将变得清晰。

变量及其值用于构建正交数组。**正交数组是一个数字数组，其中每一行表示变量的唯一组合**。列代表可以取几个值的单个变量。

我们可以将正交数组表示为_val^var_，其中_val_是它们假设的数值，_var_是输入变量的数量。在我们的例子中，我们有四个变量，每个变量假设三个值。因此，_val_等于_3_，_var_等于_4_。

最后，正确的正交数组是_3^4_，也称为田口设计中的“L9：3级4因素”。

### 3.3. 获取正交数组

计算正交数组可能过于复杂且计算成本高昂。为此，OAT测试的设计者通常使用已经映射好的数组列表。因此，我们可以使用这些数组目录来找到正确的一个。在我们的例子中，目录中正确的数组是L9 3级4因素数组：

| 场景编号 | var 1 | var 2 | var 3 | var 4 |
| --- | --- | --- | --- | --- |
| 1 | _val 1_ | _val 1_ | _val 1_ | _val 1_ |
| 2 | _val 1_ | _val 2_ | _val 3_ | _val 2_ |
| 3 | _val 1_ | _val 3_ | _val 2_ | _val 3_ |
| ... | ... | ... | ... | ... |

### 3.4. 映射变量及其值

现在，我们必须将变量及其值按照它们在代码中出现的顺序替换到我们的正交数组中。例如，_var 1_ 对应于第一个定义的_enum_，_Level_，其中_Level_下的_val 0_是它的第一个值，_L1_。

映射完所有变量后，我们得到下面的填充表格：

| 场景编号 | Level | Type | Seniority | SalesImpact |
| --- | --- | --- | --- | --- |
| 1 | L1 | FULL_TIME_COMMISSIONED | JR | LOW |
| 2 | L1 | CONTRACTOR | SR | MEDIUM |
| 3 | L1 | FREELANCER | MID | HIGH |
| ... | ... | ... | ... | ... |

### 3.5. 配置JUnit 5

本文的主要重点是使用OAT灰色盒子技术进行灰色盒子测试。因此，为了简单起见，我们将使用简单的单元测试来说明它。

首先，我们需要在我们的项目中配置JUnit 5。为此，让我们将最新依赖项junit-jupiter-engine添加到我们的_pom.xml_文件中：

```xml
`<dependency>`
    `<groupId>`org.junit.jupiter`</groupId>`
    `<artifactId>`junit-jupiter-engine`</artifactId>`
    `<version>`5.10.2`</version>`
    `<scope>`test`</scope>`
`</dependency>`
```

### 3.6. 创建测试类

让我们定义_SalaryCommissionPercentageCalculatorUnitTest_类：

```java
class SalaryCommissionPercentageCalculatorUnitTest {
    private SalaryCommissionPercentageCalculator testTarget = new SalaryCommissionPercentageCalculator();

    @ParameterizedTest
    @MethodSource("provideReferenceTestScenarioTable")
    void givenReferenceTable_whenCalculateAverageCommission_thenReturnExpectedResult(Level level,
      Type type, Seniority seniority, SalesImpact impact, double expected) {
        BigDecimal got = testTarget.calculate(level, type, seniority, impact);
        assertEquals(BigDecimal.valueOf(expected), got);
    }

    private static Stream`<Arguments>` provideReferenceTestScenarioTable() {
        return Stream.of(
                Arguments.of(L1, FULL_TIME_COMMISSIONED, JR, LOW, 0.26),
                // ... 其他参数
        );
    }
}
```

要理解发生了什么，让我们分解代码。

测试方法使用JUnit 5参数化测试和_@MethodSource_注解，使用一个方法作为输入数据提供者。

_provideReferenceTestScenarioTable()_提供了与第3.4节中的正交数组相同的数据，作为参数的_Stream_。每个_Argument.of()_调用对应于一个测试场景和_calculate()_调用的预期结果。

最后，我们使用提供的参数调用_calculate()_，并使用_assertEquals()_比较实际结果与预期结果。

## 4. 灰色盒子测试的优缺点

在我们的示例中，_input of calculate()_的总排列数是_81_。**我们使用OAT将其数量减少到9，同时保持良好的测试覆盖率。**

尝试所有输入组合可能变得困难，如果输入大小变得太大。例如，在具有10个变量和10个值的系统中，总场景数将是10 e10。测试这样高数量的场景是不切实际的。我们可以通过使用OAT来减少这个数字，避免输入的组合爆炸。

因此，**OAT技术的主要优点是它提高了测试代码的可维护性和开发速度**，而不失测试覆盖率。

另一方面，**OAT技术和灰色盒子测试通常的缺点是没有覆盖所有可能的输入排列。** 因此，我们可能会错过重要的测试场景或问题边缘情况。

## 5. 结论

在本文中，我们检查了OAT技术，以理解灰色盒子测试。

使用这种技术，我们大幅减少了测试场景的数量。然而，我们必须适当评估何时使用它，因为我们可能会错过重要的边缘情况。

像往常一样，示例代码可在GitHub上获得。