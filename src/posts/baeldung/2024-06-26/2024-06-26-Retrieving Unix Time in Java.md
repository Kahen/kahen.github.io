---
date: 2024-06-26
category:
  - Java
  - Unix Time
tag:
  - Java
  - Unix Time
  - Legacy Date API
  - Date Time API
  - Joda-Time
head:
  - - meta
    - name: keywords
      content: Java, Unix Time, Legacy Date API, Date Time API, Joda-Time
------
# 在Java中检索Unix时间

Unix时间是从1970年1月1日00:00:00 UTC开始经过的总秒数。这个时间点被称为Unix纪元。Unix时间有助于在编程中表示日期和时间。

在本教程中，我们将学习如何使用旧版Date API、Date Time API和Joda-Time库在Java中检索Unix时间值。

### 2. 使用旧版Date API

Date API提供了一个名为_Date_的类，该类提供了一个获取当前时间的方法。**我们可以通过将当前时间的毫秒数除以_1000L_来获取当前的Unix时间**。

让我们看一个使用_Date_类检索当前Unix时间的示例：

```java
@Test
void givenTimeUsingDateApi_whenConvertedToUnixTime_thenMatch() {
    Date date = new Date(2023 - 1900, 1, 15, 0, 0, 0);
    long expected = 1676419200;
    long actual = date.getTime() / 1000L;
    assertEquals(expected, actual);
}
```

在这里，我们创建一个新的_Date_对象，并用一个固定日期和时间初始化它。接下来，我们调用_Date_对象上的_getTime()_来获取毫秒时间。然后，我们将毫秒时间除以_1000L_以获取Unix时间。

**值得注意的是，标准的Unix时间时间戳是以纪元以来的秒数，而不是毫秒**。

最后，我们断言结果等于预期的Unix时间。

### 3. 使用Date Time API

Java 8中的新Date Time API提供了_LocalDate_和_Instant_类来操作日期和时间。我们可以通过调用_Instant_对象上的_getEpochSecond()_来获取当前的Unix时间：

```java
@Test
void givenTimeUsingLocalDate_whenConvertedToUnixTime_thenMatch() {
    LocalDate date = LocalDate.of(2023, Month.FEBRUARY, 15);
    Instant instant = date.atStartOfDay().atZone(ZoneId.of("UTC")).toInstant();
    long expected = 1676419200;
    long actual = instant.getEpochSecond();
    assertEquals(expected, actual);
}
```

在这里，我们创建一个_LocalDate_对象来表示一个固定的时间。接下来，我们将_LocalDate_对象传递给_Instant_对象以表示一天的开始。

此外，我们调用_Instant_对象上的_getEpochSecond()_来获取指定时间的Unix时间值。

最后，我们断言返回的Unix时间值等于预期的Unix时间戳。

### 4. 使用Joda-Time库

Joda-Time库提供了一个_DateTime_类来获取当前时间。获取当前时间后，我们可以轻松计算Unix时间。要使用Joda Time，让我们在_pom.xml_中添加它的依赖：

```xml
`<dependency>`
    `<groupId>`joda-time`</groupId>`
    `<artifactId>`joda-time`</artifactId>`
    `<version>`2.12.5`</version>`
`</dependency>`
```

以下是使用Joda-Time库中的_DateTime_类检索Unix时间的示例代码：

```java
@Test
void givenTimeUsingJodaTime_whenConvertedToUnixTime_thenMatch() {
    DateTime dateTime = new DateTime(2023, 2, 15, 00, 00, 00, 0);
    long expected = 1676419200;
    long actual = dateTime.getMillis() / 1000L;
    assertEquals(expected, actual);
}
```

在上面的代码中，我们使用固定日期和时间创建了一个_DateTime_的实例，并调用了_getMillis()_方法。接下来，我们将其除以_1000L_以获取Unix时间戳。

### 5. 避免2038年问题

通常，Unix时间在许多系统和编程语言中以有符号的32位整数存储。然而，32位整数可以存储的最大值是_2 147 483 647_。

**这为Unix时间创造了一个问题，因为在2038年1月19日03:14:07 UTC，Unix时间值将达到其限制**。下一秒将回滚到一个负数，这可能导致系统出现故障行为、应用程序失败、崩溃和系统故障。

我们可以通过在Java中将Unix时间存储在64位长整数而不是32位整数来避免这个限制。

### 6. 结论

在本文中，我们学习了如何使用旧版Data API、Date Time API和Joda-Time库来检索Unix时间。将Unix时间值存储在64位长整数中可以避免未来日期的任何限制或溢出问题。

如常，示例的完整源代码可在GitHub上找到。