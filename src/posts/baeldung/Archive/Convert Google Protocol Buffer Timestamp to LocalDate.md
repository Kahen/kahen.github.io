---
date: 2024-06-19
category:
  - Java
  - Google Protocol Buffer
tag:
  - LocalDate
  - Timestamp
  - Java
head:
  - - meta
    - name: keywords
      content: Java, Protocol Buffer, Timestamp, LocalDate, 转换
---

# 将 Google 协议缓冲区时间戳转换为 LocalDate | Baeldung

## 1. 概述

协议缓冲区（protobuf）数据格式帮助我们在网络上传输结构化数据。它独立于任何编程语言，并且大多数编程语言都有实现，包括Java。

**protobuf _Timestamp_ 类型表示一个时间点，独立于任何特定时区**。时间在计算中是一个关键组成部分，我们可能需要将 protobuf _Timestamp_ 转换为 Java 时间实例，例如 _LocalDate_，以便将其无缝集成到现有的 Java 代码库中。

在本教程中，我们将探讨将 protobuf 时间戳实例转换为 _LocalDate_ 类型的过程，使我们能够在 Java 应用程序中更有效地使用 protobuf 数据。

## 2. Maven 依赖

要创建 _Timestamp_ 实例或使用从 _.proto_ 文件生成的代码，我们需要将 _protobuf-java_ 依赖项添加到 _pom.xml_：

```
`<dependency>`
    `<groupId>`com.google.protobuf`</groupId>`
    `<artifactId>`protobuf-java`</artifactId>`
    `<version>`4.26.1`</version>`
`</dependency>`
```

该依赖项提供了 _Timestamp_ 类和其他 protobuf 相关类。

## 3. _Timestamp_ 类

protobuf _Timestamp_ 类表示自 Unix 纪元以来的时间点。时区或本地日历不影响它。

**它表示为某个时间点的秒数和纳秒数**。让我们通过使用 Java _Instant_ 对象来计算当前 _Timestamp_ 的示例：

```
Instant currentTimestamp = Instant.now();

Timestamp timestamp = Timestamp.newBuilder()
  .setSeconds(currentTimestamp.getEpochSecond())
  .setNanos(currentTimestamp.getNano())
  .build();
```

在上面的代码中，我们从 _Instant_ 对象计算 _Timestamp_。首先，我们创建一个表示给定点的日期和时间的 _Instant_ 对象。接下来，我们提取秒数和纳秒数，并将它们传递给 _Timestamp_ 实例。

**在将 _Timestamp_ 转换为 _LocalDate_ 时，考虑时区及其与 UTC 的相关偏移以准确表示本地日期至关重要**。让我们通过创建具有特定秒数和纳秒数的 _Timestamp_ 实例来开始转换 _Timestamp_ 到 _LocalDate_：

```
Timestamp ts = Timestamp.newBuilder()
  .setSeconds(1000000)
  .setNanos(77886600)
  .build();
```

由于 _Instant_ 类是表示时间点的最适当表示，让我们创建一个方法，它接受 _Timestamp_ 作为参数并将其转换为 _LocalDate_：

```
LocalDate convertToLocalDate(Timestamp timestamp) {
    Instant instant = Instant.ofEpochSecond(timestamp.getSeconds(), timestamp.getNanos());
    LocalDate time = instant.atZone(ZoneId.of("America/Montreal")).toLocalDate();
    return time;
}
```

在上面的代码中，我们使用 _ofEpochSecond()_ 方法从 _Timestamp_ 创建 _Instant_ 对象，该方法以 _Timestamp_ 的秒数和纳秒数作为参数。

**然后，我们使用 _atZone()_ 方法将 _Instant_ 对象转换为 _LocalDate_，这允许我们指定时区**。这很重要，因为它确保得到的 LocalDate 反映了时区偏移。

值得注意的是，我们也可以使用我们的默认系统时区：

```
LocalDate time = instant.atZone(ZoneId.systemDefault()).toLocalDate();
```

让我们编写一个单元测试来断言逻辑：

```
@Test
void givenTimestamp_whenConvertedToLocalDate_thenSuccess() {
    Timestamp timestamp = Timestamp.newBuilder()
      .setSeconds(1000000000)
      .setNanos(778866000)
      .build();
    LocalDate time = TimestampToLocalDate.convertToLocalDate(timestamp);
    assertEquals(LocalDate.of(2001, 9, 9), time);
}
```

在上面的代码中，我们断言转换得到的 _LocalDate_ 与预期结果匹配。

## 5. 结论

在本教程中，我们学习了如何通过将 _Timestamp_ 转换为 _Instant_ 来表示一个时间点，然后将 _Instance_ 对象转换为 _LocalDate_ 类型，通过设置时区来处理可能的偏移。

和往常一样，示例的完整源代码可在 GitHub 上获取。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。