---
date: 2022-04-01
category:
  - Java
  - Date and Time
tag:
  - Java
  - Date and Time
  - Legacy Date API
  - Date Time API
head:
  - - meta
    - name: keywords
      content: Java, Date and Time, Legacy Date API, Date Time API
---
# Java中给时间字符串添加分钟

Java提供了一个标准的API来处理日期和时间。**日期时间API提供了一个方法，可以将字符串格式的时间解析为等价的_LocalTime_类型，以便进一步操作**。

在本教程中，我们将探讨如何使用旧版Date API和日期时间API将分钟添加到字符串格式的时间。

## 2. 使用旧版Date API

时间字符串显示时间，但是它是字符串数据类型。**使用字符串执行算术运算是不可行的**。因此，**在执行算术运算之前，我们需要将时间字符串解析为等价的_Date_类型**。

旧版Date API可以将_String_时间解析为_Date_。让我们看一个使用旧版Date API添加分钟的示例：

```java
@Test
void givenTimeStringUsingSimpleDateFormat_whenIncrementedWith10Minutes_thenResultShouldBeCorrect() throws ParseException {
    String timeString = "23:45";
    SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
    Date date = timeFormat.parse(timeString);

    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    cal.add(Calendar.MINUTE, 10);
    String result = timeFormat.format(cal.getTime());
    assertEquals("23:55", result);
}
```

在上面的代码中，我们创建了一个带有时间值的_String_变量。然后，我们创建了_SimpleDateFormat_对象，将时间格式化为小时和分钟表示。

接下来，我们创建了一个_Date_对象，并在_timeFormat_上调用_parse()_，将_String_时间转换为_Date_对象以进行进一步操作。

此外，我们创建了一个_Calendar_对象，并在其上调用_setTime()_方法。这个方法接受我们之前创建的_Date_对象。接下来，我们在_Calendar_对象上调用_add()_方法，将时间增加_10_分钟。

最后，我们断言新的时间等于预期的时间。

## 3. 使用日期时间API

日期时间API可以轻松地将时间字符串解析为_LocalTime_。此外，**它提供了使时间算术运算变得简单的方法**。

以下是使用日期时间API给时间字符串添加分钟的示例代码：

```java
@Test
void givenTimeStringUsingLocalTime_whenIncrementedWith10Minutes_thenResultShouldBeCorrect() {
    String timeString = "23:45";
    LocalTime time = LocalTime.parse(timeString);
    LocalTime newTime = time.plusMinutes(10);
    String result = newTime.toString();
    assertEquals("23:55", result);
}
```

在这里，我们创建了一个时间字符串，并将其传递给一个_LocalTime_对象。_LocalTime_类提供了各种方法来对时间执行算术运算。接下来，我们在_time_上调用_plusMinutes()_方法，以增加_10_分钟。

最后，我们断言新的时间等于预期的时间。

## 4. 结论

在本文中，我们学习了两种给时间字符串添加分钟的方法。与旧版Date API相比，日期时间API使时间操作和执行算术运算变得容易。

如常，示例的源代码可在GitHub上找到。