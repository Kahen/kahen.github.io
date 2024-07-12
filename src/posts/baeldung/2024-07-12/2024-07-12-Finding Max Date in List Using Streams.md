---
date: 2022-04-01
category:
  - Java
tag:
  - Java 8
  - Streams
head:
  - - meta
    - name: keywords
      content: Java, Date, LocalDate, Max Date, Streams
----
# 使用Streams查找列表中的最大日期

在本文中，我们首先创建一个包含日期的对象。然后，我们将看到如何使用_Streams_在这些对象的列表中找到最大日期。

## 2. 示例设置

**Java的原始_Date_ API仍然被广泛使用**，因此我们将展示一个使用它的示例。然而，自从Java 8引入了_LocalDate_，并且大多数_Date_方法都被弃用了。因此，**我们还将展示一个使用_LocalDate_的示例。**

首先，让我们创建一个包含单独_Date_属性的基础_Event_对象：

```java
public class Event {
    Date date;

    // 构造函数，getter和setter
}
```

现在我们可以定义三个_Event_的列表：第一个是今天发生的，第二个是明天发生的，第三个是一周后发生的。**为了给_Date_添加天数，我们将使用Apache Commons的_DateUtils_方法_addDays()_**：

```java
Date TODAY = new Date();
Event TODAYS_EVENT = new Event(TODAY);
Date TOMORROW = DateUtils.addDays(TODAY, 1);
Event TOMORROWS_EVENT = new Event(TOMORROW);
Date NEXT_WEEK = DateUtils.addDays(TODAY, 7);
Event NEXT_WEEK_EVENT = new Event(NEXT_WEEK);
List```<Event>``` events = List.of(TODAYS_EVENT, TOMORROWS_EVENT, NEXT_WEEK_EVENT);
```

现在我们的目标是编写一个方法，能够确定_NEXT_WEEK_EVENT_是这个_Event_列表中的最大日期。我们也将使用_LocalDate_而不是_Date_做同样的事情。我们的_LocalEvent_看起来像这样：

```java
public class LocalEvent {
    LocalDate date;

    // 构造函数，getter和setter
}
```

构建_Event_列表更加直接，因为_LocalDate_已经内置了_plusDays()_方法：

```java
LocalDate TODAY_LOCAL = LocalDate.now();
LocalEvent TODAY_LOCAL_EVENT = new LocalEvent(TODAY_LOCAL);
LocalDate TOMORROW_LOCAL = TODAY_LOCAL.plusDays(1);
LocalEvent TOMORROW_LOCAL_EVENT = new LocalEvent(TOMORROW_LOCAL);
LocalDate NEXT_WEEK_LOCAL = TODAY_LOCAL.plusWeeks(1);
LocalEvent NEXT_WEEK_LOCAL_EVENT = new LocalEvent(NEXT_WEEK_LOCAL);
List```<LocalEvent>``` localEvents = List.of(TODAY_LOCAL_EVENT, TOMORROW_LOCAL_EVENT, NEXT_WEEK_LOCAL_EVENT);
```

## 3. 获取最大日期

首先，**我们将使用_Stream API_来流式处理我们的_Event_列表**。然后，我们需要对_Stream_的每个元素应用_Date_ getter。这样，我们将获得一个包含事件日期的_Stream_。**现在我们可以使用_max()_函数了。这将根据提供的_Comparator_返回_Stream_中的最大_Date_。**

_Date_类实现了_Comparable`<Date>`_。因此，_compareTo()_方法定义了自然日期顺序。简单来说，可以在_max()_中等效地调用以下两个方法：

- _Date_的_compareTo()_可以通过方法引用来引用
- _Comparator_的_naturalOrder()_可以直接使用

最后，让我们注意，如果给定的_Event_列表为空或为null，我们可以直接返回null。这将确保我们在流式处理列表时不会遇到问题。

最终的方法看起来像这样：

```java
Date findMaxDateOf(List```<Event>``` events) {
    if (events == null || events.isEmpty()) {
        return null;
    }
    return events.stream()
      .map(Event::getDate)
      .max(Date::compareTo)
      .get();
}
```

或者，使用_naturalOrder()_，它将这样读取：

```java
Date findMaxDateOf(List```<Event>``` events) {
    if (events == null || events.isEmpty()) {
        return null;
    }
    return events.stream()
      .map(Event::getDate)
      .max(Comparator.naturalOrder())
      .get();
}
```

总之，我们现在可以快速测试我们的方法是否为我们的列表返回了正确的结果：

```java
assertEquals(NEXT_WEEK, findMaxDateOf(List.of(TODAYS_EVENT, TOMORROWS_EVENT, NEXT_WEEK_EVENT));
```

使用_LocalDate_，推理是完全相同的。_LocalDate_确实实现了_ChronoLocalDate_接口，它扩展了_Comparable`<ChronoLocalDate>`_。因此，_LocalDate_的自然顺序由_ChronoLocalDate_的_compareTo()_方法定义。

因此，方法可以写成：

```java
LocalDate findMaxDateOf(List```<LocalEvent>``` events) {
    if (events == null || events.isEmpty()) {
        return null;
    }
    return events.stream()
      .map(LocalEvent::getDate)
      .max(LocalDate::compareTo)
      .get();
}
```

或者，以完全等效的方式：

```java
LocalDate findMaxDateOf(List```<LocalEvent>``` events) {
    if (events == null || events.isEmpty()) {
        return null;
    }
    return events.stream()
      .map(LocalEvent::getDate)
      .max(Comparator.naturalOrder())
      .get();
}
```

我们可以编写以下测试来确认它的工作：

```java
assertEquals(NEXT_WEEK_LOCAL, findMaxDateOf(List.of(TODAY_LOCAL_EVENT, TOMORROW_LOCAL_EVENT, NEXT_WEEK_LOCAL_EVENT)));
```

## 4. 结论

在本教程中，我们已经看到了如何在对象列表中获取最大日期。我们使用了_Date_和_LocalDate_对象。

像往常一样，代码可以在GitHub上找到。