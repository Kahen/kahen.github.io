---
date: 2024-06-27
category:
  - Java
  - 编程
tag:
  - 时间戳转换
  - Java
head:
  - - meta
    - name: 关键词
      content: Java, 时间戳, 长整型, 转换
---

# Java中将时间戳字符串转换为长整型

## 1. 引言

在Java编程中，处理时间戳是一个常见的任务，我们可能需要将时间戳字符串转换为长整型值的场景有很多。

**在本教程中，我们将探索不同的方法来帮助我们有效理解和实现转换。**

## 2. 时间戳概述

时间戳通常以各种格式的字符串表示，例如 _yyyy-MM-dd HH:mm:ss_。此外，将这些时间戳字符串转换为长整型值对于执行Java中的日期和时间相关操作至关重要。

例如，考虑时间戳字符串2023-11-15 01:02:03，结果的长整型值将是1700010123000L，表示从1970年1月1日00:00:00 GMT到指定日期和时间的毫秒数。

## 3. 使用SimpleDateFormat

将时间戳字符串转换为长整型值的传统方法之一是使用SimpleDateFormat类。

让我们看看以下测试代码：

```java
String timestampString = "2023-11-15 01:02:03";
```

```java
@Test
void givenSimpleDateFormat_whenFormattingDate_thenConvertToLong() throws ParseException {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date date = sdf.parse(timestampString);

    String specifiedDateString = sdf.format(date);
    long actualTimestamp = sdf.parse(specifiedDateString).getTime();
    assertEquals(1700010123000L, actualTimestamp);
}
```

在提供的代码中，我们使用SimpleDateFormat对象来格式化当前日期时间对象。**特别是，_actualTimestamp_ 是通过使用sdf对象解析输入_timestampString_，然后使用_getTime()_方法提取其毫秒时间。**

## 4. 使用Instant

随着Java 8中java.time包的引入，提供了一种线程安全的方法来处理日期和时间操作。Instant类可以用来将时间戳字符串转换为长整型值，如下所示：

```java
@Test
public void givenInstantClass_whenGettingTimestamp_thenConvertToLong() {
    Instant instant = LocalDateTime.parse(timestampString, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
      .atZone(ZoneId.systemDefault())
      .toInstant();
    long actualTimestamp = instant.toEpochMilli();
    assertEquals(1700010123000L, actualTimestamp);
}
```

最初，代码将_timestampString_解析为LocalDateTime对象，使用指定的日期时间模式。然后，它将这个LocalDateTime实例转换为系统默认时区的Instant。方法_toEpochMilli()_被用来从这个Instant中提取毫秒时间戳。

## 5. 使用LocalDateTime

Java 8引入了java.time包，提供了一套全面的类来处理日期和时间。特别是LocalDateTime类可以用来将时间戳字符串转换为长整型值，如下所示：

```java
@Test
public void givenJava8DateTime_whenGettingTimestamp_thenConvertToLong() {
    LocalDateTime localDateTime = LocalDateTime.parse(timestampString.replace(" ", "T"));
    long actualTimestamp = localDateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    assertEquals(1700010123000L, actualTimestamp);
}
```

在这里，我们使用_tZonе(ZonеId.systеmDеfault())_方法将LocalDateTime与_timestampString_关联，从而创建了一个ZonedDateTime对象。接下来，_toInstant()_方法被用来获取ZonedDateTime的Instant表示。最后，_toEpochMilli()_方法被应用来提取毫秒时间戳值。

## 6. 使用Joda-Time

Joda-Time是Java的一个流行的日期和时间操作库，提供了一个比标准Java日期和时间API更直观的接口。

让我们探索如何使用Joda-Time将长时间戳转换为格式化的LocalDateTime字符串：

```java
@Test
public void givenJodaTime_whenGettingTimestamp_thenConvertToLong() {
    DateTime dateTime = new DateTime(timestampInMillis, DateTimeZone.UTC);
    org.joda.time.LocalDateTime localDateTime = dateTime.toLocalDateTime();

    org.joda.time.format.DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");
    String actualTimestamp = formatter.print(localDateTime);

    assertEquals(expectedTimestampString, actualTimestamp);
}
```

在这里，我们从提供的_long_值实例化DateTime对象。此外，DateTimeZone.UTC方法明确定义DateTime对象的时区为协调世界时（UTC）。随后，_toLocalDateTime()_函数无缝地将DateTime对象转换为LocalDateTime对象，保持了时区独立表示。

最后，我们使用名为_formatter_的DateTimeFormatter将LocalDateTime对象转换为字符串，遵循指定的模式。

## 7. 结论

总之，将时间戳字符串转换为长整型值是Java中的一个频繁操作，有多种方法可以完成这项任务。

如往常一样，本文的完整代码示例可以在GitHub上找到。
------