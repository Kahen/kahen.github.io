---
date: 2022-04-01
category:
  - Java
  - Date and Time
tag:
  - Java
  - Unix Timestamp
  - Date Conversion
head:
  - - meta
    - name: keywords
      content: Java, Unix Timestamp, Date Conversion
------
# Java中从Unix时间戳创建日期

## 1. 引言

在本快速教程中，我们将学习如何从Unix时间戳解析日期的表示。**Unix时间**是自1970年1月1日以来经过的秒数。然而，时间戳可以表示到纳秒级的精度。因此，我们将看到可用的工具，并创建一个方法将任何范围的时间戳转换为Java对象。

## 2. 旧方法（Java 8之前）

在Java 8之前，我们最简单的选择是_日期(Date)_和_日历(Calendar)_。_日期_类有一个构造函数，直接接受以毫秒为单位的时间戳：

```java
public static Date dateFrom(long input) {
    return new Date(input);
}
```

使用_日历_，我们必须在_getInstance()_之后调用_setTimeInMillis()_：

```java
public static Calendar calendarFrom(long input) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTimeInMillis(input);
    return calendar;
}
```

换句话说，我们必须知道我们的输入是以秒、纳秒还是两者之间的任何其他精度。然后，我们必须手动将我们的时间戳转换为毫秒。

## 3. 新方法（Java 8+）

Java 8引入了_Instant_。**这个类有实用的方法从秒和毫秒创建实例。**此外，其中一个接受纳秒调整参数：

```java
Instant.ofEpochSecond(seconds, nanos);
```

**但我们仍然必须事先知道我们的时间戳的精度。**例如，如果我们知道我们的时间戳是以纳秒为单位的，我们需要进行一些计算：

```java
public static Instant fromNanos(long input) {
    long seconds = input / 1_000_000_000;
    long nanos = input % 1_000_000_000;

    return Instant.ofEpochSecond(seconds, nanos);
}
```

首先，我们将时间戳除以十亿以获取秒数。然后，我们使用它的余数来获取秒之后的部分。

## 4. 使用Instant的通用解决方案

**为了避免额外的工作，让我们创建一个方法，可以将任何输入转换为毫秒，大多数类都可以解析。**首先，我们检查我们的时间戳在什么范围内。然后，我们执行计算以提取毫秒。此外，我们将使用科学记数法使我们的条件更易读。

还记得时间戳是有符号的，所以我们必须检查正负范围（负时间戳意味着它们从1970年开始倒数）。

**让我们先检查我们的输入是否在纳秒范围内**：

```java
private static long millis(long timestamp) {
    if (millis >= 1E16 || millis `<= -1E16) {
        return timestamp / 1_000_000;
    }

    // 下一个范围检查
}
```

首先，我们检查它是否在_1E16_范围内，这是一后面跟着16个零。**负值代表1970年之前的日期，所以我们也必须检查它们。**然后，我们将我们的值除以一百万以获得毫秒。

类似地，微秒在_1E14_范围内。这次，我们除以一千：

```java
if (timestamp >`= 1E14 || timestamp `<= -1E14) {
    return timestamp / 1_000;
}
```

**当我们的值在1E11到-3E10范围内时，我们不需要改变任何东西**。这意味着我们的输入已经是毫秒精度：

```java
if (timestamp >`= 1E11 || timestamp <= -3E10) {
    return timestamp;
}
```

最后，如果我们的输入不是这些范围内的任何一种，那么它一定是秒，所以我们需要将其转换为毫秒：

```java
return timestamp * 1_000;
```

### 4.1. 为_Instant_标准化输入

**现在，让我们创建一个方法，使用_Instant.ofEpochMilli()_从任何精度的输入返回_Instant_**：

```java
public static Instant fromTimestamp(long input) {
    return Instant.ofEpochMilli(millis(input));
}
```

注意，每次我们除以或乘以值时，都会丢失精度。

### 4.2. 使用_LocalDateTime_的本地时间

**_Instant_代表一个时间点。但是，没有时区，它不容易阅读，因为它取决于我们在世界的位置。**所以，让我们创建一个方法来生成本地时间表示。我们将使用UTC以避免我们的测试中出现不同的结果：

```java
public static LocalDateTime localTimeUtc(Instant instant) {
    return LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
}
```

**现在，我们可以测试使用错误的精度时，当方法期望特定格式时，可能会导致完全不同的日期。**首先，让我们传递一个我们已知正确日期的纳秒时间戳，但是将其转换为微秒并使用我们之前创建的_fromNanos()_方法：

```java
@Test
void givenWrongPrecision_whenInstantFromNanos_thenUnexpectedTime() {
    long microseconds = 1660663532747420283l / 1000;
    Instant instant = fromNanos(microseconds);
    String expectedTime = "2022-08-16T15:25:32";

    LocalDateTime time = localTimeUtc(instant);
    assertThat(!time.toString().startsWith(expectedTime));
    assertEquals("1970-01-20T05:17:43.532747420", time.toString());
}
```

**当我们使用我们在前一节中创建的_fromTimestamp()_方法时，这个问题不会发生**：

```java
@Test
void givenMicroseconds_whenInstantFromTimestamp_thenLocalTimeMatches() {
    long microseconds = 1660663532747420283l / 1000;

    Instant instant = fromTimestamp(microseconds);
    String expectedTime = "2022-08-16T15:25:32";

    LocalDateTime time = localTimeUtc(instant);
    assertThat(time.toString().startsWith(expectedTime));
}
```

## 5. 结论

在本文中，我们学习了如何使用Java核心类转换时间戳。**然后，我们看到了它们可以有不同的精度级别以及这如何影响我们的结果。**最后，我们创建了一个简单的方法来标准化我们的输入并获得一致的结果。

如往常一样，源代码可在GitHub上获得。