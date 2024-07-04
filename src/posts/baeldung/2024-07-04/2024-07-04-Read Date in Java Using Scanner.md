---
date: 2022-04-01
category:
  - Java
  - Scanner
tag:
  - Java
  - Scanner
  - LocalDate
  - DateFormat
head:
  - - meta
    - name: keywords
      content: Java, Scanner, LocalDate, DateFormat, Date Parsing
------
# Java中使用Scanner读取日期

## 1. 概述

在本快速教程中，我们将学习如何从Scanner读取日期。我们将假设日期格式为yyyy-MM-dd，并且日期是Scanner的唯一内容。

## 2. 将输入解析为LocalDate

Scanner API提供了一个简单的文本扫描器。由于我们的Scanner有一个独特元素，我们将使用next()方法来获取它。否则，我们可能需要先做一些初步工作来解析它。

此外，Java 8引入了一个全新的日期/时间API。**让我们创建一个DateTimeFormatter，并用给定的格式解析结果LocalDate：**

```java
LocalDate scanToLocalDate(String input) {
    try (Scanner scanner = new Scanner(input)) {
        String dateString = scanner.next();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(dateString, formatter);
    }
}
```

Scanner类实现了AutoCloseable接口，所以我们可以使用try-with-resources来创建我们的Scanner。这个代码块负责自动关闭Scanner资源。

总之，我们可以检查我们的代码是否返回了与直接解析输入相同的LocalDate。假设我们的类名为DateScanner：

```java
@Test
void whenScanToLocalDate_ThenCorrectLocalDate() {
    String dateString = "2018-09-09";
    assertEquals(LocalDate.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd")), new DateScanner().scanToLocalDate(dateString));
}
```

## 3. 将输入解析为Date

使用Java 8之前的版本，我们可以使用原始的Date API。主要的区别是**我们现在需要创建一个DateFormat来解析我们的Date：**

```java
Date scanToDate(String input) throws ParseException {
    try (Scanner scanner = new Scanner(input)) {
        String dateString = scanner.next();
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.parse(dateString);
    }
}
```

同样，我们可以测试方法输出的一致性：

```java
@Test
void whenScanToDate_ThenCorrectDate() throws ParseException {
    String dateString = "2018-09-09";
    assertEquals(new SimpleDateFormat("yyyy-MM-dd").parse(dateString), new DateScanner().scanToDate(dateString));
}
```

另外，让我们指出try-with-resources是在Java 7中引入的。在之前的版本中，我们需要手动关闭Scanner资源。

## 4. 结论

在本文中，我们将Scanner输入解析为LocalDate。然后，我们看到了使用Java早期Date API的等效代码。

如往常一样，代码可在GitHub上找到。