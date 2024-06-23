---
date: 2024-06-23
category:
  - Java
  - 日期转换
tag:
  - Gregorian
  - Hijri
head:
  - - meta
    - name: keywords
      content: Java, 日期转换, Gregorian, Hijri
------
# Java中将公历转换为回历日期

## 1. 概述

公历和回历代表了两种不同的时间测量系统。

在本教程中，我们将探讨将公历日期转换为回历日期的各种方法。

## 2. 公历与回历日历的区别

让我们了解公历和回历日历之间的区别。公历遵循太阳年，由12个长度固定的月份组成。回历遵循月亮年，有12个月，每个月交替为29天和30天。

在回历中，每个月的长度取决于月亮绕地球完整旋转的周期。**公历年包含365天或366天，而回历年有354天或355天。这意味着回历年比公历年大约短11天。**

## 3. 使用 _HijrahDate_ 类

在这种方法中，我们将使用 _java.time.chrono_ 包中的 _HijrahDate_ 类。这个类在Java 8中引入，用于现代日期和时间操作。它提供了多种方法来创建和操作回历日期。

### 3.1. 使用 _from()_ 方法

我们将使用 _HijrahDate_ 类的 _from()_ 方法将日期从公历转换为回历。这个方法接受一个代表公历日期的 _LocalDate_ 对象作为输入，并返回一个 _HijrahDate_ 对象：

```
public HijrahDate usingFromMethod(LocalDate gregorianDate) {
    return HijrahDate.from(gregorianDate);
}
```

现在，让我们运行我们的测试：

```
void givenGregorianDate_whenUsingFromMethod_thenConvertHijriDate() {
    LocalDate gregorianDate = LocalDate.of(2013, 3, 31);
    HijrahDate hijriDate = GregorianToHijriDateConverter.usingFromMethod(gregorianDate);
    assertEquals(1434, hijriDate.get(ChronoField.YEAR));
    assertEquals(5, hijriDate.get(ChronoField.MONTH_OF_YEAR));
    assertEquals(19, hijriDate.get(ChronoField.DAY_OF_MONTH));
}
```

### 3.2. 使用 _HijrahChronology_ 类

在这种方法中，我们将使用 _java.time.chrono.HijrahChronology_ 类，它代表回历（伊斯兰）日历系统。

_HijrahChoronology.INSTANCE_ 方法创建回历日历系统的实例。我们将使用它来创建 _ChronoLocalDate_ 对象，将公历日期转换为回历日期：

```
public HijrahDate usingHijrahChronology(LocalDate gregorianDate) {
    HijrahChronology hijrahChronology = HijrahChronology.INSTANCE;
    ChronoLocalDate hijriChronoLocalDate = hijrahChronology.date(gregorianDate);
    return HijrahDate.from(hijriChronoLocalDate);
}
```

现在，让我们测试这种方法：

```
void givenGregorianDate_whenUsingHijrahChronologyClass_thenConvertHijriDate() {
    LocalDate gregorianDate = LocalDate.of(2013, 3, 31);
    HijrahDate hijriDate = GregorianToHijriDateConverter.usingHijrahChronology(gregorianDate);
    assertEquals(1434, hijriDate.get(ChronoField.YEAR));
    assertEquals(5, hijriDate.get(ChronoField.MONTH_OF_YEAR));
    assertEquals(19, hijriDate.get(ChronoField.DAY_OF_MONTH));
}
```

## 4. 使用 _Joda-Timе_

_Joda-Timе_ 是Java的一个流行的日期和时间操作库，提供了一个更直观的接口，作为标准Java日期和时间API的替代品。

在 _Joda-Time_ 中，_IslamicChronology_ 类代表回历（伊斯兰）日历。我们将使用 _DateTime’s withChronology()_ 方法与 _IslamicChornology_ 实例来将公历日期转换为回历日期：

```
public DateTime usingJodaDate(DateTime gregorianDate) {
    return gregorianDate.withChronology(IslamicChronology.getInstance());
}
```

现在，让我们测试这种方法：

```
void givenGregorianDate_whenUsingJodaDate_thenConvertHijriDate() {
    DateTime gregorianDate = new DateTime(2013, 3, 31, 0, 0, 0);
    DateTime hijriDate = GregorianToHijriDateConverter.usingJodaDate(gregorianDate);
    assertEquals(1434, hijriDate.getYear());
    assertEquals(5, hijriDate.getMonthOfYear());
    assertEquals(19, hijriDate.getDayOfMonth());
}
```

## 5. 使用 _UmmalquraCalendar_ 类

_ummalqura-calendar_ 库有一个 _UmmalquraCalendar_ 类，它是从Java 8派生的。要包含 _ummalqura-calendar_ 库，我们需要添加以下依赖：

```
`<dependency>`
    `<groupId>`com.github.msarhan`</groupId>`
    `<artifactId>`ummalqura-calendar`</artifactId>`
    `<version>`2.0.2`</version>`
`</dependency>`
```

我们将使用它的 _setTime()_ 方法来执行公历到回历日期的转换：

```
public UmmalquraCalendar usingUmmalquraCalendar(GregorianCalendar gregorianCalendar) throws ParseException {
    UmmalquraCalendar hijriCalendar = new UmmalquraCalendar();
    hijriCalendar.setTime(gregorianCalendar.getTime());
    return hijriCalendar;
}
```

现在，让我们测试这种方法：

```
void givenGregorianDate_whenUsingUmmalquraCalendar_thenConvertHijriDate() throws ParseException {
    GregorianCalendar gregorianCalenar = new GregorianCalendar(2013, Calendar.MARCH, 31);
    UmmalquraCalendar ummalquraCalendar = GregorianToHijriDateConverter.usingUmmalquraCalendar(gregorianCalenar);
    assertEquals(1434, ummalquraCalendar.get(Calendar.YEAR));
    assertEquals(5, ummalquraCalendar.get(Calendar.MONTH) + 1);
    assertEquals(19, ummalquraCalendar.get(Calendar.DAY_OF_MONTH));
}
```

## 6. 结论

在本教程中，我们讨论了将公历日期转换为回历日期的多种方法。

正如往常一样，示例中使用的代码可以在GitHub上找到。