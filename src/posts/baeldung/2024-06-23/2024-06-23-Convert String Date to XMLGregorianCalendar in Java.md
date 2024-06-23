---
date: 2024-06-23
category:
  - Java
  - XMLGregorianCalendar
tag:
  - String Date Conversion
  - XML Schema
head:
  - - meta
    - name: keywords
      content: Java, XMLGregorianCalendar, Date Conversion
------
# Java中将字符串日期转换为XMLGregorianCalendar

在本教程中，我们将探讨将字符串日期转换为XMLGregorianCalendar的各种方法。

XML Schema标准为在XML格式中指定日期定义了明确的规则。为了使用这种格式，Java类XMLGregorianCalendar在Java 1.5中引入，代表W3C XML Schema 1.0日期/时间数据类型。

javax.xml.datatype包中的DatatypeFactory类提供了创建各种XML模式内置类型的工厂方法。我们将使用这个类来生成XMLGregorianCalendar的新实例。

### 3.1 使用标准DatatypeFactory

以下是使用DatatypeFactory将日期字符串解析为XMLGregorianCalendar的示例：

```java
XMLGregorianCalendar usingDatatypeFactoryForDate(String dateString) throws DatatypeConfigurationException {
    return DatatypeFactory.newInstance().newXMLGregorianCalendar(dateString);
}
```

在上面的示例中，newXMLGregorianCalendar()方法根据XML模式dateTime数据类型从字符串表示的日期创建XMLGregorianCalendar实例。

让我们通过执行转换来创建XMLGregorianCalendar的实例：

```java
void givenStringDate_whenUsingDatatypeFactory_thenConvertToXMLGregorianCalendar() throws DatatypeConfigurationException {
    String dateAsString = "2014-04-24";
    XMLGregorianCalendar xmlGregorianCalendar = StringDateToXMLGregorianCalendarConverter.usingDatatypeFactoryForDate(dateAsString);
    assertEquals(24, xmlGregorianCalendar.getDay());
    assertEquals(4, xmlGregorianCalendar.getMonth());
    assertEquals(2014, xmlGregorianCalendar.getYear());
}
```

### 3.2 使用LocalDate

LocalDate是一个不可变、线程安全的类。此外，LocalDate只能保存日期值，而没有时间组件。在这种方法中，我们首先将字符串日期转换为LocalDate实例，然后再将其转换为XMLGregorianCalendar：

```java
XMLGregorianCalendar usingLocalDate(String dateAsString) throws DatatypeConfigurationException {
    LocalDate localDate = LocalDate.parse(dateAsString);
    return DatatypeFactory.newInstance().newXMLGregorianCalendar(localDate.toString());
}
```

让我们看看以下的测试代码：

```java
void givenStringDateTime_whenUsingApacheCommonsLang3_thenConvertToXMLGregorianCalendar() throws DatatypeConfigurationException {
    XMLGregorianCalendar xmlGregorianCalendar = StringDateToXMLGregorianCalendarConverter.usingLocalDate(dateAsString);
    assertEquals(24, xmlGregorianCalendar.getDay());
    assertEquals(4, xmlGregorianCalendar.getMonth());
    assertEquals(2014, xmlGregorianCalendar.getYear());
}
```

### 4.1 使用SimpleDateFormat类

将带有时间戳的日期转换为XMLGregorianCalendar的传统方法之一是使用SimpleDateFormat类。让我们从dateTimeAsString创建XMLGregorianCalendar的实例：

```java
XMLGregorianCalendar usingSimpleDateFormat(String dateTimeAsString) throws DatatypeConfigurationException, ParseException {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
    Date date = simpleDateFormat.parse(dateTimeAsString);
    return DatatypeFactory.newInstance().newXMLGregorianCalendar(simpleDateFormat.format(date));
}
```

我们使用SimpleDateFormat解析输入字符串dateTime为Date对象，然后将Date对象重新格式化为字符串，再创建XMLGregorianCalendar实例。

让我们测试这种方法：

```java
void givenStringDateTime_whenUsingSimpleDateFormat_thenConvertToXMLGregorianCalendar() throws DatatypeConfigurationException, ParseException {
    XMLGregorianCalendar xmlGregorianCalendar = StringDateToXMLGregorianCalendarConverter.usingSimpleDateFormat(dateTimeAsString);
    assertEquals(24, xmlGregorianCalendar.getDay());
    assertEquals(4, xmlGregorianCalendar.getMonth());
    assertEquals(2014, xmlGregorianCalendar.getYear());
    assertEquals(15, xmlGregorianCalendar.getHour());
    assertEquals(45, xmlGregorianCalendar.getMinute());
    assertEquals(30, xmlGregorianCalendar.getSecond());
}
```

### 4.2 使用GregorianCalendar类

GregorianCalendar是java.util.Calendar抽象类的具体实现。让我们使用GregorianCalendar类将字符串日期和时间转换为XMLGregorianCalendar：

```java
XMLGregorianCalendar usingGregorianCalendar(String dateTimeAsString) throws DatatypeConfigurationException, ParseException {
    GregorianCalendar calendar = new GregorianCalendar();
    calendar.setTime(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").parse(dateTimeAsString));
    return DatatypeFactory.newInstance().newXMLGregorianCalendar(calendar);
}
```

首先，我们创建GregorianCalendar的实例，并根据解析的Date设置其时间。之后，我们使用DatatypeFactory创建XMLGregorianCalendar实例。让我们测试这种方法：

```java
void givenStringDateTime_whenUsingGregorianCalendar_thenConvertToXMLGregorianCalendar() throws DatatypeConfigurationException, ParseException {
    XMLGregorianCalendar xmlGregorianCalendar = StringDateToXMLGregorianCalendarConverter.usingGregorianCalendar(dateTimeAsString);
    assertEquals(24, xmlGregorianCalendar.getDay());
    assertEquals(4, xmlGregorianCalendar.getMonth());
    assertEquals(2014, xmlGregorianCalendar.getYear());
    assertEquals(15, xmlGregorianCalendar.getHour());
    assertEquals(45, xmlGregorianCalendar.getMinute());
    assertEquals(30, xmlGregorianCalendar.getSecond());
}
```

### 4.3 使用Joda-Time

Joda-Time是Java的一个流行的日期和时间操作库，为标准Java日期和时间API提供了一个更直观的替代接口。

让我们探索如何使用Joda-Time将字符串日期和时间转换为XMLGregorianCalendar：

```java
XMLGregorianCalendar usingJodaTime(String dateTimeAsString) throws DatatypeConfigurationException {
    DateTime dateTime = DateTime.parse(dateTimeAsString, DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss"));
    return DatatypeFactory.newInstance().newXMLGregorianCalendar(dateTime.toGregorianCalendar());
}
```

在这里，我们从提供的dateTimeAsString值实例化了DateTime对象。这个dateTime对象使用toGregorianCalendar()方法转换为GregorianCalendar实例。最后，我们使用DatatypeFactory类的newXMLGregorianCalendar()方法创建了XMLGregorianCalendar实例。

让我们测试这种方法：

```java
void givenStringDateTime_whenUsingJodaTime_thenConvertToXMLGregorianCalendar() throws DatatypeConfigurationException {
    XMLGregorianCalendar xmlGregorianCalendar = StringDateToXMLGregorianCalendarConverter.usingJodaTime(dateTimeAsString);
    assertEquals(24, xmlGregorianCalendar.getDay());
    assertEquals(4, xmlGregorianCalendar.getMonth());
    assertEquals(2014, xmlGregorianCalendar.getYear());
    assertEquals(15, xmlGregorianCalendar.getHour());
    assertEquals(45, xmlGregorianCalendar.getMinute());
    assertEquals(30, xmlGregorianCalendar.getSecond());
}
```

## 5. 结论

在这个快速教程中，我们讨论了将字符串日期转换为XMLGregorianCalendar实例的各种方法。

正如往常一样，本文的完整代码示例可以在GitHub上找到。