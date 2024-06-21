---
date: 2024-06-21
category:
  - Java
  - Date and Time
tag:
  - Calendar
  - LocalDate
  - Date Comparison
head:
  - - meta
    - name: keywords
      content: Java, Date Comparison, Yesterday, LocalDate, Calendar
------
# Java中检查日期对象是否等于昨天

当在Java应用程序中使用日期和时间数据时，比较日期以实现各种目的通常至关重要，例如安排任务、提醒或报告。一个常见的场景是需要确定给定的日期是否相对于当前日期是昨天。在本教程中，我们将探讨确定给定日期对象是否落在昨天的各种方法。

### 2. 使用java.util.Calendar

一种常见的方法是使用java.util.Calendar类来操作日期和时间信息。要比较昨天的日期，我们通过Calendar.getInstance()实例化一个Calendar对象。接下来，我们使用calendar.setTime(new Date())将其时间设置为当前日期，然后使用calendar.add(Calendar.DATE, -1)减去一天。这样就得到了昨天的日期。

以下是演示这些概念的代码片段：

```
Date date = new Date(System.currentTimeMillis() - (1000 * 60 * 60 * 24));
Calendar expectedCalendar = Calendar.getInstance();
expectedCalendar.setTime(date);

Calendar actualCalendar = Calendar.getInstance();
actualCalendar.add(Calendar.DATE, -1);

boolean isEqualToYesterday = expectedCalendar.get(Calendar.YEAR) == actualCalendar.get(Calendar.YEAR) &&
  expectedCalendar.get(Calendar.MONTH) == actualCalendar.get(Calendar.MONTH) &&
  expectedCalendar.get(Calendar.DAY_OF_MONTH) == actualCalendar.get(Calendar.DAY_OF_MONTH);

assertTrue(isEqualToYesterday);
```

直接使用这种方法比较日期**可能会因为两个日期之间的毫秒差异而失败。这是因为Date对象捕获了日期和时间，包括毫秒。**如果时间组件不是完全相同的，比较可能会产生错误的结果。

为了缓解这个问题，一种方法是在执行比较之前截断两个日期的时间组件。我们使用它们各自的get(Calendar.YEAR)、get(Calendar.MONTH)和get(Calendar.DAY_OF_MONTH)方法提取两个日期的年、月和日组件，仅确定actualCalendar是否等于昨天。

**尽管这些类被认为是遗留API，但它们仍然被广泛使用，特别是在较新的Java版本不可用的环境中。**

### 3. 使用java.util.Date的毫秒值

这种方法利用了Date对象内部存储自纪元以来的毫秒数（1970年1月1日，00:00:00 UTC）。**它涉及计算昨天午夜的毫秒值，并将其与Date对象的getTime()值进行比较。**

首先，我们使用ZonedDateTime计算系统默认时区中昨天午夜的开始时间戳。这可以通过从当前日期和时间减去一天，然后截断到午夜，最终检索时间戳来实现。

然后，我们将这个计算出的值与给定expectedDate的getTime()值进行比较。**通过验证expectedDate是否落在昨天午夜时间戳到下一个午夜（yesterdayMidnightMillis + 86_400_000毫秒）的范围内，我们可以确定yesterdayMidnightMillis是否对应于昨天的日期。**

让我们通过一个快速的例子来演示这种方法：

```
Date expectedDate = new Date(System.currentTimeMillis() - (1000 * 60 * 60 * 24));
ZonedDateTime yesterdayMidnight = ZonedDateTime.now().minusDays(1).truncatedTo(ChronoUnit.DAYS);
long yesterdayMidnightMillis = yesterdayMidnight.toInstant().toEpochMilli();

boolean isEqualToYesterday = expectedDate.getTime() >= yesterdayMidnightMillis && expectedDate.getTime() < yesterdayMidnightMillis + 86_400_000;

assertTrue(isEqualToYesterday);
```

这种方法提供了一种使用毫秒比较日期的简单有效方法。它适用于需要直接与遗留Date对象进行比较的场景。

### 4. 使用java.time.LocalDate

处理日期操作的另一种方法是使用LocalDate类及其minusDays()方法。这种方法是Java 8中引入的现代日期和时间API的一部分。

LocalDate提供了一种更直接和直观的方式来处理日期。**它被设计为只关注年、月和日组件，没有时间组件。**这使得它非常适合仅涉及日期的操作，例如记录历史日期或报告日期过滤。

要使用这种方法比较昨天的日期，我们首先使用LocalDate.now()获取当前日期。然后，我们只需在LocalDate对象上调用minusDays(1)方法减去一天，得到昨天的日期：

```
Date date = new Date(System.currentTimeMillis() - (1000 * 60 * 60 * 24));
LocalDate expectedLocalDate = LocalDate.of(date.getYear() + 1900, date.getMonth() + 1, date.getDate());

LocalDate actualLocalDate = LocalDate.now().minusDays(1);
boolean isEqualToYesterday = expectedLocalDate.equals(actualLocalDate);

assertTrue(isEqualToYesterday);
```

在这个例子中，我们通过从Date对象中提取年、月和日组件来指定昨天的日期。**但是，请注意getYear()方法返回的是从1900年开始的年份，getMonth()返回的是从0开始的月份索引。**因此，我们在getYear()上加1900，在getMonth()上加1，以调整它们到标准日期表示。

**对于Java 8及以上版本的Java应用程序，推荐使用LocalDate进行日期操作。**

### 5. 使用Joda-Time

Joda-Time是Java的一个流行的日期和时间库。我们可以使用这个库来检查日期对象是否表示昨天的日期。**要使用Joda-Time比较昨天的日期，我们使用DateTime类及其minusDays()方法。**

首先，我们使用DateTime.now()获取当前日期和时间。然后，我们通过调用minusDays(1)方法从当前日期减去一天，得到昨天的日期：

```
Date date = new Date(System.currentTimeMillis() - (1000 * 60 * 60 * 24));
DateTime expectedDateTime = new DateTime(date).withTimeAtStartOfDay();

DateTime actualDateTime = DateTime.now().minusDays(1).withTimeAtStartOfDay();

boolean isEqualToYesterday = expectedDateTime.equals(actualDateTime);

assertTrue(isEqualToYesterday);
```

类似于Calendar类，Joda-Time的DateTime类捕获了日期和时间，因此直接比较它们可能会导致由于毫秒差异而导致的不准确。

为了解决这个问题，我们不是将日期值分解为年、月和日组件，而是**可以利用Joda-Time提供的withTimeAtStartOfDay()方法。这个方法将DateTime对象的时间组件设置为一天的开始，有效地将时间重置为午夜（00:00:00）。**通过将withTimeAtStartOfDay()应用于DateTime对象，我们确保只有日期组件在比较目的中保持重要性。

### 6. 结论

在本文中，我们探讨了几种确定日期对象是否落在昨天日期的方法。对于使用Java 8或更高版本的大多数现代Java应用程序，通常推荐使用LocalDate方法，因为它的清晰性、不可变性以及对各种日期操作的支持。

虽然Joda-Time是一个成熟且稳定的库，但随着越来越多的项目过渡到标准的Java日期和时间API，其未来的开发和支持可能会变得不那么确定。

如常，示例的源代码可在GitHub上找到。