---
date: 2022-04-01
category:
  - Java
  - Date and Time
tag:
  - Instant
  - LocalDateTime
head:
  - - meta
    - name: keywords
      content: Java, Instant, LocalDateTime, date and time
---
# Java中Instant和LocalDateTime的区别

## 1. 引言

Java 8引入了一组新的日期和时间类。了解何时使用哪一个可能会令人困惑。在本教程中，我们将探讨Instant和LocalDateTime类之间的区别。

## 2. Instant类

**将Instant类想象成UTC时区中的一个单一时间点是最简单的方式**。如果我们将时间想象成一条线，Instant就代表线上的一个点。

在内部，Instant类实际上只是计算相对于1970年1月1日标准Unix纪元时间00:00:00的秒数和纳秒数。这个时间点由0秒和0纳秒表示，其他一切都是从它开始的偏移。

通过存储相对于这个特定时间点的秒数和纳秒数，它允许类存储正负偏移。换句话说，**Instant类可以表示纪元时间之前和之后的时间**。

### 2.1. 使用Instant

让我们看看如何使用Instant类。首先，它提供了各种静态方法，用于快速计算时间线上的瞬间。

例如，Instant.now()方法给我们提供了一个Instant对象，代表当前的UTC时间。我们还可以使用Instant进行一些基本的算术运算：

```
Instant twelveHoursFromNow = Instant.now().plus(12, ChronoUnit.HOURS);
Instant oneWeekAgo = Instant.now().minus(7, ChronoUnit.DAYS);
```

此外，我们可以比较两个Instant：

```
Instant instant1 = Instant.now();
Instant instant2 = instant1.plus(1, ChronoUnit.SECONDS);
assertTrue(instant1.isBefore(instant2));
assertFalse(instant1.isAfter(instant2));
```

### 2.2. 限制

Instant类简单明了，但也有一些缺点。首先，它**不完全符合考虑闰秒的其他标准**。它不是在一天的末尾添加或删除一秒钟，而是使用自己的时间尺度，将那一秒钟分散在那一天的最后1000秒内。

这样做基本上可以认为每一天都有确切的86400秒。然而，这不是其他时间标准的工作方式，所以**Instant不是那么精确**。

此外，因为Instant只是从固定纪元时间存储秒数和纳秒数，**它在它能表示的时间上是有限的**。具体来说，Instant中的秒数使用long数据类型存储。这意味着有一个限制，我们可以用Instant表示Unix纪元时间之前和之后的距离。

幸运的是，最小值和最大值大约是10亿年前和10亿年后，所以这个限制可能不会影响大多数应用程序。

## 3. LocalDateTime类

现在让我们看看LocalDateTime类。首先需要知道的是，尽管它的名字中有"Local"，但它**并不与任何时区绑定**。从本质上讲，"Local"前缀意味着日期和时间在我们所处的任何地区。

我们可以将其想象为简单地设置为一年中的特定日子的日历，以及一天中某个特定时间的时钟。事实上，底层的日期和时间值分别使用LocalDate和LocalTime类型存储。这两个值都独立于任何地区存在。它们不像Instant类那样是任何特定时间线的一部分。

**LocalDateTime类非常适合表示无论时区如何都会发生的事件**。例如，元旦总是在1月1日午夜。这个确切的时间最终会在每个时区发生，但显然不是在同一时间。当伦敦的人们倒数新年时，洛杉矶的人们正在愉快地度过他们的下午。

因此，单独使用**LocalDateTime类并不适用于需要时区的场景**。想象一下，你要求一个不同时区的同事在2023年6月15日下午3点见面。或者想象一下设置一个提醒在下午5点给朋友打电话，然后飞越国家。如果没有时区的知识，我们很可能会错过与同事的会议，忘记给朋友打电话。

### 3.1. 使用LocalDateTime

让我们看一些使用LocalDateTime类的例子。我们可以使用LocalDateTime.now()方法轻松地计算默认时区的当前日期和时间。

就像Instant一样，还有许多静态方法让我们提供各种日期和时间值的组合：

```
LocalDateTime.of(2023, 6, 1, 12, 0);
LocalDateTime.of(2023, 6, 1, 12, 0, 0);
LocalDateTime.of(2023, 6, 1, 12, 0, 0, 0);
```

我们还可以使用LocalDateTime进行基本的算术运算：

```
LocalDateTime tomorrow = LocalDateTime.now().plus(1, ChronoUnit.DAYS);
LocalDateTime oneYearAgo = LocalDateTime.now().minus(1, ChronoUnit.YEARS);
```

最后，我们可以比较两个LocalDateTime对象：

```
LocalDateTime now = LocalDateTime.now();
LocalDateTime y2k = LocalDateTime.of(2000, 1, 1, 0, 0);
assertTrue(now.isAfter(y2k));
assertTrue(y2k.isBefore(now));
```

## 4. 其他Java日期和时间类

如果我们需要处理时区怎么办？我们在上面看到Instant和LocalDateTime都不适合这个，但幸运的是**Java提供了一些其他类来处理时区**。下面我们将简要看一下其中的一些。

### 4.1. ZoneOffset

ZoneOffset类表示在标准UTC区域之前或之后的偏移量，以小时、分钟和秒为单位。**它只是偏移信息，没有其他**。没有名称，没有夏令时知识等。

### 4.2. ZoneId

ZoneId类比ZoneOffset类要详细得多。虽然它也定义了UTC区域的小时、分钟和秒，但它包含更多信息，如名称、唯一ID、夏令时规则等。

特定时区的规则由当地政府设定，因此变化相当频繁。因此，ZoneId类封装了每个区域的所有特定规则，以及任何变化的历史。

### 4.3. ZonedDateTime

最后，我们得到了ZonedDateTime类。我们可以将这个类想象成带有ZoneId信息的Instant。虽然我们应该始终使用一致的区域为所有用户存储日期和时间值，但**ZonedDateTime类对于在特定区域为个别用户显示这些值非常有用**。

## 5. 结论

Java 8提供了一组丰富的API，这些API远远优于旧的Date类来处理日期和时间。然而，知道对于特定用例使用哪一个并不总是显而易见的。

在本文中，我们查看了两个新类，Instant和LocalDateTime。虽然它们具有相似的API，但它们非常不同。我们看到**Instant只是Unix纪元时间的正或负偏移，并且始终与UTC时区绑定**。我们还看到**LocalDateTime只是一个日历和时钟，没有任何时区信息**。

两者都可以用于不同的事情，但如果我们需要时区信息，它们单独任何一个都不够。