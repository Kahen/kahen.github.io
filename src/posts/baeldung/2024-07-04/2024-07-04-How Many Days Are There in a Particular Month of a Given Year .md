---
date: 2024-07-04
category:
  - Java
  - 编程
tag:
  - Java 8
  - 日期时间API
  - Calendar
head:
  - - meta
    - name: keywords
      content: Java, 日期时间, YearMonth, Calendar
---
# 如何在给定年份的特定月份中查找天数 | Baeldung

在本教程中，我们将学习如何在Java编程中查找给定年份中特定月份的天数。例如，对于输入表示2024年3月的月份，我们的代码将返回_31_。

## 1. 概述

## 2. 使用 _YearMonth_

Java 8引入了全新的日期/时间API。特别是，它增加了_YearMonth_，一个代表年份和月份组合的不可变对象。

可以通过静态工厂方法_of()_轻松创建_YearMonth_的实例。然后，我们可以调用它的_lengthOfMonth()_方法，该方法返回月份的长度，并考虑年份：

```java
int getDaysInMonthWithYearOfMonth(int month, int year) {
    YearMonth yearMonth = YearMonth.of(year, month);
    return yearMonth.lengthOfMonth();
}
```

现在，让我们使用以下输入来检查我们方法的结果：

- 2024年3月有31天
- 1999年11月有30天
- 2025年2月有28天
- 2004年2月有29天

假设我们的类名为_DaysInMonthUtils_，我们可以编写我们的单元测试：

```java
@Test
void whenGetDaysInMonthWithYearOfMonth_thenCorrectResult() {
    assertEquals(31, new DaysInMonthUtils().getDaysInMonthWithYearOfMonth(3, 2024));
    assertEquals(30, new DaysInMonthUtils().getDaysInMonthWithYearOfMonth(11, 1999));
    assertEquals(28, new DaysInMonthUtils().getDaysInMonthWithYearOfMonth(2, 2025));
    assertEquals(29, new DaysInMonthUtils().getDaysInMonthWithYearOfMonth(2, 2004));
}
```

## 3. 使用 _Calendar_

**对于Java 8之前的版本，我们可以回退到原始的Calendar API。**

我们可以使用_Calendar_的_instance()_方法使用默认时区和区域设置获取_Calendar_对象。然后，我们需要更改_Calendar_的日期和月份为给定的值。最后，我们调用_getActualMaximum()_并将_Calendar.DATE_作为参数来返回我们的结果：

```java
int getDaysInMonthWithCalendar(int month, int year) {
    Calendar calendar = Calendar.getInstance();
    calendar.set(Calendar.DAY_OF_MONTH, 1);
    calendar.set(Calendar.YEAR, year);
    calendar.set(Calendar.MONTH, month - 1);
    return calendar.getActualMaximum(Calendar.DATE);
}
```

我们实际上对月份编号减去了一，因为_Calendar_对月份使用基于零的索引。另一个有趣的注意点是我们将月份设置为_1_。乍一看，这似乎与目的不符。但是，我们需要这样做，因为_Calendar_根据当前的日期值调整日期。例如，假设我们有一个设置在7月31日的_Calendar_，我们将月份更改为6月。由于6月只有30天，API将滚动到下一个有效日期，即7月1日。

我们现在可以使用相同的测试输入来验证我们方法的行为：

```java
@Test
void whenGetDaysInMonthWithCalendar_thenCorrectResult() {
    assertEquals(31, new DaysInMonthUtils().getDaysInMonthWithCalendar(3, 2024));
    assertEquals(30, new DaysInMonthUtils().getDaysInMonthWithCalendar(11, 1999));
    assertEquals(28, new DaysInMonthUtils().getDaysInMonthWithCalendar(2, 2025));
    assertEquals(29, new DaysInMonthUtils().getDaysInMonthWithCalendar(2, 2004));
}
```

## 4. 结论

在本文中，我们使用_YearMonth_直接计算了一个月的天数。我们还看到了如何绕过Calendar API的设计决策，以确保使用它也能获得正确的结果。

一如既往，代码可在GitHub上找到。