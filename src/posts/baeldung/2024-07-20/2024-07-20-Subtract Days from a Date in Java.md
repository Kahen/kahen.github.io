---
date: 2022-04-20
category:
  - Java
  - 日期处理
tag:
  - Java 8
  - Joda-Time
  - 日期减法
head:
  - - meta
    - name: keywords
      content: Java日期减法, Java 8日期处理, Joda-Time日期处理
------
# 在Java中从日期中减去天数

## 1. 概述

在本教程中，我们将探索在Java中从日期对象中减去天数的各种方法。

我们将从Java 8引入的日期时间API开始。之后，我们将学习如何使用_java.util_包中的类来实现这一点，最后我们将借助Joda-Time库来完成同样的任务。

## 2. _java.time.LocalDateTime_

**Java 8引入的日期/时间API是目前进行日期和时间计算的最可行选项。**

让我们看看如何从Java 8_java.util.LocalDateTime_对象中减去天数：
```java
@Test
public void givenLocalDate_whenSubtractingFiveDays_dateIsChangedCorrectly() {
    LocalDateTime localDateTime = LocalDateTime.of(2022, 4, 20, 0, 0);

    localDateTime = localDateTime.minusDays(5);

    assertEquals(15, localDateTime.getDayOfMonth());
    assertEquals(4, localDateTime.getMonthValue());
    assertEquals(2022, localDateTime.getYear());
}
```

## 3. _java.util.Calendar_

_Date_和_Calendar_是Java 8之前的日期操作中最常用的实用类。

让我们使用_java.util.Calendar_减去五天：
```java
@Test
public void givenCalendarDate_whenSubtractingFiveDays_dateIsChangedCorrectly() {
    Calendar calendar = Calendar.getInstance();
    calendar.set(2022, Calendar.APRIL, 20);

    calendar.add(Calendar.DATE, -5);

    assertEquals(15, calendar.get(Calendar.DAY_OF_MONTH));
    assertEquals(Calendar.APRIL, calendar.get(Calendar.MONTH));
    assertEquals(2022, calendar.get(Calendar.YEAR));
}
```

**我们在使用它们时应该小心，因为它们有一些设计缺陷，并且不是线程安全的。**

我们可以在关于迁移到新的Java 8日期时间API的文章中阅读更多关于与旧代码的交互以及两个API之间的区别。

## 4. Joda-Time

我们可以将Joda-Time作为Java最初日期和时间处理解决方案的更好替代品。该库提供了更直观的API、多种日历系统、线程安全性和不可变对象。

为了使用Joda-Time，我们需要在_pom.xml_文件中将其作为依赖项包含：
```xml
`<dependency>`
    `<groupId>`joda-time`</groupId>`
    `<artifactId>`joda-time`</artifactId>`
    `<version>`2.12.5`</version>`
`</dependency>`
```

让我们从Joda-Time的_DateTime_对象中减去五天：
```java
@Test
public void givenJodaDateTime_whenSubtractingFiveDays_dateIsChangedCorrectly() {
    DateTime dateTime = new DateTime(2022, 4, 20, 12, 0, 0);

    dateTime = dateTime.minusDays(5);

    assertEquals(15, dateTime.getDayOfMonth());
    assertEquals(4, dateTime.getMonthOfYear());
    assertEquals(2022, dateTime.getYear());
}
```

Joda-Time是旧代码的良好解决方案。**然而，该项目已正式“完成”，库的作者建议迁移到Java 8的日期/时间API。**

## 5. 结论

在这篇简短的文章中，我们探索了几种从日期对象中减去天数的方法。

我们使用_java.time.LocalDateTime_和Java 8之前的解决方案：_java.util.Calendar_和Joda-Time库来实现这一点。

像往常一样，源代码可以在GitHub上找到。