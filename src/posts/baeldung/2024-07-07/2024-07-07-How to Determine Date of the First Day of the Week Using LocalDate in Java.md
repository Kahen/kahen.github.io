---
date: 2022-04-01
category:
  - Java
  - LocalDate
tag:
  - Java
  - LocalDate
  - Week
  - Date Calculation
head:
  - - meta
    - name: keywords
      content: Java, LocalDate, Week, Date Calculation
---
# 如何使用Java中的LocalDate确定一周的第一天

在这篇简短的教程中，我们将讨论如何使用Java中的LocalDate输入来找到一周的第一天。

## 2. 问题陈述

我们经常需要找到一周的第一天来为业务逻辑建立一周的边界，例如为员工构建时间跟踪系统。

在Java 8之前，JodaTime库被用来找到一周的第一天。然而，在Java 8之后，不再提供相同的支持。因此，我们将看到如何使用java.time.LocalDate类提供的功能来找到一周的第一天。

## 3. Calendar类

我们可以使用java.util.Calendar类来追溯到一周中的某一天。首先，我们可以循环到我们定义的一周的开始（星期日/星期一）。

让我们为同样的目的设置Calendar类的实例：

```java
Calendar calendar = Calendar.getInstance();
ZoneId zoneId = ZoneId.systemDefault();
Date date = Date.from(localDate.atStartOfDay(zoneId).toInstant());
calendar.setTime(date);
```

一旦日历对象设置好，我们必须确定一周的第一天作为一个固定的日子。它可以是星期一，根据ISO标准，或者是星期日，正如世界上许多国家（例如美国）所遵循的。我们可以继续循环直到我们到达我们确定的一周的第一天：

```java
while (calendar.get(Calendar.DAY_OF_WEEK) != Calendar.MONDAY) {
    calendar.add(Calendar.DATE, -1);
}
```

我们可以看到，每次减去一天直到我们到达星期一，这有助于我们检索一周的第一天的日期。Calendar.MONDAY是在Calendar类中定义的一个常量。现在我们可以将日历日期转换为java.time.LocalDate：

```java
LocalDateTime.ofInstant(calendar.toInstant(), calendar.getTimeZone().toZoneId()).toLocalDate()
```

## 4. TemporalAdjuster

TemporalAdjuster允许我们执行复杂的日期操作。例如，我们可以获取下周日的日期，当前月份的最后一天，或下一年的第一天。

我们可以使用它来确定一周中星期一或星期日的日期，根据我们如何确定一周的第一天：

```java
DayOfWeek weekStart = DayOfWeek.MONDAY;
return localDate.with(TemporalAdjusters.previousOrSame(weekStart));
```

previousOrSame函数返回一个TemporalAdjuster。TemporalAdjuster返回指定星期的上一个出现或如果当前日期已经是该星期的同一天。我们可以使用它来调整日期并计算给定日期的一周的开始。

## 5. TemporalField

TemporalField表示日期时间的一个字段，例如年月或分钟小时。我们可以调整输入日期以获取给定输入日期的一周的第一天。

我们可以使用dayOfWeek函数根据WeekFields访问一周的第一天。Java日期和时间API的WeekFields类表示基于周的年份及其组成部分，包括周数、星期几和基于周的年份。

当一周的第一天是星期日时，一周的天数编号从1到7，其中1是星期日，7是星期六。它提供了一种方便的方式来处理ISO周日期。这可以帮助我们获取一周的第一天的日期：

```java
TemporalField fieldISO = WeekFields.of(locale).dayOfWeek();
return localDate.with(fieldISO, 1);
```

在这种情况下，我们传递了locale；因此，一周的第一天是星期日还是星期一的定义将取决于地区。为了避免这种情况，我们可以使用ISO标准，它接受星期一作为一周的第一天：

```java
TemporalField dayOfWeek = WeekFields.ISO.dayOfWeek();
return localDate.with(dayOfWeek, dayOfWeek.range().getMinimum());
```

这段代码片段返回给定LocalDate实例的一周的第一天的日期，使用ISO日历系统，它以星期一作为一周的第一天。它通过将星期字段设置为给定LocalDate实例的最小有效值（即星期一的1）来实现这一点。

## 6. 结论

在这篇文章中，我们从Java中的LocalDate检索了一周的第一天的日期。我们看到了如何使用Calendar类和使用TemporalAdjuster和TemporalField的多种方式来做到这一点。

一如既往，代码可以在GitHub上找到。