---
date: 2022-04-01
category:
  - Java
tag:
  - TimeUnit
  - 时间转换
head:
  - - meta
    - name: keywords
      content: Java, TimeUnit, 时间单位转换
---
# Java中使用TimeUnit进行时间转换

当在Java中处理时间和持续时间计算时，_TimeUnit_枚举提供了一种方便的方式来在不同的单位之间执行时间转换。

无论是我们想要将秒转换为分钟，将毫秒转换为小时，还是执行任何其他时间单位转换，我们都可以利用_TimeUnit_来简化代码，获得准确的结果，并使事情更加可读。

在本教程中，我们将探讨如何在Java中使用_TimeUnit_进行时间转换。

### 2. 理解_TimeUnit_

_TimeUnit_是一个枚举，包含在_java.util.concurrent_包中，它表示从纳秒到天的各种时间单位。它提供了一组预定义的常量，每个常量对应一个特定的时间单位，包括：

- _DAYS_
- _HOURS_
- _MINUTES_
- _SECONDS_
- _MILLISECONDS_
- _MICROSECONDS_
- _NANOSECONDS_

这些常量作为时间转换的基础。

### 3. 使用_TimeUnit_进行时间转换

要执行时间转换，我们需要一个表示我们想要转换的持续时间的值，并指定我们希望转换到的目标单位。**_TimeUnit_提供了几种方法来在单位之间转换时间**，例如_convert()_或_toXXX()_，其中_XXX_代表目标单位。

#### 3.1. 使用_convert()_方法

首先，让我们看看_convert(long sourceDuration, TimeUnit sourceUnit)_方法，它将给定单位中的时间持续期转换为由枚举值指定的单位。

让我们将一个简单的整数转换为分钟：

```java
long minutes = TimeUnit.MINUTES.convert(60, TimeUnit.SECONDS);
assertThat(minutes).isEqualTo(1);
```

在这个例子中，我们从_60_秒开始，然后将其转换为分钟。我们指定源时间单位作为第二个参数。输出单位始终由枚举值确定。

让我们看看另一个例子，我们进行相反的转换：

```java
long seconds = TimeUnit.SECONDS.convert(1, TimeUnit.MINUTES);
assertThat(seconds).isEqualTo(60);
```

正如我们所见，**_convert()_方法在不同单位之间转换时间**。

#### 3.2. 使用_toXXX()_方法

现在让我们探索_toXXX(long sourceDuration)_方法。这里签名中的_XXX_指定目标单位。

我们可以使用_toNanos()_, _toMicros()_, _toMillis()_, _toSeconds()_, _toMinutes()_, _toHours()_, 和 _toDays()_来选择单位。

现在让我们使用_toXXX()_方法重写前面的两个代码片段：

```java
long minutes = TimeUnit.SECONDS.toMinutes(60);
assertThat(minutes).isEqualTo(1);
```

和之前一样，我们刚刚将_60_秒转换为分钟。

我们可以转换另一个方向：

```java
long seconds = TimeUnit.MINUTES.toSeconds(1);
assertThat(seconds).isEqualTo(60);
```

正如预期的那样，上述示例与之前的结果相同，因此两种签名是等效的。但与_convert()_不同，当我们使用_toXXX()_方法时，枚举值表示源时间单位。

### 4. 特定用例

现在我们知道了如何使用_TimeUnit_方法进行时间转换，让我们探索一些更详细的场景。

#### 4.1. 负输入

首先，让我们检查转换方法是否支持负输入值：

```java
long minutes = TimeUnit.SECONDS.toMinutes(-60);
assertThat(minutes).isEqualTo(-1);
```

给出的例子表明**转换方法也处理负输入**，并且返回的结果仍然是正确的。

#### 4.2. 舍入处理

现在让我们检查如果我们将一个较小的单位转换为一个较大的单位，期望得到一个非整数值的目标结果会发生什么。我们知道所有方法只声明_long_作为返回类型，因此无法返回小数结果。

让我们通过将秒转换为分钟来测试舍入规则：

```java
long positiveUnder = TimeUnit.SECONDS.toMinutes(59);
assertThat(positiveUnder).isEqualTo(0);
long positiveAbove = TimeUnit.SECONDS.toMinutes(61);
assertThat(positiveAbove).isEqualTo(1);
```

然后，让我们检查负输入：

```java
long negativeUnder = TimeUnit.SECONDS.toMinutes(-59);
assertThat(negativeUnder).isEqualTo(0);

long negativeAbove = TimeUnit.SECONDS.toMinutes(-61);
assertThat(negativeAbove).isEqualTo(-1);
```

正如我们所见，所有转换都没有任何错误地处理了。

我们应该注意，所有方法都实现了**向零舍入规则，截断小数部分**。

#### 4.3. 溢出处理

我们知道，所有基本类型都有其值限制，不能超出。但如果结果溢出了限制会发生什么呢？

让我们检查将天的最小和最大_long_值转换为毫秒的结果：

```java
long maxMillis = TimeUnit.DAYS.toMillis(Long.MAX_VALUE);
assertThat(maxMillis).isEqualTo(Long.MAX_VALUE);
long minMillis = TimeUnit.DAYS.toMillis(Long.MIN_VALUE);
assertThat(minMillis).isEqualTo(Long.MIN_VALUE);
```

上述代码执行时没有抛出任何异常。我们应该注意到**结果不是有效的，因为溢出结果总是截断到_long_基本类型定义的最小或最大值**。

### 5. 转换到最精细的单位

有时，我们可能需要将持续时间转换为_TimeUnit_中可用的最精细的单位，例如将秒转换为小时、分钟和剩余秒的适当组合。不幸的是，没有这种方法。这是因为**所有转换方法总是返回给定持续期内的总周期数**。

**要将输入转换为最精细的单位，我们需要实现自定义函数**。让我们使用_3672_秒的值，并获取时间单位的适当组合——我们期望的值是_1_小时、_1_分钟和_12_秒。

我们可以使用以下方式提取小时：

```java
long inputSeconds = 3672;
long hours = TimeUnit.SECONDS.toHours(inputSeconds);
assertThat(hours).isEqualTo(1);
```

现在，如果我们想要提取剩余的分钟，我们应该从输入值中减去小时包含的秒数之和，然后使用这个值进行进一步操作：

```java
long secondsRemainingAfterHours = inputSeconds - TimeUnit.HOURS.toSeconds(hours);
long minutes = TimeUnit.SECONDS.toMinutes(secondsRemainingAfterHours);
assertThat(minutes).isEqualTo(1);
```

我们刚刚成功地根据输入数据计算了小时和分钟。最后，我们需要检索剩余的秒数。

要做到这一点，我们重复减法逻辑，记得调整参数：

```java
long seconds = secondsRemainingAfterHours - TimeUnit.MINUTES.toSeconds(minutes);
assertThat(seconds).isEqualTo(12);
```

在示例中，我们刚刚将_3672_毫秒转换为最精细的单位表示，包括小时、分钟和秒。

### 6. 结论

在本文中，我们探讨了使用Java中的_TimeUnit_枚举进行时间转换的各种方式。

**_TimeUnit_枚举提供了一种方便高效的方式来使用_convert()_和_toXXX()_方法在不同单位之间进行转换**。

此外，它还处理负输入并返回正确的结果。我们可以轻松地转换持续时间，无论我们是从小单位转换到大单位还是反之，都使用向零舍入。它还通过将结果修剪到边界值来实现基本的溢出保护。

如果我们想要将源持续时间转换为其他单位的适当组合（例如天、小时、分钟和秒），我们可以轻松地实现额外的逻辑。所有转换器都返回指定持续期内指定周期的总数。

如常，示例的源代码可在GitHub上获得。