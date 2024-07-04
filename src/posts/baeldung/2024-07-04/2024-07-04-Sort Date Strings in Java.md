---
date: 2022-04-01
category:
  - Java
  - 日期处理
tag:
  - Java
  - 日期字符串排序
head:
  - - meta
    - name: keywords
      content: Java, 日期字符串排序, 排序算法
---
# Java中对日期字符串进行排序

## 1. 概述

在处理包含日期时间字符串格式的数据集时，在许多Java应用程序中，对这些字符串进行排序是一项常见任务。

在本教程中，我们将探索在Java中有效地对日期字符串进行排序的不同方法。

## 2. 问题介绍

我们可以直接按字典顺序对特定日期格式的字符串进行排序，例如ISO日期时间格式（_YYYY-MM-dd’T’ HH:mm:ss_）。然而，**这不是排序日期字符串的通用解决方案**。

我们不能对所有日期时间格式应用字典排序操作。例如，假设我们有如下字符串列表：

```java
List`````<String>````` dtStrings = Lists.newArrayList(
  "01/21/2013 10:41",
  "01/20/2013 10:48",
  "01/22/2013 15:13",
  "01/21/2013 16:37",
  "01/21/2013 17:16",
  "01/21/2013 17:19",
  "01/20/2013 06:16",
  "01/22/2013 06:19"
);
```

如果列表中的字符串正确排序，结果应该如下：

```java
List`````<String>````` EXPECTED = Lists.newArrayList(
  "01/20/2013 06:16",
  "01/20/2013 10:48",
  "01/21/2013 10:41",
  "01/21/2013 16:37",
  "01/21/2013 17:16",
  "01/21/2013 17:19",
  "01/22/2013 06:19",
  "01/22/2013 15:13"
);
```

我们将探索解决排序问题的不同方法。此外，为了简单起见，我们将使用单元测试断言来验证每种解决方案是否产生了预期结果。

接下来，让我们看看它们是如何工作的。

## 3. 使用自定义_Comparator_

Java标准库提供了_Collections.sort()_方法来对集合中的元素进行排序。如果我们想按字典顺序对字符串列表进行排序，我们可以简单地将列表传递给_Collections.sort()_方法。此外，该方法也接受_Comparator_对象作为第二个参数。

接下来，让我们看看如何使用自定义_Comparator_对日期时间字符串进行排序：

```java
DateFormat dfm = new SimpleDateFormat("MM/dd/yyyy HH:mm");
Collections.sort(dtStrings, new Comparator`````<String>`````() {
    @Override
    public int compare(String o1, String o2) {
        try {
            return dfm.parse(o1).compareTo(dfm.parse(o2));
        } catch (ParseException e) {
            throw new IllegalArgumentException(e);
        }
    }
});
assertEquals(EXPECTED, dtStrings);
```

如上所示，首先，我们根据日期字符串格式创建了一个_SimpleDateFormat_对象。然后，当我们调用_Collections.sort()_方法时，我们将_dtStrings_列表和一个匿名_Comparator_对象一起传递。

在_compare()_方法实现中，我们**首先将两个日期时间字符串解析为_Date_对象，然后比较两个_Date_对象**。

如果我们的Java版本是8或更高，我们可以使用强大的lambda表达式进行比较，使我们的代码更紧凑、更易于阅读：

```java
final DateTimeFormatter dfm = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm");
dtStrings.sort(Comparator.comparing(s -> LocalDateTime.parse(s, dfm)));
assertEquals(EXPECTED, dtStrings);
```

需要注意的是，**_Collections.sort()_和_list.sort()_方法都支持就地排序**，这意味着**直接修改原始列表，而不需要创建一个新的排序副本**。这在内存效率和性能方面提供了显著的优势。

## 4. 使用Stream API

此外，要对日期时间字符串列表进行排序，我们可以采取三步方法：

- 将_String_元素转换为_LocalDateTime_实例
- 对这些_LocalDateTime_对象进行排序
- 将_LocalDateTime_对象转换回_String_字符串

Stream API允许我们方便地处理集合。如果我们用Stream API实现这个想法，_map()_方法可以帮助我们执行转换：

```java
DateTimeFormatter dfm = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm");
List`````<String>````` sortedList = dtStrings.stream()
  .map(s -> LocalDateTime.parse(s, dfm))
  .sorted()
  .map(dfm::format)
  .collect(Collectors.toList());
assertEquals(EXPECTED, sortedList);
```

与_Collections.sort()_和_list.sort()_解决方案不同，这种方法不会改变原始列表。相反，**它返回一个新的列表来保存排序后的字符串**。

## 5. 使用_TreeMap_

**Java中的_TreeMap_类提供了基于键的自动排序条目。**通过使用这个特性，我们可以轻松地通过创建一个键值对类型为_LocalDateTime_和_String_的_TreeMap_来对日期时间字符串进行排序。

然后，如果我们从_TreeMap_中取出所有值，例如，使用_treeMap.values()_方法，我们得到排序后的结果。

接下来，让我们在测试中实现这一点：

```java
DateTimeFormatter dfm = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm");
Map`<LocalDateTime, String>` dateFormatMap = new TreeMap<>();
dtStrings.forEach(s -> dateFormatMap.put(LocalDateTime.parse(s, dfm), s));
List`````<String>````` result = new ArrayList<>(dateFormatMap.values());
assertEquals(EXPECTED, result);
```

这个解决方案是直接的。然而，它有一个缺点。**由于标准Java _Map_不能有重复的键，重复的日期时间字符串将在排序列表中丢失**。因此，在应用_TreeMap_方法对它们进行排序之前，确保列表不包含重复值是好的。

## 6. 结论

在这篇文章中，我们探索了对日期字符串进行排序的不同通用解决方案：

- 使用自定义_Comparator_的_Collections.sort()_和_list.sort_（就地排序）
- 将字符串转换为日期对象，对对象进行排序，然后将它们转换回日期字符串
- _TreeMap_方法

像往常一样，这里展示的所有代码片段都可以在GitHub上找到。