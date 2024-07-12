---
date: 2024-07-12
category:
  - Java
  - DateTime API
tag:
  - LocalDateTime
  - ZonedDateTime
head:
  - - meta
    - name: keywords
      content: Java, LocalDateTime, ZonedDateTime, 转换
------
# Java中LocalDateTime与ZonedDateTime的转换

Java中的_LocalDateTime_ API用于表示和操作日期和时间的组合。_ZonedDateTime_是一个不可变对象，它持有一个精确到纳秒的日期时间值，一个基于ISO 8601日历系统的时间区值，以及一个_ZoneOffSet_来处理模糊的本地日期时间。

在本教程中，我们将看到如何从_LocalDateTime_转换到_ZonedDateTime_以及反过来。

让我们从将_LocalDateTime_的实例转换为_ZonedDateTime_开始。

### 2.1 使用_atZone()_方法

**来自_LocalDateTime_实例的_atZone()_方法执行转换到_ZonedDateTime_并保持相同的日期时间值**：

```java
LocalDateTime localDateTime = LocalDateTime.of(2022, 1, 1, 0, 30, 22);
ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.of("Canada/Atlantic"));

assertEquals(localDateTime.getYear(), zonedDateTime.getYear());
assertEquals(localDateTime.getMonth(), zonedDateTime.getMonth());
assertEquals(localDateTime.getDayOfMonth(), zonedDateTime.getDayOfMonth());
assertEquals(localDateTime.getHour(), zonedDateTime.getHour());
assertEquals(localDateTime.getMinute(), zonedDateTime.getMinute());
assertEquals(localDateTime.getSecond(), zonedDateTime.getSecond());
```

_atZone()_方法接收一个_ZoneId_值，该值指定基于ISO 8601日历系统的时间区。

**调用_withZoneSameInstant()_方法使用_ZoneOffSet_时间差转换为实际的日期时间值**：

```java
LocalDateTime localDateTime = LocalDateTime.of(2022, 1, 1, 0, 30, 22);
ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.of("Africa/Lagos")).withZoneSameInstant(ZoneId.of("Canada/Atlantic"));

assertEquals("2021-12-31T19:30:22-04:00[Canada/Atlantic]", zonedDateTime.toString());
assertEquals("-04:00", zonedDateTime.getOffset().toString());
```

我们可以通过调用静态_ZoneId.getAvailableZoneIds()_方法来获取可用的_ZoneId_s。此方法返回所有可用的基于地区的ID作为_String_，我们可以选择它们来创建一个_ZoneId_对象。

此外，使用_atZone()_的转换还带有_ZoneOffSet_值，提供_UTC (GMT)_和_ZonedDateTime_对象之间的时间差（如上例中的_-04:00_）。

### 2.2 使用_ZonedDateTime.of()_方法

_ZonedDateTime_类还提供了一个静态_of()_方法来创建一个_ZonedDateTime_对象。该方法接受_LocalDateTime_和_ZoneId_作为参数，并返回一个_ZonedDateTime_对象：

```java
LocalDateTime localDateTime = LocalDateTime.of(2022, 11, 5, 7, 30, 22);
ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.of("Africa/Accra")).withZoneSameInstant(ZoneId.of("Africa/Lagos"));

assertEquals("2022-11-05T08:30:22+01:00[Africa/Lagos]", zonedDateTime.toString());
assertEquals(localDateTime.getYear(), zonedDateTime.getYear());
```

在这种情况下，正如我们之前看到的，我们可以通过调用_withZoneSameInstant()_方法来获取给定区域的实际日期时间值。

### 2.3 使用_ZonedDateTime.ofInstant()_方法

我们还可以使用_ZoneOffSet_对象结合_LocalDateTime_来创建一个_ZonedDateTime_对象。

静态_ofInstant()_方法接受_LocalDateTime_、_ZoneOffSet_和_ZoneId_对象作为参数：

```java
LocalDateTime localDateTime = LocalDateTime.of(2022, 1, 5, 17, 30, 22);
ZoneId zoneId = ZoneId.of("Africa/Lagos");
ZoneOffset zoneOffset = zoneId.getRules().getOffset(localDateTime);
ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(localDateTime, zoneOffset, zoneId);
```

```java
assertEquals("2022-01-05T17:30:22+01:00[Africa/Lagos]", zonedDateTime.toString());
```

**_ZonedDateTime_对象是由隐式形成的_Instant_对象创建的，该对象通过结合_LocalDateTime_和_ZoneOffSet_对象形成**。

### 2.4 使用_ZonedDateTime.ofLocal()_方法

静态_ofLocal()_方法从_LocalDateTime_对象和作为参数传递的首选_ZoneOffSet_对象创建一个_ZonedDateTime_：

```java
LocalDateTime localDateTime = LocalDateTime.of(2022, 8 , 25, 8, 35, 22);
ZoneId zoneId = ZoneId.of("Africa/Lagos");
ZoneOffset zoneOffset = zoneId.getRules().getOffset(localDateTime);
ZonedDateTime zonedDateTime = ZonedDateTime.ofLocal(localDateTime, zoneId, zoneOffset);
```

```java
assertEquals("2022-08-25T08:35:22+01:00[Africa/Lagos]", zonedDateTime.toString());
```

**通常，对于一个本地日期时间只有一个有效的偏移量**。当发生时间重叠时，就会有两个有效的偏移量。

如果作为参数传递的首选_ZoneOffset_是有效的偏移量之一，则使用它。否则，转换将保持之前的有效偏移量。

### 2.5 使用_ZonedDateTime.ofStrict()_方法

类似地，静态_ofStrict()_方法通过严格验证_LocalDateTime_、_ZoneOffSet_和_ZoneID_参数的组合返回一个_ZonedDateTime_对象：

```java
LocalDateTime localDateTime = LocalDateTime.of(2022, 12, 25, 6, 18, 2);
ZoneId zoneId = ZoneId.of("Asia/Tokyo");
ZoneOffset zoneOffset = zoneId.getRules().getOffset(localDateTime);
ZonedDateTime zonedDateTime = ZonedDateTime.ofStrict(localDateTime, zoneOffset, zoneId);
```

```java
assertEquals("2002-12-25T06:18:02+09:00[Asia/Tokyo]", zonedDateTime.toString());
```

如果提供无效的参数组合，该方法将抛出一个_DateTimeException_：

```java
zoneId = ZoneId.of("Asia/Tokyo");
zoneOffset = ZoneOffset.UTC;
assertThrows(DateTimeException.class, () -> ZonedDateTime.ofStrict(localDateTime, zoneOffset, zoneId));
```

上述示例显示，当我们尝试使用_Asia/Tokyo_的_ZoneId_和表示默认_UTC (GMT + 0)_的_ZoneOffSet_值的组合来创建一个_ZonedDateTime_对象时，会抛出异常。

## 3. 将_ZonedDateTime_转换为_LocalDateTime_

一个_ZonedDateTime_对象维护三个不同的对象：一个_LocalDateTime_、一个_ZoneId_和一个_ZoneOffset_。

我们可以使用_toLocalDateTime()_方法将_ZonedDateTime_的实例转换为_LocalDateTime_：

```java
ZonedDateTime zonedDateTime = ZonedDateTime.of(2011, 2, 12, 6, 14, 1, 58086000, ZoneId.of("Asia/Tokyo"));
LocalDateTime localDateTime = zonedDateTime.toLocalDateTime();

assertEquals("2011-02-12T06:14:01.058086+09:00[Asia/Tokyo]", zonedDateTime.toString());
```

这个方法检索作为_ZonedDateTime_属性存储的_LocalDateTime_对象。

## 4. 结论

在本文中，我们学习了如何将_LocalDateTime_的实例转换为_ZonedDateTime_以及反过来。

如常，示例的源代码可在GitHub上获取。