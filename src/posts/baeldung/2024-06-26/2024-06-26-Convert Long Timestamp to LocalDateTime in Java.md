---
date: 2024-06-27
category:
  - Java
  - LocalDateTime
tag:
  - Long Timestamp
  - Convert
head:
  - - meta
    - name: keywords
      content: Java, LocalDateTime, Convert, Long Timestamp
---
# Java中将长时间戳转换为LocalDateTime

处理Java中的时间戳是一项常见任务，它使我们能够更有效地操作和显示日期和时间信息，尤其是在处理数据库或外部API时。

本文教程将探讨如何将长时间戳转换为LocalDateTime对象。

## 2. 理解长时间戳和LocalDateTime

### 2.1. 长时间戳
长时间戳表示一个特定的时间点，作为自纪元（epoch）以来的毫秒数。具体来说，它是一个单一值，表示自1970年1月1日以来经过的时间。

此外，以这种格式处理时间戳对于计算是高效的，但需要转换为可读的日期时间格式，以用于用户交互或显示目的。

例如，长值1700010123000L代表参考点2023-11-15 01:02:03。

### 2.2. LocalDateTime
java.time包是在Java 8中引入的，提供了一个现代的日期和时间API。LocalDateTime是这个包中的一个类，可以存储和操作不同时区的日期和时间。

## 3. 使用Instant类
Instant类表示一个时间点，并且可以很容易地转换为其他日期和时间表示。因此，要将长时间戳转换为LocalDateTime对象，我们可以使用Instant类，如下所示：

```java
long timestampInMillis = 1700010123000L;
String expectedTimestampString = "2023-11-15 01:02:03";

@Test
void givenTimestamp_whenConvertingToLocalDateTime_thenConvertSuccessfully() {
    Instant instant = Instant.ofEpochMilli(timestampInMillis);
    LocalDateTime localDateTime =
      LocalDateTime.ofInstant(instant, ZoneId.of("UTC"));

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String formattedDateTime = localDateTime.format(formatter);

    assertEquals(expectedTimestampString, formattedDateTime);
}
```

在上面的测试方法中，我们使用1700010123000L初始化长变量timestampInMillis。此外，我们使用Instant.ofEpochMilli(timestampInMillis)方法将长时间戳转换为Instant。

随后，LocalDateTime.ofInstant(instant, ZoneId.of("UTC"))方法使用UTC时区将Instant转换为LocalDateTime。

## 4. 使用Joda-Time
Joda-Time是Java的一个流行的日期和时间操作库，提供了一个比标准Java日期和时间API更直观的接口。

让我们探索如何使用Joda-Time将长时间戳转换为格式化的LocalDateTime字符串：

```java
@Test
void givenJodaTime_whenGettingTimestamp_thenConvertToLong() {
    DateTime dateTime = new DateTime(timestampInMillis, DateTimeZone.UTC);
    org.joda.time.LocalDateTime localDateTime = dateTime.toLocalDateTime();

    org.joda.time.format.DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");
    String actualTimestamp = formatter.print(localDateTime);

    assertEquals(expectedTimestampString, actualTimestamp);
}
```

在这里，我们从提供的长值实例化DateTime对象。此外，DateTimeZone.UTC方法显式地将DateTime对象的时区定义为协调世界时（UTC）。随后，toLocalDateTime()函数无缝地将DateTime对象转换为LocalDateTime对象，保持时区独立表示。

最后，我们使用名为formatter的DateTimeFormatter将LocalDateTime对象转换为字符串，遵循指定的模式。

## 5. 结论
总之，将长时间戳转换为Java中的LocalDateTime对象的过程涉及使用Instant类来准确表示时间。允许有效地操作和显示日期和时间信息，确保与数据库或外部API的无缝交互。

如常，本文的完整代码示例可以在GitHub上找到。