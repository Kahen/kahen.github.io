---
date: 2024-06-23
category:
  - Java
  - Date-Time
tag:
  - Unix Timestamp
  - Java 8
head:
  - - meta
    - name: keywords
      content: Java, Unix Timestamp, Date-Time API, Conversion
---
# Java中将日期转换为Unix时间戳

在计算机科学中，Unix时间戳，也称为纪元时间，是一种标准的表示特定时间点的方式。它表示自1970年1月1日以来经过的秒数。

本教程将介绍如何将传统日期转换为Unix时间戳。首先，我们将探讨如何使用内置的JDK方法来实现这一点。然后，我们将展示如何使用Joda-Time等外部库来达到相同的目标。

## 2. 使用Java 8+日期时间API

Java 8引入了一个新的日期时间API，我们可以使用它来回答我们的核心问题。这个新API带有几种方法和类来操作日期。那么，让我们仔细看看每个选项。

### 2.1. 使用Instant类

简而言之，Instant类模拟了时间线上的一个瞬时点。**这个类提供了一个直接且简洁的方法来从给定的日期获取Unix时间**。

让我们看看它在实际中的应用：

```java
@Test
void givenDate_whenUsingInstantClass_thenConvertToUnixTimeStamp() {
    Instant givenDate = Instant.parse("2020-09-08T12:16:40Z");

    assertEquals(1599567400L, givenDate.getEpochSecond());
}
```

如我们所见，Instant类提供了getEpochSecond()方法，可以从指定的日期获取自纪元以来的秒数。

### 2.2. 使用LocalDateTime类

LocalDateTime是另一个在转换日期为纪元时间时可以考虑的选项。这个类表示日期和时间的组合，通常被视为年、月、日、小时、分钟和秒。

**通常，这个类提供了toEpochSecond()方法来从指定的日期时间获取纪元时间的秒数**：

```java
@Test
void givenDate_whenUsingLocalDateTimeClass_thenConvertToUnixTimeStamp() {
    LocalDateTime givenDate = LocalDateTime.of(2023, 10, 19, 22, 45);

    assertEquals(1697755500L, givenDate.toEpochSecond(ZoneOffset.UTC));
}
```

如上所示，与其他方法不同，toEpochSecond()接受一个ZoneOffset对象，这允许我们定义时区的固定偏移量，UTC。

## 3. 使用旧版日期API

或者，我们可以使用旧版API中的Date和Calendar类来实现相同的结果。那么，让我们深入探索并看看如何在实践中使用它们。

### 3.1. 使用Date类

在Java中，Date类以毫秒精度表示一个特定的时间点。**它提供了将日期转换为Unix时间戳的最简单方法之一，通过getTime()方法**：

```java
@Test
void givenDate_whenUsingDateClass_thenConvertToUnixTimeStamp() throws ParseException {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
    Date givenDate = dateFormat.parse("2023-10-15 22:00:00");

    assertEquals(1697407200L, givenDate.getTime() / 1000);
}
```

通常，该方法返回自纪元以来的毫秒数。如我们所见，我们将结果除以1000以获得秒数。**然而，这个类被认为是过时的，并且在处理日期时不应该使用**。

### 3.2. 使用Calendar类

同样，我们可以使用同一包java.util中的Calendar类。这个类提供了许多设置和操作日期的方法。

**使用Calendar，我们必须调用getTimeInMillis()来返回指定日期的Unix时间**：

```java
@Test
void givenDate_whenUsingCalendarClass_thenConvertToUnixTimeStamp() throws ParseException {
    Calendar calendar = new GregorianCalendar(2023, Calendar.OCTOBER, 17);
    calendar.setTimeZone(TimeZone.getTimeZone("UTC"));

    assertEquals(1697500800L, calendar.getTimeInMillis() / 1000);
}
```

请注意，这个方法顾名思义，返回以毫秒为单位的时间戳。**选择这种方法的缺点是，Calendar自旧版API以来被宣布为事实上的遗留**。

## 4. 使用Joda-Time

另一种解决方案是使用Joda-Time库。在开始使用库之前，让我们将它的依赖项添加到pom.xml中：

```xml
`<dependency>`
    `<groupId>`joda-time`</groupId>`
    `<artifactId>`joda-time`</artifactId>`
    `<version>`2.12.6`</version>`
`</dependency>`
```

**Joda-Time提供了它自己的Instant类版本，我们可以使用它来解决我们的挑战**。那么，让我们通过一个新的测试用例来说明如何使用这个类：

```java
@Test
void givenDate_whenUsingJodaTimeInstantClass_thenConvertToUnixTimeStamp() {
    org.joda.time.Instant givenDate = org.joda.time.Instant.parse("2020-09-08T12:16:40Z");

    assertEquals(1599567400L, givenDate.getMillis() / 1000);
}
```

所示，Instant类提供了一个直接的方法来获取自纪元以来的毫秒数。

**DateTime类是在使用Joda-Time时考虑的另一个解决方案**。它提供了getMillis()方法来返回DateTime瞬间自纪元以来的毫秒数：

```java
@Test
void givenDate_whenUsingJodaTimeDateTimeClass_thenConvertToUnixTimeStamp() {
    DateTime givenDate = new DateTime("2020-09-08T12:16:40Z");

    assertEquals(1599567400L, givenDate.getMillis() / 1000);
}
```

毫不意外，测试用例成功通过。

## 5. 结论

在这篇短文中，我们探讨了将给定日期转换为Unix时间戳的不同方法。

首先，我们解释了如何使用核心JDK方法和类来实现这一点。然后，我们展示了如何使用Joda-Time来达到相同的目标。

如往常一样，本文中使用的代码可以在GitHub上找到。