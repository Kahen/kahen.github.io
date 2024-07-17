---
date: 2022-04-01
category:
  - Java
  - 日期和时间
tag:
  - 时间计算
  - Java 8
  - Joda-Time
  - PrettyTime
  - Time4J
head:
  - - meta
    - name: keywords
      content: Java 时间计算, Java 8 日期和时间 API, Joda-Time, PrettyTime, Time4J
------
# 如何在 Java 中计算“时间之前”

计算相对时间和两个时间点之间的持续时间是软件系统中的常见用例。例如，我们可能希望向用户显示自发布新照片等事件以来经过了多少时间。这样的“时间之前”文本的例子包括“5分钟前”，“1年前”等。

虽然语义和选择的词语完全取决于上下文，但总体思路是相同的。

在本教程中，我们将探讨在 Java 中计算“时间之前”的几种解决方案。**由于 Java 8 中引入了新的日期和时间 API，我们将分别讨论版本 7 和版本 8 的解决方案。**

## 2. Java 版本 7

Java 7 中有几个与时间相关的类。此外，由于 Java 7 Date API 的不足，还有几个第三方时间和日期库可用。

首先，让我们使用纯 Java 7 来计算“时间之前”。

### 2.1. 纯 Java 7

我们定义一个枚举，它包含不同的时间粒度，并将它们转换为毫秒：

```java
public enum TimeGranularity {
    SECONDS {
        public long toMillis() {
            return TimeUnit.SECONDS.toMillis(1);
        }
    }, MINUTES {
        public long toMillis() {
            return TimeUnit.MINUTES.toMillis(1);
        }
    }, HOURS {
        public long toMillis() {
            return TimeUnit.HOURS.toMillis(1);
        }
    }, DAYS {
        public long toMillis() {
            return TimeUnit.DAYS.toMillis(1);
        }
    }, WEEKS {
        public long toMillis() {
            return TimeUnit.DAYS.toMillis(7);
        }
    }, MONTHS {
        public long toMillis() {
            return TimeUnit.DAYS.toMillis(30);
        }
    }, YEARS {
        public long toMillis() {
            return TimeUnit.DAYS.toMillis(365);
        }
    }, DECADES {
        public long toMillis() {
            return TimeUnit.DAYS.toMillis(365 * 10);
        }
    };

    public abstract long toMillis();
}
```

我们使用了 `java.util.concurrent.TimeUnit` 枚举，这是一个用于时间转换的强大工具。使用 `TimeUnit` 枚举，我们为 `TimeGranularity` 枚举的每个值重写 `toMillis()` 抽象方法，以便它返回每个值相当于的毫秒数。例如，对于“十年”，它返回 3650 天的毫秒数。

通过定义 `TimeGranularity` 枚举，我们可以定义两个方法。第一个方法接受一个 `java.util.Date` 对象和一个 `TimeGranularity` 实例，并返回一个“时间之前”的字符串：

```java
static String calculateTimeAgoByTimeGranularity(Date pastTime, TimeGranularity granularity) {
    long timeDifferenceInMillis = getCurrentTime() - pastTime.getTime();
    return timeDifferenceInMillis / granularity.toMillis() + " " +
          granularity.name().toLowerCase() + " ago";
}
```

这个方法将当前时间和给定时间的差值除以毫秒中的 `TimeGranularity` 值。因此，我们可以粗略地计算自给定时间以来经过的时间量。

我们使用了 `getCurrentTime()` 方法来获取当前时间。为了测试，我们返回一个固定的时间点，避免从本地机器读取时间。在实践中，这个方法将使用 `System.currentTimeMillis()` 或 `LocalDateTime.now()` 返回当前时间的真实值。

让我们测试一下这个方法：

```java
Assert.assertEquals("5 hours ago",
  TimeAgoCalculator.calculateTimeAgoByTimeGranularity(
    new Date(getCurrentTime() - (5 * 60 * 60 * 1000)), TimeGranularity.HOURS));
```

此外，我们还可以编写一个方法，自动检测最适合的时间粒度，并返回更人性化的输出：

```java
static String calculateHumanFriendlyTimeAgo(Date pastTime) {
    long timeDifferenceInMillis = getCurrentTime() - pastTime.getTime();
    if (timeDifferenceInMillis / TimeGranularity.DECADES.toMillis() > 0) {
        return "several decades ago";
    } else if (timeDifferenceInMillis / TimeGranularity.YEARS.toMillis() > 0) {
        return "several years ago";
    } else if (timeDifferenceInMillis / TimeGranularity.MONTHS.toMillis() > 0) {
        return "several months ago";
    } else if (timeDifferenceInMillis / TimeGranularity.WEEKS.toMillis() > 0) {
        return "several weeks ago";
    } else if (timeDifferenceInMillis / TimeGranularity.DAYS.toMillis() > 0) {
        return "several days ago";
    } else if (timeDifferenceInMillis / TimeGranularity.HOURS.toMillis() > 0) {
        return "several hours ago";
    } else if (timeDifferenceInMillis / TimeGranularity.MINUTES.toMillis() > 0) {
        return "several minutes ago";
    } else {
        return "moments ago";
    }
}
```

现在，让我们看看一个测试示例：

```java
Assert.assertEquals("several hours ago",
  TimeAgoCalculator.calculateHumanFriendlyTimeAgo(new Date(getCurrentTime() - (5 * 60 * 60 * 1000))));
```

根据上下文，我们可以使用不同的词语，如“几个”，“一些”，“许多”，甚至是确切的值。

### 2.2. Joda-Time 库

在 Java 8 发布之前，Joda-Time 是 Java 中各种时间和日期相关操作的事实标准。我们可以使用 Joda-Time 库的三个类来计算“时间之前”：

- `org.joda.time.Period`，它接受两个 `org.joda.time.DateTime` 对象，并计算这两个时间点之间的差异
- `org.joda.time.format.PeriodFormatter`，它定义了打印 `Period` 对象的格式
- `org.joda.time.format.PeriodFormatuilder`，它是一个构建器类，用于创建自定义的 `PeriodFormatter`

我们可以使用这三个类轻松地获取现在和过去某个时间之间的确切时间：

```java
static String calculateExactTimeAgoWithJodaTime(Date pastTime) {
    Period period = new Period(new DateTime(pastTime.getTime()), new DateTime(getCurrentTime()));
    PeriodFormatter formatter = new PeriodFormatterBuilder().appendYears()
      .appendSuffix(" year ", " years ")
      .appendSeparator("and ")
      .appendMonths()
      .appendSuffix(" month ", " months ")
      .appendSeparator("and ")
      .appendWeeks()
      .appendSuffix(" week ", " weeks ")
      .appendSeparator("and ")
      .appendDays()
      .appendSuffix(" day ", " days ")
      .appendSeparator("and ")
      .appendHours()
      .appendSuffix(" hour ", " hours ")
      .appendSeparator("and ")
      .appendMinutes()
      .appendSuffix(" minute ", " minutes ")
      .appendSeparator("and ")
      .appendSeconds()
      .appendSuffix(" second", " seconds")
      .toFormatter();
    return formatter.print(period);
}
```

让我们看看一个示例用法：

```java
Assert.assertEquals("5 hours and 1 minute and 1 second",
  TimeAgoCalculator.calculateExactTimeAgoWithJodaTime(new Date(getCurrentTime() - (5 * 60 * 60 * 1000 + 1 * 60 * 1000 + 1 * 1000))));
```

也可以生成更人性化的输出：

```java
static String calculateHumanFriendlyTimeAgoWithJodaTime(Date pastTime) {
    Period period = new Period(new DateTime(pastTime.getTime()), new DateTime(getCurrentTime()));
    if (period.getYears() != 0) {
        return "several years ago";
    } else if (period.getMonths() != 0) {
        return "several months ago";
    } else if (period.getWeeks() != 0) {
        return "several weeks ago";
    } else if (period.getDays() != 0) {
        return "several days ago";
    } else if (period.getHours() != 0) {
        return "several hours ago";
    } else if (period.getMinutes() != 0) {
        return "several minutes ago";
    } else {
        return "moments ago";
    }
}
```

我们可以运行一个测试，看看这个方法返回一个更人性化的“时间之前”字符串：

```java
Assert.assertEquals("several hours ago",
  TimeAgoCalculator.calculateHumanFriendlyTimeAgoWithJodaTime(new Date(getCurrentTime() - (5 * 60 * 60 * 1000))));
```

再次，我们可以使用不同的术语，如“一个”，“几个”或“一些”，具体取决于用例。

### 2.3. Joda-Time _TimeZone_

使用 Joda-Time 库计算“时间之前”时，添加时区非常简单：

```java
String calculateZonedTimeAgoWithJodaTime(Date pastTime, TimeZone zone) {
    DateTimeZone dateTimeZone =DateTimeZone.forID(zone.getID());
    Period period = new Period(new DateTime(pastTime.getTime(), dateTimeZone), new DateTime(getCurrentTimeByTimeZone(zone)));
    return PeriodFormat.getDefault().print(period);
}
```

`getCurrentTimeByTimeZone()` 方法返回指定时区的当前时间值。对于测试，这个方法返回一个固定的时间点，但在实践中，这应该使用 `Calendar.getInstance(zone).getTimeInMillis()` 或 `LocalDateTime.now(zone)` 返回当前时间的真实值。

## 3. Java 8

Java 8 引入了一个新的改进的日期和时间 API，它采纳了 Joda-Time 库的许多想法。**我们可以使用原生的 `java.time.Duration` 和 `java.time.Period` 类来计算“时间之前”：**

```java
static String calculateTimeAgoWithPeriodAndDuration(LocalDateTime pastTime, ZoneId zone) {
    Period period = Period.between(pastTime.toLocalDate(), getCurrentTimeByTimeZone(zone).toLocalDate());
    Duration duration = Duration.between(pastTime, getCurrentTimeByTimeZone(zone));
    if (period.getYears() != 0) {
        return "several years ago";
    } else if (period.getMonths() != 0) {
        return "several months ago";
    } else if (period.getDays() != 0) {
        return "several days ago";
    } else if (duration.toHours() != 0) {
        return "several hours ago";
    } else if (duration.toMinutes() != 0) {
        return "several minutes ago";
    } else if (duration.getSeconds() != 0) {
        return "several seconds ago";
    } else {
        return "moments ago";
    }
}
```

上述代码片段支持时区，并仅使用原生 Java 8 API。

## 4. PrettyTime 库

**PrettyTime 是一个强大的库，专门提供“时间之前”功能，并支持 i18n。** 它还高度可定制，易于使用，并且可以与 Java 版本 7 和 8 一起使用。

首先，让我们将它的依赖项添加到我们的 _pom.xml_：

```xml
```<dependency>```
    ```<groupId>```org.ocpsoft.prettytime```</groupId>```
    ```<artifactId>```prettytime```</artifactId>```
    ```<version>```3.2.7.Final```</version>```
```</dependency>```
```

现在，以人性化的格式获取“时间之前”变得非常容易：

```java
String calculateTimeAgoWithPrettyTime(Date pastTime) {
    PrettyTime prettyTime = new PrettyTime();
    return prettyTime.format(pastTime);
}
```

## 5. Time4J 库

最后，Time4J 是另一个用于操作 Java 中时间和日期数据的优秀库。它有一个 _PrettyTime_ 类，可以用来计算时间之前。

让我们添加它的依赖项：

```xml
```<dependency>```
    ```<groupId>```net.time4j```</groupId>```
    ```<artifactId>```time4j-base```</artifactId>```
    ```<version>```5.9```</version>```
```</dependency>```
```<dependency>```
    ```<groupId>```net.time4j```</groupId>```
    ```<artifactId>```time4j-sqlxml```</artifactId>```
    ```<version>```5.8```</version>```
```</dependency>```
```

添加此依赖项后，计算时间之前变得非常简单：

```java
String calculateTimeAgoWithTime4J(Date pastTime, ZoneId zone, Locale locale) {
    return PrettyTime.of(locale).printRelative(pastTime.toInstant(), zone);
}
```

与 PrettyTime 库一样，Time4J 也默认支持 i18n。

## 6. 结论

在本文中，我们讨论了在 Java 中计算“时间之前”的不同方法。

有适用于纯 Java 和第三方库的解决方案。由于 Java 8 中引入了新的日期和时间 API，纯 Java 解决方案在 8 之前的版本和之后的版本是不同的。

一如既往，示例的源代码可在 GitHub 上获取。
OK