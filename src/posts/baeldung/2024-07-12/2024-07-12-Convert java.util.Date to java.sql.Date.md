---
date: 2022-04-01
category:
  - Java
  - JDBC
tag:
  - java.util.Date
  - java.sql.Date
head:
  - - meta
    - name: keywords
      content: Java, JDBC, Date Conversion
---
# java.util.Date 转换为 java.sql.Date

在这篇简短的教程中，我们将探讨几种将 java.util.Date 转换为 java.sql.Date 的策略。

首先，我们将看看标准转换方式，然后，我们将检查一些被认为是最佳实践的替代方法。

这两个日期类用于特定场景，并且是不同 Java 标准包的一部分：

- java.util 包是 JDK 的一部分，包含各种实用类以及日期和时间设施。
- java.sql 包是 JDBC API 的一部分，从 Java 7 开始默认包含在 JDK 中。

java.util.Date 表示一个具体的时间点，精度为毫秒：

```
java.util.Date date = new java.util.Date();
System.out.println(date);
// 2015年3月27日 星期三 08:22:02 IST
```

java.sql.Date 是一个围绕毫秒值的简单包装器，允许 JDBC 驱动程序将其识别为 SQL DATE 值。这个类的值不过是从 Unix 纪元开始计算的特定日期的年、月、日的毫秒值。任何比天更细粒度的时间信息都将被截断：

```
long millis=System.currentTimeMillis();
java.sql.Date date = new java.sql.Date(millis);
System.out.println(date);
// 2015-03-30
```

### 3. 为什么需要转换

虽然 java.util.Date 的使用更为通用，但 java.sql.Date 用于使 Java 应用程序能够与数据库通信。因此，在这些情况下需要转换为 java.sql.Date。

显式引用转换也不行，因为我们处理的是完全不同的类层次结构：**没有可用的向下转换或向上转换**。如果我们尝试将其中一个日期转换为另一个，我们将收到一个 ClassCastException：

```
java.sql.Date date = (java.sql.Date) new java.util.Date() // 不允许
```

### 4. 如何转换为 java.sql.Date

我们将在下面探索几种从 java.util.Date 转换到 java.sql.Date 的策略。

#### 4.1. 标准转换

正如我们上面看到的，java.util.Date 包含时间信息，而 java.sql.Date 不包含。因此，我们通过使用 java.sql.Date 的构造函数方法来实现**有损转换**，该方法以从 Unix 纪元开始的毫秒数作为输入：

```
java.util.Date utilDate = new java.util.Date();
java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
```

实际上，丢失表示值的时间部分**可能导致报告不同的日期**，由于不同的时区：

```
SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
isoFormat.setTimeZone(TimeZone.getTimeZone("America/Los_Angeles"));

java.util.Date date = isoFormat.parse("2010-05-23T22:01:02");
TimeZone.setDefault(TimeZone.getTimeZone("America/Los_Angeles"));
java.sql.Date sqlDate = new java.sql.Date(date.getTime());
System.out.println(sqlDate);
// 这将打印 2010-05-23

TimeZone.setDefault(TimeZone.getTimeZone("Rome"));
sqlDate = new java.sql.Date(date.getTime());
System.out.println(sqlDate);
// 这将打印 2010-05-24
```

由于这个原因，我们可能想要考虑我们在下一子节中将检查的转换替代方案之一。

#### 4.2. 使用 java.sql.Timestamp 而不是 java.sql.Date

要考虑的第一个替代方案是使用 java.sql.Timestamp 类而不是 java.sql.Date。这个类也包含时间信息：

```
java.sql.Timestamp timestamp = new java.sql.Timestamp(date.getTime());
System.out.println(date); //Mon May 24 07:01:02 CEST 2010
System.out.println(timestamp); //2010-05-24 07:01:02.0
```

当然，如果我们查询的数据库列具有 DATE 类型，这个解决方案可能不是正确的。

#### 4.3. 使用 java.time 包中的类

第二个也是最好的替代方案是将这两个类都转换为 java.time 包中提供的新的类。**这种转换的唯一先决条件是使用 JDBC 4.2（或更高版本）**。JDBC 4.2 是在 2014 年 3 月与 Java SE 8 一起发布的。

从 Java 8 开始，不鼓励使用 Java 早期版本提供的日期时间类，而是支持在新的 java.time 包中提供的类。这些增强的类对于所有日期/时间需求都更好，包括通过 JDBC 驱动程序与数据库通信。

如果我们采用这种策略，**java.util.Date 应该转换为 java.time.Instant**：

```
Date date = new java.util.Date();
Instant instant = date.toInstant().atZone(ZoneId.of("Rome"));
```

和 **java.sql.Date 应该转换为 java.time.LocalDate**：

```
java.sql.Date sqlDate = new java.sql.Date(timeInMillis);
java.time.LocalDate localDate = sqlDate.toLocalDate();
```

java.time.Instant 类可以用来映射 SQL DATETIME 列，java.time.LocalDate 可以用来映射 SQL DATE 列。

现在，让我们举一个例子，生成一个带有时区信息的 java.util.Date：

```
SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
isoFormat.setTimeZone(TimeZone.getTimeZone("America/Los_Angeles"));
Date date = isoFormat.parse("2010-05-23T22:01:02");
```

接下来，让我们从 java.util.Date 生成一个 LocalDate：

```
TimeZone.setDefault(TimeZone.getTimeZone("America/Los_Angeles"));
java.time.LocalDate localDate = date.toInstant().atZone(ZoneId.of("America/Los_Angeles")).toLocalDate();
Asserts.assertEqual("2010-05-23", localDate.toString());
```

如果我们然后尝试切换默认时区，LocalDate 将保持相同的值：

```
TimeZone.setDefault(TimeZone.getTimeZone("Rome"));
localDate = date.toInstant().atZone(ZoneId.of("America/Los_Angeles")).toLocalDate();
Asserts.assertEqual("2010-05-23", localDate.toString());
```

由于我们在转换期间明确指定了时区，因此这是预期的工作方式。

## 5. 关于“转换” java.sql.Date 到 java.util.Date 的一句话

我们已经学会了如何将标准的 java.util.Date 转换为 java.sql 包中提供的类型。有时，我们只有 java.sql.Date 或 java.sql.Timestamp 实例，但我们想将其转换为 java.util.Date。

实际上，我们不需要将 java.sql.Date 转换为 java.util.Date。这是因为，**java.sql.Date 和 java.sql.Timestamp 都是 java.util.Date 的子类**。因此，**java.sql.Date 或 java.sql.Timestamp 就是一个 java.util.Date**。

接下来，让我们在测试中验证这一点：

```
java.util.Date date = UtilToSqlDateUtils.createAmericanDate("2010-05-23T00:00:00");
java.sql.Date sqlDate = new java.sql.Date(date.getTime());
Assertions.assertEquals(date, sqlDate);

java.util.Date dateWithTime = UtilToSqlDateUtils.createAmericanDate("2010-05-23T23:59:59");
java.sql.Timestamp sqlTimestamp = new java.sql.Timestamp(dateWithTime.getTime());
Assertions.assertEquals(dateWithTime, sqlTimestamp);
```

然而，在某些情况下，我们想要**从给定的 java.sql.Date 或 java.sql.Timestamp 实例创建一个新的 java.util.Date 对象**。为了实现这一点，我们可以利用 java.sql.Date 或 java.sql.Timestamp 类的 getTime() 方法来创建一个新的 java.util.Date 对象：

```
java.util.Date date = UtilToSqlDateUtils.createAmericanDate("2010-05-23T00:00:00");
java.sql.Date sqlDate = new java.sql.Date(date.getTime());
java.util.Date newDate = new Date(sqlDate.getTime());
Assertions.assertEquals(date, newDate);

java.util.Date dateWithTime = UtilToSqlDateUtils.createAmericanDate("2010-05-23T23:59:59");
java.sql.Timestamp sqlTimestamp = new java.sql.Timestamp(dateWithTime.getTime());
java.util.Date newDateWithTime = new Date(sqlTimestamp.getTime());
Assertions.assertEquals(dateWithTime, newDateWithTime);
```

## 6. 结论

在这篇教程中，我们看到了如何将标准的 java.util Date 转换为 java.sql 包中提供的类型。除了标准转换，我们还检查了两种替代方案。第一个使用 Timestamp，第二个依赖于更新的 java.time 类。如往常一样，文章的完整源代码可以在 GitHub 上找到。