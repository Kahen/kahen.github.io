---
date: 2024-07-20
category:
  - Java
  - 日期时间
tag:
  - Instant
  - String
  - DateTimeFormatter
  - Joda-Time
head:
  - - meta
    - name: keywords
      content: Java, Instant, String, DateTimeFormatter, Joda-Time
---
# Java中将Instant格式化为String的方法

在本教程中，我们将学习**如何在Java中将一个瞬间（Instant）格式化为字符串（String）**。

首先，我们将从一些关于Java中瞬间是什么的背景知识开始。然后，我们将演示如何使用Java核心库和第三方库，例如Joda-Time，来回答我们的中心问题。

### 2.1 使用DateTimeFormatter类
通常来说，我们需要一个格式化器来格式化一个Instant对象。幸运的是，Java 8引入了DateTimeFormatter类来统一格式化日期和时间。

简单来说，DateTimeFormatter提供了format()方法来完成这项工作。

基本上，**DateTimeFormatter需要一个时区来格式化一个瞬间**。如果没有指定时区，它将无法将瞬间转换为人类可读的日期/时间字段。

例如，假设我们想使用dd.MM.yyyy格式来显示我们的Instant实例：

```java
public class FormatInstantUnitTest {
    private static final String PATTERN_FORMAT = "dd.MM.yyyy";

    @Test
    public void givenInstant_whenUsingDateTimeFormatter_thenFormat() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(PATTERN_FORMAT)
            .withZone(ZoneId.systemDefault());

        Instant instant = Instant.parse("2022-02-15T18:35:24.00Z");
        String formattedInstant = formatter.format(instant);

        assertThat(formattedInstant).isEqualTo("15.02.2022");
    }
    ...
}
```

如上所示，我们可以使用withZone()方法来指定时区。

请注意，**未指定时区将导致UnsupportedTemporalTypeException异常**：

```java
@Test(expected = UnsupportedTemporalTypeException.class)
public void givenInstant_whenNotSpecifyingTimeZone_thenThrowException() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern(PATTERN_FORMAT);

    Instant instant = Instant.now();
    formatter.format(instant);
}
```

### 2.2 使用toString()方法
另一种解决方案是使用toString()方法来获取Instant对象的字符串表示。

让我们通过一个测试用例来示例toString()方法的使用：

```java
@Test
public void givenInstant_whenUsingToString_thenFormat() {
    Instant instant = Instant.ofEpochMilli(1641828224000L);
    String formattedInstant = instant.toString();

    assertThat(formattedInstant).isEqualTo("2022-01-10T15:23:44Z");
}
```

这种方法的局限性是，**我们不能使用自定义的、人类友好的格式来显示瞬间**。

### 3. Joda-Time库
或者，我们可以使用Joda-Time API来实现相同的目标。这个库提供了一套现成的类和接口，用于在Java中操作日期和时间。

在这些类中，我们将找到DateTimeFormat类。顾名思义，**这个类可以用来将日期/时间数据格式化或解析为字符串**。

让我们说明如何使用DateTimeFormatter将瞬间转换为字符串：

```java
@Test
public void givenInstant_whenUsingJodaTime_thenFormat() {
    org.joda.time.Instant instant = new org.joda.time.Instant("2022-03-20T10:11:12");

    String formattedInstant = DateTimeFormat.forPattern(PATTERN_FORMAT)
        .print(instant);

    assertThat(formattedInstant).isEqualTo("20.03.2022");
}
```

如我们所见，DateTimeFormatter提供了forPattern()来指定格式化模式，以及print()来格式化Instant对象。

### 4. 结论
在本文中，我们深入覆盖了如何在Java中将瞬间格式化为字符串。

我们探索了使用Java核心方法实现此目的的几种方式。然后我们解释了如何使用Joda-Time库来完成同样的事情。

一如既往，本文中使用的代码可以在GitHub上找到。