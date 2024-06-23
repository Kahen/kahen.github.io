---
date: 2024-06-23
category:
  - Java
  - 日期时间
tag:
  - Java
  - 日期转换
  - Instant
  - LocalDate
  - Joda-Time
head:
  - - meta
    - name: keywords
      content: Java日期转换，时间戳转换，Instant，LocalDate，Joda-Time
---
# Java中将long值转换为日期

在Java中处理日期时，我们经常看到日期/时间值以_long_值的形式表示，它表示自纪元（1970年1月1日，00:00:00 GMT）以来的天数、秒数或毫秒数。

在这个简短的教程中，我们将探索将_long_值转换为Java中的日期的不同方法。首先，我们将解释如何使用核心JDK类来完成这项操作。然后，我们将展示如何使用第三方Joda-Time库来实现相同的目标。

## 2. 使用Java 8+的日期时间API

Java 8因其引入的新的日期时间API而受到赞誉。这个API主要是为了覆盖旧日期API的缺点。那么，让我们仔细看看这个API为我们的中心问题提供了什么。

### 2.1. 使用_Instant_类

最简单的解决方案是使用Java 8新日期时间API中引入的_Instant_类。**这个类描述了时间线上的一个单一瞬时点**。

让我们在实践中看看：

```java
@Test
void givenLongValue_whenUsingInstantClass_thenConvert() {
    Instant expectedDate = Instant.parse("2020-09-08T12:16:40Z");
    long seconds = 1599567400L;

    Instant date = Instant.ofEpochSecond(seconds);

    assertEquals(expectedDate, date);
}
```

如上所示，我们使用_ofEpochSecond()_方法创建了_Instant_类的对象。请注意，我们也可以使用方法_ofEpochMilli()_使用毫秒创建_Instant_实例。

### 2.2. 使用_LocalDate_类

_LocalDate_是另一个在转换_long_值为日期时需要考虑的选项。这个类模拟了一个经典的日期，例如2023-10-17，没有时间细节。

通常，我们可以使用_LocalDate#ofEpochDay_方法来实现我们的目标：

```java
@Test
void givenLongValue_whenUsingLocalDateClass_thenConvert() {
    LocalDate expectedDate = LocalDate.of(2023, 10, 17);
    long epochDay = 19647L;

    LocalDate date = LocalDate.ofEpochDay(epochDay);

    assertEquals(expectedDate, date);
}
```

_ofEpochDay()_方法根据给定的纪元日创建了_LocalDate_类的实例。

## 3. 使用旧版日期API

在Java 8之前，我们通常会使用java.util包中的_Date_或_Calendar_类来实现我们的目标。那么，让我们看看如何使用这两个类将_long_值转换为日期。

### 3.1. 使用_Date_类

_Date_类表示具有毫秒精度的特定时间瞬间。顾名思义，它带有我们可以用于操作日期的大量方法。**它提供了将_long_值转换为日期的最简单方式，因为它提供了一个接受_long_类型参数的重载构造函数**。

让我们在实践中看看：

```java
@Test
void givenLongValue_whenUsingDateClass_thenConvert() {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
    Date expectedDate = dateFormat.parse("2023-10-15 22:00:00");
    long milliseconds = 1689458400000L;

    Date date = new Date(milliseconds);

    assertEquals(expectedDate, date);
}
```

请注意，_Date_类已经过时，属于旧API。因此，当处理日期时，这不是最好的方法。

### 3.2. 使用_Calendar_类

另一个解决方案是使用旧日期API中的_Calendar_类。**这个类提供了_setTimeInMillis(long value)_方法，我们可以使用它将时间设置为给定的_long_值**。

现在，让我们用另一个测试案例来说明这个方法的使用：

```java
@Test
void givenLongValue_whenUsingCalendarClass_thenConvert() {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
    Date expectedDate = dateFormat.parse("2023-07-15 22:00:00");
    long milliseconds = 1689458400000L;

    Calendar calendar = Calendar.getInstance();
    calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
    calendar.setTimeInMillis(milliseconds);

    assertEquals(expectedDate, calendar.getTime());
}
```

同样，指定的_long_值表示自纪元以来经过的毫秒数。

## 4. 使用Joda-Time

最后，我们可以使用Joda-Time库来解决我们的挑战。首先，让我们将它的依赖项添加到_pom.xml_文件中：

```xml
`<dependency>`
    `<groupId>`joda-time`</groupId>`
    `<artifactId>`joda-time`</artifactId>`
    `<version>`2.12.5`</version>`
`</dependency>`
```

同样，Joda-Time提供了它自己的_LocalDate_类版本。那么，让我们看看如何使用它将_long_值转换为_LocalDate_对象：

```java
@Test
void givenLongValue_whenUsingJodaTimeLocalDateClass_thenConvert() {
    org.joda.time.LocalDate expectedDate = new org.joda.time.LocalDate(2023, 7, 15);
    long milliseconds = 1689458400000L;

    org.joda.time.LocalDate date = new org.joda.time.LocalDate(milliseconds, DateTimeZone.UTC);

    assertEquals(expectedDate, date);
}
```

正如所展示的，_LocalDate_提供了一种直接从_long_值构造日期的方法。

## 5. 结论

在这篇短文中，我们详细解释了如何在Java中将_long_值转换为日期。

首先，我们看到了如何使用内置的JDK类来进行转换。然后，我们展示了如何使用Joda-Time库来实现相同的目标。

正如往常一样，本文中使用的代码可以在GitHub上找到。