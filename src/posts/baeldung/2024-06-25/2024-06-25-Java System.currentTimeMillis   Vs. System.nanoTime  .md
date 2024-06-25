---
date: 2024-06-25
category:
  - Java
  - 性能
tag:
  - System.currentTimeMillis()
  - System.nanoTime()
head:
  - - meta
    - name: keywords
      content: Java, 时间测量, currentTimeMillis, nanoTime
---
# Java System.currentTimeMillis() 与 System.nanoTime() 比较 | Baeldung

## 1. 引言

Java 中用于时间测量的两个常用方法是 `System.currentTimeMillis()` 和 `System.nanoTime()`。尽管这两种方法都提供了测量时间的方式，它们服务于不同的目的，并且具有不同的特点。

**在本教程中，我们将探索这两种方法之间的区别，并了解何时使用每种方法。**

## 2. `System.currentTimeMillis()` 方法

`currentTimeMillis()` 方法返回自1970年1月1日00:00:00 UTC起的当前时间（以毫秒为单位）。此外，它基于系统时钟，适用于测量绝对时间，例如当前日期和时间。

**如果我们需要绝对时间信息，例如用于记录日志或显示时间戳，`currentTimeMillis()` 是合适的。然而，由于时钟可能发生的变化（如夏令时），这种方法可能导致难以消除的错误。**

让我们看一个简单的代码示例：

```java
@Test
public void givenTaskInProgress_whenMeasuringTimeDuration_thenDurationShouldBeNonNegative() {
    long startTime = System.currentTimeMillis();

    performTask();

    long endTime = System.currentTimeMillis();
    long duration = endTime - startTime;

    logger.info("任务持续时间：" + duration + " 毫秒");
    assertTrue(duration >= 0);
}
```

这段代码展示了如何使用 `currentTimeMillis()` 方法来测量任务的持续时间。测试方法在执行任务前捕获开始时间，在任务完成后捕获结束时间，然后计算并返回任务的持续时间（以毫秒为单位）。

**注意 `performTask()` 方法是实际要测量的任务的占位符。我们可以将其替换为我们想要测量的具体代码。**

## 3. `System.nanoTime()` 方法

与 `currentTimeMillis()` 不同，`nanoTime()` 方法返回最精确可用系统计时器的当前值，通常具有纳秒精度。**这个方法设计用于以高精度测量经过的时间，通常用于性能分析和基准测试。**

让我们看一个例子：

```java
@Test
public void givenShortTaskInProgress_whenMeasuringShortDuration_thenDurationShouldBeNonNegative() {
    long startNanoTime = System.nanoTime();

    performShortTask();

    long endNanoTime = System.nanoTime();
    long duration = endNanoTime - startNanoTime;

    logger.info("短任务持续时间：" + duration + " 纳秒");
    assertTrue(duration >= 0);
}
```

在这个例子中，测试方法使用 `nanoTime()` 来捕获一个短任务的开始和结束时间，以纳秒的高精度提供。

**需要注意的是，`nanoTime()` 的精度可能在不同平台上有所不同。虽然它通常比 `currentTimeMillis()` 更精确，但我们应该谨慎依赖极高的精度。**

## 4. 差异和相似性

为了提供 `System.currentTimeMillis()` 和 `System.nanoTime()` 之间区别的简洁概述，让我们深入比较它们的关键特性，突出它们的差异和相似之处：

| 特性 | `System.currentTimeMillis()` | `System.nanoTime()` |
| --- | --- | --- |
| **精度** | 毫秒精度 | 纳秒精度 |
| **用例** | 绝对时间（记录日志、时间戳） | 经过时间、性能分析 |
| **基础** | 基于系统时钟 | 基于系统计时器 |
| **平台依赖性** | 较少平台依赖 | 精度可能在不同平台上有所不同 |

## 5. 结论

总之，了解 `currentTimeMillis()` 和 `nanoTime()` 之间的区别对于在Java应用程序中做出明智的决策以测量时间至关重要。无论我们优先考虑绝对时间还是高精度，选择适合我们特定用例的正确方法将有助于在我们的Java程序中进行更准确和有效的时间测量。

如常，本文的完整代码示例可以在 GitHub 上找到。