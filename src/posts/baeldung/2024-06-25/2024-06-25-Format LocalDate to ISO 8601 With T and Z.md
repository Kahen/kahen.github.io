---
date: 2024-06-26
category:
  - Java
  - ISO 8601
tag:
  - LocalDate
  - DateTimeFormatter
head:
  - - meta
    - name: keywords
      content: Java, ISO 8601, LocalDate, DateTimeFormatter, 时间格式化
---
# Java中将LocalDate格式化为带T和Z的ISO 8601格式

处理日期和时间的标准格式对于处理涉及不同时区的应用程序或在系统之间交换数据至关重要。

在本教程中，我们将探讨将_LocalDate_格式化为ISO 8601格式的多种技术。这种格式包括‘_T_’分隔符和表示协调世界时（UTC）的‘_Z_’。

_LocalDate_是Java 8中引入的现代日期和时间API的一部分，位于_java.time_包下。它是不可变的，这意味着一旦创建实例，其值就不能更改。它表示一个不考虑时间或时区的日期，专注于月份、年份和月份中的天。_LocalDate_便于方便地操作和与日期信息交互。

ISO 8601是表示日期和时间的国际标准，格式清晰、明确且被普遍接受。它为表示日期和时间提供了标准化的方法，这对于广泛的应用程序至关重要。这包括数据交换、国际通信和计算机系统。

ISO 8601格式包括几个组成部分，最常见的格式是：_YYYY-MM-DDThh:mm:ss.sssZ_。

以下是组成部分的分解：

- _YYYY_：表示四位数的年份（例如，2023）
- _MM_：表示两位数的月份（例如，3月为03）
- _DD_：表示月份中的天数，两位数（例如，15）
- ‘_T_’：字面量‘_T_’字符，用于分隔日期和时间
- _hh_：表示24小时制的小时（例如，下午2点为14）
- _mm_：表示分钟（例如，30）
- _ss_：表示秒（例如，45）
- _sss_：表示毫秒（可选，长度可能不同）
- ‘_Z_’：字面量‘_Z_’字符，表示时间是协调世界时（UTC）

ISO 8601允许各种可选组件，使其成为表示日期和时间信息的多功能标准。例如，我们可以包括时区偏移或在它们不相关时省略秒和毫秒。

‘_Z_’字符表示时间是UTC，但我们也通过指定与UTC的偏移来表示本地时区的时间。

## 3. 使用Java 8时间API

Java提供了一种灵活的方式来格式化日期和时间对象，包括使用_DateTimeFormatter_类的_LocalDate_。

_DateTimeFormatter_的实例是线程安全的，使它们适合在多线程环境中使用，无需外部同步。

以下是我们如何使用它将_LocalDate_格式化为ISO 8601的示例：

```java
class LocalDateToISO {
    String formatUsingDateTimeFormatter(LocalDate localDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");
        String formattedDate = localDate.atStartOfDay().atOffset(ZoneOffset.UTC).format(formatter);
        return formattedDate;
    }
}
```

在这个例子中，我们创建了一个带有自定义模式的_DateTimeFormatter_，其中包括了期望位置的‘_T_’和‘Z’。然后，我们使用_format()_方法将_LocalDate_格式化为具有指定格式的字符串。

我们可以执行一个测试来验证其预期行为：

```java
@Test
void givenLocalDate_whenUsingDateTimeFormatter_thenISOFormat(){
    LocalDateToISO localDateToISO = new LocalDateToISO();
    LocalDate localDate = LocalDate.of(2023, 11, 6);

    String expected = "2023-11-06T00:00:00.000Z";
    String actual = localDateToISO.formatUsingDateTimeFormatter(localDate);
    assertEquals(expected, actual);
}
```

## 4. 使用_SimpleDateFormat_

_SimpleDateFormat_类是一个用于格式化和解析日期的强大工具。它属于_java.text_包，提供了一种将日期在文本表示和Date对象之间转换的简单方法。

它特别适用于处理旧版日期时间类型，如_java.util.Date_。虽然它不像_java.time_ API那样现代或健壮，但它仍然可以为这个目的服务：

```java
String formatUsingSimpleDateFormat(LocalDate date) {
    Date utilDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX");
    String formattedDate = dateFormat.format(utilDate);
    return formattedDate;
}
```

在上面的例子中，我们将_LocalDate_转换为带有_ZoneOffset.UTC_的_ZonedDateTime_，然后将其转换为_Instant_对象。然后我们可以从_Instant_获取一个_Date_对象并对该对象进行格式化。

让我们使用_SimpleDateFormat_格式化一个_LocalDate_对象：

```java
@Test
void givenLocalDate_whenUsingSimpleDateFormat_thenISOFormat(){
    LocalDateToISO localDateToISO = new LocalDateToISO();
    LocalDate localDate = LocalDate.of(2023, 11, 6);

    String expected = "2023-11-06T00:00:00.000Z";
    String actual = localDateToISO.formatUsingSimpleDateFormat(localDate);
    assertEquals(expected, actual);
}
```

**必须意识到_SimpleDateFormat_不是线程安全的。** 多个线程的并发使用可能导致意外的结果或异常。为了解决这个问题，开发人员通常使用_ThreadLocal_确保每个线程都拥有其专用的_SimpleDateFormat_实例。这有助于有效防止潜在的线程安全问题。

## 5. 使用Apache Commons Lang3

Apache Commons Lang3库提供了一个名为_FastDateFormat_的实用类，简化了日期格式化。它是一个快速且线程安全的_SimpleDateFormat_版本。我们可以在大多数格式化和解析场景中直接用这个类替换_SimpleDateFormat_。它在多线程服务器环境中特别有用。

这种方法通过使用Apache Commons Lang 3的功能来强调简洁性，创建清晰且易于理解的Java日期格式化代码。

我们可以通过在中央Maven仓库中包含以下依赖项轻松获得该库：

```xml
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.14.0``</version>``
``</dependency>``
```

安装库后，我们可以使用它的方法。以下示例说明了如何使用它：

```java
String formatUsingApacheCommonsLang(LocalDate localDate) {
    Date date = Date.from(localDate.atStartOfDay().toInstant(ZoneOffset.UTC));
    String formattedDate = FastDateFormat.getInstance("yyyy-MM-dd'T'HH:mm:ss.sss'Z'", TimeZone.getTimeZone("UTC"))
      .format(date);
    return formattedDate;
}
```

上述代码示例采用_LocalDate_，将其转换为_Date_，然后使用_FastDateFormat_使用特定模式将其格式化为字符串，将_LocalDate_格式化为ISO 8601。

让我们继续测试这个示例：

```java
@Test
void givenLocalDate_whenUsingApacheCommonsLang_thenISOFormat() {
    LocalDateToISO localDateToISO = new LocalDateToISO();
    LocalDate localDate = LocalDate.of(2023, 11, 6);

    String expected = "2023-11-06T00:00:00.000Z";
    String actual = localDateToISO.formatUsingApacheCommonsLang(localDate);
    assertEquals(expected, actual);
}
```

## 6. 使用Joda-Time

**Joda-Time是一个广泛使用的Java库，旨在解决_java.util包_中原日期和时间类的不足。** 在Java 8中_java.time_ API出现之前，Joda-Time是处理日期和时间操作的流行且功能强大的替代品。

要合并Joda-Time库的功能，我们应该在_pom.xml_中包含以下依赖项：

```xml
``<dependency>``
    ``<groupId>``joda-time``</groupId>``
    ``<artifactId>``joda-time``</artifactId>``
    ``<version>``2.12.5``</version>``
``</dependency>``
```

虽然在Java 8及更高版本中不再必要，但对于旧版代码库，它仍然是一个选项：

```java
String formatUsingJodaTime(org.joda.time.LocalDate localDate) {
    org.joda.time.format.DateTimeFormatter formatter = ISODateTimeFormat.dateTime();
    return formatter.print(localDate.toDateTimeAtStartOfDay(DateTimeZone.UTC));
}
```

在上面的例子中，使用了_Joda-Time_的_DateTimeFormatter_将_LocalDate_格式化为ISO 8601。

让我们测试一下：

```java
@Test
void givenLocalDate_whenUsingJodaTime_thenISOFormat() {
    LocalDateToISO localDateToISO = new LocalDateToISO();
    org.joda.time.LocalDate localDate = new org.joda.time.LocalDate(2023, 11, 6);

    String expected = "2023-11-06T00:00:00.000Z";
    String actual = localDateToISO.formatUsingJodaTime(localDate);
    assertEquals(expected, actual);
}
```

## 7. 结论

在本文中，我们讨论了在Java中将_LocalDate_格式化为带‘_T_’和‘_Z_’的ISO 8601的不同方法。选择方法取决于我们对代码可读性和可维护性的偏好。

我们可以选择最适合我们需要的方法，并确保我们的日期