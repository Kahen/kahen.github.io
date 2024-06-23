---
date: 2024-06-24
category:
  - Java
  - 编程
tag:
  - Java
  - 文件名
  - 当前时间
head:
  - - meta
    - name: keywords
      content: Java, 文件名, 当前时间, 教程
---
# 使用Java中的当前时间作为文件名

在本教程中，我们将探讨Java中获取当前时间戳值的几种方法，并将其用作文件名。为了实现我们的目标，我们将利用Java DateTime API中的几个类以及第三方库如Joda-Time。

## 2. 初始设置

在后续部分，我们将构建几个测试用例，展示每种获取当前时间戳并将其用作文件名的方法。

然而，为了将时间戳值转换为指定的字符串格式，我们首先需要指定时间戳格式，然后使用它来定义格式化器类：

```java
static final String TIMESTAMP_FORMAT = "yyyyMMddHHmmss";
static final DateTimeFormatter DATETIME_FORMATTER = DateTimeFormatter.ofPattern(TIMESTAMP_FORMAT);
static final SimpleDateFormat SIMPLEDATE_FORMAT = new SimpleDateFormat(TIMESTAMP_FORMAT);
```

接下来，我们将编写一个方法，将当前时间值转换为有效的文件名。这个方法的示例输出将看起来像“_20231209122307.txt_”：

```java
String getFileName(String currentTime) {
    return MessageFormat.format("{0}.txt", currentTime);
}
```

由于我们正在编写测试用例，我们将创建另一个方法来检查输出的文件名是否包含具有正确格式的时间戳：

```java
boolean verifyFileName(String fileName) {
    return Pattern
      .compile("[0-9]{14}+\\.txt", Pattern.CASE_INSENSITIVE)
      .matcher(fileName)
      .matches();
}
```

在这种情况下，我们的文件名由表示时间戳的数字组成。**建议确保文件名格式避免使用在文件名中禁止使用的特殊字符**，这些字符因操作系统而异。

## 3. 使用Java DateTime API获取当前时间

Java提供了诸如_Calendar_和_Date_之类的旧版类来处理日期和时间信息。然而，由于设计缺陷，在Java 8中引入了新的类。**_Date_、_Calendar_和_SimpleDateFormatter_类是可变的，并且不是线程安全的。**

我们将首先查看_Calendar_和_Date_等旧版类来生成时间，并基本了解，然后是Java 8 DateTime API类，如_Instant, LocalDateTime, ZonedDateTime_和_OffsetDateTime_。

**对于较新的Java程序，建议使用Java 8 DateTime API类而不是旧版Java日期和时间类。**

### 3.1. 使用_Calendar_

最基础的方法是使用_Calendar.getInstance()_方法，它使用默认时区和区域设置返回一个_Calendar_实例。此外，_getTime()_方法为我们提供了毫秒时间值：

```java
@Test
public void whenUsingCalender_thenGetCurrentTime() {
    String currentTime = SIMPLEDATE_FORMAT.format(Calendar.getInstance().getTime());
    String fileName = getFileName(currentTime);

    assertTrue(verifyFileName(fileName));
}
```

_SimpleDateFormatter_类可以将时间值转换为适当的时间戳格式。

### 3.2. 使用_Date_

类似地，我们可以构造一个_Date_类的对象，该对象以毫秒为单位表示对象的创建时间。_SimpleDateFormatter_将毫秒时间值转换为所需的字符串模式：

```java
@Test
public void whenUsingDate_thenGetCurrentTime() {
    String currentTime = SIMPLEDATE_FORMAT.format(new Date());
    String fileName = getFileName(currentTime);

    assertTrue(verifyFileName(fileName));
}
```

**建议使用我们将在下一节中看到的新的Java 8类。**

### 3.3. 使用_Instant_

在Java中，_Instant_类表示UTC时间线上的单一时刻：

```java
@Test
public void whenUsingInstant_thenGetCurrentTime() {
    String currentTime = Instant
      .now()
      .truncatedTo(ChronoUnit.SECONDS)
      .toString()
      .replaceAll("[:TZ-]", "");
    String fileName = getFileName(currentTime);

    assertTrue(verifyFileName(fileName));
}
```

_Instant.now()_方法要求系统时钟提供当前瞬间。我们可以使用_truncatedTo()_方法将值四舍五入到最接近的秒。然后可以将秒值转换为字符串，以替换时间戳中的任何不需要的时区信息。

### 3.4. 使用_LocalDateTime_

_LocalDateTime_表示ISO-8601日历系统中没有时区的日期和一天中的时间：

```java
@Test
public void whenUsingLocalDateTime_thenGetCurrentTime() {
    String currentTime = LocalDateTime.now().format(DATETIME_FORMATTER);
    String fileName = getFileName(currentTime);

    assertTrue(verifyFileName(fileName));
}
```

_LocalDateTime.now()_方法查询默认系统时钟以提供日期时间信息。然后我们可以传递一个_DateTimeFormatter_将时间戳格式化为字符串。

### 3.5. 使用_ZonedDateTime_

_ZonedDateTime_是一个不可变的日期时间表示，带有时区：

```java
@Test
public void whenUsingZonedDateTime_thenGetCurrentTime() {
    String currentTime = ZonedDateTime
      .now(ZoneId.of("Europe/Paris"))
      .format(DATETIME_FORMATTER);
    String fileName = getFileName(currentTime);

    assertTrue(verifyFileName(fileName));
}
```

**时区标识符能够唯一地识别地球上特定的地理位置，例如“_Europe/Paris_”。**使用这个标识，我们可以获取_ZoneId_，它决定了将Instant转换为_LocalDateTime_时使用的时区。

**_ZonedDateTime_自动处理一年中夏令时(DST)的调整。**

### 3.6. 使用_OffsetDateTime_

_OffsetDateTime_是_ZonedDateTime_的简化版本，它忽略了时区。世界各地的时区偏移量不同。例如，“_+2:00_”表示比UTC晚两个小时的时区。我们可以使用_Offset_中的偏移值来改变UTC的默认时间：

```java
@Test
public void whenUsingOffsetDateTime_thenGetCurrentTime() {
    String currentTime = OffsetDateTime
      .of(LocalDateTime.now(), ZoneOffset.of("+02:00"))
      .format(DATETIME_FORMATTER);
    String fileName = getFileName(currentTime);

    assertTrue(verifyFileName(fileName));
}
```

_ZonedDateTime_和_OffsetDateTime_都存储了时间线上的一个瞬间，精度高达纳秒。了解它们之间的区别有助于我们在它们之间做出选择。

## 4. 使用Joda-Time获取当前时间

Joda-Time是一个著名的日期和时间处理库。它是开发者中最流行的库之一，作为麻烦的旧版Java类的替代品。**它使用不可变类处理日期和时间值。**

让我们在_pom.xml_中添加Joda-Time Maven依赖项：

```xml
`<dependency>`
    `<groupId>`joda-time`</groupId>`
    `<artifactId>`joda-time`</artifactId>`
    `<version>`2.12.5`</version>`
`</dependency>`
```

### 4.1. 使用Joda _DateTime_

_DateTime.now()_方法获取一个设置为当前系统毫秒时间的_DateTime_，使用默认时区。然后我们可以将其转换为具有定义的时间戳格式的_String_：

```java
@Test
public void whenUsingJodaTime_thenGetCurrentTime() {
    String currentTime = DateTime.now().toString(TIMESTAMP_FORMAT);
    String fileName = getFileName(currentTime);

    assertTrue(verifyFileName(fileName));
}
```

### 4.2. 使用Joda _Instant_

Joda-Time库还提供了_Instant_类来捕捉当前时间线的时刻。我们可以使用_DateTimeFormat_将时间戳转换为所需的字符串模式：

```java
@Test
public void whenUsingJodaTimeInstant_thenGetCurrentTime() {
    String currentTime = DateTimeFormat
      .forPattern(TIMESTAMP_FORMAT)
      .print(org.joda.time.Instant.now().toDateTime());
    String fileName = getFileName(currentTime);

    assertTrue(verifyFileName(fileName));
}
```

## 5. 结论

在本文中，我们发现了Java程序中获取当前时间戳的多种方法，并利用它们生成文件名。我们通过使用各种Java DateTime API类和Joda-Time库获取了当前时间戳。

如常，本文的完整代码可以在GitHub上找到。