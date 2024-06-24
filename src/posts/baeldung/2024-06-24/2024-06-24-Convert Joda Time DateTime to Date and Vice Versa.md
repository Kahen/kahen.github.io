---
date: 2024-06-24
category:
  - Java
  - Joda-Time
tag:
  - Joda-Time
  - DateTime
  - Date
head:
  - - meta
    - name: keywords
      content: Joda-Time, DateTime, Date, Java日期时间转换
---
# Joda-Time DateTime 与 Java Date 互转

## 1. 引言

Joda-Time 是一个非常流行的 Java 日期和时间操作库。它提供了比标准 _DateTime_ 类通常提供的更直观、更灵活的 API。

### 在本教程中，我们将探讨如何将 Joda-Time _DateTime_ 对象转换为标准的 Java _Date_ 对象，反之亦然。

## 2. 设置 Joda-Time

首先，我们应该确保我们的项目包含了 _joda-time_ 库：

```xml
`<dependency>`
    `<groupId>`joda-time`</groupId>`
    `<artifactId>`joda-time`</artifactId>`
    `<version>`2.12.6`</version>`
`</dependency>`
```

或者，我们可以下载 jar 文件并将其放入我们的 _classpath_。

要将 Joda-Time _DateTime_ 对象转换为标准 Java _Date_，我们使用名为 _toDate()_ 的方法。以下是一个简单的例子：

```java
@Test
public void givenJodaDateTime_whenConvertingToJavaDate_thenConversionIsCorrect() {
    DateTime jodaDateTime = new DateTime();
    java.util.Date javaDate = jodaDateTime.toDate();
    assertEquals(jodaDateTime.getMillis(), javaDate.getTime());
}
```

在这个测试方法中，我们创建了一个名为 _jodaDateTime_ 的 Joda-Time _DateTime_ 的新实例。随后，我们调用了这个 _Joda_ _DateTime_ 实例上的 _toDate()_ 方法以获得相应的 _java.util.Date_ 对象。

测试使用 _assertEquals_ 方法执行，该方法断言从原始 Joda _DateTime_ 对象中检索的毫秒时间等于通过 _java.util.Date_ 创建的新 _DateTime_ 对象中的时间。

## 4. 将 Java _Date_ 转换为 Joda-Time _DateTime_

将一个普通的 Java _Date_ 对象转换为 Joda-Time _DateTime_ 也很简单。我们可以使用为 _java.util.Date_ 参数设计的 _DateTime_ 构造函数如下：

```java
@Test
public void givenJavaDate_whenConvertingToJodaDateTime_thenConversionIsCorrect() {
    java.util.Date javaDate = new java.util.Date();
    DateTime jodaDateTime = new DateTime(javaDate);
    assertEquals(javaDate.getTime(), jodaDateTime.getMillis());
}
```

在上述测试方法中，我们积极地实例化了一个新的 _java.util.Date_ 对象，代表当前的日期和时间。随后，我们使用提供的 Java _Date_ 创建了相应的 Joda _DateTime_ 对象。实际的验证发生在使用 _assertEquals_ 方法时，我们验证从原始 _java.util.Date_ 对象中检索的毫秒时间等于由 _Joda DateTime_ 对象表示的时间。

## 5. 结论

总之，在使用 Java 处理日期和时间时的一个常见操作是将 Joda-Time _DateTime_ 对象和标准 Java _Date_ 之间进行转换。

现在我们已经经历了上述示例，我们应该能够很容易地在我们的项目中实现 Joda-Time 并轻松地转换这两种类型。

如常，相关的源代码可以在 GitHub 上找到。