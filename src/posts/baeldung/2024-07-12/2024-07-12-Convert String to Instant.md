---
date: 2022-04-01
category:
  - Java
  - Date-Time API
tag:
  - String to Instant
  - LocalDateTime
  - Instant
head:
  - - meta
    - name: keywords
      content: Java, Instant, LocalDateTime, Date-Time API
---

# Java中将字符串转换为Instant

在本快速教程中，**我们将解释如何使用Java中的java.time包中的类将_字符串_转换为_Instant_**。首先，我们将使用_LocalDateTime_类实现一个解决方案。然后，我们将使用_Instant_类来获取一个时区内的瞬间。

### 2. 使用_LocalDateTime_类

_**java.time.LocalDateTime**_ **表示没有时区的日期和/或时间**。它是一个局部时间对象，意味着它只在特定的上下文中有效，不能在这个上下文之外使用。这个上下文通常是执行代码的机器。

要从_字符串_获取时间，我们可以使用_DateTimeFormatter_创建一个格式化的对象，并将此格式化器传递给_LocalDateTime_的_parse_方法。我们也可以定义自己的格式化器或使用_DateTimeFormatter_类提供的预定义格式化器。

让我们看看如何使用_LocalDateTime.parse()_从_字符串_获取时间：

```java
String stringDate = "09:15:30 PM, Sun 10/09/2022";
String pattern = "hh:mm:ss a, EEE M/d/uuuu";
DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(pattern, Locale.US);
LocalDateTime localDateTime = LocalDateTime.parse(stringDate, dateTimeFormatter);
```

在上面的例子中，我们使用_LocalDateTime_类，这是表示带有时间的日期的标准类，来解析日期_字符串_。我们还可以使用_java.time.LocalDate_来表示只有日期而没有时间。

### 3. 使用_Instant_类

**java.time.Instant类，是Date-Time API的主要类之一，封装了时间线上的一个点**。它类似于_java.util.Date_类，但提供了纳秒精度。

在我们下一个例子中，我们将使用前面的_LocalDateTime_来获取一个指定_ZoneId_的瞬间：

```java
String stringDate = "09:15:30 PM, Sun 10/09/2022";
String pattern = "hh:mm:ss a, EEE M/d/uuuu";
DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(pattern, Locale.US);
LocalDateTime localDateTime = LocalDateTime.parse(stringDate, dateTimeFormatter);
ZoneId zoneId = ZoneId.of("America/Chicago");
ZonedDateTime zonedDateTime = localDateTime.atZone(zoneId);
Instant instant = zonedDateTime.toInstant();
```

在上面的例子中，我们首先创建一个_ZoneId_对象，它用于识别一个时区，然后我们提供_LocalDateTime_和_Instant_之间的转换规则。

接下来，我们使用_ZonedDateTime_，它封装了一个带有时区和相应偏移的日期和时间。_ZonedDateTime_类是Date-Time API中最接近_java.util.GregorianCalendar_类的类。最后，我们使用_ZonedDateTime.toInstant()_方法获取一个_Instant_，它将一个时区中的时刻调整为UTC。

### 4. 结论

在本快速教程中，我们解释了**如何使用java.time包中的类将_字符串_转换为_Instant_**。像往常一样，代码片段可以在GitHub上找到。