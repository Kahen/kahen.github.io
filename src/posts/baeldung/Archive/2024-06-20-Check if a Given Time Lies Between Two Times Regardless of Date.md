---
date: 2024-06-21
category:
  - Java
  - 时间处理
tag:
  - Java 8
  - LocalTime
  - Date
  - Calendar
head:
  - - meta
    - name: keywords
      content: Java, 时间比较, LocalTime, Date, Calendar
---

# 检查给定时间是否在两个时间之间，不论日期

在Java中，有多种方法可以确定一个特定时间是否在两个时间之间，而不考虑日期。

**在本教程中，我们将探讨几种可能的实现方式。**

## 2. 使用 _isAfter()_ 和 _isBefore()_ 方法

Java 8在_java.time_包中引入了_LocalTime_类，提供了方便的方法来处理不考虑日期的时间：

```
LocalTime startTime = LocalTime.parse("09:00:00");
LocalTime endTime = LocalTime.parse("17:00:00");
LocalTime targetTime = LocalTime.parse("12:30:00");
```

这里，我们使用特定的时间值初始化三个_LocalTime_变量，_startTime_、_endTime_和_targetTime_。这些行基本上设置了测试方法中的开始时间、结束时间和目标时间。

**_LocalTime.parse("09:00:00")_将字符串“_09:00:00_”解析为表示上午9:00的_LocalTime_对象。类似地，“_17:00:00_”表示下午5:00，“_12:30:00_”表示中午12:30。**

现在，我们来测试这种方法：

```
@Test
void givenLocalTime_whenUsingIsAfterIsBefore_thenTimeIsBetween() {
    assertTrue(!targetTime.isBefore(startTime) && !targetTime.isAfter(endTime));
}
```

这种方法使用_LocalTime_类的_isAfter_()和_isBefore()_方法来测试给定的_targetTime_是否落在指定的_startTime_和_endTime_之间。我们使用_assetTrue()_方法来验证_targetTime_既不在_startTime_之前也不在_endTime_之后。

## 3. 使用 _compareTo()_ 方法

另一种方法是使用_compareTo()_方法，它比较两个_LocalTime_实例：

```
@Test
void givenLocalTime_whenUsingCompareTo_thenTimeIsBetween() {
    assertTrue(targetTime.compareTo(startTime) >= 0 && targetTime.compareTo(endTime) `<= 0);
}
```

这里，表达式_targetTime.compareTo(startTime) >`= 0 && targetTime.compareTo(endTime) <= 0_使用逻辑与(&&)组合了两个比较。它检查_targetTime_是否大于或等于_startTime_并且小于或等于_endTime_。

这个复合条件确保_targetTime_落在由_startTime_和_endTime_定义的时间范围内，包括边界。**如果两个单独的比较都为真，则整个表达式的结果为真，表明目标时间在开始和结束时间之间，或与它们重合。**

## 4. 使用 _after()_ 和 _before()_ 方法

在这种方法中，我们将使用遗留的_Date_和_Calendar_对象来表示和比较时间。**尽管这种方法被认为不如Java 8的_LocalTime_方法方便，但它仍然适用于需要与旧代码库或系统兼容的场景：**

```
@Test
void givenDate_whenUsingAfterBefore_thenTimeIsBetween() {
    Calendar startCalendar = Calendar.getInstance();
    startCalendar.set(Calendar.HOUR_OF_DAY, 9);
    startCalendar.set(Calendar.MINUTE, 0);
    Date startTime = startCalendar.getTime();

    Calendar endCalendar = Calendar.getInstance();
    endCalendar.set(Calendar.HOUR_OF_DAY, 17);
    endCalendar.set(Calendar.MINUTE, 0);
    Date endTime = endCalendar.getTime();

    Calendar targetCalendar = Calendar.getInstance();
    targetCalendar.set(Calendar.HOUR_OF_DAY, 12);
    targetCalendar.set(Calendar.MINUTE, 30);
    Date targetTime = targetCalendar.getTime();

    assertTrue(!targetTime.before(startTime) && !targetTime.after(endTime));
}
```

首先，我们使用_Calendar.getInstance()_方法创建_startTime_、_endTime_和_targetTime_的_Calendar_实例，该方法返回一个初始化为当前日期和时间的_Calendar_对象。

一旦_Calendar_对象设置好，我们就从它们各自的_Calendar_实例中提取表示开始、结束和目标时间的_Date_对象。

有了_Date_对象后，我们通过使用_Date_类的_before()_和_after()_方法来比较_targetTime_与_startTime_和_endTime_。

## 5. 结论

总之，Java提供了多种方法，包括现代的_LocalTime_方法、遗留的_Date_功能和正则表达式，以准确地确定特定时间是否落在定义的边界内，满足多样化的开发需求。

如常，相关的源代码可以在GitHub上找到。
