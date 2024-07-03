---
date: 2024-07-04
category:
  - Java
  - 日期处理
tag:
  - Java
  - LocalDate
  - Calendar
  - Joda-Time
  - Apache Commons Lang3
head:
  - - meta
    - name: keywords
      content: Java, 日期, LocalDate, Calendar, Joda-Time, Apache Commons Lang3
---
# 在Java中向当前日期添加一个月

在本简短教程中，我们将学习如何在Java中向当前日期添加一个月。

首先，我们将了解如何使用Java核心方法来实现这一点。然后，我们将看看如何使用Joda-Time和Apache Commons Lang3等外部库来完成相同的任务。

## 2. Java核心方法

Java提供了几种方便的方式来操作日期和时间。让我们探索不同的选项来向当前日期添加一个月。

### 2.1 使用Calendar类

对于Java 8之前的版本，我们可以使用Calendar来处理时间数据。这个类提供了一组我们可以用于操作日期和时间的方法。

让我们看看它在实际中的应用：

```java
@Test
void givenCalendarDate_whenAddingOneMonth_thenDateIsChangedCorrectly() {
    Calendar calendar = Calendar.getInstance();
    // 虚拟当前日期
    calendar.set(2023, Calendar.APRIL, 20);

    // 添加一个月
    calendar.add(Calendar.MONTH, 1);

    assertEquals(Calendar.MAY, calendar.get(Calendar.MONTH));
    assertEquals(20, calendar.get(Calendar.DAY_OF_MONTH));
    assertEquals(2023, calendar.get(Calendar.YEAR));
}

```

正如我们所看到的，我们使用了add()方法向给定的日期添加了整整一个月。Calendar.MONTH是表示月份的常量。

### 2.2 使用Date类

Date类是另一个选择，如果我们想要改变特定日期的月份。**然而，这个选择的缺点是这个类已经被弃用了**。

让我们通过一个测试用例来看看Date的使用：

```java
@SuppressWarnings("deprecation")
@Test
void givenDate_whenAddingOneMonth_thenDateIsChangedCorrectly() {
    Date currentDate = new Date(2023, Calendar.DECEMBER, 20);
    Date expectedDate = new Date(2024, Calendar.JANUARY, 20);

    currentDate.setMonth(currentDate.getMonth() + 1);

    assertEquals(expectedDate, currentDate);
}

```

如上所示，Date类提供了getMonth()方法，该方法返回表示月份的数字。此外，我们向返回的数字添加了1。然后，我们调用setMonth()来使用新的月份更新Date对象。

值得注意的是，总是建议使用Java 8的新日期/时间API而不是旧的API。

### 2.3 使用LocalDate类

同样，我们可以使用Java 8中引入的LocalDate类。**这个类通过plusMonths()方法提供了一种简单明了的方式来向特定日期添加月份**：

```java
@Test
void givenJavaLocalDate_whenAddingOneMonth_thenDateIsChangedCorrectly() {
    LocalDate localDate = LocalDate.of(2023, 12, 20);

    localDate = localDate.plusMonths(1);

    assertEquals(1, localDate.getMonthValue());
    assertEquals(20, localDate.getDayOfMonth());
    assertEquals(2024, localDate.getYear());
}

```

毫不意外，测试用例成功通过。

## 3. 使用Joda-Time

如果Java 8不是一个选项，我们可以选择Joda-Time库来实现相同的目标。

首先，我们需要将它的依赖项添加到pom.xml文件中：

```xml
``<dependency>``
    ``<groupId>``joda-time``</groupId>``
    ``<artifactId>``joda-time``</artifactId>``
    ``<version>``2.10``</version>``
``</dependency>``
```

Joda-Time提供了它自己的LocalDate类。让我们看看如何使用它来添加一个月：

```java
@Test
void givenJodaTimeLocalDate_whenAddingOneMonth_thenDateIsChangedCorrectly() {
    org.joda.time.LocalDate localDate = new org.joda.time.LocalDate(2023, 12, 20);

    localDate = localDate.plusMonths(1);

    assertEquals(1, localDate.getMonthOfYear());
    assertEquals(20, localDate.getDayOfMonth());
    assertEquals(2024, localDate.getYear());
}

```

正如我们所看到的，LocalDate也有相同的plusMonths()方法。**正如名称所示，它允许我们添加一定数量的月份，在我们的例子中是1**。

## 4. 使用Apache Commons Lang3

或者，我们可以使用Apache Commons Lang3库。像往常一样，要开始使用这个库，我们首先需要添加Maven依赖项：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

通常，Apache Commons Lang3提供了DateUtils实用类来执行一系列日期操作。

让我们通过一个实际的例子来看看如何使用它：

```java
@Test
void givenApacheCommonsLangDateUtils_whenAddingOneMonth_thenDateIsChangedCorrectly() {
    Date currentDate = new GregorianCalendar(2023, Calendar.APRIL, 20, 4, 0).getTime();
    Date expectedDate = new GregorianCalendar(2023, Calendar.MAY, 20, 4, 0).getTime();

    assertEquals(expectedDate, DateUtils.addMonths(currentDate, 1));
}

```

简而言之，我们使用了addMonths()方法将指定的月份增加一。**这里需要注意的一个要点是这个方法返回一个新的Date对象**。**原始对象保持不变**。

## 5. 结论

在这篇短文中，我们探讨了在Java中向当前日期添加一个月的不同方式。

首先，我们看到了如何使用Java核心类来做到这一点。然后，我们学习了如何使用Joda Time和Apache Commons Lang3等第三方库来实现相同的目标。

正如往常一样，本文中使用的代码示例可以在GitHub上找到。