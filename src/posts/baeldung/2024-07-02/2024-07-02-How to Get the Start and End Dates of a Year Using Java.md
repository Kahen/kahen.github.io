---
date: 2022-04-06
category:
  - Java
  - Date and Time
tag:
  - Java 8
  - Date Time API
  - Calendar
head:
  - - meta
    - name: keywords
      content: Java, Date Time API, Calendar, start and end of year
------
# 如何使用Java获取一年的起始和结束日期

Java 8引入了新的日期时间API，使得在Java中处理日期和时间变得更加容易。它提供了不同的方法来操作日期和时间。

在本教程中，我们将探讨如何使用日期时间API和_Calendar_类来获取一年的起始和结束日期。

### 2. 使用日期时间API
日期时间API中的_LocalDate_和_TemporalAdjuster_类使得获取一年的起始和结束日期变得简单。

以下是一个使用这些类的示例：

```java
@Test
void givenCurrentDate_whenGettingFirstAndLastDayOfYear_thenCorrectDatesReturned() {
    LocalDate today = LocalDate.now();
    LocalDate firstDay = today.with(firstDayOfYear());
    LocalDate lastDay = today.with(lastDayOfYear());

    assertEquals("2023-01-01", firstDay.toString());
    assertEquals("2023-12-31", lastDay.toString());
}
```

首先，我们创建一个_LocalDate_对象以获取当前日期。接下来，我们通过调用_today_对象上的_with()_和_firstDayOfYear()_来获取一年的第一天。

同样，我们调用_today_上的_with()_和_lastDayOfYear()_来获取一年的最后一天。

值得注意的是，_firstDayOfYear()_和_lastDayOfYear()_是_TemporalAdjuster_类的静态方法。

最后，我们断言一年的第一和最后一天等于预期的结果。

### 3. 使用_Calendar_和_Date_类
旧的_Calendar_和_Date_类也可以获取一年的起始和结束日期。

#### 3.1. 获取一年的开始
让我们使用_Calendar_和_Date_获取一年的开始：

```java
@Test
void givenCalendarWithSpecificDate_whenFormattingToISO8601_thenFormattedDateMatches() {
    Calendar cal = Calendar.getInstance();
    cal.set(Calendar.YEAR, 2023);
    cal.set(Calendar.DAY_OF_YEAR, 1);
    Date firstDay = cal.getTime();

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    String formattedDate = sdf.format(firstDay);

    assertEquals("2023-01-01", formattedDate);
}
```

在这里，我们创建一个新的_Calendar_实例，并设置年份和一年中的天数。然后，我们获取_Date_对象并将其格式化为预期的开始日期。

最后，我们断言返回的日期等于预期的日期。

#### 3.2. 获取一年的结束
类似地，以下是获取最后一天的方法：

```java
@Test
void givenCalendarSetToFirstDayOfYear_whenFormattingDateToISO8601_thenFormattedDateMatchesLastDay() {
    Calendar cal = Calendar.getInstance();
    cal.set(Calendar.YEAR, 2023);
    cal.set(Calendar.MONTH, 11);
    cal.set(Calendar.DAY_OF_MONTH, 31);
    Date lastDay = cal.getTime();

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    String formattedDate = sdf.format(lastDay);

    assertEquals("2023-12-31", formattedDate);
}
```

在上述代码中，我们设置年份、月份和一年的最后一天的日期。同样，我们格式化日期并断言它等于预期的日期。

### 4. 结论
在本文中，我们学习了如何使用现代的日期时间API和旧的_Calendar_和_Date_类来获取一年的起始和结束日期。与_Calendar_和_Date_相比，日期时间API提供了更干净、更直观的API。

如常，示例的完整源代码可在GitHub上找到。