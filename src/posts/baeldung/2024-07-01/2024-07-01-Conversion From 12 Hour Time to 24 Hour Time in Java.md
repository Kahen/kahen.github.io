---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Time Conversion
  - Java 8
head:
  - - meta
    - name: keywords
      content: Java, Time Conversion, 24-hour format, 12-hour format
---

# Java中12小时制时间转换为24小时制时间的方法

将不同时间格式之间的转换是常见的编程任务。Java提供了一个标准API用于时间操作。

在本教程中，我们将探索如何使用日期时间API和旧版日期API将12小时制时间格式转换为24小时制时间格式。

## 2. 使用日期时间API

Java 8中引入的日期时间API提供了一个类，用于使用不同的模式格式化时间。12小时制时间和24小时制时间都有不同的表示模式。

以下是一个使用日期时间API将12小时制时间转换为24小时制时间的示例：

```
@Test
void givenTimeInTwelveHours_whenConvertingToTwentyHoursWithDateTimeFormatter_thenConverted() throws ParseException {
    String time = LocalTime.parse("06:00 PM", DateTimeFormatter.ofPattern("hh:mm a", Locale.US))
      .format(DateTimeFormatter.ofPattern("HH:mm"));
    assertEquals("18:00", time);
}
```

在上面的代码中，我们通过调用LocalTime类的_parse()_方法将12小时制时间字符串解析为_LocalTime_对象。

_parse()_方法接受两个参数——要解析的字符串和一个指定字符串格式的_DateTimeFormatter_。

接下来，我们通过调用DateTimeFormatter的_ofPattern()_方法将时间格式化为12小时制格式。**12小时制时间的模式是“_hh:mm a_”**。

此外，我们通过调用解析后时间的_format()_方法，并将模式设置为“_HH:mm_”，这代表24小时制时间格式，来将12小时制时间转换为24小时制时间。

## 3. 使用旧版日期API

简单来说，我们可以使用旧版日期API中的_SimpleDateFormat_来将12小时制时间转换为24小时制时间。

要使用旧版日期API，我们将解析一个12小时制时间格式的字符串为_Date_类型：

```
@Test
public void givenTimeInTwelveHours_whenConvertingToTwentyHours_thenConverted() throws ParseException {
    SimpleDateFormat displayFormat = new SimpleDateFormat("HH:mm");
    SimpleDateFormat parseFormat = new SimpleDateFormat("hh:mm a");
    Date date = parseFormat.parse("06:00 PM");
    assertEquals("18:00", displayFormat.format(date));
}
```

在这里，我们创建了一个_SimpleDateFormat_实例，通过指定模式将时间格式化为24小时等价形式。最后，我们断言转换后的时间与预期的24小时制时间格式匹配。

## 4. 结论

在本文中，我们学习了两种将时间从12小时制格式转换为24小时制格式的不同方法。此外，我们还使用了日期时间API中的_DateTimeFormatter_类和旧版日期API中的_SimpleDateFormat_类来实现转换过程。

如常，示例的完整源代码可以在GitHub上找到。