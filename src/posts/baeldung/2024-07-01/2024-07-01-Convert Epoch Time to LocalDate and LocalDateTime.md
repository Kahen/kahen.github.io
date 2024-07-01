---
date: 2022-04-01
category:
  - Java
tag:
  - Epoch Time
  - LocalDate
  - LocalDateTime
head:
  - - meta
    - name: keywords
      content: Java, Epoch Time, LocalDate, LocalDateTime, Conversion
---
# 将纪元时间转换为LocalDate和LocalDateTime | Baeldung

## 1. 引言

纪元时间，也被称为Unix时间，是一种将日期和时间表示为单一数值的系统。它测量了自1970年1月1日00:00:00协调世界时（UTC）以来经过的毫秒数。纪元时间因其简单性和易于操作而在计算机系统和编程语言中广泛使用。

在本教程中，我们将探讨将毫秒为单位的纪元时间转换为LocalDate和LocalDateTime。

## 2. 将纪元时间转换为LocalDate

要将纪元时间转换为LocalDate，我们需要将毫秒为单位的纪元时间转换为Instant对象。

Instant表示UTC时区的时间线上的一个点：

```java
long epochTimeMillis = 1624962431000L; // 示例的毫秒纪元时间
Instant instant = Instant.ofEpochMilli(epochTimeMillis);
```

一旦我们有了Instant对象，我们可以通过使用atZone()方法指定时区，并将日期部分提取出来，将其转换为LocalDate对象：

```java
ZoneId zoneId = ZoneId.systemDefault(); // 使用系统默认时区
LocalDate localDate = instant.atZone(zoneId).toLocalDate();

```

最后，我们可以以人类可读的格式输出转换后的LocalDate对象：

```java
System.out.println(localDate); // 输出：2021-06-29
```

我们可以使用DateTimeFormatter类使用特定的模式格式化日期：

```java
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
String formattedDate = localDate.format(formatter);
System.out.println(formattedDate); // 输出：2021-06-29
```

我们可以根据需要选择不同的模式。

以下是脚本的表示：

```java
long epochTimeMillis = 1624962431000L; // 示例的毫秒纪元时间
Instant instant = Instant.ofEpochMilli(epochTimeMillis);

ZoneId zoneId = ZoneId.systemDefault(); // 使用系统默认时区
LocalDate localDate = instant.atZone(zoneId).toLocalDate();

DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
String formattedDate = localDate.format(formatter);
System.out.println(formattedDate); // 输出：2021-06-29
```

通过这四个步骤，我们可以轻松地将毫秒为单位的纪元时间转换为LocalDate，甚至可以为输出指定格式。

## 3. 将纪元时间转换为LocalDateTime

将毫秒为单位的纪元时间转换为LocalDateTime的步骤与上面LocalDate的示例类似。唯一的区别是我们将导入LocalDateTime类。

将所有内容整合在一起，以下是转换为LocalDateTime的脚本：

```java
long epochTimeMillis = 1624962431000L; // 示例的毫秒纪元时间
Instant instant = Instant.ofEpochMilli(epochTimeMillis);

ZoneId zoneId = ZoneId.systemDefault(); // 使用系统默认时区
LocalDateTime localDateTime = instant.atZone(zoneId).toLocalDateTime();

DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formattedDateTime = localDateTime.format(formatter);
System.out.println(formattedDateTime); // 输出：2021-06-29 12:13:51

```

脚本将毫秒为单位的纪元时间转换为LocalDateTime，我们可以使用DateTimeFormatter类格式化日期和时间。

## 4. 结论

在本文中，我们探讨了将毫秒为单位的纪元时间转换为LocalDate和LocalDateTime。这是一个相当直接的过程，我们使用了DateTimeFormatter类将输出转换为特定的日期或时间格式。

本文的完整实现可在GitHub上找到。