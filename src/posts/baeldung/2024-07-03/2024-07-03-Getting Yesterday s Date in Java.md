---
date: 2022-04-01
category:
  - Java
  - Date and Time
tag:
  - Java
  - Date
  - Time
head:
  - - meta
    - name: keywords
      content: Java, Date, Time, Yesterday
------
# 在Java中获取昨天的日期

在这篇简短的教程中，我们将探索在Java中获取昨天日期的不同方法。

首先，我们将解释如何使用核心Java来实现。然后，我们将演示如何使用诸如Joda-Time和Apache Commons Lang等外部库来解决我们的主要难题。

### 1. Java 8之前

在Java 8之前，我们通常会使用_Date_或_Calendar_来处理和操作日期/时间信息。那么，让我们看看如何使用这两个类来获取昨天的日期。

#### 1.1 使用_Date_

_Date_类表示一个特定的时间点。它提供了一组方法来操作和检索有关日期的信息。然而，重要的是要提到**这个类已经过时并被标记为已弃用**。

让我们看看实际操作：

```java
@Test
void givenDate_whenUsingDateClass_thenReturnYesterday() {
    Date date = new Date(2023, Calendar.DECEMBER, 20);
    Date yesterdayDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    Date expectedYesterdayDate = new Date(2023, Calendar.DECEMBER, 19);

    assertEquals(expectedYesterdayDate, yesterdayDate);
}
```

如我们所见，我们使用_getTime()_方法来获取给定日期的毫秒数。然后，我们**减去一天，即24 * 60 * 60 * 1000毫秒**。

#### 1.2 使用_Calendar_

_Calendar_是另一个选择，如果我们想使用旧的API。这个类带有一组方法来管理时间数据，例如天和月份。

例如，我们可以使用_add()_方法来添加一定数量的天数。由于我们想要**获取昨天的日期，我们需要将-1作为值**。

让我们在实践中看到它：

```java
@Test
void givenDate_whenUsingCalendarClass_thenReturnYesterday() {
    Calendar date = new GregorianCalendar(2023, Calendar.APRIL, 20, 4, 0);
    date.add(Calendar.DATE, -1);
    Calendar expectedYesterdayDate = new GregorianCalendar(2023, Calendar.APRIL, 19, 4, 0);

    assertEquals(expectedYesterdayDate, date);
}
```

正如预期的那样，测试成功通过。

### 2. Java 8日期时间API

Java 8因其新的日期时间特性而经常受到赞誉。这个API带有大量现成的类和方法，以更简洁和人性化的方式进行日期和时间计算。那么，让我们仔细看看如何使用新的日期时间API来获取昨天的日期。

#### 2.1 使用_LocalDate_

一个最简单的解决方案是使用_LocalDate_类。**它提供了_minusDays()_方法从给定的日期中减去特定数量的天数。在我们的情况下，我们需要减去整整一天**。

现在，让我们用一个测试案例来说明_LocalDate.minusDays()_的使用：

```java
@Test
void givenDate_whenUsingLocalDateClass_thenReturnYesterday() {
    LocalDate localDate = LocalDate.of(2023, 12, 20);
    LocalDate yesterdayDate = localDate.minusDays(1);
    LocalDate expectedYesterdayDate = LocalDate.of(2023, 12, 19);

    assertEquals(expectedYesterdayDate, yesterdayDate);
}
```

如上所示，_minusDays(1)_返回一个新的_LocalDate_对象，表示昨天。

#### 2.2 使用_Instant_

另一个解决方案是使用_Instant_类。顾名思义，它模拟时间轴上的一个特定时间点。**通常，_Instant_类带有_minus()_方法，我们可以使用它来减去特定数量的毫秒**。

那么，让我们用一个实际的例子来说明如何使用它来获取昨天的日期：

```java
@Test
void givenDate_whenUsingInstantClass_thenReturnYesterday() {
    Instant date = Instant.parse("2023-10-25");
    Instant yesterdayDate = date.minus(24 * 60 * 60 * 1000);
    Instant expectedYesterdayDate = Instant.parse("2023-10-24");

    assertEquals(expectedYesterdayDate, yesterdayDate);
}
```

正如我们前面提到的，24 * 60 * 60 * 1000表示一天的毫秒数。所以在这里，我们从给定的日期中减去一天。

### 3. 使用Joda-Time

同样，我们可以使用Joda-Time API来回答我们的中心问题。首先，我们需要将其依赖项添加到_pom.xml_文件中：

```xml
``<dependency>``
    ``<groupId>``joda-time``</groupId>``
    ``<artifactId>``joda-time``</artifactId>``
    ``<version>``2.10``</version>``
``</dependency>``
```

Joda-Time是在Java 8发布之前日期和时间操作的事实标准。它提供了自己的_LocalDate_类版本。那么，让我们在实践中看到：

```java
@Test
void givenDate_whenUsingJodaTimeLocalDateClass_thenReturnYesterday() {
    org.joda.time.LocalDate localDate = new org.joda.time.LocalDate(2023, 12, 20);
    org.joda.time.LocalDate yesterdayDate = localDate.minusDays(1);
    org.joda.time.LocalDate expectedYesterdayDate = new org.joda.time.LocalDate(2023, 12, 19);

    assertEquals(expectedYesterdayDate, yesterdayDate);
}
```

简而言之，**这个类提供了完全相同的方法_minusDays()_，我们可以使用它来减去特定数量的天数，正如它的名字所指示的**。

### 4. 使用Apache Commons Lang3

另一方面，我们可以选择Apache Commons Lang3库。像往常一样，在开始使用之前，我们需要添加Maven依赖项：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.12.0``</version>``
``</dependency>``
```

现在，让我们演示如何使用这个库来获取昨天的日期：

```java
@Test
void givenDate_whenUsingApacheCommonsLangDateUtils_thenReturnYesterday() {
    Date date = new GregorianCalendar(2023, Calendar.MAY, 16, 4, 0).getTime();
    Date yesterdayDate = DateUtils.addDays(date, -1);
    Date expectedYesterdayDate = new GregorianCalendar(2023, Calendar.MAY, 15, 4, 0).getTime();

    assertEquals(expectedYesterdayDate, yesterdayDate);
}
```

Apache Commons Lang3库提供了_DateUtils()_类进行日期时间操作。**这个实用类提供了_addDays()_方法来添加天数，在我们的情况下是-1**。

请注意，该方法返回一个新的_Date_对象。原始给定的日期保持不变。

### 5. 结论

在这篇短文中，我们详细解释了如何在Java中获取昨天的日期。在整个课程中，我们展示了如何使用核心Java类来实现。然后，我们展示了如何使用Apache Commons Lang3和Joda-Time等外部库。

一如既往，本文中使用的代码可以在GitHub上找到。