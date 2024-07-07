---
date: 2022-04-01
category:
  - Java
  - 日期时间
tag:
  - Java日期解析
  - SimpleDateFormat
  - DateTimeFormatterBuilder
  - Apache Commons DateUtils
  - Joda Time
head:
  - - meta
    - name: keywords
      content: Java日期解析, SimpleDateFormat, DateTimeFormatterBuilder, Apache Commons DateUtils, Joda Time
---
# 解析具有不同格式的日期字符串

有时候，我们需要解析可能以多种不同格式提供的日期字符串，如‘yyyy/MM/dd’、‘yyyy-MM-dd’或‘dd-MM-yyyy’。在本教程中，我们将展示一些解析不同日期模式的选项。首先，我们将尝试使用标准的Java库：_SimpleDateFormat_ 和 _DateTimeFormatterBuilder_ 来解决解析问题。然后，我们将检查第三方库Apache Commons _DateUtils_ 和 Joda Time。

## 2. 使用 _SimpleDateFormat_
首先，我们使用Java的 _SimpleDateFormat_ 来解析具有多种格式的日期。一开始，我们定义一个可能的日期格式列表，并循环遍历它们，直到找到一个与我们的_String_ 匹配的格式。当匹配时，我们返回一个 _java.util.Date_。否则，我们返回 _null_：

```java
public static Date parseDate(String dateString, List``<String>`` formatStrings) {
    for (String formatString : formatStrings) {
        try {
            return new SimpleDateFormat(formatString).parse(dateString);
        } catch (ParseException e) {
        }
    }
    return null;
}
```

这种方法有其自身的优缺点。优点是不需要外部库，实现简单直接。

然而，我们需要提前知道所有可能的匹配日期格式。此外，没有日期验证。**我们可以解析按照匹配模式格式化的日期，但这些日期仍然是无效的**。例如，如果我们解析‘2022-40-40’，_SimpleDateFormater_ 将返回‘2025-05-10’。

让我们看一个示例，显示解析这个无效日期返回了意想不到的结果：

```java
@Test
public void whenInvalidInput_thenGettingUnexpectedResult() {
    SimpleParseDate simpleParseDate = new SimpleParseDate();
    String date = "2022-40-40";
    assertEquals(
        "Sat May 10 00:00:00 EEST 2025",
        simpleParseDate.parseDate(date, Arrays.asList("MM/dd/yyyy", "dd.MM.yyyy", "yyyy-MM-dd"))
    );
}
```

## 3. 使用 _DateTimeFormatterBuilder_
_SimpleDateFormat_ 是Java的原始实现，并且 _java.util.Date_ 有许多已弃用的方法，所以**更好的选择是使用 _DateTimeFormatterBuilder_**。与 _SimpleDateFormatter_ 不同，_DateTimeFormatterBuilder_ 可以接受多个日期模式，并使用它们尝试解析给定的日期。如果有模式匹配，它将返回解析的日期，否则，它将抛出 _DateTimeParseException_：

```java
public static LocalDate parseDate(String date) {
    DateTimeFormatterBuilder dateTimeFormatterBuilder = new DateTimeFormatterBuilder()
        .append(DateTimeFormatter.ofPattern("[MM/dd/yyyy]" + "[dd-MM-yyyy]" + "[yyyy-MM-dd]"));
    DateTimeFormatter dateTimeFormatter = dateTimeFormatterBuilder.toFormatter();
    return LocalDate.parse(date, dateTimeFormatter);
}
```

让我们使用这个格式化器来解析一些日期：

```java
@Test
public void whenInvalidDate_thenAssertThrows() {
    assertEquals(
        java.time.LocalDate.parse("2022-12-04"),
        simpleDateTimeFormater.parseDate("2022-12-04")
    );
    assertThrows(DateTimeParseException.class, () -> simpleDateTimeFormater.parseDate("2022-13-04"));
}
```

## 4. Apache Commons _DateUtils_
另一个选择是使用Apache Commons库，它提供了一个 _DateUtils_ 助手。首先，我们需要包含Apache Commons Lang依赖：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

_DateUtils_ 工作方式类似于 _DateTimeFormatterBuilder_。我们可以给它提供几个日期格式，如果其中一个格式与要解析的字符串匹配，它将解析日期：

```java
DateUtils.parseDateStrictly("2022-12-29",new String[]{"yyyy/MM/dd", "dd/MM/yyyy", "yyyy-MM-dd"});
```

让我们使用 _DateUtils_ 来解析无效和有效的日期：

```java
@Test
public void whenDateIsCorrect_thenParseCorrect() {
    SimpleDateUtils simpleDateUtils = new SimpleDateUtils();
    assertNull(simpleDateUtils.parseDate("53/10/2014"));
    assertEquals("Wed Sep 10 00:00:00 UTC 2014", simpleDateUtils.parseDate("10/09/2014").toString());
}
```

## 5. Joda Time
另一个第三方选择是使用Joda Time库。值得知道的是，Joda Time在Java SE 8之前是Java事实上的标准日期和时间库。首先，我们需要包含它的依赖：

```xml
``<dependency>``
    ``<groupId>``joda-time``</groupId>``
    ``<artifactId>``joda-time``</artifactId>``
    ``<version>``2.12.5``</version>``
``</dependency>``
```

让我们为 _DateTimeFormat_ 定义可用的模式：

```java
public static LocalDate parseDate(String date) {
    List``<String>`` patternList = Arrays.asList("MM/dd/yyyy", "dd.MM.yyyy", "yyyy-MM-dd");
    for (String pattern : patternList) {
        try {
            return DateTimeFormat.forPattern(pattern).parseLocalDate(date);
        } catch (IllegalFieldValueException e) {
        }
    }
    return null;
}
```

让我们写一个使用Joda Time解析一些日期的测试：

```java
@Test
public void whenDateIsCorrect_thenResultCorrect() {
    SimpleDateTimeFormat simpleDateUtils = new SimpleDateTimeFormat();
    assertNull(simpleDateUtils.parseDate("53/10/2014"));
    assertEquals(LocalDate.parse("2014-10-10"), simpleDateUtils.parseDate("2014-10-10"));
}
```

## 6. 结论
在本文中，我们学习了使用标准Java库解析具有多种格式的日期的选项。此外，我们还使用第三方库：Apache Commons Lang和Joda Time解决了日期解析问题。

如常，你可以在GitHub上找到这些示例。