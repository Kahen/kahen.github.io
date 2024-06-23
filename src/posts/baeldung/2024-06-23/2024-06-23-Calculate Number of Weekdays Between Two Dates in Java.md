---
date: 2024-06-24
category:
  - Java
  - 教程
tag:
  - 工作日计算
  - Java日期操作
head:
  - - meta
    - name: keywords
      content: Java, 工作日计算, 日期操作
---
# Java中计算两个日期之间工作日的数量 | Baeldung

## 1. 概述

在本教程中，我们将探讨Java中计算两个日期之间工作日数量的两种不同方法。我们将看到一种使用_流_的可读版本，以及一种不那么易读但更高效的选项，它根本不进行循环。

## 2. 使用_流_的全搜索

首先，让我们看看如何使用_流_来实现。**计划是循环遍历我们两个日期之间的每一天，并计算工作日**：

```
long getWorkingDaysWithStream(LocalDate start, LocalDate end){
    return start.datesUntil(end)
      .map(LocalDate::getDayOfWeek)
      .filter(day -> !Arrays.asList(DayOfWeek.SATURDAY, DayOfWeek.SUNDAY).contains(day))
      .count();
}
```

我们首先使用了_LocalDate_的_datesUntil()_方法。这个方法返回从开始日期（包括）到结束日期（不包括）的所有日期的_流_。

接下来，我们使用_map()_和_LocalDate_的_getDayOfWeek()_将每个日期转换为星期几。例如，这将把2023年1月10日转换为星期三。

然后，我们通过检查_DaysOfWeek_枚举来过滤掉所有周末的日子。最后，我们可以计算剩余的天数，因为我们知道这些都将是工作日。

**这种方法不是最快的，因为我们必须查看每一天。** 然而，它易于理解，并提供了轻松添加额外检查或处理的机会。

## 3. 不循环的高效搜索

**我们有另一种选择，那就是不循环遍历所有的日子，而是应用我们对星期几的规则。** 这里我们需要几个步骤，并注意一些边缘情况。

### 3.1. 设置初始日期

首先，我们将定义我们的方法签名，它将与我们之前的非常相似：

```
long getWorkingDaysWithoutStream(LocalDate start, LocalDate end)
```

**处理这些日期的第一步是排除开始和结束时的任何周末。** 因此，对于开始日期，如果是周末，我们将取下一个星期一。我们还将使用一个_布尔值_来跟踪我们是否这样做了：

```
boolean startOnWeekend = false;
if(start.getDayOfWeek().getValue() > 5){
    start = start.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
    startOnWeekend = true;
}
```

我们在这里使用了_TemporalAdjusters_类，特别是它的_next()_方法，它让我们跳到指定的下一天。

然后，我们可以对结束日期做同样的事情——如果是周末，我们取上一个星期五。这次我们将使用_TemporalAdjusters.previous()_来带我们回到我们想要的日期之前的第一次出现：

```
boolean endOnWeekend = false;
if(end.getDayOfWeek().getValue() > 5){
    end = end.with(TemporalAdjusters.previous(DayOfWeek.FRIDAY));
    endOnWeekend = true;
}
```

### 3.2. 考虑边缘情况

这已经为我们提供了一个潜在的边缘情况，如果我们从星期六开始到星期日结束。在这种情况下，我们的开始日期现在是星期一，结束日期是之前的星期五。开始日期在结束日期之后是没有意义的，所以我们可以用一个快速检查来覆盖这种潜在的使用情况：

```
if(start.isAfter(end)){
    return 0;
}
```

**我们还需要覆盖另一个边缘情况，这就是我们为什么保留了开始和结束在周末的记录。** 这是可选的，取决于我们想要如何计算天数。例如，如果我们计算同一周的星期二和星期五之间的天数，我们会说它们之间有三天。

我们也会说从星期六到下一个星期有五个工作日。然而，如果我们像我们现在这样做，将开始和结束日期移动到星期一和星期五，那么现在计算为四天。为了抵消这一点，我们可以简单地添加一天，如果需要的话：

```
long addValue = startOnWeekend || endOnWeekend ? 1 : 0;
```

### 3.3. 最终计算

我们现在可以计算开始和结束之间的总周数。为此，**我们将使用_ChronoUnit_的_between()_方法。这个方法计算两个_Temporal_对象之间的时间，在指定的单位，在我们的情况下是_周_**：

```
long weeks = ChronoUnit.WEEKS.between(start, end);
```

**最后，我们可以使用到目前为止收集的所有信息来得到工作日数量的最终值：**

```
return ( weeks * 5 ) + ( end.getDayOfWeek().getValue() - start.getDayOfWeek().getValue() ) + addValue;
```

这里的步骤首先是将周数乘以每周的工作日数。我们还没有考虑到非整周，所以我们加上了从一周的开始日到结束日之间的额外天数。最后，我们加上了开始或结束在周末的调整。

## 4. 结论

在本文中，我们看到了计算两个日期之间工作日数量的两种选项。

首先，我们看到了如何使用_流_并逐个检查每一天。这种方法以牺牲效率为代价提供了简单性和可读性。

第二个选项是应用我们对星期几的规则来找出答案，而不需要循环。这种方法以牺牲可读性和可维护性为代价提供了效率。

一如既往，示例的完整代码可以在GitHub上找到。