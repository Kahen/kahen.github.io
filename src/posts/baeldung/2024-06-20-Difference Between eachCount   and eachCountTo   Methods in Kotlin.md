由于我无法访问外部链接，因此无法获取网页内容进行翻译。请您提供网页内容的文本，我将为您翻译。如果需要翻译网页上的内容，请复制并粘贴文本到对话框中，我将根据您提供的文本进行翻译。---
date: 2024-06-21
category:
  - Kotlin
  - Programming
tag:
  - Kotlin
  - eachCount
  - eachCountTo
head:
  - - meta
    - name: keywords
      content: Kotlin, eachCount, eachCountTo, collection, aggregation, tutorial
---

# Kotlin中eachCount()和eachCountTo()方法的区别

Kotlin拥有一个丰富、高效且简洁的集合库。标准库提供了多种有用的方法来轻松处理集合内容。

在本教程中，我们将查看这两种方法：eachCount()和eachCountTo()，它们帮助执行聚合操作。

**eachCount()方法使我们能够计算元素的出现次数**。此外，它在任何Grouping数据结构中都可用，其中keyOf()函数适用于获取键。它生成一个Map，包含每个组中元素的计数。

让我们看一个示例代码来实际演示这一点：

```kotlin
val flights = listOf("EK060", "EK531", "LH7", "LH1030", "DL47", "AI120")
val flightCount = flights.groupingBy { it.take(2) }.eachCount()
val expectedMap = mapOf("EK" to 2, "LH" to 2, "DL" to 1, "AI" to 1)
assertEquals(expectedMap, flightCount)
```

在上面的例子中，我们从一个航班号列表开始。此外，我们想要获取每个航空公司的航班数量。为了实现这一点，我们使用列表上的groupingBy()函数创建一个Grouping实例，并提取航班代码的前两个字母。随后，我们调用eachCount()方法，它创建一个映射，显示每个航空公司的航班数量。

我们也可以使用groupBy()和mapValues()函数实现相同的功能：

```kotlin
val flights = listOf("EK060", "EK531", "LH7", "LH1030", "DL47", "AI120")
val flightCount = flights.groupBy { it.take(2) }.mapValues { it.value.count() }
val expectedMap = mapOf("EK" to 2, "LH" to 2, "DL" to 1, "AI" to 1)
assertEquals(expectedMap, flightCount)
```

然而，这种方法更加冗长，而eachCount()方法则更具可读性。

这在从集合数据创建频率映射时非常有用。

### eachCountTo()

eachCountTo()函数与eachCount()函数非常相似。当eachCount()生成一个包含集合中元素计数的新不可变映射时，eachCountTo()的用途略有不同。它需要一个可变映射作为参数，并将输入集合的计数与传递的参数结合起来。本质上，**eachCountTo()更新目标可变映射上的计数**，这在我们需要连续累积计数的情况下是一个很好的选择。

让我们使用eachCountTo()修改之前的例子：

```kotlin
val flights = listOf("EK060", "EK531", "LH7", "LH1030", "DL47", "AI120")
val flightCount = flights.groupingBy { it.take(2) }.eachCount().toMutableMap()
val expectedMap = mutableMapOf("EK" to 2, "LH" to 2, "DL" to 1, "AI" to 1)
assertEquals(expectedMap, flightCount)

val moreFlights = listOf("EK061", "AI435")
moreFlights.groupingBy { it.take(2) }.eachCountTo(flightCount)
val expectedMapAfterMoreFlights = mutableMapOf("EK" to 3, "LH" to 2, "DL" to 1, "AI" to 2)
assertEquals(expectedMapAfterMoreFlights, flightCount)
```

在这里，示例的初始部分与之前的情况类似，除了转换为可变映射。随后，我们使用这个可变映射并将其作为参数传递给eachCountTo()，它有效地更新了映射内的计数。

### 结论

在本文中，我们探讨了Kotlin标准库中的两个有用函数：eachCount()和eachCountTo()。这些函数简化了计数操作，提供了增强的可读性和效率。

如常，本教程中使用的示例代码可在GitHub上获得。

OK