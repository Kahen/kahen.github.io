---
date: 2024-06-16
category:
  - Java
  - 编程
tag:
  - java.sql.Timestamp
  - ZonedDateTime
---
# 如何在Java中转换java.sql.Timestamp和ZonedDateTime

处理Java中的时间戳是一项常见任务，它使我们能够更有效地操作和显示日期和时间信息，特别是在我们处理数据库或全球应用程序时。用于处理时间戳和时区的两个基本类是java.sql.Timestamp和ZonedDateTime。

在本教程中，我们将探讨在java.sql.Timestamp和ZonedDateTime之间进行转换的多种方法。

### 2.1. 使用Instant类
Instant类可以被看作是UTC时区中的一个单一时刻。如果我们将时间想象成一条线，Instant就代表线上的一个点。

在内部，Instant类只是计算相对于1970年1月1日标准Unix纪元时间00:00:00的秒数和纳秒数。这个时间点由0秒和0纳秒表示，其他一切都是从这个时间点的偏移量。

相对于这个特定时间点存储数和纳秒数允许类存储负和正的偏移量。换句话说，Instant类可以表示纪元时间之前和之后的时间。

让我们看看如何使用Instant类将时间戳转换为ZonedDateTime：

```java
ZonedDateTime convertToZonedDateTimeUsingInstant(Timestamp timestamp) {
    Instant instant = timestamp.toInstant();
    return instant.atZone(ZoneId.systemDefault());
}
```

在上述方法中，我们使用Timestamp类的toInstant()方法将提供的时间戳转换为Instant，这代表UTC时间线上的一个时刻。然后，我们使用Instant对象上的atZone()方法将其与特定时区关联。我们使用通过ZoneId.systemDefault()获得的系统默认时区。

让我们使用系统的默认时区（全局时区）测试这个方法：

```java
@Test
void givenTimestamp_whenUsingInstant_thenConvertToZonedDateTime() {
    Timestamp timestamp = Timestamp.valueOf("2024-04-17 12:30:00");
    ZonedDateTime actualResult = TimestampAndZonedDateTimeConversion.convertToZonedDateTimeUsingInstant(timestamp);
    ZonedDateTime expectedResult = ZonedDateTime.of(2024, 4, 17, 12, 30, 0, 0, ZoneId.systemDefault());
    Assertions.assertEquals(expectedResult.toLocalDate(), actualResult.toLocalDate());
    Assertions.assertEquals(expectedResult.toLocalTime(), actualResult.toLocalTime());
}
```

### 2.2. 使用Calendar类
另一种解决方案是使用来自旧Date API的Calendar类。这个类提供了setTimeInMillis(long value)方法，我们可以使用它将时间设置为给定的long值：

```java
ZonedDateTime convertToZonedDateTimeUsingCalendar(Timestamp timestamp) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTimeInMillis(timestamp.getTime());
    return calendar.toInstant().atZone(ZoneId.systemDefault());
}
```

在上述方法中，我们使用Calendar.getInstance()方法初始化Calendar实例。Calendar实例的时间设置为与Timestamp对象相同。之后，我们使用Calendar对象上的toInstant()方法获得一个Instant。然后，我们再次使用Instant对象上的atZone()方法将其与特定时区关联。我们使用通过ZoneId.systemDefault()获得的系统默认时区。

让我们看看以下的测试代码：

```java
@Test
void givenTimestamp_whenUsingCalendar_thenConvertToZonedDateTime() {
    Timestamp timestamp = Timestamp.valueOf("2024-04-17 12:30:00");
    ZonedDateTime actualResult = TimestampAndZonedDateTimeConversion.convertToZonedDateTimeUsingCalendar(timestamp);
    ZonedDateTime expectedResult = ZonedDateTime.of(2024, 4, 17, 12, 30, 0, 0, ZoneId.systemDefault());
    Assertions.assertEquals(expectedResult.toLocalDate(), actualResult.toLocalDate());
    Assertions.assertEquals(expectedResult.toLocalTime(), actualResult.toLocalTime());
}
```

### 2.3. 使用LocalDateTime类
java.time包在Java 8中引入，提供了一个现代的日期和时间API。LocalDateTime是该包中的一个类，可以存储和操作不同时区的日期和时间。让我们看看这种方法：

```java
ZonedDateTime convertToZonedDateTimeUsingLocalDateTime(Timestamp timestamp) {
    LocalDateTime localDateTime = timestamp.toLocalDateTime();
    return localDateTime.atZone(ZoneId.systemDefault());
}
```

Timestamp类的toLocalDateTime()方法将Timestamp转换为LocalDateTime，它表示没有时区信息的日期和时间。

让我们测试这种方法：

```java
@Test
void givenTimestamp_whenUsingLocalDateTime_thenConvertToZonedDateTime() {
    Timestamp timestamp = Timestamp.valueOf("2024-04-17 12:30:00");
    ZonedDateTime actualResult = TimestampAndZonedDateTimeConversion.convertToZonedDateTimeUsingLocalDateTime(timestamp);
    ZonedDateTime expectedResult = ZonedDateTime.of(2024, 4, 17, 12, 30, 0, 0, ZoneId.systemDefault());
    Assertions.assertEquals(expectedResult.toLocalDate(), actualResult.toLocalDate());
    Assertions.assertEquals(expectedResult.toLocalTime(), actualResult.toLocalTime());
}
```

### 2.4. 使用Joda-Time类
Joda-Time是一个非常流行的Java日期和时间操作库。它提供了比标准DateTime类更直观和灵活的API。

要包含Joda-Time库的功能，我们需要从Maven Central添加以下依赖：

```xml
`<dependency>`
    `<groupId>`joda-time`</groupId>`
    `<artifactId>`joda-time`</artifactId>`
    `<version>`2.12.7`</version>`
`</dependency>`
```

让我们看看如何使用Joda-Time类实现这种转换：

```java
ZonedDateTime convertToZonedDateTimeUsingJodaTime(Timestamp timestamp) {
    DateTime dateTime = new DateTime(timestamp.getTime());
    return dateTime.toGregorianCalendar().toZonedDateTime();
}
```

在这种方法中，我们首先检索自纪元（1970-01-01T00:00:00Z）以来的毫秒数。然后，我们使用默认时区创建一个新的DateTime对象，从获得的毫秒值。

接下来，我们将DateTime对象转换为GregorianCalendar，然后使用Joda-Time库的方法将GregorianCalendar转换为ZonedDateTime。

现在，让我们运行我们的测试：

```java
@Test
void givenTimestamp_whenUsingJodaTime_thenConvertToZonedDateTime() {
    Timestamp timestamp = Timestamp.valueOf("2024-04-17 12:30:00");
    ZonedDateTime actualResult = TimestampAndZonedDateTimeConversion.convertToZonedDateTimeUsingJodaTime(timestamp);
    ZonedDateTime expectedResult = ZonedDateTime.of(2024, 4, 17, 12, 30, 0, 0, ZoneId.systemDefault());
    Assertions.assertEquals(expectedResult.toLocalDate(), actualResult.toLocalDate());
    Assertions.assertEquals(expectedResult.toLocalTime(), actualResult.toLocalTime());
}
```

## 3. 将ZonedDateTime转换为java.sql.Timestamp
现在，我们将探讨将ZonedDateTime转换为java.sql.Timestamp的多种方法：

### 3.1. 使用Instant类
让我们看看如何使用Instant类将ZonedDateTime转换为java.sql.Timestamp：

```java
Timestamp convertToTimeStampUsingInstant(ZonedDateTime zonedDateTime) {
    Instant instant = zonedDateTime.toInstant();
    return Timestamp.from(instant);
}
```

在上述方法中，我们首先使用toInstant()方法将提供的ZonedDateTime对象转换为Instant。然后，我们使用Timestamp类的from()方法通过传递获得的Instant作为参数来创建一个Timestamp对象。

现在，让我们测试这种方法：

```java
@Test
void givenZonedDateTime_whenUsingInstant_thenConvertToTimestamp() {
    ZonedDateTime zonedDateTime = ZonedDateTime.of(2024, 4, 17, 12, 30, 0, 0, ZoneId.systemDefault());
    Timestamp actualResult = TimestampAndZonedDateTimeConversion.convertToTimeStampUsingInstant(zonedDateTime);
    Timestamp expectedResult = Timestamp.valueOf("2024-04-17 12:30:00");
    Assertions.assertEquals(expectedResult, actualResult);
}
```

### 3.2. 使用LocalDateTime类
让我们使用LocalDateTime类将ZonedDateTime转换为java.sql.Timestamp：

```java
Timestamp convertToTimeStampUsingLocalDateTime(ZonedDateTime zonedDateTime) {
    LocalDateTime localDateTime = zonedDateTime.toLocalDateTime();
    return Timestamp.valueOf(localDateTime);
}
```

在上述方法中，我们使用toLocalDateTime()方法将提供的ZonedDateTime对象转换为LocalDateTime对象。LocalDateTime表示没有时区的日期和时间。然后，我们通过传递LocalDateTime对象作为参数，使用Timestamp类的valueOf()方法创建并返回一个Timestamp对象。

现在，让我们运行我们的测试：

```java
@Test
void givenZonedDateTime_whenUsingLocalDateTime_thenConvertToTimestamp() {
    ZonedDateTime zonedDateTime = ZonedDateTime.of(2024, 4, 17, 12, 30, 0, 0, ZoneId.systemDefault());
    Timestamp actualResult = TimestampAndZonedDateTimeConversion.convertToTimeStampUsingLocalDateTime(zonedDateTime);
    Timestamp expectedResult = Timestamp.valueOf("2024-04-17 12:30:00");
    Assertions.assertEquals(expectedResult, actualResult);
}
```

### 3.3. 使用Joda-Time类
让我们看看如何使用Joda-Time类实现这种转换：

```java
Timestamp convertToTimestampUsingJodaTime(ZonedDateTime zonedDateTime) {
    DateTime dateTime = new DateTime(zonedDateTime.toInstant().toEpochMilli());
    return new Timestamp(dateTime.getMillis());
---
date: 2024-06-16
category:
  - Java
  - 编程
tag:
  - java.sql.Timestamp
  - ZonedDateTime
---
# 如何在Java中转换java.sql.Timestamp和ZonedDateTime

## 4. 结论
在这个快速教程中，我们学习了如何在Java中转换ZonedDateTime和java.sql.Timestamp类。

正如往常一样，本文中使用的所有代码都可以在GitHub上找到。

文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。

OK