---
date: 2024-06-25
category:
  - Java
  - 2D Geometry
tag:
  - Point
  - Straight Line
  - Check
head:
  - - meta
    - name: keywords
      content: Java, 2D Geometry, Point Check, Straight Line
------
# 在Java中检查一个点是否在直线上的两点之间

## 1. 概述

在使用二维几何时，一个常见的问题是确定一个点是否在直线上的另外两个点之间。

在这个快速教程中，我们将探讨在Java中进行这种判断的不同方法。

## 2. 理解问题陈述

假设我们在平面上有两个点：第一个点A的坐标是(x1, y1)，第二个点B的坐标是(x2, y2)。我们想要检查给定的点C，其坐标为(x3, y3)，是否在A和B之间：

在上面的图表中，点C位于点A和B之间，而点D不位于点A和B之间。

## 3. 使用距离公式

这种方法涉及计算距离：从点A到C的AC距离，从点C到B的CB距离，以及从点A到B的AB距离。如果C位于点A和B之间，那么AC和CB的距离之和将等于AB：

```
AC距离 + CB距离 == AB距离
```

我们可以使用距离公式来计算两个不同点之间的距离。如果点A的坐标是(x1, y1)，点B的坐标是(x2, y2)，那么我们可以使用以下公式计算距离：

```
distance = sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1))
```

让我们使用距离公式在上述图表上验证这种方法：

从点A (1,1) 到点B (5,5) 的距离 = 5.656

从点A (1,1) 到点C (3,3) 的距离 = 2.828

从点C (3,3) 到点B (5,5) 的距离 = 2.828

这里，AC距离 + CB距离 = 5.656，等于AB距离。这表明点C位于点A和B之间。

让我们使用距离公式检查一个点是否位于两个点之间：

```java
boolean isPointBetweenTwoPoints(double x1, double y1, double x2, double y2, double x, double y) {
    double distanceAC = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
    double distanceCB = Math.sqrt(Math.pow(x2 - x,2) + Math.pow(y2 - y, 2));
    double distanceAB = Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1, 2));
    return Math.abs(distanceAC + distanceCB - distanceAB) < 1e-9;
}
```

这里，1e-9是一个小的epsilon值，用于考虑浮点计算中可能出现的舍入误差和不精确性。如果绝对差值非常小（小于1e-9），我们将认为它是相等的。

让我们使用上述值测试这种方法：

```java
void givenAPoint_whenUsingDistanceFormula_thenCheckItLiesBetweenTwoPoints() {
    double x1 = 1;    double y1 = 1;
    double x2 = 5;    double y2 = 5;
    double x = 3;    double y = 3;
    assertTrue(findUsingDistanceFormula(x1, y1, x2, y2, x, y));
}
```

## 4. 使用斜率公式

在这种方法中，我们将计算AB和AC的斜率，使用斜率公式。**我们将比较这些斜率以检查共线性，即AB和AC的斜率相等。这将帮助我们确定点A、B和C是否对齐。**

如果点A的坐标是(x1, y1)，点B的坐标是(x2, y2)，那么我们可以使用以下公式计算斜率：

```
slope = (y2 - y1) / (x2 - x1)
```

如果AB和AC的斜率相等，并且点C的x和y坐标位于由A和B点定义的范围内，我们可以说点C位于点A和B之间。

让我们计算上述图表中AB和AC的斜率以验证这种方法：

AB的斜率 = 1.0

AC的斜率 = 1.0

点C是(3,3)

这里，AB = AC，并且点C的x和y坐标位于由A (1,1)和B (5,5)定义的范围内，这表明点C位于点A和B之间。

让我们使用这种方法检查一个点是否位于两个点之间：

```java
boolean findUsingSlopeFormula(double x1, double y1, double x2, double y2, double x, double y) {
    double slopeAB = (y2 - y1) / (x2 - x1);
    double slopeAC = (y - y1) / (x - x1);
    return slopeAB == slopeAC && ((x1 <= x && x <= x2) || (x2 <= x && x <= x1)) && ((y1 <= y && y <= y2) || (y2 <= y && y <= y1));
}
```

让我们使用上述值测试这种方法：

```java
void givenAPoint_whenUsingSlopeFormula_thenCheckItLiesBetweenTwoPoints() {
    double x1 = 1;    double y1 = 1;
    double x2 = 5;    double y2 = 5;
    double x = 3;    double y = 3;
    assertTrue(findUsingSlopeFormula(x1, y1, x2, y2, x, y));
}
```

## 5. 结论

在这个教程中，我们讨论了确定一个点是否在直线上的另外两个点之间的方法。

像往常一样，示例中使用的代码可以在GitHub上找到。