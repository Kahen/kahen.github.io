---
date: 2024-07-04
category:
  - Java
  - 编程
tag:
  - Java
  - 日期处理
  - Joda Time
head:
  - - meta
    - name: keywords
      content: Java, 日期处理, 最后一天, 月份, Calendar, YearMonth, TemporalAdjusters, Joda Time
---

# 如何在Java中获取一个月的最后一天 | Baeldung

## 1. 概述

在这个简短的教程中，我们将探讨如何在Java中获取给定月份的最后一天。

首先，我们将介绍如何使用Java核心方法来实现这一点。然后，我们将展示如何使用Joda Time库来达到相同的目标。

## 2. Java 8之前

在Java 8之前，_日期(Date)_和_日历(Calendar)_类是Java中用于操作时间和日期的好选择。

**通常，_日历(Calendar)_提供了一套我们可以用于访问和操作时间信息的方法和常量，例如天、月和年。**

让我们看看如何使用它来获取特定月份的最后一天：

```java
static int getLastDayOfMonthUsingCalendar(int month) {
    Calendar cal = Calendar.getInstance();
    cal.set(Calendar.MONTH, month);
    return cal.getActualMaximum(Calendar.DAY_OF_MONTH);
}
```

如我们所见，我们使用_Calendar.getInstance()_创建了一个_日历(Calendar)_对象。然后，我们将日历月份设置为指定的月份。此外，我们使用_getActualMaximum()_方法和_Calendar.DAY_OF_MONTH_字段来检索月份的最后一天。

现在，让我们添加一个测试用例来确认我们的方法：

```java
@Test
void givenMonth_whenUsingCalendar_thenReturnLastDay() {
    assertEquals(31, LastDayOfMonth.getLastDayOfMonthUsingCalendar(0));
    assertEquals(30, LastDayOfMonth.getLastDayOfMonthUsingCalendar(3));
    assertEquals(31, LastDayOfMonth.getLastDayOfMonthUsingCalendar(9));
}
```

**这里需要提到的一个重点是月份值是基于零的**。例如，一月的值是零，所以我们需要从期望的月份值中减去1。

## 3. Java 8日期时间API

Java 8带来了许多新特性和增强功能。在这些特性中，我们发现了日期时间API。**这个API被引入是为了克服基于_日期(Date)_和_日历(Calendar)_类的旧API的限制。**

让我们深入探讨这个新API提供了哪些选项来获取一个月的最后一天。

### 3.1. 使用_YearMonth_

操作月份最常见的方式之一是使用_YearMonth_类。顾名思义，它表示年和月的组合。

**这个类提供了_atEndOfMonth()_方法，它返回一个表示给定月份末尾的_LocalDate_对象。**

让我们在实践中看看：

```java
static int getLastDayOfMonthUsingYearMonth(YearMonth date) {
    return date.atEndOfMonth()
      .getDayOfMonth();
}
```

简而言之，我们使用_atEndOfMonth()_来获取月份的最后一天。然后，我们使用_getDayOfMonth()_来检索返回的_LocalDate_对象的日期。

像往常一样，让我们添加一个测试用例：

```java
@Test
void givenMonth_whenUsingYearMonth_thenReturnLastDay() {
    assertEquals(31, LastDayOfMonth.getLastDayOfMonthUsingYearMonth(YearMonth.of(2023, 1)));
    assertEquals(30, LastDayOfMonth.getLastDayOfMonthUsingYearMonth(YearMonth.of(2023, 4)));
    assertEquals(31, LastDayOfMonth.getLastDayOfMonthUsingYearMonth(YearMonth.of(2023, 10)));
}
```

### 3.2. 使用_TemporalAdjusters_

另一种解决方案是使用_TemporalAdjusters_类。**通常，这个类提供了几个现成的静态方法，我们可以使用它们来调整时间对象。**

让我们一起来看看如何使用它来获取_LocalDate_实例的最后一天：

```java
static int getLastDayOfMonthUsingTemporalAdjusters(LocalDate date) {
    return date.with(TemporalAdjusters.lastDayOfMonth())
      .getDayOfMonth();
}
```

如上所示，类提供了调整器_lastDayOfMonth()_。它返回一个新的日期，设置为月份的最后一天。

此外，我们使用了_getDayOfMonth()_方法来获取返回日期的日期。

接下来，我们将使用一个测试用例来确认我们的方法：

```java
@Test
void givenMonth_whenUsingTemporalAdjusters_thenReturnLastDay() {
    assertEquals(31, LastDayOfMonth.getLastDayOfMonthUsingTemporalAdjusters(LocalDate.of(2023, 1, 1)));
    assertEquals(30, LastDayOfMonth.getLastDayOfMonthUsingTemporalAdjusters(LocalDate.of(2023, 4, 1)));
    assertEquals(31, LastDayOfMonth.getLastDayOfMonthUsingTemporalAdjusters(LocalDate.of(2023, 10, 1)));
}
```

## 4. Joda Time库

或者，我们可以使用Joda Time API来实现相同的目标。在Java 8之前，它是日期时间操作的事实标准。首先，我们需要将Joda Time依赖项添加到_pom.xml_文件中：

```xml
`<dependency>`
    `<groupId>`joda-time`</groupId>`
    `<artifactId>`joda-time`</artifactId>`
    `<version>`2.12.5`</version>`
`</dependency>`
```

同样，Joda Time提供了_LocalDate_类来表示日期。**这包括_withMaximumValue()_方法，可以用来获取一个月的最后一天。**

让我们看看实际操作：

```java
static int getLastDayOfMonthUsingJodaTime(org.joda.time.LocalDate date) {
    return date.dayOfMonth()
      .withMaximumValue()
      .getDayOfMonth();
}
```

最后，让我们再创建一个测试用例：

```java
@Test
void givenMonth_whenUsingJodaTime_thenReturnLastDay() {
    assertEquals(31, LastDayOfMonth.getLastDayOfMonthUsingJodaTime(org.joda.time.LocalDate.parse("2023-1-1")));
    assertEquals(30, LastDayOfMonth.getLastDayOfMonthUsingJodaTime(org.joda.time.LocalDate.parse("2023-4-1")));
    assertEquals(31, LastDayOfMonth.getLastDayOfMonthUsingJodaTime(org.joda.time.LocalDate.parse("2023-10-1")));
}
```

毫不意外，测试成功通过。

## 5. 结论

在本文中，我们探索了在Java中获取给定月份的最后一天的不同方法。在此过程中，我们解释了如何使用Java核心方法。然后，我们展示了如何使用第三方库，如Joda Time。

一如既往，本文中使用的代码可以在GitHub上找到。

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/9a8dd50c78e0b9d049466e9097331198?s=50&r=g)![img](https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)

OK