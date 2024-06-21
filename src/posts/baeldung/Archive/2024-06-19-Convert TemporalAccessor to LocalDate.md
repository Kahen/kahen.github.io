---
date: 2024-06-20
category:
  - Java
  - Date and Time
tag:
  - TemporalAccessor
  - LocalDate
head:
  - - meta
    - name: keywords
      content: Java, TemporalAccessor, LocalDate, Conversion, DateTimeFormatter, TemporalQueries
---
# Java中将TemporalAccessor转换为LocalDate

## 1. 引言

处理日期和时间值是一项常见任务。有时，我们可能需要将TemporalAccessor对象转换为LocalDate对象以执行特定日期的操作。这在解析日期时间字符串或从日期时间对象中提取日期组件时可能非常有用。

**在本教程中，我们将探索在Java中实现这种转换的不同方法。**

## 2. 使用LocalDate.from()方法

将TemporalAccessor转换为LocalDate的一种直接方法是使用LocalDate.from(TemporalAccessor temporal)方法。实际上，此方法从TemporalAccessor中提取日期组件（年、月和日）并构建一个LocalDate对象。让我们看一个例子：

```java
String dateString = "2022-03-28";
TemporalAccessor temporalAccessor = DateTimeFormatter.ISO_LOCAL_DATE.parse(dateString);
```

```java
@Test
public void givenTemporalAccessor_whenUsingLocalDateFrom_thenConvertToLocalDate() {
    LocalDate convertedDate = LocalDate.from(temporalAccessor);
    assertEquals(LocalDate.of(2022, 3, 28), convertedDate);
}
```

在这段代码片段中，我们初始化一个String变量dateString，值为"2022-03-28"，表示一个ISO 8601格式的日期。此外，我们使用DateTimeFormatter.ISO_LOCAL_DATE.parse()方法将此字符串解析为TemporalAccessor对象temporalAccessor。

**然后，我们使用LocalDate.from(temporalAccessor)方法将temporalAccessor转换为LocalDate对象convertedDate，有效地提取并构建日期组件。**

最后，通过断言assertEquals(LocalDate.of(2022, 3, 28), convertedDate)，我们确保转换结果使convertedDate与预期的日期匹配。

## 3. 使用TemporalQueries

将TemporalAccessor转换为LocalDate的另一种方法是使用TemporalQueries。我们可以定义一个自定义的TemporalQuery来提取必要的日期组件并构建一个LocalDate对象。以下是一个例子：

```java
@Test
public void givenTemporalAccessor_whenUsingTemporalQueries_thenConvertToLocalDate() {
    int year = temporalAccessor.query(TemporalQueries.localDate()).getYear();
    int month = temporalAccessor.query(TemporalQueries.localDate()).getMonthValue();
    int day = temporalAccessor.query(TemporalQueries.localDate()).getDayOfMonth();

    LocalDate convertedDate = LocalDate.of(year, month, day);
    assertEquals(LocalDate.of(2022, 3, 28), convertedDate);
}
```

在这个测试方法中，我们调用temporalAccessor.query(TemporalQueries.localDate())方法以获得从temporalAccessor中提取的日期的LocalDate实例。

然后，我们分别使用getYear()、getMonthValue()和getDayOfMonth()方法从这个LocalDate实例中检索年、月和日组件。随后，我们使用这些提取的组件和LocalDate.of()方法构建一个LocalDate对象convertedDate。

## 4. 结论

总之，在Java中将TemporalAccessor转换为LocalDate可以使用LocalDate.from()或TemporalQueries。除此之外，这些方法提供了灵活高效的方式来执行转换，使得日期时间功能在Java应用程序中的集成变得无缝。

像往常一样，随附的源代码可以在GitHub上找到。

文章发布后30天内开放评论。对于超过此日期的任何问题，请使用网站上的联系表单。