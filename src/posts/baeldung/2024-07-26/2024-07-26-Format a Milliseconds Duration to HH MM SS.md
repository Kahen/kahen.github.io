---
date: 2024-07-26
category:
  - Java
  - 时间格式化
tag:
  - Java
  - 时间
  - 格式化
  - 毫秒
  - HH:MM:SS
head:
  - - meta
    - name: keywords
      content: Java, 时间格式化, 毫秒, HH:MM:SS
------
# 将毫秒持续时间格式化为HH:MM:SS | Baeldung## 概述

持续时间是指以小时、分钟、秒、毫秒等为单位表达的时间量。我们可能希望将持续时间格式化为特定的时间模式。

我们可以通过编写自定义代码并借助一些JDK库来实现这一点，或者使用第三方库。

在这个快速教程中，我们将看看如何编写简单的代码，将给定的持续时间格式化为HH:MM:SS格式。

## Java解决方案

持续时间可以以多种方式表示——例如，以分钟、秒和毫秒表示，或者作为Java的_Duration_，它具有自己的特定格式。

本节和后续部分将专注于使用一些JDK库将以毫秒指定的间隔（经过的时间）格式化为HH:MM:SS。为了我们的例子，我们将格式化38114000ms为10:35:14（HH:MM:SS）。

### 2.1. _Duration_

**从Java 8开始，引入了_Duration_类来处理各种单位的时间间隔。** _Duration_类提供了许多辅助方法来从持续时间中获取小时、分钟和秒。

要使用_Duration_类将间隔格式化为HH:MM:SS，我们需要使用_Duration_类中的工厂方法_ofMillis_从我们的间隔初始化_Duration_对象。这将间隔转换为我们可以操作的_Duration_对象：

```
Duration duration = Duration.ofMillis(38114000);
```

为了从秒到我们所需的单位进行计算的便利，我们需要获取我们持续时间或间隔的总秒数：

```
long seconds = duration.getSeconds();
```

然后，一旦我们有了秒数，我们为所需的格式生成相应的小时、分钟和秒：

```
long HH = seconds / 3600;
long MM = (seconds % 3600) / 60;
long SS = seconds % 60;
```

最后，我们格式化我们生成的值：

```
String timeInHHMMSS = String.format("%02d:%02d:%02d", HH, MM, SS);
```

让我们尝试这个解决方案：

```
assertThat(timeInHHMMSS).isEqualTo("10:35:14");
```

**如果我们使用Java 9或更高版本，我们可以使用一些辅助方法直接获取单位，而无需执行任何计算**：

```
long HH = duration.toHours();
long MM = duration.toMinutesPart();
long SS = duration.toSecondsPart();
String timeInHHMMSS = String.format("%02d:%02d:%02d", HH, MM, SS);
```

上述代码片段将给我们与上面测试的相同结果：

```
assertThat(timeInHHMMSS).isEqualTo("10:35:14");
```

### 2.2. _TimeUnit_

就像前一节讨论的_Duration_类一样，_TimeUnit_代表给定粒度的时间。它提供了一些辅助方法来转换单位——在我们的情况下将是小时、分钟和秒——并在这些单位中执行计时和延迟操作。

要将毫秒持续时间格式化为HH:MM:SS格式，我们所要做的就是使用_TimeUnit_中的相应辅助方法：

```
long HH = TimeUnit.MILLISECONDS.toHours(38114000);
long MM = TimeUnit.MILLISECONDS.toMinutes(38114000) % 60;
long SS = TimeUnit.MILLISECONDS.toSeconds(38114000) % 60;
```

然后，根据上面生成的单位格式化持续时间：

```
String timeInHHMMSS = String.format("%02d:%02d:%02d", HH, MM, SS);
assertThat(timeInHHMMSS).isEqualTo("10:35:14");
```

## 使用第三方库

我们可能会选择尝试使用第三方库方法而不是编写自己的代码。

### 3.1. Apache Commons

要使用Apache Commons，我们需要将commons-lang3添加到我们的项目中：

```
``<dependency>``
    ``<groupId>``org.apache.commons``</groupId>``
    ``<artifactId>``commons-lang3``</artifactId>``
    ``<version>``3.12.0``</version>``
``</dependency>``
```

正如预期的那样，这个库在其_DurationFormatUtils_类中有_formatDuration_以及其他单位格式化方法：

```
String timeInHHMMSS = DurationFormatUtils.formatDuration(38114000, "HH:MM:SS", true);
assertThat(timeInHHMMSS).isEqualTo("10:35:14");
```

### 3.2. Joda Time

**Joda Time库在我们在Java 8之前的版本中非常有用**，因为它有方便的辅助方法来表示和格式化时间单位。要使用Joda Time，让我们将joda-time依赖项添加到我们的项目中：

```
``<dependency>``
    ``<groupId>``joda-time``</groupId>``
    ``<artifactId>``joda-time``</artifactId>``
    ``<version>``2.10.10``</version>``
``</dependency>``
```

Joda Time有一个_Duration_类来表示时间。首先，我们将毫秒间隔转换为Joda Time _Duration_对象的实例：

```
Duration duration = new Duration(38114000);
```

然后，我们使用_Duration_中的_toPeriod_方法从上面的持续时间获取周期，该方法将其转换或初始化为Joda Time的_Period_类的实例：

```
Period period = duration.toPeriod();
```

我们使用其相应的辅助方法从_Period_获取单位（小时、分钟和秒）：

```
long HH = period.getHours();
long MM = period.getMinutes();
long SS = period.getSeconds();
```

最后，我们可以格式化持续时间并测试结果：

```
String timeInHHMMSS = String.format("%02d:%02d:%02d", HH, MM, SS);
assertThat(timeInHHMMSS).isEqualTo("10:35:14");
```

## 结论

在本教程中，我们学习了如何将持续时间格式化为特定格式（在我们的情况下是HH:MM:SS）。

首先，我们使用了Java自带的_Duration_和_TimeUnit_类来获取所需的单位，并借助_Formatter_进行格式化。

最后，我们查看了如何使用一些第三方库来实现结果。

像往常一样，完整的源代码可以在GitHub上找到

OK