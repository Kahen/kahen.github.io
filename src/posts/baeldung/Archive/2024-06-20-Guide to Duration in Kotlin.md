---
date: 2024-06-20
category:
  - Kotlin
  - Duration
tag:
  - Duration
  - Time Management
head:
  - - meta
    - name: keywords
      content: Kotlin, Duration, Time Management, Tutorial
---
# Kotlin中Duration类的指南

## 1. 引言

在构建软件应用程序时，处理时间间隔和持续时间是一项常见任务。Kotlin通过_Duration_类提供了一个强大的API来处理时间管理的这一特定方面。

在本教程中，我们将探讨_Duration_类以及它如何使Kotlin中的时间和持续时间操作变得高效且容易。

## 2. _Duration_是什么？

**_Duration_表示一个特定的时间量，可以是正数、负数、零甚至无限大。**

这些间隔通过_DurationUnit_枚举指定，支持类型_DAYS_, _HOURS_, _MINUTES_, _SECONDS_, _MILLISECONDS_, _MICROSECONDS_和_NANOSECONDS_。因此，即使在指代周和月时，超过一天的持续时间也以天为单位表示。

_Duration_类便于创建、操作、聚合和转换持续时间。

**与具体时刻的日期和时间不同，持续时间表示这些时刻之间经过的时间量。**例如，_Duration.DAYS_表示以整天为单位的时间长度，每天代表24小时。它侧重于经过的时间本身，而不是特定的日期。

Kotlin中的_Duration_类在调度任务、管理超时、测量经过时间和执行基于时间的精确高效计算等场景中具有实际应用。

## 3. 创建持续时间

Kotlin提供了多种创建持续时间的方法。让我们在这一部分看看不同的方法。

### 3.1. 使用伴生对象

Kotlin在_Duration_伴生对象中定义了简单的扩展函数，可以轻松地从_Int_, _Long_和_Double_创建持续时间。让我们看看如何使用它们：

```
val tenMinutes = 10.minutes
val tenSeconds = 10.seconds
val tenHours = 10.hours
val tenDays = 10.days
val tenMillis = 10.milliseconds
val tenMicros = 10.microseconds
val tenNanos = 10.nanoseconds
```

此外，我们还可以创建零和无限的持续时间：

```
val zero = Duration.ZERO
val infinite = Duration.INFINITE
```

**无限持续时间对于配置永不过期的超时值非常有用。**

### 3.2. 使用_toDuration()_

另一种创建持续时间的方法是使用_Int_, _Long_和_Double_上的_toDuration()_扩展函数，通过传递所需的单位。让我们看看用法：

```
val tenMinutes = 10.toDuration(DurationUnit.MINUTES)
val tenSeconds = 10.toDuration(DurationUnit.SECONDS)
```

这个函数根据提供的数字和由_DurationUnit_枚举值指定的单位生成持续时间。

### 3.3. 从ISO8601持续时间格式

**我们还可以从ISO8601持续时间格式字符串创建持续时间。**在此格式中，持续时间可以使用周期指示符及其相应的值来表示。例如，十天可以表示为_P10D_，其中_P_标记周期的开始，而_10D_表示十天。同样，十分钟可以表示为_PT10M_。在这里，_T_表示时间部分的开始，而_10M_表示十分钟。由于这种表示中没有涉及天，因此在_P_和_T_之间没有值。

让我们看看如何在Kotlin中使用：

```
val tenMinDuration = Duration.parseIsoString("PT10M")
val tenDays = Duration.parseIsoString("P10D")
val tenDaysAndOneHour = Duration.parseIsoString("P10DT1H")
val tenDaysWithAllUnits = Duration.parseIsoString("P10DT1H5M7S")
```

这些示例展示了如何使用_parseIsoString()_方法将不同的ISO8601时间表达式转换为_Duration_对象。

**需要注意的是，在Kotlin中，天的最大周期指示符由_D_表示，尽管ISO8601标准还支持_Y_表示年和_M_表示月。**

## 4. _Duration_操作

_Duration_提供了多种操作符，用于与持续时间实例交互。

### 4.1. 持续时间的转换

我们可以使用诸如_inWholeSeconds()_, _inWholeMinutes()_等方法从_Duration_中以各种单位检索值：

```
val tenMinutes = 10.minutes
assertEquals(10L, tenMinutes.inWholeMinutes)
assertEquals(600L, tenMinutes.inWholeSeconds)
```

同样，我们可以使用_toIsoString()_方法将_Duration_转换为ISO8601字符串格式：

```
val tenSeconds = 10.seconds
assertEquals("PT10S", tenSeconds.toIsoString())
val tenDaysAndOneHour = Duration.parseIsoString("P10DT1H")
assertEquals("PT241H", tenDaysAndOneHour.toIsoString())
```

然而，值得注意的是，这种方法总是使用转换值中的最大小时数。天数被转换为小时，然后使用，因此省略了_D_组件。因此，当使用_toIsoString()_时，该方法将_10D_转换为240小时。

此外，我们可以将持续时间的组件分解为其单位：

```
val seventyMinutes = 70.minutes
val asStr = seventyMinutes.toComponents { hrs, min, sec, nanos -> "${hrs}:${min}" }
assertEquals("1:10", asStr)
```

在上面的示例中，_toComponents()_方法将持续时间分解为小时、分钟、秒和纳秒，便于轻松使用每个组件。此外，还有多个_toComponents()_方法可用，每种方法返回不同的单位，增加了多样性。

### 4.2. 算术运算

就像数值一样，我们可以组合多个_Duration_实例。不同类型的持续时间会自动处理并正确转换。

让我们看一些示例：

```
val tenMinutes = 10.minutes
val fiveHours = 5.hours
val fiveHoursPlusTenMin = tenMinutes + fiveHours
assertEquals(310L, fiveHoursPlusTenMin.inWholeMinutes)
val fiveHoursMinusTenMin = fiveHours - tenMinutes
assertEquals(290L, fiveHoursMinusTenMin.inWholeMinutes)
val timesMinutes = tenMinutes.times(3)
assertEquals(30L, timesMinutes.inWholeMinutes)
val sixSecs = tenMinutes.div(100)
assertEquals(6, sixSecs.inWholeSeconds)
```

此外，我们可以使用函数_plus()_和_minus()_而不是运算符_+_和_–_来实现相同的结果。

这些统一的操作大大简化了处理不同单位持续时间的过程。

### 4.3. 比较持续时间

Kotlin提供了多种方法来比较不同的持续时间。让我们看看比较持续时间的不同方式：

```
val tenMinutes = 10.minutes
val fiveHours = 5.hours
assertTrue { fiveHours > tenMinutes }
assertFalse { fiveHours < tenMinutes }
assertTrue { fiveHours == 300.minutes }
```

上面的示例展示了不同的比较_Duration_实例的方式。

此外，Kotlin还提供了一系列方法来验证不同的条件，包括_isInfinite()_, _isNegative()_, _isFinite()_等。

### 4.4. 两个_DateTime_之间的持续时间

我们还可以从两个_DateTime_实例创建_Duration_：

```
val datetime1 = LocalDateTime.now()
val datetime2 = LocalDateTime.now().minusDays(1).minusHours(1)
val duration = java.time.Duration.between(datetime2, datetime1).toKotlinDuration()
val expectedDuration = 25.hours
assertEquals(expectedDuration, duration)
```

在这里，我们使用_java.time_包中的_Duration_ API创建持续时间值。然而，这个实例来自Java API。我们可以使用扩展函数_toKotlinDuration()_将其转换为Kotlin _Duration_。

### 4.5. 一些实际用途

_Duration_类在构建软件时有许多实际应用。

我们可以测量一个方法或代码块执行所需的时间：

```
@ExperimentalTime
fun main() {
    val elapsedTime = kotlin.time.measureTime {
        Thread.sleep(510)
    }
    println(elapsedTime)
}
```

在这个示例中，_elapsedTime_变量捕获了代码块执行所需的持续时间。

同样，协程使用持续时间值来指定延迟执行：

```
@OptIn(ExperimentalTime::class)
fun main() = runBlocking {
    val delayDuration = 1000.milliseconds
    println("Task will execute after a delay of $delayDuration")
    delay(delayDuration)
    println("Task executed")
}
```

在这个示例中，我们使用_delay()_函数通过传递指定的持续时间值来延迟执行。

## 5. 结论

在本文中，我们探讨了Kotlin中的_Duration_类及其各种操作。

我们讨论了不同的创建和解析_Duration_的方式。此外，《Duration_类提供了各种操作，如加法、减法、比较和转换单位。无论是进行计算、调度任务还是管理超时，Kotlin的_Duration_类都提供了简化时间管理任务的基本工具。

如常，本教程中使用的示例代码可在GitHub上找到。