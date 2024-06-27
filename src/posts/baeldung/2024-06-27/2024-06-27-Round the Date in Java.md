---
date: 2022-04-01
category:
  - Java
  - Date-Time API
tag:
  - Java
  - Date
  - Rounding
head:
  - - meta
    - name: keywords
      content: Java, Date Rounding, LocalDateTime, ZonedDateTime
---
# Java中对日期进行四舍五入

在Java中处理日期时，我们可能需要将它们四舍五入到特定的单位，比如小时、天或月份。这提供了诸如为分析和报告目的聚合数据以及允许指定显示信息的详细程度等好处。

## 1. 引言

在本教程中，我们将学习如何使用`java.util.Date`、`LocalDateTime`和`ZonedDateTime`对日期进行四舍五入。

## 2. 基本四舍五入

在基本四舍五入方法中，我们可以截断Java中任何日期的时间部分。具体来说，这意味着将所有时间元素设置为零。以下是我们可以做到这一点的方法：

```java
Date roundToDay(Date date) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    calendar.set(Calendar.HOUR_OF_DAY, 0);
    calendar.set(Calendar.MINUTE, 0);
    calendar.set(Calendar.SECOND, 0);
    calendar.set(Calendar.MILLISECOND, 0);
    return calendar.getTime();
}
```

`roundToDay()`方法接受一个`Date`对象作为参数。然后，我们使用`Calendar`类的`setTime()`方法，并使用`set()`方法将小时、分钟、秒和毫秒四舍五入到一天的开始。

## 3. 四舍五入到最近单位

我们可以选择使四舍五入方法保持恒定，以使日期匹配跨单位（如小时、天或月份）的四舍五入，如下所示：

```java
Date roundToNearestUnit(Date date, int unit) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);

    switch (unit) {
        case Calendar.HOUR:
            int minute = calendar.get(Calendar.MINUTE);
            if (minute >= 0 && minute `< 15) {
                calendar.set(Calendar.MINUTE, 0);
            } else if (minute >`= 15 && minute `< 45) {
                calendar.set(Calendar.MINUTE, 30);
            } else {
                calendar.set(Calendar.MINUTE, 0);
                calendar.add(Calendar.HOUR_OF_DAY, 1);
            }
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            break;

        case Calendar.DAY_OF_MONTH:
            int hour = calendar.get(Calendar.HOUR_OF_DAY);
            if (hour >`= 12) {
                calendar.add(Calendar.DAY_OF_MONTH, 1);
            }
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            break;

        case Calendar.MONTH:
            int day = calendar.get(Calendar.DAY_OF_MONTH);
            if (day >= 15) {
                calendar.add(Calendar.MONTH, 1);
            }
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            break;
    }

    return calendar.getTime();
}
```

在这里，我们有一个`roundToNearestUnit()`方法，它期望传入一个`Date`和一个`int`单位，旨在将输入日期四舍五入到指定的时间单位。

为此，代码创建了一个`Calendar`实例并将其设置为输入日期。**我们将检索并调整分钟、小时或天组件，以允许日期四舍五入到最近的30分钟间隔、天或月份，具体取决于所选的单位（`Calendar.HOUR`、`Calendar.DAY_OF_MONTH`或`Calendar.MONTH`）**。

此外，我们还确保秒和毫秒也归零。根据上述修改按照定义的时间单位，代码返回从生成的`Calendar`实体派生的新的`Date`。

## 4. 使用`LocalDateTime`进行四舍五入

`LocalDateTime`是Java中的一个新类，它使我们能够在不同的级别上对日期进行四舍五入，从而为处理日期和时间提供了一个更现代的解决方案。以下是使用`LocalDateTime`对日期进行四舍五入的两种方法：

```java
LocalDateTime roundToStartOfMonth(LocalDateTime dateTime) {
    return dateTime.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
}
```

在上面的方法`roundToStartOfMonth()`中，我们将月份中的天数设置为1，以将给定的`LocalDateTime`四舍五入到月份的开始，并将所有时间组件重置为午夜（0小时，0分钟，0秒和0纳秒）。

我们还可以使用`LocalDateTime`将给定日期四舍五入到周末的结束，如下所示：

```java
LocalDateTime roundToEndOfWeek(LocalDateTime dateTime) {
    return dateTime.with(TemporalAdjusters.next(DayOfWeek.SATURDAY))
      .withHour(23)
      .withMinute(59)
      .withSecond(59)
      .withNano(999);
}
```

**`RoundToEndOfWeek()`方法通过使用`TemporalAdjusters.next()`函数找到下一个星期六，并将时间组件设置为23小时、59分钟、59秒和999纳秒，将`LocalDateTime`四舍五入到下一个星期六的结束。**

## 5. 使用`ZonedDateTime`进行四舍五入

`ZonedDateTime`类使得在存在时区的情况下对日期进行四舍五入成为可能。以下是使用`ZonedDateTime`对日期进行四舍五入的两种方法：

```java
ZonedDateTime roundToStartOfMonth(ZonedDateTime dateTime) {
    return dateTime.withDayOfMonth(1)
      .withHour(0)
      .withMinute(0)
      .withSecond(0)
      .with(ChronoField.MILLI_OF_SECOND, 0)
      .with(ChronoField.MICRO_OF_SECOND, 0)
      .with(ChronoField.NANO_OF_SECOND, 0);
}
```

上述方法`roundToStartOfMonth()`接受一个`ZonedDateTime`作为输入，并返回一个新的`ZonedDateTime`。**具体来说，它返回相同的日期和时间，但时间部分设置为月初的午夜（00:00:00.000）。**

要将输入的`Date`四舍五入到当前周末的结束，让我们看以下示例：

```java
public static ZonedDateTime roundToEndOfWeek(ZonedDateTime dateTime) {
    return dateTime.with(TemporalAdjusters.next(DayOfWeek.SATURDAY))
      .withHour(23)
      .withMinute(59)
      .withSecond(59)
      .with(ChronoField.MILLI_OF_SECOND, 999)
      .with(ChronoField.MICRO_OF_SECOND, 999)
      .with(ChronoField.NANO_OF_SECOND, 999);
}
```

**在`roundToEndOfWeek()`方法中，我们首先使用`TemporalAdjusters`找到下一个星期六，然后将时间设置为（23:59:59.999999999）。**

## 6. 结论

总之，在Java中，对基于时间的数据进行四舍五入是最重要的任务之一。在本教程中，我们已经看到了一些将日期四舍五入到不同单位和精度级别，如截断和自定义四舍五入方法的方法。

请记住，对于每个日期，特别是那些用于国际应用的日期，都应该考虑时间变化。

如往常一样，本文的完整代码示例可以在GitHub上找到。