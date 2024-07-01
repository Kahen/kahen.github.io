---
date: 2022-04-01
category:
  - Java
  - Date and Time
tag:
  - LocalDate
  - Epoch
head:
  - - meta
    - name: keywords
      content: Java, LocalDate, Epoch, Conversion, Timezone, ZoneId
---
# Java LocalDate与Epoch互转教程

在本教程中，我们将展示如何将Java的_LocalDate_转换为_Epoch_以及如何反向转换。进行转换时，理解_Epoch_和_LocalDate_背后的概念非常重要。Java中的‘_Epoch_’指的是1970-01-01T00:00:00Z这一时间点。Epoch之后的时间点将具有正值，而Epoch之前的时间点则具有负值。

所有_Epoch_、_LocalDate_和_LocalDateTime_的实例都与时区有关，因此在它们之间进行转换时，我们需要知道时区。在Java中，时区可以通过_ZoneId_类来表示。_ZoneId_可以是系统默认时区，通过方法_ZoneId.systemDefault()_获得。或者，也可以通过传递已知时区的_String_，如_Europe/Amsterdam_，来计算_ZoneId_。

## 3. Epoch转换为日期/时间
我们可以根据自Epoch以来的毫秒数计算出_LocalDate_或_LocalDateTime_。另外，计数可以以秒为单位，或者以秒和纳秒调整。Java中用于这种计数的数据类型是_Long_。最后，我们还需要知道时区。让我们看看如何进行转换：

```java
long milliSecondsSinceEpoch = 2131242L;
ZoneId zoneId = ZoneId.of("Europe/Amsterdam");
LocalDate date = Instant.ofEpochMilli(milliSecondsSinceEpoch).atZone(zoneId).toLocalDate();
```

在上述代码片段中，我们有自Epoch以来的毫秒数，时区为阿姆斯特丹，因此我们可以使用类_Instant_的_ofEpochMilli()_方法来获取_LocalDate_值。否则，如果我们想要时间而不是日期，那么我们将编写：

```java
LocalDateTime time = Instant.ofEpochMilli(milliSecondsSinceEpoch).atZone(zoneId).toLocalDateTime();
```

在上述代码片段中，我们使用了相同的方法，但是使用了_toLocalDateTime_方法。

## 4. 日期/时间转换为Epoch
如果我们有一个在给定时区中的_LocalDate_日期，那么我们可以得到秒数的_Epoch_。让我们看看怎么做：

```java
ZoneId zoneId = ZoneId.of("Europe/Tallinn");
LocalDate date = LocalDate.now();
long EpochMilliSecondsAtDate = date.atStartOfDay(zoneId).toInstant().toEpochMilli();
```

在上述示例中，我们得到了今天日期的_Epoch_秒数和系统当前所在的时区。**请注意，我们只能得到一天开始的_Epoch_计数**。这是因为_LocalDate_没有时间值信息。或者，如果我们确实有时间组件，我们可以在给定的瞬间得到确切的_Epoch_计数：

```java
LocalDateTime localDateTime = LocalDateTime.parse("2019-11-15T13:15:30");
long epochMilliSecondsAtTime = localDateTime.atZone(zoneId).toInstant().toEpochMilli();
```

## 5. 结论
在本文中，我们探讨了如何从_Epoch_转换到_LocalDate_和_LocalDateTime_。我们还展示了如何将_LocalDate_或_LocalDateTime_转换为_Epoch_。

如常，我们可以在GitHub上找到完整的代码。